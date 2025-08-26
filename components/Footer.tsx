import React from 'react';
import { QuarkLogo } from './icons/QuarkLogo';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { MailIcon } from './icons/MailIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { FacebookIcon } from './icons/FacebookIcon';

const Footer: React.FC = () => {
    
  const navLinks = [
    { id: 'about', label: 'Sobre' },
    { id: 'results', label: 'Resultados' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'services', label: 'Serviços' },
    // { id: 'testimonials', label: 'Depoimentos' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-dark-surface text-dark-text-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
             <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
                <QuarkLogo className="h-10 w-auto" />
                <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-quark-blue to-quark-pink bg-clip-text text-transparent">
                    Quark IT
                </span>
             </div>
            <p className="text-dark-text-secondary text-base">
              Transformando pequenos negócios em gigantes digitais.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navegação</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} className="text-base text-slate-300 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contato e Redes</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://wa.me/5511911221418" target="_blank" rel="noopener noreferrer" className="text-base group flex items-center">
                  <WhatsappIcon className="h-6 w-6 mr-3 text-slate-400 group-hover:text-green-400 transition-colors duration-200" />
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-200">(11) 91122-1418</span>
                </a>
              </li>
              <li>
                <a href="mailto:leobrykcy.product@gmail.com" className="text-base group flex items-center">
                  <MailIcon className="h-6 w-6 mr-3 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-200">leobrykcy.product@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/quark.it" target="_blank" rel="noopener noreferrer" className="text-base group flex items-center">
                   <InstagramIcon className="h-6 w-6 mr-3 text-slate-400 group-hover:text-pink-400 transition-colors duration-200" />
                   <span className="text-slate-300 group-hover:text-white transition-colors duration-200">@quark.it</span>
                </a>
              </li>
               <li>
                <a href="https://www.facebook.com/share/178Zv31Gkw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-base group flex items-center">
                   <FacebookIcon className="h-6 w-6 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                   <span className="text-slate-300 group-hover:text-white transition-colors duration-200">Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-dark-border pt-8">
          <p className="text-base text-dark-text-secondary text-center">&copy; {new Date().getFullYear()} Quark IT. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;