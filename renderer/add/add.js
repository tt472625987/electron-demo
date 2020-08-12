const { $ } = require("../helper");
const { ipcRenderer } = require("electron");
const path = require("path");

let musicFilesPath = [];

$("select-music").addEventListener("click", () => {
  ipcRenderer.send("handle-open-music-file");
});

// 渲染方法
const renderListHtml = (paths) => {
  const musicList = $("musicList");
  const musicItemHTML = paths.reduce((html, music) => {
    html += `<li class="list-group-item">${path.basename(music)}</li>`;
    return html;
  }, "");
  musicList.innerHTML = `<ul class="list-group">${musicItemHTML}</ul>`;
};

ipcRenderer.on("handle-select-file", (event, path) => {
  if (Array.isArray(path)) {
    renderListHtml(path);
    musicFilesPath = path;
  }
});

$("require-music").addEventListener("click", () => {
  ipcRenderer.send("handle-require-music-file", musicFilesPath);
});
