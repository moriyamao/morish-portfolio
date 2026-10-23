'use strict';
const money = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(value);
const form = document.querySelector('#planner-form');
const date = document.querySelector('#visit-date');
const today = new Date(); const localDay = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; date.min = localDay; date.value = localDay;
let selectedSeat = 'A1'; let current;
function updatePlan() {
  const meeting = selectedSeat === 'M1';
  document.querySelector('#desk-duration').hidden = meeting; document.querySelector('#meeting-duration').hidden = !meeting;
  const start = Number(document.querySelector('#start').value); const hourSelect = document.querySelector('#hours');
  [...hourSelect.options].forEach(option => { option.disabled = start + Number(option.value) > 18; });
  if (start + Number(hourSelect.value) > 18) hourSelect.value = String(18 - start);
  current = CommonGroundPlanner.calculate({ seat: selectedSeat, duration: document.querySelector('#duration').value, hours: Number(hourSelect.value), start });
  const labels = { shared: 'Shared desk', quiet: 'Quiet desk', meeting: 'Idea Room' };
  const descriptions = { shared: 'A place at the common table.', quiet: 'A little space for focused work.', meeting: 'A private room for up to 6 people.' };
  document.querySelector('#selected-name').textContent = `${labels[current.type]} ${selectedSeat}`;
  document.querySelector('#selected-description').textContent = descriptions[current.type];
  document.querySelector('#plan-total').textContent = money(current.total); document.querySelector('#plan-status').textContent = '';
  document.querySelectorAll('[data-seat]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.seat === selectedSeat)));
}
document.querySelectorAll('[data-seat]').forEach(button => button.addEventListener('click', () => { selectedSeat = button.dataset.seat; updatePlan(); }));
form.addEventListener('change', updatePlan); updatePlan();
let frequency = 'daily';
document.querySelectorAll('[data-frequency]').forEach(button => button.addEventListener('click', () => {
  frequency = button.dataset.frequency;
  document.querySelectorAll('[data-frequency]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-price]').forEach(item => { const type = item.dataset.price; item.textContent = money(CommonGroundPlanner.rates[type][type === 'meeting' ? 'hour' : frequency === 'monthly' ? 'month' : 'day']); });
  document.querySelectorAll('.price-period').forEach(item => { item.textContent = frequency === 'monthly' ? '/ MONTH' : '/ DAY'; });
}));
function pickType(type) { selectedSeat = { shared: 'A1', quiet: 'Q1', meeting: 'M1' }[type]; document.querySelector('#duration').value = frequency === 'monthly' ? 'month' : 'day'; updatePlan(); }
document.querySelectorAll('[data-pick]').forEach(button => button.addEventListener('click', () => { pickType(button.dataset.pick); document.querySelector('#planner').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }));
const spaces = {
  shared: ['assets/lounge.jpg', 'THE COMMON TABLE', 'SHARED DESKS / FLEXIBLE SEATING', 'Pick a communal desk, settle in, and work at your own pace. A good fit for flexible schedules and people who like a little company.', 'Try a shared desk in the planner ↗'],
  quiet: ['assets/hero.jpg', 'THE QUIET CORNER', 'QUIET DESKS / INDIVIDUAL FOCUS', 'A desk away from the bustle of the common table. Put your headphones on, open your notebook, and make room for the work that takes concentration.', 'Try a quiet desk in the planner ↗'],
  meeting: ['assets/lounge.jpg', 'THE IDEA ROOM', 'PRIVATE ROOM / UP TO 6 PEOPLE', 'Bring a small team together for a conversation, workshop, or working session. Choose your hours in the planner to see the sample room cost.', 'Try the idea room in the planner ↗']
};
let activeSpace = 'shared';
document.querySelectorAll('[data-space]').forEach(button => button.addEventListener('click', () => {
  activeSpace = button.dataset.space; const [image, label, meta, description, link] = spaces[activeSpace];
  document.querySelectorAll('[data-space]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const photo = document.querySelector('#space-image'); photo.src = image; photo.alt = `Illustrative coworking photograph for ${label.toLowerCase()}`;
  document.querySelector('#space-image-label').textContent = label; document.querySelector('#space-meta').textContent = meta; document.querySelector('#space-description').textContent = description; document.querySelector('#space-plan-link').textContent = link;
}));
document.querySelector('#space-plan-link').addEventListener('click', () => pickType(activeSpace));
form.addEventListener('submit', event => {
  event.preventDefault(); updatePlan();
  if (!date.checkValidity() || date.value < localDay) { date.reportValidity(); return; }
  const schedule = current.type === 'meeting' ? `${current.hours} hour(s), ${current.start}:00–${current.end}:00` : current.duration === 'month' ? 'One calendar month starting on the selected date' : 'One day, 9 AM–6 PM';
  const text = `COMMON GROUND — SAMPLE WORKDAY PLAN\n\nSpace: ${document.querySelector('#selected-name').textContent}\nDate: ${date.value}\nSchedule: ${schedule}\nSample total: ${money(current.total)}\n\nIllustrative availability and pricing only. This is not a reservation.\nNo payment has been collected.\nWebsite concept by Morish Macayan.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'common-ground-workday-plan.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#plan-status').textContent = 'Your plan is prepared. Download requested; no seat was reserved.';
});
