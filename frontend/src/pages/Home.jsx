import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaUsers,
  FaChartBar,
  FaGlobe,
  FaRobot,
  FaCommentDots,
  FaBrain,
  FaThumbsUp,
  FaArrowRight,
  FaLightbulb,
  FaShieldAlt,
  FaCogs
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import testimonial1 from "../assets/slide1.jpg";
import testimonial2 from "../assets/slide2.jpg";
import testimonial3 from "../assets/slide3.jpg";

function Home() {
  const particleRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const moveParticles = () => {
      if (particleRef.current) {
        const particles = particleRef.current.children;
        for (let i = 0; i < particles.length; i++) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          particles[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    };

    const interval = setInterval(moveParticles, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    const featuresSection = document.getElementById("how-it-works");
    featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans overflow-x-hidden">
      {/* 🚀 Navbar */}
      <nav className="flex justify-between items-center p-4 md:p-6 bg-gray-900/80 backdrop-blur-md shadow-md fixed w-full top-0 z-50 h-16 md:h-20">
        {/* Logo Section */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={logo}
            alt="Voice4Change Logo"
            className="h-10 md:h-12 w-auto mr-4"
          />
          {/* <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CivicAI
          </span> */}
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="#features"
              onClick={scrollToFeatures}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              onClick={scrollToHowItWorks}
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="flex gap-4 ml-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login">
                <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Login
                </button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register">
                <button className="px-5 py-2 border border-white/30 text-white rounded-lg shadow-md hover:bg-white/10 transition-all">
                  Register
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-40 p-6 md:hidden"
        >
          <div className="flex flex-col space-y-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#features"
              onClick={() => {
                scrollToFeatures();
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-5 py-2 border border-white/30 text-white rounded-lg shadow-md hover:bg-white/10 transition-all">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* 🚀 Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left pt-32 pb-20 md:py-40 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80 shadow-lg overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden" ref={particleRef}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: [null, Math.random() * window.innerWidth],
                y: [null, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(56, 182, 255, 0.15) 0%, transparent 40%)",
              "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)",
              "radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Left Side - Text Content */}
        <motion.div
          className="max-w-2xl z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center md:justify-start gap-2 mb-4"
          >
            <div className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium flex items-center">
              <FaLightbulb className="mr-2" /> AI for Civic Engagement
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Policy with AI-Driven{" "}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl">
            Our AI platform analyzes citizen feedback at scale, providing
            policymakers with actionable insights to create more responsive and
            effective governance.
          </p>
          <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center md:justify-start">
            <Link to="/register">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                Get Started <FaArrowRight className="ml-2" />
            </motion.button>  
            </Link>
           
            {/* <motion.button
              className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg shadow-lg hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Demo
            </motion.button> */}
          </div>

          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${
                      Math.random() > 0.5 ? "men" : "women"
                    }/${i}.jpg`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-300">
                Trusted by Policymakers
              </span>
            </div>
            <div className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              <FaShieldAlt className="text-green-400 mr-2" />
              <span className="text-sm text-gray-300">
                Secure & Private Data
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Hero Illustration */}
        <motion.div
          className="w-full md:w-1/2 mt-16 md:mt-0 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -top-10 -left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 10, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 4,
              }}
            />
            <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="AI analyzing civic feedback"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center">
                  <FaRobot className="text-blue-400 text-2xl mr-3" />
                  <div>
                    <h3 className="text-white font-semibold">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Processing citizen responses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 🚀 Trusted By Section */}
      <div className="py-8 bg-gray-900">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-400 mb-6">
            Trusted by innovative governments and organizations worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            {[
              "GovTech",
              "Smart Cities Council",
              "CivicTech",
            ].map((org, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-xl font-medium text-gray-300"
              >
                {org}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 Features Section */}
      <section
        id="features"
        className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
              <FaChartBar className="mr-2" /> Key Features
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Civic Engagement
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform transforms raw feedback into structured insights that
              drive better policy decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUsers className="text-blue-400 text-4xl" />,
                title: "Public Engagement",
                description:
                  "Making citizen participation effortless and impactful through intuitive interfaces and multi-channel feedback collection.",
                gradient: "from-blue-600 to-blue-800",
              },
              {
                icon: <FaChartBar className="text-purple-400 text-4xl" />,
                title: "Real-time Analytics",
                description:
                  "Providing policymakers with structured analytics and visualizations updated in real-time as new feedback comes in.",
                gradient: "from-purple-600 to-purple-800",
              },
              {
                icon: <FaGlobe className="text-green-400 text-4xl" />,
                title: "Transparency",
                description:
                  "Building trust between governments and citizens with open data and clear communication of how feedback is used.",
                gradient: "from-green-600 to-green-800",
              },
              {
                icon: <FaRobot className="text-yellow-400 text-4xl" />,
                title: "AI Categorization",
                description:
                  "Automatically organizing thousands of responses into thematic categories for efficient analysis.",
                gradient: "from-yellow-600 to-yellow-800",
              },
              {
                icon: <FaCommentDots className="text-pink-400 text-4xl" />,
                title: "Sentiment Analysis",
                description:
                  "Understanding not just what citizens say but how they feel about specific policies and proposals.",
                gradient: "from-pink-600 to-pink-800",
              },
              {
                icon: <FaShieldAlt className="text-indigo-400 text-4xl" />,
                title: "Data Privacy",
                description:
                  "Enterprise-grade security protecting both citizen data and government information with end-to-end encryption.",
                gradient: "from-indigo-600 to-indigo-800",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className="mt-4">
                    <span className="inline-block h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 How It Works Section */}
      <section
        id="how-it-works"
        className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-blue-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
              <FaCogs className="mr-2" /> Process
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              How Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Platform
              </span>{" "}
              Works
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              From citizen feedback to actionable insights in three simple steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 -translate-x-1/2"></div>

            {/* Steps */}
            <div className="space-y-16 md:space-y-32">
              {[
                {
                  step: "1",
                  title: "Collect Feedback",
                  description:
                    "Gather citizen input from multiple channels including web forms, social media, SMS, and public meetings.",
                  icon: <FaCommentDots className="text-blue-400 text-4xl" />,
                  direction: "left",
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description:
                    "Our algorithms process and categorize feedback, identify key themes, and analyze sentiment at scale.",
                  icon: <FaBrain className="text-purple-400 text-4xl" />,
                  direction: "right",
                },
                {
                  step: "3",
                  title: "Actionable Insights",
                  description:
                    "Policymakers receive clear, structured reports highlighting public priorities and concerns.",
                  icon: <FaThumbsUp className="text-green-400 text-4xl" />,
                  direction: "left",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    item.direction === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl mb-6 md:mb-0 z-10">
                    {item.step}
                  </div>

                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${
                      item.direction === "left" ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 mb-6">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Testimonials Section */}
      {/* <section
        id="testimonials"
        className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
              <FaUsers className="mr-2" /> Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Users
              </span>{" "}
              Say
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from policymakers and civic leaders who transformed their
              community engagement.
            </p>
          </motion.div>

          <div className="relative h-96 md:h-80">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                role: "City Council Member, Boston",
                quote:
                  "This platform revolutionized how we engage with constituents. The AI analysis saves us hundreds of hours while providing deeper insights than we ever had before.",
                image: testimonial1,
              },
              {
                id: 2,
                name: "Michael Chen",
                role: "Director of Civic Innovation, Austin",
                quote:
                  "The sentiment analysis feature helped us identify emerging concerns before they became crises. It's like having a pulse on the entire city.",
                image: testimonial2,
              },
              {
                id: 3,
                name: "Elena Rodriguez",
                role: "Mayor's Office, Miami",
                quote:
                  "For the first time, we can truly say we're making data-driven decisions based on what our residents actually want and need.",
                image: testimonial3,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute inset-0 bg-gray-900/80 border border-gray-800 rounded-xl p-8 shadow-lg transition-all duration-500 ${
                  index === activeTestimonial ? "opacity-100 z-10" : "opacity-0"
                }`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === activeTestimonial ? 1 : 0,
                }}
              >
                <div className="flex flex-col md:flex-row h-full items-center">
                  <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/30"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-3">
                        <FaCommentDots className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 md:pl-12">
                    <div className="text-2xl md:text-3xl font-light text-white mb-6">
                      "{testimonial.quote}"
                    </div>
                    <div className="text-lg font-semibold text-blue-400">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeTestimonial
                    ? "bg-blue-500 w-6"
                    : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* 🚀 CTA Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-blue-900/80 to-purple-900/80">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform{" "}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Civic Engagement
              </span>{" "}
              in Your Community?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join hundreds of government agencies using AI to make better
              decisions based on what their citizens actually want.
            </p>
            {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Demo <FaArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg shadow-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.button>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* 🚀 Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-24 flex items-center min-h-[400px]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
            <div className="md:col-span-4 text-center">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={logo}
                  alt="Voice4Change Logo"
                  className="h-10 w-auto mr-3"
                />
                {/* <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Voice4Change
                </span> */}
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                AI-powered civic feedback platform for modern governments.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div> 

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Voice4Change. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;