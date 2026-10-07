export class ParallaxElement extends HTMLElement {
  #target: HTMLElement | null = null;
  #strength = 0;
  #center = 0;
  #rafId = 0;

  #measure = () => {
    const rect = this.getBoundingClientRect();
    this.#center = rect.top + window.scrollY + rect.height / 2;
    this.#update();
  };

  #update = () => {
    this.#rafId = 0;

    if (!this.#target) {
      return;
    }

    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const offset = (viewportCenter - this.#center) * this.#strength;
    this.#target.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  };

  #onScroll = () => {
    if (!this.#rafId) {
      this.#rafId = requestAnimationFrame(this.#update);
    }
  };

  connectedCallback() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    this.#target = this.querySelector<HTMLElement>("[data-parallax-target]");
    this.#strength = Number(this.getAttribute("strength") ?? 0.2);
    this.#target?.style.setProperty("scale", String(1 + Math.abs(this.#strength)));

    window.addEventListener("scroll", this.#onScroll, { passive: true });
    window.addEventListener("resize", this.#measure);
    this.#measure();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.#onScroll);
    window.removeEventListener("resize", this.#measure);
    cancelAnimationFrame(this.#rafId);
  }
}

if (!customElements.get("parallax-element")) {
  customElements.define("parallax-element", ParallaxElement);
}
