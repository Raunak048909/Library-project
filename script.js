const submitbtn=document.getElementById("add-books");
const modalContainer = document.getElementById('modalContainer');
const cancel=document.getElementById('cancel');
const  cardSection=document.querySelector(".card-section");
const form=document.getElementById("add-bookform");
const total=2;
const readTotal=1;
const unreadTotal=1;
const noOfBooks=document.querySelector(".no-of-books");
const booksFinished=document.querySelector(".books-finished");
const unreadBooks=document.querySelector(".unread-books");
const MyLibrary=[]
function Book(title,author,pages,read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID(); 
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function updateStats(){
    const total=MyLibrary.length;
const readTotal=MyLibrary.filter(books=>books.read).length;
const unreadTotal=total-readTotal;
    noOfBooks.innerHTML=`#No of books: ${total}`;
booksFinished.innerHTML=`#Books Finished: ${readTotal}`;
unreadBooks.innerHTML=`#Unread Books: ${unreadTotal}`;
}

MyLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
MyLibrary.push(new Book("Atomic Habits", "James Clear", 320, false));

function addBookToLibrary(title,author,pages,read) {
  const newBook=new Book(title,author,pages,read);
  MyLibrary.push(newBook);
  displayBooks();
  return newBook;
}
submitbtn.addEventListener('click',()=>{
    modalContainer.classList.remove("hidden-form")
    modalContainer.classList.add("show-form")

})
cancel.addEventListener('click',()=>{
    modalContainer.classList.remove("show-form")
    modalContainer.classList.add("hidden-form")
})
function displayBooks(){
    cardSection.innerHTML="";
    MyLibrary.forEach((book) => {
        const card=document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id=book.id
        
        card.innerHTML=`
        <div class= "card-banner ${book.read?"banner-read":"banner-unread"}"></div>
        <div class="card-content"><h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <div class="btn-section"><button class="toggle">${book.read?"Mark Unread":"Mark Readead"}</button>
        <button class="delete">Delete</button></div>
        </div>
        `;
        const togglebtn=card.querySelector(".toggle");
        togglebtn.addEventListener('click',()=>changeReadStatus(book.id))
        const del=card.querySelector(".delete");
        del.addEventListener('click',()=>deleteBook(book.id))
        updateStats();
        cardSection.appendChild(card);
    });

}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formdata=new FormData(form);
    const title=formdata.get("title");
    const author=formdata.get("author");
    const pages=Number(formdata.get("pages"));
    const read=formdata.has("yes");
    addBookToLibrary(title,author,pages,read)
    form.reset();
    modalContainer.classList.remove("show-form");
  modalContainer.classList.add("hidden-form");

})
function deleteBook(id){
    const bookIndex=MyLibrary.findIndex((book)=> book.id===id);
    if(bookIndex>-1){
        MyLibrary.splice(bookIndex,1);
    }
    displayBooks();
}
function changeReadStatus(id){
    const targetBook=MyLibrary.find((book)=> book.id===id);
    if(targetBook){
        targetBook.read=!targetBook.read;
        displayBooks();
    }
}
displayBooks();