package web.eng.recipes.utils;

public  class SQL {
	
	////////////  RECIPE DAO ////////////////////////////////////////////////

	public static final String UPDATE_RECIPE = "UPDATE recipes SET title=?, category=?, description=? WHERE id=?";
	
	public static final String UPDATE_COMMENT = "UPDATE `comentars` SET `Comment`=? WHERE id=?";
	
	
	public static final String INSERT_COMMENT = "INSERT INTO `comentars`(`recipe_id`, `user_id`, `Comment`) SELECT  ?, id,?  FROM users WHERE `username`= ?";
	
	public static final String INSERT_RECIPE = "INSERT INTO `recipes`(`description`,`title`, `category`, `user_id`) SELECT  ?, ?,?, id FROM users WHERE `username`=?";
	
	public static final String INSERT_FAVORITE_RECIPE = "INSERT INTO `favorites`(`recipe_id`,`user_id`) SELECT  ?, id FROM users WHERE `username`=?";
	

	public static final String DELETE_COMMENT = "DELETE FROM `comentars` WHERE id=?";
	
	public static final String DELETE_FAVORITE_RECIPE = "DELETE FROM `favorites` WHERE recipe_id = ? and user_id in (SELECT id FROM users WHERE username=?)";
	
	public static final String DELETE_RECIPE = "DELETE FROM recipes WHERE id=?";
	
	public static final String DELETE_RECIPE_INGREDIENTS = "DELETE FROM `recipe_ingredients` WHERE recipe_id=?";
	
	
	public static final String GET_COMMENT_WITH_USERNAME_ID = "SELECT * FROM `comentars` WHERE id = ? and user_id in (Select id from users where username=?)";
	
	public static final String GET_ALL_COMMENTS = "SELECT c.id, c.date, c.comment, users.username FROM `comentars` c inner join users on c.user_id=users.id WHERE recipe_id=? order by date DESC";
	
	public static final String GET_RECIPE_BY_RECIPE_TITLE = "Select * from recipes where title=?";
	
	public static final String GET_SECONDARY_IMAGES ="Select * From images where recipe_id = ? and is_primary=0";
	
	public static final String GET_RECIPEINGREDIENTS = "Select * From recipe_ingredients ri INNER JOIN ingredients i ON ri.ingredient_id=i.id  where recipe_id=?";
	
	public static final String GET_ALL_IMAGES_RECIPE_ID = "Select * from images where recipe_id=?";
	
	public static final String GET_FAVORITE_RECIPE_BY_RECIPE_ID_USERNAME = "SELECT * "
																		 + "FROM `favorites` "
																		 + "WHERE recipe_id=? and user_id in "
																		 		+ "(SELECT id "
																		 		+ "FROM users "
																		 		+ "WHERE username=?)";
	
	public static final String GET_RECIPES_IMAGES_BY_USERNAME = "SELECT  images.id AS img_id, "
																	+ "	images.img_path, 	"
																	+ "	images.is_primary, "
																	+ "	recipes.id AS recipe_id,"
																	+ " recipes.description, "
																	+ " recipes.category,"
																	+ "	recipes.date, "
																	+ "	recipes.title, 	"
																	+ "	users.id AS user_id, "
																	+ "	users.username "
																+ "FROM `images` "
																	+ "	INNER JOIN `recipes` ON images.recipe_id=recipes.id AND images.is_primary<>0"
																	+ " INNER JOIN `users` ON recipes.user_id=users.id "
																+ "WHERE images.is_primary=1 AND users.username=?";
	
	//Must close the bracket in the end!
	public static final String GET_RECIPES_IMAGES_BY_INGREDIENTS_LIST = "SELECT 	images.id AS img_id,   "
																				+ "images.img_path,  "
																				+ "images.is_primary,     "
																				+ "recipes.id AS recipe_id,     "
																				+ "recipes.description,     "
																				+ "recipes.category,     "
																				+ "recipes.date,     "
																				+ "recipes.title,     "
																				+ "users.id AS user_id,     "
																				+ "users.username "
																		+ "FROM `recipes` 	"
																				+ "INNER JOIN `images` on recipes.id=images.recipe_id 	"
																				+ "INNER JOIN `users` ON recipes.user_id=users.id "
																		+ "WHERE images.is_primary=1 AND recipes.id in "
																				+ "( SELECT DISTINCT recipe_id "
																				+ "	 FROM recipe_ingredients "
																				+ "  WHERE 	";

