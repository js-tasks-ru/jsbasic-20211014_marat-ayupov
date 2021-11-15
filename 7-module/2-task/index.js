import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  body = document.body;

  constructor() {
    this.createdModal = this.render();

    let closeButton = this.createdModal.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);

    this.body.append(this.createdModal);
  }

  open() {
    this.body.classList.add('is-modal-open');

    window.addEventListener('keydown', this.onKeyDown);
  }

  setTitle(title) {
    this.createdModal.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {
    let elemBody = this.createdModal.querySelector('.modal__body');
    elemBody.innerHTML = '';
    elemBody.append(body);
  }

  render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
    
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `);
  }

  close = () => {
    this.body.classList.remove('is-modal-open');
    this.createdModal.remove();

    window.removeEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  };
}
