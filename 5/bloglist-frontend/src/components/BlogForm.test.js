import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createNewBlog = jest.fn()
  const controls = { createNewBlog }
  const formComponent = render(
    <BlogForm
      controls={controls}
    />
  )
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
    const title = formComponent.container.querySelector('#title')
    const form = formComponent.container.querySelector('.blogForm')
    fireEvent.change(titleInput, {
      target: { value: 'test title' }
    })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].content).toBe('test title')
  })
})
