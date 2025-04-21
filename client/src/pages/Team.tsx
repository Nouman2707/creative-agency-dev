import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { TeamMember } from '@shared/schema';

const Team = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('team.title')} - ${t('siteName')}`;
  }, [t]);
  
  const { 
    data: teamMembers = [], 
    isLoading,
    error 
  } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
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
        <title>{t('team.title')} - {t('siteName')}</title>
        <meta name="description" content="Meet our talented team of creative professionals who bring your vision to life." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-6">
            {t('team.title')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Team Grid */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
              >
                <Link href={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={language === 'ar' && member.nameAr ? member.nameAr : member.name} 
                      className="w-full h-80 object-cover object-center transform transition duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold text-white group-hover:text-[#C9AB81] transition duration-300">
                      {language === 'ar' && member.nameAr ? member.nameAr : member.name}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'ar' && member.roleAr ? member.roleAr : member.role}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-6">
            Want to work with our talented team?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Get in touch to discuss how our experts can help bring your vision to life.
          </p>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-[#C9AB81] text-[#36261E] font-medium rounded hover:bg-white transition duration-300"
          >
            {t('cta.getInTouch')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Team;
