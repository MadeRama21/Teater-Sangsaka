
/*=============== SHOW MENU START ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-menu");

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");
/*=============== SHOW MENU END ===============*/

/*=============== CAROUSEL EVENTS START ===============*/
const vertical = document.querySelector(".main-vertical");
const carousel = document.querySelector(".carousel");
const carouselChildrens = [...carousel.children];
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

let isDragging = false,
  startX,
  startScrollleft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollleft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollleft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 400) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 3000);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!vertical.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
vertical.addEventListener("mouseenter", () => clearTimeout(timeoutId));
vertical.addEventListener("mouseleave", autoPlay);

const seeMore = document.querySelector(".see-more");
const content = document.querySelector(".main-vertical");
const buttonSeeMoreMainContent = document.querySelector(".button-see-more");

buttonSeeMoreMainContent.addEventListener('click', function(e) {
  // Hanya menjalankan tindakan saat klik terjadi pada elemen <a>
  if (e.target.tagName === 'A') {
    e.preventDefault();
    seeMore.classList.toggle('events-see-more');
    content.classList.toggle('events-see-more');
  }
});

const dropdownItems = document.querySelectorAll('.dropdown-item');
const anyCards = document.querySelectorAll('.main-photos .any-card');
const dropdownToggle = document.querySelector('.dropdown-toggle');

// Menambahkan event listener untuk setiap item dropdown
dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        // Mengubah teks pada tombol dropdown
        dropdownToggle.textContent = item.textContent;
    });
});

dropdownItems.forEach(item => {
  item.addEventListener('click', function() {
    const selectedEvent = item.textContent.trim();
    anyCards.forEach(photo => {
      // Periksa apakah elemen memiliki kelas yang sesuai dengan pilihan dropdown
      if (photo.classList.contains(selectedEvent.toLowerCase())) {
        photo.style.display = 'block'; // Tampilkan elemen yang sesuai
      } else {
        photo.style.display = 'none'; // Sembunyikan elemen yang tidak sesuai
      }
    });
  });
});
/*=============== CAROUSEL EVENTS END ===============*/


window.onload = function() {
  toggleText();
};

// Fungsi toggleText() tidak berubah
function toggleText() {
  var moreImage = document.getElementById("seemore");

  if (moreImage.style.display === "none") {
      moreImage.style.display = "flex";
      document.getElementById("textButton").innerText = "Show Less";
  } else {
      moreImage.style.display = "none";
      document.getElementById("textButton").innerText = "Show More";
  }
}


