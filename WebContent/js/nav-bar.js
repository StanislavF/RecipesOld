function createNavBar(){
	
	var mapOptions = {
			home : "Home",
			find_recipes : "Find Recipes",
			create_recipe: "Create Recipe",
			account: "Account"
	}
	
	var ul = document.createElement("ul");
	ul.setAttribute("class", "nav_bar")
	
	
	for(key in mapOptions){
		var a = document.createElement('a');
		a.innerHTML=mapOptions[key];
		a.setAttribute("href",  "NavBarControlServlet?action="+key+"&username="+window.sessionStorage.getItem("uname"));
		var action = getParameterByName("action");
		// Mark home as clicked first time when enter home page
		if(window.location.href.indexOf("UserControlServlet") > -1 && key == "home"){
			a.setAttribute("class", "active")
		}
		// Mark the clicked page as clicked
		if(key == getParameterByName("action")){
			a.setAttribute("class", "active")
		}
		var li = document.createElement('li');
		a.setAttribute("onclick", "document.location.href='NavBarControlServlet?action="+key+"&username="+window.sessionStorage.getItem("uname"));
		li.appendChild(a);
		li.setAttribute("class", "nav_bar_option");
		
		ul.appendChild(li);
	}
	
	document.getElementById("nav_bar_container").appendChild(ul);
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


