
const BlogForm = (props) => {
    if (props.user) {
        return (
            <>
                <form onSubmit={props.addBlog}>
                    <p>
                        Title:
                        <input value={props.title} onChange={({ target }) => props.setTitle(target.value)} />
                    </p>
                    <p>
                        Author:
                        <input value={props.author} onChange={({ target }) => props.setAuthor(target.value)} />
                    </p>
                    <p>
                        URL:
                        <input value={props.url} onChange={({ target }) => props.setUrl(target.value)} />
                    </p>
                    <button type="submit">Save</button>
                </form>
            </>
        )
    }
}

export default BlogForm