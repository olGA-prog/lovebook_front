
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
        const paymentData = {
            amount: bookData.price,
            name: name,
            email: email,
            idempotency_key: generateIdempotencyKey() // VERY IMPORTANT - generate this randomly!
        };
        try {
            const payments =  CreatePayment(paymentData);
            console.log(payments)
          } catch (error) {
            
            console.error('Error loading data:', error);
            bookGrid.textContent = 'Error loading books.';
            authorSlider.textContent = 'Error loading authors.';
          }

        localStorage.removeItem("BookforBuy"); 
      });
    } else {
      selectedBookContent.innerHTML = "<p>No book selected.</p>";
    }
 
});