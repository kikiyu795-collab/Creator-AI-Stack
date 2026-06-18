export const LAST_UPDATED = '2026-06-18';

export interface ToolPick {
  id: string;
  name: string;
  role: string;
  note: string;
  isPaid: boolean;
  url: string;
}

export interface StackSection {
  scenario: string;
  icon: string;
  picks: ToolPick[];
}

export const STACK: StackSection[] = [
  {
    scenario: 'Scripting', icon: '✍️',
    picks: [
      { id: 'sc1', name: 'Claude Opus', role: '主力', note: '长脚本+项目管理+数据分析，记忆功能是杀手级优势。', isPaid: true, url: 'https://claude.ai/' },
      { id: 'sc2', name: 'Gemini 3 Pro', role: '长文案', note: '超长上下文窗口适合处理复杂的竞品分析文档。', isPaid: true, url: 'https://gemini.google.com/' },
      { id: 'sc3', name: 'DeepSeek', role: '备用', note: '中文理解力强，批量选题筛选性价比高。', isPaid: false, url: 'https://chat.deepseek.com/' },
      { id: 'sc4', name: 'ChatGPT', role: 'brainstorm', note: '起标题和hook的速度快。', isPaid: true, url: 'https://chat.openai.com/' },
    ]
  },
  {
    scenario: 'Image Generation', icon: '🎨',
    picks: [
      { id: 'ig1', name: 'GPT Image 2', role: '主力', note: '4格分镜叙事板+对话气泡，Tenora频道核心画面来源。', isPaid: true, url: 'https://openai.com/index/introducing-4o-image-generation/' },
      { id: 'ig2', name: 'Nanobanana2', role: '封面生成', note: '封面图+缩略图prompt专用，质感稳定。', isPaid: true, url: 'https://nanobanana.com/' },
      { id: 'ig3', name: '即梦 5.0', role: '中文场景', note: '中文提示词理解最好，4K直出。', isPaid: true, url: 'https://jimeng.jianying.com/' },
      { id: 'ig4', name: 'Midjourney', role: '艺术风格', note: '风格化需求时用，日常生产不够快。', isPaid: true, url: 'https://midjourney.com/' },
    ]
  },
  {
    scenario: 'Video Generation', icon: '🎬',
    picks: [
      { id: 'vg1', name: 'Kling 3 Omni', role: '主力', note: 'Motion Control抄动作+中文提示词，运动逻辑最自然。', isPaid: true, url: 'https://klingai.com/' },
      { id: 'vg2', name: 'Seedance 2.0', role: '快速出片', note: '≤120词prompt，速度快成本低。', isPaid: true, url: 'https://seedance.ai/' },
      { id: 'vg3', name: 'Google Veo', role: '高质量', note: '画质天花板但贵，重要内容才用。', isPaid: true, url: 'https://deepmind.google/technologies/veo/' },
      { id: 'vg4', name: 'CapCut Ken Burns', role: '静图转视频', note: 'GPT Image 2静态图+Ken Burns做伪视频，零成本。', isPaid: false, url: 'https://www.capcut.com/' },
    ]
  },
  {
    scenario: 'Voice & Audio', icon: '🎙️',
    picks: [
      { id: 'va1', name: 'ElevenLabs', role: '主力', note: '英语配音最自然，有员工账号积分。', isPaid: true, url: 'https://elevenlabs.io/' },
      { id: 'va2', name: 'Edge TTS', role: '免费备选', note: '零成本，质量够用于草稿和测试。', isPaid: false, url: 'https://github.com/rany2/edge-tts' },
    ]
  },
  {
    scenario: 'Editing', icon: '✂️',
    picks: [
      { id: 'ed1', name: 'CapCut', role: '主力', note: '文字覆盖+logo放置+字幕全在这里完成。', isPaid: false, url: 'https://www.capcut.com/' },
      { id: 'ed2', name: 'FFmpeg', role: '自动合成', note: 'CC脚本里用来批量合成视频+音频+字幕。', isPaid: false, url: 'https://ffmpeg.org/' },
    ]
  },
  {
    scenario: 'Research & Analysis', icon: '🔍',
    picks: [
      { id: 'ra1', name: 'Claude + Project Knowledge', role: '主力', note: '频道复盘+竞品分析+周报全靠项目知识库。', isPaid: true, url: 'https://claude.ai/' },
      { id: 'ra2', name: 'Google Trends', role: '选题验证', note: '关键词热度判断必须先于脚本生产。', isPaid: false, url: 'https://trends.google.com/' },
      { id: 'ra3', name: 'AIHOT', role: 'AI趋势', note: '168个AI信息源聚合，DeepSeek预过滤。', isPaid: false, url: 'https://aihot.app/' },
    ]
  },
  {
    scenario: 'Automation', icon: '⚡',
    picks: [
      { id: 'au1', name: 'Claude Code', role: '主力', note: '选题管道+视频合成+数据报告全部CC脚本化。', isPaid: true, url: 'https://claude.ai/code' },
      { id: 'au2', name: 'Higgsfield MCP', role: '视频API', note: '30+模型一个入口，CC直连生成视频。', isPaid: true, url: 'https://higgsfield.ai/' },
      { id: 'au3', name: 'Gemini Flash API', role: '批量筛选', note: '免费API每天1500次，选题打标和分类用。', isPaid: false, url: 'https://ai.google.dev/' },
    ]
  },
];

