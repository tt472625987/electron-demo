const Store = require("electron-store");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class DataStore extends Store {
  constructor(setting) {
    super(setting);
    this.tracks = [];
    this.tracks = this.get("tracks") || [];
  }

  saveTracks() {
    this.set("tracks", this.tracks);
    return this;
  }
  getTracks() {
    return this.get("tracks") || [];
  }

  addTracks(tracks) {
    const tracksWithProps = tracks
      .map((track) => {
        return {
          id: uuidv4(),
          path: track,
          fileName: path.basename(track),
        };
      })
      .filter((track) => {
        const currentTrackPath = this.getTracks().map((track) => track.path);
        return currentTrackPath.indexOf(track.path) < 0;
      });

    this.tracks = [...this.tracks, ...tracksWithProps];
    return this.saveTracks();
  }
}

module.exports = DataStore;
