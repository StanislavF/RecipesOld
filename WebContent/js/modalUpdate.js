/*window.onclick = function(event) {
	if (event.target == document.getElementById('myModalUpdate')) {
		closeModalUpdate();
	}
}*/

function closeModalUpdate() {
	clearModalData();
	clearUpdateModalData();
	document.getElementById('myModalUpdate').style.display = "none";
}

function openModalUpdate(recipeIdInput, descriptionInput, dateInput,
		userNameInput, titleLabel, categoryLabel, resultDiv) {

	document.getElementById("modalUpdate_title").value = titleLabel.innerHTML;

	category = categoryLabel.innerHTML;

	switch (category) {
	case "Breakfast":
		document.getElementById("modalUpdate_category").options[0].selected = true;
		break;
	case "Lunch":
		document.getElementById("modalUpdate_category").options[1].selected = true;
		break;
	case "Dinner":
		document.getElementById("modalUpdate_category").options[2].selected = true;
		break;
	case "Snack":
		document.getElementById("modalUpdate_category").options[3].selected = true;
		break;

	}

	document.getElementById("modalUpdate_description").innerHTML = descriptionInput.innerHTML;
	document.getElementById("modalUpdate_hidden_recipe_id").value = recipeIdInput.value;

	var ingredients = document.getElementsByName("modal_recipe_ingredient_row");

	for (var index = 0; index < ingredients.length; index++) {
		var splitString = ingredients[index].childNodes[0].innerHTML.split(" ");
		var ingredient = "";
		var quantity = "";
		var units = "";
		for (var index2 = 0; index2 < splitString.length; index2++) {
			if (index2 < splitString.length - 2) {
				ingredient = ingredient + splitString[index2] + " ";
			} else if (index2 == splitString.length - 2) {
				quantity = quantity + splitString[index2];
			} else if (index2 == splitString.length - 1) {
				units = units + splitString[index2];
			}
		}

		add_ingredient_create_update(ingredient, quantity, units);
	}
	
	var imagesCountElement = document.getElementById("number_of_images");
	if (document.getElementById("modal_hidden_primary_img_id").value != -1) {
		document.getElementById("modalUpdate_primary_img").style.backgroundImage = document
				.getElementById("primary_img").style.backgroundImage;
		document.getElementById("modalUpdate_primary_img_hidden_id").value = document
				.getElementById("modal_hidden_primary_img_id").value;
		imagesCountElement.value = 1;
		
		previewUpdateImage(document.getElementById("modalUpdate_primary_img"),
				document.getElementById("modalUpdate_primary_img_hidden_id"));
	}

	if (document.getElementById("modal_hidden_secondary_img1_id").value != "") {
		document.getElementById("modalUpdate_secondary_img1").style.backgroundImage = document
				.getElementById("secondery_img_1").style.backgroundImage;
		document.getElementById("modalUpdate_secondary_img1_id").value = document
				.getElementById("modal_hidden_secondary_img1_id").value;
		imagesCountElement.value = 2;
	}

	if (document.getElementById("modal_hidden_secondary_img2_id").value != "") {
		document.getElementById("modalUpdate_secondary_img2").style.backgroundImage = document
				.getElementById("secondery_img_2").style.backgroundImage;
		document.getElementById("modalUpdate_secondary_img2_id").value = document
				.getElementById("modal_hidden_secondary_img2_id").value;
		imagesCountElement.value = 3;
	}
	
	if (document.getElementById("modal_hidden_secondary_img3_id").value != "") {
		document.getElementById("modalUpdate_secondary_img3").style.backgroundImage = document
				.getElementById("secondery_img_3").style.backgroundImage;
		document.getElementById("modalUpdate_secondary_img3_id").value = document
				.getElementById("modal_hidden_secondary_img3_id").value;
		imagesCountElement.value = 4;
	}
	

	if (document.getElementById("modal_hidden_secondary_img4_id").value != "") {
		document.getElementById("modalUpdate_secondary_img4").style.backgroundImage = document
				.getElementById("secondery_img_4").style.backgroundImage;
		document.getElementById("modalUpdate_secondary_img4_id").value = document
				.getElementById("modal_hidden_secondary_img4_id").value;
		imagesCountElement.value = 5;
	}
	
	displayInputsForAddImage();
	
	closeModal();
	document.getElementById('myModalUpdate').style.display = "block";
}

function delete_ingredient(divId) {

	document.getElementById("ingredients").removeChild(divId);
}

function previewUpdateImage(imageDiv, imageId) {
	var element = document.getElementById("modalUpdatePreviewHolder");
	var button = document.getElementById("modalUpdateDelButton");
	if (imageDiv.style.backgroundImage != ""
			&& imageDiv.style.backgroundImage != null
			&& imageDiv.style.backgroundImage != undefined) {
		element.style.backgroundImage = imageDiv.style.backgroundImage;
		if(imageDiv.style.opacity==0.3){
			element.style.opacity = 0.3;
			button.innerHTML = "Cancel deletion";
			button.setAttribute("onclick", "removeImageFromDel("
					+ imageId.value + "," + imageDiv.id + ")");
		} else {
			element.style.opacity = 1;
			button.innerHTML = "Delete image"
			button.setAttribute("onclick", "addImageToDel(" + imageId.value
					+ "," + imageDiv.id + ")");
		}
	}
}

