package web.eng.recipes.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import web.eng.recipes.business_services.RecipeService;
import web.eng.recipes.models.Comment;
import web.eng.recipes.models.Ingredient;
import web.eng.recipes.models.Recipe;
import web.eng.recipes.models.Recipe_ingredient;
import web.eng.recipes.models.User;

@WebServlet("/RecipeControlServlet")
@MultipartConfig
public class RecipeControlServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Inject
	RecipeService recipeService;

	public RecipeControlServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");
		switch (action) {
		case "get_ingredients_list":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(getAllIngredientsAction());
			break;
		case "search_recipe_username":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(searchRecipesPrimaryImageByUsername(request));
			break;
		case "search_recipe_recipe_name":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(searchRecipesPrimaryImageByRecipeName(request));
			break;
		case "get_secondary_images_ingredients":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(getSecondaryImagesIngredients(request));
			break;
		case "get_all_comments":
			response.getWriter().write(getAllComments(request));
			break;
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		switch (action) {
		case "create_recipe":
			response.getWriter().write(createRecipeAction(request));
			break;
		case "search_recipe_ingredients_list":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(searchRecipesPrimaryImageByIngredientsList(request));
			break;
		case "add_recipe_favorites":
			response.getWriter().write(addFavoriteRecipe(request));
			break;
		case "delete_recipe_title":
			response.getWriter().write(deleteRecipeByRecipeId(request));
			
			break;
		case "get_favorite_recipes":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(getFavoriteRecipes(request));
			
			break;
		case "remove_recipe_favorites":
			response.getWriter().write(removeFavoriteRecipe(request));
			break;
		case "update_recipe":
			response.getWriter().write(updateRecipe(request));
			break;
		case "insert_comment":
			response.getWriter().write(insertComment(request));
			break;
		case "delete_comment":
			response.getWriter().write(deleteComment(request));
			break;
		case "update_comment":
			response.getWriter().write(updateComment(request));
			break;
		}
		
		
		

	}

	private String createRecipeAction(HttpServletRequest request) throws ServletException, IOException {

		List<Recipe_ingredient> recipeIngredList = new ArrayList<>();
		Recipe recipe = new Recipe();

		User user = new User();
		user.setUserName(request.getParameter("username"));
		recipe.setCreatingUser(user);

		List<Part> images = new ArrayList<>(); // images[0] is primary img
		if (request.getPart("primary_img").getContentType() != null
				&& request.getPart("primary_img").getContentType().startsWith("image/")) {
			images.add(0, request.getPart("primary_img"));
		}

		if (request.getPart("secondary_img_1").getContentType() != null
				&& request.getPart("secondary_img_1").getContentType().startsWith("image/")) {
			images.add(1, request.getPart("secondary_img_1"));
		}
		if (request.getPart("secondary_img_2").getContentType() != null
				&& request.getPart("secondary_img_2").getContentType().startsWith("image/")) {
			images.add(2, request.getPart("secondary_img_2"));
		}
		if (request.getPart("secondary_img_3").getContentType() != null
				&& request.getPart("secondary_img_3").getContentType().startsWith("image/")) {
			images.add(3, request.getPart("secondary_img_3"));
		}
		if (request.getPart("secondary_img_4").getContentType() != null
				&& request.getPart("secondary_img_4").getContentType().startsWith("image/")) {
			images.add(4, request.getPart("secondary_img_4"));
		}

		recipe.setTitle(request.getParameter("title"));
		recipe.setCategory(request.getParameter("category"));
		recipe.setDescription(request.getParameter("description"));

		JSONArray jArr = null;

		try {
			jArr = new JSONArray(request.getParameter("recie_ingredients"));
			for (int index = 0; index < jArr.length(); index++) {
				JSONObject obj = jArr.getJSONObject(index);
				Ingredient ingredient = new Ingredient();
				ingredient.setName(obj.getString("ingredient"));
				recipeIngredList.add(index, new Recipe_ingredient());
				recipeIngredList.get(index).setIngredient(ingredient);
				recipeIngredList.get(index).setQuantity(obj.getInt("quantity"));
				recipeIngredList.get(index).setUnits(obj.getString("units"));
			}

			recipe.setRecipe_ingredients(recipeIngredList);

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String responseMsg = recipeService.createRecipe(recipe, images);

		return responseMsg;
	}

	private String getAllIngredientsAction() {

		List<String> ingredientNames = recipeService.getAllIngredientNames();
		return new JSONArray(ingredientNames).toString();

	}

	private String searchRecipesPrimaryImageByUsername(HttpServletRequest request) {

		String username = request.getParameter("username");

		List<Recipe> foundIngredients = recipeService.searchRecipesPrimaryImageByUsername(username);

		return new JSONArray(foundIngredients).toString();

	}

	private String searchRecipesPrimaryImageByIngredientsList(HttpServletRequest request) {

		JSONArray jArr = null;
		String ing = request.getParameter("ingredients_list");
		try {
			jArr = new JSONArray(ing);
			List<String> ingredientsList = new ArrayList<>();

			for (int index = 0; index < jArr.length(); index++) {
				ingredientsList.add(jArr.getString(index));
			}

			List<Recipe> foundRecipes = recipeService.searchRecipesPrimaryImageByIngredientsList(ingredientsList);

			return new JSONArray(foundRecipes).toString();
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}
	
	private String searchRecipesPrimaryImageByRecipeName(HttpServletRequest request) {

		String recipe_name = request.getParameter("recipe_name");

		List<Recipe> foundIngredients = recipeService.searchRecipesPrimaryImageByRecipeName(recipe_name);

		return new JSONArray(foundIngredients).toString();

	}
	
	private String getSecondaryImagesIngredients(HttpServletRequest request) {
		
		String recipeId = request.getParameter("recipe_id");
		Recipe recipe = recipeService.getSecondaryImagesRecipeIngredients(recipeId);
		JSONObject jObj = new JSONObject(recipe);
		return jObj.toString();
	}
	
	private String addFavoriteRecipe(HttpServletRequest request){
		String responseMsg;
		
		String recipeId = request.getParameter("recipe_id");
		String username = request.getParameter("username");
		
		responseMsg=recipeService.addFavoriteRecipe(recipeId,username);
		
		return responseMsg;
	}
	
	private String removeFavoriteRecipe(HttpServletRequest request) {
		String responseMsg;
		
		String recipeId = request.getParameter("recipe_id");
		String username = request.getParameter("username");
		
		responseMsg=recipeService.removeFavoriteRecipe(recipeId,username);
		
		return responseMsg;
	}
	
	private String deleteRecipeByRecipeId(HttpServletRequest request){
		String responseMsg;
		
		String recipeId = request.getParameter("recipe_id");
		
		responseMsg=recipeService.deleteRecipeByRecipeId(recipeId);
		
		return responseMsg;
	}
	
	private String getFavoriteRecipes(HttpServletRequest request){

		String username = request.getParameter("username");
		
		List<Recipe> foundIngredients = recipeService.getFavoriteRecipes(username);

		return new JSONArray(foundIngredients).toString();
	}
	
	private String updateRecipe(HttpServletRequest request) throws ServletException, IllegalStateException, IOException {
		String responseMsg;
		
		String recipeId = request.getParameter("recipe_id");
		String recipeDescr = request.getParameter("recipe_description");
		String recipeTitle = request.getParameter("recipe_title");
		String recipeCategory = request.getParameter("recipe_category");
		
		List<Recipe_ingredient> recipeIngredList = new ArrayList<>();
		List<Long> imagesToDelete = new ArrayList<>();
		List<Part> imagesToAdd = new ArrayList<>();
		
		JSONArray jArrRecIngr = null;
		JSONArray jArrImgDel = null;
		JSONArray jArrImgAdd= null;

		try {
			if (request.getParameter("recipe_ingredients")!=null && !request.getParameter("recipe_ingredients").isEmpty()) {
				jArrRecIngr = new JSONArray(request.getParameter("recipe_ingredients"));
				for (int index = 0; index < jArrRecIngr.length(); index++) {
					JSONObject obj = jArrRecIngr.getJSONObject(index);
					Ingredient ingredient = new Ingredient();
					ingredient.setName(obj.getString("ingredient"));
					recipeIngredList.add(index, new Recipe_ingredient());
					recipeIngredList.get(index).setIngredient(ingredient);
					recipeIngredList.get(index).setQuantity(obj.getInt("quantity"));
					recipeIngredList.get(index).setUnits(obj.getString("units"));
				}
			}
			
			if (request.getParameter("images_to_delete")!=null && !request.getParameter("images_to_delete").isEmpty()) {
				jArrImgDel = new JSONArray(request.getParameter("images_to_delete"));

				for (int index = 0; index < jArrImgDel.length(); index++) {
					imagesToDelete.add(jArrImgDel.getLong(index));

				}
			}
			for (int i = 0; i < 5; i++) {
				if (request.getPart("new_images_"+i) != null && request.getPart("new_images_"+i).getContentType() != null
						&& request.getPart("new_images_"+i).getContentType().startsWith("image/")) {
					imagesToAdd.add(request.getPart("new_images_"+i));
				}
			}
			
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		responseMsg=recipeService.updateRecipe(recipeId,recipeTitle,recipeCategory,recipeDescr,recipeIngredList,imagesToDelete,imagesToAdd);
		
		return responseMsg;
	}
	
	private String insertComment(HttpServletRequest request){

		String username = request.getParameter("username");
		String recipeId = request.getParameter("recipe_id");
		String comment = request.getParameter("comment");
		
		String responseMsg = recipeService.insertComment(username, recipeId, comment);

		return responseMsg;
	}
	
	private String getAllComments(HttpServletRequest request){

		String recipeId = request.getParameter("recipe_id");
		
		List<Comment> foundIngredients = recipeService.getAllComments(recipeId);

		return new JSONArray(foundIngredients).toString();
	}
	
	private String deleteComment(HttpServletRequest request){

		String username = request.getParameter("username");
		String commentId = request.getParameter("comment_id");
		
		String responseMsg = recipeService.deleteComment(username, commentId);

		return responseMsg;
	}
	
	private String updateComment(HttpServletRequest request){

		String username = request.getParameter("username");
		String commentId = request.getParameter("comment_id");
		String comment = request.getParameter("comment");
		
		String responseMsg = recipeService.updateComment(username, commentId, comment);

		return responseMsg;
	}

}
