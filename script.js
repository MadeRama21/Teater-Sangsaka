
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

const dropdown = document.querySelector('.event-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const anyCards = document.querySelectorAll('.main-photos .any-card');
const dropdownToggle = document.querySelector('.dropdown-toggle');
let lastSelectedText = '';
let lastSelectedItem = null;

// Menambahkan event listener untuk setiap item dropdown
dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Menyimpan teks yang dipilih sebelumnya
        lastSelectedText = dropdownToggle.textContent;
        
        // Menyembunyikan item yang dipilih sebelumnya
        if (lastSelectedItem) {
            lastSelectedItem.style.display = 'block';
        }
        
        // Mengubah teks pada tombol dropdown
        dropdownToggle.textContent = item.textContent;
        
        // Menyembunyikan item yang dipilih
        item.style.display = 'none';
        
        // Menyimpan item yang dipilih saat ini
        lastSelectedItem = item;
        
        // Menampilkan item "All" yang tersembunyi
        dropdown.querySelector('.khusus').style.display = 'block';
    });
});

// Menambahkan event listener untuk item "All"
dropdown.querySelector('.khusus').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Mengembalikan teks yang dipilih sebelumnya
    dropdownToggle.textContent = 'All';
    
    // Menampilkan kembali item yang sebelumnya dipilih
    if (lastSelectedItem) {
        lastSelectedItem.style.display = 'block';
    }
    
    // Menyembunyikan item "All" kembali
    this.style.display = 'none';
});

dropdownItems.forEach(item => {
  item.addEventListener('click', function() {
    const selectedEvent = item.textContent.trim();
    const formattedEvent = formatClassName(selectedEvent);
    anyCards.forEach(photo => {
      // Periksa apakah elemen memiliki kelas yang sesuai dengan pilihan dropdown
      if (photo.classList.contains(formattedEvent)) {
        photo.style.display = 'block'; // Tampilkan elemen yang sesuai
      } else {
        photo.style.display = 'none'; // Sembunyikan elemen yang tidak sesuai
      }
    });
  });
});

// Fungsi untuk memformat nama kelas
function formatClassName(className) {
  // Menghapus karakter asing dan mengganti spasi dengan tanda hubung
  return className.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
}

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
    