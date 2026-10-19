/* Same sparse TF-IDF arithmetic as tutorialcheck/model.py. No code execution. */
(function (root) {
  function features(code) {
    const tokens = code.toLowerCase().match(/[a-z_][a-z_0-9]*/g) || [];
    return tokens.concat(tokens.slice(0, -1).map((word, i) => word + ' ' + tokens[i + 1]));
  }

  function predict(code, model) {
    const counts = new Map();
    for (const term of features(code)) counts.set(term, (counts.get(term) || 0) + 1);
    const weighted = [];
    let total = 0, known = 0;
    for (const [term, count] of counts) {
      total += count;
      if (!Object.prototype.hasOwnProperty.call(model.vocabulary, term)) continue;
      known += count;
      const index = model.vocabulary[term];
      weighted.push({ index, value: (1 + Math.log(count)) * model.idf[index] });
    }
    const length = Math.sqrt(weighted.reduce((sum, row) => sum + row.value ** 2, 0)) || 1;
    const contributors = weighted.map(row => ({ feature: model.terms[row.index], weight: row.value / length * model.coefficients[row.index] }));
    const logit = model.intercept + contributors.reduce((sum, row) => sum + row.weight, 0);
    const score = 1 / (1 + Math.exp(-Math.max(-700, Math.min(700, logit))));
    const coverage = known / Math.max(total, 1);
    const abstained = coverage < model.minimum_coverage || code.trim().length < 10;
    contributors.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
    return { risk_score: score, coverage, abstained, prediction: abstained ? null : Number(score >= model.threshold), contributors: contributors.slice(0, 6) };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { features, predict };
  else root.TutorialCheck = { features, predict };
})(typeof globalThis !== 'undefined' ? globalThis : this);
