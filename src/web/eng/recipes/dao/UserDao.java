package web.eng.recipes.dao;

import web.eng.recipes.models.User;

public interface UserDao {

	boolean createUser(User user);

	User findUserByUsername(String username);
	
	boolean updateUserPassword (String username, String password);
	
	boolean updateUserIsDeleted(String usename);
}
