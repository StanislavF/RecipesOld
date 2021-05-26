<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/nav-bar.css"> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/shared-design.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/create-recipe.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/modal.css"> 
 
<script type="text/javascript" src="${pageContext.request.contextPath}/js/nav-bar.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/create-recipe.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/create-recipe-ajax-call.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/modal.js"></script>
</head>
<body>
	<script type="text/javascript">
		window.onload = function(){
			getListIngredients();
			setUnitsSuggestions();
		}
	</script>
	
	<div id="loader" class="loader" hidden></div>

	<div id="outer_container" class="outer_container">
		<p id="p_uname">${uname}</p>
		<script>
			var uname = window.sessionStorage.getItem("uname");
			if(window.sessionStorage.getItem("uname") == null){
				var name = document.getElementById("p_uname").innerHTML;
				window.sessionStorage.setItem("uname", name)
			}else{
				document.getElementById("p_uname").innerHTML=window.sessionStorage.getItem("uname");
			}
		</script>
		
		<!-- Navigation bar -->
		<div id="nav_bar_container">
		<script>
			createNavBar();
		</script>
		</div>
		
		<div class="padding_div"> </div>
		
		<!--  BODY -->
		<div class="body_container">
			<div class="title_category_div">
				<input id="title_input" type="text" value="Add Title" onclick="deleteHintValueTitle(title_input)" onblur="setHintValueTitle(title_input)">
				<select id="category_select">
					<option>Breakfast</option>
					<option>Lunch</option>
					<option>Dinner</option>
					<option>Snack</option>
				</select> 
			</div>
			
			<div class="ingredients_images_div">
				<div class="images_div">
					<div class="preview_div">
						<img id="previewHolder" alt="Uploaded Image Preview Holder" width="250px" height="250px"/>
					</div>
					<div class="choose_div">
						<div>
							<div>
							<label>Primary image</label>
							</div>
							<input id="primary_img_input" type="file" accept="image/*" data-errormsg="PhotoUploadErrorMsg" onchange="previewImg(primary_img_input, previewHolder); unclockImageInput(primary_img_input, secondary_img_1_input, primary_img_button)">
							<button id="primary_img_button" onclick="previewImg(primary_img_input, previewHolder)" disabled>Preview	image</button>
						</div>
						<div>
							<div>
							<label>Image</label>
							</div>
							<input id="secondary_img_1_input" type="file" accept="image/*" data-errormsg="PhotoUploadErrorMsg" onchange="previewImg(secondary_img_1_input,previewHolder); unclockImageInput(secondary_img_1_input, secondary_img_2_input, secondary_img_1_button)" disabled>
							<button id="secondary_img_1_button" onclick="previewImg(secondary_img_1_input, previewHolder)" disabled>Preview	image</button>
						</div>
						<div>
							<div>
							<label>Image</label>
							</div>
							<input id="secondary_img_2_input" type="file" accept="image/*" data-errormsg="PhotoUploadErrorMsg" onchange="previewImg(secondary_img_2_input,previewHolder); unclockImageInput(secondary_img_2_input, secondary_img_3_input, secondary_img_2_button)" disabled>
							<button id="secondary_img_2_button" onclick="previewImg(secondary_img_2_input, previewHolder)" disabled>Preview	image</button>
						</div>
						<div>
							<div>
							<label>Image</label>
							</div>
							<input id="secondary_img_3_input" type="file" accept="image/*" data-errormsg="PhotoUploadErrorMsg" onchange="previewImg(secondary_img_3_input,previewHolder); unclockImageInput(secondary_img_3_input, secondary_img_4_input, secondary_img_3_button)" disabled>
							<button id="secondary_img_3_button" onclick="previewImg(secondary_img_3_input, previewHolder)" disabled>Preview	image</button>
						</div>
						<div>
							<div>
							<label>Image</label>
							</div>
							<input id="secondary_img_4_input" type="file" accept="image/*" data-errormsg="PhotoUploadErrorMsg" onchange="previewImg(secondary_img_4_input,previewHolder); unclockImageInput(secondary_img_4_input, undefined, secondary_img_4_button)" disabled>
							<button id="secondary_img_4_button" onclick="previewImg(secondary_img_4_input, previewHolder)" disabled>Preview image</button>
						</div>
					</div>
				</div>
				<div class="ingredients_div">
					
					<label>Ingredients</label>
					<input type="hidden" value="1" id="count_ingredients_input">
					<hr>
					<div id="ingredients">
						<div class="ingredient" id="div_ingredient_1">
							<input class="ingredient_input" id="ingredient_input_1" type="text" name="ingredient_input" list="suggestionsIngredients"
							value="Add ingredient" onclick="deleteHintValueIngredient(ingredient_input_1)" onblur="setHintValueIngredient(ingredient_input_1)"><input 
							class="quantity_input" id="quantity_input_1" type="text" name="quantity_input" value="Quantity"
							onclick="deleteHintValueQuantity(quantity_input_1)" onblur="setHintValueQuantity(quantity_input_1)"><input 
							class="unit_input" id="unit_input_1" value="Units" name="units_input" list="suggestionsUnits"
							onclick="deleteHintValueUnits(unit_input_1)" onblur="setHintValueUnits(unit_input_1)"><button 
							class="delete_button" id="delete_button_1"  onclick="">-</button>
							<input class="hidden" id="hidden_ingredient_input_1" type="hidden" name="hidden_ingredient_input">
						</div>		
					</div>
					<button id=add_button onclick="add_ingredient_create_update('Add ingredient','Quantity','Units')">+</button>	
					
					<datalist id="suggestionsIngredients">
					</datalist>
					<datalist id="suggestionsUnits">
					</datalist>
					
				</div>
			</div>
			
			<div class="description_div">
				<textarea id="description_input" cols="40" rows="5" onclick="deleteHintValueDescription(description_input)" onblur="setHintValueDescription(description_input)">Add Description</textarea>
			</div>
			
			<div class="last_buttons_div">
				<button onclick="openReviewModal()">Review</button>
				<button onclick="createRecipe();">Create recipe</button>
			</div>
		</div>
		
		<!-- The Modal -->
		<div id="myModal" class="modal">

  			<!-- Modal content -->
  			<script type="text/javascript">createReviewModal();</script>
 				

		</div>
	</div>
</body>
</html>