import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {

      let sameProduct = this.cartItems.findIndex((c) => c?.product.id === product.id);

      if (sameProduct !== -1) {
        this.cartItems[sameProduct].count++;
      } else {
        this.cartItems.push({product, count: 1});
      }

      this.onProductUpdate(this.cartItems[sameProduct]);
    }
  }

  updateProductCount(productId, amount) {
    let findProduct = this.cartItems.findIndex((c) => c?.product.id === productId);

    if (this.cartItems[findProduct]) {
      this.cartItems[findProduct].count += amount;

      if (this.cartItems[findProduct]?.count === 0) {
        this.cartItems.splice(findProduct, 1);
      }
    }

    console.log(productId);

    this.onProductUpdate(this.cartItems[findProduct]);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let r = 0;

    for (let cartItem of this.cartItems) {
      r += cartItem.count;
    }

    return r;
  }

  getTotalPrice() {
    let r = 0;

    for (let cartItem of this.cartItems) {
      r += cartItem.product.price * cartItem.count;
    }

    return r;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");

    let div = document.createElement('div');
    div.className = 'order-list';
    for (let cartItem of this.cartItems) {
      div.append(this.renderProduct(cartItem.product, cartItem.count));
    }
    div.append(this.renderOrderForm());

    modal.setBody(div);

    let counter = div.querySelectorAll('.cart-counter');

    counter.forEach((c) => {
      c.addEventListener('click', (e) => {
        let minus = e.target.closest('.cart-counter__button_minus');
        let plus = e.target.closest('.cart-counter__button_plus');

        if (minus) {
          let id = minus.closest('[data-product-id]');

          let count = id.querySelector('.cart-counter__count');
          console.log(id);
          if ((+count.innerHTML - 1) === 0) {
            id.remove();
          }
          this.updateProductCount(id.dataset.productId, -1);
        } else if (plus) {
          this.updateProductCount(plus.closest('[data-product-id]').dataset.productId, -1);
        } else {
          return;
        }
      });
    });

    modal.open();
  }

  onProductUpdate(cartItem) {

    if (document.body.classList.contains('is-modal-open') && cartItem) {
      console.log(cartItem);

      let productId = cartItem.product.id; // Уникальный идентификатора товара (для примера)
      let modalBody = document.querySelector('.order-list');

      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;

      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

      infoPrice.innerHTML = `€${(+(infoPrice.textContent).slice(1) - cartItem.product.price).toFixed(2)}`;

      // console.log(cartItem);
    }


    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

