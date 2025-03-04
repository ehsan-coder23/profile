// گرفتن المنت‌های مورد نیاز
var hero = $('#hero-txt');
var layer = $('#move');




// تابع برای بروزرسانی میزان پیشرفت در نمودار دایره‌ای
function updateProgress() {
    document.querySelectorAll('.progress-ring').forEach(ring => {
        const valueElement = ring.querySelector('.progress-value'); // مقدار پیشرفت
        const circle = ring.querySelector('.progress-circle'); // دایره‌ی پیشرفت

        // تبدیل مقدار عددی از متن و اطمینان از اینکه مقدار در بازه 0 تا 100 است
        let progress = parseInt(valueElement.textContent.replace('%', '')) || 0;
        progress = Math.max(0, Math.min(100, progress));

        // محاسبه زاویه بر اساس درصد پیشرفت
        const progressDeg = (progress / 100) * 360;

        // تعیین رنگ بر اساس مقدار پیشرفت
        const progressColor =
            progress < 30 ? '#e74c3c' :  // قرمز برای کمتر از 30%
                progress <= 70 ? '#e67e22' : // نارنجی برای بین 30 تا 70%
                    '#2ecc71';                   // سبز برای بیشتر از 70%

        // تنظیم رنگ و مقدار چرخش برای نمایش پیشرفت
        circle.style.setProperty('--progress-color', progressColor);
        setTimeout(() => {
            circle.style.setProperty('--progress-deg', `${progressDeg}deg`);
        }, 100); // تاخیر برای نمایش انیمیشن از 0%
    });
}

// اجرای تابع هنگام بارگذاری صفحه
window.addEventListener('load', updateProgress);

// نمایش یا مخفی کردن دکمه بازگشت به بالا هنگام اسکرول
window.addEventListener('scroll', () => {
    var button = document.querySelector('.back-to-top');
    if (button) {
        button.classList.toggle('hidden', window.scrollY <= 100);
    }
});

// تابع اسکرول نرم به بالای صفحه
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
    var element = document.querySelector('.your-element-class');
    if (element) {
        element.classList.add('new-class');
    }
});



const elements = document.querySelectorAll('.animate-on-scroll');

        // Check if an element is in the viewport
        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight && rect.bottom >= 0
            );
        }

        // Function to handle animations
        function handleScroll() {
            elements.forEach((el) => {
                if (isInViewport(el)) {
                    el.classList.add('visible'); // Add visible class
                } else {
                    el.classList.remove('visible'); // Remove visible class
                }
            });
        }

        // Throttling for performance optimization
        let scrollTimeout;
        function throttle(func, delay) {
            return function () {
                if (!scrollTimeout) {
                    scrollTimeout = setTimeout(() => {
                        func();
                        scrollTimeout = null;
                    }, delay);
                }
            };
        }

        // Add scroll event listener with throttling
        window.addEventListener('scroll', throttle(handleScroll, 100));

        // Initial call to handle animations on page load
        handleScroll();