const { ipcRenderer } = require("electron");

const { $ } = require("../helper");

$("add_button").addEventListener("click", () => {
  ipcRenderer.send("handle-add-music-window");
});

const renderListHTML = (tracks) => {
  const tracksList = $("tracksList");

  const tracksListHTML = tracks.reduce((html, track) => {
    html += `
    <li class="row music-track list-group-item d-flex justify-content-between align-items-center">
      <div class="col-10">
        <i class="fa fa-music mr-2 text-secondary" aria-hidden="true"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="fa fa-play mr-3" aria-hidden="true"></i>
        <i class="fa fa-trash-alt" aria-hidden="true"></i>
      </div>
    </li>`;
    return html;
  }, "");

  tracksList.innerHTML = tracks.length
    ? `<ul calss='list-group'>${tracksListHTML}</ul>`
    : `<div class='alert alert-primary'>还没有添加任何音乐</div>`;
};

ipcRenderer.on("getTracks", (event, tracks) => {
  renderListHTML(tracks);
});
