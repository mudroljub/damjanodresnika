const albumSlider = document.querySelector("#album-slider");

if (albumSlider) {
  const controls = document.querySelector(".album-slider-controls");
  const previous = controls.querySelector(".album-slider-prev");
  const next = controls.querySelector(".album-slider-next");

  function updateAlbumControls() {
    const end = albumSlider.scrollWidth - albumSlider.clientWidth;
    controls.hidden = end <= 1;
    previous.disabled = albumSlider.scrollLeft <= 1;
    next.disabled = albumSlider.scrollLeft >= end - 1;
  }

  function moveAlbums(direction) {
    albumSlider.scrollBy({ left: direction * albumSlider.clientWidth });
  }

  previous.addEventListener("click", () => moveAlbums(-1));
  next.addEventListener("click", () => moveAlbums(1));
  albumSlider.addEventListener("scroll", updateAlbumControls, { passive: true });
  albumSlider.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveAlbums(event.key === "ArrowLeft" ? -1 : 1);
  });
  new ResizeObserver(updateAlbumControls).observe(albumSlider);
  updateAlbumControls();
}
