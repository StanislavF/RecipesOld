package web.eng.recipes.models;

import java.util.Date;
import java.util.List;

public class Recipe {

	private long id;
	private String title;
	private String description;
	private Date date;
	private String category;
	private User creatingUser;
	private List<User> favoringUsers;
	private List<Comment> comments;
	private List<Image> images;
	private List<Recipe_ingredient> recipe_ingredients;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public User getCreatingUser() {
		return creatingUser;
	}
	public void setCreatingUser(User creatingUser) {
		this.creatingUser = creatingUser;
	}
	public List<User> getFavoringUsers() {
		return favoringUsers;
	}
	public void setFavoringUsers(List<User> favoringUsers) {
		this.favoringUsers = favoringUsers;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public List<Recipe_ingredient> getRecipe_ingredients() {
		return recipe_ingredients;
	}
	public void setRecipe_ingredients(List<Recipe_ingredient> recipe_ingredients) {
		this.recipe_ingredients = recipe_ingredients;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	
}
