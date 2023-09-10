export const activatePopOvers = () => {
  const popOverList = document.getElementsByClassName('popOvers');
  for (let i = 0; i < popOverList.length; i++) {
    const pop = popOverList[i];
    const popover = new bootstrap.Popover(pop, null);
  }
};

export const dontCloseDropDownItem = (id) => {
  $("#" + id).click(function (e) {
    e.stopPropagation();
  });
}