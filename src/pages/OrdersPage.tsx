import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardListIcon,
  CalendarIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronRightIcon,
  FilterIcon } from
'lucide-react';
import { BottomNav } from '../components/BottomNav';
type OrderStatus =
'pending' |
'confirmed' |
'in-progress' |
'completed' |
'cancelled';
type Order = {
  id: string;
  eventName: string;
  date: string;
  guestCount: number;
  menuType: string;
  totalAmount: number;
  status: OrderStatus;
  clientName: string;
};
const mockOrders: Order[] = [
{
  id: '1',
  eventName: 'Wedding Reception',
  date: '2024-02-15',
  guestCount: 300,
  menuType: 'Dinner',
  totalAmount: 15000,
  status: 'confirmed',
  clientName: 'John & Sarah'
},
{
  id: '2',
  eventName: 'Corporate Conference',
  date: '2024-02-18',
  guestCount: 200,
  menuType: 'Lunch',
  totalAmount: 8500,
  status: 'pending',
  clientName: 'TechCorp Inc.'
},
{
  id: '3',
  eventName: 'Birthday Celebration',
  date: '2024-02-10',
  guestCount: 50,
  menuType: 'Dinner',
  totalAmount: 2500,
  status: 'completed',
  clientName: 'Mike Johnson'
},
{
  id: '4',
  eventName: 'Charity Gala',
  date: '2024-02-22',
  guestCount: 250,
  menuType: 'Dinner',
  totalAmount: 12000,
  status: 'in-progress',
  clientName: 'Hope Foundation'
},
{
  id: '5',
  eventName: 'Product Launch',
  date: '2024-02-08',
  guestCount: 100,
  menuType: 'Snacks',
  totalAmount: 3500,
  status: 'cancelled',
  clientName: 'StartupXYZ'
}];

export function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const filteredOrders =
  filter === 'all' ?
  mockOrders :
  mockOrders.filter((order) => order.status === filter);
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: <ClockIcon size={14} />,
          color: 'bg-amber-100 text-amber-700',
          label: 'Pending'
        };
      case 'confirmed':
        return {
          icon: <CheckCircleIcon size={14} />,
          color: 'bg-blue-100 text-blue-700',
          label: 'Confirmed'
        };
      case 'in-progress':
        return {
          icon: <ClockIcon size={14} />,
          color: 'bg-purple-100 text-purple-700',
          label: 'In Progress'
        };
      case 'completed':
        return {
          icon: <CheckCircleIcon size={14} />,
          color: 'bg-green-100 text-green-700',
          label: 'Completed'
        };
      case 'cancelled':
        return {
          icon: <XCircleIcon size={14} />,
          color: 'bg-red-100 text-red-700',
          label: 'Cancelled'
        };
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    confirmed: mockOrders.filter((o) => o.status === 'confirmed').length,
    'in-progress': mockOrders.filter((o) => o.status === 'in-progress').length,
    completed: mockOrders.filter((o) => o.status === 'completed').length,
    cancelled: mockOrders.filter((o) => o.status === 'cancelled').length
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

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] flex items-center gap-2">
            <ClipboardListIcon className="text-[#4CAF50]" size={24} />
            Orders
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your event orders</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-4"
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

            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-bold text-[#2E2E2E]">
              {statusCounts.all}
            </p>
          </motion.div>
          <motion.div
            className="bg-green-50 rounded-xl shadow-lg p-4"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.15
            }}>

            <p className="text-xs text-green-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {statusCounts.confirmed}
            </p>
          </motion.div>
          <motion.div
            className="bg-amber-50 rounded-xl shadow-lg p-4"
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

            <p className="text-xs text-amber-600">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {statusCounts.pending}
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-2 mb-4 flex gap-1 overflow-x-auto"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.25
          }}>

          {(
          ['all', 'pending', 'confirmed', 'in-progress', 'completed'] as const).
          map((status) =>
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${filter === status ? 'bg-[#4CAF50] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>

              {status === 'all' ?
            'All' :
            status.charAt(0).toUpperCase() +
            status.slice(1).replace('-', ' ')}
            </button>
          )}
        </motion.div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <motion.div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
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
                whileTap={{
                  scale: 0.98
                }}>

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">
                      {order.eventName}
                    </h3>
                    <p className="text-sm text-gray-500">{order.clientName}</p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>

                    {statusConfig.icon}
                    {statusConfig.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <CalendarIcon size={14} />
                    {formatDate(order.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon size={14} />
                    {order.guestCount} guests
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                    {order.menuType}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-[#4CAF50]">
                    ${order.totalAmount.toLocaleString()}
                  </span>
                  <ChevronRightIcon size={20} className="text-gray-400" />
                </div>
              </motion.div>);

          })}
        </div>

        {filteredOrders.length === 0 &&
        <div className="text-center py-12">
            <ClipboardListIcon
            size={48}
            className="mx-auto text-gray-300 mb-4" />

            <p className="text-gray-500">No orders found</p>
          </div>
        }
      </motion.div>

      <BottomNav />
    </div>);

}