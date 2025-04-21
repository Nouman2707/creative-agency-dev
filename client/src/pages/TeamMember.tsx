import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import { TeamMember as TeamMemberType } from '@shared/schema';
import { MailIcon, LinkedInIcon, TwitterIcon } from '@/assets/icons';

const TeamMember = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const { id } = useParams();
  
  const { 
    data: teamMembers = [], 
    isLoading,
    error 
  } = useQuery<TeamMemberType[]>({
    queryKey: ['/api/team'],
  });

  // Find the specific team member using the URL parameter
  const teamMember = teamMembers.find(
    member => member.name.toLowerCase().replace(/\s+/g, '-') === id
  );

  // Get other team members (for the "Other Team Members" section)
  const otherTeamMembers = teamMembers.filter(
    member => member.name.toLowerCase().replace(/\s+/g, '-') !== id
  ).slice(0, 3);

  // Update page title on component mount
  useEffect(() => {
    if (teamMember) {
      document.title = `${language === 'ar' && teamMember.nameAr ? teamMember.nameAr : teamMember.name} - ${t('siteName')}`;
    }
  }, [teamMember, language, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">{t('loading')}</div>
      </div>
    );
  }

  if (error || !teamMember) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{t('error')}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' && teamMember.nameAr ? teamMember.nameAr : teamMember.name} - {t('siteName')}</title>
        <meta 
          name="description" 
          content={`${language === 'ar' && teamMember.roleAr ? teamMember.roleAr : teamMember.role} at Creative Agency`} 
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="lg:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={teamMember.imageUrl} 
                  alt={language === 'ar' && teamMember.nameAr ? teamMember.nameAr : teamMember.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-bold font-poppins text-white mb-2">
                {language === 'ar' && teamMember.nameAr ? teamMember.nameAr : teamMember.name}
              </h1>
              <p className="text-xl text-[#C9AB81] mb-6">
                {language === 'ar' && teamMember.roleAr ? teamMember.roleAr : teamMember.role}
              </p>
              <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
              
              <div className="text-gray-300 mb-8 whitespace-pre-line">
                <p className={language === 'ar' ? 'rtl' : ''}>
                  {language === 'ar' && teamMember.bioAr ? teamMember.bioAr : teamMember.bio}
                </p>
              </div>
              
              {/* Skills */}
              {teamMember.skills && teamMember.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{t('team.skills')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {teamMember.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#5D4037] text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">{t('team.contactInfo')}</h3>
                <div className="flex flex-wrap gap-6">
                  {teamMember.contactEmail && (
                    <a 
                      href={`mailto:${teamMember.contactEmail}`}
                      className="flex items-center text-gray-300 hover:text-[#C9AB81] transition duration-300"
                    >
                      <MailIcon size={18} className="mr-2" />
                      <span>{teamMember.contactEmail}</span>
                    </a>
                  )}
                  
                  {teamMember.socialLinks && teamMember.socialLinks.linkedin && (
                    <a 
                      href={teamMember.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-[#C9AB81] transition duration-300"
                    >
                      <LinkedInIcon size={18} className="mr-2" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  
                  {teamMember.socialLinks && teamMember.socialLinks.twitter && (
                    <a 
                      href={teamMember.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-[#C9AB81] transition duration-300"
                    >
                      <TwitterIcon size={18} className="mr-2" />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Team Members Section */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white font-poppins mb-12 text-center">
            {t('team.otherTeamMembers')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherTeamMembers.map((member) => (
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
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamMember;
