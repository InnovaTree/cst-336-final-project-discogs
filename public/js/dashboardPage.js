$(document).ready(async function () {
  $("#col").on("click", async function () {
    initButtons();
    let myCol = await getMyCol();
    let htmlString = '<div class="row row-cols-5">';
    for (const [key, value] of Object.entries(myCol)) {
      htmlString += `
        <div class="col d-flex flex-column mt-3 text-center">
          <a href="/search/${value.albumid}">
            <img src="${value.image}" width="150" height="150">
          </a>
          <strong>${value.title}</strong>
        </div>
      `;
    }
    htmlString += "</div>";
    $("#content-body").html(htmlString);
    document.getElementById("col").classList.add("btn-danger");
  });

  $("#wsh").on("click", async function () {
    initButtons();
    let myWsh = await getMyWsh();

    let htmlString = '<div class="row row-cols-5">';
    for (const [key, value] of Object.entries(myWsh)) {
      htmlString += `
        <div class="col d-flex flex-column mt-3 text-center">
          <a href="/search/${value.albumid}">
            <img src="${value.image}" width="150" height="150">
          </a>
          <strong>${value.title}</strong>
        </div>
      `;
    }
    htmlString += "</div>";
    $("#content-body").html(htmlString);
    document.getElementById("wsh").classList.add("btn-danger");
  });

  $("#rev").on("click", async function () {
    initButtons();
    let myRev = await getMyRev();
    console.log(myRev);
    let htmlString = "";
    for (const [key, value] of Object.entries(myRev)) {
      htmlString += `
        <div class="my-3 d-flex flex-row align-items-center">
          <div class="d-flex flex-column text-center">
            <a href="/review/${value.albumid}">
              <img src="${value.image}" width="150" height="150">
            </a>
            <strong>${value.title}</strong>
          </div>
          <div class="p-3 mx-3 border border-dark container-fluid">
            ${value.reviewtext}
          </div>
        </div>
      `;
    }
    console.log(htmlString);
    $("#content-body").html(htmlString);
    document.getElementById("rev").classList.add("btn-danger");
  });

  $("#search").on("click", async function () {
    initButtons();
    document.getElementById("search").classList.add("btn-danger");

    $("#content-title").html("");

    $("#content-body").html(`
    <form class="container mt-5 mb-5 search-form" action="/search">
    <div class="search">
      <input
        type="text"
        class="form-control"
        placeholder="Enter Search..."
        name="query"
        id="query"
      />
      <select class="form-select" id="search-select" name="type">
        <option value="title">Search by...</option>
        <option value="title">Title</option>
        <option value="barcode">Barcode</option>
        <option value="catno">Catalogue Number</option>
      </select>
      <button class="btn btn-primary">Search</button>
    </div>
  </form>
    `);
  });

  function initButtons() {
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("btn-danger");
      buttons[i].classList.add("btn-primary");
    }
  }

  async function getMyCol() {
    let url = "/api/collection/getdetailed";
    let response = fetch(url);
    let data = (await response).json();
    return data;
  }

  async function getMyWsh() {
    let url = "/api/wishlist/getdetailed";
    let response = fetch(url);
    let data = (await response).json();
    return data;
  }

  async function getMyRev() {
    let url = "/api/review/getdetailed";
    let response = fetch(url);
    let data = (await response).json();
    return data;
  }
});
