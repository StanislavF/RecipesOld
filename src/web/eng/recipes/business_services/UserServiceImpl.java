package web.eng.recipes.business_services;

import javax.inject.Inject;

import org.apache.catalina.realm.UserDatabaseRealm;

import web.eng.recipes.dao.UserDao;
import web.eng.recipes.dao.UserDaoImpl;
import web.eng.recipes.models.User;

public class UserServiceImpl implements UserService {

	@Inject
	UserDao dao;

	@Override
	public boolean login(User user) {

		User userFromDB = dao.findUserByUsername(user.getUserName());
		if (userFromDB != null && userFromDB.getPassword().equals(user.getPassword())) {
			return true;
		}

		return false;
	}

	@Override
	public String register(User user) {

		if (user != null && user.getUserName() != null && user.getPassword()!=null) {
			if (dao.findUserByUsername(user.getUserName()) != null) {
				return "DUPLICATE_NAME";
			} else {
				if (dao.createUser(user)) {
					return "ACC_CREATED";
				} else {
					return "ERROR";
				}
			}
		}
		return "ERROR";
	}

	@Override
	public String changePassword(String username, String newPassword, String oldPassword) {
		
		User user = dao.findUserByUsername(username);
		
		if(user == null) {
			return "USER_NOT_FOUND";
		}
		if(!user.getPassword().equals(oldPassword)) {
			return "WRONG_PASSWORD";
		}
		
		if(dao.updateUserPassword(username, newPassword)){
			return "PASSWORD_CHANGED";
		}
		
		return "ERROR";
	}

	@Override
	public String deleteAcc(String username, String password) {
		User user = dao.findUserByUsername(username);

		if (user == null) {
			return "USER_NOT_FOUND";
		}
		if (!user.getPassword().equals(password)) {
			return "WRONG_PASSWORD";
		}

		if (dao.updateUserIsDeleted(username)) {
			return "ACC_DELETED";
		}

		return "ERROR";
	}

}
