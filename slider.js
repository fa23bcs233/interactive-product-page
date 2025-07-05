class Slider{
    constructor(sliderContainer, sliderTrack, prevButton, nextButton, controls){
        this.sliderContainer = document.querySelector(sliderContainer);
        this.sliderTrack = this.sliderContainer.querySelector(sliderTrack);
        this.prevButton = document.querySelector(prevButton) || undefined;
        this.nextButton = document.querySelector(nextButton) || undefined;
        this.controls = document.querySelectorAll(controls) || undefined;
        this.currentSlideIndex = 0;

        this.init();
    }

    transformSlides(){
        const translateX = this.currentSlideIndex * -100;
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        this.sliderTrack.style.transition = 'transform 0.3s ease';
    }

    setSlideIndex(index){
        this.currentSlideIndex = index;
        this.transformSlides();
    }

    setControls(){
        this.controls.forEach(control => {
            control.addEventListener("click", (e) => {
                const slideIndex = e.currentTarget.getAttribute("data-refSlide");
                this.controls.forEach(ctrl => ctrl.classList.remove("active"));
                e.currentTarget.classList.add("active");
                this.setSlideIndex(slideIndex);
            }); 
        });

    }

    init(){
        this.setSlideIndex(this.currentSlideIndex);
        if(this.controls){
            this.setControls();
        }
    }
}

const slider = new Slider(".main-image-crousal", ".main-img-crousal-track", null, null, ".thumbnails-images-container .thumbnail-image");
