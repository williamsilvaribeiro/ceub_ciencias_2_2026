const SHARE = {
  async score(text) {
    if (navigator.share) {
      try {
        await navigator.share({ text, title: 'PlayHub' });
        return;
      } catch (e) {
        return; // user cancelled the native share sheet
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      SHARE.toast('Copiado para a área de transferência!');
    } catch (e) {
      SHARE.toast('Não foi possível compartilhar.');
    }
  },

  toast(msg) {
    let el = document.getElementById('share-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'share-toast';
      el.style.cssText = [
        'position:fixed', 'bottom:20px', 'left:50%', 'transform:translateX(-50%)',
        'background:var(--card)', 'border:1px solid var(--accent)', 'color:var(--text)',
        'padding:0.6rem 1.2rem', 'border-radius:999px', 'font-family:var(--font-body)',
        'font-size:1.1rem', 'z-index:1000', 'box-shadow:0 8px 24px rgba(0,0,0,.4)',
        'transition:opacity .3s', 'pointer-events:none'
      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }
};
