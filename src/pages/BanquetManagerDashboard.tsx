import React, { useMemo, useState, Children } from 'react'
import { motion } from 'framer-motion'
import { ChefHatIcon, UsersIcon, BabyIcon, DollarSignIcon } from 'lucide-react'
import { BottomNav } from '../components/BottomNav'
import { TopNavButton } from '../components/TopNavButton'
import { Input } from '../components/Input'
type MenuType = 'breakfast' | 'lunch' | 'dinner' | 'snacks'
export function BanquetManagerDashboard() {
  const [adults, setAdults] = useState(0);
const [children, setChildren] = useState(0);
const [applyDiscount, setApplyDiscount] = useState(false);
const [discount, setDiscount] = useState(0);

  const [menuType, setMenuType] = useState<MenuType>('lunch')
  const [adultCount, setAdultCount] = useState('')
  const [childCount, setChildCount] = useState('')
  const [platePrice, setPlatePrice] = useState('')
  const totalCount = useMemo(() => {
    const adults = parseInt(adultCount) || 0
    const children = parseInt(childCount) || 0
    return adults + children
  }, [adultCount, childCount])
  const totalAmount = useMemo(() => {
    const price = parseFloat(platePrice) || 0
    return totalCount * price
  }, [totalCount, platePrice])
  const menuOptions: {
    value: MenuType
    label: string
    emoji: string
  }[] = [
    {
      value: 'breakfast',
      label: 'Breakfast',
      emoji: '🍳',
    },
    {
      value: 'lunch',
      label: 'Lunch',
      emoji: '🍛',
    },
    {
      value: 'dinner',
      label: 'Dinner',
      emoji: '🍽️',
    },

  ]
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] pb-24">
      <motion.div
        className="max-w-md mx-auto p-6"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        {/* Top Navigation */}
        <TopNavButton
          label="Go to Executive Chef"
          to="/executive-chef"
          icon={<ChefHatIcon size={18} />}
        />

        {/* Header */}
        <div className="mt-6 mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E]">Banquet Manager</h1>
          <p className="text-gray-500 text-sm mt-1">
            Plan your event menu & count
          </p>
        </div>

        {/* Menu Selection */}
<div className="bg-white rounded-xl shadow-lg p-5 mb-4">
  {/* Menu Type Selection */}
  <label className="block text-sm font-medium text-[#2E2E2E] mb-3">
    Select Menu Type
  </label>
  <div className="grid grid-cols-2 gap-3">
    {menuOptions.map((option) => (
      <motion.button
        key={option.value}
        onClick={() => setMenuType(option.value)}
        className={`p-4 rounded-xl border-2 transition-all ${
          menuType === option.value
            ? 'border-[#4CAF50] bg-[#E8F5E9]'
            : 'border-gray-100 bg-gray-50'
        }`}
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-2xl block mb-1">{option.emoji}</span>
        <span
          className={`text-sm font-medium ${
            menuType === option.value ? 'text-[#2E7D32]' : 'text-gray-600'
          }`}
        >
          {option.label}
        </span>
      </motion.button>
    ))}
  </div>
  </div>


        {/* Guest Count */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <h3 className="text-sm font-medium text-[#2E2E2E] mb-4 flex items-center gap-2">
            <UsersIcon size={18} className="text-[#4CAF50]" />
            Guest Count
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                <UsersIcon size={14} /> Adults
              </label>
              <input
                type="number"
                value={adultCount}
                onChange={(e) => setAdultCount(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-lg font-semibold text-center"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                <BabyIcon size={14} /> Children
              </label>
              <input
                type="number"
                value={childCount}
                onChange={(e) => setChildCount(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-lg font-semibold text-center"
              />
            </div>
          </div>
        </div>

        {/* Plate Price */}
       <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
  <label className="block text-sm font-medium text-[#2E2E2E] mb-3 flex items-center gap-2">
    <DollarSignIcon size={18} className="text-[#4CAF50]" />
    Plate Price
  </label>
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
      $
    </span>
    <input
      type="number"
      value={platePrice}
      onChange={(e) => setPlatePrice(e.target.value)}
      placeholder="0.00"
      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-lg font-semibold"
    />
  </div>

  {/* Checkbox to apply discount */}
  <div className="mt-4 flex items-center gap-2">
    <input
      type="checkbox"
      id="applyDiscount"
      checked={applyDiscount}
      onChange={(e) => setApplyDiscount(e.target.checked)}
      className="h-4 w-4 text-[#4CAF50] rounded focus:ring-[#4CAF50]/20"
    />
    <label htmlFor="applyDiscount" className="text-sm font-medium text-[#2E2E2E]">
      Apply Discount
    </label>
  </div>

  {/* Discount field (conditionally rendered) */}
  {applyDiscount && (
    <div className="mt-4">
      <label className="block text-sm font-medium text-[#2E2E2E] mb-3 flex items-center gap-2">
        <DollarSignIcon size={18} className="text-[#4CAF50]" />
        Discount (%)
      </label>
      <div className="relative">
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-lg font-semibold"
        />
      </div>
    </div>
  )}
</div>


        {/* Total Calculation */}
        <motion.div
          className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-xl shadow-lg p-6 text-white"
          initial={{
            scale: 0.95,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80 text-sm">Total Guests</span>
            <span className="text-2xl font-bold">{totalCount}</span>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Total Amount</span>
              <span className="text-3xl font-bold">
                $
                {totalAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="text-white/60 text-xs mt-2">
              {totalCount} guests × ${parseFloat(platePrice) || 0} per plate
            </p>
          </div>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
