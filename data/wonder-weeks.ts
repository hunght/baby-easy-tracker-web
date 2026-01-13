// Wonder Weeks - Mental Leap Definitions

export interface WonderWeekLeap {
  number: number;
  weekStart: number; // Week from due date when fussy phase typically starts
  weekPeak: number; // Week when leap peaks
  weekEnd: number; // Week when sunny phase begins
  durationDays: { min: number; max: number };
  name: {
    en: string;
    vi: string;
  };
  world: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  symptoms: {
    en: string[];
    vi: string[];
  };
  newSkills: {
    en: string[];
    vi: string[];
  };
  sleepImpact: {
    en: string;
    vi: string;
  };
  tips: {
    en: string[];
    vi: string[];
  };
}

export const WONDER_WEEKS_LEAPS: WonderWeekLeap[] = [
  {
    number: 1,
    weekStart: 4.5,
    weekPeak: 5,
    weekEnd: 5.5,
    durationDays: { min: 1, max: 7 },
    name: {
      en: 'Changing Sensations',
      vi: 'Cảm Giác Thay Đổi',
    },
    world: {
      en: 'The World of Changing Sensations',
      vi: 'Thế Giới Cảm Giác Thay Đổi',
    },
    description: {
      en: 'Baby\'s senses sharpen dramatically. The world comes into focus for the first time.',
      vi: 'Các giác quan của bé trở nên sắc bén hơn. Thế giới lần đầu tiên trở nên rõ ràng.',
    },
    symptoms: {
      en: ['Witching hour crying (5-11 PM)', 'Cluster feeding', 'Difficulty settling', 'Startling easily'],
      vi: ['Khóc giờ phù thủy (5-11 tối)', 'Bú liên tục', 'Khó đưa vào giấc', 'Dễ giật mình'],
    },
    newSkills: {
      en: ['First social smile', 'Longer focus on faces', 'More regular breathing', 'Better head control'],
      vi: ['Nụ cười xã hội đầu tiên', 'Tập trung nhìn mặt lâu hơn', 'Hơi thở đều đặn hơn', 'Kiểm soát đầu tốt hơn'],
    },
    sleepImpact: {
      en: 'Difficulty settling, especially evening. May need more frequent feeds for comfort.',
      vi: 'Khó ngủ, đặc biệt buổi tối. Có thể cần bú nhiều hơn để an ủi.',
    },
    tips: {
      en: ['Extra skin-to-skin contact', 'White noise for comfort', 'Dim lights in evening', 'Patient, extra feeds'],
      vi: ['Tiếp xúc da kề da nhiều hơn', 'Tiếng ồn trắng để dỗ', 'Giảm ánh sáng buổi tối', 'Kiên nhẫn, cho bú thêm'],
    },
  },
  {
    number: 2,
    weekStart: 7.5,
    weekPeak: 8,
    weekEnd: 9,
    durationDays: { min: 7, max: 14 },
    name: {
      en: 'Patterns',
      vi: 'Các Mẫu Hình',
    },
    world: {
      en: 'The World of Patterns',
      vi: 'Thế Giới Các Mẫu Hình',
    },
    description: {
      en: 'Baby discovers structure in the world - patterns in sight, sound, and movement.',
      vi: 'Bé phát hiện cấu trúc trong thế giới - các mẫu hình trong tầm nhìn, âm thanh và chuyển động.',
    },
    symptoms: {
      en: ['Zoning out/staring', 'Fussy when interrupted', 'Wants to be held more', 'Short attention span'],
      vi: ['Đờ đẫn/nhìn chằm chằm', 'Quấy khi bị làm phiền', 'Muốn được ôm nhiều hơn', 'Khó tập trung'],
    },
    newSkills: {
      en: ['Hand-watching', 'First sounds (ah, eh)', 'Follows moving objects', 'Discovers feet'],
      vi: ['Ngắm tay', 'Âm thanh đầu tiên (ah, eh)', 'Theo dõi vật di chuyển', 'Phát hiện ra chân'],
    },
    sleepImpact: {
      en: 'May wake to "study" surroundings. Can be distracted during feeds.',
      vi: 'Có thể thức để "nghiên cứu" xung quanh. Có thể bị phân tâm khi bú.',
    },
    tips: {
      en: ['Provide visual stimulation', 'Let baby study hands/feet', 'Quiet feeding environment', 'High contrast toys'],
      vi: ['Cung cấp kích thích thị giác', 'Để bé nghiên cứu tay/chân', 'Môi trường bú yên tĩnh', 'Đồ chơi tương phản cao'],
    },
  },
  {
    number: 3,
    weekStart: 11.5,
    weekPeak: 12,
    weekEnd: 13,
    durationDays: { min: 7, max: 14 },
    name: {
      en: 'Smooth Transitions',
      vi: 'Chuyển Đổi Mượt Mà',
    },
    world: {
      en: 'The World of Smooth Transitions',
      vi: 'Thế Giới Chuyển Đổi Mượt Mà',
    },
    description: {
      en: 'Baby perceives fluid motion instead of static frames. Movements become smoother.',
      vi: 'Bé nhận thức chuyển động liên tục thay vì các khung hình tĩnh. Chuyển động trở nên mượt mà hơn.',
    },
    symptoms: {
      en: ['The "quiet" leap - may seem withdrawn', 'Less movement', 'Appetite changes', 'Needs more sleep'],
      vi: ['Bước nhảy "yên lặng" - có vẻ thu mình', 'Ít cử động hơn', 'Thay đổi khẩu vị', 'Cần ngủ nhiều hơn'],
    },
    newSkills: {
      en: ['Smooth eye tracking', 'Voice inflection', 'Squeals and coos', 'Enjoys movement games'],
      vi: ['Theo dõi mắt mượt mà', 'Ngữ điệu giọng', 'Reo và ọ ẹ', 'Thích trò chơi vận động'],
    },
    sleepImpact: {
      en: 'Often sleeps more during this leap. May have longer, deeper naps.',
      vi: 'Thường ngủ nhiều hơn trong giai đoạn này. Có thể có giấc ngủ dài và sâu hơn.',
    },
    tips: {
      en: ['Movement games (airplane)', 'Singing with voice changes', 'Rocking and swaying', 'Give extra rest time'],
      vi: ['Trò chơi vận động (máy bay)', 'Hát với thay đổi giọng', 'Đung đưa và lắc lư', 'Cho thời gian nghỉ thêm'],
    },
  },
  {
    number: 4,
    weekStart: 14.5,
    weekPeak: 19,
    weekEnd: 20,
    durationDays: { min: 28, max: 35 },
    name: {
      en: 'Events',
      vi: 'Các Sự Kiện',
    },
    world: {
      en: 'The World of Events',
      vi: 'Thế Giới Các Sự Kiện',
    },
    description: {
      en: 'Baby understands cause and effect. This is the 4-month sleep regression period.',
      vi: 'Bé hiểu nguyên nhân và kết quả. Đây là giai đoạn thoái lui giấc ngủ 4 tháng.',
    },
    symptoms: {
      en: ['4-month sleep regression', 'Hourly night wakings', 'Extreme clinginess', 'Distracted feeding'],
      vi: ['Thoái lui giấc ngủ 4 tháng', 'Thức dậy mỗi giờ ban đêm', 'Cực kỳ bám mẹ', 'Bú phân tán'],
    },
    newSkills: {
      en: ['Intentional reaching/grasping', 'Rolling over', 'Responds to name', 'Understands cause-effect'],
      vi: ['Với tay/cầm nắm có chủ đích', 'Lật người', 'Phản ứng với tên', 'Hiểu nguyên nhân-kết quả'],
    },
    sleepImpact: {
      en: 'Major sleep regression. Waking every 45-90 min. Sleep cycles permanently mature.',
      vi: 'Thoái lui giấc ngủ lớn. Thức dậy mỗi 45-90 phút. Chu kỳ giấc ngủ trưởng thành vĩnh viễn.',
    },
    tips: {
      en: ['Maintain consistent routine', 'Dark room for sleep', 'Avoid starting sleep props', 'Extra patience and comfort'],
      vi: ['Duy trì thói quen nhất quán', 'Phòng tối để ngủ', 'Tránh tạo thói quen ngủ phụ thuộc', 'Kiên nhẫn và an ủi thêm'],
    },
  },
  {
    number: 5,
    weekStart: 22.5,
    weekPeak: 26,
    weekEnd: 27,
    durationDays: { min: 21, max: 28 },
    name: {
      en: 'Relationships',
      vi: 'Các Mối Quan Hệ',
    },
    world: {
      en: 'The World of Relationships',
      vi: 'Thế Giới Các Mối Quan Hệ',
    },
    description: {
      en: 'Baby discovers distance and realizes they are separate from you. Separation anxiety begins.',
      vi: 'Bé phát hiện khoảng cách và nhận ra mình tách biệt với bạn. Lo âu chia ly bắt đầu.',
    },
    symptoms: {
      en: ['Separation anxiety begins', 'Stranger anxiety peaks', 'Panic when you leave sight', 'Very clingy'],
      vi: ['Lo âu chia ly bắt đầu', 'Lo âu với người lạ đạt đỉnh', 'Hoảng loạn khi mẹ đi khỏi tầm nhìn', 'Rất bám mẹ'],
    },
    newSkills: {
      en: ['Crawling begins', 'Understands in/on/under', 'Loves peek-a-boo', 'Drops things deliberately'],
      vi: ['Bắt đầu bò', 'Hiểu trong/trên/dưới', 'Thích ú òa', 'Cố ý thả đồ vật'],
    },
    sleepImpact: {
      en: 'Wakes and immediately checks for parent. May cry instantly on waking.',
      vi: 'Thức dậy và ngay lập tức kiểm tra ba mẹ. Có thể khóc ngay khi thức.',
    },
    tips: {
      en: ['Play peek-a-boo often', 'Practice short separations', 'Consistent goodbye routine', 'Safe space to practice crawling'],
      vi: ['Chơi ú òa thường xuyên', 'Tập chia ly ngắn', 'Thói quen tạm biệt nhất quán', 'Không gian an toàn để tập bò'],
    },
  },
  {
    number: 6,
    weekStart: 33.5,
    weekPeak: 37,
    weekEnd: 38,
    durationDays: { min: 21, max: 28 },
    name: {
      en: 'Categories',
      vi: 'Các Danh Mục',
    },
    world: {
      en: 'The World of Categories',
      vi: 'Thế Giới Các Danh Mục',
    },
    description: {
      en: 'Baby learns to categorize - all dogs are "dogs", not just your pet.',
      vi: 'Bé học cách phân loại - tất cả con chó đều là "chó", không chỉ thú cưng của bạn.',
    },
    symptoms: {
      en: ['Intense focus on tiny details', 'May show jealousy', 'Picky eating begins', 'Examines everything'],
      vi: ['Tập trung mãnh liệt vào chi tiết nhỏ', 'Có thể ghen tị', 'Bắt đầu kén ăn', 'Kiểm tra mọi thứ'],
    },
    newSkills: {
      en: ['Imitates gestures (wave, clap)', 'Understands words', 'Categorizes objects', 'Shows emotions clearly'],
      vi: ['Bắt chước cử chỉ (vẫy, vỗ tay)', 'Hiểu từ', 'Phân loại đồ vật', 'Thể hiện cảm xúc rõ ràng'],
    },
    sleepImpact: {
      en: 'May resist sleep to continue "categorizing" the world. Needs wind-down time.',
      vi: 'Có thể chống cự ngủ để tiếp tục "phân loại" thế giới. Cần thời gian thư giãn.',
    },
    tips: {
      en: ['Name objects consistently', 'Sort toys together', 'Read books with categories', 'Allow exploration time'],
      vi: ['Gọi tên đồ vật nhất quán', 'Phân loại đồ chơi cùng nhau', 'Đọc sách có phân loại', 'Cho phép thời gian khám phá'],
    },
  },
  {
    number: 7,
    weekStart: 41.5,
    weekPeak: 46,
    weekEnd: 48,
    durationDays: { min: 21, max: 35 },
    name: {
      en: 'Sequences',
      vi: 'Các Chuỗi',
    },
    world: {
      en: 'The World of Sequences',
      vi: 'Thế Giới Các Chuỗi',
    },
    description: {
      en: 'Baby understands that tasks have steps in order. Routines become very important.',
      vi: 'Bé hiểu rằng các nhiệm vụ có các bước theo thứ tự. Thói quen trở nên rất quan trọng.',
    },
    symptoms: {
      en: ['Resists diaper changes', 'Frustrated when can\'t complete tasks', 'Wants to do things themselves', 'Tantrums'],
      vi: ['Chống đối thay tã', 'Thất vọng khi không thể hoàn thành nhiệm vụ', 'Muốn tự làm', 'Ăn vạ'],
    },
    newSkills: {
      en: ['Points to communicate', 'Tries self-feeding', 'Helps with dressing', 'Follows simple routines'],
      vi: ['Chỉ trỏ để giao tiếp', 'Cố tự ăn', 'Giúp mặc quần áo', 'Theo dõi thói quen đơn giản'],
    },
    sleepImpact: {
      en: 'May stand in crib practicing motor skills. Very attached to bedtime routine.',
      vi: 'Có thể đứng trong cũi luyện tập kỹ năng vận động. Rất gắn bó với thói quen đi ngủ.',
    },
    tips: {
      en: ['Consistent bedtime routine', 'Let them "help"', 'Practice standing/walking safely', 'Be patient with meals'],
      vi: ['Thói quen đi ngủ nhất quán', 'Để bé "giúp"', 'Tập đứng/đi an toàn', 'Kiên nhẫn với bữa ăn'],
    },
  },
  {
    number: 8,
    weekStart: 51,
    weekPeak: 55,
    weekEnd: 57,
    durationDays: { min: 21, max: 28 },
    name: {
      en: 'Programs',
      vi: 'Các Chương Trình',
    },
    world: {
      en: 'The World of Programs',
      vi: 'Thế Giới Các Chương Trình',
    },
    description: {
      en: 'Baby learns that sequences can have choices - multiple ways to achieve the same goal.',
      vi: 'Bé học rằng các chuỗi có thể có sự lựa chọn - nhiều cách để đạt cùng một mục tiêu.',
    },
    symptoms: {
      en: ['Tests different approaches', 'Experiments constantly', 'Wants to participate in chores', 'Mood swings'],
      vi: ['Thử các cách tiếp cận khác nhau', 'Thử nghiệm liên tục', 'Muốn tham gia việc nhà', 'Thay đổi tâm trạng'],
    },
    newSkills: {
      en: ['Problem-solving', 'Variable testing', 'Helps with household tasks', 'More independent play'],
      vi: ['Giải quyết vấn đề', 'Thử nghiệm biến số', 'Giúp việc nhà', 'Chơi độc lập hơn'],
    },
    sleepImpact: {
      en: 'May test bedtime boundaries. Experiments with sleep resistance.',
      vi: 'Có thể thử thách ranh giới giờ ngủ. Thử nghiệm với việc chống cự ngủ.',
    },
    tips: {
      en: ['Give simple choices', 'Include in household tasks', 'Consistent boundaries', 'Safe space to experiment'],
      vi: ['Cho lựa chọn đơn giản', 'Cho tham gia việc nhà', 'Ranh giới nhất quán', 'Không gian an toàn để thử nghiệm'],
    },
  },
  {
    number: 9,
    weekStart: 59.5,
    weekPeak: 64,
    weekEnd: 66,
    durationDays: { min: 28, max: 35 },
    name: {
      en: 'Principles',
      vi: 'Các Nguyên Tắc',
    },
    world: {
      en: 'The World of Principles',
      vi: 'Thế Giới Các Nguyên Tắc',
    },
    description: {
      en: 'Toddler begins to understand rules, strategies, and planning ahead.',
      vi: 'Bé bắt đầu hiểu các quy tắc, chiến lược và lập kế hoạch trước.',
    },
    symptoms: {
      en: ['Tests boundaries deliberately', 'Uses "strategies" to get what they want', 'More sophisticated tantrums', 'Negotiating'],
      vi: ['Cố ý thử thách ranh giới', 'Dùng "chiến lược" để đạt được điều muốn', 'Ăn vạ tinh vi hơn', 'Thương lượng'],
    },
    newSkills: {
      en: ['Understands rules', 'Strategic thinking', 'Early manipulation', 'Concept of "careful"'],
      vi: ['Hiểu các quy tắc', 'Tư duy chiến lược', 'Thao túng sớm', 'Khái niệm "cẩn thận"'],
    },
    sleepImpact: {
      en: 'May use delaying tactics ("one more book"). Tests sleep rules.',
      vi: 'Có thể dùng chiến thuật trì hoãn ("đọc thêm một cuốn"). Thử thách quy tắc ngủ.',
    },
    tips: {
      en: ['Be consistent with rules', 'Clear, simple boundaries', 'Acknowledge their strategies', 'Stay calm during tantrums'],
      vi: ['Nhất quán với các quy tắc', 'Ranh giới rõ ràng, đơn giản', 'Công nhận chiến lược của bé', 'Bình tĩnh khi bé ăn vạ'],
    },
  },
  {
    number: 10,
    weekStart: 70.5,
    weekPeak: 75,
    weekEnd: 77,
    durationDays: { min: 28, max: 35 },
    name: {
      en: 'Systems',
      vi: 'Các Hệ Thống',
    },
    world: {
      en: 'The World of Systems',
      vi: 'Thế Giới Các Hệ Thống',
    },
    description: {
      en: 'Toddler sees themselves as an individual within larger systems like family.',
      vi: 'Bé nhìn thấy mình như một cá nhân trong các hệ thống lớn hơn như gia đình.',
    },
    symptoms: {
      en: ['Early "Terrible Twos"', 'Asserts independence', 'Strong preferences', 'Frustrated by limitations'],
      vi: ['Khủng hoảng tuổi lên 2 sớm', 'Khẳng định sự độc lập', 'Sở thích mạnh mẽ', 'Thất vọng vì giới hạn'],
    },
    newSkills: {
      en: ['Says "I" and "me"', 'Shows empathy', 'Imaginative play', 'Early conscience'],
      vi: ['Nói "Con" và "Của con"', 'Thể hiện sự đồng cảm', 'Chơi tưởng tượng', 'Lương tâm sớm'],
    },
    sleepImpact: {
      en: 'May have nightmares as imagination develops. Fears may emerge.',
      vi: 'Có thể có ác mộng khi trí tưởng tượng phát triển. Nỗi sợ có thể xuất hiện.',
    },
    tips: {
      en: ['Acknowledge feelings', 'Give controlled choices', 'Foster empathy', 'Imaginative play together'],
      vi: ['Công nhận cảm xúc', 'Cho lựa chọn có kiểm soát', 'Nuôi dưỡng sự đồng cảm', 'Chơi tưởng tượng cùng nhau'],
    },
  },
];

