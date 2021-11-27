import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carouselHolder = document.querySelector('[data-carousel-holder]');
  ribbonHolder = document.querySelector('[data-ribbon-holder]');
  sliderHolder = document.querySelector('[data-slider-holder]');
  cartHolder = document.querySelector('[data-cart-icon-holder]');
  productsHolder = document.querySelector('[data-products-grid-holder]');
  noNutsCheckbox = document.getElementById('nuts-checkbox');
  vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

  constructor() {
    this.products = [];
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    document.body.addEventListener('product-add', (evt) => {
      let productToAdd = this.products.find((product) => product.id === evt.detail);
      this.cart.addProduct(productToAdd);
    });

    this.stepSlider.elem.addEventListener('slider-change', (evt) => {
      this.productsGrid.updateFilter({
        maxSpiciness: evt.detail,
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (evt) => {
      this.productsGrid.updateFilter({
        category: evt.detail,
      });
    });

    this.noNutsCheckbox.addEventListener('change', (evt) => {
      this.productsGrid.updateFilter({
        noNuts: evt.target.checked,
      });
    });

    this.vegeterianCheckbox.addEventListener('change', (evt) => {
      console.log(evt.target.checked);
      this.productsGrid.updateFilter({
        vegeterianOnly: evt.target.checked,
      });
    });
  }

  async render() {
    await this.fetchProducts().then((response) => {
      this.products = response;
    });
    this.productsGrid = new ProductsGrid(this.products);

    this.carouselHolder.append(this.carousel.elem);
    this.ribbonHolder.append(this.ribbonMenu.elem);
    this.sliderHolder.append(this.stepSlider.elem);
    this.cartHolder.append(this.cartIcon.elem);

    this.productsHolder.append(this.productsGrid.elem);
    this.updateFilter();
    // ... ваш код
  }

  updateFilter() {
    console.log(this.stepSlider);
    this.productsGrid.updateFilter({
      noNuts: this.noNutsCheckbox.checked,
      vegeterianOnly: this.vegeterianCheckbox.checked,
      maxSpiciness: this.stepSlider.value,
      category: ''
    });
  }

  fetchProducts() {
    return fetch('./products.json').then(resolve => resolve.json());
  }
}
