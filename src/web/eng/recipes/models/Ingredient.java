package web.eng.recipes.models;

import java.util.List;

public class Ingredient {
	
	private long id;
	private String name;
	private List<Recipe_ingredient> recipe_ingredients;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Recipe_ingredient> getRecipe_ingredients() {
		return recipe_ingredients;
	}
	public void setRecipe_ingredients(List<Recipe_ingredient> recipe_ingredients) {
		this.recipe_ingredients = recipe_ingredients;
	}

	
}
