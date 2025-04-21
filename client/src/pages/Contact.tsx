import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('nav.contact')} - ${t('siteName')}`;
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contact.messageSent'),
        description: t('contact.messageSentDesc'),
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>{t('nav.contact')} - {t('siteName')}</title>
        <meta name="description" content="Contact our creative agency for inquiries, quotes, or to discuss your project. We'd love to hear from you." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('contact.title')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Contact Info and Form Section */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-white font-poppins mb-8">
                {t('contact.getInTouch')}
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-[#C9AB81] font-semibold text-lg mb-2">{t('contact.visitUs')}</h3>
                  <p className="text-gray-300">
                    123 Creative Avenue<br />
                    Design District<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#C9AB81] font-semibold text-lg mb-2">{t('contact.callUs')}</h3>
                  <p className="text-gray-300">
                    +1 (555) 123-4567<br />
                    Mon-Fri, 9am-6pm
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#C9AB81] font-semibold text-lg mb-2">{t('contact.emailUs')}</h3>
                  <p className="text-gray-300">
                    info@creativeagency.com<br />
                    support@creativeagency.com
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#C9AB81] font-semibold text-lg mb-2">{t('contact.followUs')}</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9AB81] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-white font-poppins mb-8">
                {t('contact.sendUsMessage')}
              </h2>
              
              <form onSubmit={handleSubmit} className={`space-y-6 ${language === 'ar' ? 'rtl' : ''}`}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('contact.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-[#1E1510] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('contact.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#1E1510] border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('contact.subject')}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-[#1E1510] border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#1E1510] border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#C9AB81] hover:bg-[#B89971] text-[#36261E] font-medium py-2 px-6 rounded-md"
                  >
                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
            {/* Map placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">
                {t('contact.mapPlaceholder')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;