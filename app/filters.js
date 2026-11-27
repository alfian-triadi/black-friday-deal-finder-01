// Filter and sort logic for the deal finder: pure functions over the deal
// list, so the UI in render.js stays thin and the rules are testable.

import { discountOf, savedOf } from './deals.js';

export function applyFilters(deals, state) {
  const query = state.query.trim().toLowerCase();
  return deals.filter((deal) => {
    if (state.category !== 'All' && deal.category !== state.category) return false;
    if (state.store !== 'All' && deal.store !== state.store) return false;
    if (discountOf(deal) < state.minDiscount) return false;
    if (state.verdict !== 'All' && deal.verdict !== state.verdict) return false;
    if (query) {
      const haystack = `${deal.product} ${deal.store} ${deal.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function applySort(deals, sort) {
  const sorted = [...deals];
  if (sort === 'discount') sorted.sort((a, b) => discountOf(b) - discountOf(a));
  else if (sort === 'saved') sorted.sort((a, b) => savedOf(b) - savedOf(a));
  else if (sort === 'price-low') sorted.sort((a, b) => a.sale - b.sale);
  else if (sort === 'price-high') sorted.sort((a, b) => b.sale - a.sale);
  else sorted.sort((a, b) => discountOf(b) - discountOf(a));
  return sorted;
}

export function countByVerdict(deals) {
  const counts = { 'real-deal': 0, strong: 0, routine: 0 };
  for (const deal of deals) counts[deal.verdict] += 1;
  return counts;
}
