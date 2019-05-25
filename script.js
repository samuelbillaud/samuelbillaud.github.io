document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector('.accueil');
    const homeLink = document.querySelector('.accueil a');
    const menuItems = document.querySelectorAll('nav ul li a');
    const elementToScroll = [homeLink, ...menuItems];

    const sections = [...document.querySelectorAll('.wrapper section')];
    const homeParallax = document.querySelector('.accueilparallax');
    const aboutSkills = document.querySelector('.aproposcompetences');
    const header = document.querySelector('header');

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

    //DEBUT COMPETENCES
    const loadSkills = () => {
        document.querySelectorAll('.barres .barre span').forEach(element => {
            element.style.width = `${document.querySelector('.barres').offsetWidth}px`;
        });

        document.querySelectorAll('.barres').forEach(element => {
            const percentage = parseFloat(element.getAttribute('data-pourcentage'));
            element.querySelector('.positive').style.width = `${percentage}%`;
            element.querySelector('.negative').style.width = `${100 - percentage}%`;
        });
    }
    //FIN COMPETENCES

	//DEBUT HAUTEUR REALISATIONS
    const displayHeight = () => {
        const percentage = 69.6;
        const visualProject = document.querySelectorAll('.visuel-projet');
        const listProject = document.querySelectorAll('.realisations ul li');

        const height = (visualProject[0].offsetWidth * percentage) / 100;
        visualProject.forEach(element => element.style.height = `${height}px`);
        listProject.forEach(element => element.style.height = `${height}px`);
    }
    //FIN HAUTEUR REALISATIONS

    // DEBUT METTRE UNE SECTION ACTIVE
    const isActivedSection = element => element.classList.contains('active');

    const getTopPosition = element => element.offsetTop;
    const getBottomPosition = element => getTopPosition(element) + element.offsetHeight;

    const getAllPosition = element => ({
        top: getTopPosition(element),
        bottom: getBottomPosition(element),
    });

    const sectionsPositions = sections
        .map(element => getAllPosition(element));

    const getSelectedSectionIndex = () => sectionsPositions.findIndex(element =>
        (window.scrollY >= element.top) && (window.scrollY < element.bottom));

    const activeSection = index => {
        const activeElement = [...menuItems].find(element => element.classList.contains('active'));
        const elementToActivate = [...menuItems][index];
        if (!isActivedSection(elementToActivate)) {
            activeElement.classList.remove('active');
            elementToActivate.classList.add('active');
        }
    }
    // DEBUT METTRE UNE SECTION ACTIVE

	//DEBUT MENU ORDI/TABLETTE
    const getPositionMenu = () => (
        (home.offsetTop + home.offsetHeight) > window.scrollY
            ? 'absolute'
            : 'fixed'
    );

    const positionMenu = () => {
        const className = `position-${getPositionMenu()}-menu`;
        if (!header.classList.contains(className)) {
            header.classList.remove(...header.classList);
            header.classList.add(className);
        }
    };
	//FIN MENU ORDI/TABLETTE

    displayHeight();

    window.addEventListener('scroll', () => {
        activeSection(getSelectedSectionIndex());
        positionMenu();

        if (isActivedSection(homeParallax)) parallaxHome();
        if (isActivedSection(aboutSkills)) loadSkills();
    });
});