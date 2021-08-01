$(document).ready( function(){
  function isFormValid(){
    $("#fnameFdbk").html("")
    $("#lnameFdbk").html("")
    $("#emailFdbk").html("")
    $("#usernameFdbk").html("")
    $("#pwdFdbk").html("")
    $("#pwdConfFdbk").html("")
    let isValid= true;
    let pw = /^(?=.*\d)(?=.*[A-Za-z]).{6,20}$/;
    let email = /^[^\s@]+@[^\s@]+$/;
    if ($("#fname").val()==""){
      isValid = false;
      $("#fnameFdbk").html(`<br>Please enter a first name.`)
    }
    if ($("#lname").val()==""){
      isValid = false;
      $("#lnameFdbk").html(`<br>Please enter a last name.`)
    }
    if (!$("#email").val().match(email)){
      isValid = false;
      $("#emailFdbk").html(`<br>Please enter a valid email address.`)
    }
    if ($("#username").val()==""){
      isValid = false;
      $("#usernameFdbk").html(`<br>Please enter a username.`)
    }
    if (!$("#password").val().match(pw)){
      isValid = false;
      $("#pwdFdbk").html(`<br>Password must be between 6 and 20 characters long and contain both numbers and letters.`)
    }
    if ($("#passwordConfirm").val()!=$("#password").val()){
      isValid = false;
      $("#pwdConfFdbk").html(`<br>Passwords do no match.`)
    }
    return isValid;
  }
  
  $("#submit").on("click", function(event){
    if (!isFormValid()) {
      event.preventDefault();
    }
  });

});

function recaptchaCallback() {
  $('#submit').removeAttr('disabled');
};