const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');

const close = document.getElementById('close');



if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

let basket = JSON.parse(localStorage.getItem('data')) || [];



let calculation = () => {

	const cartIcon = document.querySelector('.cartAmount');
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
	
}



calculation()