import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = createElement(`
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner"></div>
     </div>
  `);

  carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
  carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
  carouselInner = this.elem.querySelector('.carousel__inner');

  constructor(slides) {
    this.slides = slides;

    for (let slide of slides) {
      this.carouselInner.append(this.render(slide));
    }

    this.carouselItems = this.elem.querySelectorAll('.carousel__slide');
    this.counter = 0;
    this.currentWidth = 0;

    this.toggleArrow();

    this.carouselArrowRight.addEventListener('click', () => {
      this.moveCarousel(true);
    });

    this.carouselArrowLeft.addEventListener('click', (e) => {
      this.moveCarousel();
    });
  }

  render(slide) {
    let slideElement = createElement(`
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    let button = slideElement.querySelector('.carousel__button');
    button.addEventListener('click', () => {
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slide.id,
          bubbles: true,
        })
      );
    });

    return slideElement;
  }

  toggleArrow() {
    this.carouselArrowLeft.style.display = (this.counter === 0) ? 'none' : '';
    this.carouselArrowRight.style.display = (this.counter > this.carouselItems.length - 2) ? 'none' : '';
  }

  moveCarousel(isRight) {
    this.carouselItemWidth = [];
    this.carouselItems.forEach((c) => {
      this.carouselItemWidth.push(c.offsetWidth);
    });

    if (isRight) {
      this.counter++;

      this.currentWidth += this.carouselItemWidth[this.counter] * -1;
    } else {
      this.counter--;

      this.currentWidth -= this.carouselItemWidth[this.counter] * -1;
    }

    this.carouselInner.style.transform = `translateX(${this.currentWidth}px)`;

    this.toggleArrow();
  }
}
