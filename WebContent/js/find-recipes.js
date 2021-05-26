function add_ingredient_find(){
	var countIngredients = document.getElementById("count_ingredients_input").value;
	countIngredients++;
	var countIngredients = document.getElementById("count_ingredients_input").value=countIngredients;
	
	var ingredientDiv = document.createElement("div");
	ingredientDiv.setAttribute("class", "ingredient")
	ingredientDiv.setAttribute("id", "div_ingredient_"+countIngredients);
	
	
	var ingredientInput=document.createElement("input");
	ingredientInput.setAttribute("type", "text");
	ingredientInput.setAttribute("id", "input_ingredient_" + countIngredients);
	ingredientInput.setAttribute("name", "ingredient_input");
	ingredientInput.setAttribute("list", "suggestionsIngredients");
	ingredientInput.setAttribute("oninput", "enableAddButton()");
	
	
	var deleteButton=document.createElement("button");
	deleteButton.setAttribute("id", "delete_button_"+countIngredients);
	deleteButton.setAttribute("onclick", "delete_ingredient(div_ingredient_"+countIngredients+");enableAddButton()");
	deleteButton.innerHTML="-";
	
	ingredientDiv.appendChild(ingredientInput);
	ingredientDiv.appendChild(deleteButton);
	
	document.getElementById("ingredients").appendChild(ingredientDiv);
}

function delete_ingredient(divId){
	
	document.getElementById("ingredients").removeChild(divId);
}

function disableOtherSearchInputs(usedSearchInput, unusedSearchInput1, unusedSearchInput2){
	var ingredientInputs = document.getElementsByName("ingredient_input");
	if(usedSearchInput.value.trim() != "" || ingredientInputs.length!=1){
		unusedSearchInput1.disabled=true;
		unusedSearchInput2.disabled=true;
	}else if (usedSearchInput.value.trim() == "" && ingredientInputs.length==1){
		unusedSearchInput1.disabled=false;
		unusedSearchInput2.disabled=false;
	}
}

function enableAddButton (){
	var button = document.getElementById("add_button");
	var ingredientInputs = document.getElementsByName("ingredient_input")
	var disabled = false;
	
	for(var index=0;index<ingredientInputs.length;index++){
		if(ingredientInputs[index].value.trim()==""){
			disabled=true;
		}
	}
	
	button.disabled=disabled;
}