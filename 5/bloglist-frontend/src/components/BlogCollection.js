import React from 'react'
import Blog from './Blog'

const BlogCollection = (blogItemControls) => {
  const blogs = blogItemControls.blogs
  const likeBlogItem = blogItemControls.likeBlogItem
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlogItem={likeBlogItem} />
      )}
    </div>
  )
}

export default BlogCollection
