import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  fixedTop = 50;
  fixedLeft = 20;
  fixedRight = 10;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', this.updatePosition);
    window.addEventListener('resize', this.updatePosition);
  }

  updatePosition = () => {
    let cart = this.elem;
    let cartTop = cart.offsetTop;
    let container = this.elem.closest('.container');
    let containerLeftOffset = container.offsetWidth + container.offsetLeft;

    if (cart.offsetWidth && window.matchMedia("(min-width: 768px)").matches) {
      let left = containerLeftOffset + this.fixedLeft;

      if (document.documentElement.clientWidth - (containerLeftOffset + cart.offsetWidth + this.fixedLeft) < this.fixedRight) {
        left = (document.documentElement.clientWidth) - cart.offsetWidth - this.fixedRight;
      }

      if (cartTop < window.pageYOffset) {
        cart.style.cssText = `
          position: fixed;
          z-index: 1000;
          top: ${this.fixedTop}px;
          left: ${left}px
        `;
      } else {
        cart.removeAttribute('style');
      }
    } else {
      cart.removeAttribute('style');
    }
  }
}
