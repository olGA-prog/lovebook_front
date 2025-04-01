
document.addEventListener("DOMContentLoaded", function() {
    const bookData = JSON.parse(localStorage.getItem("BookforBuy"));
    console.log(bookData)
    const selectedBookContent = document.querySelector(".selected-book-content");
    function generateIdempotencyKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
        alert(
          `Спасибо, ${name}! После оплаты книга "${bookData.title}" будет выслана на почту: ${email}.`
        );
        function handleBuyClick() {
          const data = {
            book_name: bookData.name,
            price: bookData.price,
            user_id: 456,
            description: "Test Product"
          };
        
          Telegram.WebApp.sendData(JSON.stringify(data)); 
        }
      });
    } else {
      selectedBookContent.innerHTML = "<p>No book selected.</p>";
    }
 
});