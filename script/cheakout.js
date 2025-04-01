
document.addEventListener("DOMContentLoaded", function() {
    const bookData = JSON.parse(localStorage.getItem("BookforBuy"));
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(bookData)
    const selectedBookContent = document.querySelector(".selected-book-content");

    function handleBuyClick(name, price, user_id) {
      const data = {
        book_name: name,
        price: price,
        user_id: user_id,
      };
    
      Telegram.WebApp.sendData(JSON.stringify(data)); 
      Telegram.WebApp.onEvent('web_app_data', (event) => {
        try {
          const responseData = JSON.parse(event.data);
          if (responseData.invoice_link) { // Предполагаем, что бот вернет invoice_link
            Telegram.WebApp.openInvoice(responseData.invoice_link);
          } else {
            console.error('No invoice link received from bot');
            alert('Не удалось создать счет.'); // или другое сообщение
          }
        } catch (error) {
          console.error('Error parsing invoice link:', error);
          alert('Ошибка при обработке счета.'); // или другое сообщение
        }
      });
    }

    if (bookData) {
      selectedBookContent.innerHTML = `
        <h2>${bookData.title}</h2>
        <p>Цена: ${bookData.price}</p>
      `;
      const checkoutForm = document.getElementById("checkout-form");

      checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const name = document.getElementById("name").value;
        const email = document.getElementById("address").value; 
        if (!name || !email) {
          alert("Пожалуйста введите корректные значения!");
          return;
        }
        handleBuyClick(bookData.name, bookData.price, userData.telegram_id)
        alert(
          `Спасибо, ${name}! После оплаты книга "${bookData.title}" будет выслана на почту: ${email}.`
        );
        
      });
    } else {
      selectedBookContent.innerHTML = "<p>No book selected.</p>";
    }
 
});