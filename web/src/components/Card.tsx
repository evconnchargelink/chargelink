import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn.util';
import { BsCheckCircle } from 'react-icons/bs';
import { FiZap } from 'react-icons/fi';

const cardDesigns = [
  { 
    id: 'centurion', 
    name: 'Centurion Black', 
    gradient: 'from-zinc-950 via-black to-zinc-950',
    textColor: 'text-gray-300',
    accentColor: 'text-amber-200'
  },
  { 
    id: 'platinum', 
    name: 'Platinum Elite', 
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    textColor: 'text-gray-200',
    accentColor: 'text-gray-100'
  },
  { 
    id: 'obsidian', 
    name: 'Pure Obsidian', 
    gradient: 'from-neutral-950 via-zinc-950 to-neutral-950',
    textColor: 'text-gray-400',
    accentColor: 'text-zinc-300'
  },
  { 
    id: 'carbon', 
    name: 'Carbon Fiber', 
    gradient: 'from-stone-950 via-neutral-950 to-stone-950',
    textColor: 'text-gray-300',
    accentColor: 'text-stone-300'
  },
];

export default function CardSection({ user }: { user: any }) {
  const [selectedDesign, setSelectedDesign] = useState(user?.card_design || 'centurion');
  const [cardName, setCardName] = useState(user?.card_name || user?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOrderingPhysical, setIsOrderingPhysical] = useState(false);

  const cardNumber = user?.card_number || '3763 856001 00';
  const memberSince = user?.created_date ? new Date(user.created_date).getFullYear() : new Date().getFullYear();


  const currentDesign = cardDesigns.find(d => d.id === selectedDesign) || cardDesigns[0];

  return (
    <div className="w-full h-full">

      {/* Virtual Card Display - Centurion Style */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="perspective-1000">
            <div className={cn(
              "relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl p-8",
              "bg-gradient-to-br shadow-2xl",
              "transform transition-transform duration-300 hover:scale-[1.02]",
              currentDesign.gradient,
              "border-2 border-white/5"
            )}>
              {/* Ornate Border - Amex Style */}
              <div className="absolute inset-2 rounded-xl border-2 border-white/10 pointer-events-none"></div>
              <div className="absolute inset-4 rounded-lg border border-white/5 pointer-events-none"></div>
              
              {/* Corner Decorations */}
              <svg className="absolute top-3 left-3 w-12 h-12 opacity-20" viewBox="0 0 50 50" fill="none">
                <path d="M0 0 L15 0 L15 2 L2 2 L2 15 L0 15 Z" fill="white"/>
                <path d="M8 8 L15 15" stroke="white" strokeWidth="0.5"/>
              </svg>
              <svg className="absolute top-3 right-3 w-12 h-12 opacity-20 rotate-90" viewBox="0 0 50 50" fill="none">
                <path d="M0 0 L15 0 L15 2 L2 2 L2 15 L0 15 Z" fill="white"/>
                <path d="M8 8 L15 15" stroke="white" strokeWidth="0.5"/>
              </svg>
              <svg className="absolute bottom-3 left-3 w-12 h-12 opacity-20 -rotate-90" viewBox="0 0 50 50" fill="none">
                <path d="M0 0 L15 0 L15 2 L2 2 L2 15 L0 15 Z" fill="white"/>
                <path d="M8 8 L15 15" stroke="white" strokeWidth="0.5"/>
              </svg>
              <svg className="absolute bottom-3 right-3 w-12 h-12 opacity-20 rotate-180" viewBox="0 0 50 50" fill="none">
                <path d="M0 0 L15 0 L15 2 L2 2 L2 15 L0 15 Z" fill="white"/>
                <path d="M8 8 L15 15" stroke="white" strokeWidth="0.5"/>
              </svg>

              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] rounded-2xl" style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255,255,255,0.03) 2px,
                  rgba(255,255,255,0.03) 4px
                )`,
              }}></div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between z-10">
                {/* Top Section - Brand Name */}
                <div className="text-center">
                  <h2 className={cn(
                    "text-2xl font-black tracking-[0.3em] mb-1",
                    currentDesign.textColor
                  )}>
                    CHARGELINK
                  </h2>
                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Center Section - Logo/Icon */}
                <div className="flex justify-center items-center">
                  <div className="relative">
                    {/* Outer circle with decorative ring */}
                    <div className="w-28 h-28 rounded-full border-2 border-white/20 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center backdrop-blur-sm">
                        <FiZap className={cn("w-12 h-12", currentDesign.accentColor)} strokeWidth={1.5} />
                      </div>
                    </div>
                    {/* Decorative elements around logo */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-1 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Card Number - Minimal Style */}
                <div className="flex justify-center gap-6 mb-6">
                  {cardNumber.split(' ').map((group: string, index: number) => (
                    <span key={index} className={cn(
                      "text-lg font-light tracking-[0.2em]",
                      currentDesign.textColor,
                      "opacity-60"
                    )}>
                      {group}
                    </span>
                  ))}
                </div>

                {/* Bottom Section - Name & Member Since */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className={cn("text-[10px] tracking-[0.15em] mb-1 opacity-40", currentDesign.textColor)}>
                      MEMBER NAME
                    </p>
                    <p className={cn(
                      "text-sm font-light tracking-[0.15em] uppercase",
                      currentDesign.textColor
                    )}>
                      {cardName || 'Your Name'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-[10px] tracking-[0.15em] mb-1 opacity-40", currentDesign.textColor)}>
                      MEMBER SINCE
                    </p>
                    <p className={cn("text-sm font-light tracking-[0.15em]", currentDesign.textColor)}>
                      {memberSince}
                    </p>
                  </div>
                </div>
              </div>

              {/* Holographic shimmer effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
              >
                <BsCheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Card updated successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}