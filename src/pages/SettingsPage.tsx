import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  Trash2Icon,
  EditIcon,
  SaveIcon,
  XIcon,
  Coffee,
  Sun,
  Utensils,
  Moon,
  Wine,
  ChevronRightIcon } from
'lucide-react';
import { ManagerBottomNav } from '../components/ManagerBottomNav';
type MenuType = 'breakfast' | 'lunch' | 'dinner' | 'banquet' | 'bar';
type Ingredient = {
  id: string;
  name: string;
  quantity: number;
};
type Menu = {
  id: string;
  type: MenuType;
  name: string;
  ingredients: Ingredient[];
};
export function SettingsPage() {
  const location = useLocation();
  const hideManagerSections = (location as any)?.state?.hideManagerSections;
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [newMenuType, setNewMenuType] = useState<MenuType>('breakfast');
  const [newMenuName, setNewMenuName] = useState('');
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientQuantity, setNewIngredientQuantity] = useState('');
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  // Manager-only tools state
  type Section = {
    id: string;
    title: string;
    description?: string;
  };
  type FoodRule = {
    id: string;
    name: string;
    rule: string;
  };
  type IngredientCost = {
    id: string;
    name: string;
    cost: number;
  };
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDesc, setNewSectionDesc] = useState('');
  const [foodRules, setFoodRules] = useState<FoodRule[]>([]);
  const [newFoodRuleName, setNewFoodRuleName] = useState('');
  const [newFoodRuleRule, setNewFoodRuleRule] = useState('');
  const [ingredientCosts, setIngredientCosts] = useState<IngredientCost[]>([]);
  const [newIngredientCostName, setNewIngredientCostName] = useState('');
  const [newIngredientCostValue, setNewIngredientCostValue] = useState('');
  const isManagerRoute = location.pathname.startsWith('/manager');
  const menuTypes = [
  {
    value: 'breakfast',
    label: 'Breakfast',
    icon: Coffee
  },
  {
    value: 'lunch',
    label: 'Lunch',
    icon: Sun
  },
  {
    value: 'dinner',
    label: 'Dinner',
    icon: Utensils
  },
  {
    value: 'banquet',
    label: 'Banquet',
    icon: Moon
  },
  {
    value: 'bar',
    label: 'Bar',
    icon: Wine
  }];

  const handleAddMenu = () => {
    if (!newMenuName) return;
    const newMenu: Menu = {
      id: Date.now().toString(),
      type: newMenuType,
      name: newMenuName,
      ingredients: []
    };
    setMenus([...menus, newMenu]);
    setNewMenuName('');
    setIsAddingMenu(false);
  };
  const handleAddIngredient = () => {
    if (!newIngredientName || !newIngredientQuantity || !selectedMenu) return;
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredientName,
      quantity: Number(newIngredientQuantity)
    };
    const updatedMenus = menus.map((menu) =>
    menu.id === selectedMenu.id ?
    {
      ...menu,
      ingredients: [...menu.ingredients, newIngredient]
    } :
    menu
    );
    setMenus(updatedMenus);
    setNewIngredientName('');
    setNewIngredientQuantity('');
    setIsAddingIngredient(false);
  };
  const handleDeleteMenu = (menuId: string) => {
    setMenus(menus.filter((menu) => menu.id !== menuId));
    if (selectedMenu?.id === menuId) setSelectedMenu(null);
  };
  const handleDeleteIngredient = (menuId: string, ingredientId: string) => {
    const updatedMenus = menus.map((menu) =>
    menu.id === menuId ?
    {
      ...menu,
      ingredients: menu.ingredients.filter(
        (ing) => ing.id !== ingredientId
      )
    } :
    menu
    );
    setMenus(updatedMenus);
  };
  // Manager-only handlers
  const handleAddSection = () => {
    if (!newSectionTitle) return;
    const s: Section = { id: Date.now().toString(), title: newSectionTitle, description: newSectionDesc };
    setSections([...sections, s]);
    setNewSectionTitle('');
    setNewSectionDesc('');
  };
  const handleDeleteSection = (id: string) => setSections(sections.filter((s) => s.id !== id));
  const handleAddFoodRule = () => {
    if (!newFoodRuleName || !newFoodRuleRule) return;
    const r: FoodRule = { id: Date.now().toString(), name: newFoodRuleName, rule: newFoodRuleRule };
    setFoodRules([...foodRules, r]);
    setNewFoodRuleName('');
    setNewFoodRuleRule('');
  };
  const handleDeleteFoodRule = (id: string) => setFoodRules(foodRules.filter((r) => r.id !== id));
  const handleAddIngredientCost = () => {
    if (!newIngredientCostName || !newIngredientCostValue) return;
    const c: IngredientCost = { id: Date.now().toString(), name: newIngredientCostName, cost: Number(newIngredientCostValue) };
    setIngredientCosts([...ingredientCosts, c]);
    setNewIngredientCostName('');
    setNewIngredientCostValue('');
  };
  const handleDeleteIngredientCost = (id: string) => setIngredientCosts(ingredientCosts.filter((c) => c.id !== id));
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
        }}>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] flex items-center gap-2">
            <Utensils className="text-[#4CAF50]" size={24} />
            Menu Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage menus & ingredients
          </p>
        </div>

        {/* Add Menu Section */}
        {!isAddingMenu ?
        <motion.button
          onClick={() => setIsAddingMenu(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#4CAF50] text-white rounded-xl font-medium mb-6"
          whileTap={{
            scale: 0.98
          }}>

            <PlusIcon size={20} />
            Add New Menu
          </motion.button> :

        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-6"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}>

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#2E2E2E]">New Menu</h3>
              <button onClick={() => setIsAddingMenu(false)}>
                <XIcon size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <select
              className="w-full border rounded-lg p-2"
              value={newMenuType}
              onChange={(e) => setNewMenuType(e.target.value as MenuType)}>

                {menuTypes.map((type) =>
              <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
              )}
              </select>
              <input
              className="w-full border rounded-lg p-2"
              placeholder="Menu name (e.g., Lunch Special)"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)} />

              <motion.button
              onClick={handleAddMenu}
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#4CAF50] text-white rounded-lg font-medium"
              whileTap={{
                scale: 0.98
              }}>

                <SaveIcon size={18} />
                Save Menu
              </motion.button>
            </div>
          </motion.div>
        }

        {/* Menus List */}
        <div className="space-y-4 mb-6">
          {menus.map((menu) =>
          <motion.div
            key={menu.id}
            className="bg-white rounded-xl shadow-lg p-5"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    {(() => {
                      const IconComp = menuTypes.find((mt) => mt.value === menu.type)?.icon;
                      return IconComp ? <IconComp size={20} /> : null;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">
                      {menu.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {menuTypes.find((mt) => mt.value === menu.type)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                  onClick={() => setSelectedMenu(menu)}
                  className="p-1 text-gray-600 hover:text-[#4CAF50]">

                    <EditIcon size={18} />
                  </button>
                  <button
                  onClick={() => handleDeleteMenu(menu.id)}
                  className="p-1 text-gray-600 hover:text-red-500">

                    <Trash2Icon size={18} />
                  </button>
                </div>
              </div>
              {selectedMenu?.id === menu.id &&
            <div className="mt-3 space-y-3">
                  <h4 className="text-sm font-medium text-gray-600">
                    Ingredients
                  </h4>
                  {menu.ingredients.length > 0 ?
              menu.ingredients.map((ing) =>
              <div
                key={ing.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">

                        <div>
                          <p className="text-sm font-medium">{ing.name}</p>
                          <p className="text-xs text-gray-500">
                            {ing.quantity} kg
                          </p>
                        </div>
                        <button
                  onClick={() =>
                  handleDeleteIngredient(menu.id, ing.id)
                  }
                  className="p-1 text-gray-400 hover:text-red-500">

                          <Trash2Icon size={16} />
                        </button>
                      </div>
              ) :

              <p className="text-xs text-gray-400">
                      No ingredients added yet.
                    </p>
              }
                  {!isAddingIngredient ?
              <motion.button
                onClick={() => setIsAddingIngredient(true)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                whileTap={{
                  scale: 0.98
                }}>

                      <PlusIcon size={16} />
                      Add Ingredient
                    </motion.button> :

              <motion.div
                className="space-y-2"
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}>

                      <input
                  className="w-full border rounded-lg p-2 text-sm"
                  placeholder="Ingredient name"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)} />

                      <input
                  type="number"
                  className="w-full border rounded-lg p-2 text-sm"
                  placeholder="Quantity (kg)"
                  value={newIngredientQuantity}
                  onChange={(e) =>
                  setNewIngredientQuantity(e.target.value)
                  } />

                      <div className="flex gap-2">
                        <motion.button
                    onClick={handleAddIngredient}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#4CAF50] text-white rounded-lg text-sm font-medium"
                    whileTap={{
                      scale: 0.98
                    }}>

                          <SaveIcon size={16} />
                          Save
                        </motion.button>
                        <motion.button
                    onClick={() => setIsAddingIngredient(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    whileTap={{
                      scale: 0.98
                    }}>

                          <XIcon size={16} />
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
              }
                </div>
            }
            </motion.div>
          )}
        </div>

        {isManagerRoute && !hideManagerSections && (
        <div className="mb-6">
        

          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <h3 className="font-medium text-sm text-gray-700 mb-2">Define Food Rule</h3>
            <div className="space-y-2">
              {foodRules.map((r) => (
                <div key={r.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.rule}</p>
                  </div>
                  <button onClick={() => handleDeleteFoodRule(r.id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2Icon size={16} />
                  </button>
                </div>
              ))}
              <input className="w-full border rounded-lg p-2 text-sm" placeholder="Rule name" value={newFoodRuleName} onChange={(e) => setNewFoodRuleName(e.target.value)} />
              <input className="w-full border rounded-lg p-2 text-sm" placeholder="Rule expression (e.g., max 5 items)" value={newFoodRuleRule} onChange={(e) => setNewFoodRuleRule(e.target.value)} />
              <motion.button onClick={handleAddFoodRule} className="w-full flex items-center justify-center gap-2 py-2 bg-[#4CAF50] text-white rounded-lg text-sm font-medium" whileTap={{ scale: 0.98 }}>
                <SaveIcon size={16} />
                Save Rule
              </motion.button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <h3 className="font-medium text-sm text-gray-700 mb-2">Ingredient Cost</h3>
            <div className="space-y-2">
              {ingredientCosts.map((c) => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-gray-500">${c.cost.toFixed(2)} per kg</p>
                  </div>
                  <button onClick={() => handleDeleteIngredientCost(c.id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2Icon size={16} />
                  </button>
                </div>
              ))}
              <input className="w-full border rounded-lg p-2 text-sm" placeholder="Ingredient name" value={newIngredientCostName} onChange={(e) => setNewIngredientCostName(e.target.value)} />
              <input type="number" step="0.01" className="w-full border rounded-lg p-2 text-sm" placeholder="Cost per kg" value={newIngredientCostValue} onChange={(e) => setNewIngredientCostValue(e.target.value)} />
              <motion.button onClick={handleAddIngredientCost} className="w-full flex items-center justify-center gap-2 py-2 bg-[#4CAF50] text-white rounded-lg text-sm font-medium" whileTap={{ scale: 0.98 }}>
                <SaveIcon size={16} />
                Save Cost
              </motion.button>
            </div>
          </div>
        </div>
        )}

        {!((location as any)?.state?.hideBottomNav) && <ManagerBottomNav />}
      </motion.div>
    </div>);

}