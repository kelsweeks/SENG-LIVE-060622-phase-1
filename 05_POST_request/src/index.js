document.addEventListener('DOMContentLoaded', () => {

// Fetch requests 
    // Function for making a GET request 
    function fetchResource(url){
        return fetch(url)
        .then(res => res.json())
    }
// Rendering functions
    // Renders Header
    function renderHeader(store){
        document.querySelector('h1').textContent = store.name
    }
    // Renders Footer
    function renderFooter(store){
        const footerDivs = document.querySelectorAll('footer div')
        footerDivs[0].textContent = store.name
        footerDivs[1].textContent = store.address
        footerDivs[2].textContent = store.hours
    }

    function renderBookCard(cardData) {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const pAuthor = document.createElement('p')
        const pPrice = document.createElement('p')
        const img = document.createElement('img')
        const btn = document.createElement('button')

        h3.textContent = cardData.title
        pAuthor.textContent = cardData.author
        pPrice.textContent = `$${cardData.price}`
        btn.textContent = 'Delete'

        img.src = cardData.imageUrl
        li.className = 'list-li'

        //Event Listeners 
        btn.addEventListener('click',()=>li.remove())
    
        li.append(h3,pAuthor,pPrice,img,btn)
        document.querySelector('#book-list').append(li)
    }

    function handleError(){
        const h1 = document.createElement('h1')
        h1.textContent = 'Sorry! There was a problem please check back soon!'
        document.querySelector('main').append(h1)
    }

// Event Handlers
    function handleForm(e){
        e.preventDefault()
        //Builds Book
        const book = {
            title: e.target.title.value,
            author:e.target.author.value,
            price: e.target.price.value,
            imageUrl: e.target.imageUrl.value,
            inventory:e.target.inventory.value,
            reviews:[]
        }
        renderBookCard(book)
    }


// Invoking functions    
    fetchResource('http://localhost:3000/stores/1')
    .then(store => {
        renderHeader(store)
        renderFooter(store)
    })
    .catch(e => {
        handleError()
        console.error(e)
    })

    fetchResource('http://localhost:3000/books')
    .then(books => books.forEach(renderBookCard))
    .catch(e => {
        handleError()
        console.error(e)
    })

    document.querySelector('#book-form').addEventListener('submit', handleForm)

})