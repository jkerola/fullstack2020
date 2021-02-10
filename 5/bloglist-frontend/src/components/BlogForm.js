import React from 'react'

const BlogForm = (controls) => {
  return (
    <div className='formDiv'>
      <form onSubmit={controls.createNewBlog}>
        <legend><h3>Submit a new Blog</h3></legend>
        <div>
          Title: <input type='text' name='Title' id='title'
            value={controls.title} onChange={({ target }) => controls.setTitle(target.value)} /><br />
        Author: <input type='text' name='Author' id='author'
            value={controls.author} onChange={({ target }) => controls.setAuthor(target.value)} /> <br />
        URL: <input type='text' name='URL' id='url'
            value={controls.url} onChange={({ target }) => controls.setUrl(target.value)} /><br />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default BlogForm
