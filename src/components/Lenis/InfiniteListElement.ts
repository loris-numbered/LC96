import Lenis from "lenis";

/** Lenis's px/frame, smoothed and clamped, published as `--velocity`. */
const VELOCITY_MAX = 40;
const VELOCITY_SMOOTHING = 0.1;
const VELOCITY_REST = 0.05;

export class InfiniteListElement extends HTMLElement {
  #lenis: Lenis | null = null;
  #rafId = 0;
  #content: HTMLElement | null = null;
  #clones: HTMLElement | null = null;
  #velocity = 0;
  #still = false;

  #raf = (time: number) => {
    const lenis = this.#lenis;

    if (lenis) {
      lenis.raf(time);
      this.#publishVelocity(lenis.velocity);
    }

    this.#rafId = requestAnimationFrame(this.#raf);
  };

  #publishVelocity(current: number) {
    if (this.#still) {
      return;
    }

    const target = Math.max(-VELOCITY_MAX, Math.min(VELOCITY_MAX, current));
    const next = this.#velocity + (target - this.#velocity) * VELOCITY_SMOOTHING;
    const settled = Math.abs(next) < VELOCITY_REST ? 0 : next;

    if (settled === this.#velocity) {
      return;
    }

    this.#velocity = settled;
    this.style.setProperty("--velocity", String(settled));
  }

  #onResize = () => {
    this.#fill();
    this.#lenis?.resize();
  };

  connectedCallback() {
    this.#content = this.querySelector<HTMLElement>("[data-content]");
    this.#clones = this.querySelector<HTMLElement>("[data-clones]");

    if (!this.#content || !this.#clones) {
      return;
    }

    this.#still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.#fill();
    this.#lenis = new Lenis({ wrapper: this, content: this.#content, infinite: true, syncTouch: true });
    this.#rafId = requestAnimationFrame(this.#raf);
    window.addEventListener("resize", this.#onResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.#onResize);
    cancelAnimationFrame(this.#rafId);
    this.#lenis?.destroy();
    this.#lenis = null;
    this.#velocity = 0;
    this.style.removeProperty("--velocity");
  }

  // Enough copies of the period to cover one viewport, so the clipped clone zone is never short.
  #fill() {
    const period = this.#content?.firstElementChild;
    const clones = this.#clones;

    if (!period || !clones) {
      return;
    }

    clones.replaceChildren();
    clones.style.height = `${this.clientHeight}px`;

    const count = Math.ceil(this.clientHeight / Math.max(period.clientHeight, 1)) + 1;

    for (let i = 0; i < count; i++) {
      const clone = period.cloneNode(true) as Element;

      for (const link of clone.querySelectorAll("a")) {
        link.tabIndex = -1;
      }

      clones.append(clone);
    }
  }
}

if (!customElements.get("infinite-list")) {
  customElements.define("infinite-list", InfiniteListElement);
}
