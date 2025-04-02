const API_BASE_URL = 'https://djangopro123.pythonanywhere.com/app/';  // Base URL for your API

// Helper function to handle API requests and errors
async function handleRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Categories
async function getCategories() {
  return handleRequest(`${API_BASE_URL}categories/`);
}

// Authors
async function getAuthors() {
  return handleRequest(`${API_BASE_URL}authors/`);
}

async function getAuthor(id) {
  return handleRequest(`${API_BASE_URL}authors/${id}/`);
}

// Series
async function getSeriesList() {
  return handleRequest(`${API_BASE_URL}series/`);
}

async function getSeries(id) {
  return handleRequest(`${API_BASE_URL}series/${id}/`);
}

// Books
async function getBooks() {
  return handleRequest(`${API_BASE_URL}books/`);
}

async function getBook(id) {
  return handleRequest(`${API_BASE_URL}books/${id}/`);
}

// Orders
async function getOrder(id) {
  return handleRequest(`${API_BASE_URL}orders/${id}/`);
}

// Payments
async function getPayment(id) {
  return handleRequest(`${API_BASE_URL}payments/${id}/`);
}

// Books by Category, Author, or Series
async function getBooksByCategory(categoryId) {
  return handleRequest(`${API_BASE_URL}categories/${categoryId}/books/`);
}

async function getBooksByAuthor(authorId) {
  return handleRequest(`${API_BASE_URL}authors/${authorId}/books/`);
}

async function getBooksBySeries(seriesId) {
  return handleRequest(`${API_BASE_URL}series/${seriesId}/books/`);
}

// Create Order
async function createOrder(orderData) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  };
  return handleRequest(`${API_BASE_URL}orders/`, options);
}

// Users
async function getUser(id) {
  return handleRequest(`${API_BASE_URL}users/${id}/`);
}

async function CreatePayment(payload) {
  return handleRequest(`${API_BASE_URL}create_payment/`,  {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    body: new URLSearchParams(payload) 
  });
}