export interface LeapStatus {
  isInLeap: boolean;
  currentLeap: WonderWeekLeap | null;
  phase: 'before' | 'stormy' | 'sunny' | 'between';
  daysUntilNextLeap: number | null;
  nextLeap: WonderWeekLeap | null;
  weeksFromDueDate: number;
  progressPercent: number; // 0-100, how far through the fussy phase
}

/**
 * Calculate the current leap status based on weeks from due date
 */
export function getLeapStatus(weeksFromDueDate: number): LeapStatus {
  let currentLeap: WonderWeekLeap | null = null;
  let phase: 'before' | 'stormy' | 'sunny' | 'between' = 'between';
  let progressPercent = 0;
  let nextLeap: WonderWeekLeap | null = null;
  let daysUntilNextLeap: number | null = null;

  for (let i = 0; i < WONDER_WEEKS_LEAPS.length; i++) {
    const leap = WONDER_WEEKS_LEAPS[i];
    
    // Check if currently in this leap's fussy phase
    if (weeksFromDueDate >= leap.weekStart && weeksFromDueDate <= leap.weekEnd) {
      currentLeap = leap;
      
      if (weeksFromDueDate < leap.weekPeak) {
        // In the stormy phase (ramping up)
        phase = 'stormy';
        const totalStormyWeeks = leap.weekPeak - leap.weekStart;
        const weeksInStorm = weeksFromDueDate - leap.weekStart;
        progressPercent = (weeksInStorm / totalStormyWeeks) * 50; // 0-50%
      } else {
        // Past peak, in the sunny/integration phase
        phase = 'sunny';
        const totalSunnyWeeks = leap.weekEnd - leap.weekPeak;
        const weeksInSunny = weeksFromDueDate - leap.weekPeak;
        progressPercent = 50 + (weeksInSunny / totalSunnyWeeks) * 50; // 50-100%
      }
      
      // Set next leap
      if (i + 1 < WONDER_WEEKS_LEAPS.length) {
        nextLeap = WONDER_WEEKS_LEAPS[i + 1];
        daysUntilNextLeap = Math.round((nextLeap.weekStart - weeksFromDueDate) * 7);
      }
      break;
    }
    
    // Check if before first leap
    if (weeksFromDueDate < leap.weekStart) {
      phase = i === 0 ? 'before' : 'between';
      nextLeap = leap;
      daysUntilNextLeap = Math.round((leap.weekStart - weeksFromDueDate) * 7);
      break;
    }
  }

  // If no leap found, check if we're after the last leap
  if (!currentLeap && !nextLeap) {
    const lastLeap = WONDER_WEEKS_LEAPS[WONDER_WEEKS_LEAPS.length - 1];
    if (weeksFromDueDate > lastLeap.weekEnd) {
      phase = 'between';
      // All leaps completed
    }
  }

  return {
    isInLeap: currentLeap !== null,
    currentLeap,
    phase,
    daysUntilNextLeap: daysUntilNextLeap && daysUntilNextLeap > 0 ? daysUntilNextLeap : null,
    nextLeap: daysUntilNextLeap && daysUntilNextLeap > 0 ? nextLeap : null,
    weeksFromDueDate,
    progressPercent,
  };
}

/**
 * Calculate weeks from due date (birth date is used as approximation)
 * For more accurate results, parents should input due date if baby was premature/late
 */
export function calculateWeeksFromBirth(birthDate: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - birthDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays / 7;
}
