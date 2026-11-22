/* Gallery viewer + video replay button.
   - Click any image link inside .gallery to open it full screen.
   - Move with the arrow buttons, the ← → keys, or by swiping on a phone.
   - Close with ✕, the Esc key, or by clicking the dark background.
   - Any <video> on the page gets a replay button when it ends. */
(function () {
  'use strict';

  /* ---------- Full-screen image viewer ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
  if (links.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" type="button" aria-label="Previous image">&#8249;</button>' +
      '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
      '<button class="lb-next" type="button" aria-label="Next image">&#8250;</button>' +
      '<div class="lb-count" aria-live="polite"></div>';
    document.body.appendChild(overlay);

    var img = overlay.querySelector('.lb-img');
    var caption = overlay.querySelector('.lb-caption');
    var count = overlay.querySelector('.lb-count');
    var prevBtn = overlay.querySelector('.lb-prev');
    var nextBtn = overlay.querySelector('.lb-next');
    var closeBtn = overlay.querySelector('.lb-close');
    var current = 0;
    var opener = null;

    function show(i) {
      current = (i + links.length) % links.length;   // wraps around at both ends
      var thumb = links[current].querySelector('img');
      var alt = thumb ? thumb.getAttribute('alt') || '' : '';
      img.src = links[current].getAttribute('href');
      img.alt = alt;
      caption.textContent = alt;
      count.textContent = (current + 1) + ' / ' + links.length;
    }
    function open(i) {
      opener = document.activeElement;
      show(i);
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';      // stop the page scrolling behind
      closeBtn.focus();
    }
    function close() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      if (opener) opener.focus();                    // return focus to the thumbnail
    }

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('lb-figure')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'Escape') close();
      else if (e.key === 'Tab') {                    // keep keyboard focus inside the viewer
        var f = [closeBtn, prevBtn, nextBtn];
        var at = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    var startX = null;
    overlay.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));   // swipe left = next
      startX = null;
    });
  }

  /* ---------- Replay button for videos ---------- */
  Array.prototype.slice.call(document.querySelectorAll('video')).forEach(function (video) {
    var wrap = document.createElement('div');
    wrap.className = 'video-wrap';
    video.parentNode.insertBefore(wrap, video);
    wrap.appendChild(video);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'replay';
    btn.setAttribute('aria-label', 'Replay video');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>';
    btn.hidden = true;
    wrap.appendChild(btn);

    video.addEventListener('ended', function () { btn.hidden = false; });
    video.addEventListener('play', function () { btn.hidden = true; });
    btn.addEventListener('click', function () { video.currentTime = 0; video.play(); });
  });
})();

