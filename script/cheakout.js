
document.addEventListener("DOMContentLoaded", function() {
    const bookData = JSON.parse(localStorage.getItem("BookforBuy"));
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(bookData)
    const selectedBookContent = document.querySelector(".selected-book-content");
    let tgCheck = window.Telegram.WebApp; 

    if (bookData) {
      selectedBookContent.innerHTML = `
        <h2>${bookData.title}</h2>
        <p>Цена: ${bookData.price}</p>
      `;
      
    const buttonSudmit =document.getElementById("button-sudmit")
    buttonSudmit.addEventListener("click", function(event) {
      alert("click button")
      event.preventDefault(); 
      const data = {
        book_name: bookData.name,
        price: bookData.price,
        user_id: userData.telegram_id,
      };
      alert(data)
    
      tgCheck.sendData(JSON.stringify(data)); 
      tgCheck.onEvent('web_app_data', (event) => {
        try {
          alert('send in bot')
          const responseData = JSON.parse(event.data);
          if (responseData.invoice_link) { 
            tgCheck.openInvoice(responseData.invoice_link);
          } else {
            console.error('No invoice link received from bot');
            alert('Не удалось создать счет.'); 
          }
        } catch (error) {
          console.error('Error parsing invoice link:', error);
          alert('Ошибка при обработке счета.'); 
        }
      });
      
      
    });
 
  }});