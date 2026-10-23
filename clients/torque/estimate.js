(function (root) {
  'use strict';
  const packages = { reset: { name: 'Reset', price: 1800 }, refine: { name: 'Refine', price: 5500 }, shield: { name: 'Shield', price: 12500 } };
  const sizes = { sedan: { name: 'Sedan', multiplier: 1 }, suv: { name: 'SUV', multiplier: 1.25 }, large: { name: 'Large', multiplier: 1.5 } };
  const extras = { engine: { name: 'Engine bay clean', price: 800 }, leather: { name: 'Leather conditioning', price: 1200 }, glass: { name: 'Glass water-spot treatment', price: 1000 } };
  function estimate(size, treatment, addons = []) {
    if (!Object.hasOwn(sizes, size) || !Object.hasOwn(packages, treatment)) throw new RangeError('Unknown vehicle or treatment');
    if (!Array.isArray(addons) || addons.some(key => !Object.hasOwn(extras, key))) throw new RangeError('Unknown add-on');
    const selected = [...new Set(addons)];
    const base = Math.round(packages[treatment].price * sizes[size].multiplier);
    const lines = [{ name: `${packages[treatment].name} / ${sizes[size].name}`, amount: base }, ...selected.map(key => ({ name: extras[key].name, amount: extras[key].price }))];
    return { size: sizes[size].name, treatment: packages[treatment].name, lines, total: lines.reduce((sum, line) => sum + line.amount, 0) };
  }
  const api = { estimate };
  if (typeof module === 'object' && module.exports) module.exports = api; else root.TorqueEstimate = api;
})(typeof globalThis === 'object' ? globalThis : this);
