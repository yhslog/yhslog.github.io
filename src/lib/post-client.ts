/**
 * 글 화면의 클라이언트 동작
 * - 읽기 진행률 (데스크톱 헤더 막대 / 모바일 캡슐 채우기)
 * - 현재 섹션 추적 (데스크톱 목차 강조 / 모바일 캡슐 제목 / 시트 강조)
 * - 모바일 캡슐: 아래로 스크롤하면 숨기고 위로 올리면 다시 보임.
 *   본문에 들어서기 전과 글 끝(시리즈·이전/다음 글·댓글 영역)에서는 숨김.
 * - 목차 시트, 맨 위로 버튼, 코드 복사 버튼
 */
export function initPostPage() {
  const root = document.documentElement;
  const prose = document.querySelector<HTMLElement>('[data-prose]');
  const end = document.querySelector<HTMLElement>('[data-post-end]');
  const capsule = document.querySelector<HTMLElement>('[data-capsule]');
  const currentLabel = document.querySelector<HTMLElement>('[data-current-section]');
  const sheet = document.querySelector<HTMLDialogElement>('[data-toc-sheet]');
  const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  const sheetLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-sheet-link]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ids = tocLinks.map((a) => a.dataset.tocLink!);
  const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

  if (!prose) return;
  if (capsule) capsule.hidden = false;

  let lastY = window.scrollY;
  let capsuleVisible = false;
  let currentId = '';
  let ticking = false;

  const setCapsule = (visible: boolean) => {
    if (!capsule || visible === capsuleVisible) return;
    capsuleVisible = visible;
    capsule.classList.toggle('is-hidden', !visible);
    capsule.inert = !visible;
  };
  // 처음에는 숨긴 상태로 시작
  capsule?.classList.add('is-hidden');
  if (capsule) capsule.inert = true;

  const setCurrent = (id: string) => {
    if (id === currentId) return;
    currentId = id;
    for (const a of tocLinks) {
      if (a.dataset.tocLink === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
    for (const a of sheetLinks) {
      if (a.dataset.sheetLink === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
    const h = headings.find((el) => el.id === id);
    if (currentLabel && h) currentLabel.textContent = h.textContent?.trim() ?? '';
  };

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const proseRect = prose.getBoundingClientRect();
    const proseTop = proseRect.top + y;
    const proseBottom = proseRect.bottom + y;

    // 진행률: 본문 시작 ~ 본문 끝이 화면 아래에 닿을 때까지
    const total = Math.max(1, proseBottom - vh - (proseTop - vh * 0.3));
    const progress = Math.min(1, Math.max(0, (y - (proseTop - vh * 0.3)) / total));
    root.style.setProperty('--progress', progress.toFixed(4));

    // 현재 섹션: 화면 상단 기준선을 지난 마지막 제목
    const line = 140;
    let active = headings[0]?.id ?? '';
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= line) active = h.id;
      else break;
    }
    setCurrent(active);

    // 캡슐 표시
    const inBody = proseRect.top < vh * 0.5;
    const atEnd = end ? end.getBoundingClientRect().top < vh : false;
    const delta = y - lastY;
    if (!inBody || atEnd) setCapsule(false);
    else if (delta > 6) setCapsule(false);
    else if (delta < -6) setCapsule(true);
    if (Math.abs(delta) > 6) lastY = y;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // 맨 위로
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-back-to-top]')) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
    });
  }

  // 목차 시트
  if (sheet) {
    document.querySelector('[data-toc-open]')?.addEventListener('click', () => {
      sheet.showModal();
      sheet.querySelector<HTMLAnchorElement>('[aria-current="location"]')?.focus();
    });
    sheet.querySelector('[data-toc-close]')?.addEventListener('click', () => sheet.close());
    // 바깥(backdrop) 클릭 시 닫기
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet) sheet.close();
    });
    for (const a of sheetLinks) a.addEventListener('click', () => sheet.close());
  }

  // 코드 복사 버튼
  const isKo = root.lang === 'ko';
  for (const pre of prose.querySelectorAll('pre')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = isKo ? '복사' : 'Copy';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = isKo ? '복사됨' : 'Copied';
        setTimeout(() => (btn.textContent = isKo ? '복사' : 'Copy'), 1500);
      } catch {
        /* 클립보드 권한이 없으면 무시 */
      }
    });
    pre.appendChild(btn);
  }
}
