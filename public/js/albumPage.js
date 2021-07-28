$(document).ready(function () {
  const albumID = getAlbumID();
  const title = $("#title").text();
  const image = $("#image").attr("src");

  updateColBtn(albumID);
  updateWishBtn(albumID);

  async function updateWishBtn(albumID) {
    let wishList = await getWishList();
    let match = isInCollection(wishList, albumID);
    let addString =
      "<button class='btn btn-primary' id='wsh-btn' value='add'>(+) Wishlist</button>";
    let remString =
      "<button class='btn btn-danger' id='wsh-btn' value='delete'>(-) Wishlist</button>";

    if (wishList.length == 0 || !match) {
      $("#wishlist").html(addString);
    } else {
      $("#wishlist").html(remString);
    }
    document.getElementById("wsh-btn").addEventListener("click", updateWsh);
  }

  async function updateColBtn(albumID) {
    let collection = await getCollection();
    let match = isInCollection(collection, albumID);
    let addString =
      "<button class='btn btn-primary' id='col-btn' value='add'>(+) Collection</button>";
    let remString =
      "<button class='btn btn-danger' id='col-btn' value='delete'>(-) Collection</button>";

    if (collection.length == 0 || !match) {
      $("#collections").html(addString);
    } else {
      $("#collections").html(remString);
    }
    document.getElementById("col-btn").addEventListener("click", updateCol);
  }

  async function updateCol() {
    await addAlbum(albumID, title, image);
    let action = $("#col-btn").val();
    let url = `/api/collection/update?albumid=${albumID}&action=${action}`;
    await fetch(url);
    updateColBtn(albumID);
  }

  async function updateWsh() {
    await addAlbum(albumID, title, image);
    let action = $("#wsh-btn").val();
    let url = `/api/wishlist/update?albumid=${albumID}&action=${action}`;
    await fetch(url);
    updateWishBtn(albumID);
  }

  function isInCollection(collection, albumID) {
    for (const [key, object] of Object.entries(collection)) {
      if (albumID == object.albumid) {
        return true;
      }
    }
  }

  function getAlbumID() {
    let rawPath = window.location.pathname;
    let pathArray = rawPath.split("/");
    let albumID = pathArray.pop();
    return albumID;
  }

  async function addAlbum(albumID, title, image) {
    let url = `/api/album/add?albumid=${albumID}&title=${title}&image=${image}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function getCollection() {
    let url = `/api/collection/getcollection`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function getWishList() {
    let url = `/api/wishlist/getwishlist`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
});
