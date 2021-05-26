<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/register.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/register.js"></script>
</head>
<body>
	<form id="register_form" action="${pageContext.request.contextPath}/UserControlServlet" method="post">
		<div class="outer">
			<label id="response_text" ></label>
			<div class="inner">
				Username: <input id="username" class="inner_input" type="text" name="uname">
			</div>
			<div class="inner">
				Password: <input id="password" class="inner_input" type="password" name="pass">
			</div>
			<div class="inner">
				Password conformation: <input id="password_cofirm" class="inner_input" type="password" name="passconf">
			</div>
			<input id="action" class="inner_input" type="hidden" name="action">
			<div class="inner">
				<input   class="button" type="button" value="Register" onclick="register()">
				<input   class="button" type="button" value="Back" onclick="document.location.href='UserControlServlet?action=log_in'">

			</div>
		</div>
	</form>

</body>
</html>