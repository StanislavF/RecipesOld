window.onclick = function(event) {
	if (event.target == document.getElementById('myModal')) {
		closeModal();
	}else if (event.target == document.getElementById('myModalUpdate')) {
		closeModalUpdate();
	}
}

function closeModal() {
	clearModalData();
	hideComments();
	document.getElementById("modal_show_comments_but").innerHTML = "Show comments";
	document.getElementById('myModal').style.display = "none";
}

function openModal(recipeIdInput, descriptionInput, dateInput, userNameInput,
		titleLabel, categoryLabel, resultDiv, primaryImgID) {

	getSecondaryImages_Ingredients(recipeIdInput.value, descriptionInput,
			dateInput, userNameInput, titleLabel, categoryLabel, resultDiv, primaryImgID);

	document.getElementById('myModal').style.display = "block";
}

function openReviewModal() {

	if(!reviewModal()){
		return;
	}
	
	document.getElementById('myModal').style.display = "block";
}

function getSecondaryImages_Ingredients(recipeId, descriptionInput, dateInput,
		userNameInput, titleLabel, categoryLabel, resultDiv, primaryImgID) {
	var xhttp = new XMLHttpRequest();
	var action = "get_secondary_images_ingredients";

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = JSON.parse(this.responseText);

			displayModalData(descriptionInput, dateInput, userNameInput,
					titleLabel, categoryLabel, resultDiv, response, recipeId, primaryImgID);
		}
	};

	xhttp.open("GET", "RecipeControlServlet?action=" + action + "&recipe_id=" + recipeId , true);
	xhttp.send();
}

function displayModalData(descriptionInput, dateInput, userNameInput,
		titleLabel, categoryLabel, resultDiv, secondaryImagesIngredients, recipeId, primaryImgID) {

	document.getElementById('modal_title').innerHTML = titleLabel.innerHTML;
	document.getElementById('modal_category').innerHTML = categoryLabel.innerHTML;
	document.getElementById('modal_description_ta').innerHTML = descriptionInput.value.replace(/\n/ig, '<br>');
	document.getElementById('modal_hidden_recipeId').value = recipeId;

	document.getElementById("modal_previwe_image").style.backgroundImage = resultDiv.style.backgroundImage;
	document.getElementById("primary_img").style.backgroundImage = resultDiv.style.backgroundImage;
	document.getElementById("modal_hidden_primary_img_id").value = primaryImgID.value;
	
	var secondaryImages = secondaryImagesIngredients.images;
	var recipe_ingredients = secondaryImagesIngredients.recipe_ingredients;

	for (var i = 0; i < secondaryImages.length; i++) {
		var imgSRC = "data:image/png;base64," + secondaryImages[i].image;
		document.getElementById("secondery_img_" + (i + 1)).style.backgroundImage = "url(' "
				+ imgSRC + "')";
		document.getElementById("modal_hidden_secondary_img"+(i+1)+"_id").value=secondaryImages[i].id;
	}

	for (var i = 0; i < recipe_ingredients.length; i++) {
		createRecipeIngredientRow(recipe_ingredients[i]);
	}

}

function createRecipeIngredientRow(recipe_ingredient) {

	var recipeIngredientDiv = document.createElement("div");
	recipeIngredientDiv.setAttribute("name", "modal_recipe_ingredient_row");

	var recipeIngredientLabel = document.createElement("label");
	recipeIngredientLabel.innerHTML = recipe_ingredient.ingredient.name + " "
			+ recipe_ingredient.quantity + " " + recipe_ingredient.units;

	recipeIngredientDiv.appendChild(recipeIngredientLabel);

	document.getElementById("modal_recipe_ingredients").appendChild(
			recipeIngredientDiv);

}

