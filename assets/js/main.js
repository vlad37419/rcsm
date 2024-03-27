function setWidthScrollBar() {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}

function menuOpen(menuSelector) {
    menuSelector.classList.toggle('active');
    document.body.classList.toggle('lock');
}

function menuClose(menuSelector) {
    menuSelector.classList.remove('active');
    document.body.classList.remove('lock');
}

async function getPromotions() {
    const promotionsResponce = await fetch('fetch/data/promotions/', {
        headers: {
            "X_CITY": localStorage.getItem('city'),
            "X_DISTRICT": localStorage.getItem('district'),
        }
    });
    const promotions = await promotionsResponce.json();
    let promotionsSlides = '';

    promotions.forEach(promotion => {
        const promotionSlide = `<button class="promotions__slide promotion popup-btn swiper-slide">
                                    <div class="promotion__content">
                                        <p class="promotion__title">
                                            ${promotion.TITLE}
                                        </p>
                                        <p class="promotion__descr">
                                        ${promotion.DESCR}
                                        </p>
                                        <div class="promotion__btn btn-send popup-btn">
                                            <span class="btn-send__text">
                                                Оставить заявку
                                            </span>
                                        </div>
                                    </div>
                                    <picture class="promotion__picture">
                                        <img src="${promotion.IMG}" alt=""
                                            class="promotion__img">
                                    </picture>
                                </button>`;
        promotionsSlides += promotionSlide;
    });

    // promotions sliders
    const promotionsSlidersList = document.querySelectorAll('.promotions__slider');

    if (promotionsSlidersList.length > 0) {
        promotionsSlidersList.forEach((slider) => {
            const promotionsSliderWrapper = slider.querySelector('.promotions__slider-wrapper');
            promotionsSliderWrapper.innerHTML = promotionsSlides;
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
                // autoplay: {
                //     delay: 5000,
                // },
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
}

async function getServices() {
    const servicesResponce = await fetch('fetch/data/services/', {
        headers: {
            "X_CITY": localStorage.getItem('city'),
            "X_DISTRICT": localStorage.getItem('district'),
        }
    });
    const services = await servicesResponce.json();
    const servicesContainer = document.querySelector('.services__container');

    let servicesItems = '';

    services.forEach(elem => {
        let service = `<div class="services__item service" data-aos="fade-up" data-aos-duration="600">
        <div class="service__content">
            <p class="service__title">
                ${elem.TITLE}
            </p>
            <p class="service__descr">
                ${elem.DESCR}
            </p>
            <ul class="service__list">`;

        elem.ADVANTAGES.forEach(advantage => {
            service += `<li class="service__list-item">
                <span class="service__list-icon">
                    <img src="${advantage.ICON}" alt="">
                </span>
                <span class="service__list-text">
                    ${advantage.TEXT}
                </span>
            </li>`;
        });

        service += `</ul>
        <div class="service__info">
            <p class="service__old-price">
                ${elem.OLD_PRICE}
            </p>
            <div class="service__info-wrapper">
                <p class="service__new-price">
                    ${elem.NEW_PRICE}
                </p>
                <div class="service__guarantee">
                    <span class="service__guarantee-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_206_3082)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.298 2.19493C11.6926 2.04729 12.1238 2.02804 12.53 2.13993L12.702 2.19493L19.702 4.81993C20.0569 4.95303 20.3667 5.18424 20.5953 5.48664C20.8239 5.78903 20.9618 6.15016 20.993 6.52793L21 6.69293V12.0559C21 13.6764 20.5624 15.2667 19.7336 16.6591C18.9048 18.0515 17.7154 19.1944 16.291 19.9669L16.025 20.1059L12.671 21.7829C12.4863 21.8751 12.2846 21.9282 12.0785 21.9389C11.8723 21.9496 11.6662 21.9176 11.473 21.8449L11.329 21.7829L7.975 20.1059C6.52561 19.3812 5.29878 18.2786 4.424 16.9145C3.54923 15.5505 3.05898 13.9755 3.005 12.3559L3 12.0559V6.69293C3.00001 6.31406 3.10763 5.94299 3.31033 5.62291C3.51304 5.30282 3.8025 5.0469 4.145 4.88493L4.298 4.81993L11.298 2.19493ZM15.433 8.62893L10.835 13.2269L9.067 11.4589C8.87936 11.2714 8.62492 11.1661 8.35965 11.1662C8.09438 11.1663 7.84001 11.2718 7.6525 11.4594C7.46499 11.6471 7.3597 11.9015 7.3598 12.1668C7.35989 12.4321 7.46536 12.6864 7.653 12.8739L10.057 15.2779C10.1592 15.3801 10.2804 15.4612 10.4139 15.5165C10.5474 15.5718 10.6905 15.6003 10.835 15.6003C10.9795 15.6003 11.1226 15.5718 11.2561 15.5165C11.3896 15.4612 11.5108 15.3801 11.613 15.2779L16.847 10.0429C16.9425 9.95069 17.0187 9.84034 17.0711 9.71834C17.1235 9.59634 17.1511 9.46512 17.1523 9.33234C17.1534 9.19956 17.1281 9.06788 17.0778 8.94498C17.0275 8.82208 16.9533 8.71043 16.8594 8.61654C16.7655 8.52265 16.6539 8.44839 16.531 8.39811C16.4081 8.34783 16.2764 8.32253 16.1436 8.32368C16.0108 8.32484 15.8796 8.35242 15.7576 8.40483C15.6356 8.45724 15.5252 8.53342 15.433 8.62893Z"
                                    fill="url(#paint0_linear_206_3082)" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_206_3082" x1="12.0085" y1="-5.85205"
                                    x2="12.0085" y2="28.1171" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#61CE6C" />
                                    <stop offset="1" stop-color="#00B412" />
                                </linearGradient>
                                <clipPath id="clip0_206_3082">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <span class="service__guarantee-text">
                        ${elem.GUARANTY}
                    </span>
                </div>
                <div class="service__deadlines">
                    <span class="service__deadlines-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H18V1M17 12H12V17H17V12Z"
                                fill="url(#paint0_linear_206_3088)" />
                            <defs>
                                <linearGradient id="paint0_linear_206_3088" x1="12.0085" y1="-6.97086"
                                    x2="12.0085" y2="27.2157" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#3BDDF3" />
                                    <stop offset="1" stop-color="#004E96" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span class="service__deadlines-text">
                        ${elem.TAG}
                    </span>
                </div>
            </div>
        </div>
        <div class="service__send">
            <button class="service__send-btn btn popup-btn">
                <span class="btn__text">
                    Оставить заявку
                </span>
                <span class="btn__icon">
                    <img src="assets/img/icons/btn-check.svg" alt="">
                </span>
            </button>
            <p class="service__send-text">
                Перезвоним в рабочее время, ответим на все вопросы, подберем удобную дату и время
            </p>
        </div>
    </div>
    <div class="service__gallery">
        <div class="service__slider swiper">
            <div class="service__gallery-wrapper swiper-wrapper">`;

        elem.GALLERY.forEach(img => {
            service += `<a href="${img}"
                data-fancybox="service-gallery-2" class="service__gallery-slide swiper-slide">
                <img src="${img}"
                    class="service__gallery-slide-img" />
            </a>`;
        });

        service += `</div>
        </div>
        <div class="service__thumbs-wrapper slider-wrapper">
            <div class="service__thumbs swiper">
                <div class="service__thumbs-slider-wrapper swiper-wrapper">`;

        elem.GALLERY.forEach(img => {
            service += ` <div class="service__thumbs-slide swiper-slide">
            <img src="${img}"
                class="service__thumbs-slide-img" />
        </div>`;
        });

        service += `</div>
        </div>
        <button class="service__thumb-btn service__thumb-btn_prev slider-btn slider-btn_prev">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_206_771)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M36 12C36 12.2652 35.8989 12.5195 35.7188 12.707C35.5388 12.8945 35.2947 12.9999 35.0401 12.9999L7.27894 12.9999L13.3208 19.291C13.501 19.4787 13.6023 19.7334 13.6023 19.9989C13.6023 20.2644 13.501 20.519 13.3208 20.7068C13.1405 20.8945 12.8961 21 12.6411 21C12.3862 21 12.1418 20.8945 11.9615 20.7068L4.28202 12.7079C4.19262 12.615 4.1217 12.5047 4.0733 12.3832C4.02491 12.2617 4 12.1315 4 12C4 11.8685 4.02491 11.7383 4.0733 11.6168C4.1217 11.4953 4.19262 11.385 4.28202 11.2921L11.9615 3.29322C12.1418 3.10548 12.3862 3 12.6411 3C12.8961 3 13.1405 3.10548 13.3208 3.29322C13.501 3.48097 13.6023 3.73561 13.6023 4.00112C13.6023 4.26664 13.501 4.52128 13.3208 4.70902L7.27894 11.0001L35.0401 11.0001C35.2947 11.0001 35.5388 11.1055 35.7188 11.293C35.8989 11.4805 36 11.7348 36 12Z"
                        fill="#373737" />
                </g>
                <defs>
                    <clipPath id="clip0_206_771">
                        <rect width="32" height="24" fill="white"
                            transform="matrix(1 0 0 -1 0 24)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
        <button class="service__thumb-btn service__thumb-btn_next slider-btn slider-btn_next">
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_206_794)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M-4 12C-4 12.2652 -3.89887 12.5195 -3.71884 12.707C-3.53882 12.8945 -3.29466 12.9999 -3.04006 12.9999L24.7211 12.9999L18.6792 19.291C18.499 19.4787 18.3977 19.7334 18.3977 19.9989C18.3977 20.2644 18.499 20.519 18.6792 20.7068C18.8595 20.8945 19.1039 21 19.3589 21C19.6138 21 19.8582 20.8945 20.0385 20.7068L27.718 12.7079C27.8074 12.615 27.8783 12.5047 27.9267 12.3832C27.9751 12.2617 28 12.1315 28 12C28 11.8685 27.9751 11.7383 27.9267 11.6168C27.8783 11.4953 27.8074 11.385 27.718 11.2921L20.0385 3.29322C19.8582 3.10548 19.6138 3 19.3589 3C19.1039 3 18.8595 3.10548 18.6792 3.29322C18.499 3.48097 18.3977 3.73561 18.3977 4.00112C18.3977 4.26664 18.499 4.52128 18.6792 4.70902L24.7211 11.0001L-3.04006 11.0001C-3.29466 11.0001 -3.53882 11.1055 -3.71884 11.293C-3.89887 11.4805 -4 11.7348 -4 12Z"
                        fill="#373737" />
                </g>
                <defs>
                    <clipPath id="clip0_206_794">
                        <rect width="32" height="24" fill="white"
                            transform="matrix(1 0 0 -1 0 24)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
    </div>
</div>
</div>`;

        servicesItems += service;
    });

    servicesContainer.innerHTML = servicesItems;

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

                if (serviceThumbSlider.slides.length <= 1) {
                    serviceThumb.closest('.service__thumbs-wrapper').remove();
                    slider.classList.add('active');
                }
            }

            const serviceSlider = new Swiper(slider, {
                spaceBetween: 16,
                thumbs: {
                    swiper: serviceThumbSlider,
                },
            });
        });
    }
}

