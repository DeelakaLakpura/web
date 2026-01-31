import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  WifiIcon,
  WifiOffIcon,
  ClipboardCheckIcon,
  Coffee,
  Sun,
  Utensils,
  Moon,
  Wine } from
'lucide-react';
import { TopNavButton } from '../components/TopNavButton';
import { Button } from '../components/Button';

/* ================= TYPES ================= */

type WastageReason =
'overproduction' |
'expiry' |
'preparation_issues' |
'other';

type WastageEntry = {
  id: string;
  ingredient: string;
  quantity: number;
  reason: WastageReason;
  comment?: string;
  timestamp: string;
  synced: boolean;
};

type MenuType = 'breakfast' | 'lunch' | 'dinner' | 'banquet' | 'bar';

/* ================= CONSTANTS ================= */

const menuTypes = [
{ value: 'breakfast', label: 'Breakfast', icon: Coffee },
{ value: 'lunch', label: 'Lunch', icon: Sun },
{ value: 'dinner', label: 'Dinner', icon: Utensils }] as
const;

const reasonOptions: {value: WastageReason;label: string;}[] = [
{ value: 'overproduction', label: 'Overproduction' },
{ value: 'expiry', label: 'Expiry' },
{ value: 'preparation_issues', label: 'Preparation Issues' }];


/* ================= MOCK APPROVED PLAN ================= */

const approvedPlan = {
  title: 'Lunch Service Plan',
  date: 'Today, Jan 26',
  status: 'updated',
  menuType: 'Lunch', // Added menuType
  items: [
  { name: 'Grilled Chicken', quantity: 45 },
  { name: 'Vegetable Curry', quantity: 30 },
  { name: 'Caesar Salad', quantity: 25 },
  { name: 'Tomato Soup', quantity: 20 }]

};

/* ================= COMPONENT ================= */

export function KitchenStaffDashboard() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState<WastageReason | ''>('');
  const [otherComment, setOtherComment] = useState('');
  const [wastageLog, setWastageLog] = useState<WastageEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [menuType, setMenuType] = useState<MenuType | null>(null);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const stored = localStorage.getItem('wastageLog');
    if (stored) setWastageLog(JSON.parse(stored));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /* ================= HELPERS ================= */

  const selectedMenu = menuTypes.find((m) => m.value === menuType);

  const syncOfflineData = () => {
    const stored = localStorage.getItem('wastageLog');
    if (!stored) return;

    const synced = JSON.parse(stored).map((e: WastageEntry) => ({
      ...e,
      synced: true
    }));

    localStorage.setItem('wastageLog', JSON.stringify(synced));
    setWastageLog(synced);
  };

  const handleSubmit = () => {
    if (!ingredient || !quantity || !reason) return;
    if (reason === 'other' && !otherComment.trim()) return;

    const newEntry: WastageEntry = {
      id: Date.now().toString(),
      ingredient,
      quantity: Number(quantity),
      reason,
      comment: reason === 'other' ? otherComment : undefined,
      timestamp: new Date().toISOString(),
      synced: isOnline
    };

    const updated = [...wastageLog, newEntry];
    setWastageLog(updated);
    localStorage.setItem('wastageLog', JSON.stringify(updated));

    const allWastage = JSON.parse(localStorage.getItem('allWastage') || '[]');
    allWastage.push({ ...newEntry, person: 'Kitchen Staff' });
    localStorage.setItem('allWastage', JSON.stringify(allWastage));

    setIngredient('');
    setQuantity('');
    setReason('');
    setOtherComment('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-8">
      <motion.div
        className="max-w-md mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>

        {/* Top Nav */}
        <TopNavButton
          label="Go to Manager Dashboard"
          to="/manager"
          icon={<BarChart3Icon size={18} />} />


        {/* Header */}
        <div className="mt-6 mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kitchen Staff</h1>
            <p className="text-sm text-gray-500">View plans & log wastage</p>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            isOnline ?
            'bg-green-100 text-green-700' :
            'bg-red-100 text-red-700'}`
            }>

            {isOnline ? <WifiIcon size={14} /> : <WifiOffIcon size={14} />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>

        {/* ================= APPROVED PLAN ================= */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardCheckIcon size={18} className="text-green-600" />
              <h3 className="font-semibold">Approved Plan</h3>
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
              Updated
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-3">{approvedPlan.date}</p>

          {/* Menu Type Section */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100 mb-2">
            <span className="text-sm font-medium text-gray-700">Menu Type</span>
            <span className="text-sm font-semibold text-green-600">
              {approvedPlan.menuType}
            </span>
          </div>

          {/* Items Section */}
          <div className="space-y-2">
            {approvedPlan.items.map((item, i) =>
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">

                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold">
                  {item.quantity} Kg
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= MENU TYPE ================= */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <p className="text-sm font-medium mb-3">Select Menu Type</p>
          <div className="grid grid-cols-2 gap-3">
            {menuTypes.map((menu) => {
              const Icon = menu.icon;
              const active = menuType === menu.value;
              return (
                <motion.button
                  key={menu.value}
                  onClick={() => setMenuType(menu.value)}
                  whileTap={{ scale: 0.97 }}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2
                    ${
                  active ?
                  'border-green-500 bg-green-50 text-green-600' :
                  'border-gray-200'}`
                  }>

                  <Icon size={26} />
                  <span className="text-sm">{menu.label}</span>
                </motion.button>);

            })}
          </div>
        </div>

        {/* ================= LOG WASTAGE ================= */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          {/* Header with Menu Type */}
          <div className="flex items-center gap-3 mb-4">
            {selectedMenu ?
            <>
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <selectedMenu.icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold">Log Wastage</h3>
                  <p className="text-xs text-gray-500">
                    {selectedMenu.label} Menu
                  </p>
                </div>
              </> :

            <div>
                <h3 className="font-semibold">Log Wastage</h3>
                <p className="text-xs text-amber-500">
                  Select a menu type first
                </p>
              </div>
            }
          </div>

          {/* Ingredient */}
          <input
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Ingredient name"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)} />


          {/* Quantity */}
          <input
            type="number"
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Quantity (Kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} />


          {/* Reason */}
          <select
            className="w-full border rounded-lg p-2 mb-3"
            value={reason}
            onChange={(e) => setReason(e.target.value as WastageReason)}>

            <option value="">Select reason</option>
            {reasonOptions.map((r) =>
            <option key={r.value} value={r.value}>
                {r.label}
              </option>
            )}
          </select>

          {/* Other Reason */}
          {reason === 'other' &&
          <textarea
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Enter reason"
            value={otherComment}
            onChange={(e) => setOtherComment(e.target.value)} />

          }

          {/* Submit */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!menuType}>

            Log Wastage
          </Button>
        </div>

        {/* ================= RECENT LOGS ================= */}
        {wastageLog.length > 0 &&
        <div className="bg-white rounded-xl shadow-lg p-5">
            <h3 className="font-semibold mb-3">Recent Entries</h3>
            {wastageLog.
          slice(-5).
          reverse().
          map((e) =>
          <div
            key={e.id}
            className="flex justify-between text-sm py-2 border-b last:border-0">

                  <span>{e.ingredient}</span>
                  <span>{e.quantity} kg</span>
                </div>
          )}
          </div>
        }

        {showSuccess &&
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full">
            ✓ Wastage logged successfully
          </div>
        }
      </motion.div>
    </div>);

}