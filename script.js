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