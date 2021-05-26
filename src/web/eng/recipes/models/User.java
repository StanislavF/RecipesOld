package web.eng.recipes.models;

import java.util.List;

public class User {

	private long id;
	private String userName;
	private String password;
	// 1 - user is deleted, 0-user is not deleted
	private int is_deleted;
	private List<Recipe> myRecipes;
	private List<Recipe> favoriteRecipes;
	private List<Comment> myComments;

	public User() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(int is_deleted) {
		this.is_deleted = is_deleted;
	}

	public List<Recipe> getMyRecipes() {
		return myRecipes;
	}

	public void setMyRecipes(List<Recipe> myRecipes) {
		this.myRecipes = myRecipes;
	}

	public List<Recipe> getFavoriteRecipes() {
		return favoriteRecipes;
	}

	public void setFavoriteRecipes(List<Recipe> favoriteRecipes) {
		this.favoriteRecipes = favoriteRecipes;
	}

	public List<Comment> getMyComments() {
		return myComments;
	}

	public void setMyComments(List<Comment> myComments) {
		this.myComments = myComments;
	}

}
