import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = createElement(`
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
      </nav>
  
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `);
  categoryInner = this.elem.querySelector('.ribbon__inner');
  arrowRight = this.elem.querySelector('.ribbon__arrow_right');
  arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
  activeClass = 'ribbon__item_active';
  scrollValue = 350;

  constructor(categories) {
    this.categories = categories;

    for (let category of categories) {
      this.categoryInner.append(this.render(category));
    }

    this.arrowRight.addEventListener('click', () => {
      this.categoryInner.scrollBy(this.scrollValue, 0);
    });

    this.arrowLeft.addEventListener('click', () => {
      this.categoryInner.scrollBy(this.scrollValue * -1, 0);
    });

    this.categoryInner.addEventListener('scroll', this.onScroll);
  }

  toggleArrow() {
    let catInner = this.categoryInner;
    let toggleLeft = (catInner.scrollLeft > 0) ? 'add' : 'remove';
    let toggleRight = (catInner.scrollWidth - catInner.scrollLeft - catInner.clientWidth !== 0) ? 'add' : 'remove';

    this.arrowLeft.classList[toggleLeft]('ribbon__arrow_visible');
    this.arrowRight.classList[toggleRight]('ribbon__arrow_visible');
  }

  render(category) {
    let addClass = (category.id === '') ? ` ${this.activeClass}` : '';

    let createdLink = createElement(`
      <a href="#" class="ribbon__item${addClass}" data-id="${category.id}">${category.name}</a>
    `);

    createdLink.addEventListener('click', (e) => {
      let target = e.currentTarget;

      e.preventDefault();

      this.elem.querySelector(`.${this.activeClass}`).classList.remove(this.activeClass);
      target.classList.add(this.activeClass);

      this.elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: target.dataset['id'],
          bubbles: true,
        })
      );
    });

    return createdLink;
  }

  onScroll = () => {
    this.toggleArrow();
  };
}
