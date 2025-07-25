document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("image-viewer");
  const image = document.getElementById("product-image");

  const loadingScreen = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.getElementById("progress-bar");

  const images = [];
  const totalImages = 37;
  let currentImage = 0;

  for (let i = 0; i <= totalImages; i++) {
    images.push(`images/low/36_00${i}_Ultra.jpeg`);
  }

  const preloadImages = () => {
    return Promise.all(
      images.map((src, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            const percent = Math.round(((index + 1) / images.length) * 100);
            loadingText.textContent = `Loading... ${percent}%`;
            progressBar.style.width = `${percent}%`;
            resolve();
          };
          img.onerror = reject;
        });
      })
    );
  };

  preloadImages().then(() => {
    // Hide loading screen
    loadingScreen.style.display = "none";

    // Show initial image
    image.src = images[currentImage];

    let isDragging = false;
    let startX;
    let startImage;

    viewer.style.cursor = "grab";

    viewer.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX;
      startImage = currentImage;
      viewer.style.cursor = "grabbing";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      viewer.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const dx = e.pageX - startX;
      const rotation = Math.round(dx / 10);

      let newImage = startImage - rotation;
      if (newImage < 0) {
        newImage = (totalImages + (newImage % totalImages)) % totalImages;
      } else {
        newImage = newImage % totalImages;
      }

      currentImage = newImage;
      image.src = images[currentImage];
    });
  });
});
