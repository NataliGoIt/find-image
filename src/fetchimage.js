export function fetchImage() {
  return fetch(
    `https://pixabay.com/api/?key=24434381-44274459aa1c477262f392712&q=yellow+flowers&image_type=photo`
  ).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
