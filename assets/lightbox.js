/* Tiny dependency-free lightbox: click any gallery <figure> image to view it full-size. */
(function () {
  var imgs = document.querySelectorAll('figure img');
  if (!imgs.length) return;
  var st = document.createElement('style');
  st.textContent =
    '.lb-ov{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;padding:3vh 3vw;cursor:zoom-out}' +
    '.lb-ov.on{display:flex}' +
    '.lb-ov img{max-width:96vw;max-height:94vh;width:auto;height:auto;border-radius:8px;box-shadow:0 10px 60px rgba(0,0,0,.6)}' +
    '.lb-cl{position:fixed;top:14px;right:20px;color:#fff;font:400 30px/1 sans-serif;cursor:pointer;opacity:.85}' +
    'figure img{cursor:zoom-in}@media print{.lb-ov{display:none!important}}';
  document.head.appendChild(st);
  var ov = document.createElement('div');
  ov.className = 'lb-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
  ov.innerHTML = '<span class="lb-cl" aria-label="Close">×</span><img alt="">';
  document.body.appendChild(ov);
  var big = ov.querySelector('img');
  function close() { ov.classList.remove('on'); big.src = ''; }
  ov.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  imgs.forEach(function (im) {
    im.addEventListener('click', function () {
      big.src = im.currentSrc || im.src; big.alt = im.alt || '';
      ov.classList.add('on');
    });
  });
})();
