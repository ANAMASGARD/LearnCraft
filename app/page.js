"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { LandingThemeProvider } from "@/components/landing-theme-provider";
import { LandingThemeToggle } from "@/components/landing-theme-toggle";
import { 
  Sparkles, 
  BookOpen, 
  Brain, 
  Play, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";

// Enhanced universe background with nebula effects - Fixed positioning to prevent hydration mismatch
const EnhancedUniverseBackground = () => {
  // Use deterministic positioning to avoid hydration mismatch
  const starPositions = Array.from({ length: 20 }, (_, i) => ({
    left: (i * 17 + 23) % 100,
    top: (i * 13 + 37) % 100,
    width: 30 + ((i * 7) % 50),
    rotation: -30 + ((i * 11) % 60),
    delay: (i * 0.5) % 10,
    duration: 3 + ((i * 0.3) % 4)
  }));

  const twinklePositions = Array.from({ length: 100 }, (_, i) => ({
    left: (i * 7 + 11) % 100,
    top: (i * 13 + 19) % 100,
    delay: (i * 0.05) % 5,
    duration: 2 + ((i * 0.03) % 3)
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Nebula clouds */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [-180, 180],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-gradient-to-r from-pink-500/10 via-blue-500/15 to-transparent rounded-full blur-3xl"
      />
      
      {/* Enhanced shooting stars with deterministic positioning */}
      {starPositions.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            x: [-100, 1200],
            y: [-50, 800],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        >
          <div 
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              width: `${star.width}px`,
              transform: `rotate(${star.rotation}deg)`,
            }}
          />
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 bg-blue-300 rounded-full blur-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Twinkling stars with deterministic positioning */}
      {twinklePositions.map((twinkle, i) => (
        <motion.div
          key={`twinkle-${i}`}
          className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full"
          style={{
            left: `${twinkle.left}%`,
            top: `${twinkle.top}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: twinkle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: twinkle.delay,
          }}
        />
      ))}

      {/* Cosmic dust */}
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

// Floating particles component (stars) - Fixed positioning to prevent hydration mismatch
const FloatingStars = () => {
  // Use deterministic positioning to avoid hydration mismatch
  const floatingStarPositions = Array.from({ length: 50 }, (_, i) => ({
    left: (i * 19 + 31) % 100,
    top: (i * 23 + 17) % 100,
    duration: 3 + ((i * 0.08) % 4),
    delay: (i * 0.1) % 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingStarPositions.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-300 rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        />
      ))}
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

// Header component with theme toggle
const Header = () => {
  const { user } = useUser();
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">{/* Reduced padding from py-4 to py-2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 30px rgba(147, 51, 234, 0.4)", 
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-sm"
            />
            <span className="relative text-lg">🎓</span>{/* Reduced text size from text-2xl to text-lg */}
          </motion.div>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <LandingThemeToggle />
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          ) : (
            <Link href="/workspace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
              >
                Dashboard
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

// Hero section component with universe background
const HeroSection = () => {
  const { user } = useUser();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-gray-900 dark:to-blue-900"
    >
      {/* Enhanced Universe background */}
      <EnhancedUniverseBackground />
      <FloatingStars />
      
      {/* Galaxy background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 z-10 pt-16">{/* Reduced padding from pt-20 to pt-16 */}
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            AI-Powered Learning Revolution
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Main headline with student emoji logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-pink-500/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center mb-6 shadow-2xl"
              style={{
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.5), 0 0 80px rgba(236, 72, 153, 0.4)"
              }}
            >
              {/* Animated rotating border */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 blur-md"
              />
              
              {/* Inner glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30 blur-sm"
              />
              
              {/* Student emoji */}
              <motion.span 
                animate={{ 
                  rotate: [-5, 5, -5],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative text-4xl md:text-5xl z-10"
              >
                🎓
              </motion.span>
              
              {/* Sparkle effects */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-2 -right-2 text-yellow-300 text-xs"
              >
                ✨
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1.2, 0.8, 1.2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-1 -left-2 text-blue-300 text-xs"
              >
                ⭐
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-center"
            >
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                Learn
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["100%", "0%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                Craft
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your learning journey with AI-powered course creation, 
            personalized content, and interactive experiences that adapt to your pace.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {!user ? (
              <>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Start Learning Free
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block ml-2"
                    >
                      →
                    </motion.span>
                  </motion.button>
                </Link>
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/20 hover:border-blue-300/50 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                </Link>
              </>
            ) : (
              <Link href="/workspace">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Go to Dashboard
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block ml-2"
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter end={10000} />+
              </div>
              <div className="text-blue-200">Courses Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                <AnimatedCounter end={50000} />+
              </div>
              <div className="text-blue-200">Students Learning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">
                <AnimatedCounter end={95} />%
              </div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Features section with dark mode support
const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Course Creation",
      description: "Generate personalized courses in minutes with our advanced AI that understands your learning style and goals.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Interactive Content",
      description: "Engage with dynamic content that adapts to your progress and keeps you motivated throughout your journey.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Play,
      title: "YouTube Integration",
      description: "Access curated video content seamlessly integrated with your courses for enhanced learning experience.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights to optimize your study time.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Dark mode background elements */}
      <div className="absolute inset-0 dark:block hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the tools that make learning more effective and enjoyable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-blue-500/10 transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive demo section with dark mode support and beautiful images
const InteractiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { 
      name: "Course Creation", 
      content: "AI analyzes your goals and creates a personalized curriculum with adaptive learning paths that evolve based on your progress and preferences.",
      image: "/robot.png",
      features: ["AI-Powered Analysis", "Personalized Content", "Smart Curriculum"]
    },
    { 
      name: "Content Delivery", 
      content: "Interactive lessons adapt to your learning pace and style with multimedia content, quizzes, and real-time feedback mechanisms.",
      image: "/tech.svg",
      features: ["Interactive Lessons", "Multimedia Content", "Real-time Feedback"]
    },
    { 
      name: "Progress Tracking", 
      content: "Real-time analytics help you stay on track and motivated with detailed insights, achievement badges, and performance metrics.",
      image: "/calendar.svg",
      features: ["Real-time Analytics", "Achievement System", "Performance Insights"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Dark mode background elements */}
      <div className="absolute inset-0 dark:block hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-800 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the magic of AI-powered learning
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tab navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg dark:shadow-blue-500/20 border dark:border-gray-700">
              {tabs.map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {tab.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Demo content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800/70 rounded-3xl p-12 shadow-2xl dark:shadow-blue-500/10 backdrop-blur-sm border dark:border-gray-700"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {tabs[activeTab].name}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {tabs[activeTab].content}
                </p>

                {/* Feature list */}
                <div className="space-y-3 mb-8">
                  {tabs[activeTab].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Learn More <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>

              {/* Enhanced demo visual with actual image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Main demo container */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header with icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">{tabs[activeTab].name}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    </div>

                    {/* Main content area with image */}
                    <div className="bg-white/10 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-center mb-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center"
                        >
                          <Image 
                            src={tabs[activeTab].image} 
                            alt={tabs[activeTab].name} 
                            width={48} 
                            height={48}
                            className="filter brightness-0 invert"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Animated progress bars */}
                      <div className="space-y-3">
                        {[75, 60, 90].map((progress, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Module {index + 1}</span>
                              <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-3 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Try Demo</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials section with dark mode support
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Scientist",
      content: "LearnCraft transformed how I learn new technologies. The AI-powered courses are incredibly personalized.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "The YouTube integration and progress tracking keep me motivated. Best learning platform I've used.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      content: "Amazing how the AI adapts to my learning style. I've completed 5 courses in just 2 months!",
      avatar: "/user-avatar.png",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Dark mode background elements */}
      <div className="absolute inset-0 dark:block hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Loved by Learners
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful learners who trust LearnCraft
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/30 p-8 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-blue-500/10 transition-all duration-300 backdrop-blur-sm border dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact section with social media handles
const ContactSection = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/ANAMASGARD",
      color: "from-gray-700 to-gray-900",
      hoverColor: "hover:text-gray-300"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/GauravC18959107?t=9zYkQqvjjy-QiWOwyO2KMQ&s=09",
      color: "from-blue-400 to-blue-600",
      hoverColor: "hover:text-blue-300"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/mrnobody-flex-680baa215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:text-blue-300"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/learncraft_ai",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:text-pink-300"
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@learncraft.ai",
      link: "mailto:hello@learncraft.ai"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      link: null
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-gray-900 dark:to-blue-900 relative overflow-hidden">
      {/* Universe background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Floating stars for contact section - Fixed positioning to prevent hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => ({
          left: (i * 12 + 18) % 100,
          top: (i * 14 + 25) % 100,
          duration: 3 + ((i * 0.13) % 4),
          delay: (i * 0.17) % 5,
        })).map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your learning journey? We're here to help you succeed.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-blue-200 text-sm font-medium">{item.label}</div>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-white font-semibold hover:text-blue-300 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white font-semibold">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center mb-2 shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-white text-sm font-medium group-${social.hoverColor} transition-colors`}>
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Call to Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-blue-300/30 shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Learning?
                </h3>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Join thousands of learners who are already experiencing the future of education with AI-powered courses.
                </p>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Free 7-day trial</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Cancel anytime</span>
                    </div>
                  </motion.div>

                  <Link href="/sign-up">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Start Your Journey
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block ml-2"
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main page component
export default function Home() {
  return (
    <LandingThemeProvider>
      <div className="overflow-x-hidden">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <InteractiveDemoSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </LandingThemeProvider>
  );
}
