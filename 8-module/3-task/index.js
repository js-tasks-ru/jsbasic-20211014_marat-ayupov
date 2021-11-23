export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

      this.onProductUpdate(this.cartItems[findProduct]);
    }
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

