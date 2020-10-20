const listHelper = require('../utils/list_helper')

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

// from example at
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
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

describe('best liked blog', () => {
  test('of empty list equals null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
  test('of list of one item to be that item', () => {
    const result = listHelper.favoriteBlog([blogItem])
    expect(result).toEqual(blogItem)
  })
  test('of multiple items is correct', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blogList[2])
  })
  test('of multiple winners is correct', () => {
    //expect first item of equal values
    const modBlogItem = {...blogItem, likes: 702}
    const doubledList = [...blogList, modBlogItem]
    const result = listHelper.favoriteBlog(doubledList)
    expect(result).toEqual(blogList[2]) // first of two items of equal value
    const tripledList = [modBlogItem, ...doubledList]
    const secondResult = listHelper.favoriteBlog(tripledList)
    expect(secondResult).toEqual(modBlogItem) // first of three items of equal value
  })
  
})