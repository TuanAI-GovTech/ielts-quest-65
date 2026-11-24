// IELTS Quest 6.5 - Master Data Repository (v4.0)
const IELTS_DATA = {
  roadmap: [
    {
      id: "stage-1",
      title: "Chặng 1: Nền tảng Từ vựng & Ngữ pháp 6.0",
      description: "Làm chủ 200+ từ vựng học thuật cốt lõi (AWL), cấu trúc câu ghép/phức và liên từ logic.",
      icon: "🎯",
      requiredXp: 0,
      quests: [
        { id: "q-vocab-env", title: "Lexical Quest: Environment & Climate", type: "vocab", xp: 100, topic: "Environment" },
        { id: "q-vocab-tech", title: "Lexical Quest: Technology & AI", type: "vocab", xp: 100, topic: "Technology" },
        { id: "q-gram-complex", title: "Grammar Armor: Complex & Conditional Sentences", type: "grammar", xp: 150 },
        { id: "q-gram-cohesion", title: "Linking Logic: Cohesion & Coherence Connectors", type: "grammar", xp: 150 }
      ]
    },
    {
      id: "stage-2",
      title: "Chặng 2: Đột phá Listening & Reading (Mục tiêu 27-29/40)",
      description: "Luyện phản xạ bẫy từ đồng nghĩa (paraphrasing), True/False/Not Given và bắt keyword tốc độ cao.",
      icon: "⚡",
      requiredXp: 500,
      quests: [
        { id: "q-listen-p1", title: "Listening Sprint: Section 1 Form Completion", type: "listening", xp: 200 },
        { id: "q-listen-p3", title: "Listening Mastery: Section 3 Academic Discussion", type: "listening", xp: 250 },
        { id: "q-read-tfng", title: "Reading Arena: True / False / Not Given Masterclass", type: "reading", xp: 250 },
        { id: "q-read-heading", title: "Reading Arena: Matching Headings Strategy", type: "reading", xp: 250 }
      ]
    },
    {
      id: "stage-3",
      title: "Chặng 3: Chiến thuật Writing Task 1 & Task 2 Đạt Chuẩn 6.5",
      description: "Áp dụng khung tư duy PEEL, mô tả xu hướng biểu đồ chuẩn xác và viết mở/kết bài thu hút.",
      icon: "✍️",
      requiredXp: 1400,
      quests: [
        { id: "q-write-t1", title: "Writing Studio: Task 1 Trend & Comparison Blueprints", type: "writing", xp: 300 },
        { id: "q-write-t2-agree", title: "Writing Studio: Task 2 Agree/Disagree Essay Strategy", type: "writing", xp: 350 },
        { id: "q-write-t2-prob", title: "Writing Studio: Task 2 Problem - Solution Framework", type: "writing", xp: 350 }
      ]
    },
    {
      id: "stage-4",
      title: "Chặng 4: Phòng thi Speaking Simulator & Mock Test Toàn Diện",
      description: "Luyện phát xạ trả lời Part 1 mượt mà, độc thoại Part 2 tự tin suốt 2 phút và phản biện Part 3.",
      icon: "🎙️",
      requiredXp: 2400,
      quests: [
        { id: "q-speak-p1", title: "Speaking Simulator: Part 1 Fluency & Idiomatic Language", type: "speaking", xp: 250 },
        { id: "q-speak-p2", title: "Speaking Simulator: Part 2 Cue Card 2-Minute Challenge", type: "speaking", xp: 350 },
        { id: "q-speak-p3", title: "Speaking Simulator: Part 3 Abstract Reasoning", type: "speaking", xp: 350 },
        { id: "q-mock-final", title: "Grand Championship: Full Mock Test Band 6.5", type: "mock", xp: 500 }
      ]
    }
  ],

  vocabulary: [
    {
      word: "Sustainable",
      ipa: "/səˈsteɪnəbl/",
      type: "adj",
      meaningVi: "Bền vững, thân thiện với môi trường lâu dài",
      topic: "Environment",
      collocations: ["sustainable development", "sustainable agriculture", "sustainable energy"],
      example: "Governments must invest in sustainable energy to mitigate the adverse effects of global warming.",
      band65Note: "Thay thế từ quen thuộc 'good for the environment' bằng 'environmentally sustainable' để nâng điểm Lexical Resource.",
      quiz: {
        question: "Choose the best collocation: 'Solar and wind are key sources of ______ energy.'",
        options: ["sustainable", "maintainable", "continual", "lasting"],
        answer: 0
      }
    },
    {
      word: "Deteriorate",
      ipa: "/dɪˈtɪəriəreɪt/",
      type: "verb",
      meaningVi: "Xuống cấp, xấu đi trầm trọng",
      topic: "Environment",
      collocations: ["deteriorating condition", "air quality deteriorates", "rapidly deteriorate"],
      example: "Air quality in major metropolises has deteriorated significantly due to uncontrolled vehicular emissions.",
      band65Note: "Dùng 'deteriorate' thay cho 'get worse' để câu văn mang tính học thuật cao hơn.",
      quiz: {
        question: "Which word means 'to become progressively worse'?",
        options: ["Enhance", "Deteriorate", "Fluctuate", "Diminish"],
        answer: 1
      }
    },
    {
      word: "Ubiquitous",
      ipa: "/juːˈbɪkwɪtəs/",
      type: "adj",
      meaningVi: "Phổ biến khắp nơi, có mặt ở mọi chỗ",
      topic: "Technology",
      collocations: ["ubiquitous presence", "become ubiquitous", "ubiquitous computing"],
      example: "Smartphones have become ubiquitous in modern society, altering how individuals interact and acquire information.",
      band65Note: "Thay thế cụm 'popular everywhere' bằng 'increasingly ubiquitous'.",
      quiz: {
        question: "Fill in the blank: 'Artificial intelligence is becoming ______ in everyday consumer electronics.'",
        options: ["ubiquitous", "universalist", "scattered", "ordinary"],
        answer: 0
      }
    },
    {
      word: "Automate",
      ipa: "/ˈɔːtəmeɪt/",
      type: "verb",
      meaningVi: "Tự động hóa",
      topic: "Technology",
      collocations: ["automate routine tasks", "highly automated", "automation process"],
      example: "Many manufacturing plants automate tedious tasks, which substantially bolsters productivity.",
      band65Note: "Danh từ 'automation' và tính từ 'automated' xuất hiện liên tục trong Writing Task 2 chủ đề Công nghệ & Việc làm.",
      quiz: {
        question: "What is the noun form of 'automate' frequently tested in IELTS?",
        options: ["Automating", "Automation", "Automator", "Automatism"],
        answer: 1
      }
    },
    {
      word: "Curriculum",
      ipa: "/kəˈrɪkjələm/",
      type: "noun",
      meaningVi: "Chương trình giảng dạy",
      topic: "Education",
      collocations: ["core curriculum", "curriculum reform", "extracurricular activities"],
      example: "Schools should integrate financial literacy into the standard academic curriculum.",
      band65Note: "Số nhiều là 'curricula' hoặc 'curriculums'. Đi cùng tính từ 'rigorous', 'well-rounded'.",
      quiz: {
        question: "Complete the phrase: 'Sports and music clubs are prominent examples of ______ activities.'",
        options: ["intracurricular", "extracurricular", "overcurricular", "noncurricular"],
        answer: 1
      }
    },
    {
      word: "Sedentary",
      ipa: "/ˈsedntri/",
      type: "adj",
      meaningVi: "Ít vận động, ngồi nhiều một chỗ",
      topic: "Health",
      collocations: ["sedentary lifestyle", "sedentary habits", "sedentary job"],
      example: "Adopting a sedentary lifestyle is directly correlated with higher risks of cardiovascular diseases.",
      band65Note: "Từ vựng 'vàng' cho chủ đề Health & Modern Life trong Speaking và Writing.",
      quiz: {
        question: "What is the opposite of a 'sedentary lifestyle'?",
        options: ["An active lifestyle", "A lazy lifestyle", "A healthy lifestyle", "A passive lifestyle"],
        answer: 0
      }
    },
    {
      word: "Subsidize",
      ipa: "/ˈsʌbsɪdaɪz/",
      type: "verb",
      meaningVi: "Trợ cấp, hỗ trợ tài chính từ chính phủ/tổ chức",
      topic: "Society",
      collocations: ["heavily subsidized", "government subsidies", "subsidize public transport"],
      example: "The government should subsidize public transport fares to encourage commuters to leave their private cars at home.",
      band65Note: "Dùng thường xuyên khi bàn về giải pháp của chính phủ (Government action).",
      quiz: {
        question: "To subsidize public transit means to:",
        options: ["Ban it", "Fund or discount it with public money", "Privatize it", "Tax it heavily"],
        answer: 1
      }
    },
    {
      word: "Discrepancy",
      ipa: "/dɪˈskrepənsi/",
      type: "noun",
      meaningVi: "Sự khác biệt, sự chênh lệch (đặc biệt giữa số liệu)",
      topic: "Society",
      collocations: ["huge discrepancy", "income discrepancy", "noticeable discrepancy"],
      example: "There remains a profound discrepancy between rural and urban educational resources.",
      band65Note: "Từ vựng ăn điểm cho cả Writing Task 1 (so sánh biểu đồ) và Task 2.",
      quiz: {
        question: "Which word is closest in meaning to 'discrepancy'?",
        options: ["Agreement", "Disparity", "Similarity", "Symmetry"],
        answer: 1
      }
    }
  ],

  grammarChallenges: [
    {
      id: "gram-1",
      title: "Cấu trúc Câu phức (Complex Sentences with Subordinate Clauses)",
      description: "Tiêu chí Grammatical Range & Accuracy ở Band 6.5 yêu cầu bạn phải kết hợp nhuần nhuyễn mệnh đề phụ thuộc (Although, While, Whereas, Because) thay vì chỉ dùng câu đơn.",
      formula: "Although + Clause 1, Clause 2 (KHÔNG có 'but' ở giữa).",
      question: "Chọn câu viết lại đúng ngữ pháp học thuật IELTS 6.5:",
      original: "Private cars are convenient. They cause traffic congestion and pollution.",
      options: [
        "Although private cars are convenient, but they cause severe congestion.",
        "While private vehicles offer convenience, they inevitably contribute to traffic congestion and environmental degradation.",
        "Private cars are convenient, however they contribute traffic congestion.",
        "Despite private cars are convenient, they cause traffic problems."
      ],
      answer: 1,
      explanation: "Lựa chọn B sử dụng cấu trúc 'While + Clause 1, Clause 2' cùng từ vựng nâng cấp (private vehicles, environmental degradation) đạt chuẩn Band 6.5+."
    },
    {
      id: "gram-2",
      title: "Mệnh đề quan hệ rút gọn (Reduced Relative Clauses)",
      description: "Giúp bài viết học thuật ngắn gọn, mượt mà và súc tích hơn.",
      formula: "Chủ động -> V-ing | Bị động -> V3/ed",
      question: "Rút gọn câu sau: 'Students who graduate with practical skills easily find employment.'",
      options: [
        "Students graduating with practical skills easily secure employment.",
        "Students graduated with practical skills easily secure employment.",
        "Students to graduate with practical skills easily secure employment.",
        "Students are graduating with practical skills easily secure employment."
      ],
      answer: 0,
      explanation: "Động từ 'graduate' ở thể chủ động nên được rút gọn thành 'graduating'."
    },
    {
      id: "gram-3",
      title: "Đảo ngữ câu điều kiện loại 2 & 3 (Inversion Conditionals)",
      description: "Cấu trúc nâng cao giúp gây ấn tượng mạnh với giám khảo chấm Writing Task 2.",
      formula: "Were + S + to-V... / Had + S + V3/ed...",
      question: "Câu nào dưới đây là đảo ngữ chính xác của 'If governments implemented strict regulations, pollution would decrease'?",
      options: [
        "Were governments to implement strict regulations, pollution would decrease.",
        "Did governments implement strict regulations, pollution would decrease.",
        "Had governments implemented strict regulations, pollution would decrease.",
        "Should governments implement strict regulations, pollution will decrease."
      ],
      answer: 0,
      explanation: "'Were + S + to-V' là dạng đảo ngữ chuẩn của câu điều kiện loại 2 giả định hiện tại/tương lai."
    }
  ],

  listeningSets: [
    {
      id: "lis-1",
      title: "IELTS Listening Section 1: International Student Housing Registration",
      audioScript: "Good morning, Accommodation Office, how can I help you? - Hello, I am calling to register for the university hall of residence for next semester. My name is Alex Henderson. That is H-E-N-D-E-R-S-O-N. - Thank you Alex. What degree program are you enrolled in? - I am taking a Master of Environmental Science. - And what is your student ID number? - It is ES-9482. - Excellent. Do you have any dietary or room preferences? - Yes, I require a single en-suite room, and I am vegetarian, so I prefer a shared kitchen with non-smoking flatmates. - Great, the total weekly deposit is 185 pounds including utility bills. Can you pay that by next Friday? - Yes, certainly.",
      questions: [
        {
          q: "1. What is the caller's full family name?",
          options: ["Hendrickson", "Henderson", "Hendersen", "Handerson"],
          answer: 1,
          keyword: "H-E-N-D-E-R-S-O-N"
        },
        {
          q: "2. Which academic program is the student studying?",
          options: ["Bachelor of Biology", "Master of Business Administration", "Master of Environmental Science", "Diploma in Ecology"],
          answer: 2,
          keyword: "Master of Environmental Science"
        },
        {
          q: "3. What type of room does the student request?",
          options: ["Shared twin room", "Single en-suite room", "Studio apartment", "Family dormitory"],
          answer: 1,
          keyword: "single en-suite room"
        },
        {
          q: "4. What is the weekly cost (deposit) for the accommodation?",
          options: ["150 pounds", "175 pounds", "185 pounds", "195 pounds"],
          answer: 2,
          keyword: "185 pounds including utility bills"
        }
      ]
    }
  ],

  readingSets: [
    {
      id: "read-1",
      title: "The Rise of Smart Eco-Cities in the 21st Century",
      passage: `[Paragraph A] Rapid urbanization has exerted immense strain on municipal infrastructure, leading to traffic gridlock, air degradation, and unprecedented waste accumulation. In response, urban architects and environmental planners are championing the concept of 'Smart Eco-Cities'. These urban ecosystems leverage cutting-edge Internet of Things (IoT) sensors, automated renewable micro-grids, and circular water recycling systems to dramatically curtail human carbon footprint without sacrificing citizens' quality of life.

[Paragraph B] Songdo International Business District in South Korea and Masdar City in the UAE represent two pioneer experiments. In Songdo, pneumatic chutes suck trash directly from residential apartments through an underground network of pressurized tubes straight into sorting facilities. Consequently, garbage trucks are virtually absent from public streets, slashing diesel emissions by an estimated 35%. Meanwhile, buildings are equipped with automated HVAC systems that modulate temperature based on real-time ambient occupancy.

[Paragraph C] Nevertheless, critics argue that the capital expenditure required to engineer brand-new smart cities from scratch is economically prohibitive for developing nations, where the demographic influx into urban centers is actually most pronounced. Furthermore, scholars like Dr. Elena Rossi caution that centralized algorithm-driven governance poses serious privacy dilemmas regarding citizen surveillance and metadata exploitation. Therefore, rather than erecting utopian metropolises from the ground up, modernizing preexisting brownfield cities through targeted technological retrofitting may offer a more pragmatic and equitable trajectory.`,
      questions: [
        {
          type: "TFNG",
          q: "1. Smart Eco-Cities prioritize carbon reduction at the expense of residents' comfort and living standards.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 1,
          explanation: "Đoạn A ghi rõ: 'without sacrificing citizens' quality of life' -> Nghĩa là KHÔNG đánh đổi chất lượng sống -> Phát biểu là FALSE."
        },
        {
          type: "TFNG",
          q: "2. The waste management mechanism in Songdo has contributed to a reduction in vehicle exhaust emissions.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 0,
          explanation: "Đoạn B ghi: 'garbage trucks are virtually absent... slashing diesel emissions by an estimated 35%' -> TRUE."
        },
        {
          type: "TFNG",
          q: "3. Masdar City was cheaper to construct compared to Songdo.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 2,
          explanation: "Bài đọc chỉ nói cả Songdo và Masdar là 2 thử nghiệm tiên phong, không có dữ liệu so sánh chi phí giữa hai thành phố -> NOT GIVEN."
        },
        {
          type: "Heading",
          q: "4. Which heading best encapsulates Paragraph C?",
          options: [
            "Technological triumphs in waste separation",
            "Socio-economic hurdles and viable alternative approaches",
            "The architectural blueprints of utopian dwellings",
            "History of urban migration in developing continents"
          ],
          answer: 1,
          explanation: "Đoạn C bàn về chi phí đắt đỏ (prohibitive), vấn đề bảo mật (privacy) và giải pháp thay thế thực tế (targeted technological retrofitting)."
        }
      ]
    }
  ],

  writingSets: [
    {
      id: "write-t2-sample",
      type: "Task 2 - Opinion / Discussion",
      prompt: "Some people believe that university education should be completely free for all citizens, while others argue that students should bear the financial burden themselves. Discuss both views and give your own opinion.",
      band65Blueprint: {
        structure: [
          "Introduction (35-40 words): Paraphrase the prompt + Clear Thesis Statement stating your balanced stance.",
          "Body Paragraph 1 (85-95 words): Why university should receive public funding (Equal opportunities, skilled workforce driving national GDP).",
          "Body Paragraph 2 (85-95 words): Why individuals should contribute (Prevents fiscal deficit for government, ensures students take studies seriously).",
          "Conclusion (30-35 words): Restate your viewpoint with varied phrasing (Public-private co-financing or income-contingent loans)."
        ],
        lexicalUpgrades: [
          { basic: "free university", advanced: "state-funded higher education / tuition-free tertiary institutions" },
          { basic: "pay money", advanced: "shoulder financial obligations / incur tuition expenditures" },
          { basic: "good for the country", advanced: "fuel socioeconomic prosperity / foster a high-caliber workforce" }
        ],
        sampleBand65: `It is often debated whether higher education should be universally financed by the state or funded directly by prospective undergraduates. While unconditional government sponsorship promotes egalitarian access, I contend that a shared-cost framework constitutes a more sustainable and balanced approach.

On the one hand, advocates of tuition-free university education assert that tertiary schooling is a fundamental catalyst for social mobility. When tertiary institutions are subsidized by taxpayers, gifted individuals from underprivileged demographics are not hindered by exorbitant fee barriers. Consequently, this democratization of academic opportunities cultivates a highly qualified workforce, fostering technological breakthroughs and expanding national gross domestic product. Nordic countries such as Norway and Finland serve as compelling paradigms where publicly funded education correlates strongly with high living standards.

On the other hand, fully subsidizing higher education places a colossal strain on government budgets, potentially necessitating fiscal cutbacks in primary healthcare or municipal infrastructure. Moreover, when tertiary credentials are provided without personal investment, some undergraduates may lack academic diligence or opt for programs with minimal labor market relevance. Requiring students to shoulder a proportional percentage of their tuition—or utilizing income-contingent loan schemes—encourages accountability and ensures university faculties maintain competitive pedagogical quality.

In conclusion, although state subsidies are indispensable to ensure no talented scholar is left behind, completely abolishing tuition is fiscally precarious. A hybrid system combining targeted scholarships with subsidized student loans provides the optimal equilibrium between equity and financial viability.`
      }
    }
  ],

  speakingSets: [
    {
      part: "Part 2 - Cue Card",
      topic: "Describe a modern technological device that you find indispensable in your daily life.",
      pointsToCover: [
        "What the device is and when you acquired it",
        "How frequently you use it and for what specific purposes",
        "How it facilitates your study or work routines",
        "And explain why you would find it difficult to function without it."
      ],
      band65Vocabulary: [
        "indispensable (không thể thiếu)",
        "seamlessly integrated (tích hợp mượt mà)",
        "streamline workflow (tối ưu hóa quy trình làm việc)",
        "digital fatigue (sự mệt mỏi vì thiết bị kỹ thuật số)",
        "a double-edged sword (con dao hai lưỡi)"
      ],
      sampleResponse: `I would like to talk about my lightweight ultrabook laptop, which has become an absolutely indispensable companion throughout my academic and professional endeavors. I purchased it approximately two years ago right before embarking on my university degree.

In terms of usage, I rely on it almost continuously from dusk till dawn. Not only do I draft essays and conduct academic research, but I also utilize specialized data analysis software and attend virtual conferences. What sets this particular machine apart is its exceptional processing speed and multi-tasking capability, which seamlessly streamlines my workflow. 

Without this tool, completing rigorous deadlines would be virtually impossible, especially in today's increasingly digitized learning ecosystem. While I consciously take screen breaks to prevent digital fatigue, having immediate access to global resources makes this device an asset I simply cannot do without.`
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = IELTS_DATA;
}
