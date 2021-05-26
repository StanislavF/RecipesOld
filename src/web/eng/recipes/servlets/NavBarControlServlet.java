package web.eng.recipes.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/NavBarControlServlet")
public class NavBarControlServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");
		String username = request.getParameter("username");
		RequestDispatcher dispatcher;
		
		if(username==null || username.isEmpty()) {
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/log-in.jsp");
			dispatcher.forward(request, response);
			return;
		}
		
		


		switch (action) {

		case "home":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/home-page.jsp");
			dispatcher.forward(request, response);
			break;
		case "find_recipes":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/find-recipes.jsp");
			dispatcher.forward(request, response);
			break;
	/*	case "fav_recipes":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/fav-recipes.jsp");
			dispatcher.forward(request, response);
			break;*/
		case "create_recipe":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/create-recipe.jsp");
			dispatcher.forward(request, response);
			break;
		case "ingredients":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/ingredients.jsp");
			dispatcher.forward(request, response);
			break;
		case "account":
			dispatcher = getServletContext().getRequestDispatcher("/WEB-INF/jsp/account.jsp");
			dispatcher.forward(request, response);
			break;
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
