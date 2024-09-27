/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2023 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */ var t,
 e,
 i,
 n,
 s = {
     1782: (t, e, i) => {
         var n = i(7316),
             s = i(9762),
             r = TypeError;
         t.exports = function (t) {
             if (n(t)) return t;
             throw new r(s(t) + " is not a function");
         };
     },
     4958: (t, e, i) => {
         var n = i(7316),
             s = String,
             r = TypeError;
         t.exports = function (t) {
             if ("object" == typeof t || n(t)) return t;
             throw new r("Can't set " + s(t) + " as a prototype");
         };
     },
     5690: (t, e, i) => {
         var n = i(23).has;
         t.exports = function (t) {
             n(t);
             return t;
         };
     },
     5834: (t, e, i) => {
         var n = i(2658),
             s = TypeError;
         t.exports = function (t, e) {
             if (n(e, t)) return t;
             throw new s("Incorrect invocation");
         };
     },
     4719: (t, e, i) => {
         var n = i(7633),
             s = String,
             r = TypeError;
         t.exports = function (t) {
             if (n(t)) return t;
             throw new r(s(t) + " is not an object");
         };
     },
     5115: (t) => {
         t.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView;
     },
     7585: (t, e, i) => {
         var n = i(1299),
             s = i(8374),
             r = TypeError;
         t.exports =
             n(ArrayBuffer.prototype, "byteLength", "get") ||
             function (t) {
                 if ("ArrayBuffer" !== s(t)) throw new r("ArrayBuffer expected");
                 return t.byteLength;
             };
     },
     582: (t, e, i) => {
         var n = i(8403),
             s = i(7585),
             r = n(ArrayBuffer.prototype.slice);
         t.exports = function (t) {
             if (0 !== s(t)) return !1;
             try {
                 r(t, 0, 0);
                 return !1;
             } catch (t) {
                 return !0;
             }
         };
     },
     4358: (t, e, i) => {
         var n = i(9298),
             s = i(8403),
             r = i(1299),
             a = i(9548),
             o = i(582),
             l = i(7585),
             h = i(8126),
             c = i(4837),
             d = n.structuredClone,
             u = n.ArrayBuffer,
             p = n.DataView,
             g = n.TypeError,
             f = Math.min,
             m = u.prototype,
             v = p.prototype,
             b = s(m.slice),
             y = r(m, "resizable", "get"),
             A = r(m, "maxByteLength", "get"),
             E = s(v.getInt8),
             w = s(v.setInt8);
         t.exports =
             (c || h) &&
             function (t, e, i) {
                 var n,
                     s = l(t),
                     r = void 0 === e ? s : a(e),
                     m = !y || !y(t);
                 if (o(t)) throw new g("ArrayBuffer is detached");
                 if (c) {
                     t = d(t, { transfer: [t] });
                     if (s === r && (i || m)) return t;
                 }
                 if (s >= r && (!i || m)) n = b(t, 0, r);
                 else {
                     var v = i && !m && A ? { maxByteLength: A(t) } : void 0;
                     n = new u(r, v);
                     for (var x = new p(t), _ = new p(n), S = f(r, s), C = 0; C < S; C++) w(_, C, E(x, C));
                 }
                 c || h(t);
                 return n;
             };
     },
     5861: (t, e, i) => {
         var n,
             s,
             r,
             a = i(5115),
             o = i(940),
             l = i(9298),
             h = i(7316),
             c = i(7633),
             d = i(936),
             u = i(8329),
             p = i(9762),
             g = i(9293),
             f = i(7041),
             m = i(9691),
             v = i(2658),
             b = i(2176),
             y = i(9763),
             A = i(2292),
             E = i(7561),
             w = i(1649),
             x = w.enforce,
             _ = w.get,
             S = l.Int8Array,
             C = S && S.prototype,
             T = l.Uint8ClampedArray,
             P = T && T.prototype,
             M = S && b(S),
             R = C && b(C),
             k = Object.prototype,
             D = l.TypeError,
             I = A("toStringTag"),
             L = E("TYPED_ARRAY_TAG"),
             O = "TypedArrayConstructor",
             B = a && !!y && "Opera" !== u(l.opera),
             N = !1,
             U = { Int8Array: 1, Uint8Array: 1, Uint8ClampedArray: 1, Int16Array: 2, Uint16Array: 2, Int32Array: 4, Uint32Array: 4, Float32Array: 4, Float64Array: 8 },
             z = { BigInt64Array: 8, BigUint64Array: 8 },
             getTypedArrayConstructor = function (t) {
                 var e = b(t);
                 if (c(e)) {
                     var i = _(e);
                     return i && d(i, O) ? i[O] : getTypedArrayConstructor(e);
                 }
             },
             isTypedArray = function (t) {
                 if (!c(t)) return !1;
                 var e = u(t);
                 return d(U, e) || d(z, e);
             };
         for (n in U) (r = (s = l[n]) && s.prototype) ? (x(r)[O] = s) : (B = !1);
         for (n in z) (r = (s = l[n]) && s.prototype) && (x(r)[O] = s);
         if (!B || !h(M) || M === Function.prototype) {
             M = function TypedArray() {
                 throw new D("Incorrect invocation");
             };
             if (B) for (n in U) l[n] && y(l[n], M);
         }
         if (!B || !R || R === k) {
             R = M.prototype;
             if (B) for (n in U) l[n] && y(l[n].prototype, R);
         }
         B && b(P) !== R && y(P, R);
         if (o && !d(R, I)) {
             N = !0;
             m(R, I, {
                 configurable: !0,
                 get: function () {
                     return c(this) ? this[L] : void 0;
                 },
             });
             for (n in U) l[n] && g(l[n], L, n);
         }
         t.exports = {
             NATIVE_ARRAY_BUFFER_VIEWS: B,
             TYPED_ARRAY_TAG: N && L,
             aTypedArray: function (t) {
                 if (isTypedArray(t)) return t;
                 throw new D("Target is not a typed array");
             },
             aTypedArrayConstructor: function (t) {
                 if (h(t) && (!y || v(M, t))) return t;
                 throw new D(p(t) + " is not a typed array constructor");
             },
             exportTypedArrayMethod: function (t, e, i, n) {
                 if (o) {
                     if (i)
                         for (var s in U) {
                             var r = l[s];
                             if (r && d(r.prototype, t))
                                 try {
                                     delete r.prototype[t];
                                 } catch (i) {
                                     try {
                                         r.prototype[t] = e;
                                     } catch (t) {}
                                 }
                         }
                     (R[t] && !i) || f(R, t, i ? e : (B && C[t]) || e, n);
                 }
             },
             exportTypedArrayStaticMethod: function (t, e, i) {
                 var n, s;
                 if (o) {
                     if (y) {
                         if (i)
                             for (n in U)
                                 if ((s = l[n]) && d(s, t))
                                     try {
                                         delete s[t];
                                     } catch (t) {}
                         if (M[t] && !i) return;
                         try {
                             return f(M, t, i ? e : (B && M[t]) || e);
                         } catch (t) {}
                     }
                     for (n in U) !(s = l[n]) || (s[t] && !i) || f(s, t, e);
                 }
             },
             getTypedArrayConstructor: getTypedArrayConstructor,
             isView: function isView(t) {
                 if (!c(t)) return !1;
                 var e = u(t);
                 return "DataView" === e || d(U, e) || d(z, e);
             },
             isTypedArray: isTypedArray,
             TypedArray: M,
             TypedArrayPrototype: R,
         };
     },
     7003: (t, e, i) => {
         var n = i(451);
         t.exports = function (t, e, i) {
             for (var s = 0, r = arguments.length > 2 ? i : n(e), a = new t(r); r > s; ) a[s] = e[s++];
             return a;
         };
     },
     9773: (t, e, i) => {
         var n = i(4115),
             s = i(6985),
             r = i(451),
             createMethod = function (t) {
                 return function (e, i, a) {
                     var o,
                         l = n(e),
                         h = r(l),
                         c = s(a, h);
                     if (t && i != i) {
                         for (; h > c; ) if ((o = l[c++]) != o) return !0;
                     } else for (; h > c; c++) if ((t || c in l) && l[c] === i) return t || c || 0;
                     return !t && -1;
                 };
             };
         t.exports = { includes: createMethod(!0), indexOf: createMethod(!1) };
     },
     4026: (t, e, i) => {
         var n = i(7789),
             s = i(3622),
             r = i(2007),
             a = i(451),
             createMethod = function (t) {
                 var e = 1 === t;
                 return function (i, o, l) {
                     for (var h, c = r(i), d = s(c), u = a(d), p = n(o, l); u-- > 0; )
                         if (p((h = d[u]), u, c))
                             switch (t) {
                                 case 0:
                                     return h;
                                 case 1:
                                     return u;
                             }
                     return e ? -1 : void 0;
                 };
             };
         t.exports = { findLast: createMethod(0), findLastIndex: createMethod(1) };
     },
     6661: (t, e, i) => {
         var n = i(940),
             s = i(6998),
             r = TypeError,
             a = Object.getOwnPropertyDescriptor,
             o =
                 n &&
                 !(function () {
                     if (void 0 !== this) return !0;
                     try {
                         Object.defineProperty([], "length", { writable: !1 }).length = 1;
                     } catch (t) {
                         return t instanceof TypeError;
                     }
                 })();
         t.exports = o
             ? function (t, e) {
                   if (s(t) && !a(t, "length").writable) throw new r("Cannot set read only .length");
                   return (t.length = e);
               }
             : function (t, e) {
                   return (t.length = e);
               };
     },
     2304: (t, e, i) => {
         var n = i(451);
         t.exports = function (t, e) {
             for (var i = n(t), s = new e(i), r = 0; r < i; r++) s[r] = t[i - r - 1];
             return s;
         };
     },
     5886: (t, e, i) => {
         var n = i(451),
             s = i(1003),
             r = RangeError;
         t.exports = function (t, e, i, a) {
             var o = n(t),
                 l = s(i),
                 h = l < 0 ? o + l : l;
             if (h >= o || h < 0) throw new r("Incorrect index");
             for (var c = new e(o), d = 0; d < o; d++) c[d] = d === h ? a : t[d];
             return c;
         };
     },
     5723: (t, e, i) => {
         var n = i(4719),
             s = i(3316);
         t.exports = function (t, e, i, r) {
             try {
                 return r ? e(n(i)[0], i[1]) : e(i);
             } catch (e) {
                 s(t, "throw", e);
             }
         };
     },
     8374: (t, e, i) => {
         var n = i(8403),
             s = n({}.toString),
             r = n("".slice);
         t.exports = function (t) {
             return r(s(t), 8, -1);
         };
     },
     8329: (t, e, i) => {
         var n = i(3077),
             s = i(7316),
             r = i(8374),
             a = i(2292)("toStringTag"),
             o = Object,
             l =
                 "Arguments" ===
                 r(
                     (function () {
                         return arguments;
                     })()
                 );
         t.exports = n
             ? r
             : function (t) {
                   var e, i, n;
                   return void 0 === t
                       ? "Undefined"
                       : null === t
                       ? "Null"
                       : "string" ==
                         typeof (i = (function (t, e) {
                             try {
                                 return t[e];
                             } catch (t) {}
                         })((e = o(t)), a))
                       ? i
                       : l
                       ? r(e)
                       : "Object" === (n = r(e)) && s(e.callee)
                       ? "Arguments"
                       : n;
               };
     },
     1425: (t, e, i) => {
         var n = i(936),
             s = i(8953),
             r = i(5764),
             a = i(7744);
         t.exports = function (t, e, i) {
             for (var o = s(e), l = a.f, h = r.f, c = 0; c < o.length; c++) {
                 var d = o[c];
                 n(t, d) || (i && n(i, d)) || l(t, d, h(e, d));
             }
         };
     },
     7888: (t, e, i) => {
         var n = i(8154);
         t.exports = !n(function () {
             function F() {}
             F.prototype.constructor = null;
             return Object.getPrototypeOf(new F()) !== F.prototype;
         });
     },
     1111: (t) => {
         t.exports = function (t, e) {
             return { value: t, done: e };
         };
     },
     9293: (t, e, i) => {
         var n = i(940),
             s = i(7744),
             r = i(1198);
         t.exports = n
             ? function (t, e, i) {
                   return s.f(t, e, r(1, i));
               }
             : function (t, e, i) {
                   t[e] = i;
                   return t;
               };
     },
     1198: (t) => {
         t.exports = function (t, e) {
             return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
         };
     },
     8947: (t, e, i) => {
         var n = i(4871),
             s = i(7744),
             r = i(1198);
         t.exports = function (t, e, i) {
             var a = n(e);
             a in t ? s.f(t, a, r(0, i)) : (t[a] = i);
         };
     },
     9691: (t, e, i) => {
         var n = i(9687),
             s = i(7744);
         t.exports = function (t, e, i) {
             i.get && n(i.get, e, { getter: !0 });
             i.set && n(i.set, e, { setter: !0 });
             return s.f(t, e, i);
         };
     },
     7041: (t, e, i) => {
         var n = i(7316),
             s = i(7744),
             r = i(9687),
             a = i(6e3);
         t.exports = function (t, e, i, o) {
             o || (o = {});
             var l = o.enumerable,
                 h = void 0 !== o.name ? o.name : e;
             n(i) && r(i, h, o);
             if (o.global) l ? (t[e] = i) : a(e, i);
             else {
                 try {
                     o.unsafe ? t[e] && (l = !0) : delete t[e];
                 } catch (t) {}
                 l ? (t[e] = i) : s.f(t, e, { value: i, enumerable: !1, configurable: !o.nonConfigurable, writable: !o.nonWritable });
             }
             return t;
         };
     },
     6880: (t, e, i) => {
         var n = i(7041);
         t.exports = function (t, e, i) {
             for (var s in e) n(t, s, e[s], i);
             return t;
         };
     },
     6e3: (t, e, i) => {
         var n = i(9298),
             s = Object.defineProperty;
         t.exports = function (t, e) {
             try {
                 s(n, t, { value: e, configurable: !0, writable: !0 });
             } catch (i) {
                 n[t] = e;
             }
             return e;
         };
     },
     940: (t, e, i) => {
         var n = i(8154);
         t.exports = !n(function () {
             return (
                 7 !==
                 Object.defineProperty({}, 1, {
                     get: function () {
                         return 7;
                     },
                 })[1]
             );
         });
     },
     8126: (t, e, i) => {
         var n,
             s,
             r,
             a,
             o = i(9298),
             l = i(2276),
             h = i(4837),
             c = o.structuredClone,
             d = o.ArrayBuffer,
             u = o.MessageChannel,
             p = !1;
         if (h)
             p = function (t) {
                 c(t, { transfer: [t] });
             };
         else if (d)
             try {
                 u || ((n = l("worker_threads")) && (u = n.MessageChannel));
                 if (u) {
                     s = new u();
                     r = new d(2);
                     a = function (t) {
                         s.port1.postMessage(null, [t]);
                     };
                     if (2 === r.byteLength) {
                         a(r);
                         0 === r.byteLength && (p = a);
                     }
                 }
             } catch (t) {}
         t.exports = p;
     },
     1558: (t) => {
         var e = "object" == typeof document && document.all,
             i = void 0 === e && void 0 !== e;
         t.exports = { all: e, IS_HTMLDDA: i };
     },
     5584: (t, e, i) => {
         var n = i(9298),
             s = i(7633),
             r = n.document,
             a = s(r) && s(r.createElement);
         t.exports = function (t) {
             return a ? r.createElement(t) : {};
         };
     },
     4287: (t) => {
         var e = TypeError;
         t.exports = function (t) {
             if (t > 9007199254740991) throw e("Maximum allowed index exceeded");
             return t;
         };
     },
     5050: (t) => {
         t.exports = {
             IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
             DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
             HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
             WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
             InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
             NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
             NoModificationAllowedError: { s: "NO_MODIFICATION_ALLOWED_ERR", c: 7, m: 1 },
             NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
             NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
             InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
             InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
             SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
             InvalidModificationError: { s: "INVALID_MODIFICATION_ERR", c: 13, m: 1 },
             NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
             InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
             ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
             TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
             SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
             NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
             AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
             URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
             QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
             TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
             InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
             DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 },
         };
     },
     3413: (t, e, i) => {
         var n = i(8471),
             s = i(4864);
         t.exports = !n && !s && "object" == typeof window && "object" == typeof document;
     },
     8471: (t) => {
         t.exports = "object" == typeof Deno && Deno && "object" == typeof Deno.version;
     },
     4864: (t, e, i) => {
         var n = i(9298),
             s = i(8374);
         t.exports = "process" === s(n.process);
     },
     234: (t) => {
         t.exports = ("undefined" != typeof navigator && String(navigator.userAgent)) || "";
     },
     2171: (t, e, i) => {
         var n,
             s,
             r = i(9298),
             a = i(234),
             o = r.process,
             l = r.Deno,
             h = (o && o.versions) || (l && l.version),
             c = h && h.v8;
         c && (s = (n = c.split("."))[0] > 0 && n[0] < 4 ? 1 : +(n[0] + n[1]));
         !s && a && (!(n = a.match(/Edge\/(\d+)/)) || n[1] >= 74) && (n = a.match(/Chrome\/(\d+)/)) && (s = +n[1]);
         t.exports = s;
     },
     298: (t) => {
         t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
     },
     34: (t, e, i) => {
         var n = i(8403),
             s = Error,
             r = n("".replace),
             a = String(new s("zxcasd").stack),
             o = /\n\s*at [^:]*:[^\n]*/,
             l = o.test(a);
         t.exports = function (t, e) {
             if (l && "string" == typeof t && !s.prepareStackTrace) for (; e--; ) t = r(t, o, "");
             return t;
         };
     },
     1931: (t, e, i) => {
         var n = i(9293),
             s = i(34),
             r = i(3437),
             a = Error.captureStackTrace;
         t.exports = function (t, e, i, o) {
             r && (a ? a(t, e) : n(t, "stack", s(i, o)));
         };
     },
     3437: (t, e, i) => {
         var n = i(8154),
             s = i(1198);
         t.exports = !n(function () {
             var t = new Error("a");
             if (!("stack" in t)) return !0;
             Object.defineProperty(t, "stack", s(1, 7));
             return 7 !== t.stack;
         });
     },
     4978: (t, e, i) => {
         var n = i(9298),
             s = i(5764).f,
             r = i(9293),
             a = i(7041),
             o = i(6e3),
             l = i(1425),
             h = i(7007);
         t.exports = function (t, e) {
             var i,
                 c,
                 d,
                 u,
                 p,
                 g = t.target,
                 f = t.global,
                 m = t.stat;
             if ((i = f ? n : m ? n[g] || o(g, {}) : (n[g] || {}).prototype))
                 for (c in e) {
                     u = e[c];
                     d = t.dontCallGetSet ? (p = s(i, c)) && p.value : i[c];
                     if (!h(f ? c : g + (m ? "." : "#") + c, t.forced) && void 0 !== d) {
                         if (typeof u == typeof d) continue;
                         l(u, d);
                     }
                     (t.sham || (d && d.sham)) && r(u, "sham", !0);
                     a(i, c, u, t);
                 }
         };
     },
     8154: (t) => {
         t.exports = function (t) {
             try {
                 return !!t();
             } catch (t) {
                 return !0;
             }
         };
     },
     7294: (t, e, i) => {
         var n = i(2486),
             s = Function.prototype,
             r = s.apply,
             a = s.call;
         t.exports =
             ("object" == typeof Reflect && Reflect.apply) ||
             (n
                 ? a.bind(r)
                 : function () {
                       return a.apply(r, arguments);
                   });
     },
     7789: (t, e, i) => {
         var n = i(6218),
             s = i(1782),
             r = i(2486),
             a = n(n.bind);
         t.exports = function (t, e) {
             s(t);
             return void 0 === e
                 ? t
                 : r
                 ? a(t, e)
                 : function () {
                       return t.apply(e, arguments);
                   };
         };
     },
     2486: (t, e, i) => {
         var n = i(8154);
         t.exports = !n(function () {
             var t = function () {}.bind();
             return "function" != typeof t || t.hasOwnProperty("prototype");
         });
     },
     2026: (t, e, i) => {
         var n = i(2486),
             s = Function.prototype.call;
         t.exports = n
             ? s.bind(s)
             : function () {
                   return s.apply(s, arguments);
               };
     },
     5145: (t, e, i) => {
         var n = i(940),
             s = i(936),
             r = Function.prototype,
             a = n && Object.getOwnPropertyDescriptor,
             o = s(r, "name"),
             l = o && "something" === function something() {}.name,
             h = o && (!n || (n && a(r, "name").configurable));
         t.exports = { EXISTS: o, PROPER: l, CONFIGURABLE: h };
     },
     1299: (t, e, i) => {
         var n = i(8403),
             s = i(1782);
         t.exports = function (t, e, i) {
             try {
                 return n(s(Object.getOwnPropertyDescriptor(t, e)[i]));
             } catch (t) {}
         };
     },
     6218: (t, e, i) => {
         var n = i(8374),
             s = i(8403);
         t.exports = function (t) {
             if ("Function" === n(t)) return s(t);
         };
     },
     8403: (t, e, i) => {
         var n = i(2486),
             s = Function.prototype,
             r = s.call,
             a = n && s.bind.bind(r, r);
         t.exports = n
             ? a
             : function (t) {
                   return function () {
                       return r.apply(t, arguments);
                   };
               };
     },
     7187: (t, e, i) => {
         var n = i(9298),
             s = i(7316);
         t.exports = function (t, e) {
             return arguments.length < 2 ? ((i = n[t]), s(i) ? i : void 0) : n[t] && n[t][e];
             var i;
         };
     },
     9235: (t) => {
         t.exports = function (t) {
             return { iterator: t, next: t.next, done: !1 };
         };
     },
     907: (t, e, i) => {
         var n = i(2026),
             s = i(4719),
             r = i(9235),
             a = i(273);
         t.exports = function (t, e) {
             (e && "string" == typeof t) || s(t);
             var i = a(t);
             return r(s(void 0 !== i ? n(i, t) : t));
         };
     },
     273: (t, e, i) => {
         var n = i(8329),
             s = i(8486),
             r = i(3734),
             a = i(6596),
             o = i(2292)("iterator");
         t.exports = function (t) {
             if (!r(t)) return s(t, o) || s(t, "@@iterator") || a[n(t)];
         };
     },
     7612: (t, e, i) => {
         var n = i(2026),
             s = i(1782),
             r = i(4719),
             a = i(9762),
             o = i(273),
             l = TypeError;
         t.exports = function (t, e) {
             var i = arguments.length < 2 ? o(t) : e;
             if (s(i)) return r(n(i, t));
             throw new l(a(t) + " is not iterable");
         };
     },
     8486: (t, e, i) => {
         var n = i(1782),
             s = i(3734);
         t.exports = function (t, e) {
             var i = t[e];
             return s(i) ? void 0 : n(i);
         };
     },
     1096: (t, e, i) => {
         var n = i(1782),
             s = i(4719),
             r = i(2026),
             a = i(1003),
             o = i(9235),
             l = "Invalid size",
             h = RangeError,
             c = TypeError,
             d = Math.max,
             SetRecord = function (t, e, i, n) {
                 this.set = t;
                 this.size = e;
                 this.has = i;
                 this.keys = n;
             };
         SetRecord.prototype = {
             getIterator: function () {
                 return o(s(r(this.keys, this.set)));
             },
             includes: function (t) {
                 return r(this.has, this.set, t);
             },
         };
         t.exports = function (t) {
             s(t);
             var e = +t.size;
             if (e != e) throw new c(l);
             var i = a(e);
             if (i < 0) throw new h(l);
             return new SetRecord(t, d(i, 0), n(t.has), n(t.keys));
         };
     },
     9298: function (t) {
         var check = function (t) {
             return t && t.Math === Math && t;
         };
         t.exports =
             check("object" == typeof globalThis && globalThis) ||
             check("object" == typeof window && window) ||
             check("object" == typeof self && self) ||
             check("object" == typeof global && global) ||
             check("object" == typeof this && this) ||
             (function () {
                 return this;
             })() ||
             Function("return this")();
     },
     936: (t, e, i) => {
         var n = i(8403),
             s = i(2007),
             r = n({}.hasOwnProperty);
         t.exports =
             Object.hasOwn ||
             function hasOwn(t, e) {
                 return r(s(t), e);
             };
     },
     6010: (t) => {
         t.exports = {};
     },
     519: (t, e, i) => {
         var n = i(7187);
         t.exports = n("document", "documentElement");
     },
     9394: (t, e, i) => {
         var n = i(940),
             s = i(8154),
             r = i(5584);
         t.exports =
             !n &&
             !s(function () {
                 return (
                     7 !==
                     Object.defineProperty(r("div"), "a", {
                         get: function () {
                             return 7;
                         },
                     }).a
                 );
             });
     },
     3622: (t, e, i) => {
         var n = i(8403),
             s = i(8154),
             r = i(8374),
             a = Object,
             o = n("".split);
         t.exports = s(function () {
             return !a("z").propertyIsEnumerable(0);
         })
             ? function (t) {
                   return "String" === r(t) ? o(t, "") : a(t);
               }
             : a;
     },
     7523: (t, e, i) => {
         var n = i(7316),
             s = i(7633),
             r = i(9763);
         t.exports = function (t, e, i) {
             var a, o;
             r && n((a = e.constructor)) && a !== i && s((o = a.prototype)) && o !== i.prototype && r(t, o);
             return t;
         };
     },
     4993: (t, e, i) => {
         var n = i(8403),
             s = i(7316),
             r = i(7542),
             a = n(Function.toString);
         s(r.inspectSource) ||
             (r.inspectSource = function (t) {
                 return a(t);
             });
         t.exports = r.inspectSource;
     },
     8422: (t, e, i) => {
         var n = i(7633),
             s = i(9293);
         t.exports = function (t, e) {
             n(e) && "cause" in e && s(t, "cause", e.cause);
         };
     },
     1649: (t, e, i) => {
         var n,
             s,
             r,
             a = i(8443),
             o = i(9298),
             l = i(7633),
             h = i(9293),
             c = i(936),
             d = i(7542),
             u = i(3727),
             p = i(6010),
             g = "Object already initialized",
             f = o.TypeError,
             m = o.WeakMap;
         if (a || d.state) {
             var v = d.state || (d.state = new m());
             v.get = v.get;
             v.has = v.has;
             v.set = v.set;
             n = function (t, e) {
                 if (v.has(t)) throw new f(g);
                 e.facade = t;
                 v.set(t, e);
                 return e;
             };
             s = function (t) {
                 return v.get(t) || {};
             };
             r = function (t) {
                 return v.has(t);
             };
         } else {
             var b = u("state");
             p[b] = !0;
             n = function (t, e) {
                 if (c(t, b)) throw new f(g);
                 e.facade = t;
                 h(t, b, e);
                 return e;
             };
             s = function (t) {
                 return c(t, b) ? t[b] : {};
             };
             r = function (t) {
                 return c(t, b);
             };
         }
         t.exports = {
             set: n,
             get: s,
             has: r,
             enforce: function (t) {
                 return r(t) ? s(t) : n(t, {});
             },
             getterFor: function (t) {
                 return function (e) {
                     var i;
                     if (!l(e) || (i = s(e)).type !== t) throw new f("Incompatible receiver, " + t + " required");
                     return i;
                 };
             },
         };
     },
     5191: (t, e, i) => {
         var n = i(2292),
             s = i(6596),
             r = n("iterator"),
             a = Array.prototype;
         t.exports = function (t) {
             return void 0 !== t && (s.Array === t || a[r] === t);
         };
     },
     6998: (t, e, i) => {
         var n = i(8374);
         t.exports =
             Array.isArray ||
             function isArray(t) {
                 return "Array" === n(t);
             };
     },
     5986: (t, e, i) => {
         var n = i(8329);
         t.exports = function (t) {
             var e = n(t);
             return "BigInt64Array" === e || "BigUint64Array" === e;
         };
     },
     7316: (t, e, i) => {
         var n = i(1558),
             s = n.all;
         t.exports = n.IS_HTMLDDA
             ? function (t) {
                   return "function" == typeof t || t === s;
               }
             : function (t) {
                   return "function" == typeof t;
               };
     },
     7007: (t, e, i) => {
         var n = i(8154),
             s = i(7316),
             r = /#|\.prototype\./,
             isForced = function (t, e) {
                 var i = o[a(t)];
                 return i === h || (i !== l && (s(e) ? n(e) : !!e));
             },
             a = (isForced.normalize = function (t) {
                 return String(t).replace(r, ".").toLowerCase();
             }),
             o = (isForced.data = {}),
             l = (isForced.NATIVE = "N"),
             h = (isForced.POLYFILL = "P");
         t.exports = isForced;
     },
     3734: (t) => {
         t.exports = function (t) {
             return null == t;
         };
     },
     7633: (t, e, i) => {
         var n = i(7316),
             s = i(1558),
             r = s.all;
         t.exports = s.IS_HTMLDDA
             ? function (t) {
                   return "object" == typeof t ? null !== t : n(t) || t === r;
               }
             : function (t) {
                   return "object" == typeof t ? null !== t : n(t);
               };
     },
     2554: (t) => {
         t.exports = !1;
     },
     7814: (t, e, i) => {
         var n = i(7187),
             s = i(7316),
             r = i(2658),
             a = i(7960),
             o = Object;
         t.exports = a
             ? function (t) {
                   return "symbol" == typeof t;
               }
             : function (t) {
                   var e = n("Symbol");
                   return s(e) && r(e.prototype, o(t));
               };
     },
     5504: (t, e, i) => {
         var n = i(2026);
         t.exports = function (t, e, i) {
             for (var s, r, a = i ? t : t.iterator, o = t.next; !(s = n(o, a)).done; ) if (void 0 !== (r = e(s.value))) return r;
         };
     },
     6837: (t, e, i) => {
         var n = i(7789),
             s = i(2026),
             r = i(4719),
             a = i(9762),
             o = i(5191),
             l = i(451),
             h = i(2658),
             c = i(7612),
             d = i(273),
             u = i(3316),
             p = TypeError,
             Result = function (t, e) {
                 this.stopped = t;
                 this.result = e;
             },
             g = Result.prototype;
         t.exports = function (t, e, i) {
             var f,
                 m,
                 v,
                 b,
                 y,
                 A,
                 E,
                 w = i && i.that,
                 x = !(!i || !i.AS_ENTRIES),
                 _ = !(!i || !i.IS_RECORD),
                 S = !(!i || !i.IS_ITERATOR),
                 C = !(!i || !i.INTERRUPTED),
                 T = n(e, w),
                 stop = function (t) {
                     f && u(f, "normal", t);
                     return new Result(!0, t);
                 },
                 callFn = function (t) {
                     if (x) {
                         r(t);
                         return C ? T(t[0], t[1], stop) : T(t[0], t[1]);
                     }
                     return C ? T(t, stop) : T(t);
                 };
             if (_) f = t.iterator;
             else if (S) f = t;
             else {
                 if (!(m = d(t))) throw new p(a(t) + " is not iterable");
                 if (o(m)) {
                     for (v = 0, b = l(t); b > v; v++) if ((y = callFn(t[v])) && h(g, y)) return y;
                     return new Result(!1);
                 }
                 f = c(t, m);
             }
             A = _ ? t.next : f.next;
             for (; !(E = s(A, f)).done; ) {
                 try {
                     y = callFn(E.value);
                 } catch (t) {
                     u(f, "throw", t);
                 }
                 if ("object" == typeof y && y && h(g, y)) return y;
             }
             return new Result(!1);
         };
     },
     3316: (t, e, i) => {
         var n = i(2026),
             s = i(4719),
             r = i(8486);
         t.exports = function (t, e, i) {
             var a, o;
             s(t);
             try {
                 if (!(a = r(t, "return"))) {
                     if ("throw" === e) throw i;
                     return i;
                 }
                 a = n(a, t);
             } catch (t) {
                 o = !0;
                 a = t;
             }
             if ("throw" === e) throw i;
             if (o) throw a;
             s(a);
             return i;
         };
     },
     375: (t, e, i) => {
         var n = i(2026),
             s = i(6941),
             r = i(9293),
             a = i(6880),
             o = i(2292),
             l = i(1649),
             h = i(8486),
             c = i(5238).IteratorPrototype,
             d = i(1111),
             u = i(3316),
             p = o("toStringTag"),
             g = "IteratorHelper",
             f = "WrapForValidIterator",
             m = l.set,
             createIteratorProxyPrototype = function (t) {
                 var e = l.getterFor(t ? f : g);
                 return a(s(c), {
                     next: function next() {
                         var i = e(this);
                         if (t) return i.nextHandler();
                         try {
                             var n = i.done ? void 0 : i.nextHandler();
                             return d(n, i.done);
                         } catch (t) {
                             i.done = !0;
                             throw t;
                         }
                     },
                     return: function () {
                         var i = e(this),
                             s = i.iterator;
                         i.done = !0;
                         if (t) {
                             var r = h(s, "return");
                             return r ? n(r, s) : d(void 0, !0);
                         }
                         if (i.inner)
                             try {
                                 u(i.inner.iterator, "normal");
                             } catch (t) {
                                 return u(s, "throw", t);
                             }
                         u(s, "normal");
                         return d(void 0, !0);
                     },
                 });
             },
             v = createIteratorProxyPrototype(!0),
             b = createIteratorProxyPrototype(!1);
         r(b, p, "Iterator Helper");
         t.exports = function (t, e) {
             var i = function Iterator(i, n) {
                 if (n) {
                     n.iterator = i.iterator;
                     n.next = i.next;
                 } else n = i;
                 n.type = e ? f : g;
                 n.nextHandler = t;
                 n.counter = 0;
                 n.done = !1;
                 m(this, n);
             };
             i.prototype = e ? v : b;
             return i;
         };
     },
     8142: (t, e, i) => {
         var n = i(2026),
             s = i(1782),
             r = i(4719),
             a = i(9235),
             o = i(375),
             l = i(5723),
             h = o(function () {
                 var t = this.iterator,
                     e = r(n(this.next, t));
                 if (!(this.done = !!e.done)) return l(t, this.mapper, [e.value, this.counter++], !0);
             });
         t.exports = function map(t) {
             r(this);
             s(t);
             return new h(a(this), { mapper: t });
         };
     },
     5238: (t, e, i) => {
         var n,
             s,
             r,
             a = i(8154),
             o = i(7316),
             l = i(7633),
             h = i(6941),
             c = i(2176),
             d = i(7041),
             u = i(2292),
             p = i(2554),
             g = u("iterator"),
             f = !1;
         [].keys && ("next" in (r = [].keys()) ? (s = c(c(r))) !== Object.prototype && (n = s) : (f = !0));
         !l(n) ||
         a(function () {
             var t = {};
             return n[g].call(t) !== t;
         })
             ? (n = {})
             : p && (n = h(n));
         o(n[g]) ||
             d(n, g, function () {
                 return this;
             });
         t.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: f };
     },
     6596: (t) => {
         t.exports = {};
     },
     451: (t, e, i) => {
         var n = i(8293);
         t.exports = function (t) {
             return n(t.length);
         };
     },
     9687: (t, e, i) => {
         var n = i(8403),
             s = i(8154),
             r = i(7316),
             a = i(936),
             o = i(940),
             l = i(5145).CONFIGURABLE,
             h = i(4993),
             c = i(1649),
             d = c.enforce,
             u = c.get,
             p = String,
             g = Object.defineProperty,
             f = n("".slice),
             m = n("".replace),
             v = n([].join),
             b =
                 o &&
                 !s(function () {
                     return 8 !== g(function () {}, "length", { value: 8 }).length;
                 }),
             y = String(String).split("String"),
             A = (t.exports = function (t, e, i) {
                 "Symbol(" === f(p(e), 0, 7) && (e = "[" + m(p(e), /^Symbol\(([^)]*)\)/, "$1") + "]");
                 i && i.getter && (e = "get " + e);
                 i && i.setter && (e = "set " + e);
                 (!a(t, "name") || (l && t.name !== e)) && (o ? g(t, "name", { value: e, configurable: !0 }) : (t.name = e));
                 b && i && a(i, "arity") && t.length !== i.arity && g(t, "length", { value: i.arity });
                 try {
                     i && a(i, "constructor") && i.constructor ? o && g(t, "prototype", { writable: !1 }) : t.prototype && (t.prototype = void 0);
                 } catch (t) {}
                 var n = d(t);
                 a(n, "source") || (n.source = v(y, "string" == typeof e ? e : ""));
                 return t;
             });
         Function.prototype.toString = A(function toString() {
             return (r(this) && u(this).source) || h(this);
         }, "toString");
     },
     8537: (t) => {
         var e = Math.ceil,
             i = Math.floor;
         t.exports =
             Math.trunc ||
             function trunc(t) {
                 var n = +t;
                 return (n > 0 ? i : e)(n);
             };
     },
     1264: (t, e, i) => {
         var n = i(5730);
         t.exports = function (t, e) {
             return void 0 === t ? (arguments.length < 2 ? "" : e) : n(t);
         };
     },
     6941: (t, e, i) => {
         var n,
             s = i(4719),
             r = i(6617),
             a = i(298),
             o = i(6010),
             l = i(519),
             h = i(5584),
             c = i(3727),
             d = "prototype",
             u = "script",
             p = c("IE_PROTO"),
             EmptyConstructor = function () {},
             scriptTag = function (t) {
                 return "<" + u + ">" + t + "</" + u + ">";
             },
             NullProtoObjectViaActiveX = function (t) {
                 t.write(scriptTag(""));
                 t.close();
                 var e = t.parentWindow.Object;
                 t = null;
                 return e;
             },
             NullProtoObject = function () {
                 try {
                     n = new ActiveXObject("htmlfile");
                 } catch (t) {}
                 NullProtoObject =
                     "undefined" != typeof document
                         ? document.domain && n
                             ? NullProtoObjectViaActiveX(n)
                             : (function () {
                                   var t,
                                       e = h("iframe"),
                                       i = "java" + u + ":";
                                   e.style.display = "none";
                                   l.appendChild(e);
                                   e.src = String(i);
                                   (t = e.contentWindow.document).open();
                                   t.write(scriptTag("document.F=Object"));
                                   t.close();
                                   return t.F;
                               })()
                         : NullProtoObjectViaActiveX(n);
                 for (var t = a.length; t--; ) delete NullProtoObject[d][a[t]];
                 return NullProtoObject();
             };
         o[p] = !0;
         t.exports =
             Object.create ||
             function create(t, e) {
                 var i;
                 if (null !== t) {
                     EmptyConstructor[d] = s(t);
                     i = new EmptyConstructor();
                     EmptyConstructor[d] = null;
                     i[p] = t;
                 } else i = NullProtoObject();
                 return void 0 === e ? i : r.f(i, e);
             };
     },
     6617: (t, e, i) => {
         var n = i(940),
             s = i(9610),
             r = i(7744),
             a = i(4719),
             o = i(4115),
             l = i(1706);
         e.f =
             n && !s
                 ? Object.defineProperties
                 : function defineProperties(t, e) {
                       a(t);
                       for (var i, n = o(e), s = l(e), h = s.length, c = 0; h > c; ) r.f(t, (i = s[c++]), n[i]);
                       return t;
                   };
     },
     7744: (t, e, i) => {
         var n = i(940),
             s = i(9394),
             r = i(9610),
             a = i(4719),
             o = i(4871),
             l = TypeError,
             h = Object.defineProperty,
             c = Object.getOwnPropertyDescriptor,
             d = "enumerable",
             u = "configurable",
             p = "writable";
         e.f = n
             ? r
                 ? function defineProperty(t, e, i) {
                       a(t);
                       e = o(e);
                       a(i);
                       if ("function" == typeof t && "prototype" === e && "value" in i && p in i && !i[p]) {
                           var n = c(t, e);
                           if (n && n[p]) {
                               t[e] = i.value;
                               i = { configurable: u in i ? i[u] : n[u], enumerable: d in i ? i[d] : n[d], writable: !1 };
                           }
                       }
                       return h(t, e, i);
                   }
                 : h
             : function defineProperty(t, e, i) {
                   a(t);
                   e = o(e);
                   a(i);
                   if (s)
                       try {
                           return h(t, e, i);
                       } catch (t) {}
                   if ("get" in i || "set" in i) throw new l("Accessors not supported");
                   "value" in i && (t[e] = i.value);
                   return t;
               };
     },
     5764: (t, e, i) => {
         var n = i(940),
             s = i(2026),
             r = i(1879),
             a = i(1198),
             o = i(4115),
             l = i(4871),
             h = i(936),
             c = i(9394),
             d = Object.getOwnPropertyDescriptor;
         e.f = n
             ? d
             : function getOwnPropertyDescriptor(t, e) {
                   t = o(t);
                   e = l(e);
                   if (c)
                       try {
                           return d(t, e);
                       } catch (t) {}
                   if (h(t, e)) return a(!s(r.f, t, e), t[e]);
               };
     },
     5455: (t, e, i) => {
         var n = i(9138),
             s = i(298).concat("length", "prototype");
         e.f =
             Object.getOwnPropertyNames ||
             function getOwnPropertyNames(t) {
                 return n(t, s);
             };
     },
     1963: (t, e) => {
         e.f = Object.getOwnPropertySymbols;
     },
     2176: (t, e, i) => {
         var n = i(936),
             s = i(7316),
             r = i(2007),
             a = i(3727),
             o = i(7888),
             l = a("IE_PROTO"),
             h = Object,
             c = h.prototype;
         t.exports = o
             ? h.getPrototypeOf
             : function (t) {
                   var e = r(t);
                   if (n(e, l)) return e[l];
                   var i = e.constructor;
                   return s(i) && e instanceof i ? i.prototype : e instanceof h ? c : null;
               };
     },
     2658: (t, e, i) => {
         var n = i(8403);
         t.exports = n({}.isPrototypeOf);
     },
     9138: (t, e, i) => {
         var n = i(8403),
             s = i(936),
             r = i(4115),
             a = i(9773).indexOf,
             o = i(6010),
             l = n([].push);
         t.exports = function (t, e) {
             var i,
                 n = r(t),
                 h = 0,
                 c = [];
             for (i in n) !s(o, i) && s(n, i) && l(c, i);
             for (; e.length > h; ) s(n, (i = e[h++])) && (~a(c, i) || l(c, i));
             return c;
         };
     },
     1706: (t, e, i) => {
         var n = i(9138),
             s = i(298);
         t.exports =
             Object.keys ||
             function keys(t) {
                 return n(t, s);
             };
     },
     1879: (t, e) => {
         var i = {}.propertyIsEnumerable,
             n = Object.getOwnPropertyDescriptor,
             s = n && !i.call({ 1: 2 }, 1);
         e.f = s
             ? function propertyIsEnumerable(t) {
                   var e = n(this, t);
                   return !!e && e.enumerable;
               }
             : i;
     },
     9763: (t, e, i) => {
         var n = i(1299),
             s = i(4719),
             r = i(4958);
         t.exports =
             Object.setPrototypeOf ||
             ("__proto__" in {}
                 ? (function () {
                       var t,
                           e = !1,
                           i = {};
                       try {
                           (t = n(Object.prototype, "__proto__", "set"))(i, []);
                           e = i instanceof Array;
                       } catch (t) {}
                       return function setPrototypeOf(i, n) {
                           s(i);
                           r(n);
                           e ? t(i, n) : (i.__proto__ = n);
                           return i;
                       };
                   })()
                 : void 0);
     },
     2923: (t, e, i) => {
         var n = i(2026),
             s = i(7316),
             r = i(7633),
             a = TypeError;
         t.exports = function (t, e) {
             var i, o;
             if ("string" === e && s((i = t.toString)) && !r((o = n(i, t)))) return o;
             if (s((i = t.valueOf)) && !r((o = n(i, t)))) return o;
             if ("string" !== e && s((i = t.toString)) && !r((o = n(i, t)))) return o;
             throw new a("Can't convert object to primitive value");
         };
     },
     8953: (t, e, i) => {
         var n = i(7187),
             s = i(8403),
             r = i(5455),
             a = i(1963),
             o = i(4719),
             l = s([].concat);
         t.exports =
             n("Reflect", "ownKeys") ||
             function ownKeys(t) {
                 var e = r.f(o(t)),
                     i = a.f;
                 return i ? l(e, i(t)) : e;
             };
     },
     3713: (t, e, i) => {
         var n = i(8403),
             s = i(936),
             r = SyntaxError,
             a = parseInt,
             o = String.fromCharCode,
             l = n("".charAt),
             h = n("".slice),
             c = n(/./.exec),
             d = { '\\"': '"', "\\\\": "\\", "\\/": "/", "\\b": "\b", "\\f": "\f", "\\n": "\n", "\\r": "\r", "\\t": "\t" },
             u = /^[\da-f]{4}$/i,
             p = /^[\u0000-\u001F]$/;
         t.exports = function (t, e) {
             for (var i = !0, n = ""; e < t.length; ) {
                 var g = l(t, e);
                 if ("\\" === g) {
                     var f = h(t, e, e + 2);
                     if (s(d, f)) {
                         n += d[f];
                         e += 2;
                     } else {
                         if ("\\u" !== f) throw new r('Unknown escape sequence: "' + f + '"');
                         var m = h(t, (e += 2), e + 4);
                         if (!c(u, m)) throw new r("Bad Unicode escape at: " + e);
                         n += o(a(m, 16));
                         e += 4;
                     }
                 } else {
                     if ('"' === g) {
                         i = !1;
                         e++;
                         break;
                     }
                     if (c(p, g)) throw new r("Bad control character in string literal at: " + e);
                     n += g;
                     e++;
                 }
             }
             if (i) throw new r("Unterminated string at: " + e);
             return { value: n, end: e };
         };
     },
     6085: (t, e, i) => {
         var n = i(7744).f;
         t.exports = function (t, e, i) {
             i in t ||
                 n(t, i, {
                     configurable: !0,
                     get: function () {
                         return e[i];
                     },
                     set: function (t) {
                         e[i] = t;
                     },
                 });
         };
     },
     5645: (t, e, i) => {
         var n = i(3734),
             s = TypeError;
         t.exports = function (t) {
             if (n(t)) throw new s("Can't call method on " + t);
             return t;
         };
     },
     4057: (t, e, i) => {
         var n = i(23),
             s = i(8848),
             r = n.Set,
             a = n.add;
         t.exports = function (t) {
             var e = new r();
             s(t, function (t) {
                 a(e, t);
             });
             return e;
         };
     },
     5656: (t, e, i) => {
         var n = i(5690),
             s = i(23),
             r = i(4057),
             a = i(6098),
             o = i(1096),
             l = i(8848),
             h = i(5504),
             c = s.has,
             d = s.remove;
         t.exports = function difference(t) {
             var e = n(this),
                 i = o(t),
                 s = r(e);
             a(e) <= i.size
                 ? l(e, function (t) {
                       i.includes(t) && d(s, t);
                   })
                 : h(i.getIterator(), function (t) {
                       c(e, t) && d(s, t);
                   });
             return s;
         };
     },
     23: (t, e, i) => {
         var n = i(8403),
             s = Set.prototype;
         t.exports = { Set: Set, add: n(s.add), has: n(s.has), remove: n(s.delete), proto: s };
     },
     8461: (t, e, i) => {
         var n = i(5690),
             s = i(23),
             r = i(6098),
             a = i(1096),
             o = i(8848),
             l = i(5504),
             h = s.Set,
             c = s.add,
             d = s.has;
         t.exports = function intersection(t) {
             var e = n(this),
                 i = a(t),
                 s = new h();
             r(e) > i.size
                 ? l(i.getIterator(), function (t) {
                       d(e, t) && c(s, t);
                   })
                 : o(e, function (t) {
                       i.includes(t) && c(s, t);
                   });
             return s;
         };
     },
     8550: (t, e, i) => {
         var n = i(5690),
             s = i(23).has,
             r = i(6098),
             a = i(1096),
             o = i(8848),
             l = i(5504),
             h = i(3316);
         t.exports = function isDisjointFrom(t) {
             var e = n(this),
                 i = a(t);
             if (r(e) <= i.size)
                 return (
                     !1 !==
                     o(
                         e,
                         function (t) {
                             if (i.includes(t)) return !1;
                         },
                         !0
                     )
                 );
             var c = i.getIterator();
             return (
                 !1 !==
                 l(c, function (t) {
                     if (s(e, t)) return h(c, "normal", !1);
                 })
             );
         };
     },
     990: (t, e, i) => {
         var n = i(5690),
             s = i(6098),
             r = i(8848),
             a = i(1096);
         t.exports = function isSubsetOf(t) {
             var e = n(this),
                 i = a(t);
             return (
                 !(s(e) > i.size) &&
                 !1 !==
                     r(
                         e,
                         function (t) {
                             if (!i.includes(t)) return !1;
                         },
                         !0
                     )
             );
         };
     },
     194: (t, e, i) => {
         var n = i(5690),
             s = i(23).has,
             r = i(6098),
             a = i(1096),
             o = i(5504),
             l = i(3316);
         t.exports = function isSupersetOf(t) {
             var e = n(this),
                 i = a(t);
             if (r(e) < i.size) return !1;
             var h = i.getIterator();
             return (
                 !1 !==
                 o(h, function (t) {
                     if (!s(e, t)) return l(h, "normal", !1);
                 })
             );
         };
     },
     8848: (t, e, i) => {
         var n = i(8403),
             s = i(5504),
             r = i(23),
             a = r.Set,
             o = r.proto,
             l = n(o.forEach),
             h = n(o.keys),
             c = h(new a()).next;
         t.exports = function (t, e, i) {
             return i ? s({ iterator: h(t), next: c }, e) : l(t, e);
         };
     },
     507: (t, e, i) => {
         var n = i(7187),
             createSetLike = function (t) {
                 return {
                     size: t,
                     has: function () {
                         return !1;
                     },
                     keys: function () {
                         return {
                             next: function () {
                                 return { done: !0 };
                             },
                         };
                     },
                 };
             };
         t.exports = function (t) {
             var e = n("Set");
             try {
                 new e()[t](createSetLike(0));
                 try {
                     new e()[t](createSetLike(-1));
                     return !1;
                 } catch (t) {
                     return !0;
                 }
             } catch (t) {
                 return !1;
             }
         };
     },
     6098: (t, e, i) => {
         var n = i(1299),
             s = i(23);
         t.exports =
             n(s.proto, "size", "get") ||
             function (t) {
                 return t.size;
             };
     },
     3194: (t, e, i) => {
         var n = i(5690),
             s = i(23),
             r = i(4057),
             a = i(1096),
             o = i(5504),
             l = s.add,
             h = s.has,
             c = s.remove;
         t.exports = function symmetricDifference(t) {
             var e = n(this),
                 i = a(t).getIterator(),
                 s = r(e);
             o(i, function (t) {
                 h(e, t) ? c(s, t) : l(s, t);
             });
             return s;
         };
     },
     5703: (t, e, i) => {
         var n = i(5690),
             s = i(23).add,
             r = i(4057),
             a = i(1096),
             o = i(5504);
         t.exports = function union(t) {
             var e = n(this),
                 i = a(t).getIterator(),
                 l = r(e);
             o(i, function (t) {
                 s(l, t);
             });
             return l;
         };
     },
     3727: (t, e, i) => {
         var n = i(6807),
             s = i(7561),
             r = n("keys");
         t.exports = function (t) {
             return r[t] || (r[t] = s(t));
         };
     },
     7542: (t, e, i) => {
         var n = i(9298),
             s = i(6e3),
             r = "__core-js_shared__",
             a = n[r] || s(r, {});
         t.exports = a;
     },
     6807: (t, e, i) => {
         var n = i(2554),
             s = i(7542);
         (t.exports = function (t, e) {
             return s[t] || (s[t] = void 0 !== e ? e : {});
         })("versions", []).push({
             version: "3.34.0",
             mode: n ? "pure" : "global",
             copyright: "В© 2014-2023 Denis Pushkarev (zloirock.ru)",
             license: "https://github.com/zloirock/core-js/blob/v3.34.0/LICENSE",
             source: "https://github.com/zloirock/core-js",
         });
     },
     4837: (t, e, i) => {
         var n = i(9298),
             s = i(8154),
             r = i(2171),
             a = i(3413),
             o = i(8471),
             l = i(4864),
             h = n.structuredClone;
         t.exports =
             !!h &&
             !s(function () {
                 if ((o && r > 92) || (l && r > 94) || (a && r > 97)) return !1;
                 var t = new ArrayBuffer(8),
                     e = h(t, { transfer: [t] });
                 return 0 !== t.byteLength || 8 !== e.byteLength;
             });
     },
     3663: (t, e, i) => {
         var n = i(2171),
             s = i(8154),
             r = i(9298).String;
         t.exports =
             !!Object.getOwnPropertySymbols &&
             !s(function () {
                 var t = Symbol("symbol detection");
                 return !r(t) || !(Object(t) instanceof Symbol) || (!Symbol.sham && n && n < 41);
             });
     },
     6985: (t, e, i) => {
         var n = i(1003),
             s = Math.max,
             r = Math.min;
         t.exports = function (t, e) {
             var i = n(t);
             return i < 0 ? s(i + e, 0) : r(i, e);
         };
     },
     212: (t, e, i) => {
         var n = i(4151),
             s = TypeError;
         t.exports = function (t) {
             var e = n(t, "number");
             if ("number" == typeof e) throw new s("Can't convert number to bigint");
             return BigInt(e);
         };
     },
     9548: (t, e, i) => {
         var n = i(1003),
             s = i(8293),
             r = RangeError;
         t.exports = function (t) {
             if (void 0 === t) return 0;
             var e = n(t),
                 i = s(e);
             if (e !== i) throw new r("Wrong length or index");
             return i;
         };
     },
     4115: (t, e, i) => {
         var n = i(3622),
             s = i(5645);
         t.exports = function (t) {
             return n(s(t));
         };
     },
     1003: (t, e, i) => {
         var n = i(8537);
         t.exports = function (t) {
             var e = +t;
             return e != e || 0 === e ? 0 : n(e);
         };
     },
     8293: (t, e, i) => {
         var n = i(1003),
             s = Math.min;
         t.exports = function (t) {
             return t > 0 ? s(n(t), 9007199254740991) : 0;
         };
     },
     2007: (t, e, i) => {
         var n = i(5645),
             s = Object;
         t.exports = function (t) {
             return s(n(t));
         };
     },
     9892: (t, e, i) => {
         var n = i(9817),
             s = RangeError;
         t.exports = function (t, e) {
             var i = n(t);
             if (i % e) throw new s("Wrong offset");
             return i;
         };
     },
     9817: (t, e, i) => {
         var n = i(1003),
             s = RangeError;
         t.exports = function (t) {
             var e = n(t);
             if (e < 0) throw new s("The argument can't be less than 0");
             return e;
         };
     },
     4151: (t, e, i) => {
         var n = i(2026),
             s = i(7633),
             r = i(7814),
             a = i(8486),
             o = i(2923),
             l = i(2292),
             h = TypeError,
             c = l("toPrimitive");
         t.exports = function (t, e) {
             if (!s(t) || r(t)) return t;
             var i,
                 l = a(t, c);
             if (l) {
                 void 0 === e && (e = "default");
                 i = n(l, t, e);
                 if (!s(i) || r(i)) return i;
                 throw new h("Can't convert object to primitive value");
             }
             void 0 === e && (e = "number");
             return o(t, e);
         };
     },
     4871: (t, e, i) => {
         var n = i(4151),
             s = i(7814);
         t.exports = function (t) {
             var e = n(t, "string");
             return s(e) ? e : e + "";
         };
     },
     3077: (t, e, i) => {
         var n = {};
         n[i(2292)("toStringTag")] = "z";
         t.exports = "[object z]" === String(n);
     },
     5730: (t, e, i) => {
         var n = i(8329),
             s = String;
         t.exports = function (t) {
             if ("Symbol" === n(t)) throw new TypeError("Cannot convert a Symbol value to a string");
             return s(t);
         };
     },
     2276: (t, e, i) => {
         var n = i(4864);
         t.exports = function (t) {
             try {
                 if (n) return Function('return require("' + t + '")')();
             } catch (t) {}
         };
     },
     9762: (t) => {
         var e = String;
         t.exports = function (t) {
             try {
                 return e(t);
             } catch (t) {
                 return "Object";
             }
         };
     },
     7561: (t, e, i) => {
         var n = i(8403),
             s = 0,
             r = Math.random(),
             a = n((1).toString);
         t.exports = function (t) {
             return "Symbol(" + (void 0 === t ? "" : t) + ")_" + a(++s + r, 36);
         };
     },
     7960: (t, e, i) => {
         var n = i(3663);
         t.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;
     },
     9610: (t, e, i) => {
         var n = i(940),
             s = i(8154);
         t.exports =
             n &&
             s(function () {
                 return 42 !== Object.defineProperty(function () {}, "prototype", { value: 42, writable: !1 }).prototype;
             });
     },
     2743: (t) => {
         var e = TypeError;
         t.exports = function (t, i) {
             if (t < i) throw new e("Not enough arguments");
             return t;
         };
     },
     8443: (t, e, i) => {
         var n = i(9298),
             s = i(7316),
             r = n.WeakMap;
         t.exports = s(r) && /native code/.test(String(r));
     },
     2292: (t, e, i) => {
         var n = i(9298),
             s = i(6807),
             r = i(936),
             a = i(7561),
             o = i(3663),
             l = i(7960),
             h = n.Symbol,
             c = s("wks"),
             d = l ? h.for || h : (h && h.withoutSetter) || a;
         t.exports = function (t) {
             r(c, t) || (c[t] = o && r(h, t) ? h[t] : d("Symbol." + t));
             return c[t];
         };
     },
     7342: (t, e, i) => {
         var n = i(7187),
             s = i(936),
             r = i(9293),
             a = i(2658),
             o = i(9763),
             l = i(1425),
             h = i(6085),
             c = i(7523),
             d = i(1264),
             u = i(8422),
             p = i(1931),
             g = i(940),
             f = i(2554);
         t.exports = function (t, e, i, m) {
             var v = "stackTraceLimit",
                 b = m ? 2 : 1,
                 y = t.split("."),
                 A = y[y.length - 1],
                 E = n.apply(null, y);
             if (E) {
                 var w = E.prototype;
                 !f && s(w, "cause") && delete w.cause;
                 if (!i) return E;
                 var x = n("Error"),
                     _ = e(function (t, e) {
                         var i = d(m ? e : t, void 0),
                             n = m ? new E(t) : new E();
                         void 0 !== i && r(n, "message", i);
                         p(n, _, n.stack, 2);
                         this && a(w, this) && c(n, this, _);
                         arguments.length > b && u(n, arguments[b]);
                         return n;
                     });
                 _.prototype = w;
                 if ("Error" !== A) o ? o(_, x) : l(_, x, { name: !0 });
                 else if (g && v in E) {
                     h(_, E, v);
                     h(_, E, "prepareStackTrace");
                 }
                 l(_, E);
                 if (!f)
                     try {
                         w.name !== A && r(w, "name", A);
                         w.constructor = _;
                     } catch (t) {}
                 return _;
             }
         };
     },
     4226: (t, e, i) => {
         var n = i(4978),
             s = i(2007),
             r = i(451),
             a = i(6661),
             o = i(4287);
         n(
             {
                 target: "Array",
                 proto: !0,
                 arity: 1,
                 forced:
                     i(8154)(function () {
                         return 4294967297 !== [].push.call({ length: 4294967296 }, 1);
                     }) ||
                     !(function () {
                         try {
                             Object.defineProperty([], "length", { writable: !1 }).push();
                         } catch (t) {
                             return t instanceof TypeError;
                         }
                     })(),
             },
             {
                 push: function push(t) {
                     var e = s(this),
                         i = r(e),
                         n = arguments.length;
                     o(i + n);
                     for (var l = 0; l < n; l++) {
                         e[i] = arguments[l];
                         i++;
                     }
                     a(e, i);
                     return i;
                 },
             }
         );
     },
     3352: (t, e, i) => {
         var n = i(4978),
             s = i(9298),
             r = i(7294),
             a = i(7342),
             o = "WebAssembly",
             l = s[o],
             h = 7 !== new Error("e", { cause: 7 }).cause,
             exportGlobalErrorCauseWrapper = function (t, e) {
                 var i = {};
                 i[t] = a(t, e, h);
                 n({ global: !0, constructor: !0, arity: 1, forced: h }, i);
             },
             exportWebAssemblyErrorCauseWrapper = function (t, e) {
                 if (l && l[t]) {
                     var i = {};
                     i[t] = a(o + "." + t, e, h);
                     n({ target: o, stat: !0, constructor: !0, arity: 1, forced: h }, i);
                 }
             };
         exportGlobalErrorCauseWrapper("Error", function (t) {
             return function Error(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("EvalError", function (t) {
             return function EvalError(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("RangeError", function (t) {
             return function RangeError(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("ReferenceError", function (t) {
             return function ReferenceError(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("SyntaxError", function (t) {
             return function SyntaxError(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("TypeError", function (t) {
             return function TypeError(e) {
                 return r(t, this, arguments);
             };
         });
         exportGlobalErrorCauseWrapper("URIError", function (t) {
             return function URIError(e) {
                 return r(t, this, arguments);
             };
         });
         exportWebAssemblyErrorCauseWrapper("CompileError", function (t) {
             return function CompileError(e) {
                 return r(t, this, arguments);
             };
         });
         exportWebAssemblyErrorCauseWrapper("LinkError", function (t) {
             return function LinkError(e) {
                 return r(t, this, arguments);
             };
         });
         exportWebAssemblyErrorCauseWrapper("RuntimeError", function (t) {
             return function RuntimeError(e) {
                 return r(t, this, arguments);
             };
         });
     },
     9803: (t, e, i) => {
         var n = i(5861),
             s = i(4026).findLastIndex,
             r = n.aTypedArray;
         (0, n.exportTypedArrayMethod)("findLastIndex", function findLastIndex(t) {
             return s(r(this), t, arguments.length > 1 ? arguments[1] : void 0);
         });
     },
     8837: (t, e, i) => {
         var n = i(5861),
             s = i(4026).findLast,
             r = n.aTypedArray;
         (0, n.exportTypedArrayMethod)("findLast", function findLast(t) {
             return s(r(this), t, arguments.length > 1 ? arguments[1] : void 0);
         });
     },
     8347: (t, e, i) => {
         var n = i(9298),
             s = i(2026),
             r = i(5861),
             a = i(451),
             o = i(9892),
             l = i(2007),
             h = i(8154),
             c = n.RangeError,
             d = n.Int8Array,
             u = d && d.prototype,
             p = u && u.set,
             g = r.aTypedArray,
             f = r.exportTypedArrayMethod,
             m = !h(function () {
                 var t = new Uint8ClampedArray(2);
                 s(p, t, { length: 1, 0: 3 }, 1);
                 return 3 !== t[1];
             }),
             v =
                 m &&
                 r.NATIVE_ARRAY_BUFFER_VIEWS &&
                 h(function () {
                     var t = new d(2);
                     t.set(1);
                     t.set("2", 1);
                     return 0 !== t[0] || 2 !== t[1];
                 });
         f(
             "set",
             function set(t) {
                 g(this);
                 var e = o(arguments.length > 1 ? arguments[1] : void 0, 1),
                     i = l(t);
                 if (m) return s(p, this, i, e);
                 var n = this.length,
                     r = a(i),
                     h = 0;
                 if (r + e > n) throw new c("Wrong length");
                 for (; h < r; ) this[e + h] = i[h++];
             },
             !m || v
         );
     },
     7995: (t, e, i) => {
         var n = i(2304),
             s = i(5861),
             r = s.aTypedArray,
             a = s.exportTypedArrayMethod,
             o = s.getTypedArrayConstructor;
         a("toReversed", function toReversed() {
             return n(r(this), o(this));
         });
     },
     62: (t, e, i) => {
         var n = i(5861),
             s = i(8403),
             r = i(1782),
             a = i(7003),
             o = n.aTypedArray,
             l = n.getTypedArrayConstructor,
             h = n.exportTypedArrayMethod,
             c = s(n.TypedArrayPrototype.sort);
         h("toSorted", function toSorted(t) {
             void 0 !== t && r(t);
             var e = o(this),
                 i = a(l(e), e);
             return c(i, t);
         });
     },
     4602: (t, e, i) => {
         var n = i(5886),
             s = i(5861),
             r = i(5986),
             a = i(1003),
             o = i(212),
             l = s.aTypedArray,
             h = s.getTypedArrayConstructor,
             c = s.exportTypedArrayMethod,
             d = !!(function () {
                 try {
                     new Int8Array(1).with(2, {
                         valueOf: function () {
                             throw 8;
                         },
                     });
                 } catch (t) {
                     return 8 === t;
                 }
             })();
         c(
             "with",
             {
                 with: function (t, e) {
                     var i = l(this),
                         s = a(t),
                         c = r(i) ? o(e) : +e;
                     return n(i, h(i), s, c);
                 },
             }.with,
             !d
         );
     },
     344: (t, e, i) => {
         var n = i(940),
             s = i(9691),
             r = i(582),
             a = ArrayBuffer.prototype;
         n &&
             !("detached" in a) &&
             s(a, "detached", {
                 configurable: !0,
                 get: function detached() {
                     return r(this);
                 },
             });
     },
     7583: (t, e, i) => {
         var n = i(4978),
             s = i(4358);
         s &&
             n(
                 { target: "ArrayBuffer", proto: !0 },
                 {
                     transferToFixedLength: function transferToFixedLength() {
                         return s(this, arguments.length ? arguments[0] : void 0, !1);
                     },
                 }
             );
     },
     4305: (t, e, i) => {
         var n = i(4978),
             s = i(4358);
         s &&
             n(
                 { target: "ArrayBuffer", proto: !0 },
                 {
                     transfer: function transfer() {
                         return s(this, arguments.length ? arguments[0] : void 0, !0);
                     },
                 }
             );
     },
     7121: (t, e, i) => {
         var n = i(4978),
             s = i(9298),
             r = i(5834),
             a = i(4719),
             o = i(7316),
             l = i(2176),
             h = i(9691),
             c = i(8947),
             d = i(8154),
             u = i(936),
             p = i(2292),
             g = i(5238).IteratorPrototype,
             f = i(940),
             m = i(2554),
             v = "constructor",
             b = "Iterator",
             y = p("toStringTag"),
             A = TypeError,
             E = s[b],
             w =
                 m ||
                 !o(E) ||
                 E.prototype !== g ||
                 !d(function () {
                     E({});
                 }),
             x = function Iterator() {
                 r(this, g);
                 if (l(this) === g) throw new A("Abstract class Iterator not directly constructable");
             },
             defineIteratorPrototypeAccessor = function (t, e) {
                 f
                     ? h(g, t, {
                           configurable: !0,
                           get: function () {
                               return e;
                           },
                           set: function (e) {
                               a(this);
                               if (this === g) throw new A("You can't redefine this property");
                               u(this, t) ? (this[t] = e) : c(this, t, e);
                           },
                       })
                     : (g[t] = e);
             };
         u(g, y) || defineIteratorPrototypeAccessor(y, b);
         (!w && u(g, v) && g[v] !== Object) || defineIteratorPrototypeAccessor(v, x);
         x.prototype = g;
         n({ global: !0, constructor: !0, forced: w }, { Iterator: x });
     },
     385: (t, e, i) => {
         var n = i(4978),
             s = i(6837),
             r = i(1782),
             a = i(4719),
             o = i(9235);
         n(
             { target: "Iterator", proto: !0, real: !0 },
             {
                 every: function every(t) {
                     a(this);
                     r(t);
                     var e = o(this),
                         i = 0;
                     return !s(
                         e,
                         function (e, n) {
                             if (!t(e, i++)) return n();
                         },
                         { IS_RECORD: !0, INTERRUPTED: !0 }
                     ).stopped;
                 },
             }
         );
     },
     2993: (t, e, i) => {
         var n = i(4978),
             s = i(2026),
             r = i(1782),
             a = i(4719),
             o = i(9235),
             l = i(375),
             h = i(5723),
             c = i(2554),
             d = l(function () {
                 for (var t, e, i = this.iterator, n = this.predicate, r = this.next; ; ) {
                     t = a(s(r, i));
                     if ((this.done = !!t.done)) return;
                     e = t.value;
                     if (h(i, n, [e, this.counter++], !0)) return e;
                 }
             });
         n(
             { target: "Iterator", proto: !0, real: !0, forced: c },
             {
                 filter: function filter(t) {
                     a(this);
                     r(t);
                     return new d(o(this), { predicate: t });
                 },
             }
         );
     },
     8497: (t, e, i) => {
         var n = i(4978),
             s = i(2026),
             r = i(1782),
             a = i(4719),
             o = i(9235),
             l = i(907),
             h = i(375),
             c = i(3316),
             d = i(2554),
             u = h(function () {
                 for (var t, e, i = this.iterator, n = this.mapper; ; ) {
                     if ((e = this.inner))
                         try {
                             if (!(t = a(s(e.next, e.iterator))).done) return t.value;
                             this.inner = null;
                         } catch (t) {
                             c(i, "throw", t);
                         }
                     t = a(s(this.next, i));
                     if ((this.done = !!t.done)) return;
                     try {
                         this.inner = l(n(t.value, this.counter++), !1);
                     } catch (t) {
                         c(i, "throw", t);
                     }
                 }
             });
         n(
             { target: "Iterator", proto: !0, real: !0, forced: d },
             {
                 flatMap: function flatMap(t) {
                     a(this);
                     r(t);
                     return new u(o(this), { mapper: t, inner: null });
                 },
             }
         );
     },
     7944: (t, e, i) => {
         var n = i(4978),
             s = i(8142);
         n({ target: "Iterator", proto: !0, real: !0, forced: i(2554) }, { map: s });
     },
     8518: (t, e, i) => {
         var n = i(4978),
             s = i(6837),
             r = i(1782),
             a = i(4719),
             o = i(9235);
         n(
             { target: "Iterator", proto: !0, real: !0 },
             {
                 some: function some(t) {
                     a(this);
                     r(t);
                     var e = o(this),
                         i = 0;
                     return s(
                         e,
                         function (e, n) {
                             if (t(e, i++)) return n();
                         },
                         { IS_RECORD: !0, INTERRUPTED: !0 }
                     ).stopped;
                 },
             }
         );
     },
     2808: (t, e, i) => {
         var n = i(4978),
             s = i(940),
             r = i(9298),
             a = i(7187),
             o = i(8403),
             l = i(2026),
             h = i(7316),
             c = i(7633),
             d = i(6998),
             u = i(936),
             p = i(5730),
             g = i(451),
             f = i(8947),
             m = i(8154),
             v = i(3713),
             b = i(3663),
             y = r.JSON,
             A = r.Number,
             E = r.SyntaxError,
             w = y && y.parse,
             x = a("Object", "keys"),
             _ = Object.getOwnPropertyDescriptor,
             S = o("".charAt),
             C = o("".slice),
             T = o(/./.exec),
             P = o([].push),
             M = /^\d$/,
             R = /^[1-9]$/,
             k = /^(?:-|\d)$/,
             D = /^[\t\n\r ]$/,
             internalize = function (t, e, i, n) {
                 var s,
                     r,
                     a,
                     o,
                     h,
                     p = t[e],
                     f = n && p === n.value,
                     m = f && "string" == typeof n.source ? { source: n.source } : {};
                 if (c(p)) {
                     var v = d(p),
                         b = f ? n.nodes : v ? [] : {};
                     if (v) {
                         s = b.length;
                         a = g(p);
                         for (o = 0; o < a; o++) internalizeProperty(p, o, internalize(p, "" + o, i, o < s ? b[o] : void 0));
                     } else {
                         r = x(p);
                         a = g(r);
                         for (o = 0; o < a; o++) {
                             h = r[o];
                             internalizeProperty(p, h, internalize(p, h, i, u(b, h) ? b[h] : void 0));
                         }
                     }
                 }
                 return l(i, t, e, p, m);
             },
             internalizeProperty = function (t, e, i) {
                 if (s) {
                     var n = _(t, e);
                     if (n && !n.configurable) return;
                 }
                 void 0 === i ? delete t[e] : f(t, e, i);
             },
             Node = function (t, e, i, n) {
                 this.value = t;
                 this.end = e;
                 this.source = i;
                 this.nodes = n;
             },
             Context = function (t, e) {
                 this.source = t;
                 this.index = e;
             };
         Context.prototype = {
             fork: function (t) {
                 return new Context(this.source, t);
             },
             parse: function () {
                 var t = this.source,
                     e = this.skip(D, this.index),
                     i = this.fork(e),
                     n = S(t, e);
                 if (T(k, n)) return i.number();
                 switch (n) {
                     case "{":
                         return i.object();
                     case "[":
                         return i.array();
                     case '"':
                         return i.string();
                     case "t":
                         return i.keyword(!0);
                     case "f":
                         return i.keyword(!1);
                     case "n":
                         return i.keyword(null);
                 }
                 throw new E('Unexpected character: "' + n + '" at: ' + e);
             },
             node: function (t, e, i, n, s) {
                 return new Node(e, n, t ? null : C(this.source, i, n), s);
             },
             object: function () {
                 for (var t = this.source, e = this.index + 1, i = !1, n = {}, s = {}; e < t.length; ) {
                     e = this.until(['"', "}"], e);
                     if ("}" === S(t, e) && !i) {
                         e++;
                         break;
                     }
                     var r = this.fork(e).string(),
                         a = r.value;
                     e = r.end;
                     e = this.until([":"], e) + 1;
                     e = this.skip(D, e);
                     r = this.fork(e).parse();
                     f(s, a, r);
                     f(n, a, r.value);
                     e = this.until([",", "}"], r.end);
                     var o = S(t, e);
                     if ("," === o) {
                         i = !0;
                         e++;
                     } else if ("}" === o) {
                         e++;
                         break;
                     }
                 }
                 return this.node(1, n, this.index, e, s);
             },
             array: function () {
                 for (var t = this.source, e = this.index + 1, i = !1, n = [], s = []; e < t.length; ) {
                     e = this.skip(D, e);
                     if ("]" === S(t, e) && !i) {
                         e++;
                         break;
                     }
                     var r = this.fork(e).parse();
                     P(s, r);
                     P(n, r.value);
                     e = this.until([",", "]"], r.end);
                     if ("," === S(t, e)) {
                         i = !0;
                         e++;
                     } else if ("]" === S(t, e)) {
                         e++;
                         break;
                     }
                 }
                 return this.node(1, n, this.index, e, s);
             },
             string: function () {
                 var t = this.index,
                     e = v(this.source, this.index + 1);
                 return this.node(0, e.value, t, e.end);
             },
             number: function () {
                 var t = this.source,
                     e = this.index,
                     i = e;
                 "-" === S(t, i) && i++;
                 if ("0" === S(t, i)) i++;
                 else {
                     if (!T(R, S(t, i))) throw new E("Failed to parse number at: " + i);
                     i = this.skip(M, ++i);
                 }
                 "." === S(t, i) && (i = this.skip(M, ++i));
                 if ("e" === S(t, i) || "E" === S(t, i)) {
                     i++;
                     ("+" !== S(t, i) && "-" !== S(t, i)) || i++;
                     if (i === (i = this.skip(M, i))) throw new E("Failed to parse number's exponent value at: " + i);
                 }
                 return this.node(0, A(C(t, e, i)), e, i);
             },
             keyword: function (t) {
                 var e = "" + t,
                     i = this.index,
                     n = i + e.length;
                 if (C(this.source, i, n) !== e) throw new E("Failed to parse value at: " + i);
                 return this.node(0, t, i, n);
             },
             skip: function (t, e) {
                 for (var i = this.source; e < i.length && T(t, S(i, e)); e++);
                 return e;
             },
             until: function (t, e) {
                 e = this.skip(D, e);
                 for (var i = S(this.source, e), n = 0; n < t.length; n++) if (t[n] === i) return e;
                 throw new E('Unexpected character: "' + i + '" at: ' + e);
             },
         };
         var I = m(function () {
                 var t,
                     e = "9007199254740993";
                 w(e, function (e, i, n) {
                     t = n.source;
                 });
                 return t !== e;
             }),
             L =
                 b &&
                 !m(function () {
                     return 1 / w("-0 \t") != -1 / 0;
                 });
         n(
             { target: "JSON", stat: !0, forced: I },
             {
                 parse: function parse(t, e) {
                     return L && !h(e)
                         ? w(t)
                         : (function (t, e) {
                               t = p(t);
                               var i = new Context(t, 0, ""),
                                   n = i.parse(),
                                   s = n.value,
                                   r = i.skip(D, n.end);
                               if (r < t.length) throw new E('Unexpected extra character: "' + S(t, r) + '" after the parsed data at: ' + r);
                               return h(e) ? internalize({ "": s }, "", e, n) : s;
                           })(t, e);
                 },
             }
         );
     },
     5561: (t, e, i) => {
         var n = i(4978),
             s = i(5656);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("difference") }, { difference: s });
     },
     8587: (t, e, i) => {
         var n = i(4978),
             s = i(8154),
             r = i(8461);
         n(
             {
                 target: "Set",
                 proto: !0,
                 real: !0,
                 forced:
                     !i(507)("intersection") ||
                     s(function () {
                         return "3,2" !== Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])));
                     }),
             },
             { intersection: r }
         );
     },
     3247: (t, e, i) => {
         var n = i(4978),
             s = i(8550);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("isDisjointFrom") }, { isDisjointFrom: s });
     },
     3302: (t, e, i) => {
         var n = i(4978),
             s = i(990);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("isSubsetOf") }, { isSubsetOf: s });
     },
     9490: (t, e, i) => {
         var n = i(4978),
             s = i(194);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("isSupersetOf") }, { isSupersetOf: s });
     },
     5438: (t, e, i) => {
         var n = i(4978),
             s = i(3194);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("symmetricDifference") }, { symmetricDifference: s });
     },
     7914: (t, e, i) => {
         var n = i(4978),
             s = i(5703);
         n({ target: "Set", proto: !0, real: !0, forced: !i(507)("union") }, { union: s });
     },
     9709: (t, e, i) => {
         var n = i(4978),
             s = i(9298),
             r = i(7187),
             a = i(1198),
             o = i(7744).f,
             l = i(936),
             h = i(5834),
             c = i(7523),
             d = i(1264),
             u = i(5050),
             p = i(34),
             g = i(940),
             f = i(2554),
             m = "DOMException",
             v = r("Error"),
             b = r(m),
             y = function DOMException() {
                 h(this, A);
                 var t = arguments.length,
                     e = d(t < 1 ? void 0 : arguments[0]),
                     i = d(t < 2 ? void 0 : arguments[1], "Error"),
                     n = new b(e, i),
                     s = new v(e);
                 s.name = m;
                 o(n, "stack", a(1, p(s.stack, 1)));
                 c(n, this, y);
                 return n;
             },
             A = (y.prototype = b.prototype),
             E = "stack" in new v(m),
             w = "stack" in new b(1, 2),
             x = b && g && Object.getOwnPropertyDescriptor(s, m),
             _ = !(!x || (x.writable && x.configurable)),
             S = E && !_ && !w;
         n({ global: !0, constructor: !0, forced: f || S }, { DOMException: S ? y : b });
         var C = r(m),
             T = C.prototype;
         if (T.constructor !== C) {
             f || o(T, "constructor", a(1, C));
             for (var P in u)
                 if (l(u, P)) {
                     var M = u[P],
                         R = M.s;
                     l(C, R) || o(C, R, a(6, M.c));
                 }
         }
     },
     3655: (t, e, i) => {
         var n = i(7041),
             s = i(8403),
             r = i(5730),
             a = i(2743),
             o = URLSearchParams,
             l = o.prototype,
             h = s(l.append),
             c = s(l.delete),
             d = s(l.forEach),
             u = s([].push),
             p = new o("a=1&a=2&b=3");
         p.delete("a", 1);
         p.delete("b", void 0);
         p + "" != "a=2" &&
             n(
                 l,
                 "delete",
                 function (t) {
                     var e = arguments.length,
                         i = e < 2 ? void 0 : arguments[1];
                     if (e && void 0 === i) return c(this, t);
                     var n = [];
                     d(this, function (t, e) {
                         u(n, { key: e, value: t });
                     });
                     a(e, 1);
                     for (var s, o = r(t), l = r(i), p = 0, g = 0, f = !1, m = n.length; p < m; ) {
                         s = n[p++];
                         if (f || s.key === o) {
                             f = !0;
                             c(this, s.key);
                         } else g++;
                     }
                     for (; g < m; ) ((s = n[g++]).key === o && s.value === l) || h(this, s.key, s.value);
                 },
                 { enumerable: !0, unsafe: !0 }
             );
     },
     2555: (t, e, i) => {
         var n = i(7041),
             s = i(8403),
             r = i(5730),
             a = i(2743),
             o = URLSearchParams,
             l = o.prototype,
             h = s(l.getAll),
             c = s(l.has),
             d = new o("a=1");
         (!d.has("a", 2) && d.has("a", void 0)) ||
             n(
                 l,
                 "has",
                 function has(t) {
                     var e = arguments.length,
                         i = e < 2 ? void 0 : arguments[1];
                     if (e && void 0 === i) return c(this, t);
                     var n = h(this, t);
                     a(e, 1);
                     for (var s = r(i), o = 0; o < n.length; ) if (n[o++] === s) return !0;
                     return !1;
                 },
                 { enumerable: !0, unsafe: !0 }
             );
     },
     2202: (t, e, i) => {
         var n = i(940),
             s = i(8403),
             r = i(9691),
             a = URLSearchParams.prototype,
             o = s(a.forEach);
         n &&
             !("size" in a) &&
             r(a, "size", {
                 get: function size() {
                     var t = 0;
                     o(this, function () {
                         t++;
                     });
                     return t;
                 },
                 configurable: !0,
                 enumerable: !0,
             });
     },
     7640: (t, e, i) => {
         i.d(e, { AnnotationLayer: () => AnnotationLayer, FreeTextAnnotationElement: () => FreeTextAnnotationElement, InkAnnotationElement: () => InkAnnotationElement, StampAnnotationElement: () => StampAnnotationElement });
         i(4226), i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914), i(7944), i(7121), i(8497);
         var n = i(3266),
             s = i(473),
             r = i(4780);
         function makeColorComp(t) {
             return Math.floor(255 * Math.max(0, Math.min(1, t)))
                 .toString(16)
                 .padStart(2, "0");
         }
         function scaleAndClamp(t) {
             return Math.max(0, Math.min(255, 255 * t));
         }
         class ColorConverters {
             static CMYK_G(t) {
                 let [e, i, n, s] = t;
                 return ["G", 1 - Math.min(1, 0.3 * e + 0.59 * n + 0.11 * i + s)];
             }
             static G_CMYK(t) {
                 let [e] = t;
                 return ["CMYK", 0, 0, 0, 1 - e];
             }
             static G_RGB(t) {
                 let [e] = t;
                 return ["RGB", e, e, e];
             }
             static G_rgb(t) {
                 let [e] = t;
                 e = scaleAndClamp(e);
                 return [e, e, e];
             }
             static G_HTML(t) {
                 let [e] = t;
                 const i = makeColorComp(e);
                 return `#${i}${i}${i}`;
             }
             static RGB_G(t) {
                 let [e, i, n] = t;
                 return ["G", 0.3 * e + 0.59 * i + 0.11 * n];
             }
             static RGB_rgb(t) {
                 return t.map(scaleAndClamp);
             }
             static RGB_HTML(t) {
                 return `#${t.map(makeColorComp).join("")}`;
             }
             static T_HTML() {
                 return "#00000000";
             }
             static T_rgb() {
                 return [null];
             }
             static CMYK_RGB(t) {
                 let [e, i, n, s] = t;
                 return ["RGB", 1 - Math.min(1, e + s), 1 - Math.min(1, n + s), 1 - Math.min(1, i + s)];
             }
             static CMYK_rgb(t) {
                 let [e, i, n, s] = t;
                 return [scaleAndClamp(1 - Math.min(1, e + s)), scaleAndClamp(1 - Math.min(1, n + s)), scaleAndClamp(1 - Math.min(1, i + s))];
             }
             static CMYK_HTML(t) {
                 const e = this.CMYK_RGB(t).slice(1);
                 return this.RGB_HTML(e);
             }
             static RGB_CMYK(t) {
                 let [e, i, n] = t;
                 const s = 1 - e,
                     r = 1 - i,
                     a = 1 - n;
                 return ["CMYK", s, r, a, Math.min(s, r, a)];
             }
         }
         var a = i(8266);
         const o = 1e3,
             l = new WeakSet();
         function getRectDims(t) {
             return { width: t[2] - t[0], height: t[3] - t[1] };
         }
         class AnnotationElementFactory {
             static create(t) {
                 switch (t.data.annotationType) {
                     case n.AnnotationType.LINK:
                         return new LinkAnnotationElement(t);
                     case n.AnnotationType.TEXT:
                         return new TextAnnotationElement(t);
                     case n.AnnotationType.WIDGET:
                         switch (t.data.fieldType) {
                             case "Tx":
                                 return new TextWidgetAnnotationElement(t);
                             case "Btn":
                                 return t.data.radioButton ? new RadioButtonWidgetAnnotationElement(t) : t.data.checkBox ? new CheckboxWidgetAnnotationElement(t) : new PushButtonWidgetAnnotationElement(t);
                             case "Ch":
                                 return new ChoiceWidgetAnnotationElement(t);
                             case "Sig":
                                 return new SignatureWidgetAnnotationElement(t);
                         }
                         return new WidgetAnnotationElement(t);
                     case n.AnnotationType.POPUP:
                         return new PopupAnnotationElement(t);
                     case n.AnnotationType.FREETEXT:
                         return new FreeTextAnnotationElement(t);
                     case n.AnnotationType.LINE:
                         return new LineAnnotationElement(t);
                     case n.AnnotationType.SQUARE:
                         return new SquareAnnotationElement(t);
                     case n.AnnotationType.CIRCLE:
                         return new CircleAnnotationElement(t);
                     case n.AnnotationType.POLYLINE:
                         return new PolylineAnnotationElement(t);
                     case n.AnnotationType.CARET:
                         return new CaretAnnotationElement(t);
                     case n.AnnotationType.INK:
                         return new InkAnnotationElement(t);
                     case n.AnnotationType.POLYGON:
                         return new PolygonAnnotationElement(t);
                     case n.AnnotationType.HIGHLIGHT:
                         return new HighlightAnnotationElement(t);
                     case n.AnnotationType.UNDERLINE:
                         return new UnderlineAnnotationElement(t);
                     case n.AnnotationType.SQUIGGLY:
                         return new SquigglyAnnotationElement(t);
                     case n.AnnotationType.STRIKEOUT:
                         return new StrikeOutAnnotationElement(t);
                     case n.AnnotationType.STAMP:
                         return new StampAnnotationElement(t);
                     case n.AnnotationType.FILEATTACHMENT:
                         return new FileAttachmentAnnotationElement(t);
                     default:
                         return new AnnotationElement(t);
                 }
             }
         }
         class AnnotationElement {
             #t = !1;
             constructor(t) {
                 let { isRenderable: e = !1, ignoreBorder: i = !1, createQuadrilaterals: n = !1 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                 this.isRenderable = e;
                 this.data = t.data;
                 this.layer = t.layer;
                 this.linkService = t.linkService;
                 this.downloadManager = t.downloadManager;
                 this.imageResourcesPath = t.imageResourcesPath;
                 this.renderForms = t.renderForms;
                 this.svgFactory = t.svgFactory;
                 this.annotationStorage = t.annotationStorage;
                 this.enableScripting = t.enableScripting;
                 this.hasJSActions = t.hasJSActions;
                 this._fieldObjects = t.fieldObjects;
                 this.parent = t.parent;
                 e && (this.container = this._createContainer(i));
                 n && this._createQuadrilaterals();
             }
             static _hasPopupData(t) {
                 let { titleObj: e, contentsObj: i, richText: n } = t;
                 return !!(e?.str || i?.str || n?.str);
             }
             get hasPopupData() {
                 return AnnotationElement._hasPopupData(this.data);
             }
             _createContainer(t) {
                 const {
                         data: e,
                         parent: { page: i, viewport: s },
                     } = this,
                     r = document.createElement("section");
                 r.setAttribute("data-annotation-id", e.id);
                 this instanceof WidgetAnnotationElement || (r.tabIndex = o);
                 r.style.zIndex = this.parent.zIndex++;
                 this.data.popupRef && r.setAttribute("aria-haspopup", "dialog");
                 e.noRotate && r.classList.add("norotate");
                 const { pageWidth: a, pageHeight: l, pageX: h, pageY: c } = s.rawDims;
                 if (!e.rect || this instanceof PopupAnnotationElement) {
                     const { rotation: t } = e;
                     e.hasOwnCanvas || 0 === t || this.setRotation(t, r);
                     return r;
                 }
                 const { width: d, height: u } = getRectDims(e.rect),
                     p = n.Util.normalizeRect([e.rect[0], i.view[3] - e.rect[1] + i.view[1], e.rect[2], i.view[3] - e.rect[3] + i.view[1]]);
                 if (!t && e.borderStyle.width > 0) {
                     r.style.borderWidth = `${e.borderStyle.width}px`;
                     const t = e.borderStyle.horizontalCornerRadius,
                         i = e.borderStyle.verticalCornerRadius;
                     if (t > 0 || i > 0) {
                         const e = `calc(${t}px * var(--scale-factor)) / calc(${i}px * var(--scale-factor))`;
                         r.style.borderRadius = e;
                     } else if (this instanceof RadioButtonWidgetAnnotationElement) {
                         const t = `calc(${d}px * var(--scale-factor)) / calc(${u}px * var(--scale-factor))`;
                         r.style.borderRadius = t;
                     }
                     switch (e.borderStyle.style) {
                         case n.AnnotationBorderStyleType.SOLID:
                             r.style.borderStyle = "solid";
                             break;
                         case n.AnnotationBorderStyleType.DASHED:
                             r.style.borderStyle = "dashed";
                             break;
                         case n.AnnotationBorderStyleType.BEVELED:
                             (0, n.warn)("Unimplemented border style: beveled");
                             break;
                         case n.AnnotationBorderStyleType.INSET:
                             (0, n.warn)("Unimplemented border style: inset");
                             break;
                         case n.AnnotationBorderStyleType.UNDERLINE:
                             r.style.borderBottomStyle = "solid";
                     }
                     const s = e.borderColor || null;
                     if (s) {
                         this.#t = !0;
                         r.style.borderColor = n.Util.makeHexColor(0 | s[0], 0 | s[1], 0 | s[2]);
                     } else r.style.borderWidth = 0;
                 }
                 r.style.left = (100 * (p[0] - h)) / a + "%";
                 r.style.top = (100 * (p[1] - c)) / l + "%";
                 const { rotation: g } = e;
                 if (e.hasOwnCanvas || 0 === g) {
                     r.style.width = (100 * d) / a + "%";
                     r.style.height = (100 * u) / l + "%";
                 } else this.setRotation(g, r);
                 return r;
             }
             setRotation(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.container;
                 if (!this.data.rect) return;
                 const { pageWidth: i, pageHeight: n } = this.parent.viewport.rawDims,
                     { width: s, height: r } = getRectDims(this.data.rect);
                 let a, o;
                 if (t % 180 == 0) {
                     a = (100 * s) / i;
                     o = (100 * r) / n;
                 } else {
                     a = (100 * r) / i;
                     o = (100 * s) / n;
                 }
                 e.style.width = `${a}%`;
                 e.style.height = `${o}%`;
                 e.setAttribute("data-main-rotation", (360 - t) % 360);
             }
             get _commonActions() {
                 const setColor = (t, e, i) => {
                     const n = i.detail[t],
                         s = n[0],
                         r = n.slice(1);
                     i.target.style[e] = ColorConverters[`${s}_HTML`](r);
                     this.annotationStorage.setValue(this.data.id, { [e]: ColorConverters[`${s}_rgb`](r) });
                 };
                 return (0, n.shadow)(this, "_commonActions", {
                     display: (t) => {
                         const { display: e } = t.detail,
                             i = e % 2 == 1;
                         this.container.style.visibility = i ? "hidden" : "visible";
                         this.annotationStorage.setValue(this.data.id, { noView: i, noPrint: 1 === e || 2 === e });
                     },
                     print: (t) => {
                         this.annotationStorage.setValue(this.data.id, { noPrint: !t.detail.print });
                     },
                     hidden: (t) => {
                         const { hidden: e } = t.detail;
                         this.container.style.visibility = e ? "hidden" : "visible";
                         this.annotationStorage.setValue(this.data.id, { noPrint: e, noView: e });
                     },
                     focus: (t) => {
                         setTimeout(() => t.target.focus({ preventScroll: !1 }), 0);
                     },
                     userName: (t) => {
                         t.target.title = t.detail.userName;
                     },
                     readonly: (t) => {
                         t.target.disabled = t.detail.readonly;
                     },
                     required: (t) => {
                         this._setRequired(t.target, t.detail.required);
                     },
                     bgColor: (t) => {
                         setColor("bgColor", "backgroundColor", t);
                     },
                     fillColor: (t) => {
                         setColor("fillColor", "backgroundColor", t);
                     },
                     fgColor: (t) => {
                         setColor("fgColor", "color", t);
                     },
                     textColor: (t) => {
                         setColor("textColor", "color", t);
                     },
                     borderColor: (t) => {
                         setColor("borderColor", "borderColor", t);
                     },
                     strokeColor: (t) => {
                         setColor("strokeColor", "borderColor", t);
                     },
                     rotation: (t) => {
                         const e = t.detail.rotation;
                         this.setRotation(e);
                         this.annotationStorage.setValue(this.data.id, { rotation: e });
                     },
                 });
             }
             _dispatchEventFromSandbox(t, e) {
                 const i = this._commonActions;
                 for (const n of Object.keys(e.detail)) {
                     const s = t[n] || i[n];
                     s?.(e);
                 }
             }
             _setDefaultPropertiesFromJS(t) {
                 if (!this.enableScripting) return;
                 const e = this.annotationStorage.getRawValue(this.data.id);
                 if (!e) return;
                 const i = this._commonActions;
                 for (const [n, s] of Object.entries(e)) {
                     const r = i[n];
                     if (r) {
                         r({ detail: { [n]: s }, target: t });
                         delete e[n];
                     }
                 }
             }
             _createQuadrilaterals() {
                 if (!this.container) return;
                 const { quadPoints: t } = this.data;
                 if (!t) return;
                 const [e, i, n, s] = this.data.rect;
                 if (1 === t.length) {
                     const [, { x: r, y: a }, { x: o, y: l }] = t[0];
                     if (n === r && s === a && e === o && i === l) return;
                 }
                 const { style: r } = this.container;
                 let a;
                 if (this.#t) {
                     const { borderColor: t, borderWidth: e } = r;
                     r.borderWidth = 0;
                     a = ["url('data:image/svg+xml;utf8,", '<svg xmlns="http://www.w3.org/2000/svg"', ' preserveAspectRatio="none" viewBox="0 0 1 1">', `<g fill="transparent" stroke="${t}" stroke-width="${e}">`];
                     this.container.classList.add("hasBorder");
                 }
                 const o = n - e,
                     l = s - i,
                     { svgFactory: h } = this,
                     c = h.createElement("svg");
                 c.classList.add("quadrilateralsContainer");
                 c.setAttribute("width", 0);
                 c.setAttribute("height", 0);
                 const d = h.createElement("defs");
                 c.append(d);
                 const u = h.createElement("clipPath"),
                     p = `clippath_${this.data.id}`;
                 u.setAttribute("id", p);
                 u.setAttribute("clipPathUnits", "objectBoundingBox");
                 d.append(u);
                 for (const [, { x: i, y: n }, { x: r, y: c }] of t) {
                     const t = h.createElement("rect"),
                         d = (r - e) / o,
                         p = (s - n) / l,
                         g = (i - r) / o,
                         f = (n - c) / l;
                     t.setAttribute("x", d);
                     t.setAttribute("y", p);
                     t.setAttribute("width", g);
                     t.setAttribute("height", f);
                     u.append(t);
                     a?.push(`<rect vector-effect="non-scaling-stroke" x="${d}" y="${p}" width="${g}" height="${f}"/>`);
                 }
                 if (this.#t) {
                     a.push("</g></svg>')");
                     r.backgroundImage = a.join("");
                 }
                 this.container.append(c);
                 this.container.style.clipPath = `url(#${p})`;
             }
             _createPopup() {
                 const { container: t, data: e } = this;
                 t.setAttribute("aria-haspopup", "dialog");
                 const i = new PopupAnnotationElement({
                     data: { color: e.color, titleObj: e.titleObj, modificationDate: e.modificationDate, contentsObj: e.contentsObj, richText: e.richText, parentRect: e.rect, borderStyle: 0, id: `popup_${e.id}`, rotation: e.rotation },
                     parent: this.parent,
                     elements: [this],
                 });
                 this.parent.div.append(i.render());
             }
             render() {
                 (0, n.unreachable)("Abstract method `AnnotationElement.render` called");
             }
             _getElementsByName(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 const i = [];
                 if (this._fieldObjects) {
                     const s = this._fieldObjects[t];
                     if (s)
                         for (const { page: t, id: r, exportValues: a } of s) {
                             if (-1 === t) continue;
                             if (r === e) continue;
                             const s = "string" == typeof a ? a : null,
                                 o = document.querySelector(`[data-element-id="${r}"]`);
                             !o || l.has(o) ? i.push({ id: r, exportValue: s, domElement: o }) : (0, n.warn)(`_getElementsByName - element not allowed: ${r}`);
                         }
                     return i;
                 }
                 for (const n of document.getElementsByName(t)) {
                     const { exportValue: t } = n,
                         s = n.getAttribute("data-element-id");
                     s !== e && l.has(n) && i.push({ id: s, exportValue: t, domElement: n });
                 }
                 return i;
             }
             show() {
                 this.container && (this.container.hidden = !1);
                 this.popup?.maybeShow();
             }
             hide() {
                 this.container && (this.container.hidden = !0);
                 this.popup?.forceHide();
             }
             getElementsToTriggerPopup() {
                 return this.container;
             }
             addHighlightArea() {
                 const t = this.getElementsToTriggerPopup();
                 if (Array.isArray(t)) for (const e of t) e.classList.add("highlightArea");
                 else t.classList.add("highlightArea");
             }
             get _isEditable() {
                 return !1;
             }
             _editOnDoubleClick() {
                 if (!this._isEditable) return;
                 const {
                     annotationEditorType: t,
                     data: { id: e },
                 } = this;
                 this.container.addEventListener("dblclick", () => {
                     this.linkService.eventBus?.dispatch("switchannotationeditormode", { source: this, mode: t, editId: e });
                 });
             }
         }
         class LinkAnnotationElement extends AnnotationElement {
             constructor(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 super(t, { isRenderable: !0, ignoreBorder: !!e?.ignoreBorder, createQuadrilaterals: !0 });
                 this.isTooltipOnly = t.data.isTooltipOnly;
             }
             render() {
                 const { data: t, linkService: e } = this,
                     i = document.createElement("a");
                 i.setAttribute("data-element-id", t.id);
                 let n = !1;
                 if (t.url) {
                     e.addLinkAttributes(i, t.url, t.newWindow);
                     n = !0;
                 } else if (t.action) {
                     this._bindNamedAction(i, t.action);
                     n = !0;
                 } else if (t.attachment) {
                     this.#e(i, t.attachment, t.attachmentDest);
                     n = !0;
                 } else if (t.setOCGState) {
                     this.#i(i, t.setOCGState);
                     n = !0;
                 } else if (t.dest) {
                     this._bindLink(i, t.dest);
                     n = !0;
                 } else {
                     if (t.actions && (t.actions.Action || t.actions["Mouse Up"] || t.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
                         this._bindJSAction(i, t);
                         n = !0;
                     }
                     if (t.resetForm) {
                         this._bindResetFormAction(i, t.resetForm);
                         n = !0;
                     } else if (this.isTooltipOnly && !n) {
                         this._bindLink(i, "");
                         n = !0;
                     }
                 }
                 this.container.classList.add("linkAnnotation");
                 n && this.container.append(i);
                 return this.container;
             }
             #n() {
                 this.container.setAttribute("data-internal-link", "");
             }
             _bindLink(t, e) {
                 t.href = this.linkService.getDestinationHash(e);
                 t.onclick = () => {
                     e && this.linkService.goToDestination(e);
                     return !1;
                 };
                 (e || "" === e) && this.#n();
             }
             _bindNamedAction(t, e) {
                 t.href = this.linkService.getAnchorUrl("");
                 t.onclick = () => {
                     this.linkService.executeNamedAction(e);
                     return !1;
                 };
                 this.#n();
             }
             #e(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                 t.href = this.linkService.getAnchorUrl("");
                 t.onclick = () => {
                     this.downloadManager?.openOrDownloadData(e.content, e.filename, i);
                     return !1;
                 };
                 this.#n();
             }
             #i(t, e) {
                 t.href = this.linkService.getAnchorUrl("");
                 t.onclick = () => {
                     this.linkService.executeSetOCGState(e);
                     return !1;
                 };
                 this.#n();
             }
             _bindJSAction(t, e) {
                 t.href = this.linkService.getAnchorUrl("");
                 const i = new Map([
                     ["Action", "onclick"],
                     ["Mouse Up", "onmouseup"],
                     ["Mouse Down", "onmousedown"],
                 ]);
                 for (const n of Object.keys(e.actions)) {
                     const s = i.get(n);
                     s &&
                         (t[s] = () => {
                             this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: e.id, name: n } });
                             return !1;
                         });
                 }
                 t.onclick || (t.onclick = () => !1);
                 this.#n();
             }
             _bindResetFormAction(t, e) {
                 const i = t.onclick;
                 i || (t.href = this.linkService.getAnchorUrl(""));
                 this.#n();
                 if (this._fieldObjects)
                     t.onclick = () => {
                         i?.();
                         const { fields: t, refs: s, include: r } = e,
                             a = [];
                         if (0 !== t.length || 0 !== s.length) {
                             const e = new Set(s);
                             for (const i of t) {
                                 const t = this._fieldObjects[i] || [];
                                 for (const { id: i } of t) e.add(i);
                             }
                             for (const t of Object.values(this._fieldObjects)) for (const i of t) e.has(i.id) === r && a.push(i);
                         } else for (const t of Object.values(this._fieldObjects)) a.push(...t);
                         const o = this.annotationStorage,
                             h = [];
                         for (const t of a) {
                             const { id: e } = t;
                             h.push(e);
                             switch (t.type) {
                                 case "text": {
                                     const i = t.defaultValue || "";
                                     o.setValue(e, { value: i });
                                     break;
                                 }
                                 case "checkbox":
                                 case "radiobutton": {
                                     const i = t.defaultValue === t.exportValues;
                                     o.setValue(e, { value: i });
                                     break;
                                 }
                                 case "combobox":
                                 case "listbox": {
                                     const i = t.defaultValue || "";
                                     o.setValue(e, { value: i });
                                     break;
                                 }
                                 default:
                                     continue;
                             }
                             const i = document.querySelector(`[data-element-id="${e}"]`);
                             i && (l.has(i) ? i.dispatchEvent(new Event("resetform")) : (0, n.warn)(`_bindResetFormAction - element not allowed: ${e}`));
                         }
                         this.enableScripting && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: "app", ids: h, name: "ResetForm" } });
                         return !1;
                     };
                 else {
                     (0, n.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.');
                     i || (t.onclick = () => !1);
                 }
             }
         }
         class TextAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0 });
             }
             render() {
                 this.container.classList.add("textAnnotation");
                 const t = document.createElement("img");
                 t.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
                 t.setAttribute("data-l10n-id", "pdfjs-text-annotation-type");
                 t.setAttribute("data-l10n-args", JSON.stringify({ type: this.data.name }));
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this.container.append(t);
                 return this.container;
             }
         }
         class WidgetAnnotationElement extends AnnotationElement {
             render() {
                 this.data.alternativeText && (this.container.title = this.data.alternativeText);
                 return this.container;
             }
             showElementAndHideCanvas(t) {
                 if (this.data.hasOwnCanvas) {
                     "CANVAS" === t.previousSibling?.nodeName && (t.previousSibling.hidden = !0);
                     t.hidden = !1;
                 }
             }
             _getKeyModifier(t) {
                 return n.FeatureTest.platform.isMac ? t.metaKey : t.ctrlKey;
             }
             _setEventListener(t, e, i, n, s) {
                 i.includes("mouse")
                     ? t.addEventListener(i, (t) => {
                           this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: this.data.id, name: n, value: s(t), shift: t.shiftKey, modifier: this._getKeyModifier(t) } });
                       })
                     : t.addEventListener(i, (t) => {
                           if ("blur" === i) {
                               if (!e.focused || !t.relatedTarget) return;
                               e.focused = !1;
                           } else if ("focus" === i) {
                               if (e.focused) return;
                               e.focused = !0;
                           }
                           s && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: this.data.id, name: n, value: s(t) } });
                       });
             }
             _setEventListeners(t, e, i, n) {
                 for (const [s, r] of i)
                     if ("Action" === r || this.data.actions?.[r]) {
                         ("Focus" !== r && "Blur" !== r) || (e ||= { focused: !1 });
                         this._setEventListener(t, e, s, r, n);
                         "Focus" !== r || this.data.actions?.Blur ? "Blur" !== r || this.data.actions?.Focus || this._setEventListener(t, e, "focus", "Focus", null) : this._setEventListener(t, e, "blur", "Blur", null);
                     }
             }
             _setBackgroundColor(t) {
                 const e = this.data.backgroundColor || null;
                 t.style.backgroundColor = null === e ? "transparent" : n.Util.makeHexColor(e[0], e[1], e[2]);
             }
             _setTextStyle(t) {
                 const e = ["left", "center", "right"],
                     { fontColor: i } = this.data.defaultAppearanceData,
                     s = this.data.defaultAppearanceData.fontSize || 9,
                     r = t.style;
                 let a;
                 const roundToOneDecimal = (t) => Math.round(10 * t) / 10;
                 if (this.data.multiLine) {
                     const t = Math.abs(this.data.rect[3] - this.data.rect[1] - 2),
                         e = t / (Math.round(t / (n.LINE_FACTOR * s)) || 1);
                     a = Math.min(s, roundToOneDecimal(e / n.LINE_FACTOR));
                 } else {
                     const t = Math.abs(this.data.rect[3] - this.data.rect[1] - 2);
                     a = Math.min(s, roundToOneDecimal(t / n.LINE_FACTOR));
                 }
                 r.fontSize = `calc(${a}px * var(--scale-factor))`;
                 r.color = n.Util.makeHexColor(i[0], i[1], i[2]);
                 null !== this.data.textAlignment && (r.textAlign = e[this.data.textAlignment]);
             }
             _setRequired(t, e) {
                 e ? t.setAttribute("required", !0) : t.removeAttribute("required");
                 t.setAttribute("aria-required", e);
             }
         }
         class TextWidgetAnnotationElement extends WidgetAnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: t.renderForms || t.data.hasOwnCanvas || (!t.data.hasAppearance && !!t.data.fieldValue) });
             }
             setPropertyOnSiblings(t, e, i, n) {
                 const s = this.annotationStorage;
                 for (const r of this._getElementsByName(t.name, t.id)) {
                     r.domElement && (r.domElement[e] = i);
                     s.setValue(r.id, { [n]: i });
                 }
             }
             render() {
                 const t = this.annotationStorage,
                     e = this.data.id;
                 this.container.classList.add("textWidgetAnnotation");
                 let i = null;
                 if (this.renderForms) {
                     const n = t.getValue(e, { value: this.data.fieldValue });
                     let s = n.value || "";
                     const r = t.getValue(e, { charLimit: this.data.maxLen }).charLimit;
                     r && s.length > r && (s = s.slice(0, r));
                     let a = n.formattedValue || this.data.textContent?.join("\n") || null;
                     a && this.data.comb && (a = a.replaceAll(/\s+/g, ""));
                     const h = { userValue: s, formattedValue: a, lastCommittedValue: null, commitKey: 1, focused: !1 };
                     if (this.data.multiLine) {
                         i = document.createElement("textarea");
                         i.textContent = a ?? s;
                         this.data.doNotScroll && (i.style.overflowY = "hidden");
                     } else {
                         i = document.createElement("input");
                         i.type = "text";
                         i.setAttribute("value", a ?? s);
                         this.data.doNotScroll && (i.style.overflowX = "hidden");
                     }
                     this.data.hasOwnCanvas && (i.hidden = !0);
                     l.add(i);
                     i.setAttribute("data-element-id", e);
                     i.disabled = this.data.readOnly;
                     i.name = this.data.fieldName;
                     i.tabIndex = o;
                     this._setRequired(i, this.data.required);
                     r && (i.maxLength = r);
                     i.addEventListener("input", (n) => {
                         t.setValue(e, { value: n.target.value });
                         this.setPropertyOnSiblings(i, "value", n.target.value, "value");
                         h.formattedValue = null;
                     });
                     i.addEventListener("resetform", (t) => {
                         const e = this.data.defaultFieldValue ?? "";
                         i.value = h.userValue = e;
                         h.formattedValue = null;
                     });
                     let blurListener = (t) => {
                         const { formattedValue: e } = h;
                         null != e && (t.target.value = e);
                         t.target.scrollLeft = 0;
                     };
                     if (this.enableScripting && this.hasJSActions) {
                         i.addEventListener("focus", (t) => {
                             if (h.focused) return;
                             const { target: e } = t;
                             h.userValue && (e.value = h.userValue);
                             h.lastCommittedValue = e.value;
                             h.commitKey = 1;
                             this.data.actions?.Focus || (h.focused = !0);
                         });
                         i.addEventListener("updatefromsandbox", (i) => {
                             this.showElementAndHideCanvas(i.target);
                             const n = {
                                 value(i) {
                                     h.userValue = i.detail.value ?? "";
                                     t.setValue(e, { value: h.userValue.toString() });
                                     i.target.value = h.userValue;
                                 },
                                 formattedValue(i) {
                                     const { formattedValue: n } = i.detail;
                                     h.formattedValue = n;
                                     null != n && i.target !== document.activeElement && (i.target.value = n);
                                     t.setValue(e, { formattedValue: n });
                                 },
                                 selRange(t) {
                                     t.target.setSelectionRange(...t.detail.selRange);
                                 },
                                 charLimit: (i) => {
                                     const { charLimit: n } = i.detail,
                                         { target: s } = i;
                                     if (0 === n) {
                                         s.removeAttribute("maxLength");
                                         return;
                                     }
                                     s.setAttribute("maxLength", n);
                                     let r = h.userValue;
                                     if (r && !(r.length <= n)) {
                                         r = r.slice(0, n);
                                         s.value = h.userValue = r;
                                         t.setValue(e, { value: r });
                                         this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                                             source: this,
                                             detail: { id: e, name: "Keystroke", value: r, willCommit: !0, commitKey: 1, selStart: s.selectionStart, selEnd: s.selectionEnd },
                                         });
                                     }
                                 },
                             };
                             this._dispatchEventFromSandbox(n, i);
                         });
                         i.addEventListener("keydown", (t) => {
                             h.commitKey = 1;
                             let i = -1;
                             "Escape" === t.key ? (i = 0) : "Enter" !== t.key || this.data.multiLine ? "Tab" === t.key && (h.commitKey = 3) : (i = 2);
                             if (-1 === i) return;
                             const { value: n } = t.target;
                             if (h.lastCommittedValue !== n) {
                                 h.lastCommittedValue = n;
                                 h.userValue = n;
                                 this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                                     source: this,
                                     detail: { id: e, name: "Keystroke", value: n, willCommit: !0, commitKey: i, selStart: t.target.selectionStart, selEnd: t.target.selectionEnd },
                                 });
                             }
                         });
                         const n = blurListener;
                         blurListener = null;
                         i.addEventListener("blur", (t) => {
                             if (!h.focused || !t.relatedTarget) return;
                             this.data.actions?.Blur || (h.focused = !1);
                             const { value: i } = t.target;
                             h.userValue = i;
                             h.lastCommittedValue !== i &&
                                 this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                                     source: this,
                                     detail: { id: e, name: "Keystroke", value: i, willCommit: !0, commitKey: h.commitKey, selStart: t.target.selectionStart, selEnd: t.target.selectionEnd },
                                 });
                             n(t);
                         });
                         this.data.actions?.Keystroke &&
                             i.addEventListener("beforeinput", (t) => {
                                 h.lastCommittedValue = null;
                                 const { data: i, target: n } = t,
                                     { value: s, selectionStart: r, selectionEnd: a } = n;
                                 let o = r,
                                     l = a;
                                 switch (t.inputType) {
                                     case "deleteWordBackward": {
                                         const t = s.substring(0, r).match(/\w*[^\w]*$/);
                                         t && (o -= t[0].length);
                                         break;
                                     }
                                     case "deleteWordForward": {
                                         const t = s.substring(r).match(/^[^\w]*\w*/);
                                         t && (l += t[0].length);
                                         break;
                                     }
                                     case "deleteContentBackward":
                                         r === a && (o -= 1);
                                         break;
                                     case "deleteContentForward":
                                         r === a && (l += 1);
                                 }
                                 t.preventDefault();
                                 this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: e, name: "Keystroke", value: s, change: i || "", willCommit: !1, selStart: o, selEnd: l } });
                             });
                         this._setEventListeners(
                             i,
                             h,
                             [
                                 ["focus", "Focus"],
                                 ["blur", "Blur"],
                                 ["mousedown", "Mouse Down"],
                                 ["mouseenter", "Mouse Enter"],
                                 ["mouseleave", "Mouse Exit"],
                                 ["mouseup", "Mouse Up"],
                             ],
                             (t) => t.target.value
                         );
                     }
                     blurListener && i.addEventListener("blur", blurListener);
                     if (this.data.comb) {
                         const t = (this.data.rect[2] - this.data.rect[0]) / r;
                         i.classList.add("comb");
                         i.style.letterSpacing = `calc(${t}px * var(--scale-factor) - 1ch)`;
                     }
                 } else {
                     i = document.createElement("div");
                     i.textContent = this.data.fieldValue;
                     i.style.verticalAlign = "middle";
                     i.style.display = "table-cell";
                     this.data.hasOwnCanvas && (i.hidden = !0);
                 }
                 this._setTextStyle(i);
                 this._setBackgroundColor(i);
                 this._setDefaultPropertiesFromJS(i);
                 this.container.append(i);
                 return this.container;
             }
         }
         class SignatureWidgetAnnotationElement extends WidgetAnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !!t.data.hasOwnCanvas });
             }
         }
         class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: t.renderForms });
             }
             render() {
                 const t = this.annotationStorage,
                     e = this.data,
                     i = e.id;
                 let n = t.getValue(i, { value: e.exportValue === e.fieldValue }).value;
                 if ("string" == typeof n) {
                     n = "Off" !== n;
                     t.setValue(i, { value: n });
                 }
                 this.container.classList.add("buttonWidgetAnnotation", "checkBox");
                 const s = document.createElement("input");
                 l.add(s);
                 s.setAttribute("data-element-id", i);
                 s.disabled = e.readOnly;
                 this._setRequired(s, this.data.required);
                 s.type = "checkbox";
                 s.name = e.fieldName;
                 n && s.setAttribute("checked", !0);
                 s.setAttribute("exportValue", e.exportValue);
                 s.tabIndex = o;
                 s.addEventListener("change", (n) => {
                     const { name: s, checked: r } = n.target;
                     for (const n of this._getElementsByName(s, i)) {
                         const i = r && n.exportValue === e.exportValue;
                         n.domElement && (n.domElement.checked = i);
                         t.setValue(n.id, { value: i });
                     }
                     t.setValue(i, { value: r });
                 });
                 s.addEventListener("resetform", (t) => {
                     const i = e.defaultFieldValue || "Off";
                     t.target.checked = i === e.exportValue;
                 });
                 if (this.enableScripting && this.hasJSActions) {
                     s.addEventListener("updatefromsandbox", (e) => {
                         const n = {
                             value(e) {
                                 e.target.checked = "Off" !== e.detail.value;
                                 t.setValue(i, { value: e.target.checked });
                             },
                         };
                         this._dispatchEventFromSandbox(n, e);
                     });
                     this._setEventListeners(
                         s,
                         null,
                         [
                             ["change", "Validate"],
                             ["change", "Action"],
                             ["focus", "Focus"],
                             ["blur", "Blur"],
                             ["mousedown", "Mouse Down"],
                             ["mouseenter", "Mouse Enter"],
                             ["mouseleave", "Mouse Exit"],
                             ["mouseup", "Mouse Up"],
                         ],
                         (t) => t.target.checked
                     );
                 }
                 this._setBackgroundColor(s);
                 this._setDefaultPropertiesFromJS(s);
                 this.container.append(s);
                 return this.container;
             }
         }
         class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: t.renderForms });
             }
             render() {
                 this.container.classList.add("buttonWidgetAnnotation", "radioButton");
                 const t = this.annotationStorage,
                     e = this.data,
                     i = e.id;
                 let n = t.getValue(i, { value: e.fieldValue === e.buttonValue }).value;
                 if ("string" == typeof n) {
                     n = n !== e.buttonValue;
                     t.setValue(i, { value: n });
                 }
                 if (n) for (const n of this._getElementsByName(e.fieldName, i)) t.setValue(n.id, { value: !1 });
                 const s = document.createElement("input");
                 l.add(s);
                 s.setAttribute("data-element-id", i);
                 s.disabled = e.readOnly;
                 this._setRequired(s, this.data.required);
                 s.type = "radio";
                 s.name = e.fieldName;
                 n && s.setAttribute("checked", !0);
                 s.tabIndex = o;
                 s.addEventListener("change", (e) => {
                     const { name: n, checked: s } = e.target;
                     for (const e of this._getElementsByName(n, i)) t.setValue(e.id, { value: !1 });
                     t.setValue(i, { value: s });
                 });
                 s.addEventListener("resetform", (t) => {
                     const i = e.defaultFieldValue;
                     t.target.checked = null != i && i === e.buttonValue;
                 });
                 if (this.enableScripting && this.hasJSActions) {
                     const n = e.buttonValue;
                     s.addEventListener("updatefromsandbox", (e) => {
                         const s = {
                             value: (e) => {
                                 const s = n === e.detail.value;
                                 for (const n of this._getElementsByName(e.target.name)) {
                                     const e = s && n.id === i;
                                     n.domElement && (n.domElement.checked = e);
                                     t.setValue(n.id, { value: e });
                                 }
                             },
                         };
                         this._dispatchEventFromSandbox(s, e);
                     });
                     this._setEventListeners(
                         s,
                         null,
                         [
                             ["change", "Validate"],
                             ["change", "Action"],
                             ["focus", "Focus"],
                             ["blur", "Blur"],
                             ["mousedown", "Mouse Down"],
                             ["mouseenter", "Mouse Enter"],
                             ["mouseleave", "Mouse Exit"],
                             ["mouseup", "Mouse Up"],
                         ],
                         (t) => t.target.checked
                     );
                 }
                 this._setBackgroundColor(s);
                 this._setDefaultPropertiesFromJS(s);
                 this.container.append(s);
                 return this.container;
             }
         }
         class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
             constructor(t) {
                 super(t, { ignoreBorder: t.data.hasAppearance });
             }
             render() {
                 const t = super.render();
                 t.classList.add("buttonWidgetAnnotation", "pushButton");
                 this.data.alternativeText && (t.title = this.data.alternativeText);
                 const e = t.lastChild;
                 if (this.enableScripting && this.hasJSActions && e) {
                     this._setDefaultPropertiesFromJS(e);
                     e.addEventListener("updatefromsandbox", (t) => {
                         this._dispatchEventFromSandbox({}, t);
                     });
                 }
                 return t;
             }
         }
         class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: t.renderForms });
             }
             render() {
                 this.container.classList.add("choiceWidgetAnnotation");
                 const t = this.annotationStorage,
                     e = this.data.id,
                     i = t.getValue(e, { value: this.data.fieldValue }),
                     n = document.createElement("select");
                 l.add(n);
                 n.setAttribute("data-element-id", e);
                 n.disabled = this.data.readOnly;
                 this._setRequired(n, this.data.required);
                 n.name = this.data.fieldName;
                 n.tabIndex = o;
                 let s = this.data.combo && this.data.options.length > 0;
                 if (!this.data.combo) {
                     n.size = this.data.options.length;
                     this.data.multiSelect && (n.multiple = !0);
                 }
                 n.addEventListener("resetform", (t) => {
                     const e = this.data.defaultFieldValue;
                     for (const t of n.options) t.selected = t.value === e;
                 });
                 for (const t of this.data.options) {
                     const e = document.createElement("option");
                     e.textContent = t.displayValue;
                     e.value = t.exportValue;
                     if (i.value.includes(t.exportValue)) {
                         e.setAttribute("selected", !0);
                         s = !1;
                     }
                     n.append(e);
                 }
                 let r = null;
                 if (s) {
                     const t = document.createElement("option");
                     t.value = " ";
                     t.setAttribute("hidden", !0);
                     t.setAttribute("selected", !0);
                     n.prepend(t);
                     r = () => {
                         t.remove();
                         n.removeEventListener("input", r);
                         r = null;
                     };
                     n.addEventListener("input", r);
                 }
                 const getValue = (t) => {
                     const e = t ? "value" : "textContent",
                         { options: i, multiple: s } = n;
                     return s ? Array.prototype.filter.call(i, (t) => t.selected).map((t) => t[e]) : -1 === i.selectedIndex ? null : i[i.selectedIndex][e];
                 };
                 let a = getValue(!1);
                 const getItems = (t) => {
                     const e = t.target.options;
                     return Array.prototype.map.call(e, (t) => ({ displayValue: t.textContent, exportValue: t.value }));
                 };
                 if (this.enableScripting && this.hasJSActions) {
                     n.addEventListener("updatefromsandbox", (i) => {
                         const s = {
                             value(i) {
                                 r?.();
                                 const s = i.detail.value,
                                     o = new Set(Array.isArray(s) ? s : [s]);
                                 for (const t of n.options) t.selected = o.has(t.value);
                                 t.setValue(e, { value: getValue(!0) });
                                 a = getValue(!1);
                             },
                             multipleSelection(t) {
                                 n.multiple = !0;
                             },
                             remove(i) {
                                 const s = n.options,
                                     r = i.detail.remove;
                                 s[r].selected = !1;
                                 n.remove(r);
                                 if (s.length > 0) {
                                     -1 === Array.prototype.findIndex.call(s, (t) => t.selected) && (s[0].selected = !0);
                                 }
                                 t.setValue(e, { value: getValue(!0), items: getItems(i) });
                                 a = getValue(!1);
                             },
                             clear(i) {
                                 for (; 0 !== n.length; ) n.remove(0);
                                 t.setValue(e, { value: null, items: [] });
                                 a = getValue(!1);
                             },
                             insert(i) {
                                 const { index: s, displayValue: r, exportValue: o } = i.detail.insert,
                                     l = n.children[s],
                                     h = document.createElement("option");
                                 h.textContent = r;
                                 h.value = o;
                                 l ? l.before(h) : n.append(h);
                                 t.setValue(e, { value: getValue(!0), items: getItems(i) });
                                 a = getValue(!1);
                             },
                             items(i) {
                                 const { items: s } = i.detail;
                                 for (; 0 !== n.length; ) n.remove(0);
                                 for (const t of s) {
                                     const { displayValue: e, exportValue: i } = t,
                                         s = document.createElement("option");
                                     s.textContent = e;
                                     s.value = i;
                                     n.append(s);
                                 }
                                 n.options.length > 0 && (n.options[0].selected = !0);
                                 t.setValue(e, { value: getValue(!0), items: getItems(i) });
                                 a = getValue(!1);
                             },
                             indices(i) {
                                 const n = new Set(i.detail.indices);
                                 for (const t of i.target.options) t.selected = n.has(t.index);
                                 t.setValue(e, { value: getValue(!0) });
                                 a = getValue(!1);
                             },
                             editable(t) {
                                 t.target.disabled = !t.detail.editable;
                             },
                         };
                         this._dispatchEventFromSandbox(s, i);
                     });
                     n.addEventListener("input", (i) => {
                         const n = getValue(!0);
                         t.setValue(e, { value: n });
                         i.preventDefault();
                         this.linkService.eventBus?.dispatch("dispatcheventinsandbox", { source: this, detail: { id: e, name: "Keystroke", value: a, changeEx: n, willCommit: !1, commitKey: 1, keyDown: !1 } });
                     });
                     this._setEventListeners(
                         n,
                         null,
                         [
                             ["focus", "Focus"],
                             ["blur", "Blur"],
                             ["mousedown", "Mouse Down"],
                             ["mouseenter", "Mouse Enter"],
                             ["mouseleave", "Mouse Exit"],
                             ["mouseup", "Mouse Up"],
                             ["input", "Action"],
                             ["input", "Validate"],
                         ],
                         (t) => t.target.value
                     );
                 } else
                     n.addEventListener("input", function (i) {
                         t.setValue(e, { value: getValue(!0) });
                     });
                 this.data.combo && this._setTextStyle(n);
                 this._setBackgroundColor(n);
                 this._setDefaultPropertiesFromJS(n);
                 this.container.append(n);
                 return this.container;
             }
         }
         class PopupAnnotationElement extends AnnotationElement {
             constructor(t) {
                 const { data: e, elements: i } = t;
                 super(t, { isRenderable: AnnotationElement._hasPopupData(e) });
                 this.elements = i;
             }
             render() {
                 this.container.classList.add("popupAnnotation");
                 const t = new PopupElement({
                         container: this.container,
                         color: this.data.color,
                         titleObj: this.data.titleObj,
                         modificationDate: this.data.modificationDate,
                         contentsObj: this.data.contentsObj,
                         richText: this.data.richText,
                         rect: this.data.rect,
                         parentRect: this.data.parentRect || null,
                         parent: this.parent,
                         elements: this.elements,
                         open: this.data.open,
                     }),
                     e = [];
                 for (const i of this.elements) {
                     i.popup = t;
                     e.push(i.data.id);
                     i.addHighlightArea();
                 }
                 this.container.setAttribute("aria-controls", e.map((t) => `${n.AnnotationPrefix}${t}`).join(","));
                 return this.container;
             }
         }
         class PopupElement {
             #s = this.#r.bind(this);
             #a = this.#o.bind(this);
             #l = this.#h.bind(this);
             #c = this.#d.bind(this);
             #u = null;
             #p = null;
             #g = null;
             #f = null;
             #m = null;
             #v = null;
             #b = null;
             #y = !1;
             #A = null;
             #E = null;
             #w = null;
             #x = null;
             #_ = !1;
             constructor(t) {
                 let { container: e, color: i, elements: n, titleObj: r, modificationDate: a, contentsObj: o, richText: l, parent: h, rect: c, parentRect: d, open: u } = t;
                 this.#p = e;
                 this.#x = r;
                 this.#g = o;
                 this.#w = l;
                 this.#v = h;
                 this.#u = i;
                 this.#E = c;
                 this.#b = d;
                 this.#m = n;
                 this.#f = s.PDFDateString.toDateObject(a);
                 this.trigger = n.flatMap((t) => t.getElementsToTriggerPopup());
                 for (const t of this.trigger) {
                     t.addEventListener("click", this.#c);
                     t.addEventListener("mouseenter", this.#l);
                     t.addEventListener("mouseleave", this.#a);
                     t.classList.add("popupTriggerArea");
                 }
                 for (const t of n) t.container?.addEventListener("keydown", this.#s);
                 this.#p.hidden = !0;
                 u && this.#d();
             }
             render() {
                 if (this.#A) return;
                 const {
                         page: { view: t },
                         viewport: {
                             rawDims: { pageWidth: e, pageHeight: i, pageX: s, pageY: r },
                         },
                     } = this.#v,
                     o = (this.#A = document.createElement("div"));
                 o.className = "popup";
                 if (this.#u) {
                     const t = (o.style.outlineColor = n.Util.makeHexColor(...this.#u));
                     if (CSS.supports("background-color", "color-mix(in srgb, red 30%, white)")) o.style.backgroundColor = `color-mix(in srgb, ${t} 30%, white)`;
                     else {
                         const t = 0.7;
                         o.style.backgroundColor = n.Util.makeHexColor(...this.#u.map((e) => Math.floor(t * (255 - e) + e)));
                     }
                 }
                 const l = document.createElement("span");
                 l.className = "header";
                 const h = document.createElement("h1");
                 l.append(h);
                 ({ dir: h.dir, str: h.textContent } = this.#x);
                 o.append(l);
                 if (this.#f) {
                     const t = document.createElement("span");
                     t.classList.add("popupDate");
                     t.setAttribute("data-l10n-id", "pdfjs-annotation-date-string");
                     t.setAttribute("data-l10n-args", JSON.stringify({ date: this.#f.toLocaleDateString(), time: this.#f.toLocaleTimeString() }));
                     l.append(t);
                 }
                 const c = this.#g,
                     d = this.#w;
                 if (!d?.str || (c?.str && c.str !== d.str)) {
                     const t = this._formatContents(c);
                     o.append(t);
                 } else {
                     a.XfaLayer.render({ xfaHtml: d.html, intent: "richText", div: o });
                     o.lastChild.classList.add("richText", "popupContent");
                 }
                 let u = !!this.#b,
                     p = u ? this.#b : this.#E;
                 for (const t of this.#m)
                     if (!p || null !== n.Util.intersect(t.data.rect, p)) {
                         p = t.data.rect;
                         u = !0;
                         break;
                     }
                 const g = n.Util.normalizeRect([p[0], t[3] - p[1] + t[1], p[2], t[3] - p[3] + t[1]]),
                     f = u ? p[2] - p[0] + 5 : 0,
                     m = g[0] + f,
                     v = g[1],
                     { style: b } = this.#p;
                 b.left = (100 * (m - s)) / e + "%";
                 b.top = (100 * (v - r)) / i + "%";
                 this.#p.append(o);
             }
             _formatContents(t) {
                 let { str: e, dir: i } = t;
                 const n = document.createElement("p");
                 n.classList.add("popupContent");
                 n.dir = i;
                 const s = e.split(/(?:\r\n?|\n)/);
                 for (let t = 0, e = s.length; t < e; ++t) {
                     const i = s[t];
                     n.append(document.createTextNode(i));
                     t < e - 1 && n.append(document.createElement("br"));
                 }
                 return n;
             }
             #r(t) {
                 t.altKey || t.shiftKey || t.ctrlKey || t.metaKey || (("Enter" === t.key || ("Escape" === t.key && this.#y)) && this.#d());
             }
             #d() {
                 this.#y = !this.#y;
                 if (this.#y) {
                     this.#h();
                     this.#p.addEventListener("click", this.#c);
                     this.#p.addEventListener("keydown", this.#s);
                 } else {
                     this.#o();
                     this.#p.removeEventListener("click", this.#c);
                     this.#p.removeEventListener("keydown", this.#s);
                 }
             }
             #h() {
                 this.#A || this.render();
                 if (this.isVisible) this.#y && this.#p.classList.add("focused");
                 else {
                     this.#p.hidden = !1;
                     this.#p.style.zIndex = parseInt(this.#p.style.zIndex) + 1e3;
                 }
             }
             #o() {
                 this.#p.classList.remove("focused");
                 if (!this.#y && this.isVisible) {
                     this.#p.hidden = !0;
                     this.#p.style.zIndex = parseInt(this.#p.style.zIndex) - 1e3;
                 }
             }
             forceHide() {
                 this.#_ = this.isVisible;
                 this.#_ && (this.#p.hidden = !0);
             }
             maybeShow() {
                 if (this.#_) {
                     this.#_ = !1;
                     this.#p.hidden = !1;
                 }
             }
             get isVisible() {
                 return !1 === this.#p.hidden;
             }
         }
         class FreeTextAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
                 this.textContent = t.data.textContent;
                 this.textPosition = t.data.textPosition;
                 this.annotationEditorType = n.AnnotationEditorType.FREETEXT;
             }
             render() {
                 this.container.classList.add("freeTextAnnotation");
                 if (this.textContent) {
                     const t = document.createElement("div");
                     t.classList.add("annotationTextContent");
                     t.setAttribute("role", "comment");
                     for (const e of this.textContent) {
                         const i = document.createElement("span");
                         i.textContent = e;
                         t.append(i);
                     }
                     this.container.append(t);
                 }
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this._editOnDoubleClick();
                 return this.container;
             }
             get _isEditable() {
                 return this.data.hasOwnCanvas;
             }
         }
         class LineAnnotationElement extends AnnotationElement {
             #S = null;
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
             }
             render() {
                 this.container.classList.add("lineAnnotation");
                 const t = this.data,
                     { width: e, height: i } = getRectDims(t.rect),
                     n = this.svgFactory.create(e, i, !0),
                     s = (this.#S = this.svgFactory.createElement("svg:line"));
                 s.setAttribute("x1", t.rect[2] - t.lineCoordinates[0]);
                 s.setAttribute("y1", t.rect[3] - t.lineCoordinates[1]);
                 s.setAttribute("x2", t.rect[2] - t.lineCoordinates[2]);
                 s.setAttribute("y2", t.rect[3] - t.lineCoordinates[3]);
                 s.setAttribute("stroke-width", t.borderStyle.width || 1);
                 s.setAttribute("stroke", "transparent");
                 s.setAttribute("fill", "transparent");
                 n.append(s);
                 this.container.append(n);
                 !t.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
             getElementsToTriggerPopup() {
                 return this.#S;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
         }
         class SquareAnnotationElement extends AnnotationElement {
             #C = null;
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
             }
             render() {
                 this.container.classList.add("squareAnnotation");
                 const t = this.data,
                     { width: e, height: i } = getRectDims(t.rect),
                     n = this.svgFactory.create(e, i, !0),
                     s = t.borderStyle.width,
                     r = (this.#C = this.svgFactory.createElement("svg:rect"));
                 r.setAttribute("x", s / 2);
                 r.setAttribute("y", s / 2);
                 r.setAttribute("width", e - s);
                 r.setAttribute("height", i - s);
                 r.setAttribute("stroke-width", s || 1);
                 r.setAttribute("stroke", "transparent");
                 r.setAttribute("fill", "transparent");
                 n.append(r);
                 this.container.append(n);
                 !t.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
             getElementsToTriggerPopup() {
                 return this.#C;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
         }
         class CircleAnnotationElement extends AnnotationElement {
             #T = null;
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
             }
             render() {
                 this.container.classList.add("circleAnnotation");
                 const t = this.data,
                     { width: e, height: i } = getRectDims(t.rect),
                     n = this.svgFactory.create(e, i, !0),
                     s = t.borderStyle.width,
                     r = (this.#T = this.svgFactory.createElement("svg:ellipse"));
                 r.setAttribute("cx", e / 2);
                 r.setAttribute("cy", i / 2);
                 r.setAttribute("rx", e / 2 - s / 2);
                 r.setAttribute("ry", i / 2 - s / 2);
                 r.setAttribute("stroke-width", s || 1);
                 r.setAttribute("stroke", "transparent");
                 r.setAttribute("fill", "transparent");
                 n.append(r);
                 this.container.append(n);
                 !t.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
             getElementsToTriggerPopup() {
                 return this.#T;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
         }
         class PolylineAnnotationElement extends AnnotationElement {
             #P = null;
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
                 this.containerClassName = "polylineAnnotation";
                 this.svgElementName = "svg:polyline";
             }
             render() {
                 this.container.classList.add(this.containerClassName);
                 const t = this.data,
                     { width: e, height: i } = getRectDims(t.rect),
                     n = this.svgFactory.create(e, i, !0);
                 let s = [];
                 for (const e of t.vertices) {
                     const i = e.x - t.rect[0],
                         n = t.rect[3] - e.y;
                     s.push(i + "," + n);
                 }
                 s = s.join(" ");
                 const r = (this.#P = this.svgFactory.createElement(this.svgElementName));
                 r.setAttribute("points", s);
                 r.setAttribute("stroke-width", t.borderStyle.width || 1);
                 r.setAttribute("stroke", "transparent");
                 r.setAttribute("fill", "transparent");
                 n.append(r);
                 this.container.append(n);
                 !t.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
             getElementsToTriggerPopup() {
                 return this.#P;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
         }
         class PolygonAnnotationElement extends PolylineAnnotationElement {
             constructor(t) {
                 super(t);
                 this.containerClassName = "polygonAnnotation";
                 this.svgElementName = "svg:polygon";
             }
         }
         class CaretAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
             }
             render() {
                 this.container.classList.add("caretAnnotation");
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
         }
         class InkAnnotationElement extends AnnotationElement {
             #M = [];
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
                 this.containerClassName = "inkAnnotation";
                 this.svgElementName = "svg:polyline";
                 this.annotationEditorType = n.AnnotationEditorType.INK;
             }
             render() {
                 this.container.classList.add(this.containerClassName);
                 const t = this.data,
                     { width: e, height: i } = getRectDims(t.rect),
                     n = this.svgFactory.create(e, i, !0);
                 for (const e of t.inkLists) {
                     let i = [];
                     for (const n of e) {
                         const e = n.x - t.rect[0],
                             s = t.rect[3] - n.y;
                         i.push(`${e},${s}`);
                     }
                     i = i.join(" ");
                     const s = this.svgFactory.createElement(this.svgElementName);
                     this.#M.push(s);
                     s.setAttribute("points", i);
                     s.setAttribute("stroke-width", t.borderStyle.width || 1);
                     s.setAttribute("stroke", "transparent");
                     s.setAttribute("fill", "transparent");
                     !t.popupRef && this.hasPopupData && this._createPopup();
                     n.append(s);
                 }
                 this.container.append(n);
                 return this.container;
             }
             getElementsToTriggerPopup() {
                 return this.#M;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
         }
         class HighlightAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0, createQuadrilaterals: !0 });
             }
             render() {
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this.container.classList.add("highlightAnnotation");
                 return this.container;
             }
         }
         class UnderlineAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0, createQuadrilaterals: !0 });
             }
             render() {
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this.container.classList.add("underlineAnnotation");
                 return this.container;
             }
         }
         class SquigglyAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0, createQuadrilaterals: !0 });
             }
             render() {
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this.container.classList.add("squigglyAnnotation");
                 return this.container;
             }
         }
         class StrikeOutAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0, createQuadrilaterals: !0 });
             }
             render() {
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 this.container.classList.add("strikeoutAnnotation");
                 return this.container;
             }
         }
         class StampAnnotationElement extends AnnotationElement {
             constructor(t) {
                 super(t, { isRenderable: !0, ignoreBorder: !0 });
             }
             render() {
                 this.container.classList.add("stampAnnotation");
                 !this.data.popupRef && this.hasPopupData && this._createPopup();
                 return this.container;
             }
         }
         class FileAttachmentAnnotationElement extends AnnotationElement {
             #R = null;
             constructor(t) {
                 super(t, { isRenderable: !0 });
                 const { filename: e, content: i } = this.data.file;
                 this.filename = (0, s.getFilenameFromUrl)(e, !0);
                 this.content = i;
                 this.linkService.eventBus?.dispatch("fileattachmentannotation", { source: this, filename: e, content: i });
             }
             render() {
                 this.container.classList.add("fileAttachmentAnnotation");
                 const { container: t, data: e } = this;
                 let i;
                 if (e.hasAppearance || 0 === e.fillAlpha) i = document.createElement("div");
                 else {
                     i = document.createElement("img");
                     i.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(e.name) ? "paperclip" : "pushpin"}.svg`;
                     e.fillAlpha && e.fillAlpha < 1 && (i.style = `filter: opacity(${Math.round(100 * e.fillAlpha)}%);`);
                 }
                 i.addEventListener("dblclick", this.#k.bind(this));
                 this.#R = i;
                 const { isMac: s } = n.FeatureTest.platform;
                 t.addEventListener("keydown", (t) => {
                     "Enter" === t.key && (s ? t.metaKey : t.ctrlKey) && this.#k();
                 });
                 !e.popupRef && this.hasPopupData ? this._createPopup() : i.classList.add("popupTriggerArea");
                 t.append(i);
                 return t;
             }
             getElementsToTriggerPopup() {
                 return this.#R;
             }
             addHighlightArea() {
                 this.container.classList.add("highlightArea");
             }
             #k() {
                 this.downloadManager?.openOrDownloadData(this.content, this.filename);
             }
         }
         class AnnotationLayer {
             #F = null;
             #D = null;
             #I = new Map();
             constructor(t) {
                 let { div: e, accessibilityManager: i, annotationCanvasMap: n, page: s, viewport: r } = t;
                 this.div = e;
                 this.#F = i;
                 this.#D = n;
                 this.page = s;
                 this.viewport = r;
                 this.zIndex = 0;
             }
             #L(t, e) {
                 const i = t.firstChild || t;
                 i.id = `${n.AnnotationPrefix}${e}`;
                 this.div.append(t);
                 this.#F?.moveElementInDOM(this.div, t, i, !1);
             }
             async render(t) {
                 const { annotations: e } = t,
                     i = this.div;
                 (0, s.setLayerDimensions)(i, this.viewport);
                 const a = new Map(),
                     o = {
                         data: null,
                         layer: i,
                         linkService: t.linkService,
                         downloadManager: t.downloadManager,
                         imageResourcesPath: t.imageResourcesPath || "",
                         renderForms: !1 !== t.renderForms,
                         svgFactory: new s.DOMSVGFactory(),
                         annotationStorage: t.annotationStorage || new r.AnnotationStorage(),
                         enableScripting: !0 === t.enableScripting,
                         hasJSActions: t.hasJSActions,
                         fieldObjects: t.fieldObjects,
                         parent: this,
                         elements: null,
                     };
                 for (const t of e) {
                     if (t.noHTML) continue;
                     const e = t.annotationType === n.AnnotationType.POPUP;
                     if (e) {
                         const e = a.get(t.id);
                         if (!e) continue;
                         o.elements = e;
                     } else {
                         const { width: e, height: i } = getRectDims(t.rect);
                         if (e <= 0 || i <= 0) continue;
                     }
                     o.data = t;
                     const i = AnnotationElementFactory.create(o);
                     if (!i.isRenderable) continue;
                     if (!e && t.popupRef) {
                         const e = a.get(t.popupRef);
                         e ? e.push(i) : a.set(t.popupRef, [i]);
                     }
                     i.annotationEditorType > 0 && this.#I.set(i.data.id, i);
                     const s = i.render();
                     t.hidden && (s.style.visibility = "hidden");
                     this.#L(s, t.id);
                 }
                 this.#O();
             }
             update(t) {
                 let { viewport: e } = t;
                 const i = this.div;
                 this.viewport = e;
                 (0, s.setLayerDimensions)(i, { rotation: e.rotation });
                 this.#O();
                 i.hidden = !1;
             }
             #O() {
                 if (!this.#D) return;
                 const t = this.div;
                 for (const [e, i] of this.#D) {
                     const n = t.querySelector(`[data-annotation-id="${e}"]`);
                     if (!n) continue;
                     const { firstChild: s } = n;
                     s ? ("CANVAS" === s.nodeName ? s.replaceWith(i) : s.before(i)) : n.append(i);
                 }
                 this.#D.clear();
             }
             getEditableAnnotations() {
                 return Array.from(this.#I.values());
             }
             getEditableAnnotation(t) {
                 return this.#I.get(t);
             }
         }
     },
     4780: (t, e, i) => {
         i.d(e, { AnnotationStorage: () => AnnotationStorage, PrintAnnotationStorage: () => PrintAnnotationStorage, SerializableEmpty: () => a });
         i(4226), i(7944), i(9709);
         var n = i(3266),
             s = i(9115),
             r = i(2825);
         const a = Object.freeze({ map: null, hash: "", transfer: void 0 });
         class AnnotationStorage {
             #B = !1;
             #N = new Map();
             constructor() {
                 this.onSetModified = null;
                 this.onResetModified = null;
                 this.onAnnotationEditor = null;
             }
             getValue(t, e) {
                 const i = this.#N.get(t);
                 return void 0 === i ? e : Object.assign(e, i);
             }
             getRawValue(t) {
                 return this.#N.get(t);
             }
             remove(t) {
                 this.#N.delete(t);
                 0 === this.#N.size && this.resetModified();
                 if ("function" == typeof this.onAnnotationEditor) {
                     for (const t of this.#N.values()) if (t instanceof s.AnnotationEditor) return;
                     this.onAnnotationEditor(null);
                 }
             }
             setValue(t, e) {
                 const i = this.#N.get(t);
                 let n = !1;
                 if (void 0 !== i) {
                     for (const [t, s] of Object.entries(e))
                         if (i[t] !== s) {
                             n = !0;
                             i[t] = s;
                         }
                 } else {
                     n = !0;
                     this.#N.set(t, e);
                 }
                 n && this.#U();
                 e instanceof s.AnnotationEditor && "function" == typeof this.onAnnotationEditor && this.onAnnotationEditor(e.constructor._type);
             }
             has(t) {
                 return this.#N.has(t);
             }
             getAll() {
                 return this.#N.size > 0 ? (0, n.objectFromMap)(this.#N) : null;
             }
             setAll(t) {
                 for (const [e, i] of Object.entries(t)) this.setValue(e, i);
             }
             get size() {
                 return this.#N.size;
             }
             #U() {
                 if (!this.#B) {
                     this.#B = !0;
                     "function" == typeof this.onSetModified && this.onSetModified();
                 }
             }
             resetModified() {
                 if (this.#B) {
                     this.#B = !1;
                     "function" == typeof this.onResetModified && this.onResetModified();
                 }
             }
             get print() {
                 return new PrintAnnotationStorage(this);
             }
             get serializable() {
                 if (0 === this.#N.size) return a;
                 const t = new Map(),
                     e = new r.MurmurHash3_64(),
                     i = [],
                     n = Object.create(null);
                 let o = !1;
                 for (const [i, r] of this.#N) {
                     const a = r instanceof s.AnnotationEditor ? r.serialize(!1, n) : r;
                     if (a) {
                         t.set(i, a);
                         e.update(`${i}:${JSON.stringify(a)}`);
                         o ||= !!a.bitmap;
                     }
                 }
                 if (o) for (const e of t.values()) e.bitmap && i.push(e.bitmap);
                 return t.size > 0 ? { map: t, hash: e.hexdigest(), transfer: i } : a;
             }
         }
         class PrintAnnotationStorage extends AnnotationStorage {
             #z;
             constructor(t) {
                 super();
                 const { map: e, hash: i, transfer: n } = t.serializable,
                     s = structuredClone(e, n ? { transfer: n } : null);
                 this.#z = { map: s, hash: i, transfer: n };
             }
             get print() {
                 (0, n.unreachable)("Should not call PrintAnnotationStorage.print");
             }
             get serializable() {
                 return this.#z;
             }
         }
     },
     9406: (t, e, i) => {
         i.a(t, async (t, n) => {
             try {
                 i.d(e, { PDFDataRangeTransport: () => PDFDataRangeTransport, PDFWorker: () => PDFWorker, build: () => M, getDocument: () => getDocument, version: () => P });
                 i(3655), i(2555), i(2202), i(3352), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(4226), i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914), i(7944), i(9709);
                 var s = i(3266),
                     r = i(4780),
                     a = i(473),
                     o = i(3742),
                     l = i(7738),
                     h = i(1250),
                     c = i(1368),
                     d = i(6694),
                     u = i(3472),
                     p = i(3890),
                     g = i(4092),
                     f = i(5171),
                     m = i(3474),
                     v = i(3498),
                     b = i(1521),
                     y = t([l, v]);
                 [l, v] = y.then ? (await y)() : y;
                 const A = 65536,
                     E = 100,
                     w = 5e3,
                     x = s.isNodeJS ? l.NodeCanvasFactory : a.DOMCanvasFactory,
                     _ = s.isNodeJS ? l.NodeCMapReaderFactory : a.DOMCMapReaderFactory,
                     S = s.isNodeJS ? l.NodeFilterFactory : a.DOMFilterFactory,
                     C = s.isNodeJS ? l.NodeStandardFontDataFactory : a.DOMStandardFontDataFactory;
                 function getDocument(t) {
                     "string" == typeof t || t instanceof URL ? (t = { url: t }) : (0, s.isArrayBuffer)(t) && (t = { data: t });
                     if ("object" != typeof t) throw new Error("Invalid parameter in getDocument, need parameter object.");
                     if (!t.url && !t.data && !t.range) throw new Error("Invalid parameter object: need either .data, .range or .url");
                     const e = new PDFDocumentLoadingTask(),
                         { docId: i } = e,
                         n = t.url ? getUrlProp(t.url) : null,
                         r = t.data ? getDataProp(t.data) : null,
                         o = t.httpHeaders || null,
                         l = !0 === t.withCredentials,
                         h = t.password ?? null,
                         u = t.range instanceof PDFDataRangeTransport ? t.range : null,
                         p = Number.isInteger(t.rangeChunkSize) && t.rangeChunkSize > 0 ? t.rangeChunkSize : A;
                     let b = t.worker instanceof PDFWorker ? t.worker : null;
                     const y = t.verbosity,
                         E = "string" != typeof t.docBaseUrl || (0, a.isDataScheme)(t.docBaseUrl) ? null : t.docBaseUrl,
                         w = "string" == typeof t.cMapUrl ? t.cMapUrl : null,
                         T = !1 !== t.cMapPacked,
                         P = t.CMapReaderFactory || _,
                         M = "string" == typeof t.standardFontDataUrl ? t.standardFontDataUrl : null,
                         R = t.StandardFontDataFactory || C,
                         k = !0 !== t.stopAtErrors,
                         D = Number.isInteger(t.maxImageSize) && t.maxImageSize > -1 ? t.maxImageSize : -1,
                         I = !1 !== t.isEvalSupported,
                         L = "boolean" == typeof t.isOffscreenCanvasSupported ? t.isOffscreenCanvasSupported : !s.isNodeJS,
                         O = Number.isInteger(t.canvasMaxAreaInBytes) ? t.canvasMaxAreaInBytes : -1,
                         B = "boolean" == typeof t.disableFontFace ? t.disableFontFace : s.isNodeJS,
                         N = !0 === t.fontExtraProperties,
                         U = !0 === t.enableXfa,
                         z = t.ownerDocument || globalThis.document,
                         j = !0 === t.disableRange,
                         H = !0 === t.disableStream,
                         V = !0 === t.disableAutoFetch,
                         W = !0 === t.pdfBug,
                         G = u ? u.length : t.length ?? NaN,
                         q = "boolean" == typeof t.useSystemFonts ? t.useSystemFonts : !s.isNodeJS && !B,
                         $ =
                             "boolean" == typeof t.useWorkerFetch
                                 ? t.useWorkerFetch
                                 : P === a.DOMCMapReaderFactory && R === a.DOMStandardFontDataFactory && w && M && (0, a.isValidFetchUrl)(w, document.baseURI) && (0, a.isValidFetchUrl)(M, document.baseURI),
                         K = t.canvasFactory || new x({ ownerDocument: z }),
                         X = t.filterFactory || new S({ docId: i, ownerDocument: z });
                     (0, s.setVerbosityLevel)(y);
                     const Y = { canvasFactory: K, filterFactory: X };
                     if (!$) {
                         Y.cMapReaderFactory = new P({ baseUrl: w, isCompressed: T });
                         Y.standardFontDataFactory = new R({ baseUrl: M });
                     }
                     if (!b) {
                         const t = { verbosity: y, port: c.GlobalWorkerOptions.workerPort };
                         b = t.port ? PDFWorker.fromPort(t) : new PDFWorker(t);
                         e._worker = b;
                     }
                     const J = {
                             docId: i,
                             apiVersion: "4.0.379",
                             data: r,
                             password: h,
                             disableAutoFetch: V,
                             rangeChunkSize: p,
                             length: G,
                             docBaseUrl: E,
                             enableXfa: U,
                             evaluatorOptions: {
                                 maxImageSize: D,
                                 disableFontFace: B,
                                 ignoreErrors: k,
                                 isEvalSupported: I,
                                 isOffscreenCanvasSupported: L,
                                 canvasMaxAreaInBytes: O,
                                 fontExtraProperties: N,
                                 useSystemFonts: q,
                                 cMapUrl: $ ? w : null,
                                 standardFontDataUrl: $ ? M : null,
                             },
                         },
                         Q = { ignoreErrors: k, isEvalSupported: I, disableFontFace: B, fontExtraProperties: N, enableXfa: U, ownerDocument: z, disableAutoFetch: V, pdfBug: W, styleElement: null };
                     b.promise
                         .then(function () {
                             if (e.destroyed) throw new Error("Loading aborted");
                             const t = _fetchDocument(b, J),
                                 h = new Promise(function (t) {
                                     let e;
                                     if (u)
                                         e = new g.PDFDataTransportStream(
                                             { length: G, initialData: u.initialData, progressiveDone: u.progressiveDone, contentDispositionFilename: u.contentDispositionFilename, disableRange: j, disableStream: H },
                                             u
                                         );
                                     else if (!r) {
                                         e = ((t) => (s.isNodeJS ? new v.PDFNodeStream(t) : (0, a.isValidFetchUrl)(t.url) ? new f.PDFFetchStream(t) : new m.PDFNetworkStream(t)))({
                                             url: n,
                                             length: G,
                                             httpHeaders: o,
                                             withCredentials: l,
                                             rangeChunkSize: p,
                                             disableRange: j,
                                             disableStream: H,
                                         });
                                     }
                                     t(e);
                                 });
                             return Promise.all([t, h]).then(function (t) {
                                 let [n, s] = t;
                                 if (e.destroyed) throw new Error("Loading aborted");
                                 const r = new d.MessageHandler(i, n, b.port),
                                     a = new WorkerTransport(r, e, s, Q, Y);
                                 e._transport = a;
                                 r.send("Ready", null);
                             });
                         })
                         .catch(e._capability.reject);
                     return e;
                 }
                 async function _fetchDocument(t, e) {
                     if (t.destroyed) throw new Error("Worker was destroyed");
                     const i = await t.messageHandler.sendWithPromise("GetDocRequest", e, e.data ? [e.data.buffer] : null);
                     if (t.destroyed) throw new Error("Worker was destroyed");
                     return i;
                 }
                 function getUrlProp(t) {
                     if (t instanceof URL) return t.href;
                     try {
                         return new URL(t, window.location).href;
                     } catch {
                         if (s.isNodeJS && "string" == typeof t) return t;
                     }
                     throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
                 }
                 function getDataProp(t) {
                     if (s.isNodeJS && "undefined" != typeof Buffer && t instanceof Buffer) throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
                     if (t instanceof Uint8Array && t.byteLength === t.buffer.byteLength) return t;
                     if ("string" == typeof t) return (0, s.stringToBytes)(t);
                     if (("object" == typeof t && !isNaN(t?.length)) || (0, s.isArrayBuffer)(t)) return new Uint8Array(t);
                     throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
                 }
                 class PDFDocumentLoadingTask {
                     static #j = 0;
                     constructor() {
                         this._capability = new s.PromiseCapability();
                         this._transport = null;
                         this._worker = null;
                         this.docId = "d" + PDFDocumentLoadingTask.#j++;
                         this.destroyed = !1;
                         this.onPassword = null;
                         this.onProgress = null;
                     }
                     get promise() {
                         return this._capability.promise;
                     }
                     async destroy() {
                         this.destroyed = !0;
                         try {
                             this._worker?.port && (this._worker._pendingDestroy = !0);
                             await this._transport?.destroy();
                         } catch (t) {
                             this._worker?.port && delete this._worker._pendingDestroy;
                             throw t;
                         }
                         this._transport = null;
                         if (this._worker) {
                             this._worker.destroy();
                             this._worker = null;
                         }
                     }
                 }
                 class PDFDataRangeTransport {
                     constructor(t, e) {
                         let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                             n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                         this.length = t;
                         this.initialData = e;
                         this.progressiveDone = i;
                         this.contentDispositionFilename = n;
                         this._rangeListeners = [];
                         this._progressListeners = [];
                         this._progressiveReadListeners = [];
                         this._progressiveDoneListeners = [];
                         this._readyCapability = new s.PromiseCapability();
                     }
                     addRangeListener(t) {
                         this._rangeListeners.push(t);
                     }
                     addProgressListener(t) {
                         this._progressListeners.push(t);
                     }
                     addProgressiveReadListener(t) {
                         this._progressiveReadListeners.push(t);
                     }
                     addProgressiveDoneListener(t) {
                         this._progressiveDoneListeners.push(t);
                     }
                     onDataRange(t, e) {
                         for (const i of this._rangeListeners) i(t, e);
                     }
                     onDataProgress(t, e) {
                         this._readyCapability.promise.then(() => {
                             for (const i of this._progressListeners) i(t, e);
                         });
                     }
                     onDataProgressiveRead(t) {
                         this._readyCapability.promise.then(() => {
                             for (const e of this._progressiveReadListeners) e(t);
                         });
                     }
                     onDataProgressiveDone() {
                         this._readyCapability.promise.then(() => {
                             for (const t of this._progressiveDoneListeners) t();
                         });
                     }
                     transportReady() {
                         this._readyCapability.resolve();
                     }
                     requestDataRange(t, e) {
                         (0, s.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
                     }
                     abort() {}
                 }
                 class PDFDocumentProxy {
                     constructor(t, e) {
                         this._pdfInfo = t;
                         this._transport = e;
                     }
                     get annotationStorage() {
                         return this._transport.annotationStorage;
                     }
                     get filterFactory() {
                         return this._transport.filterFactory;
                     }
                     get numPages() {
                         return this._pdfInfo.numPages;
                     }
                     get fingerprints() {
                         return this._pdfInfo.fingerprints;
                     }
                     get isPureXfa() {
                         return (0, s.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
                     }
                     get allXfaHtml() {
                         return this._transport._htmlForXfa;
                     }
                     getPage(t) {
                         return this._transport.getPage(t);
                     }
                     getPageIndex(t) {
                         return this._transport.getPageIndex(t);
                     }
                     getDestinations() {
                         return this._transport.getDestinations();
                     }
                     getDestination(t) {
                         return this._transport.getDestination(t);
                     }
                     getPageLabels() {
                         return this._transport.getPageLabels();
                     }
                     getPageLayout() {
                         return this._transport.getPageLayout();
                     }
                     getPageMode() {
                         return this._transport.getPageMode();
                     }
                     getViewerPreferences() {
                         return this._transport.getViewerPreferences();
                     }
                     getOpenAction() {
                         return this._transport.getOpenAction();
                     }
                     getAttachments() {
                         return this._transport.getAttachments();
                     }
                     getJSActions() {
                         return this._transport.getDocJSActions();
                     }
                     getOutline() {
                         return this._transport.getOutline();
                     }
                     getOptionalContentConfig() {
                         return this._transport.getOptionalContentConfig();
                     }
                     getPermissions() {
                         return this._transport.getPermissions();
                     }
                     getMetadata() {
                         return this._transport.getMetadata();
                     }
                     getMarkInfo() {
                         return this._transport.getMarkInfo();
                     }
                     getData() {
                         return this._transport.getData();
                     }
                     saveDocument() {
                         return this._transport.saveDocument();
                     }
                     getDownloadInfo() {
                         return this._transport.downloadInfoCapability.promise;
                     }
                     cleanup() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                         return this._transport.startCleanup(t || this.isPureXfa);
                     }
                     destroy() {
                         return this.loadingTask.destroy();
                     }
                     get loadingParams() {
                         return this._transport.loadingParams;
                     }
                     get loadingTask() {
                         return this._transport.loadingTask;
                     }
                     getFieldObjects() {
                         return this._transport.getFieldObjects();
                     }
                     hasJSActions() {
                         return this._transport.hasJSActions();
                     }
                     getCalculationOrderIds() {
                         return this._transport.getCalculationOrderIds();
                     }
                 }
                 class PDFPageProxy {
                     #H = null;
                     #V = !1;
                     constructor(t, e, i) {
                         let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                         this._pageIndex = t;
                         this._pageInfo = e;
                         this._transport = i;
                         this._stats = n ? new a.StatTimer() : null;
                         this._pdfBug = n;
                         this.commonObjs = i.commonObjs;
                         this.objs = new PDFObjects();
                         this._maybeCleanupAfterRender = !1;
                         this._intentStates = new Map();
                         this.destroyed = !1;
                     }
                     get pageNumber() {
                         return this._pageIndex + 1;
                     }
                     get rotate() {
                         return this._pageInfo.rotate;
                     }
                     get ref() {
                         return this._pageInfo.ref;
                     }
                     get userUnit() {
                         return this._pageInfo.userUnit;
                     }
                     get view() {
                         return this._pageInfo.view;
                     }
                     getViewport() {
                         let { scale: t, rotation: e = this.rotate, offsetX: i = 0, offsetY: n = 0, dontFlip: s = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         return new a.PageViewport({ viewBox: this.view, scale: t, rotation: e, offsetX: i, offsetY: n, dontFlip: s });
                     }
                     getAnnotations() {
                         let { intent: t = "display" } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         const e = this._transport.getRenderingIntent(t);
                         return this._transport.getAnnotations(this._pageIndex, e.renderingIntent);
                     }
                     getJSActions() {
                         return this._transport.getPageJSActions(this._pageIndex);
                     }
                     get filterFactory() {
                         return this._transport.filterFactory;
                     }
                     get isPureXfa() {
                         return (0, s.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
                     }
                     async getXfa() {
                         return this._transport._htmlForXfa?.children[this._pageIndex] || null;
                     }
                     render(t) {
                         let {
                             canvasContext: e,
                             viewport: i,
                             intent: n = "display",
                             annotationMode: r = s.AnnotationMode.ENABLE,
                             transform: a = null,
                             background: o = null,
                             optionalContentConfigPromise: l = null,
                             annotationCanvasMap: h = null,
                             pageColors: c = null,
                             printAnnotationStorage: d = null,
                         } = t;
                         this._stats?.time("Overall");
                         const u = this._transport.getRenderingIntent(n, r, d);
                         this.#V = !1;
                         this.#W();
                         l || (l = this._transport.getOptionalContentConfig());
                         let p = this._intentStates.get(u.cacheKey);
                         if (!p) {
                             p = Object.create(null);
                             this._intentStates.set(u.cacheKey, p);
                         }
                         if (p.streamReaderCancelTimeout) {
                             clearTimeout(p.streamReaderCancelTimeout);
                             p.streamReaderCancelTimeout = null;
                         }
                         const g = !!(u.renderingIntent & s.RenderingIntentFlag.PRINT);
                         if (!p.displayReadyCapability) {
                             p.displayReadyCapability = new s.PromiseCapability();
                             p.operatorList = { fnArray: [], argsArray: [], lastChunk: !1, separateAnnots: null };
                             this._stats?.time("Page Request");
                             this._pumpOperatorList(u);
                         }
                         const complete = (t) => {
                                 p.renderTasks.delete(f);
                                 (this._maybeCleanupAfterRender || g) && (this.#V = !0);
                                 this.#G(!g);
                                 if (t) {
                                     f.capability.reject(t);
                                     this._abortOperatorList({ intentState: p, reason: t instanceof Error ? t : new Error(t) });
                                 } else f.capability.resolve();
                                 this._stats?.timeEnd("Rendering");
                                 this._stats?.timeEnd("Overall");
                             },
                             f = new InternalRenderTask({
                                 callback: complete,
                                 params: { canvasContext: e, viewport: i, transform: a, background: o },
                                 objs: this.objs,
                                 commonObjs: this.commonObjs,
                                 annotationCanvasMap: h,
                                 operatorList: p.operatorList,
                                 pageIndex: this._pageIndex,
                                 canvasFactory: this._transport.canvasFactory,
                                 filterFactory: this._transport.filterFactory,
                                 useRequestAnimationFrame: !g,
                                 pdfBug: this._pdfBug,
                                 pageColors: c,
                             });
                         (p.renderTasks ||= new Set()).add(f);
                         const m = f.task;
                         Promise.all([p.displayReadyCapability.promise, l])
                             .then((t) => {
                                 let [e, i] = t;
                                 if (this.destroyed) complete();
                                 else {
                                     this._stats?.time("Rendering");
                                     f.initializeGraphics({ transparency: e, optionalContentConfig: i });
                                     f.operatorListChanged();
                                 }
                             })
                             .catch(complete);
                         return m;
                     }
                     getOperatorList() {
                         let { intent: t = "display", annotationMode: e = s.AnnotationMode.ENABLE, printAnnotationStorage: i = null } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         const n = this._transport.getRenderingIntent(t, e, i, !0);
                         let r,
                             a = this._intentStates.get(n.cacheKey);
                         if (!a) {
                             a = Object.create(null);
                             this._intentStates.set(n.cacheKey, a);
                         }
                         if (!a.opListReadCapability) {
                             r = Object.create(null);
                             r.operatorListChanged = function operatorListChanged() {
                                 if (a.operatorList.lastChunk) {
                                     a.opListReadCapability.resolve(a.operatorList);
                                     a.renderTasks.delete(r);
                                 }
                             };
                             a.opListReadCapability = new s.PromiseCapability();
                             (a.renderTasks ||= new Set()).add(r);
                             a.operatorList = { fnArray: [], argsArray: [], lastChunk: !1, separateAnnots: null };
                             this._stats?.time("Page Request");
                             this._pumpOperatorList(n);
                         }
                         return a.opListReadCapability.promise;
                     }
                     streamTextContent() {
                         let { includeMarkedContent: t = !1, disableNormalization: e = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         return this._transport.messageHandler.sendWithStream(
                             "GetTextContent",
                             { pageIndex: this._pageIndex, includeMarkedContent: !0 === t, disableNormalization: !0 === e },
                             { highWaterMark: 100, size: (t) => t.items.length }
                         );
                     }
                     getTextContent() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         if (this._transport._htmlForXfa) return this.getXfa().then((t) => b.XfaText.textContent(t));
                         const e = this.streamTextContent(t);
                         return new Promise(function (t, i) {
                             const n = e.getReader(),
                                 s = { items: [], styles: Object.create(null) };
                             !(function pump() {
                                 n.read().then(function (e) {
                                     let { value: i, done: n } = e;
                                     if (n) t(s);
                                     else {
                                         Object.assign(s.styles, i.styles);
                                         s.items.push(...i.items);
                                         pump();
                                     }
                                 }, i);
                             })();
                         });
                     }
                     getStructTree() {
                         return this._transport.getStructTree(this._pageIndex);
                     }
                     _destroy() {
                         this.destroyed = !0;
                         const t = [];
                         for (const e of this._intentStates.values()) {
                             this._abortOperatorList({ intentState: e, reason: new Error("Page was destroyed."), force: !0 });
                             if (!e.opListReadCapability)
                                 for (const i of e.renderTasks) {
                                     t.push(i.completed);
                                     i.cancel();
                                 }
                         }
                         this.objs.clear();
                         this.#V = !1;
                         this.#W();
                         return Promise.all(t);
                     }
                     cleanup() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                         this.#V = !0;
                         const e = this.#G(!1);
                         t && e && (this._stats &&= new a.StatTimer());
                         return e;
                     }
                     #G() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                         this.#W();
                         if (!this.#V || this.destroyed) return !1;
                         if (t) {
                             this.#H = setTimeout(() => {
                                 this.#H = null;
                                 this.#G(!1);
                             }, w);
                             return !1;
                         }
                         for (const { renderTasks: t, operatorList: e } of this._intentStates.values()) if (t.size > 0 || !e.lastChunk) return !1;
                         this._intentStates.clear();
                         this.objs.clear();
                         this.#V = !1;
                         return !0;
                     }
                     #W() {
                         if (this.#H) {
                             clearTimeout(this.#H);
                             this.#H = null;
                         }
                     }
                     _startRenderPage(t, e) {
                         const i = this._intentStates.get(e);
                         if (i) {
                             this._stats?.timeEnd("Page Request");
                             i.displayReadyCapability?.resolve(t);
                         }
                     }
                     _renderPageChunk(t, e) {
                         for (let i = 0, n = t.length; i < n; i++) {
                             e.operatorList.fnArray.push(t.fnArray[i]);
                             e.operatorList.argsArray.push(t.argsArray[i]);
                         }
                         e.operatorList.lastChunk = t.lastChunk;
                         e.operatorList.separateAnnots = t.separateAnnots;
                         for (const t of e.renderTasks) t.operatorListChanged();
                         t.lastChunk && this.#G(!0);
                     }
                     _pumpOperatorList(t) {
                         let { renderingIntent: e, cacheKey: i, annotationStorageSerializable: n } = t;
                         const { map: s, transfer: r } = n,
                             a = this._transport.messageHandler.sendWithStream("GetOperatorList", { pageIndex: this._pageIndex, intent: e, cacheKey: i, annotationStorage: s }, r).getReader(),
                             o = this._intentStates.get(i);
                         o.streamReader = a;
                         const pump = () => {
                             a.read().then(
                                 (t) => {
                                     let { value: e, done: i } = t;
                                     if (i) o.streamReader = null;
                                     else if (!this._transport.destroyed) {
                                         this._renderPageChunk(e, o);
                                         pump();
                                     }
                                 },
                                 (t) => {
                                     o.streamReader = null;
                                     if (!this._transport.destroyed) {
                                         if (o.operatorList) {
                                             o.operatorList.lastChunk = !0;
                                             for (const t of o.renderTasks) t.operatorListChanged();
                                             this.#G(!0);
                                         }
                                         if (o.displayReadyCapability) o.displayReadyCapability.reject(t);
                                         else {
                                             if (!o.opListReadCapability) throw t;
                                             o.opListReadCapability.reject(t);
                                         }
                                     }
                                 }
                             );
                         };
                         pump();
                     }
                     _abortOperatorList(t) {
                         let { intentState: e, reason: i, force: n = !1 } = t;
                         if (e.streamReader) {
                             if (e.streamReaderCancelTimeout) {
                                 clearTimeout(e.streamReaderCancelTimeout);
                                 e.streamReaderCancelTimeout = null;
                             }
                             if (!n) {
                                 if (e.renderTasks.size > 0) return;
                                 if (i instanceof a.RenderingCancelledException) {
                                     let t = E;
                                     i.extraDelay > 0 && i.extraDelay < 1e3 && (t += i.extraDelay);
                                     e.streamReaderCancelTimeout = setTimeout(() => {
                                         e.streamReaderCancelTimeout = null;
                                         this._abortOperatorList({ intentState: e, reason: i, force: !0 });
                                     }, t);
                                     return;
                                 }
                             }
                             e.streamReader.cancel(new s.AbortException(i.message)).catch(() => {});
                             e.streamReader = null;
                             if (!this._transport.destroyed) {
                                 for (const [t, i] of this._intentStates)
                                     if (i === e) {
                                         this._intentStates.delete(t);
                                         break;
                                     }
                                 this.cleanup();
                             }
                         }
                     }
                     get stats() {
                         return this._stats;
                     }
                 }
                 class LoopbackPort {
                     #q = new Set();
                     #$ = Promise.resolve();
                     postMessage(t, e) {
                         const i = { data: structuredClone(t, e ? { transfer: e } : null) };
                         this.#$.then(() => {
                             for (const t of this.#q) t.call(this, i);
                         });
                     }
                     addEventListener(t, e) {
                         this.#q.add(e);
                     }
                     removeEventListener(t, e) {
                         this.#q.delete(e);
                     }
                     terminate() {
                         this.#q.clear();
                     }
                 }
                 const T = { isWorkerDisabled: !1, fakeWorkerId: 0 };
                 if (s.isNodeJS) {
                     T.isWorkerDisabled = !0;
                     c.GlobalWorkerOptions.workerSrc ||= "./pdf.worker.mjs";
                 }
                 T.isSameOrigin = function (t, e) {
                     let i;
                     try {
                         i = new URL(t);
                         if (!i.origin || "null" === i.origin) return !1;
                     } catch {
                         return !1;
                     }
                     const n = new URL(e, i);
                     return i.origin === n.origin;
                 };
                 T.createCDNWrapper = function (t) {
                     const e = `await import("${t}");`;
                     return URL.createObjectURL(new Blob([e], { type: "text/javascript" }));
                 };
                 class PDFWorker {
                     static #K;
                     constructor() {
                         let { name: t = null, port: e = null, verbosity: i = (0, s.getVerbosityLevel)() } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                         this.name = t;
                         this.destroyed = !1;
                         this.verbosity = i;
                         this._readyCapability = new s.PromiseCapability();
                         this._port = null;
                         this._webWorker = null;
                         this._messageHandler = null;
                         if (e) {
                             if (PDFWorker.#K?.has(e)) throw new Error("Cannot use more than one PDFWorker per port.");
                             (PDFWorker.#K ||= new WeakMap()).set(e, this);
                             this._initializeFromPort(e);
                         } else this._initialize();
                     }
                     get promise() {
                         return this._readyCapability.promise;
                     }
                     get port() {
                         return this._port;
                     }
                     get messageHandler() {
                         return this._messageHandler;
                     }
                     _initializeFromPort(t) {
                         this._port = t;
                         this._messageHandler = new d.MessageHandler("main", "worker", t);
                         this._messageHandler.on("ready", function () {});
                         this._readyCapability.resolve();
                         this._messageHandler.send("configure", { verbosity: this.verbosity });
                     }
                     _initialize() {
                         if (!T.isWorkerDisabled && !PDFWorker.#X) {
                             let { workerSrc: t } = PDFWorker;
                             try {
                                 T.isSameOrigin(window.location.href, t) || (t = T.createCDNWrapper(new URL(t, window.location).href));
                                 const e = new Worker(t, { type: "module" }),
                                     i = new d.MessageHandler("main", "worker", e),
                                     terminateEarly = () => {
                                         e.removeEventListener("error", onWorkerError);
                                         i.destroy();
                                         e.terminate();
                                         this.destroyed ? this._readyCapability.reject(new Error("Worker was destroyed")) : this._setupFakeWorker();
                                     },
                                     onWorkerError = () => {
                                         this._webWorker || terminateEarly();
                                     };
                                 e.addEventListener("error", onWorkerError);
                                 i.on("test", (t) => {
                                     e.removeEventListener("error", onWorkerError);
                                     if (this.destroyed) terminateEarly();
                                     else if (t) {
                                         this._messageHandler = i;
                                         this._port = e;
                                         this._webWorker = e;
                                         this._readyCapability.resolve();
                                         i.send("configure", { verbosity: this.verbosity });
                                     } else {
                                         this._setupFakeWorker();
                                         i.destroy();
                                         e.terminate();
                                     }
                                 });
                                 i.on("ready", (t) => {
                                     e.removeEventListener("error", onWorkerError);
                                     if (this.destroyed) terminateEarly();
                                     else
                                         try {
                                             sendTest();
                                         } catch {
                                             this._setupFakeWorker();
                                         }
                                 });
                                 const sendTest = () => {
                                     const t = new Uint8Array();
                                     i.send("test", t, [t.buffer]);
                                 };
                                 sendTest();
                                 return;
                             } catch {
                                 (0, s.info)("The worker has been disabled.");
                             }
                         }
                         this._setupFakeWorker();
                     }
                     _setupFakeWorker() {
                         if (!T.isWorkerDisabled) {
                             (0, s.warn)("Setting up fake worker.");
                             T.isWorkerDisabled = !0;
                         }
                         PDFWorker._setupFakeWorkerGlobal
                             .then((t) => {
                                 if (this.destroyed) {
                                     this._readyCapability.reject(new Error("Worker was destroyed"));
                                     return;
                                 }
                                 const e = new LoopbackPort();
                                 this._port = e;
                                 const i = "fake" + T.fakeWorkerId++,
                                     n = new d.MessageHandler(i + "_worker", i, e);
                                 t.setup(n, e);
                                 const s = new d.MessageHandler(i, i + "_worker", e);
                                 this._messageHandler = s;
                                 this._readyCapability.resolve();
                                 s.send("configure", { verbosity: this.verbosity });
                             })
                             .catch((t) => {
                                 this._readyCapability.reject(new Error(`Setting up fake worker failed: "${t.message}".`));
                             });
                     }
                     destroy() {
                         this.destroyed = !0;
                         if (this._webWorker) {
                             this._webWorker.terminate();
                             this._webWorker = null;
                         }
                         PDFWorker.#K?.delete(this._port);
                         this._port = null;
                         if (this._messageHandler) {
                             this._messageHandler.destroy();
                             this._messageHandler = null;
                         }
                     }
                     static fromPort(t) {
                         if (!t?.port) throw new Error("PDFWorker.fromPort - invalid method signature.");
                         const e = this.#K?.get(t.port);
                         if (e) {
                             if (e._pendingDestroy) throw new Error("PDFWorker.fromPort - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
                             return e;
                         }
                         return new PDFWorker(t);
                     }
                     static get workerSrc() {
                         if (c.GlobalWorkerOptions.workerSrc) return c.GlobalWorkerOptions.workerSrc;
                         throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
                     }
                     static get #X() {
                         try {
                             return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
                         } catch {
                             return null;
                         }
                     }
                     static get _setupFakeWorkerGlobal() {
                         return (0, s.shadow)(
                             this,
                             "_setupFakeWorkerGlobal",
                             (async () => {
                                 if (this.#X) return this.#X;
                                 return (await import(this.workerSrc)).WorkerMessageHandler;
                             })()
                         );
                     }
                 }
                 class WorkerTransport {
                     #Y = new Map();
                     #J = new Map();
                     #Q = new Map();
                     #Z = null;
                     constructor(t, e, i, n, r) {
                         this.messageHandler = t;
                         this.loadingTask = e;
                         this.commonObjs = new PDFObjects();
                         this.fontLoader = new o.FontLoader({ ownerDocument: n.ownerDocument, styleElement: n.styleElement });
                         this._params = n;
                         this.canvasFactory = r.canvasFactory;
                         this.filterFactory = r.filterFactory;
                         this.cMapReaderFactory = r.cMapReaderFactory;
                         this.standardFontDataFactory = r.standardFontDataFactory;
                         this.destroyed = !1;
                         this.destroyCapability = null;
                         this._networkStream = i;
                         this._fullReader = null;
                         this._lastProgress = null;
                         this.downloadInfoCapability = new s.PromiseCapability();
                         this.setupMessageHandler();
                     }
                     #tt(t) {
                         let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                         const i = this.#Y.get(t);
                         if (i) return i;
                         const n = this.messageHandler.sendWithPromise(t, e);
                         this.#Y.set(t, n);
                         return n;
                     }
                     get annotationStorage() {
                         return (0, s.shadow)(this, "annotationStorage", new r.AnnotationStorage());
                     }
                     getRenderingIntent(t) {
                         let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.AnnotationMode.ENABLE,
                             i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                             n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                             a = s.RenderingIntentFlag.DISPLAY,
                             o = r.SerializableEmpty;
                         switch (t) {
                             case "any":
                                 a = s.RenderingIntentFlag.ANY;
                                 break;
                             case "display":
                                 break;
                             case "print":
                                 a = s.RenderingIntentFlag.PRINT;
                                 break;
                             default:
                                 (0, s.warn)(`getRenderingIntent - invalid intent: ${t}`);
                         }
                         switch (e) {
                             case s.AnnotationMode.DISABLE:
                                 a += s.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                                 break;
                             case s.AnnotationMode.ENABLE:
                                 break;
                             case s.AnnotationMode.ENABLE_FORMS:
                                 a += s.RenderingIntentFlag.ANNOTATIONS_FORMS;
                                 break;
                             case s.AnnotationMode.ENABLE_STORAGE:
                                 a += s.RenderingIntentFlag.ANNOTATIONS_STORAGE;
                                 o = (a & s.RenderingIntentFlag.PRINT && i instanceof r.PrintAnnotationStorage ? i : this.annotationStorage).serializable;
                                 break;
                             default:
                                 (0, s.warn)(`getRenderingIntent - invalid annotationMode: ${e}`);
                         }
                         n && (a += s.RenderingIntentFlag.OPLIST);
                         return { renderingIntent: a, cacheKey: `${a}_${o.hash}`, annotationStorageSerializable: o };
                     }
                     destroy() {
                         if (this.destroyCapability) return this.destroyCapability.promise;
                         this.destroyed = !0;
                         this.destroyCapability = new s.PromiseCapability();
                         this.#Z?.reject(new Error("Worker was destroyed during onPassword callback"));
                         const t = [];
                         for (const e of this.#J.values()) t.push(e._destroy());
                         this.#J.clear();
                         this.#Q.clear();
                         this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
                         const e = this.messageHandler.sendWithPromise("Terminate", null);
                         t.push(e);
                         Promise.all(t).then(() => {
                             this.commonObjs.clear();
                             this.fontLoader.clear();
                             this.#Y.clear();
                             this.filterFactory.destroy();
                             this._networkStream?.cancelAllRequests(new s.AbortException("Worker was terminated."));
                             if (this.messageHandler) {
                                 this.messageHandler.destroy();
                                 this.messageHandler = null;
                             }
                             this.destroyCapability.resolve();
                         }, this.destroyCapability.reject);
                         return this.destroyCapability.promise;
                     }
                     setupMessageHandler() {
                         const { messageHandler: t, loadingTask: e } = this;
                         t.on("GetReader", (t, e) => {
                             (0, s.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available.");
                             this._fullReader = this._networkStream.getFullReader();
                             this._fullReader.onProgress = (t) => {
                                 this._lastProgress = { loaded: t.loaded, total: t.total };
                             };
                             e.onPull = () => {
                                 this._fullReader
                                     .read()
                                     .then(function (t) {
                                         let { value: i, done: n } = t;
                                         if (n) e.close();
                                         else {
                                             (0, s.assert)(i instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer.");
                                             e.enqueue(new Uint8Array(i), 1, [i]);
                                         }
                                     })
                                     .catch((t) => {
                                         e.error(t);
                                     });
                             };
                             e.onCancel = (t) => {
                                 this._fullReader.cancel(t);
                                 e.ready.catch((t) => {
                                     if (!this.destroyed) throw t;
                                 });
                             };
                         });
                         t.on("ReaderHeadersReady", (t) => {
                             const i = new s.PromiseCapability(),
                                 n = this._fullReader;
                             n.headersReady.then(() => {
                                 if (!n.isStreamingSupported || !n.isRangeSupported) {
                                     this._lastProgress && e.onProgress?.(this._lastProgress);
                                     n.onProgress = (t) => {
                                         e.onProgress?.({ loaded: t.loaded, total: t.total });
                                     };
                                 }
                                 i.resolve({ isStreamingSupported: n.isStreamingSupported, isRangeSupported: n.isRangeSupported, contentLength: n.contentLength });
                             }, i.reject);
                             return i.promise;
                         });
                         t.on("GetRangeReader", (t, e) => {
                             (0, s.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                             const i = this._networkStream.getRangeReader(t.begin, t.end);
                             if (i) {
                                 e.onPull = () => {
                                     i.read()
                                         .then(function (t) {
                                             let { value: i, done: n } = t;
                                             if (n) e.close();
                                             else {
                                                 (0, s.assert)(i instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer.");
                                                 e.enqueue(new Uint8Array(i), 1, [i]);
                                             }
                                         })
                                         .catch((t) => {
                                             e.error(t);
                                         });
                                 };
                                 e.onCancel = (t) => {
                                     i.cancel(t);
                                     e.ready.catch((t) => {
                                         if (!this.destroyed) throw t;
                                     });
                                 };
                             } else e.close();
                         });
                         t.on("GetDoc", (t) => {
                             let { pdfInfo: i } = t;
                             this._numPages = i.numPages;
                             this._htmlForXfa = i.htmlForXfa;
                             delete i.htmlForXfa;
                             e._capability.resolve(new PDFDocumentProxy(i, this));
                         });
                         t.on("DocException", function (t) {
                             let i;
                             switch (t.name) {
                                 case "PasswordException":
                                     i = new s.PasswordException(t.message, t.code);
                                     break;
                                 case "InvalidPDFException":
                                     i = new s.InvalidPDFException(t.message);
                                     break;
                                 case "MissingPDFException":
                                     i = new s.MissingPDFException(t.message);
                                     break;
                                 case "UnexpectedResponseException":
                                     i = new s.UnexpectedResponseException(t.message, t.status);
                                     break;
                                 case "UnknownErrorException":
                                     i = new s.UnknownErrorException(t.message, t.details);
                                     break;
                                 default:
                                     (0, s.unreachable)("DocException - expected a valid Error.");
                             }
                             e._capability.reject(i);
                         });
                         t.on("PasswordRequest", (t) => {
                             this.#Z = new s.PromiseCapability();
                             if (e.onPassword) {
                                 const updatePassword = (t) => {
                                     t instanceof Error ? this.#Z.reject(t) : this.#Z.resolve({ password: t });
                                 };
                                 try {
                                     e.onPassword(updatePassword, t.code);
                                 } catch (t) {
                                     this.#Z.reject(t);
                                 }
                             } else this.#Z.reject(new s.PasswordException(t.message, t.code));
                             return this.#Z.promise;
                         });
                         t.on("DataLoaded", (t) => {
                             e.onProgress?.({ loaded: t.length, total: t.length });
                             this.downloadInfoCapability.resolve(t);
                         });
                         t.on("StartRenderPage", (t) => {
                             if (this.destroyed) return;
                             this.#J.get(t.pageIndex)._startRenderPage(t.transparency, t.cacheKey);
                         });
                         t.on("commonobj", (e) => {
                             let [i, n, r] = e;
                             if (this.destroyed) return null;
                             if (this.commonObjs.has(i)) return null;
                             switch (n) {
                                 case "Font":
                                     const e = this._params;
                                     if ("error" in r) {
                                         const t = r.error;
                                         (0, s.warn)(`Error during font loading: ${t}`);
                                         this.commonObjs.resolve(i, t);
                                         break;
                                     }
                                     const a = e.pdfBug && globalThis.FontInspector?.enabled ? (t, e) => globalThis.FontInspector.fontAdded(t, e) : null,
                                         l = new o.FontFaceObject(r, { isEvalSupported: e.isEvalSupported, disableFontFace: e.disableFontFace, ignoreErrors: e.ignoreErrors, inspectFont: a });
                                     this.fontLoader
                                         .bind(l)
                                         .catch((e) => t.sendWithPromise("FontFallback", { id: i }))
                                         .finally(() => {
                                             !e.fontExtraProperties && l.data && (l.data = null);
                                             this.commonObjs.resolve(i, l);
                                         });
                                     break;
                                 case "CopyLocalImage":
                                     const { imageRef: h } = r;
                                     (0, s.assert)(h, "The imageRef must be defined.");
                                     for (const t of this.#J.values())
                                         for (const [, e] of t.objs)
                                             if (e.ref === h) {
                                                 if (!e.dataLen) return null;
                                                 this.commonObjs.resolve(i, structuredClone(e));
                                                 return e.dataLen;
                                             }
                                     break;
                                 case "FontPath":
                                 case "Image":
                                 case "Pattern":
                                     this.commonObjs.resolve(i, r);
                                     break;
                                 default:
                                     throw new Error(`Got unknown common object type ${n}`);
                             }
                             return null;
                         });
                         t.on("obj", (t) => {
                             let [e, i, n, r] = t;
                             if (this.destroyed) return;
                             const a = this.#J.get(i);
                             if (!a.objs.has(e))
                                 if (0 !== a._intentStates.size)
                                     switch (n) {
                                         case "Image":
                                             a.objs.resolve(e, r);
                                             r?.dataLen > s.MAX_IMAGE_SIZE_TO_CACHE && (a._maybeCleanupAfterRender = !0);
                                             break;
                                         case "Pattern":
                                             a.objs.resolve(e, r);
                                             break;
                                         default:
                                             throw new Error(`Got unknown object type ${n}`);
                                     }
                                 else r?.bitmap?.close();
                         });
                         t.on("DocProgress", (t) => {
                             this.destroyed || e.onProgress?.({ loaded: t.loaded, total: t.total });
                         });
                         t.on("FetchBuiltInCMap", (t) =>
                             this.destroyed
                                 ? Promise.reject(new Error("Worker was destroyed."))
                                 : this.cMapReaderFactory
                                 ? this.cMapReaderFactory.fetch(t)
                                 : Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."))
                         );
                         t.on("FetchStandardFontData", (t) =>
                             this.destroyed
                                 ? Promise.reject(new Error("Worker was destroyed."))
                                 : this.standardFontDataFactory
                                 ? this.standardFontDataFactory.fetch(t)
                                 : Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."))
                         );
                     }
                     getData() {
                         return this.messageHandler.sendWithPromise("GetData", null);
                     }
                     saveDocument() {
                         this.annotationStorage.size <= 0 && (0, s.warn)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
                         const { map: t, transfer: e } = this.annotationStorage.serializable;
                         return this.messageHandler.sendWithPromise("SaveDocument", { isPureXfa: !!this._htmlForXfa, numPages: this._numPages, annotationStorage: t, filename: this._fullReader?.filename ?? null }, e).finally(() => {
                             this.annotationStorage.resetModified();
                         });
                     }
                     getPage(t) {
                         if (!Number.isInteger(t) || t <= 0 || t > this._numPages) return Promise.reject(new Error("Invalid page request."));
                         const e = t - 1,
                             i = this.#Q.get(e);
                         if (i) return i;
                         const n = this.messageHandler.sendWithPromise("GetPage", { pageIndex: e }).then((t) => {
                             if (this.destroyed) throw new Error("Transport destroyed");
                             const i = new PDFPageProxy(e, t, this, this._params.pdfBug);
                             this.#J.set(e, i);
                             return i;
                         });
                         this.#Q.set(e, n);
                         return n;
                     }
                     getPageIndex(t) {
                         return "object" != typeof t || null === t || !Number.isInteger(t.num) || t.num < 0 || !Number.isInteger(t.gen) || t.gen < 0
                             ? Promise.reject(new Error("Invalid pageIndex request."))
                             : this.messageHandler.sendWithPromise("GetPageIndex", { num: t.num, gen: t.gen });
                     }
                     getAnnotations(t, e) {
                         return this.messageHandler.sendWithPromise("GetAnnotations", { pageIndex: t, intent: e });
                     }
                     getFieldObjects() {
                         return this.#tt("GetFieldObjects");
                     }
                     hasJSActions() {
                         return this.#tt("HasJSActions");
                     }
                     getCalculationOrderIds() {
                         return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
                     }
                     getDestinations() {
                         return this.messageHandler.sendWithPromise("GetDestinations", null);
                     }
                     getDestination(t) {
                         return "string" != typeof t ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", { id: t });
                     }
                     getPageLabels() {
                         return this.messageHandler.sendWithPromise("GetPageLabels", null);
                     }
                     getPageLayout() {
                         return this.messageHandler.sendWithPromise("GetPageLayout", null);
                     }
                     getPageMode() {
                         return this.messageHandler.sendWithPromise("GetPageMode", null);
                     }
                     getViewerPreferences() {
                         return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
                     }
                     getOpenAction() {
                         return this.messageHandler.sendWithPromise("GetOpenAction", null);
                     }
                     getAttachments() {
                         return this.messageHandler.sendWithPromise("GetAttachments", null);
                     }
                     getDocJSActions() {
                         return this.#tt("GetDocJSActions");
                     }
                     getPageJSActions(t) {
                         return this.messageHandler.sendWithPromise("GetPageJSActions", { pageIndex: t });
                     }
                     getStructTree(t) {
                         return this.messageHandler.sendWithPromise("GetStructTree", { pageIndex: t });
                     }
                     getOutline() {
                         return this.messageHandler.sendWithPromise("GetOutline", null);
                     }
                     getOptionalContentConfig() {
                         return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then((t) => new p.OptionalContentConfig(t));
                     }
                     getPermissions() {
                         return this.messageHandler.sendWithPromise("GetPermissions", null);
                     }
                     getMetadata() {
                         const t = "GetMetadata",
                             e = this.#Y.get(t);
                         if (e) return e;
                         const i = this.messageHandler
                             .sendWithPromise(t, null)
                             .then((t) => ({ info: t[0], metadata: t[1] ? new u.Metadata(t[1]) : null, contentDispositionFilename: this._fullReader?.filename ?? null, contentLength: this._fullReader?.contentLength ?? null }));
                         this.#Y.set(t, i);
                         return i;
                     }
                     getMarkInfo() {
                         return this.messageHandler.sendWithPromise("GetMarkInfo", null);
                     }
                     async startCleanup() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                         if (!this.destroyed) {
                             await this.messageHandler.sendWithPromise("Cleanup", null);
                             for (const t of this.#J.values()) {
                                 if (!t.cleanup()) throw new Error(`startCleanup: Page ${t.pageNumber} is currently rendering.`);
                             }
                             this.commonObjs.clear();
                             t || this.fontLoader.clear();
                             this.#Y.clear();
                             this.filterFactory.destroy(!0);
                         }
                     }
                     get loadingParams() {
                         const { disableAutoFetch: t, enableXfa: e } = this._params;
                         return (0, s.shadow)(this, "loadingParams", { disableAutoFetch: t, enableXfa: e });
                     }
                 }
                 class PDFObjects {
                     #et = Object.create(null);
                     #it(t) {
                         return (this.#et[t] ||= { capability: new s.PromiseCapability(), data: null });
                     }
                     get(t) {
                         let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                         if (e) {
                             const i = this.#it(t);
                             i.capability.promise.then(() => e(i.data));
                             return null;
                         }
                         const i = this.#et[t];
                         if (!i?.capability.settled) throw new Error(`Requesting object that isn't resolved yet ${t}.`);
                         return i.data;
                     }
                     has(t) {
                         const e = this.#et[t];
                         return e?.capability.settled ?? !1;
                     }
                     resolve(t) {
                         let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                         const i = this.#it(t);
                         i.data = e;
                         i.capability.resolve();
                     }
                     clear() {
                         for (const t in this.#et) {
                             const { data: e } = this.#et[t];
                             e?.bitmap?.close();
                         }
                         this.#et = Object.create(null);
                     }
                     *[Symbol.iterator]() {
                         for (const t in this.#et) {
                             const { capability: e, data: i } = this.#et[t];
                             e.settled && (yield [t, i]);
                         }
                     }
                 }
                 class RenderTask {
                     #nt = null;
                     constructor(t) {
                         this.#nt = t;
                         this.onContinue = null;
                     }
                     get promise() {
                         return this.#nt.capability.promise;
                     }
                     cancel() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                         this.#nt.cancel(null, t);
                     }
                     get separateAnnots() {
                         const { separateAnnots: t } = this.#nt.operatorList;
                         if (!t) return !1;
                         const { annotationCanvasMap: e } = this.#nt;
                         return t.form || (t.canvas && e?.size > 0);
                     }
                 }
                 class InternalRenderTask {
                     static #st = new WeakSet();
                     constructor(t) {
                         let {
                             callback: e,
                             params: i,
                             objs: n,
                             commonObjs: r,
                             annotationCanvasMap: a,
                             operatorList: o,
                             pageIndex: l,
                             canvasFactory: h,
                             filterFactory: c,
                             useRequestAnimationFrame: d = !1,
                             pdfBug: u = !1,
                             pageColors: p = null,
                         } = t;
                         this.callback = e;
                         this.params = i;
                         this.objs = n;
                         this.commonObjs = r;
                         this.annotationCanvasMap = a;
                         this.operatorListIdx = null;
                         this.operatorList = o;
                         this._pageIndex = l;
                         this.canvasFactory = h;
                         this.filterFactory = c;
                         this._pdfBug = u;
                         this.pageColors = p;
                         this.running = !1;
                         this.graphicsReadyCallback = null;
                         this.graphicsReady = !1;
                         this._useRequestAnimationFrame = !0 === d && "undefined" != typeof window;
                         this.cancelled = !1;
                         this.capability = new s.PromiseCapability();
                         this.task = new RenderTask(this);
                         this._cancelBound = this.cancel.bind(this);
                         this._continueBound = this._continue.bind(this);
                         this._scheduleNextBound = this._scheduleNext.bind(this);
                         this._nextBound = this._next.bind(this);
                         this._canvas = i.canvasContext.canvas;
                     }
                     get completed() {
                         return this.capability.promise.catch(function () {});
                     }
                     initializeGraphics(t) {
                         let { transparency: e = !1, optionalContentConfig: i } = t;
                         if (this.cancelled) return;
                         if (this._canvas) {
                             if (InternalRenderTask.#st.has(this._canvas))
                                 throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                             InternalRenderTask.#st.add(this._canvas);
                         }
                         if (this._pdfBug && globalThis.StepperManager?.enabled) {
                             this.stepper = globalThis.StepperManager.create(this._pageIndex);
                             this.stepper.init(this.operatorList);
                             this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
                         }
                         const { canvasContext: n, viewport: s, transform: r, background: a } = this.params;
                         this.gfx = new h.CanvasGraphics(n, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, { optionalContentConfig: i }, this.annotationCanvasMap, this.pageColors);
                         this.gfx.beginDrawing({ transform: r, viewport: s, transparency: e, background: a });
                         this.operatorListIdx = 0;
                         this.graphicsReady = !0;
                         this.graphicsReadyCallback?.();
                     }
                     cancel() {
                         let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                             e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                         this.running = !1;
                         this.cancelled = !0;
                         this.gfx?.endDrawing();
                         InternalRenderTask.#st.delete(this._canvas);
                         this.callback(t || new a.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, e));
                     }
                     operatorListChanged() {
                         if (this.graphicsReady) {
                             this.stepper?.updateOperatorList(this.operatorList);
                             this.running || this._continue();
                         } else this.graphicsReadyCallback ||= this._continueBound;
                     }
                     _continue() {
                         this.running = !0;
                         this.cancelled || (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
                     }
                     _scheduleNext() {
                         this._useRequestAnimationFrame
                             ? window.requestAnimationFrame(() => {
                                   this._nextBound().catch(this._cancelBound);
                               })
                             : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
                     }
                     async _next() {
                         if (!this.cancelled) {
                             this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);
                             if (this.operatorListIdx === this.operatorList.argsArray.length) {
                                 this.running = !1;
                                 if (this.operatorList.lastChunk) {
                                     this.gfx.endDrawing();
                                     InternalRenderTask.#st.delete(this._canvas);
                                     this.callback();
                                 }
                             }
                         }
                     }
                 }
                 const P = "4.0.379",
                     M = "9e14d04fd";
                 n();
             } catch (R) {
                 n(R);
             }
         });
     },
     6822: (t, e, i) => {
         i.d(e, {
             BaseCMapReaderFactory: () => BaseCMapReaderFactory,
             BaseCanvasFactory: () => BaseCanvasFactory,
             BaseFilterFactory: () => BaseFilterFactory,
             BaseSVGFactory: () => BaseSVGFactory,
             BaseStandardFontDataFactory: () => BaseStandardFontDataFactory,
         });
         i(3352);
         var n = i(3266);
         class BaseFilterFactory {
             constructor() {
                 this.constructor === BaseFilterFactory && (0, n.unreachable)("Cannot initialize BaseFilterFactory.");
             }
             addFilter(t) {
                 return "none";
             }
             addHCMFilter(t, e) {
                 return "none";
             }
             addHighlightHCMFilter(t, e, i, n) {
                 return "none";
             }
             destroy() {}
         }
         class BaseCanvasFactory {
             constructor() {
                 this.constructor === BaseCanvasFactory && (0, n.unreachable)("Cannot initialize BaseCanvasFactory.");
             }
             create(t, e) {
                 if (t <= 0 || e <= 0) throw new Error("Invalid canvas size");
                 const i = this._createCanvas(t, e);
                 return { canvas: i, context: i.getContext("2d") };
             }
             reset(t, e, i) {
                 if (!t.canvas) throw new Error("Canvas is not specified");
                 if (e <= 0 || i <= 0) throw new Error("Invalid canvas size");
                 t.canvas.width = e;
                 t.canvas.height = i;
             }
             destroy(t) {
                 if (!t.canvas) throw new Error("Canvas is not specified");
                 t.canvas.width = 0;
                 t.canvas.height = 0;
                 t.canvas = null;
                 t.context = null;
             }
             _createCanvas(t, e) {
                 (0, n.unreachable)("Abstract method `_createCanvas` called.");
             }
         }
         class BaseCMapReaderFactory {
             constructor(t) {
                 let { baseUrl: e = null, isCompressed: i = !0 } = t;
                 this.constructor === BaseCMapReaderFactory && (0, n.unreachable)("Cannot initialize BaseCMapReaderFactory.");
                 this.baseUrl = e;
                 this.isCompressed = i;
             }
             async fetch(t) {
                 let { name: e } = t;
                 if (!this.baseUrl) throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
                 if (!e) throw new Error("CMap name must be specified.");
                 const i = this.baseUrl + e + (this.isCompressed ? ".bcmap" : ""),
                     s = this.isCompressed ? n.CMapCompressionType.BINARY : n.CMapCompressionType.NONE;
                 return this._fetchData(i, s).catch((t) => {
                     throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${i}`);
                 });
             }
             _fetchData(t, e) {
                 (0, n.unreachable)("Abstract method `_fetchData` called.");
             }
         }
         class BaseStandardFontDataFactory {
             constructor(t) {
                 let { baseUrl: e = null } = t;
                 this.constructor === BaseStandardFontDataFactory && (0, n.unreachable)("Cannot initialize BaseStandardFontDataFactory.");
                 this.baseUrl = e;
             }
             async fetch(t) {
                 let { filename: e } = t;
                 if (!this.baseUrl) throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
                 if (!e) throw new Error("Font filename must be specified.");
                 const i = `${this.baseUrl}${e}`;
                 return this._fetchData(i).catch((t) => {
                     throw new Error(`Unable to load font data at: ${i}`);
                 });
             }
             _fetchData(t) {
                 (0, n.unreachable)("Abstract method `_fetchData` called.");
             }
         }
         class BaseSVGFactory {
             constructor() {
                 this.constructor === BaseSVGFactory && (0, n.unreachable)("Cannot initialize BaseSVGFactory.");
             }
             create(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                 if (t <= 0 || e <= 0) throw new Error("Invalid SVG dimensions");
                 const n = this._createSVG("svg:svg");
                 n.setAttribute("version", "1.1");
                 if (!i) {
                     n.setAttribute("width", `${t}px`);
                     n.setAttribute("height", `${e}px`);
                 }
                 n.setAttribute("preserveAspectRatio", "none");
                 n.setAttribute("viewBox", `0 0 ${t} ${e}`);
                 return n;
             }
             createElement(t) {
                 if ("string" != typeof t) throw new Error("Invalid SVG element type");
                 return this._createSVG(t);
             }
             _createSVG(t) {
                 (0, n.unreachable)("Abstract method `_createSVG` called.");
             }
         }
     },
     1250: (t, e, i) => {
         i.d(e, { CanvasGraphics: () => CanvasGraphics });
         i(3352), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(7121), i(2993), i(4226), i(7944);
         var n = i(3266),
             s = i(473);
         const r = "Fill",
             a = "Stroke",
             o = "Shading";
         function applyBoundingBox(t, e) {
             if (!e) return;
             const i = e[2] - e[0],
                 n = e[3] - e[1],
                 s = new Path2D();
             s.rect(e[0], e[1], i, n);
             t.clip(s);
         }
         class BaseShadingPattern {
             constructor() {
                 this.constructor === BaseShadingPattern && (0, n.unreachable)("Cannot initialize BaseShadingPattern.");
             }
             getPattern() {
                 (0, n.unreachable)("Abstract method `getPattern` called.");
             }
         }
         class RadialAxialShadingPattern extends BaseShadingPattern {
             constructor(t) {
                 super();
                 this._type = t[1];
                 this._bbox = t[2];
                 this._colorStops = t[3];
                 this._p0 = t[4];
                 this._p1 = t[5];
                 this._r0 = t[6];
                 this._r1 = t[7];
                 this.matrix = null;
             }
             _createGradient(t) {
                 let e;
                 "axial" === this._type
                     ? (e = t.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]))
                     : "radial" === this._type && (e = t.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1));
                 for (const t of this._colorStops) e.addColorStop(t[0], t[1]);
                 return e;
             }
             getPattern(t, e, i, o) {
                 let l;
                 if (o === a || o === r) {
                     const r = e.current.getClippedPathBoundingBox(o, (0, s.getCurrentTransform)(t)) || [0, 0, 0, 0],
                         a = Math.ceil(r[2] - r[0]) || 1,
                         h = Math.ceil(r[3] - r[1]) || 1,
                         c = e.cachedCanvases.getCanvas("pattern", a, h, !0),
                         d = c.context;
                     d.clearRect(0, 0, d.canvas.width, d.canvas.height);
                     d.beginPath();
                     d.rect(0, 0, d.canvas.width, d.canvas.height);
                     d.translate(-r[0], -r[1]);
                     i = n.Util.transform(i, [1, 0, 0, 1, r[0], r[1]]);
                     d.transform(...e.baseTransform);
                     this.matrix && d.transform(...this.matrix);
                     applyBoundingBox(d, this._bbox);
                     d.fillStyle = this._createGradient(d);
                     d.fill();
                     l = t.createPattern(c.canvas, "no-repeat");
                     const u = new DOMMatrix(i);
                     l.setTransform(u);
                 } else {
                     applyBoundingBox(t, this._bbox);
                     l = this._createGradient(t);
                 }
                 return l;
             }
         }
         function drawTriangle(t, e, i, n, s, r, a, o) {
             const l = e.coords,
                 h = e.colors,
                 c = t.data,
                 d = 4 * t.width;
             let u;
             if (l[i + 1] > l[n + 1]) {
                 u = i;
                 i = n;
                 n = u;
                 u = r;
                 r = a;
                 a = u;
             }
             if (l[n + 1] > l[s + 1]) {
                 u = n;
                 n = s;
                 s = u;
                 u = a;
                 a = o;
                 o = u;
             }
             if (l[i + 1] > l[n + 1]) {
                 u = i;
                 i = n;
                 n = u;
                 u = r;
                 r = a;
                 a = u;
             }
             const p = (l[i] + e.offsetX) * e.scaleX,
                 g = (l[i + 1] + e.offsetY) * e.scaleY,
                 f = (l[n] + e.offsetX) * e.scaleX,
                 m = (l[n + 1] + e.offsetY) * e.scaleY,
                 v = (l[s] + e.offsetX) * e.scaleX,
                 b = (l[s + 1] + e.offsetY) * e.scaleY;
             if (g >= b) return;
             const y = h[r],
                 A = h[r + 1],
                 E = h[r + 2],
                 w = h[a],
                 x = h[a + 1],
                 _ = h[a + 2],
                 S = h[o],
                 C = h[o + 1],
                 T = h[o + 2],
                 P = Math.round(g),
                 M = Math.round(b);
             let R, k, D, I, L, O, B, N;
             for (let t = P; t <= M; t++) {
                 if (t < m) {
                     const e = t < g ? 0 : (g - t) / (g - m);
                     R = p - (p - f) * e;
                     k = y - (y - w) * e;
                     D = A - (A - x) * e;
                     I = E - (E - _) * e;
                 } else {
                     let e;
                     e = t > b ? 1 : m === b ? 0 : (m - t) / (m - b);
                     R = f - (f - v) * e;
                     k = w - (w - S) * e;
                     D = x - (x - C) * e;
                     I = _ - (_ - T) * e;
                 }
                 let e;
                 e = t < g ? 0 : t > b ? 1 : (g - t) / (g - b);
                 L = p - (p - v) * e;
                 O = y - (y - S) * e;
                 B = A - (A - C) * e;
                 N = E - (E - T) * e;
                 const i = Math.round(Math.min(R, L)),
                     n = Math.round(Math.max(R, L));
                 let s = d * t + 4 * i;
                 for (let t = i; t <= n; t++) {
                     e = (R - t) / (R - L);
                     e < 0 ? (e = 0) : e > 1 && (e = 1);
                     c[s++] = (k - (k - O) * e) | 0;
                     c[s++] = (D - (D - B) * e) | 0;
                     c[s++] = (I - (I - N) * e) | 0;
                     c[s++] = 255;
                 }
             }
         }
         function drawFigure(t, e, i) {
             const n = e.coords,
                 s = e.colors;
             let r, a;
             switch (e.type) {
                 case "lattice":
                     const o = e.verticesPerRow,
                         l = Math.floor(n.length / o) - 1,
                         h = o - 1;
                     for (r = 0; r < l; r++) {
                         let e = r * o;
                         for (let r = 0; r < h; r++, e++) {
                             drawTriangle(t, i, n[e], n[e + 1], n[e + o], s[e], s[e + 1], s[e + o]);
                             drawTriangle(t, i, n[e + o + 1], n[e + 1], n[e + o], s[e + o + 1], s[e + 1], s[e + o]);
                         }
                     }
                     break;
                 case "triangles":
                     for (r = 0, a = n.length; r < a; r += 3) drawTriangle(t, i, n[r], n[r + 1], n[r + 2], s[r], s[r + 1], s[r + 2]);
                     break;
                 default:
                     throw new Error("illegal figure");
             }
         }
         class MeshShadingPattern extends BaseShadingPattern {
             constructor(t) {
                 super();
                 this._coords = t[2];
                 this._colors = t[3];
                 this._figures = t[4];
                 this._bounds = t[5];
                 this._bbox = t[7];
                 this._background = t[8];
                 this.matrix = null;
             }
             _createMeshCanvas(t, e, i) {
                 const n = Math.floor(this._bounds[0]),
                     s = Math.floor(this._bounds[1]),
                     r = Math.ceil(this._bounds[2]) - n,
                     a = Math.ceil(this._bounds[3]) - s,
                     o = Math.min(Math.ceil(Math.abs(r * t[0] * 1.1)), 3e3),
                     l = Math.min(Math.ceil(Math.abs(a * t[1] * 1.1)), 3e3),
                     h = r / o,
                     c = a / l,
                     d = { coords: this._coords, colors: this._colors, offsetX: -n, offsetY: -s, scaleX: 1 / h, scaleY: 1 / c },
                     u = o + 4,
                     p = l + 4,
                     g = i.getCanvas("mesh", u, p, !1),
                     f = g.context,
                     m = f.createImageData(o, l);
                 if (e) {
                     const t = m.data;
                     for (let i = 0, n = t.length; i < n; i += 4) {
                         t[i] = e[0];
                         t[i + 1] = e[1];
                         t[i + 2] = e[2];
                         t[i + 3] = 255;
                     }
                 }
                 for (const t of this._figures) drawFigure(m, t, d);
                 f.putImageData(m, 2, 2);
                 return { canvas: g.canvas, offsetX: n - 2 * h, offsetY: s - 2 * c, scaleX: h, scaleY: c };
             }
             getPattern(t, e, i, r) {
                 applyBoundingBox(t, this._bbox);
                 let a;
                 if (r === o) a = n.Util.singularValueDecompose2dScale((0, s.getCurrentTransform)(t));
                 else {
                     a = n.Util.singularValueDecompose2dScale(e.baseTransform);
                     if (this.matrix) {
                         const t = n.Util.singularValueDecompose2dScale(this.matrix);
                         a = [a[0] * t[0], a[1] * t[1]];
                     }
                 }
                 const l = this._createMeshCanvas(a, r === o ? null : this._background, e.cachedCanvases);
                 if (r !== o) {
                     t.setTransform(...e.baseTransform);
                     this.matrix && t.transform(...this.matrix);
                 }
                 t.translate(l.offsetX, l.offsetY);
                 t.scale(l.scaleX, l.scaleY);
                 return t.createPattern(l.canvas, "no-repeat");
             }
         }
         class DummyShadingPattern extends BaseShadingPattern {
             getPattern() {
                 return "hotpink";
             }
         }
         const l = 1,
             h = 2;
         class TilingPattern {
             static MAX_PATTERN_SIZE = 3e3;
             constructor(t, e, i, n, s) {
                 this.operatorList = t[2];
                 this.matrix = t[3] || [1, 0, 0, 1, 0, 0];
                 this.bbox = t[4];
                 this.xstep = t[5];
                 this.ystep = t[6];
                 this.paintType = t[7];
                 this.tilingType = t[8];
                 this.color = e;
                 this.ctx = i;
                 this.canvasGraphicsFactory = n;
                 this.baseTransform = s;
             }
             createPatternCanvas(t) {
                 const e = this.operatorList,
                     i = this.bbox,
                     r = this.xstep,
                     a = this.ystep,
                     o = this.paintType,
                     l = this.tilingType,
                     h = this.color,
                     c = this.canvasGraphicsFactory;
                 (0, n.info)("TilingType: " + l);
                 const d = i[0],
                     u = i[1],
                     p = i[2],
                     g = i[3],
                     f = n.Util.singularValueDecompose2dScale(this.matrix),
                     m = n.Util.singularValueDecompose2dScale(this.baseTransform),
                     v = [f[0] * m[0], f[1] * m[1]],
                     b = this.getSizeAndScale(r, this.ctx.canvas.width, v[0]),
                     y = this.getSizeAndScale(a, this.ctx.canvas.height, v[1]),
                     A = t.cachedCanvases.getCanvas("pattern", b.size, y.size, !0),
                     E = A.context,
                     w = c.createCanvasGraphics(E);
                 w.groupLevel = t.groupLevel;
                 this.setFillAndStrokeStyleToContext(w, o, h);
                 let x = d,
                     _ = u,
                     S = p,
                     C = g;
                 if (d < 0) {
                     x = 0;
                     S += Math.abs(d);
                 }
                 if (u < 0) {
                     _ = 0;
                     C += Math.abs(u);
                 }
                 E.translate(-b.scale * x, -y.scale * _);
                 w.transform(b.scale, 0, 0, y.scale, 0, 0);
                 E.save();
                 this.clipBbox(w, x, _, S, C);
                 w.baseTransform = (0, s.getCurrentTransform)(w.ctx);
                 w.executeOperatorList(e);
                 w.endDrawing();
                 return { canvas: A.canvas, scaleX: b.scale, scaleY: y.scale, offsetX: x, offsetY: _ };
             }
             getSizeAndScale(t, e, i) {
                 t = Math.abs(t);
                 const n = Math.max(TilingPattern.MAX_PATTERN_SIZE, e);
                 let s = Math.ceil(t * i);
                 s >= n ? (s = n) : (i = s / t);
                 return { scale: i, size: s };
             }
             clipBbox(t, e, i, n, r) {
                 const a = n - e,
                     o = r - i;
                 t.ctx.rect(e, i, a, o);
                 t.current.updateRectMinMax((0, s.getCurrentTransform)(t.ctx), [e, i, n, r]);
                 t.clip();
                 t.endPath();
             }
             setFillAndStrokeStyleToContext(t, e, i) {
                 const s = t.ctx,
                     r = t.current;
                 switch (e) {
                     case l:
                         const t = this.ctx;
                         s.fillStyle = t.fillStyle;
                         s.strokeStyle = t.strokeStyle;
                         r.fillColor = t.fillStyle;
                         r.strokeColor = t.strokeStyle;
                         break;
                     case h:
                         const a = n.Util.makeHexColor(i[0], i[1], i[2]);
                         s.fillStyle = a;
                         s.strokeStyle = a;
                         r.fillColor = a;
                         r.strokeColor = a;
                         break;
                     default:
                         throw new n.FormatError(`Unsupported paint type: ${e}`);
                 }
             }
             getPattern(t, e, i, s) {
                 let r = i;
                 if (s !== o) {
                     r = n.Util.transform(r, e.baseTransform);
                     this.matrix && (r = n.Util.transform(r, this.matrix));
                 }
                 const a = this.createPatternCanvas(e);
                 let l = new DOMMatrix(r);
                 l = l.translate(a.offsetX, a.offsetY);
                 l = l.scale(1 / a.scaleX, 1 / a.scaleY);
                 const h = t.createPattern(a.canvas, "repeat");
                 h.setTransform(l);
                 return h;
             }
         }
         function convertBlackAndWhiteToRGBA(t) {
             let { src: e, srcPos: i = 0, dest: s, width: r, height: a, nonBlackColor: o = 4294967295, inverseDecode: l = !1 } = t;
             const h = n.FeatureTest.isLittleEndian ? 4278190080 : 255,
                 [c, d] = l ? [o, h] : [h, o],
                 u = r >> 3,
                 p = 7 & r,
                 g = e.length;
             s = new Uint32Array(s.buffer);
             let f = 0;
             for (let t = 0; t < a; t++) {
                 for (const t = i + u; i < t; i++) {
                     const t = i < g ? e[i] : 255;
                     s[f++] = 128 & t ? d : c;
                     s[f++] = 64 & t ? d : c;
                     s[f++] = 32 & t ? d : c;
                     s[f++] = 16 & t ? d : c;
                     s[f++] = 8 & t ? d : c;
                     s[f++] = 4 & t ? d : c;
                     s[f++] = 2 & t ? d : c;
                     s[f++] = 1 & t ? d : c;
                 }
                 if (0 === p) continue;
                 const t = i < g ? e[i++] : 255;
                 for (let e = 0; e < p; e++) s[f++] = t & (1 << (7 - e)) ? d : c;
             }
             return { srcPos: i, destPos: f };
         }
         const c = 4096,
             d = 16;
         class CachedCanvases {
             constructor(t) {
                 this.canvasFactory = t;
                 this.cache = Object.create(null);
             }
             getCanvas(t, e, i) {
                 let n;
                 if (void 0 !== this.cache[t]) {
                     n = this.cache[t];
                     this.canvasFactory.reset(n, e, i);
                 } else {
                     n = this.canvasFactory.create(e, i);
                     this.cache[t] = n;
                 }
                 return n;
             }
             delete(t) {
                 delete this.cache[t];
             }
             clear() {
                 for (const t in this.cache) {
                     const e = this.cache[t];
                     this.canvasFactory.destroy(e);
                     delete this.cache[t];
                 }
             }
         }
         function drawImageAtIntegerCoords(t, e, i, n, r, a, o, l, h, c) {
             const [d, u, p, g, f, m] = (0, s.getCurrentTransform)(t);
             if (0 === u && 0 === p) {
                 const s = o * d + f,
                     v = Math.round(s),
                     b = l * g + m,
                     y = Math.round(b),
                     A = (o + h) * d + f,
                     E = Math.abs(Math.round(A) - v) || 1,
                     w = (l + c) * g + m,
                     x = Math.abs(Math.round(w) - y) || 1;
                 t.setTransform(Math.sign(d), 0, 0, Math.sign(g), v, y);
                 t.drawImage(e, i, n, r, a, 0, 0, E, x);
                 t.setTransform(d, u, p, g, f, m);
                 return [E, x];
             }
             if (0 === d && 0 === g) {
                 const s = l * p + f,
                     v = Math.round(s),
                     b = o * u + m,
                     y = Math.round(b),
                     A = (l + c) * p + f,
                     E = Math.abs(Math.round(A) - v) || 1,
                     w = (o + h) * u + m,
                     x = Math.abs(Math.round(w) - y) || 1;
                 t.setTransform(0, Math.sign(u), Math.sign(p), 0, v, y);
                 t.drawImage(e, i, n, r, a, 0, 0, x, E);
                 t.setTransform(d, u, p, g, f, m);
                 return [x, E];
             }
             t.drawImage(e, i, n, r, a, o, l, h, c);
             return [Math.hypot(d, u) * h, Math.hypot(p, g) * c];
         }
         class CanvasExtraState {
             constructor(t, e) {
                 this.alphaIsShape = !1;
                 this.fontSize = 0;
                 this.fontSizeScale = 1;
                 this.textMatrix = n.IDENTITY_MATRIX;
                 this.textMatrixScale = 1;
                 this.fontMatrix = n.FONT_IDENTITY_MATRIX;
                 this.leading = 0;
                 this.x = 0;
                 this.y = 0;
                 this.lineX = 0;
                 this.lineY = 0;
                 this.charSpacing = 0;
                 this.wordSpacing = 0;
                 this.textHScale = 1;
                 this.textRenderingMode = n.TextRenderingMode.FILL;
                 this.textRise = 0;
                 this.fillColor = "#000000";
                 this.strokeColor = "#000000";
                 this.patternFill = !1;
                 this.fillAlpha = 1;
                 this.strokeAlpha = 1;
                 this.lineWidth = 1;
                 this.activeSMask = null;
                 this.transferMaps = "none";
                 this.startNewPathAndClipBox([0, 0, t, e]);
             }
             clone() {
                 const t = Object.create(this);
                 t.clipBox = this.clipBox.slice();
                 return t;
             }
             setCurrentPoint(t, e) {
                 this.x = t;
                 this.y = e;
             }
             updatePathMinMax(t, e, i) {
                 [e, i] = n.Util.applyTransform([e, i], t);
                 this.minX = Math.min(this.minX, e);
                 this.minY = Math.min(this.minY, i);
                 this.maxX = Math.max(this.maxX, e);
                 this.maxY = Math.max(this.maxY, i);
             }
             updateRectMinMax(t, e) {
                 const i = n.Util.applyTransform(e, t),
                     s = n.Util.applyTransform(e.slice(2), t),
                     r = n.Util.applyTransform([e[0], e[3]], t),
                     a = n.Util.applyTransform([e[2], e[1]], t);
                 this.minX = Math.min(this.minX, i[0], s[0], r[0], a[0]);
                 this.minY = Math.min(this.minY, i[1], s[1], r[1], a[1]);
                 this.maxX = Math.max(this.maxX, i[0], s[0], r[0], a[0]);
                 this.maxY = Math.max(this.maxY, i[1], s[1], r[1], a[1]);
             }
             updateScalingPathMinMax(t, e) {
                 n.Util.scaleMinMax(t, e);
                 this.minX = Math.min(this.minX, e[0]);
                 this.maxX = Math.max(this.maxX, e[1]);
                 this.minY = Math.min(this.minY, e[2]);
                 this.maxY = Math.max(this.maxY, e[3]);
             }
             updateCurvePathMinMax(t, e, i, s, r, a, o, l, h, c) {
                 const d = n.Util.bezierBoundingBox(e, i, s, r, a, o, l, h);
                 if (c) {
                     c[0] = Math.min(c[0], d[0], d[2]);
                     c[1] = Math.max(c[1], d[0], d[2]);
                     c[2] = Math.min(c[2], d[1], d[3]);
                     c[3] = Math.max(c[3], d[1], d[3]);
                 } else this.updateRectMinMax(t, d);
             }
             getPathBoundingBox() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
                     e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 const i = [this.minX, this.minY, this.maxX, this.maxY];
                 if (t === a) {
                     e || (0, n.unreachable)("Stroke bounding box must include transform.");
                     const t = n.Util.singularValueDecompose2dScale(e),
                         s = (t[0] * this.lineWidth) / 2,
                         r = (t[1] * this.lineWidth) / 2;
                     i[0] -= s;
                     i[1] -= r;
                     i[2] += s;
                     i[3] += r;
                 }
                 return i;
             }
             updateClipFromPath() {
                 const t = n.Util.intersect(this.clipBox, this.getPathBoundingBox());
                 this.startNewPathAndClipBox(t || [0, 0, 0, 0]);
             }
             isEmptyClip() {
                 return this.minX === 1 / 0;
             }
             startNewPathAndClipBox(t) {
                 this.clipBox = t;
                 this.minX = 1 / 0;
                 this.minY = 1 / 0;
                 this.maxX = 0;
                 this.maxY = 0;
             }
             getClippedPathBoundingBox() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
                     e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 return n.Util.intersect(this.clipBox, this.getPathBoundingBox(t, e));
             }
         }
         function putBinaryImageData(t, e) {
             if ("undefined" != typeof ImageData && e instanceof ImageData) {
                 t.putImageData(e, 0, 0);
                 return;
             }
             const i = e.height,
                 s = e.width,
                 r = i % d,
                 a = (i - r) / d,
                 o = 0 === r ? a : a + 1,
                 l = t.createImageData(s, d);
             let h,
                 c = 0;
             const u = e.data,
                 p = l.data;
             let g, f, m, v;
             if (e.kind === n.ImageKind.GRAYSCALE_1BPP) {
                 const e = u.byteLength,
                     i = new Uint32Array(p.buffer, 0, p.byteLength >> 2),
                     v = i.length,
                     b = (s + 7) >> 3,
                     y = 4294967295,
                     A = n.FeatureTest.isLittleEndian ? 4278190080 : 255;
                 for (g = 0; g < o; g++) {
                     m = g < a ? d : r;
                     h = 0;
                     for (f = 0; f < m; f++) {
                         const t = e - c;
                         let n = 0;
                         const r = t > b ? s : 8 * t - 7,
                             a = -8 & r;
                         let o = 0,
                             l = 0;
                         for (; n < a; n += 8) {
                             l = u[c++];
                             i[h++] = 128 & l ? y : A;
                             i[h++] = 64 & l ? y : A;
                             i[h++] = 32 & l ? y : A;
                             i[h++] = 16 & l ? y : A;
                             i[h++] = 8 & l ? y : A;
                             i[h++] = 4 & l ? y : A;
                             i[h++] = 2 & l ? y : A;
                             i[h++] = 1 & l ? y : A;
                         }
                         for (; n < r; n++) {
                             if (0 === o) {
                                 l = u[c++];
                                 o = 128;
                             }
                             i[h++] = l & o ? y : A;
                             o >>= 1;
                         }
                     }
                     for (; h < v; ) i[h++] = 0;
                     t.putImageData(l, 0, g * d);
                 }
             } else if (e.kind === n.ImageKind.RGBA_32BPP) {
                 f = 0;
                 v = s * d * 4;
                 for (g = 0; g < a; g++) {
                     p.set(u.subarray(c, c + v));
                     c += v;
                     t.putImageData(l, 0, f);
                     f += d;
                 }
                 if (g < o) {
                     v = s * r * 4;
                     p.set(u.subarray(c, c + v));
                     t.putImageData(l, 0, f);
                 }
             } else {
                 if (e.kind !== n.ImageKind.RGB_24BPP) throw new Error(`bad image kind: ${e.kind}`);
                 m = d;
                 v = s * m;
                 for (g = 0; g < o; g++) {
                     if (g >= a) {
                         m = r;
                         v = s * m;
                     }
                     h = 0;
                     for (f = v; f--; ) {
                         p[h++] = u[c++];
                         p[h++] = u[c++];
                         p[h++] = u[c++];
                         p[h++] = 255;
                     }
                     t.putImageData(l, 0, g * d);
                 }
             }
         }
         function putBinaryImageMask(t, e) {
             if (e.bitmap) {
                 t.drawImage(e.bitmap, 0, 0);
                 return;
             }
             const i = e.height,
                 n = e.width,
                 s = i % d,
                 r = (i - s) / d,
                 a = 0 === s ? r : r + 1,
                 o = t.createImageData(n, d);
             let l = 0;
             const h = e.data,
                 c = o.data;
             for (let e = 0; e < a; e++) {
                 const i = e < r ? d : s;
                 ({ srcPos: l } = convertBlackAndWhiteToRGBA({ src: h, srcPos: l, dest: c, width: n, height: i, nonBlackColor: 0 }));
                 t.putImageData(o, 0, e * d);
             }
         }
         function copyCtxState(t, e) {
             const i = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
             for (const n of i) void 0 !== t[n] && (e[n] = t[n]);
             if (void 0 !== t.setLineDash) {
                 e.setLineDash(t.getLineDash());
                 e.lineDashOffset = t.lineDashOffset;
             }
         }
         function resetCtxToDefault(t) {
             t.strokeStyle = t.fillStyle = "#000000";
             t.fillRule = "nonzero";
             t.globalAlpha = 1;
             t.lineWidth = 1;
             t.lineCap = "butt";
             t.lineJoin = "miter";
             t.miterLimit = 10;
             t.globalCompositeOperation = "source-over";
             t.font = "10px sans-serif";
             if (void 0 !== t.setLineDash) {
                 t.setLineDash([]);
                 t.lineDashOffset = 0;
             }
             if (!n.isNodeJS) {
                 const { filter: e } = t;
                 "none" !== e && "" !== e && (t.filter = "none");
             }
         }
         function composeSMaskBackdrop(t, e, i, n) {
             const s = t.length;
             for (let r = 3; r < s; r += 4) {
                 const s = t[r];
                 if (0 === s) {
                     t[r - 3] = e;
                     t[r - 2] = i;
                     t[r - 1] = n;
                 } else if (s < 255) {
                     const a = 255 - s;
                     t[r - 3] = (t[r - 3] * s + e * a) >> 8;
                     t[r - 2] = (t[r - 2] * s + i * a) >> 8;
                     t[r - 1] = (t[r - 1] * s + n * a) >> 8;
                 }
             }
         }
         function composeSMaskAlpha(t, e, i) {
             const n = t.length;
             for (let s = 3; s < n; s += 4) {
                 const n = i ? i[t[s]] : t[s];
                 e[s] = (e[s] * n * 0.00392156862745098) | 0;
             }
         }
         function composeSMaskLuminosity(t, e, i) {
             const n = t.length;
             for (let s = 3; s < n; s += 4) {
                 const n = 77 * t[s - 3] + 152 * t[s - 2] + 28 * t[s - 1];
                 e[s] = i ? (e[s] * i[n >> 8]) >> 8 : (e[s] * n) >> 16;
             }
         }
         function composeSMask(t, e, i, n) {
             const s = n[0],
                 r = n[1],
                 a = n[2] - s,
                 o = n[3] - r;
             if (0 !== a && 0 !== o) {
                 !(function genericComposeSMask(t, e, i, n, s, r, a, o, l, h, c) {
                     const d = !!r,
                         u = d ? r[0] : 0,
                         p = d ? r[1] : 0,
                         g = d ? r[2] : 0,
                         f = "Luminosity" === s ? composeSMaskLuminosity : composeSMaskAlpha,
                         m = Math.min(n, Math.ceil(1048576 / i));
                     for (let s = 0; s < n; s += m) {
                         const r = Math.min(m, n - s),
                             v = t.getImageData(o - h, s + (l - c), i, r),
                             b = e.getImageData(o, s + l, i, r);
                         d && composeSMaskBackdrop(v.data, u, p, g);
                         f(v.data, b.data, a);
                         e.putImageData(b, o, s + l);
                     }
                 })(e.context, i, a, o, e.subtype, e.backdrop, e.transferMap, s, r, e.offsetX, e.offsetY);
                 t.save();
                 t.globalAlpha = 1;
                 t.globalCompositeOperation = "source-over";
                 t.setTransform(1, 0, 0, 1, 0, 0);
                 t.drawImage(i.canvas, 0, 0);
                 t.restore();
             }
         }
         function getImageSmoothingEnabled(t, e) {
             const i = n.Util.singularValueDecompose2dScale(t);
             i[0] = Math.fround(i[0]);
             i[1] = Math.fround(i[1]);
             const r = Math.fround((globalThis.devicePixelRatio || 1) * s.PixelsPerInch.PDF_TO_CSS_UNITS);
             return void 0 !== e ? e : i[0] <= r || i[1] <= r;
         }
         const u = ["butt", "round", "square"],
             p = ["miter", "round", "bevel"],
             g = {},
             f = {};
         class CanvasGraphics {
             constructor(t, e, i, n, s, r, a, o) {
                 let { optionalContentConfig: l, markedContentStack: h = null } = r;
                 this.ctx = t;
                 this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
                 this.stateStack = [];
                 this.pendingClip = null;
                 this.pendingEOFill = !1;
                 this.res = null;
                 this.xobjs = null;
                 this.commonObjs = e;
                 this.objs = i;
                 this.canvasFactory = n;
                 this.filterFactory = s;
                 this.groupStack = [];
                 this.processingType3 = null;
                 this.baseTransform = null;
                 this.baseTransformStack = [];
                 this.groupLevel = 0;
                 this.smaskStack = [];
                 this.smaskCounter = 0;
                 this.tempSMask = null;
                 this.suspendedCtx = null;
                 this.contentVisible = !0;
                 this.markedContentStack = h || [];
                 this.optionalContentConfig = l;
                 this.cachedCanvases = new CachedCanvases(this.canvasFactory);
                 this.cachedPatterns = new Map();
                 this.annotationCanvasMap = a;
                 this.viewportScale = 1;
                 this.outputScaleX = 1;
                 this.outputScaleY = 1;
                 this.pageColors = o;
                 this._cachedScaleForStroking = [-1, 0];
                 this._cachedGetSinglePixelWidth = null;
                 this._cachedBitmapsMap = new Map();
             }
             getObject(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 return "string" == typeof t ? (t.startsWith("g_") ? this.commonObjs.get(t) : this.objs.get(t)) : e;
             }
             beginDrawing(t) {
                 let { transform: e, viewport: i, transparency: n = !1, background: r = null } = t;
                 const a = this.ctx.canvas.width,
                     o = this.ctx.canvas.height,
                     l = this.ctx.fillStyle;
                 this.ctx.fillStyle = r || "#ffffff";
                 this.ctx.fillRect(0, 0, a, o);
                 this.ctx.fillStyle = l;
                 if (n) {
                     const t = this.cachedCanvases.getCanvas("transparent", a, o);
                     this.compositeCtx = this.ctx;
                     this.transparentCanvas = t.canvas;
                     this.ctx = t.context;
                     this.ctx.save();
                     this.ctx.transform(...(0, s.getCurrentTransform)(this.compositeCtx));
                 }
                 this.ctx.save();
                 resetCtxToDefault(this.ctx);
                 if (e) {
                     this.ctx.transform(...e);
                     this.outputScaleX = e[0];
                     this.outputScaleY = e[0];
                 }
                 this.ctx.transform(...i.transform);
                 this.viewportScale = i.scale;
                 this.baseTransform = (0, s.getCurrentTransform)(this.ctx);
             }
             executeOperatorList(t, e, i, s) {
                 const r = t.argsArray,
                     a = t.fnArray;
                 let o = e || 0;
                 const l = r.length;
                 if (l === o) return o;
                 const h = l - o > 10 && "function" == typeof i,
                     c = h ? Date.now() + 15 : 0;
                 let d = 0;
                 const u = this.commonObjs,
                     p = this.objs;
                 let g;
                 for (;;) {
                     if (void 0 !== s && o === s.nextBreakPoint) {
                         s.breakIt(o, i);
                         return o;
                     }
                     g = a[o];
                     if (g !== n.OPS.dependency) this[g].apply(this, r[o]);
                     else
                         for (const t of r[o]) {
                             const e = t.startsWith("g_") ? u : p;
                             if (!e.has(t)) {
                                 e.get(t, i);
                                 return o;
                             }
                         }
                     o++;
                     if (o === l) return o;
                     if (h && ++d > 10) {
                         if (Date.now() > c) {
                             i();
                             return o;
                         }
                         d = 0;
                     }
                 }
             }
             #rt() {
                 for (; this.stateStack.length || this.inSMaskMode; ) this.restore();
                 this.ctx.restore();
                 if (this.transparentCanvas) {
                     this.ctx = this.compositeCtx;
                     this.ctx.save();
                     this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                     this.ctx.drawImage(this.transparentCanvas, 0, 0);
                     this.ctx.restore();
                     this.transparentCanvas = null;
                 }
             }
             endDrawing() {
                 this.#rt();
                 this.cachedCanvases.clear();
                 this.cachedPatterns.clear();
                 for (const t of this._cachedBitmapsMap.values()) {
                     for (const e of t.values()) "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement && (e.width = e.height = 0);
                     t.clear();
                 }
                 this._cachedBitmapsMap.clear();
                 this.#at();
             }
             #at() {
                 if (this.pageColors) {
                     const t = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
                     if ("none" !== t) {
                         const e = this.ctx.filter;
                         this.ctx.filter = t;
                         this.ctx.drawImage(this.ctx.canvas, 0, 0);
                         this.ctx.filter = e;
                     }
                 }
             }
             _scaleImage(t, e) {
                 const i = t.width,
                     n = t.height;
                 let s,
                     r,
                     a = Math.max(Math.hypot(e[0], e[1]), 1),
                     o = Math.max(Math.hypot(e[2], e[3]), 1),
                     l = i,
                     h = n,
                     c = "prescale1";
                 for (; (a > 2 && l > 1) || (o > 2 && h > 1); ) {
                     let e = l,
                         i = h;
                     if (a > 2 && l > 1) {
                         e = l >= 16384 ? Math.floor(l / 2) - 1 || 1 : Math.ceil(l / 2);
                         a /= l / e;
                     }
                     if (o > 2 && h > 1) {
                         i = h >= 16384 ? Math.floor(h / 2) - 1 || 1 : Math.ceil(h) / 2;
                         o /= h / i;
                     }
                     s = this.cachedCanvases.getCanvas(c, e, i);
                     r = s.context;
                     r.clearRect(0, 0, e, i);
                     r.drawImage(t, 0, 0, l, h, 0, 0, e, i);
                     t = s.canvas;
                     l = e;
                     h = i;
                     c = "prescale1" === c ? "prescale2" : "prescale1";
                 }
                 return { img: t, paintWidth: l, paintHeight: h };
             }
             _createMaskCanvas(t) {
                 const e = this.ctx,
                     { width: i, height: a } = t,
                     o = this.current.fillColor,
                     l = this.current.patternFill,
                     h = (0, s.getCurrentTransform)(e);
                 let c, d, u, p;
                 if ((t.bitmap || t.data) && t.count > 1) {
                     const e = t.bitmap || t.data.buffer;
                     d = JSON.stringify(l ? h : [h.slice(0, 4), o]);
                     c = this._cachedBitmapsMap.get(e);
                     if (!c) {
                         c = new Map();
                         this._cachedBitmapsMap.set(e, c);
                     }
                     const i = c.get(d);
                     if (i && !l) {
                         return { canvas: i, offsetX: Math.round(Math.min(h[0], h[2]) + h[4]), offsetY: Math.round(Math.min(h[1], h[3]) + h[5]) };
                     }
                     u = i;
                 }
                 if (!u) {
                     p = this.cachedCanvases.getCanvas("maskCanvas", i, a);
                     putBinaryImageMask(p.context, t);
                 }
                 let g = n.Util.transform(h, [1 / i, 0, 0, -1 / a, 0, 0]);
                 g = n.Util.transform(g, [1, 0, 0, 1, 0, -a]);
                 const [f, m, v, b] = n.Util.getAxialAlignedBoundingBox([0, 0, i, a], g),
                     y = Math.round(v - f) || 1,
                     A = Math.round(b - m) || 1,
                     E = this.cachedCanvases.getCanvas("fillCanvas", y, A),
                     w = E.context,
                     x = f,
                     _ = m;
                 w.translate(-x, -_);
                 w.transform(...g);
                 if (!u) {
                     u = this._scaleImage(p.canvas, (0, s.getCurrentTransformInverse)(w));
                     u = u.img;
                     c && l && c.set(d, u);
                 }
                 w.imageSmoothingEnabled = getImageSmoothingEnabled((0, s.getCurrentTransform)(w), t.interpolate);
                 drawImageAtIntegerCoords(w, u, 0, 0, u.width, u.height, 0, 0, i, a);
                 w.globalCompositeOperation = "source-in";
                 const S = n.Util.transform((0, s.getCurrentTransformInverse)(w), [1, 0, 0, 1, -x, -_]);
                 w.fillStyle = l ? o.getPattern(e, this, S, r) : o;
                 w.fillRect(0, 0, i, a);
                 if (c && !l) {
                     this.cachedCanvases.delete("fillCanvas");
                     c.set(d, E.canvas);
                 }
                 return { canvas: E.canvas, offsetX: Math.round(x), offsetY: Math.round(_) };
             }
             setLineWidth(t) {
                 t !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1);
                 this.current.lineWidth = t;
                 this.ctx.lineWidth = t;
             }
             setLineCap(t) {
                 this.ctx.lineCap = u[t];
             }
             setLineJoin(t) {
                 this.ctx.lineJoin = p[t];
             }
             setMiterLimit(t) {
                 this.ctx.miterLimit = t;
             }
             setDash(t, e) {
                 const i = this.ctx;
                 if (void 0 !== i.setLineDash) {
                     i.setLineDash(t);
                     i.lineDashOffset = e;
                 }
             }
             setRenderingIntent(t) {}
             setFlatness(t) {}
             setGState(t) {
                 for (const [e, i] of t)
                     switch (e) {
                         case "LW":
                             this.setLineWidth(i);
                             break;
                         case "LC":
                             this.setLineCap(i);
                             break;
                         case "LJ":
                             this.setLineJoin(i);
                             break;
                         case "ML":
                             this.setMiterLimit(i);
                             break;
                         case "D":
                             this.setDash(i[0], i[1]);
                             break;
                         case "RI":
                             this.setRenderingIntent(i);
                             break;
                         case "FL":
                             this.setFlatness(i);
                             break;
                         case "Font":
                             this.setFont(i[0], i[1]);
                             break;
                         case "CA":
                             this.current.strokeAlpha = i;
                             break;
                         case "ca":
                             this.current.fillAlpha = i;
                             this.ctx.globalAlpha = i;
                             break;
                         case "BM":
                             this.ctx.globalCompositeOperation = i;
                             break;
                         case "SMask":
                             this.current.activeSMask = i ? this.tempSMask : null;
                             this.tempSMask = null;
                             this.checkSMaskState();
                             break;
                         case "TR":
                             this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(i);
                     }
             }
             get inSMaskMode() {
                 return !!this.suspendedCtx;
             }
             checkSMaskState() {
                 const t = this.inSMaskMode;
                 this.current.activeSMask && !t ? this.beginSMaskMode() : !this.current.activeSMask && t && this.endSMaskMode();
             }
             beginSMaskMode() {
                 if (this.inSMaskMode) throw new Error("beginSMaskMode called while already in smask mode");
                 const t = this.ctx.canvas.width,
                     e = this.ctx.canvas.height,
                     i = "smaskGroupAt" + this.groupLevel,
                     n = this.cachedCanvases.getCanvas(i, t, e);
                 this.suspendedCtx = this.ctx;
                 this.ctx = n.context;
                 const r = this.ctx;
                 r.setTransform(...(0, s.getCurrentTransform)(this.suspendedCtx));
                 copyCtxState(this.suspendedCtx, r);
                 !(function mirrorContextOperations(t, e) {
                     if (t._removeMirroring) throw new Error("Context is already forwarding operations.");
                     t.__originalSave = t.save;
                     t.__originalRestore = t.restore;
                     t.__originalRotate = t.rotate;
                     t.__originalScale = t.scale;
                     t.__originalTranslate = t.translate;
                     t.__originalTransform = t.transform;
                     t.__originalSetTransform = t.setTransform;
                     t.__originalResetTransform = t.resetTransform;
                     t.__originalClip = t.clip;
                     t.__originalMoveTo = t.moveTo;
                     t.__originalLineTo = t.lineTo;
                     t.__originalBezierCurveTo = t.bezierCurveTo;
                     t.__originalRect = t.rect;
                     t.__originalClosePath = t.closePath;
                     t.__originalBeginPath = t.beginPath;
                     t._removeMirroring = () => {
                         t.save = t.__originalSave;
                         t.restore = t.__originalRestore;
                         t.rotate = t.__originalRotate;
                         t.scale = t.__originalScale;
                         t.translate = t.__originalTranslate;
                         t.transform = t.__originalTransform;
                         t.setTransform = t.__originalSetTransform;
                         t.resetTransform = t.__originalResetTransform;
                         t.clip = t.__originalClip;
                         t.moveTo = t.__originalMoveTo;
                         t.lineTo = t.__originalLineTo;
                         t.bezierCurveTo = t.__originalBezierCurveTo;
                         t.rect = t.__originalRect;
                         t.closePath = t.__originalClosePath;
                         t.beginPath = t.__originalBeginPath;
                         delete t._removeMirroring;
                     };
                     t.save = function ctxSave() {
                         e.save();
                         this.__originalSave();
                     };
                     t.restore = function ctxRestore() {
                         e.restore();
                         this.__originalRestore();
                     };
                     t.translate = function ctxTranslate(t, i) {
                         e.translate(t, i);
                         this.__originalTranslate(t, i);
                     };
                     t.scale = function ctxScale(t, i) {
                         e.scale(t, i);
                         this.__originalScale(t, i);
                     };
                     t.transform = function ctxTransform(t, i, n, s, r, a) {
                         e.transform(t, i, n, s, r, a);
                         this.__originalTransform(t, i, n, s, r, a);
                     };
                     t.setTransform = function ctxSetTransform(t, i, n, s, r, a) {
                         e.setTransform(t, i, n, s, r, a);
                         this.__originalSetTransform(t, i, n, s, r, a);
                     };
                     t.resetTransform = function ctxResetTransform() {
                         e.resetTransform();
                         this.__originalResetTransform();
                     };
                     t.rotate = function ctxRotate(t) {
                         e.rotate(t);
                         this.__originalRotate(t);
                     };
                     t.clip = function ctxRotate(t) {
                         e.clip(t);
                         this.__originalClip(t);
                     };
                     t.moveTo = function (t, i) {
                         e.moveTo(t, i);
                         this.__originalMoveTo(t, i);
                     };
                     t.lineTo = function (t, i) {
                         e.lineTo(t, i);
                         this.__originalLineTo(t, i);
                     };
                     t.bezierCurveTo = function (t, i, n, s, r, a) {
                         e.bezierCurveTo(t, i, n, s, r, a);
                         this.__originalBezierCurveTo(t, i, n, s, r, a);
                     };
                     t.rect = function (t, i, n, s) {
                         e.rect(t, i, n, s);
                         this.__originalRect(t, i, n, s);
                     };
                     t.closePath = function () {
                         e.closePath();
                         this.__originalClosePath();
                     };
                     t.beginPath = function () {
                         e.beginPath();
                         this.__originalBeginPath();
                     };
                 })(r, this.suspendedCtx);
                 this.setGState([
                     ["BM", "source-over"],
                     ["ca", 1],
                     ["CA", 1],
                 ]);
             }
             endSMaskMode() {
                 if (!this.inSMaskMode) throw new Error("endSMaskMode called while not in smask mode");
                 this.ctx._removeMirroring();
                 copyCtxState(this.ctx, this.suspendedCtx);
                 this.ctx = this.suspendedCtx;
                 this.suspendedCtx = null;
             }
             compose(t) {
                 if (!this.current.activeSMask) return;
                 if (t) {
                     t[0] = Math.floor(t[0]);
                     t[1] = Math.floor(t[1]);
                     t[2] = Math.ceil(t[2]);
                     t[3] = Math.ceil(t[3]);
                 } else t = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
                 const e = this.current.activeSMask;
                 composeSMask(this.suspendedCtx, e, this.ctx, t);
                 this.ctx.save();
                 this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                 this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                 this.ctx.restore();
             }
             save() {
                 if (this.inSMaskMode) {
                     copyCtxState(this.ctx, this.suspendedCtx);
                     this.suspendedCtx.save();
                 } else this.ctx.save();
                 const t = this.current;
                 this.stateStack.push(t);
                 this.current = t.clone();
             }
             restore() {
                 0 === this.stateStack.length && this.inSMaskMode && this.endSMaskMode();
                 if (0 !== this.stateStack.length) {
                     this.current = this.stateStack.pop();
                     if (this.inSMaskMode) {
                         this.suspendedCtx.restore();
                         copyCtxState(this.suspendedCtx, this.ctx);
                     } else this.ctx.restore();
                     this.checkSMaskState();
                     this.pendingClip = null;
                     this._cachedScaleForStroking[0] = -1;
                     this._cachedGetSinglePixelWidth = null;
                 }
             }
             transform(t, e, i, n, s, r) {
                 this.ctx.transform(t, e, i, n, s, r);
                 this._cachedScaleForStroking[0] = -1;
                 this._cachedGetSinglePixelWidth = null;
             }
             constructPath(t, e, i) {
                 const r = this.ctx,
                     a = this.current;
                 let o,
                     l,
                     h = a.x,
                     c = a.y;
                 const d = (0, s.getCurrentTransform)(r),
                     u = (0 === d[0] && 0 === d[3]) || (0 === d[1] && 0 === d[2]),
                     p = u ? i.slice(0) : null;
                 for (let i = 0, s = 0, g = t.length; i < g; i++)
                     switch (0 | t[i]) {
                         case n.OPS.rectangle:
                             h = e[s++];
                             c = e[s++];
                             const t = e[s++],
                                 i = e[s++],
                                 g = h + t,
                                 f = c + i;
                             r.moveTo(h, c);
                             if (0 === t || 0 === i) r.lineTo(g, f);
                             else {
                                 r.lineTo(g, c);
                                 r.lineTo(g, f);
                                 r.lineTo(h, f);
                             }
                             u || a.updateRectMinMax(d, [h, c, g, f]);
                             r.closePath();
                             break;
                         case n.OPS.moveTo:
                             h = e[s++];
                             c = e[s++];
                             r.moveTo(h, c);
                             u || a.updatePathMinMax(d, h, c);
                             break;
                         case n.OPS.lineTo:
                             h = e[s++];
                             c = e[s++];
                             r.lineTo(h, c);
                             u || a.updatePathMinMax(d, h, c);
                             break;
                         case n.OPS.curveTo:
                             o = h;
                             l = c;
                             h = e[s + 4];
                             c = e[s + 5];
                             r.bezierCurveTo(e[s], e[s + 1], e[s + 2], e[s + 3], h, c);
                             a.updateCurvePathMinMax(d, o, l, e[s], e[s + 1], e[s + 2], e[s + 3], h, c, p);
                             s += 6;
                             break;
                         case n.OPS.curveTo2:
                             o = h;
                             l = c;
                             r.bezierCurveTo(h, c, e[s], e[s + 1], e[s + 2], e[s + 3]);
                             a.updateCurvePathMinMax(d, o, l, h, c, e[s], e[s + 1], e[s + 2], e[s + 3], p);
                             h = e[s + 2];
                             c = e[s + 3];
                             s += 4;
                             break;
                         case n.OPS.curveTo3:
                             o = h;
                             l = c;
                             h = e[s + 2];
                             c = e[s + 3];
                             r.bezierCurveTo(e[s], e[s + 1], h, c, h, c);
                             a.updateCurvePathMinMax(d, o, l, e[s], e[s + 1], h, c, h, c, p);
                             s += 4;
                             break;
                         case n.OPS.closePath:
                             r.closePath();
                     }
                 u && a.updateScalingPathMinMax(d, p);
                 a.setCurrentPoint(h, c);
             }
             closePath() {
                 this.ctx.closePath();
             }
             stroke() {
                 let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                 const e = this.ctx,
                     i = this.current.strokeColor;
                 e.globalAlpha = this.current.strokeAlpha;
                 if (this.contentVisible)
                     if ("object" == typeof i && i?.getPattern) {
                         e.save();
                         e.strokeStyle = i.getPattern(e, this, (0, s.getCurrentTransformInverse)(e), a);
                         this.rescaleAndStroke(!1);
                         e.restore();
                     } else this.rescaleAndStroke(!0);
                 t && this.consumePath(this.current.getClippedPathBoundingBox());
                 e.globalAlpha = this.current.fillAlpha;
             }
             closeStroke() {
                 this.closePath();
                 this.stroke();
             }
             fill() {
                 let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                 const e = this.ctx,
                     i = this.current.fillColor;
                 let n = !1;
                 if (this.current.patternFill) {
                     e.save();
                     e.fillStyle = i.getPattern(e, this, (0, s.getCurrentTransformInverse)(e), r);
                     n = !0;
                 }
                 const a = this.current.getClippedPathBoundingBox();
                 if (this.contentVisible && null !== a)
                     if (this.pendingEOFill) {
                         e.fill("evenodd");
                         this.pendingEOFill = !1;
                     } else e.fill();
                 n && e.restore();
                 t && this.consumePath(a);
             }
             eoFill() {
                 this.pendingEOFill = !0;
                 this.fill();
             }
             fillStroke() {
                 this.fill(!1);
                 this.stroke(!1);
                 this.consumePath();
             }
             eoFillStroke() {
                 this.pendingEOFill = !0;
                 this.fillStroke();
             }
             closeFillStroke() {
                 this.closePath();
                 this.fillStroke();
             }
             closeEOFillStroke() {
                 this.pendingEOFill = !0;
                 this.closePath();
                 this.fillStroke();
             }
             endPath() {
                 this.consumePath();
             }
             clip() {
                 this.pendingClip = g;
             }
             eoClip() {
                 this.pendingClip = f;
             }
             beginText() {
                 this.current.textMatrix = n.IDENTITY_MATRIX;
                 this.current.textMatrixScale = 1;
                 this.current.x = this.current.lineX = 0;
                 this.current.y = this.current.lineY = 0;
             }
             endText() {
                 const t = this.pendingTextPaths,
                     e = this.ctx;
                 if (void 0 !== t) {
                     e.save();
                     e.beginPath();
                     for (const i of t) {
                         e.setTransform(...i.transform);
                         e.translate(i.x, i.y);
                         i.addToPath(e, i.fontSize);
                     }
                     e.restore();
                     e.clip();
                     e.beginPath();
                     delete this.pendingTextPaths;
                 } else e.beginPath();
             }
             setCharSpacing(t) {
                 this.current.charSpacing = t;
             }
             setWordSpacing(t) {
                 this.current.wordSpacing = t;
             }
             setHScale(t) {
                 this.current.textHScale = t / 100;
             }
             setLeading(t) {
                 this.current.leading = -t;
             }
             setFont(t, e) {
                 const i = this.commonObjs.get(t),
                     s = this.current;
                 if (!i) throw new Error(`Can't find font for ${t}`);
                 s.fontMatrix = i.fontMatrix || n.FONT_IDENTITY_MATRIX;
                 (0 !== s.fontMatrix[0] && 0 !== s.fontMatrix[3]) || (0, n.warn)("Invalid font matrix for font " + t);
                 if (e < 0) {
                     e = -e;
                     s.fontDirection = -1;
                 } else s.fontDirection = 1;
                 this.current.font = i;
                 this.current.fontSize = e;
                 if (i.isType3Font) return;
                 const r = i.loadedName || "sans-serif",
                     a = i.systemFontInfo?.css || `"${r}", ${i.fallbackName}`;
                 let o = "normal";
                 i.black ? (o = "900") : i.bold && (o = "bold");
                 const l = i.italic ? "italic" : "normal";
                 let h = e;
                 e < 16 ? (h = 16) : e > 100 && (h = 100);
                 this.current.fontSizeScale = e / h;
                 this.ctx.font = `${l} ${o} ${h}px ${a}`;
             }
             setTextRenderingMode(t) {
                 this.current.textRenderingMode = t;
             }
             setTextRise(t) {
                 this.current.textRise = t;
             }
             moveText(t, e) {
                 this.current.x = this.current.lineX += t;
                 this.current.y = this.current.lineY += e;
             }
             setLeadingMoveText(t, e) {
                 this.setLeading(-e);
                 this.moveText(t, e);
             }
             setTextMatrix(t, e, i, n, s, r) {
                 this.current.textMatrix = [t, e, i, n, s, r];
                 this.current.textMatrixScale = Math.hypot(t, e);
                 this.current.x = this.current.lineX = 0;
                 this.current.y = this.current.lineY = 0;
             }
             nextLine() {
                 this.moveText(0, this.current.leading);
             }
             paintChar(t, e, i, r) {
                 const a = this.ctx,
                     o = this.current,
                     l = o.font,
                     h = o.textRenderingMode,
                     c = o.fontSize / o.fontSizeScale,
                     d = h & n.TextRenderingMode.FILL_STROKE_MASK,
                     u = !!(h & n.TextRenderingMode.ADD_TO_PATH_FLAG),
                     p = o.patternFill && !l.missingFile;
                 let g;
                 (l.disableFontFace || u || p) && (g = l.getPathGenerator(this.commonObjs, t));
                 if (l.disableFontFace || p) {
                     a.save();
                     a.translate(e, i);
                     a.beginPath();
                     g(a, c);
                     r && a.setTransform(...r);
                     (d !== n.TextRenderingMode.FILL && d !== n.TextRenderingMode.FILL_STROKE) || a.fill();
                     (d !== n.TextRenderingMode.STROKE && d !== n.TextRenderingMode.FILL_STROKE) || a.stroke();
                     a.restore();
                 } else {
                     (d !== n.TextRenderingMode.FILL && d !== n.TextRenderingMode.FILL_STROKE) || a.fillText(t, e, i);
                     (d !== n.TextRenderingMode.STROKE && d !== n.TextRenderingMode.FILL_STROKE) || a.strokeText(t, e, i);
                 }
                 if (u) {
                     (this.pendingTextPaths ||= []).push({ transform: (0, s.getCurrentTransform)(a), x: e, y: i, fontSize: c, addToPath: g });
                 }
             }
             get isFontSubpixelAAEnabled() {
                 const { context: t } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
                 t.scale(1.5, 1);
                 t.fillText("I", 0, 10);
                 const e = t.getImageData(0, 0, 10, 10).data;
                 let i = !1;
                 for (let t = 3; t < e.length; t += 4)
                     if (e[t] > 0 && e[t] < 255) {
                         i = !0;
                         break;
                     }
                 return (0, n.shadow)(this, "isFontSubpixelAAEnabled", i);
             }
             showText(t) {
                 const e = this.current,
                     i = e.font;
                 if (i.isType3Font) return this.showType3Text(t);
                 const a = e.fontSize;
                 if (0 === a) return;
                 const o = this.ctx,
                     l = e.fontSizeScale,
                     h = e.charSpacing,
                     c = e.wordSpacing,
                     d = e.fontDirection,
                     u = e.textHScale * d,
                     p = t.length,
                     g = i.vertical,
                     f = g ? 1 : -1,
                     m = i.defaultVMetrics,
                     v = a * e.fontMatrix[0],
                     b = e.textRenderingMode === n.TextRenderingMode.FILL && !i.disableFontFace && !e.patternFill;
                 o.save();
                 o.transform(...e.textMatrix);
                 o.translate(e.x, e.y + e.textRise);
                 d > 0 ? o.scale(u, -1) : o.scale(u, 1);
                 let y;
                 if (e.patternFill) {
                     o.save();
                     const t = e.fillColor.getPattern(o, this, (0, s.getCurrentTransformInverse)(o), r);
                     y = (0, s.getCurrentTransform)(o);
                     o.restore();
                     o.fillStyle = t;
                 }
                 let A = e.lineWidth;
                 const E = e.textMatrixScale;
                 if (0 === E || 0 === A) {
                     const t = e.textRenderingMode & n.TextRenderingMode.FILL_STROKE_MASK;
                     (t !== n.TextRenderingMode.STROKE && t !== n.TextRenderingMode.FILL_STROKE) || (A = this.getSinglePixelWidth());
                 } else A /= E;
                 if (1 !== l) {
                     o.scale(l, l);
                     A /= l;
                 }
                 o.lineWidth = A;
                 if (i.isInvalidPDFjsFont) {
                     const i = [];
                     let n = 0;
                     for (const e of t) {
                         i.push(e.unicode);
                         n += e.width;
                     }
                     o.fillText(i.join(""), 0, 0);
                     e.x += n * v * u;
                     o.restore();
                     this.compose();
                     return;
                 }
                 let w,
                     x = 0;
                 for (w = 0; w < p; ++w) {
                     const e = t[w];
                     if ("number" == typeof e) {
                         x += (f * e * a) / 1e3;
                         continue;
                     }
                     let n = !1;
                     const s = (e.isSpace ? c : 0) + h,
                         r = e.fontChar,
                         u = e.accent;
                     let p,
                         A,
                         E = e.width;
                     if (g) {
                         const t = e.vmetric || m,
                             i = -(e.vmetric ? t[1] : 0.5 * E) * v,
                             n = t[2] * v;
                         E = t ? -t[0] : E;
                         p = i / l;
                         A = (x + n) / l;
                     } else {
                         p = x / l;
                         A = 0;
                     }
                     if (i.remeasure && E > 0) {
                         const t = ((1e3 * o.measureText(r).width) / a) * l;
                         if (E < t && this.isFontSubpixelAAEnabled) {
                             const e = E / t;
                             n = !0;
                             o.save();
                             o.scale(e, 1);
                             p /= e;
                         } else E !== t && (p += (((E - t) / 2e3) * a) / l);
                     }
                     if (this.contentVisible && (e.isInFont || i.missingFile))
                         if (b && !u) o.fillText(r, p, A);
                         else {
                             this.paintChar(r, p, A, y);
                             if (u) {
                                 const t = p + (a * u.offset.x) / l,
                                     e = A - (a * u.offset.y) / l;
                                 this.paintChar(u.fontChar, t, e, y);
                             }
                         }
                     x += g ? E * v - s * d : E * v + s * d;
                     n && o.restore();
                 }
                 g ? (e.y -= x) : (e.x += x * u);
                 o.restore();
                 this.compose();
             }
             showType3Text(t) {
                 const e = this.ctx,
                     i = this.current,
                     s = i.font,
                     r = i.fontSize,
                     a = i.fontDirection,
                     o = s.vertical ? 1 : -1,
                     l = i.charSpacing,
                     h = i.wordSpacing,
                     c = i.textHScale * a,
                     d = i.fontMatrix || n.FONT_IDENTITY_MATRIX,
                     u = t.length;
                 let p, g, f, m;
                 if (!(i.textRenderingMode === n.TextRenderingMode.INVISIBLE) && 0 !== r) {
                     this._cachedScaleForStroking[0] = -1;
                     this._cachedGetSinglePixelWidth = null;
                     e.save();
                     e.transform(...i.textMatrix);
                     e.translate(i.x, i.y);
                     e.scale(c, a);
                     for (p = 0; p < u; ++p) {
                         g = t[p];
                         if ("number" == typeof g) {
                             m = (o * g * r) / 1e3;
                             this.ctx.translate(m, 0);
                             i.x += m * c;
                             continue;
                         }
                         const a = (g.isSpace ? h : 0) + l,
                             u = s.charProcOperatorList[g.operatorListId];
                         if (!u) {
                             (0, n.warn)(`Type3 character "${g.operatorListId}" is not available.`);
                             continue;
                         }
                         if (this.contentVisible) {
                             this.processingType3 = g;
                             this.save();
                             e.scale(r, r);
                             e.transform(...d);
                             this.executeOperatorList(u);
                             this.restore();
                         }
                         f = n.Util.applyTransform([g.width, 0], d)[0] * r + a;
                         e.translate(f, 0);
                         i.x += f * c;
                     }
                     e.restore();
                     this.processingType3 = null;
                 }
             }
             setCharWidth(t, e) {}
             setCharWidthAndBounds(t, e, i, n, s, r) {
                 this.ctx.rect(i, n, s - i, r - n);
                 this.ctx.clip();
                 this.endPath();
             }
             getColorN_Pattern(t) {
                 let e;
                 if ("TilingPattern" === t[0]) {
                     const i = t[1],
                         n = this.baseTransform || (0, s.getCurrentTransform)(this.ctx),
                         r = {
                             createCanvasGraphics: (t) =>
                                 new CanvasGraphics(t, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, { optionalContentConfig: this.optionalContentConfig, markedContentStack: this.markedContentStack }),
                         };
                     e = new TilingPattern(t, i, this.ctx, r, n);
                 } else e = this._getPattern(t[1], t[2]);
                 return e;
             }
             setStrokeColorN() {
                 this.current.strokeColor = this.getColorN_Pattern(arguments);
             }
             setFillColorN() {
                 this.current.fillColor = this.getColorN_Pattern(arguments);
                 this.current.patternFill = !0;
             }
             setStrokeRGBColor(t, e, i) {
                 const s = n.Util.makeHexColor(t, e, i);
                 this.ctx.strokeStyle = s;
                 this.current.strokeColor = s;
             }
             setFillRGBColor(t, e, i) {
                 const s = n.Util.makeHexColor(t, e, i);
                 this.ctx.fillStyle = s;
                 this.current.fillColor = s;
                 this.current.patternFill = !1;
             }
             _getPattern(t) {
                 let e,
                     i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 if (this.cachedPatterns.has(t)) e = this.cachedPatterns.get(t);
                 else {
                     e = (function getShadingPattern(t) {
                         switch (t[0]) {
                             case "RadialAxial":
                                 return new RadialAxialShadingPattern(t);
                             case "Mesh":
                                 return new MeshShadingPattern(t);
                             case "Dummy":
                                 return new DummyShadingPattern();
                         }
                         throw new Error(`Unknown IR type: ${t[0]}`);
                     })(this.getObject(t));
                     this.cachedPatterns.set(t, e);
                 }
                 i && (e.matrix = i);
                 return e;
             }
             shadingFill(t) {
                 if (!this.contentVisible) return;
                 const e = this.ctx;
                 this.save();
                 const i = this._getPattern(t);
                 e.fillStyle = i.getPattern(e, this, (0, s.getCurrentTransformInverse)(e), o);
                 const r = (0, s.getCurrentTransformInverse)(e);
                 if (r) {
                     const { width: t, height: i } = e.canvas,
                         [s, a, o, l] = n.Util.getAxialAlignedBoundingBox([0, 0, t, i], r);
                     this.ctx.fillRect(s, a, o - s, l - a);
                 } else this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
                 this.compose(this.current.getClippedPathBoundingBox());
                 this.restore();
             }
             beginInlineImage() {
                 (0, n.unreachable)("Should not call beginInlineImage");
             }
             beginImageData() {
                 (0, n.unreachable)("Should not call beginImageData");
             }
             paintFormXObjectBegin(t, e) {
                 if (this.contentVisible) {
                     this.save();
                     this.baseTransformStack.push(this.baseTransform);
                     Array.isArray(t) && 6 === t.length && this.transform(...t);
                     this.baseTransform = (0, s.getCurrentTransform)(this.ctx);
                     if (e) {
                         const t = e[2] - e[0],
                             i = e[3] - e[1];
                         this.ctx.rect(e[0], e[1], t, i);
                         this.current.updateRectMinMax((0, s.getCurrentTransform)(this.ctx), e);
                         this.clip();
                         this.endPath();
                     }
                 }
             }
             paintFormXObjectEnd() {
                 if (this.contentVisible) {
                     this.restore();
                     this.baseTransform = this.baseTransformStack.pop();
                 }
             }
             beginGroup(t) {
                 if (!this.contentVisible) return;
                 this.save();
                 if (this.inSMaskMode) {
                     this.endSMaskMode();
                     this.current.activeSMask = null;
                 }
                 const e = this.ctx;
                 t.isolated || (0, n.info)("TODO: Support non-isolated groups.");
                 t.knockout && (0, n.warn)("Knockout groups not supported.");
                 const i = (0, s.getCurrentTransform)(e);
                 t.matrix && e.transform(...t.matrix);
                 if (!t.bbox) throw new Error("Bounding box is required.");
                 let r = n.Util.getAxialAlignedBoundingBox(t.bbox, (0, s.getCurrentTransform)(e));
                 const a = [0, 0, e.canvas.width, e.canvas.height];
                 r = n.Util.intersect(r, a) || [0, 0, 0, 0];
                 const o = Math.floor(r[0]),
                     l = Math.floor(r[1]);
                 let h = Math.max(Math.ceil(r[2]) - o, 1),
                     d = Math.max(Math.ceil(r[3]) - l, 1),
                     u = 1,
                     p = 1;
                 if (h > c) {
                     u = h / c;
                     h = c;
                 }
                 if (d > c) {
                     p = d / c;
                     d = c;
                 }
                 this.current.startNewPathAndClipBox([0, 0, h, d]);
                 let g = "groupAt" + this.groupLevel;
                 t.smask && (g += "_smask_" + (this.smaskCounter++ % 2));
                 const f = this.cachedCanvases.getCanvas(g, h, d),
                     m = f.context;
                 m.scale(1 / u, 1 / p);
                 m.translate(-o, -l);
                 m.transform(...i);
                 if (t.smask)
                     this.smaskStack.push({
                         canvas: f.canvas,
                         context: m,
                         offsetX: o,
                         offsetY: l,
                         scaleX: u,
                         scaleY: p,
                         subtype: t.smask.subtype,
                         backdrop: t.smask.backdrop,
                         transferMap: t.smask.transferMap || null,
                         startTransformInverse: null,
                     });
                 else {
                     e.setTransform(1, 0, 0, 1, 0, 0);
                     e.translate(o, l);
                     e.scale(u, p);
                     e.save();
                 }
                 copyCtxState(e, m);
                 this.ctx = m;
                 this.setGState([
                     ["BM", "source-over"],
                     ["ca", 1],
                     ["CA", 1],
                 ]);
                 this.groupStack.push(e);
                 this.groupLevel++;
             }
             endGroup(t) {
                 if (!this.contentVisible) return;
                 this.groupLevel--;
                 const e = this.ctx,
                     i = this.groupStack.pop();
                 this.ctx = i;
                 this.ctx.imageSmoothingEnabled = !1;
                 if (t.smask) {
                     this.tempSMask = this.smaskStack.pop();
                     this.restore();
                 } else {
                     this.ctx.restore();
                     const t = (0, s.getCurrentTransform)(this.ctx);
                     this.restore();
                     this.ctx.save();
                     this.ctx.setTransform(...t);
                     const i = n.Util.getAxialAlignedBoundingBox([0, 0, e.canvas.width, e.canvas.height], t);
                     this.ctx.drawImage(e.canvas, 0, 0);
                     this.ctx.restore();
                     this.compose(i);
                 }
             }
             beginAnnotation(t, e, i, r, a) {
                 this.#rt();
                 resetCtxToDefault(this.ctx);
                 this.ctx.save();
                 this.save();
                 this.baseTransform && this.ctx.setTransform(...this.baseTransform);
                 if (Array.isArray(e) && 4 === e.length) {
                     const r = e[2] - e[0],
                         o = e[3] - e[1];
                     if (a && this.annotationCanvasMap) {
                         (i = i.slice())[4] -= e[0];
                         i[5] -= e[1];
                         (e = e.slice())[0] = e[1] = 0;
                         e[2] = r;
                         e[3] = o;
                         const [a, l] = n.Util.singularValueDecompose2dScale((0, s.getCurrentTransform)(this.ctx)),
                             { viewportScale: h } = this,
                             c = Math.ceil(r * this.outputScaleX * h),
                             d = Math.ceil(o * this.outputScaleY * h);
                         this.annotationCanvas = this.canvasFactory.create(c, d);
                         const { canvas: u, context: p } = this.annotationCanvas;
                         this.annotationCanvasMap.set(t, u);
                         this.annotationCanvas.savedCtx = this.ctx;
                         this.ctx = p;
                         this.ctx.save();
                         this.ctx.setTransform(a, 0, 0, -l, 0, o * l);
                         resetCtxToDefault(this.ctx);
                     } else {
                         resetCtxToDefault(this.ctx);
                         this.ctx.rect(e[0], e[1], r, o);
                         this.ctx.clip();
                         this.endPath();
                     }
                 }
                 this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
                 this.transform(...i);
                 this.transform(...r);
             }
             endAnnotation() {
                 if (this.annotationCanvas) {
                     this.ctx.restore();
                     this.#at();
                     this.ctx = this.annotationCanvas.savedCtx;
                     delete this.annotationCanvas.savedCtx;
                     delete this.annotationCanvas;
                 }
             }
             paintImageMaskXObject(t) {
                 if (!this.contentVisible) return;
                 const e = t.count;
                 (t = this.getObject(t.data, t)).count = e;
                 const i = this.ctx,
                     n = this.processingType3;
                 if (n) {
                     void 0 === n.compiled &&
                         (n.compiled = (function compileType3Glyph(t) {
                             const { width: e, height: i } = t;
                             if (e > 1e3 || i > 1e3) return null;
                             const n = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]),
                                 s = e + 1;
                             let r,
                                 a,
                                 o,
                                 l = new Uint8Array(s * (i + 1));
                             const h = (e + 7) & -8;
                             let c = new Uint8Array(h * i),
                                 d = 0;
                             for (const e of t.data) {
                                 let t = 128;
                                 for (; t > 0; ) {
                                     c[d++] = e & t ? 0 : 255;
                                     t >>= 1;
                                 }
                             }
                             let u = 0;
                             d = 0;
                             if (0 !== c[d]) {
                                 l[0] = 1;
                                 ++u;
                             }
                             for (a = 1; a < e; a++) {
                                 if (c[d] !== c[d + 1]) {
                                     l[a] = c[d] ? 2 : 1;
                                     ++u;
                                 }
                                 d++;
                             }
                             if (0 !== c[d]) {
                                 l[a] = 2;
                                 ++u;
                             }
                             for (r = 1; r < i; r++) {
                                 d = r * h;
                                 o = r * s;
                                 if (c[d - h] !== c[d]) {
                                     l[o] = c[d] ? 1 : 8;
                                     ++u;
                                 }
                                 let t = (c[d] ? 4 : 0) + (c[d - h] ? 8 : 0);
                                 for (a = 1; a < e; a++) {
                                     t = (t >> 2) + (c[d + 1] ? 4 : 0) + (c[d - h + 1] ? 8 : 0);
                                     if (n[t]) {
                                         l[o + a] = n[t];
                                         ++u;
                                     }
                                     d++;
                                 }
                                 if (c[d - h] !== c[d]) {
                                     l[o + a] = c[d] ? 2 : 4;
                                     ++u;
                                 }
                                 if (u > 1e3) return null;
                             }
                             d = h * (i - 1);
                             o = r * s;
                             if (0 !== c[d]) {
                                 l[o] = 8;
                                 ++u;
                             }
                             for (a = 1; a < e; a++) {
                                 if (c[d] !== c[d + 1]) {
                                     l[o + a] = c[d] ? 4 : 8;
                                     ++u;
                                 }
                                 d++;
                             }
                             if (0 !== c[d]) {
                                 l[o + a] = 4;
                                 ++u;
                             }
                             if (u > 1e3) return null;
                             const p = new Int32Array([0, s, -1, 0, -s, 0, 0, 0, 1]),
                                 g = new Path2D();
                             for (r = 0; u && r <= i; r++) {
                                 let t = r * s;
                                 const i = t + e;
                                 for (; t < i && !l[t]; ) t++;
                                 if (t === i) continue;
                                 g.moveTo(t % s, r);
                                 const n = t;
                                 let a = l[t];
                                 do {
                                     const e = p[a];
                                     do {
                                         t += e;
                                     } while (!l[t]);
                                     const i = l[t];
                                     if (5 !== i && 10 !== i) {
                                         a = i;
                                         l[t] = 0;
                                     } else {
                                         a = i & ((51 * a) >> 4);
                                         l[t] &= (a >> 2) | (a << 2);
                                     }
                                     g.lineTo(t % s, (t / s) | 0);
                                     l[t] || --u;
                                 } while (n !== t);
                                 --r;
                             }
                             c = null;
                             l = null;
                             return function (t) {
                                 t.save();
                                 t.scale(1 / e, -1 / i);
                                 t.translate(0, -i);
                                 t.fill(g);
                                 t.beginPath();
                                 t.restore();
                             };
                         })(t));
                     if (n.compiled) {
                         n.compiled(i);
                         return;
                     }
                 }
                 const s = this._createMaskCanvas(t),
                     r = s.canvas;
                 i.save();
                 i.setTransform(1, 0, 0, 1, 0, 0);
                 i.drawImage(r, s.offsetX, s.offsetY);
                 i.restore();
                 this.compose();
             }
             paintImageMaskXObjectRepeat(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                     r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                     a = arguments.length > 4 ? arguments[4] : void 0,
                     o = arguments.length > 5 ? arguments[5] : void 0;
                 if (!this.contentVisible) return;
                 t = this.getObject(t.data, t);
                 const l = this.ctx;
                 l.save();
                 const h = (0, s.getCurrentTransform)(l);
                 l.transform(e, i, r, a, 0, 0);
                 const c = this._createMaskCanvas(t);
                 l.setTransform(1, 0, 0, 1, c.offsetX - h[4], c.offsetY - h[5]);
                 for (let t = 0, s = o.length; t < s; t += 2) {
                     const s = n.Util.transform(h, [e, i, r, a, o[t], o[t + 1]]),
                         [d, u] = n.Util.applyTransform([0, 0], s);
                     l.drawImage(c.canvas, d, u);
                 }
                 l.restore();
                 this.compose();
             }
             paintImageMaskXObjectGroup(t) {
                 if (!this.contentVisible) return;
                 const e = this.ctx,
                     i = this.current.fillColor,
                     n = this.current.patternFill;
                 for (const a of t) {
                     const { data: t, width: o, height: l, transform: h } = a,
                         c = this.cachedCanvases.getCanvas("maskCanvas", o, l),
                         d = c.context;
                     d.save();
                     putBinaryImageMask(d, this.getObject(t, a));
                     d.globalCompositeOperation = "source-in";
                     d.fillStyle = n ? i.getPattern(d, this, (0, s.getCurrentTransformInverse)(e), r) : i;
                     d.fillRect(0, 0, o, l);
                     d.restore();
                     e.save();
                     e.transform(...h);
                     e.scale(1, -1);
                     drawImageAtIntegerCoords(e, c.canvas, 0, 0, o, l, 0, -1, 1, 1);
                     e.restore();
                 }
                 this.compose();
             }
             paintImageXObject(t) {
                 if (!this.contentVisible) return;
                 const e = this.getObject(t);
                 e ? this.paintInlineImageXObject(e) : (0, n.warn)("Dependent image isn't ready yet");
             }
             paintImageXObjectRepeat(t, e, i, s) {
                 if (!this.contentVisible) return;
                 const r = this.getObject(t);
                 if (!r) {
                     (0, n.warn)("Dependent image isn't ready yet");
                     return;
                 }
                 const a = r.width,
                     o = r.height,
                     l = [];
                 for (let t = 0, n = s.length; t < n; t += 2) l.push({ transform: [e, 0, 0, i, s[t], s[t + 1]], x: 0, y: 0, w: a, h: o });
                 this.paintInlineImageXObjectGroup(r, l);
             }
             applyTransferMapsToCanvas(t) {
                 if ("none" !== this.current.transferMaps) {
                     t.filter = this.current.transferMaps;
                     t.drawImage(t.canvas, 0, 0);
                     t.filter = "none";
                 }
                 return t.canvas;
             }
             applyTransferMapsToBitmap(t) {
                 if ("none" === this.current.transferMaps) return t.bitmap;
                 const { bitmap: e, width: i, height: n } = t,
                     s = this.cachedCanvases.getCanvas("inlineImage", i, n),
                     r = s.context;
                 r.filter = this.current.transferMaps;
                 r.drawImage(e, 0, 0);
                 r.filter = "none";
                 return s.canvas;
             }
             paintInlineImageXObject(t) {
                 if (!this.contentVisible) return;
                 const e = t.width,
                     i = t.height,
                     r = this.ctx;
                 this.save();
                 if (!n.isNodeJS) {
                     const { filter: t } = r;
                     "none" !== t && "" !== t && (r.filter = "none");
                 }
                 r.scale(1 / e, -1 / i);
                 let a;
                 if (t.bitmap) a = this.applyTransferMapsToBitmap(t);
                 else if (("function" == typeof HTMLElement && t instanceof HTMLElement) || !t.data) a = t;
                 else {
                     const n = this.cachedCanvases.getCanvas("inlineImage", e, i).context;
                     putBinaryImageData(n, t);
                     a = this.applyTransferMapsToCanvas(n);
                 }
                 const o = this._scaleImage(a, (0, s.getCurrentTransformInverse)(r));
                 r.imageSmoothingEnabled = getImageSmoothingEnabled((0, s.getCurrentTransform)(r), t.interpolate);
                 drawImageAtIntegerCoords(r, o.img, 0, 0, o.paintWidth, o.paintHeight, 0, -i, e, i);
                 this.compose();
                 this.restore();
             }
             paintInlineImageXObjectGroup(t, e) {
                 if (!this.contentVisible) return;
                 const i = this.ctx;
                 let n;
                 if (t.bitmap) n = t.bitmap;
                 else {
                     const e = t.width,
                         i = t.height,
                         s = this.cachedCanvases.getCanvas("inlineImage", e, i).context;
                     putBinaryImageData(s, t);
                     n = this.applyTransferMapsToCanvas(s);
                 }
                 for (const t of e) {
                     i.save();
                     i.transform(...t.transform);
                     i.scale(1, -1);
                     drawImageAtIntegerCoords(i, n, t.x, t.y, t.w, t.h, 0, -1, 1, 1);
                     i.restore();
                 }
                 this.compose();
             }
             paintSolidColorImageMask() {
                 if (this.contentVisible) {
                     this.ctx.fillRect(0, 0, 1, 1);
                     this.compose();
                 }
             }
             markPoint(t) {}
             markPointProps(t, e) {}
             beginMarkedContent(t) {
                 this.markedContentStack.push({ visible: !0 });
             }
             beginMarkedContentProps(t, e) {
                 "OC" === t ? this.markedContentStack.push({ visible: this.optionalContentConfig.isVisible(e) }) : this.markedContentStack.push({ visible: !0 });
                 this.contentVisible = this.isContentVisible();
             }
             endMarkedContent() {
                 this.markedContentStack.pop();
                 this.contentVisible = this.isContentVisible();
             }
             beginCompat() {}
             endCompat() {}
             consumePath(t) {
                 const e = this.current.isEmptyClip();
                 this.pendingClip && this.current.updateClipFromPath();
                 this.pendingClip || this.compose(t);
                 const i = this.ctx;
                 if (this.pendingClip) {
                     e || (this.pendingClip === f ? i.clip("evenodd") : i.clip());
                     this.pendingClip = null;
                 }
                 this.current.startNewPathAndClipBox(this.current.clipBox);
                 i.beginPath();
             }
             getSinglePixelWidth() {
                 if (!this._cachedGetSinglePixelWidth) {
                     const t = (0, s.getCurrentTransform)(this.ctx);
                     if (0 === t[1] && 0 === t[2]) this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(t[0]), Math.abs(t[3]));
                     else {
                         const e = Math.abs(t[0] * t[3] - t[2] * t[1]),
                             i = Math.hypot(t[0], t[2]),
                             n = Math.hypot(t[1], t[3]);
                         this._cachedGetSinglePixelWidth = Math.max(i, n) / e;
                     }
                 }
                 return this._cachedGetSinglePixelWidth;
             }
             getScaleForStroking() {
                 if (-1 === this._cachedScaleForStroking[0]) {
                     const { lineWidth: t } = this.current,
                         { a: e, b: i, c: n, d: s } = this.ctx.getTransform();
                     let r, a;
                     if (0 === i && 0 === n) {
                         const i = Math.abs(e),
                             n = Math.abs(s);
                         if (i === n)
                             if (0 === t) r = a = 1 / i;
                             else {
                                 const e = i * t;
                                 r = a = e < 1 ? 1 / e : 1;
                             }
                         else if (0 === t) {
                             r = 1 / i;
                             a = 1 / n;
                         } else {
                             const e = i * t,
                                 s = n * t;
                             r = e < 1 ? 1 / e : 1;
                             a = s < 1 ? 1 / s : 1;
                         }
                     } else {
                         const o = Math.abs(e * s - i * n),
                             l = Math.hypot(e, i),
                             h = Math.hypot(n, s);
                         if (0 === t) {
                             r = h / o;
                             a = l / o;
                         } else {
                             const e = t * o;
                             r = h > e ? h / e : 1;
                             a = l > e ? l / e : 1;
                         }
                     }
                     this._cachedScaleForStroking[0] = r;
                     this._cachedScaleForStroking[1] = a;
                 }
                 return this._cachedScaleForStroking;
             }
             rescaleAndStroke(t) {
                 const { ctx: e } = this,
                     { lineWidth: i } = this.current,
                     [n, s] = this.getScaleForStroking();
                 e.lineWidth = i || 1;
                 if (1 === n && 1 === s) {
                     e.stroke();
                     return;
                 }
                 const r = e.getLineDash();
                 t && e.save();
                 e.scale(n, s);
                 if (r.length > 0) {
                     const t = Math.max(n, s);
                     e.setLineDash(r.map((e) => e / t));
                     e.lineDashOffset /= t;
                 }
                 e.stroke();
                 t && e.restore();
             }
             isContentVisible() {
                 for (let t = this.markedContentStack.length - 1; t >= 0; t--) if (!this.markedContentStack[t].visible) return !1;
                 return !0;
             }
         }
         for (const t in n.OPS) void 0 !== CanvasGraphics.prototype[t] && (CanvasGraphics.prototype[n.OPS[t]] = CanvasGraphics.prototype[t]);
     },
     473: (t, e, i) => {
         i.d(e, {
             DOMCMapReaderFactory: () => DOMCMapReaderFactory,
             DOMCanvasFactory: () => DOMCanvasFactory,
             DOMFilterFactory: () => DOMFilterFactory,
             DOMSVGFactory: () => DOMSVGFactory,
             DOMStandardFontDataFactory: () => DOMStandardFontDataFactory,
             PDFDateString: () => PDFDateString,
             PageViewport: () => PageViewport,
             PixelsPerInch: () => PixelsPerInch,
             RenderingCancelledException: () => RenderingCancelledException,
             StatTimer: () => StatTimer,
             fetchData: () => fetchData,
             getColorValues: () => getColorValues,
             getCurrentTransform: () => getCurrentTransform,
             getCurrentTransformInverse: () => getCurrentTransformInverse,
             getFilenameFromUrl: () => getFilenameFromUrl,
             getPdfFilenameFromUrl: () => getPdfFilenameFromUrl,
             getRGB: () => getRGB,
             getXfaPageViewport: () => getXfaPageViewport,
             isDataScheme: () => isDataScheme,
             isPdfFile: () => isPdfFile,
             isValidFetchUrl: () => isValidFetchUrl,
             noContextMenu: () => noContextMenu,
             setLayerDimensions: () => setLayerDimensions,
         });
         i(7944), i(3352), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(4226), i(3655), i(2555), i(2202);
         var n = i(6822),
             s = i(3266);
         function _defineProperty(t, e, i) {
             (e = (function _toPropertyKey(t) {
                 var e = (function _toPrimitive(t, e) {
                     if ("object" != typeof t || !t) return t;
                     var i = t[Symbol.toPrimitive];
                     if (void 0 !== i) {
                         var n = i.call(t, e || "default");
                         if ("object" != typeof n) return n;
                         throw new TypeError("@@toPrimitive must return a primitive value.");
                     }
                     return ("string" === e ? String : Number)(t);
                 })(t, "string");
                 return "symbol" == typeof e ? e : String(e);
             })(e)) in t
                 ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
                 : (t[e] = i);
             return t;
         }
         const r = "http://www.w3.org/2000/svg";
         class PixelsPerInch {
             static CSS = 96;
             static PDF = 72;
             static #ot = _defineProperty(this, "PDF_TO_CSS_UNITS", this.CSS / this.PDF);
         }
         class DOMFilterFactory extends n.BaseFilterFactory {
             #lt;
             #ht;
             #j;
             #ct;
             #dt;
             #ut;
             #pt;
             #gt;
             #ft;
             #mt;
             #vt = 0;
             constructor() {
                 let { docId: t, ownerDocument: e = globalThis.document } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                 super();
                 this.#j = t;
                 this.#ct = e;
             }
             get #bt() {
                 return (this.#lt ||= new Map());
             }
             get #yt() {
                 if (!this.#ht) {
                     const t = this.#ct.createElement("div"),
                         { style: e } = t;
                     e.visibility = "hidden";
                     e.contain = "strict";
                     e.width = e.height = 0;
                     e.position = "absolute";
                     e.top = e.left = 0;
                     e.zIndex = -1;
                     const i = this.#ct.createElementNS(r, "svg");
                     i.setAttribute("width", 0);
                     i.setAttribute("height", 0);
                     this.#ht = this.#ct.createElementNS(r, "defs");
                     t.append(i);
                     i.append(this.#ht);
                     this.#ct.body.append(t);
                 }
                 return this.#ht;
             }
             addFilter(t) {
                 if (!t) return "none";
                 let e,
                     i,
                     n,
                     s,
                     r = this.#bt.get(t);
                 if (r) return r;
                 if (1 === t.length) {
                     const r = t[0],
                         a = new Array(256);
                     for (let t = 0; t < 256; t++) a[t] = r[t] / 255;
                     s = e = i = n = a.join(",");
                 } else {
                     const [r, a, o] = t,
                         l = new Array(256),
                         h = new Array(256),
                         c = new Array(256);
                     for (let t = 0; t < 256; t++) {
                         l[t] = r[t] / 255;
                         h[t] = a[t] / 255;
                         c[t] = o[t] / 255;
                     }
                     e = l.join(",");
                     i = h.join(",");
                     n = c.join(",");
                     s = `${e}${i}${n}`;
                 }
                 r = this.#bt.get(s);
                 if (r) {
                     this.#bt.set(t, r);
                     return r;
                 }
                 const a = `g_${this.#j}_transfer_map_${this.#vt++}`,
                     o = `url(#${a})`;
                 this.#bt.set(t, o);
                 this.#bt.set(s, o);
                 const l = this.#At(a);
                 this.#Et(e, i, n, l);
                 return o;
             }
             addHCMFilter(t, e) {
                 const i = `${t}-${e}`;
                 if (this.#ut === i) return this.#pt;
                 this.#ut = i;
                 this.#pt = "none";
                 this.#dt?.remove();
                 if (!t || !e) return this.#pt;
                 const n = this.#wt(t);
                 t = s.Util.makeHexColor(...n);
                 const r = this.#wt(e);
                 e = s.Util.makeHexColor(...r);
                 this.#yt.style.color = "";
                 if (("#000000" === t && "#ffffff" === e) || t === e) return this.#pt;
                 const a = new Array(256);
                 for (let t = 0; t <= 255; t++) {
                     const e = t / 255;
                     a[t] = e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
                 }
                 const o = a.join(","),
                     l = `g_${this.#j}_hcm_filter`,
                     h = (this.#gt = this.#At(l));
                 this.#Et(o, o, o, h);
                 this.#xt(h);
                 const getSteps = (t, e) => {
                     const i = n[t] / 255,
                         s = r[t] / 255,
                         a = new Array(e + 1);
                     for (let t = 0; t <= e; t++) a[t] = i + (t / e) * (s - i);
                     return a.join(",");
                 };
                 this.#Et(getSteps(0, 5), getSteps(1, 5), getSteps(2, 5), h);
                 this.#pt = `url(#${l})`;
                 return this.#pt;
             }
             addHighlightHCMFilter(t, e, i, n) {
                 const s = `${t}-${e}-${i}-${n}`;
                 if (this.#ft === s) return this.#mt;
                 this.#ft = s;
                 this.#mt = "none";
                 this.#gt?.remove();
                 if (!t || !e) return this.#mt;
                 const [r, a] = [t, e].map(this.#wt.bind(this));
                 let o = Math.round(0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]),
                     l = Math.round(0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]),
                     [h, c] = [i, n].map(this.#wt.bind(this));
                 l < o && ([o, l, h, c] = [l, o, c, h]);
                 this.#yt.style.color = "";
                 const getSteps = (t, e, i) => {
                         const n = new Array(256),
                             s = (l - o) / i,
                             r = t / 255,
                             a = (e - t) / (255 * i);
                         let h = 0;
                         for (let t = 0; t <= i; t++) {
                             const e = Math.round(o + t * s),
                                 i = r + t * a;
                             for (let t = h; t <= e; t++) n[t] = i;
                             h = e + 1;
                         }
                         for (let t = h; t < 256; t++) n[t] = n[h - 1];
                         return n.join(",");
                     },
                     d = `g_${this.#j}_hcm_highlight_filter`,
                     u = (this.#gt = this.#At(d));
                 this.#xt(u);
                 this.#Et(getSteps(h[0], c[0], 5), getSteps(h[1], c[1], 5), getSteps(h[2], c[2], 5), u);
                 this.#mt = `url(#${d})`;
                 return this.#mt;
             }
             destroy() {
                 if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) || (!this.#pt && !this.#mt)) {
                     if (this.#ht) {
                         this.#ht.parentNode.parentNode.remove();
                         this.#ht = null;
                     }
                     if (this.#lt) {
                         this.#lt.clear();
                         this.#lt = null;
                     }
                     this.#vt = 0;
                 }
             }
             #xt(t) {
                 const e = this.#ct.createElementNS(r, "feColorMatrix");
                 e.setAttribute("type", "matrix");
                 e.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0");
                 t.append(e);
             }
             #At(t) {
                 const e = this.#ct.createElementNS(r, "filter");
                 e.setAttribute("color-interpolation-filters", "sRGB");
                 e.setAttribute("id", t);
                 this.#yt.append(e);
                 return e;
             }
             #_t(t, e, i) {
                 const n = this.#ct.createElementNS(r, e);
                 n.setAttribute("type", "discrete");
                 n.setAttribute("tableValues", i);
                 t.append(n);
             }
             #Et(t, e, i, n) {
                 const s = this.#ct.createElementNS(r, "feComponentTransfer");
                 n.append(s);
                 this.#_t(s, "feFuncR", t);
                 this.#_t(s, "feFuncG", e);
                 this.#_t(s, "feFuncB", i);
             }
             #wt(t) {
                 this.#yt.style.color = t;
                 return getRGB(getComputedStyle(this.#yt).getPropertyValue("color"));
             }
         }
         class DOMCanvasFactory extends n.BaseCanvasFactory {
             constructor() {
                 let { ownerDocument: t = globalThis.document } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                 super();
                 this._document = t;
             }
             _createCanvas(t, e) {
                 const i = this._document.createElement("canvas");
                 i.width = t;
                 i.height = e;
                 return i;
             }
         }
         async function fetchData(t) {
             let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
             if (isValidFetchUrl(t, document.baseURI)) {
                 const i = await fetch(t);
                 if (!i.ok) throw new Error(i.statusText);
                 switch (e) {
                     case "arraybuffer":
                         return i.arrayBuffer();
                     case "blob":
                         return i.blob();
                     case "json":
                         return i.json();
                 }
                 return i.text();
             }
             return new Promise((i, n) => {
                 const s = new XMLHttpRequest();
                 s.open("GET", t, !0);
                 s.responseType = e;
                 s.onreadystatechange = () => {
                     if (s.readyState === XMLHttpRequest.DONE) {
                         if (200 === s.status || 0 === s.status) {
                             let t;
                             switch (e) {
                                 case "arraybuffer":
                                 case "blob":
                                 case "json":
                                     t = s.response;
                                     break;
                                 default:
                                     t = s.responseText;
                             }
                             if (t) {
                                 i(t);
                                 return;
                             }
                         }
                         n(new Error(s.statusText));
                     }
                 };
                 s.send(null);
             });
         }
         class DOMCMapReaderFactory extends n.BaseCMapReaderFactory {
             _fetchData(t, e) {
                 return fetchData(t, this.isCompressed ? "arraybuffer" : "text").then((t) => ({ cMapData: t instanceof ArrayBuffer ? new Uint8Array(t) : (0, s.stringToBytes)(t), compressionType: e }));
             }
         }
         class DOMStandardFontDataFactory extends n.BaseStandardFontDataFactory {
             _fetchData(t) {
                 return fetchData(t, "arraybuffer").then((t) => new Uint8Array(t));
             }
         }
         class DOMSVGFactory extends n.BaseSVGFactory {
             _createSVG(t) {
                 return document.createElementNS(r, t);
             }
         }
         class PageViewport {
             constructor(t) {
                 let { viewBox: e, scale: i, rotation: n, offsetX: s = 0, offsetY: r = 0, dontFlip: a = !1 } = t;
                 this.viewBox = e;
                 this.scale = i;
                 this.rotation = n;
                 this.offsetX = s;
                 this.offsetY = r;
                 const o = (e[2] + e[0]) / 2,
                     l = (e[3] + e[1]) / 2;
                 let h, c, d, u, p, g, f, m;
                 n %= 360;
                 n < 0 && (n += 360);
                 switch (n) {
                     case 180:
                         h = -1;
                         c = 0;
                         d = 0;
                         u = 1;
                         break;
                     case 90:
                         h = 0;
                         c = 1;
                         d = 1;
                         u = 0;
                         break;
                     case 270:
                         h = 0;
                         c = -1;
                         d = -1;
                         u = 0;
                         break;
                     case 0:
                         h = 1;
                         c = 0;
                         d = 0;
                         u = -1;
                         break;
                     default:
                         throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
                 }
                 if (a) {
                     d = -d;
                     u = -u;
                 }
                 if (0 === h) {
                     p = Math.abs(l - e[1]) * i + s;
                     g = Math.abs(o - e[0]) * i + r;
                     f = (e[3] - e[1]) * i;
                     m = (e[2] - e[0]) * i;
                 } else {
                     p = Math.abs(o - e[0]) * i + s;
                     g = Math.abs(l - e[1]) * i + r;
                     f = (e[2] - e[0]) * i;
                     m = (e[3] - e[1]) * i;
                 }
                 this.transform = [h * i, c * i, d * i, u * i, p - h * i * o - d * i * l, g - c * i * o - u * i * l];
                 this.width = f;
                 this.height = m;
             }
             get rawDims() {
                 const { viewBox: t } = this;
                 return (0, s.shadow)(this, "rawDims", { pageWidth: t[2] - t[0], pageHeight: t[3] - t[1], pageX: t[0], pageY: t[1] });
             }
             clone() {
                 let { scale: t = this.scale, rotation: e = this.rotation, offsetX: i = this.offsetX, offsetY: n = this.offsetY, dontFlip: s = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                 return new PageViewport({ viewBox: this.viewBox.slice(), scale: t, rotation: e, offsetX: i, offsetY: n, dontFlip: s });
             }
             convertToViewportPoint(t, e) {
                 return s.Util.applyTransform([t, e], this.transform);
             }
             convertToViewportRectangle(t) {
                 const e = s.Util.applyTransform([t[0], t[1]], this.transform),
                     i = s.Util.applyTransform([t[2], t[3]], this.transform);
                 return [e[0], e[1], i[0], i[1]];
             }
             convertToPdfPoint(t, e) {
                 return s.Util.applyInverseTransform([t, e], this.transform);
             }
         }
         class RenderingCancelledException extends s.BaseException {
             constructor(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                 super(t, "RenderingCancelledException");
                 this.extraDelay = e;
             }
         }
         function isDataScheme(t) {
             const e = t.length;
             let i = 0;
             for (; i < e && "" === t[i].trim(); ) i++;
             return "data:" === t.substring(i, i + 5).toLowerCase();
         }
         function isPdfFile(t) {
             return "string" == typeof t && /\.pdf$/i.test(t);
         }
         function getFilenameFromUrl(t) {
             (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) || ([t] = t.split(/[#?]/, 1));
             return t.substring(t.lastIndexOf("/") + 1);
         }
         function getPdfFilenameFromUrl(t) {
             let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "document.pdf";
             if ("string" != typeof t) return e;
             if (isDataScheme(t)) {
                 (0, s.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
                 return e;
             }
             const i = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i,
                 n = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/.exec(t);
             let r = i.exec(n[1]) || i.exec(n[2]) || i.exec(n[3]);
             if (r) {
                 r = r[0];
                 if (r.includes("%"))
                     try {
                         r = i.exec(decodeURIComponent(r))[0];
                     } catch {}
             }
             return r || e;
         }
         class StatTimer {
             started = Object.create(null);
             times = [];
             time(t) {
                 t in this.started && (0, s.warn)(`Timer is already running for ${t}`);
                 this.started[t] = Date.now();
             }
             timeEnd(t) {
                 t in this.started || (0, s.warn)(`Timer has not been started for ${t}`);
                 this.times.push({ name: t, start: this.started[t], end: Date.now() });
                 delete this.started[t];
             }
             toString() {
                 const t = [];
                 let e = 0;
                 for (const { name: t } of this.times) e = Math.max(t.length, e);
                 for (const { name: i, start: n, end: s } of this.times) t.push(`${i.padEnd(e)} ${s - n}ms\n`);
                 return t.join("");
             }
         }
         function isValidFetchUrl(t, e) {
             try {
                 const { protocol: i } = e ? new URL(t, e) : new URL(t);
                 return "http:" === i || "https:" === i;
             } catch {
                 return !1;
             }
         }
         function noContextMenu(t) {
             t.preventDefault();
         }
         let a;
         class PDFDateString {
             static toDateObject(t) {
                 if (!t || "string" != typeof t) return null;
                 a ||= new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?");
                 const e = a.exec(t);
                 if (!e) return null;
                 const i = parseInt(e[1], 10);
                 let n = parseInt(e[2], 10);
                 n = n >= 1 && n <= 12 ? n - 1 : 0;
                 let s = parseInt(e[3], 10);
                 s = s >= 1 && s <= 31 ? s : 1;
                 let r = parseInt(e[4], 10);
                 r = r >= 0 && r <= 23 ? r : 0;
                 let o = parseInt(e[5], 10);
                 o = o >= 0 && o <= 59 ? o : 0;
                 let l = parseInt(e[6], 10);
                 l = l >= 0 && l <= 59 ? l : 0;
                 const h = e[7] || "Z";
                 let c = parseInt(e[8], 10);
                 c = c >= 0 && c <= 23 ? c : 0;
                 let d = parseInt(e[9], 10) || 0;
                 d = d >= 0 && d <= 59 ? d : 0;
                 if ("-" === h) {
                     r += c;
                     o += d;
                 } else if ("+" === h) {
                     r -= c;
                     o -= d;
                 }
                 return new Date(Date.UTC(i, n, s, r, o, l));
             }
         }
         function getXfaPageViewport(t, e) {
             let { scale: i = 1, rotation: n = 0 } = e;
             const { width: s, height: r } = t.attributes.style,
                 a = [0, 0, parseInt(s), parseInt(r)];
             return new PageViewport({ viewBox: a, scale: i, rotation: n });
         }
         function getRGB(t) {
             if (t.startsWith("#")) {
                 const e = parseInt(t.slice(1), 16);
                 return [(16711680 & e) >> 16, (65280 & e) >> 8, 255 & e];
             }
             if (t.startsWith("rgb("))
                 return t
                     .slice(4, -1)
                     .split(",")
                     .map((t) => parseInt(t));
             if (t.startsWith("rgba("))
                 return t
                     .slice(5, -1)
                     .split(",")
                     .map((t) => parseInt(t))
                     .slice(0, 3);
             (0, s.warn)(`Not a valid color format: "${t}"`);
             return [0, 0, 0];
         }
         function getColorValues(t) {
             const e = document.createElement("span");
             e.style.visibility = "hidden";
             document.body.append(e);
             for (const i of t.keys()) {
                 e.style.color = i;
                 const n = window.getComputedStyle(e).color;
                 t.set(i, getRGB(n));
             }
             e.remove();
         }
         function getCurrentTransform(t) {
             const { a: e, b: i, c: n, d: s, e: r, f: a } = t.getTransform();
             return [e, i, n, s, r, a];
         }
         function getCurrentTransformInverse(t) {
             const { a: e, b: i, c: n, d: s, e: r, f: a } = t.getTransform().invertSelf();
             return [e, i, n, s, r, a];
         }
         function setLayerDimensions(t, e) {
             let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                 n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
             if (e instanceof PageViewport) {
                 const { pageWidth: n, pageHeight: r } = e.rawDims,
                     { style: a } = t,
                     o = s.FeatureTest.isCSSRoundSupported,
                     l = `var(--scale-factor) * ${n}px`,
                     h = `var(--scale-factor) * ${r}px`,
                     c = o ? `round(${l}, 1px)` : `calc(${l})`,
                     d = o ? `round(${h}, 1px)` : `calc(${h})`;
                 if (i && e.rotation % 180 != 0) {
                     a.width = d;
                     a.height = c;
                 } else {
                     a.width = c;
                     a.height = d;
                 }
             }
             n && t.setAttribute("data-main-rotation", e.rotation);
         }
     },
     9423: (t, e, i) => {
         i.d(e, { DrawLayer: () => DrawLayer });
         i(4226);
         var n = i(473),
             s = i(3266);
         class DrawLayer {
             #v = null;
             #vt = 0;
             #St = new Map();
             constructor(t) {
                 let { pageIndex: e } = t;
                 this.pageIndex = e;
             }
             setParent(t) {
                 if (this.#v) {
                     if (this.#v !== t) {
                         if (this.#St.size > 0)
                             for (const e of this.#St.values()) {
                                 e.remove();
                                 t.append(e);
                             }
                         this.#v = t;
                     }
                 } else this.#v = t;
             }
             static get _svgFactory() {
                 return (0, s.shadow)(this, "_svgFactory", new n.DOMSVGFactory());
             }
             static #Ct(t, e) {
                 let { x: i, y: n, width: s, height: r } = e;
                 const { style: a } = t;
                 a.top = 100 * n + "%";
                 a.left = 100 * i + "%";
                 a.width = 100 * s + "%";
                 a.height = 100 * r + "%";
             }
             #Tt(t) {
                 const e = DrawLayer._svgFactory.create(1, 1, !0);
                 this.#v.append(e);
                 DrawLayer.#Ct(e, t);
                 return e;
             }
             highlight(t, e, i) {
                 let { outlines: n, box: s } = t;
                 const r = this.#vt++,
                     a = this.#Tt(s);
                 a.classList.add("highlight");
                 const o = DrawLayer._svgFactory.createElement("defs");
                 a.append(o);
                 const l = DrawLayer._svgFactory.createElement("path");
                 o.append(l);
                 const h = `path_p${this.pageIndex}_${r}`;
                 l.setAttribute("id", h);
                 l.setAttribute("d", DrawLayer.#Pt(n));
                 const c = DrawLayer._svgFactory.createElement("clipPath");
                 o.append(c);
                 const d = `clip_${h}`;
                 c.setAttribute("id", d);
                 c.setAttribute("clipPathUnits", "objectBoundingBox");
                 const u = DrawLayer._svgFactory.createElement("use");
                 c.append(u);
                 u.setAttribute("href", `#${h}`);
                 u.classList.add("clip");
                 const p = DrawLayer._svgFactory.createElement("use");
                 a.append(p);
                 a.setAttribute("fill", e);
                 a.setAttribute("fill-opacity", i);
                 p.setAttribute("href", `#${h}`);
                 this.#St.set(r, a);
                 return { id: r, clipPathId: `url(#${d})` };
             }
             highlightOutline(t) {
                 let { outlines: e, box: i } = t;
                 const n = this.#vt++,
                     s = this.#Tt(i);
                 s.classList.add("highlightOutline");
                 const r = DrawLayer._svgFactory.createElement("defs");
                 s.append(r);
                 const a = DrawLayer._svgFactory.createElement("path");
                 r.append(a);
                 const o = `path_p${this.pageIndex}_${n}`;
                 a.setAttribute("id", o);
                 a.setAttribute("d", DrawLayer.#Pt(e));
                 a.setAttribute("vector-effect", "non-scaling-stroke");
                 const l = DrawLayer._svgFactory.createElement("use");
                 s.append(l);
                 l.setAttribute("href", `#${o}`);
                 const h = l.cloneNode();
                 s.append(h);
                 l.classList.add("mainOutline");
                 h.classList.add("secondaryOutline");
                 this.#St.set(n, s);
                 return n;
             }
             static #Pt(t) {
                 const e = [];
                 for (const i of t) {
                     let [t, n] = i;
                     e.push(`M${t} ${n}`);
                     for (let s = 2; s < i.length; s += 2) {
                         const r = i[s],
                             a = i[s + 1];
                         if (r === t) {
                             e.push(`V${a}`);
                             n = a;
                         } else if (a === n) {
                             e.push(`H${r}`);
                             t = r;
                         }
                     }
                     e.push("Z");
                 }
                 return e.join(" ");
             }
             updateBox(t, e) {
                 DrawLayer.#Ct(this.#St.get(t), e);
             }
             rotate(t, e) {
                 this.#St.get(t).setAttribute("data-main-rotation", e);
             }
             changeColor(t, e) {
                 this.#St.get(t).setAttribute("fill", e);
             }
             changeOpacity(t, e) {
                 this.#St.get(t).setAttribute("fill-opacity", e);
             }
             addClass(t, e) {
                 this.#St.get(t).classList.add(e);
             }
             removeClass(t, e) {
                 this.#St.get(t).classList.remove(e);
             }
             remove(t) {
                 if (null !== this.#v) {
                     this.#St.get(t).remove();
                     this.#St.delete(t);
                 }
             }
             destroy() {
                 this.#v = null;
                 for (const t of this.#St.values()) t.remove();
                 this.#St.clear();
             }
         }
     },
     4629: (t, e, i) => {
         i.d(e, { AnnotationEditorLayer: () => AnnotationEditorLayer });
         i(7944), i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914), i(4226);
         var n = i(3266),
             s = i(9115),
             r = (i(7121), i(8518), i(4812)),
             a = i(7640);
         class FreeTextEditor extends s.AnnotationEditor {
             #Mt = this.editorDivBlur.bind(this);
             #Rt = this.editorDivFocus.bind(this);
             #kt = this.editorDivInput.bind(this);
             #Ft = this.editorDivKeydown.bind(this);
             #u;
             #Dt = "";
             #It = `${this.id}-editor`;
             #Lt;
             #Ot = null;
             static _freeTextDefaultContent = "";
             static _internalPadding = 0;
             static _defaultColor = null;
             static _defaultFontSize = 10;
             static get _keyboardManager() {
                 const t = FreeTextEditor.prototype,
                     arrowChecker = (t) => t.isEmpty(),
                     e = r.AnnotationEditorUIManager.TRANSLATE_SMALL,
                     i = r.AnnotationEditorUIManager.TRANSLATE_BIG;
                 return (0, n.shadow)(
                     this,
                     "_keyboardManager",
                     new r.KeyboardManager([
                         [["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, { bubbles: !0 }],
                         [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], t.commitOrRemove],
                         [["ArrowLeft", "mac+ArrowLeft"], t._translateEmpty, { args: [-e, 0], checker: arrowChecker }],
                         [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t._translateEmpty, { args: [-i, 0], checker: arrowChecker }],
                         [["ArrowRight", "mac+ArrowRight"], t._translateEmpty, { args: [e, 0], checker: arrowChecker }],
                         [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t._translateEmpty, { args: [i, 0], checker: arrowChecker }],
                         [["ArrowUp", "mac+ArrowUp"], t._translateEmpty, { args: [0, -e], checker: arrowChecker }],
                         [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t._translateEmpty, { args: [0, -i], checker: arrowChecker }],
                         [["ArrowDown", "mac+ArrowDown"], t._translateEmpty, { args: [0, e], checker: arrowChecker }],
                         [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t._translateEmpty, { args: [0, i], checker: arrowChecker }],
                     ])
                 );
             }
             static _type = "freetext";
             static _editorType = n.AnnotationEditorType.FREETEXT;
             constructor(t) {
                 super({ ...t, name: "freeTextEditor" });
                 this.#u = t.color || FreeTextEditor._defaultColor || s.AnnotationEditor._defaultLineColor;
                 this.#Lt = t.fontSize || FreeTextEditor._defaultFontSize;
             }
             static initialize(t) {
                 s.AnnotationEditor.initialize(t, { strings: ["pdfjs-free-text-default-content"] });
                 const e = getComputedStyle(document.documentElement);
                 this._internalPadding = parseFloat(e.getPropertyValue("--freetext-padding"));
             }
             static updateDefaultParams(t, e) {
                 switch (t) {
                     case n.AnnotationEditorParamsType.FREETEXT_SIZE:
                         FreeTextEditor._defaultFontSize = e;
                         break;
                     case n.AnnotationEditorParamsType.FREETEXT_COLOR:
                         FreeTextEditor._defaultColor = e;
                 }
             }
             updateParams(t, e) {
                 switch (t) {
                     case n.AnnotationEditorParamsType.FREETEXT_SIZE:
                         this.#Bt(e);
                         break;
                     case n.AnnotationEditorParamsType.FREETEXT_COLOR:
                         this.#Nt(e);
                 }
             }
             static get defaultPropertiesToUpdate() {
                 return [
                     [n.AnnotationEditorParamsType.FREETEXT_SIZE, FreeTextEditor._defaultFontSize],
                     [n.AnnotationEditorParamsType.FREETEXT_COLOR, FreeTextEditor._defaultColor || s.AnnotationEditor._defaultLineColor],
                 ];
             }
             get propertiesToUpdate() {
                 return [
                     [n.AnnotationEditorParamsType.FREETEXT_SIZE, this.#Lt],
                     [n.AnnotationEditorParamsType.FREETEXT_COLOR, this.#u],
                 ];
             }
             #Bt(t) {
                 const setFontsize = (t) => {
                         this.editorDiv.style.fontSize = `calc(${t}px * var(--scale-factor))`;
                         this.translate(0, -(t - this.#Lt) * this.parentScale);
                         this.#Lt = t;
                         this.#Ut();
                     },
                     e = this.#Lt;
                 this.addCommands({
                     cmd: () => {
                         setFontsize(t);
                     },
                     undo: () => {
                         setFontsize(e);
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.FREETEXT_SIZE,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             #Nt(t) {
                 const e = this.#u;
                 this.addCommands({
                     cmd: () => {
                         this.#u = this.editorDiv.style.color = t;
                     },
                     undo: () => {
                         this.#u = this.editorDiv.style.color = e;
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.FREETEXT_COLOR,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             _translateEmpty(t, e) {
                 this._uiManager.translateSelectedEditors(t, e, !0);
             }
             getInitialTranslation() {
                 const t = this.parentScale;
                 return [-FreeTextEditor._internalPadding * t, -(FreeTextEditor._internalPadding + this.#Lt) * t];
             }
             rebuild() {
                 if (this.parent) {
                     super.rebuild();
                     null !== this.div && (this.isAttachedToDOM || this.parent.add(this));
                 }
             }
             enableEditMode() {
                 if (!this.isInEditMode()) {
                     this.parent.setEditingState(!1);
                     this.parent.updateToolbar(n.AnnotationEditorType.FREETEXT);
                     super.enableEditMode();
                     this.overlayDiv.classList.remove("enabled");
                     this.editorDiv.contentEditable = !0;
                     this._isDraggable = !1;
                     this.div.removeAttribute("aria-activedescendant");
                     this.editorDiv.addEventListener("keydown", this.#Ft);
                     this.editorDiv.addEventListener("focus", this.#Rt);
                     this.editorDiv.addEventListener("blur", this.#Mt);
                     this.editorDiv.addEventListener("input", this.#kt);
                 }
             }
             disableEditMode() {
                 if (this.isInEditMode()) {
                     this.parent.setEditingState(!0);
                     super.disableEditMode();
                     this.overlayDiv.classList.add("enabled");
                     this.editorDiv.contentEditable = !1;
                     this.div.setAttribute("aria-activedescendant", this.#It);
                     this._isDraggable = !0;
                     this.editorDiv.removeEventListener("keydown", this.#Ft);
                     this.editorDiv.removeEventListener("focus", this.#Rt);
                     this.editorDiv.removeEventListener("blur", this.#Mt);
                     this.editorDiv.removeEventListener("input", this.#kt);
                     this.div.focus({ preventScroll: !0 });
                     this.isEditing = !1;
                     this.parent.div.classList.add("freetextEditing");
                 }
             }
             focusin(t) {
                 if (this._focusEventsAllowed) {
                     super.focusin(t);
                     t.target !== this.editorDiv && this.editorDiv.focus();
                 }
             }
             onceAdded() {
                 if (this.width) this.#zt();
                 else {
                     this.enableEditMode();
                     this.editorDiv.focus();
                     this._initialOptions?.isCentered && this.center();
                     this._initialOptions = null;
                 }
             }
             isEmpty() {
                 return !this.editorDiv || "" === this.editorDiv.innerText.trim();
             }
             remove() {
                 this.isEditing = !1;
                 if (this.parent) {
                     this.parent.setEditingState(!0);
                     this.parent.div.classList.add("freetextEditing");
                 }
                 super.remove();
             }
             #jt() {
                 const t = this.editorDiv.getElementsByTagName("div");
                 if (0 === t.length) return this.editorDiv.innerText;
                 const e = [];
                 for (const i of t) e.push(i.innerText.replace(/\r\n?|\n/, ""));
                 return e.join("\n");
             }
             #Ut() {
                 const [t, e] = this.parentDimensions;
                 let i;
                 if (this.isAttachedToDOM) i = this.div.getBoundingClientRect();
                 else {
                     const { currentLayer: t, div: e } = this,
                         n = e.style.display;
                     e.style.display = "hidden";
                     t.div.append(this.div);
                     i = e.getBoundingClientRect();
                     e.remove();
                     e.style.display = n;
                 }
                 if (this.rotation % 180 == this.parentRotation % 180) {
                     this.width = i.width / t;
                     this.height = i.height / e;
                 } else {
                     this.width = i.height / t;
                     this.height = i.width / e;
                 }
                 this.fixAndSetPosition();
             }
             commit() {
                 if (!this.isInEditMode()) return;
                 super.commit();
                 this.disableEditMode();
                 const t = this.#Dt,
                     e = (this.#Dt = this.#jt().trimEnd());
                 if (t === e) return;
                 const setText = (t) => {
                     this.#Dt = t;
                     if (t) {
                         this.#Ht();
                         this._uiManager.rebuild(this);
                         this.#Ut();
                     } else this.remove();
                 };
                 this.addCommands({
                     cmd: () => {
                         setText(e);
                     },
                     undo: () => {
                         setText(t);
                     },
                     mustExec: !1,
                 });
                 this.#Ut();
             }
             shouldGetKeyboardEvents() {
                 return this.isInEditMode();
             }
             enterInEditMode() {
                 this.enableEditMode();
                 this.editorDiv.focus();
             }
             dblclick(t) {
                 this.enterInEditMode();
             }
             keydown(t) {
                 if (t.target === this.div && "Enter" === t.key) {
                     this.enterInEditMode();
                     t.preventDefault();
                 }
             }
             editorDivKeydown(t) {
                 FreeTextEditor._keyboardManager.exec(this, t);
             }
             editorDivFocus(t) {
                 this.isEditing = !0;
             }
             editorDivBlur(t) {
                 this.isEditing = !1;
             }
             editorDivInput(t) {
                 this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
             }
             disableEditing() {
                 this.editorDiv.setAttribute("role", "comment");
                 this.editorDiv.removeAttribute("aria-multiline");
             }
             enableEditing() {
                 this.editorDiv.setAttribute("role", "textbox");
                 this.editorDiv.setAttribute("aria-multiline", !0);
             }
             render() {
                 if (this.div) return this.div;
                 let t, e;
                 if (this.width) {
                     t = this.x;
                     e = this.y;
                 }
                 super.render();
                 this.editorDiv = document.createElement("div");
                 this.editorDiv.className = "internal";
                 this.editorDiv.setAttribute("id", this.#It);
                 this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text");
                 this.enableEditing();
                 s.AnnotationEditor._l10nPromise.get("pdfjs-free-text-default-content").then((t) => this.editorDiv?.setAttribute("default-content", t));
                 this.editorDiv.contentEditable = !0;
                 const { style: i } = this.editorDiv;
                 i.fontSize = `calc(${this.#Lt}px * var(--scale-factor))`;
                 i.color = this.#u;
                 this.div.append(this.editorDiv);
                 this.overlayDiv = document.createElement("div");
                 this.overlayDiv.classList.add("overlay", "enabled");
                 this.div.append(this.overlayDiv);
                 (0, r.bindEvents)(this, this.div, ["dblclick", "keydown"]);
                 if (this.width) {
                     const [i, n] = this.parentDimensions;
                     if (this.annotationElementId) {
                         const { position: s } = this.#Ot;
                         let [r, a] = this.getInitialTranslation();
                         [r, a] = this.pageTranslationToScreen(r, a);
                         const [o, l] = this.pageDimensions,
                             [h, c] = this.pageTranslation;
                         let d, u;
                         switch (this.rotation) {
                             case 0:
                                 d = t + (s[0] - h) / o;
                                 u = e + this.height - (s[1] - c) / l;
                                 break;
                             case 90:
                                 d = t + (s[0] - h) / o;
                                 u = e - (s[1] - c) / l;
                                 [r, a] = [a, -r];
                                 break;
                             case 180:
                                 d = t - this.width + (s[0] - h) / o;
                                 u = e - (s[1] - c) / l;
                                 [r, a] = [-r, -a];
                                 break;
                             case 270:
                                 d = t + (s[0] - h - this.height * l) / o;
                                 u = e + (s[1] - c - this.width * o) / l;
                                 [r, a] = [-a, r];
                         }
                         this.setAt(d * i, u * n, r, a);
                     } else this.setAt(t * i, e * n, this.width * i, this.height * n);
                     this.#Ht();
                     this._isDraggable = !0;
                     this.editorDiv.contentEditable = !1;
                 } else {
                     this._isDraggable = !1;
                     this.editorDiv.contentEditable = !0;
                 }
                 return this.div;
             }
             #Ht() {
                 this.editorDiv.replaceChildren();
                 if (this.#Dt)
                     for (const t of this.#Dt.split("\n")) {
                         const e = document.createElement("div");
                         e.append(t ? document.createTextNode(t) : document.createElement("br"));
                         this.editorDiv.append(e);
                     }
             }
             get contentDiv() {
                 return this.editorDiv;
             }
             static deserialize(t, e, i) {
                 let s = null;
                 if (t instanceof a.FreeTextAnnotationElement) {
                     const {
                         data: {
                             defaultAppearanceData: { fontSize: e, fontColor: i },
                             rect: r,
                             rotation: a,
                             id: o,
                         },
                         textContent: l,
                         textPosition: h,
                         parent: {
                             page: { pageNumber: c },
                         },
                     } = t;
                     if (!l || 0 === l.length) return null;
                     s = t = { annotationType: n.AnnotationEditorType.FREETEXT, color: Array.from(i), fontSize: e, value: l.join("\n"), position: h, pageIndex: c - 1, rect: r, rotation: a, id: o, deleted: !1 };
                 }
                 const r = super.deserialize(t, e, i);
                 r.#Lt = t.fontSize;
                 r.#u = n.Util.makeHexColor(...t.color);
                 r.#Dt = t.value;
                 r.annotationElementId = t.id || null;
                 r.#Ot = s;
                 return r;
             }
             serialize() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (this.isEmpty()) return null;
                 if (this.deleted) return { pageIndex: this.pageIndex, id: this.annotationElementId, deleted: !0 };
                 const e = FreeTextEditor._internalPadding * this.parentScale,
                     i = this.getRect(e, e),
                     r = s.AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.#u),
                     a = { annotationType: n.AnnotationEditorType.FREETEXT, color: r, fontSize: this.#Lt, value: this.#Dt, pageIndex: this.pageIndex, rect: i, rotation: this.rotation, structTreeParentId: this._structTreeParentId };
                 if (t) return a;
                 if (this.annotationElementId && !this.#Vt(a)) return null;
                 a.id = this.annotationElementId;
                 return a;
             }
             #Vt(t) {
                 const { value: e, fontSize: i, color: n, rect: s, pageIndex: r } = this.#Ot;
                 return t.value !== e || t.fontSize !== i || t.rect.some((t, e) => Math.abs(t - s[e]) >= 1) || t.color.some((t, e) => t !== n[e]) || t.pageIndex !== r;
             }
             #zt() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (!this.annotationElementId) return;
                 this.#Ut();
                 if (!t && (0 === this.width || 0 === this.height)) {
                     setTimeout(() => this.#zt(!0), 0);
                     return;
                 }
                 const e = FreeTextEditor._internalPadding * this.parentScale;
                 this.#Ot.rect = this.getRect(e, e);
             }
         }
         var o = i(5097),
             l = i(7405);
         class HighlightEditor extends s.AnnotationEditor {
             #Wt;
             #Gt = null;
             #qt = null;
             #$t = null;
             #Kt = null;
             #Xt = null;
             #vt = null;
             #Yt = null;
             #Jt;
             #Qt = null;
             static _defaultColor = null;
             static _defaultOpacity = 1;
             static _l10nPromise;
             static _type = "highlight";
             static _editorType = n.AnnotationEditorType.HIGHLIGHT;
             constructor(t) {
                 super({ ...t, name: "highlightEditor" });
                 HighlightEditor._defaultColor ||= this._uiManager.highlightColors?.values().next().value || "#fff066";
                 this.color = t.color || HighlightEditor._defaultColor;
                 this.#Jt = t.opacity || HighlightEditor._defaultOpacity;
                 this.#Wt = t.boxes || null;
                 this._isDraggable = !1;
                 this.#Zt();
                 this.#te();
                 this.rotate(this.rotation);
             }
             #Zt() {
                 const t = new l.Outliner(this.#Wt, 0.001);
                 this.#Xt = t.getOutlines();
                 ({ x: this.x, y: this.y, width: this.width, height: this.height } = this.#Xt.box);
                 const e = new l.Outliner(this.#Wt, 0.0025, 0.001, "ltr" === this._uiManager.direction);
                 this.#$t = e.getOutlines();
                 const { lastPoint: i } = this.#$t.box;
                 this.#Yt = [(i[0] - this.x) / this.width, (i[1] - this.y) / this.height];
             }
             static initialize(t) {
                 s.AnnotationEditor.initialize(t);
             }
             static updateDefaultParams(t, e) {
                 if (t === n.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR) HighlightEditor._defaultColor = e;
             }
             get toolbarPosition() {
                 return this.#Yt;
             }
             updateParams(t, e) {
                 if (t === n.AnnotationEditorParamsType.HIGHLIGHT_COLOR) this.#Nt(e);
             }
             static get defaultPropertiesToUpdate() {
                 return [[n.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, HighlightEditor._defaultColor]];
             }
             get propertiesToUpdate() {
                 return [[n.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || HighlightEditor._defaultColor]];
             }
             #Nt(t) {
                 const e = this.color;
                 this.addCommands({
                     cmd: () => {
                         this.color = t;
                         this.parent.drawLayer.changeColor(this.#vt, t);
                         this.#qt?.updateColor(t);
                     },
                     undo: () => {
                         this.color = e;
                         this.parent.drawLayer.changeColor(this.#vt, e);
                         this.#qt?.updateColor(e);
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.HIGHLIGHT_COLOR,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             async addEditToolbar() {
                 const t = await super.addEditToolbar();
                 if (!t) return null;
                 if (this._uiManager.highlightColors) {
                     this.#qt = new o.ColorPicker({ editor: this });
                     t.addColorPicker(this.#qt);
                 }
                 return t;
             }
             disableEditing() {
                 super.disableEditing();
                 this.div.classList.toggle("disabled", !0);
             }
             enableEditing() {
                 super.enableEditing();
                 this.div.classList.toggle("disabled", !1);
             }
             fixAndSetPosition() {
                 return super.fixAndSetPosition(0);
             }
             getRect(t, e) {
                 return super.getRect(t, e, 0);
             }
             onceAdded() {
                 this.parent.addUndoableEditor(this);
                 this.div.focus();
             }
             remove() {
                 super.remove();
                 this.#ee();
             }
             rebuild() {
                 if (this.parent) {
                     super.rebuild();
                     if (null !== this.div) {
                         this.#te();
                         this.isAttachedToDOM || this.parent.add(this);
                     }
                 }
             }
             setParent(t) {
                 let e = !1;
                 if (this.parent && !t) this.#ee();
                 else if (t) {
                     this.#te(t);
                     e = !this.parent && this.div?.classList.contains("selectedEditor");
                 }
                 super.setParent(t);
                 e && this.select();
             }
             #ee() {
                 if (null !== this.#vt && this.parent) {
                     this.parent.drawLayer.remove(this.#vt);
                     this.#vt = null;
                     this.parent.drawLayer.remove(this.#Qt);
                     this.#Qt = null;
                 }
             }
             #te() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.parent;
                 if (null === this.#vt) {
                     ({ id: this.#vt, clipPathId: this.#Gt } = t.drawLayer.highlight(this.#Xt, this.color, this.#Jt));
                     this.#Kt && (this.#Kt.style.clipPath = this.#Gt);
                     this.#Qt = t.drawLayer.highlightOutline(this.#$t);
                 }
             }
             static #ie(t, e) {
                 let { x: i, y: n, width: s, height: r } = t;
                 switch (e) {
                     case 90:
                         return { x: 1 - n - r, y: i, width: r, height: s };
                     case 180:
                         return { x: 1 - i - s, y: 1 - n - r, width: s, height: r };
                     case 270:
                         return { x: n, y: 1 - i - s, width: r, height: s };
                 }
                 return { x: i, y: n, width: s, height: r };
             }
             rotate(t) {
                 const { drawLayer: e } = this.parent;
                 e.rotate(this.#vt, t);
                 e.rotate(this.#Qt, t);
                 e.updateBox(this.#vt, HighlightEditor.#ie(this, t));
                 e.updateBox(this.#Qt, HighlightEditor.#ie(this.#$t.box, t));
             }
             render() {
                 if (this.div) return this.div;
                 const t = super.render(),
                     e = (this.#Kt = document.createElement("div"));
                 t.append(e);
                 e.className = "internal";
                 e.style.clipPath = this.#Gt;
                 const [i, n] = this.parentDimensions;
                 this.setDims(this.width * i, this.height * n);
                 (0, r.bindEvents)(this, this.#Kt, ["pointerover", "pointerleave"]);
                 this.enableEditing();
                 return t;
             }
             pointerover() {
                 this.parent.drawLayer.addClass(this.#Qt, "hovered");
             }
             pointerleave() {
                 this.parent.drawLayer.removeClass(this.#Qt, "hovered");
             }
             select() {
                 super.select();
                 this.parent?.drawLayer.removeClass(this.#Qt, "hovered");
                 this.parent?.drawLayer.addClass(this.#Qt, "selected");
             }
             unselect() {
                 super.unselect();
                 this.parent?.drawLayer.removeClass(this.#Qt, "selected");
             }
             #ne() {
                 const [t, e] = this.pageDimensions,
                     i = this.#Wt,
                     n = new Array(8 * i.length);
                 let s = 0;
                 for (const { x: r, y: a, width: o, height: l } of i) {
                     const i = r * t,
                         h = (1 - a - l) * e;
                     n[s] = n[s + 4] = i;
                     n[s + 1] = n[s + 3] = h;
                     n[s + 2] = n[s + 6] = i + o * t;
                     n[s + 5] = n[s + 7] = h + l * e;
                     s += 8;
                 }
                 return n;
             }
             #se() {
                 const [t, e] = this.pageDimensions,
                     i = this.width * t,
                     n = this.height * e,
                     s = this.x * t,
                     r = (1 - this.y - this.height) * e,
                     a = [];
                 for (const t of this.#Xt.outlines) {
                     const e = new Array(t.length);
                     for (let a = 0; a < t.length; a += 2) {
                         e[a] = s + t[a] * i;
                         e[a + 1] = r + (1 - t[a + 1]) * n;
                     }
                     a.push(e);
                 }
                 return a;
             }
             static deserialize(t, e, i) {
                 const s = super.deserialize(t, e, i),
                     { rect: r, color: a, quadPoints: o } = t;
                 s.color = n.Util.makeHexColor(...a);
                 s.#Jt = t.opacity;
                 const [l, h] = s.pageDimensions;
                 s.width = (r[2] - r[0]) / l;
                 s.height = (r[3] - r[1]) / h;
                 const c = (s.#Wt = []);
                 for (let t = 0; t < o.length; t += 8) c.push({ x: o[4] / l, y: 1 - o[t + 5] / h, width: (o[t + 2] - o[t]) / l, height: (o[t + 5] - o[t + 1]) / h });
                 s.#Zt();
                 return s;
             }
             serialize() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (this.isEmpty() || t) return null;
                 const e = this.getRect(0, 0),
                     i = s.AnnotationEditor._colorManager.convert(this.color);
                 return {
                     annotationType: n.AnnotationEditorType.HIGHLIGHT,
                     color: i,
                     opacity: this.#Jt,
                     quadPoints: this.#ne(),
                     outlines: this.#se(),
                     pageIndex: this.pageIndex,
                     rect: e,
                     rotation: 0,
                     structTreeParentId: this._structTreeParentId,
                 };
             }
             static canCreateNewEmptyEditor() {
                 return !1;
             }
         }
         i(3352);
         var h = i(473);
         class InkEditor extends s.AnnotationEditor {
             #re = 0;
             #ae = 0;
             #oe = this.canvasPointermove.bind(this);
             #le = this.canvasPointerleave.bind(this);
             #he = this.canvasPointerup.bind(this);
             #ce = this.canvasPointerdown.bind(this);
             #de = null;
             #ue = new Path2D();
             #pe = !1;
             #ge = !1;
             #fe = !1;
             #me = null;
             #ve = 0;
             #be = 0;
             #ye = null;
             static _defaultColor = null;
             static _defaultOpacity = 1;
             static _defaultThickness = 1;
             static _type = "ink";
             static _editorType = n.AnnotationEditorType.INK;
             constructor(t) {
                 super({ ...t, name: "inkEditor" });
                 this.color = t.color || null;
                 this.thickness = t.thickness || null;
                 this.opacity = t.opacity || null;
                 this.paths = [];
                 this.bezierPath2D = [];
                 this.allRawPaths = [];
                 this.currentPath = [];
                 this.scaleFactor = 1;
                 this.translationX = this.translationY = 0;
                 this.x = 0;
                 this.y = 0;
                 this._willKeepAspectRatio = !0;
             }
             static initialize(t) {
                 s.AnnotationEditor.initialize(t);
             }
             static updateDefaultParams(t, e) {
                 switch (t) {
                     case n.AnnotationEditorParamsType.INK_THICKNESS:
                         InkEditor._defaultThickness = e;
                         break;
                     case n.AnnotationEditorParamsType.INK_COLOR:
                         InkEditor._defaultColor = e;
                         break;
                     case n.AnnotationEditorParamsType.INK_OPACITY:
                         InkEditor._defaultOpacity = e / 100;
                 }
             }
             updateParams(t, e) {
                 switch (t) {
                     case n.AnnotationEditorParamsType.INK_THICKNESS:
                         this.#Ae(e);
                         break;
                     case n.AnnotationEditorParamsType.INK_COLOR:
                         this.#Nt(e);
                         break;
                     case n.AnnotationEditorParamsType.INK_OPACITY:
                         this.#Ee(e);
                 }
             }
             static get defaultPropertiesToUpdate() {
                 return [
                     [n.AnnotationEditorParamsType.INK_THICKNESS, InkEditor._defaultThickness],
                     [n.AnnotationEditorParamsType.INK_COLOR, InkEditor._defaultColor || s.AnnotationEditor._defaultLineColor],
                     [n.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * InkEditor._defaultOpacity)],
                 ];
             }
             get propertiesToUpdate() {
                 return [
                     [n.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || InkEditor._defaultThickness],
                     [n.AnnotationEditorParamsType.INK_COLOR, this.color || InkEditor._defaultColor || s.AnnotationEditor._defaultLineColor],
                     [n.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? InkEditor._defaultOpacity))],
                 ];
             }
             #Ae(t) {
                 const e = this.thickness;
                 this.addCommands({
                     cmd: () => {
                         this.thickness = t;
                         this.#we();
                     },
                     undo: () => {
                         this.thickness = e;
                         this.#we();
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.INK_THICKNESS,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             #Nt(t) {
                 const e = this.color;
                 this.addCommands({
                     cmd: () => {
                         this.color = t;
                         this.#xe();
                     },
                     undo: () => {
                         this.color = e;
                         this.#xe();
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.INK_COLOR,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             #Ee(t) {
                 t /= 100;
                 const e = this.opacity;
                 this.addCommands({
                     cmd: () => {
                         this.opacity = t;
                         this.#xe();
                     },
                     undo: () => {
                         this.opacity = e;
                         this.#xe();
                     },
                     mustExec: !0,
                     type: n.AnnotationEditorParamsType.INK_OPACITY,
                     overwriteIfSameType: !0,
                     keepUndo: !0,
                 });
             }
             rebuild() {
                 if (this.parent) {
                     super.rebuild();
                     if (null !== this.div) {
                         if (!this.canvas) {
                             this.#_e();
                             this.#Se();
                         }
                         if (!this.isAttachedToDOM) {
                             this.parent.add(this);
                             this.#Ce();
                         }
                         this.#we();
                     }
                 }
             }
             remove() {
                 if (null !== this.canvas) {
                     this.isEmpty() || this.commit();
                     this.canvas.width = this.canvas.height = 0;
                     this.canvas.remove();
                     this.canvas = null;
                     if (this.#de) {
                         clearTimeout(this.#de);
                         this.#de = null;
                     }
                     this.#me.disconnect();
                     this.#me = null;
                     super.remove();
                 }
             }
             setParent(t) {
                 !this.parent && t ? this._uiManager.removeShouldRescale(this) : this.parent && null === t && this._uiManager.addShouldRescale(this);
                 super.setParent(t);
             }
             onScaleChanging() {
                 const [t, e] = this.parentDimensions,
                     i = this.width * t,
                     n = this.height * e;
                 this.setDimensions(i, n);
             }
             enableEditMode() {
                 if (!this.#pe && null !== this.canvas) {
                     super.enableEditMode();
                     this._isDraggable = !1;
                     this.canvas.addEventListener("pointerdown", this.#ce);
                 }
             }
             disableEditMode() {
                 if (this.isInEditMode() && null !== this.canvas) {
                     super.disableEditMode();
                     this._isDraggable = !this.isEmpty();
                     this.div.classList.remove("editing");
                     this.canvas.removeEventListener("pointerdown", this.#ce);
                 }
             }
             onceAdded() {
                 this._isDraggable = !this.isEmpty();
             }
             isEmpty() {
                 return 0 === this.paths.length || (1 === this.paths.length && 0 === this.paths[0].length);
             }
             #Te() {
                 const {
                     parentRotation: t,
                     parentDimensions: [e, i],
                 } = this;
                 switch (t) {
                     case 90:
                         return [0, i, i, e];
                     case 180:
                         return [e, i, e, i];
                     case 270:
                         return [e, 0, i, e];
                     default:
                         return [0, 0, e, i];
                 }
             }
             #Pe() {
                 const { ctx: t, color: e, opacity: i, thickness: n, parentScale: s, scaleFactor: a } = this;
                 t.lineWidth = (n * s) / a;
                 t.lineCap = "round";
                 t.lineJoin = "round";
                 t.miterLimit = 10;
                 t.strokeStyle = `${e}${(0, r.opacityToHex)(i)}`;
             }
             #Me(t, e) {
                 this.canvas.addEventListener("contextmenu", h.noContextMenu);
                 this.canvas.addEventListener("pointerleave", this.#le);
                 this.canvas.addEventListener("pointermove", this.#oe);
                 this.canvas.addEventListener("pointerup", this.#he);
                 this.canvas.removeEventListener("pointerdown", this.#ce);
                 this.isEditing = !0;
                 if (!this.#fe) {
                     this.#fe = !0;
                     this.#Ce();
                     this.thickness ||= InkEditor._defaultThickness;
                     this.color ||= InkEditor._defaultColor || s.AnnotationEditor._defaultLineColor;
                     this.opacity ??= InkEditor._defaultOpacity;
                 }
                 this.currentPath.push([t, e]);
                 this.#ge = !1;
                 this.#Pe();
                 this.#ye = () => {
                     this.#Re();
                     this.#ye && window.requestAnimationFrame(this.#ye);
                 };
                 window.requestAnimationFrame(this.#ye);
             }
             #ke(t, e) {
                 const [i, n] = this.currentPath.at(-1);
                 if (this.currentPath.length > 1 && t === i && e === n) return;
                 const s = this.currentPath;
                 let r = this.#ue;
                 s.push([t, e]);
                 this.#ge = !0;
                 if (s.length <= 2) {
                     r.moveTo(...s[0]);
                     r.lineTo(t, e);
                 } else {
                     if (3 === s.length) {
                         this.#ue = r = new Path2D();
                         r.moveTo(...s[0]);
                     }
                     this.#Fe(r, ...s.at(-3), ...s.at(-2), t, e);
                 }
             }
             #De() {
                 if (0 === this.currentPath.length) return;
                 const t = this.currentPath.at(-1);
                 this.#ue.lineTo(...t);
             }
             #Ie(t, e) {
                 this.#ye = null;
                 t = Math.min(Math.max(t, 0), this.canvas.width);
                 e = Math.min(Math.max(e, 0), this.canvas.height);
                 this.#ke(t, e);
                 this.#De();
                 let i;
                 if (1 !== this.currentPath.length) i = this.#Le();
                 else {
                     const n = [t, e];
                     i = [[n, n.slice(), n.slice(), n]];
                 }
                 const n = this.#ue,
                     s = this.currentPath;
                 this.currentPath = [];
                 this.#ue = new Path2D();
                 this.addCommands({
                     cmd: () => {
                         this.allRawPaths.push(s);
                         this.paths.push(i);
                         this.bezierPath2D.push(n);
                         this.rebuild();
                     },
                     undo: () => {
                         this.allRawPaths.pop();
                         this.paths.pop();
                         this.bezierPath2D.pop();
                         if (0 === this.paths.length) this.remove();
                         else {
                             if (!this.canvas) {
                                 this.#_e();
                                 this.#Se();
                             }
                             this.#we();
                         }
                     },
                     mustExec: !0,
                 });
             }
             #Re() {
                 if (!this.#ge) return;
                 this.#ge = !1;
                 const t = Math.ceil(this.thickness * this.parentScale),
                     e = this.currentPath.slice(-3),
                     i = e.map((t) => t[0]),
                     n = e.map((t) => t[1]),
                     { ctx: s } = (Math.min(...i), Math.max(...i), Math.min(...n), Math.max(...n), this);
                 s.save();
                 s.clearRect(0, 0, this.canvas.width, this.canvas.height);
                 for (const t of this.bezierPath2D) s.stroke(t);
                 s.stroke(this.#ue);
                 s.restore();
             }
             #Fe(t, e, i, n, s, r, a) {
                 const o = (e + n) / 2,
                     l = (i + s) / 2,
                     h = (n + r) / 2,
                     c = (s + a) / 2;
                 t.bezierCurveTo(o + (2 * (n - o)) / 3, l + (2 * (s - l)) / 3, h + (2 * (n - h)) / 3, c + (2 * (s - c)) / 3, h, c);
             }
             #Le() {
                 const t = this.currentPath;
                 if (t.length <= 2) return [[t[0], t[0], t.at(-1), t.at(-1)]];
                 const e = [];
                 let i,
                     [n, s] = t[0];
                 for (i = 1; i < t.length - 2; i++) {
                     const [r, a] = t[i],
                         [o, l] = t[i + 1],
                         h = (r + o) / 2,
                         c = (a + l) / 2,
                         d = [n + (2 * (r - n)) / 3, s + (2 * (a - s)) / 3],
                         u = [h + (2 * (r - h)) / 3, c + (2 * (a - c)) / 3];
                     e.push([[n, s], d, u, [h, c]]);
                     [n, s] = [h, c];
                 }
                 const [r, a] = t[i],
                     [o, l] = t[i + 1],
                     h = [n + (2 * (r - n)) / 3, s + (2 * (a - s)) / 3],
                     c = [o + (2 * (r - o)) / 3, l + (2 * (a - l)) / 3];
                 e.push([[n, s], h, c, [o, l]]);
                 return e;
             }
             #xe() {
                 if (this.isEmpty()) {
                     this.#Oe();
                     return;
                 }
                 this.#Pe();
                 const { canvas: t, ctx: e } = this;
                 e.setTransform(1, 0, 0, 1, 0, 0);
                 e.clearRect(0, 0, t.width, t.height);
                 this.#Oe();
                 for (const t of this.bezierPath2D) e.stroke(t);
             }
             commit() {
                 if (!this.#pe) {
                     super.commit();
                     this.isEditing = !1;
                     this.disableEditMode();
                     this.setInForeground();
                     this.#pe = !0;
                     this.div.classList.add("disabled");
                     this.#we(!0);
                     this.select();
                     this.parent.addInkEditorIfNeeded(!0);
                     this.moveInDOM();
                     this.div.focus({ preventScroll: !0 });
                 }
             }
             focusin(t) {
                 if (this._focusEventsAllowed) {
                     super.focusin(t);
                     this.enableEditMode();
                 }
             }
             canvasPointerdown(t) {
                 if (0 === t.button && this.isInEditMode() && !this.#pe) {
                     this.setInForeground();
                     t.preventDefault();
                     this.div.contains(document.activeElement) || this.div.focus({ preventScroll: !0 });
                     this.#Me(t.offsetX, t.offsetY);
                 }
             }
             canvasPointermove(t) {
                 t.preventDefault();
                 this.#ke(t.offsetX, t.offsetY);
             }
             canvasPointerup(t) {
                 t.preventDefault();
                 this.#Be(t);
             }
             canvasPointerleave(t) {
                 this.#Be(t);
             }
             #Be(t) {
                 this.canvas.removeEventListener("pointerleave", this.#le);
                 this.canvas.removeEventListener("pointermove", this.#oe);
                 this.canvas.removeEventListener("pointerup", this.#he);
                 this.canvas.addEventListener("pointerdown", this.#ce);
                 this.#de && clearTimeout(this.#de);
                 this.#de = setTimeout(() => {
                     this.#de = null;
                     this.canvas.removeEventListener("contextmenu", h.noContextMenu);
                 }, 10);
                 this.#Ie(t.offsetX, t.offsetY);
                 this.addToAnnotationStorage();
                 this.setInBackground();
             }
             #_e() {
                 this.canvas = document.createElement("canvas");
                 this.canvas.width = this.canvas.height = 0;
                 this.canvas.className = "inkEditorCanvas";
                 this.canvas.setAttribute("data-l10n-id", "pdfjs-ink-canvas");
                 this.div.append(this.canvas);
                 this.ctx = this.canvas.getContext("2d");
             }
             #Se() {
                 this.#me = new ResizeObserver((t) => {
                     const e = t[0].contentRect;
                     e.width && e.height && this.setDimensions(e.width, e.height);
                 });
                 this.#me.observe(this.div);
             }
             get isResizable() {
                 return !this.isEmpty() && this.#pe;
             }
             render() {
                 if (this.div) return this.div;
                 let t, e;
                 if (this.width) {
                     t = this.x;
                     e = this.y;
                 }
                 super.render();
                 this.div.setAttribute("data-l10n-id", "pdfjs-ink");
                 const [i, n, s, r] = this.#Te();
                 this.setAt(i, n, 0, 0);
                 this.setDims(s, r);
                 this.#_e();
                 if (this.width) {
                     const [i, n] = this.parentDimensions;
                     this.setAspectRatio(this.width * i, this.height * n);
                     this.setAt(t * i, e * n, this.width * i, this.height * n);
                     this.#fe = !0;
                     this.#Ce();
                     this.setDims(this.width * i, this.height * n);
                     this.#xe();
                     this.div.classList.add("disabled");
                 } else {
                     this.div.classList.add("editing");
                     this.enableEditMode();
                 }
                 this.#Se();
                 return this.div;
             }
             #Ce() {
                 if (!this.#fe) return;
                 const [t, e] = this.parentDimensions;
                 this.canvas.width = Math.ceil(this.width * t);
                 this.canvas.height = Math.ceil(this.height * e);
                 this.#Oe();
             }
             setDimensions(t, e) {
                 const i = Math.round(t),
                     n = Math.round(e);
                 if (this.#ve === i && this.#be === n) return;
                 this.#ve = i;
                 this.#be = n;
                 this.canvas.style.visibility = "hidden";
                 const [s, r] = this.parentDimensions;
                 this.width = t / s;
                 this.height = e / r;
                 this.fixAndSetPosition();
                 this.#pe && this.#Ne(t, e);
                 this.#Ce();
                 this.#xe();
                 this.canvas.style.visibility = "visible";
                 this.fixDims();
             }
             #Ne(t, e) {
                 const i = this.#Ue(),
                     n = (t - i) / this.#ae,
                     s = (e - i) / this.#re;
                 this.scaleFactor = Math.min(n, s);
             }
             #Oe() {
                 const t = this.#Ue() / 2;
                 this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + t, this.translationY * this.scaleFactor + t);
             }
             static #ze(t) {
                 const e = new Path2D();
                 for (let i = 0, n = t.length; i < n; i++) {
                     const [n, s, r, a] = t[i];
                     0 === i && e.moveTo(...n);
                     e.bezierCurveTo(s[0], s[1], r[0], r[1], a[0], a[1]);
                 }
                 return e;
             }
             static #je(t, e, i) {
                 const [n, s, r, a] = e;
                 switch (i) {
                     case 0:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             t[e] += n;
                             t[e + 1] = a - t[e + 1];
                         }
                         break;
                     case 90:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             const i = t[e];
                             t[e] = t[e + 1] + n;
                             t[e + 1] = i + s;
                         }
                         break;
                     case 180:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             t[e] = r - t[e];
                             t[e + 1] += s;
                         }
                         break;
                     case 270:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             const i = t[e];
                             t[e] = r - t[e + 1];
                             t[e + 1] = a - i;
                         }
                         break;
                     default:
                         throw new Error("Invalid rotation");
                 }
                 return t;
             }
             static #He(t, e, i) {
                 const [n, s, r, a] = e;
                 switch (i) {
                     case 0:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             t[e] -= n;
                             t[e + 1] = a - t[e + 1];
                         }
                         break;
                     case 90:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             const i = t[e];
                             t[e] = t[e + 1] - s;
                             t[e + 1] = i - n;
                         }
                         break;
                     case 180:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             t[e] = r - t[e];
                             t[e + 1] -= s;
                         }
                         break;
                     case 270:
                         for (let e = 0, i = t.length; e < i; e += 2) {
                             const i = t[e];
                             t[e] = a - t[e + 1];
                             t[e + 1] = r - i;
                         }
                         break;
                     default:
                         throw new Error("Invalid rotation");
                 }
                 return t;
             }
             #Ve(t, e, i, n) {
                 const s = [],
                     r = this.thickness / 2,
                     a = t * e + r,
                     o = t * i + r;
                 for (const e of this.paths) {
                     const i = [],
                         r = [];
                     for (let n = 0, s = e.length; n < s; n++) {
                         const [l, h, c, d] = e[n],
                             u = t * l[0] + a,
                             p = t * l[1] + o,
                             g = t * h[0] + a,
                             f = t * h[1] + o,
                             m = t * c[0] + a,
                             v = t * c[1] + o,
                             b = t * d[0] + a,
                             y = t * d[1] + o;
                         if (0 === n) {
                             i.push(u, p);
                             r.push(u, p);
                         }
                         i.push(g, f, m, v, b, y);
                         r.push(g, f);
                         n === s - 1 && r.push(b, y);
                     }
                     s.push({ bezier: InkEditor.#je(i, n, this.rotation), points: InkEditor.#je(r, n, this.rotation) });
                 }
                 return s;
             }
             #We() {
                 let t = 1 / 0,
                     e = -1 / 0,
                     i = 1 / 0,
                     s = -1 / 0;
                 for (const r of this.paths)
                     for (const [a, o, l, h] of r) {
                         const r = n.Util.bezierBoundingBox(...a, ...o, ...l, ...h);
                         t = Math.min(t, r[0]);
                         i = Math.min(i, r[1]);
                         e = Math.max(e, r[2]);
                         s = Math.max(s, r[3]);
                     }
                 return [t, i, e, s];
             }
             #Ue() {
                 return this.#pe ? Math.ceil(this.thickness * this.parentScale) : 0;
             }
             #we() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (this.isEmpty()) return;
                 if (!this.#pe) {
                     this.#xe();
                     return;
                 }
                 const e = this.#We(),
                     i = this.#Ue();
                 this.#ae = Math.max(s.AnnotationEditor.MIN_SIZE, e[2] - e[0]);
                 this.#re = Math.max(s.AnnotationEditor.MIN_SIZE, e[3] - e[1]);
                 const n = Math.ceil(i + this.#ae * this.scaleFactor),
                     r = Math.ceil(i + this.#re * this.scaleFactor),
                     [a, o] = this.parentDimensions;
                 this.width = n / a;
                 this.height = r / o;
                 this.setAspectRatio(n, r);
                 const l = this.translationX,
                     h = this.translationY;
                 this.translationX = -e[0];
                 this.translationY = -e[1];
                 this.#Ce();
                 this.#xe();
                 this.#ve = n;
                 this.#be = r;
                 this.setDims(n, r);
                 const c = t ? i / this.scaleFactor / 2 : 0;
                 this.translate(l - this.translationX - c, h - this.translationY - c);
             }
             static deserialize(t, e, i) {
                 if (t instanceof a.InkAnnotationElement) return null;
                 const r = super.deserialize(t, e, i);
                 r.thickness = t.thickness;
                 r.color = n.Util.makeHexColor(...t.color);
                 r.opacity = t.opacity;
                 const [o, l] = r.pageDimensions,
                     h = r.width * o,
                     c = r.height * l,
                     d = r.parentScale,
                     u = t.thickness / 2;
                 r.#pe = !0;
                 r.#ve = Math.round(h);
                 r.#be = Math.round(c);
                 const { paths: p, rect: g, rotation: f } = t;
                 for (let { bezier: t } of p) {
                     t = InkEditor.#He(t, g, f);
                     const e = [];
                     r.paths.push(e);
                     let i = d * (t[0] - u),
                         n = d * (t[1] - u);
                     for (let s = 2, r = t.length; s < r; s += 6) {
                         const r = d * (t[s] - u),
                             a = d * (t[s + 1] - u),
                             o = d * (t[s + 2] - u),
                             l = d * (t[s + 3] - u),
                             h = d * (t[s + 4] - u),
                             c = d * (t[s + 5] - u);
                         e.push([
                             [i, n],
                             [r, a],
                             [o, l],
                             [h, c],
                         ]);
                         i = h;
                         n = c;
                     }
                     const s = this.#ze(e);
                     r.bezierPath2D.push(s);
                 }
                 const m = r.#We();
                 r.#ae = Math.max(s.AnnotationEditor.MIN_SIZE, m[2] - m[0]);
                 r.#re = Math.max(s.AnnotationEditor.MIN_SIZE, m[3] - m[1]);
                 r.#Ne(h, c);
                 return r;
             }
             serialize() {
                 if (this.isEmpty()) return null;
                 const t = this.getRect(0, 0),
                     e = s.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
                 return {
                     annotationType: n.AnnotationEditorType.INK,
                     color: e,
                     thickness: this.thickness,
                     opacity: this.opacity,
                     paths: this.#Ve(this.scaleFactor / this.parentScale, this.translationX, this.translationY, t),
                     pageIndex: this.pageIndex,
                     rect: t,
                     rotation: this.rotation,
                     structTreeParentId: this._structTreeParentId,
                 };
             }
         }
         i(2993), i(9709);
         class StampEditor extends s.AnnotationEditor {
             #Ge = null;
             #qe = null;
             #$e = null;
             #Ke = null;
             #Xe = null;
             #Ye = "";
             #Je = null;
             #me = null;
             #Qe = null;
             #Ze = !1;
             #ti = !1;
             static _type = "stamp";
             static _editorType = n.AnnotationEditorType.STAMP;
             constructor(t) {
                 super({ ...t, name: "stampEditor" });
                 this.#Ke = t.bitmapUrl;
                 this.#Xe = t.bitmapFile;
             }
             static initialize(t) {
                 s.AnnotationEditor.initialize(t);
             }
             static get supportedTypes() {
                 return (0, n.shadow)(
                     this,
                     "supportedTypes",
                     ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"].map((t) => `image/${t}`)
                 );
             }
             static get supportedTypesStr() {
                 return (0, n.shadow)(this, "supportedTypesStr", this.supportedTypes.join(","));
             }
             static isHandlingMimeForPasting(t) {
                 return this.supportedTypes.includes(t);
             }
             static paste(t, e) {
                 e.pasteEditor(n.AnnotationEditorType.STAMP, { bitmapFile: t.getAsFile() });
             }
             #ei(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                 if (t) {
                     this.#Ge = t.bitmap;
                     if (!e) {
                         this.#qe = t.id;
                         this.#Ze = t.isSvg;
                     }
                     t.file && (this.#Ye = t.file.name);
                     this.#_e();
                 } else this.remove();
             }
             #ii() {
                 this.#$e = null;
                 this._uiManager.enableWaiting(!1);
                 this.#Je && this.div.focus();
             }
             #ni() {
                 if (this.#qe) {
                     this._uiManager.enableWaiting(!0);
                     this._uiManager.imageManager
                         .getFromId(this.#qe)
                         .then((t) => this.#ei(t, !0))
                         .finally(() => this.#ii());
                     return;
                 }
                 if (this.#Ke) {
                     const t = this.#Ke;
                     this.#Ke = null;
                     this._uiManager.enableWaiting(!0);
                     this.#$e = this._uiManager.imageManager
                         .getFromUrl(t)
                         .then((t) => this.#ei(t))
                         .finally(() => this.#ii());
                     return;
                 }
                 if (this.#Xe) {
                     const t = this.#Xe;
                     this.#Xe = null;
                     this._uiManager.enableWaiting(!0);
                     this.#$e = this._uiManager.imageManager
                         .getFromFile(t)
                         .then((t) => this.#ei(t))
                         .finally(() => this.#ii());
                     return;
                 }
                 const t = document.createElement("input");
                 t.type = "file";
                 t.accept = StampEditor.supportedTypesStr;
                 this.#$e = new Promise((e) => {
                     t.addEventListener("change", async () => {
                         if (t.files && 0 !== t.files.length) {
                             this._uiManager.enableWaiting(!0);
                             const e = await this._uiManager.imageManager.getFromFile(t.files[0]);
                             this.#ei(e);
                         } else this.remove();
                         e();
                     });
                     t.addEventListener("cancel", () => {
                         this.remove();
                         e();
                     });
                 }).finally(() => this.#ii());
                 t.click();
             }
             remove() {
                 if (this.#qe) {
                     this.#Ge = null;
                     this._uiManager.imageManager.deleteId(this.#qe);
                     this.#Je?.remove();
                     this.#Je = null;
                     this.#me?.disconnect();
                     this.#me = null;
                     if (this.#Qe) {
                         clearTimeout(this.#Qe);
                         this.#Qe = null;
                     }
                 }
                 super.remove();
             }
             rebuild() {
                 if (this.parent) {
                     super.rebuild();
                     if (null !== this.div) {
                         this.#qe && this.#ni();
                         this.isAttachedToDOM || this.parent.add(this);
                     }
                 } else this.#qe && this.#ni();
             }
             onceAdded() {
                 this._isDraggable = !0;
                 this.div.focus();
             }
             isEmpty() {
                 return !(this.#$e || this.#Ge || this.#Ke || this.#Xe);
             }
             get isResizable() {
                 return !0;
             }
             render() {
                 if (this.div) return this.div;
                 let t, e;
                 if (this.width) {
                     t = this.x;
                     e = this.y;
                 }
                 super.render();
                 this.div.hidden = !0;
                 this.#Ge ? this.#_e() : this.#ni();
                 if (this.width) {
                     const [i, n] = this.parentDimensions;
                     this.setAt(t * i, e * n, this.width * i, this.height * n);
                 }
                 return this.div;
             }
             #_e() {
                 const { div: t } = this;
                 let { width: e, height: i } = this.#Ge;
                 const [n, s] = this.pageDimensions,
                     r = 0.75;
                 if (this.width) {
                     e = this.width * n;
                     i = this.height * s;
                 } else if (e > r * n || i > r * s) {
                     const t = Math.min((r * n) / e, (r * s) / i);
                     e *= t;
                     i *= t;
                 }
                 const [a, o] = this.parentDimensions;
                 this.setDims((e * a) / n, (i * o) / s);
                 this._uiManager.enableWaiting(!1);
                 const l = (this.#Je = document.createElement("canvas"));
                 t.append(l);
                 t.hidden = !1;
                 this.#si(e, i);
                 this.#Se();
                 if (!this.#ti) {
                     this.parent.addUndoableEditor(this);
                     this.#ti = !0;
                 }
                 this._uiManager._eventBus.dispatch("reporttelemetry", { source: this, details: { type: "editing", subtype: this.editorType, data: { action: "inserted_image" } } });
                 this.addAltTextButton();
                 this.#Ye && l.setAttribute("aria-label", this.#Ye);
             }
             #ri(t, e) {
                 const [i, n] = this.parentDimensions;
                 this.width = t / i;
                 this.height = e / n;
                 this.setDims(t, e);
                 this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition();
                 this._initialOptions = null;
                 null !== this.#Qe && clearTimeout(this.#Qe);
                 this.#Qe = setTimeout(() => {
                     this.#Qe = null;
                     this.#si(t, e);
                 }, 200);
             }
             #ai(t, e) {
                 const { width: i, height: n } = this.#Ge;
                 let s = i,
                     r = n,
                     a = this.#Ge;
                 for (; s > 2 * t || r > 2 * e; ) {
                     const i = s,
                         n = r;
                     s > 2 * t && (s = s >= 16384 ? Math.floor(s / 2) - 1 : Math.ceil(s / 2));
                     r > 2 * e && (r = r >= 16384 ? Math.floor(r / 2) - 1 : Math.ceil(r / 2));
                     const o = new OffscreenCanvas(s, r);
                     o.getContext("2d").drawImage(a, 0, 0, i, n, 0, 0, s, r);
                     a = o.transferToImageBitmap();
                 }
                 return a;
             }
             #si(t, e) {
                 t = Math.ceil(t);
                 e = Math.ceil(e);
                 const i = this.#Je;
                 if (!i || (i.width === t && i.height === e)) return;
                 i.width = t;
                 i.height = e;
                 const n = this.#Ze ? this.#Ge : this.#ai(t, e),
                     s = i.getContext("2d");
                 s.filter = this._uiManager.hcmFilter;
                 s.drawImage(n, 0, 0, n.width, n.height, 0, 0, t, e);
             }
             getImageForAltText() {
                 return this.#Je;
             }
             #oi(t) {
                 if (t) {
                     if (this.#Ze) {
                         const t = this._uiManager.imageManager.getSvgUrl(this.#qe);
                         if (t) return t;
                     }
                     const t = document.createElement("canvas");
                     ({ width: t.width, height: t.height } = this.#Ge);
                     t.getContext("2d").drawImage(this.#Ge, 0, 0);
                     return t.toDataURL();
                 }
                 if (this.#Ze) {
                     const [t, e] = this.pageDimensions,
                         i = Math.round(this.width * t * h.PixelsPerInch.PDF_TO_CSS_UNITS),
                         n = Math.round(this.height * e * h.PixelsPerInch.PDF_TO_CSS_UNITS),
                         s = new OffscreenCanvas(i, n);
                     s.getContext("2d").drawImage(this.#Ge, 0, 0, this.#Ge.width, this.#Ge.height, 0, 0, i, n);
                     return s.transferToImageBitmap();
                 }
                 return structuredClone(this.#Ge);
             }
             #Se() {
                 this.#me = new ResizeObserver((t) => {
                     const e = t[0].contentRect;
                     e.width && e.height && this.#ri(e.width, e.height);
                 });
                 this.#me.observe(this.div);
             }
             static deserialize(t, e, i) {
                 if (t instanceof a.StampAnnotationElement) return null;
                 const n = super.deserialize(t, e, i),
                     { rect: s, bitmapUrl: r, bitmapId: o, isSvg: l, accessibilityData: h } = t;
                 o && i.imageManager.isValidId(o) ? (n.#qe = o) : (n.#Ke = r);
                 n.#Ze = l;
                 const [c, d] = n.pageDimensions;
                 n.width = (s[2] - s[0]) / c;
                 n.height = (s[3] - s[1]) / d;
                 h && (n.altTextData = h);
                 return n;
             }
             serialize() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                     e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 if (this.isEmpty()) return null;
                 const i = { annotationType: n.AnnotationEditorType.STAMP, bitmapId: this.#qe, pageIndex: this.pageIndex, rect: this.getRect(0, 0), rotation: this.rotation, isSvg: this.#Ze, structTreeParentId: this._structTreeParentId };
                 if (t) {
                     i.bitmapUrl = this.#oi(!0);
                     i.accessibilityData = this.altTextData;
                     return i;
                 }
                 const { decorative: s, altText: r } = this.altTextData;
                 !s && r && (i.accessibilityData = { type: "Figure", alt: r });
                 if (null === e) return i;
                 e.stamps ||= new Map();
                 const a = this.#Ze ? (i.rect[2] - i.rect[0]) * (i.rect[3] - i.rect[1]) : null;
                 if (e.stamps.has(this.#qe)) {
                     if (this.#Ze) {
                         const t = e.stamps.get(this.#qe);
                         if (a > t.area) {
                             t.area = a;
                             t.serialized.bitmap.close();
                             t.serialized.bitmap = this.#oi(!1);
                         }
                     }
                 } else {
                     e.stamps.set(this.#qe, { area: a, serialized: i });
                     i.bitmap = this.#oi(!1);
                 }
                 return i;
             }
         }
         class AnnotationEditorLayer {
             #F;
             #li = !1;
             #hi = null;
             #ci = this.pointerup.bind(this);
             #di = this.pointerUpAfterSelection.bind(this);
             #ui = this.pointerdown.bind(this);
             #pi = null;
             #gi = this.selectionStart.bind(this);
             #fi = new Map();
             #mi = !1;
             #vi = !1;
             #bi = !1;
             #yi = null;
             #Ai;
             static _initialized = !1;
             static #Ei = new Map([FreeTextEditor, InkEditor, StampEditor, HighlightEditor].map((t) => [t._editorType, t]));
             constructor(t) {
                 let { uiManager: e, pageIndex: i, div: n, accessibilityManager: s, annotationLayer: r, drawLayer: a, textLayer: o, viewport: l, l10n: h } = t;
                 const c = [...AnnotationEditorLayer.#Ei.values()];
                 if (!AnnotationEditorLayer._initialized) {
                     AnnotationEditorLayer._initialized = !0;
                     for (const t of c) t.initialize(h);
                 }
                 e.registerEditorTypes(c);
                 this.#Ai = e;
                 this.pageIndex = i;
                 this.div = n;
                 this.#F = s;
                 this.#hi = r;
                 this.viewport = l;
                 this.#yi = o;
                 this.drawLayer = a;
                 this.#Ai.addLayer(this);
             }
             get isEmpty() {
                 return 0 === this.#fi.size;
             }
             updateToolbar(t) {
                 this.#Ai.updateToolbar(t);
             }
             updateMode() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.#Ai.getMode();
                 this.#wi();
                 switch (t) {
                     case n.AnnotationEditorType.NONE:
                         this.disableTextSelection();
                         this.togglePointerEvents(!1);
                         this.disableClick();
                         break;
                     case n.AnnotationEditorType.INK:
                         this.addInkEditorIfNeeded(!1);
                         this.disableTextSelection();
                         this.togglePointerEvents(!0);
                         this.disableClick();
                         break;
                     case n.AnnotationEditorType.HIGHLIGHT:
                         this.enableTextSelection();
                         this.togglePointerEvents(!1);
                         this.disableClick();
                         break;
                     default:
                         this.disableTextSelection();
                         this.togglePointerEvents(!0);
                         this.enableClick();
                 }
                 if (t !== n.AnnotationEditorType.NONE) {
                     const { classList: e } = this.div;
                     for (const i of AnnotationEditorLayer.#Ei.values()) e.toggle(`${i._type}Editing`, t === i._editorType);
                     this.div.hidden = !1;
                 }
             }
             addInkEditorIfNeeded(t) {
                 if (this.#Ai.getMode() !== n.AnnotationEditorType.INK) return;
                 if (!t)
                     for (const t of this.#fi.values())
                         if (t.isEmpty()) {
                             t.setInBackground();
                             return;
                         }
                 this.#xi({ offsetX: 0, offsetY: 0 }, !1).setInBackground();
             }
             setEditingState(t) {
                 this.#Ai.setEditingState(t);
             }
             addCommands(t) {
                 this.#Ai.addCommands(t);
             }
             togglePointerEvents() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 this.div.classList.toggle("disabled", !t);
             }
             enable() {
                 this.togglePointerEvents(!0);
                 const t = new Set();
                 for (const e of this.#fi.values()) {
                     e.enableEditing();
                     e.annotationElementId && t.add(e.annotationElementId);
                 }
                 if (!this.#hi) return;
                 const e = this.#hi.getEditableAnnotations();
                 for (const i of e) {
                     i.hide();
                     if (this.#Ai.isDeletedAnnotationElement(i.data.id)) continue;
                     if (t.has(i.data.id)) continue;
                     const e = this.deserialize(i);
                     if (e) {
                         this.addOrRebuild(e);
                         e.enableEditing();
                     }
                 }
             }
             disable() {
                 this.#bi = !0;
                 this.togglePointerEvents(!1);
                 const t = new Set();
                 for (const e of this.#fi.values()) {
                     e.disableEditing();
                     if (e.annotationElementId && null === e.serialize()) {
                         this.getEditableAnnotation(e.annotationElementId)?.show();
                         e.remove();
                     } else t.add(e.annotationElementId);
                 }
                 if (this.#hi) {
                     const e = this.#hi.getEditableAnnotations();
                     for (const i of e) {
                         const { id: e } = i.data;
                         t.has(e) || this.#Ai.isDeletedAnnotationElement(e) || i.show();
                     }
                 }
                 this.#wi();
                 this.isEmpty && (this.div.hidden = !0);
                 const { classList: e } = this.div;
                 for (const t of AnnotationEditorLayer.#Ei.values()) e.remove(`${t._type}Editing`);
                 this.disableTextSelection();
                 this.#bi = !1;
             }
             getEditableAnnotation(t) {
                 return this.#hi?.getEditableAnnotation(t) || null;
             }
             setActiveEditor(t) {
                 this.#Ai.getActive() !== t && this.#Ai.setActiveEditor(t);
             }
             enableTextSelection() {
                 this.#yi?.div && document.addEventListener("selectstart", this.#gi);
             }
             disableTextSelection() {
                 this.#yi?.div && document.removeEventListener("selectstart", this.#gi);
             }
             enableClick() {
                 this.div.addEventListener("pointerdown", this.#ui);
                 this.div.addEventListener("pointerup", this.#ci);
             }
             disableClick() {
                 this.div.removeEventListener("pointerdown", this.#ui);
                 this.div.removeEventListener("pointerup", this.#ci);
             }
             attach(t) {
                 this.#fi.set(t.id, t);
                 const { annotationElementId: e } = t;
                 e && this.#Ai.isDeletedAnnotationElement(e) && this.#Ai.removeDeletedAnnotationElement(t);
             }
             detach(t) {
                 this.#fi.delete(t.id);
                 this.#F?.removePointerInTextLayer(t.contentDiv);
                 !this.#bi && t.annotationElementId && this.#Ai.addDeletedAnnotationElement(t);
             }
             remove(t) {
                 this.detach(t);
                 this.#Ai.removeEditor(t);
                 t.div.remove();
                 t.isAttachedToDOM = !1;
                 this.#vi || this.addInkEditorIfNeeded(!1);
             }
             changeParent(t) {
                 if (t.parent !== this) {
                     if (t.annotationElementId) {
                         this.#Ai.addDeletedAnnotationElement(t.annotationElementId);
                         s.AnnotationEditor.deleteAnnotationElement(t);
                         t.annotationElementId = null;
                     }
                     this.attach(t);
                     t.parent?.detach(t);
                     t.setParent(this);
                     if (t.div && t.isAttachedToDOM) {
                         t.div.remove();
                         this.div.append(t.div);
                     }
                 }
             }
             add(t) {
                 this.changeParent(t);
                 this.#Ai.addEditor(t);
                 this.attach(t);
                 if (!t.isAttachedToDOM) {
                     const e = t.render();
                     this.div.append(e);
                     t.isAttachedToDOM = !0;
                 }
                 t.fixAndSetPosition();
                 t.onceAdded();
                 this.#Ai.addToAnnotationStorage(t);
             }
             moveEditorInDOM(t) {
                 if (!t.isAttachedToDOM) return;
                 const { activeElement: e } = document;
                 if (t.div.contains(e) && !this.#pi) {
                     t._focusEventsAllowed = !1;
                     this.#pi = setTimeout(() => {
                         this.#pi = null;
                         if (t.div.contains(document.activeElement)) t._focusEventsAllowed = !0;
                         else {
                             t.div.addEventListener(
                                 "focusin",
                                 () => {
                                     t._focusEventsAllowed = !0;
                                 },
                                 { once: !0 }
                             );
                             e.focus();
                         }
                     }, 0);
                 }
                 t._structTreeParentId = this.#F?.moveElementInDOM(this.div, t.div, t.contentDiv, !0);
             }
             addOrRebuild(t) {
                 if (t.needsToBeRebuilt()) {
                     t.parent ||= this;
                     t.rebuild();
                 } else this.add(t);
             }
             addUndoableEditor(t) {
                 this.addCommands({
                     cmd: () => t._uiManager.rebuild(t),
                     undo: () => {
                         t.remove();
                     },
                     mustExec: !1,
                 });
             }
             getNextId() {
                 return this.#Ai.getId();
             }
             get #_i() {
                 return AnnotationEditorLayer.#Ei.get(this.#Ai.getMode());
             }
             #Si(t) {
                 const e = this.#_i;
                 return e ? new e.prototype.constructor(t) : null;
             }
             canCreateNewEmptyEditor() {
                 return this.#_i?.canCreateNewEmptyEditor();
             }
             pasteEditor(t, e) {
                 this.#Ai.updateToolbar(t);
                 this.#Ai.updateMode(t);
                 const { offsetX: i, offsetY: n } = this.#Ci(),
                     s = this.getNextId(),
                     r = this.#Si({ parent: this, id: s, x: i, y: n, uiManager: this.#Ai, isCentered: !0, ...e });
                 r && this.add(r);
             }
             deserialize(t) {
                 return AnnotationEditorLayer.#Ei.get(t.annotationType ?? t.annotationEditorType)?.deserialize(t, this, this.#Ai) || null;
             }
             #xi(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                 const n = this.getNextId(),
                     s = this.#Si({ parent: this, id: n, x: t.offsetX, y: t.offsetY, uiManager: this.#Ai, isCentered: e, ...i });
                 s && this.add(s);
                 return s;
             }
             #Ci() {
                 const { x: t, y: e, width: i, height: n } = this.div.getBoundingClientRect(),
                     s = Math.max(0, t),
                     r = Math.max(0, e),
                     a = (s + Math.min(window.innerWidth, t + i)) / 2 - t,
                     o = (r + Math.min(window.innerHeight, e + n)) / 2 - e,
                     [l, h] = this.viewport.rotation % 180 == 0 ? [a, o] : [o, a];
                 return { offsetX: l, offsetY: h };
             }
             addNewEditor() {
                 this.#xi(this.#Ci(), !0);
             }
             setSelected(t) {
                 this.#Ai.setSelected(t);
             }
             toggleSelected(t) {
                 this.#Ai.toggleSelected(t);
             }
             isSelected(t) {
                 return this.#Ai.isSelected(t);
             }
             unselect(t) {
                 this.#Ai.unselect(t);
             }
             selectionStart(t) {
                 this.#yi?.div.addEventListener("pointerup", this.#di, { once: !0 });
             }
             pointerUpAfterSelection(t) {
                 const e = document.getSelection();
                 if (0 === e.rangeCount) return;
                 const i = e.getRangeAt(0);
                 if (i.collapsed) return;
                 if (!this.#yi?.div.contains(i.commonAncestorContainer)) return;
                 const { x: n, y: s, width: r, height: a } = this.#yi.div.getBoundingClientRect(),
                     o = i.getClientRects();
                 let l;
                 switch (this.viewport.rotation) {
                     case 90:
                         l = (t, e, i, o) => ({ x: (e - s) / a, y: 1 - (t + i - n) / r, width: o / a, height: i / r });
                         break;
                     case 180:
                         l = (t, e, i, o) => ({ x: 1 - (t + i - n) / r, y: 1 - (e + o - s) / a, width: i / r, height: o / a });
                         break;
                     case 270:
                         l = (t, e, i, o) => ({ x: 1 - (e + o - s) / a, y: (t - n) / r, width: o / a, height: i / r });
                         break;
                     default:
                         l = (t, e, i, o) => ({ x: (t - n) / r, y: (e - s) / a, width: i / r, height: o / a });
                 }
                 const h = [];
                 for (const { x: t, y: e, width: i, height: n } of o) 0 !== i && 0 !== n && h.push(l(t, e, i, n));
                 0 !== h.length && this.#xi(t, !1, { boxes: h });
                 e.empty();
             }
             pointerup(t) {
                 const { isMac: e } = n.FeatureTest.platform;
                 if (!(0 !== t.button || (t.ctrlKey && e)) && t.target === this.div && this.#mi) {
                     this.#mi = !1;
                     this.#li ? (this.#Ai.getMode() !== n.AnnotationEditorType.STAMP ? this.#xi(t, !1) : this.#Ai.unselectAll()) : (this.#li = !0);
                 }
             }
             pointerdown(t) {
                 this.#Ai.getMode() === n.AnnotationEditorType.HIGHLIGHT && this.enableTextSelection();
                 if (this.#mi) {
                     this.#mi = !1;
                     return;
                 }
                 const { isMac: e } = n.FeatureTest.platform;
                 if (0 !== t.button || (t.ctrlKey && e)) return;
                 if (t.target !== this.div) return;
                 this.#mi = !0;
                 const i = this.#Ai.getActive();
                 this.#li = !i || i.isEmpty();
             }
             findNewParent(t, e, i) {
                 const n = this.#Ai.findParent(e, i);
                 if (null === n || n === this) return !1;
                 n.changeParent(t);
                 return !0;
             }
             destroy() {
                 if (this.#Ai.getActive()?.parent === this) {
                     this.#Ai.commitOrRemove();
                     this.#Ai.setActiveEditor(null);
                 }
                 if (this.#pi) {
                     clearTimeout(this.#pi);
                     this.#pi = null;
                 }
                 for (const t of this.#fi.values()) {
                     this.#F?.removePointerInTextLayer(t.contentDiv);
                     t.setParent(null);
                     t.isAttachedToDOM = !1;
                     t.div.remove();
                 }
                 this.div = null;
                 this.#fi.clear();
                 this.#Ai.removeLayer(this);
             }
             #wi() {
                 this.#vi = !0;
                 for (const t of this.#fi.values()) t.isEmpty() && t.remove();
                 this.#vi = !1;
             }
             render(t) {
                 let { viewport: e } = t;
                 this.viewport = e;
                 (0, h.setLayerDimensions)(this.div, e);
                 for (const t of this.#Ai.getEditors(this.pageIndex)) this.add(t);
                 this.updateMode();
             }
             update(t) {
                 let { viewport: e } = t;
                 this.#Ai.commitOrRemove();
                 const i = this.viewport.rotation,
                     n = e.rotation;
                 this.viewport = e;
                 (0, h.setLayerDimensions)(this.div, { rotation: n });
                 if (i !== n) for (const t of this.#fi.values()) t.rotate(n);
                 this.updateMode();
             }
             get pageDimensions() {
                 const { pageWidth: t, pageHeight: e } = this.viewport.rawDims;
                 return [t, e];
             }
         }
     },
     5097: (t, e, i) => {
         i.d(e, { ColorPicker: () => ColorPicker });
         var n = i(3266),
             s = i(4812),
             r = i(473);
         class ColorPicker {
             #s = this.#r.bind(this);
             #Ti = null;
             #Pi = null;
             #Mi;
             #Ri = null;
             #ki = !1;
             #Fi = !1;
             #Di;
             #Ai = null;
             static get _keyboardManager() {
                 return (0, n.shadow)(
                     this,
                     "_keyboardManager",
                     new s.KeyboardManager([
                         [["Escape", "mac+Escape"], ColorPicker.prototype._hideDropdownFromKeyboard],
                         [[" ", "mac+ "], ColorPicker.prototype._colorSelectFromKeyboard],
                         [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], ColorPicker.prototype._moveToNext],
                         [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], ColorPicker.prototype._moveToPrevious],
                         [["Home", "mac+Home"], ColorPicker.prototype._moveToBeginning],
                         [["End", "mac+End"], ColorPicker.prototype._moveToEnd],
                     ])
                 );
             }
             constructor(t) {
                 let { editor: e = null, uiManager: i = null } = t;
                 this.#Fi = !e;
                 this.#Ai = e?._uiManager || i;
                 this.#Di = this.#Ai._eventBus;
                 this.#Mi = e?.color || this.#Ai?.highlightColors.values().next().value || "#FFFF98";
             }
             renderButton() {
                 const t = (this.#Ti = document.createElement("button"));
                 t.className = "colorPicker";
                 t.tabIndex = "0";
                 t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button");
                 t.setAttribute("aria-haspopup", !0);
                 t.addEventListener("click", this.#Ii.bind(this));
                 const e = (this.#Pi = document.createElement("span"));
                 e.className = "swatch";
                 e.style.backgroundColor = this.#Mi;
                 t.append(e);
                 return t;
             }
             renderMainDropdown() {
                 const t = (this.#Ri = this.#Li(n.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR));
                 t.setAttribute("aria-orientation", "horizontal");
                 t.setAttribute("aria-labelledby", "highlightColorPickerLabel");
                 return t;
             }
             #Li(t) {
                 const e = document.createElement("div");
                 e.addEventListener("contextmenu", r.noContextMenu);
                 e.className = "dropdown";
                 e.role = "listbox";
                 e.setAttribute("aria-multiselectable", !1);
                 e.setAttribute("aria-orientation", "vertical");
                 e.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown");
                 for (const [i, n] of this.#Ai.highlightColors) {
                     const s = document.createElement("button");
                     s.tabIndex = "0";
                     s.role = "option";
                     s.setAttribute("data-color", n);
                     s.title = i;
                     s.setAttribute("data-l10n-id", `pdfjs-editor-colorpicker-${i}`);
                     const r = document.createElement("span");
                     s.append(r);
                     r.className = "swatch";
                     r.style.backgroundColor = n;
                     s.setAttribute("aria-selected", n === this.#Mi);
                     s.addEventListener("click", this.#Oi.bind(this, t, n));
                     e.append(s);
                 }
                 e.addEventListener("keydown", this.#s);
                 return e;
             }
             #Oi(t, e, i) {
                 i.stopPropagation();
                 this.#Di.dispatch("switchannotationeditorparams", { source: this, type: t, value: e });
             }
             _colorSelectFromKeyboard(t) {
                 const e = t.target.getAttribute("data-color");
                 e && this.#Oi(e, t);
             }
             _moveToNext(t) {
                 t.target !== this.#Ti ? t.target.nextSibling?.focus() : this.#Ri.firstChild?.focus();
             }
             _moveToPrevious(t) {
                 t.target.previousSibling?.focus();
             }
             _moveToBeginning() {
                 this.#Ri.firstChild?.focus();
             }
             _moveToEnd() {
                 this.#Ri.lastChild?.focus();
             }
             #r(t) {
                 ColorPicker._keyboardManager.exec(this, t);
             }
             #Ii(t) {
                 if (this.#Ri && !this.#Ri.classList.contains("hidden")) {
                     this.hideDropdown();
                     return;
                 }
                 this.#Ti.addEventListener("keydown", this.#s);
                 this.#ki = 0 === t.detail;
                 if (this.#Ri) {
                     this.#Ri.classList.remove("hidden");
                     return;
                 }
                 const e = (this.#Ri = this.#Li(n.AnnotationEditorParamsType.HIGHLIGHT_COLOR));
                 this.#Ti.append(e);
             }
             hideDropdown() {
                 this.#Ri?.classList.add("hidden");
             }
             _hideDropdownFromKeyboard() {
                 if (!this.#Fi && this.#Ri && !this.#Ri.classList.contains("hidden")) {
                     this.hideDropdown();
                     this.#Ti.removeEventListener("keydown", this.#s);
                     this.#Ti.focus({ preventScroll: !0, focusVisible: this.#ki });
                 }
             }
             updateColor(t) {
                 this.#Pi && (this.#Pi.style.backgroundColor = t);
                 if (!this.#Ri) return;
                 const e = this.#Ai.highlightColors.values();
                 for (const i of this.#Ri.children) i.setAttribute("aria-selected", e.next().value === t);
             }
             destroy() {
                 this.#Ti?.remove();
                 this.#Ti = null;
                 this.#Pi = null;
                 this.#Ri?.remove();
                 this.#Ri = null;
             }
         }
     },
     9115: (t, e, i) => {
         i.d(e, { AnnotationEditor: () => AnnotationEditor });
         i(3352);
         var n = i(4812),
             s = i(3266),
             r = i(473);
         class AltText {
             #Bi = "";
             #Ni = !1;
             #Ui = null;
             #zi = null;
             #ji = null;
             #Hi = !1;
             #Vi = null;
             static _l10nPromise = null;
             constructor(t) {
                 this.#Vi = t;
             }
             static initialize(t) {
                 AltText._l10nPromise ||= t;
             }
             async render() {
                 const t = (this.#Ui = document.createElement("button"));
                 t.className = "altText";
                 const e = await AltText._l10nPromise.get("pdfjs-editor-alt-text-button-label");
                 t.textContent = e;
                 t.setAttribute("aria-label", e);
                 t.tabIndex = "0";
                 t.addEventListener("contextmenu", r.noContextMenu);
                 t.addEventListener("pointerdown", (t) => t.stopPropagation());
                 const onClick = (t) => {
                     t.preventDefault();
                     this.#Vi._uiManager.editAltText(this.#Vi);
                 };
                 t.addEventListener("click", onClick, { capture: !0 });
                 t.addEventListener("keydown", (e) => {
                     if (e.target === t && "Enter" === e.key) {
                         this.#Hi = !0;
                         onClick(e);
                     }
                 });
                 await this.#Wi();
                 return t;
             }
             finish() {
                 if (this.#Ui) {
                     this.#Ui.focus({ focusVisible: this.#Hi });
                     this.#Hi = !1;
                 }
             }
             get data() {
                 return { altText: this.#Bi, decorative: this.#Ni };
             }
             set data(t) {
                 let { altText: e, decorative: i } = t;
                 if (this.#Bi !== e || this.#Ni !== i) {
                     this.#Bi = e;
                     this.#Ni = i;
                     this.#Wi();
                 }
             }
             toggle() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (this.#Ui) {
                     if (!t && this.#ji) {
                         clearTimeout(this.#ji);
                         this.#ji = null;
                     }
                     this.#Ui.disabled = !t;
                 }
             }
             destroy() {
                 this.#Ui?.remove();
                 this.#Ui = null;
                 this.#zi = null;
             }
             async #Wi() {
                 const t = this.#Ui;
                 if (!t) return;
                 if (!this.#Bi && !this.#Ni) {
                     t.classList.remove("done");
                     this.#zi?.remove();
                     return;
                 }
                 t.classList.add("done");
                 AltText._l10nPromise.get("pdfjs-editor-alt-text-edit-button-label").then((e) => {
                     t.setAttribute("aria-label", e);
                 });
                 let e = this.#zi;
                 if (!e) {
                     this.#zi = e = document.createElement("span");
                     e.className = "tooltip";
                     e.setAttribute("role", "tooltip");
                     const i = (e.id = `alt-text-tooltip-${this.#Vi.id}`);
                     t.setAttribute("aria-describedby", i);
                     const n = 100;
                     t.addEventListener("mouseenter", () => {
                         this.#ji = setTimeout(() => {
                             this.#ji = null;
                             this.#zi.classList.add("show");
                             this.#Vi._uiManager._eventBus.dispatch("reporttelemetry", { source: this, details: { type: "editing", subtype: this.#Vi.editorType, data: { action: "alt_text_tooltip" } } });
                         }, n);
                     });
                     t.addEventListener("mouseleave", () => {
                         if (this.#ji) {
                             clearTimeout(this.#ji);
                             this.#ji = null;
                         }
                         this.#zi?.classList.remove("show");
                     });
                 }
                 e.innerText = this.#Ni ? await AltText._l10nPromise.get("pdfjs-editor-alt-text-decorative-tooltip") : this.#Bi;
                 e.parentNode || t.append(e);
                 const i = this.#Vi.getImageForAltText();
                 i?.setAttribute("aria-describedby", e.id);
             }
         }
         class EditorToolbar {
             #Gi = null;
             #qt = null;
             #Vi;
             #qi = null;
             constructor(t) {
                 this.#Vi = t;
             }
             render() {
                 const t = (this.#Gi = document.createElement("div"));
                 t.className = "editToolbar";
                 t.addEventListener("contextmenu", r.noContextMenu);
                 t.addEventListener("pointerdown", EditorToolbar.#$i);
                 const e = (this.#qi = document.createElement("div"));
                 e.className = "buttons";
                 t.append(e);
                 const i = this.#Vi.toolbarPosition;
                 if (i) {
                     const { style: e } = t,
                         n = "ltr" === this.#Vi._uiManager.direction ? 1 - i[0] : i[0];
                     e.insetInlineEnd = 100 * n + "%";
                     e.top = `calc(${100 * i[1]}% + var(--editor-toolbar-vert-offset))`;
                 }
                 this.#Ki();
                 return t;
             }
             static #$i(t) {
                 t.stopPropagation();
             }
             #Xi(t) {
                 this.#Vi._focusEventsAllowed = !1;
                 t.preventDefault();
                 t.stopPropagation();
             }
             #Yi(t) {
                 this.#Vi._focusEventsAllowed = !0;
                 t.preventDefault();
                 t.stopPropagation();
             }
             #Ji(t) {
                 t.addEventListener("focusin", this.#Xi.bind(this), { capture: !0 });
                 t.addEventListener("focusout", this.#Yi.bind(this), { capture: !0 });
                 t.addEventListener("contextmenu", r.noContextMenu);
             }
             hide() {
                 this.#Gi.classList.add("hidden");
                 this.#qt?.hideDropdown();
             }
             show() {
                 this.#Gi.classList.remove("hidden");
             }
             #Ki() {
                 const t = document.createElement("button");
                 t.className = "delete";
                 t.tabIndex = 0;
                 t.setAttribute("data-l10n-id", `pdfjs-editor-remove-${this.#Vi.editorType}-button`);
                 this.#Ji(t);
                 t.addEventListener("click", (t) => {
                     this.#Vi._uiManager.delete();
                 });
                 this.#qi.append(t);
             }
             get #Qi() {
                 const t = document.createElement("div");
                 t.className = "divider";
                 return t;
             }
             addAltTextButton(t) {
                 this.#Ji(t);
                 this.#qi.prepend(t, this.#Qi);
             }
             addColorPicker(t) {
                 this.#qt = t;
                 const e = t.renderButton();
                 this.#Ji(e);
                 this.#qi.prepend(e, this.#Qi);
             }
             remove() {
                 this.#Gi.remove();
                 this.#qt?.destroy();
                 this.#qt = null;
             }
         }
         class AnnotationEditor {
             #Zi = null;
             #Bi = null;
             #tn = !1;
             #en = null;
             #in = null;
             #nn = this.focusin.bind(this);
             #sn = this.focusout.bind(this);
             #rn = null;
             #an = "";
             #on = !1;
             #ln = !1;
             #hn = !1;
             #cn = !1;
             #dn = null;
             _initialOptions = Object.create(null);
             _uiManager = null;
             _focusEventsAllowed = !0;
             _l10nPromise = null;
             #un = !1;
             #pn = AnnotationEditor._zIndex++;
             static _borderLineWidth = -1;
             static _colorManager = new n.ColorManager();
             static _zIndex = 1;
             static get _resizerKeyboardManager() {
                 const t = AnnotationEditor.prototype._resizeWithKeyboard,
                     e = n.AnnotationEditorUIManager.TRANSLATE_SMALL,
                     i = n.AnnotationEditorUIManager.TRANSLATE_BIG;
                 return (0, s.shadow)(
                     this,
                     "_resizerKeyboardManager",
                     new n.KeyboardManager([
                         [["ArrowLeft", "mac+ArrowLeft"], t, { args: [-e, 0] }],
                         [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t, { args: [-i, 0] }],
                         [["ArrowRight", "mac+ArrowRight"], t, { args: [e, 0] }],
                         [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t, { args: [i, 0] }],
                         [["ArrowUp", "mac+ArrowUp"], t, { args: [0, -e] }],
                         [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t, { args: [0, -i] }],
                         [["ArrowDown", "mac+ArrowDown"], t, { args: [0, e] }],
                         [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t, { args: [0, i] }],
                         [["Escape", "mac+Escape"], AnnotationEditor.prototype._stopResizingWithKeyboard],
                     ])
                 );
             }
             constructor(t) {
                 this.constructor === AnnotationEditor && (0, s.unreachable)("Cannot initialize AnnotationEditor.");
                 this.parent = t.parent;
                 this.id = t.id;
                 this.width = this.height = null;
                 this.pageIndex = t.parent.pageIndex;
                 this.name = t.name;
                 this.div = null;
                 this._uiManager = t.uiManager;
                 this.annotationElementId = null;
                 this._willKeepAspectRatio = !1;
                 this._initialOptions.isCentered = t.isCentered;
                 this._structTreeParentId = null;
                 const {
                     rotation: e,
                     rawDims: { pageWidth: i, pageHeight: n, pageX: r, pageY: a },
                 } = this.parent.viewport;
                 this.rotation = e;
                 this.pageRotation = (360 + e - this._uiManager.viewParameters.rotation) % 360;
                 this.pageDimensions = [i, n];
                 this.pageTranslation = [r, a];
                 const [o, l] = this.parentDimensions;
                 this.x = t.x / o;
                 this.y = t.y / l;
                 this.isAttachedToDOM = !1;
                 this.deleted = !1;
             }
             get editorType() {
                 return Object.getPrototypeOf(this).constructor._type;
             }
             static get _defaultLineColor() {
                 return (0, s.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
             }
             static deleteAnnotationElement(t) {
                 const e = new FakeEditor({ id: t.parent.getNextId(), parent: t.parent, uiManager: t._uiManager });
                 e.annotationElementId = t.annotationElementId;
                 e.deleted = !0;
                 e._uiManager.addToAnnotationStorage(e);
             }
             static initialize(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                 AnnotationEditor._l10nPromise ||= new Map(
                     [
                         "pdfjs-editor-alt-text-button-label",
                         "pdfjs-editor-alt-text-edit-button-label",
                         "pdfjs-editor-alt-text-decorative-tooltip",
                         "pdfjs-editor-resizer-label-topLeft",
                         "pdfjs-editor-resizer-label-topMiddle",
                         "pdfjs-editor-resizer-label-topRight",
                         "pdfjs-editor-resizer-label-middleRight",
                         "pdfjs-editor-resizer-label-bottomRight",
                         "pdfjs-editor-resizer-label-bottomMiddle",
                         "pdfjs-editor-resizer-label-bottomLeft",
                         "pdfjs-editor-resizer-label-middleLeft",
                     ].map((e) => [e, t.get(e.replaceAll(/([A-Z])/g, (t) => `-${t.toLowerCase()}`))])
                 );
                 if (e?.strings) for (const i of e.strings) AnnotationEditor._l10nPromise.set(i, t.get(i));
                 if (-1 !== AnnotationEditor._borderLineWidth) return;
                 const i = getComputedStyle(document.documentElement);
                 AnnotationEditor._borderLineWidth = parseFloat(i.getPropertyValue("--outline-width")) || 0;
             }
             static updateDefaultParams(t, e) {}
             static get defaultPropertiesToUpdate() {
                 return [];
             }
             static isHandlingMimeForPasting(t) {
                 return !1;
             }
             static paste(t, e) {
                 (0, s.unreachable)("Not implemented");
             }
             get propertiesToUpdate() {
                 return [];
             }
             get _isDraggable() {
                 return this.#un;
             }
             set _isDraggable(t) {
                 this.#un = t;
                 this.div?.classList.toggle("draggable", t);
             }
             get isEnterHandled() {
                 return !0;
             }
             center() {
                 const [t, e] = this.pageDimensions;
                 switch (this.parentRotation) {
                     case 90:
                         this.x -= (this.height * e) / (2 * t);
                         this.y += (this.width * t) / (2 * e);
                         break;
                     case 180:
                         this.x += this.width / 2;
                         this.y += this.height / 2;
                         break;
                     case 270:
                         this.x += (this.height * e) / (2 * t);
                         this.y -= (this.width * t) / (2 * e);
                         break;
                     default:
                         this.x -= this.width / 2;
                         this.y -= this.height / 2;
                 }
                 this.fixAndSetPosition();
             }
             addCommands(t) {
                 this._uiManager.addCommands(t);
             }
             get currentLayer() {
                 return this._uiManager.currentLayer;
             }
             setInBackground() {
                 this.div.style.zIndex = 0;
             }
             setInForeground() {
                 this.div.style.zIndex = this.#pn;
             }
             setParent(t) {
                 if (null !== t) {
                     this.pageIndex = t.pageIndex;
                     this.pageDimensions = t.pageDimensions;
                 } else this.#gn();
                 this.parent = t;
             }
             focusin(t) {
                 this._focusEventsAllowed && (this.#on ? (this.#on = !1) : this.parent.setSelected(this));
             }
             focusout(t) {
                 if (!this._focusEventsAllowed) return;
                 if (!this.isAttachedToDOM) return;
                 const e = t.relatedTarget;
                 if (!e?.closest(`#${this.id}`)) {
                     t.preventDefault();
                     this.parent?.isMultipleSelection || this.commitOrRemove();
                 }
             }
             commitOrRemove() {
                 this.isEmpty() ? this.remove() : this.commit();
             }
             commit() {
                 this.addToAnnotationStorage();
             }
             addToAnnotationStorage() {
                 this._uiManager.addToAnnotationStorage(this);
             }
             setAt(t, e, i, n) {
                 const [s, r] = this.parentDimensions;
                 [i, n] = this.screenToPageTranslation(i, n);
                 this.x = (t + i) / s;
                 this.y = (e + n) / r;
                 this.fixAndSetPosition();
             }
             #fn(t, e, i) {
                 let [n, s] = t;
                 [e, i] = this.screenToPageTranslation(e, i);
                 this.x += e / n;
                 this.y += i / s;
                 this.fixAndSetPosition();
             }
             translate(t, e) {
                 this.#fn(this.parentDimensions, t, e);
             }
             translateInPage(t, e) {
                 this.#fn(this.pageDimensions, t, e);
                 this.div.scrollIntoView({ block: "nearest" });
             }
             drag(t, e) {
                 const [i, n] = this.parentDimensions;
                 this.x += t / i;
                 this.y += e / n;
                 if (this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
                     const { x: t, y: e } = this.div.getBoundingClientRect();
                     if (this.parent.findNewParent(this, t, e)) {
                         this.x -= Math.floor(this.x);
                         this.y -= Math.floor(this.y);
                     }
                 }
                 let { x: s, y: r } = this;
                 const [a, o] = this.#mn();
                 s += a;
                 r += o;
                 this.div.style.left = `${(100 * s).toFixed(2)}%`;
                 this.div.style.top = `${(100 * r).toFixed(2)}%`;
                 this.div.scrollIntoView({ block: "nearest" });
             }
             #mn() {
                 const [t, e] = this.parentDimensions,
                     { _borderLineWidth: i } = AnnotationEditor,
                     n = i / t,
                     s = i / e;
                 switch (this.rotation) {
                     case 90:
                         return [-n, s];
                     case 180:
                         return [n, s];
                     case 270:
                         return [n, -s];
                     default:
                         return [-n, -s];
                 }
             }
             fixAndSetPosition() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.rotation;
                 const [e, i] = this.pageDimensions;
                 let { x: n, y: s, width: r, height: a } = this;
                 r *= e;
                 a *= i;
                 n *= e;
                 s *= i;
                 switch (t) {
                     case 0:
                         n = Math.max(0, Math.min(e - r, n));
                         s = Math.max(0, Math.min(i - a, s));
                         break;
                     case 90:
                         n = Math.max(0, Math.min(e - a, n));
                         s = Math.min(i, Math.max(r, s));
                         break;
                     case 180:
                         n = Math.min(e, Math.max(r, n));
                         s = Math.min(i, Math.max(a, s));
                         break;
                     case 270:
                         n = Math.min(e, Math.max(a, n));
                         s = Math.max(0, Math.min(i - r, s));
                 }
                 this.x = n /= e;
                 this.y = s /= i;
                 const [o, l] = this.#mn();
                 n += o;
                 s += l;
                 const { style: h } = this.div;
                 h.left = `${(100 * n).toFixed(2)}%`;
                 h.top = `${(100 * s).toFixed(2)}%`;
                 this.moveInDOM();
             }
             static #vn(t, e, i) {
                 switch (i) {
                     case 90:
                         return [e, -t];
                     case 180:
                         return [-t, -e];
                     case 270:
                         return [-e, t];
                     default:
                         return [t, e];
                 }
             }
             screenToPageTranslation(t, e) {
                 return AnnotationEditor.#vn(t, e, this.parentRotation);
             }
             pageTranslationToScreen(t, e) {
                 return AnnotationEditor.#vn(t, e, 360 - this.parentRotation);
             }
             #bn(t) {
                 switch (t) {
                     case 90: {
                         const [t, e] = this.pageDimensions;
                         return [0, -t / e, e / t, 0];
                     }
                     case 180:
                         return [-1, 0, 0, -1];
                     case 270: {
                         const [t, e] = this.pageDimensions;
                         return [0, t / e, -e / t, 0];
                     }
                     default:
                         return [1, 0, 0, 1];
                 }
             }
             get parentScale() {
                 return this._uiManager.viewParameters.realScale;
             }
             get parentRotation() {
                 return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
             }
             get parentDimensions() {
                 const {
                         parentScale: t,
                         pageDimensions: [e, i],
                     } = this,
                     n = e * t,
                     r = i * t;
                 return s.FeatureTest.isCSSRoundSupported ? [Math.round(n), Math.round(r)] : [n, r];
             }
             setDims(t, e) {
                 const [i, n] = this.parentDimensions;
                 this.div.style.width = `${((100 * t) / i).toFixed(2)}%`;
                 this.#tn || (this.div.style.height = `${((100 * e) / n).toFixed(2)}%`);
             }
             fixDims() {
                 const { style: t } = this.div,
                     { height: e, width: i } = t,
                     n = i.endsWith("%"),
                     s = !this.#tn && e.endsWith("%");
                 if (n && s) return;
                 const [r, a] = this.parentDimensions;
                 n || (t.width = `${((100 * parseFloat(i)) / r).toFixed(2)}%`);
                 this.#tn || s || (t.height = `${((100 * parseFloat(e)) / a).toFixed(2)}%`);
             }
             getInitialTranslation() {
                 return [0, 0];
             }
             #yn() {
                 if (this.#en) return;
                 this.#en = document.createElement("div");
                 this.#en.classList.add("resizers");
                 const t = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"];
                 for (const e of t) {
                     const t = document.createElement("div");
                     this.#en.append(t);
                     t.classList.add("resizer", e);
                     t.setAttribute("data-resizer-name", e);
                     t.addEventListener("pointerdown", this.#An.bind(this, e));
                     t.addEventListener("contextmenu", r.noContextMenu);
                     t.tabIndex = -1;
                 }
                 this.div.prepend(this.#en);
             }
             #An(t, e) {
                 e.preventDefault();
                 const { isMac: i } = s.FeatureTest.platform;
                 if (0 !== e.button || (e.ctrlKey && i)) return;
                 this.#Bi?.toggle(!1);
                 const n = this.#En.bind(this, t),
                     r = this._isDraggable;
                 this._isDraggable = !1;
                 const a = { passive: !0, capture: !0 };
                 this.parent.togglePointerEvents(!1);
                 window.addEventListener("pointermove", n, a);
                 const o = this.x,
                     l = this.y,
                     h = this.width,
                     c = this.height,
                     d = this.parent.div.style.cursor,
                     u = this.div.style.cursor;
                 this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(e.target).cursor;
                 const pointerUpCallback = () => {
                     this.parent.togglePointerEvents(!0);
                     this.#Bi?.toggle(!0);
                     this._isDraggable = r;
                     window.removeEventListener("pointerup", pointerUpCallback);
                     window.removeEventListener("blur", pointerUpCallback);
                     window.removeEventListener("pointermove", n, a);
                     this.parent.div.style.cursor = d;
                     this.div.style.cursor = u;
                     this.#wn(o, l, h, c);
                 };
                 window.addEventListener("pointerup", pointerUpCallback);
                 window.addEventListener("blur", pointerUpCallback);
             }
             #wn(t, e, i, n) {
                 const s = this.x,
                     r = this.y,
                     a = this.width,
                     o = this.height;
                 (s === t && r === e && a === i && o === n) ||
                     this.addCommands({
                         cmd: () => {
                             this.width = a;
                             this.height = o;
                             this.x = s;
                             this.y = r;
                             const [t, e] = this.parentDimensions;
                             this.setDims(t * a, e * o);
                             this.fixAndSetPosition();
                         },
                         undo: () => {
                             this.width = i;
                             this.height = n;
                             this.x = t;
                             this.y = e;
                             const [s, r] = this.parentDimensions;
                             this.setDims(s * i, r * n);
                             this.fixAndSetPosition();
                         },
                         mustExec: !0,
                     });
             }
             #En(t, e) {
                 const [i, n] = this.parentDimensions,
                     s = this.x,
                     r = this.y,
                     a = this.width,
                     o = this.height,
                     l = AnnotationEditor.MIN_SIZE / i,
                     h = AnnotationEditor.MIN_SIZE / n,
                     round = (t) => Math.round(1e4 * t) / 1e4,
                     c = this.#bn(this.rotation),
                     transf = (t, e) => [c[0] * t + c[2] * e, c[1] * t + c[3] * e],
                     d = this.#bn(360 - this.rotation);
                 let u,
                     p,
                     g = !1,
                     f = !1;
                 switch (t) {
                     case "topLeft":
                         g = !0;
                         u = (t, e) => [0, 0];
                         p = (t, e) => [t, e];
                         break;
                     case "topMiddle":
                         u = (t, e) => [t / 2, 0];
                         p = (t, e) => [t / 2, e];
                         break;
                     case "topRight":
                         g = !0;
                         u = (t, e) => [t, 0];
                         p = (t, e) => [0, e];
                         break;
                     case "middleRight":
                         f = !0;
                         u = (t, e) => [t, e / 2];
                         p = (t, e) => [0, e / 2];
                         break;
                     case "bottomRight":
                         g = !0;
                         u = (t, e) => [t, e];
                         p = (t, e) => [0, 0];
                         break;
                     case "bottomMiddle":
                         u = (t, e) => [t / 2, e];
                         p = (t, e) => [t / 2, 0];
                         break;
                     case "bottomLeft":
                         g = !0;
                         u = (t, e) => [0, e];
                         p = (t, e) => [t, 0];
                         break;
                     case "middleLeft":
                         f = !0;
                         u = (t, e) => [0, e / 2];
                         p = (t, e) => [t, e / 2];
                 }
                 const m = u(a, o),
                     v = p(a, o);
                 let b = transf(...v);
                 const y = round(s + b[0]),
                     A = round(r + b[1]);
                 let E = 1,
                     w = 1,
                     [x, _] = this.screenToPageTranslation(e.movementX, e.movementY);
                 [x, _] = ((S = x / i), (C = _ / n), [d[0] * S + d[2] * C, d[1] * S + d[3] * C]);
                 var S, C;
                 if (g) {
                     const t = Math.hypot(a, o);
                     E = w = Math.max(Math.min(Math.hypot(v[0] - m[0] - x, v[1] - m[1] - _) / t, 1 / a, 1 / o), l / a, h / o);
                 } else f ? (E = Math.max(l, Math.min(1, Math.abs(v[0] - m[0] - x))) / a) : (w = Math.max(h, Math.min(1, Math.abs(v[1] - m[1] - _))) / o);
                 const T = round(a * E),
                     P = round(o * w);
                 b = transf(...p(T, P));
                 const M = y - b[0],
                     R = A - b[1];
                 this.width = T;
                 this.height = P;
                 this.x = M;
                 this.y = R;
                 this.setDims(i * T, n * P);
                 this.fixAndSetPosition();
             }
             altTextFinish() {
                 this.#Bi?.finish();
             }
             async addEditToolbar() {
                 if (this.#rn || this.#hn) return this.#rn;
                 this.#rn = new EditorToolbar(this);
                 this.div.append(this.#rn.render());
                 this.#Bi && this.#rn.addAltTextButton(await this.#Bi.render());
                 return this.#rn;
             }
             removeEditToolbar() {
                 if (this.#rn) {
                     this.#rn.remove();
                     this.#rn = null;
                     this.#Bi?.destroy();
                 }
             }
             getClientDimensions() {
                 return this.div.getBoundingClientRect();
             }
             async addAltTextButton() {
                 if (!this.#Bi) {
                     AltText.initialize(AnnotationEditor._l10nPromise);
                     this.#Bi = new AltText(this);
                     await this.addEditToolbar();
                 }
             }
             get altTextData() {
                 return this.#Bi?.data;
             }
             set altTextData(t) {
                 this.#Bi && (this.#Bi.data = t);
             }
             render() {
                 this.div = document.createElement("div");
                 this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360);
                 this.div.className = this.name;
                 this.div.setAttribute("id", this.id);
                 this.div.setAttribute("tabIndex", 0);
                 this.setInForeground();
                 this.div.addEventListener("focusin", this.#nn);
                 this.div.addEventListener("focusout", this.#sn);
                 const [t, e] = this.parentDimensions;
                 if (this.parentRotation % 180 != 0) {
                     this.div.style.maxWidth = `${((100 * e) / t).toFixed(2)}%`;
                     this.div.style.maxHeight = `${((100 * t) / e).toFixed(2)}%`;
                 }
                 const [i, s] = this.getInitialTranslation();
                 this.translate(i, s);
                 (0, n.bindEvents)(this, this.div, ["pointerdown"]);
                 return this.div;
             }
             pointerdown(t) {
                 const { isMac: e } = s.FeatureTest.platform;
                 if (0 !== t.button || (t.ctrlKey && e)) t.preventDefault();
                 else {
                     this.#on = !0;
                     this._isDraggable ? this.#xn(t) : this.#_n(t);
                 }
             }
             #_n(t) {
                 const { isMac: e } = s.FeatureTest.platform;
                 (t.ctrlKey && !e) || t.shiftKey || (t.metaKey && e) ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
             }
             #xn(t) {
                 const e = this._uiManager.isSelected(this);
                 this._uiManager.setUpDragSession();
                 let i, n;
                 if (e) {
                     i = { passive: !0, capture: !0 };
                     n = (t) => {
                         const [e, i] = this.screenToPageTranslation(t.movementX, t.movementY);
                         this._uiManager.dragSelectedEditors(e, i);
                     };
                     window.addEventListener("pointermove", n, i);
                 }
                 const pointerUpCallback = () => {
                     window.removeEventListener("pointerup", pointerUpCallback);
                     window.removeEventListener("blur", pointerUpCallback);
                     e && window.removeEventListener("pointermove", n, i);
                     this.#on = !1;
                     this._uiManager.endDragSession() || this.#_n(t);
                 };
                 window.addEventListener("pointerup", pointerUpCallback);
                 window.addEventListener("blur", pointerUpCallback);
             }
             moveInDOM() {
                 this.#dn && clearTimeout(this.#dn);
                 this.#dn = setTimeout(() => {
                     this.#dn = null;
                     this.parent?.moveEditorInDOM(this);
                 }, 0);
             }
             _setParentAndPosition(t, e, i) {
                 t.changeParent(this);
                 this.x = e;
                 this.y = i;
                 this.fixAndSetPosition();
             }
             getRect(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.rotation;
                 const n = this.parentScale,
                     [s, r] = this.pageDimensions,
                     [a, o] = this.pageTranslation,
                     l = t / n,
                     h = e / n,
                     c = this.x * s,
                     d = this.y * r,
                     u = this.width * s,
                     p = this.height * r;
                 switch (i) {
                     case 0:
                         return [c + l + a, r - d - h - p + o, c + l + u + a, r - d - h + o];
                     case 90:
                         return [c + h + a, r - d + l + o, c + h + p + a, r - d + l + u + o];
                     case 180:
                         return [c - l - u + a, r - d + h + o, c - l + a, r - d + h + p + o];
                     case 270:
                         return [c - h - p + a, r - d - l - u + o, c - h + a, r - d - l + o];
                     default:
                         throw new Error("Invalid rotation");
                 }
             }
             getRectInCurrentCoords(t, e) {
                 const [i, n, s, r] = t,
                     a = s - i,
                     o = r - n;
                 switch (this.rotation) {
                     case 0:
                         return [i, e - r, a, o];
                     case 90:
                         return [i, e - n, o, a];
                     case 180:
                         return [s, e - n, a, o];
                     case 270:
                         return [s, e - r, o, a];
                     default:
                         throw new Error("Invalid rotation");
                 }
             }
             onceAdded() {}
             isEmpty() {
                 return !1;
             }
             enableEditMode() {
                 this.#hn = !0;
             }
             disableEditMode() {
                 this.#hn = !1;
             }
             isInEditMode() {
                 return this.#hn;
             }
             shouldGetKeyboardEvents() {
                 return this.#cn;
             }
             needsToBeRebuilt() {
                 return this.div && !this.isAttachedToDOM;
             }
             rebuild() {
                 this.div?.addEventListener("focusin", this.#nn);
                 this.div?.addEventListener("focusout", this.#sn);
             }
             rotate(t) {}
             serialize() {
                 (0, s.unreachable)("An editor must be serializable");
             }
             static deserialize(t, e, i) {
                 const n = new this.prototype.constructor({ parent: e, id: e.getNextId(), uiManager: i });
                 n.rotation = t.rotation;
                 const [s, r] = n.pageDimensions,
                     [a, o, l, h] = n.getRectInCurrentCoords(t.rect, r);
                 n.x = a / s;
                 n.y = o / r;
                 n.width = l / s;
                 n.height = h / r;
                 return n;
             }
             remove() {
                 this.div.removeEventListener("focusin", this.#nn);
                 this.div.removeEventListener("focusout", this.#sn);
                 this.isEmpty() || this.commit();
                 this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this);
                 if (this.#dn) {
                     clearTimeout(this.#dn);
                     this.#dn = null;
                 }
                 this.#gn();
                 this.removeEditToolbar();
             }
             get isResizable() {
                 return !1;
             }
             makeResizable() {
                 if (this.isResizable) {
                     this.#yn();
                     this.#en.classList.remove("hidden");
                     (0, n.bindEvents)(this, this.div, ["keydown"]);
                 }
             }
             get toolbarPosition() {
                 return null;
             }
             keydown(t) {
                 if (!this.isResizable || t.target !== this.div || "Enter" !== t.key) return;
                 this._uiManager.setSelected(this);
                 this.#in = { savedX: this.x, savedY: this.y, savedWidth: this.width, savedHeight: this.height };
                 const e = this.#en.children;
                 if (!this.#Zi) {
                     this.#Zi = Array.from(e);
                     const t = this.#Sn.bind(this),
                         i = this.#Cn.bind(this);
                     for (const e of this.#Zi) {
                         const n = e.getAttribute("data-resizer-name");
                         e.setAttribute("role", "spinbutton");
                         e.addEventListener("keydown", t);
                         e.addEventListener("blur", i);
                         e.addEventListener("focus", this.#Tn.bind(this, n));
                         AnnotationEditor._l10nPromise.get(`pdfjs-editor-resizer-label-${n}`).then((t) => e.setAttribute("aria-label", t));
                     }
                 }
                 const i = this.#Zi[0];
                 let n = 0;
                 for (const t of e) {
                     if (t === i) break;
                     n++;
                 }
                 const s = (((360 - this.rotation + this.parentRotation) % 360) / 90) * (this.#Zi.length / 4);
                 if (s !== n) {
                     if (s < n) for (let t = 0; t < n - s; t++) this.#en.append(this.#en.firstChild);
                     else if (s > n) for (let t = 0; t < s - n; t++) this.#en.firstChild.before(this.#en.lastChild);
                     let t = 0;
                     for (const i of e) {
                         const e = this.#Zi[t++].getAttribute("data-resizer-name");
                         AnnotationEditor._l10nPromise.get(`pdfjs-editor-resizer-label-${e}`).then((t) => i.setAttribute("aria-label", t));
                     }
                 }
                 this.#Pn(0);
                 this.#cn = !0;
                 this.#en.firstChild.focus({ focusVisible: !0 });
                 t.preventDefault();
                 t.stopImmediatePropagation();
             }
             #Sn(t) {
                 AnnotationEditor._resizerKeyboardManager.exec(this, t);
             }
             #Cn(t) {
                 this.#cn && t.relatedTarget?.parentNode !== this.#en && this.#gn();
             }
             #Tn(t) {
                 this.#an = this.#cn ? t : "";
             }
             #Pn(t) {
                 if (this.#Zi) for (const e of this.#Zi) e.tabIndex = t;
             }
             _resizeWithKeyboard(t, e) {
                 this.#cn && this.#En(this.#an, { movementX: t, movementY: e });
             }
             #gn() {
                 this.#cn = !1;
                 this.#Pn(-1);
                 if (this.#in) {
                     const { savedX: t, savedY: e, savedWidth: i, savedHeight: n } = this.#in;
                     this.#wn(t, e, i, n);
                     this.#in = null;
                 }
             }
             _stopResizingWithKeyboard() {
                 this.#gn();
                 this.div.focus();
             }
             select() {
                 this.makeResizable();
                 this.div?.classList.add("selectedEditor");
                 this.#rn
                     ? this.#rn?.show()
                     : this.addEditToolbar().then(() => {
                           this.div?.classList.contains("selectedEditor") && this.#rn?.show();
                       });
             }
             unselect() {
                 this.#en?.classList.add("hidden");
                 this.div?.classList.remove("selectedEditor");
                 this.div?.contains(document.activeElement) && this._uiManager.currentLayer.div.focus();
                 this.#rn?.hide();
             }
             updateParams(t, e) {}
             disableEditing() {}
             enableEditing() {}
             enterInEditMode() {}
             getImageForAltText() {
                 return null;
             }
             get contentDiv() {
                 return this.div;
             }
             get isEditing() {
                 return this.#ln;
             }
             set isEditing(t) {
                 this.#ln = t;
                 if (this.parent)
                     if (t) {
                         this.parent.setSelected(this);
                         this.parent.setActiveEditor(this);
                     } else this.parent.setActiveEditor(null);
             }
             setAspectRatio(t, e) {
                 this.#tn = !0;
                 const i = t / e,
                     { style: n } = this.div;
                 n.aspectRatio = i;
                 n.height = "auto";
             }
             static get MIN_SIZE() {
                 return 16;
             }
             static canCreateNewEmptyEditor() {
                 return !0;
             }
         }
         class FakeEditor extends AnnotationEditor {
             constructor(t) {
                 super(t);
                 this.annotationElementId = t.annotationElementId;
                 this.deleted = !0;
             }
             serialize() {
                 return { id: this.annotationElementId, deleted: !0, pageIndex: this.pageIndex };
             }
         }
     },
     7405: (t, e, i) => {
         i.d(e, { Outliner: () => Outliner });
         i(4226), i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914);
         class Outliner {
             #Mn;
             #Rn = [];
             #kn = [];
             constructor(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                     i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                     n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                     s = 1 / 0,
                     r = -1 / 0,
                     a = 1 / 0,
                     o = -1 / 0;
                 const l = 10 ** -4;
                 for (const { x: i, y: n, width: h, height: c } of t) {
                     const t = Math.floor((i - e) / l) * l,
                         d = Math.ceil((i + h + e) / l) * l,
                         u = Math.floor((n - e) / l) * l,
                         p = Math.ceil((n + c + e) / l) * l,
                         g = [t, u, p, !0],
                         f = [d, u, p, !1];
                     this.#Rn.push(g, f);
                     s = Math.min(s, t);
                     r = Math.max(r, d);
                     a = Math.min(a, u);
                     o = Math.max(o, p);
                 }
                 const h = r - s + 2 * i,
                     c = o - a + 2 * i,
                     d = s - i,
                     u = a - i,
                     p = this.#Rn.at(n ? -1 : -2),
                     g = [p[0], p[2]];
                 for (const t of this.#Rn) {
                     const [e, i, n] = t;
                     t[0] = (e - d) / h;
                     t[1] = (i - u) / c;
                     t[2] = (n - u) / c;
                 }
                 this.#Mn = { x: d, y: u, width: h, height: c, lastPoint: g };
             }
             getOutlines() {
                 this.#Rn.sort((t, e) => t[0] - e[0] || t[1] - e[1] || t[2] - e[2]);
                 const t = [];
                 for (const e of this.#Rn)
                     if (e[3]) {
                         t.push(...this.#Fn(e));
                         this.#Dn(e);
                     } else {
                         this.#In(e);
                         t.push(...this.#Fn(e));
                     }
                 return this.#Ln(t);
             }
             #Ln(t) {
                 const e = [],
                     i = new Set();
                 for (const i of t) {
                     const [t, n, s] = i;
                     e.push([t, n, i], [t, s, i]);
                 }
                 e.sort((t, e) => t[1] - e[1] || t[0] - e[0]);
                 for (let t = 0, n = e.length; t < n; t += 2) {
                     const n = e[t][2],
                         s = e[t + 1][2];
                     n.push(s);
                     s.push(n);
                     i.add(n);
                     i.add(s);
                 }
                 const n = [];
                 let s;
                 for (; i.size > 0; ) {
                     const t = i.values().next().value;
                     let [e, r, a, o, l] = t;
                     i.delete(t);
                     let h = e,
                         c = r;
                     s = [e, a];
                     n.push(s);
                     for (;;) {
                         let t;
                         if (i.has(o)) t = o;
                         else {
                             if (!i.has(l)) break;
                             t = l;
                         }
                         i.delete(t);
                         [e, r, a, o, l] = t;
                         if (h !== e) {
                             s.push(h, c, e, c === r ? r : a);
                             h = e;
                         }
                         c = c === r ? a : r;
                     }
                     s.push(h, c);
                 }
                 return { outlines: n, box: this.#Mn };
             }
             #On(t) {
                 const e = this.#kn;
                 let i = 0,
                     n = e.length - 1;
                 for (; i <= n; ) {
                     const s = (i + n) >> 1,
                         r = e[s][0];
                     if (r === t) return s;
                     r < t ? (i = s + 1) : (n = s - 1);
                 }
                 return n + 1;
             }
             #Dn(t) {
                 let [, e, i] = t;
                 const n = this.#On(e);
                 this.#kn.splice(n, 0, [e, i]);
             }
             #In(t) {
                 let [, e, i] = t;
                 const n = this.#On(e);
                 for (let t = n; t < this.#kn.length; t++) {
                     const [n, s] = this.#kn[t];
                     if (n !== e) break;
                     if (n === e && s === i) {
                         this.#kn.splice(t, 1);
                         return;
                     }
                 }
                 for (let t = n - 1; t >= 0; t--) {
                     const [n, s] = this.#kn[t];
                     if (n !== e) break;
                     if (n === e && s === i) {
                         this.#kn.splice(t, 1);
                         return;
                     }
                 }
             }
             #Fn(t) {
                 const [e, i, n] = t,
                     s = [[e, i, n]],
                     r = this.#On(n);
                 for (let t = 0; t < r; t++) {
                     const [i, n] = this.#kn[t];
                     for (let t = 0, r = s.length; t < r; t++) {
                         const [, a, o] = s[t];
                         if (!(n <= a || o <= i))
                             if (a >= i)
                                 if (o > n) s[t][1] = n;
                                 else {
                                     if (1 === r) return [];
                                     s.splice(t, 1);
                                     t--;
                                     r--;
                                 }
                             else {
                                 s[t][2] = i;
                                 o > n && s.push([e, n, o]);
                             }
                     }
                 }
                 return s;
             }
         }
     },
     4812: (t, e, i) => {
         i.d(e, { AnnotationEditorUIManager: () => AnnotationEditorUIManager, ColorManager: () => ColorManager, KeyboardManager: () => KeyboardManager, bindEvents: () => bindEvents, opacityToHex: () => opacityToHex });
         i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(4226), i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914), i(7121), i(385), i(7944), i(2808), i(8518);
         var n = i(3266),
             s = i(473);
         function bindEvents(t, e, i) {
             for (const n of i) e.addEventListener(n, t[n].bind(t));
         }
         function opacityToHex(t) {
             return Math.round(Math.min(255, Math.max(1, 255 * t)))
                 .toString(16)
                 .padStart(2, "0");
         }
         class IdManager {
             #vt = 0;
             getId() {
                 return `${n.AnnotationEditorPrefix}${this.#vt++}`;
             }
         }
         class ImageManager {
             #Bn = (0, n.getUuid)();
             #vt = 0;
             #bt = null;
             static get _isSVGFittingCanvas() {
                 const t = new OffscreenCanvas(1, 3).getContext("2d"),
                     e = new Image();
                 e.src = 'data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>';
                 const i = e.decode().then(() => {
                     t.drawImage(e, 0, 0, 1, 1, 0, 0, 1, 3);
                     return 0 === new Uint32Array(t.getImageData(0, 0, 1, 1).data.buffer)[0];
                 });
                 return (0, n.shadow)(this, "_isSVGFittingCanvas", i);
             }
             async #Nn(t, e) {
                 this.#bt ||= new Map();
                 let i = this.#bt.get(t);
                 if (null === i) return null;
                 if (i?.bitmap) {
                     i.refCounter += 1;
                     return i;
                 }
                 try {
                     i ||= { bitmap: null, id: `image_${this.#Bn}_${this.#vt++}`, refCounter: 0, isSvg: !1 };
                     let t;
                     if ("string" == typeof e) {
                         i.url = e;
                         t = await (0, s.fetchData)(e, "blob");
                     } else t = i.file = e;
                     if ("image/svg+xml" === t.type) {
                         const e = ImageManager._isSVGFittingCanvas,
                             n = new FileReader(),
                             s = new Image(),
                             r = new Promise((t, r) => {
                                 s.onload = () => {
                                     i.bitmap = s;
                                     i.isSvg = !0;
                                     t();
                                 };
                                 n.onload = async () => {
                                     const t = (i.svgUrl = n.result);
                                     s.src = (await e) ? `${t}#svgView(preserveAspectRatio(none))` : t;
                                 };
                                 s.onerror = n.onerror = r;
                             });
                         n.readAsDataURL(t);
                         await r;
                     } else i.bitmap = await createImageBitmap(t);
                     i.refCounter = 1;
                 } catch (t) {
                     console.error(t);
                     i = null;
                 }
                 this.#bt.set(t, i);
                 i && this.#bt.set(i.id, i);
                 return i;
             }
             async getFromFile(t) {
                 const { lastModified: e, name: i, size: n, type: s } = t;
                 return this.#Nn(`${e}_${i}_${n}_${s}`, t);
             }
             async getFromUrl(t) {
                 return this.#Nn(t, t);
             }
             async getFromId(t) {
                 this.#bt ||= new Map();
                 const e = this.#bt.get(t);
                 if (!e) return null;
                 if (e.bitmap) {
                     e.refCounter += 1;
                     return e;
                 }
                 return e.file ? this.getFromFile(e.file) : this.getFromUrl(e.url);
             }
             getSvgUrl(t) {
                 const e = this.#bt.get(t);
                 return e?.isSvg ? e.svgUrl : null;
             }
             deleteId(t) {
                 this.#bt ||= new Map();
                 const e = this.#bt.get(t);
                 if (e) {
                     e.refCounter -= 1;
                     0 === e.refCounter && (e.bitmap = null);
                 }
             }
             isValidId(t) {
                 return t.startsWith(`image_${this.#Bn}_`);
             }
         }
         class CommandManager {
             #Un = [];
             #zn = !1;
             #jn;
             #Hn = -1;
             constructor() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 128;
                 this.#jn = t;
             }
             add(t) {
                 let { cmd: e, undo: i, mustExec: n, type: s = NaN, overwriteIfSameType: r = !1, keepUndo: a = !1 } = t;
                 n && e();
                 if (this.#zn) return;
                 const o = { cmd: e, undo: i, type: s };
                 if (-1 === this.#Hn) {
                     this.#Un.length > 0 && (this.#Un.length = 0);
                     this.#Hn = 0;
                     this.#Un.push(o);
                     return;
                 }
                 if (r && this.#Un[this.#Hn].type === s) {
                     a && (o.undo = this.#Un[this.#Hn].undo);
                     this.#Un[this.#Hn] = o;
                     return;
                 }
                 const l = this.#Hn + 1;
                 if (l === this.#jn) this.#Un.splice(0, 1);
                 else {
                     this.#Hn = l;
                     l < this.#Un.length && this.#Un.splice(l);
                 }
                 this.#Un.push(o);
             }
             undo() {
                 if (-1 !== this.#Hn) {
                     this.#zn = !0;
                     this.#Un[this.#Hn].undo();
                     this.#zn = !1;
                     this.#Hn -= 1;
                 }
             }
             redo() {
                 if (this.#Hn < this.#Un.length - 1) {
                     this.#Hn += 1;
                     this.#zn = !0;
                     this.#Un[this.#Hn].cmd();
                     this.#zn = !1;
                 }
             }
             hasSomethingToUndo() {
                 return -1 !== this.#Hn;
             }
             hasSomethingToRedo() {
                 return this.#Hn < this.#Un.length - 1;
             }
             destroy() {
                 this.#Un = null;
             }
         }
         class KeyboardManager {
             constructor(t) {
                 this.buffer = [];
                 this.callbacks = new Map();
                 this.allKeys = new Set();
                 const { isMac: e } = n.FeatureTest.platform;
                 for (const [i, n, s = {}] of t)
                     for (const t of i) {
                         const i = t.startsWith("mac+");
                         if (e && i) {
                             this.callbacks.set(t.slice(4), { callback: n, options: s });
                             this.allKeys.add(t.split("+").at(-1));
                         } else if (!e && !i) {
                             this.callbacks.set(t, { callback: n, options: s });
                             this.allKeys.add(t.split("+").at(-1));
                         }
                     }
             }
             #Vn(t) {
                 t.altKey && this.buffer.push("alt");
                 t.ctrlKey && this.buffer.push("ctrl");
                 t.metaKey && this.buffer.push("meta");
                 t.shiftKey && this.buffer.push("shift");
                 this.buffer.push(t.key);
                 const e = this.buffer.join("+");
                 this.buffer.length = 0;
                 return e;
             }
             exec(t, e) {
                 if (!this.allKeys.has(e.key)) return;
                 const i = this.callbacks.get(this.#Vn(e));
                 if (!i) return;
                 const {
                     callback: n,
                     options: { bubbles: s = !1, args: r = [], checker: a = null },
                 } = i;
                 if (!a || a(t, e)) {
                     n.bind(t, ...r, e)();
                     if (!s) {
                         e.stopPropagation();
                         e.preventDefault();
                     }
                 }
             }
         }
         class ColorManager {
             static _colorsMapping = new Map([
                 ["CanvasText", [0, 0, 0]],
                 ["Canvas", [255, 255, 255]],
             ]);
             get _colors() {
                 const t = new Map([
                     ["CanvasText", null],
                     ["Canvas", null],
                 ]);
                 (0, s.getColorValues)(t);
                 return (0, n.shadow)(this, "_colors", t);
             }
             convert(t) {
                 const e = (0, s.getRGB)(t);
                 if (!window.matchMedia("(forced-colors: active)").matches) return e;
                 for (const [t, i] of this._colors) if (i.every((t, i) => t === e[i])) return ColorManager._colorsMapping.get(t);
                 return e;
             }
             getHexCode(t) {
                 const e = this._colors.get(t);
                 return e ? n.Util.makeHexColor(...e) : t;
             }
         }
         class AnnotationEditorUIManager {
             #Wn = null;
             #Gn = new Map();
             #qn = new Map();
             #$n = null;
             #Kn = null;
             #Xn = new CommandManager();
             #Yn = 0;
             #Jn = new Set();
             #Qn = null;
             #Ei = null;
             #Zn = new Set();
             #ts = null;
             #es = null;
             #is = null;
             #ns = new IdManager();
             #ss = !1;
             #rs = !1;
             #as = null;
             #os = null;
             #ls = n.AnnotationEditorType.NONE;
             #hs = new Set();
             #cs = null;
             #ds = this.blur.bind(this);
             #us = this.focus.bind(this);
             #ps = this.copy.bind(this);
             #gs = this.cut.bind(this);
             #fs = this.paste.bind(this);
             #ms = this.keydown.bind(this);
             #vs = this.onEditingAction.bind(this);
             #bs = this.onPageChanging.bind(this);
             #ys = this.onScaleChanging.bind(this);
             #As = this.onRotationChanging.bind(this);
             #Es = { isEditing: !1, isEmpty: !0, hasSomethingToUndo: !1, hasSomethingToRedo: !1, hasSelectedEditor: !1 };
             #ws = [0, 0];
             #xs = null;
             #p = null;
             #_s = null;
             static TRANSLATE_SMALL = 1;
             static TRANSLATE_BIG = 10;
             static get _keyboardManager() {
                 const t = AnnotationEditorUIManager.prototype,
                     arrowChecker = (t) => t.#p.contains(document.activeElement) && "BUTTON" !== document.activeElement.tagName && t.hasSomethingToControl(),
                     textInputChecker = (t, e) => {
                         let { target: i } = e;
                         if (i instanceof HTMLInputElement) {
                             const { type: t } = i;
                             return "text" !== t && "number" !== t;
                         }
                         return !0;
                     },
                     e = this.TRANSLATE_SMALL,
                     i = this.TRANSLATE_BIG;
                 return (0, n.shadow)(
                     this,
                     "_keyboardManager",
                     new KeyboardManager([
                         [["ctrl+a", "mac+meta+a"], t.selectAll, { checker: textInputChecker }],
                         [["ctrl+z", "mac+meta+z"], t.undo, { checker: textInputChecker }],
                         [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], t.redo, { checker: textInputChecker }],
                         [
                             ["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"],
                             t.delete,
                             { checker: textInputChecker },
                         ],
                         [
                             ["Enter", "mac+Enter"],
                             t.addNewEditorFromKeyboard,
                             {
                                 checker: (t, e) => {
                                     let { target: i } = e;
                                     return !(i instanceof HTMLButtonElement) && t.#p.contains(i) && !t.isEnterHandled;
                                 },
                             },
                         ],
                         [[" ", "mac+ "], t.addNewEditorFromKeyboard, { checker: (t) => t.#p.contains(document.activeElement) }],
                         [["Escape", "mac+Escape"], t.unselectAll],
                         [["ArrowLeft", "mac+ArrowLeft"], t.translateSelectedEditors, { args: [-e, 0], checker: arrowChecker }],
                         [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t.translateSelectedEditors, { args: [-i, 0], checker: arrowChecker }],
                         [["ArrowRight", "mac+ArrowRight"], t.translateSelectedEditors, { args: [e, 0], checker: arrowChecker }],
                         [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t.translateSelectedEditors, { args: [i, 0], checker: arrowChecker }],
                         [["ArrowUp", "mac+ArrowUp"], t.translateSelectedEditors, { args: [0, -e], checker: arrowChecker }],
                         [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t.translateSelectedEditors, { args: [0, -i], checker: arrowChecker }],
                         [["ArrowDown", "mac+ArrowDown"], t.translateSelectedEditors, { args: [0, e], checker: arrowChecker }],
                         [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t.translateSelectedEditors, { args: [0, i], checker: arrowChecker }],
                     ])
                 );
             }
             constructor(t, e, i, n, r, a, o) {
                 this.#p = t;
                 this.#_s = e;
                 this.#$n = i;
                 this._eventBus = n;
                 this._eventBus._on("editingaction", this.#vs);
                 this._eventBus._on("pagechanging", this.#bs);
                 this._eventBus._on("scalechanging", this.#ys);
                 this._eventBus._on("rotationchanging", this.#As);
                 this.#Kn = r.annotationStorage;
                 this.#ts = r.filterFactory;
                 this.#cs = a;
                 this.#is = o || null;
                 this.viewParameters = { realScale: s.PixelsPerInch.PDF_TO_CSS_UNITS, rotation: 0 };
             }
             destroy() {
                 this.#Ss();
                 this.#Cs();
                 this._eventBus._off("editingaction", this.#vs);
                 this._eventBus._off("pagechanging", this.#bs);
                 this._eventBus._off("scalechanging", this.#ys);
                 this._eventBus._off("rotationchanging", this.#As);
                 for (const t of this.#qn.values()) t.destroy();
                 this.#qn.clear();
                 this.#Gn.clear();
                 this.#Zn.clear();
                 this.#Wn = null;
                 this.#hs.clear();
                 this.#Xn.destroy();
                 this.#$n?.destroy();
                 if (this.#es) {
                     clearTimeout(this.#es);
                     this.#es = null;
                 }
                 if (this.#xs) {
                     clearTimeout(this.#xs);
                     this.#xs = null;
                 }
             }
             get hcmFilter() {
                 return (0, n.shadow)(this, "hcmFilter", this.#cs ? this.#ts.addHCMFilter(this.#cs.foreground, this.#cs.background) : "none");
             }
             get direction() {
                 return (0, n.shadow)(this, "direction", getComputedStyle(this.#p).direction);
             }
             get highlightColors() {
                 return (0, n.shadow)(this, "highlightColors", this.#is ? new Map(this.#is.split(",").map((t) => t.split("=").map((t) => t.trim()))) : null);
             }
             setMainHighlightColorPicker(t) {
                 this.#os = t;
             }
             editAltText(t) {
                 this.#$n?.editAltText(this, t);
             }
             onPageChanging(t) {
                 let { pageNumber: e } = t;
                 this.#Yn = e - 1;
             }
             focusMainContainer() {
                 this.#p.focus();
             }
             findParent(t, e) {
                 for (const i of this.#qn.values()) {
                     const { x: n, y: s, width: r, height: a } = i.div.getBoundingClientRect();
                     if (t >= n && t <= n + r && e >= s && e <= s + a) return i;
                 }
                 return null;
             }
             disableUserSelect() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 this.#_s.classList.toggle("noUserSelect", t);
             }
             addShouldRescale(t) {
                 this.#Zn.add(t);
             }
             removeShouldRescale(t) {
                 this.#Zn.delete(t);
             }
             onScaleChanging(t) {
                 let { scale: e } = t;
                 this.commitOrRemove();
                 this.viewParameters.realScale = e * s.PixelsPerInch.PDF_TO_CSS_UNITS;
                 for (const t of this.#Zn) t.onScaleChanging();
             }
             onRotationChanging(t) {
                 let { pagesRotation: e } = t;
                 this.commitOrRemove();
                 this.viewParameters.rotation = e;
             }
             addToAnnotationStorage(t) {
                 t.isEmpty() || !this.#Kn || this.#Kn.has(t.id) || this.#Kn.setValue(t.id, t);
             }
             #Ts() {
                 window.addEventListener("focus", this.#us);
                 window.addEventListener("blur", this.#ds);
             }
             #Cs() {
                 window.removeEventListener("focus", this.#us);
                 window.removeEventListener("blur", this.#ds);
             }
             blur() {
                 if (!this.hasSelection) return;
                 const { activeElement: t } = document;
                 for (const e of this.#hs)
                     if (e.div.contains(t)) {
                         this.#as = [e, t];
                         e._focusEventsAllowed = !1;
                         break;
                     }
             }
             focus() {
                 if (!this.#as) return;
                 const [t, e] = this.#as;
                 this.#as = null;
                 e.addEventListener(
                     "focusin",
                     () => {
                         t._focusEventsAllowed = !0;
                     },
                     { once: !0 }
                 );
                 e.focus();
             }
             #Ps() {
                 window.addEventListener("keydown", this.#ms);
             }
             #Ss() {
                 window.removeEventListener("keydown", this.#ms);
             }
             #Ms() {
                 document.addEventListener("copy", this.#ps);
                 document.addEventListener("cut", this.#gs);
                 document.addEventListener("paste", this.#fs);
             }
             #Rs() {
                 document.removeEventListener("copy", this.#ps);
                 document.removeEventListener("cut", this.#gs);
                 document.removeEventListener("paste", this.#fs);
             }
             addEditListeners() {
                 this.#Ps();
                 this.#Ms();
             }
             removeEditListeners() {
                 this.#Ss();
                 this.#Rs();
             }
             copy(t) {
                 t.preventDefault();
                 this.#Wn?.commitOrRemove();
                 if (!this.hasSelection) return;
                 const e = [];
                 for (const t of this.#hs) {
                     const i = t.serialize(!0);
                     i && e.push(i);
                 }
                 0 !== e.length && t.clipboardData.setData("application/pdfjs", JSON.stringify(e));
             }
             cut(t) {
                 this.copy(t);
                 this.delete();
             }
             paste(t) {
                 t.preventDefault();
                 const { clipboardData: e } = t;
                 for (const t of e.items)
                     for (const e of this.#Ei)
                         if (e.isHandlingMimeForPasting(t.type)) {
                             e.paste(t, this.currentLayer);
                             return;
                         }
                 let i = e.getData("application/pdfjs");
                 if (!i) return;
                 try {
                     i = JSON.parse(i);
                 } catch (t) {
                     (0, n.warn)(`paste: "${t.message}".`);
                     return;
                 }
                 if (!Array.isArray(i)) return;
                 this.unselectAll();
                 const s = this.currentLayer;
                 try {
                     const t = [];
                     for (const e of i) {
                         const i = s.deserialize(e);
                         if (!i) return;
                         t.push(i);
                     }
                     const cmd = () => {
                             for (const e of t) this.#ks(e);
                             this.#Fs(t);
                         },
                         undo = () => {
                             for (const e of t) e.remove();
                         };
                     this.addCommands({ cmd: cmd, undo: undo, mustExec: !0 });
                 } catch (t) {
                     (0, n.warn)(`paste: "${t.message}".`);
                 }
             }
             keydown(t) {
                 this.isEditorHandlingKeyboard || AnnotationEditorUIManager._keyboardManager.exec(this, t);
             }
             onEditingAction(t) {
                 ["undo", "redo", "delete", "selectAll"].includes(t.name) && this[t.name]();
             }
             #Ds(t) {
                 Object.entries(t).some((t) => {
                     let [e, i] = t;
                     return this.#Es[e] !== i;
                 }) && this._eventBus.dispatch("annotationeditorstateschanged", { source: this, details: Object.assign(this.#Es, t) });
             }
             #Is(t) {
                 this._eventBus.dispatch("annotationeditorparamschanged", { source: this, details: t });
             }
             setEditingState(t) {
                 if (t) {
                     this.#Ts();
                     this.#Ps();
                     this.#Ms();
                     this.#Ds({ isEditing: this.#ls !== n.AnnotationEditorType.NONE, isEmpty: this.#Ls(), hasSomethingToUndo: this.#Xn.hasSomethingToUndo(), hasSomethingToRedo: this.#Xn.hasSomethingToRedo(), hasSelectedEditor: !1 });
                 } else {
                     this.#Cs();
                     this.#Ss();
                     this.#Rs();
                     this.#Ds({ isEditing: !1 });
                     this.disableUserSelect(!1);
                 }
             }
             registerEditorTypes(t) {
                 if (!this.#Ei) {
                     this.#Ei = t;
                     for (const t of this.#Ei) this.#Is(t.defaultPropertiesToUpdate);
                 }
             }
             getId() {
                 return this.#ns.getId();
             }
             get currentLayer() {
                 return this.#qn.get(this.#Yn);
             }
             getLayer(t) {
                 return this.#qn.get(t);
             }
             get currentPageIndex() {
                 return this.#Yn;
             }
             addLayer(t) {
                 this.#qn.set(t.pageIndex, t);
                 this.#ss ? t.enable() : t.disable();
             }
             removeLayer(t) {
                 this.#qn.delete(t.pageIndex);
             }
             updateMode(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                     i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                 if (this.#ls !== t) {
                     this.#ls = t;
                     if (t !== n.AnnotationEditorType.NONE) {
                         this.setEditingState(!0);
                         this.#Os();
                         this.unselectAll();
                         for (const e of this.#qn.values()) e.updateMode(t);
                         if (e || !i) {
                             if (e)
                                 for (const t of this.#Gn.values())
                                     if (t.annotationElementId === e) {
                                         this.setSelected(t);
                                         t.enterInEditMode();
                                         break;
                                     }
                         } else this.addNewEditorFromKeyboard();
                     } else {
                         this.setEditingState(!1);
                         this.#Bs();
                     }
                 }
             }
             addNewEditorFromKeyboard() {
                 this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
             }
             updateToolbar(t) {
                 t !== this.#ls && this._eventBus.dispatch("switchannotationeditormode", { source: this, mode: t });
             }
             updateParams(t, e) {
                 if (this.#Ei) {
                     switch (t) {
                         case n.AnnotationEditorParamsType.CREATE:
                             this.currentLayer.addNewEditor();
                             return;
                         case n.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
                             this.#os?.updateColor(e);
                     }
                     for (const i of this.#hs) i.updateParams(t, e);
                     for (const i of this.#Ei) i.updateDefaultParams(t, e);
                 }
             }
             enableWaiting() {
                 let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                 if (this.#rs !== t) {
                     this.#rs = t;
                     for (const e of this.#qn.values()) {
                         t ? e.disableClick() : e.enableClick();
                         e.div.classList.toggle("waiting", t);
                     }
                 }
             }
             #Os() {
                 if (!this.#ss) {
                     this.#ss = !0;
                     for (const t of this.#qn.values()) t.enable();
                 }
             }
             #Bs() {
                 this.unselectAll();
                 if (this.#ss) {
                     this.#ss = !1;
                     for (const t of this.#qn.values()) t.disable();
                 }
             }
             getEditors(t) {
                 const e = [];
                 for (const i of this.#Gn.values()) i.pageIndex === t && e.push(i);
                 return e;
             }
             getEditor(t) {
                 return this.#Gn.get(t);
             }
             addEditor(t) {
                 this.#Gn.set(t.id, t);
             }
             removeEditor(t) {
                 if (t.div.contains(document.activeElement)) {
                     this.#es && clearTimeout(this.#es);
                     this.#es = setTimeout(() => {
                         this.focusMainContainer();
                         this.#es = null;
                     }, 0);
                 }
                 this.#Gn.delete(t.id);
                 this.unselect(t);
                 (t.annotationElementId && this.#Jn.has(t.annotationElementId)) || this.#Kn?.remove(t.id);
             }
             addDeletedAnnotationElement(t) {
                 this.#Jn.add(t.annotationElementId);
                 t.deleted = !0;
             }
             isDeletedAnnotationElement(t) {
                 return this.#Jn.has(t);
             }
             removeDeletedAnnotationElement(t) {
                 this.#Jn.delete(t.annotationElementId);
                 t.deleted = !1;
             }
             #ks(t) {
                 const e = this.#qn.get(t.pageIndex);
                 e ? e.addOrRebuild(t) : this.addEditor(t);
             }
             setActiveEditor(t) {
                 if (this.#Wn !== t) {
                     this.#Wn = t;
                     t && this.#Is(t.propertiesToUpdate);
                 }
             }
             toggleSelected(t) {
                 if (this.#hs.has(t)) {
                     this.#hs.delete(t);
                     t.unselect();
                     this.#Ds({ hasSelectedEditor: this.hasSelection });
                 } else {
                     this.#hs.add(t);
                     t.select();
                     this.#Is(t.propertiesToUpdate);
                     this.#Ds({ hasSelectedEditor: !0 });
                 }
             }
             setSelected(t) {
                 for (const e of this.#hs) e !== t && e.unselect();
                 this.#hs.clear();
                 this.#hs.add(t);
                 t.select();
                 this.#Is(t.propertiesToUpdate);
                 this.#Ds({ hasSelectedEditor: !0 });
             }
             isSelected(t) {
                 return this.#hs.has(t);
             }
             get firstSelectedEditor() {
                 return this.#hs.values().next().value;
             }
             unselect(t) {
                 t.unselect();
                 this.#hs.delete(t);
                 this.#Ds({ hasSelectedEditor: this.hasSelection });
             }
             get hasSelection() {
                 return 0 !== this.#hs.size;
             }
             get isEnterHandled() {
                 return 1 === this.#hs.size && this.firstSelectedEditor.isEnterHandled;
             }
             undo() {
                 this.#Xn.undo();
                 this.#Ds({ hasSomethingToUndo: this.#Xn.hasSomethingToUndo(), hasSomethingToRedo: !0, isEmpty: this.#Ls() });
             }
             redo() {
                 this.#Xn.redo();
                 this.#Ds({ hasSomethingToUndo: !0, hasSomethingToRedo: this.#Xn.hasSomethingToRedo(), isEmpty: this.#Ls() });
             }
             addCommands(t) {
                 this.#Xn.add(t);
                 this.#Ds({ hasSomethingToUndo: !0, hasSomethingToRedo: !1, isEmpty: this.#Ls() });
             }
             #Ls() {
                 if (0 === this.#Gn.size) return !0;
                 if (1 === this.#Gn.size) for (const t of this.#Gn.values()) return t.isEmpty();
                 return !1;
             }
             delete() {
                 this.commitOrRemove();
                 if (!this.hasSelection) return;
                 const t = [...this.#hs];
                 this.addCommands({
                     cmd: () => {
                         for (const e of t) e.remove();
                     },
                     undo: () => {
                         for (const e of t) this.#ks(e);
                     },
                     mustExec: !0,
                 });
             }
             commitOrRemove() {
                 this.#Wn?.commitOrRemove();
             }
             hasSomethingToControl() {
                 return this.#Wn || this.hasSelection;
             }
             #Fs(t) {
                 this.#hs.clear();
                 for (const e of t)
                     if (!e.isEmpty()) {
                         this.#hs.add(e);
                         e.select();
                     }
                 this.#Ds({ hasSelectedEditor: !0 });
             }
             selectAll() {
                 for (const t of this.#hs) t.commit();
                 this.#Fs(this.#Gn.values());
             }
             unselectAll() {
                 if (this.#Wn) {
                     this.#Wn.commitOrRemove();
                     if (this.#ls !== n.AnnotationEditorType.NONE) return;
                 }
                 if (this.hasSelection) {
                     for (const t of this.#hs) t.unselect();
                     this.#hs.clear();
                     this.#Ds({ hasSelectedEditor: !1 });
                 }
             }
             translateSelectedEditors(t, e) {
                 (arguments.length > 2 && void 0 !== arguments[2] && arguments[2]) || this.commitOrRemove();
                 if (!this.hasSelection) return;
                 this.#ws[0] += t;
                 this.#ws[1] += e;
                 const [i, n] = this.#ws,
                     s = [...this.#hs];
                 this.#xs && clearTimeout(this.#xs);
                 this.#xs = setTimeout(() => {
                     this.#xs = null;
                     this.#ws[0] = this.#ws[1] = 0;
                     this.addCommands({
                         cmd: () => {
                             for (const t of s) this.#Gn.has(t.id) && t.translateInPage(i, n);
                         },
                         undo: () => {
                             for (const t of s) this.#Gn.has(t.id) && t.translateInPage(-i, -n);
                         },
                         mustExec: !1,
                     });
                 }, 1e3);
                 for (const i of s) i.translateInPage(t, e);
             }
             setUpDragSession() {
                 if (this.hasSelection) {
                     this.disableUserSelect(!0);
                     this.#Qn = new Map();
                     for (const t of this.#hs) this.#Qn.set(t, { savedX: t.x, savedY: t.y, savedPageIndex: t.pageIndex, newX: 0, newY: 0, newPageIndex: -1 });
                 }
             }
             endDragSession() {
                 if (!this.#Qn) return !1;
                 this.disableUserSelect(!1);
                 const t = this.#Qn;
                 this.#Qn = null;
                 let e = !1;
                 for (const [{ x: i, y: n, pageIndex: s }, r] of t) {
                     r.newX = i;
                     r.newY = n;
                     r.newPageIndex = s;
                     e ||= i !== r.savedX || n !== r.savedY || s !== r.savedPageIndex;
                 }
                 if (!e) return !1;
                 const move = (t, e, i, n) => {
                     if (this.#Gn.has(t.id)) {
                         const s = this.#qn.get(n);
                         if (s) t._setParentAndPosition(s, e, i);
                         else {
                             t.pageIndex = n;
                             t.x = e;
                             t.y = i;
                         }
                     }
                 };
                 this.addCommands({
                     cmd: () => {
                         for (const [e, { newX: i, newY: n, newPageIndex: s }] of t) move(e, i, n, s);
                     },
                     undo: () => {
                         for (const [e, { savedX: i, savedY: n, savedPageIndex: s }] of t) move(e, i, n, s);
                     },
                     mustExec: !0,
                 });
                 return !0;
             }
             dragSelectedEditors(t, e) {
                 if (this.#Qn) for (const i of this.#Qn.keys()) i.drag(t, e);
             }
             rebuild(t) {
                 if (null === t.parent) {
                     const e = this.getLayer(t.pageIndex);
                     if (e) {
                         e.changeParent(t);
                         e.addOrRebuild(t);
                     } else {
                         this.addEditor(t);
                         this.addToAnnotationStorage(t);
                         t.rebuild();
                     }
                 } else t.parent.addOrRebuild(t);
             }
             get isEditorHandlingKeyboard() {
                 return this.getActive()?.shouldGetKeyboardEvents() || (1 === this.#hs.size && this.firstSelectedEditor.shouldGetKeyboardEvents());
             }
             isActive(t) {
                 return this.#Wn === t;
             }
             getActive() {
                 return this.#Wn;
             }
             getMode() {
                 return this.#ls;
             }
             get imageManager() {
                 return (0, n.shadow)(this, "imageManager", new ImageManager());
             }
         }
     },
     5171: (t, e, i) => {
         i.d(e, { PDFFetchStream: () => PDFFetchStream });
         i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(4226);
         var n = i(3266),
             s = i(8253);
         function createFetchOptions(t, e, i) {
             return { method: "GET", headers: t, signal: i.signal, mode: "cors", credentials: e ? "include" : "same-origin", redirect: "follow" };
         }
         function createHeaders(t) {
             const e = new Headers();
             for (const i in t) {
                 const n = t[i];
                 void 0 !== n && e.append(i, n);
             }
             return e;
         }
         function getArrayBuffer(t) {
             if (t instanceof Uint8Array) return t.buffer;
             if (t instanceof ArrayBuffer) return t;
             (0, n.warn)(`getArrayBuffer - unexpected data format: ${t}`);
             return new Uint8Array(t).buffer;
         }
         class PDFFetchStream {
             constructor(t) {
                 this.source = t;
                 this.isHttp = /^https?:/i.test(t.url);
                 this.httpHeaders = (this.isHttp && t.httpHeaders) || {};
                 this._fullRequestReader = null;
                 this._rangeRequestReaders = [];
             }
             get _progressiveDataLength() {
                 return this._fullRequestReader?._loaded ?? 0;
             }
             getFullReader() {
                 (0, n.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
                 this._fullRequestReader = new PDFFetchStreamReader(this);
                 return this._fullRequestReader;
             }
             getRangeReader(t, e) {
                 if (e <= this._progressiveDataLength) return null;
                 const i = new PDFFetchStreamRangeReader(this, t, e);
                 this._rangeRequestReaders.push(i);
                 return i;
             }
             cancelAllRequests(t) {
                 this._fullRequestReader?.cancel(t);
                 for (const e of this._rangeRequestReaders.slice(0)) e.cancel(t);
             }
         }
         class PDFFetchStreamReader {
             constructor(t) {
                 this._stream = t;
                 this._reader = null;
                 this._loaded = 0;
                 this._filename = null;
                 const e = t.source;
                 this._withCredentials = e.withCredentials || !1;
                 this._contentLength = e.length;
                 this._headersCapability = new n.PromiseCapability();
                 this._disableRange = e.disableRange || !1;
                 this._rangeChunkSize = e.rangeChunkSize;
                 this._rangeChunkSize || this._disableRange || (this._disableRange = !0);
                 this._abortController = new AbortController();
                 this._isStreamingSupported = !e.disableStream;
                 this._isRangeSupported = !e.disableRange;
                 this._headers = createHeaders(this._stream.httpHeaders);
                 const i = e.url;
                 fetch(i, createFetchOptions(this._headers, this._withCredentials, this._abortController))
                     .then((t) => {
                         if (!(0, s.validateResponseStatus)(t.status)) throw (0, s.createResponseStatusError)(t.status, i);
                         this._reader = t.body.getReader();
                         this._headersCapability.resolve();
                         const getResponseHeader = (e) => t.headers.get(e),
                             { allowRangeRequests: e, suggestedLength: r } = (0, s.validateRangeRequestCapabilities)({
                                 getResponseHeader: getResponseHeader,
                                 isHttp: this._stream.isHttp,
                                 rangeChunkSize: this._rangeChunkSize,
                                 disableRange: this._disableRange,
                             });
                         this._isRangeSupported = e;
                         this._contentLength = r || this._contentLength;
                         this._filename = (0, s.extractFilenameFromHeader)(getResponseHeader);
                         !this._isStreamingSupported && this._isRangeSupported && this.cancel(new n.AbortException("Streaming is disabled."));
                     })
                     .catch(this._headersCapability.reject);
                 this.onProgress = null;
             }
             get headersReady() {
                 return this._headersCapability.promise;
             }
             get filename() {
                 return this._filename;
             }
             get contentLength() {
                 return this._contentLength;
             }
             get isRangeSupported() {
                 return this._isRangeSupported;
             }
             get isStreamingSupported() {
                 return this._isStreamingSupported;
             }
             async read() {
                 await this._headersCapability.promise;
                 const { value: t, done: e } = await this._reader.read();
                 if (e) return { value: t, done: e };
                 this._loaded += t.byteLength;
                 this.onProgress?.({ loaded: this._loaded, total: this._contentLength });
                 return { value: getArrayBuffer(t), done: !1 };
             }
             cancel(t) {
                 this._reader?.cancel(t);
                 this._abortController.abort();
             }
         }
         class PDFFetchStreamRangeReader {
             constructor(t, e, i) {
                 this._stream = t;
                 this._reader = null;
                 this._loaded = 0;
                 const r = t.source;
                 this._withCredentials = r.withCredentials || !1;
                 this._readCapability = new n.PromiseCapability();
                 this._isStreamingSupported = !r.disableStream;
                 this._abortController = new AbortController();
                 this._headers = createHeaders(this._stream.httpHeaders);
                 this._headers.append("Range", `bytes=${e}-${i - 1}`);
                 const a = r.url;
                 fetch(a, createFetchOptions(this._headers, this._withCredentials, this._abortController))
                     .then((t) => {
                         if (!(0, s.validateResponseStatus)(t.status)) throw (0, s.createResponseStatusError)(t.status, a);
                         this._readCapability.resolve();
                         this._reader = t.body.getReader();
                     })
                     .catch(this._readCapability.reject);
                 this.onProgress = null;
             }
             get isStreamingSupported() {
                 return this._isStreamingSupported;
             }
             async read() {
                 await this._readCapability.promise;
                 const { value: t, done: e } = await this._reader.read();
                 if (e) return { value: t, done: e };
                 this._loaded += t.byteLength;
                 this.onProgress?.({ loaded: this._loaded });
                 return { value: getArrayBuffer(t), done: !1 };
             }
             cancel(t) {
                 this._reader?.cancel(t);
                 this._abortController.abort();
             }
         }
     },
     3742: (t, e, i) => {
         i.d(e, { FontFaceObject: () => FontFaceObject, FontLoader: () => FontLoader });
         i(5561), i(8587), i(3247), i(3302), i(9490), i(5438), i(7914), i(4226), i(9709);
         var n = i(3266);
         class FontLoader {
             #Ns = new Set();
             constructor(t) {
                 let { ownerDocument: e = globalThis.document, styleElement: i = null } = t;
                 this._document = e;
                 this.nativeFontFaces = new Set();
                 this.styleElement = null;
                 this.loadingRequests = [];
                 this.loadTestFontId = 0;
             }
             addNativeFontFace(t) {
                 this.nativeFontFaces.add(t);
                 this._document.fonts.add(t);
             }
             removeNativeFontFace(t) {
                 this.nativeFontFaces.delete(t);
                 this._document.fonts.delete(t);
             }
             insertRule(t) {
                 if (!this.styleElement) {
                     this.styleElement = this._document.createElement("style");
                     this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement);
                 }
                 const e = this.styleElement.sheet;
                 e.insertRule(t, e.cssRules.length);
             }
             clear() {
                 for (const t of this.nativeFontFaces) this._document.fonts.delete(t);
                 this.nativeFontFaces.clear();
                 this.#Ns.clear();
                 if (this.styleElement) {
                     this.styleElement.remove();
                     this.styleElement = null;
                 }
             }
             async loadSystemFont(t) {
                 let { systemFontInfo: e, _inspectFont: i } = t;
                 if (e && !this.#Ns.has(e.loadedName)) {
                     (0, n.assert)(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set.");
                     if (this.isFontLoadingAPISupported) {
                         const { loadedName: t, src: s, style: r } = e,
                             a = new FontFace(t, s, r);
                         this.addNativeFontFace(a);
                         try {
                             await a.load();
                             this.#Ns.add(t);
                             i?.(e);
                         } catch {
                             (0, n.warn)(`Cannot load system font: ${e.baseFontName}, installing it could help to improve PDF rendering.`);
                             this.removeNativeFontFace(a);
                         }
                     } else (0, n.unreachable)("Not implemented: loadSystemFont without the Font Loading API.");
                 }
             }
             async bind(t) {
                 if (t.attached || (t.missingFile && !t.systemFontInfo)) return;
                 t.attached = !0;
                 if (t.systemFontInfo) {
                     await this.loadSystemFont(t);
                     return;
                 }
                 if (this.isFontLoadingAPISupported) {
                     const e = t.createNativeFontFace();
                     if (e) {
                         this.addNativeFontFace(e);
                         try {
                             await e.loaded;
                         } catch (i) {
                             (0, n.warn)(`Failed to load font '${e.family}': '${i}'.`);
                             t.disableFontFace = !0;
                             throw i;
                         }
                     }
                     return;
                 }
                 const e = t.createFontFaceRule();
                 if (e) {
                     this.insertRule(e);
                     if (this.isSyncFontLoadingSupported) return;
                     await new Promise((e) => {
                         const i = this._queueLoadingCallback(e);
                         this._prepareFontLoadEvent(t, i);
                     });
                 }
             }
             get isFontLoadingAPISupported() {
                 const t = !!this._document?.fonts;
                 return (0, n.shadow)(this, "isFontLoadingAPISupported", t);
             }
             get isSyncFontLoadingSupported() {
                 let t = !1;
                 (n.isNodeJS || ("undefined" != typeof navigator && "string" == typeof navigator?.userAgent && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent))) && (t = !0);
                 return (0, n.shadow)(this, "isSyncFontLoadingSupported", t);
             }
             _queueLoadingCallback(t) {
                 const { loadingRequests: e } = this,
                     i = {
                         done: !1,
                         complete: function completeRequest() {
                             (0, n.assert)(!i.done, "completeRequest() cannot be called twice.");
                             i.done = !0;
                             for (; e.length > 0 && e[0].done; ) {
                                 const t = e.shift();
                                 setTimeout(t.callback, 0);
                             }
                         },
                         callback: t,
                     };
                 e.push(i);
                 return i;
             }
             get _loadTestFont() {
                 const t = atob(
                     "T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="
                 );
                 return (0, n.shadow)(this, "_loadTestFont", t);
             }
             _prepareFontLoadEvent(t, e) {
                 function int32(t, e) {
                     return (t.charCodeAt(e) << 24) | (t.charCodeAt(e + 1) << 16) | (t.charCodeAt(e + 2) << 8) | (255 & t.charCodeAt(e + 3));
                 }
                 function spliceString(t, e, i, n) {
                     return t.substring(0, e) + n + t.substring(e + i);
                 }
                 let i, s;
                 const r = this._document.createElement("canvas");
                 r.width = 1;
                 r.height = 1;
                 const a = r.getContext("2d");
                 let o = 0;
                 const l = `lt${Date.now()}${this.loadTestFontId++}`;
                 let h = this._loadTestFont;
                 h = spliceString(h, 976, l.length, l);
                 const c = 1482184792;
                 let d = int32(h, 16);
                 for (i = 0, s = l.length - 3; i < s; i += 4) d = (d - c + int32(l, i)) | 0;
                 i < l.length && (d = (d - c + int32(l + "XXX", i)) | 0);
                 h = spliceString(h, 16, 4, (0, n.string32)(d));
                 const u = `@font-face {font-family:"${l}";src:${`url(data:font/opentype;base64,${btoa(h)});`}}`;
                 this.insertRule(u);
                 const p = this._document.createElement("div");
                 p.style.visibility = "hidden";
                 p.style.width = p.style.height = "10px";
                 p.style.position = "absolute";
                 p.style.top = p.style.left = "0px";
                 for (const e of [t.loadedName, l]) {
                     const t = this._document.createElement("span");
                     t.textContent = "Hi";
                     t.style.fontFamily = e;
                     p.append(t);
                 }
                 this._document.body.append(p);
                 !(function isFontReady(t, e) {
                     if (++o > 30) {
                         (0, n.warn)("Load test font never loaded.");
                         e();
                         return;
                     }
                     a.font = "30px " + t;
                     a.fillText(".", 0, 20);
                     a.getImageData(0, 0, 1, 1).data[3] > 0 ? e() : setTimeout(isFontReady.bind(null, t, e));
                 })(l, () => {
                     p.remove();
                     e.complete();
                 });
             }
         }
         class FontFaceObject {
             constructor(t, e) {
                 let { isEvalSupported: i = !0, disableFontFace: n = !1, ignoreErrors: s = !1, inspectFont: r = null } = e;
                 this.compiledGlyphs = Object.create(null);
                 for (const e in t) this[e] = t[e];
                 this.isEvalSupported = !1 !== i;
                 this.disableFontFace = !0 === n;
                 this.ignoreErrors = !0 === s;
                 this._inspectFont = r;
             }
             createNativeFontFace() {
                 if (!this.data || this.disableFontFace) return null;
                 let t;
                 if (this.cssFontInfo) {
                     const e = { weight: this.cssFontInfo.fontWeight };
                     this.cssFontInfo.italicAngle && (e.style = `oblique ${this.cssFontInfo.italicAngle}deg`);
                     t = new FontFace(this.cssFontInfo.fontFamily, this.data, e);
                 } else t = new FontFace(this.loadedName, this.data, {});
                 this._inspectFont?.(this);
                 return t;
             }
             createFontFaceRule() {
                 if (!this.data || this.disableFontFace) return null;
                 const t = (0, n.bytesToString)(this.data),
                     e = `url(data:${this.mimetype};base64,${btoa(t)});`;
                 let i;
                 if (this.cssFontInfo) {
                     let t = `font-weight: ${this.cssFontInfo.fontWeight};`;
                     this.cssFontInfo.italicAngle && (t += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`);
                     i = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${t}src:${e}}`;
                 } else i = `@font-face {font-family:"${this.loadedName}";src:${e}}`;
                 this._inspectFont?.(this, e);
                 return i;
             }
             getPathGenerator(t, e) {
                 if (void 0 !== this.compiledGlyphs[e]) return this.compiledGlyphs[e];
                 let i;
                 try {
                     i = t.get(this.loadedName + "_path_" + e);
                 } catch (t) {
                     if (!this.ignoreErrors) throw t;
                     (0, n.warn)(`getPathGenerator - ignoring character: "${t}".`);
                     return (this.compiledGlyphs[e] = function (t, e) {});
                 }
                 if (this.isEvalSupported && n.FeatureTest.isEvalSupported) {
                     const t = [];
                     for (const e of i) {
                         const i = void 0 !== e.args ? e.args.join(",") : "";
                         t.push("c.", e.cmd, "(", i, ");\n");
                     }
                     return (this.compiledGlyphs[e] = new Function("c", "size", t.join("")));
                 }
                 return (this.compiledGlyphs[e] = function (t, e) {
                     for (const n of i) {
                         "scale" === n.cmd && (n.args = [e, -e]);
                         t[n.cmd].apply(t, n.args);
                     }
                 });
             }
         }
     },
     3472: (t, e, i) => {
         i.d(e, { Metadata: () => Metadata });
         var n = i(3266);
         class Metadata {
             #Us;
             #zs;
             constructor(t) {
                 let { parsedData: e, rawData: i } = t;
                 this.#Us = e;
                 this.#zs = i;
             }
             getRaw() {
                 return this.#zs;
             }
             get(t) {
                 return this.#Us.get(t) ?? null;
             }
             getAll() {
                 return (0, n.objectFromMap)(this.#Us);
             }
             has(t) {
                 return this.#Us.has(t);
             }
         }
     },
     3474: (t, e, i) => {
         i.d(e, { PDFNetworkStream: () => PDFNetworkStream });
         i(4226);
         var n = i(3266),
             s = i(8253);
         class NetworkManager {
             constructor(t) {
                 let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                 this.url = t;
                 this.isHttp = /^https?:/i.test(t);
                 this.httpHeaders = (this.isHttp && e.httpHeaders) || Object.create(null);
                 this.withCredentials = e.withCredentials || !1;
                 this.currXhrId = 0;
                 this.pendingRequests = Object.create(null);
             }
             requestRange(t, e, i) {
                 const n = { begin: t, end: e };
                 for (const t in i) n[t] = i[t];
                 return this.request(n);
             }
             requestFull(t) {
                 return this.request(t);
             }
             request(t) {
                 const e = new XMLHttpRequest(),
                     i = this.currXhrId++,
                     n = (this.pendingRequests[i] = { xhr: e });
                 e.open("GET", this.url);
                 e.withCredentials = this.withCredentials;
                 for (const t in this.httpHeaders) {
                     const i = this.httpHeaders[t];
                     void 0 !== i && e.setRequestHeader(t, i);
                 }
                 if (this.isHttp && "begin" in t && "end" in t) {
                     e.setRequestHeader("Range", `bytes=${t.begin}-${t.end - 1}`);
                     n.expectedStatus = 206;
                 } else n.expectedStatus = 200;
                 e.responseType = "arraybuffer";
                 t.onError &&
                     (e.onerror = function (i) {
                         t.onError(e.status);
                     });
                 e.onreadystatechange = this.onStateChange.bind(this, i);
                 e.onprogress = this.onProgress.bind(this, i);
                 n.onHeadersReceived = t.onHeadersReceived;
                 n.onDone = t.onDone;
                 n.onError = t.onError;
                 n.onProgress = t.onProgress;
                 e.send(null);
                 return i;
             }
             onProgress(t, e) {
                 const i = this.pendingRequests[t];
                 i && i.onProgress?.(e);
             }
             onStateChange(t, e) {
                 const i = this.pendingRequests[t];
                 if (!i) return;
                 const s = i.xhr;
                 if (s.readyState >= 2 && i.onHeadersReceived) {
                     i.onHeadersReceived();
                     delete i.onHeadersReceived;
                 }
                 if (4 !== s.readyState) return;
                 if (!(t in this.pendingRequests)) return;
                 delete this.pendingRequests[t];
                 if (0 === s.status && this.isHttp) {
                     i.onError?.(s.status);
                     return;
                 }
                 const r = s.status || 200;
                 if (!(200 === r && 206 === i.expectedStatus) && r !== i.expectedStatus) {
                     i.onError?.(s.status);
                     return;
                 }
                 const a = (function getArrayBuffer(t) {
                     const e = t.response;
                     return "string" != typeof e ? e : (0, n.stringToBytes)(e).buffer;
                 })(s);
                 if (206 === r) {
                     const t = s.getResponseHeader("Content-Range"),
                         e = /bytes (\d+)-(\d+)\/(\d+)/.exec(t);
                     i.onDone({ begin: parseInt(e[1], 10), chunk: a });
                 } else a ? i.onDone({ begin: 0, chunk: a }) : i.onError?.(s.status);
             }
             getRequestXhr(t) {
                 return this.pendingRequests[t].xhr;
             }
             isPendingRequest(t) {
                 return t in this.pendingRequests;
             }
             abortRequest(t) {
                 const e = this.pendingRequests[t].xhr;
                 delete this.pendingRequests[t];
                 e.abort();
             }
         }
         class PDFNetworkStream {
             constructor(t) {
                 this._source = t;
                 this._manager = new NetworkManager(t.url, { httpHeaders: t.httpHeaders, withCredentials: t.withCredentials });
                 this._rangeChunkSize = t.rangeChunkSize;
                 this._fullRequestReader = null;
                 this._rangeRequestReaders = [];
             }
             _onRangeRequestReaderClosed(t) {
                 const e = this._rangeRequestReaders.indexOf(t);
                 e >= 0 && this._rangeRequestReaders.splice(e, 1);
             }
             getFullReader() {
                 (0, n.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
                 this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
                 return this._fullRequestReader;
             }
             getRangeReader(t, e) {
                 const i = new PDFNetworkStreamRangeRequestReader(this._manager, t, e);
                 i.onClosed = this._onRangeRequestReaderClosed.bind(this);
                 this._rangeRequestReaders.push(i);
                 return i;
             }
             cancelAllRequests(t) {
                 this._fullRequestReader?.cancel(t);
                 for (const e of this._rangeRequestReaders.slice(0)) e.cancel(t);
             }
         }
         class PDFNetworkStreamFullRequestReader {
             constructor(t, e) {
                 this._manager = t;
                 const i = { onHeadersReceived: this._onHeadersReceived.bind(this), onDone: this._onDone.bind(this), onError: this._onError.bind(this), onProgress: this._onProgress.bind(this) };
                 this._url = e.url;
                 this._fullRequestId = t.requestFull(i);
                 this._headersReceivedCapability = new n.PromiseCapability();
                 this._disableRange = e.disableRange || !1;
                 this._contentLength = e.length;
                 this._rangeChunkSize = e.rangeChunkSize;
                 this._rangeChunkSize || this._disableRange || (this._disableRange = !0);
                 this._isStreamingSupported = !1;
                 this._isRangeSupported = !1;
                 this._cachedChunks = [];
                 this._requests = [];
                 this._done = !1;
                 this._storedError = void 0;
                 this._filename = null;
                 this.onProgress = null;
             }
             _onHeadersReceived() {
                 const t = this._fullRequestId,
                     e = this._manager.getRequestXhr(t),
                     getResponseHeader = (t) => e.getResponseHeader(t),
                     { allowRangeRequests: i, suggestedLength: n } = (0, s.validateRangeRequestCapabilities)({
                         getResponseHeader: getResponseHeader,
                         isHttp: this._manager.isHttp,
                         rangeChunkSize: this._rangeChunkSize,
                         disableRange: this._disableRange,
                     });
                 i && (this._isRangeSupported = !0);
                 this._contentLength = n || this._contentLength;
                 this._filename = (0, s.extractFilenameFromHeader)(getResponseHeader);
                 this._isRangeSupported && this._manager.abortRequest(t);
                 this._headersReceivedCapability.resolve();
             }
             _onDone(t) {
                 if (t)
                     if (this._requests.length > 0) {
                         this._requests.shift().resolve({ value: t.chunk, done: !1 });
                     } else this._cachedChunks.push(t.chunk);
                 this._done = !0;
                 if (!(this._cachedChunks.length > 0)) {
                     for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                     this._requests.length = 0;
                 }
             }
             _onError(t) {
                 this._storedError = (0, s.createResponseStatusError)(t, this._url);
                 this._headersReceivedCapability.reject(this._storedError);
                 for (const t of this._requests) t.reject(this._storedError);
                 this._requests.length = 0;
                 this._cachedChunks.length = 0;
             }
             _onProgress(t) {
                 this.onProgress?.({ loaded: t.loaded, total: t.lengthComputable ? t.total : this._contentLength });
             }
             get filename() {
                 return this._filename;
             }
             get isRangeSupported() {
                 return this._isRangeSupported;
             }
             get isStreamingSupported() {
                 return this._isStreamingSupported;
             }
             get contentLength() {
                 return this._contentLength;
             }
             get headersReady() {
                 return this._headersReceivedCapability.promise;
             }
             async read() {
                 if (this._storedError) throw this._storedError;
                 if (this._cachedChunks.length > 0) {
                     return { value: this._cachedChunks.shift(), done: !1 };
                 }
                 if (this._done) return { value: void 0, done: !0 };
                 const t = new n.PromiseCapability();
                 this._requests.push(t);
                 return t.promise;
             }
             cancel(t) {
                 this._done = !0;
                 this._headersReceivedCapability.reject(t);
                 for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                 this._requests.length = 0;
                 this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId);
                 this._fullRequestReader = null;
             }
         }
         class PDFNetworkStreamRangeRequestReader {
             constructor(t, e, i) {
                 this._manager = t;
                 const n = { onDone: this._onDone.bind(this), onError: this._onError.bind(this), onProgress: this._onProgress.bind(this) };
                 this._url = t.url;
                 this._requestId = t.requestRange(e, i, n);
                 this._requests = [];
                 this._queuedChunk = null;
                 this._done = !1;
                 this._storedError = void 0;
                 this.onProgress = null;
                 this.onClosed = null;
             }
             _close() {
                 this.onClosed?.(this);
             }
             _onDone(t) {
                 const e = t.chunk;
                 if (this._requests.length > 0) {
                     this._requests.shift().resolve({ value: e, done: !1 });
                 } else this._queuedChunk = e;
                 this._done = !0;
                 for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                 this._requests.length = 0;
                 this._close();
             }
             _onError(t) {
                 this._storedError = (0, s.createResponseStatusError)(t, this._url);
                 for (const t of this._requests) t.reject(this._storedError);
                 this._requests.length = 0;
                 this._queuedChunk = null;
             }
             _onProgress(t) {
                 this.isStreamingSupported || this.onProgress?.({ loaded: t.loaded });
             }
             get isStreamingSupported() {
                 return !1;
             }
             async read() {
                 if (this._storedError) throw this._storedError;
                 if (null !== this._queuedChunk) {
                     const t = this._queuedChunk;
                     this._queuedChunk = null;
                     return { value: t, done: !1 };
                 }
                 if (this._done) return { value: void 0, done: !0 };
                 const t = new n.PromiseCapability();
                 this._requests.push(t);
                 return t.promise;
             }
             cancel(t) {
                 this._done = !0;
                 for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                 this._requests.length = 0;
                 this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId);
                 this._close();
             }
         }
     },
     8253: (t, e, i) => {
         i.d(e, {
             createResponseStatusError: () => createResponseStatusError,
             extractFilenameFromHeader: () => extractFilenameFromHeader,
             validateRangeRequestCapabilities: () => validateRangeRequestCapabilities,
             validateResponseStatus: () => validateResponseStatus,
         });
         var n = i(3266);
         i(4226), i(9709);
         var s = i(473);
         function validateRangeRequestCapabilities(t) {
             let { getResponseHeader: e, isHttp: i, rangeChunkSize: n, disableRange: s } = t;
             const r = { allowRangeRequests: !1, suggestedLength: void 0 },
                 a = parseInt(e("Content-Length"), 10);
             if (!Number.isInteger(a)) return r;
             r.suggestedLength = a;
             if (a <= 2 * n) return r;
             if (s || !i) return r;
             if ("bytes" !== e("Accept-Ranges")) return r;
             if ("identity" !== (e("Content-Encoding") || "identity")) return r;
             r.allowRangeRequests = !0;
             return r;
         }
         function extractFilenameFromHeader(t) {
             const e = t("Content-Disposition");
             if (e) {
                 let t = (function getFilenameFromContentDispositionHeader(t) {
                     let e = !0,
                         i = toParamRegExp("filename\\*", "i").exec(t);
                     if (i) {
                         i = i[1];
                         let t = rfc2616unquote(i);
                         t = unescape(t);
                         t = rfc5987decode(t);
                         t = rfc2047decode(t);
                         return fixupEncoding(t);
                     }
                     i = (function rfc2231getparam(t) {
                         const e = [];
                         let i;
                         const n = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
                         for (; null !== (i = n.exec(t)); ) {
                             let [, t, n, s] = i;
                             t = parseInt(t, 10);
                             if (t in e) {
                                 if (0 === t) break;
                             } else e[t] = [n, s];
                         }
                         const s = [];
                         for (let t = 0; t < e.length && t in e; ++t) {
                             let [i, n] = e[t];
                             n = rfc2616unquote(n);
                             if (i) {
                                 n = unescape(n);
                                 0 === t && (n = rfc5987decode(n));
                             }
                             s.push(n);
                         }
                         return s.join("");
                     })(t);
                     if (i) return fixupEncoding(rfc2047decode(i));
                     i = toParamRegExp("filename", "i").exec(t);
                     if (i) {
                         i = i[1];
                         let t = rfc2616unquote(i);
                         t = rfc2047decode(t);
                         return fixupEncoding(t);
                     }
                     function toParamRegExp(t, e) {
                         return new RegExp("(?:^|;)\\s*" + t + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', e);
                     }
                     function textdecode(t, i) {
                         if (t) {
                             if (!/^[\x00-\xFF]+$/.test(i)) return i;
                             try {
                                 const s = new TextDecoder(t, { fatal: !0 }),
                                     r = (0, n.stringToBytes)(i);
                                 i = s.decode(r);
                                 e = !1;
                             } catch {}
                         }
                         return i;
                     }
                     function fixupEncoding(t) {
                         if (e && /[\x80-\xff]/.test(t)) {
                             t = textdecode("utf-8", t);
                             e && (t = textdecode("iso-8859-1", t));
                         }
                         return t;
                     }
                     function rfc2616unquote(t) {
                         if (t.startsWith('"')) {
                             const e = t.slice(1).split('\\"');
                             for (let t = 0; t < e.length; ++t) {
                                 const i = e[t].indexOf('"');
                                 if (-1 !== i) {
                                     e[t] = e[t].slice(0, i);
                                     e.length = t + 1;
                                 }
                                 e[t] = e[t].replaceAll(/\\(.)/g, "$1");
                             }
                             t = e.join('"');
                         }
                         return t;
                     }
                     function rfc5987decode(t) {
                         const e = t.indexOf("'");
                         return -1 === e ? t : textdecode(t.slice(0, e), t.slice(e + 1).replace(/^[^']*'/, ""));
                     }
                     function rfc2047decode(t) {
                         return !t.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(t)
                             ? t
                             : t.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function (t, e, i, n) {
                                   if ("q" === i || "Q" === i)
                                       return textdecode(
                                           e,
                                           (n = (n = n.replaceAll("_", " ")).replaceAll(/=([0-9a-fA-F]{2})/g, function (t, e) {
                                               return String.fromCharCode(parseInt(e, 16));
                                           }))
                                       );
                                   try {
                                       n = atob(n);
                                   } catch {}
                                   return textdecode(e, n);
                               });
                     }
                     return "";
                 })(e);
                 if (t.includes("%"))
                     try {
                         t = decodeURIComponent(t);
                     } catch {}
                 if ((0, s.isPdfFile)(t)) return t;
             }
             return null;
         }
         function createResponseStatusError(t, e) {
             return 404 === t || (0 === t && e.startsWith("file:")) ? new n.MissingPDFException('Missing PDF "' + e + '".') : new n.UnexpectedResponseException(`Unexpected server response (${t}) while retrieving PDF "${e}".`, t);
         }
         function validateResponseStatus(t) {
             return 200 === t || 206 === t;
         }
     },
     3498: (t, e, i) => {
         i.a(
             t,
             async (t, n) => {
                 try {
                     i.d(e, { PDFNodeStream: () => PDFNodeStream });
                     i(4226), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583);
                     var s = i(3266),
                         r = i(8253);
                     let a, o, l, h;
                     if (s.isNodeJS) {
                         a = await import("fs");
                         o = await import("http");
                         l = await import("https");
                         h = await import("url");
                     }
                     const c = /^file:\/\/\/[a-zA-Z]:\//;
                     function parseUrl(t) {
                         const e = h.parse(t);
                         if ("file:" === e.protocol || e.host) return e;
                         if (/^[a-z]:[/\\]/i.test(t)) return h.parse(`file:///${t}`);
                         e.host || (e.protocol = "file:");
                         return e;
                     }
                     class PDFNodeStream {
                         constructor(t) {
                             this.source = t;
                             this.url = parseUrl(t.url);
                             this.isHttp = "http:" === this.url.protocol || "https:" === this.url.protocol;
                             this.isFsUrl = "file:" === this.url.protocol;
                             this.httpHeaders = (this.isHttp && t.httpHeaders) || {};
                             this._fullRequestReader = null;
                             this._rangeRequestReaders = [];
                         }
                         get _progressiveDataLength() {
                             return this._fullRequestReader?._loaded ?? 0;
                         }
                         getFullReader() {
                             (0, s.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
                             this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
                             return this._fullRequestReader;
                         }
                         getRangeReader(t, e) {
                             if (e <= this._progressiveDataLength) return null;
                             const i = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, t, e) : new PDFNodeStreamRangeReader(this, t, e);
                             this._rangeRequestReaders.push(i);
                             return i;
                         }
                         cancelAllRequests(t) {
                             this._fullRequestReader?.cancel(t);
                             for (const e of this._rangeRequestReaders.slice(0)) e.cancel(t);
                         }
                     }
                     class BaseFullReader {
                         constructor(t) {
                             this._url = t.url;
                             this._done = !1;
                             this._storedError = null;
                             this.onProgress = null;
                             const e = t.source;
                             this._contentLength = e.length;
                             this._loaded = 0;
                             this._filename = null;
                             this._disableRange = e.disableRange || !1;
                             this._rangeChunkSize = e.rangeChunkSize;
                             this._rangeChunkSize || this._disableRange || (this._disableRange = !0);
                             this._isStreamingSupported = !e.disableStream;
                             this._isRangeSupported = !e.disableRange;
                             this._readableStream = null;
                             this._readCapability = new s.PromiseCapability();
                             this._headersCapability = new s.PromiseCapability();
                         }
                         get headersReady() {
                             return this._headersCapability.promise;
                         }
                         get filename() {
                             return this._filename;
                         }
                         get contentLength() {
                             return this._contentLength;
                         }
                         get isRangeSupported() {
                             return this._isRangeSupported;
                         }
                         get isStreamingSupported() {
                             return this._isStreamingSupported;
                         }
                         async read() {
                             await this._readCapability.promise;
                             if (this._done) return { value: void 0, done: !0 };
                             if (this._storedError) throw this._storedError;
                             const t = this._readableStream.read();
                             if (null === t) {
                                 this._readCapability = new s.PromiseCapability();
                                 return this.read();
                             }
                             this._loaded += t.length;
                             this.onProgress?.({ loaded: this._loaded, total: this._contentLength });
                             return { value: new Uint8Array(t).buffer, done: !1 };
                         }
                         cancel(t) {
                             this._readableStream ? this._readableStream.destroy(t) : this._error(t);
                         }
                         _error(t) {
                             this._storedError = t;
                             this._readCapability.resolve();
                         }
                         _setReadableStream(t) {
                             this._readableStream = t;
                             t.on("readable", () => {
                                 this._readCapability.resolve();
                             });
                             t.on("end", () => {
                                 t.destroy();
                                 this._done = !0;
                                 this._readCapability.resolve();
                             });
                             t.on("error", (t) => {
                                 this._error(t);
                             });
                             !this._isStreamingSupported && this._isRangeSupported && this._error(new s.AbortException("streaming is disabled"));
                             this._storedError && this._readableStream.destroy(this._storedError);
                         }
                     }
                     class BaseRangeReader {
                         constructor(t) {
                             this._url = t.url;
                             this._done = !1;
                             this._storedError = null;
                             this.onProgress = null;
                             this._loaded = 0;
                             this._readableStream = null;
                             this._readCapability = new s.PromiseCapability();
                             const e = t.source;
                             this._isStreamingSupported = !e.disableStream;
                         }
                         get isStreamingSupported() {
                             return this._isStreamingSupported;
                         }
                         async read() {
                             await this._readCapability.promise;
                             if (this._done) return { value: void 0, done: !0 };
                             if (this._storedError) throw this._storedError;
                             const t = this._readableStream.read();
                             if (null === t) {
                                 this._readCapability = new s.PromiseCapability();
                                 return this.read();
                             }
                             this._loaded += t.length;
                             this.onProgress?.({ loaded: this._loaded });
                             return { value: new Uint8Array(t).buffer, done: !1 };
                         }
                         cancel(t) {
                             this._readableStream ? this._readableStream.destroy(t) : this._error(t);
                         }
                         _error(t) {
                             this._storedError = t;
                             this._readCapability.resolve();
                         }
                         _setReadableStream(t) {
                             this._readableStream = t;
                             t.on("readable", () => {
                                 this._readCapability.resolve();
                             });
                             t.on("end", () => {
                                 t.destroy();
                                 this._done = !0;
                                 this._readCapability.resolve();
                             });
                             t.on("error", (t) => {
                                 this._error(t);
                             });
                             this._storedError && this._readableStream.destroy(this._storedError);
                         }
                     }
                     function createRequestOptions(t, e) {
                         return { protocol: t.protocol, auth: t.auth, host: t.hostname, port: t.port, path: t.path, method: "GET", headers: e };
                     }
                     class PDFNodeStreamFullReader extends BaseFullReader {
                         constructor(t) {
                             super(t);
                             const handleResponse = (e) => {
                                 if (404 === e.statusCode) {
                                     const t = new s.MissingPDFException(`Missing PDF "${this._url}".`);
                                     this._storedError = t;
                                     this._headersCapability.reject(t);
                                     return;
                                 }
                                 this._headersCapability.resolve();
                                 this._setReadableStream(e);
                                 const getResponseHeader = (t) => this._readableStream.headers[t.toLowerCase()],
                                     { allowRangeRequests: i, suggestedLength: n } = (0, r.validateRangeRequestCapabilities)({
                                         getResponseHeader: getResponseHeader,
                                         isHttp: t.isHttp,
                                         rangeChunkSize: this._rangeChunkSize,
                                         disableRange: this._disableRange,
                                     });
                                 this._isRangeSupported = i;
                                 this._contentLength = n || this._contentLength;
                                 this._filename = (0, r.extractFilenameFromHeader)(getResponseHeader);
                             };
                             this._request = null;
                             "http:" === this._url.protocol
                                 ? (this._request = o.request(createRequestOptions(this._url, t.httpHeaders), handleResponse))
                                 : (this._request = l.request(createRequestOptions(this._url, t.httpHeaders), handleResponse));
                             this._request.on("error", (t) => {
                                 this._storedError = t;
                                 this._headersCapability.reject(t);
                             });
                             this._request.end();
                         }
                     }
                     class PDFNodeStreamRangeReader extends BaseRangeReader {
                         constructor(t, e, i) {
                             super(t);
                             this._httpHeaders = {};
                             for (const e in t.httpHeaders) {
                                 const i = t.httpHeaders[e];
                                 void 0 !== i && (this._httpHeaders[e] = i);
                             }
                             this._httpHeaders.Range = `bytes=${e}-${i - 1}`;
                             const handleResponse = (t) => {
                                 if (404 !== t.statusCode) this._setReadableStream(t);
                                 else {
                                     const t = new s.MissingPDFException(`Missing PDF "${this._url}".`);
                                     this._storedError = t;
                                 }
                             };
                             this._request = null;
                             "http:" === this._url.protocol
                                 ? (this._request = o.request(createRequestOptions(this._url, this._httpHeaders), handleResponse))
                                 : (this._request = l.request(createRequestOptions(this._url, this._httpHeaders), handleResponse));
                             this._request.on("error", (t) => {
                                 this._storedError = t;
                             });
                             this._request.end();
                         }
                     }
                     class PDFNodeStreamFsFullReader extends BaseFullReader {
                         constructor(t) {
                             super(t);
                             let e = decodeURIComponent(this._url.path);
                             c.test(this._url.href) && (e = e.replace(/^\//, ""));
                             a.lstat(e, (t, i) => {
                                 if (t) {
                                     "ENOENT" === t.code && (t = new s.MissingPDFException(`Missing PDF "${e}".`));
                                     this._storedError = t;
                                     this._headersCapability.reject(t);
                                 } else {
                                     this._contentLength = i.size;
                                     this._setReadableStream(a.createReadStream(e));
                                     this._headersCapability.resolve();
                                 }
                             });
                         }
                     }
                     class PDFNodeStreamFsRangeReader extends BaseRangeReader {
                         constructor(t, e, i) {
                             super(t);
                             let n = decodeURIComponent(this._url.path);
                             c.test(this._url.href) && (n = n.replace(/^\//, ""));
                             this._setReadableStream(a.createReadStream(n, { start: e, end: i - 1 }));
                         }
                     }
                     n();
                 } catch (d) {
                     n(d);
                 }
             },
             1
         );
     },
     7738: (t, e, i) => {
         i.a(
             t,
             async (t, n) => {
                 try {
                     i.d(e, { NodeCMapReaderFactory: () => NodeCMapReaderFactory, NodeCanvasFactory: () => NodeCanvasFactory, NodeFilterFactory: () => NodeFilterFactory, NodeStandardFontDataFactory: () => NodeStandardFontDataFactory });
                     i(3352), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583);
                     var s = i(6822),
                         r = i(3266);
                     let t, a, o;
                     if (r.isNodeJS) {
                         t = await import("fs");
                         try {
                             a = await import("canvas");
                         } catch {}
                         try {
                             o = await import("path2d-polyfill");
                         } catch {}
                     }
                     !(function checkDOMMatrix() {
                         if (globalThis.DOMMatrix || !r.isNodeJS) return;
                         const t = a?.DOMMatrix;
                         t ? (globalThis.DOMMatrix = t) : (0, r.warn)("Cannot polyfill `DOMMatrix`, rendering may be broken.");
                     })();
                     !(function checkPath2D() {
                         if (globalThis.Path2D || !r.isNodeJS) return;
                         const t = a?.CanvasRenderingContext2D,
                             e = o?.polyfillPath2D;
                         if (t && e) {
                             globalThis.CanvasRenderingContext2D = t;
                             e(globalThis);
                         } else (0, r.warn)("Cannot polyfill `Path2D`, rendering may be broken.");
                     })();
                     const fetchData = function (e) {
                         return new Promise((i, n) => {
                             t.readFile(e, (t, e) => {
                                 !t && e ? i(new Uint8Array(e)) : n(new Error(t));
                             });
                         });
                     };
                     class NodeFilterFactory extends s.BaseFilterFactory {}
                     class NodeCanvasFactory extends s.BaseCanvasFactory {
                         _createCanvas(t, e) {
                             return a.createCanvas(t, e);
                         }
                     }
                     class NodeCMapReaderFactory extends s.BaseCMapReaderFactory {
                         _fetchData(t, e) {
                             return fetchData(t).then((t) => ({ cMapData: t, compressionType: e }));
                         }
                     }
                     class NodeStandardFontDataFactory extends s.BaseStandardFontDataFactory {
                         _fetchData(t) {
                             return fetchData(t);
                         }
                     }
                     n();
                 } catch (t) {
                     n(t);
                 }
             },
             1
         );
     },
     3890: (t, e, i) => {
         i.d(e, { OptionalContentConfig: () => OptionalContentConfig });
         var n = i(3266),
             s = i(2825);
         const r = Symbol("INTERNAL");
         class OptionalContentGroup {
             #js = !0;
             constructor(t, e) {
                 this.name = t;
                 this.intent = e;
             }
             get visible() {
                 return this.#js;
             }
             _setVisible(t, e) {
                 t !== r && (0, n.unreachable)("Internal method `_setVisible` called.");
                 this.#js = e;
             }
         }
         class OptionalContentConfig {
             #Hs = null;
             #Vs = new Map();
             #Ws = null;
             #Gs = null;
             constructor(t) {
                 this.name = null;
                 this.creator = null;
                 if (null !== t) {
                     this.name = t.name;
                     this.creator = t.creator;
                     this.#Gs = t.order;
                     for (const e of t.groups) this.#Vs.set(e.id, new OptionalContentGroup(e.name, e.intent));
                     if ("OFF" === t.baseState) for (const t of this.#Vs.values()) t._setVisible(r, !1);
                     for (const e of t.on) this.#Vs.get(e)._setVisible(r, !0);
                     for (const e of t.off) this.#Vs.get(e)._setVisible(r, !1);
                     this.#Ws = this.getHash();
                 }
             }
             #qs(t) {
                 const e = t.length;
                 if (e < 2) return !0;
                 const i = t[0];
                 for (let s = 1; s < e; s++) {
                     const e = t[s];
                     let r;
                     if (Array.isArray(e)) r = this.#qs(e);
                     else {
                         if (!this.#Vs.has(e)) {
                             (0, n.warn)(`Optional content group not found: ${e}`);
                             return !0;
                         }
                         r = this.#Vs.get(e).visible;
                     }
                     switch (i) {
                         case "And":
                             if (!r) return !1;
                             break;
                         case "Or":
                             if (r) return !0;
                             break;
                         case "Not":
                             return !r;
                         default:
                             return !0;
                     }
                 }
                 return "And" === i;
             }
             isVisible(t) {
                 if (0 === this.#Vs.size) return !0;
                 if (!t) {
                     (0, n.warn)("Optional content group not defined.");
                     return !0;
                 }
                 if ("OCG" === t.type) {
                     if (!this.#Vs.has(t.id)) {
                         (0, n.warn)(`Optional content group not found: ${t.id}`);
                         return !0;
                     }
                     return this.#Vs.get(t.id).visible;
                 }
                 if ("OCMD" === t.type) {
                     if (t.expression) return this.#qs(t.expression);
                     if (!t.policy || "AnyOn" === t.policy) {
                         for (const e of t.ids) {
                             if (!this.#Vs.has(e)) {
                                 (0, n.warn)(`Optional content group not found: ${e}`);
                                 return !0;
                             }
                             if (this.#Vs.get(e).visible) return !0;
                         }
                         return !1;
                     }
                     if ("AllOn" === t.policy) {
                         for (const e of t.ids) {
                             if (!this.#Vs.has(e)) {
                                 (0, n.warn)(`Optional content group not found: ${e}`);
                                 return !0;
                             }
                             if (!this.#Vs.get(e).visible) return !1;
                         }
                         return !0;
                     }
                     if ("AnyOff" === t.policy) {
                         for (const e of t.ids) {
                             if (!this.#Vs.has(e)) {
                                 (0, n.warn)(`Optional content group not found: ${e}`);
                                 return !0;
                             }
                             if (!this.#Vs.get(e).visible) return !0;
                         }
                         return !1;
                     }
                     if ("AllOff" === t.policy) {
                         for (const e of t.ids) {
                             if (!this.#Vs.has(e)) {
                                 (0, n.warn)(`Optional content group not found: ${e}`);
                                 return !0;
                             }
                             if (this.#Vs.get(e).visible) return !1;
                         }
                         return !0;
                     }
                     (0, n.warn)(`Unknown optional content policy ${t.policy}.`);
                     return !0;
                 }
                 (0, n.warn)(`Unknown group type ${t.type}.`);
                 return !0;
             }
             setVisibility(t) {
                 let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                 if (this.#Vs.has(t)) {
                     this.#Vs.get(t)._setVisible(r, !!e);
                     this.#Hs = null;
                 } else (0, n.warn)(`Optional content group not found: ${t}`);
             }
             get hasInitialVisibility() {
                 return null === this.#Ws || this.getHash() === this.#Ws;
             }
             getOrder() {
                 return this.#Vs.size ? (this.#Gs ? this.#Gs.slice() : [...this.#Vs.keys()]) : null;
             }
             getGroups() {
                 return this.#Vs.size > 0 ? (0, n.objectFromMap)(this.#Vs) : null;
             }
             getGroup(t) {
                 return this.#Vs.get(t) || null;
             }
             getHash() {
                 if (null !== this.#Hs) return this.#Hs;
                 const t = new s.MurmurHash3_64();
                 for (const [e, i] of this.#Vs) t.update(`${e}:${i.visible}`);
                 return (this.#Hs = t.hexdigest());
             }
         }
     },
     5739: (t, e, i) => {
         i.d(e, { renderTextLayer: () => renderTextLayer, updateTextLayer: () => updateTextLayer });
         i(4226), i(3352);
         var n = i(3266),
             s = i(473);
         const r = 30,
             a = 0.8,
             o = new Map();
         function getCtx(t, e) {
             let i;
             if (e && n.FeatureTest.isOffscreenCanvasSupported) i = new OffscreenCanvas(t, t).getContext("2d", { alpha: !1 });
             else {
                 const e = document.createElement("canvas");
                 e.width = e.height = t;
                 i = e.getContext("2d", { alpha: !1 });
             }
             return i;
         }
         function appendText(t, e, i) {
             const s = document.createElement("span"),
                 l = { angle: 0, canvasWidth: 0, hasText: "" !== e.str, hasEOL: e.hasEOL, fontSize: 0 };
             t._textDivs.push(s);
             const h = n.Util.transform(t._transform, e.transform);
             let c = Math.atan2(h[1], h[0]);
             const d = i[e.fontName];
             d.vertical && (c += Math.PI / 2);
             const u = (t._fontInspectorEnabled && d.fontSubstitution) || d.fontFamily,
                 p = Math.hypot(h[2], h[3]),
                 g =
                     p *
                     (function getAscent(t, e) {
                         const i = o.get(t);
                         if (i) return i;
                         const n = getCtx(r, e);
                         n.font = `${r}px ${t}`;
                         const s = n.measureText("");
                         let l = s.fontBoundingBoxAscent,
                             h = Math.abs(s.fontBoundingBoxDescent);
                         if (l) {
                             const e = l / (l + h);
                             o.set(t, e);
                             n.canvas.width = n.canvas.height = 0;
                             return e;
                         }
                         n.strokeStyle = "red";
                         n.clearRect(0, 0, r, r);
                         n.strokeText("g", 0, 0);
                         let c = n.getImageData(0, 0, r, r).data;
                         h = 0;
                         for (let t = c.length - 1 - 3; t >= 0; t -= 4)
                             if (c[t] > 0) {
                                 h = Math.ceil(t / 4 / r);
                                 break;
                             }
                         n.clearRect(0, 0, r, r);
                         n.strokeText("A", 0, r);
                         c = n.getImageData(0, 0, r, r).data;
                         l = 0;
                         for (let t = 0, e = c.length; t < e; t += 4)
                             if (c[t] > 0) {
                                 l = r - Math.floor(t / 4 / r);
                                 break;
                             }
                         n.canvas.width = n.canvas.height = 0;
                         if (l) {
                             const e = l / (l + h);
                             o.set(t, e);
                             return e;
                         }
                         o.set(t, a);
                         return a;
                     })(u, t._isOffscreenCanvasSupported);
             let f, m;
             if (0 === c) {
                 f = h[4];
                 m = h[5] - g;
             } else {
                 f = h[4] + g * Math.sin(c);
                 m = h[5] - g * Math.cos(c);
             }
             const v = "calc(var(--scale-factor)*",
                 b = s.style;
             if (t._container === t._rootContainer) {
                 b.left = `${((100 * f) / t._pageWidth).toFixed(2)}%`;
                 b.top = `${((100 * m) / t._pageHeight).toFixed(2)}%`;
             } else {
                 b.left = `${v}${f.toFixed(2)}px)`;
                 b.top = `${v}${m.toFixed(2)}px)`;
             }
             b.fontSize = `${v}${p.toFixed(2)}px)`;
             b.fontFamily = u;
             l.fontSize = p;
             s.setAttribute("role", "presentation");
             s.textContent = e.str;
             s.dir = e.dir;
             t._fontInspectorEnabled && (s.dataset.fontName = d.fontSubstitutionLoadedName || e.fontName);
             0 !== c && (l.angle = c * (180 / Math.PI));
             let y = !1;
             if (e.str.length > 1) y = !0;
             else if (" " !== e.str && e.transform[0] !== e.transform[3]) {
                 const t = Math.abs(e.transform[0]),
                     i = Math.abs(e.transform[3]);
                 t !== i && Math.max(t, i) / Math.min(t, i) > 1.5 && (y = !0);
             }
             y && (l.canvasWidth = d.vertical ? e.height : e.width);
             t._textDivProperties.set(s, l);
             t._isReadableStream && t._layoutText(s);
         }
         function layout(t) {
             const { div: e, scale: i, properties: n, ctx: s, prevFontSize: r, prevFontFamily: a } = t,
                 { style: o } = e;
             let l = "";
             if (0 !== n.canvasWidth && n.hasText) {
                 const { fontFamily: h } = o,
                     { canvasWidth: c, fontSize: d } = n;
                 if (r !== d || a !== h) {
                     s.font = `${d * i}px ${h}`;
                     t.prevFontSize = d;
                     t.prevFontFamily = h;
                 }
                 const { width: u } = s.measureText(e.textContent);
                 u > 0 && (l = `scaleX(${(c * i) / u})`);
             }
             0 !== n.angle && (l = `rotate(${n.angle}deg) ${l}`);
             l.length > 0 && (o.transform = l);
         }
         class TextLayerRenderTask {
             constructor(t) {
                 let { textContentSource: e, container: i, viewport: r, textDivs: a, textDivProperties: o, textContentItemsStr: l, isOffscreenCanvasSupported: h } = t;
                 this._textContentSource = e;
                 this._isReadableStream = e instanceof ReadableStream;
                 this._container = this._rootContainer = i;
                 this._textDivs = a || [];
                 this._textContentItemsStr = l || [];
                 this._isOffscreenCanvasSupported = h;
                 this._fontInspectorEnabled = !!globalThis.FontInspector?.enabled;
                 this._reader = null;
                 this._textDivProperties = o || new WeakMap();
                 this._canceled = !1;
                 this._capability = new n.PromiseCapability();
                 this._layoutTextParams = { prevFontSize: null, prevFontFamily: null, div: null, scale: r.scale * (globalThis.devicePixelRatio || 1), properties: null, ctx: getCtx(0, h) };
                 const { pageWidth: c, pageHeight: d, pageX: u, pageY: p } = r.rawDims;
                 this._transform = [1, 0, 0, -1, -u, p + d];
                 this._pageWidth = c;
                 this._pageHeight = d;
                 (0, s.setLayerDimensions)(i, r);
                 this._capability.promise
                     .finally(() => {
                         this._layoutTextParams = null;
                     })
                     .catch(() => {});
             }
             get promise() {
                 return this._capability.promise;
             }
             cancel() {
                 this._canceled = !0;
                 if (this._reader) {
                     this._reader.cancel(new n.AbortException("TextLayer task cancelled.")).catch(() => {});
                     this._reader = null;
                 }
                 this._capability.reject(new n.AbortException("TextLayer task cancelled."));
             }
             _processItems(t, e) {
                 for (const i of t)
                     if (void 0 !== i.str) {
                         this._textContentItemsStr.push(i.str);
                         appendText(this, i, e);
                     } else if ("beginMarkedContentProps" === i.type || "beginMarkedContent" === i.type) {
                         const t = this._container;
                         this._container = document.createElement("span");
                         this._container.classList.add("markedContent");
                         null !== i.id && this._container.setAttribute("id", `${i.id}`);
                         t.append(this._container);
                     } else "endMarkedContent" === i.type && (this._container = this._container.parentNode);
             }
             _layoutText(t) {
                 const e = (this._layoutTextParams.properties = this._textDivProperties.get(t));
                 this._layoutTextParams.div = t;
                 layout(this._layoutTextParams);
                 e.hasText && this._container.append(t);
                 if (e.hasEOL) {
                     const t = document.createElement("br");
                     t.setAttribute("role", "presentation");
                     this._container.append(t);
                 }
             }
             _render() {
                 const t = new n.PromiseCapability();
                 let e = Object.create(null);
                 if (this._isReadableStream) {
                     const pump = () => {
                         this._reader.read().then((i) => {
                             let { value: n, done: s } = i;
                             if (s) t.resolve();
                             else {
                                 Object.assign(e, n.styles);
                                 this._processItems(n.items, e);
                                 pump();
                             }
                         }, t.reject);
                     };
                     this._reader = this._textContentSource.getReader();
                     pump();
                 } else {
                     if (!this._textContentSource) throw new Error('No "textContentSource" parameter specified.');
                     {
                         const { items: e, styles: i } = this._textContentSource;
                         this._processItems(e, i);
                         t.resolve();
                     }
                 }
                 t.promise.then(() => {
                     e = null;
                     !(function render(t) {
                         if (t._canceled) return;
                         const e = t._textDivs,
                             i = t._capability;
                         if (e.length > 1e5) i.resolve();
                         else {
                             if (!t._isReadableStream) for (const i of e) t._layoutText(i);
                             i.resolve();
                         }
                     })(this);
                 }, this._capability.reject);
             }
         }
         function renderTextLayer(t) {
             const e = new TextLayerRenderTask(t);
             e._render();
             return e;
         }
         function updateTextLayer(t) {
             let { container: e, viewport: i, textDivs: n, textDivProperties: r, isOffscreenCanvasSupported: a, mustRotate: o = !0, mustRescale: l = !0 } = t;
             o && (0, s.setLayerDimensions)(e, { rotation: i.rotation });
             if (l) {
                 const t = getCtx(0, a),
                     e = { prevFontSize: null, prevFontFamily: null, div: null, scale: i.scale * (globalThis.devicePixelRatio || 1), properties: null, ctx: t };
                 for (const t of n) {
                     e.properties = r.get(t);
                     e.div = t;
                     layout(e);
                 }
             }
         }
     },
     4092: (t, e, i) => {
         i.d(e, { PDFDataTransportStream: () => PDFDataTransportStream });
         i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(4226), i(7121), i(8518);
         var n = i(3266),
             s = i(473);
         class PDFDataTransportStream {
             constructor(t, e) {
                 let { length: i, initialData: s, progressiveDone: r = !1, contentDispositionFilename: a = null, disableRange: o = !1, disableStream: l = !1 } = t;
                 (0, n.assert)(e, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
                 this._queuedChunks = [];
                 this._progressiveDone = r;
                 this._contentDispositionFilename = a;
                 if (s?.length > 0) {
                     const t = s instanceof Uint8Array && s.byteLength === s.buffer.byteLength ? s.buffer : new Uint8Array(s).buffer;
                     this._queuedChunks.push(t);
                 }
                 this._pdfDataRangeTransport = e;
                 this._isStreamingSupported = !l;
                 this._isRangeSupported = !o;
                 this._contentLength = i;
                 this._fullRequestReader = null;
                 this._rangeReaders = [];
                 this._pdfDataRangeTransport.addRangeListener((t, e) => {
                     this._onReceiveData({ begin: t, chunk: e });
                 });
                 this._pdfDataRangeTransport.addProgressListener((t, e) => {
                     this._onProgress({ loaded: t, total: e });
                 });
                 this._pdfDataRangeTransport.addProgressiveReadListener((t) => {
                     this._onReceiveData({ chunk: t });
                 });
                 this._pdfDataRangeTransport.addProgressiveDoneListener(() => {
                     this._onProgressiveDone();
                 });
                 this._pdfDataRangeTransport.transportReady();
             }
             _onReceiveData(t) {
                 let { begin: e, chunk: i } = t;
                 const s = i instanceof Uint8Array && i.byteLength === i.buffer.byteLength ? i.buffer : new Uint8Array(i).buffer;
                 if (void 0 === e) this._fullRequestReader ? this._fullRequestReader._enqueue(s) : this._queuedChunks.push(s);
                 else {
                     const t = this._rangeReaders.some(function (t) {
                         if (t._begin !== e) return !1;
                         t._enqueue(s);
                         return !0;
                     });
                     (0, n.assert)(t, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
                 }
             }
             get _progressiveDataLength() {
                 return this._fullRequestReader?._loaded ?? 0;
             }
             _onProgress(t) {
                 void 0 === t.total ? this._rangeReaders[0]?.onProgress?.({ loaded: t.loaded }) : this._fullRequestReader?.onProgress?.({ loaded: t.loaded, total: t.total });
             }
             _onProgressiveDone() {
                 this._fullRequestReader?.progressiveDone();
                 this._progressiveDone = !0;
             }
             _removeRangeReader(t) {
                 const e = this._rangeReaders.indexOf(t);
                 e >= 0 && this._rangeReaders.splice(e, 1);
             }
             getFullReader() {
                 (0, n.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
                 const t = this._queuedChunks;
                 this._queuedChunks = null;
                 return new PDFDataTransportStreamReader(this, t, this._progressiveDone, this._contentDispositionFilename);
             }
             getRangeReader(t, e) {
                 if (e <= this._progressiveDataLength) return null;
                 const i = new PDFDataTransportStreamRangeReader(this, t, e);
                 this._pdfDataRangeTransport.requestDataRange(t, e);
                 this._rangeReaders.push(i);
                 return i;
             }
             cancelAllRequests(t) {
                 this._fullRequestReader?.cancel(t);
                 for (const e of this._rangeReaders.slice(0)) e.cancel(t);
                 this._pdfDataRangeTransport.abort();
             }
         }
         class PDFDataTransportStreamReader {
             constructor(t, e) {
                 let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                     n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                 this._stream = t;
                 this._done = i || !1;
                 this._filename = (0, s.isPdfFile)(n) ? n : null;
                 this._queuedChunks = e || [];
                 this._loaded = 0;
                 for (const t of this._queuedChunks) this._loaded += t.byteLength;
                 this._requests = [];
                 this._headersReady = Promise.resolve();
                 t._fullRequestReader = this;
                 this.onProgress = null;
             }
             _enqueue(t) {
                 if (!this._done) {
                     if (this._requests.length > 0) {
                         this._requests.shift().resolve({ value: t, done: !1 });
                     } else this._queuedChunks.push(t);
                     this._loaded += t.byteLength;
                 }
             }
             get headersReady() {
                 return this._headersReady;
             }
             get filename() {
                 return this._filename;
             }
             get isRangeSupported() {
                 return this._stream._isRangeSupported;
             }
             get isStreamingSupported() {
                 return this._stream._isStreamingSupported;
             }
             get contentLength() {
                 return this._stream._contentLength;
             }
             async read() {
                 if (this._queuedChunks.length > 0) {
                     return { value: this._queuedChunks.shift(), done: !1 };
                 }
                 if (this._done) return { value: void 0, done: !0 };
                 const t = new n.PromiseCapability();
                 this._requests.push(t);
                 return t.promise;
             }
             cancel(t) {
                 this._done = !0;
                 for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                 this._requests.length = 0;
             }
             progressiveDone() {
                 this._done || (this._done = !0);
             }
         }
         class PDFDataTransportStreamRangeReader {
             constructor(t, e, i) {
                 this._stream = t;
                 this._begin = e;
                 this._end = i;
                 this._queuedChunk = null;
                 this._requests = [];
                 this._done = !1;
                 this.onProgress = null;
             }
             _enqueue(t) {
                 if (!this._done) {
                     if (0 === this._requests.length) this._queuedChunk = t;
                     else {
                         this._requests.shift().resolve({ value: t, done: !1 });
                         for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                         this._requests.length = 0;
                     }
                     this._done = !0;
                     this._stream._removeRangeReader(this);
                 }
             }
             get isStreamingSupported() {
                 return !1;
             }
             async read() {
                 if (this._queuedChunk) {
                     const t = this._queuedChunk;
                     this._queuedChunk = null;
                     return { value: t, done: !1 };
                 }
                 if (this._done) return { value: void 0, done: !0 };
                 const t = new n.PromiseCapability();
                 this._requests.push(t);
                 return t.promise;
             }
             cancel(t) {
                 this._done = !0;
                 for (const t of this._requests) t.resolve({ value: void 0, done: !0 });
                 this._requests.length = 0;
                 this._stream._removeRangeReader(this);
             }
         }
     },
     1368: (t, e, i) => {
         i.d(e, { GlobalWorkerOptions: () => n });
         const n = Object.create(null);
         n.workerPort = null;
         n.workerSrc = "";
     },
     8266: (t, e, i) => {
         i.d(e, { XfaLayer: () => XfaLayer });
         i(4226);
         var n = i(1521);
         class XfaLayer {
             static setupStorage(t, e, i, n, s) {
                 const r = n.getValue(e, { value: null });
                 switch (i.name) {
                     case "textarea":
                         null !== r.value && (t.textContent = r.value);
                         if ("print" === s) break;
                         t.addEventListener("input", (t) => {
                             n.setValue(e, { value: t.target.value });
                         });
                         break;
                     case "input":
                         if ("radio" === i.attributes.type || "checkbox" === i.attributes.type) {
                             r.value === i.attributes.xfaOn ? t.setAttribute("checked", !0) : r.value === i.attributes.xfaOff && t.removeAttribute("checked");
                             if ("print" === s) break;
                             t.addEventListener("change", (t) => {
                                 n.setValue(e, { value: t.target.checked ? t.target.getAttribute("xfaOn") : t.target.getAttribute("xfaOff") });
                             });
                         } else {
                             null !== r.value && t.setAttribute("value", r.value);
                             if ("print" === s) break;
                             t.addEventListener("input", (t) => {
                                 n.setValue(e, { value: t.target.value });
                             });
                         }
                         break;
                     case "select":
                         if (null !== r.value) {
                             t.setAttribute("value", r.value);
                             for (const t of i.children) t.attributes.value === r.value ? (t.attributes.selected = !0) : t.attributes.hasOwnProperty("selected") && delete t.attributes.selected;
                         }
                         t.addEventListener("input", (t) => {
                             const i = t.target.options,
                                 s = -1 === i.selectedIndex ? "" : i[i.selectedIndex].value;
                             n.setValue(e, { value: s });
                         });
                 }
             }
             static setAttributes(t) {
                 let { html: e, element: i, storage: n = null, intent: s, linkService: r } = t;
                 const { attributes: a } = i,
                     o = e instanceof HTMLAnchorElement;
                 "radio" === a.type && (a.name = `${a.name}-${s}`);
                 for (const [t, i] of Object.entries(a))
                     if (null != i)
                         switch (t) {
                             case "class":
                                 i.length && e.setAttribute(t, i.join(" "));
                                 break;
                             case "dataId":
                                 break;
                             case "id":
                                 e.setAttribute("data-element-id", i);
                                 break;
                             case "style":
                                 Object.assign(e.style, i);
                                 break;
                             case "textContent":
                                 e.textContent = i;
                                 break;
                             default:
                                 (!o || ("href" !== t && "newWindow" !== t)) && e.setAttribute(t, i);
                         }
                 o && r.addLinkAttributes(e, a.href, a.newWindow);
                 n && a.dataId && this.setupStorage(e, a.dataId, i, n);
             }
             static render(t) {
                 const e = t.annotationStorage,
                     i = t.linkService,
                     s = t.xfaHtml,
                     r = t.intent || "display",
                     a = document.createElement(s.name);
                 s.attributes && this.setAttributes({ html: a, element: s, intent: r, linkService: i });
                 const o = "richText" !== r,
                     l = t.div;
                 l.append(a);
                 if (t.viewport) {
                     const e = `matrix(${t.viewport.transform.join(",")})`;
                     l.style.transform = e;
                 }
                 o && l.setAttribute("class", "xfaLayer xfaFont");
                 const h = [];
                 if (0 === s.children.length) {
                     if (s.value) {
                         const t = document.createTextNode(s.value);
                         a.append(t);
                         o && n.XfaText.shouldBuildText(s.name) && h.push(t);
                     }
                     return { textDivs: h };
                 }
                 const c = [[s, -1, a]];
                 for (; c.length > 0; ) {
                     const [t, s, a] = c.at(-1);
                     if (s + 1 === t.children.length) {
                         c.pop();
                         continue;
                     }
                     const l = t.children[++c.at(-1)[1]];
                     if (null === l) continue;
                     const { name: d } = l;
                     if ("#text" === d) {
                         const t = document.createTextNode(l.value);
                         h.push(t);
                         a.append(t);
                         continue;
                     }
                     const u = l?.attributes?.xmlns ? document.createElementNS(l.attributes.xmlns, d) : document.createElement(d);
                     a.append(u);
                     l.attributes && this.setAttributes({ html: u, element: l, storage: e, intent: r, linkService: i });
                     if (l.children?.length > 0) c.push([l, -1, u]);
                     else if (l.value) {
                         const t = document.createTextNode(l.value);
                         o && n.XfaText.shouldBuildText(d) && h.push(t);
                         u.append(t);
                     }
                 }
                 for (const t of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")) t.setAttribute("readOnly", !0);
                 return { textDivs: h };
             }
             static update(t) {
                 const e = `matrix(${t.viewport.transform.join(",")})`;
                 t.div.style.transform = e;
                 t.div.hidden = !1;
             }
         }
     },
     1521: (t, e, i) => {
         i.d(e, { XfaText: () => XfaText });
         i(4226);
         class XfaText {
             static textContent(t) {
                 const e = [],
                     i = { items: e, styles: Object.create(null) };
                 !(function walk(t) {
                     if (!t) return;
                     let i = null;
                     const n = t.name;
                     if ("#text" === n) i = t.value;
                     else {
                         if (!XfaText.shouldBuildText(n)) return;
                         t?.attributes?.textContent ? (i = t.attributes.textContent) : t.value && (i = t.value);
                     }
                     null !== i && e.push({ str: i });
                     if (t.children) for (const e of t.children) walk(e);
                 })(t);
                 return i;
             }
             static shouldBuildText(t) {
                 return !("textarea" === t || "input" === t || "option" === t || "select" === t);
             }
         }
     },
     9907: (t, e, i) => {
         i.a(t, async (t, n) => {
             try {
                 i.d(e, {
                     AbortException: () => s.AbortException,
                     AnnotationEditorLayer: () => l.AnnotationEditorLayer,
                     AnnotationEditorParamsType: () => s.AnnotationEditorParamsType,
                     AnnotationEditorType: () => s.AnnotationEditorType,
                     AnnotationEditorUIManager: () => h.AnnotationEditorUIManager,
                     AnnotationLayer: () => c.AnnotationLayer,
                     AnnotationMode: () => s.AnnotationMode,
                     CMapCompressionType: () => s.CMapCompressionType,
                     ColorPicker: () => d.ColorPicker,
                     DOMSVGFactory: () => a.DOMSVGFactory,
                     DrawLayer: () => u.DrawLayer,
                     FeatureTest: () => s.FeatureTest,
                     GlobalWorkerOptions: () => p.GlobalWorkerOptions,
                     ImageKind: () => s.ImageKind,
                     InvalidPDFException: () => s.InvalidPDFException,
                     MissingPDFException: () => s.MissingPDFException,
                     OPS: () => s.OPS,
                     Outliner: () => g.Outliner,
                     PDFDataRangeTransport: () => r.PDFDataRangeTransport,
                     PDFDateString: () => a.PDFDateString,
                     PDFWorker: () => r.PDFWorker,
                     PasswordResponses: () => s.PasswordResponses,
                     PermissionFlag: () => s.PermissionFlag,
                     PixelsPerInch: () => a.PixelsPerInch,
                     PromiseCapability: () => s.PromiseCapability,
                     RenderingCancelledException: () => a.RenderingCancelledException,
                     UnexpectedResponseException: () => s.UnexpectedResponseException,
                     Util: () => s.Util,
                     VerbosityLevel: () => s.VerbosityLevel,
                     XfaLayer: () => f.XfaLayer,
                     build: () => r.build,
                     createValidAbsoluteUrl: () => s.createValidAbsoluteUrl,
                     fetchData: () => a.fetchData,
                     getDocument: () => r.getDocument,
                     getFilenameFromUrl: () => a.getFilenameFromUrl,
                     getPdfFilenameFromUrl: () => a.getPdfFilenameFromUrl,
                     getXfaPageViewport: () => a.getXfaPageViewport,
                     isDataScheme: () => a.isDataScheme,
                     isPdfFile: () => a.isPdfFile,
                     noContextMenu: () => a.noContextMenu,
                     normalizeUnicode: () => s.normalizeUnicode,
                     renderTextLayer: () => o.renderTextLayer,
                     setLayerDimensions: () => a.setLayerDimensions,
                     shadow: () => s.shadow,
                     updateTextLayer: () => o.updateTextLayer,
                     version: () => r.version,
                 });
                 var s = i(3266),
                     r = i(9406),
                     a = i(473),
                     o = i(5739),
                     l = i(4629),
                     h = i(4812),
                     c = i(7640),
                     d = i(5097),
                     u = i(9423),
                     p = i(1368),
                     g = i(7405),
                     f = i(8266),
                     m = t([r]);
                 r = (m.then ? (await m)() : m)[0];
                 n();
             } catch (t) {
                 n(t);
             }
         });
     },
     6694: (t, e, i) => {
         i.d(e, { MessageHandler: () => MessageHandler });
         i(3352);
         var n = i(3266);
         const s = 1,
             r = 2,
             a = 1,
             o = 2,
             l = 3,
             h = 4,
             c = 5,
             d = 6,
             u = 7,
             p = 8;
         function wrapReason(t) {
             t instanceof Error || ("object" == typeof t && null !== t) || (0, n.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.');
             switch (t.name) {
                 case "AbortException":
                     return new n.AbortException(t.message);
                 case "MissingPDFException":
                     return new n.MissingPDFException(t.message);
                 case "PasswordException":
                     return new n.PasswordException(t.message, t.code);
                 case "UnexpectedResponseException":
                     return new n.UnexpectedResponseException(t.message, t.status);
                 case "UnknownErrorException":
                     return new n.UnknownErrorException(t.message, t.details);
                 default:
                     return new n.UnknownErrorException(t.message, t.toString());
             }
         }
         class MessageHandler {
             constructor(t, e, i) {
                 this.sourceName = t;
                 this.targetName = e;
                 this.comObj = i;
                 this.callbackId = 1;
                 this.streamId = 1;
                 this.streamSinks = Object.create(null);
                 this.streamControllers = Object.create(null);
                 this.callbackCapabilities = Object.create(null);
                 this.actionHandler = Object.create(null);
                 this._onComObjOnMessage = (t) => {
                     const e = t.data;
                     if (e.targetName !== this.sourceName) return;
                     if (e.stream) {
                         this.#$s(e);
                         return;
                     }
                     if (e.callback) {
                         const t = e.callbackId,
                             i = this.callbackCapabilities[t];
                         if (!i) throw new Error(`Cannot resolve callback ${t}`);
                         delete this.callbackCapabilities[t];
                         if (e.callback === s) i.resolve(e.data);
                         else {
                             if (e.callback !== r) throw new Error("Unexpected callback case");
                             i.reject(wrapReason(e.reason));
                         }
                         return;
                     }
                     const n = this.actionHandler[e.action];
                     if (!n) throw new Error(`Unknown action from worker: ${e.action}`);
                     if (e.callbackId) {
                         const t = this.sourceName,
                             a = e.sourceName;
                         new Promise(function (t) {
                             t(n(e.data));
                         }).then(
                             function (n) {
                                 i.postMessage({ sourceName: t, targetName: a, callback: s, callbackId: e.callbackId, data: n });
                             },
                             function (n) {
                                 i.postMessage({ sourceName: t, targetName: a, callback: r, callbackId: e.callbackId, reason: wrapReason(n) });
                             }
                         );
                     } else e.streamId ? this.#Ks(e) : n(e.data);
                 };
                 i.addEventListener("message", this._onComObjOnMessage);
             }
             on(t, e) {
                 const i = this.actionHandler;
                 if (i[t]) throw new Error(`There is already an actionName called "${t}"`);
                 i[t] = e;
             }
             send(t, e, i) {
                 this.comObj.postMessage({ sourceName: this.sourceName, targetName: this.targetName, action: t, data: e }, i);
             }
             sendWithPromise(t, e, i) {
                 const s = this.callbackId++,
                     r = new n.PromiseCapability();
                 this.callbackCapabilities[s] = r;
                 try {
                     this.comObj.postMessage({ sourceName: this.sourceName, targetName: this.targetName, action: t, callbackId: s, data: e }, i);
                 } catch (t) {
                     r.reject(t);
                 }
                 return r.promise;
             }
             sendWithStream(t, e, i, s) {
                 const r = this.streamId++,
                     o = this.sourceName,
                     l = this.targetName,
                     h = this.comObj;
                 return new ReadableStream(
                     {
                         start: (i) => {
                             const a = new n.PromiseCapability();
                             this.streamControllers[r] = { controller: i, startCall: a, pullCall: null, cancelCall: null, isClosed: !1 };
                             h.postMessage({ sourceName: o, targetName: l, action: t, streamId: r, data: e, desiredSize: i.desiredSize }, s);
                             return a.promise;
                         },
                         pull: (t) => {
                             const e = new n.PromiseCapability();
                             this.streamControllers[r].pullCall = e;
                             h.postMessage({ sourceName: o, targetName: l, stream: d, streamId: r, desiredSize: t.desiredSize });
                             return e.promise;
                         },
                         cancel: (t) => {
                             (0, n.assert)(t instanceof Error, "cancel must have a valid reason");
                             const e = new n.PromiseCapability();
                             this.streamControllers[r].cancelCall = e;
                             this.streamControllers[r].isClosed = !0;
                             h.postMessage({ sourceName: o, targetName: l, stream: a, streamId: r, reason: wrapReason(t) });
                             return e.promise;
                         },
                     },
                     i
                 );
             }
             #Ks(t) {
                 const e = t.streamId,
                     i = this.sourceName,
                     s = t.sourceName,
                     r = this.comObj,
                     a = this,
                     o = this.actionHandler[t.action],
                     d = {
                         enqueue(t) {
                             let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                                 o = arguments.length > 2 ? arguments[2] : void 0;
                             if (this.isCancelled) return;
                             const l = this.desiredSize;
                             this.desiredSize -= a;
                             if (l > 0 && this.desiredSize <= 0) {
                                 this.sinkCapability = new n.PromiseCapability();
                                 this.ready = this.sinkCapability.promise;
                             }
                             r.postMessage({ sourceName: i, targetName: s, stream: h, streamId: e, chunk: t }, o);
                         },
                         close() {
                             if (!this.isCancelled) {
                                 this.isCancelled = !0;
                                 r.postMessage({ sourceName: i, targetName: s, stream: l, streamId: e });
                                 delete a.streamSinks[e];
                             }
                         },
                         error(t) {
                             (0, n.assert)(t instanceof Error, "error must have a valid reason");
                             if (!this.isCancelled) {
                                 this.isCancelled = !0;
                                 r.postMessage({ sourceName: i, targetName: s, stream: c, streamId: e, reason: wrapReason(t) });
                             }
                         },
                         sinkCapability: new n.PromiseCapability(),
                         onPull: null,
                         onCancel: null,
                         isCancelled: !1,
                         desiredSize: t.desiredSize,
                         ready: null,
                     };
                 d.sinkCapability.resolve();
                 d.ready = d.sinkCapability.promise;
                 this.streamSinks[e] = d;
                 new Promise(function (e) {
                     e(o(t.data, d));
                 }).then(
                     function () {
                         r.postMessage({ sourceName: i, targetName: s, stream: p, streamId: e, success: !0 });
                     },
                     function (t) {
                         r.postMessage({ sourceName: i, targetName: s, stream: p, streamId: e, reason: wrapReason(t) });
                     }
                 );
             }
             #$s(t) {
                 const e = t.streamId,
                     i = this.sourceName,
                     s = t.sourceName,
                     r = this.comObj,
                     g = this.streamControllers[e],
                     f = this.streamSinks[e];
                 switch (t.stream) {
                     case p:
                         t.success ? g.startCall.resolve() : g.startCall.reject(wrapReason(t.reason));
                         break;
                     case u:
                         t.success ? g.pullCall.resolve() : g.pullCall.reject(wrapReason(t.reason));
                         break;
                     case d:
                         if (!f) {
                             r.postMessage({ sourceName: i, targetName: s, stream: u, streamId: e, success: !0 });
                             break;
                         }
                         f.desiredSize <= 0 && t.desiredSize > 0 && f.sinkCapability.resolve();
                         f.desiredSize = t.desiredSize;
                         new Promise(function (t) {
                             t(f.onPull?.());
                         }).then(
                             function () {
                                 r.postMessage({ sourceName: i, targetName: s, stream: u, streamId: e, success: !0 });
                             },
                             function (t) {
                                 r.postMessage({ sourceName: i, targetName: s, stream: u, streamId: e, reason: wrapReason(t) });
                             }
                         );
                         break;
                     case h:
                         (0, n.assert)(g, "enqueue should have stream controller");
                         if (g.isClosed) break;
                         g.controller.enqueue(t.chunk);
                         break;
                     case l:
                         (0, n.assert)(g, "close should have stream controller");
                         if (g.isClosed) break;
                         g.isClosed = !0;
                         g.controller.close();
                         this.#Xs(g, e);
                         break;
                     case c:
                         (0, n.assert)(g, "error should have stream controller");
                         g.controller.error(wrapReason(t.reason));
                         this.#Xs(g, e);
                         break;
                     case o:
                         t.success ? g.cancelCall.resolve() : g.cancelCall.reject(wrapReason(t.reason));
                         this.#Xs(g, e);
                         break;
                     case a:
                         if (!f) break;
                         new Promise(function (e) {
                             e(f.onCancel?.(wrapReason(t.reason)));
                         }).then(
                             function () {
                                 r.postMessage({ sourceName: i, targetName: s, stream: o, streamId: e, success: !0 });
                             },
                             function (t) {
                                 r.postMessage({ sourceName: i, targetName: s, stream: o, streamId: e, reason: wrapReason(t) });
                             }
                         );
                         f.sinkCapability.reject(wrapReason(t.reason));
                         f.isCancelled = !0;
                         delete this.streamSinks[e];
                         break;
                     default:
                         throw new Error("Unexpected stream case");
                 }
             }
             async #Xs(t, e) {
                 await Promise.allSettled([t.startCall?.promise, t.pullCall?.promise, t.cancelCall?.promise]);
                 delete this.streamControllers[e];
             }
             destroy() {
                 this.comObj.removeEventListener("message", this._onComObjOnMessage);
             }
         }
     },
     2825: (t, e, i) => {
         i.d(e, { MurmurHash3_64: () => MurmurHash3_64 });
         i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(3352);
         var n = i(3266);
         const s = 3285377520,
             r = 4294901760,
             a = 65535;
         class MurmurHash3_64 {
             constructor(t) {
                 this.h1 = t ? 4294967295 & t : s;
                 this.h2 = t ? 4294967295 & t : s;
             }
             update(t) {
                 let e, i;
                 if ("string" == typeof t) {
                     e = new Uint8Array(2 * t.length);
                     i = 0;
                     for (let n = 0, s = t.length; n < s; n++) {
                         const s = t.charCodeAt(n);
                         if (s <= 255) e[i++] = s;
                         else {
                             e[i++] = s >>> 8;
                             e[i++] = 255 & s;
                         }
                     }
                 } else {
                     if (!(0, n.isArrayBuffer)(t)) throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.");
                     e = t.slice();
                     i = e.byteLength;
                 }
                 const s = i >> 2,
                     o = i - 4 * s,
                     l = new Uint32Array(e.buffer, 0, s);
                 let h = 0,
                     c = 0,
                     d = this.h1,
                     u = this.h2;
                 const p = 3432918353,
                     g = 461845907,
                     f = 11601,
                     m = 13715;
                 for (let t = 0; t < s; t++)
                     if (1 & t) {
                         h = l[t];
                         h = ((h * p) & r) | ((h * f) & a);
                         h = (h << 15) | (h >>> 17);
                         h = ((h * g) & r) | ((h * m) & a);
                         d ^= h;
                         d = (d << 13) | (d >>> 19);
                         d = 5 * d + 3864292196;
                     } else {
                         c = l[t];
                         c = ((c * p) & r) | ((c * f) & a);
                         c = (c << 15) | (c >>> 17);
                         c = ((c * g) & r) | ((c * m) & a);
                         u ^= c;
                         u = (u << 13) | (u >>> 19);
                         u = 5 * u + 3864292196;
                     }
                 h = 0;
                 switch (o) {
                     case 3:
                         h ^= e[4 * s + 2] << 16;
                     case 2:
                         h ^= e[4 * s + 1] << 8;
                     case 1:
                         h ^= e[4 * s];
                         h = ((h * p) & r) | ((h * f) & a);
                         h = (h << 15) | (h >>> 17);
                         h = ((h * g) & r) | ((h * m) & a);
                         1 & s ? (d ^= h) : (u ^= h);
                 }
                 this.h1 = d;
                 this.h2 = u;
             }
             hexdigest() {
                 let t = this.h1,
                     e = this.h2;
                 t ^= e >>> 1;
                 t = ((3981806797 * t) & r) | ((36045 * t) & a);
                 e = ((4283543511 * e) & r) | (((2950163797 * ((e << 16) | (t >>> 16))) & r) >>> 16);
                 t ^= e >>> 1;
                 t = ((444984403 * t) & r) | ((60499 * t) & a);
                 e = ((3301882366 * e) & r) | (((3120437893 * ((e << 16) | (t >>> 16))) & r) >>> 16);
                 t ^= e >>> 1;
                 return (t >>> 0).toString(16).padStart(8, "0") + (e >>> 0).toString(16).padStart(8, "0");
             }
         }
     },
     3266: (t, e, i) => {
         i.d(e, {
             AbortException: () => AbortException,
             AnnotationBorderStyleType: () => v,
             AnnotationEditorParamsType: () => u,
             AnnotationEditorPrefix: () => c,
             AnnotationEditorType: () => d,
             AnnotationMode: () => h,
             AnnotationPrefix: () => T,
             AnnotationType: () => m,
             BaseException: () => x,
             CMapCompressionType: () => y,
             FONT_IDENTITY_MATRIX: () => r,
             FeatureTest: () => FeatureTest,
             FormatError: () => FormatError,
             IDENTITY_MATRIX: () => s,
             ImageKind: () => f,
             InvalidPDFException: () => InvalidPDFException,
             LINE_FACTOR: () => o,
             MAX_IMAGE_SIZE_TO_CACHE: () => a,
             MissingPDFException: () => MissingPDFException,
             OPS: () => A,
             PasswordException: () => PasswordException,
             PasswordResponses: () => E,
             PermissionFlag: () => p,
             PromiseCapability: () => PromiseCapability,
             RenderingIntentFlag: () => l,
             TextRenderingMode: () => g,
             UnexpectedResponseException: () => UnexpectedResponseException,
             UnknownErrorException: () => UnknownErrorException,
             Util: () => Util,
             VerbosityLevel: () => b,
             assert: () => assert,
             bytesToString: () => bytesToString,
             createValidAbsoluteUrl: () => createValidAbsoluteUrl,
             getUuid: () => getUuid,
             getVerbosityLevel: () => getVerbosityLevel,
             info: () => info,
             isArrayBuffer: () => isArrayBuffer,
             isNodeJS: () => n,
             normalizeUnicode: () => normalizeUnicode,
             objectFromMap: () => objectFromMap,
             setVerbosityLevel: () => setVerbosityLevel,
             shadow: () => shadow,
             string32: () => string32,
             stringToBytes: () => stringToBytes,
             unreachable: () => unreachable,
             warn: () => warn,
         });
         i(3352), i(3655), i(2555), i(2202), i(4226), i(8837), i(9803), i(8347), i(7995), i(62), i(4602), i(344), i(4305), i(7583), i(7944);
         const n = !("object" != typeof process || process + "" != "[object process]" || process.versions.nw || (process.versions.electron && process.type && "browser" !== process.type)),
             s = [1, 0, 0, 1, 0, 0],
             r = [0.001, 0, 0, 0.001, 0, 0],
             a = 1e7,
             o = 1.35,
             l = { ANY: 1, DISPLAY: 2, PRINT: 4, SAVE: 8, ANNOTATIONS_FORMS: 16, ANNOTATIONS_STORAGE: 32, ANNOTATIONS_DISABLE: 64, OPLIST: 256 },
             h = { DISABLE: 0, ENABLE: 1, ENABLE_FORMS: 2, ENABLE_STORAGE: 3 },
             c = "pdfjs_internal_editor_",
             d = { DISABLE: -1, NONE: 0, FREETEXT: 3, HIGHLIGHT: 9, STAMP: 13, INK: 15 },
             u = { RESIZE: 1, CREATE: 2, FREETEXT_SIZE: 11, FREETEXT_COLOR: 12, FREETEXT_OPACITY: 13, INK_COLOR: 21, INK_THICKNESS: 22, INK_OPACITY: 23, HIGHLIGHT_COLOR: 31, HIGHLIGHT_DEFAULT_COLOR: 32 },
             p = { PRINT: 4, MODIFY_CONTENTS: 8, COPY: 16, MODIFY_ANNOTATIONS: 32, FILL_INTERACTIVE_FORMS: 256, COPY_FOR_ACCESSIBILITY: 512, ASSEMBLE: 1024, PRINT_HIGH_QUALITY: 2048 },
             g = { FILL: 0, STROKE: 1, FILL_STROKE: 2, INVISIBLE: 3, FILL_ADD_TO_PATH: 4, STROKE_ADD_TO_PATH: 5, FILL_STROKE_ADD_TO_PATH: 6, ADD_TO_PATH: 7, FILL_STROKE_MASK: 3, ADD_TO_PATH_FLAG: 4 },
             f = { GRAYSCALE_1BPP: 1, RGB_24BPP: 2, RGBA_32BPP: 3 },
             m = {
                 TEXT: 1,
                 LINK: 2,
                 FREETEXT: 3,
                 LINE: 4,
                 SQUARE: 5,
                 CIRCLE: 6,
                 POLYGON: 7,
                 POLYLINE: 8,
                 HIGHLIGHT: 9,
                 UNDERLINE: 10,
                 SQUIGGLY: 11,
                 STRIKEOUT: 12,
                 STAMP: 13,
                 CARET: 14,
                 INK: 15,
                 POPUP: 16,
                 FILEATTACHMENT: 17,
                 SOUND: 18,
                 MOVIE: 19,
                 WIDGET: 20,
                 SCREEN: 21,
                 PRINTERMARK: 22,
                 TRAPNET: 23,
                 WATERMARK: 24,
                 THREED: 25,
                 REDACT: 26,
             },
             v = { SOLID: 1, DASHED: 2, BEVELED: 3, INSET: 4, UNDERLINE: 5 },
             b = { ERRORS: 0, WARNINGS: 1, INFOS: 5 },
             y = { NONE: 0, BINARY: 1 },
             A = {
                 dependency: 1,
                 setLineWidth: 2,
                 setLineCap: 3,
                 setLineJoin: 4,
                 setMiterLimit: 5,
                 setDash: 6,
                 setRenderingIntent: 7,
                 setFlatness: 8,
                 setGState: 9,
                 save: 10,
                 restore: 11,
                 transform: 12,
                 moveTo: 13,
                 lineTo: 14,
                 curveTo: 15,
                 curveTo2: 16,
                 curveTo3: 17,
                 closePath: 18,
                 rectangle: 19,
                 stroke: 20,
                 closeStroke: 21,
                 fill: 22,
                 eoFill: 23,
                 fillStroke: 24,
                 eoFillStroke: 25,
                 closeFillStroke: 26,
                 closeEOFillStroke: 27,
                 endPath: 28,
                 clip: 29,
                 eoClip: 30,
                 beginText: 31,
                 endText: 32,
                 setCharSpacing: 33,
                 setWordSpacing: 34,
                 setHScale: 35,
                 setLeading: 36,
                 setFont: 37,
                 setTextRenderingMode: 38,
                 setTextRise: 39,
                 moveText: 40,
                 setLeadingMoveText: 41,
                 setTextMatrix: 42,
                 nextLine: 43,
                 showText: 44,
                 showSpacedText: 45,
                 nextLineShowText: 46,
                 nextLineSetSpacingShowText: 47,
                 setCharWidth: 48,
                 setCharWidthAndBounds: 49,
                 setStrokeColorSpace: 50,
                 setFillColorSpace: 51,
                 setStrokeColor: 52,
                 setStrokeColorN: 53,
                 setFillColor: 54,
                 setFillColorN: 55,
                 setStrokeGray: 56,
                 setFillGray: 57,
                 setStrokeRGBColor: 58,
                 setFillRGBColor: 59,
                 setStrokeCMYKColor: 60,
                 setFillCMYKColor: 61,
                 shadingFill: 62,
                 beginInlineImage: 63,
                 beginImageData: 64,
                 endInlineImage: 65,
                 paintXObject: 66,
                 markPoint: 67,
                 markPointProps: 68,
                 beginMarkedContent: 69,
                 beginMarkedContentProps: 70,
                 endMarkedContent: 71,
                 beginCompat: 72,
                 endCompat: 73,
                 paintFormXObjectBegin: 74,
                 paintFormXObjectEnd: 75,
                 beginGroup: 76,
                 endGroup: 77,
                 beginAnnotation: 80,
                 endAnnotation: 81,
                 paintImageMaskXObject: 83,
                 paintImageMaskXObjectGroup: 84,
                 paintImageXObject: 85,
                 paintInlineImageXObject: 86,
                 paintInlineImageXObjectGroup: 87,
                 paintImageXObjectRepeat: 88,
                 paintImageMaskXObjectRepeat: 89,
                 paintSolidColorImageMask: 90,
                 constructPath: 91,
             },
             E = { NEED_PASSWORD: 1, INCORRECT_PASSWORD: 2 };
         let w = b.WARNINGS;
         function setVerbosityLevel(t) {
             Number.isInteger(t) && (w = t);
         }
         function getVerbosityLevel() {
             return w;
         }
         function info(t) {
             w >= b.INFOS && console.log(`Info: ${t}`);
         }
         function warn(t) {
             w >= b.WARNINGS && console.log(`Warning: ${t}`);
         }
         function unreachable(t) {
             throw new Error(t);
         }
         function assert(t, e) {
             t || unreachable(e);
         }
         function createValidAbsoluteUrl(t) {
             let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                 i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
             if (!t) return null;
             try {
                 if (i && "string" == typeof t) {
                     if (i.addDefaultProtocol && t.startsWith("www.")) {
                         const e = t.match(/\./g);
                         e?.length >= 2 && (t = `http://${t}`);
                     }
                     if (i.tryConvertEncoding)
                         try {
                             t = (function stringToUTF8String(t) {
                                 return decodeURIComponent(escape(t));
                             })(t);
                         } catch {}
                 }
                 const n = e ? new URL(t, e) : new URL(t);
                 if (
                     (function _isValidProtocol(t) {
                         switch (t?.protocol) {
                             case "http:":
                             case "https:":
                             case "ftp:":
                             case "mailto:":
                             case "tel:":
                                 return !0;
                             default:
                                 return !1;
                         }
                     })(n)
                 )
                     return n;
             } catch {}
             return null;
         }
         function shadow(t, e, i) {
             let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
             Object.defineProperty(t, e, { value: i, enumerable: !n, configurable: !0, writable: !1 });
             return i;
         }
         const x = (function BaseExceptionClosure() {
             function BaseException(t, e) {
                 this.constructor === BaseException && unreachable("Cannot initialize BaseException.");
                 this.message = t;
                 this.name = e;
             }
             BaseException.prototype = new Error();
             BaseException.constructor = BaseException;
             return BaseException;
         })();
         class PasswordException extends x {
             constructor(t, e) {
                 super(t, "PasswordException");
                 this.code = e;
             }
         }
         class UnknownErrorException extends x {
             constructor(t, e) {
                 super(t, "UnknownErrorException");
                 this.details = e;
             }
         }
         class InvalidPDFException extends x {
             constructor(t) {
                 super(t, "InvalidPDFException");
             }
         }
         class MissingPDFException extends x {
             constructor(t) {
                 super(t, "MissingPDFException");
             }
         }
         class UnexpectedResponseException extends x {
             constructor(t, e) {
                 super(t, "UnexpectedResponseException");
                 this.status = e;
             }
         }
         class FormatError extends x {
             constructor(t) {
                 super(t, "FormatError");
             }
         }
         class AbortException extends x {
             constructor(t) {
                 super(t, "AbortException");
             }
         }
         function bytesToString(t) {
             ("object" == typeof t && void 0 !== t?.length) || unreachable("Invalid argument for bytesToString");
             const e = t.length,
                 i = 8192;
             if (e < i) return String.fromCharCode.apply(null, t);
             const n = [];
             for (let s = 0; s < e; s += i) {
                 const r = Math.min(s + i, e),
                     a = t.subarray(s, r);
                 n.push(String.fromCharCode.apply(null, a));
             }
             return n.join("");
         }
         function stringToBytes(t) {
             "string" != typeof t && unreachable("Invalid argument for stringToBytes");
             const e = t.length,
                 i = new Uint8Array(e);
             for (let n = 0; n < e; ++n) i[n] = 255 & t.charCodeAt(n);
             return i;
         }
         function string32(t) {
             return String.fromCharCode((t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, 255 & t);
         }
         function objectFromMap(t) {
             const e = Object.create(null);
             for (const [i, n] of t) e[i] = n;
             return e;
         }
         class FeatureTest {
             static get isLittleEndian() {
                 return shadow(
                     this,
                     "isLittleEndian",
                     (function isLittleEndian() {
                         const t = new Uint8Array(4);
                         t[0] = 1;
                         return 1 === new Uint32Array(t.buffer, 0, 1)[0];
                     })()
                 );
             }
             static get isEvalSupported() {
                 return shadow(
                     this,
                     "isEvalSupported",
                     (function isEvalSupported() {
                         try {
                             new Function("");
                             return !0;
                         } catch {
                             return !1;
                         }
                     })()
                 );
             }
             static get isOffscreenCanvasSupported() {
                 return shadow(this, "isOffscreenCanvasSupported", "undefined" != typeof OffscreenCanvas);
             }
             static get platform() {
                 return "undefined" != typeof navigator && "string" == typeof navigator?.platform ? shadow(this, "platform", { isMac: navigator.platform.includes("Mac") }) : shadow(this, "platform", { isMac: !1 });
             }
             static get isCSSRoundSupported() {
                 return shadow(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
             }
         }
         const _ = [...Array(256).keys()].map((t) => t.toString(16).padStart(2, "0"));
         class Util {
             static makeHexColor(t, e, i) {
                 return `#${_[t]}${_[e]}${_[i]}`;
             }
             static scaleMinMax(t, e) {
                 let i;
                 if (t[0]) {
                     if (t[0] < 0) {
                         i = e[0];
                         e[0] = e[1];
                         e[1] = i;
                     }
                     e[0] *= t[0];
                     e[1] *= t[0];
                     if (t[3] < 0) {
                         i = e[2];
                         e[2] = e[3];
                         e[3] = i;
                     }
                     e[2] *= t[3];
                     e[3] *= t[3];
                 } else {
                     i = e[0];
                     e[0] = e[2];
                     e[2] = i;
                     i = e[1];
                     e[1] = e[3];
                     e[3] = i;
                     if (t[1] < 0) {
                         i = e[2];
                         e[2] = e[3];
                         e[3] = i;
                     }
                     e[2] *= t[1];
                     e[3] *= t[1];
                     if (t[2] < 0) {
                         i = e[0];
                         e[0] = e[1];
                         e[1] = i;
                     }
                     e[0] *= t[2];
                     e[1] *= t[2];
                 }
                 e[0] += t[4];
                 e[1] += t[4];
                 e[2] += t[5];
                 e[3] += t[5];
             }
             static transform(t, e) {
                 return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]];
             }
             static applyTransform(t, e) {
                 return [t[0] * e[0] + t[1] * e[2] + e[4], t[0] * e[1] + t[1] * e[3] + e[5]];
             }
             static applyInverseTransform(t, e) {
                 const i = e[0] * e[3] - e[1] * e[2];
                 return [(t[0] * e[3] - t[1] * e[2] + e[2] * e[5] - e[4] * e[3]) / i, (-t[0] * e[1] + t[1] * e[0] + e[4] * e[1] - e[5] * e[0]) / i];
             }
             static getAxialAlignedBoundingBox(t, e) {
                 const i = this.applyTransform(t, e),
                     n = this.applyTransform(t.slice(2, 4), e),
                     s = this.applyTransform([t[0], t[3]], e),
                     r = this.applyTransform([t[2], t[1]], e);
                 return [Math.min(i[0], n[0], s[0], r[0]), Math.min(i[1], n[1], s[1], r[1]), Math.max(i[0], n[0], s[0], r[0]), Math.max(i[1], n[1], s[1], r[1])];
             }
             static inverseTransform(t) {
                 const e = t[0] * t[3] - t[1] * t[2];
                 return [t[3] / e, -t[1] / e, -t[2] / e, t[0] / e, (t[2] * t[5] - t[4] * t[3]) / e, (t[4] * t[1] - t[5] * t[0]) / e];
             }
             static singularValueDecompose2dScale(t) {
                 const e = [t[0], t[2], t[1], t[3]],
                     i = t[0] * e[0] + t[1] * e[2],
                     n = t[0] * e[1] + t[1] * e[3],
                     s = t[2] * e[0] + t[3] * e[2],
                     r = t[2] * e[1] + t[3] * e[3],
                     a = (i + r) / 2,
                     o = Math.sqrt((i + r) ** 2 - 4 * (i * r - s * n)) / 2,
                     l = a + o || 1,
                     h = a - o || 1;
                 return [Math.sqrt(l), Math.sqrt(h)];
             }
             static normalizeRect(t) {
                 const e = t.slice(0);
                 if (t[0] > t[2]) {
                     e[0] = t[2];
                     e[2] = t[0];
                 }
                 if (t[1] > t[3]) {
                     e[1] = t[3];
                     e[3] = t[1];
                 }
                 return e;
             }
             static intersect(t, e) {
                 const i = Math.max(Math.min(t[0], t[2]), Math.min(e[0], e[2])),
                     n = Math.min(Math.max(t[0], t[2]), Math.max(e[0], e[2]));
                 if (i > n) return null;
                 const s = Math.max(Math.min(t[1], t[3]), Math.min(e[1], e[3])),
                     r = Math.min(Math.max(t[1], t[3]), Math.max(e[1], e[3]));
                 return s > r ? null : [i, s, n, r];
             }
             static bezierBoundingBox(t, e, i, n, s, r, a, o) {
                 const l = [],
                     h = [[], []];
                 let c, d, u, p, g, f, m, v;
                 for (let h = 0; h < 2; ++h) {
                     if (0 === h) {
                         d = 6 * t - 12 * i + 6 * s;
                         c = -3 * t + 9 * i - 9 * s + 3 * a;
                         u = 3 * i - 3 * t;
                     } else {
                         d = 6 * e - 12 * n + 6 * r;
                         c = -3 * e + 9 * n - 9 * r + 3 * o;
                         u = 3 * n - 3 * e;
                     }
                     if (Math.abs(c) < 1e-12) {
                         if (Math.abs(d) < 1e-12) continue;
                         p = -u / d;
                         0 < p && p < 1 && l.push(p);
                     } else {
                         m = d * d - 4 * u * c;
                         v = Math.sqrt(m);
                         if (!(m < 0)) {
                             g = (-d + v) / (2 * c);
                             0 < g && g < 1 && l.push(g);
                             f = (-d - v) / (2 * c);
                             0 < f && f < 1 && l.push(f);
                         }
                     }
                 }
                 let b,
                     y = l.length;
                 const A = y;
                 for (; y--; ) {
                     p = l[y];
                     b = 1 - p;
                     h[0][y] = b * b * b * t + 3 * b * b * p * i + 3 * b * p * p * s + p * p * p * a;
                     h[1][y] = b * b * b * e + 3 * b * b * p * n + 3 * b * p * p * r + p * p * p * o;
                 }
                 h[0][A] = t;
                 h[1][A] = e;
                 h[0][A + 1] = a;
                 h[1][A + 1] = o;
                 h[0].length = h[1].length = A + 2;
                 return [Math.min(...h[0]), Math.min(...h[1]), Math.max(...h[0]), Math.max(...h[1])];
             }
         }
         function isArrayBuffer(t) {
             return "object" == typeof t && void 0 !== t?.byteLength;
         }
         class PromiseCapability {
             #Ys = !1;
             constructor() {
                 this.promise = new Promise((t, e) => {
                     this.resolve = (e) => {
                         this.#Ys = !0;
                         t(e);
                     };
                     this.reject = (t) => {
                         this.#Ys = !0;
                         e(t);
                     };
                 });
             }
             get settled() {
                 return this.#Ys;
             }
         }
         let S = null,
             C = null;
         function normalizeUnicode(t) {
             if (!S) {
                 S = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu;
                 C = new Map([["п¬…", "Еїt"]]);
             }
             return t.replaceAll(S, (t, e, i) => (e ? e.normalize("NFKC") : C.get(i)));
         }
         function getUuid() {
             if ("undefined" != typeof crypto && "function" == typeof crypto?.randomUUID) return crypto.randomUUID();
             const t = new Uint8Array(32);
             if ("undefined" != typeof crypto && "function" == typeof crypto?.getRandomValues) crypto.getRandomValues(t);
             else for (let e = 0; e < 32; e++) t[e] = Math.floor(255 * Math.random());
             return bytesToString(t);
         }
         const T = "pdfjs_internal_id_";
     },
 },
 r = {};
function __webpack_require__(t) {
 var e = r[t];
 if (void 0 !== e) return e.exports;
 var i = (r[t] = { exports: {} });
 s[t].call(i.exports, i, i.exports, __webpack_require__);
 return i.exports;
}
(t = "function" == typeof Symbol ? Symbol("webpack queues") : "__webpack_queues__"),
 (e = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__"),
 (i = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__"),
 (n = (t) => {
     if (t && t.d < 1) {
         t.d = 1;
         t.forEach((t) => t.r--);
         t.forEach((t) => (t.r-- ? t.r++ : t()));
     }
 }),
 (__webpack_require__.a = (s, r, a) => {
     var o;
     a && ((o = []).d = -1);
     var l,
         h,
         c,
         d = new Set(),
         u = s.exports,
         p = new Promise((t, e) => {
             c = e;
             h = t;
         });
     p[e] = u;
     p[t] = (t) => (o && t(o), d.forEach(t), p.catch((t) => {}));
     s.exports = p;
     r(
         (s) => {
             l = ((s) =>
                 s.map((s) => {
                     if (null !== s && "object" == typeof s) {
                         if (s[t]) return s;
                         if (s.then) {
                             var r = [];
                             r.d = 0;
                             s.then(
                                 (t) => {
                                     a[e] = t;
                                     n(r);
                                 },
                                 (t) => {
                                     a[i] = t;
                                     n(r);
                                 }
                             );
                             var a = {};
                             a[t] = (t) => t(r);
                             return a;
                         }
                     }
                     var o = {};
                     o[t] = (t) => {};
                     o[e] = s;
                     return o;
                 }))(s);
             var r,
                 getResult = () =>
                     l.map((t) => {
                         if (t[i]) throw t[i];
                         return t[e];
                     }),
                 a = new Promise((e) => {
                     (r = () => e(getResult)).r = 0;
                     var fnQueue = (t) => t !== o && !d.has(t) && (d.add(t), t && !t.d && (r.r++, t.push(r)));
                     l.map((e) => e[t](fnQueue));
                 });
             return r.r ? a : getResult();
         },
         (t) => (t ? c((p[i] = t)) : h(u), n(o))
     );
     o && o.d < 0 && (o.d = 0);
 });
__webpack_require__.d = (t, e) => {
 for (var i in e) __webpack_require__.o(e, i) && !__webpack_require__.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
};
__webpack_require__.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var a = __webpack_require__(9907),
 o = (a = globalThis.pdfjsLib = await (globalThis.pdfjsLibPromise = a)).AbortException,
 l = a.AnnotationEditorLayer,
 h = a.AnnotationEditorParamsType,
 c = a.AnnotationEditorType,
 d = a.AnnotationEditorUIManager,
 u = a.AnnotationLayer,
 p = a.AnnotationMode,
 g = a.CMapCompressionType,
 f = a.ColorPicker,
 m = a.DOMSVGFactory,
 v = a.DrawLayer,
 b = a.FeatureTest,
 y = a.GlobalWorkerOptions,
 A = a.ImageKind,
 E = a.InvalidPDFException,
 w = a.MissingPDFException,
 x = a.OPS,
 _ = a.Outliner,
 S = a.PDFDataRangeTransport,
 C = a.PDFDateString,
 T = a.PDFWorker,
 P = a.PasswordResponses,
 M = a.PermissionFlag,
 R = a.PixelsPerInch,
 k = a.PromiseCapability,
 D = a.RenderingCancelledException,
 I = a.UnexpectedResponseException,
 L = a.Util,
 O = a.VerbosityLevel,
 B = a.XfaLayer,
 N = a.build,
 U = a.createValidAbsoluteUrl,
 z = a.fetchData,
 j = a.getDocument,
 H = a.getFilenameFromUrl,
 V = a.getPdfFilenameFromUrl,
 W = a.getXfaPageViewport,
 G = a.isDataScheme,
 q = a.isPdfFile,
 $ = a.noContextMenu,
 K = a.normalizeUnicode,
 X = a.renderTextLayer,
 Y = a.setLayerDimensions,
 J = a.shadow,
 Q = a.updateTextLayer,
 Z = a.version;
export {
 o as AbortException,
 l as AnnotationEditorLayer,
 h as AnnotationEditorParamsType,
 c as AnnotationEditorType,
 d as AnnotationEditorUIManager,
 u as AnnotationLayer,
 p as AnnotationMode,
 g as CMapCompressionType,
 f as ColorPicker,
 m as DOMSVGFactory,
 v as DrawLayer,
 b as FeatureTest,
 y as GlobalWorkerOptions,
 A as ImageKind,
 E as InvalidPDFException,
 w as MissingPDFException,
 x as OPS,
 _ as Outliner,
 S as PDFDataRangeTransport,
 C as PDFDateString,
 T as PDFWorker,
 P as PasswordResponses,
 M as PermissionFlag,
 R as PixelsPerInch,
 k as PromiseCapability,
 D as RenderingCancelledException,
 I as UnexpectedResponseException,
 L as Util,
 O as VerbosityLevel,
 B as XfaLayer,
 N as build,
 U as createValidAbsoluteUrl,
 z as fetchData,
 j as getDocument,
 H as getFilenameFromUrl,
 V as getPdfFilenameFromUrl,
 W as getXfaPageViewport,
 G as isDataScheme,
 q as isPdfFile,
 $ as noContextMenu,
 K as normalizeUnicode,
 X as renderTextLayer,
 Y as setLayerDimensions,
 J as shadow,
 Q as updateTextLayer,
 Z as version,
};