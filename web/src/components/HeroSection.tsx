import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "../utils/cn.util";
import { HiMiniArrowRight } from 'react-icons/hi2';
import { LuMapPin, LuZap } from 'react-icons/lu';
import { FiCreditCard, FiTrendingUp } from 'react-icons/fi';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      title: "ChargeLink",
      subtitle: "Pioneering EV Infrastructure",
      description: "10,000+ stations. 500+ cities. One seamless network.",
      icon: LuZap,
      number: "01"
    },
    {
      title: "Host & Earn",
      subtitle: "Monetize Your Charger",
      description: "Transform your charging station into passive income.",
      icon: FiTrendingUp,
      number: "02"
    },
    {
      title: "Premium Card",
      subtitle: "Exclusive Rewards",
      description: "5% cashback. Zero fees. Infinite possibilities.",
      icon: FiCreditCard,
      number: "03"
    }
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <motion.div
      className="relative hidden lg:flex items-center justify-center h-[580px] w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Ambient Glow */}
      <motion.div 
        className="absolute w-96 h-96 bg-gray-800 rounded-full blur-[150px] opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Main Card */}
      <div className="relative w-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[560px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="w-full h-full" style={{
                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Floating Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 right-8 text-[160px] font-black text-white leading-none"
            >
              {currentSlideData.number}
            </motion.div>

            {/* Animated Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.line
                x1="0" y1="25%" x2="100%" y2="25%"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.line
                x1="0" y1="75%" x2="100%" y2="75%"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-10 z-10">
              {/* Top Section */}
              <div>
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-black" />
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-[2px] w-12 bg-white"></div>
                    <span className="text-white/60 text-sm font-semibold tracking-wider uppercase">
                      {currentSlideData.subtitle}
                    </span>
                  </div>
                  <h2 className="text-6xl font-black text-white mb-4 tracking-tight">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed max-w-sm">
                    {currentSlideData.description}
                  </p>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Stats Bar */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">99.8%</div>
                      <div className="text-xs text-white/50 font-medium">Uptime</div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">24/7</div>
                      <div className="text-xs text-white/50 font-medium">Support</div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">50K+</div>
                      <div className="text-xs text-white/50 font-medium">Users</div>
                    </div>
                  </div>
                </div>

                {/* Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {slides.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          idx === currentSlide ? "w-10 bg-white" : "w-1.5 bg-white/30"
                        )}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white text-sm font-semibold"
                  >
                    Explore
                    <HiMiniArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Light Sweep Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
     <div className="bg-white text-black min-h-screen overflow-x-hidden">


      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white" style={{clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)"}}></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3e%3cpath d='m 100 0 l 0 100 l -100 0 z' fill='none' stroke='%23000000' stroke-width='0.5'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`,
            }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
                {/* Left Column: Headline & Form */}
                <motion.div 
                    className="text-center lg:text-left py-16"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black">
                        The Future of <br/> EV Charging.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                        Find reliable stations instantly, or earn by sharing your own. Seamless, smart, and always ready.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                        <button 
                            className="flex-1 h-16 bg-black hover:bg-gray-800 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group flex items-center justify-center space-x-10"
                        >
                            <LuMapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Find Station
                            <HiMiniArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            className="flex-1 h-16 bg-white hover:bg-gray-50 text-black text-lg font-bold rounded-2xl border-2 border-black shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group flex items-center justify-center space-x-8"
                        >
                            <LuZap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Become a Host
                        </button>
                    </div>
                </motion.div>

                {/* Right Column: Stunning Carousel */}
                <HeroCarousel />
            </div>
        </div>
      </div>

  
    </div>
  );
};

export default HeroSection;
