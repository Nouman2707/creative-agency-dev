import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/HeroSection';
import Services from '@/components/Services';
import TeamSection from '@/components/TeamSection';
import ClientsSection from '@/components/ClientsSection';

const Home = () => {
  const { t } = useTranslation();
  
  // Update page title on component mount
  useEffect(() => {
    document.title = t('siteName');
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{t('siteName')}</title>
        <meta name="description" content="Creative Agency - We craft exceptional digital experiences" />
      </Helmet>
      
      <HeroSection />
      <Services />
      <TeamSection />
      <ClientsSection />
    </>
  );
};

export default Home;
