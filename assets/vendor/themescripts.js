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
                nav: true,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    768: { items: 3 },
                    1024: { items: 5 }
                }
            });
        }

        // Blog Carousel
        if ($('#blog-carousel').length) {
            $('#blog-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });
        }

        // Offers Carousel
        if ($('#offer-carousel').length) {
            $('#offer-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });
        }

        // Popular Products Carousel
        if ($('#popular-carousel').length) {
            $('#popular-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });
        }

        // New Product Carousel
        if ($('#newproduct-carousel').length) {
            $('#newproduct-carousel').owlCarousel({
                loop: true,
                margin: 15,
                nav: false,
                dots: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1024: { items: 4 }
                }
            });
        }
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
    if (document.getElementById("newproduct")) {
        fetch("components/newproduct-section.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("newproduct").innerHTML = data;
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



});