
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
      const checkoutForm = document.getElementById("checkout-form");
      const buttonSudmit =this.document.getElementById("button-sudmit")

      checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const name = document.getElementById("name").value;
        const email = document.getElementById("address").value; 
        if (!name || !email) {
          alert("Пожалуйста введите корректные значения!");
          return;
        }
        
      });
    } else {
      selectedBookContent.innerHTML = "<p>No book selected.</p>";
    }

    buttonSudmit.addEventListener("click", function(event) {
      event.preventDefault(); 
      const data = {
        book_name: bookData.name,
        price: bookData.price,
        user_id: userData.telegram_id,
      };
    
      tgCheck.sendData(JSON.stringify(data)); 
      tgCheck.onEvent('web_app_data', (event) => {
        try {
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
 
});