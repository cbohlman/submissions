import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({
  blogs,
  user,
  handleLogout,
  likeHandler,
  deleteHandler,
}) => {
  if (user) {
    return (
      <>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeHandler={likeHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </>
    );
  }
  return null;
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default BlogList;
