import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LeafIcon } from '../components/LeafIcon';
export function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#C5E1A5] to-[#8BC34A] flex flex-col items-center justify-center p-6">
      <motion.div
        className="flex flex-col items-center"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.5
        }}>

        <LeafIcon size={100} animate />

        <motion.h1
          className="mt-8 text-4xl font-bold text-white drop-shadow-md"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.4,
            duration: 0.6
          }}>

          Smart Plate
        </motion.h1>

        <motion.p
          className="mt-3 text-lg text-white/90 text-center"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.6,
            duration: 0.6
          }}>

          Farm to Table, Fresh to You
        </motion.p>

        <motion.div
          className="mt-12 flex space-x-2"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1,
            duration: 0.5
          }}>

          {[0, 1, 2].map((i) =>
          <motion.div
            key={i}
            className="w-2 h-2 bg-white/60 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }} />

          )}
        </motion.div>
      </motion.div>
    </div>);

}