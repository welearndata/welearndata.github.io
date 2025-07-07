// ====== FUNGSI COUNTDOWN TIMER ======
// Set tanggal akhir penawaran (misal: 24 jam dari sekarang)
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


// ====== FUNGSI SLIDER GAMBAR DENGAN AUTO-SLIDE ======
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Cek apakah elemen slider ada di halaman
    if (sliderContainer && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let autoSlideInterval; // Variabel untuk menyimpan interval

        // Fungsi untuk menggeser slider ke posisi yang benar
        function updateSlidePosition() {
            const slideWidth = sliderContainer.clientWidth; // Gunakan lebar container agar responsif
            slider.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
        }
        
        // Fungsi untuk pindah ke slide berikutnya
        function goToNextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlidePosition();
        }

        // Fungsi untuk memulai auto-slide setiap 5 detik
        function startAutoSlide() {
            autoSlideInterval = setInterval(goToNextSlide, 5000); // 5000 milidetik = 5 detik
        }

        // Fungsi untuk mereset timer (dijalankan saat tombol ditekan)
        function resetAutoSlide() {
            clearInterval(autoSlideInterval); // Hentikan timer yang sedang berjalan
            startAutoSlide(); // Mulai timer baru
        }

        // Event listener untuk tombol 'Next'
        nextBtn.addEventListener('click', () => {
            goToNextSlide();
            resetAutoSlide(); // Reset timer saat tombol ditekan
        });

        // Event listener untuk tombol 'Previous'
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlidePosition();
            resetAutoSlide(); // Reset timer saat tombol ditekan
        });
        
        // Menyesuaikan slider saat ukuran window berubah
        window.addEventListener('resize', () => {
            slider.style.transition = 'none'; // Matikan transisi sementara
            updateSlidePosition();
            setTimeout(() => { // Nyalakan kembali transisi
                slider.style.transition = 'transform 0.5s ease-in-out';
            });
        });

        // Inisialisasi slider saat halaman dimuat
        updateSlidePosition();
        startAutoSlide(); // Langsung jalankan auto-slide
    }
});