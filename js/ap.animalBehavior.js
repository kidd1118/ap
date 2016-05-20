//class animal behavior
            ap.animalBehavior = function () {
                var me = this;
                    this._m = [],
                    this._dest = [],
                    this._range;

                var si = setInterval(function () {
                    for (var i in me._m) {
                        var rect = me._m[i].getRect(),
                            diffX = me._dest[i].x - rect.left,
                            diffY = me._dest[i].y - rect.top,
                            directX = diffX > 0 ? 1 : -1,
                            directY = diffY  > 0 ? 1 : -1;

                        me._m[i].setPosition(rect.left + directX, rect.top + directY * Math.abs(diffX / diffY));

                        var x1, x2, y1, y2;
                        if (directX > 0) {
                            x1 = rect.left;
                            x2 = me._dest[i].x;
                        } else {
                            x2 = rect.left;
                            x1 = me._dest[i].x;
                        }
                        if (directY > 0) {
                            y1 = rect.top;
                            y2 = me._dest[i].y;
                        } else {
                            y2 = rect.top;
                            y1 = me._dest[i].y;
                        }
                        if (x1 >= x2 && y1 >= y2) {
                            var counting = function () {
                                var x = Math.floor((Math.random() * (me._range.getSize().width - me._m[i].getWidth())));
                                var y = Math.floor((Math.random() * (me._range.getSize().height - me._m[i].getHeight())));

                                var overlay = false,
                                    diffX = x - rect.left,
                                    diffY = y - rect.top;

                                if (Math.abs(diffX) < me._m[i].getWidth() && Math.abs(diffY) < me._m[i].getHeight()) {
                                    overlay = true;
                                }

                                if (overlay) counting.call(this);
                                else set.call(this, x, y);
                            };
                            var set = function (x, y) {
                                me._dest[i] = { x: x, y: y };
                            };
                            counting.call(this);
                        }
                    }
                }, 500);
            };
            ap.animalBehavior.prototype = {
                setRange: function (r) {
                    this._range = r;
                },
                moving: function(o) {
                    if (o instanceof ap.animal) {
                        var counting = function () {
                            var x = Math.floor((Math.random() * (this._range.getSize().width - o.getWidth())));
                            var y = Math.floor((Math.random() * (this._range.getSize().height - o.getHeight())));

                            var overlay = false,
                                rect = o.getRect(),
                                diffX = x - rect.left,
                                diffY = y - rect.top;

                            if (Math.abs(diffX) < o.getWidth() && Math.abs(diffY) < o.getHeight()) {
                                overlay = true;
                            }

                            if (overlay) counting.call(this);
                            else set.call(this, x, y);
                        };
                        var set = function (x, y) {
                            this._dest.push({ x: x, y: y });
                            this._m.push(o);
                        };
                        counting.call(this);
                    }
                },
                draggable: function (o) {
                    if (o instanceof ap.animal) {
                        var x, y;
                        o.getDom().style.cursor = "pointer";
                        o.getDom().addEventListener("mousedown", function () {
                            x = event.offsetX;
                            y = event.offsetY;
                            this.style.zIndex = 99;
                            this.addEventListener("mousemove", _mousemove, true);

                        }, false);
                        o.getDom().addEventListener("mouseup", function () {
                            this.style.zIndex = 1;
                            this.removeEventListener("mousemove", _mousemove, true)

                        }, false);

                        function _mousemove() {
                            o.setPosition(Math.abs(this.offsetLeft - x + event.offsetX), Math.abs(this.offsetTop - y + event.offsetY));
                            //console.log(event.clientX, event.clientY, event.offsetX, event.offsetY);
                        };
                    }
                }
            };