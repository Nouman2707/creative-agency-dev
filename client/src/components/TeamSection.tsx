import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { TeamMember } from '@shared/schema';
import { ArrowRightIcon } from '@/assets/icons';

const TeamSection = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  const { 
    data: teamMembers = [], 
    isLoading,
    error 
  } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="text-white text-xl">{t('loading')}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="text-red-400 text-xl">{t('error')}</div>
        </div>
      </section>
    );
  }

  // Show max 4 team members in the homepage section
  const limitedTeamMembers = teamMembers.slice(0, 4);

  return (
    <section className="py-20 bg-[#36261E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-3">
            {t('team.title')}
          </h2>
          <div className="h-1 w-20 bg-[#C9AB81] mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {limitedTeamMembers.map((member) => (
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
        
        <div className="text-center mt-12">
          <Link 
            href="/team"
            className="inline-flex items-center px-6 py-3 border border-[#C9AB81] text-[#C9AB81] font-medium rounded-md hover:bg-[#C9AB81] hover:text-[#36261E] transition duration-300"
          >
            <span>{t('team.viewAll')}</span>
            <ArrowRightIcon size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
