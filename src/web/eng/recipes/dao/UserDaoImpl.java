package web.eng.recipes.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.inject.Singleton;

import web.eng.recipes.models.User;
import web.eng.recipes.utils.SQL;

@Singleton
public class UserDaoImpl extends Dao implements UserDao {

	public boolean createUser(User user) {

		open();
		PreparedStatement stmt=null;

		try {
			stmt = con.prepareStatement(SQL.INSERT_USER);

			stmt.setString(1, user.getUserName());

			stmt.setString(2, user.getPassword());
			stmt.execute();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (stmt != null) {
					stmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			close();
		}

		return true;
	}

	public User findUserByUsername(String username) {

		open();
		User user;
		PreparedStatement stmt=null;
		ResultSet rs;

		try {
			stmt = con.prepareStatement(SQL.GET_USER_USERNAME_LOGIN);
			stmt.setString(1, username);
			rs = stmt.executeQuery();

			if (rs.next()) {
				user = new User();
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setIs_deleted(rs.getInt(5));

				return user;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				if (stmt != null) {
					stmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			close();
		}

		return null;
	}

	@Override
	public boolean updateUserPassword(String username, String password) {
		open();
		PreparedStatement stmt=null;

		try {
			stmt = con.prepareStatement(SQL.UPDATE_PASSWORD);

			stmt.setString(1, password);
			stmt.setString(2, username);

			stmt.execute();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (stmt != null) {
					stmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			close();
		}

		return true;
	}

	@Override
	public boolean updateUserIsDeleted(String username) {
		open();
		PreparedStatement stmt=null;

		try {
			stmt = con.prepareStatement(SQL.UPDATE_IS_DELETED);

			stmt.setString(1, username);

			stmt.execute();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (stmt != null) {
					stmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			close();
		}

		return true;
	}

}
