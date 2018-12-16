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
	hauteurSection = $(window).height();
	hauteurHeader = $('header').height();
	
	$(".bouton-menu").click(function() {
		
		$(this).toggleClass("croix"); //le bouton menu prend la class "croix" si il ne l'a pas, l'enleve si il l'a
		$("nav").toggleClass("menu-phone"); ////la liste prend la class "menu-phone" si elle ne l'a pas, l'enleve si elle l'a
		$("nav").css({
			'height' : hauteurSection + "px"
		});
		$("nav").animate({ //le menu apparait avec un mouvement descendant ou inversement quand il disparait
							width: "toggle"
							}, 350, function() {
							// Animation complete.
		});
	});
	
	$("nav ul li a").click(function() {
		if ($("nav").hasClass("menu-phone")) { //si la liste a la classe menu-phone cela veut dire que le menu est en mode smartphone et donc qu'il faut le faire disparaitre en cliquant sur le lien d'une section, sinon c'est qu'il est en mode ordinateur et dans ce cas il ne bouge pas lorsque l'on clique sur un lien
			$(".bouton-menu").toggleClass("croix");
			$("nav").animate({ // le menu disparait en remontant
								width: "hide"
								}, 350, function() {
								// Animation complete.
			});
			$("nav").removeClass("menu-phone");
		}
	});
	//FIN BOUTON-MENU SMARTPHONE

	//DEBUT SLIDER REALISATIONS
	var largeur_li = $(".visuel-projet-img ul li").width;

	function slider_realisations() {
		$(".visuel-projet-img ul").each(function(i) {
			$(this).animate({
				left: - largeur_li
			}, 300, function () {
				$(this).find('li:first-child').appendTo(this);
				$(this).css('left', '');
			});
		});
	}
	setInterval(slider_realisations, 5000);
	//FIN SLIDER REALISATIONS

	//DEBUT COMPETENCES
		//CALCUL POUR QUE LA LARGEUR DES SPAN SOIT EGALE A LA LARGEUR DE L'ELEMENT BARRES
	var largeur_barres = $(".barres").css("width");
	
	var largeur_span = $(".barres .barre span");
	largeur_span.css({
		'width' : largeur_barres
	});
		//FIN

		//CALCUL POUR QUE LA LARGEUR DES ELEMENTS BARRE POSITIVE ET NEGATIVE SOIT CALCULÉS EN FONCTION DU POURCENTAGE DE CHAQUES COMPETENCES
	var competencechargee = true;

	$(this).find(".barre.positive").css({
		'width' : 0 + '%'
	});
	$(this).find(".barre.negative").css({
		'width' : ('100' - 0) + '%'
	});
		//FIN

		//FONCTION CHARGEMENT DES COMPETENCES
	function chargementCompetences() {
		if (competencechargee) {
			$(".barres").each(function(i) {
				var index = $(".barres").eq();
				var pourcentage = $(this).data("pourcentage");
				//console.log(pourcentage);

				$(this).find('.barre.positive').animate({
					'width' : pourcentage + '%'
				}, 4000, function() {
					//$(emplacementPourcentage).css("display", "block");	
				});
				
				$(this).find('.barre.negative').animate({
					'width' : ('100' - pourcentage) + '%'
				}, 4000, function() {
					//$(emplacementPourcentage).css("display", "block");
				});
				competencechargee = false;
			});
		}
	}
	//FIN COMPETENCES	

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
		activeSection();

		if(aproposcompetences.hasClass("active")) {
			chargementCompetences();
		}

		if(accueilparallax.hasClass("active")) {
			parallaxAccueil();
		}
	});
});

$('.wrapper').load(function() {
	/* Act on the event */
	console.log('load');
	$('.wrapper').addClass('load');
});