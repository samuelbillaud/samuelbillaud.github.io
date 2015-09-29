$(document).ready(function() {
	//DEBUT ADRESSE MAIL
	var nameMail = 'samuel.billaud';
	var year = 1990;
	var domain = 'gmail.com';
	var adresseMail = 'mailto:' + nameMail + year + '@' + domain;
	$('.mail').attr('href', adresseMail);
	//FIN ADRESSE MAIL

	//DEBUT SCROLL PAGE 
	$(document).on('click', 'nav ul li a, .accueil a', function (e) {
		e.preventDefault();
		var nameAnchor = $(this).attr('data-menuanchor'); //obtenir la valeur de l'attribut data-menuanchor pour chaque lien du menu //exemples: accueil, apropos...
		var positionAnchor = $('section[data-anchor="'+nameAnchor+'"]').offset().top; //obtenir la position du début de chaque section grâce à l'attribut data-anchor qui est le meme que data-menuanchor // exemple: realisations, position : 1030px
		$('html, body').animate({ //se déplacer jusqu'à la section souhaitée grâce a scrollTop qui connait la position de la section souhaitée(positionAnchor)
			scrollTop: positionAnchor },
			1600, 'easeOutQuart');
		return false;
	});
	//FIN SCROLL PAGE

	//FONCTION METTRE UNE SECTION ACTIVE
	function activeSection() {
		var positionFenetre = $(window).scrollTop(); //calculer la position de la fenetre	
		if(positionFenetre >= 20) { //si la position de la fenetre est supérieur à 20px alors on compare sa taille avec la position de toute les sections
			$('.wrapper section').each(function(i) { // pour chaque section...
				if ($(this).position().top <= positionFenetre + 30) { //si la position de la section est inférieur ou égale à la taille de la fenetre
					$('nav ul li a.active').removeClass('active'); //on retire la class active du lien qui l'avait 
					$('nav ul li a').eq(i).addClass('active'); //on attribue au lien de la section (index i) dont la position était inférieur à la taille de la fenetre la class active
				}
			});
		}
		else {
			$('nav ul li a.active').removeClass('active'); //on retire la class active du lien qui l'avait			
			$('nav ul li a:first').addClass('active'); //on met la class active sur le premier lien
		}
	}

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