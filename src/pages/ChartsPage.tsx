import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon } from
'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend } from
'recharts';
import { ManagerBottomNav } from '../components/ManagerBottomNav';
// Mock data for Revenue
const revenueData = [
{
  month: 'Jan',
  revenue: 12500,
  target: 10000
},
{
  month: 'Feb',
  revenue: 8200,
  target: 10000
},
{
  month: 'Mar',
  revenue: 15800,
  target: 12000
},
{
  month: 'Apr',
  revenue: 9500,
  target: 12000
},
{
  month: 'May',
  revenue: 18200,
  target: 15000
},
{
  month: 'Jun',
  revenue: 21000,
  target: 18000
}];

// Mock data for Wastage
const wastageData = [
{
  month: 'Jan',
  wastage: 45,
  cost: 225
},
{
  month: 'Feb',
  wastage: 28,
  cost: 140
},
{
  month: 'Mar',
  wastage: 62,
  cost: 310
},
{
  month: 'Apr',
  wastage: 35,
  cost: 175
},
{
  month: 'May',
  wastage: 48,
  cost: 240
},
{
  month: 'Jun',
  wastage: 32,
  cost: 160
}];

// Wastage by reason
const wastageByReason = [
{
  name: 'Overproduction',
  value: 45,
  color: '#EF4444'
},
{
  name: 'Expiry',
  value: 25,
  color: '#F59E0B'
},
{
  name: 'Prep Issues',
  value: 20,
  color: '#8B5CF6'
},
{
  name: 'Other',
  value: 10,
  color: '#6B7280'
}];

type ChartTab = 'revenue' | 'wastage';
export function ChartsPage() {
  const [activeTab, setActiveTab] = useState<ChartTab>('revenue');
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalWastage = wastageData.reduce((sum, d) => sum + d.wastage, 0);
  const totalWastageCost = wastageData.reduce((sum, d) => sum + d.cost, 0);
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
            <BarChart3Icon className="text-[#4CAF50]" size={24} />
            Analytics Charts
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Revenue & Wastage Insights
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white rounded-xl shadow-lg p-1.5 mb-6 flex gap-1">
          <motion.button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'revenue' ? 'bg-[#4CAF50] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            whileTap={{
              scale: 0.98
            }}>

            <TrendingUpIcon size={16} className="inline mr-2" />
            Revenue
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('wastage')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'wastage' ? 'bg-[#4CAF50] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            whileTap={{
              scale: 0.98
            }}>

            <TrendingDownIcon size={16} className="inline mr-2" />
            Wastage
          </motion.button>
        </div>

        {activeTab === 'revenue' ?
        <>
            {/* Revenue Summary */}
            <motion.div
            className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-xl shadow-lg p-5 mb-4 text-white"
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

              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  Total Revenue (6 months)
                </span>
                <CalendarIcon size={18} className="text-white/60" />
              </div>
              <p className="text-3xl font-bold">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-white/60 text-xs mt-1">
                Avg: ${(totalRevenue / 6).toLocaleString()} / month
              </p>
            </motion.div>

            {/* Revenue Bar Chart */}
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

              <h3 className="font-semibold text-[#2E2E2E] mb-4">
                Monthly Revenue vs Target
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 0
                  }}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF" />

                    <YAxis
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF"
                    tickFormatter={(v) => `$${v / 1000}k`} />

                    <Tooltip
                    formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    '']
                    }
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />

                    <Bar
                    dataKey="revenue"
                    fill="#4CAF50"
                    radius={[4, 4, 0, 0]}
                    name="Revenue" />

                    <Bar
                    dataKey="target"
                    fill="#E8F5E9"
                    radius={[4, 4, 0, 0]}
                    name="Target" />

                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#4CAF50]"></div>
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#E8F5E9]"></div>
                  <span className="text-xs text-gray-500">Target</span>
                </div>
              </div>
            </motion.div>

            {/* Revenue Trend Line */}
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
              delay: 0.3
            }}>

              <h3 className="font-semibold text-[#2E2E2E] mb-4">
                Revenue Trend
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 0
                  }}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF" />

                    <YAxis
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF"
                    tickFormatter={(v) => `$${v / 1000}k`} />

                    <Tooltip
                    formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    'Revenue']
                    }
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />

                    <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4CAF50"
                    strokeWidth={3}
                    dot={{
                      fill: '#4CAF50',
                      strokeWidth: 2,
                      r: 4
                    }}
                    activeDot={{
                      r: 6,
                      fill: '#2E7D32'
                    }} />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </> :

        <>
            {/* Wastage Summary */}
            <motion.div
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg p-5 mb-4 text-white"
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

              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  Total Wastage (6 months)
                </span>
                <CalendarIcon size={18} className="text-white/60" />
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-3xl font-bold">{totalWastage} kg</p>
                  <p className="text-white/60 text-xs mt-1">
                    Cost: ${totalWastageCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Wastage Bar Chart */}
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

              <h3 className="font-semibold text-[#2E2E2E] mb-4">
                Monthly Wastage (kg)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                  data={wastageData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 0
                  }}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF" />

                    <YAxis
                    tick={{
                      fontSize: 12
                    }}
                    stroke="#9CA3AF" />

                    <Tooltip
                    formatter={(value: number, name: string) => [
                    name === 'wastage' ? `${value} kg` : `$${value}`,
                    name === 'wastage' ? 'Wastage' : 'Cost']
                    }
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />

                    <Bar
                    dataKey="wastage"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]} />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Wastage by Reason Pie Chart */}
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
              delay: 0.3
            }}>

              <h3 className="font-semibold text-[#2E2E2E] mb-4">
                Wastage by Reason
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                    data={wastageByReason}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value">

                      {wastageByReason.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                    </Pie>
                    <Tooltip
                    formatter={(value: number) => [`${value}%`, '']}
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />

                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {wastageByReason.map((item) =>
              <div key={item.name} className="flex items-center gap-1.5">
                    <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: item.color
                  }}>
                </div>
                    <span className="text-xs text-gray-600">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
              )}
              </div>
            </motion.div>
          </>
        }
      </motion.div>

      <ManagerBottomNav />
    </div>);

}