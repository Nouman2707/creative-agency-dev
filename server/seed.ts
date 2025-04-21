import { db } from "./db";
import {
  users, type InsertUser,
  teamMembers, type InsertTeamMember,
  services, type InsertService,
  clients, type InsertClient,
  testimonials, type InsertTestimonial,
  heroSlides, type InsertHeroSlide,
  subscribers, type InsertSubscriber
} from "@shared/schema";

// Function to seed the database with initial data
export async function seedDatabase() {
  console.log("Checking if database needs seeding...");
  
  // Check if we already have data in the services table
  const existingServices = await db.select().from(services);
  if (existingServices.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }
  
  console.log("Seeding database with initial data...");

  try {
    // Add services
    const servicesData: InsertService[] = [
      {
        title: 'Branding',
        description: 'We create distinctive brand identities that resonate with your audience and stand out in the market.',
        content: 'Our branding services help businesses create memorable, effective brand identities that connect with their target audience. We develop comprehensive brand strategies, design unique visual identities, and create consistent brand experiences across all touchpoints.',
        icon: 'PaintBrushIcon',
        slug: 'branding',
        titleAr: 'تصميم العلامة التجارية',
        descriptionAr: 'نقوم بإنشاء هويات علامات تجارية مميزة تتردد صداها مع جمهورك وتبرز في السوق.',
        contentAr: 'تساعد خدمات العلامة التجارية لدينا الشركات على إنشاء هويات علامة تجارية فعالة وتتصل بجمهورها المستهدف. نحن نطور استراتيجيات شاملة للعلامة التجارية، وتصميم هويات بصرية فريدة، وخلق تجارب متسقة للعلامة التجارية عبر جميع نقاط الاتصال.'
      },
      {
        title: 'Web Design',
        description: 'We design intuitive, responsive websites that provide exceptional user experiences across all devices.',
        content: 'Our web design services focus on creating beautiful, functional websites that meet your business goals. We combine stunning visual design with intuitive user experiences to create websites that convert visitors into customers. Our responsive designs ensure your site works perfectly on all devices.',
        icon: 'DesktopIcon',
        slug: 'web-design',
        titleAr: 'تصميم المواقع',
        descriptionAr: 'نصمم مواقع إلكترونية بديهية وسريعة الاستجابة توفر تجارب استثنائية للمستخدم على جميع الأجهزة.',
        contentAr: 'تركز خدمات تصميم الويب لدينا على إنشاء مواقع جميلة وعملية تلبي أهداف عملك. نحن نجمع بين التصميم المرئي الرائع وتجارب المستخدم البديهية لإنشاء مواقع ويب تحول الزوار إلى عملاء. تضمن تصميماتنا سريعة الاستجابة عمل موقعك بشكل مثالي على جميع الأجهزة.'
      },
      {
        title: 'Development',
        description: 'We build robust, scalable web applications using the latest technologies and best practices.',
        content: 'Our development team builds powerful, scalable web applications and websites using modern technologies and frameworks. We focus on clean, maintainable code that\'s optimized for performance and security. From simple websites to complex web applications, we have the expertise to bring your vision to life.',
        icon: 'CodeIcon',
        slug: 'development',
        titleAr: 'تطوير البرمجيات',
        descriptionAr: 'نقوم ببناء تطبيقات ويب قوية وقابلة للتطوير باستخدام أحدث التقنيات وأفضل الممارسات.',
        contentAr: 'يقوم فريق التطوير لدينا ببناء تطبيقات ومواقع ويب قوية وقابلة للتطوير باستخدام التقنيات والأطر الحديثة. نحن نركز على التعليمات البرمجية النظيفة والقابلة للصيانة المحسنة للأداء والأمان. من المواقع البسيطة إلى تطبيقات الويب المعقدة، لدينا الخبرة لإحياء رؤيتك.'
      },
      {
        title: 'Digital Marketing',
        description: 'We develop strategic marketing campaigns that drive traffic, engagement, and conversions.',
        content: 'Our digital marketing services help businesses grow their online presence and reach their target audience. We develop comprehensive marketing strategies and execute campaigns across multiple channels to drive traffic, engagement, and conversions. From SEO and content marketing to social media and paid advertising, we have the expertise to help your business succeed online.',
        icon: 'ChartLineIcon',
        slug: 'digital-marketing',
        titleAr: 'التسويق الرقمي',
        descriptionAr: 'نطور حملات تسويقية استراتيجية تدفع حركة المرور والمشاركة والتحويلات.',
        contentAr: 'تساعد خدمات التسويق الرقمي لدينا الشركات على تنمية وجودها عبر الإنترنت والوصول إلى جمهورها المستهدف. نحن نطور استراتيجيات تسويقية شاملة وننفذ حملات عبر قنوات متعددة لدفع حركة المرور والمشاركة والتحويلات. من تحسين محركات البحث والتسويق بالمحتوى إلى وسائل التواصل الاجتماعي والإعلانات المدفوعة، لدينا الخبرة لمساعدة عملك على النجاح عبر الإنترنت.'
      },
      {
        title: 'Photography',
        description: 'We capture high-quality images that tell your brand\'s story and connect with your audience.',
        content: 'Our photography services capture stunning images that tell your brand\'s story and showcase your products or services. We specialize in commercial, product, and lifestyle photography that helps businesses create compelling visual content for their marketing efforts. Our experienced photographers work with you to understand your brand and create images that resonate with your target audience.',
        icon: 'CameraIcon',
        slug: 'photography',
        titleAr: 'التصوير الفوتوغرافي',
        descriptionAr: 'نلتقط صورًا عالية الجودة تروي قصة علامتك التجارية وتتواصل مع جمهورك.',
        contentAr: 'تلتقط خدمات التصوير الفوتوغرافي لدينا صورًا مذهلة تروي قصة علامتك التجارية وتعرض منتجاتك أو خدماتك. نحن متخصصون في التصوير التجاري والمنتجات ونمط الحياة الذي يساعد الشركات على إنشاء محتوى مرئي مقنع لجهود التسويق الخاصة بهم. يعمل المصورون ذوو الخبرة لدينا معك لفهم علامتك التجارية وإنشاء صور تتردد صداها مع جمهورك المستهدف.'
      },
      {
        title: 'Video Production',
        description: 'We create engaging video content that captivates viewers and communicates your message effectively.',
        content: 'Our video production services create compelling visual stories that engage your audience and communicate your message effectively. From concept development to post-production, we handle every aspect of the video creation process. Our team specializes in creating promotional videos, explainer videos, testimonials, and social media content that helps businesses connect with their audience and achieve their marketing goals.',
        icon: 'VideoIcon',
        slug: 'video-production',
        titleAr: 'إنتاج الفيديو',
        descriptionAr: 'نحن ننشئ محتوى فيديو جذاب يأسر المشاهدين ويوصل رسالتك بشكل فعال.',
        contentAr: 'تنشئ خدمات إنتاج الفيديو لدينا قصصًا مرئية مقنعة تجذب جمهورك وتوصل رسالتك بشكل فعال. من تطوير المفهوم إلى ما بعد الإنتاج، نحن نتعامل مع كل جانب من جوانب عملية إنشاء الفيديو. يتخصص فريقنا في إنشاء مقاطع فيديو ترويجية ومقاطع فيديو توضيحية وشهادات ومحتوى وسائط اجتماعية تساعد الشركات على التواصل مع جمهورها وتحقيق أهدافها التسويقية.'
      }
    ];

    // Insert services
    for (const service of servicesData) {
      await db.insert(services).values(service);
    }
    
    // Add team members
    const teamData: InsertTeamMember[] = [
      {
        name: 'John Doe',
        role: 'Creative Director',
        bio: 'With over 15 years of experience in the creative industry, John leads our creative team with vision and expertise. He has worked with major brands across multiple industries, delivering innovative solutions that drive results.',
        skills: ['Brand Strategy', 'Creative Direction', 'User Experience', 'Design Thinking'],
        imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80',
        contactEmail: 'john@creativeagency.com',
        socialLinks: { linkedin: 'https://linkedin.com/in/johndoe', twitter: 'https://twitter.com/johndoe' },
        nameAr: 'جون دو',
        roleAr: 'المدير الإبداعي',
        bioAr: 'مع أكثر من 15 عامًا من الخبرة في الصناعة الإبداعية، يقود جون فريقنا الإبداعي برؤية وخبرة. لقد عمل مع كبرى العلامات التجارية عبر صناعات متعددة، مما يوفر حلولًا مبتكرة تدفع النتائج.'
      },
      {
        name: 'Jane Smith',
        role: 'UX Designer',
        bio: 'Jane is a talented UX designer with a passion for creating intuitive, user-centered digital experiences. Her background in psychology helps her understand user behavior and design interfaces that are both beautiful and functional.',
        skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80',
        contactEmail: 'jane@creativeagency.com',
        socialLinks: { linkedin: 'https://linkedin.com/in/janesmith', dribbble: 'https://dribbble.com/janesmith' },
        nameAr: 'جين سميث',
        roleAr: 'مصممة تجربة المستخدم',
        bioAr: 'جين هي مصممة UX موهوبة ولديها شغف بإنشاء تجارب رقمية بديهية تركز على المستخدم. تساعدها خلفيتها في علم النفس على فهم سلوك المستخدم وتصميم واجهات جميلة وعملية.'
      },
      {
        name: 'David Johnson',
        role: 'Lead Developer',
        bio: 'David brings technical excellence to our team with his extensive experience in web and application development. He specializes in creating scalable, high-performance applications using modern technologies and frameworks.',
        skills: ['Front-end Development', 'Back-end Development', 'DevOps', 'Performance Optimization'],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80',
        contactEmail: 'david@creativeagency.com',
        socialLinks: { linkedin: 'https://linkedin.com/in/davidjohnson', github: 'https://github.com/davidjohnson' },
        nameAr: 'ديفيد جونسون',
        roleAr: 'مطور رئيسي',
        bioAr: 'يجلب ديفيد التميز التقني لفريقنا من خلال خبرته الواسعة في تطوير الويب والتطبيقات. يتخصص في إنشاء تطبيقات قابلة للتطوير وعالية الأداء باستخدام التقنيات والأطر الحديثة.'
      },
      {
        name: 'Sarah Williams',
        role: 'Marketing Strategist',
        bio: 'Sarah is an experienced marketing professional with a data-driven approach to digital marketing. She develops comprehensive marketing strategies that help our clients reach their target audience and achieve their business goals.',
        skills: ['Digital Strategy', 'SEO', 'Content Marketing', 'Analytics'],
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80',
        contactEmail: 'sarah@creativeagency.com',
        socialLinks: { linkedin: 'https://linkedin.com/in/sarahwilliams', twitter: 'https://twitter.com/sarahwilliams' },
        nameAr: 'سارة ويليامز',
        roleAr: 'استراتيجية التسويق',
        bioAr: 'سارة هي محترفة تسويق ذات خبرة ولديها نهج قائم على البيانات للتسويق الرقمي. تطور استراتيجيات تسويقية شاملة تساعد عملائنا على الوصول إلى جمهورهم المستهدف وتحقيق أهداف أعمالهم.'
      }
    ];

    // Insert team members
    for (const member of teamData) {
      await db.insert(teamMembers).values(member);
    }

    // Add clients
    const clientsData: InsertClient[] = [
      { name: 'TechWorld Inc.', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=TechWorld', website: 'https://techworld.com' },
      { name: 'Global Media', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Global+Media', website: 'https://globalmedia.com' },
      { name: 'Innovate Co.', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Innovate', website: 'https://innovate.co' },
      { name: 'Nexus Systems', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Nexus', website: 'https://nexus-systems.com' },
      { name: 'Quantum Brands', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Quantum', website: 'https://quantumbrands.com' },
      { name: 'Elevate Group', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Elevate', website: 'https://elevategroup.com' }
    ];

    // Insert clients
    for (const client of clientsData) {
      await db.insert(clients).values(client);
    }

    // Add testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        clientId: 1,
        personName: 'Emily Parker',
        position: 'Marketing Director',
        company: 'TechWorld Inc.',
        content: 'Working with the Creative Agency team was a game-changer for our brand. Their strategic approach and creative solutions helped us increase our online presence and customer engagement by over 200%.',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
        personNameAr: 'إميلي باركر',
        positionAr: 'مدير التسويق',
        companyAr: 'تك وورلد',
        contentAr: 'كان العمل مع فريق Creative Agency بمثابة نقلة نوعية لعلامتنا التجارية. ساعدتنا مقاربتهم الاستراتيجية والحلول الإبداعية على زيادة تواجدنا عبر الإنترنت ومشاركة العملاء بأكثر من 200٪.'
      }
    ];

    // Insert testimonials
    for (const testimonial of testimonialsData) {
      await db.insert(testimonials).values(testimonial);
    }

    // Add hero slides
    const slidesData: InsertHeroSlide[] = [
      {
        title: 'Creative Solutions for Your Business',
        subtitle: 'We craft exceptional digital experiences',
        imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        order: 1,
        titleAr: 'حلول إبداعية لعملك',
        subtitleAr: 'نحن نصمم تجارب رقمية استثنائية',
        videoUrl: null
      },
      {
        title: 'Award-Winning Design & Development',
        subtitle: 'Bringing your vision to life with cutting-edge technology',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        order: 2,
        titleAr: 'تصميم وتطوير حائز على جوائز',
        subtitleAr: 'نحول رؤيتك إلى واقع باستخدام أحدث التقنيات',
        videoUrl: null
      },
      {
        title: 'Expert Team, Exceptional Results',
        subtitle: 'Dedicated professionals committed to your success',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        order: 3,
        titleAr: 'فريق خبير، نتائج استثنائية',
        subtitleAr: 'محترفون متفانون ملتزمون بنجاحك',
        videoUrl: null
      }
    ];

    // Insert hero slides
    for (const slide of slidesData) {
      await db.insert(heroSlides).values(slide);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}