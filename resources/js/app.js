import axios from 'axios';
import flash from 'express-flash-notification';
import Noty from 'noty'

let g = document.querySelectorAll('.add-to-cart')
let c = document.querySelector('#cartCounter')

function updateCart(pi) {
    axios.post('/update-cart', pi).then(res => {
        c.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            text: "item added to cart",
            timeout: 2000,
            progressBar: false
        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            text: "Something went wrong",
            timeout: 2000,
            progressBar: false
        }).show();
    })


}
g.forEach((p) => {
    p.addEventListener('click', (e) => {
        let pi = JSON.parse(p.dataset.pizz)
        updateCart(pi)
    })
})