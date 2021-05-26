function showMyRecipes() {
	clearInformationDiv();
	createResultArea();	
	clearModal();
	createMyRecipesModal();
	
	var username = sessionStorage.uname;
	search_recipe_U(username);
}


function showFavoriteRecipes() {
	var xhttp = new XMLHttpRequest();
	var action = "get_favorite_recipes";
	var formdata = new FormData();
	
	formdata.append("action", action);
	var username = sessionStorage.uname;
	formdata.append("username", username);

	clearInformationDiv();
	createResultArea();
	clearModal();
	createFavoritedRecipesModal();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			document.getElementById("hidden_result_input").value = this.responseText;

			var response = JSON.parse(this.responseText);

			clearSearchResult();
			displaySearchResult(response);

		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function clearModal(){
	var modalDiv = document.getElementById("myModal");
	modalDiv.removeChild(modalDiv.childNodes[0]);
}

function showProfileArea(){
	clearInformationDiv();
	var informationDiv = document.getElementById("information_div");
	
	var personalInformationDiv = document.createElement("div");
	personalInformationDiv.setAttribute("class", "personal_information");
	
	var usernameLabel = document.createElement("label");
	usernameLabel.setAttribute("id", "pi_username_label");
	usernameLabel.innerHTML = "User: " + sessionStorage.getItem("uname");
	personalInformationDiv.appendChild(usernameLabel);
	
	////////////////Change Pass Div//////////////////////////////
	var changePasswordDiv = document.createElement("div");
	changePasswordDiv.setAttribute("id", "change-password-div");
	
	var newPassDiv = document.createElement("div");
	var newPassInput = document.createElement("input");
	newPassInput.setAttribute("placeholder", "New Password");
	newPassInput.setAttribute("id", "new_pass_input");
	newPassDiv.appendChild(newPassInput);
	changePasswordDiv.appendChild(newPassDiv);
	
	var confermNewPassDiv = document.createElement("div");
	var confermNewPassInput = document.createElement("input");
	confermNewPassInput.setAttribute("placeholder", "Confirm New Password");
	confermNewPassInput.setAttribute("id", "confirm_new_pass_input");
	confermNewPassDiv.appendChild(confermNewPassInput);
	changePasswordDiv.appendChild(confermNewPassDiv);
	
	var oldPassDiv = document.createElement("div");
	var oldPassInput = document.createElement("input");
	oldPassInput.setAttribute("placeholder", "Old Password");
	oldPassInput.setAttribute("id", "old_pass_confirm");
	oldPassDiv.appendChild(oldPassInput);
	changePasswordDiv.appendChild(oldPassDiv);
	
	var changePassBtnDiv = document.createElement("div");
	var changePassBtn = document.createElement("button");
	changePassBtn.setAttribute("onclick", "changePassword()");
	changePassBtn.innerHTML = "Change Password";
	changePassBtnDiv.appendChild(changePassBtn);
	changePasswordDiv.appendChild(changePassBtnDiv);
	/////////////////////////////////////////////////////////////
	personalInformationDiv.appendChild(changePasswordDiv);
	
    ////////////////Delete Acc Div//////////////////////////////
	var deleteAccDiv = document.createElement("div");
	deleteAccDiv.setAttribute("id", "delete-acc-div");
	
	var passDiv = document.createElement("div");
	var passInput = document.createElement("input");
	passInput.setAttribute("placeholder", "Password");
	passInput.setAttribute("id", "del_acc_pass_input");
	passDiv.appendChild(passInput);
	deleteAccDiv.appendChild(passDiv);
	
	var deleteAccBtnDiv = document.createElement("div");
	var deleteAccBtn = document.createElement("button");
	deleteAccBtn.setAttribute("onClick", "deleteAcc()");
	deleteAccBtn.innerHTML = "Delete Account";
	deleteAccBtnDiv.appendChild(deleteAccBtn);
	deleteAccDiv.appendChild(deleteAccBtnDiv);
	////////////////////////////////////////////////////////////
	personalInformationDiv.appendChild(deleteAccDiv);
	
	informationDiv.appendChild(personalInformationDiv);
}

function clearInformationDiv(){
	var informationDiv = document.getElementById("information_div");
	
	for(var i=0; informationDiv.children.length > 0;i++){
		if(informationDiv.children.length > 0){
			informationDiv.removeChild(informationDiv.children[0]);
		}
	}
}

function createResultArea() {
	var informationDiv = document.getElementById("information_div");

	var categoryBarDiv = document.createElement("div");
	categoryBarDiv.setAttribute("id", "category_bar");
	categoryBarDiv.setAttribute("class", "category_bar");

	if (document.getElementById("scriptCategoryBar") == undefined) {
		var scriptTag = document.createElement("script");
		scriptTag.setAttribute("type", "text/javascript");
		scriptTag.setAttribute("id", "scriptCategoryBar");
		scriptTag.innerHTML = "createCategoryBar()";

		categoryBarDiv.appendChild(scriptTag)

		informationDiv.appendChild(categoryBarDiv);

		var horizontalLine = document.createElement("hr");
		informationDiv.appendChild(horizontalLine);
	}
	var resultsDiv = document.createElement("div");
	resultsDiv.setAttribute("id", "results")

	informationDiv.appendChild(resultsDiv);
}


function changePassword(){
	var username = sessionStorage.getItem("uname");
	var newPass = document.getElementById("new_pass_input").value;
	var newPassConfirm = document.getElementById("confirm_new_pass_input").value;
	var oldPassword = document.getElementById("old_pass_confirm").value;
	
	if(newPass!=newPassConfirm){
		window.alert("Passwords doesn't match");
		return;
	}
	
	var xhttp = new XMLHttpRequest();
	var action = "change_password";

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.alert(this.responseText);
		}
	};

	xhttp.open("POST", "UserControlServlet", true);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send("action=" + action + "&username=" + username + "&newPassword="
			+ newPass + "&oldPassword=" + oldPassword);
}

function deleteAcc(){
	
	var userConfirm = confirm("Do you want to deactivate your account");
	
	if(userConfirm==false){
		return;
	}
	
	var username = sessionStorage.getItem("uname");
	var password = document.getElementById("del_acc_pass_input").value;
	
	var xhttp = new XMLHttpRequest();
	var action = "delete_acc";

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText=="ACC_DELETED"){
				logOut();
			}
		}
	};

	xhttp.open("POST", "UserControlServlet", true);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send("action=" + action + "&username=" + username + "&password="+ password);
}

function logOut(){
	sessionStorage.removeItem("uname");
	window.location.href="UserControlServlet?action=log_in";
}

function deleteRecipe(recipeId) {

	var xhttp = new XMLHttpRequest();
	var action = "delete_recipe_title";
	var formdata = new FormData();

	formdata.append("action", action);
	formdata.append("recipe_id", recipeId.value);

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			alert(response);

			var recipes = JSON.parse(document
					.getElementById("hidden_result_input").value);
			for (var i = 0; i < recipes.length; i++) {
				if (recipes[i].id == recipeId.value) {
					recipes.splice(i, 1);
				}
			}

			clearSearchResult();
			displaySearchResult(recipes);
			closeModal();
		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}
