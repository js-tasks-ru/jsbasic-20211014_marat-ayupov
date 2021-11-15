import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  modalTitle = 'Вот сюда нужно добавлять заголовок';
  modalBody = 'A сюда нужно добавлять содержимое тела модального окна';
  body = document.body;

  constructor() {
    this.body.append(this.render());
  }

  open() {
    this.body.classList.add('is-modal-open');

    window.addEventListener('keydown', this.onKeyDown);
  }

  setTitle(title) {
    this.modalTitle = title;
  }

  setBody(body) {
    this.modalBody = body;
  }

  render() {
    let createdModal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              ${this.modalTitle}
            </h3>
          </div>
    
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    let elemBody = createdModal.querySelector('.modal__body');
    elemBody.firstElementChild?.remove();
    elemBody.append(this.modalBody);

    let closeButton = createdModal.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);

    return createdModal;
  }

  close = () => {
    this.body.classList.remove('is-modal-open');
    this.body.querySelector('.modal').remove();

    window.removeEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  };
}
