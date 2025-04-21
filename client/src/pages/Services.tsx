import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Service } from '@shared/schema';
import { getServiceIcon, ArrowRightIcon } from '@/assets/icons';

const Services = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('services.title')} - ${t('siteName')}`;
  }, [t]);
  
  const { 
    data: services = [], 
    isLoading,
    error 
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{t('error')}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('services.title')} - {t('siteName')}</title>
        <meta name="description" content="Comprehensive services to help your business grow and succeed in the digital world." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-6">
            {t('services.title')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                    {getServiceIcon(service.icon, 28, "text-[#36261E] text-2xl")}
                  </div>
                  <h3 className="text-2xl font-poppins font-semibold mb-4 text-white group-hover:text-[#C9AB81] transition duration-300">
                    {language === 'ar' && service.titleAr ? service.titleAr : service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {language === 'ar' && service.descriptionAr ? service.descriptionAr : service.description}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-[#C9AB81] hover:text-white transition duration-300"
                  >
                    <span>{t('learnMore')}</span>
                    <ArrowRightIcon size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-6">
            Ready to transform your digital presence?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Let's work together to bring your vision to life with our expert services and creative solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-[#C9AB81] text-[#36261E] font-medium rounded hover:bg-white transition duration-300"
            >
              {t('cta.getInTouch')}
            </Link>
            <Link 
              href="/work" 
              className="px-8 py-3 border border-white text-white font-medium rounded hover:bg-white hover:text-[#36261E] transition duration-300"
            >
              {t('cta.viewOurWork')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
