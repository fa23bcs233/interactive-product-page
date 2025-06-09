const product = {
    name: "Fall Limited Edition Sneakers",
    featureImage: "images/image-product-1-thumbnail.jpg",
    price: 125.00
}

// Handling the cart dialog
class Cart{
    constructor(dialogId, cartBtn, cartItemTemplateId, cartListId, cartBadge){
        this.dialog = document.getElementById(dialogId);
        this.cartBtn = document.getElementById(cartBtn);
        this.cartItemTemplate = document.getElementById(cartItemTemplateId);
        this.cartList = document.getElementById(cartListId);
        this.cartBadge = cartBadge;
        this.cartItems = [];
        this.totalItems = 0;
        this.isDialogOpen = false;
        this.init();
    }

    init(){
        window.addEventListener('click', (event) => {
            this.checkOutSideClick(event);
        });

        this.cartBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleDialog();
        });
    }

    checkOutSideClick(event){
        const dialogRect = this.dialog.getBoundingClientRect();

        const isClickInsideDialog = (
            dialogRect.left <= event.clientX &&
            event.clientX <= dialogRect.right &&
            dialogRect.top <= event.clientY &&
            event.clientY <= dialogRect.bottom
        );

        if(!isClickInsideDialog && this.isDialogOpen){
            this.closeDialog();
        }
    }

    toggleDialog(){
        if (this.isDialogOpen) {
            this.closeDialog();
        } else {
            this.openDialog();
        }
    }

    openDialog(){
        this.dialog.classList.add('open');
        this.isDialogOpen = true;
        this.dialog.show();
    }

    closeDialog(){
        this.dialog.classList.remove('open');
        this.isDialogOpen = false;
        this.dialog.close();
    }

    addItemToCart(item, quantity){
        const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({ ...item, quantity });
            this.totalItems+= quantity;
        }
        this.renderCart();
    }

    removeItemFromCart(item){
        const itemIndex = this.cartItems.findIndex(cartItem => cartItem.name === item.name);
        if (itemIndex > -1) {
            this.totalItems -= this.cartItems[itemIndex].quantity;
            this.cartItems.splice(itemIndex, 1);
        }
        this.totalItems--;
        this.renderCart();
    }

    renderCart(){
        this.cartList.innerHTML = "";
        if(this.cartItems.length === 0){
            document.getElementById('empty-cart').removeAttribute('hidden');
            document.querySelector('.checkout-button').setAttribute("hidden", "");
            this.cartBadge.textContent = "0";
            this.cartBadge.setAttribute('hidden', '');
            this.cartBadge.classList.add('zero');
        }
        else {
            document.getElementById('empty-cart').setAttribute('hidden', '');
            document.querySelector('.checkout-button').removeAttribute("hidden");
            this.cartBadge.textContent = this.totalItems;
            this.cartBadge.removeAttribute('hidden');
            this.cartBadge.classList.remove('zero');
        }

        this.cartItems.forEach(cartItem => {
            const itemElement = this.cartItemTemplate.content.cloneNode(true);
            console.log(itemElement);
            itemElement.querySelector('.cart-item-image').src = cartItem.featureImage;
            itemElement.querySelector('.cart-item-name').textContent = cartItem.name;
            itemElement.querySelector('.cart-item-quantity').textContent = cartItem.quantity;
            itemElement.querySelector('.cart-item-price').textContent = `$${(cartItem.price * cartItem.quantity).toFixed(2)}`;
            itemElement.querySelector('.cart-item-total').textContent = `$${(cartItem.price * cartItem.quantity).toFixed(2)}`;  
            itemElement.querySelector('.remove-item').addEventListener('click', () => {
                this.removeItemFromCart(cartItem);
            });
            
            this.cartList.appendChild(itemElement);
        })
    }
}

let cart = new Cart('cart-dialog', 'toggle-cart', 'cart-item-template', 'cart-items',
    document.querySelector('.cart-count')
);
const increaseQuantityBtn = document.querySelector('.increase');
const decreaseQuantityBtn = document.querySelector('.decrease');
const quantitySpan = document.querySelector('.quantity');
const addToCartBtn = document.querySelector('.add-to-cart');
let quantity = 0;

increaseQuantityBtn.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
});

decreaseQuantityBtn.addEventListener('click', () => {
    if(quantity == 0) return;
    quantity--;
    quantitySpan.textContent = quantity;
});

addToCartBtn.addEventListener('click', () => {
    if(quantity == 0) return;
    cart.addItemToCart(product, quantity);
    quantity = 0;
    quantitySpan.textContent = quantity;
});

