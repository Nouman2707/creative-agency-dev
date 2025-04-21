import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import { Service } from '@shared/schema';
import { getServiceIcon, ArrowRightIcon } from '@/assets/icons';

const ServiceDetail = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const { slug } = useParams();
  
  const { 
    data: service, 
    isLoading,
    error 
  } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
  });

  const { 
    data: relatedServices = [], 
    isLoading: isLoadingRelated
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    select: (services) => services.filter(s => s.slug !== slug).slice(0, 3)
  });

  // Update page title on component mount
  useEffect(() => {
    if (service) {
      document.title = `${language === 'ar' && service.titleAr ? service.titleAr : service.title} - ${t('siteName')}`;
    }
  }, [service, t, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">{t('loading')}</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{t('error')}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' && service.titleAr ? service.titleAr : service.title} - {t('siteName')}</title>
        <meta 
          name="description" 
          content={language === 'ar' && service.descriptionAr ? service.descriptionAr : service.description} 
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 md:pr-10">
              <h1 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-6">
                {language === 'ar' && service.titleAr ? service.titleAr : service.title}
              </h1>
              <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
              <p className="text-xl text-gray-300 mb-8">
                {language === 'ar' && service.descriptionAr ? service.descriptionAr : service.description}
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-[#C9AB81] text-[#36261E] font-medium rounded hover:bg-white transition duration-300"
              >
                {t('cta.getInTouch')}
              </Link>
            </div>
            <div className="md:w-2/5 mt-10 md:mt-0 flex justify-center">
              <div className="w-48 h-48 bg-[#5D4037] rounded-full flex items-center justify-center">
                {getServiceIcon(service.icon, 96, "text-[#C9AB81]")}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Content */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto">
            <div className={language === 'ar' ? 'rtl' : ''}>
              <p className="text-lg text-gray-300 whitespace-pre-line">
                {language === 'ar' && service.contentAr ? service.contentAr : service.content}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white font-poppins mb-12 text-center">
            {t('services.title')}
          </h2>
          
          {isLoadingRelated ? (
            <div className="flex justify-center">
              <div className="text-white">{t('loading')}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <div 
                  key={relatedService.id}
                  className="bg-[#36261E] rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
                >
                  <div className="p-6">
                    <div className="w-14 h-14 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                      {getServiceIcon(relatedService.icon, 24, "text-[#36261E] text-2xl")}
                    </div>
                    <h3 className="text-xl font-poppins font-semibold mb-3 text-white group-hover:text-[#C9AB81] transition duration-300">
                      {language === 'ar' && relatedService.titleAr ? relatedService.titleAr : relatedService.title}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {language === 'ar' && relatedService.descriptionAr ? relatedService.descriptionAr : relatedService.description}
                    </p>
                    <Link 
                      href={`/services/${relatedService.slug}`}
                      className="inline-flex items-center text-[#C9AB81] hover:text-white transition duration-300"
                    >
                      <span>{t('learnMore')}</span>
                      <ArrowRightIcon size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-flex items-center px-6 py-3 border border-[#C9AB81] text-[#C9AB81] font-medium rounded-md hover:bg-[#C9AB81] hover:text-[#36261E] transition duration-300"
            >
              <span>{t('services.allServices')}</span>
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
