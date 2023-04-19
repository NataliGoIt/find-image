const KEY = "24434381-44274459aa1c477262f392712";
const BASE_URL = "https://pixabay.com/api";

export function fetchImage(request) {
  return fetch(
    `${BASE_URL}/?key=${KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  ).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
