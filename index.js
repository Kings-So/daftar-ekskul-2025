document.addEventListener("DOMContentLoaded", function () {
    const toggleDaftar = document.getElementById("toggleDaftar");
    const formDaftar = document.getElementById("formDaftar");
    const cancelButton = document.getElementById("cancelButton");

    const toggleUpload = document.getElementById("toggleUpload");
    const formUpload = document.getElementById("formUpload");

    toggleDaftar.addEventListener("click", function () {
        formDaftar.classList.toggle("active");
        formUpload.classList.remove("active"); // Pastikan hanya satu form terbuka
    });

    cancelButton.addEventListener("click", function () {
        formDaftar.classList.remove("active");
    });

    toggleUpload.addEventListener("click", function () {
        formUpload.classList.toggle("active");
    });
});

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBbdgWiI2_OKbfUN6u8nPXcbzZ2FCVZs2I",
    authDomain: "data-ekskul.firebaseapp.com",
    databaseURL: "https://data-ekskul-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "data-ekskul",
    storageBucket: "data-ekskul.firebasestorage.app",
    messagingSenderId: "962709220460",
    appId: "1:962709220460:web:569b629f90e0a6aa96bc49"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk menyimpan data ke Firebase
function saveData(event) {
    event.preventDefault(); // Mencegah reload halaman

    let aNama = document.getElementById('aNama').value.trim();
    let bkelasLama = document.getElementById('bkelasLama').value.trim();
    let ckelasBaru = document.getElementById('ckelasBaru').value.trim();
    let dEkskul = document.getElementById('dEkskul').value.trim();
    let esizeJersey = document.getElementById('esizeJersey').value.trim();
    let lunasDaftar = document.getElementById('lunasDaftar').checked;
    let lunasJersey = document.getElementById('lunasJersey').checked;

    if (!aNama || !bkelasLama || !ckelasBaru || !dEkskul || !esizeJersey) {
        alert('Harap isi semua keterangan pada formulir pendaftaran!');
        return;
    }

    let newDataRef = push(ref(database, 'users'));
    set(newDataRef, {
        nama: aNama,
        kelasLama: bkelasLama,
        kelasBaru: ckelasBaru,
        ekskul: dEkskul,
        sizeJersey: esizeJersey,
        lunasDaftar: lunasDaftar,
        lunasJersey: lunasJersey,
    })
    .then(() => {
        alert('Alhamdulillah, sukses mendaftar.');
        document.getElementById('formDaftar').reset();

        // Menyembunyikan form setelah sukses
        let formDaftar = document.getElementById('formDaftar');
        if (formDaftar) {
            formDaftar.classList.remove("visible");
            formDaftar.classList.add("hidden");
        }
    })
    .catch(error => {
        console.error('Qodarullah gagal mendaftar!!', error);
    });
}

// Fungsi untuk mereset form
function resetForm(event) {
    event.preventDefault();
    document.getElementById('formDaftar').reset();
}

// Pastikan elemen ada sebelum menambahkan event listener
document.getElementById("saveButton").addEventListener("click", saveData);
document.getElementById("cancelButton").addEventListener("click", resetForm);
