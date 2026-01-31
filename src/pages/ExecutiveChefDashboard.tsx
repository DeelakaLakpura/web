import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  EditIcon,
  XIcon,
  LightbulbIcon,
  CalendarIcon,
  UsersIcon,
  ChefHatIcon,
  PlusIcon,
  ScaleIcon,
  PackageIcon } from
'lucide-react';
import { TopNavButton } from '../components/TopNavButton';
import { Button } from '../components/Button';

type MenuItem = {
  id: string;
  name: string;
  category: 'main' | 'appetizer' | 'dessert' | 'beverage';
  portionSize: number; // in grams per serving
  wasteFactor: number; // percentage of waste
  estimatedQuantity: number; // in kg
  calculatedQuantity: number; // in kg
  ingredients: Array<{
    name: string;
    quantityPerServing: number; // in grams
    unit: 'kg' | 'g' | 'ml' | 'l' | 'pieces';
  }>;
};

type Event = {
  id: string;
  title: string;
  date: string;
  guests: number;
  type: 'wedding' | 'corporate' | 'birthday' | 'other';
  mealType: 'lunch' | 'dinner' | 'buffet';
  menuItems: MenuItem[];
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed';
  totalEstimatedQuantity: number;
  totalCalculatedQuantity: number;
};

type Prediction = {
  id: string;
  eventId: string;
  title: string;
  prediction: string;
  evidence: string[];
  confidence: number;
  status: 'pending' | 'approved' | 'rejected' | 'updated';
  suggestedChanges?: {
    menuItems: Array<{
      itemId: string;
      adjustment: number; // percentage adjustment
      reason: string;
    }>;
    totalAdjustment: number;
  };
};

