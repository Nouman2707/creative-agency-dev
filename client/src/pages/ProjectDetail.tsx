import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { Button } from '@/components/ui/button';

// Project type definition
interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  slug: string;
  titleAr?: string;
  categoryAr?: string;
  description?: string;
  descriptionAr?: string;
  client?: string;
  clientAr?: string;
  date?: string;
  technologies?: string[];
  technologiesAr?: string[];
  gallery?: string[];
}

const ProjectDetail = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const [match, params] = useRoute('/work/:slug');
  const slug = params?.slug;
  
  // Sample projects data (would be fetched from API in production)
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Brand Identity for Tech Startup",
      category: "Branding",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "tech-startup-branding",
      titleAr: "هوية العلامة التجارية لشركة تكنولوجيا ناشئة",
      categoryAr: "العلامة التجارية",
      description: "We created a complete brand identity for a tech startup that included logo design, color palette, typography, and brand guidelines.",
      descriptionAr: "قمنا بإنشاء هوية علامة تجارية كاملة لشركة تكنولوجيا ناشئة تضمنت تصميم الشعار ومجموعة الألوان والطباعة وإرشادات العلامة التجارية.",
      client: "TechWorld Inc.",
      clientAr: "تك وورلد",
      date: "2023",
      technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
      gallery: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 2,
      title: "E-commerce Website Redesign",
      category: "Web Design",
      imageUrl: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "ecommerce-website-redesign",
      titleAr: "إعادة تصميم موقع التجارة الإلكترونية",
      categoryAr: "تصميم الويب",
      description: "We redesigned an e-commerce website to improve user experience, increase conversions, and modernize the brand's online presence.",
      descriptionAr: "قمنا بإعادة تصميم موقع للتجارة الإلكترونية لتحسين تجربة المستخدم وزيادة التحويلات وتحديث الوجود عبر الإنترنت للعلامة التجارية.",
      client: "Fashion Retail Co.",
      clientAr: "شركة البيع بالتجزئة للأزياء",
      date: "2023",
      technologies: ["HTML5", "CSS3", "JavaScript", "Shopify"],
      gallery: [
        "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Development",
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "mobile-banking-app",
      titleAr: "تطبيق الخدمات المصرفية عبر الهاتف المحمول",
      categoryAr: "تطوير البرمجيات",
      description: "We developed a mobile banking app that allows users to manage their accounts, transfer money, pay bills, and more from their smartphones.",
      descriptionAr: "قمنا بتطوير تطبيق للخدمات المصرفية عبر الهاتف المحمول يسمح للمستخدمين بإدارة حساباتهم وتحويل الأموال ودفع الفواتير والمزيد من هواتفهم الذكية.",
      client: "Global Bank",
      clientAr: "البنك العالمي",
      date: "2022",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
      gallery: [
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 4,
      title: "Digital Marketing Campaign",
      category: "Digital Marketing",
      imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "digital-marketing-campaign",
      titleAr: "حملة التسويق الرقمي",
      categoryAr: "التسويق الرقمي",
      description: "We created and executed a comprehensive digital marketing campaign that included social media, email marketing, content marketing, and paid advertising.",
      descriptionAr: "قمنا بإنشاء وتنفيذ حملة تسويق رقمي شاملة تضمنت وسائل التواصل الاجتماعي والتسويق عبر البريد الإلكتروني والتسويق بالمحتوى والإعلانات المدفوعة.",
      client: "Lifestyle Brand",
      clientAr: "العلامة التجارية للحياة",
      date: "2023",
      technologies: ["Google Ads", "Facebook Ads", "Mailchimp", "HubSpot"],
      gallery: [
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 5,
      title: "Product Photography",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "product-photography",
      titleAr: "تصوير المنتجات",
      categoryAr: "التصوير الفوتوغرافي",
      description: "We provided professional product photography services for an e-commerce company, creating high-quality images that showcase their products in the best light.",
      descriptionAr: "قدمنا خدمات تصوير المنتجات الاحترافية لشركة التجارة الإلكترونية، وقمنا بإنشاء صور عالية الجودة تعرض منتجاتهم في أفضل صورة.",
      client: "Luxury Goods Co.",
      clientAr: "شركة السلع الفاخرة",
      date: "2023",
      technologies: ["Canon EOS", "Adobe Lightroom", "Photoshop"],
      gallery: [
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579541591970-0a578b7c3a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 6,
      title: "Corporate Video Production",
      category: "Video Production",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      slug: "corporate-video",
      titleAr: "إنتاج فيديو الشركات",
      categoryAr: "إنتاج الفيديو",
      description: "We produced a corporate video for a company's website and social media channels, highlighting their services, company culture, and client success stories.",
      descriptionAr: "قمنا بإنتاج فيديو للشركة لموقعها على الويب وقنوات التواصل الاجتماعي، مع تسليط الضوء على خدماتها وثقافة الشركة وقصص نجاح العملاء.",
      client: "Business Solutions Inc.",
      clientAr: "شركة حلول الأعمال",
      date: "2022",
      technologies: ["DaVinci Resolve", "Adobe Premiere Pro", "After Effects"],
      gallery: [
        "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1494578379344-d6c710782a3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      ]
    }
  ]);

  // Find the project by slug
  const project = projects.find(p => p.slug === slug);
  
  // Update page title on component mount
  useEffect(() => {
    if (project) {
      document.title = `${language === 'ar' && project.titleAr ? project.titleAr : project.title} - ${t('siteName')}`;
    }
  }, [t, project, language]);

  // If no project is found, show a not found message
  if (!project) {
    return (
      <div className="bg-[#36261E] text-white min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">{t('search.noResults')} "{slug}"</h1>
          <a href="/work" className="inline-block px-6 py-3 bg-[#C9AB81] text-[#36261E] rounded-md font-medium hover:bg-[#B89971] transition duration-300">
            {t('cta.viewOurWork')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' && project.titleAr ? project.titleAr : project.title} - {t('siteName')}</title>
        <meta name="description" content={language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description} />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="text-[#C9AB81] font-medium">
                  {language === 'ar' && project.categoryAr ? project.categoryAr : project.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
                {language === 'ar' && project.titleAr ? project.titleAr : project.title}
              </h1>
              <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
              <p className="text-lg text-gray-300 mb-8">
                {language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="text-[#C9AB81] font-semibold mb-2">{t('client')}</h3>
                  <p className="text-white">
                    {language === 'ar' && project.clientAr ? project.clientAr : project.client}
                  </p>
                </div>
                <div>
                  <h3 className="text-[#C9AB81] font-semibold mb-2">{t('date')}</h3>
                  <p className="text-white">{project.date}</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-[#C9AB81] font-semibold mb-2">{t('technologies')}</h3>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ar' && project.technologiesAr ? project.technologiesAr : project.technologies)?.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1E1510] text-white rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={language === 'ar' && project.titleAr ? project.titleAr : project.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Gallery */}
      {project.gallery && (
        <section className="bg-[#36261E] py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">{t('projectGallery')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={image} 
                    alt={`${language === 'ar' && project.titleAr ? project.titleAr : project.title} - ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="bg-black py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('work.startProject')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('work.startProjectDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild
              className="bg-[#C9AB81] hover:bg-[#B89971] text-[#36261E]"
            >
              <a href="/contact">{t('cta.getInTouch')}</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-[#C9AB81] text-[#C9AB81] hover:bg-[#C9AB81] hover:text-[#36261E]"
            >
              <a href="/work">{t('cta.viewOurWork')}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;