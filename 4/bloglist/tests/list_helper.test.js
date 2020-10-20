const listHelper = require('../utils/list_helper')

// from example at
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogItem = {
    title: "D&D Fridays",
    author: "Gary Gygax",
    url: "tomb-of-horrors.blogspot.com",
    likes: 23,
    id: "5f8d80dd71d291e839736a80"
  }
  const blogList = [
    blogItem,
    {
      title: "React Fans",
      author: "Zuckerberg",
      url: "marks-amazing-blog.blogspot.com",
      likes: 0,
      id: "5f8d800f71d291e839736a7f"
    },
    {
      title: "Meritoppila löytökiekot",
      author: "Andre 3000",
      url: "meritoppila-discgolf.blogspot.com",
      likes: 702,
      id: "5f8d9a33c094140feafc3f02"
    }]
  test('of empty list is zero', () => {
    const list = []
    const result = listHelper.totalLikes(list)
    expect(result).toBe(0)
  })
  test('of list of one blog equals blogs likes', () => {
    const list = [blogItem]
    const result = listHelper.totalLikes(list)
    expect(result).toBe(blogItem.likes)
  })
  test('of list with more than one blog is correct', () => {
    const result = listHelper.totalLikes(blogList)
    let total = 0
    blogList.forEach(blog => { // tested function uses map() and reduce(), this is a third way
      total += blog.likes
    })
    expect(result).toBe(total)
  })


})