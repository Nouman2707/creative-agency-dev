import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage, selectSearchQuery, setSearchQuery } from '@/lib/store';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { TeamMember, Service } from '@shared/schema';
import { getServiceIcon, ArrowRightIcon } from '@/assets/icons';

interface SearchResults {
  team: TeamMember[];
  services: Service[];
}

const Search = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const storedQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const [location] = useLocation();
  
  // Get query from URL
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const urlQuery = searchParams.get('q') || '';
  
  // Use URL query if available, otherwise use stored query
  const [query, setQuery] = useState(urlQuery || storedQuery);
  
  // Update Redux store if URL query is different
  useEffect(() => {
    if (urlQuery && urlQuery !== storedQuery) {
      dispatch(setSearchQuery(urlQuery));
      setQuery(urlQuery);
    }
  }, [urlQuery, storedQuery, dispatch]);
  
  // Update page title
  useEffect(() => {
    document.title = `${t('search.title')} - ${t('siteName')}`;
  }, [t]);
  
  const { 
    data, 
    isLoading,
    error 
  } = useQuery<SearchResults>({
    queryKey: [`/api/search?q=${query}`],
    enabled: query.length >= 2
  });

  // Check if we have any search results
  const hasResults = data && (data.team.length > 0 || data.services.length > 0);
  
  return (
    <>
      <Helmet>
        <title>{t('search.title')} - {t('siteName')}</title>
        <meta name="description" content="Search our website for services, team members, and more." />
      </Helmet>
      
      {/* Search Results Header */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('search.title')}
          </h1>
          {query && (
            <p className="text-xl text-gray-300">
              {t('search.for')} "<span className="text-[#C9AB81]">{query}</span>"
            </p>
          )}
        </div>
      </section>
      
      {/* Search Results */}
      <section className="py-20 bg-[#36261E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="text-white text-xl">{t('loading')}</div>
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <div className="text-red-400 text-xl">{t('error')}</div>
            </div>
          ) : !query || query.length < 2 ? (
            <div className="text-center text-white">
              <p>{t('search.minLength')}</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center text-white">
              <p>
                {t('search.noResults')} "<span className="text-[#C9AB81]">{query}</span>"
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Team Results */}
              {data.team.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white font-poppins mb-8">
                    {t('search.teamResults')}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.team.map((member) => (
                      <div 
                        key={member.id}
                        className="bg-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
                      >
                        <Link href={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                          <div className="relative overflow-hidden">
                            <img 
                              src={member.imageUrl} 
                              alt={language === 'ar' && member.nameAr ? member.nameAr : member.name} 
                              className="w-full h-64 object-cover object-center transform transition duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
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
              )}
              
              {/* Service Results */}
              {data.services.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white font-poppins mb-8">
                    {t('search.serviceResults')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.services.map((service) => (
                      <div 
                        key={service.id}
                        className="bg-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 group"
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
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
