import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function BrainrotCard({ name, emoji, isSelected, onToggle, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 overflow-hidden border-4 ${
        isSelected 
          ? `border-white shadow-2xl ${color}` 
          : 'border-gray-300/50 bg-white/90 hover:border-white'
      }`}
      style={{
        backgroundImage: isSelected ? 'none' : 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
      }}
    >
      {/* Stud texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 2px, transparent 2px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="relative z-10">
        <div className="text-6xl mb-3 text-center drop-shadow-lg">
          {emoji}
        </div>
        <h3 className={`text-xl font-black text-center tracking-wide ${
          isSelected ? 'text-white drop-shadow-lg' : 'text-gray-800'
        }`}>
          {name}
        </h3>
      </div>

      {/* Selection checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl"
        >
          <Check className="w-6 h-6 text-green-600" strokeWidth={4} />
        </motion.div>
      )}
    </motion.div>
  );
}