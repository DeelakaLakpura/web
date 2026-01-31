import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  Building2Icon,
  MapPinIcon,
  CameraIcon,
  SaveIcon,
  XIcon,
  ChevronRightIcon } from
'lucide-react';
import { ManagerBottomNav } from '../components/ManagerBottomNav';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Deelaka Perera',
    email: 'deelaka@smartplate.com',
    phone: '+94 77 123 4567',
    organization: 'Smart Plate',
    location: 'Colombo, Sri Lanka',
    bio: 'Manager at Smart Plate, passionate about reducing food waste and optimizing kitchen operations.'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEditToggle = () => {
    if (isEditing) {
      setProfile({ ...tempProfile });
    } else {
      setTempProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] pb-24">
      <motion.div
        className="max-w-md mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2E2E2E] flex items-center gap-2">
            <UserIcon className="text-[#4CAF50]" size={24} />
            Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}>

          {/* Profile Picture */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-[#E8F5E9] flex items-center justify-center overflow-hidden">
              <UserIcon size={48} className="text-[#4CAF50]" />
            </div>
            {isEditing &&
            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-100">
                <CameraIcon size={16} className="text-gray-600" />
              </button>
            }
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserIcon size={18} className="text-gray-500" />
              {isEditing ?
              <input
                className="flex-1 text-lg font-semibold outline-none"
                value={tempProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)} /> :


              <h2 className="text-lg font-semibold text-[#2E2E2E]">{profile.name}</h2>
              }
            </div>

            <div className="space-y-3">
              <ProfileField
                icon={<MailIcon size={18} className="text-gray-500" />}
                label="Email"
                value={isEditing ? tempProfile.email : profile.email}
                editable={isEditing}
                onChange={(e) => handleInputChange('email', e.target.value)} />

              <ProfileField
                icon={<PhoneIcon size={18} className="text-gray-500" />}
                label="Phone"
                value={isEditing ? tempProfile.phone : profile.phone}
                editable={isEditing}
                onChange={(e) => handleInputChange('phone', e.target.value)} />

              <ProfileField
                icon={<Building2Icon size={18} className="text-gray-500" />}
                label="Organization"
                value={isEditing ? tempProfile.organization : profile.organization}
                editable={isEditing}
                onChange={(e) => handleInputChange('organization', e.target.value)} />

              <ProfileField
                icon={<MapPinIcon size={18} className="text-gray-500" />}
                label="Location"
                value={isEditing ? tempProfile.location : profile.location}
                editable={isEditing}
                onChange={(e) => handleInputChange('location', e.target.value)} />

              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Bio</p>
                {isEditing ?
                <textarea
                  className="w-full p-2 border rounded-lg text-sm outline-none"
                  rows={3}
                  value={tempProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)} /> :


                <p className="text-sm text-gray-700">{profile.bio}</p>
                }
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit/Save Button */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>

          {isEditing ?
          <>
              <motion.button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#4CAF50] text-white rounded-xl font-medium"
              whileTap={{ scale: 0.98 }}>

                <SaveIcon size={18} />
                Save
              </motion.button>
              <motion.button
              onClick={handleEditToggle}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              whileTap={{ scale: 0.98 }}>

                <XIcon size={18} />
                Cancel
              </motion.button>
            </> :

          <motion.button
            onClick={handleEditToggle}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#4CAF50] text-white rounded-xl font-medium"
            whileTap={{ scale: 0.98 }}>

              <EditIcon size={18} />
              Edit Profile
            </motion.button>
          }
        </motion.div>

        {/* Additional Settings */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-5 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>

          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center gap-3">
              <ShieldIcon size={18} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-[#2E2E2E]">Privacy & Security</p>
                <p className="text-xs text-gray-500">Password, 2FA, sessions</p>
              </div>
            </div>
            <ChevronRightIcon size={18} className="text-gray-400" />
          </button>
        </motion.div>

        <ManagerBottomNav />
      </motion.div>
    </div>);

}

// Helper component for profile fields
function ProfileField({
  icon,
  label,
  value,
  editable,
  onChange






}: {icon: React.ReactNode;label: string;value: string;editable: boolean;onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        {icon}
        {editable ?
        <input
          className="flex-1 text-sm outline-none"
          value={value}
          onChange={onChange} /> :


        <p className="text-sm text-gray-700">{value}</p>
        }
      </div>
    </div>);

}