import React from 'react'
import Blog from './Blog'

const BlogCollection = (blogItemControls) => {
  const blogs = blogItemControls.blogs
  const likeBlogItem = blogItemControls.likeBlogItem
  const deleteBlogItem = blogItemControls.deleteBlogItem
  const currentUser = blogItemControls.user
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUser={currentUser}
          likeBlogItem={likeBlogItem} deleteBlogItem={deleteBlogItem} />
      )}
    </div>
  )
}

export default BlogCollection
