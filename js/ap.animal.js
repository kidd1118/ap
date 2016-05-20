//class animal
            ap.animal = function(type, size) {

                this._position = {
                    x: 0,
                    y: 0
                };
                this._size = {
                    width: size.width || 100,
                    height: size.height || 100
                };
                this.container = document.createElement("div");
                this.container.style.position = "absolute";
                this.container.style.backgroundImage = "url(..//images//" + type + ".png)";
                this.container.style.width = this._size.width + "px";
                this.container.style.height = this._size.height + "px";
                this.container.className = "animal";
            };
            ap.animal.prototype = {
                render: function(p) {
                    if (p.appendChild) p.appendChild(this.container);
                },
                setWidth: function(w) {
                    this.container.style.width = w + "px";
                    this._size.width = w;
                },
                setHeight: function(h) {
                    this.container.style.height = h + "px";
                    this._size.height = h;
                },
                getWidth: function() {
                    return this._size.width;
                },
                getHeight: function() {
                    return this._size.height;
                },
                setPosition: function(x, y) {
                    if (x != null) {
                        this.container.style.left = x + "px";
                        this._position.x = x;
                    }
                    if (y != null) {
                        this.container.style.top = y + "px";
                        this._position.y = y;
                    }
                },
                getRect: function() {
                    return {
                        left: this._position.x,
                        top: this._position.y,
                        right: this._position.x + this._size.width,
                        bottom: this._position.y + this._size.height
                    };
                },
                getDom: function () {
                    return this.container;
                }
            };