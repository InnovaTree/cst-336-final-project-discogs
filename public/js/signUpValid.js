$(document).ready( function(){
  
  /**
   * Form validation function for the signup page
   * @returns {bool} True if validation passed, false otherwise
   */
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

    // Returns false if first name is blank
    if ($("#fname").val()==""){
      isValid = false;
      $("#fnameFdbk").html(`<br>Please enter a first name.`)
    }

    // Returns false if last name is blank
    if ($("#lname").val()==""){
      isValid = false;
      $("#lnameFdbk").html(`<br>Please enter a last name.`)
    }

    // Returns false if email does not match correct format
    if (!$("#email").val().match(email)){
      isValid = false;
      $("#emailFdbk").html(`<br>Please enter a valid email address.`)
    }

    // Returns false if username is blank
    if ($("#username").val()==""){
      isValid = false;
      $("#usernameFdbk").html(`<br>Please enter a username.`)
    }

    // Returns false if password does not match correct format
    if (!$("#password").val().match(pw)){
      isValid = false;
      $("#pwdFdbk").html(`<br>Password must be between 6 and 20 characters long and contain both numbers and letters.`)
    }

    // Returns false if both passwords do not match
    if ($("#passwordConfirm").val()!=$("#password").val()){
      isValid = false;
      $("#pwdConfFdbk").html(`<br>Passwords do no match.`)
    }
    return isValid;
  }
  
  /**
   * Event listener for form submission button
   */
  $("#submit").on("click", function(event){
    if (!isFormValid()) {
      event.preventDefault();
    }
  });

});

/**
 * Function to enable submission button after recaptcha is checked
 */
function recaptchaCallback() {
  $('#submit').removeAttr('disabled');
};