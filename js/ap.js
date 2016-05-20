//class ap
            var ap = function () {
                this._ff;
                this._timer;
            };
            ap.prototype = {
                checkOnline: function () {
                    var me = this;
                    if (typeof (navigator.onLine) != "undefined") {
                        if (navigator.onLine) {
                            if (!this._timer) this._timer = setInterval(function () { me.checkOnline(); }, 3000);
                        } else {
                            this._ff = new ap.fence();
                            this._ff.render(document.body);
                            this.detectOrientation();
                            this._ff.open(120);

                            clearInterval(this._timer);
                            this._timer = null;
                        }
                    } else {
                        alert("Browser is not support to detect online status");
                    }
                },
                //reference : https://davidwalsh.name/orientation-change
                detectOrientation: function () {
                    var mql = window.matchMedia("(orientation: portrait)");
                    if (mql.matches) {
                        if (this._ff) {
                            this._ff.setWidth(400);
                            this._ff.setAnimalSize({ width: 50, height: 50 });
                        }
                    } else {
                        if (this._ff) {
                            this._ff.setWidth(800);
                            this._ff.setAnimalSize({ width: 100, height: 100 });
                        }
                    }
                    this._ff && this._ff.refresh();
                }
            }