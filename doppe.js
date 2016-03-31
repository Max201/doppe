/**
 * Drag & Drop Native JS Class
 *
 * @param element
 * @param handler
 * @param callback
 * @constructor
 */
function Doppe(element, handler, callback) {
    this.element = document.querySelector(element);
    this.element.style.position = 'fixed';
    if ( !this.element ) return;
    this.handler = this.element.querySelector(handler || element);
    this.isMoving = false;
    this.mouse = {x: 0, y: 0};
    this.mouse.start = {x: 0, y: 0};
    this.startPosition = this.elementPosition();
    this.size = {x: this.element.clientWidth, y: this.element.clientHeight};
    this.continue = null;
    this.offsetTop = 14; // Configure font-size to fix drag issue improve

    var drg = this;

    // Start drag event handler
    this.eventStart = function (e) {
        drg.startPosition = drg.elementPosition();
        drg.mouse.start = {x: e.x, y: e.y};
        drg.element.classList.add('moveable');
        drg.isMoving = true;
        drg.eventMove();
    };

    // End drag event handler
    this.eventStop = function (e) {
        drg.element.classList.remove('moveable');
        drg.isMoving = false;
    };

    // user callback for moving event
    this.eventMoving = callback || function() {};

    // Mouse move event
    this.eventMove = function () {
        drg.render();
        if ( drg.isMoving ) {
            requestAnimationFrame(drg.eventMove);
        }
    };

    // Events listening
    this.handler.addEventListener('mousedown', this.eventStart);
    this.handler.addEventListener('mouseup', this.eventStop);

    this.element.addEventListener('mouseup', this.eventStop);

    // Stop & Continue
    this.element.addEventListener('mouseover', function(){
        clearTimeout(drg.continue);
    });
    this.element.addEventListener('mouseleave', function() {
        drg.continue = setTimeout(drg.eventStop, 200);
    });

    // Mouse position update
    document.addEventListener('mousemove', function(m) {
        drg.mouse.x = m.x;
        drg.mouse.y = m.y;
    })
}

Doppe.prototype.set = function(key, val) {
    if ( this.hasOwnProperty(key) ) {
        this[key] = val;
        return;
    }

    throw new Error('Property ' + key + ' does not exists');
};

Doppe.prototype.render = function () {
    var offset = this.getOffset();
    var moveto = {
        x: this.mouse.x - offset.x,
        y: this.mouse.y - offset.y - this.offsetTop
    };

    this.setPosition(moveto.x, moveto.y);
    this.eventMoving({
        element: this.element,
        handler: this.handler,
        target: moveto
    });
};

Doppe.prototype.setPosition = function (x, y) {
    var pos = this.filterPosition(x, y);
    this.element.style.left = pos.x + 'px';
    this.element.style.top = pos.y + 'px';
};

Doppe.prototype.getOffset = function () {
    return {
        x: this.mouse.start.x - this.startPosition.x,
        y: this.mouse.start.y - this.startPosition.y
    };
};

Doppe.prototype.elementPosition = function () {
    return {
        x: this.element.offsetLeft,
        y: this.element.offsetTop
    }
};

Doppe.prototype.filterPosition = function (x, y) {
    var body = document.getElementsByTagName('body')[0];
    var mw = body.clientWidth - this.size.x, mh = body.clientHeight;
    if ( x > mw ) {
        x = mw;
    }

    if ( x < 0 ) {
        x = 0;
    }

    if ( y > mh ) {
        y = mh;
    }

    if ( y < 0 ) {
        y = 0;
    }

    return {
        x: x,
        y: y
    }
};