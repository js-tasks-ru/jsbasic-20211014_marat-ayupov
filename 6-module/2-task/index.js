import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  elem = createElement(`<div class="card"></div>`);

  constructor(product) {
    this.product = product;

    this.render();
  }

  render() {
    let product = this.product;

    this.elem.append(
      createElement(`
        <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
      `)
    );

    this.elem.append(
      createElement(`
        <div class="card__body">
            <div class="card__title">${product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      `)
    );

    let button = this.elem.querySelector('.card__button');

    button.addEventListener("click", this.onClick);
  }

  onClick = () => {
    this.elem.dispatchEvent(new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true,
    }));
  };
}
