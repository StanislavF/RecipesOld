package web.eng.recipes.business_services;

import java.util.List;

import javax.servlet.http.Part;

import web.eng.recipes.models.Comment;
import web.eng.recipes.models.Recipe;
import web.eng.recipes.models.Recipe_ingredient;

public interface RecipeService {

	String createRecipe(Recipe recipe, List<Part> images);
	List<Recipe> searchRecipesPrimaryImageByUsername(String username);
	List<Recipe> searchRecipesPrimaryImageByIngredientsList(List<String> ingredients);
	List<Recipe> searchRecipesPrimaryImageByRecipeName(String recipe_name);
	Recipe getSecondaryImagesRecipeIngredients(String recipeId);
	String addFavoriteRecipe(String recipeId, String username);
	String removeFavoriteRecipe(String recipeId, String username);
	String deleteRecipeByRecipeId(String recipeId);
	List<Recipe> getFavoriteRecipes(String username);
	String updateRecipe(String recipeId,String recipeTitle,String recipeCategory,String recipeDescr,List<Recipe_ingredient> recipeIngredList, List<Long> imagesToDelete, List<Part> imagesToAdd);
	String insertComment(String username, String recipeId, String comment );
	List<Comment> getAllComments(String recipeId);
	String deleteComment(String userName, String commentId);
	String updateComment(String username, String commentId, String comment);
	List<String> getAllIngredientNames();
}
