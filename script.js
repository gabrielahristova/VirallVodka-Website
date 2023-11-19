
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


const shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem('data')) || []


let generateShop = () => {
	return (shop.innerHTML = shopItemsData.map((x) => {
		let {id, name, price, desc, img} = x;
		let search = basket.find((x) => x.id === id) || []
		return `<div class="pro">
		<img src=${img} alt="">
			<div class="des">
				<h5>${name}</h5>
				<p>${desc}</p>
				<h4 class="price-quantity">${price} лв.</h4>
				<div class="buttons">
					<i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
					<div id=${id} class="quantity">
					${search.item === undefined ? 0 : search.item}
					</div>
					<i onclick="increment(${id})" class="bi bi-plus-lg"></i>
				</div>
			</div>
			
			<a onclick="calculation()" class="add-to-cart-small"><i class="fas fa-shopping-cart cart"></i></a>
	</div>`
	}).join(""))
}

generateShop();

let increment = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem);

	if (search === undefined) {
		basket.push({
			id: selectedItem,
			item: 1
		})
	}
	else {
		search.item +=1;
	}

	localStorage.setItem('data', JSON.stringify(basket))

	update(selectedItem);	
}


let decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -=1;
	}

	update(selectedItem);

	basket = basket.filter((x) => x.item !== 0)

	localStorage.setItem('data', JSON.stringify(basket))
}

let update = (id) => {
	let search = basket.find((x) => x.id === id)
	document.getElementById(id).innerHTML = search.item;
	
	
}

let calculation = () => {
	let cartIcon = document.getElementById('cartAmount');
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
}

calculation()