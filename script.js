// script.js (SUDAH DIPERBAIKI & DITAMBAH)
document.addEventListener('DOMContentLoaded', function() {

    // =============================
    // BAGIAN FUNGSI COUNTDOWN TIMER
    // =============================
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const timerElement = document.getElementById("countdown-timer");
        if (timerElement) {
            timerElement.innerHTML = hours + " Jam " + minutes + " Menit " + seconds + " Detik ";
            if (distance < 0) {
                clearInterval(countdownFunction);
                timerElement.innerHTML = "PENAWARAN BERAKHIR";
            }
        }
    }, 1000);

    // ===========================================
    // BAGIAN FUNGSI SLIDER GAMBAR
    // ===========================================
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        if (slides.length > 0) {
            let currentIndex = 0;
            const slideCount = slides.length;
            let autoSlideInterval;
            function updateSlidePosition() {
                slider.style.transform = 'translateX(' + (-slider.clientWidth * currentIndex) + 'px)';
            }
            function goToNextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlidePosition();
            }
            function startAutoSlide() {
                autoSlideInterval = setInterval(goToNextSlide, 5000);
            }
            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
            nextBtn.addEventListener('click', () => {
                goToNextSlide();
                resetAutoSlide();
            });
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlidePosition();
                resetAutoSlide();
            });
            window.addEventListener('resize', () => {
                slider.style.transition = 'none';
                updateSlidePosition();
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                });
            });
            updateSlidePosition();
            startAutoSlide();
        }
    }

    // ========================================================
    // BAGIAN BARU: FUNGSI SLIDER TESTIMONI DENGAN AUTO-SLIDE
    // ========================================================
    const testimonialContainer = document.querySelector('.testimonial-slider-container');
    if (testimonialContainer) {
        const testimonialSlider = testimonialContainer.querySelector('.testimonial-slider');
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
        const testimonialPrevBtn = testimonialContainer.querySelector('.testimonial-prev-btn');
        const testimonialNextBtn = testimonialContainer.querySelector('.testimonial-next-btn');
        const dotsContainer = testimonialContainer.querySelector('.testimonial-dots');

        if (testimonials.length > 0) {
            let testimonialCurrentIndex = 0;
            const testimonialCount = testimonials.length;
            let testimonialAutoSlide;

            // Buat dots
            for (let i = 0; i < testimonialCount; i++) {
                const dot = document.createElement('span');
                dot.classList.add('testimonial-dot');
                dot.addEventListener('click', () => {
                    goToTestimonial(i);
                    resetTestimonialAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');

            function updateTestimonialPosition() {
                testimonialSlider.style.transform = 'translateX(' + (-testimonialSlider.clientWidth * testimonialCurrentIndex) + 'px)';
                dots.forEach(dot => dot.classList.remove('active'));
                dots[testimonialCurrentIndex].classList.add('active');
            }
            
            function goToTestimonial(index) {
                testimonialCurrentIndex = index;
                updateTestimonialPosition();
            }

            function goToNextTestimonial() {
                testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCount;
                updateTestimonialPosition();
            }

            function startTestimonialAutoSlide() {
                testimonialAutoSlide = setInterval(goToNextTestimonial, 5000); // Ganti 5000 (5 detik) jika perlu
            }

            function resetTestimonialAutoSlide() {
                clearInterval(testimonialAutoSlide);
                startTestimonialAutoSlide();
            }

            testimonialNextBtn.addEventListener('click', () => {
                goToNextTestimonial();
                resetTestimonialAutoSlide();
            });

            testimonialPrevBtn.addEventListener('click', () => {
                testimonialCurrentIndex = (testimonialCurrentIndex - 1 + testimonialCount) % testimonialCount;
                updateTestimonialPosition();
                resetTestimonialAutoSlide();
            });

            // Inisialisasi
            updateTestimonialPosition();
            startTestimonialAutoSlide();
        }
    }
});