async function getReviews() {
    const reviewsResponce = await fetch('fetch/data/reviews/', {
        headers: {
            "X_CITY": localStorage.getItem('city'),
            "X_DISTRICT": localStorage.getItem('district'),
        }
    });
    const reviews = await reviewsResponce.json();
    let reviewsSlides = '';
    let i = 0;

    reviews.forEach(review => {
        let reviewSlide = `<div class="reviews__slide review swiper-slide">
        <div class="review__user">
            <picture class="review__user-picture">
                <img src="${review.IMG}" alt="" class="review__user-img">
            </picture>
            <div class="review__user-info">
                <p class="review__user-name">
                ${review.NAME}
                </p>
                <p class="review__user-city">
                ${review.CITY}
                </p>
                <p class="review__user-date">
                ${review.DATE}
                </p>
            </div>
        </div>
        <div class="review__content content-body">
            <p>
            ${review.REVIEW}
            </p>
        </div>`;

        if (review.GALLERY.length > 0) {

            reviewSlide += `<div class="review__gallery">
                <p class="review__gallery-title review__sub-title">
                    Фото прикрепленные к отзыву:
                </p>
                <div class="review__gallery-images">`
            review.GALLERY.forEach(img => {
                reviewSlide += `<a href="${img}" data-fancybox="review-gallery-${i}"
                    class="review__gallery-link">
                    <img src="${img}" alt=""
                        class="review__gallery-img">
                </a>`;

            });
            reviewSlide += `</div>
                </div>`;

        }


        reviewSlide += `
            <div class="review__answer">
                <p class="review__answer-title review__sub-title">
                    Ответ администрации:
                </p>
                <p class="review__answer-text">
                    Добрый день, Василий, благодарим за отзыв, постараемся и дальше держать марку!
                </p>
            </div>
        </div>`;

        reviewsSlides += reviewSlide;
        i += 1;
    });

    // reviews sliders
    const reviewsSlidersList = document.querySelectorAll('.reviews__slider');

    if (reviewsSlidersList.length > 0) {
        reviewsSlidersList.forEach((slider) => {
            const reviewsSliderWrapper = slider.querySelector('.reviews__slider-wrapper');
            reviewsSliderWrapper.innerHTML = reviewsSlides;
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
}

async function getSettings() {
    const settingsResponce = await fetch('fetch/data/settings/', {
        headers: {
            "X_CITY": localStorage.getItem('city'),
            "X_DISTRICT": localStorage.getItem('district'),
        }
    });
    const settings = await settingsResponce.json();
    console.log(settings);

    const phonesList = document.querySelectorAll('.phone-js');
    const mailList = document.querySelectorAll('.mail-js');
    const socials = document.querySelectorAll('.socials');
    const constacsJs = document.querySelectorAll('.contact-js');
    const responsible = document.querySelectorAll('.responsible');
    const contactsTg = document.querySelectorAll('.contacts-social_tg');
    const contactsWa = document.querySelectorAll('.contacts-social_wa');
    const requisites = document.querySelectorAll('.requisites');

    if (phonesList.length > 0) {
        phonesList.forEach(elem => {
            elem.textContent = settings.PHONE;
        });
    }

    if (mailList.length > 0) {
        mailList.forEach(elem => {
            elem.textContent = settings.MAIL;
        });
    }

    if (settings.SOCIALS.length > 0) {
        if (socials.length > 0) {
            socials.forEach(socialsContent => {
                settings.SOCIALS.forEach(social => {
                    const item = `<li class="socials__item social">
                        <a href="${social.LINK}" target="_blank" class="social__link">
                            <img src="${social.IMG}" alt="" class="social__img">
                        </a>
                    </li>`

                    socialsContent.innerHTML += item;
                });
            });
        }
    } else {
        if (socials.length > 0) {
            socials.forEach(socialsContent => {
                socialsContent.remove();
            });
        }
    }

    if (constacsJs.length > 0) {
        constacsJs.forEach(elem => {
            elem.textContent = settings.CONTACT;
        });
    }

    if (responsible.length > 0) {
        responsible.forEach(elem => {
            elem.textContent = settings.RESPONIBLE;
        });
    }

    if (responsible.length > 0) {
        responsible.forEach(elem => {
            elem.textContent = settings.RESPONIBLE;
        });
    }

    if (contactsTg.length > 0) {
        contactsTg.forEach(elem => {
            const content = `<a href="${settings.TELEGRAM.LINK}" class="contacts-social__link">
            <img src="${settings.TELEGRAM.IMG}" alt="" class="contacts-social__img">
            <span class="contacts-social__text">
            ${settings.TELEGRAM.TOPONIM}
            </span></a>`;
            elem.innerHTML = content;
        });
    }

    if (contactsWa.length > 0) {
        contactsWa.forEach(elem => {
            const content = `<a href="${settings.WA.LINK}" class="contacts-social__link">
            <img src="${settings.WA.IMG}" alt="" class="contacts-social__img">
            <span class="contacts-social__text">
            ${settings.WA.TOPONIM}
            </span></a>`;
            elem.innerHTML = content;
        });
    }

    if (requisites.length > 0) {
        requisites.forEach(elem => {
            settings.REQUISITES.forEach(req => {
                const content = `<p class="requisites__text">${req}</p>`;
                elem.innerHTML += content;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', async function () {
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
            const videoTime = video.querySelector('.video__preview-time');
            videoPlay.addEventListener('click', function () {
                video.classList.add('active');
                videoItem.play();
            });
        });
    }

    // connection-phone
    const connectionPhoneShowList = document.querySelectorAll('.connection__phone-show');

    if (connectionPhoneShowList.length > 0) {
        connectionPhoneShowList.forEach((connectionPhoneShow) => {
            connectionPhoneShow.addEventListener('click', function () {
                connectionPhoneShow.classList.add('hide');
            });
        })
    }

    // inputmask for tel
    let telSelector = document.querySelectorAll("input[type='tel']");
    let im = new Inputmask("+7 (999) 999 - 99 - 99");
    telSelector.forEach(elem => im.mask(elem));

    // Popups
    function popupClose(popupActive) {
        const formActive = popupActive.querySelector('.form');
        if (formActive) {
            formActive.dataset.additional = "Неизвестная форма";
        }
        popupActive.classList.remove('open');
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelectorAll('.padding-lock').forEach(function (elem) {
            if (window.getComputedStyle(elem).position == 'fixed' || window.getComputedStyle(elem).position == 'absolute') {
                elem.style.paddingRight = 0;
            }
        });
    }

    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');

    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });

    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            const currentForm = currentPopup.querySelector('.form');
            const additional = el.dataset.additional || "Неизвестная форма";

            popups.forEach(function (popup) {
                popupClose(popup);
                popup.addEventListener('click', function (e) {
                    if (!e.target.closest('.popup__content')) {
                        popupClose(e.target.closest('.popup'));
                    }
                });
            });

            menuClose(header);

            if (currentForm) {
                currentForm.dataset.additional = additional;
            }
            currentPopup.classList.add('open');
            document.body.classList.add('lock');
            document.querySelector('html').style.paddingRight = setWidthScrollBar() + 'px';
            document.querySelectorAll('.padding-lock').forEach(function (elem) {
                if (window.getComputedStyle(elem).position == 'fixed' || window.getComputedStyle(elem).position == 'absolute') {
                    elem.style.paddingRight = setWidthScrollBar() + 'px';
                }
            });
        });
    });

    // send message to telegramm
    const forms = document.querySelectorAll('.form-to-telegramm');

    for (let i = 0; i < forms.length; i += 1) {
        const currentForm = forms[i];
        const currentFormId = currentForm.id;

        // validator for form
        const validation = new JustValidate(`#${currentFormId}`);
        const currentFormEmail = currentForm.querySelector('.mail');
        const currentFormPhone = currentForm.querySelector('.phone');
        const currentFormMessage = currentForm.querySelector('.message');

        validation
            .addField('.name', [
                {
                    rule: 'required',
                    errorMessage: 'Вы не ввели имя',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'Минимум 2 символа',
                },
                {
                    rule: 'customRegexp',
                    value: /^[а-яА-Яa-zA-Z]+$/,
                    errorMessage: 'Недопустимый формат',
                },
            ])
            .addField('.policy', [
                {
                    rule: 'required',
                    errorMessage: 'Это обязательное поле',
                },
            ]);

        if (currentFormPhone) {
            validation.addField('.phone', [
                {
                    rule: 'required',
                    errorMessage: 'Вы не ввели телефон',
                },
                {
                    validator: () => {
                        const currentInputPhone = currentForm.querySelector('.phone');
                        const phone = currentInputPhone.inputmask.unmaskedvalue();
                        return phone.length === 10;
                    },
                    errorMessage: 'Введите номер телефона полностью',
                },
            ]);
        }

        if (currentFormEmail) {
            validation.addField('.mail', [
                {
                    rule: 'required',
                    errorMessage: 'Это обязательное поле',
                },
                {
                    rule: 'email',
                    errorMessage: 'Введите почту правильно',
                },
            ]);
        }

        if (currentFormMessage) {
            validation.addField('.message', [
                {
                    rule: 'required',
                    errorMessage: 'Это обязательное поле',
                },
            ]);
        }

        currentForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            if (validation.isValid) {
                let data = {};
                let fieldsResult = {};
                let fields = Object.values(currentForm).reduce((obj, field) => {
                    obj[field.name] = field.value;
                    return obj
                }, {});

                for (let key in fields) {
                    if (key && key !== 'undefined') {
                        fieldsResult[key] = {
                            NAME: key,
                            VALUE: fields[key]
                        }
                    }
                }

                data.FIELDS = fieldsResult;

                fetch("fetch/send.php", {
                    body: JSON.stringify({
                        action: 'send',
                        "DATA": data,
                        "ADDITIONAL": currentForm.dataset.additional,
                        "REVIEW": currentForm.dataset.action == 'review' ? 'Y' : 'N',
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                    method: "POST"
                }).then(async (resp) => {
                    const fieldsResetList = currentForm.querySelectorAll('.form-field__input');
                    fieldsResetList.forEach((field) => {
                        field.value = '';
                    });
                    const response = await resp.json();
                    const responseTitle = document.querySelector('.response-popup__title');
                    const responseDescr = document.querySelector('.response-popup__descr');
                    const responseImg = document.querySelector('.response-popup__img');
                    responseTitle.textContent = response.RESPONSE.TITLE;
                    responseDescr.textContent = response.RESPONSE.DESCR;
                    responseImg.setAttribute('src', response.RESPONSE.IMG);
                    const popupResponseBtn = document.querySelector('[data-path="response"]');
                    popupResponseBtn.click();
                });
            }
        });
    }

    // directions pins
    const directionPin = document.querySelectorAll('.directions__pin');

    if (directionPin.length > 0) {
        directionPin.forEach((elem) => {
            const wrapper = elem.querySelector('.directions__pin-wrapper');
            const icon = elem.querySelector('.directions__pin-wrapper .directions__pin-icon');
            const content = elem.querySelector('.directions__pin-text');
            elem.addEventListener('click', () => {
                if (!elem.classList.contains('show')) {
                    directionPin.forEach(el => {
                        if (el != this) {
                            el.querySelector('.directions__pin-wrapper').removeAttribute('style');
                            el.classList.remove('show');
                        }
                    });
                    elem.classList.add('show');
                    if (content.clientHeight > icon.clientHeight) {
                        wrapper.style.height = content.clientHeight + 12 + 'px';
                    } else {
                        wrapper.style.height = icon.clientHeight + 12 + 'px';
                    }
                    wrapper.style.width = icon.clientWidth + content.clientWidth + 24 + 'px';
                } else {
                    elem.classList.remove('show');
                    wrapper.removeAttribute('style');
                }
            });
            window.addEventListener('click', function (e) {
                const target = e.target;
                if (!target.closest('.directions__pin')) {
                    elem.classList.remove('show');
                    wrapper.removeAttribute('style');
                }
            });
        })
    }

    // directions full city
    const directionsMapBtn = document.querySelector('.directions__map-btn');
    const directionsMap = document.querySelector('.directions__map');

    if (directionsMapBtn) {
        directionsMapBtn.addEventListener('click', function () {
            if (directionsMap.classList.contains('active')) {
                directionsMap.classList.remove('active');
                directionsMapBtn.textContent = 'Смотреть все города - партнеры';
            } else {
                directionsMap.classList.add('active');
                directionsMapBtn.textContent = 'Скрыть';
            }
        });
    }

    // data
    const regionsPopupBtn = document.querySelector('[data-path="region"]');
    if (!localStorage.getItem('city') && !localStorage.getItem('city')) {
        regionsPopupBtn.click();
    }

    const selectList = document.querySelectorAll('.select');

    const contentCities = document.querySelectorAll('[name="city"]');
    const contentRegions = document.querySelectorAll('[name="district"]');

    const citiesPromise = await fetch('fetch/data/cities/', {
        method: 'POST',
    });
    let responseCities = await citiesPromise.json();
    let resultDataCities = '';
    if (responseCities.length > 0) {
        let currentCity = '';
        responseCities.forEach((elem) => {
            if (elem.CURRENT) {
                currentCity = elem.NAME
            }
            const selected = elem.CURRENT == true ? 'selected' : '';
            const option = `<option ${selected} value="${elem.CODE}">${elem.NAME}</option>`;
            resultDataCities += option;

            if (elem.CURRENT == true) {
                contentRegions.forEach(district => {
                    elem.REGIONS.forEach(region => {
                        const option = `<option value="${region.CODE}">${region.NAME}</option>`;

                        district.innerHTML += option;
                    });
                });
            }
        });

        const citiesElements = document.querySelectorAll('.city');
        citiesElements.forEach(city => {
            city.textContent = currentCity
        });
    }

    if (contentCities.length > 0) {
        contentCities.forEach((elem) => {
            elem.innerHTML = resultDataCities;
        });
    }

    if (localStorage.getItem('city') && localStorage.getItem('city')) {
        getSettings();
        getPromotions();
        getServices();
        getReviews();
    }

    const regionForm = document.querySelector('.region-popup__form');

    const formRegionsCitySelect = regionForm.querySelector(['[name="city"]']);

    formRegionsCitySelect.addEventListener('change', function () {
        const code = formRegionsCitySelect.options[formRegionsCitySelect.selectedIndex].value
        location.href = `https://${code}.rcsm.pro`;
    });
    regionForm.addEventListener('submit', function (e) {
        const city = regionForm.querySelector('[name="city"]');
        const district = regionForm.querySelector('[name="district"]');

        e.preventDefault();
        if (district.options[district.selectedIndex].value != 'no') {
            getSettings();
            getPromotions();
            getServices();
            getReviews();
            popupClose(regionForm.closest('.popup'));
            localStorage.setItem('city', city.value);
            localStorage.setItem('district', district.value);
        } else {
            if (!regionForm.classList.contains('error')) {
                regionForm.classList.add('error');
                const textWarning = document.createElement('p');
                textWarning.textContent = 'Выберите регион';
                textWarning.classList.add('just-validate-error-label');
                district.closest('.form-select-data').append(textWarning);
            }
        }
    });

    // select
    if (selectList.length > 0) {
        selectList.forEach((elem) => {
            const currentSelect = new Choices(elem, {});
        });
    }

    AOS.init({
        once: true,
    });
});