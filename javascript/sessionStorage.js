let id = 1;

window.onload = function () {

    const addBtn = document.getElementById("addBtn");
    const productList = document.getElementById("productList");
    const saved = sessionStorage.getItem("products");
    if (saved) {
        productList.innerHTML = saved;
        bindEvents();
    }
    addBtn.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;

        if (name === "" || price === "") {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="border p-2 text-center">${id++}</td>
            <td class="border p-2">${name}</td>
            <td class="border p-2">${Number(price).toLocaleString()}</td>
            <td class="border p-2 text-center space-x-2">
                <button class="edit bg-yellow-400 text-white px-2 py-1 rounded">
                    Sửa
                </button>
                <button class="delete bg-red-500 text-white px-2 py-1 rounded">
                    Xóa
                </button>
            </td>
        `;

        productList.appendChild(tr);
        save();
        bindEvents();

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
    });
    function save() {
        sessionStorage.setItem("products", productList.innerHTML);
    }
    function bindEvents() {

        document.querySelectorAll(".delete").forEach(btn => {
            btn.onclick = function () {
                btn.closest("tr").remove();
                save();
            };
        });

        document.querySelectorAll(".edit").forEach(btn => {
            btn.onclick = function () {
                const row = btn.closest("tr");
                const nameCell = row.children[1];
                const priceCell = row.children[2];

                const newName = prompt("Tên mới:", nameCell.innerText);
                const newPrice = prompt(
                    "Giá mới:",
                    priceCell.innerText.replace(/\./g, "")
                );

                if (newName && newPrice) {
                    nameCell.innerText = newName;
                    priceCell.innerText = Number(newPrice).toLocaleString();
                    save();
                }
            };
        });
    }
};
