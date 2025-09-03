'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const headerTextRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header text
      gsap.fromTo(
        headerTextRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        }
      );

      // Animate paragraph text with delay
      gsap.fromTo(
        paragraphRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      // Animate subtitle text with delay
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0.7,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#ffffff] relative w-full min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div className="relative w-full h-screen">
        {/* Background Header */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
          style={{ backgroundImage: `url('/HeaderBackground.png')` }}
        />
        
        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09102447] to-[#091024] opacity-60 w-full h-full" />
        
        {/* Header Text Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerTextRef}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 
              className="font-poppins font-normal leading-normal text-[120px] sm:text-[140px] md:text-[160px] lg:text-[180px] xl:text-[180px] 2xl:text-[180px]"
              style={{ textShadow: 'rgba(0,0,0,0.3) 0px 4px 20px' }}
            >
              Dive In
            </h1>
          </div>
          
          <div 
            ref={paragraphRef}
            className="mb-4 sm:mb-6 lg:mb-8"
          >
            <p 
              className="font-poppins font-medium opacity-80 leading-normal text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[24px] max-w-[828px]"
              style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
            >
              Transform your technique and discover what you&apos;re truly capable of.
            </p>
          </div>

          <div 
            ref={subtitleRef}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <p 
              className="font-poppins font-medium opacity-80 leading-normal text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[24px] max-w-[746px]"
              style={{ textShadow: 'rgba(0,0,0,0.8) 0px 4px 20px' }}
            >
              Get personalized training plans from our experienced coaches
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-32 sm:bottom-24 lg:bottom-32 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Begin Training Button */}
          <Link href="/plans" className="bg-[#ff7043] hover:bg-[#e5633a] transition-colors duration-300 rounded-full px-8 py-3 sm:px-10 sm:py-4 lg:px-12 lg:py-[17px] w-full sm:w-auto min-w-[200px] sm:min-w-[280px] lg:min-w-[322px] h-[50px] sm:h-[60px] lg:h-[66px] flex items-center justify-center">
            <span className="font-poppins font-medium text-white text-xl sm:text-2xl lg:text-[26px] xl:text-[26px] tracking-[2px] leading-none">
              Begin Training
            </span>
          </Link>
          
          {/* About Us Button */}
          <Link href="/about" className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] border-3 border-[#00bcd4] transition-colors duration-300 rounded-full px-8 py-3 sm:px-10 sm:py-4 lg:px-12 lg:py-[17px] w-full sm:w-auto min-w-[200px] sm:min-w-[240px] lg:min-w-[271px] h-[50px] sm:h-[60px] lg:h-[66px] flex items-center justify-center">
            <span className="font-poppins font-medium text-white text-xl sm:text-2xl lg:text-[26px] xl:text-[26px] tracking-[2px] leading-none">
              About us
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-30 h-[95px]">
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-0">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-90 transition-opacity duration-300 flex-shrink-0 ml-0 sm:ml-4 lg:ml-[154px]"
          >
            <Image
              src="/O2Logo.png"
              alt="O2 Swimming Coach Logo"
              width={80}
              height={80}
              className="object-cover sm:w-[100px] sm:h-[100px] lg:w-[122px] lg:h-[122px]"
              priority
            />
          </Link>
          
          {/* Desktop Navigation Links with Figma-accurate spacing */}
          <div className="hidden lg:flex items-center h-full mr-4 xl:mr-8 2xl:mr-16">
            <div className="flex items-center space-x-16 xl:space-x-44 2xl:space-x-52">
              <Link href="/about" className="font-poppins font-normal text-white text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
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
          
          {/* Tablet Navigation Links - reduced spacing */}
          <div className="hidden md:flex lg:hidden items-center h-full mr-4">
            <div className="flex items-center space-x-8">
              <Link href="/about" className="font-poppins font-normal text-white text-[18px] leading-none hover:opacity-80 transition-opacity duration-300">
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
    </div>
  );
}