function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id)
  return found
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id)
  return found
}

function partitionBooksByBorrowedStatus(books) {
    let returnedBooks = books.filter((book) => book.borrows[0].returned)
    let borrowedBooks = books.filter((book) => !book.borrows[0].returned)
    return[borrowedBooks, returnedBooks]
    
  }


  function getBorrowersForBook(book, accounts) {
    const result = book.borrows.reduce( (acc,transaction) => {
      const newAccount = accounts.find( account => transaction.id === account.id); 
      newAccount["returned"] = transaction.returned;
      acc.push(newAccount)
      return acc; } ,[])
    return result.slice(0, 10)
      }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
