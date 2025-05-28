export default class Section {
  constructor(items, renderer, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  render() {
    const container = document.querySelector(this._containerSelector);
    if (this._items && this._items.length > 0) {
      this._items.forEach(item => {
        const element = this._renderer(item);
        container.append(element);
      });
    }
  }
}

