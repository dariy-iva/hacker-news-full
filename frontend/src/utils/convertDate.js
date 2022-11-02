export function convertDate(unixTime) {
  const date = new Date(unixTime * 1000);

  const dateItemsArr = date.toString().split(' ').slice(1, 5);
  [dateItemsArr[0], dateItemsArr[1]] = [dateItemsArr[1], dateItemsArr[0]];

  return dateItemsArr.join(' ')
}
