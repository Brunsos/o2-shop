'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';

interface FormData {
  comfortLevel: string;
  goal: string;
}

export default function Plans() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    comfortLevel: '',
    goal: ''
  });
  
  const formRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (currentStep === 1) {
        // Animate form on page load
        gsap.fromTo(
          formRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
          }
        );
      } else if (currentStep === 2) {
        // Create master timeline for precise control
        const tl = gsap.timeline();

        // First, immediately set all sections to hidden state
        sectionsRef.current.forEach((section) => {
          if (section) {
            gsap.set(section, {
              y: 60,
              opacity: 0,
            });
          }
        });

        // Add staggered animations to timeline
        sectionsRef.current.forEach((section, index) => {
          if (section) {
            const startTime = index * 0.15;
            
            // Animate y-transform with opacity snap at animation start
            tl.to(section, {
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              onStart: function() {
                // Snap to visible at the exact moment slide-up begins
                gsap.set(section, { opacity: 1 });
              }
            }, startTime);
          }
        });
      }
    });

    return () => ctx.revert();
  }, [currentStep]);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.comfortLevel && formData.goal) {
      // Scroll to top before showing plans
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(2);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
          style={{ backgroundImage: `url('${getAssetPath('/HeaderBackground.png')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09102447] to-[#091024] opacity-60 w-full h-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-30 h-[95px]">
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-0">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-90 transition-opacity duration-300 flex-shrink-0 ml-0 sm:ml-4 lg:ml-[154px]"
          >
            <Image
              src={getAssetPath('/O2Logo.png')}
              alt="O2 Swimming Coach Logo"
              width={80}
              height={80}
              className="object-cover sm:w-[100px] sm:h-[100px] lg:w-[122px] lg:h-[122px]"
              priority
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center h-full mr-4 xl:mr-8 2xl:mr-16">
            <div className="flex items-center space-x-16 xl:space-x-44 2xl:space-x-52">
              <Link href="/about" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
                About us
              </Link>
              <Link href="/plans" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap border-b-2 border-[#ff7043]">
                See Plans
              </Link>
              <Link href="/contact" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Tablet Navigation Links */}
          <div className="hidden md:flex lg:hidden items-center h-full mr-4">
            <div className="flex items-center space-x-8">
              <Link href="/about" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300">
                About us
              </Link>
              <Link href="/plans" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300 border-b-2 border-[#ff7043]">
                See Plans
              </Link>
              <Link href="/contact" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative z-10 min-h-screen pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {currentStep === 1 && (
            <div 
              ref={formRef}
              className="max-w-4xl mx-auto"
            >
              {/* Form Header */}
              <div className="text-center mb-16">
                <h1 
                  className="font-poppins font-normal text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8"
                  style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                >
                  Find Your Perfect Plan
                </h1>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Let&apos;s find the training program that&apos;s right for you. Answer a couple questions to get personalized recommendations.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
                {/* Question 1 */}
                <div className="mb-12">
                  <h3 
                    className="font-poppins font-medium text-white text-2xl lg:text-3xl mb-8 text-center"
                    style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                  >
                    How comfortable are you in the water?
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { value: 'beginner', label: 'Just getting started - I\'m new to swimming' },
                      { value: 'intermediate', label: 'Building endurance - I can swim but want to improve' },
                      { value: 'advanced', label: 'Refining technique - I\'m experienced and want to perfect my skills' }
                    ].map((option) => (
                      <label 
                        key={option.value}
                        className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.comfortLevel === option.value
                            ? 'bg-[#ff7043] border-[#ff7043] text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="comfortLevel"
                          value={option.value}
                          checked={formData.comfortLevel === option.value}
                          onChange={(e) => handleInputChange('comfortLevel', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-poppins font-medium text-lg">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="mb-12">
                  <h3 
                    className="font-poppins font-medium text-white text-2xl lg:text-3xl mb-8 text-center"
                    style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                  >
                    What&apos;s your biggest swimming goal right now?
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { value: 'basics', label: 'Learning the basics - I want to build confidence' },
                      { value: 'fitness', label: 'Improving fitness - I want to swim for health and exercise' },
                      { value: 'competition', label: 'Preparing for competition - I want to race and win' }
                    ].map((option) => (
                      <label 
                        key={option.value}
                        className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.goal === option.value
                            ? 'bg-[#ff7043] border-[#ff7043] text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={option.value}
                          checked={formData.goal === option.value}
                          onChange={(e) => handleInputChange('goal', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-poppins font-medium text-lg">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={!formData.comfortLevel || !formData.goal}
                    className="bg-[#ff7043] hover:bg-[#e5633a] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 rounded-full px-12 py-6 inline-flex items-center justify-center"
                  >
                    <span className="font-poppins font-medium text-white text-2xl lg:text-3xl tracking-[2px] leading-none">
                      See My Plans
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div ref={plansRef}>
              {/* Plans Header */}
              <div 
                ref={(el) => addToRefs(el, 0)}
                className="text-center mb-16 opacity-0"
              >
                <h1 
                  className="font-poppins font-normal text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8"
                  style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                >
                  Choose Your Plan
                </h1>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Based on your answers, here are our recommended training programs designed to help you achieve your swimming goals.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                {/* Starter Plan */}
                <div 
                  ref={(el) => addToRefs(el, 1)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col opacity-0"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#00bcd4] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 
                      className="font-poppins font-medium text-white text-3xl lg:text-4xl mb-4"
                      style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                    >
                      Starter
                    </h3>
                    <div className="mb-6">
                      <span 
                        className="font-poppins font-medium text-white text-5xl lg:text-6xl"
                        style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                      >
                        $99
                      </span>
                      <span 
                        className="font-poppins font-normal text-white/80 text-xl ml-2"
                        style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                      >
                        /month
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {[
                        '2 sessions per week',
                        'Basic stroke technique',
                        'Water safety fundamentals',
                        'Breathing exercises',
                        'Progress tracking',
                        'Email support'
                      ].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg className="w-5 h-5 text-[#00bcd4] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span 
                            className="font-poppins font-normal text-white text-lg"
                            style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full bg-[#00bcd4] hover:bg-[#00acc1] transition-colors duration-300 rounded-full py-4">
                    <span className="font-poppins font-medium text-white text-xl tracking-[1px]">
                      Choose Starter
                    </span>
                  </button>
                </div>

                {/* Pro Plan - Best Value */}
                <div 
                  ref={(el) => addToRefs(el, 2)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#ff7043] hover:bg-white/15 transition-all duration-300 flex flex-col relative opacity-0"
                >
                  {/* Best Value Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#ff7043] text-white px-6 py-2 rounded-full">
                      <span className="font-poppins font-medium text-sm tracking-[1px]">BEST VALUE</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#ff7043] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                    </div>
                    <h3 
                      className="font-poppins font-medium text-white text-3xl lg:text-4xl mb-4"
                      style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                    >
                      Pro
                    </h3>
                    <div className="mb-6">
                      <span 
                        className="font-poppins font-medium text-white text-5xl lg:text-6xl"
                        style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                      >
                        $179
                      </span>
                      <span 
                        className="font-poppins font-normal text-white/80 text-xl ml-2"
                        style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                      >
                        /month
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {[
                        '3 sessions per week',
                        'Advanced technique analysis',
                        'Video feedback sessions',
                        'Personalized training plans',
                        'Endurance building programs',
                        'Nutrition guidance',
                        'Priority support',
                        'Monthly progress reviews'
                      ].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg className="w-5 h-5 text-[#ff7043] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span 
                            className="font-poppins font-normal text-white text-lg"
                            style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full bg-[#ff7043] hover:bg-[#e5633a] transition-colors duration-300 rounded-full py-4">
                    <span className="font-poppins font-medium text-white text-xl tracking-[1px]">
                      Choose Pro
                    </span>
                  </button>
                </div>

                {/* Elite Plan */}
                <div 
                  ref={(el) => addToRefs(el, 3)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col opacity-0"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#9c27b0] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 
                      className="font-poppins font-medium text-white text-3xl lg:text-4xl mb-4"
                      style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                    >
                      Elite
                    </h3>
                    <div className="mb-6">
                      <span 
                        className="font-poppins font-medium text-white text-5xl lg:text-6xl"
                        style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                      >
                        $299
                      </span>
                      <span 
                        className="font-poppins font-normal text-white/80 text-xl ml-2"
                        style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                      >
                        /month
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {[
                        '5 sessions per week',
                        'Elite performance coaching',
                        'Race strategy development',
                        'Mental conditioning',
                        '1-on-1 dedicated sessions',
                        'Competition preparation',
                        'Biomechanical analysis',
                        'Recovery protocols',
                        '24/7 coach access'
                      ].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg className="w-5 h-5 text-[#9c27b0] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span 
                            className="font-poppins font-normal text-white text-lg"
                            style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full bg-[#9c27b0] hover:bg-[#8e24aa] transition-colors duration-300 rounded-full py-4">
                    <span className="font-poppins font-medium text-white text-xl tracking-[1px]">
                      Choose Elite
                    </span>
                  </button>
                </div>
              </div>

              {/* Back Button */}
              <div 
                ref={(el) => addToRefs(el, 4)}
                className="text-center opacity-0"
              >
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 transition-colors duration-300 rounded-full px-8 py-4 inline-flex items-center justify-center"
                >
                  <span className="font-poppins font-medium text-white text-lg tracking-[1px] leading-none">
                    ← Back to Questions
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}