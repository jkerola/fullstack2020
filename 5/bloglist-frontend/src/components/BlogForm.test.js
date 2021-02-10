import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createNewBlog = jest.fn()
  const setTitle = jest.fn()
  const setAuthor = jest.fn()
  const setUrl = jest.fn()
  let formComponent
  beforeEach(() => {
    formComponent = render(
      <BlogForm
        createNewBlog={createNewBlog}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
    )
  })
  // formComponent.debug()
  test('renders content correctly', () => {
    expect(formComponent.container).toHaveTextContent(
      'Title:'
    )
    expect(formComponent.container).toHaveTextContent(
      'Author:'
    )
    expect(formComponent.container).toHaveTextContent(
      'URL:'
    )
  })
  test('updates parent state on change', () => {
    const title = formComponent.container.querySelector('#titleInput')
    const author = formComponent.container.querySelector('#authorInput')
    const url = formComponent.container.querySelector('#urlInput')
    const form = formComponent.container.querySelector('#blogForm')
    fireEvent.change(title, {
      target: { value: 'test title' }
    })
    fireEvent.change(author, {
      target: { value: 'test author' }
    })
    fireEvent.change(url, {
      target: { value: 'test url' }
    })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    // Hooks are brought in with props, therefore test mock hooks instead of calling
    // mock form function with values
    expect(setTitle.mock.calls[0][0]).toBe('test title')
    expect(setAuthor.mock.calls[0][0]).toBe('test author')
    expect(setUrl.mock.calls[0][0]).toBe('test url')
  })
})
