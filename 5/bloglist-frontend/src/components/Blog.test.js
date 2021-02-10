import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent
  const likeBlogItem = jest.fn()
  const deleteBlogItem = jest.fn()
  beforeEach(() => {
    // test content for blog component
    const blog = {
      title: 'test blog',
      author: 'testauthor',
      user: '12345',
      likes: 0,
      url: 'wwww.site.com'
    }
    const currentUser = {
      token: '12345',
      username: 'testuser',
      name: 'test'
    }
    blogComponent = render(
      <Blog
        blog={blog}
        currentUser={currentUser}
        likeBlogItem={likeBlogItem}
        deleteBlogItem={deleteBlogItem}
      />
    )
  })
  test('renders content correctly', () => {
    expect(blogComponent.container).toHaveTextContent(
      'test blog'
    )
    expect(blogComponent.container).toHaveTextContent(
      'testauthor'
    )
    expect(blogComponent.container).toHaveTextContent(
      'www.site.com'
    )
    expect(blogComponent.container).toHaveTextContent(
      'likes: 0'
    )
  })
  test('detailed content is hidden initially', () => {
    const div = blogComponent.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
  test('on click, detailed content is displayed correctly', () => {
    const divButton = blogComponent.container.querySelector('.togglableText')
    fireEvent.click(divButton)
    const div = blogComponent.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
  test('clicking "like" fires correctly', () => {
    const likeButton = blogComponent.getByText('like')
    fireEvent.click(likeButton) // once
    expect(likeBlogItem.mock.calls).toHaveLength(1)
    fireEvent.click(likeButton) // twice
    expect(likeBlogItem.mock.calls).toHaveLength(2)
  })
})
