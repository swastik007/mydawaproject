// $(document).ready(function() {
//     // Toggle dropdown when clicking "Shop by Category"
//     $('.category-toggle').on('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation(); // Prevents click from bubbling to document

//         let dropdownMenu = $(this).siblings('.category-menu');

//         console.log("Dropdown Clicked"); // Debugging

//         // Close other dropdowns before opening the current one
//         $('.category-menu').not(dropdownMenu).removeClass('show-menu');

//         // Toggle class to show/hide the dropdown
//         if (dropdownMenu.hasClass('show-menu')) {
//             console.log("Hiding dropdown");
//             dropdownMenu.removeClass('show-menu');
//             $(this).attr('aria-expanded', 'false');
//         } else {
//             console.log("Showing dropdown");
//             dropdownMenu.addClass('show-menu');
//             $(this).attr('aria-expanded', 'true');
//         }
//     });

//     // Close dropdown when clicking outside (Use `mousedown` instead of `click`)
//     $(document).on('mousedown', function(e) {
//         if (!$(e.target).closest('.category-dropdown').length) {
//             console.log("Clicked outside, closing dropdown");
//             $('.category-menu').removeClass('show-menu');
//             $('.category-toggle').attr('aria-expanded', 'false');
//         }
//     });

//     // Close dropdown on ESC key press
//     $(document).on('keydown', function(e) {
//         if (e.key === 'Escape') {
//             console.log("ESC pressed, closing dropdown");
//             $('.category-menu').removeClass('show-menu');
//             $('.category-toggle').attr('aria-expanded', 'false');
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function() {

    // Function to initialize carousels
    function initializeCarousels() {
        // Hompage Carousel
        if ($('#homepage-carousel').length) {
            $('#homepage-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                dots: true,
                items: 1,
            });
        }
        // Category Carousel
        if ($('#category-carousel').length) {
            $('#category-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                dots: false,
                responsive: {
                    0: { items: 1 },
                    400: { items: 2.8 },
                    768: { items: 3 },
                    1024: { items: 5 },
                    1920: { items: 7 },
                }
            });
        }

        // Blog Carousel
        if ($('#blog-carousel').length) {
            $('#blog-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: true,
                dots: false,
                navText: ['<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>', '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'], // Customize text/icons
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });

            // Custom navigation functionality
            $('.prev-btn').click(function() {
                offerCarousel.trigger('prev.owl.carousel');
            });

            $('.next-btn').click(function() {
                offerCarousel.trigger('next.owl.carousel');
            });
        }

        // Offers Carousel
        if ($('#offer-carousel').length) {
            var offerCarousel = $('#offer-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: true,
                dots: false,
                navText: ['<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>', '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'], // Customize text/icons
                responsive: {
                    0: { items: 1 },
                    400: { items: 2 },
                    768: { items: 3 },
                    1024: { items: 4 }
                }
            });

            // Custom navigation functionality
            $('.prev-btn').click(function() {
                offerCarousel.trigger('prev.owl.carousel');
            });

            $('.next-btn').click(function() {
                offerCarousel.trigger('next.owl.carousel');
            });
        }

        // Popular Products Carousel
        if ($('#popular-carousel').length) {
            $('#popular-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: true,
                dots: false,
                navText: ['<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>', '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'], // Customize text/icons
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });

            // Custom navigation functionality
            $('.prev-btn').click(function() {
                offerCarousel.trigger('prev.owl.carousel');
            });

            $('.next-btn').click(function() {
                offerCarousel.trigger('next.owl.carousel');
            });
        }

        // New Products Carousel
        if ($('#newproduct-carousel').length) {
            $('#newproduct-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: true,
                dots: false,
                navText: ['<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>', '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'], // Customize text/icons
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });

            // Custom navigation functionality
            $('.prev-btn').click(function() {
                offerCarousel.trigger('prev.owl.carousel');
            });

            $('.next-btn').click(function() {
                offerCarousel.trigger('next.owl.carousel');
            });
        }


    }
    /* wishlist page carousel */
    if ($('#wishlist-carousel').length) {
        console.log('hello 202');
        $("#wishlist-carousel").owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            dots: false,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 },
            },
            navText: [
                "<i class='bi bi-chevron-left'></i>",
                "<i class='bi bi-chevron-right'></i>",
            ],
        });
    }
    // Popular product by category Carousel
    if ($('#popularproductbycat-carousel').length) {
        $('#popularproductbycat-carousel').owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            dots: false,
            navText: ['<span aria-label="Previous"><i class="bi bi-chevron-left"></i></span>', '<span aria-label="Next"><i class="bi bi-chevron-right"></i></span>'], // Customize text/icons
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 4 }
            }
        });

    }

    // Load Header
    if (document.getElementById("header")) {
        fetch("components/header.html")
            .then(response => response.text())
            .then(data => document.getElementById("header").innerHTML = data);
    }

    // Load Footer
    if (document.getElementById("footer")) {
        fetch("components/footer.html")
            .then(response => response.text())
            .then(data => document.getElementById("footer").innerHTML = data);
    }
    // Home Slider Section
    if (document.getElementById("homeslider")) {
        fetch("components/home-slider.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("homeslider").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // Category Slider Section
    if (document.getElementById("cat-slider")) {
        fetch("components/category-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("cat-slider").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // Load Offer Section
    if (document.getElementById("offersection")) {
        fetch("components/offer-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("offersection").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // New product Section
    if (document.getElementById("new-product")) {
        fetch("components/newproduct-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("new-product").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // New product Section
    if (document.getElementById("popularproducts")) {
        fetch("components/popularproduct-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("popularproducts").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }


    // New product Section
    if (document.getElementById("featuresection")) {
        fetch("components/feature-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("featuresection").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // Promotional Section
    if (document.getElementById("promotionsection")) {
        fetch("components/promotion-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("promotionsection").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // Load Blog Section
    if (document.getElementById("blogsection")) {
        fetch("components/blog-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("blogsection").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

    // Load Symptoms Section
    if (document.getElementById("symptomsection")) {
        fetch("components/symptoms-section.html")
            .then(response => response.text())
            .then(data => document.getElementById("symptomsection").innerHTML = data);
    }

    // Header Searchbar result
    if (document.getElementById("headersearchpopup")) {
        fetch("components/headersearch.html")
            .then(response => response.text())
            .then(data => document.getElementById("headersearchpopup").innerHTML = data);
    }

    // Header searchbar suggestion
    if (document.getElementById("headersearchsuggest")) {
        fetch("components/headersearchsuggestion.html")
            .then(response => response.text())
            .then(data => document.getElementById("headersearchsuggest").innerHTML = data);
    }

    // New product Section
    if (document.getElementById("popularproductbycat")) {
        fetch("components/popularproductbycat.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("popularproductbycat").innerHTML = data;
                initializeCarousels(); // Initialize carousel after loading
            });
    }

});


$(document).ready(function() {
    console.log('wishlistpopup');
    const $privateWishlistBtn = $("#private-wishlist-btn");
    const $privateWishlistPopup = $("#private-wishlist-popup");
    const $closePopupBtn = $("#close-popup-btn");
    const $pinBoxes = $(".pin-box");

    // Show the popup
    $privateWishlistBtn.on("click", function() {
        $privateWishlistPopup.removeClass("hidden"); // Show popup
    });

    // Hide the popup
    $closePopupBtn.on("click", function() {
        $privateWishlistPopup.addClass("hidden"); // Hide popup
    });

    // Close popup when clicking outside the content
    $privateWishlistPopup.on("click", function(e) {
        if ($(e.target).is($privateWishlistPopup)) {
            $privateWishlistPopup.addClass("hidden"); // Hide popup
        }
    });

    // Handle auto-focus for PIN input fields
    $pinBoxes.on("input", function() {
        const currentIndex = $pinBoxes.index(this);
        if ($(this).val() && currentIndex < $pinBoxes.length - 1) {
            $pinBoxes.eq(currentIndex + 1).focus();
        }
    });

    $pinBoxes.on("keydown", function(e) {
        const currentIndex = $pinBoxes.index(this);
        if (e.key === "Backspace" && !$(this).val() && currentIndex > 0) {
            $pinBoxes.eq(currentIndex - 1).focus();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".faq-menu-item");
    const sections = document.querySelectorAll(".faq-section");

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Remove active class from all menu items
            menuItems.forEach((menu) => menu.classList.remove("active"));
            // Hide all sections
            sections.forEach((section) => section.classList.add("hidden"));

            // Activate the clicked menu item
            item.classList.add("active");
            // Show the corresponding section
            const target = item.getAttribute("data-target");
            document.getElementById(target).classList.remove("hidden");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const answerId = question.getAttribute("data-toggle");
            const answer = document.getElementById(answerId);

            // Toggle the visibility of the answer
            if (answer.classList.contains("hidden")) {
                answer.classList.remove("hidden");
                question.classList.add("open");
            } else {
                answer.classList.add("hidden");
                question.classList.remove("open");
            }
        });
    });
});

$(document).ready(function() {
    const $carousel = $(".healthsteps-container");

    // Initialize Owl Carousel for mobile screens
    function checkCarousel() {
        if ($(window).width() < 1200) {
            if (!$carousel.hasClass("owl-loaded")) {
                $carousel.owlCarousel({
                    items: 1,
                    margin: 15,
                    loop: true,
                    nav: true,
                    dots: false,
                    navText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>',
                    ],
                });
            }
        } else {
            // Destroy Owl Carousel for desktop
            if ($carousel.hasClass("owl-loaded")) {
                $carousel.trigger("destroy.owl.carousel").removeClass("owl-loaded");
                $carousel.find(".owl-stage-outer").children().unwrap();
            }
        }
    }

    // Run on load
    checkCarousel();

    // Run on window resize
    $(window).resize(function() {
        checkCarousel();
    });
});

$(document).ready(function() {
    const $carousel = $(".features-list");

    function initializeCarousel() {
        if ($(window).width() < 1200) {
            if (!$carousel.hasClass("owl-loaded")) {
                $carousel.owlCarousel({
                    margin: 15,
                    loop: true,
                    nav: true,
                    dots: false,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 2 },
                        1024: { items: 4 }
                    },
                    navText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>',
                    ],
                });
            }
        } else {
            if ($carousel.hasClass("owl-loaded")) {
                $carousel.trigger("destroy.owl.carousel").removeClass("owl-loaded");
                $carousel.find(".owl-stage-outer").children().unwrap();
            }
        }
    }

    // Initialize on page load
    initializeCarousel();

    // Reinitialize on window resize
    $(window).resize(function() {
        initializeCarousel();
    });
});

$(document).ready(function() {
    const $carousel = $(".healthjourney-container");

    function initializeCarousel() {
        if ($(window).width() < 1200) {
            if (!$carousel.hasClass("owl-loaded")) {
                $carousel.owlCarousel({
                    items: 1,
                    margin: 15,
                    loop: true,
                    nav: true,
                    dots: false,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 2 }
                    },
                    navText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>',
                    ],
                });
            }
        } else {
            if ($carousel.hasClass("owl-loaded")) {
                $carousel.trigger("destroy.owl.carousel").removeClass("owl-loaded");
                $carousel.find(".owl-stage-outer").children().unwrap();
            }
        }
    }

    // Initialize on page load
    initializeCarousel();

    // Reinitialize on window resize
    $(window).resize(function() {
        initializeCarousel();
    });
});