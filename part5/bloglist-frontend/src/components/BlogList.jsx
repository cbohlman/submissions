import Blog from "./Blog";

const BlogList = ({ blogs, user, handleLogout }) => {
    if (user) {
        return (
            <>
                <h2>blogs</h2>
                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>Log Out</button>
                </p>
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
                )}
            </>
        )
    }
    return null
}

export default BlogList