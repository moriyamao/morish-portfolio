'use strict';
const form = document.querySelector('#estimate-form');
const money = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(value);
let current;
function updateEstimate() {
  const data = new FormData(form); current = TorqueEstimate.estimate(data.get('size'), data.get('package'), data.getAll('addon'));
  document.querySelector('#receipt-package').textContent = current.treatment.toUpperCase();
  document.querySelector('#receipt-size').textContent = `${current.size.toUpperCase()} / SAMPLE ESTIMATE`;
  const items = document.querySelector('#line-items'); items.replaceChildren();
  current.lines.forEach(line => { const row = document.createElement('div'); row.className = 'line-item'; const name = document.createElement('span'); name.textContent = line.name; const price = document.createElement('span'); price.textContent = money(line.amount); row.append(name, price); items.append(row); });
  document.querySelector('#estimate-total').textContent = money(current.total); document.querySelector('#save-status').textContent = '';
}
form.addEventListener('change', updateEstimate); updateEstimate();
document.querySelectorAll('[data-package]').forEach(button => button.addEventListener('click', () => {
  form.querySelector(`input[name="package"][value="${button.dataset.package}"]`).checked = true; updateEstimate(); document.querySelector('#estimate').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));
const slider = document.querySelector('#finish-range');
slider.addEventListener('input', () => { const amount = Number(slider.value); document.querySelector('#finish-overlay').style.clipPath = `inset(0 ${100 - amount}% 0 0)`; document.querySelector('#finish-line').style.left = `${amount}%`; document.querySelector('#finish-value').textContent = `${amount}%`; });
form.addEventListener('submit', event => {
  event.preventDefault(); updateEstimate();
  const text = `TORQUE — SAMPLE DETAILING ESTIMATE\n\n${current.lines.map(line => `${line.name}: ${money(line.amount)}`).join('\n')}\n\nEstimated total: ${money(current.total)}\n\nIllustrative PHP pricing only. No appointment or payment has been made.\nFinal scope and price require a real vehicle inspection.\nWebsite concept by Morish Macayan.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'torque-detail-estimate.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#save-status').textContent = 'Estimate prepared. Download requested; no booking was made.';
});
