
const { app, BrowserWindow, ipcMain } = require('electron')

const { $ } = require('./helper.js')
const path = require('path')
const { ipcRenderer } = require('electron')


let  musicFilesPath=[]

$("select-music").addEventListener("click", () => {
    ipcRenderer.send("open-music-file", ["123dfaswer12312dsf"]);
})

$("add-music").addEventListener("click", () => {
     
    ipcRenderer.send("add-tracks",musicFilesPath);

})

const renderListHTML = (paths) => {
    const musicList = $("musicList");
    const musicItemsHTML = paths.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '');

    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`;


}
 
ipcRenderer.on("selected-file", (event, path) => {

    $("message").innerText += event + path;

    if (Array.isArray(path)) {
      
        renderListHTML(path);
        musicFilesPath=path;
    }

})