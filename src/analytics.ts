export type EventName = 'view_teacher' | 'create_booking' | 'search_teacher' | 'view_home' | 'buy_package_click';
export function track(name: EventName, props: Record<string, any> = {}) {
  const evt = { name, props, ts: Date.now() };
  console.log('[analytics]', evt);
  const key = 'analytics_queue';
  const q = JSON.parse(localStorage.getItem(key) || '[]');
  q.push(evt); localStorage.setItem(key, JSON.stringify(q));
}