function clearModalData() {
	document.getElementById('modal_title').innerHTML = "";
	document.getElementById('modal_category').innerHTML = "";
	document.getElementById('modal_description_ta').innerHTML = "";

	document.getElementById("modal_previwe_image").style.backgroundImage = "";
	document.getElementById("primary_img").style.backgroundImage = "";
	document.getElementById("modal_hidden_primary_img_id").value="";

	for (var i = 0; i < 4; i++) {
		document.getElementById("secondery_img_" + (i + 1)).style.backgroundImage = "";
		document.getElementById("modal_hidden_secondary_img"+(i+1)+"_id").value="";
	}

	var recipe_ingredients = document
			.getElementsByName("modal_recipe_ingredient_row");
	var modal_recipe_ingredients = document
			.getElementById("modal_recipe_ingredients");
	var recipe_ingredients_length = recipe_ingredients.length;

	for (var i = 0; i < recipe_ingredients_length; i++) {
		modal_recipe_ingredients.removeChild(recipe_ingredients[0]);
	}
}

function previewImage(element) {
	if (element.style.backgroundImage != ""
			&& element.style.backgroundImage != null
			&& element.style.backgroundImage != undefined) {
		document.getElementById("modal_previwe_image").style.backgroundImage = element.style.backgroundImage;
	}

}

