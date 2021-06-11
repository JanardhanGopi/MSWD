import React, { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [blogFields, setBlogFields] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSetBlogFields = ({ name, value }) => setBlogFields({ ...blogFields, [name]: value })

  const handleSubmitBlogForm = async (event) => {
    event.preventDefault()

    await handleAddBlog(blogFields)
    for (var key in blogFields) {
      // eslint-disable-next-line no-prototype-builtins
      if (blogFields.hasOwnProperty(key)) {
        setBlogFields({ ...blogFields, [key]: '' })
      }
    }
  }

  return (
    <form className="form-new-blog" onSubmit={handleSubmitBlogForm}>
      <div>
        <span>title</span>
        <input
          value={blogFields.title}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div>
        <span>author</span>
        <input
          value={blogFields.author}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="author"
          id="author"
        />
      </div>
      <div>
        <span>url</span>
        <input
          value={blogFields.url}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="url"
          id="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
