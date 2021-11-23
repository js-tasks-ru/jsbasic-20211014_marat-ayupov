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

    for (let i = 0; i < steps; i++) {
      this.sliderSteps.append(this.render(i === value));
    }

    this.elem.addEventListener('click', this.onClick);
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
    let stepNumber = Math.floor(100 / (this.steps - 1));
    let currentStep = 0;

    for (let i = 0, r = 0; i < this.steps; i++) {
      // Определяю часть слайдера от точки клика по нему
      if (pointOfClick < r && pointOfClick >= (r - stepNumber)) {
        currentStep = (pointOfClick >= r - (stepNumber / 2)) ? i : i - 1;
      }

      r += stepNumber;
    }

    this.sliderValue.textContent = currentStep + '';
    this.sliderProgress.style.width = `${Math.floor(currentStep * stepNumber)}%`;
    this.sliderThumb.style.left = `${Math.floor(currentStep * stepNumber)}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: currentStep,
        bubbles: true,
      })
    );
  };
}
