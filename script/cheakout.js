
document.addEventListener("DOMContentLoaded", function() {
  const bookData = JSON.parse(localStorage.getItem("BookforBuy"));
  const userData = JSON.parse(localStorage.getItem("user"));
  const selectedBookContent = document.querySelector(".selected-book-content");

  if (!bookData) {
    selectedBookContent.innerHTML = "<p>No book selected.</p>";
    return; // Выходим из функции, если нет данных о книге
  }

  if (!userData || !userData.telegram_id) {
    selectedBookContent.innerHTML = "<p>No user data or telegram_id found.  Please log in again.</p>";
    return; // Выходим из функции, если нет данных о пользователе
  }

  selectedBookContent.innerHTML = `
    <h2>${bookData.title}</h2>
    <p>Цена: ${bookData.price}</p>
  `;

  const buttonSudmit = document.getElementById("button-sudmit");
  buttonSudmit.addEventListener("click", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы (если она есть)

    const data = {
      name: bookData.name, // Отправляем "name", а не "book_name"
      price: bookData.price,
      user_id: userData.telegram_id,
    };

    console.log("Sending data to bot:", data); // Добавляем логирование

    Telegram.WebApp.sendData(JSON.stringify(data));

    Telegram.WebApp.onEvent('web_app_data', (event) => {
      try {
        console.log("Received data from bot:", event.data); // Добавляем логирование

        const responseData = JSON.parse(event.data);
        if (responseData && responseData.invoice_link) { // Проверяем, что объект responseData существует и содержит invoice_link
          Telegram.WebApp.openInvoice(responseData.invoice_link);
        } else {
          console.error('No invoice link received from bot or invalid format:', responseData); // Добавляем логирование
          alert('Не удалось создать счет. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Error parsing invoice link:', error);
        alert('Ошибка при обработке счета.');
      }
    });
  });
});