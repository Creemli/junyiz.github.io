(function(window, document){
  var Event = {

    add: function(elem, type, handler) {
      if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, handler);
      } else {
        elem['on' + type] = handler;
      }

    },

    remove: function(elem, type, handler) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, handler);
      } else {
        elem['on' + type] = null;
      }

    },

    getEvent: function(event) {
      return event ? event : window.event;
    },

    target: function(event) {
      return event.target || event.srcElement;
    },
    
    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },

    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },

    relatedTarget: function(event) {
      if (event.relatedTarget) {
        return event.relatedTarget;
      } else if (event.toElement) {
        return event.toElement;
      } else if (event.fromElement) {
        return event.fromElement;
      } else {
        return null;
      }
    },

    button: function(event) {
      if (document.implementation.hasFeture('MouseEvents', '2.0')) {
        return event.button;
      } else {
        switch(event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            return 0;
          case 2:
          case 6:
            return 2;
          case 4:
            return 1;
        }
      }
    },

    wheelDelta: function(event) {
      if (event.wheelDelta) {
        return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
      } else {
        return -event.detail * 40;
      }
    },

    charCode: function(event) {
      if (typeof event.charCode == 'number') {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    }

  }

})(window, document);
