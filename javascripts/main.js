var le = (function () {
  var doc = document,
      navID = 'nav';

  function _events() {
    var on,
        off;

    if (doc.addEventListener) {
      on = function (e, el, handler, phase) {

        phase = phase || false;

        el.addEventListener(e, handler, phase);

        return this;
      };

      off = function (e, el, handler, phase) {

        phase = phase || false;

        el.removeEventListener(e, handler, phase);

        return this;
      };
    }

    return {
      on: on,
      off: off
    };
  }

  var el = (function () {
    // get DOM element by ID
    function getById(id) {
      if (id) {
        return doc.getElementById(id);
      }
      return this;
    }
    // get DOM children elements, only tags
    function children(el) {
      if (el) {
        return el.children;
      }
      return this;
    }
    // get DOM parent element
    function parent(el) {
      if (el) {
        return el.parentElement;
      }

      return this;
    }

    function prevSibling(el) {
      if (el){
        return el.previousElementSibling;
      }

      return this;
    }

    function nextSibling(el) {
      if (el) {
        return el.nextElementSibling;
      }

      return this;
    }
    // get all DOM siblings for select DOM element
    function siblings(el, skipEl) {
      skipEl = skipEl || el;

      var s = children(el),
          length = s.length,
          i = 0,
          arr = [];

      if (s) {
        for (; i < length; i += 1) {
          if (s[i] == skipEl) {
            continue;
          }
          arr.push(s[i]);
        }
        return arr;
      }

      return this;
    }

    // !!!
    // think about this
    // !!!
    function classHandler(type) {
      type = type || 'add';

      var classListMethods = {
        'add': doc.classList.add,
        'remove': doc.classList.remove,
        'toggle': doc.classList.toggle
      };

      return function (el, cl) {
        var i = 0,
          length = 0;

        if (el.length) {
          length = el.length;

          for (; i < length; i += 1) {
            el[i].classListMethods[type](cl);
          }
        } else {
          el.classListMethods[type](cl);
        }

        return this;
      }
    }
    // add class for DOM element
    function addClass(el, cl) {
      var i = 0,
          length = 0;

      if (el.length) {
        length = el.length;

        for (; i < length; i += 1) {
          el[i].classList.add(cl);
        }
      } else {
        el.classList.add(cl);
      }

      return this;
    }
    // remove class for DOM element
    function removeClass(el, cl) {
      var i = 0,
          length = 0;

      if (el.length) {
        length = el.length;

        for (; i < length; i += 1) {
          el[i].classList.remove(cl);
        }
      } else {
        el.classList.remove(cl);
      }

      return this;
    }
    // toggle class for DOM element
    function toggleClass(el, cl) {
      var i = 0,
          length = 0;

      if (el.length) {
        length = el.length;

        for (; i < length; i += 1) {
          el[i].classList.toggle(cl);
        }
      } else {
        el.classList.toggle(cl);
      }

      return this;
    }
    // get attributes for DOM element
    function getAttr(el, attr) {
      if (el) {
        return el.getAttribute(attr);
      }

      return this;
    }
    /**
     * pageY, pageX - the start points coordinates of document
     * clientY, clientX - the start points coordinates of window
     *
     * pageY = clientY + current vertical scroll
     * pageX = clientX + current gorizontal scroll
     */
    function getCoords(el, offset) {
      offset = offset || false;
      var box;
      if (el) {
        box = el.getBoundingClientRect();
        if (!offset) {
          return {
            top: box.top + pageYOffset, // pageY
            right: box.right + pageXOffset,
            bottom: box.bottom + pageYOffset,
            left: box.left + pageXOffset // pageX
          };
        } else {
          return {
            top: box.top, // clientY
            right: box.right,
            bottom: box.bottom,
            left: box.left // clientX
          };
        }
      }

      return this;
    }
    // pageY
    function y(el) {
      if (el) {
        return getCoords(el).top;
      }

      return this;
    }
    // pageX
    function x(el) {
      if (el) {
        return getCoords(el).left;
      }

      return this;
    }
    // clientY
    function yOffset(el) {
      if (el) {
        return getCoords(el, true).top;
      }

      return this;
    }
    // clientX
    function xOffset(el) {
      if (el) {
        return getCoords(el, true).left;
      }

      return this;
    }

    // Reveal public pointers to
    // private functions and properties

    return {
      getById: getById,
      children: children,
      parent: parent,
      prevSibling: prevSibling,
      nextSibling: nextSibling,
      siblings: siblings,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      getAttr: getAttr,
      getCoords: getCoords,
      x: x,
      y: y,
      yOffset: yOffset,
      xOffset: xOffset
    };
  })();

  function nav() {
    var nav = el.getById(navID),
        headerHeight = doc.querySelector('.header-wrap').offsetHeight;
        e = _events();

    function delegate(e) {
      var target = e.target,
          currEl,
          currElHeight;

      if (target.tagName == 'A') {
        e.preventDefault();

        var p = el.parent(target),
            pp = el.parent(p),
            href = el.getAttr(target, 'href').substr(1);

        currEl = el.getCoords(el.getById(href));
        currElHeight = currEl.bottom - currEl.top;

        el.addClass(p, 'is-active').removeClass(el.siblings(pp, p), 'is-active');

        window.scrollTo(0, currEl.top);

        console.log('currEl.top: ', currEl.top, 'currEl.bottom: ', currEl.bottom);
      }
    }

    function setNavFixed() {
      var coords = el.getCoords(nav),
          elYOffset = el.yOffset(nav, true),
          elXOffset = el.xOffset(nav, true);

      if (pageYOffset > headerHeight) {
        el.addClass(nav, 'is-fixed');
      } else {
        el.removeClass(nav, 'is-fixed');
      }

      console.log('!!!scrolled!!!', 'elYOffset: ', elYOffset, 'coords.top: ', coords.top, 'headerHeight: ', headerHeight);
    }

    e.on('click', nav, delegate);
    e.on('scroll', doc, setNavFixed);
  }

  function docLoad() {
    var e = _events(),
        DOMContentLoaded = 'DOMContentLoaded';

    function handler() {
      console.log('DOMContentLoaded');
      nav();
    }

    e.on(DOMContentLoaded, doc, handler);
  }

  function init() {
    docLoad();
  }

  return {
    init: init,
    el: el
  };
})();
