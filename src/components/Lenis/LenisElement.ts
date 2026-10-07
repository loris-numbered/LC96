import Lenis from "lenis";

// Drives smooth scrolling over the window. Reduced motion is handled by Lenis itself.
export class LenisElement extends HTMLElement {
  #lenis: Lenis | null = null;
  #rafId = 0;

  #raf = (time: number) => {
    this.#lenis?.raf(time);
    this.#rafId = requestAnimationFrame(this.#raf);
  };

  connectedCallback() {
    this.#lenis = new Lenis({ anchors: true });
    this.#rafId = requestAnimationFrame(this.#raf);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.#rafId);
    this.#lenis?.destroy();
    this.#lenis = null;
  }
}

if (!customElements.get("lenis-scroll")) {
  customElements.define("lenis-scroll", LenisElement);
}
