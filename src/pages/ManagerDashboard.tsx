import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  PieChartIcon,
  ClipboardListIcon,
  UserIcon,
  CalendarIcon,
  ArrowLeftIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ScaleIcon,
  PercentIcon,
  BarChartIcon } from
'lucide-react';
import { ManagerBottomNav } from '../components/ManagerBottomNav';
type EventType = {
  id: string;
  title: string;
  type: 'covered' | 'lost';
  date: string;
  totalIncome: number;
  totalCost: number;
  status: 'completed' | 'cancelled' | 'ongoing';
  details: {
    dishesPrepared: number;
    customersServed: number;
    wasteGenerated: number;
    ingredientsUsed: string[];
  };
};
type ActionLog = {
  id?: string;
  predictionId?: string;
  predictionTitle?: string;
  ingredient?: string;
  reason: string;
  person: string;
  timestamp: string;
  action: string;
  quantity?: number;
  comment?: string;
  eventId?: string;
};
export function ManagerDashboard() {
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [view, setView] = useState<'dashboard' | 'event-details'>('dashboard');
  useEffect(() => {
    const rejections = JSON.parse(localStorage.getItem('rejections') || '[]');
    const wastage = JSON.parse(localStorage.getItem('allWastage') || '[]');
    setActionLogs(
      [...rejections, ...wastage].sort(
        (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    );
    const mockEvents: EventType[] = [
    {
      id: '1',
      title: 'Wedding Reception',
      type: 'covered',
      date: '2024-01-15',
      totalIncome: 12500,
      totalCost: 3200,
      status: 'completed',
      details: {
        dishesPrepared: 850,
        customersServed: 300,
        wasteGenerated: 45,
        ingredientsUsed: [
        'Chicken',
        'Rice',
        'Vegetables',
        'Spices',
        'Salmon',
        'Truffle Oil',
        'Saffron']

      }
    },
    {
      id: '2',
      title: 'Corporate Conference',
      type: 'covered',
      date: '2024-01-18',
      totalIncome: 8200,
      totalCost: 2100,
      status: 'completed',
      details: {
        dishesPrepared: 520,
        customersServed: 200,
        wasteGenerated: 28,
        ingredientsUsed: [
        'Fish',
        'Pasta',
        'Salad Greens',
        'Desserts',
        'Coffee',
        'Pastries']

      }
    },
    {
      id: '3',
      title: 'Birthday Party',
      type: 'lost',
      date: '2024-01-20',
      totalIncome: 0,
      totalCost: 1800,
      status: 'cancelled',
      details: {
        dishesPrepared: 150,
        customersServed: 0,
        wasteGenerated: 150,
        ingredientsUsed: ['Beef', 'Potatoes', 'Cake', 'Beverages']
      }
    },
    {
      id: '4',
      title: 'Charity Gala',
      type: 'covered',
      date: '2024-01-22',
      totalIncome: 9500,
      totalCost: 2800,
      status: 'completed',
      details: {
        dishesPrepared: 600,
        customersServed: 250,
        wasteGenerated: 35,
        ingredientsUsed: ['Lamb', 'Quinoa', 'Fresh Herbs', 'Wine', 'Caviar']
      }
    }];

    setEvents(mockEvents);
  }, []);
  const totalEvents = events.length;
  const coveredEvents = events.filter((e) => e.type === 'covered').length;
  const lostEvents = events.filter((e) => e.type === 'lost').length;
  const totalIncome = events.reduce((sum, e) => sum + e.totalIncome, 0);
  const totalCost = events.reduce((sum, e) => sum + e.totalCost, 0);
  const netProfit = totalIncome - totalCost;
  const abcData = {
    A: {
      label: 'High Value',
      cost: 2450,
      percentage: 60,
      color: '#EF4444'
    },
    B: {
      label: 'Medium Value',
      cost: 1200,
      percentage: 30,
      color: '#F59E0B'
    },
    C: {
      label: 'Low Value',
      cost: 350,
      percentage: 10,
      color: '#22C55E'
    }
  };
  const totalWastageCost = Object.values(abcData).reduce(
    (sum, item) => sum + item.cost,
    0
  );
  const totalPlateIncome = 15800;
  const wastagePercentage = (
  totalWastageCost / totalPlateIncome *
  100).
  toFixed(1);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      overproduction: 'Overproduction',
      expiry: 'Expiry',
      preparation_issues: 'Preparation Issues',
      other: 'Other'
    };
    return labels[reason] || reason;
  };
  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setView('event-details');
  };
  const handleBackToDashboard = () => {
    setSelectedEvent(null);
    setView('dashboard');
  };
  const calculateFoodCosting = (event: EventType) => {
    const foodCostPercentage =
    event.totalCost / (event.totalIncome || 1) * 100;
    const grossProfitMargin =
    (event.totalIncome - event.totalCost) / (event.totalIncome || 1) * 100;
    const costPerPlate = event.totalCost / (event.details.dishesPrepared || 1);
    const revenuePerPlate =
    event.totalIncome / (event.details.dishesPrepared || 1);
    const profitPerPlate = revenuePerPlate - costPerPlate;
    const wastageCost = event.details.wasteGenerated * 5;
    const potentialSavings = wastageCost * 0.8;
    const potentialFoodCostPercentage =
    (event.totalCost - potentialSavings) / (event.totalIncome || 1) * 100;
    return {
      foodCostPercentage,
      grossProfitMargin,
      costPerPlate,
      revenuePerPlate,
      profitPerPlate,
      wastageCost,
      potentialSavings,
      potentialFoodCostPercentage
    };
  };
  const generateEventABC = (event: EventType) => {
    const total = event.totalCost;
    return {
      A: {
        cost: total * 0.7,
        percentage: 70,
        items: Math.ceil(event.details.ingredientsUsed.length * 0.2)
      },
      B: {
        cost: total * 0.2,
        percentage: 20,
        items: Math.ceil(event.details.ingredientsUsed.length * 0.3)
      },
      C: {
        cost: total * 0.1,
        percentage: 10,
        items: Math.ceil(event.details.ingredientsUsed.length * 0.5)
      }
    };
  };
  if (view === 'event-details' && selectedEvent) {
    const metrics = calculateFoodCosting(selectedEvent);
    const eventABC = generateEventABC(selectedEvent);
    const getStatusColor = (percentage: number, type: 'cost' | 'profit') => {
      if (type === 'cost') {
        if (percentage <= 35) return 'text-green-600 bg-green-100';
        if (percentage <= 40) return 'text-amber-600 bg-amber-100';
        return 'text-red-600 bg-red-100';
      } else {
        if (percentage >= 65) return 'text-green-600 bg-green-100';
        if (percentage >= 60) return 'text-amber-600 bg-amber-100';
        return 'text-red-600 bg-red-100';
      }
    };
    return (
      <div className="min-h-screen w-full bg-[#FAFAFA] pb-24">
        <motion.div
          className="max-w-md mx-auto p-6"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}>

          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-[#4CAF50] mb-6">

            <ArrowLeftIcon size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-[#2E2E2E]">
                {selectedEvent.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedEvent.type === 'covered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                {selectedEvent.type === 'covered' ? 'Covered' : 'Lost'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1">
                <CalendarIcon size={16} />
                {formatDate(selectedEvent.date)}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${selectedEvent.status === 'completed' ? 'bg-blue-100 text-blue-800' : selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>

                {selectedEvent.status.charAt(0).toUpperCase() +
                selectedEvent.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Financial Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 mb-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.1
            }}>

            <h3 className="font-semibold text-[#2E2E2E] mb-4">
              Financial Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUpIcon size={18} className="text-green-500" />
                  <span className="text-xs text-gray-500">Total Income</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${selectedEvent.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDownIcon size={18} className="text-red-500" />
                  <span className="text-xs text-gray-500">Total Cost</span>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  ${selectedEvent.totalCost.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Net Result</span>
                <span
                  className={`text-lg font-bold ${selectedEvent.totalIncome - selectedEvent.totalCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>

                  $
                  {(
                  selectedEvent.totalIncome - selectedEvent.totalCost).
                  toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ABC Analysis */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 mb-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.2
            }}>

            <div className="flex items-center gap-2 mb-4">
              <BarChartIcon size={18} className="text-[#4CAF50]" />
              <h3 className="font-semibold text-[#2E2E2E]">ABC Analysis</h3>
            </div>
            <div className="space-y-4">
              {(['A', 'B', 'C'] as const).map((cat, i) => {
                const data = eventABC[cat];
                const colors = {
                  A: 'bg-red-500',
                  B: 'bg-amber-500',
                  C: 'bg-green-500'
                };
                const dotColors = {
                  A: 'bg-red-500',
                  B: 'bg-amber-500',
                  C: 'bg-green-500'
                };
                const labels = {
                  A: 'High Value',
                  B: 'Medium Value',
                  C: 'Low Value'
                };
                const priorities = {
                  A: 'Critical',
                  B: 'Moderate',
                  C: 'Low Priority'
                };
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${dotColors[cat]}`}>
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          Category {cat} ({labels[cat]})
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        $
                        {data.cost.toLocaleString(undefined, {
                          maximumFractionDigits: 0
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>
                        {data.items} items ({priorities[cat]})
                      </span>
                      <span>{data.percentage}% of cost</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${colors[cat]}`}
                        initial={{
                          width: 0
                        }}
                        animate={{
                          width: `${data.percentage}%`
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2 + i * 0.1
                        }} />

                    </div>
                  </div>);

              })}
            </div>
          </motion.div>

          {/* Food Costing Analysis */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 mb-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.3
            }}>

            <div className="flex items-center gap-2 mb-4">
              <ScaleIcon size={18} className="text-[#4CAF50]" />
              <h3 className="font-semibold text-[#2E2E2E]">
                Food Costing Analysis
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1 mb-1">
                  <PercentIcon size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500">Food Cost %</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {metrics.foodCostPercentage.toFixed(1)}%
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(metrics.foodCostPercentage, 'cost')}`}>

                    {metrics.foodCostPercentage <= 35 ?
                    'Good' :
                    metrics.foodCostPercentage <= 40 ?
                    'Fair' :
                    'High'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Target: 28-35%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUpIcon size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500">Gross Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {metrics.grossProfitMargin.toFixed(1)}%
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(metrics.grossProfitMargin, 'profit')}`}>

                    {metrics.grossProfitMargin >= 65 ?
                    'Good' :
                    metrics.grossProfitMargin >= 60 ?
                    'Fair' :
                    'Low'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Target: &gt;65%
                </p>
              </div>
            </div>
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost Per Plate</span>
                <span className="text-sm font-medium">
                  ${metrics.costPerPlate.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue Per Plate</span>
                <span className="text-sm font-medium">
                  ${metrics.revenuePerPlate.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">
                  Profit Per Plate
                </span>
                <span
                  className={`text-sm font-bold ${metrics.profitPerPlate >= 0 ? 'text-green-600' : 'text-red-600'}`}>

                  ${metrics.profitPerPlate.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Wastage Impact */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 mb-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.4
            }}>

            <div className="flex items-center gap-2 mb-4">
              <AlertTriangleIcon size={18} className="text-amber-500" />
              <h3 className="font-semibold text-[#2E2E2E]">Wastage Impact</h3>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-amber-800">Cost of Waste</span>
                <span className="text-lg font-bold text-amber-900">
                  ${metrics.wastageCost.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-amber-200 h-1.5 rounded-full mb-2">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{
                    width: '100%'
                  }}>
                </div>
              </div>
              <p className="text-xs text-amber-700">
                Reducing waste could improve food cost to{' '}
                <span className="font-bold">
                  {metrics.potentialFoodCostPercentage.toFixed(1)}%
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircleIcon size={14} className="text-green-500" />
              <span>
                Potential savings: ${metrics.potentialSavings.toFixed(2)}
              </span>
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5 mb-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.5
            }}>

            <h3 className="font-semibold text-[#2E2E2E] mb-4">Event Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">
                  Dishes Prepared
                </span>
                <p className="text-lg font-bold text-[#2E2E2E]">
                  {selectedEvent.details.dishesPrepared}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">
                  Customers Served
                </span>
                <p className="text-lg font-bold text-[#2E2E2E]">
                  {selectedEvent.details.customersServed}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">
                  Waste Generated
                </span>
                <p className="text-lg font-bold text-[#2E2E2E]">
                  {selectedEvent.details.wasteGenerated}kg
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500 block mb-1">
                  Waste %
                </span>
                <p className="text-lg font-bold text-[#2E2E2E]">
                  {(
                  selectedEvent.details.wasteGenerated /
                  selectedEvent.details.dishesPrepared *
                  100).
                  toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ingredients */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-5"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.6
            }}>

            <h3 className="font-semibold text-[#2E2E2E] mb-4">
              Ingredients Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedEvent.details.ingredientsUsed.map(
                (ingredient, index) =>
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">

                    {ingredient}
                  </span>

              )}
            </div>
          </motion.div>
        </motion.div>
        <ManagerBottomNav />
      </div>);

  }
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] pb-24">
      <motion.div
        className="max-w-md mx-auto p-6"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] flex items-center gap-2">
            <PieChartIcon className="text-[#4CAF50]" size={24} />
            Manager Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Analytics & Event Management
          </p>
        </div>

        {/* Events Summary */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-4"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.1
          }}>

          <h3 className="font-semibold text-[#2E2E2E] mb-4">Events Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSignIcon size={18} className="text-blue-500" />
                <span className="text-xs text-gray-500">Total Events</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{totalEvents}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircleIcon size={18} className="text-green-500" />
                <span className="text-xs text-gray-500">Covered Events</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {coveredEvents}
              </p>
              <p className="text-xs text-green-400 mt-1">
                ${totalIncome.toLocaleString()} income
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircleIcon size={18} className="text-red-500" />
                <span className="text-xs text-gray-500">Missed Events</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{lostEvents}</p>
              <p className="text-xs text-red-400 mt-1">
                ${totalCost.toLocaleString()} loss
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUpIcon size={18} className="text-purple-500" />
                <span className="text-xs text-gray-500">Net Profit</span>
              </div>
              <p
                className={`text-2xl font-bold ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>

                ${netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-4"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.2
          }}>

          <h3 className="font-semibold text-[#2E2E2E] mb-4">Recent Events</h3>
          <div className="space-y-3">
            {events.map((event, index) =>
            <motion.div
              key={event.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${event.type === 'covered' ? 'border-green-200 hover:border-green-300' : 'border-red-200 hover:border-red-300'}`}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1 + index * 0.05
              }}
              onClick={() => handleEventClick(event)}>

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-[#2E2E2E]">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(event.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                    className={`px-2 py-1 rounded text-xs ${event.type === 'covered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                      {event.type === 'covered' ? 'Covered' : 'Lost'}
                    </span>
                    <span
                    className={`text-sm font-medium ${event.totalIncome > 0 ? 'text-green-600' : 'text-red-600'}`}>

                      {event.totalIncome > 0 ?
                    `+$${event.totalIncome}` :
                    `-$${Math.abs(event.totalCost)}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👨‍🍳 {event.details.dishesPrepared} dishes</span>
                  <span>👥 {event.details.customersServed} served</span>
                  <span>⚠️ {event.details.wasteGenerated}kg waste</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cost vs Income */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-4"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.3
          }}>

          <h3 className="font-semibold text-[#2E2E2E] mb-4">Cost vs Income</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDownIcon size={18} className="text-red-500" />
                <span className="text-xs text-gray-500">Wastage Cost</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                ${totalWastageCost.toLocaleString()}
              </p>
              <p className="text-xs text-red-400 mt-1">
                {wastagePercentage}% of income
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUpIcon size={18} className="text-green-500" />
                <span className="text-xs text-gray-500">Plate Income</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ${totalPlateIncome.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">Total revenue</p>
            </div>
          </div>
        </motion.div>

        {/* ABC Analysis */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-4"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.4
          }}>

          <h3 className="font-semibold text-[#2E2E2E] mb-4">
            ABC Wastage Analysis
          </h3>
          <div className="space-y-4 mb-4">
            {Object.entries(abcData).map(([key, data], index) =>
            <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    Category {key} - {data.label}
                  </span>
                  <span className="text-sm font-semibold">${data.cost}</span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: data.color
                  }}
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${data.percentage}%`
                  }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5
                  }} />

                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 pt-2 border-t border-gray-100">
            {Object.entries(abcData).map(([key, data]) =>
            <div key={key} className="flex items-center gap-1.5">
                <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: data.color
                }} />

                <span className="text-xs text-gray-500">
                  {key}: {data.percentage}%
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Log */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.5
          }}>

          <div className="flex items-center gap-2 mb-4">
            <ClipboardListIcon size={18} className="text-[#4CAF50]" />
            <h3 className="font-semibold text-[#2E2E2E]">Recent Actions</h3>
          </div>
          {actionLogs.length === 0 ?
          <p className="text-sm text-gray-400 text-center py-4">
              No actions recorded yet
            </p> :

          <div className="space-y-3 max-h-64 overflow-y-auto">
              {actionLogs.map((log, index) =>
            <motion.div
              key={index}
              className="border-l-2 border-[#4CAF50] pl-3 py-2"
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.6 + index * 0.05
              }}>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#2E2E2E]">
                        {log.action}
                        {log.predictionTitle && `: ${log.predictionTitle}`}
                        {log.ingredient && `: ${log.ingredient}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {log.reason && `Reason: ${getReasonLabel(log.reason)}`}
                        {log.comment && ` - ${log.comment}`}
                        {log.quantity && ` • ${log.quantity}kg`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <UserIcon size={12} />
                      {log.person}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={12} />
                      {formatDateTime(log.timestamp)}
                    </span>
                  </div>
                </motion.div>
            )}
            </div>
          }
        </motion.div>
      </motion.div>
      <ManagerBottomNav />
    </div>);

}