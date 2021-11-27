import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = createElement(`<div class="products-grid"></div>`);

  constructor(products) {
    this.products = products;
    this.productsForFilter = products;

    this.render(products);

    this.filters = {};
  }

  render(products) {
    this.elem.querySelector('.products-grid__inner')?.remove();

    let productInner = document.createElement('div');
    productInner.classList.add('products-grid__inner');

    for (let product of products) {
      let card = new ProductCard(product);

      productInner.append(card.elem);
    }

    this.elem.append(productInner);
  }

  updateFilter(e) {
    this.setFilters(e, 'noNuts');
    this.setFilters(e, 'vegeterianOnly');
    this.setFilters(e, 'maxSpiciness');
    this.setFilters(e, 'category');

    this.products = this.productsForFilter.filter(c => {
      let noNuts = (this.filters.noNuts) ? c.nuts !== this.filters.noNuts : true;
      let vegetarianOnly = (this.filters.vegeterianOnly) ? c.vegeterian === this.filters.vegeterianOnly : true;
      let maxSpiciness = (this.filters.maxSpiciness) ? c.spiciness <= this.filters.maxSpiciness : true;
      let category = (this.filters.category) ? c.category === this.filters.category : true;

      return (noNuts && category && maxSpiciness && vegetarianOnly);
    });

    this.render(this.products);
  }

  setFilters(context, nameFilter) {
    if (context[nameFilter] !== undefined) {
      this.filters[nameFilter] = context[nameFilter];
    }
  }
}
