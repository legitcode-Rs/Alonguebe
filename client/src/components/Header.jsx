/**
 * Cabeçalho responsivo. O estado controla o menu mobile e os links com # fazem
 * navegação interna até os IDs das seções da página.
 */
import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';

const Header = ({ whatsappNumber }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // `isOpen` controla menu mobile; `isScrolled` aplica visual compacto ao rolar.
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Registra um listener no navegador e o remove ao desmontar o componente.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Agendamento', href: '#agendamento' },
    { label: 'Contato', href: '#contato' },
  ];

  // Monta o link de contato direto com uma mensagem inicial pré-preenchida.
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20e%20agendar%20um%20horário%20na%20Alonguebe.`;

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#inicio" className="logo" onClick={closeMenu}>
          {cms.brand_name || <>Alongue<span>be</span></>}
        </a>

        {/* Hamburger Icon */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay for mobile menu */}
        <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>

        {/* Navigation Menu */}
        <nav>
          <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp header-btn"
                onClick={closeMenu}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
                </svg>
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
