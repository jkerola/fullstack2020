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

module.exports = {
  dummy,
  totalLikes
}