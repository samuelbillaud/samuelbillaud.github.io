$(document).ready(function() {
    const home = document.querySelector('.accueil a');
    const menuItems = document.querySelectorAll('nav ul li a');
    const elementToScroll = [home, ...menuItems];

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
	function parallaxAccueil() {
		var positionScroll = $(this).scrollTop();
		$('.accueil').css({
			'background-position':'40%' - (positionScroll/4)+"px"
		});

		$('.presentation').css({
			'opacity': 1-(positionScroll/200)
		});
	}
	//FIN PARALLAX SECTION ACCUEIL

	//DEBUT HAUTEUR REALISATIONS
	function appliquerHauteur() {
		var visuelProjet = $(".visuel-projet");
		var listeProjet = $(".realisations ul li");
		var largeur = $(visuelProjet).width(); //recuperer la largeur de la div visuel-projet grace a la class

		var pourcentage = 69.6;
		var hauteur = (largeur * pourcentage) / 100; //calculer la hauteur par rapport a la largeur : 69.6%	
		
		visuelProjet.css({ //appliquer cette hauteur sur l element
			'height': hauteur + "px"
		});
		listeProjet.css({
			'height': hauteur + "px"
		});
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
		
		appliquerHauteur();
		positionMenu();

		if(accueilparallax.hasClass("active")) {
			parallaxAccueil();
		}
	});
});