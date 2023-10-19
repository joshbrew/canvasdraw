# Canvas drawing interface pure JS web component

`npm i canvasdraw-webcomponent`

Add it to the page:
```html
<canvas-with-controls></canvas-with-controls>
<script src="CanvasWithControls.js"></script>
```
Extends HTMLElement natively.

This is mostly a primitive for building on top of.

- The unbundled script by default this works by fetching the html and css files associated on first run.
- The bundled script has the html and css pre-fetched (e.g. with npm install).

## Test
Serve the index.html from this folder to test the component out.

![png](./Capture.PNG)

GPT 3.5 wrote it, I mostly just prompted.