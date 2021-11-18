import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = createElement(`
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
    
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
    
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps"></div>
    </div>
  `);

  sliderProgress = this.elem.querySelector('.slider__progress');
  sliderSteps = this.elem.querySelector('.slider__steps');
  sliderValue = this.elem.querySelector('.slider__value');
  sliderThumb = this.elem.querySelector('.slider__thumb');

  constructor({steps, value = 0}) {
    this.steps = steps;
    this.stepCounter = Math.floor(100 / (this.steps - 1));

    for (let i = 0; i < steps; i++) {
      this.sliderSteps.append(this.render(i === value));
    }

    this.elem.addEventListener('click', this.onClick);
    this.sliderThumb.addEventListener('pointerdown', this.onPointerDown);

    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.onpointerdown = () => false;
    this.sliderThumb.onpointermove = () => false;
  }

  render(isActive) {
    let createSpan = createElement(`<span></span>`);

    if (isActive) {
      createSpan.classList.add('slider__step-active');
    }

    return createSpan;
  }

  onClick = (e) => {
    let pointOfClick = Math.floor((e.offsetX / e.currentTarget.offsetWidth) * 100);
    let currentStep = this.onMove(pointOfClick);

    this.sliderValue.textContent = currentStep + '';
    this.sliderProgress.style.width = `${Math.floor(currentStep * this.stepCounter)}%`;
    this.sliderThumb.style.left = `${Math.floor(currentStep * this.stepCounter)}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: currentStep,
        bubbles: true,
      })
    );
  };

  onMove(e) {
    let pointOfClick = e;
    let currentStep = 0;

    for (let i = 0, r = 0; i < this.steps; i++) {
      // Определяю часть слайдера от точки клика по нему
      if (pointOfClick < r && pointOfClick >= (r - this.stepCounter)) {
        currentStep = (pointOfClick >= r - (this.stepCounter / 2)) ? i : i - 1;
      }

      r += this.stepCounter;
    }

    return currentStep;
  }

  onPointerDown = (e) => {
    let thumb = this.sliderThumb;
    this.elem.classList.add('slider_dragging');

    let shiftX = e.clientX - thumb.getBoundingClientRect().left;
    let shiftY = e.clientY - thumb.getBoundingClientRect().top;

    function moveThumb(x = 0, y = 0) {
      let left = x - shiftX;
      let top = y - shiftY;

      return {
        left,
        top,
      };
    }
    // moveThumb(e.pageX, e.pageY).left;

    // let pointOfClick = Math.floor((left / e.currentTarget.offsetWidth) * 100);

    let currentStep = this.onMove(moveThumb(e.pageX, e.pageY).left);

    console.log(moveThumb(e.pageX).left, thumb.getBoundingClientRect().left);

    this.sliderValue.textContent = currentStep + '';
    this.sliderProgress.style.width = `${Math.floor(currentStep * this.stepCounter)}%`;
    this.sliderThumb.style.left = `${Math.floor(currentStep * this.stepCounter)}%`;

    /*let moveSlider = (e) => {
      let left = moveThumb(e.offsetX).left;

      console.log(left, this.elem.offsetWidth);

      let pointOfClick = Math.floor((left / this.elem.offsetWidth) * 100);

      let currentStep = this.onMove(pointOfClick);

      this.sliderValue.textContent = currentStep + '';
      this.sliderProgress.style.width = `${Math.floor(currentStep * this.stepCounter)}%`;
      this.sliderThumb.style.left = `${Math.floor(currentStep * this.stepCounter)}%`;
    };

    document.addEventListener('pointermove', moveSlider);*/
  };
}
