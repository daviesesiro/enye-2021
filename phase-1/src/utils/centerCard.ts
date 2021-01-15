export const centerCard = (card: HTMLDivElement) => {
  const halfWWidth = window.innerWidth * 0.5;
  const halfWHeight = window.innerHeight * 0.5;

  const halfCWidth = card.clientWidth * 0.5;
  const halfCHeight = card.clientHeight * 0.5;
  const cOffLeft = card.offsetLeft;
  const cOffTop = card.offsetTop - document.scrollingElement!.scrollTop;

  const X = halfWWidth - cOffLeft - halfCWidth;
  const Y = halfWHeight - cOffTop - halfCHeight;

  card.style.transition = ".5s ";
  card.style.transform = `translate(${X}px, ${Y}px)`;

  setTimeout(() => {
    card.style.transition = ".3s";
  }, 100);
};
