const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const backModalBtn = document.getElementById('back-modal-btn')
const cartCounter = document.getElementById('cart-count')
const clientInput = document.getElementById('client')
const clientWarn = document.getElementById('client-warn')
const paymentSelect = document.getElementById('payment')
const paymentWarn = document.getElementById('payment-warn')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')
const obsInput = document.getElementById('obs')
const addToCartBtn = document.querySelectorAll('button.add-to-cart-btn')
const removeFromCartBtn = document.querySelectorAll('button.remove-from-cart-btn')
const continueBtn = document.getElementById('continue-btn')
const form = document.getElementById('form')


let cart = []

cartBtn.addEventListener('click', function () {
    updateCartModal()
    cartModal.style.display = 'flex'
})

cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none'
    }
})

closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none'
})

backModalBtn.addEventListener('click', function () {
    closeModalBtn.classList.remove('hidden')
    continueBtn.classList.remove('hidden')
    cartItemsContainer.classList.remove('hidden')
    backModalBtn.classList.add('hidden')
    checkoutBtn.classList.add('hidden')
    form.classList.add('hidden')
})

addToCartBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        const name = btn.getAttribute('data-name')
        const price = parseFloat(btn.getAttribute('data-price'))
        addToCart(name, price)
    })
})

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    Toastify({
        text: "Item adicionado ao carrinho!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#33363D",
            color: "#15B629",
        },
    }).showToast();

    updateCartModal()

}

function updateCartModal() {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add('flex', 'justify-between', 'mb-2', 'flex-col')
        let value = item.price
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        cartItemElement.innerHTML = `
            <div
                class="flex flex-col shadow-floating p-3 rounded-xl bg-gray-100">
                <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">
                            ${item.name}
                        </p>

                        <p class="font-medium">
                            ${value}
                        </p>
                    </div>
                    <div class="flex flex-col gap-2 w-24">
                        <div class="flex items-center justify-center">
                            <div class="flex">
                                <button class="decrease-qtd-btn px-2" data-name="${item.name}">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <p class="px-2 w-8 text-center">
                                    ${item.quantity}
                                </p>
                                <button class="increase-qtd-btn px-2" data-name="${item.name}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button class="remove-from-cart-btn flex items-center justify-center"
                            data-name="${item.name}">
                            <i class="fa-regular fa-trash-can text-xl text-red-600 flex items-center justify-center"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    cartCounter.innerHTML = cart.length

}

cartItemsContainer.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.remove-from-cart-btn')
    if (parentButton) {
        const name = parentButton.getAttribute('data-name')
        removeItemCart(name)
    }

    let decreaseBtn = event.target.closest('.decrease-qtd-btn')
    if (decreaseBtn) {
        const itemName = decreaseBtn.getAttribute('data-name')
        const item = cart.find(i => i.name === itemName)
        if (item && item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
        }
    }

    let increaseBtn = event.target.closest('.increase-qtd-btn')
    if (increaseBtn) {
        const itemName = increaseBtn.getAttribute('data-name')
        const item = cart.find(i => i.name === itemName)
        if (item) {
            item.quantity += 1
            updateCartModal()
        }
    }
})


function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)
    if (index !== -1) {
        cart.splice(index, 1)
        Toastify({
            text: "Item removido do carrinho!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#33363D",
                color: "#CB3A19",
            },
        }).showToast();
        updateCartModal()
    }
}

clientInput.addEventListener('input', function (event) {
    let clientValue = event.target.value

    if (clientValue !== "") {
        clientInput.classList.remove('border-red-500')
        clientWarn.classList.add('hidden')
    }
})

paymentSelect.addEventListener('change', function (event) {
    let paymentValue = event.target.value

    if (paymentValue !== "") {
        paymentSelect.classList.remove('border-red-500')
        paymentWarn.classList.add('hidden')
    }
})

addressInput.addEventListener('input', function (event) {
    let addressValue = event.target.value

    if (addressValue !== "") {
        addressInput.classList.remove('border-red-500')
        addressWarn.classList.add('hidden')
    }
})

continueBtn.addEventListener('click', function () {

    const isOpen = checkOpen()

    if (!isOpen) {
        Toastify({
            text: "Restaurante fechado!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return
    } else if (cart.length === 0) {
        Toastify({
            text: "Carrinho vazio!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#010409",
            },
        }).showToast();
        return
    } else {
        checkoutBtn.classList.remove('hidden')
        form.classList.remove('hidden')
        backModalBtn.classList.remove('hidden')
        continueBtn.classList.add('hidden')
        closeModalBtn.classList.add('hidden')
        cartItemsContainer.classList.add('hidden')
    }
})

checkoutBtn.addEventListener('click', function () {

    if (clientInput.value === "") {
        clientWarn.classList.remove('hidden')
        clientInput.classList.add('border-red-500')
        return
    } else if (paymentSelect.value === "") {
        paymentWarn.classList.remove('hidden')
        paymentSelect.classList.add('border-red-500')
        return
    } else if (addressInput.value === "") {
        addressWarn.classList.remove('hidden')
        addressInput.classList.add('border-red-500')
        return
    }

    const cartItems = cart.map((item) => {
        const priceFormatted = item.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        const subtotal = (item.quantity * item.price)
        const subtotalFormatted = subtotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        
        return `${item.name} | Qtd: ${item.quantity} x R$ ${priceFormatted} = Subtotal: R$ ${subtotalFormatted}\n`
    }).join("")

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalFormatted = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    const pedido = encodeURIComponent(cartItems)
    const phone = '5581992718851'

    window.open(`https://wa.me/${phone}?text=Boa noite! Gostaria de fazer um pedido.%0AItens:%0A${pedido}Total: ${totalFormatted}%0A%0ANome: ${clientInput.value}%0AForma de pagamento: ${paymentSelect.value}%0AEndereço: ${addressInput.value}%0AObs.: ${obsInput.value}`, "_blank")

    location.reload()
})

function checkOpen() {
    const data = new Date()
    const hora = data.getHours();
    return hora >= 18 && hora < 23
    
}

const spanItem = document.getElementById('date-span')
const isOpen = checkOpen()

if (isOpen) {
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600')
} else {
    spanItem.classList.remove('bg-green-600')
    spanItem.classList.add('bg-red-500')
}