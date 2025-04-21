import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import LanguageToggle from './LanguageToggle';
import SearchModal from './SearchModal';
import { MenuIcon, SearchIcon, ChevronDownIcon } from '@/assets/icons';

const Header = () => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="relative z-10">
      <nav className="bg-[#36261E] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-[#C9AB81] font-poppins text-2xl font-bold">
                  CREATIVE<span className="text-white">AGENCY</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div 
                className={`hidden md:ml-10 md:flex md:items-center space-x-4 ${
                  language === 'ar' ? 'space-x-0 space-x-reverse rtl' : ''
                }`}
              >
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                  }`}
                >
                  {t('nav.home')}
                </Link>
                
                <Link 
                  href="/about" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/about') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                  }`}
                >
                  {t('nav.about')}
                </Link>
                
                {/* Services Dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleServices}
                    className={`px-3 py-2 rounded-md text-base font-medium focus:outline-none flex items-center ${
                      location.startsWith('/services') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                    }`}
                  >
                    <span>{t('nav.services')}</span>
                    <ChevronDownIcon size={16} className="ml-1" />
                  </button>
                  
                  {isServicesOpen && (
                    <div 
                      className="absolute mt-2 w-48 rounded-md shadow-lg bg-[#5D4037] py-1 z-20"
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link 
                        href="/services/branding" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.branding')}
                      </Link>
                      <Link 
                        href="/services/web-design" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.webDesign')}
                      </Link>
                      <Link 
                        href="/services/development" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.development')}
                      </Link>
                      <Link 
                        href="/services/digital-marketing" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.digitalMarketing')}
                      </Link>
                      <Link 
                        href="/services/photography" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.photography')}
                      </Link>
                      <Link 
                        href="/services/video-production" 
                        className="block px-4 py-2 text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                      >
                        {t('services.videoProduction')}
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link 
                  href="/work" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/work') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                  }`}
                >
                  {t('nav.work')}
                </Link>
                
                <Link 
                  href="/team" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/team') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                  }`}
                >
                  {t('nav.team')}
                </Link>
                
                <Link 
                  href="/contact" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/contact') ? 'text-[#C9AB81]' : 'text-white hover:text-[#C9AB81]'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center">
              {/* Search Icon */}
              <button 
                onClick={toggleSearch}
                className="p-2 text-white hover:text-[#C9AB81] focus:outline-none mr-2"
              >
                <SearchIcon size={20} />
              </button>
              
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Mobile menu button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-white hover:text-[#C9AB81] focus:outline-none"
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#5D4037]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') 
                    ? 'bg-[#C9AB81] text-[#36261E]' 
                    : 'text-white hover:bg-[#C9AB81] hover:text-[#36261E]'
                }`}
              >
                {t('nav.home')}
              </Link>
              
              <Link 
                href="/about" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/about') 
                    ? 'bg-[#C9AB81] text-[#36261E]' 
                    : 'text-white hover:bg-[#C9AB81] hover:text-[#36261E]'
                }`}
              >
                {t('nav.about')}
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button 
                  onClick={toggleServices}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E] focus:outline-none flex items-center justify-between"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDownIcon 
                    size={16} 
                    className={`transition-transform ${isServicesOpen ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                {isServicesOpen && (
                  <div className="pl-4 space-y-1">
                    <Link 
                      href="/services/branding" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.branding')}
                    </Link>
                    <Link 
                      href="/services/web-design" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.webDesign')}
                    </Link>
                    <Link 
                      href="/services/development" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.development')}
                    </Link>
                    <Link 
                      href="/services/digital-marketing" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.digitalMarketing')}
                    </Link>
                    <Link 
                      href="/services/photography" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.photography')}
                    </Link>
                    <Link 
                      href="/services/video-production" 
                      className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#C9AB81] hover:text-[#36261E]"
                    >
                      {t('services.videoProduction')}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/work" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/work') 
                    ? 'bg-[#C9AB81] text-[#36261E]' 
                    : 'text-white hover:bg-[#C9AB81] hover:text-[#36261E]'
                }`}
              >
                {t('nav.work')}
              </Link>
              
              <Link 
                href="/team" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/team') 
                    ? 'bg-[#C9AB81] text-[#36261E]' 
                    : 'text-white hover:bg-[#C9AB81] hover:text-[#36261E]'
                }`}
              >
                {t('nav.team')}
              </Link>
              
              <Link 
                href="/contact" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/contact') 
                    ? 'bg-[#C9AB81] text-[#36261E]' 
                    : 'text-white hover:bg-[#C9AB81] hover:text-[#36261E]'
                }`}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={toggleSearch} />
    </header>
  );
};

export default Header;
