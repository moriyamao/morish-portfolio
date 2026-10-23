(function (root) {
  'use strict';
  const seats = { A1: 'shared', A2: 'shared', A4: 'shared', A5: 'shared', A7: 'shared', A8: 'shared', Q1: 'quiet', Q2: 'quiet', M1: 'meeting' };
  const rates = { shared: { day: 450, month: 6500 }, quiet: { day: 650, month: 9500 }, meeting: { hour: 900 } };
  function calculate({ seat, duration = 'day', hours = 1, start = 9 }) {
    if (!Object.hasOwn(seats, seat)) throw new RangeError('Choose an available sample seat');
    const type = seats[seat];
    if (type === 'meeting') {
      if (!Number.isInteger(hours) || hours < 1 || hours > 4 || !Number.isInteger(start) || start < 9 || start + hours > 18) throw new RangeError('Choose a meeting within 9 AM–6 PM, for 1–4 hours.');
      return { seat, type, duration: 'hour', hours, start, end: start + hours, total: rates.meeting.hour * hours };
    }
    if (!['day', 'month'].includes(duration)) throw new RangeError('Choose a day or calendar month');
    return { seat, type, duration, total: rates[type][duration] };
  }
  const api = { calculate, rates };
  if (typeof module === 'object' && module.exports) module.exports = api; else root.CommonGroundPlanner = api;
})(typeof globalThis === 'object' ? globalThis : this);
