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
    const padded = i.toString().padStart(1, "0");
    images.push(`images/low/36_00${padded}_Ultra.jpeg`);
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

  preloadImages()
    .then(() => {
      loadingScreen.style.display = "none";
      viewer.style.display = "flex"; // ✅ Now show the viewer
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
        newImage = (newImage + images.length) % images.length;
        currentImage = newImage;
        image.src = images[currentImage];
      });
    })
    .catch((err) => {
      loadingText.textContent = "Failed to load images!";
      console.error(err);
    });
});
