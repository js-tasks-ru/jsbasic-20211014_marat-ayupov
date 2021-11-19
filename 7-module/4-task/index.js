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

  activeClass = 'slider__step-active';

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

    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.onpointerdown = () => false;
    this.sliderThumb.onpointermove = () => false;

    this.setSliderValue(value);

    this.elem.addEventListener('click', this.onClick);
    this.sliderThumb.addEventListener('pointerdown', this.onPointerDown);
  }

  render(isActive) {
    let createSpan = createElement(`<span></span>`);

    if (isActive) {
      createSpan.classList.add(this.activeClass);
    }

    return createSpan;
  }

  onClick = (e) => {
    if (!e.target.classList.contains('slider__thumb')) {
      let pointOfClick = Math.floor((e.offsetX / e.currentTarget.offsetWidth) * 100);

      this.setSliderValue(this.onMove(pointOfClick));

      this.generateNewEvent(this.onMove(pointOfClick));
    }
  };

  onMove(e) {
    let pointOfClick = e;
    let currentStep = 0;

    for (let i = 0, r = 0; i < this.steps; i++) {
      // Определяю часть слайдера от точки клика по нему
      if (pointOfClick <= r && pointOfClick >= (r - this.stepCounter)) {
        currentStep = (pointOfClick >= r - (this.stepCounter / 2)) ? i : i - 1;
      }

      r += this.stepCounter;
    }

    return currentStep;
  }

  onPointerDown = (e) => {
    let thumb = this.sliderThumb;
    this.elem.classList.add('slider_dragging');

    let shiftX = e.clientX - (thumb.getBoundingClientRect().left + thumb.offsetWidth / 2);
    let shiftY = e.clientY - (thumb.getBoundingClientRect().top + thumb.offsetWidth / 2);

    function moveThumb(x = 0, y = 0) {
      let left = x - shiftX;
      let top = y - shiftY;

      return {
        left,
        top,
      };
    }

    // let percent = this.getPercent(moveThumb(e.pageX).left);

    // this.setSliderValue(percent, true);

    let moveSlider = (e) => {
      let percent = this.getPercent(moveThumb(e.clientX).left);

      this.setSliderValue(percent, true);
    };

    document.addEventListener('pointermove', moveSlider);

    let pointerUp = (e) => {
      let percent = this.getPercent(moveThumb(e.clientX).left);

      this.setSliderValue(this.onMove(percent));

      document.removeEventListener('pointerup', pointerUp);
      document.removeEventListener('pointermove', moveSlider);

      this.generateNewEvent(this.onMove(percent));

      this.elem.classList.remove('slider_dragging');
    };

    document.addEventListener('pointerup', pointerUp);
  };

  getPercent = (value) => {
    let percent = Math.floor(
      ((value - this.elem.offsetLeft) / this.elem.offsetWidth) * 100
    );

    if (percent > 100) {
      percent = 100;
    }

    if (percent <= 0) {
      percent = 0;
    }

    return percent;
  };

  setSliderValue(value, isDragging) {
    let percent = (isDragging) ? value : Math.floor(value * this.stepCounter);
    let step = (isDragging) ? this.onMove(value) : value;

    this.sliderSteps.querySelector(`.${this.activeClass}`).classList.remove(this.activeClass);
    this.sliderSteps.children[step].classList.add(this.activeClass);

    this.sliderValue.textContent = step + '';
    this.sliderProgress.style.width = `${percent}%`;
    this.sliderThumb.style.left = `${percent}%`;
  }

  generateNewEvent = (detail) => {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail,
        bubbles: true,
      })
    );
  };
}
