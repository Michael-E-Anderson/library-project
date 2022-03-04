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

function getMostPopularAuthors(books, authors) {
  const result = books.reduce((acc, book) => { const author = booksModule.findAuthorById(authors, book.authorId);
  const name = author.name.first + " " + author.name.last; 
  const count = book.borrows.length;
  let found = acc.find((accElement) => accElement.name === name);
  if (found) found.count += book.borrows.length;
  else acc.push({name, count}) 
  return acc; }, []);
  result.sort((a, b) => b.count - a.count)
  return result.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
