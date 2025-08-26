import React, { useState, useEffect } from 'react';
import { QuarkLogo } from './icons/QuarkLogo';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled effect
      setScrolled(window.scrollY > 10);

      // Active section highlighting
      const sections = ['home', 'about', 'results', 'portfolio', 'services', 'contact'];
      let currentSection = '';

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { id: 'about', label: 'Sobre' },
    { id: 'results', label: 'Resultados' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'services', label: 'Serviços' },
    // { id: 'testimonials', label: 'Depoimentos' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border shadow-md' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <QuarkLogo className="h-8 w-auto" />
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-quark-blue to-quark-pink bg-clip-text text-transparent">
              Quark IT
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
                    activeSection === link.id
                      ? 'text-quark-blue dark:text-quark-pink font-bold'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-quark-blue dark:hover:text-quark-pink'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;