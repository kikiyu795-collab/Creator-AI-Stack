export const LAST_UPDATED = '2026-06-17';

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

export interface Source {
  id: string;
  name: string;
  handle: string;
  platform: string;
  reason: string;
  tags: string[];
  url?: string;
  channel?: string;
}

export const SOURCES: Source[] = [
  // YouTube — PoGoSkill 竞品
  { id: 'sy-ipogo', name: 'iPogo HowToTechStudio', handle: '@HowToTechStudio', platform: 'YouTube', reason: '竞品产品官方，持续更新安装指南。', tags: ['Pokemon GO', '竞品'], channel: 'PoGoSkill' },
  { id: 'sy-imyfone', name: 'iMyFone', handle: '@imyfone', platform: 'YouTube', reason: '工具类竞品频道。', tags: ['Pokemon GO', '竞品'], channel: 'PoGoSkill' },
  { id: 'sy-viciouslabs', name: 'ViciousLabs', handle: '@Vicious_Labs', platform: 'YouTube', reason: 'PoGoSkill赛道5K-10K竞品。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },
  { id: 'sy-pogoguide', name: 'PoGo Guide YT', handle: '@PoGoGuideYT', platform: 'YouTube', reason: 'PoGoSkill赛道5K-15K竞品。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },

  // YouTube — TSAI 竞品
  { id: 'sy-answerai', name: 'Answer AI', handle: '@answersai', platform: 'YouTube', reason: '核心对标：AI persona剧情Shorts，100M+播放。', tags: ['AI persona', 'Shorts'], channel: 'TSAI' },
  { id: 'sy-chalkie', name: 'Chalkie AI', handle: '@chalkieai', platform: 'YouTube', reason: 'GPT Image 2虚拟人设方法论。', tags: ['GPT Image', 'persona'], channel: 'TSAI' },
  { id: 'sy-corbin', name: 'Corbin Brown', handle: '@Corbin_Brown', platform: 'YouTube', reason: 'AI工具评测160K+竞品。', tags: ['AI tools', '竞品'], channel: 'TSAI' },
  { id: 'sy-nateherk', name: 'Nate Herk', handle: '@NateHerk', platform: 'YouTube', reason: 'AI工具评测600K+头部。', tags: ['AI tools'], channel: 'TSAI' },
  { id: 'sy-filternote', name: 'Filternote', handle: '@Filternoteofficial', platform: 'YouTube', reason: 'Bypass竞品参考。', tags: ['bypass', '竞品'], channel: 'TSAI' },
  { id: 'sy-twaingpt', name: 'BypassGPT/TwainGPT', handle: '@TwainGPT', platform: 'YouTube', reason: 'Bypass reviewer 5K-20K。', tags: ['bypass'], channel: 'TSAI' },
  { id: 'sy-naturalwrite', name: 'natural write', handle: '@naturalwrite', platform: 'YouTube', reason: 'Bypass竞品。', tags: ['bypass', '竞品'], channel: 'TSAI' },

  // YouTube — Diagrimo 竞品
  { id: 'sy-napkinai', name: 'Napkin AI', handle: '@napkin_ai', platform: 'YouTube', reason: '直接竞品，月流量300万。', tags: ['competitor', 'diagram'], channel: 'Diagrimo' },
  { id: 'sy-mirohq', name: 'MiroHQ', handle: '@MiroHQ', platform: 'YouTube', reason: 'diagram/whiteboard头部品牌。', tags: ['diagram'], channel: 'Diagrimo' },
  { id: 'sy-gamma', name: 'Gamma', handle: '@meetgamma', platform: 'YouTube', reason: 'AI presentation工具。', tags: ['presentation'], channel: 'Diagrimo' },
  { id: 'sy-mermaid', name: 'MermaidChart', handle: '@MermaidChart', platform: 'YouTube', reason: '代码生成图表工具。', tags: ['diagram'], channel: 'Diagrimo' },

  // YouTube — 学习/参考
  { id: 'sy-kevin', name: 'Kevin Stratvert', handle: '@KevinStratvert', platform: 'YouTube', reason: 'AI工具教程标杆，2M+订阅。', tags: ['tutorial', 'AI tools'] },
  { id: 'sy-leila', name: 'Leila Gharani', handle: '@LeilaGharani', platform: 'YouTube', reason: 'AI PPT赛道800K+。', tags: ['PPT', 'AI tools'], channel: 'Diagrimo' },
  { id: 'sy-tinahuang', name: 'Tina Huang', handle: '@TinaHuang1', platform: 'YouTube', reason: 'AI工具200K+。', tags: ['AI tools'] },
  { id: 'sy-angryprof', name: 'My Angry Professor', handle: '@myangryprofessor', platform: 'YouTube', reason: '冲突升级参考，教授场景情绪节奏。', tags: ['conflict', 'Shorts'], channel: 'Tenora' },

  // X / Twitter
  { id: 'sx-linus', name: 'Linus Ekenstam', handle: '@LinusEkenstam', platform: 'X', reason: 'AI创作工作流先锋。', tags: ['AI workflow'] },
  { id: 'sx-rowan', name: 'Rowan Cheung', handle: '@rowancheung', platform: 'X', reason: 'The Rundown创始人，每日AI新闻最快。', tags: ['AI news'] },
  { id: 'sx-karpathy', name: 'Andrej Karpathy', handle: '@karpathy', platform: 'X', reason: 'AI教育大师。', tags: ['deep tech'] },
  { id: 'sx-allie', name: 'Allie K. Miller', handle: '@alliekmiller', platform: 'X', reason: 'AI商业化观点。', tags: ['AI business'] },
  { id: 'sx-pete', name: 'Pete Huang', handle: '@petehuang', platform: 'X', reason: 'AI产品动态。', tags: ['AI products'] },

  // TikTok
  { id: 'st-pogospoofer', name: 'pogo_spoofer', handle: '@pogo_spoofer', platform: 'TikTok', reason: 'PoGoSkill竞品TikTok运营参考。', tags: ['Pokemon GO'], channel: 'PoGoSkill' },
  { id: 'st-answerai', name: 'Answer AI', handle: '@answersai.com', platform: 'TikTok', reason: 'Tenora核心对标，190K+粉丝。', tags: ['AI persona'], channel: 'Tenora' },
  { id: 'st-angryprof', name: 'myangryprofessor', handle: '@myangryprofessor', platform: 'TikTok', reason: '44.9K粉丝，6.6M赞。', tags: ['conflict'], channel: 'Tenora' },
  { id: 'st-carterpcs', name: 'carterpcs', handle: '@carterpcs', platform: 'TikTok', reason: 'AI工具100K+。', tags: ['AI tools'], channel: 'TSAI' },

  // 小红书
  { id: 'sxhs-zhangzhala', name: '张咋啦', handle: '@260679956', platform: '小红书', reason: '跨平台创作者参考。', tags: ['creator'] },
  { id: 'sxhs-shuzishengming', name: '数字生命卡兹克', handle: '@wzglyay2023', platform: '小红书', reason: '6.7万粉，虚实传媒AI创作。', tags: ['AI workflow'] },
  { id: 'sxhs-xiaohui', name: '晓辉博士', handle: '@783884436', platform: '小红书', reason: '15.4万粉，清华博士/创业。', tags: ['startup'] },
  { id: 'sxhs-waytoagi', name: '通往AGI之路', handle: '@5500303715', platform: '小红书', reason: 'WaytoAGI社区，2.2万粉。', tags: ['AGI'] },
  { id: 'sxhs-jiangjie', name: '清华姜学长', handle: '@558572993', platform: '小红书', reason: '17万粉，AIGC影视创业。', tags: ['AIGC'] },

  // Newsletter
  { id: 'sn-rundown', name: 'The Rundown AI', handle: 'Newsletter', platform: 'Newsletter', reason: '每日AI快讯+教程，选题灵感来源。', tags: ['daily'] },
  { id: 'sn-bensbites', name: "Ben's Bites", handle: 'Newsletter', platform: 'Newsletter', reason: 'AI产品发布日报。', tags: ['products'] },
];

export interface UpcomingItem {
  id: string;
  title: string;
  channel: string;
  status: 'researching' | 'scripting' | 'producing' | 'scheduled';
  targetDate: string;
  tags: string[];
}

export const UPCOMING: UpcomingItem[] = [
  { id: 'up1', title: 'GO Fest Global 2026 Location Guide', channel: 'PoGoSkill', status: 'scripting', targetDate: '2026-07', tags: ['event', 'Pokemon GO'] },
  { id: 'up2', title: 'Mega Mewtwo X/Y Best Counters', channel: 'PoGoSkill', status: 'researching', targetDate: '2026-07', tags: ['raid'] },
  { id: 'up3', title: 'AI Tool Review Series (Image Models)', channel: 'TSAI', status: 'researching', targetDate: '2026-07', tags: ['AI tools'] },
  { id: 'up4', title: 'Classroom Drama Shorts Batch', channel: 'Tenora', status: 'producing', targetDate: '2026-06', tags: ['AI persona'] },
  { id: 'up5', title: 'One-Click Chart Generation Demo', channel: 'Diagrimo', status: 'scripting', targetDate: '2026-07', tags: ['diagram'] },
];

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  researching: { label: '调研中', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  scripting: { label: '撰写中', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  producing: { label: '制作中', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  scheduled: { label: '已排期', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export const PLATFORM_ICON: Record<string, string> = {
  YouTube: '▶', X: '𝕏', TikTok: '♪', Newsletter: '✉',
  '小红书': '红', B站: 'B', Instagram: '◎',
};
