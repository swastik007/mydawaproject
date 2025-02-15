document.addEventListener("DOMContentLoaded", function() {
    loadComponents();
    setupEventListeners();
});

// Function to load HTML components dynamically
function loadComponents() {
    const components = [
        { id: "header", file: "components/header.html" },
        { id: "homeslider", file: "components/home-slider.html" },
        { id: "floatingsearch", file: "components/floatingsearch.html" },
        { id: "healthsteps", file: "components/simplifyhealthjourney.html" },
        { id: "cat-slider", file: "components/categoryslider.html" },
        { id: "offersection", file: "components/offersoftheday.html" },
        { id: "new-product", file: "components/newonmydawa.html" },
        { id: "promotionsection", file: "components/productshowcase.html" },
        { id: "popularproducts", file: "components/popularproducts.html" },
        { id: "featuresection", file: "components/features.html" },
        { id: "symptomsection", file: "components/symptoms.html" },
        { id: "footer", file: "components/footer.html" }
    ];

    let loadedCount = 0;

    components.forEach(({ id, file }) => {
        let el = document.getElementById(id);
        if (el) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    el.innerHTML = data;
                    loadedCount++;

                    console.log(`✅ Loaded ${file} into #${id}`);

                    // When all components are loaded, initialize carousels
                    if (loadedCount === components.length) {
                        console.log("All components loaded. Initializing carousels...");
                        initializeCarousels();
                    }
                })
                .catch(error => console.error(`❌ Error loading ${file}:`, error));
        }
    });
}

// Function to initialize Owl Carousels after components load
function initializeCarousels() {
    console.log("Initializing Owl Carousels...");

    if (typeof $.fn.owlCarousel === "undefined") {
        console.error("❌ Owl Carousel is not loaded. Check script order in index.html");
        return;
    }

    // List of carousels and their options
    const carousels = [
        { id: "#homepage-carousel", options: { loop: true, margin: 10, nav: false, dots: true, items: 1 } },
        { id: "#category-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 1 }, 400: { items: 2.8 }, 768: { items: 3 }, 1024: { items: 5 }, 1920: { items: 7 } } } },
        { id: "#category-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 1 }, 400: { items: 2.8 }, 768: { items: 3 }, 1024: { items: 5 }, 1920: { items: 7 } } } },
        { id: "#blog-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 4 } } } },
        { id: "#offer-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } } } },
        { id: "#popular-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 4 } } } },
        { id: "#newproduct-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2.1 }, 768: { items: 2 }, 1024: { items: 4 } } } }
    ];

    setTimeout(() => {
        carousels.forEach(carousel => {
            if ($(carousel.id).length) {
                console.log(`Initializing ${carousel.id}...`);
                $(carousel.id).owlCarousel(carousel.options);
            }
        });

        initializeHealthJourneyCarousel();
    }, 500);
}

// Function to handle the Health Journey section
function initializeHealthJourneyCarousel() {
    const container = $("#healthjourney-carousel");

    if (window.innerWidth < 1024) { // Enable Owl Carousel for mobile screens
        if (!container.hasClass("owl-loaded")) {
            console.log("Initializing Health Journey carousel...");
            container.addClass("owl-carousel").owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    768: { items: 3 }
                }
            });
        }
    } else {
        if (container.hasClass("owl-loaded")) {
            console.log("Destroying Health Journey carousel on larger screens...");
            container.trigger("destroy.owl.carousel").removeClass("owl-carousel owl-loaded");
        }
    }
}

// Ensure carousel re-initializes when the window resizes
window.addEventListener("resize", initializeHealthJourneyCarousel);


// Function to get navigation arrows for Owl Carousel
function getNavText() {
    return [
        '<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>',
        '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'
    ];
}

// Function to setup event listeners
function setupEventListeners() {
    document.addEventListener("click", function(e) {
        if (e.target.matches(".category-toggle")) toggleCategoryMenu(e);
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeCategoryMenu();
    });

    setupFAQToggle();
    setupFilterAccordion();
    setupThumbnailSwitcher();
    setupQuantityControls();
    setupWishlistPopup();
}

// Toggle Category Dropdown
function toggleCategoryMenu(e) {
    e.preventDefault();
    const dropdownMenu = e.target.nextElementSibling;
    document.querySelectorAll(".category-menu").forEach(menu => {
        if (menu !== dropdownMenu) menu.classList.remove("show-menu");
    });

    dropdownMenu.classList.toggle("show-menu");
    e.target.setAttribute("aria-expanded", dropdownMenu.classList.contains("show-menu"));
}

// Close Category Menu
function closeCategoryMenu() {
    document.querySelectorAll(".category-menu").forEach(menu => menu.classList.remove("show-menu"));
}

// FAQ Section Toggle
function setupFAQToggle() {
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const answer = document.getElementById(question.dataset.toggle);
            if (answer) {
                answer.classList.toggle("hidden");
            }
            question.classList.toggle("open");
        });
    });
}

// Filter Accordion
function setupFilterAccordion() {
    document.querySelectorAll(".filter-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === "block" ? "none" : "block";
            }
        });
    });
}

// Product Image Thumbnail Switcher
function setupThumbnailSwitcher() {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.getElementById("main-image");

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
}

// Quantity Controls
function setupQuantityControls() {
    const quantityDisplay = document.querySelector(".quantity");
    const decreaseBtn = document.querySelector(".decrease-btn");
    const increaseBtn = document.querySelector(".increase-btn");

    if (!quantityDisplay || !decreaseBtn || !increaseBtn) return;

    decreaseBtn.addEventListener("click", () => {
        let value = parseInt(quantityDisplay.textContent);
        if (value > 1) quantityDisplay.textContent = value - 1;
    });

    increaseBtn.addEventListener("click", () => {
        quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
    });
}

// Wishlist Popup
function setupWishlistPopup() {
    const wishlistPopup = document.getElementById("private-wishlist-popup");
    const wishlistBtn = document.getElementById("private-wishlist-btn");
    const closeBtn = document.getElementById("close-popup-btn");

    if (!wishlistPopup || !wishlistBtn || !closeBtn) return;

    wishlistBtn.addEventListener("click", () => wishlistPopup.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => wishlistPopup.classList.add("hidden"));
}