$(document).ready( function(){

  /**
   * Used to perform form validation on the login page.
   * @returns True if form passes validation, false otherwise
   */
  function isFormValid(){
    $("#usernameFdbk").html("")
    $("#pwdFdbk").html("")
    let isValid= true;

    //Returns false if username is black and displays error message.
    if ($("#username").val()==""){
      isValid = false;
      $("#usernameFdbk").html(`<br>Please enter your username.`)
    }

    //Returns false if password is blank and displays error message.
    if ($("#password").val()==""){
      isValid = false;
      $("#pwdFdbk").html(`<br>Please enter your password.`)
    }
    return isValid;
  }

  /**
   * Event listener for form submission button.
   */
  $("#submit").on("click", function(event){
    if (!isFormValid()) {
      event.preventDefault();
    }
  });
});