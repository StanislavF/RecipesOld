package web.eng.recipes.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import web.eng.recipes.utils.Properties;

public class Dao {

	protected Connection con;
	private boolean isConnON = false;

	protected String URL = Properties.URL;
	protected String USER = Properties.USER;
	protected String PASS = Properties.PASS;

	protected void open() {

		if (isConnON == false) {
			try {
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException ex) {
				ex.printStackTrace();
			}
			try {
				con = DriverManager.getConnection(URL, USER, PASS);
				isConnON = true;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	protected void close() {
		if (isConnON == true) {
			try {
				con.close();
				isConnON = false;
			} catch (SQLException e) {

				e.printStackTrace();
			}
		}
	}
}
