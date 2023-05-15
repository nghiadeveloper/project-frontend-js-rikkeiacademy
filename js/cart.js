var carts = JSON.parse(localStorage.getItem("carts")) || [];

function loadCart() {
    let rows = "";
    for (let ct of carts) {
        rows += `<tr>
                    <td><img src="${ct.image}" alt="" class="cart-img"></td>
                    <td class="product-name">${ct.name}</td>
                    <td class="product-price">${ct.price} đ</td>
                    <td><input type="number" min = 1 value="${ct.quantity}" onchange = "changeQua(event,'${ct.productId}')" class ="${ct.productId}"></td>
                    <td><input name="" id="" class="btn btn-danger btn-delete" type="button" value="Xóa" onclick = "delCart(event, '${ct.productId}')"></td>
                </tr>`;
    }
    $('.cart-list').html(rows);
}
loadCart();

function changeQua(event, id) {
    let change = carts.find((c) => c.productId == id);
    if (change) {
        change.quantity = $("." + id).val();
    }
    localStorage.setItem("carts", JSON.stringify(carts));
    showCarts();
}

function showCarts() {
    // tính tổng tiền
    let total = 0;
    for (let c of carts) {
        total += c.quantity * c.price;
    }
    $(".pay-price").html(total + " VND");
}
showCarts();

function delCart(evt, id) {
    let index = carts.findIndex((c) => c.productId == id);
    if (index >= 0) {
        carts.splice(index, 1);
        loadCart();
        localStorage.setItem("carts", JSON.stringify(carts));
        showCarts();
    }
}