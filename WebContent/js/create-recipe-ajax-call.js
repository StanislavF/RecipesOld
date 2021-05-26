function createRecipe() {

	if(!checkFieldValues()){
		return;
	}
	
	elementsMap = getElementsValues();
	var xhttp = new XMLHttpRequest();
	var action = "create_recipe";
	var formdata = new FormData();

	formdata.append("action", action);
	formdata.append("title", elementsMap.title);
	formdata.append("category", elementsMap.category);
	formdata.append("username", sessionStorage.getItem('uname'));

	formdata.append("primary_img", elementsMap.primary_img);
	formdata.append("secondary_img_1", elementsMap.secondary_imag_list[0]);
	formdata.append("secondary_img_2", elementsMap.secondary_imag_list[1]);
	formdata.append("secondary_img_3", elementsMap.secondary_imag_list[2]);
	formdata.append("secondary_img_4", elementsMap.secondary_imag_list[3]);

	formdata.append("recie_ingredients", JSON
			.stringify(elementsMap.recipeIngredientsList));
	formdata.append("description", elementsMap.description);

	var value = formdata.getAll("title");

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("loader").hidden = true;
			document.getElementById("outer_container").hidden = false;
			//window.alert(this.responseText);
			
		}
	};
	
	document.getElementById("loader").hidden = false;
	document.getElementById("outer_container").hidden = true;

	xhttp.open("POST", "RecipeControlServlet", true);
	xhttp.send(formdata);

	/*
	 * xhttp.onload = function(e) {
	 * 
	 * if (this.status == 200) {
	 * 
	 * alert(this.responseText);
	 *  }
	 *  };
	 */
}

