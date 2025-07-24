// Star rating animation
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('rating');
    let selectedRating = 0;

    stars.forEach((star, idx) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('hovered', i <= idx);
            });
        });
        star.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('hovered', false);
            });
        });
        star.addEventListener('click', () => {
            selectedRating = idx + 1;
            if (ratingInput) ratingInput.value = selectedRating;
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i < selectedRating);
            });
        });
    });

    // Animate form elements on load
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
            el.style.opacity = 1;
        });
    }, 100);

    // Prevent form submission for demo
    const form = document.querySelector('.review-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            // Image file type validation
            const imageInput = form.querySelector('input[type="file"]');
            if (imageInput && imageInput.files.length > 0) {
                const file = imageInput.files[0];
                if (!['image/png', 'image/jpeg'].includes(file.type)) {
                    alert('Only PNG and JPEG images are allowed.');
                    e.preventDefault();
                    return;
                }
            }
            e.preventDefault();
            form.reset();
            stars.forEach(s => s.classList.remove('selected'));
            if (ratingInput) ratingInput.value = '';
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = "Thank you!";
                setTimeout(() => {
                    submitBtn.textContent = "Submit Review";
                }, 2000);
            }
        });
    }
});
