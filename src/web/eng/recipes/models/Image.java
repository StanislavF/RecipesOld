package web.eng.recipes.models;

public class Image {

	private long id;
	private String imgPath;
	private Recipe recipe;
	//1 for primary , 0 for secondary
	private short is_primary;
	private String image;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public Recipe getRecipe() {
		return recipe;
	}
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
	public short getIs_primary() {
		return is_primary;
	}
	public void setIs_primary(short is_primary) {
		this.is_primary = is_primary;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	
}
