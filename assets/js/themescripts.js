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
        { id: "#homepage-carousel", options: { loop: true, margin: 10, nav: false, dots: true, items: 1 } },
        { id: "#category-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 1 }, 400: { items: 2.8 }, 768: { items: 3 }, 1024: { items: 5 }, 1920: { items: 7 } } } },
        { id: "#blog-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3.9 } } } },
        { id: "#offer-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1200: { items: 3.9 } } } },
        { id: "#popular-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1200: { items: 3.9 } } } },
        { id: "#newproduct-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2.1 }, 768: { items: 2 }, 1200: { items: 3.9 } } } },
        { id: "#popular-durex-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1200: { items: 3.9 } } } },
        { id: "#bestvalueoffers-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2.1 }, 768: { items: 2 }, 1200: { items: 3.9 } } } },
        { id: "#categoryoffers-carousel", options: { loop: true, margin: 10, nav: false, dots: false, responsive: { 0: { items: 1 }, 400: { items: 2.8 }, 768: { items: 3 }, 1024: { items: 5 }, 1920: { items: 7 } } } },
        { id: "#musthavedeals-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1200: { items: 3.9 } } } },
        { id: "#lastminutebuys-carousel", options: { loop: true, margin: 15, nav: true, dots: false, navText: getNavText(), responsive: { 0: { items: 1 }, 400: { items: 2 }, 768: { items: 3 }, 1200: { items: 3.9 } } } },
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
            const phoneInput = document.querySelector("#phoneNumber");

            if (phoneInput) {
                window.intlTelInput(phoneInput, {
                    initialCountry: "np", // Set default to Nepal
                    separateDialCode: true, // Show country code separately
                    preferredCountries: ["np", "in", "us", "gb"], // Top preferred countries
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
                });
            } else {
                console.error("❌ Phone input element not found! Ensure the input exists in the DOM.");
            }

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