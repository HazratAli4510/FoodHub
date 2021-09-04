/* --------------
 For JavaScript
 --------------------- */

//  Getting all things that we need as variable

const inputElement = document.getElementById('search-input')
const submitBtn = document.getElementById('submit-btn')
const foodcontainer = document.getElementById('categories-main')
const categoriesTitle = document.getElementById('categories-title')
const displayItem = document.getElementById('searchResultContainer')
const searchTitle = document.getElementById('search-title')
const loader = document.getElementById('loading')
const resultNotFound = document.getElementById('resultNotFound')

// Get search value and fetch product from API
submitBtn.addEventListener('click', event => {
    event.preventDefault()
    const inputValue = inputElement.value
    if (inputValue !== '') {

        // add loader animation
        loader.style.display = 'block'

        // clearing display
        displayItem.textContent = ''
        categoriesTitle.textContent = ''
        foodcontainer.textContent = ''
        searchTitle.innerText = 'Search results for ' + '"'+ inputValue + '"'
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        fetch(url)
            .then(Response => Response.json())
            .then(data =>displaySearchResult(data.meals))
    }
})

const displaySearchResult = (products) => {
    // Hiding the loader
    loader.style.display = 'none'
    if (products == null) {
        
        // adding result not found if result not found
        resultNotFound.style.display = 'block'
    } else {
        // removing result not found if result found
        resultNotFound.style.display = 'none'

        // Displaying search products
        products.forEach(product => {

            // creating main column
    
            const div = document.createElement('div')
            div.classList.add('col')
    
            // creating card div and appeand to main column
            const card = document.createElement('div')
            card.classList.add('card')
            card.classList.add('h-100')
            div.appendChild(card)
    
            // Creating product image element and appeand it to card
            const img = document.createElement('img')
            img.classList.add('card-img-top')
            img.classList.add('p-4')
            img.src = product.strMealThumb
            card.appendChild(img)
    
            //creating card body and adding it to card
            const cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            card.appendChild(cardBody)
    
            //creating card title and appeand
            const cardTitle = document.createElement('h5')
            cardTitle.classList.add('fw-bolder')
            cardTitle.classList.add('card-title')
            cardTitle.innerText = product.strMeal
            cardBody.appendChild(cardTitle)
    
            //creating card text and add
            const cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.classList.add('fs-6')
            cardText.innerText = product.strInstructions.slice(0,75)+'...'
            cardBody.appendChild(cardText)
    
            //creating product price and appeand
            const productPrice = document.createElement('h5')
            productPrice.classList.add('text-success')
            productPrice.classList.add('font-monospace')
            productPrice.innerText = '$25.00'
            cardBody.appendChild(productPrice)
    
            // Adding this product to main container
            displayItem.appendChild(div)
            
        });
    }
}