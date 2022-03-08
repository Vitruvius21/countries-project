export function getRndInteger({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function transformNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
