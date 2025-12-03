function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

  let currentIndex = 0;
        const images = document.querySelectorAll('.gallery-image');
        const totalImages = images.length;
        const imageTitle = document.getElementById('imageTitle');
        const imageCounter = document.getElementById('imageCounter');
        const dotsContainer = document.getElementById('dotsContainer');

        // Create dots
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }

        function updateGallery() {
            // Update images
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });

            // Update title
            imageTitle.textContent = images[currentIndex].dataset.title;

            // Update counter
            imageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;

            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function changeImage(direction) {
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = totalImages - 1;
            } else if (currentIndex >= totalImages) {
                currentIndex = 0;
            }
            
            updateGallery();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateGallery();
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        });