document.addEventListener("DOMContentLoaded", function () {

    const swiperEl = document.querySelector(".product-swiper");
    const slidesDesktop = parseInt(swiperEl.dataset.slidesDesktop) || 1;
    const slidesTablet = parseInt(swiperEl.dataset.slidesTablet) || 1;
    const slidesMobile = parseInt(swiperEl.dataset.slidesMobile) || 1;
    const spaceBetween = parseInt(swiperEl.dataset.spaceBetween) || 5;
    const showPagination = swiperEl.dataset.showPagination === "true";
    const showArrows = swiperEl.dataset.showArrows === "true";

    const swiper = new Swiper(".product-swiper", {
        spaceBetween: spaceBetween,
        slidesPerView: slidesMobile,
        navigation: showArrows
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
            : false,
        pagination: showPagination
            ? {
                el: ".swiper-pagination",
                clickable: true,
            }
            : false,
        breakpoints: {

            750: {
                slidesPerView: slidesTablet,
            },
            1024: {
                slidesPerView: slidesDesktop,
            },
        },
    });


    const variantSelects = document.querySelector('.product__info-container');

    variantSelects.addEventListener('change', (e) => {
        if (e.target.matches('input[type="radio"][name^="Color"]')) {
            const selected = e.target.value.toLowerCase();

            document.querySelectorAll('.swiper-slide').forEach((slide) => {
                const slideColor = (slide.dataset.color || '').toLowerCase();
                slide.style.display = slideColor === selected ? 'block' : 'none';
            });

            swiper.update();

            const firstVisibleIndex = Array.from(swiper.slides).findIndex(
                (s) => s.style.display !== 'none'
            );
            if (firstVisibleIndex !== -1) {
                swiper.slideTo(firstVisibleIndex, 0);
            }
        }
    });


    const checked = document.querySelector('input[type="radio"][name^="Color"]:checked');
    if (checked) {
        checked.dispatchEvent(new Event('change', { bubbles: true }));
    }


    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            item.classList.toggle('active');
        });
    });
});
