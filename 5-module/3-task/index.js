function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
  let carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
  let carouselItems = carousel.querySelectorAll('.carousel__slide');
  let carouselWrap = carousel.querySelector('.carousel__inner');
  let counter = 0;
  let currentWidth = 0;
  let carouselItemInfo = {
    width: []
  };

  carouselItems.forEach((c) => {
    carouselItemInfo.width.push(c.offsetWidth);
  });

  function toggleArrow() {
    carouselArrowLeft.style.display = (counter === 0) ? 'none' : '';
    carouselArrowRight.style.display = (counter > carouselItems.length - 2) ? 'none' : '';
  }

  toggleArrow();

  function moveCarousel(isRight) {
    if (isRight) {
      counter++;

      currentWidth += carouselItemInfo.width[counter] * -1;
    } else {
      counter--;

      currentWidth -= carouselItemInfo.width[counter] * -1;
    }

    carouselWrap.style.transform = `translateX(${currentWidth}px)`;

    toggleArrow();
  }

  carouselArrowRight.addEventListener('click', () => {
    moveCarousel(true);
  });

  carouselArrowLeft.addEventListener('click', (e) => {
    moveCarousel();
  });
}
