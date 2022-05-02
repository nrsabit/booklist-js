// Classes (OOP)

// Class for Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class for Loading The UI.
class UI{
    static addBook(book){
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" style="color : red; text-decoration : none">X</a></td>
        `
        bookList.appendChild(tr);
    }

    static clearValue(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    static showErrorMessage(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.getElementById('form-submit');
        container.insertBefore(div, form);

        setTimeout(()=>{
            div.remove();
        },2000);
    }

    static removeBook(target){
        if(target.hasAttribute('href')){
            if(confirm('Are You Sure..?')){
                target.parentElement.parentElement.remove();
                UI.showErrorMessage('Book Successfully Removed', 'remove');
            }
        }
    }
}

// Class for the Local Storage.
class Storage{
    static getLocalStorage(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addDataToLocalStorage(book){
        let books = Storage.getLocalStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayDataFromLocalStorage(){
        let books = Storage.getLocalStorage();
        books.forEach(book=>{
            UI.addBook(book);
        })
    }

    static removeDataFromLocalStorage(isbn){
        let books = Storage.getLocalStorage();
        books.forEach((book, index)=>{
            if(book.isbn == isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// DOM's
let submitForm = document.getElementById('form-submit');
let bookList = document.getElementById('book-list');


// Event Listeners
submitForm.addEventListener('submit', addData);
bookList.addEventListener('click', removeData);
document.addEventListener('DOMContentLoaded', Storage.displayDataFromLocalStorage());



// Event Functions
// Function for Adding Data
function addData(e){
    let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showErrorMessage('Please Fill All the Fields', 'error');
    }else{
        let book = new Book(title, author, isbn);
        UI.addBook(book);
        Storage.addDataToLocalStorage(book);
        UI.clearValue();
        UI.showErrorMessage('Book Successfully Added..!!', 'success');
    }

    e.preventDefault();
}

// Function for Removing Data
function removeData(e){
    UI.removeBook(e.target);
    let isbn = e.target.parentElement.previousElementSibling.textContent.trim();
    Storage.removeDataFromLocalStorage(isbn);
}