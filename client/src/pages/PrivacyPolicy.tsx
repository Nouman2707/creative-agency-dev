import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('footer.privacyPolicy')} - ${t('siteName')}`;
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{t('footer.privacyPolicy')} - {t('siteName')}</title>
        <meta name="description" content="Our privacy policy outlines how we collect, use, and protect your personal information." />
      </Helmet>
      
      {/* Header */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('footer.privacyPolicy')}
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
              Creative Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
            
            <h2 className="text-white">Information We Collect</h2>
            <p>
              <strong>Personal Data</strong>: We may collect personal identification information from users in various ways, including, but not limited to, when users visit our site, register on the site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available. Users may be asked for, as appropriate, name, email address, and phone number.
            </p>
            <p>
              <strong>Non-Personal Data</strong>: We may collect non-personal identification information about users whenever they interact with our site. Non-personal identification information may include the browser name, the type of computer, and technical information about users' means of connection to our site, such as the operating system and the Internet service providers utilized and other similar information.
            </p>
            
            <h2 className="text-white">How We Use Your Information</h2>
            <p>
              We may use the information we collect from you in the following ways:
            </p>
            <ul>
              <li>To personalize your experience and deliver the type of content and product offerings in which you are most interested.</li>
              <li>To improve our website in order to better serve you.</li>
              <li>To allow us to better service you in responding to your customer service requests.</li>
              <li>To administer a contest, promotion, survey or other site feature.</li>
              <li>To quickly process your transactions.</li>
              <li>To ask for ratings and reviews of services or products.</li>
              <li>To follow up with you after correspondence (email or phone inquiries).</li>
            </ul>
            
            <h2 className="text-white">Protection of Your Information</h2>
            <p>
              We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our site.
            </p>
            
            <h2 className="text-white">Sharing Your Personal Information</h2>
            <p>
              We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
            </p>
            
            <h2 className="text-white">Third-Party Websites</h2>
            <p>
              Users may find advertising or other content on our site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our site, is subject to that website's own terms and policies.
            </p>
            
            <h2 className="text-white">Changes to This Privacy Policy</h2>
            <p>
              We have the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our site and revise the updated date at the top of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
            </p>
            
            <h2 className="text-white">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
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

export default PrivacyPolicy;