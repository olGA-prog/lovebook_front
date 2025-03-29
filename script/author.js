document.addEventListener("DOMContentLoaded", function() {
  const authorDetailsDiv = document.getElementById("author-details");
  const authorBooksDiv = document.getElementById("author-books");
  const ApiURL = 'http://127.0.0.1:8000/'

 // Check for edge cases for proper properties
 let authorData = null
 try{
      authorData = JSON.parse(localStorage.getItem("selectedAuthor"));
  }
  catch(e){
      authorData = null
  }
  let books = null
  try{
      books = JSON.parse(localStorage.getItem("AllBooks"));
  }
  catch(e){
      books = null
  }

  if (authorData) {
      url_image=`${ApiURL}/static/${authorData.image}.jpg`;
      console.log(url_image)
      authorDetailsDiv.innerHTML = `
          <img src="${url_image}" alt="${authorData.name}">
          <div class="author-info">
              <h2>${authorData.name}</h2>
              <p>${authorData.description || 'No biography available.'}</p>
          </div>
      `;

      if (books){
          const authorBooks = books.filter(book => book.author === authorData.id);
          if (authorBooks.length > 0) {
              authorBooks.forEach((book, index) => {
                  url_image=`${ApiURL}/static/${book.image}.jpg`;
                  const bookItem = document.createElement("div");
                  bookItem.classList.add("book-item");
                  bookItem.style.animationDelay = `${0.1 * (index + 1)}s`;
                  bookItem.innerHTML = `
                      <img src="${url_image}" alt="${book.title}">
                      <p>${book.title}</p>
                  `;
                  bookItem.addEventListener("click", () => {
                    localStorage.setItem("selectedBook", JSON.stringify(book));
                    window.location.href = "./book.html";
                  });
                  authorBooksDiv.appendChild(bookItem);
              });
          } else {
              authorBooksDiv.innerHTML = "<p>No books found by this author.</p>";
          }
      } else{
          authorBooksDiv.innerHTML = "<p>No books currently stored, please add books</p>";
      }

  } else {
      authorDetailsDiv.innerHTML = "<p>Author data not found.</p>";
  }
});