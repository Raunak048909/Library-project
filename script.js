const submitbtn=document.getElementById("add-books");
const modalContainer = document.getElementById('modalContainer');
const cancel=document.getElementById('cancel');
const MyLibrary=[]
function Book(title,author,pages,read){
    this.id = crypto.randomUUID(); 
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
function addBookToLibrary() {
  const newBook=new Book(title,author,pages,read);
  MyLibrary.push(newBook);
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