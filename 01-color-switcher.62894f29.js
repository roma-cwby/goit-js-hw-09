const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body"),INTERVAL_DELAY:1e3,intervalId:null};t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,t.intervalId=setInterval((()=>{t.body.style=`background-color: #${Math.floor(16777215*Math.random()).toString(16)}`}),t.INTERVAL_DELAY)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(t.intervalId)}));
//# sourceMappingURL=01-color-switcher.62894f29.js.map