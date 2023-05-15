var products = JSON.parse(localStorage.getItem('products')) || [];
var categories = JSON.parse(localStorage.getItem('categories')) || [];
// load danh mục sản phẩm
function loadCategories() {
    let opts = '<option value="">Danh mục sản phẩm</option>';
    for (let c of categories) {
        opts += `<option value="${c.id}">${c.name}</option>`;
    }
    $('#proCat').html(opts);
}
loadCategories();
function loadProducts() {
    let rows = '';
    for (let p of products) {
        rows += `<tr>
                    <td>${p.id}</td>
                    <td><img src="${p.image}" alt="" class="img-product-mg"></td>
                    <td><a href="#">${p.name}</a></td>
                    <td>${p.price} VNĐ</td>
                    <td>${categories.find(c => c.id == p.categoryId)?.name}</td>
                    <td><span class="badge badge-success">${p.status ? 'Hoạt động' : 'Không hoạt động'}</span></td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="editProduct(event, '${p.id}')">Sửa</button>
                        <button type="button" class="btn btn-danger" onclick="delProduct(event, '${p.id}')">Xóa</button>
                    </td>
                </tr>`;
    }
    $('.tbl_products').html(rows);
}

function editProduct(evt, id) {
    let list = products.find(p => p.id == id);
    if (list) {
        $('#proId').val(list.id);
        $('#proId').attr('readonly', true);
        $('#proName').val(list.name);
        $('#price').val(list.price);
        $('#proCat').val(list.categoryId);
        $('#proImage').val(list.image);
        $('#proStt').attr('checked', list.status);
    }
}
function delProduct(evt, id) {
    if (confirm('Bạn có muốn xóa không?')) {
        let index = products.findIndex(p => p.id == id);
        if (index >= 0) {
            products.splice(index, 1);
            // Load lại danh sách
            loadProducts();
            // Lưu lại localStorage
            localStorage.setItem('products', JSON.stringify(products));
        }
    }
}

function save() {
    let prodId = $('#proId').val();
    let fileName = document.getElementById('proImage').files[0].name;
    if (prodId) {
        let product = products.find(p => p.id == prodId);
        if (product) { // cập nhật
            product.name = $('#proName').val();
            product.price = $('#price').val();
            product.categoryId = $('#proCat').val();
            product.image = '/img/product/' + fileName;
            product.status = $('#proStt').is(':checked');
        } else { // thêm mới
            products.push({
                id: prodId,
                name: $('#proName').val(),
                price: $('#price').val(),
                categoryId: $('#proCat').val(),
                image: '/img/product/' + fileName,
                status: $('#proStt').is(':checked')
            });
        }
        loadProducts();
        localStorage.setItem('products', JSON.stringify(products));

        $('#proId').val('');
        $('#proId').attr('readonly', false);
        $('#proName').val('');
        $('#price').val('');
        $('#proCat').val('');
        $('#proImage').val('');
        $('#proStt').attr('checked', false);
    }
}
loadProducts();