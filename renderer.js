const { ipcRenderer } = require('electron')
document.getElementById("content").innerText=process;

window.addEventListener('DOMContentLoaded',()=>{
    ipcRenderer.send('message','hello Main');

    ipcRenderer.on('replay',(event,arg)=>{
        console.log(arg);
        document.getElementById('message').innerText=arg;
    })

})

