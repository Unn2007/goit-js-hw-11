export default function smoothScroll() {
  const heightViewPort = document.documentElement.clientHeight;
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  const numerOfRows = Math.floor(heightViewPort / cardHeight);

  window.scrollBy({
    top: cardHeight * numerOfRows,
    behavior: 'smooth',
  });
}
