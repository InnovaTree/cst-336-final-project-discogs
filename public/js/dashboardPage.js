$(document).ready(async function () {
  $("#col").on("click", async function () {
    initButtons();
    document.getElementById("col").classList.add("btn-danger");
  });

  $("#wsh").on("click", async function () {
    initButtons();
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
});
