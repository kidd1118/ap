//class fence
            ap.fence = function() {

                this._position = {
                    x: 0,
                    y: 0
                };
                this._size = {
                    width: 800,
                    height: 600,
                    ratio: 4 / 3
                };
                this._time = {
                    interval: 10,
                    total: 120
                }; //sec
                this._animalType = [0/*, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11*/];
                this._animalSize = {
                    width: 100,
                    height: 100
                };
                this._animals = [];

                this.container = document.createElement("div");
                this.container.style.position = "absolute";
                this.container.className = "fence";

                this._animalBehavior = new ap.animalBehavior();
                this._animalBehavior.setRange(this);
            };
            ap.fence.prototype = {
                render: function(p) {
                    if (p.appendChild) p.appendChild(this.container);
                },
                getSize: function () {
                    return this._size;
                },
                setWidth: function(w) {
                    var ratio = w / this._size.width;
                    this.container.style.width = w + "px";
                    this._size.width = w;
                    if (ratio != 1) {
                        for (var i in this._animals) {
                            this._animals[i].setPosition(this._animals[i].getRect().left * ratio, null);
                            this._animals[i].setWidth(this._animals[i].getWidth() * ratio);
                        }
                    }
                },
                setHeight: function(h) {
                    var ratio = h / this._size.height;
                    this.container.style.height = h + "px";
                    this._size.height = h;
                    if (ratio != 1) {
                        for (var i in this._animals) {
                            this._animals[i].setPosition(null, this._animals[i].getRect().top * ratio);
                            this._animals[i].setHeight(this._animals[i].getHeight() * ratio);
                        }
                    }
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
                setAnimalSize: function (s) {
                    this._animalSize = s;
                },
                getRect: function() {
                    return {
                        left: this._position.x,
                        top: this._position.y,
                        right: this._position.x + this._size.width,
                        bottom: this._position.y + this._size.height
                    };
                },
                open: function(sec) {
                    var me = this,
                        tmp = this._animalType.reverse();
                    this._time.total = sec;
                    var si = setInterval(function() {
                        if (me._time.total % me._time.interval == 0 && tmp.length) {
                            var type = tmp.pop();
                            me.put(type);
                        }
                        me._time.total--;
                        if (me._time.total < 0) clearInterval(si);
                    }, 1000);
                },
                put: function(type) {
                    var animal = new ap.animal(type, this._animalSize);
                    animal.render(this.container);

                    var counting = function () {
                        var x = Math.floor((Math.random() * (this._size.width - animal.getWidth())));
                        var y = Math.floor((Math.random() * (this._size.height - animal.getHeight())));

                        var overlay = false;

                        for (var i in this._animals) {
                            var diffX = x - this._animals[i].getRect().left,
                                diffY = y - this._animals[i].getRect().top;
                            if (Math.abs(diffX) < this._animals[i].getWidth() && Math.abs(diffY) < this._animals[i].getHeight()) {
                                overlay = true;
                                break;
                            }
                        }
                        if (overlay) counting.call(this);
                        else set.call(this, x, y);
                    };
                    var set = function (x, y) {
                        animal.setPosition(x, y);
                        this._animalBehavior.draggable(animal);
                        this._animalBehavior.moving(animal);
                        this._animals.push(animal);
                    };
                    counting.call(this);
                },
                refresh: function() {
                    if (this._size.width) {
                        this.setPosition(window.innerWidth / 2 - this._size.width / 2, 0);
                        this.setHeight(this._size.width / this._size.ratio);
                    }
                }
            };