$(document).ready(async function () {
  const albumID = getAlbumID();
  var myReview;
  var allReview;

  await initPage();

  /**
   * Event listener for delete review button.
   */
  $("#delete").on("click", async function () {
    // Issues request to review API to delete review on click.
    await $.post("/api/review/update", {
      albumid: albumID,
      action: "delete",
    });

    // Uses jQuery to redisplay buttons on page.
    await initPage();
  });

  /**
   * Event listener for write review button. Generates textarea form
   * element.
   */
  $("#write").on("click", function () {
    $("#reviewText").html(`
      <label for="review" class="form-label">Write your review: </label>
      <textarea class="form-control mb-3" id="review" placeholder=""></textarea>
    `);
    $("#write").hide();
    $("#submit").show();
  });

  /**
   * Event listener for submit button.
   */
  $("#submit").on("click", async function () {
    let reviewText = $("#review").val();

    // Issues post request to add a record to album table if
    // user has not made any reviews or has not reviewed this album
    if (myReview.length == 0 || !alreadyReviewed(myReview)) {
      await $.post("/api/review/update", {
        albumid: albumID,
        reviewtext: reviewText,
        action: "add",
      });
    } else {
      // Issues post request to update record, otherwise
      await $.post("/api/review/update", {
        albumid: albumID,
        reviewtext: reviewText,
        action: "modify",
      });
    }

    await initPage();
  });

  /**
   * Event listener for modify review button. Displays prefilled
   * textarea on click.
   */
  $("#modify").on("click", async function () {
    let myReview = await getMyReview();
    let reviewText = findMyReview(myReview);

    $("#reviewText").html(`
    <label for="review" class="form-label">Modify your review: </label>
    <textarea class="form-control mb-3" id="review">${reviewText}</textarea>
    `);
    $("#modify").hide();
    $("#delete").hide();
    $("#submit").show();
  });

  /**
   * Initializes review page with correct options for user and
   * currently recorded reviews for the associated album.
   */
  async function initPage() {
    myReview = await getMyReview();
    allReview = await getAllReview(albumID);
    let reviewText = findMyReview(myReview);
    let myCol = await getCollection();
    let inCol = isInCollection(myCol, albumID);

    // User can only write reviews for albums in their collection
    if (!inCol) {
      $("#reviewText").html(
        "You can only write reviews for albums in your collection!"
      );
      $("#submit").hide();
      $("#write").hide();
      $("#modify").hide();
      $("#delete").hide();
    // informs user if they have not written a review for the album
    } else if (myReview.length == 0 || !alreadyReviewed(myReview)) {
      $("#reviewText").html("You have not written a review for this album!");
      $("#submit").hide();
      $("#write").show();
      $("#modify").hide();
      $("#delete").hide();
    // otherwise, displays previously written review
    } else {
      $("#reviewText").html(`
        <div class="p-3 border border-dark">
          <p>${reviewText}</p>
          <hr>
          Written by <strong>You</strong>
        </div>
      `);
      $("#submit").hide();
      $("#write").hide();
      $("#modify").show();
      $("#delete").show();
    }

    // Displays either reviews written by other users (including current user) or
    // a message stating that no reviews have been written.
    if (allReview.length == 0) {
      $("#allReviews").html("Nobody else has written a review for this album!");
    } else {
      $("#allReviews").html("");
      for (const [key, value] of Object.entries(allReview)) {
        $("#allReviews").append(`
          <div class="p-3 border border-dark mt-3">
            <p>${value.reviewtext}</p>
            <hr>
            Written by <strong>${value.username}</strong>
          </div>
        `);
      }
    }

    return true;
  }

  /**
   * Returns albumID based on current URL of browser.
   * @returns {int} albumID ID of album in Discogs database
   */
  function getAlbumID() {
    let rawPath = window.location.pathname;
    let pathArray = rawPath.split("/");
    let albumID = pathArray.pop();
    return albumID;
  }

  /**
   * Issues fetch request to album API to retrieve all reviews
   * associated with a given albumID.
   * @param {int} albumID ID of album in Discogs database
   * @returns {object} JSON object of response
   */
  async function getAllReview(albumID) {
    let url = `/api/review/getalbum?albumid=${albumID}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  /**
   * Issues fetch request to collection API to retrieve
   * all albumIDs associated with the current user's
   * collection.
   * @returns {object} JSON object of response
   */
  async function getCollection() {
    let url = `/api/collection/getcollection`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  /**
   * Checks to see if an album is in a user's collection.
   * @param {object} collection JSON object containing user's collection
   * @param {int} albumID ID of album in the Discogs database
   * @returns {bool} True if the album is in the user's collection and false, otherwise.
   */
  function isInCollection(collection, albumID) {
    for (const [key, object] of Object.entries(collection)) {
      if (albumID == object.albumid) {
        return true;
      }
    }
    return false;
  }

  /**
   * Issues fetch request to review API to retrieve album ID, title
   * and reviewText associated with current user.
   * @returns {object} JSON output of response
   */
  async function getMyReview() {
    let url = "/api/review/getuser";
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  /**
   * Checks albumID of current page against a user's collection.
   * @param {object} myReview Returned object from getMyReview()
   * @returns True if user has reviewed current album and false, otherwise
   */
  function alreadyReviewed(myReview) {
    for (const [key, value] of Object.entries(myReview)) {
      if (value.albumid == albumID) {
        return true;
      }
    }
    return false;
  }

  /**
   * Finds and returns a user's already written review for the current album.
   * @param {object} myReview Returned object from getMyReview()
   * @returns {string} reviewText user's review for the current album 
   * or False if none exist
   */
  function findMyReview(myReview) {
    for (const [key, value] of Object.entries(myReview)) {
      if (value.albumid == albumID) {
        return value.reviewtext;
      }
    }
    return false;
  }
});
