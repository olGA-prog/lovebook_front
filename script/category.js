const categoryNameElement = document.getElementById("category-name");
const categoryBookGrid = document.getElementById("category-book-grid");

// Get category from URL or other method
const category = "modern"; // Replace with actual method to retrieve category

categoryNameElement.textContent = category;

const filteredBooks = books.filter(book => book.category === category);
filteredBooks.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
        <img src="" alt="${book.title}" class="book-cover">
        <h3 class="book-title">${book.title}</h3>
    `;
    categoryBookGrid.appendChild(bookItem);
});