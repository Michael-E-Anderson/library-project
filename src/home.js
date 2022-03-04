const booksModule = require("./books.js");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let total = books.filter((book) => !book.borrows[0].returned)
  return total.length
}

function getMostCommonGenres(books) {
  const genresOfBooks = books.map((book) => book.genre);
  const fiveCommonGenres = [];
  genresOfBooks.map((genre) => {
    const location = fiveCommonGenres.findIndex((element) => element.name === genre);
    if (location >= 0) { fiveCommonGenres[location].count = fiveCommonGenres[location].count + 1;
                        } else { fiveCommonGenres.push({ name: genre, count: 1 }); } }); fiveCommonGenres.sort((a, b) => b.count - a.count); if (fiveCommonGenres.length > 5) { return fiveCommonGenres.slice(0, 5); } return fiveCommonGenres;}


function getMostPopularBooks(books) {
  let result = books.reduce((acc, book) => { 
    const name = book.title
    const count = book.borrows.length;
    acc.push({name, count})
  return acc; }, [])
  result.sort((a, b) => b.count - a.count)
  return result.slice(0, 5)
}

function _sortObjectByVals(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}
function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByVals(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
