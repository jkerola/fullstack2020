import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, createNewBlog }) => {
  return (
    <div className='formDiv'>
      <form id='blogForm' onSubmit={createNewBlog}>
        <legend><h3>Submit a new Blog</h3></legend>
        <div>
          Title: <input type='text' id='titleInput'
            value={title} name='Title' onChange={({ target }) => setTitle(target.value)} /><br />
        Author: <input type='text' id='authorInput'
            value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} /> <br />
        URL: <input type='text' id='urlInput'
            value={url} name='Url' onChange={({ target }) => setUrl(target.value)} /><br />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  setTitle: PropTypes.func,
  setAuthor: PropTypes.func,
  setUrl: PropTypes.func,
  createNewBlog: PropTypes.func
}

export default BlogForm
