import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';

const TermsOfService = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('footer.termsOfService')} - ${t('siteName')}`;
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{t('footer.termsOfService')} - {t('siteName')}</title>
        <meta name="description" content="Our terms of service outline the rules and regulations for the use of our website and services." />
      </Helmet>
      
      {/* Header */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('footer.termsOfService')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
        </div>
      </section>
      
      {/* Content */}
      <section className="bg-[#36261E] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`prose prose-lg max-w-none text-gray-300 ${language === 'ar' ? 'rtl' : ''}`}>
            <p>
              Last updated: April 21, 2025
            </p>
            
            <h2 className="text-white">Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your use of the website operated by Creative Agency ("Company", "we", "us", or "our") and any services offered through the website.
            </p>
            <p>
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
            </p>
            
            <h2 className="text-white">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on our website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
            
            <h2 className="text-white">Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
            </p>
            
            <h2 className="text-white">Limitations</h2>
            <p>
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
            
            <h2 className="text-white">Accuracy of Materials</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete or current. We may make changes to the materials contained on our website at any time without notice. However, we do not make any commitment to update the materials.
            </p>
            
            <h2 className="text-white">Links</h2>
            <p>
              We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <h2 className="text-white">Modifications</h2>
            <p>
              We may revise these terms of service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2 className="text-white">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of New York and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
            
            <h2 className="text-white">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Creative Agency<br />
              123 Creative Avenue<br />
              Design District<br />
              New York, NY 10001<br />
              info@creativeagency.com<br />
              +1 (555) 123-4567
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService;