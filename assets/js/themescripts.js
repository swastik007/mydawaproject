console.log("🚀 jQuery script is running!");


document.addEventListener("DOMContentLoaded", function () {
    loadComponents();
    setupEventListeners();
    // Ensure carousels are initialized on all pages
    setTimeout(() => {
        initializeCarousels();
    }, 100);
    // Initialize Datepicker
    $('.datepicker_input').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true,
        container: 'body',  // Attach datepicker to body
        orientation: 'bottom auto' // Ensures it opens below the input
    });

    // Open datepicker when clicking on the calendar icon
    $('.right-icon').click(function () {
        $('.datepicker_input').datepicker('show');
    });
    $('.datepicker_input').datepicker().on('show', function(e) {
        var picker = $('.datepicker-dropdown');
        picker.css({
            top: $(this).offset().top + $(this).outerHeight(),
            left: $(this).offset().left
        });
    });
});

// Function to load HTML components dynamically
function loadComponents() {
    const components = [
        { id: "header", file: "components/header.html" },
        { id: "homeslider", file: "components/homepage/home-slider.html" },
        { id: "floatingsearch", file: "components/homepage/floatingsearch.html" },
        { id: "healthsteps", file: "components/homepage/simplifyhealthjourney.html" },
        { id: "cat-slider", file: "components/homepage/categoryslider.html" },
        { id: "offersection", file: "components/homepage/offersoftheday.html" },
        { id: "homebanner", file: "components/homepage/homebanner.html" },
        { id: "new-product", file: "components/homepage/newonmydawa.html" },
        { id: "promotionsection", file: "components/homepage/productshowcase.html" },
        { id: "popularproducts", file: "components/homepage/popularproducts.html" },
        { id: "featuresection", file: "components/homepage/features.html" },
        { id: "symptomsection", file: "components/homepage/symptoms.html" },
        { id: "footer", file: "components/footer.html" },
        { id: "wishlistmodal", file: "components/pages/wishlistpopup.html" },
        { id: "wishlistmodaladdlist", file: "components/pages/wishlistpopup-addlist.html" },
        { id: "wishlistmodalsuccess", file: "components/pages/wishlistpopup-success.html" },
        { id: "speaktodoctormodal", file: "components/pages/speaktodoctormodal.html" },
        { id: "submitprescriptionmodal", file: "components/pages/submitprescriptionmodal.html" },
        { id: "wishlistpinmodal", file: "components/pages/wishlistpinpopup.html" },
        { id: "lastminutebuys", file: "components/pages/lastminutebuys.html" },
        { id: "paymentmodalsection", file: "components/pages/paymentmodal.html" },
        { id: "editdeliverysection", file: "components/pages/editdeliveryaddressmodal.html" },
        { id: "adddeliverysection", file: "components/pages/adddeliveryaddressmodal.html" },
        { id: "topupmodalsection", file: "components/pages/topupbalancemodal.html" },
        { id: "transferbalancemodalsection", file: "components/pages/transferbalancemodal.html" },
        { id: "ordersuccesssection", file: "components/pages/ordersuccessmodal.html" },

        // category page 
        { id: "faqsection", file: "components/pages/sexualwellnessfaq.html" },
        { id: "popular-by-durex-section", file: "components/pages/popularproductsbydurex.html" },
        { id: "bestvalueoffers", file: "components/pages/bestvalueoffers.html" },
        { id: "offerbycategories", file: "components/pages/offerbycategories.html" },
        { id: "discoverbrands", file: "components/pages/discoverbrands.html" },
        { id: "musthavedeals", file: "components/pages/musthavedeals.html" },

    ];

    let loadedCount = 0;

    components.forEach(({ id, file }) => {
        let el = document.getElementById(id);
        if (el) {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    el.innerHTML = data;
                    loadedCount++;

                    console.log(`✅ Loaded ${file} into #${id}`);

                    // When all components are loaded, initialize event listeners
                    if (loadedCount === components.length) {
                        console.log("All components loaded. Initializing event listeners...");
                        setupEventListeners();
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
        { id: "#homepage-carousel", options: { loop: true, margin: 10, nav: false, items: 1, autoplay: true, autoplayTimeout: 50000, smartSpeed: 600, dots: true, dotsContainer: ".custom-dots-container" } },
        { id: "#homebanner-carousel", options: { loop: true, margin: 10, nav: false, items: 1, autoplay: true, autoplayTimeout: 50000, smartSpeed: 600, dots: true, dotsContainer: ".custom-dots-bottom" } },
        { id: "#category-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 2 }, 400: { items: 2.8 }, 960: { items: 3.8 }, 1200: { items: 6 }, 1920: { items: 7 } } } },
        { id: "#blog-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3.9 } } } },
        { id: "#offer-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#popular-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#newproduct-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#popular-durex-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#bestvalueoffers-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#categoryoffers-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 1 }, 400: { items: 2.8 }, 768: { items: 3 }, 1024: { items: 5 }, 1920: { items: 7 } } } },
        { id: "#musthavedeals-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#lastminutebuys-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 2.5 }, 960: { items: 2.8 }, 1200: { items: 3.9 } } } },
        { id: "#login-carousel", options: { loop: true, margin: 10, nav: false, items: 1, autoplay: true, autoplayTimeout: 50000, smartSpeed: 600, dots: true, dotsContainer: ".custom-dots-container" } },


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

    if (window.innerWidth < 1200) { // Enable Owl Carousel for mobile screens
        if (!container.hasClass("owl-loaded")) {
            console.log("Initializing Health Journey carousel...");
            container.addClass("owl-carousel").owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 1 },
                    768: { items: 2 }
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
$(document).ready(function () {
    $("#wishlist-carousel").owlCarousel({
        loop: false,
        margin: 15,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 1.2 },
            600: { items: 2.1 },
            1024: { items: 4 }
        }
    });
});
// Ensure carousel re-initializes when the window resizes
window.addEventListener("resize", initializeHealthJourneyCarousel);


// Function to get navigation arrows for Owl Carousel
function getNavText() {
    return [
        // Left (Previous) Arrow SVG
        '<span aria-label="Previous"><svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.305419 8.8644C0.109857 8.63904 0 8.33343 0 8.01477C0 7.69611 0.109857 7.3905 0.305419 7.16514L6.20652 0.366945C6.30275 0.25207 6.41786 0.160501 6.54512 0.0976009C6.67239 0.0347008 6.80928 0.00144726 6.94778 0C7.08629 -0.00130267 7.22365 0.0290967 7.35185 0.0895197C7.48005 0.149943 7.59652 0.239141 7.69447 0.352013C7.79241 0.464885 7.86987 0.598992 7.92232 0.746741C7.97477 0.894491 8.00116 1.05264 7.99996 1.21216C7.99876 1.37168 7.96998 1.52942 7.91531 1.67607C7.86064 1.82272 7.78117 1.95527 7.68154 2.0661L2.51794 8.01477L7.68154 13.9634C7.87156 14.1901 7.9767 14.4936 7.97432 14.8087C7.97195 15.1238 7.86224 15.4252 7.66883 15.648C7.47542 15.8708 7.21379 15.9972 6.94028 15.9999C6.66677 16.0027 6.40326 15.8816 6.20652 15.6627L0.305419 8.8644Z" />' +
        '</svg></span>',

        // Right (Next) Arrow SVG
        '<span aria-label="Next"><svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.69458 7.1356C7.89014 7.36096 8 7.66657 8 7.98523C8 8.30389 7.89014 8.6095 7.69458 8.83486L1.79348 15.6331C1.69725 15.7479 1.58214 15.8395 1.45488 15.9024C1.32761 15.9654 1.19072 15.9986 1.05222 16C0.913706 16.0013 0.776345 15.9709 0.648146 15.9105C0.519946 15.8501 0.403476 15.7609 0.305532 15.648C0.207587 15.5352 0.13013 15.401 0.0776796 15.2533C0.025229 15.1056 -0.00116426 14.9474 3.93333e-05 14.7878C0.00124293 14.6282 0.0300196 14.4706 0.0846901 14.3239C0.139361 14.1773 0.21883 14.0447 0.318461 13.9339L5.48206 7.98523L0.318461 2.03661C0.128442 1.80995 0.0232987 1.50639 0.0256754 1.1913C0.0280521 0.876207 0.137759 0.574795 0.331168 0.351982C0.524576 0.129169 0.786212 0.00278279 1.05972 4.47764e-05C1.33323 -0.00269323 1.59674 0.118435 1.79348 0.337342L7.69458 7.1356Z" />' +
        '</svg></span>'
    ];
}


// Function to setup event listeners
function setupEventListeners() {
    document.addEventListener("click", function (e) {
        if (e.target.matches(".category-toggle")) toggleCategoryMenu(e);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeCategoryMenu();
    });

    setupFAQToggle();
    setupFilterAccordion();
    setupThumbnailSwitcher();
    setupQuantityControls();

    setTimeout(() => {
        setupWishlistPopup(); // Ensure modal exists before setting up listeners
        setupWishlistPopupCreate();
        setupWishlistPopupSuccess();
        setupWishlistPinPopup();
        setupPopup();
        setupPaymentPopup();
        setupEditDeliveryPopup();
        setupAddDeliveryPopup();
        setuptopBalancePopup();
        setuptransferBalancePopup();
        setuporderSuccessPopup();
    }, 1000);
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

// // Filter Accordion
// function setupFilterAccordion() {
//     document.querySelectorAll(".filter-header").forEach(header => {
//         header.addEventListener("click", () => {
//             const content = header.nextElementSibling;
//             if (content) {
//                 content.style.display = content.style.display === "block" ? "none" : "block";
//             }
//         });
//     });
// }
function setupFilterAccordion() {
    document.querySelectorAll(".filter-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = document.getElementById(header.dataset.toggle);
            if (content) {
                content.style.display = content.style.display === "block" ? "none" : "block";
                header.classList.toggle("open");
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
    $(document).on("click", ".btn-wishlist", function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("✅ Wishlist button clicked!");

        // Ensure modal exists before showing
        if ($("#wishlistModal").length) {
            $("#wishlistModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Wishlist modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        $("#wishlistModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#wishlistModal")) {
            $("#wishlistModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}
// Wishlist Popup Create New
function setupWishlistPopupCreate() {
  $(document).on("click", ".btn-wishlist-addlist", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Close any other open modals
      $(".dawa-modal").fadeOut();
      $("#modalOverlay").fadeOut();

      // Ensure modal exists before showing
      if ($("#wishlistModal").length) {
          $("#wishlistModal").fadeIn();
          $("#modalOverlay").fadeIn(); // Show overlay
      } else {
          console.error("❌ Wishlist modal not found in the DOM!");
      }
  });

  $(document).on("click", ".close-btn, #modalOverlay", function () {
      $("#wishlistModal").fadeOut();
      $("#modalOverlay").fadeOut(); // Hide overlay
  });

  $(window).on("click", function (e) {
      if ($(e.target).is("#wishlistModal")) {
          $("#wishlistModal").fadeOut();
          $("#modalOverlay").fadeOut(); // Hide overlay
      }
  });
}


// Wishlist Popup Success
function setupWishlistPopupSuccess() {
  $(document).on("click", ".btn-wishlist-save", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("✅ Wishlist button clicked!");

      // Ensure modal exists before showing
      if ($("#wishlistModal").length) {
          $("#wishlistModal").fadeIn();
          $("#modalOverlay").fadeIn(); // Show overlay
      } else {
          console.error("❌ Wishlist modal not found in the DOM!");
      }
  });

  $(document).on("click", ".close-btn, #modalOverlay", function () {
      $("#wishlistModal").fadeOut();
      $("#modalOverlay").fadeOut(); // Hide overlay
  });

  $(window).on("click", function (e) {
      if ($(e.target).is("#wishlistModal")) {
          $("#wishlistModal").fadeOut();
          $("#modalOverlay").fadeOut(); // Hide overlay
      }
  });
}

// Wishlist PIN Popup
function setupWishlistPinPopup() {
    $(document).on("click", ".btn-wishlistpin", function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("✅ Wishlist button clicked!");

        // Ensure modal exists before showing
        if ($("#wishlistModal").length) {
            $("#wishlistModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Wishlist modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        $("#wishlistModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#wishlistModal")) {
            $("#wishlistModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Submit Prescription Popup


// Speak to doctor
function setupPopup() {
    $(document).on("click", ".btn-popup", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Ensure modal exists before showing
        if ($("#popupModal").length) {
            $("#popupModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        $("#popupModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#popupModal")) {
            $("#popupModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Payment Popup
function setupPaymentPopup() {
    console.log("🚀 setupPaymentPopup() function executed");

    $(document).on("click", ".btn-payment-popup", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('✅ Payment popup button clicked');

        // Ensure modal exists before showing
        if ($("#paymentModal").length) {
            console.log("✅ Payment modal found, opening...");
            $("#paymentModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Payment modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing payment modal");
        $("#paymentModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#paymentModal")) {
            console.log("❌ Clicking outside payment modal, closing...");
            $("#paymentModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Edit Delivery Popup
function setupEditDeliveryPopup() {
    console.log("🚀 setupPaymentPopup() function executed");

    $(document).on("click", ".btn-edit-delivery", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Ensure modal exists before showing
        if ($("#editDeliveryModal").length) {
            console.log("✅ Payment modal found, opening...");
            $("#editDeliveryModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Payment modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing payment modal");
        $("#editDeliveryModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#editDeliveryModal")) {
            console.log("❌ Clicking outside payment modal, closing...");
            $("#editDeliveryModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Add Delivery Popup
function setupAddDeliveryPopup() {

    $(document).on("click", ".btn-add-delivery", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Ensure modal exists before showing
        if ($("#addDeliveryModal").length) {
            console.log("✅ Payment modal found, opening...");
            $("#addDeliveryModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Payment modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing modal");
        $("#addDeliveryModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#addDeliveryModal")) {
            console.log("❌ Clicking outside modal, closing...");
            $("#addDeliveryModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}


// Top-up Balance Popup
function setuptopBalancePopup() {
    console.log("🚀 Top-up Balance Popup script loaded!");

    $(document).on("click", ".btn-topup", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Ensure modal exists before showing
        if ($("#topupBalanceModal").length) {
            console.log("✅ Top-up modal found, opening...");
            $("#topupBalanceModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Top-up modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing modal");
        $("#topupBalanceModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#topupBalanceModal")) {
            console.log("❌ Clicking outside modal, closing...");
            $("#topupBalanceModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Transfer Balance Popup
function setuptransferBalancePopup() {
    console.log("🚀 Top-up Balance Popup script loaded!");

    $(document).on("click", ".btn-transferbalance", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Ensure modal exists before showing
        if ($("#transferBalanceModal").length) {
            console.log("✅ Top-up modal found, opening...");
            $("#transferBalanceModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
            // const phoneInput = document.querySelector("#phoneNumber");

            // if (phoneInput) {
            //     window.intlTelInput(phoneInput, {
            //         initialCountry: "np", // Set default to Nepal
            //         separateDialCode: true, // Show country code separately
            //         preferredCountries: ["np", "in", "us", "gb"], // Top preferred countries
            //         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
            //     });
            // } else {
            //     console.error("❌ Phone input element not found! Ensure the input exists in the DOM.");
            // }

        } else {
            console.error("❌ Top-up modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing modal");
        $("#transferBalanceModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#transferBalanceModal")) {
            console.log("❌ Clicking outside modal, closing...");
            $("#transferBalanceModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}
// Order Success Popup
function setuporderSuccessPopup() {
    console.log("🚀 order success script loaded!");

    $(document).on("click", ".btn-ordersuccess", function (e) {
        e.preventDefault();
        e.stopPropagation();
        // Close any other open modals
        $(".dawa-modal").fadeOut();
        $("#modalOverlay").fadeOut();

        // Ensure modal exists before showing
        if ($("#orderSuccessModal").length) {
            console.log("✅ Top-up modal found, opening...");
            $("#orderSuccessModal").fadeIn();
            $("#modalOverlay").fadeIn(); // Show overlay
        } else {
            console.error("❌ Top-up modal not found in the DOM!");
        }
    });

    $(document).on("click", ".close-btn, #modalOverlay", function () {
        console.log("❌ Closing modal");
        $("#orderSuccessModal").fadeOut();
        $("#modalOverlay").fadeOut(); // Hide overlay
    });

    $(window).on("click", function (e) {
        if ($(e.target).is("#orderSuccessModal")) {
            console.log("❌ Clicking outside modal, closing...");
            $("#orderSuccessModal").fadeOut();
            $("#modalOverlay").fadeOut(); // Hide overlay
        }
    });
}

// Ensure the function is executed
$(document).ready(function () {
    setuptopBalancePopup();
});


$(window).on("load", function () {
    console.log("🚀 jQuery Step Navigation Loaded!");

    let currentStep = 0;
    const stepSections = $(".step-section");
    const steps = $(".step");

    console.log("Step Sections Found: ", stepSections.length);

    if (stepSections.length === 0) {
        console.error("⚠️ No .step-section elements found! Check your HTML structure.");
        return;
    }

    function updateStep() {
        console.log(`Updating Step: ${currentStep}`);

        // Hide all steps and remove 'active' class
        stepSections.removeClass("active").hide();

        // Show only the current step
        stepSections.eq(currentStep).fadeIn().addClass("active");

        // Update step indicators
        steps.removeClass("selected completed");
        steps.each(function (index) {
            if (index < currentStep) {
                $(this).addClass("completed");
            } else if (index === currentStep) {
                $(this).addClass("selected");
            }
        });

        console.log(`✅ Step ${currentStep + 1} is now active.`);
    }

    // Handle "Continue" button clicks
    $(".btn-next").click(function () {
        console.log("➡️ Next button clicked.");
        if (currentStep < stepSections.length - 1) {
            currentStep++;
            updateStep();
        }
    });

    // Handle "Previous" button clicks
    $(".btn-prev").click(function () {
        console.log("⬅️ Previous button clicked.");
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });

    // Initialize the first step
    updateStep();
});

$(document).ready(function () {
    function waitForHeader() {
        let header = $(".site-header")[0]; // Get the actual DOM node
        if (!header) {
            console.error("❌ .site-header not found! Retrying...");
            setTimeout(waitForHeader, 500); // Retry every 500ms
        } else {
            console.log("✅ .site-header found!");
            initStickyHeader(); // Call function to make it sticky
        }
    }

    function initStickyHeader() {
        let header = $(".site-header");
        let promoBar = $(".header-promo");
        let mainContent = $("main.dawamain");

        function checkSticky() {
            let scrollPos = $(window).scrollTop();
            console.log("Checking sticky on scroll... Position:", scrollPos);

            if (scrollPos > 50) {
                if (!header.hasClass("sticky")) {
                    header.addClass("sticky");
                    promoBar.hide();
                    console.log("✅ Sticky class added!");
                }
            } else {
                if (header.hasClass("sticky")) {
                    header.removeClass("sticky");
                    promoBar.show();
                    console.log("❌ Sticky class removed!");
                }
            }
        }

        $(window).on("scroll", checkSticky);
        checkSticky(); // Run on load

        // **Mutation Observer: Reapply .sticky if removed**
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (!header.hasClass("sticky") && $(window).scrollTop() > 50) {
                    console.warn("⚠️ .sticky was removed, reapplying!");
                    header.addClass("sticky");
                }
            });
        });

        observer.observe(header[0], { attributes: true, attributeFilter: ["class"] });
    }

    waitForHeader(); // Start checking for header
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!"); // Debugging

    // Recipient Selection (Myself/Dependent)
    const myselfRadio = document.getElementById("myself");
    const dependentRadio = document.getElementById("dependent");
    const myselfSection = document.getElementById("myselfSection");
    const dependentSection = document.getElementById("dependentSection");

    if (myselfRadio && dependentRadio && myselfSection && dependentSection) {
        console.log("Recipient selection elements found.");

        // Function to toggle recipient sections
        function toggleRecipientSections() {
            console.log("Recipient changed:", dependentRadio.checked ? "Dependent" : "Myself");
            if (dependentRadio.checked) {
                myselfSection.style.display = "none";
                dependentSection.style.display = "block";
            } else {
                myselfSection.style.display = "block";
                dependentSection.style.display = "none";
            }
        }

        // Event Listeners for recipient selection (Only if on recipient page)
        myselfRadio.addEventListener("change", toggleRecipientSections);
        dependentRadio.addEventListener("change", toggleRecipientSections);

        // Initialize on page load
        toggleRecipientSections();
    } else {
        console.log("Recipient selection elements not found. Skipping recipient toggle.");
    }
    // Payment Method Selection - Step 1 (Self Pay, Insurance )
    const selfPaymentRadio = document.getElementById("selfPaymentRadio");
    const insuranceRadio = document.getElementById("insuranceRadio");
    const selfPaymentSection = document.getElementById("selfPayment");
    const insurancePaymentSection = document.getElementById("insurancePayment");

    if (selfPaymentRadio && insuranceRadio && selfPaymentSection && insurancePaymentSection) {
        console.log("selection elements found.");

        // Function to toggle recipient sections
        function togglePaymentTabSections() {
            if (insuranceRadio.checked) {
                selfPayment.style.display = "none";
                insurancePayment.style.display = "block";
            } else {
                selfPayment.style.display = "block";
                insurancePayment.style.display = "none";
            }
        }

        selfPaymentRadio.addEventListener("change", togglePaymentTabSections);
        insuranceRadio.addEventListener("change", togglePaymentTabSections);

        // Initialize on page load
        togglePaymentTabSections();
    } else {
        console.log("selection elements not found. Skipping  toggle.");
    }
    // Payment Method Selection (Self Pay, Smart, MTIBA, CIGNA, SLADE)
    const selfpayRadio = document.getElementById("selfpay");
    const smartRadio = document.getElementById("smart");
    const mtibaRadio = document.getElementById("mtiba");
    const cignaRadio = document.getElementById("cigna");
    const sladeRadio = document.getElementById("slade");

    const selfpaySection = document.getElementById("selfpaySection");
    const smartSection = document.getElementById("smartSection");
    const mtibaSection = document.getElementById("mtibaSection");
    const cignaSection = document.getElementById("cignaSection");
    const sladeSection = document.getElementById("sladeSection");

    if (selfpayRadio && smartRadio && mtibaRadio && cignaRadio && sladeRadio) {
        console.log("Payment selection elements found.");

        // Function to toggle payment sections
        function togglePaymentSections() {
            console.log("Payment method changed");
            if (selfpaySection) selfpaySection.style.display = selfpayRadio.checked ? "block" : "none";
            if (smartSection) smartSection.style.display = smartRadio.checked ? "block" : "none";
            if (mtibaSection) mtibaSection.style.display = mtibaRadio.checked ? "block" : "none";
            if (cignaSection) cignaSection.style.display = cignaRadio.checked ? "block" : "none";
            if (sladeSection) sladeSection.style.display = sladeRadio.checked ? "block" : "none";
        }

        // Event Listeners for payment selection (Only if on payment page)
        selfpayRadio.addEventListener("change", togglePaymentSections);
        smartRadio.addEventListener("change", togglePaymentSections);
        mtibaRadio.addEventListener("change", togglePaymentSections);
        cignaRadio.addEventListener("change", togglePaymentSections);
        sladeRadio.addEventListener("change", togglePaymentSections);

        // Initialize on page load
        togglePaymentSections();
    } else {
        console.log("Payment selection elements not found. Skipping payment toggle.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Payment selection script loaded!");

    // Payment option radio buttons
    const paymentRadios = document.querySelectorAll(".radio-option-full input[type='radio']");

    // Payment details sections
    const mobileMoneySection = document.getElementById("mobileMoneySection");
    const debitCardSection = document.getElementById("debitCardSection");
    const accountBalanceSection = document.getElementById("accountBalanceSection");
    const loyaltyPointSection = document.getElementById("loyaltyPointSection");

    // Function to show only the selected payment section
    function togglePaymentSection(selectedValue) {
        console.log("Selected Payment Method:", selectedValue);

        // Hide all sections first
        mobileMoneySection.style.display = "none";
        debitCardSection.style.display = "none";
        accountBalanceSection.style.display = "none";
        loyaltyPointSection.style.display = "none";

        // Show the selected section
        if (selectedValue === "mobile-money") {
            mobileMoneySection.style.display = "block";
        } else if (selectedValue === "credit-debit") {
            debitCardSection.style.display = "block";
        } else if (selectedValue === "account-balance") {
            accountBalanceSection.style.display = "block";
        } else if (selectedValue === "radio-loyalty") {
            loyaltyPointSection.style.display = "block";
        }
    }

    // Attach event listeners to all radio buttons
    paymentRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            togglePaymentSection(this.value);
        });

        // Initialize the selected section on page load
        if (radio.checked) {
            togglePaymentSection(radio.value);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Top-up Balance Modal script loaded!");

    // Ensure the modal exists before running the script
    const topupModal = document.getElementById("topupBalanceModal");
    if (!topupModal) {
        console.warn("⚠️ Top-up modal not found in the DOM.");
        return; // Stop execution if modal is missing
    }

    const closeModalBtn = topupModal.querySelector(".close-btn");
    if (!closeModalBtn) {
        console.warn("⚠️ Close button not found inside the modal.");
        return;
    }

    // Radio buttons
    const topupRadios = document.querySelectorAll(".shipping-options input[type='radio']");

    // Payment sections
    const mPesaSection = document.getElementById("mPesaSection");
    const airtelSection = document.getElementById("airtelSection");

    // Function to show the modal
    function showTopupModal() {
        console.log("📌 Showing top-up modal...");
        topupModal.style.display = "block";
    }

    // Function to hide the modal
    function hideTopupModal() {
        console.log("📌 Hiding top-up modal...");
        topupModal.style.display = "none";
    }

    // Attach click event to the button that opens the modal
    document.querySelectorAll(".btn-topup").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            showTopupModal();
        });
    });

    // Close modal on close button click
    closeModalBtn.addEventListener("click", hideTopupModal);

    // Close modal when clicking outside modal content
    window.addEventListener("click", function (e) {
        if (e.target === topupModal) {
            hideTopupModal();
        }
    });

    // Function to toggle payment instructions
    function togglePaymentInstructions(selectedValue) {
        console.log("Selected Top-up Method:", selectedValue);

        // Hide both sections
        mPesaSection.style.display = "none";
        airtelSection.style.display = "none";

        // Show selected section
        if (selectedValue === "option-mpesa") {
            mPesaSection.style.display = "block";
        } else if (selectedValue === "option-airtel") {
            airtelSection.style.display = "block";
        }
    }

    // Attach event listeners to radio buttons
    topupRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            togglePaymentInstructions(this.value);
        });

        // Ensure the correct section is shown on page load
        if (radio.checked) {
            togglePaymentInstructions(radio.value);
        }
    });
});


document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
        const dropdownBtn = document.getElementById('dropdownMenuButton');
        dropdownBtn.textContent = this.textContent;

        if (this.classList.contains("create-new")) {
            alert("Redirecting to create new dependent form...");
        }
    });
});

// Category Filter Custom 
// Requires jQuery

// Initialize slider:
$(document).ready(function() {
    $('.noUi-handle').on('click', function() {
      $(this).width(50);
    });
    var rangeSlider = document.getElementById('slider-range');
    var moneyFormat = wNumb({
      decimals: 0,
      thousand: ',',
      prefix: '$'
    });
    noUiSlider.create(rangeSlider, {
      start: [500000, 1000000],
      step: 1,
      range: {
        'min': [100000],
        'max': [1000000]
      },
      format: moneyFormat,
      connect: true
    });
    
    // Set visual min and max values and also update value hidden form inputs
    rangeSlider.noUiSlider.on('update', function(values, handle) {
      document.getElementById('slider-range-value1').innerHTML = values[0];
      document.getElementById('slider-range-value2').innerHTML = values[1];
      document.getElementsByName('min-value').value = moneyFormat.from(
        values[0]);
      document.getElementsByName('max-value').value = moneyFormat.from(
        values[1]);
    });
  });
  
  
  
  // https://refreshless.com/nouislider/
  /*! nouislider - 8.3.0 - 2016-02-14 17:37:19 */
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
    } else if (typeof exports === 'object') {
      // Node/CommonJS
      module.exports = factory();
    } else {
      // Browser globals
      window.noUiSlider = factory();
    }
  }(function() {
    'use strict';
    // Removes duplicates from an array.
    function unique(array) {
        return array.filter(function(a) {
          return !this[a] ? this[a] = true : false;
        }, {});
      }
      // Round a value to the closest 'to'.
  
    function closest(value, to) {
        return Math.round(value / to) * to;
      }
      // Current position of an element relative to the document.
  
    function offset(elem) {
        var rect = elem.getBoundingClientRect(),
          doc = elem.ownerDocument,
          docElem = doc.documentElement,
          pageOffset = getPageOffset();
        // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
          pageOffset.x = 0;
        }
        return {
          top: rect.top + pageOffset.y - docElem.clientTop,
          left: rect.left + pageOffset.x - docElem.clientLeft
        };
      }
      // Checks whether a value is numerical.
  
    function isNumeric(a) {
        return typeof a === 'number' && !isNaN(a) && isFinite(a);
      }
      // Rounds a number to 7 supported decimals.
  
    function accurateNumber(number) {
        var p = Math.pow(10, 7);
        return Number((Math.round(number * p) / p).toFixed(7));
      }
      // Sets a class and removes it after [duration] ms.
  
    function addClassFor(element, className, duration) {
        addClass(element, className);
        setTimeout(function() {
          removeClass(element, className);
        }, duration);
      }
      // Limits a value to 0 - 100
  
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
      }
      // Wraps a variable as an array, if it isn't one yet.
  
    function asArray(a) {
        return Array.isArray(a) ? a : [a];
      }
      // Counts decimals
  
    function countDecimals(numStr) {
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
      }
      // http://youmightnotneedjquery.com/#add_class
  
    function addClass(el, className) {
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      }
      // http://youmightnotneedjquery.com/#remove_class
  
    function removeClass(el, className) {
        if (el.classList) {
          el.classList.remove(className);
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' +
            className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }
      // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
  
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp(
          '\\b' + className + '\\b').test(el.className);
      }
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
  
    function getPageOffset() {
        var supportPageOffset = window.pageXOffset !== undefined,
          isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
          x = supportPageOffset ? window.pageXOffset : isCSS1Compat ?
          document.documentElement.scrollLeft : document.body.scrollLeft,
          y = supportPageOffset ? window.pageYOffset : isCSS1Compat ?
          document.documentElement.scrollTop : document.body.scrollTop;
        return {
          x: x,
          y: y
        };
      }
      // Shorthand for stopPropagation so we don't have to create a dynamic method
  
    function stopPropagation(e) {
        e.stopPropagation();
      }
      // todo
  
    function addCssPrefix(cssPrefix) {
      return function(className) {
        return cssPrefix + className;
      };
    }
    var
    // Determine the events to bind. IE11 implements pointerEvents without
    // a prefix, which breaks compatibility with the IE10 implementation.
    /** @const */
      actions = window.navigator.pointerEnabled ? {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup'
      } : window.navigator.msPointerEnabled ? {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
      } : {
        start: 'mousedown touchstart',
        move: 'mousemove touchmove',
        end: 'mouseup touchend'
      },
      defaultCssPrefix = 'noUi-';
    // Value calculation
    // Determine the size of a sub-range in relation to a full range.
    function subRangeRatio(pa, pb) {
        return (100 / (pb - pa));
      }
      // (percentage) How many percent is this value of this range?
  
    function fromPercentage(range, value) {
        return (value * 100) / (range[1] - range[0]);
      }
      // (percentage) Where is this value on this range?
  
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) :
          value - range[0]);
      }
      // (value) How much is this percentage on this range?
  
    function isPercentage(range, value) {
        return ((value * (range[1] - range[0])) / 100) + range[0];
      }
      // Range conversion
  
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) {
          j += 1;
        }
        return j;
      }
      // (percentage) Input a value, find where, on a scale of 0-100, it applies.
  
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
          return 100;
        }
        var j = getJ(value, xVal),
          va, vb, pa, pb;
        va = xVal[j - 1];
        vb = xVal[j];
        pa = xPct[j - 1];
        pb = xPct[j];
        return pa + (toPercentage([va, vb], value) / subRangeRatio(pa, pb));
      }
      // (value) Input a percentage, find where it is on the specified range.
  
    function fromStepping(xVal, xPct, value) {
        // There is no range group that fits 100
        if (value >= 100) {
          return xVal.slice(-1)[0];
        }
        var j = getJ(value, xPct),
          va, vb, pa, pb;
        va = xVal[j - 1];
        vb = xVal[j];
        pa = xPct[j - 1];
        pb = xPct[j];
        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
      }
      // (percentage) Get the step that applies at a certain value.
  
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
          return value;
        }
        var j = getJ(value, xPct),
          a, b;
        // If 'snap' is set, steps are used as fixed points on the slider.
        if (snap) {
          a = xPct[j - 1];
          b = xPct[j];
          // Find the closest position, a or b.
          if ((value - a) > ((b - a) / 2)) {
            return b;
          }
          return a;
        }
        if (!xSteps[j - 1]) {
          return value;
        }
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
      }
      // Entry parsing
  
    function handleEntryPoint(index, value, that) {
      var percentage;
      // Wrap numerical input in an array.
      if (typeof value === "number") {
        value = [value];
      }
      // Reject any invalid input, by testing whether value is an array.
      if (Object.prototype.toString.call(value) !== '[object Array]') {
        throw new Error("noUiSlider: 'range' contains invalid value.");
      }
      // Covert min/max syntax to 0 and 100.
      if (index === 'min') {
        percentage = 0;
      } else if (index === 'max') {
        percentage = 100;
      } else {
        percentage = parseFloat(index);
      }
      // Check for correct input.
      if (!isNumeric(percentage) || !isNumeric(value[0])) {
        throw new Error("noUiSlider: 'range' value isn't numeric.");
      }
      // Store values.
      that.xPct.push(percentage);
      that.xVal.push(value[0]);
      // NaN will evaluate to false too, but to keep
      // logging clear, set step explicitly. Make sure
      // not to override the 'step' setting with false.
      if (!percentage) {
        if (!isNaN(value[1])) {
          that.xSteps[0] = value[1];
        }
      } else {
        that.xSteps.push(isNaN(value[1]) ? false : value[1]);
      }
    }
  
    function handleStepPoint(i, n, that) {
        // Ignore 'false' stepping.
        if (!n) {
          return true;
        }
        // Factor to range ratio
        that.xSteps[i] = fromPercentage([
          that.xVal[i], that.xVal[i + 1]
        ], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
      }
      // Interface
      // The interface to Spectrum handles all direction-based
      // conversions, so the above values are unaware.
  
    function Spectrum(entry, snap, direction, singleStep) {
      this.xPct = [];
      this.xVal = [];
      this.xSteps = [singleStep || false];
      this.xNumSteps = [false];
      this.snap = snap;
      this.direction = direction;
      var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];
      // Map the object keys to an array.
      for (index in entry) {
        if (entry.hasOwnProperty(index)) {
          ordered.push([entry[index], index]);
        }
      }
      // Sort all entries by value (numeric sort).
      if (ordered.length && typeof ordered[0][0] === "object") {
        ordered.sort(function(a, b) {
          return a[0][0] - b[0][0];
        });
      } else {
        ordered.sort(function(a, b) {
          return a[0] - b[0];
        });
      }
      // Convert all entries to subranges.
      for (index = 0; index < ordered.length; index++) {
        handleEntryPoint(ordered[index][1], ordered[index][0], this);
      }
      // Store the actual step values.
      // xSteps is sorted in the same order as xPct and xVal.
      this.xNumSteps = this.xSteps.slice(0);
      // Convert all numeric steps to the percentage of the subrange they represent.
      for (index = 0; index < this.xNumSteps.length; index++) {
        handleStepPoint(index, this.xNumSteps[index], this);
      }
    }
    Spectrum.prototype.getMargin = function(value) {
      return this.xPct.length === 2 ? fromPercentage(this.xVal, value) :
        false;
    };
    Spectrum.prototype.toStepping = function(value) {
      value = toStepping(this.xVal, this.xPct, value);
      // Invert the value if this is a right-to-left slider.
      if (this.direction) {
        value = 100 - value;
      }
      return value;
    };
    Spectrum.prototype.fromStepping = function(value) {
      // Invert the value if this is a right-to-left slider.
      if (this.direction) {
        value = 100 - value;
      }
      return accurateNumber(fromStepping(this.xVal, this.xPct, value));
    };
    Spectrum.prototype.getStep = function(value) {
      // Find the proper step for rtl sliders by search in inverse direction.
      // Fixes issue #262.
      if (this.direction) {
        value = 100 - value;
      }
      value = getStep(this.xPct, this.xSteps, this.snap, value);
      if (this.direction) {
        value = 100 - value;
      }
      return value;
    };
    Spectrum.prototype.getApplicableStep = function(value) {
      // If the value is 100%, return the negative step twice.
      var j = getJ(value, this.xPct),
        offset = value === 100 ? 2 : 1;
      return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[
        j - offset]];
    };
    // Outside testing
    Spectrum.prototype.convert = function(value) {
      return this.getStep(this.toStepping(value));
    };
    /*	Every input option is tested and parsed. This'll prevent
      endless validation in internal methods. These tests are
      structured with an item for every option available. An
      option can be marked as required by setting the 'r' flag.
      The testing function is provided with three arguments:
          - The provided value for the option;
          - A reference to the options object;
          - The name for the option;
  
      The testing function returns false when an error is detected,
      or true when everything is OK. It can also modify the option
      object, to make sure all values can be correctly looped elsewhere. */
    var defaultFormatter = {
      'to': function(value) {
        return value !== undefined && value.toFixed(2);
      },
      'from': Number
    };
  
    function testStep(parsed, entry) {
      if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'step' is not numeric.");
      }
      // The step option can still be used to set stepping
      // for linear sliders. Overwritten if set in 'range'.
      parsed.singleStep = entry;
    }
  
    function testRange(parsed, entry) {
      // Filter incorrect input.
      if (typeof entry !== 'object' || Array.isArray(entry)) {
        throw new Error("noUiSlider: 'range' is not an object.");
      }
      // Catch missing start or end.
      if (entry.min === undefined || entry.max === undefined) {
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      }
      // Catch equal start or end.
      if (entry.min === entry.max) {
        throw new Error(
          "noUiSlider: 'range' 'min' and 'max' cannot be equal.");
      }
      parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed
        .singleStep);
    }
  
    function testStart(parsed, entry) {
      entry = asArray(entry);
      // Validate input. Values aren't tested, as the public .val method
      // will always provide a valid location.
      if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
        throw new Error("noUiSlider: 'start' option is incorrect.");
      }
      // Store the number of handles.
      parsed.handles = entry.length;
      // When the slider is initialized, the .val method will
      // be called with the start options.
      parsed.start = entry;
    }
  
    function testSnap(parsed, entry) {
      // Enforce 100% stepping within subranges.
      parsed.snap = entry;
      if (typeof entry !== 'boolean') {
        throw new Error("noUiSlider: 'snap' option must be a boolean.");
      }
    }
  
    function testAnimate(parsed, entry) {
      // Enforce 100% stepping within subranges.
      parsed.animate = entry;
      if (typeof entry !== 'boolean') {
        throw new Error("noUiSlider: 'animate' option must be a boolean.");
      }
    }
  
    function testConnect(parsed, entry) {
      if (entry === 'lower' && parsed.handles === 1) {
        parsed.connect = 1;
      } else if (entry === 'upper' && parsed.handles === 1) {
        parsed.connect = 2;
      } else if (entry === true && parsed.handles === 2) {
        parsed.connect = 3;
      } else if (entry === false) {
        parsed.connect = 0;
      } else {
        throw new Error(
          "noUiSlider: 'connect' option doesn't match handle count.");
      }
    }
  
    function testOrientation(parsed, entry) {
      // Set orientation to an a numerical value for easy
      // array selection.
      switch (entry) {
        case 'horizontal':
          parsed.ort = 0;
          break;
        case 'vertical':
          parsed.ort = 1;
          break;
        default:
          throw new Error("noUiSlider: 'orientation' option is invalid.");
      }
    }
  
    function testMargin(parsed, entry) {
      if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      }
      // Issue #582
      if (entry === 0) {
        return;
      }
      parsed.margin = parsed.spectrum.getMargin(entry);
      if (!parsed.margin) {
        throw new Error(
          "noUiSlider: 'margin' option is only supported on linear sliders."
        );
      }
    }
  
    function testLimit(parsed, entry) {
      if (!isNumeric(entry)) {
        throw new Error("noUiSlider: 'limit' option must be numeric.");
      }
      parsed.limit = parsed.spectrum.getMargin(entry);
      if (!parsed.limit) {
        throw new Error(
          "noUiSlider: 'limit' option is only supported on linear sliders."
        );
      }
    }
  
    function testDirection(parsed, entry) {
      // Set direction as a numerical value for easy parsing.
      // Invert connection for RTL sliders, so that the proper
      // handles get the connect/background classes.
      switch (entry) {
        case 'ltr':
          parsed.dir = 0;
          break;
        case 'rtl':
          parsed.dir = 1;
          parsed.connect = [0, 2, 1, 3][parsed.connect];
          break;
        default:
          throw new Error(
            "noUiSlider: 'direction' option was not recognized.");
      }
    }
  
    function testBehaviour(parsed, entry) {
      // Make sure the input is a string.
      if (typeof entry !== 'string') {
        throw new Error(
          "noUiSlider: 'behaviour' must be a string containing options.");
      }
      // Check if the string contains any keywords.
      // None are required.
      var tap = entry.indexOf('tap') >= 0,
        drag = entry.indexOf('drag') >= 0,
        fixed = entry.indexOf('fixed') >= 0,
        snap = entry.indexOf('snap') >= 0,
        hover = entry.indexOf('hover') >= 0;
      // Fix #472
      if (drag && !parsed.connect) {
        throw new Error(
          "noUiSlider: 'drag' behaviour must be used with 'connect': true."
        );
      }
      parsed.events = {
        tap: tap || snap,
        drag: drag,
        fixed: fixed,
        snap: snap,
        hover: hover
      };
    }
  
    function testTooltips(parsed, entry) {
      var i;
      if (entry === false) {
        return;
      } else if (entry === true) {
        parsed.tooltips = [];
        for (i = 0; i < parsed.handles; i++) {
          parsed.tooltips.push(true);
        }
      } else {
        parsed.tooltips = asArray(entry);
        if (parsed.tooltips.length !== parsed.handles) {
          throw new Error(
            "noUiSlider: must pass a formatter for all handles.");
        }
        parsed.tooltips.forEach(function(formatter) {
          if (typeof formatter !== 'boolean' && (typeof formatter !==
            'object' || typeof formatter.to !== 'function')) {
            throw new Error(
              "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
            );
          }
        });
      }
    }
  
    function testFormat(parsed, entry) {
      parsed.format = entry;
      // Any object with a to and from method is supported.
      if (typeof entry.to === 'function' && typeof entry.from ===
        'function') {
        return true;
      }
      throw new Error(
        "noUiSlider: 'format' requires 'to' and 'from' methods.");
    }
  
    function testCssPrefix(parsed, entry) {
        if (entry !== undefined && typeof entry !== 'string') {
          throw new Error("noUiSlider: 'cssPrefix' must be a string.");
        }
        parsed.cssPrefix = entry;
      }
      // Test all developer settings and parse to assumption-safe values.
  
    function testOptions(options) {
      // To prove a fix for #537, freeze options here.
      // If the object is modified, an error will be thrown.
      // Object.freeze(options);
      var parsed = {
          margin: 0,
          limit: 0,
          animate: true,
          format: defaultFormatter
        },
        tests;
      // Tests are executed in the order they are presented here.
      tests = {
        'step': {
          r: false,
          t: testStep
        },
        'start': {
          r: true,
          t: testStart
        },
        'connect': {
          r: true,
          t: testConnect
        },
        'direction': {
          r: true,
          t: testDirection
        },
        'snap': {
          r: false,
          t: testSnap
        },
        'animate': {
          r: false,
          t: testAnimate
        },
        'range': {
          r: true,
          t: testRange
        },
        'orientation': {
          r: false,
          t: testOrientation
        },
        'margin': {
          r: false,
          t: testMargin
        },
        'limit': {
          r: false,
          t: testLimit
        },
        'behaviour': {
          r: true,
          t: testBehaviour
        },
        'format': {
          r: false,
          t: testFormat
        },
        'tooltips': {
          r: false,
          t: testTooltips
        },
        'cssPrefix': {
          r: false,
          t: testCssPrefix
        }
      };
      var defaults = {
        'connect': false,
        'direction': 'ltr',
        'behaviour': 'tap',
        'orientation': 'horizontal'
      };
      // Run all options through a testing mechanism to ensure correct
      // input. It should be noted that options might get modified to
      // be handled properly. E.g. wrapping integers in arrays.
      Object.keys(tests).forEach(function(name) {
        // If the option isn't set, but it is required, throw an error.
        if (options[name] === undefined && defaults[name] === undefined) {
          if (tests[name].r) {
            throw new Error("noUiSlider: '" + name + "' is required.");
          }
          return true;
        }
        tests[name].t(parsed, options[name] === undefined ? defaults[
          name] : options[name]);
      });
      // Forward pips options
      parsed.pips = options.pips;
      // Pre-define the styles.
      parsed.style = parsed.ort ? 'top' : 'left';
      return parsed;
    }
  
    function closure(target, options) {
        // All variables local to 'closure' are prefixed with 'scope_'
        var scope_Target = target,
          scope_Locations = [-1, -1],
          scope_Base,
          scope_Handles,
          scope_Spectrum = options.spectrum,
          scope_Values = [],
          scope_Events = {},
          scope_Self;
        var cssClasses = [
          /*  0 */
          'target'
          /*  1 */
          , 'base'
          /*  2 */
          , 'origin'
          /*  3 */
          , 'handle'
          /*  4 */
          , 'horizontal'
          /*  5 */
          , 'vertical'
          /*  6 */
          , 'background'
          /*  7 */
          , 'connect'
          /*  8 */
          , 'ltr'
          /*  9 */
          , 'rtl'
          /* 10 */
          , 'draggable'
          /* 11 */
          , ''
          /* 12 */
          , 'state-drag'
          /* 13 */
          , ''
          /* 14 */
          , 'state-tap'
          /* 15 */
          , 'active'
          /* 16 */
          , ''
          /* 17 */
          , 'stacking'
          /* 18 */
          , 'tooltip'
          /* 19 */
          , ''
          /* 20 */
          , 'pips'
          /* 21 */
          , 'marker'
          /* 22 */
          , 'value'
        ].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));
        // Delimit proposed values for handle positions.
        function getPositions(a, b, delimit) {
            // Add movement to current position.
            var c = a + b[0],
              d = a + b[1];
            // Only alter the other position on drag,
            // not on standard sliding.
            if (delimit) {
              if (c < 0) {
                d += Math.abs(c);
              }
              if (d > 100) {
                c -= (d - 100);
              }
              // Limit values to 0 and 100.
              return [limit(c), limit(d)];
            }
            return [c, d];
          }
          // Provide a clean event with standardized offset values.
  
        function fixEvent(e, pageOffset) {
            // Prevent scrolling and panning on touch events, while
            // attempting to slide. The tap event also depends on this.
            e.preventDefault();
            // Filter the event to register the type, which can be
            // touch, mouse or pointer. Offset changes need to be
            // made on an event specific basis.
            var touch = e.type.indexOf('touch') === 0,
              mouse = e.type.indexOf('mouse') === 0,
              pointer = e.type.indexOf('pointer') === 0,
              x, y, event = e;
            // IE10 implemented pointer events with a prefix;
            if (e.type.indexOf('MSPointer') === 0) {
              pointer = true;
            }
            if (touch) {
              // noUiSlider supports one movement at a time,
              // so we can select the first 'changedTouch'.
              x = e.changedTouches[0].pageX;
              y = e.changedTouches[0].pageY;
            }
            pageOffset = pageOffset || getPageOffset();
            if (mouse || pointer) {
              x = e.clientX + pageOffset.x;
              y = e.clientY + pageOffset.y;
            }
            event.pageOffset = pageOffset;
            event.points = [x, y];
            event.cursor = mouse || pointer; // Fix #435
            return event;
          }
          // Append a handle to the base.
  
        function addHandle(direction, index) {
            var origin = document.createElement('div'),
              handle = document.createElement('div'),
              additions = ['-lower', '-upper'];
            if (direction) {
              additions.reverse();
            }
            addClass(handle, cssClasses[3]);
            addClass(handle, cssClasses[3] + additions[index]);
            addClass(origin, cssClasses[2]);
            origin.appendChild(handle);
            return origin;
          }
          // Add the proper connection classes.
  
        function addConnection(connect, target, handles) {
            // Apply the required connection classes to the elements
            // that need them. Some classes are made up for several
            // segments listed in the class list, to allow easy
            // renaming and provide a minor compression benefit.
            switch (connect) {
              case 1:
                addClass(target, cssClasses[7]);
                addClass(handles[0], cssClasses[6]);
                break;
              case 3:
                addClass(handles[1], cssClasses[6]);
                /* falls through */
              case 2:
                addClass(handles[0], cssClasses[7]);
                /* falls through */
              case 0:
                addClass(target, cssClasses[6]);
                break;
            }
          }
          // Add handles to the slider base.
  
        function addHandles(nrHandles, direction, base) {
            var index, handles = [];
            // Append handles.
            for (index = 0; index < nrHandles; index += 1) {
              // Keep a list of all added handles.
              handles.push(base.appendChild(addHandle(direction, index)));
            }
            return handles;
          }
          // Initialize a single slider.
  
        function addSlider(direction, orientation, target) {
          // Apply classes and data to the target.
          addClass(target, cssClasses[0]);
          addClass(target, cssClasses[8 + direction]);
          addClass(target, cssClasses[4 + orientation]);
          var div = document.createElement('div');
          addClass(div, cssClasses[1]);
          target.appendChild(div);
          return div;
        }
  
        function addTooltip(handle, index) {
            if (!options.tooltips[index]) {
              return false;
            }
            var element = document.createElement('div');
            element.className = cssClasses[18];
            return handle.firstChild.appendChild(element);
          }
          // The tooltips option is a shorthand for using the 'update' event.
  
        function tooltips() {
          if (options.dir) {
            options.tooltips.reverse();
          }
          // Tooltips are added with options.tooltips in original order.
          var tips = scope_Handles.map(addTooltip);
          if (options.dir) {
            tips.reverse();
            options.tooltips.reverse();
          }
          bindEvent('update', function(f, o, r) {
            if (tips[o]) {
              tips[o].innerHTML = options.tooltips[o] === true ? f[o] :
                options.tooltips[o].to(r[o]);
            }
          });
        }
  
        function getGroup(mode, values, stepped) {
          // Use the range.
          if (mode === 'range' || mode === 'steps') {
            return scope_Spectrum.xVal;
          }
          if (mode === 'count') {
            // Divide 0 - 100 in 'count' parts.
            var spread = (100 / (values - 1)),
              v, i = 0;
            values = [];
            // List these parts and have them handled as 'positions'.
            while ((v = i++ * spread) <= 100) {
              values.push(v);
            }
            mode = 'positions';
          }
          if (mode === 'positions') {
            // Map all percentages to on-range values.
            return values.map(function(value) {
              return scope_Spectrum.fromStepping(stepped ?
                scope_Spectrum.getStep(value) : value);
            });
          }
          if (mode === 'values') {
            // If the value must be stepped, it needs to be converted to a percentage first.
            if (stepped) {
              return values.map(function(value) {
                // Convert to percentage, apply step, return to value.
                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(
                  scope_Spectrum.toStepping(value)));
              });
            }
            // Otherwise, we can simply use the values.
            return values;
          }
        }
  
        function generateSpread(density, mode, group) {
          function safeIncrement(value, increment) {
            // Avoid floating point variance by dropping the smallest decimal places.
            return (value + increment).toFixed(7) / 1;
          }
          var originalSpectrumDirection = scope_Spectrum.direction,
            indexes = {},
            firstInRange = scope_Spectrum.xVal[0],
            lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length -
              1],
            ignoreFirst = false,
            ignoreLast = false,
            prevPct = 0;
          // This function loops the spectrum in an ltr linear fashion,
          // while the toStepping method is direction aware. Trick it into
          // believing it is ltr.
          scope_Spectrum.direction = 0;
          // Create a copy of the group, sort it and filter away all duplicates.
          group = unique(group.slice().sort(function(a, b) {
            return a - b;
          }));
          // Make sure the range starts with the first element.
          if (group[0] !== firstInRange) {
            group.unshift(firstInRange);
            ignoreFirst = true;
          }
          // Likewise for the last one.
          if (group[group.length - 1] !== lastInRange) {
            group.push(lastInRange);
            ignoreLast = true;
          }
          group.forEach(function(current, index) {
            // Get the current step and the lower + upper positions.
            var step, i, q,
              low = current,
              high = group[index + 1],
              newPct, pctDifference, pctPos, type,
              steps, realSteps, stepsize;
            // When using 'steps' mode, use the provided steps.
            // Otherwise, we'll step on to the next subrange.
            if (mode === 'steps') {
              step = scope_Spectrum.xNumSteps[index];
            }
            // Default to a 'full' step.
            if (!step) {
              step = high - low;
            }
            // Low can be 0, so test for false. If high is undefined,
            // we are at the last subrange. Index 0 is already handled.
            if (low === false || high === undefined) {
              return;
            }
            // Find all steps in the subrange.
            for (i = low; i <= high; i = safeIncrement(i, step)) {
              // Get the percentage value for the current step,
              // calculate the size for the subrange.
              newPct = scope_Spectrum.toStepping(i);
              pctDifference = newPct - prevPct;
              steps = pctDifference / density;
              realSteps = Math.round(steps);
              // This ratio represents the ammount of percentage-space a point indicates.
              // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
              // Round the percentage offset to an even number, then divide by two
              // to spread the offset on both sides of the range.
              stepsize = pctDifference / realSteps;
              // Divide all points evenly, adding the correct number to this subrange.
              // Run up to <= so that 100% gets a point, event if ignoreLast is set.
              for (q = 1; q <= realSteps; q += 1) {
                // The ratio between the rounded value and the actual size might be ~1% off.
                // Correct the percentage offset by the number of points
                // per subrange. density = 1 will result in 100 points on the
                // full range, 2 for 50, 4 for 25, etc.
                pctPos = prevPct + (q * stepsize);
                indexes[pctPos.toFixed(5)] = ['x', 0];
              }
              // Determine the point type.
              type = (group.indexOf(i) > -1) ? 1 : (mode === 'steps' ?
                2 : 0);
              // Enforce the 'ignoreFirst' option by overwriting the type for 0.
              if (!index && ignoreFirst) {
                type = 0;
              }
              if (!(i === high && ignoreLast)) {
                // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                indexes[newPct.toFixed(5)] = [i, type];
              }
              // Update the percentage count.
              prevPct = newPct;
            }
          });
          // Reset the spectrum.
          scope_Spectrum.direction = originalSpectrumDirection;
          return indexes;
        }
  
        function addMarking(spread, filterFunc, formatter) {
          var style = ['horizontal', 'vertical'][options.ort],
            element = document.createElement('div'),
            out = '';
          addClass(element, cssClasses[20]);
          addClass(element, cssClasses[20] + '-' + style);
  
          function getSize(type) {
            return ['-normal', '-large', '-sub'][type];
          }
  
          function getTags(offset, source, values) {
            return 'class="' + source + ' ' + source + '-' + style + ' ' +
              source + getSize(values[1]) + '" style="' + options.style +
              ': ' + offset + '%"';
          }
  
          function addSpread(offset, values) {
              if (scope_Spectrum.direction) {
                offset = 100 - offset;
              }
              // Apply the filter function, if it is set.
              values[1] = (values[1] && filterFunc) ? filterFunc(values[0],
                values[1]) : values[1];
              // Add a marker for every point
              out += '<div ' + getTags(offset, cssClasses[21], values) +
                '></div>';
              // Values are only appended for points marked '1' or '2'.
              if (values[1]) {
                out += '<div ' + getTags(offset, cssClasses[22], values) +
                  '>' + formatter.to(values[0]) + '</div>';
              }
            }
            // Append all points.
          Object.keys(spread).forEach(function(a) {
            addSpread(a, spread[a]);
          });
          element.innerHTML = out;
          return element;
        }
  
        function pips(grid) {
            var mode = grid.mode,
              density = grid.density || 1,
              filter = grid.filter || false,
              values = grid.values || false,
              stepped = grid.stepped || false,
              group = getGroup(mode, values, stepped),
              spread = generateSpread(density, mode, group),
              format = grid.format || {
                to: Math.round
              };
            return scope_Target.appendChild(addMarking(spread, filter, format));
          }
          // Shorthand for base dimensions.
  
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect(),
              alt = 'offset' + ['Width', 'Height'][options.ort];
            return options.ort === 0 ? (rect.width || scope_Base[alt]) : (
              rect.height || scope_Base[alt]);
          }
          // External event handling
  
        function fireEvent(event, handleNumber, tap) {
            if (handleNumber !== undefined && options.handles !== 1) {
              handleNumber = Math.abs(handleNumber - options.dir);
            }
            Object.keys(scope_Events).forEach(function(targetEvent) {
              var eventType = targetEvent.split('.')[0];
              if (event === eventType) {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(
                    // Use the slider public API as the scope ('this')
                    scope_Self,
                    // Return values as array, so arg_1[arg_2] is always valid.
                    asArray(valueGet()),
                    // Handle index, 0 or 1
                    handleNumber,
                    // Unformatted slider values
                    asArray(inSliderOrder(Array.prototype.slice.call(
                      scope_Values))),
                    // Event is fired by tap, true or false
                    tap || false,
                    // Left offset of the handle, in relation to the slider
                    scope_Locations);
                });
              }
            });
          }
          // Returns the input array, respecting the slider direction configuration.
  
        function inSliderOrder(values) {
            // If only one handle is used, return a single value.
            if (values.length === 1) {
              return values[0];
            }
            if (options.dir) {
              return values.reverse();
            }
            return values;
          }
          // Handler for attaching events trough a proxy.
  
        function attach(events, element, callback, data) {
            // This function can be used to 'filter' events to the slider.
            // element is a node, not a nodeList
            var method = function(e) {
                if (scope_Target.hasAttribute('disabled')) {
                  return false;
                }
                // Stop if an active 'tap' transition is taking place.
                if (hasClass(scope_Target, cssClasses[14])) {
                  return false;
                }
                e = fixEvent(e, data.pageOffset);
                // Ignore right or middle clicks on start #454
                if (events === actions.start && e.buttons !== undefined && e.buttons >
                  1) {
                  return false;
                }
                // Ignore right or middle clicks on start #454
                if (data.hover && e.buttons) {
                  return false;
                }
                e.calcPoint = e.points[options.ort];
                // Call the event handler with the event [ and additional data ].
                callback(e, data);
              },
              methods = [];
            // Bind a closure on the target for every event type.
            events.split(' ').forEach(function(eventName) {
              element.addEventListener(eventName, method, false);
              methods.push([eventName, method]);
            });
            return methods;
          }
          // Handle movement on document for handle and range drag.
  
        function move(event, data) {
            // Fix #498
            // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
            // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
            // IE9 has .buttons and .which zero on mousemove.
            // Firefox breaks the spec MDN defines.
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons ===
              0 && data.buttonsProperty !== 0) {
              return end(event, data);
            }
            var handles = data.handles || scope_Handles,
              positions, state = false,
              proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
              handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
              i;
            // Calculate relative positions for the handles.
            positions = getPositions(proposal, data.positions, handles.length >
              1);
            state = setHandle(handles[0], positions[handleNumber], handles.length ===
              1);
            if (handles.length > 1) {
              state = setHandle(handles[1], positions[handleNumber ? 0 : 1],
                false) || state;
              if (state) {
                // fire for both handles
                for (i = 0; i < data.handles.length; i++) {
                  fireEvent('slide', i);
                }
              }
            } else if (state) {
              // Fire for a single handle
              fireEvent('slide', handleNumber);
            }
          }
          // Unbind move events on document, call callbacks.
  
        function end(event, data) {
            // The handle is no longer active, so remove the class.
            var active = scope_Base.querySelector('.' + cssClasses[15]),
              handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;
            if (active !== null) {
              removeClass(active, cssClasses[15]);
            }
            // Remove cursor styles and text-selection events bound to the body.
            if (event.cursor) {
              document.body.style.cursor = '';
              document.body.removeEventListener('selectstart', document.body.noUiListener);
            }
            var d = document.documentElement;
            // Unbind the move and end events, which are added on 'start'.
            d.noUiListeners.forEach(function(c) {
              d.removeEventListener(c[0], c[1]);
            });
            // Remove dragging class.
            removeClass(scope_Target, cssClasses[12]);
            // Fire the change and set events.
            fireEvent('set', handleNumber);
            fireEvent('change', handleNumber);
            // If this is a standard handle movement, fire the end event.
            if (data.handleNumber !== undefined) {
              fireEvent('end', data.handleNumber);
            }
          }
          // Fire 'end' when a mouse or pen leaves the document.
  
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" &&
              event.relatedTarget === null) {
              end(event, data);
            }
          }
          // Bind move events on document.
  
        function start(event, data) {
            var d = document.documentElement;
            // Mark the handle as 'active' so it can be styled.
            if (data.handles.length === 1) {
              addClass(data.handles[0].children[0], cssClasses[15]);
              // Support 'disabled' handles
              if (data.handles[0].hasAttribute('disabled')) {
                return false;
              }
            }
            // Fix #551, where a handle gets selected instead of dragged.
            event.preventDefault();
            // A drag should never propagate up to the 'tap' event.
            event.stopPropagation();
            // Attach the move and end events.
            var moveEvent = attach(actions.move, d, move, {
                start: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handles: data.handles,
                handleNumber: data.handleNumber,
                buttonsProperty: event.buttons,
                positions: [
                  scope_Locations[0],
                  scope_Locations[scope_Handles.length - 1]
                ]
              }),
              endEvent = attach(actions.end, d, end, {
                handles: data.handles,
                handleNumber: data.handleNumber
              });
            var outEvent = attach("mouseout", d, documentLeave, {
              handles: data.handles,
              handleNumber: data.handleNumber
            });
            d.noUiListeners = moveEvent.concat(endEvent, outEvent);
            // Text selection isn't an issue on touch devices,
            // so adding cursor styles can be skipped.
            if (event.cursor) {
              // Prevent the 'I' cursor and extend the range-drag cursor.
              document.body.style.cursor = getComputedStyle(event.target).cursor;
              // Mark the target with a dragging state.
              if (scope_Handles.length > 1) {
                addClass(scope_Target, cssClasses[12]);
              }
              var f = function() {
                return false;
              };
              document.body.noUiListener = f;
              // Prevent text selection when dragging the handles.
              document.body.addEventListener('selectstart', f, false);
            }
            if (data.handleNumber !== undefined) {
              fireEvent('start', data.handleNumber);
            }
          }
          // Move closest handle to tapped location.
  
        function tap(event) {
            var location = event.calcPoint,
              total = 0,
              handleNumber, to;
            // The tap event shouldn't propagate up and cause 'edge' to run.
            event.stopPropagation();
            // Add up the handle offsets.
            scope_Handles.forEach(function(a) {
              total += offset(a)[options.style];
            });
            // Find the handle closest to the tapped position.
            handleNumber = (location < total / 2 || scope_Handles.length ===
              1) ? 0 : 1;
            // Check if handler is not disablet if yes set number to the next handler
            if (scope_Handles[handleNumber].hasAttribute('disabled')) {
              handleNumber = handleNumber ? 0 : 1;
            }
            location -= offset(scope_Base)[options.style];
            // Calculate the new position.
            to = (location * 100) / baseSize();
            if (!options.events.snap) {
              // Flag the slider as it is now in a transitional state.
              // Transition takes 300 ms, so re-enable the slider afterwards.
              addClassFor(scope_Target, cssClasses[14], 300);
            }
            // Support 'disabled' handles
            if (scope_Handles[handleNumber].hasAttribute('disabled')) {
              return false;
            }
            // Find the closest handle and calculate the tapped point.
            // The set handle to the new position.
            setHandle(scope_Handles[handleNumber], to);
            fireEvent('slide', handleNumber, true);
            fireEvent('set', handleNumber, true);
            fireEvent('change', handleNumber, true);
            if (options.events.snap) {
              start(event, {
                handles: [scope_Handles[handleNumber]]
              });
            }
          }
          // Fires a 'hover' event for a hovered mouse/pen position.
  
        function hover(event) {
            var location = event.calcPoint - offset(scope_Base)[options.style],
              to = scope_Spectrum.getStep((location * 100) / baseSize()),
              value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function(targetEvent) {
              if ('hover' === targetEvent.split('.')[0]) {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(scope_Self, value);
                });
              }
            });
          }
          // Attach events to several slider parts.
  
        function events(behaviour) {
            var i, drag;
            // Attach the standard drag event to the handles.
            if (!behaviour.fixed) {
              for (i = 0; i < scope_Handles.length; i += 1) {
                // These events are only bound to the visual handle
                // element, not the 'real' origin element.
                attach(actions.start, scope_Handles[i].children[0], start, {
                  handles: [scope_Handles[i]],
                  handleNumber: i
                });
              }
            }
            // Attach the tap event to the slider base.
            if (behaviour.tap) {
              attach(actions.start, scope_Base, tap, {
                handles: scope_Handles
              });
            }
            // Fire hover events
            if (behaviour.hover) {
              attach(actions.move, scope_Base, hover, {
                hover: true
              });
              for (i = 0; i < scope_Handles.length; i += 1) {
                ['mousemove MSPointerMove pointermove'].forEach(function(
                  eventName) {
                  scope_Handles[i].children[0].addEventListener(eventName,
                    stopPropagation, false);
                });
              }
            }
            // Make the range draggable.
            if (behaviour.drag) {
              drag = [scope_Base.querySelector('.' + cssClasses[7])];
              addClass(drag[0], cssClasses[10]);
              // When the range is fixed, the entire range can
              // be dragged by the handles. The handle in the first
              // origin will propagate the start event upward,
              // but it needs to be bound manually on the other.
              if (behaviour.fixed) {
                drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)]
                  .children[0]);
              }
              drag.forEach(function(element) {
                attach(actions.start, element, start, {
                  handles: scope_Handles
                });
              });
            }
          }
          // Test suggested values and apply margin, step.
  
        function setHandle(handle, to, noLimitOption) {
            var trigger = handle !== scope_Handles[0] ? 1 : 0,
              lowerMargin = scope_Locations[0] + options.margin,
              upperMargin = scope_Locations[1] - options.margin,
              lowerLimit = scope_Locations[0] + options.limit,
              upperLimit = scope_Locations[1] - options.limit;
            // For sliders with multiple handles,
            // limit movement to the other handle.
            // Apply the margin option by adding it to the handle positions.
            if (scope_Handles.length > 1) {
              to = trigger ? Math.max(to, lowerMargin) : Math.min(to,
                upperMargin);
            }
            // The limit option has the opposite effect, limiting handles to a
            // maximum distance from another. Limit must be > 0, as otherwise
            // handles would be unmoveable. 'noLimitOption' is set to 'false'
            // for the .val() method, except for pass 4/4.
            if (noLimitOption !== false && options.limit && scope_Handles.length >
              1) {
              to = trigger ? Math.min(to, lowerLimit) : Math.max(to,
                upperLimit);
            }
            // Handle the step option.
            to = scope_Spectrum.getStep(to);
            // Limit to 0/100 for .val input, trim anything beyond 7 digits, as
            // JavaScript has some issues in its floating point implementation.
            to = limit(parseFloat(to.toFixed(7)));
            // Return false if handle can't move
            if (to === scope_Locations[trigger]) {
              return false;
            }
            // Set the handle to the new position.
            // Use requestAnimationFrame for efficient painting.
            // No significant effect in Chrome, Edge sees dramatic
            // performace improvements.
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(function() {
                handle.style[options.style] = to + '%';
              });
            } else {
              handle.style[options.style] = to + '%';
            }
            // Force proper handle stacking
            if (!handle.previousSibling) {
              removeClass(handle, cssClasses[17]);
              if (to > 50) {
                addClass(handle, cssClasses[17]);
              }
            }
            // Update locations.
            scope_Locations[trigger] = to;
            // Convert the value to the slider stepping/range.
            scope_Values[trigger] = scope_Spectrum.fromStepping(to);
            fireEvent('update', trigger);
            return true;
          }
          // Loop values from value method and apply them.
  
        function setValues(count, values) {
            var i, trigger, to;
            // With the limit option, we'll need another limiting pass.
            if (options.limit) {
              count += 1;
            }
            // If there are multiple handles to be set run the setting
            // mechanism twice for the first handle, to make sure it
            // can be bounced of the second one properly.
            for (i = 0; i < count; i += 1) {
              trigger = i % 2;
              // Get the current argument from the array.
              to = values[trigger];
              // Setting with null indicates an 'ignore'.
              // Inputting 'false' is invalid.
              if (to !== null && to !== false) {
                // If a formatted number was passed, attemt to decode it.
                if (typeof to === 'number') {
                  to = String(to);
                }
                to = options.format.from(to);
                // Request an update for all links if the value was invalid.
                // Do so too if setting the handle fails.
                if (to === false || isNaN(to) || setHandle(scope_Handles[
                  trigger], scope_Spectrum.toStepping(to), i === (3 -
                  options.dir)) === false) {
                  fireEvent('update', trigger);
                }
              }
            }
          }
          // Set the slider value.
  
        function valueSet(input) {
            var count, values = asArray(input),
              i;
            // The RTL settings is implemented by reversing the front-end,
            // internal mechanisms are the same.
            if (options.dir && options.handles > 1) {
              values.reverse();
            }
            // Animation is optional.
            // Make sure the initial values where set before using animated placement.
            if (options.animate && scope_Locations[0] !== -1) {
              addClassFor(scope_Target, cssClasses[14], 300);
            }
            // Determine how often to set the handles.
            count = scope_Handles.length > 1 ? 3 : 1;
            if (values.length === 1) {
              count = 1;
            }
            setValues(count, values);
            // Fire the 'set' event for both handles.
            for (i = 0; i < scope_Handles.length; i++) {
              // Fire the event only for handles that received a new value, as per #579
              if (values[i] !== null) {
                fireEvent('set', i);
              }
            }
          }
          // Get the slider value.
  
        function valueGet() {
            var i, retour = [];
            // Get the value from all handles.
            for (i = 0; i < options.handles; i += 1) {
              retour[i] = options.format.to(scope_Values[i]);
            }
            return inSliderOrder(retour);
          }
          // Removes classes from the root and empties it.
  
        function destroy() {
            cssClasses.forEach(function(cls) {
              if (!cls) {
                return;
              } // Ignore empty classes
              removeClass(scope_Target, cls);
            });
            while (scope_Target.firstChild) {
              scope_Target.removeChild(scope_Target.firstChild);
            }
            delete scope_Target.noUiSlider;
          }
          // Get the current step size for the slider.
  
        function getCurrentStep() {
            // Check all locations, map them to their stepping point.
            // Get the step point, then find it in the input list.
            var retour = scope_Locations.map(function(location, index) {
              var step = scope_Spectrum.getApplicableStep(location),
                // As per #391, the comparison for the decrement step can have some rounding issues.
                // Round the value to the precision used in the step.
                stepDecimals = countDecimals(String(step[2])),
                // Get the current numeric value
                value = scope_Values[index],
                // To move the slider 'one step up', the current step value needs to be added.
                // Use null if we are at the maximum slider value.
                increment = location === 100 ? null : step[2],
                // Going 'one step down' might put the slider in a different sub-range, so we
                // need to switch between the current or the previous step.
                prev = Number((value - step[2]).toFixed(stepDecimals)),
                // If the value fits the step, return the current step value. Otherwise, use the
                // previous step. Return null if the slider is at its minimum value.
                decrement = location === 0 ? null : (prev >= step[1]) ?
                step[2] : (step[0] || false);
              return [decrement, increment];
            });
            // Return values in the proper order.
            return inSliderOrder(retour);
          }
          // Attach an event to this slider, possibly including a namespace
  
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            // If the event bound is 'update,' fire it immediately for all handles.
            if (namespacedEvent.split('.')[0] === 'update') {
              scope_Handles.forEach(function(a, index) {
                fireEvent('update', index);
              });
            }
          }
          // Undo attachment of event
  
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent.split('.')[0],
              namespace = namespacedEvent.substring(event.length);
            Object.keys(scope_Events).forEach(function(bind) {
              var tEvent = bind.split('.')[0],
                tNamespace = bind.substring(tEvent.length);
              if ((!event || event === tEvent) && (!namespace ||
                namespace === tNamespace)) {
                delete scope_Events[bind];
              }
            });
          }
          // Updateable: margin, limit, step, range, animate, snap
  
        function updateOptions(optionsToUpdate) {
            var v = valueGet(),
              i, newOptions = testOptions({
                start: [0, 0],
                margin: optionsToUpdate.margin,
                limit: optionsToUpdate.limit,
                step: optionsToUpdate.step,
                range: optionsToUpdate.range,
                animate: optionsToUpdate.animate,
                snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate
                  .snap
              });
            ['margin', 'limit', 'step', 'range', 'animate'].forEach(function(
              name) {
              if (optionsToUpdate[name] !== undefined) {
                options[name] = optionsToUpdate[name];
              }
            });
            // Save current spectrum direction as testOptions in testRange call
            // doesn't rely on current direction
            newOptions.spectrum.direction = scope_Spectrum.direction;
            scope_Spectrum = newOptions.spectrum;
            // Invalidate the current positioning so valueSet forces an update.
            scope_Locations = [-1, -1];
            valueSet(v);
            for (i = 0; i < scope_Handles.length; i++) {
              fireEvent('update', i);
            }
          }
          // Throw an error if the slider was already initialized.
        if (scope_Target.noUiSlider) {
          throw new Error('Slider was already initialized.');
        }
        // Create the base element, initialise HTML and set classes.
        // Add handles and links.
        scope_Base = addSlider(options.dir, options.ort, scope_Target);
        scope_Handles = addHandles(options.handles, options.dir, scope_Base);
        // Set the connect classes.
        addConnection(options.connect, scope_Target, scope_Handles);
        if (options.pips) {
          pips(options.pips);
        }
        if (options.tooltips) {
          tooltips();
        }
        scope_Self = {
          destroy: destroy,
          steps: getCurrentStep,
          on: bindEvent,
          off: removeEvent,
          get: valueGet,
          set: valueSet,
          updateOptions: updateOptions,
          options: options, // Issue #600
          target: scope_Target, // Issue #597
          pips: pips // Issue #594
        };
        // Attach user events.
        events(options.events);
        return scope_Self;
      }
      // Run the standard initializer
  
    function initialize(target, originalOptions) {
        if (!target.nodeName) {
          throw new Error('noUiSlider.create requires a single element.');
        }
        // Test the options and create the slider environment;
        var options = testOptions(originalOptions, target),
          slider = closure(target, options);
        // Use the public value method to set the start values.
        slider.set(options.start);
        target.noUiSlider = slider;
        return slider;
      }
      // Use an object instead of a function for future expansibility;
    return {
      create: initialize
    };
  }));
  // wNumb number formatter: https://refreshless.com/wnumb/
  (function() {
    'use strict';
    var
    /** @const */
      FormatOptions = ['decimals', 'thousand', 'mark', 'prefix', 'postfix',
      'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'
    ];
    // General
    // Reverse a string
    function strReverse(a) {
        return a.split('').reverse().join('');
      }
      // Check if a string starts with a specified prefix.
  
    function strStartsWith(input, match) {
        return input.substring(0, match.length) === match;
      }
      // Check is a string ends in a specified postfix.
  
    function strEndsWith(input, match) {
        return input.slice(-1 * match.length) === match;
      }
      // Throw an error if formatting options are incompatible.
  
    function throwEqualError(F, a, b) {
        if ((F[a] || F[b]) && (F[a] === F[b])) {
          throw new Error(a);
        }
      }
      // Check if a number is finite and not NaN
  
    function isValidNumber(input) {
        return typeof input === 'number' && isFinite(input);
      }
      // Provide rounding-accurate toFixed method.
  
    function toFixed(value, decimals) {
        var scale = Math.pow(10, decimals);
        return (Math.round(value * scale) / scale).toFixed(decimals);
      }
      // Formatting
      // Accept a number as input, output formatted string.
  
    function formatTo(decimals, thousand, mark, prefix, postfix, encoder,
        decoder, negativeBefore, negative, edit, undo, input) {
        var originalInput = input,
          inputIsNegative, inputPieces, inputBase, inputDecimals = '',
          output = '';
        // Apply user encoder to the input.
        // Expected outcome: number.
        if (encoder) {
          input = encoder(input);
        }
        // Stop if no valid number was provided, the number is infinite or NaN.
        if (!isValidNumber(input)) {
          return false;
        }
        // Rounding away decimals might cause a value of -0
        // when using very small ranges. Remove those cases.
        if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
          input = 0;
        }
        // Formatting is done on absolute numbers,
        // decorated by an optional negative symbol.
        if (input < 0) {
          inputIsNegative = true;
          input = Math.abs(input);
        }
        // Reduce the number of decimals to the specified option.
        if (decimals !== false) {
          input = toFixed(input, decimals);
        }
        // Transform the number into a string, so it can be split.
        input = input.toString();
        // Break the number on the decimal separator.
        if (input.indexOf('.') !== -1) {
          inputPieces = input.split('.');
          inputBase = inputPieces[0];
          if (mark) {
            inputDecimals = mark + inputPieces[1];
          }
        } else {
          // If it isn't split, the entire number will do.
          inputBase = input;
        }
        // Group numbers in sets of three.
        if (thousand) {
          inputBase = strReverse(inputBase).match(/.{1,3}/g);
          inputBase = strReverse(inputBase.join(strReverse(thousand)));
        }
        // If the number is negative, prefix with negation symbol.
        if (inputIsNegative && negativeBefore) {
          output += negativeBefore;
        }
        // Prefix the number
        if (prefix) {
          output += prefix;
        }
        // Normal negative option comes after the prefix. Defaults to '-'.
        if (inputIsNegative && negative) {
          output += negative;
        }
        // Append the actual number.
        output += inputBase;
        output += inputDecimals;
        // Apply the postfix.
        if (postfix) {
          output += postfix;
        }
        // Run the output through a user-specified post-formatter.
        if (edit) {
          output = edit(output, originalInput);
        }
        // All done.
        return output;
      }
      // Accept a sting as input, output decoded number.
  
    function formatFrom(decimals, thousand, mark, prefix, postfix, encoder,
        decoder, negativeBefore, negative, edit, undo, input) {
        var originalInput = input,
          inputIsNegative, output = '';
        // User defined pre-decoder. Result must be a non empty string.
        if (undo) {
          input = undo(input);
        }
        // Test the input. Can't be empty.
        if (!input || typeof input !== 'string') {
          return false;
        }
        // If the string starts with the negativeBefore value: remove it.
        // Remember is was there, the number is negative.
        if (negativeBefore && strStartsWith(input, negativeBefore)) {
          input = input.replace(negativeBefore, '');
          inputIsNegative = true;
        }
        // Repeat the same procedure for the prefix.
        if (prefix && strStartsWith(input, prefix)) {
          input = input.replace(prefix, '');
        }
        // And again for negative.
        if (negative && strStartsWith(input, negative)) {
          input = input.replace(negative, '');
          inputIsNegative = true;
        }
        // Remove the postfix.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
        if (postfix && strEndsWith(input, postfix)) {
          input = input.slice(0, -1 * postfix.length);
        }
        // Remove the thousand grouping.
        if (thousand) {
          input = input.split(thousand).join('');
        }
        // Set the decimal separator back to period.
        if (mark) {
          input = input.replace(mark, '.');
        }
        // Prepend the negative symbol.
        if (inputIsNegative) {
          output += '-';
        }
        // Add the number
        output += input;
        // Trim all non-numeric characters (allow '.' and '-');
        output = output.replace(/[^0-9\.\-.]/g, '');
        // The value contains no parse-able number.
        if (output === '') {
          return false;
        }
        // Covert to number.
        output = Number(output);
        // Run the user-specified post-decoder.
        if (decoder) {
          output = decoder(output);
        }
        // Check is the output is valid, otherwise: return false.
        if (!isValidNumber(output)) {
          return false;
        }
        return output;
      }
      // Framework
      // Validate formatting options
  
    function validate(inputOptions) {
        var i, optionName, optionValue,
          filteredOptions = {};
        for (i = 0; i < FormatOptions.length; i += 1) {
          optionName = FormatOptions[i];
          optionValue = inputOptions[optionName];
          if (optionValue === undefined) {
            // Only default if negativeBefore isn't set.
            if (optionName === 'negative' && !filteredOptions.negativeBefore) {
              filteredOptions[optionName] = '-';
              // Don't set a default for mark when 'thousand' is set.
            } else if (optionName === 'mark' && filteredOptions.thousand !==
              '.') {
              filteredOptions[optionName] = '.';
            } else {
              filteredOptions[optionName] = false;
            }
            // Floating points in JS are stable up to 7 decimals.
          } else if (optionName === 'decimals') {
            if (optionValue >= 0 && optionValue < 8) {
              filteredOptions[optionName] = optionValue;
            } else {
              throw new Error(optionName);
            }
            // These options, when provided, must be functions.
          } else if (optionName === 'encoder' || optionName === 'decoder' ||
            optionName === 'edit' || optionName === 'undo') {
            if (typeof optionValue === 'function') {
              filteredOptions[optionName] = optionValue;
            } else {
              throw new Error(optionName);
            }
            // Other options are strings.
          } else {
            if (typeof optionValue === 'string') {
              filteredOptions[optionName] = optionValue;
            } else {
              throw new Error(optionName);
            }
          }
        }
        // Some values can't be extracted from a
        // string if certain combinations are present.
        throwEqualError(filteredOptions, 'mark', 'thousand');
        throwEqualError(filteredOptions, 'prefix', 'negative');
        throwEqualError(filteredOptions, 'prefix', 'negativeBefore');
        return filteredOptions;
      }
      // Pass all options as function arguments
  
    function passAll(options, method, input) {
        var i, args = [];
        // Add all options in order of FormatOptions
        for (i = 0; i < FormatOptions.length; i += 1) {
          args.push(options[FormatOptions[i]]);
        }
        // Append the input, then call the method, presenting all
        // options as arguments.
        args.push(input);
        return method.apply('', args);
      }
      /** @constructor */
  
    function wNumb(options) {
        if (!(this instanceof wNumb)) {
          return new wNumb(options);
        }
        if (typeof options !== "object") {
          return;
        }
        options = validate(options);
        // Call 'formatTo' with proper arguments.
        this.to = function(input) {
          return passAll(options, formatTo, input);
        };
        // Call 'formatFrom' with proper arguments.
        this.from = function(input) {
          return passAll(options, formatFrom, input);
        };
      }
      /** @export */
    window.wNumb = wNumb;
  }());
