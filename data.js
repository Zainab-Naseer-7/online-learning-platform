/**
 * LEARNOVA — SMART LEARNING PLATFORM
 * Core Data Store & Initial Seed Data
 */

const LEARNOVA_DATA = {
  categories: [
    {
      id: "web-dev",
      name: "Web Development",
      icon: "code",
      count: 142,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      description: "Master modern full-stack web development with React, Node.js, Next.js, and TypeScript."
    },
    {
      id: "ai-ml",
      name: "Artificial Intelligence",
      icon: "cpu",
      count: 98,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      description: "Explore Deep Learning, LLMs, Neural Networks, PyTorch, and generative AI systems."
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: "bar-chart",
      count: 85,
      gradient: "linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)",
      description: "Analyze big data, build predictive pipelines, and master Python, Pandas, and Tableau."
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      icon: "layout",
      count: 64,
      gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
      description: "Design intuitive interfaces, create design systems, and run user research in Figma."
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: "shield",
      count: 52,
      gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
      description: "Learn ethical hacking, network defense, penetration testing, and cloud security protocols."
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      icon: "smartphone",
      count: 73,
      gradient: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
      description: "Build iOS and Android native apps using Flutter, Dart, React Native, and Swift."
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      icon: "cloud",
      count: 61,
      gradient: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
      description: "Deploy scalable microservices with Docker, Kubernetes, AWS, Terraform, and CI/CD."
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      icon: "trending-up",
      count: 47,
      gradient: "linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)",
      description: "Drive growth with SEO, performance advertising, social media strategies, and analytics."
    },
    {
      id: "business",
      name: "Business & Management",
      icon: "briefcase",
      count: 59,
      gradient: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
      description: "Master modern product leadership, startup scaling, agile operations, and venture finance."
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      icon: "pen-tool",
      count: 38,
      gradient: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
      description: "Create brand identities, digital illustrations, 3D typography, and motion graphics."
    }
  ],

  courses: [
    {
      id: "c1",
      title: "Full-Stack Web Architect: React, Node & TypeScript",
      category: "web-dev",
      categoryName: "Web Development",
      instructor: {
        name: "Dr. Alexander Vance",
        role: "Ex-Google Principal Engineer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        bio: "Principal Software Architect with 14+ years designing distributed web engines and reactive UI systems."
      },
      rating: 4.9,
      reviewCount: 1420,
      studentsCount: 18450,
      duration: "42 hours",
      lessonsCount: 38,
      difficulty: "Intermediate",
      price: 89.99,
      originalPrice: 149.99,
      discount: "40% OFF",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      description: "Step-by-step masterclass covering modern architecture, micro-frontends, robust backend microservices, resilient databases, and automated CI/CD deployment pipelines.",
      whatYouLearn: [
        "Architect enterprise-grade web applications with React 19 and TypeScript",
        "Build scalable REST and GraphQL APIs using Node.js, Express, and Prisma",
        "Implement secure authentication with JWT, OAuth2, and session management",
        "Design production PostgreSQL schemas with caching using Redis",
        "Deploy containerized apps with Docker and AWS ECS with automated CI/CD"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and modern JavaScript (ES6+)",
        "A computer running Windows, macOS, or Linux with Node.js installed",
        "Enthusiasm to build real, commercial-grade full-stack products"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Modern Frontend Architecture",
          lessons: [
            { id: "c1-l1", title: "1.1 Architectural Foundations & React 19 Internals", duration: "18:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c1-l2", title: "1.2 Strict TypeScript & Design System Foundations", duration: "24:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
            { id: "c1-l3", title: "1.3 Advanced Custom Hooks & Predictive State", duration: "21:05", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: High-Performance Backend & Databases",
          lessons: [
            { id: "c1-l4", title: "2.1 Scalable Microservices with Node.js & Fastify", duration: "32:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
            { id: "c1-l5", title: "2.2 PostgreSQL Optimization, Indexing & Prisma ORM", duration: "28:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
            { id: "c1-l6", title: "2.3 High-Throughput Redis Caching & Rate Limiting", duration: "19:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4" }
          ]
        },
        {
          moduleTitle: "Module 3: Cloud Deployment & DevOps Automation",
          lessons: [
            { id: "c1-l7", title: "3.1 Docker Multi-Stage Builds & Container Security", duration: "22:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
            { id: "c1-l8", title: "3.2 AWS ECS Fargate & Automated GitHub Actions Pipeline", duration: "35:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "Which hook in React is primarily optimized for memoizing expensive calculations?",
          options: ["useCallback", "useMemo", "useRef", "useEffect"],
          correct: 1
        },
        {
          question: "What is the primary benefit of multi-stage Docker builds for web apps?",
          options: ["Faster network speeds", "Dramatically smaller and safer production images", "Automatic unit test execution", "Zero CPU usage"],
          correct: 1
        },
        {
          question: "In PostgreSQL, what index type is the default and ideal for equality and range queries?",
          options: ["GIN", "Hash", "B-Tree", "BRIN"],
          correct: 2
        },
        {
          question: "How does Redis achieve ultra-low latency for caching operations?",
          options: ["In-memory data storage with asynchronous disk persistence", "Compressing files into zip format", "Parsing SQL queries into machine code", "Running inside browser workers"],
          correct: 0
        }
      ]
    },
    {
      id: "c2",
      title: "Generative AI & LLM Systems Engineering with PyTorch",
      category: "ai-ml",
      categoryName: "Artificial Intelligence",
      instructor: {
        name: "Dr. Elena Rostova",
        role: "Lead AI Researcher & Fellow",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        bio: "Former DeepMind researcher specializing in attention mechanisms, transformer efficiency, and retrieval-augmented generation."
      },
      rating: 4.95,
      reviewCount: 980,
      studentsCount: 12100,
      duration: "36 hours",
      lessonsCount: 32,
      difficulty: "Advanced",
      price: 99.99,
      originalPrice: 169.99,
      discount: "41% OFF",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      description: "Build custom transformers, fine-tune open-source models with LoRA and QLoRA, architect production RAG pipelines, and deploy autonomous LLM agents.",
      whatYouLearn: [
        "Understand mathematical foundations of self-attention and multi-head mechanisms",
        "Code transformer architectures from scratch in PyTorch",
        "Fine-tune Llama 3 and Mistral using Parameter-Efficient Fine-Tuning (PEFT/LoRA)",
        "Build enterprise-grade RAG systems using vector databases (Pinecone/Milvus)",
        "Deploy low-latency inference servers using vLLM and TensorRT-LLM"
      ],
      requirements: [
        "Proficiency in Python and basic linear algebra / matrix multiplication",
        "Familiarity with deep learning concepts (gradient descent, backpropagation)",
        "A GPU environment (Google Colab free/pro or local NVIDIA GPU)"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Transformer Foundations from Scratch",
          lessons: [
            { id: "c2-l1", title: "1.1 Mathematical Anatomy of Self-Attention", duration: "25:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c2-l2", title: "1.2 Implementing Multi-Head Attention in PyTorch", duration: "31:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: Model Fine-Tuning & Quantization",
          lessons: [
            { id: "c2-l3", title: "2.1 LoRA & QLoRA: Fine-Tuning 70B Models on Consumer GPUs", duration: "29:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { id: "c2-l4", title: "2.2 Quantization Techniques: GGUF, AWQ & BitsAndBytes", duration: "22:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "What does LoRA stand for in modern deep learning fine-tuning?",
          options: ["Long Range Attention", "Low-Rank Adaptation", "Linear Optimization Recurrent Architecture", "Logical Reasoning Algorithm"],
          correct: 1
        },
        {
          question: "Which component in a RAG system converts textual documents into dense mathematical vectors?",
          options: ["Tokenizer", "Embedding Model", "Cross-Entropy Loss Function", "Softmax Layer"],
          correct: 1
        },
        {
          question: "What is the primary advantage of FlashAttention over standard self-attention?",
          options: ["Reduces memory IO between GPU SRAM and HBM", "Allows running models without weights", "Eliminates need for positional encodings", "Translates Python directly to CUDA"],
          correct: 0
        }
      ]
    },
    {
      id: "c3",
      title: "UI/UX Design Systems & Product Strategy Masterclass",
      category: "ui-ux",
      categoryName: "UI/UX Design",
      instructor: {
        name: "Sophia Chen",
        role: "Design Director at StudioNeo",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        bio: "Former Lead Product Designer at Airbnb & Stripe, creating scalable design systems used by millions."
      },
      rating: 4.88,
      reviewCount: 810,
      studentsCount: 14600,
      duration: "28 hours",
      lessonsCount: 26,
      difficulty: "All Levels",
      price: 69.99,
      originalPrice: 129.99,
      discount: "46% OFF",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
      description: "Build robust, scalable design systems in Figma with variables, token management, micro-interactions, responsive typography, and design-to-code alignment.",
      whatYouLearn: [
        "Master Figma Variables, component sets, auto-layout 5.0, and tokens",
        "Create cohesive color, typography, spacing, and elevation systems",
        "Conduct actionable UX research, persona mapping, and usability testing",
        "Design interactive micro-animations and seamless prototyping",
        "Deliver production-ready design tokens ready for Tailwind CSS and React"
      ],
      requirements: [
        "Free or Pro Figma account",
        "Basic eye for typography, alignment, and visual aesthetics",
        "No coding experience required"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Design Tokens & Variable Architecture",
          lessons: [
            { id: "c3-l1", title: "1.1 Semantic Colors & Dark Mode Variable Tokens", duration: "19:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c3-l2", title: "1.2 Responsive Typography Scales & 8pt Grid Mastery", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: High-Fidelity Components & Prototypes",
          lessons: [
            { id: "c3-l3", title: "2.1 Advanced Interactive Components & State Management", duration: "27:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { id: "c3-l4", title: "2.2 Designing Accessible Dark & Light Modes with WCAG 2.2", duration: "18:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "What is the recommended contrast ratio for normal text under WCAG AA standards?",
          options: ["3:1", "4.5:1", "7:1", "10:1"],
          correct: 1
        },
        {
          question: "In design token naming, what type of token represents an abstract value like 'color-blue-500'?",
          options: ["Global / Primitive Token", "Semantic Token", "Component Token", "Computed Token"],
          correct: 0
        },
        {
          question: "What is the primary advantage of using an 8-point spatial grid system in UI design?",
          options: ["It enforces mathematical visual rhythm and scales easily across screen resolutions", "It renders faster in browsers", "It eliminates the need for vector icons", "It turns SVGs into JPGs"],
          correct: 0
        }
      ]
    },
    {
      id: "c4",
      title: "Production Cloud DevOps: Kubernetes, Terraform & AWS",
      category: "cloud-devops",
      categoryName: "Cloud & DevOps",
      instructor: {
        name: "Marcus Aurelius Reed",
        role: "Chief Cloud Architect",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        bio: "AWS Certified Solutions Architect & Kubernetes Trainer. Managed infrastructure across 10,000+ nodes."
      },
      rating: 4.92,
      reviewCount: 650,
      studentsCount: 9400,
      duration: "38 hours",
      lessonsCount: 34,
      difficulty: "Advanced",
      price: 94.99,
      originalPrice: 159.99,
      discount: "40% OFF",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      description: "Automate entire cloud environments with Infrastructure as Code (Terraform), manage high-availability Kubernetes clusters (EKS), and set up zero-trust GitOps pipelines with ArgoCD.",
      whatYouLearn: [
        "Write declarative multi-region cloud infrastructure using Terraform",
        "Deploy and scale resilient Kubernetes pods, deployments, services, and ingresses",
        "Implement GitOps pipelines using GitHub Actions and ArgoCD",
        "Set up full observability using Prometheus, Grafana, and OpenTelemetry",
        "Secure workloads with secrets management (HashiCorp Vault) and IAM policies"
      ],
      requirements: [
        "Working knowledge of Linux CLI and basic networking concepts",
        "Free tier AWS account",
        "Docker installed locally"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Infrastructure as Code with Terraform",
          lessons: [
            { id: "c4-l1", title: "1.1 Terraform State, Providers, and Multi-Environment Workspaces", duration: "26:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c4-l2", title: "1.2 Provisioning AWS VPC, Subnets, and Security Groups", duration: "33:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: Kubernetes Mastery",
          lessons: [
            { id: "c4-l3", title: "2.1 Kubernetes Architecture, Control Plane & Pod Scheduling", duration: "30:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { id: "c4-l4", title: "2.2 Helm Charts & GitOps Deployment with ArgoCD", duration: "28:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "Which Kubernetes object provides HTTP/HTTPS routing to services within the cluster?",
          options: ["ConfigMap", "Ingress", "DaemonSet", "PersistentVolume"],
          correct: 1
        },
        {
          question: "What is the primary function of a Terraform state lock?",
          options: ["Encrypts credentials in memory", "Prevents concurrent executions from corrupting infrastructure state", "Restricts access to root user only", "Speeds up EC2 provisioning"],
          correct: 1
        }
      ]
    },
    {
      id: "c5",
      title: "Ethical Hacking & Modern Defensive Cybersecurity",
      category: "cybersecurity",
      categoryName: "Cybersecurity",
      instructor: {
        name: "Vikram Malhotra",
        role: "Certified Red Teamer & OSCP",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        bio: "Senior Cybersecurity Consultant specializing in adversarial simulations, zero-day threat hunts, and cloud perimeter defense."
      },
      rating: 4.96,
      reviewCount: 890,
      studentsCount: 11200,
      duration: "34 hours",
      lessonsCount: 30,
      difficulty: "Intermediate",
      price: 84.99,
      originalPrice: 144.99,
      discount: "41% OFF",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      description: "Learn offensive tactics and defensive blueprints: web vulnerability assessments (OWASP Top 10), network exploitation with Metasploit, Wireshark packet analysis, and enterprise hardening.",
      whatYouLearn: [
        "Identify and exploit OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF, IDOR)",
        "Perform deep packet inspection and protocol analysis using Wireshark",
        "Conduct wireless auditing and active directory credential harvesting",
        "Implement modern defensive EDR solutions and SIEM log monitoring",
        "Write professional penetration testing compliance reports"
      ],
      requirements: [
        "Understanding of TCP/IP networking protocols (DNS, HTTP, TLS, ARP)",
        "Virtualization software (VirtualBox or VMware) to run Kali Linux",
        "Ethical mindset strictly adhering to legal penetration testing boundaries"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Reconnaissance & Network Analysis",
          lessons: [
            { id: "c5-l1", title: "1.1 Passive vs Active Reconnaissance & OSINT Frameworks", duration: "21:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c5-l2", title: "1.2 Nmap Scripting Engine (NSE) & Port Exploitation", duration: "25:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: Web Application Security",
          lessons: [
            { id: "c5-l3", title: "2.1 Blind SQL Injection & Burp Suite Repeater Workflows", duration: "32:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { id: "c5-l4", title: "2.2 Server-Side Request Forgery (SSRF) in Cloud Environments", duration: "27:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "What type of attack involves tricking a server into fetching a resource on behalf of an attacker?",
          options: ["SQL Injection", "Server-Side Request Forgery (SSRF)", "Cross-Site Scripting (XSS)", "Buffer Overflow"],
          correct: 1
        },
        {
          question: "Which tool is considered the industry standard for intercepting and inspecting HTTP/HTTPS traffic between client and server?",
          options: ["Nmap", "Burp Suite", "John the Ripper", "Hydra"],
          correct: 1
        }
      ]
    },
    {
      id: "c6",
      title: "Cross-Platform Mobile Apps with Flutter 3 & Clean Architecture",
      category: "mobile-dev",
      categoryName: "Mobile Development",
      instructor: {
        name: "Chloe Tremblay",
        role: "Senior Mobile Architect",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        bio: "Google Developer Expert in Flutter & Dart. Shipped 20+ top-grossing apps with 5M+ downloads."
      },
      rating: 4.87,
      reviewCount: 540,
      studentsCount: 7800,
      duration: "31 hours",
      lessonsCount: 28,
      difficulty: "Beginner",
      price: 74.99,
      originalPrice: 119.99,
      discount: "37% OFF",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
      description: "Build beautiful, silky smooth 60fps native apps for iOS and Android using Flutter 3, Dart, BLoC pattern, offline caching with Hive, and Firebase push notifications.",
      whatYouLearn: [
        "Master Dart object-oriented paradigms, mixins, streams, and async isolates",
        "Implement production state management with BLoC and Riverpod",
        "Create fluid 60 FPS custom animations and hero transitions",
        "Implement offline-first databases using Hive and Supabase synchronization",
        "Publish apps to Apple App Store and Google Play Store"
      ],
      requirements: [
        "Basic programming fundamentals in any language (JavaScript, Python, C++, etc.)",
        "Mac or PC with 8GB+ RAM",
        "No prior mobile development experience necessary"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Flutter Fundamentals & Widget Tree",
          lessons: [
            { id: "c6-l1", title: "1.1 Widget Tree, BuildContext & RenderObjects", duration: "20:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c6-l2", title: "1.2 Responsive Layouts with LayoutBuilder and MediaQuery", duration: "24:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: Clean Architecture & BLoC",
          lessons: [
            { id: "c6-l3", title: "2.1 Separation of Concerns: Domain, Data, and Presentation Layers", duration: "30:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "What rendering engine does Flutter traditionally use to draw directly to the canvas?",
          options: ["WebKit", "Impeller / Skia", "Gecko", "Blink"],
          correct: 1
        },
        {
          question: "What is the primary difference between a StatelessWidget and a StatefulWidget?",
          options: ["StatelessWidgets cannot use colors", "StatefulWidgets maintain mutable state that can trigger rebuilds via setState()", "StatelessWidgets only run on Android", "StatefulWidgets do not have build methods"],
          correct: 1
        }
      ]
    },
    {
      id: "c7",
      title: "Data Science & Predictive Analytics with Python & SQL",
      category: "data-science",
      categoryName: "Data Science",
      instructor: {
        name: "Dr. Jonathan Kim",
        role: "Head of Data Science",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        bio: "Quantitative researcher with PhD in Applied Statistics from MIT. Advised Fortune 100 enterprise data strategies."
      },
      rating: 4.91,
      reviewCount: 720,
      studentsCount: 10400,
      duration: "35 hours",
      lessonsCount: 30,
      difficulty: "Beginner",
      price: 79.99,
      originalPrice: 139.99,
      discount: "43% OFF",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      description: "From raw data wrangling to automated predictive pipelines: master Pandas, NumPy, Scikit-Learn, statistical hypothesis testing, interactive visualizations, and advanced SQL window functions.",
      whatYouLearn: [
        "Clean, transform, and analyze complex datasets with Pandas and NumPy",
        "Write advanced SQL queries with Window functions, CTEs, and partition clauses",
        "Build predictive machine learning models (Random Forests, XGBoost, Logistic Regression)",
        "Perform statistical hypothesis testing (A/B testing, ANOVA, p-values)",
        "Design executive business intelligence dashboards in Tableau and Streamlit"
      ],
      requirements: [
        "Basic high school math / algebra",
        "Any computer with a web browser to run Jupyter Notebooks",
        "Curiosity for uncovering stories hidden inside numbers"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Exploratory Data Analysis & Manipulation",
          lessons: [
            { id: "c7-l1", title: "1.1 Vectorized Computations with NumPy & Pandas Indexing", duration: "23:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c7-l2", title: "1.2 Handling Missing Values, Outliers & Feature Engineering", duration: "27:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        },
        {
          moduleTitle: "Module 2: Machine Learning Modeling with Scikit-Learn",
          lessons: [
            { id: "c7-l3", title: "2.1 Cross-Validation, Hyperparameter Tuning & ROC-AUC Curves", duration: "34:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "Which metric is best suited for evaluating a classification model with highly imbalanced classes?",
          options: ["Accuracy", "Precision-Recall AUC / F1-Score", "Mean Squared Error", "R-Squared"],
          correct: 1
        }
      ]
    },
    {
      id: "c8",
      title: "Executive Product Strategy & SaaS Growth Leadership",
      category: "business",
      categoryName: "Business & Management",
      instructor: {
        name: "Claire Montrose",
        role: "Venture Partner & Ex-VP Product",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
        bio: "Scaled product teams from seed to $100M ARR. Advisor to top Y Combinator and Sequoia startups."
      },
      rating: 4.85,
      reviewCount: 420,
      studentsCount: 6300,
      duration: "20 hours",
      lessonsCount: 18,
      difficulty: "Intermediate",
      price: 59.99,
      originalPrice: 99.99,
      discount: "40% OFF",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      description: "Master product-led growth (PLG), customer discovery frameworks, unit economics (LTV/CAC, cohort churn), PRDs, and cross-functional team leadership for ambitious tech leaders.",
      whatYouLearn: [
        "Formulate data-backed product roadmaps that align stakeholders and engineers",
        "Calculate and optimize SaaS metrics: CAC, LTV, NDR, Gross Margin, and Churn",
        "Design frictionless viral onboarding funnels for Product-Led Growth",
        "Run user interviews that uncover high-intent latent customer willingness to pay",
        "Pitch venture capital firms and present executive board decks"
      ],
      requirements: [
        "Interest in technology business models, startups, or product management",
        "No technical coding background required"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Product Strategy & Market Sizing",
          lessons: [
            { id: "c8-l1", title: "1.1 The Product Market Fit Engine & Opportunity Scoring", duration: "19:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "c8-l2", title: "1.2 SaaS Unit Economics: Breaking Down LTV to CAC Ratios", duration: "25:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
          ]
        }
      ],
      quiz: [
        {
          question: "What is considered a healthy benchmark for Net Dollar Retention (NDR) in high-growth enterprise SaaS?",
          options: ["Under 80%", "90% - 95%", "115% - 130%+", "Exactly 100%"],
          correct: 2
        }
      ]
    }
  ],

  stats: {
    activeLearners: "52,400+",
    totalCourses: "500+",
    expertInstructors: "150+",
    satisfactionRate: "98.4%",
    completionRate: "89.2%",
    hiringPartners: "350+"
  },

  testimonials: [
    {
      id: "t1",
      name: "Marcus Vance",
      role: "Staff Software Engineer at Meta",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      content: "Learnova completely reshaped how I think about distributed systems. The depth of instruction, real-world microservices exercises, and architectural rigor are unrivaled.",
      rating: 5,
      course: "Full-Stack Web Architect"
    },
    {
      id: "t2",
      name: "Aaliyah Patel",
      role: "Lead Product Designer at Canva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      content: "The UI/UX design systems course was phenomenal. I immediately deployed the token architecture to our production design system with 80+ team members.",
      rating: 5,
      course: "UI/UX Design Systems Masterclass"
    },
    {
      id: "t3",
      name: "Daniel Zhang",
      role: "Machine Learning Engineer at OpenAI",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
      content: "Dr. Elena's LLM course explains self-attention better than any academic paper I have read. Built my first production RAG pipeline within three days.",
      rating: 5,
      course: "Generative AI & LLM Systems"
    }
  ],

  instructors: [
    {
      id: "inst-1",
      name: "Dr. Alexander Vance",
      role: "Distributed Systems & Full-Stack Architect",
      company: "Ex-Google Principal Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      coursesCount: 8,
      studentsCount: 42000,
      rating: 4.9,
      bio: "14+ years architecting web platforms handling 100M+ monthly users. Author of 'Modern Web Systems'."
    },
    {
      id: "inst-2",
      name: "Dr. Elena Rostova",
      role: "Deep Learning & Transformer Researcher",
      company: "AI Fellow & Former DeepMind",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      coursesCount: 6,
      studentsCount: 31500,
      rating: 4.95,
      bio: "Specialist in attention mechanisms, parameter-efficient fine tuning (PEFT), and scalable neural networks."
    },
    {
      id: "inst-3",
      name: "Sophia Chen",
      role: "Design Systems & Product Design Director",
      company: "Design Director at StudioNeo",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      coursesCount: 5,
      studentsCount: 28400,
      rating: 4.88,
      bio: "Crafting beautiful, accessible digital design languages for the world's most recognizable software brands."
    },
    {
      id: "inst-4",
      name: "Marcus Aurelius Reed",
      role: "Chief Cloud & DevOps Infrastructure Architect",
      company: "Kubernetes Certified Trainer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      coursesCount: 7,
      studentsCount: 22100,
      rating: 4.92,
      bio: "Passionate about zero-downtime deployments, GitOps workflows, and resilient multi-region cloud infrastructures."
    }
  ],

  faqs: [
    {
      question: "How long do I retain access to purchased courses?",
      answer: "You receive permanent, lifetime access to all purchased courses, including all future updates, downloadable project source code files, and supplementary resource packs."
    },
    {
      question: "Are Learnova certificates accredited and verifiable?",
      answer: "Yes. Every certificate comes with an immutable, cryptographically verifiable Certificate ID and QR verification link that can be verified by employers or shared directly on LinkedIn."
    },
    {
      question: "Can I download course videos for offline viewing?",
      answer: "Yes, our mobile apps and desktop progressive web application allow full lesson caching for offline viewing on flights or low-bandwidth environments."
    },
    {
      question: "What is your refund policy if a course isn't right for me?",
      answer: "We offer a 30-day, no-questions-asked money-back guarantee on all individual course purchases. If you're not satisfied, simply submit a one-click refund from your billing dashboard."
    },
    {
      question: "Can organizations purchase team licenses for their engineering staff?",
      answer: "Absolutely. Our Learnova Enterprise tier offers centralized billing, SSO integration, team skill-gap analytics, custom learning paths, and dedicated customer success managers."
    }
  ],

  initialNotifications: [
    {
      id: "n1",
      title: "Welcome to Learnova!",
      message: "Your learning journey begins today. Explore 500+ masterclasses curated by world-class engineers.",
      time: "10m ago",
      read: false,
      icon: "zap"
    },
    {
      id: "n2",
      title: "New Module Released",
      message: "Dr. Elena Rostova just released 'Fine-Tuning Llama 3 with QLoRA' in the Generative AI course.",
      time: "2h ago",
      read: false,
      icon: "video"
    },
    {
      id: "n3",
      title: "Certificate Available",
      message: "Complete your remaining quiz in Full-Stack Web Architect to unlock your verified credential.",
      time: "1d ago",
      read: true,
      icon: "award"
    }
  ],

  initialConversations: [
    {
      id: "conv-1",
      participant: "Dr. Alexander Vance",
      role: "Instructor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      lastMessage: "Great implementation on your React 19 memoization assignment! Keep up the momentum.",
      lastTime: "14:20",
      unread: 1,
      messages: [
        { sender: "them", text: "Hello! Did you have any questions regarding Module 1's architecture assignment?", time: "14:15" },
        { sender: "me", text: "Hi Dr. Vance! I submitted the custom hooks with TypeScript yesterday. Loved the challenge!", time: "14:18" },
        { sender: "them", text: "Great implementation on your React 19 memoization assignment! Keep up the momentum.", time: "14:20" }
      ]
    },
    {
      id: "conv-2",
      participant: "Dr. Elena Rostova",
      role: "Instructor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      lastMessage: "Check out the vector database notebook attached in lesson 2.4.",
      lastTime: "Yesterday",
      unread: 0,
      messages: [
        { sender: "them", text: "Welcome to Generative AI Systems! Make sure to set up your Google Colab or local CUDA GPU.", time: "Yesterday 09:00" },
        { sender: "me", text: "All configured on an RTX 4090. Excited for the RAG lessons!", time: "Yesterday 09:45" },
        { sender: "them", text: "Check out the vector database notebook attached in lesson 2.4.", time: "Yesterday 11:20" }
      ]
    },
    {
      id: "conv-3",
      participant: "Learnova Support Desk",
      role: "Platform Support",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      lastMessage: "Your Pro membership receipt has been processed.",
      lastTime: "3d ago",
      unread: 0,
      messages: [
        { sender: "them", text: "Your Pro membership receipt has been processed. Thank you for being a valued learner!", time: "3 days ago" }
      ]
    }
  ],

  initialAdminUsers: [
    { id: "u1", name: "Alex Mercer", email: "alex.mercer@techcorp.io", role: "Student", status: "Active", enrolled: 4, joined: "Aug 12, 2025" },
    { id: "u2", name: "Dr. Alexander Vance", email: "vance.a@learnova.edu", role: "Instructor", status: "Active", enrolled: 0, joined: "Jan 10, 2025" },
    { id: "u3", name: "Elena Rostova", email: "elena.rostova@ai.org", role: "Instructor", status: "Active", enrolled: 0, joined: "Feb 18, 2025" },
    { id: "u4", name: "Samantha Miller", email: "s.miller@designhub.com", role: "Student", status: "Active", enrolled: 2, joined: "Sep 01, 2025" },
    { id: "u5", name: "David Kross", email: "dkross@securitylab.net", role: "Student", status: "Suspended", enrolled: 1, joined: "Jul 22, 2025" }
  ]
};
