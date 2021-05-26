<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/nav-bar.css"> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/shared-design.css"> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/home-page.css"> 

<script type="text/javascript" src="${pageContext.request.contextPath}/js/nav-bar.js"></script>
</head>
<body id="body">

	<div class="outer_container">
	
		<p id="p_uname">${uname}</p>
		<script>
			var uname = window.sessionStorage.getItem("uname");
			if(window.sessionStorage.getItem("uname") == null){
				var name = document.getElementById("p_uname").innerHTML;
				window.sessionStorage.setItem("uname", name)
			}else{
				document.getElementById("p_uname").innerHTML=window.sessionStorage.getItem("uname");
			}
		</script>
	
		<div id="nav_bar_container">
		<script>
			createNavBar();
		</script>
		</div>
		
		<div class="padding_div"> </div>
		
		<!--  BODY -->
		<div class="body_container">
			<div id="imageDiv"></div>
		</div>
	</div>

</body>
</html>