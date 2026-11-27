import type { Lang } from '@/site.config';

export const ui = {
  ko: {
    'nav.posts': '글',
    'nav.tags': '태그',
    'nav.series': '시리즈',
    'nav.about': 'About',
    'nav.menu': '메뉴',
    'theme.toggle': '테마 전환',
    'lang.switch': 'English로 보기',
    'home.latest': 'LATEST',
    'home.recent': '최근 글',
    'home.all': '전체',
    'home.read': '읽기 →',
    'home.empty': '아직 글이 없습니다.',
    'post.minRead': '분 읽기',
    'post.updated': '수정',
    'post.readOther': 'Read in English →',
    'post.toc': '목차',
    'post.tocOpen': '목차 열기',
    'post.tocClose': '목차 닫기',
    'post.onThisPage': 'ON THIS PAGE',
    'post.backToTop': '맨 위로',
    'post.newer': '다음 글',
    'post.older': '이전 글',
    'post.newest': '가장 최근 글입니다',
    'post.oldest': '가장 처음 쓴 글입니다',
    'post.navLabel': '다음 글, 이전 글 (작성 시간 순)',
    'post.comments': '댓글',
    'post.copy': '복사',
    'post.copied': '복사됨',
    'series.label': 'SERIES',
    'series.current': '지금 읽은 글',
    'series.title': '시리즈',
    'series.count': '편',
    'tags.title': '태그',
    'tags.postsTagged': '태그가 달린 글',
    'footer.rss': 'RSS',
    'notFound.title': '페이지를 찾을 수 없습니다',
    'notFound.home': '첫 화면으로',
  },
  en: {
    'nav.posts': 'Posts',
    'nav.tags': 'Tags',
    'nav.series': 'Series',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'theme.toggle': 'Toggle theme',
    'lang.switch': '한국어로 보기',
    'home.latest': 'LATEST',
    'home.recent': 'Recent posts',
    'home.all': 'All',
    'home.read': 'Read →',
    'home.empty': 'No posts yet.',
    'post.minRead': 'min read',
    'post.updated': 'Updated',
    'post.readOther': '한국어로 읽기 →',
    'post.toc': 'Contents',
    'post.tocOpen': 'Open table of contents',
    'post.tocClose': 'Close table of contents',
    'post.onThisPage': 'ON THIS PAGE',
    'post.backToTop': 'Back to top',
    'post.newer': 'Newer',
    'post.older': 'Older',
    'post.newest': 'This is the latest post',
    'post.oldest': 'This is the first post',
    'post.navLabel': 'Newer and older posts',
    'post.comments': 'Comments',
    'post.copy': 'Copy',
    'post.copied': 'Copied',
    'series.label': 'SERIES',
    'series.current': 'You just read this',
    'series.title': 'Series',
    'series.count': 'posts',
    'tags.title': 'Tags',
    'tags.postsTagged': 'Posts tagged',
    'footer.rss': 'RSS',
    'notFound.title': 'Page not found',
    'notFound.home': 'Go home',
  },
} as const;

export type UIKey = keyof (typeof ui)['ko'];

export function useT(lang: Lang) {
  return (key: UIKey) => ui[lang][key];
}

export function formatDate(date: Date, lang: Lang) {
  if (lang === 'ko') {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
