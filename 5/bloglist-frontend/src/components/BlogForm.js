import React from 'react'

const BlogForm = (controls) => {
  return (
    <form onSubmit={controls.createNewBlog}>
      <legend><h3>Submit a new Blog</h3></legend>
      <div>
        Title: <input type='text' name='Title'
          value={controls.title} onChange={({ target }) => controls.setTitle(target.value)} /><br />
        Author: <input type='text' name='Author'
          value={controls.author} onChange={({ target }) => controls.setAuthor(target.value)} /> <br />
        URL: <input type='text' name='URL'
          value={controls.url} onChange={({ target }) => controls.setUrl(target.value)} /><br />
      </div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default BlogForm
