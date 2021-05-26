package web.eng.recipes.business_services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.servlet.http.Part;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.eclipse.jdt.internal.compiler.ast.ThisReference;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

import web.eng.recipes.dao.RecipeDao;
import web.eng.recipes.models.Comment;
import web.eng.recipes.models.Image;
import web.eng.recipes.models.Ingredient;
import web.eng.recipes.models.Recipe;
import web.eng.recipes.models.Recipe_ingredient;
import web.eng.recipes.utils.Properties;

public class RecipeServiceImpl implements RecipeService {

	@Inject
	RecipeDao recipeDao;

	private String IMAGE_FOLDER = Properties.IMAGE_FOLDER;

	public String createRecipe(Recipe recipe, List<Part> images) {

		List<String> imgPaths = new ArrayList<>();

		if (recipe == null) {
			return "ERROR";
		}
		if (recipe.getRecipe_ingredients() == null || recipe.getRecipe_ingredients().isEmpty()) {
			return "NO_INGREDIENTS";
		}
		if (recipeDao.getRecipeByTitle(recipe.getTitle()) != null) {
			return "DUPLICATE_TITLE";
		}
		if (images != null && !images.isEmpty()) {
			try {
				imgPaths.add(0, writeImg(images.get(0), recipe.getTitle(), "primary_img"));
				for (int index = 1; index < images.size(); index++) {
					imgPaths.add(index, writeImg(images.get(index), recipe.getTitle(), "secondary_img_" + index));
				}

			} catch (IOException ex) {
				return "IMAGES_ERROR";
			}
		} else {
			imgPaths.add(0, "no_image_provided");
		}
		
		this.addMissingIngredients(recipe.getRecipe_ingredients());

		if (recipeDao.createRecipe(recipe, imgPaths)) {
			return "RECIPE_CREATED";
		} else {
			return "ERROR";
		}
	}

	public List<Recipe> searchRecipesPrimaryImageByUsername(String username) {

		List<Recipe> foundRecipes = new ArrayList<>();

		foundRecipes = recipeDao.getRecipesPrimaryImageByUsername(username);
		//foundRecipes.get(0).setDescription(foundRecipes.get(0).getDescription().replace("\r\n", "\\n"));
		for (Recipe recipe : foundRecipes) {
			if (recipe.getImages().get(0).getImgPath() != null) {
				String img = readImg(recipe.getImages().get(0).getImgPath());
				recipe.getImages().get(0).setImage(img);
			}
		}
		return foundRecipes;

	}

	public List<Recipe> searchRecipesPrimaryImageByIngredientsList(List<String> ingredients) {

		List<Recipe> foundRecipes = new ArrayList<>();
		List<Recipe> filteredRecipes = new ArrayList<>();

		foundRecipes = recipeDao.getRecipesPrimaryImageByIngredient(ingredients.get(0));

		if(foundRecipes==null) {
			return null;
		}
		
		for (Recipe foundRecipe : foundRecipes) {
			List<String> ingredientsToFind = new ArrayList<>(ingredients);
			List<Recipe_ingredient> recipe_ingredients = recipeDao
					.getRecipeIngredientsByRecipeId(foundRecipe.getId());
			for (String searchIngredientName : ingredients) {

				
				for (Recipe_ingredient recipeIngredient : recipe_ingredients) {
					if (searchIngredientName.equals(recipeIngredient.getIngredient().getName())) {
						ingredientsToFind.remove(searchIngredientName);
					}
				}
				if (ingredientsToFind.isEmpty()) {
					filteredRecipes.add(foundRecipe);
				}
			}
		}
		
		for (Recipe recipe : filteredRecipes) {
			if (recipe.getImages().get(0).getImgPath() != null) {
				String img = readImg(recipe.getImages().get(0).getImgPath());
				recipe.getImages().get(0).setImage(img);
			}
		}

		return filteredRecipes;
	}

	public List<Recipe> searchRecipesPrimaryImageByRecipeName(String recipeName) {

		List<Recipe> foundRecipes = new ArrayList<>();

		foundRecipes = recipeDao.getRecipesPrimaryImageByRecipeName(recipeName);
		for (Recipe recipe : foundRecipes) {
			if (recipe.getImages().get(0).getImgPath() != null) {
				String img = readImg(recipe.getImages().get(0).getImgPath());
				recipe.getImages().get(0).setImage(img);
			}
		}
		return foundRecipes;

	}

	public Recipe getSecondaryImagesRecipeIngredients(String recipeIdString) {

		Recipe recipe = new Recipe();
		long recipeIdLong = Long.parseLong(recipeIdString);

		recipe = recipeDao.getSecondaryImagesIngredients(recipeIdLong);
		if (recipe.getImages() != null) {
			for (Image image : recipe.getImages()) {
				if (image != null) {
					String img = readImg(image.getImgPath());
					image.setImage(img);
				}
			}
		}

		return recipe;

	}

	public String addFavoriteRecipe(String recipeId, String username) {
		
		if(recipeDao.isRecipeFavorited(recipeId, username)){
			return "RECIPE_FAVORITED";
		}
		if (recipeDao.insertToFavorites(recipeId, username)) {
			return "OK";
		} else {
			return "ERROR";
		}
	}
	
