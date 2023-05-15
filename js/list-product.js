var listProducts = JSON.parse(localStorage.getItem('products')) || [];
var categories = JSON.parse(localStorage.getItem('categories')) || [];

function loadCategory() {
    let opts = '';
    for (let c of categories) {
        opts += `<li class="nav-item me-2">
                    <a class="btn btn-outline-primary border-2 active" data-bs-toggle="pill" href="#">${c.name}</a>
                </li>`;
    }
    $('#category-product').html(opts);
}
loadCategory();

function loadProduct() {
    let item = '';
    for(let p of listProducts) {
        item += `<div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="product-item">
                        <div class="position-relative bg-light overflow-hidden">
                            <img class="img-fluid w-100" src="${p.image}" alt="">
                            <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                        </div>
                        <div class="text-center p-4">
                            <a class="d-block h5 mb-2" href="">${p.name}</a>
                            <span class="text-primary me-1">${p.price} VNĐ</span>
                        </div>
                        <div class="d-flex border-top">
                            <small class="w-50 text-center border-end py-2">
                                <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>View detail</a>
                            </small>
                            <small class="w-50 text-center py-2">
                                <a class="text-body" href=""  onclick= "buy(event, '${p.id}','${p.name}','${p.price}','${p.image}')"><i class="fa fa-shopping-bag text-primary me-2"></i>Add to cart</a>
                            </small>
                        </div>
                    </div>
                </div>`
    }
    $('.g-4').html(item);
}

// Khai báo biến giỏ hàng
var carts = JSON.parse(localStorage.getItem('carts')) || [];

// Mua hàng
function buy(evt, proId, proName, proPrice, proImage) {
    // Kiểm tra xem sp đó đã được mua chưa
    let cartItem = carts.find(c => c.productId == proId);
    if (cartItem) { // tăng số lượng
        cartItem.quantity += 1;
    } else {
        // Thêm sản phẩm được mua vào giỏ hàng
        carts.push({
            productId: proId,
            name: proName,
            image: proImage,
            price: proPrice,
            quantity: 1,
        });
        alert("Thêm thành công");
    }
    // Lưu session
    localStorage.setItem('carts', JSON.stringify(carts));
    showCarts();
}

loadProduct();