/* eslint-disable react/prop-types */
import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} by {blog.author.name} aka &quot;{blog.author.username}&quot;
  </div>
)

export default Blog
