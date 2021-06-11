import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
  test('updates parent state and calls onSubmit', () => {
    const handleAddBlog = jest.fn()

    const component = render(
      <BlogForm handleAddBlog={handleAddBlog} />
    )

    const inputTitle = component.container.querySelector('[name=title]')
    const inputAuthor = component.container.querySelector('[name=author]')
    const inputUrl = component.container.querySelector('[name=url]')
    const form = component.container.querySelector('.form-new-blog')

    fireEvent.change(inputTitle, {
      target: { value: 'auram' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'gert' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'duckduckgo' }
    })
    fireEvent.submit(form)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe('auram')
    expect(handleAddBlog.mock.calls[0][0].author).toBe('gert')
    expect(handleAddBlog.mock.calls[0][0].url).toBe('duckduckgo')
  })
})