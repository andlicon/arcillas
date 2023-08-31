export const activatePopOvers = () => {
  const popOverList = document.getElementsByClassName('popOvers');
  for (let i = 0; i < popOverList.length; i++) {
    const pop = popOverList[i];
    const popover = new bootstrap.Popover(pop, null);
  }
};

export const activateMenu = (event) => {
  const menu = document.getElementById('menu');
  const isActive = menu.classList.contains('active');
  if (isActive) menu.classList.remove('active');
  else menu.classList.add('active');
};