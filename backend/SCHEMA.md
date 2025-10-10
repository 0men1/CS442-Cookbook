**User**
- ID, string Primary Key
- Username, string
- Email, string
- Saved []Post.ID
- Posted []Post.ID

**Post**
- ID, string, Primary Key
- Type, string (Recipe, Thought, Image)
- Title, string
- Image, string (name of file for the image)
- Description (optional), string
- Likes, num
- Comments, []Comment.ID

**Comment**
- ID string PrimaryKey
- UserID: ForeignKey(User)
- RecipeID: ForeignKey(Recipe)
- Body, string
- Likes, num
- Dislikes, num
