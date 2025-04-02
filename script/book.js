const bookDetailsDiv = document.querySelector(".book-container"); // Use the container as main element
const bookTitleElement = document.getElementById("book-title");
const bookImageElement = document.getElementById("book-image");
const bookAuthorElement = document.getElementById("book-author");
const bookYearElement = document.getElementById("book-year");
const bookCategoriesElement = document.getElementById("book-categories");
const bookPriceElement = document.getElementById("book-price");
const buyButton = document.getElementById("buy-button");

const bookDescription = document.querySelector(".book-description");
const bookDescriptionContentElement = document.getElementById("book-description-content");


const ApiURL = 'https://djangopro123.pythonanywhere.com';

const categories = {
      1: "Fiction",
      2: "Mystery",
      3: "Thriller"
    };
const authors = {
      1: "Author One",
      2: "Author Two"
    };

let bookData = JSON.parse(localStorage.getItem("selectedBook"));

if (bookData) {
        let url_image = `${ApiURL}/staticfiles/${bookData.image}.jpg`;

        bookTitleElement.textContent = bookData.title;
        bookImageElement.src = url_image;
        bookImageElement.alt = bookData.title;
        bookAuthorElement.textContent = authors[bookData.author] ? authors[bookData.author] : 'Author data not found';
        bookYearElement.textContent = bookData.year_published;
        bookCategoriesElement.textContent = bookData.category_ids.map(id => categories[id] ? categories[id] : 'category data not found').join(", ");
        bookDescriptionContentElement.textContent = bookData.description;
        bookPriceElement.textContent = bookData.price;
    } else {
        bookDetailsDiv.innerHTML = "<p>Нет информации.</p>";
    }


    buyButton.addEventListener("click", function() {
      localStorage.setItem("BookforBuy", JSON.stringify(bookData));
      window.location.href = "./checkout.html";
    });



