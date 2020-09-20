const scoreBox = document.querySelector('.score');
let res = localStorage.getItem('score');
const html = `<span>Your Score : <br>${res}</span>`
scoreBox.innerHTML = html
