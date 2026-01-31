import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LeafIcon } from '../components/LeafIcon';
export function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no authentication logic
  };
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4,
          ease: 'easeOut'
        }}>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <LeafIcon size={48} />
          </div>

          <h1 className="text-2xl font-semibold text-[#2E2E2E] text-center">
            Join FreshHarvest
          </h1>
          <p className="mt-2 text-[#BCAAA4] text-center text-sm">
            Start your fresh food journey
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="John Doe" />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com" />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••" />


            <div className="pt-2">
              <Button type="submit" variant="primary">
                Get Fresh
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-[#BCAAA4]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#4CAF50] font-medium hover:underline">

              Sign in
            </Link>
          </p>
        </div>

        <motion.div
          className="mt-8 flex justify-center opacity-30"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 0.3
          }}
          transition={{
            delay: 0.3
          }}>

          <LeafIcon size={24} />
        </motion.div>
      </motion.div>
    </div>);

}