(() => {
  "use strict";

  const form = document.querySelector("#lab-filters");
  const cards = [...document.querySelectorAll("[data-project]")];
  const resultCount = document.querySelector("#result-count");
  const emptyState = document.querySelector("#empty-state");

  if (!form || !resultCount || !emptyState || cards.length === 0) return;

  const selectedValue = (name) => {
    const selected = form.elements[name];
    return selected && selected.value ? selected.value : "all";
  };

  const updateProjects = () => {
    const type = selectedValue("type");
    const status = selectedValue("status");
    let visibleCount = 0;

    cards.forEach((card) => {
      const typeMatches = type === "all" || card.dataset.type === type;
      const statusMatches = status === "all" || card.dataset.status === status;
      const isVisible = typeMatches && statusMatches;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    const noun = visibleCount === 1 ? "experiment" : "experiments";
    resultCount.textContent = visibleCount === cards.length
      ? `Showing all ${cards.length} experiments`
      : `Showing ${visibleCount} ${noun}`;
    emptyState.hidden = visibleCount !== 0;
  };

  form.addEventListener("change", updateProjects);
  form.addEventListener("reset", () => window.requestAnimationFrame(updateProjects));
  updateProjects();
})();
