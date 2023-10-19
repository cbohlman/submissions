import Blog from "./Blog";

const BlogList = ({ blogs, user, handleLogout, likeHandler }) => {
    if (user) {
        return (
            <>
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} likeHandler={likeHandler} />
                )}
            </>
        )
    }
    return null
}

export default BlogList