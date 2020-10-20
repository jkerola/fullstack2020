const dummy = (list) => {
  return (1)
}
const totalLikes = (list) => {
  if (list.length === 0) {
    return 0
  } else {
    return list.map(blog => blog.likes).reduce((current, next) => current + next)
  }
}
const favoriteBlog = (list) => {
  if (list.length === 0) {
    return null
  } else {
    const maxLikes = Math.max(...list.map(blog => blog.likes))
    return list.find(blog => blog.likes === maxLikes)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}