/*========================= CONTACT LOGIC =========================*/
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx7SOkWaYWdhRMMyFsjI_IGmmlKUV_Mco6mBqZ0diyDLAwTsBn_olw_MnYF-i2VnFrM/exec'
    const form = document.forms['sangsaka-contact-form'];
    const btnKirim = document.querySelector('.btn-kirim');
    const btnLoading = document.querySelector('.btn-loading');
    const myAlert = document.querySelector('.alert');
    const namaInput = document.querySelector('.form_nama');
    const kelasInput = document.querySelector('.form_kelas');
    const telpInput = document.querySelector('.form_nomor');
    const pesanInput = document.querySelector('.form_alasan');
    const massage = form.getElementsByTagName('small');

    // Regular expressions for validation
    const kelasRegex = /^(X{0,2}|XI{1,2}|XII)\s[A-Za-z]{2,4}\s[1-3]$/;
    const telpRegex = /^(?:\+62|62|0)8[1-9][0-9]{8,12}$/;

    // Menambahkan event listener blur untuk setiap input
    namaInput.querySelector('input').addEventListener('blur', handleInputBlur);
    kelasInput.querySelector('input').addEventListener('blur', handleInputBlur);
    telpInput.querySelector('input').addEventListener('blur', handleInputBlur);
    pesanInput.querySelector('textarea').addEventListener('blur', handleInputBlur);

    form.addEventListener('submit', e => {
        e.preventDefault()

        // validasi
        if (!validateForm()) return;

        // ketika tombol sumbit di klik
        // tampilkan tombol loading, hilangkan tombol kirim
        btnLoading.classList.toggle('d-none');
        btnKirim.classList.toggle('d-none');
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // tampilkan tombol kirim, hilangkan tombol loading
                btnLoading.classList.toggle('d-none');
                btnKirim.classList.toggle('d-none');
                // tampilkan alert
                myAlert.classList.toggle('d-none');
                // reset formnya
                form.reset();
                namaInput.classList.remove('sukses');
                kelasInput.classList.remove('sukses');
                telpInput.classList.remove('sukses');
                pesanInput.classList.remove('sukses');
                console.log('Success!', response);
            })
            .catch(error => {
                // tampilkan tombol kirim, hilangkan tombol loading
                btnLoading.classList.toggle('d-none');
                btnKirim.classList.toggle('d-none');
                // tampilkan alert
                myAlert.classList.toggle('d-none');
                console.error('Error!', error.massage)
            })
    });

    function validateForm() {

    if (!namaInput.querySelector('input').value.trim()) {
        massage[0].innerHTML = 'Nama lengkap harus diisi';
        namaInput.classList.add('erorr');
        return false;
    } else {
        massage[0].innerHTML = '';
        namaInput.classList.remove('erorr');
        namaInput.classList.add('sukses');
    }

    if (!kelasInput.querySelector('input').value.trim()) {
        massage[1].innerHTML = 'Kelas harus diisi.';
        kelasInput.classList.add('erorr');
        return false;
    } else if (!kelasRegex.test(kelasInput.querySelector('input').value.trim())) {
        massage[1].innerHTML = 'Format kelas tidak valid.';
        kelasInput.classList.add('erorr');
        return false;
    } else {
        massage[1].innerHTML = '';
        kelasInput.classList.remove('erorr');
        kelasInput.classList.add('sukses');
    }

    if (!telpInput.querySelector('input').value.trim()) {
        massage[2].innerHTML = 'Nomor telepon harus diisi';
        telpInput.classList.add('erorr');
        return false;
    } else if (!telpRegex.test(telpInput.querySelector('input').value.trim())) {
        massage[2].innerHTML = 'Format nomor telepon tidak valid';
        telpInput.classList.add('erorr');
        return false;
    } else {
        massage[2].innerHTML = '';
        telpInput.classList.remove('erorr');
        telpInput.classList.add('sukses');
    }

    if (!pesanInput.querySelector('textarea').value.trim()) {
        massage[3].innerHTML = 'Alasan bergabung harus diisi';
        pesanInput.classList.add('erorr');
        return false;
    } else {
        massage[3].innerHTML = '';
        pesanInput.classList.remove('erorr');
        pesanInput.classList.add('sukses');
    }

    return true;
    }

    function handleInputBlur(event) {
        const input = event.target;
        const parentDiv = input.parentElement;
        const small = parentDiv.querySelector('small');

        // Memeriksa apakah nilai input tidak kosong
        if (input.value.trim() !== '') {
            // Menetapkan kelas 'sukses' jika input tidak kosong
            parentDiv.classList.remove('erorr');
            parentDiv.classList.add('sukses');
            small.innerHTML = ''; // Membersihkan pesan error jika ada
        }
    }

    function handleInputBlur(event) {
        const input = event.target;
        const parentDiv = input.parentElement;
        const small = parentDiv.querySelector('small');

        // Memeriksa apakah nilai input tidak kosong
        if (input.value.trim() !== '') {
            // Memeriksa validitas input
            const isValid = validateInput(input);

            if (isValid) {
                // Menetapkan kelas 'sukses' jika input valid
                parentDiv.classList.remove('erorr');
                parentDiv.classList.add('sukses');
                small.innerHTML = ''; // Membersihkan pesan error jika ada
            } else {
                // Menetapkan kelas 'erorr' jika input tidak valid
                parentDiv.classList.remove('sukses');
                parentDiv.classList.add('erorr');
                // Menampilkan pesan error sesuai dengan validasi
                switch (input.getAttribute('name')) {
                    case 'nama':
                        small.innerHTML = 'Nama lengkap harus lebih dari 5 karakter';
                        break;
                    case 'kelas':
                        if (!kelasRegex.test(input.value.trim())) {
                            small.innerHTML = 'Format kelas tidak valid';
                        } else {
                            small.innerHTML = 'Kelas harus diisi';
                        }
                        break;
                    case 'no telp':
                        if (!telpRegex.test(input.value.trim())) {
                            small.innerHTML = 'Format nomor telepon tidak valid';
                        } else {
                            small.innerHTML = 'Nomor telepon harus diisi';
                        }
                        break;
                    case 'pesan':
                        small.innerHTML = 'Pesan harus lebih dari 5 karakter';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // Fungsi untuk memeriksa validitas input berdasarkan tipe input
    function validateInput(input) {
        const inputValue = input.value.trim();
        const inputType = input.getAttribute('name');
        let isValid = true;

        // Validasi berdasarkan tipe input
        switch (inputType) {
            case 'nama':
                // Contoh validasi untuk nama lengkap (bisa disesuaikan dengan kebutuhan)
                // Misalnya, disini hanya memeriksa apakah input lebih dari 5 karakter
                isValid = inputValue.length > 5;
                break;
            case 'kelas':
                // Validasi untuk kelas menggunakan regex
                isValid = kelasRegex.test(inputValue);
                break;
            case 'no telp':
                // Validasi untuk nomor telepon menggunakan regex
                isValid = telpRegex.test(inputValue);
                break;
            case 'pesan':
                // Contoh validasi untuk pesan (bisa disesuaikan dengan kebutuhan)
                // Misalnya, disini hanya memeriksa apakah input lebih dari 10 karakter
                isValid = inputValue.length > 5;
                break;
            default:
                break;
        }

        return isValid;
    }