const countBy = require('lodash/collection').countBy

const dummy = (list) => {
  return (1)
}
const totalLikes = (list) => {
  // calculate total number of likes across all blogs
  if (list.length === 0) {
    return 0
  } else {
    return list.map(blog => blog.likes).reduce((current, next) => current + next)
  }
}
const favoriteBlog = (list) => {
  // find the most liked blog
  if (list.length === 0) {
    return null
  } else {
    const maxLikes = Math.max(...list.map(blog => blog.likes))
    return list.find(blog => blog.likes === maxLikes)
  }
}
const mostBlogs = (list) => {
  // find the author with the most blogs
  if (list.length === 0) {
    return null
  } else {
    const authorList = countBy(list.map(blog => blog.author))
    const topAuthor = Object.keys(authorList).reduce((max, next) => { // thanks stackOverflow
      return authorList[max] >= authorList[next] ? max : next
    })
    return { author: topAuthor, blogs: authorList[topAuthor] }
  }
}
const mostLikes = (list) => {
  // find the author with the most likes
  if (list.length === 0) {
    return null
  } else {
    const authorList = list.map(blog => ({ name: blog.author, likes: blog.likes }))
    const combinedList = {}
    authorList.forEach(author => {
      if (combinedList[author.name]) {
        combinedList[author.name] += author.likes
      } else {
        combinedList[author.name] = author.likes
      }
    })
    const topAuthor = Object.keys(combinedList).reduce((max, next) => {
      return combinedList[max] >= combinedList[next] ? max : next
    })
    return { author: topAuthor, likes: combinedList[topAuthor] }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
