$(document).ready(async function () {
  const albumID = getAlbumID();
  var myReview;
  var allReview;

  initPage();

  $("#delete").on("click", async function(){
    
    await $.post("/api/review/update", {
      albumid: albumID,
      action: "delete",
    });;

    initPage();
  });

  $("#write").on("click", function () {
    $("#reviewText").html(`
      <label for="review" class="form-label">Write your review: </label>
      <textarea class="form-control mb-3" id="review" placeholder=""></textarea>
    `);
    $("#write").hide();
    $("#submit").show();
  });

  $("#submit").on("click", async function () {
    console.log("click");
    let reviewText = $("#review").val();

    if (myReview.length == 0) {
      await $.post("/api/review/update", {
        albumid: albumID,
        reviewtext: reviewText,
        action: "add",
      });
    } else {
      await $.post("/api/review/update", {
        albumid: albumID,
        reviewtext: reviewText,
        action: "modify",
      });
    }

    initPage();
  });

  $("#modify").on("click", async function () {
    let myReview = await getMyReview();
    $("#reviewText").html(`
    <label for="review" class="form-label">Modify your review: </label>
    <textarea class="form-control mb-3" id="review">${myReview[0].reviewtext}</textarea>
    `);
    $("#modify").hide();
    $("#delete").hide();
    $("#submit").show();
  });

  $("#delete").on("click", async function(){

  });

  async function initPage() {
    myReview = await getMyReview();
    allReview = await getAllReview(albumID);

    if (myReview.length == 0) {
      $("#reviewText").html("You have not written a review for this album!");
      $("#submit").hide();
      $("#write").show();
      $("#modify").hide();
      $("#delete").hide();
    } else {
      $("#reviewText").html(`
        <div class="p-3 border border-dark">
          <p>${myReview[0].reviewtext}</p>
          <hr>
          Written by <strong>You</strong>
        </div>
      `);
      $("#submit").hide();
      $("#write").hide();
      $("#modify").show();
      $("#delete").show();
    }

    if (allReview.length == 0) {
      $("#allReviews").html("Nobody else has written a review for this album!");
    } else {
      for (const [key, value] of Object.entries(allReview)) {
        $("#allReviews").html("");
        $("#allReviews").append(`
          <div class="p-3 border border-dark">
            <p>${value.reviewtext}</p>
            <hr>
            Written by <strong>${value.username}</strong>
          </div>
        `);
      }
    }
  }

  function getAlbumID() {
    let rawPath = window.location.pathname;
    let pathArray = rawPath.split("/");
    let albumID = pathArray.pop();
    return albumID;
  }

  async function getAllReview(albumID) {
    let url = `/api/review/getalbum?albumid=${albumID}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function getMyReview() {
    let url = "/api/review/getuser";
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function updateReview(albumID, reviewText, action) {
    console.log("Hello World!");
  }
});
