// اسکریپت اعتبارسنجی فرم تماس
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        // تعریف المنت‌های فرم
        const nameInput = document.getElementById('name-input');
        const emailInput = document.getElementById('email-input');
        const subjectInput = document.getElementById('subject-input');
        const messageInput = document.getElementById('message-input');
        
        // تعریف الگوهای اعتبارسنجی
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // ایجاد المنت‌های نمایش خطا
        function createErrorElements() {
            const inputs = [nameInput, emailInput, subjectInput, messageInput];
            
            inputs.forEach(input => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.color = '#e74c3c';
                errorDiv.style.fontSize = '0.85rem';
                errorDiv.style.marginTop = '5px';
                errorDiv.style.display = 'none';
                
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            });
        }
        
        // نمایش پیام خطا
        function showError(input, message) {
            const errorDiv = input.nextElementSibling;
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            input.style.borderColor = '#e74c3c';
        }
        
        // پاک کردن پیام خطا
        function clearError(input) {
            const errorDiv = input.nextElementSibling;
            errorDiv.style.display = 'none';
            input.style.borderColor = '';
        }
        
        // اعتبارسنجی نام
        function validateName() {
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'لطفاً نام خود را وارد کنید');
                return false;
            } else if (nameInput.value.trim().length < 3) {
                showError(nameInput, 'نام باید حداقل ۳ حرف باشد');
                return false;
            } else {
                clearError(nameInput);
                return true;
            }
        }
        
        // اعتبارسنجی ایمیل
        function validateEmail() {
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'لطفاً ایمیل خود را وارد کنید');
                return false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'لطفاً یک ایمیل معتبر وارد کنید');
                return false;
            } else {
                clearError(emailInput);
                return true;
            }
        }
        
        // اعتبارسنجی موضوع
        function validateSubject() {
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'لطفاً موضوع پیام را وارد کنید');
                return false;
            } else if (subjectInput.value.trim().length < 5) {
                showError(subjectInput, 'موضوع باید حداقل ۵ حرف باشد');
                return false;
            } else {
                clearError(subjectInput);
                return true;
            }
        }
        
        // اعتبارسنجی پیام
        function validateMessage() {
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'لطفاً پیام خود را وارد کنید');
                return false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'پیام باید حداقل ۱۰ حرف باشد');
                return false;
            } else {
                clearError(messageInput);
                return true;
            }
        }
        
        // ایجاد المنت‌های خطا در هنگام بارگذاری صفحه
        createErrorElements();
        
        // اضافه کردن رویدادهای input برای اعتبارسنجی آنی
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        subjectInput.addEventListener('input', validateSubject);
        messageInput.addEventListener('input', validateMessage);
        
        // اعتبارسنجی کل فرم هنگام ارسال
        contactForm.addEventListener('submit', function(event) {
            // جلوگیری از ارسال فرم به صورت پیش‌فرض
            event.preventDefault();
            
            // اعتبارسنجی همه فیلدها
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();
            
            // اگر همه فیلدها معتبر بودند، فرم را ارسال کن
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // نمایش پیام موفقیت
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.';
                
                // اضافه کردن پیام موفقیت به فرم
                contactForm.appendChild(successMessage);
                
                // پاک کردن فیلدهای فرم
                contactForm.reset();
                
                // حذف پیام موفقیت بعد از 5 ثانیه
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // در حالت واقعی، اینجا فرم را ارسال می‌کنیم
                // contactForm.submit();
            } else {
                // اسکرول به اولین خطا
                const firstError = document.querySelector('.error-message[style*="display: block"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}); 