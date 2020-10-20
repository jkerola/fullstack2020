const listHelper = require('../utils/list_helper')

const blogItem = { // single blog entry
  title: 'D&D Fridays',
  author: 'Gary Gygax',
  url: 'tomb-of-horrors.blogspot.com',
  likes: 23,
  id: '5f8d80dd71d291e839736a80'
}
const blogList = [ // list of unique blog items
  blogItem,
  {
    title: 'React Fans',
    author: 'Zuckerberg',
    url: 'marks-amazing-blog.blogspot.com',
    likes: 0,
    id: '5f8d800f71d291e839736a7f'
  },
  {
    title: 'Meritoppila löytökiekot',
    author: 'Andre 3000',
    url: 'meritoppila-discgolf.blogspot.com',
    likes: 702,
    id: '5f8d9a33c094140feafc3f02'
  }]

// from example at
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#tehtavat-4-3-4-7
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
// totalLikes() tests
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
// favoriteBlog() tests
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
    // expect first item of equal values
    const modBlogItem = { ...blogItem, likes: 702 }
    const doubledList = [...blogList, modBlogItem]
    const result = listHelper.favoriteBlog(doubledList)
    expect(result).toEqual(blogList[2]) // first of two items of equal value
    const tripledList = [modBlogItem, ...doubledList]
    const secondResult = listHelper.favoriteBlog(tripledList)
    expect(secondResult).toEqual(modBlogItem) // first of three items of equal value
  })
})
// mostBlogs() tests
describe('author of the most blogs', () => {
  test('of empty list of blogs equals null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })
  test('of list of one blog is the author of that blog', () => {
    const result = listHelper.mostBlogs([blogItem])
    const author = { author: blogItem.author, blogs: 1 }
    expect(result).toEqual(author)
  })
  test('of multiple blogs is correct', () => {
    const doubledList = [...blogList, blogItem]
    const result = listHelper.mostBlogs(doubledList)
    const author = { author: blogItem.author, blogs: 2 }
    expect(result).toEqual(author)
  })
  test('of multiple top authors returns first author', () => {
    const moddedList = [...blogList, blogList[1], blogList[2]]
    const result = listHelper.mostBlogs(moddedList)
    const author = { author: blogList[1].author, blogs: 2 }
    expect(result).toEqual(author) // first author in list in case of tie
  })
})
// mostLikes() tests
describe('most liked author', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })
  test('of list of one blog is the author', () => {
    const result = listHelper.mostLikes([blogItem])
    const author = { author: blogItem.author, likes: blogItem.likes }
    expect(result).toEqual(author)
  })
  test('of multiple blogs is correct', () => {
    const result = listHelper.mostLikes(blogList)
    const author = { author: blogList[2].author, likes: blogList[2].likes }
    expect(result).toEqual(author)
  })
  test('of multiple tying authors is correct', () => {
    const moddedlist = [...blogList, { ...blogItem, likes: 679 }]
    const result = listHelper.mostLikes(moddedlist)
    const author = { author: blogList[0].author, likes: 702 } // hard coded value for this test
    expect(result).toEqual(author) // first author on tying on list
    const secondList = [...blogList]
    secondList[1].likes = 702
    const secondResult = listHelper.mostLikes(secondList)
    const secondAuthor = { author: blogList[1].author, likes: blogList[1].likes }
    expect(secondResult).toEqual(secondAuthor) // first author on tying list
  })
})
