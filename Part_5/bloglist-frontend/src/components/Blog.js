import React, { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const isShowRemoveButton = (user && user.name && blog.user && blog.user.name) && user.name === blog.user.name

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickLikeBtn = () => {
    handleUpdateBlog(blog)
  }

  const handleClickRemoveBtn = () => {
    const isDeleteBlog = window.confirm('Do you want to delete blog?')
    if (isDeleteBlog) {
      handleDeleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button
          className="blog-view-btn"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible &&
        <div>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">likes {blog.likes} <button className="like-button" onClick={handleClickLikeBtn}>like</button></div>
          <div>{blog.user && blog.user.username}</div>
          {isShowRemoveButton && <button onClick={handleClickRemoveBtn}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog