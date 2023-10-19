(()=>{var k=`body {\r
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
`;var B=`<div id="component-container" class="container">\r
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
</div>`;var H=class extends HTMLElement{constructor(){super(),this.canvasWidth=800,this.canvasHeight=600,this.lineWidth=5,this.setup()}static get observedAttributes(){return["width","height","controls"]}attributeChangedCallback(e,n,l){e==="width"?(this.canvasWidth=parseInt(l),this.canvas&&(this.canvas.width=this.canvasWidth,this.ctx.lineWidth=this.lineWidth)):e==="height"?(this.canvasHeight=parseInt(l),this.canvas&&(this.canvas.height=this.canvasHeight,this.ctx.lineWidth=this.lineWidth)):e==="controls"&&(l&&l!=="false"?this.shadowRoot.getElementById("controls-container").style.display="":this.shadowRoot.getElementById("controls-container").style.display="none")}setup=async()=>{this.attachShadow({mode:"open"}),!k||!B||(this.shadowRoot.innerHTML=`
                    <style>
                        ${k}
                    </style>
                    ${B}
            `),this.canvas=this.shadowRoot.getElementById("canvas"),this.ctx=this.canvas.getContext("2d");let e=this.canvas,n=this.ctx,l=5;e.width=this.canvasWidth,e.height=this.canvasHeight;let r="crosshair";e.style.cursor=r;let m="#000000";n.strokeStyle="#000000",this.ctx.lineWidth=this.lineWidth,this.shadowRoot.getElementById("color-picker").addEventListener("input",t=>{m=t.target.value,this.ctx.strokeStyle=t.target.value}),this.shadowRoot.getElementById("clear-button").addEventListener("click",()=>{n.clearRect(0,0,e.width,e.height)});let R=this.shadowRoot.getElementById("zoom-range");R.addEventListener("input",t=>{let o=parseFloat(t.target.value);e.style.transform=`scale(${o})`});let f=!1,c=0,d=0,p=!1,h=1,s=0,a=0,b=0,v=0,x=!1,Y=t=>{let o=e.getBoundingClientRect(),i,w,E,W,L;if(t){let S=t.deltaY>0?-.1:.1;i=Math.min(Math.max(.1,h+S),l)}!t||x||i<1?(i=1,s=0,a=0,w=0,W=0,E=0,L=0,x=!1):(w=(t.clientX-o.left)/h-s,W=(t.clientY-o.top)/h-a,E=(t.clientX-o.left)/i-s,L=(t.clientY-o.top)/i-a),s+=w-E,a+=W-L,e.style.transform=`translate(${s}px, ${a}px) scale(${i})`,h=i,R.value=i};this.shadowRoot.getElementById("recenter-button").addEventListener("click",()=>{x=!0,Y()}),e.parentElement.addEventListener("wheel",t=>{t.preventDefault(),Y(t)}),e.addEventListener("mousedown",t=>{t.button===1||t.altKey?e.style.cursor="move":[c,d]=[t.offsetX*(this.canvasWidth/e.clientWidth),t.offsetY*(this.canvasHeight/e.clientHeight)]});let g=t=>{let o=t.offsetX*(this.canvasWidth/e.clientWidth),i=t.offsetY*(this.canvasHeight/e.clientHeight);n.fillRect(o-this.lineWidth/2,i-this.lineWidth/2,this.lineWidth,this.lineWidth)};e.parentElement.addEventListener("mousedown",t=>{t.button===1||t.altKey?(p=!0,b=t.clientX-s,v=t.clientY-a,e.parentElement.style.cursor="move"):(f=!0,u||(n.fillStyle=m,g(t),g(t),g(t)))});let I=t=>{if(u){n.lineCap="round",n.beginPath(),n.moveTo(typeof c=="number"?c:t.offsetX*(this.canvasWidth/e.clientWidth),typeof d=="number"?d:t.offsetY*(this.canvasHeight/e.clientHeight));let o=t.offsetX*(this.canvasWidth/e.clientWidth),i=t.offsetY*(this.canvasHeight/e.clientHeight);n.lineTo(o,i),n.stroke(),[c,d]=[o,i]}else n.fillStyle=m,g(t)};e.addEventListener("mousemove",t=>{f&&I(t)}),e.parentElement.addEventListener("mousemove",t=>{p&&(t.clientX-b!==0||t.clientY-v!==0)&&(s=t.clientX-b,a=t.clientY-v,e.style.transform=`translate(${s}px, ${a}px) scale(${h})`)}),e.addEventListener("mouseup",()=>{f=!1,c=void 0,d=void 0,e.style.cursor=r}),e.addEventListener("mouseout",()=>{f=!1}),e.parentElement.addEventListener("mouseup",()=>{p=!1,e.parentElement.style.cursor="default"}),e.parentElement.addEventListener("mouseout",()=>{p=!1});let u=!0,X=this.shadowRoot.getElementById("line-label"),M=this.shadowRoot.getElementById("line-width"),y=this.shadowRoot.getElementById("toggle-mode-button");y.addEventListener("click",()=>{u=!u,u?(y.innerHTML="Line Mode",X.innerHTML="Line Width:",r="crosshair"):(y.innerHTML="Pixel Mode",X.innerHTML="Pixel Size:",r="default"),e.style.cursor=r}),M.addEventListener("input",t=>{this.lineWidth=parseInt(t.target.value),n.lineWidth=this.lineWidth})};connectedCallback(){}disconnectedCallback(){}};customElements.define("canvas-with-controls",H);})();
