export default class Section {
  constructor(items, renderer, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); // Stored once as a class field
  }

  /**
   * Render all initial items by calling the renderer function
   * and appending the resulting DOM elements to the container.
   */
  render() {
    if (this._items && this._items.length > 0) {
      this._items.forEach(item => {
        const element = this._renderer(item);
        this._container.append(element);
      });
    }
  }

  /**
   * Render and insert a new item into the container.
   * @param {Object} item - The data item to render and insert
   */
  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element); // Use append() if needed
  }
}