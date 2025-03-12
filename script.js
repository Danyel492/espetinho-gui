const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')
const spanItem = document.getElementById("date-span")

let cart = []

// Abrir o modal do carrinho 
cartBtn.addEventListener("click", () => {
    updateCartModal()
    cartModal.style.display = "flex"
})

// Fechar o modal quando clicar fora ou no botão "Fechar"
cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal || event.target === closeModalBtn) {
        cartModal.style.display = "none"
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
        syncQuantities()
    }
})

menu.addEventListener("click", (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn')
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        const span = parentButton.previousElementSibling;
        span.textContent = parseInt(span.textContent) + 1;

        addToCart(name, price)
    }

    parentButton = event.target.closest('.remove-to-cart-btn')
    if (parentButton) {
        const span = parentButton.nextElementSibling;
        const currentValue = parseInt(span.textContent);
        if (currentValue > 0) {
            span.textContent = currentValue - 1;
            removeFromCart(parentButton.getAttribute("data-name"))
        }
    }
    updateCartModal()
})

//Função para adicionar no carrinho
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
    updateCartModal()
}

//Função para remover do carrinho
function removeFromCart(name) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1
        } else {
            cart = cart.filter(item => item.name !== name)
        }
    }
    updateCartModal()
}

// Função da cor do fundo do botão
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const removeFromCartButtons = document.querySelectorAll('.remove-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = 'green';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = '';
        });
    });

    removeFromCartButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = 'red';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = '';
        });
    });
});

//Atualizar carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
        `
        total += item.price * item.quantity
        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length
}

//remover item do carrinho
cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")
        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index]

        if (item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

// Sincronizar quantidades na página principal
function syncQuantities() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        const name = button.getAttribute('data-name')
        const span = button.previousElementSibling
        const cartItem = cart.find(item => item.name === name)
        span.textContent = cartItem ? cartItem.quantity : 0
    })
}

//monitorar endereço
addressInput.addEventListener("input", (event) => {
    let inputValue = event.target.value

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

//Finalizar pedido
checkoutBtn.addEventListener("click", () => {
    const isOpen = checkRestaurantOpen()
    if (!isOpen) {
        Toastify({
            text: "Ops! O restaurante está fechado =(",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            }
        }).showToast()
        return
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }

    //Enviar o pedido para a api whatsapp
    const cartItems = cart.map((item) => {
        return (
            `
            -${item.name} (${item.quantity})
            Preço: R$${item.price}
            ________________
            `
        )
    }).join(" ")

    const saldation = encodeURIComponent("Pedido: Bartô Lanches")
    const message = encodeURIComponent(cartItems)
    const phone = "18981771798"

    window.open(`https://wa.me/${phone}?text=${saldation}%0A${message}%0AEndereço: ${addressInput.value}`, "_blank")

    cart = []
    addressInput.value = ""
    updateCartModal()
})

// Verificar a hora e manipular o card horário
function checkRestaurantOpen() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22 //true = restaurante aberto
}

const isOpen = checkRestaurantOpen()

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}