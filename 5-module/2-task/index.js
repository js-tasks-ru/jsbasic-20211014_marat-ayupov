function toggleText() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-text-button')) {
      document.getElementById('text').toggleAttribute('hidden');
    }
  });
}
