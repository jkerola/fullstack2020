/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const Blog = ({ blog, likeBlogItem, deleteBlogItem, currentUser }) => {
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
  function isUser (user, blogItem) {
    if (user.username === blogItem.user.username) {
      return true
    } else {
      return false
    }
  }
  const showIfUser = { display: isUser(currentUser, blog) ? '' : 'none' }
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
        <div style={showIfUser}>
          <br /><button onClick={() => deleteBlogItem(blog)}>delete</button>
        </div>
      </div>
    </div>
  )
}
export default Blog
