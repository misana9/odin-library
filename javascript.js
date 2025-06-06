const library = [];


const addButton = document.getElementById("addButton");
const addPopup = document.getElementById("addPopup");


function Book(id,title,author,pages,hasRead){
  if(!new.target){
    throw Error("You must use the 'new' operator to call the constructor")
    
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function (){
  this.hasRead = !this.hasRead;
}

function addBookToLibrary(){
  const idCreate = crypto.randomUUID();
  const newTitle = document.getElementById("titleName").value;
  const newAuthor = document.getElementById("authorName").value;
  const newPage = document.getElementById("pageCount").value;
  const newRead = document.getElementById("hasRead").checked;
  var book = new Book(idCreate,newTitle,newAuthor,newPage,newRead);
  library.push(book);
  displayBooks();
}

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  addPopup.close();
});

addButton.addEventListener("click", function(){
  addPopup.showModal();
})



document.querySelector("#new-book-form").addEventListener("submit", function(){
  event.preventDefault();
  addBookToLibrary();
  addPopup.close();
  this.reset();
})

function deleteBook(id){
  
}

function createBookCard(book) {
   const bookCard = document.createElement("div");
   bookCard.classList.add("book-card");

   const deleteBtn = document.createElement("button");
   deleteBtn.id =`${book.id}`;
   deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click",function(){
    const bookId = this.id;
  // Remove the book from library
  const index = library.findIndex(book => book.id === bookId);
  if (index !== -1) {
    library.splice(index, 1); // Remove the book from array
    displayBooks(); // Update UI
  }});

   const readBtn = document.createElement("button");
   readBtn.id =`${book.hasRead}`;
   readBtn.textContent = "Read";

   readBtn.addEventListener("click", function(){
    book.toggleRead();
    displayBooks();
   })


   const titleText = document.createElement("p");
   titleText.textContent = `Title: ${book.title}`;

   const authorText = document.createElement("p");
   authorText.textContent = `Author: ${book.author}`;

   const pagesText = document.createElement("p");
   pagesText.textContent = `Pages: ${book.pages}`;

   const readText = document.createElement("p");
   readText.textContent = `Has read: ${book.hasRead}`;

   bookCard.appendChild(deleteBtn);
   bookCard.appendChild(readBtn);
   bookCard.appendChild(titleText);
   bookCard.appendChild(authorText);
   bookCard.appendChild(pagesText);
   bookCard.appendChild(readText);

   return bookCard;
}


function displayBooks(){
  const mainContainer = document.getElementById("book-container");
  mainContainer.classList.add("book-container");
  mainContainer.innerHTML = "";

  for (var i = 0; i < library.length; i++) {
    const bookCard = createBookCard(library[i]);
    mainContainer.appendChild(bookCard);
  }
}



displayBooks();
