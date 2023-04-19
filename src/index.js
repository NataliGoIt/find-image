import "../css/styles.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImage } from "./fetchimage";
import SimpleLightbox from "simplelightbox";
import { Notify } from "notiflix/build/notiflix-notify-aio";

// console.log(fetchImage);
const gallery = document.querySelector(".gallery"),
  inputForm = document.querySelector("#search-form");

inputForm.addEventListener("submit", findImg);
function findImg(e) {
  e.preventDefault();
  const inputText = e.currentTarget.elements.searchQuery.value.trim();
  fetchImage(inputText).then(renderGallery).catch(error);
  e.currentTarget.elements.searchQuery.value = "";
}

function renderGallery(e) {
  gallery.innerHTML = "";
  const array = e.hits;
  console.log(e.total);
  Notify.success(`Hooray! We found ${e.total} images.`);
  if (array.length === 0) {
    return Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }
  renderCard(array);
}
function renderCard(array) {
  const markUp = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="354" height="225"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes </br><span class='text'>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views  </br><span class='text'>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments  </br><span class='text'>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads  </br><span class='text'>${downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", markUp);
  // gallery.innerHTML = markUp;
  const lightbox = new SimpleLightbox(".gallery a", {
    captionDelay: 250,
    captionsData: "alt",
  });
  lightbox.refresh();
}
function error() {
  gallery.innerHTML = "";
  return Notify.failure("Oops something went wrong...");
}
