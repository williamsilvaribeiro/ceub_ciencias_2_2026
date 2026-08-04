const SFX = (() => {
  let ctx;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function isMuted() {
    return localStorage.getItem('sfx_muted') === '1';
  }

  function beep({ freq = 440, duration = 0.1, type = 'sine', volume = 0.2, delay = 0 }) {
    if (isMuted()) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(gain).connect(ac.destination);
      const start = ac.currentTime + delay;
      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    } catch (e) { /* audio unavailable, fail silently */ }
  }

  const api = {
    click: () => beep({ freq: 440, duration: 0.06, type: 'square', volume: 0.12 }),
    move: () => beep({ freq: 300, duration: 0.04, type: 'square', volume: 0.08 }),
    match: () => {
      beep({ freq: 660, duration: 0.1, type: 'sine', volume: 0.15 });
      beep({ freq: 880, duration: 0.12, type: 'sine', volume: 0.15, delay: 0.08 });
    },
    error: () => beep({ freq: 160, duration: 0.18, type: 'sawtooth', volume: 0.15 }),
    win: () => {
      [523, 659, 784, 1046].forEach((f, i) => beep({ freq: f, duration: 0.14, type: 'sine', volume: 0.18, delay: i * 0.1 }));
    },
    gameover: () => {
      [392, 330, 262].forEach((f, i) => beep({ freq: f, duration: 0.2, type: 'sawtooth', volume: 0.15, delay: i * 0.12 }));
    },
    isMuted,
    toggleMute() {
      localStorage.setItem('sfx_muted', isMuted() ? '0' : '1');
      updateMuteBtn();
    }
  };

  let muteBtn;
  function updateMuteBtn() {
    if (muteBtn) muteBtn.innerHTML = iconSVG(isMuted() ? 'speakerOff' : 'speakerOn', { class: 'icon-solo' });
  }

  function injectMuteButton() {
    const target = document.querySelector('.header-actions') || document.querySelector('.site-header');
    if (!target) return;
    muteBtn = document.createElement('button');
    muteBtn.className = 'back-link';
    muteBtn.style.cursor = 'pointer';
    muteBtn.setAttribute('aria-label', 'Ativar ou desativar som');
    updateMuteBtn();
    muteBtn.addEventListener('click', () => api.toggleMute());
    target.appendChild(muteBtn);
  }

  document.addEventListener('DOMContentLoaded', injectMuteButton);

  return api;
})();