function getImagesToDel(){
	var input = document.getElementById("list_deleted_images");
	
	if(input.value.trim()!="" && input.value!=undefined && input.value!=null){
		return JSON.parse(input.value);
	} else {
		return "";
	}
}

function removeImageFromDel(id, imageDiv){
	if(id=="" || id==undefined || id==null){
		return;
	}
	
	var imagesCountElement = document.getElementById("number_of_images");
	if(parseInt(imagesCountElement.value)<0){
		return;
	}
	
	var button = document.getElementById("modalUpdateDelButton");
	var previewModal = document.getElementById("modalUpdatePreviewHolder");
	var input = document.getElementById("list_deleted_images");
	var elementsList = getImagesToDel();
	if(elementsList=="" || elementsList.indexOf(id)==-1){
		return;
	} else {
		elementsList.splice(elementsList.indexOf(id),1);
		input.value=JSON.stringify(elementsList);
		imageDiv.style.opacity=1;
		previewModal.style.opacity=1;
		button.innerHTML = "Delete image"
		button.setAttribute("onclick", "addImageToDel(" + id + ","
				+ imageDiv.id + ")");
		imagesCountElement.value = parseInt(imagesCountElement.value)+1;
	}
	
	hideInputsForAddImage();
	displayInputsForAddImage();
}

function addImageToDel(id, imageDiv){
	
	if(id=="" || id==undefined || id==null){
		return;
	}
	
	var imagesCountElement = document.getElementById("number_of_images");
	if(parseInt(imagesCountElement.value)>5){
		return;
	}
	
	var button = document.getElementById("modalUpdateDelButton");
	var previewModal = document.getElementById("modalUpdatePreviewHolder");
	var input = document.getElementById("list_deleted_images");
	var elementsList = getImagesToDel();
	if(elementsList==""){
		var newElementsList = [];
		newElementsList.push(id);
		input.value=JSON.stringify(newElementsList);
		imageDiv.style.opacity=0.3;
		previewModal.style.opacity=0.3;
		button.innerHTML = "Cancel deletion";
		button.setAttribute("onclick", "removeImageFromDel(" + id + ","
				+ imageDiv.id + ")");
		imagesCountElement.value = parseInt(imagesCountElement.value)-1;
	} else if (elementsList.indexOf(id)==-1){
		elementsList.push(id);
		input.value=JSON.stringify(elementsList);
		imageDiv.style.opacity=0.3;
		previewModal.style.opacity=0.3;
		button.innerHTML = "Cancel deletion";
		button.setAttribute(
				"onclick",
				"removeImageFromDel(" + id + "," + imageDiv.id + ")");
		imagesCountElement.value = parseInt(imagesCountElement.value)-1;
	}
	
	hideInputsForAddImage();
	displayInputsForAddImage();
}

function displayInputsForAddImage(){
	var imagesCountElement = document.getElementById("number_of_images").value;
	var input_lines = document.getElementsByClassName("modalUpdate_image_input_line");
	
	for(var i = 0; i < 5-imagesCountElement; i++){
		input_lines[i].classList.remove("hidden_inputs");
	}
}

function hideInputsForAddImage() {
	var input_lines = document.getElementsByClassName("modalUpdate_image_input_line");
	
	for(var i = 0; i < 5; i++){
		input_lines[i].classList.add("hidden_inputs");
	}
}

