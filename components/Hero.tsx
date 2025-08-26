import React, { useState, useEffect, useRef } from 'react';
import { QuarkLogo } from './icons/QuarkLogo';
import InteractiveBackground from './InteractiveBackground';

interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const [logoHitbox, setLogoHitbox] = useState<Hitbox | null>(null);
  const [titleHitbox, setTitleHitbox] = useState<Hitbox | null>(null);
  const [subtitleHitbox, setSubtitleHitbox] = useState<Hitbox | null>(null);
  const [buttonHitbox, setButtonHitbox] = useState<Hitbox | null>(null);

  useEffect(() => {
    const calculateHitboxes = () => {
      if (heroRef.current && logoRef.current && titleRef.current && subtitleRef.current && buttonRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();

        const logoRect = logoRef.current.getBoundingClientRect();
        setLogoHitbox({
          x: logoRect.left - heroRect.left,
          y: logoRect.top - heroRect.top,
          width: logoRect.width,
          height: logoRect.height,
        });

        const titleRect = titleRef.current.getBoundingClientRect();
        setTitleHitbox({
          x: titleRect.left - heroRect.left,
          y: titleRect.top - heroRect.top,
          width: titleRect.width,
          height: titleRect.height,
        });

        const subtitleRect = subtitleRef.current.getBoundingClientRect();
        setSubtitleHitbox({
          x: subtitleRect.left - heroRect.left,
          y: subtitleRect.top - heroRect.top,
          width: subtitleRect.width,
          height: subtitleRect.height,
        });

        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonHitbox({
            x: buttonRect.left - heroRect.left,
            y: buttonRect.top - heroRect.top,
            width: buttonRect.width,
            height: buttonRect.height,
        });
      }
    };

    calculateHitboxes();
    
    const resizeObserver = new ResizeObserver(calculateHitboxes);
    if (heroRef.current) resizeObserver.observe(heroRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative bg-light-surface dark:bg-dark-bg pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
      <InteractiveBackground 
        logoHitbox={logoHitbox}
        titleHitbox={titleHitbox} 
        subtitleHitbox={subtitleHitbox}
        buttonHitbox={buttonHitbox}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={logoRef} className="inline-block justify-center mb-8">
          <QuarkLogo className="h-24 w-auto" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-light-text-primary dark:text-dark-text-primary">
          <span ref={titleRef} className="inline-block">Quark IT</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto font-semibold bg-gradient-to-r from-quark-blue to-quark-pink bg-clip-text text-transparent">
          <span ref={subtitleRef} className="inline-block">Transformando pequenos negócios em gigantes digitais</span>
        </p>
        <div className="mt-10 flex justify-center">
          <a ref={buttonRef} href="#contact" className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-quark-blue hover:opacity-90 transition-opacity shadow-lg">
            Comece a Crescer
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
