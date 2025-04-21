import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Service } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import LanguageToggle from './LanguageToggle';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from '@/assets/icons';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  
  const { 
    data: services = [], 
    isLoading: isLoadingServices,
    error: servicesError 
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const subscribe = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/subscribe', { email });
      return response.json();
    },
    onSuccess: () => {
      setEmail('');
      toast({
        title: t('footer.subscribedMessage'),
        duration: 3000,
      });
    },
    onError: (error: any) => {
      let errorMessage = t('error');
      
      if (error.message && error.message.includes('already subscribed')) {
        errorMessage = t('footer.alreadySubscribedError');
      } else if (error.message && error.message.includes('invalid')) {
        errorMessage = t('footer.invalidEmailError');
      }
      
      toast({
        title: errorMessage,
        variant: 'destructive',
        duration: 3000,
      });
    }
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('footer.invalidEmailError'),
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    
    subscribe.mutate(email);
  };

  return (
    <footer className="bg-[#36261E] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${language === 'ar' ? 'rtl' : ''}`}>
          {/* Company Info */}
          <div>
            <Link href="/" className="text-[#C9AB81] font-poppins text-2xl font-bold mb-6 block">
              CREATIVE<span className="text-white">AGENCY</span>
            </Link>
            <p className="text-gray-300 mb-6">
              We are a full-service creative agency specializing in branding, web design, development, and digital marketing.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition duration-300">
                <TwitterIcon size={20} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition duration-300">
                <LinkedInIcon size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-poppins font-semibold text-xl mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.team')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#C9AB81] transition duration-300">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-poppins font-semibold text-xl mb-6">
              {t('footer.servicesLinks')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-[#C9AB81] transition duration-300"
                  >
                    {language === 'ar' && service.titleAr ? service.titleAr : service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Subscribe */}
          <div>
            <h3 className="text-white font-poppins font-semibold text-xl mb-6">
              {t('footer.subscribeTitle')}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('footer.subscribeText')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#C9AB81] text-white"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="w-full px-4 py-2 bg-[#C9AB81] text-[#36261E] font-medium rounded hover:bg-white transition duration-300 disabled:opacity-70"
                >
                  {subscribe.isPending ? t('loading') : t('footer.subscribeButton')}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center ${language === 'ar' ? 'rtl' : ''}`}>
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-[#C9AB81] text-sm transition duration-300">
                {t('footer.privacyPolicy')}
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-[#C9AB81] text-sm transition duration-300">
                {t('footer.termsOfService')}
              </a>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
