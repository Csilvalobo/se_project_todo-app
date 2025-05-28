export default class TodoCounter {
  /**
   * @param {string} totalSelector - selector for total todos count element
   * @param {string} completedSelector - selector for completed todos count element
   * @param {number} initialTotal - initial total todos count
   * @param {number} initialCompleted - initial completed todos count
   */
  constructor(totalSelector, completedSelector, initialTotal = 0, initialCompleted = 0) {
    this._totalElement = document.querySelector(totalSelector);
    this._completedElement = document.querySelector(completedSelector);
    this._totalCount = initialTotal;
    this._completedCount = initialCompleted;

    this._updateTotal();
    this._updateCompleted();
  }

  // Private methods to update DOM elements
  _updateTotal() {
    if (this._totalElement) this._totalElement.textContent = this._totalCount;
  }
  _updateCompleted() {
    if (this._completedElement) this._completedElement.textContent = this._completedCount;
  }

  // Public methods to update counts and UI
  incrementTotal() {
    this._totalCount++;
    this._updateTotal();
  }
  decrementTotal() {
    if (this._totalCount > 0) {
      this._totalCount--;
      this._updateTotal();
    }
  }
  incrementCompleted() {
    this._completedCount++;
    this._updateCompleted();
  }
  decrementCompleted() {
    if (this._completedCount > 0) {
      this._completedCount--;
      this._updateCompleted();
    }
  }

  // Set counts directly (optional)
  setTotal(count) {
    this._totalCount = Math.max(0, count);
    this._updateTotal();
  }
  setCompleted(count) {
    this._completedCount = Math.max(0, count);
    this._updateCompleted();
  }
}