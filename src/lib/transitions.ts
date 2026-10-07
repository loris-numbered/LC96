/** Mirrors the 1.75s page transition in src/styles/global.css. Loaded by Base.astro so the swap is always timed. */
export const PAGE_TRANSITION_MS = 1750;

let startedAt = Number.NEGATIVE_INFINITY;

document.addEventListener("astro:before-swap", () => {
  startedAt = performance.now();
});

/** Milliseconds until the current page transition ends; 0 on a cold load or once it is over. */
export function transitionRemaining() {
  return Math.max(0, PAGE_TRANSITION_MS - (performance.now() - startedAt));
}
