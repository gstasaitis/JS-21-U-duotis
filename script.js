const API_URL = "https://sophisticated-humane-dandelion.glitch.me" 
const productsContainer = document.querySelector(".container") 
const form = document.querySelector('form') 
const delBtn = document.getElementById("delete") 

const loadData = async () => {
    try {
    const response = await fetch(API_URL) 
    const data = await response.json() 
    printData(data) 
    console.log(data) 
    } catch (error) {
    console.error('Error fetching data:', error) 
    }
} 

const printData = (data) => {
    if (!data) return 
  productsContainer.innerHTML = ""  // Clear existing content
    data.forEach((item) => {
    const newCard = document.createElement("div") 
    newCard.classList.add("products") 
    newCard.innerHTML = `
        <img src="${item.image}" alt="" srcset="">
        <p>${item.title}</p>
        <h3>€ ${item.price}</h3>
        <button class="delete" data-product-id="${item.id}">Ištrinti</button>
    ` 
    productsContainer.appendChild(newCard) 
    }) 


    document.querySelectorAll('.delete').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', deleteProduct) 
    }) 
} 

const deleteProduct = async (e) => {
    const productId = e.target.dataset.productId 

    try {
    const response = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        },
    }) 
console.log(response)

    if (response.ok) {
    alert(`Produktas ištrintas.`) 
    loadData() 
    } else {
        console.error('Error deleting product:', response.statusText) 
    }
    } catch (error) {
    console.error('Error:', error.message) 
    }
} 

form.addEventListener('submit', async (e) => {
e.preventDefault() 
const image = document.getElementById("image").value 
const title = document.getElementById("title").value 
const price = document.getElementById("price").value 

  // Add the new product to the list
    await fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        image,
        title,
        price,
    }),
}) 

document.getElementById("image").value = "" 
document.getElementById("title").value = "" 
document.getElementById("price").value = "" 

loadData() 
}) 

loadData() 