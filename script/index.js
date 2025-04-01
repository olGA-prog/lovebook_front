
const bookGrid = document.getElementById("book-grid");
const seriesSlider = document.getElementById("series-slider");
const authorSlider = document.getElementById("author-slider");
const categoryButtons = document.querySelectorAll(".category-button");
const categoryFilter = document.querySelector(".category-filter");
const searchInput = document.getElementById("search-input");
let activeCategory = "all";
let bookDataSave;
const ApiURL = 'https://djangopro123.pythonanywhere.com'


let tg = window.Telegram.WebApp; 
tg.expand()
const user = tg.initDataUnsafe.user; 
alert(user)
if (user) {
    const userData = {
    user_id: user.id.toString(),
    username: user.username || '',
    first_name: user.first_name || '',
    last_name: user.last_name || ''
};

fetch(`${ApiURL}save_user/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => {
  console.log('User saved on server:', data);
  localStorage.setItem('user', JSON.stringify(data));
  alert(JSON.stringify(data)) 

  console.log('User saved to localStorage');
})
.catch(error => console.error('Error saving user:', error));
}

async function loadData() {
  try {
    const categoryData = await getCategories();
    const booksData = await getBooks();
    bookDataSave  =  booksData;
    localStorage.setItem("AllBooks", JSON.stringify(booksData));
    console.log(booksData)
    createCategoryButtons(categoryData)
    displayBooks("all", bookDataSave);
    const authorsData = await getAuthors();
    displaySliderAuthor(authorsData)
    const seriesData = await getSeriesList();
    displaySliderSeries(seriesData)
    
    
  } catch (error) {
    
    console.error('Error loading data:', error);
    bookGrid.textContent = 'Error loading books.';
    authorSlider.textContent = 'Error loading authors.';
  }
}


function displayBooks(category, booksData) {
    bookGrid.innerHTML = "";
    let filteredBooks = [];

    if (category === "all") {
        filteredBooks = booksData; 
      } else {
        console.log(booksData)
        filteredBooks = booksData.filter(book => book.category_ids.includes(parseInt(category)));
      }
      console.log(filteredBooks)
    if(filteredBooks.length === 0){
      bookGrid.textContent = 'Нет книг такой категории!'
    }

    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        url_image=`${ApiURL}/staticfiles/${book.image}.jpg`;
        console.log(url_image)
        bookItem.innerHTML = `
            <img src="${url_image}" alt="${book.title}" class="book-cover">
            <h3 class="book-title">${book.title}</h3>
        `;
        bookItem.addEventListener("click", () => {
            localStorage.setItem("selectedBook", JSON.stringify(book));
            window.location.href = "./pages/book.html";
          });
        bookGrid.appendChild(bookItem);
    });
}




function createCategoryButtons(categoryData) {
 
  const allButton = document.createElement("button");
  allButton.classList.add("category-button");
  allButton.dataset.category = "all";  // "all" is the key
  allButton.textContent = "Все";

  if (activeCategory === "all") {
    allButton.classList.add("active");
  }

  allButton.addEventListener("click", () => {
      const categoryButtons = document.querySelectorAll(".category-button");
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      allButton.classList.add("active"); // Activate the "All" button
      activeCategory = "all";
      displayBooks(activeCategory, bookDataSave);
  });

  categoryFilter.appendChild(allButton);

  categoryData.forEach(category => {
      const button = document.createElement("button");
      button.classList.add("category-button");
      button.dataset.category = category.id;
      button.textContent = category.name;

      if (activeCategory !== "all" && category.id === parseInt(activeCategory)) {
          button.classList.add("active");
      }

      button.addEventListener("click", () => {
          const categoryButtons = document.querySelectorAll(".category-button");
          categoryButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
          activeCategory = button.dataset.category;
          displayBooks(activeCategory, bookDataSave);
      });

      categoryFilter.appendChild(button);
  });
}


function filterBooks(searchTerm, books) {
  searchTerm = searchTerm.toLowerCase();
  return books.filter(book => {
      return book.title.toLowerCase().includes(searchTerm)
  });
}

searchInput.addEventListener("input", function() {
  const searchTerm = searchInput.value;
  const filteredBooks = filterBooks(searchTerm, bookDataSave);
  displayBooks(activeCategory, filteredBooks);
});

  

function displaySliderSeries(seriesData) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = ''; // Clear existing slides
  seriesData.forEach(series => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `
          <div class="series-slide">
              <img class="series-image" src="${ApiURL}/staticfiles/${series.image}.png" alt="${series.name}">
              <div class="series-overlay">
                  <h3 class="series-title">${series.name}</h3>
              </div>
          </div>
      `;
      slide.addEventListener("click", () => {
        localStorage.setItem("selectedSeries", JSON.stringify(series));
        window.location.href = "./pages/series.html";
      });
      swiperWrapper.appendChild(slide);
  });
}
  

  function displaySliderAuthor(authorsData){
  const swiperWrapper2 =  authorSlider.querySelector('.swiper-wrapper');
  authorsData.forEach(author => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `<div class="author-slide"><img class="author-image" src="${ApiURL}/staticfiles/${author.image}.jpg"><p>${author.name}</p></div>`; 
      slide.addEventListener("click", () => {
        localStorage.setItem("selectedAuthor", JSON.stringify(author));
        window.location.href = "./pages/author.html";
      });
      swiperWrapper2.appendChild(slide);

  });
}

  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
});



loadData()