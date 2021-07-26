import * as col from "./collections.js";

$(document).ready(function () {
  const albumID = getAlbumID();
  updateColBtn(albumID);
});

async function updateColBtn(albumID) {
  console.log("Loop");
  let collection = await col.getCollection();
  let match = isInCollection(collection, albumID)
  let addString =
    "<button class='btn btn-primary' id='col-btn' value='add'>Add to Collection</button>";
  let remString =
    "<button class='btn btn-danger' id='col-btn' value='delete'> Remove from Collection</button>";

  if (collection.length == 0 || !match) {
    $("#collections").html(addString);
  } else {
    $("#collections").html(remString);
  }

  document.getElementById("col-btn").addEventListener("click", updateCol);
}

async function updateCol(){
  let albumID = getAlbumID();
  let action = $("#col-btn").val();
  let url = `/api/collection/update?albumid=${albumID}&action=${action}`;
  let response = await fetch(url);
  updateColBtn(albumID);
}

function isInCollection(collection, albumID){
  for(const [key, object] of Object.entries(collection)){
    return albumID == object.albumid;
  }
}

function getAlbumID() {
  let rawPath = window.location.pathname;
  let pathArray = rawPath.split("/");
  let albumID = pathArray.pop();
  return albumID;
}
