$(document).ready( function(){
  function isFormValid(){
    $("#usernameFdbk").html("")
    $("#pwdFdbk").html("")
    let isValid= true;
    if ($("#username").val()==""){
      isValid = false;
      $("#usernameFdbk").html(`<br>Please enter your username.`)
    }
    if (!$("#password").val()==""){
      isValid = false;
      $("#pwdFdbk").html(`<br>Please enter your password.`)
    }
    return isValid;
  }
  $("#submit").on("click", function(event){
    if (!isFormValid()) {
      event.preventDefault();
    }
  });
});