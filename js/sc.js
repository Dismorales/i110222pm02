!(function () {
    "use strict";
    var e,
        t = {},
        i = 0,
        n = !1,
        a = null,
        s = null,
        r = function () {
            return window.location.href.split("#");
        };
    window.Hash =
        ((e = {
            pushState: function (e) {
                return window.history && window.history.pushState && (n = e), this;
            },
            fragment: function () {
                var e = r();
                return n ? window.location.pathname + (e[1] ? "#" + e[1] : "") : e[1] || "";
            },
            get: function (e, t) {
                var i,
                    a = [];
                for (i in t) Object.prototype.hasOwnProperty(i) && a.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
                return a.length > 0 && (a = "?" + a.join("&")), n ? e + a : r()[0] + "#" + e + a;
            },
            go: function (e, t) {
                if (this.fragment() != e) {
                    var i = this.get(e, t);
                    n ? window.history.pushState(null, document.title, i) : (window.location.href = i);
                }
                return this;
            },
            update: function () {
                return (s = window.location.href), this;
            },
            on: function (e, n, r) {
                return (
                    t[e] || (t[e] = { title: r, listeners: [] }),
                    t[e].listeners.push(n),
                    i++,
                    a ||
                        (a = setInterval(function () {
                            i > 0 && s != window.location.href && ((s = window.location.href), window.Hash.check());
                        }, 100)),
                    this
                );
            },
            check: function () {
                var e,
                    i,
                    n,
                    a = this.fragment();
                for (i in t)
                    if (Object.prototype.hasOwnProperty.call(t, i))
                        if (((t[i].regexp = t[i].regexp || new RegExp(i)), (n = t[i].regexp.exec(a))))
                            for (t[i].title && (document.title = t[i].title), e = 0; e < t[i].listeners.length; e++) t[i].listeners[e].yep && t[i].listeners[e].yep(a, n);
                        else for (e = 0; e < t[i].listeners.length; e++) t[i].listeners[e].nop && t[i].listeners[e].nop(a);
                return this;
            },
        }),
        Object.freeze ? Object.freeze(e) : e);
})(),
    (function (e) {
        "use strict";
        var t,
            i = { max: 2, flipbook: null, easeFunction: "ease-in-out", duration: 500, when: {} },
            n = {
                init: function (a) {
                    var r = this,
                        o = this.data(),
                        c = e.extend({}, i, a);
                    if (!c.flipbook || !c.flipbook.turn("is")) throw s("options.flipbook is required");
                    if (((t = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style), "function" != typeof c.max)) {
                        var p = c.max;
                        c.max = function () {
                            return p;
                        };
                    }
                    for (var u in ((o.zoom = {
                        opts: c,
                        axis: l(0, 0),
                        scrollPos: l(0, 0),
                        eventQueue: [],
                        mouseupEvent: function () {
                            return n._eMouseUp.apply(r, arguments);
                        },
                        eventTouchStart: d(n._eTouchStart, r),
                        eventTouchMove: d(n._eTouchMove, r),
                        eventTouchEnd: d(n._eTouchEnd, r),
                        flipbookEvents: { zooming: d(n._eZoom, r), pressed: d(n._ePressed, r), released: d(n._eReleased, r), start: d(n._eStart, r), turning: d(n._eTurning, r), turned: d(n._eTurned, r), destroying: d(n._eDestroying, r) },
                    }),
                    c.when))
                        Object.prototype.hasOwnProperty.call(c.when, u) && this.bind("zoom." + u, c.when[u]);
                    for (u in o.zoom.flipbookEvents) Object.prototype.hasOwnProperty.call(o.zoom.flipbookEvents, u) && c.flipbook.bind(u, o.zoom.flipbookEvents[u]);
                    this.css({ position: "relative", overflow: "hidden" }),
                        e.isTouch
                            ? (c.flipbook.bind("touchstart", o.zoom.eventTouchStart).bind("touchmove", o.zoom.eventTouchMove).bind("touchend", o.zoom.eventTouchEnd), this.bind("touchstart", n._tap))
                            : this.mousedown(n._mousedown).click(n._tap);
                },
                _tap: function (t) {
                    var i = e(this),
                        s = i.data().zoom;
                    s.opts.flipbook;
                    if (!s.draggingCorner && !s.dragging && a(e(t.target), i)) {
                        n._addEvent.call(i, "tap", t);
                        var r = n._eventSeq.call(i);
                        r && i.trigger(r);
                    }
                },
                _addEvent: function (e, t) {
                    var i = this.data().zoom,
                        n = { name: e, timestamp: new Date().getTime(), event: t };
                    i.eventQueue.push(n), i.eventQueue.length > 10 && i.eventQueue.splice(0, 1);
                },
                _eventSeq: function () {
                    var t = this.data().zoom.eventQueue,
                        i = t.length - 1;
                    return i > 0 &&
                        "tap" == t[i].name &&
                        "tap" == t[i - 1].name &&
                        t[i].event.pageX == t[i - 1].event.pageX &&
                        t[i].event.pageY == t[i - 1].event.pageY &&
                        t[i].timestamp - t[i - 1].timestamp < 200 &&
                        t[i].timestamp - t[i - 1].timestamp > 50
                        ? e.extend(t[i].event, { type: "zoom.doubleTap" })
                        : "tap" == t[i].name
                        ? e.extend(t[i].event, { type: "zoom.tap" })
                        : void 0;
                },
                _prepareZoom: function () {
                    var t,
                        i = 0,
                        n = this.data().zoom,
                        a = 1 / this.zoom("value"),
                        s = n.opts.flipbook,
                        r = s.turn("direction"),
                        o = s.data(),
                        d = s.offset(),
                        c = this.offset(),
                        p = { height: s.height() },
                        u = s.turn("view");
                    "double" == s.turn("display") && s.data().opts.autoCenter
                        ? u[0]
                            ? u[1]
                                ? ((p.width = s.width()), (t = l(d.left - c.left, d.top - c.top)))
                                : ((p.width = s.width() / 2), (i = "ltr" == r ? 0 : p.width), (t = l("ltr" == r ? d.left - c.left : d.left - c.left + p.width, d.top - c.top)))
                            : ((p.width = s.width() / 2), (i = "ltr" == r ? p.width : 0), (t = l("ltr" == r ? d.left - c.left + p.width : d.left - c.left, d.top - c.top)))
                        : ((p.width = s.width()), (t = l(d.left - c.left, d.top - c.top))),
                        n.zoomer ||
                            (n.zoomer = e("<div />", { class: "zoomer", css: { overflow: "hidden", position: "absolute", zIndex: "1000000" } })
                                .mousedown(function () {
                                    return !1;
                                })
                                .appendTo(this)),
                        n.zoomer.css({ top: t.y, left: t.x, width: p.width, height: p.height });
                    var h = u.join(",");
                    if (h != n.zoomerView) {
                        (n.zoomerView = h), n.zoomer.find("*").remove();
                        for (var f = 0; f < u.length; f++)
                            if (u[f]) {
                                var m = o.pageObjs[u[f]].offset(),
                                    g = e(o.pageObjs[u[f]]);
                                g.clone()
                                    .transform("")
                                    .css({ width: g.width() * a, height: g.height() * a, position: "absolute", display: "", top: (m.top - d.top) * a, left: (m.left - d.left - i) * a })
                                    .appendTo(n.zoomer);
                            }
                    }
                    return { pos: t, size: p };
                },
                value: function () {
                    return this.data().zoom.opts.flipbook.turn("zoom");
                },
                zoomIn: function (t) {
                    var i,
                        a = this,
                        s = this.data().zoom,
                        d = s.opts.flipbook,
                        c = s.opts.max(),
                        p = (d.offset(), this.offset());
                    if (s.zoomIn) return this;
                    d.turn("stop");
                    var u = e.Event("zoom.change");
                    if ((this.trigger(u, [c]), u.isDefaultPrevented())) return this;
                    var h = n._prepareZoom.call(this),
                        f = h.pos,
                        m = l(h.size.width / 2, h.size.height / 2),
                        g = e.cssPrefix(),
                        v = e.cssTransitionEnd(),
                        w = d.data().opts.autoCenter;
                    (s.scale = c),
                        (d.data().noCenter = !0),
                        ((i =
                            void 0 !== t
                                ? "x" in t && "y" in t
                                    ? l(t.x - f.x, t.y - f.y)
                                    : e.isTouch
                                    ? l(t.originalEvent.touches[0].pageX - f.x - p.left, t.originalEvent.touches[0].pageY - f.y - p.top)
                                    : l(t.pageX - f.x - p.left, t.pageY - f.y - p.top)
                                : l(m.x, m.y)).x < 0 ||
                            i.y < 0 ||
                            i.x > h.width ||
                            i.y > h.height) &&
                            ((i.x = m.x), (i.y = m.y));
                    var y = l((i.x - m.x) * c + m.x, (i.y - m.y) * c + m.y),
                        b = l(h.size.width * c > this.width() ? i.x - y.x : 0, h.size.height * c > this.height() ? i.y - y.y : 0),
                        _ = l(Math.abs(h.size.width * c - this.width()), Math.abs(h.size.height * c - this.height())),
                        x = l(Math.min(0, h.size.width * c - this.width()), Math.min(0, h.size.height * c - this.height())),
                        T = l(m.x * c - m.x - f.x - b.x, m.y * c - m.y - f.y - b.y);
                    T.y > _.y ? (b.y = T.y - _.y + b.y) : T.y < x.y && (b.y = T.y - x.y + b.y), T.x > _.x ? (b.x = T.x - _.x + b.x) : T.x < x.x && (b.x = T.x - x.x + b.x), (T = l(m.x * c - m.x - f.x - b.x, m.y * c - m.y - f.y - b.y));
                    var E = {};
                    E[g + "transition"] = g + "transform " + s.opts.easeFunction + " " + s.opts.duration + "ms";
                    var S = function () {
                        a.trigger("zoom.zoomIn"), (s.zoomIn = !0), (s.flipPosition = l(d.css("left"), d.css("top"))), d.turn("zoom", c).css({ position: "absolute", margin: "", top: 0, left: 0 });
                        var t = d.offset();
                        (s.axis = l(t.left - p.left, t.top - p.top)),
                            w && "double" == d.turn("display") && (("ltr" == d.turn("direction") && !d.turn("view")[0]) || ("rtl" == d.turn("direction") && !d.turn("view")[1])) && (s.axis.x = s.axis.x + d.width() / 2),
                            a.zoom("scroll", T),
                            a.bind(e.mouseEvents.down, n._eMouseDown),
                            a.bind(e.mouseEvents.move, n._eMouseMove),
                            e(document).bind(e.mouseEvents.up, s.mouseupEvent),
                            a.bind("mousewheel", n._eMouseWheel),
                            setTimeout(function () {
                                s.zoomer.hide(), s.zoomer.remove(), (s.zoomer = null), (s.zoomerView = null);
                            }, 50);
                    };
                    return (
                        s.zoomer.css(E).show(),
                        v
                            ? s.zoomer.bind(v, function () {
                                  e(this).unbind(v), S();
                              })
                            : setTimeout(S, s.opts.duration),
                        s.zoomer.transform(r(b.x, b.y, !0) + o(c, !0)),
                        this
                    );
                },
                zoomOut: function (t) {
                    var i,
                        a = this,
                        s = this.data().zoom,
                        d = s.opts.flipbook,
                        c = 1 / s.scale,
                        p = e.cssPrefix(),
                        u = e.cssTransitionEnd(),
                        h = this.offset();
                    if (((t = void 0 !== t ? t : s.opts.duration), s.zoomIn)) {
                        var f = e.Event("zoom.change");
                        if ((this.trigger(f, [1]), f.isDefaultPrevented())) return this;
                        (s.zoomIn = !1),
                            (s.scale = 1),
                            (d.data().noCenter = !1),
                            a.unbind(e.mouseEvents.down, n._eMouseDown),
                            a.unbind(e.mouseEvents.move, n._eMouseMove),
                            e(document).unbind(e.mouseEvents.up, s.mouseupEvent),
                            a.unbind("mousewheel", n._eMouseWheel);
                        var m = {};
                        (m[p + "transition"] = p + "transform " + s.opts.easeFunction + " " + t + "ms"), d.css(m);
                        var g,
                            v = e("<div />", { css: { position: "relative", top: s.flipPosition.y, left: s.flipPosition.x, width: d.width() * c, height: d.height() * c, background: "blue" } }).appendTo(d.parent());
                        (g = l(v.offset().left - h.left, v.offset().top - h.top)), v.remove();
                        var w = d.data().opts.autoCenter;
                        w &&
                            "double" == d.turn("display") &&
                            (d.turn("view")[0] ? d.turn("view")[1] || (g.x = "ltr" == d.turn("direction") ? g.x + v.width() / 4 : g.x - v.width() / 4) : (g.x = "ltr" == d.turn("direction") ? g.x - v.width() / 4 : g.x + v.width() / 4));
                        var y = e.findPos(d[0]);
                        i = l(-d.width() / 2 - y.left + v.width() / 2 + g.x + h.left, -d.height() / 2 - y.top + v.height() / 2 + g.y + h.top);
                        var b = function () {
                            d[0].style.removeProperty
                                ? (d[0].style.removeProperty(p + "transition"),
                                  d.transform(d.turn("options").acceleration ? r(0, 0, !0) : "").turn("zoom", 1),
                                  d[0].style.removeProperty("margin"),
                                  d.css({ position: "relative", top: s.flipPosition.y, left: s.flipPosition.x }))
                                : d.transform("none").turn("zoom", 1).css({ margin: "", top: s.flipPosition.y, left: s.flipPosition.x, position: "relative" }),
                                w && d.turn("center"),
                                a.trigger("zoom.zoomOut");
                        };
                        return (
                            0 === t
                                ? b()
                                : u
                                ? (d.bind(u, function () {
                                      e(this).unbind(u), b();
                                  }),
                                  d.transform(r(i.x, i.y, !0) + o(c, !0)))
                                : (setTimeout(b, t), d.transform(r(i.x, i.y, !0) + o(c, !0))),
                            this
                        );
                    }
                },
                flipbookWidth: function () {
                    var e = this.data().zoom.opts.flipbook,
                        t = e.turn("view");
                    return "double" != e.turn("display") || (t[0] && t[1]) ? e.width() : e.width() / 2;
                },
                scroll: function (i, n, a) {
                    var s = this.data().zoom,
                        o = s.opts.flipbook,
                        d = (this.zoom("flipbookWidth"), e.cssPrefix());
                    if (t) {
                        var c = {};
                        (c[d + "transition"] = a ? d + "transform 200ms" : "none"), o.css(c), o.transform(r(-s.axis.x - i.x, -s.axis.y - i.y, !0));
                    } else o.css({ top: -s.axis.y - i.y, left: -s.axis.x - i.x });
                    s.scrollPos = l(i.x, i.y);
                },
                resize: function () {
                    var e = this.data().zoom,
                        t = e.opts.flipbook;
                    if (this.zoom("value") > 1) {
                        var i = t.offset(),
                            n = this.offset();
                        (e.axis = l(i.left - n.left + (e.axis.x + e.scrollPos.x), i.top - n.top + (e.axis.y + e.scrollPos.y))),
                            "double" != t.turn("display") || "ltr" != t.turn("direction") || t.turn("view")[0] || (e.axis.x = e.axis.x + t.width() / 2),
                            this.zoom("scroll", e.scrollPos);
                    }
                },
                _eZoom: function () {
                    for (var e = this.data().zoom, t = e.opts.flipbook, i = t.turn("view"), n = 0; n < i.length; n++) i[n] && this.trigger("zoom.resize", [e.scale, i[n], t.data().pageObjs[i[n]]]);
                },
                _eStart: function (e, t) {
                    1 != this.zoom("value") && e.preventDefault();
                },
                _eTurning: function (e, t, i) {
                    var n = this,
                        a = this.zoom("value"),
                        s = this.data().zoom,
                        r = s.opts.flipbook;
                    if (((s.page = r.turn("page")), 1 != a)) {
                        for (var o = 0; o < i.length; o++) i[o] && this.trigger("zoom.resize", [a, i[o], r.data().pageObjs[i[o]]]);
                        setTimeout(function () {
                            n.zoom("resize");
                        }, 0);
                    }
                },
                _eTurned: function (e, t) {
                    if (1 != this.zoom("value")) {
                        var i = this.data().zoom,
                            n = i.opts.flipbook;
                        t > i.page ? this.zoom("scroll", l(0, i.scrollPos.y), !1, !0) : t < i.page && this.zoom("scroll", l(n.width(), i.scrollPos.y), !1, !0);
                    }
                },
                _ePressed: function () {
                    e(this).data().zoom.draggingCorner = !0;
                },
                _eReleased: function () {
                    var t = e(this).data().zoom;
                    setTimeout(function () {
                        t.draggingCorner = !1;
                    }, 1);
                },
                _eMouseDown: function (t) {
                    return (e(this).data().zoom.draggingCur = e.isTouch ? l(t.originalEvent.touches[0].pageX, t.originalEvent.touches[0].pageY) : l(t.pageX, t.pageY)), !1;
                },
                _eMouseMove: function (t) {
                    var i = e(this).data().zoom;
                    if (i.draggingCur) {
                        i.dragging = !0;
                        var n = e.isTouch ? l(t.originalEvent.touches[0].pageX, t.originalEvent.touches[0].pageY) : l(t.pageX, t.pageY),
                            a = l(n.x - i.draggingCur.x, n.y - i.draggingCur.y);
                        return e(this).zoom("scroll", l(i.scrollPos.x - a.x, i.scrollPos.y - a.y), !0), (i.draggingCur = n), !1;
                    }
                },
                _eMouseUp: function (t) {
                    var i = e(this).data().zoom;
                    i.dragging && e(this).zoom("scroll", i.scrollPos),
                        (i.draggingCur = null),
                        setTimeout(function () {
                            i.dragging = !1;
                        }, 1);
                },
                _eMouseWheel: function (e, t, i, n) {},
                _eTouchStart: function (t, i) {
                    var n = e(this).data().zoom,
                        a = (n.opts.flipbook, l(t.originalEvent.touches[0].pageX, t.originalEvent.touches[0].pageY));
                    (n.touch = {}), (n.touch.initial = a), (n.touch.last = a), (n.touch.timestamp = new Date().getTime()), (n.touch.speed = l(0, 0));
                },
                _eTouchMove: function (t) {
                    var i = e(this).data().zoom,
                        n = e(this).zoom("value"),
                        a = i.opts.flipbook,
                        s = new Date().getTime(),
                        r = l(t.originalEvent.touches[0].pageX, t.originalEvent.touches[0].pageY);
                    i.touch &&
                        1 == n &&
                        !a.data().mouseAction &&
                        ((i.touch.motion = l(r.x - i.touch.last.x, r.y - i.touch.last.y)),
                        (i.touch.speed.x = 0 === i.touch.speed.x ? i.touch.motion.x / (s - i.touch.timestamp) : (i.touch.speed.x + i.touch.motion.x / (s - i.touch.timestamp)) / 2),
                        (i.touch.last = r),
                        (i.touch.timestamp = s));
                },
                _eTouchEnd: function (t) {
                    var i = e(this).data().zoom;
                    if (i.touch && 1 == e(this).zoom("value")) {
                        var n = Math.abs(i.touch.initial.y - i.touch.last.y);
                        n < 50 && (i.touch.speed.x < -1 || i.touch.last.x - i.touch.initial.x < -100)
                            ? this.trigger("zoom.swipeLeft")
                            : n < 50 && (i.touch.speed.x > 1 || i.touch.last.x - i.touch.initial.x > 100) && this.trigger("zoom.swipeRight");
                    }
                },
                _eDestroying: function () {
                    var t = this,
                        i = this.data().zoom,
                        a = i.opts.flipbook;
                    for (var s in (this.zoom("zoomOut", 0),
                    e.each(["tap", "doubleTap", "resize", "zoomIn", "zoomOut", "swipeLeft", "swipeRight"], function (e, i) {
                        t.unbind("zoom." + i);
                    }),
                    i.flipbookEvents))
                        Object.prototype.hasOwnProperty.call(i.flipbookEvents, s) && a.unbind(s, i.flipbookEvents[s]);
                    a.unbind("touchstart", i.eventTouchStart).unbind("touchmove", i.eventTouchMove).unbind("touchend", i.eventTouchEnd), this.unbind("touchstart", n._tap).unbind("click", n._tap), (i = null), (this.data().zoom = null);
                },
            };
        function a(e, t) {
            return e[0] != t[0] && (!!e.attr("page") || (!!e.parent()[0] && a(e.parent(), t)));
        }
        function s(e) {
            function t(e) {
                (this.name = "TurnJsError"), (this.message = e);
            }
            return (t.prototype = new Error()), (t.prototype.constructor = t), new t(e);
        }
        function r(e, i, n) {
            return t && n ? " translate3d(" + e + "px," + i + "px, 0px) " : " translate(" + e + "px, " + i + "px) ";
        }
        function o(e, i) {
            return t && i ? " scale3d(" + e + ", " + e + ", 1) " : " scale(" + e + ") ";
        }
        function l(e, t) {
            return { x: e, y: t };
        }
        function d(e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        }
        e.extend(e.fn, {
            zoom: function () {
                var t = arguments;
                if (t[0] && "object" != typeof t[0]) {
                    if (n[t[0]]) return n[t[0]].apply(e(this[0]), Array.prototype.slice.call(t, 1));
                    throw s(t[0] + " is not a method");
                }
                return n.init.apply(e(this[0]), t);
            },
        });
    })(jQuery),
    (function (e) {
        "use strict";
        var t,
            i,
            n = "",
            a = Math.PI,
            s = a / 2,
            r = "ontouchstart" in window,
            o = r ? { down: "touchstart", move: "touchmove", up: "touchend", over: "touchstart", out: "touchend" } : { down: "mousedown", move: "mousemove", up: "mouseup", over: "mouseover", out: "mouseout" },
            l = { backward: ["bl", "tl"], forward: ["br", "tr"], all: ["tl", "bl", "tr", "br", "l", "r"] },
            d = ["single", "double"],
            c = ["ltr", "rtl"],
            p = { acceleration: !0, display: "double", duration: 600, page: 1, gradients: !0, turnCorners: "bl,br", when: null },
            u = { cornerSize: 60 },
            h = {
                init: function (a) {
                    var s;
                    (t = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style), (i = !(s = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) || parseFloat(s[1]) > 534.3), (n = x());
                    var l,
                        d = 0,
                        c = this.data(),
                        u = this.children();
                    if (
                        ((a = e.extend({ width: this.width(), height: this.height(), direction: this.attr("dir") || this.css("direction") || "ltr" }, p, a)),
                        (c.opts = a),
                        (c.pageObjs = {}),
                        (c.pages = {}),
                        (c.pageWrap = {}),
                        (c.pageZoom = {}),
                        (c.pagePlace = {}),
                        (c.pageMv = []),
                        (c.zoom = 1),
                        (c.totalPages = a.pages || 0),
                        (c.eventHandlers = { touchStart: e.proxy(h._touchStart, this), touchMove: e.proxy(h._touchMove, this), touchEnd: e.proxy(h._touchEnd, this), start: e.proxy(h._eventStart, this) }),
                        a.when)
                    )
                        for (l in a.when) _(l, a.when) && this.bind(l, a.when[l]);
                    for (
                        this.css({ position: "relative", width: a.width, height: a.height }),
                            this.turn("display", a.display),
                            "" !== a.direction && this.turn("direction", a.direction),
                            t && !r && a.acceleration && this.transform(y(0, 0, !0)),
                            l = 0;
                        l < u.length;
                        l++
                    )
                        "1" != e(u[l]).attr("ignore") && this.turn("addPage", u[l], ++d);
                    return (
                        e(this).bind(o.down, c.eventHandlers.touchStart).bind("end", h._eventEnd).bind("pressed", h._eventPressed).bind("released", h._eventReleased).bind("flip", h._flip),
                        e(this).parent().bind("start", c.eventHandlers.start),
                        e(document).bind(o.move, c.eventHandlers.touchMove).bind(o.up, c.eventHandlers.touchEnd),
                        this.turn("page", a.page),
                        (c.done = !0),
                        this
                    );
                },
                addPage: function (t, i) {
                    var n,
                        a,
                        s = !1,
                        r = this.data(),
                        o = r.totalPages + 1;
                    if (r.destroying) return !1;
                    if (((n = /\bp([0-9]+)\b/.exec(e(t).attr("class"))) && (i = parseInt(n[1], 10)), i)) {
                        if (i == o) s = !0;
                        else if (i > o) throw S('Page "' + i + '" cannot be inserted');
                    } else (i = o), (s = !0);
                    return (
                        i >= 1 &&
                            i <= o &&
                            ((a = "double" == r.display ? (i % 2 ? " odd" : " even") : ""),
                            r.done && this.turn("stop"),
                            i in r.pageObjs && h._movePages.call(this, i, 1),
                            s && (r.totalPages = o),
                            (r.pageObjs[i] = e(t)
                                .css({ float: "left" })
                                .addClass("page p" + i + a)),
                            -1 != navigator.userAgent.indexOf("MSIE 9.0") && r.pageObjs[i].hasClass("hard") && r.pageObjs[i].removeClass("hard"),
                            h._addPage.call(this, i),
                            h._removeFromDOM.call(this)),
                        this
                    );
                },
                _addPage: function (t) {
                    var i = this.data(),
                        n = i.pageObjs[t];
                    if (n)
                        if (h._necessPage.call(this, t)) {
                            if (!i.pageWrap[t]) {
                                (i.pageWrap[t] = e("<div/>", { class: "page-wrapper", page: t, css: { position: "absolute", overflow: "hidden" } })),
                                    this.append(i.pageWrap[t]),
                                    i.pagePlace[t] || ((i.pagePlace[t] = t), i.pageObjs[t].appendTo(i.pageWrap[t]));
                                var a = h._pageSize.call(this, t, !0);
                                n.css({ width: a.width, height: a.height }), i.pageWrap[t].css(a);
                            }
                            i.pagePlace[t] == t && h._makeFlip.call(this, t);
                        } else (i.pagePlace[t] = 0), i.pageObjs[t] && i.pageObjs[t].remove();
                },
                hasPage: function (e) {
                    return _(e, this.data().pageObjs);
                },
                center: function (t) {
                    var i = this.data(),
                        n = e(this).turn("size"),
                        a = 0;
                    if (!i.noCenter) {
                        if ("double" == i.display) {
                            var s = this.turn("view", t || i.tpage || i.page);
                            "ltr" == i.direction ? (s[0] ? s[1] || (a += n.width / 4) : (a -= n.width / 4)) : s[0] ? s[1] || (a -= n.width / 4) : (a += n.width / 4);
                        }
                        e(this).css({ marginLeft: a });
                    }
                    return this;
                },
                destroy: function () {
                    var t = this,
                        i = this.data();
                    if ("prevented" != E("destroying", this)) {
                        for (
                            i.destroying = !0,
                                e.each(["end", "first", "flip", "last", "pressed", "released", "start", "turning", "turned", "zooming", "missing"], function (e, i) {
                                    t.unbind(i);
                                }),
                                this.parent().unbind("start", i.eventHandlers.start),
                                e(document).unbind(o.move, i.eventHandlers.touchMove).unbind(o.up, i.eventHandlers.touchEnd);
                            0 !== i.totalPages;

                        )
                            this.turn("removePage", i.totalPages);
                        return i.fparent && i.fparent.remove(), i.shadow && i.shadow.remove(), this.removeData(), (i = null), this;
                    }
                },
                is: function () {
                    return "object" == typeof this.data().pages;
                },
                zoom: function (t) {
                    var i = this.data();
                    if ("number" == typeof t) {
                        if (t < 0.001 || t > 100) throw S(t + " is not a value for zoom");
                        if ("prevented" == E("zooming", this, [t, i.zoom])) return this;
                        var n = this.turn("size"),
                            a = this.turn("view"),
                            s = 1 / i.zoom,
                            r = Math.round(n.width * s * t),
                            o = Math.round(n.height * s * t);
                        (i.zoom = t), e(this).turn("stop").turn("size", r, o), i.opts.autoCenter && this.turn("center"), h._updateShadow.call(this);
                        for (var l = 0; l < a.length; l++) a[l] && i.pageZoom[a[l]] != i.zoom && (this.trigger("zoomed", [a[l], a, i.pageZoom[a[l]], i.zoom]), (i.pageZoom[a[l]] = i.zoom));
                        return this;
                    }
                    return i.zoom;
                },
                _pageSize: function (e, t) {
                    var i = this.data(),
                        n = {};
                    if ("single" == i.display) (n.width = this.width()), (n.height = this.height()), t && ((n.top = 0), (n.left = 0), (n.right = "auto"));
                    else {
                        var a = this.width() / 2,
                            s = this.height();
                        if ((i.pageObjs[e].hasClass("own-size") ? ((n.width = i.pageObjs[e].width()), (n.height = i.pageObjs[e].height())) : ((n.width = a), (n.height = s)), t)) {
                            var r = e % 2;
                            (n.top = (s - n.height) / 2), "ltr" == i.direction ? ((n[r ? "right" : "left"] = a - n.width), (n[r ? "left" : "right"] = "auto")) : ((n[r ? "left" : "right"] = a - n.width), (n[r ? "right" : "left"] = "auto"));
                        }
                    }
                    return n;
                },
                _makeFlip: function (e) {
                    var t = this.data();
                    if (!t.pages[e] && t.pagePlace[e] == e) {
                        var i = "single" == t.display,
                            n = e % 2;
                        (t.pages[e] = t.pageObjs[e]
                            .css(h._pageSize.call(this, e))
                            .flip({ page: e, next: n || i ? e + 1 : e - 1, turn: this })
                            .flip("disable", t.disabled)),
                            h._setPageLoc.call(this, e),
                            (t.pageZoom[e] = t.zoom);
                    }
                    return t.pages[e];
                },
                _makeRange: function () {
                    var e, t;
                    if (!(this.data().totalPages < 1)) for (e = (t = this.turn("range"))[0]; e <= t[1]; e++) h._addPage.call(this, e);
                },
                range: function (e) {
                    var t,
                        i,
                        n,
                        a,
                        s = this.data();
                    if (((e = e || s.tpage || s.page || 1), (a = h._view.call(this, e)), e < 1 || e > s.totalPages)) throw S('"' + e + '" is not a valid page');
                    return (
                        (a[1] = a[1] || a[0]),
                        a[0] >= 1 && a[1] <= s.totalPages ? ((t = Math.floor(2)), s.totalPages - a[1] > a[0] ? (n = 2 * t - (i = Math.min(a[0] - 1, t))) : (i = 2 * t - (n = Math.min(s.totalPages - a[1], t)))) : ((i = 5), (n = 5)),
                        [Math.max(1, a[0] - i), Math.min(s.totalPages, a[1] + n)]
                    );
                },
                _necessPage: function (e) {
                    if (0 === e) return !0;
                    var t = this.turn("range");
                    return this.data().pageObjs[e].hasClass("fixed") || (e >= t[0] && e <= t[1]);
                },
                _removeFromDOM: function () {
                    var e,
                        t = this.data();
                    for (e in t.pageWrap) _(e, t.pageWrap) && !h._necessPage.call(this, e) && h._removePageFromDOM.call(this, e);
                },
                _removePageFromDOM: function (e) {
                    var t = this.data();
                    if (t.pages[e]) {
                        var i = t.pages[e].data();
                        f._moveFoldingPage.call(t.pages[e], !1), i.f && i.f.fwrapper && i.f.fwrapper.remove(), t.pages[e].removeData(), t.pages[e].remove(), delete t.pages[e];
                    }
                    t.pageObjs[e] && t.pageObjs[e].remove(), t.pageWrap[e] && (t.pageWrap[e].remove(), delete t.pageWrap[e]), h._removeMv.call(this, e), delete t.pagePlace[e], delete t.pageZoom[e];
                },
                removePage: function (e) {
                    var t = this.data();
                    if ("*" == e) for (; 0 !== t.totalPages; ) this.turn("removePage", t.totalPages);
                    else {
                        if (e < 1 || e > t.totalPages) throw S("The page " + e + " doesn't exist");
                        t.pageObjs[e] && (this.turn("stop"), h._removePageFromDOM.call(this, e), delete t.pageObjs[e]),
                            h._movePages.call(this, e, -1),
                            (t.totalPages = t.totalPages - 1),
                            t.page > t.totalPages ? ((t.page = null), h._fitPage.call(this, t.totalPages)) : (h._makeRange.call(this), this.turn("update"));
                    }
                    return this;
                },
                _movePages: function (e, t) {
                    var i,
                        n = this,
                        a = this.data(),
                        s = "single" == a.display,
                        r = function (e) {
                            var i = e + t,
                                r = i % 2,
                                o = r ? " odd " : " even ";
                            a.pageObjs[e] && (a.pageObjs[i] = a.pageObjs[e].removeClass("p" + e + " odd even").addClass("p" + i + o)),
                                a.pagePlace[e] &&
                                    a.pageWrap[e] &&
                                    ((a.pagePlace[i] = i),
                                    a.pageObjs[i].hasClass("fixed") ? (a.pageWrap[i] = a.pageWrap[e].attr("page", i)) : (a.pageWrap[i] = a.pageWrap[e].css(h._pageSize.call(n, i, !0)).attr("page", i)),
                                    a.pages[e] && (a.pages[i] = a.pages[e].flip("options", { page: i, next: s || r ? i + 1 : i - 1 })),
                                    t && (delete a.pages[e], delete a.pagePlace[e], delete a.pageZoom[e], delete a.pageObjs[e], delete a.pageWrap[e]));
                        };
                    if (t > 0) for (i = a.totalPages; i >= e; i--) r(i);
                    else for (i = e; i <= a.totalPages; i++) r(i);
                },
                display: function (t) {
                    var i = this.data(),
                        n = i.display;
                    if (void 0 === t) return n;
                    if (-1 == e.inArray(t, d)) throw S('"' + t + '" is not a value for display');
                    switch (t) {
                        case "single":
                            i.pageObjs[0] || (this.turn("stop").css({ overflow: "hidden" }), (i.pageObjs[0] = e("<div />", { class: "page p-temporal" }).css({ width: this.width(), height: this.height() }).appendTo(this))),
                                this.addClass("shadow");
                            break;
                        case "double":
                            i.pageObjs[0] && (this.turn("stop").css({ overflow: "" }), i.pageObjs[0].remove(), delete i.pageObjs[0]), this.removeClass("shadow");
                    }
                    if (((i.display = t), n)) {
                        var a = this.turn("size");
                        h._movePages.call(this, 1, 0), this.turn("size", a.width, a.height).turn("update");
                    }
                    return this;
                },
                direction: function (t) {
                    var i = this.data();
                    if (void 0 === t) return i.direction;
                    if (((t = t.toLowerCase()), -1 == e.inArray(t, c))) throw S('"' + t + '" is not a value for direction');
                    return "rtl" == t && e(this).attr("dir", "ltr").css({ direction: "ltr" }), (i.direction = t), i.done && this.turn("size", e(this).width(), e(this).height()), this;
                },
                animating: function () {
                    return this.data().pageMv.length > 0;
                },
                corner: function () {
                    var e,
                        t,
                        i = this.data();
                    for (t in i.pages) if (_(t, i.pages) && (e = i.pages[t].flip("corner"))) return e;
                    return !1;
                },
                data: function () {
                    return this.data();
                },
                disable: function (t) {
                    var i,
                        n = this.data(),
                        a = this.turn("view");
                    for (i in ((n.disabled = void 0 === t || !0 === t), n.pages)) _(i, n.pages) && n.pages[i].flip("disable", !!n.disabled || -1 == e.inArray(parseInt(i, 10), a));
                    return this;
                },
                disabled: function (e) {
                    return void 0 === e ? !0 === this.data().disabled : this.turn("disable", e);
                },
                size: function (e, t) {
                    if (void 0 === e || void 0 === t) return { width: this.width(), height: this.height() };
                    this.turn("stop");
                    var i,
                        n,
                        a = this.data(),
                        s = "double" == a.display ? e / 2 : e;
                    for (i in (this.css({ width: e, height: t }), a.pageObjs[0] && a.pageObjs[0].css({ width: s, height: t }), a.pageWrap))
                        _(i, a.pageWrap) && ((n = h._pageSize.call(this, i, !0)), a.pageObjs[i].css({ width: n.width, height: n.height }), a.pageWrap[i].css(n), a.pages[i] && a.pages[i].css({ width: n.width, height: n.height }));
                    return this.turn("resize"), this;
                },
                resize: function () {
                    var e,
                        t = this.data();
                    for (t.pages[0] && (t.pageWrap[0].css({ left: -this.width() }), t.pages[0].flip("resize", !0)), e = 1; e <= t.totalPages; e++) t.pages[e] && t.pages[e].flip("resize", !0);
                    h._updateShadow.call(this), t.opts.autoCenter && this.turn("center");
                },
                _removeMv: function (e) {
                    var t,
                        i = this.data();
                    for (t = 0; t < i.pageMv.length; t++) if (i.pageMv[t] == e) return i.pageMv.splice(t, 1), !0;
                    return !1;
                },
                _addMv: function (e) {
                    var t = this.data();
                    h._removeMv.call(this, e), t.pageMv.push(e);
                },
                _view: function (e) {
                    var t = this.data();
                    return (e = e || t.page), "double" == t.display ? (e % 2 ? [e - 1, e] : [e, e + 1]) : [e];
                },
                view: function (e) {
                    var t = this.data(),
                        i = h._view.call(this, e);
                    return "double" == t.display ? [i[0] > 0 ? i[0] : 0, i[1] <= t.totalPages ? i[1] : 0] : [i[0] > 0 && i[0] <= t.totalPages ? i[0] : 0];
                },
                stop: function (e, t) {
                    if (this.turn("animating")) {
                        var i,
                            n,
                            a,
                            s = this.data();
                        for (s.tpage && ((s.page = s.tpage), delete s.tpage), i = 0; i < s.pageMv.length; i++)
                            s.pageMv[i] &&
                                s.pageMv[i] !== e &&
                                ((n = (a = s.pages[s.pageMv[i]]).data().f.opts), a.flip("hideFoldedPage", t), t || f._moveFoldingPage.call(a, !1), n.force && ((n.next = n.page % 2 == 0 ? n.page - 1 : n.page + 1), delete n.force));
                    }
                    return this.turn("update"), this;
                },
                pages: function (e) {
                    var t = this.data();
                    if (e) {
                        if (e < t.totalPages) for (var i = t.totalPages; i > e; i--) this.turn("removePage", i);
                        return (t.totalPages = e), h._fitPage.call(this, t.page), this;
                    }
                    return t.totalPages;
                },
                _missing: function (e) {
                    var t = this.data();
                    if (!(t.totalPages < 1)) {
                        var i,
                            n = this.turn("range", e),
                            a = [];
                        for (i = n[0]; i <= n[1]; i++) t.pageObjs[i] || a.push(i);
                        a.length > 0 && this.trigger("missing", [a]);
                    }
                },
                _fitPage: function (e) {
                    var t = this.data(),
                        i = this.turn("view", e);
                    if ((h._missing.call(this, e), t.pageObjs[e])) {
                        (t.page = e), this.turn("stop");
                        for (var n = 0; n < i.length; n++) i[n] && t.pageZoom[i[n]] != t.zoom && (this.trigger("zoomed", [i[n], i, t.pageZoom[i[n]], t.zoom]), (t.pageZoom[i[n]] = t.zoom));
                        h._removeFromDOM.call(this), h._makeRange.call(this), h._updateShadow.call(this), this.trigger("turned", [e, i]), this.turn("update"), t.opts.autoCenter && this.turn("center");
                    }
                },
                _turnPage: function (t) {
                    var i,
                        n,
                        a = this.data(),
                        s = a.pagePlace[t],
                        r = this.turn("view"),
                        o = this.turn("view", t);
                    if (a.page != t) {
                        var l = a.page;
                        if ("prevented" == E("turning", this, [t, o])) return void (l == a.page && -1 != e.inArray(s, a.pageMv) && a.pages[s].flip("hideFoldedPage", !0));
                        -1 != e.inArray(1, o) && this.trigger("first"), -1 != e.inArray(a.totalPages, o) && this.trigger("last");
                    }
                    "single" == a.display ? ((i = r[0]), (n = o[0])) : r[1] && t > r[1] ? ((i = r[1]), (n = o[0])) : r[0] && t < r[0] && ((i = r[0]), (n = o[1]));
                    var d = a.opts.turnCorners.split(","),
                        c = a.pages[i].data().f,
                        p = c.opts,
                        u = c.point;
                    h._missing.call(this, t),
                        a.pageObjs[t] &&
                            (this.turn("stop"),
                            (a.page = t),
                            h._makeRange.call(this),
                            (a.tpage = n),
                            p.next != n && ((p.next = n), (p.force = !0)),
                            this.turn("update"),
                            (c.point = u),
                            "hard" == c.effect
                                ? "ltr" == a.direction
                                    ? a.pages[i].flip("turnPage", t > i ? "r" : "l")
                                    : a.pages[i].flip("turnPage", t > i ? "l" : "r")
                                : "ltr" == a.direction
                                ? a.pages[i].flip("turnPage", d[t > i ? 1 : 0])
                                : a.pages[i].flip("turnPage", d[t > i ? 0 : 1]));
                },
                page: function (t) {
                    var i = this.data();
                    if (void 0 === t) return i.page;
                    if (!i.disabled && !i.destroying) {
                        if ((t = parseInt(t, 10)) > 0 && t <= i.totalPages) return t != i.page && (i.done && -1 == e.inArray(t, this.turn("view")) ? h._turnPage.call(this, t) : h._fitPage.call(this, t)), this;
                        throw S("The page " + t + " does not exist");
                    }
                },
                next: function () {
                    return this.turn("page", Math.min(this.data().totalPages, h._view.call(this, this.data().page).pop() + 1));
                },
                previous: function () {
                    return this.turn("page", Math.max(1, h._view.call(this, this.data().page).shift() - 1));
                },
                peel: function (e, t) {
                    var i,
                        n = this.data(),
                        a = this.turn("view");
                    ((t = void 0 === t || !0 === t), !1 === e)
                        ? this.turn("stop", null, t)
                        : "single" == n.display
                        ? n.pages[n.page].flip("peel", e, t)
                        : ((i = "ltr" == n.direction ? (-1 != e.indexOf("l") ? a[0] : a[1]) : -1 != e.indexOf("l") ? a[1] : a[0]), n.pages[i] && n.pages[i].flip("peel", e, t));
                    return this;
                },
                _addMotionPage: function () {
                    var t = e(this).data().f.opts,
                        i = t.turn;
                    i.data();
                    h._addMv.call(i, t.page);
                },
                _eventStart: function (e, t, i) {
                    null != t && null != t.turn && null != t.turn.trigger && t.turn.trigger("peelStart", [t]);
                    var n = t.turn.data(),
                        a = n.pageZoom[t.page];
                    e.isDefaultPrevented() ||
                        (a && a != n.zoom && (t.turn.trigger("zoomed", [t.page, t.turn.turn("view", t.page), a, n.zoom]), (n.pageZoom[t.page] = n.zoom)),
                        "single" == n.display &&
                            i &&
                            ((("l" == i.charAt(1) || "l" == i.charAt(0)) && "ltr" == n.direction) || (("r" == i.charAt(1) || "r" == i.charAt(0)) && "rtl" == n.direction)
                                ? ((t.next = t.next < t.page ? t.next : t.page - 1), (t.force = !0))
                                : (t.next = t.next > t.page ? t.next : t.page + 1)),
                        h._addMotionPage.call(e.target)),
                        h._updateShadow.call(t.turn);
                },
                _eventEnd: function (t, i, n) {
                    e(t.target).data().f;
                    var a = i.turn,
                        s = a.data();
                    if ((null != i && null != i.turn && null != i.turn.trigger && i.turn.trigger("peelEnd", [i, n]), n)) {
                        var r = s.tpage || s.page;
                        (r != i.next && r != i.page) || (delete s.tpage, h._fitPage.call(a, r || i.next, !0));
                    } else h._removeMv.call(a, i.page), h._updateShadow.call(a), a.turn("update");
                },
                _eventPressed: function (t) {
                    var i = e(t.target).data().f,
                        n = i.opts.turn,
                        a = n.data();
                    a.pages;
                    return (a.mouseAction = !0), n.turn("update"), (i.time = new Date().getTime());
                },
                _eventReleased: function (t, i) {
                    var n,
                        a = e(t.target),
                        s = a.data().f,
                        r = s.opts.turn,
                        o = r.data();
                    (n = "single" == o.display ? ("br" == i.corner || "tr" == i.corner || "r" == i.corner ? i.x < a.width() / 2 : i.x > a.width() / 2) : i.x < 0 || i.x > a.width()),
                        (new Date().getTime() - s.time < 200 || n) && (t.preventDefault(), i && !0 === i.fit ? h._fitPage.call(r, s.opts.next) : h._turnPage.call(r, s.opts.next)),
                        (o.mouseAction = !1);
                },
                _flip: function (t) {
                    t.stopPropagation();
                    var i = e(t.target).data().f.opts;
                    i.turn.trigger("turn", [i.next]), i.turn.data().opts.autoCenter && i.turn.turn("center", i.next);
                },
                _touchStart: function (t) {
                    if (
                        null == t ||
                        null == t.target ||
                        ("true" != e(t.target).attr("data-disable-events") &&
                            "start" != e(t.target).attr("data-disable-events") &&
                            "true" != e(t.target).closest(".layer-action-render").attr("data-disable-events") &&
                            "start" != e(t.target).closest(".layer-action-render").attr("data-disable-events"))
                    )
                        if (null == window.disableTurnEvents || 1 != window.disableTurnEvents) {
                            var i = this.data();
                            for (var n in i.pages) if (_(n, i.pages) && !1 === f._eventStart.apply(i.pages[n], arguments)) return !1;
                        } else window.disableFirstMove = !0;
                },
                _touchMove: function (t) {
                    if (
                        (null == t || null == t.target || ("true" != e(t.target).attr("data-disable-events") && "true" != e(t.target).closest(".layer-action-render").attr("data-disable-events"))) &&
                        (null == t ||
                            null == t.target ||
                            ("start" != e(t.target).attr("data-disable-events") && "start" != e(t.target).closest(".layer-action-render").attr("data-disable-events")) ||
                            null == t.originalEvent ||
                            null == t.originalEvent.buttons ||
                            0 != t.originalEvent.buttons)
                    )
                        if (null == window.disableTurnEvents || 1 != window.disableTurnEvents) {
                            n = this.data();
                            for (var i in n.pages) _(i, n.pages) && f._eventMove.apply(n.pages[i], arguments);
                        } else if (window.disableFirstMove) {
                            var n = this.data();
                            for (var i in n.pages) _(i, n.pages) && f._eventEnd.apply(n.pages[i], arguments);
                            window.disableFirstMove = !1;
                        }
                },
                _touchEnd: function (t) {
                    if (null == t || null == t.target || ("true" != e(t.target).attr("data-disable-events") && "true" != e(t.target).closest(".layer-action-render").attr("data-disable-events")))
                        if (null == window.disableTurnEvents || 1 != window.disableTurnEvents) {
                            var i = this.data();
                            for (var n in i.pages) _(n, i.pages) && f._eventEnd.apply(i.pages[n], arguments);
                        } else window.disableFirstMove = !0;
                },
                calculateZ: function (e) {
                    var t,
                        i,
                        n,
                        a,
                        s,
                        r = this,
                        o = this.data(),
                        l = this.turn("view"),
                        d = l[0] || l[1],
                        c = e.length - 1,
                        p = { pageZ: {}, partZ: {}, pageV: {} },
                        u = function (e) {
                            var t = r.turn("view", e);
                            t[0] && (p.pageV[t[0]] = !0), t[1] && (p.pageV[t[1]] = !0);
                        };
                    for (t = 0; t <= c; t++)
                        (i = e[t]), (n = o.pages[i].data().f.opts.next), (a = o.pagePlace[i]), u(i), u(n), (s = o.pagePlace[n] == n ? n : i), (p.pageZ[s] = o.totalPages - Math.abs(d - s)), (p.partZ[a] = 2 * o.totalPages - c + t);
                    return p;
                },
                update: function () {
                    var t,
                        i = this.data();
                    if (this.turn("animating") && 0 !== i.pageMv[0]) {
                        var n,
                            a,
                            s = this.turn("calculateZ", i.pageMv),
                            r = this.turn("corner"),
                            o = this.turn("view"),
                            l = this.turn("view", i.tpage);
                        for (t in i.pageWrap)
                            _(t, i.pageWrap) &&
                                ((a = i.pageObjs[t].hasClass("fixed")),
                                i.pageWrap[t].css({ display: s.pageV[t] || a ? "" : "none", zIndex: (i.pageObjs[t].hasClass("hard") ? s.partZ[t] : s.pageZ[t]) || (a ? -1 : 0) }),
                                (n = i.pages[t]) &&
                                    (n.flip("z", s.partZ[t] || null),
                                    s.pageV[t] && n.flip("resize"),
                                    i.tpage ? n.flip("hover", !1).flip("disable", -1 == e.inArray(parseInt(t, 10), i.pageMv) && t != l[0] && t != l[1]) : n.flip("hover", !1 === r).flip("disable", t != o[0] && t != o[1])));
                    } else
                        for (t in i.pageWrap)
                            if (_(t, i.pageWrap)) {
                                var d = h._setPageLoc.call(this, t);
                                i.pages[t] &&
                                    i.pages[t]
                                        .flip("disable", i.disabled || 1 != d)
                                        .flip("hover", !0)
                                        .flip("z", null);
                            }
                    return this;
                },
                _updateShadow: function () {
                    var t,
                        i,
                        n,
                        a = this.data(),
                        s = this.width(),
                        r = this.height(),
                        o = "single" == a.display ? s : s / 2;
                    (t = this.turn("view")), a.shadow || (a.shadow = e("<div />", { class: "shadow", css: g(0, 0, 0).css }).appendTo(this));
                    for (var l = 0; l < a.pageMv.length && t[0] && t[1]; l++) (t = this.turn("view", a.pages[a.pageMv[l]].data().f.opts.next)), (i = this.turn("view", a.pageMv[l])), (t[0] = t[0] && i[0]), (t[1] = t[1] && i[1]);
                    switch (((n = t[0] ? (t[1] ? 3 : "ltr" == a.direction ? 2 : 1) : "ltr" == a.direction ? 1 : 2), a.shadow.removeClass("shadow-half-left"), a.shadow.removeClass("shadow-half-right"), n)) {
                        case 1:
                            a.shadow.css({ width: o, height: r, top: 0, left: o }).addClass("shadow-half-left");
                            break;
                        case 2:
                            a.shadow.css({ width: o, height: r, top: 0, left: 0 }).addClass("shadow-half-right");
                            break;
                        case 3:
                            a.shadow.css({ width: s, height: r, top: 0, left: 0 });
                    }
                },
                _setPageLoc: function (e) {
                    var t = this.data(),
                        i = this.turn("view"),
                        n = 0;
                    if ((e == i[0] || e == i[1] ? (n = 1) : (("single" == t.display && e == i[0] + 1) || ("double" == t.display && e == i[0] - 2) || e == i[1] + 2) && (n = 2), !this.turn("animating")))
                        switch (n) {
                            case 1:
                                t.pageWrap[e].css({ zIndex: t.totalPages, display: "" });
                                break;
                            case 2:
                                t.pageWrap[e].css({ zIndex: t.totalPages - 1, display: "" });
                                break;
                            case 0:
                                t.pageWrap[e].css({ zIndex: 0, display: t.pageObjs[e].hasClass("fixed") ? "" : "none" });
                        }
                    return n;
                },
                options: function (t) {
                    if (void 0 === t) return this.data().opts;
                    var i = this.data();
                    if (
                        (e.extend(i.opts, t),
                        t.pages && this.turn("pages", t.pages),
                        t.page && this.turn("page", t.page),
                        t.display && this.turn("display", t.display),
                        t.direction && this.turn("direction", t.direction),
                        t.width && t.height && this.turn("size", t.width, t.height),
                        t.when)
                    )
                        for (var n in t.when) _(n, t.when) && this.unbind(n).bind(n, t.when[n]);
                    return this;
                },
                version: function () {
                    return "4.1.0";
                },
            },
            f = {
                init: function (e) {
                    return this.data({ f: { disabled: !1, hover: !1, effect: this.hasClass("hard") ? "hard" : "sheet" } }), this.flip("options", e), f._addPageWrapper.call(this), this;
                },
                setData: function (t) {
                    var i = this.data();
                    return (i.f = e.extend(i.f, t)), this;
                },
                options: function (t) {
                    var i = this.data().f;
                    return t ? (f.setData.call(this, { opts: e.extend({}, i.opts || u, t) }), this) : i.opts;
                },
                z: function (e) {
                    var t = this.data().f;
                    return (t.opts["z-index"] = e), t.fwrapper && t.fwrapper.css({ zIndex: e || parseInt(t.parent.css("z-index"), 10) || 0 }), this;
                },
                _cAllowed: function () {
                    var e = this.data().f,
                        t = e.opts.page,
                        i = e.opts.turn.data(),
                        n = t % 2;
                    return "hard" == e.effect
                        ? "single" == i.display && 1 != t && t != i.totalPages
                            ? ["r", "l"]
                            : "single" == i.display
                            ? 1 == t
                                ? "ltr" == i.direction
                                    ? ["r"]
                                    : ["l"]
                                : "ltr" == i.direction
                                ? ["l"]
                                : ["r"]
                            : "ltr" == i.direction
                            ? [n ? "r" : "l"]
                            : [n ? "l" : "r"]
                        : "single" == i.display
                        ? 1 == t
                            ? "ltr" == i.direction
                                ? l.forward
                                : l.backward
                            : t == i.totalPages
                            ? "ltr" == i.direction
                                ? l.backward
                                : l.forward
                            : l.all
                        : "ltr" == i.direction
                        ? l[n ? "forward" : "backward"]
                        : l[n ? "backward" : "forward"];
                },
                _cornerActivated: function (t) {
                    var i = this.data().f,
                        n = this.width(),
                        a = this.height(),
                        s = { x: t.x, y: t.y, corner: "" },
                        r = i.opts.cornerSize;
                    if (s.x <= 0 || s.y <= 0 || s.x >= n || s.y >= a) return !1;
                    var o = f._cAllowed.call(this);
                    switch (i.effect) {
                        case "hard":
                            if (t.isHovering && !(s.y < a / 6 || s.y >= a - a / 6)) return !1;
                            if (s.x > n - r) s.corner = "r";
                            else {
                                if (!(s.x < r)) return !1;
                                s.corner = "l";
                            }
                            break;
                        case "sheet":
                            let e = a / 2,
                                i = a / 2;
                            if ((t.isHovering && ((e = a / 6), (i = a - a / 6)), s.y < e)) s.corner += "t";
                            else {
                                if (!(s.y >= i)) return !1;
                                s.corner += "b";
                            }
                            if (s.x <= r) s.corner += "l";
                            else {
                                if (!(s.x >= n - r)) return !1;
                                s.corner += "r";
                            }
                    }
                    return !(!s.corner || -1 == e.inArray(s.corner, o)) && s;
                },
                _isIArea: function (e) {
                    var t = this.data().f.parent.offset();
                    return (e = r && e.originalEvent ? e.originalEvent.touches[0] : e), f._cornerActivated.call(this, { x: e.pageX - t.left, y: e.pageY - t.top, isHovering: e.isHovering });
                },
                _c: function (e, t) {
                    switch (((t = t || 0), e)) {
                        case "tl":
                            return w(t, t);
                        case "tr":
                            return w(this.width() - t, t);
                        case "bl":
                            return w(t, this.height() - t);
                        case "br":
                            return w(this.width() - t, this.height() - t);
                        case "l":
                            return w(t, 0);
                        case "r":
                            return w(this.width() - t, 0);
                    }
                },
                _c2: function (e) {
                    switch (e) {
                        case "tl":
                        case "l":
                            return w(2 * this.width(), 0);
                        case "tr":
                        case "r":
                            return w(-this.width(), 0);
                        case "bl":
                            return w(2 * this.width(), this.height());
                        case "br":
                            return w(-this.width(), this.height());
                    }
                },
                _foldingPage: function () {
                    var e = this.data().f;
                    if (e) {
                        var t = e.opts;
                        return t.turn ? ("single" == (e = t.turn.data()).display ? (t.next > 1 || t.page > 1 ? e.pageObjs[0] : null) : e.pageObjs[t.next]) : void 0;
                    }
                },
                _backGradient: function () {
                    var t = this.data().f,
                        i = t.opts.turn.data(),
                        n = i.opts.gradients && ("single" == i.display || (2 != t.opts.page && t.opts.page != i.totalPages - 1));
                    return n && !t.bshadow && (t.bshadow = e("<div/>", g(0, 0, 1)).css({ position: "", width: this.width(), height: this.height() }).appendTo(t.parent)), n;
                },
                type: function () {
                    return this.data().f.effect;
                },
                resize: function (e) {
                    var t = this.data().f,
                        i = t.opts.turn.data(),
                        n = this.width(),
                        a = this.height();
                    switch (t.effect) {
                        case "hard":
                            e && (t.wrapper.css({ width: n, height: a }), t.fpage.css({ width: n, height: a }), i.opts.gradients && (t.ashadow.css({ width: n, height: a }), t.bshadow.css({ width: n, height: a })));
                            break;
                        case "sheet":
                            if (e) {
                                var s = Math.round(Math.sqrt(Math.pow(n, 2) + Math.pow(a, 2)));
                                t.wrapper.css({ width: s, height: s }),
                                    t.fwrapper.css({ width: s, height: s }).children(":first-child").css({ width: n, height: a }),
                                    t.fpage.css({ width: n, height: a }),
                                    i.opts.gradients && t.ashadow.css({ width: n, height: a }),
                                    f._backGradient.call(this) && t.bshadow.css({ width: n, height: a });
                            }
                            if (t.parent.is(":visible")) {
                                var r = M(t.parent[0]);
                                t.fwrapper.css({ top: r.top, left: r.left }), (r = M(t.opts.turn[0])), t.fparent.css({ top: -r.top, left: -r.left });
                            }
                            this.flip("z", t.opts["z-index"]);
                    }
                },
                _addPageWrapper: function () {
                    var t = this.data().f,
                        i = t.opts.turn.data(),
                        a = this.parent();
                    if (((t.parent = a), !t.wrapper))
                        switch (t.effect) {
                            case "hard":
                                var s = {};
                                (s[n + "transform-style"] = "preserve-3d"),
                                    (s[n + "backface-visibility"] = "hidden"),
                                    (t.wrapper = e("<div/>", g(0, 0, 2)).css(s).appendTo(a).prepend(this)),
                                    (t.fpage = e("<div/>", g(0, 0, 1)).css(s).appendTo(a).addClass("fold-page")),
                                    i.opts.gradients && ((t.ashadow = e("<div/>", g(0, 0, 0)).hide().appendTo(a)), (t.bshadow = e("<div/>", g(0, 0, 0))));
                                break;
                            case "sheet":
                                var r = this.width(),
                                    o = this.height();
                                Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2)));
                                if (((t.fparent = t.opts.turn.data().fparent), !t.fparent)) {
                                    var l = e("<div/>", { css: { "pointer-events": "none" } }).hide();
                                    (l.data().flips = 0), l.css(g(0, 0, "auto", "visible").css).appendTo(t.opts.turn), (t.opts.turn.data().fparent = l), (t.fparent = l);
                                }
                                this.css({ position: "absolute", top: 0, left: 0, bottom: "auto", right: "auto" }),
                                    (t.wrapper = e("<div/>", g(0, 0, this.css("z-index")))
                                        .appendTo(a)
                                        .prepend(this)),
                                    (t.fwrapper = e("<div/>", g(a.offset().top, a.offset().left)).hide().appendTo(t.fparent).addClass("fold-wrapper")),
                                    (t.fpage = e("<div/>", g(0, 0, 0, "visible")).css({ cursor: "default" }).appendTo(t.fwrapper).addClass("fold-page")),
                                    i.opts.gradients && (t.ashadow = e("<div/>", g(0, 0, 1)).appendTo(t.fpage)),
                                    f.setData.call(this, t);
                        }
                    f.resize.call(this, !0);
                },
                _fold: function (e) {
                    var t = this.data().f,
                        r = t.opts.turn.data(),
                        o = f._c.call(this, e.corner),
                        l = this.width(),
                        d = this.height();
                    switch (t.effect) {
                        case "hard":
                            "l" == e.corner ? (e.x = Math.min(Math.max(e.x, 0), 2 * l)) : (e.x = Math.max(Math.min(e.x, l), -l));
                            var c,
                                p,
                                u,
                                h,
                                m,
                                g = r.totalPages,
                                v = t.opts["z-index"] || g,
                                _ = { overflow: "visible" },
                                x = o.x ? (o.x - e.x) / l : e.x / l,
                                E = 90 * x,
                                S = E < 90;
                            switch (e.corner) {
                                case "l":
                                    (h = "0% 50%"), (m = "100% 50%"), S ? ((c = 0), (p = t.opts.next - 1 > 0), (u = 1)) : ((c = "100%"), (p = t.opts.page + 1 < g), (u = 0));
                                    break;
                                case "r":
                                    (h = "100% 50%"), (m = "0% 50%"), (E = -E), (l = -l), S ? ((c = 0), (p = t.opts.next + 1 < g), (u = 0)) : ((c = "-100%"), (p = 1 != t.opts.page), (u = 1));
                            }
                            (_[n + "perspective-origin"] = m),
                                t.wrapper.transform("rotateY(" + E + "deg)translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", m),
                                t.fpage.transform("translateX(" + l + "px) rotateY(" + (180 + E) + "deg)", h),
                                t.parent.css(_),
                                S ? ((x = 1 - x), t.wrapper.css({ zIndex: v + 1 }), t.fpage.css({ zIndex: v })) : ((x -= 1), t.wrapper.css({ zIndex: v }), t.fpage.css({ zIndex: v + 1 })),
                                r.opts.gradients &&
                                    (p ? t.ashadow.css({ display: "", left: c, backgroundColor: "rgba(0,0,0," + 0.5 * x + ")" }).transform("rotateY(0deg)") : t.ashadow.hide(),
                                    t.bshadow.css({ opacity: 1 - x }),
                                    S ? t.bshadow.parent()[0] != t.wrapper[0] && t.bshadow.appendTo(t.wrapper) : t.bshadow.parent()[0] != t.fpage[0] && t.bshadow.appendTo(t.fpage),
                                    T(
                                        t.bshadow,
                                        w(100 * u, 0),
                                        w(100 * (1 - u), 0),
                                        [
                                            [0, "rgba(0,0,0,0.3)"],
                                            [1, "rgba(0,0,0,0)"],
                                        ],
                                        2
                                    ));
                            break;
                        case "sheet":
                            var M,
                                C,
                                P,
                                A,
                                $,
                                z,
                                k,
                                O = this,
                                I = 0,
                                D = w(0, 0),
                                L = w(0, 0),
                                F = w(0, 0),
                                H = f._foldingPage.call(this),
                                R = (Math.tan(0), r.opts.acceleration),
                                G = t.wrapper.height(),
                                W = "t" == e.corner.substr(0, 1),
                                N = "l" == e.corner.substr(1, 1),
                                X = function () {
                                    var t = w(0, 0),
                                        n = w(0, 0);
                                    (t.x = o.x ? o.x - e.x : e.x), (t.y = i ? (o.y ? o.y - e.y : e.y) : 0), (n.x = N ? l - t.x / 2 : e.x + t.x / 2), (n.y = t.y / 2);
                                    var c = s - Math.atan2(t.y, t.x),
                                        p = c - Math.atan2(n.y, n.x),
                                        u = Math.max(0, Math.sin(p) * Math.sqrt(Math.pow(n.x, 2) + Math.pow(n.y, 2)));
                                    if (((I = (c / a) * 180), (F = w(u * Math.sin(c), u * Math.cos(c))), c > s && ((F.x = F.x + Math.abs((F.y * t.y) / t.x)), (F.y = 0), Math.round(F.x * Math.tan(a - c)) < d)))
                                        return (e.y = Math.sqrt(Math.pow(d, 2) + 2 * n.x * t.x)), W && (e.y = d - e.y), X();
                                    if (c > s) {
                                        var h = a - c,
                                            m = G - d / Math.sin(h);
                                        (D = w(Math.round(m * Math.cos(h)), Math.round(m * Math.sin(h)))), N && (D.x = -D.x), W && (D.y = -D.y);
                                    }
                                    M = Math.round(F.y / Math.tan(c) + F.x);
                                    var g = l - M,
                                        v = g * Math.cos(2 * c),
                                        y = g * Math.sin(2 * c);
                                    if (((L = w(Math.round(N ? g - v : M + v), Math.round(W ? y : d - y))), r.opts.gradients)) {
                                        $ = g * Math.sin(c);
                                        var b = f._c2.call(O, e.corner),
                                            _ = Math.sqrt(Math.pow(b.x - e.x, 2) + Math.pow(b.y - e.y, 2)) / l;
                                        (k = Math.sin(s * (_ > 1 ? 2 - _ : _))),
                                            (z = Math.min(_, 1)),
                                            (A = $ > 100 ? ($ - 100) / $ : 0),
                                            (C = w((($ * Math.sin(c)) / l) * 100, (($ * Math.cos(c)) / d) * 100)),
                                            f._backGradient.call(O) && ((P = w(((1.2 * $ * Math.sin(c)) / l) * 100, ((1.2 * $ * Math.cos(c)) / d) * 100)), N || (P.x = 100 - P.x), W || (P.y = 100 - P.y));
                                    }
                                    return (F.x = Math.round(F.x)), (F.y = Math.round(F.y)), !0;
                                },
                                j = function (e, i, n, a) {
                                    var s = ["0", "auto"],
                                        o = ((l - G) * n[0]) / 100,
                                        c = ((d - G) * n[1]) / 100,
                                        p = { left: s[i[0]], top: s[i[1]], right: s[i[2]], bottom: s[i[3]] },
                                        u = {},
                                        h = 90 != a && -90 != a ? (N ? -1 : 1) : 0,
                                        m = n[0] + "% " + n[1] + "%";
                                    O.css(p).transform(b(a) + y(e.x + h, e.y, R), m),
                                        t.fpage.css(p).transform(b(a) + y(e.x + L.x - D.x - (l * n[0]) / 100, e.y + L.y - D.y - (d * n[1]) / 100, R) + b((180 / a - 2) * a), m),
                                        t.wrapper.transform(y(-e.x + o - h, -e.y + c, R) + b(-a), m),
                                        t.fwrapper.transform(y(-e.x + D.x + o, -e.y + D.y + c, R) + b(-a), m),
                                        r.opts.gradients &&
                                            (n[0] && (C.x = 100 - C.x),
                                            n[1] && (C.y = 100 - C.y),
                                            (u["box-shadow"] = "0 0 20px rgba(0,0,0," + 0.5 * k + ")"),
                                            H.css(u),
                                            T(
                                                t.ashadow,
                                                w(N ? 100 : 0, W ? 0 : 100),
                                                w(C.x, C.y),
                                                [
                                                    [A, "rgba(0,0,0,0)"],
                                                    [0.8 * (1 - A) + A, "rgba(0,0,0," + 0.2 * z + ")"],
                                                    [1, "rgba(255,255,255," + 0.2 * z + ")"],
                                                ],
                                                3
                                            ),
                                            f._backGradient.call(O) &&
                                                T(
                                                    t.bshadow,
                                                    w(N ? 0 : 100, W ? 0 : 100),
                                                    w(P.x, P.y),
                                                    [
                                                        [0.6, "rgba(0,0,0,0)"],
                                                        [0.8, "rgba(0,0,0," + 0.3 * z + ")"],
                                                        [1, "rgba(0,0,0,0)"],
                                                    ],
                                                    3
                                                ));
                                };
                            switch (e.corner) {
                                case "l":
                                case "r":
                                    break;
                                case "tl":
                                    (e.x = Math.max(e.x, 1)), X(), j(F, [1, 0, 0, 1], [100, 0], I);
                                    break;
                                case "tr":
                                    (e.x = Math.min(e.x, l - 1)), X(), j(w(-F.x, F.y), [0, 0, 0, 1], [0, 0], -I);
                                    break;
                                case "bl":
                                    (e.x = Math.max(e.x, 1)), X(), j(w(F.x, -F.y), [1, 1, 0, 0], [100, 100], -I);
                                    break;
                                case "br":
                                    (e.x = Math.min(e.x, l - 1)), X(), j(w(-F.x, -F.y), [0, 1, 1, 0], [0, 100], I);
                            }
                    }
                    t.point = e;
                },
                _moveFoldingPage: function (e) {
                    var t = this.data().f;
                    if (t) {
                        var i = t.opts.turn,
                            n = i.data(),
                            a = n.pagePlace;
                        if (e) {
                            var s = t.opts.next;
                            if (a[s] != t.opts.page) t.folding && f._moveFoldingPage.call(this, !1), f._foldingPage.call(this).appendTo(t.fpage), (a[s] = t.opts.page), (t.folding = s);
                            i.turn("update");
                        } else if (t.folding) {
                            if (n.pages[t.folding]) {
                                var r = n.pages[t.folding].data().f;
                                n.pageObjs[t.folding].appendTo(r.wrapper);
                            } else n.pageWrap[t.folding] && n.pageObjs[t.folding].appendTo(n.pageWrap[t.folding]);
                            t.folding in a && (a[t.folding] = t.folding), delete t.folding;
                        }
                    }
                },
                _showFoldedPage: function (e, t) {
                    var i = f._foldingPage.call(this),
                        n = this.data(),
                        a = n.f,
                        s = a.visible;
                    if (i) {
                        if (!s || !a.point || a.point.corner != e.corner) {
                            var r = "hover" == a.status || "peel" == a.status || a.opts.turn.data().mouseAction ? e.corner : null;
                            if (((s = !1), "prevented" == E("start", this, [a.opts, r]))) return !1;
                        }
                        if (t) {
                            var o = this,
                                l = a.point && a.point.corner == e.corner ? a.point : f._c.call(this, e.corner, 1);
                            this.animatef({
                                from: [l.x, l.y],
                                to: [e.x, e.y],
                                duration: 500,
                                frame: function (t) {
                                    (e.x = Math.round(t[0])), (e.y = Math.round(t[1])), f._fold.call(o, e);
                                },
                            });
                        } else f._fold.call(this, e), n.effect && !n.effect.turning && this.animatef(!1);
                        if (!s)
                            switch (a.effect) {
                                case "hard":
                                    (a.visible = !0), f._moveFoldingPage.call(this, !0), a.fpage.show(), a.opts.shadows && a.bshadow.show();
                                    break;
                                case "sheet":
                                    (a.visible = !0), a.fparent.show().data().flips++, f._moveFoldingPage.call(this, !0), a.fwrapper.show(), a.bshadow && a.bshadow.show();
                            }
                        return !0;
                    }
                    return !1;
                },
                hide: function () {
                    var e = this.data().f,
                        t = e.opts.turn.data(),
                        i = f._foldingPage.call(this);
                    switch (e.effect) {
                        case "hard":
                            t.opts.gradients && ((e.bshadowLoc = 0), e.bshadow.remove(), e.ashadow.hide()), e.wrapper.transform(""), e.fpage.hide();
                            break;
                        case "sheet":
                            0 == --e.fparent.data().flips && e.fparent.hide(),
                                this.css({ left: 0, top: 0, right: "auto", bottom: "auto" }).transform(""),
                                e.wrapper.transform(""),
                                e.fwrapper.hide(),
                                e.bshadow && e.bshadow.hide(),
                                i.transform("");
                    }
                    return (e.visible = !1), this;
                },
                hideFoldedPage: function (e) {
                    var t = this.data().f;
                    if (t.point) {
                        var i = this,
                            n = t.point,
                            a = function () {
                                (t.point = null), (t.status = ""), i.flip("hide"), i.trigger("end", [t.opts, !1]);
                            };
                        if (e) {
                            var s = f._c.call(this, n.corner),
                                r = "t" == n.corner.substr(0, 1) ? Math.min(0, n.y - s.y) / 2 : Math.max(0, n.y - s.y) / 2,
                                o = w(n.x, n.y + r),
                                l = w(s.x, s.y - r);
                            this.animatef({
                                from: 0,
                                to: 1,
                                frame: function (e) {
                                    var t = v(n, o, l, s, e);
                                    (n.x = t.x), (n.y = t.y), f._fold.call(i, n);
                                },
                                complete: a,
                                duration: 800,
                                hiding: !0,
                            });
                        } else this.animatef(!1), a();
                    }
                },
                turnPage: function (e) {
                    var t = this,
                        i = this.data().f,
                        n = i.opts.turn.data();
                    e = { corner: i.corner ? i.corner.corner : e || f._cAllowed.call(this)[0] };
                    var a = i.point || f._c.call(this, e.corner, i.opts.turn ? n.opts.elevation : 0),
                        s = f._c2.call(this, e.corner);
                    this.trigger("flip").animatef({
                        from: 0,
                        to: 1,
                        frame: function (i) {
                            var n = v(a, a, s, s, i);
                            (e.x = n.x), (e.y = n.y), f._showFoldedPage.call(t, e);
                        },
                        complete: function () {
                            t.trigger("end", [i.opts, !0]);
                        },
                        duration: n.opts.duration,
                        turning: !0,
                    }),
                        (i.corner = null);
                },
                moving: function () {
                    return "effect" in this.data();
                },
                isTurning: function () {
                    return this.flip("moving") && this.data().effect.turning;
                },
                corner: function () {
                    return this.data().f.corner;
                },
                _eventStart: function (e) {
                    var t = this.data().f,
                        i = t.opts.turn;
                    if ("single" == i.data().display) {
                        if (!t.corner && !t.disabled) {
                            if (this.flip("isTurning") && t.point) return (t.point.fit = !0), "prevented" != E("released", this, [t.point]) && f.hideFoldedPage.call(this, !1), void f._eventStart.call(this, e);
                            if (((t.corner = f._isIArea.call(this, e)), t.corner && f._foldingPage.call(this))) return this.trigger("pressed", [t.point]), f._showFoldedPage.call(this, t.corner), !1;
                            t.corner = null;
                        }
                    } else if (!t.corner && !t.disabled && !this.flip("isTurning") && t.opts.page == i.data().pagePlace[t.opts.page]) {
                        if (((t.corner = f._isIArea.call(this, e)), t.corner && f._foldingPage.call(this))) return this.trigger("pressed", [t.point]), f._showFoldedPage.call(this, t.corner), !1;
                        t.corner = null;
                    }
                },
                _eventMove: function (e) {
                    var t = this.data().f;
                    if (!t.disabled)
                        if (((e = r ? e.originalEvent.touches : [e]), t.corner)) {
                            var i = t.parent.offset();
                            (t.corner.x = e[0].pageX - i.left), (t.corner.y = e[0].pageY - i.top), f._showFoldedPage.call(this, t.corner);
                        } else if (t.hover && !this.data().effect && this.is(":visible")) {
                            e[0].isHovering = !0;
                            var n = f._isIArea.call(this, e[0]);
                            if (n) {
                                if (("sheet" == t.effect && 2 == n.corner.length) || "hard" == t.effect) {
                                    t.status = "hover";
                                    var a = f._c.call(this, n.corner, t.opts.cornerSize / 2);
                                    (n.x = a.x), (n.y = a.y), f._showFoldedPage.call(this, n, !0);
                                }
                            } else "hover" == t.status && ((t.status = ""), f.hideFoldedPage.call(this, !0));
                        }
                },
                _eventEnd: function () {
                    var e = this.data().f,
                        t = e.corner;
                    !e.disabled && t && "prevented" != E("released", this, [e.point || t]) && f.hideFoldedPage.call(this, !0), (e.corner = null);
                },
                disable: function (e) {
                    return f.setData.call(this, { disabled: e }), this;
                },
                hover: function (e) {
                    return f.setData.call(this, { hover: e }), this;
                },
                peel: function (t, i) {
                    var n = this.data().f;
                    if (t) {
                        if (-1 == e.inArray(t, l.all)) throw S("Corner " + t + " is not permitted");
                        if (-1 != e.inArray(t, f._cAllowed.call(this))) {
                            var a = f._c.call(this, t, n.opts.cornerSize / 2);
                            (n.status = "peel"), f._showFoldedPage.call(this, { corner: t, x: a.x, y: a.y }, i);
                        }
                    } else (n.status = ""), f.hideFoldedPage.call(this, i);
                    return this;
                },
            };
        function m(e, t, i) {
            if (i[0] && "object" != typeof i[0]) {
                if (t[i[0]]) return t[i[0]].apply(e, Array.prototype.slice.call(i, 1));
                throw S(i[0] + " is not a method or property");
            }
            return t.init.apply(e, i);
        }
        function g(e, t, i, n) {
            return { css: { position: "absolute", top: e, left: t, overflow: n || "hidden", zIndex: i || "auto" } };
        }
        function v(e, t, i, n, a) {
            var s = 1 - a,
                r = s * s * s,
                o = a * a * a;
            return w(Math.round(r * e.x + 3 * a * s * s * t.x + 3 * a * a * s * i.x + o * n.x), Math.round(r * e.y + 3 * a * s * s * t.y + 3 * a * a * s * i.y + o * n.y));
        }
        function w(e, t) {
            return { x: e, y: t };
        }
        function y(e, i, n) {
            return t && n ? " translate3d(" + e + "px," + i + "px, 0px) " : " translate(" + e + "px, " + i + "px) ";
        }
        function b(e) {
            return " rotate(" + e + "deg) ";
        }
        function _(e, t) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }
        function x() {
            for (var e = ["Moz", "Webkit", "Khtml", "O", "ms"], t = e.length, i = ""; t--; ) e[t] + "Transform" in document.body.style && (i = "-" + e[t].toLowerCase() + "-");
            return i;
        }
        function T(e, t, i, a, s) {
            var r,
                o = [];
            if ("-webkit-" == n) {
                for (r = 0; r < s; r++) o.push("color-stop(" + a[r][0] + ", " + a[r][1] + ")");
                e.css({ "background-image": "-webkit-gradient(linear, " + t.x + "% " + t.y + "%," + i.x + "% " + i.y + "%, " + o.join(",") + " )" });
            } else {
                t = { x: (t.x / 100) * e.width(), y: (t.y / 100) * e.height() };
                var l = (i = { x: (i.x / 100) * e.width(), y: (i.y / 100) * e.height() }).x - t.x,
                    d = i.y - t.y,
                    c = Math.atan2(d, l),
                    p = c - Math.PI / 2,
                    u = Math.abs(e.width() * Math.sin(p)) + Math.abs(e.height() * Math.cos(p)),
                    h = Math.sqrt(d * d + l * l),
                    f = w(i.x < t.x ? e.width() : 0, i.y < t.y ? e.height() : 0),
                    m = Math.tan(c),
                    g = -1 / m,
                    v = (g * f.x - f.y - m * t.x + t.y) / (g - m),
                    y = { x: v, y: g * v - g * f.x + f.y },
                    b = Math.sqrt(Math.pow(y.x - t.x, 2) + Math.pow(y.y - t.y, 2));
                for (r = 0; r < s; r++) o.push(" " + a[r][1] + " " + (100 * (b + h * a[r][0])) / u + "%");
                e.css({ "background-image": n + "linear-gradient(" + -c + "rad," + o.join(",") + ")" });
            }
        }
        function E(t, i, n) {
            var a = e.Event(t);
            return i.trigger(a, n), a.isDefaultPrevented() ? "prevented" : a.isPropagationStopped() ? "stopped" : "";
        }
        function S(e) {
            function t(e) {
                (this.name = "TurnJsError"), (this.message = e);
            }
            return (t.prototype = new Error()), (t.prototype.constructor = t), new t(e);
        }
        function M(e) {
            var t = { top: 0, left: 0 };
            do {
                (t.left += e.offsetLeft), (t.top += e.offsetTop);
            } while ((e = e.offsetParent));
            return t;
        }
        (window.requestAnim =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (e) {
                window.setTimeout(e, 1e3 / 60);
            }),
            e.extend(e.fn, {
                flip: function () {
                    return m(e(this[0]), f, arguments);
                },
                turn: function () {
                    return m(e(this[0]), h, arguments);
                },
                transform: function (e, t) {
                    var i = {};
                    return t && (i[n + "transform-origin"] = t), (i[n + "transform"] = e), this.css(i);
                },
                animatef: function (t) {
                    var i = this.data();
                    if ((i.effect && i.effect.stop(), t)) {
                        t.to.length || (t.to = [t.to]), t.from.length || (t.from = [t.from]);
                        for (
                            var n = [],
                                a = t.to.length,
                                s = !0,
                                r = this,
                                o = new Date().getTime(),
                                l = function () {
                                    if (i.effect && s) {
                                        for (var e = [], d = Math.min(t.duration, new Date().getTime() - o), c = 0; c < a; c++) e.push(i.effect.easing(1, d, t.from[c], n[c], t.duration));
                                        t.frame(1 == a ? e[0] : e), d == t.duration ? (delete i.effect, r.data(i), t.complete && t.complete()) : window.requestAnim(l);
                                    }
                                },
                                d = 0;
                            d < a;
                            d++
                        )
                            n.push(t.to[d] - t.from[d]);
                        (i.effect = e.extend(
                            {
                                stop: function () {
                                    s = !1;
                                },
                                easing: function (e, t, i, n, a) {
                                    return n * Math.sqrt(1 - (t = t / a - 1) * t) + i;
                                },
                            },
                            t
                        )),
                            this.data(i),
                            l();
                    } else delete i.effect;
                },
            }),
            (e.isTouch = r),
            (e.mouseEvents = o),
            (e.cssPrefix = x),
            (e.cssTransitionEnd = function () {
                var e,
                    t = document.createElement("fakeelement"),
                    i = { transition: "transitionend", OTransition: "oTransitionEnd", MSTransition: "transitionend", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
                for (e in i) if (void 0 !== t.style[e]) return i[e];
            }),
            (e.findPos = M);
    })(jQuery),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? (module.exports = e) : e(jQuery);
    })(function (e) {
        var t,
            i,
            n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            a = "onwheel" in window.document || 9 <= window.document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            s = Array.prototype.slice;
        if (e.event.fixHooks) for (var r = n.length; r; ) e.event.fixHooks[n[--r]] = e.event.mouseHooks;
        var o = (e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener) for (var t = a.length; t; ) this.addEventListener(a[--t], l, !1);
                else this.onmousewheel = l;
                e.data(this, "mousewheel-line-height", o.getLineHeight(this)), e.data(this, "mousewheel-page-height", o.getPageHeight(this));
            },
            teardown: function () {
                if (this.removeEventListener) for (var t = a.length; t; ) this.removeEventListener(a[--t], l, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function (t) {
                var i = e(t),
                    n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16;
            },
            getPageHeight: function (t) {
                return e(t).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
        });
        function l(n) {
            var a,
                r = n || window.event,
                l = s.call(arguments, 1),
                p = 0,
                u = 0,
                h = 0;
            if (
                (((n = e.event.fix(r)).type = "mousewheel"),
                "detail" in r && (h = -1 * r.detail),
                "wheelDelta" in r && (h = r.wheelDelta),
                "wheelDeltaY" in r && (h = r.wheelDeltaY),
                "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX),
                "axis" in r && r.axis === r.HORIZONTAL_AXIS && ((u = -1 * h), (h = 0)),
                (p = 0 === h ? u : h),
                "deltaY" in r && (p = h = -1 * r.deltaY),
                "deltaX" in r && ((u = r.deltaX), 0 === h && (p = -1 * u)),
                0 !== h || 0 !== u)
            ) {
                if (1 === r.deltaMode) {
                    var f = e.data(this, "mousewheel-line-height");
                    (p *= f), (h *= f), (u *= f);
                } else if (2 === r.deltaMode) {
                    var m = e.data(this, "mousewheel-page-height");
                    (p *= m), (h *= m), (u *= m);
                }
                if (
                    ((a = Math.max(Math.abs(h), Math.abs(u))),
                    (!i || a < i) && c(r, (i = a)) && (i /= 40),
                    c(r, a) && ((p /= 40), (u /= 40), (h /= 40)),
                    (p = Math[1 <= p ? "floor" : "ceil"](p / i)),
                    (u = Math[1 <= u ? "floor" : "ceil"](u / i)),
                    (h = Math[1 <= h ? "floor" : "ceil"](h / i)),
                    o.settings.normalizeOffset && this.getBoundingClientRect)
                ) {
                    var g = this.getBoundingClientRect();
                    (n.offsetX = n.clientX - g.left), (n.offsetY = n.clientY - g.top);
                }
                return (n.deltaX = u), (n.deltaY = h), (n.deltaFactor = i), (n.deltaMode = 0), l.unshift(n, p, u, h), t && window.clearTimeout(t), (t = window.setTimeout(d, 200)), (e.event.dispatch || e.event.handle).apply(this, l);
            }
        }
        function d() {
            i = null;
        }
        function c(e, t) {
            return o.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0;
        }
        e.fn.extend({
            mousewheel: function (e) {
                return e ? this.on("mousewheel", e) : this.trigger("mousewheel");
            },
            unmousewheel: function (e) {
                return this.off("mousewheel", e);
            },
        });
    });
var sanitizer = {};
!(function (e) {
    sanitizer.sanitize = function (t) {
        if (null == e.parseHTML) return t;
        var i = e(e.parseHTML("<div>" + t + "</div>", null, !1));
        return (
            i.find("*").each(function () {
                var t;
                (t = this),
                    e.each(t.attributes, function () {
                        var i = this.name,
                            n = this.value;
                        (0 != i.indexOf("on") && 0 != n.indexOf("javascript:")) || e(t).removeAttr(i);
                    });
            }),
            i.html()
        );
    };
})(jQuery);
var scaler = {
    getObjectFitSize: function (e, t, i, n, a) {
        var s = n / a,
            r = t / i,
            o = 0,
            l = 0;
        return (e ? s > r : s < r) ? (l = (o = t) / s) : (o = (l = i) * s), { width: o, height: l, x: (t - o) / 2, y: (i - l) / 2 };
    },
    isInIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return !0;
        }
    },
    isIos: function () {
        return /\b(iPad|iPhone|iPod)(?=;)/.test(navigator.userAgent) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1);
    },
    isSamsungBrowser: function () {
        return navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i);
    },
};
!(function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).iosInnerHeight = e();
    }
})(function () {
    return (function e(t, i, n) {
        function a(r, o) {
            if (!i[r]) {
                if (!t[r]) {
                    var l = "function" == typeof require && require;
                    if (!o && l) return l(r, !0);
                    if (s) return s(r, !0);
                    var d = new Error("Cannot find module '" + r + "'");
                    throw ((d.code = "MODULE_NOT_FOUND"), d);
                }
                var c = (i[r] = { exports: {} });
                t[r][0].call(
                    c.exports,
                    function (e) {
                        return a(t[r][1][e] || e);
                    },
                    c,
                    c.exports,
                    e,
                    t,
                    i,
                    n
                );
            }
            return i[r].exports;
        }
        for (var s = "function" == typeof require && require, r = 0; r < n.length; r++) a(n[r]);
        return a;
    })(
        {
            1: [
                function (e, t, i) {
                    "use strict";
                    t.exports = (function () {
                        if ("undefined" == typeof window || "undefined" == typeof navigator)
                            return function () {
                                return 0;
                            };
                        if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
                            return function () {
                                return window.innerHeight;
                            };
                        var e,
                            t = Math.abs(window.orientation),
                            i = { w: 0, h: 0 };
                        return (
                            ((e = document.createElement("div")).style.position = "fixed"),
                            (e.style.height = "100vh"),
                            (e.style.width = 0),
                            (e.style.top = 0),
                            document.documentElement.appendChild(e),
                            (i.w = 90 === t ? e.offsetHeight : window.innerWidth),
                            (i.h = 90 === t ? window.innerWidth : e.offsetHeight),
                            document.documentElement.removeChild(e),
                            (e = null),
                            function () {
                                return 90 !== Math.abs(window.orientation) ? i.h : i.w;
                            }
                        );
                    })();
                },
                {},
            ],
        },
        {},
        [1]
    )(1);
}),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).fitty = t());
    })(this, function () {
        "use strict";
        return (function (e) {
            if (e) {
                var t = function (e) {
                        return [].slice.call(e);
                    },
                    i = 3,
                    n = [],
                    a = null,
                    s =
                        "requestAnimationFrame" in e
                            ? function () {
                                  e.cancelAnimationFrame(a),
                                      (a = e.requestAnimationFrame(function () {
                                          return o(
                                              n.filter(function (e) {
                                                  return e.dirty && e.active;
                                              })
                                          );
                                      }));
                              }
                            : function () {},
                    r = function (e) {
                        return function () {
                            n.forEach(function (t) {
                                return (t.dirty = e);
                            }),
                                s();
                        };
                    },
                    o = function (e) {
                        e
                            .filter(function (e) {
                                return !e.styleComputed;
                            })
                            .forEach(function (e) {
                                e.styleComputed = p(e);
                            }),
                            e.filter(u).forEach(h);
                        var t = e.filter(c);
                        t.forEach(d),
                            t.forEach(function (e) {
                                h(e), l(e);
                            }),
                            t.forEach(f);
                    },
                    l = function (e) {
                        return (e.dirty = 0);
                    },
                    d = function (e) {
                        (e.availableWidth = e.element.parentNode.clientWidth),
                            (e.currentWidth = e.element.scrollWidth),
                            (e.previousFontSize = e.currentFontSize),
                            (e.currentFontSize = Math.min(Math.max(e.minSize, (e.availableWidth / e.currentWidth) * e.previousFontSize), e.maxSize)),
                            (e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap");
                    },
                    c = function (e) {
                        return 2 !== e.dirty || (2 === e.dirty && e.element.parentNode.clientWidth !== e.availableWidth);
                    },
                    p = function (t) {
                        var i = e.getComputedStyle(t.element, null);
                        return (t.currentFontSize = parseFloat(i.getPropertyValue("font-size"))), (t.display = i.getPropertyValue("display")), (t.whiteSpace = i.getPropertyValue("white-space")), !0;
                    },
                    u = function (e) {
                        var t = !1;
                        return !e.preStyleTestCompleted && (/inline-/.test(e.display) || ((t = !0), (e.display = "inline-block")), "nowrap" !== e.whiteSpace && ((t = !0), (e.whiteSpace = "nowrap")), (e.preStyleTestCompleted = !0), t);
                    },
                    h = function (e) {
                        (e.element.style.whiteSpace = e.whiteSpace), (e.element.style.display = e.display), (e.element.style.fontSize = e.currentFontSize + "px");
                    },
                    f = function (e) {
                        e.element.dispatchEvent(new CustomEvent("fit", { detail: { oldValue: e.previousFontSize, newValue: e.currentFontSize, scaleFactor: e.currentFontSize / e.previousFontSize } }));
                    },
                    m = function (e, t) {
                        return function () {
                            (e.dirty = t), e.active && s();
                        };
                    },
                    g = function (e) {
                        return function () {
                            (n = n.filter(function (t) {
                                return t.element !== e.element;
                            })),
                                e.observeMutations && e.observer.disconnect(),
                                (e.element.style.whiteSpace = e.originalStyle.whiteSpace),
                                (e.element.style.display = e.originalStyle.display),
                                (e.element.style.fontSize = e.originalStyle.fontSize);
                        };
                    },
                    v = function (e) {
                        return function () {
                            e.active || ((e.active = !0), s());
                        };
                    },
                    w = function (e) {
                        return function () {
                            return (e.active = !1);
                        };
                    },
                    y = function (e) {
                        e.observeMutations && ((e.observer = new MutationObserver(m(e, 1))), e.observer.observe(e.element, e.observeMutations));
                    },
                    b = { minSize: 16, maxSize: 512, multiLine: !0, observeMutations: "MutationObserver" in e && { subtree: !0, childList: !0, characterData: !0 } },
                    _ = null,
                    x = function () {
                        e.clearTimeout(_), (_ = e.setTimeout(r(2), S.observeWindowDelay));
                    },
                    T = ["resize", "orientationchange"];
                return (
                    Object.defineProperty(S, "observeWindow", {
                        set: function (t) {
                            var i = "".concat(t ? "add" : "remove", "EventListener");
                            T.forEach(function (t) {
                                e[i](t, x);
                            });
                        },
                    }),
                    (S.observeWindow = !0),
                    (S.observeWindowDelay = 100),
                    (S.fitAll = r(i)),
                    S
                );
            }
            function E(e, t) {
                var a = Object.assign({}, b, t),
                    r = e.map(function (e) {
                        var t = Object.assign({}, a, { element: e, active: !0 });
                        return (
                            (function (e) {
                                (e.originalStyle = { whiteSpace: e.element.style.whiteSpace, display: e.element.style.display, fontSize: e.element.style.fontSize }), y(e), (e.newbie = !0), (e.dirty = !0), n.push(e);
                            })(t),
                            { element: e, fit: m(t, i), unfreeze: v(t), freeze: w(t), unsubscribe: g(t) }
                        );
                    });
                return s(), r;
            }
            function S(e) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return "string" == typeof e ? E(t(document.querySelectorAll(e)), i) : E([e], i)[0];
            }
        })("undefined" == typeof window ? null : window);
    }),
    ($.fitWidth = function (e, t) {
        if (
            (null == e &&
                $("[data-fit-text]").each(function () {
                    let e = {};
                    "" != $.trim($(this).attr("data-fit-min")) ? (e.minFontSize = $(this).attr("data-fit-min")) : (e.minFontSize = "8"),
                        "" != $.trim($(this).attr("data-fit-max")) ? (e.maxFontSize = $(this).attr("data-fit-max")) : (e.maxFontSize = "17"),
                        fitty($(this).get(0), { multiLine: !1, minSize: e.minFontSize, maxSize: e.maxFontSize });
                }),
            "refit" == e)
        ) {
            fitty(t, { multiLine: !1, minSize: 8, maxSize: 17 }).fit();
        }
        "refitAll" == e &&
            $(document)
                .find("[data-fit-text]")
                .each(function (e, t) {
                    fitty(t, { multiLine: !1, minSize: 8, maxSize: 17 }).fit();
                });
    }),
    ($.cssToObject = function (e) {
        let t = {};
        return e.replace(/(?:^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, (e, i, n) => (t[i] = n)), t;
    }),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t());
    })(this, function () {
        "use strict";
        function e(e) {
            return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
        }
        function t(i, n) {
            void 0 === i && (i = {}),
                void 0 === n && (n = {}),
                Object.keys(n).forEach((a) => {
                    void 0 === i[a] ? (i[a] = n[a]) : e(n[a]) && e(i[a]) && Object.keys(n[a]).length > 0 && t(i[a], n[a]);
                });
        }
        const i = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: { blur() {}, nodeName: "" },
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createEvent: () => ({ initEvent() {} }),
            createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }),
            createElementNS: () => ({}),
            importNode: () => null,
            location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
        };
        function n() {
            const e = "undefined" != typeof document ? document : {};
            return t(e, i), e;
        }
        const a = {
            document: i,
            navigator: { userAgent: "" },
            location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
            history: { replaceState() {}, pushState() {}, go() {}, back() {} },
            CustomEvent: function () {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle: () => ({ getPropertyValue: () => "" }),
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia: () => ({}),
            requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
            cancelAnimationFrame(e) {
                "undefined" != typeof setTimeout && clearTimeout(e);
            },
        };
        function s() {
            const e = "undefined" != typeof window ? window : {};
            return t(e, a), e;
        }
        class r extends Array {
            constructor(e) {
                "number" == typeof e
                    ? super(e)
                    : (super(...(e || [])),
                      (function (e) {
                          const t = e.__proto__;
                          Object.defineProperty(e, "__proto__", {
                              get: () => t,
                              set(e) {
                                  t.__proto__ = e;
                              },
                          });
                      })(this));
            }
        }
        function o(e) {
            void 0 === e && (e = []);
            const t = [];
            return (
                e.forEach((e) => {
                    Array.isArray(e) ? t.push(...o(e)) : t.push(e);
                }),
                t
            );
        }
        function l(e, t) {
            return Array.prototype.filter.call(e, t);
        }
        function d(e, t) {
            const i = s(),
                a = n();
            let o = [];
            if (!t && e instanceof r) return e;
            if (!e) return new r(o);
            if ("string" == typeof e) {
                const i = e.trim();
                if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
                    let e = "div";
                    0 === i.indexOf("<li") && (e = "ul"),
                        0 === i.indexOf("<tr") && (e = "tbody"),
                        (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
                        0 === i.indexOf("<tbody") && (e = "table"),
                        0 === i.indexOf("<option") && (e = "select");
                    const t = a.createElement(e);
                    t.innerHTML = i;
                    for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e]);
                } else
                    o = (function (e, t) {
                        if ("string" != typeof e) return [e];
                        const i = [],
                            n = t.querySelectorAll(e);
                        for (let e = 0; e < n.length; e += 1) i.push(n[e]);
                        return i;
                    })(e.trim(), t || a);
            } else if (e.nodeType || e === i || e === a) o.push(e);
            else if (Array.isArray(e)) {
                if (e instanceof r) return e;
                o = e;
            }
            return new r(
                (function (e) {
                    const t = [];
                    for (let i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
                    return t;
                })(o)
            );
        }
        d.fn = r.prototype;
        const c = {
            addClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                const n = o(t.map((e) => e.split(" ")));
                return (
                    this.forEach((e) => {
                        e.classList.add(...n);
                    }),
                    this
                );
            },
            removeClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                const n = o(t.map((e) => e.split(" ")));
                return (
                    this.forEach((e) => {
                        e.classList.remove(...n);
                    }),
                    this
                );
            },
            hasClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                const n = o(t.map((e) => e.split(" ")));
                return l(this, (e) => n.filter((t) => e.classList.contains(t)).length > 0).length > 0;
            },
            toggleClass: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                const n = o(t.map((e) => e.split(" ")));
                this.forEach((e) => {
                    n.forEach((t) => {
                        e.classList.toggle(t);
                    });
                });
            },
            attr: function (e, t) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (let i = 0; i < this.length; i += 1)
                    if (2 === arguments.length) this[i].setAttribute(e, t);
                    else for (const t in e) (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
                return this;
            },
            removeAttr: function (e) {
                for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                return this;
            },
            transform: function (e) {
                for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
                return this;
            },
            transition: function (e) {
                for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
                return this;
            },
            on: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                let [n, a, s, r] = t;
                function o(e) {
                    const t = e.target;
                    if (!t) return;
                    const i = e.target.dom7EventData || [];
                    if ((i.indexOf(e) < 0 && i.unshift(e), d(t).is(a))) s.apply(t, i);
                    else {
                        const e = d(t).parents();
                        for (let t = 0; t < e.length; t += 1) d(e[t]).is(a) && s.apply(e[t], i);
                    }
                }
                function l(e) {
                    const t = (e && e.target && e.target.dom7EventData) || [];
                    t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
                }
                "function" == typeof t[1] && (([n, s, r] = t), (a = void 0)), r || (r = !1);
                const c = n.split(" ");
                let p;
                for (let e = 0; e < this.length; e += 1) {
                    const t = this[e];
                    if (a)
                        for (p = 0; p < c.length; p += 1) {
                            const e = c[p];
                            t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({ listener: s, proxyListener: o }), t.addEventListener(e, o, r);
                        }
                    else
                        for (p = 0; p < c.length; p += 1) {
                            const e = c[p];
                            t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({ listener: s, proxyListener: l }), t.addEventListener(e, l, r);
                        }
                }
                return this;
            },
            off: function () {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                let [n, a, s, r] = t;
                "function" == typeof t[1] && (([n, s, r] = t), (a = void 0)), r || (r = !1);
                const o = n.split(" ");
                for (let e = 0; e < o.length; e += 1) {
                    const t = o[e];
                    for (let e = 0; e < this.length; e += 1) {
                        const i = this[e];
                        let n;
                        if ((!a && i.dom7Listeners ? (n = i.dom7Listeners[t]) : a && i.dom7LiveListeners && (n = i.dom7LiveListeners[t]), n && n.length))
                            for (let e = n.length - 1; e >= 0; e -= 1) {
                                const a = n[e];
                                (s && a.listener === s) || (s && a.listener && a.listener.dom7proxy && a.listener.dom7proxy === s)
                                    ? (i.removeEventListener(t, a.proxyListener, r), n.splice(e, 1))
                                    : s || (i.removeEventListener(t, a.proxyListener, r), n.splice(e, 1));
                            }
                    }
                }
                return this;
            },
            trigger: function () {
                const e = s();
                for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                const a = i[0].split(" "),
                    r = i[1];
                for (let t = 0; t < a.length; t += 1) {
                    const n = a[t];
                    for (let t = 0; t < this.length; t += 1) {
                        const a = this[t];
                        if (e.CustomEvent) {
                            const t = new e.CustomEvent(n, { detail: r, bubbles: !0, cancelable: !0 });
                            (a.dom7EventData = i.filter((e, t) => t > 0)), a.dispatchEvent(t), (a.dom7EventData = []), delete a.dom7EventData;
                        }
                    }
                }
                return this;
            },
            transitionEnd: function (e) {
                const t = this;
                return (
                    e &&
                        t.on("transitionend", function i(n) {
                            n.target === this && (e.call(this, n), t.off("transitionend", i));
                        }),
                    this
                );
            },
            outerWidth: function (e) {
                if (this.length > 0) {
                    if (e) {
                        const e = this.styles();
                        return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"));
                    }
                    return this[0].offsetWidth;
                }
                return null;
            },
            outerHeight: function (e) {
                if (this.length > 0) {
                    if (e) {
                        const e = this.styles();
                        return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"));
                    }
                    return this[0].offsetHeight;
                }
                return null;
            },
            styles: function () {
                const e = s();
                return this[0] ? e.getComputedStyle(this[0], null) : {};
            },
            offset: function () {
                if (this.length > 0) {
                    const e = s(),
                        t = n(),
                        i = this[0],
                        a = i.getBoundingClientRect(),
                        r = t.body,
                        o = i.clientTop || r.clientTop || 0,
                        l = i.clientLeft || r.clientLeft || 0,
                        d = i === e ? e.scrollY : i.scrollTop,
                        c = i === e ? e.scrollX : i.scrollLeft;
                    return { top: a.top + d - o, left: a.left + c - l };
                }
                return null;
            },
            css: function (e, t) {
                const i = s();
                let n;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (n = 0; n < this.length; n += 1) for (const t in e) this[n].style[t] = e[t];
                        return this;
                    }
                    if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e);
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
                    return this;
                }
                return this;
            },
            each: function (e) {
                return e
                    ? (this.forEach((t, i) => {
                          e.apply(t, [t, i]);
                      }),
                      this)
                    : this;
            },
            html: function (e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : null;
                for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                return this;
            },
            text: function (e) {
                if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
                return this;
            },
            is: function (e) {
                const t = s(),
                    i = n(),
                    a = this[0];
                let o, l;
                if (!a || void 0 === e) return !1;
                if ("string" == typeof e) {
                    if (a.matches) return a.matches(e);
                    if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
                    if (a.msMatchesSelector) return a.msMatchesSelector(e);
                    for (o = d(e), l = 0; l < o.length; l += 1) if (o[l] === a) return !0;
                    return !1;
                }
                if (e === i) return a === i;
                if (e === t) return a === t;
                if (e.nodeType || e instanceof r) {
                    for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1) if (o[l] === a) return !0;
                    return !1;
                }
                return !1;
            },
            index: function () {
                let e,
                    t = this[0];
                if (t) {
                    for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                    return e;
                }
            },
            eq: function (e) {
                if (void 0 === e) return this;
                const t = this.length;
                if (e > t - 1) return d([]);
                if (e < 0) {
                    const i = t + e;
                    return d(i < 0 ? [] : [this[i]]);
                }
                return d([this[e]]);
            },
            append: function () {
                let e;
                const t = n();
                for (let i = 0; i < arguments.length; i += 1) {
                    e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                    for (let i = 0; i < this.length; i += 1)
                        if ("string" == typeof e) {
                            const n = t.createElement("div");
                            for (n.innerHTML = e; n.firstChild; ) this[i].appendChild(n.firstChild);
                        } else if (e instanceof r) for (let t = 0; t < e.length; t += 1) this[i].appendChild(e[t]);
                        else this[i].appendChild(e);
                }
                return this;
            },
            prepend: function (e) {
                const t = n();
                let i, a;
                for (i = 0; i < this.length; i += 1)
                    if ("string" == typeof e) {
                        const n = t.createElement("div");
                        for (n.innerHTML = e, a = n.childNodes.length - 1; a >= 0; a -= 1) this[i].insertBefore(n.childNodes[a], this[i].childNodes[0]);
                    } else if (e instanceof r) for (a = 0; a < e.length; a += 1) this[i].insertBefore(e[a], this[i].childNodes[0]);
                    else this[i].insertBefore(e, this[i].childNodes[0]);
                return this;
            },
            next: function (e) {
                return this.length > 0 ? (e ? (this[0].nextElementSibling && d(this[0].nextElementSibling).is(e) ? d([this[0].nextElementSibling]) : d([])) : this[0].nextElementSibling ? d([this[0].nextElementSibling]) : d([])) : d([]);
            },
            nextAll: function (e) {
                const t = [];
                let i = this[0];
                if (!i) return d([]);
                for (; i.nextElementSibling; ) {
                    const n = i.nextElementSibling;
                    e ? d(n).is(e) && t.push(n) : t.push(n), (i = n);
                }
                return d(t);
            },
            prev: function (e) {
                if (this.length > 0) {
                    const t = this[0];
                    return e ? (t.previousElementSibling && d(t.previousElementSibling).is(e) ? d([t.previousElementSibling]) : d([])) : t.previousElementSibling ? d([t.previousElementSibling]) : d([]);
                }
                return d([]);
            },
            prevAll: function (e) {
                const t = [];
                let i = this[0];
                if (!i) return d([]);
                for (; i.previousElementSibling; ) {
                    const n = i.previousElementSibling;
                    e ? d(n).is(e) && t.push(n) : t.push(n), (i = n);
                }
                return d(t);
            },
            parent: function (e) {
                const t = [];
                for (let i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? d(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
                return d(t);
            },
            parents: function (e) {
                const t = [];
                for (let i = 0; i < this.length; i += 1) {
                    let n = this[i].parentNode;
                    for (; n; ) e ? d(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
                }
                return d(t);
            },
            closest: function (e) {
                let t = this;
                return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
            },
            find: function (e) {
                const t = [];
                for (let i = 0; i < this.length; i += 1) {
                    const n = this[i].querySelectorAll(e);
                    for (let e = 0; e < n.length; e += 1) t.push(n[e]);
                }
                return d(t);
            },
            children: function (e) {
                const t = [];
                for (let i = 0; i < this.length; i += 1) {
                    const n = this[i].children;
                    for (let i = 0; i < n.length; i += 1) (e && !d(n[i]).is(e)) || t.push(n[i]);
                }
                return d(t);
            },
            filter: function (e) {
                return d(l(this, e));
            },
            remove: function () {
                for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this;
            },
        };
        function p(e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t);
        }
        function u() {
            return Date.now();
        }
        function h(e, t) {
            void 0 === t && (t = "x");
            const i = s();
            let n, a, r;
            const o = (function (e) {
                const t = s();
                let i;
                return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), i || (i = e.style), i;
            })(e);
            return (
                i.WebKitCSSMatrix
                    ? ((a = o.transform || o.webkitTransform),
                      a.split(",").length > 6 &&
                          (a = a
                              .split(", ")
                              .map((e) => e.replace(",", "."))
                              .join(", ")),
                      (r = new i.WebKitCSSMatrix("none" === a ? "" : a)))
                    : ((r = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")), (n = r.toString().split(","))),
                "x" === t && (a = i.WebKitCSSMatrix ? r.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])),
                "y" === t && (a = i.WebKitCSSMatrix ? r.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])),
                a || 0
            );
        }
        function f(e) {
            return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
        }
        function m(e) {
            return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType);
        }
        function g() {
            const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
                t = ["__proto__", "constructor", "prototype"];
            for (let i = 1; i < arguments.length; i += 1) {
                const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (null != n && !m(n)) {
                    const i = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
                    for (let t = 0, a = i.length; t < a; t += 1) {
                        const a = i[t],
                            s = Object.getOwnPropertyDescriptor(n, a);
                        void 0 !== s && s.enumerable && (f(e[a]) && f(n[a]) ? (n[a].__swiper__ ? (e[a] = n[a]) : g(e[a], n[a])) : !f(e[a]) && f(n[a]) ? ((e[a] = {}), n[a].__swiper__ ? (e[a] = n[a]) : g(e[a], n[a])) : (e[a] = n[a]));
                    }
                }
            }
            return e;
        }
        function v(e, t, i) {
            e.style.setProperty(t, i);
        }
        function w(e) {
            let { swiper: t, targetPosition: i, side: n } = e;
            const a = s(),
                r = -t.translate;
            let o,
                l = null;
            const d = t.params.speed;
            (t.wrapperEl.style.scrollSnapType = "none"), a.cancelAnimationFrame(t.cssModeFrameID);
            const c = i > r ? "next" : "prev",
                p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
                u = () => {
                    (o = new Date().getTime()), null === l && (l = o);
                    const e = Math.max(Math.min((o - l) / d, 1), 0),
                        s = 0.5 - Math.cos(e * Math.PI) / 2;
                    let c = r + s * (i - r);
                    if ((p(c, i) && (c = i), t.wrapperEl.scrollTo({ [n]: c }), p(c, i)))
                        return (
                            (t.wrapperEl.style.overflow = "hidden"),
                            (t.wrapperEl.style.scrollSnapType = ""),
                            setTimeout(() => {
                                (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [n]: c });
                            }),
                            void a.cancelAnimationFrame(t.cssModeFrameID)
                        );
                    t.cssModeFrameID = a.requestAnimationFrame(u);
                };
            u();
        }
        let y, b, _;
        function x() {
            return (
                y ||
                    (y = (function () {
                        const e = s(),
                            t = n();
                        return {
                            smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                            touch: !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
                            passiveListener: (function () {
                                let t = !1;
                                try {
                                    const i = Object.defineProperty({}, "passive", {
                                        get() {
                                            t = !0;
                                        },
                                    });
                                    e.addEventListener("testPassiveListener", null, i);
                                } catch (e) {}
                                return t;
                            })(),
                            gestures: "ongesturestart" in e,
                        };
                    })()),
                y
            );
        }
        function T(e) {
            return (
                void 0 === e && (e = {}),
                b ||
                    (b = (function (e) {
                        let { userAgent: t } = void 0 === e ? {} : e;
                        const i = x(),
                            n = s(),
                            a = n.navigator.platform,
                            r = t || n.navigator.userAgent,
                            o = { ios: !1, android: !1 },
                            l = n.screen.width,
                            d = n.screen.height,
                            c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
                        let p = r.match(/(iPad).*OS\s([\d_]+)/);
                        const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                            h = !p && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                            f = "Win32" === a;
                        let m = "MacIntel" === a;
                        return (
                            !p &&
                                m &&
                                i.touch &&
                                ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${d}`) >= 0 &&
                                ((p = r.match(/(Version)\/([\d.]+)/)), p || (p = [0, 1, "13_0_0"]), (m = !1)),
                            c && !f && ((o.os = "android"), (o.android = !0)),
                            (p || h || u) && ((o.os = "ios"), (o.ios = !0)),
                            o
                        );
                    })(e)),
                b
            );
        }
        function E() {
            return (
                _ ||
                    (_ = (function () {
                        const e = s();
                        return {
                            isSafari: (function () {
                                const t = e.navigator.userAgent.toLowerCase();
                                return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
                            })(),
                            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
                        };
                    })()),
                _
            );
        }
        Object.keys(c).forEach((e) => {
            Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
        });
        var S = {
            on(e, t, i) {
                const n = this;
                if (!n.eventsListeners || n.destroyed) return n;
                if ("function" != typeof t) return n;
                const a = i ? "unshift" : "push";
                return (
                    e.split(" ").forEach((e) => {
                        n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][a](t);
                    }),
                    n
                );
            },
            once(e, t, i) {
                const n = this;
                if (!n.eventsListeners || n.destroyed) return n;
                if ("function" != typeof t) return n;
                function a() {
                    n.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
                    for (var i = arguments.length, s = new Array(i), r = 0; r < i; r++) s[r] = arguments[r];
                    t.apply(n, s);
                }
                return (a.__emitterProxy = t), n.on(e, a, i);
            },
            onAny(e, t) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof e) return i;
                const n = t ? "unshift" : "push";
                return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i;
            },
            offAny(e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsAnyListeners) return t;
                const i = t.eventsAnyListeners.indexOf(e);
                return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
            },
            off(e, t) {
                const i = this;
                return !i.eventsListeners || i.destroyed
                    ? i
                    : i.eventsListeners
                    ? (e.split(" ").forEach((e) => {
                          void 0 === t
                              ? (i.eventsListeners[e] = [])
                              : i.eventsListeners[e] &&
                                i.eventsListeners[e].forEach((n, a) => {
                                    (n === t || (n.__emitterProxy && n.__emitterProxy === t)) && i.eventsListeners[e].splice(a, 1);
                                });
                      }),
                      i)
                    : i;
            },
            emit() {
                const e = this;
                if (!e.eventsListeners || e.destroyed) return e;
                if (!e.eventsListeners) return e;
                let t, i, n;
                for (var a = arguments.length, s = new Array(a), r = 0; r < a; r++) s[r] = arguments[r];
                "string" == typeof s[0] || Array.isArray(s[0]) ? ((t = s[0]), (i = s.slice(1, s.length)), (n = e)) : ((t = s[0].events), (i = s[0].data), (n = s[0].context || e)), i.unshift(n);
                return (
                    (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                        e.eventsAnyListeners &&
                            e.eventsAnyListeners.length &&
                            e.eventsAnyListeners.forEach((e) => {
                                e.apply(n, [t, ...i]);
                            }),
                            e.eventsListeners &&
                                e.eventsListeners[t] &&
                                e.eventsListeners[t].forEach((e) => {
                                    e.apply(n, i);
                                });
                    }),
                    e
                );
            },
        };
        var M = {
            updateSize: function () {
                const e = this;
                let t, i;
                const n = e.$el;
                (t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : n[0].clientWidth),
                    (i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : n[0].clientHeight),
                    (0 === t && e.isHorizontal()) ||
                        (0 === i && e.isVertical()) ||
                        ((t = t - parseInt(n.css("padding-left") || 0, 10) - parseInt(n.css("padding-right") || 0, 10)),
                        (i = i - parseInt(n.css("padding-top") || 0, 10) - parseInt(n.css("padding-bottom") || 0, 10)),
                        Number.isNaN(t) && (t = 0),
                        Number.isNaN(i) && (i = 0),
                        Object.assign(e, { width: t, height: i, size: e.isHorizontal() ? t : i }));
            },
            updateSlides: function () {
                const e = this;
                function t(t) {
                    return e.isHorizontal()
                        ? t
                        : {
                              width: "height",
                              "margin-top": "margin-left",
                              "margin-bottom ": "margin-right",
                              "margin-left": "margin-top",
                              "margin-right": "margin-bottom",
                              "padding-left": "padding-top",
                              "padding-right": "padding-bottom",
                              marginRight: "marginBottom",
                          }[t];
                }
                function i(e, i) {
                    return parseFloat(e.getPropertyValue(t(i)) || 0);
                }
                const n = e.params,
                    { $wrapperEl: a, size: s, rtlTranslate: r, wrongRTL: o } = e,
                    l = e.virtual && n.virtual.enabled,
                    d = l ? e.virtual.slides.length : e.slides.length,
                    c = a.children(`.${e.params.slideClass}`),
                    p = l ? e.virtual.slides.length : c.length;
                let u = [];
                const h = [],
                    f = [];
                let m = n.slidesOffsetBefore;
                "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
                let g = n.slidesOffsetAfter;
                "function" == typeof g && (g = n.slidesOffsetAfter.call(e));
                const w = e.snapGrid.length,
                    y = e.slidesGrid.length;
                let b = n.spaceBetween,
                    _ = -m,
                    x = 0,
                    T = 0;
                if (void 0 === s) return;
                "string" == typeof b && b.indexOf("%") >= 0 && (b = (parseFloat(b.replace("%", "")) / 100) * s),
                    (e.virtualSize = -b),
                    r ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
                    n.centeredSlides && n.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""), v(e.wrapperEl, "--swiper-centered-offset-after", ""));
                const E = n.grid && n.grid.rows > 1 && e.grid;
                let S;
                E && e.grid.initSlides(p);
                const M = "auto" === n.slidesPerView && n.breakpoints && Object.keys(n.breakpoints).filter((e) => void 0 !== n.breakpoints[e].slidesPerView).length > 0;
                for (let a = 0; a < p; a += 1) {
                    S = 0;
                    const r = c.eq(a);
                    if ((E && e.grid.updateSlide(a, r, p, t), "none" !== r.css("display"))) {
                        if ("auto" === n.slidesPerView) {
                            M && (c[a].style[t("width")] = "");
                            const s = getComputedStyle(r[0]),
                                o = r[0].style.transform,
                                l = r[0].style.webkitTransform;
                            if ((o && (r[0].style.transform = "none"), l && (r[0].style.webkitTransform = "none"), n.roundLengths)) S = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
                            else {
                                const e = i(s, "width"),
                                    t = i(s, "padding-left"),
                                    n = i(s, "padding-right"),
                                    a = i(s, "margin-left"),
                                    o = i(s, "margin-right"),
                                    l = s.getPropertyValue("box-sizing");
                                if (l && "border-box" === l) S = e + a + o;
                                else {
                                    const { clientWidth: i, offsetWidth: s } = r[0];
                                    S = e + t + n + a + o + (s - i);
                                }
                            }
                            o && (r[0].style.transform = o), l && (r[0].style.webkitTransform = l), n.roundLengths && (S = Math.floor(S));
                        } else (S = (s - (n.slidesPerView - 1) * b) / n.slidesPerView), n.roundLengths && (S = Math.floor(S)), c[a] && (c[a].style[t("width")] = `${S}px`);
                        c[a] && (c[a].swiperSlideSize = S),
                            f.push(S),
                            n.centeredSlides
                                ? ((_ = _ + S / 2 + x / 2 + b),
                                  0 === x && 0 !== a && (_ = _ - s / 2 - b),
                                  0 === a && (_ = _ - s / 2 - b),
                                  Math.abs(_) < 0.001 && (_ = 0),
                                  n.roundLengths && (_ = Math.floor(_)),
                                  T % n.slidesPerGroup == 0 && u.push(_),
                                  h.push(_))
                                : (n.roundLengths && (_ = Math.floor(_)), (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && u.push(_), h.push(_), (_ = _ + S + b)),
                            (e.virtualSize += S + b),
                            (x = S),
                            (T += 1);
                    }
                }
                if (
                    ((e.virtualSize = Math.max(e.virtualSize, s) + g),
                    r && o && ("slide" === n.effect || "coverflow" === n.effect) && a.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
                    n.setWrapperSize && a.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
                    E && e.grid.updateWrapperSize(S, u, t),
                    !n.centeredSlides)
                ) {
                    const t = [];
                    for (let i = 0; i < u.length; i += 1) {
                        let a = u[i];
                        n.roundLengths && (a = Math.floor(a)), u[i] <= e.virtualSize - s && t.push(a);
                    }
                    (u = t), Math.floor(e.virtualSize - s) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - s);
                }
                if ((0 === u.length && (u = [0]), 0 !== n.spaceBetween)) {
                    const i = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
                    c.filter((e, t) => !n.cssMode || t !== c.length - 1).css({ [i]: `${b}px` });
                }
                if (n.centeredSlides && n.centeredSlidesBounds) {
                    let e = 0;
                    f.forEach((t) => {
                        e += t + (n.spaceBetween ? n.spaceBetween : 0);
                    }),
                        (e -= n.spaceBetween);
                    const t = e - s;
                    u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
                }
                if (n.centerInsufficientSlides) {
                    let e = 0;
                    if (
                        (f.forEach((t) => {
                            e += t + (n.spaceBetween ? n.spaceBetween : 0);
                        }),
                        (e -= n.spaceBetween),
                        e < s)
                    ) {
                        const t = (s - e) / 2;
                        u.forEach((e, i) => {
                            u[i] = e - t;
                        }),
                            h.forEach((e, i) => {
                                h[i] = e + t;
                            });
                    }
                }
                if ((Object.assign(e, { slides: c, snapGrid: u, slidesGrid: h, slidesSizesGrid: f }), n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)) {
                    v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                    const t = -e.snapGrid[0],
                        i = -e.slidesGrid[0];
                    (e.snapGrid = e.snapGrid.map((e) => e + t)), (e.slidesGrid = e.slidesGrid.map((e) => e + i));
                }
                if (
                    (p !== d && e.emit("slidesLengthChange"),
                    u.length !== w && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")),
                    h.length !== y && e.emit("slidesGridLengthChange"),
                    n.watchSlidesProgress && e.updateSlidesOffset(),
                    !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
                ) {
                    const t = `${n.containerModifierClass}backface-hidden`,
                        i = e.$el.hasClass(t);
                    p <= n.maxBackfaceHiddenSlides ? i || e.$el.addClass(t) : i && e.$el.removeClass(t);
                }
            },
            updateAutoHeight: function (e) {
                const t = this,
                    i = [],
                    n = t.virtual && t.params.virtual.enabled;
                let a,
                    s = 0;
                "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                const r = (e) => (n ? t.slides.filter((t) => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0]);
                if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                    if (t.params.centeredSlides)
                        (t.visibleSlides || d([])).each((e) => {
                            i.push(e);
                        });
                    else
                        for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
                            const e = t.activeIndex + a;
                            if (e > t.slides.length && !n) break;
                            i.push(r(e));
                        }
                else i.push(r(t.activeIndex));
                for (a = 0; a < i.length; a += 1)
                    if (void 0 !== i[a]) {
                        const e = i[a].offsetHeight;
                        s = e > s ? e : s;
                    }
                (s || 0 === s) && t.$wrapperEl.css("height", `${s}px`);
            },
            updateSlidesOffset: function () {
                const e = this,
                    t = e.slides;
                for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop;
            },
            updateSlidesProgress: function (e) {
                void 0 === e && (e = (this && this.translate) || 0);
                const t = this,
                    i = t.params,
                    { slides: n, rtlTranslate: a, snapGrid: s } = t;
                if (0 === n.length) return;
                void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
                let r = -e;
                a && (r = e), n.removeClass(i.slideVisibleClass), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
                for (let e = 0; e < n.length; e += 1) {
                    const o = n[e];
                    let l = o.swiperSlideOffset;
                    i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
                    const d = (r + (i.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + i.spaceBetween),
                        c = (r - s[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + i.spaceBetween),
                        p = -(r - l),
                        u = p + t.slidesSizesGrid[e];
                    ((p >= 0 && p < t.size - 1) || (u > 1 && u <= t.size) || (p <= 0 && u >= t.size)) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), n.eq(e).addClass(i.slideVisibleClass)),
                        (o.progress = a ? -d : d),
                        (o.originalProgress = a ? -c : c);
                }
                t.visibleSlides = d(t.visibleSlides);
            },
            updateProgress: function (e) {
                const t = this;
                if (void 0 === e) {
                    const i = t.rtlTranslate ? -1 : 1;
                    e = (t && t.translate && t.translate * i) || 0;
                }
                const i = t.params,
                    n = t.maxTranslate() - t.minTranslate();
                let { progress: a, isBeginning: s, isEnd: r } = t;
                const o = s,
                    l = r;
                0 === n ? ((a = 0), (s = !0), (r = !0)) : ((a = (e - t.minTranslate()) / n), (s = a <= 0), (r = a >= 1)),
                    Object.assign(t, { progress: a, isBeginning: s, isEnd: r }),
                    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) && t.updateSlidesProgress(e),
                    s && !o && t.emit("reachBeginning toEdge"),
                    r && !l && t.emit("reachEnd toEdge"),
                    ((o && !s) || (l && !r)) && t.emit("fromEdge"),
                    t.emit("progress", a);
            },
            updateSlidesClasses: function () {
                const e = this,
                    { slides: t, params: i, $wrapperEl: n, activeIndex: a, realIndex: s } = e,
                    r = e.virtual && i.virtual.enabled;
                let o;
                t.removeClass(`${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`),
                    (o = r ? e.$wrapperEl.find(`.${i.slideClass}[data-swiper-slide-index="${a}"]`) : t.eq(a)),
                    o.addClass(i.slideActiveClass),
                    i.loop &&
                        (o.hasClass(i.slideDuplicateClass)
                            ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass)
                            : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass));
                let l = o.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(i.slideNextClass));
                let d = o.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
                    i.loop &&
                        (l.hasClass(i.slideDuplicateClass)
                            ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass)
                            : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass),
                        d.hasClass(i.slideDuplicateClass)
                            ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass)
                            : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass)),
                    e.emitSlidesClasses();
            },
            updateActiveIndex: function (e) {
                const t = this,
                    i = t.rtlTranslate ? t.translate : -t.translate,
                    { slidesGrid: n, snapGrid: a, params: s, activeIndex: r, realIndex: o, snapIndex: l } = t;
                let d,
                    c = e;
                if (void 0 === c) {
                    for (let e = 0; e < n.length; e += 1) void 0 !== n[e + 1] ? (i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2 ? (c = e) : i >= n[e] && i < n[e + 1] && (c = e + 1)) : i >= n[e] && (c = e);
                    s.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
                }
                if (a.indexOf(i) >= 0) d = a.indexOf(i);
                else {
                    const e = Math.min(s.slidesPerGroupSkip, c);
                    d = e + Math.floor((c - e) / s.slidesPerGroup);
                }
                if ((d >= a.length && (d = a.length - 1), c === r)) return void (d !== l && ((t.snapIndex = d), t.emit("snapIndexChange")));
                const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                Object.assign(t, { snapIndex: d, realIndex: p, previousIndex: r, activeIndex: c }),
                    t.emit("activeIndexChange"),
                    t.emit("snapIndexChange"),
                    o !== p && t.emit("realIndexChange"),
                    (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
            },
            updateClickedSlide: function (e) {
                const t = this,
                    i = t.params,
                    n = d(e).closest(`.${i.slideClass}`)[0];
                let a,
                    s = !1;
                if (n)
                    for (let e = 0; e < t.slides.length; e += 1)
                        if (t.slides[e] === n) {
                            (s = !0), (a = e);
                            break;
                        }
                if (!n || !s) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
                (t.clickedSlide = n),
                    t.virtual && t.params.virtual.enabled ? (t.clickedIndex = parseInt(d(n).attr("data-swiper-slide-index"), 10)) : (t.clickedIndex = a),
                    i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
            },
        };
        var C = {
            getTranslate: function (e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                const { params: t, rtlTranslate: i, translate: n, $wrapperEl: a } = this;
                if (t.virtualTranslate) return i ? -n : n;
                if (t.cssMode) return n;
                let s = h(a[0], e);
                return i && (s = -s), s || 0;
            },
            setTranslate: function (e, t) {
                const i = this,
                    { rtlTranslate: n, params: a, $wrapperEl: s, wrapperEl: r, progress: o } = i;
                let l,
                    d = 0,
                    c = 0;
                i.isHorizontal() ? (d = n ? -e : e) : (c = e),
                    a.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
                    a.cssMode ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -d : -c) : a.virtualTranslate || s.transform(`translate3d(${d}px, ${c}px, 0px)`),
                    (i.previousTranslate = i.translate),
                    (i.translate = i.isHorizontal() ? d : c);
                const p = i.maxTranslate() - i.minTranslate();
                (l = 0 === p ? 0 : (e - i.minTranslate()) / p), l !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
            },
            minTranslate: function () {
                return -this.snapGrid[0];
            },
            maxTranslate: function () {
                return -this.snapGrid[this.snapGrid.length - 1];
            },
            translateTo: function (e, t, i, n, a) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === n && (n = !0);
                const s = this,
                    { params: r, wrapperEl: o } = s;
                if (s.animating && r.preventInteractionOnTransition) return !1;
                const l = s.minTranslate(),
                    d = s.maxTranslate();
                let c;
                if (((c = n && e > l ? l : n && e < d ? d : e), s.updateProgress(c), r.cssMode)) {
                    const e = s.isHorizontal();
                    if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
                    else {
                        if (!s.support.smoothScroll) return w({ swiper: s, targetPosition: -c, side: e ? "left" : "top" }), !0;
                        o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
                    }
                    return !0;
                }
                return (
                    0 === t
                        ? (s.setTransition(0), s.setTranslate(c), i && (s.emit("beforeTransitionStart", t, a), s.emit("transitionEnd")))
                        : (s.setTransition(t),
                          s.setTranslate(c),
                          i && (s.emit("beforeTransitionStart", t, a), s.emit("transitionStart")),
                          s.animating ||
                              ((s.animating = !0),
                              s.onTranslateToWrapperTransitionEnd ||
                                  (s.onTranslateToWrapperTransitionEnd = function (e) {
                                      s &&
                                          !s.destroyed &&
                                          e.target === this &&
                                          (s.$wrapperEl[0].removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
                                          s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd),
                                          (s.onTranslateToWrapperTransitionEnd = null),
                                          delete s.onTranslateToWrapperTransitionEnd,
                                          i && s.emit("transitionEnd"));
                                  }),
                              s.$wrapperEl[0].addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
                              s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd))),
                    !0
                );
            },
        };
        function P(e) {
            let { swiper: t, runCallbacks: i, direction: n, step: a } = e;
            const { activeIndex: s, previousIndex: r } = t;
            let o = n;
            if ((o || (o = s > r ? "next" : s < r ? "prev" : "reset"), t.emit(`transition${a}`), i && s !== r)) {
                if ("reset" === o) return void t.emit(`slideResetTransition${a}`);
                t.emit(`slideChangeTransition${a}`), "next" === o ? t.emit(`slideNextTransition${a}`) : t.emit(`slidePrevTransition${a}`);
            }
        }
        var A = {
            slideTo: function (e, t, i, n, a) {
                if ((void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "number" != typeof e && "string" != typeof e))
                    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                if ("string" == typeof e) {
                    const t = parseInt(e, 10);
                    if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                    e = t;
                }
                const s = this;
                let r = e;
                r < 0 && (r = 0);
                const { params: o, snapGrid: l, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: f } = s;
                if ((s.animating && o.preventInteractionOnTransition) || (!f && !n && !a)) return !1;
                const m = Math.min(s.params.slidesPerGroupSkip, r);
                let g = m + Math.floor((r - m) / s.params.slidesPerGroup);
                g >= l.length && (g = l.length - 1), (p || o.initialSlide || 0) === (c || 0) && i && s.emit("beforeSlideChangeStart");
                const v = -l[g];
                if ((s.updateProgress(v), o.normalizeSlideIndex))
                    for (let e = 0; e < d.length; e += 1) {
                        const t = -Math.floor(100 * v),
                            i = Math.floor(100 * d[e]),
                            n = Math.floor(100 * d[e + 1]);
                        void 0 !== d[e + 1] ? (t >= i && t < n - (n - i) / 2 ? (r = e) : t >= i && t < n && (r = e + 1)) : t >= i && (r = e);
                    }
                if (s.initialized && r !== p) {
                    if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
                    if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1;
                }
                let y;
                if (((y = r > p ? "next" : r < p ? "prev" : "reset"), (u && -v === s.translate) || (!u && v === s.translate)))
                    return s.updateActiveIndex(r), o.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== o.effect && s.setTranslate(v), "reset" !== y && (s.transitionStart(i, y), s.transitionEnd(i, y)), !1;
                if (o.cssMode) {
                    const e = s.isHorizontal(),
                        i = u ? v : -v;
                    if (0 === t) {
                        const t = s.virtual && s.params.virtual.enabled;
                        t && ((s.wrapperEl.style.scrollSnapType = "none"), (s._immediateVirtual = !0)),
                            (h[e ? "scrollLeft" : "scrollTop"] = i),
                            t &&
                                requestAnimationFrame(() => {
                                    (s.wrapperEl.style.scrollSnapType = ""), (s._swiperImmediateVirtual = !1);
                                });
                    } else {
                        if (!s.support.smoothScroll) return w({ swiper: s, targetPosition: i, side: e ? "left" : "top" }), !0;
                        h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
                    }
                    return !0;
                }
                return (
                    s.setTransition(t),
                    s.setTranslate(v),
                    s.updateActiveIndex(r),
                    s.updateSlidesClasses(),
                    s.emit("beforeTransitionStart", t, n),
                    s.transitionStart(i, y),
                    0 === t
                        ? s.transitionEnd(i, y)
                        : s.animating ||
                          ((s.animating = !0),
                          s.onSlideToWrapperTransitionEnd ||
                              (s.onSlideToWrapperTransitionEnd = function (e) {
                                  s &&
                                      !s.destroyed &&
                                      e.target === this &&
                                      (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                                      s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd),
                                      (s.onSlideToWrapperTransitionEnd = null),
                                      delete s.onSlideToWrapperTransitionEnd,
                                      s.transitionEnd(i, y));
                              }),
                          s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                          s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd)),
                    !0
                );
            },
            slideToLoop: function (e, t, i, n) {
                if ((void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "string" == typeof e)) {
                    const t = parseInt(e, 10);
                    if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                    e = t;
                }
                const a = this;
                let s = e;
                return a.params.loop && (s += a.loopedSlides), a.slideTo(s, t, i, n);
            },
            slideNext: function (e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const n = this,
                    { animating: a, enabled: s, params: r } = n;
                if (!s) return n;
                let o = r.slidesPerGroup;
                "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
                const l = n.activeIndex < r.slidesPerGroupSkip ? 1 : o;
                if (r.loop) {
                    if (a && r.loopPreventsSlide) return !1;
                    n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
                }
                return r.rewind && n.isEnd ? n.slideTo(0, e, t, i) : n.slideTo(n.activeIndex + l, e, t, i);
            },
            slidePrev: function (e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const n = this,
                    { params: a, animating: s, snapGrid: r, slidesGrid: o, rtlTranslate: l, enabled: d } = n;
                if (!d) return n;
                if (a.loop) {
                    if (s && a.loopPreventsSlide) return !1;
                    n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
                }
                function c(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
                }
                const p = c(l ? n.translate : -n.translate),
                    u = r.map((e) => c(e));
                let h = r[u.indexOf(p) - 1];
                if (void 0 === h && a.cssMode) {
                    let e;
                    r.forEach((t, i) => {
                        p >= t && (e = i);
                    }),
                        void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
                }
                let f = 0;
                if (
                    (void 0 !== h &&
                        ((f = o.indexOf(h)), f < 0 && (f = n.activeIndex - 1), "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && ((f = f - n.slidesPerViewDynamic("previous", !0) + 1), (f = Math.max(f, 0)))),
                    a.rewind && n.isBeginning)
                ) {
                    const a = n.params.virtual && n.params.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
                    return n.slideTo(a, e, t, i);
                }
                return n.slideTo(f, e, t, i);
            },
            slideReset: function (e, t, i) {
                return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
            },
            slideToClosest: function (e, t, i, n) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === n && (n = 0.5);
                const a = this;
                let s = a.activeIndex;
                const r = Math.min(a.params.slidesPerGroupSkip, s),
                    o = r + Math.floor((s - r) / a.params.slidesPerGroup),
                    l = a.rtlTranslate ? a.translate : -a.translate;
                if (l >= a.snapGrid[o]) {
                    const e = a.snapGrid[o];
                    l - e > (a.snapGrid[o + 1] - e) * n && (s += a.params.slidesPerGroup);
                } else {
                    const e = a.snapGrid[o - 1];
                    l - e <= (a.snapGrid[o] - e) * n && (s -= a.params.slidesPerGroup);
                }
                return (s = Math.max(s, 0)), (s = Math.min(s, a.slidesGrid.length - 1)), a.slideTo(s, e, t, i);
            },
            slideToClickedSlide: function () {
                const e = this,
                    { params: t, $wrapperEl: i } = e,
                    n = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                let a,
                    s = e.clickedIndex;
                if (t.loop) {
                    if (e.animating) return;
                    (a = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
                        t.centeredSlides
                            ? s < e.loopedSlides - n / 2 || s > e.slides.length - e.loopedSlides + n / 2
                                ? (e.loopFix(),
                                  (s = i.children(`.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
                                  p(() => {
                                      e.slideTo(s);
                                  }))
                                : e.slideTo(s)
                            : s > e.slides.length - n
                            ? (e.loopFix(),
                              (s = i.children(`.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
                              p(() => {
                                  e.slideTo(s);
                              }))
                            : e.slideTo(s);
                } else e.slideTo(s);
            },
        };
        var $ = {
            loopCreate: function () {
                const e = this,
                    t = n(),
                    { params: i, $wrapperEl: a } = e,
                    s = a.children().length > 0 ? d(a.children()[0].parentNode) : a;
                s.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
                let r = s.children(`.${i.slideClass}`);
                if (i.loopFillGroupWithBlank) {
                    const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
                    if (e !== i.slidesPerGroup) {
                        for (let n = 0; n < e; n += 1) {
                            const e = d(t.createElement("div")).addClass(`${i.slideClass} ${i.slideBlankClass}`);
                            s.append(e);
                        }
                        r = s.children(`.${i.slideClass}`);
                    }
                }
                "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length),
                    (e.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10))),
                    (e.loopedSlides += i.loopAdditionalSlides),
                    e.loopedSlides > r.length && (e.loopedSlides = r.length);
                const o = [],
                    l = [];
                r.each((t, i) => {
                    const n = d(t);
                    i < e.loopedSlides && l.push(t), i < r.length && i >= r.length - e.loopedSlides && o.push(t), n.attr("data-swiper-slide-index", i);
                });
                for (let e = 0; e < l.length; e += 1) s.append(d(l[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
                for (let e = o.length - 1; e >= 0; e -= 1) s.prepend(d(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
            },
            loopFix: function () {
                const e = this;
                e.emit("beforeLoopFix");
                const { activeIndex: t, slides: i, loopedSlides: n, allowSlidePrev: a, allowSlideNext: s, snapGrid: r, rtlTranslate: o } = e;
                let l;
                (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
                const d = -r[t] - e.getTranslate();
                if (t < n) {
                    (l = i.length - 3 * n + t), (l += n);
                    e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d);
                } else if (t >= i.length - n) {
                    (l = -i.length + t + n), (l += n);
                    e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d);
                }
                (e.allowSlidePrev = a), (e.allowSlideNext = s), e.emit("loopFix");
            },
            loopDestroy: function () {
                const { $wrapperEl: e, params: t, slides: i } = this;
                e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), i.removeAttr("data-swiper-slide-index");
            },
        };
        function z(e) {
            const t = this,
                i = n(),
                a = s(),
                r = t.touchEventsData,
                { params: o, touches: l, enabled: c } = t;
            if (!c) return;
            if (t.animating && o.preventInteractionOnTransition) return;
            !t.animating && o.cssMode && o.loop && t.loopFix();
            let p = e;
            p.originalEvent && (p = p.originalEvent);
            let h = d(p.target);
            if ("wrapper" === o.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
            if (((r.isTouchEvent = "touchstart" === p.type), !r.isTouchEvent && "which" in p && 3 === p.which)) return;
            if (!r.isTouchEvent && "button" in p && p.button > 0) return;
            if (r.isTouched && r.isMoved) return;
            !!o.noSwipingClass && "" !== o.noSwipingClass && p.target && p.target.shadowRoot && e.path && e.path[0] && (h = d(e.path[0]));
            const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
                m = !(!p.target || !p.target.shadowRoot);
            if (
                o.noSwiping &&
                (m
                    ? (function (e, t) {
                          return (
                              void 0 === t && (t = this),
                              (function t(i) {
                                  if (!i || i === n() || i === s()) return null;
                                  i.assignedSlot && (i = i.assignedSlot);
                                  const a = i.closest(e);
                                  return a || i.getRootNode ? a || t(i.getRootNode().host) : null;
                              })(t)
                          );
                      })(f, h[0])
                    : h.closest(f)[0])
            )
                return void (t.allowClick = !0);
            if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
            (l.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX), (l.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY);
            const g = l.currentX,
                v = l.currentY,
                w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
                y = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
            if (w && (g <= y || g >= a.innerWidth - y)) {
                if ("prevent" !== w) return;
                e.preventDefault();
            }
            if (
                (Object.assign(r, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
                (l.startX = g),
                (l.startY = v),
                (r.touchStartTime = u()),
                (t.allowClick = !0),
                t.updateSize(),
                (t.swipeDirection = void 0),
                o.threshold > 0 && (r.allowThresholdMove = !1),
                "touchstart" !== p.type)
            ) {
                let e = !0;
                h.is(r.focusableElements) && ((e = !1), "SELECT" === h[0].nodeName && (r.isTouched = !1)), i.activeElement && d(i.activeElement).is(r.focusableElements) && i.activeElement !== h[0] && i.activeElement.blur();
                const n = e && t.allowTouchMove && o.touchStartPreventDefault;
                (!o.touchStartForcePreventDefault && !n) || h[0].isContentEditable || p.preventDefault();
            }
            t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", p);
        }
        function k(e) {
            const t = n(),
                i = this,
                a = i.touchEventsData,
                { params: s, touches: r, rtlTranslate: o, enabled: l } = i;
            if (!l) return;
            let c = e;
            if ((c.originalEvent && (c = c.originalEvent), !a.isTouched)) return void (a.startMoving && a.isScrolling && i.emit("touchMoveOpposite", c));
            if (a.isTouchEvent && "touchmove" !== c.type) return;
            const p = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0]),
                h = "touchmove" === c.type ? p.pageX : c.pageX,
                f = "touchmove" === c.type ? p.pageY : c.pageY;
            if (c.preventedByNestedSwiper) return (r.startX = h), void (r.startY = f);
            if (!i.allowTouchMove) return d(c.target).is(a.focusableElements) || (i.allowClick = !1), void (a.isTouched && (Object.assign(r, { startX: h, startY: f, currentX: h, currentY: f }), (a.touchStartTime = u())));
            if (a.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                if (i.isVertical()) {
                    if ((f < r.startY && i.translate <= i.maxTranslate()) || (f > r.startY && i.translate >= i.minTranslate())) return (a.isTouched = !1), void (a.isMoved = !1);
                } else if ((h < r.startX && i.translate <= i.maxTranslate()) || (h > r.startX && i.translate >= i.minTranslate())) return;
            if (a.isTouchEvent && t.activeElement && c.target === t.activeElement && d(c.target).is(a.focusableElements)) return (a.isMoved = !0), void (i.allowClick = !1);
            if ((a.allowTouchCallbacks && i.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1)) return;
            (r.currentX = h), (r.currentY = f);
            const m = r.currentX - r.startX,
                g = r.currentY - r.startY;
            if (i.params.threshold && Math.sqrt(m ** 2 + g ** 2) < i.params.threshold) return;
            if (void 0 === a.isScrolling) {
                let e;
                (i.isHorizontal() && r.currentY === r.startY) || (i.isVertical() && r.currentX === r.startX)
                    ? (a.isScrolling = !1)
                    : m * m + g * g >= 25 && ((e = (180 * Math.atan2(Math.abs(g), Math.abs(m))) / Math.PI), (a.isScrolling = i.isHorizontal() ? e > s.touchAngle : 90 - e > s.touchAngle));
            }
            if ((a.isScrolling && i.emit("touchMoveOpposite", c), void 0 === a.startMoving && ((r.currentX === r.startX && r.currentY === r.startY) || (a.startMoving = !0)), a.isScrolling)) return void (a.isTouched = !1);
            if (!a.startMoving) return;
            (i.allowClick = !1),
                !s.cssMode && c.cancelable && c.preventDefault(),
                s.touchMoveStopPropagation && !s.nested && c.stopPropagation(),
                a.isMoved ||
                    (s.loop && !s.cssMode && i.loopFix(),
                    (a.startTranslate = i.getTranslate()),
                    i.setTransition(0),
                    i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                    (a.allowMomentumBounce = !1),
                    !s.grabCursor || (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) || i.setGrabCursor(!0),
                    i.emit("sliderFirstMove", c)),
                i.emit("sliderMove", c),
                (a.isMoved = !0);
            let v = i.isHorizontal() ? m : g;
            (r.diff = v), (v *= s.touchRatio), o && (v = -v), (i.swipeDirection = v > 0 ? "prev" : "next"), (a.currentTranslate = v + a.startTranslate);
            let w = !0,
                y = s.resistanceRatio;
            if (
                (s.touchReleaseOnEdges && (y = 0),
                v > 0 && a.currentTranslate > i.minTranslate()
                    ? ((w = !1), s.resistance && (a.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + a.startTranslate + v) ** y))
                    : v < 0 && a.currentTranslate < i.maxTranslate() && ((w = !1), s.resistance && (a.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - a.startTranslate - v) ** y)),
                w && (c.preventedByNestedSwiper = !0),
                !i.allowSlideNext && "next" === i.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate),
                !i.allowSlidePrev && "prev" === i.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate),
                i.allowSlidePrev || i.allowSlideNext || (a.currentTranslate = a.startTranslate),
                s.threshold > 0)
            ) {
                if (!(Math.abs(v) > s.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
                if (!a.allowThresholdMove)
                    return (a.allowThresholdMove = !0), (r.startX = r.currentX), (r.startY = r.currentY), (a.currentTranslate = a.startTranslate), void (r.diff = i.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY);
            }
            s.followFinger &&
                !s.cssMode &&
                (((s.freeMode && s.freeMode.enabled && i.freeMode) || s.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()),
                i.params.freeMode && s.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
                i.updateProgress(a.currentTranslate),
                i.setTranslate(a.currentTranslate));
        }
        function O(e) {
            const t = this,
                i = t.touchEventsData,
                { params: n, touches: a, rtlTranslate: s, slidesGrid: r, enabled: o } = t;
            if (!o) return;
            let l = e;
            if ((l.originalEvent && (l = l.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", l), (i.allowTouchCallbacks = !1), !i.isTouched))
                return i.isMoved && n.grabCursor && t.setGrabCursor(!1), (i.isMoved = !1), void (i.startMoving = !1);
            n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
            const d = u(),
                c = d - i.touchStartTime;
            if (t.allowClick) {
                const e = l.path || (l.composedPath && l.composedPath());
                t.updateClickedSlide((e && e[0]) || l.target), t.emit("tap click", l), c < 300 && d - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", l);
            }
            if (
                ((i.lastClickTime = u()),
                p(() => {
                    t.destroyed || (t.allowClick = !0);
                }),
                !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
            )
                return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
            let h;
            if (((i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1), (h = n.followFinger ? (s ? t.translate : -t.translate) : -i.currentTranslate), n.cssMode)) return;
            if (t.params.freeMode && n.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: h });
            let f = 0,
                m = t.slidesSizesGrid[0];
            for (let e = 0; e < r.length; e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
                const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                void 0 !== r[e + t] ? h >= r[e] && h < r[e + t] && ((f = e), (m = r[e + t] - r[e])) : h >= r[e] && ((f = e), (m = r[r.length - 1] - r[r.length - 2]));
            }
            let g = null,
                v = null;
            n.rewind && (t.isBeginning ? (v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1) : t.isEnd && (g = 0));
            const w = (h - r[f]) / m,
                y = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
            if (c > n.longSwipesMs) {
                if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && (w >= n.longSwipesRatio ? t.slideTo(n.rewind && t.isEnd ? g : f + y) : t.slideTo(f)),
                    "prev" === t.swipeDirection && (w > 1 - n.longSwipesRatio ? t.slideTo(f + y) : null !== v && w < 0 && Math.abs(w) > n.longSwipesRatio ? t.slideTo(v) : t.slideTo(f));
            } else {
                if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                t.navigation && (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
                    ? l.target === t.navigation.nextEl
                        ? t.slideTo(f + y)
                        : t.slideTo(f)
                    : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + y), "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f));
            }
        }
        function I() {
            const e = this,
                { params: t, el: i } = e;
            if (i && 0 === i.offsetWidth) return;
            t.breakpoints && e.setBreakpoint();
            const { allowSlideNext: n, allowSlidePrev: a, snapGrid: s } = e;
            (e.allowSlideNext = !0),
                (e.allowSlidePrev = !0),
                e.updateSize(),
                e.updateSlides(),
                e.updateSlidesClasses(),
                ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
                e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
                (e.allowSlidePrev = a),
                (e.allowSlideNext = n),
                e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
        }
        function D(e) {
            const t = this;
            t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
        }
        function L() {
            const e = this,
                { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
            if (!n) return;
            let a;
            (e.previousTranslate = e.translate), e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop), 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
            const s = e.maxTranslate() - e.minTranslate();
            (a = 0 === s ? 0 : (e.translate - e.minTranslate()) / s), a !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
        }
        let F = !1;
        function H() {}
        const R = (e, t) => {
            const i = n(),
                { params: a, touchEvents: s, el: r, wrapperEl: o, device: l, support: d } = e,
                c = !!a.nested,
                p = "on" === t ? "addEventListener" : "removeEventListener",
                u = t;
            if (d.touch) {
                const t = !("touchstart" !== s.start || !d.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 };
                r[p](s.start, e.onTouchStart, t), r[p](s.move, e.onTouchMove, d.passiveListener ? { passive: !1, capture: c } : c), r[p](s.end, e.onTouchEnd, t), s.cancel && r[p](s.cancel, e.onTouchEnd, t);
            } else r[p](s.start, e.onTouchStart, !1), i[p](s.move, e.onTouchMove, c), i[p](s.end, e.onTouchEnd, !1);
            (a.preventClicks || a.preventClicksPropagation) && r[p]("click", e.onClick, !0),
                a.cssMode && o[p]("scroll", e.onScroll),
                a.updateOnWindowResize ? e[u](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", I, !0) : e[u]("observerUpdate", I, !0);
        };
        var G = {
            attachEvents: function () {
                const e = this,
                    t = n(),
                    { params: i, support: a } = e;
                (e.onTouchStart = z.bind(e)),
                    (e.onTouchMove = k.bind(e)),
                    (e.onTouchEnd = O.bind(e)),
                    i.cssMode && (e.onScroll = L.bind(e)),
                    (e.onClick = D.bind(e)),
                    a.touch && !F && (t.addEventListener("touchstart", H), (F = !0)),
                    R(e, "on");
            },
            detachEvents: function () {
                R(this, "off");
            },
        };
        const W = (e, t) => e.grid && t.grid && t.grid.rows > 1;
        var N = {
            addClasses: function () {
                const e = this,
                    { classNames: t, params: i, rtl: n, $el: a, device: s, support: r } = e,
                    o = (function (e, t) {
                        const i = [];
                        return (
                            e.forEach((e) => {
                                "object" == typeof e
                                    ? Object.keys(e).forEach((n) => {
                                          e[n] && i.push(t + n);
                                      })
                                    : "string" == typeof e && i.push(t + e);
                            }),
                            i
                        );
                    })(
                        [
                            "initialized",
                            i.direction,
                            { "pointer-events": !r.touch },
                            { "free-mode": e.params.freeMode && i.freeMode.enabled },
                            { autoheight: i.autoHeight },
                            { rtl: n },
                            { grid: i.grid && i.grid.rows > 1 },
                            { "grid-column": i.grid && i.grid.rows > 1 && "column" === i.grid.fill },
                            { android: s.android },
                            { ios: s.ios },
                            { "css-mode": i.cssMode },
                            { centered: i.cssMode && i.centeredSlides },
                            { "watch-progress": i.watchSlidesProgress },
                        ],
                        i.containerModifierClass
                    );
                t.push(...o), a.addClass([...t].join(" ")), e.emitContainerClasses();
            },
            removeClasses: function () {
                const { $el: e, classNames: t } = this;
                e.removeClass(t.join(" ")), this.emitContainerClasses();
            },
        };
        var X = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            enabled: !0,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1,
        };
        function j(e, t) {
            return function (i) {
                void 0 === i && (i = {});
                const n = Object.keys(i)[0],
                    a = i[n];
                "object" == typeof a && null !== a
                    ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 && !0 === e[n] && (e[n] = { auto: !0 }),
                      n in e && "enabled" in a ? (!0 === e[n] && (e[n] = { enabled: !0 }), "object" != typeof e[n] || "enabled" in e[n] || (e[n].enabled = !0), e[n] || (e[n] = { enabled: !1 }), g(t, i)) : g(t, i))
                    : g(t, i);
            };
        }
        const B = {
                eventsEmitter: S,
                update: M,
                translate: C,
                transition: {
                    setTransition: function (e, t) {
                        const i = this;
                        i.params.cssMode || i.$wrapperEl.transition(e), i.emit("setTransition", e, t);
                    },
                    transitionStart: function (e, t) {
                        void 0 === e && (e = !0);
                        const i = this,
                            { params: n } = i;
                        n.cssMode || (n.autoHeight && i.updateAutoHeight(), P({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
                    },
                    transitionEnd: function (e, t) {
                        void 0 === e && (e = !0);
                        const i = this,
                            { params: n } = i;
                        (i.animating = !1), n.cssMode || (i.setTransition(0), P({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
                    },
                },
                slide: A,
                loop: $,
                grabCursor: {
                    setGrabCursor: function (e) {
                        const t = this;
                        if (t.support.touch || !t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode) return;
                        const i = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                        (i.style.cursor = "move"), (i.style.cursor = e ? "grabbing" : "grab");
                    },
                    unsetGrabCursor: function () {
                        const e = this;
                        e.support.touch || (e.params.watchOverflow && e.isLocked) || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "");
                    },
                },
                events: G,
                breakpoints: {
                    setBreakpoint: function () {
                        const e = this,
                            { activeIndex: t, initialized: i, loopedSlides: n = 0, params: a, $el: s } = e,
                            r = a.breakpoints;
                        if (!r || (r && 0 === Object.keys(r).length)) return;
                        const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
                        if (!o || e.currentBreakpoint === o) return;
                        const l = (o in r ? r[o] : void 0) || e.originalParams,
                            d = W(e, a),
                            c = W(e, l),
                            p = a.enabled;
                        d && !c
                            ? (s.removeClass(`${a.containerModifierClass}grid ${a.containerModifierClass}grid-column`), e.emitContainerClasses())
                            : !d &&
                              c &&
                              (s.addClass(`${a.containerModifierClass}grid`),
                              ((l.grid.fill && "column" === l.grid.fill) || (!l.grid.fill && "column" === a.grid.fill)) && s.addClass(`${a.containerModifierClass}grid-column`),
                              e.emitContainerClasses()),
                            ["navigation", "pagination", "scrollbar"].forEach((t) => {
                                const i = a[t] && a[t].enabled,
                                    n = l[t] && l[t].enabled;
                                i && !n && e[t].disable(), !i && n && e[t].enable();
                            });
                        const u = l.direction && l.direction !== a.direction,
                            h = a.loop && (l.slidesPerView !== a.slidesPerView || u);
                        u && i && e.changeDirection(), g(e.params, l);
                        const f = e.params.enabled;
                        Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }),
                            p && !f ? e.disable() : !p && f && e.enable(),
                            (e.currentBreakpoint = o),
                            e.emit("_beforeBreakpoint", l),
                            h && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - n + e.loopedSlides, 0, !1)),
                            e.emit("breakpoint", l);
                    },
                    getBreakpoint: function (e, t, i) {
                        if ((void 0 === t && (t = "window"), !e || ("container" === t && !i))) return;
                        let n = !1;
                        const a = s(),
                            r = "window" === t ? a.innerHeight : i.clientHeight,
                            o = Object.keys(e).map((e) => {
                                if ("string" == typeof e && 0 === e.indexOf("@")) {
                                    const t = parseFloat(e.substr(1));
                                    return { value: r * t, point: e };
                                }
                                return { value: e, point: e };
                            });
                        o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                        for (let e = 0; e < o.length; e += 1) {
                            const { point: s, value: r } = o[e];
                            "window" === t ? a.matchMedia(`(min-width: ${r}px)`).matches && (n = s) : r <= i.clientWidth && (n = s);
                        }
                        return n || "max";
                    },
                },
                checkOverflow: {
                    checkOverflow: function () {
                        const e = this,
                            { isLocked: t, params: i } = e,
                            { slidesOffsetBefore: n } = i;
                        if (n) {
                            const t = e.slides.length - 1,
                                i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                            e.isLocked = e.size > i;
                        } else e.isLocked = 1 === e.snapGrid.length;
                        !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                            t && t !== e.isLocked && (e.isEnd = !1),
                            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
                    },
                },
                classes: N,
                images: {
                    loadImage: function (e, t, i, n, a, r) {
                        const o = s();
                        let l;
                        function c() {
                            r && r();
                        }
                        d(e).parent("picture")[0] || (e.complete && a) ? c() : t ? ((l = new o.Image()), (l.onload = c), (l.onerror = c), n && (l.sizes = n), i && (l.srcset = i), t && (l.src = t)) : c();
                    },
                    preloadImages: function () {
                        const e = this;
                        function t() {
                            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
                        }
                        e.imagesToLoad = e.$el.find("img");
                        for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                            const n = e.imagesToLoad[i];
                            e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t);
                        }
                    },
                },
            },
            Y = {};
        class q {
            constructor() {
                let e, t;
                for (var i = arguments.length, n = new Array(i), a = 0; a < i; a++) n[a] = arguments[a];
                if ((1 === n.length && n[0].constructor && "Object" === Object.prototype.toString.call(n[0]).slice(8, -1) ? (t = n[0]) : ([e, t] = n), t || (t = {}), (t = g({}, t)), e && !t.el && (t.el = e), t.el && d(t.el).length > 1)) {
                    const e = [];
                    return (
                        d(t.el).each((i) => {
                            const n = g({}, t, { el: i });
                            e.push(new q(n));
                        }),
                        e
                    );
                }
                const s = this;
                (s.__swiper__ = !0),
                    (s.support = x()),
                    (s.device = T({ userAgent: t.userAgent })),
                    (s.browser = E()),
                    (s.eventsListeners = {}),
                    (s.eventsAnyListeners = []),
                    (s.modules = [...s.__modules__]),
                    t.modules && Array.isArray(t.modules) && s.modules.push(...t.modules);
                const r = {};
                s.modules.forEach((e) => {
                    e({ swiper: s, extendParams: j(t, r), on: s.on.bind(s), once: s.once.bind(s), off: s.off.bind(s), emit: s.emit.bind(s) });
                });
                const o = g({}, X, r);
                return (
                    (s.params = g({}, o, Y, t)),
                    (s.originalParams = g({}, s.params)),
                    (s.passedParams = g({}, t)),
                    s.params &&
                        s.params.on &&
                        Object.keys(s.params.on).forEach((e) => {
                            s.on(e, s.params.on[e]);
                        }),
                    s.params && s.params.onAny && s.onAny(s.params.onAny),
                    (s.$ = d),
                    Object.assign(s, {
                        enabled: s.params.enabled,
                        el: e,
                        classNames: [],
                        slides: d(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: () => "horizontal" === s.params.direction,
                        isVertical: () => "vertical" === s.params.direction,
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: s.params.allowSlideNext,
                        allowSlidePrev: s.params.allowSlidePrev,
                        touchEvents: (function () {
                            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                                t = ["pointerdown", "pointermove", "pointerup"];
                            return (
                                (s.touchEventsTouch = { start: e[0], move: e[1], end: e[2], cancel: e[3] }),
                                (s.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                                s.support.touch || !s.params.simulateTouch ? s.touchEventsTouch : s.touchEventsDesktop
                            );
                        })(),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            focusableElements: s.params.focusableElements,
                            lastClickTime: u(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0,
                        },
                        allowClick: !0,
                        allowTouchMove: s.params.allowTouchMove,
                        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                        imagesToLoad: [],
                        imagesLoaded: 0,
                    }),
                    s.emit("_swiper"),
                    s.params.init && s.init(),
                    s
                );
            }
            enable() {
                const e = this;
                e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
            }
            disable() {
                const e = this;
                e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
            }
            setProgress(e, t) {
                const i = this;
                e = Math.min(Math.max(e, 0), 1);
                const n = i.minTranslate(),
                    a = (i.maxTranslate() - n) * e + n;
                i.translateTo(a, void 0 === t ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses();
            }
            emitContainerClasses() {
                const e = this;
                if (!e.params._emitClasses || !e.el) return;
                const t = e.el.className.split(" ").filter((t) => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
                e.emit("_containerClasses", t.join(" "));
            }
            getSlideClasses(e) {
                const t = this;
                return t.destroyed
                    ? ""
                    : e.className
                          .split(" ")
                          .filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
                          .join(" ");
            }
            emitSlidesClasses() {
                const e = this;
                if (!e.params._emitClasses || !e.el) return;
                const t = [];
                e.slides.each((i) => {
                    const n = e.getSlideClasses(i);
                    t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
                }),
                    e.emit("_slideClasses", t);
            }
            slidesPerViewDynamic(e, t) {
                void 0 === e && (e = "current"), void 0 === t && (t = !1);
                const { params: i, slides: n, slidesGrid: a, slidesSizesGrid: s, size: r, activeIndex: o } = this;
                let l = 1;
                if (i.centeredSlides) {
                    let e,
                        t = n[o].swiperSlideSize;
                    for (let i = o + 1; i < n.length; i += 1) n[i] && !e && ((t += n[i].swiperSlideSize), (l += 1), t > r && (e = !0));
                    for (let i = o - 1; i >= 0; i -= 1) n[i] && !e && ((t += n[i].swiperSlideSize), (l += 1), t > r && (e = !0));
                } else if ("current" === e)
                    for (let e = o + 1; e < n.length; e += 1) {
                        (t ? a[e] + s[e] - a[o] < r : a[e] - a[o] < r) && (l += 1);
                    }
                else
                    for (let e = o - 1; e >= 0; e -= 1) {
                        a[o] - a[e] < r && (l += 1);
                    }
                return l;
            }
            update() {
                const e = this;
                if (!e || e.destroyed) return;
                const { snapGrid: t, params: i } = e;
                function n() {
                    const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
                }
                let a;
                i.breakpoints && e.setBreakpoint(),
                    e.updateSize(),
                    e.updateSlides(),
                    e.updateProgress(),
                    e.updateSlidesClasses(),
                    e.params.freeMode && e.params.freeMode.enabled
                        ? (n(), e.params.autoHeight && e.updateAutoHeight())
                        : ((a = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)), a || n()),
                    i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                    e.emit("update");
            }
            changeDirection(e, t) {
                void 0 === t && (t = !0);
                const i = this,
                    n = i.params.direction;
                return (
                    e || (e = "horizontal" === n ? "vertical" : "horizontal"),
                    e === n ||
                        ("horizontal" !== e && "vertical" !== e) ||
                        (i.$el.removeClass(`${i.params.containerModifierClass}${n}`).addClass(`${i.params.containerModifierClass}${e}`),
                        i.emitContainerClasses(),
                        (i.params.direction = e),
                        i.slides.each((t) => {
                            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
                        }),
                        i.emit("changeDirection"),
                        t && i.update()),
                    i
                );
            }
            mount(e) {
                const t = this;
                if (t.mounted) return !0;
                const i = d(e || t.params.el);
                if (!(e = i[0])) return !1;
                e.swiper = t;
                const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
                let s = (() => {
                    if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                        const t = d(e.shadowRoot.querySelector(a()));
                        return (t.children = (e) => i.children(e)), t;
                    }
                    return i.children ? i.children(a()) : d(i).children(a());
                })();
                if (0 === s.length && t.params.createElements) {
                    const e = n().createElement("div");
                    (s = d(e)),
                        (e.className = t.params.wrapperClass),
                        i.append(e),
                        i.children(`.${t.params.slideClass}`).each((e) => {
                            s.append(e);
                        });
                }
                return (
                    Object.assign(t, {
                        $el: i,
                        el: e,
                        $wrapperEl: s,
                        wrapperEl: s[0],
                        mounted: !0,
                        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
                        wrongRTL: "-webkit-box" === s.css("display"),
                    }),
                    !0
                );
            }
            init(e) {
                const t = this;
                if (t.initialized) return t;
                return (
                    !1 === t.mount(e) ||
                        (t.emit("beforeInit"),
                        t.params.breakpoints && t.setBreakpoint(),
                        t.addClasses(),
                        t.params.loop && t.loopCreate(),
                        t.updateSize(),
                        t.updateSlides(),
                        t.params.watchOverflow && t.checkOverflow(),
                        t.params.grabCursor && t.enabled && t.setGrabCursor(),
                        t.params.preloadImages && t.preloadImages(),
                        t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
                        t.attachEvents(),
                        (t.initialized = !0),
                        t.emit("init"),
                        t.emit("afterInit")),
                    t
                );
            }
            destroy(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                const i = this,
                    { params: n, $el: a, $wrapperEl: s, slides: r } = i;
                return (
                    void 0 === i.params ||
                        i.destroyed ||
                        (i.emit("beforeDestroy"),
                        (i.initialized = !1),
                        i.detachEvents(),
                        n.loop && i.loopDestroy(),
                        t &&
                            (i.removeClasses(),
                            a.removeAttr("style"),
                            s.removeAttr("style"),
                            r && r.length && r.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
                        i.emit("destroy"),
                        Object.keys(i.eventsListeners).forEach((e) => {
                            i.off(e);
                        }),
                        !1 !== e &&
                            ((i.$el[0].swiper = null),
                            (function (e) {
                                const t = e;
                                Object.keys(t).forEach((e) => {
                                    try {
                                        t[e] = null;
                                    } catch (e) {}
                                    try {
                                        delete t[e];
                                    } catch (e) {}
                                });
                            })(i)),
                        (i.destroyed = !0)),
                    null
                );
            }
            static extendDefaults(e) {
                g(Y, e);
            }
            static get extendedDefaults() {
                return Y;
            }
            static get defaults() {
                return X;
            }
            static installModule(e) {
                q.prototype.__modules__ || (q.prototype.__modules__ = []);
                const t = q.prototype.__modules__;
                "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
            }
            static use(e) {
                return Array.isArray(e) ? (e.forEach((e) => q.installModule(e)), q) : (q.installModule(e), q);
            }
        }
        function V(e, t, i, a) {
            const s = n();
            return (
                e.params.createElements &&
                    Object.keys(a).forEach((n) => {
                        if (!i[n] && !0 === i.auto) {
                            let r = e.$el.children(`.${a[n]}`)[0];
                            r || ((r = s.createElement("div")), (r.className = a[n]), e.$el.append(r)), (i[n] = r), (t[n] = r);
                        }
                    }),
                i
            );
        }
        function U(e) {
            return (
                void 0 === e && (e = ""),
                `.${e
                    .trim()
                    .replace(/([\.:!\/])/g, "\\$1")
                    .replace(/ /g, ".")}`
            );
        }
        function Z(e) {
            const t = this,
                { $wrapperEl: i, params: n } = t;
            if ((n.loop && t.loopDestroy(), "object" == typeof e && "length" in e)) for (let t = 0; t < e.length; t += 1) e[t] && i.append(e[t]);
            else i.append(e);
            n.loop && t.loopCreate(), n.observer || t.update();
        }
        function Q(e) {
            const t = this,
                { params: i, $wrapperEl: n, activeIndex: a } = t;
            i.loop && t.loopDestroy();
            let s = a + 1;
            if ("object" == typeof e && "length" in e) {
                for (let t = 0; t < e.length; t += 1) e[t] && n.prepend(e[t]);
                s = a + e.length;
            } else n.prepend(e);
            i.loop && t.loopCreate(), i.observer || t.update(), t.slideTo(s, 0, !1);
        }
        function K(e, t) {
            const i = this,
                { $wrapperEl: n, params: a, activeIndex: s } = i;
            let r = s;
            a.loop && ((r -= i.loopedSlides), i.loopDestroy(), (i.slides = n.children(`.${a.slideClass}`)));
            const o = i.slides.length;
            if (e <= 0) return void i.prependSlide(t);
            if (e >= o) return void i.appendSlide(t);
            let l = r > e ? r + 1 : r;
            const d = [];
            for (let t = o - 1; t >= e; t -= 1) {
                const e = i.slides.eq(t);
                e.remove(), d.unshift(e);
            }
            if ("object" == typeof t && "length" in t) {
                for (let e = 0; e < t.length; e += 1) t[e] && n.append(t[e]);
                l = r > e ? r + t.length : r;
            } else n.append(t);
            for (let e = 0; e < d.length; e += 1) n.append(d[e]);
            a.loop && i.loopCreate(), a.observer || i.update(), a.loop ? i.slideTo(l + i.loopedSlides, 0, !1) : i.slideTo(l, 0, !1);
        }
        function J(e) {
            const t = this,
                { params: i, $wrapperEl: n, activeIndex: a } = t;
            let s = a;
            i.loop && ((s -= t.loopedSlides), t.loopDestroy(), (t.slides = n.children(`.${i.slideClass}`)));
            let r,
                o = s;
            if ("object" == typeof e && "length" in e) {
                for (let i = 0; i < e.length; i += 1) (r = e[i]), t.slides[r] && t.slides.eq(r).remove(), r < o && (o -= 1);
                o = Math.max(o, 0);
            } else (r = e), t.slides[r] && t.slides.eq(r).remove(), r < o && (o -= 1), (o = Math.max(o, 0));
            i.loop && t.loopCreate(), i.observer || t.update(), i.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1);
        }
        function ee() {
            const e = this,
                t = [];
            for (let i = 0; i < e.slides.length; i += 1) t.push(i);
            e.removeSlide(t);
        }
        function te(e) {
            const { effect: t, swiper: i, on: n, setTranslate: a, setTransition: s, overwriteParams: r, perspective: o, recreateShadows: l, getEffectParams: d } = e;
            let c;
            n("beforeInit", () => {
                if (i.params.effect !== t) return;
                i.classNames.push(`${i.params.containerModifierClass}${t}`), o && o() && i.classNames.push(`${i.params.containerModifierClass}3d`);
                const e = r ? r() : {};
                Object.assign(i.params, e), Object.assign(i.originalParams, e);
            }),
                n("setTranslate", () => {
                    i.params.effect === t && a();
                }),
                n("setTransition", (e, n) => {
                    i.params.effect === t && s(n);
                }),
                n("transitionEnd", () => {
                    if (i.params.effect === t && l) {
                        if (!d || !d().slideShadows) return;
                        i.slides.each((e) => {
                            i.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove();
                        }),
                            l();
                    }
                }),
                n("virtualUpdate", () => {
                    i.params.effect === t &&
                        (i.slides.length || (c = !0),
                        requestAnimationFrame(() => {
                            c && i.slides && i.slides.length && (a(), (c = !1));
                        }));
                });
        }
        function ie(e, t) {
            return e.transformEl ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" }) : t;
        }
        function ne(e) {
            let { swiper: t, duration: i, transformEl: n, allSlides: a } = e;
            const { slides: s, activeIndex: r, $wrapperEl: o } = t;
            if (t.params.virtualTranslate && 0 !== i) {
                let e,
                    i = !1;
                (e = a ? (n ? s.find(n) : s) : n ? s.eq(r).find(n) : s.eq(r)),
                    e.transitionEnd(() => {
                        if (i) return;
                        if (!t || t.destroyed) return;
                        (i = !0), (t.animating = !1);
                        const e = ["webkitTransitionEnd", "transitionend"];
                        for (let t = 0; t < e.length; t += 1) o.trigger(e[t]);
                    });
            }
        }
        function ae(e, t, i) {
            const n = "swiper-slide-shadow" + (i ? `-${i}` : ""),
                a = e.transformEl ? t.find(e.transformEl) : t;
            let s = a.children(`.${n}`);
            return s.length || ((s = d(`<div class="swiper-slide-shadow${i ? `-${i}` : ""}"></div>`)), a.append(s)), s;
        }
        Object.keys(B).forEach((e) => {
            Object.keys(B[e]).forEach((t) => {
                q.prototype[t] = B[e][t];
            });
        }),
            q.use([
                function (e) {
                    let { swiper: t, on: i, emit: n } = e;
                    const a = s();
                    let r = null,
                        o = null;
                    const l = () => {
                            t && !t.destroyed && t.initialized && (n("beforeResize"), n("resize"));
                        },
                        d = () => {
                            t && !t.destroyed && t.initialized && n("orientationchange");
                        };
                    i("init", () => {
                        t.params.resizeObserver && void 0 !== a.ResizeObserver
                            ? t &&
                              !t.destroyed &&
                              t.initialized &&
                              ((r = new ResizeObserver((e) => {
                                  o = a.requestAnimationFrame(() => {
                                      const { width: i, height: n } = t;
                                      let a = i,
                                          s = n;
                                      e.forEach((e) => {
                                          let { contentBoxSize: i, contentRect: n, target: r } = e;
                                          (r && r !== t.el) || ((a = n ? n.width : (i[0] || i).inlineSize), (s = n ? n.height : (i[0] || i).blockSize));
                                      }),
                                          (a === i && s === n) || l();
                                  });
                              })),
                              r.observe(t.el))
                            : (a.addEventListener("resize", l), a.addEventListener("orientationchange", d));
                    }),
                        i("destroy", () => {
                            o && a.cancelAnimationFrame(o), r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)), a.removeEventListener("resize", l), a.removeEventListener("orientationchange", d);
                        });
                },
                function (e) {
                    let { swiper: t, extendParams: i, on: n, emit: a } = e;
                    const r = [],
                        o = s(),
                        l = function (e, t) {
                            void 0 === t && (t = {});
                            const i = new (o.MutationObserver || o.WebkitMutationObserver)((e) => {
                                if (1 === e.length) return void a("observerUpdate", e[0]);
                                const t = function () {
                                    a("observerUpdate", e[0]);
                                };
                                o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0);
                            });
                            i.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), r.push(i);
                        };
                    i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                        n("init", () => {
                            if (t.params.observer) {
                                if (t.params.observeParents) {
                                    const e = t.$el.parents();
                                    for (let t = 0; t < e.length; t += 1) l(e[t]);
                                }
                                l(t.$el[0], { childList: t.params.observeSlideChildren }), l(t.$wrapperEl[0], { attributes: !1 });
                            }
                        }),
                        n("destroy", () => {
                            r.forEach((e) => {
                                e.disconnect();
                            }),
                                r.splice(0, r.length);
                        });
                },
            ]);
        const se = [
            function (e) {
                let t,
                    { swiper: i, extendParams: n, on: a, emit: s } = e;
                function r(e, t) {
                    const n = i.params.virtual;
                    if (n.cache && i.virtual.cache[t]) return i.virtual.cache[t];
                    const a = n.renderSlide ? d(n.renderSlide.call(i, e, t)) : d(`<div class="${i.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
                    return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), n.cache && (i.virtual.cache[t] = a), a;
                }
                function o(e) {
                    const { slidesPerView: t, slidesPerGroup: n, centeredSlides: a } = i.params,
                        { addSlidesBefore: o, addSlidesAfter: l } = i.params.virtual,
                        { from: d, to: c, slides: p, slidesGrid: u, offset: h } = i.virtual;
                    i.params.cssMode || i.updateActiveIndex();
                    const f = i.activeIndex || 0;
                    let m, g, v;
                    (m = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top"), a ? ((g = Math.floor(t / 2) + n + l), (v = Math.floor(t / 2) + n + o)) : ((g = t + (n - 1) + l), (v = n + o));
                    const w = Math.max((f || 0) - v, 0),
                        y = Math.min((f || 0) + g, p.length - 1),
                        b = (i.slidesGrid[w] || 0) - (i.slidesGrid[0] || 0);
                    function _() {
                        i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load(), s("virtualUpdate");
                    }
                    if ((Object.assign(i.virtual, { from: w, to: y, offset: b, slidesGrid: i.slidesGrid }), d === w && c === y && !e))
                        return i.slidesGrid !== u && b !== h && i.slides.css(m, `${b}px`), i.updateProgress(), void s("virtualUpdate");
                    if (i.params.virtual.renderExternal)
                        return (
                            i.params.virtual.renderExternal.call(i, {
                                offset: b,
                                from: w,
                                to: y,
                                slides: (function () {
                                    const e = [];
                                    for (let t = w; t <= y; t += 1) e.push(p[t]);
                                    return e;
                                })(),
                            }),
                            void (i.params.virtual.renderExternalUpdate ? _() : s("virtualUpdate"))
                        );
                    const x = [],
                        T = [];
                    if (e) i.$wrapperEl.find(`.${i.params.slideClass}`).remove();
                    else for (let e = d; e <= c; e += 1) (e < w || e > y) && i.$wrapperEl.find(`.${i.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
                    for (let t = 0; t < p.length; t += 1) t >= w && t <= y && (void 0 === c || e ? T.push(t) : (t > c && T.push(t), t < d && x.push(t)));
                    T.forEach((e) => {
                        i.$wrapperEl.append(r(p[e], e));
                    }),
                        x
                            .sort((e, t) => t - e)
                            .forEach((e) => {
                                i.$wrapperEl.prepend(r(p[e], e));
                            }),
                        i.$wrapperEl.children(".swiper-slide").css(m, `${b}px`),
                        _();
                }
                n({ virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, renderExternalUpdate: !0, addSlidesBefore: 0, addSlidesAfter: 0 } }),
                    (i.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }),
                    a("beforeInit", () => {
                        i.params.virtual.enabled &&
                            ((i.virtual.slides = i.params.virtual.slides),
                            i.classNames.push(`${i.params.containerModifierClass}virtual`),
                            (i.params.watchSlidesProgress = !0),
                            (i.originalParams.watchSlidesProgress = !0),
                            i.params.initialSlide || o());
                    }),
                    a("setTranslate", () => {
                        i.params.virtual.enabled &&
                            (i.params.cssMode && !i._immediateVirtual
                                ? (clearTimeout(t),
                                  (t = setTimeout(() => {
                                      o();
                                  }, 100)))
                                : o());
                    }),
                    a("init update resize", () => {
                        i.params.virtual.enabled && i.params.cssMode && v(i.wrapperEl, "--swiper-virtual-size", `${i.virtualSize}px`);
                    }),
                    Object.assign(i.virtual, {
                        appendSlide: function (e) {
                            if ("object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1) e[t] && i.virtual.slides.push(e[t]);
                            else i.virtual.slides.push(e);
                            o(!0);
                        },
                        prependSlide: function (e) {
                            const t = i.activeIndex;
                            let n = t + 1,
                                a = 1;
                            if (Array.isArray(e)) {
                                for (let t = 0; t < e.length; t += 1) e[t] && i.virtual.slides.unshift(e[t]);
                                (n = t + e.length), (a = e.length);
                            } else i.virtual.slides.unshift(e);
                            if (i.params.virtual.cache) {
                                const e = i.virtual.cache,
                                    t = {};
                                Object.keys(e).forEach((i) => {
                                    const n = e[i],
                                        s = n.attr("data-swiper-slide-index");
                                    s && n.attr("data-swiper-slide-index", parseInt(s, 10) + a), (t[parseInt(i, 10) + a] = n);
                                }),
                                    (i.virtual.cache = t);
                            }
                            o(!0), i.slideTo(n, 0);
                        },
                        removeSlide: function (e) {
                            if (null == e) return;
                            let t = i.activeIndex;
                            if (Array.isArray(e)) for (let n = e.length - 1; n >= 0; n -= 1) i.virtual.slides.splice(e[n], 1), i.params.virtual.cache && delete i.virtual.cache[e[n]], e[n] < t && (t -= 1), (t = Math.max(t, 0));
                            else i.virtual.slides.splice(e, 1), i.params.virtual.cache && delete i.virtual.cache[e], e < t && (t -= 1), (t = Math.max(t, 0));
                            o(!0), i.slideTo(t, 0);
                        },
                        removeAllSlides: function () {
                            (i.virtual.slides = []), i.params.virtual.cache && (i.virtual.cache = {}), o(!0), i.slideTo(0, 0);
                        },
                        update: o,
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: a, emit: r } = e;
                const o = n(),
                    l = s();
                function c(e) {
                    if (!t.enabled) return;
                    const { rtlTranslate: i } = t;
                    let n = e;
                    n.originalEvent && (n = n.originalEvent);
                    const a = n.keyCode || n.charCode,
                        s = t.params.keyboard.pageUpDown,
                        d = s && 33 === a,
                        c = s && 34 === a,
                        p = 37 === a,
                        u = 39 === a,
                        h = 38 === a,
                        f = 40 === a;
                    if (!t.allowSlideNext && ((t.isHorizontal() && u) || (t.isVertical() && f) || c)) return !1;
                    if (!t.allowSlidePrev && ((t.isHorizontal() && p) || (t.isVertical() && h) || d)) return !1;
                    if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || (o.activeElement && o.activeElement.nodeName && ("input" === o.activeElement.nodeName.toLowerCase() || "textarea" === o.activeElement.nodeName.toLowerCase())))) {
                        if (t.params.keyboard.onlyInViewport && (d || c || p || u || h || f)) {
                            let e = !1;
                            if (t.$el.parents(`.${t.params.slideClass}`).length > 0 && 0 === t.$el.parents(`.${t.params.slideActiveClass}`).length) return;
                            const n = t.$el,
                                a = n[0].clientWidth,
                                s = n[0].clientHeight,
                                r = l.innerWidth,
                                o = l.innerHeight,
                                d = t.$el.offset();
                            i && (d.left -= t.$el[0].scrollLeft);
                            const c = [
                                [d.left, d.top],
                                [d.left + a, d.top],
                                [d.left, d.top + s],
                                [d.left + a, d.top + s],
                            ];
                            for (let t = 0; t < c.length; t += 1) {
                                const i = c[t];
                                if (i[0] >= 0 && i[0] <= r && i[1] >= 0 && i[1] <= o) {
                                    if (0 === i[0] && 0 === i[1]) continue;
                                    e = !0;
                                }
                            }
                            if (!e) return;
                        }
                        t.isHorizontal()
                            ? ((d || c || p || u) && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)), (((c || u) && !i) || ((d || p) && i)) && t.slideNext(), (((d || p) && !i) || ((c || u) && i)) && t.slidePrev())
                            : ((d || c || h || f) && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)), (c || f) && t.slideNext(), (d || h) && t.slidePrev()),
                            r("keyPress", a);
                    }
                }
                function p() {
                    t.keyboard.enabled || (d(o).on("keydown", c), (t.keyboard.enabled = !0));
                }
                function u() {
                    t.keyboard.enabled && (d(o).off("keydown", c), (t.keyboard.enabled = !1));
                }
                (t.keyboard = { enabled: !1 }),
                    i({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
                    a("init", () => {
                        t.params.keyboard.enabled && p();
                    }),
                    a("destroy", () => {
                        t.keyboard.enabled && u();
                    }),
                    Object.assign(t.keyboard, { enable: p, disable: u });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n, emit: a } = e;
                const r = s();
                let o;
                i({ mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null } }), (t.mousewheel = { enabled: !1 });
                let l,
                    c = u();
                const h = [];
                function f() {
                    t.enabled && (t.mouseEntered = !0);
                }
                function m() {
                    t.enabled && (t.mouseEntered = !1);
                }
                function g(e) {
                    return (
                        !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) &&
                        !(t.params.mousewheel.thresholdTime && u() - c < t.params.mousewheel.thresholdTime) &&
                        ((e.delta >= 6 && u() - c < 60) ||
                            (e.direction < 0 ? (t.isEnd && !t.params.loop) || t.animating || (t.slideNext(), a("scroll", e.raw)) : (t.isBeginning && !t.params.loop) || t.animating || (t.slidePrev(), a("scroll", e.raw)),
                            (c = new r.Date().getTime()),
                            !1))
                    );
                }
                function v(e) {
                    let i = e,
                        n = !0;
                    if (!t.enabled) return;
                    const s = t.params.mousewheel;
                    t.params.cssMode && i.preventDefault();
                    let r = t.$el;
                    if (("container" !== t.params.mousewheel.eventsTarget && (r = d(t.params.mousewheel.eventsTarget)), !t.mouseEntered && !r[0].contains(i.target) && !s.releaseOnEdges)) return !0;
                    i.originalEvent && (i = i.originalEvent);
                    let c = 0;
                    const f = t.rtlTranslate ? -1 : 1,
                        m = (function (e) {
                            let t = 0,
                                i = 0,
                                n = 0,
                                a = 0;
                            return (
                                "detail" in e && (i = e.detail),
                                "wheelDelta" in e && (i = -e.wheelDelta / 120),
                                "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
                                "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                                "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
                                (n = 10 * t),
                                (a = 10 * i),
                                "deltaY" in e && (a = e.deltaY),
                                "deltaX" in e && (n = e.deltaX),
                                e.shiftKey && !n && ((n = a), (a = 0)),
                                (n || a) && e.deltaMode && (1 === e.deltaMode ? ((n *= 40), (a *= 40)) : ((n *= 800), (a *= 800))),
                                n && !t && (t = n < 1 ? -1 : 1),
                                a && !i && (i = a < 1 ? -1 : 1),
                                { spinX: t, spinY: i, pixelX: n, pixelY: a }
                            );
                        })(i);
                    if (s.forceToAxis)
                        if (t.isHorizontal()) {
                            if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
                            c = -m.pixelX * f;
                        } else {
                            if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
                            c = -m.pixelY;
                        }
                    else c = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * f : -m.pixelY;
                    if (0 === c) return !0;
                    s.invert && (c = -c);
                    let v = t.getTranslate() + c * s.sensitivity;
                    if (
                        (v >= t.minTranslate() && (v = t.minTranslate()),
                        v <= t.maxTranslate() && (v = t.maxTranslate()),
                        (n = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate())),
                        n && t.params.nested && i.stopPropagation(),
                        t.params.freeMode && t.params.freeMode.enabled)
                    ) {
                        const e = { time: u(), delta: Math.abs(c), direction: Math.sign(c) },
                            n = l && e.time < l.time + 500 && e.delta <= l.delta && e.direction === l.direction;
                        if (!n) {
                            (l = void 0), t.params.loop && t.loopFix();
                            let r = t.getTranslate() + c * s.sensitivity;
                            const d = t.isBeginning,
                                u = t.isEnd;
                            if (
                                (r >= t.minTranslate() && (r = t.minTranslate()),
                                r <= t.maxTranslate() && (r = t.maxTranslate()),
                                t.setTransition(0),
                                t.setTranslate(r),
                                t.updateProgress(),
                                t.updateActiveIndex(),
                                t.updateSlidesClasses(),
                                ((!d && t.isBeginning) || (!u && t.isEnd)) && t.updateSlidesClasses(),
                                t.params.freeMode.sticky)
                            ) {
                                clearTimeout(o), (o = void 0), h.length >= 15 && h.shift();
                                const i = h.length ? h[h.length - 1] : void 0,
                                    n = h[0];
                                if ((h.push(e), i && (e.delta > i.delta || e.direction !== i.direction))) h.splice(0);
                                else if (h.length >= 15 && e.time - n.time < 500 && n.delta - e.delta >= 1 && e.delta <= 6) {
                                    const i = c > 0 ? 0.8 : 0.2;
                                    (l = e),
                                        h.splice(0),
                                        (o = p(() => {
                                            t.slideToClosest(t.params.speed, !0, void 0, i);
                                        }, 0));
                                }
                                o ||
                                    (o = p(() => {
                                        (l = e), h.splice(0), t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                                    }, 500));
                            }
                            if ((n || a("scroll", i), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), r === t.minTranslate() || r === t.maxTranslate())) return !0;
                        }
                    } else {
                        const i = { time: u(), delta: Math.abs(c), direction: Math.sign(c), raw: e };
                        h.length >= 2 && h.shift();
                        const n = h.length ? h[h.length - 1] : void 0;
                        if (
                            (h.push(i),
                            n ? (i.direction !== n.direction || i.delta > n.delta || i.time > n.time + 150) && g(i) : g(i),
                            (function (e) {
                                const i = t.params.mousewheel;
                                if (e.direction < 0) {
                                    if (t.isEnd && !t.params.loop && i.releaseOnEdges) return !0;
                                } else if (t.isBeginning && !t.params.loop && i.releaseOnEdges) return !0;
                                return !1;
                            })(i))
                        )
                            return !0;
                    }
                    return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
                }
                function w(e) {
                    let i = t.$el;
                    "container" !== t.params.mousewheel.eventsTarget && (i = d(t.params.mousewheel.eventsTarget)), i[e]("mouseenter", f), i[e]("mouseleave", m), i[e]("wheel", v);
                }
                function y() {
                    return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v), !0) : !t.mousewheel.enabled && (w("on"), (t.mousewheel.enabled = !0), !0);
                }
                function b() {
                    return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v), !0) : !!t.mousewheel.enabled && (w("off"), (t.mousewheel.enabled = !1), !0);
                }
                n("init", () => {
                    !t.params.mousewheel.enabled && t.params.cssMode && b(), t.params.mousewheel.enabled && y();
                }),
                    n("destroy", () => {
                        t.params.cssMode && y(), t.mousewheel.enabled && b();
                    }),
                    Object.assign(t.mousewheel, { enable: y, disable: b });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n, emit: a } = e;
                function s(e) {
                    let i;
                    return e && ((i = d(e)), t.params.uniqueNavElements && "string" == typeof e && i.length > 1 && 1 === t.$el.find(e).length && (i = t.$el.find(e))), i;
                }
                function r(e, i) {
                    const n = t.params.navigation;
                    e &&
                        e.length > 0 &&
                        (e[i ? "addClass" : "removeClass"](n.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i), t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](n.lockClass));
                }
                function o() {
                    if (t.params.loop) return;
                    const { $nextEl: e, $prevEl: i } = t.navigation;
                    r(i, t.isBeginning && !t.params.rewind), r(e, t.isEnd && !t.params.rewind);
                }
                function l(e) {
                    e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
                }
                function c(e) {
                    e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
                }
                function p() {
                    const e = t.params.navigation;
                    if (((t.params.navigation = V(t, t.originalParams.navigation, t.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" })), !e.nextEl && !e.prevEl)) return;
                    const i = s(e.nextEl),
                        n = s(e.prevEl);
                    i && i.length > 0 && i.on("click", c),
                        n && n.length > 0 && n.on("click", l),
                        Object.assign(t.navigation, { $nextEl: i, nextEl: i && i[0], $prevEl: n, prevEl: n && n[0] }),
                        t.enabled || (i && i.addClass(e.lockClass), n && n.addClass(e.lockClass));
                }
                function u() {
                    const { $nextEl: e, $prevEl: i } = t.navigation;
                    e && e.length && (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)), i && i.length && (i.off("click", l), i.removeClass(t.params.navigation.disabledClass));
                }
                i({
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock",
                        navigationDisabledClass: "swiper-navigation-disabled",
                    },
                }),
                    (t.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }),
                    n("init", () => {
                        !1 === t.params.navigation.enabled ? h() : (p(), o());
                    }),
                    n("toEdge fromEdge lock unlock", () => {
                        o();
                    }),
                    n("destroy", () => {
                        u();
                    }),
                    n("enable disable", () => {
                        const { $nextEl: e, $prevEl: i } = t.navigation;
                        e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass), i && i[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass);
                    }),
                    n("click", (e, i) => {
                        const { $nextEl: n, $prevEl: s } = t.navigation,
                            r = i.target;
                        if (t.params.navigation.hideOnClick && !d(r).is(s) && !d(r).is(n)) {
                            if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === r || t.pagination.el.contains(r))) return;
                            let e;
                            n ? (e = n.hasClass(t.params.navigation.hiddenClass)) : s && (e = s.hasClass(t.params.navigation.hiddenClass)),
                                a(!0 === e ? "navigationShow" : "navigationHide"),
                                n && n.toggleClass(t.params.navigation.hiddenClass),
                                s && s.toggleClass(t.params.navigation.hiddenClass);
                        }
                    });
                const h = () => {
                    t.$el.addClass(t.params.navigation.navigationDisabledClass), u();
                };
                Object.assign(t.navigation, {
                    enable: () => {
                        t.$el.removeClass(t.params.navigation.navigationDisabledClass), p(), o();
                    },
                    disable: h,
                    update: o,
                    init: p,
                    destroy: u,
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n, emit: a } = e;
                const s = "swiper-pagination";
                let r;
                i({
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: (e) => e,
                        formatFractionTotal: (e) => e,
                        bulletClass: `${s}-bullet`,
                        bulletActiveClass: `${s}-bullet-active`,
                        modifierClass: `${s}-`,
                        currentClass: `${s}-current`,
                        totalClass: `${s}-total`,
                        hiddenClass: `${s}-hidden`,
                        progressbarFillClass: `${s}-progressbar-fill`,
                        progressbarOppositeClass: `${s}-progressbar-opposite`,
                        clickableClass: `${s}-clickable`,
                        lockClass: `${s}-lock`,
                        horizontalClass: `${s}-horizontal`,
                        verticalClass: `${s}-vertical`,
                        paginationDisabledClass: `${s}-disabled`,
                    },
                }),
                    (t.pagination = { el: null, $el: null, bullets: [] });
                let o = 0;
                function l() {
                    return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length;
                }
                function c(e, i) {
                    const { bulletActiveClass: n } = t.params.pagination;
                    e[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
                }
                function p() {
                    const e = t.rtl,
                        i = t.params.pagination;
                    if (l()) return;
                    const n = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                        s = t.pagination.$el;
                    let p;
                    const u = t.params.loop ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                    if (
                        (t.params.loop
                            ? ((p = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup)),
                              p > n - 1 - 2 * t.loopedSlides && (p -= n - 2 * t.loopedSlides),
                              p > u - 1 && (p -= u),
                              p < 0 && "bullets" !== t.params.paginationType && (p = u + p))
                            : (p = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
                        "bullets" === i.type && t.pagination.bullets && t.pagination.bullets.length > 0)
                    ) {
                        const n = t.pagination.bullets;
                        let a, l, u;
                        if (
                            (i.dynamicBullets &&
                                ((r = n.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                                s.css(t.isHorizontal() ? "width" : "height", r * (i.dynamicMainBullets + 4) + "px"),
                                i.dynamicMainBullets > 1 && void 0 !== t.previousIndex && ((o += p - (t.previousIndex - t.loopedSlides || 0)), o > i.dynamicMainBullets - 1 ? (o = i.dynamicMainBullets - 1) : o < 0 && (o = 0)),
                                (a = Math.max(p - o, 0)),
                                (l = a + (Math.min(n.length, i.dynamicMainBullets) - 1)),
                                (u = (l + a) / 2)),
                            n.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e) => `${i.bulletActiveClass}${e}`).join(" ")),
                            s.length > 1)
                        )
                            n.each((e) => {
                                const t = d(e),
                                    n = t.index();
                                n === p && t.addClass(i.bulletActiveClass), i.dynamicBullets && (n >= a && n <= l && t.addClass(`${i.bulletActiveClass}-main`), n === a && c(t, "prev"), n === l && c(t, "next"));
                            });
                        else {
                            const e = n.eq(p),
                                s = e.index();
                            if ((e.addClass(i.bulletActiveClass), i.dynamicBullets)) {
                                const e = n.eq(a),
                                    r = n.eq(l);
                                for (let e = a; e <= l; e += 1) n.eq(e).addClass(`${i.bulletActiveClass}-main`);
                                if (t.params.loop)
                                    if (s >= n.length) {
                                        for (let e = i.dynamicMainBullets; e >= 0; e -= 1) n.eq(n.length - e).addClass(`${i.bulletActiveClass}-main`);
                                        n.eq(n.length - i.dynamicMainBullets - 1).addClass(`${i.bulletActiveClass}-prev`);
                                    } else c(e, "prev"), c(r, "next");
                                else c(e, "prev"), c(r, "next");
                            }
                        }
                        if (i.dynamicBullets) {
                            const a = Math.min(n.length, i.dynamicMainBullets + 4),
                                s = (r * a - r) / 2 - u * r,
                                o = e ? "right" : "left";
                            n.css(t.isHorizontal() ? o : "top", `${s}px`);
                        }
                    }
                    if (("fraction" === i.type && (s.find(U(i.currentClass)).text(i.formatFractionCurrent(p + 1)), s.find(U(i.totalClass)).text(i.formatFractionTotal(u))), "progressbar" === i.type)) {
                        let e;
                        e = i.progressbarOpposite ? (t.isHorizontal() ? "vertical" : "horizontal") : t.isHorizontal() ? "horizontal" : "vertical";
                        const n = (p + 1) / u;
                        let a = 1,
                            r = 1;
                        "horizontal" === e ? (a = n) : (r = n), s.find(U(i.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${a}) scaleY(${r})`).transition(t.params.speed);
                    }
                    "custom" === i.type && i.renderCustom ? (s.html(i.renderCustom(t, p + 1, u)), a("paginationRender", s[0])) : a("paginationUpdate", s[0]),
                        t.params.watchOverflow && t.enabled && s[t.isLocked ? "addClass" : "removeClass"](i.lockClass);
                }
                function u() {
                    const e = t.params.pagination;
                    if (l()) return;
                    const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                        n = t.pagination.$el;
                    let s = "";
                    if ("bullets" === e.type) {
                        let a = t.params.loop ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                        t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && a > i && (a = i);
                        for (let i = 0; i < a; i += 1) e.renderBullet ? (s += e.renderBullet.call(t, i, e.bulletClass)) : (s += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
                        n.html(s), (t.pagination.bullets = n.find(U(e.bulletClass)));
                    }
                    "fraction" === e.type && ((s = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), n.html(s)),
                        "progressbar" === e.type && ((s = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), n.html(s)),
                        "custom" !== e.type && a("paginationRender", t.pagination.$el[0]);
                }
                function h() {
                    t.params.pagination = V(t, t.originalParams.pagination, t.params.pagination, { el: "swiper-pagination" });
                    const e = t.params.pagination;
                    if (!e.el) return;
                    let i = d(e.el);
                    0 !== i.length &&
                        (t.params.uniqueNavElements && "string" == typeof e.el && i.length > 1 && ((i = t.$el.find(e.el)), i.length > 1 && (i = i.filter((e) => d(e).parents(".swiper")[0] === t.el))),
                        "bullets" === e.type && e.clickable && i.addClass(e.clickableClass),
                        i.addClass(e.modifierClass + e.type),
                        i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                        "bullets" === e.type && e.dynamicBullets && (i.addClass(`${e.modifierClass}${e.type}-dynamic`), (o = 0), e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                        "progressbar" === e.type && e.progressbarOpposite && i.addClass(e.progressbarOppositeClass),
                        e.clickable &&
                            i.on("click", U(e.bulletClass), function (e) {
                                e.preventDefault();
                                let i = d(this).index() * t.params.slidesPerGroup;
                                t.params.loop && (i += t.loopedSlides), t.slideTo(i);
                            }),
                        Object.assign(t.pagination, { $el: i, el: i[0] }),
                        t.enabled || i.addClass(e.lockClass));
                }
                function f() {
                    const e = t.params.pagination;
                    if (l()) return;
                    const i = t.pagination.$el;
                    i.removeClass(e.hiddenClass),
                        i.removeClass(e.modifierClass + e.type),
                        i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                        t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass),
                        e.clickable && i.off("click", U(e.bulletClass));
                }
                n("init", () => {
                    !1 === t.params.pagination.enabled ? m() : (h(), u(), p());
                }),
                    n("activeIndexChange", () => {
                        (t.params.loop || void 0 === t.snapIndex) && p();
                    }),
                    n("snapIndexChange", () => {
                        t.params.loop || p();
                    }),
                    n("slidesLengthChange", () => {
                        t.params.loop && (u(), p());
                    }),
                    n("snapGridLengthChange", () => {
                        t.params.loop || (u(), p());
                    }),
                    n("destroy", () => {
                        f();
                    }),
                    n("enable disable", () => {
                        const { $el: e } = t.pagination;
                        e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass);
                    }),
                    n("lock unlock", () => {
                        p();
                    }),
                    n("click", (e, i) => {
                        const n = i.target,
                            { $el: s } = t.pagination;
                        if (t.params.pagination.el && t.params.pagination.hideOnClick && s.length > 0 && !d(n).hasClass(t.params.pagination.bulletClass)) {
                            if (t.navigation && ((t.navigation.nextEl && n === t.navigation.nextEl) || (t.navigation.prevEl && n === t.navigation.prevEl))) return;
                            const e = s.hasClass(t.params.pagination.hiddenClass);
                            a(!0 === e ? "paginationShow" : "paginationHide"), s.toggleClass(t.params.pagination.hiddenClass);
                        }
                    });
                const m = () => {
                    t.$el.addClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass), f();
                };
                Object.assign(t.pagination, {
                    enable: () => {
                        t.$el.removeClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass), h(), u(), p();
                    },
                    disable: m,
                    render: u,
                    update: p,
                    init: h,
                    destroy: f,
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: a, emit: s } = e;
                const r = n();
                let o,
                    l,
                    c,
                    u,
                    h = !1,
                    f = null,
                    m = null;
                function g() {
                    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
                    const { scrollbar: e, rtlTranslate: i, progress: n } = t,
                        { $dragEl: a, $el: s } = e,
                        r = t.params.scrollbar;
                    let o = l,
                        d = (c - l) * n;
                    i ? ((d = -d), d > 0 ? ((o = l - d), (d = 0)) : -d + l > c && (o = c + d)) : d < 0 ? ((o = l + d), (d = 0)) : d + l > c && (o = c - d),
                        t.isHorizontal() ? (a.transform(`translate3d(${d}px, 0, 0)`), (a[0].style.width = `${o}px`)) : (a.transform(`translate3d(0px, ${d}px, 0)`), (a[0].style.height = `${o}px`)),
                        r.hide &&
                            (clearTimeout(f),
                            (s[0].style.opacity = 1),
                            (f = setTimeout(() => {
                                (s[0].style.opacity = 0), s.transition(400);
                            }, 1e3)));
                }
                function v() {
                    if (!t.params.scrollbar.el || !t.scrollbar.el) return;
                    const { scrollbar: e } = t,
                        { $dragEl: i, $el: n } = e;
                    (i[0].style.width = ""),
                        (i[0].style.height = ""),
                        (c = t.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight),
                        (u = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0))),
                        (l = "auto" === t.params.scrollbar.dragSize ? c * u : parseInt(t.params.scrollbar.dragSize, 10)),
                        t.isHorizontal() ? (i[0].style.width = `${l}px`) : (i[0].style.height = `${l}px`),
                        (n[0].style.display = u >= 1 ? "none" : ""),
                        t.params.scrollbar.hide && (n[0].style.opacity = 0),
                        t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass);
                }
                function w(e) {
                    return t.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX) : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY;
                }
                function y(e) {
                    const { scrollbar: i, rtlTranslate: n } = t,
                        { $el: a } = i;
                    let s;
                    (s = (w(e) - a.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : l / 2)) / (c - l)), (s = Math.max(Math.min(s, 1), 0)), n && (s = 1 - s);
                    const r = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * s;
                    t.updateProgress(r), t.setTranslate(r), t.updateActiveIndex(), t.updateSlidesClasses();
                }
                function b(e) {
                    const i = t.params.scrollbar,
                        { scrollbar: n, $wrapperEl: a } = t,
                        { $el: r, $dragEl: l } = n;
                    (h = !0),
                        (o = e.target === l[0] || e.target === l ? w(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null),
                        e.preventDefault(),
                        e.stopPropagation(),
                        a.transition(100),
                        l.transition(100),
                        y(e),
                        clearTimeout(m),
                        r.transition(0),
                        i.hide && r.css("opacity", 1),
                        t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
                        s("scrollbarDragStart", e);
                }
                function _(e) {
                    const { scrollbar: i, $wrapperEl: n } = t,
                        { $el: a, $dragEl: r } = i;
                    h && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), y(e), n.transition(0), a.transition(0), r.transition(0), s("scrollbarDragMove", e));
                }
                function x(e) {
                    const i = t.params.scrollbar,
                        { scrollbar: n, $wrapperEl: a } = t,
                        { $el: r } = n;
                    h &&
                        ((h = !1),
                        t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), a.transition("")),
                        i.hide &&
                            (clearTimeout(m),
                            (m = p(() => {
                                r.css("opacity", 0), r.transition(400);
                            }, 1e3))),
                        s("scrollbarDragEnd", e),
                        i.snapOnRelease && t.slideToClosest());
                }
                function T(e) {
                    const { scrollbar: i, touchEventsTouch: n, touchEventsDesktop: a, params: s, support: o } = t,
                        l = i.$el;
                    if (!l) return;
                    const d = l[0],
                        c = !(!o.passiveListener || !s.passiveListeners) && { passive: !1, capture: !1 },
                        p = !(!o.passiveListener || !s.passiveListeners) && { passive: !0, capture: !1 };
                    if (!d) return;
                    const u = "on" === e ? "addEventListener" : "removeEventListener";
                    o.touch ? (d[u](n.start, b, c), d[u](n.move, _, c), d[u](n.end, x, p)) : (d[u](a.start, b, c), r[u](a.move, _, c), r[u](a.end, x, p));
                }
                function E() {
                    const { scrollbar: e, $el: i } = t;
                    t.params.scrollbar = V(t, t.originalParams.scrollbar, t.params.scrollbar, { el: "swiper-scrollbar" });
                    const n = t.params.scrollbar;
                    if (!n.el) return;
                    let a = d(n.el);
                    t.params.uniqueNavElements && "string" == typeof n.el && a.length > 1 && 1 === i.find(n.el).length && (a = i.find(n.el)), a.addClass(t.isHorizontal() ? n.horizontalClass : n.verticalClass);
                    let s = a.find(`.${t.params.scrollbar.dragClass}`);
                    0 === s.length && ((s = d(`<div class="${t.params.scrollbar.dragClass}"></div>`)), a.append(s)),
                        Object.assign(e, { $el: a, el: a[0], $dragEl: s, dragEl: s[0] }),
                        n.draggable && t.params.scrollbar.el && t.scrollbar.el && T("on"),
                        a && a[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass);
                }
                function S() {
                    const e = t.params.scrollbar,
                        i = t.scrollbar.$el;
                    i && i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && T("off");
                }
                i({
                    scrollbar: {
                        el: null,
                        dragSize: "auto",
                        hide: !1,
                        draggable: !1,
                        snapOnRelease: !0,
                        lockClass: "swiper-scrollbar-lock",
                        dragClass: "swiper-scrollbar-drag",
                        scrollbarDisabledClass: "swiper-scrollbar-disabled",
                        horizontalClass: "swiper-scrollbar-horizontal",
                        verticalClass: "swiper-scrollbar-vertical",
                    },
                }),
                    (t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
                    a("init", () => {
                        !1 === t.params.scrollbar.enabled ? M() : (E(), v(), g());
                    }),
                    a("update resize observerUpdate lock unlock", () => {
                        v();
                    }),
                    a("setTranslate", () => {
                        g();
                    }),
                    a("setTransition", (e, i) => {
                        !(function (e) {
                            t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e);
                        })(i);
                    }),
                    a("enable disable", () => {
                        const { $el: e } = t.scrollbar;
                        e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass);
                    }),
                    a("destroy", () => {
                        S();
                    });
                const M = () => {
                    t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), S();
                };
                Object.assign(t.scrollbar, {
                    enable: () => {
                        t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), E(), v(), g();
                    },
                    disable: M,
                    updateSize: v,
                    setTranslate: g,
                    init: E,
                    destroy: S,
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ parallax: { enabled: !1 } });
                const a = (e, i) => {
                        const { rtl: n } = t,
                            a = d(e),
                            s = n ? -1 : 1,
                            r = a.attr("data-swiper-parallax") || "0";
                        let o = a.attr("data-swiper-parallax-x"),
                            l = a.attr("data-swiper-parallax-y");
                        const c = a.attr("data-swiper-parallax-scale"),
                            p = a.attr("data-swiper-parallax-opacity");
                        if (
                            (o || l ? ((o = o || "0"), (l = l || "0")) : t.isHorizontal() ? ((o = r), (l = "0")) : ((l = r), (o = "0")),
                            (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * i * s + "%" : o * i * s + "px"),
                            (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%" : l * i + "px"),
                            null != p)
                        ) {
                            const e = p - (p - 1) * (1 - Math.abs(i));
                            a[0].style.opacity = e;
                        }
                        if (null == c) a.transform(`translate3d(${o}, ${l}, 0px)`);
                        else {
                            const e = c - (c - 1) * (1 - Math.abs(i));
                            a.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`);
                        }
                    },
                    s = () => {
                        const { $el: e, slides: i, progress: n, snapGrid: s } = t;
                        e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e) => {
                            a(e, n);
                        }),
                            i.each((e, i) => {
                                let r = e.progress;
                                t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (r += Math.ceil(i / 2) - n * (s.length - 1)),
                                    (r = Math.min(Math.max(r, -1), 1)),
                                    d(e)
                                        .find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]")
                                        .each((e) => {
                                            a(e, r);
                                        });
                            });
                    };
                n("beforeInit", () => {
                    t.params.parallax.enabled && ((t.params.watchSlidesProgress = !0), (t.originalParams.watchSlidesProgress = !0));
                }),
                    n("init", () => {
                        t.params.parallax.enabled && s();
                    }),
                    n("setTranslate", () => {
                        t.params.parallax.enabled && s();
                    }),
                    n("setTransition", (e, i) => {
                        t.params.parallax.enabled &&
                            (function (e) {
                                void 0 === e && (e = t.params.speed);
                                const { $el: i } = t;
                                i.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t) => {
                                    const i = d(t);
                                    let n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                                    0 === e && (n = 0), i.transition(n);
                                });
                            })(i);
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n, emit: a } = e;
                const r = s();
                i({ zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), (t.zoom = { enabled: !1 });
                let o,
                    l,
                    c,
                    p = 1,
                    u = !1;
                const f = { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 },
                    m = {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {},
                    },
                    g = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
                let v = 1;
                function w(e) {
                    if (e.targetTouches.length < 2) return 1;
                    const t = e.targetTouches[0].pageX,
                        i = e.targetTouches[0].pageY,
                        n = e.targetTouches[1].pageX,
                        a = e.targetTouches[1].pageY;
                    return Math.sqrt((n - t) ** 2 + (a - i) ** 2);
                }
                function y(e) {
                    const i = t.support,
                        n = t.params.zoom;
                    if (((l = !1), (c = !1), !i.gestures)) {
                        if ("touchstart" !== e.type || ("touchstart" === e.type && e.targetTouches.length < 2)) return;
                        (l = !0), (f.scaleStart = w(e));
                    }
                    (f.$slideEl && f.$slideEl.length) ||
                    ((f.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
                    0 === f.$slideEl.length && (f.$slideEl = t.slides.eq(t.activeIndex)),
                    (f.$imageEl = f.$slideEl.find(`.${n.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0)),
                    (f.$imageWrapEl = f.$imageEl.parent(`.${n.containerClass}`)),
                    (f.maxRatio = f.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
                    0 !== f.$imageWrapEl.length)
                        ? (f.$imageEl && f.$imageEl.transition(0), (u = !0))
                        : (f.$imageEl = void 0);
                }
                function b(e) {
                    const i = t.support,
                        n = t.params.zoom,
                        a = t.zoom;
                    if (!i.gestures) {
                        if ("touchmove" !== e.type || ("touchmove" === e.type && e.targetTouches.length < 2)) return;
                        (c = !0), (f.scaleMove = w(e));
                    }
                    f.$imageEl && 0 !== f.$imageEl.length
                        ? (i.gestures ? (a.scale = e.scale * p) : (a.scale = (f.scaleMove / f.scaleStart) * p),
                          a.scale > f.maxRatio && (a.scale = f.maxRatio - 1 + (a.scale - f.maxRatio + 1) ** 0.5),
                          a.scale < n.minRatio && (a.scale = n.minRatio + 1 - (n.minRatio - a.scale + 1) ** 0.5),
                          f.$imageEl.transform(`translate3d(0,0,0) scale(${a.scale})`))
                        : "gesturechange" === e.type && y(e);
                }
                function _(e) {
                    const i = t.device,
                        n = t.support,
                        a = t.params.zoom,
                        s = t.zoom;
                    if (!n.gestures) {
                        if (!l || !c) return;
                        if ("touchend" !== e.type || ("touchend" === e.type && e.changedTouches.length < 2 && !i.android)) return;
                        (l = !1), (c = !1);
                    }
                    f.$imageEl &&
                        0 !== f.$imageEl.length &&
                        ((s.scale = Math.max(Math.min(s.scale, f.maxRatio), a.minRatio)),
                        f.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${s.scale})`),
                        (p = s.scale),
                        (u = !1),
                        1 === s.scale && (f.$slideEl = void 0));
                }
                function x(e) {
                    const i = t.zoom;
                    if (!f.$imageEl || 0 === f.$imageEl.length) return;
                    if (((t.allowClick = !1), !m.isTouched || !f.$slideEl)) return;
                    m.isMoved ||
                        ((m.width = f.$imageEl[0].offsetWidth),
                        (m.height = f.$imageEl[0].offsetHeight),
                        (m.startX = h(f.$imageWrapEl[0], "x") || 0),
                        (m.startY = h(f.$imageWrapEl[0], "y") || 0),
                        (f.slideWidth = f.$slideEl[0].offsetWidth),
                        (f.slideHeight = f.$slideEl[0].offsetHeight),
                        f.$imageWrapEl.transition(0));
                    const n = m.width * i.scale,
                        a = m.height * i.scale;
                    if (!(n < f.slideWidth && a < f.slideHeight)) {
                        if (
                            ((m.minX = Math.min(f.slideWidth / 2 - n / 2, 0)),
                            (m.maxX = -m.minX),
                            (m.minY = Math.min(f.slideHeight / 2 - a / 2, 0)),
                            (m.maxY = -m.minY),
                            (m.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                            (m.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                            !m.isMoved && !u)
                        ) {
                            if (t.isHorizontal() && ((Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x) || (Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x)))
                                return void (m.isTouched = !1);
                            if (!t.isHorizontal() && ((Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y) || (Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y)))
                                return void (m.isTouched = !1);
                        }
                        e.cancelable && e.preventDefault(),
                            e.stopPropagation(),
                            (m.isMoved = !0),
                            (m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX),
                            (m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY),
                            m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** 0.8),
                            m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** 0.8),
                            m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** 0.8),
                            m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** 0.8),
                            g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x),
                            g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y),
                            g.prevTime || (g.prevTime = Date.now()),
                            (g.x = (m.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2),
                            (g.y = (m.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2),
                            Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
                            Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
                            (g.prevPositionX = m.touchesCurrent.x),
                            (g.prevPositionY = m.touchesCurrent.y),
                            (g.prevTime = Date.now()),
                            f.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`);
                    }
                }
                function T() {
                    const e = t.zoom;
                    f.$slideEl &&
                        t.previousIndex !== t.activeIndex &&
                        (f.$imageEl && f.$imageEl.transform("translate3d(0,0,0) scale(1)"),
                        f.$imageWrapEl && f.$imageWrapEl.transform("translate3d(0,0,0)"),
                        (e.scale = 1),
                        (p = 1),
                        (f.$slideEl = void 0),
                        (f.$imageEl = void 0),
                        (f.$imageWrapEl = void 0));
                }
                function E(e) {
                    const i = t.zoom,
                        n = t.params.zoom;
                    if (
                        (f.$slideEl ||
                            (e && e.target && (f.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
                            f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? (f.$slideEl = t.$wrapperEl.children(`.${t.params.slideActiveClass}`)) : (f.$slideEl = t.slides.eq(t.activeIndex))),
                            (f.$imageEl = f.$slideEl.find(`.${n.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0)),
                            (f.$imageWrapEl = f.$imageEl.parent(`.${n.containerClass}`))),
                        !f.$imageEl || 0 === f.$imageEl.length || !f.$imageWrapEl || 0 === f.$imageWrapEl.length)
                    )
                        return;
                    let a, s, o, l, c, u, h, g, v, w, y, b, _, x, T, E, S, M;
                    t.params.cssMode && ((t.wrapperEl.style.overflow = "hidden"), (t.wrapperEl.style.touchAction = "none")),
                        f.$slideEl.addClass(`${n.zoomedSlideClass}`),
                        void 0 === m.touchesStart.x && e
                            ? ((a = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX), (s = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
                            : ((a = m.touchesStart.x), (s = m.touchesStart.y)),
                        (i.scale = f.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
                        (p = f.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
                        e
                            ? ((S = f.$slideEl[0].offsetWidth),
                              (M = f.$slideEl[0].offsetHeight),
                              (o = f.$slideEl.offset().left + r.scrollX),
                              (l = f.$slideEl.offset().top + r.scrollY),
                              (c = o + S / 2 - a),
                              (u = l + M / 2 - s),
                              (v = f.$imageEl[0].offsetWidth),
                              (w = f.$imageEl[0].offsetHeight),
                              (y = v * i.scale),
                              (b = w * i.scale),
                              (_ = Math.min(S / 2 - y / 2, 0)),
                              (x = Math.min(M / 2 - b / 2, 0)),
                              (T = -_),
                              (E = -x),
                              (h = c * i.scale),
                              (g = u * i.scale),
                              h < _ && (h = _),
                              h > T && (h = T),
                              g < x && (g = x),
                              g > E && (g = E))
                            : ((h = 0), (g = 0)),
                        f.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`),
                        f.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${i.scale})`);
                }
                function S() {
                    const e = t.zoom,
                        i = t.params.zoom;
                    f.$slideEl ||
                        (t.params.virtual && t.params.virtual.enabled && t.virtual ? (f.$slideEl = t.$wrapperEl.children(`.${t.params.slideActiveClass}`)) : (f.$slideEl = t.slides.eq(t.activeIndex)),
                        (f.$imageEl = f.$slideEl.find(`.${i.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0)),
                        (f.$imageWrapEl = f.$imageEl.parent(`.${i.containerClass}`))),
                        f.$imageEl &&
                            0 !== f.$imageEl.length &&
                            f.$imageWrapEl &&
                            0 !== f.$imageWrapEl.length &&
                            (t.params.cssMode && ((t.wrapperEl.style.overflow = ""), (t.wrapperEl.style.touchAction = "")),
                            (e.scale = 1),
                            (p = 1),
                            f.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                            f.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                            f.$slideEl.removeClass(`${i.zoomedSlideClass}`),
                            (f.$slideEl = void 0));
                }
                function M(e) {
                    const i = t.zoom;
                    i.scale && 1 !== i.scale ? S() : E(e);
                }
                function C() {
                    const e = t.support;
                    return {
                        passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && { passive: !0, capture: !1 },
                        activeListenerWithCapture: !e.passiveListener || { passive: !1, capture: !0 },
                    };
                }
                function P() {
                    return `.${t.params.slideClass}`;
                }
                function A(e) {
                    const { passiveListener: i } = C(),
                        n = P();
                    t.$wrapperEl[e]("gesturestart", n, y, i), t.$wrapperEl[e]("gesturechange", n, b, i), t.$wrapperEl[e]("gestureend", n, _, i);
                }
                function $() {
                    o || ((o = !0), A("on"));
                }
                function z() {
                    o && ((o = !1), A("off"));
                }
                function k() {
                    const e = t.zoom;
                    if (e.enabled) return;
                    e.enabled = !0;
                    const i = t.support,
                        { passiveListener: n, activeListenerWithCapture: a } = C(),
                        s = P();
                    i.gestures
                        ? (t.$wrapperEl.on(t.touchEvents.start, $, n), t.$wrapperEl.on(t.touchEvents.end, z, n))
                        : "touchstart" === t.touchEvents.start &&
                          (t.$wrapperEl.on(t.touchEvents.start, s, y, n), t.$wrapperEl.on(t.touchEvents.move, s, b, a), t.$wrapperEl.on(t.touchEvents.end, s, _, n), t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, s, _, n)),
                        t.$wrapperEl.on(t.touchEvents.move, `.${t.params.zoom.containerClass}`, x, a);
                }
                function O() {
                    const e = t.zoom;
                    if (!e.enabled) return;
                    const i = t.support;
                    e.enabled = !1;
                    const { passiveListener: n, activeListenerWithCapture: a } = C(),
                        s = P();
                    i.gestures
                        ? (t.$wrapperEl.off(t.touchEvents.start, $, n), t.$wrapperEl.off(t.touchEvents.end, z, n))
                        : "touchstart" === t.touchEvents.start &&
                          (t.$wrapperEl.off(t.touchEvents.start, s, y, n),
                          t.$wrapperEl.off(t.touchEvents.move, s, b, a),
                          t.$wrapperEl.off(t.touchEvents.end, s, _, n),
                          t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, s, _, n)),
                        t.$wrapperEl.off(t.touchEvents.move, `.${t.params.zoom.containerClass}`, x, a);
                }
                Object.defineProperty(t.zoom, "scale", {
                    get: () => v,
                    set(e) {
                        if (v !== e) {
                            const t = f.$imageEl ? f.$imageEl[0] : void 0,
                                i = f.$slideEl ? f.$slideEl[0] : void 0;
                            a("zoomChange", e, t, i);
                        }
                        v = e;
                    },
                }),
                    n("init", () => {
                        t.params.zoom.enabled && k();
                    }),
                    n("destroy", () => {
                        O();
                    }),
                    n("touchStart", (e, i) => {
                        t.zoom.enabled &&
                            (function (e) {
                                const i = t.device;
                                f.$imageEl &&
                                    0 !== f.$imageEl.length &&
                                    (m.isTouched ||
                                        (i.android && e.cancelable && e.preventDefault(),
                                        (m.isTouched = !0),
                                        (m.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                                        (m.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
                            })(i);
                    }),
                    n("touchEnd", (e, i) => {
                        t.zoom.enabled &&
                            (function () {
                                const e = t.zoom;
                                if (!f.$imageEl || 0 === f.$imageEl.length) return;
                                if (!m.isTouched || !m.isMoved) return (m.isTouched = !1), void (m.isMoved = !1);
                                (m.isTouched = !1), (m.isMoved = !1);
                                let i = 300,
                                    n = 300;
                                const a = g.x * i,
                                    s = m.currentX + a,
                                    r = g.y * n,
                                    o = m.currentY + r;
                                0 !== g.x && (i = Math.abs((s - m.currentX) / g.x)), 0 !== g.y && (n = Math.abs((o - m.currentY) / g.y));
                                const l = Math.max(i, n);
                                (m.currentX = s), (m.currentY = o);
                                const d = m.width * e.scale,
                                    c = m.height * e.scale;
                                (m.minX = Math.min(f.slideWidth / 2 - d / 2, 0)),
                                    (m.maxX = -m.minX),
                                    (m.minY = Math.min(f.slideHeight / 2 - c / 2, 0)),
                                    (m.maxY = -m.minY),
                                    (m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX)),
                                    (m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY)),
                                    f.$imageWrapEl.transition(l).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`);
                            })();
                    }),
                    n("doubleTap", (e, i) => {
                        !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && M(i);
                    }),
                    n("transitionEnd", () => {
                        t.zoom.enabled && t.params.zoom.enabled && T();
                    }),
                    n("slideChange", () => {
                        t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && T();
                    }),
                    Object.assign(t.zoom, { enable: k, disable: O, in: E, out: S, toggle: M });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n, emit: a } = e;
                i({
                    lazy: {
                        checkInView: !1,
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        scrollingElement: "",
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader",
                    },
                }),
                    (t.lazy = {});
                let r = !1,
                    o = !1;
                function l(e, i) {
                    void 0 === i && (i = !0);
                    const n = t.params.lazy;
                    if (void 0 === e) return;
                    if (0 === t.slides.length) return;
                    const s = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e),
                        r = s.find(`.${n.elementClass}:not(.${n.loadedClass}):not(.${n.loadingClass})`);
                    !s.hasClass(n.elementClass) || s.hasClass(n.loadedClass) || s.hasClass(n.loadingClass) || r.push(s[0]),
                        0 !== r.length &&
                            r.each((e) => {
                                const r = d(e);
                                r.addClass(n.loadingClass);
                                const o = r.attr("data-background"),
                                    c = r.attr("data-src"),
                                    p = r.attr("data-srcset"),
                                    u = r.attr("data-sizes"),
                                    h = r.parent("picture");
                                t.loadImage(r[0], c || o, p, u, !1, () => {
                                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                                        if (
                                            (o
                                                ? (r.css("background-image", `url("${o}")`), r.removeAttr("data-background"))
                                                : (p && (r.attr("srcset", p), r.removeAttr("data-srcset")),
                                                  u && (r.attr("sizes", u), r.removeAttr("data-sizes")),
                                                  h.length &&
                                                      h.children("source").each((e) => {
                                                          const t = d(e);
                                                          t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"));
                                                      }),
                                                  c && (r.attr("src", c), r.removeAttr("data-src"))),
                                            r.addClass(n.loadedClass).removeClass(n.loadingClass),
                                            s.find(`.${n.preloaderClass}`).remove(),
                                            t.params.loop && i)
                                        ) {
                                            const e = s.attr("data-swiper-slide-index");
                                            if (s.hasClass(t.params.slideDuplicateClass)) {
                                                l(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1);
                                            } else {
                                                l(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1);
                                            }
                                        }
                                        a("lazyImageReady", s[0], r[0]), t.params.autoHeight && t.updateAutoHeight();
                                    }
                                }),
                                    a("lazyImageLoad", s[0], r[0]);
                            });
                }
                function c() {
                    const { $wrapperEl: e, params: i, slides: n, activeIndex: a } = t,
                        s = t.virtual && i.virtual.enabled,
                        r = i.lazy;
                    let c = i.slidesPerView;
                    function p(t) {
                        if (s) {
                            if (e.children(`.${i.slideClass}[data-swiper-slide-index="${t}"]`).length) return !0;
                        } else if (n[t]) return !0;
                        return !1;
                    }
                    function u(e) {
                        return s ? d(e).attr("data-swiper-slide-index") : d(e).index();
                    }
                    if (("auto" === c && (c = 0), o || (o = !0), t.params.watchSlidesProgress))
                        e.children(`.${i.slideVisibleClass}`).each((e) => {
                            l(s ? d(e).attr("data-swiper-slide-index") : d(e).index());
                        });
                    else if (c > 1) for (let e = a; e < a + c; e += 1) p(e) && l(e);
                    else l(a);
                    if (r.loadPrevNext)
                        if (c > 1 || (r.loadPrevNextAmount && r.loadPrevNextAmount > 1)) {
                            const e = r.loadPrevNextAmount,
                                t = Math.ceil(c),
                                i = Math.min(a + t + Math.max(e, t), n.length),
                                s = Math.max(a - Math.max(t, e), 0);
                            for (let e = a + t; e < i; e += 1) p(e) && l(e);
                            for (let e = s; e < a; e += 1) p(e) && l(e);
                        } else {
                            const t = e.children(`.${i.slideNextClass}`);
                            t.length > 0 && l(u(t));
                            const n = e.children(`.${i.slidePrevClass}`);
                            n.length > 0 && l(u(n));
                        }
                }
                function p() {
                    const e = s();
                    if (!t || t.destroyed) return;
                    const i = t.params.lazy.scrollingElement ? d(t.params.lazy.scrollingElement) : d(e),
                        n = i[0] === e,
                        a = n ? e.innerWidth : i[0].offsetWidth,
                        o = n ? e.innerHeight : i[0].offsetHeight,
                        l = t.$el.offset(),
                        { rtlTranslate: u } = t;
                    let h = !1;
                    u && (l.left -= t.$el[0].scrollLeft);
                    const f = [
                        [l.left, l.top],
                        [l.left + t.width, l.top],
                        [l.left, l.top + t.height],
                        [l.left + t.width, l.top + t.height],
                    ];
                    for (let e = 0; e < f.length; e += 1) {
                        const t = f[e];
                        if (t[0] >= 0 && t[0] <= a && t[1] >= 0 && t[1] <= o) {
                            if (0 === t[0] && 0 === t[1]) continue;
                            h = !0;
                        }
                    }
                    const m = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && { passive: !0, capture: !1 };
                    h ? (c(), i.off("scroll", p, m)) : r || ((r = !0), i.on("scroll", p, m));
                }
                n("beforeInit", () => {
                    t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1);
                }),
                    n("init", () => {
                        t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
                    }),
                    n("scroll", () => {
                        t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && c();
                    }),
                    n("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
                        t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
                    }),
                    n("transitionStart", () => {
                        t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || (!t.params.lazy.loadOnTransitionStart && !o)) && (t.params.lazy.checkInView ? p() : c());
                    }),
                    n("transitionEnd", () => {
                        t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? p() : c());
                    }),
                    n("slideChange", () => {
                        const { lazy: e, cssMode: i, watchSlidesProgress: n, touchReleaseOnEdges: a, resistanceRatio: s } = t.params;
                        e.enabled && (i || (n && (a || 0 === s))) && c();
                    }),
                    n("destroy", () => {
                        t.$el && t.$el.find(`.${t.params.lazy.loadingClass}`).removeClass(t.params.lazy.loadingClass);
                    }),
                    Object.assign(t.lazy, { load: c, loadInSlide: l });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                function a(e, t) {
                    const i = (function () {
                        let e, t, i;
                        return (n, a) => {
                            for (t = -1, e = n.length; e - t > 1; ) (i = (e + t) >> 1), n[i] <= a ? (t = i) : (e = i);
                            return e;
                        };
                    })();
                    let n, a;
                    return (
                        (this.x = e),
                        (this.y = t),
                        (this.lastIndex = e.length - 1),
                        (this.interpolate = function (e) {
                            return e ? ((a = i(this.x, e)), (n = a - 1), ((e - this.x[n]) * (this.y[a] - this.y[n])) / (this.x[a] - this.x[n]) + this.y[n]) : 0;
                        }),
                        this
                    );
                }
                function s() {
                    t.controller.control && t.controller.spline && ((t.controller.spline = void 0), delete t.controller.spline);
                }
                i({ controller: { control: void 0, inverse: !1, by: "slide" } }),
                    (t.controller = { control: void 0 }),
                    n("beforeInit", () => {
                        t.controller.control = t.params.controller.control;
                    }),
                    n("update", () => {
                        s();
                    }),
                    n("resize", () => {
                        s();
                    }),
                    n("observerUpdate", () => {
                        s();
                    }),
                    n("setTranslate", (e, i, n) => {
                        t.controller.control && t.controller.setTranslate(i, n);
                    }),
                    n("setTransition", (e, i, n) => {
                        t.controller.control && t.controller.setTransition(i, n);
                    }),
                    Object.assign(t.controller, {
                        setTranslate: function (e, i) {
                            const n = t.controller.control;
                            let s, r;
                            const o = t.constructor;
                            function l(e) {
                                const i = t.rtlTranslate ? -t.translate : t.translate;
                                "slide" === t.params.controller.by &&
                                    (!(function (e) {
                                        t.controller.spline || (t.controller.spline = t.params.loop ? new a(t.slidesGrid, e.slidesGrid) : new a(t.snapGrid, e.snapGrid));
                                    })(e),
                                    (r = -t.controller.spline.interpolate(-i))),
                                    (r && "container" !== t.params.controller.by) || ((s = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate())), (r = (i - t.minTranslate()) * s + e.minTranslate())),
                                    t.params.controller.inverse && (r = e.maxTranslate() - r),
                                    e.updateProgress(r),
                                    e.setTranslate(r, t),
                                    e.updateActiveIndex(),
                                    e.updateSlidesClasses();
                            }
                            if (Array.isArray(n)) for (let e = 0; e < n.length; e += 1) n[e] !== i && n[e] instanceof o && l(n[e]);
                            else n instanceof o && i !== n && l(n);
                        },
                        setTransition: function (e, i) {
                            const n = t.constructor,
                                a = t.controller.control;
                            let s;
                            function r(i) {
                                i.setTransition(e, t),
                                    0 !== e &&
                                        (i.transitionStart(),
                                        i.params.autoHeight &&
                                            p(() => {
                                                i.updateAutoHeight();
                                            }),
                                        i.$wrapperEl.transitionEnd(() => {
                                            a && (i.params.loop && "slide" === t.params.controller.by && i.loopFix(), i.transitionEnd());
                                        }));
                            }
                            if (Array.isArray(a)) for (s = 0; s < a.length; s += 1) a[s] !== i && a[s] instanceof n && r(a[s]);
                            else a instanceof n && i !== a && r(a);
                        },
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                        slideLabelMessage: "{{index}} / {{slidesLength}}",
                        containerMessage: null,
                        containerRoleDescriptionMessage: null,
                        itemRoleDescriptionMessage: null,
                        slideRole: "group",
                        id: null,
                    },
                });
                let a = null;
                function s(e) {
                    const t = a;
                    0 !== t.length && (t.html(""), t.html(e));
                }
                function r(e) {
                    e.attr("tabIndex", "0");
                }
                function o(e) {
                    e.attr("tabIndex", "-1");
                }
                function l(e, t) {
                    e.attr("role", t);
                }
                function c(e, t) {
                    e.attr("aria-roledescription", t);
                }
                function p(e, t) {
                    e.attr("aria-label", t);
                }
                function u(e) {
                    e.attr("aria-disabled", !0);
                }
                function h(e) {
                    e.attr("aria-disabled", !1);
                }
                function f(e) {
                    if (13 !== e.keyCode && 32 !== e.keyCode) return;
                    const i = t.params.a11y,
                        n = d(e.target);
                    t.navigation && t.navigation.$nextEl && n.is(t.navigation.$nextEl) && ((t.isEnd && !t.params.loop) || t.slideNext(), t.isEnd ? s(i.lastSlideMessage) : s(i.nextSlideMessage)),
                        t.navigation && t.navigation.$prevEl && n.is(t.navigation.$prevEl) && ((t.isBeginning && !t.params.loop) || t.slidePrev(), t.isBeginning ? s(i.firstSlideMessage) : s(i.prevSlideMessage)),
                        t.pagination && n.is(U(t.params.pagination.bulletClass)) && n[0].click();
                }
                function m() {
                    return t.pagination && t.pagination.bullets && t.pagination.bullets.length;
                }
                function g() {
                    return m() && t.params.pagination.clickable;
                }
                const v = (e, t, i) => {
                        r(e),
                            "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", f)),
                            p(e, i),
                            (function (e, t) {
                                e.attr("aria-controls", t);
                            })(e, t);
                    },
                    w = (e) => {
                        const i = e.target.closest(`.${t.params.slideClass}`);
                        if (!i || !t.slides.includes(i)) return;
                        const n = t.slides.indexOf(i) === t.activeIndex,
                            a = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(i);
                        n || a || t.slideTo(t.slides.indexOf(i), 0);
                    },
                    y = () => {
                        const e = t.params.a11y;
                        e.itemRoleDescriptionMessage && c(d(t.slides), e.itemRoleDescriptionMessage), l(d(t.slides), e.slideRole);
                        const i = t.params.loop ? t.slides.filter((e) => !e.classList.contains(t.params.slideDuplicateClass)).length : t.slides.length;
                        e.slideLabelMessage &&
                            t.slides.each((n, a) => {
                                const s = d(n),
                                    r = t.params.loop ? parseInt(s.attr("data-swiper-slide-index"), 10) : a;
                                p(s, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, i));
                            });
                    },
                    b = () => {
                        const e = t.params.a11y;
                        t.$el.append(a);
                        const i = t.$el;
                        e.containerRoleDescriptionMessage && c(i, e.containerRoleDescriptionMessage), e.containerMessage && p(i, e.containerMessage);
                        const n = t.$wrapperEl,
                            s = e.id || n.attr("id") || `swiper-wrapper-${((r = 16), void 0 === r && (r = 16), "x".repeat(r).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)))}`;
                        var r;
                        const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
                        var l;
                        let d, u;
                        (l = s),
                            n.attr("id", l),
                            (function (e, t) {
                                e.attr("aria-live", t);
                            })(n, o),
                            y(),
                            t.navigation && t.navigation.$nextEl && (d = t.navigation.$nextEl),
                            t.navigation && t.navigation.$prevEl && (u = t.navigation.$prevEl),
                            d && d.length && v(d, s, e.nextSlideMessage),
                            u && u.length && v(u, s, e.prevSlideMessage),
                            g() && t.pagination.$el.on("keydown", U(t.params.pagination.bulletClass), f),
                            t.$el.on("focus", w, !0);
                    };
                n("beforeInit", () => {
                    a = d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
                }),
                    n("afterInit", () => {
                        t.params.a11y.enabled && b();
                    }),
                    n("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
                        t.params.a11y.enabled && y();
                    }),
                    n("fromEdge toEdge afterInit lock unlock", () => {
                        t.params.a11y.enabled &&
                            (function () {
                                if (t.params.loop || t.params.rewind || !t.navigation) return;
                                const { $nextEl: e, $prevEl: i } = t.navigation;
                                i && i.length > 0 && (t.isBeginning ? (u(i), o(i)) : (h(i), r(i))), e && e.length > 0 && (t.isEnd ? (u(e), o(e)) : (h(e), r(e)));
                            })();
                    }),
                    n("paginationUpdate", () => {
                        t.params.a11y.enabled &&
                            (function () {
                                const e = t.params.a11y;
                                m() &&
                                    t.pagination.bullets.each((i) => {
                                        const n = d(i);
                                        t.params.pagination.clickable && (r(n), t.params.pagination.renderBullet || (l(n, "button"), p(n, e.paginationBulletMessage.replace(/\{\{index\}\}/, n.index() + 1)))),
                                            n.is(`.${t.params.pagination.bulletActiveClass}`) ? n.attr("aria-current", "true") : n.removeAttr("aria-current");
                                    });
                            })();
                    }),
                    n("destroy", () => {
                        t.params.a11y.enabled &&
                            (function () {
                                let e, i;
                                a && a.length > 0 && a.remove(),
                                    t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl),
                                    t.navigation && t.navigation.$prevEl && (i = t.navigation.$prevEl),
                                    e && e.off("keydown", f),
                                    i && i.off("keydown", f),
                                    g() && t.pagination.$el.off("keydown", U(t.params.pagination.bulletClass), f),
                                    t.$el.off("focus", w, !0);
                            })();
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } });
                let a = !1,
                    r = {};
                const o = (e) =>
                        e
                            .toString()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]+/g, "")
                            .replace(/--+/g, "-")
                            .replace(/^-+/, "")
                            .replace(/-+$/, ""),
                    l = (e) => {
                        const t = s();
                        let i;
                        i = e ? new URL(e) : t.location;
                        const n = i.pathname
                                .slice(1)
                                .split("/")
                                .filter((e) => "" !== e),
                            a = n.length;
                        return { key: n[a - 2], value: n[a - 1] };
                    },
                    d = (e, i) => {
                        const n = s();
                        if (!a || !t.params.history.enabled) return;
                        let r;
                        r = t.params.url ? new URL(t.params.url) : n.location;
                        const l = t.slides.eq(i);
                        let d = o(l.attr("data-history"));
                        if (t.params.history.root.length > 0) {
                            let i = t.params.history.root;
                            "/" === i[i.length - 1] && (i = i.slice(0, i.length - 1)), (d = `${i}/${e}/${d}`);
                        } else r.pathname.includes(e) || (d = `${e}/${d}`);
                        t.params.history.keepQuery && (d += r.search);
                        const c = n.history.state;
                        (c && c.value === d) || (t.params.history.replaceState ? n.history.replaceState({ value: d }, null, d) : n.history.pushState({ value: d }, null, d));
                    },
                    c = (e, i, n) => {
                        if (i)
                            for (let a = 0, s = t.slides.length; a < s; a += 1) {
                                const s = t.slides.eq(a);
                                if (o(s.attr("data-history")) === i && !s.hasClass(t.params.slideDuplicateClass)) {
                                    const i = s.index();
                                    t.slideTo(i, e, n);
                                }
                            }
                        else t.slideTo(0, e, n);
                    },
                    p = () => {
                        (r = l(t.params.url)), c(t.params.speed, r.value, !1);
                    };
                n("init", () => {
                    t.params.history.enabled &&
                        (() => {
                            const e = s();
                            if (t.params.history) {
                                if (!e.history || !e.history.pushState) return (t.params.history.enabled = !1), void (t.params.hashNavigation.enabled = !0);
                                (a = !0), (r = l(t.params.url)), (r.key || r.value) && (c(0, r.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", p));
                            }
                        })();
                }),
                    n("destroy", () => {
                        t.params.history.enabled &&
                            (() => {
                                const e = s();
                                t.params.history.replaceState || e.removeEventListener("popstate", p);
                            })();
                    }),
                    n("transitionEnd _freeModeNoMomentumRelease", () => {
                        a && d(t.params.history.key, t.activeIndex);
                    }),
                    n("slideChange", () => {
                        a && t.params.cssMode && d(t.params.history.key, t.activeIndex);
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, emit: a, on: r } = e,
                    o = !1;
                const l = n(),
                    c = s();
                i({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
                const p = () => {
                        a("hashChange");
                        const e = l.location.hash.replace("#", "");
                        if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                            const i = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                            if (void 0 === i) return;
                            t.slideTo(i);
                        }
                    },
                    u = () => {
                        if (o && t.params.hashNavigation.enabled)
                            if (t.params.hashNavigation.replaceState && c.history && c.history.replaceState) c.history.replaceState(null, null, `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""), a("hashSet");
                            else {
                                const e = t.slides.eq(t.activeIndex),
                                    i = e.attr("data-hash") || e.attr("data-history");
                                (l.location.hash = i || ""), a("hashSet");
                            }
                    };
                r("init", () => {
                    t.params.hashNavigation.enabled &&
                        (() => {
                            if (!t.params.hashNavigation.enabled || (t.params.history && t.params.history.enabled)) return;
                            o = !0;
                            const e = l.location.hash.replace("#", "");
                            if (e) {
                                const i = 0;
                                for (let n = 0, a = t.slides.length; n < a; n += 1) {
                                    const a = t.slides.eq(n);
                                    if ((a.attr("data-hash") || a.attr("data-history")) === e && !a.hasClass(t.params.slideDuplicateClass)) {
                                        const e = a.index();
                                        t.slideTo(e, i, t.params.runCallbacksOnInit, !0);
                                    }
                                }
                            }
                            t.params.hashNavigation.watchState && d(c).on("hashchange", p);
                        })();
                }),
                    r("destroy", () => {
                        t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d(c).off("hashchange", p);
                    }),
                    r("transitionEnd _freeModeNoMomentumRelease", () => {
                        o && u();
                    }),
                    r("slideChange", () => {
                        o && t.params.cssMode && u();
                    });
            },
            function (e) {
                let t,
                    { swiper: i, extendParams: a, on: s, emit: r } = e;
                function o() {
                    const e = i.slides.eq(i.activeIndex);
                    let n = i.params.autoplay.delay;
                    e.attr("data-swiper-autoplay") && (n = e.attr("data-swiper-autoplay") || i.params.autoplay.delay),
                        clearTimeout(t),
                        (t = p(() => {
                            let e;
                            i.params.autoplay.reverseDirection
                                ? i.params.loop
                                    ? (i.loopFix(), (e = i.slidePrev(i.params.speed, !0, !0)), r("autoplay"))
                                    : i.isBeginning
                                    ? i.params.autoplay.stopOnLastSlide
                                        ? d()
                                        : ((e = i.slideTo(i.slides.length - 1, i.params.speed, !0, !0)), r("autoplay"))
                                    : ((e = i.slidePrev(i.params.speed, !0, !0)), r("autoplay"))
                                : i.params.loop
                                ? (i.loopFix(), (e = i.slideNext(i.params.speed, !0, !0)), r("autoplay"))
                                : i.isEnd
                                ? i.params.autoplay.stopOnLastSlide
                                    ? d()
                                    : ((e = i.slideTo(0, i.params.speed, !0, !0)), r("autoplay"))
                                : ((e = i.slideNext(i.params.speed, !0, !0)), r("autoplay")),
                                ((i.params.cssMode && i.autoplay.running) || !1 === e) && o();
                        }, n));
                }
                function l() {
                    return void 0 === t && !i.autoplay.running && ((i.autoplay.running = !0), r("autoplayStart"), o(), !0);
                }
                function d() {
                    return !!i.autoplay.running && void 0 !== t && (t && (clearTimeout(t), (t = void 0)), (i.autoplay.running = !1), r("autoplayStop"), !0);
                }
                function c(e) {
                    i.autoplay.running &&
                        (i.autoplay.paused ||
                            (t && clearTimeout(t),
                            (i.autoplay.paused = !0),
                            0 !== e && i.params.autoplay.waitForTransition
                                ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                                      i.$wrapperEl[0].addEventListener(e, h);
                                  })
                                : ((i.autoplay.paused = !1), o())));
                }
                function u() {
                    const e = n();
                    "hidden" === e.visibilityState && i.autoplay.running && c(), "visible" === e.visibilityState && i.autoplay.paused && (o(), (i.autoplay.paused = !1));
                }
                function h(e) {
                    i &&
                        !i.destroyed &&
                        i.$wrapperEl &&
                        e.target === i.$wrapperEl[0] &&
                        (["transitionend", "webkitTransitionEnd"].forEach((e) => {
                            i.$wrapperEl[0].removeEventListener(e, h);
                        }),
                        (i.autoplay.paused = !1),
                        i.autoplay.running ? o() : d());
                }
                function f() {
                    i.params.autoplay.disableOnInteraction ? d() : (r("autoplayPause"), c()),
                        ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                            i.$wrapperEl[0].removeEventListener(e, h);
                        });
                }
                function m() {
                    i.params.autoplay.disableOnInteraction || ((i.autoplay.paused = !1), r("autoplayResume"), o());
                }
                (i.autoplay = { running: !1, paused: !1 }),
                    a({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }),
                    s("init", () => {
                        if (i.params.autoplay.enabled) {
                            l();
                            n().addEventListener("visibilitychange", u), i.params.autoplay.pauseOnMouseEnter && (i.$el.on("mouseenter", f), i.$el.on("mouseleave", m));
                        }
                    }),
                    s("beforeTransitionStart", (e, t, n) => {
                        i.autoplay.running && (n || !i.params.autoplay.disableOnInteraction ? i.autoplay.pause(t) : d());
                    }),
                    s("sliderFirstMove", () => {
                        i.autoplay.running && (i.params.autoplay.disableOnInteraction ? d() : c());
                    }),
                    s("touchEnd", () => {
                        i.params.cssMode && i.autoplay.paused && !i.params.autoplay.disableOnInteraction && o();
                    }),
                    s("destroy", () => {
                        i.$el.off("mouseenter", f), i.$el.off("mouseleave", m), i.autoplay.running && d();
                        n().removeEventListener("visibilitychange", u);
                    }),
                    Object.assign(i.autoplay, { pause: c, run: o, start: l, stop: d });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ thumbs: { swiper: null, multipleActiveThumbs: !0, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } });
                let a = !1,
                    s = !1;
                function r() {
                    const e = t.thumbs.swiper;
                    if (!e || e.destroyed) return;
                    const i = e.clickedIndex,
                        n = e.clickedSlide;
                    if (n && d(n).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
                    if (null == i) return;
                    let a;
                    if (((a = e.params.loop ? parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10) : i), t.params.loop)) {
                        let e = t.activeIndex;
                        t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), (t._clientLeft = t.$wrapperEl[0].clientLeft), (e = t.activeIndex));
                        const i = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${a}"]`).eq(0).index(),
                            n = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${a}"]`).eq(0).index();
                        a = void 0 === i ? n : void 0 === n ? i : n - e < e - i ? n : i;
                    }
                    t.slideTo(a);
                }
                function o() {
                    const { thumbs: e } = t.params;
                    if (a) return !1;
                    a = !0;
                    const i = t.constructor;
                    if (e.swiper instanceof i)
                        (t.thumbs.swiper = e.swiper),
                            Object.assign(t.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                            Object.assign(t.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 });
                    else if (f(e.swiper)) {
                        const n = Object.assign({}, e.swiper);
                        Object.assign(n, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), (t.thumbs.swiper = new i(n)), (s = !0);
                    }
                    return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", r), !0;
                }
                function l(e) {
                    const i = t.thumbs.swiper;
                    if (!i || i.destroyed) return;
                    const n = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView,
                        a = t.params.thumbs.autoScrollOffset,
                        s = a && !i.params.loop;
                    if (t.realIndex !== i.realIndex || s) {
                        let r,
                            o,
                            l = i.activeIndex;
                        if (i.params.loop) {
                            i.slides.eq(l).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft), (l = i.activeIndex));
                            const e = i.slides.eq(l).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),
                                n = i.slides.eq(l).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                            (r = void 0 === e ? n : void 0 === n ? e : n - l == l - e ? (i.params.slidesPerGroup > 1 ? n : l) : n - l < l - e ? n : e), (o = t.activeIndex > t.previousIndex ? "next" : "prev");
                        } else (r = t.realIndex), (o = r > t.previousIndex ? "next" : "prev");
                        s && (r += "next" === o ? a : -1 * a),
                            i.visibleSlidesIndexes &&
                                i.visibleSlidesIndexes.indexOf(r) < 0 &&
                                (i.params.centeredSlides ? (r = r > l ? r - Math.floor(n / 2) + 1 : r + Math.floor(n / 2) - 1) : r > l && i.params.slidesPerGroup, i.slideTo(r, e ? 0 : void 0));
                    }
                    let r = 1;
                    const o = t.params.thumbs.slideThumbActiveClass;
                    if (
                        (t.params.slidesPerView > 1 && !t.params.centeredSlides && (r = t.params.slidesPerView),
                        t.params.thumbs.multipleActiveThumbs || (r = 1),
                        (r = Math.floor(r)),
                        i.slides.removeClass(o),
                        i.params.loop || (i.params.virtual && i.params.virtual.enabled))
                    )
                        for (let e = 0; e < r; e += 1) i.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex + e}"]`).addClass(o);
                    else for (let e = 0; e < r; e += 1) i.slides.eq(t.realIndex + e).addClass(o);
                }
                (t.thumbs = { swiper: null }),
                    n("beforeInit", () => {
                        const { thumbs: e } = t.params;
                        e && e.swiper && (o(), l(!0));
                    }),
                    n("slideChange update resize observerUpdate", () => {
                        l();
                    }),
                    n("setTransition", (e, i) => {
                        const n = t.thumbs.swiper;
                        n && !n.destroyed && n.setTransition(i);
                    }),
                    n("beforeDestroy", () => {
                        const e = t.thumbs.swiper;
                        e && !e.destroyed && s && e.destroy();
                    }),
                    Object.assign(t.thumbs, { init: o, update: l });
            },
            function (e) {
                let { swiper: t, extendParams: i, emit: n, once: a } = e;
                i({ freeMode: { enabled: !1, momentum: !0, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: !1, minimumVelocity: 0.02 } }),
                    Object.assign(t, {
                        freeMode: {
                            onTouchStart: function () {
                                const e = t.getTranslate();
                                t.setTranslate(e), t.setTransition(0), (t.touchEventsData.velocities.length = 0), t.freeMode.onTouchEnd({ currentPos: t.rtl ? t.translate : -t.translate });
                            },
                            onTouchMove: function () {
                                const { touchEventsData: e, touches: i } = t;
                                0 === e.velocities.length && e.velocities.push({ position: i[t.isHorizontal() ? "startX" : "startY"], time: e.touchStartTime }),
                                    e.velocities.push({ position: i[t.isHorizontal() ? "currentX" : "currentY"], time: u() });
                            },
                            onTouchEnd: function (e) {
                                let { currentPos: i } = e;
                                const { params: s, $wrapperEl: r, rtlTranslate: o, snapGrid: l, touchEventsData: d } = t,
                                    c = u() - d.touchStartTime;
                                if (i < -t.minTranslate()) t.slideTo(t.activeIndex);
                                else if (i > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);
                                else {
                                    if (s.freeMode.momentum) {
                                        if (d.velocities.length > 1) {
                                            const e = d.velocities.pop(),
                                                i = d.velocities.pop(),
                                                n = e.position - i.position,
                                                a = e.time - i.time;
                                            (t.velocity = n / a), (t.velocity /= 2), Math.abs(t.velocity) < s.freeMode.minimumVelocity && (t.velocity = 0), (a > 150 || u() - e.time > 300) && (t.velocity = 0);
                                        } else t.velocity = 0;
                                        (t.velocity *= s.freeMode.momentumVelocityRatio), (d.velocities.length = 0);
                                        let e = 1e3 * s.freeMode.momentumRatio;
                                        const i = t.velocity * e;
                                        let c = t.translate + i;
                                        o && (c = -c);
                                        let p,
                                            h = !1;
                                        const f = 20 * Math.abs(t.velocity) * s.freeMode.momentumBounceRatio;
                                        let m;
                                        if (c < t.maxTranslate())
                                            s.freeMode.momentumBounce ? (c + t.maxTranslate() < -f && (c = t.maxTranslate() - f), (p = t.maxTranslate()), (h = !0), (d.allowMomentumBounce = !0)) : (c = t.maxTranslate()),
                                                s.loop && s.centeredSlides && (m = !0);
                                        else if (c > t.minTranslate())
                                            s.freeMode.momentumBounce ? (c - t.minTranslate() > f && (c = t.minTranslate() + f), (p = t.minTranslate()), (h = !0), (d.allowMomentumBounce = !0)) : (c = t.minTranslate()),
                                                s.loop && s.centeredSlides && (m = !0);
                                        else if (s.freeMode.sticky) {
                                            let e;
                                            for (let t = 0; t < l.length; t += 1)
                                                if (l[t] > -c) {
                                                    e = t;
                                                    break;
                                                }
                                            (c = Math.abs(l[e] - c) < Math.abs(l[e - 1] - c) || "next" === t.swipeDirection ? l[e] : l[e - 1]), (c = -c);
                                        }
                                        if (
                                            (m &&
                                                a("transitionEnd", () => {
                                                    t.loopFix();
                                                }),
                                            0 !== t.velocity)
                                        ) {
                                            if (((e = o ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity)), s.freeMode.sticky)) {
                                                const i = Math.abs((o ? -c : c) - t.translate),
                                                    n = t.slidesSizesGrid[t.activeIndex];
                                                e = i < n ? s.speed : i < 2 * n ? 1.5 * s.speed : 2.5 * s.speed;
                                            }
                                        } else if (s.freeMode.sticky) return void t.slideToClosest();
                                        s.freeMode.momentumBounce && h
                                            ? (t.updateProgress(p),
                                              t.setTransition(e),
                                              t.setTranslate(c),
                                              t.transitionStart(!0, t.swipeDirection),
                                              (t.animating = !0),
                                              r.transitionEnd(() => {
                                                  t &&
                                                      !t.destroyed &&
                                                      d.allowMomentumBounce &&
                                                      (n("momentumBounce"),
                                                      t.setTransition(s.speed),
                                                      setTimeout(() => {
                                                          t.setTranslate(p),
                                                              r.transitionEnd(() => {
                                                                  t && !t.destroyed && t.transitionEnd();
                                                              });
                                                      }, 0));
                                              }))
                                            : t.velocity
                                            ? (n("_freeModeNoMomentumRelease"),
                                              t.updateProgress(c),
                                              t.setTransition(e),
                                              t.setTranslate(c),
                                              t.transitionStart(!0, t.swipeDirection),
                                              t.animating ||
                                                  ((t.animating = !0),
                                                  r.transitionEnd(() => {
                                                      t && !t.destroyed && t.transitionEnd();
                                                  })))
                                            : t.updateProgress(c),
                                            t.updateActiveIndex(),
                                            t.updateSlidesClasses();
                                    } else {
                                        if (s.freeMode.sticky) return void t.slideToClosest();
                                        s.freeMode && n("_freeModeNoMomentumRelease");
                                    }
                                    (!s.freeMode.momentum || c >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
                                }
                            },
                        },
                    });
            },
            function (e) {
                let t,
                    i,
                    n,
                    { swiper: a, extendParams: s } = e;
                s({ grid: { rows: 1, fill: "column" } }),
                    (a.grid = {
                        initSlides: (e) => {
                            const { slidesPerView: s } = a.params,
                                { rows: r, fill: o } = a.params.grid;
                            (i = t / r), (n = Math.floor(e / r)), (t = Math.floor(e / r) === e / r ? e : Math.ceil(e / r) * r), "auto" !== s && "row" === o && (t = Math.max(t, s * r));
                        },
                        updateSlide: (e, s, r, o) => {
                            const { slidesPerGroup: l, spaceBetween: d } = a.params,
                                { rows: c, fill: p } = a.params.grid;
                            let u, h, f;
                            if ("row" === p && l > 1) {
                                const i = Math.floor(e / (l * c)),
                                    n = e - c * l * i,
                                    a = 0 === i ? l : Math.min(Math.ceil((r - i * c * l) / c), l);
                                (f = Math.floor(n / a)), (h = n - f * a + i * l), (u = h + (f * t) / c), s.css({ "-webkit-order": u, order: u });
                            } else "column" === p ? ((h = Math.floor(e / c)), (f = e - h * c), (h > n || (h === n && f === c - 1)) && ((f += 1), f >= c && ((f = 0), (h += 1)))) : ((f = Math.floor(e / i)), (h = e - f * i));
                            s.css(o("margin-top"), 0 !== f ? d && `${d}px` : "");
                        },
                        updateWrapperSize: (e, i, n) => {
                            const { spaceBetween: s, centeredSlides: r, roundLengths: o } = a.params,
                                { rows: l } = a.params.grid;
                            if (((a.virtualSize = (e + s) * t), (a.virtualSize = Math.ceil(a.virtualSize / l) - s), a.$wrapperEl.css({ [n("width")]: `${a.virtualSize + s}px` }), r)) {
                                i.splice(0, i.length);
                                const e = [];
                                for (let t = 0; t < i.length; t += 1) {
                                    let n = i[t];
                                    o && (n = Math.floor(n)), i[t] < a.virtualSize + i[0] && e.push(n);
                                }
                                i.push(...e);
                            }
                        },
                    });
            },
            function (e) {
                let { swiper: t } = e;
                Object.assign(t, { appendSlide: Z.bind(t), prependSlide: Q.bind(t), addSlide: K.bind(t), removeSlide: J.bind(t), removeAllSlides: ee.bind(t) });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ fadeEffect: { crossFade: !1, transformEl: null } }),
                    te({
                        effect: "fade",
                        swiper: t,
                        on: n,
                        setTranslate: () => {
                            const { slides: e } = t,
                                i = t.params.fadeEffect;
                            for (let n = 0; n < e.length; n += 1) {
                                const e = t.slides.eq(n);
                                let a = -e[0].swiperSlideOffset;
                                t.params.virtualTranslate || (a -= t.translate);
                                let s = 0;
                                t.isHorizontal() || ((s = a), (a = 0));
                                const r = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                                ie(i, e).css({ opacity: r }).transform(`translate3d(${a}px, ${s}px, 0px)`);
                            }
                        },
                        setTransition: (e) => {
                            const { transformEl: i } = t.params.fadeEffect;
                            (i ? t.slides.find(i) : t.slides).transition(e), ne({ swiper: t, duration: e, transformEl: i, allSlides: !0 });
                        },
                        overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }),
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } });
                const a = (e, t, i) => {
                    let n = i ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                        a = i ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                    0 === n.length && ((n = d(`<div class="swiper-slide-shadow-${i ? "left" : "top"}"></div>`)), e.append(n)),
                        0 === a.length && ((a = d(`<div class="swiper-slide-shadow-${i ? "right" : "bottom"}"></div>`)), e.append(a)),
                        n.length && (n[0].style.opacity = Math.max(-t, 0)),
                        a.length && (a[0].style.opacity = Math.max(t, 0));
                };
                te({
                    effect: "cube",
                    swiper: t,
                    on: n,
                    setTranslate: () => {
                        const { $el: e, $wrapperEl: i, slides: n, width: s, height: r, rtlTranslate: o, size: l, browser: c } = t,
                            p = t.params.cubeEffect,
                            u = t.isHorizontal(),
                            h = t.virtual && t.params.virtual.enabled;
                        let f,
                            m = 0;
                        p.shadow &&
                            (u
                                ? ((f = i.find(".swiper-cube-shadow")), 0 === f.length && ((f = d('<div class="swiper-cube-shadow"></div>')), i.append(f)), f.css({ height: `${s}px` }))
                                : ((f = e.find(".swiper-cube-shadow")), 0 === f.length && ((f = d('<div class="swiper-cube-shadow"></div>')), e.append(f))));
                        for (let e = 0; e < n.length; e += 1) {
                            const t = n.eq(e);
                            let i = e;
                            h && (i = parseInt(t.attr("data-swiper-slide-index"), 10));
                            let s = 90 * i,
                                r = Math.floor(s / 360);
                            o && ((s = -s), (r = Math.floor(-s / 360)));
                            const d = Math.max(Math.min(t[0].progress, 1), -1);
                            let c = 0,
                                f = 0,
                                g = 0;
                            i % 4 == 0 ? ((c = 4 * -r * l), (g = 0)) : (i - 1) % 4 == 0 ? ((c = 0), (g = 4 * -r * l)) : (i - 2) % 4 == 0 ? ((c = l + 4 * r * l), (g = l)) : (i - 3) % 4 == 0 && ((c = -l), (g = 3 * l + 4 * l * r)),
                                o && (c = -c),
                                u || ((f = c), (c = 0));
                            const v = `rotateX(${u ? 0 : -s}deg) rotateY(${u ? s : 0}deg) translate3d(${c}px, ${f}px, ${g}px)`;
                            d <= 1 && d > -1 && ((m = 90 * i + 90 * d), o && (m = 90 * -i - 90 * d)), t.transform(v), p.slideShadows && a(t, d, u);
                        }
                        if ((i.css({ "-webkit-transform-origin": `50% 50% -${l / 2}px`, "transform-origin": `50% 50% -${l / 2}px` }), p.shadow))
                            if (u) f.transform(`translate3d(0px, ${s / 2 + p.shadowOffset}px, ${-s / 2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);
                            else {
                                const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                                    t = 1.5 - (Math.sin((2 * e * Math.PI) / 360) / 2 + Math.cos((2 * e * Math.PI) / 360) / 2),
                                    i = p.shadowScale,
                                    n = p.shadowScale / t,
                                    a = p.shadowOffset;
                                f.transform(`scale3d(${i}, 1, ${n}) translate3d(0px, ${r / 2 + a}px, ${-r / 2 / n}px) rotateX(-90deg)`);
                            }
                        const g = c.isSafari || c.isWebView ? -l / 2 : 0;
                        i.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal() ? 0 : m}deg) rotateY(${t.isHorizontal() ? -m : 0}deg)`), i[0].style.setProperty("--swiper-cube-translate-z", `${g}px`);
                    },
                    setTransition: (e) => {
                        const { $el: i, slides: n } = t;
                        n.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                            t.params.cubeEffect.shadow && !t.isHorizontal() && i.find(".swiper-cube-shadow").transition(e);
                    },
                    recreateShadows: () => {
                        const e = t.isHorizontal();
                        t.slides.each((t) => {
                            const i = Math.max(Math.min(t.progress, 1), -1);
                            a(d(t), i, e);
                        });
                    },
                    getEffectParams: () => t.params.cubeEffect,
                    perspective: () => !0,
                    overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 }),
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null } });
                const a = (e, i, n) => {
                    let a = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                        s = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                    0 === a.length && (a = ae(n, e, t.isHorizontal() ? "left" : "top")),
                        0 === s.length && (s = ae(n, e, t.isHorizontal() ? "right" : "bottom")),
                        a.length && (a[0].style.opacity = Math.max(-i, 0)),
                        s.length && (s[0].style.opacity = Math.max(i, 0));
                };
                te({
                    effect: "flip",
                    swiper: t,
                    on: n,
                    setTranslate: () => {
                        const { slides: e, rtlTranslate: i } = t,
                            n = t.params.flipEffect;
                        for (let s = 0; s < e.length; s += 1) {
                            const r = e.eq(s);
                            let o = r[0].progress;
                            t.params.flipEffect.limitRotation && (o = Math.max(Math.min(r[0].progress, 1), -1));
                            const l = r[0].swiperSlideOffset;
                            let d = -180 * o,
                                c = 0,
                                p = t.params.cssMode ? -l - t.translate : -l,
                                u = 0;
                            t.isHorizontal() ? i && (d = -d) : ((u = p), (p = 0), (c = -d), (d = 0)), (r[0].style.zIndex = -Math.abs(Math.round(o)) + e.length), n.slideShadows && a(r, o, n);
                            const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
                            ie(n, r).transform(h);
                        }
                    },
                    setTransition: (e) => {
                        const { transformEl: i } = t.params.flipEffect;
                        (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                            ne({ swiper: t, duration: e, transformEl: i });
                    },
                    recreateShadows: () => {
                        const e = t.params.flipEffect;
                        t.slides.each((i) => {
                            const n = d(i);
                            let s = n[0].progress;
                            t.params.flipEffect.limitRotation && (s = Math.max(Math.min(i.progress, 1), -1)), a(n, s, e);
                        });
                    },
                    getEffectParams: () => t.params.flipEffect,
                    perspective: () => !0,
                    overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }),
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0, transformEl: null } }),
                    te({
                        effect: "coverflow",
                        swiper: t,
                        on: n,
                        setTranslate: () => {
                            const { width: e, height: i, slides: n, slidesSizesGrid: a } = t,
                                s = t.params.coverflowEffect,
                                r = t.isHorizontal(),
                                o = t.translate,
                                l = r ? e / 2 - o : i / 2 - o,
                                d = r ? s.rotate : -s.rotate,
                                c = s.depth;
                            for (let e = 0, t = n.length; e < t; e += 1) {
                                const t = n.eq(e),
                                    i = a[e],
                                    o = (l - t[0].swiperSlideOffset - i / 2) / i,
                                    p = "function" == typeof s.modifier ? s.modifier(o) : o * s.modifier;
                                let u = r ? d * p : 0,
                                    h = r ? 0 : d * p,
                                    f = -c * Math.abs(p),
                                    m = s.stretch;
                                "string" == typeof m && -1 !== m.indexOf("%") && (m = (parseFloat(s.stretch) / 100) * i);
                                let g = r ? 0 : m * p,
                                    v = r ? m * p : 0,
                                    w = 1 - (1 - s.scale) * Math.abs(p);
                                Math.abs(v) < 0.001 && (v = 0), Math.abs(g) < 0.001 && (g = 0), Math.abs(f) < 0.001 && (f = 0), Math.abs(u) < 0.001 && (u = 0), Math.abs(h) < 0.001 && (h = 0), Math.abs(w) < 0.001 && (w = 0);
                                const y = `translate3d(${v}px,${g}px,${f}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;
                                if ((ie(s, t).transform(y), (t[0].style.zIndex = 1 - Math.abs(Math.round(p))), s.slideShadows)) {
                                    let e = r ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        i = r ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === e.length && (e = ae(s, t, r ? "left" : "top")),
                                        0 === i.length && (i = ae(s, t, r ? "right" : "bottom")),
                                        e.length && (e[0].style.opacity = p > 0 ? p : 0),
                                        i.length && (i[0].style.opacity = -p > 0 ? -p : 0);
                                }
                            }
                        },
                        setTransition: (e) => {
                            const { transformEl: i } = t.params.coverflowEffect;
                            (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                        },
                        perspective: () => !0,
                        overwriteParams: () => ({ watchSlidesProgress: !0 }),
                    });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({
                    creativeEffect: {
                        transformEl: null,
                        limitProgress: 1,
                        shadowPerProgress: !1,
                        progressMultiplier: 1,
                        perspective: !0,
                        prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
                        next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
                    },
                });
                const a = (e) => ("string" == typeof e ? e : `${e}px`);
                te({
                    effect: "creative",
                    swiper: t,
                    on: n,
                    setTranslate: () => {
                        const { slides: e, $wrapperEl: i, slidesSizesGrid: n } = t,
                            s = t.params.creativeEffect,
                            { progressMultiplier: r } = s,
                            o = t.params.centeredSlides;
                        if (o) {
                            const e = n[0] / 2 - t.params.slidesOffsetBefore || 0;
                            i.transform(`translateX(calc(50% - ${e}px))`);
                        }
                        for (let i = 0; i < e.length; i += 1) {
                            const n = e.eq(i),
                                l = n[0].progress,
                                d = Math.min(Math.max(n[0].progress, -s.limitProgress), s.limitProgress);
                            let c = d;
                            o || (c = Math.min(Math.max(n[0].originalProgress, -s.limitProgress), s.limitProgress));
                            const p = n[0].swiperSlideOffset,
                                u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
                                h = [0, 0, 0];
                            let f = !1;
                            t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
                            let m = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 };
                            d < 0 ? ((m = s.next), (f = !0)) : d > 0 && ((m = s.prev), (f = !0)),
                                u.forEach((e, t) => {
                                    u[t] = `calc(${e}px + (${a(m.translate[t])} * ${Math.abs(d * r)}))`;
                                }),
                                h.forEach((e, t) => {
                                    h[t] = m.rotate[t] * Math.abs(d * r);
                                }),
                                (n[0].style.zIndex = -Math.abs(Math.round(l)) + e.length);
                            const g = u.join(", "),
                                v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                                w = c < 0 ? `scale(${1 + (1 - m.scale) * c * r})` : `scale(${1 - (1 - m.scale) * c * r})`,
                                y = c < 0 ? 1 + (1 - m.opacity) * c * r : 1 - (1 - m.opacity) * c * r,
                                b = `translate3d(${g}) ${v} ${w}`;
                            if ((f && m.shadow) || !f) {
                                let e = n.children(".swiper-slide-shadow");
                                if ((0 === e.length && m.shadow && (e = ae(s, n)), e.length)) {
                                    const t = s.shadowPerProgress ? d * (1 / s.limitProgress) : d;
                                    e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
                                }
                            }
                            const _ = ie(s, n);
                            _.transform(b).css({ opacity: y }), m.origin && _.css("transform-origin", m.origin);
                        }
                    },
                    setTransition: (e) => {
                        const { transformEl: i } = t.params.creativeEffect;
                        (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), ne({ swiper: t, duration: e, transformEl: i, allSlides: !0 });
                    },
                    perspective: () => t.params.creativeEffect.perspective,
                    overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }),
                });
            },
            function (e) {
                let { swiper: t, extendParams: i, on: n } = e;
                i({ cardsEffect: { slideShadows: !0, transformEl: null, rotate: !0 } }),
                    te({
                        effect: "cards",
                        swiper: t,
                        on: n,
                        setTranslate: () => {
                            const { slides: e, activeIndex: i } = t,
                                n = t.params.cardsEffect,
                                { startTranslate: a, isTouched: s } = t.touchEventsData,
                                r = t.translate;
                            for (let o = 0; o < e.length; o += 1) {
                                const l = e.eq(o),
                                    d = l[0].progress,
                                    c = Math.min(Math.max(d, -4), 4);
                                let p = l[0].swiperSlideOffset;
                                t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (p -= e[0].swiperSlideOffset);
                                let u = t.params.cssMode ? -p - t.translate : -p,
                                    h = 0,
                                    f = -100 * Math.abs(c),
                                    m = 1,
                                    g = -2 * c,
                                    v = 8 - 0.75 * Math.abs(c);
                                const w = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o,
                                    y = (w === i || w === i - 1) && c > 0 && c < 1 && (s || t.params.cssMode) && r < a,
                                    b = (w === i || w === i + 1) && c < 0 && c > -1 && (s || t.params.cssMode) && r > a;
                                if (y || b) {
                                    const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                                    (g += -28 * c * e), (m += -0.5 * e), (v += 96 * e), (h = -25 * e * Math.abs(c) + "%");
                                }
                                if (((u = c < 0 ? `calc(${u}px + (${v * Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v * Math.abs(c)}%))` : `${u}px`), !t.isHorizontal())) {
                                    const e = h;
                                    (h = u), (u = e);
                                }
                                const _ = c < 0 ? "" + (1 + (1 - m) * c) : "" + (1 - (1 - m) * c),
                                    x = `\n        translate3d(${u}, ${h}, ${f}px)\n        rotateZ(${n.rotate ? g : 0}deg)\n        scale(${_})\n      `;
                                if (n.slideShadows) {
                                    let e = l.find(".swiper-slide-shadow");
                                    0 === e.length && (e = ae(n, l)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - 0.5) / 0.5, 0), 1));
                                }
                                l[0].style.zIndex = -Math.abs(Math.round(d)) + e.length;
                                ie(n, l).transform(x);
                            }
                        },
                        setTransition: (e) => {
                            const { transformEl: i } = t.params.cardsEffect;
                            (i ? t.slides.find(i) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), ne({ swiper: t, duration: e, transformEl: i });
                        },
                        perspective: () => !0,
                        overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }),
                    });
            },
        ];
        return q.use(se), q;
    }),
    (function (e, t, i, n) {
        "use strict";
        function a(e, t, i) {
            return setTimeout(d(e, i), t);
        }
        function s(e, t, i) {
            return !!Array.isArray(e) && (r(e, i[t], i), !0);
        }
        function r(e, t, i) {
            var a;
            if (e)
                if (e.forEach) e.forEach(t, i);
                else if (e.length !== n) for (a = 0; a < e.length; ) t.call(i, e[a], a, e), a++;
                else for (a in e) e.hasOwnProperty(a) && t.call(i, e[a], a, e);
        }
        function o(t, i, n) {
            var a = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
            return function () {
                var i = new Error("get-stack-trace"),
                    n =
                        i && i.stack
                            ? i.stack
                                  .replace(/^[^\(]+?[\n$]/gm, "")
                                  .replace(/^\s+at\s+/gm, "")
                                  .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
                            : "Unknown Stack Trace",
                    s = e.console && (e.console.warn || e.console.log);
                return s && s.call(e.console, a, n), t.apply(this, arguments);
            };
        }
        function l(e, t, i) {
            var n,
                a = t.prototype;
            ((n = e.prototype = Object.create(a)).constructor = e), (n._super = a), i && ne(n, i);
        }
        function d(e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        }
        function c(e, t) {
            return typeof e == re ? e.apply((t && t[0]) || n, t) : e;
        }
        function p(e, t) {
            return e === n ? t : e;
        }
        function u(e, t, i) {
            r(g(t), function (t) {
                e.addEventListener(t, i, !1);
            });
        }
        function h(e, t, i) {
            r(g(t), function (t) {
                e.removeEventListener(t, i, !1);
            });
        }
        function f(e, t) {
            for (; e; ) {
                if (e == t) return !0;
                e = e.parentNode;
            }
            return !1;
        }
        function m(e, t) {
            return e.indexOf(t) > -1;
        }
        function g(e) {
            return e.trim().split(/\s+/g);
        }
        function v(e, t, i) {
            if (e.indexOf && !i) return e.indexOf(t);
            for (var n = 0; n < e.length; ) {
                if ((i && e[n][i] == t) || (!i && e[n] === t)) return n;
                n++;
            }
            return -1;
        }
        function w(e) {
            return Array.prototype.slice.call(e, 0);
        }
        function y(e, t, i) {
            for (var n = [], a = [], s = 0; s < e.length; ) {
                var r = t ? e[s][t] : e[s];
                v(a, r) < 0 && n.push(e[s]), (a[s] = r), s++;
            }
            return (
                i &&
                    (n = t
                        ? n.sort(function (e, i) {
                              return e[t] > i[t];
                          })
                        : n.sort()),
                n
            );
        }
        function b(e, t) {
            for (var i, a, s = t[0].toUpperCase() + t.slice(1), r = 0; r < ae.length; ) {
                if ((a = (i = ae[r]) ? i + s : t) in e) return a;
                r++;
            }
            return n;
        }
        function _(t) {
            var i = t.ownerDocument || t;
            return i.defaultView || i.parentWindow || e;
        }
        function x(e, t) {
            var i = this;
            (this.manager = e),
                (this.callback = t),
                (this.element = e.element),
                (this.target = e.options.inputTarget),
                (this.domHandler = function (t) {
                    c(e.options.enable, [e]) && i.handler(t);
                }),
                this.init();
        }
        function T(e, t, i) {
            var n = i.pointers.length,
                a = i.changedPointers.length,
                s = t & ye && n - a == 0,
                r = t & (_e | xe) && n - a == 0;
            (i.isFirst = !!s),
                (i.isFinal = !!r),
                s && (e.session = {}),
                (i.eventType = t),
                (function (e, t) {
                    var i = e.session,
                        n = t.pointers,
                        a = n.length;
                    i.firstInput || (i.firstInput = S(t)), a > 1 && !i.firstMultiple ? (i.firstMultiple = S(t)) : 1 === a && (i.firstMultiple = !1);
                    var s = i.firstInput,
                        r = i.firstMultiple,
                        o = r ? r.center : s.center,
                        l = (t.center = M(n));
                    (t.timeStamp = de()),
                        (t.deltaTime = t.timeStamp - s.timeStamp),
                        (t.angle = $(o, l)),
                        (t.distance = A(o, l)),
                        (function (e, t) {
                            var i = t.center,
                                n = e.offsetDelta || {},
                                a = e.prevDelta || {},
                                s = e.prevInput || {};
                            (t.eventType !== ye && s.eventType !== _e) || ((a = e.prevDelta = { x: s.deltaX || 0, y: s.deltaY || 0 }), (n = e.offsetDelta = { x: i.x, y: i.y })),
                                (t.deltaX = a.x + (i.x - n.x)),
                                (t.deltaY = a.y + (i.y - n.y));
                        })(i, t),
                        (t.offsetDirection = P(t.deltaX, t.deltaY));
                    var d = C(t.deltaTime, t.deltaX, t.deltaY);
                    (t.overallVelocityX = d.x),
                        (t.overallVelocityY = d.y),
                        (t.overallVelocity = le(d.x) > le(d.y) ? d.x : d.y),
                        (t.scale = r
                            ? (function (e, t) {
                                  return A(t[0], t[1], ke) / A(e[0], e[1], ke);
                              })(r.pointers, n)
                            : 1),
                        (t.rotation = r
                            ? (function (e, t) {
                                  return $(t[1], t[0], ke) + $(e[1], e[0], ke);
                              })(r.pointers, n)
                            : 0),
                        (t.maxPointers = i.prevInput ? (t.pointers.length > i.prevInput.maxPointers ? t.pointers.length : i.prevInput.maxPointers) : t.pointers.length),
                        E(i, t);
                    var c = e.element;
                    f(t.srcEvent.target, c) && (c = t.srcEvent.target), (t.target = c);
                })(e, i),
                e.emit("hammer.input", i),
                e.recognize(i),
                (e.session.prevInput = i);
        }
        function E(e, t) {
            var i,
                a,
                s,
                r,
                o = e.lastInterval || t,
                l = t.timeStamp - o.timeStamp;
            if (t.eventType != xe && (l > we || o.velocity === n)) {
                var d = t.deltaX - o.deltaX,
                    c = t.deltaY - o.deltaY,
                    p = C(l, d, c);
                (a = p.x), (s = p.y), (i = le(p.x) > le(p.y) ? p.x : p.y), (r = P(d, c)), (e.lastInterval = t);
            } else (i = o.velocity), (a = o.velocityX), (s = o.velocityY), (r = o.direction);
            (t.velocity = i), (t.velocityX = a), (t.velocityY = s), (t.direction = r);
        }
        function S(e) {
            for (var t = [], i = 0; i < e.pointers.length; ) (t[i] = { clientX: oe(e.pointers[i].clientX), clientY: oe(e.pointers[i].clientY) }), i++;
            return { timeStamp: de(), pointers: t, center: M(t), deltaX: e.deltaX, deltaY: e.deltaY };
        }
        function M(e) {
            var t = e.length;
            if (1 === t) return { x: oe(e[0].clientX), y: oe(e[0].clientY) };
            for (var i = 0, n = 0, a = 0; t > a; ) (i += e[a].clientX), (n += e[a].clientY), a++;
            return { x: oe(i / t), y: oe(n / t) };
        }
        function C(e, t, i) {
            return { x: t / e || 0, y: i / e || 0 };
        }
        function P(e, t) {
            return e === t ? Te : le(e) >= le(t) ? (0 > e ? Ee : Se) : 0 > t ? Me : Ce;
        }
        function A(e, t, i) {
            i || (i = ze);
            var n = t[i[0]] - e[i[0]],
                a = t[i[1]] - e[i[1]];
            return Math.sqrt(n * n + a * a);
        }
        function $(e, t, i) {
            i || (i = ze);
            var n = t[i[0]] - e[i[0]],
                a = t[i[1]] - e[i[1]];
            return (180 * Math.atan2(a, n)) / Math.PI;
        }
        function z() {
            (this.evEl = Ie), (this.evWin = De), (this.pressed = !1), x.apply(this, arguments);
        }
        function k() {
            (this.evEl = He), (this.evWin = Re), x.apply(this, arguments), (this.store = this.manager.session.pointerEvents = []);
        }
        function O() {
            (this.evTarget = We), (this.evWin = Ne), (this.started = !1), x.apply(this, arguments);
        }
        function I(e, t) {
            var i = w(e.touches),
                n = w(e.changedTouches);
            return t & (_e | xe) && (i = y(i.concat(n), "identifier", !0)), [i, n];
        }
        function D() {
            (this.evTarget = je), (this.targetIds = {}), x.apply(this, arguments);
        }
        function L(e, t) {
            var i = w(e.touches),
                n = this.targetIds;
            if (t & (ye | be) && 1 === i.length) return (n[i[0].identifier] = !0), [i, i];
            var a,
                s,
                r = w(e.changedTouches),
                o = [],
                l = this.target;
            if (
                ((s = i.filter(function (e) {
                    return f(e.target, l);
                })),
                t === ye)
            )
                for (a = 0; a < s.length; ) (n[s[a].identifier] = !0), a++;
            for (a = 0; a < r.length; ) n[r[a].identifier] && o.push(r[a]), t & (_e | xe) && delete n[r[a].identifier], a++;
            return o.length ? [y(s.concat(o), "identifier", !0), o] : void 0;
        }
        function F() {
            x.apply(this, arguments);
            var e = d(this.handler, this);
            (this.touch = new D(this.manager, e)), (this.mouse = new z(this.manager, e)), (this.primaryTouch = null), (this.lastTouches = []);
        }
        function H(e, t) {
            e & ye ? ((this.primaryTouch = t.changedPointers[0].identifier), R.call(this, t)) : e & (_e | xe) && R.call(this, t);
        }
        function R(e) {
            var t = e.changedPointers[0];
            if (t.identifier === this.primaryTouch) {
                var i = { x: t.clientX, y: t.clientY };
                this.lastTouches.push(i);
                var n = this.lastTouches;
                setTimeout(function () {
                    var e = n.indexOf(i);
                    e > -1 && n.splice(e, 1);
                }, Be);
            }
        }
        function G(e) {
            for (var t = e.srcEvent.clientX, i = e.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
                var a = this.lastTouches[n],
                    s = Math.abs(t - a.x),
                    r = Math.abs(i - a.y);
                if (Ye >= s && Ye >= r) return !0;
            }
            return !1;
        }
        function W(e, t) {
            (this.manager = e), this.set(t);
        }
        function N(e) {
            (this.options = ne({}, this.defaults, e || {})), (this.id = ue++), (this.manager = null), (this.options.enable = p(this.options.enable, !0)), (this.state = it), (this.simultaneous = {}), (this.requireFail = []);
        }
        function X(e) {
            return e & ot ? "cancel" : e & st ? "end" : e & at ? "move" : e & nt ? "start" : "";
        }
        function j(e) {
            return e == Ce ? "down" : e == Me ? "up" : e == Ee ? "left" : e == Se ? "right" : "";
        }
        function B(e, t) {
            var i = t.manager;
            return i ? i.get(e) : e;
        }
        function Y() {
            N.apply(this, arguments);
        }
        function q() {
            Y.apply(this, arguments), (this.pX = null), (this.pY = null);
        }
        function V() {
            Y.apply(this, arguments);
        }
        function U() {
            N.apply(this, arguments), (this._timer = null), (this._input = null);
        }
        function Z() {
            Y.apply(this, arguments);
        }
        function Q() {
            Y.apply(this, arguments);
        }
        function K() {
            N.apply(this, arguments), (this.pTime = !1), (this.pCenter = !1), (this._timer = null), (this._input = null), (this.count = 0);
        }
        function J(e, t) {
            return ((t = t || {}).recognizers = p(t.recognizers, J.defaults.preset)), new ee(e, t);
        }
        function ee(e, t) {
            (this.options = ne({}, J.defaults, t || {})),
                (this.options.inputTarget = this.options.inputTarget || e),
                (this.handlers = {}),
                (this.session = {}),
                (this.recognizers = []),
                (this.oldCssProps = {}),
                (this.element = e),
                (this.input = (function (e) {
                    var t = e.options.inputClass;
                    return new (t || (fe ? k : me ? D : he ? F : z))(e, T);
                })(this)),
                (this.touchAction = new W(this, this.options.touchAction)),
                te(this, !0),
                r(
                    this.options.recognizers,
                    function (e) {
                        var t = this.add(new e[0](e[1]));
                        e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3]);
                    },
                    this
                );
        }
        function te(e, t) {
            var i,
                n = e.element;
            n.style &&
                (r(e.options.cssProps, function (a, s) {
                    (i = b(n.style, s)), t ? ((e.oldCssProps[i] = n.style[i]), (n.style[i] = a)) : (n.style[i] = e.oldCssProps[i] || "");
                }),
                t || (e.oldCssProps = {}));
        }
        function ie(e, i) {
            var n = t.createEvent("Event");
            n.initEvent(e, !0, !0), (n.gesture = i), i.target.dispatchEvent(n);
        }
        var ne,
            ae = ["", "webkit", "Moz", "MS", "ms", "o"],
            se = t.createElement("div"),
            re = "function",
            oe = Math.round,
            le = Math.abs,
            de = Date.now;
        ne =
            "function" != typeof Object.assign
                ? function (e) {
                      if (e === n || null === e) throw new TypeError("Cannot convert undefined or null to object");
                      for (var t = Object(e), i = 1; i < arguments.length; i++) {
                          var a = arguments[i];
                          if (a !== n && null !== a) for (var s in a) a.hasOwnProperty(s) && (t[s] = a[s]);
                      }
                      return t;
                  }
                : Object.assign;
        var ce = o(
                function (e, t, i) {
                    for (var a = Object.keys(t), s = 0; s < a.length; ) (!i || (i && e[a[s]] === n)) && (e[a[s]] = t[a[s]]), s++;
                    return e;
                },
                "extend",
                "Use `assign`."
            ),
            pe = o(
                function (e, t) {
                    return ce(e, t, !0);
                },
                "merge",
                "Use `assign`."
            ),
            ue = 1,
            he = "ontouchstart" in e,
            fe = b(e, "PointerEvent") !== n,
            me = he && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
            ge = "touch",
            ve = "mouse",
            we = 25,
            ye = 1,
            be = 2,
            _e = 4,
            xe = 8,
            Te = 1,
            Ee = 2,
            Se = 4,
            Me = 8,
            Ce = 16,
            Pe = Ee | Se,
            Ae = Me | Ce,
            $e = Pe | Ae,
            ze = ["x", "y"],
            ke = ["clientX", "clientY"];
        x.prototype = {
            handler: function () {},
            init: function () {
                this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(_(this.element), this.evWin, this.domHandler);
            },
            destroy: function () {
                this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(_(this.element), this.evWin, this.domHandler);
            },
        };
        var Oe = { mousedown: ye, mousemove: be, mouseup: _e },
            Ie = "mousedown",
            De = "mousemove mouseup";
        l(z, x, {
            handler: function (e) {
                var t = Oe[e.type];
                t & ye && 0 === e.button && (this.pressed = !0),
                    t & be && 1 !== e.which && (t = _e),
                    this.pressed && (t & _e && (this.pressed = !1), this.callback(this.manager, t, { pointers: [e], changedPointers: [e], pointerType: ve, srcEvent: e }));
            },
        });
        var Le = { pointerdown: ye, pointermove: be, pointerup: _e, pointercancel: xe, pointerout: xe },
            Fe = { 2: ge, 3: "pen", 4: ve, 5: "kinect" },
            He = "pointerdown",
            Re = "pointermove pointerup pointercancel";
        e.MSPointerEvent && !e.PointerEvent && ((He = "MSPointerDown"), (Re = "MSPointerMove MSPointerUp MSPointerCancel")),
            l(k, x, {
                handler: function (e) {
                    var t = this.store,
                        i = !1,
                        n = e.type.toLowerCase().replace("ms", ""),
                        a = Le[n],
                        s = Fe[e.pointerType] || e.pointerType,
                        r = s == ge,
                        o = v(t, e.pointerId, "pointerId");
                    a & ye && (0 === e.button || r) ? 0 > o && (t.push(e), (o = t.length - 1)) : a & (_e | xe) && (i = !0),
                        0 > o || ((t[o] = e), this.callback(this.manager, a, { pointers: t, changedPointers: [e], pointerType: s, srcEvent: e }), i && t.splice(o, 1));
                },
            });
        var Ge = { touchstart: ye, touchmove: be, touchend: _e, touchcancel: xe },
            We = "touchstart",
            Ne = "touchstart touchmove touchend touchcancel";
        l(O, x, {
            handler: function (e) {
                var t = Ge[e.type];
                if ((t === ye && (this.started = !0), this.started)) {
                    var i = I.call(this, e, t);
                    t & (_e | xe) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, t, { pointers: i[0], changedPointers: i[1], pointerType: ge, srcEvent: e });
                }
            },
        });
        var Xe = { touchstart: ye, touchmove: be, touchend: _e, touchcancel: xe },
            je = "touchstart touchmove touchend touchcancel";
        l(D, x, {
            handler: function (e) {
                var t = Xe[e.type],
                    i = L.call(this, e, t);
                i && this.callback(this.manager, t, { pointers: i[0], changedPointers: i[1], pointerType: ge, srcEvent: e });
            },
        });
        var Be = 2500,
            Ye = 25;
        l(F, x, {
            handler: function (e, t, i) {
                var n = i.pointerType == ge,
                    a = i.pointerType == ve;
                if (!(a && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                    if (n) H.call(this, t, i);
                    else if (a && G.call(this, i)) return;
                    this.callback(e, t, i);
                }
            },
            destroy: function () {
                this.touch.destroy(), this.mouse.destroy();
            },
        });
        var qe = b(se.style, "touchAction"),
            Ve = qe !== n,
            Ue = "compute",
            Ze = "auto",
            Qe = "manipulation",
            Ke = "none",
            Je = "pan-x",
            et = "pan-y",
            tt = (function () {
                if (!Ve) return !1;
                var t = {},
                    i = e.CSS && e.CSS.supports;
                return (
                    ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (n) {
                        t[n] = !i || e.CSS.supports("touch-action", n);
                    }),
                    t
                );
            })();
        W.prototype = {
            set: function (e) {
                e == Ue && (e = this.compute()), Ve && this.manager.element.style && tt[e] && (this.manager.element.style[qe] = e), (this.actions = e.toLowerCase().trim());
            },
            update: function () {
                this.set(this.manager.options.touchAction);
            },
            compute: function () {
                var e = [];
                return (
                    r(this.manager.recognizers, function (t) {
                        c(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()));
                    }),
                    (function (e) {
                        if (m(e, Ke)) return Ke;
                        var t = m(e, Je),
                            i = m(e, et);
                        return t && i ? Ke : t || i ? (t ? Je : et) : m(e, Qe) ? Qe : Ze;
                    })(e.join(" "))
                );
            },
            preventDefaults: function (e) {
                var t = e.srcEvent,
                    i = e.offsetDirection;
                if (!this.manager.session.prevented) {
                    var n = this.actions,
                        a = m(n, Ke) && !tt[Ke],
                        s = m(n, et) && !tt[et],
                        r = m(n, Je) && !tt[Je];
                    if (a) {
                        var o = 1 === e.pointers.length,
                            l = e.distance < 2,
                            d = e.deltaTime < 250;
                        if (o && l && d) return;
                    }
                    return r && s ? void 0 : a || (s && i & Pe) || (r && i & Ae) ? this.preventSrc(t) : void 0;
                }
                t.preventDefault();
            },
            preventSrc: function (e) {
                (this.manager.session.prevented = !0), e.preventDefault();
            },
        };
        var it = 1,
            nt = 2,
            at = 4,
            st = 8,
            rt = st,
            ot = 16,
            lt = 32;
        (N.prototype = {
            defaults: {},
            set: function (e) {
                return ne(this.options, e), this.manager && this.manager.touchAction.update(), this;
            },
            recognizeWith: function (e) {
                if (s(e, "recognizeWith", this)) return this;
                var t = this.simultaneous;
                return t[(e = B(e, this)).id] || ((t[e.id] = e), e.recognizeWith(this)), this;
            },
            dropRecognizeWith: function (e) {
                return s(e, "dropRecognizeWith", this) || ((e = B(e, this)), delete this.simultaneous[e.id]), this;
            },
            requireFailure: function (e) {
                if (s(e, "requireFailure", this)) return this;
                var t = this.requireFail;
                return -1 === v(t, (e = B(e, this))) && (t.push(e), e.requireFailure(this)), this;
            },
            dropRequireFailure: function (e) {
                if (s(e, "dropRequireFailure", this)) return this;
                e = B(e, this);
                var t = v(this.requireFail, e);
                return t > -1 && this.requireFail.splice(t, 1), this;
            },
            hasRequireFailures: function () {
                return this.requireFail.length > 0;
            },
            canRecognizeWith: function (e) {
                return !!this.simultaneous[e.id];
            },
            emit: function (e) {
                function t(t) {
                    i.manager.emit(t, e);
                }
                var i = this,
                    n = this.state;
                st > n && t(i.options.event + X(n)), t(i.options.event), e.additionalEvent && t(e.additionalEvent), n >= st && t(i.options.event + X(n));
            },
            tryEmit: function (e) {
                return this.canEmit() ? this.emit(e) : void (this.state = lt);
            },
            canEmit: function () {
                for (var e = 0; e < this.requireFail.length; ) {
                    if (!(this.requireFail[e].state & (lt | it))) return !1;
                    e++;
                }
                return !0;
            },
            recognize: function (e) {
                var t = ne({}, e);
                return c(this.options.enable, [this, t])
                    ? (this.state & (rt | ot | lt) && (this.state = it), (this.state = this.process(t)), void (this.state & (nt | at | st | ot) && this.tryEmit(t)))
                    : (this.reset(), void (this.state = lt));
            },
            process: function (e) {},
            getTouchAction: function () {},
            reset: function () {},
        }),
            l(Y, N, {
                defaults: { pointers: 1 },
                attrTest: function (e) {
                    var t = this.options.pointers;
                    return 0 === t || e.pointers.length === t;
                },
                process: function (e) {
                    var t = this.state,
                        i = e.eventType,
                        n = t & (nt | at),
                        a = this.attrTest(e);
                    return n && (i & xe || !a) ? t | ot : n || a ? (i & _e ? t | st : t & nt ? t | at : nt) : lt;
                },
            }),
            l(q, Y, {
                defaults: { event: "pan", threshold: 10, pointers: 1, direction: $e },
                getTouchAction: function () {
                    var e = this.options.direction,
                        t = [];
                    return e & Pe && t.push(et), e & Ae && t.push(Je), t;
                },
                directionTest: function (e) {
                    var t = this.options,
                        i = !0,
                        n = e.distance,
                        a = e.direction,
                        s = e.deltaX,
                        r = e.deltaY;
                    return (
                        a & t.direction || (t.direction & Pe ? ((a = 0 === s ? Te : 0 > s ? Ee : Se), (i = s != this.pX), (n = Math.abs(e.deltaX))) : ((a = 0 === r ? Te : 0 > r ? Me : Ce), (i = r != this.pY), (n = Math.abs(e.deltaY)))),
                        (e.direction = a),
                        i && n > t.threshold && a & t.direction
                    );
                },
                attrTest: function (e) {
                    return Y.prototype.attrTest.call(this, e) && (this.state & nt || (!(this.state & nt) && this.directionTest(e)));
                },
                emit: function (e) {
                    (this.pX = e.deltaX), (this.pY = e.deltaY);
                    var t = j(e.direction);
                    t && (e.additionalEvent = this.options.event + t), this._super.emit.call(this, e);
                },
            }),
            l(V, Y, {
                defaults: { event: "pinch", threshold: 0, pointers: 2 },
                getTouchAction: function () {
                    return [Ke];
                },
                attrTest: function (e) {
                    return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & nt);
                },
                emit: function (e) {
                    if (1 !== e.scale) {
                        var t = e.scale < 1 ? "in" : "out";
                        e.additionalEvent = this.options.event + t;
                    }
                    this._super.emit.call(this, e);
                },
            }),
            l(U, N, {
                defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
                getTouchAction: function () {
                    return [Ze];
                },
                process: function (e) {
                    var t = this.options,
                        i = e.pointers.length === t.pointers,
                        n = e.distance < t.threshold,
                        s = e.deltaTime > t.time;
                    if (((this._input = e), !n || !i || (e.eventType & (_e | xe) && !s))) this.reset();
                    else if (e.eventType & ye)
                        this.reset(),
                            (this._timer = a(
                                function () {
                                    (this.state = rt), this.tryEmit();
                                },
                                t.time,
                                this
                            ));
                    else if (e.eventType & _e) return rt;
                    return lt;
                },
                reset: function () {
                    clearTimeout(this._timer);
                },
                emit: function (e) {
                    this.state === rt && (e && e.eventType & _e ? this.manager.emit(this.options.event + "up", e) : ((this._input.timeStamp = de()), this.manager.emit(this.options.event, this._input)));
                },
            }),
            l(Z, Y, {
                defaults: { event: "rotate", threshold: 0, pointers: 2 },
                getTouchAction: function () {
                    return [Ke];
                },
                attrTest: function (e) {
                    return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & nt);
                },
            }),
            l(Q, Y, {
                defaults: { event: "swipe", threshold: 10, velocity: 0.3, direction: Pe | Ae, pointers: 1 },
                getTouchAction: function () {
                    return q.prototype.getTouchAction.call(this);
                },
                attrTest: function (e) {
                    var t,
                        i = this.options.direction;
                    return (
                        i & (Pe | Ae) ? (t = e.overallVelocity) : i & Pe ? (t = e.overallVelocityX) : i & Ae && (t = e.overallVelocityY),
                        this._super.attrTest.call(this, e) && i & e.offsetDirection && e.distance > this.options.threshold && e.maxPointers == this.options.pointers && le(t) > this.options.velocity && e.eventType & _e
                    );
                },
                emit: function (e) {
                    var t = j(e.offsetDirection);
                    t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e);
                },
            }),
            l(K, N, {
                defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 },
                getTouchAction: function () {
                    return [Qe];
                },
                process: function (e) {
                    var t = this.options,
                        i = e.pointers.length === t.pointers,
                        n = e.distance < t.threshold,
                        s = e.deltaTime < t.time;
                    if ((this.reset(), e.eventType & ye && 0 === this.count)) return this.failTimeout();
                    if (n && s && i) {
                        if (e.eventType != _e) return this.failTimeout();
                        var r = !this.pTime || e.timeStamp - this.pTime < t.interval,
                            o = !this.pCenter || A(this.pCenter, e.center) < t.posThreshold;
                        if (((this.pTime = e.timeStamp), (this.pCenter = e.center), o && r ? (this.count += 1) : (this.count = 1), (this._input = e), 0 === this.count % t.taps))
                            return this.hasRequireFailures()
                                ? ((this._timer = a(
                                      function () {
                                          (this.state = rt), this.tryEmit();
                                      },
                                      t.interval,
                                      this
                                  )),
                                  nt)
                                : rt;
                    }
                    return lt;
                },
                failTimeout: function () {
                    return (
                        (this._timer = a(
                            function () {
                                this.state = lt;
                            },
                            this.options.interval,
                            this
                        )),
                        lt
                    );
                },
                reset: function () {
                    clearTimeout(this._timer);
                },
                emit: function () {
                    this.state == rt && ((this._input.tapCount = this.count), this.manager.emit(this.options.event, this._input));
                },
            }),
            (J.VERSION = "2.0.8"),
            (J.defaults = {
                domEvents: !1,
                touchAction: Ue,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [[Z, { enable: !1 }], [V, { enable: !1 }, ["rotate"]], [Q, { direction: Pe }], [q, { direction: Pe }, ["swipe"]], [K], [K, { event: "doubletap", taps: 2 }, ["tap"]], [U]],
                cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" },
            });
        (ee.prototype = {
            set: function (e) {
                return ne(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), (this.input.target = e.inputTarget), this.input.init()), this;
            },
            stop: function (e) {
                this.session.stopped = e ? 2 : 1;
            },
            recognize: function (e) {
                var t = this.session;
                if (!t.stopped) {
                    this.touchAction.preventDefaults(e);
                    var i,
                        n = this.recognizers,
                        a = t.curRecognizer;
                    (!a || (a && a.state & rt)) && (a = t.curRecognizer = null);
                    for (var s = 0; s < n.length; ) (i = n[s]), 2 === t.stopped || (a && i != a && !i.canRecognizeWith(a)) ? i.reset() : i.recognize(e), !a && i.state & (nt | at | st) && (a = t.curRecognizer = i), s++;
                }
            },
            get: function (e) {
                if (e instanceof N) return e;
                for (var t = this.recognizers, i = 0; i < t.length; i++) if (t[i].options.event == e) return t[i];
                return null;
            },
            add: function (e) {
                if (s(e, "add", this)) return this;
                var t = this.get(e.options.event);
                return t && this.remove(t), this.recognizers.push(e), (e.manager = this), this.touchAction.update(), e;
            },
            remove: function (e) {
                if (s(e, "remove", this)) return this;
                if ((e = this.get(e))) {
                    var t = this.recognizers,
                        i = v(t, e);
                    -1 !== i && (t.splice(i, 1), this.touchAction.update());
                }
                return this;
            },
            on: function (e, t) {
                if (e !== n && t !== n) {
                    var i = this.handlers;
                    return (
                        r(g(e), function (e) {
                            (i[e] = i[e] || []), i[e].push(t);
                        }),
                        this
                    );
                }
            },
            off: function (e, t) {
                if (e !== n) {
                    var i = this.handlers;
                    return (
                        r(g(e), function (e) {
                            t ? i[e] && i[e].splice(v(i[e], t), 1) : delete i[e];
                        }),
                        this
                    );
                }
            },
            emit: function (e, t) {
                this.options.domEvents && ie(e, t);
                var i = this.handlers[e] && this.handlers[e].slice();
                if (i && i.length) {
                    (t.type = e),
                        (t.preventDefault = function () {
                            t.srcEvent.preventDefault();
                        });
                    for (var n = 0; n < i.length; ) i[n](t), n++;
                }
            },
            destroy: function () {
                this.element && te(this, !1), (this.handlers = {}), (this.session = {}), this.input.destroy(), (this.element = null);
            },
        }),
            ne(J, {
                INPUT_START: ye,
                INPUT_MOVE: be,
                INPUT_END: _e,
                INPUT_CANCEL: xe,
                STATE_POSSIBLE: it,
                STATE_BEGAN: nt,
                STATE_CHANGED: at,
                STATE_ENDED: st,
                STATE_RECOGNIZED: rt,
                STATE_CANCELLED: ot,
                STATE_FAILED: lt,
                DIRECTION_NONE: Te,
                DIRECTION_LEFT: Ee,
                DIRECTION_RIGHT: Se,
                DIRECTION_UP: Me,
                DIRECTION_DOWN: Ce,
                DIRECTION_HORIZONTAL: Pe,
                DIRECTION_VERTICAL: Ae,
                DIRECTION_ALL: $e,
                Manager: ee,
                Input: x,
                TouchAction: W,
                TouchInput: D,
                MouseInput: z,
                PointerEventInput: k,
                TouchMouseInput: F,
                SingleTouchInput: O,
                Recognizer: N,
                AttrRecognizer: Y,
                Tap: K,
                Pan: q,
                Swipe: Q,
                Pinch: V,
                Rotate: Z,
                Press: U,
                on: u,
                off: h,
                each: r,
                merge: pe,
                extend: ce,
                assign: ne,
                inherit: l,
                bindFn: d,
                prefixed: b,
            }),
            ((void 0 !== e ? e : "undefined" != typeof self ? self : {}).Hammer = J),
            "function" == typeof define && define.amd
                ? define(function () {
                      return J;
                  })
                : "undefined" != typeof module && module.exports
                ? (module.exports = J)
                : (e.Hammer = J);
    })(window, document),
    /*!
     *  howler.js v2.2.3
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */
    (function () {
        "use strict";
        var e = function () {
            this.init();
        };
        e.prototype = {
            init: function () {
                var e = this || t;
                return (
                    (e._counter = 1e3),
                    (e._html5AudioPool = []),
                    (e.html5PoolSize = 10),
                    (e._codecs = {}),
                    (e._howls = []),
                    (e._muted = !1),
                    (e._volume = 1),
                    (e._canPlayEvent = "canplaythrough"),
                    (e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null),
                    (e.masterGain = null),
                    (e.noAudio = !1),
                    (e.usingWebAudio = !0),
                    (e.autoSuspend = !0),
                    (e.ctx = null),
                    (e.autoUnlock = !0),
                    e._setup(),
                    e
                );
            },
            volume: function (e) {
                var i = this || t;
                if (((e = parseFloat(e)), i.ctx || d(), void 0 !== e && e >= 0 && e <= 1)) {
                    if (((i._volume = e), i._muted)) return i;
                    i.usingWebAudio && i.masterGain.gain.setValueAtTime(e, t.ctx.currentTime);
                    for (var n = 0; n < i._howls.length; n++)
                        if (!i._howls[n]._webAudio)
                            for (var a = i._howls[n]._getSoundIds(), s = 0; s < a.length; s++) {
                                var r = i._howls[n]._soundById(a[s]);
                                r && r._node && (r._node.volume = r._volume * e);
                            }
                    return i;
                }
                return i._volume;
            },
            mute: function (e) {
                var i = this || t;
                i.ctx || d(), (i._muted = e), i.usingWebAudio && i.masterGain.gain.setValueAtTime(e ? 0 : i._volume, t.ctx.currentTime);
                for (var n = 0; n < i._howls.length; n++)
                    if (!i._howls[n]._webAudio)
                        for (var a = i._howls[n]._getSoundIds(), s = 0; s < a.length; s++) {
                            var r = i._howls[n]._soundById(a[s]);
                            r && r._node && (r._node.muted = !!e || r._muted);
                        }
                return i;
            },
            stop: function () {
                for (var e = this || t, i = 0; i < e._howls.length; i++) e._howls[i].stop();
                return e;
            },
            unload: function () {
                for (var e = this || t, i = e._howls.length - 1; i >= 0; i--) e._howls[i].unload();
                return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), (e.ctx = null), d()), e;
            },
            codecs: function (e) {
                return (this || t)._codecs[e.replace(/^x-/, "")];
            },
            _setup: function () {
                var e = this || t;
                if (((e.state = (e.ctx && e.ctx.state) || "suspended"), e._autoSuspend(), !e.usingWebAudio))
                    if ("undefined" != typeof Audio)
                        try {
                            void 0 === new Audio().oncanplaythrough && (e._canPlayEvent = "canplay");
                        } catch (t) {
                            e.noAudio = !0;
                        }
                    else e.noAudio = !0;
                try {
                    new Audio().muted && (e.noAudio = !0);
                } catch (e) {}
                return e.noAudio || e._setupCodecs(), e;
            },
            _setupCodecs: function () {
                var e = this || t,
                    i = null;
                try {
                    i = "undefined" != typeof Audio ? new Audio() : null;
                } catch (t) {
                    return e;
                }
                if (!i || "function" != typeof i.canPlayType) return e;
                var n = i.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    a = e._navigator ? e._navigator.userAgent : "",
                    s = a.match(/OPR\/([0-6].)/g),
                    r = s && parseInt(s[0].split("/")[1], 10) < 33,
                    o = -1 !== a.indexOf("Safari") && -1 === a.indexOf("Chrome"),
                    l = a.match(/Version\/(.*?) /),
                    d = o && l && parseInt(l[1], 10) < 15;
                return (
                    (e._codecs = {
                        mp3: !(r || (!n && !i.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                        mpeg: !!n,
                        opus: !!i.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!(i.canPlayType('audio/wav; codecs="1"') || i.canPlayType("audio/wav")).replace(/^no$/, ""),
                        aac: !!i.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!i.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(i.canPlayType("audio/x-m4a;") || i.canPlayType("audio/m4a;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(i.canPlayType("audio/x-m4b;") || i.canPlayType("audio/m4b;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(i.canPlayType("audio/x-mp4;") || i.canPlayType("audio/mp4;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !(d || !i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        webm: !(d || !i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        dolby: !!i.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(i.canPlayType("audio/x-flac;") || i.canPlayType("audio/flac;")).replace(/^no$/, ""),
                    }),
                    e
                );
            },
            _unlockAudio: function () {
                var e = this || t;
                if (!e._audioUnlocked && e.ctx) {
                    (e._audioUnlocked = !1), (e.autoUnlock = !1), e._mobileUnloaded || 44100 === e.ctx.sampleRate || ((e._mobileUnloaded = !0), e.unload()), (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050));
                    var i = function (t) {
                        for (; e._html5AudioPool.length < e.html5PoolSize; )
                            try {
                                var n = new Audio();
                                (n._unlocked = !0), e._releaseHtml5Audio(n);
                            } catch (t) {
                                e.noAudio = !0;
                                break;
                            }
                        for (var a = 0; a < e._howls.length; a++)
                            if (!e._howls[a]._webAudio)
                                for (var s = e._howls[a]._getSoundIds(), r = 0; r < s.length; r++) {
                                    var o = e._howls[a]._soundById(s[r]);
                                    o && o._node && !o._node._unlocked && ((o._node._unlocked = !0), o._node.load());
                                }
                        e._autoResume();
                        var l = e.ctx.createBufferSource();
                        (l.buffer = e._scratchBuffer),
                            l.connect(e.ctx.destination),
                            void 0 === l.start ? l.noteOn(0) : l.start(0),
                            "function" == typeof e.ctx.resume && e.ctx.resume(),
                            (l.onended = function () {
                                l.disconnect(0),
                                    (e._audioUnlocked = !0),
                                    document.removeEventListener("touchstart", i, !0),
                                    document.removeEventListener("touchend", i, !0),
                                    document.removeEventListener("click", i, !0),
                                    document.removeEventListener("keydown", i, !0);
                                for (var t = 0; t < e._howls.length; t++) e._howls[t]._emit("unlock");
                            });
                    };
                    return document.addEventListener("touchstart", i, !0), document.addEventListener("touchend", i, !0), document.addEventListener("click", i, !0), document.addEventListener("keydown", i, !0), e;
                }
            },
            _obtainHtml5Audio: function () {
                var e = this || t;
                if (e._html5AudioPool.length) return e._html5AudioPool.pop();
                var i = new Audio().play();
                return (
                    i &&
                        "undefined" != typeof Promise &&
                        (i instanceof Promise || "function" == typeof i.then) &&
                        i.catch(function () {
                            console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
                        }),
                    new Audio()
                );
            },
            _releaseHtml5Audio: function (e) {
                var i = this || t;
                return e._unlocked && i._html5AudioPool.push(e), i;
            },
            _autoSuspend: function () {
                var e = this;
                if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && t.usingWebAudio) {
                    for (var i = 0; i < e._howls.length; i++) if (e._howls[i]._webAudio) for (var n = 0; n < e._howls[i]._sounds.length; n++) if (!e._howls[i]._sounds[n]._paused) return e;
                    return (
                        e._suspendTimer && clearTimeout(e._suspendTimer),
                        (e._suspendTimer = setTimeout(function () {
                            if (e.autoSuspend) {
                                (e._suspendTimer = null), (e.state = "suspending");
                                var t = function () {
                                    (e.state = "suspended"), e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
                                };
                                e.ctx.suspend().then(t, t);
                            }
                        }, 3e4)),
                        e
                    );
                }
            },
            _autoResume: function () {
                var e = this;
                if (e.ctx && void 0 !== e.ctx.resume && t.usingWebAudio)
                    return (
                        "running" === e.state && "interrupted" !== e.ctx.state && e._suspendTimer
                            ? (clearTimeout(e._suspendTimer), (e._suspendTimer = null))
                            : "suspended" === e.state || ("running" === e.state && "interrupted" === e.ctx.state)
                            ? (e.ctx.resume().then(function () {
                                  e.state = "running";
                                  for (var t = 0; t < e._howls.length; t++) e._howls[t]._emit("resume");
                              }),
                              e._suspendTimer && (clearTimeout(e._suspendTimer), (e._suspendTimer = null)))
                            : "suspending" === e.state && (e._resumeAfterSuspend = !0),
                        e
                    );
            },
        };
        var t = new e(),
            i = function (e) {
                e.src && 0 !== e.src.length ? this.init(e) : console.error("An array of source files must be passed with any new Howl.");
            };
        i.prototype = {
            init: function (e) {
                var i = this;
                return (
                    t.ctx || d(),
                    (i._autoplay = e.autoplay || !1),
                    (i._format = "string" != typeof e.format ? e.format : [e.format]),
                    (i._html5 = e.html5 || !1),
                    (i._muted = e.mute || !1),
                    (i._loop = e.loop || !1),
                    (i._pool = e.pool || 5),
                    (i._preload = ("boolean" != typeof e.preload && "metadata" !== e.preload) || e.preload),
                    (i._rate = e.rate || 1),
                    (i._sprite = e.sprite || {}),
                    (i._src = "string" != typeof e.src ? e.src : [e.src]),
                    (i._volume = void 0 !== e.volume ? e.volume : 1),
                    (i._xhr = { method: e.xhr && e.xhr.method ? e.xhr.method : "GET", headers: e.xhr && e.xhr.headers ? e.xhr.headers : null, withCredentials: !(!e.xhr || !e.xhr.withCredentials) && e.xhr.withCredentials }),
                    (i._duration = 0),
                    (i._state = "unloaded"),
                    (i._sounds = []),
                    (i._endTimers = {}),
                    (i._queue = []),
                    (i._playLock = !1),
                    (i._onend = e.onend ? [{ fn: e.onend }] : []),
                    (i._onfade = e.onfade ? [{ fn: e.onfade }] : []),
                    (i._onload = e.onload ? [{ fn: e.onload }] : []),
                    (i._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : []),
                    (i._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : []),
                    (i._onpause = e.onpause ? [{ fn: e.onpause }] : []),
                    (i._onplay = e.onplay ? [{ fn: e.onplay }] : []),
                    (i._onstop = e.onstop ? [{ fn: e.onstop }] : []),
                    (i._onmute = e.onmute ? [{ fn: e.onmute }] : []),
                    (i._onvolume = e.onvolume ? [{ fn: e.onvolume }] : []),
                    (i._onrate = e.onrate ? [{ fn: e.onrate }] : []),
                    (i._onseek = e.onseek ? [{ fn: e.onseek }] : []),
                    (i._onunlock = e.onunlock ? [{ fn: e.onunlock }] : []),
                    (i._onresume = []),
                    (i._webAudio = t.usingWebAudio && !i._html5),
                    void 0 !== t.ctx && t.ctx && t.autoUnlock && t._unlockAudio(),
                    t._howls.push(i),
                    i._autoplay &&
                        i._queue.push({
                            event: "play",
                            action: function () {
                                i.play();
                            },
                        }),
                    i._preload && "none" !== i._preload && i.load(),
                    i
                );
            },
            load: function () {
                var e = this,
                    i = null;
                if (t.noAudio) e._emit("loaderror", null, "No audio support.");
                else {
                    "string" == typeof e._src && (e._src = [e._src]);
                    for (var a = 0; a < e._src.length; a++) {
                        var r, o;
                        if (e._format && e._format[a]) r = e._format[a];
                        else {
                            if ("string" != typeof (o = e._src[a])) {
                                e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                continue;
                            }
                            (r = /^data:audio\/([^;,]+);/i.exec(o)) || (r = /\.([^.]+)$/.exec(o.split("?", 1)[0])), r && (r = r[1].toLowerCase());
                        }
                        if ((r || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), r && t.codecs(r))) {
                            i = e._src[a];
                            break;
                        }
                    }
                    if (i) return (e._src = i), (e._state = "loading"), "https:" === window.location.protocol && "http:" === i.slice(0, 5) && ((e._html5 = !0), (e._webAudio = !1)), new n(e), e._webAudio && s(e), e;
                    e._emit("loaderror", null, "No codec support for selected audio sources.");
                }
            },
            play: function (e, i) {
                var n = this,
                    a = null;
                if ("number" == typeof e) (a = e), (e = null);
                else {
                    if ("string" == typeof e && "loaded" === n._state && !n._sprite[e]) return null;
                    if (void 0 === e && ((e = "__default"), !n._playLock)) {
                        for (var s = 0, r = 0; r < n._sounds.length; r++) n._sounds[r]._paused && !n._sounds[r]._ended && (s++, (a = n._sounds[r]._id));
                        1 === s ? (e = null) : (a = null);
                    }
                }
                var o = a ? n._soundById(a) : n._inactiveSound();
                if (!o) return null;
                if ((a && !e && (e = o._sprite || "__default"), "loaded" !== n._state)) {
                    (o._sprite = e), (o._ended = !1);
                    var l = o._id;
                    return (
                        n._queue.push({
                            event: "play",
                            action: function () {
                                n.play(l);
                            },
                        }),
                        l
                    );
                }
                if (a && !o._paused) return i || n._loadQueue("play"), o._id;
                n._webAudio && t._autoResume();
                var d = Math.max(0, o._seek > 0 ? o._seek : n._sprite[e][0] / 1e3),
                    c = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - d),
                    p = (1e3 * c) / Math.abs(o._rate),
                    u = n._sprite[e][0] / 1e3,
                    h = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
                (o._sprite = e), (o._ended = !1);
                var f = function () {
                    (o._paused = !1), (o._seek = d), (o._start = u), (o._stop = h), (o._loop = !(!o._loop && !n._sprite[e][2]));
                };
                if (!(d >= h)) {
                    var m = o._node;
                    if (n._webAudio) {
                        var g = function () {
                            (n._playLock = !1), f(), n._refreshBuffer(o);
                            var e = o._muted || n._muted ? 0 : o._volume;
                            m.gain.setValueAtTime(e, t.ctx.currentTime),
                                (o._playStart = t.ctx.currentTime),
                                void 0 === m.bufferSource.start ? (o._loop ? m.bufferSource.noteGrainOn(0, d, 86400) : m.bufferSource.noteGrainOn(0, d, c)) : o._loop ? m.bufferSource.start(0, d, 86400) : m.bufferSource.start(0, d, c),
                                p !== 1 / 0 && (n._endTimers[o._id] = setTimeout(n._ended.bind(n, o), p)),
                                i ||
                                    setTimeout(function () {
                                        n._emit("play", o._id), n._loadQueue();
                                    }, 0);
                        };
                        "running" === t.state && "interrupted" !== t.ctx.state ? g() : ((n._playLock = !0), n.once("resume", g), n._clearTimer(o._id));
                    } else {
                        var v = function () {
                            (m.currentTime = d), (m.muted = o._muted || n._muted || t._muted || m.muted), (m.volume = o._volume * t.volume()), (m.playbackRate = o._rate);
                            try {
                                var a = m.play();
                                if (
                                    (a && "undefined" != typeof Promise && (a instanceof Promise || "function" == typeof a.then)
                                        ? ((n._playLock = !0),
                                          f(),
                                          a
                                              .then(function () {
                                                  (n._playLock = !1), (m._unlocked = !0), i ? n._loadQueue() : n._emit("play", o._id);
                                              })
                                              .catch(function () {
                                                  (n._playLock = !1),
                                                      n._emit("playerror", o._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                                      (o._ended = !0),
                                                      (o._paused = !0);
                                              }))
                                        : i || ((n._playLock = !1), f(), n._emit("play", o._id)),
                                    (m.playbackRate = o._rate),
                                    m.paused)
                                )
                                    return void n._emit("playerror", o._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                "__default" !== e || o._loop
                                    ? (n._endTimers[o._id] = setTimeout(n._ended.bind(n, o), p))
                                    : ((n._endTimers[o._id] = function () {
                                          n._ended(o), m.removeEventListener("ended", n._endTimers[o._id], !1);
                                      }),
                                      m.addEventListener("ended", n._endTimers[o._id], !1));
                            } catch (e) {
                                n._emit("playerror", o._id, e);
                            }
                        };
                        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === m.src && ((m.src = n._src), m.load());
                        var w = (window && window.ejecta) || (!m.readyState && t._navigator.isCocoonJS);
                        if (m.readyState >= 3 || w) v();
                        else {
                            (n._playLock = !0), (n._state = "loading");
                            var y = function () {
                                (n._state = "loaded"), v(), m.removeEventListener(t._canPlayEvent, y, !1);
                            };
                            m.addEventListener(t._canPlayEvent, y, !1), n._clearTimer(o._id);
                        }
                    }
                    return o._id;
                }
                n._ended(o);
            },
            pause: function (e) {
                var t = this;
                if ("loaded" !== t._state || t._playLock)
                    return (
                        t._queue.push({
                            event: "pause",
                            action: function () {
                                t.pause(e);
                            },
                        }),
                        t
                    );
                for (var i = t._getSoundIds(e), n = 0; n < i.length; n++) {
                    t._clearTimer(i[n]);
                    var a = t._soundById(i[n]);
                    if (a && !a._paused && ((a._seek = t.seek(i[n])), (a._rateSeek = 0), (a._paused = !0), t._stopFade(i[n]), a._node))
                        if (t._webAudio) {
                            if (!a._node.bufferSource) continue;
                            void 0 === a._node.bufferSource.stop ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0), t._cleanBuffer(a._node);
                        } else (isNaN(a._node.duration) && a._node.duration !== 1 / 0) || a._node.pause();
                    arguments[1] || t._emit("pause", a ? a._id : null);
                }
                return t;
            },
            stop: function (e, t) {
                var i = this;
                if ("loaded" !== i._state || i._playLock)
                    return (
                        i._queue.push({
                            event: "stop",
                            action: function () {
                                i.stop(e);
                            },
                        }),
                        i
                    );
                for (var n = i._getSoundIds(e), a = 0; a < n.length; a++) {
                    i._clearTimer(n[a]);
                    var s = i._soundById(n[a]);
                    s &&
                        ((s._seek = s._start || 0),
                        (s._rateSeek = 0),
                        (s._paused = !0),
                        (s._ended = !0),
                        i._stopFade(n[a]),
                        s._node &&
                            (i._webAudio
                                ? s._node.bufferSource && (void 0 === s._node.bufferSource.stop ? s._node.bufferSource.noteOff(0) : s._node.bufferSource.stop(0), i._cleanBuffer(s._node))
                                : (isNaN(s._node.duration) && s._node.duration !== 1 / 0) || ((s._node.currentTime = s._start || 0), s._node.pause(), s._node.duration === 1 / 0 && i._clearSound(s._node))),
                        t || i._emit("stop", s._id));
                }
                return i;
            },
            mute: function (e, i) {
                var n = this;
                if ("loaded" !== n._state || n._playLock)
                    return (
                        n._queue.push({
                            event: "mute",
                            action: function () {
                                n.mute(e, i);
                            },
                        }),
                        n
                    );
                if (void 0 === i) {
                    if ("boolean" != typeof e) return n._muted;
                    n._muted = e;
                }
                for (var a = n._getSoundIds(i), s = 0; s < a.length; s++) {
                    var r = n._soundById(a[s]);
                    r && ((r._muted = e), r._interval && n._stopFade(r._id), n._webAudio && r._node ? r._node.gain.setValueAtTime(e ? 0 : r._volume, t.ctx.currentTime) : r._node && (r._node.muted = !!t._muted || e), n._emit("mute", r._id));
                }
                return n;
            },
            volume: function () {
                var e,
                    i,
                    n,
                    a = this,
                    s = arguments;
                if (0 === s.length) return a._volume;
                if (1 === s.length || (2 === s.length && void 0 === s[1])) {
                    var r = a._getSoundIds(),
                        o = r.indexOf(s[0]);
                    o >= 0 ? (i = parseInt(s[0], 10)) : (e = parseFloat(s[0]));
                } else s.length >= 2 && ((e = parseFloat(s[0])), (i = parseInt(s[1], 10)));
                if (!(void 0 !== e && e >= 0 && e <= 1)) return (n = i ? a._soundById(i) : a._sounds[0]) ? n._volume : 0;
                if ("loaded" !== a._state || a._playLock)
                    return (
                        a._queue.push({
                            event: "volume",
                            action: function () {
                                a.volume.apply(a, s);
                            },
                        }),
                        a
                    );
                void 0 === i && (a._volume = e), (i = a._getSoundIds(i));
                for (var l = 0; l < i.length; l++)
                    (n = a._soundById(i[l])) &&
                        ((n._volume = e),
                        s[2] || a._stopFade(i[l]),
                        a._webAudio && n._node && !n._muted ? n._node.gain.setValueAtTime(e, t.ctx.currentTime) : n._node && !n._muted && (n._node.volume = e * t.volume()),
                        a._emit("volume", n._id));
                return a;
            },
            fade: function (e, i, n, a) {
                var s = this;
                if ("loaded" !== s._state || s._playLock)
                    return (
                        s._queue.push({
                            event: "fade",
                            action: function () {
                                s.fade(e, i, n, a);
                            },
                        }),
                        s
                    );
                (e = Math.min(Math.max(0, parseFloat(e)), 1)), (i = Math.min(Math.max(0, parseFloat(i)), 1)), (n = parseFloat(n)), s.volume(e, a);
                for (var r = s._getSoundIds(a), o = 0; o < r.length; o++) {
                    var l = s._soundById(r[o]);
                    if (l) {
                        if ((a || s._stopFade(r[o]), s._webAudio && !l._muted)) {
                            var d = t.ctx.currentTime,
                                c = d + n / 1e3;
                            (l._volume = e), l._node.gain.setValueAtTime(e, d), l._node.gain.linearRampToValueAtTime(i, c);
                        }
                        s._startFadeInterval(l, e, i, n, r[o], void 0 === a);
                    }
                }
                return s;
            },
            _startFadeInterval: function (e, t, i, n, a, s) {
                var r = this,
                    o = t,
                    l = i - t,
                    d = Math.abs(l / 0.01),
                    c = Math.max(4, d > 0 ? n / d : n),
                    p = Date.now();
                (e._fadeTo = i),
                    (e._interval = setInterval(function () {
                        var a = (Date.now() - p) / n;
                        (p = Date.now()),
                            (o += l * a),
                            (o = Math.round(100 * o) / 100),
                            (o = l < 0 ? Math.max(i, o) : Math.min(i, o)),
                            r._webAudio ? (e._volume = o) : r.volume(o, e._id, !0),
                            s && (r._volume = o),
                            ((i < t && o <= i) || (i > t && o >= i)) && (clearInterval(e._interval), (e._interval = null), (e._fadeTo = null), r.volume(i, e._id), r._emit("fade", e._id));
                    }, c));
            },
            _stopFade: function (e) {
                var i = this,
                    n = i._soundById(e);
                return n && n._interval && (i._webAudio && n._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(n._interval), (n._interval = null), i.volume(n._fadeTo, e), (n._fadeTo = null), i._emit("fade", e)), i;
            },
            loop: function () {
                var e,
                    t,
                    i,
                    n = this,
                    a = arguments;
                if (0 === a.length) return n._loop;
                if (1 === a.length) {
                    if ("boolean" != typeof a[0]) return !!(i = n._soundById(parseInt(a[0], 10))) && i._loop;
                    (e = a[0]), (n._loop = e);
                } else 2 === a.length && ((e = a[0]), (t = parseInt(a[1], 10)));
                for (var s = n._getSoundIds(t), r = 0; r < s.length; r++)
                    (i = n._soundById(s[r])) &&
                        ((i._loop = e),
                        n._webAudio &&
                            i._node &&
                            i._node.bufferSource &&
                            ((i._node.bufferSource.loop = e), e && ((i._node.bufferSource.loopStart = i._start || 0), (i._node.bufferSource.loopEnd = i._stop), n.playing(s[r]) && (n.pause(s[r], !0), n.play(s[r], !0)))));
                return n;
            },
            rate: function () {
                var e,
                    i,
                    n,
                    a = this,
                    s = arguments;
                if (0 === s.length) i = a._sounds[0]._id;
                else if (1 === s.length) {
                    var r = a._getSoundIds(),
                        o = r.indexOf(s[0]);
                    o >= 0 ? (i = parseInt(s[0], 10)) : (e = parseFloat(s[0]));
                } else 2 === s.length && ((e = parseFloat(s[0])), (i = parseInt(s[1], 10)));
                if ("number" != typeof e) return (n = a._soundById(i)) ? n._rate : a._rate;
                if ("loaded" !== a._state || a._playLock)
                    return (
                        a._queue.push({
                            event: "rate",
                            action: function () {
                                a.rate.apply(a, s);
                            },
                        }),
                        a
                    );
                void 0 === i && (a._rate = e), (i = a._getSoundIds(i));
                for (var l = 0; l < i.length; l++)
                    if ((n = a._soundById(i[l]))) {
                        a.playing(i[l]) && ((n._rateSeek = a.seek(i[l])), (n._playStart = a._webAudio ? t.ctx.currentTime : n._playStart)),
                            (n._rate = e),
                            a._webAudio && n._node && n._node.bufferSource ? n._node.bufferSource.playbackRate.setValueAtTime(e, t.ctx.currentTime) : n._node && (n._node.playbackRate = e);
                        var d = a.seek(i[l]),
                            c = (a._sprite[n._sprite][0] + a._sprite[n._sprite][1]) / 1e3 - d,
                            p = (1e3 * c) / Math.abs(n._rate);
                        (!a._endTimers[i[l]] && n._paused) || (a._clearTimer(i[l]), (a._endTimers[i[l]] = setTimeout(a._ended.bind(a, n), p))), a._emit("rate", n._id);
                    }
                return a;
            },
            seek: function () {
                var e,
                    i,
                    n = this,
                    a = arguments;
                if (0 === a.length) n._sounds.length && (i = n._sounds[0]._id);
                else if (1 === a.length) {
                    var s = n._getSoundIds(),
                        r = s.indexOf(a[0]);
                    r >= 0 ? (i = parseInt(a[0], 10)) : n._sounds.length && ((i = n._sounds[0]._id), (e = parseFloat(a[0])));
                } else 2 === a.length && ((e = parseFloat(a[0])), (i = parseInt(a[1], 10)));
                if (void 0 === i) return 0;
                if ("number" == typeof e && ("loaded" !== n._state || n._playLock))
                    return (
                        n._queue.push({
                            event: "seek",
                            action: function () {
                                n.seek.apply(n, a);
                            },
                        }),
                        n
                    );
                var o = n._soundById(i);
                if (o) {
                    if (!("number" == typeof e && e >= 0)) {
                        if (n._webAudio) {
                            var l = n.playing(i) ? t.ctx.currentTime - o._playStart : 0,
                                d = o._rateSeek ? o._rateSeek - o._seek : 0;
                            return o._seek + (d + l * Math.abs(o._rate));
                        }
                        return o._node.currentTime;
                    }
                    var c = n.playing(i);
                    c && n.pause(i, !0), (o._seek = e), (o._ended = !1), n._clearTimer(i), n._webAudio || !o._node || isNaN(o._node.duration) || (o._node.currentTime = e);
                    var p = function () {
                        c && n.play(i, !0), n._emit("seek", i);
                    };
                    if (c && !n._webAudio) {
                        var u = function () {
                            n._playLock ? setTimeout(u, 0) : p();
                        };
                        setTimeout(u, 0);
                    } else p();
                }
                return n;
            },
            playing: function (e) {
                var t = this;
                if ("number" == typeof e) {
                    var i = t._soundById(e);
                    return !!i && !i._paused;
                }
                for (var n = 0; n < t._sounds.length; n++) if (!t._sounds[n]._paused) return !0;
                return !1;
            },
            duration: function (e) {
                var t = this,
                    i = t._duration,
                    n = t._soundById(e);
                return n && (i = t._sprite[n._sprite][1] / 1e3), i;
            },
            state: function () {
                return this._state;
            },
            unload: function () {
                for (var e = this, i = e._sounds, n = 0; n < i.length; n++)
                    i[n]._paused || e.stop(i[n]._id),
                        e._webAudio ||
                            (e._clearSound(i[n]._node),
                            i[n]._node.removeEventListener("error", i[n]._errorFn, !1),
                            i[n]._node.removeEventListener(t._canPlayEvent, i[n]._loadFn, !1),
                            i[n]._node.removeEventListener("ended", i[n]._endFn, !1),
                            t._releaseHtml5Audio(i[n]._node)),
                        delete i[n]._node,
                        e._clearTimer(i[n]._id);
                var s = t._howls.indexOf(e);
                s >= 0 && t._howls.splice(s, 1);
                var r = !0;
                for (n = 0; n < t._howls.length; n++)
                    if (t._howls[n]._src === e._src || e._src.indexOf(t._howls[n]._src) >= 0) {
                        r = !1;
                        break;
                    }
                return a && r && delete a[e._src], (t.noAudio = !1), (e._state = "unloaded"), (e._sounds = []), (e = null), null;
            },
            on: function (e, t, i, n) {
                var a = this["_on" + e];
                return "function" == typeof t && a.push(n ? { id: i, fn: t, once: n } : { id: i, fn: t }), this;
            },
            off: function (e, t, i) {
                var n = this,
                    a = n["_on" + e],
                    s = 0;
                if (("number" == typeof t && ((i = t), (t = null)), t || i))
                    for (s = 0; s < a.length; s++) {
                        var r = i === a[s].id;
                        if ((t === a[s].fn && r) || (!t && r)) {
                            a.splice(s, 1);
                            break;
                        }
                    }
                else if (e) n["_on" + e] = [];
                else {
                    var o = Object.keys(n);
                    for (s = 0; s < o.length; s++) 0 === o[s].indexOf("_on") && Array.isArray(n[o[s]]) && (n[o[s]] = []);
                }
                return n;
            },
            once: function (e, t, i) {
                return this.on(e, t, i, 1), this;
            },
            _emit: function (e, t, i) {
                for (var n = this, a = n["_on" + e], s = a.length - 1; s >= 0; s--)
                    (a[s].id && a[s].id !== t && "load" !== e) ||
                        (setTimeout(
                            function (e) {
                                e.call(this, t, i);
                            }.bind(n, a[s].fn),
                            0
                        ),
                        a[s].once && n.off(e, a[s].fn, a[s].id));
                return n._loadQueue(e), n;
            },
            _loadQueue: function (e) {
                var t = this;
                if (t._queue.length > 0) {
                    var i = t._queue[0];
                    i.event === e && (t._queue.shift(), t._loadQueue()), e || i.action();
                }
                return t;
            },
            _ended: function (e) {
                var i = this,
                    n = e._sprite;
                if (!i._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(i._ended.bind(i, e), 100), i;
                var a = !(!e._loop && !i._sprite[n][2]);
                if ((i._emit("end", e._id), !i._webAudio && a && i.stop(e._id, !0).play(e._id), i._webAudio && a)) {
                    i._emit("play", e._id), (e._seek = e._start || 0), (e._rateSeek = 0), (e._playStart = t.ctx.currentTime);
                    var s = (1e3 * (e._stop - e._start)) / Math.abs(e._rate);
                    i._endTimers[e._id] = setTimeout(i._ended.bind(i, e), s);
                }
                return i._webAudio && !a && ((e._paused = !0), (e._ended = !0), (e._seek = e._start || 0), (e._rateSeek = 0), i._clearTimer(e._id), i._cleanBuffer(e._node), t._autoSuspend()), i._webAudio || a || i.stop(e._id, !0), i;
            },
            _clearTimer: function (e) {
                var t = this;
                if (t._endTimers[e]) {
                    if ("function" != typeof t._endTimers[e]) clearTimeout(t._endTimers[e]);
                    else {
                        var i = t._soundById(e);
                        i && i._node && i._node.removeEventListener("ended", t._endTimers[e], !1);
                    }
                    delete t._endTimers[e];
                }
                return t;
            },
            _soundById: function (e) {
                for (var t = this, i = 0; i < t._sounds.length; i++) if (e === t._sounds[i]._id) return t._sounds[i];
                return null;
            },
            _inactiveSound: function () {
                var e = this;
                e._drain();
                for (var t = 0; t < e._sounds.length; t++) if (e._sounds[t]._ended) return e._sounds[t].reset();
                return new n(e);
            },
            _drain: function () {
                var e = this,
                    t = e._pool,
                    i = 0,
                    n = 0;
                if (!(e._sounds.length < t)) {
                    for (n = 0; n < e._sounds.length; n++) e._sounds[n]._ended && i++;
                    for (n = e._sounds.length - 1; n >= 0; n--) {
                        if (i <= t) return;
                        e._sounds[n]._ended && (e._webAudio && e._sounds[n]._node && e._sounds[n]._node.disconnect(0), e._sounds.splice(n, 1), i--);
                    }
                }
            },
            _getSoundIds: function (e) {
                if (void 0 === e) {
                    for (var t = [], i = 0; i < this._sounds.length; i++) t.push(this._sounds[i]._id);
                    return t;
                }
                return [e];
            },
            _refreshBuffer: function (e) {
                return (
                    (e._node.bufferSource = t.ctx.createBufferSource()),
                    (e._node.bufferSource.buffer = a[this._src]),
                    e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
                    (e._node.bufferSource.loop = e._loop),
                    e._loop && ((e._node.bufferSource.loopStart = e._start || 0), (e._node.bufferSource.loopEnd = e._stop || 0)),
                    e._node.bufferSource.playbackRate.setValueAtTime(e._rate, t.ctx.currentTime),
                    this
                );
            },
            _cleanBuffer: function (e) {
                var i = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (t._scratchBuffer && e.bufferSource && ((e.bufferSource.onended = null), e.bufferSource.disconnect(0), i))
                    try {
                        e.bufferSource.buffer = t._scratchBuffer;
                    } catch (e) {}
                return (e.bufferSource = null), this;
            },
            _clearSound: function (e) {
                /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent) || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
            },
        };
        var n = function (e) {
            (this._parent = e), this.init();
        };
        n.prototype = {
            init: function () {
                var e = this,
                    i = e._parent;
                return (
                    (e._muted = i._muted),
                    (e._loop = i._loop),
                    (e._volume = i._volume),
                    (e._rate = i._rate),
                    (e._seek = 0),
                    (e._paused = !0),
                    (e._ended = !0),
                    (e._sprite = "__default"),
                    (e._id = ++t._counter),
                    i._sounds.push(e),
                    e.create(),
                    e
                );
            },
            create: function () {
                var e = this,
                    i = e._parent,
                    n = t._muted || e._muted || e._parent._muted ? 0 : e._volume;
                return (
                    i._webAudio
                        ? ((e._node = void 0 === t.ctx.createGain ? t.ctx.createGainNode() : t.ctx.createGain()), e._node.gain.setValueAtTime(n, t.ctx.currentTime), (e._node.paused = !0), e._node.connect(t.masterGain))
                        : t.noAudio ||
                          ((e._node = t._obtainHtml5Audio()),
                          (e._errorFn = e._errorListener.bind(e)),
                          e._node.addEventListener("error", e._errorFn, !1),
                          (e._loadFn = e._loadListener.bind(e)),
                          e._node.addEventListener(t._canPlayEvent, e._loadFn, !1),
                          (e._endFn = e._endListener.bind(e)),
                          e._node.addEventListener("ended", e._endFn, !1),
                          (e._node.src = i._src),
                          (e._node.preload = !0 === i._preload ? "auto" : i._preload),
                          (e._node.volume = n * t.volume()),
                          e._node.load()),
                    e
                );
            },
            reset: function () {
                var e = this,
                    i = e._parent;
                return (e._muted = i._muted), (e._loop = i._loop), (e._volume = i._volume), (e._rate = i._rate), (e._seek = 0), (e._rateSeek = 0), (e._paused = !0), (e._ended = !0), (e._sprite = "__default"), (e._id = ++t._counter), e;
            },
            _errorListener: function () {
                var e = this;
                e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1);
            },
            _loadListener: function () {
                var e = this,
                    i = e._parent;
                (i._duration = Math.ceil(10 * e._node.duration) / 10),
                    0 === Object.keys(i._sprite).length && (i._sprite = { __default: [0, 1e3 * i._duration] }),
                    "loaded" !== i._state && ((i._state = "loaded"), i._emit("load"), i._loadQueue()),
                    e._node.removeEventListener(t._canPlayEvent, e._loadFn, !1);
            },
            _endListener: function () {
                var e = this,
                    t = e._parent;
                t._duration === 1 / 0 && ((t._duration = Math.ceil(10 * e._node.duration) / 10), t._sprite.__default[1] === 1 / 0 && (t._sprite.__default[1] = 1e3 * t._duration), t._ended(e)),
                    e._node.removeEventListener("ended", e._endFn, !1);
            },
        };
        var a = {},
            s = function (e) {
                var t = e._src;
                if (a[t]) return (e._duration = a[t].duration), void l(e);
                if (/^data:[^;]+;base64,/.test(t)) {
                    for (var i = atob(t.split(",")[1]), n = new Uint8Array(i.length), s = 0; s < i.length; ++s) n[s] = i.charCodeAt(s);
                    o(n.buffer, e);
                } else {
                    var d = new XMLHttpRequest();
                    d.open(e._xhr.method, t, !0),
                        (d.withCredentials = e._xhr.withCredentials),
                        (d.responseType = "arraybuffer"),
                        e._xhr.headers &&
                            Object.keys(e._xhr.headers).forEach(function (t) {
                                d.setRequestHeader(t, e._xhr.headers[t]);
                            }),
                        (d.onload = function () {
                            var t = (d.status + "")[0];
                            "0" === t || "2" === t || "3" === t ? o(d.response, e) : e._emit("loaderror", null, "Failed loading audio file with status: " + d.status + ".");
                        }),
                        (d.onerror = function () {
                            e._webAudio && ((e._html5 = !0), (e._webAudio = !1), (e._sounds = []), delete a[t], e.load());
                        }),
                        r(d);
                }
            },
            r = function (e) {
                try {
                    e.send();
                } catch (t) {
                    e.onerror();
                }
            },
            o = function (e, i) {
                var n = function () {
                        i._emit("loaderror", null, "Decoding audio data failed.");
                    },
                    s = function (e) {
                        e && i._sounds.length > 0 ? ((a[i._src] = e), l(i, e)) : n();
                    };
                "undefined" != typeof Promise && 1 === t.ctx.decodeAudioData.length ? t.ctx.decodeAudioData(e).then(s).catch(n) : t.ctx.decodeAudioData(e, s, n);
            },
            l = function (e, t) {
                t && !e._duration && (e._duration = t.duration), 0 === Object.keys(e._sprite).length && (e._sprite = { __default: [0, 1e3 * e._duration] }), "loaded" !== e._state && ((e._state = "loaded"), e._emit("load"), e._loadQueue());
            },
            d = function () {
                if (t.usingWebAudio) {
                    try {
                        "undefined" != typeof AudioContext ? (t.ctx = new AudioContext()) : "undefined" != typeof webkitAudioContext ? (t.ctx = new webkitAudioContext()) : (t.usingWebAudio = !1);
                    } catch (e) {
                        t.usingWebAudio = !1;
                    }
                    t.ctx || (t.usingWebAudio = !1);
                    var e = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                        i = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        n = i ? parseInt(i[1], 10) : null;
                    if (e && n && n < 9) {
                        var a = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                        t._navigator && !a && (t.usingWebAudio = !1);
                    }
                    t.usingWebAudio &&
                        ((t.masterGain = void 0 === t.ctx.createGain ? t.ctx.createGainNode() : t.ctx.createGain()), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)),
                        t._setup();
                }
            };
        "function" == typeof define &&
            define.amd &&
            define([], function () {
                return { Howler: t, Howl: i };
            }),
            "undefined" != typeof exports && ((exports.Howler = t), (exports.Howl = i)),
            "undefined" != typeof global
                ? ((global.HowlerGlobal = e), (global.Howler = t), (global.Howl = i), (global.Sound = n))
                : "undefined" != typeof window && ((window.HowlerGlobal = e), (window.Howler = t), (window.Howl = i), (window.Sound = n));
    })(),
    /*!
     *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
     *
     *  howler.js v2.2.3
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */
    (function () {
        "use strict";
        var e;
        (HowlerGlobal.prototype._pos = [0, 0, 0]),
            (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
            (HowlerGlobal.prototype.stereo = function (e) {
                var t = this;
                if (!t.ctx || !t.ctx.listener) return t;
                for (var i = t._howls.length - 1; i >= 0; i--) t._howls[i].stereo(e);
                return t;
            }),
            (HowlerGlobal.prototype.pos = function (e, t, i) {
                var n = this;
                return n.ctx && n.ctx.listener
                    ? ((t = "number" != typeof t ? n._pos[1] : t),
                      (i = "number" != typeof i ? n._pos[2] : i),
                      "number" != typeof e
                          ? n._pos
                          : ((n._pos = [e, t, i]),
                            void 0 !== n.ctx.listener.positionX
                                ? (n.ctx.listener.positionX.setTargetAtTime(n._pos[0], Howler.ctx.currentTime, 0.1),
                                  n.ctx.listener.positionY.setTargetAtTime(n._pos[1], Howler.ctx.currentTime, 0.1),
                                  n.ctx.listener.positionZ.setTargetAtTime(n._pos[2], Howler.ctx.currentTime, 0.1))
                                : n.ctx.listener.setPosition(n._pos[0], n._pos[1], n._pos[2]),
                            n))
                    : n;
            }),
            (HowlerGlobal.prototype.orientation = function (e, t, i, n, a, s) {
                var r = this;
                if (!r.ctx || !r.ctx.listener) return r;
                var o = r._orientation;
                return (
                    (t = "number" != typeof t ? o[1] : t),
                    (i = "number" != typeof i ? o[2] : i),
                    (n = "number" != typeof n ? o[3] : n),
                    (a = "number" != typeof a ? o[4] : a),
                    (s = "number" != typeof s ? o[5] : s),
                    "number" != typeof e
                        ? o
                        : ((r._orientation = [e, t, i, n, a, s]),
                          void 0 !== r.ctx.listener.forwardX
                              ? (r.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, 0.1),
                                r.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, 0.1),
                                r.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, 0.1),
                                r.ctx.listener.upX.setTargetAtTime(n, Howler.ctx.currentTime, 0.1),
                                r.ctx.listener.upY.setTargetAtTime(a, Howler.ctx.currentTime, 0.1),
                                r.ctx.listener.upZ.setTargetAtTime(s, Howler.ctx.currentTime, 0.1))
                              : r.ctx.listener.setOrientation(e, t, i, n, a, s),
                          r)
                );
            }),
            (Howl.prototype.init =
                ((e = Howl.prototype.init),
                function (t) {
                    var i = this;
                    return (
                        (i._orientation = t.orientation || [1, 0, 0]),
                        (i._stereo = t.stereo || null),
                        (i._pos = t.pos || null),
                        (i._pannerAttr = {
                            coneInnerAngle: void 0 !== t.coneInnerAngle ? t.coneInnerAngle : 360,
                            coneOuterAngle: void 0 !== t.coneOuterAngle ? t.coneOuterAngle : 360,
                            coneOuterGain: void 0 !== t.coneOuterGain ? t.coneOuterGain : 0,
                            distanceModel: void 0 !== t.distanceModel ? t.distanceModel : "inverse",
                            maxDistance: void 0 !== t.maxDistance ? t.maxDistance : 1e4,
                            panningModel: void 0 !== t.panningModel ? t.panningModel : "HRTF",
                            refDistance: void 0 !== t.refDistance ? t.refDistance : 1,
                            rolloffFactor: void 0 !== t.rolloffFactor ? t.rolloffFactor : 1,
                        }),
                        (i._onstereo = t.onstereo ? [{ fn: t.onstereo }] : []),
                        (i._onpos = t.onpos ? [{ fn: t.onpos }] : []),
                        (i._onorientation = t.onorientation ? [{ fn: t.onorientation }] : []),
                        e.call(this, t)
                    );
                })),
            (Howl.prototype.stereo = function (e, i) {
                var n = this;
                if (!n._webAudio) return n;
                if ("loaded" !== n._state)
                    return (
                        n._queue.push({
                            event: "stereo",
                            action: function () {
                                n.stereo(e, i);
                            },
                        }),
                        n
                    );
                var a = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
                if (void 0 === i) {
                    if ("number" != typeof e) return n._stereo;
                    (n._stereo = e), (n._pos = [e, 0, 0]);
                }
                for (var s = n._getSoundIds(i), r = 0; r < s.length; r++) {
                    var o = n._soundById(s[r]);
                    if (o) {
                        if ("number" != typeof e) return o._stereo;
                        (o._stereo = e),
                            (o._pos = [e, 0, 0]),
                            o._node &&
                                ((o._pannerAttr.panningModel = "equalpower"),
                                (o._panner && o._panner.pan) || t(o, a),
                                "spatial" === a
                                    ? void 0 !== o._panner.positionX
                                        ? (o._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), o._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), o._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime))
                                        : o._panner.setPosition(e, 0, 0)
                                    : o._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)),
                            n._emit("stereo", o._id);
                    }
                }
                return n;
            }),
            (Howl.prototype.pos = function (e, i, n, a) {
                var s = this;
                if (!s._webAudio) return s;
                if ("loaded" !== s._state)
                    return (
                        s._queue.push({
                            event: "pos",
                            action: function () {
                                s.pos(e, i, n, a);
                            },
                        }),
                        s
                    );
                if (((i = "number" != typeof i ? 0 : i), (n = "number" != typeof n ? -0.5 : n), void 0 === a)) {
                    if ("number" != typeof e) return s._pos;
                    s._pos = [e, i, n];
                }
                for (var r = s._getSoundIds(a), o = 0; o < r.length; o++) {
                    var l = s._soundById(r[o]);
                    if (l) {
                        if ("number" != typeof e) return l._pos;
                        (l._pos = [e, i, n]),
                            l._node &&
                                ((l._panner && !l._panner.pan) || t(l, "spatial"),
                                void 0 !== l._panner.positionX
                                    ? (l._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime), l._panner.positionY.setValueAtTime(i, Howler.ctx.currentTime), l._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime))
                                    : l._panner.setPosition(e, i, n)),
                            s._emit("pos", l._id);
                    }
                }
                return s;
            }),
            (Howl.prototype.orientation = function (e, i, n, a) {
                var s = this;
                if (!s._webAudio) return s;
                if ("loaded" !== s._state)
                    return (
                        s._queue.push({
                            event: "orientation",
                            action: function () {
                                s.orientation(e, i, n, a);
                            },
                        }),
                        s
                    );
                if (((i = "number" != typeof i ? s._orientation[1] : i), (n = "number" != typeof n ? s._orientation[2] : n), void 0 === a)) {
                    if ("number" != typeof e) return s._orientation;
                    s._orientation = [e, i, n];
                }
                for (var r = s._getSoundIds(a), o = 0; o < r.length; o++) {
                    var l = s._soundById(r[o]);
                    if (l) {
                        if ("number" != typeof e) return l._orientation;
                        (l._orientation = [e, i, n]),
                            l._node &&
                                (l._panner || (l._pos || (l._pos = s._pos || [0, 0, -0.5]), t(l, "spatial")),
                                void 0 !== l._panner.orientationX
                                    ? (l._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime), l._panner.orientationY.setValueAtTime(i, Howler.ctx.currentTime), l._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime))
                                    : l._panner.setOrientation(e, i, n)),
                            s._emit("orientation", l._id);
                    }
                }
                return s;
            }),
            (Howl.prototype.pannerAttr = function () {
                var e,
                    i,
                    n,
                    a = this,
                    s = arguments;
                if (!a._webAudio) return a;
                if (0 === s.length) return a._pannerAttr;
                if (1 === s.length) {
                    if ("object" != typeof s[0]) return (n = a._soundById(parseInt(s[0], 10))) ? n._pannerAttr : a._pannerAttr;
                    (e = s[0]),
                        void 0 === i &&
                            (e.pannerAttr ||
                                (e.pannerAttr = {
                                    coneInnerAngle: e.coneInnerAngle,
                                    coneOuterAngle: e.coneOuterAngle,
                                    coneOuterGain: e.coneOuterGain,
                                    distanceModel: e.distanceModel,
                                    maxDistance: e.maxDistance,
                                    refDistance: e.refDistance,
                                    rolloffFactor: e.rolloffFactor,
                                    panningModel: e.panningModel,
                                }),
                            (a._pannerAttr = {
                                coneInnerAngle: void 0 !== e.pannerAttr.coneInnerAngle ? e.pannerAttr.coneInnerAngle : a._coneInnerAngle,
                                coneOuterAngle: void 0 !== e.pannerAttr.coneOuterAngle ? e.pannerAttr.coneOuterAngle : a._coneOuterAngle,
                                coneOuterGain: void 0 !== e.pannerAttr.coneOuterGain ? e.pannerAttr.coneOuterGain : a._coneOuterGain,
                                distanceModel: void 0 !== e.pannerAttr.distanceModel ? e.pannerAttr.distanceModel : a._distanceModel,
                                maxDistance: void 0 !== e.pannerAttr.maxDistance ? e.pannerAttr.maxDistance : a._maxDistance,
                                refDistance: void 0 !== e.pannerAttr.refDistance ? e.pannerAttr.refDistance : a._refDistance,
                                rolloffFactor: void 0 !== e.pannerAttr.rolloffFactor ? e.pannerAttr.rolloffFactor : a._rolloffFactor,
                                panningModel: void 0 !== e.pannerAttr.panningModel ? e.pannerAttr.panningModel : a._panningModel,
                            }));
                } else 2 === s.length && ((e = s[0]), (i = parseInt(s[1], 10)));
                for (var r = a._getSoundIds(i), o = 0; o < r.length; o++)
                    if ((n = a._soundById(r[o]))) {
                        var l = n._pannerAttr;
                        l = {
                            coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : l.coneInnerAngle,
                            coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : l.coneOuterAngle,
                            coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : l.coneOuterGain,
                            distanceModel: void 0 !== e.distanceModel ? e.distanceModel : l.distanceModel,
                            maxDistance: void 0 !== e.maxDistance ? e.maxDistance : l.maxDistance,
                            refDistance: void 0 !== e.refDistance ? e.refDistance : l.refDistance,
                            rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : l.rolloffFactor,
                            panningModel: void 0 !== e.panningModel ? e.panningModel : l.panningModel,
                        };
                        var d = n._panner;
                        d
                            ? ((d.coneInnerAngle = l.coneInnerAngle),
                              (d.coneOuterAngle = l.coneOuterAngle),
                              (d.coneOuterGain = l.coneOuterGain),
                              (d.distanceModel = l.distanceModel),
                              (d.maxDistance = l.maxDistance),
                              (d.refDistance = l.refDistance),
                              (d.rolloffFactor = l.rolloffFactor),
                              (d.panningModel = l.panningModel))
                            : (n._pos || (n._pos = a._pos || [0, 0, -0.5]), t(n, "spatial"));
                    }
                return a;
            }),
            (Sound.prototype.init = (function (e) {
                return function () {
                    var t = this,
                        i = t._parent;
                    (t._orientation = i._orientation), (t._stereo = i._stereo), (t._pos = i._pos), (t._pannerAttr = i._pannerAttr), e.call(this), t._stereo ? i.stereo(t._stereo) : t._pos && i.pos(t._pos[0], t._pos[1], t._pos[2], t._id);
                };
            })(Sound.prototype.init)),
            (Sound.prototype.reset = (function (e) {
                return function () {
                    var t = this,
                        i = t._parent;
                    return (
                        (t._orientation = i._orientation),
                        (t._stereo = i._stereo),
                        (t._pos = i._pos),
                        (t._pannerAttr = i._pannerAttr),
                        t._stereo ? i.stereo(t._stereo) : t._pos ? i.pos(t._pos[0], t._pos[1], t._pos[2], t._id) : t._panner && (t._panner.disconnect(0), (t._panner = void 0), i._refreshBuffer(t)),
                        e.call(this)
                    );
                };
            })(Sound.prototype.reset));
        var t = function (e, t) {
            "spatial" === (t = t || "spatial")
                ? ((e._panner = Howler.ctx.createPanner()),
                  (e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle),
                  (e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle),
                  (e._panner.coneOuterGain = e._pannerAttr.coneOuterGain),
                  (e._panner.distanceModel = e._pannerAttr.distanceModel),
                  (e._panner.maxDistance = e._pannerAttr.maxDistance),
                  (e._panner.refDistance = e._pannerAttr.refDistance),
                  (e._panner.rolloffFactor = e._pannerAttr.rolloffFactor),
                  (e._panner.panningModel = e._pannerAttr.panningModel),
                  void 0 !== e._panner.positionX
                      ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime))
                      : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
                  void 0 !== e._panner.orientationX
                      ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime),
                        e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime),
                        e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime))
                      : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2]))
                : ((e._panner = Howler.ctx.createStereoPanner()), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)),
                e._panner.connect(e._node),
                e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
        };
    })(),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).SiriWave = t());
    })(this, function () {
        "use strict";
        /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var e = function () {
                return (e =
                    Object.assign ||
                    function (e) {
                        for (var t, i = 1, n = arguments.length; i < n; i++) for (var a in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e;
                    }).apply(this, arguments);
            },
            t = (function () {
                function e(e, t) {
                    (this.ATT_FACTOR = 4), (this.GRAPH_X = 2), (this.AMPLITUDE_FACTOR = 0.6), (this.ctrl = e), (this.definition = t);
                }
                return (
                    (e.prototype.globalAttFn = function (e) {
                        return Math.pow(this.ATT_FACTOR / (this.ATT_FACTOR + Math.pow(e, this.ATT_FACTOR)), this.ATT_FACTOR);
                    }),
                    (e.prototype.xPos = function (e) {
                        return this.ctrl.width * ((e + this.GRAPH_X) / (2 * this.GRAPH_X));
                    }),
                    (e.prototype.yPos = function (e) {
                        return this.AMPLITUDE_FACTOR * (this.globalAttFn(e) * (this.ctrl.heightMax * this.ctrl.amplitude) * (1 / this.definition.attenuation) * Math.sin(this.ctrl.opt.frequency * e - this.ctrl.phase));
                    }),
                    (e.prototype.draw = function () {
                        var e = this.ctrl.ctx;
                        e.moveTo(0, 0), e.beginPath();
                        var t = this.ctrl.color.replace(/rgb\(/g, "").replace(/\)/g, "");
                        (e.strokeStyle = "rgba(" + t + "," + this.definition.opacity + ")"), (e.lineWidth = this.definition.lineWidth);
                        for (var i = -this.GRAPH_X; i <= this.GRAPH_X; i += this.ctrl.opt.pixelDepth) e.lineTo(this.xPos(i), this.ctrl.heightMax + this.yPos(i));
                        e.stroke();
                    }),
                    (e.getDefinition = function () {
                        return [
                            { attenuation: -2, lineWidth: 1, opacity: 0.1 },
                            { attenuation: -6, lineWidth: 1, opacity: 0.2 },
                            { attenuation: 4, lineWidth: 1, opacity: 0.4 },
                            { attenuation: 2, lineWidth: 1, opacity: 0.6 },
                            { attenuation: 1, lineWidth: 1.5, opacity: 1 },
                        ];
                    }),
                    e
                );
            })(),
            i = (function () {
                function e(e, t) {
                    (this.GRAPH_X = 25),
                        (this.AMPLITUDE_FACTOR = 0.8),
                        (this.SPEED_FACTOR = 1),
                        (this.DEAD_PX = 2),
                        (this.ATT_FACTOR = 4),
                        (this.DESPAWN_FACTOR = 0.02),
                        (this.NOOFCURVES_RANGES = [2, 5]),
                        (this.AMPLITUDE_RANGES = [0.3, 1]),
                        (this.OFFSET_RANGES = [-3, 3]),
                        (this.WIDTH_RANGES = [1, 3]),
                        (this.SPEED_RANGES = [0.5, 1]),
                        (this.DESPAWN_TIMEOUT_RANGES = [500, 2e3]),
                        (this.ctrl = e),
                        (this.definition = t),
                        (this.noOfCurves = 0),
                        (this.spawnAt = 0),
                        (this.prevMaxY = 0),
                        (this.phases = []),
                        (this.offsets = []),
                        (this.speeds = []),
                        (this.finalAmplitudes = []),
                        (this.widths = []),
                        (this.amplitudes = []),
                        (this.despawnTimeouts = []),
                        (this.verses = []);
                }
                return (
                    (e.prototype.getRandomRange = function (e) {
                        return e[0] + Math.random() * (e[1] - e[0]);
                    }),
                    (e.prototype.spawnSingle = function (e) {
                        (this.phases[e] = 0),
                            (this.amplitudes[e] = 0),
                            (this.despawnTimeouts[e] = this.getRandomRange(this.DESPAWN_TIMEOUT_RANGES)),
                            (this.offsets[e] = this.getRandomRange(this.OFFSET_RANGES)),
                            (this.speeds[e] = this.getRandomRange(this.SPEED_RANGES)),
                            (this.finalAmplitudes[e] = this.getRandomRange(this.AMPLITUDE_RANGES)),
                            (this.widths[e] = this.getRandomRange(this.WIDTH_RANGES)),
                            (this.verses[e] = this.getRandomRange([-1, 1]));
                    }),
                    (e.prototype.getEmptyArray = function (e) {
                        return new Array(e);
                    }),
                    (e.prototype.spawn = function () {
                        (this.spawnAt = Date.now()),
                            (this.noOfCurves = Math.floor(this.getRandomRange(this.NOOFCURVES_RANGES))),
                            (this.phases = this.getEmptyArray(this.noOfCurves)),
                            (this.offsets = this.getEmptyArray(this.noOfCurves)),
                            (this.speeds = this.getEmptyArray(this.noOfCurves)),
                            (this.finalAmplitudes = this.getEmptyArray(this.noOfCurves)),
                            (this.widths = this.getEmptyArray(this.noOfCurves)),
                            (this.amplitudes = this.getEmptyArray(this.noOfCurves)),
                            (this.despawnTimeouts = this.getEmptyArray(this.noOfCurves)),
                            (this.verses = this.getEmptyArray(this.noOfCurves));
                        for (var e = 0; e < this.noOfCurves; e++) this.spawnSingle(e);
                    }),
                    (e.prototype.globalAttFn = function (e) {
                        return Math.pow(this.ATT_FACTOR / (this.ATT_FACTOR + Math.pow(e, 2)), this.ATT_FACTOR);
                    }),
                    (e.prototype.sin = function (e, t) {
                        return Math.sin(e - t);
                    }),
                    (e.prototype.yRelativePos = function (e) {
                        for (var t = 0, i = 0; i < this.noOfCurves; i++) {
                            var n = 4 * ((i / (this.noOfCurves - 1)) * 2 - 1);
                            n += this.offsets[i];
                            var a = e * (1 / this.widths[i]) - n;
                            t += Math.abs(this.amplitudes[i] * this.sin(this.verses[i] * a, this.phases[i]) * this.globalAttFn(a));
                        }
                        return t / this.noOfCurves;
                    }),
                    (e.prototype.yPos = function (e) {
                        return this.AMPLITUDE_FACTOR * this.ctrl.heightMax * this.ctrl.amplitude * this.yRelativePos(e) * this.globalAttFn((e / this.GRAPH_X) * 2);
                    }),
                    (e.prototype.xPos = function (e) {
                        return this.ctrl.width * ((e + this.GRAPH_X) / (2 * this.GRAPH_X));
                    }),
                    (e.prototype.drawSupportLine = function () {
                        var e = this.ctrl.ctx,
                            t = [0, this.ctrl.heightMax, this.ctrl.width, 1],
                            i = e.createLinearGradient.apply(e, t);
                        i.addColorStop(0, "transparent"), i.addColorStop(0.1, "rgba(255,255,255,.5)"), i.addColorStop(0.8, "rgba(255,255,255,.5)"), i.addColorStop(1, "transparent"), (e.fillStyle = i), e.fillRect.apply(e, t);
                    }),
                    (e.prototype.draw = function () {
                        var e = this.ctrl.ctx;
                        if (((e.globalAlpha = 0.7), (e.globalCompositeOperation = "lighter"), 0 === this.spawnAt && this.spawn(), this.definition.supportLine)) return this.drawSupportLine();
                        for (var t = 0; t < this.noOfCurves; t++)
                            this.spawnAt + this.despawnTimeouts[t] <= Date.now() ? (this.amplitudes[t] -= this.DESPAWN_FACTOR) : (this.amplitudes[t] += this.DESPAWN_FACTOR),
                                (this.amplitudes[t] = Math.min(Math.max(this.amplitudes[t], 0), this.finalAmplitudes[t])),
                                (this.phases[t] = (this.phases[t] + this.ctrl.speed * this.speeds[t] * this.SPEED_FACTOR) % (2 * Math.PI));
                        for (var i = -1 / 0, n = 0, a = [1, -1]; n < a.length; n++) {
                            var s = a[n];
                            e.beginPath();
                            for (var r = -this.GRAPH_X; r <= this.GRAPH_X; r += this.ctrl.opt.pixelDepth) {
                                var o = this.xPos(r),
                                    l = this.yPos(r);
                                e.lineTo(o, this.ctrl.heightMax - s * l), (i = Math.max(i, l));
                            }
                            e.closePath(), (e.fillStyle = "rgba(" + this.definition.color + ", 1)"), (e.strokeStyle = "rgba(" + this.definition.color + ", 1)"), e.fill();
                        }
                        return i < this.DEAD_PX && this.prevMaxY > i && (this.spawnAt = 0), (this.prevMaxY = i), null;
                    }),
                    (e.getDefinition = function () {
                        return [{ color: "255,255,255", supportLine: !0 }, { color: "15, 82, 169" }, { color: "173, 57, 76" }, { color: "48, 220, 155" }];
                    }),
                    e
                );
            })();
        return (function () {
            function n(n) {
                var a = this,
                    s = n.container,
                    r = (function (e, t) {
                        var i = {};
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (i[n] = e[n]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var a = 0;
                            for (n = Object.getOwnPropertySymbols(e); a < n.length; a++) t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (i[n[a]] = e[n[a]]);
                        }
                        return i;
                    })(n, ["container"]);
                (this.phase = 0), (this.run = !1), (this.curves = []);
                var o = window.getComputedStyle(s);
                (this.opt = e(
                    {
                        container: s,
                        style: "ios",
                        ratio: window.devicePixelRatio || 1,
                        speed: 0.2,
                        amplitude: 1,
                        frequency: 6,
                        color: "#fff",
                        cover: !1,
                        width: parseInt(o.width.replace("px", ""), 10),
                        height: parseInt(o.height.replace("px", ""), 10),
                        autostart: !0,
                        pixelDepth: 0.02,
                        lerpSpeed: 0.1,
                    },
                    r
                )),
                    (this.speed = Number(this.opt.speed)),
                    (this.amplitude = Number(this.opt.amplitude)),
                    (this.width = Number(this.opt.ratio * this.opt.width)),
                    (this.height = Number(this.opt.ratio * this.opt.height)),
                    (this.heightMax = Number(this.height / 2) - 6),
                    (this.color = "rgb(" + this.hex2rgb(this.opt.color) + ")"),
                    (this.interpolation = { speed: this.speed, amplitude: this.amplitude }),
                    (this.canvas = document.createElement("canvas"));
                var l = this.canvas.getContext("2d");
                if (null === l) throw new Error("Unable to create 2D Context");
                if (
                    "ios9" ===
                    ((this.ctx = l),
                    (this.canvas.width = this.width),
                    (this.canvas.height = this.height),
                    !0 === this.opt.cover ? (this.canvas.style.width = this.canvas.style.height = "100%") : ((this.canvas.style.width = this.width / this.opt.ratio + "px"), (this.canvas.style.height = this.height / this.opt.ratio + "px")),
                    this.opt.style)
                )
                    this.curves = (this.opt.curveDefinition || i.getDefinition()).map(function (e) {
                        return new i(a, e);
                    });
                else
                    this.curves = (this.opt.curveDefinition || t.getDefinition()).map(function (e) {
                        return new t(a, e);
                    });
                this.opt.container.appendChild(this.canvas), this.opt.autostart && this.start();
            }
            return (
                (n.prototype.hex2rgb = function (e) {
                    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, i, n) {
                        return t + t + i + i + n + n;
                    });
                    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                    return t ? parseInt(t[1], 16).toString() + "," + parseInt(t[2], 16).toString() + "," + parseInt(t[3], 16).toString() : null;
                }),
                (n.prototype.intLerp = function (e, t, i) {
                    return e * (1 - i) + t * i;
                }),
                (n.prototype.lerp = function (e) {
                    var t = this.interpolation[e];
                    return null !== t && ((this[e] = this.intLerp(this[e], t, this.opt.lerpSpeed)), this[e] - t == 0 && (this.interpolation[e] = null)), this[e];
                }),
                (n.prototype.clear = function () {
                    (this.ctx.globalCompositeOperation = "destination-out"), this.ctx.fillRect(0, 0, this.width, this.height), (this.ctx.globalCompositeOperation = "source-over");
                }),
                (n.prototype.draw = function () {
                    this.curves.forEach(function (e) {
                        return e.draw();
                    });
                }),
                (n.prototype.startDrawCycle = function () {
                    this.clear(),
                        this.lerp("amplitude"),
                        this.lerp("speed"),
                        this.draw(),
                        (this.phase = (this.phase + (Math.PI / 2) * this.speed) % (2 * Math.PI)),
                        window.requestAnimationFrame ? (this.animationFrameId = window.requestAnimationFrame(this.startDrawCycle.bind(this))) : (this.timeoutId = setTimeout(this.startDrawCycle.bind(this), 20));
                }),
                (n.prototype.start = function () {
                    if (!this.canvas) throw new Error("This instance of SiriWave has been disposed, please create a new instance");
                    (this.phase = 0), this.run || ((this.run = !0), this.startDrawCycle());
                }),
                (n.prototype.stop = function () {
                    (this.phase = 0), (this.run = !1), this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId), this.timeoutId && clearTimeout(this.timeoutId);
                }),
                (n.prototype.dispose = function () {
                    this.stop(), this.canvas && (this.canvas.remove(), (this.canvas = null));
                }),
                (n.prototype.set = function (e, t) {
                    this.interpolation[e] = t;
                }),
                (n.prototype.setSpeed = function (e) {
                    this.set("speed", e);
                }),
                (n.prototype.setAmplitude = function (e) {
                    this.set("amplitude", e);
                }),
                n
            );
        })();
    });