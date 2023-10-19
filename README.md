# Canvas drawing interface pure JS web component

`npm i canvasdraw-webcomponent`

Add it to the page:
```html
<canvas-with-controls width="500" height="500"></canvas-with-controls>
<script src="CanvasWithControls.js"></script>
```
If pulling from node_modules, `import 'canvasdraw-webcomponent'` in your main script, then link that source. The HTML tag will be added automatically

Extends HTMLElement natively.

This is mostly a primitive for building on top of. E.g. the css controls are limited.

- The unbundled script by default this works by fetching the html and css files associated on first run.
- The bundled script has the html and css pre-fetched (e.g. with npm install).

Pan with middle mouse click or alt+left click, zoom with scroll wheel or the slider.

## Test
Serve the index.html from this folder to test the component out.

![png](./Capture.PNG)

GPT 3.5 wrote it, I mostly just prompted.
