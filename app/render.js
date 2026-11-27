// Rendering for the deal finder: builds the deal cards and the summary bar
// from the filtered deal list. No network calls: everything rendered here
// comes from deals.js, and store links are plain <a> links.

import { DEALS, VERDICTS, discountOf, savedOf } from './deals.js';
import { countByVerdict } from './filters.js';

export function money(amount) {
  return '$' + amount.toFixed(2).replace(/\.00$/, '');
}

function verdictBadge(deal) {
  const meta = VERDICTS[deal.verdict];
  return `<span class="badge badge-${deal.verdict}">${meta.label}</span>`;
}

function dealCard(deal) {
  const pct = discountOf(deal);
  return `<article class="card">
    <div class="card-top">
      <span class="store">${deal.store}</span>
      <span class="category">${deal.category}</span>
      ${verdictBadge(deal)}
    </div>
    <h2>${deal.product}</h2>
    <p class="prices">
      <span class="sale">${money(deal.sale)}</span>
      <span class="regular">${money(deal.regular)}</span>
      <span class="off">−${pct}%</span>
    </p>
    <p class="saved">You save ${money(savedOf(deal))}</p>
    <p class="verdict-note">${deal.verdictNote}</p>
    <p class="meta">Price checked ${deal.checked || '27 Nov 2026'} · Source: ${deal.source}</p>
    <a class="cta" href="${deal.link}" target="_blank" rel="noopener">View deal at ${deal.store} →</a>
  </article>`;
}

export function renderSummary(el, deals) {
  const counts = countByVerdict(DEALS);
  const totalSaved = DEALS.reduce((sum, d) => sum + savedOf(d), 0);
  el.innerHTML = `<strong>${DEALS.length} verified deals</strong> · ${counts['real-deal']} real deals · ` +
    `${counts.strong} strong prices · ${counts.routine} routine sale · ` +
    `up to ${money(totalSaved)} total savings if you bought them all · ` +
    `showing <strong id="shown-count">${deals.length}</strong>`;
}

export function renderDeals(el, deals) {
  if (deals.length === 0) {
    el.innerHTML = '<p class="empty">No deals match those filters. Try widening the search or lowering the minimum discount.</p>';
    return;
  }
  el.innerHTML = deals.map(dealCard).join('');
}
