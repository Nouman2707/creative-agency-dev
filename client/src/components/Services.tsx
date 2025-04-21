import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Service } from '@shared/schema';
import { getServiceIcon, ArrowRightIcon } from '@/assets/icons';

const Services = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  const { 
    data: services = [], 
    isLoading,
    error 
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="text-white text-xl">{t('loading')}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="text-red-400 text-xl">{t('error')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-3">
            {t('services.title')}
          </h2>
          <div className="h-1 w-20 bg-[#C9AB81] mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-[#36261E] rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
            >
              <div className="p-6">
                <div className="w-14 h-14 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                  {getServiceIcon(service.icon, 24, "text-[#36261E] text-2xl")}
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-3 text-white group-hover:text-[#C9AB81] transition duration-300">
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
  );
};

export default Services;
