// Handling the cart dialog
class Cart{
    constructor(dialogId, cartBtn){
        this.dialog = document.getElementById(dialogId);
        this.cartBtn = document.getElementById(cartBtn);
        this.cartItems = [];
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
}

let cart = new Cart('cart-dialog', 'toggle-cart');

