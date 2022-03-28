/*!
(The MIT License)

Copyright (c) 2012-2014 Marcin Warpechowski
Copyright (c) 2015 Handsoncode sp. z o.o. <hello@handsoncode.net>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Handsontable = e()
    }
}(function () {
    var e;
    return function e(t, n, o) {
        function r(a, l) {
            if (!n[a]) {
                if (!t[a]) {
                    var u = "function" == typeof require && require;
                    if (!l && u) return u(a, !0);
                    if (i) return i(a, !0);
                    if (s[a] && "undefined" != typeof window[s[a]]) return window[s[a]];
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var d = n[a] = {exports: {}};
                t[a][0].call(d.exports, function (e) {
                    var n = t[a][1][e];
                    return r(n ? n : e)
                }, d, d.exports, e, t, n, o)
            }
            return n[a].exports
        }

        for (var i = "function" == typeof require && require, s = JSON.parse('{"zeroclipboard":"ZeroClipboard","moment":"moment","numbro":"numbro","pikaday":"Pikaday"}') || {}, a = 0; a < o.length; a++) r(o[a]);
        return r
    }({
        1: [function (e, t, n) {
        }, {}],
        2: [function (e, t, n) {
            window.jQuery && !function (e) {
                e.fn.handsontable = function (e) {
                    var t, n, o, r, i, s = this.first(), a = s.data("handsontable");
                    if ("string" != typeof e) return i = e || {}, a ? a.updateSettings(i) : (a = new Handsontable.Core(s[0], i), s.data("handsontable", a), a.init()), s;
                    if (o = [], arguments.length > 1) for (t = 1, n = arguments.length; t < n; t++) o.push(arguments[t]);
                    if (a) {
                        if ("undefined" == typeof a[e]) throw new Error("Handsontable do not provide action: " + e);
                        r = a[e].apply(a, o), "destroy" === e && s.removeData()
                    }
                    return r
                }
            }(window.jQuery)
        }, {}],
        3: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableBorder: {
                    get: function () {
                        return C
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}),
                c = u.getComputedStyle, d = u.getTrimmingContainer, h = u.innerWidth, f = u.innerHeight, p = u.offset,
                m = u.outerHeight, g = u.outerWidth,
                w = (r = e("helpers/dom/event"), r && r.__esModule && r || {default: r}).stopImmediatePropagation,
                v = (i = e("helpers/browser"), i && i.__esModule && i || {default: i}).isMobileBrowser,
                y = (s = e("eventManager"), s && s.__esModule && s || {default: s}).EventManager,
                b = (a = e("cell/coords"), a && a.__esModule && a || {default: a}).WalkontableCellCoords,
                C = ((l = e("overlay/_base.js"), l && l.__esModule && l || {default: l}).WalkontableOverlay, function (e, t) {
                    t && (this.eventManager = new y(e), this.instance = e, this.wot = e, this.settings = t, this.mouseDown = !1, this.main = null, this.top = null, this.left = null, this.bottom = null, this.right = null, this.topStyle = null, this.leftStyle = null, this.bottomStyle = null, this.rightStyle = null, this.cornerDefaultStyle = {
                        width: "5px",
                        height: "5px",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "#FFF"
                    }, this.corner = null, this.cornerStyle = null, this.createBorders(t), this.registerListeners())
                });
            $traceurRuntime.createClass(C, {
                registerListeners: function () {
                    var e = this;
                    this.eventManager.addEventListener(document.body, "mousedown", function () {
                        return e.onMouseDown()
                    }), this.eventManager.addEventListener(document.body, "mouseup", function () {
                        return e.onMouseUp()
                    });
                    for (var t = this, n = function (n, o) {
                        t.eventManager.addEventListener(t.main.childNodes[n], "mouseenter", function (t) {
                            return e.onMouseEnter(t, e.main.childNodes[n])
                        })
                    }, o = 0, r = this.main.childNodes.length; o < r; o++) n(o, r)
                }, onMouseDown: function () {
                    this.mouseDown = !0
                }, onMouseUp: function () {
                    this.mouseDown = !1
                }, onMouseEnter: function (e, t) {
                    function n(e) {
                        return e.clientY < Math.floor(i.top) || (e.clientY > Math.ceil(i.top + i.height) || (e.clientX < Math.floor(i.left) || (e.clientX > Math.ceil(i.left + i.width) || void 0)))
                    }

                    function o(e) {
                        n(e) && (r.eventManager.removeEventListener(document.body, "mousemove", o), t.style.display = "block")
                    }

                    if (this.mouseDown && this.wot.getSetting("hideBorderOnMouseDownOver")) {
                        e.preventDefault(), w(e);
                        var r = this, i = t.getBoundingClientRect();
                        t.style.display = "none", this.eventManager.addEventListener(document.body, "mousemove", o)
                    }
                }, createBorders: function (e) {
                    this.main = document.createElement("div");
                    var t = ["top", "left", "bottom", "right", "corner"], n = this.main.style;
                    n.position = "absolute", n.top = 0, n.left = 0;
                    for (var o = 0; o < 5; o++) {
                        var r = t[o], i = document.createElement("div");
                        i.className = "wtBorder " + (this.settings.className || ""), this.settings[r] && this.settings[r].hide && (i.className += " hidden"), n = i.style, n.backgroundColor = this.settings[r] && this.settings[r].color ? this.settings[r].color : e.border.color, n.height = this.settings[r] && this.settings[r].width ? this.settings[r].width + "px" : e.border.width + "px", n.width = this.settings[r] && this.settings[r].width ? this.settings[r].width + "px" : e.border.width + "px", this.main.appendChild(i)
                    }
                    this.top = this.main.childNodes[0], this.left = this.main.childNodes[1], this.bottom = this.main.childNodes[2], this.right = this.main.childNodes[3], this.topStyle = this.top.style, this.leftStyle = this.left.style, this.bottomStyle = this.bottom.style, this.rightStyle = this.right.style, this.corner = this.main.childNodes[4], this.corner.className += " corner", this.cornerStyle = this.corner.style, this.cornerStyle.width = this.cornerDefaultStyle.width, this.cornerStyle.height = this.cornerDefaultStyle.height, this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(" "), v() && this.createMultipleSelectorHandles(), this.disappear(), this.wot.wtTable.bordersHolder || (this.wot.wtTable.bordersHolder = document.createElement("div"), this.wot.wtTable.bordersHolder.className = "htBorders", this.wot.wtTable.spreader.appendChild(this.wot.wtTable.bordersHolder)), this.wot.wtTable.bordersHolder.insertBefore(this.main, this.wot.wtTable.bordersHolder.firstChild)
                }, createMultipleSelectorHandles: function () {
                    this.selectionHandles = {
                        topLeft: document.createElement("DIV"),
                        topLeftHitArea: document.createElement("DIV"),
                        bottomRight: document.createElement("DIV"),
                        bottomRightHitArea: document.createElement("DIV")
                    };
                    var e = 10, t = 40;
                    this.selectionHandles.topLeft.className = "topLeftSelectionHandle", this.selectionHandles.topLeftHitArea.className = "topLeftSelectionHandle-HitArea", this.selectionHandles.bottomRight.className = "bottomRightSelectionHandle", this.selectionHandles.bottomRightHitArea.className = "bottomRightSelectionHandle-HitArea", this.selectionHandles.styles = {
                        topLeft: this.selectionHandles.topLeft.style,
                        topLeftHitArea: this.selectionHandles.topLeftHitArea.style,
                        bottomRight: this.selectionHandles.bottomRight.style,
                        bottomRightHitArea: this.selectionHandles.bottomRightHitArea.style
                    };
                    var n = {
                        position: "absolute",
                        height: t + "px",
                        width: t + "px",
                        "border-radius": parseInt(t / 1.5, 10) + "px"
                    };
                    for (var o in n) n.hasOwnProperty(o) && (this.selectionHandles.styles.bottomRightHitArea[o] = n[o], this.selectionHandles.styles.topLeftHitArea[o] = n[o]);
                    var r = {
                        position: "absolute",
                        height: e + "px",
                        width: e + "px",
                        "border-radius": parseInt(e / 1.5, 10) + "px",
                        background: "#F5F5FF",
                        border: "1px solid #4285c8"
                    };
                    for (var i in r) r.hasOwnProperty(i) && (this.selectionHandles.styles.bottomRight[i] = r[i], this.selectionHandles.styles.topLeft[i] = r[i]);
                    this.main.appendChild(this.selectionHandles.topLeft), this.main.appendChild(this.selectionHandles.bottomRight), this.main.appendChild(this.selectionHandles.topLeftHitArea), this.main.appendChild(this.selectionHandles.bottomRightHitArea)
                }, isPartRange: function (e, t) {
                    return !(!this.wot.selections.area.cellRange || e == this.wot.selections.area.cellRange.to.row && t == this.wot.selections.area.cellRange.to.col)
                }, updateMultipleSelectionHandlesPosition: function (e, t, n, o, r, i) {
                    var s = parseInt(this.selectionHandles.styles.topLeft.width, 10),
                        a = parseInt(this.selectionHandles.styles.topLeftHitArea.width, 10);
                    this.selectionHandles.styles.topLeft.top = parseInt(n - s, 10) + "px", this.selectionHandles.styles.topLeft.left = parseInt(o - s, 10) + "px", this.selectionHandles.styles.topLeftHitArea.top = parseInt(n - a / 4 * 3, 10) + "px", this.selectionHandles.styles.topLeftHitArea.left = parseInt(o - a / 4 * 3, 10) + "px", this.selectionHandles.styles.bottomRight.top = parseInt(n + i, 10) + "px", this.selectionHandles.styles.bottomRight.left = parseInt(o + r, 10) + "px", this.selectionHandles.styles.bottomRightHitArea.top = parseInt(n + i - a / 4, 10) + "px", this.selectionHandles.styles.bottomRightHitArea.left = parseInt(o + r - a / 4, 10) + "px", this.settings.border.multipleSelectionHandlesVisible && this.settings.border.multipleSelectionHandlesVisible() ? (this.selectionHandles.styles.topLeft.display = "block", this.selectionHandles.styles.topLeftHitArea.display = "block", this.isPartRange(e, t) ? (this.selectionHandles.styles.bottomRight.display = "none", this.selectionHandles.styles.bottomRightHitArea.display = "none") : (this.selectionHandles.styles.bottomRight.display = "block", this.selectionHandles.styles.bottomRightHitArea.display = "block")) : (this.selectionHandles.styles.topLeft.display = "none", this.selectionHandles.styles.bottomRight.display = "none", this.selectionHandles.styles.topLeftHitArea.display = "none", this.selectionHandles.styles.bottomRightHitArea.display = "none"), e == this.wot.wtSettings.getSetting("fixedRowsTop") || t == this.wot.wtSettings.getSetting("fixedColumnsLeft") ? (this.selectionHandles.styles.topLeft.zIndex = "9999", this.selectionHandles.styles.topLeftHitArea.zIndex = "9999") : (this.selectionHandles.styles.topLeft.zIndex = "", this.selectionHandles.styles.topLeftHitArea.zIndex = "")
                }, appear: function (e) {
                    if (!this.disabled) {
                        var t, n, o, r, i, s, a, l, u, w, y, C, _, R, M, S, E, O, T;
                        T = this.wot.wtTable.getRenderedRowsCount();
                        for (var k = 0; k < T; k++) {
                            var x = this.wot.wtTable.rowFilter.renderedToSource(k);
                            if (x >= e[0] && x <= e[2]) {
                                _ = x;
                                break
                            }
                        }
                        for (var D = T - 1; D >= 0; D--) {
                            var H = this.wot.wtTable.rowFilter.renderedToSource(D);
                            if (H >= e[0] && H <= e[2]) {
                                M = H;
                                break
                            }
                        }
                        T = this.wot.wtTable.getRenderedColumnsCount();
                        for (var A = 0; A < T; A++) {
                            var P = this.wot.wtTable.columnFilter.renderedToSource(A);
                            if (P >= e[1] && P <= e[3]) {
                                R = P;
                                break
                            }
                        }
                        for (var N = T - 1; N >= 0; N--) {
                            var L = this.wot.wtTable.columnFilter.renderedToSource(N);
                            if (L >= e[1] && L <= e[3]) {
                                S = L;
                                break
                            }
                        }
                        if (void 0 === _ || void 0 === R) return void this.disappear();
                        t = _ !== M || R !== S, n = this.wot.wtTable.getCell(new b(_, R)), o = t ? this.wot.wtTable.getCell(new b(M, S)) : n, r = p(n), i = t ? p(o) : r, s = p(this.wot.wtTable.TABLE), l = r.top, y = i.top + m(o) - l, w = r.left, C = i.left + g(o) - w, a = l - s.top - 1, u = w - s.left - 1;
                        var I = c(n);
                        parseInt(I.borderTopWidth, 10) > 0 && (a += 1, y = y > 0 ? y - 1 : 0), parseInt(I.borderLeftWidth, 10) > 0 && (u += 1, C = C > 0 ? C - 1 : 0), this.topStyle.top = a + "px", this.topStyle.left = u + "px", this.topStyle.width = C + "px", this.topStyle.display = "block", this.leftStyle.top = a + "px", this.leftStyle.left = u + "px", this.leftStyle.height = y + "px", this.leftStyle.display = "block";
                        var W = Math.floor(this.settings.border.width / 2);
                        this.bottomStyle.top = a + y - W + "px", this.bottomStyle.left = u + "px", this.bottomStyle.width = C + "px", this.bottomStyle.display = "block", this.rightStyle.top = a + "px", this.rightStyle.left = u + C - W + "px", this.rightStyle.height = y + 1 + "px", this.rightStyle.display = "block", v() || !this.hasSetting(this.settings.border.cornerVisible) || this.isPartRange(M, S) ? this.cornerStyle.display = "none" : (this.cornerStyle.top = a + y - 4 + "px", this.cornerStyle.left = u + C - 4 + "px", this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth, this.cornerStyle.width = this.cornerDefaultStyle.width, this.cornerStyle.display = "none", E = d(this.wot.wtTable.TABLE), S === this.wot.getSetting("totalColumns") - 1 && (O = o.offsetLeft + g(o) + parseInt(this.cornerDefaultStyle.width) / 2 >= h(E), O && (this.cornerStyle.left = Math.floor(u + C - 3 - parseInt(this.cornerDefaultStyle.width) / 2) + "px", this.cornerStyle.borderRightWidth = 0)), M === this.wot.getSetting("totalRows") - 1 && (O = o.offsetTop + m(o) + parseInt(this.cornerDefaultStyle.height) / 2 >= f(E), O && (this.cornerStyle.top = Math.floor(a + y - 3 - parseInt(this.cornerDefaultStyle.height) / 2) + "px", this.cornerStyle.borderBottomWidth = 0)), this.cornerStyle.display = "block"), v() && this.updateMultipleSelectionHandlesPosition(_, R, a, u, C, y)
                    }
                }, disappear: function () {
                    this.topStyle.display = "none", this.leftStyle.display = "none", this.bottomStyle.display = "none", this.rightStyle.display = "none", this.cornerStyle.display = "none", v() && (this.selectionHandles.styles.topLeft.display = "none", this.selectionHandles.styles.bottomRight.display = "none")
                }, hasSetting: function (e) {
                    return "function" == typeof e ? e() : !!e
                }
            }, {}), window.WalkontableBorder = C
        }, {
            "cell/coords": 6,
            eventManager: 42,
            "helpers/browser": 44,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "overlay/_base.js": 12
        }],
        4: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableViewportColumnsCalculator: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var o = new WeakMap, r = function (e, t, n, r, i, s, a) {
                var l = void 0 !== arguments[7] ? arguments[7] : function (e) {
                    return e
                };
                o.set(this, {
                    viewportWidth: e,
                    scrollOffset: t,
                    totalColumns: n,
                    columnWidthFn: r,
                    overrideFn: i,
                    onlyFullyVisible: s,
                    stretchingColumnWidthFn: l
                }), this.count = 0, this.startColumn = null, this.endColumn = null, this.startPosition = null, this.stretchAllRatio = 0, this.stretchLastWidth = 0, this.stretch = a, this.totalTargetWidth = 0, this.needVerifyLastColumnWidth = !0, this.stretchAllColumnsWidth = [], this.calculate()
            }, i = r;
            $traceurRuntime.createClass(r, {
                calculate: function () {
                    for (var e, t = 0, n = !0, r = [], i = o.get(this), s = i.onlyFullyVisible, a = i.overrideFn, l = i.scrollOffset, u = i.totalColumns, c = i.viewportWidth, d = 0; d < u; d++) {
                        e = this._getColumnWidth(d), t <= l && !s && (this.startColumn = d);
                        var h = l > 0 ? c + 1 : c;
                        if (t >= l && t + e <= l + h && (null == this.startColumn && (this.startColumn = d), this.endColumn = d), r.push(t), t += e, s || (this.endColumn = d), t >= l + c) {
                            n = !1;
                            break
                        }
                    }
                    if (this.endColumn === u - 1 && n) for (this.startColumn = this.endColumn; this.startColumn > 0;) {
                        var f = r[this.endColumn] + e - r[this.startColumn - 1];
                        if ((f <= c || !s) && this.startColumn--, f > c) break
                    }
                    null !== this.startColumn && a && a(this), this.startPosition = r[this.startColumn], void 0 == this.startPosition && (this.startPosition = null), null !== this.startColumn && (this.count = this.endColumn - this.startColumn + 1)
                }, refreshStretching: function (e) {
                    if ("none" !== this.stretch) {
                        this.totalTargetWidth = e;
                        for (var t = o.get(this), n = t.totalColumns, r = 0, i = 0; i < n; i++) {
                            var s = this._getColumnWidth(i), a = t.stretchingColumnWidthFn(void 0, i);
                            "number" == typeof a ? e -= a : r += s
                        }
                        var l = e - r;
                        if ("all" === this.stretch && l > 0) this.stretchAllRatio = e / r, this.stretchAllColumnsWidth = [], this.needVerifyLastColumnWidth = !0; else if ("last" === this.stretch && e !== 1 / 0) {
                            var u = this._getColumnWidth(n - 1), c = l + u;
                            this.stretchLastWidth = c >= 0 ? c : u
                        }
                    }
                }, getStretchedColumnWidth: function (e, t) {
                    var n = null;
                    return "all" === this.stretch && 0 !== this.stretchAllRatio ? n = this._getStretchedAllColumnWidth(e, t) : "last" === this.stretch && 0 !== this.stretchLastWidth && (n = this._getStretchedLastColumnWidth(e)), n
                }, _getStretchedAllColumnWidth: function (e, t) {
                    var n = 0, r = o.get(this), i = r.totalColumns;
                    if (!this.stretchAllColumnsWidth[e]) {
                        var s = Math.round(t * this.stretchAllRatio), a = r.stretchingColumnWidthFn(s, e);
                        void 0 === a ? this.stretchAllColumnsWidth[e] = s : this.stretchAllColumnsWidth[e] = isNaN(a) ? this._getColumnWidth(e) : a
                    }
                    if (this.stretchAllColumnsWidth.length === i && this.needVerifyLastColumnWidth) {
                        this.needVerifyLastColumnWidth = !1;
                        for (var l = 0; l < this.stretchAllColumnsWidth.length; l++) n += this.stretchAllColumnsWidth[l];
                        n !== this.totalTargetWidth && (this.stretchAllColumnsWidth[this.stretchAllColumnsWidth.length - 1] += this.totalTargetWidth - n)
                    }
                    return this.stretchAllColumnsWidth[e]
                }, _getStretchedLastColumnWidth: function (e) {
                    var t = o.get(this), n = t.totalColumns;
                    return e === n - 1 ? this.stretchLastWidth : null
                }, _getColumnWidth: function (e) {
                    var t = o.get(this).columnWidthFn(e);
                    return void 0 === t && (t = i.DEFAULT_WIDTH), t
                }
            }, {
                get DEFAULT_WIDTH() {
                    return 50
                }
            }), window.WalkontableViewportColumnsCalculator = r
        }, {}],
        5: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableViewportRowsCalculator: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var o = new WeakMap, r = function (e, t, n, r, i, s, a) {
                o.set(this, {
                    viewportHeight: e,
                    scrollOffset: t,
                    totalRows: n,
                    rowHeightFn: r,
                    overrideFn: i,
                    onlyFullyVisible: s,
                    horizontalScrollbarHeight: a
                }), this.count = 0, this.startRow = null, this.endRow = null, this.startPosition = null, this.calculate()
            }, i = r;
            $traceurRuntime.createClass(r, {
                calculate: function () {
                    for (var e = 0, t = !0, n = [], r = o.get(this), s = r.onlyFullyVisible, a = r.overrideFn, l = r.rowHeightFn, u = r.scrollOffset, c = r.totalRows, d = r.viewportHeight, h = r.horizontalScrollbarHeight || 0, f = 0; f < c; f++) {
                        var p = l(f);
                        if (void 0 === p && (p = i.DEFAULT_HEIGHT), e <= u && !s && (this.startRow = f), e >= u && e + p <= u + d - h && (null === this.startRow && (this.startRow = f), this.endRow = f), n.push(e), e += p, s || (this.endRow = f), e >= u + d - h) {
                            t = !1;
                            break
                        }
                    }
                    if (this.endRow === c - 1 && t) for (this.startRow = this.endRow; this.startRow > 0;) {
                        var m = n[this.endRow] + p - n[this.startRow - 1];
                        if ((m <= d - h || !s) && this.startRow--, m >= d - h) break
                    }
                    null !== this.startRow && a && a(this), this.startPosition = n[this.startRow], void 0 == this.startPosition && (this.startPosition = null), null !== this.startRow && (this.count = this.endRow - this.startRow + 1)
                }
            }, {
                get DEFAULT_HEIGHT() {
                    return 23
                }
            }), window.WalkontableViewportRowsCalculator = r
        }, {}],
        6: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableCellCoords: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var o = function (e, t) {
                "undefined" != typeof e && "undefined" != typeof t ? (this.row = e, this.col = t) : (this.row = null, this.col = null)
            };
            $traceurRuntime.createClass(o, {
                isValid: function (e) {
                    return !(this.row < 0 || this.col < 0) && !(this.row >= e.getSetting("totalRows") || this.col >= e.getSetting("totalColumns"))
                }, isEqual: function (e) {
                    return e === this || this.row === e.row && this.col === e.col
                }, isSouthEastOf: function (e) {
                    return this.row >= e.row && this.col >= e.col
                }, isNorthWestOf: function (e) {
                    return this.row <= e.row && this.col <= e.col
                }, isSouthWestOf: function (e) {
                    return this.row >= e.row && this.col <= e.col
                }, isNorthEastOf: function (e) {
                    return this.row <= e.row && this.col >= e.col
                }
            }, {}), window.WalkontableCellCoords = o
        }, {}],
        7: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableCellRange: {
                    get: function () {
                        return i
                    }
                }, __esModule: {value: !0}
            });
            var o, r = (o = e("cell/coords"), o && o.__esModule && o || {default: o}).WalkontableCellCoords,
                i = function (e, t, n) {
                    this.highlight = e, this.from = t, this.to = n
                }, s = i;
            $traceurRuntime.createClass(i, {
                isValid: function (e) {
                    return this.from.isValid(e) && this.to.isValid(e)
                }, isSingle: function () {
                    return this.from.row === this.to.row && this.from.col === this.to.col
                }, getHeight: function () {
                    return Math.max(this.from.row, this.to.row) - Math.min(this.from.row, this.to.row) + 1
                }, getWidth: function () {
                    return Math.max(this.from.col, this.to.col) - Math.min(this.from.col, this.to.col) + 1
                }, includes: function (e) {
                    var t = e, n = t.row, o = t.col, r = this.getTopLeftCorner(), i = this.getBottomRightCorner();
                    return r.row <= n && i.row >= n && r.col <= o && i.col >= o
                }, includesRange: function (e) {
                    return this.includes(e.getTopLeftCorner()) && this.includes(e.getBottomRightCorner())
                }, isEqual: function (e) {
                    return Math.min(this.from.row, this.to.row) == Math.min(e.from.row, e.to.row) && Math.max(this.from.row, this.to.row) == Math.max(e.from.row, e.to.row) && Math.min(this.from.col, this.to.col) == Math.min(e.from.col, e.to.col) && Math.max(this.from.col, this.to.col) == Math.max(e.from.col, e.to.col)
                }, overlaps: function (e) {
                    return e.isSouthEastOf(this.getTopLeftCorner()) && e.isNorthWestOf(this.getBottomRightCorner())
                }, isSouthEastOf: function (e) {
                    return this.getTopLeftCorner().isSouthEastOf(e) || this.getBottomRightCorner().isSouthEastOf(e)
                }, isNorthWestOf: function (e) {
                    return this.getTopLeftCorner().isNorthWestOf(e) || this.getBottomRightCorner().isNorthWestOf(e)
                }, expand: function (e) {
                    var t = this.getTopLeftCorner(), n = this.getBottomRightCorner();
                    return (e.row < t.row || e.col < t.col || e.row > n.row || e.col > n.col) && (this.from = new r(Math.min(t.row, e.row), Math.min(t.col, e.col)), this.to = new r(Math.max(n.row, e.row), Math.max(n.col, e.col)), !0)
                }, expandByRange: function (e) {
                    if (this.includesRange(e) || !this.overlaps(e)) return !1;
                    var t = this.getTopLeftCorner(), n = this.getBottomRightCorner(),
                        o = (this.getTopRightCorner(), this.getBottomLeftCorner(), e.getTopLeftCorner()),
                        i = e.getBottomRightCorner(), a = Math.min(t.row, o.row), l = Math.min(t.col, o.col),
                        u = Math.max(n.row, i.row), c = Math.max(n.col, i.col), d = new r(a, l), h = new r(u, c),
                        f = new s(d, d, h).isCorner(this.from, e), p = e.isEqual(new s(d, d, h));
                    return f && !p && (this.from.col > d.col && (d.col = c, h.col = l), this.from.row > d.row && (d.row = u, h.row = a)), this.from = d, this.to = h, !0
                }, getDirection: function () {
                    return this.from.isNorthWestOf(this.to) ? "NW-SE" : this.from.isNorthEastOf(this.to) ? "NE-SW" : this.from.isSouthEastOf(this.to) ? "SE-NW" : this.from.isSouthWestOf(this.to) ? "SW-NE" : void 0
                }, setDirection: function (e) {
                    var t, n, o, r;
                    switch (e) {
                        case"NW-SE":
                            t = [this.getTopLeftCorner(), this.getBottomRightCorner()], this.from = t[0], this.to = t[1], t;
                            break;
                        case"NE-SW":
                            n = [this.getTopRightCorner(), this.getBottomLeftCorner()], this.from = n[0], this.to = n[1], n;
                            break;
                        case"SE-NW":
                            o = [this.getBottomRightCorner(), this.getTopLeftCorner()], this.from = o[0], this.to = o[1], o;
                            break;
                        case"SW-NE":
                            r = [this.getBottomLeftCorner(), this.getTopRightCorner()], this.from = r[0], this.to = r[1], r
                    }
                }, getTopLeftCorner: function () {
                    return new r(Math.min(this.from.row, this.to.row), Math.min(this.from.col, this.to.col))
                }, getBottomRightCorner: function () {
                    return new r(Math.max(this.from.row, this.to.row), Math.max(this.from.col, this.to.col))
                }, getTopRightCorner: function () {
                    return new r(Math.min(this.from.row, this.to.row), Math.max(this.from.col, this.to.col))
                }, getBottomLeftCorner: function () {
                    return new r(Math.max(this.from.row, this.to.row), Math.min(this.from.col, this.to.col))
                }, isCorner: function (e, t) {
                    return !!(t && t.includes(e) && (this.getTopLeftCorner().isEqual(new r(t.from.row, t.from.col)) || this.getTopRightCorner().isEqual(new r(t.from.row, t.to.col)) || this.getBottomLeftCorner().isEqual(new r(t.to.row, t.from.col)) || this.getBottomRightCorner().isEqual(new r(t.to.row, t.to.col)))) || (e.isEqual(this.getTopLeftCorner()) || e.isEqual(this.getTopRightCorner()) || e.isEqual(this.getBottomLeftCorner()) || e.isEqual(this.getBottomRightCorner()))
                }, getOppositeCorner: function (e, t) {
                    if (!(e instanceof r)) return !1;
                    if (t && t.includes(e)) {
                        if (this.getTopLeftCorner().isEqual(new r(t.from.row, t.from.col))) return this.getBottomRightCorner();
                        if (this.getTopRightCorner().isEqual(new r(t.from.row, t.to.col))) return this.getBottomLeftCorner();
                        if (this.getBottomLeftCorner().isEqual(new r(t.to.row, t.from.col))) return this.getTopRightCorner();
                        if (this.getBottomRightCorner().isEqual(new r(t.to.row, t.to.col))) return this.getTopLeftCorner()
                    }
                    return e.isEqual(this.getBottomRightCorner()) ? this.getTopLeftCorner() : e.isEqual(this.getTopLeftCorner()) ? this.getBottomRightCorner() : e.isEqual(this.getTopRightCorner()) ? this.getBottomLeftCorner() : e.isEqual(this.getBottomLeftCorner()) ? this.getTopRightCorner() : void 0
                }, getBordersSharedWith: function (e) {
                    if (!this.includesRange(e)) return [];
                    var t = {
                        top: Math.min(this.from.row, this.to.row),
                        bottom: Math.max(this.from.row, this.to.row),
                        left: Math.min(this.from.col, this.to.col),
                        right: Math.max(this.from.col, this.to.col)
                    }, n = {
                        top: Math.min(e.from.row, e.to.row),
                        bottom: Math.max(e.from.row, e.to.row),
                        left: Math.min(e.from.col, e.to.col),
                        right: Math.max(e.from.col, e.to.col)
                    }, o = [];
                    return t.top == n.top && o.push("top"), t.right == n.right && o.push("right"), t.bottom == n.bottom && o.push("bottom"), t.left == n.left && o.push("left"), o
                }, getInner: function () {
                    for (var e = this.getTopLeftCorner(), t = this.getBottomRightCorner(), n = [], o = e.row; o <= t.row; o++) for (var i = e.col; i <= t.col; i++) this.from.row === o && this.from.col === i || this.to.row === o && this.to.col === i || n.push(new r(o, i));
                    return n
                }, getAll: function () {
                    for (var e = this.getTopLeftCorner(), t = this.getBottomRightCorner(), n = [], o = e.row; o <= t.row; o++) for (var i = e.col; i <= t.col; i++) e.row === o && e.col === i ? n.push(e) : t.row === o && t.col === i ? n.push(t) : n.push(new r(o, i));
                    return n
                }, forAll: function (e) {
                    for (var t = this.getTopLeftCorner(), n = this.getBottomRightCorner(), o = t.row; o <= n.row; o++) for (var r = t.col; r <= n.col; r++) {
                        var i = e(o, r);
                        if (i === !1) return
                    }
                }
            }, {}), window.WalkontableCellRange = i
        }, {"cell/coords": 6}],
        8: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                Walkontable: {
                    get: function () {
                        return H
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f, p, m, g,
                w = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}), v = w.addClass,
                y = w.fastInnerText, b = w.isVisible, C = w.removeClass,
                _ = (r = e("helpers/object"), r && r.__esModule && r || {default: r}).objectEach,
                R = (i = e("helpers/string"), i && i.__esModule && i || {default: i}), M = R.toUpperCaseFirst,
                S = R.randomString, E = (s = e("event"), s && s.__esModule && s || {default: s}).WalkontableEvent,
                O = (a = e("overlays"), a && a.__esModule && a || {default: a}).WalkontableOverlays,
                T = (l = e("scroll"), l && l.__esModule && l || {default: l}).WalkontableScroll,
                k = (u = e("settings"), u && u.__esModule && u || {default: u}).WalkontableSettings,
                x = (c = e("table"), c && c.__esModule && c || {default: c}).WalkontableTable,
                D = (d = e("viewport"), d && d.__esModule && d || {default: d}).WalkontableViewport,
                H = ((h = e("overlay/_base.js"), h && h.__esModule && h || {default: h}).WalkontableOverlay, (f = e("overlay/top.js"), f && f.__esModule && f || {default: f}).WalkontableTopOverlay, (p = e("overlay/left.js"), p && p.__esModule && p || {default: p}).WalkontableLeftOverlay, (m = e("overlay/debug.js"), m && m.__esModule && m || {default: m}).WalkontableDebugOverlay, (g = e("overlay/topLeftCorner.js"), g && g.__esModule && g || {default: g}).WalkontableTopLeftCornerOverlay, function (e) {
                    var t = [];
                    if (this.guid = "wt_" + S(), e.cloneSource ? (this.cloneSource = e.cloneSource, this.cloneOverlay = e.cloneOverlay, this.wtSettings = e.cloneSource.wtSettings, this.wtTable = new x(this, e.table, e.wtRootElement), this.wtScroll = new T(this), this.wtViewport = e.cloneSource.wtViewport, this.wtEvent = new E(this), this.selections = this.cloneSource.selections) : (this.wtSettings = new k(this, e), this.wtTable = new x(this, e.table), this.wtScroll = new T(this), this.wtViewport = new D(this), this.wtEvent = new E(this), this.selections = this.getSetting("selections"), this.wtOverlays = new O(this), this.exportSettingsAsClassNames()), this.wtTable.THEAD.childNodes.length && this.wtTable.THEAD.childNodes[0].childNodes.length) {
                        for (var n = 0, o = this.wtTable.THEAD.childNodes[0].childNodes.length; n < o; n++) t.push(this.wtTable.THEAD.childNodes[0].childNodes[n].innerHTML);
                        this.getSetting("columnHeaders").length || this.update("columnHeaders", [function (e, n) {
                            y(n, t[e])
                        }])
                    }
                    this.drawn = !1, this.drawInterrupted = !1
                });
            $traceurRuntime.createClass(H, {
                draw: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    return this.drawInterrupted = !1, e || b(this.wtTable.TABLE) ? this.wtTable.draw(e) : this.drawInterrupted = !0, this
                }, getCell: function (e) {
                    var t = void 0 !== arguments[1] && arguments[1];
                    if (!t) return this.wtTable.getCell(e);
                    var n = this.wtSettings.getSetting("totalRows"), o = this.wtSettings.getSetting("fixedRowsTop"),
                        r = this.wtSettings.getSetting("fixedRowsBottom"),
                        i = this.wtSettings.getSetting("fixedColumnsLeft");
                    if (e.row < o && e.col < i) return this.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell(e);
                    if (e.row < o) return this.wtOverlays.topOverlay.clone.wtTable.getCell(e);
                    if (e.col < i && e.row >= n - r) {
                        if (this.wtOverlays.bottomLeftCornerOverlay && this.wtOverlays.bottomLeftCornerOverlay.clone) return this.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell(e)
                    } else {
                        if (e.col < i) return this.wtOverlays.leftOverlay.clone.wtTable.getCell(e);
                        if (e.row < n && e.row > n - r && this.wtOverlays.bottomOverlay && this.wtOverlays.bottomOverlay.clone) return this.wtOverlays.bottomOverlay.clone.wtTable.getCell(e)
                    }
                    return this.wtTable.getCell(e)
                }, update: function (e, t) {
                    return this.wtSettings.update(e, t)
                }, scrollVertical: function (e) {
                    return this.wtOverlays.topOverlay.scrollTo(e), this.getSetting("onScrollVertically"), this
                }, scrollHorizontal: function (e) {
                    return this.wtOverlays.leftOverlay.scrollTo(e), this.getSetting("onScrollHorizontally"), this
                }, scrollViewport: function (e) {
                    return this.wtScroll.scrollViewport(e), this
                }, getViewport: function () {
                    return [this.wtTable.getFirstVisibleRow(), this.wtTable.getFirstVisibleColumn(), this.wtTable.getLastVisibleRow(), this.wtTable.getLastVisibleColumn()]
                }, getOverlayName: function () {
                    return this.cloneOverlay ? this.cloneOverlay.type : "master"
                }, isOverlayName: function (e) {
                    return !!this.cloneOverlay && this.cloneOverlay.type === e
                }, exportSettingsAsClassNames: function () {
                    var e = this, t = {rowHeaders: ["array"], columnHeaders: ["array"]}, n = [], o = [];
                    _(t, function (t, r) {
                        t.indexOf("array") > -1 && e.getSetting(r).length && o.push("ht" + M(r)), n.push("ht" + M(r))
                    }), C(this.wtTable.wtRootElement.parentNode, n), v(this.wtTable.wtRootElement.parentNode, o)
                }, getSetting: function (e, t, n, o, r) {
                    return this.wtSettings.getSetting(e, t, n, o, r)
                }, hasSetting: function (e) {
                    return this.wtSettings.has(e)
                }, destroy: function () {
                    this.wtOverlays.destroy(), this.wtEvent.destroy()
                }
            }, {}), window.Walkontable = H
        }, {
            event: 9,
            "helpers/dom/element": 47,
            "helpers/object": 53,
            "helpers/string": 55,
            "overlay/_base.js": 12,
            "overlay/debug.js": 13,
            "overlay/left.js": 14,
            "overlay/top.js": 15,
            "overlay/topLeftCorner.js": 16,
            overlays: 17,
            scroll: 18,
            settings: 20,
            table: 21,
            viewport: 23
        }],
        9: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = this, n = m(e);
                this.instance = e;
                var o = [null, null];
                this.dblClickTimeout = [null, null];
                var r, i = function (e) {
                    var n = document.activeElement, r = f(h, e.realTarget), i = e.realTarget;
                    if (i !== n && r(0) !== n && r(1) !== n) {
                        var s = t.parentCell(i);
                        c(i, "corner") ? t.instance.getSetting("onCellCornerMouseDown", e, i) : s.TD && t.instance.hasSetting("onCellMouseDown") && t.instance.getSetting("onCellMouseDown", e, s.coords, s.TD, t.instance), 2 !== e.button && s.TD && (o[0] = s.TD, clearTimeout(t.dblClickTimeout[0]), t.dblClickTimeout[0] = setTimeout(function () {
                            o[0] = null
                        }, 1e3))
                    }
                }, s = function (e) {
                    t.instance.touchMoving = !0
                }, a = function (e) {
                    n.addEventListener(this, "touchmove", s), t.checkIfTouchMove = setTimeout(function () {
                        return t.instance.touchMoving === !0 ? (t.instance.touchMoving = void 0, void n.removeEventListener("touchmove", s, !1)) : void i(e)
                    }, 30)
                }, l = function (e) {
                    var n, o, r;
                    t.instance.hasSetting("onCellMouseOver") && (n = t.instance.wtTable.TABLE, o = u(e.realTarget, ["TD", "TH"], n), r = t.instance.cloneSource || t.instance, o && o !== r.lastMouseOver && d(o, n) && (r.lastMouseOver = o, t.instance.getSetting("onCellMouseOver", e, t.instance.wtTable.getCoords(o), o, t.instance)))
                }, g = function (e) {
                    if (2 !== e.button) {
                        var n = t.parentCell(e.realTarget);
                        n.TD === o[0] && n.TD === o[1] ? (c(e.realTarget, "corner") ? t.instance.getSetting("onCellCornerDblClick", e, n.coords, n.TD, t.instance) : t.instance.getSetting("onCellDblClick", e, n.coords, n.TD, t.instance), o[0] = null, o[1] = null) : n.TD === o[0] ? (t.instance.getSetting("onCellMouseUp", e, n.coords, n.TD, t.instance), o[1] = n.TD, clearTimeout(t.dblClickTimeout[1]), t.dblClickTimeout[1] = setTimeout(function () {
                            o[1] = null
                        }, 500)) : n.TD && t.instance.hasSetting("onCellMouseUp") && t.instance.getSetting("onCellMouseUp", e, n.coords, n.TD, t.instance)
                    }
                }, w = function (e) {
                    clearTimeout(r), e.preventDefault(), g(e)
                };
                if (n.addEventListener(this.instance.wtTable.holder, "mousedown", i), n.addEventListener(this.instance.wtTable.TABLE, "mouseover", l), n.addEventListener(this.instance.wtTable.holder, "mouseup", g), this.instance.wtTable.holder.parentNode.parentNode && p() && !t.instance.wtTable.isWorkingOnClone()) {
                    var v = "." + this.instance.wtTable.holder.parentNode.className.split(" ").join(".");
                    n.addEventListener(this.instance.wtTable.holder, "touchstart", function (e) {
                        t.instance.touchApplied = !0, d(e.target, v) && a.call(e.target, e)
                    }), n.addEventListener(this.instance.wtTable.holder, "touchend", function (e) {
                        t.instance.touchApplied = !1, d(e.target, v) && w.call(e.target, e)
                    }), t.instance.momentumScrolling || (t.instance.momentumScrolling = {}), n.addEventListener(this.instance.wtTable.holder, "scroll", function (e) {
                        clearTimeout(t.instance.momentumScrolling._timeout), t.instance.momentumScrolling.ongoing || t.instance.getSetting("onBeforeTouchScroll"), t.instance.momentumScrolling.ongoing = !0, t.instance.momentumScrolling._timeout = setTimeout(function () {
                            t.instance.touchApplied || (t.instance.momentumScrolling.ongoing = !1, t.instance.getSetting("onAfterMomentumScroll"))
                        }, 200)
                    })
                }
                n.addEventListener(window, "resize", function () {
                    "none" !== t.instance.getSetting("stretchH") && t.instance.draw()
                }), this.destroy = function () {
                    clearTimeout(this.dblClickTimeout[0]), clearTimeout(this.dblClickTimeout[1]), n.destroy()
                }
            }

            Object.defineProperties(n, {
                WalkontableEvent: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}),
                u = l.closestDown, c = l.hasClass, d = l.isChildOf, h = l.getParent,
                f = (i = e("helpers/function"), i && i.__esModule && i || {default: i}).partial,
                p = (s = e("helpers/browser"), s && s.__esModule && s || {default: s}).isMobileBrowser,
                m = (a = e("eventManager"), a && a.__esModule && a || {default: a}).eventManager;
            o.prototype.parentCell = function (e) {
                var t = {}, n = this.instance.wtTable.TABLE, o = u(e, ["TD", "TH"], n);
                return o ? (t.coords = this.instance.wtTable.getCoords(o), t.TD = o) : c(e, "wtBorder") && c(e, "current") ? (t.coords = this.instance.selections.current.cellRange.highlight, t.TD = this.instance.wtTable.getCell(t.coords)) : c(e, "wtBorder") && c(e, "area") && this.instance.selections.area.cellRange && (t.coords = this.instance.selections.area.cellRange.to, t.TD = this.instance.wtTable.getCell(t.coords)), t
            }, window.WalkontableEvent = o
        }, {eventManager: 42, "helpers/browser": 44, "helpers/dom/element": 47, "helpers/function": 50}],
        10: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableColumnFilter: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var o = function (e, t, n) {
                this.offset = e, this.total = t, this.countTH = n
            };
            $traceurRuntime.createClass(o, {
                offsetted: function (e) {
                    return e + this.offset
                }, unOffsetted: function (e) {
                    return e - this.offset
                }, renderedToSource: function (e) {
                    return this.offsetted(e)
                }, sourceToRendered: function (e) {
                    return this.unOffsetted(e)
                }, offsettedTH: function (e) {
                    return e - this.countTH
                }, unOffsettedTH: function (e) {
                    return e + this.countTH
                }, visibleRowHeadedColumnToSourceColumn: function (e) {
                    return this.renderedToSource(this.offsettedTH(e))
                }, sourceColumnToVisibleRowHeadedColumn: function (e) {
                    return this.unOffsettedTH(this.sourceToRendered(e))
                }
            }, {}), window.WalkontableColumnFilter = o
        }, {}],
        11: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableRowFilter: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var o = function (e, t, n) {
                this.offset = e, this.total = t, this.countTH = n
            };
            $traceurRuntime.createClass(o, {
                offsetted: function (e) {
                    return e + this.offset
                }, unOffsetted: function (e) {
                    return e - this.offset
                }, renderedToSource: function (e) {
                    return this.offsetted(e)
                }, sourceToRendered: function (e) {
                    return this.unOffsetted(e)
                }, offsettedTH: function (e) {
                    return e - this.countTH
                }, unOffsettedTH: function (e) {
                    return e + this.countTH
                }, visibleColHeadedRowToSourceRow: function (e) {
                    return this.renderedToSource(this.offsettedTH(e))
                }, sourceRowToVisibleColHeadedRow: function (e) {
                    return this.unOffsettedTH(this.sourceToRendered(e))
                }
            }, {}), window.WalkontableRowFilter = o
        }, {}],
        12: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableOverlay: {
                    get: function () {
                        return p
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}),
                l = a.getScrollableElement, u = a.getTrimmingContainer,
                c = (r = e("helpers/object"), r && r.__esModule && r || {default: r}).defineGetter,
                d = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                h = (s = e("eventManager"), s && s.__esModule && s || {default: s}).eventManager, f = {},
                p = function (e) {
                    c(this, "wot", e, {writable: !1}), this.instance = this.wot, this.type = "", this.mainTableScrollableElement = null, this.TABLE = this.wot.wtTable.TABLE, this.hider = this.wot.wtTable.hider, this.spreader = this.wot.wtTable.spreader, this.holder = this.wot.wtTable.holder, this.wtRootElement = this.wot.wtTable.wtRootElement, this.trimmingContainer = u(this.hider.parentNode.parentNode), this.areElementSizesAdjusted = !1, this.updateStateOfRendering()
                }, m = p;
            $traceurRuntime.createClass(p, {
                updateStateOfRendering: function () {
                    var e = this.needFullRender;
                    this.needFullRender = this.shouldBeRendered();
                    var t = e !== this.needFullRender;
                    return t && !this.needFullRender && this.reset(), t
                }, shouldBeRendered: function () {
                    return !0
                }, updateTrimmingContainer: function () {
                    this.trimmingContainer = u(this.hider.parentNode.parentNode)
                }, updateMainScrollableElement: function () {
                    this.mainTableScrollableElement = l(this.wot.wtTable.TABLE)
                }, makeClone: function (e) {
                    if (m.CLONE_TYPES.indexOf(e) === -1) throw new Error('Clone type "' + e + '" is not supported.');
                    var t = document.createElement("DIV"), n = document.createElement("TABLE");
                    t.className = "ht_clone_" + e + " handsontable", t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.overflow = "hidden", n.className = this.wot.wtTable.TABLE.className, t.appendChild(n), this.type = e, this.wot.wtTable.wtRootElement.parentNode.appendChild(t);
                    var o = this.wot.getSetting("preventOverflow");
                    return o === !0 || "horizontal" === o && this.type === m.CLONE_TOP || "vertical" === o && this.type === m.CLONE_LEFT ? this.mainTableScrollableElement = window : this.mainTableScrollableElement = l(this.wot.wtTable.TABLE), new Walkontable({
                        cloneSource: this.wot,
                        cloneOverlay: this,
                        table: n
                    })
                }, refresh: function () {
                    var e = void 0 !== arguments[0] && arguments[0], t = this.shouldBeRendered();
                    this.clone && (this.needFullRender || t) && this.clone.draw(e), this.needFullRender = t
                }, reset: function () {
                    if (this.clone) {
                        var e = this.clone.wtTable.holder, t = this.clone.wtTable.hider, n = e.style, o = t.style,
                            r = e.parentNode.style;
                        d([n, o, r], function (e) {
                            e.width = "", e.height = ""
                        })
                    }
                }, destroy: function () {
                    h(this.clone).destroy()
                }
            }, {
                get CLONE_TOP() {
                    return "top"
                }, get CLONE_BOTTOM() {
                    return "bottom"
                }, get CLONE_LEFT() {
                    return "left"
                }, get CLONE_TOP_LEFT_CORNER() {
                    return "top_left_corner"
                }, get CLONE_BOTTOM_LEFT_CORNER() {
                    return "bottom_left_corner"
                }, get CLONE_DEBUG() {
                    return "debug"
                }, get CLONE_TYPES() {
                    return [m.CLONE_TOP, m.CLONE_BOTTOM, m.CLONE_LEFT, m.CLONE_TOP_LEFT_CORNER, m.CLONE_BOTTOM_LEFT_CORNER, m.CLONE_DEBUG]
                }, registerOverlay: function (e, t) {
                    if (m.CLONE_TYPES.indexOf(e) === -1) throw new Error("Unsupported overlay (" + e + ").");
                    f[e] = t
                }, createOverlay: function (e, t) {
                    return new f[e](t)
                }, isOverlayTypeOf: function (e, t) {
                    return !(!e || !f[t]) && e instanceof f[t]
                }
            }), window.WalkontableOverlay = p
        }, {eventManager: 42, "helpers/array": 43, "helpers/dom/element": 47, "helpers/object": 53}],
        13: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableDebugOverlay: {
                    get: function () {
                        return a
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}).addClass,
                s = (r = e("_base"), r && r.__esModule && r || {default: r}).WalkontableOverlay, a = function (e) {
                    $traceurRuntime.superConstructor(l).call(this, e), this.clone = this.makeClone(s.CLONE_DEBUG), this.clone.wtTable.holder.style.opacity = .4, this.clone.wtTable.holder.style.textShadow = "0 0 2px #ff0000", i(this.clone.wtTable.holder.parentNode, "wtDebugVisible")
                }, l = a;
            $traceurRuntime.createClass(a, {}, {}, s), window.WalkontableDebugOverlay = a, s.registerOverlay(s.CLONE_DEBUG, a)
        }, {_base: 12, "helpers/dom/element": 47}],
        14: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableLeftOverlay: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}), s = i.addClass,
                a = i.getScrollbarWidth, l = i.getScrollLeft, u = i.getWindowScrollTop, c = i.hasClass,
                d = i.outerWidth, h = i.innerHeight, f = i.removeClass, p = i.setOverlayPosition,
                m = i.resetCssTransform,
                g = (r = e("_base"), r && r.__esModule && r || {default: r}).WalkontableOverlay, w = function (e) {
                    $traceurRuntime.superConstructor(v).call(this, e), this.clone = this.makeClone(g.CLONE_LEFT)
                }, v = w;
            $traceurRuntime.createClass(w, {
                shouldBeRendered: function () {
                    return !(!this.wot.getSetting("fixedColumnsLeft") && !this.wot.getSetting("rowHeaders").length)
                }, resetFixedPosition: function () {
                    if (this.needFullRender && this.wot.wtTable.holder.parentNode) {
                        var e = this.clone.wtTable.holder.parentNode, t = 0, n = this.wot.getSetting("preventOverflow");
                        if (this.trimmingContainer !== window || n && "horizontal" === n) t = this.getScrollPosition(), m(e); else {
                            var o, r, i = this.wot.wtTable.hider.getBoundingClientRect(), s = Math.ceil(i.left),
                                a = Math.ceil(i.right);
                            r = this.wot.wtTable.hider.style.top, r = "" === r ? 0 : r, o = s < 0 && a - e.offsetWidth > 0 ? -s : 0, t = o, o += "px", p(e, o, r)
                        }
                        this.adjustHeaderBordersPosition(t), this.adjustElementsSize()
                    }
                }, setScrollPosition: function (e) {
                    this.mainTableScrollableElement === window ? window.scrollTo(e, u()) : this.mainTableScrollableElement.scrollLeft = e
                }, onScroll: function () {
                    this.wot.getSetting("onScrollVertically")
                }, sumCellSizes: function (e, t) {
                    for (var n = 0, o = this.wot.wtSettings.defaultColumnWidth; e < t;) n += this.wot.wtTable.getStretchedColumnWidth(e) || o, e++;
                    return n
                }, adjustElementsSize: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    this.updateTrimmingContainer(), (this.needFullRender || e) && (this.adjustRootElementSize(), this.adjustRootChildrenSize(), e || (this.areElementSizesAdjusted = !0))
                }, adjustRootElementSize: function () {
                    var e, t = this.wot.wtTable.holder, n = t.clientHeight === t.offsetHeight ? 0 : a(),
                        o = this.clone.wtTable.holder.parentNode, r = o.style,
                        i = this.wot.getSetting("preventOverflow");
                    if (this.trimmingContainer !== window || "vertical" === i) {
                        var s = this.wot.wtViewport.getWorkspaceHeight() - n;
                        s = Math.min(s, h(this.wot.wtTable.wtRootElement)), r.height = s + "px"
                    } else r.height = "";
                    this.clone.wtTable.holder.style.height = r.height, e = d(this.clone.wtTable.TABLE), r.width = (0 === e ? e : e + 4) + "px"
                }, adjustRootChildrenSize: function () {
                    var e = a();
                    this.clone.wtTable.hider.style.height = this.hider.style.height, this.clone.wtTable.holder.style.height = this.clone.wtTable.holder.parentNode.style.height, 0 === e && (e = 30), this.clone.wtTable.holder.style.width = parseInt(this.clone.wtTable.holder.parentNode.style.width, 10) + e + "px"
                }, applyToDOM: function () {
                    var e = this.wot.getSetting("totalColumns");
                    if (this.areElementSizesAdjusted || this.adjustElementsSize(), "number" == typeof this.wot.wtViewport.columnsRenderCalculator.startPosition) this.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + "px"; else {
                        if (0 !== e) throw new Error("Incorrect value of the columnsRenderCalculator");
                        this.spreader.style.left = "0"
                    }
                    this.spreader.style.right = "", this.needFullRender && this.syncOverlayOffset()
                }, syncOverlayOffset: function () {
                    "number" == typeof this.wot.wtViewport.rowsRenderCalculator.startPosition ? this.clone.wtTable.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + "px" : this.clone.wtTable.spreader.style.top = ""
                }, scrollTo: function (e, t) {
                    var n = this.getTableParentOffset(), o = this.wot.cloneSource ? this.wot.cloneSource : this.wot,
                        r = o.wtTable.holder, i = 0;
                    t && r.offsetWidth !== r.clientWidth && (i = a()), t ? (n += this.sumCellSizes(0, e + 1), n -= this.wot.wtViewport.getViewportWidth()) : n += this.sumCellSizes(this.wot.getSetting("fixedColumnsLeft"), e), n += i, this.setScrollPosition(n)
                }, getTableParentOffset: function () {
                    var e = this.wot.getSetting("preventOverflow"), t = 0;
                    return e || this.trimmingContainer !== window || (t = this.wot.wtTable.holderOffset.left), t
                }, getScrollPosition: function () {
                    return l(this.mainTableScrollableElement)
                }, adjustHeaderBordersPosition: function (e) {
                    var t = this.wot.wtTable.holder.parentNode, n = this.wot.getSetting("rowHeaders"),
                        o = this.wot.getSetting("fixedColumnsLeft"), r = this.wot.getSetting("totalRows");
                    if (r ? f(t, "emptyRows") : s(t, "emptyRows"), o && !n.length) s(t, "innerBorderLeft"); else if (!o && n.length) {
                        var i = c(t, "innerBorderLeft");
                        e ? s(t, "innerBorderLeft") : f(t, "innerBorderLeft"), (!i && e || i && !e) && this.wot.wtOverlays.adjustElementsSize()
                    }
                }
            }, {}, g), window.WalkontableLeftOverlay = w, g.registerOverlay(g.CLONE_LEFT, w)
        }, {_base: 12, "helpers/dom/element": 47}],
        15: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableTopOverlay: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}), s = i.addClass,
                a = i.getScrollbarWidth, l = i.getScrollTop, u = i.getWindowScrollLeft, c = i.hasClass,
                d = i.outerHeight, h = i.innerWidth, f = i.removeClass, p = i.setOverlayPosition,
                m = i.resetCssTransform,
                g = (r = e("_base"), r && r.__esModule && r || {default: r}).WalkontableOverlay, w = function (e) {
                    $traceurRuntime.superConstructor(v).call(this, e), this.clone = this.makeClone(g.CLONE_TOP)
                }, v = w;
            $traceurRuntime.createClass(w, {
                shouldBeRendered: function () {
                    return !(!this.wot.getSetting("fixedRowsTop") && !this.wot.getSetting("columnHeaders").length)
                }, resetFixedPosition: function () {
                    if (this.needFullRender && this.wot.wtTable.holder.parentNode) {
                        var e = this.clone.wtTable.holder.parentNode, t = 0, n = this.wot.getSetting("preventOverflow");
                        if (this.trimmingContainer !== window || n && "vertical" === n) t = this.getScrollPosition(), m(e); else {
                            var o, r, i = this.wot.wtTable.hider.getBoundingClientRect(), s = Math.ceil(i.top),
                                a = Math.ceil(i.bottom);
                            o = this.wot.wtTable.hider.style.left, o = "" === o ? 0 : o, r = s < 0 && a - e.offsetHeight > 0 ? -s : 0, t = r, r += "px", p(e, o, r)
                        }
                        this.adjustHeaderBordersPosition(t), this.adjustElementsSize()
                    }
                }, setScrollPosition: function (e) {
                    this.mainTableScrollableElement === window ? window.scrollTo(u(), e) : this.mainTableScrollableElement.scrollTop = e
                }, onScroll: function () {
                    this.wot.getSetting("onScrollHorizontally")
                }, sumCellSizes: function (e, t) {
                    for (var n = 0, o = this.wot.wtSettings.settings.defaultRowHeight; e < t;) {
                        var r = this.wot.wtTable.getRowHeight(e);
                        n += void 0 === r ? o : r, e++
                    }
                    return n
                }, adjustElementsSize: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    this.updateTrimmingContainer(), (this.needFullRender || e) && (this.adjustRootElementSize(), this.adjustRootChildrenSize(), e || (this.areElementSizesAdjusted = !0))
                }, adjustRootElementSize: function () {
                    var e, t = this.wot.wtTable.holder, n = t.clientWidth === t.offsetWidth ? 0 : a(),
                        o = this.clone.wtTable.holder.parentNode, r = o.style,
                        i = this.wot.getSetting("preventOverflow");
                    if (this.trimmingContainer !== window || "horizontal" === i) {
                        var s = this.wot.wtViewport.getWorkspaceWidth() - n;
                        s = Math.min(s, h(this.wot.wtTable.wtRootElement)), r.width = s + "px"
                    } else r.width = "";
                    this.clone.wtTable.holder.style.width = r.width, e = d(this.clone.wtTable.TABLE), r.height = (0 === e ? e : e + 4) + "px"
                }, adjustRootChildrenSize: function () {
                    var e = a();
                    this.clone.wtTable.hider.style.width = this.hider.style.width, this.clone.wtTable.holder.style.width = this.clone.wtTable.holder.parentNode.style.width, 0 === e && (e = 30), this.clone.wtTable.holder.style.height = parseInt(this.clone.wtTable.holder.parentNode.style.height, 10) + e + "px"
                }, applyToDOM: function () {
                    var e = this.wot.getSetting("totalRows");
                    if (this.areElementSizesAdjusted || this.adjustElementsSize(), "number" == typeof this.wot.wtViewport.rowsRenderCalculator.startPosition) this.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + "px"; else {
                        if (0 !== e) throw new Error("Incorrect value of the rowsRenderCalculator");
                        this.spreader.style.top = "0"
                    }
                    this.spreader.style.bottom = "", this.needFullRender && this.syncOverlayOffset()
                }, syncOverlayOffset: function () {
                    "number" == typeof this.wot.wtViewport.columnsRenderCalculator.startPosition ? this.clone.wtTable.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + "px" : this.clone.wtTable.spreader.style.left = ""
                }, scrollTo: function (e, t) {
                    var n = this.getTableParentOffset(), o = this.wot.cloneSource ? this.wot.cloneSource : this.wot,
                        r = o.wtTable.holder, i = 0;
                    if (t && r.offsetHeight !== r.clientHeight && (i = a()), t) {
                        var s = this.wot.getSetting("fixedRowsBottom"),
                            l = (this.wot.getSetting("fixedRowsTop"), this.wot.getSetting("totalRows"));
                        n += this.sumCellSizes(0, e + 1), n -= this.wot.wtViewport.getViewportHeight() - this.sumCellSizes(l - s, l), n += 1
                    } else n += this.sumCellSizes(this.wot.getSetting("fixedRowsTop"), e);
                    n += i, this.setScrollPosition(n)
                }, getTableParentOffset: function () {
                    return this.mainTableScrollableElement === window ? this.wot.wtTable.holderOffset.top : 0
                }, getScrollPosition: function () {
                    return l(this.mainTableScrollableElement)
                }, adjustHeaderBordersPosition: function (e) {
                    var t = this.wot.wtTable.holder.parentNode, n = this.wot.getSetting("totalColumns");
                    if (n ? f(t, "emptyColumns") : s(t, "emptyColumns"), 0 === this.wot.getSetting("fixedRowsTop") && this.wot.getSetting("columnHeaders").length > 0) {
                        var o = c(t, "innerBorderTop");
                        e || 0 === this.wot.getSetting("totalRows") ? s(t, "innerBorderTop") : f(t, "innerBorderTop"), (!o && e || o && !e) && this.wot.wtOverlays.adjustElementsSize()
                    }
                    if (0 === this.wot.getSetting("rowHeaders").length) {
                        var r = this.clone.wtTable.THEAD.querySelectorAll("th:nth-of-type(2)");
                        if (r) for (var i = 0; i < r.length; i++) r[i].style["border-left-width"] = 0
                    }
                }
            }, {}, g), window.WalkontableTopOverlay = w, g.registerOverlay(g.CLONE_TOP, w)
        }, {_base: 12, "helpers/dom/element": 47}],
        16: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableTopLeftCornerOverlay: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}), s = i.outerHeight,
                a = i.outerWidth, l = i.setOverlayPosition, u = i.resetCssTransform,
                c = (r = e("_base"), r && r.__esModule && r || {default: r}).WalkontableOverlay, d = function (e) {
                    $traceurRuntime.superConstructor(h).call(this, e), this.clone = this.makeClone(c.CLONE_TOP_LEFT_CORNER)
                }, h = d;
            $traceurRuntime.createClass(d, {
                shouldBeRendered: function () {
                    return !(!this.wot.getSetting("fixedRowsTop") && !this.wot.getSetting("columnHeaders").length || !this.wot.getSetting("fixedColumnsLeft") && !this.wot.getSetting("rowHeaders").length)
                }, resetFixedPosition: function () {
                    if (this.updateTrimmingContainer(), this.wot.wtTable.holder.parentNode) {
                        var e = this.clone.wtTable.holder.parentNode, t = s(this.clone.wtTable.TABLE),
                            n = a(this.clone.wtTable.TABLE), o = this.wot.getSetting("preventOverflow");
                        if (this.trimmingContainer === window) {
                            var r = this.wot.wtTable.hider.getBoundingClientRect(), i = Math.ceil(r.top),
                                c = Math.ceil(r.left), d = Math.ceil(r.bottom), h = Math.ceil(r.right), f = "0",
                                p = "0";
                            o && "vertical" !== o || c < 0 && h - e.offsetWidth > 0 && (f = -c + "px"), o && "horizontal" !== o || i < 0 && d - e.offsetHeight > 0 && (p = -i + "px"), l(e, f, p)
                        } else u(e);
                        e.style.height = (0 === t ? t : t + 4) + "px", e.style.width = (0 === n ? n : n + 4) + "px"
                    }
                }
            }, {}, c), window.WalkontableTopLeftCornerOverlay = d, c.registerOverlay(c.CLONE_TOP_LEFT_CORNER, d)
        }, {_base: 12, "helpers/dom/element": 47}],
        17: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableOverlays: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}),
                u = l.getScrollableElement, c = l.getScrollbarWidth, d = l.getScrollLeft, h = l.getScrollTop,
                f = (r = e("helpers/array"), r && r.__esModule && r || {default: r}).arrayEach,
                p = (i = e("helpers/unicode"), i && i.__esModule && i || {default: i}).isKey,
                m = (s = e("helpers/browser"), s && s.__esModule && s || {default: s}).isMobileBrowser,
                g = (a = e("eventManager"), a && a.__esModule && a || {default: a}).EventManager, w = function (e) {
                    this.wot = e, this.instance = this.wot, this.eventManager = new g(this.wot), this.wot.update("scrollbarWidth", c()), this.wot.update("scrollbarHeight", c()), this.scrollableElement = u(this.wot.wtTable.TABLE), this.prepareOverlays(), this.destroyed = !1, this.keyPressed = !1, this.spreaderLastSize = {
                        width: null,
                        height: null
                    }, this.overlayScrollPositions = {
                        master: {top: 0, left: 0},
                        top: {top: null, left: 0},
                        bottom: {top: null, left: 0},
                        left: {top: 0, left: null}
                    }, this.pendingScrollCallbacks = {
                        master: {top: 0, left: 0},
                        top: {left: 0},
                        bottom: {left: 0},
                        left: {top: 0}
                    }, this.verticalScrolling = !1, this.horizontalScrolling = !1, this.delegatedScrollCallback = !1, this.registeredListeners = [], this.registerListeners()
                };
            $traceurRuntime.createClass(w, {
                prepareOverlays: function () {
                    var e = !1;
                    return this.topOverlay ? e = this.topOverlay.updateStateOfRendering() || e : this.topOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_TOP, this.wot), "undefined" == typeof WalkontableBottomOverlay && (this.bottomOverlay = {
                        needFullRender: !1,
                        updateStateOfRendering: function () {
                            return !1
                        }
                    }), "undefined" == typeof WalkontableBottomLeftCornerOverlay && (this.bottomLeftCornerOverlay = {
                        needFullRender: !1,
                        updateStateOfRendering: function () {
                            return !1
                        }
                    }), this.bottomOverlay ? e = this.bottomOverlay.updateStateOfRendering() || e : this.bottomOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_BOTTOM, this.wot), this.leftOverlay ? e = this.leftOverlay.updateStateOfRendering() || e : this.leftOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_LEFT, this.wot), this.topOverlay.needFullRender && this.leftOverlay.needFullRender && (this.topLeftCornerOverlay ? e = this.topLeftCornerOverlay.updateStateOfRendering() || e : this.topLeftCornerOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_TOP_LEFT_CORNER, this.wot)), this.bottomOverlay.needFullRender && this.leftOverlay.needFullRender && (this.bottomLeftCornerOverlay ? e = this.bottomLeftCornerOverlay.updateStateOfRendering() || e : this.bottomLeftCornerOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER, this.wot)), this.wot.getSetting("debug") && !this.debug && (this.debug = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_DEBUG, this.wot)), e
                }, refreshAll: function () {
                    if (this.wot.drawn) {
                        if (!this.wot.wtTable.holder.parentNode) return void this.destroy();
                        this.wot.draw(!0), this.verticalScrolling && this.leftOverlay.onScroll(), this.horizontalScrolling && this.topOverlay.onScroll(), this.verticalScrolling = !1, this.horizontalScrolling = !1
                    }
                }, registerListeners: function () {
                    var e = this, t = this.topOverlay.mainTableScrollableElement,
                        n = this.leftOverlay.mainTableScrollableElement, o = [];
                    for (o.push([document.documentElement, "keydown", function (t) {
                        return e.onKeyDown(t)
                    }]), o.push([document.documentElement, "keyup", function () {
                        return e.onKeyUp()
                    }]), o.push([document, "visibilitychange", function () {
                        return e.onKeyUp()
                    }]), o.push([t, "scroll", function (t) {
                        return e.onTableScroll(t)
                    }]), t !== n && o.push([n, "scroll", function (t) {
                        return e.onTableScroll(t)
                    }]), this.topOverlay.needFullRender && (o.push([this.topOverlay.clone.wtTable.holder, "scroll", function (t) {
                        return e.onTableScroll(t)
                    }]), o.push([this.topOverlay.clone.wtTable.holder, "wheel", function (t) {
                        return e.onTableScroll(t)
                    }])), this.bottomOverlay.needFullRender && (o.push([this.bottomOverlay.clone.wtTable.holder, "scroll", function (t) {
                        return e.onTableScroll(t)
                    }]), o.push([this.bottomOverlay.clone.wtTable.holder, "wheel", function (t) {
                        return e.onTableScroll(t)
                    }])), this.leftOverlay.needFullRender && (o.push([this.leftOverlay.clone.wtTable.holder, "scroll", function (t) {
                        return e.onTableScroll(t)
                    }]), o.push([this.leftOverlay.clone.wtTable.holder, "wheel", function (t) {
                        return e.onTableScroll(t)
                    }])), this.topLeftCornerOverlay && this.topLeftCornerOverlay.needFullRender && o.push([this.topLeftCornerOverlay.clone.wtTable.holder, "wheel", function (t) {
                        return e.onTableScroll(t)
                    }]), this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.needFullRender && o.push([this.bottomLeftCornerOverlay.clone.wtTable.holder, "wheel", function (t) {
                        return e.onTableScroll(t)
                    }]), this.topOverlay.trimmingContainer !== window && this.leftOverlay.trimmingContainer !== window && o.push([window, "wheel", function (t) {
                        var n, o = t.wheelDeltaY || t.deltaY, r = t.wheelDeltaX || t.deltaX;
                        e.topOverlay.clone.wtTable.holder.contains(t.realTarget) ? n = "top" : e.bottomOverlay.clone && e.bottomOverlay.clone.wtTable.holder.contains(t.realTarget) ? n = "bottom" : e.leftOverlay.clone.wtTable.holder.contains(t.realTarget) ? n = "left" : e.topLeftCornerOverlay && e.topLeftCornerOverlay.clone && e.topLeftCornerOverlay.clone.wtTable.holder.contains(t.realTarget) ? n = "topLeft" : e.bottomLeftCornerOverlay && e.bottomLeftCornerOverlay.clone && e.bottomLeftCornerOverlay.clone.wtTable.holder.contains(t.realTarget) && (n = "bottomLeft"), ("top" == n && 0 !== o || "left" == n && 0 !== r || "bottom" == n && 0 !== o || ("topLeft" === n || "bottomLeft" === n) && (0 !== o || 0 !== r)) && t.preventDefault()
                    }]); o.length;) {
                        var r = o.pop();
                        this.eventManager.addEventListener(r[0], r[1], r[2]), this.registeredListeners.push(r)
                    }
                }, deregisterListeners: function () {
                    for (; this.registeredListeners.length;) {
                        var e = this.registeredListeners.pop();
                        this.eventManager.removeEventListener(e[0], e[1], e[2])
                    }
                }, onTableScroll: function (e) {
                    if (!m()) {
                        var t = this.leftOverlay.mainTableScrollableElement,
                            n = this.topOverlay.mainTableScrollableElement, o = e.target;
                        this.keyPressed && (n !== window && o !== window && !e.target.contains(n) || t !== window && o !== window && !e.target.contains(t)) || ("scroll" === e.type ? this.syncScrollPositions(e) : this.translateMouseWheelToScroll(e))
                    }
                }, onKeyDown: function (e) {
                    this.keyPressed = p(e.keyCode, "ARROW_UP|ARROW_RIGHT|ARROW_DOWN|ARROW_LEFT")
                }, onKeyUp: function () {
                    this.keyPressed = !1
                }, translateMouseWheelToScroll: function (e) {
                    var t = this.topOverlay.clone.wtTable.holder,
                        n = this.bottomOverlay.clone ? this.bottomOverlay.clone.wtTable.holder : null,
                        o = this.leftOverlay.clone.wtTable.holder,
                        r = this.topLeftCornerOverlay && this.topLeftCornerOverlay.clone ? this.topLeftCornerOverlay.clone.wtTable.holder : null,
                        i = this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone ? this.bottomLeftCornerOverlay.clone.wtTable.holder : null,
                        s = -.2, a = e.wheelDeltaY || -1 * e.deltaY, l = e.wheelDeltaX || -1 * e.deltaX, u = null,
                        c = {type: "wheel"}, d = e.target, h = null;
                    for (1 === e.deltaMode && (a *= 120, l *= 120); d != document && null != d;) {
                        if (d.className.indexOf("wtHolder") > -1) {
                            u = d;
                            break
                        }
                        d = d.parentNode
                    }
                    return c.target = u, u === r || u === i ? (this.syncScrollPositions(c, s * l, "x"), this.syncScrollPositions(c, s * a, "y")) : (u === t || u === n ? h = a : u === o && (h = l), this.syncScrollPositions(c, s * h)), !1
                }, syncScrollPositions: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : null,
                        n = void 0 !== arguments[2] ? arguments[2] : null;
                    if (!this.destroyed) {
                        if (0 === arguments.length) return void this.syncScrollWithMaster();
                        var o, r, i, s, a, l = this.leftOverlay.mainTableScrollableElement,
                            u = this.topOverlay.mainTableScrollableElement, c = e.target, f = 0, p = !1, m = !1,
                            g = this.wot.getSetting("preventOverflow");
                        this.topOverlay.needFullRender && (o = this.topOverlay.clone.wtTable.holder), this.bottomOverlay.needFullRender && (a = this.bottomOverlay.clone.wtTable.holder), this.leftOverlay.needFullRender && (r = this.leftOverlay.clone.wtTable.holder), this.leftOverlay.needFullRender && this.topOverlay.needFullRender && (i = this.topLeftCornerOverlay.clone.wtTable.holder), this.leftOverlay.needFullRender && this.bottomOverlay.needFullRender && (s = this.bottomLeftCornerOverlay.clone.wtTable.holder), c === document && (c = window), c === l || c === u ? (f = d(g ? this.scrollableElement : c), this.horizontalScrolling = !0, this.overlayScrollPositions.master.left = f, p = !0, this.pendingScrollCallbacks.master.left > 0 ? this.pendingScrollCallbacks.master.left-- : (o && o.scrollLeft !== f && (null == t && this.pendingScrollCallbacks.top.left++, o.scrollLeft = f, m = l !== window), a && a.scrollLeft !== f && (null == t && this.pendingScrollCallbacks.bottom.left++, a.scrollLeft = f, m = l !== window)), f = h(c), this.verticalScrolling = !0, this.overlayScrollPositions.master.top = f, p = !0, this.pendingScrollCallbacks.master.top > 0 ? this.pendingScrollCallbacks.master.top-- : r && r.scrollTop !== f && (null == t && this.pendingScrollCallbacks.left.top++, r.scrollTop = f, m = u !== window)) : c === a ? (f = d(c), this.horizontalScrolling = !0, this.overlayScrollPositions.bottom.left = f, p = !0, this.pendingScrollCallbacks.bottom.left > 0 ? this.pendingScrollCallbacks.bottom.left-- : (null == t && this.pendingScrollCallbacks.master.left++, l.scrollLeft = f, o && o.scrollLeft !== f && (null == t && this.pendingScrollCallbacks.top.left++, o.scrollLeft = f, m = u !== window)), null !== t && (p = !0, u.scrollTop += t)) : c === o ? (f = d(c), this.horizontalScrolling = !0, this.overlayScrollPositions.top.left = f, p = !0, this.pendingScrollCallbacks.top.left > 0 ? this.pendingScrollCallbacks.top.left-- : (null == t && this.pendingScrollCallbacks.master.left++, l.scrollLeft = f), null !== t && (p = !0, u.scrollTop += t), a && a.scrollLeft !== f && (null == t && this.pendingScrollCallbacks.bottom.left++, a.scrollLeft = f, m = u !== window)) : c === r ? (f = h(c), this.overlayScrollPositions.left.top !== f && (this.verticalScrolling = !0, this.overlayScrollPositions.left.top = f, p = !0, this.pendingScrollCallbacks.left.top > 0 ? this.pendingScrollCallbacks.left.top-- : (null == t && this.pendingScrollCallbacks.master.top++, u.scrollTop = f)), null !== t && (p = !0, u.scrollLeft += t)) : c !== i && c !== s || null !== t && (p = !0, "x" === n ? u.scrollLeft += t : "y" === n && (u.scrollTop += t)), !this.keyPressed && p && "scroll" === e.type && (this.delegatedScrollCallback ? this.delegatedScrollCallback = !1 : this.refreshAll(), m && (this.delegatedScrollCallback = !0))
                    }
                }, syncScrollWithMaster: function () {
                    var e = this.topOverlay.mainTableScrollableElement, t = e, n = t.scrollLeft, o = t.scrollTop;
                    this.topOverlay.needFullRender && (this.topOverlay.clone.wtTable.holder.scrollLeft = n), this.bottomOverlay.needFullRender && (this.bottomOverlay.clone.wtTable.holder.scrollLeft = n), this.leftOverlay.needFullRender && (this.leftOverlay.clone.wtTable.holder.scrollTop = o)
                }, updateMainScrollableElements: function () {
                    this.deregisterListeners(), this.leftOverlay.updateMainScrollableElement(), this.topOverlay.updateMainScrollableElement(), this.bottomOverlay.needFullRender && this.bottomOverlay.updateMainScrollableElement(), this.scrollableElement = u(this.wot.wtTable.TABLE), this.registerListeners()
                }, destroy: function () {
                    this.eventManager.destroy(), this.topOverlay.destroy(), this.bottomOverlay.clone && this.bottomOverlay.destroy(), this.leftOverlay.destroy(), this.topLeftCornerOverlay && this.topLeftCornerOverlay.destroy(), this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone && this.bottomLeftCornerOverlay.destroy(), this.debug && this.debug.destroy(), this.destroyed = !0
                }, refresh: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    if (this.topOverlay.areElementSizesAdjusted && this.leftOverlay.areElementSizesAdjusted) {
                        var t = this.wot.wtTable.wtRootElement.parentNode || this.wot.wtTable.wtRootElement,
                            n = t.clientWidth, o = t.clientHeight;
                        n === this.spreaderLastSize.width && o === this.spreaderLastSize.height || (this.spreaderLastSize.width = n, this.spreaderLastSize.height = o, this.adjustElementsSize())
                    }
                    this.bottomOverlay.clone && this.bottomOverlay.refresh(e), this.leftOverlay.refresh(e), this.topOverlay.refresh(e), this.topLeftCornerOverlay && this.topLeftCornerOverlay.refresh(e), this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone && this.bottomLeftCornerOverlay.refresh(e), this.debug && this.debug.refresh(e)
                }, adjustElementsSize: function () {
                    var e = void 0 !== arguments[0] && arguments[0], t = this.wot.getSetting("totalColumns"),
                        n = this.wot.getSetting("totalRows"), o = this.wot.wtViewport.getRowHeaderWidth(),
                        r = this.wot.wtViewport.getColumnHeaderHeight(), i = this.wot.wtTable.hider.style;
                    i.width = o + this.leftOverlay.sumCellSizes(0, t) + "px", i.height = r + this.topOverlay.sumCellSizes(0, n) + 1 + "px", this.topOverlay.adjustElementsSize(e), this.leftOverlay.adjustElementsSize(e), this.bottomOverlay.clone && this.bottomOverlay.adjustElementsSize(e)
                }, applyToDOM: function () {
                    this.topOverlay.areElementSizesAdjusted && this.leftOverlay.areElementSizesAdjusted || this.adjustElementsSize(), this.topOverlay.applyToDOM(), this.bottomOverlay.clone && this.bottomOverlay.applyToDOM(), this.leftOverlay.applyToDOM()
                }, getParentOverlay: function (e) {
                    if (!e) return null;
                    var t = [this.topOverlay, this.leftOverlay, this.bottomOverlay, this.topLeftCornerOverlay, this.bottomLeftCornerOverlay],
                        n = null;
                    return f(t, function (t, o) {
                        t && t.clone && t.clone.wtTable.TABLE.contains(e) && (n = t.clone)
                    }), n
                }
            }, {}), window.WalkontableOverlays = w
        }, {
            eventManager: 42,
            "helpers/array": 43,
            "helpers/browser": 44,
            "helpers/dom/element": 47,
            "helpers/unicode": 56
        }],
        18: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableScroll: {
                    get: function () {
                        return p
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}), s = i.innerHeight,
                a = i.innerWidth, l = i.getScrollLeft, u = i.getScrollTop, c = i.offset,
                d = (r = e("helpers/number"), r && r.__esModule && r || {default: r}), h = d.rangeEach,
                f = d.rangeEachReverse, p = function (e) {
                    this.wot = e, this.instance = e
                };
            $traceurRuntime.createClass(p, {
                scrollViewport: function (e) {
                    if (this.wot.drawn) {
                        var t = this._getVariables(), n = t.topOverlay, o = t.leftOverlay, r = t.totalRows,
                            i = t.totalColumns, s = t.fixedRowsTop, a = t.fixedRowsBottom, l = t.fixedColumnsLeft;
                        if (e.row < 0 || e.row > Math.max(r - 1, 0)) throw new Error("row " + e.row + " does not exist");
                        if (e.col < 0 || e.col > Math.max(i - 1, 0)) throw new Error("column " + e.col + " does not exist");
                        e.row >= s && e.row < this.getFirstVisibleRow() ? n.scrollTo(e.row) : e.row > this.getLastVisibleRow() && e.row < r - a && n.scrollTo(e.row, !0), e.col >= l && e.col < this.getFirstVisibleColumn() ? o.scrollTo(e.col) : e.col > this.getLastVisibleColumn() && o.scrollTo(e.col, !0)
                    }
                }, getFirstVisibleRow: function () {
                    var e = this._getVariables(), t = e.topOverlay, n = e.wtTable, o = e.wtViewport, r = e.totalRows,
                        i = e.fixedRowsTop, a = n.getFirstVisibleRow();
                    if (t.mainTableScrollableElement === window) {
                        var l = c(n.wtRootElement), d = s(n.hider), h = s(window), p = u(window);
                        if (l.top + d - h <= p) {
                            var m = o.getColumnHeaderHeight();
                            m += t.sumCellSizes(0, i), f(r, 1, function (e) {
                                if (m += t.sumCellSizes(e - 1, e), l.top + d - m <= p) return a = e, !1
                            })
                        }
                    }
                    return a
                }, getLastVisibleRow: function () {
                    var e = this._getVariables(), t = e.topOverlay, n = e.wtTable, o = e.wtViewport, r = e.totalRows,
                        i = n.getLastVisibleRow();
                    if (t.mainTableScrollableElement === window) {
                        var a = c(n.wtRootElement), l = s(window), d = u(window);
                        if (a.top > d) {
                            var f = o.getColumnHeaderHeight();
                            h(1, r, function (e) {
                                if (f += t.sumCellSizes(e - 1, e), a.top + f - d >= l) return i = e - 2, !1
                            })
                        }
                    }
                    return i
                }, getFirstVisibleColumn: function () {
                    var e = this._getVariables(), t = e.leftOverlay, n = e.wtTable, o = e.wtViewport,
                        r = e.totalColumns, i = (e.fixedColumnsLeft, n.getFirstVisibleColumn());
                    if (t.mainTableScrollableElement === window) {
                        var s = c(n.wtRootElement), u = a(n.hider), d = a(window), h = l(window);
                        if (s.left + u - d <= h) {
                            var p = o.getRowHeaderWidth();
                            f(r, 1, function (e) {
                                if (p += t.sumCellSizes(e - 1, e), s.left + u - p <= h) return i = e, !1
                            })
                        }
                    }
                    return i
                }, getLastVisibleColumn: function () {
                    var e = this._getVariables(), t = e.leftOverlay, n = e.wtTable, o = e.wtViewport,
                        r = e.totalColumns, i = n.getLastVisibleColumn();
                    if (t.mainTableScrollableElement === window) {
                        var s = c(n.wtRootElement), u = a(window), d = l(window);
                        if (s.left > d) {
                            var f = o.getRowHeaderWidth();
                            h(1, r, function (e) {
                                if (f += t.sumCellSizes(e - 1, e), s.left + f - d >= u) return i = e - 2, !1
                            })
                        }
                    }
                    return i
                }, _getVariables: function () {
                    var e = this.wot, t = e.wtOverlays.topOverlay, n = e.wtOverlays.leftOverlay, o = e.wtTable,
                        r = e.wtViewport, i = e.getSetting("totalRows"), s = e.getSetting("totalColumns"),
                        a = e.getSetting("fixedRowsTop"), l = e.getSetting("fixedRowsBottom"),
                        u = e.getSetting("fixedColumnsLeft");
                    return {
                        topOverlay: t,
                        leftOverlay: n,
                        wtTable: o,
                        wtViewport: r,
                        totalRows: i,
                        totalColumns: s,
                        fixedRowsTop: a,
                        fixedRowsBottom: l,
                        fixedColumnsLeft: u
                    }
                }
            }, {}), window.WalkontableScroll = p
        }, {"helpers/dom/element": 47, "helpers/number": 52}],
        19: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableSelection: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a = (o = e("helpers/dom/element"),
                o && o.__esModule && o || {default: o}).addClass,
                l = (r = e("border"), r && r.__esModule && r || {default: r}).WalkontableBorder,
                u = (i = e("cell/coords"), i && i.__esModule && i || {default: i}).WalkontableCellCoords,
                c = (s = e("cell/range"), s && s.__esModule && s || {default: s}).WalkontableCellRange,
                d = function (e, t) {
                    this.settings = e, this.cellRange = t || null, this.instanceBorders = {}
                };
            $traceurRuntime.createClass(d, {
                getBorder: function (e) {
                    return this.instanceBorders[e.guid] ? this.instanceBorders[e.guid] : void (this.instanceBorders[e.guid] = new l(e, this.settings))
                }, isEmpty: function () {
                    return null === this.cellRange
                }, add: function (e) {
                    this.isEmpty() ? this.cellRange = new c(e, e, e) : this.cellRange.expand(e)
                }, replace: function (e, t) {
                    if (!this.isEmpty()) {
                        if (this.cellRange.from.isEqual(e)) return this.cellRange.from = t, !0;
                        if (this.cellRange.to.isEqual(e)) return this.cellRange.to = t, !0
                    }
                    return !1
                }, clear: function () {
                    this.cellRange = null
                }, getCorners: function () {
                    var e = this.cellRange.getTopLeftCorner(), t = this.cellRange.getBottomRightCorner();
                    return [e.row, e.col, t.row, t.col]
                }, addClassAtCoords: function (e, t, n, o) {
                    var r = e.wtTable.getCell(new u(t, n));
                    "object" == typeof r && a(r, o)
                }, draw: function (e) {
                    if (this.isEmpty()) {
                        if (this.settings.border) {
                            var t = this.getBorder(e);
                            t && t.disappear()
                        }
                    } else {
                        for (var n, o, r, i = e.wtTable.getRenderedRowsCount(), s = e.wtTable.getRenderedColumnsCount(), l = this.getCorners(), u = 0; u < s; u++) if (o = e.wtTable.columnFilter.renderedToSource(u), o >= l[1] && o <= l[3] && (r = e.wtTable.getColumnHeader(o))) {
                            var c = [];
                            this.settings.highlightHeaderClassName && c.push(this.settings.highlightHeaderClassName), this.settings.highlightColumnClassName && c.push(this.settings.highlightColumnClassName), a(r, c)
                        }
                        for (var d = 0; d < i; d++) {
                            if (n = e.wtTable.rowFilter.renderedToSource(d), n >= l[0] && n <= l[2] && (r = e.wtTable.getRowHeader(n))) {
                                var h = [];
                                this.settings.highlightHeaderClassName && h.push(this.settings.highlightHeaderClassName), this.settings.highlightRowClassName && h.push(this.settings.highlightRowClassName), a(r, h)
                            }
                            for (var f = 0; f < s; f++) o = e.wtTable.columnFilter.renderedToSource(f), n >= l[0] && n <= l[2] && o >= l[1] && o <= l[3] ? this.settings.className && this.addClassAtCoords(e, n, o, this.settings.className) : n >= l[0] && n <= l[2] ? this.settings.highlightRowClassName && this.addClassAtCoords(e, n, o, this.settings.highlightRowClassName) : o >= l[1] && o <= l[3] && this.settings.highlightColumnClassName && this.addClassAtCoords(e, n, o, this.settings.highlightColumnClassName)
                        }
                        if (e.getSetting("onBeforeDrawBorders", l, this.settings.className), this.settings.border) {
                            var p = this.getBorder(e);
                            p && p.appear(l)
                        }
                    }
                }
            }, {}), window.WalkontableSelection = d
        }, {border: 3, "cell/coords": 6, "cell/range": 7, "helpers/dom/element": 47}],
        20: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableSettings: {
                    get: function () {
                        return i
                    }
                }, __esModule: {value: !0}
            });
            var o, r = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}).fastInnerText,
                i = function (e, t) {
                    var n = this;
                    this.wot = e, this.instance = e, this.defaults = {
                        table: void 0,
                        debug: !1,
                        externalRowCalculator: !1,
                        stretchH: "none",
                        currentRowClassName: null,
                        currentColumnClassName: null,
                        preventOverflow: function () {
                            return !1
                        },
                        data: void 0,
                        fixedColumnsLeft: 0,
                        fixedRowsTop: 0,
                        fixedRowsBottom: 0,
                        minSpareRows: 0,
                        rowHeaders: function () {
                            return []
                        },
                        columnHeaders: function () {
                            return []
                        },
                        totalRows: void 0,
                        totalColumns: void 0,
                        cellRenderer: function (e, t, o) {
                            var i = n.getSetting("data", e, t);
                            r(o, void 0 === i || null === i ? "" : i)
                        },
                        columnWidth: function (e) {
                        },
                        rowHeight: function (e) {
                        },
                        defaultRowHeight: 23,
                        defaultColumnWidth: 50,
                        selections: null,
                        hideBorderOnMouseDownOver: !1,
                        viewportRowCalculatorOverride: null,
                        viewportColumnCalculatorOverride: null,
                        onCellMouseDown: null,
                        onCellMouseOver: null,
                        onCellMouseUp: null,
                        onCellDblClick: null,
                        onCellCornerMouseDown: null,
                        onCellCornerDblClick: null,
                        beforeDraw: null,
                        onDraw: null,
                        onBeforeDrawBorders: null,
                        onScrollVertically: null,
                        onScrollHorizontally: null,
                        onBeforeTouchScroll: null,
                        onAfterMomentumScroll: null,
                        onBeforeStretchingColumnWidth: function (e) {
                            return e
                        },
                        onModifyRowHeaderWidth: null,
                        scrollbarWidth: 10,
                        scrollbarHeight: 10,
                        renderAllRows: !1,
                        groups: !1,
                        rowHeaderWidth: null,
                        columnHeaderHeight: null,
                        headerClassName: null
                    }, this.settings = {};
                    for (var o in this.defaults) if (this.defaults.hasOwnProperty(o)) if (void 0 !== t[o]) this.settings[o] = t[o]; else {
                        if (void 0 === this.defaults[o]) throw new Error('A required setting "' + o + '" was not provided');
                        this.settings[o] = this.defaults[o]
                    }
                };
            $traceurRuntime.createClass(i, {
                update: function (e, t) {
                    if (void 0 === t) for (var n in e) e.hasOwnProperty(n) && (this.settings[n] = e[n]); else this.settings[e] = t;
                    return this.wot
                }, getSetting: function (e, t, n, o, r) {
                    return "function" == typeof this.settings[e] ? this.settings[e](t, n, o, r) : void 0 !== t && Array.isArray(this.settings[e]) ? this.settings[e][t] : this.settings[e]
                }, has: function (e) {
                    return !!this.settings[e]
                }
            }, {}), window.WalkontableSettings = i
        }, {"helpers/dom/element": 47}],
        21: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableTable: {
                    get: function () {
                        return S
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}),
                d = c.getStyle, h = c.getTrimmingContainer, f = c.hasClass, p = c.index, m = c.offset,
                g = c.removeClass, w = c.removeTextNodes, v = c.overlayContainsElement, y = c.closest,
                b = (r = e("helpers/function"), r && r.__esModule && r || {default: r}).isFunction,
                C = (i = e("cell/coords"), i && i.__esModule && i || {default: i}).WalkontableCellCoords,
                _ = ((s = e("cell/range"), s && s.__esModule && s || {default: s}).WalkontableCellRange, (a = e("filter/column"), a && a.__esModule && a || {default: a}).WalkontableColumnFilter),
                R = (l = e("filter/row"), l && l.__esModule && l || {default: l}).WalkontableRowFilter,
                M = (u = e("tableRenderer"), u && u.__esModule && u || {default: u}).WalkontableTableRenderer,
                S = function (e, t) {
                    var n = this;
                    this.wot = e, this.instance = this.wot, this.TABLE = t, this.TBODY = null, this.THEAD = null, this.COLGROUP = null, this.tableOffset = 0, this.holderOffset = 0, w(this.TABLE), this.spreader = this.createSpreader(this.TABLE), this.hider = this.createHider(this.spreader), this.holder = this.createHolder(this.hider), this.wtRootElement = this.holder.parentNode, this.alignOverlaysWithTrimmingContainer(), this.fixTableDomTree(), this.colgroupChildrenLength = this.COLGROUP.childNodes.length, this.theadChildrenLength = this.THEAD.firstChild ? this.THEAD.firstChild.childNodes.length : 0, this.tbodyChildrenLength = this.TBODY.childNodes.length, this.rowFilter = null, this.columnFilter = null, this.correctHeaderWidth = !1;
                    var o = this.wot.wtSettings.settings.rowHeaderWidth;
                    this.wot.wtSettings.settings.rowHeaderWidth = function () {
                        return n._modifyRowHeaderWidth(o)
                    }
                };
            $traceurRuntime.createClass(S, {
                fixTableDomTree: function () {
                    this.TBODY = this.TABLE.querySelector("tbody"), this.TBODY || (this.TBODY = document.createElement("tbody"), this.TABLE.appendChild(this.TBODY)), this.THEAD = this.TABLE.querySelector("thead"), this.THEAD || (this.THEAD = document.createElement("thead"), this.TABLE.insertBefore(this.THEAD, this.TBODY)), this.COLGROUP = this.TABLE.querySelector("colgroup"), this.COLGROUP || (this.COLGROUP = document.createElement("colgroup"), this.TABLE.insertBefore(this.COLGROUP, this.THEAD)), this.wot.getSetting("columnHeaders").length && !this.THEAD.childNodes.length && this.THEAD.appendChild(document.createElement("TR"))
                }, createSpreader: function (e) {
                    var t, n = e.parentNode;
                    return n && 1 === n.nodeType && f(n, "wtHolder") || (t = document.createElement("div"), t.className = "wtSpreader", n && n.insertBefore(t, e), t.appendChild(e)), t.style.position = "relative", t
                }, createHider: function (e) {
                    var t, n = e.parentNode;
                    return n && 1 === n.nodeType && f(n, "wtHolder") || (t = document.createElement("div"), t.className = "wtHider", n && n.insertBefore(t, e), t.appendChild(e)), t
                }, createHolder: function (e) {
                    var t, n = e.parentNode;
                    return n && 1 === n.nodeType && f(n, "wtHolder") || (t = document.createElement("div"), t.style.position = "relative", t.className = "wtHolder", n && n.insertBefore(t, e), this.isWorkingOnClone() || (t.parentNode.className += "ht_master handsontable"), t.appendChild(e)), t
                }, alignOverlaysWithTrimmingContainer: function () {
                    var e = h(this.wtRootElement);
                    if (!this.isWorkingOnClone()) if (this.holder.parentNode.style.position = "relative", e === window) {
                        var t = this.wot.getSetting("preventOverflow");
                        t || (this.holder.style.overflow = "visible", this.wtRootElement.style.overflow = "visible")
                    } else this.holder.style.width = d(e, "width"), this.holder.style.height = d(e, "height"), this.holder.style.overflow = ""
                }, isWorkingOnClone: function () {
                    return !!this.wot.cloneSource
                }, draw: function (e) {
                    var t = this.wot, n = t.wtOverlays, o = t.wtViewport, r = this.instance.getSetting("totalRows"),
                        i = this.wot.getSetting("rowHeaders").length, s = this.wot.getSetting("columnHeaders").length,
                        a = !1;
                    if (!this.isWorkingOnClone() && (this.holderOffset = m(this.holder), e = o.createRenderCalculators(e), i && !this.wot.getSetting("fixedColumnsLeft"))) {
                        var l = n.leftOverlay.getScrollPosition(), u = this.correctHeaderWidth;
                        this.correctHeaderWidth = l > 0, u !== this.correctHeaderWidth && (e = !1)
                    }
                    if (this.isWorkingOnClone() || (a = n.prepareOverlays()), e) this.isWorkingOnClone() || o.createVisibleCalculators(), n && n.refresh(!0); else {
                        this.isWorkingOnClone() ? this.tableOffset = this.wot.cloneSource.wtTable.tableOffset : this.tableOffset = m(this.TABLE);
                        var c;
                        c = WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER) ? 0 : WalkontableOverlay.isOverlayTypeOf(this.instance.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.instance.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER) ? Math.max(r - this.wot.getSetting("fixedRowsBottom"), 0) : o.rowsRenderCalculator.startRow;
                        var d;
                        d = WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_LEFT) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER) ? 0 : o.columnsRenderCalculator.startColumn, this.rowFilter = new R(c, r, s), this.columnFilter = new _(d, this.wot.getSetting("totalColumns"), i), this.alignOverlaysWithTrimmingContainer(), this._doDraw()
                    }
                    return this.refreshSelections(e), this.isWorkingOnClone() || (n.topOverlay.resetFixedPosition(), n.bottomOverlay.clone && n.bottomOverlay.resetFixedPosition(), n.leftOverlay.resetFixedPosition(), n.topLeftCornerOverlay && n.topLeftCornerOverlay.resetFixedPosition(), n.bottomLeftCornerOverlay && n.bottomLeftCornerOverlay.clone && n.bottomLeftCornerOverlay.resetFixedPosition()), a && n.syncScrollWithMaster(), this.wot.drawn = !0, this
                }, _doDraw: function () {
                    var e = new M(this);
                    e.render()
                }, removeClassFromCells: function (e) {
                    for (var t = this.TABLE.querySelectorAll("." + e), n = 0, o = t.length; n < o; n++) g(t[n], e)
                }, refreshSelections: function (e) {
                    if (this.wot.selections) {
                        var t = this.wot.selections.length;
                        if (e) for (var n = 0; n < t; n++) this.wot.selections[n].settings.className && this.removeClassFromCells(this.wot.selections[n].settings.className), this.wot.selections[n].settings.highlightHeaderClassName && this.removeClassFromCells(this.wot.selections[n].settings.highlightHeaderClassName), this.wot.selections[n].settings.highlightRowClassName && this.removeClassFromCells(this.wot.selections[n].settings.highlightRowClassName), this.wot.selections[n].settings.highlightColumnClassName && this.removeClassFromCells(this.wot.selections[n].settings.highlightColumnClassName);
                        for (var o = 0; o < t; o++) this.wot.selections[o].draw(this.wot, e)
                    }
                }, getCell: function (e) {
                    if (this.isRowBeforeRenderedRows(e.row)) return -1;
                    if (this.isRowAfterRenderedRows(e.row)) return -2;
                    var t = this.TBODY.childNodes[this.rowFilter.sourceToRendered(e.row)];
                    return t ? t.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(e.col)] : void 0
                }, getColumnHeader: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : 0, n = this.THEAD.childNodes[t];
                    if (n) return n.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(e)]
                }, getRowHeader: function (e) {
                    if (0 === this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0)) return null;
                    var t = this.TBODY.childNodes[this.rowFilter.sourceToRendered(e)];
                    return t ? t.childNodes[0] : void 0
                }, getCoords: function (e) {
                    "TD" !== e.nodeName && "TH" !== e.nodeName && (e = y(e, ["TD", "TH"]));
                    var t = e.parentNode, n = t.parentNode, o = p(t), r = e.cellIndex;
                    return v(WalkontableOverlay.CLONE_TOP_LEFT_CORNER, e) || v(WalkontableOverlay.CLONE_TOP, e) ? "THEAD" === n.nodeName && (o -= n.childNodes.length) : o = n === this.THEAD ? this.rowFilter.visibleColHeadedRowToSourceRow(o) : this.rowFilter.renderedToSource(o), r = v(WalkontableOverlay.CLONE_TOP_LEFT_CORNER, e) || v(WalkontableOverlay.CLONE_LEFT, e) ? this.columnFilter.offsettedTH(r) : this.columnFilter.visibleRowHeadedColumnToSourceColumn(r), new C(o, r)
                }, getTrForRow: function (e) {
                    return this.TBODY.childNodes[this.rowFilter.sourceToRendered(e)]
                }, getFirstRenderedRow: function () {
                    return this.wot.wtViewport.rowsRenderCalculator.startRow
                }, getFirstVisibleRow: function () {
                    return this.wot.wtViewport.rowsVisibleCalculator.startRow
                }, getFirstRenderedColumn: function () {
                    return this.wot.wtViewport.columnsRenderCalculator.startColumn
                }, getFirstVisibleColumn: function () {
                    return this.wot.wtViewport.columnsVisibleCalculator.startColumn
                }, getLastRenderedRow: function () {
                    return this.wot.wtViewport.rowsRenderCalculator.endRow
                }, getLastVisibleRow: function () {
                    return this.wot.wtViewport.rowsVisibleCalculator.endRow
                }, getLastRenderedColumn: function () {
                    return this.wot.wtViewport.columnsRenderCalculator.endColumn
                }, getLastVisibleColumn: function () {
                    return this.wot.wtViewport.columnsVisibleCalculator.endColumn
                }, isRowBeforeRenderedRows: function (e) {
                    return this.rowFilter && this.rowFilter.sourceToRendered(e) < 0 && e >= 0
                }, isRowAfterViewport: function (e) {
                    return this.rowFilter && this.rowFilter.sourceToRendered(e) > this.getLastVisibleRow()
                }, isRowAfterRenderedRows: function (e) {
                    return this.rowFilter && this.rowFilter.sourceToRendered(e) > this.getLastRenderedRow()
                }, isColumnBeforeViewport: function (e) {
                    return this.columnFilter && this.columnFilter.sourceToRendered(e) < 0 && e >= 0
                }, isColumnAfterViewport: function (e) {
                    return this.columnFilter && this.columnFilter.sourceToRendered(e) > this.getLastVisibleColumn()
                }, isLastRowFullyVisible: function () {
                    return this.getLastVisibleRow() === this.getLastRenderedRow()
                }, isLastColumnFullyVisible: function () {
                    return this.getLastVisibleColumn() === this.getLastRenderedColumn()
                }, getRenderedColumnsCount: function () {
                    var e = this.wot.wtViewport.columnsRenderCalculator.count, t = this.wot.getSetting("totalColumns");
                    if (this.wot.isOverlayName(WalkontableOverlay.CLONE_DEBUG)) e = t; else if (this.wot.isOverlayName(WalkontableOverlay.CLONE_LEFT) || this.wot.isOverlayName(WalkontableOverlay.CLONE_TOP_LEFT_CORNER) || this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) return Math.min(this.wot.getSetting("fixedColumnsLeft"), t);
                    return e
                }, getRenderedRowsCount: function () {
                    var e = this.wot.wtViewport.rowsRenderCalculator.count, t = this.wot.getSetting("totalRows");
                    return this.wot.isOverlayName(WalkontableOverlay.CLONE_DEBUG) ? e = t : this.wot.isOverlayName(WalkontableOverlay.CLONE_TOP) || this.wot.isOverlayName(WalkontableOverlay.CLONE_TOP_LEFT_CORNER) ? e = Math.min(this.wot.getSetting("fixedRowsTop"), t) : (this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM) || this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) && (e = Math.min(this.wot.getSetting("fixedRowsBottom"), t)), e
                }, getVisibleRowsCount: function () {
                    return this.wot.wtViewport.rowsVisibleCalculator.count
                }, allRowsInViewport: function () {
                    return this.wot.getSetting("totalRows") == this.getVisibleRowsCount()
                }, getRowHeight: function (e) {
                    var t = this.wot.wtSettings.settings.rowHeight(e), n = this.wot.wtViewport.oversizedRows[e];
                    return void 0 !== n && (t = void 0 === t ? n : Math.max(t, n)), t
                }, getColumnHeaderHeight: function (e) {
                    var t = this.wot.wtSettings.settings.defaultRowHeight,
                        n = this.wot.wtViewport.oversizedColumnHeaders[e];
                    return void 0 !== n && (t = t ? Math.max(t, n) : n), t
                }, getVisibleColumnsCount: function () {
                    return this.wot.wtViewport.columnsVisibleCalculator.count
                }, allColumnsInViewport: function () {
                    return this.wot.getSetting("totalColumns") == this.getVisibleColumnsCount()
                }, getColumnWidth: function (e) {
                    var t = this.wot.wtSettings.settings.columnWidth;
                    return "function" == typeof t ? t = t(e) : "object" == typeof t && (t = t[e]), t || this.wot.wtSettings.settings.defaultColumnWidth
                }, getStretchedColumnWidth: function (e) {
                    var t = this.getColumnWidth(e),
                        n = null == t ? this.instance.wtSettings.settings.defaultColumnWidth : t,
                        o = this.wot.wtViewport.columnsRenderCalculator;
                    if (o) {
                        var r = o.getStretchedColumnWidth(e, n);
                        r && (n = r)
                    }
                    return n
                }, _modifyRowHeaderWidth: function (e) {
                    var t = b(e) ? e() : null;
                    return Array.isArray(t) ? (t = $traceurRuntime.spread(t), t[t.length - 1] = this._correctRowHeaderWidth(t[t.length - 1])) : t = this._correctRowHeaderWidth(t), t
                }, _correctRowHeaderWidth: function (e) {
                    return "number" != typeof e && (e = this.wot.getSetting("defaultColumnWidth")), this.correctHeaderWidth && e++, e
                }
            }, {}), window.WalkontableTable = S
        }, {
            "cell/coords": 6,
            "cell/range": 7,
            "filter/column": 10,
            "filter/row": 11,
            "helpers/dom/element": 47,
            "helpers/function": 50,
            tableRenderer: 22
        }],
        22: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n = document.createElement("TH");
                return t.insertBefore(n, e), t.removeChild(e), n
            }

            function r(e, t) {
                var n = document.createElement("TD");
                return t.insertBefore(n, e), t.removeChild(e), n
            }

            Object.defineProperties(n, {
                WalkontableTableRenderer: {
                    get: function () {
                        return p
                    }
                }, __esModule: {value: !0}
            });
            var i, s = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), a = s.addClass,
                l = s.empty, u = s.getScrollbarWidth, c = s.hasClass, d = s.innerHeight, h = s.outerWidth, f = !1,
                p = function (e) {
                    this.wtTable = e, this.wot = e.instance, this.instance = e.instance, this.rowFilter = e.rowFilter, this.columnFilter = e.columnFilter, this.TABLE = e.TABLE, this.THEAD = e.THEAD, this.TBODY = e.TBODY, this.COLGROUP = e.COLGROUP, this.rowHeaders = [], this.rowHeaderCount = 0, this.columnHeaders = [], this.columnHeaderCount = 0, this.fixedRowsTop = 0, this.fixedRowsBottom = 0
                };
            $traceurRuntime.createClass(p, {
                render: function () {
                    if (!this.wtTable.isWorkingOnClone()) {
                        var e = {};
                        if (this.wot.getSetting("beforeDraw", !0, e), e.skipRender === !0) return
                    }
                    this.rowHeaders = this.wot.getSetting("rowHeaders"), this.rowHeaderCount = this.rowHeaders.length, this.fixedRowsTop = this.wot.getSetting("fixedRowsTop"), this.fixedRowsBottom = this.wot.getSetting("fixedRowsBottom"), this.columnHeaders = this.wot.getSetting("columnHeaders"), this.columnHeaderCount = this.columnHeaders.length;
                    var t, n = this.wtTable.getRenderedColumnsCount(), o = this.wtTable.getRenderedRowsCount(),
                        r = this.wot.getSetting("totalColumns"), i = this.wot.getSetting("totalRows"), s = !1;
                    if ((WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) && (this.columnHeaders = [], this.columnHeaderCount = 0), r >= 0 && (this.adjustAvailableNodes(), s = !0, this.renderColumnHeaders(), this.renderRows(i, o, n), this.wtTable.isWorkingOnClone() || (t = this.wot.wtViewport.getWorkspaceWidth(), this.wot.wtViewport.containerWidth = null), this.adjustColumnWidths(n), this.markOversizedColumnHeaders(), this.adjustColumnHeaderHeights()), s || this.adjustAvailableNodes(), this.removeRedundantRows(o), this.wtTable.isWorkingOnClone() && !this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM) || this.markOversizedRows(), this.wtTable.isWorkingOnClone()) this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM) && this.wot.cloneSource.wtOverlays.adjustElementsSize(); else {
                        this.wot.wtViewport.createVisibleCalculators(), this.wot.wtOverlays.refresh(!1), this.wot.wtOverlays.applyToDOM();
                        var a = h(this.wtTable.hider), l = h(this.wtTable.TABLE);
                        if (0 !== a && l !== a && this.adjustColumnWidths(n), t !== this.wot.wtViewport.getWorkspaceWidth()) {
                            this.wot.wtViewport.containerWidth = null;
                            var u = this.wtTable.getFirstRenderedColumn(), c = this.wtTable.getLastRenderedColumn(),
                                d = this.wot.getSetting("defaultColumnWidth"),
                                f = this.wot.getSetting("rowHeaderWidth");
                            if (f = this.instance.getSetting("onModifyRowHeaderWidth", f), null != f) for (var p = 0; p < this.rowHeaderCount; p++) {
                                var m = Array.isArray(f) ? f[p] : f;
                                m = null == m ? d : m, this.COLGROUP.childNodes[p].style.width = m + "px"
                            }
                            for (var g = u; g < c; g++) {
                                var w = this.wtTable.getStretchedColumnWidth(g),
                                    v = this.columnFilter.sourceToRendered(g);
                                this.COLGROUP.childNodes[v + this.rowHeaderCount].style.width = w + "px"
                            }
                        }
                        this.wot.getSetting("onDraw", !0)
                    }
                }, removeRedundantRows: function (e) {
                    for (; this.wtTable.tbodyChildrenLength > e;) this.TBODY.removeChild(this.TBODY.lastChild), this.wtTable.tbodyChildrenLength--
                }, renderRows: function (e, t, n) {
                    for (var o, r, i = 0, s = this.rowFilter.renderedToSource(i), a = this.wtTable.isWorkingOnClone(); s < e && s >= 0 && (!f && i > 1e3 && (f = !0, console.warn('Performance tip: Handsontable rendered more than 1000 visible rows. Consider limiting the number of rendered rows by specifying the table height and/or turning off the "renderAllRows" option.')), void 0 === t || i !== t);) {
                        if (r = this.getOrCreateTrForRow(i, r), this.renderRowHeaders(s, r), this.adjustColumns(r, n + this.rowHeaderCount), o = this.renderCells(s, r, n), a && !this.wot.isOverlayName(WalkontableOverlay.CLONE_BOTTOM) || this.resetOversizedRow(s), r.firstChild) {
                            var l = this.wot.wtTable.getRowHeight(s);
                            l ? (l--, r.firstChild.style.height = l + "px") : r.firstChild.style.height = ""
                        }
                        i++, s = this.rowFilter.renderedToSource(i)
                    }
                }, resetOversizedRow: function (e) {
                    this.wot.getSetting("externalRowCalculator") || this.wot.wtViewport.oversizedRows && this.wot.wtViewport.oversizedRows[e] && (this.wot.wtViewport.oversizedRows[e] = void 0)
                }, markOversizedRows: function () {
                    if (!this.wot.getSetting("externalRowCalculator")) {
                        var e, t, n, o, r, i = this.instance.wtTable.TBODY.childNodes.length,
                            s = i * this.instance.wtSettings.settings.defaultRowHeight,
                            a = d(this.instance.wtTable.TBODY) - 1;
                        this.instance.getSetting("totalRows");
                        if (s !== a || this.instance.getSetting("fixedRowsBottom")) for (; i;) i--, n = this.instance.wtTable.rowFilter.renderedToSource(i), e = this.instance.wtTable.getRowHeight(n), o = this.instance.wtTable.getTrForRow(n), r = o.querySelector("th"), t = r ? d(r) : d(o) - 1, (!e && this.instance.wtSettings.settings.defaultRowHeight < t || e < t) && (this.instance.wtViewport.oversizedRows[n] = ++t)
                    }
                }, markOversizedColumnHeaders: function () {
                    var e = this.wot.getOverlayName();
                    if (this.columnHeaderCount && !this.wot.wtViewport.hasOversizedColumnHeadersMarked[e] && !this.wtTable.isWorkingOnClone()) {
                        for (var t = this.wtTable.getRenderedColumnsCount(), n = 0; n < this.columnHeaderCount; n++) for (var o = -1 * this.rowHeaderCount; o < t; o++) this.markIfOversizedColumnHeader(o);
                        this.wot.wtViewport.hasOversizedColumnHeadersMarked[e] = !0
                    }
                }, adjustColumnHeaderHeights: function () {
                    for (var e = this.wot.getSetting("columnHeaders"), t = this.wot.wtTable.THEAD.childNodes, n = this.wot.wtViewport.oversizedColumnHeaders, o = 0, r = e.length; o < r; o++) if (n[o]) {
                        if (!t[o] || 0 === t[o].childNodes.length) return;
                        t[o].childNodes[0].style.height = n[o] + "px"
                    }
                }, markIfOversizedColumnHeader: function (e) {
                    for (var t, n, o, r = this.wot.wtTable.columnFilter.renderedToSource(e), i = this.columnHeaderCount, s = this.wot.wtSettings.settings.defaultRowHeight, a = this.wot.getSetting("columnHeaderHeight") || []; i;) i--, t = this.wot.wtTable.getColumnHeaderHeight(i), n = this.wot.wtTable.getColumnHeader(r, i), n && (o = d(n), (!t && s < o || t < o) && (this.wot.wtViewport.oversizedColumnHeaders[i] = o), Array.isArray(a) ? null != a[i] && (this.wot.wtViewport.oversizedColumnHeaders[i] = a[i]) : isNaN(a) || (this.wot.wtViewport.oversizedColumnHeaders[i] = a), this.wot.wtViewport.oversizedColumnHeaders[i] < (a[i] || a) && (this.wot.wtViewport.oversizedColumnHeaders[i] = a[i] || a))
                }, renderCells: function (e, t, n) {
                    for (var o, i, s = 0; s < n; s++) i = this.columnFilter.renderedToSource(s), o = 0 === s ? t.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(i)] : o.nextSibling, "TH" == o.nodeName && (o = r(o, t)), c(o, "hide") || (o.className = ""), o.removeAttribute("style"), this.wot.wtSettings.settings.cellRenderer(e, i, o);
                    return o
                }, adjustColumnWidths: function (e) {
                    var t = 0, n = this.wot.cloneSource ? this.wot.cloneSource : this.wot, o = n.wtTable.holder,
                        r = this.wot.getSetting("defaultColumnWidth"), i = this.wot.getSetting("rowHeaderWidth");
                    if (o.offsetHeight < o.scrollHeight && (t = u()), this.wot.wtViewport.columnsRenderCalculator.refreshStretching(this.wot.wtViewport.getViewportWidth() - t), i = this.instance.getSetting("onModifyRowHeaderWidth", i), null != i) for (var s = 0; s < this.rowHeaderCount; s++) {
                        var a = Array.isArray(i) ? i[s] : i;
                        a = null == a ? r : a, this.COLGROUP.childNodes[s].style.width = a + "px"
                    }
                    for (var l = 0; l < e; l++) {
                        var c = this.wtTable.getStretchedColumnWidth(this.columnFilter.renderedToSource(l));
                        this.COLGROUP.childNodes[l + this.rowHeaderCount].style.width = c + "px"
                    }
                }, appendToTbody: function (e) {
                    this.TBODY.appendChild(e), this.wtTable.tbodyChildrenLength++
                }, getOrCreateTrForRow: function (e, t) {
                    var n;
                    return e >= this.wtTable.tbodyChildrenLength ? (n = this.createRow(), this.appendToTbody(n)) : n = 0 === e ? this.TBODY.firstChild : t.nextSibling, n.className && n.removeAttribute("class"), n
                }, createRow: function () {
                    for (var e = document.createElement("TR"), t = 0; t < this.rowHeaderCount; t++) e.appendChild(document.createElement("TH"));
                    return e
                }, renderRowHeader: function (e, t, n) {
                    n.className = "", n.removeAttribute("style"), this.rowHeaders[t](e, n, t)
                }, renderRowHeaders: function (e, t) {
                    for (var n = t.firstChild, r = 0; r < this.rowHeaderCount; r++) n ? "TD" == n.nodeName && (n = o(n, t)) : (n = document.createElement("TH"), t.appendChild(n)), this.renderRowHeader(e, r, n), n = n.nextSibling
                }, adjustAvailableNodes: function () {
                    this.adjustColGroups(), this.adjustThead()
                }, renderColumnHeaders: function () {
                    if (this.columnHeaderCount) for (var e = this.wtTable.getRenderedColumnsCount(), t = 0; t < this.columnHeaderCount; t++) for (var n = this.getTrForColumnHeaders(t), o = -1 * this.rowHeaderCount; o < e; o++) {
                        var r = this.columnFilter.renderedToSource(o);
                        this.renderColumnHeader(t, r, n.childNodes[o + this.rowHeaderCount])
                    }
                }, adjustColGroups: function () {
                    for (var e = this.wtTable.getRenderedColumnsCount(); this.wtTable.colgroupChildrenLength < e + this.rowHeaderCount;) this.COLGROUP.appendChild(document.createElement("COL")), this.wtTable.colgroupChildrenLength++;
                    for (; this.wtTable.colgroupChildrenLength > e + this.rowHeaderCount;) this.COLGROUP.removeChild(this.COLGROUP.lastChild), this.wtTable.colgroupChildrenLength--;
                    this.rowHeaderCount && a(this.COLGROUP.childNodes[0], "rowHeader")
                }, adjustThead: function () {
                    var e = this.wtTable.getRenderedColumnsCount(), t = this.THEAD.firstChild;
                    if (this.columnHeaders.length) {
                        for (var n = 0, o = this.columnHeaders.length; n < o; n++) {
                            for (t = this.THEAD.childNodes[n], t || (t = document.createElement("TR"), this.THEAD.appendChild(t)), this.theadChildrenLength = t.childNodes.length; this.theadChildrenLength < e + this.rowHeaderCount;) t.appendChild(document.createElement("TH")), this.theadChildrenLength++;
                            for (; this.theadChildrenLength > e + this.rowHeaderCount;) t.removeChild(t.lastChild), this.theadChildrenLength--
                        }
                        var r = this.THEAD.childNodes.length;
                        if (r > this.columnHeaders.length) for (var i = this.columnHeaders.length; i < r; i++) this.THEAD.removeChild(this.THEAD.lastChild)
                    } else t && l(t)
                }, getTrForColumnHeaders: function (e) {
                    return this.THEAD.childNodes[e]
                }, renderColumnHeader: function (e, t, n) {
                    return n.className = "", n.removeAttribute("style"), this.columnHeaders[e](t, n, e)
                }, adjustColumns: function (e, t) {
                    for (var n = e.childNodes.length; n < t;) {
                        var o = document.createElement("TD");
                        e.appendChild(o), n++
                    }
                    for (; n > t;) e.removeChild(e.lastChild), n--
                }, removeRedundantColumns: function (e) {
                    for (; this.wtTable.tbodyChildrenLength > e;) this.TBODY.removeChild(this.TBODY.lastChild), this.wtTable.tbodyChildrenLength--
                }
            }, {}), window.WalkontableTableRenderer = p
        }, {"helpers/dom/element": 47}],
        23: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                WalkontableViewport: {
                    get: function () {
                        return b
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), d = c.getScrollbarWidth,
                h = (c.getScrollTop, c.getStyle), f = c.offset, p = c.outerHeight, m = c.outerWidth,
                g = (i = e("helpers/object"), i && i.__esModule && i || {default: i}).objectEach,
                w = (s = e("eventManager"), s && s.__esModule && s || {default: s}).EventManager,
                v = (a = e("calculator/viewportColumns"), a && a.__esModule && a || {default: a}).WalkontableViewportColumnsCalculator,
                y = (l = e("calculator/viewportRows"), l && l.__esModule && l || {default: l}).WalkontableViewportRowsCalculator,
                b = function (e) {
                    var t = this;
                    this.wot = e, this.instance = this.wot, this.oversizedRows = [], this.oversizedColumnHeaders = [], this.hasOversizedColumnHeadersMarked = {}, this.clientHeight = 0, this.containerWidth = NaN, this.rowHeaderWidth = NaN, this.rowsVisibleCalculator = null, this.columnsVisibleCalculator = null, this.eventManager = new w(this.wot), this.eventManager.addEventListener(window, "resize", function () {
                        t.clientHeight = t.getWorkspaceHeight()
                    })
                };
            $traceurRuntime.createClass(b, {
                getWorkspaceHeight: function () {
                    var e, t = this.instance.wtOverlays.topOverlay.trimmingContainer, n = 0;
                    return t === window ? n = document.documentElement.clientHeight : (e = p(t), n = e > 0 && t.clientHeight > 0 ? t.clientHeight : 1 / 0), n
                }, getWorkspaceWidth: function () {
                    var e, t, n = this.wot.getSetting("totalColumns"),
                        o = this.instance.wtOverlays.leftOverlay.trimmingContainer, r = this.wot.getSetting("stretchH"),
                        i = document.documentElement.offsetWidth, s = this.wot.getSetting("preventOverflow");
                    return s ? m(this.instance.wtTable.wtRootElement) : (e = u.freezeOverlays ? Math.min(i - this.getWorkspaceOffset().left, i) : Math.min(this.getContainerFillWidth(), i - this.getWorkspaceOffset().left, i), o === window && n > 0 && this.sumColumnWidths(0, n - 1) > e ? document.documentElement.clientWidth : o !== window && (t = h(this.instance.wtOverlays.leftOverlay.trimmingContainer, "overflow"), "scroll" == t || "hidden" == t || "auto" == t) ? Math.max(e, o.clientWidth) : "none" !== r && r ? e : Math.max(e, m(this.instance.wtTable.TABLE)))
                }, hasVerticalScroll: function () {
                    return this.getWorkspaceActualHeight() > this.getWorkspaceHeight()
                }, hasHorizontalScroll: function () {
                    return this.getWorkspaceActualWidth() > this.getWorkspaceWidth()
                }, sumColumnWidths: function (e, t) {
                    for (var n = 0; e < t;) n += this.wot.wtTable.getColumnWidth(e), e++;
                    return n
                }, getContainerFillWidth: function () {
                    if (this.containerWidth) return this.containerWidth;
                    var e, t, n = this.instance.wtTable.holder;
                    return t = document.createElement("div"), t.style.width = "100%", t.style.height = "1px", n.appendChild(t), e = t.offsetWidth, this.containerWidth = e, n.removeChild(t), e
                }, getWorkspaceOffset: function () {
                    return f(this.wot.wtTable.TABLE)
                }, getWorkspaceActualHeight: function () {
                    return p(this.wot.wtTable.TABLE)
                }, getWorkspaceActualWidth: function () {
                    return m(this.wot.wtTable.TABLE) || m(this.wot.wtTable.TBODY) || m(this.wot.wtTable.THEAD)
                }, getColumnHeaderHeight: function () {
                    return isNaN(this.columnHeaderHeight) && (this.columnHeaderHeight = p(this.wot.wtTable.THEAD)), this.columnHeaderHeight
                }, getViewportHeight: function () {
                    var e, t = this.getWorkspaceHeight();
                    return t === 1 / 0 ? t : (e = this.getColumnHeaderHeight(), e > 0 && (t -= e), t)
                }, getRowHeaderWidth: function () {
                    var e = this.instance.getSetting("rowHeaderWidth"), t = this.instance.getSetting("rowHeaders");
                    if (e) {
                        this.rowHeaderWidth = 0;
                        for (var n = 0, o = t.length; n < o; n++) this.rowHeaderWidth += e[n] || e
                    }
                    if (this.wot.cloneSource) return this.wot.cloneSource.wtViewport.getRowHeaderWidth();
                    if (isNaN(this.rowHeaderWidth)) if (t.length) {
                        var r = this.instance.wtTable.TABLE.querySelector("TH");
                        this.rowHeaderWidth = 0;
                        for (var i = 0, s = t.length; i < s; i++) r ? (this.rowHeaderWidth += m(r), r = r.nextSibling) : this.rowHeaderWidth += 50
                    } else this.rowHeaderWidth = 0;
                    return this.rowHeaderWidth = this.instance.getSetting("onModifyRowHeaderWidth", this.rowHeaderWidth) || this.rowHeaderWidth, this.rowHeaderWidth
                }, getViewportWidth: function () {
                    var e, t = this.getWorkspaceWidth();
                    return t === 1 / 0 ? t : (e = this.getRowHeaderWidth(), e > 0 ? t - e : t)
                }, createRowsCalculator: function () {
                    var e, t, n, o, r, i, s, a = void 0 !== arguments[0] && arguments[0], l = this;
                    return this.rowHeaderWidth = NaN, e = this.wot.wtSettings.settings.renderAllRows ? 1 / 0 : this.getViewportHeight(), t = this.wot.wtOverlays.topOverlay.getScrollPosition() - this.wot.wtOverlays.topOverlay.getTableParentOffset(), t < 0 && (t = 0), n = this.wot.getSetting("fixedRowsTop"), r = this.wot.getSetting("fixedRowsBottom"), s = this.wot.getSetting("totalRows"), n && (i = this.wot.wtOverlays.topOverlay.sumCellSizes(0, n), t += i, e -= i), r && this.wot.wtOverlays.bottomOverlay.clone && (i = this.wot.wtOverlays.bottomOverlay.sumCellSizes(s - r, s), e -= i), o = this.wot.wtTable.holder.clientHeight === this.wot.wtTable.holder.offsetHeight ? 0 : d(), new y(e, t, this.wot.getSetting("totalRows"), function (e) {
                        return l.wot.wtTable.getRowHeight(e)
                    }, a ? null : this.wot.wtSettings.settings.viewportRowCalculatorOverride, a, o)
                }, createColumnsCalculator: function () {
                    var e, t, n = void 0 !== arguments[0] && arguments[0], o = this, r = this.getViewportWidth();
                    if (this.columnHeaderHeight = NaN, e = this.wot.wtOverlays.leftOverlay.getScrollPosition() - this.wot.wtOverlays.leftOverlay.getTableParentOffset(),
                    e < 0 && (e = 0), t = this.wot.getSetting("fixedColumnsLeft")) {
                        var i = this.wot.wtOverlays.leftOverlay.sumCellSizes(0, t);
                        e += i, r -= i
                    }
                    return this.wot.wtTable.holder.clientWidth !== this.wot.wtTable.holder.offsetWidth && (r -= d()), new v(r, e, this.wot.getSetting("totalColumns"), function (e) {
                        return o.wot.wtTable.getColumnWidth(e)
                    }, n ? null : this.wot.wtSettings.settings.viewportColumnCalculatorOverride, n, this.wot.getSetting("stretchH"), function (e, t) {
                        return o.wot.getSetting("onBeforeStretchingColumnWidth", e, t)
                    })
                }, createRenderCalculators: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    if (e) {
                        var t = this.createRowsCalculator(!0), n = this.createColumnsCalculator(!0);
                        this.areAllProposedVisibleRowsAlreadyRendered(t) && this.areAllProposedVisibleColumnsAlreadyRendered(n) || (e = !1)
                    }
                    return e || (this.rowsRenderCalculator = this.createRowsCalculator(), this.columnsRenderCalculator = this.createColumnsCalculator()), this.rowsVisibleCalculator = null, this.columnsVisibleCalculator = null, e
                }, createVisibleCalculators: function () {
                    this.rowsVisibleCalculator = this.createRowsCalculator(!0), this.columnsVisibleCalculator = this.createColumnsCalculator(!0)
                }, areAllProposedVisibleRowsAlreadyRendered: function (e) {
                    return !!this.rowsVisibleCalculator && (!(e.startRow < this.rowsRenderCalculator.startRow || e.startRow === this.rowsRenderCalculator.startRow && e.startRow > 0) && !(e.endRow > this.rowsRenderCalculator.endRow || e.endRow === this.rowsRenderCalculator.endRow && e.endRow < this.wot.getSetting("totalRows") - 1))
                }, areAllProposedVisibleColumnsAlreadyRendered: function (e) {
                    return !!this.columnsVisibleCalculator && (!(e.startColumn < this.columnsRenderCalculator.startColumn || e.startColumn === this.columnsRenderCalculator.startColumn && e.startColumn > 0) && !(e.endColumn > this.columnsRenderCalculator.endColumn || e.endColumn === this.columnsRenderCalculator.endColumn && e.endColumn < this.wot.getSetting("totalColumns") - 1))
                }, resetHasOversizedColumnHeadersMarked: function () {
                    g(this.hasOversizedColumnHeadersMarked, function (e, t, n) {
                        n[t] = void 0
                    })
                }
            }, {}), window.WalkontableViewport = b
        }, {
            browser: 24,
            "calculator/viewportColumns": 4,
            "calculator/viewportRows": 5,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/object": 53
        }],
        24: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n = new o.Core(e, t || {});
                return n.init(), n
            }

            var r, i, s, a, l, u, c, d, h, f, p, m, g, w, v, y, b, C, _, R, M, S, E, O;
            t.exports = o, o.utils = {}, r = e("shims/runtime"), r && r.__esModule && r || {default: r}, i = e("es6collections"), i && i.__esModule && i || {default: i};
            var T = (s = e("pluginHooks"), s && s.__esModule && s || {default: s}).Hooks,
                k = (a = e("numbro"), a && a.__esModule && a || {default: a}).default,
                x = (l = e("moment"), l && l.__esModule && l || {default: l}).default;
            "object" == typeof window && ("undefined" == typeof window.numbro && (window.numbro = k), "undefined" == typeof window.moment && (window.moment = x)), o.hooks || (o.hooks = new T), o.utils.Hooks = T, u = e("core"), u && u.__esModule && u || {default: u}, c = e("renderers/_cellDecorator"), c && c.__esModule && c || {default: c}, d = e("cellTypes"), d && d.__esModule && d || {default: d}, h = e("plugins/jqueryHandsontable"), h && h.__esModule && h || {default: h};
            var D = (f = e("helpers/array"), f && f.__esModule && f || {default: f}),
                H = (p = e("helpers/browser"), p && p.__esModule && p || {default: p}),
                A = (m = e("helpers/data"), m && m.__esModule && m || {default: m}),
                P = (g = e("helpers/date"), g && g.__esModule && g || {default: g}),
                N = (w = e("helpers/feature"), w && w.__esModule && w || {default: w}),
                L = (v = e("helpers/function"), v && v.__esModule && v || {default: v}),
                I = (y = e("helpers/mixed"), y && y.__esModule && y || {default: y}),
                W = (b = e("helpers/number"), b && b.__esModule && b || {default: b}),
                j = (C = e("helpers/object"), C && C.__esModule && C || {default: C}),
                V = (_ = e("helpers/setting"), _ && _.__esModule && _ || {default: _}),
                B = (R = e("helpers/string"), R && R.__esModule && R || {default: R}),
                F = (M = e("helpers/unicode"), M && M.__esModule && M || {default: M}),
                z = (S = e("helpers/dom/element"), S && S.__esModule && S || {default: S}),
                Y = (E = e("helpers/dom/event"), E && E.__esModule && E || {default: E}),
                U = [D, H, A, P, N, L, I, W, j, V, B, F], G = [z, Y];
            o.buildDate = "Tue Feb 14 2017 11:02:09 GMT+0100 (CET)", o.packageName = "handsontable", o.version = "0.31.0";
            var $ = "@@baseVersion";
            /^@@/.test($) || (o.baseVersion = $), o.plugins = {};
            var K = (O = e("plugins"), O && O.__esModule && O || {default: O}).registerPlugin;
            o.plugins.registerPlugin = K, o.helper = {}, o.dom = {}, o.Dom = o.dom, D.arrayEach(U, function (e) {
                D.arrayEach(Object.getOwnPropertyNames(e), function (t) {
                    "_" !== t.charAt(0) && (o.helper[t] = e[t])
                })
            }), D.arrayEach(G, function (e) {
                D.arrayEach(Object.getOwnPropertyNames(e), function (t) {
                    "_" !== t.charAt(0) && (o.dom[t] = e[t])
                })
            })
        }, {
            cellTypes: 25,
            core: 26,
            es6collections: "es6collections",
            "helpers/array": 43,
            "helpers/browser": 44,
            "helpers/data": 45,
            "helpers/date": 46,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/feature": 49,
            "helpers/function": 50,
            "helpers/mixed": 51,
            "helpers/number": 52,
            "helpers/object": 53,
            "helpers/setting": 54,
            "helpers/string": 55,
            "helpers/unicode": 56,
            moment: "moment",
            numbro: "numbro",
            pluginHooks: 60,
            plugins: 61,
            "plugins/jqueryHandsontable": 2,
            "renderers/_cellDecorator": 118,
            "shims/runtime": 125
        }],
        25: [function (e, t, n) {
            "use strict";
            var o, r, i, s, a, l, u, c, d, h, f, p, m, g, w, v, y, b, C, _, R, M, S, E,
                O = (o = e("helpers/browser"), o && o.__esModule && o || {default: o}).isMobileBrowser,
                T = (r = e("editors"), r && r.__esModule && r || {default: r}).getEditorConstructor,
                k = (i = e("renderers"), i && i.__esModule && i || {default: i}).getRenderer,
                x = ((s = e("editors/autocompleteEditor"), s && s.__esModule && s || {default: s}).AutocompleteEditor, (a = e("editors/checkboxEditor"), a && a.__esModule && a || {default: a}).CheckboxEditor, (l = e("editors/dateEditor"), l && l.__esModule && l || {default: l}).DateEditor, (u = e("editors/dropdownEditor"), u && u.__esModule && u || {default: u}).DropdownEditor, (c = e("editors/handsontableEditor"), c && c.__esModule && c || {default: c}).HandsontableEditor, (d = e("editors/mobileTextEditor"), d && d.__esModule && d || {default: d}).MobileTextEditor, (h = e("editors/numericEditor"), h && h.__esModule && h || {default: h}).NumericEditor, (f = e("editors/passwordEditor"), f && f.__esModule && f || {default: f}).PasswordEditor, (p = e("editors/selectEditor"), p && p.__esModule && p || {default: p}).SelectEditor, (m = e("editors/textEditor"), m && m.__esModule && m || {default: m}).TextEditor, (g = e("renderers/autocompleteRenderer"), g && g.__esModule && g || {default: g}).AutocompleteRenderer, (w = e("renderers/checkboxRenderer"), w && w.__esModule && w || {default: w}).CheckboxRenderer, (v = e("renderers/htmlRenderer"), v && v.__esModule && v || {default: v}).HtmlRenderer, (y = e("renderers/numericRenderer"), y && y.__esModule && y || {default: y}).NumericRenderer, (b = e("renderers/passwordRenderer"), b && b.__esModule && b || {default: b}).PasswordRenderer, (C = e("renderers/textRenderer"), C && C.__esModule && C || {default: C}).TextRenderer, (_ = e("validators/autocompleteValidator"), _ && _.__esModule && _ || {default: _}).AutocompleteValidator, (R = e("validators/dateValidator"), R && R.__esModule && R || {default: R}).DateValidator, (M = e("validators/timeValidator"), M && M.__esModule && M || {default: M}).TimeValidator, (S = e("validators/numericValidator"), S && S.__esModule && S || {default: S}).NumericValidator, (E = e("browser"), E && E.__esModule && E || {default: E}).default);
            x.AutocompleteCell = {
                editor: T("autocomplete"),
                renderer: k("autocomplete"),
                validator: x.AutocompleteValidator
            }, x.CheckboxCell = {
                editor: T("checkbox"),
                renderer: k("checkbox")
            }, x.TextCell = {
                editor: T(O() ? "mobile" : "text"),
                renderer: k("text")
            }, x.NumericCell = {
                editor: T("numeric"),
                renderer: k("numeric"),
                validator: x.NumericValidator,
                dataType: "number"
            }, x.DateCell = {
                editor: T("date"),
                validator: x.DateValidator,
                renderer: k("autocomplete")
            }, x.TimeCell = {
                editor: T("text"),
                validator: x.TimeValidator,
                renderer: k("text")
            }, x.HandsontableCell = {
                editor: T("handsontable"),
                renderer: k("autocomplete")
            }, x.PasswordCell = {
                editor: T("password"),
                renderer: k("password"),
                copyable: !1
            }, x.DropdownCell = {
                editor: T("dropdown"),
                renderer: k("autocomplete"),
                validator: x.AutocompleteValidator
            }, x.cellTypes = {
                text: x.TextCell,
                date: x.DateCell,
                time: x.TimeCell,
                numeric: x.NumericCell,
                checkbox: x.CheckboxCell,
                autocomplete: x.AutocompleteCell,
                handsontable: x.HandsontableCell,
                password: x.PasswordCell,
                dropdown: x.DropdownCell
            }, x.cellLookup = {validator: {numeric: x.NumericValidator, autocomplete: x.AutocompleteValidator}}
        }, {
            browser: 24,
            editors: 30,
            "editors/autocompleteEditor": 32,
            "editors/checkboxEditor": 33,
            "editors/dateEditor": 34,
            "editors/dropdownEditor": 35,
            "editors/handsontableEditor": 36,
            "editors/mobileTextEditor": 37,
            "editors/numericEditor": 38,
            "editors/passwordEditor": 39,
            "editors/selectEditor": 40,
            "editors/textEditor": 41,
            "helpers/browser": 44,
            renderers: 117,
            "renderers/autocompleteRenderer": 119,
            "renderers/checkboxRenderer": 120,
            "renderers/htmlRenderer": 121,
            "renderers/numericRenderer": 122,
            "renderers/passwordRenderer": 123,
            "renderers/textRenderer": 124,
            "validators/autocompleteValidator": 133,
            "validators/dateValidator": 134,
            "validators/numericValidator": 135,
            "validators/timeValidator": 136
        }],
        26: [function (e, t, n) {
            "use strict";
            var o, r, i, s, a, l, u, c, d, h, f, p, m, g, w, v, y, b, C, _, R, M, S,
                E = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                O = (r = e("numbro"), r && r.__esModule && r || {default: r}).default,
                T = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), k = T.addClass, x = T.empty,
                D = T.isChildOfWebComponentTable, H = T.removeClass,
                A = (s = e("helpers/setting"), s && s.__esModule && s || {default: s}).columnFactory,
                P = (a = e("helpers/function"), a && a.__esModule && a || {default: a}).isFunction,
                N = (l = e("helpers/mixed"), l && l.__esModule && l || {default: l}), L = N.isDefined,
                I = N.isUndefined,
                W = (u = e("helpers/browser"), u && u.__esModule && u || {default: u}).isMobileBrowser,
                j = (c = e("dataMap"), c && c.__esModule && c || {default: c}).DataMap,
                V = (d = e("editorManager"), d && d.__esModule && d || {default: d}).EditorManager,
                B = (h = e("eventManager"), h && h.__esModule && h || {default: h}).eventManager,
                F = (f = e("helpers/object"), f && f.__esModule && f || {default: f}), z = F.deepClone,
                Y = F.duckSchema, U = F.extend, G = F.isObject, $ = F.isObjectEquals, K = F.deepObjectSize,
                X = (p = e("helpers/array"), p && p.__esModule && p || {default: p}), q = X.arrayFlatten,
                Z = X.arrayMap, J = (m = e("plugins"), m && m.__esModule && m || {default: m}).getPlugin,
                Q = (g = e("renderers"), g && g.__esModule && g || {default: g}).getRenderer,
                ee = (w = e("helpers/string"), w && w.__esModule && w || {default: w}).randomString,
                te = (v = e("helpers/number"), v && v.__esModule && v || {default: v}).rangeEach,
                ne = (y = e("tableView"), y && y.__esModule && y || {default: y}).TableView,
                oe = (b = e("dataSource"), b && b.__esModule && b || {default: b}).DataSource,
                re = (C = e("helpers/data"), C && C.__esModule && C || {default: C}), ie = re.translateRowsToColumns,
                se = re.cellMethodLookupFactory, ae = re.spreadsheetColumnLabel,
                le = (_ = e("utils/recordTranslator"), _ && _.__esModule && _ || {default: _}).getTranslator,
                ue = (R = e("3rdparty/walkontable/src/cell/coords"), R && R.__esModule && R || {default: R}).WalkontableCellCoords,
                ce = (M = e("3rdparty/walkontable/src/cell/range"), M && M.__esModule && M || {default: M}).WalkontableCellRange,
                de = (S = e("3rdparty/walkontable/src/calculator/viewportColumns"), S && S.__esModule && S || {default: S}).WalkontableViewportColumnsCalculator;
            E.activeGuid = null, E.Core = function (e, t) {
                function n() {
                    var e = !1;
                    return {
                        validatorsInQueue: 0, valid: !0, addValidatorToQueue: function () {
                            this.validatorsInQueue++, e = !1
                        }, removeValidatorFormQueue: function () {
                            this.validatorsInQueue = this.validatorsInQueue - 1 < 0 ? 0 : this.validatorsInQueue - 1, this.checkIfQueueIsEmpty()
                        }, onQueueEmpty: function (e) {
                        }, checkIfQueueIsEmpty: function () {
                            0 == this.validatorsInQueue && 0 == e && (e = !0, this.onQueueEmpty(this.valid))
                        }
                    }
                }

                function o(e, t, o) {
                    function r() {
                        var n;
                        e.length && (n = E.hooks.run(p, "beforeChange", e, t), P(n) ? console.warn("Your beforeChange callback returns a function. It's not supported since Handsontable 0.12.1 (and the returned function will not be executed).") : n === !1 && e.splice(0, e.length)), o()
                    }

                    var i = new n;
                    i.onQueueEmpty = r;
                    for (var s = e.length - 1; s >= 0; s--) if (null === e[s]) e.splice(s, 1); else {
                        var a = e[s][0], l = u.propToCol(e[s][1]), c = p.getCellMeta(a, l);
                        if ("numeric" === c.type && "string" == typeof e[s][3] && e[s][3].length > 0 && (/^-?[\d\s]*(\.|\,)?\d*$/.test(e[s][3]) || c.format)) {
                            var d = e[s][3].length;
                            I(c.language) ? O.culture("en-US") : e[s][3].indexOf(".") === d - 3 && e[s][3].indexOf(",") === -1 ? O.culture("en-US") : O.culture(c.language);
                            O.cultureData(O.culture()).delimiters;
                            O.validate(e[s][3]) && !isNaN(e[s][3]) ? e[s][3] = parseFloat(e[s][3]) : e[s][3] = O().unformat(e[s][3]) || e[s][3]
                        }
                        p.getCellValidator(c) && (i.addValidatorToQueue(), p.validateCell(e[s][3], c, function (t, n) {
                            return function (o) {
                                if ("boolean" != typeof o) throw new Error("Validation error: result is not boolean");
                                if (o === !1 && n.allowInvalid === !1) {
                                    e.splice(t, 1), n.valid = !0;
                                    var r = p.getCell(n.row, n.col);
                                    H(r, p.getSettings().invalidCellClassName), --t
                                }
                                i.removeValidatorFormQueue()
                            }
                        }(s, c), t))
                    }
                    i.checkIfQueueIsEmpty()
                }

                function r(e, t) {
                    var n = e.length - 1;
                    if (!(n < 0)) {
                        for (; 0 <= n; n--) {
                            var o = !1;
                            if (null !== e[n]) {
                                if (null != e[n][2] || null != e[n][3]) {
                                    if (l.settings.allowInsertRow) for (; e[n][0] > p.countRows() - 1;) {
                                        var r = u.createRow(void 0, void 0, t);
                                        if (0 === r) {
                                            o = !0;
                                            break
                                        }
                                    }
                                    if (!o) {
                                        if ("array" === p.dataType && (!l.settings.columns || 0 === l.settings.columns.length) && l.settings.allowInsertColumn) for (; u.propToCol(e[n][1]) > p.countCols() - 1;) u.createCol(void 0, void 0, t);
                                        u.set(e[n][0], e[n][1], e[n][3])
                                    }
                                }
                            } else e.splice(n, 1)
                        }
                        p.forceFullRender = !0, d.adjustRowsAndCols(), E.hooks.run(p, "beforeChangeRender", e, t), h.refreshBorders(null, !0), p.view.wt.wtOverlays.adjustElementsSize(), E.hooks.run(p, "afterChange", e, t || "edit");
                        var i = p.getActiveEditor();
                        i && L(i.refreshValue) && i.refreshValue()
                    }
                }

                function i(e, t, n) {
                    return "object" == typeof e ? e : [[e, t, n]]
                }

                function s(e) {
                    if (e.hasOwnProperty("type")) {
                        var t, n = {};
                        if ("object" == typeof e.type) t = e.type; else if ("string" == typeof e.type && (t = E.cellTypes[e.type], void 0 === t)) throw new Error('You declared cell type "' + e.type + '" as a string that is not mapped to a known object. Cell type must be an object or a string mapped to an object in Handsontable.cellTypes');
                        for (var o in t) t.hasOwnProperty(o) && !e.hasOwnProperty(o) && (n[o] = t[o]);
                        return n
                    }
                }

                function a() {
                    throw new Error("This method cannot be called because this Handsontable instance has been destroyed")
                }

                var l, u, c, d, h, f, p = this, m = function () {
                }, g = B(p), w = le(p);
                U(m.prototype, he.prototype), U(m.prototype, t), U(m.prototype, s(t)), this.rootElement = e, this.isHotTableEnv = D(this.rootElement), E.eventManager.isHotTableEnv = this.isHotTableEnv, this.container = document.createElement("DIV"), this.renderCall = !1, e.insertBefore(this.container, e.firstChild), this.guid = "ht_" + ee(), c = new oe(p), this.rootElement.id && "ht_" !== this.rootElement.id.substring(0, 3) || (this.rootElement.id = this.guid), l = {
                    cellSettings: [],
                    columnSettings: [],
                    columnsSettingConflicts: ["data", "width"],
                    settings: new m,
                    selRange: null,
                    isPopulated: null,
                    scrollable: null,
                    firstRun: !0
                }, d = {
                    alter: function (e, t, n, o, r) {
                        function i(e, t, n, o) {
                            var r = function () {
                                var e;
                                return "array" === o ? e = [] : "object" === o && (e = {}), e
                            }, i = Z(new Array(n), function () {
                                return r()
                            });
                            i.unshift(t, 0), e.splice.apply(e, i)
                        }

                        var s;
                        switch (n = n || 1, e) {
                            case"insert_row":
                                var a = p.countSourceRows();
                                if (p.getSettings().maxRows === a) return;
                                t = L(t) ? t : a, s = u.createRow(t, n, o), i(l.cellSettings, t, n, "array"), s && (h.isSelected() && l.selRange.from.row >= t ? (l.selRange.from.row = l.selRange.from.row + s, h.transformEnd(s, 0)) : h.refreshBorders());
                                break;
                            case"insert_col":
                                s = u.createCol(t, n, o);
                                for (var c = 0, f = p.countSourceRows(); c < f; c++) l.cellSettings[c] && i(l.cellSettings[c], t, n);
                                if (s) {
                                    if (Array.isArray(p.getSettings().colHeaders)) {
                                        var m = [t, 0];
                                        m.length += s, Array.prototype.splice.apply(p.getSettings().colHeaders, m)
                                    }
                                    h.isSelected() && l.selRange.from.col >= t ? (l.selRange.from.col = l.selRange.from.col + s, h.transformEnd(0, s)) : h.refreshBorders()
                                }
                                break;
                            case"remove_row":
                                u.removeRow(t, n, o), l.cellSettings.splice(t, n);
                                var g = p.countRows(), v = p.getSettings().fixedRowsTop;
                                v >= t + 1 && (p.getSettings().fixedRowsTop -= Math.min(n, v - t));
                                var y = p.getSettings().fixedRowsBottom;
                                y && t >= g - y && (p.getSettings().fixedRowsBottom -= Math.min(n, y)), d.adjustRowsAndCols(), h.refreshBorders();
                                break;
                            case"remove_col":
                                var b = w.toPhysicalColumn(t);
                                u.removeCol(t, n, o);
                                for (var C = 0, _ = p.countSourceRows(); C < _; C++) l.cellSettings[C] && l.cellSettings[C].splice(b, n);
                                var R = p.getSettings().fixedColumnsLeft;
                                R >= t + 1 && (p.getSettings().fixedColumnsLeft -= Math.min(n, R - t)), Array.isArray(p.getSettings().colHeaders) && ("undefined" == typeof b && (b = -1), p.getSettings().colHeaders.splice(b, n)), d.adjustRowsAndCols(), h.refreshBorders();
                                break;
                            default:
                                throw new Error('There is no such action "' + e + '"')
                        }
                        r || d.adjustRowsAndCols()
                    }, adjustRowsAndCols: function () {
                        if (l.settings.minRows) {
                            var e = p.countRows();
                            if (e < l.settings.minRows) for (var t = 0, n = l.settings.minRows; t < n - e; t++) u.createRow(p.countRows(), 1, "auto")
                        }
                        if (l.settings.minSpareRows) {
                            var o = p.countEmptyRows(!0);
                            if (o < l.settings.minSpareRows) for (; o < l.settings.minSpareRows && p.countSourceRows() < l.settings.maxRows; o++) u.createRow(p.countRows(), 1, "auto")
                        }
                        var r;
                        if ((l.settings.minCols || l.settings.minSpareCols) && (r = p.countEmptyCols(!0)), l.settings.minCols && !l.settings.columns && p.countCols() < l.settings.minCols) for (; p.countCols() < l.settings.minCols; r++) u.createCol(p.countCols(), 1, "auto");
                        if (l.settings.minSpareCols && !l.settings.columns && "array" === p.dataType && r < l.settings.minSpareCols) for (; r < l.settings.minSpareCols && p.countCols() < l.settings.maxCols; r++) u.createCol(p.countCols(), 1, "auto");
                        var i = p.countRows(), s = p.countCols();
                        if (0 !== i && 0 !== s || h.deselect(), h.isSelected()) {
                            var a = !1, c = l.selRange.from.row, d = l.selRange.from.col, f = l.selRange.to.row,
                                m = l.selRange.to.col;
                            c > i - 1 ? (c = i - 1, a = !0, f > c && (f = c)) : f > i - 1 && (f = i - 1, a = !0, c > f && (c = f)), d > s - 1 ? (d = s - 1, a = !0, m > d && (m = d)) : m > s - 1 && (m = s - 1, a = !0, d > m && (d = m)), a && p.selectCell(c, d, f, m)
                        }
                        p.view && p.view.wt.wtOverlays.adjustElementsSize()
                    }, populateFromArray: function (e, t, n, o, r, i, s) {
                        var a, u, c, d, h = [], f = {};
                        if (u = t.length, 0 === u) return !1;
                        var m, g, w, v;
                        ({row: null === n ? null : n.row, col: null === n ? null : n.col});
                        switch (r) {
                            case"shift_down":
                                for (m = n ? n.col - e.col + 1 : 0, g = n ? n.row - e.row + 1 : 0, t = ie(t), c = 0, d = t.length, w = Math.max(d, m); c < w; c++) if (c < d) {
                                    for (a = 0, u = t[c].length; a < g - u; a++) t[c].push(t[c][a % u]);
                                    t[c].unshift(e.col + c, e.row, 0), p.spliceCol.apply(p, t[c])
                                } else t[c % d][0] = e.col + c, p.spliceCol.apply(p, t[c % d]);
                                break;
                            case"shift_right":
                                for (m = n ? n.col - e.col + 1 : 0, g = n ? n.row - e.row + 1 : 0, a = 0, u = t.length, v = Math.max(u, g); a < v; a++) if (a < u) {
                                    for (c = 0, d = t[a].length; c < m - d; c++) t[a].push(t[a][c % d]);
                                    t[a].unshift(e.row + a, e.col, 0), p.spliceRow.apply(p, t[a])
                                } else t[a % u][0] = e.row + a, p.spliceRow.apply(p, t[a % u]);
                                break;
                            case"overwrite":
                            default:
                                f.row = e.row, f.col = e.col;
                                var y, b = {row: n && e ? n.row - e.row + 1 : 1, col: n && e ? n.col - e.col + 1 : 1},
                                    C = 0, _ = 0, R = !0, M = function (e) {
                                        var n = void 0 !== arguments[1] ? arguments[1] : null, o = t[e % t.length];
                                        return null !== n ? o[n % o.length] : o
                                    }, S = t.length, E = n ? n.row - e.row + 1 : 0;
                                for (u = n ? E : Math.max(S, E), a = 0; a < u && !(n && f.row > n.row && E > S || !l.settings.allowInsertRow && f.row > p.countRows() - 1 || f.row >= l.settings.maxRows); a++) {
                                    var O = a - C, T = M(O).length, k = n ? n.col - e.col + 1 : 0;
                                    if (d = n ? k : Math.max(T, k), f.col = e.col, y = p.getCellMeta(f.row, f.col), "CopyPaste.paste" !== o && "Autofill.autofill" !== o || !y.skipRowOnPaste) {
                                        for (_ = 0, c = 0; c < d && !(n && f.col > n.col && k > T || !l.settings.allowInsertColumn && f.col > p.countCols() - 1 || f.col >= l.settings.maxCols); c++) if (y = p.getCellMeta(f.row, f.col), "CopyPaste.paste" !== o && "Autofill.fill" !== o || !y.skipColumnOnPaste) if (y.readOnly) f.col++; else {
                                            var x = c - _, D = M(O, x), H = p.getDataAtCell(f.row, f.col),
                                                A = {row: O, col: x};
                                            if ("Autofill.fill" === o) {
                                                var P = p.runHooks("beforeAutofillInsidePopulate", A, i, t, s, {}, b);
                                                P && (D = I(P.value) ? D : P.value)
                                            }
                                            if (null !== D && "object" == typeof D) if (null === H || "object" != typeof H) R = !1; else {
                                                var N = Y(H[0] || H), L = Y(D[0] || D);
                                                $(N, L) ? D = z(D) : R = !1
                                            } else null !== H && "object" == typeof H && (R = !1);
                                            R && h.push([f.row, f.col, D]), R = !0, f.col++
                                        } else _++, f.col++, d++;
                                        f.row++
                                    } else C++, f.row++, u++
                                }
                                p.setDataAtCell(h, null, null, o || "populateFromArray")
                        }
                    }
                }, this.selection = h = {
                    inProgress: !1, selectedHeader: {cols: !1, rows: !1}, setSelectedHeaders: function () {
                        var e = void 0 !== arguments[0] && arguments[0], t = void 0 !== arguments[1] && arguments[1],
                            n = void 0 !== arguments[2] && arguments[2];
                        p.selection.selectedHeader.rows = e, p.selection.selectedHeader.cols = t, p.selection.selectedHeader.corner = n
                    }, begin: function () {
                        p.selection.inProgress = !0
                    }, finish: function () {
                        var e = p.getSelected();
                        E.hooks.run(p, "afterSelectionEnd", e[0], e[1], e[2], e[3]), E.hooks.run(p, "afterSelectionEndByProp", e[0], p.colToProp(e[1]), e[2], p.colToProp(e[3])), p.selection.inProgress = !1
                    }, isInProgress: function () {
                        return p.selection.inProgress
                    }, setRangeStart: function (e, t) {
                        E.hooks.run(p, "beforeSetRangeStart", e), l.selRange = new ce(e, e, e), h.setRangeEnd(e, null, t)
                    }, setRangeStartOnly: function (e) {
                        E.hooks.run(p, "beforeSetRangeStartOnly", e), l.selRange = new ce(e, e, e)
                    }, setRangeEnd: function (e, t, n) {
                        if (null !== l.selRange) {
                            var o, r = !1, i = !0, s = p.view.wt.wtTable.getFirstVisibleRow(),
                                a = p.view.wt.wtTable.getFirstVisibleColumn(), c = {row: null, col: null};
                            E.hooks.run(p, "beforeSetRangeEnd", e), p.selection.begin(), c.row = e.row < 0 ? s : e.row, c.col = e.col < 0 ? a : e.col, l.selRange.to = new ue(c.row, c.col), l.settings.multiSelect || (l.selRange.from = e), p.view.wt.selections.current.clear(), o = p.getCellMeta(l.selRange.highlight.row, l.selRange.highlight.col).disableVisualSelection, "string" == typeof o && (o = [o]), (o === !1 || Array.isArray(o) && o.indexOf("current") === -1) && p.view.wt.selections.current.add(l.selRange.highlight), p.view.wt.selections.area.clear(), (o === !1 || Array.isArray(o) && o.indexOf("area") === -1) && h.isMultiple() && (p.view.wt.selections.area.add(l.selRange.from), p.view.wt.selections.area.add(l.selRange.to)), (l.settings.currentHeaderClassName || l.settings.currentRowClassName || l.settings.currentColClassName) && (p.view.wt.selections.highlight.clear(), p.view.wt.selections.highlight.add(l.selRange.from), p.view.wt.selections.highlight.add(l.selRange.to)), E.hooks.run(p, "afterSelection", l.selRange.from.row, l.selRange.from.col, l.selRange.to.row, l.selRange.to.col), E.hooks.run(p, "afterSelectionByProp", l.selRange.from.row, u.colToProp(l.selRange.from.col), l.selRange.to.row, u.colToProp(l.selRange.to.col)), (0 === l.selRange.from.row && l.selRange.to.row === p.countRows() - 1 && p.countRows() > 1 || 0 === l.selRange.from.col && l.selRange.to.col === p.countCols() - 1 && p.countCols() > 1) && (r = !0), (e.row < 0 || e.col < 0) && (i = !1), t !== !1 && !r && i && (l.selRange.from && !h.isMultiple() ? p.view.scrollViewport(l.selRange.from) : p.view.scrollViewport(e)), h.refreshBorders(null, n)
                        }
                    }, refreshBorders: function (e, t) {
                        t || f.destroyEditor(e), p.view.render(), h.isSelected() && !t && f.prepareEditor()
                    }, isMultiple: function () {
                        var e = !(l.selRange.to.col === l.selRange.from.col && l.selRange.to.row === l.selRange.from.row),
                            t = E.hooks.run(p, "afterIsMultipleSelection", e);
                        if (e) return t
                    }, transformStart: function (e, t, n, o) {
                        var r, i, s, a, u = new ue(e, t), c = 0, d = 0;
                        p.runHooks("modifyTransformStart", u), r = p.countRows(), i = p.countCols(), a = p.getSettings().fixedRowsBottom, l.selRange.highlight.row + e > r - 1 ? n && l.settings.minSpareRows > 0 && !(a && l.selRange.highlight.row >= r - a - 1) ? (p.alter("insert_row", r), r = p.countRows()) : l.settings.autoWrapCol && (u.row = 1 - r, u.col = l.selRange.highlight.col + u.col == i - 1 ? 1 - i : 1) : l.settings.autoWrapCol && l.selRange.highlight.row + u.row < 0 && l.selRange.highlight.col + u.col >= 0 && (u.row = r - 1, u.col = l.selRange.highlight.col + u.col == 0 ? i - 1 : -1), l.selRange.highlight.col + u.col > i - 1 ? n && l.settings.minSpareCols > 0 ? (p.alter("insert_col", i), i = p.countCols()) : l.settings.autoWrapRow && (u.row = l.selRange.highlight.row + u.row == r - 1 ? 1 - r : 1, u.col = 1 - i) : l.settings.autoWrapRow && l.selRange.highlight.col + u.col < 0 && l.selRange.highlight.row + u.row >= 0 && (u.row = l.selRange.highlight.row + u.row == 0 ? r - 1 : -1, u.col = i - 1), s = new ue(l.selRange.highlight.row + u.row, l.selRange.highlight.col + u.col), s.row < 0 ? (c = -1, s.row = 0) : s.row > 0 && s.row >= r && (c = 1, s.row = r - 1), s.col < 0 ? (d = -1, s.col = 0) : s.col > 0 && s.col >= i && (d = 1, s.col = i - 1), p.runHooks("afterModifyTransformStart", s, c, d), h.setRangeStart(s, o)
                    }, transformEnd: function (e, t) {
                        var n, o, r, i = new ue(e, t), s = 0, a = 0;
                        p.runHooks("modifyTransformEnd", i), n = p.countRows(), o = p.countCols(), r = new ue(l.selRange.to.row + i.row, l.selRange.to.col + i.col), r.row < 0 ? (s = -1, r.row = 0) : r.row > 0 && r.row >= n && (s = 1, r.row = n - 1), r.col < 0 ? (a = -1, r.col = 0) : r.col > 0 && r.col >= o && (a = 1, r.col = o - 1), p.runHooks("afterModifyTransformEnd", r, s, a), h.setRangeEnd(r, !0)
                    }, isSelected: function () {
                        return null !== l.selRange
                    }, inInSelection: function (e) {
                        return !!h.isSelected() && l.selRange.includes(e)
                    }, deselect: function () {
                        h.isSelected() && (p.selection.inProgress = !1, l.selRange = null, p.view.wt.selections.current.clear(), p.view.wt.selections.area.clear(), (l.settings.currentHeaderClassName || l.settings.currentRowClassName || l.settings.currentColClassName) && p.view.wt.selections.highlight.clear(), f.destroyEditor(), h.refreshBorders(), H(p.rootElement, ["ht__selection--rows", "ht__selection--columns"]), E.hooks.run(p, "afterDeselect"))
                    }, selectAll: function () {
                        l.settings.multiSelect && (h.setRangeStart(new ue(0, 0)), h.setRangeEnd(new ue(p.countRows() - 1, p.countCols() - 1), !1))
                    }, empty: function () {
                        if (h.isSelected()) {
                            var e, t, n = l.selRange.getTopLeftCorner(), o = l.selRange.getBottomRightCorner(), r = [];
                            for (e = n.row; e <= o.row; e++) for (t = n.col; t <= o.col; t++) p.getCellMeta(e, t).readOnly || r.push([e, t, ""]);
                            p.setDataAtCell(r)
                        }
                    }
                }, this.init = function () {
                    c.setData(l.settings.data), E.hooks.run(p, "beforeInit"), W() && k(p.rootElement, "mobile"), this.updateSettings(l.settings, !0), this.view = new ne(this), f = new V(p, l, h, u), this.forceFullRender = !0, E.hooks.run(p, "init"), this.view.render(), "object" == typeof l.firstRun && (E.hooks.run(p, "afterChange", l.firstRun[0], l.firstRun[1]), l.firstRun = !1), E.hooks.run(p, "afterInit")
                }, this.validateCell = function (e, t, n, o) {
                    function r(e) {
                        var o = t.visualCol, r = t.visualRow, i = p.getCell(r, o, !0);
                        i && "TH" != i.nodeName && p.view.wt.wtSettings.settings.cellRenderer(r, o, i), n(e)
                    }

                    var i = p.getCellValidator(t);
                    "[object RegExp]" === Object.prototype.toString.call(i) && (i = function (e) {
                        return function (t, n) {
                            n(e.test(t))
                        }
                    }(i)), P(i) ? (e = E.hooks.run(p, "beforeValidate", e, t.visualRow, t.prop, o), p._registerTimeout(setTimeout(function () {
                        i.call(t, e, function (n) {
                            n = E.hooks.run(p, "afterValidate", n, e, t.visualRow, t.prop, o), t.valid = n, r(n), E.hooks.run(p, "postAfterValidate", n, e, t.visualRow, t.prop, o)
                        })
                    }, 0))) : p._registerTimeout(setTimeout(function () {
                        t.valid = !0, r(t.valid)
                    }, 0))
                }, this.setDataAtCell = function (e, t, n, s) {
                    var a, l, d, h = i(e, t, n), f = [];
                    for (a = 0, l = h.length; a < l; a++) {
                        if ("object" != typeof h[a]) throw new Error("Method `setDataAtCell` accepts row number or changes array of arrays as its first parameter");
                        if ("number" != typeof h[a][1]) throw new Error("Method `setDataAtCell` accepts row and column number as its parameters. If you want to use object property name, use method `setDataAtRowProp`");
                        d = u.colToProp(h[a][1]), f.push([h[a][0], d, c.getAtCell(w.toPhysicalRow(h[a][0]), h[a][1]), h[a][2]])
                    }
                    s || "object" != typeof e || (s = t), p.runHooks("afterSetDataAtCell", f, s), o(f, s, function () {
                        r(f, s)
                    })
                }, this.setDataAtRowProp = function (e, t, n, s) {
                    var a, l, u = i(e, t, n), d = [];
                    for (a = 0, l = u.length; a < l; a++) d.push([u[a][0], u[a][1], c.getAtCell(w.toPhysicalRow(u[a][0]), u[a][1]), u[a][2]]);
                    s || "object" != typeof e || (s = t), p.runHooks("afterSetDataAtRowProp", d, s), o(d, s, function () {
                        r(d, s)
                    })
                }, this.listen = function () {
                    E.activeGuid = p.guid
                }, this.unlisten = function () {
                    E.activeGuid = null
                }, this.isListening = function () {
                    return E.activeGuid === p.guid
                }, this.destroyEditor = function (e) {
                    h.refreshBorders(e)
                }, this.populateFromArray = function (e, t, n, o, r, i, s, a, l) {
                    var u;
                    if ("object" != typeof n || "object" != typeof n[0]) throw new Error("populateFromArray parameter `input` must be an array of arrays");
                    return u = "number" == typeof o ? new ue(o, r) : null, d.populateFromArray(new ue(e, t), n, u, i, s, a, l)
                }, this.spliceCol = function (e, t, n) {
                    return u.spliceCol.apply(u, arguments)
                }, this.spliceRow = function (e, t, n) {
                    return u.spliceRow.apply(u, arguments)
                }, this.getSelected = function () {
                    if (h.isSelected()) return [l.selRange.from.row, l.selRange.from.col, l.selRange.to.row, l.selRange.to.col]
                }, this.getSelectedRange = function () {
                    if (h.isSelected()) return l.selRange
                }, this.render = function () {
                    p.view && (p.renderCall = !0, p.forceFullRender = !0, h.refreshBorders(null, !0))
                }, this.loadData = function (e) {
                    function t() {
                        l.cellSettings.length = 0
                    }

                    if (Array.isArray(l.settings.dataSchema) ? p.dataType = "array" : P(l.settings.dataSchema) ? p.dataType = "function" : p.dataType = "object", u && u.destroy(), u = new j(p, l, m), "object" == typeof e && null !== e) e.push && e.splice || (e = [e]); else {
                        if (null !== e) throw new Error("loadData only accepts array of objects or array of arrays (" + typeof e + " given)");
                        e = [];
                        var n, o = 0, r = 0, i = u.getSchema();
                        for (o = 0, r = l.settings.startRows; o < r; o++) if ("object" !== p.dataType && "function" !== p.dataType || !l.settings.dataSchema) if ("array" === p.dataType) n = z(i[0]), e.push(n); else {
                            n = [];
                            for (var s = 0, a = l.settings.startCols; s < a; s++) n.push(null);
                            e.push(n)
                        } else n = z(i), e.push(n)
                    }
                    l.isPopulated = !1, m.prototype.data = e, Array.isArray(e[0]) && (p.dataType = "array"), u.dataSource = e, c.data = e, c.dataType = p.dataType, c.colToProp = u.colToProp.bind(u), c.propToCol = u.propToCol.bind(u), t(), d.adjustRowsAndCols(), E.hooks.run(p, "afterLoadData", l.firstRun), l.firstRun ? l.firstRun = [null, "loadData"] : (E.hooks.run(p, "afterChange", null, "loadData"), p.render()), l.isPopulated = !0
                }, this.getData = function (e, t, n, o) {
                    return I(e) ? u.getAll() : u.getRange(new ue(e, t), new ue(n, o), u.DESTINATION_RENDERER)
                }, this.getCopyableText = function (e, t, n, o) {
                    return u.getCopyableText(new ue(e, t), new ue(n, o))
                }, this.getCopyableData = function (e, t) {
                    return u.getCopyable(e, u.colToProp(t))
                }, this.getSchema = function () {
                    return u.getSchema()
                }, this.updateSettings = function (e, t) {
                    var n, o, r, i = !1;
                    if (L(e.rows)) throw new Error('"rows" setting is no longer supported. do you mean startRows, minRows or maxRows?');
                    if (L(e.cols)) throw new Error('"cols" setting is no longer supported. do you mean startCols, minCols or maxCols?');
                    for (n in e) "data" !== n && (E.hooks.getRegistered().indexOf(n) > -1 ? (P(e[n]) || Array.isArray(e[n])) && p.addHook(n, e[n]) : !t && e.hasOwnProperty(n) && (m.prototype[n] = e[n]));
                    if (void 0 === e.data && void 0 === l.settings.data ? p.loadData(null) : void 0 !== e.data ? p.loadData(e.data) : void 0 !== e.columns && u.createMap(), r = p.countCols(), e.columns && P(e.columns) && (r = p.countSourceCols(), i = !0), void 0 === e.cell && void 0 === e.cells && void 0 === e.columns || (l.cellSettings.length = 0), r > 0) {
                        var a, c;
                        for (n = 0, o = 0; n < r; n++) i && !e.columns(n) || (l.columnSettings[o] = A(m, l.columnsSettingConflicts), a = l.columnSettings[o].prototype, m.prototype.columns && (c = i ? m.prototype.columns(n) : m.prototype.columns[o], c && (U(a, c), U(a, s(c)))), o++)
                    }
                    if (L(e.cell)) for (var f in e.cell) if (e.cell.hasOwnProperty(f)) {
                        var g = e.cell[f];
                        p.setCellMetaObject(g.row, g.col, g)
                    }
                    E.hooks.run(p, "afterCellMetaReset"), L(e.className) && (m.prototype.className && H(p.rootElement, m.prototype.className), e.className && k(p.rootElement, e.className));
                    var w = p.rootElement.style.height;
                    "" !== w && (w = parseInt(p.rootElement.style.height, 10));
                    var v = e.height;
                    if (P(v) && (v = v()), t) {
                        var y = p.rootElement.getAttribute("style");
                        y && p.rootElement.setAttribute("data-initialstyle", p.rootElement.getAttribute("style"))
                    }
                    if (null === v) {
                        var b = p.rootElement.getAttribute("data-initialstyle");
                        b && (b.indexOf("height") > -1 || b.indexOf("overflow") > -1) ? p.rootElement.setAttribute("style", b) : (p.rootElement.style.height = "", p.rootElement.style.overflow = "")
                    } else void 0 !== v && (p.rootElement.style.height = v + "px", p.rootElement.style.overflow = "hidden");
                    if ("undefined" != typeof e.width) {
                        var C = e.width;
                        P(C) && (C = C()), p.rootElement.style.width = C + "px"
                    }
                    t || (u.clearLengthCache(), p.view && p.view.wt.wtViewport.resetHasOversizedColumnHeadersMarked(), E.hooks.run(p, "afterUpdateSettings")), d.adjustRowsAndCols(), p.view && !l.firstRun && (p.forceFullRender = !0, h.refreshBorders(null, !0)), t || !p.view || "" !== w && "" !== v && void 0 !== v || w === v || p.view.wt.wtOverlays.updateMainScrollableElements()
                }, this.getValue = function () {
                    var e = p.getSelected();
                    if (m.prototype.getValue) {
                        if (P(m.prototype.getValue)) return m.prototype.getValue.call(p);
                        if (e) return p.getData()[e[0]][m.prototype.getValue]
                    } else if (e) return p.getDataAtCell(e[0], e[1])
                }, this.getSettings = function () {
                    return l.settings
                }, this.clear = function () {
                    h.selectAll(), h.empty()
                }, this.alter = function (e, t, n, o, r) {
                    d.alter(e, t, n, o, r)
                }, this.getCell = function (e, t, n) {
                    return p.view.getCellAtCoords(new ue(e, t), n)
                }, this.getCoords = function (e) {
                    return this.view.wt.wtTable.getCoords.call(this.view.wt.wtTable, e)
                }, this.colToProp = function (e) {
                    return u.colToProp(e)
                }, this.propToCol = function (e) {
                    return u.propToCol(e)
                }, this.toVisualRow = function (e) {
                    return w.toVisualRow(e)
                }, this.toVisualColumn = function (e) {
                    return w.toVisualColumn(e)
                }, this.toPhysicalRow = function (e) {
                    return w.toPhysicalRow(e)
                }, this.toPhysicalColumn = function (e) {
                    return w.toPhysicalColumn(e)
                }, this.getDataAtCell = function (e, t) {
                    return u.get(e, u.colToProp(t))
                }, this.getDataAtRowProp = function (e, t) {
                    return u.get(e, t)
                }, this.getDataAtCol = function (e) {
                    var t = [];
                    return t.concat.apply(t, u.getRange(new ue(0, e), new ue(l.settings.data.length - 1, e), u.DESTINATION_RENDERER))
                }, this.getDataAtProp = function (e) {
                    var t, n = [];
                    return t = u.getRange(new ue(0, u.propToCol(e)), new ue(l.settings.data.length - 1, u.propToCol(e)), u.DESTINATION_RENDERER),
                        n.concat.apply(n, t)
                }, this.getSourceData = function (e, t, n, o) {
                    var r;
                    return r = void 0 === e ? c.getData() : c.getByRange(new ue(e, t), new ue(n, o))
                }, this.getSourceDataArray = function (e, t, n, o) {
                    var r;
                    return r = void 0 === e ? c.getData(!0) : c.getByRange(new ue(e, t), new ue(n, o), !0)
                }, this.getSourceDataAtCol = function (e) {
                    return c.getAtColumn(e)
                }, this.getSourceDataAtRow = function (e) {
                    return c.getAtRow(e)
                }, this.getSourceDataAtCell = function (e, t) {
                    return c.getAtCell(e, t)
                }, this.getDataAtRow = function (e) {
                    var t = u.getRange(new ue(e, 0), new ue(e, this.countCols() - 1), u.DESTINATION_RENDERER);
                    return t[0]
                }, this.getDataType = function (e, t, n, o) {
                    var r = this, i = null, s = null;
                    void 0 === e && (e = 0, n = this.countRows(), t = 0, o = this.countCols()), void 0 === n && (n = e), void 0 === o && (o = t);
                    var a = "mixed";
                    return te(Math.min(e, n), Math.max(e, n), function (e) {
                        var n = !0;
                        return te(Math.min(t, o), Math.max(t, o), function (t) {
                            var o = r.getCellMeta(e, t);
                            return s = o.type, i ? n = i === s : i = s, n
                        }), a = n ? s : "mixed", n
                    }), a
                }, this.removeCellMeta = function (e, t, n) {
                    var o = p.getCellMeta(e, t);
                    void 0 != o[n] && delete l.cellSettings[e][t][n]
                }, this.spliceCellsMeta = function (e, t) {
                    for (var n, o = [], r = 2; r < arguments.length; r++) o[r - 2] = arguments[r];
                    (n = l.cellSettings).splice.apply(n, $traceurRuntime.spread([e, t], o))
                }, this.setCellMetaObject = function (e, t, n) {
                    if ("object" == typeof n) for (var o in n) if (n.hasOwnProperty(o)) {
                        var r = n[o];
                        this.setCellMeta(e, t, o, r)
                    }
                }, this.setCellMeta = function (e, t, n, o) {
                    var r;
                    r = w.toPhysical(e, t), e = r[0], t = r[1], r, l.cellSettings[e] || (l.cellSettings[e] = []), l.cellSettings[e][t] || (l.cellSettings[e][t] = new l.columnSettings[t]), l.cellSettings[e][t][n] = o, E.hooks.run(p, "afterSetCellMeta", e, t, n, o)
                }, this.getCellsMeta = function () {
                    return q(l.cellSettings)
                }, this.getCellMeta = function (e, t) {
                    var n, o, r = u.colToProp(t), i = e, a = t;
                    if (n = w.toPhysical(e, t), e = n[0], t = n[1], n, l.columnSettings[t] || (l.columnSettings[t] = A(m, l.columnsSettingConflicts)), l.cellSettings[e] || (l.cellSettings[e] = []), l.cellSettings[e][t] || (l.cellSettings[e][t] = new l.columnSettings[t]), o = l.cellSettings[e][t], o.row = e, o.col = t, o.visualRow = i, o.visualCol = a, o.prop = r, o.instance = p, E.hooks.run(p, "beforeGetCellMeta", e, t, o), U(o, s(o)), o.cells) {
                        var c = o.cells.call(o, e, t, r);
                        c && (U(o, c), U(o, s(c)))
                    }
                    return E.hooks.run(p, "afterGetCellMeta", e, t, o), o
                }, this.getCellMetaAtRow = function (e) {
                    return l.cellSettings[e]
                }, this.isColumnModificationAllowed = function () {
                    return !("object" === p.dataType || p.getSettings().columns)
                };
                var v = se("renderer");
                this.getCellRenderer = function (e, t) {
                    var n = v.call(this, e, t);
                    return Q(n)
                }, this.getCellEditor = se("editor"), this.getCellValidator = se("validator"), this.validateCells = function (e) {
                    var t = new n;
                    e && (t.onQueueEmpty = e);
                    for (var o = p.countRows() - 1; o >= 0;) {
                        for (var r = p.countCols() - 1; r >= 0;) t.addValidatorToQueue(), p.validateCell(p.getDataAtCell(o, r), p.getCellMeta(o, r), function (e) {
                            if ("boolean" != typeof e) throw new Error("Validation error: result is not boolean");
                            e === !1 && (t.valid = !1), t.removeValidatorFormQueue()
                        }, "validateCells"), r--;
                        o--
                    }
                    t.checkIfQueueIsEmpty()
                }, this.getRowHeader = function (e) {
                    var t = l.settings.rowHeaders;
                    return void 0 !== e && (e = E.hooks.run(p, "modifyRowHeader", e)), void 0 === e ? (t = [], te(p.countRows() - 1, function (e) {
                        t.push(p.getRowHeader(e))
                    })) : Array.isArray(t) && void 0 !== t[e] ? t = t[e] : P(t) ? t = t(e) : t && "string" != typeof t && "number" != typeof t && (t = e + 1), t
                }, this.hasRowHeaders = function () {
                    return !!l.settings.rowHeaders
                }, this.hasColHeaders = function () {
                    if (void 0 !== l.settings.colHeaders && null !== l.settings.colHeaders) return !!l.settings.colHeaders;
                    for (var e = 0, t = p.countCols(); e < t; e++) if (p.getColHeader(e)) return !0;
                    return !1
                }, this.getColHeader = function (e) {
                    var t = l.settings.columns && P(l.settings.columns), n = l.settings.colHeaders;
                    if (e = E.hooks.run(p, "modifyColHeader", e), void 0 === e) {
                        for (var o = [], r = t ? p.countSourceCols() : p.countCols(), i = 0; i < r; i++) o.push(p.getColHeader(i));
                        n = o
                    } else {
                        var s = function (e) {
                            for (var t = [], n = p.countSourceCols(), o = 0; o < n; o++) P(p.getSettings().columns) && p.getSettings().columns(o) && t.push(o);
                            return t[e]
                        }, a = e;
                        e = E.hooks.run(p, "modifyCol", e);
                        var u = s(e);
                        l.settings.columns && P(l.settings.columns) && l.settings.columns(u) && l.settings.columns(u).title ? n = l.settings.columns(u).title : l.settings.columns && l.settings.columns[e] && l.settings.columns[e].title ? n = l.settings.columns[e].title : Array.isArray(l.settings.colHeaders) && void 0 !== l.settings.colHeaders[e] ? n = l.settings.colHeaders[e] : P(l.settings.colHeaders) ? n = l.settings.colHeaders(e) : l.settings.colHeaders && "string" != typeof l.settings.colHeaders && "number" != typeof l.settings.colHeaders && (n = ae(a))
                    }
                    return n
                }, this._getColWidthFromSettings = function (e) {
                    var t = p.getCellMeta(0, e), n = t.width;
                    if (void 0 !== n && n !== l.settings.width || (n = t.colWidths), void 0 !== n && null !== n) {
                        switch (typeof n) {
                            case"object":
                                n = n[e];
                                break;
                            case"function":
                                n = n(e)
                        }
                        "string" == typeof n && (n = parseInt(n, 10))
                    }
                    return n
                }, this.getColWidth = function (e) {
                    var t = p._getColWidthFromSettings(e);
                    return t = E.hooks.run(p, "modifyColWidth", t, e), void 0 === t && (t = de.DEFAULT_WIDTH), t
                }, this._getRowHeightFromSettings = function (e) {
                    var t = l.settings.rowHeights;
                    if (void 0 !== t && null !== t) {
                        switch (typeof t) {
                            case"object":
                                t = t[e];
                                break;
                            case"function":
                                t = t(e)
                        }
                        "string" == typeof t && (t = parseInt(t, 10))
                    }
                    return t
                }, this.getRowHeight = function (e) {
                    var t = p._getRowHeightFromSettings(e);
                    return t = E.hooks.run(p, "modifyRowHeight", t, e)
                }, this.countSourceRows = function () {
                    var e = E.hooks.run(p, "modifySourceLength");
                    return e || (p.getSourceData() ? p.getSourceData().length : 0)
                }, this.countSourceCols = function () {
                    var e = 0, t = p.getSourceData() && p.getSourceData()[0] ? p.getSourceData()[0] : [];
                    return e = G(t) ? K(t) : t.length || 0
                }, this.countRows = function () {
                    return u.getLength()
                }, this.countCols = function () {
                    var e = !1, t = 0;
                    if ("array" === p.dataType && (e = l.settings.data && l.settings.data[0] && l.settings.data[0].length), e && (t = l.settings.data[0].length), l.settings.columns) {
                        var n = P(l.settings.columns);
                        if (n) if ("array" === p.dataType) {
                            for (var o = 0, r = 0; r < t; r++) l.settings.columns(r) && o++;
                            t = o
                        } else "object" !== p.dataType && "function" !== p.dataType || (t = u.colToPropCache.length); else t = l.settings.columns.length
                    } else "object" !== p.dataType && "function" !== p.dataType || (t = u.colToPropCache.length);
                    return t
                }, this.rowOffset = function () {
                    return p.view.wt.wtTable.getFirstRenderedRow()
                }, this.colOffset = function () {
                    return p.view.wt.wtTable.getFirstRenderedColumn()
                }, this.countRenderedRows = function () {
                    return p.view.wt.drawn ? p.view.wt.wtTable.getRenderedRowsCount() : -1
                }, this.countVisibleRows = function () {
                    return p.view.wt.drawn ? p.view.wt.wtTable.getVisibleRowsCount() : -1
                }, this.countRenderedCols = function () {
                    return p.view.wt.drawn ? p.view.wt.wtTable.getRenderedColumnsCount() : -1
                }, this.countVisibleCols = function () {
                    return p.view.wt.drawn ? p.view.wt.wtTable.getVisibleColumnsCount() : -1
                }, this.countEmptyRows = function (e) {
                    for (var t, n = p.countRows() - 1, o = 0; n >= 0;) {
                        if (t = E.hooks.run(this, "modifyRow", n), p.isEmptyRow(t)) o++; else if (e) break;
                        n--
                    }
                    return o
                }, this.countEmptyCols = function (e) {
                    if (p.countRows() < 1) return 0;
                    for (var t = p.countCols() - 1, n = 0; t >= 0;) {
                        if (p.isEmptyCol(t)) n++; else if (e) break;
                        t--
                    }
                    return n
                }, this.isEmptyRow = function (e) {
                    return l.settings.isEmptyRow.call(p, e)
                }, this.isEmptyCol = function (e) {
                    return l.settings.isEmptyCol.call(p, e)
                }, this.selectCell = function (e, t, n, o, r, i) {
                    var s;
                    if (i = I(i) || i === !0, "number" != typeof e || e < 0 || e >= p.countRows()) return !1;
                    if ("number" != typeof t || t < 0 || t >= p.countCols()) return !1;
                    if (L(n)) {
                        if ("number" != typeof n || n < 0 || n >= p.countRows()) return !1;
                        if ("number" != typeof o || o < 0 || o >= p.countCols()) return !1
                    }
                    return s = new ue(e, t), l.selRange = new ce(s, s, s), i && p.listen(), I(n) ? h.setRangeEnd(l.selRange.from, r) : h.setRangeEnd(new ue(n, o), r), p.selection.finish(), !0
                }, this.selectCellByProp = function (e, t, n, o, r) {
                    return arguments[1] = u.propToCol(arguments[1]), L(arguments[3]) && (arguments[3] = u.propToCol(arguments[3])), p.selectCell.apply(p, arguments)
                }, this.deselectCell = function () {
                    h.deselect()
                }, this.scrollViewportTo = function (e, t) {
                    var n = void 0 !== arguments[2] && arguments[2], o = void 0 !== arguments[3] && arguments[3];
                    if (void 0 !== e && (e < 0 || e >= p.countRows())) return !1;
                    if (void 0 !== t && (t < 0 || t >= p.countCols())) return !1;
                    var r = !1;
                    return void 0 !== e && void 0 !== t && (p.view.wt.wtOverlays.topOverlay.scrollTo(e, n), p.view.wt.wtOverlays.leftOverlay.scrollTo(t, o), r = !0), "number" == typeof e && "number" != typeof t && (p.view.wt.wtOverlays.topOverlay.scrollTo(e, n), r = !0), "number" == typeof t && "number" != typeof e && (p.view.wt.wtOverlays.leftOverlay.scrollTo(t, o), r = !0), r
                }, this.destroy = function () {
                    p._clearTimeouts(), p.view && p.view.destroy(), c && c.destroy(), c = null, x(p.rootElement), g.destroy(), E.hooks.run(p, "afterDestroy"), E.hooks.destroy(p);
                    for (var e in p) p.hasOwnProperty(e) && (P(p[e]) ? p[e] = a : "guid" !== e && (p[e] = null));
                    u && u.destroy(), u = null, l = null, d = null, h = null, f = null, p = null, m = null
                }, this.getActiveEditor = function () {
                    return f.getActiveEditor()
                }, this.getPlugin = function (e) {
                    return J(this, e)
                }, this.getInstance = function () {
                    return p
                }, this.addHook = function (e, t) {
                    E.hooks.add(e, t, p)
                }, this.hasHook = function (e) {
                    return E.hooks.has(e, p)
                }, this.addHookOnce = function (e, t) {
                    E.hooks.once(e, t, p)
                }, this.removeHook = function (e, t) {
                    E.hooks.remove(e, t, p)
                }, this.runHooks = function (e, t, n, o, r, i, s) {
                    return E.hooks.run(p, e, t, n, o, r, i, s)
                }, this.timeouts = [], this._registerTimeout = function (e) {
                    this.timeouts.push(e)
                }, this._clearTimeouts = function () {
                    for (var e = 0, t = this.timeouts.length; e < t; e++) clearTimeout(this.timeouts[e])
                }, this.version = E.version, E.hooks.run(p, "construct")
            };
            var he = function () {
            };
            he.prototype = {
                data: void 0,
                dataSchema: void 0,
                width: void 0,
                height: void 0,
                startRows: 5,
                startCols: 5,
                rowHeaders: void 0,
                colHeaders: null,
                colWidths: void 0,
                rowHeights: void 0,
                columns: void 0,
                cells: void 0,
                cell: [],
                comments: !1,
                customBorders: !1,
                minRows: 0,
                minCols: 0,
                maxRows: 1 / 0,
                maxCols: 1 / 0,
                minSpareRows: 0,
                minSpareCols: 0,
                allowInsertRow: !0,
                allowInsertColumn: !0,
                allowRemoveRow: !0,
                allowRemoveColumn: !0,
                multiSelect: !0,
                fillHandle: !0,
                fixedRowsTop: 0,
                fixedRowsBottom: 0,
                fixedColumnsLeft: 0,
                outsideClickDeselects: !0,
                enterBeginsEditing: !0,
                enterMoves: {row: 1, col: 0},
                tabMoves: {row: 0, col: 1},
                autoWrapRow: !1,
                autoWrapCol: !1,
                copyRowsLimit: 1e3,
                copyColsLimit: 1e3,
                pasteMode: "overwrite",
                persistentState: void 0,
                currentRowClassName: void 0,
                currentColClassName: void 0,
                currentHeaderClassName: "ht__highlight",
                className: void 0,
                tableClassName: void 0,
                stretchH: "none",
                isEmptyRow: function (e) {
                    var t, n, o, r;
                    for (t = 0, n = this.countCols(); t < n; t++) if (o = this.getDataAtCell(e, t), "" !== o && null !== o && L(o)) return "object" == typeof o && (r = this.getCellMeta(e, t), $(this.getSchema()[r.prop], o));
                    return !0
                },
                isEmptyCol: function (e) {
                    var t, n, o;
                    for (t = 0, n = this.countRows(); t < n; t++) if (o = this.getDataAtCell(t, e), "" !== o && null !== o && L(o)) return !1;
                    return !0
                },
                observeDOMVisibility: !0,
                allowInvalid: !0,
                allowEmpty: !0,
                invalidCellClassName: "htInvalid",
                placeholder: !1,
                placeholderCellClassName: "htPlaceholder",
                readOnlyCellClassName: "htDimmed",
                renderer: void 0,
                commentedCellClassName: "htCommentCell",
                fragmentSelection: !1,
                readOnly: !1,
                skipColumnOnPaste: !1,
                search: !1,
                type: "text",
                copyable: !0,
                editor: void 0,
                autoComplete: void 0,
                visibleRows: 10,
                trimDropdown: !0,
                debug: !1,
                wordWrap: !0,
                noWordWrapClassName: "htNoWrap",
                contextMenu: void 0,
                contextMenuCopyPaste: void 0,
                copyPaste: void 0,
                undo: void 0,
                columnSorting: void 0,
                manualColumnMove: void 0,
                manualColumnResize: void 0,
                manualRowMove: void 0,
                manualRowResize: void 0,
                mergeCells: !1,
                viewportRowRenderingOffset: "auto",
                viewportColumnRenderingOffset: "auto",
                validator: void 0,
                disableVisualSelection: !1,
                sortIndicator: void 0,
                manualColumnFreeze: void 0,
                trimWhitespace: !0,
                settings: void 0,
                source: void 0,
                title: void 0,
                checkedTemplate: void 0,
                uncheckedTemplate: void 0,
                label: void 0,
                format: void 0,
                language: void 0,
                selectOptions: void 0,
                autoColumnSize: void 0,
                autoRowSize: void 0,
                dateFormat: void 0,
                correctFormat: !1,
                defaultDate: void 0,
                strict: void 0,
                allowHtml: !1,
                renderAllRows: void 0,
                preventOverflow: !1,
                bindRowsWithHeaders: void 0,
                collapsibleColumns: void 0,
                columnSummary: void 0,
                dropdownMenu: void 0,
                filters: void 0,
                formulas: void 0,
                ganttChart: void 0,
                headerTooltips: void 0,
                hiddenColumns: void 0,
                hiddenRows: void 0,
                nestedHeaders: void 0,
                trimRows: void 0,
                rowHeaderWidth: void 0,
                columnHeaderHeight: void 0,
                observeChanges: void 0,
                sortFunction: void 0,
                sortByRelevance: !0,
                filter: !0,
                filteringCaseSensitive: !1
            }, E.DefaultSettings = he
        }, {
            "3rdparty/walkontable/src/calculator/viewportColumns": 4,
            "3rdparty/walkontable/src/cell/coords": 6,
            "3rdparty/walkontable/src/cell/range": 7,
            browser: 24,
            dataMap: 27,
            dataSource: 28,
            editorManager: 29,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/browser": 44,
            "helpers/data": 45,
            "helpers/dom/element": 47,
            "helpers/function": 50,
            "helpers/mixed": 51,
            "helpers/number": 52,
            "helpers/object": 53,
            "helpers/setting": 54,
            "helpers/string": 55,
            numbro: "numbro",
            plugins: 61,
            renderers: 117,
            tableView: 126,
            "utils/recordTranslator": 130
        }],
        27: [function (e, t, n) {
            "use strict";

            function o(e, t, n) {
                var o = this;
                this.instance = e, this.priv = t, this.GridSettings = n, this.dataSource = this.instance.getSettings().data, this.cachedLength = null, this.skipCache = !1, this.latestSourceRowsCount = 0, this.dataSource && this.dataSource[0] ? this.duckSchema = this.recursiveDuckSchema(this.dataSource[0]) : this.duckSchema = {}, this.createMap(), this.interval = O.create(function () {
                    return o.clearLengthCache()
                }, "15fps"), this.instance.addHook("skipLengthCache", function (e) {
                    return o.onSkipLengthCache(e)
                })
            }

            Object.defineProperties(n, {
                DataMap: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c, d, h, f = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                p = (i = e("SheetClip"), i && i.__esModule && i || {default: i}).default,
                m = (s = e("helpers/data"), s && s.__esModule && s || {default: s}).cellMethodLookupFactory,
                g = (a = e("helpers/setting"), a && a.__esModule && a || {default: a}).columnFactory,
                w = (l = e("helpers/object"), l && l.__esModule && l || {default: l}), v = w.createObjectPropListener,
                y = w.duckSchema, b = w.deepExtend, C = w.deepClone, _ = w.isObject, R = w.deepObjectSize,
                M = (u = e("helpers/array"), u && u.__esModule && u || {default: u}), S = M.extendArray,
                E = M.to2dArray, O = (c = e("utils/interval"), c && c.__esModule && c || {default: c}).Interval,
                T = (d = e("helpers/number"), d && d.__esModule && d || {default: d}).rangeEach,
                k = (h = e("multiMap"), h && h.__esModule && h || {default: h}).MultiMap;
            o.prototype.DESTINATION_RENDERER = 1, o.prototype.DESTINATION_CLIPBOARD_GENERATOR = 2, o.prototype.recursiveDuckSchema = function (e) {
                return y(e)
            }, o.prototype.recursiveDuckColumns = function (e, t, n) {
                var o, r;
                if ("undefined" == typeof t && (t = 0, n = ""), "object" == typeof e && !Array.isArray(e)) for (r in e) e.hasOwnProperty(r) && (null === e[r] ? (o = n + r, this.colToPropCache.push(o), this.propToColCache.set(o, t), t++) : t = this.recursiveDuckColumns(e[r], t, r + "."));
                return t
            }, o.prototype.createMap = function () {
                var e, t = this.getSchema();
                if ("undefined" == typeof t) throw new Error("trying to create `columns` definition but you didn't provide `schema` nor `data`");
                this.colToPropCache = [], this.propToColCache = new k;
                var n = this.instance.getSettings().columns;
                if (n) {
                    var o = n.length, r = 0, i = !1, s = R(t);
                    for ("function" == typeof n && (o = s > 0 ? s : this.instance.countSourceCols(), i = !0), e = 0; e < o; e++) {
                        var a = i ? n(e) : n[e];
                        if (_(a)) {
                            if ("undefined" != typeof a.data) {
                                var l = i ? r : e;
                                this.colToPropCache[l] = a.data, this.propToColCache.set(a.data, l)
                            }
                            r++
                        }
                    }
                } else this.recursiveDuckColumns(t)
            }, o.prototype.colToProp = function (e) {
                return e = f.hooks.run(this.instance, "modifyCol", e), this.colToPropCache && "undefined" != typeof this.colToPropCache[e] ? this.colToPropCache[e] : e
            }, o.prototype.propToCol = function (e) {
                var t;
                return t = "undefined" == typeof this.propToColCache.get(e) ? e : this.propToColCache.get(e), t = f.hooks.run(this.instance, "unmodifyCol", t)
            }, o.prototype.getSchema = function () {
                var e = this.instance.getSettings().dataSchema;
                return e ? "function" == typeof e ? e() : e : this.duckSchema
            }, o.prototype.createRow = function (e, t, n) {
                var o, r, i = this.instance.countCols(), s = 0;
                t || (t = 1), ("number" != typeof e || e >= this.instance.countSourceRows()) && (e = this.instance.countSourceRows()), f.hooks.run(this.instance, "beforeCreateRow", e, t, n), r = e;
                for (var a = this.instance.getSettings().maxRows; s < t && this.instance.countSourceRows() < a;) "array" === this.instance.dataType ? this.instance.getSettings().dataSchema ? o = C(this.getSchema()) : (o = [], T(i - 1, function () {
                    return o.push(null)
                })) : "function" === this.instance.dataType ? o = this.instance.getSettings().dataSchema(e) : (o = {}, b(o, this.getSchema())), e === this.instance.countSourceRows() ? this.dataSource.push(o) : this.spliceData(e, 0, o), s++, r++;
                return f.hooks.run(this.instance, "afterCreateRow", e, s, n), this.instance.forceFullRender = !0, s
            }, o.prototype.createCol = function (e, t, n) {
                if (!this.instance.isColumnModificationAllowed()) throw new Error("Cannot create new column. When data source in an object, you can only have as much columns as defined in first data row, data schema or in the 'columns' setting.If you want to be able to add new columns, you have to use array datasource.");
                var o, r, i = this.instance.countSourceRows(), s = this.dataSource, a = 0;
                t || (t = 1), ("number" != typeof e || e >= this.instance.countCols()) && (e = this.instance.countCols()), f.hooks.run(this.instance, "beforeCreateCol", e, t, n), r = e;
                for (var l = this.instance.getSettings().maxCols; a < t && this.instance.countCols() < l;) {
                    if (o = g(this.GridSettings, this.priv.columnsSettingConflicts), "number" != typeof e || e >= this.instance.countCols()) {
                        if (i > 0) for (var u = 0; u < i; u++) "undefined" == typeof s[u] && (s[u] = []), s[u].push(null); else s.push([null]);
                        this.priv.columnSettings.push(o)
                    } else {
                        for (var u = 0; u < i; u++) s[u].splice(r, 0, null);
                        this.priv.columnSettings.splice(r, 0, o)
                    }
                    a++, r++
                }
                return f.hooks.run(this.instance, "afterCreateCol", e, a, n), this.instance.forceFullRender = !0, a
            }, o.prototype.removeRow = function (e, t, n) {
                t || (t = 1), "number" != typeof e && (e = -t), t = f.hooks.run(this.instance, "modifyRemovedAmount", t, e), e = (this.instance.countSourceRows() + e) % this.instance.countSourceRows();
                var o = this.physicalRowsToLogical(e, t), r = f.hooks.run(this.instance, "beforeRemoveRow", e, t, o, n);
                if (r !== !1) {
                    var i, s = this.dataSource;
                    i = this.filterData(e, t), i && (s.length = 0, Array.prototype.push.apply(s, i)), f.hooks.run(this.instance, "afterRemoveRow", e, t, o, n), this.instance.forceFullRender = !0
                }
            }, o.prototype.removeCol = function (e, t, n) {
                if ("object" === this.instance.dataType || this.instance.getSettings().columns) throw new Error("cannot remove column with object data source or columns option specified");
                t || (t = 1), "number" != typeof e && (e = -t), e = (this.instance.countCols() + e) % this.instance.countCols();
                var o = this.physicalColumnsToLogical(e, t), r = o.slice(0).sort(function (e, t) {
                    return t - e
                }), i = f.hooks.run(this.instance, "beforeRemoveCol", e, t, o, n);
                if (i !== !1) {
                    for (var s = !0, a = r.length, l = this.dataSource, u = 0; u < a; u++) s && o[0] !== o[u] - u && (s = !1);
                    if (s) for (var c = 0, d = this.instance.countSourceRows(); c < d; c++) l[c].splice(o[0], t); else {
                        for (var h = 0, p = this.instance.countSourceRows(); h < p; h++) for (var m = 0; m < a; m++) l[h].splice(r[m], 1);
                        for (var g = 0; g < a; g++) this.priv.columnSettings.splice(o[g], 1)
                    }
                    f.hooks.run(this.instance, "afterRemoveCol", e, t, o, n), this.instance.forceFullRender = !0
                }
            }, o.prototype.spliceCol = function (e, t, n) {
                var o = 4 <= arguments.length ? [].slice.call(arguments, 3) : [], r = this.instance.getDataAtCol(e),
                    i = r.slice(t, t + n), s = r.slice(t + n);
                S(o, s);
                for (var a = 0; a < n;) o.push(null), a++;
                return E(o), this.instance.populateFromArray(t, e, o, null, null, "spliceCol"), i
            }, o.prototype.spliceRow = function (e, t, n) {
                var o = 4 <= arguments.length ? [].slice.call(arguments, 3) : [],
                    r = this.instance.getSourceDataAtRow(e), i = r.slice(t, t + n), s = r.slice(t + n);
                S(o, s);
                for (var a = 0; a < n;) o.push(null), a++;
                return this.instance.populateFromArray(e, t, [o], null, null, "spliceRow"), i
            }, o.prototype.spliceData = function (e, t, n) {
                var o = f.hooks.run(this.instance, "beforeDataSplice", e, t, n);
                o !== !1 && this.dataSource.splice(e, t, n)
            }, o.prototype.filterData = function (e, t) {
                var n = this.physicalRowsToLogical(e, t), o = f.hooks.run(this.instance, "beforeDataFilter", e, t, n);
                if (o !== !1) {
                    var r = this.dataSource.filter(function (e, t) {
                        return n.indexOf(t) == -1
                    });
                    return r
                }
            }, o.prototype.get = function (e, t) {
                e = f.hooks.run(this.instance, "modifyRow", e);
                var n = this.dataSource[e], o = f.hooks.run(this.instance, "modifyRowData", e);
                n = isNaN(o) ? o : n;
                var r = null;
                if (n && n.hasOwnProperty && n.hasOwnProperty(t)) r = n[t]; else if ("string" == typeof t && t.indexOf(".") > -1) {
                    var i = t.split("."), s = n;
                    if (!s) return null;
                    for (var a = 0, l = i.length; a < l; a++) if (s = s[i[a]], "undefined" == typeof s) return null;
                    r = s
                } else "function" == typeof t && (r = t(this.dataSource.slice(e, e + 1)[0]));
                if (f.hooks.has("modifyData", this.instance)) {
                    var u = v(r);
                    f.hooks.run(this.instance, "modifyData", e, this.propToCol(t), u, "get"), u.isTouched() && (r = u.value)
                }
                return r
            };
            var x = m("copyable", !1);
            o.prototype.getCopyable = function (e, t) {
                return x.call(this.instance, e, this.propToCol(t)) ? this.get(e, t) : ""
            }, o.prototype.set = function (e, t, n, o) {
                e = f.hooks.run(this.instance, "modifyRow", e, o || "datamapGet");
                var r = this.dataSource[e], i = f.hooks.run(this.instance, "modifyRowData", e);
                if (r = isNaN(i) ? i : r, f.hooks.has("modifyData", this.instance)) {
                    var s = v(n);
                    f.hooks.run(this.instance, "modifyData", e, this.propToCol(t), s, "set"), s.isTouched() && (n = s.value)
                }
                if (r && r.hasOwnProperty && r.hasOwnProperty(t)) r[t] = n; else if ("string" == typeof t && t.indexOf(".") > -1) {
                    for (var a = t.split("."), l = r, u = 0, c = a.length - 1; u < c; u++) "undefined" == typeof l[a[u]] && (l[a[u]] = {}), l = l[a[u]];
                    l[a[u]] = n
                } else "function" == typeof t ? t(this.dataSource.slice(e, e + 1)[0], n) : r[t] = n
            }, o.prototype.physicalRowsToLogical = function (e, t) {
                for (var n, o = this.instance.countSourceRows(), r = (o + e) % o, i = [], s = t; r < o && s;) n = f.hooks.run(this.instance, "modifyRow", r), i.push(n), s--, r++;
                return i
            }, o.prototype.physicalColumnsToLogical = function (e, t) {
                for (var n = this.instance.countCols(), o = (n + e) % n, r = [], i = t; o < n && i;) {
                    var s = f.hooks.run(this.instance, "modifyCol", o);
                    r.push(s), i--, o++
                }
                return r
            }, o.prototype.clear = function () {
                for (var e = 0; e < this.instance.countSourceRows(); e++) for (var t = 0; t < this.instance.countCols(); t++) this.set(e, this.colToProp(t), "")
            }, o.prototype.clearLengthCache = function () {
                this.cachedLength = null
            }, o.prototype.getLength = function () {
                var e, t = this, n = this.instance.getSettings().maxRows;
                e = n < 0 || 0 === n ? 0 : n || 1 / 0;
                var o = this.instance.countSourceRows();
                if (f.hooks.has("modifyRow", this.instance)) {
                    var r = this.skipCache;
                    this.interval.start(), o !== this.latestSourceRowsCount && (r = !0), this.latestSourceRowsCount = o, null === this.cachedLength || r ? (T(o - 1, function (e) {
                        e = f.hooks.run(t.instance, "modifyRow", e), null === e && --o
                    }), this.cachedLength = o) : o = this.cachedLength
                } else this.interval.stop();
                return Math.min(o, e)
            }, o.prototype.getAll = function () {
                var e = {row: 0, col: 0}, t = this.instance.getSettings().maxRows;
                if (0 === t) return [];
                var n = {
                    row: Math.min(Math.max(t - 1, 0), Math.max(this.instance.countSourceRows() - 1, 0)),
                    col: Math.max(this.instance.countCols() - 1, 0)
                };
                return e.row - n.row !== 0 || this.instance.countSourceRows() ? this.getRange(e, n, o.prototype.DESTINATION_RENDERER) : []
            }, o.prototype.getRange = function (e, t, n) {
                var o, r, i, s, a, l = [], u = n === this.DESTINATION_CLIPBOARD_GENERATOR ? this.getCopyable : this.get;
                for (r = Math.max(e.row, t.row), s = Math.max(e.col, t.col), o = Math.min(e.row, t.row); o <= r; o++) {
                    a = [];
                    var c = f.hooks.run(this.instance, "modifyRow", o);
                    for (i = Math.min(e.col, t.col); i <= s && null !== c; i++) a.push(u.call(this, o, this.colToProp(i)));
                    null !== c && l.push(a)
                }
                return l
            }, o.prototype.getText = function (e, t) {
                return p.stringify(this.getRange(e, t, this.DESTINATION_RENDERER))
            }, o.prototype.getCopyableText = function (e, t) {
                return p.stringify(this.getRange(e, t, this.DESTINATION_CLIPBOARD_GENERATOR))
            }, o.prototype.onSkipLengthCache = function (e) {
                var t = this;
                this.skipCache = !0, setTimeout(function () {
                    t.skipCache = !1
                }, e)
            }, o.prototype.destroy = function () {
                this.interval.stop(), this.interval = null, this.instance = null, this.priv = null, this.GridSettings = null, this.dataSource = null, this.cachedLength = null, this.duckSchema = null
            }
        }, {
            SheetClip: "SheetClip",
            browser: 24,
            "helpers/array": 43,
            "helpers/data": 45,
            "helpers/number": 52,
            "helpers/object": 53,
            "helpers/setting": 54,
            multiMap: 59,
            "utils/interval": 129
        }],
        28: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                DataSource: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("helpers/object"), o && o.__esModule && o || {default: o}).getProperty,
                a = (r = e("helpers/array"), r && r.__esModule && r || {default: r}).arrayEach,
                l = (i = e("helpers/number"), i && i.__esModule && i || {default: i}).rangeEach, u = function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : [];
                    this.hot = e, this.data = t, this.dataType = "array", this.colToProp = function () {
                    }, this.propToCol = function () {
                    }
                };
            $traceurRuntime.createClass(u, {
                getData: function () {
                    var e = void 0 !== arguments[0] && arguments[0], t = this.data;
                    return e && (t = this.getByRange({row: 0, col: 0}, {
                        row: Math.max(this.countRows() - 1, 0),
                        col: Math.max(this.countColumns() - 1, 0)
                    }, !0)), t
                }, setData: function (e) {
                    this.data = e
                }, getAtColumn: function (e) {
                    var t = this, n = [];
                    return a(this.data, function (o) {
                        var r = t.colToProp(e);
                        o = "string" == typeof r ? s(o, r) : o[r], n.push(o)
                    }), n
                }, getAtRow: function (e) {
                    return this.data[e]
                }, getAtCell: function (e, t) {
                    var n = null, o = this.hot.runHooks("modifyRowData", e), r = isNaN(o) ? o : this.data[e];
                    if (r) {
                        var i = this.colToProp(t);
                        n = "string" == typeof i ? s(r, i) : "function" == typeof i ? i(this.data.slice(e, e + 1)[0]) : r[i]
                    }
                    return n
                }, getByRange: function (e, t) {
                    var n = void 0 !== arguments[2] && arguments[2], o = this, r = Math.min(e.row, t.row),
                        i = Math.min(e.col, t.col), s = Math.max(e.row, t.row), a = Math.max(e.col, t.col), u = [];
                    return l(r, s, function (e) {
                        var t, r = o.getAtRow(e);
                        "array" === o.dataType ? t = r.slice(i, a + 1) : "object" === o.dataType && (t = n ? [] : {}, l(i, a, function (e) {
                            var i = o.colToProp(e);
                            n ? t.push(r[i]) : t[i] = r[i]
                        })), u.push(t)
                    }), u
                }, countRows: function () {
                    return Array.isArray(this.data) ? this.data.length : 0
                }, countColumns: function () {
                    var e = 0;
                    return Array.isArray(this.data) && ("array" === this.dataType ? e = this.data[0].length : "object" === this.dataType && (e = Object.keys(this.data[0]).length)), e
                }, destroy: function () {
                    this.data = null, this.hot = null
                }
            }, {})
        }, {"helpers/array": 43, "helpers/number": 52, "helpers/object": 53}],
        29: [function (e, t, n) {
            "use strict";

            function o(e, t, n) {
                function o(e) {
                    var o = "function" == typeof t.settings.enterMoves ? t.settings.enterMoves(event) : t.settings.enterMoves;
                    e ? n.transformStart(-o.row, -o.col) : n.transformStart(o.row, o.col, !0)
                }

                function r(e) {
                    e ? n.transformEnd(-1, 0) : n.transformStart(-1, 0)
                }

                function i(e) {
                    e ? n.transformEnd(1, 0) : n.transformStart(1, 0)
                }

                function s(e) {
                    e ? n.transformEnd(0, 1) : n.transformStart(0, 1)
                }

                function a(e) {
                    e ? n.transformEnd(0, -1) : n.transformStart(0, -1)
                }

                function l(l) {
                    var u, h;
                    if (e.isListening() && (c.hooks.run(e, "beforeKeyDown", l), !_ && !y(l) && (t.lastKeyCode = l.keyCode, n.isSelected()))) {
                        if (u = (l.ctrlKey || l.metaKey) && !l.altKey, g && !g.isWaiting() && !(p(l.keyCode) || m(l.keyCode) || u || C.isEditorOpened())) return void C.openEditor("", l);
                        switch (h = l.shiftKey ? n.setRangeEnd : n.setRangeStart, l.keyCode) {
                            case f.A:
                                !C.isEditorOpened() && u && (n.selectAll(), l.preventDefault(), w(l));
                                break;
                            case f.ARROW_UP:
                                C.isEditorOpened() && !g.isWaiting() && C.closeEditorAndSaveChanges(u), r(l.shiftKey), l.preventDefault(), w(l);
                                break;
                            case f.ARROW_DOWN:
                                C.isEditorOpened() && !g.isWaiting() && C.closeEditorAndSaveChanges(u), i(l.shiftKey), l.preventDefault(), w(l);
                                break;
                            case f.ARROW_RIGHT:
                                C.isEditorOpened() && !g.isWaiting() && C.closeEditorAndSaveChanges(u), s(l.shiftKey), l.preventDefault(), w(l);
                                break;
                            case f.ARROW_LEFT:
                                C.isEditorOpened() && !g.isWaiting() && C.closeEditorAndSaveChanges(u), a(l.shiftKey), l.preventDefault(), w(l);
                                break;
                            case f.TAB:
                                var b = "function" == typeof t.settings.tabMoves ? t.settings.tabMoves(l) : t.settings.tabMoves;
                                l.shiftKey ? n.transformStart(-b.row, -b.col) : n.transformStart(b.row, b.col, !0), l.preventDefault(), w(l);
                                break;
                            case f.BACKSPACE:
                            case f.DELETE:
                                n.empty(l), C.prepareEditor(), l.preventDefault();
                                break;
                            case f.F2:
                                C.openEditor(null, l), g && g.enableFullEditMode(), l.preventDefault();
                                break;
                            case f.ENTER:
                                C.isEditorOpened() ? (g && g.state !== c.EditorState.WAITING && C.closeEditorAndSaveChanges(u), o(l.shiftKey)) : e.getSettings().enterBeginsEditing ? (C.openEditor(null, l), g && g.enableFullEditMode()) : o(l.shiftKey), l.preventDefault(), v(l);
                                break;
                            case f.ESCAPE:
                                C.isEditorOpened() && C.closeEditorAndRestoreOriginalValue(u), l.preventDefault();
                                break;
                            case f.HOME:
                                h(l.ctrlKey || l.metaKey ? new d(0, t.selRange.from.col) : new d(t.selRange.from.row, 0)), l.preventDefault(), w(l);
                                break;
                            case f.END:
                                h(l.ctrlKey || l.metaKey ? new d(e.countRows() - 1, t.selRange.from.col) : new d(t.selRange.from.row, e.countCols() - 1)), l.preventDefault(), w(l);
                                break;
                            case f.PAGE_UP:
                                n.transformStart(-e.countVisibleRows(), 0), l.preventDefault(), w(l);
                                break;
                            case f.PAGE_DOWN:
                                n.transformStart(e.countVisibleRows(), 0), l.preventDefault(), w(l)
                        }
                    }
                }

                function u() {
                    function t(e, t, n) {
                        "TD" == n.nodeName && (C.openEditor(), g && g.enableFullEditMode())
                    }

                    e.addHook("afterDocumentKeyDown", l), h.addEventListener(document.documentElement, "keydown", function (t) {
                        _ || e.runHooks("afterDocumentKeyDown", t)
                    }), e.view.wt.update("onCellDblClick", t), e.addHook("afterDestroy", function () {
                        _ = !0
                    })
                }

                var h, g, C = this, _ = !1;
                h = b(e), this.destroyEditor = function (e) {
                    this.closeEditor(e)
                }, this.getActiveEditor = function () {
                    return g
                }, this.prepareEditor = function () {
                    var n, o, r, i, s, a, l;
                    return g && g.isWaiting() ? void this.closeEditor(!1, !1, function (e) {
                        e && C.prepareEditor()
                    }) : (n = t.selRange.highlight.row, o = t.selRange.highlight.col, r = e.colToProp(o), i = e.getCell(n, o), s = e.getSourceDataAtCell(e.runHooks("modifyRow", n), o), a = e.getCellMeta(n, o), l = e.getCellEditor(a), void (l ? (g = c.editors.getEditor(l, e), g.prepare(n, o, r, i, s, a)) : g = void 0))
                }, this.isEditorOpened = function () {
                    return g && g.isOpened()
                }, this.openEditor = function (e, t) {
                    g && !g.cellProperties.readOnly ? g.beginEditing(e, t) : g && g.cellProperties.readOnly && t && t.keyCode === f.ENTER && o()
                }, this.closeEditor = function (e, t, n) {
                    g ? g.finishEditing(e, t, n) : n && n(!1)
                }, this.closeEditorAndSaveChanges = function (e) {
                    return this.closeEditor(!1, e)
                }, this.closeEditorAndRestoreOriginalValue = function (e) {
                    return this.closeEditor(!0, e)
                }, u()
            }

            Object.defineProperties(n, {
                EditorManager: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                d = (i = e("3rdparty/walkontable/src/cell/coords"), i && i.__esModule && i || {default: i}).WalkontableCellCoords,
                h = (s = e("helpers/unicode"), s && s.__esModule && s || {default: s}), f = h.KEY_CODES,
                p = h.isMetaKey, m = h.isCtrlKey,
                g = (a = e("helpers/dom/event"), a && a.__esModule && a || {default: a}), w = g.stopPropagation,
                v = g.stopImmediatePropagation, y = g.isImmediatePropagationStopped,
                b = ((l = e("editors"), l && l.__esModule && l || {default: l}).getEditor, (u = e("eventManager"), u && u.__esModule && u || {default: u}).eventManager);
            c.EditorManager = o
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            browser: 24,
            editors: 30,
            eventManager: 42,
            "helpers/dom/event": 48,
            "helpers/unicode": 56
        }],
        30: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t, n;
                n = {}, t = e, this.getConstructor = function () {
                    return e
                }, this.getInstance = function (e) {
                    return e.guid in n || (n[e.guid] = new t(e)), n[e.guid]
                }
            }

            function r(e, t) {
                var n = new o(t);
                "string" == typeof e && (h[e] = n, c.editors[d(e) + "Editor"] = t), f.set(t, n)
            }

            function i(e, t) {
                var n;
                if ("function" == typeof e) f.get(e) || r(null, e), n = f.get(e); else {
                    if ("string" != typeof e) throw Error('Only strings and functions can be passed as "editor" parameter ');
                    n = h[e]
                }
                if (!n) throw Error('No editor registered under name "' + e + '"');
                return n.getInstance(t)
            }

            function s(e) {
                var t;
                if ("string" != typeof e) throw Error('Only strings and functions can be passed as "editor" parameter ');
                if (t = h[e], !t) throw Error('No editor registered under name "' + e + '"');
                return t.getConstructor()
            }

            function a(e) {
                return !!h[e]
            }

            Object.defineProperties(n, {
                registerEditor: {
                    get: function () {
                        return r
                    }
                }, getEditor: {
                    get: function () {
                        return i
                    }
                }, hasEditor: {
                    get: function () {
                        return a
                    }
                }, getEditorConstructor: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            });
            var l, u, c = (l = e("browser"), l && l.__esModule && l || {default: l}).default,
                d = (u = e("helpers/string"), u && u.__esModule && u || {default: u}).toUpperCaseFirst, h = {},
                f = new WeakMap;
            c.editors = c.editors || {}, c.editors.registerEditor = r, c.editors.getEditor = i
        }, {browser: 24, "helpers/string": 55}],
        31: [function (e, t, n) {
            "use strict";

            function o(e) {
                this.instance = e, this.state = a.EditorState.VIRGIN, this._opened = !1, this._fullEditMode = !1, this._closeCallback = null, this.init()
            }

            Object.defineProperties(n, {
                BaseEditor: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                l = (i = e("helpers/mixed"), i && i.__esModule && i || {default: i}).stringify,
                u = (s = e("3rdparty/walkontable/src/cell/coords"), s && s.__esModule && s || {default: s}).WalkontableCellCoords;
            a.editors = a.editors || {}, a.editors.BaseEditor = o, a.EditorState = {
                VIRGIN: "STATE_VIRGIN",
                EDITING: "STATE_EDITING",
                WAITING: "STATE_WAITING",
                FINISHED: "STATE_FINISHED"
            }, o.prototype._fireCallbacks = function (e) {
                this._closeCallback && (this._closeCallback(e), this._closeCallback = null)
            }, o.prototype.init = function () {
            }, o.prototype.getValue = function () {
                throw Error("Editor getValue() method unimplemented")
            }, o.prototype.setValue = function (e) {
                throw Error("Editor setValue() method unimplemented")
            }, o.prototype.open = function () {
                throw Error("Editor open() method unimplemented")
            }, o.prototype.close = function () {
                throw Error("Editor close() method unimplemented");
            }, o.prototype.prepare = function (e, t, n, o, r, i) {
                this.TD = o, this.row = e, this.col = t, this.prop = n, this.originalValue = r, this.cellProperties = i;
                var s = !document.activeElement || document.activeElement && void 0 === document.activeElement.nodeName;
                this.instance.view.isMouseDown() && document.activeElement && document.activeElement !== document.body && !s ? document.activeElement.blur() : s && document.body.focus(), this.state = a.EditorState.VIRGIN
            }, o.prototype.extend = function () {
                function e() {
                    n.apply(this, arguments)
                }

                function t(e, t) {
                    function n() {
                    }

                    return n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e
                }

                var n = this.constructor;
                return t(e, n)
            }, o.prototype.saveValue = function (e, t) {
                var n, o;
                t ? (n = this.instance.getSelected(), n[0] > n[2] && (o = n[0], n[0] = n[2], n[2] = o), n[1] > n[3] && (o = n[1], n[1] = n[3], n[3] = o)) : n = [this.row, this.col, null, null], this.instance.populateFromArray(n[0], n[1], e, n[2], n[3], "edit")
            }, o.prototype.beginEditing = function (e, t) {
                this.state == a.EditorState.VIRGIN && (this.instance.view.scrollViewport(new u(this.row, this.col)), this.instance.view.render(), this.state = a.EditorState.EDITING, e = "string" == typeof e ? e : this.originalValue, this.setValue(l(e)), this.open(t), this._opened = !0, this.focus(), this.instance.view.render(), this.instance.runHooks("afterBeginEditing", this.row, this.col))
            }, o.prototype.finishEditing = function (e, t, n) {
                var o, r = this;
                if (n) {
                    var i = this._closeCallback;
                    this._closeCallback = function (e) {
                        i && i(e), n(e), r.instance.view.render()
                    }
                }
                if (!this.isWaiting()) {
                    if (this.state == a.EditorState.VIRGIN) return void this.instance._registerTimeout(setTimeout(function () {
                        r._fireCallbacks(!0)
                    }, 0));
                    if (this.state == a.EditorState.EDITING) {
                        if (e) return this.cancelChanges(), void this.instance.view.render();
                        var s = this.getValue();
                        o = this.instance.getSettings().trimWhitespace ? [["string" == typeof s ? String.prototype.trim.call(s || "") : s]] : [[s]], this.state = a.EditorState.WAITING, this.saveValue(o, t), this.instance.getCellValidator(this.cellProperties) ? this.instance.addHookOnce("postAfterValidate", function (e) {
                            r.state = a.EditorState.FINISHED, r.discardEditor(e)
                        }) : (this.state = a.EditorState.FINISHED, this.discardEditor(!0))
                    }
                }
            }, o.prototype.cancelChanges = function () {
                this.state = a.EditorState.FINISHED, this.discardEditor()
            }, o.prototype.discardEditor = function (e) {
                this.state === a.EditorState.FINISHED && (e === !1 && this.cellProperties.allowInvalid !== !0 ? (this.instance.selectCell(this.row, this.col), this.focus(), this.state = a.EditorState.EDITING, this._fireCallbacks(!1)) : (this.close(), this._opened = !1, this._fullEditMode = !1, this.state = a.EditorState.VIRGIN, this._fireCallbacks(!0)))
            }, o.prototype.enableFullEditMode = function () {
                this._fullEditMode = !0
            }, o.prototype.isInFullEditMode = function () {
                return this._fullEditMode
            }, o.prototype.isOpened = function () {
                return this._opened
            }, o.prototype.isWaiting = function () {
                return this.state === a.EditorState.WAITING
            }, o.prototype.checkEditorSection = function () {
                var e = this.instance.countRows(), t = "";
                return this.row < this.instance.getSettings().fixedRowsTop ? t = this.col < this.instance.getSettings().fixedColumnsLeft ? "top-left-corner" : "top" : this.instance.getSettings().fixedRowsBottom && this.row >= e - this.instance.getSettings().fixedRowsBottom ? t = this.col < this.instance.getSettings().fixedColumnsLeft ? "bottom-left-corner" : "bottom" : this.col < this.instance.getSettings().fixedColumnsLeft && (t = "left"), t
            }
        }, {"3rdparty/walkontable/src/cell/coords": 6, browser: 24, "helpers/mixed": 51}],
        32: [function (e, t, n) {
            "use strict";

            function o(e) {
                H = !1;
                var t = this.getActiveEditor();
                if (f(e.keyCode) || e.keyCode === h.BACKSPACE || e.keyCode === h.DELETE || e.keyCode === h.INSERT) {
                    var n = 0;
                    if (e.keyCode === h.C && (e.ctrlKey || e.metaKey)) return;
                    t.isOpened() || (n += 10), t.htEditor && t.instance._registerTimeout(setTimeout(function () {
                        t.queryChoices(t.TEXTAREA.value), H = !0
                    }, n))
                }
            }

            Object.defineProperties(n, {
                AutocompleteEditor: {
                    get: function () {
                        return D
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c, d = (r = e("helpers/unicode"), r && r.__esModule && r || {default: r}),
                h = d.KEY_CODES, f = d.isPrintableChar,
                p = (i = e("helpers/mixed"), i && i.__esModule && i || {default: i}).stringify,
                m = (s = e("helpers/string"), s && s.__esModule && s || {default: s}).stripTags,
                g = (a = e("helpers/array"), a && a.__esModule && a || {default: a}), w = g.pivot,
                v = (g.arrayFilter, g.arrayMap),
                y = (l = e("helpers/dom/element"), l && l.__esModule && l || {default: l}), b = y.addClass,
                C = y.getCaretPosition, _ = y.getScrollbarWidth, R = y.getSelectionEndPosition, M = y.outerWidth,
                S = y.outerHeight, E = y.offset, O = y.getTrimmingContainer, T = y.setCaretPosition,
                k = (u = e("editors"), u && u.__esModule && u || {default: u}).registerEditor,
                x = (c = e("handsontableEditor"), c && c.__esModule && c || {default: c}).HandsontableEditor,
                D = x.prototype.extend();
            D.prototype.init = function () {
                x.prototype.init.apply(this, arguments), this.query = null, this.choices = []
            }, D.prototype.createElements = function () {
                x.prototype.createElements.apply(this, arguments), b(this.htContainer, "autocompleteEditor"), b(this.htContainer, window.navigator.platform.indexOf("Mac") === -1 ? "" : "htMacScroll")
            };
            var H = !1;
            D.prototype.prepare = function () {
                this.instance.addHook("beforeKeyDown", o), x.prototype.prepare.apply(this, arguments)
            }, D.prototype.open = function () {
                this.TEXTAREA_PARENT.style.overflow = "auto", x.prototype.open.apply(this, arguments), this.TEXTAREA_PARENT.style.overflow = "";
                var e = this.htEditor.getInstance(), t = this,
                    n = void 0 === this.cellProperties.trimDropdown || this.cellProperties.trimDropdown;
                this.TEXTAREA.style.visibility = "visible", this.focus(), e.updateSettings({
                    colWidths: n ? [M(this.TEXTAREA) - 2] : void 0,
                    width: n ? M(this.TEXTAREA) + _() + 2 : void 0,
                    afterRenderer: function (e, n, o, r, i, s) {
                        var a, l, u = t.cellProperties, c = u.filteringCaseSensitive, d = u.allowHtml;
                        i = p(i), i && !d && (a = c === !0 ? i.indexOf(this.query) : i.toLowerCase().indexOf(t.query.toLowerCase()), a !== -1 && (l = i.substr(a, t.query.length), i = i.replace(l, "<strong>" + l + "</strong>"))), e.innerHTML = i
                    },
                    autoColumnSize: !0,
                    modifyColWidth: function (e, t) {
                        var o = this.getPlugin("autoColumnSize").widths;
                        return o[t] && (e = o[t]), n ? e : e + 15
                    }
                }), this.htEditor.view.wt.wtTable.holder.parentNode.style["padding-right"] = _() + 2 + "px", H && (H = !1), t.instance._registerTimeout(setTimeout(function () {
                    t.queryChoices(t.TEXTAREA.value)
                }, 0))
            }, D.prototype.close = function () {
                x.prototype.close.apply(this, arguments)
            }, D.prototype.queryChoices = function (e) {
                var t = this;
                this.query = e;
                var n = this.cellProperties, o = n.source, r = (n.filter, n.filteringCaseSensitive, n.allowHtml),
                    i = function (e) {
                        return v(e, function (e) {
                            return m(e)
                        })
                    };
                "function" == typeof o ? o.call(this.cellProperties, e, function (e) {
                    t.updateChoicesList(r ? e : i(e))
                }) : Array.isArray(o) ? this.updateChoicesList(r ? o : i(o)) : this.updateChoicesList([])
            }, D.prototype.updateChoicesList = function (e) {
                var t = C(this.TEXTAREA), n = R(this.TEXTAREA), o = this.cellProperties.sortByRelevance,
                    r = this.cellProperties.filter, i = null, s = null;
                o && (i = D.sortByRelevance(this.getValue(), e, this.cellProperties.filteringCaseSensitive));
                var a = Array.isArray(i) ? i.length : 0;
                if (r === !1) a && (s = i[0]); else {
                    for (var l = [], u = 0, c = e.length; u < c && !(o && a <= u); u++) a ? l.push(e[i[u]]) : l.push(e[u]);
                    s = 0, e = l
                }
                this.choices = e, this.htEditor.loadData(w([e])), this.updateDropdownHeight(), this.flipDropdownIfNeeded(), this.cellProperties.strict === !0 && this.highlightBestMatchingChoice(s), this.instance.listen(), this.TEXTAREA.focus(), T(this.TEXTAREA, t, t === n ? void 0 : n)
            }, D.prototype.flipDropdownIfNeeded = function () {
                var e = E(this.TEXTAREA), t = S(this.TEXTAREA), n = this.getDropdownHeight(),
                    o = O(this.instance.view.wt.wtTable.TABLE), r = o.scrollTop,
                    i = S(this.instance.view.wt.wtTable.THEAD), s = {row: 0, col: 0};
                o !== window && (s = E(o));
                var a = e.top - s.top - i + r, l = o.scrollHeight - a - i - t, u = n > l && a > l;
                return u ? this.flipDropdown(n) : this.unflipDropdown(), this.limitDropdownIfNeeded(u ? a : l, n), u
            }, D.prototype.limitDropdownIfNeeded = function (e, t) {
                if (t > e) {
                    var n = 0, o = 0, r = 0, i = null;
                    do r = this.htEditor.getRowHeight(o) || this.htEditor.view.wt.wtSettings.settings.defaultRowHeight, n += r, o++; while (n < e);
                    i = n - r, this.htEditor.flipped && (this.htEditor.rootElement.style.top = parseInt(this.htEditor.rootElement.style.top, 10) + t - i + "px"), this.setDropdownHeight(n - r)
                }
            }, D.prototype.flipDropdown = function (e) {
                var t = this.htEditor.rootElement.style;
                t.position = "absolute", t.top = -e + "px", this.htEditor.flipped = !0
            }, D.prototype.unflipDropdown = function () {
                var e = this.htEditor.rootElement.style;
                "absolute" === e.position && (e.position = "", e.top = ""), this.htEditor.flipped = void 0
            }, D.prototype.updateDropdownHeight = function () {
                var e = this.htEditor.getColWidth(0) + _() + 2, t = this.cellProperties.trimDropdown;
                this.htEditor.updateSettings({
                    height: this.getDropdownHeight(),
                    width: t ? void 0 : e
                }), this.htEditor.view.wt.wtTable.alignOverlaysWithTrimmingContainer()
            }, D.prototype.setDropdownHeight = function (e) {
                this.htEditor.updateSettings({height: e})
            }, D.prototype.finishEditing = function (e) {
                e || this.instance.removeHook("beforeKeyDown", o), x.prototype.finishEditing.apply(this, arguments)
            }, D.prototype.highlightBestMatchingChoice = function (e) {
                "number" == typeof e ? this.htEditor.selectCell(e, 0) : this.htEditor.deselectCell()
            }, D.sortByRelevance = function (e, t, n) {
                var o, r, i, s, a = [], l = e.length, u = [], c = t.length;
                if (0 === l) {
                    for (s = 0; s < c; s++) u.push(s);
                    return u
                }
                for (s = 0; s < c; s++) o = m(p(t[s])), r = n ? o.indexOf(e) : o.toLowerCase().indexOf(e.toLowerCase()), r != -1 && (i = o.length - r - l, a.push({
                    baseIndex: s,
                    index: r,
                    charsLeft: i,
                    value: o
                }));
                for (a.sort(function (e, t) {
                    return t.index === -1 ? -1 : e.index === -1 ? 1 : e.index < t.index ? -1 : t.index < e.index ? 1 : e.index === t.index ? e.charsLeft < t.charsLeft ? -1 : e.charsLeft > t.charsLeft ? 1 : 0 : void 0
                }), s = 0, c = a.length; s < c; s++) u.push(a[s].baseIndex);
                return u
            }, D.prototype.getDropdownHeight = function () {
                var e = this.htEditor.getInstance().getRowHeight(0) || 23, t = this.cellProperties.visibleRows;
                return this.choices.length >= t ? t * e : this.choices.length * e + 8
            }, D.prototype.allowKeyEventPropagation = function (e) {
                var t = {row: this.htEditor.getSelectedRange() ? this.htEditor.getSelectedRange().from.row : -1},
                    n = !1;
                return e === h.ARROW_DOWN && t.row > 0 && t.row < this.htEditor.countRows() - 1 && (n = !0), e === h.ARROW_UP && t.row > -1 && (n = !0), n
            }, D.prototype.discardEditor = function (e) {
                x.prototype.discardEditor.apply(this, arguments), this.instance.view.render()
            }, k("autocomplete", D)
        }, {
            editors: 30,
            handsontableEditor: 36,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/mixed": 51,
            "helpers/string": 55,
            "helpers/unicode": 56
        }],
        33: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                CheckboxEditor: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("editors"), o && o.__esModule && o || {default: o}).registerEditor,
                a = (r = e("_baseEditor"), r && r.__esModule && r || {default: r}).BaseEditor,
                l = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}).hasClass, u = function () {
                    $traceurRuntime.superConstructor(c).apply(this, arguments)
                }, c = u;
            $traceurRuntime.createClass(u, {
                beginEditing: function (e, t) {
                    if (void 0 === t) {
                        var n = this.TD.querySelector('input[type="checkbox"]');
                        l(n, "htBadValue") || n.click()
                    }
                }, finishEditing: function () {
                }, init: function () {
                }, open: function () {
                }, close: function () {
                }, getValue: function () {
                }, setValue: function () {
                }, focus: function () {
                }
            }, {}, a), s("checkbox", u)
        }, {_baseEditor: 31, editors: 30, "helpers/dom/element": 47}],
        34: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                DateEditor: {
                    get: function () {
                        return E
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                p = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), m = p.addClass,
                g = p.outerHeight, w = (i = e("helpers/object"), i && i.__esModule && i || {default: i}).deepExtend,
                v = (s = e("eventManager"), s && s.__esModule && s || {default: s}).EventManager,
                y = (a = e("editors"), a && a.__esModule && a || {default: a}), b = (y.getEditor, y.registerEditor),
                C = (l = e("helpers/unicode"), l && l.__esModule && l || {default: l}).isMetaKey,
                _ = (u = e("helpers/dom/event"), u && u.__esModule && u || {default: u}).stopPropagation,
                R = (c = e("textEditor"), c && c.__esModule && c || {default: c}).TextEditor,
                M = (d = e("moment"), d && d.__esModule && d || {default: d}).default,
                S = (h = e("pikaday"), h && h.__esModule && h || {default: h}).default, E = function (e) {
                    this.$datePicker = null, this.datePicker = null, this.datePickerStyle = null, this.defaultDateFormat = "DD/MM/YYYY", this.isCellEdited = !1, this.parentDestroyed = !1, $traceurRuntime.superConstructor(O).call(this, e)
                }, O = E;
            $traceurRuntime.createClass(E, {
                init: function () {
                    var e = this;
                    if ("function" != typeof M) throw new Error("You need to include moment.js to your project.");
                    if ("function" != typeof S) throw new Error("You need to include Pikaday to your project.");
                    $traceurRuntime.superGet(this, O.prototype, "init").call(this), this.instance.addHook("afterDestroy", function () {
                        e.parentDestroyed = !0, e.destroyElements()
                    })
                }, createElements: function () {
                    $traceurRuntime.superGet(this, O.prototype, "createElements").call(this), this.datePicker = document.createElement("DIV"), this.datePickerStyle = this.datePicker.style, this.datePickerStyle.position = "absolute", this.datePickerStyle.top = 0, this.datePickerStyle.left = 0, this.datePickerStyle.zIndex = 9999, m(this.datePicker, "htDatepickerHolder"), document.body.appendChild(this.datePicker), this.$datePicker = new S(this.getDatePickerConfig());
                    var e = new v(this);
                    e.addEventListener(this.datePicker, "mousedown", function (e) {
                        return _(e)
                    }), this.hideDatepicker()
                }, destroyElements: function () {
                    this.$datePicker.destroy()
                }, prepare: function (e, t, n, o, r, i) {
                    this._opened = !1, $traceurRuntime.superGet(this, O.prototype, "prepare").call(this, e, t, n, o, r, i)
                }, open: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    $traceurRuntime.superGet(this, O.prototype, "open").call(this), this.showDatepicker(e)
                }, close: function () {
                    var e = this;
                    this._opened = !1, this.instance._registerTimeout(setTimeout(function () {
                        e.instance.selection.refreshBorders()
                    }, 0)), $traceurRuntime.superGet(this, O.prototype, "close").call(this)
                }, finishEditing: function () {
                    var e = void 0 !== arguments[0] && arguments[0], t = void 0 !== arguments[1] && arguments[1];
                    if (e) {
                        var n = this.originalValue;
                        void 0 !== n && this.setValue(n)
                    }
                    this.hideDatepicker(), $traceurRuntime.superGet(this, O.prototype, "finishEditing").call(this, e, t)
                }, showDatepicker: function (e) {
                    this.$datePicker.config(this.getDatePickerConfig());
                    var t, n = this.TD.getBoundingClientRect(),
                        o = this.cellProperties.dateFormat || this.defaultDateFormat, r = this.$datePicker.config(),
                        i = this.instance.view.isMouseDown(), s = !!e && C(e.keyCode);
                    this.datePickerStyle.top = window.pageYOffset + n.top + g(this.TD) + "px", this.datePickerStyle.left = window.pageXOffset + n.left + "px", this.$datePicker._onInputFocus = function () {
                    }, r.format = o, this.originalValue ? (t = this.originalValue, M(t, o, !0).isValid() && this.$datePicker.setMoment(M(t, o), !0), this.getValue() !== this.originalValue && this.setValue(this.originalValue), s || i || this.setValue("")) : this.cellProperties.defaultDate ? (t = this.cellProperties.defaultDate, r.defaultDate = t, M(t, o, !0).isValid() && this.$datePicker.setMoment(M(t, o), !0), s || i || this.setValue("")) : this.$datePicker.gotoToday(), this.datePickerStyle.display = "block", this.$datePicker.show()
                }, hideDatepicker: function () {
                    this.datePickerStyle.display = "none", this.$datePicker.hide()
                }, getDatePickerConfig: function () {
                    var e = this, t = this.TEXTAREA, n = {};
                    this.cellProperties && this.cellProperties.datePickerConfig && w(n, this.cellProperties.datePickerConfig);
                    var o = n.onSelect, r = n.onClose;
                    return n.field = t, n.trigger = t, n.container = this.datePicker, n.bound = !1, n.format = n.format || this.defaultDateFormat, n.reposition = n.reposition || !1, n.onSelect = function (t) {
                        isNaN(t.getTime()) || (t = M(t).format(e.cellProperties.dateFormat || e.defaultDateFormat)), e.setValue(t), e.hideDatepicker(), o && o()
                    }, n.onClose = function () {
                        e.parentDestroyed || e.finishEditing(!1), r && r()
                    }, n
                }
            }, {}, R), f.editors = f.editors || {}, f.editors.DateEditor = E, b("date", E)
        }, {
            browser: 24,
            editors: 30,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/object": 53,
            "helpers/unicode": 56,
            moment: "moment",
            pikaday: "pikaday",
            textEditor: 41
        }],
        35: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                DropdownEditor: {
                    get: function () {
                        return c
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                a = (r = e("editors"), r && r.__esModule && r || {default: r}), l = (a.getEditor, a.registerEditor),
                u = (a.getEditorConstructor, (i = e("autocompleteEditor"), i && i.__esModule && i || {default: i}).AutocompleteEditor),
                c = function () {
                    $traceurRuntime.superConstructor(d).apply(this, arguments)
                }, d = c;
            $traceurRuntime.createClass(c, {
                prepare: function (e, t, n, o, r, i) {
                    $traceurRuntime.superGet(this, d.prototype, "prepare").call(this, e, t, n, o, r, i), this.cellProperties.filter = !1, this.cellProperties.strict = !0
                }
            }, {}, u), s.hooks.add("beforeValidate", function (e, t, n, o) {
                var r = this.getCellMeta(t, this.propToCol(n));
                r.editor === s.editors.DropdownEditor && void 0 === r.strict && (r.filter = !1, r.strict = !0)
            }), l("dropdown", c)
        }, {autocompleteEditor: 32, browser: 24, editors: 30}],
        36: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                HandsontableEditor: {
                    get: function () {
                        return b
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                d = (r = e("helpers/unicode"), r && r.__esModule && r || {default: r}).KEY_CODES,
                h = (i = e("helpers/object"), i && i.__esModule && i || {default: i}).extend,
                f = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}).setCaretPosition,
                p = (a = e("helpers/dom/event"), a && a.__esModule && a || {default: a}),
                m = p.stopImmediatePropagation, g = p.isImmediatePropagationStopped,
                w = (l = e("editors"), l && l.__esModule && l || {default: l}), v = (w.getEditor, w.registerEditor),
                y = (u = e("textEditor"), u && u.__esModule && u || {default: u}).TextEditor, b = y.prototype.extend();
            b.prototype.createElements = function () {
                y.prototype.createElements.apply(this, arguments);
                var e = document.createElement("DIV");
                e.className = "handsontableEditor", this.TEXTAREA_PARENT.appendChild(e), this.htContainer = e, this.assignHooks()
            }, b.prototype.prepare = function (e, t, n, o, r, i) {
                y.prototype.prepare.apply(this, arguments);
                var s = this, a = {
                    startRows: 0,
                    startCols: 0,
                    minRows: 0,
                    minCols: 0,
                    className: "listbox",
                    copyPaste: !1,
                    autoColumnSize: !1,
                    autoRowSize: !1,
                    readOnly: !0,
                    fillHandle: !1,
                    afterOnCellMouseDown: function () {
                        var e = this.getValue();
                        void 0 !== e && s.setValue(e), s.instance.destroyEditor()
                    }
                };
                this.cellProperties.handsontable && h(a, i.handsontable), this.htOptions = a
            };
            var C = function (e) {
                if (!g(e)) {
                    var t, n = this.getActiveEditor(), o = n.htEditor.getInstance();
                    if (e.keyCode == d.ARROW_DOWN) if (o.getSelected() || o.flipped) {
                        if (o.getSelected()) if (o.flipped) t = o.getSelected()[0] + 1; else if (!o.flipped) {
                            var r = o.getSelected()[0], i = o.countRows() - 1;
                            t = Math.min(i, r + 1)
                        }
                    } else t = 0; else if (e.keyCode == d.ARROW_UP) if (!o.getSelected() && o.flipped) t = o.countRows() - 1; else if (o.getSelected()) if (o.flipped) {
                        var r = o.getSelected()[0];
                        t = Math.max(0, r - 1)
                    } else {
                        var r = o.getSelected()[0];
                        t = r - 1
                    }
                    void 0 !== t && (t < 0 || o.flipped && t > o.countRows() - 1 ? o.deselectCell() : o.selectCell(t, 0), o.getData().length && (e.preventDefault(), m(e), n.instance.listen(), n.TEXTAREA.focus()))
                }
            };
            b.prototype.open = function () {
                this.instance.addHook("beforeKeyDown", C), y.prototype.open.apply(this, arguments), this.htEditor && this.htEditor.destroy(), this.htEditor = new c(this.htContainer, this.htOptions), this.cellProperties.strict ? (this.htEditor.selectCell(0, 0), this.TEXTAREA.style.visibility = "hidden") : (this.htEditor.deselectCell(), this.TEXTAREA.style.visibility = "visible"), f(this.TEXTAREA, 0, this.TEXTAREA.value.length)
            }, b.prototype.close = function () {
                this.instance.removeHook("beforeKeyDown", C), this.instance.listen(), y.prototype.close.apply(this, arguments)
            }, b.prototype.focus = function () {
                this.instance.listen(), y.prototype.focus.apply(this, arguments)
            }, b.prototype.beginEditing = function (e) {
                var t = this.instance.getSettings().onBeginEditing;
                t && t() === !1 || y.prototype.beginEditing.apply(this, arguments)
            }, b.prototype.finishEditing = function (e, t) {
                if (this.htEditor && this.htEditor.isListening() && this.instance.listen(), this.htEditor && this.htEditor.getSelected()) {
                    var n = this.htEditor.getInstance().getValue();
                    void 0 !== n && this.setValue(n)
                }
                return y.prototype.finishEditing.apply(this, arguments)
            }, b.prototype.assignHooks = function () {
                var e = this;
                this.instance.addHook("afterDestroy", function () {
                    e.htEditor && e.htEditor.destroy()
                })
            }, v("handsontable", b)
        }, {
            browser: 24,
            editors: 30,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/object": 53,
            "helpers/unicode": 56,
            textEditor: 41
        }],
        37: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                MobileTextEditor: {
                    get: function () {
                        return k
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u,
                c = ((o = e("browser"), o && o.__esModule && o || {default: o}).default, (r = e("helpers/unicode"), r && r.__esModule && r || {default: r}).KEY_CODES),
                d = (i = e("helpers/dom/event"), i && i.__esModule && i || {default: i}),
                h = d.stopImmediatePropagation, f = d.isImmediatePropagationStopped,
                p = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}), m = p.addClass,
                g = p.getScrollLeft, w = p.getScrollTop, v = p.hasClass, y = p.isChildOf, b = p.offset,
                C = p.outerHeight, _ = p.outerWidth, R = p.removeClass, M = p.setCaretPosition,
                S = (a = e("editors"), a && a.__esModule && a || {default: a}), E = (S.getEditor, S.registerEditor),
                O = (l = e("_baseEditor"), l && l.__esModule && l || {default: l}).BaseEditor,
                T = (u = e("eventManager"), u && u.__esModule && u || {default: u}).eventManager,
                k = O.prototype.extend(), x = {}, D = function () {
                    this.controls = {}, this.controls.leftButton = document.createElement("DIV"), this.controls.leftButton.className = "leftButton", this.controls.rightButton = document.createElement("DIV"), this.controls.rightButton.className = "rightButton", this.controls.upButton = document.createElement("DIV"), this.controls.upButton.className = "upButton", this.controls.downButton = document.createElement("DIV"), this.controls.downButton.className = "downButton";
                    for (var e in this.controls) this.controls.hasOwnProperty(e) && this.positionControls.appendChild(this.controls[e])
                };
            k.prototype.valueChanged = function () {
                return this.initValue != this.getValue()
            }, k.prototype.init = function () {
                var e = this;
                this.eventManager = T(this.instance), this.createElements(), this.bindEvents(), this.instance.addHook("afterDestroy", function () {
                    e.destroy()
                })
            }, k.prototype.getValue = function () {
                return this.TEXTAREA.value
            }, k.prototype.setValue = function (e) {
                this.initValue = e, this.TEXTAREA.value = e
            }, k.prototype.createElements = function () {
                this.editorContainer = document.createElement("DIV"), this.editorContainer.className = "htMobileEditorContainer", this.cellPointer = document.createElement("DIV"), this.cellPointer.className = "cellPointer", this.moveHandle = document.createElement("DIV"), this.moveHandle.className = "moveHandle", this.inputPane = document.createElement("DIV"), this.inputPane.className = "inputs", this.positionControls = document.createElement("DIV"), this.positionControls.className = "positionControls", this.TEXTAREA = document.createElement("TEXTAREA"), m(this.TEXTAREA, "handsontableInput"), this.inputPane.appendChild(this.TEXTAREA), this.editorContainer.appendChild(this.cellPointer), this.editorContainer.appendChild(this.moveHandle), this.editorContainer.appendChild(this.inputPane), this.editorContainer.appendChild(this.positionControls), D.call(this), document.body.appendChild(this.editorContainer)
            }, k.prototype.onBeforeKeyDown = function (e) {
                var t = this, n = t.getActiveEditor();
                if (e.target === n.TEXTAREA && !f(e)) switch (e.keyCode) {
                    case c.ENTER:
                        n.close(), e.preventDefault();
                        break;
                    case c.BACKSPACE:
                        h(e)
                }
            }, k.prototype.open = function () {
                this.instance.addHook("beforeKeyDown", this.onBeforeKeyDown), m(this.editorContainer, "active"), R(this.cellPointer, "hidden"), this.updateEditorPosition()
            }, k.prototype.focus = function () {
                this.TEXTAREA.focus(), M(this.TEXTAREA, this.TEXTAREA.value.length)
            }, k.prototype.close = function () {
                this.TEXTAREA.blur(), this.instance.removeHook("beforeKeyDown", this.onBeforeKeyDown), R(this.editorContainer, "active")
            }, k.prototype.scrollToView = function () {
                var e = this.instance.getSelectedRange().highlight;
                this.instance.view.scrollViewport(e)
            }, k.prototype.hideCellPointer = function () {
                v(this.cellPointer, "hidden") || m(this.cellPointer, "hidden")
            }, k.prototype.updateEditorPosition = function (e, t) {
                if (e && t) e = parseInt(e, 10), t = parseInt(t, 10), this.editorContainer.style.top = t + "px", this.editorContainer.style.left = e + "px"; else {
                    var n = this.instance.getSelected(), o = this.instance.getCell(n[0], n[1]);
                    if (x.cellPointer || (x.cellPointer = {
                        height: C(this.cellPointer),
                        width: _(this.cellPointer)
                    }), x.editorContainer || (x.editorContainer = {width: _(this.editorContainer)}), void 0 !== o) {
                        var r = this.instance.view.wt.wtOverlays.leftOverlay.trimmingContainer == window ? 0 : g(this.instance.view.wt.wtOverlays.leftOverlay.holder),
                            i = this.instance.view.wt.wtOverlays.topOverlay.trimmingContainer == window ? 0 : w(this.instance.view.wt.wtOverlays.topOverlay.holder),
                            s = b(o), a = _(o), l = {x: r, y: i};
                        this.editorContainer.style.top = parseInt(s.top + C(o) - l.y + x.cellPointer.height, 10) + "px", this.editorContainer.style.left = parseInt(window.innerWidth / 2 - x.editorContainer.width / 2, 10) + "px", s.left + a / 2 > parseInt(this.editorContainer.style.left, 10) + x.editorContainer.width ? this.editorContainer.style.left = window.innerWidth - x.editorContainer.width + "px" : s.left + a / 2 < parseInt(this.editorContainer.style.left, 10) + 20 && (this.editorContainer.style.left = "0px"), this.cellPointer.style.left = parseInt(s.left - x.cellPointer.width / 2 - b(this.editorContainer).left + a / 2 - l.x, 10) + "px"
                    }
                }
            }, k.prototype.updateEditorData = function () {
                var e = this.instance.getSelected(), t = this.instance.getDataAtCell(e[0], e[1]);
                this.row = e[0], this.col = e[1], this.setValue(t), this.updateEditorPosition()
            }, k.prototype.prepareAndSave = function () {
                var e;
                return !this.valueChanged() || (e = this.instance.getSettings().trimWhitespace ? [[String.prototype.trim.call(this.getValue())]] : [[this.getValue()]], void this.saveValue(e))
            }, k.prototype.bindEvents = function () {
                var e = this;
                this.eventManager.addEventListener(this.controls.leftButton, "touchend", function (t) {
                    e.prepareAndSave(), e.instance.selection.transformStart(0, -1, null, !0), e.updateEditorData(), t.preventDefault()
                }), this.eventManager.addEventListener(this.controls.rightButton, "touchend", function (t) {
                    e.prepareAndSave(), e.instance.selection.transformStart(0, 1, null, !0), e.updateEditorData(), t.preventDefault()
                }), this.eventManager.addEventListener(this.controls.upButton, "touchend", function (t) {
                    e.prepareAndSave(), e.instance.selection.transformStart(-1, 0, null, !0), e.updateEditorData(), t.preventDefault()
                }), this.eventManager.addEventListener(this.controls.downButton, "touchend", function (t) {
                    e.prepareAndSave(), e.instance.selection.transformStart(1, 0, null, !0), e.updateEditorData(), t.preventDefault()
                }), this.eventManager.addEventListener(this.moveHandle, "touchstart", function (t) {
                    if (1 == t.touches.length) {
                        var n = t.touches[0], o = {x: e.editorContainer.offsetLeft, y: e.editorContainer.offsetTop},
                            r = {x: n.pageX - o.x, y: n.pageY - o.y};
                        e.eventManager.addEventListener(this, "touchmove", function (t) {
                            var n = t.touches[0];
                            e.updateEditorPosition(n.pageX - r.x, n.pageY - r.y), e.hideCellPointer(), t.preventDefault()
                        })
                    }
                }), this.eventManager.addEventListener(document.body, "touchend", function (t) {
                    y(t.target, e.editorContainer) || y(t.target, e.instance.rootElement) || e.close()
                }), this.eventManager.addEventListener(this.instance.view.wt.wtOverlays.leftOverlay.holder, "scroll", function (t) {
                    e.instance.view.wt.wtOverlays.leftOverlay.trimmingContainer != window && e.hideCellPointer()
                }), this.eventManager.addEventListener(this.instance.view.wt.wtOverlays.topOverlay.holder, "scroll", function (t) {
                    e.instance.view.wt.wtOverlays.topOverlay.trimmingContainer != window && e.hideCellPointer()
                })
            }, k.prototype.destroy = function () {
                this.eventManager.clear(), this.editorContainer.parentNode.removeChild(this.editorContainer)
            }, E("mobile", k)
        }, {
            _baseEditor: 31,
            browser: 24,
            editors: 30,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/unicode": 56
        }],
        38: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                NumericEditor: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("numbro"), o && o.__esModule && o || {default: o}).default,
                a = (r = e("editors"), r && r.__esModule && r || {default: r}).registerEditor,
                l = (i = e("textEditor"), i && i.__esModule && i || {default: i}).TextEditor, u = function () {
                    $traceurRuntime.superConstructor(c).apply(this, arguments)
                }, c = u;
            $traceurRuntime.createClass(u, {
                beginEditing: function (e) {
                    if ("undefined" == typeof e && this.originalValue) {
                        "undefined" != typeof this.cellProperties.language && s.culture(this.cellProperties.language);
                        var t = s.cultureData().delimiters.decimal;
                        e = ("" + this.originalValue).replace(".", t)
                    }
                    $traceurRuntime.superGet(this, c.prototype, "beginEditing").call(this, e)
                }
            }, {}, l), a("numeric", u)
        }, {editors: 30, numbro: "numbro", textEditor: 41}],
        39: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                PasswordEditor: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s,
                a = ((o = e("browser"), o && o.__esModule && o || {default: o}).default, (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).empty),
                l = (i = e("editors"), i && i.__esModule && i || {default: i}), u = (l.getEditor, l.registerEditor),
                c = (s = e("textEditor"), s && s.__esModule && s || {default: s}).TextEditor, d = function () {
                    $traceurRuntime.superConstructor(h).apply(this, arguments)
                }, h = d;
            $traceurRuntime.createClass(d, {
                createElements: function () {
                    $traceurRuntime.superGet(this, h.prototype, "createElements").call(this), this.TEXTAREA = document.createElement("input"), this.TEXTAREA.setAttribute("type", "password"), this.TEXTAREA.className = "handsontableInput", this.textareaStyle = this.TEXTAREA.style, this.textareaStyle.width = 0, this.textareaStyle.height = 0, a(this.TEXTAREA_PARENT), this.TEXTAREA_PARENT.appendChild(this.TEXTAREA)
                }
            }, {}, c), u("password", d)
        }, {browser: 24, editors: 30, "helpers/dom/element": 47, textEditor: 41}],
        40: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                SelectEditor: {
                    get: function () {
                        return E
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), d = c.addClass, h = c.empty,
                f = c.fastInnerHTML, p = c.getComputedStyle, m = c.getCssTransform, g = c.getScrollableElement,
                w = c.offset, v = c.outerHeight, y = c.outerWidth, b = c.resetCssTransform,
                C = (i = e("helpers/dom/event"), i && i.__esModule && i || {default: i}).stopImmediatePropagation,
                _ = (s = e("helpers/unicode"), s && s.__esModule && s || {default: s}).KEY_CODES,
                R = (a = e("editors"), a && a.__esModule && a || {default: a}), M = (R.getEditor, R.registerEditor),
                S = (l = e("_baseEditor"), l && l.__esModule && l || {default: l}).BaseEditor, E = S.prototype.extend();
            E.prototype.init = function () {
                this.select = document.createElement("SELECT"), d(this.select, "htSelectEditor"), this.select.style.display = "none", this.instance.rootElement.appendChild(this.select), this.registerHooks()
            }, E.prototype.registerHooks = function () {
                var e = this;
                this.instance.addHook("afterScrollHorizontally", function () {
                    return e.refreshDimensions()
                }), this.instance.addHook("afterScrollVertically", function () {
                    return e.refreshDimensions()
                }), this.instance.addHook("afterColumnResize", function () {
                    return e.refreshDimensions()
                }), this.instance.addHook("afterRowResize", function () {
                    return e.refreshDimensions()
                })
            }, E.prototype.prepare = function () {
                S.prototype.prepare.apply(this, arguments);
                var e, t = this.cellProperties.selectOptions;
                e = "function" == typeof t ? this.prepareOptions(t(this.row, this.col, this.prop)) : this.prepareOptions(t), h(this.select);
                for (var n in e) if (e.hasOwnProperty(n)) {
                    var o = document.createElement("OPTION");
                    o.value = n, f(o, e[n]), this.select.appendChild(o)
                }
            }, E.prototype.prepareOptions = function (e) {
                var t = {};
                if (Array.isArray(e)) for (var n = 0, o = e.length; n < o; n++) t[e[n]] = e[n]; else "object" == typeof e && (t = e);
                return t
            }, E.prototype.getValue = function () {
                return this.select.value
            }, E.prototype.setValue = function (e) {
                this.select.value = e
            };
            var O = function (e) {
                var t = this, n = t.getActiveEditor();
                switch (e.keyCode) {
                    case _.ARROW_UP:
                        var o = n.select.selectedIndex - 1;
                        o >= 0 && (n.select[o].selected = !0), C(e), e.preventDefault();
                        break;
                    case _.ARROW_DOWN:
                        var r = n.select.selectedIndex + 1;
                        r <= n.select.length - 1 && (n.select[r].selected = !0), C(e), e.preventDefault()
                }
            };
            E.prototype.open = function () {
                this._opened = !0, this.refreshDimensions(), this.select.style.display = "", this.instance.addHook("beforeKeyDown", O)
            }, E.prototype.close = function () {
                this._opened = !1, this.select.style.display = "none", this.instance.removeHook("beforeKeyDown", O)
            }, E.prototype.focus = function () {
                this.select.focus()
            }, E.prototype.refreshValue = function () {
                var e = this.instance.getSourceDataAtCell(this.row, this.prop);
                this.originalValue = e, this.setValue(e), this.refreshDimensions()
            }, E.prototype.refreshDimensions = function () {
                if (this.state === u.EditorState.EDITING) {
                    if (this.TD = this.getEditedCell(), !this.TD) return void this.close();
                    var e, t = y(this.TD) + 1, n = v(this.TD) + 1, o = w(this.TD), r = w(this.instance.rootElement),
                        i = g(this.TD), s = o.top - r.top - 1 - (i.scrollTop || 0),
                        a = o.left - r.left - 1 - (i.scrollLeft || 0), l = this.checkEditorSection(),
                        c = this.instance.getSettings();
                    c.rowHeaders ? 1 : 0, c.colHeaders ? 1 : 0;
                    switch (l) {
                        case"top":
                            e = m(this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"left":
                            e = m(this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"top-left-corner":
                            e = m(this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"bottom-left-corner":
                            e = m(this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"bottom":
                            e = m(this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode)
                    }
                    0 === this.instance.getSelected()[0] && (s += 1), 0 === this.instance.getSelected()[1] && (a += 1);
                    var d = this.select.style;
                    e && e != -1 ? d[e[0]] = e[1] : b(this.select);
                    var h = p(this.TD);
                    parseInt(h.borderTopWidth, 10) > 0 && (n -= 1), parseInt(h.borderLeftWidth, 10) > 0 && (t -= 1), d.height = n + "px", d.minWidth = t + "px", d.top = s + "px", d.left = a + "px", d.margin = "0px"
                }
            }, E.prototype.getEditedCell = function () {
                var e, t = this.checkEditorSection();
                switch (t) {
                    case"top":
                        e = this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.select.style.zIndex = 101;
                        break;
                    case"corner":
                        e = this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.select.style.zIndex = 103;
                        break;
                    case"left":
                        e = this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.select.style.zIndex = 102;
                        break;
                    default:
                        e = this.instance.getCell(this.row, this.col), this.select.style.zIndex = ""
                }
                return e != -1 && e != -2 ? e : void 0
            }, M("select", E)
        }, {
            _baseEditor: 31,
            browser: 24,
            editors: 30,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/unicode": 56
        }],
        41: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                TextEditor: {
                    get: function () {
                        return N
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                h = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), f = h.addClass,
                p = h.getCaretPosition, m = h.getComputedStyle, g = h.getCssTransform, w = h.getScrollableElement,
                v = h.getScrollbarWidth, y = h.innerWidth, b = h.offset, C = h.resetCssTransform,
                _ = h.setCaretPosition, R = h.hasVerticalScrollbar, M = h.hasHorizontalScrollbar,
                S = (i = e("autoResize"), i && i.__esModule && i || {default: i}).default,
                E = (s = e("_baseEditor"), s && s.__esModule && s || {default: s}).BaseEditor,
                O = (a = e("eventManager"), a && a.__esModule && a || {default: a}).eventManager,
                T = (l = e("editors"), l && l.__esModule && l || {default: l}), k = (T.getEditor, T.registerEditor),
                x = (u = e("helpers/unicode"), u && u.__esModule && u || {default: u}).KEY_CODES,
                D = (c = e("helpers/dom/event"), c && c.__esModule && c || {default: c}), H = D.stopPropagation,
                A = D.stopImmediatePropagation, P = D.isImmediatePropagationStopped, N = E.prototype.extend();
            N.prototype.init = function () {
                var e = this;
                this.createElements(), this.eventManager = O(this), this.bindEvents(), this.autoResize = S(), this.instance.addHook("afterDestroy", function () {
                    e.destroy()
                })
            }, N.prototype.getValue = function () {
                return this.TEXTAREA.value
            }, N.prototype.setValue = function (e) {
                this.TEXTAREA.value = e
            };
            var L = function (e) {
                var t, n = this, o = n.getActiveEditor();
                if (t = (e.ctrlKey || e.metaKey) && !e.altKey, e.target === o.TEXTAREA && !P(e)) {
                    if (17 === e.keyCode || 224 === e.keyCode || 91 === e.keyCode || 93 === e.keyCode) return void A(e);
                    switch (e.keyCode) {
                        case x.ARROW_RIGHT:
                            o.isInFullEditMode() && (!o.isWaiting() && !o.allowKeyEventPropagation || !o.isWaiting() && o.allowKeyEventPropagation && !o.allowKeyEventPropagation(e.keyCode)) && A(e);
                            break;
                        case x.ARROW_LEFT:
                            o.isInFullEditMode() && (!o.isWaiting() && !o.allowKeyEventPropagation || !o.isWaiting() && o.allowKeyEventPropagation && !o.allowKeyEventPropagation(e.keyCode)) && A(e);
                            break;
                        case x.ARROW_UP:
                        case x.ARROW_DOWN:
                            o.isInFullEditMode() && (!o.isWaiting() && !o.allowKeyEventPropagation || !o.isWaiting() && o.allowKeyEventPropagation && !o.allowKeyEventPropagation(e.keyCode)) && A(e);
                            break;
                        case x.ENTER:
                            var r = o.instance.getSelected(), i = !(r[0] === r[2] && r[1] === r[3]);
                            if (t && !i || e.altKey) {
                                if (o.isOpened()) {
                                    var s = p(o.TEXTAREA), a = o.getValue(), l = a.slice(0, s) + "\n" + a.slice(s);
                                    o.setValue(l), _(o.TEXTAREA, s + 1)
                                } else o.beginEditing(o.originalValue + "\n");
                                A(e)
                            }
                            e.preventDefault();
                            break;
                        case x.A:
                        case x.X:
                        case x.C:
                        case x.V:
                            t && A(e);
                            break;
                        case x.BACKSPACE:
                        case x.DELETE:
                        case x.HOME:
                        case x.END:
                            A(e)
                    }
                    [x.ARROW_UP, x.ARROW_RIGHT, x.ARROW_DOWN, x.ARROW_LEFT].indexOf(e.keyCode) === -1 && o.autoResize.resize(String.fromCharCode(e.keyCode))
                }
            };
            N.prototype.open = function () {
                this.refreshDimensions(), this.instance.addHook("beforeKeyDown", L)
            }, N.prototype.close = function (e) {
                this.textareaParentStyle.display = "none", this.autoResize.unObserve(), document.activeElement === this.TEXTAREA && this.instance.listen(), this.instance.removeHook("beforeKeyDown", L)
            }, N.prototype.focus = function () {
                this.TEXTAREA.focus(), _(this.TEXTAREA, this.TEXTAREA.value.length)
            }, N.prototype.createElements = function () {
                this.TEXTAREA = document.createElement("TEXTAREA"), f(this.TEXTAREA, "handsontableInput"), this.textareaStyle = this.TEXTAREA.style, this.textareaStyle.width = 0, this.textareaStyle.height = 0, this.TEXTAREA_PARENT = document.createElement("DIV"), f(this.TEXTAREA_PARENT, "handsontableInputHolder"), this.textareaParentStyle = this.TEXTAREA_PARENT.style, this.textareaParentStyle.top = 0, this.textareaParentStyle.left = 0, this.textareaParentStyle.display = "none", this.TEXTAREA_PARENT.appendChild(this.TEXTAREA), this.instance.rootElement.appendChild(this.TEXTAREA_PARENT);
                var e = this;
                this.instance._registerTimeout(setTimeout(function () {
                    e.refreshDimensions()
                }, 0))
            }, N.prototype.getEditedCell = function () {
                var e, t = this.checkEditorSection();
                switch (t) {
                    case"top":
                        e = this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.textareaParentStyle.zIndex = 101;
                        break;
                    case"top-left-corner":
                        e = this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.textareaParentStyle.zIndex = 103;
                        break;
                    case"bottom-left-corner":
                        e = this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.textareaParentStyle.zIndex = 103;
                        break;
                    case"left":
                        e = this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.textareaParentStyle.zIndex = 102;
                        break;
                    case"bottom":
                        e = this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.getCell({
                            row: this.row,
                            col: this.col
                        }), this.textareaParentStyle.zIndex = 102;
                        break;
                    default:
                        e = this.instance.getCell(this.row, this.col), this.textareaParentStyle.zIndex = ""
                }
                return e != -1 && e != -2 ? e : void 0
            }, N.prototype.refreshValue = function () {
                var e = this.instance.getSourceDataAtCell(this.row, this.prop);
                this.originalValue = e, this.setValue(e), this.refreshDimensions()
            }, N.prototype.refreshDimensions = function () {
                if (this.state === d.EditorState.EDITING) {
                    if (this.TD = this.getEditedCell(), !this.TD) return void this.close(!0);
                    var e, t = b(this.TD), n = b(this.instance.rootElement), o = w(this.TD),
                        r = this.instance.countRows(), i = t.top === n.top ? 0 : 1,
                        s = t.top - n.top - i - (o.scrollTop || 0), a = t.left - n.left - 1 - (o.scrollLeft || 0),
                        l = this.instance.getSettings(),
                        u = (this.instance.hasRowHeaders(), this.instance.hasColHeaders()),
                        c = this.checkEditorSection(), h = this.TD.style.backgroundColor;
                    switch (c) {
                        case"top":
                            e = g(this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"left":
                            e = g(this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"top-left-corner":
                            e = g(this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"bottom-left-corner":
                            e = g(this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
                            break;
                        case"bottom":
                            e = g(this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode)
                    }
                    (u && 0 === this.instance.getSelected()[0] || l.fixedRowsBottom && this.instance.getSelected()[0] === r - l.fixedRowsBottom) && (s += 1), 0 === this.instance.getSelected()[1] && (a += 1), e && e != -1 ? this.textareaParentStyle[e[0]] = e[1] : C(this.TEXTAREA_PARENT), this.textareaParentStyle.top = s + "px", this.textareaParentStyle.left = a + "px";
                    var f = this.instance.view.wt.wtViewport.rowsRenderCalculator.startPosition,
                        p = this.instance.view.wt.wtViewport.columnsRenderCalculator.startPosition,
                        _ = this.instance.view.wt.wtOverlays.leftOverlay.getScrollPosition(),
                        S = this.instance.view.wt.wtOverlays.topOverlay.getScrollPosition(), E = v(),
                        O = this.TD.offsetTop + f - S, T = this.TD.offsetLeft + p - _, k = y(this.TD) - 8,
                        x = R(o) ? E : 0, D = M(o) ? E : 0,
                        H = this.instance.view.maximumVisibleElementWidth(T) - 9 - x, A = this.TD.scrollHeight + 1,
                        P = Math.max(this.instance.view.maximumVisibleElementHeight(O) - D, 23), N = m(this.TD);
                    this.TEXTAREA.style.fontSize = N.fontSize, this.TEXTAREA.style.fontFamily = N.fontFamily, this.TEXTAREA.style.backgroundColor = "", this.TEXTAREA.style.backgroundColor = h ? h : m(this.TEXTAREA).backgroundColor, this.autoResize.init(this.TEXTAREA, {
                        minHeight: Math.min(A, P),
                        maxHeight: P,
                        minWidth: Math.min(k, H),
                        maxWidth: H
                    }, !0), this.textareaParentStyle.display = "block"
                }
            }, N.prototype.bindEvents = function () {
                var e = this;
                this.eventManager.addEventListener(this.TEXTAREA, "cut", function (e) {
                    H(e)
                }), this.eventManager.addEventListener(this.TEXTAREA, "paste", function (e) {
                    H(e)
                }), this.instance.addHook("afterScrollHorizontally", function () {
                    e.refreshDimensions()
                }), this.instance.addHook("afterScrollVertically", function () {
                    e.refreshDimensions()
                }), this.instance.addHook("afterColumnResize", function () {
                    e.refreshDimensions(), e.focus()
                }), this.instance.addHook("afterRowResize", function () {
                    e.refreshDimensions(), e.focus()
                }), this.instance.addHook("afterDestroy", function () {
                    e.eventManager.destroy()
                })
            }, N.prototype.destroy = function () {
                this.eventManager.destroy()
            }, k("text", N)
        }, {
            _baseEditor: 31,
            autoResize: "autoResize",
            browser: 24,
            editors: 30,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/unicode": 56
        }],
        42: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n, o, r, i, s, a, l = "HOT-TABLE";
                if (t.isTargetWebComponent = !1, t.realTarget = t.target, a = t.stopImmediatePropagation, t.stopImmediatePropagation = function () {
                    a.apply(this), p(this)
                }, !u.eventManager.isHotTableEnv) return t;
                for (t = d(t), s = t.path ? t.path.length : 0; s--;) {
                    if (t.path[s].nodeName === l) n = !0; else if (n && t.path[s].shadowRoot) {
                        i = t.path[s];
                        break
                    }
                    0 !== s || i || (i = t.path[s])
                }
                return i || (i = t.target), t.isTargetWebComponent = !0, f() ? t.realTarget = t.srcElement || t.toElement : (e instanceof u.Core || e instanceof Walkontable) && (e instanceof u.Core ? o = e.view ? e.view.wt.wtTable.TABLE : null : e instanceof Walkontable && (o = e.wtTable.TABLE.parentNode.parentNode), r = h(t.target, [l], o), r ? t.realTarget = o.querySelector(l) || t.target : t.realTarget = t.target), Object.defineProperty(t, "target", {
                    get: function () {
                        return d(i)
                    }, enumerable: !0, configurable: !0
                }), t
            }

            function r(e) {
                return new m(e)
            }

            Object.defineProperties(n, {
                EventManager: {
                    get: function () {
                        return m
                    }
                }, eventManager: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var i, s, a, l, u = (i = e("browser"), i && i.__esModule && i || {default: i}).default,
                c = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}), d = c.polymerWrap,
                h = c.closest,
                f = (a = e("helpers/feature"), a && a.__esModule && a || {default: a}).isWebComponentSupportedNatively,
                p = (l = e("helpers/dom/event"), l && l.__esModule && l || {default: l}).stopImmediatePropagation,
                m = function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    this.context = e || this, this.context.eventListeners || (this.context.eventListeners = [])
                };
            $traceurRuntime.createClass(m, {
                addEventListener: function (e, t, n) {
                    function r(e) {
                        e = o(s, e), n.call(this, e)
                    }

                    var i = this, s = this.context;
                    return this.context.eventListeners.push({
                        element: e,
                        event: t,
                        callback: n,
                        callbackProxy: r
                    }), window.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent("on" + t, r), u.countEventManagerListeners++, function () {
                        i.removeEventListener(e, t, n)
                    }
                }, removeEventListener: function (e, t, n) {
                    for (var o, r = this.context.eventListeners.length; r--;) if (o = this.context.eventListeners[r], o.event == t && o.element == e) {
                        if (n && n != o.callback) continue;
                        this.context.eventListeners.splice(r, 1), o.element.removeEventListener ? o.element.removeEventListener(o.event, o.callbackProxy, !1) : o.element.detachEvent("on" + o.event, o.callbackProxy), u.countEventManagerListeners--
                    }
                }, clearEvents: function () {
                    if (this.context) for (var e = this.context.eventListeners.length; e--;) {
                        var t = this.context.eventListeners[e];
                        t && this.removeEventListener(t.element, t.event, t.callback)
                    }
                }, clear: function () {
                    this.clearEvents()
                }, destroy: function () {
                    this.clearEvents(), this.context = null
                }, fireEvent: function (e, t) {
                    var n, o = {
                        bubbles: !0,
                        cancelable: "mousemove" !== t,
                        view: window,
                        detail: 0,
                        screenX: 0,
                        screenY: 0,
                        clientX: 1,
                        clientY: 1,
                        ctrlKey: !1,
                        altKey: !1,
                        shiftKey: !1,
                        metaKey: !1,
                        button: 0,
                        relatedTarget: void 0
                    };
                    document.createEvent ? (n = document.createEvent("MouseEvents"), n.initMouseEvent(t, o.bubbles, o.cancelable, o.view, o.detail, o.screenX, o.screenY, o.clientX, o.clientY, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, o.button, o.relatedTarget || document.body.parentNode)) : n = document.createEventObject(), e.dispatchEvent ? e.dispatchEvent(n) : e.fireEvent("on" + t, n)
                }
            }, {}), u.countEventManagerListeners = 0, u.eventManager = r
        }, {browser: 24, "helpers/dom/element": 47, "helpers/dom/event": 48, "helpers/feature": 49}],
        43: [function (e, t, n) {
            "use strict";

            function o(e) {
                for (var t = 0, n = e.length; t < n;) e[t] = [e[t]], t++
            }

            function r(e, t) {
                for (var n = 0, o = t.length; n < o;) e.push(t[n]), n++
            }

            function i(e) {
                var t = [];
                if (!e || 0 === e.length || !e[0] || 0 === e[0].length) return t;
                for (var n = e.length, o = e[0].length, r = 0; r < n; r++) for (var i = 0; i < o; i++) t[i] || (t[i] = []), t[i][r] = e[r][i];
                return t
            }

            function s(e, t, n, o) {
                var r = -1, i = e.length;
                for (o && i && (n = e[++r]); ++r < i;) n = t(n, e[r], r, e);
                return n
            }

            function a(e, t) {
                for (var n = -1, o = e.length, r = -1, i = []; ++n < o;) {
                    var s = e[n];
                    t(s, n, e) && (i[++r] = s)
                }
                return i
            }

            function l(e, t) {
                for (var n = -1, o = e.length, r = -1, i = []; ++n < o;) {
                    var s = e[n];
                    i[++r] = t(s, n, e)
                }
                return i
            }

            function u(e, t) {
                for (var n = -1, o = e.length; ++n < o && t(e[n], n, e) !== !1;) ;
                return e
            }

            function c(e) {
                return s(e, function (e, t) {
                    return e + t
                }, 0)
            }

            function d(e) {
                return s(e, function (e, t) {
                    return e > t ? e : t
                }, Array.isArray(e) ? e[0] : void 0)
            }

            function h(e) {
                return s(e, function (e, t) {
                    return e < t ? e : t
                }, Array.isArray(e) ? e[0] : void 0)
            }

            function f(e) {
                return e.length ? c(e) / e.length : 0
            }

            function p(e) {
                return s(e, function (e, t) {
                    return e.concat(Array.isArray(t) ? p(t) : t)
                }, [])
            }

            function m(e) {
                var t = [];
                return u(e, function (e) {
                    t.indexOf(e) === -1 && t.push(e)
                }), t
            }

            function g(e, t, n) {
                if (null == e) throw new TypeError('"array" is null or not defined');
                var o = Object(e), r = o.length >>> 0;
                if (0 === r) return !1;
                for (var i = 0 | n, s = Math.max(i >= 0 ? i : r - Math.abs(i), 0); s < r;) {
                    if (o[s] === t) return !0;
                    s++
                }
                return !1
            }

            Object.defineProperties(n, {
                to2dArray: {
                    get: function () {
                        return o
                    }
                }, extendArray: {
                    get: function () {
                        return r
                    }
                }, pivot: {
                    get: function () {
                        return i
                    }
                }, arrayReduce: {
                    get: function () {
                        return s
                    }
                }, arrayFilter: {
                    get: function () {
                        return a
                    }
                }, arrayMap: {
                    get: function () {
                        return l
                    }
                }, arrayEach: {
                    get: function () {
                        return u
                    }
                }, arraySum: {
                    get: function () {
                        return c
                    }
                }, arrayMax: {
                    get: function () {
                        return d
                    }
                }, arrayMin: {
                    get: function () {
                        return h
                    }
                }, arrayAvg: {
                    get: function () {
                        return f
                    }
                }, arrayFlatten: {
                    get: function () {
                        return p
                    }
                }, arrayUnique: {
                    get: function () {
                        return m
                    }
                }, arrayIncludes: {
                    get: function () {
                        return g
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        44: [function (e, t, n) {
            "use strict";

            function o() {
                return l
            }

            function r() {
                return u
            }

            function i() {
                return c
            }

            function s() {
                return d
            }

            function a(e) {
                return e || (e = navigator.userAgent), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
            }

            Object.defineProperties(n, {
                isIE8: {
                    get: function () {
                        return o
                    }
                }, isIE9: {
                    get: function () {
                        return r
                    }
                }, isSafari: {
                    get: function () {
                        return i
                    }
                }, isChrome: {
                    get: function () {
                        return s
                    }
                }, isMobileBrowser: {
                    get: function () {
                        return a
                    }
                }, __esModule: {value: !0}
            });
            var l = !document.createTextNode("test").textContent, u = !!document.documentMode,
                c = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
                d = /Chrome/.test(navigator.userAgent) && /Google/.test(navigator.vendor)
        }, {}],
        45: [function (e, t, n) {
            "use strict";

            function o(e) {
                for (var t, n = e + 1, o = ""; n > 0;) t = (n - 1) % m, o = String.fromCharCode(65 + t) + o, n = parseInt((n - t) / m, 10);
                return o
            }

            function r(e) {
                var t = 0;
                if (e) for (var n = 0, o = e.length - 1; n < e.length; n += 1, o -= 1) t += Math.pow(m, o) * (p.indexOf(e[n]) + 1);
                return --t, t
            }

            function i() {
                var e, t, n = void 0 !== arguments[0] ? arguments[0] : 100,
                    r = void 0 !== arguments[1] ? arguments[1] : 4, i = [];
                for (e = 0; e < n; e++) {
                    var s = [];
                    for (t = 0; t < r; t++) s.push(o(t) + (e + 1));
                    i.push(s)
                }
                return i
            }

            function s() {
                var e, t, n = void 0 !== arguments[0] ? arguments[0] : 100,
                    r = void 0 !== arguments[1] ? arguments[1] : 4, i = [];
                for (e = 0; e < n; e++) {
                    var s = {};
                    for (t = 0; t < r; t++) s["prop" + t] = o(t) + (e + 1);
                    i.push(s)
                }
                return i
            }

            function a(e, t) {
                for (var n, o = [], r = 0; r < e; r++) {
                    n = [];
                    for (var i = 0; i < t; i++) n.push("");
                    o.push(n)
                }
                return o
            }

            function l(e) {
                var t, n, o, r, i = [], s = 0;
                for (t = 0, n = e.length; t < n; t++) for (o = 0, r = e[t].length; o < r; o++) o == s && (i.push([]), s++), i[o].push(e[t][o]);
                return i
            }

            function u(e, t) {
                function n(e) {
                    var t = h.cellTypes[e];
                    if ("undefined" == typeof t) throw new Error('You declared cell type "' + e + '" as a string that is not mapped to a known object. Cell type must be an object or a string mapped to an object in Handsontable.cellTypes');
                    return t
                }

                return t = "undefined" == typeof t || t, function (o, r) {
                    return function o(r) {
                        if (r) {
                            if (r.hasOwnProperty(e) && void 0 !== r[e]) return r[e];
                            if (r.hasOwnProperty("type") && r.type) {
                                var i;
                                if ("string" != typeof r.type) throw new Error("Cell type must be a string ");
                                if (i = n(r.type), i.hasOwnProperty(e)) return i[e];
                                if (t) return
                            }
                            return o(f(r))
                        }
                    }("number" == typeof o ? this.getCellMeta(o, r) : o)
                }
            }

            Object.defineProperties(n, {
                spreadsheetColumnLabel: {
                    get: function () {
                        return o
                    }
                }, spreadsheetColumnIndex: {
                    get: function () {
                        return r
                    }
                }, createSpreadsheetData: {
                    get: function () {
                        return i
                    }
                }, createSpreadsheetObjectData: {
                    get: function () {
                        return s
                    }
                }, createEmptySpreadsheetData: {
                    get: function () {
                        return a
                    }
                }, translateRowsToColumns: {
                    get: function () {
                        return l
                    }
                }, cellMethodLookupFactory: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var c, d, h = (c = e("browser"), c && c.__esModule && c || {default: c}).default,
                f = (d = e("object"), d && d.__esModule && d || {default: d}).getPrototypeOf,
                p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", m = p.length
        }, {browser: 24, object: 53}],
        46: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = new Date(e);
                return isNaN(new Date(e + "T00:00").getDate()) ? t : new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
            }

            Object.defineProperties(n, {
                getNormalizedDate: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        47: [function (e, t, n) {
            "use strict";

            function o(e) {
                for (var t = void 0 !== arguments[1] ? arguments[1] : 0, n = -1, o = null; null != e;) {
                    if (n === t) {
                        o = e;
                        break
                    }
                    e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? e = e.host : (n++, e = e.parentNode)
                }
                return o
            }

            function r(e, t, n) {
                for (; null != e && e !== n;) {
                    if (e.nodeType === Node.ELEMENT_NODE && (t.indexOf(e.nodeName) > -1 || t.indexOf(e) > -1)) return e;
                    e = e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? e.host : e.parentNode
                }
                return null
            }

            function i(e, t, n) {
                for (var o = []; e && (e = r(e, t, n), e && (!n || n.contains(e)));) o.push(e), e = e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? e.host : e.parentNode;
                var i = o.length;
                return i ? o[i - 1] : null
            }

            function s(e, t) {
                var n = e.parentNode, o = [];
                for ("string" == typeof t ? o = Array.prototype.slice.call(document.querySelectorAll(t), 0) : o.push(t); null != n;) {
                    if (o.indexOf(n) > -1) return !0;
                    n = n.parentNode
                }
                return !1
            }

            function a(e) {
                function t(e) {
                    return e.nodeType === Node.ELEMENT_NODE && e.nodeName === o.toUpperCase()
                }

                var n, o = "hot-table", r = !1;
                for (n = l(e); null != n;) {
                    if (t(n)) {
                        r = !0;
                        break
                    }
                    if (n.host && n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                        if (r = t(n.host)) break;
                        n = n.host
                    }
                    n = n.parentNode
                }
                return r
            }

            function l(e) {
                return "undefined" != typeof Polymer && "function" == typeof wrap ? wrap(e) : e
            }

            function u(e) {
                return "undefined" != typeof Polymer && "function" == typeof unwrap ? unwrap(e) : e
            }

            function c(e) {
                var t = 0;
                if (e.previousSibling) for (; e = e.previousSibling;) ++t;
                return t
            }

            function d(e, t) {
                var n = document.querySelector(".ht_clone_" + e);
                return n ? n.contains(t) : null
            }

            function h(e) {
                var t = 0, n = [];
                if (!e || !e.length) return n;
                for (; e[t];) n.push(e[t]), t++;
                return n
            }

            function f(e, t) {
                return Z(e, t)
            }

            function p(e, t) {
                return J(e, t)
            }

            function m(e, t) {
                return Q(e, t)
            }

            function g(e, t) {
                if (3 === e.nodeType) t.removeChild(e); else if (["TABLE", "THEAD", "TBODY", "TFOOT", "TR"].indexOf(e.nodeName) > -1) for (var n = e.childNodes, o = n.length - 1; o >= 0; o--) g(n[o], e)
            }

            function w(e) {
                for (var t; t = e.lastChild;) e.removeChild(t)
            }

            function v(e, t) {
                ue.test(t) ? e.innerHTML = t : y(e, t)
            }

            function y(e, t) {
                var n = e.firstChild;
                n && 3 === n.nodeType && null === n.nextSibling ? ce ? n.textContent = t : n.data = t : (w(e), e.appendChild(document.createTextNode(t)))
            }

            function b(e) {
                for (var t = e; u(t) !== document.documentElement;) {
                    if (null === t) return !1;
                    if (t.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                        if (t.host) {
                            if (t.host.impl) return b(t.host.impl);
                            if (t.host) return b(t.host);
                            throw new Error("Lost in Web Components world")
                        }
                        return !1
                    }
                    if ("none" === t.style.display) return !1;
                    t = t.parentNode
                }
                return !0
            }

            function C(e) {
                var t, n, o, r, i;
                if (r = document.documentElement, re() && e.firstChild && "CAPTION" === e.firstChild.nodeName) return i = e.getBoundingClientRect(), {
                    top: i.top + (window.pageYOffset || r.scrollTop) - (r.clientTop || 0),
                    left: i.left + (window.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
                };
                for (t = e.offsetLeft, n = e.offsetTop, o = e; (e = e.offsetParent) && e !== document.body;) t += e.offsetLeft, n += e.offsetTop, o = e;
                return o && "fixed" === o.style.position && (t += window.pageXOffset || r.scrollLeft, n += window.pageYOffset || r.scrollTop), {
                    left: t,
                    top: n
                }
            }

            function _() {
                var e = window.scrollY;
                return void 0 === e && (e = document.documentElement.scrollTop), e
            }

            function R() {
                var e = window.scrollX;
                return void 0 === e && (e = document.documentElement.scrollLeft), e
            }

            function M(e) {
                return e === window ? _() : e.scrollTop
            }

            function S(e) {
                return e === window ? R() : e.scrollLeft
            }

            function E(e) {
                for (var t, n, o, r = e.parentNode, i = ["auto", "scroll"], s = "", a = "", l = "", u = ""; r && r.style && document.body !== r;) {
                    if (t = r.style.overflow, n = r.style.overflowX, o = r.style.overflowY, "scroll" == t || "scroll" == n || "scroll" == o) return r;
                    if (window.getComputedStyle && (s = window.getComputedStyle(r), a = s.getPropertyValue("overflow"), l = s.getPropertyValue("overflow-y"), u = s.getPropertyValue("overflow-x"), "scroll" === a || "scroll" === u || "scroll" === l)) return r;
                    if (r.clientHeight <= r.scrollHeight && (i.indexOf(o) !== -1 || i.indexOf(t) !== -1 || i.indexOf(a) !== -1 || i.indexOf(l) !== -1)) return r;
                    if (r.clientWidth <= r.scrollWidth && (i.indexOf(n) !== -1 || i.indexOf(t) !== -1 || i.indexOf(a) !== -1 || i.indexOf(u) !== -1)) return r;
                    r = r.parentNode
                }
                return window
            }

            function O(e) {
                for (var t = e.parentNode; t && t.style && document.body !== t;) {
                    if ("visible" !== t.style.overflow && "" !== t.style.overflow) return t;
                    if (window.getComputedStyle) {
                        var n = window.getComputedStyle(t);
                        if ("visible" !== n.getPropertyValue("overflow") && "" !== n.getPropertyValue("overflow")) return t
                    }
                    t = t.parentNode
                }
                return window
            }

            function T(e, t) {
                if (e) {
                    if (e !== window) {
                        var n, o = e.style[t];
                        return "" !== o && void 0 !== o ? o : (n = k(e), "" !== n[t] && void 0 !== n[t] ? n[t] : void 0)
                    }
                    if ("width" === t) return window.innerWidth + "px";
                    if ("height" === t) return window.innerHeight + "px"
                }
            }

            function k(e) {
                return e.currentStyle || document.defaultView.getComputedStyle(e)
            }

            function x(e) {
                return e.offsetWidth
            }

            function D(e) {
                return re() && e.firstChild && "CAPTION" === e.firstChild.nodeName ? e.offsetHeight + e.firstChild.offsetHeight : e.offsetHeight
            }

            function H(e) {
                return e.clientHeight || e.innerHeight
            }

            function A(e) {
                return e.clientWidth || e.innerWidth
            }

            function P(e, t, n) {
                window.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
            }

            function N(e, t, n) {
                window.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
            }

            function L(e) {
                if (e.selectionStart) return e.selectionStart;
                if (document.selection) {
                    e.focus();
                    var t = document.selection.createRange();
                    if (null == t) return 0;
                    var n = e.createTextRange(), o = n.duplicate();
                    return n.moveToBookmark(t.getBookmark()), o.setEndPoint("EndToStart", n), o.text.length
                }
                return 0
            }

            function I(e) {
                if (e.selectionEnd) return e.selectionEnd;
                if (document.selection) {
                    var t = document.selection.createRange();
                    if (null == t) return 0;
                    var n = e.createTextRange();
                    return n.text.indexOf(t.text) + t.text.length
                }
            }

            function W() {
                var e = "";
                return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
            }

            function j(e, t, n) {
                if (void 0 === n && (n = t), e.setSelectionRange) {
                    e.focus();
                    try {
                        e.setSelectionRange(t, n)
                    } catch (i) {
                        var o = e.parentNode, r = o.style.display;
                        o.style.display = "block", e.setSelectionRange(t, n), o.style.display = r
                    }
                } else if (e.createTextRange) {
                    var i = e.createTextRange();
                    i.collapse(!0), i.moveEnd("character", n), i.moveStart("character", t), i.select()
                }
            }

            function V() {
                var e = document.createElement("div");
                e.style.height = "200px", e.style.width = "100%";
                var t = document.createElement("div");
                t.style.boxSizing = "content-box", t.style.height = "150px", t.style.left = "0px", t.style.overflow = "hidden", t.style.position = "absolute", t.style.top = "0px", t.style.width = "200px", t.style.visibility = "hidden", t.appendChild(e), (document.body || document.documentElement).appendChild(t);
                var n = e.offsetWidth;
                t.style.overflow = "scroll";
                var o = e.offsetWidth;
                return n == o && (o = t.clientWidth), (document.body || document.documentElement).removeChild(t), n - o
            }

            function B() {
                return void 0 === le && (le = V()), le
            }

            function F(e) {
                return e.offsetWidth !== e.clientWidth
            }

            function z(e) {
                return e.offsetHeight !== e.clientHeight
            }

            function Y(e, t, n) {
                te() || ne() ? (e.style.top = n, e.style.left = t) : oe() ? e.style["-webkit-transform"] = "translate3d(" + t + "," + n + ",0)" : e.style.transform = "translate3d(" + t + "," + n + ",0)"
            }

            function U(e) {
                var t;
                return e.style.transform && "" !== (t = e.style.transform) ? ["transform", t] : e.style["-webkit-transform"] && "" !== (t = e.style["-webkit-transform"]) ? ["-webkit-transform", t] : -1
            }

            function G(e) {
                e.style.transform && "" !== e.style.transform ? e.style.transform = "" : e.style["-webkit-transform"] && "" !== e.style["-webkit-transform"] && (e.style["-webkit-transform"] = "")
            }

            function $(e) {
                var t = ["INPUT", "SELECT", "TEXTAREA"];
                return e && (t.indexOf(e.nodeName) > -1 || "true" === e.contentEditable)
            }

            function K(e) {
                return $(e) && e.className.indexOf("handsontableInput") == -1 && e.className.indexOf("copyPaste") == -1
            }

            Object.defineProperties(n, {
                getParent: {
                    get: function () {
                        return o
                    }
                }, closest: {
                    get: function () {
                        return r
                    }
                }, closestDown: {
                    get: function () {
                        return i
                    }
                }, isChildOf: {
                    get: function () {
                        return s
                    }
                }, isChildOfWebComponentTable: {
                    get: function () {
                        return a
                    }
                }, polymerWrap: {
                    get: function () {
                        return l
                    }
                }, polymerUnwrap: {
                    get: function () {
                        return u
                    }
                }, index: {
                    get: function () {
                        return c
                    }
                }, overlayContainsElement: {
                    get: function () {
                        return d
                    }
                }, hasClass: {
                    get: function () {
                        return f
                    }
                }, addClass: {
                    get: function () {
                        return p
                    }
                }, removeClass: {
                    get: function () {
                        return m
                    }
                }, removeTextNodes: {
                    get: function () {
                        return g
                    }
                }, empty: {
                    get: function () {
                        return w
                    }
                }, HTML_CHARACTERS: {
                    get: function () {
                        return ue
                    }
                }, fastInnerHTML: {
                    get: function () {
                        return v
                    }
                }, fastInnerText: {
                    get: function () {
                        return y
                    }
                }, isVisible: {
                    get: function () {
                        return b
                    }
                }, offset: {
                    get: function () {
                        return C
                    }
                }, getWindowScrollTop: {
                    get: function () {
                        return _
                    }
                }, getWindowScrollLeft: {
                    get: function () {
                        return R
                    }
                }, getScrollTop: {
                    get: function () {
                        return M
                    }
                }, getScrollLeft: {
                    get: function () {
                        return S
                    }
                }, getScrollableElement: {
                    get: function () {
                        return E
                    }
                }, getTrimmingContainer: {
                    get: function () {
                        return O
                    }
                }, getStyle: {
                    get: function () {
                        return T
                    }
                }, getComputedStyle: {
                    get: function () {
                        return k
                    }
                }, outerWidth: {
                    get: function () {
                        return x
                    }
                }, outerHeight: {
                    get: function () {
                        return D
                    }
                }, innerHeight: {
                    get: function () {
                        return H
                    }
                }, innerWidth: {
                    get: function () {
                        return A
                    }
                }, addEvent: {
                    get: function () {
                        return P
                    }
                }, removeEvent: {
                    get: function () {
                        return N
                    }
                }, getCaretPosition: {
                    get: function () {
                        return L
                    }
                }, getSelectionEndPosition: {
                    get: function () {
                        return I
                    }
                }, getSelectionText: {
                    get: function () {
                        return W
                    }
                }, setCaretPosition: {
                    get: function () {
                        return j
                    }
                }, getScrollbarWidth: {
                    get: function () {
                        return B
                    }
                }, hasVerticalScrollbar: {
                    get: function () {
                        return F
                    }
                }, hasHorizontalScrollbar: {
                    get: function () {
                        return z
                    }
                }, setOverlayPosition: {
                    get: function () {
                        return Y
                    }
                }, getCssTransform: {
                    get: function () {
                        return U
                    }
                }, resetCssTransform: {
                    get: function () {
                        return G
                    }
                }, isInput: {
                    get: function () {
                        return $
                    }
                }, isOutsideInput: {
                    get: function () {
                        return K
                    }
                }, __esModule: {value: !0}
            });
            var X, q, Z, J, Q, ee = (X = e("../browser"), X && X.__esModule && X || {default: X}), te = ee.isIE8,
                ne = ee.isIE9, oe = ee.isSafari,
                re = (q = e("../feature"), q && q.__esModule && q || {default: q}).hasCaptionProblem,
                ie = !!document.documentElement.classList;
            if (ie) {
                var se = function () {
                    var e = document.createElement("div");
                    return e.classList.add("test", "test2"), e.classList.contains("test2")
                }();
                Z = function (e, t) {
                    return "" !== t && e.classList.contains(t)
                }, J = function (e, t) {
                    var n = 0;
                    if ("string" == typeof t && (t = t.split(" ")), t = h(t), se) e.classList.add.apply(e.classList, t); else for (; t && t[n];) e.classList.add(t[n]), n++
                }, Q = function (e, t) {
                    var n = 0;
                    if ("string" == typeof t && (t = t.split(" ")), t = h(t), se) e.classList.remove.apply(e.classList, t); else for (; t && t[n];) e.classList.remove(t[n]), n++
                }
            } else {
                var ae = function (e) {
                    return new RegExp("(\\s|^)" + e + "(\\s|$)")
                };
                Z = function (e, t) {
                    return !!e.className.match(ae(t))
                }, J = function (e, t) {
                    var n = 0, o = e.className;
                    if ("string" == typeof t && (t = t.split(" ")), "" === o) o = t.join(" "); else for (; t && t[n];) ae(t[n]).test(o) || (o += " " + t[n]), n++;
                    e.className = o
                }, Q = function (e, t) {
                    var n = 0, o = e.className;
                    for ("string" == typeof t && (t = t.split(" ")); t && t[n];) o = o.replace(ae(t[n]), " ").trim(), n++;
                    e.className !== o && (e.className = o)
                }
            }
            var le, ue = /(<(.*)>|&(.*);)/, ce = !!document.createTextNode("test").textContent
        }, {"../browser": 44, "../feature": 49}],
        48: [function (e, t, n) {
            "use strict";

            function o(e) {
                e.isImmediatePropagationEnabled = !1, e.cancelBubble = !0
            }

            function r(e) {
                return e.isImmediatePropagationEnabled === !1
            }

            function i(e) {
                "function" == typeof e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }

            function s(e) {
                return e.pageX ? e.pageX : e.clientX + f()
            }

            function a(e) {
                return e.pageY ? e.pageY : e.clientY + h()
            }

            function l(e) {
                return 2 === e.button
            }

            function u(e) {
                return 0 === e.button
            }

            Object.defineProperties(n, {
                stopImmediatePropagation: {
                    get: function () {
                        return o
                    }
                }, isImmediatePropagationStopped: {
                    get: function () {
                        return r
                    }
                }, stopPropagation: {
                    get: function () {
                        return i
                    }
                }, pageX: {
                    get: function () {
                        return s
                    }
                }, pageY: {
                    get: function () {
                        return a
                    }
                }, isRightClick: {
                    get: function () {
                        return l
                    }
                }, isLeftClick: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var c, d = (c = e("element"), c && c.__esModule && c || {default: c}), h = d.getWindowScrollTop,
                f = d.getWindowScrollLeft
        }, {element: 47}],
        49: [function (e, t, n) {
            "use strict";

            function o(e) {
                return h.call(window, e)
            }

            function r(e) {
                f.call(window, e)
            }

            function i() {
                return "ontouchstart" in window
            }

            function s() {
                var e = document.createElement("div");
                return !(!e.createShadowRoot || !e.createShadowRoot.toString().match(/\[native code\]/))
            }

            function a() {
                var e = document.createElement("TABLE");
                e.style.borderSpacing = 0, e.style.borderWidth = 0, e.style.padding = 0;
                var t = document.createElement("TBODY");
                e.appendChild(t), t.appendChild(document.createElement("TR")), t.firstChild.appendChild(document.createElement("TD")), t.firstChild.firstChild.innerHTML = "<tr><td>t<br>t</td></tr>";
                var n = document.createElement("CAPTION");
                n.innerHTML = "c<br>c<br>c<br>c", n.style.padding = 0, n.style.margin = 0, e.insertBefore(n, t), document.body.appendChild(e), m = e.offsetHeight < 2 * e.lastChild.offsetHeight, document.body.removeChild(e)
            }

            function l() {
                return void 0 === m && a(), m
            }

            function u(e) {
                var t = void 0 !== arguments[1] ? arguments[1] : {};
                return g ? g : g = "object" == typeof Intl ? new Intl.Collator(e, t).compare : "function" == typeof String.prototype.localeCompare ? function (e, t) {
                    return (e + "").localeCompare(t)
                } : function (e, t) {
                    return e === t ? 0 : e > t ? -1 : 1
                }
            }

            Object.defineProperties(n, {
                requestAnimationFrame: {
                    get: function () {
                        return o
                    }
                }, cancelAnimationFrame: {
                    get: function () {
                        return r
                    }
                }, isTouchSupported: {
                    get: function () {
                        return i
                    }
                }, isWebComponentSupportedNatively: {
                    get: function () {
                        return s
                    }
                }, hasCaptionProblem: {
                    get: function () {
                        return l
                    }
                }, getComparisonFunction: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            for (var c = 0, d = ["ms", "moz", "webkit", "o"], h = window.requestAnimationFrame, f = window.cancelAnimationFrame, p = 0; p < d.length && !h; ++p) h = window[d[p] + "RequestAnimationFrame"], f = window[d[p] + "CancelAnimationFrame"] || window[d[p] + "CancelRequestAnimationFrame"];
            h || (h = function (e) {
                var t = (new Date).getTime(), n = Math.max(0, 16 - (t - c)), o = window.setTimeout(function () {
                    e(t + n)
                }, n);
                return c = t + n, o
            }), f || (f = function (e) {
                clearTimeout(e)
            });
            var m, g
        }, {}],
        50: [function (e, t, n) {
            "use strict";

            function o(e) {
                return "function" == typeof e
            }

            function r(e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            }

            function i(e) {
                function t() {
                    var t = this, s = arguments, a = Date.now(), l = !1;
                    r.lastCallThrottled = !0, o || (o = a, l = !0);
                    var u = n - (a - o);
                    return l ? (r.lastCallThrottled = !1, e.apply(this, s)) : (i && clearTimeout(i), i = setTimeout(function () {
                        r.lastCallThrottled = !1, e.apply(t, s), o = 0, i = void 0
                    }, u)), r
                }

                var n = void 0 !== arguments[1] ? arguments[1] : 200, o = 0, r = {lastCallThrottled: !0}, i = null;
                return t
            }

            function s(e) {
                function t() {
                    a = r
                }

                function n() {
                    return a ? (a--, e.apply(this, arguments)) : s.apply(this, arguments)
                }

                var o = void 0 !== arguments[1] ? arguments[1] : 200, r = void 0 !== arguments[2] ? arguments[2] : 10,
                    s = i(e, o), a = r;
                return n.clearHits = t, n
            }

            function a(e) {
                function t() {
                    var t = this, i = arguments;
                    return r && clearTimeout(r), r = setTimeout(function () {
                        n = e.apply(t, i)
                    }, o), n
                }

                var n, o = void 0 !== arguments[1] ? arguments[1] : 200, r = null;
                return t
            }

            function l() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var n = e, o = n[0], r = Array.prototype.slice.call(n, 1);
                return function () {
                    return f(r, function (e, t) {
                        return t(e)
                    }, o.apply(this, arguments))
                }
            }

            function u(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                return function () {
                    for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                    return e.apply(this, t.concat(n))
                }
            }

            function c(e) {
                function t(o) {
                    return function () {
                        for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                        var s, a = o.concat(r);
                        return s = a.length >= n ? e.apply(this, a) : t(a)
                    }
                }

                var n = e.length;
                return t([])
            }

            function d(e) {
                function t(o) {
                    return function () {
                        for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                        var s, a = o.concat(r.reverse());
                        return s = a.length >= n ? e.apply(this, a) : t(a)
                    }
                }

                var n = e.length;
                return t([])
            }

            Object.defineProperties(n, {
                isFunction: {
                    get: function () {
                        return o
                    }
                }, proxy: {
                    get: function () {
                        return r
                    }
                }, throttle: {
                    get: function () {
                        return i
                    }
                }, throttleAfterHits: {
                    get: function () {
                        return s
                    }
                }, debounce: {
                    get: function () {
                        return a
                    }
                }, pipe: {
                    get: function () {
                        return l
                    }
                }, partial: {
                    get: function () {
                        return u
                    }
                }, curry: {
                    get: function () {
                        return c
                    }
                }, curryRight: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var h, f = (h = e("array"), h && h.__esModule && h || {default: h}).arrayReduce
        }, {array: 43}],
        51: [function (e, t, n) {
            "use strict";

            function o(e) {
                switch (typeof e) {
                    case"string":
                    case"number":
                        return e + "";
                    case"object":
                        return null === e ? "" : e.toString();
                    case"undefined":
                        return "";
                    default:
                        return e.toString()
                }
            }

            function r(e) {
                return "undefined" != typeof e
            }

            function i(e) {
                return "undefined" == typeof e
            }

            function s(e) {
                return null === e || "" === e || i(e)
            }

            Object.defineProperties(n, {
                stringify: {
                    get: function () {
                        return o
                    }
                }, isDefined: {
                    get: function () {
                        return r
                    }
                }, isUndefined: {
                    get: function () {
                        return i
                    }
                }, isEmpty: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        52: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = typeof e;
                return "number" == t ? !isNaN(e) && isFinite(e) : "string" == t ? !!e.length && (1 == e.length ? /\d/.test(e) : /^\s*[+-]?\s*(?:(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?)|(?:0x[a-f\d]+))\s*$/i.test(e)) : "object" == t && !(!e || "number" != typeof e.valueOf() || e instanceof Date)
            }

            function r(e, t, n) {
                var o = -1;
                for ("function" == typeof t ? (n = t, t = e) : o = e - 1; ++o <= t && n(o) !== !1;) ;
            }

            function i(e, t, n) {
                var o = e + 1;
                for ("function" == typeof t && (n = t, t = 0); --o >= t && n(o) !== !1;) ;
            }

            function s(e, t) {
                return t = parseInt(t.toString().replace("%", ""), 10), t = parseInt(e * t / 100)
            }

            Object.defineProperties(n, {
                isNumeric: {
                    get: function () {
                        return o
                    }
                }, rangeEach: {
                    get: function () {
                        return r
                    }
                }, rangeEachReverse: {
                    get: function () {
                        return i
                    }
                }, valueAccordingPercent: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        53: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t;
                return Array.isArray(e) ? t = [] : (t = {}, p(e, function (e, n) {
                    "__children" !== n && (e && "object" == typeof e && !Array.isArray(e) ? t[n] = o(e) : Array.isArray(e) ? e.length && "object" == typeof e[0] && !Array.isArray(e[0]) ? t[n] = [o(e[0])] : t[n] = [] : t[n] = null)
                })), t
            }

            function r(e, t) {
                return t.prototype.constructor = t, e.prototype = new t, e.prototype.constructor = e, e
            }

            function i(e, t) {
                return p(t, function (t, n) {
                    e[n] = t
                }), e
            }

            function s(e, t) {
                p(t, function (n, o) {
                    t[o] && "object" == typeof t[o] ? (e[o] || (Array.isArray(t[o]) ? e[o] = [] : "[object Date]" === Object.prototype.toString.call(t[o]) ? e[o] = t[o] : e[o] = {}), s(e[o], t[o])) : e[o] = t[o]
                })
            }

            function a(e) {
                return "object" == typeof e ? JSON.parse(JSON.stringify(e)) : e
            }

            function l(e) {
                var t = {};
                return p(e, function (e, n) {
                    t[n] = e
                }), t
            }

            function u(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                return e.MIXINS || (e.MIXINS = []), y(t, function (t) {
                    e.MIXINS.push(t.MIXIN_NAME), p(t, function (t, n) {
                        if (void 0 !== e.prototype[n]) throw new Error("Mixin conflict. Property '" + n + "' already exist and cannot be overwritten.");
                        if ("function" == typeof t) e.prototype[n] = t; else {
                            var o = function (e, t) {
                                e = "_" + e;
                                var n = function (e) {
                                    return (Array.isArray(e) || d(e)) && (e = a(e)), e
                                };
                                return function () {
                                    return void 0 === this[e] && (this[e] = n(t)), this[e]
                                }
                            }, r = function (e) {
                                return e = "_" + e, function (t) {
                                    this[e] = t
                                }
                            };
                            Object.defineProperty(e.prototype, n, {get: o(n, t), set: r(n), configurable: !0})
                        }
                    })
                }), e
            }

            function c(e, t) {
                return JSON.stringify(e) === JSON.stringify(t)
            }

            function d(e) {
                return "[object Object]" == Object.prototype.toString.call(e)
            }

            function h(e) {
                var t;
                if ("object" == typeof e.__proto__) t = e.__proto__; else {
                    var n, o = e.constructor;
                    "function" == typeof e.constructor && (n = o, delete e.constructor && (o = e.constructor, e.constructor = n)), t = o ? o.prototype : null
                }
                return t
            }

            function f(e, t, n, o) {
                o.value = n, o.writable = o.writable !== !1, o.enumerable = o.enumerable !== !1, o.configurable = o.configurable !== !1, Object.defineProperty(e, t, o)
            }

            function p(e, t) {
                for (var n in e) if ((!e.hasOwnProperty || e.hasOwnProperty && e.hasOwnProperty(n)) && t(e[n], n, e) === !1) break;
                return e
            }

            function m(e, t) {
                var n = t.split("."), o = e;
                return p(n, function (e) {
                    if (o = o[e], void 0 === o) return o = void 0, !1
                }), o
            }

            function g(e) {
                if (!d(e)) return 0;
                var t = function (e) {
                    var n = 0;
                    return d(e) ? p(e, function (e) {
                        n += t(e)
                    }) : n++, n
                };
                return t(e)
            }

            function w(e) {
                var t, n = void 0 !== arguments[1] ? arguments[1] : "value", o = "_" + n,
                    r = (t = {}, Object.defineProperty(t, "_touched", {
                        value: !1,
                        configurable: !0,
                        enumerable: !0,
                        writable: !0
                    }), Object.defineProperty(t, o, {
                        value: e,
                        configurable: !0,
                        enumerable: !0,
                        writable: !0
                    }), Object.defineProperty(t, "isTouched", {
                        value: function () {
                            return this._touched
                        }, configurable: !0, enumerable: !0, writable: !0
                    }), t);
                return Object.defineProperty(r, n, {
                    get: function () {
                        return this[o]
                    }, set: function (e) {
                        this._touched = !0, this[o] = e
                    }, enumerable: !0, configurable: !0
                }), r
            }

            Object.defineProperties(n, {
                duckSchema: {
                    get: function () {
                        return o
                    }
                }, inherit: {
                    get: function () {
                        return r
                    }
                }, extend: {
                    get: function () {
                        return i
                    }
                }, deepExtend: {
                    get: function () {
                        return s
                    }
                }, deepClone: {
                    get: function () {
                        return a
                    }
                }, clone: {
                    get: function () {
                        return l
                    }
                }, mixin: {
                    get: function () {
                        return u
                    }
                }, isObjectEquals: {
                    get: function () {
                        return c
                    }
                }, isObject: {
                    get: function () {
                        return d
                    }
                }, getPrototypeOf: {
                    get: function () {
                        return h
                    }
                }, defineGetter: {
                    get: function () {
                        return f
                    }
                }, objectEach: {
                    get: function () {
                        return p
                    }
                }, getProperty: {
                    get: function () {
                        return m
                    }
                }, deepObjectSize: {
                    get: function () {
                        return g
                    }
                }, createObjectPropListener: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var v, y = (v = e("array"), v && v.__esModule && v || {default: v}).arrayEach
        }, {array: 43}],
        54: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                function n() {
                }

                i(n, e);
                for (var o = 0, r = t.length; o < r; o++) n.prototype[t[o]] = void 0;
                return n
            }

            Object.defineProperties(n, {
                columnFactory: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("object"), r && r.__esModule && r || {default: r}).inherit
        }, {object: 53}],
        55: [function (e, t, n) {
            "use strict";

            function o(e) {
                return e[0].toUpperCase() + e.substr(1)
            }

            function r(e, t) {
                var n = !0;
                return m(t.length - 1, function (o) {
                    if (e.charAt(o) !== t.charAt(o)) return n = !1, !1
                }), n
            }

            function i(e, t) {
                var n = !0, o = t.length - 1, r = e.length - 1;
                return m(o, function (i) {
                    var s = r - i, a = o - i;
                    if (e.charAt(s) !== t.charAt(a)) return n = !1, !1
                }), n
            }

            function s() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var n = [], o = e.length; o--;) {
                    var r = p(e[o]).toLowerCase();
                    n.indexOf(r) === -1 && n.push(r)
                }
                return 1 === n.length
            }

            function a() {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }

                return e() + e() + e() + e()
            }

            function l(e) {
                return /^([0-9][0-9]?\%$)|(^100\%$)/.test(e)
            }

            function u(e) {
                var t = void 0 !== arguments[1] ? arguments[1] : {};
                return (e + "").replace(/(?:\\)?\[([^\[\]]+)]/g, function (e, n) {
                    return "\\" === e.charAt(0) ? e.substr(1, e.length - 1) : void 0 === t[n] ? "" : t[n]
                })
            }

            function c(e, t) {
                var n = void 0 !== arguments[2] ? arguments[2] : " ";
                if (e += "", e.length >= t) return e;
                n = String(n);
                var o = n.length;
                o || (n = " ");
                var r = t - e.length, i = Math.ceil(r / n.length), s = "";
                return m(i, function (e) {
                    s += n
                }), s = s.slice(0, r), s + e
            }

            function d(e) {
                return e += "", e.replace(g, "")
            }

            Object.defineProperties(n, {
                toUpperCaseFirst: {
                    get: function () {
                        return o
                    }
                }, startsWith: {
                    get: function () {
                        return r
                    }
                }, endsWith: {
                    get: function () {
                        return i
                    }
                }, equalsIgnoreCase: {
                    get: function () {
                        return s
                    }
                }, randomString: {
                    get: function () {
                        return a
                    }
                }, isPercentValue: {
                    get: function () {
                        return l
                    }
                }, substitute: {
                    get: function () {
                        return u
                    }
                }, padStart: {
                    get: function () {
                        return c
                    }
                }, stripTags: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var h, f, p = (h = e("mixed"), h && h.__esModule && h || {default: h}).stringify,
                m = (f = e("number"), f && f.__esModule && f || {default: f}).rangeEach,
                g = /<\/?\w+\/?>|<\w+[\s|\/][^>]*>/gi
        }, {mixed: 51, number: 52}],
        56: [function (e, t, n) {
            "use strict";

            function o(e) {
                return 32 == e || e >= 48 && e <= 57 || e >= 96 && e <= 111 || e >= 186 && e <= 192 || e >= 219 && e <= 222 || e >= 226 || e >= 65 && e <= 90
            }

            function r(e) {
                var t = [u.ARROW_DOWN, u.ARROW_UP, u.ARROW_LEFT, u.ARROW_RIGHT, u.HOME, u.END, u.DELETE, u.BACKSPACE, u.F1, u.F2, u.F3, u.F4, u.F5, u.F6, u.F7, u.F8, u.F9, u.F10, u.F11, u.F12, u.TAB, u.PAGE_DOWN, u.PAGE_UP, u.ENTER, u.ESCAPE, u.SHIFT, u.CAPS_LOCK, u.ALT];
                return t.indexOf(e) !== -1
            }

            function i(e) {
                return [u.CONTROL_LEFT, 224, u.COMMAND_LEFT, u.COMMAND_RIGHT].indexOf(e) !== -1
            }

            function s(e, t) {
                var n = t.split("|"), o = !1;
                return l(n, function (t) {
                    if (e === u[t]) return o = !0, !1
                }), o
            }

            Object.defineProperties(n, {
                KEY_CODES: {
                    get: function () {
                        return u
                    }
                }, isPrintableChar: {
                    get: function () {
                        return o
                    }
                }, isMetaKey: {
                    get: function () {
                        return r
                    }
                }, isCtrlKey: {
                    get: function () {
                        return i
                    }
                }, isKey: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            });
            var a, l = (a = e("array"), a && a.__esModule && a || {default: a}).arrayEach, u = {
                MOUSE_LEFT: 1,
                MOUSE_RIGHT: 3,
                MOUSE_MIDDLE: 2,
                BACKSPACE: 8,
                COMMA: 188,
                INSERT: 45,
                DELETE: 46,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                CONTROL_LEFT: 91,
                COMMAND_LEFT: 17,
                COMMAND_RIGHT: 93,
                ALT: 18,
                HOME: 36,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                SPACE: 32,
                SHIFT: 16,
                CAPS_LOCK: 20,
                TAB: 9,
                ARROW_RIGHT: 39,
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_DOWN: 40,
                F1: 112,
                F2: 113,
                F3: 114,
                F4: 115,
                F5: 116,
                F6: 117,
                F7: 118,
                F8: 119,
                F9: 120,
                F10: 121,
                F11: 122,
                F12: 123,
                A: 65,
                X: 88,
                C: 67,
                V: 86
            }
        }, {array: 43}],
        57: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                arrayMapper: {
                    get: function () {
                        return m
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                l = (r = e("helpers/array"), r && r.__esModule && r || {default: r}), u = (l.arrayEach, l.arrayReduce),
                c = l.arrayMap, d = l.arrayMax,
                h = (i = e("helpers/object"), i && i.__esModule && i || {default: i}).defineGetter,
                f = (s = e("helpers/number"), s && s.__esModule && s || {default: s}).rangeEach, p = "arrayMapper",
                m = {
                    _arrayMap: [], getValueByIndex: function (e) {
                        var t;
                        return void 0 === (t = this._arrayMap[e]) ? null : t
                    }, getIndexByValue: function (e) {
                        var t;
                        return (t = this._arrayMap.indexOf(e)) === -1 ? null : t
                    }, insertItems: function (e) {
                        var t = void 0 !== arguments[1] ? arguments[1] : 1, n = this, o = d(this._arrayMap) + 1, r = [];
                        return f(t - 1, function (t) {
                            r.push(n._arrayMap.splice(e + t, 0, o + t))
                        }), r
                    }, removeItems: function (e) {
                        var t = void 0 !== arguments[1] ? arguments[1] : 1, n = this, o = [];
                        if (Array.isArray(e)) {
                            var r = [].concat(this._arrayMap);
                            e.sort(function (e, t) {
                                return t - e
                            }), o = u(e, function (e, t) {
                                return n._arrayMap.splice(t, 1), e.concat(r.slice(t, t + 1))
                            }, [])
                        } else o = this._arrayMap.splice(e, t);
                        return o
                    }, unshiftItems: function (e) {
                        function t(e) {
                            return u(o, function (t, n) {
                                return e > n && t++, t
                            }, 0)
                        }

                        var n = void 0 !== arguments[1] ? arguments[1] : 1, o = this.removeItems(e, n);
                        this._arrayMap = c(this._arrayMap, function (e, n) {
                            var o = t(e);
                            return o && (e -= o), e
                        })
                    }, shiftItems: function (e) {
                        var t = void 0 !== arguments[1] ? arguments[1] : 1, n = this;
                        this._arrayMap = c(this._arrayMap, function (n) {
                            return n >= e && (n += t), n
                        }), f(t - 1, function (t) {
                            n._arrayMap.splice(e + t, 0, e + t)
                        })
                    }, clearMap: function () {
                        this._arrayMap.length = 0
                    }
                };
            h(m, "MIXIN_NAME", p, {writable: !1, enumerable: !1}), a.utils.arrayMapper = m
        }, {browser: 24, "helpers/array": 43, "helpers/number": 52, "helpers/object": 53}],
        58: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                localHooks: {
                    get: function () {
                        return c
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                a = (r = e("helpers/array"), r && r.__esModule && r || {default: r}).arrayEach,
                l = (i = e("helpers/object"), i && i.__esModule && i || {default: i}).defineGetter, u = "localHooks",
                c = {
                    _localHooks: Object.create(null), addLocalHook: function (e, t) {
                        this._localHooks[e] || (this._localHooks[e] = []), this._localHooks[e].push(t)
                    }, runLocalHooks: function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        var o = this;
                        this._localHooks[e] && a(this._localHooks[e], function (e) {
                            return e.apply(o, t)
                        })
                    }, clearLocalHooks: function () {
                        this._localHooks = {}
                    }
                };
            l(c, "MIXIN_NAME", u, {writable: !1, enumerable: !1}), s.utils.localHooks = c
        }, {browser: 24, "helpers/array": 43, "helpers/object": 53}],
        59: [function (e, t, n) {
            "use strict";

            function o() {
                function e(e) {
                    return null !== e && !n(e) && ("string" == typeof e || "number" == typeof e)
                }

                function t(e) {
                    return null !== e && ("object" == typeof e || "function" == typeof e)
                }

                function n(e) {
                    return e !== e
                }

                var o = {arrayMap: [], weakMap: new WeakMap};
                return {
                    get: function (n) {
                        return e(n) ? o.arrayMap[n] : t(n) ? o.weakMap.get(n) : void 0
                    }, set: function (n, r) {
                        if (e(n)) o.arrayMap[n] = r; else {
                            if (!t(n)) throw new Error("Invalid key type");
                            o.weakMap.set(n, r)
                        }
                    }, delete: function (n) {
                        e(n) ? delete o.arrayMap[n] : t(n) && o.weakMap.delete(n)
                    }
                }
            }

            Object.defineProperties(n, {
                MultiMap: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            }), window.MultiMap = o
        }, {}],
        60: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                Hooks: {
                    get: function () {
                        return l
                    }
                }, __esModule: {value: !0}
            });
            var o, r,
                i = ["afterCellMetaReset", "afterChange", "afterChangesObserved", "afterContextMenuDefaultOptions", "beforeContextMenuSetItems", "afterDropdownMenuDefaultOptions", "beforeDropdownMenuSetItems", "afterContextMenuHide", "afterContextMenuShow", "afterCopyLimit", "beforeCreateCol", "afterCreateCol", "beforeCreateRow", "afterCreateRow", "afterDeselect", "afterDestroy", "afterDocumentKeyDown", "afterGetCellMeta", "afterGetColHeader", "afterGetRowHeader", "afterInit", "afterLoadData", "afterMomentumScroll", "afterOnCellCornerMouseDown", "afterOnCellCornerDblClick", "afterOnCellMouseDown", "afterOnCellMouseOver", "afterRemoveCol", "afterRemoveRow", "afterRender", "beforeRenderer", "afterRenderer", "afterScrollHorizontally", "afterScrollVertically", "afterSelection", "afterSelectionByProp", "afterSelectionEnd", "afterSelectionEndByProp", "afterSetCellMeta", "afterSetDataAtCell", "afterSetDataAtRowProp", "afterUpdateSettings", "afterValidate", "beforeAutofill", "beforeCellAlignment", "beforeChange", "beforeChangeRender", "beforeDrawBorders", "beforeGetCellMeta", "beforeInit", "beforeInitWalkontable", "beforeKeyDown", "beforeOnCellMouseDown", "beforeOnCellMouseOver", "beforeRemoveCol", "beforeRemoveRow", "beforeRender", "beforeSetRangeStart", "beforeSetRangeEnd", "beforeTouchScroll", "beforeValidate", "beforeValueRender", "construct", "init", "modifyCol", "unmodifyCol", "unmodifyRow", "modifyColHeader", "modifyColWidth", "modifyRow", "modifyRowHeader", "modifyRowHeight", "modifyData", "modifyRowData", "persistentStateLoad", "persistentStateReset", "persistentStateSave", "beforeColumnSort", "afterColumnSort", "modifyAutofillRange", "modifyCopyableRange", "beforeColumnMove", "afterColumnMove", "beforeRowMove", "afterRowMove", "beforeColumnResize", "afterColumnResize", "beforeRowResize", "afterRowResize", "afterGetColumnHeaderRenderers", "afterGetRowHeaderRenderers", "beforeStretchingColumnWidth", "beforeFilter", "afterFilter", "modifyColumnHeaderHeight", "beforeUndo", "afterUndo", "beforeRedo", "afterRedo", "modifyRowHeaderWidth", "beforeAutofillInsidePopulate", "modifyTransformStart", "modifyTransformEnd", "afterModifyTransformStart", "afterModifyTransformEnd", "beforeValueRender", "afterViewportRowCalculatorOverride", "afterViewportColumnCalculatorOverride", "afterPluginsInitialized", "manualRowHeights", "skipLengthCache", "afterTrimRow", "afterUntrimRow", "afterDropdownMenuShow", "afterDropdownMenuHide", "hiddenRow", "hiddenColumn", "beforeAddChild", "afterAddChild", "beforeDetachChild", "afterDetachChild", "afterBeginEditing"],
                s = (o = e("helpers/array"), o && o.__esModule && o || {default: o}).arrayEach,
                a = (r = e("helpers/object"), r && r.__esModule && r || {default: r}).objectEach, l = function () {
                    this.globalBucket = this.createEmptyBucket()
                };
            $traceurRuntime.createClass(l, {
                createEmptyBucket: function () {
                    var e = Object.create(null);
                    return s(i, function (t) {
                        return e[t] = []
                    }), e
                }, getBucket: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    return e ? (e.pluginHookBucket || (e.pluginHookBucket = this.createEmptyBucket()), e.pluginHookBucket) : this.globalBucket
                }, add: function (e, t) {
                    var n = void 0 !== arguments[2] ? arguments[2] : null, o = this;
                    if (Array.isArray(t)) s(t, function (t) {
                        return o.add(e, t, n)
                    }); else {
                        var r = this.getBucket(n);
                        "undefined" == typeof r[e] && (this.register(e), r[e] = []), t.skip = !1, r[e].indexOf(t) === -1 && r[e].push(t)
                    }
                    return this
                }, once: function (e, t) {
                    var n = void 0 !== arguments[2] ? arguments[2] : null, o = this;
                    Array.isArray(t) ? s(t, function (t) {
                        return o.once(e, t, n)
                    }) : (t.runOnce = !0, this.add(e, t, n))
                }, remove: function (e, t) {
                    var n = void 0 !== arguments[2] ? arguments[2] : null, o = this.getBucket(n);
                    return "undefined" != typeof o[e] && o[e].indexOf(t) >= 0 && (t.skip = !0, !0)
                }, has: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : null, n = this.getBucket(t);
                    return !(void 0 === n[e] || !n[e].length)
                }, run: function (e, t, n, o, r, i, s, a) {
                    var l = this.globalBucket[t], u = -1, c = l ? l.length : 0;
                    if (c) for (; ++u < c;) if (l[u] && !l[u].skip) {
                        var d = l[u].call(e, n, o, r, i, s, a);
                        void 0 !== d && (n = d), l[u] && l[u].runOnce && this.remove(t, l[u])
                    }
                    var h = this.getBucket(e)[t], f = -1, p = h ? h.length : 0;
                    if (p) for (; ++f < p;) if (h[f] && !h[f].skip) {
                        var m = h[f].call(e, n, o, r, i, s, a);
                        void 0 !== m && (n = m), h[f] && h[f].runOnce && this.remove(t, h[f], e)
                    }
                    return n
                }, destroy: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    a(this.getBucket(e), function (e, t, n) {
                        return n[t].length = 0
                    })
                }, register: function (e) {
                    this.isRegistered(e) || i.push(e)
                }, deregister: function (e) {
                    this.isRegistered(e) && i.splice(i.indexOf(e), 1)
                }, isRegistered: function (e) {
                    return i.indexOf(e) >= 0
                }, getRegistered: function () {
                    return i
                }
            }, {})
        }, {"helpers/array": 43, "helpers/object": 53}],
        61: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                e = h(e), c.plugins[e] = t, c.hooks.add("construct", function () {
                    var n;
                    f.has(this) || f.set(this, {}), n = f.get(this), n[e] || (n[e] = new t(this))
                }), c.hooks.add("afterDestroy", function () {
                    if (f.has(this)) {
                        var e = f.get(this);
                        d(e, function (e) {
                            return e.destroy()
                        }), f.delete(this)
                    }
                })
            }

            function r(e, t) {
                if ("string" != typeof t) throw Error('Only strings can be passed as "plugin" parameter');
                var n = h(t);
                if (f.has(e) && f.get(e)[n]) return f.get(e)[n]
            }

            function i(e) {
                return f.has(e) ? Object.keys(f.get(e)) : []
            }

            function s(e, t) {
                var n = null;
                return f.has(e) && d(f.get(e), function (e, o) {
                    e === t && (n = o)
                }), n
            }

            Object.defineProperties(n, {
                registerPlugin: {
                    get: function () {
                        return o
                    }
                }, getPlugin: {
                    get: function () {
                        return r
                    }
                }, getRegistredPluginNames: {
                    get: function () {
                        return i
                    }
                }, getPluginName: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            });
            var a, l, u, c = (a = e("browser"), a && a.__esModule && a || {default: a}).default,
                d = (l = e("helpers/object"), l && l.__esModule && l || {default: l}).objectEach,
                h = (u = e("helpers/string"), u && u.__esModule && u || {default: u}).toUpperCaseFirst, f = new WeakMap
        }, {browser: 24, "helpers/object": 53, "helpers/string": 55}],
        62: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                default: {
                    get: function () {
                        return C
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                u = (r = e("helpers/object"), r && r.__esModule && r || {default: r}), c = u.defineGetter,
                d = u.objectEach, h = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                f = (s = e("utils/recordTranslator"), s && s.__esModule && s || {default: s}),
                p = (f.registerIdentity, f.getTranslator),
                m = (a = e("plugins"), a && a.__esModule && a || {default: a}), g = m.getRegistredPluginNames,
                w = m.getPluginName, v = new WeakMap, y = null, b = function (e) {
                    var t = this;
                    c(this, "hot", e, {writable: !1}), c(this, "t", p(e), {writable: !1}), v.set(this, {hooks: {}}), y = null, this.pluginName = null, this.pluginsInitializedCallbacks = [], this.isPluginsReady = !1, this.enabled = !1, this.initialized = !1, this.hot.addHook("afterPluginsInitialized", function () {
                        return t.onAfterPluginsInitialized()
                    }), this.hot.addHook("afterUpdateSettings", function () {
                        return t.onUpdateSettings()
                    }), this.hot.addHook("beforeInit", function () {
                        return t.init()
                    })
                };
            $traceurRuntime.createClass(b, {
                init: function () {
                    this.pluginName = w(this.hot, this), this.isEnabled && this.isEnabled() && this.enablePlugin(), y || (y = g(this.hot)), y.indexOf(this.pluginName) >= 0 && y.splice(y.indexOf(this.pluginName), 1), y.length || this.hot.runHooks("afterPluginsInitialized"), this.initialized = !0
                }, enablePlugin: function () {
                    this.enabled = !0
                }, disablePlugin: function () {
                    this.eventManager && this.eventManager.clear(), this.clearHooks(), this.enabled = !1
                }, addHook: function (e, t) {
                    var n = v.get(this).hooks[e] = v.get(this).hooks[e] || [];
                    this.hot.addHook(e, t), n.push(t), v.get(this).hooks[e] = n
                }, removeHooks: function (e) {
                    var t = this;
                    h(v.get(this).hooks[e] || [], function (n) {
                        t.hot.removeHook(e, n)
                    })
                }, clearHooks: function () {
                    var e = this, t = v.get(this).hooks;
                    d(t, function (t, n) {
                        return e.removeHooks(n)
                    }), t.length = 0
                }, callOnPluginsReady: function (e) {
                    this.isPluginsReady ? e() : this.pluginsInitializedCallbacks.push(e)
                }, onAfterPluginsInitialized: function () {
                    h(this.pluginsInitializedCallbacks, function (e) {
                        return e()
                    }), this.pluginsInitializedCallbacks.length = 0, this.isPluginsReady = !0
                }, onUpdateSettings: function () {
                    this.isEnabled && (this.enabled && !this.isEnabled() && this.disablePlugin(), !this.enabled && this.isEnabled() && this.enablePlugin(), this.enabled && this.isEnabled() && this.updatePlugin())
                }, updatePlugin: function () {
                }, destroy: function () {
                    var e = this;
                    this.eventManager && this.eventManager.destroy(), this.clearHooks(), d(this, function (t, n) {
                        "hot" !== n && "t" !== n && (e[n] = null)
                    }), delete this.t, delete this.hot
                }
            }, {});
            var C = b;
            l.plugins.BasePlugin = b
        }, {browser: 24, "helpers/array": 43, "helpers/object": 53, plugins: 61, "utils/recordTranslator": 130}],
        63: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                AutoColumnSize: {
                    get: function () {
                        return N
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f, p = (o = e("_base"), o && o.__esModule && o || {default: o}).default,
                m = (r = e("helpers/array"), r && r.__esModule && r || {default: r}), g = m.arrayEach,
                w = m.arrayFilter, v = m.arrayReduce, y = m.arrayMap,
                b = (i = e("helpers/feature"), i && i.__esModule && i || {default: i}), C = b.cancelAnimationFrame,
                _ = b.requestAnimationFrame,
                R = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}).isVisible,
                M = (a = e("utils/ghostTable"), a && a.__esModule && a || {default: a}).GhostTable,
                S = (l = e("helpers/object"), l && l.__esModule && l || {default: l}), E = S.isObject,
                O = (S.objectEach, u = e("helpers/number"), u && u.__esModule && u || {default: u}),
                T = O.valueAccordingPercent, k = O.rangeEach,
                x = (c = e("plugins"), c && c.__esModule && c || {default: c}).registerPlugin,
                D = (d = e("utils/samplesGenerator"), d && d.__esModule && d || {default: d}).SamplesGenerator,
                H = (h = e("helpers/string"), h && h.__esModule && h || {default: h}).isPercentValue,
                A = (f = e("3rdparty/walkontable/src/calculator/viewportColumns"), f && f.__esModule && f || {default: f}).WalkontableViewportColumnsCalculator,
                P = new WeakMap, N = function (e) {
                    var t = this;
                    $traceurRuntime.superConstructor(L).call(this, e), P.set(this, {cachedColumnHeaders: []}), this.widths = [], this.ghostTable = new M(this.hot), this.samplesGenerator = new D(function (e, n) {
                        return t.hot.getDataAtCell(e, n)
                    }), this.firstCalculation = !0, this.inProgress = !1, this.addHook("beforeColumnResize", function (e, n, o) {
                        return t.onBeforeColumnResize(e, n, o)
                    })
                }, L = N;
            $traceurRuntime.createClass(N, {
                isEnabled: function () {
                    return this.hot.getSettings().autoColumnSize !== !1 && !this.hot.getSettings().colWidths
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        var t = this.hot.getSettings().autoColumnSize;
                        t && null != t.useHeaders && this.ghostTable.setSetting("useHeaders", t.useHeaders), this.addHook("afterLoadData", function () {
                            return e.onAfterLoadData()
                        }), this.addHook("beforeChange", function (t) {
                            return e.onBeforeChange(t)
                        }), this.addHook("beforeRender", function (t) {
                            return e.onBeforeRender(t)
                        }), this.addHook("modifyColWidth", function (t, n) {
                            return e.getColumnWidth(n, t)
                        }), this.addHook("afterInit", function () {
                            return e.onAfterInit()
                        }), $traceurRuntime.superGet(this, L.prototype, "enablePlugin").call(this)
                    }
                }, updatePlugin: function () {
                    var e = this.findColumnsWhereHeaderWasChanged();
                    e.length && this.clearCache(e), $traceurRuntime.superGet(this, L.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, L.prototype, "disablePlugin").call(this)
                }, calculateColumnsWidth: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : {from: 0, to: this.hot.countCols() - 1},
                        t = void 0 !== arguments[1] ? arguments[1] : {from: 0, to: this.hot.countRows() - 1},
                        n = void 0 !== arguments[2] && arguments[2], o = this;
                    "number" == typeof e && (e = {from: e, to: e}), "number" == typeof t && (t = {
                        from: t,
                        to: t
                    }), k(e.from, e.to, function (e) {
                        if (n || void 0 === o.widths[e] && !o.hot._getColWidthFromSettings(e)) {
                            var r = o.samplesGenerator.generateColumnSamples(e, t);
                            r.forEach(function (e, t) {
                                return o.ghostTable.addColumn(t, e)
                            })
                        }
                    }), this.ghostTable.columns.length && (this.ghostTable.getWidths(function (e, t) {
                        return o.widths[e] = t
                    }), this.ghostTable.clean())
                }, calculateAllColumnsWidth: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : {from: 0, to: this.hot.countRows() - 1}, t = this,
                        n = 0, o = this.hot.countCols() - 1, r = null;
                    this.inProgress = !0;
                    var i = function () {
                        return t.hot ? (t.calculateColumnsWidth({
                            from: n,
                            to: Math.min(n + L.CALCULATION_STEP, o)
                        }, e), n = n + L.CALCULATION_STEP + 1, void (n < o ? r = _(i) : (C(r), t.inProgress = !1, t.hot.view.wt.wtOverlays.adjustElementsSize(!0), t.hot.view.wt.wtOverlays.leftOverlay.needFullRender && t.hot.view.wt.wtOverlays.leftOverlay.clone.draw()))) : (C(r), void (t.inProgress = !1))
                    };
                    this.firstCalculation && this.getSyncCalculationLimit() && (this.calculateColumnsWidth({
                        from: 0,
                        to: this.getSyncCalculationLimit()
                    }, e), this.firstCalculation = !1, n = this.getSyncCalculationLimit() + 1), n < o ? i() : this.inProgress = !1
                }, setSamplingOptions: function () {
                    var e = this.hot.getSettings().autoColumnSize,
                        t = e && e.hasOwnProperty("samplingRatio") ? this.hot.getSettings().autoColumnSize.samplingRatio : void 0,
                        n = e && e.hasOwnProperty("allowSampleDuplicates") ? this.hot.getSettings().autoColumnSize.allowSampleDuplicates : void 0;
                    t && !isNaN(t) && this.samplesGenerator.setSampleCount(parseInt(t, 10)), n && this.samplesGenerator.setAllowDuplicates(n)
                }, recalculateAllColumnsWidth: function () {
                    this.hot.view && R(this.hot.view.wt.wtTable.TABLE) && (this.clearCache(), this.calculateAllColumnsWidth())
                }, getSyncCalculationLimit: function () {
                    var e = L.SYNC_CALCULATION_LIMIT, t = this.hot.countCols() - 1;
                    return E(this.hot.getSettings().autoColumnSize) && (e = this.hot.getSettings().autoColumnSize.syncLimit, H(e) ? e = T(t, e) : e >>= 0), Math.min(e, t)
                }, getColumnWidth: function (e) {
                    var t = arguments[1], n = void 0 === arguments[2] || arguments[2], o = t;
                    return void 0 === o && (o = this.widths[e], n && "number" == typeof o && (o = Math.max(o, A.DEFAULT_WIDTH))), o
                }, getFirstVisibleColumn: function () {
                    var e = this.hot.view.wt;
                    return e.wtViewport.columnsVisibleCalculator ? e.wtTable.getFirstVisibleColumn() : e.wtViewport.columnsRenderCalculator ? e.wtTable.getFirstRenderedColumn() : -1
                }, getLastVisibleColumn: function () {
                    var e = this.hot.view.wt;
                    return e.wtViewport.columnsVisibleCalculator ? e.wtTable.getLastVisibleColumn() : e.wtViewport.columnsRenderCalculator ? e.wtTable.getLastRenderedColumn() : -1
                }, findColumnsWhereHeaderWasChanged: function () {
                    var e = this.hot.getColHeader(), t = P.get(this).cachedColumnHeaders, n = v(e, function (e, n, o) {
                        var r = t.length;
                        return (r - 1 < o || t[o] !== n) && e.push(o), r - 1 < o ? t.push(n) : t[o] = n, e
                    }, []);
                    return n
                }, clearCache: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : [], t = this;
                    e.length ? g(e, function (e) {
                        return t.widths[e] = void 0
                    }) : this.widths.length = 0
                }, isNeedRecalculate: function () {
                    return !!w(this.widths, function (e) {
                        return void 0 === e
                    }).length
                }, onBeforeRender: function () {
                    var e = this.hot.renderCall, t = this.hot.countRows();
                    t && (this.calculateColumnsWidth({
                        from: this.getFirstVisibleColumn(),
                        to: this.getLastVisibleColumn()
                    }, void 0, e), this.isNeedRecalculate() && !this.inProgress && this.calculateAllColumnsWidth())
                }, onAfterLoadData: function () {
                    var e = this;
                    this.hot.view ? this.recalculateAllColumnsWidth() : setTimeout(function () {
                        e.hot && e.recalculateAllColumnsWidth()
                    }, 0)
                }, onBeforeChange: function (e) {
                    var t = this, n = y(e, function (e) {
                        var n = e, o = (n[0], n[1]);
                        return t.hot.propToCol(o)
                    });
                    this.clearCache(n)
                }, onBeforeColumnResize: function (e, t, n) {
                    return n && (this.calculateColumnsWidth(e, void 0, !0), t = this.getColumnWidth(e, void 0, !1)), t
                }, onAfterInit: function () {
                    P.get(this).cachedColumnHeaders = this.hot.getColHeader()
                }, destroy: function () {
                    this.ghostTable.clean(), $traceurRuntime.superGet(this, L.prototype, "destroy").call(this)
                }
            }, {
                get CALCULATION_STEP() {
                    return 50
                }, get SYNC_CALCULATION_LIMIT() {
                    return 50
                }
            }, p), x("autoColumnSize", N)
        }, {
            "3rdparty/walkontable/src/calculator/viewportColumns": 4,
            _base: 62,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/feature": 49,
            "helpers/number": 52,
            "helpers/object": 53,
            "helpers/string": 55,
            plugins: 61,
            "utils/ghostTable": 128,
            "utils/samplesGenerator": 131
        }],
        64: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                AutoRowSize: {
                    get: function () {
                        return k
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f = (o = e("_base"), o && o.__esModule && o || {default: o}).default,
                p = (r = e("helpers/array"), r && r.__esModule && r || {default: r}), m = (p.arrayEach, p.arrayFilter),
                g = (i = e("helpers/feature"), i && i.__esModule && i || {default: i}), w = g.cancelAnimationFrame,
                v = g.requestAnimationFrame,
                y = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}).isVisible,
                b = (a = e("utils/ghostTable"), a && a.__esModule && a || {default: a}).GhostTable,
                C = (l = e("helpers/object"), l && l.__esModule && l || {default: l}), _ = C.isObject,
                R = (C.objectEach, u = e("helpers/number"), u && u.__esModule && u || {default: u}),
                M = R.valueAccordingPercent, S = R.rangeEach,
                E = (c = e("plugins"), c && c.__esModule && c || {default: c}).registerPlugin,
                O = (d = e("utils/samplesGenerator"), d && d.__esModule && d || {default: d}).SamplesGenerator,
                T = (h = e("helpers/string"), h && h.__esModule && h || {default: h}).isPercentValue, k = function (e) {
                    var t = this;
                    $traceurRuntime.superConstructor(x).call(this, e), this.heights = [], this.ghostTable = new b(this.hot), this.samplesGenerator = new O(function (e, n) {
                        return e >= 0 ? t.hot.getDataAtCell(e, n) : e === -1 ? t.hot.getColHeader(n) : null
                    }), this.firstCalculation = !0, this.inProgress = !1, this.addHook("beforeRowResize", function (e, n, o) {
                        return t.onBeforeRowResize(e, n, o)
                    })
                }, x = k;
            $traceurRuntime.createClass(k, {
                isEnabled: function () {
                    return this.hot.getSettings().autoRowSize === !0 || _(this.hot.getSettings().autoRowSize)
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.setSamplingOptions(), this.addHook("afterLoadData", function () {
                        return e.onAfterLoadData()
                    }), this.addHook("beforeChange", function (t) {
                        return e.onBeforeChange(t)
                    }), this.addHook("beforeColumnMove", function () {
                        return e.recalculateAllRowsHeight()
                    }), this.addHook("beforeColumnResize", function () {
                        return e.recalculateAllRowsHeight()
                    }), this.addHook("beforeColumnSort", function () {
                        return e.clearCache()
                    }), this.addHook("beforeRender", function (t) {
                        return e.onBeforeRender(t)
                    }), this.addHook("beforeRowMove", function (t, n) {
                        return e.onBeforeRowMove(t, n)
                    }), this.addHook("modifyRowHeight", function (t, n) {
                        return e.getRowHeight(n, t)
                    }), this.addHook("modifyColumnHeaderHeight", function () {
                        return e.getColumnHeaderHeight()
                    }), $traceurRuntime.superGet(this, x.prototype, "enablePlugin").call(this))
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, x.prototype, "disablePlugin").call(this)
                }, calculateRowsHeight: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : {from: 0, to: this.hot.countRows() - 1},
                        t = void 0 !== arguments[1] ? arguments[1] : {from: 0, to: this.hot.countCols() - 1},
                        n = void 0 !== arguments[2] && arguments[2], o = this;
                    if ("number" == typeof e && (e = {from: e, to: e}), "number" == typeof t && (t = {
                        from: t,
                        to: t
                    }), null !== this.hot.getColHeader(0)) {
                        var r = this.samplesGenerator.generateRowSamples(-1, t);
                        this.ghostTable.addColumnHeadersRow(r.get(-1))
                    }
                    S(e.from, e.to, function (e) {
                        if (n || void 0 === o.heights[e]) {
                            var r = o.samplesGenerator.generateRowSamples(e, t);
                            r.forEach(function (e, t) {
                                return o.ghostTable.addRow(t, e)
                            })
                        }
                    }), this.ghostTable.rows.length && (this.ghostTable.getHeights(function (e, t) {
                        return o.heights[e] = t
                    }), this.ghostTable.clean())
                }, calculateAllRowsHeight: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : {from: 0, to: this.hot.countCols() - 1}, t = this,
                        n = 0, o = this.hot.countRows() - 1, r = null;
                    this.inProgress = !0;
                    var i = function () {
                        return t.hot ? (t.calculateRowsHeight({
                            from: n,
                            to: Math.min(n + x.CALCULATION_STEP, o)
                        }, e), n = n + x.CALCULATION_STEP + 1, void (n < o ? r = v(i) : (w(r), t.inProgress = !1, t.hot.view.wt.wtOverlays.adjustElementsSize(!0), t.hot.view.wt.wtOverlays.leftOverlay.needFullRender && t.hot.view.wt.wtOverlays.leftOverlay.clone.draw()))) : (w(r), void (t.inProgress = !1))
                    };
                    this.firstCalculation && this.getSyncCalculationLimit() && (this.calculateRowsHeight({
                        from: 0,
                        to: this.getSyncCalculationLimit()
                    }, e), this.firstCalculation = !1, n = this.getSyncCalculationLimit() + 1), n < o ? i() : (this.inProgress = !1, this.hot.view.wt.wtOverlays.adjustElementsSize(!1))
                }, setSamplingOptions: function () {
                    var e = this.hot.getSettings().autoRowSize,
                        t = e && e.hasOwnProperty("samplingRatio") ? this.hot.getSettings().autoRowSize.samplingRatio : void 0,
                        n = e && e.hasOwnProperty("allowSampleDuplicates") ? this.hot.getSettings().autoRowSize.allowSampleDuplicates : void 0;
                    t && !isNaN(t) && this.samplesGenerator.setSampleCount(parseInt(t, 10)), n && this.samplesGenerator.setAllowDuplicates(n)
                }, recalculateAllRowsHeight: function () {
                    y(this.hot.view.wt.wtTable.TABLE) && (this.clearCache(), this.calculateAllRowsHeight());
                }, getSyncCalculationLimit: function () {
                    var e = x.SYNC_CALCULATION_LIMIT, t = this.hot.countRows() - 1;
                    return _(this.hot.getSettings().autoRowSize) && (e = this.hot.getSettings().autoRowSize.syncLimit, T(e) ? e = M(t, e) : e >>= 0), Math.min(e, t)
                }, getRowHeight: function (e) {
                    var t = arguments[1], n = t;
                    return void 0 !== this.heights[e] && this.heights[e] > (t || 0) && (n = this.heights[e]), n
                }, getColumnHeaderHeight: function () {
                    return this.heights[-1]
                }, getFirstVisibleRow: function () {
                    var e = this.hot.view.wt;
                    return e.wtViewport.rowsVisibleCalculator ? e.wtTable.getFirstVisibleRow() : e.wtViewport.rowsRenderCalculator ? e.wtTable.getFirstRenderedRow() : -1
                }, getLastVisibleRow: function () {
                    var e = this.hot.view.wt;
                    return e.wtViewport.rowsVisibleCalculator ? e.wtTable.getLastVisibleRow() : e.wtViewport.rowsRenderCalculator ? e.wtTable.getLastRenderedRow() : -1
                }, clearCache: function () {
                    this.heights.length = 0, this.heights[-1] = void 0
                }, clearCacheByRange: function (e) {
                    var t = this;
                    "number" == typeof e && (e = {
                        from: e,
                        to: e
                    }), S(Math.min(e.from, e.to), Math.max(e.from, e.to), function (e) {
                        return t.heights[e] = void 0
                    })
                }, isNeedRecalculate: function () {
                    return !!m(this.heights, function (e) {
                        return void 0 === e
                    }).length
                }, onBeforeRender: function () {
                    var e = this.hot.renderCall;
                    this.calculateRowsHeight({
                        from: this.getFirstVisibleRow(),
                        to: this.getLastVisibleRow()
                    }, void 0, e);
                    var t = this.hot.getSettings().fixedRowsBottom;
                    if (t) {
                        var n = this.hot.countRows() - 1;
                        this.calculateRowsHeight({from: n - t, to: n})
                    }
                    this.isNeedRecalculate() && !this.inProgress && this.calculateAllRowsHeight()
                }, onBeforeRowMove: function (e, t) {
                    this.clearCacheByRange({from: e, to: t}), this.calculateAllRowsHeight()
                }, onBeforeRowResize: function (e, t, n) {
                    return n && (this.calculateRowsHeight(e, void 0, !0), t = this.getRowHeight(e)), t
                }, onAfterLoadData: function () {
                    var e = this;
                    this.hot.view ? this.recalculateAllRowsHeight() : setTimeout(function () {
                        e.hot && e.recalculateAllRowsHeight()
                    }, 0)
                }, onBeforeChange: function (e) {
                    var t = null;
                    1 === e.length ? t = e[0][0] : e.length > 1 && (t = {
                        from: e[0][0],
                        to: e[e.length - 1][0]
                    }), null !== t && this.clearCacheByRange(t)
                }, destroy: function () {
                    this.ghostTable.clean(), $traceurRuntime.superGet(this, x.prototype, "destroy").call(this)
                }
            }, {
                get CALCULATION_STEP() {
                    return 50
                }, get SYNC_CALCULATION_LIMIT() {
                    return 500
                }
            }, f), E("autoRowSize", k)
        }, {
            _base: 62,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/feature": 49,
            "helpers/number": 52,
            "helpers/object": 53,
            "helpers/string": 55,
            plugins: 61,
            "utils/ghostTable": 128,
            "utils/samplesGenerator": 131
        }],
        65: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                Autofill: {
                    get: function () {
                        return T
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d = (o = e("_base"), o && o.__esModule && o || {default: o}).default,
                h = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                f = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayIncludes,
                p = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}), m = p.offset,
                g = p.outerHeight, w = p.outerWidth,
                v = (a = e("eventManager"), a && a.__esModule && a || {default: a}).eventManager,
                y = (l = e("plugins"), l && l.__esModule && l || {default: l}).registerPlugin,
                b = (u = e("3rdparty/walkontable/src/cell/coords"), u && u.__esModule && u || {default: u}).WalkontableCellCoords,
                C = (c = e("utils"), c && c.__esModule && c || {default: c}), _ = C.getDeltas,
                R = C.getDragDirectionAndRange, M = C.DIRECTIONS, S = C.getMappedFillHandleSetting, E = "insert_row",
                O = 200, T = function (e) {
                    $traceurRuntime.superConstructor(k).call(this, e), this.eventManager = v(this), this.addingStarted = !1, this.mouseDownOnCellCorner = !1, this.mouseDragOutside = !1, this.handleDraggedCells = 0, this.directions = [], this.autoInsertRow = !1
                }, k = T;
            $traceurRuntime.createClass(T, {
                isEnabled: function () {
                    return this.hot.getSettings().fillHandle
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.mapSettings(), this.registerEvents(), this.addHook("afterOnCellCornerMouseDown", function (t) {
                        return e.onAfterCellCornerMouseDown(t)
                    }), this.addHook("afterOnCellCornerDblClick", function (t) {
                        return e.onCellCornerDblClick(t)
                    }), this.addHook("beforeOnCellMouseOver", function (t, n, o) {
                        return e.onBeforeCellMouseOver(n)
                    }), $traceurRuntime.superGet(this, k.prototype, "enablePlugin").call(this))
                }, updatePlugin: function () {
                    this.disablePlugin(), this.enablePlugin(), $traceurRuntime.superGet(this, k.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    this.clearMappedSettings(), $traceurRuntime.superGet(this, k.prototype, "disablePlugin").call(this)
                }, getSelectionData: function () {
                    var e = {from: this.hot.getSelectedRange().from, to: this.hot.getSelectedRange().to};
                    return this.hot.getData(e.from.row, e.from.col, e.to.row, e.to.col)
                }, fillIn: function () {
                    if (this.hot.view.wt.selections.fill.isEmpty()) return !1;
                    var e = this.hot.view.wt.selections.fill.getCorners();
                    this.resetSelectionOfDraggedArea();
                    var t = this.getCornersOfSelectedCells(), n = R(t, e), o = n.directionOfDrag,
                        r = n.startOfDragCoords, i = n.endOfDragCoords;
                    if (this.hot.runHooks("modifyAutofillRange", t, e), r && r.row > -1 && r.col > -1) {
                        var s = this.getSelectionData(), a = _(r, i, s, o);
                        this.hot.runHooks("beforeAutofill", r, i, s), this.hot.populateFromArray(r.row, r.col, s, i.row, i.col, this.pluginName + ".fill", null, o, a), this.setSelection(e)
                    } else this.hot.selection.refreshBorders();
                    return !0
                }, reduceSelectionAreaIfNeeded: function (e) {
                    return e.row < 0 && (e.row = 0), e.col < 0 && (e.col = 0), e
                }, getCoordsOfDragAndDropBorders: function (e) {
                    var t, n = this.hot.getSelectedRange().getTopLeftCorner(),
                        o = this.hot.getSelectedRange().getBottomRightCorner();
                    if (f(this.directions, M.vertical) && (o.row < e.row || n.row > e.row)) t = new b(e.row, o.col); else {
                        if (!f(this.directions, M.horizontal)) return;
                        t = new b(o.row, e.col)
                    }
                    return this.reduceSelectionAreaIfNeeded(t)
                }, showBorder: function (e) {
                    var t = this.getCoordsOfDragAndDropBorders(e);
                    t && this.redrawBorders(t)
                }, addRow: function () {
                    var e = this;
                    this.hot._registerTimeout(setTimeout(function () {
                        e.hot.alter(E, void 0, 1, e.pluginName + ".fill"), e.addingStarted = !1
                    }, O))
                }, addNewRowIfNeeded: function () {
                    if (this.hot.view.wt.selections.fill.cellRange && this.addingStarted === !1 && this.autoInsertRow) {
                        var e = this.hot.getSelected(), t = this.hot.view.wt.selections.fill.getCorners(),
                            n = this.hot.countRows();
                        e[2] < n - 1 && t[2] === n - 1 && (this.addingStarted = !0, this.addRow())
                    }
                }, getCornersOfSelectedCells: function () {
                    return this.hot.selection.isMultiple() ? this.hot.view.wt.selections.area.getCorners() : this.hot.view.wt.selections.current.getCorners()
                }, getIndexOfLastAdjacentFilledInRow: function (e) {
                    for (var t, n = this.hot.getData(), o = this.hot.countRows(), r = e[2] + 1; r < o; r++) {
                        for (var i = e[1]; i <= e[3]; i++) {
                            var s = n[r][i];
                            if (s) return -1
                        }
                        var a = n[r][e[1] - 1], l = n[r][e[3] + 1];
                        (a || l) && (t = r)
                    }
                    return t
                }, addSelectionFromStartAreaToSpecificRowIndex: function (e, t) {
                    this.hot.view.wt.selections.fill.clear(), this.hot.view.wt.selections.fill.add(new b(e[0], e[1])), this.hot.view.wt.selections.fill.add(new b(t, e[3]))
                }, setSelection: function (e) {
                    this.hot.selection.setRangeStart(new b(e[0], e[1])), this.hot.selection.setRangeEnd(new b(e[2], e[3]))
                }, selectAdjacent: function () {
                    var e = this.getCornersOfSelectedCells(), t = this.getIndexOfLastAdjacentFilledInRow(e);
                    return t !== -1 && (this.addSelectionFromStartAreaToSpecificRowIndex(e, t), !0)
                }, resetSelectionOfDraggedArea: function () {
                    this.handleDraggedCells = 0, this.hot.view.wt.selections.fill.clear()
                }, redrawBorders: function (e) {
                    this.hot.view.wt.selections.fill.clear(), this.hot.view.wt.selections.fill.add(this.hot.getSelectedRange().from), this.hot.view.wt.selections.fill.add(this.hot.getSelectedRange().to), this.hot.view.wt.selections.fill.add(e), this.hot.view.render()
                }, getIfMouseWasDraggedOutside: function (e) {
                    var t = m(this.hot.table).top - (window.pageYOffset || document.documentElement.scrollTop) + g(this.hot.table),
                        n = m(this.hot.table).left - (window.pageXOffset || document.documentElement.scrollLeft) + w(this.hot.table);
                    return e.clientY > t && e.clientX <= n
                }, registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(document.documentElement, "mouseup", function () {
                        return e.onMouseUp()
                    }), this.eventManager.addEventListener(document.documentElement, "mousemove", function (t) {
                        return e.onMouseMove(t)
                    })
                }, onCellCornerDblClick: function () {
                    var e = this.selectAdjacent();
                    e && this.fillIn()
                }, onAfterCellCornerMouseDown: function () {
                    this.handleDraggedCells = 1, this.mouseDownOnCellCorner = !0
                }, onBeforeCellMouseOver: function (e) {
                    this.mouseDownOnCellCorner && !this.hot.view.isMouseDown() && this.handleDraggedCells && (this.handleDraggedCells++, this.showBorder(e), this.addNewRowIfNeeded())
                }, onMouseUp: function () {
                    this.handleDraggedCells && (this.handleDraggedCells > 1 && this.fillIn(), this.handleDraggedCells = 0, this.mouseDownOnCellCorner = !1)
                }, onMouseMove: function (e) {
                    var t = this.getIfMouseWasDraggedOutside(e);
                    this.addingStarted === !1 && this.handleDraggedCells > 0 && t ? (this.mouseDragOutside = !0, this.addingStarted = !0) : this.mouseDragOutside = !1, this.mouseDragOutside && this.autoInsertRow && this.addRow()
                }, clearMappedSettings: function () {
                    this.directions.length = 0, this.autoInsertRow = !1
                }, mapSettings: function () {
                    var e = S(this.hot.getSettings().fillHandle);
                    this.directions = e.directions, this.autoInsertRow = e.autoInsertRow
                }, destroy: function () {
                    $traceurRuntime.superGet(this, k.prototype, "destroy").call(this)
                }
            }, {}, d), y("autofill", T), h.hooks.register("modifyAutofillRange"), h.hooks.register("beforeAutofill")
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            _base: 62,
            browser: 24,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            plugins: 61,
            utils: 66
        }],
        66: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o) {
                var r = n.length, i = n ? n[0].length : 0, s = [], a = t.row - e.row, l = t.col - e.col;
                if (["down", "up"].indexOf(o) !== -1) {
                    for (var u = [], c = 0; c <= l; c++) {
                        var d = parseInt(n[0][c], 10), h = parseInt(n[r - 1][c], 10),
                            f = ("down" === o ? h - d : d - h) / (r - 1) || 0;
                        u.push(f)
                    }
                    s.push(u)
                }
                if (["right", "left"].indexOf(o) !== -1) for (var p = 0; p <= a; p++) {
                    var m = parseInt(n[p][0], 10), g = parseInt(n[p][i - 1], 10),
                        w = ("right" === o ? g - m : m - g) / (i - 1) || 0;
                    s.push([w])
                }
                return s
            }

            function r(e, t) {
                var n, o, r;
                return t[0] === e[0] && t[1] < e[1] ? (r = "left", n = new WalkontableCellCoords(t[0], t[1]), o = new WalkontableCellCoords(t[2], e[1] - 1)) : t[0] === e[0] && t[3] > e[3] ? (r = "right", n = new WalkontableCellCoords(t[0], e[3] + 1), o = new WalkontableCellCoords(t[2], t[3])) : t[0] < e[0] && t[1] === e[1] ? (r = "up", n = new WalkontableCellCoords(t[0], t[1]), o = new WalkontableCellCoords(e[0] - 1, t[3])) : t[2] > e[2] && t[1] === e[1] && (r = "down", n = new WalkontableCellCoords(e[2] + 1, t[1]), o = new WalkontableCellCoords(t[2], t[3])), {
                    directionOfDrag: r,
                    startOfDragCoords: n,
                    endOfDragCoords: o
                }
            }

            function i(e) {
                var t = {};
                return e === !0 ? (t.directions = Object.keys(c), t.autoInsertRow = !0) : l(e) ? (u(e.autoInsertRow) ? e.direction === c.horizontal ? t.autoInsertRow = !1 : t.autoInsertRow = e.autoInsertRow : t.autoInsertRow = !1, u(e.direction) ? t.directions = [e.direction] : t.directions = Object.keys(c)) : "string" == typeof e ? (t.directions = [e], t.autoInsertRow = !0) : (t.directions = [], t.autoInsertRow = !1), t
            }

            Object.defineProperties(n, {
                DIRECTIONS: {
                    get: function () {
                        return c
                    }
                }, getDeltas: {
                    get: function () {
                        return o
                    }
                }, getDragDirectionAndRange: {
                    get: function () {
                        return r
                    }
                }, getMappedFillHandleSetting: {
                    get: function () {
                        return i
                    }
                }, __esModule: {value: !0}
            });
            var s, a, l = (s = e("helpers/object"), s && s.__esModule && s || {default: s}).isObject,
                u = (a = e("helpers/mixed"), a && a.__esModule && a || {default: a}).isDefined,
                c = {horizontal: "horizontal", vertical: "vertical"}
        }, {"helpers/mixed": 51, "helpers/object": 53}],
        67: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ColumnSorting: {
                    get: function () {
                        return M
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                h = (r = e("moment"), r && r.__esModule && r || {default: r}).default,
                f = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), p = f.addClass,
                m = f.hasClass, g = f.removeClass, w = (s = e("helpers/array"), s && s.__esModule && s || {default: s}),
                v = w.arrayMap, y = w.arrayReduce,
                b = (a = e("helpers/mixed"), a && a.__esModule && a || {default: a}).isEmpty,
                C = (l = e("_base"), l && l.__esModule && l || {default: l}).default,
                _ = (u = e("plugins"), u && u.__esModule && u || {default: u}).registerPlugin,
                R = (c = e("utils/sortingAlgorithms/mergeSort"), c && c.__esModule && c || {default: c}).mergeSort;
            d.hooks.register("beforeColumnSort"), d.hooks.register("afterColumnSort");
            var M = function (e) {
                $traceurRuntime.superConstructor(S).call(this, e), this.sortIndicators = [], this.lastSortedColumn = null, this.sortEmptyCells = !1
            }, S = M;
            $traceurRuntime.createClass(M, {
                isEnabled: function () {
                    return !!this.hot.getSettings().columnSorting
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        this.setPluginOptions();
                        var t = this;
                        this.hot.sortIndex = [], this.hot.sort = function () {
                            var e = Array.prototype.slice.call(arguments);
                            return t.sortByColumn.apply(t, e)
                        }, "undefined" == typeof this.hot.getSettings().observeChanges && this.enableObserveChangesPlugin(), this.addHook("afterTrimRow", function (t) {
                            return e.sort()
                        }), this.addHook("afterUntrimRow", function (t) {
                            return e.sort()
                        }), this.addHook("modifyRow", function (t) {
                            return e.translateRow(t)
                        }), this.addHook("unmodifyRow", function (t) {
                            return e.untranslateRow(t)
                        }), this.addHook("afterUpdateSettings", function () {
                            return e.onAfterUpdateSettings()
                        }), this.addHook("afterGetColHeader", function (t, n) {
                            return e.getColHeader(t, n)
                        }), this.addHook("afterOnCellMouseDown", function (t, n) {
                            return e.onAfterOnCellMouseDown(t, n)
                        }), this.addHook("afterCreateRow", function () {
                            t.afterCreateRow.apply(t, arguments)
                        }), this.addHook("afterRemoveRow", function () {
                            t.afterRemoveRow.apply(t, arguments)
                        }), this.addHook("afterInit", function () {
                            return e.sortBySettings()
                        }), this.addHook("afterLoadData", function () {
                            e.hot.sortIndex = [], e.hot.view && e.sortBySettings()
                        }), this.hot.view && this.sortBySettings(), $traceurRuntime.superGet(this, S.prototype, "enablePlugin").call(this)
                    }
                }, disablePlugin: function () {
                    this.hot.sort = void 0, $traceurRuntime.superGet(this, S.prototype, "disablePlugin").call(this)
                }, onAfterUpdateSettings: function () {
                    this.sortBySettings()
                }, sortBySettings: function () {
                    var e, t, n = this.hot.getSettings().columnSorting, o = this.loadSortingState();
                    "undefined" == typeof o ? (e = n.column, t = n.sortOrder) : (e = o.sortColumn, t = o.sortOrder), "number" == typeof e && (this.lastSortedColumn = e, this.sortByColumn(e, t))
                }, setSortingColumn: function (e, t) {
                    return "undefined" == typeof e ? (this.hot.sortColumn = void 0, void (this.hot.sortOrder = void 0)) : (this.hot.sortColumn === e && "undefined" == typeof t ? this.hot.sortOrder === !1 ? this.hot.sortOrder = void 0 : this.hot.sortOrder = !this.hot.sortOrder : this.hot.sortOrder = "undefined" == typeof t || t, void (this.hot.sortColumn = e))
                }, sortByColumn: function (e, t) {
                    if (this.setSortingColumn(e, t), "undefined" != typeof this.hot.sortColumn) {
                        var n = d.hooks.run(this.hot, "beforeColumnSort", this.hot.sortColumn, this.hot.sortOrder);
                        n !== !1 && this.sort(), this.updateOrderClass(), this.updateSortIndicator(), d.hooks.run(this.hot, "afterColumnSort", this.hot.sortColumn, this.hot.sortOrder), this.hot.render(), this.saveSortingState()
                    }
                }, saveSortingState: function () {
                    var e = {};
                    "undefined" != typeof this.hot.sortColumn && (e.sortColumn = this.hot.sortColumn), "undefined" != typeof this.hot.sortOrder && (e.sortOrder = this.hot.sortOrder), (e.hasOwnProperty("sortColumn") || e.hasOwnProperty("sortOrder")) && d.hooks.run(this.hot, "persistentStateSave", "columnSorting", e)
                }, loadSortingState: function () {
                    var e = {};
                    return d.hooks.run(this.hot, "persistentStateLoad", "columnSorting", e), e.value
                }, updateOrderClass: function () {
                    var e;
                    this.hot.sortOrder === !0 ? e = "ascending" : this.hot.sortOrder === !1 && (e = "descending"), this.sortOrderClass = e
                }, enableObserveChangesPlugin: function () {
                    var e = this;
                    this.hot._registerTimeout(setTimeout(function () {
                        e.hot.updateSettings({observeChanges: !0})
                    }, 0))
                }, defaultSort: function (e, t) {
                    return function (n, o) {
                        return "string" == typeof n[1] && (n[1] = n[1].toLowerCase()), "string" == typeof o[1] && (o[1] = o[1].toLowerCase()), n[1] === o[1] ? 0 : b(n[1]) ? b(o[1]) ? 0 : t.columnSorting.sortEmptyCells && e ? -1 : 1 : b(o[1]) ? b(n[1]) ? 0 : t.columnSorting.sortEmptyCells && e ? 1 : -1 : isNaN(n[1]) && !isNaN(o[1]) ? e ? 1 : -1 : !isNaN(n[1]) && isNaN(o[1]) ? e ? -1 : 1 : (isNaN(n[1]) || isNaN(o[1]) || (n[1] = parseFloat(n[1]), o[1] = parseFloat(o[1])), n[1] < o[1] ? e ? -1 : 1 : n[1] > o[1] ? e ? 1 : -1 : 0)
                    }
                }, dateSort: function (e, t) {
                    return function (n, o) {
                        if (n[1] === o[1]) return 0;
                        if (b(n[1])) return b(o[1]) ? 0 : t.columnSorting.sortEmptyCells && e ? -1 : 1;
                        if (b(o[1])) return b(n[1]) ? 0 : t.columnSorting.sortEmptyCells && e ? 1 : -1;
                        var r = h(n[1], t.dateFormat), i = h(o[1], t.dateFormat);
                        return r.isValid() ? i.isValid() ? i.isAfter(r) ? e ? -1 : 1 : i.isBefore(r) ? e ? 1 : -1 : 0 : -1 : 1
                    }
                }, numericSort: function (e, t) {
                    return function (n, o) {
                        var r = parseFloat(n[1]), i = parseFloat(o[1]);
                        if (r === i || isNaN(r) && isNaN(i)) return 0;
                        if (t.columnSorting.sortEmptyCells) {
                            if (b(n[1])) return e ? -1 : 1;
                            if (b(o[1])) return e ? 1 : -1
                        }
                        return isNaN(r) ? 1 : isNaN(i) ? -1 : r < i ? e ? -1 : 1 : r > i ? e ? 1 : -1 : 0
                    }
                }, sort: function () {
                    if ("undefined" == typeof this.hot.sortOrder) return void (this.hot.sortIndex.length = 0);
                    var e, t, n = this.hot.getCellMeta(0, this.hot.sortColumn), o = this.hot.countEmptyRows();
                    this.hot.sortingEnabled = !1, this.hot.sortIndex.length = 0, "undefined" == typeof n.columnSorting.sortEmptyCells && (n.columnSorting = {sortEmptyCells: this.sortEmptyCells}), t = this.hot.getSettings().maxRows === Number.POSITIVE_INFINITY ? this.hot.countRows() - this.hot.getSettings().minSpareRows : this.hot.countRows() - o;
                    for (var r = 0, i = t; r < i; r++) this.hot.sortIndex.push([r, this.hot.getDataAtCell(r, this.hot.sortColumn)]);
                    if (n.sortFunction) e = n.sortFunction; else switch (n.type) {
                        case"date":
                            e = this.dateSort;
                            break;
                        case"numeric":
                            e = this.numericSort;
                            break;
                        default:
                            e = this.defaultSort
                    }
                    R(this.hot.sortIndex, e(this.hot.sortOrder, n));
                    for (var s = this.hot.sortIndex.length; s < this.hot.countRows(); s++) this.hot.sortIndex.push([s, this.hot.getDataAtCell(s, this.hot.sortColumn)]);
                    this.hot.sortingEnabled = !0
                }, updateSortIndicator: function () {
                    if ("undefined" != typeof this.hot.sortOrder) {
                        var e = this.hot.getCellMeta(0, this.hot.sortColumn);
                        this.sortIndicators[this.hot.sortColumn] = e.sortIndicator
                    }
                }, translateRow: function (e) {
                    return this.hot.sortingEnabled && "undefined" != typeof this.hot.sortOrder && this.hot.sortIndex && this.hot.sortIndex.length && this.hot.sortIndex[e] ? this.hot.sortIndex[e][0] : e
                }, untranslateRow: function (e) {
                    if (this.hot.sortingEnabled && this.hot.sortIndex && this.hot.sortIndex.length) for (var t = 0; t < this.hot.sortIndex.length; t++) if (this.hot.sortIndex[t][0] == e) return t
                }, getColHeader: function (e, t) {
                    if (e < 0 || !t.parentNode) return !1;
                    var n = t.querySelector(".colHeader"),
                        o = (t.getAttribute("colspan"), t.parentNode.parentNode.childNodes),
                        r = Array.prototype.indexOf.call(o, t.parentNode);
                    r -= o.length, n && (this.hot.getSettings().columnSorting && e >= 0 && r === -1 && p(n, "columnSorting"), g(n, "descending"), g(n, "ascending"), this.sortIndicators[e] && e === this.hot.sortColumn && ("ascending" === this.sortOrderClass ? p(n, "ascending") : "descending" === this.sortOrderClass && p(n, "descending")))
                }, isSorted: function () {
                    return "undefined" != typeof this.hot.sortColumn
                }, afterCreateRow: function (e, t) {
                    if (this.isSorted()) {
                        for (var n = 0; n < this.hot.sortIndex.length; n++) this.hot.sortIndex[n][0] >= e && (this.hot.sortIndex[n][0] += t);
                        for (var n = 0; n < t; n++) this.hot.sortIndex.splice(e + n, 0, [e + n, this.hot.getSourceData()[e + n][this.hot.sortColumn + this.hot.colOffset()]]);
                        this.saveSortingState()
                    }
                }, afterRemoveRow: function (e, t) {
                    function n(e) {
                        return y(o, function (t, n) {
                            return e > n && t++, t
                        }, 0)
                    }

                    if (this.isSorted()) {
                        var o = this.hot.sortIndex.splice(e, t);
                        o = v(o, function (e) {
                            return e[0]
                        }), this.hot.sortIndex = v(this.hot.sortIndex, function (e, t) {
                            var o = n(e[0]);
                            return o && (e[0] -= o), e
                        }), this.saveSortingState()
                    }
                }, setPluginOptions: function () {
                    var e = this.hot.getSettings().columnSorting;
                    "object" == typeof e ? this.sortEmptyCells = e.sortEmptyCells || !1 : this.sortEmptyCells = !1
                }, onAfterOnCellMouseDown: function (e, t) {
                    t.row > -1 || m(e.realTarget, "columnSorting") && (t.col !== this.lastSortedColumn && (this.hot.sortOrder = !0), this.lastSortedColumn = t.col, this.sortByColumn(t.col))
                }
            }, {}, C), _("columnSorting", M)
        }, {
            _base: 62,
            browser: 24,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/mixed": 51,
            moment: "moment",
            plugins: 61,
            "utils/sortingAlgorithms/mergeSort": 132
        }],
        68: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                CommentEditor: {
                    get: function () {
                        return i
                    }
                }, __esModule: {value: !0}
            });
            var o, r = (o = e("helpers/dom/element"), o && o.__esModule && o || {default: o}).addClass,
                i = function () {
                    this.editor = this.createEditor(), this.editorStyle = this.editor.style, this.hidden = !0, this.hide()
                }, s = i;
            $traceurRuntime.createClass(i, {
                setPosition: function (e, t) {
                    this.editorStyle.left = e + "px", this.editorStyle.top = t + "px"
                }, setSize: function (e, t) {
                    if (e && t) {
                        var n = this.getInputElement();
                        n.style.width = e + "px", n.style.height = t + "px"
                    }
                }, resetSize: function () {
                    var e = this.getInputElement();
                    e.style.width = "", e.style.height = ""
                }, setReadOnlyState: function (e) {
                    var t = this.getInputElement();
                    t.readOnly = e
                }, show: function () {
                    this.editorStyle.display = "block", this.hidden = !1
                }, hide: function () {
                    this.editorStyle.display = "none", this.hidden = !0
                }, isVisible: function () {
                    return "block" === this.editorStyle.display
                }, setValue: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : "";
                    e = e || "", this.getInputElement().value = e
                }, getValue: function () {
                    return this.getInputElement().value
                }, isFocused: function () {
                    return document.activeElement === this.getInputElement()
                }, focus: function () {
                    this.getInputElement().focus()
                }, createEditor: function () {
                    var e, t, n = document.querySelector("." + s.CLASS_EDITOR_CONTAINER);
                    return n || (n = document.createElement("div"), r(n, s.CLASS_EDITOR_CONTAINER), document.body.appendChild(n)), e = document.createElement("div"), r(e, s.CLASS_EDITOR), t = document.createElement("textarea"), r(t, s.CLASS_INPUT), e.appendChild(t), n.appendChild(e), e
                }, getInputElement: function () {
                    return this.editor.querySelector("." + s.CLASS_INPUT)
                }, destroy: function () {
                    this.editor.parentNode.removeChild(this.editor), this.editor = null, this.editorStyle = null
                }
            }, {
                get CLASS_EDITOR_CONTAINER() {
                    return "htCommentsContainer"
                }, get CLASS_EDITOR() {
                    return "htComments"
                }, get CLASS_INPUT() {
                    return "htCommentTextArea"
                }, get CLASS_CELL() {
                    return "htCommentCell"
                }
            })
        }, {"helpers/dom/element": 47}],
        69: [function (e, t, n) {
            "use strict";
            var o;
            Object.defineProperties(n, {
                Comments: {
                    get: function () {
                        return B
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c, d, h, f, p = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                m = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), g = m.addClass,
                w = m.closest, v = m.isChildOf, y = m.hasClass, b = m.offset, C = m.outerWidth, _ = m.outerHeight,
                R = m.getScrollableElement, M = (s = e("helpers/object"), s && s.__esModule && s || {default: s}),
                S = M.deepClone, E = M.deepExtend,
                O = (a = e("helpers/function"), a && a.__esModule && a || {default: a}).debounce,
                T = (l = e("eventManager"), l && l.__esModule && l || {default: l}).EventManager,
                k = (u = e("3rdparty/walkontable/src/cell/coords"), u && u.__esModule && u || {default: u}).WalkontableCellCoords,
                x = (c = e("plugins"), c && c.__esModule && c || {default: c}).registerPlugin,
                D = (d = e("_base"), d && d.__esModule && d || {default: d}).default,
                H = (h = e("commentEditor"), h && h.__esModule && h || {default: h}).CommentEditor,
                A = (f = e("contextMenu/utils"), f && f.__esModule && f || {default: f}),
                P = A.checkSelectionConsistency, N = A.markLabelAsSelected, L = new WeakMap, I = "comment", W = "value",
                j = "style", V = "readOnly", B = function (e) {
                    $traceurRuntime.superConstructor(F).call(this, e), this.editor = null, this.eventManager = null, this.range = {}, this.mouseDown = !1, this.contextMenuEvent = !1, this.timer = null, this.displayDelay = 250, L.set(this, {
                        tempEditorDimensions: {},
                        cellBelowCursor: null
                    })
                }, F = B;
            $traceurRuntime.createClass(B, (o = {}, Object.defineProperty(o, "isEnabled", {
                value: function () {
                    return !!this.hot.getSettings().comments
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "enablePlugin", {
                value: function () {
                    var e = this;
                    this.enabled || (this.editor || (this.editor = new H), this.eventManager || (this.eventManager = new T(this)), this.addHook("afterContextMenuDefaultOptions", function (t) {
                        return e.addToContextMenu(t)
                    }), this.addHook("afterRenderer", function (t, n, o, r, i, s) {
                        return e.onAfterRenderer(t, s)
                    }), this.addHook("afterScrollHorizontally", function () {
                        return e.hide()
                    }), this.addHook("afterScrollVertically", function () {
                        return e.hide()
                    }), this.addHook("afterBeginEditing", function (t) {
                        return e.onAfterBeginEditing(t)
                    }), this.registerListeners(), $traceurRuntime.superGet(this, F.prototype, "enablePlugin").call(this))
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "disablePlugin", {
                value: function () {
                    $traceurRuntime.superGet(this, F.prototype, "disablePlugin").call(this)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "registerListeners", {
                value: function () {
                    var e = this;
                    this.eventManager.addEventListener(document, "mouseover", function (t) {
                        return e.onMouseOver(t)
                    }), this.eventManager.addEventListener(document, "mousedown", function (t) {
                        return e.onMouseDown(t)
                    }), this.eventManager.addEventListener(document, "mouseup", function (t) {
                        return e.onMouseUp(t)
                    }), this.eventManager.addEventListener(this.editor.getInputElement(), "blur", function (t) {
                        return e.onEditorBlur(t)
                    }), this.eventManager.addEventListener(this.editor.getInputElement(), "mousedown", function (t) {
                        return e.onEditorMouseDown(t)
                    }), this.eventManager.addEventListener(this.editor.getInputElement(), "mouseup", function (t) {
                        return e.onEditorMouseUp(t)
                    })
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "setRange", {
                value: function (e) {
                    this.range = e
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "clearRange", {
                value: function () {
                    this.range = {}
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "targetIsCellWithComment", {
                value: function (e) {
                    var t = w(e.target, "TD", "TBODY");
                    return !!(t && y(t, "htCommentCell") && w(t, [this.hot.rootElement]))
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "targetIsCommentTextArea", {
                value: function (e) {
                    return this.editor.getInputElement() === e.target
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "setComment", {
                value: function (e) {
                    var t;
                    if (!this.range.from) throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
                    var n = this.editor.getValue(), o = "";
                    null != e ? o = e : null != n && (o = n);
                    var r = this.range.from.row, i = this.range.from.col;
                    this.updateCommentMeta(r, i, (t = {}, Object.defineProperty(t, W, {
                        value: o,
                        configurable: !0,
                        enumerable: !0,
                        writable: !0
                    }), t)), this.hot.render()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "setCommentAtCell", {
                value: function (e, t, n) {
                    this.setRange({from: new k(e, t)}), this.setComment(n)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "removeComment", {
                value: function () {
                    var e = void 0 === arguments[0] || arguments[0];
                    if (!this.range.from) throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
                    this.hot.setCellMeta(this.range.from.row, this.range.from.col, I, void 0), e && this.hot.render(), this.hide()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "removeCommentAtCell", {
                value: function (e, t) {
                    var n = void 0 === arguments[2] || arguments[2];
                    this.setRange({from: new k(e, t)}), this.removeComment(n)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "getComment", {
                value: function () {
                    var e = this.range.from.row, t = this.range.from.col;
                    return this.getCommentMeta(e, t, W)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "getCommentAtCell", {
                value: function (e, t) {
                    return this.getCommentMeta(e, t, W)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "show", {
                value: function () {
                    if (!this.range.from) throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
                    var e = this.hot.getCellMeta(this.range.from.row, this.range.from.col);
                    return this.refreshEditor(!0), this.editor.setValue(e[I] ? e[I][W] : ""), this.editor.hidden && this.editor.show(), !0
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "showAtCell", {
                value: function (e, t) {
                    return this.setRange({from: new k(e, t)}), this.show()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "hide", {
                value: function () {
                    this.editor.hidden || this.editor.hide()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "refreshEditor", {
                value: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    if (e || this.range.from && this.editor.isVisible()) {
                        var t = R(this.hot.view.wt.wtTable.TABLE),
                            n = this.hot.view.wt.wtTable.getCell(this.range.from), o = this.range.from.row,
                            r = this.range.from.col, i = b(n), s = this.hot.view.wt.wtTable.getStretchedColumnWidth(r),
                            a = i.top < 0 ? 0 : i.top, l = i.left;
                        this.hot.view.wt.wtViewport.hasVerticalScroll() && t !== window && (a -= this.hot.view.wt.wtOverlays.topOverlay.getScrollPosition()), this.hot.view.wt.wtViewport.hasHorizontalScroll() && t !== window && (l -= this.hot.view.wt.wtOverlays.leftOverlay.getScrollPosition());
                        var u = l + s, c = a, d = this.getCommentMeta(o, r, j), h = this.getCommentMeta(o, r, V);
                        d ? this.editor.setSize(d.width, d.height) : this.editor.resetSize(), this.editor.setReadOnlyState(h), this.editor.setPosition(u, c)
                    }
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "checkSelectionCommentsConsistency", {
                value: function () {
                    var e = this.hot.getSelectedRange();
                    if (!e) return !1;
                    var t = !1, n = e.from;
                    return this.getCommentMeta(n.row, n.col, W) && (t = !0), t
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "updateCommentMeta", {
                value: function (e, t, n) {
                    var o, r = this.hot.getCellMeta(e, t)[I];
                    r ? (o = S(r), E(o, n)) : o = n, this.hot.setCellMeta(e, t, I, o)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "getCommentMeta", {
                value: function (e, t, n) {
                    var o = this.hot.getCellMeta(e, t);
                    if (o[I]) return o[I][n]
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onMouseDown", {
                value: function (e) {
                    if (this.mouseDown = !0, this.hot.view && this.hot.view.wt) {
                        if (!this.contextMenuEvent && !this.targetIsCommentTextArea(e)) {
                            var t = w(e.target, "TD", "TBODY"), n = null;
                            t && (n = this.hot.view.wt.wtTable.getCoords(t)), (!t || this.range.from && n && (this.range.from.row !== n.row || this.range.from.col !== n.col)) && this.hide()
                        }
                        this.contextMenuEvent = !1
                    }
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onMouseOver", {
                value: function (e) {
                    var t = this;
                    if (!this.mouseDown && !this.editor.isFocused()) {
                        var n = L.get(this);
                        n.cellBelowCursor = document.elementFromPoint(e.clientX, e.clientY), O(function () {
                            if (!y(e.target, "wtBorder") && n.cellBelowCursor === e.target && t.editor) if (t.targetIsCellWithComment(e)) {
                                var o = t.hot.view.wt.wtTable.getCoords(e.target), r = {from: new k(o.row, o.col)};
                                t.setRange(r), t.show()
                            } else !v(e.target, document) || t.targetIsCommentTextArea(e) || t.editor.isFocused() || t.hide()
                        }, this.displayDelay)()
                    }
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onMouseUp", {
                value: function (e) {
                    this.mouseDown = !1
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onAfterRenderer", {
                value: function (e, t) {
                    t[I] && t[I][W] && g(e, t.commentedCellClassName)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onEditorBlur", {
                value: function (e) {
                    this.setComment()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onEditorMouseDown", {
                value: function (e) {
                    var t = L.get(this);
                    t.tempEditorDimensions = {width: C(e.target), height: _(e.target)}
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onEditorMouseUp", {
                value: function (e) {
                    var t, n = L.get(this), o = C(e.target), r = _(e.target);
                    o === n.tempEditorDimensions.width + 1 && r === n.tempEditorDimensions.height + 2 || this.updateCommentMeta(this.range.from.row, this.range.from.col, (t = {}, Object.defineProperty(t, j, {
                        value: {
                            width: o,
                            height: r
                        }, configurable: !0, enumerable: !0, writable: !0
                    }), t))
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onContextMenuAddComment", {
                value: function () {
                    var e = this, t = this.hot.getSelectedRange();
                    this.contextMenuEvent = !0, this.setRange({from: t.from}), this.show(), setTimeout(function () {
                        e.hot && (e.hot.deselectCell(), e.editor.focus())
                    }, 10)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onContextMenuRemoveComment", {
                value: function (e) {
                    this.contextMenuEvent = !0;
                    for (var t = e.start.row; t <= e.end.row; t++) for (var n = e.start.col; n <= e.end.col; n++) this.removeCommentAtCell(t, n, !1);
                    this.hot.render()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onContextMenuMakeReadOnly", {
                value: function (e) {
                    var t;
                    this.contextMenuEvent = !0;
                    for (var n = e.start.row; n <= e.end.row; n++) for (var o = e.start.col; o <= e.end.col; o++) {
                        var r = !!this.getCommentMeta(n, o, V);
                        this.updateCommentMeta(n, o, (t = {}, Object.defineProperty(t, V, {
                            value: !r,
                            configurable: !0,
                            enumerable: !0,
                            writable: !0
                        }), t))
                    }
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "addToContextMenu", {
                value: function (e) {
                    var t = this;
                    e.items.push(p.plugins.ContextMenu.SEPARATOR, {
                        key: "commentsAddEdit", name: function () {
                            return t.checkSelectionCommentsConsistency() ? "Edit comment" : "Add comment"
                        }, callback: function () {
                            return t.onContextMenuAddComment()
                        }, disabled: function () {
                            return !(this.getSelected() && !this.selection.selectedHeader.corner)
                        }
                    }, {
                        key: "commentsRemove", name: function () {
                            return "Delete comment"
                        }, callback: function (e, n) {
                            return t.onContextMenuRemoveComment(n);
                        }, disabled: function () {
                            return t.hot.selection.selectedHeader.corner
                        }
                    }, {
                        key: "commentsReadOnly", name: function () {
                            var e = this, t = "Read only comment", n = P(this.getSelectedRange(), function (t, n) {
                                var o = e.getCellMeta(t, n)[I];
                                if (o && (o = o[V]), o) return !0
                            });
                            return n && (t = N(t)), t
                        }, callback: function (e, n) {
                            return t.onContextMenuMakeReadOnly(n)
                        }, disabled: function () {
                            return t.hot.selection.selectedHeader.corner || !t.checkSelectionCommentsConsistency()
                        }
                    })
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "onAfterBeginEditing", {
                value: function (e, t) {
                    this.hide()
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "destroy", {
                value: function () {
                    this.editor && this.editor.destroy(), $traceurRuntime.superGet(this, F.prototype, "destroy").call(this)
                }, configurable: !0, enumerable: !0, writable: !0
            }), o), {}, D), x("comments", B)
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            _base: 62,
            browser: 24,
            commentEditor: 68,
            "contextMenu/utils": 88,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/function": 50,
            "helpers/object": 53,
            plugins: 61
        }],
        70: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n;
                return i(t, function (t) {
                    var o = t.key ? t.key.split(":") : null;
                    if (Array.isArray(o) && o[1] === e) return n = t, !1
                }), n
            }

            Object.defineProperties(n, {
                CommandExecutor: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("helpers/array"), r && r.__esModule && r || {default: r}).arrayEach, s = function (e) {
                this.hot = e, this.commands = {}, this.commonCallback = null
            };
            $traceurRuntime.createClass(s, {
                registerCommand: function (e, t) {
                    this.commands[e] = t
                }, setCommonCallback: function (e) {
                    this.commonCallback = e
                }, execute: function (e) {
                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                    var r = this, s = e.split(":");
                    e = s[0];
                    var a = 2 === s.length ? s[1] : null, l = this.commands[e];
                    if (!l) throw new Error("Menu command '" + e + "' not exists.");
                    if (a && l.submenu && (l = o(a, l.submenu.items)), l.disabled !== !0 && ("function" != typeof l.disabled || l.disabled.call(this.hot) !== !0) && !l.hasOwnProperty("submenu")) {
                        var u = [];
                        "function" == typeof l.callback && u.push(l.callback), "function" == typeof this.commonCallback && u.push(this.commonCallback), t.unshift(s.join(":")), i(u, function (e) {
                            return e.apply(r.hot, t)
                        })
                    }
                }
            }, {})
        }, {"helpers/array": 43}],
        71: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ContextMenu: {
                    get: function () {
                        return F
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, l, f,
                p = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                m = (r = e("_base"), r && r.__esModule && r || {default: r}).default,
                g = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                w = (s = e("commandExecutor"), s && s.__esModule && s || {default: s}).CommandExecutor,
                v = (a = e("eventManager"), a && a.__esModule && a || {default: a}).EventManager,
                y = (l = e("helpers/dom/element"), l && l.__esModule && l || {default: l}).hasClass,
                b = (u = e("itemsFactory"), u && u.__esModule && u || {default: u}).ItemsFactory,
                C = (c = e("menu"), c && c.__esModule && c || {default: c}).Menu,
                _ = (d = e("plugins"), d && d.__esModule && d || {default: d}).registerPlugin,
                R = (h = e("helpers/dom/event"), h && h.__esModule && h || {default: h}), M = R.stopPropagation,
                S = R.pageX, E = R.pageY, O = (l = e("helpers/dom/element"), l && l.__esModule && l || {default: l}),
                T = O.getWindowScrollLeft, k = O.getWindowScrollTop,
                x = (f = e("predefinedItems"), f && f.__esModule && f || {default: f}), D = x.ROW_ABOVE,
                H = x.ROW_BELOW, A = x.COLUMN_LEFT, P = x.COLUMN_RIGHT, N = x.REMOVE_ROW, L = x.REMOVE_COLUMN,
                I = x.UNDO, W = x.REDO, j = x.READ_ONLY, V = x.ALIGNMENT, B = x.SEPARATOR, F = function (e) {
                    $traceurRuntime.superConstructor(z).call(this, e), this.eventManager = new v(this), this.commandExecutor = new w(this.hot), this.itemsFactory = null, this.menu = null
                }, z = F;
            $traceurRuntime.createClass(F, {
                isEnabled: function () {
                    return this.hot.getSettings().contextMenu
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        this.itemsFactory = new b(this.hot, z.DEFAULT_ITEMS);
                        var t = this.hot.getSettings().contextMenu, n = {items: this.itemsFactory.getItems(t)};
                        this.registerEvents(), "function" == typeof t.callback && this.commandExecutor.setCommonCallback(t.callback), $traceurRuntime.superGet(this, z.prototype, "enablePlugin").call(this), this.callOnPluginsReady(function () {
                            e.hot.runHooks("afterContextMenuDefaultOptions", n), e.itemsFactory.setPredefinedItems(n.items);
                            var o = e.itemsFactory.getItems(t);
                            e.menu = new C(e.hot, {
                                className: "htContextMenu",
                                keepInViewport: !0
                            }), e.hot.runHooks("beforeContextMenuSetItems", o), e.menu.setMenuItems(o), e.menu.addLocalHook("afterOpen", function () {
                                return e.onMenuAfterOpen()
                            }), e.menu.addLocalHook("afterClose", function () {
                                return e.onMenuAfterClose()
                            }), e.menu.addLocalHook("executeCommand", function () {
                                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                return e.executeCommand.apply(e, t)
                            }), g(o, function (t) {
                                return e.commandExecutor.registerCommand(t.key, t)
                            })
                        })
                    }
                }, updatePlugin: function () {
                    this.disablePlugin(), this.enablePlugin(), $traceurRuntime.superGet(this, z.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    this.close(), this.menu && (this.menu.destroy(), this.menu = null), $traceurRuntime.superGet(this, z.prototype, "disablePlugin").call(this)
                }, registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(this.hot.rootElement, "contextmenu", function (t) {
                        return e.onContextMenu(t)
                    })
                }, open: function (e) {
                    this.menu && (this.menu.open(), this.menu.setPosition({
                        top: parseInt(E(e), 10) - k(),
                        left: parseInt(S(e), 10) - T()
                    }), this.menu.hotMenu.isHotTableEnv = this.hot.isHotTableEnv, p.eventManager.isHotTableEnv = this.hot.isHotTableEnv)
                }, close: function () {
                    this.menu && this.menu.close()
                }, executeCommand: function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    this.commandExecutor.execute.apply(this.commandExecutor, e)
                }, onContextMenu: function (e) {
                    function t(e) {
                        return "TD" === e.nodeName || "TD" === e.parentNode.nodeName
                    }

                    var n = this.hot.getSettings(), o = n.rowHeaders, r = n.colHeaders, i = e.realTarget;
                    this.close(), y(i, "handsontableInput") || (e.preventDefault(), M(e), (o || r || t(i) || y(i, "current") && y(i, "wtBorder")) && this.open(e))
                }, onMenuAfterOpen: function () {
                    this.hot.runHooks("afterContextMenuShow", this)
                }, onMenuAfterClose: function () {
                    this.hot.listen(), this.hot.runHooks("afterContextMenuHide", this)
                }, destroy: function () {
                    this.close(), this.menu && this.menu.destroy(), $traceurRuntime.superGet(this, z.prototype, "destroy").call(this)
                }
            }, {
                get DEFAULT_ITEMS() {
                    return [D, H, B, A, P, B, N, L, B, I, W, B, j, B, V]
                }
            }, m), F.SEPARATOR = {name: B}, p.hooks.register("afterContextMenuDefaultOptions"), p.hooks.register("afterContextMenuShow"), p.hooks.register("afterContextMenuHide"), p.hooks.register("afterContextMenuExecute"), _("contextMenu", F)
        }, {
            _base: 62,
            browser: 24,
            commandExecutor: 70,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            itemsFactory: 73,
            menu: 74,
            plugins: 61,
            predefinedItems: 75
        }],
        72: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                Cursor: {
                    get: function () {
                        return f
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                a = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), l = a.getWindowScrollLeft,
                u = a.getWindowScrollTop, c = (i = e("helpers/dom/event"), i && i.__esModule && i || {default: i}),
                d = c.pageX, h = c.pageY, f = function (e) {
                    var t, n, o, r, i, s, a = u(), c = l();
                    this.type = this.getSourceType(e), "literal" === this.type ? (t = parseInt(e.top, 10), o = parseInt(e.left, 10), i = e.height || 0, s = e.width || 0, n = t, r = o, t += a, o += c) : "event" === this.type && (t = parseInt(h(e), 10), o = parseInt(d(e), 10), i = e.target.clientHeight, s = e.target.clientWidth, n = t - a, r = o - c), this.top = t, this.topRelative = n, this.left = o, this.leftRelative = r, this.scrollTop = a, this.scrollLeft = c, this.cellHeight = i, this.cellWidth = s
                };
            $traceurRuntime.createClass(f, {
                getSourceType: function (e) {
                    var t = "literal";
                    return e instanceof Event && (t = "event"), t
                }, fitsAbove: function (e) {
                    return this.topRelative >= e.offsetHeight
                }, fitsBelow: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : window.innerHeight;
                    return this.topRelative + e.offsetHeight <= t
                }, fitsOnRight: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : window.innerWidth;
                    return this.leftRelative + this.cellWidth + e.offsetWidth <= t
                }, fitsOnLeft: function (e) {
                    return this.leftRelative >= e.offsetWidth
                }
            }, {}), s.plugins.utils = s.plugins.utils || {}, s.plugins.utils.Cursor = f
        }, {browser: 24, "helpers/dom/element": 47, "helpers/dom/event": 48}],
        73: [function (e, t, n) {
            "use strict";

            function o() {
                var e = void 0 !== arguments[0] ? arguments[0] : null, t = void 0 !== arguments[1] ? arguments[1] : [],
                    n = void 0 !== arguments[2] ? arguments[2] : {}, o = [];
                return e && e.items ? e = e.items : Array.isArray(e) || (e = t), u(e) ? l(e, function (e, t) {
                    var r = n["string" == typeof e ? e : t];
                    r || (r = e), u(e) ? c(r, e) : "string" == typeof r && (r = {name: r}), void 0 === r.key && (r.key = t), o.push(r)
                }) : d(e, function (e, t) {
                    var r = n[e];
                    !r && p.indexOf(e) >= 0 || (r || (r = {
                        name: e,
                        key: t + ""
                    }), u(e) && c(r, e), void 0 === r.key && (r.key = t), o.push(r))
                }), o
            }

            Object.defineProperties(n, {
                ItemsFactory: {
                    get: function () {
                        return g
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a = (r = e("helpers/object"), r && r.__esModule && r || {default: r}), l = a.objectEach,
                u = a.isObject, c = a.extend,
                d = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                h = (s = e("predefinedItems"), s && s.__esModule && s || {default: s}), f = h.SEPARATOR, p = h.ITEMS,
                m = h.predefinedItems, g = function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : null;
                    this.hot = e, this.predefinedItems = m(), this.defaultOrderPattern = t
                };
            $traceurRuntime.createClass(g, {
                setPredefinedItems: function (e) {
                    var t = this, n = {};
                    this.defaultOrderPattern.length = 0, l(e, function (e, o) {
                        var r = "";
                        e.name === f ? (n[f] = e, r = f) : isNaN(parseInt(o, 10)) ? (e.key = void 0 === e.key ? o : e.key, n[o] = e, r = e.key) : (n[e.key] = e, r = e.key), t.defaultOrderPattern.push(r)
                    }), this.predefinedItems = n
                }, getItems: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    return o(e, this.defaultOrderPattern, this.predefinedItems)
                }
            }, {})
        }, {"helpers/array": 43, "helpers/object": 53, predefinedItems: 75}],
        74: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                Menu: {
                    get: function () {
                        return z
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f, p,
                m = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                g = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), w = g.addClass, v = g.empty,
                y = g.fastInnerHTML, b = g.getScrollbarWidth, C = g.isChildOf, _ = g.removeClass,
                R = (i = e("helpers/array"), i && i.__esModule && i || {default: i}), M = R.arrayEach,
                S = R.arrayFilter, E = R.arrayReduce,
                O = (s = e("cursor"), s && s.__esModule && s || {default: s}).Cursor,
                T = (a = e("eventManager"), a && a.__esModule && a || {default: a}).EventManager,
                k = (l = e("helpers/object"), l && l.__esModule && l || {default: l}).mixin,
                x = (u = e("helpers/function"), u && u.__esModule && u || {default: u}).debounce,
                D = (c = e("utils"), c && c.__esModule && c || {default: c}), H = D.filterSeparators, A = D.hasSubMenu,
                P = D.isDisabled, N = D.isItemHidden, L = D.isSeparator, I = D.isSelectionDisabled,
                W = D.normalizeSelection,
                j = (d = e("helpers/unicode"), d && d.__esModule && d || {default: d}).KEY_CODES,
                V = (h = e("mixins/localHooks"), h && h.__esModule && h || {default: h}).localHooks,
                B = (f = e("predefinedItems"), f && f.__esModule && f || {default: f}).SEPARATOR,
                F = (p = e("helpers/dom/event"), p && p.__esModule && p || {default: p}).stopImmediatePropagation,
                z = function (e, t) {
                    this.hot = e, this.options = t || {
                        parent: null,
                        name: null,
                        className: "",
                        keepInViewport: !0,
                        standalone: !1
                    }, this.eventManager = new T(this), this.container = this.createContainer(this.options.name), this.hotMenu = null, this.hotSubMenus = {}, this.parentMenu = this.options.parent || null, this.menuItems = null, this.origOutsideClickDeselects = null, this.offset = {
                        above: 0,
                        below: 0,
                        left: 0,
                        right: 0
                    }, this._afterScrollCallback = null, this.registerEvents()
                }, Y = z;
            $traceurRuntime.createClass(z, {
                registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(document.documentElement, "mousedown", function (t) {
                        return e.onDocumentMouseDown(t)
                    })
                }, setMenuItems: function (e) {
                    this.menuItems = e
                }, setOffset: function (e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : 0;
                    this.offset[e] = t
                }, isSubMenu: function () {
                    return null !== this.parentMenu
                }, open: function () {
                    var e = this;
                    this.container.removeAttribute("style"), this.container.style.display = "block";
                    var t = x(function (t) {
                        return e.openSubMenu(t)
                    }, 300), n = S(this.menuItems, function (t) {
                        return N(t, e.hot)
                    });
                    n = H(n, B);
                    var o = {
                        data: n,
                        colHeaders: !1,
                        colWidths: [200],
                        autoRowSize: !1,
                        readOnly: !0,
                        copyPaste: !1,
                        columns: [{
                            data: "name", renderer: function (t, n, o, r, i, s) {
                                return e.menuItemRenderer(t, n, o, r, i, s)
                            }
                        }],
                        renderAllRows: !0,
                        fragmentSelection: "cell",
                        disableVisualSelection: "area",
                        beforeKeyDown: function (t) {
                            return e.onBeforeKeyDown(t)
                        },
                        afterOnCellMouseOver: function (n, o, r) {
                            e.isAllSubMenusClosed() ? t(o.row) : e.openSubMenu(o.row)
                        }
                    };
                    this.origOutsideClickDeselects = this.hot.getSettings().outsideClickDeselects, this.hot.getSettings().outsideClickDeselects = !1, this.hotMenu = new m.Core(this.container, o), this.hotMenu.addHook("afterInit", function () {
                        return e.onAfterInit()
                    }), this.hotMenu.init(), this.hotMenu.listen(), this.blockMainTableCallbacks(), this.runLocalHooks("afterOpen")
                }, close: function () {
                    var e = void 0 !== arguments[0] && arguments[0];
                    this.isOpened() && (e && this.parentMenu ? this.parentMenu.close() : (this.closeAllSubMenus(), this.container.style.display = "none", this.releaseMainTableCallbacks(), this.hotMenu.destroy(), this.hotMenu = null, this.hot.getSettings().outsideClickDeselects = this.origOutsideClickDeselects, this.runLocalHooks("afterClose"), this.parentMenu && this.parentMenu.hotMenu.listen()))
                }, openSubMenu: function (e) {
                    if (!this.hotMenu) return !1;
                    var t = this.hotMenu.getCell(e, 0);
                    if (this.closeAllSubMenus(), !t || !A(t)) return !1;
                    var n = this.hotMenu.getSourceDataAtRow(e), o = new Y(this.hot, {
                        parent: this,
                        name: n.name,
                        className: this.options.className,
                        keepInViewport: !0
                    });
                    return o.setMenuItems(n.submenu.items), o.open(), o.setPosition(t.getBoundingClientRect()), this.hotSubMenus[n.key] = o, o
                }, closeSubMenu: function (e) {
                    var t = this.hotMenu.getSourceDataAtRow(e), n = this.hotSubMenus[t.key];
                    n && (n.destroy(), delete this.hotSubMenus[t.key])
                }, closeAllSubMenus: function () {
                    var e = this;
                    M(this.hotMenu.getData(), function (t, n) {
                        return e.closeSubMenu(n)
                    })
                }, isAllSubMenusClosed: function () {
                    return 0 === Object.keys(this.hotSubMenus).length
                }, destroy: function () {
                    this.clearLocalHooks(), this.close(), this.parentMenu = null, this.eventManager.destroy()
                }, isOpened: function () {
                    return null !== this.hotMenu
                }, executeCommand: function (e) {
                    if (this.isOpened() && this.hotMenu.getSelected()) {
                        var t = this.hotMenu.getSourceDataAtRow(this.hotMenu.getSelected()[0]);
                        if (this.runLocalHooks("select", t, e), t.isCommand !== !1 && t.name !== B) {
                            var n = this.hot.getSelectedRange(), o = n ? W(n) : {}, r = !0;
                            (t.disabled === !0 || "function" == typeof t.disabled && t.disabled.call(this.hot) === !0 || t.submenu) && (r = !1), this.runLocalHooks("executeCommand", t.key, o, e), this.isSubMenu() && this.parentMenu.runLocalHooks("executeCommand", t.key, o, e), r && this.close(!0)
                        }
                    }
                }, setPosition: function (e) {
                    var t = new O(e);
                    this.options.keepInViewport ? (t.fitsBelow(this.container) ? this.setPositionBelowCursor(t) : t.fitsAbove(this.container) ? this.setPositionAboveCursor(t) : this.setPositionBelowCursor(t), t.fitsOnRight(this.container) ? this.setPositionOnRightOfCursor(t) : this.setPositionOnLeftOfCursor(t)) : (this.setPositionBelowCursor(t), this.setPositionOnRightOfCursor(t))
                }, setPositionAboveCursor: function (e) {
                    var t = this.offset.above + e.top - this.container.offsetHeight;
                    this.isSubMenu() && (t = e.top + e.cellHeight - this.container.offsetHeight + 3), this.container.style.top = t + "px"
                }, setPositionBelowCursor: function (e) {
                    var t = this.offset.below + e.top;
                    this.isSubMenu() && (t = e.top - 1), this.container.style.top = t + "px"
                }, setPositionOnRightOfCursor: function (e) {
                    var t;
                    t = this.isSubMenu() ? 1 + e.left + e.cellWidth : this.offset.right + 1 + e.left, this.container.style.left = t + "px"
                }, setPositionOnLeftOfCursor: function (e) {
                    var t = this.offset.left + e.left - this.container.offsetWidth + b() + 4;
                    this.container.style.left = t + "px"
                }, selectFirstCell: function () {
                    var e = this.hotMenu.getCell(0, 0);
                    L(e) || P(e) || I(e) ? this.selectNextCell(0, 0) : this.hotMenu.selectCell(0, 0)
                }, selectLastCell: function () {
                    var e = this.hotMenu.countRows() - 1, t = this.hotMenu.getCell(e, 0);
                    L(t) || P(t) || I(t) ? this.selectPrevCell(e, 0) : this.hotMenu.selectCell(e, 0)
                }, selectNextCell: function (e, t) {
                    var n = e + 1, o = n < this.hotMenu.countRows() ? this.hotMenu.getCell(n, t) : null;
                    o && (L(o) || P(o) || I(o) ? this.selectNextCell(n, t) : this.hotMenu.selectCell(n, t))
                }, selectPrevCell: function (e, t) {
                    var n = e - 1, o = n >= 0 ? this.hotMenu.getCell(n, t) : null;
                    o && (L(o) || P(o) || I(o) ? this.selectPrevCell(n, t) : this.hotMenu.selectCell(n, t))
                }, menuItemRenderer: function (e, t, n, o, r, i) {
                    var s = this, a = e.getSourceDataAtRow(n), l = document.createElement("div"), u = function (e) {
                        return e.hasOwnProperty("submenu")
                    }, c = function (e) {
                        return new RegExp(B, "i").test(e.name)
                    }, d = function (e) {
                        return e.disabled === !0 || "function" == typeof e.disabled && e.disabled.call(s.hot) === !0
                    }, h = function (e) {
                        return e.disableSelection
                    };
                    "function" == typeof i && (i = i.call(this.hot)), v(t), w(l, "htItemWrapper"), t.appendChild(l), c(a) ? w(t, "htSeparator") : "function" == typeof a.renderer ? (w(t, "htCustomMenuRenderer"), t.appendChild(a.renderer(e, l, n, o, r, i))) : y(l, i), d(a) ? (w(t, "htDisabled"), this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.deselectCell()
                    })) : h(a) ? (w(t, "htSelectionDisabled"), this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.deselectCell()
                    })) : u(a) ? (w(t, "htSubmenu"), h(a) ? this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.deselectCell()
                    }) : this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.selectCell(n, o, void 0, void 0, !1, !1)
                    })) : (_(t, "htSubmenu"), _(t, "htDisabled"), h(a) ? this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.deselectCell()
                    }) : this.eventManager.addEventListener(t, "mouseenter", function () {
                        return e.selectCell(n, o, void 0, void 0, !1, !1)
                    }))
                }, createContainer: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    e && (e = e.replace(/ /g, "_"), e = this.options.className + "Sub_" + e);
                    var t;
                    return t = e ? document.querySelector("." + this.options.className + "." + e) : document.querySelector("." + this.options.className), t || (t = document.createElement("div"), w(t, "htMenu " + this.options.className), e && w(t, e), document.getElementsByTagName("body")[0].appendChild(t)), t
                }, blockMainTableCallbacks: function () {
                    this._afterScrollCallback = function () {
                    }, this.hot.addHook("afterScrollVertically", this._afterScrollCallback), this.hot.addHook("afterScrollHorizontally", this._afterScrollCallback)
                }, releaseMainTableCallbacks: function () {
                    this._afterScrollCallback && (this.hot.removeHook("afterScrollVertically", this._afterScrollCallback), this.hot.removeHook("afterScrollHorizontally", this._afterScrollCallback), this._afterScrollCallback = null)
                }, onBeforeKeyDown: function (e) {
                    var t = this.hotMenu.getSelected(), n = !1;
                    switch (e.keyCode) {
                        case j.ESCAPE:
                            this.close(), n = !0;
                            break;
                        case j.ENTER:
                            t && (this.hotMenu.getSourceDataAtRow(t[0]).submenu ? n = !0 : (this.executeCommand(e), this.close(!0)));
                            break;
                        case j.ARROW_DOWN:
                            t ? this.selectNextCell(t[0], t[1]) : this.selectFirstCell(), n = !0;
                            break;
                        case j.ARROW_UP:
                            t ? this.selectPrevCell(t[0], t[1]) : this.selectLastCell(), n = !0;
                            break;
                        case j.ARROW_RIGHT:
                            if (t) {
                                var o = this.openSubMenu(t[0]);
                                o && o.selectFirstCell()
                            }
                            n = !0;
                            break;
                        case j.ARROW_LEFT:
                            t && this.isSubMenu() && (this.close(), this.parentMenu && this.parentMenu.hotMenu.listen(), n = !0)
                    }
                    n && (e.preventDefault(), F(e))
                }, onAfterInit: function () {
                    var e = this.hotMenu.getSettings().data, t = this.hotMenu.view.wt.wtTable.hider.style,
                        n = this.hotMenu.view.wt.wtTable.holder.style, o = parseInt(t.width, 10),
                        r = E(e, function (e, t) {
                            return e + (t.name === B ? 1 : 26)
                        }, 0);
                    n.width = o + 22 + "px", n.height = r + 4 + "px", t.height = n.height
                }, onDocumentMouseDown: function (e) {
                    this.isOpened() && (this.container && C(e.target, this.container) && this.executeCommand(e), this.options.standalone && this.hotMenu && !C(e.target, this.hotMenu.rootElement) ? this.close(!0) : (this.isAllSubMenusClosed() || this.isSubMenu()) && !C(e.target, ".htMenu") && C(e.target, document) && this.close(!0))
                }
            }, {}), k(z, V)
        }, {
            browser: 24,
            cursor: 72,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/function": 50,
            "helpers/object": 53,
            "helpers/unicode": 56,
            "mixins/localHooks": 58,
            predefinedItems: 75,
            utils: 88
        }],
        75: [function (e, t, n) {
            "use strict";

            function o() {
                var e = {};
                return y(oe, function (t, n) {
                    return e[n] = t()
                }), e
            }

            function r(e, t) {
                ne.indexOf(e) === -1 && (oe[e] = t)
            }

            var i;
            Object.defineProperties(n, {
                ALIGNMENT: {
                    get: function () {
                        return a.KEY
                    }
                }, CLEAR_COLUMN: {
                    get: function () {
                        return l.KEY
                    }
                }, COLUMN_LEFT: {
                    get: function () {
                        return u.KEY
                    }
                }, COLUMN_RIGHT: {
                    get: function () {
                        return c.KEY
                    }
                }, READ_ONLY: {
                    get: function () {
                        return d.KEY
                    }
                }, REDO: {
                    get: function () {
                        return h.KEY
                    }
                }, REMOVE_COLUMN: {
                    get: function () {
                        return f.KEY
                    }
                }, REMOVE_ROW: {
                    get: function () {
                        return p.KEY
                    }
                }, ROW_ABOVE: {
                    get: function () {
                        return m.KEY
                    }
                }, ROW_BELOW: {
                    get: function () {
                        return g.KEY
                    }
                }, SEPARATOR: {
                    get: function () {
                        return w.KEY
                    }
                }, UNDO: {
                    get: function () {
                        return v.KEY
                    }
                }, ITEMS: {
                    get: function () {
                        return ne
                    }
                }, predefinedItems: {
                    get: function () {
                        return o
                    }
                }, addItem: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var s, a, l, u, c, d, h, f, p, m, g, w, v, a, l, u, c, d, h, f, p, m, g, w, v,
                y = (s = e("helpers/object"), s && s.__esModule && s || {default: s}).objectEach,
                b = (a = e("predefinedItems/alignment"), a && a.__esModule && a || {default: a}), C = b.alignmentItem,
                _ = b.KEY, R = (l = e("predefinedItems/clearColumn"), l && l.__esModule && l || {default: l}),
                M = R.clearColumnItem, S = R.KEY,
                E = (u = e("predefinedItems/columnLeft"), u && u.__esModule && u || {default: u}), O = E.columnLeftItem,
                T = E.KEY, k = (c = e("predefinedItems/columnRight"), c && c.__esModule && c || {default: c}),
                x = k.columnRightItem, D = k.KEY,
                H = (d = e("predefinedItems/readOnly"), d && d.__esModule && d || {default: d}), A = H.readOnlyItem,
                P = H.KEY, N = (h = e("predefinedItems/redo"), h && h.__esModule && h || {default: h}), L = N.redoItem,
                I = N.KEY, W = (f = e("predefinedItems/removeColumn"), f && f.__esModule && f || {default: f}),
                j = W.removeColumnItem, V = W.KEY,
                B = (p = e("predefinedItems/removeRow"), p && p.__esModule && p || {default: p}), F = B.removeRowItem,
                z = B.KEY, Y = (m = e("predefinedItems/rowAbove"), m && m.__esModule && m || {default: m}),
                U = Y.rowAboveItem, G = Y.KEY,
                $ = (g = e("predefinedItems/rowBelow"), g && g.__esModule && g || {default: g}), K = $.rowBelowItem,
                X = $.KEY, q = (w = e("predefinedItems/separator"), w && w.__esModule && w || {default: w}),
                Z = q.separatorItem, J = q.KEY,
                Q = (v = e("predefinedItems/undo"), v && v.__esModule && v || {default: v}), ee = Q.undoItem,
                te = Q.KEY, a = (a = e("predefinedItems/alignment"), a && a.__esModule && a || {default: a}),
                l = (l = e("predefinedItems/clearColumn"), l && l.__esModule && l || {default: l}),
                u = (u = e("predefinedItems/columnLeft"), u && u.__esModule && u || {default: u}),
                c = (c = e("predefinedItems/columnRight"), c && c.__esModule && c || {default: c}),
                d = (d = e("predefinedItems/readOnly"), d && d.__esModule && d || {default: d}),
                h = (h = e("predefinedItems/redo"), h && h.__esModule && h || {default: h}),
                f = (f = e("predefinedItems/removeColumn"), f && f.__esModule && f || {default: f}),
                p = (p = e("predefinedItems/removeRow"), p && p.__esModule && p || {default: p}),
                m = (m = e("predefinedItems/rowAbove"), m && m.__esModule && m || {default: m}),
                g = (g = e("predefinedItems/rowBelow"), g && g.__esModule && g || {default: g}),
                w = (w = e("predefinedItems/separator"), w && w.__esModule && w || {default: w}),
                v = (v = e("predefinedItems/undo"), v && v.__esModule && v || {default: v}),
                ne = [G, X, T, D, S, z, V, te, I, P, _, J], oe = (i = {}, Object.defineProperty(i, J, {
                    value: Z,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, G, {
                    value: U,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, X, {
                    value: K,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, T, {
                    value: O,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, D, {
                    value: x,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, S, {
                    value: M,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, z, {
                    value: F,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, V, {
                    value: j,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, te, {
                    value: ee,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, I, {
                    value: L,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, P, {
                    value: A,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, _, {value: C, configurable: !0, enumerable: !0, writable: !0}), i)
        }, {
            "helpers/object": 53,
            "predefinedItems/alignment": 76,
            "predefinedItems/clearColumn": 77,
            "predefinedItems/columnLeft": 78,
            "predefinedItems/columnRight": 79,
            "predefinedItems/readOnly": 80,
            "predefinedItems/redo": 81,
            "predefinedItems/removeColumn": 82,
            "predefinedItems/removeRow": 83,
            "predefinedItems/rowAbove": 84,
            "predefinedItems/rowBelow": 85,
            "predefinedItems/separator": 86,
            "predefinedItems/undo": 87
        }],
        76: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: h, name: "Alignment", disabled: function () {
                        return !(this.getSelectedRange() && !this.selection.selectedHeader.corner)
                    }, submenu: {
                        items: [{
                            key: h + ":left", name: function () {
                                var e = this, t = "Left", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htLeft") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "horizontal", r = "htLeft";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {
                            key: h + ":center", name: function () {
                                var e = this, t = "Center", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htCenter") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "horizontal", r = "htCenter";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {
                            key: h + ":right", name: function () {
                                var e = this, t = "Right", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htRight") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "horizontal", r = "htRight";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {
                            key: h + ":justify", name: function () {
                                var e = this, t = "Justify", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htJustify") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "horizontal", r = "htJustify";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {name: d}, {
                            key: h + ":top", name: function () {
                                var e = this, t = "Top", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htTop") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "vertical", r = "htTop";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {
                            key: h + ":middle", name: function () {
                                var e = this, t = "Middle", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htMiddle") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "vertical", r = "htMiddle";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }, {
                            key: h + ":bottom", name: function () {
                                var e = this, t = "Bottom", n = u(this.getSelectedRange(), function (t, n) {
                                    var o = e.getCellMeta(t, n).className;
                                    if (o && o.indexOf("htBottom") !== -1) return !0
                                });
                                return n && (t = c(t)), t
                            }, callback: function () {
                                var e = this, t = this.getSelectedRange(), n = l(t, function (t, n) {
                                    return e.getCellMeta(t, n).className
                                }), o = "vertical", r = "htBottom";
                                this.runHooks("beforeCellAlignment", n, t, o, r), a(t, o, r, function (t, n) {
                                    return e.getCellMeta(t, n)
                                }), this.render()
                            }, disabled: !1
                        }]
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return h
                    }
                }, alignmentItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s = (r = e("utils"), r && r.__esModule && r || {default: r}), a = s.align,
                l = s.getAlignmentClasses, u = s.checkSelectionConsistency, c = s.markLabelAsSelected,
                d = (i = e("separator"), i && i.__esModule && i || {default: i}).KEY, h = "alignment"
        }, {separator: 86, utils: 88}],
        77: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Clear column", callback: function (e, t) {
                        var n = t.start.col;
                        this.countRows() && this.populateFromArray(0, n, [[null]], Math.max(t.start.row, t.end.row), n, "ContextMenu.clearColumn")
                    }, disabled: function () {
                        var e = i(this);
                        if (!e) return !0;
                        var t = [e[0], 0, e[0], this.countCols() - 1], n = t.join(",") == e.join(",");
                        return e[1] < 0 || this.countCols() >= this.getSettings().maxCols || n
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, clearColumnItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "clear_column"
        }, {utils: 88}],
        78: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Insert column on the left", callback: function (e, t) {
                        this.alter("insert_col", t.start.col, 1, "ContextMenu.columnLeft")
                    }, disabled: function () {
                        var e = i(this);
                        if (!e) return !0;
                        if (!this.isColumnModificationAllowed()) return !0;
                        var t = [e[0], 0, e[0], this.countCols() - 1], n = t.join(",") == e.join(","),
                            o = 1 === this.countCols();
                        return e[1] < 0 || this.countCols() >= this.getSettings().maxCols || !o && n
                    }, hidden: function () {
                        return !this.getSettings().allowInsertColumn
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, columnLeftItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "col_left"
        }, {utils: 88}],
        79: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Insert column on the right", callback: function (e, t) {
                        this.alter("insert_col", t.end.col + 1, 1, "ContextMenu.columnRight")
                    }, disabled: function () {
                        var e = i(this);
                        if (!e) return !0;
                        if (!this.isColumnModificationAllowed()) return !0;
                        var t = [e[0], 0, e[0], this.countCols() - 1], n = t.join(",") == e.join(","),
                            o = 1 === this.countCols();
                        return e[1] < 0 || this.countCols() >= this.getSettings().maxCols || !o && n
                    }, hidden: function () {
                        return !this.getSettings().allowInsertColumn
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, columnRightItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "col_right"
        }, {utils: 88}],
        80: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: l, name: function () {
                        var e = this, t = "Read only", n = s(this.getSelectedRange(), function (t, n) {
                            return e.getCellMeta(t, n).readOnly
                        });
                        return n && (t = a(t)), t
                    }, callback: function () {
                        var e = this, t = this.getSelectedRange(), n = s(t, function (t, n) {
                            return e.getCellMeta(t, n).readOnly
                        });
                        t.forAll(function (t, o) {
                            e.setCellMeta(t, o, "readOnly", !n)
                        }), this.render()
                    }, disabled: function () {
                        return !(this.getSelectedRange() && !this.selection.selectedHeader.corner)
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return l
                    }
                }, readOnlyItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}), s = i.checkSelectionConsistency,
                a = i.markLabelAsSelected, l = "make_read_only"
        }, {utils: 88}],
        81: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: r, name: "Redo", callback: function () {
                        this.redo()
                    }, disabled: function () {
                        return this.undoRedo && !this.undoRedo.isRedoAvailable()
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return r
                    }
                }, redoItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r = "redo"
        }, {}],
        82: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Remove column", callback: function (e, t) {
                        var n = t.end.col - t.start.col + 1;
                        this.alter("remove_col", t.start.col, n, "ContextMenu.removeColumn")
                    }, disabled: function () {
                        var e = i(this), t = this.countCols();
                        return !e || this.selection.selectedHeader.rows || this.selection.selectedHeader.corner || !this.isColumnModificationAllowed() || !t
                    }, hidden: function () {
                        return !this.getSettings().allowRemoveColumn
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, removeColumnItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "remove_col"
        }, {utils: 88}],
        83: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Remove row", callback: function (e, t) {
                        var n = t.end.row - t.start.row + 1;
                        this.alter("remove_row", t.start.row, n, "ContextMenu.removeRow")
                    }, disabled: function () {
                        var e = i(this), t = this.countRows();
                        return !e || this.selection.selectedHeader.cols || this.selection.selectedHeader.corner || !t
                    }, hidden: function () {
                        return !this.getSettings().allowRemoveRow
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, removeRowItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "remove_row"
        }, {utils: 88}],
        84: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Insert row above", callback: function (e, t) {
                        this.alter("insert_row", t.start.row, 1, "ContextMenu.rowAbove");
                    }, disabled: function () {
                        var e = i(this);
                        return !e || this.selection.selectedHeader.cols || this.countRows() >= this.getSettings().maxRows
                    }, hidden: function () {
                        return !this.getSettings().allowInsertRow
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, rowAboveItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "row_above"
        }, {utils: 88}],
        85: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: s, name: "Insert row below", callback: function (e, t) {
                        this.alter("insert_row", t.end.row + 1, 1, "ContextMenu.rowBelow")
                    }, disabled: function () {
                        var e = i(this);
                        return !e || this.selection.selectedHeader.cols || this.countRows() >= this.getSettings().maxRows
                    }, hidden: function () {
                        return !this.getSettings().allowInsertRow
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return s
                    }
                }, rowBelowItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i = (r = e("utils"), r && r.__esModule && r || {default: r}).getValidSelection, s = "row_below"
        }, {utils: 88}],
        86: [function (e, t, n) {
            "use strict";

            function o() {
                return {name: r}
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return r
                    }
                }, separatorItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r = "---------"
        }, {}],
        87: [function (e, t, n) {
            "use strict";

            function o() {
                return {
                    key: r, name: "Undo", callback: function () {
                        this.undo()
                    }, disabled: function () {
                        return this.undoRedo && !this.undoRedo.isUndoAvailable()
                    }
                }
            }

            Object.defineProperties(n, {
                KEY: {
                    get: function () {
                        return r
                    }
                }, undoItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r = "undo"
        }, {}],
        88: [function (e, t, n) {
            "use strict";

            function o(e) {
                return {start: e.getTopLeftCorner(), end: e.getBottomRightCorner()}
            }

            function r(e) {
                return S(e, "htSeparator")
            }

            function i(e) {
                return S(e, "htSubmenu")
            }

            function s(e) {
                return S(e, "htDisabled")
            }

            function a(e) {
                return S(e, "htSelectionDisabled")
            }

            function l(e) {
                var t = e.getSelected();
                return t ? t[0] < 0 ? null : t : null
            }

            function u(e, t) {
                return e.indexOf(t) != -1 ? e : (e = e.replace("htTop", "").replace("htMiddle", "").replace("htBottom", "").replace("  ", ""), e += " " + t)
            }

            function c(e, t) {
                return e.indexOf(t) != -1 ? e : (e = e.replace("htLeft", "").replace("htCenter", "").replace("htRight", "").replace("htJustify", "").replace("  ", ""), e += " " + t)
            }

            function d(e, t) {
                for (var n = {}, o = e.from.row; o <= e.to.row; o++) for (var r = e.from.col; r <= e.to.col; r++) n[o] || (n[o] = []), n[o][r] = t(o, r);
                return n
            }

            function h(e, t, n, o) {
                if (e.from.row == e.to.row && e.from.col == e.to.col) f(e.from.row, e.from.col, t, n, o); else for (var r = e.from.row; r <= e.to.row; r++) for (var i = e.from.col; i <= e.to.col; i++) f(r, i, t, n, o)
            }

            function f(e, t, n, o, r) {
                var i = r(e, t), s = o;
                i.className && (s = "vertical" === n ? u(i.className, o) : c(i.className, o)), i.className = s
            }

            function p(e, t) {
                var n = !1;
                return e && e.forAll(function (e, o) {
                    if (t(e, o)) return n = !0, !1
                }), n
            }

            function m(e) {
                return '<span class="selected">' + String.fromCharCode(10003) + "</span>" + e
            }

            function g(e, t) {
                return !e.hidden || !("function" == typeof e.hidden && e.hidden.call(t))
            }

            function w(e, t) {
                for (var n = e.slice(0), o = 0; o < n.length && n[o].name === t;) n.shift();
                return n
            }

            function v(e, t) {
                var n = e.slice(0);
                return n.reverse(), n = w(n, t), n.reverse(), n
            }

            function y(e) {
                var t = [];
                return M(e, function (e, n) {
                    n > 0 ? t[t.length - 1].name !== e.name && t.push(e) : t.push(e)
                }), t
            }

            function b(e) {
                var t = void 0 !== arguments[1] ? arguments[1] : E, n = e.slice(0);
                return n = w(n, t), n = v(n, t), n = y(n)
            }

            Object.defineProperties(n, {
                normalizeSelection: {
                    get: function () {
                        return o
                    }
                }, isSeparator: {
                    get: function () {
                        return r
                    }
                }, hasSubMenu: {
                    get: function () {
                        return i
                    }
                }, isDisabled: {
                    get: function () {
                        return s
                    }
                }, isSelectionDisabled: {
                    get: function () {
                        return a
                    }
                }, getValidSelection: {
                    get: function () {
                        return l
                    }
                }, prepareVerticalAlignClass: {
                    get: function () {
                        return u
                    }
                }, prepareHorizontalAlignClass: {
                    get: function () {
                        return c
                    }
                }, getAlignmentClasses: {
                    get: function () {
                        return d
                    }
                }, align: {
                    get: function () {
                        return h
                    }
                }, checkSelectionConsistency: {
                    get: function () {
                        return p
                    }
                }, markLabelAsSelected: {
                    get: function () {
                        return m
                    }
                }, isItemHidden: {
                    get: function () {
                        return g
                    }
                }, filterSeparators: {
                    get: function () {
                        return b
                    }
                }, __esModule: {value: !0}
            });
            var C, _, R, M = (C = e("helpers/array"), C && C.__esModule && C || {default: C}).arrayEach,
                S = (_ = e("helpers/dom/element"), _ && _.__esModule && _ || {default: _}).hasClass,
                E = (R = e("predefinedItems/separator"), R && R.__esModule && R || {default: R}).KEY
        }, {"helpers/array": 43, "helpers/dom/element": 47, "predefinedItems/separator": 86}],
        89: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ContextMenuCopyPaste: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c = (o = e("_base"), o && o.__esModule && o || {default: o}).default,
                d = (r = e("zeroclipboard"), r && r.__esModule && r || {default: r}).default,
                h = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}).removeClass,
                f = (s = e("helpers/array"), s && s.__esModule && s || {default: s}).arrayEach,
                p = (a = e("eventManager"), a && a.__esModule && a || {default: a}).EventManager,
                m = (l = e("plugins"), l && l.__esModule && l || {default: l}).registerPlugin,
                g = (u = e("contextMenu/predefinedItems"), u && u.__esModule && u || {default: u}).SEPARATOR,
                w = function (e) {
                    $traceurRuntime.superConstructor(v).call(this, e), this.eventManager = new p(this), this.swfPath = null, this.outsideClickDeselectsCache = null
                }, v = w;
            $traceurRuntime.createClass(w, {
                isEnabled: function () {
                    return this.hot.getSettings().contextMenuCopyPaste
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        "object" == typeof this.hot.getSettings().contextMenuCopyPaste && (this.swfPath = this.hot.getSettings().contextMenuCopyPaste.swfPath), "undefined" == typeof d && console.error("To be able to use the Copy/Paste feature from the context menu, you need to manually include ZeroClipboard.js file to your website.");
                        try {
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                        } catch (e) {
                            "undefined" == typeof navigator.mimeTypes["application/x-shockwave-flash"] && console.error("To be able to use the Copy/Paste feature from the context menu, your browser needs to have Flash Plugin installed.")
                        }
                        this.swfPath && d.config({swfPath: this.swfPath}), this.hot.addHook("afterContextMenuShow", function () {
                            return e.onAfterContextMenuShow()
                        }), this.hot.addHook("afterContextMenuDefaultOptions", function (t) {
                            return e.onAfterContextMenuDefaultOptions(t)
                        }), this.registerEvents(), $traceurRuntime.superGet(this, v.prototype, "enablePlugin").call(this)
                    }
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, v.prototype, "disablePlugin").call(this)
                }, registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(document, "mouseenter", function () {
                        return e.removeCurrentClass()
                    }), this.eventManager.addEventListener(document, "mouseleave", function () {
                        return e.removeZeroClipboardClass()
                    })
                }, getCopyValue: function () {
                    return this.hot.copyPaste.setCopyableText(), this.hot.copyPaste.copyPasteInstance.elTextarea.value
                }, onAfterContextMenuDefaultOptions: function (e) {
                    e.items.unshift({
                        key: "copy", name: "Copy", disabled: function () {
                            return this.selection.selectedHeader.corner
                        }
                    }, {
                        key: "paste", name: "Paste", callback: function () {
                            this.copyPaste.triggerPaste()
                        }, disabled: function () {
                            return this.selection.selectedHeader.corner
                        }
                    }, {name: g})
                }, onAfterContextMenuShow: function () {
                    var e = this, t = this.hot.getPlugin("contextMenu"), n = t.menu.hotMenu.getSourceData();
                    f(n, function (n, o) {
                        if ("copy" === n.key) {
                            var r = new d(t.menu.hotMenu.getCell(o, 0));
                            return r.off(), r.on("copy", function (t) {
                                var n = t.clipboardData;
                                n.setData("text/plain", e.getCopyValue()), e.hot.getSettings().outsideClickDeselects = e.outsideClickDeselectsCache
                            }), !1
                        }
                    })
                }, removeCurrentClass: function () {
                    var e = this.hot.getPlugin("contextMenu");
                    if (e.enabled) {
                        if (e.menu.isOpened()) {
                            var t = e.menu.hotMenu.rootElement.querySelector("td.current");
                            t && h(t, "current")
                        }
                        this.outsideClickDeselectsCache = this.hot.getSettings().outsideClickDeselects, this.hot.getSettings().outsideClickDeselects = !1
                    }
                }, removeZeroClipboardClass: function () {
                    var e = this.hot.getPlugin("contextMenu");
                    if (e.enabled) {
                        if (e.menu.isOpened()) {
                            var t = e.menu.hotMenu.rootElement.querySelector("td.zeroclipboard-is-hover");
                            t && h(t, "zeroclipboard-is-hover")
                        }
                        this.hot.getSettings().outsideClickDeselects = this.outsideClickDeselectsCache
                    }
                }
            }, {}, c), m("contextMenuCopyPaste", w)
        }, {
            _base: 62,
            "contextMenu/predefinedItems": 75,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            plugins: 61,
            zeroclipboard: "zeroclipboard"
        }],
        90: [function (e, t, n) {
            "use strict";

            function o(e) {
                function t() {
                    e.isListening() && e.selection.empty()
                }

                function n(t) {
                    var n, o, r, i, s, a, l, u, c, d;
                    if (e.isListening() && e.selection.isSelected()) {
                        n = t, o = y.parse(n), r = e.getSelected(), i = new x(r[0], r[1]), s = new x(r[2], r[3]), a = new D(i, i, s), l = a.getTopLeftCorner(), u = a.getBottomRightCorner(), c = l, d = new x(Math.max(u.row, o.length - 1 + l.row), Math.max(u.col, o[0].length - 1 + l.col));
                        var h = s.row - i.row >= o.length - 1, f = s.col - i.col >= o[0].length - 1;
                        e.addHookOnce("afterChange", function (t, n) {
                            var o = t ? t.length : 0;
                            if (o) {
                                var r = {row: 0, col: 0}, i = -1;
                                R(t, function (e, n) {
                                    var s = o > n + 1 ? t[n + 1] : null;
                                    s && (h || (r.row = r.row + Math.max(s[0] - e[0] - 1, 0)), !f && e[1] > i && (i = e[1], r.col = r.col + Math.max(s[1] - e[1] - 1, 0)))
                                }), e.selectCell(c.row, c.col, d.row + r.row, d.col + r.col)
                            }
                        }), e.populateFromArray(c.row, c.col, o, d.row, d.col, "CopyPaste.paste", e.getSettings().pasteMode)
                    }
                }

                function o(t) {
                    if (e.getSelected() && !(e.getActiveEditor() && e.getActiveEditor().isOpened() || O(t))) {
                        if (_(t.keyCode)) {
                            if (e.getSettings().fragmentSelection && T()) return;
                            return r.setCopyableText(), void E(t)
                        }
                        var n = (t.ctrlKey || t.metaKey) && !t.altKey;
                        t.keyCode == C.A && n && e._registerTimeout(setTimeout(k(r.setCopyableText, r), 0))
                    }
                }

                var r = this;
                this.copyPasteInstance = v(), this.copyPasteInstance.onCut(t), this.copyPasteInstance.onPaste(n), this.onPaste = n, e.addHook("beforeKeyDown", o), this.destroy = function () {
                    this.copyPasteInstance && (this.copyPasteInstance.removeCallback(t), this.copyPasteInstance.removeCallback(n), this.copyPasteInstance.destroy(), this.copyPasteInstance = null), e.removeHook("beforeKeyDown", o)
                }, e.addHook("afterDestroy", k(this.destroy, this)), this.triggerPaste = k(this.copyPasteInstance.triggerPaste, this.copyPasteInstance), this.triggerCut = k(this.copyPasteInstance.triggerCut, this.copyPasteInstance), this.setCopyableText = function () {
                    var t = e.getSettings(), n = t.copyRowsLimit, o = t.copyColsLimit, r = e.getSelectedRange(),
                        i = r.getTopLeftCorner(), s = r.getBottomRightCorner(), a = i.row, l = i.col, u = s.row,
                        c = s.col, d = Math.min(u, a + n - 1), h = Math.min(c, l + o - 1), f = [];
                    f.push({
                        startRow: a,
                        startCol: l,
                        endRow: d,
                        endCol: h
                    }), f = w.hooks.run(e, "modifyCopyableRange", f);
                    var p = this.getRangedCopyableData(f);
                    e.copyPaste.copyPasteInstance.copyable(p), u === d && c === h || w.hooks.run(e, "afterCopyLimit", u - a + 1, c - l + 1, n, o)
                }, this.getRangedCopyableData = function (t) {
                    var n = [], o = [], r = [];
                    return R(t, function (e) {
                        M(e.startRow, e.endRow, function (e) {
                            o.indexOf(e) === -1 && o.push(e)
                        }), M(e.startCol, e.endCol, function (e) {
                            r.indexOf(e) === -1 && r.push(e)
                        })
                    }), R(o, function (t) {
                        var o = [];
                        R(r, function (n) {
                            o.push(e.getCopyableData(t, n))
                        }), n.push(o)
                    }), y.stringify(n)
                }
            }

            function r() {
                var e = this, t = e.getSettings().copyPaste !== !1;
                t && !e.copyPaste ? e.copyPaste = new o(e) : !t && e.copyPaste && (e.copyPaste.destroy(), e.copyPaste = null)
            }

            Object.defineProperties(n, {
                CopyPastePlugin: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var i, s, a, l, u, c, d, h, f, p, m, g,
                w = (i = e("browser"), i && i.__esModule && i || {default: i}).default,
                v = (s = e("copyPaste"), s && s.__esModule && s || {default: s}).default,
                y = (a = e("SheetClip"), a && a.__esModule && a || {default: a}).default,
                b = (l = e("helpers/unicode"), l && l.__esModule && l || {default: l}), C = b.KEY_CODES,
                _ = b.isCtrlKey, R = (u = e("helpers/array"), u && u.__esModule && u || {default: u}).arrayEach,
                M = (c = e("helpers/number"), c && c.__esModule && c || {default: c}).rangeEach,
                S = (d = e("helpers/dom/event"), d && d.__esModule && d || {default: d}),
                E = S.stopImmediatePropagation, O = S.isImmediatePropagationStopped,
                T = (h = e("helpers/dom/element"), h && h.__esModule && h || {default: h}).getSelectionText,
                k = (f = e("helpers/function"), f && f.__esModule && f || {default: f}).proxy,
                x = ((p = e("plugins"), p && p.__esModule && p || {default: p}).registerPlugin, (m = e("3rdparty/walkontable/src/cell/coords"), m && m.__esModule && m || {default: m}).WalkontableCellCoords),
                D = (g = e("3rdparty/walkontable/src/cell/range"), g && g.__esModule && g || {default: g}).WalkontableCellRange;
            w.hooks.add("afterInit", r), w.hooks.add("afterUpdateSettings", r), w.hooks.register("afterCopyLimit"), w.hooks.register("modifyCopyableRange")
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            "3rdparty/walkontable/src/cell/range": 7,
            SheetClip: "SheetClip",
            browser: 24,
            copyPaste: "copyPaste",
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/function": 50,
            "helpers/number": 52,
            "helpers/unicode": 56,
            plugins: 61
        }],
        91: [function (e, t, n) {
            "use strict";

            function o() {
            }

            var r, i, s, a, l, u = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                c = ((i = e("plugins"), i && i.__esModule && i || {default: i}).registerPlugin, (s = e("3rdparty/walkontable/src/cell/range"), s && s.__esModule && s || {default: s}).WalkontableCellRange),
                d = (a = e("3rdparty/walkontable/src/selection"), a && a.__esModule && a || {default: a}).WalkontableSelection,
                h = function (e) {
                    return "boolean" == typeof e && e === !0 || "object" == typeof e && e.length > 0
                }, f = function () {
                    h(this.getSettings().customBorders) && (this.customBorders || (l = this, this.customBorders = new o))
                }, p = function (e) {
                    for (var t = 0; t < l.view.wt.selections.length; t++) if (l.view.wt.selections[t].settings.className == e) return t;
                    return -1
                }, m = function (e) {
                    var t = {row: e.row, col: e.col}, n = new d(e, new c(t, t, t)), o = p(e.className);
                    o >= 0 ? l.view.wt.selections[o] = n : l.view.wt.selections.push(n)
                }, g = function (e, t, n) {
                    var o = _(e, t);
                    o = R(o, n), this.setCellMeta(e, t, "borders", o), m(o)
                }, w = function (e) {
                    for (var t = e.range, n = t.from.row; n <= t.to.row; n++) for (var o = t.from.col; o <= t.to.col; o++) {
                        var r = _(n, o), i = 0;
                        n == t.from.row && (i++, e.hasOwnProperty("top") && (r.top = e.top)), n == t.to.row && (i++, e.hasOwnProperty("bottom") && (r.bottom = e.bottom)), o == t.from.col && (i++, e.hasOwnProperty("left") && (r.left = e.left)), o == t.to.col && (i++, e.hasOwnProperty("right") && (r.right = e.right)), i > 0 && (this.setCellMeta(n, o, "borders", r), m(r))
                    }
                }, v = function (e, t) {
                    return "border_row" + e + "col" + t
                }, y = function () {
                    return {width: 1, color: "#000"}
                }, b = function () {
                    return {hide: !0}
                }, C = function () {
                    return {width: 1, color: "#000", cornerVisible: !1}
                }, _ = function (e, t) {
                    return {className: v(e, t), border: C(), row: e, col: t, top: b(), right: b(), bottom: b(), left: b()}
                }, R = function (e, t) {
                    return t.hasOwnProperty("border") && (e.border = t.border), t.hasOwnProperty("top") && (e.top = t.top), t.hasOwnProperty("right") && (e.right = t.right), t.hasOwnProperty("bottom") && (e.bottom = t.bottom), t.hasOwnProperty("left") && (e.left = t.left), e
                }, M = function (e) {
                    for (var t = document.querySelectorAll("." + e), n = 0; n < t.length; n++) if (t[n] && "TD" != t[n].nodeName) {
                        var o = t[n].parentNode;
                        o.parentNode && o.parentNode.removeChild(o)
                    }
                }, S = function (e, t) {
                    var n = v(e, t);
                    M(n), this.removeCellMeta(e, t, "borders")
                }, E = function (e, t, n, o) {
                    var r = this.getCellMeta(e, t).borders;
                    r && void 0 != r.border || (r = _(e, t)), o ? r[n] = b() : r[n] = y(), this.setCellMeta(e, t, "borders", r);
                    var i = v(e, t);
                    M(i), m(r), this.render()
                }, O = function (e, t, n) {
                    if (e.from.row == e.to.row && e.from.col == e.to.col) "noBorders" == t ? S.call(this, e.from.row, e.from.col) : E.call(this, e.from.row, e.from.col, t, n); else switch (t) {
                        case"noBorders":
                            for (var o = e.from.col; o <= e.to.col; o++) for (var r = e.from.row; r <= e.to.row; r++) S.call(this, r, o);
                            break;
                        case"top":
                            for (var i = e.from.col; i <= e.to.col; i++) E.call(this, e.from.row, i, t, n);
                            break;
                        case"right":
                            for (var s = e.from.row; s <= e.to.row; s++) E.call(this, s, e.to.col, t);
                            break;
                        case"bottom":
                            for (var a = e.from.col; a <= e.to.col; a++) E.call(this, e.to.row, a, t);
                            break;
                        case"left":
                            for (var l = e.from.row; l <= e.to.row; l++) E.call(this, l, e.from.col, t)
                    }
                }, T = function (e, t) {
                    var n = !1;
                    return e.getSelectedRange().forAll(function (o, r) {
                        var i = e.getCellMeta(o, r).borders;
                        if (i) {
                            if (!t) return n = !0, !1;
                            if (!i[t].hasOwnProperty("hide")) return n = !0, !1
                        }
                    }), n
                }, k = function (e) {
                    return '<span class="selected">' + String.fromCharCode(10003) + "</span>" + e
                }, x = function (e) {
                    this.getSettings().customBorders && (e.items.push(u.plugins.ContextMenu.SEPARATOR), e.items.push({
                        key: "borders",
                        name: "Borders",
                        disabled: function () {
                            return this.selection.selectedHeader.corner
                        },
                        submenu: {
                            items: [{
                                key: "borders:top", name: function () {
                                    var e = "Top", t = T(this, "top");
                                    return t && (e = k(e)), e
                                }, callback: function () {
                                    var e = T(this, "top");
                                    O.call(this, this.getSelectedRange(), "top", e)
                                }
                            }, {
                                key: "borders:right", name: function () {
                                    var e = "Right", t = T(this, "right");
                                    return t && (e = k(e)), e
                                }, callback: function () {
                                    var e = T(this, "right");
                                    O.call(this, this.getSelectedRange(), "right", e)
                                }
                            }, {
                                key: "borders:bottom", name: function () {
                                    var e = "Bottom", t = T(this, "bottom");
                                    return t && (e = k(e)), e
                                }, callback: function () {
                                    var e = T(this, "bottom");
                                    O.call(this, this.getSelectedRange(), "bottom", e)
                                }
                            }, {
                                key: "borders:left", name: function () {
                                    var e = "Left", t = T(this, "left");
                                    return t && (e = k(e)), e
                                }, callback: function () {
                                    var e = T(this, "left");
                                    O.call(this, this.getSelectedRange(), "left", e)
                                }
                            }, {
                                key: "borders:no_borders", name: "Remove border(s)", callback: function () {
                                    O.call(this, this.getSelectedRange(), "noBorders")
                                }, disabled: function () {
                                    return !T(this)
                                }
                            }]
                        }
                    }))
                };
            u.hooks.add("beforeInit", f), u.hooks.add("afterContextMenuDefaultOptions", x), u.hooks.add("afterInit", function () {
                var e = this.getSettings().customBorders;
                if (e) {
                    for (var t = 0; t < e.length; t++) e[t].range ? w.call(this, e[t]) : g.call(this, e[t].row, e[t].col, e[t]);
                    this.render(), this.view.wt.draw(!0)
                }
            }), u.CustomBorders = o
        }, {
            "3rdparty/walkontable/src/cell/range": 7,
            "3rdparty/walkontable/src/selection": 19,
            browser: 24,
            plugins: 61
        }],
        92: [function (e, t, n) {
            "use strict";

            function o() {
                this.boundaries = null, this.callback = null
            }

            Object.defineProperties(n, {
                DragToScroll: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                l = (i = e("eventManager"), i && i.__esModule && i || {default: i}).eventManager;
            (s = e("plugins"), s && s.__esModule && s || {default: s}).registerPlugin;
            a.plugins.DragToScroll = o, o.prototype.setBoundaries = function (e) {
                this.boundaries = e
            }, o.prototype.setCallback = function (e) {
                this.callback = e
            }, o.prototype.check = function (e, t) {
                var n = 0, o = 0;
                t < this.boundaries.top ? o = t - this.boundaries.top : t > this.boundaries.bottom && (o = t - this.boundaries.bottom), e < this.boundaries.left ? n = e - this.boundaries.left : e > this.boundaries.right && (n = e - this.boundaries.right), this.callback(n, o)
            };
            var u, c = function (e) {
                e.dragToScrollListening = !1;
                var t = e.view.wt.wtTable.holder;
                u = new o, t !== window && (u.setBoundaries(t.getBoundingClientRect()), u.setCallback(function (e, n) {
                    e < 0 ? t.scrollLeft -= 50 : e > 0 && (t.scrollLeft += 50), n < 0 ? t.scrollTop -= 20 : n > 0 && (t.scrollTop += 20)
                }), e.dragToScrollListening = !0)
            };
            a.hooks.add("afterInit", function () {
                var e = this, t = l(this);
                t.addEventListener(document, "mouseup", function () {
                    e.dragToScrollListening = !1
                }), t.addEventListener(document, "mousemove", function (t) {
                    e.dragToScrollListening && u.check(t.clientX, t.clientY)
                })
            }), a.hooks.add("afterDestroy", function () {
                l(this).clear()
            }), a.hooks.add("afterOnCellMouseDown", function () {
                c(this)
            }), a.hooks.add("afterOnCellCornerMouseDown", function () {
                c(this)
            }), a.plugins.DragToScroll = o
        }, {browser: 24, eventManager: 42, plugins: 61}],
        93: [function (e, t, n) {
            "use strict";

            function o(e) {
                return {
                    key: "freeze_column", name: "Freeze this column", callback: function () {
                        var t = this.getSelectedRange().from.col;
                        e.freezeColumn(t), this.render(), this.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, hidden: function () {
                        var e = this.getSelectedRange(), t = !1;
                        return void 0 === e ? t = !0 : (e.from.col !== e.to.col || e.from.col <= this.getSettings().fixedColumnsLeft - 1) && (t = !0), t
                    }
                }
            }

            Object.defineProperties(n, {
                freezeColumnItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        94: [function (e, t, n) {
            "use strict";

            function o(e) {
                return {
                    key: "unfreeze_column", name: "Unfreeze this column", callback: function () {
                        var t = this.getSelectedRange().from.col;
                        e.unfreezeColumn(t), this.render(), this.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, hidden: function () {
                        var e = this.getSelectedRange(), t = !1;
                        return void 0 === e ? t = !0 : (e.from.col !== e.to.col || e.from.col >= this.getSettings().fixedColumnsLeft) && (t = !0), t
                    }
                }
            }

            Object.defineProperties(n, {
                unfreezeColumnItem: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            })
        }, {}],
        95: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ManualColumnFreeze: {
                    get: function () {
                        return g
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("_base"), r && r.__esModule && r || {default: r}).default,
                d = (i = e("plugins"), i && i.__esModule && i || {default: i}).registerPlugin,
                h = (s = e("helpers/array"), s && s.__esModule && s || {default: s}).arrayEach,
                f = (a = e("contextMenuItem/freezeColumn"), a && a.__esModule && a || {default: a}).freezeColumnItem,
                p = (l = e("contextMenuItem/unfreezeColumn"), l && l.__esModule && l || {default: l}).unfreezeColumnItem,
                m = new WeakMap, g = function (e) {
                    $traceurRuntime.superConstructor(w).call(this, e), m.set(this, {
                        moveByFreeze: !1,
                        afterFirstUse: !1
                    }), this.frozenColumnsBasePositions = [], this.manualColumnMovePlugin = void 0
                }, w = g;
            $traceurRuntime.createClass(g, {
                isEnabled: function () {
                    return !!this.hot.getSettings().manualColumnFreeze
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.addHook("afterContextMenuDefaultOptions", function (t) {
                        return e.addContextMenuEntry(t)
                    }), this.addHook("afterInit", function () {
                        return e.onAfterInit()
                    }), this.addHook("beforeColumnMove", function (t, n) {
                        return e.onBeforeColumnMove(t, n)
                    }), $traceurRuntime.superGet(this, w.prototype, "enablePlugin").call(this))
                }, disablePlugin: function () {
                    var e = m.get(this);
                    e.afterFirstUse = !1, e.moveByFreeze = !1, $traceurRuntime.superGet(this, w.prototype, "disablePlugin").call(this)
                }, updatePlugin: function () {
                    this.disablePlugin(), this.enablePlugin(), $traceurRuntime.superGet(this, w.prototype, "updatePlugin").call(this)
                }, freezeColumn: function (e) {
                    var t = m.get(this), n = this.hot.getSettings();
                    t.afterFirstUse || (t.afterFirstUse = !0), n.fixedColumnsLeft === this.hot.countCols() || e <= n.fixedColumnsLeft - 1 || (t.moveByFreeze = !0, e !== this.getMovePlugin().columnsMapper.getValueByIndex(e) && (this.frozenColumnsBasePositions[n.fixedColumnsLeft] = e), this.getMovePlugin().moveColumn(e, n.fixedColumnsLeft++))
                }, unfreezeColumn: function (e) {
                    var t = m.get(this), n = this.hot.getSettings();
                    if (t.afterFirstUse || (t.afterFirstUse = !0), !(n.fixedColumnsLeft <= 0 || e > n.fixedColumnsLeft - 1)) {
                        var o = this.getBestColumnReturnPosition(e);
                        t.moveByFreeze = !0, n.fixedColumnsLeft--, this.getMovePlugin().moveColumn(e, o + 1)
                    }
                }, getMovePlugin: function () {
                    return this.manualColumnMovePlugin || (this.manualColumnMovePlugin = this.hot.getPlugin("manualColumnMove")), this.manualColumnMovePlugin
                }, getBestColumnReturnPosition: function (e) {
                    var t, n = this.getMovePlugin(), o = this.hot.getSettings(), r = o.fixedColumnsLeft,
                        i = n.columnsMapper.getValueByIndex(r);
                    if (null == this.frozenColumnsBasePositions[e]) for (t = n.columnsMapper.getValueByIndex(e); i < t;) r++, i = n.columnsMapper.getValueByIndex(r); else {
                        for (t = this.frozenColumnsBasePositions[e], this.frozenColumnsBasePositions[e] = void 0; i <= t;) r++, i = n.columnsMapper.getValueByIndex(r);
                        r = i
                    }
                    return r - 1
                }, addContextMenuEntry: function (e) {
                    e.items.push(u.plugins.ContextMenu.SEPARATOR, f(this), p(this))
                }, onAfterInit: function () {
                    this.getMovePlugin().isEnabled() || this.getMovePlugin().enablePlugin()
                }, onBeforeColumnMove: function (e, t) {
                    var n = m.get(this);
                    if (n.afterFirstUse && !n.moveByFreeze) {
                        var o = this.hot.getSettings().fixedColumnsLeft, r = t < o;
                        if (r || h(e, function (e, t, n) {
                            if (e < o) return r = !0, !1
                        }), r) return !1
                    }
                    n.moveByFreeze && (n.moveByFreeze = !1)
                }, destroy: function () {
                    $traceurRuntime.superGet(this, w.prototype, "destroy").call(this)
                }
            }, {}, c), d("manualColumnFreeze", g)
        }, {
            _base: 62,
            browser: 24,
            "contextMenuItem/freezeColumn": 93,
            "contextMenuItem/unfreezeColumn": 94,
            "helpers/array": 43,
            plugins: 61
        }],
        96: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ColumnsMapper: {
                    get: function () {
                        return f
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                u = (r = e("mixins/arrayMapper"), r && r.__esModule && r || {default: r}).arrayMapper,
                c = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayFilter,
                d = (s = e("helpers/object"), s && s.__esModule && s || {default: s}).mixin,
                h = (a = e("helpers/number"), a && a.__esModule && a || {default: a}).rangeEach, f = function (e) {
                    this.manualColumnMove = e
                };
            $traceurRuntime.createClass(f, {
                createMap: function (e) {
                    var t = this, n = void 0 === e ? this._arrayMap.length : e;
                    this._arrayMap.length = 0, h(n - 1, function (e) {
                        t._arrayMap[e] = e
                    })
                }, destroy: function () {
                    this._arrayMap = null
                }, moveColumn: function (e, t) {
                    var n = this._arrayMap[e];
                    this._arrayMap[e] = null, this._arrayMap.splice(t, 0, n)
                }, clearNull: function () {
                    this._arrayMap = c(this._arrayMap, function (e) {
                        return null !== e
                    })
                }
            }, {}), d(f, u), l.utils.ManualColumnMoveColumnsMapper = f
        }, {browser: 24, "helpers/array": 43, "helpers/number": 52, "helpers/object": 53, "mixins/arrayMapper": 57}],
        97: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ManualColumnMove: {
                    get: function () {
                        return D
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f = (o = e("_base.js"), o && o.__esModule && o || {default: o}).default,
                p = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                m = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                g = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}), w = g.addClass,
                v = g.removeClass, y = g.offset,
                b = (a = e("helpers/number"), a && a.__esModule && a || {default: a}).rangeEach,
                C = (l = e("eventManager"), l && l.__esModule && l || {default: l}).eventManager,
                _ = (u = e("plugins"), u && u.__esModule && u || {default: u}).registerPlugin,
                R = (c = e("columnsMapper"), c && c.__esModule && c || {default: c}).ColumnsMapper,
                M = (d = e("ui/backlight"), d && d.__esModule && d || {default: d}).BacklightUI,
                S = (h = e("ui/guideline"), h && h.__esModule && h || {default: h}).GuidelineUI, E = new WeakMap,
                O = "ht__manualColumnMove", T = "show-ui", k = "on-moving--columns", x = "after-selection--columns",
                D = function (e) {
                    $traceurRuntime.superConstructor(H).call(this, e), E.set(this, {
                        columnsToMove: [],
                        countCols: 0,
                        fixedColumns: 0,
                        pressed: void 0,
                        disallowMoving: void 0,
                        target: {eventPageX: void 0, coords: void 0, TD: void 0, col: void 0}
                    }), this.removedColumns = [], this.columnsMapper = new R(this), this.eventManager = C(this), this.backlight = new M(e), this.guideline = new S(e)
                }, H = D;
            $traceurRuntime.createClass(D, {
                isEnabled: function () {
                    return !!this.hot.getSettings().manualColumnMove
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.addHook("beforeOnCellMouseDown", function (t, n, o, r) {
                        return e.onBeforeOnCellMouseDown(t, n, o, r)
                    }), this.addHook("beforeOnCellMouseOver", function (t, n, o, r) {
                        return e.onBeforeOnCellMouseOver(t, n, o, r)
                    }), this.addHook("afterScrollVertically", function () {
                        return e.onAfterScrollVertically()
                    }), this.addHook("modifyCol", function (t, n) {
                        return e.onModifyCol(t, n)
                    }), this.addHook("beforeRemoveCol", function (t, n) {
                        return e.onBeforeRemoveCol(t, n)
                    }), this.addHook("afterRemoveCol", function (t, n) {
                        return e.onAfterRemoveCol(t, n)
                    }), this.addHook("afterCreateCol", function (t, n) {
                        return e.onAfterCreateCol(t, n)
                    }), this.addHook("unmodifyCol", function (t) {
                        return e.onUnmodifyCol(t)
                    }), this.registerEvents(), w(this.hot.rootElement, O), $traceurRuntime.superGet(this, H.prototype, "enablePlugin").call(this))
                }, updatePlugin: function () {
                    this.disablePlugin(), this.enablePlugin(), this.onAfterPluginsInitialized(), $traceurRuntime.superGet(this, H.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    var e = this.hot.getSettings().manualColumnMove;
                    Array.isArray(e) && this.columnsMapper.clearMap(), v(this.hot.rootElement, O), this.unregisterEvents(), this.backlight.destroy(), this.guideline.destroy(), $traceurRuntime.superGet(this, H.prototype, "disablePlugin").call(this)
                }, moveColumn: function (e, t) {
                    this.moveColumns([e], t)
                }, moveColumns: function (e, t) {
                    var n = this, o = E.get(this), r = this.hot.runHooks("beforeColumnMove", e, t);
                    o.disallowMoving = !r, r !== !1 && (m(e, function (e, t, o) {
                        o[t] = n.columnsMapper.getValueByIndex(e)
                    }), m(e, function (e, o) {
                        var r = n.columnsMapper.getIndexByValue(e);
                        r !== t && n.columnsMapper.moveColumn(r, t + o)
                    }), this.columnsMapper.clearNull()), this.hot.runHooks("afterColumnMove", e, t)
                }, changeSelection: function (e, t) {
                    var n = this.hot.selection, o = this.hot.countRows() - 1;
                    n.setRangeStartOnly(new WalkontableCellCoords(0, e)), n.setRangeEnd(new WalkontableCellCoords(o, t), !1)
                }, getColumnsWidth: function (e, t) {
                    for (var n = 0, o = e; o < t; o++) {
                        var r = 0;
                        r = o < 0 ? this.hot.view.wt.wtTable.getColumnWidth(o) || 0 : this.hot.view.wt.wtTable.getStretchedColumnWidth(o) || 0, n += r
                    }
                    return n
                }, initialSettings: function () {
                    var e = this.hot.getSettings().manualColumnMove;
                    Array.isArray(e) ? this.moveColumns(e, 0) : void 0 !== e && this.persistentStateLoad()
                }, isFixedColumnsLeft: function (e) {
                    return e < this.hot.getSettings().fixedColumnsLeft
                }, persistentStateSave: function () {
                    p.hooks.run(this.hot, "persistentStateSave", "manualColumnMove", this.columnsMapper._arrayMap)
                }, persistentStateLoad: function () {
                    var e = {};
                    p.hooks.run(this.hot, "persistentStateLoad", "manualColumnMove", e), e.value && (this.columnsMapper._arrayMap = e.value)
                }, prepareColumnsToMoving: function (e, t) {
                    var n = [];
                    return b(e, t, function (e) {
                        n.push(e)
                    }), n
                }, refreshPositions: function () {
                    var e = E.get(this), t = this.hot.view.wt.wtTable.getFirstVisibleColumn(),
                        n = this.hot.view.wt.wtTable.getLastVisibleColumn(), o = this.hot.view.wt.wtTable,
                        r = this.hot.view.wt.wtOverlays.scrollableElement,
                        i = "number" == typeof r.scrollX ? r.scrollX : r.scrollLeft,
                        s = this.hot.view.THEAD.offsetLeft + this.getColumnsWidth(0, e.coordsColumn),
                        a = e.target.eventPageX - (e.rootElementOffset - (void 0 === r.scrollX ? i : 0)),
                        l = o.hider.offsetWidth, u = o.TBODY.offsetLeft, c = this.backlight.getOffset().left,
                        d = this.backlight.getSize().width, h = 0;
                    if (e.rootElementOffset + o.holder.offsetWidth + i < e.target.eventPageX && e.coordsColumn < e.countCols && e.coordsColumn++, e.hasRowHeaders && (h = this.hot.view.wt.wtOverlays.leftOverlay.clone.wtTable.getColumnHeader(-1).offsetWidth), this.isFixedColumnsLeft(e.coordsColumn) && (s += i), s += h, e.coordsColumn < 0) e.fixedColumns > 0 ? e.target.col = 0 : e.target.col = t > 0 ? t - 1 : t; else if (e.target.TD.offsetWidth / 2 + s <= a) {
                        var f = e.coordsColumn >= e.countCols ? e.countCols - 1 : e.coordsColumn;
                        e.target.col = f + 1, s += e.target.TD.offsetWidth, e.target.col > n && this.hot.scrollViewportTo(void 0, n + 1, void 0, !0)
                    } else e.target.col = e.coordsColumn, e.target.col <= t && e.target.col >= e.fixedColumns && this.hot.scrollViewportTo(void 0, t - 1);
                    e.target.col <= t && e.target.col >= e.fixedColumns && this.hot.scrollViewportTo(void 0, t - 1);
                    var p = a, m = s;
                    a + d + c >= l ? p = l - d - c : a + c < u + h && (p = u + h + Math.abs(c)), s >= l - 1 ? m = l - 1 : 0 === m ? m = 1 : void 0 !== r.scrollX && e.coordsColumn < e.fixedColumns && (m -= e.rootElementOffset <= r.scrollX ? e.rootElementOffset : 0), this.backlight.setPosition(null, p), this.guideline.setPosition(null, m)
                }, registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(document.documentElement, "mousemove", function (t) {
                        return e.onMouseMove(t)
                    }), this.eventManager.addEventListener(document.documentElement, "mouseup", function () {
                        return e.onMouseUp()
                    })
                }, unregisterEvents: function () {
                    this.eventManager.clear()
                }, onBeforeOnCellMouseDown: function (e, t, n, o) {
                    var r = this.hot.view.wt.wtTable, i = this.hot.selection.selectedHeader.cols,
                        s = this.hot.getSelectedRange(), a = E.get(this),
                        l = e.realTarget.className.indexOf("columnSorting") > -1;
                    if (!s || !i || a.pressed || 0 !== e.button || l) return a.pressed = !1, a.columnsToMove.length = 0, void v(this.hot.rootElement, [k, T]);
                    var u = this.guideline.isBuilt() && !this.guideline.isAppended(),
                        c = this.backlight.isBuilt() && !this.backlight.isAppended();
                    u && c && (this.guideline.appendTo(r.hider), this.backlight.appendTo(r.hider));
                    var d = s, h = d.from, f = d.to, p = Math.min(h.col, f.col), m = Math.max(h.col, f.col);
                    if (t.row < 0 && t.col >= p && t.col <= m) {
                        o.column = !0, a.pressed = !0, a.target.eventPageX = e.pageX, a.coordsColumn = t.col, a.target.TD = n, a.target.col = t.col, a.columnsToMove = this.prepareColumnsToMoving(p, m), a.hasRowHeaders = !!this.hot.getSettings().rowHeaders, a.countCols = this.hot.countCols(), a.fixedColumns = this.hot.getSettings().fixedColumnsLeft, a.rootElementOffset = y(this.hot.rootElement).left;
                        var g = a.hasRowHeaders ? -1 : 0, b = r.holder.scrollTop + r.getColumnHeaderHeight(0) + 1,
                            C = t.col < a.fixedColumns, _ = this.hot.view.wt.wtOverlays.scrollableElement,
                            R = _.scrollX ? _.scrollX - a.rootElementOffset : 0, M = e.layerX - (C ? R : 0),
                            S = Math.abs(this.getColumnsWidth(p, t.col) + M);
                        this.backlight.setPosition(b, this.getColumnsWidth(g, p) + S), this.backlight.setSize(this.getColumnsWidth(p, m + 1), r.hider.offsetHeight - b), this.backlight.setOffset(null, S * -1), w(this.hot.rootElement, k)
                    } else v(this.hot.rootElement, x), a.pressed = !1, a.columnsToMove.length = 0
                }, onMouseMove: function (e) {
                    var t = E.get(this);
                    if (t.pressed) {
                        if (e.realTarget === this.backlight.element) {
                            var n = this.backlight.getSize().width;
                            this.backlight.setSize(0), setTimeout(function () {
                                this.backlight.setPosition(n)
                            })
                        }
                        t.target.eventPageX = e.pageX, this.refreshPositions()
                    }
                }, onBeforeOnCellMouseOver: function (e, t, n, o) {
                    var r = this.hot.getSelectedRange(), i = E.get(this);
                    r && i.pressed && (i.columnsToMove.indexOf(t.col) > -1 ? v(this.hot.rootElement, T) : w(this.hot.rootElement, T), o.row = !0, o.column = !0, o.cell = !0, i.coordsColumn = t.col, i.target.TD = n)
                }, onMouseUp: function () {
                    var e = E.get(this);
                    if (e.coordsColumn = void 0, e.pressed = !1, e.backlightWidth = 0, v(this.hot.rootElement, [k, T, x]), this.hot.selection.selectedHeader.cols && w(this.hot.rootElement, x), !(e.columnsToMove.length < 1 || void 0 === e.target.col || e.columnsToMove.indexOf(e.target.col) > -1)) {
                        if (this.moveColumns(e.columnsToMove, e.target.col), this.persistentStateSave(), this.hot.render(), this.hot.view.wt.wtOverlays.adjustElementsSize(!0), !e.disallowMoving) {
                            var t = this.columnsMapper.getIndexByValue(e.columnsToMove[0]),
                                n = this.columnsMapper.getIndexByValue(e.columnsToMove[e.columnsToMove.length - 1]);
                            this.changeSelection(t, n)
                        }
                        e.columnsToMove.length = 0
                    }
                }, onAfterScrollVertically: function () {
                    var e = this.hot.view.wt.wtTable, t = e.getColumnHeaderHeight(0) + 1, n = e.holder.scrollTop,
                        o = t + n;
                    this.backlight.setPosition(o), this.backlight.setSize(null, e.hider.offsetHeight - o)
                }, onAfterCreateCol: function (e, t) {
                    this.columnsMapper.shiftItems(e, t)
                }, onBeforeRemoveCol: function (e, t) {
                    var n = this;
                    this.removedColumns.length = 0, e !== !1 && b(e, e + t - 1, function (e) {
                        n.removedColumns.push(n.hot.runHooks("modifyCol", e, n.pluginName))
                    })
                }, onAfterRemoveCol: function (e, t) {
                    this.columnsMapper.unshiftItems(this.removedColumns)
                }, onModifyCol: function (e, t) {
                    if (t !== this.pluginName) {
                        var n = this.columnsMapper.getValueByIndex(e);
                        e = null === n ? e : n
                    }
                    return e
                }, onUnmodifyCol: function (e) {
                    var t = this.columnsMapper.getIndexByValue(e);
                    return e = null === t ? e : t
                }, onAfterPluginsInitialized: function () {
                    var e = this.hot.countCols(), t = this.columnsMapper._arrayMap.length;
                    if (0 === t) this.columnsMapper.createMap(this.hot.countSourceCols() || this.hot.getSettings().startCols); else if (t < e) {
                        var n = e - t;
                        this.columnsMapper.insertItems(t, n)
                    } else if (t > e) {
                        var o = e - 1, r = [];
                        m(this.columnsMapper._arrayMap, function (e, t, n) {
                            e > o && r.push(t)
                        }), this.columnsMapper.removeItems(r)
                    }
                    this.initialSettings(), this.backlight.build(), this.guideline.build()
                }, destroy: function () {
                    this.backlight.destroy(), this.guideline.destroy(), $traceurRuntime.superGet(this, H.prototype, "destroy").call(this)
                }
            }, {}, f), _("ManualColumnMove", D), p.hooks.register("beforeColumnMove"), p.hooks.register("afterColumnMove"), p.hooks.register("unmodifyCol")
        }, {
            "_base.js": 62,
            browser: 24,
            columnsMapper: 96,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/number": 52,
            plugins: 61,
            "ui/backlight": 99,
            "ui/guideline": 100
        }],
        98: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                BaseUI: {
                    get: function () {
                        return u
                    }
                }, __esModule: {value: !0}
            });
            var o, r = (o = e("helpers/number"), o && o.__esModule && o || {default: o}).isNumeric, i = 0, s = 1, a = 2,
                l = "px", u = function (e) {
                    this.hot = e, this._element = null, this.state = i
                };
            $traceurRuntime.createClass(u, {
                appendTo: function (e) {
                    e.appendChild(this._element), this.state = a
                }, build: function () {
                    this._element = document.createElement("div"), this.state = s
                }, destroy: function () {
                    this.isAppended() && this._element.parentElement.removeChild(this._element), this._element = null, this.state = i
                }, isAppended: function () {
                    return this.state === a
                }, isBuilt: function () {
                    return this.state >= s
                }, setPosition: function (e, t) {
                    r(e) && (this._element.style.top = e + l), r(t) && (this._element.style.left = t + l)
                }, getPosition: function () {
                    return {
                        top: this._element.style.top ? parseInt(this._element.style.top, 10) : 0,
                        left: this._element.style.left ? parseInt(this._element.style.left, 10) : 0
                    }
                }, setSize: function (e, t) {
                    r(e) && (this._element.style.width = e + l), r(t) && (this._element.style.height = t + l)
                }, getSize: function () {
                    return {
                        width: this._element.style.width ? parseInt(this._element.style.width, 10) : 0,
                        height: this._element.style.height ? parseInt(this._element.style.height, 10) : 0
                    }
                }, setOffset: function (e, t) {
                    r(e) && (this._element.style.marginTop = e + l), r(t) && (this._element.style.marginLeft = t + l)
                }, getOffset: function () {
                    return {
                        top: this._element.style.marginTop ? parseInt(this._element.style.marginTop, 10) : 0,
                        left: this._element.style.marginLeft ? parseInt(this._element.style.marginLeft, 10) : 0
                    }
                }
            }, {})
        }, {"helpers/number": 52}],
        99: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                BacklightUI: {
                    get: function () {
                        return l
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("_base"), o && o.__esModule && o || {default: o}).BaseUI,
                s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).addClass,
                a = "ht__manualColumnMove--backlight", l = function (e) {
                    $traceurRuntime.superConstructor(u).call(this, e)
                }, u = l;
            $traceurRuntime.createClass(l, {
                build: function () {
                    $traceurRuntime.superGet(this, u.prototype, "build").call(this), s(this._element, a)
                }
            }, {}, i)
        }, {_base: 98, "helpers/dom/element": 47}],
        100: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                GuidelineUI: {
                    get: function () {
                        return l
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("_base"), o && o.__esModule && o || {default: o}).BaseUI,
                s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).addClass,
                a = "ht__manualColumnMove--guideline", l = function (e) {
                    $traceurRuntime.superConstructor(u).call(this, e)
                }, u = l;
            $traceurRuntime.createClass(l, {
                build: function () {
                    $traceurRuntime.superGet(this, u.prototype, "build").call(this), s(this._element, a)
                }
            }, {}, i)
        }, {_base: 98, "helpers/dom/element": 47}],
        101: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ManualColumnResize: {
                    get: function () {
                        return M
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                h = (r = e("_base.js"), r && r.__esModule && r || {default: r}).default,
                f = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), p = f.addClass,
                m = f.hasClass, g = f.removeClass, w = f.outerHeight,
                v = (s = e("eventManager"), s && s.__esModule && s || {default: s}).eventManager,
                y = (a = e("helpers/dom/event"), a && a.__esModule && a || {default: a}), b = y.pageX,
                C = (y.pageY, (l = e("helpers/array"), l && l.__esModule && l || {default: l}).arrayEach),
                _ = (u = e("helpers/number"), u && u.__esModule && u || {default: u}).rangeEach,
                R = (c = e("plugins"), c && c.__esModule && c || {default: c}).registerPlugin, M = function (e) {
                    $traceurRuntime.superConstructor(S).call(this, e), this.currentTH = null, this.currentCol = null, this.selectedCols = [], this.currentWidth = null, this.newSize = null, this.startY = null, this.startWidth = null, this.startOffset = null, this.handle = document.createElement("DIV"), this.guide = document.createElement("DIV"), this.eventManager = v(this), this.pressed = null, this.dblclick = 0, this.autoresizeTimeout = null, this.manualColumnWidths = [], p(this.handle, "manualColumnResizer"), p(this.guide, "manualColumnResizerGuide")
                }, S = M;
            $traceurRuntime.createClass(M, {
                isEnabled: function () {
                    return this.hot.getSettings().manualColumnResize
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        this.manualColumnWidths = [];
                        var t = this.hot.getSettings().manualColumnResize, n = this.loadManualColumnWidths();
                        this.addHook("modifyColWidth", function (t, n) {
                            return e.onModifyColWidth(t, n)
                        }), this.addHook("beforeStretchingColumnWidth", function (t, n) {
                            return e.onBeforeStretchingColumnWidth(t, n)
                        }), this.addHook("beforeColumnResize", function (t, n, o) {
                            return e.onBeforeColumnResize(t, n, o)
                        }), "undefined" != typeof n ? this.manualColumnWidths = n : Array.isArray(t) ? this.manualColumnWidths = t : this.manualColumnWidths = [], d.hooks.register("beforeColumnResize"), d.hooks.register("afterColumnResize"), this.bindEvents(), $traceurRuntime.superGet(this, S.prototype, "enablePlugin").call(this)
                    }
                }, updatePlugin: function () {
                    var e = this.hot.getSettings().manualColumnResize;
                    Array.isArray(e) ? this.manualColumnWidths = e : e || (this.manualColumnWidths = [])
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, S.prototype, "disablePlugin").call(this)
                }, saveManualColumnWidths: function () {
                    this.hot.runHooks("persistentStateSave", "manualColumnWidths", this.manualColumnWidths)
                }, loadManualColumnWidths: function () {
                    var e = {};
                    return this.hot.runHooks("persistentStateLoad", "manualColumnWidths", e), e.value
                }, setupHandlePosition: function (e) {
                    var t = this;
                    if (!e.parentNode) return !1;
                    this.currentTH = e;
                    var n = this.hot.view.wt.wtTable.getCoords(e).col, o = w(this.currentTH);
                    if (n >= 0) {
                        var r = this.currentTH.getBoundingClientRect();
                        if (this.currentCol = n, this.selectedCols = [], this.hot.selection.isSelected() && this.hot.selection.selectedHeader.cols) {
                            var i = this.hot.getSelectedRange(), s = i.from, a = i.to, l = s.col, u = a.col;
                            l >= u && (l = a.col, u = s.col), this.currentCol >= l && this.currentCol <= u ? _(l, u, function (e) {
                                return t.selectedCols.push(e)
                            }) : this.selectedCols.push(this.currentCol)
                        } else this.selectedCols.push(this.currentCol);
                        this.startOffset = r.left - 6, this.startWidth = parseInt(r.width, 10), this.handle.style.top = r.top + "px", this.handle.style.left = this.startOffset + this.startWidth + "px", this.handle.style.height = o + "px", this.hot.rootElement.appendChild(this.handle)
                    }
                }, refreshHandlePosition: function () {
                    this.handle.style.left = this.startOffset + this.currentWidth + "px"
                }, setupGuidePosition: function () {
                    var e = parseInt(w(this.handle), 10), t = parseInt(this.handle.style.top, 10) + e,
                        n = parseInt(this.hot.view.maximumVisibleElementHeight(0), 10);
                    p(this.handle, "active"), p(this.guide, "active"), this.guide.style.top = t + "px", this.guide.style.left = this.handle.style.left, this.guide.style.height = n - e + "px", this.hot.rootElement.appendChild(this.guide)
                }, refreshGuidePosition: function () {
                    this.guide.style.left = this.handle.style.left
                }, hideHandleAndGuide: function () {
                    g(this.handle, "active"), g(this.guide, "active")
                }, checkIfColumnHeader: function (e) {
                    if (e != this.hot.rootElement) {
                        var t = e.parentNode;
                        return "THEAD" === t.tagName || this.checkIfColumnHeader(t)
                    }
                    return !1
                }, getTHFromTargetElement: function (e) {
                    return "TABLE" != e.tagName ? "TH" == e.tagName ? e : this.getTHFromTargetElement(e.parentNode) : null
                }, onMouseOver: function (e) {
                    if (this.checkIfColumnHeader(e.target)) {
                        var t = this.getTHFromTargetElement(e.target);
                        if (!t) return;
                        var n = t.getAttribute("colspan");
                        !t || null !== n && 1 !== n || this.pressed || this.setupHandlePosition(t)
                    }
                }, afterMouseDownTimeout: function () {
                    var e = this, t = function () {
                        e.hot.forceFullRender = !0, e.hot.view.render(), e.hot.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, n = function (n, o) {
                        var r = e.hot.runHooks("beforeColumnResize", n, e.newSize, !0);
                        void 0 !== r && (e.newSize = r), "all" === e.hot.getSettings().stretchH ? e.clearManualSize(n) : e.setManualSize(n, e.newSize), o && t(), e.saveManualColumnWidths(), e.hot.runHooks("afterColumnResize", n, e.newSize, !0)
                    };
                    if (this.dblclick >= 2) {
                        var o = this.selectedCols.length;
                        o > 1 ? (C(this.selectedCols, function (e) {
                            n(e)
                        }), t()) : C(this.selectedCols, function (e) {
                            n(e, !0)
                        })
                    }
                    this.dblclick = 0, this.autoresizeTimeout = null
                }, onMouseDown: function (e) {
                    var t = this;
                    m(e.target, "manualColumnResizer") && (this.setupGuidePosition(), this.pressed = this.hot, null === this.autoresizeTimeout && (this.autoresizeTimeout = setTimeout(function () {
                        return t.afterMouseDownTimeout()
                    }, 500), this.hot._registerTimeout(this.autoresizeTimeout)), this.dblclick++, this.startX = b(e), this.newSize = this.startWidth)
                }, onMouseMove: function (e) {
                    var t = this;
                    this.pressed && (this.currentWidth = this.startWidth + (b(e) - this.startX), C(this.selectedCols, function (e) {
                        t.newSize = t.setManualSize(e, t.currentWidth)
                    }), this.refreshHandlePosition(), this.refreshGuidePosition())
                }, onMouseUp: function (e) {
                    var t = this, n = function () {
                        t.hot.forceFullRender = !0, t.hot.view.render(), t.hot.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, o = function (e, o) {
                        t.hot.runHooks("beforeColumnResize", e, t.newSize), o && n(), t.saveManualColumnWidths(), t.hot.runHooks("afterColumnResize", e, t.newSize)
                    };
                    if (this.pressed) {
                        if (this.hideHandleAndGuide(), this.pressed = !1, this.newSize != this.startWidth) {
                            var r = this.selectedCols.length;
                            r > 1 ? (C(this.selectedCols, function (e) {
                                o(e)
                            }), n()) : C(this.selectedCols, function (e) {
                                o(e, !0)
                            })
                        }
                        this.setupHandlePosition(this.currentTH)
                    }
                }, bindEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(this.hot.rootElement, "mouseover", function (t) {
                        return e.onMouseOver(t)
                    }), this.eventManager.addEventListener(this.hot.rootElement, "mousedown", function (t) {
                        return e.onMouseDown(t)
                    }), this.eventManager.addEventListener(window, "mousemove", function (t) {
                        return e.onMouseMove(t)
                    }), this.eventManager.addEventListener(window, "mouseup", function (t) {
                        return e.onMouseUp(t)
                    })
                }, setManualSize: function (e, t) {
                    return t = Math.max(t, 20), e = this.hot.runHooks("modifyCol", e), this.manualColumnWidths[e] = t, t
                }, clearManualSize: function (e) {
                    e = this.hot.runHooks("modifyCol", e), this.manualColumnWidths[e] = void 0
                }, onModifyColWidth: function (e, t) {
                    return this.enabled && (t = this.hot.runHooks("modifyCol", t), this.hot.getSettings().manualColumnResize && this.manualColumnWidths[t]) ? this.manualColumnWidths[t] : e
                }, onBeforeStretchingColumnWidth: function (e, t) {
                    var n = this.manualColumnWidths[t];
                    return void 0 === n && (n = e), n
                }, onBeforeColumnResize: function () {
                    this.hot.view.wt.wtViewport.hasOversizedColumnHeadersMarked = {}
                }
            }, {}, h), R("manualColumnResize", M)
        }, {
            "_base.js": 62,
            browser: 24,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/number": 52,
            plugins: 61
        }],
        102: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ManualRowMove: {
                    get: function () {
                        return D
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d, h, f = (o = e("_base.js"), o && o.__esModule && o || {default: o}).default,
                p = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                m = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                g = (s = e("helpers/dom/element"), s && s.__esModule && s || {default: s}), w = g.addClass,
                v = g.removeClass, y = g.offset,
                b = (a = e("helpers/number"), a && a.__esModule && a || {default: a}).rangeEach,
                C = (l = e("eventManager"), l && l.__esModule && l || {default: l}).eventManager,
                _ = (u = e("plugins"), u && u.__esModule && u || {default: u}).registerPlugin,
                R = (c = e("rowsMapper"), c && c.__esModule && c || {default: c}).RowsMapper,
                M = (d = e("ui/backlight"), d && d.__esModule && d || {default: d}).BacklightUI,
                S = (h = e("ui/guideline"), h && h.__esModule && h || {default: h}).GuidelineUI, E = new WeakMap,
                O = "ht__manualRowMove", T = "show-ui", k = "on-moving--rows", x = "after-selection--rows",
                D = function (e) {
                    $traceurRuntime.superConstructor(H).call(this, e), E.set(this, {
                        rowsToMove: [],
                        pressed: void 0,
                        disallowMoving: void 0,
                        target: {eventPageY: void 0, coords: void 0, TD: void 0, row: void 0}
                    }), this.removedRows = [], this.rowsMapper = new R(this), this.eventManager = C(this), this.backlight = new M(e), this.guideline = new S(e)
                }, H = D;
            $traceurRuntime.createClass(D, {
                isEnabled: function () {
                    return !!this.hot.getSettings().manualRowMove
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.addHook("beforeOnCellMouseDown", function (t, n, o, r) {
                        return e.onBeforeOnCellMouseDown(t, n, o, r)
                    }), this.addHook("beforeOnCellMouseOver", function (t, n, o, r) {
                        return e.onBeforeOnCellMouseOver(t, n, o, r)
                    }), this.addHook("afterScrollHorizontally", function () {
                        return e.onAfterScrollHorizontally()
                    }), this.addHook("modifyRow", function (t, n) {
                        return e.onModifyRow(t, n)
                    }), this.addHook("beforeRemoveRow", function (t, n) {
                        return e.onBeforeRemoveRow(t, n)
                    }), this.addHook("afterRemoveRow", function (t, n) {
                        return e.onAfterRemoveRow(t, n)
                    }), this.addHook("afterCreateRow", function (t, n) {
                        return e.onAfterCreateRow(t, n)
                    }), this.addHook("afterLoadData", function (t) {
                        return e.onAfterLoadData(t)
                    }), this.addHook("beforeColumnSort", function (t, n) {
                        return e.onBeforeColumnSort(t, n)
                    }), this.addHook("unmodifyRow", function (t) {
                        return e.onUnmodifyRow(t)
                    }), this.registerEvents(), w(this.hot.rootElement, O), $traceurRuntime.superGet(this, H.prototype, "enablePlugin").call(this))
                }, updatePlugin: function () {
                    this.disablePlugin(), this.enablePlugin(), this.onAfterPluginsInitialized(), $traceurRuntime.superGet(this, H.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    var e = this.hot.getSettings().manualRowMove;
                    Array.isArray(e) && this.rowsMapper.clearMap(), v(this.hot.rootElement, O), this.unregisterEvents(), this.backlight.destroy(), this.guideline.destroy(), $traceurRuntime.superGet(this, H.prototype, "disablePlugin").call(this)
                }, moveRow: function (e, t) {
                    this.moveRows([e], t)
                }, moveRows: function (e, t) {
                    var n = this, o = E.get(this), r = this.hot.runHooks("beforeRowMove", e, t);
                    o.disallowMoving = r === !1, o.disallowMoving || (m(e, function (e, t, o) {
                        o[t] = n.rowsMapper.getValueByIndex(e)
                    }), m(e, function (e, o) {
                        var r = n.rowsMapper.getIndexByValue(e);
                        r !== t && n.rowsMapper.moveRow(r, t + o)
                    }), this.rowsMapper.clearNull()), this.hot.runHooks("afterRowMove", e, t)
                }, changeSelection: function (e, t) {
                    var n = this.hot.selection, o = this.hot.countCols() - 1;
                    n.setRangeStartOnly(new WalkontableCellCoords(e, 0)), n.setRangeEnd(new WalkontableCellCoords(t, o), !1)
                }, getRowsHeight: function (e, t) {
                    for (var n = 0, o = e; o < t; o++) {
                        var r = this.hot.view.wt.wtTable.getRowHeight(o) || 23;
                        n += r
                    }
                    return n
                }, initialSettings: function () {
                    var e = this.hot.getSettings().manualRowMove;
                    if (Array.isArray(e)) this.moveRows(e, 0); else if (void 0 !== e) {
                        var t = this.persistentStateLoad();
                        t.length && this.moveRows(t, 0)
                    }
                }, isFixedRowTop: function (e) {
                    return e < this.hot.getSettings().fixedRowsTop
                }, isFixedRowBottom: function (e) {
                    return e > this.hot.getSettings().fixedRowsBottom
                }, persistentStateSave: function () {
                    p.hooks.run(this.hot, "persistentStateSave", "manualRowMove", this.rowsMapper._arrayMap)
                }, persistentStateLoad: function () {
                    var e = {};
                    return p.hooks.run(this.hot, "persistentStateLoad", "manualRowMove", e), e.value ? e.value : []
                }, prepareRowsToMoving: function () {
                    var e = this.hot.getSelectedRange(), t = [];
                    if (!e) return t;
                    var n = e, o = n.from, r = n.to, i = Math.min(o.row, r.row), s = Math.max(o.row, r.row);
                    return b(i, s, function (e) {
                        t.push(e)
                    }), t
                }, refreshPositions: function () {
                    var e = E.get(this), t = e.target.coords, n = this.hot.view.wt.wtTable.getFirstVisibleRow(),
                        o = this.hot.view.wt.wtTable.getLastVisibleRow(), r = this.hot.getSettings().fixedRowsTop,
                        i = this.hot.countRows();
                    t.row < r && n > 0 && this.hot.scrollViewportTo(n - 1), t.row >= o && o < i && this.hot.scrollViewportTo(o + 1, void 0, !0);
                    var s = this.hot.view.wt.wtTable, a = e.target.TD, l = y(this.hot.rootElement),
                        u = this.hot.view.THEAD.offsetHeight + this.getRowsHeight(0, t.row),
                        c = e.target.eventPageY - l.top + s.holder.scrollTop, d = s.hider.offsetHeight,
                        h = s.TBODY.offsetTop, f = this.backlight.getOffset().top, p = this.backlight.getSize().height;
                    l.top + s.holder.offsetHeight < e.target.eventPageY && e.target.coords.row++, this.isFixedRowTop(t.row) && (u += s.holder.scrollTop), t.row < 0 ? e.target.row = n > 0 ? n - 1 : n : a.offsetHeight / 2 + u <= c ? (e.target.row = t.row + 1, u += 0 === t.row ? a.offsetHeight - 1 : a.offsetHeight) : e.target.row = t.row;
                    var m = c, g = u;
                    c + p + f >= d ? m = d - p - f : c + f < h && (m = h + Math.abs(f)), u >= d - 1 && (g = d - 1);
                    var w = 0;
                    this.hot.view.wt.wtOverlays.topOverlay && (w = this.hot.view.wt.wtOverlays.topOverlay.clone.wtTable.TABLE.offsetHeight), t.row >= r && g - s.holder.scrollTop < w && this.hot.scrollViewportTo(t.row), this.backlight.setPosition(m), this.guideline.setPosition(g)
                }, updateRowsMapper: function () {
                    var e = this.hot.countSourceRows(), t = this.rowsMapper._arrayMap.length;
                    if (0 === t) this.rowsMapper.createMap(e || this.hot.getSettings().startRows); else if (t < e) {
                        var n = e - t;
                        this.rowsMapper.insertItems(t, n)
                    } else if (t > e) {
                        var o = e - 1, r = [];
                        m(this.rowsMapper._arrayMap, function (e, t, n) {
                            e > o && r.push(t)
                        }), this.rowsMapper.removeItems(r)
                    }
                }, registerEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(document.documentElement, "mousemove", function (t) {
                        return e.onMouseMove(t)
                    }), this.eventManager.addEventListener(document.documentElement, "mouseup", function () {
                        return e.onMouseUp()
                    })
                }, unregisterEvents: function () {
                    this.eventManager.clear()
                }, onBeforeColumnSort: function (e, t) {
                    var n = E.get(this);
                    n.disallowMoving = void 0 !== t
                }, onBeforeOnCellMouseDown: function (e, t, n, o) {
                    var r = this.hot.view.wt.wtTable, i = this.hot.selection.selectedHeader.rows,
                        s = this.hot.getSelectedRange(), a = E.get(this);
                    if (!s || !i || a.pressed || 0 !== e.button) return a.pressed = !1, a.rowsToMove.length = 0, void v(this.hot.rootElement, [k, T]);
                    var l = this.guideline.isBuilt() && !this.guideline.isAppended(),
                        u = this.backlight.isBuilt() && !this.backlight.isAppended();
                    l && u && (this.guideline.appendTo(r.hider), this.backlight.appendTo(r.hider));
                    var c = s, d = c.from, h = c.to, f = Math.min(d.row, h.row), p = Math.max(d.row, h.row);
                    if (t.col < 0 && t.row >= f && t.row <= p) {
                        o.row = !0, a.pressed = !0, a.target.eventPageY = e.pageY, a.target.coords = t, a.target.TD = n, a.rowsToMove = this.prepareRowsToMoving();
                        var m = r.holder.scrollLeft + r.getColumnWidth(-1);
                        this.backlight.setPosition(null, m), this.backlight.setSize(r.hider.offsetWidth - m, this.getRowsHeight(f, p + 1)), this.backlight.setOffset((this.getRowsHeight(f, t.row) + e.layerY) * -1, null), w(this.hot.rootElement, k), this.refreshPositions()
                    } else v(this.hot.rootElement, x), a.pressed = !1, a.rowsToMove.length = 0
                }, onMouseMove: function (e) {
                    var t = E.get(this);
                    if (t.pressed) {
                        if (e.realTarget === this.backlight.element) {
                            var n = this.backlight.getSize().height;
                            this.backlight.setSize(null, 0), setTimeout(function () {
                                this.backlight.setPosition(null, n)
                            })
                        }
                        t.target.eventPageY = e.pageY, this.refreshPositions()
                    }
                }, onBeforeOnCellMouseOver: function (e, t, n, o) {
                    var r = this.hot.getSelectedRange(), i = E.get(this);
                    r && i.pressed && (i.rowsToMove.indexOf(t.row) > -1 ? v(this.hot.rootElement, T) : w(this.hot.rootElement, T), o.row = !0, o.column = !0, o.cell = !0, i.target.coords = t, i.target.TD = n)
                }, onMouseUp: function () {
                    var e = E.get(this), t = e.target.row, n = e.rowsToMove.length;
                    if (e.pressed = !1, e.backlightHeight = 0, v(this.hot.rootElement, [k, T, x]), this.hot.selection.selectedHeader.rows && w(this.hot.rootElement, x), !(n < 1 || void 0 === t || e.rowsToMove.indexOf(t) > -1 || e.rowsToMove[n - 1] === t - 1)) {
                        if (this.moveRows(e.rowsToMove, t), this.persistentStateSave(), this.hot.render(), !e.disallowMoving) {
                            var o = this.rowsMapper.getIndexByValue(e.rowsToMove[0]),
                                r = this.rowsMapper.getIndexByValue(e.rowsToMove[n - 1]);
                            this.changeSelection(o, r)
                        }
                        e.rowsToMove.length = 0
                    }
                }, onAfterScrollHorizontally: function () {
                    var e = this.hot.view.wt.wtTable, t = e.getColumnWidth(-1), n = e.holder.scrollLeft, o = t + n;
                    this.backlight.setPosition(null, o), this.backlight.setSize(e.hider.offsetWidth - o)
                }, onAfterCreateRow: function (e, t) {
                    this.rowsMapper.shiftItems(e, t)
                }, onBeforeRemoveRow: function (e, t) {
                    var n = this;
                    this.removedRows.length = 0, e !== !1 && b(e, e + t - 1, function (e) {
                        n.removedRows.push(n.hot.runHooks("modifyRow", e, n.pluginName))
                    })
                }, onAfterRemoveRow: function (e, t) {
                    this.rowsMapper.unshiftItems(this.removedRows)
                }, onAfterLoadData: function (e) {
                    this.updateRowsMapper()
                }, onModifyRow: function (e, t) {
                    if (t !== this.pluginName) {
                        var n = this.rowsMapper.getValueByIndex(e);
                        e = null === n ? e : n
                    }
                    return e
                }, onUnmodifyRow: function (e) {
                    var t = this.rowsMapper.getIndexByValue(e);
                    return null === t ? e : t
                }, onAfterPluginsInitialized: function () {
                    this.updateRowsMapper(), this.initialSettings(), this.backlight.build(), this.guideline.build()
                }, destroy: function () {
                    this.backlight.destroy(), this.guideline.destroy(), $traceurRuntime.superGet(this, H.prototype, "destroy").call(this)
                }
            }, {}, f), _("ManualRowMove", D), p.hooks.register("beforeRowMove"), p.hooks.register("afterRowMove"), p.hooks.register("unmodifyRow")
        }, {
            "_base.js": 62,
            browser: 24,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/number": 52,
            plugins: 61,
            rowsMapper: 103,
            "ui/backlight": 105,
            "ui/guideline": 106
        }],
        103: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                RowsMapper: {
                    get: function () {
                        return f
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                u = (r = e("mixins/arrayMapper"), r && r.__esModule && r || {default: r}).arrayMapper,
                c = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayFilter,
                d = (s = e("helpers/object"), s && s.__esModule && s || {default: s}).mixin,
                h = (a = e("helpers/number"), a && a.__esModule && a || {default: a}).rangeEach, f = function (e) {
                    this.manualRowMove = e
                };
            $traceurRuntime.createClass(f, {
                createMap: function (e) {
                    var t = this, n = void 0 === e ? this._arrayMap.length : e;
                    this._arrayMap.length = 0, h(n - 1, function (e) {
                        t._arrayMap[e] = e
                    })
                }, destroy: function () {
                    this._arrayMap = null
                }, moveRow: function (e, t) {
                    var n = this._arrayMap[e];
                    this._arrayMap[e] = null, this._arrayMap.splice(t, 0, n)
                }, clearNull: function () {
                    this._arrayMap = c(this._arrayMap, function (e) {
                        return null !== e
                    })
                }
            }, {}), d(f, u), l.utils.ManualRowMoveRowsMapper = f
        }, {browser: 24, "helpers/array": 43, "helpers/number": 52, "helpers/object": 53, "mixins/arrayMapper": 57}],
        104: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                BaseUI: {
                    get: function () {
                        return a
                    }
                }, __esModule: {value: !0}
            });
            var o = 0, r = 1, i = 2, s = "px", a = function (e) {
                this.hot = e, this._element = null, this.state = o
            };
            $traceurRuntime.createClass(a, {
                appendTo: function (e) {
                    e.appendChild(this._element), this.state = i
                }, build: function () {
                    this._element = document.createElement("div"), this.state = r
                }, destroy: function () {
                    this.isAppended() && this._element.parentElement.removeChild(this._element), this._element = null, this.state = o
                }, isAppended: function () {
                    return this.state === i
                }, isBuilt: function () {
                    return this.state >= r
                }, setPosition: function (e, t) {
                    e && (this._element.style.top = e + s), t && (this._element.style.left = t + s)
                }, getPosition: function () {
                    return {
                        top: this._element.style.top ? parseInt(this._element.style.top, 10) : 0,
                        left: this._element.style.left ? parseInt(this._element.style.left, 10) : 0
                    }
                }, setSize: function (e, t) {
                    e && (this._element.style.width = e + s), t && (this._element.style.height = t + s)
                }, getSize: function () {
                    return {
                        width: this._element.style.width ? parseInt(this._element.style.width, 10) : 0,
                        height: this._element.style.height ? parseInt(this._element.style.height, 10) : 0
                    }
                }, setOffset: function (e, t) {
                    e && (this._element.style.marginTop = e + s), t && (this._element.style.marginLeft = t + s)
                }, getOffset: function () {
                    return {
                        top: this._element.style.marginTop ? parseInt(this._element.style.marginTop, 10) : 0,
                        left: this._element.style.marginLeft ? parseInt(this._element.style.marginLeft, 10) : 0
                    }
                }
            }, {})
        }, {}],
        105: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                BacklightUI: {
                    get: function () {
                        return l
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("_base"), o && o.__esModule && o || {default: o}).BaseUI,
                s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).addClass,
                a = "ht__manualRowMove--backlight", l = function (e) {
                    $traceurRuntime.superConstructor(u).call(this, e)
                }, u = l;
            $traceurRuntime.createClass(l, {
                build: function () {
                    $traceurRuntime.superGet(this, u.prototype, "build").call(this), s(this._element, a)
                }
            }, {}, i)
        }, {_base: 104, "helpers/dom/element": 47}],
        106: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                GuidelineUI: {
                    get: function () {
                        return l
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i = (o = e("_base"), o && o.__esModule && o || {default: o}).BaseUI,
                s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).addClass,
                a = "ht__manualRowMove--guideline", l = function (e) {
                    $traceurRuntime.superConstructor(u).call(this, e)
                }, u = l;
            $traceurRuntime.createClass(l, {
                build: function () {
                    $traceurRuntime.superGet(this, u.prototype, "build").call(this), s(this._element, a)
                }
            }, {}, i)
        }, {_base: 104, "helpers/dom/element": 47}],
        107: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ManualRowResize: {
                    get: function () {
                        return M
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u, c, d = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                h = (r = e("_base.js"), r && r.__esModule && r || {default: r}).default,
                f = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), p = f.addClass,
                m = f.hasClass, g = f.removeClass, w = f.outerWidth,
                v = (s = e("eventManager"), s && s.__esModule && s || {default: s}).eventManager,
                y = (a = e("helpers/dom/event"), a && a.__esModule && a || {default: a}), b = (y.pageX, y.pageY),
                C = (l = e("helpers/array"), l && l.__esModule && l || {default: l}).arrayEach,
                _ = (u = e("helpers/number"), u && u.__esModule && u || {default: u}).rangeEach,
                R = (c = e("plugins"), c && c.__esModule && c || {default: c}).registerPlugin, M = function (e) {
                    $traceurRuntime.superConstructor(S).call(this, e), this.currentTH = null, this.currentRow = null, this.selectedRows = [], this.currentHeight = null, this.newSize = null, this.startY = null, this.startHeight = null, this.startOffset = null, this.handle = document.createElement("DIV"), this.guide = document.createElement("DIV"), this.eventManager = v(this), this.pressed = null, this.dblclick = 0, this.autoresizeTimeout = null, this.manualRowHeights = [], p(this.handle, "manualRowResizer"), p(this.guide, "manualRowResizerGuide")
                }, S = M;
            $traceurRuntime.createClass(M, {
                isEnabled: function () {
                    return this.hot.getSettings().manualRowResize
                }, enablePlugin: function () {
                    var e = this;
                    if (!this.enabled) {
                        this.manualRowHeights = [];
                        var t = this.hot.getSettings().manualRowResize, n = this.loadManualRowHeights();
                        "undefined" != typeof n ? this.manualRowHeights = n : Array.isArray(t) ? this.manualRowHeights = t : this.manualRowHeights = [], this.addHook("modifyRowHeight", function (t, n) {
                            return e.onModifyRowHeight(t, n)
                        }), d.hooks.register("beforeRowResize"), d.hooks.register("afterRowResize"), this.bindEvents(), $traceurRuntime.superGet(this, S.prototype, "enablePlugin").call(this)
                    }
                }, updatePlugin: function () {
                    var e = this.hot.getSettings().manualRowResize;
                    Array.isArray(e) ? this.manualRowHeights = e : e || (this.manualRowHeights = [])
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, S.prototype, "disablePlugin").call(this)
                }, saveManualRowHeights: function () {
                    this.hot.runHooks("persistentStateSave", "manualRowHeights", this.manualRowHeights)
                }, loadManualRowHeights: function () {
                    var e = {};
                    return this.hot.runHooks("persistentStateLoad", "manualRowHeights", e), e.value
                }, setupHandlePosition: function (e) {
                    var t = this;
                    this.currentTH = e;
                    var n = this.hot.view.wt.wtTable.getCoords(e).row, o = w(this.currentTH);
                    if (n >= 0) {
                        var r = this.currentTH.getBoundingClientRect();
                        if (this.currentRow = n, this.selectedRows = [], this.hot.selection.isSelected() && this.hot.selection.selectedHeader.rows) {
                            var i = this.hot.getSelectedRange(), s = i.from, a = i.to, l = s.row, u = a.row;
                            l >= u && (l = a.row, u = s.row), this.currentRow >= l && this.currentRow <= u ? _(l, u, function (e) {
                                return t.selectedRows.push(e)
                            }) : this.selectedRows.push(this.currentRow)
                        } else this.selectedRows.push(this.currentRow);
                        this.startOffset = r.top - 6, this.startHeight = parseInt(r.height, 10), this.handle.style.left = r.left + "px", this.handle.style.top = this.startOffset + this.startHeight + "px", this.handle.style.width = o + "px", this.hot.rootElement.appendChild(this.handle)
                    }
                }, refreshHandlePosition: function () {
                    this.handle.style.top = this.startOffset + this.currentHeight + "px"
                }, setupGuidePosition: function () {
                    var e = parseInt(w(this.handle), 10), t = parseInt(this.handle.style.left, 10) + e,
                        n = parseInt(this.hot.view.maximumVisibleElementWidth(0), 10);
                    p(this.handle, "active"), p(this.guide, "active"), this.guide.style.top = this.handle.style.top, this.guide.style.left = t + "px", this.guide.style.width = n - e + "px", this.hot.rootElement.appendChild(this.guide)
                }, refreshGuidePosition: function () {
                    this.guide.style.top = this.handle.style.top
                }, hideHandleAndGuide: function () {
                    g(this.handle, "active"), g(this.guide, "active")
                }, checkIfRowHeader: function (e) {
                    if (e != this.hot.rootElement) {
                        var t = e.parentNode;
                        return "TBODY" === t.tagName || this.checkIfRowHeader(t)
                    }
                    return !1
                }, getTHFromTargetElement: function (e) {
                    return "TABLE" != e.tagName ? "TH" == e.tagName ? e : this.getTHFromTargetElement(e.parentNode) : null
                }, onMouseOver: function (e) {
                    if (this.checkIfRowHeader(e.target)) {
                        var t = this.getTHFromTargetElement(e.target);
                        t && (this.pressed || this.setupHandlePosition(t))
                    }
                }, afterMouseDownTimeout: function () {
                    var e = this, t = function () {
                        e.hot.forceFullRender = !0, e.hot.view.render(), e.hot.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, n = function (n, o) {
                        var r = e.hot.runHooks("beforeRowResize", n, e.newSize, !0);
                        void 0 !== r && (e.newSize = r), e.setManualSize(n, e.newSize), o && t(), e.hot.runHooks("afterRowResize", n, e.newSize, !0)
                    };
                    if (this.dblclick >= 2) {
                        var o = this.selectedRows.length;
                        o > 1 ? (C(this.selectedRows, function (e) {
                            n(e)
                        }), t()) : C(this.selectedRows, function (e) {
                            n(e, !0)
                        })
                    }
                    this.dblclick = 0, this.autoresizeTimeout = null
                }, onMouseDown: function (e) {
                    var t = this;
                    m(e.target, "manualRowResizer") && (this.setupGuidePosition(), this.pressed = this.hot, null == this.autoresizeTimeout && (this.autoresizeTimeout = setTimeout(function () {
                        return t.afterMouseDownTimeout()
                    }, 500), this.hot._registerTimeout(this.autoresizeTimeout)), this.dblclick++, this.startY = b(e), this.newSize = this.startHeight)
                }, onMouseMove: function (e) {
                    var t = this;
                    this.pressed && (this.currentHeight = this.startHeight + (b(e) - this.startY), C(this.selectedRows, function (e) {
                        t.newSize = t.setManualSize(e, t.currentHeight)
                    }), this.refreshHandlePosition(), this.refreshGuidePosition())
                }, onMouseUp: function (e) {
                    var t = this, n = function () {
                        t.hot.forceFullRender = !0, t.hot.view.render(), t.hot.view.wt.wtOverlays.adjustElementsSize(!0)
                    }, o = function (e, o) {
                        t.hot.runHooks("beforeRowResize", e, t.newSize), o && n(), t.saveManualRowHeights(), t.hot.runHooks("afterRowResize", e, t.newSize)
                    };
                    if (this.pressed) {
                        if (this.hideHandleAndGuide(), this.pressed = !1, this.newSize != this.startHeight) {
                            var r = this.selectedRows.length;
                            r > 1 ? (C(this.selectedRows, function (e) {
                                o(e)
                            }), n()) : C(this.selectedRows, function (e) {
                                o(e, !0)
                            })
                        }
                        this.setupHandlePosition(this.currentTH)
                    }
                }, bindEvents: function () {
                    var e = this;
                    this.eventManager.addEventListener(this.hot.rootElement, "mouseover", function (t) {
                        return e.onMouseOver(t)
                    }), this.eventManager.addEventListener(this.hot.rootElement, "mousedown", function (t) {
                        return e.onMouseDown(t)
                    }), this.eventManager.addEventListener(window, "mousemove", function (t) {
                        return e.onMouseMove(t)
                    }), this.eventManager.addEventListener(window, "mouseup", function (t) {
                        return e.onMouseUp(t)
                    })
                }, setManualSize: function (e, t) {
                    return e = this.hot.runHooks("modifyRow", e), this.manualRowHeights[e] = t, t
                }, onModifyRowHeight: function (e, t) {
                    if (this.enabled) {
                        var n = this.hot.getPlugin("autoRowSize"), o = n ? n.heights[t] : null;
                        t = this.hot.runHooks("modifyRow", t);
                        var r = this.manualRowHeights[t];
                        if (void 0 !== r && (r === o || r > (e || 0))) return r
                    }
                    return e
                }
            }, {}, h), R("manualRowResize", M)
        }, {
            "_base.js": 62,
            browser: 24,
            eventManager: 42,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/number": 52,
            plugins: 61
        }],
        108: [function (e, t, n) {
            "use strict";

            function o() {
                var e = [];
                return e.getInfo = function (e, t) {
                    for (var n = 0, o = this.length; n < o; n++) if (this[n].row <= e && this[n].row + this[n].rowspan - 1 >= e && this[n].col <= t && this[n].col + this[n].colspan - 1 >= t) return this[n]
                }, e.setInfo = function (e) {
                    for (var t = 0, n = this.length; t < n; t++) if (this[t].row === e.row && this[t].col === e.col) return void (this[t] = e);
                    this.push(e)
                }, e.removeInfo = function (e, t) {
                    for (var n = 0, o = this.length; n < o; n++) if (this[n].row === e && this[n].col === t) {
                        this.splice(n, 1);
                        break
                    }
                }, e
            }

            function r(e) {
                if (this.mergedCellInfoCollection = new o, Array.isArray(e)) for (var t = 0, n = e.length; t < n; t++) this.mergedCellInfoCollection.setInfo(e[t])
            }

            function i(e, t) {
                var n = this.getSettings().mergeCells;
                if (n && !this.selection.isMultiple()) {
                    var o = this.mergeCells.mergedCellInfoCollection.getInfo(e[0], e[1]);
                    o && (e[0] = o.row, e[1] = o.col, e[2] = o.row + o.rowspan - 1, e[3] = o.col + o.colspan - 1)
                }
            }

            function s(e, t) {
                this.mergeCells && this.mergeCells.shiftCollection("right", e, t)
            }

            function a(e, t) {
                this.mergeCells && this.mergeCells.shiftCollection("left", e, t)
            }

            function l(e, t) {
                this.mergeCells && this.mergeCells.shiftCollection("down", e, t)
            }

            function u(e, t) {
                this.mergeCells && this.mergeCells.shiftCollection("up", e, t)
            }

            Object.defineProperties(n, {
                MergeCells: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var c, d, h, f, p, m, g = (c = e("browser"), c && c.__esModule && c || {default: c}).default,
                w = ((d = e("plugins"), d && d.__esModule && d || {default: d}).registerPlugin, (h = e("helpers/dom/event"), h && h.__esModule && h || {default: h}).stopImmediatePropagation),
                v = (f = e("3rdparty/walkontable/src/cell/coords"), f && f.__esModule && f || {default: f}).WalkontableCellCoords,
                y = (p = e("3rdparty/walkontable/src/cell/range"), p && p.__esModule && p || {default: p}).WalkontableCellRange,
                b = (m = e("3rdparty/walkontable/src/table"), m && m.__esModule && m || {default: m}).WalkontableTable;
            r.prototype.canMergeRange = function (e) {
                return !e.isSingle()
            }, r.prototype.mergeRange = function (e) {
                if (this.canMergeRange(e)) {
                    var t = e.getTopLeftCorner(), n = e.getBottomRightCorner(), o = {};
                    o.row = t.row, o.col = t.col, o.rowspan = n.row - t.row + 1, o.colspan = n.col - t.col + 1, this.mergedCellInfoCollection.setInfo(o)
                }
            }, r.prototype.mergeOrUnmergeSelection = function (e) {
                var t = this.mergedCellInfoCollection.getInfo(e.from.row, e.from.col);
                t ? this.unmergeSelection(e.from) : this.mergeSelection(e)
            }, r.prototype.mergeSelection = function (e) {
                this.mergeRange(e)
            }, r.prototype.unmergeSelection = function (e) {
                var t = this.mergedCellInfoCollection.getInfo(e.row, e.col);
                this.mergedCellInfoCollection.removeInfo(t.row, t.col)
            }, r.prototype.applySpanProperties = function (e, t, n) {
                var o = this.mergedCellInfoCollection.getInfo(t, n);
                o ? o.row === t && o.col === n ? (e.setAttribute("rowspan", o.rowspan), e.setAttribute("colspan", o.colspan)) : (e.removeAttribute("rowspan"), e.removeAttribute("colspan"), e.style.display = "none") : (e.removeAttribute("rowspan"), e.removeAttribute("colspan"))
            }, r.prototype.modifyTransform = function (e, t, n) {
                var o = function (e, t) {
                    return t.row >= e.row && t.row <= e.row + e.rowspan - 1
                }, r = function (e, t) {
                    return t.col >= e.col && t.col <= e.col + e.colspan - 1
                }, i = function (e) {
                    return new v(t.to.row + e.row, t.to.col + e.col)
                }, s = {row: n.row, col: n.col};
                if ("modifyTransformStart" == e) {
                    this.lastDesiredCoords || (this.lastDesiredCoords = new v(null, null));
                    for (var a, l = new v(t.highlight.row, t.highlight.col), u = this.mergedCellInfoCollection.getInfo(l.row, l.col), c = 0, d = this.mergedCellInfoCollection.length; c < d; c++) {
                        var h = this.mergedCellInfoCollection[c];
                        if (h = new v(h.row + h.rowspan - 1, h.col + h.colspan - 1), t.includes(h)) {
                            a = !0;
                            break
                        }
                    }
                    if (u) {
                        var f = new v(u.row, u.col), p = new v(u.row + u.rowspan - 1, u.col + u.colspan - 1),
                            m = new y(f, f, p);
                        m.includes(this.lastDesiredCoords) || (this.lastDesiredCoords = new v(null, null)), s.row = this.lastDesiredCoords.row ? this.lastDesiredCoords.row - l.row : s.row, s.col = this.lastDesiredCoords.col ? this.lastDesiredCoords.col - l.col : s.col, n.row > 0 ? s.row = u.row + u.rowspan - 1 - l.row + n.row : n.row < 0 && (s.row = l.row - u.row + n.row), n.col > 0 ? s.col = u.col + u.colspan - 1 - l.col + n.col : n.col < 0 && (s.col = l.col - u.col + n.col)
                    }
                    var g = new v(t.highlight.row + s.row, t.highlight.col + s.col),
                        w = this.mergedCellInfoCollection.getInfo(g.row, g.col);
                    w && (this.lastDesiredCoords = g, s = {row: w.row - l.row, col: w.col - l.col})
                } else if ("modifyTransformEnd" == e) for (var c = 0, d = this.mergedCellInfoCollection.length; c < d; c++) {
                    var b = this.mergedCellInfoCollection[c], f = new v(b.row, b.col),
                        p = new v(b.row + b.rowspan - 1, b.col + b.colspan - 1), C = new y(f, f, p),
                        _ = t.getBordersSharedWith(C);
                    if (C.isEqual(t)) t.setDirection("NW-SE"); else if (_.length > 0) {
                        var R = t.highlight.isEqual(C.from);
                        _.indexOf("top") > -1 ? t.to.isSouthEastOf(C.from) && R ? t.setDirection("NW-SE") : t.to.isSouthWestOf(C.from) && R && t.setDirection("NE-SW") : _.indexOf("bottom") > -1 && (t.to.isNorthEastOf(C.from) && R ? t.setDirection("SW-NE") : t.to.isNorthWestOf(C.from) && R && t.setDirection("SE-NW"))
                    }
                    var g = i(s), M = o(b, g), S = r(b, g);
                    t.includesRange(C) && (C.includes(g) || M || S) && (M && (s.row < 0 ? s.row -= b.rowspan - 1 : s.row > 0 && (s.row += b.rowspan - 1)), S && (s.col < 0 ? s.col -= b.colspan - 1 : s.col > 0 && (s.col += b.colspan - 1)))
                }
                0 !== s.row && (n.row = s.row), 0 !== s.col && (n.col = s.col)
            }, r.prototype.shiftCollection = function (e, t, n) {
                var o = [0, 0];
                switch (e) {
                    case"right":
                        o[0] += 1;
                        break;
                    case"left":
                        o[0] -= 1;
                        break;
                    case"down":
                        o[1] += 1;
                        break;
                    case"up":
                        o[1] -= 1
                }
                for (var r = 0; r < this.mergedCellInfoCollection.length; r++) {
                    var i = this.mergedCellInfoCollection[r];
                    "right" === e || "left" === e ? t <= i.col && (i.col += o[0]) : t <= i.row && (i.row += o[1])
                }
            };
            var C = function () {
                var e = this, t = e.getSettings().mergeCells;
                t && (e.mergeCells || (e.mergeCells = new r(t)))
            }, _ = function () {
                var e = this;
                e.mergeCells && (e.view.wt.wtTable.getCell = function (t) {
                    if (e.getSettings().mergeCells) {
                        var n = e.mergeCells.mergedCellInfoCollection.getInfo(t.row, t.col);
                        n && (t = n)
                    }
                    return b.prototype.getCell.call(this, t)
                })
            }, R = function () {
                var e = this, t = e.getSettings().mergeCells;
                if (t) if (e.mergeCells) {
                    if (e.mergeCells.mergedCellInfoCollection = new o, Array.isArray(t)) for (var n = 0, i = t.length; n < i; n++) e.mergeCells.mergedCellInfoCollection.setInfo(t[n])
                } else e.mergeCells = new r(t); else e.mergeCells && (e.mergeCells.mergedCellInfoCollection = new o)
            }, M = function (e) {
                if (this.mergeCells) {
                    var t = (e.ctrlKey || e.metaKey) && !e.altKey;
                    t && 77 === e.keyCode && (this.mergeCells.mergeOrUnmergeSelection(this.getSelectedRange()), this.render(), w(e))
                }
            }, S = function (e) {
                this.getSettings().mergeCells && (e.items.push(g.plugins.ContextMenu.SEPARATOR), e.items.push({
                    key: "mergeCells",
                    name: function () {
                        var e = this.getSelected(), t = this.mergeCells.mergedCellInfoCollection.getInfo(e[0], e[1]);
                        return t ? "Unmerge cells" : "Merge cells"
                    },
                    callback: function () {
                        this.mergeCells.mergeOrUnmergeSelection(this.getSelectedRange()), this.render()
                    },
                    disabled: function () {
                        return this.selection.selectedHeader.corner
                    }
                }))
            }, E = function (e, t, n, o, r, i) {
                this.mergeCells && this.mergeCells.applySpanProperties(e, t, n)
            }, O = function (e) {
                return function (t) {
                    var n = this.getSettings().mergeCells;
                    if (n) {
                        var o = this.getSelectedRange();
                        if (this.mergeCells.modifyTransform(e, o, t), "modifyTransformEnd" === e) {
                            var r = this.countRows(), i = this.countCols();
                            o.from.row < 0 ? o.from.row = 0 : o.from.row > 0 && o.from.row >= r && (o.from.row = o.from - 1), o.from.col < 0 ? o.from.col = 0 : o.from.col > 0 && o.from.col >= i && (o.from.col = i - 1)
                        }
                    }
                }
            }, T = function (e) {
                this.lastDesiredCoords = null;
                var t = this.getSettings().mergeCells;
                if (t) {
                    var n = this.getSelectedRange();
                    n.highlight = new v(n.highlight.row, n.highlight.col), n.to = e;
                    var o = !1;
                    do {
                        o = !1;
                        for (var r = 0, i = this.mergeCells.mergedCellInfoCollection.length; r < i; r++) {
                            var s = this.mergeCells.mergedCellInfoCollection[r], a = new v(s.row, s.col),
                                l = new v(s.row + s.rowspan - 1, s.col + s.colspan - 1), u = new y(a, a, l);
                            n.expandByRange(u) && (e.row = n.to.row, e.col = n.to.col, o = !0)
                        }
                    } while (o)
                }
            }, k = function (e, t) {
                if (t && "area" == t) {
                    var n = this.getSettings().mergeCells;
                    if (n) for (var o = this.getSelectedRange(), r = new y(o.from, o.from, o.from), i = new y(o.to, o.to, o.to), s = 0, a = this.mergeCells.mergedCellInfoCollection.length; s < a; s++) {
                        var l = this.mergeCells.mergedCellInfoCollection[s], u = new v(l.row, l.col),
                            c = new v(l.row + l.rowspan - 1, l.col + l.colspan - 1), d = new y(u, u, c);
                        r.expandByRange(d) && (e[0] = r.from.row, e[1] = r.from.col), i.expandByRange(d) && (e[2] = i.from.row, e[3] = i.from.col)
                    }
                }
            }, x = function (e, t, n) {
                var o = this.getSettings().mergeCells;
                if (o) {
                    var r = this.mergeCells.mergedCellInfoCollection.getInfo(e, t);
                    !r || r.row == e && r.col == t || (n.copyable = !1)
                }
            }, D = function (e) {
                var t = this.getSettings().mergeCells;
                if (t) for (var n, o = this.countCols(), r = 0; r < o; r++) {
                    if (n = this.mergeCells.mergedCellInfoCollection.getInfo(e.startRow, r), n && n.row < e.startRow) return e.startRow = n.row, D.call(this, e);
                    if (n = this.mergeCells.mergedCellInfoCollection.getInfo(e.endRow, r)) {
                        var i = n.row + n.rowspan - 1;
                        if (i > e.endRow) return e.endRow = i, D.call(this, e)
                    }
                }
            }, H = function (e) {
                var t = this.getSettings().mergeCells;
                if (t) for (var n, o = this.countRows(), r = 0; r < o; r++) {
                    if (n = this.mergeCells.mergedCellInfoCollection.getInfo(r, e.startColumn), n && n.col < e.startColumn) return e.startColumn = n.col, H.call(this, e);
                    if (n = this.mergeCells.mergedCellInfoCollection.getInfo(r, e.endColumn)) {
                        var i = n.col + n.colspan - 1;
                        if (i > e.endColumn) return e.endColumn = i, H.call(this, e)
                    }
                }
            }, A = function (e) {
                if (e && this.mergeCells) {
                    var t = this.mergeCells.mergedCellInfoCollection, n = this.getSelectedRange();
                    for (var o in t) if (n.highlight.row == t[o].row && n.highlight.col == t[o].col && n.to.row == t[o].row + t[o].rowspan - 1 && n.to.col == t[o].col + t[o].colspan - 1) return !1
                }
                return e
            };
            g.hooks.add("beforeInit", C), g.hooks.add("afterInit", _), g.hooks.add("afterUpdateSettings", R), g.hooks.add("beforeKeyDown", M), g.hooks.add("modifyTransformStart", O("modifyTransformStart")), g.hooks.add("modifyTransformEnd", O("modifyTransformEnd")), g.hooks.add("beforeSetRangeEnd", T), g.hooks.add("beforeDrawBorders", k), g.hooks.add("afterIsMultipleSelection", A), g.hooks.add("afterRenderer", E), g.hooks.add("afterContextMenuDefaultOptions", S), g.hooks.add("afterGetCellMeta", x), g.hooks.add("afterViewportRowCalculatorOverride", D), g.hooks.add("afterViewportColumnCalculatorOverride", H), g.hooks.add("modifyAutofillRange", i), g.hooks.add("afterCreateCol", s), g.hooks.add("afterRemoveCol", a), g.hooks.add("afterCreateRow", l), g.hooks.add("afterRemoveRow", u), g.MergeCells = r
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            "3rdparty/walkontable/src/cell/range": 7,
            "3rdparty/walkontable/src/table": 21,
            browser: 24,
            "helpers/dom/event": 48,
            plugins: 61
        }],
        109: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                MultipleSelectionHandles: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l,
                u = ((o = e("browser"), o && o.__esModule && o || {default: o}).default, r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}),
                c = u.getWindowScrollTop, d = u.hasClass, h = u.getWindowScrollLeft,
                f = (i = e("helpers/browser"), i && i.__esModule && i || {default: i}).isMobileBrowser,
                p = (s = e("_base"), s && s.__esModule && s || {default: s}).default,
                m = (a = e("eventManager"), a && a.__esModule && a || {default: a}).EventManager,
                g = (l = e("plugins"), l && l.__esModule && l || {default: l}).registerPlugin, w = function (e) {
                    $traceurRuntime.superConstructor(v).call(this, e), this.dragged = [], this.eventManager = null, this.lastSetCell = null
                }, v = w;
            $traceurRuntime.createClass(w, {
                isEnabled: function () {
                    return f()
                }, enablePlugin: function () {
                    this.enabled || (this.eventManager || (this.eventManager = new m(this)), this.registerListeners(), $traceurRuntime.superGet(this, v.prototype, "enablePlugin").call(this))
                }, registerListeners: function () {
                    function e(e) {
                        if (1 === t.dragged.length) return t.dragged.splice(0, t.dragged.length), !0;
                        var n = t.dragged.indexOf(e);
                        return n != -1 && void (0 === n ? t.dragged = t.dragged.slice(0, 1) : 1 == n && (t.dragged = t.dragged.slice(-1)))
                    }

                    var t = this;
                    this.eventManager.addEventListener(this.hot.rootElement, "touchstart", function (e) {
                        var n;
                        return d(e.target, "topLeftSelectionHandle-HitArea") ? (n = t.hot.getSelectedRange(), t.dragged.push("topLeft"), t.touchStartRange = {
                            width: n.getWidth(),
                            height: n.getHeight(),
                            direction: n.getDirection()
                        }, e.preventDefault(), !1) : d(e.target, "bottomRightSelectionHandle-HitArea") ? (n = t.hot.getSelectedRange(), t.dragged.push("bottomRight"), t.touchStartRange = {
                            width: n.getWidth(),
                            height: n.getHeight(),
                            direction: n.getDirection()
                        }, e.preventDefault(), !1) : void 0
                    }), this.eventManager.addEventListener(this.hot.rootElement, "touchend", function (n) {
                        return d(n.target, "topLeftSelectionHandle-HitArea") ? (e.call(t, "topLeft"), t.touchStartRange = void 0, n.preventDefault(), !1) : d(n.target, "bottomRightSelectionHandle-HitArea") ? (e.call(t, "bottomRight"), t.touchStartRange = void 0, n.preventDefault(), !1) : void 0
                    }), this.eventManager.addEventListener(this.hot.rootElement, "touchmove", function (e) {
                        var n, o, r, i, s, a, l, u = c(), d = h();
                        0 !== t.dragged.length && (n = document.elementFromPoint(e.touches[0].screenX - d, e.touches[0].screenY - u), n && n !== t.lastSetCell && ("TD" != n.nodeName && "TH" != n.nodeName || (o = t.hot.getCoords(n), o.col == -1 && (o.col = 0), r = t.hot.getSelectedRange(), i = r.getWidth(), s = r.getHeight(), a = r.getDirection(), 1 == i && 1 == s && t.hot.selection.setRangeEnd(o), l = t.getCurrentRangeCoords(r, o, t.touchStartRange.direction, a, t.dragged[0]), null !== l.start && t.hot.selection.setRangeStart(l.start), t.hot.selection.setRangeEnd(l.end), t.lastSetCell = n), e.preventDefault()))
                    })
                }, getCurrentRangeCoords: function (e, t, n, o, r) {
                    var i = e.getTopLeftCorner(), s = e.getBottomRightCorner(), a = e.getBottomLeftCorner(),
                        l = e.getTopRightCorner(), u = {start: null, end: null};
                    switch (n) {
                        case"NE-SW":
                            switch (o) {
                                case"NE-SW":
                                case"NW-SE":
                                    u = "topLeft" == r ? {
                                        start: new WalkontableCellCoords(t.row, e.highlight.col),
                                        end: new WalkontableCellCoords(a.row, t.col)
                                    } : {
                                        start: new WalkontableCellCoords(e.highlight.row, t.col),
                                        end: new WalkontableCellCoords(t.row, i.col)
                                    };
                                    break;
                                case"SE-NW":
                                    "bottomRight" == r && (u = {
                                        start: new WalkontableCellCoords(s.row, t.col),
                                        end: new WalkontableCellCoords(t.row, i.col)
                                    })
                            }
                            break;
                        case"NW-SE":
                            switch (o) {
                                case"NE-SW":
                                    "topLeft" == r ? u = {start: t, end: a} : u.end = t;
                                    break;
                                case"NW-SE":
                                    "topLeft" == r ? u = {start: t, end: s} : u.end = t;
                                    break;
                                case"SE-NW":
                                    "topLeft" == r ? u = {start: t, end: i} : u.end = t;
                                    break;
                                case"SW-NE":
                                    "topLeft" == r ? u = {start: t, end: l} : u.end = t
                            }
                            break;
                        case"SW-NE":
                            switch (o) {
                                case"NW-SE":
                                    u = "bottomRight" == r ? {
                                        start: new WalkontableCellCoords(t.row, i.col),
                                        end: new WalkontableCellCoords(a.row, t.col)
                                    } : {
                                        start: new WalkontableCellCoords(i.row, t.col),
                                        end: new WalkontableCellCoords(t.row, s.col)
                                    };
                                    break;
                                case"SW-NE":
                                    u = "topLeft" == r ? {
                                        start: new WalkontableCellCoords(e.highlight.row, t.col),
                                        end: new WalkontableCellCoords(t.row, s.col)
                                    } : {
                                        start: new WalkontableCellCoords(t.row, i.col),
                                        end: new WalkontableCellCoords(i.row, t.col)
                                    };
                                    break;
                                case"SE-NW":
                                    "bottomRight" == r ? u = {
                                        start: new WalkontableCellCoords(t.row, l.col),
                                        end: new WalkontableCellCoords(i.row, t.col)
                                    } : "topLeft" == r && (u = {start: a, end: t})
                            }
                            break;
                        case"SE-NW":
                            switch (o) {
                                case"NW-SE":
                                case"NE-SW":
                                case"SW-NE":
                                    "topLeft" == r && (u.end = t);
                                    break;
                                case"SE-NW":
                                    "topLeft" == r ? u.end = t : u = {start: t, end: i}
                            }
                    }
                    return u
                }, isDragged: function () {
                    return this.dragged.length > 0
                }
            }, {}, p), g("multipleSelectionHandles", w)
        }, {_base: 62, browser: 24, eventManager: 42, "helpers/browser": 44, "helpers/dom/element": 47, plugins: 61}],
        110: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                DataObserver: {
                    get: function () {
                        return d
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a = (o = e("jsonpatch"), o && o.__esModule && o || {default: o}).default,
                l = (r = e("../../mixins/localHooks"), r && r.__esModule && r || {default: r}).localHooks,
                u = (i = e("../../helpers/object"), i && i.__esModule && i || {default: i}).mixin,
                c = (s = e("utils"), s && s.__esModule && s || {default: s}).cleanPatches, d = function (e) {
                    this.observedData = null, this.observer = null, this.paused = !1, this.setObservedData(e)
                };
            $traceurRuntime.createClass(d, {
                setObservedData: function (e) {
                    var t = this;
                    this.observer && a.unobserve(this.observedData, this.observer), this.observedData = e, this.observer = a.observe(this.observedData, function (e) {
                        return t.onChange(e)
                    })
                }, isPaused: function () {
                    return this.paused
                }, pause: function () {
                    this.paused = !0
                }, resume: function () {
                    this.paused = !1
                }, onChange: function (e) {
                    this.runLocalHooks("change", c(e))
                }, destroy: function () {
                    a.unobserve(this.observedData, this.observer), this.observedData = null, this.observer = null
                }
            }, {}), u(d, l)
        }, {"../../helpers/object": 53, "../../mixins/localHooks": 58, jsonpatch: "jsonpatch", utils: 112}],
        111: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                ObserveChanges: {
                    get: function () {
                        return p
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("_base"), r && r.__esModule && r || {default: r}).default,
                d = ((i = e("jsonpatch"), i && i.__esModule && i || {default: i}).default, (s = e("dataObserver"), s && s.__esModule && s || {default: s}).DataObserver),
                h = (a = e("helpers/array"), a && a.__esModule && a || {default: a}).arrayEach,
                f = (l = e("plugins"), l && l.__esModule && l || {default: l}).registerPlugin;
            u.hooks.register("afterChangesObserved");
            var p = function (e) {
                $traceurRuntime.superConstructor(m).call(this, e), this.observer = null
            }, m = p;
            $traceurRuntime.createClass(p, {
                isEnabled: function () {
                    return this.hot.getSettings().observeChanges
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.observer || (this.observer = new d(this.hot.getSourceData()), this._exposePublicApi()), this.observer.addLocalHook("change", function (t) {
                        return e.onDataChange(t)
                    }), this.addHook("afterCreateRow", function () {
                        return e.onAfterTableAlter()
                    }), this.addHook("afterRemoveRow", function () {
                        return e.onAfterTableAlter()
                    }), this.addHook("afterCreateCol", function () {
                        return e.onAfterTableAlter()
                    }), this.addHook("afterRemoveCol", function () {
                        return e.onAfterTableAlter()
                    }), this.addHook("afterChange", function (t, n) {
                        return e.onAfterTableAlter(n)
                    }), this.addHook("afterLoadData", function (t) {
                        return e.onAfterLoadData(t)
                    }), $traceurRuntime.superGet(this, m.prototype, "enablePlugin").call(this))
                }, disablePlugin: function () {
                    this.observer && (this.observer.destroy(), this.observer = null, this._deletePublicApi()), $traceurRuntime.superGet(this, m.prototype, "disablePlugin").call(this)
                }, onDataChange: function (e) {
                    var t = this;
                    if (!this.observer.isPaused()) {
                        var n = this.pluginName + ".change", o = {
                            add: function (e) {
                                isNaN(e.col) ? t.hot.runHooks("afterCreateRow", e.row, 1, n) : t.hot.runHooks("afterCreateCol", e.col, 1, n)
                            }, remove: function (e) {
                                isNaN(e.col) ? t.hot.runHooks("afterRemoveRow", e.row, 1, n) : t.hot.runHooks("afterRemoveCol", e.col, 1, n)
                            }, replace: function (e) {
                                t.hot.runHooks("afterChange", [e.row, e.col, null, e.value], n)
                            }
                        };
                        h(e, function (e) {
                            o[e.op] && o[e.op](e)
                        }), this.hot.render()
                    }
                    this.hot.runHooks("afterChangesObserved")
                }, onAfterTableAlter: function (e) {
                    var t = this;
                    "loadData" !== e && (this.observer.pause(), this.hot.addHookOnce("afterChangesObserved", function () {
                        return t.observer.resume()
                    }))
                }, onAfterLoadData: function (e) {
                    e || this.observer.setObservedData(this.hot.getSourceData())
                }, destroy: function () {
                    this.observer && (this.observer.destroy(), this._deletePublicApi()), $traceurRuntime.superGet(this, m.prototype, "destroy").call(this)
                }, _exposePublicApi: function () {
                    var e = this, t = this.hot;
                    t.pauseObservingChanges = function () {
                        return e.observer.pause()
                    }, t.resumeObservingChanges = function () {
                        return e.observer.resume()
                    }, t.isPausedObservingChanges = function () {
                        return e.observer.isPaused()
                    }
                }, _deletePublicApi: function () {
                    var e = this.hot;
                    delete e.pauseObservingChanges, delete e.resumeObservingChanges, delete e.isPausedObservingChanges
                }
            }, {}, c), f("observeChanges", p)
        }, {_base: 62, browser: 24, dataObserver: 110, "helpers/array": 43, jsonpatch: "jsonpatch", plugins: 61}],
        112: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = [];
                return e = a(e, function (e) {
                    return !/[\/]length/gi.test(e.path) && !!r(e.path)
                }), e = l(e, function (e) {
                    var t = r(e.path);
                    return e.row = t.row, e.col = t.col, e
                }), e = a(e, function (e) {
                    if (["add", "remove"].indexOf(e.op) !== -1 && !isNaN(e.col)) {
                        if (t.indexOf(e.col) !== -1) return !1;
                        t.push(e.col)
                    }
                    return !0
                }), t.length = 0, e
            }

            function r(e) {
                var t = e.match(/^\/(\d+)\/?(.*)?$/);
                if (!t) return null;
                var n = t, o = n[1], r = n[2];
                return {row: parseInt(o, 10), col: /^\d*$/.test(r) ? parseInt(r, 10) : r}
            }

            Object.defineProperties(n, {
                cleanPatches: {
                    get: function () {
                        return o
                    }
                }, parsePath: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var i, s = (i = e("../../helpers/array"), i && i.__esModule && i || {default: i}), a = s.arrayFilter,
                l = s.arrayMap
        }, {"../../helpers/array": 43}],
        113: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t, n = function () {
                    window.localStorage[e + "__persistentStateKeys"] = JSON.stringify(t)
                }, o = function () {
                    var n = window.localStorage[e + "__persistentStateKeys"],
                        o = "string" == typeof n ? JSON.parse(n) : void 0;
                    t = o ? o : []
                }, r = function () {
                    t = [], n()
                };
                o(), this.saveValue = function (o, r) {
                    window.localStorage[e + "_" + o] = JSON.stringify(r), t.indexOf(o) == -1 && (t.push(o), n())
                }, this.loadValue = function (t, n) {
                    t = "undefined" == typeof t ? n : t;
                    var o = window.localStorage[e + "_" + t];
                    return "undefined" == typeof o ? void 0 : JSON.parse(o)
                }, this.reset = function (t) {
                    window.localStorage.removeItem(e + "_" + t)
                }, this.resetAll = function () {
                    for (var n = 0; n < t.length; n++) window.localStorage.removeItem(e + "_" + t[n]);
                    r()
                }
            }

            function r() {
                function e() {
                    var e = this;
                    for (var t in r) r.hasOwnProperty(t) && e.addHook(t, r[t])
                }

                function t() {
                    var e = this;
                    for (var t in r) r.hasOwnProperty(t) && e.removeHook(t, r[t])
                }

                var n = this;
                this.init = function () {
                    var r = this, i = r.getSettings().persistentState;
                    return n.enabled = !!i, n.enabled ? (r.storage || (r.storage = new o(r.rootElement.id)), r.resetState = n.resetValue, void e.call(r)) : void t.call(r)
                }, this.saveValue = function (e, t) {
                    var n = this;
                    n.storage.saveValue(e, t)
                }, this.loadValue = function (e, t) {
                    var n = this;
                    t.value = n.storage.loadValue(e)
                }, this.resetValue = function (e) {
                    var t = this;
                    "undefined" == typeof e ? t.storage.resetAll() : t.storage.reset(e)
                };
                var r = {
                    persistentStateSave: n.saveValue,
                    persistentStateLoad: n.loadValue,
                    persistentStateReset: n.resetValue
                };
                for (var i in r) r.hasOwnProperty(i) && a.hooks.register(i)
            }

            Object.defineProperties(n, {
                HandsontablePersistentState: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var i, s, a = (i = e("browser"), i && i.__esModule && i || {default: i}).default,
                l = ((s = e("plugins"), s && s.__esModule && s || {default: s}).registerPlugin, new r);
            a.hooks.add("beforeInit", l.init), a.hooks.add("afterUpdateSettings", l.init)
        }, {browser: 24, plugins: 61}],
        114: [function (e, t, n) {
            "use strict";

            function o() {
                var e = this, t = !!e.getSettings().search;
                t ? e.search = new a.Search(e) : delete e.search
            }

            var r, i, s, a = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                l = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), u = l.addClass,
                c = l.removeClass, d = (s = e("renderers"), s && s.__esModule && s || {default: s}),
                h = d.registerRenderer, f = d.getRenderer;
            a.Search = function (e) {
                this.query = function (t, n, o) {
                    var r = e.countRows(), i = e.countCols(), s = [];
                    n || (n = a.Search.global.getDefaultCallback()), o || (o = a.Search.global.getDefaultQueryMethod());
                    for (var l = 0; l < r; l++) for (var u = 0; u < i; u++) {
                        var c = e.getDataAtCell(l, u), d = e.getCellMeta(l, u), h = d.search.callback || n,
                            f = d.search.queryMethod || o, p = f(t, c);
                        if (p) {
                            var m = {row: l, col: u, data: c};
                            s.push(m)
                        }
                        h && h(e, l, u, c, p)
                    }
                    return s
                }
            }, a.Search.DEFAULT_CALLBACK = function (e, t, n, o, r) {
                e.getCellMeta(t, n).isSearchResult = r
            }, a.Search.DEFAULT_QUERY_METHOD = function (e, t) {
                return !("undefined" == typeof e || null == e || !e.toLowerCase || 0 === e.length) && ("undefined" != typeof t && null != t && t.toString().toLowerCase().indexOf(e.toLowerCase()) != -1)
            }, a.Search.DEFAULT_SEARCH_RESULT_CLASS = "htSearchResult", a.Search.global = function () {
                var e = a.Search.DEFAULT_CALLBACK, t = a.Search.DEFAULT_QUERY_METHOD,
                    n = a.Search.DEFAULT_SEARCH_RESULT_CLASS;
                return {
                    getDefaultCallback: function () {
                        return e
                    }, setDefaultCallback: function (t) {
                        e = t
                    }, getDefaultQueryMethod: function () {
                        return t
                    }, setDefaultQueryMethod: function (e) {
                        t = e
                    }, getDefaultSearchResultClass: function () {
                        return n
                    }, setDefaultSearchResultClass: function (e) {
                        n = e
                    }
                }
            }(), a.SearchCellDecorator = function (e, t, n, o, r, i, s) {
                var l = null !== s.search && "object" == typeof s.search && s.search.searchResultClass || a.Search.global.getDefaultSearchResultClass();
                s.isSearchResult ? u(t, l) : c(t, l)
            };
            var p = f("base");
            h("base", function (e, t, n, o, r, i, s) {
                p.apply(this, arguments), a.SearchCellDecorator.apply(this, arguments)
            }), a.hooks.add("afterInit", o), a.hooks.add("afterUpdateSettings", o)
        }, {browser: 24, "helpers/dom/element": 47, renderers: 117}],
        115: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                TouchScroll: {
                    get: function () {
                        return w
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), d = c.addClass,
                h = c.removeClass, f = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                p = (s = e("_base"), s && s.__esModule && s || {default: s}).default,
                m = (a = e("plugins"), a && a.__esModule && a || {default: a}).registerPlugin,
                g = (l = e("helpers/feature"), l && l.__esModule && l || {default: l}).isTouchSupported,
                w = function (e) {
                    $traceurRuntime.superConstructor(v).call(this, e), this.scrollbars = [], this.clones = [], this.lockedCollection = !1
                }, v = w;
            $traceurRuntime.createClass(w, {
                isEnabled: function () {
                    return g()
                }, enablePlugin: function () {
                    var e = this;
                    this.enabled || (this.addHook("afterRender", function () {
                        return e.onAfterRender()
                    }), this.registerEvents(), $traceurRuntime.superGet(this, v.prototype, "enablePlugin").call(this))
                }, updatePlugin: function () {
                    this.lockedCollection = !1, $traceurRuntime.superGet(this, v.prototype, "updatePlugin").call(this)
                }, disablePlugin: function () {
                    $traceurRuntime.superGet(this, v.prototype, "disablePlugin").call(this)
                }, registerEvents: function () {
                    var e = this;
                    this.addHook("beforeTouchScroll", function () {
                        return e.onBeforeTouchScroll()
                    }), this.addHook("afterMomentumScroll", function () {
                        return e.onAfterMomentumScroll()
                    })
                }, onAfterRender: function () {
                    if (!this.lockedCollection) {
                        var e = this.hot.view.wt.wtOverlays, t = e.topOverlay, n = e.bottomOverlay, o = e.leftOverlay,
                            r = e.topLeftCornerOverlay, i = e.bottomLeftCornerOverlay;
                        this.lockedCollection = !0, this.scrollbars.length = 0, this.scrollbars.push(t), n.clone && this.scrollbars.push(n), this.scrollbars.push(o), r && this.scrollbars.push(r), i && i.clone && this.scrollbars.push(i), this.clones.length = 0, t.needFullRender && this.clones.push(t.clone.wtTable.holder.parentNode), n.needFullRender && this.clones.push(n.clone.wtTable.holder.parentNode), o.needFullRender && this.clones.push(o.clone.wtTable.holder.parentNode), r && this.clones.push(r.clone.wtTable.holder.parentNode), i && i.clone && this.clones.push(i.clone.wtTable.holder.parentNode)
                    }
                }, onBeforeTouchScroll: function () {
                    u.freezeOverlays = !0, f(this.clones, function (e) {
                        d(e, "hide-tween")
                    })
                }, onAfterMomentumScroll: function () {
                    var e = this;
                    u.freezeOverlays = !1, f(this.clones, function (e) {
                        h(e, "hide-tween"), d(e, "show-tween")
                    }), setTimeout(function () {
                        f(e.clones, function (e) {
                            h(e, "show-tween")
                        })
                    }, 400), f(this.scrollbars, function (e) {
                        e.refresh(), e.resetFixedPosition()
                    }), this.hot.view.wt.wtOverlays.syncScrollWithMaster()
                }
            }, {}, p), m("touchScroll", w)
        }, {
            _base: 62,
            browser: 24,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/feature": 49,
            plugins: 61
        }],
        116: [function (e, t, n) {
            "use strict";

            function o() {
                var e = this, t = "undefined" == typeof e.getSettings().undo || e.getSettings().undo;
                t ? e.undoRedo || (e.undoRedo = new f.UndoRedo(e), s(e), e.addHook("beforeKeyDown", r), e.addHook("afterChange", i)) : e.undoRedo && (delete e.undoRedo, a(e), e.removeHook("beforeKeyDown", r), e.removeHook("afterChange", i))
            }

            function r(e) {
                var t = this, n = (e.ctrlKey || e.metaKey) && !e.altKey;
                n && (89 === e.keyCode || e.shiftKey && 90 === e.keyCode ? (t.undoRedo.redo(), y(e)) : 90 === e.keyCode && (t.undoRedo.undo(), y(e)))
            }

            function i(e, t) {
                var n = this;
                if ("loadData" === t) return n.undoRedo.clear()
            }

            function s(e) {
                e.undo = function () {
                    return e.undoRedo.undo()
                }, e.redo = function () {
                    return e.undoRedo.redo()
                }, e.isUndoAvailable = function () {
                    return e.undoRedo.isUndoAvailable()
                }, e.isRedoAvailable = function () {
                    return e.undoRedo.isRedoAvailable()
                }, e.clearUndo = function () {
                    return e.undoRedo.clear()
                }
            }

            function a(e) {
                delete e.undo, delete e.redo, delete e.isUndoAvailable, delete e.isRedoAvailable, delete e.clearUndo
            }

            var l, u, c, d, h, f = (l = e("browser"), l && l.__esModule && l || {default: l}).default,
                p = (u = e("helpers/array"), u && u.__esModule && u || {default: u}).arrayMap,
                m = (c = e("helpers/number"), c && c.__esModule && c || {default: c}).rangeEach,
                g = (d = e("helpers/object"), d && d.__esModule && d || {default: d}), w = g.inherit, v = g.deepClone,
                y = (h = e("helpers/dom/event"), h && h.__esModule && h || {default: h}).stopImmediatePropagation;
            f.UndoRedo = function (e) {
                var t = this;
                this.instance = e, this.doneActions = [], this.undoneActions = [], this.ignoreNewActions = !1, e.addHook("afterChange", function (e, n) {
                    e && "UndoRedo.undo" !== n && "UndoRedo.redo" !== n && t.done(new f.UndoRedo.ChangeAction(e))
                }), e.addHook("afterCreateRow", function (e, n, o) {
                    if ("UndoRedo.undo" !== o && "UndoRedo.undo" !== o && "auto" !== o) {
                        var r = new f.UndoRedo.CreateRowAction(e, n);
                        t.done(r)
                    }
                }), e.addHook("beforeRemoveRow", function (e, n, o, r) {
                    if ("UndoRedo.undo" !== r && "UndoRedo.redo" !== r && "auto" !== r) {
                        var i = t.instance.getSourceDataArray();
                        e = (i.length + e) % i.length;
                        var s = v(i.slice(e, e + n));
                        t.done(new f.UndoRedo.RemoveRowAction(e, s))
                    }
                }), e.addHook("afterCreateCol", function (e, n, o) {
                    "UndoRedo.undo" !== o && "UndoRedo.redo" !== o && "auto" !== o && t.done(new f.UndoRedo.CreateColumnAction(e, n))
                }), e.addHook("beforeRemoveCol", function (n, o, r, i) {
                    if ("UndoRedo.undo" !== i && "UndoRedo.redo" !== i && "auto" !== i) {
                        var s = t.instance.getSourceDataArray();
                        n = (t.instance.countCols() + n) % t.instance.countCols();
                        var a = [], l = [], u = [];
                        m(s.length - 1, function (t) {
                            var r = [], i = s[t];
                            m(n, n + (o - 1), function (t) {
                                r.push(i[e.runHooks("modifyCol", t)])
                            }), a.push(r)
                        }), m(o - 1, function (t) {
                            u.push(e.runHooks("modifyCol", n + t))
                        }), Array.isArray(e.getSettings().colHeaders) && m(o - 1, function (t) {
                            l.push(e.getSettings().colHeaders[e.runHooks("modifyCol", n + t)] || null)
                        });
                        var c = t.instance.getPlugin("manualColumnMove"),
                            d = c.isEnabled() ? c.columnsMapper.__arrayMap : [],
                            h = new f.UndoRedo.RemoveColumnAction(n, u, a, l, d);
                        t.done(h)
                    }
                }), e.addHook("beforeCellAlignment", function (e, n, o, r) {
                    var i = new f.UndoRedo.CellAlignmentAction(e, n, o, r);
                    t.done(i)
                }), e.addHook("beforeFilter", function (e) {
                    t.done(new f.UndoRedo.FiltersAction(e))
                }), e.addHook("beforeRowMove", function (e, n) {
                    e !== !1 && t.done(new f.UndoRedo.RowMoveAction(e, n))
                })
            }, f.UndoRedo.prototype.done = function (e) {
                this.ignoreNewActions || (this.doneActions.push(e), this.undoneActions.length = 0)
            }, f.UndoRedo.prototype.undo = function () {
                if (this.isUndoAvailable()) {
                    var e = this.doneActions.pop(), t = v(e), n = this.instance, o = n.runHooks("beforeUndo", t);
                    if (o === !1) return;
                    this.ignoreNewActions = !0;
                    var r = this;
                    e.undo(this.instance, function () {
                        r.ignoreNewActions = !1, r.undoneActions.push(e)
                    }), n.runHooks("afterUndo", t)
                }
            }, f.UndoRedo.prototype.redo = function () {
                if (this.isRedoAvailable()) {
                    var e = this.undoneActions.pop(), t = v(e), n = this.instance, o = n.runHooks("beforeRedo", t);
                    if (o === !1) return;
                    this.ignoreNewActions = !0;
                    var r = this;
                    e.redo(this.instance, function () {
                        r.ignoreNewActions = !1, r.doneActions.push(e)
                    }), n.runHooks("afterRedo", t)
                }
            }, f.UndoRedo.prototype.isUndoAvailable = function () {
                return this.doneActions.length > 0
            }, f.UndoRedo.prototype.isRedoAvailable = function () {
                return this.undoneActions.length > 0
            }, f.UndoRedo.prototype.clear = function () {
                this.doneActions.length = 0, this.undoneActions.length = 0
            }, f.UndoRedo.Action = function () {
            }, f.UndoRedo.Action.prototype.undo = function () {
            }, f.UndoRedo.Action.prototype.redo = function () {
            }, f.UndoRedo.ChangeAction = function (e) {
                this.changes = e, this.actionType = "change"
            }, w(f.UndoRedo.ChangeAction, f.UndoRedo.Action), f.UndoRedo.ChangeAction.prototype.undo = function (e, t) {
                for (var n = v(this.changes), o = e.countEmptyRows(!0), r = e.countEmptyCols(!0), i = 0, s = n.length; i < s; i++) n[i].splice(3, 1);
                e.addHookOnce("afterChange", t), e.setDataAtRowProp(n, null, null, "UndoRedo.undo");
                for (var a = 0, l = n.length; a < l; a++) e.getSettings().minSpareRows && n[a][0] + 1 + e.getSettings().minSpareRows === e.countRows() && o == e.getSettings().minSpareRows && (e.alter("remove_row", parseInt(n[a][0] + 1, 10), e.getSettings().minSpareRows), e.undoRedo.doneActions.pop()), e.getSettings().minSpareCols && n[a][1] + 1 + e.getSettings().minSpareCols === e.countCols() && r == e.getSettings().minSpareCols && (e.alter("remove_col", parseInt(n[a][1] + 1, 10), e.getSettings().minSpareCols), e.undoRedo.doneActions.pop())
            }, f.UndoRedo.ChangeAction.prototype.redo = function (e, t) {
                for (var n = v(this.changes), o = 0, r = n.length; o < r; o++) n[o].splice(2, 1);
                e.addHookOnce("afterChange", t), e.setDataAtRowProp(n, null, null, "UndoRedo.redo")
            }, f.UndoRedo.CreateRowAction = function (e, t) {
                this.index = e, this.amount = t, this.actionType = "insert_row"
            }, w(f.UndoRedo.CreateRowAction, f.UndoRedo.Action), f.UndoRedo.CreateRowAction.prototype.undo = function (e, t) {
                var n = e.countRows(), o = e.getSettings().minSpareRows;
                this.index >= n && this.index - o < n && (this.index -= o), e.addHookOnce("afterRemoveRow", t), e.alter("remove_row", this.index, this.amount, "UndoRedo.undo")
            }, f.UndoRedo.CreateRowAction.prototype.redo = function (e, t) {
                e.addHookOnce("afterCreateRow", t), e.alter("insert_row", this.index, this.amount, "UndoRedo.redo")
            }, f.UndoRedo.RemoveRowAction = function (e, t) {
                this.index = e, this.data = t, this.actionType = "remove_row"
            }, w(f.UndoRedo.RemoveRowAction, f.UndoRedo.Action), f.UndoRedo.RemoveRowAction.prototype.undo = function (e, t) {
                e.alter("insert_row", this.index, this.data.length, "UndoRedo.undo"), e.addHookOnce("afterRender", t), e.populateFromArray(this.index, 0, this.data, void 0, void 0, "UndoRedo.undo")
            }, f.UndoRedo.RemoveRowAction.prototype.redo = function (e, t) {
                e.addHookOnce("afterRemoveRow", t),
                    e.alter("remove_row", this.index, this.data.length, "UndoRedo.redo")
            }, f.UndoRedo.CreateColumnAction = function (e, t) {
                this.index = e, this.amount = t, this.actionType = "insert_col"
            }, w(f.UndoRedo.CreateColumnAction, f.UndoRedo.Action), f.UndoRedo.CreateColumnAction.prototype.undo = function (e, t) {
                e.addHookOnce("afterRemoveCol", t), e.alter("remove_col", this.index, this.amount, "UndoRedo.undo")
            }, f.UndoRedo.CreateColumnAction.prototype.redo = function (e, t) {
                e.addHookOnce("afterCreateCol", t), e.alter("insert_col", this.index, this.amount, "UndoRedo.redo")
            }, f.UndoRedo.RemoveColumnAction = function (e, t, n, o, r) {
                this.index = e, this.indexes = t, this.data = n, this.amount = this.data[0].length, this.headers = o, this.columnPositions = r.slice(0), this.actionType = "remove_col"
            }, w(f.UndoRedo.RemoveColumnAction, f.UndoRedo.Action), f.UndoRedo.RemoveColumnAction.prototype.undo = function (e, t) {
                var n, o = this, r = this.indexes.slice(0).sort(), i = function (e, t, n) {
                    return n[o.indexes.indexOf(r[t])]
                }, s = [];
                m(this.data.length - 1, function (e) {
                    s[e] = p(o.data[e], i)
                });
                var a = [];
                a = p(this.headers, i);
                var l = [];
                f.hooks.run(e, "beforeCreateCol", this.indexes[0], this.indexes[this.indexes.length - 1], "UndoRedo.undo"), m(this.data.length - 1, function (t) {
                    n = e.getSourceDataAtRow(t), m(r.length - 1, function (e) {
                        n.splice(r[e], 0, s[t][e]), l.push([t, r[e], null, s[t][e]])
                    })
                }), e.getPlugin("formulas") && e.getPlugin("formulas").onAfterSetDataAtCell(l), "undefined" != typeof this.headers && m(a.length - 1, function (t) {
                    e.getSettings().colHeaders.splice(r[t], 0, a[t])
                }), e.getPlugin("manualColumnMove") && (e.getPlugin("manualColumnMove").columnsMapper.__arrayMap = this.columnPositions), e.addHookOnce("afterRender", t), f.hooks.run(e, "afterCreateCol", this.indexes[0], this.indexes[this.indexes.length - 1], "UndoRedo.undo"), e.getPlugin("formulas") && e.getPlugin("formulas").recalculateFull(), e.render()
            }, f.UndoRedo.RemoveColumnAction.prototype.redo = function (e, t) {
                e.addHookOnce("afterRemoveCol", t), e.alter("remove_col", this.index, this.amount, "UndoRedo.redo")
            }, f.UndoRedo.CellAlignmentAction = function (e, t, n, o) {
                this.stateBefore = e, this.range = t, this.type = n, this.alignment = o
            }, f.UndoRedo.CellAlignmentAction.prototype.undo = function (e, t) {
                if (e.getPlugin("contextMenu").isEnabled()) {
                    for (var n = this.range.from.row; n <= this.range.to.row; n++) for (var o = this.range.from.col; o <= this.range.to.col; o++) e.setCellMeta(n, o, "className", this.stateBefore[n][o] || " htLeft");
                    e.addHookOnce("afterRender", t), e.render()
                }
            }, f.UndoRedo.CellAlignmentAction.prototype.redo = function (e, t) {
                e.getPlugin("contextMenu").isEnabled() && (e.selectCell(this.range.from.row, this.range.from.col, this.range.to.row, this.range.to.col), e.getPlugin("contextMenu").executeCommand("alignment:" + this.alignment.replace("ht", "").toLowerCase()), e.addHookOnce("afterRender", t), e.render())
            }, f.UndoRedo.FiltersAction = function (e) {
                this.formulaStacks = e, this.actionType = "filter"
            }, w(f.UndoRedo.FiltersAction, f.UndoRedo.Action), f.UndoRedo.FiltersAction.prototype.undo = function (e, t) {
                var n = e.getPlugin("filters");
                e.addHookOnce("afterRender", t), n.formulaCollection.importAllFormulas(this.formulaStacks.slice(0, this.formulaStacks.length - 1)), n.filter()
            }, f.UndoRedo.FiltersAction.prototype.redo = function (e, t) {
                var n = e.getPlugin("filters");
                e.addHookOnce("afterRender", t), n.formulaCollection.importAllFormulas(this.formulaStacks), n.filter()
            }, f.UndoRedo.RowMoveAction = function (e, t) {
                this.rows = e.slice(), this.target = t
            }, w(f.UndoRedo.RowMoveAction, f.UndoRedo.Action), f.UndoRedo.RowMoveAction.prototype.undo = function (e, t) {
                var n = e.getPlugin("manualRowMove");
                e.addHookOnce("afterRender", t);
                for (var o = this.rows[0] < this.target ? -1 * this.rows.length : 0, r = this.rows[0] > this.target ? this.rows[0] + this.rows.length : this.rows[0], i = [], s = this.rows.length + o, a = o; a < s; a++) i.push(this.target + a);
                n.moveRows(i.slice(), r), e.render(), e.selection.setRangeStartOnly(new WalkontableCellCoords(this.rows[0], 0)), e.selection.setRangeEnd(new WalkontableCellCoords(this.rows[this.rows.length - 1], e.countCols() - 1))
            }, f.UndoRedo.RowMoveAction.prototype.redo = function (e, t) {
                var n = e.getPlugin("manualRowMove");
                e.addHookOnce("afterRender", t), n.moveRows(this.rows.slice(), this.target), e.render();
                var o = this.rows[0] < this.target ? this.target - this.rows.length : this.target;
                e.selection.setRangeStartOnly(new WalkontableCellCoords(o, 0)), e.selection.setRangeEnd(new WalkontableCellCoords(o + this.rows.length - 1, e.countCols() - 1))
            }, f.hooks.add("afterInit", o), f.hooks.add("afterUpdateSettings", o), f.hooks.register("beforeUndo"), f.hooks.register("afterUndo"), f.hooks.register("beforeRedo"), f.hooks.register("afterRedo")
        }, {browser: 24, "helpers/array": 43, "helpers/dom/event": 48, "helpers/number": 52, "helpers/object": 53}],
        117: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n;
                c[e] = t, n = u(e) + "Renderer", l.renderers[n] = t, l[n] = t, "base" === e && (l.renderers.cellDecorator = t)
            }

            function r(e) {
                if ("function" == typeof e) return e;
                if ("string" != typeof e) throw Error('Only strings and functions can be passed as "renderer" parameter');
                if (!(e in c)) throw Error('No editor registered under name "' + e + '"');
                return c[e]
            }

            function i(e) {
                return e in c
            }

            Object.defineProperties(n, {
                registerRenderer: {
                    get: function () {
                        return o
                    }
                }, getRenderer: {
                    get: function () {
                        return r
                    }
                }, hasRenderer: {
                    get: function () {
                        return i
                    }
                }, __esModule: {value: !0}
            });
            var s, a, l = (s = e("browser"), s && s.__esModule && s || {default: s}).default,
                u = (a = e("helpers/string"), a && a.__esModule && a || {default: a}).toUpperCaseFirst, c = {};
            l.renderers = l.renderers || {}, l.renderers.registerRenderer = o, l.renderers.getRenderer = r
        }, {browser: 24, "helpers/string": 55}],
        118: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, s) {
                s.className && (t.className ? t.className = t.className + " " + s.className : t.className = s.className), s.readOnly && a(t, s.readOnlyCellClassName), s.valid === !1 && s.invalidCellClassName ? a(t, s.invalidCellClassName) : l(t, s.invalidCellClassName), s.wordWrap === !1 && s.noWordWrapClassName && a(t, s.noWordWrapClassName), !i && s.placeholder && a(t, s.placeholderCellClassName)
            }

            Object.defineProperties(n, {
                cellDecorator: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), a = s.addClass,
                l = s.removeClass, u = (i = e("renderers"), i && i.__esModule && i || {default: i}).registerRenderer;
            u("base", o)
        }, {"helpers/dom/element": 47, renderers: 117}],
        119: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, s) {
                var a = (g.cloneNode(!0), w.cloneNode(!0));
                if (s.allowHtml ? f("html").apply(this, arguments) : f("text").apply(this, arguments), t.appendChild(a), u(t, "htAutocomplete"), t.firstChild || t.appendChild(document.createTextNode(String.fromCharCode(160))), !e.acArrowListener) {
                    var l = d(e);
                    e.acArrowListener = function (r) {
                        c(r.target, "htAutocompleteArrow") && e.view.wt.getSetting("onCellDblClick", null, new m(n, o), t)
                    }, l.addEventListener(e.rootElement, "mousedown", e.acArrowListener), e.addHookOnce("afterDestroy", function () {
                        l.destroy()
                    })
                }
            }

            Object.defineProperties(n, {
                autocompleteRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), u = l.addClass,
                c = l.hasClass,
                d = (l.empty, (i = e("eventManager"), i && i.__esModule && i || {default: i}).eventManager),
                h = (s = e("renderers"), s && s.__esModule && s || {default: s}), f = h.getRenderer,
                p = h.registerRenderer,
                m = (a = e("3rdparty/walkontable/src/cell/coords"), a && a.__esModule && a || {default: a}).WalkontableCellCoords,
                g = document.createElement("DIV");
            g.className = "htAutocompleteWrapper";
            var w = document.createElement("DIV");
            w.className = "htAutocompleteArrow", w.appendChild(document.createTextNode(String.fromCharCode(9660)));
            p("autocomplete", o)
        }, {"3rdparty/walkontable/src/cell/coords": 6, eventManager: 42, "helpers/dom/element": 47, renderers: 117}],
        120: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, a, l, u) {
                function c(e) {
                    var t = "SPACE|ENTER", n = "DELETE|BACKSPACE", o = O(E, e.keyCode);
                    o(t + "|" + n) && !x(e) && h(function () {
                        k(e), e.preventDefault()
                    }), o(t) && d(), o(n) && d(!0)
                }

                function d() {
                    var t = void 0 !== arguments[0] && arguments[0], n = e.getSelectedRange();
                    if (n) {
                        for (var o = n.getTopLeftCorner(), r = n.getBottomRightCorner(), i = [], s = o.row; s <= r.row; s += 1) for (var a = o.col; a <= r.col; a += 1) {
                            var l = e.getCellMeta(s, a);
                            if ("checkbox" !== l.type) return;
                            if (l.readOnly !== !0) {
                                "undefined" == typeof l.checkedTemplate && (l.checkedTemplate = !0), "undefined" == typeof l.uncheckedTemplate && (l.uncheckedTemplate = !1);
                                var u = e.getDataAtCell(s, a);
                                t === !1 ? u === l.checkedTemplate ? i.push([s, a, l.uncheckedTemplate]) : [l.uncheckedTemplate, null, void 0].indexOf(u) !== -1 && i.push([s, a, l.checkedTemplate]) : i.push([s, a, l.uncheckedTemplate])
                            }
                        }
                        i.length > 0 && e.setDataAtCell(i)
                    }
                }

                function h(t) {
                    var n = e.getSelectedRange();
                    if (n) for (var o = n.getTopLeftCorner(), r = n.getBottomRightCorner(), i = o.row; i <= r.row; i++) for (var s = o.col; s <= r.col; s++) {
                        var a = e.getCellMeta(i, s);
                        if ("checkbox" !== a.type) return;
                        var l = e.getCell(i, s);
                        if (null == l) t(i, s, a); else {
                            var u = l.querySelectorAll("input[type=checkbox]");
                            u.length > 0 && !a.readOnly && t(u)
                        }
                    }
                }

                M("base").apply(this, arguments);
                var f = (r(e), i()), p = u.label, m = !1;
                if ("undefined" == typeof u.checkedTemplate && (u.checkedTemplate = !0), "undefined" == typeof u.uncheckedTemplate && (u.uncheckedTemplate = !1), y(t), l === u.checkedTemplate || C(l, u.checkedTemplate) ? f.checked = !0 : l === u.uncheckedTemplate || C(l, u.uncheckedTemplate) ? f.checked = !1 : null === l ? b(f, "noValue") : (f.style.display = "none", b(f, A), m = !0), f.setAttribute("data-row", n), f.setAttribute("data-col", o), !m && p) {
                    var g = "";
                    p.value ? g = "function" == typeof p.value ? p.value.call(this, n, o, a, l) : p.value : p.property && (g = e.getDataAtRowProp(n, p.property));
                    var w = s(g);
                    "before" === p.position ? w.appendChild(f) : w.insertBefore(f, w.firstChild), f = w
                }
                t.appendChild(f), m && t.appendChild(document.createTextNode("#bad-value#")), D.has(e) || (D.set(e, !0), e.addHook("beforeKeyDown", c))
            }

            function r(e) {
                var t = H.get(e);
                return t || (t = new _(e), t.addEventListener(e.rootElement, "click", function (t) {
                    return l(t, e)
                }), t.addEventListener(e.rootElement, "mouseup", function (t) {
                    return a(t, e)
                }), t.addEventListener(e.rootElement, "change", function (t) {
                    return u(t, e)
                }), H.set(e, t)), t
            }

            function i() {
                var e = document.createElement("input");
                return e.className = "htCheckboxRendererInput", e.type = "checkbox", e.setAttribute("autocomplete", "off"), e.setAttribute("tabindex", "-1"), e.cloneNode(!1)
            }

            function s(e) {
                var t = document.createElement("label");
                return t.className = "htCheckboxRendererLabel", t.appendChild(document.createTextNode(e)), t.cloneNode(!0)
            }

            function a(e, t) {
                c(e.target) && setTimeout(t.listen, 10)
            }

            function l(e, t) {
                if (!c(e.target)) return !1;
                var n = parseInt(e.target.getAttribute("data-row"), 10),
                    o = parseInt(e.target.getAttribute("data-col"), 10), r = t.getCellMeta(n, o);
                r.readOnly && e.preventDefault()
            }

            function u(e, t) {
                if (!c(e.target)) return !1;
                var n = parseInt(e.target.getAttribute("data-row"), 10),
                    o = parseInt(e.target.getAttribute("data-col"), 10), r = t.getCellMeta(n, o);
                if (!r.readOnly) {
                    var i = null;
                    i = e.target.checked ? void 0 === r.checkedTemplate || r.checkedTemplate : void 0 !== r.uncheckedTemplate && r.uncheckedTemplate, t.setDataAtCell(n, o, i)
                }
            }

            function c(e) {
                return "INPUT" === e.tagName && "checkbox" === e.getAttribute("type")
            }

            Object.defineProperties(n, {
                checkboxRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var d, h, f, p, m, g, w, v = (d = e("helpers/dom/element"), d && d.__esModule && d || {default: d}),
                y = v.empty, b = v.addClass,
                C = (v.hasClass, (h = e("helpers/string"), h && h.__esModule && h || {default: h}).equalsIgnoreCase),
                _ = (f = e("eventManager"), f && f.__esModule && f || {default: f}).EventManager,
                R = (p = e("renderers"), p && p.__esModule && p || {default: p}), M = R.getRenderer,
                S = R.registerRenderer, E = (m = e("helpers/unicode"), m && m.__esModule && m || {default: m}).isKey,
                O = (g = e("helpers/function"), g && g.__esModule && g || {default: g}).partial,
                T = (w = e("helpers/dom/event"), w && w.__esModule && w || {default: w}),
                k = T.stopImmediatePropagation, x = T.isImmediatePropagationStopped, D = new WeakMap, H = new WeakMap,
                A = "htBadValue";
            S("checkbox", o)
        }, {
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/function": 50,
            "helpers/string": 55,
            "helpers/unicode": 56,
            renderers: 117
        }],
        121: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, a) {
                l("base").apply(this, arguments), null !== i && void 0 !== i || (i = ""), s(t, i)
            }

            Object.defineProperties(n, {
                htmlRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).fastInnerHTML,
                a = (i = e("renderers"), i && i.__esModule && i || {default: i}), l = a.getRenderer,
                u = a.registerRenderer;
            u("html", o)
        }, {"helpers/dom/element": 47, renderers: 117}],
        122: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, s) {
                if (d(i)) {
                    "undefined" != typeof s.language && a.culture(s.language), i = a(i).format(s.format || "0");
                    var l = s.className || "", c = l.length ? l.split(" ") : [];
                    c.indexOf("htLeft") < 0 && c.indexOf("htCenter") < 0 && c.indexOf("htRight") < 0 && c.indexOf("htJustify") < 0 && c.push("htRight"), c.indexOf("htNumeric") < 0 && c.push("htNumeric"), s.className = c.join(" ")
                }
                u("text")(e, t, n, o, r, i, s)
            }

            Object.defineProperties(n, {
                numericRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a = (r = e("numbro"), r && r.__esModule && r || {default: r}).default,
                l = (i = e("renderers"), i && i.__esModule && i || {default: i}), u = l.getRenderer,
                c = l.registerRenderer, d = (s = e("helpers/number"), s && s.__esModule && s || {default: s}).isNumeric;
            c("numeric", o)
        }, {"helpers/number": 52, numbro: "numbro", renderers: 117}],
        123: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, a) {
                l("text").apply(this, arguments), i = t.innerHTML;
                var u, c = a.hashLength || i.length, d = a.hashSymbol || "*";
                for (u = ""; u.split(d).length - 1 < c; u += d) ;
                s(t, u)
            }

            Object.defineProperties(n, {
                passwordRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}).fastInnerHTML,
                a = (i = e("renderers"), i && i.__esModule && i || {default: i}), l = a.getRenderer,
                u = a.registerRenderer;
            u("password", o)
        }, {"helpers/dom/element": 47, renderers: 117}],
        124: [function (e, t, n) {
            "use strict";

            function o(e, t, n, o, r, i, s) {
                h("base").apply(this, arguments), !i && s.placeholder && (i = s.placeholder);
                var a = c(i);
                if (e.getSettings().trimWhitespace || (a = a.replace(/ /g, String.fromCharCode(160))), s.rendererTemplate) {
                    l(t);
                    var d = document.createElement("TEMPLATE");
                    d.setAttribute("bind", "{{}}"), d.innerHTML = s.rendererTemplate, HTMLTemplateElement.decorate(d), d.model = e.getSourceDataAtRow(n), t.appendChild(d)
                } else u(t, a)
            }

            Object.defineProperties(n, {
                textRenderer: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), l = a.empty,
                u = a.fastInnerText, c = (i = e("helpers/mixed"), i && i.__esModule && i || {default: i}).stringify,
                d = (s = e("renderers"), s && s.__esModule && s || {default: s}), h = d.getRenderer,
                f = d.registerRenderer;
            f("text", o)
        }, {"helpers/dom/element": 47, "helpers/mixed": 51, renderers: 117}],
        125: [function (e, t, n) {
            !function (e) {
                "use strict";

                function t(e) {
                    return {configurable: !0, enumerable: !1, value: e, writable: !0}
                }

                function n() {
                    return "__$" + Math.floor(1e9 * Math.random()) + "$" + ++H + "$__"
                }

                function o(e) {
                    return I[e]
                }

                function r() {
                    var e = n();
                    return I[e] = !0, e
                }

                function i(e) {
                    return "object" == typeof e && e instanceof l
                }

                function s(e) {
                    return i(e) ? "symbol" : typeof e
                }

                function a(e) {
                    var t = new l(e);
                    if (!(this instanceof a)) return t;
                    throw new TypeError("Symbol cannot be new'ed")
                }

                function l(e) {
                    var t = n();
                    S(this, N, {value: this}), S(this, A, {value: t}), S(this, P, {value: e}), c(this), L[t] = this
                }

                function u(e) {
                    var t = e[W];
                    return t && t.self === e ? t : x(e) ? (V.hash.value = B++, V.self.value = e, j.value = R(null, V), S(e, W, j), j.value) : void 0
                }

                function c(e) {
                    return u(e), E.apply(this, arguments)
                }

                function d(e) {
                    return L[e] || I[e]
                }

                function h(e) {
                    return i(e) ? e[A] : e
                }

                function f(e) {
                    for (var t = [], n = T(e), o = 0; o < n.length; o++) {
                        var r = L[n[o]];
                        r && t.push(r)
                    }
                    return t
                }

                function p(t) {
                    return e.traceur && e.traceur.options[t]
                }

                function m(e) {
                    for (var t = 1; t < arguments.length; t++) for (var n = T(arguments[t]), o = 0; o < n.length; o++) {
                        var r = n[o];
                        d(r) || !function (t, n) {
                            S(e, n, {
                                get: function () {
                                    return t[n]
                                }, enumerable: !0
                            })
                        }(arguments[t], n[o])
                    }
                    return e
                }

                function g(e) {
                    return null != e && ("object" == typeof e || "function" == typeof e)
                }

                function w(e) {
                    if (null == e) throw _();
                    return C(e)
                }

                function v(e) {
                    if (null == e) throw new TypeError("Value cannot be converted to an Object");
                    return e
                }

                function y(e, t) {
                    e.Symbol || (e.Symbol = t, Object.getOwnPropertySymbols = f), e.Symbol.iterator || (e.Symbol.iterator = t("Symbol.iterator"))
                }

                function b(e) {
                    y(e, a), e.Reflect = e.Reflect || {}, e.Reflect.global = e.Reflect.global || e
                }

                if (!e.$traceurRuntime) {
                    var C = Object, _ = TypeError, R = C.create, M = C.defineProperties, S = C.defineProperty,
                        E = C.freeze, O = C.getOwnPropertyDescriptor, T = C.getOwnPropertyNames, k = C.keys,
                        x = Object.isExtensible, D = t, H = 0, A = n(), P = n(), N = n(), L = R(null), I = R(null);
                    S(a.prototype, "constructor", t(a)), S(a.prototype, "toString", D(function () {
                        var e = this[N];
                        if (!p("symbols")) return e[A];
                        if (!e) throw TypeError("Conversion from symbol to string");
                        var t = e[P];
                        return void 0 === t && (t = ""), "Symbol(" + t + ")"
                    })), S(a.prototype, "valueOf", D(function () {
                        var e = this[N];
                        if (!e) throw TypeError("Conversion from symbol to string");
                        return p("symbols") ? e : e[A]
                    })), S(l.prototype, "constructor", t(a)), S(l.prototype, "toString", {
                        value: a.prototype.toString,
                        enumerable: !1
                    }), S(l.prototype, "valueOf", {value: a.prototype.valueOf, enumerable: !1});
                    var W = r(), j = {value: void 0}, V = {hash: {value: void 0}, self: {value: void 0}}, B = 0;
                    c(l.prototype), b(e), e.$traceurRuntime = {
                        checkObjectCoercible: v,
                        createPrivateName: r,
                        defineProperties: M,
                        defineProperty: S,
                        exportStar: m,
                        getOwnHashObject: u,
                        getOwnPropertyDescriptor: O,
                        getOwnPropertyNames: T,
                        isObject: g,
                        isPrivateName: o,
                        isSymbolString: d,
                        keys: k,
                        setupGlobals: b,
                        toObject: w,
                        toProperty: h,
                        typeof: s
                    }
                }
            }(window), function () {
                "use strict";

                function e() {
                    for (var e, n = [], o = 0, r = 0; r < arguments.length; r++) {
                        var i = $traceurRuntime.checkObjectCoercible(arguments[r]);
                        "function" != typeof i[t(Symbol.iterator)] && (i[t(Symbol.iterator)] = function () {
                            var e = this, t = e.length, n = 0;
                            return {
                                next: function () {
                                    var o = {done: !0};
                                    return n < t && (o.done = !1, o.value = e[n], ++n), o
                                }
                            }
                        });
                        for (var s = i[t(Symbol.iterator)](); !(e = s.next()).done;) n[o++] = e.value
                    }
                    return n
                }

                var t = $traceurRuntime.toProperty;
                $traceurRuntime.spread = e
            }(), function () {
                "use strict";

                function e(e, t) {
                    var n = m(e);
                    do {
                        var o = p(n, t);
                        if (o) return o;
                        n = m(n)
                    } while (n)
                }

                function t(e) {
                    return e.__proto__
                }

                function n(e, t, n, r) {
                    return o(e, t, n).apply(e, r)
                }

                function o(t, n, o) {
                    var r = e(n, o);
                    if (r) return r.get ? r.get.call(t) : r.value
                }

                function r(t, n, o, r) {
                    var i = e(n, o);
                    if (i && i.set) return i.set.call(t, r), r;
                    throw c("super has no setter '" + o + "'.")
                }

                function i(e) {
                    for (var t = {}, n = v(e), o = 0; o < n.length; o++) {
                        var r = n[o];
                        t[r] = p(e, r)
                    }
                    for (var i = y(e), o = 0; o < i.length; o++) {
                        var s = i[o];
                        t[g(s)] = p(e, g(s))
                    }
                    return t
                }

                function s(e, t, n, o) {
                    return f(t, "constructor", {
                        value: e,
                        configurable: !0,
                        enumerable: !1,
                        writable: !0
                    }), arguments.length > 3 ? ("function" == typeof o && (e.__proto__ = o), e.prototype = d(a(o), i(t))) : e.prototype = t, f(e, "prototype", {
                        configurable: !1,
                        writable: !1
                    }), h(e, i(n))
                }

                function a(e) {
                    if ("function" == typeof e) {
                        var t = e.prototype;
                        if (u(t) === t || null === t) return e.prototype;
                        throw new c("super prototype must be an Object or null")
                    }
                    if (null === e) return null;
                    throw new c("Super expression must either be null or a function, not " + typeof e + ".")
                }

                function l(e, t, o) {
                    null !== m(t) && n(e, t, "constructor", o)
                }

                var u = Object, c = TypeError, d = u.create, h = $traceurRuntime.defineProperties,
                    f = $traceurRuntime.defineProperty, p = $traceurRuntime.getOwnPropertyDescriptor,
                    m = Object.getPrototypeOf, g = $traceurRuntime.toProperty, w = Object, v = w.getOwnPropertyNames,
                    y = w.getOwnPropertySymbols;
                $traceurRuntime.createClass = s, $traceurRuntime.defaultSuperCall = l, $traceurRuntime.superCall = n, $traceurRuntime.superConstructor = t, $traceurRuntime.superGet = o, $traceurRuntime.superSet = r
            }()
        }, {}],
        126: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = this, n = this;
                this.eventManager = M(e), this.instance = e, this.settings = e.getSettings(), this.selectionMouseDown = !1;
                var o = e.rootElement.getAttribute("style");
                o && e.rootElement.setAttribute("data-originalstyle", o), p(e.rootElement, "handsontable");
                var r = document.createElement("TABLE");
                p(r, "htCore"), e.getSettings().tableClassName && p(r, e.getSettings().tableClassName), this.THEAD = document.createElement("THEAD"), r.appendChild(this.THEAD), this.TBODY = document.createElement("TBODY"), r.appendChild(this.TBODY), e.table = r, e.container.insertBefore(r, e.container.firstChild), this.eventManager.addEventListener(e.rootElement, "mousedown", function (e) {
                    this.selectionMouseDown = !0, n.isTextSelectionAllowed(e.target) || (s(), e.preventDefault(), window.focus())
                }), this.eventManager.addEventListener(e.rootElement, "mouseup", function (e) {
                    this.selectionMouseDown = !1
                }), this.eventManager.addEventListener(e.rootElement, "mousemove", function (e) {
                    this.selectionMouseDown && !n.isTextSelectionAllowed(e.target) && (s(), e.preventDefault())
                }), this.eventManager.addEventListener(document.documentElement, "keyup", function (t) {
                    e.selection.isInProgress() && !t.shiftKey && e.selection.finish()
                });
                var i;
                this.isMouseDown = function () {
                    return i
                }, this.eventManager.addEventListener(document.documentElement, "mouseup", function (t) {
                    e.selection.isInProgress() && 1 === t.which && e.selection.finish(), i = !1, _(document.activeElement) && e.unlisten()
                }), this.eventManager.addEventListener(document.documentElement, "mousedown", function (t) {
                    var o = t.target, r = t.target, s = t.x || t.clientX, a = t.y || t.clientY;
                    if (!i && e.rootElement) {
                        if (r === e.view.wt.wtTable.holder) {
                            var l = v();
                            if (document.elementFromPoint(s + l, a) !== e.view.wt.wtTable.holder || document.elementFromPoint(s, a + l) !== e.view.wt.wtTable.holder) return
                        } else for (; r !== document.documentElement;) {
                            if (null === r) {
                                if (t.isTargetWebComponent) break;
                                return
                            }
                            if (r === e.rootElement) return;
                            r = r.parentNode
                        }
                        var u = "function" == typeof n.settings.outsideClickDeselects ? n.settings.outsideClickDeselects(o) : n.settings.outsideClickDeselects;
                        u ? e.deselectCell() : e.destroyEditor()
                    }
                }), this.eventManager.addEventListener(r, "selectstart", function (e) {
                    n.settings.fragmentSelection || C(e.target) || e.preventDefault()
                });
                var s = function () {
                    window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
                }, a = [new D({
                    className: "current", border: {
                        width: 2, color: "#5292F7", cornerVisible: function () {
                            return n.settings.fillHandle && !n.isCellEdited() && !e.selection.isMultiple()
                        }, multipleSelectionHandlesVisible: function () {
                            return !n.isCellEdited() && !e.selection.isMultiple()
                        }
                    }
                }), new D({
                    className: "area", border: {
                        width: 1, color: "#89AFF9", cornerVisible: function () {
                            return n.settings.fillHandle && !n.isCellEdited() && e.selection.isMultiple()
                        }, multipleSelectionHandlesVisible: function () {
                            return !n.isCellEdited() && e.selection.isMultiple()
                        }
                    }
                }), new D({
                    className: "highlight",
                    highlightHeaderClassName: n.settings.currentHeaderClassName,
                    highlightRowClassName: n.settings.currentRowClassName,
                    highlightColumnClassName: n.settings.currentColClassName
                }), new D({className: "fill", border: {width: 1, color: "red"}})];
                a.current = a[0], a.area = a[1], a.highlight = a[2], a.fill = a[3];
                var l = {
                    debug: function () {
                        return n.settings.debug
                    },
                    externalRowCalculator: this.instance.getPlugin("autoRowSize") && this.instance.getPlugin("autoRowSize").isEnabled(),
                    table: r,
                    preventOverflow: function () {
                        return t.settings.preventOverflow
                    },
                    stretchH: function () {
                        return n.settings.stretchH
                    },
                    data: e.getDataAtCell,
                    totalRows: function () {
                        return e.countRows()
                    },
                    totalColumns: function () {
                        return e.countCols()
                    },
                    fixedColumnsLeft: function () {
                        return n.settings.fixedColumnsLeft
                    },
                    fixedRowsTop: function () {
                        return n.settings.fixedRowsTop
                    },
                    fixedRowsBottom: function () {
                        return n.settings.fixedRowsBottom
                    },
                    minSpareRows: function () {
                        return n.settings.minSpareRows
                    },
                    renderAllRows: n.settings.renderAllRows,
                    rowHeaders: function () {
                        var t = [];
                        return e.hasRowHeaders() && t.push(function (e, t) {
                            n.appendRowHeader(e, t)
                        }), h.hooks.run(e, "afterGetRowHeaderRenderers", t), t
                    },
                    columnHeaders: function () {
                        var t = [];
                        return e.hasColHeaders() && t.push(function (e, t) {
                            n.appendColHeader(e, t)
                        }), h.hooks.run(e, "afterGetColumnHeaderRenderers", t), t
                    },
                    columnWidth: e.getColWidth,
                    rowHeight: e.getRowHeight,
                    cellRenderer: function (e, t, o) {
                        var r = n.instance.getCellMeta(e, t), i = n.instance.colToProp(t),
                            s = n.instance.getDataAtRowProp(e, i);
                        n.instance.hasHook("beforeValueRender") && (s = n.instance.runHooks("beforeValueRender", s)), n.instance.runHooks("beforeRenderer", o, e, t, i, s, r), n.instance.getCellRenderer(r)(n.instance, o, e, t, i, s, r), n.instance.runHooks("afterRenderer", o, e, t, i, s, r)
                    },
                    selections: a,
                    hideBorderOnMouseDownOver: function () {
                        return n.settings.fragmentSelection
                    },
                    onCellMouseDown: function (t, o, r, s) {
                        var a = {row: !1, column: !1, cells: !1};
                        if (e.listen(), n.activeWt = s, i = !0, h.hooks.run(e, "beforeOnCellMouseDown", t, o, r, a), !O(t)) {
                            var l = e.getSelectedRange(), u = e.selection, c = u.selectedHeader;
                            if (t.shiftKey && l) o.row >= 0 && o.col >= 0 && !a.cells ? (u.setSelectedHeaders(!1, !1), u.setRangeEnd(o)) : (c.cols || c.rows) && o.row >= 0 && o.col >= 0 && !a.cells ? (u.setSelectedHeaders(!1, !1), u.setRangeEnd(new x(o.row, o.col))) : c.cols && o.row < 0 && !a.column ? u.setRangeEnd(new x(l.to.row, o.col)) : c.rows && o.col < 0 && !a.row ? u.setRangeEnd(new x(o.row, l.to.col)) : (!c.cols && !c.rows && o.col < 0 || c.cols && o.col < 0) && !a.row ? (u.setSelectedHeaders(!0, !1), u.setRangeStartOnly(new x(l.from.row, 0)), u.setRangeEnd(new x(o.row, e.countCols() - 1))) : (!c.cols && !c.rows && o.row < 0 || c.rows && o.row < 0) && !a.column && (u.setSelectedHeaders(!1, !0), u.setRangeStartOnly(new x(0, l.from.col)), u.setRangeEnd(new x(e.countRows() - 1, o.col))); else {
                                var d = !0;
                                if (l) {
                                    var f = l, m = f.from, g = f.to, w = !u.inInSelection(o);
                                    if (o.row < 0 && c.cols) {
                                        var v = Math.min(m.col, g.col), y = Math.max(m.col, g.col);
                                        d = o.col < v || o.col > y
                                    } else if (o.col < 0 && c.rows) {
                                        var b = Math.min(m.row, g.row), C = Math.max(m.row, g.row);
                                        d = o.row < b || o.row > C
                                    } else d = w
                                }
                                var _ = T(t), M = k(t) || "touchstart" === t.type;
                                o.row < 0 && o.col >= 0 && !a.column ? (u.setSelectedHeaders(!1, !0), (M || _ && d) && (u.setRangeStartOnly(new x(0, o.col)), u.setRangeEnd(new x(Math.max(e.countRows() - 1, 0), o.col), !1))) : o.col < 0 && o.row >= 0 && !a.row ? (u.setSelectedHeaders(!0, !1), (M || _ && d) && (u.setRangeStartOnly(new x(o.row, 0)), u.setRangeEnd(new x(o.row, Math.max(e.countCols() - 1, 0)), !1))) : o.col >= 0 && o.row >= 0 && !a.cells ? (M || _ && d) && (u.setSelectedHeaders(!1, !1), u.setRangeStart(o)) : o.col < 0 && o.row < 0 && (o.row = 0, o.col = 0, u.setSelectedHeaders(!1, !1, !0), u.setRangeStart(o))
                            }
                            u.selectedHeader.rows ? (R(e.rootElement, "ht__selection--columns"), p(e.rootElement, "ht__selection--rows")) : u.selectedHeader.cols ? (R(e.rootElement, "ht__selection--rows"), p(e.rootElement, "ht__selection--columns")) : R(e.rootElement, ["ht__selection--rows", "ht__selection--columns"]), h.hooks.run(e, "afterOnCellMouseDown", t, o, r), n.activeWt = n.wt
                        }
                    },
                    onCellMouseOver: function (t, o, r, s) {
                        var a = {row: !1, column: !1, cell: !1};
                        n.activeWt = s, h.hooks.run(e, "beforeOnCellMouseOver", t, o, r, a), O(t) || (0 === t.button && i && (o.row >= 0 && o.col >= 0 ? e.selection.selectedHeader.cols && !a.column ? e.selection.setRangeEnd(new x(e.countRows() - 1, o.col), !1) : e.selection.selectedHeader.rows && !a.row ? e.selection.setRangeEnd(new x(o.row, e.countCols() - 1), !1) : a.cell || e.selection.setRangeEnd(o) : e.selection.selectedHeader.cols && !a.column ? e.selection.setRangeEnd(new x(e.countRows() - 1, o.col), !1) : e.selection.selectedHeader.rows && !a.row ? e.selection.setRangeEnd(new x(o.row, e.countCols() - 1), !1) : a.cell || e.selection.setRangeEnd(o)), h.hooks.run(e, "afterOnCellMouseOver", t, o, r), n.activeWt = n.wt)
                    },
                    onCellMouseUp: function (t, o, r, i) {
                        n.activeWt = i, h.hooks.run(e, "beforeOnCellMouseUp", t, o, r), h.hooks.run(e, "afterOnCellMouseUp", t, o, r), n.activeWt = n.wt
                    },
                    onCellCornerMouseDown: function (t) {
                        t.preventDefault(), h.hooks.run(e, "afterOnCellCornerMouseDown", t)
                    },
                    onCellCornerDblClick: function (t) {
                        t.preventDefault(), h.hooks.run(e, "afterOnCellCornerDblClick", t)
                    },
                    beforeDraw: function (e, t) {
                        n.beforeRender(e, t)
                    },
                    onDraw: function (e) {
                        n.onDraw(e)
                    },
                    onScrollVertically: function () {
                        e.runHooks("afterScrollVertically")
                    },
                    onScrollHorizontally: function () {
                        e.runHooks("afterScrollHorizontally")
                    },
                    onBeforeDrawBorders: function (t, n) {
                        e.runHooks("beforeDrawBorders", t, n)
                    },
                    onBeforeTouchScroll: function () {
                        e.runHooks("beforeTouchScroll")
                    },
                    onAfterMomentumScroll: function () {
                        e.runHooks("afterMomentumScroll")
                    },
                    onBeforeStretchingColumnWidth: function (t, n) {
                        return e.runHooks("beforeStretchingColumnWidth", t, n)
                    },
                    onModifyRowHeaderWidth: function (t) {
                        return e.runHooks("modifyRowHeaderWidth", t)
                    },
                    viewportRowCalculatorOverride: function (t) {
                        var o = e.countRows(), r = n.settings.viewportRowRenderingOffset;
                        if ("auto" === r && n.settings.fixedRowsTop && (r = 10), "number" == typeof r && (t.startRow = Math.max(t.startRow - r, 0), t.endRow = Math.min(t.endRow + r, o - 1)), "auto" === r) {
                            var i = t.startRow + t.endRow - t.startRow, s = Math.ceil(i / o * 12);
                            t.startRow = Math.max(t.startRow - s, 0), t.endRow = Math.min(t.endRow + s, o - 1)
                        }
                        e.runHooks("afterViewportRowCalculatorOverride", t)
                    },
                    viewportColumnCalculatorOverride: function (t) {
                        var o = e.countCols(), r = n.settings.viewportColumnRenderingOffset;
                        if ("auto" === r && n.settings.fixedColumnsLeft && (r = 10), "number" == typeof r && (t.startColumn = Math.max(t.startColumn - r, 0), t.endColumn = Math.min(t.endColumn + r, o - 1)), "auto" === r) {
                            var i = t.startColumn + t.endColumn - t.startColumn, s = Math.ceil(i / o * 12);
                            t.startRow = Math.max(t.startColumn - s, 0), t.endColumn = Math.min(t.endColumn + s, o - 1)
                        }
                        e.runHooks("afterViewportColumnCalculatorOverride", t)
                    },
                    rowHeaderWidth: function () {
                        return n.settings.rowHeaderWidth
                    },
                    columnHeaderHeight: function () {
                        var t = e.runHooks("modifyColumnHeaderHeight");
                        return n.settings.columnHeaderHeight || t
                    }
                };
                h.hooks.run(e, "beforeInitWalkontable", l), this.wt = new H(l), this.activeWt = this.wt, this.eventManager.addEventListener(n.wt.wtTable.spreader, "mousedown", function (e) {
                    e.target === n.wt.wtTable.spreader && 3 === e.which && E(e)
                }), this.eventManager.addEventListener(n.wt.wtTable.spreader, "contextmenu", function (e) {
                    e.target === n.wt.wtTable.spreader && 3 === e.which && E(e)
                }), this.eventManager.addEventListener(document.documentElement, "click", function () {
                    n.settings.observeDOMVisibility && n.wt.drawInterrupted && (n.instance.forceFullRender = !0, n.render())
                })
            }

            Object.defineProperties(n, {
                TableView: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c, d, h = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                f = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}), p = f.addClass, m = f.empty,
                g = f.fastInnerHTML, w = f.fastInnerText, v = f.getScrollbarWidth, y = f.hasClass, b = f.isChildOf,
                C = f.isInput, _ = f.isOutsideInput, R = f.removeClass,
                M = ((s = e("helpers/object"), s && s.__esModule && s || {default: s}).createObjectPropListener, (a = e("eventManager"), a && a.__esModule && a || {default: a}).eventManager),
                S = (l = e("helpers/dom/event"), l && l.__esModule && l || {default: l}), E = S.stopPropagation,
                O = S.isImmediatePropagationStopped, T = S.isRightClick, k = S.isLeftClick,
                x = (u = e("3rdparty/walkontable/src/cell/coords"), u && u.__esModule && u || {default: u}).WalkontableCellCoords,
                D = (c = e("3rdparty/walkontable/src/selection"), c && c.__esModule && c || {default: c}).WalkontableSelection,
                H = (d = e("3rdparty/walkontable/src/core"), d && d.__esModule && d || {default: d}).Walkontable;
            h.TableView = o, o.prototype.isTextSelectionAllowed = function (e) {
                if (C(e)) return !0;
                var t = b(e, this.instance.view.wt.wtTable.spreader);
                return !(this.settings.fragmentSelection !== !0 || !t) || (!("cell" !== this.settings.fragmentSelection || !this.isSelectedOnlyCell() || !t) || !(this.settings.fragmentSelection || !this.isCellEdited() || !this.isSelectedOnlyCell()))
            }, o.prototype.isSelectedOnlyCell = function () {
                var e = this.instance.getSelected() || [], t = e[0], n = e[1], o = e[2], r = e[3];
                return void 0 !== t && t === o && n === r
            }, o.prototype.isCellEdited = function () {
                var e = this.instance.getActiveEditor();
                return e && e.isOpened()
            }, o.prototype.beforeRender = function (e, t) {
                e && h.hooks.run(this.instance, "beforeRender", this.instance.forceFullRender, t)
            }, o.prototype.onDraw = function (e) {
                e && h.hooks.run(this.instance, "afterRender", this.instance.forceFullRender)
            }, o.prototype.render = function () {
                this.wt.draw(!this.instance.forceFullRender), this.instance.forceFullRender = !1, this.instance.renderCall = !1
            }, o.prototype.getCellAtCoords = function (e, t) {
                var n = this.wt.getCell(e, t);
                return n < 0 ? null : n
            }, o.prototype.scrollViewport = function (e) {
                this.wt.scrollViewport(e)
            }, o.prototype.appendRowHeader = function (e, t) {
                if (t.firstChild) {
                    var n = t.firstChild;
                    if (!y(n, "relative")) return m(t), void this.appendRowHeader(e, t);
                    this.updateCellHeader(n.querySelector(".rowHeader"), e, this.instance.getRowHeader)
                } else {
                    var o = document.createElement("div"), r = document.createElement("span");
                    o.className = "relative", r.className = "rowHeader", this.updateCellHeader(r, e, this.instance.getRowHeader), o.appendChild(r), t.appendChild(o)
                }
                h.hooks.run(this.instance, "afterGetRowHeader", e, t)
            }, o.prototype.appendColHeader = function (e, t) {
                if (t.firstChild) {
                    var n = t.firstChild;
                    y(n, "relative") ? this.updateCellHeader(n.querySelector(".colHeader"), e, this.instance.getColHeader) : (m(t), this.appendColHeader(e, t))
                } else {
                    var o = document.createElement("div"), r = document.createElement("span");
                    o.className = "relative", r.className = "colHeader", this.updateCellHeader(r, e, this.instance.getColHeader), o.appendChild(r),
                        t.appendChild(o)
                }
                h.hooks.run(this.instance, "afterGetColHeader", e, t)
            }, o.prototype.updateCellHeader = function (e, t, n) {
                var o = t, r = this.wt.wtOverlays.getParentOverlay(e) || this.wt;
                e.parentNode && (y(e, "colHeader") ? o = r.wtTable.columnFilter.sourceToRendered(t) : y(e, "rowHeader") && (o = r.wtTable.rowFilter.sourceToRendered(t))), o > -1 ? g(e, n(t)) : (w(e, String.fromCharCode(160)), p(e, "cornerHeader"))
            }, o.prototype.maximumVisibleElementWidth = function (e) {
                var t = this.wt.wtViewport.getWorkspaceWidth(), n = t - e;
                return n > 0 ? n : 0
            }, o.prototype.maximumVisibleElementHeight = function (e) {
                var t = this.wt.wtViewport.getWorkspaceHeight(), n = t - e;
                return n > 0 ? n : 0
            }, o.prototype.mainViewIsActive = function () {
                return this.wt === this.activeWt
            }, o.prototype.destroy = function () {
                this.wt.destroy(), this.eventManager.destroy()
            }
        }, {
            "3rdparty/walkontable/src/cell/coords": 6,
            "3rdparty/walkontable/src/core": 8,
            "3rdparty/walkontable/src/selection": 19,
            browser: 24,
            eventManager: 42,
            "helpers/dom/element": 47,
            "helpers/dom/event": 48,
            "helpers/object": 53
        }],
        127: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                NodeStructure: {
                    get: function () {
                        return i
                    }
                }, LinkedList: {
                    get: function () {
                        return s
                    }
                }, __esModule: {value: !0}
            });
            var o, r = (o = e("browser"), o && o.__esModule && o || {default: o}).default, i = function (e) {
                this.data = e, this.next = null, this.prev = null
            };
            $traceurRuntime.createClass(i, {}, {});
            var s = function () {
                this.first = null, this.last = null
            };
            $traceurRuntime.createClass(s, {
                push: function (e) {
                    var t = new i(e);
                    if (null === this.first) this.first = this.last = t; else {
                        var n = this.last;
                        this.last = t, t.prev = n, n.next = t
                    }
                }, unshift: function (e) {
                    var t = new i(e);
                    if (null === this.first) this.first = this.last = t; else {
                        var n = this.first;
                        this.first = t, t.next = n, n.prev = t
                    }
                }, inorder: function (e) {
                    for (var t = this.first; t;) e(t), t = t.next
                }, remove: function (e) {
                    if (null === this.first) return !1;
                    for (var t, n, o = this.first; o;) {
                        if (o.data === e) return t = o.next, n = o.prev, t && (t.prev = n), n && (n.next = t), o === this.first && (this.first = t), o === this.last && (this.last = n), !0;
                        o = o.next
                    }
                    return !1
                }, hasCycle: function () {
                    for (var e = this.first, t = this.first; ;) {
                        if (null === e) return !1;
                        if (e = e.next, null === e) return !1;
                        if (e = e.next, t = t.next, e === t) return !0
                    }
                }, pop: function () {
                    if (null === this.last) return null;
                    var e = this.last;
                    return this.last = this.last.prev, e
                }, shift: function () {
                    if (null === this.first) return null;
                    var e = this.first;
                    return this.first = this.first.next, e
                }, recursiveReverse: function () {
                    function e(t, n) {
                        n && (e(n, n.next), n.next = t)
                    }

                    if (this.first) {
                        e(this.first, this.first.next), this.first.next = null;
                        var t = this.first;
                        this.first = this.last, this.last = t
                    }
                }, reverse: function () {
                    if (this.first && this.first.next) {
                        for (var e, t = this.first.next, n = this.first; t;) e = t.next, t.next = n, n.prev = t, n = t, t = e;
                        this.first.next = null, this.last.prev = null, e = this.first, this.first = n, this.last = e
                    }
                }
            }, {}), r.utils.NodeStructure = i, r.utils.LinkedList = s
        }, {browser: 24}],
        128: [function (e, t, n) {
            "use strict";
            Object.defineProperties(n, {
                GhostTable: {
                    get: function () {
                        return m
                    }
                }, __esModule: {value: !0}
            });
            var o, r, i, s, a, l, u = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                c = (r = e("helpers/dom/element"), r && r.__esModule && r || {default: r}), d = c.addClass,
                h = c.outerHeight, f = c.outerWidth,
                p = (i = e("helpers/array"), i && i.__esModule && i || {default: i}).arrayEach,
                m = ((s = e("helpers/object"), s && s.__esModule && s || {default: s}).objectEach, (a = e("helpers/number"), a && a.__esModule && a || {default: a}).rangeEach, (l = e("helpers/mixed"), l && l.__esModule && l || {default: l}).stringify, function (e) {
                    this.hot = e, this.container = null, this.injected = !1, this.rows = [], this.columns = [], this.samples = null, this.settings = {useHeaders: !0}
                });
            $traceurRuntime.createClass(m, {
                addRow: function (e, t) {
                    if (this.columns.length) throw new Error("Doesn't support multi-dimensional table");
                    this.rows.length || (this.container = this.createContainer(this.hot.rootElement.className));
                    var n = {row: e};
                    this.rows.push(n), this.samples = t, this.table = this.createTable(this.hot.table.className), this.table.colGroup.appendChild(this.createColGroupsCol()), this.table.tr.appendChild(this.createRow(e)), this.container.container.appendChild(this.table.fragment), n.table = this.table.table
                }, addColumnHeadersRow: function (e) {
                    if (null != this.hot.getColHeader(0)) {
                        var t = {row: -1};
                        this.rows.push(t), this.container = this.createContainer(this.hot.rootElement.className), this.samples = e, this.table = this.createTable(this.hot.table.className), this.table.colGroup.appendChild(this.createColGroupsCol()), this.table.tHead.appendChild(this.createColumnHeadersRow()), this.container.container.appendChild(this.table.fragment), t.table = this.table.table
                    }
                }, addColumn: function (e, t) {
                    if (this.rows.length) throw new Error("Doesn't support multi-dimensional table");
                    this.columns.length || (this.container = this.createContainer(this.hot.rootElement.className));
                    var n = {col: e};
                    this.columns.push(n), this.samples = t, this.table = this.createTable(this.hot.table.className), this.getSetting("useHeaders") && null !== this.hot.getColHeader(e) && this.hot.view.appendColHeader(e, this.table.th), this.table.tBody.appendChild(this.createCol(e)), this.container.container.appendChild(this.table.fragment), n.table = this.table.table
                }, getHeights: function (e) {
                    this.injected || this.injectTable(), p(this.rows, function (t) {
                        e(t.row, h(t.table) - 1)
                    })
                }, getWidths: function (e) {
                    this.injected || this.injectTable(), p(this.columns, function (t) {
                        e(t.col, f(t.table))
                    })
                }, setSettings: function (e) {
                    this.settings = e
                }, setSetting: function (e, t) {
                    this.settings || (this.settings = {}), this.settings[e] = t
                }, getSettings: function () {
                    return this.settings
                }, getSetting: function (e) {
                    return this.settings ? this.settings[e] : null
                }, createColGroupsCol: function () {
                    var e = this, t = document, n = t.createDocumentFragment();
                    return this.hot.hasRowHeaders() && n.appendChild(this.createColElement(-1)), this.samples.forEach(function (t) {
                        p(t.strings, function (t) {
                            n.appendChild(e.createColElement(t.col))
                        })
                    }), n
                }, createRow: function (e) {
                    var t = this, n = document, o = n.createDocumentFragment(), r = n.createElement("th");
                    return this.hot.hasRowHeaders() && (this.hot.view.appendRowHeader(e, r), o.appendChild(r)), this.samples.forEach(function (r) {
                        p(r.strings, function (r) {
                            var i = r.col, s = t.hot.getCellMeta(e, i);
                            s.col = i, s.row = e;
                            var a = t.hot.getCellRenderer(s), l = n.createElement("td");
                            a(t.hot, l, e, i, t.hot.colToProp(i), r.value, s), o.appendChild(l)
                        })
                    }), o
                }, createColumnHeadersRow: function () {
                    var e = this, t = document, n = t.createDocumentFragment();
                    if (this.hot.hasRowHeaders()) {
                        var o = t.createElement("th");
                        this.hot.view.appendColHeader(-1, o), n.appendChild(o)
                    }
                    return this.samples.forEach(function (o) {
                        p(o.strings, function (o) {
                            var r = o.col, i = t.createElement("th");
                            e.hot.view.appendColHeader(r, i), n.appendChild(i)
                        })
                    }), n
                }, createCol: function (e) {
                    var t = this, n = document, o = n.createDocumentFragment();
                    return this.samples.forEach(function (r) {
                        p(r.strings, function (r) {
                            var i = r.row, s = t.hot.getCellMeta(i, e);
                            s.col = e, s.row = i;
                            var a = t.hot.getCellRenderer(s), l = n.createElement("td"), u = n.createElement("tr");
                            a(t.hot, l, i, e, t.hot.colToProp(e), r.value, s), u.appendChild(l), o.appendChild(u)
                        })
                    }), o
                }, clean: function () {
                    this.rows.length = 0, this.rows[-1] = void 0, this.columns.length = 0, this.samples && this.samples.clear(), this.samples = null, this.removeTable()
                }, injectTable: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : null;
                    this.injected || ((e || this.hot.rootElement).appendChild(this.container.fragment), this.injected = !0)
                }, removeTable: function () {
                    this.injected && this.container.container.parentNode && (this.container.container.parentNode.removeChild(this.container.container), this.container = null, this.injected = !1)
                }, createColElement: function (e) {
                    var t = document, n = t.createElement("col");
                    return n.style.width = this.hot.view.wt.wtTable.getStretchedColumnWidth(e) + "px", n
                }, createTable: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : "", t = document, n = t.createDocumentFragment(),
                        o = t.createElement("table"), r = t.createElement("thead"), i = t.createElement("tbody"),
                        s = t.createElement("colgroup"), a = t.createElement("tr"), l = t.createElement("th");
                    return this.isVertical() && o.appendChild(s), this.isHorizontal() && (a.appendChild(l), r.appendChild(a), o.style.tableLayout = "auto", o.style.width = "auto"), o.appendChild(r), this.isVertical() && i.appendChild(a), o.appendChild(i), d(o, e), n.appendChild(o), {
                        fragment: n,
                        table: o,
                        tHead: r,
                        tBody: i,
                        colGroup: s,
                        tr: a,
                        th: l
                    }
                }, createContainer: function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : "", t = document, n = t.createDocumentFragment(),
                        o = t.createElement("div");
                    return e = "htGhostTable htAutoSize " + e.trim(), d(o, e), n.appendChild(o), {
                        fragment: n,
                        container: o
                    }
                }, isVertical: function () {
                    return !(!this.rows.length || this.columns.length)
                }, isHorizontal: function () {
                    return !(!this.columns.length || this.rows.length)
                }
            }, {}), u.utils.GhostTable = m
        }, {
            browser: 24,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/mixed": 51,
            "helpers/number": 52,
            "helpers/object": 53
        }],
        129: [function (e, t, n) {
            "use strict";

            function o(e) {
                return "string" == typeof e && /fps$/.test(e) && (e = 1e3 / parseInt(e.replace("fps", "") || 0, 10)), e
            }

            Object.defineProperties(n, {
                Interval: {
                    get: function () {
                        return c
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                a = (i = e("helpers/feature"), i && i.__esModule && i || {default: i}), l = a.requestAnimationFrame,
                u = a.cancelAnimationFrame, c = function (e, t) {
                    var n = this;
                    this.timer = null, this.func = e, this.delay = o(t), this.stopped = !0, this._then = null, this._callback = function () {
                        return n.__callback()
                    }
                }, d = c;
            $traceurRuntime.createClass(c, {
                start: function () {
                    return this.stopped && (this._then = Date.now(), this.stopped = !1, this.timer = l(this._callback)), this
                }, stop: function () {
                    return this.stopped || (this.stopped = !0, u(this.timer), this.timer = null), this
                }, __callback: function () {
                    if (this.timer = l(this._callback), this.delay) {
                        var e = Date.now(), t = e - this._then;
                        t > this.delay && (this._then = e - t % this.delay, this.func())
                    } else this.func()
                }
            }, {
                create: function (e, t) {
                    return new d(e, t)
                }
            }), s.utils.Interval = c
        }, {browser: 24, "helpers/feature": 49}],
        130: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                c.set(e, t)
            }

            function r(e) {
                var t;
                if (!(e instanceof a.Core)) {
                    if (!c.has(e)) throw Error("Record translator was not registered for this object identity");
                    e = c.get(e)
                }
                return d.has(e) ? t = d.get(e) : (t = new u(e), d.set(e, t)), t
            }

            Object.defineProperties(n, {
                registerIdentity: {
                    get: function () {
                        return o
                    }
                }, getTranslator: {
                    get: function () {
                        return r
                    }
                }, __esModule: {value: !0}
            });
            var i, s, a = (i = e("browser"), i && i.__esModule && i || {default: i}).default,
                l = (s = e("helpers/object"), s && s.__esModule && s || {default: s}).isObject, u = function (e) {
                    this.hot = e
                };
            $traceurRuntime.createClass(u, {
                toVisualRow: function (e) {
                    return this.hot.runHooks("unmodifyRow", e)
                }, toVisualColumn: function (e) {
                    return this.hot.runHooks("unmodifyCol", e)
                }, toVisual: function (e, t) {
                    var n;
                    return n = l(e) ? {
                        row: this.toVisualRow(e.row),
                        column: this.toVisualColumn(e.column)
                    } : [this.toVisualRow(e), this.toVisualColumn(t)]
                }, toPhysicalRow: function (e) {
                    return this.hot.runHooks("modifyRow", e)
                }, toPhysicalColumn: function (e) {
                    return this.hot.runHooks("modifyCol", e)
                }, toPhysical: function (e, t) {
                    var n;
                    return n = l(e) ? {
                        row: this.toPhysicalRow(e.row),
                        column: this.toPhysicalColumn(e.column)
                    } : [this.toPhysicalRow(e), this.toPhysicalColumn(t)]
                }
            }, {});
            var c = new WeakMap, d = new WeakMap;
            a.utils.RecordTranslator = u, a.utils.RecordTranslatorUtils = {registerIdentity: o, getTranslator: r}
        }, {browser: 24, "helpers/object": 53}],
        131: [function (e, t, n) {
            "use strict";
            var o;
            Object.defineProperties(n, {
                SamplesGenerator: {
                    get: function () {
                        return g
                    }
                }, __esModule: {value: !0}
            });
            var r, i, s, a, l, u, c = (r = e("browser"), r && r.__esModule && r || {default: r}).default,
                d = (i = e("helpers/dom/element"), i && i.__esModule && i || {default: i}),
                h = (d.addClass, d.outerHeight, d.outerWidth, (s = e("helpers/array"), s && s.__esModule && s || {default: s}).arrayEach, a = e("helpers/object"), a && a.__esModule && a || {default: a}),
                f = (h.objectEach, h.isObject),
                p = (l = e("helpers/number"), l && l.__esModule && l || {default: l}).rangeEach,
                m = (u = e("helpers/mixed"), u && u.__esModule && u || {default: u}).stringify, g = function (e) {
                    this.samples = null, this.dataFactory = e, this.customSampleCount = null, this.allowDuplicates = !1
                }, w = g;
            $traceurRuntime.createClass(g, (o = {}, Object.defineProperty(o, "getSampleCount", {
                value: function () {
                    return this.customSampleCount ? this.customSampleCount : w.SAMPLE_COUNT
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "setSampleCount", {
                value: function (e) {
                    this.customSampleCount = e
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "setAllowDuplicates", {
                value: function (e) {
                    this.allowDuplicates = e
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "generateRowSamples", {
                value: function (e, t) {
                    return this.generateSamples("row", t, e)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "generateColumnSamples", {
                value: function (e, t) {
                    return this.generateSamples("col", t, e)
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "generateSamples", {
                value: function (e, t, n) {
                    var o = this, r = new Map;
                    return "number" == typeof n && (n = {from: n, to: n}), p(n.from, n.to, function (n) {
                        var i = o.generateSample(e, t, n);
                        r.set(n, i)
                    }), r
                }, configurable: !0, enumerable: !0, writable: !0
            }), Object.defineProperty(o, "generateSample", {
                value: function (e, t, n) {
                    var o, r = this, i = new Map, s = [];
                    return p(t.from, t.to, function (t) {
                        var a, l;
                        if ("row" === e) l = r.dataFactory(n, t); else {
                            if ("col" !== e) throw new Error("Unsupported sample type");
                            l = r.dataFactory(t, n)
                        }
                        o = f(l) ? Object.keys(l).length : Array.isArray(l) ? l.length : m(l).length, i.has(o) || i.set(o, {
                            needed: r.getSampleCount(),
                            strings: []
                        });
                        var u = i.get(o);
                        if (u.needed) {
                            var c = s.indexOf(l) > -1;
                            if (!c || r.allowDuplicates) {
                                var d = "row" === e ? "col" : "row";
                                u.strings.push((a = {}, Object.defineProperty(a, "value", {
                                    value: l,
                                    configurable: !0,
                                    enumerable: !0,
                                    writable: !0
                                }), Object.defineProperty(a, d, {
                                    value: t,
                                    configurable: !0,
                                    enumerable: !0,
                                    writable: !0
                                }), a)), s.push(l), u.needed--
                            }
                        }
                    }), i
                }, configurable: !0, enumerable: !0, writable: !0
            }), o), {
                get SAMPLE_COUNT() {
                    return 3
                }
            }), c.utils.SamplesGenerator = g
        }, {
            browser: 24,
            "helpers/array": 43,
            "helpers/dom/element": 47,
            "helpers/mixed": 51,
            "helpers/number": 52,
            "helpers/object": 53
        }],
        132: [function (e, t, n) {
            "use strict";

            function o(e) {
                var t = void 0 !== arguments[1] ? arguments[1] : u, n = void 0 !== arguments[2] ? arguments[2] : 0,
                    i = void 0 !== arguments[3] ? arguments[3] : e.length;
                if (Math.abs(i - n) <= 1) return [];
                var s = Math.ceil((n + i) / 2);
                return o(e, t, n, s), o(e, t, s, i), r(e, t, n, s, i)
            }

            function r(e, t, n, o, r) {
                for (var i = new a, s = new a, l = o - n, u = r - o, c = Math.max(l, u), d = r - n, h = 0; h < c; h += 1) h < l && i.push(e[n + h]), h < u && s.push(e[o + h]);
                for (var f = 0; f < d;) i.first && s.first ? t(i.first.data, s.first.data) > 0 ? e[n + f] = s.shift().data : e[n + f] = i.shift().data : i.first ? e[n + f] = i.shift().data : e[n + f] = s.shift().data, f += 1;
                return e
            }

            Object.defineProperties(n, {
                mergeSort: {
                    get: function () {
                        return o
                    }
                }, __esModule: {value: !0}
            });
            var i, s, a = (i = e("../dataStructures/linkedList"), i && i.__esModule && i || {default: i}).LinkedList,
                l = (s = e("browser"), s && s.__esModule && s || {default: s}).default, u = function (e, t) {
                    var n = e.toString(), o = t.toString();
                    return n === o ? 0 : n < o ? -1 : 1
                };
            l.utils.mergeSort = o
        }, {"../dataStructures/linkedList": 127, browser: 24}],
        133: [function (e, t, n) {
            "use strict";

            function o(e, t) {
                var n = e;
                return function (e) {
                    for (var o = !1, r = 0, i = e.length; r < i; r++) if (n === e[r]) {
                        o = !0;
                        break
                    }
                    t(o)
                }
            }

            var r, i, s = (r = e("browser"), r && r.__esModule && r || {default: r}).default;
            (i = e("helpers/mixed"), i && i.__esModule && i || {default: i}).stringify;
            s.AutocompleteValidator = function (e, t) {
                return null == e && (e = ""), this.allowEmpty && "" === e ? void t(!0) : void (this.strict && this.source ? "function" == typeof this.source ? this.source(e, o(e, t)) : o(e, t)(this.source) : t(!0))
            }
        }, {browser: 24, "helpers/mixed": 51}],
        134: [function (e, t, n) {
            "use strict";
            var o, r, i, s, a = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                l = (r = e("moment"), r && r.__esModule && r || {default: r}).default,
                u = (i = e("../helpers/date"), i && i.__esModule && i || {default: i}).getNormalizedDate,
                c = (s = e("editors"), s && s.__esModule && s || {default: s}).getEditor;
            a.DateValidator = function (e, t) {
                var n = !0, o = c("date", this.instance);
                null == e && (e = "");
                var r = l(new Date(e)).isValid() || l(e, o.defaultDateFormat).isValid(),
                    i = l(e, this.dateFormat || o.defaultDateFormat, !0).isValid();
                if (this.allowEmpty && "" === e && (r = !0, i = !0), r || (n = !1), !r && i && (n = !0), r && !i) if (this.correctFormat === !0) {
                    var s = d(e, this.dateFormat), a = this.instance.runHooks("unmodifyRow", this.row),
                        u = this.instance.runHooks("unmodifyCol", this.col);
                    this.instance.setDataAtCell(a, u, s, "dateValidator"), n = !0
                } else n = !1;
                t(n)
            };
            var d = function (e, t) {
                var n, o = l(u(e)), r = l(e, t), i = e.search(/[A-z]/g) > -1;
                return n = o.isValid() && o.format("x") === r.format("x") || !r.isValid() || i ? o : r, n.format(t)
            }
        }, {"../helpers/date": 46, browser: 24, editors: 30, moment: "moment"}],
        135: [function (e, t, n) {
            "use strict";
            var o, r = (o = e("browser"), o && o.__esModule && o || {default: o}).default;
            r.NumericValidator = function (e, t) {
                null == e && (e = ""), t(this.allowEmpty && "" === e ? !0 : "" === e ? !1 : /^-?\d*(\.|\,)?\d*$/.test(e))
            }
        }, {browser: 24}],
        136: [function (e, t, n) {
            "use strict";
            var o, r, i = (o = e("browser"), o && o.__esModule && o || {default: o}).default,
                s = (r = e("moment"), r && r.__esModule && r || {default: r}).default,
                a = ["YYYY-MM-DDTHH:mm:ss.SSSZ", "X", "x"];
            i.TimeValidator = function (e, t) {
                var n = !0, o = this.timeFormat || "h:mm:ss a";
                null === e && (e = ""), e = /^\d{3,}$/.test(e) ? parseInt(e, 10) : e;
                var r = /^\d{1,2}$/.test(e);
                r && (e += ":00");
                var i = s(e, a, !0).isValid() ? s(e) : s(e, o), l = i.isValid(), u = s(e, o, !0).isValid() && !r;
                if (this.allowEmpty && "" === e && (l = !0, u = !0), l || (n = !1), !l && u && (n = !0), l && !u) if (this.correctFormat === !0) {
                    var c = i.format(o), d = this.instance.runHooks("unmodifyRow", this.row),
                        h = this.instance.runHooks("unmodifyCol", this.col);
                    this.instance.setDataAtCell(d, h, c, "timeValidator"), n = !0
                } else n = !1;
                t(n)
            }
        }, {browser: 24, moment: "moment"}],
        SheetClip: [function (e, t, n) {
            !function (e) {
                "use strict";

                function t(e) {
                    return e.split('"').length - 1
                }

                var o = {
                    parse: function (e) {
                        var n, o, r, i, s, a, l, u = [], c = 0;
                        for (r = e.split("\n"), r.length > 1 && "" === r[r.length - 1] && r.pop(), n = 0, o = r.length; n < o; n += 1) {
                            for (r[n] = r[n].split("\t"), i = 0, s = r[n].length; i < s; i += 1) u[c] || (u[c] = []), a && 0 === i ? (l = u[c].length - 1, u[c][l] = u[c][l] + "\n" + r[n][0], a && 1 & t(r[n][0]) && (a = !1, u[c][l] = u[c][l].substring(0, u[c][l].length - 1).replace(/""/g, '"'))) : i === s - 1 && 0 === r[n][i].indexOf('"') && 1 & t(r[n][i]) ? (u[c].push(r[n][i].substring(1).replace(/""/g, '"')), a = !0) : (u[c].push(r[n][i].replace(/""/g, '"')), a = !1);
                            a || (c += 1)
                        }
                        return u
                    }, stringify: function (e) {
                        var t, n, o, r, i, s = "";
                        for (t = 0, n = e.length; t < n; t += 1) {
                            for (r = e[t].length, o = 0; o < r; o += 1) o > 0 && (s += "\t"), i = e[t][o], s += "string" == typeof i ? i.indexOf("\n") > -1 ? '"' + i.replace(/"/g, '""') + '"' : i : null === i || void 0 === i ? "" : i;
                            s += "\n"
                        }
                        return s
                    }
                };
                "undefined" != typeof n ? (n.parse = o.parse, n.stringify = o.stringify) : e.SheetClip = o
            }(window)
        }, {}],
        autoResize: [function (e, t, n) {
            function o() {
                function e(e) {
                    return e.currentStyle || document.defaultView.getComputedStyle(e)
                }

                var t, n = {minHeight: 200, maxHeight: 300, minWidth: 100, maxWidth: 300}, o = document.body,
                    r = document.createTextNode(""), i = document.createElement("SPAN"), s = function (e, t, n) {
                        window.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
                    }, a = function (e, t, n) {
                        window.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
                    }, l = function (s) {
                        var a, l;
                        s ? /^[a-zA-Z \.,\\\/\|0-9]$/.test(s) || (s = ".") : s = "", void 0 !== r.textContent ? r.textContent = t.value + s : r.data = t.value + s, i.style.fontSize = e(t).fontSize, i.style.fontFamily = e(t).fontFamily, i.style.whiteSpace = "pre", o.appendChild(i), a = i.clientWidth + 2, o.removeChild(i), t.style.height = n.minHeight + "px", n.minWidth > a ? t.style.width = n.minWidth + "px" : a > n.maxWidth ? t.style.width = n.maxWidth + "px" : t.style.width = a + "px", l = t.scrollHeight ? t.scrollHeight - 1 : 0, n.minHeight > l ? t.style.height = n.minHeight + "px" : n.maxHeight < l ? (t.style.height = n.maxHeight + "px", t.style.overflowY = "visible") : t.style.height = l + "px"
                    }, u = function () {
                        window.setTimeout(l, 0)
                    }, c = function (e) {
                        if (e && e.minHeight) if ("inherit" == e.minHeight) n.minHeight = t.clientHeight; else {
                            var o = parseInt(e.minHeight);
                            isNaN(o) || (n.minHeight = o)
                        }
                        if (e && e.maxHeight) if ("inherit" == e.maxHeight) n.maxHeight = t.clientHeight; else {
                            var s = parseInt(e.maxHeight);
                            isNaN(s) || (n.maxHeight = s)
                        }
                        if (e && e.minWidth) if ("inherit" == e.minWidth) n.minWidth = t.clientWidth; else {
                            var a = parseInt(e.minWidth);
                            isNaN(a) || (n.minWidth = a)
                        }
                        if (e && e.maxWidth) if ("inherit" == e.maxWidth) n.maxWidth = t.clientWidth; else {
                            var l = parseInt(e.maxWidth);
                            isNaN(l) || (n.maxWidth = l)
                        }
                        i.firstChild || (i.className = "autoResize", i.style.display = "inline-block", i.appendChild(r))
                    }, d = function (e, o, r) {
                        t = e, c(o), "TEXTAREA" == t.nodeName && (t.style.resize = "none", t.style.overflowY = "", t.style.height = n.minHeight + "px", t.style.minWidth = n.minWidth + "px", t.style.maxWidth = n.maxWidth + "px", t.style.overflowY = "hidden"), r && (s(t, "change", l), s(t, "cut", u), s(t, "paste", u), s(t, "drop", u), s(t, "keydown", u), s(t, "focus", l)), l()
                    };
                return {
                    init: function (e, t, n) {
                        d(e, t, n)
                    }, unObserve: function () {
                        a(t, "change", l), a(t, "cut", u), a(t, "paste", u), a(t, "drop", u), a(t, "keydown", u), a(t, "focus", l)
                    }, resize: l
                }
            }

            "undefined" != typeof n && (t.exports = o)
        }, {}],
        copyPaste: [function (e, t, n) {
            function o() {
                return i ? i.hasBeenDestroyed() && i.init() : i = new r, i.refCounter++, i
            }

            function r() {
                this.refCounter = 0, this.init()
            }

            var i;
            "undefined" != typeof n && (t.exports = o), r.prototype.init = function () {
                var e, t;
                this.copyCallbacks = [], this.cutCallbacks = [], this.pasteCallbacks = [], t = document.body, document.getElementById("CopyPasteDiv") ? (this.elDiv = document.getElementById("CopyPasteDiv"), this.elTextarea = this.elDiv.firstChild) : (this.elDiv = document.createElement("div"), this.elDiv.id = "CopyPasteDiv", e = this.elDiv.style, e.position = "fixed", e.top = "-10000px", e.left = "-10000px", t.appendChild(this.elDiv), this.elTextarea = document.createElement("textarea"), this.elTextarea.className = "copyPaste", this.elTextarea.onpaste = function (e) {
                    var t, n;
                    "WebkitAppearance" in document.documentElement.style && (t = e.clipboardData.getData("Text"), navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1 && (n = t.split("\n"), "" === n[n.length - 1] && n.pop(), t = n.join("\n")), this.value = t, e.preventDefault())
                }, e = this.elTextarea.style, e.width = "10000px", e.height = "10000px", e.overflow = "hidden", this.elDiv.appendChild(this.elTextarea), "undefined" != typeof e.opacity && (e.opacity = 0)), this.onKeyDownRef = this.onKeyDown.bind(this), document.documentElement.addEventListener("keydown", this.onKeyDownRef, !1)
            }, r.prototype.onKeyDown = function (e) {
                function t() {
                    var e = document.activeElement;
                    return e.shadowRoot && e.shadowRoot.activeElement && (e = e.shadowRoot.activeElement), ["INPUT", "SELECT", "TEXTAREA"].indexOf(e.nodeName) > -1 || "true" === e.contentEditable
                }

                var n = this, o = !1;
                if (e.metaKey ? o = !0 : e.ctrlKey && navigator.userAgent.indexOf("Mac") === -1 && (o = !0), o) {
                    if (document.activeElement !== this.elTextarea && ("" !== this.getSelectionText() || t())) return;
                    this.selectNodeText(this.elTextarea), setTimeout(function () {
                        document.activeElement !== n.elTextarea && n.selectNodeText(n.elTextarea)
                    }, 0)
                }
                e.isImmediatePropagationEnabled === !1 || !o || 67 !== e.keyCode && 86 !== e.keyCode && 88 !== e.keyCode || (88 === e.keyCode ? setTimeout(function () {
                    n.triggerCut(e)
                }, 0) : 86 === e.keyCode && setTimeout(function () {
                    n.triggerPaste(e)
                }, 0))
            }, r.prototype.selectNodeText = function (e) {
                e && e.select()
            }, r.prototype.getSelectionText = function () {
                var e = "";
                return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
            }, r.prototype.copyable = function (e) {
                if ("string" != typeof e && void 0 === e.toString) throw new Error("copyable requires string parameter");
                this.elTextarea.value = e, this.selectNodeText(this.elTextarea)
            }, r.prototype.onCut = function (e) {
                this.cutCallbacks.push(e)
            }, r.prototype.onPaste = function (e) {
                this.pasteCallbacks.push(e)
            }, r.prototype.removeCallback = function (e) {
                var t, n;
                for (t = 0, n = this.copyCallbacks.length; t < n; t++) if (this.copyCallbacks[t] === e) return this.copyCallbacks.splice(t, 1), !0;
                for (t = 0, n = this.cutCallbacks.length; t < n; t++) if (this.cutCallbacks[t] === e) return this.cutCallbacks.splice(t, 1), !0;
                for (t = 0, n = this.pasteCallbacks.length; t < n; t++) if (this.pasteCallbacks[t] === e) return this.pasteCallbacks.splice(t, 1), !0;
                return !1
            }, r.prototype.triggerCut = function (e) {
                var t = this;
                t.cutCallbacks && setTimeout(function () {
                    for (var n = 0, o = t.cutCallbacks.length; n < o; n++) t.cutCallbacks[n](e)
                }, 50)
            }, r.prototype.triggerPaste = function (e, t) {
                var n = this;
                n.pasteCallbacks && setTimeout(function () {
                    for (var o = t || n.elTextarea.value, r = 0, i = n.pasteCallbacks.length; r < i; r++) n.pasteCallbacks[r](o, e)
                }, 50)
            }, r.prototype.destroy = function () {
                this.hasBeenDestroyed() || 0 !== --this.refCounter || (this.elDiv && this.elDiv.parentNode && (this.elDiv.parentNode.removeChild(this.elDiv), this.elDiv = null, this.elTextarea = null), document.documentElement.removeEventListener("keydown", this.onKeyDownRef), this.onKeyDownRef = null)
            }, r.prototype.hasBeenDestroyed = function () {
                return !this.refCounter
            }
        }, {}],
        es6collections: [function (e, t, n) {/*!
 * Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
            !function (e) {
                "use strict";

                function t(e, t) {
                    function o(e) {
                        return this && this.constructor === o ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = t, void (e && n.call(this, e))) : new o(e)
                    }

                    return t || y(e, "size", {get: g}), e.constructor = o, o.prototype = e, o
                }

                function n(e) {
                    this.add ? e.forEach(this.add, this) : e.forEach(function (e) {
                        this.set(e[0], e[1])
                    }, this)
                }

                function o(e) {
                    return this.has(e) && (this._keys.splice(v, 1), this._values.splice(v, 1), this._itp.forEach(function (e) {
                        v < e[0] && e[0]--
                    })), -1 < v
                }

                function r(e) {
                    return this.has(e) ? this._values[v] : void 0
                }

                function i(e, t) {
                    if (this.objectOnly && t !== Object(t)) throw new TypeError("Invalid value used as weak collection key");
                    if (t != t || 0 === t) for (v = e.length; v-- && !b(e[v], t);) ; else v = e.indexOf(t);
                    return -1 < v
                }

                function s(e) {
                    return i.call(this, this._values, e)
                }

                function a(e) {
                    return i.call(this, this._keys, e)
                }

                function l(e, t) {
                    return this.has(e) ? this._values[v] = t : this._values[this._keys.push(e) - 1] = t, this
                }

                function u(e) {
                    return this.has(e) || this._values.push(e), this
                }

                function c() {
                    this._values.length = 0
                }

                function d() {
                    return m(this._itp, this._keys)
                }

                function h() {
                    return m(this._itp, this._values)
                }

                function f() {
                    return m(this._itp, this._keys, this._values)
                }

                function p() {
                    return m(this._itp, this._values, this._values)
                }

                function m(e, t, n) {
                    var o = [0], r = !1;
                    return e.push(o), {
                        next: function () {
                            var i, s = o[0];
                            return !r && s < t.length ? (i = n ? [t[s], n[s]] : t[s], o[0]++) : (r = !0, e.splice(e.indexOf(o), 1)), {
                                done: r,
                                value: i
                            }
                        }
                    }
                }

                function g() {
                    return this._values.length
                }

                function w(e, t) {
                    for (var n = this.entries(); ;) {
                        var o = n.next();
                        if (o.done) break;
                        e.call(t, o.value[1], o.value[0], this)
                    }
                }

                var v, y = Object.defineProperty, b = function (e, t) {
                    return isNaN(e) ? isNaN(t) : e === t
                };
                "undefined" == typeof WeakMap && (e.WeakMap = t({
                    delete: o,
                    clear: c,
                    get: r,
                    has: a,
                    set: l
                }, !0)), "undefined" == typeof Map && (e.Map = t({
                    delete: o,
                    has: a,
                    get: r,
                    set: l,
                    keys: d,
                    values: h,
                    entries: f,
                    forEach: w,
                    clear: c
                })), "undefined" == typeof Set && (e.Set = t({
                    has: s,
                    add: u,
                    delete: o,
                    clear: c,
                    keys: h,
                    values: h,
                    entries: p,
                    forEach: w
                })), "undefined" == typeof WeakSet && (e.WeakSet = t({delete: o, add: u, clear: c, has: s}, !0))
            }("undefined" != typeof n && "undefined" != typeof global ? global : window)
        }, {}],
        jsonpatch: [function (e, t, n) {/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * json-patch-duplex.js version: 0.5.7
 * (c) 2013 Joachim Wester
 * MIT license
 */
            var o, r = this && this.__extends || function (e, t) {
                function n() {
                    this.constructor = e
                }

                for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }, i = Error;
            !function (e) {
                function t(e, n) {
                    switch (typeof e) {
                        case"undefined":
                        case"boolean":
                        case"string":
                        case"number":
                            return e === n;
                        case"object":
                            if (null === e) return null === n;
                            if (E(e)) {
                                if (!E(n) || e.length !== n.length) return !1;
                                for (var o = 0, r = e.length; o < r; o++) if (!t(e[o], n[o])) return !1;
                                return !0
                            }
                            var i = y(n), s = i.length;
                            if (y(e).length !== s) return !1;
                            for (var o = 0; o < s; o++) if (!t(e[o], n[o])) return !1;
                            return !0;
                        default:
                            return !1
                    }
                }

                function n(e) {
                    return e.indexOf("/") === -1 && e.indexOf("~") === -1 ? e : e.replace(/~/g, "~0").replace(/\//g, "~1")
                }

                function o(e) {
                    for (var t = 0, n = R.length; t < n; t++) if (R[t].obj === e) return R[t]
                }

                function s(e, t) {
                    for (var n = 0, o = e.observers.length; n < o; n++) if (e.observers[n].callback === t) return e.observers[n].observer
                }

                function a(e, t) {
                    for (var n = 0, o = e.observers.length; n < o; n++) if (e.observers[n].observer === t) return void e.observers.splice(n, 1)
                }

                function l(e, t) {
                    t.unobserve()
                }

                function u(e) {
                    return "object" == typeof e ? JSON.parse(JSON.stringify(e)) : e
                }

                function c(e, t) {
                    var n, r = [], l = o(e);
                    if (l ? n = s(l, t) : (l = new M(e), R.push(l)), n) return n;
                    if (n = {}, l.value = u(e), t) {
                        n.callback = t, n.next = null;
                        var c = this.intervals || [100, 1e3, 1e4, 6e4];
                        if (void 0 === c.push) throw new i("jsonpatch.intervals must be an array");
                        var h = 0, f = function () {
                            d(n)
                        }, p = function () {
                            clearTimeout(n.next), n.next = setTimeout(function () {
                                f(), h = 0, n.next = setTimeout(m, c[h++])
                            }, 0)
                        }, m = function () {
                            f(), h == c.length && (h = c.length - 1), n.next = setTimeout(m, c[h++])
                        };
                        "undefined" != typeof window && (window.addEventListener ? (window.addEventListener("mousedown", p), window.addEventListener("mouseup", p), window.addEventListener("keydown", p)) : (document.documentElement.attachEvent("onmousedown", p), document.documentElement.attachEvent("onmouseup", p), document.documentElement.attachEvent("onkeydown", p))), n.next = setTimeout(m, c[h++])
                    }
                    return n.patches = r, n.object = e, n.unobserve = function () {
                        d(n), clearTimeout(n.next), a(l, n), "undefined" != typeof window && (window.removeEventListener ? (window.removeEventListener("mousedown", p), window.removeEventListener("mouseup", p), window.removeEventListener("keydown", p)) : (document.documentElement.detachEvent("onmousedown", p), document.documentElement.detachEvent("onmouseup", p), document.documentElement.detachEvent("onkeydown", p)))
                    }, l.observers.push(new S(t, n)), n
                }

                function d(e) {
                    for (var t, n = 0, o = R.length; n < o; n++) if (R[n].obj === e.object) {
                        t = R[n];
                        break
                    }
                    h(t.value, e.object, e.patches, ""), e.patches.length && p(t.value, e.patches);
                    var r = e.patches;
                    return r.length > 0 && (e.patches = [], e.callback && e.callback(r)), r
                }

                function h(e, t, o, r) {
                    for (var i = y(t), s = y(e), a = !1, l = !1, c = s.length - 1; c >= 0; c--) {
                        var d = s[c], f = e[d];
                        if (t.hasOwnProperty(d)) {
                            var p = t[d];
                            "object" == typeof f && null != f && "object" == typeof p && null != p ? h(f, p, o, r + "/" + n(d)) : f != p && (a = !0, o.push({
                                op: "replace",
                                path: r + "/" + n(d),
                                value: u(p)
                            }))
                        } else o.push({op: "remove", path: r + "/" + n(d)}), l = !0
                    }
                    if (l || i.length != s.length) for (var c = 0; c < i.length; c++) {
                        var d = i[c];
                        e.hasOwnProperty(d) || o.push({op: "add", path: r + "/" + n(d), value: u(t[d])})
                    }
                }

                function f(e) {
                    for (var t, n = 0, o = e.length; n < o;) {
                        t = e.charCodeAt(n);
                        {
                            if (!(t >= 48 && t <= 57)) return !1;
                            n++
                        }
                    }
                    return !0
                }

                function p(e, t, n) {
                    for (var o, r, i = !1, s = 0, a = t.length; s < a;) {
                        o = t[s], s++;
                        for (var l = o.path || "", u = l.split("/"), c = e, d = 1, h = u.length, p = void 0; ;) {
                            if (r = u[d], n && void 0 === p && (void 0 === c[r] ? p = u.slice(0, d).join("/") : d == h - 1 && (p = o.path), void 0 !== p && this.validator(o, s - 1, e, p)), d++, void 0 === r && d >= h) {
                                i = _[o.op].call(o, c, r, e);
                                break
                            }
                            if (E(c)) {
                                if ("-" === r) r = c.length; else {
                                    if (n && !f(r)) throw new O("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", s - 1, o.path, o);
                                    r = parseInt(r, 10)
                                }
                                if (d >= h) {
                                    if (n && "add" === o.op && r > c.length) throw new O("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", s - 1, o.path, o);
                                    i = C[o.op].call(o, c, r, e);
                                    break
                                }
                            } else if (r && r.indexOf("~") != -1 && (r = r.replace(/~1/g, "/").replace(/~0/g, "~")), d >= h) {
                                i = b[o.op].call(o, c, r, e);
                                break
                            }
                            c = c[r]
                        }
                    }
                    return i
                }

                function m(e, t) {
                    var n = [];
                    return h(e, t, n, ""), n
                }

                function g(e) {
                    if (void 0 === e) return !0;
                    if ("array" == typeof e || "object" == typeof e) for (var t in e) if (g(e[t])) return !0;
                    return !1
                }

                function w(t, n, o, r) {
                    if ("object" != typeof t || null === t || E(t)) throw new O("Operation is not an object", "OPERATION_NOT_AN_OBJECT", n, t, o);
                    if (!b[t.op]) throw new O("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", n, t, o);
                    if ("string" != typeof t.path) throw new O("Operation `path` property is not a string", "OPERATION_PATH_INVALID", n, t, o);
                    if (("move" === t.op || "copy" === t.op) && "string" != typeof t.from) throw new O("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", n, t, o);
                    if (("add" === t.op || "replace" === t.op || "test" === t.op) && void 0 === t.value) throw new O("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", n, t, o);
                    if (("add" === t.op || "replace" === t.op || "test" === t.op) && g(t.value)) throw new O("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", n, t, o);
                    if (o) if ("add" == t.op) {
                        var i = t.path.split("/").length, s = r.split("/").length;
                        if (i !== s + 1 && i !== s) throw new O("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", n, t, o)
                    } else if ("replace" === t.op || "remove" === t.op || "_get" === t.op) {
                        if (t.path !== r) throw new O("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", n, t, o)
                    } else if ("move" === t.op || "copy" === t.op) {
                        var a = {op: "_get", path: t.from, value: void 0}, l = e.validate([a], o);
                        if (l && "OPERATION_PATH_UNRESOLVABLE" === l.name) throw new O("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", n, t, o)
                    }
                }

                function v(e, t) {
                    try {
                        if (!E(e)) throw new O("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
                        if (t) t = JSON.parse(JSON.stringify(t)), p.call(this, t, e, !0); else for (var n = 0; n < e.length; n++) this.validator(e[n], n)
                    } catch (e) {
                        if (e instanceof O) return e;
                        throw e
                    }
                }

                var y = function (e) {
                    if (E(e)) {
                        for (var t = new Array(e.length), n = 0; n < t.length; n++) t[n] = "" + n;
                        return t
                    }
                    if (Object.keys) return Object.keys(e);
                    var t = [];
                    for (var o in e) e.hasOwnProperty(o) && t.push(o);
                    return t
                }, b = {
                    add: function (e, t) {
                        return e[t] = this.value, !0
                    }, remove: function (e, t) {
                        return delete e[t], !0
                    }, replace: function (e, t) {
                        return e[t] = this.value, !0
                    }, move: function (e, t, n) {
                        var o = {op: "_get", path: this.from};
                        return p(n, [o]), p(n, [{op: "remove", path: this.from}]), p(n, [{
                            op: "add",
                            path: this.path,
                            value: o.value
                        }]), !0
                    }, copy: function (e, t, n) {
                        var o = {op: "_get", path: this.from};
                        return p(n, [o]), p(n, [{op: "add", path: this.path, value: o.value}]), !0
                    }, test: function (e, n) {
                        return t(e[n], this.value)
                    }, _get: function (e, t) {
                        this.value = e[t]
                    }
                }, C = {
                    add: function (e, t) {
                        return e.splice(t, 0, this.value), !0
                    }, remove: function (e, t) {
                        return e.splice(t, 1), !0
                    }, replace: function (e, t) {
                        return e[t] = this.value, !0
                    }, move: b.move, copy: b.copy, test: b.test, _get: b._get
                }, _ = {
                    add: function (e) {
                        _.remove.call(this, e);
                        for (var t in this.value) this.value.hasOwnProperty(t) && (e[t] = this.value[t]);
                        return !0
                    }, remove: function (e) {
                        for (var t in e) e.hasOwnProperty(t) && b.remove.call(this, e, t);
                        return !0
                    }, replace: function (e) {
                        return p(e, [{op: "remove", path: this.path}]), p(e, [{
                            op: "add",
                            path: this.path,
                            value: this.value
                        }]), !0
                    }, move: b.move, copy: b.copy, test: function (e) {
                        return JSON.stringify(e) === JSON.stringify(this.value)
                    }, _get: function (e) {
                        this.value = e
                    }
                }, R = [], M = function () {
                    function e(e) {
                        this.observers = [], this.obj = e
                    }

                    return e
                }(), S = function () {
                    function e(e, t) {
                        this.callback = e, this.observer = t
                    }

                    return e
                }();
                e.unobserve = l, e.observe = c, e.generate = d;
                var E;
                E = Array.isArray ? Array.isArray : function (e) {
                    return e.push && "number" == typeof e.length
                }, e.apply = p, e.compare = m;
                var O = function (e) {
                    function t(t, n, o, r, i) {
                        e.call(this, t), this.message = t, this.name = n, this.index = o, this.operation = r, this.tree = i
                    }

                    return r(t, e), t
                }(i);
                e.JsonPatchError = O, e.Error = O, e.validator = w, e.validate = v
            }(o || (o = {})), "undefined" != typeof n && (n.apply = o.apply, n.observe = o.observe, n.unobserve = o.unobserve, n.generate = o.generate, n.compare = o.compare, n.validate = o.validate, n.validator = o.validator, n.JsonPatchError = o.JsonPatchError, n.Error = o.Error)
        }, {}],
        moment: [function (t, n, o) {
            !function (t, r) {
                "object" == typeof o && "undefined" != typeof n ? n.exports = r() : "function" == typeof e && e.amd ? e(r) : t.moment = r()
            }(this, function () {
                "use strict";

                function e() {
                    return vo.apply(null, arguments)
                }

                function o(e) {
                    vo = e
                }

                function r(e) {
                    return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
                }

                function i(e) {
                    return null != e && "[object Object]" === Object.prototype.toString.call(e)
                }

                function s(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                }

                function a(e) {
                    return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
                }

                function l(e) {
                    return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
                }

                function u(e, t) {
                    var n, o = [];
                    for (n = 0; n < e.length; ++n) o.push(t(e[n], n));
                    return o
                }

                function c(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }

                function d(e, t) {
                    for (var n in t) c(t, n) && (e[n] = t[n]);
                    return c(t, "toString") && (e.toString = t.toString), c(t, "valueOf") && (e.valueOf = t.valueOf), e
                }

                function h(e, t, n, o) {
                    return yt(e, t, n, o, !0).utc()
                }

                function f() {
                    return {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        meridiem: null
                    }
                }

                function p(e) {
                    return null == e._pf && (e._pf = f()), e._pf
                }

                function m(e) {
                    if (null == e._isValid) {
                        var t = p(e), n = bo.call(t.parsedDateParts, function (e) {
                                return null != e
                            }),
                            o = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
                        if (e._strict && (o = o && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return o;
                        e._isValid = o
                    }
                    return e._isValid
                }

                function g(e) {
                    var t = h(NaN);
                    return null != e ? d(p(t), e) : p(t).userInvalidated = !0, t
                }

                function w(e) {
                    return void 0 === e
                }

                function v(e, t) {
                    var n, o, r;
                    if (w(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), w(t._i) || (e._i = t._i), w(t._f) || (e._f = t._f), w(t._l) || (e._l = t._l), w(t._strict) || (e._strict = t._strict), w(t._tzm) || (e._tzm = t._tzm), w(t._isUTC) || (e._isUTC = t._isUTC), w(t._offset) || (e._offset = t._offset), w(t._pf) || (e._pf = p(t)), w(t._locale) || (e._locale = t._locale), Co.length > 0) for (n in Co) o = Co[n], r = t[o], w(r) || (e[o] = r);
                    return e
                }

                function y(t) {
                    v(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), _o === !1 && (_o = !0, e.updateOffset(this), _o = !1)
                }

                function b(e) {
                    return e instanceof y || null != e && null != e._isAMomentObject
                }

                function C(e) {
                    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
                }

                function _(e) {
                    var t = +e, n = 0;
                    return 0 !== t && isFinite(t) && (n = C(t)), n
                }

                function R(e, t, n) {
                    var o, r = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), s = 0;
                    for (o = 0; o < r; o++) (n && e[o] !== t[o] || !n && _(e[o]) !== _(t[o])) && s++;
                    return s + i
                }

                function M(t) {
                    e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
                }

                function S(t, n) {
                    var o = !0;
                    return d(function () {
                        if (null != e.deprecationHandler && e.deprecationHandler(null, t), o) {
                            for (var r, i = [], s = 0; s < arguments.length; s++) {
                                if (r = "", "object" == typeof arguments[s]) {
                                    r += "\n[" + s + "] ";
                                    for (var a in arguments[0]) r += a + ": " + arguments[0][a] + ", ";
                                    r = r.slice(0, -2)
                                } else r = arguments[s];
                                i.push(r)
                            }
                            M(t + "\nArguments: " + Array.prototype.slice.call(i).join("") + "\n" + (new Error).stack), o = !1
                        }
                        return n.apply(this, arguments)
                    }, n)
                }

                function E(t, n) {
                    null != e.deprecationHandler && e.deprecationHandler(t, n), Ro[t] || (M(n), Ro[t] = !0)
                }

                function O(e) {
                    return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
                }

                function T(e) {
                    var t, n;
                    for (n in e) t = e[n], O(t) ? this[n] = t : this["_" + n] = t;
                    this._config = e, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
                }

                function k(e, t) {
                    var n, o = d({}, e);
                    for (n in t) c(t, n) && (i(e[n]) && i(t[n]) ? (o[n] = {}, d(o[n], e[n]), d(o[n], t[n])) : null != t[n] ? o[n] = t[n] : delete o[n]);
                    for (n in e) c(e, n) && !c(t, n) && i(e[n]) && (o[n] = d({}, o[n]));
                    return o
                }

                function x(e) {
                    null != e && this.set(e)
                }

                function D(e, t, n) {
                    var o = this._calendar[e] || this._calendar.sameElse;
                    return O(o) ? o.call(t, n) : o
                }

                function H(e) {
                    var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
                    return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function (e) {
                        return e.slice(1)
                    }), this._longDateFormat[e])
                }

                function A() {
                    return this._invalidDate
                }

                function P(e) {
                    return this._ordinal.replace("%d", e)
                }

                function N(e, t, n, o) {
                    var r = this._relativeTime[n];
                    return O(r) ? r(e, t, n, o) : r.replace(/%d/i, e)
                }

                function L(e, t) {
                    var n = this._relativeTime[e > 0 ? "future" : "past"];
                    return O(n) ? n(t) : n.replace(/%s/i, t)
                }

                function I(e, t) {
                    var n = e.toLowerCase();
                    Ao[n] = Ao[n + "s"] = Ao[t] = e
                }

                function W(e) {
                    return "string" == typeof e ? Ao[e] || Ao[e.toLowerCase()] : void 0
                }

                function j(e) {
                    var t, n, o = {};
                    for (n in e) c(e, n) && (t = W(n), t && (o[t] = e[n]));
                    return o
                }

                function V(e, t) {
                    Po[e] = t
                }

                function B(e) {
                    var t = [];
                    for (var n in e) t.push({unit: n, priority: Po[n]});
                    return t.sort(function (e, t) {
                        return e.priority - t.priority
                    }), t
                }

                function F(t, n) {
                    return function (o) {
                        return null != o ? (Y(this, t, o), e.updateOffset(this, n), this) : z(this, t)
                    }
                }

                function z(e, t) {
                    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
                }

                function Y(e, t, n) {
                    e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
                }

                function U(e) {
                    return e = W(e), O(this[e]) ? this[e]() : this
                }

                function G(e, t) {
                    if ("object" == typeof e) {
                        e = j(e);
                        for (var n = B(e), o = 0; o < n.length; o++) this[n[o].unit](e[n[o].unit])
                    } else if (e = W(e), O(this[e])) return this[e](t);
                    return this
                }

                function $(e, t, n) {
                    var o = "" + Math.abs(e), r = t - o.length, i = e >= 0;
                    return (i ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + o
                }

                function K(e, t, n, o) {
                    var r = o;
                    "string" == typeof o && (r = function () {
                        return this[o]()
                    }), e && (Wo[e] = r), t && (Wo[t[0]] = function () {
                        return $(r.apply(this, arguments), t[1], t[2])
                    }), n && (Wo[n] = function () {
                        return this.localeData().ordinal(r.apply(this, arguments), e)
                    })
                }

                function X(e) {
                    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
                }

                function q(e) {
                    var t, n, o = e.match(No);
                    for (t = 0, n = o.length; t < n; t++) Wo[o[t]] ? o[t] = Wo[o[t]] : o[t] = X(o[t]);
                    return function (t) {
                        var r, i = "";
                        for (r = 0; r < n; r++) i += o[r] instanceof Function ? o[r].call(t, e) : o[r];
                        return i
                    }
                }

                function Z(e, t) {
                    return e.isValid() ? (t = J(t, e.localeData()), Io[t] = Io[t] || q(t), Io[t](e)) : e.localeData().invalidDate()
                }

                function J(e, t) {
                    function n(e) {
                        return t.longDateFormat(e) || e
                    }

                    var o = 5;
                    for (Lo.lastIndex = 0; o >= 0 && Lo.test(e);) e = e.replace(Lo, n), Lo.lastIndex = 0, o -= 1;
                    return e
                }

                function Q(e, t, n) {
                    nr[e] = O(t) ? t : function (e, o) {
                        return e && n ? n : t
                    }
                }

                function ee(e, t) {
                    return c(nr, e) ? nr[e](t._strict, t._locale) : new RegExp(te(e))
                }

                function te(e) {
                    return ne(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, o, r) {
                        return t || n || o || r
                    }))
                }

                function ne(e) {
                    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }

                function oe(e, t) {
                    var n, o = t;
                    for ("string" == typeof e && (e = [e]), a(t) && (o = function (e, n) {
                        n[t] = _(e)
                    }), n = 0; n < e.length; n++) or[e[n]] = o
                }

                function re(e, t) {
                    oe(e, function (e, n, o, r) {
                        o._w = o._w || {}, t(e, o._w, o, r)
                    })
                }

                function ie(e, t, n) {
                    null != t && c(or, e) && or[e](t, n._a, n, e)
                }

                function se(e, t) {
                    return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
                }

                function ae(e, t) {
                    return e ? r(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || pr).test(t) ? "format" : "standalone"][e.month()] : this._months
                }

                function le(e, t) {
                    return e ? r(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[pr.test(t) ? "format" : "standalone"][e.month()] : this._monthsShort
                }

                function ue(e, t, n) {
                    var o, r, i, s = e.toLocaleLowerCase();
                    if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], o = 0; o < 12; ++o) i = h([2e3, o]), this._shortMonthsParse[o] = this.monthsShort(i, "").toLocaleLowerCase(), this._longMonthsParse[o] = this.months(i, "").toLocaleLowerCase();
                    return n ? "MMM" === t ? (r = fr.call(this._shortMonthsParse, s), r !== -1 ? r : null) : (r = fr.call(this._longMonthsParse, s), r !== -1 ? r : null) : "MMM" === t ? (r = fr.call(this._shortMonthsParse, s), r !== -1 ? r : (r = fr.call(this._longMonthsParse, s), r !== -1 ? r : null)) : (r = fr.call(this._longMonthsParse, s), r !== -1 ? r : (r = fr.call(this._shortMonthsParse, s), r !== -1 ? r : null))
                }

                function ce(e, t, n) {
                    var o, r, i;
                    if (this._monthsParseExact) return ue.call(this, e, t, n);
                    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), o = 0; o < 12; o++) {
                        if (r = h([2e3, o]), n && !this._longMonthsParse[o] && (this._longMonthsParse[o] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[o] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[o] || (i = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[o] = new RegExp(i.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[o].test(e)) return o;
                        if (n && "MMM" === t && this._shortMonthsParse[o].test(e)) return o;
                        if (!n && this._monthsParse[o].test(e)) return o
                    }
                }

                function de(e, t) {
                    var n;
                    if (!e.isValid()) return e;
                    if ("string" == typeof t) if (/^\d+$/.test(t)) t = _(t); else if (t = e.localeData().monthsParse(t), !a(t)) return e;
                    return n = Math.min(e.date(), se(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
                }

                function he(t) {
                    return null != t ? (de(this, t), e.updateOffset(this, !0), this) : z(this, "Month")
                }

                function fe() {
                    return se(this.year(), this.month())
                }

                function pe(e) {
                    return this._monthsParseExact ? (c(this, "_monthsRegex") || ge.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = wr), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }

                function me(e) {
                    return this._monthsParseExact ? (c(this, "_monthsRegex") || ge.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (c(this, "_monthsRegex") || (this._monthsRegex = vr), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
                }

                function ge() {
                    function e(e, t) {
                        return t.length - e.length
                    }

                    var t, n, o = [], r = [], i = [];
                    for (t = 0; t < 12; t++) n = h([2e3, t]), o.push(this.monthsShort(n, "")), r.push(this.months(n, "")), i.push(this.months(n, "")), i.push(this.monthsShort(n, ""));
                    for (o.sort(e), r.sort(e), i.sort(e), t = 0; t < 12; t++) o[t] = ne(o[t]), r[t] = ne(r[t]);
                    for (t = 0; t < 24; t++) i[t] = ne(i[t]);
                    this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
                }

                function we(e) {
                    return ve(e) ? 366 : 365
                }

                function ve(e) {
                    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
                }

                function ye() {
                    return ve(this.year())
                }

                function be(e, t, n, o, r, i, s) {
                    var a = new Date(e, t, n, o, r, i, s);
                    return e < 100 && e >= 0 && isFinite(a.getFullYear()) && a.setFullYear(e), a
                }

                function Ce(e) {
                    var t = new Date(Date.UTC.apply(null, arguments));
                    return e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
                }

                function _e(e, t, n) {
                    var o = 7 + t - n, r = (7 + Ce(e, 0, o).getUTCDay() - t) % 7;
                    return -r + o - 1
                }

                function Re(e, t, n, o, r) {
                    var i, s, a = (7 + n - o) % 7, l = _e(e, o, r), u = 1 + 7 * (t - 1) + a + l;
                    return u <= 0 ? (i = e - 1, s = we(i) + u) : u > we(e) ? (i = e + 1, s = u - we(e)) : (i = e, s = u), {
                        year: i,
                        dayOfYear: s
                    }
                }

                function Me(e, t, n) {
                    var o, r, i = _e(e.year(), t, n), s = Math.floor((e.dayOfYear() - i - 1) / 7) + 1;
                    return s < 1 ? (r = e.year() - 1, o = s + Se(r, t, n)) : s > Se(e.year(), t, n) ? (o = s - Se(e.year(), t, n), r = e.year() + 1) : (r = e.year(), o = s), {
                        week: o,
                        year: r
                    }
                }

                function Se(e, t, n) {
                    var o = _e(e, t, n), r = _e(e + 1, t, n);
                    return (we(e) - o + r) / 7
                }

                function Ee(e) {
                    return Me(e, this._week.dow, this._week.doy).week
                }

                function Oe() {
                    return this._week.dow
                }

                function Te() {
                    return this._week.doy
                }

                function ke(e) {
                    var t = this.localeData().week(this);
                    return null == e ? t : this.add(7 * (e - t), "d")
                }

                function xe(e) {
                    var t = Me(this, 1, 4).week;
                    return null == e ? t : this.add(7 * (e - t), "d")
                }

                function De(e, t) {
                    return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e), "number" == typeof e ? e : null) : parseInt(e, 10)
                }

                function He(e, t) {
                    return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
                }

                function Ae(e, t) {
                    return e ? r(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : this._weekdays
                }

                function Pe(e) {
                    return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
                }

                function Ne(e) {
                    return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
                }

                function Le(e, t, n) {
                    var o, r, i, s = e.toLocaleLowerCase();
                    if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], o = 0; o < 7; ++o) i = h([2e3, 1]).day(o), this._minWeekdaysParse[o] = this.weekdaysMin(i, "").toLocaleLowerCase(), this._shortWeekdaysParse[o] = this.weekdaysShort(i, "").toLocaleLowerCase(), this._weekdaysParse[o] = this.weekdays(i, "").toLocaleLowerCase();
                    return n ? "dddd" === t ? (r = fr.call(this._weekdaysParse, s), r !== -1 ? r : null) : "ddd" === t ? (r = fr.call(this._shortWeekdaysParse, s), r !== -1 ? r : null) : (r = fr.call(this._minWeekdaysParse, s), r !== -1 ? r : null) : "dddd" === t ? (r = fr.call(this._weekdaysParse, s), r !== -1 ? r : (r = fr.call(this._shortWeekdaysParse, s), r !== -1 ? r : (r = fr.call(this._minWeekdaysParse, s), r !== -1 ? r : null))) : "ddd" === t ? (r = fr.call(this._shortWeekdaysParse, s), r !== -1 ? r : (r = fr.call(this._weekdaysParse, s), r !== -1 ? r : (r = fr.call(this._minWeekdaysParse, s), r !== -1 ? r : null))) : (r = fr.call(this._minWeekdaysParse, s), r !== -1 ? r : (r = fr.call(this._weekdaysParse, s), r !== -1 ? r : (r = fr.call(this._shortWeekdaysParse, s), r !== -1 ? r : null)))
                }

                function Ie(e, t, n) {
                    var o, r, i;
                    if (this._weekdaysParseExact) return Le.call(this, e, t, n);
                    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), o = 0; o < 7; o++) {
                        if (r = h([2e3, 1]).day(o), n && !this._fullWeekdaysParse[o] && (this._fullWeekdaysParse[o] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[o] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[o] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[o] || (i = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[o] = new RegExp(i.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[o].test(e)) return o;
                        if (n && "ddd" === t && this._shortWeekdaysParse[o].test(e)) return o;
                        if (n && "dd" === t && this._minWeekdaysParse[o].test(e)) return o;
                        if (!n && this._weekdaysParse[o].test(e)) return o
                    }
                }

                function We(e) {
                    if (!this.isValid()) return null != e ? this : NaN;
                    var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != e ? (e = De(e, this.localeData()), this.add(e - t, "d")) : t
                }

                function je(e) {
                    if (!this.isValid()) return null != e ? this : NaN;
                    var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == e ? t : this.add(e - t, "d")
                }

                function Ve(e) {
                    if (!this.isValid()) return null != e ? this : NaN;
                    if (null != e) {
                        var t = He(e, this.localeData());
                        return this.day(this.day() % 7 ? t : t - 7)
                    }
                    return this.day() || 7
                }

                function Be(e) {
                    return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Ye.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Mr), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }

                function Fe(e) {
                    return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Ye.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (c(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Sr), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }

                function ze(e) {
                    return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Ye.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Er), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }

                function Ye() {
                    function e(e, t) {
                        return t.length - e.length
                    }

                    var t, n, o, r, i, s = [], a = [], l = [], u = [];
                    for (t = 0; t < 7; t++) n = h([2e3, 1]).day(t), o = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), i = this.weekdays(n, ""), s.push(o), a.push(r), l.push(i), u.push(o), u.push(r), u.push(i);
                    for (s.sort(e), a.sort(e), l.sort(e), u.sort(e), t = 0; t < 7; t++) a[t] = ne(a[t]), l[t] = ne(l[t]), u[t] = ne(u[t]);
                    this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
                }

                function Ue() {
                    return this.hours() % 12 || 12
                }

                function Ge() {
                    return this.hours() || 24
                }

                function $e(e, t) {
                    K(e, 0, 0, function () {
                        return this.localeData().meridiem(this.hours(), this.minutes(), t)
                    })
                }

                function Ke(e, t) {
                    return t._meridiemParse
                }

                function Xe(e) {
                    return "p" === (e + "").toLowerCase().charAt(0)
                }

                function qe(e, t, n) {
                    return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
                }

                function Ze(e) {
                    return e ? e.toLowerCase().replace("_", "-") : e
                }

                function Je(e) {
                    for (var t, n, o, r, i = 0; i < e.length;) {
                        for (r = Ze(e[i]).split("-"), t = r.length, n = Ze(e[i + 1]), n = n ? n.split("-") : null; t > 0;) {
                            if (o = Qe(r.slice(0, t).join("-"))) return o;
                            if (n && n.length >= t && R(r, n, !0) >= t - 1) break;
                            t--
                        }
                        i++
                    }
                    return null
                }

                function Qe(e) {
                    var o = null;
                    if (!Dr[e] && "undefined" != typeof n && n && n.exports) try {
                        o = Or._abbr, t("./locale/" + e), et(o)
                    } catch (e) {
                    }
                    return Dr[e]
                }

                function et(e, t) {
                    var n;
                    return e && (n = w(t) ? ot(e) : tt(e, t), n && (Or = n)), Or._abbr
                }

                function tt(e, t) {
                    if (null !== t) {
                        var n = xr;
                        if (t.abbr = e, null != Dr[e]) E("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Dr[e]._config; else if (null != t.parentLocale) {
                            if (null == Dr[t.parentLocale]) return Hr[t.parentLocale] || (Hr[t.parentLocale] = []), Hr[t.parentLocale].push({
                                name: e,
                                config: t
                            }), null;
                            n = Dr[t.parentLocale]._config
                        }
                        return Dr[e] = new x(k(n, t)), Hr[e] && Hr[e].forEach(function (e) {
                            tt(e.name, e.config)
                        }), et(e), Dr[e]
                    }
                    return delete Dr[e], null
                }

                function nt(e, t) {
                    if (null != t) {
                        var n, o = xr;
                        null != Dr[e] && (o = Dr[e]._config), t = k(o, t), n = new x(t), n.parentLocale = Dr[e], Dr[e] = n, et(e)
                    } else null != Dr[e] && (null != Dr[e].parentLocale ? Dr[e] = Dr[e].parentLocale : null != Dr[e] && delete Dr[e]);
                    return Dr[e]
                }

                function ot(e) {
                    var t;
                    if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return Or;
                    if (!r(e)) {
                        if (t = Qe(e)) return t;
                        e = [e]
                    }
                    return Je(e)
                }

                function rt() {
                    return Eo(Dr)
                }

                function it(e) {
                    var t, n = e._a;
                    return n && p(e).overflow === -2 && (t = n[ir] < 0 || n[ir] > 11 ? ir : n[sr] < 1 || n[sr] > se(n[rr], n[ir]) ? sr : n[ar] < 0 || n[ar] > 24 || 24 === n[ar] && (0 !== n[lr] || 0 !== n[ur] || 0 !== n[cr]) ? ar : n[lr] < 0 || n[lr] > 59 ? lr : n[ur] < 0 || n[ur] > 59 ? ur : n[cr] < 0 || n[cr] > 999 ? cr : -1, p(e)._overflowDayOfYear && (t < rr || t > sr) && (t = sr), p(e)._overflowWeeks && t === -1 && (t = dr), p(e)._overflowWeekday && t === -1 && (t = hr), p(e).overflow = t), e
                }

                function st(e) {
                    var t, n, o, r, i, s, a = e._i, l = Ar.exec(a) || Pr.exec(a);
                    if (l) {
                        for (p(e).iso = !0, t = 0, n = Lr.length; t < n; t++) if (Lr[t][1].exec(l[1])) {
                            r = Lr[t][0], o = Lr[t][2] !== !1;
                            break
                        }
                        if (null == r) return void (e._isValid = !1);
                        if (l[3]) {
                            for (t = 0, n = Ir.length; t < n; t++) if (Ir[t][1].exec(l[3])) {
                                i = (l[2] || " ") + Ir[t][0];
                                break
                            }
                            if (null == i) return void (e._isValid = !1)
                        }
                        if (!o && null != i) return void (e._isValid = !1);
                        if (l[4]) {
                            if (!Nr.exec(l[4])) return void (e._isValid = !1);
                            s = "Z"
                        }
                        e._f = r + (i || "") + (s || ""), ht(e)
                    } else e._isValid = !1
                }

                function at(t) {
                    var n = Wr.exec(t._i);
                    return null !== n ? void (t._d = new Date(+n[1])) : (st(t), void (t._isValid === !1 && (delete t._isValid, e.createFromInputFallback(t))))
                }

                function lt(e, t, n) {
                    return null != e ? e : null != t ? t : n
                }

                function ut(t) {
                    var n = new Date(e.now());
                    return t._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
                }

                function ct(e) {
                    var t, n, o, r, i = [];
                    if (!e._d) {
                        for (o = ut(e), e._w && null == e._a[sr] && null == e._a[ir] && dt(e), e._dayOfYear && (r = lt(e._a[rr], o[rr]), e._dayOfYear > we(r) && (p(e)._overflowDayOfYear = !0), n = Ce(r, 0, e._dayOfYear), e._a[ir] = n.getUTCMonth(), e._a[sr] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = i[t] = o[t];
                        for (; t < 7; t++) e._a[t] = i[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                        24 === e._a[ar] && 0 === e._a[lr] && 0 === e._a[ur] && 0 === e._a[cr] && (e._nextDay = !0, e._a[ar] = 0), e._d = (e._useUTC ? Ce : be).apply(null, i), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ar] = 24)
                    }
                }

                function dt(e) {
                    var t, n, o, r, i, s, a, l;
                    if (t = e._w, null != t.GG || null != t.W || null != t.E) i = 1, s = 4, n = lt(t.GG, e._a[rr], Me(bt(), 1, 4).year), o = lt(t.W, 1), r = lt(t.E, 1), (r < 1 || r > 7) && (l = !0); else {
                        i = e._locale._week.dow, s = e._locale._week.doy;
                        var u = Me(bt(), i, s);
                        n = lt(t.gg, e._a[rr], u.year), o = lt(t.w, u.week), null != t.d ? (r = t.d, (r < 0 || r > 6) && (l = !0)) : null != t.e ? (r = t.e + i, (t.e < 0 || t.e > 6) && (l = !0)) : r = i
                    }
                    o < 1 || o > Se(n, i, s) ? p(e)._overflowWeeks = !0 : null != l ? p(e)._overflowWeekday = !0 : (a = Re(n, o, r, i, s), e._a[rr] = a.year, e._dayOfYear = a.dayOfYear)
                }

                function ht(t) {
                    if (t._f === e.ISO_8601) return void st(t);
                    t._a = [], p(t).empty = !0;
                    var n, o, r, i, s, a = "" + t._i, l = a.length, u = 0;
                    for (r = J(t._f, t._locale).match(No) || [], n = 0; n < r.length; n++) i = r[n], o = (a.match(ee(i, t)) || [])[0], o && (s = a.substr(0, a.indexOf(o)), s.length > 0 && p(t).unusedInput.push(s), a = a.slice(a.indexOf(o) + o.length), u += o.length), Wo[i] ? (o ? p(t).empty = !1 : p(t).unusedTokens.push(i), ie(i, o, t)) : t._strict && !o && p(t).unusedTokens.push(i);
                    p(t).charsLeftOver = l - u, a.length > 0 && p(t).unusedInput.push(a), t._a[ar] <= 12 && p(t).bigHour === !0 && t._a[ar] > 0 && (p(t).bigHour = void 0), p(t).parsedDateParts = t._a.slice(0), p(t).meridiem = t._meridiem, t._a[ar] = ft(t._locale, t._a[ar], t._meridiem), ct(t), it(t)
                }

                function ft(e, t, n) {
                    var o;
                    return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (o = e.isPM(n), o && t < 12 && (t += 12), o || 12 !== t || (t = 0), t) : t
                }

                function pt(e) {
                    var t, n, o, r, i;
                    if (0 === e._f.length) return p(e).invalidFormat = !0, void (e._d = new Date(NaN));
                    for (r = 0; r < e._f.length; r++) i = 0, t = v({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[r], ht(t), m(t) && (i += p(t).charsLeftOver, i += 10 * p(t).unusedTokens.length, p(t).score = i, (null == o || i < o) && (o = i, n = t));
                    d(e, n || t)
                }

                function mt(e) {
                    if (!e._d) {
                        var t = j(e._i);
                        e._a = u([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) {
                            return e && parseInt(e, 10)
                        }), ct(e)
                    }
                }

                function gt(e) {
                    var t = new y(it(wt(e)));
                    return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t
                }

                function wt(e) {
                    var t = e._i, n = e._f;
                    return e._locale = e._locale || ot(e._l), null === t || void 0 === n && "" === t ? g({nullInput: !0}) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), b(t) ? new y(it(t)) : (l(t) ? e._d = t : r(n) ? pt(e) : n ? ht(e) : vt(e), m(e) || (e._d = null), e))
                }

                function vt(t) {
                    var n = t._i;
                    void 0 === n ? t._d = new Date(e.now()) : l(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? at(t) : r(n) ? (t._a = u(n.slice(0), function (e) {
                        return parseInt(e, 10)
                    }), ct(t)) : "object" == typeof n ? mt(t) : a(n) ? t._d = new Date(n) : e.createFromInputFallback(t)
                }

                function yt(e, t, n, o, a) {
                    var l = {};
                    return n !== !0 && n !== !1 || (o = n, n = void 0), (i(e) && s(e) || r(e) && 0 === e.length) && (e = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = a, l._l = n, l._i = e, l._f = t, l._strict = o, gt(l)
                }

                function bt(e, t, n, o) {
                    return yt(e, t, n, o, !1)
                }

                function Ct(e, t) {
                    var n, o;
                    if (1 === t.length && r(t[0]) && (t = t[0]), !t.length) return bt();
                    for (n = t[0], o = 1; o < t.length; ++o) t[o].isValid() && !t[o][e](n) || (n = t[o]);
                    return n
                }

                function _t() {
                    var e = [].slice.call(arguments, 0);
                    return Ct("isBefore", e)
                }

                function Rt() {
                    var e = [].slice.call(arguments, 0);
                    return Ct("isAfter", e)
                }

                function Mt(e) {
                    var t = j(e), n = t.year || 0, o = t.quarter || 0, r = t.month || 0, i = t.week || 0,
                        s = t.day || 0, a = t.hour || 0, l = t.minute || 0, u = t.second || 0, c = t.millisecond || 0;
                    this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * a * 60 * 60, this._days = +s + 7 * i, this._months = +r + 3 * o + 12 * n, this._data = {}, this._locale = ot(), this._bubble()
                }

                function St(e) {
                    return e instanceof Mt
                }

                function Et(e) {
                    return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e)
                }

                function Ot(e, t) {
                    K(e, 0, 0, function () {
                        var e = this.utcOffset(), n = "+";
                        return e < 0 && (e = -e, n = "-"), n + $(~~(e / 60), 2) + t + $(~~e % 60, 2)
                    })
                }

                function Tt(e, t) {
                    var n = (t || "").match(e);
                    if (null === n) return null;
                    var o = n[n.length - 1] || [], r = (o + "").match(Fr) || ["-", 0, 0], i = +(60 * r[1]) + _(r[2]);
                    return 0 === i ? 0 : "+" === r[0] ? i : -i
                }

                function kt(t, n) {
                    var o, r;
                    return n._isUTC ? (o = n.clone(), r = (b(t) || l(t) ? t.valueOf() : bt(t).valueOf()) - o.valueOf(), o._d.setTime(o._d.valueOf() + r), e.updateOffset(o, !1), o) : bt(t).local()
                }

                function xt(e) {
                    return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
                }

                function Dt(t, n) {
                    var o, r = this._offset || 0;
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null != t) {
                        if ("string" == typeof t) {
                            if (t = Tt(Qo, t), null === t) return this
                        } else Math.abs(t) < 16 && (t *= 60);
                        return !this._isUTC && n && (o = xt(this)), this._offset = t, this._isUTC = !0, null != o && this.add(o, "m"), r !== t && (!n || this._changeInProgress ? $t(this, Ft(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this
                    }
                    return this._isUTC ? r : xt(this)
                }

                function Ht(e, t) {
                    return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
                }

                function At(e) {
                    return this.utcOffset(0, e)
                }

                function Pt(e) {
                    return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(xt(this), "m")), this
                }

                function Nt() {
                    if (null != this._tzm) this.utcOffset(this._tzm); else if ("string" == typeof this._i) {
                        var e = Tt(Jo, this._i);
                        null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
                    }
                    return this
                }

                function Lt(e) {
                    return !!this.isValid() && (e = e ? bt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0)
                }

                function It() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }

                function Wt() {
                    if (!w(this._isDSTShifted)) return this._isDSTShifted;
                    var e = {};
                    if (v(e, this), e = wt(e), e._a) {
                        var t = e._isUTC ? h(e._a) : bt(e._a);
                        this._isDSTShifted = this.isValid() && R(e._a, t.toArray()) > 0
                    } else this._isDSTShifted = !1;
                    return this._isDSTShifted
                }

                function jt() {
                    return !!this.isValid() && !this._isUTC
                }

                function Vt() {
                    return !!this.isValid() && this._isUTC
                }

                function Bt() {
                    return !!this.isValid() && (this._isUTC && 0 === this._offset)
                }

                function Ft(e, t) {
                    var n, o, r, i = e, s = null;
                    return St(e) ? i = {
                        ms: e._milliseconds,
                        d: e._days,
                        M: e._months
                    } : a(e) ? (i = {}, t ? i[t] = e : i.milliseconds = e) : (s = zr.exec(e)) ? (n = "-" === s[1] ? -1 : 1, i = {
                        y: 0,
                        d: _(s[sr]) * n,
                        h: _(s[ar]) * n,
                        m: _(s[lr]) * n,
                        s: _(s[ur]) * n,
                        ms: _(Et(1e3 * s[cr])) * n
                    }) : (s = Yr.exec(e)) ? (n = "-" === s[1] ? -1 : 1, i = {
                        y: zt(s[2], n),
                        M: zt(s[3], n),
                        w: zt(s[4], n),
                        d: zt(s[5], n),
                        h: zt(s[6], n),
                        m: zt(s[7], n),
                        s: zt(s[8], n)
                    }) : null == i ? i = {} : "object" == typeof i && ("from" in i || "to" in i) && (r = Ut(bt(i.from), bt(i.to)), i = {}, i.ms = r.milliseconds, i.M = r.months), o = new Mt(i), St(e) && c(e, "_locale") && (o._locale = e._locale), o
                }

                function zt(e, t) {
                    var n = e && parseFloat(e.replace(",", "."));
                    return (isNaN(n) ? 0 : n) * t
                }

                function Yt(e, t) {
                    var n = {milliseconds: 0, months: 0};
                    return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
                }

                function Ut(e, t) {
                    var n;
                    return e.isValid() && t.isValid() ? (t = kt(t, e), e.isBefore(t) ? n = Yt(e, t) : (n = Yt(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
                        milliseconds: 0,
                        months: 0
                    }
                }

                function Gt(e, t) {
                    return function (n, o) {
                        var r, i;
                        return null === o || isNaN(+o) || (E(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), i = n, n = o, o = i), n = "string" == typeof n ? +n : n, r = Ft(n, o), $t(this, r, e), this
                    }
                }

                function $t(t, n, o, r) {
                    var i = n._milliseconds, s = Et(n._days), a = Et(n._months);
                    t.isValid() && (r = null == r || r, i && t._d.setTime(t._d.valueOf() + i * o), s && Y(t, "Date", z(t, "Date") + s * o), a && de(t, z(t, "Month") + a * o), r && e.updateOffset(t, s || a))
                }

                function Kt(e, t) {
                    var n = e.diff(t, "days", !0);
                    return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
                }

                function Xt(t, n) {
                    var o = t || bt(), r = kt(o, this).startOf("day"), i = e.calendarFormat(this, r) || "sameElse",
                        s = n && (O(n[i]) ? n[i].call(this, o) : n[i]);
                    return this.format(s || this.localeData().calendar(i, this, bt(o)))
                }

                function qt() {
                    return new y(this)
                }

                function Zt(e, t) {
                    var n = b(e) ? e : bt(e);
                    return !(!this.isValid() || !n.isValid()) && (t = W(w(t) ? "millisecond" : t), "millisecond" === t ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
                }

                function Jt(e, t) {
                    var n = b(e) ? e : bt(e);
                    return !(!this.isValid() || !n.isValid()) && (t = W(w(t) ? "millisecond" : t), "millisecond" === t ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
                }

                function Qt(e, t, n, o) {
                    return o = o || "()", ("(" === o[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === o[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
                }

                function en(e, t) {
                    var n, o = b(e) ? e : bt(e);
                    return !(!this.isValid() || !o.isValid()) && (t = W(t || "millisecond"), "millisecond" === t ? this.valueOf() === o.valueOf() : (n = o.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
                }

                function tn(e, t) {
                    return this.isSame(e, t) || this.isAfter(e, t)
                }

                function nn(e, t) {
                    return this.isSame(e, t) || this.isBefore(e, t)
                }

                function on(e, t, n) {
                    var o, r, i, s;
                    return this.isValid() ? (o = kt(e, this), o.isValid() ? (r = 6e4 * (o.utcOffset() - this.utcOffset()), t = W(t), "year" === t || "month" === t || "quarter" === t ? (s = rn(this, o), "quarter" === t ? s /= 3 : "year" === t && (s /= 12)) : (i = this - o, s = "second" === t ? i / 1e3 : "minute" === t ? i / 6e4 : "hour" === t ? i / 36e5 : "day" === t ? (i - r) / 864e5 : "week" === t ? (i - r) / 6048e5 : i), n ? s : C(s)) : NaN) : NaN
                }

                function rn(e, t) {
                    var n, o, r = 12 * (t.year() - e.year()) + (t.month() - e.month()), i = e.clone().add(r, "months");
                    return t - i < 0 ? (n = e.clone().add(r - 1, "months"), o = (t - i) / (i - n)) : (n = e.clone().add(r + 1, "months"), o = (t - i) / (n - i)), -(r + o) || 0
                }

                function sn() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }

                function an() {
                    var e = this.clone().utc();
                    return 0 < e.year() && e.year() <= 9999 ? O(Date.prototype.toISOString) ? this.toDate().toISOString() : Z(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : Z(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                }

                function ln() {
                    if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
                    var e = "moment", t = "";
                    this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
                    var n = "[" + e + '("]', o = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                        r = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]';
                    return this.format(n + o + r + i)
                }

                function un(t) {
                    t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);
                    var n = Z(this, t);
                    return this.localeData().postformat(n)
                }

                function cn(e, t) {
                    return this.isValid() && (b(e) && e.isValid() || bt(e).isValid()) ? Ft({
                        to: this,
                        from: e
                    }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
                }

                function dn(e) {
                    return this.from(bt(), e)
                }

                function hn(e, t) {
                    return this.isValid() && (b(e) && e.isValid() || bt(e).isValid()) ? Ft({
                        from: this,
                        to: e
                    }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
                }

                function fn(e) {
                    return this.to(bt(), e)
                }

                function pn(e) {
                    var t;
                    return void 0 === e ? this._locale._abbr : (t = ot(e), null != t && (this._locale = t), this)
                }

                function mn() {
                    return this._locale
                }

                function gn(e) {
                    switch (e = W(e)) {
                        case"year":
                            this.month(0);
                        case"quarter":
                        case"month":
                            this.date(1);
                        case"week":
                        case"isoWeek":
                        case"day":
                        case"date":
                            this.hours(0);
                        case"hour":
                            this.minutes(0);
                        case"minute":
                            this.seconds(0);
                        case"second":
                            this.milliseconds(0)
                    }
                    return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
                }

                function wn(e) {
                    return e = W(e), void 0 === e || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
                }

                function vn() {
                    return this._d.valueOf() - 6e4 * (this._offset || 0)
                }

                function yn() {
                    return Math.floor(this.valueOf() / 1e3)
                }

                function bn() {
                    return new Date(this.valueOf())
                }

                function Cn() {
                    var e = this;
                    return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
                }

                function _n() {
                    var e = this;
                    return {
                        years: e.year(),
                        months: e.month(),
                        date: e.date(),
                        hours: e.hours(),
                        minutes: e.minutes(),
                        seconds: e.seconds(),
                        milliseconds: e.milliseconds()
                    }
                }

                function Rn() {
                    return this.isValid() ? this.toISOString() : null
                }

                function Mn() {
                    return m(this)
                }

                function Sn() {
                    return d({}, p(this))
                }

                function En() {
                    return p(this).overflow
                }

                function On() {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }

                function Tn(e, t) {
                    K(0, [e, e.length], 0, t)
                }

                function kn(e) {
                    return An.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                }

                function xn(e) {
                    return An.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
                }

                function Dn() {
                    return Se(this.year(), 1, 4)
                }

                function Hn() {
                    var e = this.localeData()._week;
                    return Se(this.year(), e.dow, e.doy)
                }

                function An(e, t, n, o, r) {
                    var i;
                    return null == e ? Me(this, o, r).year : (i = Se(e, o, r), t > i && (t = i), Pn.call(this, e, t, n, o, r))
                }

                function Pn(e, t, n, o, r) {
                    var i = Re(e, t, n, o, r), s = Ce(i.year, 0, i.dayOfYear);
                    return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this
                }

                function Nn(e) {
                    return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
                }

                function Ln(e) {
                    var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == e ? t : this.add(e - t, "d")
                }

                function In(e, t) {
                    t[cr] = _(1e3 * ("0." + e))
                }

                function Wn() {
                    return this._isUTC ? "UTC" : ""
                }

                function jn() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }

                function Vn(e) {
                    return bt(1e3 * e)
                }

                function Bn() {
                    return bt.apply(null, arguments).parseZone()
                }

                function Fn(e) {
                    return e
                }

                function zn(e, t, n, o) {
                    var r = ot(), i = h().set(o, t);
                    return r[n](i, e)
                }

                function Yn(e, t, n) {
                    if (a(e) && (t = e, e = void 0), e = e || "", null != t) return zn(e, t, n, "month");
                    var o, r = [];
                    for (o = 0; o < 12; o++) r[o] = zn(e, o, n, "month");
                    return r
                }

                function Un(e, t, n, o) {
                    "boolean" == typeof e ? (a(t) && (n = t, t = void 0), t = t || "") : (t = e, n = t, e = !1, a(t) && (n = t, t = void 0), t = t || "");
                    var r = ot(), i = e ? r._week.dow : 0;
                    if (null != n) return zn(t, (n + i) % 7, o, "day");
                    var s, l = [];
                    for (s = 0; s < 7; s++) l[s] = zn(t, (s + i) % 7, o, "day");
                    return l
                }

                function Gn(e, t) {
                    return Yn(e, t, "months")
                }

                function $n(e, t) {
                    return Yn(e, t, "monthsShort")
                }

                function Kn(e, t, n) {
                    return Un(e, t, n, "weekdays")
                }

                function Xn(e, t, n) {
                    return Un(e, t, n, "weekdaysShort")
                }

                function qn(e, t, n) {
                    return Un(e, t, n, "weekdaysMin")
                }

                function Zn() {
                    var e = this._data;
                    return this._milliseconds = ti(this._milliseconds), this._days = ti(this._days), this._months = ti(this._months), e.milliseconds = ti(e.milliseconds), e.seconds = ti(e.seconds), e.minutes = ti(e.minutes), e.hours = ti(e.hours), e.months = ti(e.months), e.years = ti(e.years), this
                }

                function Jn(e, t, n, o) {
                    var r = Ft(t, n);
                    return e._milliseconds += o * r._milliseconds, e._days += o * r._days, e._months += o * r._months, e._bubble()
                }

                function Qn(e, t) {
                    return Jn(this, e, t, 1)
                }

                function eo(e, t) {
                    return Jn(this, e, t, -1)
                }

                function to(e) {
                    return e < 0 ? Math.floor(e) : Math.ceil(e)
                }

                function no() {
                    var e, t, n, o, r, i = this._milliseconds, s = this._days, a = this._months, l = this._data;
                    return i >= 0 && s >= 0 && a >= 0 || i <= 0 && s <= 0 && a <= 0 || (i += 864e5 * to(ro(a) + s), s = 0, a = 0), l.milliseconds = i % 1e3, e = C(i / 1e3), l.seconds = e % 60, t = C(e / 60), l.minutes = t % 60, n = C(t / 60), l.hours = n % 24, s += C(n / 24), r = C(oo(s)), a += r, s -= to(ro(r)), o = C(a / 12), a %= 12, l.days = s, l.months = a, l.years = o, this
                }

                function oo(e) {
                    return 4800 * e / 146097
                }

                function ro(e) {
                    return 146097 * e / 4800
                }

                function io(e) {
                    var t, n, o = this._milliseconds;
                    if (e = W(e), "month" === e || "year" === e) return t = this._days + o / 864e5, n = this._months + oo(t), "month" === e ? n : n / 12;
                    switch (t = this._days + Math.round(ro(this._months)), e) {
                        case"week":
                            return t / 7 + o / 6048e5;
                        case"day":
                            return t + o / 864e5;
                        case"hour":
                            return 24 * t + o / 36e5;
                        case"minute":
                            return 1440 * t + o / 6e4;
                        case"second":
                            return 86400 * t + o / 1e3;
                        case"millisecond":
                            return Math.floor(864e5 * t) + o;
                        default:
                            throw new Error("Unknown unit " + e)
                    }
                }

                function so() {
                    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * _(this._months / 12)
                }

                function ao(e) {
                    return function () {
                        return this.as(e)
                    }
                }

                function lo(e) {
                    return e = W(e), this[e + "s"]()
                }

                function uo(e) {
                    return function () {
                        return this._data[e]
                    }
                }

                function co() {
                    return C(this.days() / 7)
                }

                function ho(e, t, n, o, r) {
                    return r.relativeTime(t || 1, !!n, e, o)
                }

                function fo(e, t, n) {
                    var o = Ft(e).abs(), r = wi(o.as("s")), i = wi(o.as("m")), s = wi(o.as("h")), a = wi(o.as("d")),
                        l = wi(o.as("M")), u = wi(o.as("y")),
                        c = r < vi.s && ["s", r] || i <= 1 && ["m"] || i < vi.m && ["mm", i] || s <= 1 && ["h"] || s < vi.h && ["hh", s] || a <= 1 && ["d"] || a < vi.d && ["dd", a] || l <= 1 && ["M"] || l < vi.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u];
                    return c[2] = t, c[3] = +e > 0, c[4] = n, ho.apply(null, c)
                }

                function po(e) {
                    return void 0 === e ? wi : "function" == typeof e && (wi = e, !0)
                }

                function mo(e, t) {
                    return void 0 !== vi[e] && (void 0 === t ? vi[e] : (vi[e] = t, !0))
                }

                function go(e) {
                    var t = this.localeData(), n = fo(this, !e, t);
                    return e && (n = t.pastFuture(+this, n)), t.postformat(n)
                }

                function wo() {
                    var e, t, n, o = yi(this._milliseconds) / 1e3, r = yi(this._days), i = yi(this._months);
                    e = C(o / 60), t = C(e / 60), o %= 60, e %= 60, n = C(i / 12), i %= 12;
                    var s = n, a = i, l = r, u = t, c = e, d = o, h = this.asSeconds();
                    return h ? (h < 0 ? "-" : "") + "P" + (s ? s + "Y" : "") + (a ? a + "M" : "") + (l ? l + "D" : "") + (u || c || d ? "T" : "") + (u ? u + "H" : "") + (c ? c + "M" : "") + (d ? d + "S" : "") : "P0D"
                }

                var vo, yo;
                yo = Array.prototype.some ? Array.prototype.some : function (e) {
                    for (var t = Object(this), n = t.length >>> 0, o = 0; o < n; o++) if (o in t && e.call(this, t[o], o, t)) return !0;
                    return !1
                };
                var bo = yo, Co = e.momentProperties = [], _o = !1, Ro = {};
                e.suppressDeprecationWarnings = !1, e.deprecationHandler = null;
                var Mo;
                Mo = Object.keys ? Object.keys : function (e) {
                    var t, n = [];
                    for (t in e) c(e, t) && n.push(t);
                    return n
                };
                var So, Eo = Mo, Oo = {
                        sameDay: "[Today at] LT",
                        nextDay: "[Tomorrow at] LT",
                        nextWeek: "dddd [at] LT",
                        lastDay: "[Yesterday at] LT",
                        lastWeek: "[Last] dddd [at] LT",
                        sameElse: "L"
                    }, To = {
                        LTS: "h:mm:ss A",
                        LT: "h:mm A",
                        L: "MM/DD/YYYY",
                        LL: "MMMM D, YYYY",
                        LLL: "MMMM D, YYYY h:mm A",
                        LLLL: "dddd, MMMM D, YYYY h:mm A"
                    }, ko = "Invalid date", xo = "%d", Do = /\d{1,2}/, Ho = {
                        future: "in %s",
                        past: "%s ago",
                        s: "a few seconds",
                        m: "a minute",
                        mm: "%d minutes",
                        h: "an hour",
                        hh: "%d hours",
                        d: "a day",
                        dd: "%d days",
                        M: "a month",
                        MM: "%d months",
                        y: "a year",
                        yy: "%d years"
                    }, Ao = {}, Po = {},
                    No = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                    Lo = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Io = {}, Wo = {}, jo = /\d/, Vo = /\d\d/,
                    Bo = /\d{3}/, Fo = /\d{4}/, zo = /[+-]?\d{6}/, Yo = /\d\d?/, Uo = /\d\d\d\d?/, Go = /\d\d\d\d\d\d?/,
                    $o = /\d{1,3}/, Ko = /\d{1,4}/, Xo = /[+-]?\d{1,6}/, qo = /\d+/, Zo = /[+-]?\d+/,
                    Jo = /Z|[+-]\d\d:?\d\d/gi, Qo = /Z|[+-]\d\d(?::?\d\d)?/gi, er = /[+-]?\d+(\.\d{1,3})?/,
                    tr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                    nr = {}, or = {}, rr = 0, ir = 1, sr = 2, ar = 3, lr = 4, ur = 5, cr = 6, dr = 7, hr = 8;
                So = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) {
                    var t;
                    for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
                    return -1
                };
                var fr = So;
                K("M", ["MM", 2], "Mo", function () {
                    return this.month() + 1
                }), K("MMM", 0, 0, function (e) {
                    return this.localeData().monthsShort(this, e)
                }), K("MMMM", 0, 0, function (e) {
                    return this.localeData().months(this, e)
                }), I("month", "M"), V("month", 8), Q("M", Yo), Q("MM", Yo, Vo), Q("MMM", function (e, t) {
                    return t.monthsShortRegex(e)
                }), Q("MMMM", function (e, t) {
                    return t.monthsRegex(e)
                }), oe(["M", "MM"], function (e, t) {
                    t[ir] = _(e) - 1
                }), oe(["MMM", "MMMM"], function (e, t, n, o) {
                    var r = n._locale.monthsParse(e, o, n._strict);
                    null != r ? t[ir] = r : p(n).invalidMonth = e
                });
                var pr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
                    mr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                    gr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), wr = tr, vr = tr;
                K("Y", 0, 0, function () {
                    var e = this.year();
                    return e <= 9999 ? "" + e : "+" + e
                }), K(0, ["YY", 2], 0, function () {
                    return this.year() % 100
                }), K(0, ["YYYY", 4], 0, "year"), K(0, ["YYYYY", 5], 0, "year"), K(0, ["YYYYYY", 6, !0], 0, "year"), I("year", "y"), V("year", 1), Q("Y", Zo), Q("YY", Yo, Vo), Q("YYYY", Ko, Fo), Q("YYYYY", Xo, zo), Q("YYYYYY", Xo, zo), oe(["YYYYY", "YYYYYY"], rr), oe("YYYY", function (t, n) {
                    n[rr] = 2 === t.length ? e.parseTwoDigitYear(t) : _(t)
                }), oe("YY", function (t, n) {
                    n[rr] = e.parseTwoDigitYear(t)
                }), oe("Y", function (e, t) {
                    t[rr] = parseInt(e, 10)
                }), e.parseTwoDigitYear = function (e) {
                    return _(e) + (_(e) > 68 ? 1900 : 2e3)
                };
                var yr = F("FullYear", !0);
                K("w", ["ww", 2], "wo", "week"), K("W", ["WW", 2], "Wo", "isoWeek"), I("week", "w"), I("isoWeek", "W"), V("week", 5), V("isoWeek", 5), Q("w", Yo), Q("ww", Yo, Vo), Q("W", Yo), Q("WW", Yo, Vo), re(["w", "ww", "W", "WW"], function (e, t, n, o) {
                    t[o.substr(0, 1)] = _(e)
                });
                var br = {dow: 0, doy: 6};
                K("d", 0, "do", "day"), K("dd", 0, 0, function (e) {
                    return this.localeData().weekdaysMin(this, e)
                }), K("ddd", 0, 0, function (e) {
                    return this.localeData().weekdaysShort(this, e)
                }), K("dddd", 0, 0, function (e) {
                    return this.localeData().weekdays(this, e)
                }), K("e", 0, 0, "weekday"), K("E", 0, 0, "isoWeekday"), I("day", "d"), I("weekday", "e"), I("isoWeekday", "E"), V("day", 11), V("weekday", 11), V("isoWeekday", 11), Q("d", Yo), Q("e", Yo), Q("E", Yo), Q("dd", function (e, t) {
                    return t.weekdaysMinRegex(e)
                }), Q("ddd", function (e, t) {
                    return t.weekdaysShortRegex(e)
                }), Q("dddd", function (e, t) {
                    return t.weekdaysRegex(e)
                }), re(["dd", "ddd", "dddd"], function (e, t, n, o) {
                    var r = n._locale.weekdaysParse(e, o, n._strict);
                    null != r ? t.d = r : p(n).invalidWeekday = e
                }), re(["d", "e", "E"], function (e, t, n, o) {
                    t[o] = _(e)
                });
                var Cr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    _r = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Rr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Mr = tr,
                    Sr = tr, Er = tr;
                K("H", ["HH", 2], 0, "hour"), K("h", ["hh", 2], 0, Ue), K("k", ["kk", 2], 0, Ge), K("hmm", 0, 0, function () {
                    return "" + Ue.apply(this) + $(this.minutes(), 2)
                }), K("hmmss", 0, 0, function () {
                    return "" + Ue.apply(this) + $(this.minutes(), 2) + $(this.seconds(), 2)
                }), K("Hmm", 0, 0, function () {
                    return "" + this.hours() + $(this.minutes(), 2)
                }), K("Hmmss", 0, 0, function () {
                    return "" + this.hours() + $(this.minutes(), 2) + $(this.seconds(), 2)
                }), $e("a", !0), $e("A", !1), I("hour", "h"), V("hour", 13), Q("a", Ke), Q("A", Ke), Q("H", Yo), Q("h", Yo), Q("HH", Yo, Vo), Q("hh", Yo, Vo), Q("hmm", Uo), Q("hmmss", Go), Q("Hmm", Uo), Q("Hmmss", Go), oe(["H", "HH"], ar), oe(["a", "A"], function (e, t, n) {
                    n._isPm = n._locale.isPM(e), n._meridiem = e
                }), oe(["h", "hh"], function (e, t, n) {
                    t[ar] = _(e), p(n).bigHour = !0
                }), oe("hmm", function (e, t, n) {
                    var o = e.length - 2;
                    t[ar] = _(e.substr(0, o)), t[lr] = _(e.substr(o)), p(n).bigHour = !0
                }), oe("hmmss", function (e, t, n) {
                    var o = e.length - 4, r = e.length - 2;
                    t[ar] = _(e.substr(0, o)), t[lr] = _(e.substr(o, 2)), t[ur] = _(e.substr(r)), p(n).bigHour = !0
                }), oe("Hmm", function (e, t, n) {
                    var o = e.length - 2;
                    t[ar] = _(e.substr(0, o)), t[lr] = _(e.substr(o))
                }), oe("Hmmss", function (e, t, n) {
                    var o = e.length - 4, r = e.length - 2;
                    t[ar] = _(e.substr(0, o)), t[lr] = _(e.substr(o, 2)), t[ur] = _(e.substr(r))
                });
                var Or, Tr = /[ap]\.?m?\.?/i, kr = F("Hours", !0), xr = {
                        calendar: Oo,
                        longDateFormat: To,
                        invalidDate: ko,
                        ordinal: xo,
                        ordinalParse: Do,
                        relativeTime: Ho,
                        months: mr,
                        monthsShort: gr,
                        week: br,
                        weekdays: Cr,
                        weekdaysMin: Rr,
                        weekdaysShort: _r,
                        meridiemParse: Tr
                    }, Dr = {}, Hr = {},
                    Ar = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    Pr = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    Nr = /Z|[+-]\d\d(?::?\d\d)?/,
                    Lr = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
                    Ir = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
                    Wr = /^\/?Date\((\-?\d+)/i;
                e.createFromInputFallback = S("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) {
                    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
                }), e.ISO_8601 = function () {
                };
                var jr = S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var e = bt.apply(null, arguments);
                        return this.isValid() && e.isValid() ? e < this ? this : e : g()
                    }),
                    Vr = S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                        var e = bt.apply(null, arguments);
                        return this.isValid() && e.isValid() ? e > this ? this : e : g()
                    }), Br = function () {
                        return Date.now ? Date.now() : +new Date
                    };
                Ot("Z", ":"), Ot("ZZ", ""), Q("Z", Qo), Q("ZZ", Qo), oe(["Z", "ZZ"], function (e, t, n) {
                    n._useUTC = !0, n._tzm = Tt(Qo, e)
                });
                var Fr = /([\+\-]|\d\d)/gi;
                e.updateOffset = function () {
                };
                var zr = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
                    Yr = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
                Ft.fn = Mt.prototype;
                var Ur = Gt(1, "add"), Gr = Gt(-1, "subtract");
                e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
                var $r = S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
                    return void 0 === e ? this.localeData() : this.locale(e)
                });
                K(0, ["gg", 2], 0, function () {
                    return this.weekYear() % 100
                }), K(0, ["GG", 2], 0, function () {
                    return this.isoWeekYear() % 100
                }), Tn("gggg", "weekYear"), Tn("ggggg", "weekYear"), Tn("GGGG", "isoWeekYear"), Tn("GGGGG", "isoWeekYear"), I("weekYear", "gg"), I("isoWeekYear", "GG"), V("weekYear", 1), V("isoWeekYear", 1), Q("G", Zo), Q("g", Zo), Q("GG", Yo, Vo), Q("gg", Yo, Vo), Q("GGGG", Ko, Fo), Q("gggg", Ko, Fo), Q("GGGGG", Xo, zo), Q("ggggg", Xo, zo), re(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, o) {
                    t[o.substr(0, 2)] = _(e)
                }), re(["gg", "GG"], function (t, n, o, r) {
                    n[r] = e.parseTwoDigitYear(t)
                }), K("Q", 0, "Qo", "quarter"), I("quarter", "Q"), V("quarter", 7), Q("Q", jo), oe("Q", function (e, t) {
                    t[ir] = 3 * (_(e) - 1)
                }), K("D", ["DD", 2], "Do", "date"), I("date", "D"), V("date", 9), Q("D", Yo), Q("DD", Yo, Vo), Q("Do", function (e, t) {
                    return e ? t._ordinalParse : t._ordinalParseLenient
                }), oe(["D", "DD"], sr), oe("Do", function (e, t) {
                    t[sr] = _(e.match(Yo)[0], 10)
                });
                var Kr = F("Date", !0);
                K("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), I("dayOfYear", "DDD"), V("dayOfYear", 4), Q("DDD", $o), Q("DDDD", Bo), oe(["DDD", "DDDD"], function (e, t, n) {
                    n._dayOfYear = _(e)
                }), K("m", ["mm", 2], 0, "minute"), I("minute", "m"), V("minute", 14), Q("m", Yo), Q("mm", Yo, Vo), oe(["m", "mm"], lr);
                var Xr = F("Minutes", !1);
                K("s", ["ss", 2], 0, "second"), I("second", "s"), V("second", 15), Q("s", Yo), Q("ss", Yo, Vo), oe(["s", "ss"], ur);
                var qr = F("Seconds", !1);
                K("S", 0, 0, function () {
                    return ~~(this.millisecond() / 100)
                }), K(0, ["SS", 2], 0, function () {
                    return ~~(this.millisecond() / 10)
                }), K(0, ["SSS", 3], 0, "millisecond"), K(0, ["SSSS", 4], 0, function () {
                    return 10 * this.millisecond()
                }), K(0, ["SSSSS", 5], 0, function () {
                    return 100 * this.millisecond()
                }), K(0, ["SSSSSS", 6], 0, function () {
                    return 1e3 * this.millisecond()
                }), K(0, ["SSSSSSS", 7], 0, function () {
                    return 1e4 * this.millisecond()
                }), K(0, ["SSSSSSSS", 8], 0, function () {
                    return 1e5 * this.millisecond()
                }), K(0, ["SSSSSSSSS", 9], 0, function () {
                    return 1e6 * this.millisecond()
                }), I("millisecond", "ms"), V("millisecond", 16), Q("S", $o, jo), Q("SS", $o, Vo), Q("SSS", $o, Bo);
                var Zr;
                for (Zr = "SSSS"; Zr.length <= 9; Zr += "S") Q(Zr, qo);
                for (Zr = "S"; Zr.length <= 9; Zr += "S") oe(Zr, In);
                var Jr = F("Milliseconds", !1);
                K("z", 0, 0, "zoneAbbr"), K("zz", 0, 0, "zoneName");
                var Qr = y.prototype;
                Qr.add = Ur, Qr.calendar = Xt, Qr.clone = qt, Qr.diff = on, Qr.endOf = wn, Qr.format = un, Qr.from = cn, Qr.fromNow = dn, Qr.to = hn, Qr.toNow = fn, Qr.get = U, Qr.invalidAt = En, Qr.isAfter = Zt, Qr.isBefore = Jt, Qr.isBetween = Qt, Qr.isSame = en, Qr.isSameOrAfter = tn, Qr.isSameOrBefore = nn, Qr.isValid = Mn, Qr.lang = $r, Qr.locale = pn, Qr.localeData = mn, Qr.max = Vr, Qr.min = jr, Qr.parsingFlags = Sn, Qr.set = G, Qr.startOf = gn, Qr.subtract = Gr, Qr.toArray = Cn, Qr.toObject = _n, Qr.toDate = bn, Qr.toISOString = an, Qr.inspect = ln, Qr.toJSON = Rn, Qr.toString = sn, Qr.unix = yn, Qr.valueOf = vn, Qr.creationData = On, Qr.year = yr, Qr.isLeapYear = ye, Qr.weekYear = kn, Qr.isoWeekYear = xn, Qr.quarter = Qr.quarters = Nn, Qr.month = he, Qr.daysInMonth = fe, Qr.week = Qr.weeks = ke, Qr.isoWeek = Qr.isoWeeks = xe, Qr.weeksInYear = Hn, Qr.isoWeeksInYear = Dn, Qr.date = Kr, Qr.day = Qr.days = We, Qr.weekday = je, Qr.isoWeekday = Ve, Qr.dayOfYear = Ln, Qr.hour = Qr.hours = kr, Qr.minute = Qr.minutes = Xr, Qr.second = Qr.seconds = qr, Qr.millisecond = Qr.milliseconds = Jr, Qr.utcOffset = Dt, Qr.utc = At, Qr.local = Pt, Qr.parseZone = Nt, Qr.hasAlignedHourOffset = Lt, Qr.isDST = It, Qr.isLocal = jt, Qr.isUtcOffset = Vt, Qr.isUtc = Bt, Qr.isUTC = Bt, Qr.zoneAbbr = Wn, Qr.zoneName = jn, Qr.dates = S("dates accessor is deprecated. Use date instead.", Kr), Qr.months = S("months accessor is deprecated. Use month instead", he), Qr.years = S("years accessor is deprecated. Use year instead", yr), Qr.zone = S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ht), Qr.isDSTShifted = S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Wt);
                var ei = x.prototype;
                ei.calendar = D, ei.longDateFormat = H, ei.invalidDate = A, ei.ordinal = P, ei.preparse = Fn, ei.postformat = Fn, ei.relativeTime = N, ei.pastFuture = L, ei.set = T, ei.months = ae, ei.monthsShort = le, ei.monthsParse = ce, ei.monthsRegex = me, ei.monthsShortRegex = pe, ei.week = Ee, ei.firstDayOfYear = Te, ei.firstDayOfWeek = Oe, ei.weekdays = Ae, ei.weekdaysMin = Ne, ei.weekdaysShort = Pe, ei.weekdaysParse = Ie, ei.weekdaysRegex = Be, ei.weekdaysShortRegex = Fe, ei.weekdaysMinRegex = ze, ei.isPM = Xe, ei.meridiem = qe, et("en", {
                    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function (e) {
                        var t = e % 10,
                            n = 1 === _(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                        return e + n
                    }
                }), e.lang = S("moment.lang is deprecated. Use moment.locale instead.", et), e.langData = S("moment.langData is deprecated. Use moment.localeData instead.", ot);
                var ti = Math.abs, ni = ao("ms"), oi = ao("s"), ri = ao("m"), ii = ao("h"), si = ao("d"), ai = ao("w"),
                    li = ao("M"), ui = ao("y"), ci = uo("milliseconds"), di = uo("seconds"), hi = uo("minutes"),
                    fi = uo("hours"), pi = uo("days"), mi = uo("months"), gi = uo("years"), wi = Math.round,
                    vi = {s: 45, m: 45, h: 22, d: 26, M: 11}, yi = Math.abs, bi = Mt.prototype;
                return bi.abs = Zn, bi.add = Qn, bi.subtract = eo, bi.as = io, bi.asMilliseconds = ni, bi.asSeconds = oi, bi.asMinutes = ri, bi.asHours = ii, bi.asDays = si, bi.asWeeks = ai, bi.asMonths = li, bi.asYears = ui, bi.valueOf = so, bi._bubble = no, bi.get = lo, bi.milliseconds = ci, bi.seconds = di, bi.minutes = hi, bi.hours = fi, bi.days = pi, bi.weeks = co, bi.months = mi, bi.years = gi, bi.humanize = go, bi.toISOString = wo, bi.toString = wo, bi.toJSON = wo, bi.locale = pn, bi.localeData = mn, bi.toIsoString = S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", wo), bi.lang = $r, K("X", 0, 0, "unix"), K("x", 0, 0, "valueOf"), Q("x", Zo), Q("X", er), oe("X", function (e, t, n) {
                    n._d = new Date(1e3 * parseFloat(e, 10))
                }), oe("x", function (e, t, n) {
                    n._d = new Date(_(e))
                }), e.version = "2.17.1", o(bt), e.fn = Qr, e.min = _t, e.max = Rt, e.now = Br, e.utc = h, e.unix = Vn, e.months = Gn, e.isDate = l, e.locale = et, e.invalid = g, e.duration = Ft, e.isMoment = b, e.weekdays = Kn, e.parseZone = Bn, e.localeData = ot, e.isDuration = St, e.monthsShort = $n, e.weekdaysMin = qn, e.defineLocale = tt, e.updateLocale = nt, e.locales = rt, e.weekdaysShort = Xn, e.normalizeUnits = W, e.relativeTimeRounding = po, e.relativeTimeThreshold = mo, e.calendarFormat = Kt, e.prototype = Qr, e
            })
        }, {}],
        numbro: [function (t, n, o) {/*!
 * numbro.js
 * version : 1.9.3
 * author : Företagsplatsen AB
 * license : MIT
 * http://www.foretagsplatsen.se
 */
            (function () {
                "use strict";

                function o(e) {
                    this._value = e
                }

                function r(e) {
                    var t, n = "";
                    for (t = 0; t < e; t++) n += "0";
                    return n
                }

                function i(e, t) {
                    var n, o, i, s, a, l, u, c;
                    return c = e.toString(), n = c.split("e")[0], s = c.split("e")[1], o = n.split(".")[0], i = n.split(".")[1] || "", +s > 0 ? c = o + i + r(s - i.length) : (a = +o < 0 ? "-0" : "0", t > 0 && (a += "."), u = r(-1 * s - 1), l = (u + Math.abs(o) + i).substr(0, t), c = a + l), +s > 0 && t > 0 && (c += "." + r(t)), c
                }

                function s(e, t, n, o) {
                    var r, s, a = Math.pow(10, t);
                    return e.toString().indexOf("e") > -1 ? (s = i(e, t), "-" === s.charAt(0) && +s >= 0 && (s = s.substr(1))) : s = (n(e + "e+" + t) / a).toFixed(t), o && (r = new RegExp("0{1," + o + "}$"), s = s.replace(r, "")), s
                }

                function a(e, t, n) {
                    var o, r = t.replace(/\{[^\{\}]*\}/g, "");
                    return o = r.indexOf("$") > -1 ? u(e, O[k].currency.symbol, t, n) : r.indexOf("%") > -1 ? d(e, t, n) : r.indexOf(":") > -1 ? h(e, t) : m(e._value, t, n)
                }

                function l(e, t) {
                    var n, o, r, i, s, a = t, l = !1;
                    if (t.indexOf(":") > -1) e._value = f(t); else if (t === x) e._value = 0; else {
                        for ("." !== O[k].delimiters.decimal && (t = t.replace(/\./g, "").replace(O[k].delimiters.decimal, ".")), n = new RegExp("[^a-zA-Z]" + O[k].abbreviations.thousand + "(?:\\)|(\\" + O[k].currency.symbol + ")?(?:\\))?)?$"), o = new RegExp("[^a-zA-Z]" + O[k].abbreviations.million + "(?:\\)|(\\" + O[k].currency.symbol + ")?(?:\\))?)?$"), r = new RegExp("[^a-zA-Z]" + O[k].abbreviations.billion + "(?:\\)|(\\" + O[k].currency.symbol + ")?(?:\\))?)?$"), i = new RegExp("[^a-zA-Z]" + O[k].abbreviations.trillion + "(?:\\)|(\\" + O[k].currency.symbol + ")?(?:\\))?)?$"), s = 1; s < R.length && !l; ++s) t.indexOf(R[s]) > -1 ? l = Math.pow(1024, s) : t.indexOf(M[s]) > -1 && (l = Math.pow(1e3, s));
                        var u = t.replace(/[^0-9\.]+/g, "");
                        "" === u ? e._value = NaN : (e._value = (l ? l : 1) * (a.match(n) ? Math.pow(10, 3) : 1) * (a.match(o) ? Math.pow(10, 6) : 1) * (a.match(r) ? Math.pow(10, 9) : 1) * (a.match(i) ? Math.pow(10, 12) : 1) * (t.indexOf("%") > -1 ? .01 : 1) * ((t.split("-").length + Math.min(t.split("(").length - 1, t.split(")").length - 1)) % 2 ? 1 : -1) * Number(u), e._value = l ? Math.ceil(e._value) : e._value)
                    }
                    return e._value
                }

                function u(e, t, n, o) {
                    var r, i, s = n, a = s.indexOf("$"), l = s.indexOf("("), u = s.indexOf("+"), c = s.indexOf("-"),
                        d = "", h = "";
                    if (s.indexOf("$") === -1 ? "infix" === O[k].currency.position ? (h = t, O[k].currency.spaceSeparated && (h = " " + h + " ")) : O[k].currency.spaceSeparated && (d = " ") : s.indexOf(" $") > -1 ? (d = " ", s = s.replace(" $", "")) : s.indexOf("$ ") > -1 ? (d = " ", s = s.replace("$ ", "")) : s = s.replace("$", ""), i = m(e._value, s, o, h), n.indexOf("$") === -1) switch (O[k].currency.position) {
                        case"postfix":
                            i.indexOf(")") > -1 ? (i = i.split(""), i.splice(-1, 0, d + t), i = i.join("")) : i = i + d + t;
                            break;
                        case"infix":
                            break;
                        case"prefix":
                            i.indexOf("(") > -1 || i.indexOf("-") > -1 ? (i = i.split(""), r = Math.max(l, c) + 1, i.splice(r, 0, t + d), i = i.join("")) : i = t + d + i;
                            break;
                        default:
                            throw Error('Currency position should be among ["prefix", "infix", "postfix"]')
                    } else a <= 1 ? i.indexOf("(") > -1 || i.indexOf("+") > -1 || i.indexOf("-") > -1 ? (i = i.split(""), r = 1, (a < l || a < u || a < c) && (r = 0), i.splice(r, 0, t + d), i = i.join("")) : i = t + d + i : i.indexOf(")") > -1 ? (i = i.split(""), i.splice(-1, 0, d + t), i = i.join("")) : i = i + d + t;
                    return i
                }

                function c(e, t, n, o) {
                    return u(e, t, n, o)
                }

                function d(e, t, n) {
                    var o, r = "", i = 100 * e._value;
                    return t.indexOf(" %") > -1 ? (r = " ", t = t.replace(" %", "")) : t = t.replace("%", ""), o = m(i, t, n), o.indexOf(")") > -1 ? (o = o.split(""), o.splice(-1, 0, r + "%"), o = o.join("")) : o = o + r + "%", o
                }

                function h(e) {
                    var t = Math.floor(e._value / 60 / 60), n = Math.floor((e._value - 60 * t * 60) / 60),
                        o = Math.round(e._value - 60 * t * 60 - 60 * n);
                    return t + ":" + (n < 10 ? "0" + n : n) + ":" + (o < 10 ? "0" + o : o)
                }

                function f(e) {
                    var t = e.split(":"), n = 0;
                    return 3 === t.length ? (n += 60 * Number(t[0]) * 60, n += 60 * Number(t[1]), n += Number(t[2])) : 2 === t.length && (n += 60 * Number(t[0]), n += Number(t[1])), Number(n)
                }

                function p(e, t, n) {
                    var o, r, i, s = t[0], a = Math.abs(e);
                    if (a >= n) {
                        for (o = 1; o < t.length; ++o) if (r = Math.pow(n, o), i = Math.pow(n, o + 1), a >= r && a < i) {
                            s = t[o], e /= r;
                            break
                        }
                        s === t[0] && (e /= Math.pow(n, t.length - 1), s = t[t.length - 1])
                    }
                    return {value: e, suffix: s}
                }

                function m(e, t, n, o) {
                    var i, a, l, u, c, d, h, f, m, g, w, v, y, b, C, _, R, M = !1, S = !1, T = !1, D = "", H = !1,
                        A = !1, P = !1, N = !1, L = !1, I = "", W = "", j = Math.abs(e), V = "", B = !1, F = !1, z = "";
                    if (0 === e && null !== x) return x;
                    if (!isFinite(e)) return "" + e;
                    if (0 === t.indexOf("{")) {
                        var Y = t.indexOf("}");
                        if (Y === -1) throw Error('Format should also contain a "}"');
                        g = t.slice(1, Y), t = t.slice(Y + 1)
                    } else g = "";
                    if (t.indexOf("}") === t.length - 1) {
                        var U = t.indexOf("{");
                        if (U === -1) throw Error('Format should also contain a "{"');
                        w = t.slice(U + 1, -1), t = t.slice(0, U + 1)
                    } else w = "";
                    var G;
                    for (G = t.indexOf(".") === -1 ? t.match(/([0-9]+).*/) : t.match(/([0-9]+)\..*/), _ = null === G ? -1 : G[1].length, t.indexOf("-") !== -1 && (B = !0), t.indexOf("(") > -1 ? (M = !0, t = t.slice(1, -1)) : t.indexOf("+") > -1 && (S = !0, t = t.replace(/\+/g, "")), t.indexOf("a") > -1 && (f = t.split(".")[0].match(/[0-9]+/g) || ["0"], f = parseInt(f[0], 10), H = t.indexOf("aK") >= 0, A = t.indexOf("aM") >= 0, P = t.indexOf("aB") >= 0, N = t.indexOf("aT") >= 0, L = H || A || P || N, t.indexOf(" a") > -1 ? (D = " ", t = t.replace(" a", "")) : t = t.replace("a", ""), l = Math.floor(Math.log(j) / Math.LN10) + 1, c = l % 3, c = 0 === c ? 3 : c, f && 0 !== j && (u = Math.floor(Math.log(j) / Math.LN10) + 1 - f, d = 3 * ~~((Math.min(f, l) - c) / 3), j /= Math.pow(10, d), t.indexOf(".") === -1 && f > 3 && (t += "[.]", b = 0 === u ? 0 : 3 * ~~(u / 3) - u, b = b < 0 ? b + 3 : b, t += r(b))), Math.floor(Math.log(Math.abs(e)) / Math.LN10) + 1 !== f && (j >= Math.pow(10, 12) && !L || N ? (D += O[k].abbreviations.trillion, e /= Math.pow(10, 12)) : j < Math.pow(10, 12) && j >= Math.pow(10, 9) && !L || P ? (D += O[k].abbreviations.billion, e /= Math.pow(10, 9)) : j < Math.pow(10, 9) && j >= Math.pow(10, 6) && !L || A ? (D += O[k].abbreviations.million, e /= Math.pow(10, 6)) : (j < Math.pow(10, 6) && j >= Math.pow(10, 3) && !L || H) && (D += O[k].abbreviations.thousand, e /= Math.pow(10, 3)))), R = 0; R < E.length; ++R) if (i = E[R], t.indexOf(i.marker) > -1) {
                        t.indexOf(" " + i.marker) > -1 && (I = " "), t = t.replace(I + i.marker, ""), a = p(e, i.suffixes, i.scale), e = a.value, I += a.suffix;
                        break
                    }
                    if (t.indexOf("o") > -1 && (t.indexOf(" o") > -1 ? (W = " ", t = t.replace(" o", "")) : t = t.replace("o", ""), O[k].ordinal && (W += O[k].ordinal(e))), t.indexOf("[.]") > -1 && (T = !0, t = t.replace("[.]", ".")), h = e.toString().split(".")[0], m = t.split(".")[1], v = t.indexOf(","), m) {
                        if (m.indexOf("*") !== -1 ? V = s(e, e.toString().split(".")[1].length, n) : m.indexOf("[") > -1 ? (m = m.replace("]", ""), m = m.split("["), V = s(e, m[0].length + m[1].length, n, m[1].length)) : V = s(e, m.length, n), h = V.split(".")[0], V.split(".")[1].length) {
                            var $ = o ? D + o : O[k].delimiters.decimal;
                            V = $ + V.split(".")[1]
                        } else V = "";
                        T && 0 === Number(V.slice(1)) && (V = "")
                    } else h = s(e, 0, n);
                    return h.indexOf("-") > -1 && (h = h.slice(1), F = !0), h.length < _ && (h = r(_ - h.length) + h), v > -1 && (h = h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + O[k].delimiters.thousands)), 0 === t.indexOf(".") && (h = ""), y = t.indexOf("("), C = t.indexOf("-"), z = y < C ? (M && F ? "(" : "") + (B && F || !M && F ? "-" : "") : (B && F || !M && F ? "-" : "") + (M && F ? "(" : ""), g + z + (!F && S && 0 !== e ? "+" : "") + h + V + (W ? W : "") + (D && !o ? D : "") + (I ? I : "") + (M && F ? ")" : "") + w
                }

                function g(e, t) {
                    O[e] = t
                }

                function w(e) {
                    k = e;
                    var t = O[e].defaults;
                    t && t.format && C.defaultFormat(t.format), t && t.currencyFormat && C.defaultCurrencyFormat(t.currencyFormat)
                }

                function v() {
                    return "undefined" != typeof process && void 0 === process.browser && process.title && (0 === process.title.indexOf("node") || process.title.indexOf("meteor-tool") > 0 || "grunt" === process.title || "gulp" === process.title) && "undefined" != typeof t
                }

                function y(e) {
                    var t = e.toString().split(".");
                    return t.length < 2 ? 1 : Math.pow(10, t[1].length)
                }

                function b() {
                    var e = Array.prototype.slice.call(arguments);
                    return e.reduce(function (e, t) {
                        var n = y(e), o = y(t);
                        return n > o ? n : o
                    }, -(1 / 0))
                }

                var C, _ = "1.9.3", R = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
                    M = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], S = {
                        general: {scale: 1024, suffixes: M, marker: "bd"},
                        binary: {scale: 1024, suffixes: R, marker: "b"},
                        decimal: {scale: 1e3, suffixes: M, marker: "d"}
                    }, E = [S.general, S.binary, S.decimal], O = {}, T = O, k = "en-US", x = null, D = "0,0", H = "0$",
                    A = "undefined" != typeof n && n.exports, P = {
                        delimiters: {thousands: ",", decimal: "."},
                        abbreviations: {thousand: "k", million: "m", billion: "b", trillion: "t"},
                        ordinal: function (e) {
                            var t = e % 10;
                            return 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"
                        },
                        currency: {symbol: "$", position: "prefix"},
                        defaults: {currencyFormat: ",0000 a"},
                        formats: {
                            fourDigits: "0000 a",
                            fullWithTwoDecimals: "$ ,0.00",
                            fullWithTwoDecimalsNoCurrency: ",0.00"
                        }
                    };
                C = function (e) {
                    return C.isNumbro(e) ? e = e.value() : 0 === e || "undefined" == typeof e ? e = 0 : Number(e) || (e = C.fn.unformat(e)), new o(Number(e))
                }, C.version = _, C.isNumbro = function (e) {
                    return e instanceof o
                }, C.setLanguage = function (e, t) {
                    console.warn("`setLanguage` is deprecated since version 1.6.0. Use `setCulture` instead");
                    var n = e, o = e.split("-")[0], r = null;
                    T[n] || (Object.keys(T).forEach(function (e) {
                        r || e.split("-")[0] !== o || (r = e)
                    }), n = r || t || "en-US"), w(n)
                }, C.setCulture = function (e, t) {
                    var n = e, o = e.split("-")[1], r = null;
                    O[n] || (o && Object.keys(O).forEach(function (e) {
                        r || e.split("-")[1] !== o || (r = e)
                    }), n = r || t || "en-US"), w(n)
                }, C.language = function (e, t) {
                    if (console.warn("`language` is deprecated since version 1.6.0. Use `culture` instead"), !e) return k;
                    if (e && !t) {
                        if (!T[e]) throw new Error("Unknown language : " + e);
                        w(e)
                    }
                    return !t && T[e] || g(e, t), C
                }, C.culture = function (e, t) {
                    if (!e) return k;
                    if (e && !t) {
                        if (!O[e]) throw new Error("Unknown culture : " + e);
                        w(e)
                    }
                    return !t && O[e] || g(e, t), C
                }, C.languageData = function (e) {
                    if (console.warn("`languageData` is deprecated since version 1.6.0. Use `cultureData` instead"), !e) return T[k];
                    if (!T[e]) throw new Error("Unknown language : " + e);
                    return T[e]
                }, C.cultureData = function (e) {
                    if (!e) return O[k];
                    if (!O[e]) throw new Error("Unknown culture : " + e);
                    return O[e]
                }, C.culture("en-US", P), C.languages = function () {
                    return console.warn("`languages` is deprecated since version 1.6.0. Use `cultures` instead"), T
                }, C.cultures = function () {
                    return O
                }, C.zeroFormat = function (e) {
                    x = "string" == typeof e ? e : null
                }, C.defaultFormat = function (e) {
                    D = "string" == typeof e ? e : "0.0"
                }, C.defaultCurrencyFormat = function (e) {
                    H = "string" == typeof e ? e : "0$"
                }, C.validate = function (e, t) {
                    var n, o, r, i, s, a, l, u;
                    if ("string" != typeof e && (e += "", console.warn && console.warn("Numbro.js: Value is not string. It has been co-erced to: ", e)), e = e.trim(), e = e.replace(/^[+-]?/, ""), e.match(/^\d+$/)) return !0;
                    if ("" === e) return !1;
                    try {
                        l = C.cultureData(t)
                    } catch (e) {
                        l = C.cultureData(C.culture())
                    }
                    return r = l.currency.symbol, s = l.abbreviations, n = l.delimiters.decimal, o = "." === l.delimiters.thousands ? "\\." : l.delimiters.thousands, u = e.match(/^[^\d\.\,]+/), (null === u || (e = e.substr(1), u[0] === r)) && (u = e.match(/[^\d]+$/), (null === u || (e = e.slice(0, -1), u[0] === s.thousand || u[0] === s.million || u[0] === s.billion || u[0] === s.trillion)) && (a = new RegExp(o + "{2}"), !e.match(/[^\d.,]/g) && (i = e.split(n), !(i.length > 2) && (i.length < 2 ? !!i[0].match(/^\d+.*\d$/) && !i[0].match(a) : "" === i[0] ? !i[0].match(a) && !!i[1].match(/^\d+$/) : 1 === i[0].length ? !!i[0].match(/^\d+$/) && !i[0].match(a) && !!i[1].match(/^\d+$/) : !!i[0].match(/^\d+.*\d$/) && !i[0].match(a) && !!i[1].match(/^\d+$/)))))
                }, C.loadLanguagesInNode = function () {
                    console.warn("`loadLanguagesInNode` is deprecated since version 1.6.0. Use `loadCulturesInNode` instead"), C.loadCulturesInNode()
                }, C.loadCulturesInNode = function () {
                    var e = t("./languages");
                    for (var n in e) n && C.culture(n, e[n])
                }, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (e, t) {
                    if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
                    if ("function" != typeof e) throw new TypeError(e + " is not a function");
                    var n, o, r = this.length >>> 0, i = !1;
                    for (1 < arguments.length && (o = t, i = !0), n = 0; r > n; ++n) this.hasOwnProperty(n) && (i ? o = e(o, this[n], n, this) : (o = this[n], i = !0));
                    if (!i) throw new TypeError("Reduce of empty array with no initial value");
                    return o
                }), C.fn = o.prototype = {
                    clone: function () {
                        return C(this)
                    }, format: function (e, t) {
                        return a(this, e ? e : D, void 0 !== t ? t : Math.round)
                    }, formatCurrency: function (e, t) {
                        return u(this, O[k].currency.symbol, e ? e : H, void 0 !== t ? t : Math.round)
                    }, formatForeignCurrency: function (e, t, n) {
                        return c(this, e, t ? t : H, void 0 !== n ? n : Math.round)
                    }, unformat: function (e) {
                        if ("number" == typeof e) return e;
                        if ("string" == typeof e) {
                            var t = l(this, e);
                            return isNaN(t) ? void 0 : t
                        }
                    }, binaryByteUnits: function () {
                        return p(this._value, S.binary.suffixes, S.binary.scale).suffix
                    }, byteUnits: function () {
                        return p(this._value, S.general.suffixes, S.general.scale).suffix
                    }, decimalByteUnits: function () {
                        return p(this._value, S.decimal.suffixes, S.decimal.scale).suffix
                    }, value: function () {
                        return this._value
                    }, valueOf: function () {
                        return this._value
                    }, set: function (e) {
                        return this._value = Number(e), this
                    }, add: function (e) {
                        function t(e, t) {
                            return e + n * t
                        }

                        var n = b.call(null, this._value, e);
                        return this._value = [this._value, e].reduce(t, 0) / n, this
                    }, subtract: function (e) {
                        function t(e, t) {
                            return e - n * t
                        }

                        var n = b.call(null, this._value, e);
                        return this._value = [e].reduce(t, this._value * n) / n, this
                    }, multiply: function (e) {
                        function t(e, t) {
                            var n = b(e, t), o = e * n;
                            return o *= t * n, o /= n * n
                        }

                        return this._value = [this._value, e].reduce(t, 1), this
                    }, divide: function (e) {
                        function t(e, t) {
                            var n = b(e, t);
                            return e * n / (t * n)
                        }

                        return this._value = [this._value, e].reduce(t), this
                    }, difference: function (e) {
                        return Math.abs(C(this._value).subtract(e).value())
                    }
                }, v() && C.loadCulturesInNode(), A ? n.exports = C : ("undefined" == typeof ender && (this.numbro = C), "function" == typeof e && e.amd && e([], function () {
                    return C
                }))
            }).call("undefined" == typeof window ? this : window)
        }, {languages: 1}],
        pikaday: [function (t, n, o) {/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
            !function (r, i) {
                "use strict";
                var s;
                if ("object" == typeof o) {
                    try {
                        s = t("moment")
                    } catch (e) {
                    }
                    n.exports = i(s)
                } else "function" == typeof e && e.amd ? e(function (e) {
                    var t = "moment";
                    try {
                        s = e(t)
                    } catch (e) {
                    }
                    return i(s)
                }) : r.Pikaday = i(r.moment)
            }(this, function (e) {
                "use strict";
                var t = "function" == typeof e, n = !!window.addEventListener, o = window.document,
                    r = window.setTimeout, i = function (e, t, o, r) {
                        n ? e.addEventListener(t, o, !!r) : e.attachEvent("on" + t, o)
                    }, s = function (e, t, o, r) {
                        n ? e.removeEventListener(t, o, !!r) : e.detachEvent("on" + t, o)
                    }, a = function (e, t, n) {
                        var r;
                        o.createEvent ? (r = o.createEvent("HTMLEvents"), r.initEvent(t, !0, !1), r = y(r, n), e.dispatchEvent(r)) : o.createEventObject && (r = o.createEventObject(), r = y(r, n), e.fireEvent("on" + t, r))
                    }, l = function (e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    }, u = function (e, t) {
                        return (" " + e.className + " ").indexOf(" " + t + " ") !== -1
                    }, c = function (e, t) {
                        u(e, t) || (e.className = "" === e.className ? t : e.className + " " + t)
                    }, d = function (e, t) {
                        e.className = l((" " + e.className + " ").replace(" " + t + " ", " "))
                    }, h = function (e) {
                        return /Array/.test(Object.prototype.toString.call(e))
                    }, f = function (e) {
                        return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime())
                    }, p = function (e) {
                        var t = e.getDay();
                        return 0 === t || 6 === t
                    }, m = function (e) {
                        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
                    }, g = function (e, t) {
                        return [31, m(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
                    }, w = function (e) {
                        f(e) && e.setHours(0, 0, 0, 0)
                    }, v = function (e, t) {
                        return e.getTime() === t.getTime()
                    }, y = function (e, t, n) {
                        var o, r;
                        for (o in t) r = void 0 !== e[o], r && "object" == typeof t[o] && null !== t[o] && void 0 === t[o].nodeName ? f(t[o]) ? n && (e[o] = new Date(t[o].getTime())) : h(t[o]) ? n && (e[o] = t[o].slice(0)) : e[o] = y({}, t[o], n) : !n && r || (e[o] = t[o]);
                        return e
                    }, b = function (e) {
                        return e.month < 0 && (e.year -= Math.ceil(Math.abs(e.month) / 12), e.month += 12), e.month > 11 && (e.year += Math.floor(Math.abs(e.month) / 12), e.month -= 12), e
                    }, C = {
                        field: null,
                        bound: void 0,
                        position: "bottom left",
                        reposition: !0,
                        format: "YYYY-MM-DD",
                        defaultDate: null,
                        setDefaultDate: !1,
                        firstDay: 0,
                        formatStrict: !1,
                        minDate: null,
                        maxDate: null,
                        yearRange: 10,
                        showWeekNumber: !1,
                        minYear: 0,
                        maxYear: 9999,
                        minMonth: void 0,
                        maxMonth: void 0,
                        startRange: null,
                        endRange: null,
                        isRTL: !1,
                        yearSuffix: "",
                        showMonthAfterYear: !1,
                        showDaysInNextAndPreviousMonths: !1,
                        numberOfMonths: 1,
                        mainCalendar: "left",
                        container: void 0,
                        i18n: {
                            previousMonth: "Previous Month",
                            nextMonth: "Next Month",
                            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                        },
                        theme: null,
                        onSelect: null,
                        onOpen: null,
                        onClose: null,
                        onDraw: null
                    }, _ = function (e, t, n) {
                        for (t += e.firstDay; t >= 7;) t -= 7;
                        return n ? e.i18n.weekdaysShort[t] : e.i18n.weekdays[t]
                    }, R = function (e) {
                        var t = [], n = "false";
                        if (e.isEmpty) {
                            if (!e.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>';
                            t.push("is-outside-current-month")
                        }
                        return e.isDisabled && t.push("is-disabled"), e.isToday && t.push("is-today"), e.isSelected && (t.push("is-selected"), n = "true"), e.isInRange && t.push("is-inrange"), e.isStartRange && t.push("is-startrange"), e.isEndRange && t.push("is-endrange"), '<td data-day="' + e.day + '" class="' + t.join(" ") + '" aria-selected="' + n + '"><button class="pika-button pika-day" type="button" data-pika-year="' + e.year + '" data-pika-month="' + e.month + '" data-pika-day="' + e.day + '">' + e.day + "</button></td>"
                    }, M = function (e, t, n) {
                        var o = new Date(n, 0, 1), r = Math.ceil(((new Date(n, t, e) - o) / 864e5 + o.getDay() + 1) / 7);
                        return '<td class="pika-week">' + r + "</td>"
                    }, S = function (e, t) {
                        return "<tr>" + (t ? e.reverse() : e).join("") + "</tr>"
                    }, E = function (e) {
                        return "<tbody>" + e.join("") + "</tbody>"
                    }, O = function (e) {
                        var t, n = [];
                        for (e.showWeekNumber && n.push("<th></th>"), t = 0; t < 7; t++) n.push('<th scope="col"><abbr title="' + _(e, t) + '">' + _(e, t, !0) + "</abbr></th>");
                        return "<thead><tr>" + (e.isRTL ? n.reverse() : n).join("") + "</tr></thead>"
                    }, T = function (e, t, n, o, r, i) {
                        var s, a, l, u, c, d = e._o, f = n === d.minYear, p = n === d.maxYear,
                            m = '<div id="' + i + '" class="pika-title" role="heading" aria-live="assertive">', g = !0,
                            w = !0;
                        for (l = [], s = 0; s < 12; s++) l.push('<option value="' + (n === r ? s - t : 12 + s - t) + '"' + (s === o ? ' selected="selected"' : "") + (f && s < d.minMonth || p && s > d.maxMonth ? 'disabled="disabled"' : "") + ">" + d.i18n.months[s] + "</option>");
                        for (u = '<div class="pika-label">' + d.i18n.months[o] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>", h(d.yearRange) ? (s = d.yearRange[0], a = d.yearRange[1] + 1) : (s = n - d.yearRange, a = 1 + n + d.yearRange), l = []; s < a && s <= d.maxYear; s++) s >= d.minYear && l.push('<option value="' + s + '"' + (s === n ? ' selected="selected"' : "") + ">" + s + "</option>");
                        return c = '<div class="pika-label">' + n + d.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>", m += d.showMonthAfterYear ? c + u : u + c, f && (0 === o || d.minMonth >= o) && (g = !1), p && (11 === o || d.maxMonth <= o) && (w = !1), 0 === t && (m += '<button class="pika-prev' + (g ? "" : " is-disabled") + '" type="button">' + d.i18n.previousMonth + "</button>"), t === e._o.numberOfMonths - 1 && (m += '<button class="pika-next' + (w ? "" : " is-disabled") + '" type="button">' + d.i18n.nextMonth + "</button>"), m += "</div>"
                    }, k = function (e, t, n) {
                        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + n + '">' + O(e) + E(t) + "</table>"
                    }, x = function (s) {
                        var a = this, l = a.config(s);
                        a._onMouseDown = function (e) {
                            if (a._v) {
                                e = e || window.event;
                                var t = e.target || e.srcElement;
                                if (t) if (u(t, "is-disabled") || (!u(t, "pika-button") || u(t, "is-empty") || u(t.parentNode, "is-disabled") ? u(t, "pika-prev") ? a.prevMonth() : u(t, "pika-next") && a.nextMonth() : (a.setDate(new Date(t.getAttribute("data-pika-year"), t.getAttribute("data-pika-month"), t.getAttribute("data-pika-day"))), l.bound && r(function () {
                                    a.hide(), l.field && l.field.blur()
                                }, 100))), u(t, "pika-select")) a._c = !0; else {
                                    if (!e.preventDefault) return e.returnValue = !1, !1;
                                    e.preventDefault()
                                }
                            }
                        }, a._onChange = function (e) {
                            e = e || window.event;
                            var t = e.target || e.srcElement;
                            t && (u(t, "pika-select-month") ? a.gotoMonth(t.value) : u(t, "pika-select-year") && a.gotoYear(t.value))
                        }, a._onKeyChange = function (e) {
                            if (e = e || window.event, a.isVisible()) switch (e.keyCode) {
                                case 13:
                                case 27:
                                    l.field.blur();
                                    break;
                                case 37:
                                    e.preventDefault(), a.adjustDate("subtract", 1);
                                    break;
                                case 38:
                                    a.adjustDate("subtract", 7);
                                    break;
                                case 39:
                                    a.adjustDate("add", 1);
                                    break;
                                case 40:
                                    a.adjustDate("add", 7)
                            }
                        }, a._onInputChange = function (n) {
                            var o;
                            n.firedBy !== a && (t ? (o = e(l.field.value, l.format, l.formatStrict), o = o && o.isValid() ? o.toDate() : null) : o = new Date(Date.parse(l.field.value)), f(o) && a.setDate(o), a._v || a.show())
                        }, a._onInputFocus = function () {
                            a.show()
                        }, a._onInputClick = function () {
                            a.show()
                        }, a._onInputBlur = function () {
                            var e = o.activeElement;
                            do if (u(e, "pika-single")) return; while (e = e.parentNode);
                            a._c || (a._b = r(function () {
                                a.hide()
                            }, 50)), a._c = !1
                        }, a._onClick = function (e) {
                            e = e || window.event;
                            var t = e.target || e.srcElement, o = t;
                            if (t) {
                                !n && u(t, "pika-select") && (t.onchange || (t.setAttribute("onchange", "return;"), i(t, "change", a._onChange)));
                                do if (u(o, "pika-single") || o === l.trigger) return; while (o = o.parentNode);
                                a._v && t !== l.trigger && o !== l.trigger && a.hide()
                            }
                        }, a.el = o.createElement("div"), a.el.className = "pika-single" + (l.isRTL ? " is-rtl" : "") + (l.theme ? " " + l.theme : ""), i(a.el, "mousedown", a._onMouseDown, !0), i(a.el, "touchend", a._onMouseDown, !0), i(a.el, "change", a._onChange), i(o, "keydown", a._onKeyChange), l.field && (l.container ? l.container.appendChild(a.el) : l.bound ? o.body.appendChild(a.el) : l.field.parentNode.insertBefore(a.el, l.field.nextSibling), i(l.field, "change", a._onInputChange), l.defaultDate || (t && l.field.value ? l.defaultDate = e(l.field.value, l.format).toDate() : l.defaultDate = new Date(Date.parse(l.field.value)), l.setDefaultDate = !0));
                        var c = l.defaultDate;
                        f(c) ? l.setDefaultDate ? a.setDate(c, !0) : a.gotoDate(c) : a.gotoDate(new Date), l.bound ? (this.hide(), a.el.className += " is-bound", i(l.trigger, "click", a._onInputClick), i(l.trigger, "focus", a._onInputFocus), i(l.trigger, "blur", a._onInputBlur)) : this.show()
                    };
                return x.prototype = {
                    config: function (e) {
                        this._o || (this._o = y({}, C, !0));
                        var t = y(this._o, e, !0);
                        t.isRTL = !!t.isRTL, t.field = t.field && t.field.nodeName ? t.field : null, t.theme = "string" == typeof t.theme && t.theme ? t.theme : null, t.bound = !!(void 0 !== t.bound ? t.field && t.bound : t.field), t.trigger = t.trigger && t.trigger.nodeName ? t.trigger : t.field, t.disableWeekends = !!t.disableWeekends, t.disableDayFn = "function" == typeof t.disableDayFn ? t.disableDayFn : null;
                        var n = parseInt(t.numberOfMonths, 10) || 1;
                        if (t.numberOfMonths = n > 4 ? 4 : n, f(t.minDate) || (t.minDate = !1), f(t.maxDate) || (t.maxDate = !1), t.minDate && t.maxDate && t.maxDate < t.minDate && (t.maxDate = t.minDate = !1), t.minDate && this.setMinDate(t.minDate), t.maxDate && this.setMaxDate(t.maxDate), h(t.yearRange)) {
                            var o = (new Date).getFullYear() - 10;
                            t.yearRange[0] = parseInt(t.yearRange[0], 10) || o, t.yearRange[1] = parseInt(t.yearRange[1], 10) || o
                        } else t.yearRange = Math.abs(parseInt(t.yearRange, 10)) || C.yearRange, t.yearRange > 100 && (t.yearRange = 100);
                        return t
                    }, toString: function (n) {
                        return f(this._d) ? t ? e(this._d).format(n || this._o.format) : this._d.toDateString() : ""
                    }, getMoment: function () {
                        return t ? e(this._d) : null
                    }, setMoment: function (n, o) {
                        t && e.isMoment(n) && this.setDate(n.toDate(), o)
                    }, getDate: function () {
                        return f(this._d) ? new Date(this._d.getTime()) : new Date
                    }, setDate: function (e, t) {
                        if (!e) return this._d = null, this._o.field && (this._o.field.value = "", a(this._o.field, "change", {firedBy: this})), this.draw();
                        if ("string" == typeof e && (e = new Date(Date.parse(e))), f(e)) {
                            var n = this._o.minDate, o = this._o.maxDate;
                            f(n) && e < n ? e = n : f(o) && e > o && (e = o), this._d = new Date(e.getTime()), w(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), a(this._o.field, "change", {firedBy: this})), t || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
                        }
                    }, gotoDate: function (e) {
                        var t = !0;
                        if (f(e)) {
                            if (this.calendars) {
                                var n = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                                    o = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                                    r = e.getTime();
                                o.setMonth(o.getMonth() + 1), o.setDate(o.getDate() - 1), t = r < n.getTime() || o.getTime() < r
                            }
                            t && (this.calendars = [{
                                month: e.getMonth(),
                                year: e.getFullYear()
                            }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars()
                        }
                    }, adjustDate: function (n, o) {
                        var r, i = this.getDate(), s = 24 * parseInt(o) * 60 * 60 * 1e3;
                        "add" === n ? r = new Date(i.valueOf() + s) : "subtract" === n && (r = new Date(i.valueOf() - s)), t && ("add" === n ? r = e(i).add(o, "days").toDate() : "subtract" === n && (r = e(i).subtract(o, "days").toDate())), this.setDate(r)
                    }, adjustCalendars: function () {
                        this.calendars[0] = b(this.calendars[0]);
                        for (var e = 1; e < this._o.numberOfMonths; e++) this.calendars[e] = b({
                            month: this.calendars[0].month + e,
                            year: this.calendars[0].year
                        });
                        this.draw()
                    }, gotoToday: function () {
                        this.gotoDate(new Date)
                    }, gotoMonth: function (e) {
                        isNaN(e) || (this.calendars[0].month = parseInt(e, 10), this.adjustCalendars())
                    }, nextMonth: function () {
                        this.calendars[0].month++, this.adjustCalendars()
                    }, prevMonth: function () {
                        this.calendars[0].month--, this.adjustCalendars()
                    }, gotoYear: function (e) {
                        isNaN(e) || (this.calendars[0].year = parseInt(e, 10), this.adjustCalendars())
                    }, setMinDate: function (e) {
                        e instanceof Date ? (w(e), this._o.minDate = e, this._o.minYear = e.getFullYear(), this._o.minMonth = e.getMonth()) : (this._o.minDate = C.minDate, this._o.minYear = C.minYear, this._o.minMonth = C.minMonth, this._o.startRange = C.startRange), this.draw()
                    }, setMaxDate: function (e) {
                        e instanceof Date ? (w(e), this._o.maxDate = e, this._o.maxYear = e.getFullYear(), this._o.maxMonth = e.getMonth()) : (this._o.maxDate = C.maxDate, this._o.maxYear = C.maxYear, this._o.maxMonth = C.maxMonth, this._o.endRange = C.endRange), this.draw()
                    }, setStartRange: function (e) {
                        this._o.startRange = e
                    }, setEndRange: function (e) {
                        this._o.endRange = e
                    }, draw: function (e) {
                        if (this._v || e) {
                            var t, n = this._o, o = n.minYear, i = n.maxYear, s = n.minMonth, a = n.maxMonth, l = "";
                            this._y <= o && (this._y = o, !isNaN(s) && this._m < s && (this._m = s)), this._y >= i && (this._y = i, !isNaN(a) && this._m > a && (this._m = a)), t = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                            for (var u = 0; u < n.numberOfMonths; u++) l += '<div class="pika-lendar">' + T(this, u, this.calendars[u].year, this.calendars[u].month, this.calendars[0].year, t) + this.render(this.calendars[u].year, this.calendars[u].month, t) + "</div>";
                            this.el.innerHTML = l, n.bound && "hidden" !== n.field.type && r(function () {
                                n.trigger.focus()
                            }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), n.bound && n.field.setAttribute("aria-label", "Use the arrow keys to pick a date")
                        }
                    }, adjustPosition: function () {
                        var e, t, n, r, i, s, a, l, u, c;
                        if (!this._o.container) {
                            if (this.el.style.position = "absolute", e = this._o.trigger, t = e, n = this.el.offsetWidth, r = this.el.offsetHeight, i = window.innerWidth || o.documentElement.clientWidth, s = window.innerHeight || o.documentElement.clientHeight, a = window.pageYOffset || o.body.scrollTop || o.documentElement.scrollTop, "function" == typeof e.getBoundingClientRect) c = e.getBoundingClientRect(), l = c.left + window.pageXOffset, u = c.bottom + window.pageYOffset; else for (l = t.offsetLeft, u = t.offsetTop + t.offsetHeight; t = t.offsetParent;) l += t.offsetLeft, u += t.offsetTop;
                            (this._o.reposition && l + n > i || this._o.position.indexOf("right") > -1 && l - n + e.offsetWidth > 0) && (l = l - n + e.offsetWidth), (this._o.reposition && u + r > s + a || this._o.position.indexOf("top") > -1 && u - r - e.offsetHeight > 0) && (u = u - r - e.offsetHeight), this.el.style.left = l + "px", this.el.style.top = u + "px"
                        }
                    }, render: function (e, t, n) {
                        var o = this._o, r = new Date, i = g(e, t), s = new Date(e, t, 1).getDay(), a = [], l = [];
                        w(r), o.firstDay > 0 && (s -= o.firstDay, s < 0 && (s += 7));
                        for (var u = 0 === t ? 11 : t - 1, c = 11 === t ? 0 : t + 1, d = 0 === t ? e - 1 : e, h = 11 === t ? e + 1 : e, m = g(d, u), y = i + s, b = y; b > 7;) b -= 7;
                        y += 7 - b;
                        for (var C = 0, _ = 0; C < y; C++) {
                            var E = new Date(e, t, 1 + (C - s)), O = !!f(this._d) && v(E, this._d), T = v(E, r),
                                x = C < s || C >= i + s, D = 1 + (C - s), H = t, A = e,
                                P = o.startRange && v(o.startRange, E), N = o.endRange && v(o.endRange, E),
                                L = o.startRange && o.endRange && o.startRange < E && E < o.endRange,
                                I = o.minDate && E < o.minDate || o.maxDate && E > o.maxDate || o.disableWeekends && p(E) || o.disableDayFn && o.disableDayFn(E);
                            x && (C < s ? (D = m + D, H = u, A = d) : (D -= i, H = c, A = h));
                            var W = {
                                day: D,
                                month: H,
                                year: A,
                                isSelected: O,
                                isToday: T,
                                isDisabled: I,
                                isEmpty: x,
                                isStartRange: P,
                                isEndRange: N,
                                isInRange: L,
                                showDaysInNextAndPreviousMonths: o.showDaysInNextAndPreviousMonths
                            };
                            l.push(R(W)), 7 === ++_ && (o.showWeekNumber && l.unshift(M(C - s, t, e)), a.push(S(l, o.isRTL)), l = [], _ = 0)
                        }
                        return k(o, a, n)
                    }, isVisible: function () {
                        return this._v
                    }, show: function () {
                        this.isVisible() || (d(this.el, "is-hidden"), this._v = !0, this.draw(), this._o.bound && (i(o, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
                    }, hide: function () {
                        var e = this._v;
                        e !== !1 && (this._o.bound && s(o, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto", c(this.el, "is-hidden"), this._v = !1, void 0 !== e && "function" == typeof this._o.onClose && this._o.onClose.call(this))
                    }, destroy: function () {
                        this.hide(), s(this.el, "mousedown", this._onMouseDown, !0), s(this.el, "touchend", this._onMouseDown, !0), s(this.el, "change", this._onChange), this._o.field && (s(this._o.field, "change", this._onInputChange), this._o.bound && (s(this._o.trigger, "click", this._onInputClick), s(this._o.trigger, "focus", this._onInputFocus), s(this._o.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
                    }
                }, x
            })
        }, {moment: "moment"}],
        zeroclipboard: [function (t, n, o) {/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface
 * Copyright (c) 2009-2016 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.3.0
 */
            !function (t, o) {
                "use strict";
                var r, i, s, a = t, l = a.document, u = a.navigator, c = a.setTimeout, d = a.clearTimeout,
                    h = a.setInterval, f = a.clearInterval, p = a.getComputedStyle, m = a.encodeURIComponent,
                    g = a.ActiveXObject, w = a.Error, v = a.Number.parseInt || a.parseInt,
                    y = a.Number.parseFloat || a.parseFloat, b = a.Number.isNaN || a.isNaN, C = a.Date.now,
                    _ = a.Object.keys, R = a.Object.prototype.hasOwnProperty, M = a.Array.prototype.slice,
                    S = function () {
                        var e = function (e) {
                            return e
                        };
                        if ("function" == typeof a.wrap && "function" == typeof a.unwrap) try {
                            var t = l.createElement("div"), n = a.unwrap(t);
                            1 === t.nodeType && n && 1 === n.nodeType && (e = a.unwrap)
                        } catch (e) {
                        }
                        return e
                    }(), E = function (e) {
                        return M.call(e, 0)
                    }, O = function () {
                        var e, t, n, r, i, s, a = E(arguments), l = a[0] || {};
                        for (e = 1, t = a.length; e < t; e++) if (null != (n = a[e])) for (r in n) R.call(n, r) && (i = l[r], s = n[r], l !== s && s !== o && (l[r] = s));
                        return l
                    }, T = function (e) {
                        var t, n, o, r;
                        if ("object" != typeof e || null == e || "number" == typeof e.nodeType) t = e; else if ("number" == typeof e.length) for (t = [], n = 0, o = e.length; n < o; n++) R.call(e, n) && (t[n] = T(e[n])); else {
                            t = {};
                            for (r in e) R.call(e, r) && (t[r] = T(e[r]))
                        }
                        return t
                    }, k = function (e, t) {
                        for (var n = {}, o = 0, r = t.length; o < r; o++) t[o] in e && (n[t[o]] = e[t[o]]);
                        return n
                    }, x = function (e, t) {
                        var n = {};
                        for (var o in e) t.indexOf(o) === -1 && (n[o] = e[o]);
                        return n
                    }, D = function (e) {
                        if (e) for (var t in e) R.call(e, t) && delete e[t];
                        return e
                    }, H = function (e, t) {
                        if (e && 1 === e.nodeType && e.ownerDocument && t && (1 === t.nodeType && t.ownerDocument && t.ownerDocument === e.ownerDocument || 9 === t.nodeType && !t.ownerDocument && t === e.ownerDocument)) do {
                            if (e === t) return !0;
                            e = e.parentNode
                        } while (e);
                        return !1
                    }, A = function (e) {
                        var t;
                        return "string" == typeof e && e && (t = e.split("#")[0].split("?")[0], t = e.slice(0, e.lastIndexOf("/") + 1)), t
                    }, P = function (e) {
                        var t, n;
                        return "string" == typeof e && e && (n = e.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] ? t = n[1] : (n = e.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] && (t = n[1]))), t
                    }, N = function () {
                        var e, t;
                        try {
                            throw new w
                        } catch (e) {
                            t = e
                        }
                        return t && (e = t.sourceURL || t.fileName || P(t.stack)), e
                    }, L = function () {
                        var e, t, n;
                        if (l.currentScript && (e = l.currentScript.src)) return e;
                        if (t = l.getElementsByTagName("script"), 1 === t.length) return t[0].src || o;
                        if ("readyState" in (t[0] || document.createElement("script"))) for (n = t.length; n--;) if ("interactive" === t[n].readyState && (e = t[n].src)) return e;
                        return "loading" === l.readyState && (e = t[t.length - 1].src) ? e : (e = N()) ? e : o
                    }, I = function () {
                        var e, t, n, r = l.getElementsByTagName("script");
                        for (e = r.length; e--;) {
                            if (!(n = r[e].src)) {
                                t = null;
                                break
                            }
                            if (n = A(n), null == t) t = n; else if (t !== n) {
                                t = null;
                                break
                            }
                        }
                        return t || o
                    }, W = function () {
                        var e = A(L()) || I() || "";
                        return e + "ZeroClipboard.swf"
                    }, j = function () {
                        var e = /win(dows|[\s]?(nt|me|ce|xp|vista|[\d]+))/i;
                        return !!u && (e.test(u.appVersion || "") || e.test(u.platform || "") || (u.userAgent || "").indexOf("Windows") !== -1)
                    }, V = function () {
                        return null == a.opener && (!!a.top && a != a.top || !!a.parent && a != a.parent)
                    }(), B = "html" === l.documentElement.nodeName, F = {
                        bridge: null,
                        version: "0.0.0",
                        pluginType: "unknown",
                        sandboxed: null,
                        disabled: null,
                        outdated: null,
                        insecure: null,
                        unavailable: null,
                        degraded: null,
                        deactivated: null,
                        overdue: null,
                        ready: null
                    }, z = "11.0.0", Y = {}, U = {}, G = null, $ = 0, K = 0, X = {
                        ready: "Flash communication is established", error: {
                            "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible",
                            "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
                            "flash-outdated": "Flash is too outdated to support ZeroClipboard",
                            "flash-insecure": "Flash will be unable to communicate due to a protocol mismatch between your `swfPath` configuration and the page",
                            "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
                            "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript",
                            "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
                            "flash-overdue": "Flash communication was established but NOT within the acceptable time limit",
                            "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
                            "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
                            "config-mismatch": "ZeroClipboard configuration does not match Flash's reality",
                            "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity",
                            "browser-unsupported": "The browser does not support the required HTML DOM and JavaScript features"
                        }
                    },
                    q = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"],
                    Z = ["flash-sandboxed", "flash-disabled", "flash-outdated", "flash-insecure", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"],
                    J = new RegExp("^flash-(" + Z.map(function (e) {
                        return e.replace(/^flash-/, "")
                    }).join("|") + ")$"), Q = new RegExp("^flash-(" + Z.filter(function (e) {
                        return "flash-disabled" !== e
                    }).map(function (e) {
                        return e.replace(/^flash-/, "")
                    }).join("|") + ")$"), ee = {
                        swfPath: W(),
                        trustedDomains: a.location.host ? [a.location.host] : [],
                        cacheBust: !0,
                        forceEnhancedClipboard: !1,
                        flashLoadTimeout: 3e4,
                        autoActivate: !0,
                        bubbleEvents: !0,
                        fixLineEndings: !0,
                        containerId: "global-zeroclipboard-html-bridge",
                        containerClass: "global-zeroclipboard-container",
                        swfObjectId: "global-zeroclipboard-flash-bridge",
                        hoverClass: "zeroclipboard-is-hover",
                        activeClass: "zeroclipboard-is-active",
                        forceHandCursor: !1,
                        title: null,
                        zIndex: 999999999
                    }, te = function (e) {
                        "object" != typeof e || !e || "length" in e || _(e).forEach(function (t) {
                            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents|fixLineEndings)$/.test(t)) ee[t] = e[t]; else if (null == F.bridge) if ("containerId" === t || "swfObjectId" === t) {
                                if (!ve(e[t])) throw new Error("The specified `" + t + "` value is not valid as an HTML4 Element ID");
                                ee[t] = e[t]
                            } else ee[t] = e[t]
                        });
                        {
                            if ("string" != typeof e || !e) return T(ee);
                            if (R.call(ee, e)) return ee[e]
                        }
                    }, ne = function () {
                        return Je(), {
                            browser: O(k(u, ["userAgent", "platform", "appName", "appVersion"]), {isSupported: oe()}),
                            flash: x(F, ["bridge"]),
                            zeroclipboard: {version: et.version, config: et.config()}
                        }
                    }, oe = function () {
                        return !!(l.addEventListener && a.Object.keys && a.Array.prototype.map)
                    }, re = function () {
                        return !!(F.sandboxed || F.disabled || F.outdated || F.unavailable || F.degraded || F.deactivated)
                    }, ie = function (e, t) {
                        var n, i, s, a = {};
                        if ("string" == typeof e && e ? s = e.toLowerCase().split(/\s+/) : "object" != typeof e || !e || "length" in e || "undefined" != typeof t || _(e).forEach(function (t) {
                            var n = e[t];
                            "function" == typeof n && et.on(t, n)
                        }), s && s.length && t) {
                            for (n = 0, i = s.length; n < i; n++) e = s[n].replace(/^on/, ""), a[e] = !0, Y[e] || (Y[e] = []), Y[e].push(t);
                            if (a.ready && F.ready && et.emit({type: "ready"}), a.error) {
                                for (oe() || et.emit({
                                    type: "error",
                                    name: "browser-unsupported"
                                }), n = 0, i = Z.length; n < i; n++) if (F[Z[n].replace(/^flash-/, "")] === !0) {
                                    et.emit({type: "error", name: Z[n]});
                                    break
                                }
                                r !== o && et.version !== r && et.emit({
                                    type: "error",
                                    name: "version-mismatch",
                                    jsVersion: et.version,
                                    swfVersion: r
                                })
                            }
                        }
                        return et
                    }, se = function (e, t) {
                        var n, o, r, i, s;
                        if (0 === arguments.length ? i = _(Y) : "string" == typeof e && e ? i = e.toLowerCase().split(/\s+/) : "object" != typeof e || !e || "length" in e || "undefined" != typeof t || _(e).forEach(function (t) {
                            var n = e[t];
                            "function" == typeof n && et.off(t, n)
                        }), i && i.length) for (n = 0, o = i.length; n < o; n++) if (e = i[n].replace(/^on/, ""), s = Y[e], s && s.length) if (t) for (r = s.indexOf(t); r !== -1;) s.splice(r, 1), r = s.indexOf(t, r); else s.length = 0;
                        return et
                    }, ae = function (e) {
                        var t;
                        return t = "string" == typeof e && e ? T(Y[e]) || null : T(Y)
                    }, le = function (e) {
                        var t, n, o;
                        if (e = ye(e), e && !Ee(e)) return "ready" === e.type && F.overdue === !0 ? et.emit({
                            type: "error",
                            name: "flash-overdue"
                        }) : (t = O({}, e), Me.call(this, t), "copy" === e.type && (o = Ne(U), n = o.data, G = o.formatMap), n)
                    }, ue = function () {
                        var e = ee.swfPath || "", t = e.slice(0, 2), n = e.slice(0, e.indexOf("://") + 1);
                        return "\\\\" === t ? "file:" : "//" === t || "" === n ? a.location.protocol : n
                    }, ce = function () {
                        var e, t, n = F.sandboxed;
                        return oe() ? (Je(), "boolean" != typeof F.ready && (F.ready = !1), void (F.sandboxed !== n && F.sandboxed === !0 ? (F.ready = !1, et.emit({
                            type: "error",
                            name: "flash-sandboxed"
                        })) : et.isFlashUnusable() || null !== F.bridge || (t = ue(), t && t !== a.location.protocol ? et.emit({
                            type: "error",
                            name: "flash-insecure"
                        }) : (e = ee.flashLoadTimeout, "number" == typeof e && e >= 0 && ($ = c(function () {
                            "boolean" != typeof F.deactivated && (F.deactivated = !0), F.deactivated === !0 && et.emit({
                                type: "error",
                                name: "flash-deactivated"
                            })
                        }, e)), F.overdue = !1, Ae())))) : (F.ready = !1, void et.emit({
                            type: "error",
                            name: "browser-unsupported"
                        }))
                    }, de = function () {
                        et.clearData(), et.blur(), et.emit("destroy"), Pe(), et.off()
                    }, he = function (e, t) {
                        var n;
                        if ("object" == typeof e && e && "undefined" == typeof t) n = e, et.clearData(); else {
                            if ("string" != typeof e || !e) return;
                            n = {}, n[e] = t
                        }
                        for (var o in n) "string" == typeof o && o && R.call(n, o) && "string" == typeof n[o] && n[o] && (U[o] = Ze(n[o]))
                    }, fe = function (e) {
                        "undefined" == typeof e ? (D(U), G = null) : "string" == typeof e && R.call(U, e) && delete U[e]
                    }, pe = function (e) {
                        return "undefined" == typeof e ? T(U) : "string" == typeof e && R.call(U, e) ? U[e] : void 0
                    }, me = function (e) {
                        if (e && 1 === e.nodeType) {
                            i && (ze(i, ee.activeClass), i !== e && ze(i, ee.hoverClass)), i = e, Fe(e, ee.hoverClass);
                            var t = e.getAttribute("title") || ee.title;
                            if ("string" == typeof t && t) {
                                var n = De(F.bridge);
                                n && n.setAttribute("title", t)
                            }
                            var o = ee.forceHandCursor === !0 || "pointer" === Ye(e, "cursor");
                            Xe(o), Ke()
                        }
                    }, ge = function () {
                        var e = De(F.bridge);
                        e && (e.removeAttribute("title"), e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.height = "1px"), i && (ze(i, ee.hoverClass), ze(i, ee.activeClass), i = null)
                    }, we = function () {
                        return i || null
                    }, ve = function (e) {
                        return "string" == typeof e && e && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(e)
                    }, ye = function (e) {
                        var t;
                        if ("string" == typeof e && e ? (t = e, e = {}) : "object" == typeof e && e && "string" == typeof e.type && e.type && (t = e.type), t) {
                            t = t.toLowerCase(), !e.target && (/^(copy|aftercopy|_click)$/.test(t) || "error" === t && "clipboard-error" === e.name) && (e.target = s), O(e, {
                                type: t,
                                target: e.target || i || null,
                                relatedTarget: e.relatedTarget || null,
                                currentTarget: F && F.bridge || null,
                                timeStamp: e.timeStamp || C() || null
                            });
                            var n = X[e.type];
                            return "error" === e.type && e.name && n && (n = n[e.name]), n && (e.message = n), "ready" === e.type && O(e, {
                                target: null,
                                version: F.version
                            }), "error" === e.type && (J.test(e.name) && O(e, {
                                target: null,
                                minimumVersion: z
                            }), Q.test(e.name) && O(e, {version: F.version}), "flash-insecure" === e.name && O(e, {
                                pageProtocol: a.location.protocol,
                                swfProtocol: ue()
                            })), "copy" === e.type && (e.clipboardData = {
                                setData: et.setData,
                                clearData: et.clearData
                            }), "aftercopy" === e.type && (e = Le(e, G)), e.target && !e.relatedTarget && (e.relatedTarget = be(e.target)), Ce(e)
                        }
                    }, be = function (e) {
                        var t = e && e.getAttribute && e.getAttribute("data-clipboard-target");
                        return t ? l.getElementById(t) : null
                    }, Ce = function (e) {
                        if (e && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) {
                            var t = e.target, n = "_mouseover" === e.type && e.relatedTarget ? e.relatedTarget : o,
                                r = "_mouseout" === e.type && e.relatedTarget ? e.relatedTarget : o, i = Ue(t),
                                s = a.screenLeft || a.screenX || 0, u = a.screenTop || a.screenY || 0,
                                c = l.body.scrollLeft + l.documentElement.scrollLeft,
                                d = l.body.scrollTop + l.documentElement.scrollTop,
                                h = i.left + ("number" == typeof e._stageX ? e._stageX : 0),
                                f = i.top + ("number" == typeof e._stageY ? e._stageY : 0), p = h - c, m = f - d, g = s + p,
                                w = u + m, v = "number" == typeof e.movementX ? e.movementX : 0,
                                y = "number" == typeof e.movementY ? e.movementY : 0;
                            delete e._stageX, delete e._stageY, O(e, {
                                srcElement: t,
                                fromElement: n,
                                toElement: r,
                                screenX: g,
                                screenY: w,
                                pageX: h,
                                pageY: f,
                                clientX: p,
                                clientY: m,
                                x: p,
                                y: m,
                                movementX: v,
                                movementY: y,
                                offsetX: 0,
                                offsetY: 0,
                                layerX: 0,
                                layerY: 0
                            })
                        }
                        return e
                    }, _e = function (e) {
                        var t = e && "string" == typeof e.type && e.type || "";
                        return !/^(?:(?:before)?copy|destroy)$/.test(t)
                    }, Re = function (e, t, n, o) {
                        o ? c(function () {
                            e.apply(t, n)
                        }, 0) : e.apply(t, n)
                    }, Me = function (e) {
                        if ("object" == typeof e && e && e.type) {
                            var t = _e(e), n = Y["*"] || [], o = Y[e.type] || [], r = n.concat(o);
                            if (r && r.length) {
                                var i, s, l, u, c, d = this;
                                for (i = 0, s = r.length; i < s; i++) l = r[i], u = d, "string" == typeof l && "function" == typeof a[l] && (l = a[l]), "object" == typeof l && l && "function" == typeof l.handleEvent && (u = l, l = l.handleEvent), "function" == typeof l && (c = O({}, e), Re(l, u, [c], t))
                            }
                            return this
                        }
                    }, Se = function (e) {
                        var t = null;
                        return (V === !1 || e && "error" === e.type && e.name && q.indexOf(e.name) !== -1) && (t = !1), t
                    }, Ee = function (e) {
                        var t = e.target || i || null, n = "swf" === e._source;
                        switch (delete e._source, e.type) {
                            case"error":
                                var o = "flash-sandboxed" === e.name || Se(e);
                                "boolean" == typeof o && (F.sandboxed = o), "browser-unsupported" === e.name ? O(F, {
                                    disabled: !1,
                                    outdated: !1,
                                    unavailable: !1,
                                    degraded: !1,
                                    deactivated: !1,
                                    overdue: !1,
                                    ready: !1
                                }) : Z.indexOf(e.name) !== -1 ? O(F, {
                                    disabled: "flash-disabled" === e.name,
                                    outdated: "flash-outdated" === e.name,
                                    insecure: "flash-insecure" === e.name,
                                    unavailable: "flash-unavailable" === e.name,
                                    degraded: "flash-degraded" === e.name,
                                    deactivated: "flash-deactivated" === e.name,
                                    overdue: "flash-overdue" === e.name,
                                    ready: !1
                                }) : "version-mismatch" === e.name && (r = e.swfVersion, O(F, {
                                    disabled: !1,
                                    outdated: !1,
                                    insecure: !1,
                                    unavailable: !1,
                                    degraded: !1,
                                    deactivated: !1,
                                    overdue: !1,
                                    ready: !1
                                })), $e();
                                break;
                            case"ready":
                                r = e.swfVersion;
                                var a = F.deactivated === !0;
                                O(F, {
                                    sandboxed: !1,
                                    disabled: !1,
                                    outdated: !1,
                                    insecure: !1,
                                    unavailable: !1,
                                    degraded: !1,
                                    deactivated: !1,
                                    overdue: a,
                                    ready: !a
                                }), $e();
                                break;
                            case"beforecopy":
                                s = t;
                                break;
                            case"copy":
                                var l, u, c = e.relatedTarget;
                                !U["text/html"] && !U["text/plain"] && c && (u = c.value || c.outerHTML || c.innerHTML) && (l = c.value || c.textContent || c.innerText) ? (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", l), u !== l && e.clipboardData.setData("text/html", u)) : !U["text/plain"] && e.target && (l = e.target.getAttribute("data-clipboard-text")) && (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", l));
                                break;
                            case"aftercopy":
                                Oe(e), et.clearData(), t && t !== Be() && t.focus && t.focus();
                                break;
                            case"_mouseover":
                                et.focus(t), ee.bubbleEvents === !0 && n && (t && t !== e.relatedTarget && !H(e.relatedTarget, t) && Te(O({}, e, {
                                    type: "mouseenter",
                                    bubbles: !1,
                                    cancelable: !1
                                })), Te(O({}, e, {type: "mouseover"})));
                                break;
                            case"_mouseout":
                                et.blur(), ee.bubbleEvents === !0 && n && (t && t !== e.relatedTarget && !H(e.relatedTarget, t) && Te(O({}, e, {
                                    type: "mouseleave",
                                    bubbles: !1,
                                    cancelable: !1
                                })), Te(O({}, e, {type: "mouseout"})));
                                break;
                            case"_mousedown":
                                Fe(t, ee.activeClass), ee.bubbleEvents === !0 && n && Te(O({}, e, {type: e.type.slice(1)}));
                                break;
                            case"_mouseup":
                                ze(t, ee.activeClass), ee.bubbleEvents === !0 && n && Te(O({}, e, {type: e.type.slice(1)}));
                                break;
                            case"_click":
                                s = null, ee.bubbleEvents === !0 && n && Te(O({}, e, {type: e.type.slice(1)}));
                                break;
                            case"_mousemove":
                                ee.bubbleEvents === !0 && n && Te(O({}, e, {type: e.type.slice(1)}))
                        }
                        if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) return !0
                    }, Oe = function (e) {
                        if (e.errors && e.errors.length > 0) {
                            var t = T(e);
                            O(t, {type: "error", name: "clipboard-error"}), delete t.success, c(function () {
                                et.emit(t)
                            }, 0)
                        }
                    }, Te = function (e) {
                        if (e && "string" == typeof e.type && e) {
                            var t, n = e.target || null, o = n && n.ownerDocument || l, r = {
                                view: o.defaultView || a,
                                canBubble: !0,
                                cancelable: !0,
                                detail: "click" === e.type ? 1 : 0,
                                button: "number" == typeof e.which ? e.which - 1 : "number" == typeof e.button ? e.button : o.createEvent ? 0 : 1
                            }, i = O(r, e);
                            n && o.createEvent && n.dispatchEvent && (i = [i.type, i.canBubble, i.cancelable, i.view, i.detail, i.screenX, i.screenY, i.clientX, i.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget], t = o.createEvent("MouseEvents"), t.initMouseEvent && (t.initMouseEvent.apply(t, i), t._source = "js", n.dispatchEvent(t)))
                        }
                    }, ke = function () {
                        var e = ee.flashLoadTimeout;
                        if ("number" == typeof e && e >= 0) {
                            var t = Math.min(1e3, e / 10), n = ee.swfObjectId + "_fallbackContent";
                            K = h(function () {
                                var e = l.getElementById(n);
                                Ge(e) && ($e(), F.deactivated = null, et.emit({type: "error", name: "swf-not-found"}))
                            }, t)
                        }
                    }, xe = function () {
                        var e = l.createElement("div");
                        return e.id = ee.containerId, e.className = ee.containerClass, e.style.position = "absolute", e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.height = "1px", e.style.zIndex = "" + qe(ee.zIndex), e
                    }, De = function (e) {
                        for (var t = e && e.parentNode; t && "OBJECT" === t.nodeName && t.parentNode;) t = t.parentNode;
                        return t || null
                    }, He = function (e) {
                        return "string" == typeof e && e ? e.replace(/["&'<>]/g, function (e) {
                            switch (e) {
                                case'"':
                                    return "&quot;";
                                case"&":
                                    return "&amp;";
                                case"'":
                                    return "&apos;";
                                case"<":
                                    return "&lt;";
                                case">":
                                    return "&gt;";
                                default:
                                    return e
                            }
                        }) : e
                    }, Ae = function () {
                        var e, t = F.bridge, n = De(t);
                        if (!t) {
                            var o = Ve(a.location.host, ee), r = "never" === o ? "none" : "all",
                                i = We(O({jsVersion: et.version}, ee)), s = ee.swfPath + Ie(ee.swfPath, ee);
                            B && (s = He(s)), n = xe();
                            var u = l.createElement("div");
                            n.appendChild(u), l.body.appendChild(n);
                            var c = l.createElement("div"), d = "activex" === F.pluginType;
                            c.innerHTML = '<object id="' + ee.swfObjectId + '" name="' + ee.swfObjectId + '" width="100%" height="100%" ' + (d ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + s + '"') + ">" + (d ? '<param name="movie" value="' + s + '"/>' : "") + '<param name="allowScriptAccess" value="' + o + '"/><param name="allowNetworking" value="' + r + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + i + '"/><div id="' + ee.swfObjectId + '_fallbackContent">&nbsp;</div></object>', t = c.firstChild, c = null, S(t).ZeroClipboard = et, n.replaceChild(t, u), ke()
                        }
                        return t || (t = l[ee.swfObjectId], t && (e = t.length) && (t = t[e - 1]), !t && n && (t = n.firstChild)), F.bridge = t || null, t
                    }, Pe = function () {
                        var e = F.bridge;
                        if (e) {
                            var t = De(e);
                            t && ("activex" === F.pluginType && "readyState" in e ? (e.style.display = "none", function n() {
                                if (4 === e.readyState) {
                                    for (var o in e) "function" == typeof e[o] && (e[o] = null);
                                    e.parentNode && e.parentNode.removeChild(e), t.parentNode && t.parentNode.removeChild(t)
                                } else c(n, 10)
                            }()) : (e.parentNode && e.parentNode.removeChild(e), t.parentNode && t.parentNode.removeChild(t))), $e(), F.ready = null, F.bridge = null, F.deactivated = null, F.insecure = null, r = o
                        }
                    }, Ne = function (e) {
                        var t = {}, n = {};
                        if ("object" == typeof e && e) {
                            for (var o in e) if (o && R.call(e, o) && "string" == typeof e[o] && e[o]) switch (o.toLowerCase()) {
                                case"text/plain":
                                case"text":
                                case"air:text":
                                case"flash:text":
                                    t.text = e[o], n.text = o;
                                    break;
                                case"text/html":
                                case"html":
                                case"air:html":
                                case"flash:html":
                                    t.html = e[o], n.html = o;
                                    break;
                                case"application/rtf":
                                case"text/rtf":
                                case"rtf":
                                case"richtext":
                                case"air:rtf":
                                case"flash:rtf":
                                    t.rtf = e[o], n.rtf = o
                            }
                            return {data: t, formatMap: n}
                        }
                    }, Le = function (e, t) {
                        if ("object" != typeof e || !e || "object" != typeof t || !t) return e;
                        var n = {};
                        for (var o in e) if (R.call(e, o)) if ("errors" === o) {
                            n[o] = e[o] ? e[o].slice() : [];
                            for (var r = 0, i = n[o].length; r < i; r++) n[o][r].format = t[n[o][r].format]
                        } else if ("success" !== o && "data" !== o) n[o] = e[o]; else {
                            n[o] = {};
                            var s = e[o];
                            for (var a in s) a && R.call(s, a) && R.call(t, a) && (n[o][t[a]] = s[a])
                        }
                        return n
                    }, Ie = function (e, t) {
                        var n = null == t || t && t.cacheBust === !0;
                        return n ? (e.indexOf("?") === -1 ? "?" : "&") + "noCache=" + C() : ""
                    }, We = function (e) {
                        var t, n, o, r, i = "", s = [];
                        if (e.trustedDomains && ("string" == typeof e.trustedDomains ? r = [e.trustedDomains] : "object" == typeof e.trustedDomains && "length" in e.trustedDomains && (r = e.trustedDomains)), r && r.length) for (t = 0, n = r.length; t < n; t++) if (R.call(r, t) && r[t] && "string" == typeof r[t]) {
                            if (o = je(r[t]), !o) continue;
                            if ("*" === o) {
                                s.length = 0, s.push(o);
                                break
                            }
                            s.push.apply(s, [o, "//" + o, a.location.protocol + "//" + o])
                        }
                        return s.length && (i += "trustedOrigins=" + m(s.join(","))), e.forceEnhancedClipboard === !0 && (i += (i ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof e.swfObjectId && e.swfObjectId && (i += (i ? "&" : "") + "swfObjectId=" + m(e.swfObjectId)), "string" == typeof e.jsVersion && e.jsVersion && (i += (i ? "&" : "") + "jsVersion=" + m(e.jsVersion)), i
                    }, je = function (e) {
                        if (null == e || "" === e) return null;
                        if (e = e.replace(/^\s+|\s+$/g, ""), "" === e) return null;
                        var t = e.indexOf("//");
                        e = t === -1 ? e : e.slice(t + 2);
                        var n = e.indexOf("/");
                        return e = n === -1 ? e : t === -1 || 0 === n ? null : e.slice(0, n), e && ".swf" === e.slice(-4).toLowerCase() ? null : e || null
                    }, Ve = function () {
                        var e = function (e) {
                            var t, n, o, r = [];
                            if ("string" == typeof e && (e = [e]), "object" != typeof e || !e || "number" != typeof e.length) return r;
                            for (t = 0, n = e.length; t < n; t++) if (R.call(e, t) && (o = je(e[t]))) {
                                if ("*" === o) {
                                    r.length = 0, r.push("*");
                                    break
                                }
                                r.indexOf(o) === -1 && r.push(o)
                            }
                            return r
                        };
                        return function (t, n) {
                            var o = je(n.swfPath);
                            null === o && (o = t);
                            var r = e(n.trustedDomains), i = r.length;
                            if (i > 0) {
                                if (1 === i && "*" === r[0]) return "always";
                                if (r.indexOf(t) !== -1) return 1 === i && t === o ? "sameDomain" : "always"
                            }
                            return "never"
                        }
                    }(), Be = function () {
                        try {
                            return l.activeElement
                        } catch (e) {
                            return null
                        }
                    }, Fe = function (e, t) {
                        var n, o, r, i = [];
                        if ("string" == typeof t && t && (i = t.split(/\s+/)), e && 1 === e.nodeType && i.length > 0) {
                            for (r = (" " + (e.className || "") + " ").replace(/[\t\r\n\f]/g, " "), n = 0, o = i.length; n < o; n++) r.indexOf(" " + i[n] + " ") === -1 && (r += i[n] + " ");
                            r = r.replace(/^\s+|\s+$/g, ""), r !== e.className && (e.className = r)
                        }
                        return e
                    }, ze = function (e, t) {
                        var n, o, r, i = [];
                        if ("string" == typeof t && t && (i = t.split(/\s+/)), e && 1 === e.nodeType && i.length > 0 && e.className) {
                            for (r = (" " + e.className + " ").replace(/[\t\r\n\f]/g, " "), n = 0, o = i.length; n < o; n++) r = r.replace(" " + i[n] + " ", " ");
                            r = r.replace(/^\s+|\s+$/g, ""), r !== e.className && (e.className = r)
                        }
                        return e
                    }, Ye = function (e, t) {
                        var n = p(e, null).getPropertyValue(t);
                        return "cursor" !== t || n && "auto" !== n || "A" !== e.nodeName ? n : "pointer"
                    }, Ue = function (e) {
                        var t = {left: 0, top: 0, width: 0, height: 0};
                        if (e.getBoundingClientRect) {
                            var n = e.getBoundingClientRect(), o = a.pageXOffset, r = a.pageYOffset,
                                i = l.documentElement.clientLeft || 0, s = l.documentElement.clientTop || 0, u = 0, c = 0;
                            if ("relative" === Ye(l.body, "position")) {
                                var d = l.body.getBoundingClientRect(), h = l.documentElement.getBoundingClientRect();
                                u = d.left - h.left || 0, c = d.top - h.top || 0
                            }
                            t.left = n.left + o - i - u, t.top = n.top + r - s - c, t.width = "width" in n ? n.width : n.right - n.left, t.height = "height" in n ? n.height : n.bottom - n.top
                        }
                        return t
                    }, Ge = function (e) {
                        if (!e) return !1;
                        var t = p(e, null);
                        if (!t) return !1;
                        var n = y(t.height) > 0, o = y(t.width) > 0, r = y(t.top) >= 0, i = y(t.left) >= 0,
                            s = n && o && r && i, a = s ? null : Ue(e),
                            l = "none" !== t.display && "collapse" !== t.visibility && (s || !!a && (n || a.height > 0) && (o || a.width > 0) && (r || a.top >= 0) && (i || a.left >= 0));
                        return l
                    }, $e = function () {
                        d($), $ = 0, f(K), K = 0
                    }, Ke = function () {
                        var e;
                        if (i && (e = De(F.bridge))) {
                            var t = Ue(i);
                            O(e.style, {
                                width: t.width + "px",
                                height: t.height + "px",
                                top: t.top + "px",
                                left: t.left + "px",
                                zIndex: "" + qe(ee.zIndex)
                            })
                        }
                    }, Xe = function (e) {
                        F.ready === !0 && (F.bridge && "function" == typeof F.bridge.setHandCursor ? F.bridge.setHandCursor(e) : F.ready = !1)
                    }, qe = function (e) {
                        if (/^(?:auto|inherit)$/.test(e)) return e;
                        var t;
                        return "number" != typeof e || b(e) ? "string" == typeof e && (t = qe(v(e, 10))) : t = e, "number" == typeof t ? t : "auto"
                    }, Ze = function (e) {
                        var t = /(\r\n|\r|\n)/g;
                        return "string" == typeof e && ee.fixLineEndings === !0 && (j() ? /((^|[^\r])\n|\r([^\n]|$))/.test(e) && (e = e.replace(t, "\r\n")) : /\r/.test(e) && (e = e.replace(t, "\n"))), e
                    }, Je = function (e) {
                        var n, o, r, i = F.sandboxed, s = null;
                        if (e = e === !0, V === !1) s = !1; else {
                            try {
                                o = t.frameElement || null
                            } catch (e) {
                                r = {name: e.name, message: e.message}
                            }
                            if (o && 1 === o.nodeType && "IFRAME" === o.nodeName) try {
                                s = o.hasAttribute("sandbox")
                            } catch (e) {
                                s = null
                            } else {
                                try {
                                    n = document.domain || null
                                } catch (e) {
                                    n = null
                                }
                                (null === n || r && "SecurityError" === r.name && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(r.message.toLowerCase())) && (s = !0)
                            }
                        }
                        return F.sandboxed = s, i === s || e || Qe(g), s
                    }, Qe = function (e) {
                        function t(e) {
                            var t = e.match(/[\d]+/g);
                            return t.length = 3, t.join(".")
                        }

                        function n(e) {
                            return !!e && (e = e.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e) || "chrome.plugin" === e.slice(-13))
                        }

                        function o(e) {
                            e && (a = !0, e.version && (d = t(e.version)), !d && e.description && (d = t(e.description)), e.filename && (c = n(e.filename)))
                        }

                        var r, i, s, a = !1, l = !1, c = !1, d = "";
                        if (u.plugins && u.plugins.length) r = u.plugins["Shockwave Flash"], o(r), u.plugins["Shockwave Flash 2.0"] && (a = !0, d = "2.0.0.11"); else if (u.mimeTypes && u.mimeTypes.length) s = u.mimeTypes["application/x-shockwave-flash"], r = s && s.enabledPlugin, o(r); else if ("undefined" != typeof e) {
                            l = !0;
                            try {
                                i = new e("ShockwaveFlash.ShockwaveFlash.7"), a = !0, d = t(i.GetVariable("$version"))
                            } catch (n) {
                                try {
                                    i = new e("ShockwaveFlash.ShockwaveFlash.6"), a = !0, d = "6.0.21"
                                } catch (n) {
                                    try {
                                        i = new e("ShockwaveFlash.ShockwaveFlash"), a = !0, d = t(i.GetVariable("$version"))
                                    } catch (e) {
                                        l = !1
                                    }
                                }
                            }
                        }
                        F.disabled = a !== !0, F.outdated = d && y(d) < y(z), F.version = d || "0.0.0", F.pluginType = c ? "pepper" : l ? "activex" : a ? "netscape" : "unknown"
                    };
                Qe(g), Je(!0);
                var et = function () {
                    return this instanceof et ? void ("function" == typeof et._createClient && et._createClient.apply(this, E(arguments))) : new et
                };
                et.version = "2.3.0", et.config = function () {
                    return te.apply(this, E(arguments))
                }, et.state = function () {
                    return ne.apply(this, E(arguments))
                }, et.isFlashUnusable = function () {
                    return re.apply(this, E(arguments))
                }, et.on = function () {
                    return ie.apply(this, E(arguments))
                }, et.off = function () {
                    return se.apply(this, E(arguments))
                }, et.handlers = function () {
                    return ae.apply(this, E(arguments))
                }, et.emit = function () {
                    return le.apply(this, E(arguments))
                }, et.create = function () {
                    return ce.apply(this, E(arguments))
                }, et.destroy = function () {
                    return de.apply(this, E(arguments))
                }, et.setData = function () {
                    return he.apply(this, E(arguments))
                }, et.clearData = function () {
                    return fe.apply(this, E(arguments))
                }, et.getData = function () {
                    return pe.apply(this, E(arguments))
                }, et.focus = et.activate = function () {
                    return me.apply(this, E(arguments))
                }, et.blur = et.deactivate = function () {
                    return ge.apply(this, E(arguments))
                }, et.activeElement = function () {
                    return we.apply(this, E(arguments))
                };
                var tt = 0, nt = {}, ot = 0, rt = {}, it = {};
                O(ee, {autoActivate: !0});
                var st = function (e) {
                    var t, n = this;
                    n.id = "" + tt++, t = {
                        instance: n, elements: [], handlers: {}, coreWildcardHandler: function (e) {
                            return n.emit(e)
                        }
                    }, nt[n.id] = t, e && n.clip(e), et.on("*", t.coreWildcardHandler), et.on("destroy", function () {
                        n.destroy()
                    }), et.create()
                }, at = function (e, t) {
                    var n, i, s, a = {}, l = this, u = nt[l.id], c = u && u.handlers;
                    if (!u) throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
                    if ("string" == typeof e && e ? s = e.toLowerCase().split(/\s+/) : "object" != typeof e || !e || "length" in e || "undefined" != typeof t || _(e).forEach(function (t) {
                        var n = e[t];
                        "function" == typeof n && l.on(t, n)
                    }), s && s.length && t) {
                        for (n = 0, i = s.length; n < i; n++) e = s[n].replace(/^on/, ""), a[e] = !0, c[e] || (c[e] = []), c[e].push(t);
                        if (a.ready && F.ready && this.emit({type: "ready", client: this}), a.error) {
                            for (n = 0, i = Z.length; n < i; n++) if (F[Z[n].replace(/^flash-/, "")]) {
                                this.emit({type: "error", name: Z[n], client: this});
                                break
                            }
                            r !== o && et.version !== r && this.emit({
                                type: "error",
                                name: "version-mismatch",
                                jsVersion: et.version,
                                swfVersion: r
                            })
                        }
                    }
                    return l
                }, lt = function (e, t) {
                    var n, o, r, i, s, a = this, l = nt[a.id], u = l && l.handlers;
                    if (!u) return a;
                    if (0 === arguments.length ? i = _(u) : "string" == typeof e && e ? i = e.split(/\s+/) : "object" != typeof e || !e || "length" in e || "undefined" != typeof t || _(e).forEach(function (t) {
                        var n = e[t];
                        "function" == typeof n && a.off(t, n)
                    }), i && i.length) for (n = 0, o = i.length; n < o; n++) if (e = i[n].toLowerCase().replace(/^on/, ""), s = u[e], s && s.length) if (t) for (r = s.indexOf(t); r !== -1;) s.splice(r, 1), r = s.indexOf(t, r); else s.length = 0;
                    return a
                }, ut = function (e) {
                    var t = null, n = nt[this.id] && nt[this.id].handlers;
                    return n && (t = "string" == typeof e && e ? n[e] ? n[e].slice(0) : [] : T(n)), t
                }, ct = function (e) {
                    var t, n = this;
                    return mt.call(n, e) && ("object" == typeof e && e && "string" == typeof e.type && e.type && (e = O({}, e)), t = O({}, ye(e), {client: n}), gt.call(n, t)), n
                }, dt = function (e) {
                    if (!nt[this.id]) throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
                    e = wt(e);
                    for (var t = 0; t < e.length; t++) if (R.call(e, t) && e[t] && 1 === e[t].nodeType) {
                        e[t].zcClippingId ? rt[e[t].zcClippingId].indexOf(this.id) === -1 && rt[e[t].zcClippingId].push(this.id) : (e[t].zcClippingId = "zcClippingId_" + ot++, rt[e[t].zcClippingId] = [this.id], ee.autoActivate === !0 && vt(e[t]));
                        var n = nt[this.id] && nt[this.id].elements;
                        n.indexOf(e[t]) === -1 && n.push(e[t])
                    }
                    return this
                }, ht = function (e) {
                    var t = nt[this.id];
                    if (!t) return this;
                    var n, o = t.elements;
                    e = "undefined" == typeof e ? o.slice(0) : wt(e);
                    for (var r = e.length; r--;) if (R.call(e, r) && e[r] && 1 === e[r].nodeType) {
                        for (n = 0; (n = o.indexOf(e[r], n)) !== -1;) o.splice(n, 1);
                        var i = rt[e[r].zcClippingId];
                        if (i) {
                            for (n = 0; (n = i.indexOf(this.id, n)) !== -1;) i.splice(n, 1);
                            0 === i.length && (ee.autoActivate === !0 && yt(e[r]), delete e[r].zcClippingId)
                        }
                    }
                    return this
                }, ft = function () {
                    var e = nt[this.id];
                    return e && e.elements ? e.elements.slice(0) : []
                }, pt = function () {
                    var e = nt[this.id];
                    e && (this.unclip(), this.off(), et.off("*", e.coreWildcardHandler), delete nt[this.id])
                }, mt = function (e) {
                    if (!e || !e.type) return !1;
                    if (e.client && e.client !== this) return !1;
                    var t = nt[this.id], n = t && t.elements, o = !!n && n.length > 0,
                        r = !e.target || o && n.indexOf(e.target) !== -1,
                        i = e.relatedTarget && o && n.indexOf(e.relatedTarget) !== -1,
                        s = e.client && e.client === this;
                    return !(!t || !(r || i || s))
                }, gt = function (e) {
                    var t = nt[this.id];
                    if ("object" == typeof e && e && e.type && t) {
                        var n = _e(e), o = t && t.handlers["*"] || [], r = t && t.handlers[e.type] || [],
                            i = o.concat(r);
                        if (i && i.length) {
                            var s, l, u, c, d, h = this;
                            for (s = 0, l = i.length; s < l; s++) u = i[s], c = h, "string" == typeof u && "function" == typeof a[u] && (u = a[u]), "object" == typeof u && u && "function" == typeof u.handleEvent && (c = u, u = u.handleEvent), "function" == typeof u && (d = O({}, e), Re(u, c, [d], n))
                        }
                    }
                }, wt = function (e) {
                    return "string" == typeof e && (e = []), "number" != typeof e.length ? [e] : e
                }, vt = function (e) {
                    if (e && 1 === e.nodeType) {
                        var t = function (e) {
                            (e || (e = a.event)) && ("js" !== e._source && (e.stopImmediatePropagation(), e.preventDefault()), delete e._source)
                        }, n = function (n) {
                            (n || (n = a.event)) && (t(n), et.focus(e))
                        };
                        e.addEventListener("mouseover", n, !1), e.addEventListener("mouseout", t, !1), e.addEventListener("mouseenter", t, !1), e.addEventListener("mouseleave", t, !1), e.addEventListener("mousemove", t, !1), it[e.zcClippingId] = {
                            mouseover: n,
                            mouseout: t,
                            mouseenter: t,
                            mouseleave: t,
                            mousemove: t
                        }
                    }
                }, yt = function (e) {
                    if (e && 1 === e.nodeType) {
                        var t = it[e.zcClippingId];
                        if ("object" == typeof t && t) {
                            for (var n, o, r = ["move", "leave", "enter", "out", "over"], i = 0, s = r.length; i < s; i++) n = "mouse" + r[i], o = t[n], "function" == typeof o && e.removeEventListener(n, o, !1);
                            delete it[e.zcClippingId]
                        }
                    }
                };
                et._createClient = function () {
                    st.apply(this, E(arguments))
                }, et.prototype.on = function () {
                    return at.apply(this, E(arguments))
                }, et.prototype.off = function () {
                    return lt.apply(this, E(arguments))
                }, et.prototype.handlers = function () {
                    return ut.apply(this, E(arguments))
                }, et.prototype.emit = function () {
                    return ct.apply(this, E(arguments))
                }, et.prototype.clip = function () {
                    return dt.apply(this, E(arguments))
                }, et.prototype.unclip = function () {
                    return ht.apply(this, E(arguments))
                }, et.prototype.elements = function () {
                    return ft.apply(this, E(arguments))
                }, et.prototype.destroy = function () {
                    return pt.apply(this, E(arguments))
                }, et.prototype.setText = function (e) {
                    if (!nt[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.setData("text/plain", e), this
                }, et.prototype.setHtml = function (e) {
                    if (!nt[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.setData("text/html", e), this
                }, et.prototype.setRichText = function (e) {
                    if (!nt[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.setData("application/rtf", e), this
                }, et.prototype.setData = function () {
                    if (!nt[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.setData.apply(this, E(arguments)), this
                }, et.prototype.clearData = function () {
                    if (!nt[this.id]) throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.clearData.apply(this, E(arguments)), this
                }, et.prototype.getData = function () {
                    if (!nt[this.id]) throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
                    return et.getData.apply(this, E(arguments))
                }, "function" == typeof e && e.amd ? e(function () {
                    return et
                }) : "object" == typeof n && n && "object" == typeof n.exports && n.exports ? n.exports = et : t.ZeroClipboard = et
            }(function () {
                return this || window
            }())
        }, {}]
    }, {}, [24, 63, 65, 66, 64, 67, 110, 111, 112, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109, 113, 114, 115, 116, 133, 134, 135, 136, 119, 120, 121, 122, 123, 124, 32, 36, 33, 34, 41, 35, 37, 38, 39, 40])(24)
});