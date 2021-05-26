function register() {
	/*
	 * var form = document.getElementById("register_form");
	 * 
	 * document.getElementById("action").value="register";
	 * 
	 * form.submit();
	 * 
	 */

	if(!isPasswordConfirmed()){
		return;
	}
	
	var xhttp = new XMLHttpRequest();
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var action = "register";
	var formdata = new FormData();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			switch (response) {
			case "DUPLICATE_NAME":
				setResponseText("Name already exists");
				break;
			case "ACC_CREATED":
				setResponseText("Account created");
				break;
			case "ERROR":
				setResponseText("Unexpected error");
				break;
			}
		}
	};

	xhttp.open("POST", "UserControlServlet?action=" + action + "&username=" + username + "&password=" + password, true);
	xhttp.setRequestHeader("Content-Type", "application/form-data");
	xhttp.send();
}

function isPasswordConfirmed() {
	var pass = document.getElementById("password").value;
	var passConfirm = document.getElementById("password_cofirm").value;

	if (pass === passConfirm) {
		return true;
	}

	setResponseText("Passwords doesn't match")
	return false;
}

function setResponseText(text) {
	document.getElementById("response_text").innerHTML = text;
}