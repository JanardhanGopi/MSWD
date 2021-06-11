import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
  test('renders content', () => {
    const blog = {
      title: 'test',
      author: 'smit',
      url: 'google.com',
      likes: 9,
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'test'
    )

    expect(component.container).toHaveTextContent(
      'smit'
    )

    expect(component.container).not.toHaveTextContent(
      'google.com'
    )

    expect(component.container).not.toHaveTextContent(9)
  })

  test('clicking the button shows url and likes', () => {
    const blog = {
      title: 'test',
      author: 'smit',
      url: 'google.com',
      likes: 9,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const viewBtn = component.container.querySelector('.blog-view-btn')
    fireEvent.click(viewBtn)

    const url = component.container.querySelector('.blog-url')
    const likes = component.container.querySelector('.blog-likes')
    expect(url).toHaveTextContent('google.com')
    expect(likes).toHaveTextContent(9)
  })

  test('twice clicking the button calls event handler twice', () => {
    const blog = {
      title: 'test',
      author: 'smit',
      url: 'google.com',
      likes: 9,
    }
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleUpdateBlog={mockHandler} />
    )

    const viewBtn = component.container.querySelector('.blog-view-btn')
    fireEvent.click(viewBtn)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})