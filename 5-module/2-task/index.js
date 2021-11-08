function toggleText() {
  document.querySelector('.toggle-text-button').addEventListener('click', (e) => {
    document.getElementById('text').toggleAttribute('hidden');
  });
}
