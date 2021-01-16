export const centerCard = (
  card: HTMLDivElement,
  cb?: (threshold: number) => void
) => {
  const halfWWidth = window.innerWidth * 0.5;
  const halfWHeight = window.innerHeight * 0.5;

  const halfCWidth = card.clientWidth * 0.5;
  const halfCHeight = card.clientHeight * 0.5;
  const cOffLeft = card.offsetLeft;
  // relative to the current viewport
  const cOffTop = card.offsetTop - document.scrollingElement!.scrollTop;

  const X = halfWWidth - cOffLeft - halfCWidth;
  const Y = halfWHeight - cOffTop - halfCHeight;

  card.style.zIndex = "50";
  card.style.transform = `translate(${X}px, ${Y}px)`;

  if (cb) {
    cb(Y);
  }
};
