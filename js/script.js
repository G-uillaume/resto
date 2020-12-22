const filterMenu = pattern => {
    let results = [];

    const scrollMenu = document.querySelector('#scrollMenu')

    for (let plat of menu) {
        if (plat.title.match(pattern) || plat.description.match(pattern)) {
            scrollMenu.innerHTML = ''
            results.push(plat)
        } else if (pattern === 'all') {
            results.push(plat)
        } else {
            for (let elem of plat.category) {
                if (elem.match(pattern)) {
                    scrollMenu.innerHTML = ''
                    results.push(plat)
                }
            }
        }
    }

    

    for (let carte of results) {
        const card = document.createElement('div')
        card.className = 'card'

        const cardImage = document.createElement('div')
        cardImage.className = 'card-image'
        const fig = document.createElement('figure')
        fig.className = 'image is-128x128'
        const img = document.createElement('img')
        img.src = carte.image
        fig.appendChild(img)
        cardImage.appendChild(fig)
        card.appendChild(cardImage)

        const cardContent = document.createElement('div')
        cardContent.className = 'card-content p-2'
        const h3 = document.createElement('h3')
        h3.className = 'subtitle is-3'
        h3.textContent = carte.title.toUpperCase()
        const p = document.createElement('p')
        p.textContent = carte.description
        const tags = document.createElement('div')
        tags.className = 'tags'
        for (let type of carte.category) {
            const tag = document.createElement('p')
            tag.className = 'tag'
            tag.textContent = type
            tags.appendChild(tag)
        }
        cardContent.appendChild(h3)
        cardContent.appendChild(p)
        cardContent.appendChild(tags)
        card.appendChild(cardContent)

        const cardFooter = document.createElement('div')
        cardFooter.className = 'card-footer px-3'
        const price = document.createElement('p')
        price.className = 'bodoni price'
        price.textContent = carte.price.toFixed(2) + ' €'
        cardFooter.appendChild(price)
        for (let x of carte.category) {
            if (x.match('Végétarien')) {
                const vege = document.createElement('p')
                const spanVege = document.createElement('span')
                spanVege.className = 'icon is-small'
                const i = document.createElement('i')
                i.className = 'fas fa-leaf'
                spanVege.appendChild(i)
                vege.appendChild(spanVege)
                cardFooter.appendChild(vege)
            }
        }
        const basket = document.createElement('p')
        basket.style.cursor = 'pointer'
        const spanBasket = document.createElement('span')
        spanBasket.className = 'icon is-small'
        const iBasket = document.createElement('i')
        iBasket.className = 'fas fa-shopping-basket'
        spanBasket.appendChild(iBasket)
        basket.appendChild(spanBasket)
        cardFooter.appendChild(basket)
        card.appendChild(cardFooter)

        scrollMenu.appendChild(card)
        basket.addEventListener('click', () => {
            if (!commandMade) {
                let prix = 0
                count++
                const panier = document.querySelector('#panier')
                panier.innerHTML = '<span class="icon is-large"><i class="fas fa-shopping-cart"></i></span>( ' + count + ' )'
                const cardBody = document.querySelector('.modal-card-body')
                if (!arrPanier.includes(carte)) {
                    arrPanier.push(carte)
                    const divProduct = document.createElement('div')
                    divProduct.className = 'is-flex is-align-items-center is-justify-content-space-between my-1 carte'
                    const modalImg = document.createElement('div')
                    modalImg.className = 'modal-card-image'
                    const figurePanier = document.createElement('figure')
                    figurePanier.className = 'image is-64x64'
                    const imgPanier = document.createElement('img')
                    imgPanier.src = carte.image
                    figurePanier.appendChild(imgPanier)
                    modalImg.appendChild(figurePanier)
                    divProduct.appendChild(modalImg)
                    const modalCardContent = document.createElement('div')
                    modalCardContent.className = 'modal-card-content'
                    const paraPanier = document.createElement('p')
                    paraPanier.textContent = carte.title
                    modalCardContent.appendChild(paraPanier)
                    divProduct.appendChild(modalCardContent)
                    const inputPanier = document.createElement('input')
                    inputPanier.type = 'number'
                    inputPanier.id = 'inputPanier' + carte.index
                    inputPanier.className = 'inputPanier'
                    inputPanier.min = 1
                    inputPanier.value = 1
                    inputPanier.readOnly = true
                    divProduct.appendChild(inputPanier)
                    const moinsBtn = document.createElement('button')
                    moinsBtn.className = 'moinsBtn'
                    moinsBtn.textContent = '-'
                    const plusBtn = document.createElement('button')
                    plusBtn.className = 'plusBtn'
                    plusBtn.textContent = '+'
                    divProduct.appendChild(moinsBtn)
                    divProduct.appendChild(plusBtn)
                    const deleteProduct = document.createElement('button')
                    deleteProduct.className = 'button deleteProduct'
                    deleteProduct.textContent = 'Supprimer'
                    divProduct.appendChild(deleteProduct)
                    const prixPanier = document.createElement('p')
                    prixPanier.id = 'prixPanier' + carte.index
                    prixPanier.className = 'prixPanier'
                    divProduct.appendChild(prixPanier)
                    cardBody.appendChild(divProduct)
                    prix = carte.price
                    prixPanier.textContent = prix.toFixed(2) + ' €'
                    const paraTotal = document.querySelector('#total')
                    total = total + carte.price
                    paraTotal.textContent = total.toFixed(2) + ' €'
                    const command = document.querySelector('#command')
                    command.disabled = false
                    moinsBtn.addEventListener('click', () => {
                        if (inputPanier.value > 1) {
                            inputPanier.value--
                            count--
                            panier.innerHTML = '<span class="icon is-large"><i class="fas fa-shopping-cart"></i></span>( ' + count + ' )'
                        }
                        let value = inputPanier.value
                        prix = carte.price * value
                        prixPanier.textContent = prix.toFixed(2) + ' €'
                        const toutLesPrix = document.querySelectorAll('.prixPanier')
                        let arrTotal = []
                        for (let i = 0; i < toutLesPrix.length; i++) {
                            arrTotal.push(Number(toutLesPrix[i].textContent.slice(0, -1)))
                        }
                        const paraTotal = document.querySelector('#total')
                        const add = (x, y) => x + y
                        total = arrTotal.reduce(add)
                        paraTotal.textContent = total.toFixed(2) + ' €'
                    })
                    plusBtn.addEventListener('click', () => {
                        inputPanier.value++
                        count++
                        panier.innerHTML = '<span class="icon is-large"><i class="fas fa-shopping-cart"></i></span>( ' + count + ' )'
                        let value = inputPanier.value
                        prix = carte.price * value
                        prixPanier.textContent = prix.toFixed(2) + ' €'
                        const toutLesPrix = document.querySelectorAll('.prixPanier')
                        let arrTotal = []
                        for (let i = 0; i < toutLesPrix.length; i++) {
                            arrTotal.push(Number(toutLesPrix[i].textContent.slice(0, -1)))
                        }
                        const paraTotal = document.querySelector('#total')
                        const add = (x, y) => x + y
                        total = arrTotal.reduce(add)
                        paraTotal.textContent = total.toFixed(2) + ' €'
                    })
                    deleteProduct.addEventListener('click', () => {
                        count = count - inputPanier.value
                        panier.innerHTML = '<span class="icon is-large"><i class="fas fa-shopping-cart"></i></span>( ' + count + ' )'
                        let totalASupprimer = Number(prixPanier.textContent.slice(0, -1))
                        total = Number(paraTotal.textContent.slice(0, -1)) - totalASupprimer
                        console.log(total)
                        paraTotal.textContent = total.toFixed(2) + ' €'
                        arrPanier.splice(arrPanier.indexOf(carte), 1)
                        cardBody.removeChild(divProduct)
                        if (arrPanier.length == 0) {
                            // const command = document.querySelector('#command')
                            command.disabled = true
                        }
                    })
                } else {
                    const paraTotal = document.querySelector('#total')
                    total = total + carte.price
                    paraTotal.textContent = total.toFixed(2) + ' €'
                    const prixPanier = document.querySelector('#prixPanier' + carte.index)
                    const inputPanier = document.querySelector('#inputPanier' + carte.index)
                    inputPanier.value++
                    oldPrice = Number(prixPanier.textContent.slice(0, -1))
                    prix = carte.price
                    let newPrice = carte.price * inputPanier.value
                    prixPanier.textContent = newPrice.toFixed(2) + ' €'
                }
            }
        })
    }
}
let count = 0
let total = 0
let arrPanier = []