// Floating Icon
document.addEventListener("DOMContentLoaded", function () {
    const helpButton = document.getElementById("helpButton");
    const helpMenu = document.getElementById("helpMenu");

    // Only run this script if helpButton exists
    if (!helpButton || !helpMenu) return;

    helpButton.addEventListener("click", function () {
        helpMenu.classList.toggle("active");

        // Toggle button icon between plus and times
        if (helpMenu.classList.contains("active")) {
            helpButton.querySelector(
                ".help-button__icon--active"
            ).style.display = "block";
            helpButton.querySelector(
                ".help-button__icon--normal"
            ).style.display = "none";
        } else {
            helpButton.querySelector(
                ".help-button__icon--active"
            ).style.display = "none";
            helpButton.querySelector(
                ".help-button__icon--normal"
            ).style.display = "block";
        }

        // Add bounce effect to button
        helpButton.style.animation = "none";
        setTimeout(() => {
            helpButton.style.animation = "bounce 0.5s ease";
        }, 5);
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInside =
            helpButton.contains(event.target) ||
            helpMenu.contains(event.target);

        if (!isClickInside && helpMenu.classList.contains("active")) {
            helpMenu.classList.remove("active");
            helpButton.querySelector(
                ".help-button__icon--active"
            ).style.display = "none";
            helpButton.querySelector(
                ".help-button__icon--normal"
            ).style.display = "block";
        }
    });

    // Add animation to the button
    document.head.insertAdjacentHTML(
        "beforeend",
        `
            <style>
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                    40% {transform: translateY(-5px);}
                    60% {transform: translateY(-2px);}
                }
            </style>
        `
    );
});

// Counter
const decreaseBtn = document.querySelector('.decrease-btn');
const increaseBtn = document.querySelector('.increase-btn');
const countDisplay = document.querySelector('.count-display');

let count = 28; // Starting count

// Update display with leading zero if needed
function updateDisplay() {
    const displayText = count === 1 ? "01 Day" : `${count < 10 ? '0' + count : count} Days`;
    countDisplay.textContent = displayText;
}

decreaseBtn.addEventListener('click', () => {
    if (count > 1) {
        count--;
        updateDisplay();
    }
});

increaseBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});