class Slider{
    constructor(slider,sliderContainer, sliderTrack, prevButton, nextButton, controls){
        this.slider = document.querySelector(slider);
        this.sliderContainer = this.slider.querySelector(sliderContainer);
        this.prevButton = this.slider.querySelector(prevButton) || undefined;
        this.nextButton = this.slider.querySelector(nextButton) || undefined;
        this.controls = this.slider.querySelectorAll(controls) || undefined;
        this.sliderTrack = this.sliderContainer.querySelector(sliderTrack);
        this.currentSlideIndex = 0;

        this.init();
    }


    init(){
        this.setSlideIndex(this.currentSlideIndex);
        if(this.controls){
            this.setControls();
        }

        this.initNavigation();
    }

    transformSlides(){
        const translateX = this.currentSlideIndex * -100;
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        this.sliderTrack.style.transition = 'transform 0.3s ease';
    }

    setSlideIndex(index){
        this.currentSlideIndex = index;
        this.transformSlides();
        this.activateControl();
    }

    activateControl(){
        this.controls.forEach(ctrl=>{
            ctrl.classList.remove("active");
        })
        this.controls[this.currentSlideIndex].classList.add("active");
    }

    setControls(){
        this.controls.forEach(control => {
            control.addEventListener("click", (e) => {
                const slideIndex = parseInt(e.currentTarget.getAttribute("data-refSlide"));
                this.setSlideIndex(slideIndex);
            }); 
        });

    }
    
    initNavigation(){
        this.prevButton?.addEventListener("click", () => {
            if(this.currentSlideIndex > 0)
                this.setSlideIndex(this.currentSlideIndex - 1);
        });
        this.nextButton?.addEventListener("click", () => {
            if(this.currentSlideIndex < (this.controls.length - 1))
                this.setSlideIndex(this.currentSlideIndex + 1);
        });
    }
}

const slider = new Slider(".product-image-container" ,".main-image-crousal", ".main-img-crousal-track", ".prev-slide", ".next-slide", ".thumbnails-images-container .thumbnail-image");


// Implementing the lightbox
const lightBoxContainer = document.querySelector(".lightbox");
const lightBox = lightBoxContainer.querySelector(".lightbox-crousal");
const mainCrousal = document.querySelector(".product-image-container")
lightBox.innerHTML = mainCrousal.innerHTML;
new Slider(".lightbox-crousal", ".main-image-crousal", ".main-img-crousal-track", ".prev-slide", ".next-slide", ".thumbnails-images-container .thumbnail-image");

function showLightBox(){
    lightBoxContainer.style.display = "flex";
}

function hideLightBox(){
    lightBoxContainer.style.display = "none";   
}