window.addEventListener('load', () => {
    filterMenu('all')
})
document.querySelector('#searchBar')
    .addEventListener('keyup', input => {
        let inputValue = input.target.value
        const pattern = new RegExp(inputValue, 'gim')
        filterMenu(pattern)
    })

panier.addEventListener('click', () => {
    document.querySelector('.modal').className = 'modal is-active'
})

const command = document.querySelector('#command')

let commandMade = false
command.addEventListener('click', () => {
    commandMade = true
    const panier = document.querySelector('.modal-card-body')
    const carte = document.querySelector('.modal-card-body div:first-child')
    const h2 = document.createElement('h2')
    h2.className = 'title is-2 bodoni has-text-centered'
    const p = document.createElement('p')
    p.className = 'has-text-centered is-size-5 has-text-weight-bold mb-4'
    p.id = 'delivery'
    panier.insertBefore(h2, carte)
    panier.insertBefore(p, carte)
    h2.textContent = 'Merci !'
    const deleteProducts = document.querySelectorAll('.deleteProduct')
    for (let elem of deleteProducts) {
        elem.disabled = true
    }
    const moinsBtn = document.querySelectorAll('.moinsBtn')
    for (let elem of moinsBtn) {
        elem.disabled = true
    }
    const plusBtn = document.querySelectorAll('.plusBtn')
    for (let elem of plusBtn) {
        elem.disabled = true
    }
    
    let x = livraison() // j'enferme la valeur de deliveryTime dans x car j'ai besoin qu'elle reste fixe

    change(x)
    command.disabled = true
})

document.querySelector('.delete')
    .addEventListener('click', () => {
        document.querySelector('.modal').className = 'modal'
    })

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
});

for (let link of links) {
    link.addEventListener('click', () => {
        navLinks.classList.toggle('open')
        for (let x of links) {
            x.classList.toggle('fade')
        }
    })
}