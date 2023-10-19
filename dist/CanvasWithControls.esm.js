var B=`body {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  height: 100vh;\r
  margin: 0;\r
  background-color: #f7f7f7;\r
  font-family: Arial, sans-serif;\r
}\r
\r
.container {\r
  width: 100%;\r
  max-width: 800px;\r
  padding: 20px;\r
  box-sizing: border-box;\r
  background-color: white;\r
  border-radius: 10px;\r
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r
}\r
\r
.canvas-container {\r
  overflow: hidden;\r
}\r
\r
.canvas-container canvas {\r
  border:1px solid black;\r
  width:99%;\r
}\r
\r
.controls {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: 10px;\r
  margin-bottom: 20px;\r
}\r
\r
.input-group {\r
  display: flex;\r
  align-items: center;\r
  gap: 5px;\r
}\r
\r
#toggle-mode-button,\r
#clear-button,\r
#recenter-button {\r
  background-color: #4caf50;\r
  border: none;\r
  color: white;\r
  padding: 10px 20px;\r
  text-align: center;\r
  text-decoration: none;\r
  font-size: 16px;\r
  cursor: pointer;\r
  border-radius: 5px;\r
  transition: background-color 0.3s ease;\r
}\r
\r
#toggle-mode-button:hover,\r
#clear-button:hover,\r
#recenter-button:hover {\r
  background-color: #45a049;\r
}\r
\r
.controls input[type="number"] {\r
  width: 50px;\r
  padding: 8px;\r
  border-radius: 5px;\r
  border: 1px solid #ccc;\r
}\r
\r
.controls input[type="color"] {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  border: none;\r
}\r
`;var T=`<div id="component-container" class="container">\r
    <div id="controls-container" class="controls">\r
    <label for="color-picker">Color:</label>\r
        <input type="color" id="color-picker">\r
        <button id="toggle-mode-button">Line Mode</button>\r
        <div class="input-group">\r
            <label id="line-label" for="line-width">Line Width:</label>\r
            <input type="number" id="line-width" min="1" value="5">\r
        </div>\r
        <button id="clear-button">Clear Canvas</button>\r
        <button id="recenter-button">Recenter</button>\r
        <div class="input-group">\r
            <label for="zoom-range">Zoom:</label>\r
            <input type="range" id="zoom-range" min="1" max="5" step="0.1" value="1">\r
        </div>\r
    </div>\r
    <div class="canvas-container">\r
        <canvas id="canvas"></canvas>\r
    </div>\r
</div>`;var H=class extends HTMLElement{canvas;ctx;canvasWidth;canvasHeight;lineWidth;shadowRoot;fetch;constructor(){super(),this.canvasWidth=800,this.canvasHeight=600,this.lineWidth=5,this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
            <style>
                ${B}
            </style>
            ${T}
            `}static get observedAttributes(){return["width","height","controls"]}attributeChangedCallback(e,n,l){e==="width"?(this.canvasWidth=parseInt(l),this.canvas&&(this.canvas.width=this.canvasWidth,this.ctx.lineWidth=this.lineWidth)):e==="height"?(this.canvasHeight=parseInt(l),this.canvas&&(this.canvas.height=this.canvasHeight,this.ctx.lineWidth=this.lineWidth)):e==="controls"&&(l&&l!=="false"?this.shadowRoot.getElementById("controls-container").style.display="":this.shadowRoot.getElementById("controls-container").style.display="none")}setup=async()=>{this.fetch&&await this.fetch,this.canvas=this.shadowRoot.getElementById("canvas"),this.ctx=this.canvas.getContext("2d");let e=this.canvas,n=this.ctx,l=5;e.width=this.canvasWidth,e.height=this.canvasHeight;let r="crosshair";e.style.cursor=r;let g="#000000";n.strokeStyle="#000000",this.ctx.lineWidth=this.lineWidth,this.shadowRoot.getElementById("color-picker").addEventListener("input",t=>{g=t.target.value,this.ctx.strokeStyle=t.target.value}),this.shadowRoot.getElementById("clear-button").addEventListener("click",()=>{n.clearRect(0,0,e.width,e.height)});let M=this.shadowRoot.getElementById("zoom-range");M.addEventListener("input",t=>{let s=parseFloat(t.target.value);e.style.transform=`scale(${s})`});let f=!1,c=0,d=0,p=!1,h=1,a=0,o=0,b=0,v=0,x=!1,k=t=>{let s=e.getBoundingClientRect(),i,E,w,L,W;if(t){let C=t.deltaY>0?-.1:.1;i=Math.min(Math.max(.1,h+C),l)}!t||x||i<1?(i=1,a=0,o=0,E=0,L=0,w=0,W=0,x=!1):(E=(t.clientX-s.left)/h-a,L=(t.clientY-s.top)/h-o,w=(t.clientX-s.left)/i-a,W=(t.clientY-s.top)/i-o),a+=E-w,o+=L-W,e.style.transform=`translate(${a}px, ${o}px) scale(${i})`,h=i,M.value=i};this.shadowRoot.getElementById("recenter-button").addEventListener("click",()=>{x=!0,k()}),e.parentElement.addEventListener("wheel",t=>{t.preventDefault(),k(t)}),e.addEventListener("mousedown",t=>{t.button===1||t.altKey?e.style.cursor="move":[c,d]=[t.offsetX*(this.canvasWidth/e.clientWidth),t.offsetY*(this.canvasHeight/e.clientHeight)]});let m=t=>{let s=t.offsetX*(this.canvasWidth/e.clientWidth),i=t.offsetY*(this.canvasHeight/e.clientHeight);n.fillRect(s-this.lineWidth/2,i-this.lineWidth/2,this.lineWidth,this.lineWidth)};e.parentElement.addEventListener("mousedown",t=>{t.button===1||t.altKey?(p=!0,b=t.clientX-a,v=t.clientY-o,e.parentElement.style.cursor="move"):(f=!0,u||(n.fillStyle=g,m(t),m(t),m(t)))});let Y=t=>{if(u){n.lineCap="round",n.beginPath(),n.moveTo(typeof c=="number"?c:t.offsetX*(this.canvasWidth/e.clientWidth),typeof d=="number"?d:t.offsetY*(this.canvasHeight/e.clientHeight));let s=t.offsetX*(this.canvasWidth/e.clientWidth),i=t.offsetY*(this.canvasHeight/e.clientHeight);n.lineTo(s,i),n.stroke(),[c,d]=[s,i]}else n.fillStyle=g,m(t)};e.addEventListener("mousemove",t=>{f&&Y(t)}),e.parentElement.addEventListener("mousemove",t=>{p&&(t.clientX-b!==0||t.clientY-v!==0)&&(a=t.clientX-b,o=t.clientY-v,e.style.transform=`translate(${a}px, ${o}px) scale(${h})`)}),e.addEventListener("mouseup",()=>{f=!1,c=void 0,d=void 0,e.style.cursor=r}),e.addEventListener("mouseout",()=>{f=!1}),e.parentElement.addEventListener("mouseup",()=>{p=!1,e.parentElement.style.cursor="default"}),e.parentElement.addEventListener("mouseout",()=>{p=!1});let u=!0,R=this.shadowRoot.getElementById("line-label"),X=this.shadowRoot.getElementById("line-width"),y=this.shadowRoot.getElementById("toggle-mode-button");y.addEventListener("click",()=>{u=!u,u?(y.innerHTML="Line Mode",R.innerHTML="Line Width:",r="crosshair"):(y.innerHTML="Pixel Mode",R.innerHTML="Pixel Size:",r="default"),e.style.cursor=r}),X.addEventListener("input",t=>{this.lineWidth=parseInt(t.target.value),n.lineWidth=this.lineWidth})};connectedCallback(){this.setup()}disconnectedCallback(){}};customElements.define("canvas-with-controls",H);export{H as CanvasWithControls};