	//Used to add ingredient for the recipe search by ingredient list
	public static final String INGREDIENT_ROW_FOR_INGREDIENTS_LIST = "recipe_id in (SELECT recipe_id FROM recipe_ingredients WHERE ingredient=?) ";

	public static final String GET_RECIPES_IMAGES_BY_INGREDIENTS_LIST_2 = "SELECT 	images.id AS img_id," + 
																			"		images.img_path," + 
																			"		images.is_primary," + 
																			"		recipes.id AS recipe_id," + 
																			"		recipes.description," + 
																			"		recipes.category," + 
																			"		recipes.date," + 
																			"		recipes.title," + 
																			"		users.id AS user_id," + 
																			"		users.username " + 
																			"FROM `recipes` " + 
																			"INNER JOIN images on images.recipe_id = recipes.id AND images.is_primary=1 " + 
																			"INNER JOIN recipe_ingredients on recipe_ingredients.recipe_id = recipes.id " + 
																			"INNER JOIN ingredients on recipe_ingredients.ingredient_id=ingredients.id " +
																			"INNER JOIN users on recipes.user_id=users.id " +
																			"WHERE ingredients.name = ?";
	
	public static final String GET_RECIPE_INGREDIENTS_BY_RECIPE_ID = "SELECT * " + 
																	 "from recipe_ingredients " + 
																	 "INNER JOIN ingredients ON recipe_ingredients.ingredient_id=ingredients.id " + 
																	 "WHERE recipe_ingredients.recipe_id=?";
	
	public static final String GET_RECIPES_IMAGES_BY_RECIPE_NAME = "SELECT  images.id AS img_id, "
			+ "	images.img_path, 	"
			+ "	images.is_primary, "
			+ "	recipes.id AS recipe_id,"
			+ " recipes.description, "
			+ " recipes.category,"
			+ "	recipes.date, "
			+ "	recipes.title, 	"
			+ "	users.id AS user_id, "
			+ "	users.username "
		+ "FROM `images` "
			+ "	INNER JOIN `recipes` ON images.recipe_id=recipes.id AND images.is_primary<>0"
			+ " INNER JOIN `users` ON recipes.user_id=users.id "
		+ "WHERE images.is_primary=1 AND recipes.title LIKE ?";
	
	public static final String GET_FAVORITE_RECIPES_IMAGES = "SELECT  images.id AS img_id, "
				+ "images.img_path, 	 "
				+ "images.is_primary, "
				+ "recipes.id AS recipe_id, "
				+ "recipes.description, "
				+ "recipes.category, "
				+ "recipes.date, "
				+ "recipes.title, 	 "
				+ "users.id AS user_id, "
				+ "users.username "
			+ "FROM `favorites`"
				+ "INNER JOIN `users` ON favorites.user_id=users.id "
				+ "INNER JOIN `recipes` ON favorites.recipe_id=recipes.id "
				+ "INNER JOIN `images` ON images.recipe_id=recipes.id AND images.is_primary<>0 "
			+ "WHERE images.is_primary=1 AND users.username=?";
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////  INGREDIENT DAO ///////////////////////////////////////////
	
	public static final String GET_ALL_INGREDIENTS = "Select * from ingredients";
	
	public static final String INSERT_INGREDIENT = "INSERT INTO ingredients (`name`) VALUES ";
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//////////////////////////////// USER DAO /////////////////////////////////////////////////////////////
	
	public static final String GET_USER_USERNAME ="Select * from users where username = ?";
	
	public static final String GET_USER_USERNAME_LOGIN ="Select * from users where username = ? AND is_deleted=0";
	
	public static final String INSERT_USER = "INSERT INTO users (username, password) VALUES(?,?)";
	
	public static final String UPDATE_PASSWORD = "UPDATE users SET password = ? WHERE username = ?";
	
	public static final String UPDATE_IS_DELETED = "UPDATE users SET is_deleted = 1 WHERE username = ?";
	///////////////////////////////////////////////////////////////////////////////////////////////////////
}
