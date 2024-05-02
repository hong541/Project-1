document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Brazil",
        det: "Kopi Robusta Brazil memiliki cita rasa yang khas, dengan ciri khas rasa yang kuat, pahit, dan beraroma. Secangkir kopi Robusta Brazil biasanya memiliki rasa yang berani dan karakteristik yang kental.",
        img: "1.jpg",
        price: 20000,
      },
      {
        id: 2,
        name: "Arabica Blend",
        det: "Sebuah campuran kopi yang menggunakan biji kopi Arabika dari berbagai daerah penghasil kopi. Kopi Arabika dikenal dengan cita rasanya yang kompleks, mulai dari rasa manis, asam, hingga sedikit rasa pahit.",
        img: "2.jpg",
        price: 25000,
      },
      {
        id: 3,
        name: "Primo Passo",
        det: "Primo Passo bisa saja merupakan merek kopi tertentu atau varietas kopi yang dijual dengan nama tersebut. Informasi lebih lanjut tentang kopi ini bisa ditemukan dari produsen atau penjualnya.",
        img: "3.jpg",
        price: 30000,
      },
      {
        id: 4,
        name: "Aceh Gayo",
        det: "Aceh Gayo adalah varietas kopi Arabika yang berasal dari daerah Gayo di Provinsi Aceh, Indonesia. Kopi Aceh Gayo terkenal dengan cita rasanya yang khas, dengan aroma dan rasa yang kuat, serta sedikit bumbu rempah yang menyertainya. Kopi Aceh Gayo sering kali memiliki keasaman yang rendah dan kekentalan yang tinggi.",
        img: "4.jpg",
        price: 35000,
      },
      {
        id: 5,
        name: "Sumatera Mandheling",
        det: "Kopi Sumatera Mandheling berasal dari daerah Mandheling di Sumatera Utara, Indonesia. Ini adalah varietas kopi Arabika yang terkenal dengan rasa yang kaya dan kompleks, dengan aroma yang kuat, asam yang rendah, dan cenderung memiliki rasa pahit yang halus. Kopi Sumatera Mandheling sering dipuji karena kekentalannya yang tinggi dan ciri khasnya yang unik.",
        img: "5.jpg",
        price: 40000,
      },
    ],
    showModal: false,
    selectedProduct: null,
    openModal(item) {
      this.selectedProduct = item;
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // apakah barang sama
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika lebih dari 1
      if (cartItem.quantity > 1) {
        // telsuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data checkout
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6285788531938?text=" + encodeURIComponent(message));
});

// form pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
Total: ${rupiah(obj.total)}
Terima Kasih.`;
};

//konfersi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// // data modal box
// document.addEventListener("alpine:init", () => {
//   Alpine.data("modal", () => ({
//     items: [
//       {
//         id: 1,
//         name: "Robusta Brazil",
//         img: "1.jpg",
//         price: 20000,
//       },
//       {
//         id: 2,
//         name: "Arabica Blend",
//         det: "arabica adalah kopi yang sedikit asam",
//         img: "2.jpg",
//         price: 25000,
//       },
//       {
//         id: 3,
//         name: "Primo Passo",
//         det: "arabica adalah kopi yang sedikit asam",
//         img: "3.jpg",
//         price: 30000,
//       },
//       {
//         id: 4,
//         name: "Aceh Gayo",
//         det: "arabica adalah kopi yang sedikit asam",
//         img: "4.jpg",
//         price: 35000,
//       },
//       {
//         id: 5,
//         name: "Sumatera Mandheling",
//         det: "arabica adalah kopi yang sedikit asam",
//         img: "5.jpg",
//         price: 40000,
//       },
//     ],
//   }));
// });
