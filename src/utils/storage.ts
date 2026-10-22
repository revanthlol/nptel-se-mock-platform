const BOOKMARKS_KEY = 'nptel_se_bookmarks';
const THEME_KEY = 'nptel_se_theme';

export function getBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(questionId: string): string[] {
  const current = getBookmarks();
  const set = new Set(current);
  if (set.has(questionId)) {
    set.delete(questionId);
  } else {
    set.add(questionId);
  }
  const updated = Array.from(set);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function isBookmarked(questionId: string): boolean {
  const current = getBookmarks();
  return current.includes(questionId);
}

export function getSavedTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function saveTheme(theme: 'light' | 'dark') {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