export function ExecutiveChefDashboard() {
  const navigate = useNavigate();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [events, setEvents] = useState<Event[]>([
  {
    id: '1',
    title: 'Wedding Reception',
    date: '2024-01-15',
    guests: 300,
    type: 'wedding',
    mealType: 'dinner',
    status: 'planning',
    totalEstimatedQuantity: 0,
    totalCalculatedQuantity: 0,
    menuItems: [
    {
      id: 'm1',
      name: 'Grilled Salmon',
      category: 'main',
      portionSize: 200,
      wasteFactor: 10,
      estimatedQuantity: 60,
      calculatedQuantity: 0,
      ingredients: [
      { name: 'Salmon', quantityPerServing: 150, unit: 'g' },
      { name: 'Lemon Butter Sauce', quantityPerServing: 30, unit: 'ml' },
      { name: 'Herbs', quantityPerServing: 5, unit: 'g' }]

    },
    {
      id: 'm2',
      name: 'Garlic Mashed Potatoes',
      category: 'main',
      portionSize: 150,
      wasteFactor: 8,
      estimatedQuantity: 45,
      calculatedQuantity: 0,
      ingredients: [
      { name: 'Potatoes', quantityPerServing: 120, unit: 'g' },
      { name: 'Butter', quantityPerServing: 20, unit: 'g' },
      { name: 'Garlic', quantityPerServing: 10, unit: 'g' }]

    },
    {
      id: 'm3',
      name: 'Chocolate Mousse',
      category: 'dessert',
      portionSize: 100,
      wasteFactor: 5,
      estimatedQuantity: 30,
      calculatedQuantity: 0,
      ingredients: [
      { name: 'Chocolate', quantityPerServing: 60, unit: 'g' },
      { name: 'Cream', quantityPerServing: 30, unit: 'ml' },
      { name: 'Eggs', quantityPerServing: 2, unit: 'pieces' }]

    }]

  },
  {
    id: '2',
    title: 'Corporate Conference',
    date: '2024-01-18',
    guests: 200,
    type: 'corporate',
    mealType: 'lunch',
    status: 'planning',
    totalEstimatedQuantity: 0,
    totalCalculatedQuantity: 0,
    menuItems: [
    {
      id: 'm4',
      name: 'Chicken Alfredo Pasta',
      category: 'main',
      portionSize: 250,
      wasteFactor: 12,
      estimatedQuantity: 50,
      calculatedQuantity: 0,
      ingredients: [
      { name: 'Chicken', quantityPerServing: 150, unit: 'g' },
      { name: 'Pasta', quantityPerServing: 80, unit: 'g' },
      { name: 'Cream Sauce', quantityPerServing: 50, unit: 'ml' }]

    },
    {
      id: 'm5',
      name: 'Caesar Salad',
      category: 'appetizer',
      portionSize: 120,
      wasteFactor: 15,
      estimatedQuantity: 24,
      calculatedQuantity: 0,
      ingredients: [
      { name: 'Romaine Lettuce', quantityPerServing: 80, unit: 'g' },
      { name: 'Croutons', quantityPerServing: 20, unit: 'g' },
      { name: 'Parmesan', quantityPerServing: 10, unit: 'g' }]

    }]

  }]
  );

  const [predictions, setPredictions] = useState<Prediction[]>([
  {
    id: '1',
    eventId: '1',
    title: 'Wedding Reception Quantity Optimization',
    prediction: 'Reduce salmon quantity by 15% and increase dessert portions by 10%',
    evidence: [
    'Historical data shows 20% salmon waste in similar events',
    'Guest feedback indicates preference for desserts',
    'Current season favors lighter main courses'],

    confidence: 88,
    status: 'pending',
    suggestedChanges: {
      menuItems: [
      { itemId: 'm1', adjustment: -15, reason: 'High waste rate observed' },
      { itemId: 'm3', adjustment: 10, reason: 'Popular choice increasing' }],

      totalAdjustment: -8
    }
  },
  {
    id: '2',
    eventId: '2',
    title: 'Corporate Lunch Planning',
    prediction: 'Increase pasta quantity by 20% due to higher expected attendance',
    evidence: [
    'Last minute RSVPs increased by 15%',
    'Weather forecast suggests indoor dining preference',
    'Similar corporate events had 18% higher consumption'],

    confidence: 92,
    status: 'pending',
    suggestedChanges: {
      menuItems: [
      { itemId: 'm4', adjustment: 20, reason: 'Higher expected attendance' },
      { itemId: 'm5', adjustment: 15, reason: 'Salad is a popular starter' }],

      totalAdjustment: 18
    }
  },
  {
    id: '3',
    title: 'Ingredient Cost Optimization',
    prediction: 'Substitute chicken with seasonal vegetables to reduce cost by 25%',
    evidence: [
    'Current chicken prices increased by 30%',
    'Seasonal vegetables are 40% cheaper this month',
    'Survey shows 60% of guests prefer vegetarian options'],

    confidence: 78,
    status: 'pending'
  }]
  );

  useEffect(() => {
    // Calculate quantities for all events
    const updatedEvents = events.map((event) => {
      let totalCalculated = 0;
      let totalEstimated = 0;

      const updatedMenuItems = event.menuItems.map((item) => {
        // Calculate quantity considering waste factor
        const calculatedQuantity = item.portionSize * event.guests * (1 + item.wasteFactor / 100) / 1000; // Convert to kg
        totalCalculated += calculatedQuantity;
        totalEstimated += item.estimatedQuantity;

        return {
          ...item,
          calculatedQuantity: Math.round(calculatedQuantity * 10) / 10
        };
      });

      return {
        ...event,
        menuItems: updatedMenuItems,
        totalCalculatedQuantity: Math.round(totalCalculated * 10) / 10,
        totalEstimatedQuantity: Math.round(totalEstimated * 10) / 10
      };
    });

    setEvents(updatedEvents);
  }, []);

  const handleApprove = (predictionId: string) => {
    const prediction = predictions.find((p) => p.id === predictionId);
    if (!prediction) return;

    if (prediction.eventId) {
      // Apply AI suggestions to the event
      const event = events.find((e) => e.id === prediction.eventId);
      if (event && prediction.suggestedChanges) {
        const updatedMenuItems = event.menuItems.map((item) => {
          const suggestion = prediction.suggestedChanges?.menuItems.find(
            (s) => s.itemId === item.id
          );
          if (suggestion) {
            const newQuantity = item.calculatedQuantity * (1 + suggestion.adjustment / 100);
            return {
              ...item,
              estimatedQuantity: Math.round(newQuantity * 10) / 10
            };
          }
          return item;
        });

        const updatedEvents = events.map((e) =>
        e.id === prediction.eventId ?
        {
          ...e,
          menuItems: updatedMenuItems,
          totalEstimatedQuantity: updatedMenuItems.reduce(
            (sum, item) => sum + item.estimatedQuantity,
            0
          )
        } :
        e
        );

        setEvents(updatedEvents);
      }
    }

    setPredictions((prev) =>
    prev.map((p) =>
    p.id === predictionId ?
    { ...p, status: 'approved' } :
    p
    )
    );
  };

  const handleUpdate = (id: string) => {
    setPredictions((prev) =>
    prev.map((p) =>
    p.id === id ?
    { ...p, status: 'updated' } :
    p
    )
    );
  };

  const handleRejectClick = (id: string) => {
    setSelectedPrediction(id);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    if (selectedPrediction && rejectReason.trim()) {
      const rejections = JSON.parse(localStorage.getItem('rejections') || '[]');
      const prediction = predictions.find((p) => p.id === selectedPrediction);
      rejections.push({
        predictionId: selectedPrediction,
        predictionTitle: prediction?.title,
        reason: rejectReason,
        person: 'Executive Chef',
        timestamp: new Date().toISOString(),
        action: 'Rejected'
      });
      localStorage.setItem('rejections', JSON.stringify(rejections));

      setPredictions((prev) =>
      prev.map((p) =>
      p.id === selectedPrediction ?
      { ...p, status: 'rejected' } :
      p
      )
      );

      setShowRejectModal(false);
      setRejectReason('');
      setSelectedPrediction(null);
    }
  };

  const handleViewQuantities = (event: Event) => {
    setSelectedEvent(event);
    setShowQuantityModal(true);
  };

  const handleManualAdjustment = (itemId: string, newQuantity: number) => {
    if (!selectedEvent) return;

    const updatedEvents = events.map((event) =>
    event.id === selectedEvent.id ?
    {
      ...event,
      menuItems: event.menuItems.map((item) =>
      item.id === itemId ?
      { ...item, estimatedQuantity: newQuantity } :
      item
      ),
      totalEstimatedQuantity: event.menuItems.reduce(
        (sum, item) => sum + (item.id === itemId ? newQuantity : item.estimatedQuantity),
        0
      )
    } :
    event
    );

    setEvents(updatedEvents);
  };

  const getStatusBadge = (status: Prediction['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Approved
          </span>);

      case 'rejected':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            Rejected
          </span>);

      case 'updated':
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            Updated
          </span>);

      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] pb-8">
      <motion.div
        className="max-w-md mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>

        {/* Top Navigation */}
        <TopNavButton
          label="Go to Kitchen Staff"
          to="/kitchen-staff"
          icon={<UtensilsIcon size={18} />} />


        {/* Header */}
        <div className="mt-6 mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] flex items-center gap-2">
            <SparklesIcon className="text-[#4CAF50]" size={24} />
            Executive Chef
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Event Planning & Menu Quantity Optimization
          </p>
        </div>

        {/* Events List */}
        <div className="mb-8">
          <h2 className="font-semibold text-[#2E2E2E] mb-4 flex items-center gap-2">
            <CalendarIcon size={18} className="text-[#4CAF50]" />
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {events.map((event, index) =>
            <motion.div
              key={event.id}
              className="bg-white rounded-xl shadow-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}>

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(event.date)} • {event.guests} guests
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                event.status === 'planning' ? 'bg-blue-100 text-blue-700' :
                event.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                'bg-amber-100 text-amber-700'}`
                }>
                    {event.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                 
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-blue-600">Calculated Quantity</p>
                    <p className="font-bold text-blue-600">
                      {event.totalCalculatedQuantity} kg
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                  variant="secondary"
                  onClick={() => handleViewQuantities(event)}
                  className="flex-1 text-sm">

                    <ScaleIcon size={14} className="mr-1" />
                    View Quantities
                  </Button>
                  <Button
                  variant="outline"
                  onClick={() => navigate(`/event-planner/${event.id}`)}
                  className="flex-1 text-sm">

                    <ChefHatIcon size={14} className="mr-1" />
                    Plan Menu
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* AI Predictions */}
        <h2 className="font-semibold text-[#2E2E2E] mb-4 flex items-center gap-2">
          <LightbulbIcon size={18} className="text-amber-500" />
          AI Quantity Predictions
        </h2>
        
        <div className="space-y-4">
          {predictions.map((prediction, index) => {
            const relatedEvent = prediction.eventId ?
            events.find((e) => e.id === prediction.eventId) :
            null;

            return (
              <motion.div
                key={prediction.id}
                className="bg-white rounded-xl shadow-lg p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}>

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <LightbulbIcon size={18} className="text-amber-500" />
                    <h3 className="font-semibold text-[#2E2E2E]">
                      {prediction.title}
                    </h3>
                  </div>
                  {getStatusBadge(prediction.status)}
                </div>

                {relatedEvent &&
                <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600">
                      Event: {relatedEvent.title} • {relatedEvent.guests} guests
                    </p>
                  </div>
                }

                <p className="text-gray-700 text-sm mb-4">
                  {prediction.prediction}
                </p>

                {/* Quantity Adjustments */}
                {prediction.suggestedChanges &&
                <div className="mb-4 bg-amber-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-700 mb-2">
                      Suggested Quantity Adjustments:
                    </p>
                    {relatedEvent && prediction.suggestedChanges.menuItems.map((adjustment, i) => {
                    const menuItem = relatedEvent.menuItems.find(
                      (item) => item.id === adjustment.itemId
                    );
                    return menuItem ?
                    <div key={i} className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            {menuItem.name}
                          </span>
                          <span className={`text-xs font-medium ${
                      adjustment.adjustment > 0 ? 'text-green-600' : 'text-red-600'}`
                      }>
                            {adjustment.adjustment > 0 ? '+' : ''}{adjustment.adjustment}%
                          </span>
                        </div> :
                    null;
                  })}
                    <div className="mt-2 pt-2 border-t border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Total Adjustment</span>
                        <span className={`text-sm font-bold ${
                      prediction.suggestedChanges.totalAdjustment > 0 ? 'text-green-600' : 'text-red-600'}`
                      }>
                          {prediction.suggestedChanges.totalAdjustment > 0 ? '+' : ''}
                          {prediction.suggestedChanges.totalAdjustment}%
                        </span>
                      </div>
                    </div>
                  </div>
                }

                {/* Confidence Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>AI Confidence</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]"
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence}%` }}
                      transition={{ delay: 0.3, duration: 0.5 }} />

                  </div>
                </div>

                {/* Evidence */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Supporting Evidence:
                  </p>
                  <ul className="space-y-1">
                    {prediction.evidence.map((item, i) =>
                    <li
                      key={i}
                      className="text-xs text-gray-600 flex items-start gap-2">

                        <span className="text-[#4CAF50] mt-0.5">•</span>
                        {item}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                {prediction.status === 'pending' &&
                <div className="flex gap-2">
                    <motion.button
                    onClick={() => handleApprove(prediction.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium"
                    whileTap={{ scale: 0.97 }}>

                      <CheckCircleIcon size={16} />
                      Approve
                    </motion.button>
                    <motion.button
                    onClick={() => handleRejectClick(prediction.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium"
                    whileTap={{ scale: 0.97 }}>

                      <XCircleIcon size={16} />
                      Reject
                    </motion.button>
                    <motion.button
                    onClick={() => handleUpdate(prediction.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium"
                    whileTap={{ scale: 0.97 }}>

                      <EditIcon size={16} />
                      Update
                    </motion.button>
                  </div>
                }
              </motion.div>);

          })}
        </div>
      </motion.div>

      {/* Quantity Details Modal */}
      <AnimatePresence>
        {showQuantityModal && selectedEvent &&
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQuantityModal(false)}>

            <motion.div
            className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Menu Quantity Details • {selectedEvent.guests} guests
                  </p>
                </div>
                <button
                onClick={() => setShowQuantityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full">

                  <XIcon size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Estimated Total</p>
                  <p className="text-xl font-bold text-gray-700">
                    {selectedEvent.totalEstimatedQuantity} kg
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600">Calculated Total</p>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedEvent.totalCalculatedQuantity} kg
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                <h4 className="font-medium text-[#2E2E2E] flex items-center gap-2">
                  <PackageIcon size={16} />
                  Menu Items Breakdown
                </h4>
                
                {selectedEvent.menuItems.map((item, index) =>
              <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-[#2E2E2E]">{item.name}</h5>
                        <p className="text-xs text-gray-500">
                          {item.portionSize}g per serving • {item.wasteFactor}% waste factor
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                  item.estimatedQuantity > item.calculatedQuantity ?
                  'bg-red-100 text-red-700' :
                  item.estimatedQuantity < item.calculatedQuantity ?
                  'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'}`
                  }>
                        {item.estimatedQuantity > item.calculatedQuantity ? 'Over' :
                    item.estimatedQuantity < item.calculatedQuantity ? 'Under' : 'Exact'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-500">Estimate</p>
                        <div className="flex items-center gap-2">
                          <input
                        type="number"
                        value={item.estimatedQuantity}
                        onChange={(e) => handleManualAdjustment(
                          item.id,
                          parseFloat(e.target.value) || 0
                        )}
                        className="w-16 text-sm font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none" />

                          <span className="text-sm text-gray-500">kg</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xs text-blue-600">Calculated</p>
                        <p className="text-sm font-medium text-blue-600">
                          {item.calculatedQuantity} kg
                        </p>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Ingredients needed:
                      </p>
                      <div className="space-y-1">
                        {item.ingredients.map((ing, i) => {
                      const totalQuantity = Math.round(
                        ing.quantityPerServing * selectedEvent.guests * (1 + item.wasteFactor / 100) / (
                        ing.unit === 'kg' ? 1000 : ing.unit === 'g' ? 1 : ing.unit === 'l' ? 1000 : 1) *
                        10) / 10;

                      return (
                        <div key={i} className="flex justify-between text-xs">
                              <span className="text-gray-600">{ing.name}</span>
                              <span className="font-medium text-gray-700">
                                {totalQuantity} {ing.unit}
                              </span>
                            </div>);

                    })}
                      </div>
                    </div>
                  </div>
              )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                variant="primary"
                onClick={() => {
                  // Save to localStorage for manager dashboard
                  const plannedEvents = JSON.parse(localStorage.getItem('plannedEvents') || '[]');
                  const existingIndex = plannedEvents.findIndex((e: Event) => e.id === selectedEvent.id);

                  if (existingIndex >= 0) {
                    plannedEvents[existingIndex] = selectedEvent;
                  } else {
                    plannedEvents.push(selectedEvent);
                  }

                  localStorage.setItem('plannedEvents', JSON.stringify(plannedEvents));
                  setShowQuantityModal(false);
                }}
                className="w-full">

                  Save Plan & Continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal &&
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowRejectModal(false)}>

            <motion.div
            className="bg-white w-full max-w-md rounded-t-3xl p-6"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E]">
                  Rejection Reason
                </h3>
                <button
                onClick={() => setShowRejectModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full">

                  <XIcon size={20} className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Please provide a reason for rejecting this prediction.
              </p>
              <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter your reason here..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none resize-none text-sm" />

              <div className="mt-4">
                <Button variant="primary" onClick={handleRejectConfirm}>
                  Confirm Rejection
                </Button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}