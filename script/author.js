document.addEventListener("DOMContentLoaded", function() {
  const authorDetailsDiv = document.getElementById("author-details");
  const authorBooksDiv = document.getElementById("author-books");
  const ApiURL = 'https://djangopro123.pythonanywhere.com'

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
      url_image=`${ApiURL}/staticfiles/${authorData.image}.jpg`;
      authorDetailsDiv.innerHTML = `
          <img src="${url_image}" alt="${authorData.name}">
          <div class="author-info">
              <h2>${authorData.name}</h2>
              <p>${authorData.description || 'Нет биографии автора.'}</p>
          </div>
      `;

      if (books){
          const authorBooks = books.filter(book => book.author === authorData.id);
          if (authorBooks.length > 0) {
              authorBooks.forEach((book, index) => {
                  url_image=`${ApiURL}/staticfiles/${book.image}.jpg`;
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
              authorBooksDiv.innerHTML = "<p>Книги данного автора не найдены.</p>";
          }
      } else{
          authorBooksDiv.innerHTML = "<p>No books currently stored, please add books</p>";
      }

  } else {
      authorDetailsDiv.innerHTML = "<p>Автор не найден.</p>";
  }
});