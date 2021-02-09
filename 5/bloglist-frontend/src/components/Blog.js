/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const Blog = ({ blog, likeBlogItem }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = {
    display: visible ? 'none' : '',
    cursor: 'pointer'
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />{blog.url}
        <br />likes: {blog.likes} <button onClick={() => likeBlogItem(blog)}>like</button>
        <br />added by {blog.user.username}
      </div>
    </div>
  )
}
export default Blog
