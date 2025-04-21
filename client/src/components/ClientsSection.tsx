import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Client, Testimonial } from '@shared/schema';
import { QuoteIcon } from '@/assets/icons';

const ClientsSection = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  const { 
    data: clients = [], 
    isLoading: isLoadingClients,
    error: clientsError 
  } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const { 
    data: testimonials = [], 
    isLoading: isLoadingTestimonials,
    error: testimonialsError 
  } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const isLoading = isLoadingClients || isLoadingTestimonials;
  const error = clientsError || testimonialsError;

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

  // Get the first testimonial for display
  const testimonial = testimonials[0];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-3">
            {t('clients.title')}
          </h2>
          <div className="h-1 w-20 bg-[#C9AB81] mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </div>
        
        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div 
              key={client.id}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300"
            >
              <img 
                src={client.logoUrl} 
                alt={client.name} 
                className="max-h-12"
              />
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        {testimonial && (
          <div className="mt-16 bg-[#36261E] rounded-lg p-8 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <QuoteIcon className="text-[#C9AB81] text-4xl mb-6 mx-auto opacity-50" size={40} />
              <blockquote className="text-xl text-white italic mb-6">
                {language === 'ar' && testimonial.contentAr ? testimonial.contentAr : testimonial.content}
              </blockquote>
              <div className="flex items-center justify-center">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={language === 'ar' && testimonial.personNameAr ? testimonial.personNameAr : testimonial.personName} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <p className="text-white font-medium">
                    {language === 'ar' && testimonial.personNameAr ? testimonial.personNameAr : testimonial.personName}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {language === 'ar' && testimonial.positionAr ? testimonial.positionAr : testimonial.position}, 
                    {' '}
                    {language === 'ar' && testimonial.companyAr ? testimonial.companyAr : testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
