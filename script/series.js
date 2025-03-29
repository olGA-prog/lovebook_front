document.addEventListener("DOMContentLoaded", function() {
  const seriesDetailsDiv = document.getElementById("series-details");
  const seriesBooksDiv = document.getElementById("series-books");
  const seriesNameSpan = document.getElementById("series-name");
  const ApiURL = 'https://djangopro123.pythonanywhere.com/'

  let seriesData = null
  try{
      seriesData = JSON.parse(localStorage.getItem("selectedSeries"));
  }
  catch(e){
      seriesData = null
  }
  let books = null
  try{
      books = JSON.parse(localStorage.getItem("AllBooks"));
  }
  catch(e){
      books = null
  }

  if (seriesData) {
      seriesNameSpan.textContent = seriesData.name; 
      url_image=`${ApiURL}/staticfiles/${seriesData.image}.png`;
      console.log(url_image)
      seriesDetailsDiv.innerHTML = `
          <img src="${url_image}" alt="${seriesData.name}">
          <div class="series-overlay">
              <h2>${seriesData.name}</h2>
              <p>${seriesData.description}</p>
          </div>
      `;
      if (books){
          const seriesBooks = books.filter(book => book.series === seriesData.id);

          if (seriesBooks.length > 0) {
              seriesBooks.forEach((book, index) => {
                  const bookItem = document.createElement("div");
                  bookItem.classList.add("book-item");
                  bookItem.style.animationDelay = `${0.1 * (index + 1)}s`; 
                  url_image=`${ApiURL}/staticfiles/${book.image}.jpg`;
                  bookItem.innerHTML = `
                      <img src="${url_image}" alt="${book.title}">
                      <p>${book.title}</p>
                  `;
                  bookItem.addEventListener("click", () => {
                    localStorage.setItem("selectedBook", JSON.stringify(book));
                    window.location.href = "./book.html";
                  });
                  seriesBooksDiv.appendChild(bookItem);
              });
          } else {
              seriesBooksDiv.innerHTML = "<p>No books found in this series.</p>";
          }
      } else{
          seriesBooksDiv.innerHTML = "<p>No books currently stored, please add books</p>";
      }
  } else {
      seriesDetailsDiv.innerHTML = "<p>Series data not found.</p>";
  }
});