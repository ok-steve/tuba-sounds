document.querySelectorAll('.card').forEach((card) => {
  let down;
  let up;
  const link = card.querySelector('a');

  card.addEventListener('pointerdown', (e) => {
    down = +new Date();
  });

  card.addEventListener('pointerup', (e) => {
    if (e.target === link) {
      return;
    }

    up = +new Date();

    if (up - down < 200) {
      link.click();
    }
  });
});