	public String removeFavoriteRecipe(String recipeId, String username) {
		if (recipeDao.deleteFromFavorites(recipeId, username)) {
			return "REMOVED";
		} else {
			return "ERROR";
		}
	}
	
	public List<Recipe> getFavoriteRecipes(String username){
		
		List<Recipe> foundRecipes = new ArrayList<>();

		foundRecipes = recipeDao.getFavoriteRecipes(username);
		for (Recipe recipe : foundRecipes) {
			if (recipe.getImages().get(0).getImgPath() != null) {
				String img = readImg(recipe.getImages().get(0).getImgPath());
				recipe.getImages().get(0).setImage(img);
			}
		}
		return foundRecipes;
	}

	public String deleteRecipeByRecipeId(String recipeId) {
		long recipeIdLong = Long.parseLong(recipeId);

		List<Image> images = recipeDao.deleteRecipeByRecipeId(recipeIdLong);

		if (images != null) {

			for (Image image : images) {
				if (!image.getImgPath().equals("no_image_provided")) {
					deleteImage(image.getImgPath());
				}
			}
			return "OK";
		} else {
			return "ERROR";
		}
	}
	
	public String updateRecipe(String recipeId,String recipeTitle,String recipeCategory,String recipeDescr, List<Recipe_ingredient> recipeIngredList, List<Long> imagesToDelete, List<Part> imagesToAdd) {
		
		boolean isPrimaryDeleted = false;
		List<Image> recipeImages = null;
		List<String> imgesToAddPaths = new ArrayList<>();
		
		if (recipeDao.updateRecipe(recipeId, recipeTitle, recipeCategory, recipeDescr, recipeIngredList)) {
			
			//delete images if there are images to delete
			if (imagesToDelete != null && !imagesToDelete.isEmpty()) {
				List<Image> deletedImages = recipeDao.deleteImagesFromIDs(imagesToDelete);
				for (int i = 0; i < deletedImages.size(); i++) {
					if(!isPrimaryDeleted && deletedImages.get(i).getIs_primary() == 1) {
						isPrimaryDeleted = true;
					}
					deleteImage(deletedImages.get(i).getImgPath());
				}
			}
			
			//get remaining images to recipe
			recipeImages = recipeDao.getAllImagesByRecipeId(Long.parseLong(recipeId));
			
			//if there is only place holder delete it
			// as recipeImages is set to NULL, the place holder will be added if there is no new img
			if(!recipeImages.isEmpty() && recipeImages.get(0).getImgPath().equals("no_image_provided")) {
				if(recipeImages!=null && !recipeImages.isEmpty()) {
					isPrimaryDeleted=true;
					List<Long> delPlaceHolder= new ArrayList<>();
					delPlaceHolder.add(recipeImages.get(0).getId());
					recipeDao.deleteImagesFromIDs(delPlaceHolder);
					recipeImages=null;
				}
			}
			
			//add new Primary img if the old is deleted
			int indexOfPathsArr = 0;
			if(isPrimaryDeleted) {
				//if there are no new images and no secondary img add place holder
				if(imagesToAdd==null || imagesToAdd.isEmpty()) {
					if(recipeImages==null || recipeImages.isEmpty()) {
						imgesToAddPaths.add(0,"no_image_provided");
						recipeDao.insertImage(imgesToAddPaths, (short)1, Long.parseLong(recipeId));
						return "UPDATED";
					//if there are secondary images make last image new primary
					} else {
						//get last image from images present in db
						Image lastImage = recipeImages.get(recipeImages.size()-1);
						
						//make list with 1 image, becouse the function takes list as parameter
						List<Long> imageToDel = new ArrayList<>();
						imageToDel.add(lastImage.getId());
						
						//read image before delete
						lastImage.setImage(readImg(lastImage.getImgPath()));
						
						//delete last image from db
						recipeDao.deleteImagesFromIDs(imageToDel);
						
						//delete last image from folder
						deleteImage(lastImage.getImgPath());
						
						//insert the last image as primary image
						String newPrimaryImg;
						List<String> newPrimaryImgPath = new ArrayList<>();
						
						newPrimaryImg = writeBase64Img(lastImage.getImage(), recipeTitle, "primary_img");
						newPrimaryImgPath.add(0,newPrimaryImg);
						
						//write image in db
						recipeDao.insertImage(newPrimaryImgPath, (short)1, Long.parseLong(recipeId));
						
					}
				// if new images are added make the first 1 primary
				} else {
					String pathToPrImage;
					
					try {
						pathToPrImage = writeImg(imagesToAdd.get(0), recipeTitle, "primary_img");
						imgesToAddPaths.add(0,pathToPrImage);
						indexOfPathsArr = 1;
						
					} catch (IOException e) {
						e.printStackTrace();
					}
					
				}
			} 
			
			//if there are no new images to add end execution as the other steps are completed
			if(imagesToAdd==null || imagesToAdd.isEmpty()) {
				return "UPDATED";
			}
			
			//insert new secondary images
			for(int secondaryImgNumber=1;indexOfPathsArr<imagesToAdd.size();secondaryImgNumber++) {
				boolean imageNameExists = false;	
				String imgName="secondary_img_"+secondaryImgNumber;
				
				for(int existingImgIndex=0;recipeImages !=null && existingImgIndex<recipeImages.size();existingImgIndex++) {
					if(recipeImages.get(existingImgIndex).getImgPath().contains(imgName)) {
						imageNameExists=true;
					}
				}
				
				if(imageNameExists) {
					continue;
				} else {
					String imgPath;
					
					try {
						imgPath = writeImg(imagesToAdd.get(indexOfPathsArr), recipeTitle, imgName);
						imgesToAddPaths.add(imgPath);
						indexOfPathsArr++;
						
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
			
			//insert the images into the database
			if(isPrimaryDeleted) {
				recipeDao.insertImage(imgesToAddPaths, (short)1, Long.parseLong(recipeId));
			} else {
				recipeDao.insertImage(imgesToAddPaths, (short)0, Long.parseLong(recipeId));
			}
			
			return "UPDATED";
		} else {
			return "ERROR";
		}
	}
	
	public List<Comment> getAllComments(String recipeId) {
		List<Comment> foundComments = new ArrayList<>();

		foundComments = recipeDao.getAllComments(recipeId);
	
		return foundComments;
	}
	
	public String insertComment(String username, String recipeId, String comment ) {
		
		if(recipeDao.insertComment(username,recipeId,comment)) {
			return "OK";
		}
		
		return "ERROR";
		
	}


	public String deleteComment(String userName, String commentId) {
	if(recipeDao.isCommentFromUser(userName,commentId)) {
		if(recipeDao.deleteComment(commentId)) {
			return "OK";
		}
	} else {
		return "INVALID_USER";
	}
	
	return "ERROR";
	
	}
	
	public String updateComment(String username, String commentId, String comment) {
		if(recipeDao.isCommentFromUser(username,commentId)) {
			if(recipeDao.updateComment(commentId, comment)) {
				return "OK";
			}
		} else {
			return "INVALID_USER";
		}
		
		return "ERROR";
	}
	
	public List<String> getAllIngredientNames() {
		
		List<Ingredient> ingredients=recipeDao.getAllIngredientNames();
		
		List<String> ingredientNames = new ArrayList();
		
		for(Ingredient ingredient : ingredients) {
			ingredientNames.add(ingredient.getName());
		}
		
		if(ingredientNames!=null) {
			return ingredientNames;
		}else {
			return new ArrayList<String>();
		}
		
	}

	private void deleteImage(String imgPath) {
		File file = new File(imgPath);

		file.delete();
	}

	private String readImg(String imagePath) {

		String image;

		try {
			if (!imagePath.equals("no_image_provided")) {
				Path path = Paths.get(imagePath);
				image = new String(java.util.Base64.getEncoder().encode(Files.readAllBytes(path)));
			} else {
				image = "no_image_provided";
			}
			return image;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private String writeBase64Img(String image, String title, String imgName) {
		String directory = IMAGE_FOLDER;
		String name = imgName + ".png";
		
		String pathToDir = directory + title + "\\";
		String imgPath = pathToDir + name;

		byte dearr[] = Base64.decode(image);
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(new File(imgPath));
			fos.write(dearr);
			return imgPath;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	private String writeImg(Part img, String title, String imgName) throws IOException {
		OutputStream out = null;
		InputStream filecontent = null;
		String directory = IMAGE_FOLDER;
		String name = imgName + ".png";

		new File(directory + title).mkdirs();

		String pathToDir = directory + title + "\\";
		String imgPath = pathToDir + name;

		try {
			out = new FileOutputStream(new File(imgPath));
			filecontent = img.getInputStream();
			int read = 0;
			// final byte[] bytes = new byte[1024];

			while ((read = filecontent.read()) != -1) {
				out.write(read);
			}

			return imgPath;
		} catch (FileNotFoundException e) {
			return null;
		} finally {
			out.close();
		}
	}
	
	private void addMissingIngredients(List<Recipe_ingredient> recipe_ingredients) {
		
		if(recipe_ingredients == null || recipe_ingredients.isEmpty()) {
			return;
		}
		
		List<Ingredient> ingredients = new ArrayList<>();
		
		for(Recipe_ingredient recipe_ingredient : recipe_ingredients) {
			ingredients.add(recipe_ingredient.getIngredient());
		}
		
		List<Ingredient> allFoods = this.recipeDao.getAllIngredientNames();

		List<Ingredient> missingFoods = this.findMissingIngredients(ingredients, allFoods);

		this.recipeDao.insertIngredients(missingFoods);
	}
	
	private List<Ingredient> findMissingIngredients(List<Ingredient> ingredientsToCheck, List<Ingredient> allIngredients) {

		List<Ingredient> missingFoods = new ArrayList<>();

		for (Ingredient ingredient : ingredientsToCheck) {
			if (!allIngredients.contains(ingredient) ) {
				missingFoods.add(ingredient);
			}
		}

		return missingFoods;
	}

}
