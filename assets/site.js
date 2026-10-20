/* Shared behaviour for every page. Keep it small and dependency-free. */
(function () {
  'use strict';

  /* ---- 1. "Copy link" buttons -------------------------------------------
     Any <button class="copybtn" data-anchor="some-id"> copies a deep link.
     Omit data-anchor to copy the page URL itself.                          */
  function pageUrl(anchor) {
    // location.origin is the string "null" on file:// pages.
    var base = (location.origin && location.origin !== 'null')
      ? location.origin + location.pathname
      : location.href.split('#')[0];
    return anchor ? base + '#' + anchor : base;
  }

  document.querySelectorAll('.copybtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = pageUrl(btn.dataset.anchor);
      var original = btn.dataset.label || btn.textContent;
      btn.dataset.label = original;

      function done() {
        btn.textContent = 'Link copied';
        btn.dataset.done = '1';
        setTimeout(function () {
          btn.textContent = original;
          btn.dataset.done = '';
        }, 2000);
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (e) { btn.textContent = 'Copy from the address bar'; }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  });

  /* ---- 2. Table of contents ---------------------------------------------
     Built from every <h2> inside .prose that has an id.
     Highlights the section currently in view.                              */
  var toc = document.querySelector('.toc ol');
  var heads = Array.prototype.slice.call(
    document.querySelectorAll('.prose h2[id]')
  );

  if (toc && heads.length) {
    heads.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.dataset.short || h.textContent;
      li.appendChild(a);
      toc.appendChild(li);
    });

    var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
    if ('IntersectionObserver' in window) {
      var seen = new Map();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { seen.set(e.target.id, e.isIntersecting); });
        var activeId = null;
        for (var i = 0; i < heads.length; i++) {
          if (seen.get(heads[i].id)) { activeId = heads[i].id; break; }
        }
        if (!activeId) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      heads.forEach(function (h) { io.observe(h); });
    }
  }

  /* ---- 3. Reading time ---------------------------------------------------
     Fills <span data-reading-time></span> from the word count of .prose.    */
  var slot = document.querySelector('[data-reading-time]');
  var prose = document.querySelector('.prose');
  if (slot && prose) {
    var words = (prose.textContent || '').trim().split(/\s+/).length;
    slot.textContent = Math.max(1, Math.round(words / 220)) + ' min read';
  }

  /* ---- 4. Chart tooltips -------------------------------------------------
     Any element with data-tip-value (and optional data-tip-label) shows a
     small readout on hover and on keyboard focus. Values lead, labels
     follow. Text goes in through textContent, never innerHTML. The same
     numbers always sit in a table under the chart, so the tooltip is a
     convenience, not the only way to read a value.                        */
  var marks = document.querySelectorAll('[data-tip-value]');
  if (marks.length) {
    var tip = document.createElement('div');
    tip.className = 'chart-tip';
    tip.setAttribute('aria-hidden', 'true');
    var tv = document.createElement('b');
    var tl = document.createElement('span');
    tip.appendChild(tv);
    tip.appendChild(tl);
    document.body.appendChild(tip);

    function place(x, y) {
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var left = Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8);
      var top = y - h - 12;
      if (top < 8) top = y + 16;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }
    function show(el, x, y) {
      tv.textContent = el.getAttribute('data-tip-value');
      tl.textContent = el.getAttribute('data-tip-label') || '';
      tip.dataset.on = '1';
      if (x === undefined) {
        var r = el.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top;
      }
      place(x, y);
    }
    function hide() { tip.dataset.on = ''; }

    marks.forEach(function (el) {
      el.addEventListener('pointermove', function (e) { show(el, e.clientX, e.clientY); });
      el.addEventListener('pointerleave', hide);
      el.addEventListener('focus', function () { show(el); });
      el.addEventListener('blur', hide);
    });
    window.addEventListener('scroll', hide, { passive: true });
  }
})();
