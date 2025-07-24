document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("image-viewer");
  const image = document.getElementById("product-image");

  const images = []; // This will be populated with image paths
  const totalImages = 36; // Number of images for a full 360-degree rotation
  let currentImage = 0;

  // Populate the images array
  for (let i = 1; i <= totalImages; i++) {
    images.push(`images/36_00${i}_Ultra.png`);
  }

  // Set the initial image
  image.src = images[currentImage];

  let isDragging = false;
  let startX;
  let startImage;

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
    const rotation = Math.round(dx / 10); // Adjust sensitivity

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
