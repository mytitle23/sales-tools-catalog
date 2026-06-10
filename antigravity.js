/**
 * Antigravity 2.0 - Core State Management
 * A lightweight, ultra-fast reactive state container designed for instant client-side updates.
 */
class AntigravityStore {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
  }

  /**
   * Retrieves the current snapshot of the state.
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Updates the state and triggers notifications to all subscribers.
   * @param {Object} newState
   */
  setState(newState) {
    // Perform shallow merge
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  /**
   * Registers a callback that runs whenever state changes.
   * @param {Function} listener
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    // Trigger initial run for state sync
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifies all active listeners of state changes.
   */
  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (error) {
        console.error("Antigravity 2.0 listener error:", error);
      }
    });
  }
}

/**
 * Factory to instantiate a new Antigravity 2.0 store.
 * @param {Object} initialState
 * @returns {AntigravityStore}
 */
export const createStore = (initialState) => new AntigravityStore(initialState);
