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
    htmlString += '</div>'
    $("#content-body").html(htmlString);
    document.getElementById("col").classList.add("btn-danger");
  });

  $("#wsh").on("click", async function () {
    initButtons();
    let myWsh =  await getMyWsh();

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
    htmlString += '</div>'
    $("#content-body").html(htmlString);
    document.getElementById("wsh").classList.add("btn-danger");
  });

  $("#rev").on("click", async function () {
    initButtons();
    document.getElementById("rev").classList.add("btn-danger");
  });

  $("#search").on("click", async function () {
    initButtons();
    document.getElementById("search").classList.add("btn-danger");

    $("#content-title").html("");

    $("#content-body").html(`
      <form class="container" action="/search">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Album title..."
            name="query"
            id="query"
          />
        <span><button class="btn btn-primary">Search</button></span>
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
});
