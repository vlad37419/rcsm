document.addEventListener('DOMContentLoaded', function () {
    // promotions sliders
    const promotionsSlidersList = document.querySelectorAll('.promotions__slider');

    if (promotionsSlidersList.length > 0) {
        promotionsSlidersList.forEach((slider) => {
            const promotionsSlider = new Swiper(slider, {
                navigation: {
                    nextEl: '.promotions__slider-btn_next',
                    prevEl: '.promotions__slider-btn_prev',
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
            });
        });
    }

    const serviceSlidersList = document.querySelectorAll('.service__slider');

    if (serviceSlidersList.length > 0) {
        serviceSlidersList.forEach((slider) => {
            const serviceThumb = slider.closest('.service').querySelector('.service__thumbs');
            let serviceThumbSlider;
            if (serviceThumb) {
                serviceThumbSlider = new Swiper(serviceThumb, {
                    spaceBetween: 16,
                    slidesPerView: 3,
                    navigation: {
                        prevEl: serviceThumb.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                        nextEl: serviceThumb.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                    },
                });
            }

            const serviceSlider = new Swiper(slider, {
                spaceBetween: 16,
                thumbs: {
                    swiper: serviceThumbSlider,
                },
            });
        });
    }

    // header fixed
    const header = document.querySelector('.header');

    if (window.scrollY > 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

    document.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
});