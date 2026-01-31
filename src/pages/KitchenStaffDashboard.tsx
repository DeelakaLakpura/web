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
  Wine,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ChefHatIcon
} from
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

type MenuTypeLocal = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

interface MenuItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const menuItemsData: Record<MenuTypeLocal, MenuItem[]> = {
  breakfast: [
    { id: 'b1', name: 'Pancakes & Eggs', description: 'Fluffy pancakes with scrambled eggs', icon: '🥞' },
    { id: 'b2', name: 'French Toast', description: 'Golden brown French toast with syrup', icon: '🍞' },
    { id: 'b3', name: 'Oatmeal Bowl', description: 'Creamy oatmeal with fresh berries', icon: '🥣' },
    { id: 'b4', name: 'Bacon & Toast', description: 'Crispy bacon with buttered toast', icon: '🥓' },
  ],
  lunch: [
    { id: 'l1', name: 'Grilled Chicken', description: 'Tender grilled chicken with vegetables', icon: '🍗' },
    { id: 'l2', name: 'Caesar Salad', description: 'Fresh Caesar salad with croutons', icon: '🥗' },
    { id: 'l3', name: 'Biryani', description: 'Fragrant basmati rice with spices', icon: '🍛' },
    { id: 'l4', name: 'Sandwich', description: 'Gourmet sandwich with fresh ingredients', icon: '🥪' },
  ],
  dinner: [
    { id: 'd1', name: 'Grilled Fish', description: 'Fresh grilled fish with lemon sauce', icon: '🐟' },
    { id: 'd2', name: 'Steak', description: 'Premium cut steak with garlic butter', icon: '🥩' },
    { id: 'd3', name: 'Pasta Carbonara', description: 'Creamy pasta with bacon and cheese', icon: '🍝' },
    { id: 'd4', name: 'Roasted Lamb', description: 'Tender roasted lamb with herbs', icon: '🍖' },
  ],
  snacks: [
    { id: 's1', name: 'Samosa', description: 'Crispy samosa with mint chutney', icon: '🥟' },
    { id: 's2', name: 'Pakora', description: 'Golden fried vegetable pakora', icon: '🍤' },
    { id: 's3', name: 'Cheese Board', description: 'Selection of cheeses and crackers', icon: '🧀' },
    { id: 's4', name: 'Spring Rolls', description: 'Crispy spring rolls with sweet sauce', icon: '🌶️' },
  ],
}

const reasonOptions: {value: WastageReason;label: string;}[] = [
{ value: 'overproduction', label: 'Overproduction' },
{ value: 'expiry', label: 'Expiry' },
{ value: 'preparation_issues', label: 'Preparation Issues' }];
// include 'other' so a textarea appears when selected
reasonOptions.push({ value: 'other', label: 'Other' });


/* ================= MOCK APPROVED PLAN ================= */

const approvedPlan = {
  id: 'plan-1',
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
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const [expandMenuItems, setExpandMenuItems] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [pendingPlans, setPendingPlans] = useState<any[]>([approvedPlan]);
  const [completedPlans, setCompletedPlans] = useState<any[]>([]);
  const [approvedPlanState, setApprovedPlanState] = useState<typeof approvedPlan | null>(null);

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

  // removed default mapping so menu items don't show until a menu type is selected

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

  const markPlanDone = (id: string) => {
    const plan = pendingPlans.find((p) => p.id === id);
    if (!plan) return;
    setPendingPlans((prev) => prev.filter((p) => p.id !== id));
    setCompletedPlans((prev) => [plan, ...prev]);
    setApprovedPlanState(plan);
    setActiveTab('completed');
    // ensure menu type cleared for new plan interaction
    setMenuType(null);
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

        {/* ================= PENDING / COMPLETED TABS ================= */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'pending' ? 'bg-green-50 text-green-600' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('pending')}>
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'completed' ? 'bg-green-50 text-green-600' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('completed')}>
              Completed
            </button>
          </div>

          {activeTab === 'pending' ? (
            <div className="space-y-3">
              {pendingPlans.length === 0 && <p className="text-xs text-gray-500">No pending plans</p>}
              {pendingPlans.map((p) => (
                <div key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                      onClick={() => markPlanDone(p.id)}>
                      Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {completedPlans.length === 0 && <p className="text-xs text-gray-500">No completed plans</p>}
              {completedPlans.map((p) => (
                <div key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.date}</div>
                  </div>
                  <div className="text-sm text-green-600">Approved</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= APPROVED PLAN (shows after marking Done) ================= */}
        {approvedPlanState && (
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

          <p className="text-xs text-gray-500 mb-3">{approvedPlanState.date}</p>

          {/* Menu Type Section */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100 mb-2">
            <span className="text-sm font-medium text-gray-700">Menu Type</span>
            <span className="text-sm font-semibold text-green-600">
              {approvedPlanState.menuType}
            </span>
          </div>

          {/* Items Section */}
          <div className="space-y-2">
            {approvedPlanState.items.map((item: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">

                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold">
                  {item.quantity} Kg
                </span>
              </div>
            ))}
          </div>
        </div>)}

        {/* Show menu selection and wastage logging only after a plan is approved */}
        {approvedPlanState && (
        <>
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

        {/* ================= MENU ITEMS (Banquet-style) ================= */}
   <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
  {menuType && (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#2E2E2E] flex items-center gap-2">
          <ChefHatIcon size={18} className="text-[#4CAF50]" />
          {menuType.charAt(0).toUpperCase() + menuType.slice(1)} Menu Items
        </h3>

        <motion.button
          onClick={() => setExpandMenuItems(!expandMenuItems)}
          className="text-[#4CAF50] hover:bg-[#E8F5E9] p-2 rounded-lg transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {expandMenuItems ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.button>
      </div>

      {/* Expandable menu list */}
      {expandMenuItems && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {menuItemsData[menuType as MenuTypeLocal].map((item) => (
            <motion.div
              key={item.id}
              onClick={() =>
                setSelectedMenuItems((prev) =>
                  prev.includes(item.id)
                    ? prev.filter((id) => id !== item.id)
                    : [...prev, item.id]
                )
              }
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
                  <span
                    className={`font-medium text-sm ${
                      selectedMenuItems.includes(item.id)
                        ? 'text-[#2E7D32]'
                        : 'text-[#2E2E2E]'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Selected count */}
      {selectedMenuItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <span className="font-medium text-[#4CAF50]">
              {selectedMenuItems.length}
            </span>{' '}
            item(s) selected
          </p>
        </div>
      )}
    </>
  )}
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
        </>
        )}

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