import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';

const About = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('nav.about')} - ${t('siteName')}`;
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{t('nav.about')} - {t('siteName')}</title>
        <meta name="description" content="Learn about our creative agency, our mission, values, and story." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('about.title')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {t('about.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Creative team working together" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-white font-poppins mb-6">
                {t('about.ourStory')}
              </h2>
              <div className="prose prose-lg prose-invert">
                <p className={`text-gray-300 ${language === 'ar' ? 'rtl' : ''}`}>
                  {t('about.storyContent1')}
                </p>
                <p className={`text-gray-300 mt-4 ${language === 'ar' ? 'rtl' : ''}`}>
                  {t('about.storyContent2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white font-poppins mb-12 text-center">
            {t('about.ourValues')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#36261E] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-[#36261E]">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('about.value1Title')}
              </h3>
              <p className="text-gray-300">
                {t('about.value1Content')}
              </p>
            </div>
            
            <div className="bg-[#36261E] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-[#36261E]">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('about.value2Title')}
              </h3>
              <p className="text-gray-300">
                {t('about.value2Content')}
              </p>
            </div>
            
            <div className="bg-[#36261E] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#C9AB81] rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-[#36261E]">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('about.value3Title')}
              </h3>
              <p className="text-gray-300">
                {t('about.value3Content')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Overview Section */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-poppins mb-6">
            {t('about.meetOurTeam')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {t('about.teamDescription')}
          </p>
          <a 
            href="/team" 
            className="inline-flex items-center px-6 py-3 border border-[#C9AB81] text-[#C9AB81] font-medium rounded-md hover:bg-[#C9AB81] hover:text-[#36261E] transition duration-300"
          >
            <span>{t('about.viewTeam')}</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default About;