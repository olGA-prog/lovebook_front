
document.addEventListener("DOMContentLoaded", function() {
  const bookData = JSON.parse(localStorage.getItem("BookforBuy"));
  const userData = JSON.parse(localStorage.getItem("user"));
  const selectedBookContent = document.querySelector(".selected-book-content");
  let tgCheak = window.Telegram.WebApp; 
 
  if (!bookData) {
    selectedBookContent.innerHTML = "<p>No book selected.</p>";
    return; // Выходим из функции, если нет данных о книге
  }


  selectedBookContent.innerHTML = `
    <h2>${bookData.title}</h2>
    <p>Цена: ${bookData.price}</p>
  `;

  const buttonSudmit = document.getElementById("button-sudmit");
  buttonSudmit.addEventListener("click", function(event) {
    event.preventDefault(); 
    const file_book = JSON.stringify(bookData.ebook_file)
    alert('file:', file_book)
    let filename = file_book.split('/')[-1]
    console.log(filename)
    //books/ebooks/Reyli_Hroniki_mafii_Rozhdyonnye_v_krovi_1_Svyazannye_chestyu.epub
    const data = {
      name: bookData.name, 
      price: bookData.price,
      download_link: filename 
    };
 

    tgCheak.sendData(JSON.stringify(data));

    tgCheak.onEvent('web_app_data', (event) => {
      try {
        console.log("Received data from bot:", event.data); 

        const responseData = JSON.parse(event.data);
        if (responseData ) { 
          tgCheak.openInvoice(responseData);
        } else {
          console.error('No invoice link received from bot or invalid format:', responseData);
          alert('Не удалось создать счет. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Error parsing invoice link:', error);
        alert('Ошибка при обработке счета.');
      }
    });
  });
});