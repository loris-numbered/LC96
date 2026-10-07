const DELAY_MS = 1200;

export class GridElement extends HTMLElement {
  #delaying = false;

  #onKeydown = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== "g" || event.repeat || event.metaKey || event.ctrlKey || event.altKey || this.#delaying) {
      return;
    }

    this.classList.toggle("is-visible");
    this.#delaying = true;
    setTimeout(() => {
      this.#delaying = false;
    }, DELAY_MS);
  };

  connectedCallback() {
    window.addEventListener("keydown", this.#onKeydown);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.#onKeydown);
  }
}

if (!customElements.get("debug-grid")) {
  customElements.define("debug-grid", GridElement);
}
