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
    let im = new Inputmask("+7 (999) 999-99-99");
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
                    console.log(response);
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

    AOS.init({
        once: true,
    });
    document.querySelectorAll('.select').forEach((item) => {
        new Choices(item, {});
    });
});