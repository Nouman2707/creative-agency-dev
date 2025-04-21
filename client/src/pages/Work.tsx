import { useEffect, useState } from 'react';
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
}

const Work = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('nav.work')} - ${t('siteName')}`;
  }, [t]);

  // Sample projects data
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Brand Identity for Tech Startup",
      category: "Branding",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "tech-startup-branding",
      titleAr: "هوية العلامة التجارية لشركة تكنولوجيا ناشئة",
      categoryAr: "العلامة التجارية"
    },
    {
      id: 2,
      title: "E-commerce Website Redesign",
      category: "Web Design",
      imageUrl: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "ecommerce-website-redesign",
      titleAr: "إعادة تصميم موقع التجارة الإلكترونية",
      categoryAr: "تصميم الويب"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Development",
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "mobile-banking-app",
      titleAr: "تطبيق الخدمات المصرفية عبر الهاتف المحمول",
      categoryAr: "تطوير البرمجيات"
    },
    {
      id: 4,
      title: "Digital Marketing Campaign",
      category: "Digital Marketing",
      imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "digital-marketing-campaign",
      titleAr: "حملة التسويق الرقمي",
      categoryAr: "التسويق الرقمي"
    },
    {
      id: 5,
      title: "Product Photography",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1481923546942-d8db597fc2f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "product-photography",
      titleAr: "تصوير المنتجات",
      categoryAr: "التصوير الفوتوغرافي"
    },
    {
      id: 6,
      title: "Corporate Video Production",
      category: "Video Production",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      slug: "corporate-video",
      titleAr: "إنتاج فيديو الشركات",
      categoryAr: "إنتاج الفيديو"
    }
  ]);

  // Filter states
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Filter categories
  const categories = [
    { id: 'all', name: t('work.allCategories') },
    { id: 'Branding', name: t('services.branding') },
    { id: 'Web Design', name: t('services.webDesign') },
    { id: 'Development', name: t('services.development') },
    { id: 'Digital Marketing', name: t('services.digitalMarketing') },
    { id: 'Photography', name: t('services.photography') },
    { id: 'Video Production', name: t('services.videoProduction') }
  ];

  // Apply filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, projects]);

  return (
    <>
      <Helmet>
        <title>{t('nav.work')} - {t('siteName')}</title>
        <meta name="description" content="Browse our portfolio of projects across branding, web design, development, marketing, photography, and video production." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            {t('work.title')}
          </h1>
          <div className="h-1 w-20 bg-[#C9AB81] mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {t('work.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="bg-[#36261E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap gap-4 justify-center ${language === 'ar' ? 'rtl' : ''}`}>
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={
                  activeFilter === category.id
                    ? "bg-[#C9AB81] hover:bg-[#B89971] text-[#36261E] border-[#C9AB81]"
                    : "text-white hover:bg-[#C9AB81] hover:text-[#36261E] border-[#C9AB81]"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="bg-[#36261E] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <a href={`/work/${project.slug}`} className="block relative">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={project.imageUrl} 
                      alt={language === 'ar' && project.titleAr ? project.titleAr : project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {language === 'ar' && project.titleAr ? project.titleAr : project.title}
                    </h3>
                    <span className="text-[#C9AB81] inline-block px-3 py-1 rounded-full text-sm">
                      {language === 'ar' && project.categoryAr ? project.categoryAr : project.category}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-black py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('work.startProject')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('work.startProjectDesc')}
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-[#C9AB81] text-[#C9AB81] font-medium rounded-md hover:bg-[#C9AB81] hover:text-[#36261E] transition duration-300"
          >
            <span>{t('cta.getInTouch')}</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Work;