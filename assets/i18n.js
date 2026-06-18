/* Общий движок мультиязычности. На странице задать window.I18N = { en:{...}, zh:{...}, h:{...} } ДО подключения этого файла,
   добавить переключатель .lang-switch с кнопками [data-lang], и при необходимости [data-i18nh] на блоки со сложной разметкой. */
(function () {
  var I18N = window.I18N || { en: {}, zh: {}, h: {} };
  I18N.en = I18N.en || {}; I18N.zh = I18N.zh || {}; I18N.h = I18N.h || {};

  var css = ".lang-switch{display:flex;gap:1px;border:1px solid var(--border2);border-radius:100px;padding:2px}"
    + ".lang-btn{font-family:'Syne',sans-serif;font-weight:600;font-size:.72rem;color:var(--text3);background:transparent;border:none;border-radius:100px;padding:.3rem .55rem;cursor:pointer;transition:all .15s;line-height:1}"
    + ".lang-btn:hover{color:var(--text)}.lang-btn.active{background:var(--accent);color:var(--bg)}"
    + "@media print{.lang-switch{display:none}}";
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var nodes = null;
  function collect() {
    nodes = [];
    var skip = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        for (var p = n.parentElement; p; p = p.parentElement) {
          if (skip[p.tagName] || p.classList.contains('lang-switch') || p.hasAttribute('data-i18nh')) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while (n = w.nextNode()) nodes.push({ node: n, ru: n.nodeValue });
  }

  window.setLang = function (lang) {
    if (!nodes) collect();
    for (var i = 0; i < nodes.length; i++) {
      var it = nodes[i];
      if (lang === 'ru') { it.node.nodeValue = it.ru; continue; }
      var key = it.ru.trim();
      var t = (I18N[lang] || {})[key];
      it.node.nodeValue = (t != null) ? it.ru.replace(key, t) : it.ru;
    }
    var hs = document.querySelectorAll('[data-i18nh]');
    for (var j = 0; j < hs.length; j++) {
      var el = hs[j], k = el.getAttribute('data-i18nh');
      if (!el.dataset.ruhtml) el.dataset.ruhtml = el.innerHTML;
      el.innerHTML = (lang === 'ru') ? el.dataset.ruhtml : (((I18N.h || {})[k] || {})[lang] || el.dataset.ruhtml);
    }
    document.documentElement.lang = (lang === 'zh') ? 'zh-Hans' : lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    var btns = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) btns[b].classList.toggle('active', btns[b].dataset.lang === lang);
  };

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.lang-btn') : null;
    if (b && b.dataset.lang) setLang(b.dataset.lang);
  });

  var s = 'ru'; try { s = localStorage.getItem('lang') || 'ru'; } catch (e) {}
  setLang(s);
})();
