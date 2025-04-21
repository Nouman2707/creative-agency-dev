import { 
  users, type User, type InsertUser,
  teamMembers, type TeamMember, type InsertTeamMember,
  services, type Service, type InsertService,
  clients, type Client, type InsertClient,
  testimonials, type Testimonial, type InsertTestimonial,
  heroSlides, type HeroSlide, type InsertHeroSlide,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

// Storage interface with CRUD methods for all entities
export interface IStorage {
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Team members methods
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMemberByName(name: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Services methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Clients methods
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;

  // Testimonials methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Hero slides methods
  getHeroSlides(): Promise<HeroSlide[]>;
  getHeroSlide(id: number): Promise<HeroSlide | undefined>;
  createHeroSlide(slide: InsertHeroSlide): Promise<HeroSlide>;

  // Subscribers methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Search method
  search(query: string): Promise<{
    team: TeamMember[],
    services: Service[]
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teamData: Map<number, TeamMember>;
  private servicesData: Map<number, Service>;
  private clientsData: Map<number, Client>;
  private testimonialsData: Map<number, Testimonial>;
  private slidesData: Map<number, HeroSlide>;
  private subscribersData: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentTeamId: number;
  private currentServiceId: number;
  private currentClientId: number;
  private currentTestimonialId: number;
  private currentSlideId: number;
  private currentSubscriberId: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.teamData = new Map();
    this.servicesData = new Map();
    this.clientsData = new Map();
    this.testimonialsData = new Map();
    this.slidesData = new Map();
    this.subscribersData = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentTeamId = 1;
    this.currentServiceId = 1;
    this.currentClientId = 1;
    this.currentTestimonialId = 1;
    this.currentSlideId = 1;
    this.currentSubscriberId = 1;

    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
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

    servicesData.forEach(service => this.createService(service));

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

    teamData.forEach(member => this.createTeamMember(member));

    // Add clients
    const clientsData: InsertClient[] = [
      { name: 'TechWorld Inc.', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=TechWorld', website: 'https://techworld.com' },
      { name: 'Global Media', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Global+Media', website: 'https://globalmedia.com' },
      { name: 'Innovate Co.', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Innovate', website: 'https://innovate.co' },
      { name: 'Nexus Systems', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Nexus', website: 'https://nexus-systems.com' },
      { name: 'Quantum Brands', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Quantum', website: 'https://quantumbrands.com' },
      { name: 'Elevate Group', logoUrl: 'https://dummyimage.com/200x80/ffffff/333333&text=Elevate', website: 'https://elevategroup.com' }
    ];

    clientsData.forEach(client => this.createClient(client));

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

    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));

    // Add hero slides
    const slidesData: InsertHeroSlide[] = [
      {
        title: 'Creative Solutions for Your Business',
        subtitle: 'We craft exceptional digital experiences',
        imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80',
        videoUrl: null,
        titleAr: 'حلول إبداعية لعملك',
        subtitleAr: 'نصنع تجارب رقمية استثنائية',
        order: 1
      },
      {
        title: 'Elevate Your Brand',
        subtitle: 'Strategic design and marketing services',
        imageUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80',
        videoUrl: null,
        titleAr: 'ارتقِ بعلامتك التجارية',
        subtitleAr: 'خدمات التصميم والتسويق الاستراتيجية',
        order: 2
      },
      {
        title: 'Innovative Web Development',
        subtitle: 'Building the digital future together',
        imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80',
        videoUrl: null,
        titleAr: 'تطوير الويب المبتكر',
        subtitleAr: 'بناء المستقبل الرقمي معًا',
        order: 3
      }
    ];

    slidesData.forEach(slide => this.createHeroSlide(slide));
  }

  // User methods (existing)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Team members methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamData.values());
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamData.get(id);
  }

  async getTeamMemberByName(name: string): Promise<TeamMember | undefined> {
    return Array.from(this.teamData.values()).find(
      (member) => member.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamId++;
    const member: TeamMember = { ...insertMember, id };
    this.teamData.set(id, member);
    return member;
  }

  // Services methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.servicesData.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.servicesData.get(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.servicesData.values()).find(
      (service) => service.slug === slug,
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.servicesData.set(id, service);
    return service;
  }

  // Clients methods
  async getClients(): Promise<Client[]> {
    return Array.from(this.clientsData.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clientsData.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { ...insertClient, id };
    this.clientsData.set(id, client);
    return client;
  }

  // Testimonials methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsData.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonialsData.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonialsData.set(id, testimonial);
    return testimonial;
  }

  // Hero slides methods
  async getHeroSlides(): Promise<HeroSlide[]> {
    return Array.from(this.slidesData.values()).sort((a, b) => a.order - b.order);
  }

  async getHeroSlide(id: number): Promise<HeroSlide | undefined> {
    return this.slidesData.get(id);
  }

  async createHeroSlide(insertSlide: InsertHeroSlide): Promise<HeroSlide> {
    const id = this.currentSlideId++;
    const slide: HeroSlide = { ...insertSlide, id };
    this.slidesData.set(id, slide);
    return slide;
  }

  // Subscribers methods
  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribersData.values());
  }

  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribersData.get(id);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribersData.values()).find(
      (subscriber) => subscriber.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date() 
    };
    this.subscribersData.set(id, subscriber);
    return subscriber;
  }

  // Search method
  async search(query: string): Promise<{
    team: TeamMember[],
    services: Service[]
  }> {
    const normalizedQuery = query.toLowerCase();
    
    const teamResults = Array.from(this.teamData.values()).filter(
      (member) => 
        member.name.toLowerCase().includes(normalizedQuery) ||
        member.role.toLowerCase().includes(normalizedQuery) ||
        member.bio.toLowerCase().includes(normalizedQuery) ||
        (member.nameAr && member.nameAr.toLowerCase().includes(normalizedQuery)) ||
        (member.roleAr && member.roleAr.toLowerCase().includes(normalizedQuery))
    );
    
    const serviceResults = Array.from(this.servicesData.values()).filter(
      (service) => 
        service.title.toLowerCase().includes(normalizedQuery) ||
        service.description.toLowerCase().includes(normalizedQuery) ||
        service.content.toLowerCase().includes(normalizedQuery) ||
        service.slug.toLowerCase().includes(normalizedQuery) ||
        (service.titleAr && service.titleAr.toLowerCase().includes(normalizedQuery)) ||
        (service.descriptionAr && service.descriptionAr.toLowerCase().includes(normalizedQuery))
    );
    
    return {
      team: teamResults,
      services: serviceResults
    };
  }
}

export const storage = new MemStorage();
