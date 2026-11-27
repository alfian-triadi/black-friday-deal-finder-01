// Wiring for the deal finder: reads the controls, filters and sorts the
// deals, and re-renders the list. Runs entirely from local files.

import { DEALS, CATEGORIES, STORES } from './deals.js';
import { applyFilters, applySort } from './filters.js';
import { renderDeals, renderSummary } from './render.js';

const state = {
  query: '',
  category: 'All',
  store: 'All',
  minDiscount: 0,
  verdict: 'All',
  sort: 'discount',
};

const grid = document.getElementById('deals');
const summary = document.getElementById('summary');
const countLine = document.getElementById('count-line');

function fillSelect(select, options) {
  for (const option of options) {
    const el = document.createElement('option');
    el.value = option;
    el.textContent = option === 'All' ? `All ${select.id === 'category' ? 'categories' : 'stores'}` : option;
    select.appendChild(el);
  }
}

function update() {
  const filtered = applySort(applyFilters(DEALS, state), state.sort);
  renderDeals(grid, filtered);
  renderSummary(summary, filtered);
  const shown = document.getElementById('shown-count');
  if (shown) shown.textContent = String(filtered.length);
  countLine.textContent = filtered.length === DEALS.length
    ? `Showing all ${DEALS.length} deals`
    : `Showing ${filtered.length} of ${DEALS.length} deals`;
}

fillSelect(document.getElementById('category'), CATEGORIES);
fillSelect(document.getElementById('store'), STORES);

document.getElementById('search').addEventListener('input', (event) => {
  state.query = event.target.value;
  update();
});
document.getElementById('category').addEventListener('change', (event) => {
  state.category = event.target.value;
  update();
});
document.getElementById('store').addEventListener('change', (event) => {
  state.store = event.target.value;
  update();
});
document.getElementById('discount').addEventListener('change', (event) => {
  state.minDiscount = Number(event.target.value);
  document.getElementById('discount-label').textContent =
    state.minDiscount === 0 ? 'Any discount' : `${state.minDiscount}% off or more`;
  update();
});
document.getElementById('verdict').addEventListener('change', (event) => {
  state.verdict = event.target.value;
  update();
});
document.getElementById('sort').addEventListener('change', (event) => {
  state.sort = event.target.value;
  update();
});
document.getElementById('reset').addEventListener('click', () => {
  state.query = '';
  state.category = 'All';
  state.store = 'All';
  state.minDiscount = 0;
  state.verdict = 'All';
  state.sort = 'discount';
  document.getElementById('search').value = '';
  document.getElementById('category').value = 'All';
  document.getElementById('store').value = 'All';
  document.getElementById('discount').value = '0';
  document.getElementById('discount-label').textContent = 'Any discount';
  document.getElementById('verdict').value = 'All';
  document.getElementById('sort').value = 'discount';
  update();
});

update();
