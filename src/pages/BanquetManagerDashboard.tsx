import React, { useMemo, useState, Children } from 'react'
import { motion } from 'framer-motion'
import { ChefHatIcon, UsersIcon, BabyIcon, DollarSignIcon, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { BottomNav } from '../components/BottomNav'
import { TopNavButton } from '../components/TopNavButton'
import { Input } from '../components/Input'

type MenuType = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

interface MenuItem {
  id: string
  name: string
  description: string
  icon: string
}

const menuItemsData: Record<MenuType, MenuItem[]> = {
  breakfast: [
    { id: 'b1', name: 'Menu 01', description: '', icon: '' },
    { id: 'b2', name: 'Menu 02', description: '', icon: '' },
    { id: 'b3', name: 'Menu 03', description: '', icon: '' },
    { id: 'b4', name: 'Menu 04', description: '', icon: '' }, 

  ],
  lunch: [
       { id: 'b1', name: 'Menu 01', description: '', icon: '' },
    { id: 'b2', name: 'Menu 02', description: '', icon: '' },
    { id: 'b3', name: 'Menu 03', description: '', icon: '' },
    { id: 'b4', name: 'Menu 04', description: '', icon: '' },
  ],
  dinner: [
   { id: 'b1', name: 'Menu 01', description: '', icon: '' },
    { id: 'b2', name: 'Menu 02', description: '', icon: '' },
    { id: 'b3', name: 'Menu 03', description: '', icon: '' },
    { id: 'b4', name: 'Menu 04', description: '', icon: '' },
  ],
  snacks: [
     { id: 'b1', name: 'Menu 01', description: '', icon: '' },
    { id: 'b2', name: 'Menu 02', description: '', icon: '' },
    { id: 'b3', name: 'Menu 03', description: '', icon: '' },
    { id: 'b4', name: 'Menu 04', description: '', icon: '' },
  ],
}

export function BanquetManagerDashboard() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [menuType, setMenuType] = useState<MenuType>('lunch')
  const [adultCount, setAdultCount] = useState('')
  const [childCount, setChildCount] = useState('')
  const [platePrice, setPlatePrice] = useState('')
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([])
  const [expandMenuItems, setExpandMenuItems] = useState(true)
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
        onClick={() => {
          setMenuType(option.value)
          setSelectedMenuItems([])
        }}
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

        {/* Menu Items for Selected Type */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#2E2E2E] flex items-center gap-2">
              <ChefHatIcon size={18} className="text-[#4CAF50]" />
              {menuOptions.find(opt => opt.value === menuType)?.label} Menu Items
            </h3>
            <motion.button
              onClick={() => setExpandMenuItems(!expandMenuItems)}
              className="text-[#4CAF50] hover:bg-[#E8F5E9] p-2 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {expandMenuItems ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </motion.button>
          </div>
          
          {expandMenuItems && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {menuItemsData[menuType].map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    setSelectedMenuItems(prev => 
                      prev.includes(item.id) 
                        ? prev.filter(id => id !== item.id)
                        : [...prev, item.id]
                    )
                  }}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    selectedMenuItems.includes(item.id)
                      ? 'border-[#4CAF50] bg-[#E8F5E9]'
                      : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mt-1">
                    {selectedMenuItems.includes(item.id) ? (
                      <CheckCircle2 size={20} className="text-[#4CAF50]" />
                    ) : (
                      <Circle size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className={`font-medium text-sm ${
                        selectedMenuItems.includes(item.id) ? 'text-[#2E7D32]' : 'text-[#2E2E2E]'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {selectedMenuItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                <span className="font-medium text-[#4CAF50]">{selectedMenuItems.length}</span> item(s) selected
              </p>
            </div>
          )}
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

        {/* Reset and Submit Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <motion.button
            onClick={() => {
              setMenuType('lunch')
              setAdultCount('')
              setChildCount('')
              setPlatePrice('')
              setApplyDiscount(false)
              setDiscount(0)
              setSelectedMenuItems([])
            }}
            className="bg-gray-200 hover:bg-gray-300 text-[#2E2E2E] font-semibold py-3 px-6 rounded-xl transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
          <motion.button
            onClick={() => {
              alert(`Order Submitted!\n\nMenu Type: ${menuType}\nGuests: ${totalCount}\nTotal: $${totalAmount.toFixed(2)}\nSelected Items: ${selectedMenuItems.length}`)
            }}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
