export class CanvasWithControls extends HTMLElement {
    static get observedAttributes(): string[];
    canvasWidth: number;
    canvasHeight: number;
    lineWidth: number;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    setup: () => Promise<void>;
    canvas: HTMLElement;
    ctx: any;
    connectedCallback(): void;
    fetch: Promise<void>;
    disconnectedCallback(): void;
}
