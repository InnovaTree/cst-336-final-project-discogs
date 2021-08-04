$(document).ready(function () {
  const albumID = getAlbumID();
  const title = $("#title").text();
  const image = $("#image").attr("src");

  // Initializes collection and wish buttons
  updateColBtn(albumID);
  updateWishBtn(albumID);

  /**
   * Displays wishlist add/remove button based on whether the album is
   * not present or present in the user's wishlist. Adds event listener
   * to resulting button.
   * @param {int} albumID Corresponds to albumid in Discogs' database
   */
  async function updateWishBtn(albumID) {
    let wishList = await getWishList();
    let match = isInCollection(wishList, albumID);
    let addString =
      "<button class='btn btn-primary' id='wsh-btn' value='add'>(+) Wishlist</button>";
    let remString =
      "<button class='btn btn-danger' id='wsh-btn' value='delete'>(-) Wishlist</button>";

    // Displays add button if wishlist is empty or album is not present
    if (wishList.length == 0 || !match) {
      $("#wishlist").html(addString);
    } else { // Displays remove button, otherwise
      $("#wishlist").html(remString);
    }
    document.getElementById("wsh-btn").addEventListener("click", updateWsh);
  }

  /**
   * Performs the same actions as updateWishBtn, but for the collections button.
   * @param {int} albumID Corresponds to albumid in Discogs' database
   */
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

  /**
   * Issues fetch request to collections API to add/remove a record based
   * on the value of the collections button.
   */
  async function updateCol() {
    await addAlbum(albumID, title, image);
    let action = $("#col-btn").val();
    let url = `/api/collection/update?albumid=${albumID}&action=${action}`;
    await fetch(url);
    updateColBtn(albumID);
  }

  /**
   * Performs the same function as updateCol() but for the wishlist API.
   */
  async function updateWsh() {
    await addAlbum(albumID, title, image);
    let action = $("#wsh-btn").val();
    let url = `/api/wishlist/update?albumid=${albumID}&action=${action}`;
    await fetch(url);
    updateWishBtn(albumID);
  }

  /**
   * Checks to see if an album is in a user's collection.
   * @param {object} collection JSON output of getCollection()
   * @param {int} albumID ID of album to be matched
   * @returns {bool} True if album is in collection, false otherwise
   */
  function isInCollection(collection, albumID) {
    for (const [key, object] of Object.entries(collection)) {
      if (albumID == object.albumid) {
        return true;
      }
    }
  }

  /**
   * Gets value of albumID from the browser's current address.
   * @returns {int} albumID ID associated with album in the Discogs database
   */
  function getAlbumID() {
    let rawPath = window.location.pathname;
    let pathArray = rawPath.split("/");
    let albumID = pathArray.pop();
    return albumID;
  }

  /**
   * Issues fetch request to album API to add a record to the album table.
   * @param {int} albumID ID of album to be added to album table
   * @param {string} title Album title
   * @param {string} image URL of album's cover image
   * @returns {object} Response from database
   */
  async function addAlbum(albumID, title, image) {
    let url = `/api/album/add?albumid=${albumID}&title=${title}&image=${image}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  /**
   * Issues fetch request to collection API to retrieve all
   * albumids associated with the current user.
   * @returns {object} JSON output
   */
  async function getCollection() {
    let url = `/api/collection/getcollection`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  /**
   * Performs the same function as getCollection() but with
   * the wishlist API.
   * @returns {object} JSON output
   */
  async function getWishList() {
    let url = `/api/wishlist/getwishlist`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
});