function updateRecipe() {
	var xhttp = new XMLHttpRequest();
	var action = "update_recipe";
	var formdata = new FormData();

	if(!checkUpdateModalFieldValues()){
		return;
	}
	
	formdata.append("action", action);

	var title = document.getElementById("modalUpdate_title").value;
	formdata.append("recipe_title", title);

	var description = document.getElementById("modalUpdate_description").innerHTML;
	formdata.append("recipe_description", description);

	var recipe_id = document.getElementById("modalUpdate_hidden_recipe_id").value;
	formdata.append("recipe_id", recipe_id);

	var category = document.getElementById("modalUpdate_category").value;
	formdata.append("recipe_category", category);

	var ingredients_name_inputs = document
			.getElementsByName("ingredient_input");
	var ingredients_quantity_inputs = document
			.getElementsByName("quantity_input");
	var ingredients_units_inputs = document.getElementsByName("units_input");
	var recipe_ingredients = [];
	for (var index = 0; index < ingredients_name_inputs.length; index++) {
		if (ingredients_name_inputs[index].value != "Add ingredient") {
			recipe_ingredient = {};
			recipe_ingredient.ingredient = ingredients_name_inputs[index].value;
			recipe_ingredient.quantity = ingredients_quantity_inputs[index].value;
			recipe_ingredient.units = ingredients_units_inputs[index].value;
			recipe_ingredients.push(recipe_ingredient);
		}
	}

	formdata.append("recipe_ingredients", JSON.stringify(recipe_ingredients));
	formdata.append("images_to_delete", document.getElementById("list_deleted_images").value);
	
	var input_lines = document.getElementsByClassName("modalUpdate_image_input_line");
	
	for(var i = 0; i < 5; i++){
		if(input_lines[i].classList.length==1 && 
				input_lines[i].children[1].files[0]!=undefined){
			formdata.append("new_images_"+i,input_lines[i].children[1].files[0]);
		}
	}
	
	
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;

			alert(response);

			showMyRecipes();
			closeModalUpdate();

		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function clearUpdateModalData() {
	document.getElementById('modalUpdate_title').value = "";
	document.getElementById('modalUpdate_description').value = "";
	document.getElementById("list_deleted_images").value="";

	document.getElementById("number_of_images").value=0;
	
	document.getElementById("modalUpdatePreviewHolder").style.backgroundImage = "";
	document.getElementById("modalUpdatePreviewHolder").style.opacity = 1;
	document.getElementById("modalUpdate_primary_img").style.backgroundImage = "";
	document.getElementById("modalUpdate_primary_img").style.opacity = 1;

	for (var i = 0; i < 4; i++) {
		document.getElementById("modalUpdate_secondary_img" + (i + 1)).style.backgroundImage = "";
		document.getElementById("modalUpdate_secondary_img" + (i + 1)).style.opacity = 1;
	}

	hideInputsForAddImage();
	
	var input_lines = document.getElementsByClassName("modalUpdate_image_input_line");
	
	for(var i = 0; i < 5; i++){
		input_lines[i].children[1].value="";
	}
	
	var recipe_ingredients = document
			.getElementsByName("ingredient_input");
	var modal_recipe_ingredients = document
			.getElementById("ingredients");
	var recipe_ingredients_length = recipe_ingredients.length;

	for (var i = 0; i < recipe_ingredients_length; i++) {
		modal_recipe_ingredients.removeChild(modal_recipe_ingredients.childNodes[3]);
	}
	
	
	
	
}

function checkUpdateModalFieldValues() {
	elementsMap = getUpdateModalElementsValues();

	var title = elementsMap.title;
	var ingredientsList = elementsMap.recipeIngredientsList;
	var description = elementsMap.description;

	if (title == "Add Title" || title.length <= 0) {
		alert("No title");
		return false;
	} else if (description == "Add Description" || description.length <= 0) {
		alert("No description");
		return false;
	} else {
		recipe_ingredients = elementsMap.recipeIngredientsList;
		if(recipe_ingredients.length<=0){
			alert("No ingredients");
			return false;
		}
		for (var index = 0; index < recipe_ingredients.length; index++) {
			if (recipe_ingredients[index].ingredient.length <= 0 || recipe_ingredients[index].ingredient=="Add ingredient") {
				alert("Add ingredient name");
				return false
			} else if (recipe_ingredients[index].quantity.length <= 0) {
				alert("Add quantity");
				return false
			} else if (isNaN(recipe_ingredients[index].quantity)) {
				alert("Quantity must be a number");
				return false
			} else if (recipe_ingredients[index].units.length <= 0  || recipe_ingredients[index].units=="Units") {
				alert("Add unit");
				return false
			}
		}

		return true;
	}

}

function getUpdateModalElementsValues() {

	var elementsMap = {};

	elementsMap.title = document.getElementById("modalUpdate_title").value;
	elementsMap.category = document.getElementById("modalUpdate_category").value;
	elementsMap.description = document.getElementById("modalUpdate_description").innerHTML;

/*	elementsMap.primary_img = document.getElementById("primary_img_input").files[0];
	var secondary_img_list = [];
	secondary_img_list
			.push(document.getElementById("secondary_img_1_input").files[0]);
	secondary_img_list
			.push(document.getElementById("secondary_img_2_input").files[0]);
	secondary_img_list
			.push(document.getElementById("secondary_img_3_input").files[0]);
	secondary_img_list
			.push(document.getElementById("secondary_img_4_input").files[0]);
	elementsMap.secondary_imag_list = secondary_img_list;*/

	var listRecipeIngredients = [];
	var listIngredientInputs = document.getElementsByName("ingredient_input");
	var listQunatitiesInputs = document.getElementsByName("quantity_input");
	var listUnitsInputs = document.getElementsByName("units_input");
	for (var index = 0; index < listIngredientInputs.length; index++) {
		var recipe_ingredient = {};
		if (listIngredientInputs[index].value != "Add ingredient") {
			recipe_ingredient.ingredient = listIngredientInputs[index].value;
			recipe_ingredient.quantity = listQunatitiesInputs[index].value;
			recipe_ingredient.units = listUnitsInputs[index].value;
			listRecipeIngredients.push(recipe_ingredient);
		}
	}
	elementsMap.recipeIngredientsList = listRecipeIngredients;

	return elementsMap;
}