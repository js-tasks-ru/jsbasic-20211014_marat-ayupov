function hideSelf() {
  // let buttons = document.querySelectorAll('.hide-self-button');

  /*for (let button of buttons) {
    button.addEventListener('click', (e) => {
      e.currentTarget.hidden = true;
    });
  }*/

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('hide-self-button')) {
      e.target.hidden = true;
    }
  });
}
