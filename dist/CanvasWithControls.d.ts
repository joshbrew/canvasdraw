export declare class CanvasWithControls extends HTMLElement {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    lineWidth: number;
    shadowRoot: any;
    fetch?: any;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    setup: () => Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
