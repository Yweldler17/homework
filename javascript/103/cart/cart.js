class Cart {
  constructor(items) {
    this.items = items || {};
  }

  addItem(id, count) {
    const c = this.items[id] || 0;
    this.items[id] = count + c;
  }

  getItems() {
    return Object.keys(this.items).map(id => {
      const item = global.items.find(i => i.id === +id);

      return {
        item: item,
        count: this.items[id],
        subtotal: (item.price * this.items[id]).toFixed(2)
      }
    });
  }
}

module.exports = Cart;