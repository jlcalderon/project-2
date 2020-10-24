//Grabing elemnts of the DOM in variables
const signUpForm = $(".register-user");
const userName = $("input#user-name");
const userEmail = $("input#user-email");
const userPassword = $("input#password");
/* const userPasswordConfirm = $("input#confirm"); */

//Clear input fields
$("input[type=text], input[type=password], input[type=email]").val("");

//When user submit the signup form
signUpForm.on("submit", function(event) {
    event.preventDefault();
    //Make a newUser object out of the form input fields
    let newUser = {
        userName: userName.val().trim(),
        email: userEmail.val().trim(),
        password: userPassword.val().trim()
            /* userConfirm: userPasswordConfirm.val().trim(), */
    };
    //Validates if there are empty props in the new user
    if (!newUser.userName ||
        !newUser.email ||
        !newUser.password
    ) {
        return;
    }

    /* confirm password match later*/

    //Call the signup function to make the ajax request
    console.log(JSON.stringify(newUser));
    signUp(newUser);
    $("input[type=text], input[type=password], input[type=email]").val("");
});

//Does the post ajax request to the signup api.
// If is successful user will go to the protected route.
//Otherwise user log error and redirected to home
function signUp(newUser) {
    $.ajax({
            url: "/api/signup",
            method: "POST",
            data: newUser,
        })
        .then(function(data) {
            window.location.replace("/login");
            /* if error throw error */
        })
        .catch(handleLoginErr);
}

//handle error on signup
function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON));
    $("#alert").fadeIn(500);
}

//later
function confirmPassword(password, confirm) {
    //verify if the fields match ===
}