$(document).ready(function() {
    //Getting the elements of the DOM captured in variables
    const loginForm = $(".user-login");
    const userName = $("input#user-name");
    const password = $("input#password");

    //Event of user login form submitted
    loginForm.on("submit", function(event) {
        event.preventDefault();

        //Creating an object out of the inputs in the login form
        let userLogging = {
            userName: userName.val().trim(),
            password: password.val().trim()
        }

        //Validating no empty input fields
        if (!userLogging.userName || !userLogging.password) {
            return;
        }
        //calling the loginUser function that has our ajax request
        loginUser(userLogging);
        $("input[type=text], input[type=password]").val("");

    });

    // login in our users this function compare if the data comming from the user login form match our database 
    function loginUser(userObject) {
        // Ajax POST request to our /api/login endpoint
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: userObject,
        }).then(function(result) {
            window.location.replace("/dashboard");
        }).catch(function(err) {
            /* if error here throw the error */
            throw err;
        });
    }
});