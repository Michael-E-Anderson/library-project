function findAccountById(accounts, id) {
  let patron = accounts.find((account) => account.id === id)
   return patron
 } 

 function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1)
  return sortedAccounts
}

function getTotalNumberOfBorrows(account, books) {
  let count = books.filter((book) => book.borrows.find((borrow) => borrow.id === account.id))
  return count.length
}

function getBooksPossessedByAccount(account, books, authors) {
  let results = []
  for (let book in books){
    if (books[book].borrows.filter(borrow => borrow.id === account.id && !borrow.returned).length){
      const found = {
...books[book], author: authors.find(author => author.id === books[book].authorId)
      }
        results.push(found)
      }
    }
  
  return results
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
