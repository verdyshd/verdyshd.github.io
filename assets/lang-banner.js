/* Non-intrusive language suggestion banner (SEO-safe: no auto-redirect).
   Shown only on first visit when the browser language differs and a translated
   version exists. Clicking switches + remembers; dismiss hides it for good. */
(function () {
  var saved, dismissed;
  try { saved = localStorage.getItem('lang'); dismissed = localStorage.getItem('langBan'); }
  catch (e) { return; }
  if (saved || dismissed) return;
  var p = location.pathname;
  var c = /^\/en\//.test(p) ? 'en' : /^\/zh\//.test(p) ? 'zh' : 'ru';
  var f = p.replace(/^\/(en|zh)\//, '/');
  if (/(case-amp|portfolio-cartum-preview)\.html/.test(f)) return;
  var nl = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
  var want = nl.indexOf('zh') === 0 ? 'zh' : nl.indexOf('en') === 0 ? 'en' : nl.indexOf('ru') === 0 ? 'ru' : '';
  if (!want || want === c) return;
  var pre = want === 'en' ? '/en' : want === 'zh' ? '/zh' : '';
  var target = f === '/' ? (pre + '/') : (pre + f);
  var T = { en: { m: 'This page is available in English.', cta: 'View in English', d: 'Dismiss' },
            zh: { m: '本页面有中文版本。', cta: '用中文查看', d: '关闭' } }[want];

  var st = document.createElement('style');
  st.textContent =
    ".lang-ban{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9998;display:flex;align-items:center;gap:10px;background:#161616;border:1px solid rgba(255,255,255,.15);border-radius:100px;padding:8px 8px 8px 18px;box-shadow:0 8px 30px rgba(0,0,0,.5);font-family:'DM Sans',sans-serif;font-size:.85rem;color:#f0ede8;max-width:92vw}" +
    ".lang-ban a.lang-ban-cta{color:#c8ff00;font-weight:600;white-space:nowrap;text-decoration:none;padding:4px 6px}" +
    ".lang-ban .lang-ban-x{background:transparent;border:none;color:#888;font-size:18px;cursor:pointer;line-height:1;padding:2px 8px}" +
    ".lang-ban .lang-ban-x:hover{color:#f0ede8}@media print{.lang-ban{display:none}}";
  document.head.appendChild(st);

  var bar = document.createElement('div');
  bar.className = 'lang-ban';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Language');
  bar.innerHTML = '<span>' + T.m + '</span><a class="lang-ban-cta" href="' + target + '">' + T.cta + ' →</a><button class="lang-ban-x" aria-label="' + T.d + '">×</button>';
  document.body.appendChild(bar);

  bar.querySelector('.lang-ban-cta').addEventListener('click', function () {
    try { localStorage.setItem('lang', want); } catch (e) {}
  });
  bar.querySelector('.lang-ban-x').addEventListener('click', function () {
    try { localStorage.setItem('langBan', '1'); } catch (e) {}
    bar.remove();
  });
})();
