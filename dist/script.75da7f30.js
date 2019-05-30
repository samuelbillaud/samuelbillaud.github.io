// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"script.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var home = document.querySelector('.accueil');
  var homeLink = document.querySelector('.accueil a');
  var menuItems = document.querySelectorAll('nav ul li a');
  var elementToScroll = [homeLink].concat(_toConsumableArray(menuItems));

  var sections = _toConsumableArray(document.querySelectorAll('.wrapper section'));

  var homeParallax = document.querySelector('.accueilparallax');
  var aboutSkills = document.querySelector('.aproposcompetences');
  var header = document.querySelector('header');
  elementToScroll.forEach(function (element) {
    var anchorName = element.getAttribute("data-menuanchor");
    element.addEventListener('click', function (event) {
      event.preventDefault();
      document.querySelector("section[data-anchor=\"".concat(anchorName, "\"]")).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });
  }); //FIN SCROLL PAGE
  // DEBUT BOUTON-MENU SMARTPHONE

  var buttonMenu = document.querySelector('.bouton-menu');
  var menuContainer = document.querySelector('.menu');
  buttonMenu.addEventListener('click', function () {
    buttonMenu.classList.toggle('croix');
    menuContainer.classList.toggle('menu-phone');
    menuContainer.style.height = "".concat(window.innerHeight, "px");
  });
  menuItems.forEach(function (element) {
    element.addEventListener('click', function () {
      if (menuContainer.classList.contains('menu-phone')) {
        buttonMenu.classList.toggle('croix');
        menuContainer.classList.toggle('menu-phone');
      }
    });
  }); //FIN BOUTON-MENU SMARTPHONE
  //DEBUT PARALLAX SECTION ACCUEIL

  var parallaxHome = function parallaxHome() {
    var scrollYPosition = window.scrollY;
    home.style.backgroundPosition = "40%" - "".concat(scrollYPosition / 4, "px");
    document.querySelector('.presentation').style.opacity = 1 - scrollYPosition / 200;
  }; //FIN PARALLAX SECTION ACCUEIL
  //DEBUT COMPETENCES


  var loadSkills = function loadSkills() {
    document.querySelectorAll('.barres .barre span').forEach(function (element) {
      element.style.width = "".concat(document.querySelector('.barres').offsetWidth, "px");
    });
    document.querySelectorAll('.barres').forEach(function (element) {
      var percentage = parseFloat(element.getAttribute('data-pourcentage'));
      element.querySelector('.positive').style.width = "".concat(percentage, "%");
      element.querySelector('.negative').style.width = "".concat(100 - percentage, "%");
    });
  }; //FIN COMPETENCES
  //DEBUT HAUTEUR REALISATIONS


  var displayHeight = function displayHeight() {
    var percentage = 69.6;
    var visualProject = document.querySelectorAll('.visuel-projet');
    var listProject = document.querySelectorAll('.realisations ul li');
    var height = visualProject[0].offsetWidth * percentage / 100;
    visualProject.forEach(function (element) {
      return element.style.height = "".concat(height, "px");
    });
    listProject.forEach(function (element) {
      return element.style.height = "".concat(height, "px");
    });
  }; //FIN HAUTEUR REALISATIONS
  // DEBUT METTRE UNE SECTION ACTIVE


  var isActivedSection = function isActivedSection(element) {
    return element.classList.contains('active');
  };

  var getTopPosition = function getTopPosition(element) {
    return element.offsetTop;
  };

  var getBottomPosition = function getBottomPosition(element) {
    return getTopPosition(element) + element.offsetHeight;
  };

  var getAllPosition = function getAllPosition(element) {
    return {
      top: getTopPosition(element),
      bottom: getBottomPosition(element)
    };
  };

  var sectionsPositions = sections.map(function (element) {
    return getAllPosition(element);
  });

  var getSelectedSectionIndex = function getSelectedSectionIndex() {
    return sectionsPositions.findIndex(function (element) {
      return window.scrollY >= element.top && window.scrollY < element.bottom;
    });
  };

  var activeSection = function activeSection(index) {
    var activeElement = _toConsumableArray(menuItems).find(function (element) {
      return element.classList.contains('active');
    });

    var elementToActivate = _toConsumableArray(menuItems)[index];

    if (!isActivedSection(elementToActivate)) {
      activeElement.classList.remove('active');
      elementToActivate.classList.add('active');
    }
  }; // DEBUT METTRE UNE SECTION ACTIVE
  //DEBUT MENU ORDI/TABLETTE


  var getPositionMenu = function getPositionMenu() {
    return home.offsetTop + home.offsetHeight > window.scrollY ? 'absolute' : 'fixed';
  };

  var positionMenu = function positionMenu() {
    var className = "position-".concat(getPositionMenu(), "-menu");

    if (!header.classList.contains(className)) {
      var _header$classList;

      (_header$classList = header.classList).remove.apply(_header$classList, _toConsumableArray(header.classList));

      header.classList.add(className);
    }
  }; //FIN MENU ORDI/TABLETTE


  displayHeight();
  window.addEventListener('scroll', function () {
    activeSection(getSelectedSectionIndex());
    positionMenu();
    if (isActivedSection(homeParallax)) parallaxHome();
    if (isActivedSection(aboutSkills)) loadSkills();
  });
});
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64758" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.map