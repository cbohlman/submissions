import Blog from "./Blog";

const BlogList = ({ blogs, user, handleLogout, likeHandler, deleteHandler }) => {
    if (user) {
        return (
            <>
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} likeHandler={likeHandler} deleteHandler={deleteHandler} />
                )}
            </>
        )
    }
    return null
}

export default BlogList