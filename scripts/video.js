function openModal(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');

    iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }