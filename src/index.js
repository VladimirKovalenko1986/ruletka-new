const refs = {
  conteiner: document.querySelector('.js-conteiner'),
  startBtn: document.querySelector('.js-start'),
  text: document.querySelector('.text'),
};

refs.startBtn.addEventListener('click', handleStart);

function handleStart() {
  refs.text.textContent = '';
  const promises = [...refs.conteiner.children].map(item => {
    return new Promise((res, rej) =>
      Math.random() > 0.5 ? res('😍') : rej('😈')
    );
  });
  console.log(promises);

  Promise.allSettled(promises).then(items => {
    const isWinner =
      items.every(({ status }) => status === 'fulfilled') ||
      items.every(({ status }) => status === 'rejected');

    items.forEach((item, idx) => {
      refs.conteiner.children[idx].textContent = '';
      setTimeout(() => {
        refs.conteiner.children[idx].textContent = item.value || item.reason;

        if (idx === items.length - 1) {
          refs.text.textContent = isWinner ? 'WInner' : 'Loser';
        }
      }, 1000 * (idx + 1));
    });
  });
}
