function initPhoneMask() {
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    const maskOptions = {
        mask: '+{7} (000) 000 00-00'
    };

    phoneFields.forEach((phoneField) => {
        IMask(phoneField, maskOptions);
    });
}

function menuOpen(menuSelector) {
    menuSelector.classList.toggle('active');
    document.body.classList.toggle('lock');
}

function menuClose(menuSelector) {
    menuSelector.classList.remove('active');
    document.body.classList.remove('lock');
}

document.addEventListener('DOMContentLoaded', function () {
    // promotions sliders
    const promotionsSlidersList = document.querySelectorAll('.promotions__slider');

    if (promotionsSlidersList.length > 0) {
        promotionsSlidersList.forEach((slider) => {
            const promotionsSlider = new Swiper(slider, {
                navigation: {
                    prevEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                    nextEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
                on: {
                    slideChange: function () {
                        setTimeout(() => {
                            AOS.refresh();
                        }, 500);
                    }
                }
            });
        });
    }

    // service slider
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

    // reviews sliders
    const reviewsSlidersList = document.querySelectorAll('.reviews__slider');

    if (reviewsSlidersList.length > 0) {
        reviewsSlidersList.forEach((slider) => {
            const reviewsSlider = new Swiper(slider, {
                navigation: {
                    prevEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                    nextEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                        spaceBetween: 8,
                    },
                    1025: {
                        slidesPerView: 1,
                    },
                }
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

    // accordion
    const ACCORDION_LIST = 'data-accordion-list'
    const ACCORDION_BUTTON = 'data-accordion-button'
    const ACCORDION_ARROW = 'data-accordion-arrow'
    const ACCORDION_CONTENT = 'data-accordion-content'
    const SECTION_OPENED = 'active'
    const ICON_ROTATED = 'rotated'

    class Accordion {
        static apply(accordionNode) {
            if (!accordionNode) {
                return
            }

            const acc = new Accordion()
            acc.accordion = accordionNode
            accordionNode.onclick = acc.onClick.bind(acc)
        }

        handleClick(button) {
            const innerSection = button.closest('.accor').querySelector('.accor-full');
            const isOpened = innerSection.classList.contains(SECTION_OPENED)

            if (isOpened) {
                this.close(innerSection)
                return
            }
            this.open(innerSection)
        }

        open(section) {
            const accordion = section.querySelector(`[${ACCORDION_CONTENT}`).closest('.accor');
            const accordionContent = section.querySelector(`[${ACCORDION_CONTENT}`)
            const accordionList = accordionContent.querySelector(`[${ACCORDION_LIST}`)
            const innerSectionHeight = accordionContent.clientHeight
            let countOfScrollHeight = 0;
            const allElementContentData = section.querySelectorAll(`[${ACCORDION_CONTENT}`)
            accordion.classList.add(SECTION_OPENED)
            section.classList.add(SECTION_OPENED)
            this.rotateIconFor(section.previousElementSibling)

            for (const item of allElementContentData) {
                countOfScrollHeight = countOfScrollHeight + item.scrollHeight;
            }

            if (accordionContent.contains(accordionList)) {
                section.style.maxHeight = `${innerSectionHeight + countOfScrollHeight}px`
                return
            }
            section.style.maxHeight = `${innerSectionHeight}px`
        }

        close(section) {
            const accordion = section.querySelector(`[${ACCORDION_CONTENT}`).closest('.accor');
            section.style.maxHeight = 0
            accordion.classList.remove(SECTION_OPENED)
            section.classList.remove(SECTION_OPENED)
            this.rotateIconFor(section.previousElementSibling)
        }

        rotateIconFor(button) {
            const rotatedIconClass = ICON_ROTATED
            const arrowElement = button.dataset.hasOwnProperty('accordionArrow') ?
                button :
                button.querySelector(`[${ACCORDION_ARROW}]`)

            if (!arrowElement) {
                return
            }

            const isOpened = arrowElement.classList.contains(rotatedIconClass)
            if (!isOpened) {
                arrowElement.classList.add(rotatedIconClass)
                return
            }
            arrowElement.classList.remove(rotatedIconClass)
        }

        onClick(event) {
            let button = event.target.closest(`[${ACCORDION_BUTTON}]`)
            if (button && button.dataset.accordionButton !== undefined) {
                this.handleClick(button)
            }
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }

    const accorWrapperList = document.querySelectorAll('.accor-wrapper');

    if (accorWrapperList.length > 0) {
        accorWrapperList.forEach(function (elem) {
            Accordion.apply(elem);
        });
    }

    window.addEventListener('scroll', function (e) {
        let scrollDistance = window.scrollY;

        if (window.innerWidth > 768) {
            document.querySelectorAll('.scroll-to-block_js').forEach((el, i) => {
                if (el.offsetTop - 60 <= scrollDistance) {
                    document.querySelectorAll('a[href^="#"]').forEach((el) => {
                        if (el.classList.contains('active')) {
                            el.classList.remove('active');
                        }
                    }
                    );

                    document.querySelectorAll('.side-menu .side-menu__item')[i].querySelector('a[href^="#"]').classList.add('active');
                }
            }
            );
        }
    });

    // Scroll to block
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);
            const topOffset = 120;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            menuClose(header);

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // menu-mobile
    const openMenuBtns = document.querySelectorAll('.open-menu');
    const closeMenuBtns = document.querySelectorAll('.close-menu');

    openMenuBtns.forEach(function (openMenuBtn) {
        openMenuBtn.addEventListener('click', function () {
            menuOpen(header);
        })
    });

    closeMenuBtns.forEach(function (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function () {
            menuClose(header);
        })
    });

    // video
    const videoList = document.querySelectorAll('.video');

    if (videoList.length > 0) {
        videoList.forEach((video) => {
            const videoItem = video.querySelector('.video__item');
            const videoPlay = video.querySelector('.video__preview');
            videoPlay.addEventListener('click', function() {
                video.classList.add('active');
                videoItem.play();
            });
        });
    }

    initPhoneMask();
    AOS.init({
        once: true,
    });
    document.querySelectorAll('.select').forEach((item) => {
        new Choices(item, {});
    });
});