function addRecipeToFavorites(recipeIdInput){
	var xhttp = new XMLHttpRequest();
	var action = "add_recipe_favorites";
	var formdata = new FormData();

	
	formdata.append("action", action);
	formdata.append("recipe_id", recipeIdInput.value);
	formdata.append("username", sessionStorage.getItem("uname"));

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = this.responseText;
			if(response == "OK"){
				alert("Added to favorites");
			}else {
				alert(response);
			}
			
		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function removeRecipeFromFavorites(recipeIdInput){
	var xhttp = new XMLHttpRequest();
	var action = "remove_recipe_favorites";
	var formdata = new FormData();

	
	formdata.append("action", action);
	formdata.append("recipe_id", recipeIdInput.value);
	formdata.append("username", sessionStorage.getItem("uname"));

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = this.responseText;
			
			alert(response);
			
			var recipes = JSON.parse(document
					.getElementById("hidden_result_input").value);
			for (var i = 0; i < recipes.length; i++) {
				if (recipes[i].id == recipeIdInput.value) {
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

function createCommentsAreaInModal(){
	var modalBodyDiv=document.getElementById("modal-body");
	
	var showCommentsButton =document.createElement("button");
	showCommentsButton.setAttribute("id", "modal_show_comments_but");
	showCommentsButton.setAttribute("onclick", "showComments()");
	showCommentsButton.innerHTML = "Show comments";
	modalBodyDiv.appendChild(showCommentsButton);
	
	var commentsDiv =document.createElement("div");
	commentsDiv.setAttribute("id", "modal_comments_div");
	
	var greenLineDiv1 = document.createElement("div");
	greenLineDiv1.setAttribute("class","modal_green_line");
	commentsDiv.appendChild(greenLineDiv1);

	var simpleDiv1 = document.createElement("div");
	
	var addCommentsLabel = document.createElement("span");
	addCommentsLabel.innerHTML="You can write your comment here";
	
	simpleDiv1.appendChild(addCommentsLabel)
	commentsDiv.appendChild(simpleDiv1);
	
	var simpleDiv2 = document.createElement("div");
	
	var commentsTextArea = document.createElement("textarea");
	commentsTextArea.setAttribute("id", "modal_comments_ta");
	commentsTextArea.setAttribute("rows", "40");
	commentsTextArea.setAttribute("cols", "5");
	simpleDiv2.appendChild(commentsTextArea);
	
	var addCommentButton =document.createElement("button");
	addCommentButton.setAttribute("id", "modal_add_comment");
	addCommentButton.setAttribute("onclick", "insertComment()");
	addCommentButton.innerHTML = "Comment";
	simpleDiv2.appendChild(addCommentButton);
	commentsDiv.appendChild(simpleDiv2);
	
	var greenLineDiv2 = document.createElement("div");
	greenLineDiv2.setAttribute("class","modal_green_line");
	commentsDiv.appendChild(greenLineDiv2);
	
	var modal_showComments_div = document.createElement("div");
	modal_showComments_div.setAttribute("id","modal_show_comments_div");
	commentsDiv.appendChild(modal_showComments_div);
	
	var modal_counter = document.createElement("input");
	modal_counter.setAttribute("id","modal_comment_hidden_counter");
	modal_counter.setAttribute("class","hidden_inputs");
	modal_counter.value=0;
	commentsDiv.appendChild(modal_counter);
	
	var modalDiv = document.createElement("div");
	modalDiv.setAttribute("id", "modal_update_comment_div");
	
	var modalUpdateCommentContent = document.createElement("div");
	modalUpdateCommentContent.setAttribute("class", "modal_update_comment_content");
	
	var updateCommentTA = document.createElement("textarea");
	updateCommentTA.setAttribute("id","modal_comment_update_ta");
	updateCommentTA.setAttribute("rows", "40");
	updateCommentTA.setAttribute("cols", "5");
	
	modalUpdateCommentContent.appendChild(updateCommentTA);
	
	var saveCommentButton =document.createElement("button");
	saveCommentButton.setAttribute("id", "modal_comment_update_save");
	saveCommentButton.setAttribute("onclick", "");
	saveCommentButton.innerHTML = "Save";
	
	modalUpdateCommentContent.appendChild(saveCommentButton);
	
	var cancelSaveCommentButton =document.createElement("button");
	cancelSaveCommentButton.setAttribute("id", "modal_comment_update_cancel_save");
	cancelSaveCommentButton.setAttribute("onclick", "closeUpdateCommentModal()");
	cancelSaveCommentButton.innerHTML = "Cancel";
	
	modalUpdateCommentContent.appendChild(cancelSaveCommentButton);
	
	modalDiv.appendChild(modalUpdateCommentContent);
	
	document.getElementById("body_container").appendChild(modalDiv);
	
	modalBodyDiv.appendChild(commentsDiv);
}

function getAllComments(){
	var xhttp = new XMLHttpRequest();
	var action = "get_all_comments";
	var recipe_id = document.getElementById("modal_hidden_recipeId").value;
		
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = JSON.parse(this.responseText);
			
			for(var i = 0; i<response.length;i++){
				var username = response[i].user.userName;
				var date = response[i].date;
				var comment = response[i].comment;
				var id = response[i].id;
				document.getElementById("modal_show_comments_div").appendChild(createSingleCommentDiv(username,date,comment,id));
			}
			
			
		}
	};

	xhttp.open("GET", "RecipeControlServlet?action=" + action + "&recipe_id=" + recipe_id, true);
	xhttp.send();
}


function clearComments(){
	var comments=document.getElementById("modal_show_comments_div");
	for(var i = 0; comments.childNodes.length;i++){
		comments.removeChild(comments.childNodes[0]);
	}
	
	document.getElementById("modal_comment_hidden_counter").value=0;
}

function createSingleCommentDiv(username,date,comment,id){
	
	var counterInput = document.getElementById("modal_comment_hidden_counter");
	
	var outerCommentDiv = document.createElement("div");
	outerCommentDiv.setAttribute("class","modal_single_comment_outer_div");
	
	var innerCommentDiv = document.createElement("div");
	innerCommentDiv.setAttribute("class","modal_single_comment_inner_div");
	
	var hiddenCommentID = document.createElement("input");
	hiddenCommentID.setAttribute("class","hidden_inputs");
	hiddenCommentID.setAttribute("id","modal_single_comment_hidden_id_" + counterInput.value );
	hiddenCommentID.value=id;
	innerCommentDiv.appendChild(hiddenCommentID);
	
	var usernameLabel = document.createElement("label");
	usernameLabel.setAttribute("class","modal_single_comment_username_label");
	usernameLabel.innerHTML = username;
	
	var dateLabel = document.createElement("label");
	dateLabel.setAttribute("class","modal_single_comment_date_label");
	dateLabel.innerHTML = date;
	
	innerCommentDiv.appendChild(usernameLabel);
	innerCommentDiv.appendChild(dateLabel);
	
	var line = document.createElement("hr");
	line.setAttribute("class","modal_single_comment_line");
	innerCommentDiv.appendChild(line);
	
	
	var commentPartDiv = document.createElement("div");
	commentPartDiv.setAttribute("id","modal_single_comment_comment_part_div_"+counterInput.value); 
	commentPartDiv.setAttribute("class","modal_single_comment_comment_part_div"); 
	commentPartDiv.innerHTML = comment.replace(/\n/ig, '<br>');
	
	innerCommentDiv.appendChild(commentPartDiv);
	
	if(username===sessionStorage.uname){
		var line2 = document.createElement("hr");
		line2.setAttribute("class","modal_single_comment_line");
		innerCommentDiv.appendChild(line2);
		
		var updateComment =document.createElement("button");
		updateComment.setAttribute("id", "modal_update_comment");
		updateComment.setAttribute("onclick", "openUpdateCommentModal(modal_single_comment_comment_part_div_"+counterInput.value+",modal_single_comment_hidden_id_"+counterInput.value+" )");
		updateComment.innerHTML = "Update";
		innerCommentDiv.appendChild(updateComment);
		
		var updatedeleteComment =document.createElement("button");
		updatedeleteComment.setAttribute("id", "modal_delete_comment");
		updatedeleteComment.setAttribute("onclick", "deleteComment(modal_single_comment_hidden_id_"+counterInput.value+")");
		updatedeleteComment.innerHTML = "Delete";
		innerCommentDiv.appendChild(updatedeleteComment);
	}
	
	counterInput.value= parseInt(counterInput.value) + 1;
	outerCommentDiv.appendChild(innerCommentDiv);
	
	return outerCommentDiv;
}

function showComments(){
	var modalCommentsDiv=document.getElementById("modal_comments_div");
	var showCommentsButton=document.getElementById("modal_show_comments_but");
	
	if(modalCommentsDiv.style.display=="" || modalCommentsDiv.style.display=="none"){
		modalCommentsDiv.style.display="block";
		showCommentsButton.innerHTML = "Hide comments";
		getAllComments();
	}else if(modalCommentsDiv.style.display=="block"){
		modalCommentsDiv.style.display="none";
		showCommentsButton.innerHTML = "Show comments";
		clearComments();
	}
	
}

function hideComments(){
	var modalCommentsDiv=document.getElementById("modal_comments_div");
	modalCommentsDiv.style.display="none";
	clearComments();
}

function insertComment(){
	var xhttp = new XMLHttpRequest();
	var action = "insert_comment";
	var formdata = new FormData();

	formdata.append("action", action);
	
	var recipe_id = document.getElementById("modal_hidden_recipeId").value;
	formdata.append("recipe_id", recipe_id);
	
	formdata.append("username", sessionStorage.getItem("uname"));
	
	var comment = document.getElementById("modal_comments_ta").value;
	formdata.append("comment", comment);
	
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = this.responseText;
			
			document.getElementById("modal_comments_ta").value="";
			clearComments();
			getAllComments();
			
		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function deleteComment(idInput){
	var xhttp = new XMLHttpRequest();
	var action = "delete_comment";
	var formdata = new FormData();

	formdata.append("action", action);
	
	formdata.append("comment_id", idInput.value);
	
	formdata.append("username", sessionStorage.getItem("uname"));
	
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = this.responseText;
			
			clearComments();
			getAllComments();
			
		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function openUpdateCommentModal(commentDiv, commentId){
	
	var updateDiv = document.getElementById("modal_update_comment_div");
	updateDiv.style.display="block";
	var saveButton = document.getElementById("modal_comment_update_save");
	saveButton.setAttribute("onclick","updateComment("+commentId.value+")");
	var textArea = document.getElementById("modal_comment_update_ta");
	textArea.value=commentDiv.innerHTML.replace("<br>","");
}

function closeUpdateCommentModal(){
	
	var updateDiv = document.getElementById("modal_update_comment_div");
	updateDiv.style.display="none";
	var saveButton = document.getElementById("modal_comment_update_save");
	saveButton.setAttribute("onclick","");
	var textArea = document.getElementById("modal_comment_update_ta");
	textArea.value="";
}

function updateComment(idInput){

	var xhttp = new XMLHttpRequest();
	var action = "update_comment";
	var formdata = new FormData();

	formdata.append("action", action);
	
	formdata.append("comment_id", idInput);
	
	formdata.append("comment", document.getElementById("modal_comment_update_ta").value);
	
	formdata.append("username", sessionStorage.getItem("uname"));
	
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var response = this.responseText;
			
			closeUpdateCommentModal();
			clearComments();
			getAllComments();
			
		}
	};

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);
}

function createReviewModal(){
	createBaseModal();
	
	var modalPreviewDiv=document.getElementById("modal_previwe_image");
	var imgDiv =document.createElement("img");
	imgDiv.setAttribute("class", "previewImgInDiv");
	modalPreviewDiv.appendChild(imgDiv);
	
	var modalPrimaryImgDiv=document.getElementById("primary_img");
	var imgPrimaryDiv =document.createElement("img");
	imgPrimaryDiv.setAttribute("class", "previewImgInDivSmall");
	modalPrimaryImgDiv.appendChild(imgPrimaryDiv);
	
	var modalSecondaryImgDiv1=document.getElementById("secondery_img_1");
	var imgSec1Div =document.createElement("img");
	imgSec1Div.setAttribute("class", "previewImgInDivSmall");
	modalSecondaryImgDiv1.appendChild(imgSec1Div);
	
	var modalSecondaryImgDiv2=document.getElementById("secondery_img_2");
	var imgSec2Div =document.createElement("img");
	imgSec2Div.setAttribute("class", "previewImgInDivSmall");
	modalSecondaryImgDiv2.appendChild(imgSec2Div);
	
	var modalSecondaryImgDiv3=document.getElementById("secondery_img_3");
	var imgSec3Div =document.createElement("img");
	imgSec3Div.setAttribute("class", "previewImgInDivSmall");
	modalSecondaryImgDiv3.appendChild(imgSec3Div);
	
	var modalSecondaryImgDiv4=document.getElementById("secondery_img_4");
	var imgSec4Div =document.createElement("img");
	imgSec4Div.setAttribute("class", "previewImgInDivSmall");
	modalSecondaryImgDiv4.appendChild(imgSec4Div);
	
}

function createFavoritedRecipesModal(){
	createBaseModal();
	
	var modalBodyDiv=document.getElementById("modal-body");
	
	var addDelButton =document.createElement("button");
	addDelButton.setAttribute("id", "modal_delete");
	addDelButton.setAttribute("onclick", "removeRecipeFromFavorites(modal_hidden_recipeId)");
	addDelButton.innerHTML = "Remove from favorites";
	
	modalBodyDiv.appendChild(addDelButton);
	
	createCommentsAreaInModal();
	
}

function createMyRecipesModal(){
	createBaseModal();
	
	var modalBodyDiv=document.getElementById("modal-body");
	
	var addDelButton =document.createElement("button");
	addDelButton.setAttribute("id", "modal_delete");
	addDelButton.setAttribute("onclick", "deleteRecipe(modal_hidden_recipeId)");
	addDelButton.innerHTML = "Delete Recipe";
	
	modalBodyDiv.appendChild(addDelButton);
	
	var addUpdateButton =document.createElement("button");
	addUpdateButton.setAttribute("id", "modal_update");
	addUpdateButton.setAttribute("onclick", "openModalUpdate(modal_hidden_recipeId,modal_description_ta," +
			"'','',modal_title, modal_category, '')");
	addUpdateButton.innerHTML = "Update Recipe";
	
	modalBodyDiv.appendChild(addUpdateButton);
	
	createCommentsAreaInModal();
}

function createFindRecipesModal(){
	createBaseModal();
	
	var modalBodyDiv=document.getElementById("modal-body");
	
	var addToFavButton =document.createElement("button");
	addToFavButton.setAttribute("id", "modal_add_favorite");
	addToFavButton.setAttribute("onclick", "addRecipeToFavorites(modal_hidden_recipeId)");
	addToFavButton.innerHTML = "Add to Favorites";
	
	modalBodyDiv.appendChild(addToFavButton);
	
	createCommentsAreaInModal();
}

function createBaseModal(){
	
	//get the modalDiv from html
	var myModalDiv = document.getElementById("myModal");
	
	//create div containing modal content
	var modalContentDiv = document.createElement("div");
	modalContentDiv.setAttribute("class", "modal-content");
	
	//create div containing header content
	var modalHeaderDiv = document.createElement("div");
	modalHeaderDiv.setAttribute("class", "modal-header");
	
	//create close X
	var closeSpan = document.createElement("span");
	closeSpan.setAttribute("class", "close");
	closeSpan.setAttribute("onclick", "closeModal()");
	closeSpan.innerHTML = "&times";
	
	//attach close button to header
	modalHeaderDiv.appendChild(closeSpan);
	
	//create hidden input for recipeId
	var recipeIdHiddenInput = document.createElement("input");
	recipeIdHiddenInput.setAttribute("id", "modal_hidden_recipeId");
	recipeIdHiddenInput.setAttribute("class", "hidden_inputs");
	recipeIdHiddenInput.setAttribute("type", "hidden");
	
	//attach hidden input recipe Id to header
	modalHeaderDiv.appendChild(recipeIdHiddenInput);
	
	//create div containing recipe Title label
	var titleDiv=document.createElement("div");
	titleDiv.setAttribute("class", "modal_title_div");
	
	//create label containing recipe Title
	var titleLabel = document.createElement("label");
	titleLabel.setAttribute("id", "modal_title");
	
	//attach title label to title div
	titleDiv.appendChild(titleLabel);
	//attach title div to header div
	modalHeaderDiv.appendChild(titleDiv);
	
	//create category div containing recipe category label
	var categoryDiv = document.createElement("div");
	categoryDiv.setAttribute("class", "modal_category_div")
	
	//create category label containing recipe category
	var categoryLabel = document.createElement("label");
	categoryLabel.setAttribute("id", "modal_category");
	
	//attach category label to category div
	categoryDiv.appendChild(categoryLabel);
	//attach category fiv to header div
	modalHeaderDiv.appendChild(categoryDiv);
	
	//attach modal header to modal content div
	modalContentDiv.appendChild(modalHeaderDiv);
	
	//create BODY div containing body content
	var modalBodyDiv = document.createElement("div");
	modalBodyDiv.setAttribute("id", "modal-body");
	modalBodyDiv.setAttribute("class", "modal-body");
	
	//create image ingredients div containing iamges and ingredients
	var imageIngredientsDiv = document.createElement("div");
	imageIngredientsDiv.setAttribute("class", "modal_image_ingredients");
	
	//create image part div containing images
	var imagePartDiv = document.createElement("div");
	imagePartDiv.setAttribute("class", "modal_image_part");
	
	//create div for image preview
	var previewImageDiv = document.createElement("div");
	previewImageDiv.setAttribute("id", "modal_previwe_image");
	previewImageDiv.setAttribute("class", "modal_previwe_image");
	
	//attach previewImage div to image part div
	imagePartDiv.appendChild(previewImageDiv);
	
	//create div containing all the small images
	var allImagesDiv = document.createElement("div");
	allImagesDiv.setAttribute("class", "modal_all_images");
	
	var primaryImgDiv = document.createElement("div");
	primaryImgDiv.setAttribute("id", "primary_img");
	primaryImgDiv.setAttribute("onclick", "previewImage(primary_img)");
	
	var primaryImgId = document.createElement("input");
	primaryImgId.setAttribute("id", "modal_hidden_primary_img_id");
	primaryImgId.setAttribute("class", "hidden_inputs");
	
	primaryImgDiv.appendChild(primaryImgId);
	
	allImagesDiv.appendChild(primaryImgDiv);
	
	var secondaryImgDiv1 = document.createElement("div");
	secondaryImgDiv1.setAttribute("id", "secondery_img_1");
	secondaryImgDiv1.setAttribute("onclick", "previewImage(secondery_img_1)");

	var secImg1Id = document.createElement("input");
	secImg1Id.setAttribute("id", "modal_hidden_secondary_img1_id");
	secImg1Id.setAttribute("class", "hidden_inputs");
	
	secondaryImgDiv1.appendChild(secImg1Id);
	
	allImagesDiv.appendChild(secondaryImgDiv1);
	
	var secondaryImgDiv2 = document.createElement("div");
	secondaryImgDiv2.setAttribute("id", "secondery_img_2");
	secondaryImgDiv2.setAttribute("onclick", "previewImage(secondery_img_2)");
	
	var secImg2Id = document.createElement("input");
	secImg2Id.setAttribute("id", "modal_hidden_secondary_img2_id");
	secImg2Id.setAttribute("class", "hidden_inputs");
	
	secondaryImgDiv2.appendChild(secImg2Id);
	
	allImagesDiv.appendChild(secondaryImgDiv2);
	
	var secondaryImgDiv3 = document.createElement("div");
	secondaryImgDiv3.setAttribute("id", "secondery_img_3");
	secondaryImgDiv3.setAttribute("onclick", "previewImage(secondery_img_3)");
	
	var secImg3Id = document.createElement("input");
	secImg3Id.setAttribute("id", "modal_hidden_secondary_img3_id");
	secImg3Id.setAttribute("class", "hidden_inputs");
	
	secondaryImgDiv3.appendChild(secImg3Id);
	
	allImagesDiv.appendChild(secondaryImgDiv3);
	
	var secondaryImgDiv4 = document.createElement("div");
	secondaryImgDiv4.setAttribute("id", "secondery_img_4");
	secondaryImgDiv4.setAttribute("onclick", "previewImage(secondery_img_4)");
	
	var secImg4Id = document.createElement("input");
	secImg4Id.setAttribute("id", "modal_hidden_secondary_img4_id");
	secImg4Id.setAttribute("class", "hidden_inputs");
	
	secondaryImgDiv4.appendChild(secImg4Id);
	
	allImagesDiv.appendChild(secondaryImgDiv4);
	
	//attach all images div to images part div
	imagePartDiv.appendChild(allImagesDiv);
	
	//attach images part div to image ingredients div
	imageIngredientsDiv.appendChild(imagePartDiv);
	
	var ingredientsPartDiv = document.createElement("div");
	ingredientsPartDiv.setAttribute("class", "modal_ingredients_part");
	
	//create div wich will be used to add recipe ingredients rows
	var recipeIngredientsDiv = document.createElement("div");
	recipeIngredientsDiv.setAttribute("id", "modal_recipe_ingredients");
	
	ingredientsPartDiv.appendChild(recipeIngredientsDiv);
	imageIngredientsDiv.appendChild(ingredientsPartDiv);
	modalBodyDiv.appendChild(imageIngredientsDiv);
	
	var descriptionDiv = document.createElement("div");
	descriptionDiv.setAttribute("class", "modal_description");
	
	var descriptionTextArea = document.createElement("div");
	descriptionTextArea.setAttribute("id", "modal_description_ta");
	/*descriptionTextArea.setAttribute("rows", "40");
	descriptionTextArea.setAttribute("cols", "5");
	descriptionTextArea.setAttribute("readonly", "");*/
	
	descriptionDiv.appendChild(descriptionTextArea);
	modalBodyDiv.appendChild(descriptionDiv);
	
	//attach modal body to modal content div
	modalContentDiv.appendChild(modalBodyDiv);
	
	myModalDiv.appendChild(modalContentDiv);
}
