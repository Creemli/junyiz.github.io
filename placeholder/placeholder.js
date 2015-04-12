function Placeholder(elem) {
    this.elem = elem;
    this.onAdd();
}
Placeholder.prototype.inited = false;
Placeholder.prototype.onAdd = function() {
    if ('placeholder' in document.createElement('input')) return;
    var elem = this.elem;
    var placeholder = elem.getAttribute('placeholder') || elem.getAttributeNode('placeholder').nodeValue;
    var emptyHintEl = elem.__emptyHintEl;
    if (placeholder && !emptyHintEl) {
        emptyHintEl = document.createElement('abbr');
        emptyHintEl.innerHTML = placeholder;
        emptyHintEl.className = 'placeholder';
        emptyHintEl.onclick = function(elem) {
            return function() {
                try {
                    elem.focus();
                } catch (ex) {
                }
            }
        }(elem);

        if (elem.value) {
            emptyHintEl.style.display = 'none';
        }

        elem.parentNode.insertBefore(emptyHintEl, elem);
        elem.__emptyHintEl = emptyHintEl;
    }

    if (elem.addEventListener) {
        elem.addEventListener('focus', this.onFocus, true);
        elem.addEventListener('blur', this.onBlur, true);
    } else {
        elem.attachEvent('onfocusin', this.onFocus);
        elem.attachEvent('onfocusout', this.onBlur);
    }

    if (!this.inited) {
        var css = 'abbr.placeholder {color:#999;position:absolute;padding:3px;font-size:13px;}';
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        (document.getElementsByTagName('head')[0] || document.body).appendChild(style);
        if (style.styleSheet) { //for ie
            style.styleSheet.cssText = css;
        } else {//for w3c
            style.appendChild(document.createTextNode(css));
        }
    }
}

Placeholder.prototype.onBlur = function(e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    if (!elem || elem.tagName != 'INPUT' && elem.tagName != 'TEXTAREA') return; //IE下，onfocusin会在div等元素触发
    var emptyHintEl = elem.__emptyHintEl;
    if (emptyHintEl) {
        emptyHintEl.style.display = elem.value ? 'none' : '';
    }
}

Placeholder.prototype.onFocus = function(e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    if (!elem || elem.tagName != 'INPUT' && elem.tagName != 'TEXTAREA') return; //IE下，onfocusin会在div等元素触发
    var emptyHintEl = elem.__emptyHintEl;
    if (emptyHintEl) {
        emptyHintEl.style.display = 'none';
    }
}

new Placeholder(document.getElementById('j1'));
new Placeholder(document.getElementById('j2'));
new Placeholder(document.getElementById('j3'));
new Placeholder(document.getElementById('j4'));
new Placeholder(document.getElementById('j5'));
new Placeholder(document.getElementById('j6'));
new Placeholder(document.getElementById('j7'));
