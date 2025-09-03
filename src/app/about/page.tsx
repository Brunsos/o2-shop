'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';

export default function AboutUs() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on page load
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(
            section,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.3,
              ease: 'power3.out',
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
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
              <Link href="/about" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap border-b-2 border-[#ff7043]">
                About us
              </Link>
              <Link href="/plans" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
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
              <Link href="/about" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300 border-b-2 border-[#ff7043]">
                About us
              </Link>
              <Link href="/plans" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300">
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
          
          {/* Meet the Coach Section */}
          <section 
            ref={(el) => addToRefs(el, 0)}
            className="mb-32 sm:mb-40 lg:mb-48"
          >
            <div className="text-center mb-16">
              <h2 
                className="font-poppins font-normal text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8"
                style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
              >
                Meet the Coach
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  With over 15 years of competitive swimming experience and 8 years of professional coaching, I&apos;m dedicated to helping swimmers of all levels reach their full potential in the water.
                </p>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  My approach combines technical precision with mental conditioning, ensuring every athlete develops both the physical skills and confidence needed to excel in competitive swimming.
                </p>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  From beginners learning proper stroke mechanics to elite athletes preparing for championships, I create personalized training programs that deliver measurable results.
                </p>
              </div>
              
              {/* Coach Image */}
              <div className="lg:order-last">
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-center h-full text-white/60">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <p className="font-poppins">Coach Photo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About O2 SwimFit Section */}
          <section 
            ref={(el) => addToRefs(el, 1)}
            className="mb-32 sm:mb-40 lg:mb-48"
          >
            <div className="text-center mb-16">
              <h2 
                className="font-poppins font-normal text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8"
                style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
              >
                About O2 SwimFit
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* O2 SwimFit Image */}
              <div className="lg:order-first">
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-center h-full text-white/60">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <p className="font-poppins">O2 SwimFit Facility</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text Content */}
              <div>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  O2 SwimFit was founded with a simple mission: to create a supportive environment where swimmers can achieve their personal best while developing a lifelong love for the sport.
                </p>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Our state-of-the-art training facility features Olympic-standard pools, advanced video analysis equipment, and specialized training tools that help swimmers perfect their technique and build endurance.
                </p>
                <p 
                  className="font-poppins font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  We believe that every swimmer deserves personalized attention and a training program tailored to their unique goals, whether that&apos;s mastering the basics or competing at the highest levels.
                </p>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section 
            ref={(el) => addToRefs(el, 2)}
            className="mb-16"
          >
            <div className="text-center mb-16">
              <h2 
                className="font-poppins font-normal text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8"
                style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
              >
                What We Offer
              </h2>
            </div>
            
            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#ff7043] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 
                    className="font-poppins font-medium text-white text-2xl lg:text-3xl mb-4"
                    style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                  >
                    Technique Analysis
                  </h3>
                </div>
                <p 
                  className="font-poppins font-normal text-white text-lg leading-relaxed text-center"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Advanced video analysis and real-time feedback to perfect your stroke mechanics and improve efficiency in the water.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#00bcd4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <h3 
                    className="font-poppins font-medium text-white text-2xl lg:text-3xl mb-4"
                    style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                  >
                    Training Programs
                  </h3>
                </div>
                <p 
                  className="font-poppins font-normal text-white text-lg leading-relaxed text-center"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Personalized training plans designed to meet your specific goals, from fitness swimming to competitive racing.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#ff7043] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </div>
                  <h3 
                    className="font-poppins font-medium text-white text-2xl lg:text-3xl mb-4"
                    style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
                  >
                    Performance Coaching
                  </h3>
                </div>
                <p 
                  className="font-poppins font-normal text-white text-lg leading-relaxed text-center"
                  style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
                >
                  Mental conditioning and race strategy development to help you perform at your peak when it matters most.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link 
                href="/plans"
                className="bg-[#ff7043] hover:bg-[#e5633a] transition-colors duration-300 rounded-full px-12 py-6 inline-flex items-center justify-center"
              >
                <span className="font-poppins font-medium text-white text-2xl lg:text-3xl tracking-[2px] leading-none">
                  See Plans
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}