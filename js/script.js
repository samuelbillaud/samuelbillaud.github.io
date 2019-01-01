$(document).ready(function() {
    const home = document.querySelector('.accueil');
    const homeLink = document.querySelector('.accueil a');
    const menuItems = document.querySelectorAll('nav ul li a');
    const elementToScroll = [homeLink, ...menuItems];

    elementToScroll.forEach(element => {
        const anchorName = element.getAttribute("data-menuanchor");
        element.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(`section[data-anchor="${anchorName}"]`)
                .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        });
    });
	//FIN SCROLL PAGE

    // DEBUT BOUTON-MENU SMARTPHONE
    const buttonMenu = document.querySelector('.bouton-menu');
    const menuContainer = document.querySelector('.menu');

    buttonMenu.addEventListener('click', () => {
        buttonMenu.classList.toggle('croix');
        menuContainer.classList.toggle('menu-phone');
        menuContainer.style.height = `${window.innerHeight}px`;
    });

    menuItems.forEach(element => {
        element.addEventListener('click', () => {
            if (menuContainer.classList.contains('menu-phone')) {
                buttonMenu.classList.toggle('croix');
                menuContainer.classList.toggle('menu-phone');
            }
        });
    });
    //FIN BOUTON-MENU SMARTPHONE

	//DEBUT PARALLAX SECTION ACCUEIL
	const parallaxHome = () => {
        const scrollYPosition = window.scrollY;
        home.style.backgroundPosition = `40%` - `${scrollYPosition / 4}px`;
        document.querySelector('.presentation').style.opacity = 1 - (scrollYPosition / 200);
    }
    //FIN PARALLAX SECTION ACCUEIL

	//DEBUT HAUTEUR REALISATIONS
    const displayHeight = () => {
        const percentage = 69.6;
        const visualProject = document.querySelector('.visuel-projet');
        const listProject = document.querySelectorAll('.realisations ul li');
        const height = (visualProject.offsetWidth * percentage) / 100;
        visualProject.style.height = `${height}px`;
        listProject.forEach(element => element.style.height = `${height}px`);
    }
    //FIN HAUTEUR REALISATIONS
    

	//DEBUT MENU ORDI/TABLETTE
	function positionMenu() {
		positionFenetre = $(window).scrollTop();
		bottomOfOpening = $('.accueil').position().top + $('.accueil').height();
		windowHeight = $(window).height();
		compareWindowHeight = ( windowHeight - 70 ) + "px";
		header = $('header');

		if (bottomOfOpening > positionFenetre) {
			header.css({
				'display' : 'none',
				'position' : 'absolute',
				'top' : '100%',
				'left' : '0'
			});
		} else {
			header.css({
				'display' : 'block',
				'position' : 'fixed',
				'top' : '0',
				'left' : '0'
			});
		}
	}
	//FIN MENU ORDI/TABLETTE

	$(window).scroll(function() {
		var aproposcompetences = $(".aproposcompetences");
		var accueilparallax = $(".accueilparallax");
        displayHeight();
		positionMenu();

		if(accueilparallax.hasClass("active")) {
            parallaxHome();
		}
	});
});