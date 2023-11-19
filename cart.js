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

let shoppingCart = document.getElementById("products-container");
let cart = document.getElementById('cart');
let cartAdd = document.getElementById('cart-add')

let calculation = () => {
	let cartIcon = document.getElementById('cartAmount');
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
}

calculation()

let generateCartItem = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            
            <tr class='product'>
                <td><i onclick='removeItem(${id})' class="bi bi-x-lg"></i></td>
                <td><img class="image" src=${search.img}></td>
                <td class="name">${search.name}</td>
                <td class="cart-price">${search.price} лв.</td>
                <td><div class="buttons-cart">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div></td>
                <td class="total">${item*search.price} лв.</td>
            </tr>`
        }).join('');
        	
    }
    else {
        cart.innerHTML = `
        <h3 class="cart-title">Количката е празна!</h3>
        <a class='cart-button' href='shop.html'>Обратно в магазина</a>`;
    }
}

generateCartItem();


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

    generateCartItem();
    update(selectedItem);
	localStorage.setItem('data', JSON.stringify(basket))

		
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
    generateCartItem();

	localStorage.setItem('data', JSON.stringify(basket))
}

let update = (id) => {
	let search = basket.find((x) => x.id === id)
	document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount()
	
	
}

let removeItem = (id) => {
    let selectedItem = id;

    basket = basket.filter((x) => x.id !== selectedItem)
    
    generateCartItem();
    totalAmount()

    localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0)
        cartAdd.innerHTML = `
            <div id="coupon">
            <h3>Код за отстъпка</h3>
            <div>
                <input type="text" placeholder="Enter Your Code">
                <button class="normal">Приложи</button>
            </div>
        </div> 
            <div id='subtotal'>
            <h3>Количка</h3>
            <table>
                <td>Междинна сума</td>
                      <td class="sum">${amount} лв.</td>
                   </tr>
        
                    <tr>
                        <td>Доставка</td>
                        <td>Безплатна</td>
                    </tr>
        
                    <tr>
                        <td><strong>Общо</strong></td>
                        <td class="totalSum"><strong>${amount} лв.</strong></td>
                    </tr>
                </table>
           <button class="purchase">Продължи към плащане</button>
           </div>`
    }
    else {
        cartAdd.innerHTML = `
            <div id="coupon">
            <h3>Код за отстъпка</h3>
            <div>
                <input type="text" placeholder="Enter Your Code">
                <button class="normal">Приложи</button>
            </div>
        </div> 
            <div id='subtotal'>
            <h3>Количка</h3>
            <table>
                <td>Междинна сума</td>
                      <td class="sum">0.00 лв.</td>
                   </tr>
        
                    <tr>
                        <td>Доставка</td>
                        <td>Безплатна</td>
                    </tr>
        
                    <tr>
                        <td><strong>Общо</strong></td>
                        <td class="totalSum"><strong>0.00 лв.</strong></td>
                    </tr>
                </table>
           <button class="purchase">Продължи към плащане</button>
           </div>`
    }
}

totalAmount()