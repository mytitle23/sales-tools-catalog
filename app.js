/**
 * Main Application Orchestrator
 * Initializes the Antigravity 2.0 store with advanced filter states.
 */
import { createStore } from './antigravity.js';
import Header from './components/Header.js';
import Filters from './components/Filters.js';
import Catalog from './components/Catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 480;

  // Retrieve user's saved theme preference (default to 'light')
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Initialize the Antigravity 2.0 Store with 6 advanced filter states
  const store = createStore({
    selectedCategory: 'All',
    selectedTechType: 'All',
    selectedMarket: 'All',
    selectedPricing: 'All',
    selectedPlatform: 'All',
    selectedIntegration: 'All',
    layout: isMobile ? 'list' : 'grid',
    theme: savedTheme
  });

  // Mount B2B components to DOM nodes
  Header(document.getElementById('header-mount'), store);
  Filters(document.getElementById('filters-mount'), store);
  Catalog(document.getElementById('catalog-mount'), store);

  // Sync theme changes to the body element class list
  store.subscribe((state) => {
    const currentTheme = state.theme || 'light';
    localStorage.setItem('theme', currentTheme);
    
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });

  // Dynamic layout adjustments on window resizing
  let prevWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth <= 480 && prevWidth > 480) {
      store.setState({ layout: 'list' });
    } else if (currentWidth > 480 && prevWidth <= 480) {
      store.setState({ layout: 'grid' });
    }
    prevWidth = currentWidth;
  });
});
