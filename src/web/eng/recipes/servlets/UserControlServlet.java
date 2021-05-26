package web.eng.recipes.servlets;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import web.eng.recipes.business_services.UserService;
import web.eng.recipes.models.User;

@WebServlet("/UserControlServlet")
public class UserControlServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Inject UserService userService;

	public UserControlServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		String action = request.getParameter("action");

		if (action!=null && action.equals("register")) {
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/register.jsp");
			dispatcher.forward(request, response);
		} else {

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/log-in.jsp");
			dispatcher.forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String action = request.getParameter("action");
		
		
		User user = new User();
		user.setUserName(request.getParameter("username"));
		user.setPassword(request.getParameter("password"));
		
		
		switch (action) {
		case "log_in":
			boolean isLogInSuccsesful = userService.login(user);

			if (isLogInSuccsesful) {
				RequestDispatcher dispatcher = getServletContext()
						.getRequestDispatcher("/NavBarControlServlet?action=home");
				request.setAttribute("uname", user.getUserName());
				dispatcher.forward(request, response);
			} else {
				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/log-in.jsp");
				request.setAttribute("is_invalid", "true");
				dispatcher.forward(request, response);
			}
			break;
		case "register":

			String isUserCreated = userService.register(user);

			response.getWriter().write(isUserCreated);
			break;
		case "change_password":

			String oldPassword = request.getParameter("oldPassword");
			String newPassword = request.getParameter("newPassword");
			String username = request.getParameter("username");

			String responseText = userService.changePassword(username, newPassword, oldPassword);

			response.getWriter().write(responseText);
			break;
		case "delete_acc":
			
			String password = request.getParameter("password");
			String usernameDA = request.getParameter("username");

			String responseTxt = userService.deleteAcc(usernameDA, password);

			response.getWriter().write(responseTxt);
			break;
		}
		
	}

}