// ==================== 对标账号 ====================

export interface BenchmarkAccount {
  id: string;
  name: string;
  handle: string;
  platform: string;
  url: string;
  reason: string;
  tags: string[];
  channel?: string; // 对应公司频道
}

// --- 公司竞品对标 ---
export const COMPANY_BENCHMARKS: BenchmarkAccount[] = [
  // PoGoSkill 竞品
  { id: 'c-ipogo', name: 'iPogo HowToTechStudio', handle: '@HowToTechStudio', platform: 'YouTube', url: 'https://www.youtube.com/@HowToTechStudio', reason: '竞品产品官方，持续更新安装指南。', tags: ['Pokemon GO', '竞品'], channel: 'PoGoSkill' },
  { id: 'c-imyfone', name: 'iMyFone', handle: '@imyfone', platform: 'YouTube', url: 'https://www.youtube.com/@imyfone', reason: '工具类竞品频道。', tags: ['Pokemon GO', '竞品'], channel: 'PoGoSkill' },
  { id: 'c-magfone', name: 'Magfone', handle: '@magfone', platform: 'YouTube', url: 'https://www.youtube.com/@magfone', reason: '工具类竞品Shorts。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },
  { id: 'c-vicious', name: 'ViciousLabs', handle: '@Vicious_Labs', platform: 'YouTube', url: 'https://www.youtube.com/@Vicious_Labs', reason: 'PoGoSkill赛道5K-10K竞品。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },
  { id: 'c-pogoguide', name: 'PoGo Guide YT', handle: '@PoGoGuideYT', platform: 'YouTube', url: 'https://www.youtube.com/@PoGoGuideYT', reason: 'PoGoSkill赛道5K-15K竞品。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },
  { id: 'c-pogospoofer', name: 'pogo_spoofer', handle: '@pogo_spoofer', platform: 'TikTok', url: 'https://www.tiktok.com/@pogo_spoofer', reason: 'PoGoSkill竞品TikTok运营参考。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },

  // TSAI 竞品 (Bypass + AI工具)
  { id: 'c-answerai-yt', name: 'Answer AI', handle: '@answersai', platform: 'YouTube', url: 'https://www.youtube.com/@answersai', reason: '核心对标：AI persona剧情Shorts，100M+播放。', tags: ['AI persona', 'Shorts'], channel: 'TSAI' },
  { id: 'c-chalkie', name: 'Chalkie AI', handle: '@chalkieai', platform: 'YouTube', url: 'https://www.youtube.com/@chalkieai', reason: 'GPT Image 2虚拟人设方法论。', tags: ['GPT Image', 'persona'], channel: 'TSAI' },
  { id: 'c-corbin', name: 'Corbin Brown', handle: '@Corbin_Brown', platform: 'YouTube', url: 'https://www.youtube.com/@Corbin_Brown', reason: 'AI工具评测160K+竞品。', tags: ['AI tools', '竞品'], channel: 'TSAI' },
  { id: 'c-nateherk', name: 'Nate Herk', handle: '@NateHerk', platform: 'YouTube', url: 'https://www.youtube.com/@NateHerk', reason: 'AI工具评测600K+头部。', tags: ['AI tools'], channel: 'TSAI' },
  { id: 'c-filternote', name: 'Filternote', handle: '@Filternoteofficial', platform: 'YouTube', url: 'https://www.youtube.com/@Filternoteofficial', reason: 'Bypass竞品参考。', tags: ['bypass', '竞品'], channel: 'TSAI' },
  { id: 'c-twaingpt', name: 'BypassGPT/TwainGPT', handle: '@TwainGPT', platform: 'YouTube', url: 'https://www.youtube.com/@TwainGPT', reason: 'Bypass reviewer 5K-20K。', tags: ['bypass'], channel: 'TSAI' },
  { id: 'c-naturalwrite', name: 'natural write', handle: '@naturalwrite', platform: 'YouTube', url: 'https://www.youtube.com/@naturalwrite', reason: 'Bypass竞品。', tags: ['bypass', '竞品'], channel: 'TSAI' },
  { id: 'c-carterpcs', name: 'carterpcs', handle: '@carterpcs', platform: 'TikTok', url: 'https://www.tiktok.com/@carterpcs', reason: 'AI工具TikTok 100K+。', tags: ['AI tools'], channel: 'TSAI' },
  { id: 'c-areyouagodd', name: 'areyouagodd', handle: '@areyouagodd', platform: 'TikTok', url: 'https://www.tiktok.com/@areyouagodd', reason: 'Bypass TikTok竞品。', tags: ['bypass'], channel: 'TSAI' },

  // Diagrimo 竞品
  { id: 'c-napkinai', name: 'Napkin AI', handle: '@napkin_ai', platform: 'YouTube', url: 'https://www.youtube.com/@napkin_ai', reason: '直接竞品，月流量300万。', tags: ['competitor', 'diagram'], channel: 'Diagrimo' },
  { id: 'c-mirohq', name: 'MiroHQ', handle: '@MiroHQ', platform: 'YouTube', url: 'https://www.youtube.com/@MiroHQ', reason: 'diagram/whiteboard头部品牌。', tags: ['diagram'], channel: 'Diagrimo' },
  { id: 'c-gamma', name: 'Gamma', handle: '@meetgamma', platform: 'YouTube', url: 'https://www.youtube.com/@meetgamma', reason: 'AI presentation工具。', tags: ['presentation'], channel: 'Diagrimo' },
  { id: 'c-prezi', name: 'Prezi', handle: '@Prezi', platform: 'YouTube', url: 'https://www.youtube.com/@Prezi', reason: '演示文稿工具。', tags: ['presentation'], channel: 'Diagrimo' },
  { id: 'c-mermaid', name: 'MermaidChart', handle: '@MermaidChart', platform: 'YouTube', url: 'https://www.youtube.com/@MermaidChart', reason: '代码生成图表工具。', tags: ['diagram'], channel: 'Diagrimo' },
  { id: 'c-leila', name: 'Leila Gharani', handle: '@LeilaGharani', platform: 'YouTube', url: 'https://www.youtube.com/@LeilaGharani', reason: 'AI PPT赛道800K+。', tags: ['PPT', 'AI tools'], channel: 'Diagrimo' },

  // Tenora 竞品
  { id: 'c-angryprof-yt', name: 'My Angry Professor', handle: '@myangryprofessor', platform: 'YouTube', url: 'https://www.youtube.com/@myangryprofessor', reason: '冲突升级参考，教授场景情绪节奏。', tags: ['conflict', 'Shorts'], channel: 'Tenora' },
  { id: 'c-answerai-tk', name: 'Answer AI', handle: '@answersai.com', platform: 'TikTok', url: 'https://www.tiktok.com/@answersai.com', reason: 'Tenora核心对标，190K+粉丝。', tags: ['AI persona'], channel: 'Tenora' },
  { id: 'c-angryprof-tk', name: 'myangryprofessor', handle: '@myangryprofessor', platform: 'TikTok', url: 'https://www.tiktok.com/@myangryprofessor', reason: '44.9K粉丝，6.6M赞。', tags: ['conflict'], channel: 'Tenora' },
  { id: 'c-chalkie-tk', name: 'chalkie.teachers', handle: '@chalkie.teachers', platform: 'TikTok', url: 'https://www.tiktok.com/@chalkie.teachers', reason: 'IG 21K，教师人设。', tags: ['persona'], channel: 'Tenora' },
];

// --- 个人对标账号 ---
export const PERSONAL_BENCHMARKS: BenchmarkAccount[] = [
  // YouTube
  { id: 'p-kevin', name: 'Kevin Stratvert', handle: '@KevinStratvert', platform: 'YouTube', url: 'https://www.youtube.com/@KevinStratvert', reason: 'AI工具教程标杆，2M+订阅。小白学AI系列参考。', tags: ['tutorial', 'AI tools'] },
  { id: 'p-tinahuang', name: 'Tina Huang', handle: '@TinaHuang1', platform: 'YouTube', url: 'https://www.youtube.com/@TinaHuang1', reason: 'AI工具+日常vlog混合内容200K+。', tags: ['AI tools', 'vlog'] },
  { id: 'p-linus-yt', name: 'Linus Ekenstam', handle: '@LinusEkenstam', platform: 'YouTube', url: 'https://www.youtube.com/@LinusEkenstam', reason: 'AI创作工作流先锋。', tags: ['AI workflow'] },
  { id: 'p-karpathy-yt', name: 'Andrej Karpathy', handle: '@kaboratory', platform: 'YouTube', url: 'https://www.youtube.com/@kaboratory', reason: 'AI教育大师，深度内容参考。', tags: ['deep tech', 'education'] },

  // X / Twitter
  { id: 'p-linus-x', name: 'Linus Ekenstam', handle: '@LinusEkenstam', platform: 'X', url: 'https://x.com/LinusEkenstam', reason: 'AI创作工作流先锋。', tags: ['AI workflow'] },
  { id: 'p-rowan', name: 'Rowan Cheung', handle: '@rowancheung', platform: 'X', url: 'https://x.com/rowancheung', reason: 'The Rundown创始人，每日AI新闻最快。', tags: ['AI news'] },
  { id: 'p-karpathy-x', name: 'Andrej Karpathy', handle: '@karpathy', platform: 'X', url: 'https://x.com/karpathy', reason: 'AI教育大师。', tags: ['deep tech'] },
  { id: 'p-allie', name: 'Allie K. Miller', handle: '@alliekmiller', platform: 'X', url: 'https://x.com/alliekmiller', reason: 'AI商业化观点。', tags: ['AI business'] },
  { id: 'p-pete', name: 'Pete Huang', handle: '@petehuang', platform: 'X', url: 'https://x.com/petehuang', reason: 'AI产品动态。', tags: ['AI products'] },
  { id: 'p-zhangzhala-x', name: '张咋啦', handle: '@zarazhangrui', platform: 'X', url: 'https://x.com/zarazhangrui', reason: '跨平台创作者，出海参考。', tags: ['creator'] },

  // 小红书
  { id: 'p-zhangzhala-xhs', name: '张咋啦', handle: '@260679956', platform: '小红书', url: 'https://www.xiaohongshu.com/user/profile/260679956', reason: '跨平台创作者参考。', tags: ['creator'] },
  { id: 'p-shuzishengming', name: '数字生命卡兹克', handle: '@wzglyay2023', platform: '小红书', url: 'https://www.xiaohongshu.com/user/profile/wzglyay2023', reason: '6.7万粉，虚实传媒AI创作。', tags: ['AI workflow'] },
  { id: 'p-xiaohui', name: '晓辉博士', handle: '@783884436', platform: '小红书', url: 'https://www.xiaohongshu.com/user/profile/783884436', reason: '15.4万粉，清华博士/创业。', tags: ['startup'] },
  { id: 'p-waytoagi', name: '通往AGI之路', handle: '@5500303715', platform: '小红书', url: 'https://www.xiaohongshu.com/user/profile/5500303715', reason: 'WaytoAGI社区，2.2万粉。', tags: ['AGI'] },
  { id: 'p-jiangjie', name: '清华姜学长', handle: '@558572993', platform: '小红书', url: 'https://www.xiaohongshu.com/user/profile/558572993', reason: '17万粉，AIGC影视创业。', tags: ['AIGC'] },

  // Newsletter
  { id: 'p-rundown', name: 'The Rundown AI', handle: 'Newsletter', platform: 'Newsletter', url: 'https://www.therundown.ai/', reason: '每日AI快讯+教程，选题灵感来源。', tags: ['daily'] },
  { id: 'p-bensbites', name: "Ben's Bites", handle: 'Newsletter', platform: 'Newsletter', url: 'https://bensbites.com/', reason: 'AI产品发布日报。', tags: ['products'] },
];

// ==================== 选题预告 ====================

export interface UpcomingItem {
  id: string;
  title: string;
  channel: string;
  status: 'researching' | 'scripting' | 'producing' | 'scheduled';
  targetDate: string;
  tags: string[];
  scope: 'company' | 'personal';
}

export const UPCOMING: UpcomingItem[] = [
  // 公司选题
  { id: 'up1', title: 'GO Fest Global 2026 Location Guide', channel: 'PoGoSkill', status: 'scripting', targetDate: '2026-07', tags: ['event', 'Pokemon GO'], scope: 'company' },
  { id: 'up2', title: 'Mega Mewtwo X/Y Best Counters', channel: 'PoGoSkill', status: 'researching', targetDate: '2026-07', tags: ['raid'], scope: 'company' },
  { id: 'up3', title: 'AI Tool Review Series (Image Models)', channel: 'TSAI', status: 'researching', targetDate: '2026-07', tags: ['AI tools'], scope: 'company' },
  { id: 'up4', title: 'Classroom Drama Shorts Batch', channel: 'Tenora', status: 'producing', targetDate: '2026-06', tags: ['AI persona'], scope: 'company' },
  { id: 'up5', title: 'One-Click Chart Generation Demo', channel: 'Diagrimo', status: 'scripting', targetDate: '2026-07', tags: ['diagram'], scope: 'company' },

  // 个人选题
  { id: 'up-p1', title: '小白学AI系列：从零开始用Claude', channel: '个人频道', status: 'scripting', targetDate: '2026-07', tags: ['AI教程', '小白学AI'], scope: 'personal' },
  { id: 'up-p2', title: '小白学AI系列：AI做图完全入门', channel: '个人频道', status: 'researching', targetDate: '2026-07', tags: ['AI教程', '小白学AI'], scope: 'personal' },
  { id: 'up-p3', title: '小白学AI系列：用AI写脚本拍视频', channel: '个人频道', status: 'researching', targetDate: '2026-08', tags: ['AI教程', '小白学AI'], scope: 'personal' },
  { id: 'up-p4', title: '日常vlog：跳舞健身日记', channel: '个人频道', status: 'producing', targetDate: '2026-07', tags: ['vlog', '健身'], scope: 'personal' },
  { id: 'up-p5', title: '日常vlog：AI创作者的一天工作日常', channel: '个人频道', status: 'scripting', targetDate: '2026-07', tags: ['vlog', '工作日常'], scope: 'personal' },
];

export const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  researching: { label: '调研中', color: '#ff9500', bg: 'rgba(255, 149, 0, 0.1)' },
  scripting: { label: '撰写中', color: '#007aff', bg: 'rgba(0, 122, 255, 0.1)' },
  producing: { label: '制作中', color: '#34c759', bg: 'rgba(52, 199, 89, 0.1)' },
  scheduled: { label: '已排期', color: '#af52de', bg: 'rgba(175, 82, 222, 0.1)' },
};

export const PLATFORM_ICON: Record<string, string> = {
  YouTube: '▶', X: '𝕏', TikTok: '♪', Newsletter: '✉',
  '小红书': '📕', B站: 'B', Instagram: '◎',
};

export const CHANNEL_COLORS: Record<string, string> = {
  PoGoSkill: '#ff3b30',
  TSAI: '#007aff',
  Tenora: '#af52de',
  Diagrimo: '#34c759',
  '个人频道': '#ff9500',
};
