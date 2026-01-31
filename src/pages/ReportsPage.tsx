import React from 'react';
import { motion } from 'framer-motion';
import {
  FileTextIcon,
  DownloadIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  BarChart2Icon } from
'lucide-react';
import { ManagerBottomNav } from '../components/ManagerBottomNav';
type ReportCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lastGenerated: string;
};
const reports: ReportCard[] = [
{
  id: 'wastage-summary',
  title: 'Wastage Summary Report',
  description:
  'Overview of total wastage by category, cost impact, and monthly trends. Includes ABC analysis breakdown and key performance indicators.',
  icon: <ClipboardListIcon size={32} />,
  color: '#4CAF50',
  bgColor: '#E8F5E9',
  lastGenerated: 'Jan 26, 2024'
},
{
  id: 'wastage-detail',
  title: 'Wastage Detail Report',
  description:
  'Detailed breakdown of wastage per ingredient, event, and reason. Includes staff actions, timestamps, and recommendations for reduction.',
  icon: <BarChart2Icon size={32} />,
  color: '#F59E0B',
  bgColor: '#FEF3C7',
  lastGenerated: 'Jan 25, 2024'
}];

export function ReportsPage() {
  const handleDownload = (reportId: string) => {
    // Simulate download - in real app would generate PDF/Excel
    alert(`Downloading ${reportId} report...`);
  };
  const handleView = (reportId: string) => {
    // Navigate to detailed report view
    alert(`Opening ${reportId} report...`);
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
            <FileTextIcon className="text-[#4CAF50]" size={24} />
            Reports
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate & download wastage reports
          </p>
        </div>

        {/* Report Cards */}
        <div className="space-y-4">
          {reports.map((report, index) =>
          <motion.div
            key={report.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.1
            }}>

              {/* Card Header with Icon */}
              <div
              className="p-5 flex items-start gap-4"
              style={{
                backgroundColor: report.bgColor
              }}>

                <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: 'white',
                  color: report.color
                }}>

                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#2E2E2E] text-lg">
                    {report.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Last generated: {report.lastGenerated}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 pt-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {report.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                  onClick={() => handleView(report.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4CAF50] text-white rounded-xl text-sm font-medium"
                  whileTap={{
                    scale: 0.98
                  }}>

                    View Report
                    <ChevronRightIcon size={16} />
                  </motion.button>
                  <motion.button
                  onClick={() => handleDownload(report.id)}
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-medium"
                  whileTap={{
                    scale: 0.98
                  }}>

                    <DownloadIcon size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Stats */}
        <motion.div
          className="mt-6 bg-white rounded-xl shadow-lg p-5"
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
            Report Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Reports Generated</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">24</p>
              <p className="text-xs text-green-500 mt-1">This month</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Downloads</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">156</p>
              <p className="text-xs text-green-500 mt-1">All time</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ManagerBottomNav />
    </div>);

}