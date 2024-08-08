;(function (W, y) {
  typeof exports == "object" && typeof module < "u"
    ? y(exports, require("react"))
    : typeof define == "function" && define.amd
      ? define(["exports", "react"], y)
      : ((W = typeof globalThis < "u" ? globalThis : W || self),
        y((W.components = {}), W.React))
})(this, function (W, y) {
  "use strict"
  function sa(t) {
    const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } })
    if (t) {
      for (const n in t)
        if (n !== "default") {
          const r = Object.getOwnPropertyDescriptor(t, n)
          Object.defineProperty(
            e,
            n,
            r.get ? r : { enumerable: !0, get: () => t[n] },
          )
        }
    }
    return (e.default = t), Object.freeze(e)
  }
  const Ie = sa(y)
  var Be = { exports: {} },
    Wt = {}
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var cr
  function oa() {
    if (cr) return Wt
    cr = 1
    var t = y,
      e = Symbol.for("react.element"),
      n = Symbol.for("react.fragment"),
      r = Object.prototype.hasOwnProperty,
      i =
        t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      o = { key: !0, ref: !0, __self: !0, __source: !0 }
    function s(a, l, c) {
      var u,
        d = {},
        h = null,
        p = null
      c !== void 0 && (h = "" + c),
        l.key !== void 0 && (h = "" + l.key),
        l.ref !== void 0 && (p = l.ref)
      for (u in l) r.call(l, u) && !o.hasOwnProperty(u) && (d[u] = l[u])
      if (a && a.defaultProps)
        for (u in ((l = a.defaultProps), l)) d[u] === void 0 && (d[u] = l[u])
      return {
        $$typeof: e,
        type: a,
        key: h,
        ref: p,
        props: d,
        _owner: i.current,
      }
    }
    return (Wt.Fragment = n), (Wt.jsx = s), (Wt.jsxs = s), Wt
  }
  var Kt = {}
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var ur
  function aa() {
    return (
      ur ||
        ((ur = 1),
        process.env.NODE_ENV !== "production" &&
          (function () {
            var t = y,
              e = Symbol.for("react.element"),
              n = Symbol.for("react.portal"),
              r = Symbol.for("react.fragment"),
              i = Symbol.for("react.strict_mode"),
              o = Symbol.for("react.profiler"),
              s = Symbol.for("react.provider"),
              a = Symbol.for("react.context"),
              l = Symbol.for("react.forward_ref"),
              c = Symbol.for("react.suspense"),
              u = Symbol.for("react.suspense_list"),
              d = Symbol.for("react.memo"),
              h = Symbol.for("react.lazy"),
              p = Symbol.for("react.offscreen"),
              m = Symbol.iterator,
              v = "@@iterator"
            function P(f) {
              if (f === null || typeof f != "object") return null
              var g = (m && f[m]) || f[v]
              return typeof g == "function" ? g : null
            }
            var T = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            function b(f) {
              {
                for (
                  var g = arguments.length,
                    x = new Array(g > 1 ? g - 1 : 0),
                    C = 1;
                  C < g;
                  C++
                )
                  x[C - 1] = arguments[C]
                S("error", f, x)
              }
            }
            function S(f, g, x) {
              {
                var C = T.ReactDebugCurrentFrame,
                  k = C.getStackAddendum()
                k !== "" && ((g += "%s"), (x = x.concat([k])))
                var O = x.map(function (_) {
                  return String(_)
                })
                O.unshift("Warning: " + g),
                  Function.prototype.apply.call(console[f], console, O)
              }
            }
            var A = !1,
              V = !1,
              B = !1,
              rt = !1,
              R = !1,
              H
            H = Symbol.for("react.module.reference")
            function Y(f) {
              return !!(
                typeof f == "string" ||
                typeof f == "function" ||
                f === r ||
                f === o ||
                R ||
                f === i ||
                f === c ||
                f === u ||
                rt ||
                f === p ||
                A ||
                V ||
                B ||
                (typeof f == "object" &&
                  f !== null &&
                  (f.$$typeof === h ||
                    f.$$typeof === d ||
                    f.$$typeof === s ||
                    f.$$typeof === a ||
                    f.$$typeof === l ||
                    f.$$typeof === H ||
                    f.getModuleId !== void 0))
              )
            }
            function bt(f, g, x) {
              var C = f.displayName
              if (C) return C
              var k = g.displayName || g.name || ""
              return k !== "" ? x + "(" + k + ")" : x
            }
            function oe(f) {
              return f.displayName || "Context"
            }
            function Q(f) {
              if (f == null) return null
              if (
                (typeof f.tag == "number" &&
                  b(
                    "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                  ),
                typeof f == "function")
              )
                return f.displayName || f.name || null
              if (typeof f == "string") return f
              switch (f) {
                case r:
                  return "Fragment"
                case n:
                  return "Portal"
                case o:
                  return "Profiler"
                case i:
                  return "StrictMode"
                case c:
                  return "Suspense"
                case u:
                  return "SuspenseList"
              }
              if (typeof f == "object")
                switch (f.$$typeof) {
                  case a:
                    var g = f
                    return oe(g) + ".Consumer"
                  case s:
                    var x = f
                    return oe(x._context) + ".Provider"
                  case l:
                    return bt(f, f.render, "ForwardRef")
                  case d:
                    var C = f.displayName || null
                    return C !== null ? C : Q(f.type) || "Memo"
                  case h: {
                    var k = f,
                      O = k._payload,
                      _ = k._init
                    try {
                      return Q(_(O))
                    } catch {
                      return null
                    }
                  }
                }
              return null
            }
            var it = Object.assign,
              F = 0,
              tt,
              Ft,
              It,
              No,
              Wo,
              Ko,
              Uo
            function $o() {}
            $o.__reactDisabledLog = !0
            function Rf() {
              {
                if (F === 0) {
                  ;(tt = console.log),
                    (Ft = console.info),
                    (It = console.warn),
                    (No = console.error),
                    (Wo = console.group),
                    (Ko = console.groupCollapsed),
                    (Uo = console.groupEnd)
                  var f = {
                    configurable: !0,
                    enumerable: !0,
                    value: $o,
                    writable: !0,
                  }
                  Object.defineProperties(console, {
                    info: f,
                    log: f,
                    warn: f,
                    error: f,
                    group: f,
                    groupCollapsed: f,
                    groupEnd: f,
                  })
                }
                F++
              }
            }
            function _f() {
              {
                if ((F--, F === 0)) {
                  var f = { configurable: !0, enumerable: !0, writable: !0 }
                  Object.defineProperties(console, {
                    log: it({}, f, { value: tt }),
                    info: it({}, f, { value: Ft }),
                    warn: it({}, f, { value: It }),
                    error: it({}, f, { value: No }),
                    group: it({}, f, { value: Wo }),
                    groupCollapsed: it({}, f, { value: Ko }),
                    groupEnd: it({}, f, { value: Uo }),
                  })
                }
                F < 0 &&
                  b(
                    "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                  )
              }
            }
            var tr = T.ReactCurrentDispatcher,
              er
            function Oe(f, g, x) {
              {
                if (er === void 0)
                  try {
                    throw Error()
                  } catch (k) {
                    var C = k.stack.trim().match(/\n( *(at )?)/)
                    er = (C && C[1]) || ""
                  }
                return (
                  `
` +
                  er +
                  f
                )
              }
            }
            var nr = !1,
              je
            {
              var Df = typeof WeakMap == "function" ? WeakMap : Map
              je = new Df()
            }
            function zo(f, g) {
              if (!f || nr) return ""
              {
                var x = je.get(f)
                if (x !== void 0) return x
              }
              var C
              nr = !0
              var k = Error.prepareStackTrace
              Error.prepareStackTrace = void 0
              var O
              ;(O = tr.current), (tr.current = null), Rf()
              try {
                if (g) {
                  var _ = function () {
                    throw Error()
                  }
                  if (
                    (Object.defineProperty(_.prototype, "props", {
                      set: function () {
                        throw Error()
                      },
                    }),
                    typeof Reflect == "object" && Reflect.construct)
                  ) {
                    try {
                      Reflect.construct(_, [])
                    } catch (X) {
                      C = X
                    }
                    Reflect.construct(f, [], _)
                  } else {
                    try {
                      _.call()
                    } catch (X) {
                      C = X
                    }
                    f.call(_.prototype)
                  }
                } else {
                  try {
                    throw Error()
                  } catch (X) {
                    C = X
                  }
                  f()
                }
              } catch (X) {
                if (X && C && typeof X.stack == "string") {
                  for (
                    var E = X.stack.split(`
`),
                      G = C.stack.split(`
`),
                      I = E.length - 1,
                      N = G.length - 1;
                    I >= 1 && N >= 0 && E[I] !== G[N];

                  )
                    N--
                  for (; I >= 1 && N >= 0; I--, N--)
                    if (E[I] !== G[N]) {
                      if (I !== 1 || N !== 1)
                        do
                          if ((I--, N--, N < 0 || E[I] !== G[N])) {
                            var et =
                              `
` + E[I].replace(" at new ", " at ")
                            return (
                              f.displayName &&
                                et.includes("<anonymous>") &&
                                (et = et.replace("<anonymous>", f.displayName)),
                              typeof f == "function" && je.set(f, et),
                              et
                            )
                          }
                        while (I >= 1 && N >= 0)
                      break
                    }
                }
              } finally {
                ;(nr = !1),
                  (tr.current = O),
                  _f(),
                  (Error.prepareStackTrace = k)
              }
              var Nt = f ? f.displayName || f.name : "",
                At = Nt ? Oe(Nt) : ""
              return typeof f == "function" && je.set(f, At), At
            }
            function kf(f, g, x) {
              return zo(f, !1)
            }
            function Mf(f) {
              var g = f.prototype
              return !!(g && g.isReactComponent)
            }
            function Le(f, g, x) {
              if (f == null) return ""
              if (typeof f == "function") return zo(f, Mf(f))
              if (typeof f == "string") return Oe(f)
              switch (f) {
                case c:
                  return Oe("Suspense")
                case u:
                  return Oe("SuspenseList")
              }
              if (typeof f == "object")
                switch (f.$$typeof) {
                  case l:
                    return kf(f.render)
                  case d:
                    return Le(f.type, g, x)
                  case h: {
                    var C = f,
                      k = C._payload,
                      O = C._init
                    try {
                      return Le(O(k), g, x)
                    } catch {}
                  }
                }
              return ""
            }
            var ae = Object.prototype.hasOwnProperty,
              Ho = {},
              Go = T.ReactDebugCurrentFrame
            function Fe(f) {
              if (f) {
                var g = f._owner,
                  x = Le(f.type, f._source, g ? g.type : null)
                Go.setExtraStackFrame(x)
              } else Go.setExtraStackFrame(null)
            }
            function Of(f, g, x, C, k) {
              {
                var O = Function.call.bind(ae)
                for (var _ in f)
                  if (O(f, _)) {
                    var E = void 0
                    try {
                      if (typeof f[_] != "function") {
                        var G = Error(
                          (C || "React class") +
                            ": " +
                            x +
                            " type `" +
                            _ +
                            "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                            typeof f[_] +
                            "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                        )
                        throw ((G.name = "Invariant Violation"), G)
                      }
                      E = f[_](
                        g,
                        _,
                        C,
                        x,
                        null,
                        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                      )
                    } catch (I) {
                      E = I
                    }
                    E &&
                      !(E instanceof Error) &&
                      (Fe(k),
                      b(
                        "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                        C || "React class",
                        x,
                        _,
                        typeof E,
                      ),
                      Fe(null)),
                      E instanceof Error &&
                        !(E.message in Ho) &&
                        ((Ho[E.message] = !0),
                        Fe(k),
                        b("Failed %s type: %s", x, E.message),
                        Fe(null))
                  }
              }
            }
            var jf = Array.isArray
            function rr(f) {
              return jf(f)
            }
            function Lf(f) {
              {
                var g = typeof Symbol == "function" && Symbol.toStringTag,
                  x =
                    (g && f[Symbol.toStringTag]) ||
                    f.constructor.name ||
                    "Object"
                return x
              }
            }
            function Ff(f) {
              try {
                return Yo(f), !1
              } catch {
                return !0
              }
            }
            function Yo(f) {
              return "" + f
            }
            function Xo(f) {
              if (Ff(f))
                return (
                  b(
                    "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                    Lf(f),
                  ),
                  Yo(f)
                )
            }
            var le = T.ReactCurrentOwner,
              If = { key: !0, ref: !0, __self: !0, __source: !0 },
              qo,
              Zo,
              ir
            ir = {}
            function Bf(f) {
              if (ae.call(f, "ref")) {
                var g = Object.getOwnPropertyDescriptor(f, "ref").get
                if (g && g.isReactWarning) return !1
              }
              return f.ref !== void 0
            }
            function Nf(f) {
              if (ae.call(f, "key")) {
                var g = Object.getOwnPropertyDescriptor(f, "key").get
                if (g && g.isReactWarning) return !1
              }
              return f.key !== void 0
            }
            function Wf(f, g) {
              if (
                typeof f.ref == "string" &&
                le.current &&
                g &&
                le.current.stateNode !== g
              ) {
                var x = Q(le.current.type)
                ir[x] ||
                  (b(
                    'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                    Q(le.current.type),
                    f.ref,
                  ),
                  (ir[x] = !0))
              }
            }
            function Kf(f, g) {
              {
                var x = function () {
                  qo ||
                    ((qo = !0),
                    b(
                      "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                      g,
                    ))
                }
                ;(x.isReactWarning = !0),
                  Object.defineProperty(f, "key", { get: x, configurable: !0 })
              }
            }
            function Uf(f, g) {
              {
                var x = function () {
                  Zo ||
                    ((Zo = !0),
                    b(
                      "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                      g,
                    ))
                }
                ;(x.isReactWarning = !0),
                  Object.defineProperty(f, "ref", { get: x, configurable: !0 })
              }
            }
            var $f = function (f, g, x, C, k, O, _) {
              var E = {
                $$typeof: e,
                type: f,
                key: g,
                ref: x,
                props: _,
                _owner: O,
              }
              return (
                (E._store = {}),
                Object.defineProperty(E._store, "validated", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !0,
                  value: !1,
                }),
                Object.defineProperty(E, "_self", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !1,
                  value: C,
                }),
                Object.defineProperty(E, "_source", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !1,
                  value: k,
                }),
                Object.freeze && (Object.freeze(E.props), Object.freeze(E)),
                E
              )
            }
            function zf(f, g, x, C, k) {
              {
                var O,
                  _ = {},
                  E = null,
                  G = null
                x !== void 0 && (Xo(x), (E = "" + x)),
                  Nf(g) && (Xo(g.key), (E = "" + g.key)),
                  Bf(g) && ((G = g.ref), Wf(g, k))
                for (O in g)
                  ae.call(g, O) && !If.hasOwnProperty(O) && (_[O] = g[O])
                if (f && f.defaultProps) {
                  var I = f.defaultProps
                  for (O in I) _[O] === void 0 && (_[O] = I[O])
                }
                if (E || G) {
                  var N =
                    typeof f == "function"
                      ? f.displayName || f.name || "Unknown"
                      : f
                  E && Kf(_, N), G && Uf(_, N)
                }
                return $f(f, E, G, k, C, le.current, _)
              }
            }
            var sr = T.ReactCurrentOwner,
              Jo = T.ReactDebugCurrentFrame
            function Bt(f) {
              if (f) {
                var g = f._owner,
                  x = Le(f.type, f._source, g ? g.type : null)
                Jo.setExtraStackFrame(x)
              } else Jo.setExtraStackFrame(null)
            }
            var or
            or = !1
            function ar(f) {
              return typeof f == "object" && f !== null && f.$$typeof === e
            }
            function Qo() {
              {
                if (sr.current) {
                  var f = Q(sr.current.type)
                  if (f)
                    return (
                      `

Check the render method of \`` +
                      f +
                      "`."
                    )
                }
                return ""
              }
            }
            function Hf(f) {
              return ""
            }
            var ta = {}
            function Gf(f) {
              {
                var g = Qo()
                if (!g) {
                  var x = typeof f == "string" ? f : f.displayName || f.name
                  x &&
                    (g =
                      `

Check the top-level render call using <` +
                      x +
                      ">.")
                }
                return g
              }
            }
            function ea(f, g) {
              {
                if (!f._store || f._store.validated || f.key != null) return
                f._store.validated = !0
                var x = Gf(g)
                if (ta[x]) return
                ta[x] = !0
                var C = ""
                f &&
                  f._owner &&
                  f._owner !== sr.current &&
                  (C = " It was passed a child from " + Q(f._owner.type) + "."),
                  Bt(f),
                  b(
                    'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                    x,
                    C,
                  ),
                  Bt(null)
              }
            }
            function na(f, g) {
              {
                if (typeof f != "object") return
                if (rr(f))
                  for (var x = 0; x < f.length; x++) {
                    var C = f[x]
                    ar(C) && ea(C, g)
                  }
                else if (ar(f)) f._store && (f._store.validated = !0)
                else if (f) {
                  var k = P(f)
                  if (typeof k == "function" && k !== f.entries)
                    for (var O = k.call(f), _; !(_ = O.next()).done; )
                      ar(_.value) && ea(_.value, g)
                }
              }
            }
            function Yf(f) {
              {
                var g = f.type
                if (g == null || typeof g == "string") return
                var x
                if (typeof g == "function") x = g.propTypes
                else if (
                  typeof g == "object" &&
                  (g.$$typeof === l || g.$$typeof === d)
                )
                  x = g.propTypes
                else return
                if (x) {
                  var C = Q(g)
                  Of(x, f.props, "prop", C, f)
                } else if (g.PropTypes !== void 0 && !or) {
                  or = !0
                  var k = Q(g)
                  b(
                    "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                    k || "Unknown",
                  )
                }
                typeof g.getDefaultProps == "function" &&
                  !g.getDefaultProps.isReactClassApproved &&
                  b(
                    "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                  )
              }
            }
            function Xf(f) {
              {
                for (var g = Object.keys(f.props), x = 0; x < g.length; x++) {
                  var C = g[x]
                  if (C !== "children" && C !== "key") {
                    Bt(f),
                      b(
                        "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                        C,
                      ),
                      Bt(null)
                    break
                  }
                }
                f.ref !== null &&
                  (Bt(f),
                  b("Invalid attribute `ref` supplied to `React.Fragment`."),
                  Bt(null))
              }
            }
            var ra = {}
            function ia(f, g, x, C, k, O) {
              {
                var _ = Y(f)
                if (!_) {
                  var E = ""
                  ;(f === void 0 ||
                    (typeof f == "object" &&
                      f !== null &&
                      Object.keys(f).length === 0)) &&
                    (E +=
                      " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.")
                  var G = Hf()
                  G ? (E += G) : (E += Qo())
                  var I
                  f === null
                    ? (I = "null")
                    : rr(f)
                      ? (I = "array")
                      : f !== void 0 && f.$$typeof === e
                        ? ((I = "<" + (Q(f.type) || "Unknown") + " />"),
                          (E =
                            " Did you accidentally export a JSX literal instead of a component?"))
                        : (I = typeof f),
                    b(
                      "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                      I,
                      E,
                    )
                }
                var N = zf(f, g, x, k, O)
                if (N == null) return N
                if (_) {
                  var et = g.children
                  if (et !== void 0)
                    if (C)
                      if (rr(et)) {
                        for (var Nt = 0; Nt < et.length; Nt++) na(et[Nt], f)
                        Object.freeze && Object.freeze(et)
                      } else
                        b(
                          "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                        )
                    else na(et, f)
                }
                if (ae.call(g, "key")) {
                  var At = Q(f),
                    X = Object.keys(g).filter(function (eh) {
                      return eh !== "key"
                    }),
                    lr =
                      X.length > 0
                        ? "{key: someKey, " + X.join(": ..., ") + ": ...}"
                        : "{key: someKey}"
                  if (!ra[At + lr]) {
                    var th =
                      X.length > 0 ? "{" + X.join(": ..., ") + ": ...}" : "{}"
                    b(
                      `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                      lr,
                      At,
                      th,
                      At,
                    ),
                      (ra[At + lr] = !0)
                  }
                }
                return f === r ? Xf(N) : Yf(N), N
              }
            }
            function qf(f, g, x) {
              return ia(f, g, x, !0)
            }
            function Zf(f, g, x) {
              return ia(f, g, x, !1)
            }
            var Jf = Zf,
              Qf = qf
            ;(Kt.Fragment = r), (Kt.jsx = Jf), (Kt.jsxs = Qf)
          })()),
      Kt
    )
  }
  process.env.NODE_ENV === "production"
    ? (Be.exports = oa())
    : (Be.exports = aa())
  var D = Be.exports
  function ce(t) {
    return typeof t == "object" && t != null && !Array.isArray(t)
  }
  function dr(t) {
    return Object.fromEntries(
      Object.entries(t ?? {}).filter(([e, n]) => n !== void 0),
    )
  }
  var la = (t) => t === "base"
  function ca(t) {
    return t.slice().filter((e) => !la(e))
  }
  function fr(t) {
    return String.fromCharCode(t + (t > 25 ? 39 : 97))
  }
  function ua(t) {
    let e = "",
      n
    for (n = Math.abs(t); n > 52; n = (n / 52) | 0) e = fr(n % 52) + e
    return fr(n % 52) + e
  }
  function da(t, e) {
    let n = e.length
    for (; n; ) t = (t * 33) ^ e.charCodeAt(--n)
    return t
  }
  function fa(t) {
    return ua(da(5381, t) >>> 0)
  }
  var hr = /\s*!(important)?/i
  function ha(t) {
    return typeof t == "string" ? hr.test(t) : !1
  }
  function pa(t) {
    return typeof t == "string" ? t.replace(hr, "").trim() : t
  }
  function Ne(t) {
    return typeof t == "string" ? t.replaceAll(" ", "_") : t
  }
  var Et = (t) => {
    const e = new Map()
    return (...r) => {
      const i = JSON.stringify(r)
      if (e.has(i)) return e.get(i)
      const o = t(...r)
      return e.set(i, o), o
    }
  }
  function pr(...t) {
    return t.filter(Boolean).reduce(
      (n, r) => (
        Object.keys(r).forEach((i) => {
          const o = n[i],
            s = r[i]
          ce(o) && ce(s) ? (n[i] = pr(o, s)) : (n[i] = s)
        }),
        n
      ),
      {},
    )
  }
  var ma = (t) => t != null
  function mr(t, e, n = {}) {
    const { stop: r, getKey: i } = n
    function o(s, a = []) {
      if (ce(s) || Array.isArray(s)) {
        const l = {}
        for (const [c, u] of Object.entries(s)) {
          const d = (i == null ? void 0 : i(c, u)) ?? c,
            h = [...a, d]
          if (r != null && r(s, h)) return e(s, a)
          const p = o(u, h)
          ma(p) && (l[d] = p)
        }
        return l
      }
      return e(s, a)
    }
    return o(t)
  }
  function ga(t, e) {
    return t.reduce((n, r, i) => {
      const o = e[i]
      return r != null && (n[o] = r), n
    }, {})
  }
  function gr(t, e, n = !0) {
    const { utility: r, conditions: i } = e,
      { hasShorthand: o, resolveShorthand: s } = r
    return mr(t, (a) => (Array.isArray(a) ? ga(a, i.breakpoints.keys) : a), {
      stop: (a) => Array.isArray(a),
      getKey: n ? (a) => (o ? s(a) : a) : void 0,
    })
  }
  var ya = { shift: (t) => t, finalize: (t) => t, breakpoints: { keys: [] } },
    va = (t) => (typeof t == "string" ? t.replaceAll(/[\n\s]+/g, " ") : t)
  function yr(t) {
    const { utility: e, hash: n, conditions: r = ya } = t,
      i = (s) => [e.prefix, s].filter(Boolean).join("-"),
      o = (s, a) => {
        let l
        if (n) {
          const c = [...r.finalize(s), a]
          l = i(e.toHash(c, fa))
        } else l = [...r.finalize(s), i(a)].join(":")
        return l
      }
    return Et(({ base: s, ...a } = {}) => {
      const l = Object.assign(a, s),
        c = gr(l, t),
        u = new Set()
      return (
        mr(c, (d, h) => {
          const p = ha(d)
          if (d == null) return
          const [m, ...v] = r.shift(h),
            P = ca(v),
            T = e.transform(m, pa(va(d)))
          let b = o(P, T.className)
          p && (b = `${b}!`), u.add(b)
        }),
        Array.from(u).join(" ")
      )
    })
  }
  function ba(...t) {
    return t.flat().filter((e) => ce(e) && Object.keys(dr(e)).length > 0)
  }
  function xa(t) {
    function e(i) {
      const o = ba(...i)
      return o.length === 1 ? o : o.map((s) => gr(s, t))
    }
    function n(...i) {
      return pr(...e(i))
    }
    function r(...i) {
      return Object.assign({}, ...e(i))
    }
    return { mergeCss: Et(n), assignCss: r }
  }
  var Ta = /([A-Z])/g,
    Pa = /^ms-/,
    Sa = Et((t) =>
      t.startsWith("--")
        ? t
        : t.replace(Ta, "-$1").replace(Pa, "-ms-").toLowerCase(),
    ),
    wa =
      "cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%"
  ;`${wa.split(",").join("|")}`
  function ue(t, ...e) {
    const n = Object.getOwnPropertyDescriptors(t),
      r = Object.keys(n),
      i = (s) => {
        const a = {}
        for (let l = 0; l < s.length; l++) {
          const c = s[l]
          n[c] && (Object.defineProperty(a, c, n[c]), delete n[c])
        }
        return a
      },
      o = (s) => i(Array.isArray(s) ? s : r.filter(s))
    return e.map(o).concat(i(r))
  }
  var vr = (...t) =>
    t.filter(Boolean).reduce((e, n) => Array.from(new Set([...e, ...n])), [])
  const Ca =
      "_light,_dark,_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_default,_optional,_open,_closed,_fullscreen,_loading,_currentPage,_currentStep,_motionReduce,_motionSafe,_print,_landscape,_portrait,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_starting,base",
    br = new Set(Ca.split(","))
  function xr(t) {
    return br.has(t) || /^@|&|&$/.test(t)
  }
  const Aa = /^_/,
    Ea = /&|@/
  function Tr(t) {
    return t.map((e) =>
      br.has(e) ? e.replace(Aa, "") : Ea.test(e) ? `[${Ne(e.trim())}]` : e,
    )
  }
  function Pr(t) {
    return t.sort((e, n) => {
      const r = xr(e),
        i = xr(n)
      return r && !i ? 1 : !r && i ? -1 : 0
    })
  }
  const Va =
      "aspectRatio:aspect,boxDecorationBreak:decoration,zIndex:z,boxSizing:box,objectPosition:obj-pos,objectFit:obj-fit,overscrollBehavior:overscroll,overscrollBehaviorX:overscroll-x,overscrollBehaviorY:overscroll-y,position:pos/1,top:top,left:left,insetInline:inset-x/insetX,insetBlock:inset-y/insetY,inset:inset,insetBlockEnd:inset-b,insetBlockStart:inset-t,insetInlineEnd:end/insetEnd/1,insetInlineStart:start/insetStart/1,right:right,bottom:bottom,float:float,visibility:vis,display:d,hideFrom:hide,hideBelow:show,flexBasis:basis,flex:flex,flexDirection:flex/flexDir,flexGrow:grow,flexShrink:shrink,gridTemplateColumns:grid-cols,gridTemplateRows:grid-rows,gridColumn:col-span,gridRow:row-span,gridColumnStart:col-start,gridColumnEnd:col-end,gridAutoFlow:grid-flow,gridAutoColumns:auto-cols,gridAutoRows:auto-rows,gap:gap,gridGap:gap,gridRowGap:gap-x,gridColumnGap:gap-y,rowGap:gap-x,columnGap:gap-y,justifyContent:justify,alignContent:content,alignItems:items,alignSelf:self,padding:p/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,paddingBottom:pb/1,paddingBlock:py/1/paddingY,paddingBlockEnd:pb,paddingBlockStart:pt,paddingInline:px/paddingX/1,paddingInlineEnd:pe/1/paddingEnd,paddingInlineStart:ps/1/paddingStart,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,marginBottom:mb/1,margin:m/1,marginBlock:my/1/marginY,marginBlockEnd:mb,marginBlockStart:mt,marginInline:mx/1/marginX,marginInlineEnd:me/1/marginEnd,marginInlineStart:ms/1/marginStart,spaceX:space-x,spaceY:space-y,outlineWidth:ring-width/ringWidth,outlineColor:ring-color/ringColor,outline:ring/1,outlineOffset:ring-offset/ringOffset,divideX:divide-x,divideY:divide-y,divideColor:divide-color,divideStyle:divide-style,inlineSize:w,minInlineSize:min-w,maxWidth:max-w/maxW,maxInlineSize:max-w,blockSize:h,minBlockSize:min-h,maxHeight:max-h/maxH,maxBlockSize:max-b,fontFamily:font,fontSize:fs,fontWeight:fw,fontSmoothing:smoothing,fontVariantNumeric:numeric,letterSpacing:tracking,lineHeight:leading,textAlign:text-align,textDecoration:text-decor,textDecorationColor:text-decor-color,textEmphasisColor:text-emphasis-color,textDecorationStyle:decoration-style,textDecorationThickness:decoration-thickness,textUnderlineOffset:underline-offset,textTransform:text-transform,textIndent:indent,textShadow:text-shadow,textShadowColor:text-shadow/textShadowColor,textOverflow:text-overflow,verticalAlign:v-align,wordBreak:break,textWrap:text-wrap,truncate:truncate,lineClamp:clamp,listStyleType:list-type,listStylePosition:list-pos,listStyleImage:list-img,backgroundPosition:bg-pos/bgPosition,backgroundPositionX:bg-pos-x/bgPositionX,backgroundPositionY:bg-pos-y/bgPositionY,backgroundAttachment:bg-attach/bgAttachment,backgroundClip:bg-clip/bgClip,background:bg/1,backgroundColor:bg/bgColor,backgroundOrigin:bg-origin/bgOrigin,backgroundImage:bg-img/bgImage,backgroundRepeat:bg-repeat/bgRepeat,backgroundBlendMode:bg-blend/bgBlendMode,backgroundSize:bg-size/bgSize,backgroundGradient:bg-gradient/bgGradient,textGradient:text-gradient,gradientFromPosition:gradient-from-pos,gradientToPosition:gradient-to-pos,gradientFrom:gradient-from,gradientTo:gradient-to,gradientVia:gradient-via,gradientViaPosition:gradient-via-pos,borderRadius:rounded/1,borderTopLeftRadius:rounded-tl/roundedTopLeft,borderTopRightRadius:rounded-tr/roundedTopRight,borderBottomRightRadius:rounded-br/roundedBottomRight,borderBottomLeftRadius:rounded-bl/roundedBottomLeft,borderTopRadius:rounded-t/roundedTop,borderRightRadius:rounded-r/roundedRight,borderBottomRadius:rounded-b/roundedBottom,borderLeftRadius:rounded-l/roundedLeft,borderStartStartRadius:rounded-ss/roundedStartStart,borderStartEndRadius:rounded-se/roundedStartEnd,borderStartRadius:rounded-s/roundedStart,borderEndStartRadius:rounded-es/roundedEndStart,borderEndEndRadius:rounded-ee/roundedEndEnd,borderEndRadius:rounded-e/roundedEnd,border:border,borderWidth:border-w,borderTopWidth:border-tw,borderLeftWidth:border-lw,borderRightWidth:border-rw,borderBottomWidth:border-bw,borderColor:border,borderInline:border-x/borderX,borderInlineWidth:border-x/borderXWidth,borderInlineColor:border-x/borderXColor,borderBlock:border-y/borderY,borderBlockWidth:border-y/borderYWidth,borderBlockColor:border-y/borderYColor,borderLeft:border-l,borderLeftColor:border-l,borderInlineStart:border-s/borderStart,borderInlineStartWidth:border-s/borderStartWidth,borderInlineStartColor:border-s/borderStartColor,borderRight:border-r,borderRightColor:border-r,borderInlineEnd:border-e/borderEnd,borderInlineEndWidth:border-e/borderEndWidth,borderInlineEndColor:border-e/borderEndColor,borderTop:border-t,borderTopColor:border-t,borderBottom:border-b,borderBottomColor:border-b,borderBlockEnd:border-be,borderBlockEndColor:border-be,borderBlockStart:border-bs,borderBlockStartColor:border-bs,boxShadow:shadow/1,boxShadowColor:shadow-color/shadowColor,mixBlendMode:mix-blend,filter:filter,brightness:brightness,contrast:contrast,grayscale:grayscale,hueRotate:hue-rotate,invert:invert,saturate:saturate,sepia:sepia,dropShadow:drop-shadow,blur:blur,backdropFilter:backdrop,backdropBlur:backdrop-blur,backdropBrightness:backdrop-brightness,backdropContrast:backdrop-contrast,backdropGrayscale:backdrop-grayscale,backdropHueRotate:backdrop-hue-rotate,backdropInvert:backdrop-invert,backdropOpacity:backdrop-opacity,backdropSaturate:backdrop-saturate,backdropSepia:backdrop-sepia,borderCollapse:border,borderSpacing:border-spacing,borderSpacingX:border-spacing-x,borderSpacingY:border-spacing-y,tableLayout:table,transitionTimingFunction:ease,transitionDelay:delay,transitionDuration:duration,transitionProperty:transition-prop,transition:transition,animation:animation,animationName:animation-name,animationTimingFunction:animation-ease,animationDuration:animation-duration,animationDelay:animation-delay,transformOrigin:origin,rotate:rotate,rotateX:rotate-x,rotateY:rotate-y,rotateZ:rotate-z,scale:scale,scaleX:scale-x,scaleY:scale-y,translate:translate,translateX:translate-x/x,translateY:translate-y/y,translateZ:translate-z/z,accentColor:accent,caretColor:caret,scrollBehavior:scroll,scrollbar:scrollbar,scrollMargin:scroll-m,scrollMarginLeft:scroll-ml,scrollMarginRight:scroll-mr,scrollMarginTop:scroll-mt,scrollMarginBottom:scroll-mb,scrollMarginBlock:scroll-my/scrollMarginY,scrollMarginBlockEnd:scroll-mb,scrollMarginBlockStart:scroll-mt,scrollMarginInline:scroll-mx/scrollMarginX,scrollMarginInlineEnd:scroll-me,scrollMarginInlineStart:scroll-ms,scrollPadding:scroll-p,scrollPaddingBlock:scroll-pb/scrollPaddingY,scrollPaddingBlockStart:scroll-pt,scrollPaddingBlockEnd:scroll-pb,scrollPaddingInline:scroll-px/scrollPaddingX,scrollPaddingInlineEnd:scroll-pe,scrollPaddingInlineStart:scroll-ps,scrollPaddingLeft:scroll-pl,scrollPaddingRight:scroll-pr,scrollPaddingTop:scroll-pt,scrollPaddingBottom:scroll-pb,scrollSnapAlign:snap-align,scrollSnapStop:snap-stop,scrollSnapType:snap-type,scrollSnapStrictness:snap-strictness,scrollSnapMargin:snap-m,scrollSnapMarginTop:snap-mt,scrollSnapMarginBottom:snap-mb,scrollSnapMarginLeft:snap-ml,scrollSnapMarginRight:snap-mr,touchAction:touch,userSelect:select,fill:fill,stroke:stroke,strokeWidth:stroke-w,srOnly:sr,debug:debug,appearance:appearance,backfaceVisibility:backface,clipPath:clip-path,hyphens:hyphens,mask:mask,maskImage:mask-image,maskSize:mask-size,textSizeAdjust:text-adjust,container:cq,containerName:cq-name,containerType:cq-type,textStyle:textStyle",
    Sr = new Map(),
    wr = new Map()
  Va.split(",").forEach((t) => {
    const [e, n] = t.split(":"),
      [r, ...i] = n.split("/")
    Sr.set(e, r),
      i.length &&
        i.forEach((o) => {
          wr.set(o === "1" ? r : o, e)
        })
  })
  const Cr = (t) => wr.get(t) || t,
    Ar = {
      conditions: { shift: Pr, finalize: Tr, breakpoints: { keys: ["base"] } },
      utility: {
        transform: (t, e) => {
          const n = Cr(t)
          return { className: `${Sr.get(n) || Sa(n)}_${Ne(e)}` }
        },
        hasShorthand: !0,
        toHash: (t, e) => e(t.join(":")),
        resolveShorthand: Cr,
      },
    },
    Ra = yr(Ar),
    Ut = (...t) => Ra(We(...t))
  Ut.raw = (...t) => We(...t)
  const { mergeCss: We, assignCss: nh } = xa(Ar)
  function Er(t, e) {
    let n = {}
    return (
      t.forEach((r) => {
        Object.entries(r).every(([o, s]) =>
          o === "css"
            ? !0
            : (Array.isArray(s) ? s : [s]).some((l) => e[o] === l),
        ) && (n = We(n, r.css))
      }),
      n
    )
  }
  function _a(t, e, n, r) {
    if (e.length > 0 && typeof (n == null ? void 0 : n[r]) == "object")
      throw new Error(
        `[recipe:${t}:${r}] Conditions are not supported when using compound variants.`,
      )
  }
  function xt() {
    let t = "",
      e = 0,
      n
    for (; e < arguments.length; )
      (n = arguments[e++]) &&
        typeof n == "string" &&
        (t && (t += " "), (t += n))
    return t
  }
  const Ke = (t, e, n) => {
      const r = (o) => ({ [t]: "__ignore__", ...e, ...dr(o) })
      return {
        recipeFn: (o, s = !0) => {
          const l = yr({
              conditions: {
                shift: Pr,
                finalize: Tr,
                breakpoints: { keys: ["base"] },
              },
              utility: {
                toHash: (u, d) => d(u.join(":")),
                transform: (u, d) => (
                  _a(t, n, o, u),
                  d === "__ignore__"
                    ? { className: t }
                    : ((d = Ne(d)), { className: `${t}--${u}_${d}` })
                ),
              },
            }),
            c = r(o)
          if (s) {
            const u = Er(n, c)
            return xt(l(c), Ut(u))
          }
          return l(c)
        },
        getVariantProps: r,
        __getCompoundVariantCss__: (o) => Er(n, r(o)),
      }
    },
    Ue = (t, e) => {
      if (t && !e) return t
      if (!t && e) return e
      const n = (...o) => xt(t(...o), e(...o)),
        r = vr(t.variantKeys, e.variantKeys),
        i = r.reduce(
          (o, s) => ((o[s] = vr(t.variantMap[s], e.variantMap[s])), o),
          {},
        )
      return Object.assign(n, {
        __recipe__: !0,
        __name__: `${t.__name__} ${e.__name__}`,
        raw: (o) => o,
        variantKeys: r,
        variantMap: i,
        splitVariantProps(o) {
          return ue(o, r)
        },
      })
    },
    $e = Ke("button", { size: "medium", variant: "primary", br: "normal" }, []),
    Vr = {
      size: ["small", "medium", "large"],
      br: ["normal", "rounded"],
      variant: ["primary", "text"],
    },
    Rr = Object.keys(Vr),
    Da = Object.assign(Et($e.recipeFn), {
      __recipe__: !0,
      __name__: "button",
      __getCompoundVariantCss__: $e.__getCompoundVariantCss__,
      raw: (t) => t,
      variantKeys: Rr,
      variantMap: Vr,
      merge(t) {
        return Ue(this, t)
      },
      splitVariantProps(t) {
        return ue(t, Rr)
      },
      getVariantProps: $e.getVariantProps,
    }),
    ze = Ke("tagButton", { size: "small" }, []),
    _r = { size: ["small", "large"] },
    Dr = Object.keys(_r),
    ka = Object.assign(Et(ze.recipeFn), {
      __recipe__: !0,
      __name__: "tagButton",
      __getCompoundVariantCss__: ze.__getCompoundVariantCss__,
      raw: (t) => t,
      variantKeys: Dr,
      variantMap: _r,
      merge(t) {
        return Ue(this, t)
      },
      splitVariantProps(t) {
        return ue(t, Dr)
      },
      getVariantProps: ze.getVariantProps,
    }),
    He = Ke("accordion", {}, []),
    kr = {},
    Mr = Object.keys(kr),
    Or = Object.assign(Et(He.recipeFn), {
      __recipe__: !0,
      __name__: "accordion",
      __getCompoundVariantCss__: He.__getCompoundVariantCss__,
      raw: (t) => t,
      variantKeys: Mr,
      variantMap: kr,
      merge(t) {
        return Ue(this, t)
      },
      splitVariantProps(t) {
        return ue(t, Mr)
      },
      getVariantProps: He.getVariantProps,
    }),
    Ma = ({ children: t }) => D.jsx(D.Fragment, { children: t })
  function jr(t, e) {
    const n = { ...e }
    for (const r in e) {
      const [i, o] = [t[r], e[r]]
      ;/^on[A-Z]/.test(r) &&
        (i && o
          ? (n[r] = (...a) => {
              o(...a), i(...a)
            })
          : i && (n[r] = i)),
        r === "style" && (n[r] = { ...i, ...o }),
        r === "className" && (n[r] = [i, o].filter(Boolean).join(" "))
    }
    return { ...t, ...n }
  }
  function Oa(t) {
    return y.isValidElement(t) && t.type === Ma
  }
  const ja = (t, e) => {
      typeof t == "function" ? t(e) : t != null && (t.current = e)
    },
    Lr =
      (...t) =>
      (e) =>
        t.forEach((n) => ja(n, e)),
    Ge = y.forwardRef((t, e) => {
      const { children: n, ...r } = t,
        i = y.Children.toArray(n),
        o = i.find(Oa)
      if (o) {
        const s = o.props.children,
          a = i.map((l) =>
            l !== o
              ? l
              : y.isValidElement(s)
                ? s.props.children
                : (console.warn(
                    "Slot component should have only one React element as a child",
                  ),
                  null),
          )
        return y.isValidElement(s)
          ? y.cloneElement(
              s,
              { ...jr(r, s.props), ref: e ? Lr(e, s.ref) : s.ref },
              a,
            )
          : null
      }
      return y.isValidElement(n)
        ? y.cloneElement(n, {
            ...jr(r, n.props),
            ref: e ? Lr(e, n.ref) : n.ref,
          })
        : (console.warn(
            "Slot component should have only one React element as a child",
          ),
          null)
    })
  Ge.displayName = "Slot"
  const La = y.forwardRef(
      (
        {
          as: t,
          id: e,
          className: n,
          children: r,
          disabled: i = !1,
          leftIcon: o,
          rightIcon: s,
          onClick: a,
          ...l
        },
        c,
      ) => {
        const u = t ? Ge : "button",
          d = (h) => {
            if (y.isValidElement(h)) {
              const { onClick: p } = h.props
              return y.cloneElement(h, {
                onClick: (m) => {
                  m.stopPropagation(), p ? p(m) : a == null || a(m)
                },
              })
            }
          }
        return D.jsxs(u, {
          role: "button",
          ref: c,
          className: xt(Da({ ...l })),
          disabled: i,
          id: e,
          "data-testid": e,
          onClick: a,
          ...l,
          children: [
            o && D.jsx("span", { children: d(o) }),
            r,
            s && D.jsx("span", { children: d(s) }),
          ],
        })
      },
    ),
    Fr = (t) => {
      const e = y.useRef(t)
      return (
        y.useEffect(() => {
          e.current = t
        }),
        y.useMemo(
          () =>
            (...n) => {
              var r
              return (r = e.current) == null ? void 0 : r.call(e, ...n)
            },
          [],
        )
      )
    },
    Fa = ({ defaultValue: t, onChange: e }) => {
      const n = y.useState(t),
        [r] = n,
        i = Fr(e),
        o = y.useRef(r)
      return (
        y.useEffect(() => {
          o.current !== r && (i(r), (o.current = r))
        }, [r, o, i]),
        n
      )
    },
    de = ({ prop: t, defaultProp: e, onChange: n }) => {
      const r = t !== void 0,
        [i, o] = Fa({ defaultValue: e, onChange: n }),
        s = r ? t : i,
        a = Fr(n),
        l = y.useCallback(
          (c) => {
            if (r) {
              const d = typeof c == "function" ? c(t) : c
              d !== t && (a == null || a(d))
            } else o(c)
          },
          [r, t, o, a],
        )
      return [s, l]
    },
    Ir = y.forwardRef(
      (
        {
          children: t,
          disabled: e = !1,
          className: n,
          id: r,
          onClick: i,
          isClicked: o,
          defaultClick: s = !1,
          ...a
        },
        l,
      ) => {
        const [c, u] = de({ prop: o, defaultProp: s, onChange: i })
        return D.jsx("span", {
          role: "button",
          ref: l,
          id: r,
          className: xt(ka({ ...a }), n),
          "aria-disabled": e,
          "aria-pressed": c,
          ...(e && { "data-invalid": "true" }),
          "data-testid": r,
          onClick: () => {
            e || u((d) => !d)
          },
          children: t,
        })
      },
    )
  Ir.displayName = "TagButton"
  function Ye(t, e) {
    const n = Ie.createContext(e),
      r = (o) => {
        const { children: s, ...a } = o,
          l = Ie.useMemo(() => a, Object.values(a))
        return D.jsx(n.Provider, { value: l, children: s })
      }
    function i(o) {
      const s = Ie.useContext(n)
      if (s) return s
      throw new Error(`\`${o}\` must be used within \`${t}\``)
    }
    return (r.displayName = t + "Provider"), [r, i]
  }
  const Ia = (t, e = 150) => {
      const n = y.useRef(null)
      return (
        y.useEffect(() => {
          const r = n.current
          if (r === null || !r.parentElement) return
          const { parentElement: i } = r
          if (t) {
            i.style.display = "block"
            const o = r.style.getPropertyValue("--accordion-height")
            ;(o === "0" || !o) &&
              r.parentElement.style.setProperty(
                "--accordion-height",
                `${r.clientHeight}px`,
              )
          } else
            setTimeout(() => {
              ;(i.style.display = "none"),
                i.style.setProperty("--accordion-height", `${r.clientHeight}px`)
            }, e)
        }, [t, e]),
        n
      )
    },
    Br = ({ keyList: t, changeIndex: e }) => {
      const n = y.useRef([]),
        r = y.useCallback((i, o) => {
          var u
          if (!t.includes(i.key)) return
          const s = n.current.length,
            a = i.target,
            l = n.current.indexOf(a)
          i.preventDefault()
          let c = 0
          switch (i.key) {
            case "ArrowDown":
              c = (l + 1) % s
              break
            case "ArrowUp":
              c = (l - 1 + s) % s
              break
            case "ArrowRight":
              c = (l + 1) % s
              break
            case "ArrowLeft":
              c = (l - 1 + s) % s
              break
            case "Home":
              c = 0
              break
            case "End":
              c = s - 1
              break
            case "Tab":
              c = (l + 1) % s
              break
            case "Enter":
              o == null || o()
          }
          e == null || e(c), (u = n.current[c]) == null || u.focus()
        }, [])
      return { refs: n, handleKeyDown: r }
    },
    Nr = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
    [Wr, Ba] = Ye("accordion"),
    Kr = y.forwardRef((t, e) => {
      const { type: n = "single", ...r } = t
      if (n === "single") return D.jsx(Na, { ...r })
      if (n === "multi") return D.jsx(Wa, { ...r })
    })
  Kr.displayName = "Accordion"
  const Na = ({
      value: t,
      defaultValue: e = [],
      onValueChange: n,
      children: r,
    }) => {
      const [i = [], o] = de({ prop: t, defaultProp: e, onChange: n }),
        { refs: s, handleKeyDown: a } = Br({ keyList: Nr })
      return D.jsx(Wr, {
        selected: i,
        onItemOpen: (l) => o((c) => [l]),
        onItemClose: () => o((l) => []),
        refs: s.current || [],
        children: D.jsx("div", {
          ref: (l) => {
            s.current = Array.from((l == null ? void 0 : l.children) || [])
          },
          className: xt(Or({})),
          onKeyDown: (l) => {
            a(l)
          },
          children: r,
        }),
      })
    },
    Wa = ({ value: t, defaultValue: e, onValueChange: n, children: r }) => {
      const [i, o] = de({ prop: t, defaultProp: e, onChange: n }),
        s = y.useCallback(
          (u) => {
            o((d = []) => [...d, u])
          },
          [o],
        ),
        a = y.useCallback((u) => o((d = []) => d.filter((h) => h !== u)), [o]),
        { refs: l, handleKeyDown: c } = Br({ keyList: Nr })
      return D.jsx(Wr, {
        selected: i,
        onItemOpen: s,
        onItemClose: a,
        children: D.jsx("div", {
          ref: (u) => {
            l.current = Array.from((u == null ? void 0 : u.children) || [])
          },
          onKeyDown: c,
          className: xt(Or({})),
          children: r,
        }),
      })
    },
    [Ka, Ur] = Ye("accordionItem"),
    Ua = ({ value: t, disabled: e = !1, children: n }) => {
      const { selected: r, onItemOpen: i, onItemClose: o } = Ba("accordion"),
        s = (r == null ? void 0 : r.includes(t)) && !e,
        a = () => {
          e || (s ? o(t) : i(t))
        }
      return D.jsx(Ka, {
        isOpen: !!s,
        onToggle: a,
        value: t,
        children: D.jsx("div", {
          "data-state": s ? "open" : "close",
          tabIndex: 0,
          onKeyDown: (l) => {
            l.key === "Enter" && a()
          },
          children: n,
        }),
      })
    },
    $a = ({ children: t }) => {
      const { onToggle: e, isOpen: n, value: r } = Ur("accordionItem")
      return D.jsx("h3", {
        "data-state": n ? "open" : "close",
        children: D.jsx("button", {
          onClick: e,
          "aria-expanded": !!n,
          "aria-controls": r,
          tabIndex: -1,
          children: D.jsx("span", { children: t }),
        }),
      })
    },
    za = ({ children: t }) => {
      const { isOpen: e, value: n } = Ur("accordionItem"),
        r = Ia(e, 150)
      return D.jsx("div", {
        className: Ut({
          display: "none",
          overflow: "hidden",
          border: "1px solid black",
          animation: e
            ? "accordionDown 0.2s cubic-bezier(.4,0,.2,1)"
            : "accordionUp 0.2s cubic-bezier(.4,0,.2,1)",
        }),
        "data-state": e ? "open" : "close",
        "aria-controls": n,
        children: D.jsx("div", { ref: r, children: t }),
      })
    },
    [Ha, Xe] = Ye("tab"),
    Ga = y.forwardRef(
      (
        { children: t, selected: e, defaultValue: n, onSelect: r, asChild: i },
        o,
      ) => {
        const s = i ? Ge : "div",
          [a, l] = de({ prop: e, onChange: r, defaultProp: n }),
          c = (u) => {
            l(u)
          }
        return D.jsx(Ha, {
          selected: a,
          onSelect: c,
          tabId: y.useId(),
          children: D.jsx(s, { ref: o, children: t }),
        })
      },
    )
  var st = {}
  Object.defineProperty(st, "__esModule", { value: !0 })
  for (
    var Ya =
        typeof window < "u" &&
        /Mac|iPod|iPhone|iPad/.test(window.navigator.platform),
      qe = {
        alt: "altKey",
        control: "ctrlKey",
        meta: "metaKey",
        shift: "shiftKey",
      },
      $r = {
        add: "+",
        break: "pause",
        cmd: "meta",
        command: "meta",
        ctl: "control",
        ctrl: "control",
        del: "delete",
        down: "arrowdown",
        esc: "escape",
        ins: "insert",
        left: "arrowleft",
        mod: Ya ? "meta" : "control",
        opt: "alt",
        option: "alt",
        return: "enter",
        right: "arrowright",
        space: " ",
        spacebar: " ",
        up: "arrowup",
        win: "meta",
        windows: "meta",
      },
      Ze = {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        control: 17,
        alt: 18,
        pause: 19,
        capslock: 20,
        escape: 27,
        " ": 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        arrowleft: 37,
        arrowup: 38,
        arrowright: 39,
        arrowdown: 40,
        insert: 45,
        delete: 46,
        meta: 91,
        numlock: 144,
        scrolllock: 145,
        ";": 186,
        "=": 187,
        ",": 188,
        "-": 189,
        ".": 190,
        "/": 191,
        "`": 192,
        "[": 219,
        "\\": 220,
        "]": 221,
        "'": 222,
      },
      fe = 1;
    fe < 20;
    fe++
  )
    Ze["f" + fe] = 111 + fe
  function he(t, e, n) {
    e && !("byKey" in e) && ((n = e), (e = null)), Array.isArray(t) || (t = [t])
    var r = t.map(function (s) {
        return zr(s, e)
      }),
      i = function (a) {
        return r.some(function (l) {
          return Hr(l, a)
        })
      },
      o = n == null ? i : i(n)
    return o
  }
  function Xa(t, e) {
    return he(t, e)
  }
  function qa(t, e) {
    return he(t, { byKey: !0 }, e)
  }
  function zr(t, e) {
    var n = e && e.byKey,
      r = {}
    t = t.replace("++", "+add")
    var i = t.split("+"),
      o = i.length
    for (var s in qe) r[qe[s]] = !1
    var a = !0,
      l = !1,
      c = void 0
    try {
      for (
        var u = i[Symbol.iterator](), d;
        !(a = (d = u.next()).done);
        a = !0
      ) {
        var h = d.value,
          p = h.endsWith("?") && h.length > 1
        p && (h = h.slice(0, -1))
        var m = Je(h),
          v = qe[m]
        if (h.length > 1 && !v && !$r[h] && !Ze[m])
          throw new TypeError('Unknown modifier: "' + h + '"')
        ;(o === 1 || !v) && (n ? (r.key = m) : (r.which = Gr(h))),
          v && (r[v] = p ? null : !0)
      }
    } catch (P) {
      ;(l = !0), (c = P)
    } finally {
      try {
        !a && u.return && u.return()
      } finally {
        if (l) throw c
      }
    }
    return r
  }
  function Hr(t, e) {
    for (var n in t) {
      var r = t[n],
        i = void 0
      if (
        r != null &&
        (n === "key" && e.key != null
          ? (i = e.key.toLowerCase())
          : n === "which"
            ? (i = r === 91 && e.which === 93 ? 91 : e.which)
            : (i = e[n]),
        !(i == null && r === !1) && i !== r)
      )
        return !1
    }
    return !0
  }
  function Gr(t) {
    t = Je(t)
    var e = Ze[t] || t.toUpperCase().charCodeAt(0)
    return e
  }
  function Je(t) {
    return (t = t.toLowerCase()), (t = $r[t] || t), t
  }
  var Za = (st.default = he)
  ;(st.isHotkey = he),
    (st.isCodeHotkey = Xa),
    (st.isKeyHotkey = qa),
    (st.parseHotkey = zr),
    (st.compareHotkey = Hr),
    (st.toKeyCode = Gr),
    (st.toKeyName = Je)
  function Ja(t) {
    var n
    const e = document.activeElement
    for (; document.activeElement === e && t.length > 0; )
      (n = t.shift()) == null || n.focus()
  }
  const Yr = y.createContext({
      currentRovingTabindexValue: null,
      setFocusableId: () => {},
      onShiftTab: () => {},
      getOrderedItems: () => [],
      elements: { current: new Map() },
    }),
    Xr = "data-roving-tabindex-node",
    Qa = "data-roving-tabindex-root",
    tl = "data-roving-tabindex-not-focusable"
  function el({ children: t, active: e, as: n, ...r }) {
    const i = n || "div",
      [o, s] = y.useState(!1),
      [a, l] = y.useState(null),
      c = y.useRef(null),
      u = y.useRef(new Map()),
      d = y.useCallback(() => {
        if (!c.current) return []
        const h = Array.from(
          c.current.querySelectorAll(
            `:where([${Xr}=true]):not(:where([${tl}=true] *))`,
          ),
        )
        return Array.from(u.current)
          .sort((p, m) => h.indexOf(p[1]) - h.indexOf(m[1]))
          .map(([p, m]) => ({ id: p, element: m }))
      }, [])
    return D.jsx(Yr.Provider, {
      value: {
        setFocusableId: function (h) {
          l(h)
        },
        onShiftTab: function () {
          s(!0)
        },
        currentRovingTabindexValue: a,
        getOrderedItems: d,
        elements: u,
      },
      children: D.jsx(i, {
        [Qa]: !0,
        tabIndex: o ? -1 : 0,
        onFocus: (h) => {
          if (h.target !== h.currentTarget || o) return
          const p = d()
          if (p.length === 0) return
          const m = [
            u.current.get(a ?? ""),
            u.current.get(e ?? ""),
            ...p.map((v) => v.element),
          ].filter((v) => v != null)
          Ja(m)
        },
        onBlur: () => s(!1),
        ref: c,
        ...r,
        children: t,
      }),
    })
  }
  function nl(t) {
    const {
      currentRovingTabindexValue: e,
      setFocusableId: n,
      onShiftTab: r,
      getOrderedItems: i,
      elements: o,
    } = y.useContext(Yr)
    return {
      getOrderedItems: i,
      isFocusable: e === t,
      getRovingProps: (s) => ({
        ...s,
        ref: (a) => {
          a ? o.current.set(t, a) : o.current.delete(t)
        },
        onMouseDown: (a) => {
          var l
          ;(l = s == null ? void 0 : s.onMouseDown) == null || l.call(s, a),
            a.target === a.currentTarget && n(t)
        },
        onKeyDown: (a) => {
          var l
          if (
            ((l = s == null ? void 0 : s.onKeyDown) == null || l.call(s, a),
            a.target === a.currentTarget && Za("shift+tab", a))
          ) {
            r()
            return
          }
        },
        onFocus: (a) => {
          var l
          ;(l = s == null ? void 0 : s.onFocus) == null || l.call(s, a),
            a.target === a.currentTarget && n(t)
        },
        [Xr]: !0,
        tabIndex: e === t ? 0 : -1,
      }),
    }
  }
  const rl = (t) => {
      var r
      const e = t.getBoundingClientRect(),
        n = (r = t.parentElement) == null ? void 0 : r.getBoundingClientRect()
      !e ||
        !n ||
        (document.documentElement.style.setProperty(
          "--indicator-left",
          `${Math.abs(n.left - e.left)}px`,
        ),
        document.documentElement.style.setProperty(
          "--indicator-width",
          `${Math.abs(e.width)}px`,
        ))
    },
    il = ({ children: t, className: e }) => {
      const { selected: n, onSelect: r } = Xe("tab")
      return D.jsx(el, {
        as: "div",
        role: "tablist",
        active: n === void 0 ? null : n,
        children: D.jsx("div", {
          role: "tablist",
          className: xt(e, Ut({ position: "relative", display: "flex" })),
          children: t,
        }),
      })
    },
    sl = y.forwardRef(
      ({ children: t, className: e, value: n, asChild: r }, i) => {
        const { selected: o, onSelect: s, tabId: a } = Xe("tab"),
          l = o === n,
          { getOrderedItems: c, isFocusable: u, getRovingProps: d } = nl(n)
        return (
          console.log(u),
          D.jsx("button", {
            ...d(),
            role: "tab",
            className: e,
            "aria-selected": l,
            tabIndex: l ? 0 : -1,
            onClick: (h) => {
              h.preventDefault(), s == null || s(n), rl(h.currentTarget)
            },
            "aria-controls": a + "-tabpanel-" + n,
            "data-id": n,
            "data-tab-item": "",
            children: t,
          })
        )
      },
    ),
    qr = y.createContext({
      transformPagePoint: (t) => t,
      isStatic: !1,
      reducedMotion: "never",
    }),
    pe = y.createContext({}),
    Qe = y.createContext(null),
    tn = typeof window < "u",
    ol = tn ? y.useLayoutEffect : y.useEffect,
    Zr = y.createContext({ strict: !1 }),
    me = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
    Jr = "data-" + me("framerAppearId"),
    al = { skipAnimations: !1, useManualTiming: !1 }
  function ll(t) {
    let e = new Set(),
      n = new Set(),
      r = !1,
      i = !1
    const o = new WeakSet()
    let s = { delta: 0, timestamp: 0, isProcessing: !1 }
    function a(c) {
      o.has(c) && (l.schedule(c), t()), c(s)
    }
    const l = {
      schedule: (c, u = !1, d = !1) => {
        const p = d && r ? e : n
        return u && o.add(c), p.has(c) || p.add(c), c
      },
      cancel: (c) => {
        n.delete(c), o.delete(c)
      },
      process: (c) => {
        if (((s = c), r)) {
          i = !0
          return
        }
        ;(r = !0),
          ([e, n] = [n, e]),
          n.clear(),
          e.forEach(a),
          (r = !1),
          i && ((i = !1), l.process(c))
      },
    }
    return l
  }
  const ge = [
      "read",
      "resolveKeyframes",
      "update",
      "preRender",
      "render",
      "postRender",
    ],
    cl = 40
  function Qr(t, e) {
    let n = !1,
      r = !0
    const i = { delta: 0, timestamp: 0, isProcessing: !1 },
      o = () => (n = !0),
      s = ge.reduce((T, b) => ((T[b] = ll(o)), T), {}),
      {
        read: a,
        resolveKeyframes: l,
        update: c,
        preRender: u,
        render: d,
        postRender: h,
      } = s,
      p = () => {
        const T = performance.now()
        ;(n = !1),
          (i.delta = r ? 1e3 / 60 : Math.max(Math.min(T - i.timestamp, cl), 1)),
          (i.timestamp = T),
          (i.isProcessing = !0),
          a.process(i),
          l.process(i),
          c.process(i),
          u.process(i),
          d.process(i),
          h.process(i),
          (i.isProcessing = !1),
          n && e && ((r = !1), t(p))
      },
      m = () => {
        ;(n = !0), (r = !0), i.isProcessing || t(p)
      }
    return {
      schedule: ge.reduce((T, b) => {
        const S = s[b]
        return (
          (T[b] = (A, V = !1, B = !1) => (n || m(), S.schedule(A, V, B))), T
        )
      }, {}),
      cancel: (T) => {
        for (let b = 0; b < ge.length; b++) s[ge[b]].cancel(T)
      },
      state: i,
      steps: s,
    }
  }
  const { schedule: en, cancel: ih } = Qr(queueMicrotask, !1)
  function Vt(t) {
    return (
      t &&
      typeof t == "object" &&
      Object.prototype.hasOwnProperty.call(t, "current")
    )
  }
  const ti = y.createContext({})
  let ei = !1
  function ul(t, e, n, r, i) {
    const { visualElement: o } = y.useContext(pe),
      s = y.useContext(Zr),
      a = y.useContext(Qe),
      l = y.useContext(qr).reducedMotion,
      c = y.useRef()
    ;(r = r || s.renderer),
      !c.current &&
        r &&
        (c.current = r(t, {
          visualState: e,
          parent: o,
          props: n,
          presenceContext: a,
          blockInitialAnimation: a ? a.initial === !1 : !1,
          reducedMotionConfig: l,
        }))
    const u = c.current,
      d = y.useContext(ti)
    u &&
      !u.projection &&
      i &&
      (u.type === "html" || u.type === "svg") &&
      fl(c.current, n, i, d),
      y.useInsertionEffect(() => {
        u && u.update(n, a)
      })
    const h = y.useRef(!!(n[Jr] && !window.HandoffComplete))
    return (
      ol(() => {
        u &&
          (u.updateFeatures(),
          en.render(u.render),
          h.current && u.animationState && u.animationState.animateChanges())
      }),
      y.useEffect(() => {
        u &&
          (!h.current && u.animationState && u.animationState.animateChanges(),
          h.current &&
            ((h.current = !1), ei || ((ei = !0), queueMicrotask(dl))))
      }),
      u
    )
  }
  function dl() {
    window.HandoffComplete = !0
  }
  function fl(t, e, n, r) {
    const {
      layoutId: i,
      layout: o,
      drag: s,
      dragConstraints: a,
      layoutScroll: l,
      layoutRoot: c,
    } = e
    ;(t.projection = new n(
      t.latestValues,
      e["data-framer-portal-id"] ? void 0 : ni(t.parent),
    )),
      t.projection.setOptions({
        layoutId: i,
        layout: o,
        alwaysMeasureLayout: !!s || (a && Vt(a)),
        visualElement: t,
        animationType: typeof o == "string" ? o : "both",
        initialPromotionConfig: r,
        layoutScroll: l,
        layoutRoot: c,
      })
  }
  function ni(t) {
    if (t) return t.options.allowProjection !== !1 ? t.projection : ni(t.parent)
  }
  function hl(t, e, n) {
    return y.useCallback(
      (r) => {
        r && t.mount && t.mount(r),
          e && (r ? e.mount(r) : e.unmount()),
          n && (typeof n == "function" ? n(r) : Vt(n) && (n.current = r))
      },
      [e],
    )
  }
  function $t(t) {
    return typeof t == "string" || Array.isArray(t)
  }
  function zt(t) {
    return t !== null && typeof t == "object" && typeof t.start == "function"
  }
  const nn = [
      "animate",
      "whileInView",
      "whileFocus",
      "whileHover",
      "whileTap",
      "whileDrag",
      "exit",
    ],
    rn = ["initial", ...nn]
  function ye(t) {
    return zt(t.animate) || rn.some((e) => $t(t[e]))
  }
  function ri(t) {
    return !!(ye(t) || t.variants)
  }
  function pl(t, e) {
    if (ye(t)) {
      const { initial: n, animate: r } = t
      return {
        initial: n === !1 || $t(n) ? n : void 0,
        animate: $t(r) ? r : void 0,
      }
    }
    return t.inherit !== !1 ? e : {}
  }
  function ml(t) {
    const { initial: e, animate: n } = pl(t, y.useContext(pe))
    return y.useMemo(() => ({ initial: e, animate: n }), [ii(e), ii(n)])
  }
  function ii(t) {
    return Array.isArray(t) ? t.join(" ") : t
  }
  const si = {
      animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag",
      ],
      exit: ["exit"],
      drag: ["drag", "dragControls"],
      focus: ["whileFocus"],
      hover: ["whileHover", "onHoverStart", "onHoverEnd"],
      tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
      pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
      inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
      layout: ["layout", "layoutId"],
    },
    Rt = {}
  for (const t in si) Rt[t] = { isEnabled: (e) => si[t].some((n) => !!e[n]) }
  function gl(t) {
    for (const e in t) Rt[e] = { ...Rt[e], ...t[e] }
  }
  const oi = y.createContext({}),
    yl = Symbol.for("motionComponentSymbol"),
    K = (t) => t
  let _t = K,
    ft = K
  process.env.NODE_ENV !== "production" &&
    ((_t = (t, e) => {
      !t && typeof console < "u" && console.warn(e)
    }),
    (ft = (t, e) => {
      if (!t) throw new Error(e)
    }))
  function vl({
    preloadedFeatures: t,
    createVisualElement: e,
    useRender: n,
    useVisualState: r,
    Component: i,
  }) {
    t && gl(t)
    function o(a, l) {
      let c
      const u = { ...y.useContext(qr), ...a, layoutId: bl(a) },
        { isStatic: d } = u,
        h = ml(a),
        p = r(a, d)
      if (!d && tn) {
        xl(u, t)
        const m = Tl(u)
        ;(c = m.MeasureLayout),
          (h.visualElement = ul(i, p, u, e, m.ProjectionNode))
      }
      return D.jsxs(pe.Provider, {
        value: h,
        children: [
          c && h.visualElement
            ? D.jsx(c, { visualElement: h.visualElement, ...u })
            : null,
          n(i, a, hl(p, h.visualElement, l), p, d, h.visualElement),
        ],
      })
    }
    const s = y.forwardRef(o)
    return (s[yl] = i), s
  }
  function bl({ layoutId: t }) {
    const e = y.useContext(oi).id
    return e && t !== void 0 ? e + "-" + t : t
  }
  function xl(t, e) {
    const n = y.useContext(Zr).strict
    if (process.env.NODE_ENV !== "production" && e && n) {
      const r =
        "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead."
      t.ignoreStrict ? _t(!1, r) : ft(!1, r)
    }
  }
  function Tl(t) {
    const { drag: e, layout: n } = Rt
    if (!e && !n) return {}
    const r = { ...e, ...n }
    return {
      MeasureLayout:
        (e != null && e.isEnabled(t)) || (n != null && n.isEnabled(t))
          ? r.MeasureLayout
          : void 0,
      ProjectionNode: r.ProjectionNode,
    }
  }
  function Pl(t) {
    function e(r, i = {}) {
      return vl(t(r, i))
    }
    if (typeof Proxy > "u") return e
    const n = new Map()
    return new Proxy(e, {
      get: (r, i) => (n.has(i) || n.set(i, e(i)), n.get(i)),
    })
  }
  const Sl = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view",
  ]
  function sn(t) {
    return typeof t != "string" || t.includes("-")
      ? !1
      : !!(Sl.indexOf(t) > -1 || /[A-Z]/u.test(t))
  }
  const ve = {}
  function wl(t) {
    Object.assign(ve, t)
  }
  const Ht = [
      "transformPerspective",
      "x",
      "y",
      "z",
      "translateX",
      "translateY",
      "translateZ",
      "scale",
      "scaleX",
      "scaleY",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skew",
      "skewX",
      "skewY",
    ],
    ht = new Set(Ht)
  function ai(t, { layout: e, layoutId: n }) {
    return (
      ht.has(t) ||
      t.startsWith("origin") ||
      ((e || n !== void 0) && (!!ve[t] || t === "opacity"))
    )
  }
  const $ = (t) => !!(t && t.getVelocity),
    Cl = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective",
    },
    Al = Ht.length
  function El(t, e, n) {
    let r = ""
    for (let i = 0; i < Al; i++) {
      const o = Ht[i]
      if (t[o] !== void 0) {
        const s = Cl[o] || o
        r += `${s}(${t[o]}) `
      }
    }
    return (r = r.trim()), n ? (r = n(t, e ? "" : r)) : e && (r = "none"), r
  }
  const li = (t) => (e) => typeof e == "string" && e.startsWith(t),
    ci = li("--"),
    Vl = li("var(--"),
    on = (t) => (Vl(t) ? Rl.test(t.split("/*")[0].trim()) : !1),
    Rl =
      /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
    _l = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
    pt = (t, e, n) => (n > e ? e : n < t ? t : n),
    Dt = {
      test: (t) => typeof t == "number",
      parse: parseFloat,
      transform: (t) => t,
    },
    Gt = { ...Dt, transform: (t) => pt(0, 1, t) },
    be = { ...Dt, default: 1 },
    Yt = (t) => Math.round(t * 1e5) / 1e5,
    an = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
    Dl =
      /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
    kl =
      /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu
  function Xt(t) {
    return typeof t == "string"
  }
  function Ml(t) {
    return t == null
  }
  const qt = (t) => ({
      test: (e) => Xt(e) && e.endsWith(t) && e.split(" ").length === 1,
      parse: parseFloat,
      transform: (e) => `${e}${t}`,
    }),
    mt = qt("deg"),
    nt = qt("%"),
    w = qt("px"),
    Ol = qt("vh"),
    jl = qt("vw"),
    ui = {
      ...nt,
      parse: (t) => nt.parse(t) / 100,
      transform: (t) => nt.transform(t * 100),
    },
    di = { ...Dt, transform: Math.round },
    fi = {
      borderWidth: w,
      borderTopWidth: w,
      borderRightWidth: w,
      borderBottomWidth: w,
      borderLeftWidth: w,
      borderRadius: w,
      radius: w,
      borderTopLeftRadius: w,
      borderTopRightRadius: w,
      borderBottomRightRadius: w,
      borderBottomLeftRadius: w,
      width: w,
      maxWidth: w,
      height: w,
      maxHeight: w,
      size: w,
      top: w,
      right: w,
      bottom: w,
      left: w,
      padding: w,
      paddingTop: w,
      paddingRight: w,
      paddingBottom: w,
      paddingLeft: w,
      margin: w,
      marginTop: w,
      marginRight: w,
      marginBottom: w,
      marginLeft: w,
      rotate: mt,
      rotateX: mt,
      rotateY: mt,
      rotateZ: mt,
      scale: be,
      scaleX: be,
      scaleY: be,
      scaleZ: be,
      skew: mt,
      skewX: mt,
      skewY: mt,
      distance: w,
      translateX: w,
      translateY: w,
      translateZ: w,
      x: w,
      y: w,
      z: w,
      perspective: w,
      transformPerspective: w,
      opacity: Gt,
      originX: ui,
      originY: ui,
      originZ: w,
      zIndex: di,
      backgroundPositionX: w,
      backgroundPositionY: w,
      fillOpacity: Gt,
      strokeOpacity: Gt,
      numOctaves: di,
    }
  function ln(t, e, n) {
    const { style: r, vars: i, transform: o, transformOrigin: s } = t
    let a = !1,
      l = !1,
      c = !0
    for (const u in e) {
      const d = e[u]
      if (ci(u)) {
        i[u] = d
        continue
      }
      const h = fi[u],
        p = _l(d, h)
      if (ht.has(u)) {
        if (((a = !0), (o[u] = p), !c)) continue
        d !== (h.default || 0) && (c = !1)
      } else u.startsWith("origin") ? ((l = !0), (s[u] = p)) : (r[u] = p)
    }
    if (
      (e.transform ||
        (a || n
          ? (r.transform = El(t.transform, c, n))
          : r.transform && (r.transform = "none")),
      l)
    ) {
      const { originX: u = "50%", originY: d = "50%", originZ: h = 0 } = s
      r.transformOrigin = `${u} ${d} ${h}`
    }
  }
  const cn = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} })
  function hi(t, e, n) {
    for (const r in e) !$(e[r]) && !ai(r, n) && (t[r] = e[r])
  }
  function Ll({ transformTemplate: t }, e) {
    return y.useMemo(() => {
      const n = cn()
      return ln(n, e, t), Object.assign({}, n.vars, n.style)
    }, [e])
  }
  function Fl(t, e) {
    const n = t.style || {},
      r = {}
    return hi(r, n, t), Object.assign(r, Ll(t, e)), r
  }
  function Il(t, e) {
    const n = {},
      r = Fl(t, e)
    return (
      t.drag &&
        t.dragListener !== !1 &&
        ((n.draggable = !1),
        (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
        (r.touchAction =
          t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
      t.tabIndex === void 0 &&
        (t.onTap || t.onTapStart || t.whileTap) &&
        (n.tabIndex = 0),
      (n.style = r),
      n
    )
  }
  const Bl = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport",
  ])
  function xe(t) {
    return (
      t.startsWith("while") ||
      (t.startsWith("drag") && t !== "draggable") ||
      t.startsWith("layout") ||
      t.startsWith("onTap") ||
      t.startsWith("onPan") ||
      t.startsWith("onLayout") ||
      Bl.has(t)
    )
  }
  let pi = (t) => !xe(t)
  function Nl(t) {
    t && (pi = (e) => (e.startsWith("on") ? !xe(e) : t(e)))
  }
  try {
    Nl(require("@emotion/is-prop-valid").default)
  } catch {}
  function Wl(t, e, n) {
    const r = {}
    for (const i in t)
      (i === "values" && typeof t.values == "object") ||
        ((pi(i) ||
          (n === !0 && xe(i)) ||
          (!e && !xe(i)) ||
          (t.draggable && i.startsWith("onDrag"))) &&
          (r[i] = t[i]))
    return r
  }
  function mi(t, e, n) {
    return typeof t == "string" ? t : w.transform(e + n * t)
  }
  function Kl(t, e, n) {
    const r = mi(e, t.x, t.width),
      i = mi(n, t.y, t.height)
    return `${r} ${i}`
  }
  const Ul = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
    $l = { offset: "strokeDashoffset", array: "strokeDasharray" }
  function zl(t, e, n = 1, r = 0, i = !0) {
    t.pathLength = 1
    const o = i ? Ul : $l
    t[o.offset] = w.transform(-r)
    const s = w.transform(e),
      a = w.transform(n)
    t[o.array] = `${s} ${a}`
  }
  function un(
    t,
    {
      attrX: e,
      attrY: n,
      attrScale: r,
      originX: i,
      originY: o,
      pathLength: s,
      pathSpacing: a = 1,
      pathOffset: l = 0,
      ...c
    },
    u,
    d,
  ) {
    if ((ln(t, c, d), u)) {
      t.style.viewBox && (t.attrs.viewBox = t.style.viewBox)
      return
    }
    ;(t.attrs = t.style), (t.style = {})
    const { attrs: h, style: p, dimensions: m } = t
    h.transform && (m && (p.transform = h.transform), delete h.transform),
      m &&
        (i !== void 0 || o !== void 0 || p.transform) &&
        (p.transformOrigin = Kl(
          m,
          i !== void 0 ? i : 0.5,
          o !== void 0 ? o : 0.5,
        )),
      e !== void 0 && (h.x = e),
      n !== void 0 && (h.y = n),
      r !== void 0 && (h.scale = r),
      s !== void 0 && zl(h, s, a, l, !1)
  }
  const gi = () => ({ ...cn(), attrs: {} }),
    dn = (t) => typeof t == "string" && t.toLowerCase() === "svg"
  function Hl(t, e, n, r) {
    const i = y.useMemo(() => {
      const o = gi()
      return (
        un(o, e, dn(r), t.transformTemplate),
        { ...o.attrs, style: { ...o.style } }
      )
    }, [e])
    if (t.style) {
      const o = {}
      hi(o, t.style, t), (i.style = { ...o, ...i.style })
    }
    return i
  }
  function Gl(t = !1) {
    return (n, r, i, { latestValues: o }, s) => {
      const l = (sn(n) ? Hl : Il)(r, o, s, n),
        c = Wl(r, typeof n == "string", t),
        u = n !== y.Fragment ? { ...c, ...l, ref: i } : {},
        { children: d } = r,
        h = y.useMemo(() => ($(d) ? d.get() : d), [d])
      return y.createElement(n, { ...u, children: h })
    }
  }
  function yi(t, { style: e, vars: n }, r, i) {
    Object.assign(t.style, e, i && i.getProjectionStyles(r))
    for (const o in n) t.style.setProperty(o, n[o])
  }
  const vi = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
  ])
  function bi(t, e, n, r) {
    yi(t, e, void 0, r)
    for (const i in e.attrs) t.setAttribute(vi.has(i) ? i : me(i), e.attrs[i])
  }
  function fn(t, e, n) {
    var r
    const { style: i } = t,
      o = {}
    for (const s in i)
      ($(i[s]) ||
        (e.style && $(e.style[s])) ||
        ai(s, t) ||
        ((r = n == null ? void 0 : n.getValue(s)) === null || r === void 0
          ? void 0
          : r.liveStyle) !== void 0) &&
        (o[s] = i[s])
    return (
      n && i && typeof i.willChange == "string" && (n.applyWillChange = !1), o
    )
  }
  function xi(t, e, n) {
    const r = fn(t, e, n)
    for (const i in t)
      if ($(t[i]) || $(e[i])) {
        const o =
          Ht.indexOf(i) !== -1
            ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
            : i
        r[o] = t[i]
      }
    return r
  }
  function Ti(t) {
    const e = [{}, {}]
    return (
      t == null ||
        t.values.forEach((n, r) => {
          ;(e[0][r] = n.get()), (e[1][r] = n.getVelocity())
        }),
      e
    )
  }
  function hn(t, e, n, r) {
    if (typeof e == "function") {
      const [i, o] = Ti(r)
      e = e(n !== void 0 ? n : t.custom, i, o)
    }
    if (
      (typeof e == "string" && (e = t.variants && t.variants[e]),
      typeof e == "function")
    ) {
      const [i, o] = Ti(r)
      e = e(n !== void 0 ? n : t.custom, i, o)
    }
    return e
  }
  function Yl(t) {
    const e = y.useRef(null)
    return e.current === null && (e.current = t()), e.current
  }
  const pn = (t) => Array.isArray(t),
    Xl = (t) => !!(t && typeof t == "object" && t.mix && t.toValue),
    ql = (t) => (pn(t) ? t[t.length - 1] || 0 : t)
  function Te(t) {
    const e = $(t) ? t.get() : t
    return Xl(e) ? e.toValue() : e
  }
  const Pi = new Set(["opacity", "clipPath", "filter", "transform"])
  function Si(t) {
    if (ht.has(t)) return "transform"
    if (Pi.has(t)) return me(t)
  }
  function Pe(t, e) {
    t.indexOf(e) === -1 && t.push(e)
  }
  function Se(t, e) {
    const n = t.indexOf(e)
    n > -1 && t.splice(n, 1)
  }
  function Zl(
    {
      applyWillChange: t = !1,
      scrapeMotionValuesFromProps: e,
      createRenderState: n,
      onMount: r,
    },
    i,
    o,
    s,
    a,
  ) {
    const l = { latestValues: Ql(i, o, s, a ? !1 : t, e), renderState: n() }
    return r && (l.mount = (c) => r(i, c, l)), l
  }
  const wi = (t) => (e, n) => {
    const r = y.useContext(pe),
      i = y.useContext(Qe),
      o = () => Zl(t, e, r, i, n)
    return n ? o() : Yl(o)
  }
  function Jl(t, e) {
    const n = Si(e)
    n && Pe(t, n)
  }
  function Ci(t, e, n) {
    const r = Array.isArray(e) ? e : [e]
    for (let i = 0; i < r.length; i++) {
      const o = hn(t, r[i])
      if (o) {
        const { transitionEnd: s, transition: a, ...l } = o
        n(l, s)
      }
    }
  }
  function Ql(t, e, n, r, i) {
    var o
    const s = {},
      a = [],
      l =
        r &&
        ((o = t.style) === null || o === void 0 ? void 0 : o.willChange) ===
          void 0,
      c = i(t, {})
    for (const P in c) s[P] = Te(c[P])
    let { initial: u, animate: d } = t
    const h = ye(t),
      p = ri(t)
    e &&
      p &&
      !h &&
      t.inherit !== !1 &&
      (u === void 0 && (u = e.initial), d === void 0 && (d = e.animate))
    let m = n ? n.initial === !1 : !1
    m = m || u === !1
    const v = m ? d : u
    return (
      v &&
        typeof v != "boolean" &&
        !zt(v) &&
        Ci(t, v, (P, T) => {
          for (const b in P) {
            let S = P[b]
            if (Array.isArray(S)) {
              const A = m ? S.length - 1 : 0
              S = S[A]
            }
            S !== null && (s[b] = S)
          }
          for (const b in T) s[b] = T[b]
        }),
      l &&
        (d &&
          u !== !1 &&
          !zt(d) &&
          Ci(t, d, (P) => {
            for (const T in P) Jl(a, T)
          }),
        a.length && (s.willChange = a.join(","))),
      s
    )
  }
  const {
      schedule: M,
      cancel: ot,
      state: U,
      steps: mn,
    } = Qr(typeof requestAnimationFrame < "u" ? requestAnimationFrame : K, !0),
    tc = {
      useVisualState: wi({
        scrapeMotionValuesFromProps: xi,
        createRenderState: gi,
        onMount: (t, e, { renderState: n, latestValues: r }) => {
          M.read(() => {
            try {
              n.dimensions =
                typeof e.getBBox == "function"
                  ? e.getBBox()
                  : e.getBoundingClientRect()
            } catch {
              n.dimensions = { x: 0, y: 0, width: 0, height: 0 }
            }
          }),
            M.render(() => {
              un(n, r, dn(e.tagName), t.transformTemplate), bi(e, n)
            })
        },
      }),
    },
    ec = {
      useVisualState: wi({
        applyWillChange: !0,
        scrapeMotionValuesFromProps: fn,
        createRenderState: cn,
      }),
    }
  function nc(t, { forwardMotionProps: e = !1 }, n, r) {
    return {
      ...(sn(t) ? tc : ec),
      preloadedFeatures: n,
      useRender: Gl(e),
      createVisualElement: r,
      Component: t,
    }
  }
  function at(t, e, n, r = { passive: !0 }) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n)
  }
  const Ai = (t) =>
    t.pointerType === "mouse"
      ? typeof t.button != "number" || t.button <= 0
      : t.isPrimary !== !1
  function we(t, e = "page") {
    return { point: { x: t[`${e}X`], y: t[`${e}Y`] } }
  }
  const rc = (t) => (e) => Ai(e) && t(e, we(e))
  function lt(t, e, n, r) {
    return at(t, e, rc(n), r)
  }
  const ic = (t, e) => (n) => e(t(n)),
    ct = (...t) => t.reduce(ic)
  function Ei(t) {
    let e = null
    return () => {
      const n = () => {
        e = null
      }
      return e === null ? ((e = t), n) : !1
    }
  }
  const Vi = Ei("dragHorizontal"),
    Ri = Ei("dragVertical")
  function _i(t) {
    let e = !1
    if (t === "y") e = Ri()
    else if (t === "x") e = Vi()
    else {
      const n = Vi(),
        r = Ri()
      n && r
        ? (e = () => {
            n(), r()
          })
        : (n && n(), r && r())
    }
    return e
  }
  function Di() {
    const t = _i(!0)
    return t ? (t(), !1) : !0
  }
  class gt {
    constructor(e) {
      ;(this.isMounted = !1), (this.node = e)
    }
    update() {}
  }
  function ki(t, e) {
    const n = e ? "pointerenter" : "pointerleave",
      r = e ? "onHoverStart" : "onHoverEnd",
      i = (o, s) => {
        if (o.pointerType === "touch" || Di()) return
        const a = t.getProps()
        t.animationState &&
          a.whileHover &&
          t.animationState.setActive("whileHover", e)
        const l = a[r]
        l && M.postRender(() => l(o, s))
      }
    return lt(t.current, n, i, { passive: !t.getProps()[r] })
  }
  class sc extends gt {
    mount() {
      this.unmount = ct(ki(this.node, !0), ki(this.node, !1))
    }
    unmount() {}
  }
  class oc extends gt {
    constructor() {
      super(...arguments), (this.isActive = !1)
    }
    onFocus() {
      let e = !1
      try {
        e = this.node.current.matches(":focus-visible")
      } catch {
        e = !0
      }
      !e ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !0),
        (this.isActive = !0))
    }
    onBlur() {
      !this.isActive ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !1),
        (this.isActive = !1))
    }
    mount() {
      this.unmount = ct(
        at(this.node.current, "focus", () => this.onFocus()),
        at(this.node.current, "blur", () => this.onBlur()),
      )
    }
    unmount() {}
  }
  const Mi = (t, e) => (e ? (t === e ? !0 : Mi(t, e.parentElement)) : !1)
  function gn(t, e) {
    if (!e) return
    const n = new PointerEvent("pointer" + t)
    e(n, we(n))
  }
  class ac extends gt {
    constructor() {
      super(...arguments),
        (this.removeStartListeners = K),
        (this.removeEndListeners = K),
        (this.removeAccessibleListeners = K),
        (this.startPointerPress = (e, n) => {
          if (this.isPressing) return
          this.removeEndListeners()
          const r = this.node.getProps(),
            o = lt(
              window,
              "pointerup",
              (a, l) => {
                if (!this.checkPressEnd()) return
                const {
                    onTap: c,
                    onTapCancel: u,
                    globalTapTarget: d,
                  } = this.node.getProps(),
                  h = !d && !Mi(this.node.current, a.target) ? u : c
                h && M.update(() => h(a, l))
              },
              { passive: !(r.onTap || r.onPointerUp) },
            ),
            s = lt(window, "pointercancel", (a, l) => this.cancelPress(a, l), {
              passive: !(r.onTapCancel || r.onPointerCancel),
            })
          ;(this.removeEndListeners = ct(o, s)), this.startPress(e, n)
        }),
        (this.startAccessiblePress = () => {
          const e = (o) => {
              if (o.key !== "Enter" || this.isPressing) return
              const s = (a) => {
                a.key !== "Enter" ||
                  !this.checkPressEnd() ||
                  gn("up", (l, c) => {
                    const { onTap: u } = this.node.getProps()
                    u && M.postRender(() => u(l, c))
                  })
              }
              this.removeEndListeners(),
                (this.removeEndListeners = at(this.node.current, "keyup", s)),
                gn("down", (a, l) => {
                  this.startPress(a, l)
                })
            },
            n = at(this.node.current, "keydown", e),
            r = () => {
              this.isPressing && gn("cancel", (o, s) => this.cancelPress(o, s))
            },
            i = at(this.node.current, "blur", r)
          this.removeAccessibleListeners = ct(n, i)
        })
    }
    startPress(e, n) {
      this.isPressing = !0
      const { onTapStart: r, whileTap: i } = this.node.getProps()
      i &&
        this.node.animationState &&
        this.node.animationState.setActive("whileTap", !0),
        r && M.postRender(() => r(e, n))
    }
    checkPressEnd() {
      return (
        this.removeEndListeners(),
        (this.isPressing = !1),
        this.node.getProps().whileTap &&
          this.node.animationState &&
          this.node.animationState.setActive("whileTap", !1),
        !Di()
      )
    }
    cancelPress(e, n) {
      if (!this.checkPressEnd()) return
      const { onTapCancel: r } = this.node.getProps()
      r && M.postRender(() => r(e, n))
    }
    mount() {
      const e = this.node.getProps(),
        n = lt(
          e.globalTapTarget ? window : this.node.current,
          "pointerdown",
          this.startPointerPress,
          { passive: !(e.onTapStart || e.onPointerStart) },
        ),
        r = at(this.node.current, "focus", this.startAccessiblePress)
      this.removeStartListeners = ct(n, r)
    }
    unmount() {
      this.removeStartListeners(),
        this.removeEndListeners(),
        this.removeAccessibleListeners()
    }
  }
  const yn = new WeakMap(),
    vn = new WeakMap(),
    lc = (t) => {
      const e = yn.get(t.target)
      e && e(t)
    },
    cc = (t) => {
      t.forEach(lc)
    }
  function uc({ root: t, ...e }) {
    const n = t || document
    vn.has(n) || vn.set(n, {})
    const r = vn.get(n),
      i = JSON.stringify(e)
    return (
      r[i] || (r[i] = new IntersectionObserver(cc, { root: t, ...e })), r[i]
    )
  }
  function dc(t, e, n) {
    const r = uc(e)
    return (
      yn.set(t, n),
      r.observe(t),
      () => {
        yn.delete(t), r.unobserve(t)
      }
    )
  }
  const fc = { some: 0, all: 1 }
  class hc extends gt {
    constructor() {
      super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1)
    }
    startObserver() {
      this.unmount()
      const { viewport: e = {} } = this.node.getProps(),
        { root: n, margin: r, amount: i = "some", once: o } = e,
        s = {
          root: n ? n.current : void 0,
          rootMargin: r,
          threshold: typeof i == "number" ? i : fc[i],
        },
        a = (l) => {
          const { isIntersecting: c } = l
          if (
            this.isInView === c ||
            ((this.isInView = c), o && !c && this.hasEnteredView)
          )
            return
          c && (this.hasEnteredView = !0),
            this.node.animationState &&
              this.node.animationState.setActive("whileInView", c)
          const { onViewportEnter: u, onViewportLeave: d } =
              this.node.getProps(),
            h = c ? u : d
          h && h(l)
        }
      return dc(this.node.current, s, a)
    }
    mount() {
      this.startObserver()
    }
    update() {
      if (typeof IntersectionObserver > "u") return
      const { props: e, prevProps: n } = this.node
      ;["amount", "margin", "root"].some(pc(e, n)) && this.startObserver()
    }
    unmount() {}
  }
  function pc({ viewport: t = {} }, { viewport: e = {} } = {}) {
    return (n) => t[n] !== e[n]
  }
  const mc = {
    inView: { Feature: hc },
    tap: { Feature: ac },
    focus: { Feature: oc },
    hover: { Feature: sc },
  }
  function Oi(t, e) {
    if (!Array.isArray(e)) return !1
    const n = e.length
    if (n !== t.length) return !1
    for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1
    return !0
  }
  function Ce(t, e, n) {
    const r = t.getProps()
    return hn(r, e, n !== void 0 ? n : r.custom, t)
  }
  const ut = (t) => t * 1e3,
    dt = (t) => t / 1e3,
    gc = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
    yc = (t) => ({
      type: "spring",
      stiffness: 550,
      damping: t === 0 ? 2 * Math.sqrt(550) : 30,
      restSpeed: 10,
    }),
    vc = { type: "keyframes", duration: 0.8 },
    bc = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
    xc = (t, { keyframes: e }) =>
      e.length > 2
        ? vc
        : ht.has(t)
          ? t.startsWith("scale")
            ? yc(e[1])
            : gc
          : bc
  function Tc({
    when: t,
    delay: e,
    delayChildren: n,
    staggerChildren: r,
    staggerDirection: i,
    repeat: o,
    repeatType: s,
    repeatDelay: a,
    from: l,
    elapsed: c,
    ...u
  }) {
    return !!Object.keys(u).length
  }
  function bn(t, e) {
    return t[e] || t.default || t
  }
  const Pc = (t) => t !== null
  function Ae(t, { repeat: e, repeatType: n = "loop" }, r) {
    const i = t.filter(Pc),
      o = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1
    return !o || r === void 0 ? i[o] : r
  }
  let Ee
  function Sc() {
    Ee = void 0
  }
  const yt = {
      now: () => (
        Ee === void 0 &&
          yt.set(
            U.isProcessing || al.useManualTiming
              ? U.timestamp
              : performance.now(),
          ),
        Ee
      ),
      set: (t) => {
        ;(Ee = t), queueMicrotask(Sc)
      },
    },
    ji = (t) => /^0[^.\s]+$/u.test(t)
  function wc(t) {
    return typeof t == "number"
      ? t === 0
      : t !== null
        ? t === "none" || t === "0" || ji(t)
        : !0
  }
  const Li = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
    Cc = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
  function Ac(t) {
    const e = Cc.exec(t)
    if (!e) return [,]
    const [, n, r, i] = e
    return [`--${n ?? r}`, i]
  }
  const Ec = 4
  function Fi(t, e, n = 1) {
    ft(
      n <= Ec,
      `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`,
    )
    const [r, i] = Ac(t)
    if (!r) return
    const o = window.getComputedStyle(e).getPropertyValue(r)
    if (o) {
      const s = o.trim()
      return Li(s) ? parseFloat(s) : s
    }
    return on(i) ? Fi(i, e, n + 1) : i
  }
  const Vc = new Set([
      "width",
      "height",
      "top",
      "left",
      "right",
      "bottom",
      "x",
      "y",
      "translateX",
      "translateY",
    ]),
    Ii = (t) => t === Dt || t === w,
    Bi = (t, e) => parseFloat(t.split(", ")[e]),
    Ni =
      (t, e) =>
      (n, { transform: r }) => {
        if (r === "none" || !r) return 0
        const i = r.match(/^matrix3d\((.+)\)$/u)
        if (i) return Bi(i[1], e)
        {
          const o = r.match(/^matrix\((.+)\)$/u)
          return o ? Bi(o[1], t) : 0
        }
      },
    Rc = new Set(["x", "y", "z"]),
    _c = Ht.filter((t) => !Rc.has(t))
  function Dc(t) {
    const e = []
    return (
      _c.forEach((n) => {
        const r = t.getValue(n)
        r !== void 0 &&
          (e.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0))
      }),
      e
    )
  }
  const kt = {
    width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
      t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
      t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t, { top: e }) => parseFloat(e),
    left: (t, { left: e }) => parseFloat(e),
    bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
    right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
    x: Ni(4, 13),
    y: Ni(5, 14),
  }
  ;(kt.translateX = kt.x), (kt.translateY = kt.y)
  const Wi = (t) => (e) => e.test(t),
    Ki = [
      Dt,
      w,
      nt,
      mt,
      jl,
      Ol,
      { test: (t) => t === "auto", parse: (t) => t },
    ],
    Ui = (t) => Ki.find(Wi(t)),
    Tt = new Set()
  let xn = !1,
    Tn = !1
  function $i() {
    if (Tn) {
      const t = Array.from(Tt).filter((r) => r.needsMeasurement),
        e = new Set(t.map((r) => r.element)),
        n = new Map()
      e.forEach((r) => {
        const i = Dc(r)
        i.length && (n.set(r, i), r.render())
      }),
        t.forEach((r) => r.measureInitialState()),
        e.forEach((r) => {
          r.render()
          const i = n.get(r)
          i &&
            i.forEach(([o, s]) => {
              var a
              ;(a = r.getValue(o)) === null || a === void 0 || a.set(s)
            })
        }),
        t.forEach((r) => r.measureEndState()),
        t.forEach((r) => {
          r.suspendedScrollY !== void 0 &&
            window.scrollTo(0, r.suspendedScrollY)
        })
    }
    ;(Tn = !1), (xn = !1), Tt.forEach((t) => t.complete()), Tt.clear()
  }
  function zi() {
    Tt.forEach((t) => {
      t.readKeyframes(), t.needsMeasurement && (Tn = !0)
    })
  }
  function kc() {
    zi(), $i()
  }
  class Pn {
    constructor(e, n, r, i, o, s = !1) {
      ;(this.isComplete = !1),
        (this.isAsync = !1),
        (this.needsMeasurement = !1),
        (this.isScheduled = !1),
        (this.unresolvedKeyframes = [...e]),
        (this.onComplete = n),
        (this.name = r),
        (this.motionValue = i),
        (this.element = o),
        (this.isAsync = s)
    }
    scheduleResolve() {
      ;(this.isScheduled = !0),
        this.isAsync
          ? (Tt.add(this),
            xn || ((xn = !0), M.read(zi), M.resolveKeyframes($i)))
          : (this.readKeyframes(), this.complete())
    }
    readKeyframes() {
      const {
        unresolvedKeyframes: e,
        name: n,
        element: r,
        motionValue: i,
      } = this
      for (let o = 0; o < e.length; o++)
        if (e[o] === null)
          if (o === 0) {
            const s = i == null ? void 0 : i.get(),
              a = e[e.length - 1]
            if (s !== void 0) e[0] = s
            else if (r && n) {
              const l = r.readValue(n, a)
              l != null && (e[0] = l)
            }
            e[0] === void 0 && (e[0] = a), i && s === void 0 && i.set(e[0])
          } else e[o] = e[o - 1]
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete() {
      ;(this.isComplete = !0),
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
        Tt.delete(this)
    }
    cancel() {
      this.isComplete || ((this.isScheduled = !1), Tt.delete(this))
    }
    resume() {
      this.isComplete || this.scheduleResolve()
    }
  }
  const Sn = (t, e) => (n) =>
      !!(
        (Xt(n) && kl.test(n) && n.startsWith(t)) ||
        (e && !Ml(n) && Object.prototype.hasOwnProperty.call(n, e))
      ),
    Hi = (t, e, n) => (r) => {
      if (!Xt(r)) return r
      const [i, o, s, a] = r.match(an)
      return {
        [t]: parseFloat(i),
        [e]: parseFloat(o),
        [n]: parseFloat(s),
        alpha: a !== void 0 ? parseFloat(a) : 1,
      }
    },
    Mc = (t) => pt(0, 255, t),
    wn = { ...Dt, transform: (t) => Math.round(Mc(t)) },
    Pt = {
      test: Sn("rgb", "red"),
      parse: Hi("red", "green", "blue"),
      transform: ({ red: t, green: e, blue: n, alpha: r = 1 }) =>
        "rgba(" +
        wn.transform(t) +
        ", " +
        wn.transform(e) +
        ", " +
        wn.transform(n) +
        ", " +
        Yt(Gt.transform(r)) +
        ")",
    }
  function Oc(t) {
    let e = "",
      n = "",
      r = "",
      i = ""
    return (
      t.length > 5
        ? ((e = t.substring(1, 3)),
          (n = t.substring(3, 5)),
          (r = t.substring(5, 7)),
          (i = t.substring(7, 9)))
        : ((e = t.substring(1, 2)),
          (n = t.substring(2, 3)),
          (r = t.substring(3, 4)),
          (i = t.substring(4, 5)),
          (e += e),
          (n += n),
          (r += r),
          (i += i)),
      {
        red: parseInt(e, 16),
        green: parseInt(n, 16),
        blue: parseInt(r, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1,
      }
    )
  }
  const Cn = { test: Sn("#"), parse: Oc, transform: Pt.transform },
    Mt = {
      test: Sn("hsl", "hue"),
      parse: Hi("hue", "saturation", "lightness"),
      transform: ({ hue: t, saturation: e, lightness: n, alpha: r = 1 }) =>
        "hsla(" +
        Math.round(t) +
        ", " +
        nt.transform(Yt(e)) +
        ", " +
        nt.transform(Yt(n)) +
        ", " +
        Yt(Gt.transform(r)) +
        ")",
    },
    z = {
      test: (t) => Pt.test(t) || Cn.test(t) || Mt.test(t),
      parse: (t) =>
        Pt.test(t) ? Pt.parse(t) : Mt.test(t) ? Mt.parse(t) : Cn.parse(t),
      transform: (t) =>
        Xt(t) ? t : t.hasOwnProperty("red") ? Pt.transform(t) : Mt.transform(t),
    }
  function jc(t) {
    var e, n
    return (
      isNaN(t) &&
      Xt(t) &&
      (((e = t.match(an)) === null || e === void 0 ? void 0 : e.length) || 0) +
        (((n = t.match(Dl)) === null || n === void 0 ? void 0 : n.length) ||
          0) >
        0
    )
  }
  const Gi = "number",
    Yi = "color",
    Lc = "var",
    Fc = "var(",
    Xi = "${}",
    Ic =
      /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
  function Zt(t) {
    const e = t.toString(),
      n = [],
      r = { color: [], number: [], var: [] },
      i = []
    let o = 0
    const a = e
      .replace(
        Ic,
        (l) => (
          z.test(l)
            ? (r.color.push(o), i.push(Yi), n.push(z.parse(l)))
            : l.startsWith(Fc)
              ? (r.var.push(o), i.push(Lc), n.push(l))
              : (r.number.push(o), i.push(Gi), n.push(parseFloat(l))),
          ++o,
          Xi
        ),
      )
      .split(Xi)
    return { values: n, split: a, indexes: r, types: i }
  }
  function qi(t) {
    return Zt(t).values
  }
  function Zi(t) {
    const { split: e, types: n } = Zt(t),
      r = e.length
    return (i) => {
      let o = ""
      for (let s = 0; s < r; s++)
        if (((o += e[s]), i[s] !== void 0)) {
          const a = n[s]
          a === Gi
            ? (o += Yt(i[s]))
            : a === Yi
              ? (o += z.transform(i[s]))
              : (o += i[s])
        }
      return o
    }
  }
  const Bc = (t) => (typeof t == "number" ? 0 : t)
  function Nc(t) {
    const e = qi(t)
    return Zi(t)(e.map(Bc))
  }
  const vt = {
      test: jc,
      parse: qi,
      createTransformer: Zi,
      getAnimatableNone: Nc,
    },
    Wc = new Set(["brightness", "contrast", "saturate", "opacity"])
  function Kc(t) {
    const [e, n] = t.slice(0, -1).split("(")
    if (e === "drop-shadow") return t
    const [r] = n.match(an) || []
    if (!r) return t
    const i = n.replace(r, "")
    let o = Wc.has(e) ? 1 : 0
    return r !== n && (o *= 100), e + "(" + o + i + ")"
  }
  const Uc = /\b([a-z-]*)\(.*?\)/gu,
    An = {
      ...vt,
      getAnimatableNone: (t) => {
        const e = t.match(Uc)
        return e ? e.map(Kc).join(" ") : t
      },
    },
    $c = {
      ...fi,
      color: z,
      backgroundColor: z,
      outlineColor: z,
      fill: z,
      stroke: z,
      borderColor: z,
      borderTopColor: z,
      borderRightColor: z,
      borderBottomColor: z,
      borderLeftColor: z,
      filter: An,
      WebkitFilter: An,
    },
    En = (t) => $c[t]
  function Ji(t, e) {
    let n = En(t)
    return (
      n !== An && (n = vt),
      n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
    )
  }
  const zc = new Set(["auto", "none", "0"])
  function Hc(t, e, n) {
    let r = 0,
      i
    for (; r < t.length && !i; ) {
      const o = t[r]
      typeof o == "string" && !zc.has(o) && Zt(o).values.length && (i = t[r]),
        r++
    }
    if (i && n) for (const o of e) t[o] = Ji(n, i)
  }
  class Qi extends Pn {
    constructor(e, n, r, i) {
      super(e, n, r, i, i == null ? void 0 : i.owner, !0)
    }
    readKeyframes() {
      const { unresolvedKeyframes: e, element: n, name: r } = this
      if (!n.current) return
      super.readKeyframes()
      for (let l = 0; l < e.length; l++) {
        let c = e[l]
        if (typeof c == "string" && ((c = c.trim()), on(c))) {
          const u = Fi(c, n.current)
          u !== void 0 && (e[l] = u),
            l === e.length - 1 && (this.finalKeyframe = c)
        }
      }
      if ((this.resolveNoneKeyframes(), !Vc.has(r) || e.length !== 2)) return
      const [i, o] = e,
        s = Ui(i),
        a = Ui(o)
      if (s !== a)
        if (Ii(s) && Ii(a))
          for (let l = 0; l < e.length; l++) {
            const c = e[l]
            typeof c == "string" && (e[l] = parseFloat(c))
          }
        else this.needsMeasurement = !0
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes: e, name: n } = this,
        r = []
      for (let i = 0; i < e.length; i++) wc(e[i]) && r.push(i)
      r.length && Hc(e, r, n)
    }
    measureInitialState() {
      const { element: e, unresolvedKeyframes: n, name: r } = this
      if (!e.current) return
      r === "height" && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = kt[r](
          e.measureViewportBox(),
          window.getComputedStyle(e.current),
        )),
        (n[0] = this.measuredOrigin)
      const i = n[n.length - 1]
      i !== void 0 && e.getValue(r, i).jump(i, !1)
    }
    measureEndState() {
      var e
      const { element: n, name: r, unresolvedKeyframes: i } = this
      if (!n.current) return
      const o = n.getValue(r)
      o && o.jump(this.measuredOrigin, !1)
      const s = i.length - 1,
        a = i[s]
      ;(i[s] = kt[r](
        n.measureViewportBox(),
        window.getComputedStyle(n.current),
      )),
        a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
        !((e = this.removedTransforms) === null || e === void 0) &&
          e.length &&
          this.removedTransforms.forEach(([l, c]) => {
            n.getValue(l).set(c)
          }),
        this.resolveNoneKeyframes()
    }
  }
  function ts(t) {
    let e
    return () => (e === void 0 && (e = t()), e)
  }
  const es = (t, e) =>
    e === "zIndex"
      ? !1
      : !!(
          typeof t == "number" ||
          Array.isArray(t) ||
          (typeof t == "string" &&
            (vt.test(t) || t === "0") &&
            !t.startsWith("url("))
        )
  function Gc(t) {
    const e = t[0]
    if (t.length === 1) return !0
    for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0
  }
  function Yc(t, e, n, r) {
    const i = t[0]
    if (i === null) return !1
    if (e === "display" || e === "visibility") return !0
    const o = t[t.length - 1],
      s = es(i, e),
      a = es(o, e)
    return (
      _t(
        s === a,
        `You are trying to animate ${e} from "${i}" to "${o}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${o} via the \`style\` property.`,
      ),
      !s || !a ? !1 : Gc(t) || (n === "spring" && r)
    )
  }
  class ns {
    constructor({
      autoplay: e = !0,
      delay: n = 0,
      type: r = "keyframes",
      repeat: i = 0,
      repeatDelay: o = 0,
      repeatType: s = "loop",
      ...a
    }) {
      ;(this.isStopped = !1),
        (this.hasAttemptedResolve = !1),
        (this.options = {
          autoplay: e,
          delay: n,
          type: r,
          repeat: i,
          repeatDelay: o,
          repeatType: s,
          ...a,
        }),
        this.updateFinishedPromise()
    }
    get resolved() {
      return (
        !this._resolved && !this.hasAttemptedResolve && kc(), this._resolved
      )
    }
    onKeyframesResolved(e, n) {
      this.hasAttemptedResolve = !0
      const {
        name: r,
        type: i,
        velocity: o,
        delay: s,
        onComplete: a,
        onUpdate: l,
        isGenerator: c,
      } = this.options
      if (!c && !Yc(e, r, i, o))
        if (s) this.options.duration = 0
        else {
          l == null || l(Ae(e, this.options, n)),
            a == null || a(),
            this.resolveFinishedPromise()
          return
        }
      const u = this.initPlayback(e, n)
      u !== !1 &&
        ((this._resolved = { keyframes: e, finalKeyframe: n, ...u }),
        this.onPostResolved())
    }
    onPostResolved() {}
    then(e, n) {
      return this.currentFinishedPromise.then(e, n)
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise((e) => {
        this.resolveFinishedPromise = e
      })
    }
  }
  function rs(t, e) {
    return e ? t * (1e3 / e) : 0
  }
  const Xc = 5
  function is(t, e, n) {
    const r = Math.max(e - Xc, 0)
    return rs(n - t(r), e - r)
  }
  const Vn = 0.001,
    qc = 0.01,
    ss = 10,
    Zc = 0.05,
    Jc = 1
  function Qc({
    duration: t = 800,
    bounce: e = 0.25,
    velocity: n = 0,
    mass: r = 1,
  }) {
    let i, o
    _t(t <= ut(ss), "Spring duration must be 10 seconds or less")
    let s = 1 - e
    ;(s = pt(Zc, Jc, s)),
      (t = pt(qc, ss, dt(t))),
      s < 1
        ? ((i = (c) => {
            const u = c * s,
              d = u * t,
              h = u - n,
              p = Rn(c, s),
              m = Math.exp(-d)
            return Vn - (h / p) * m
          }),
          (o = (c) => {
            const d = c * s * t,
              h = d * n + n,
              p = Math.pow(s, 2) * Math.pow(c, 2) * t,
              m = Math.exp(-d),
              v = Rn(Math.pow(c, 2), s)
            return ((-i(c) + Vn > 0 ? -1 : 1) * ((h - p) * m)) / v
          }))
        : ((i = (c) => {
            const u = Math.exp(-c * t),
              d = (c - n) * t + 1
            return -Vn + u * d
          }),
          (o = (c) => {
            const u = Math.exp(-c * t),
              d = (n - c) * (t * t)
            return u * d
          }))
    const a = 5 / t,
      l = eu(i, o, a)
    if (((t = ut(t)), isNaN(l)))
      return { stiffness: 100, damping: 10, duration: t }
    {
      const c = Math.pow(l, 2) * r
      return { stiffness: c, damping: s * 2 * Math.sqrt(r * c), duration: t }
    }
  }
  const tu = 12
  function eu(t, e, n) {
    let r = n
    for (let i = 1; i < tu; i++) r = r - t(r) / e(r)
    return r
  }
  function Rn(t, e) {
    return t * Math.sqrt(1 - e * e)
  }
  const nu = ["duration", "bounce"],
    ru = ["stiffness", "damping", "mass"]
  function os(t, e) {
    return e.some((n) => t[n] !== void 0)
  }
  function iu(t) {
    let e = {
      velocity: 0,
      stiffness: 100,
      damping: 10,
      mass: 1,
      isResolvedFromDuration: !1,
      ...t,
    }
    if (!os(t, ru) && os(t, nu)) {
      const n = Qc(t)
      ;(e = { ...e, ...n, mass: 1 }), (e.isResolvedFromDuration = !0)
    }
    return e
  }
  function as({ keyframes: t, restDelta: e, restSpeed: n, ...r }) {
    const i = t[0],
      o = t[t.length - 1],
      s = { done: !1, value: i },
      {
        stiffness: a,
        damping: l,
        mass: c,
        duration: u,
        velocity: d,
        isResolvedFromDuration: h,
      } = iu({ ...r, velocity: -dt(r.velocity || 0) }),
      p = d || 0,
      m = l / (2 * Math.sqrt(a * c)),
      v = o - i,
      P = dt(Math.sqrt(a / c)),
      T = Math.abs(v) < 5
    n || (n = T ? 0.01 : 2), e || (e = T ? 0.005 : 0.5)
    let b
    if (m < 1) {
      const S = Rn(P, m)
      b = (A) => {
        const V = Math.exp(-m * P * A)
        return (
          o -
          V * (((p + m * P * v) / S) * Math.sin(S * A) + v * Math.cos(S * A))
        )
      }
    } else if (m === 1) b = (S) => o - Math.exp(-P * S) * (v + (p + P * v) * S)
    else {
      const S = P * Math.sqrt(m * m - 1)
      b = (A) => {
        const V = Math.exp(-m * P * A),
          B = Math.min(S * A, 300)
        return (
          o - (V * ((p + m * P * v) * Math.sinh(B) + S * v * Math.cosh(B))) / S
        )
      }
    }
    return {
      calculatedDuration: (h && u) || null,
      next: (S) => {
        const A = b(S)
        if (h) s.done = S >= u
        else {
          let V = p
          S !== 0 && (m < 1 ? (V = is(b, S, A)) : (V = 0))
          const B = Math.abs(V) <= n,
            rt = Math.abs(o - A) <= e
          s.done = B && rt
        }
        return (s.value = s.done ? o : A), s
      },
    }
  }
  function ls({
    keyframes: t,
    velocity: e = 0,
    power: n = 0.8,
    timeConstant: r = 325,
    bounceDamping: i = 10,
    bounceStiffness: o = 500,
    modifyTarget: s,
    min: a,
    max: l,
    restDelta: c = 0.5,
    restSpeed: u,
  }) {
    const d = t[0],
      h = { done: !1, value: d },
      p = (R) => (a !== void 0 && R < a) || (l !== void 0 && R > l),
      m = (R) =>
        a === void 0
          ? l
          : l === void 0 || Math.abs(a - R) < Math.abs(l - R)
            ? a
            : l
    let v = n * e
    const P = d + v,
      T = s === void 0 ? P : s(P)
    T !== P && (v = T - d)
    const b = (R) => -v * Math.exp(-R / r),
      S = (R) => T + b(R),
      A = (R) => {
        const H = b(R),
          Y = S(R)
        ;(h.done = Math.abs(H) <= c), (h.value = h.done ? T : Y)
      }
    let V, B
    const rt = (R) => {
      p(h.value) &&
        ((V = R),
        (B = as({
          keyframes: [h.value, m(h.value)],
          velocity: is(S, R, h.value),
          damping: i,
          stiffness: o,
          restDelta: c,
          restSpeed: u,
        })))
    }
    return (
      rt(0),
      {
        calculatedDuration: null,
        next: (R) => {
          let H = !1
          return (
            !B && V === void 0 && ((H = !0), A(R), rt(R)),
            V !== void 0 && R >= V ? B.next(R - V) : (!H && A(R), h)
          )
        },
      }
    )
  }
  const cs = (t, e, n) =>
      (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
    su = 1e-7,
    ou = 12
  function au(t, e, n, r, i) {
    let o,
      s,
      a = 0
    do (s = e + (n - e) / 2), (o = cs(s, r, i) - t), o > 0 ? (n = s) : (e = s)
    while (Math.abs(o) > su && ++a < ou)
    return s
  }
  function Jt(t, e, n, r) {
    if (t === e && n === r) return K
    const i = (o) => au(o, 0, 1, t, n)
    return (o) => (o === 0 || o === 1 ? o : cs(i(o), e, r))
  }
  const lu = Jt(0.42, 0, 1, 1),
    cu = Jt(0, 0, 0.58, 1),
    us = Jt(0.42, 0, 0.58, 1),
    uu = (t) => Array.isArray(t) && typeof t[0] != "number",
    ds = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
    fs = (t) => (e) => 1 - t(1 - e),
    _n = (t) => 1 - Math.sin(Math.acos(t)),
    hs = fs(_n),
    du = ds(_n),
    ps = Jt(0.33, 1.53, 0.69, 0.99),
    Dn = fs(ps),
    fu = ds(Dn),
    ms = {
      linear: K,
      easeIn: lu,
      easeInOut: us,
      easeOut: cu,
      circIn: _n,
      circInOut: du,
      circOut: hs,
      backIn: Dn,
      backInOut: fu,
      backOut: ps,
      anticipate: (t) =>
        (t *= 2) < 1 ? 0.5 * Dn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
    },
    gs = (t) => {
      if (Array.isArray(t)) {
        ft(
          t.length === 4,
          "Cubic bezier arrays must contain four numerical values.",
        )
        const [e, n, r, i] = t
        return Jt(e, n, r, i)
      } else if (typeof t == "string")
        return ft(ms[t] !== void 0, `Invalid easing type '${t}'`), ms[t]
      return t
    },
    Qt = (t, e, n) => {
      const r = e - t
      return r === 0 ? 1 : (n - t) / r
    },
    j = (t, e, n) => t + (e - t) * n
  function kn(t, e, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? t + (e - t) * 6 * n
        : n < 1 / 2
          ? e
          : n < 2 / 3
            ? t + (e - t) * (2 / 3 - n) * 6
            : t
    )
  }
  function hu({ hue: t, saturation: e, lightness: n, alpha: r }) {
    ;(t /= 360), (e /= 100), (n /= 100)
    let i = 0,
      o = 0,
      s = 0
    if (!e) i = o = s = n
    else {
      const a = n < 0.5 ? n * (1 + e) : n + e - n * e,
        l = 2 * n - a
      ;(i = kn(l, a, t + 1 / 3)), (o = kn(l, a, t)), (s = kn(l, a, t - 1 / 3))
    }
    return {
      red: Math.round(i * 255),
      green: Math.round(o * 255),
      blue: Math.round(s * 255),
      alpha: r,
    }
  }
  function Ve(t, e) {
    return (n) => (n > 0 ? e : t)
  }
  const Mn = (t, e, n) => {
      const r = t * t,
        i = n * (e * e - r) + r
      return i < 0 ? 0 : Math.sqrt(i)
    },
    pu = [Cn, Pt, Mt],
    mu = (t) => pu.find((e) => e.test(t))
  function ys(t) {
    const e = mu(t)
    if (
      (_t(
        !!e,
        `'${t}' is not an animatable color. Use the equivalent color code instead.`,
      ),
      !e)
    )
      return !1
    let n = e.parse(t)
    return e === Mt && (n = hu(n)), n
  }
  const vs = (t, e) => {
      const n = ys(t),
        r = ys(e)
      if (!n || !r) return Ve(t, e)
      const i = { ...n }
      return (o) => (
        (i.red = Mn(n.red, r.red, o)),
        (i.green = Mn(n.green, r.green, o)),
        (i.blue = Mn(n.blue, r.blue, o)),
        (i.alpha = j(n.alpha, r.alpha, o)),
        Pt.transform(i)
      )
    },
    On = new Set(["none", "hidden"])
  function gu(t, e) {
    return On.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t)
  }
  function yu(t, e) {
    return (n) => j(t, e, n)
  }
  function jn(t) {
    return typeof t == "number"
      ? yu
      : typeof t == "string"
        ? on(t)
          ? Ve
          : z.test(t)
            ? vs
            : xu
        : Array.isArray(t)
          ? bs
          : typeof t == "object"
            ? z.test(t)
              ? vs
              : vu
            : Ve
  }
  function bs(t, e) {
    const n = [...t],
      r = n.length,
      i = t.map((o, s) => jn(o)(o, e[s]))
    return (o) => {
      for (let s = 0; s < r; s++) n[s] = i[s](o)
      return n
    }
  }
  function vu(t, e) {
    const n = { ...t, ...e },
      r = {}
    for (const i in n)
      t[i] !== void 0 && e[i] !== void 0 && (r[i] = jn(t[i])(t[i], e[i]))
    return (i) => {
      for (const o in r) n[o] = r[o](i)
      return n
    }
  }
  function bu(t, e) {
    var n
    const r = [],
      i = { color: 0, var: 0, number: 0 }
    for (let o = 0; o < e.values.length; o++) {
      const s = e.types[o],
        a = t.indexes[s][i[s]],
        l = (n = t.values[a]) !== null && n !== void 0 ? n : 0
      ;(r[o] = l), i[s]++
    }
    return r
  }
  const xu = (t, e) => {
    const n = vt.createTransformer(e),
      r = Zt(t),
      i = Zt(e)
    return r.indexes.var.length === i.indexes.var.length &&
      r.indexes.color.length === i.indexes.color.length &&
      r.indexes.number.length >= i.indexes.number.length
      ? (On.has(t) && !i.values.length) || (On.has(e) && !r.values.length)
        ? gu(t, e)
        : ct(bs(bu(r, i), i.values), n)
      : (_t(
          !0,
          `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
        ),
        Ve(t, e))
  }
  function xs(t, e, n) {
    return typeof t == "number" && typeof e == "number" && typeof n == "number"
      ? j(t, e, n)
      : jn(t)(t, e)
  }
  function Tu(t, e, n) {
    const r = [],
      i = n || xs,
      o = t.length - 1
    for (let s = 0; s < o; s++) {
      let a = i(t[s], t[s + 1])
      if (e) {
        const l = Array.isArray(e) ? e[s] || K : e
        a = ct(l, a)
      }
      r.push(a)
    }
    return r
  }
  function Pu(t, e, { clamp: n = !0, ease: r, mixer: i } = {}) {
    const o = t.length
    if (
      (ft(
        o === e.length,
        "Both input and output ranges must be the same length",
      ),
      o === 1)
    )
      return () => e[0]
    if (o === 2 && t[0] === t[1]) return () => e[1]
    t[0] > t[o - 1] && ((t = [...t].reverse()), (e = [...e].reverse()))
    const s = Tu(e, r, i),
      a = s.length,
      l = (c) => {
        let u = 0
        if (a > 1) for (; u < t.length - 2 && !(c < t[u + 1]); u++);
        const d = Qt(t[u], t[u + 1], c)
        return s[u](d)
      }
    return n ? (c) => l(pt(t[0], t[o - 1], c)) : l
  }
  function Su(t, e) {
    const n = t[t.length - 1]
    for (let r = 1; r <= e; r++) {
      const i = Qt(0, e, r)
      t.push(j(n, 1, i))
    }
  }
  function wu(t) {
    const e = [0]
    return Su(e, t.length - 1), e
  }
  function Cu(t, e) {
    return t.map((n) => n * e)
  }
  function Au(t, e) {
    return t.map(() => e || us).splice(0, t.length - 1)
  }
  function Re({
    duration: t = 300,
    keyframes: e,
    times: n,
    ease: r = "easeInOut",
  }) {
    const i = uu(r) ? r.map(gs) : gs(r),
      o = { done: !1, value: e[0] },
      s = Cu(n && n.length === e.length ? n : wu(e), t),
      a = Pu(s, e, { ease: Array.isArray(i) ? i : Au(e, i) })
    return {
      calculatedDuration: t,
      next: (l) => ((o.value = a(l)), (o.done = l >= t), o),
    }
  }
  const Ts = 2e4
  function Eu(t) {
    let e = 0
    const n = 50
    let r = t.next(e)
    for (; !r.done && e < Ts; ) (e += n), (r = t.next(e))
    return e >= Ts ? 1 / 0 : e
  }
  const Vu = (t) => {
      const e = ({ timestamp: n }) => t(n)
      return {
        start: () => M.update(e, !0),
        stop: () => ot(e),
        now: () => (U.isProcessing ? U.timestamp : yt.now()),
      }
    },
    Ru = { decay: ls, inertia: ls, tween: Re, keyframes: Re, spring: as },
    _u = (t) => t / 100
  class Ln extends ns {
    constructor({ KeyframeResolver: e = Pn, ...n }) {
      super(n),
        (this.holdTime = null),
        (this.startTime = null),
        (this.cancelTime = null),
        (this.currentTime = 0),
        (this.playbackSpeed = 1),
        (this.pendingPlayState = "running"),
        (this.state = "idle"),
        (this.stop = () => {
          if (
            (this.resolver.cancel(),
            (this.isStopped = !0),
            this.state === "idle")
          )
            return
          this.teardown()
          const { onStop: a } = this.options
          a && a()
        })
      const { name: r, motionValue: i, keyframes: o } = this.options,
        s = (a, l) => this.onKeyframesResolved(a, l)
      r && i && i.owner
        ? (this.resolver = i.owner.resolveKeyframes(o, s, r, i))
        : (this.resolver = new e(o, s, r, i)),
        this.resolver.scheduleResolve()
    }
    initPlayback(e) {
      const {
          type: n = "keyframes",
          repeat: r = 0,
          repeatDelay: i = 0,
          repeatType: o,
          velocity: s = 0,
        } = this.options,
        a = Ru[n] || Re
      let l, c
      a !== Re &&
        typeof e[0] != "number" &&
        (process.env.NODE_ENV !== "production" &&
          ft(
            e.length === 2,
            `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${e}`,
          ),
        (l = ct(_u, xs(e[0], e[1]))),
        (e = [0, 100]))
      const u = a({ ...this.options, keyframes: e })
      o === "mirror" &&
        (c = a({ ...this.options, keyframes: [...e].reverse(), velocity: -s })),
        u.calculatedDuration === null && (u.calculatedDuration = Eu(u))
      const { calculatedDuration: d } = u,
        h = d + i,
        p = h * (r + 1) - i
      return {
        generator: u,
        mirroredGenerator: c,
        mapPercentToKeyframes: l,
        calculatedDuration: d,
        resolvedDuration: h,
        totalDuration: p,
      }
    }
    onPostResolved() {
      const { autoplay: e = !0 } = this.options
      this.play(),
        this.pendingPlayState === "paused" || !e
          ? this.pause()
          : (this.state = this.pendingPlayState)
    }
    tick(e, n = !1) {
      const { resolved: r } = this
      if (!r) {
        const { keyframes: R } = this.options
        return { done: !0, value: R[R.length - 1] }
      }
      const {
        finalKeyframe: i,
        generator: o,
        mirroredGenerator: s,
        mapPercentToKeyframes: a,
        keyframes: l,
        calculatedDuration: c,
        totalDuration: u,
        resolvedDuration: d,
      } = r
      if (this.startTime === null) return o.next(0)
      const {
        delay: h,
        repeat: p,
        repeatType: m,
        repeatDelay: v,
        onUpdate: P,
      } = this.options
      this.speed > 0
        ? (this.startTime = Math.min(this.startTime, e))
        : this.speed < 0 &&
          (this.startTime = Math.min(e - u / this.speed, this.startTime)),
        n
          ? (this.currentTime = e)
          : this.holdTime !== null
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = Math.round(e - this.startTime) * this.speed)
      const T = this.currentTime - h * (this.speed >= 0 ? 1 : -1),
        b = this.speed >= 0 ? T < 0 : T > u
      ;(this.currentTime = Math.max(T, 0)),
        this.state === "finished" &&
          this.holdTime === null &&
          (this.currentTime = u)
      let S = this.currentTime,
        A = o
      if (p) {
        const R = Math.min(this.currentTime, u) / d
        let H = Math.floor(R),
          Y = R % 1
        !Y && R >= 1 && (Y = 1),
          Y === 1 && H--,
          (H = Math.min(H, p + 1)),
          !!(H % 2) &&
            (m === "reverse"
              ? ((Y = 1 - Y), v && (Y -= v / d))
              : m === "mirror" && (A = s)),
          (S = pt(0, 1, Y) * d)
      }
      const V = b ? { done: !1, value: l[0] } : A.next(S)
      a && (V.value = a(V.value))
      let { done: B } = V
      !b &&
        c !== null &&
        (B = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0)
      const rt =
        this.holdTime === null &&
        (this.state === "finished" || (this.state === "running" && B))
      return (
        rt && i !== void 0 && (V.value = Ae(l, this.options, i)),
        P && P(V.value),
        rt && this.finish(),
        V
      )
    }
    get duration() {
      const { resolved: e } = this
      return e ? dt(e.calculatedDuration) : 0
    }
    get time() {
      return dt(this.currentTime)
    }
    set time(e) {
      ;(e = ut(e)),
        (this.currentTime = e),
        this.holdTime !== null || this.speed === 0
          ? (this.holdTime = e)
          : this.driver && (this.startTime = this.driver.now() - e / this.speed)
    }
    get speed() {
      return this.playbackSpeed
    }
    set speed(e) {
      const n = this.playbackSpeed !== e
      ;(this.playbackSpeed = e), n && (this.time = dt(this.currentTime))
    }
    play() {
      if (
        (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
      ) {
        this.pendingPlayState = "running"
        return
      }
      if (this.isStopped) return
      const { driver: e = Vu, onPlay: n } = this.options
      this.driver || (this.driver = e((i) => this.tick(i))), n && n()
      const r = this.driver.now()
      this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : (!this.startTime || this.state === "finished") &&
          (this.startTime = r),
        this.state === "finished" && this.updateFinishedPromise(),
        (this.cancelTime = this.startTime),
        (this.holdTime = null),
        (this.state = "running"),
        this.driver.start()
    }
    pause() {
      var e
      if (!this._resolved) {
        this.pendingPlayState = "paused"
        return
      }
      ;(this.state = "paused"),
        (this.holdTime =
          (e = this.currentTime) !== null && e !== void 0 ? e : 0)
    }
    complete() {
      this.state !== "running" && this.play(),
        (this.pendingPlayState = this.state = "finished"),
        (this.holdTime = null)
    }
    finish() {
      this.teardown(), (this.state = "finished")
      const { onComplete: e } = this.options
      e && e()
    }
    cancel() {
      this.cancelTime !== null && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise()
    }
    teardown() {
      ;(this.state = "idle"),
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        (this.startTime = this.cancelTime = null),
        this.resolver.cancel()
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0))
    }
    sample(e) {
      return (this.startTime = 0), this.tick(e, !0)
    }
  }
  const Ps = (t) => Array.isArray(t) && typeof t[0] == "number"
  function Ss(t) {
    return !!(
      !t ||
      (typeof t == "string" && t in Fn) ||
      Ps(t) ||
      (Array.isArray(t) && t.every(Ss))
    )
  }
  const te = ([t, e, n, r]) => `cubic-bezier(${t}, ${e}, ${n}, ${r})`,
    Fn = {
      linear: "linear",
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      circIn: te([0, 0.65, 0.55, 1]),
      circOut: te([0.55, 0, 1, 0.45]),
      backIn: te([0.31, 0.01, 0.66, -0.59]),
      backOut: te([0.33, 1.53, 0.69, 0.99]),
    }
  function Du(t) {
    return ws(t) || Fn.easeOut
  }
  function ws(t) {
    if (t) return Ps(t) ? te(t) : Array.isArray(t) ? t.map(Du) : Fn[t]
  }
  function ku(
    t,
    e,
    n,
    {
      delay: r = 0,
      duration: i = 300,
      repeat: o = 0,
      repeatType: s = "loop",
      ease: a,
      times: l,
    } = {},
  ) {
    const c = { [e]: n }
    l && (c.offset = l)
    const u = ws(a)
    return (
      Array.isArray(u) && (c.easing = u),
      t.animate(c, {
        delay: r,
        duration: i,
        easing: Array.isArray(u) ? "linear" : u,
        fill: "both",
        iterations: o + 1,
        direction: s === "reverse" ? "alternate" : "normal",
      })
    )
  }
  const Mu = ts(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
    _e = 10,
    Ou = 2e4
  function ju(t) {
    return t.type === "spring" || !Ss(t.ease)
  }
  function Lu(t, e) {
    const n = new Ln({
      ...e,
      keyframes: t,
      repeat: 0,
      delay: 0,
      isGenerator: !0,
    })
    let r = { done: !1, value: t[0] }
    const i = []
    let o = 0
    for (; !r.done && o < Ou; ) (r = n.sample(o)), i.push(r.value), (o += _e)
    return { times: void 0, keyframes: i, duration: o - _e, ease: "linear" }
  }
  class Cs extends ns {
    constructor(e) {
      super(e)
      const { name: n, motionValue: r, keyframes: i } = this.options
      ;(this.resolver = new Qi(
        i,
        (o, s) => this.onKeyframesResolved(o, s),
        n,
        r,
      )),
        this.resolver.scheduleResolve()
    }
    initPlayback(e, n) {
      var r
      let {
        duration: i = 300,
        times: o,
        ease: s,
        type: a,
        motionValue: l,
        name: c,
      } = this.options
      if (!(!((r = l.owner) === null || r === void 0) && r.current)) return !1
      if (ju(this.options)) {
        const {
            onComplete: d,
            onUpdate: h,
            motionValue: p,
            ...m
          } = this.options,
          v = Lu(e, m)
        ;(e = v.keyframes),
          e.length === 1 && (e[1] = e[0]),
          (i = v.duration),
          (o = v.times),
          (s = v.ease),
          (a = "keyframes")
      }
      const u = ku(l.owner.current, c, e, {
        ...this.options,
        duration: i,
        times: o,
        ease: s,
      })
      return (
        (u.startTime = yt.now()),
        this.pendingTimeline
          ? ((u.timeline = this.pendingTimeline),
            (this.pendingTimeline = void 0))
          : (u.onfinish = () => {
              const { onComplete: d } = this.options
              l.set(Ae(e, this.options, n)),
                d && d(),
                this.cancel(),
                this.resolveFinishedPromise()
            }),
        { animation: u, duration: i, times: o, type: a, ease: s, keyframes: e }
      )
    }
    get duration() {
      const { resolved: e } = this
      if (!e) return 0
      const { duration: n } = e
      return dt(n)
    }
    get time() {
      const { resolved: e } = this
      if (!e) return 0
      const { animation: n } = e
      return dt(n.currentTime || 0)
    }
    set time(e) {
      const { resolved: n } = this
      if (!n) return
      const { animation: r } = n
      r.currentTime = ut(e)
    }
    get speed() {
      const { resolved: e } = this
      if (!e) return 1
      const { animation: n } = e
      return n.playbackRate
    }
    set speed(e) {
      const { resolved: n } = this
      if (!n) return
      const { animation: r } = n
      r.playbackRate = e
    }
    get state() {
      const { resolved: e } = this
      if (!e) return "idle"
      const { animation: n } = e
      return n.playState
    }
    attachTimeline(e) {
      if (!this._resolved) this.pendingTimeline = e
      else {
        const { resolved: n } = this
        if (!n) return K
        const { animation: r } = n
        ;(r.timeline = e), (r.onfinish = null)
      }
      return K
    }
    play() {
      if (this.isStopped) return
      const { resolved: e } = this
      if (!e) return
      const { animation: n } = e
      n.playState === "finished" && this.updateFinishedPromise(), n.play()
    }
    pause() {
      const { resolved: e } = this
      if (!e) return
      const { animation: n } = e
      n.pause()
    }
    stop() {
      if (
        (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
      )
        return
      this.resolveFinishedPromise(), this.updateFinishedPromise()
      const { resolved: e } = this
      if (!e) return
      const {
        animation: n,
        keyframes: r,
        duration: i,
        type: o,
        ease: s,
        times: a,
      } = e
      if (n.playState === "idle" || n.playState === "finished") return
      if (this.time) {
        const {
            motionValue: c,
            onUpdate: u,
            onComplete: d,
            ...h
          } = this.options,
          p = new Ln({
            ...h,
            keyframes: r,
            duration: i,
            type: o,
            ease: s,
            times: a,
            isGenerator: !0,
          }),
          m = ut(this.time)
        c.setWithVelocity(p.sample(m - _e).value, p.sample(m).value, _e)
      }
      const { onStop: l } = this.options
      l && l(), this.cancel()
    }
    complete() {
      const { resolved: e } = this
      e && e.animation.finish()
    }
    cancel() {
      const { resolved: e } = this
      e && e.animation.cancel()
    }
    static supports(e) {
      const {
        motionValue: n,
        name: r,
        repeatDelay: i,
        repeatType: o,
        damping: s,
        type: a,
      } = e
      return (
        Mu() &&
        r &&
        Pi.has(r) &&
        n &&
        n.owner &&
        n.owner.current instanceof HTMLElement &&
        !n.owner.getProps().onUpdate &&
        !i &&
        o !== "mirror" &&
        s !== 0 &&
        a !== "inertia"
      )
    }
  }
  function Fu(t, e) {
    let n
    const r = () => {
      const { currentTime: i } = e,
        s = (i === null ? 0 : i.value) / 100
      n !== s && t(s), (n = s)
    }
    return M.update(r, !0), () => ot(r)
  }
  const Iu = ts(() => window.ScrollTimeline !== void 0)
  class Bu {
    constructor(e) {
      ;(this.stop = () => this.runAll("stop")),
        (this.animations = e.filter(Boolean))
    }
    then(e, n) {
      return Promise.all(this.animations).then(e).catch(n)
    }
    getAll(e) {
      return this.animations[0][e]
    }
    setAll(e, n) {
      for (let r = 0; r < this.animations.length; r++) this.animations[r][e] = n
    }
    attachTimeline(e) {
      const n = this.animations.map((r) => {
        if (Iu() && r.attachTimeline) r.attachTimeline(e)
        else
          return (
            r.pause(),
            Fu((i) => {
              r.time = r.duration * i
            }, e)
          )
      })
      return () => {
        n.forEach((r, i) => {
          r && r(), this.animations[i].stop()
        })
      }
    }
    get time() {
      return this.getAll("time")
    }
    set time(e) {
      this.setAll("time", e)
    }
    get speed() {
      return this.getAll("speed")
    }
    set speed(e) {
      this.setAll("speed", e)
    }
    get duration() {
      let e = 0
      for (let n = 0; n < this.animations.length; n++)
        e = Math.max(e, this.animations[n].duration)
      return e
    }
    runAll(e) {
      this.animations.forEach((n) => n[e]())
    }
    play() {
      this.runAll("play")
    }
    pause() {
      this.runAll("pause")
    }
    cancel() {
      this.runAll("cancel")
    }
    complete() {
      this.runAll("complete")
    }
  }
  const In =
    (t, e, n, r = {}, i, o, s) =>
    (a) => {
      const l = bn(r, t) || {},
        c = l.delay || r.delay || 0
      let { elapsed: u = 0 } = r
      u = u - ut(c)
      let d = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: e.getVelocity(),
        ...l,
        delay: -u,
        onUpdate: (p) => {
          e.set(p), l.onUpdate && l.onUpdate(p)
        },
        onComplete: () => {
          a(), l.onComplete && l.onComplete(), s && s()
        },
        onStop: s,
        name: t,
        motionValue: e,
        element: o ? void 0 : i,
      }
      Tc(l) || (d = { ...d, ...xc(t, d) }),
        d.duration && (d.duration = ut(d.duration)),
        d.repeatDelay && (d.repeatDelay = ut(d.repeatDelay)),
        d.from !== void 0 && (d.keyframes[0] = d.from)
      let h = !1
      if (
        ((d.type === !1 || (d.duration === 0 && !d.repeatDelay)) &&
          ((d.duration = 0), d.delay === 0 && (h = !0)),
        h && !o && e.get() !== void 0)
      ) {
        const p = Ae(d.keyframes, l)
        if (p !== void 0)
          return (
            M.update(() => {
              d.onUpdate(p), d.onComplete()
            }),
            new Bu([])
          )
      }
      return !o && Cs.supports(d) ? new Cs(d) : new Ln(d)
    }
  class Bn {
    constructor() {
      this.subscriptions = []
    }
    add(e) {
      return Pe(this.subscriptions, e), () => Se(this.subscriptions, e)
    }
    notify(e, n, r) {
      const i = this.subscriptions.length
      if (i)
        if (i === 1) this.subscriptions[0](e, n, r)
        else
          for (let o = 0; o < i; o++) {
            const s = this.subscriptions[o]
            s && s(e, n, r)
          }
    }
    getSize() {
      return this.subscriptions.length
    }
    clear() {
      this.subscriptions.length = 0
    }
  }
  const As = new Set()
  function Nn(t, e, n) {
    t || As.has(e) || (console.warn(e), As.add(e))
  }
  const Es = 30,
    Nu = (t) => !isNaN(parseFloat(t))
  class Vs {
    constructor(e, n = {}) {
      ;(this.version = "11.3.19"),
        (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (r, i = !0) => {
          const o = yt.now()
          this.updatedAt !== o && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(r),
            this.current !== this.prev &&
              this.events.change &&
              this.events.change.notify(this.current),
            i &&
              this.events.renderRequest &&
              this.events.renderRequest.notify(this.current)
        }),
        (this.hasAnimated = !1),
        this.setCurrent(e),
        (this.owner = n.owner)
    }
    setCurrent(e) {
      ;(this.current = e),
        (this.updatedAt = yt.now()),
        this.canTrackVelocity === null &&
          e !== void 0 &&
          (this.canTrackVelocity = Nu(this.current))
    }
    setPrevFrameValue(e = this.current) {
      ;(this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt)
    }
    onChange(e) {
      return (
        process.env.NODE_ENV !== "production" &&
          Nn(
            !1,
            'value.onChange(callback) is deprecated. Switch to value.on("change", callback).',
          ),
        this.on("change", e)
      )
    }
    on(e, n) {
      this.events[e] || (this.events[e] = new Bn())
      const r = this.events[e].add(n)
      return e === "change"
        ? () => {
            r(),
              M.read(() => {
                this.events.change.getSize() || this.stop()
              })
          }
        : r
    }
    clearListeners() {
      for (const e in this.events) this.events[e].clear()
    }
    attach(e, n) {
      ;(this.passiveEffect = e), (this.stopPassiveEffect = n)
    }
    set(e, n = !0) {
      !n || !this.passiveEffect
        ? this.updateAndNotify(e, n)
        : this.passiveEffect(e, this.updateAndNotify)
    }
    setWithVelocity(e, n, r) {
      this.set(n),
        (this.prev = void 0),
        (this.prevFrameValue = e),
        (this.prevUpdatedAt = this.updatedAt - r)
    }
    jump(e, n = !0) {
      this.updateAndNotify(e),
        (this.prev = e),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        n && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    get() {
      return this.current
    }
    getPrevious() {
      return this.prev
    }
    getVelocity() {
      const e = yt.now()
      if (
        !this.canTrackVelocity ||
        this.prevFrameValue === void 0 ||
        e - this.updatedAt > Es
      )
        return 0
      const n = Math.min(this.updatedAt - this.prevUpdatedAt, Es)
      return rs(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
    }
    start(e) {
      return (
        this.stop(),
        new Promise((n) => {
          ;(this.hasAnimated = !0),
            (this.animation = e(n)),
            this.events.animationStart && this.events.animationStart.notify()
        }).then(() => {
          this.events.animationComplete &&
            this.events.animationComplete.notify(),
            this.clearAnimation()
        })
      )
    }
    stop() {
      this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating() {
      return !!this.animation
    }
    clearAnimation() {
      delete this.animation
    }
    destroy() {
      this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
  }
  function ee(t, e) {
    return new Vs(t, e)
  }
  function Wu(t, e, n) {
    t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, ee(n))
  }
  function Ku(t, e) {
    const n = Ce(t, e)
    let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {}
    o = { ...o, ...r }
    for (const s in o) {
      const a = ql(o[s])
      Wu(t, s, a)
    }
  }
  function Rs(t) {
    return t.getProps()[Jr]
  }
  class Uu extends Vs {
    constructor() {
      super(...arguments), (this.output = []), (this.counts = new Map())
    }
    add(e) {
      const n = Si(e)
      if (!n) return
      const r = this.counts.get(n) || 0
      this.counts.set(n, r + 1), r === 0 && (this.output.push(n), this.update())
      let i = !1
      return () => {
        if (i) return
        i = !0
        const o = this.counts.get(n) - 1
        this.counts.set(n, o), o === 0 && (Se(this.output, n), this.update())
      }
    }
    update() {
      this.set(this.output.length ? this.output.join(", ") : "auto")
    }
  }
  function $u(t) {
    return !!($(t) && t.add)
  }
  function Wn(t, e) {
    var n
    if (!t.applyWillChange) return
    let r = t.getValue("willChange")
    if (
      (!r &&
        !(!((n = t.props.style) === null || n === void 0) && n.willChange) &&
        ((r = new Uu("auto")), t.addValue("willChange", r)),
      $u(r))
    )
      return r.add(e)
  }
  function zu({ protectedKeys: t, needsAnimating: e }, n) {
    const r = t.hasOwnProperty(n) && e[n] !== !0
    return (e[n] = !1), r
  }
  function _s(t, e, { delay: n = 0, transitionOverride: r, type: i } = {}) {
    var o
    let { transition: s = t.getDefaultTransition(), transitionEnd: a, ...l } = e
    r && (s = r)
    const c = [],
      u = i && t.animationState && t.animationState.getState()[i]
    for (const d in l) {
      const h = t.getValue(
          d,
          (o = t.latestValues[d]) !== null && o !== void 0 ? o : null,
        ),
        p = l[d]
      if (p === void 0 || (u && zu(u, d))) continue
      const m = { delay: n, elapsed: 0, ...bn(s || {}, d) }
      let v = !1
      if (window.HandoffAppearAnimations) {
        const T = Rs(t)
        if (T) {
          const b = window.HandoffAppearAnimations(T, d, h, M)
          b !== null && ((m.elapsed = b), (v = !0))
        }
      }
      h.start(
        In(
          d,
          h,
          p,
          t.shouldReduceMotion && ht.has(d) ? { type: !1 } : m,
          t,
          v,
          Wn(t, d),
        ),
      )
      const P = h.animation
      P && c.push(P)
    }
    return (
      a &&
        Promise.all(c).then(() => {
          M.update(() => {
            a && Ku(t, a)
          })
        }),
      c
    )
  }
  function Kn(t, e, n = {}) {
    var r
    const i = Ce(
      t,
      e,
      n.type === "exit"
        ? (r = t.presenceContext) === null || r === void 0
          ? void 0
          : r.custom
        : void 0,
    )
    let { transition: o = t.getDefaultTransition() || {} } = i || {}
    n.transitionOverride && (o = n.transitionOverride)
    const s = i ? () => Promise.all(_s(t, i, n)) : () => Promise.resolve(),
      a =
        t.variantChildren && t.variantChildren.size
          ? (c = 0) => {
              const {
                delayChildren: u = 0,
                staggerChildren: d,
                staggerDirection: h,
              } = o
              return Hu(t, e, u + c, d, h, n)
            }
          : () => Promise.resolve(),
      { when: l } = o
    if (l) {
      const [c, u] = l === "beforeChildren" ? [s, a] : [a, s]
      return c().then(() => u())
    } else return Promise.all([s(), a(n.delay)])
  }
  function Hu(t, e, n = 0, r = 0, i = 1, o) {
    const s = [],
      a = (t.variantChildren.size - 1) * r,
      l = i === 1 ? (c = 0) => c * r : (c = 0) => a - c * r
    return (
      Array.from(t.variantChildren)
        .sort(Gu)
        .forEach((c, u) => {
          c.notify("AnimationStart", e),
            s.push(
              Kn(c, e, { ...o, delay: n + l(u) }).then(() =>
                c.notify("AnimationComplete", e),
              ),
            )
        }),
      Promise.all(s)
    )
  }
  function Gu(t, e) {
    return t.sortNodePosition(e)
  }
  function Yu(t, e, n = {}) {
    t.notify("AnimationStart", e)
    let r
    if (Array.isArray(e)) {
      const i = e.map((o) => Kn(t, o, n))
      r = Promise.all(i)
    } else if (typeof e == "string") r = Kn(t, e, n)
    else {
      const i = typeof e == "function" ? Ce(t, e, n.custom) : e
      r = Promise.all(_s(t, i, n))
    }
    return r.then(() => {
      t.notify("AnimationComplete", e)
    })
  }
  const Xu = [...nn].reverse(),
    qu = nn.length
  function Zu(t) {
    return (e) =>
      Promise.all(e.map(({ animation: n, options: r }) => Yu(t, n, r)))
  }
  function Ju(t) {
    let e = Zu(t),
      n = Ds(),
      r = !0
    const i = (l) => (c, u) => {
      var d
      const h = Ce(
        t,
        u,
        l === "exit"
          ? (d = t.presenceContext) === null || d === void 0
            ? void 0
            : d.custom
          : void 0,
      )
      if (h) {
        const { transition: p, transitionEnd: m, ...v } = h
        c = { ...c, ...v, ...m }
      }
      return c
    }
    function o(l) {
      e = l(t)
    }
    function s(l) {
      const c = t.getProps(),
        u = t.getVariantContext(!0) || {},
        d = [],
        h = new Set()
      let p = {},
        m = 1 / 0
      for (let P = 0; P < qu; P++) {
        const T = Xu[P],
          b = n[T],
          S = c[T] !== void 0 ? c[T] : u[T],
          A = $t(S),
          V = T === l ? b.isActive : null
        V === !1 && (m = P)
        let B = S === u[T] && S !== c[T] && A
        if (
          (B && r && t.manuallyAnimateOnMount && (B = !1),
          (b.protectedKeys = { ...p }),
          (!b.isActive && V === null) ||
            (!S && !b.prevProp) ||
            zt(S) ||
            typeof S == "boolean")
        )
          continue
        let R =
            Qu(b.prevProp, S) ||
            (T === l && b.isActive && !B && A) ||
            (P > m && A),
          H = !1
        const Y = Array.isArray(S) ? S : [S]
        let bt = Y.reduce(i(T), {})
        V === !1 && (bt = {})
        const { prevResolvedValues: oe = {} } = b,
          Q = { ...oe, ...bt },
          it = (F) => {
            ;(R = !0),
              h.has(F) && ((H = !0), h.delete(F)),
              (b.needsAnimating[F] = !0)
            const tt = t.getValue(F)
            tt && (tt.liveStyle = !1)
          }
        for (const F in Q) {
          const tt = bt[F],
            Ft = oe[F]
          if (p.hasOwnProperty(F)) continue
          let It = !1
          pn(tt) && pn(Ft) ? (It = !Oi(tt, Ft)) : (It = tt !== Ft),
            It
              ? tt != null
                ? it(F)
                : h.add(F)
              : tt !== void 0 && h.has(F)
                ? it(F)
                : (b.protectedKeys[F] = !0)
        }
        ;(b.prevProp = S),
          (b.prevResolvedValues = bt),
          b.isActive && (p = { ...p, ...bt }),
          r && t.blockInitialAnimation && (R = !1),
          R &&
            (!B || H) &&
            d.push(...Y.map((F) => ({ animation: F, options: { type: T } })))
      }
      if (h.size) {
        const P = {}
        h.forEach((T) => {
          const b = t.getBaseTarget(T),
            S = t.getValue(T)
          S && (S.liveStyle = !0), (P[T] = b ?? null)
        }),
          d.push({ animation: P })
      }
      let v = !!d.length
      return (
        r &&
          (c.initial === !1 || c.initial === c.animate) &&
          !t.manuallyAnimateOnMount &&
          (v = !1),
        (r = !1),
        v ? e(d) : Promise.resolve()
      )
    }
    function a(l, c) {
      var u
      if (n[l].isActive === c) return Promise.resolve()
      ;(u = t.variantChildren) === null ||
        u === void 0 ||
        u.forEach((h) => {
          var p
          return (p = h.animationState) === null || p === void 0
            ? void 0
            : p.setActive(l, c)
        }),
        (n[l].isActive = c)
      const d = s(l)
      for (const h in n) n[h].protectedKeys = {}
      return d
    }
    return {
      animateChanges: s,
      setActive: a,
      setAnimateFunction: o,
      getState: () => n,
      reset: () => {
        ;(n = Ds()), (r = !0)
      },
    }
  }
  function Qu(t, e) {
    return typeof e == "string" ? e !== t : Array.isArray(e) ? !Oi(e, t) : !1
  }
  function St(t = !1) {
    return {
      isActive: t,
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {},
    }
  }
  function Ds() {
    return {
      animate: St(!0),
      whileInView: St(),
      whileHover: St(),
      whileTap: St(),
      whileDrag: St(),
      whileFocus: St(),
      exit: St(),
    }
  }
  class td extends gt {
    constructor(e) {
      super(e), e.animationState || (e.animationState = Ju(e))
    }
    updateAnimationControlsSubscription() {
      const { animate: e } = this.node.getProps()
      zt(e) && (this.unmountControls = e.subscribe(this.node))
    }
    mount() {
      this.updateAnimationControlsSubscription()
    }
    update() {
      const { animate: e } = this.node.getProps(),
        { animate: n } = this.node.prevProps || {}
      e !== n && this.updateAnimationControlsSubscription()
    }
    unmount() {
      var e
      this.node.animationState.reset(),
        (e = this.unmountControls) === null || e === void 0 || e.call(this)
    }
  }
  let ed = 0
  class nd extends gt {
    constructor() {
      super(...arguments), (this.id = ed++)
    }
    update() {
      if (!this.node.presenceContext) return
      const { isPresent: e, onExitComplete: n } = this.node.presenceContext,
        { isPresent: r } = this.node.prevPresenceContext || {}
      if (!this.node.animationState || e === r) return
      const i = this.node.animationState.setActive("exit", !e)
      n && !e && i.then(() => n(this.id))
    }
    mount() {
      const { register: e } = this.node.presenceContext || {}
      e && (this.unmount = e(this.id))
    }
    unmount() {}
  }
  const rd = { animation: { Feature: td }, exit: { Feature: nd } },
    ks = (t, e) => Math.abs(t - e)
  function id(t, e) {
    const n = ks(t.x, e.x),
      r = ks(t.y, e.y)
    return Math.sqrt(n ** 2 + r ** 2)
  }
  class Ms {
    constructor(
      e,
      n,
      {
        transformPagePoint: r,
        contextWindow: i,
        dragSnapToOrigin: o = !1,
      } = {},
    ) {
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.updatePoint = () => {
          if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
          const d = $n(this.lastMoveEventInfo, this.history),
            h = this.startEvent !== null,
            p = id(d.offset, { x: 0, y: 0 }) >= 3
          if (!h && !p) return
          const { point: m } = d,
            { timestamp: v } = U
          this.history.push({ ...m, timestamp: v })
          const { onStart: P, onMove: T } = this.handlers
          h ||
            (P && P(this.lastMoveEvent, d),
            (this.startEvent = this.lastMoveEvent)),
            T && T(this.lastMoveEvent, d)
        }),
        (this.handlePointerMove = (d, h) => {
          ;(this.lastMoveEvent = d),
            (this.lastMoveEventInfo = Un(h, this.transformPagePoint)),
            M.update(this.updatePoint, !0)
        }),
        (this.handlePointerUp = (d, h) => {
          this.end()
          const {
            onEnd: p,
            onSessionEnd: m,
            resumeAnimation: v,
          } = this.handlers
          if (
            (this.dragSnapToOrigin && v && v(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
          )
            return
          const P = $n(
            d.type === "pointercancel"
              ? this.lastMoveEventInfo
              : Un(h, this.transformPagePoint),
            this.history,
          )
          this.startEvent && p && p(d, P), m && m(d, P)
        }),
        !Ai(e))
      )
        return
      ;(this.dragSnapToOrigin = o),
        (this.handlers = n),
        (this.transformPagePoint = r),
        (this.contextWindow = i || window)
      const s = we(e),
        a = Un(s, this.transformPagePoint),
        { point: l } = a,
        { timestamp: c } = U
      this.history = [{ ...l, timestamp: c }]
      const { onSessionStart: u } = n
      u && u(e, $n(a, this.history)),
        (this.removeListeners = ct(
          lt(this.contextWindow, "pointermove", this.handlePointerMove),
          lt(this.contextWindow, "pointerup", this.handlePointerUp),
          lt(this.contextWindow, "pointercancel", this.handlePointerUp),
        ))
    }
    updateHandlers(e) {
      this.handlers = e
    }
    end() {
      this.removeListeners && this.removeListeners(), ot(this.updatePoint)
    }
  }
  function Un(t, e) {
    return e ? { point: e(t.point) } : t
  }
  function Os(t, e) {
    return { x: t.x - e.x, y: t.y - e.y }
  }
  function $n({ point: t }, e) {
    return {
      point: t,
      delta: Os(t, js(e)),
      offset: Os(t, sd(e)),
      velocity: od(e, 0.1),
    }
  }
  function sd(t) {
    return t[0]
  }
  function js(t) {
    return t[t.length - 1]
  }
  function od(t, e) {
    if (t.length < 2) return { x: 0, y: 0 }
    let n = t.length - 1,
      r = null
    const i = js(t)
    for (; n >= 0 && ((r = t[n]), !(i.timestamp - r.timestamp > ut(e))); ) n--
    if (!r) return { x: 0, y: 0 }
    const o = dt(i.timestamp - r.timestamp)
    if (o === 0) return { x: 0, y: 0 }
    const s = { x: (i.x - r.x) / o, y: (i.y - r.y) / o }
    return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s
  }
  const Ls = 1e-4,
    ad = 1 - Ls,
    ld = 1 + Ls,
    Fs = 0.01,
    cd = 0 - Fs,
    ud = 0 + Fs
  function q(t) {
    return t.max - t.min
  }
  function dd(t, e, n) {
    return Math.abs(t - e) <= n
  }
  function Is(t, e, n, r = 0.5) {
    ;(t.origin = r),
      (t.originPoint = j(e.min, e.max, t.origin)),
      (t.scale = q(n) / q(e)),
      (t.translate = j(n.min, n.max, t.origin) - t.originPoint),
      ((t.scale >= ad && t.scale <= ld) || isNaN(t.scale)) && (t.scale = 1),
      ((t.translate >= cd && t.translate <= ud) || isNaN(t.translate)) &&
        (t.translate = 0)
  }
  function ne(t, e, n, r) {
    Is(t.x, e.x, n.x, r ? r.originX : void 0),
      Is(t.y, e.y, n.y, r ? r.originY : void 0)
  }
  function Bs(t, e, n) {
    ;(t.min = n.min + e.min), (t.max = t.min + q(e))
  }
  function fd(t, e, n) {
    Bs(t.x, e.x, n.x), Bs(t.y, e.y, n.y)
  }
  function Ns(t, e, n) {
    ;(t.min = e.min - n.min), (t.max = t.min + q(e))
  }
  function re(t, e, n) {
    Ns(t.x, e.x, n.x), Ns(t.y, e.y, n.y)
  }
  function hd(t, { min: e, max: n }, r) {
    return (
      e !== void 0 && t < e
        ? (t = r ? j(e, t, r.min) : Math.max(t, e))
        : n !== void 0 && t > n && (t = r ? j(n, t, r.max) : Math.min(t, n)),
      t
    )
  }
  function Ws(t, e, n) {
    return {
      min: e !== void 0 ? t.min + e : void 0,
      max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
    }
  }
  function pd(t, { top: e, left: n, bottom: r, right: i }) {
    return { x: Ws(t.x, n, i), y: Ws(t.y, e, r) }
  }
  function Ks(t, e) {
    let n = e.min - t.min,
      r = e.max - t.max
    return (
      e.max - e.min < t.max - t.min && ([n, r] = [r, n]), { min: n, max: r }
    )
  }
  function md(t, e) {
    return { x: Ks(t.x, e.x), y: Ks(t.y, e.y) }
  }
  function gd(t, e) {
    let n = 0.5
    const r = q(t),
      i = q(e)
    return (
      i > r
        ? (n = Qt(e.min, e.max - r, t.min))
        : r > i && (n = Qt(t.min, t.max - i, e.min)),
      pt(0, 1, n)
    )
  }
  function yd(t, e) {
    const n = {}
    return (
      e.min !== void 0 && (n.min = e.min - t.min),
      e.max !== void 0 && (n.max = e.max - t.min),
      n
    )
  }
  const zn = 0.35
  function vd(t = zn) {
    return (
      t === !1 ? (t = 0) : t === !0 && (t = zn),
      { x: Us(t, "left", "right"), y: Us(t, "top", "bottom") }
    )
  }
  function Us(t, e, n) {
    return { min: $s(t, e), max: $s(t, n) }
  }
  function $s(t, e) {
    return typeof t == "number" ? t : t[e] || 0
  }
  const zs = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
    Ot = () => ({ x: zs(), y: zs() }),
    Hs = () => ({ min: 0, max: 0 }),
    L = () => ({ x: Hs(), y: Hs() })
  function Z(t) {
    return [t("x"), t("y")]
  }
  function Gs({ top: t, left: e, right: n, bottom: r }) {
    return { x: { min: e, max: n }, y: { min: t, max: r } }
  }
  function bd({ x: t, y: e }) {
    return { top: e.min, right: t.max, bottom: e.max, left: t.min }
  }
  function xd(t, e) {
    if (!e) return t
    const n = e({ x: t.left, y: t.top }),
      r = e({ x: t.right, y: t.bottom })
    return { top: n.y, left: n.x, bottom: r.y, right: r.x }
  }
  function Hn(t) {
    return t === void 0 || t === 1
  }
  function Gn({ scale: t, scaleX: e, scaleY: n }) {
    return !Hn(t) || !Hn(e) || !Hn(n)
  }
  function wt(t) {
    return (
      Gn(t) ||
      Ys(t) ||
      t.z ||
      t.rotate ||
      t.rotateX ||
      t.rotateY ||
      t.skewX ||
      t.skewY
    )
  }
  function Ys(t) {
    return Xs(t.x) || Xs(t.y)
  }
  function Xs(t) {
    return t && t !== "0%"
  }
  function De(t, e, n) {
    const r = t - n,
      i = e * r
    return n + i
  }
  function qs(t, e, n, r, i) {
    return i !== void 0 && (t = De(t, i, r)), De(t, n, r) + e
  }
  function Yn(t, e = 0, n = 1, r, i) {
    ;(t.min = qs(t.min, e, n, r, i)), (t.max = qs(t.max, e, n, r, i))
  }
  function Zs(t, { x: e, y: n }) {
    Yn(t.x, e.translate, e.scale, e.originPoint),
      Yn(t.y, n.translate, n.scale, n.originPoint)
  }
  const Js = 0.999999999999,
    Qs = 1.0000000000001
  function Td(t, e, n, r = !1) {
    const i = n.length
    if (!i) return
    e.x = e.y = 1
    let o, s
    for (let a = 0; a < i; a++) {
      ;(o = n[a]), (s = o.projectionDelta)
      const { visualElement: l } = o.options
      ;(l && l.props.style && l.props.style.display === "contents") ||
        (r &&
          o.options.layoutScroll &&
          o.scroll &&
          o !== o.root &&
          Lt(t, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
        s && ((e.x *= s.x.scale), (e.y *= s.y.scale), Zs(t, s)),
        r && wt(o.latestValues) && Lt(t, o.latestValues))
    }
    e.x < Qs && e.x > Js && (e.x = 1), e.y < Qs && e.y > Js && (e.y = 1)
  }
  function jt(t, e) {
    ;(t.min = t.min + e), (t.max = t.max + e)
  }
  function to(t, e, n, r, i = 0.5) {
    const o = j(t.min, t.max, i)
    Yn(t, e, n, o, r)
  }
  function Lt(t, e) {
    to(t.x, e.x, e.scaleX, e.scale, e.originX),
      to(t.y, e.y, e.scaleY, e.scale, e.originY)
  }
  function eo(t, e) {
    return Gs(xd(t.getBoundingClientRect(), e))
  }
  function Pd(t, e, n) {
    const r = eo(t, n),
      { scroll: i } = e
    return i && (jt(r.x, i.offset.x), jt(r.y, i.offset.y)), r
  }
  const no = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
    Sd = new WeakMap()
  class wd {
    constructor(e) {
      ;(this.openGlobalLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = L()),
        (this.visualElement = e)
    }
    start(e, { snapToCursor: n = !1 } = {}) {
      const { presenceContext: r } = this.visualElement
      if (r && r.isPresent === !1) return
      const i = (u) => {
          const { dragSnapToOrigin: d } = this.getProps()
          d ? this.pauseAnimation() : this.stopAnimation(),
            n && this.snapToCursor(we(u, "page").point)
        },
        o = (u, d) => {
          var h
          const {
            drag: p,
            dragPropagation: m,
            onDragStart: v,
          } = this.getProps()
          if (
            p &&
            !m &&
            (this.openGlobalLock && this.openGlobalLock(),
            (this.openGlobalLock = _i(p)),
            !this.openGlobalLock)
          )
            return
          ;(this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            Z((T) => {
              let b = this.getAxisMotionValue(T).get() || 0
              if (nt.test(b)) {
                const { projection: S } = this.visualElement
                if (S && S.layout) {
                  const A = S.layout.layoutBox[T]
                  A && (b = q(A) * (parseFloat(b) / 100))
                }
              }
              this.originPoint[T] = b
            }),
            v && M.postRender(() => v(u, d)),
            (h = this.removeWillChange) === null ||
              h === void 0 ||
              h.call(this),
            (this.removeWillChange = Wn(this.visualElement, "transform"))
          const { animationState: P } = this.visualElement
          P && P.setActive("whileDrag", !0)
        },
        s = (u, d) => {
          const {
            dragPropagation: h,
            dragDirectionLock: p,
            onDirectionLock: m,
            onDrag: v,
          } = this.getProps()
          if (!h && !this.openGlobalLock) return
          const { offset: P } = d
          if (p && this.currentDirection === null) {
            ;(this.currentDirection = Cd(P)),
              this.currentDirection !== null && m && m(this.currentDirection)
            return
          }
          this.updateAxis("x", d.point, P),
            this.updateAxis("y", d.point, P),
            this.visualElement.render(),
            v && v(u, d)
        },
        a = (u, d) => this.stop(u, d),
        l = () =>
          Z((u) => {
            var d
            return (
              this.getAnimationState(u) === "paused" &&
              ((d = this.getAxisMotionValue(u).animation) === null ||
              d === void 0
                ? void 0
                : d.play())
            )
          }),
        { dragSnapToOrigin: c } = this.getProps()
      this.panSession = new Ms(
        e,
        {
          onSessionStart: i,
          onStart: o,
          onMove: s,
          onSessionEnd: a,
          resumeAnimation: l,
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: c,
          contextWindow: no(this.visualElement),
        },
      )
    }
    stop(e, n) {
      var r
      ;(r = this.removeWillChange) === null || r === void 0 || r.call(this)
      const i = this.isDragging
      if ((this.cancel(), !i)) return
      const { velocity: o } = n
      this.startAnimation(o)
      const { onDragEnd: s } = this.getProps()
      s && M.postRender(() => s(e, n))
    }
    cancel() {
      this.isDragging = !1
      const { projection: e, animationState: n } = this.visualElement
      e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0)
      const { dragPropagation: r } = this.getProps()
      !r &&
        this.openGlobalLock &&
        (this.openGlobalLock(), (this.openGlobalLock = null)),
        n && n.setActive("whileDrag", !1)
    }
    updateAxis(e, n, r) {
      const { drag: i } = this.getProps()
      if (!r || !ke(e, i, this.currentDirection)) return
      const o = this.getAxisMotionValue(e)
      let s = this.originPoint[e] + r[e]
      this.constraints &&
        this.constraints[e] &&
        (s = hd(s, this.constraints[e], this.elastic[e])),
        o.set(s)
    }
    resolveConstraints() {
      var e
      const { dragConstraints: n, dragElastic: r } = this.getProps(),
        i =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : (e = this.visualElement.projection) === null || e === void 0
              ? void 0
              : e.layout,
        o = this.constraints
      n && Vt(n)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : n && i
          ? (this.constraints = pd(i.layoutBox, n))
          : (this.constraints = !1),
        (this.elastic = vd(r)),
        o !== this.constraints &&
          i &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          Z((s) => {
            this.constraints !== !1 &&
              this.getAxisMotionValue(s) &&
              (this.constraints[s] = yd(i.layoutBox[s], this.constraints[s]))
          })
    }
    resolveRefConstraints() {
      const { dragConstraints: e, onMeasureDragConstraints: n } =
        this.getProps()
      if (!e || !Vt(e)) return !1
      const r = e.current
      ft(
        r !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
      )
      const { projection: i } = this.visualElement
      if (!i || !i.layout) return !1
      const o = Pd(r, i.root, this.visualElement.getTransformPagePoint())
      let s = md(i.layout.layoutBox, o)
      if (n) {
        const a = n(bd(s))
        ;(this.hasMutatedConstraints = !!a), a && (s = Gs(a))
      }
      return s
    }
    startAnimation(e) {
      const {
          drag: n,
          dragMomentum: r,
          dragElastic: i,
          dragTransition: o,
          dragSnapToOrigin: s,
          onDragTransitionEnd: a,
        } = this.getProps(),
        l = this.constraints || {},
        c = Z((u) => {
          if (!ke(u, n, this.currentDirection)) return
          let d = (l && l[u]) || {}
          s && (d = { min: 0, max: 0 })
          const h = i ? 200 : 1e6,
            p = i ? 40 : 1e7,
            m = {
              type: "inertia",
              velocity: r ? e[u] : 0,
              bounceStiffness: h,
              bounceDamping: p,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...o,
              ...d,
            }
          return this.startAxisValueAnimation(u, m)
        })
      return Promise.all(c).then(a)
    }
    startAxisValueAnimation(e, n) {
      const r = this.getAxisMotionValue(e)
      return r.start(
        In(e, r, 0, n, this.visualElement, !1, Wn(this.visualElement, e)),
      )
    }
    stopAnimation() {
      Z((e) => this.getAxisMotionValue(e).stop())
    }
    pauseAnimation() {
      Z((e) => {
        var n
        return (n = this.getAxisMotionValue(e).animation) === null ||
          n === void 0
          ? void 0
          : n.pause()
      })
    }
    getAnimationState(e) {
      var n
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
        ? void 0
        : n.state
    }
    getAxisMotionValue(e) {
      const n = `_drag${e.toUpperCase()}`,
        r = this.visualElement.getProps(),
        i = r[n]
      return (
        i ||
        this.visualElement.getValue(e, (r.initial ? r.initial[e] : void 0) || 0)
      )
    }
    snapToCursor(e) {
      Z((n) => {
        const { drag: r } = this.getProps()
        if (!ke(n, r, this.currentDirection)) return
        const { projection: i } = this.visualElement,
          o = this.getAxisMotionValue(n)
        if (i && i.layout) {
          const { min: s, max: a } = i.layout.layoutBox[n]
          o.set(e[n] - j(s, a, 0.5))
        }
      })
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return
      const { drag: e, dragConstraints: n } = this.getProps(),
        { projection: r } = this.visualElement
      if (!Vt(n) || !r || !this.constraints) return
      this.stopAnimation()
      const i = { x: 0, y: 0 }
      Z((s) => {
        const a = this.getAxisMotionValue(s)
        if (a && this.constraints !== !1) {
          const l = a.get()
          i[s] = gd({ min: l, max: l }, this.constraints[s])
        }
      })
      const { transformTemplate: o } = this.visualElement.getProps()
      ;(this.visualElement.current.style.transform = o ? o({}, "") : "none"),
        r.root && r.root.updateScroll(),
        r.updateLayout(),
        this.resolveConstraints(),
        Z((s) => {
          if (!ke(s, e, null)) return
          const a = this.getAxisMotionValue(s),
            { min: l, max: c } = this.constraints[s]
          a.set(j(l, c, i[s]))
        })
    }
    addListeners() {
      if (!this.visualElement.current) return
      Sd.set(this.visualElement, this)
      const e = this.visualElement.current,
        n = lt(e, "pointerdown", (l) => {
          const { drag: c, dragListener: u = !0 } = this.getProps()
          c && u && this.start(l)
        }),
        r = () => {
          const { dragConstraints: l } = this.getProps()
          Vt(l) &&
            l.current &&
            (this.constraints = this.resolveRefConstraints())
        },
        { projection: i } = this.visualElement,
        o = i.addEventListener("measure", r)
      i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
        M.read(r)
      const s = at(window, "resize", () =>
          this.scalePositionWithinConstraints(),
        ),
        a = i.addEventListener(
          "didUpdate",
          ({ delta: l, hasLayoutChanged: c }) => {
            this.isDragging &&
              c &&
              (Z((u) => {
                const d = this.getAxisMotionValue(u)
                d &&
                  ((this.originPoint[u] += l[u].translate),
                  d.set(d.get() + l[u].translate))
              }),
              this.visualElement.render())
          },
        )
      return () => {
        s(), n(), o(), a && a()
      }
    }
    getProps() {
      const e = this.visualElement.getProps(),
        {
          drag: n = !1,
          dragDirectionLock: r = !1,
          dragPropagation: i = !1,
          dragConstraints: o = !1,
          dragElastic: s = zn,
          dragMomentum: a = !0,
        } = e
      return {
        ...e,
        drag: n,
        dragDirectionLock: r,
        dragPropagation: i,
        dragConstraints: o,
        dragElastic: s,
        dragMomentum: a,
      }
    }
  }
  function ke(t, e, n) {
    return (e === !0 || e === t) && (n === null || n === t)
  }
  function Cd(t, e = 10) {
    let n = null
    return Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n
  }
  class Ad extends gt {
    constructor(e) {
      super(e),
        (this.removeGroupControls = K),
        (this.removeListeners = K),
        (this.controls = new wd(e))
    }
    mount() {
      const { dragControls: e } = this.node.getProps()
      e && (this.removeGroupControls = e.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || K)
    }
    unmount() {
      this.removeGroupControls(), this.removeListeners()
    }
  }
  const ro = (t) => (e, n) => {
    t && M.postRender(() => t(e, n))
  }
  class Ed extends gt {
    constructor() {
      super(...arguments), (this.removePointerDownListener = K)
    }
    onPointerDown(e) {
      this.session = new Ms(e, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: no(this.node),
      })
    }
    createPanHandlers() {
      const {
        onPanSessionStart: e,
        onPanStart: n,
        onPan: r,
        onPanEnd: i,
      } = this.node.getProps()
      return {
        onSessionStart: ro(e),
        onStart: ro(n),
        onMove: r,
        onEnd: (o, s) => {
          delete this.session, i && M.postRender(() => i(o, s))
        },
      }
    }
    mount() {
      this.removePointerDownListener = lt(
        this.node.current,
        "pointerdown",
        (e) => this.onPointerDown(e),
      )
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
      this.removePointerDownListener(), this.session && this.session.end()
    }
  }
  function Vd() {
    const t = y.useContext(Qe)
    if (t === null) return [!0, null]
    const { isPresent: e, onExitComplete: n, register: r } = t,
      i = y.useId()
    y.useEffect(() => r(i), [])
    const o = y.useCallback(() => n && n(i), [i, n])
    return !e && n ? [!1, o] : [!0]
  }
  const Me = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
  function io(t, e) {
    return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100
  }
  const ie = {
      correct: (t, e) => {
        if (!e.target) return t
        if (typeof t == "string")
          if (w.test(t)) t = parseFloat(t)
          else return t
        const n = io(t, e.target.x),
          r = io(t, e.target.y)
        return `${n}% ${r}%`
      },
    },
    Rd = {
      correct: (t, { treeScale: e, projectionDelta: n }) => {
        const r = t,
          i = vt.parse(t)
        if (i.length > 5) return r
        const o = vt.createTransformer(t),
          s = typeof i[0] != "number" ? 1 : 0,
          a = n.x.scale * e.x,
          l = n.y.scale * e.y
        ;(i[0 + s] /= a), (i[1 + s] /= l)
        const c = j(a, l, 0.5)
        return (
          typeof i[2 + s] == "number" && (i[2 + s] /= c),
          typeof i[3 + s] == "number" && (i[3 + s] /= c),
          o(i)
        )
      },
    }
  class _d extends y.Component {
    componentDidMount() {
      const {
          visualElement: e,
          layoutGroup: n,
          switchLayoutGroup: r,
          layoutId: i,
        } = this.props,
        { projection: o } = e
      wl(Dd),
        o &&
          (n.group && n.group.add(o),
          r && r.register && i && r.register(o),
          o.root.didUpdate(),
          o.addEventListener("animationComplete", () => {
            this.safeToRemove()
          }),
          o.setOptions({
            ...o.options,
            onExitComplete: () => this.safeToRemove(),
          })),
        (Me.hasEverUpdated = !0)
    }
    getSnapshotBeforeUpdate(e) {
      const {
          layoutDependency: n,
          visualElement: r,
          drag: i,
          isPresent: o,
        } = this.props,
        s = r.projection
      return (
        s &&
          ((s.isPresent = o),
          i || e.layoutDependency !== n || n === void 0
            ? s.willUpdate()
            : this.safeToRemove(),
          e.isPresent !== o &&
            (o
              ? s.promote()
              : s.relegate() ||
                M.postRender(() => {
                  const a = s.getStack()
                  ;(!a || !a.members.length) && this.safeToRemove()
                }))),
        null
      )
    }
    componentDidUpdate() {
      const { projection: e } = this.props.visualElement
      e &&
        (e.root.didUpdate(),
        en.postRender(() => {
          !e.currentAnimation && e.isLead() && this.safeToRemove()
        }))
    }
    componentWillUnmount() {
      const {
          visualElement: e,
          layoutGroup: n,
          switchLayoutGroup: r,
        } = this.props,
        { projection: i } = e
      i &&
        (i.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(i),
        r && r.deregister && r.deregister(i))
    }
    safeToRemove() {
      const { safeToRemove: e } = this.props
      e && e()
    }
    render() {
      return null
    }
  }
  function so(t) {
    const [e, n] = Vd(),
      r = y.useContext(oi)
    return D.jsx(_d, {
      ...t,
      layoutGroup: r,
      switchLayoutGroup: y.useContext(ti),
      isPresent: e,
      safeToRemove: n,
    })
  }
  const Dd = {
      borderRadius: {
        ...ie,
        applyTo: [
          "borderTopLeftRadius",
          "borderTopRightRadius",
          "borderBottomLeftRadius",
          "borderBottomRightRadius",
        ],
      },
      borderTopLeftRadius: ie,
      borderTopRightRadius: ie,
      borderBottomLeftRadius: ie,
      borderBottomRightRadius: ie,
      boxShadow: Rd,
    },
    oo = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
    kd = oo.length,
    ao = (t) => (typeof t == "string" ? parseFloat(t) : t),
    lo = (t) => typeof t == "number" || w.test(t)
  function Md(t, e, n, r, i, o) {
    i
      ? ((t.opacity = j(0, n.opacity !== void 0 ? n.opacity : 1, Od(r))),
        (t.opacityExit = j(e.opacity !== void 0 ? e.opacity : 1, 0, jd(r))))
      : o &&
        (t.opacity = j(
          e.opacity !== void 0 ? e.opacity : 1,
          n.opacity !== void 0 ? n.opacity : 1,
          r,
        ))
    for (let s = 0; s < kd; s++) {
      const a = `border${oo[s]}Radius`
      let l = co(e, a),
        c = co(n, a)
      if (l === void 0 && c === void 0) continue
      l || (l = 0),
        c || (c = 0),
        l === 0 || c === 0 || lo(l) === lo(c)
          ? ((t[a] = Math.max(j(ao(l), ao(c), r), 0)),
            (nt.test(c) || nt.test(l)) && (t[a] += "%"))
          : (t[a] = c)
    }
    ;(e.rotate || n.rotate) && (t.rotate = j(e.rotate || 0, n.rotate || 0, r))
  }
  function co(t, e) {
    return t[e] !== void 0 ? t[e] : t.borderRadius
  }
  const Od = uo(0, 0.5, hs),
    jd = uo(0.5, 0.95, K)
  function uo(t, e, n) {
    return (r) => (r < t ? 0 : r > e ? 1 : n(Qt(t, e, r)))
  }
  function fo(t, e) {
    ;(t.min = e.min), (t.max = e.max)
  }
  function J(t, e) {
    fo(t.x, e.x), fo(t.y, e.y)
  }
  function ho(t, e) {
    ;(t.translate = e.translate),
      (t.scale = e.scale),
      (t.originPoint = e.originPoint),
      (t.origin = e.origin)
  }
  function po(t, e, n, r, i) {
    return (
      (t -= e), (t = De(t, 1 / n, r)), i !== void 0 && (t = De(t, 1 / i, r)), t
    )
  }
  function Ld(t, e = 0, n = 1, r = 0.5, i, o = t, s = t) {
    if (
      (nt.test(e) &&
        ((e = parseFloat(e)), (e = j(s.min, s.max, e / 100) - s.min)),
      typeof e != "number")
    )
      return
    let a = j(o.min, o.max, r)
    t === o && (a -= e),
      (t.min = po(t.min, e, n, a, i)),
      (t.max = po(t.max, e, n, a, i))
  }
  function mo(t, e, [n, r, i], o, s) {
    Ld(t, e[n], e[r], e[i], e.scale, o, s)
  }
  const Fd = ["x", "scaleX", "originX"],
    Id = ["y", "scaleY", "originY"]
  function go(t, e, n, r) {
    mo(t.x, e, Fd, n ? n.x : void 0, r ? r.x : void 0),
      mo(t.y, e, Id, n ? n.y : void 0, r ? r.y : void 0)
  }
  function yo(t) {
    return t.translate === 0 && t.scale === 1
  }
  function vo(t) {
    return yo(t.x) && yo(t.y)
  }
  function bo(t, e) {
    return t.min === e.min && t.max === e.max
  }
  function Bd(t, e) {
    return bo(t.x, e.x) && bo(t.y, e.y)
  }
  function xo(t, e) {
    return (
      Math.round(t.min) === Math.round(e.min) &&
      Math.round(t.max) === Math.round(e.max)
    )
  }
  function To(t, e) {
    return xo(t.x, e.x) && xo(t.y, e.y)
  }
  function Po(t) {
    return q(t.x) / q(t.y)
  }
  function So(t, e) {
    return (
      t.translate === e.translate &&
      t.scale === e.scale &&
      t.originPoint === e.originPoint
    )
  }
  class Nd {
    constructor() {
      this.members = []
    }
    add(e) {
      Pe(this.members, e), e.scheduleRender()
    }
    remove(e) {
      if (
        (Se(this.members, e),
        e === this.prevLead && (this.prevLead = void 0),
        e === this.lead)
      ) {
        const n = this.members[this.members.length - 1]
        n && this.promote(n)
      }
    }
    relegate(e) {
      const n = this.members.findIndex((i) => e === i)
      if (n === 0) return !1
      let r
      for (let i = n; i >= 0; i--) {
        const o = this.members[i]
        if (o.isPresent !== !1) {
          r = o
          break
        }
      }
      return r ? (this.promote(r), !0) : !1
    }
    promote(e, n) {
      const r = this.lead
      if (e !== r && ((this.prevLead = r), (this.lead = e), e.show(), r)) {
        r.instance && r.scheduleRender(),
          e.scheduleRender(),
          (e.resumeFrom = r),
          n && (e.resumeFrom.preserveOpacity = !0),
          r.snapshot &&
            ((e.snapshot = r.snapshot),
            (e.snapshot.latestValues = r.animationValues || r.latestValues)),
          e.root && e.root.isUpdating && (e.isLayoutDirty = !0)
        const { crossfade: i } = e.options
        i === !1 && r.hide()
      }
    }
    exitAnimationComplete() {
      this.members.forEach((e) => {
        const { options: n, resumingFrom: r } = e
        n.onExitComplete && n.onExitComplete(),
          r && r.options.onExitComplete && r.options.onExitComplete()
      })
    }
    scheduleRender() {
      this.members.forEach((e) => {
        e.instance && e.scheduleRender(!1)
      })
    }
    removeLeadSnapshot() {
      this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
  }
  function Wd(t, e, n) {
    let r = ""
    const i = t.x.translate / e.x,
      o = t.y.translate / e.y,
      s = (n == null ? void 0 : n.z) || 0
    if (
      ((i || o || s) && (r = `translate3d(${i}px, ${o}px, ${s}px) `),
      (e.x !== 1 || e.y !== 1) && (r += `scale(${1 / e.x}, ${1 / e.y}) `),
      n)
    ) {
      const {
        transformPerspective: c,
        rotate: u,
        rotateX: d,
        rotateY: h,
        skewX: p,
        skewY: m,
      } = n
      c && (r = `perspective(${c}px) ${r}`),
        u && (r += `rotate(${u}deg) `),
        d && (r += `rotateX(${d}deg) `),
        h && (r += `rotateY(${h}deg) `),
        p && (r += `skewX(${p}deg) `),
        m && (r += `skewY(${m}deg) `)
    }
    const a = t.x.scale * e.x,
      l = t.y.scale * e.y
    return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none"
  }
  const Kd = (t, e) => t.depth - e.depth
  class Ud {
    constructor() {
      ;(this.children = []), (this.isDirty = !1)
    }
    add(e) {
      Pe(this.children, e), (this.isDirty = !0)
    }
    remove(e) {
      Se(this.children, e), (this.isDirty = !0)
    }
    forEach(e) {
      this.isDirty && this.children.sort(Kd),
        (this.isDirty = !1),
        this.children.forEach(e)
    }
  }
  function $d(t, e) {
    const n = yt.now(),
      r = ({ timestamp: i }) => {
        const o = i - n
        o >= e && (ot(r), t(o - e))
      }
    return M.read(r, !0), () => ot(r)
  }
  function zd(t) {
    return t instanceof SVGElement && t.tagName !== "svg"
  }
  function Hd(t, e, n) {
    const r = $(t) ? t : ee(t)
    return r.start(In("", r, e, n)), r.animation
  }
  const Ct = {
      type: "projectionFrame",
      totalNodes: 0,
      resolvedTargetDeltas: 0,
      recalculatedProjection: 0,
    },
    se = typeof window < "u" && window.MotionDebug !== void 0,
    Xn = ["", "X", "Y", "Z"],
    Gd = { visibility: "hidden" },
    wo = 1e3
  let Yd = 0
  function qn(t, e, n, r) {
    const { latestValues: i } = e
    i[t] && ((n[t] = i[t]), e.setStaticValue(t, 0), r && (r[t] = 0))
  }
  function Co(t) {
    if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return !1
    const { visualElement: e } = t.options
    return e
      ? Rs(e)
        ? !0
        : t.parent && !t.parent.hasCheckedOptimisedAppear
          ? Co(t.parent)
          : !1
      : !1
  }
  function Ao({
    attachResizeListener: t,
    defaultParent: e,
    measureScroll: n,
    checkIsScrollRoot: r,
    resetTransform: i,
  }) {
    return class {
      constructor(s = {}, a = e == null ? void 0 : e()) {
        ;(this.id = Yd++),
          (this.animationId = 0),
          (this.children = new Set()),
          (this.options = {}),
          (this.isTreeAnimating = !1),
          (this.isAnimationBlocked = !1),
          (this.isLayoutDirty = !1),
          (this.isProjectionDirty = !1),
          (this.isSharedProjectionDirty = !1),
          (this.isTransformDirty = !1),
          (this.updateManuallyBlocked = !1),
          (this.updateBlockedByResize = !1),
          (this.isUpdating = !1),
          (this.isSVG = !1),
          (this.needsReset = !1),
          (this.shouldResetTransform = !1),
          (this.hasCheckedOptimisedAppear = !1),
          (this.treeScale = { x: 1, y: 1 }),
          (this.eventHandlers = new Map()),
          (this.hasTreeAnimated = !1),
          (this.updateScheduled = !1),
          (this.scheduleUpdate = () => this.update()),
          (this.projectionUpdateScheduled = !1),
          (this.checkUpdateFailed = () => {
            this.isUpdating &&
              ((this.isUpdating = !1), this.clearAllSnapshots())
          }),
          (this.updateProjection = () => {
            ;(this.projectionUpdateScheduled = !1),
              se &&
                (Ct.totalNodes =
                  Ct.resolvedTargetDeltas =
                  Ct.recalculatedProjection =
                    0),
              this.nodes.forEach(Zd),
              this.nodes.forEach(nf),
              this.nodes.forEach(rf),
              this.nodes.forEach(Jd),
              se && window.MotionDebug.record(Ct)
          }),
          (this.resolvedRelativeTargetAt = 0),
          (this.hasProjected = !1),
          (this.isVisible = !0),
          (this.animationProgress = 0),
          (this.sharedNodes = new Map()),
          (this.latestValues = s),
          (this.root = a ? a.root || a : this),
          (this.path = a ? [...a.path, a] : []),
          (this.parent = a),
          (this.depth = a ? a.depth + 1 : 0)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].shouldResetTransform = !0
        this.root === this && (this.nodes = new Ud())
      }
      addEventListener(s, a) {
        return (
          this.eventHandlers.has(s) || this.eventHandlers.set(s, new Bn()),
          this.eventHandlers.get(s).add(a)
        )
      }
      notifyListeners(s, ...a) {
        const l = this.eventHandlers.get(s)
        l && l.notify(...a)
      }
      hasListeners(s) {
        return this.eventHandlers.has(s)
      }
      mount(s, a = this.root.hasTreeAnimated) {
        if (this.instance) return
        ;(this.isSVG = zd(s)), (this.instance = s)
        const { layoutId: l, layout: c, visualElement: u } = this.options
        if (
          (u && !u.current && u.mount(s),
          this.root.nodes.add(this),
          this.parent && this.parent.children.add(this),
          a && (c || l) && (this.isLayoutDirty = !0),
          t)
        ) {
          let d
          const h = () => (this.root.updateBlockedByResize = !1)
          t(s, () => {
            ;(this.root.updateBlockedByResize = !0),
              d && d(),
              (d = $d(h, 250)),
              Me.hasAnimatedSinceResize &&
                ((Me.hasAnimatedSinceResize = !1), this.nodes.forEach(Vo))
          })
        }
        l && this.root.registerSharedNode(l, this),
          this.options.animate !== !1 &&
            u &&
            (l || c) &&
            this.addEventListener(
              "didUpdate",
              ({
                delta: d,
                hasLayoutChanged: h,
                hasRelativeTargetChanged: p,
                layout: m,
              }) => {
                if (this.isTreeAnimationBlocked()) {
                  ;(this.target = void 0), (this.relativeTarget = void 0)
                  return
                }
                const v =
                    this.options.transition || u.getDefaultTransition() || cf,
                  { onLayoutAnimationStart: P, onLayoutAnimationComplete: T } =
                    u.getProps(),
                  b = !this.targetLayout || !To(this.targetLayout, m) || p,
                  S = !h && p
                if (
                  this.options.layoutRoot ||
                  (this.resumeFrom && this.resumeFrom.instance) ||
                  S ||
                  (h && (b || !this.currentAnimation))
                ) {
                  this.resumeFrom &&
                    ((this.resumingFrom = this.resumeFrom),
                    (this.resumingFrom.resumingFrom = void 0)),
                    this.setAnimationOrigin(d, S)
                  const A = { ...bn(v, "layout"), onPlay: P, onComplete: T }
                  ;(u.shouldReduceMotion || this.options.layoutRoot) &&
                    ((A.delay = 0), (A.type = !1)),
                    this.startAnimation(A)
                } else
                  h || Vo(this),
                    this.isLead() &&
                      this.options.onExitComplete &&
                      this.options.onExitComplete()
                this.targetLayout = m
              },
            )
      }
      unmount() {
        this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this)
        const s = this.getStack()
        s && s.remove(this),
          this.parent && this.parent.children.delete(this),
          (this.instance = void 0),
          ot(this.updateProjection)
      }
      blockUpdate() {
        this.updateManuallyBlocked = !0
      }
      unblockUpdate() {
        this.updateManuallyBlocked = !1
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize
      }
      isTreeAnimationBlocked() {
        return (
          this.isAnimationBlocked ||
          (this.parent && this.parent.isTreeAnimationBlocked()) ||
          !1
        )
      }
      startUpdate() {
        this.isUpdateBlocked() ||
          ((this.isUpdating = !0),
          this.nodes && this.nodes.forEach(sf),
          this.animationId++)
      }
      getTransformTemplate() {
        const { visualElement: s } = this.options
        return s && s.getProps().transformTemplate
      }
      willUpdate(s = !0) {
        if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
          this.options.onExitComplete && this.options.onExitComplete()
          return
        }
        if (
          (window.HandoffCancelAllAnimations &&
            Co(this) &&
            window.HandoffCancelAllAnimations(),
          !this.root.isUpdating && this.root.startUpdate(),
          this.isLayoutDirty)
        )
          return
        this.isLayoutDirty = !0
        for (let u = 0; u < this.path.length; u++) {
          const d = this.path[u]
          ;(d.shouldResetTransform = !0),
            d.updateScroll("snapshot"),
            d.options.layoutRoot && d.willUpdate(!1)
        }
        const { layoutId: a, layout: l } = this.options
        if (a === void 0 && !l) return
        const c = this.getTransformTemplate()
        ;(this.prevTransformTemplateValue = c
          ? c(this.latestValues, "")
          : void 0),
          this.updateSnapshot(),
          s && this.notifyListeners("willUpdate")
      }
      update() {
        if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
          this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Eo)
          return
        }
        this.isUpdating || this.nodes.forEach(tf),
          (this.isUpdating = !1),
          this.nodes.forEach(ef),
          this.nodes.forEach(Xd),
          this.nodes.forEach(qd),
          this.clearAllSnapshots()
        const a = yt.now()
        ;(U.delta = pt(0, 1e3 / 60, a - U.timestamp)),
          (U.timestamp = a),
          (U.isProcessing = !0),
          mn.update.process(U),
          mn.preRender.process(U),
          mn.render.process(U),
          (U.isProcessing = !1)
      }
      didUpdate() {
        this.updateScheduled ||
          ((this.updateScheduled = !0), en.read(this.scheduleUpdate))
      }
      clearAllSnapshots() {
        this.nodes.forEach(Qd), this.sharedNodes.forEach(of)
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled ||
          ((this.projectionUpdateScheduled = !0),
          M.preRender(this.updateProjection, !1, !0))
      }
      scheduleCheckAfterUnmount() {
        M.postRender(() => {
          this.isLayoutDirty
            ? this.root.didUpdate()
            : this.root.checkUpdateFailed()
        })
      }
      updateSnapshot() {
        this.snapshot || !this.instance || (this.snapshot = this.measure())
      }
      updateLayout() {
        if (
          !this.instance ||
          (this.updateScroll(),
          !(this.options.alwaysMeasureLayout && this.isLead()) &&
            !this.isLayoutDirty)
        )
          return
        if (this.resumeFrom && !this.resumeFrom.instance)
          for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll()
        const s = this.layout
        ;(this.layout = this.measure(!1)),
          (this.layoutCorrected = L()),
          (this.isLayoutDirty = !1),
          (this.projectionDelta = void 0),
          this.notifyListeners("measure", this.layout.layoutBox)
        const { visualElement: a } = this.options
        a &&
          a.notify(
            "LayoutMeasure",
            this.layout.layoutBox,
            s ? s.layoutBox : void 0,
          )
      }
      updateScroll(s = "measure") {
        let a = !!(this.options.layoutScroll && this.instance)
        if (
          (this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === s &&
            (a = !1),
          a)
        ) {
          const l = r(this.instance)
          this.scroll = {
            animationId: this.root.animationId,
            phase: s,
            isRoot: l,
            offset: n(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : l,
          }
        }
      }
      resetTransform() {
        if (!i) return
        const s =
            this.isLayoutDirty ||
            this.shouldResetTransform ||
            this.options.alwaysMeasureLayout,
          a = this.projectionDelta && !vo(this.projectionDelta),
          l = this.getTransformTemplate(),
          c = l ? l(this.latestValues, "") : void 0,
          u = c !== this.prevTransformTemplateValue
        s &&
          (a || wt(this.latestValues) || u) &&
          (i(this.instance, c),
          (this.shouldResetTransform = !1),
          this.scheduleRender())
      }
      measure(s = !0) {
        const a = this.measurePageBox()
        let l = this.removeElementScroll(a)
        return (
          s && (l = this.removeTransform(l)),
          uf(l),
          {
            animationId: this.root.animationId,
            measuredBox: a,
            layoutBox: l,
            latestValues: {},
            source: this.id,
          }
        )
      }
      measurePageBox() {
        var s
        const { visualElement: a } = this.options
        if (!a) return L()
        const l = a.measureViewportBox()
        if (
          !(
            ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) ||
            this.path.some(df)
          )
        ) {
          const { scroll: u } = this.root
          u && (jt(l.x, u.offset.x), jt(l.y, u.offset.y))
        }
        return l
      }
      removeElementScroll(s) {
        var a
        const l = L()
        if (
          (J(l, s), !((a = this.scroll) === null || a === void 0) && a.wasRoot)
        )
          return l
        for (let c = 0; c < this.path.length; c++) {
          const u = this.path[c],
            { scroll: d, options: h } = u
          u !== this.root &&
            d &&
            h.layoutScroll &&
            (d.wasRoot && J(l, s), jt(l.x, d.offset.x), jt(l.y, d.offset.y))
        }
        return l
      }
      applyTransform(s, a = !1) {
        const l = L()
        J(l, s)
        for (let c = 0; c < this.path.length; c++) {
          const u = this.path[c]
          !a &&
            u.options.layoutScroll &&
            u.scroll &&
            u !== u.root &&
            Lt(l, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
            wt(u.latestValues) && Lt(l, u.latestValues)
        }
        return wt(this.latestValues) && Lt(l, this.latestValues), l
      }
      removeTransform(s) {
        const a = L()
        J(a, s)
        for (let l = 0; l < this.path.length; l++) {
          const c = this.path[l]
          if (!c.instance || !wt(c.latestValues)) continue
          Gn(c.latestValues) && c.updateSnapshot()
          const u = L(),
            d = c.measurePageBox()
          J(u, d),
            go(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u)
        }
        return wt(this.latestValues) && go(a, this.latestValues), a
      }
      setTargetDelta(s) {
        ;(this.targetDelta = s),
          this.root.scheduleUpdateProjection(),
          (this.isProjectionDirty = !0)
      }
      setOptions(s) {
        this.options = {
          ...this.options,
          ...s,
          crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
        }
      }
      clearMeasurements() {
        ;(this.scroll = void 0),
          (this.layout = void 0),
          (this.snapshot = void 0),
          (this.prevTransformTemplateValue = void 0),
          (this.targetDelta = void 0),
          (this.target = void 0),
          (this.isLayoutDirty = !1)
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent &&
          this.relativeParent.resolvedRelativeTargetAt !== U.timestamp &&
          this.relativeParent.resolveTargetDelta(!0)
      }
      resolveTargetDelta(s = !1) {
        var a
        const l = this.getLead()
        this.isProjectionDirty ||
          (this.isProjectionDirty = l.isProjectionDirty),
          this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
          this.isSharedProjectionDirty ||
            (this.isSharedProjectionDirty = l.isSharedProjectionDirty)
        const c = !!this.resumingFrom || this !== l
        if (
          !(
            s ||
            (c && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            (!((a = this.parent) === null || a === void 0) &&
              a.isProjectionDirty) ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          )
        )
          return
        const { layout: d, layoutId: h } = this.options
        if (!(!this.layout || !(d || h))) {
          if (
            ((this.resolvedRelativeTargetAt = U.timestamp),
            !this.targetDelta && !this.relativeTarget)
          ) {
            const p = this.getClosestProjectingParent()
            p && p.layout && this.animationProgress !== 1
              ? ((this.relativeParent = p),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = L()),
                (this.relativeTargetOrigin = L()),
                re(
                  this.relativeTargetOrigin,
                  this.layout.layoutBox,
                  p.layout.layoutBox,
                ),
                J(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0)
          }
          if (!(!this.relativeTarget && !this.targetDelta)) {
            if (
              (this.target ||
                ((this.target = L()), (this.targetWithTransforms = L())),
              this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.relativeParent &&
              this.relativeParent.target
                ? (this.forceRelativeParentToResolveTarget(),
                  fd(
                    this.target,
                    this.relativeTarget,
                    this.relativeParent.target,
                  ))
                : this.targetDelta
                  ? (this.resumingFrom
                      ? (this.target = this.applyTransform(
                          this.layout.layoutBox,
                        ))
                      : J(this.target, this.layout.layoutBox),
                    Zs(this.target, this.targetDelta))
                  : J(this.target, this.layout.layoutBox),
              this.attemptToResolveRelativeTarget)
            ) {
              this.attemptToResolveRelativeTarget = !1
              const p = this.getClosestProjectingParent()
              p &&
              !!p.resumingFrom == !!this.resumingFrom &&
              !p.options.layoutScroll &&
              p.target &&
              this.animationProgress !== 1
                ? ((this.relativeParent = p),
                  this.forceRelativeParentToResolveTarget(),
                  (this.relativeTarget = L()),
                  (this.relativeTargetOrigin = L()),
                  re(this.relativeTargetOrigin, this.target, p.target),
                  J(this.relativeTarget, this.relativeTargetOrigin))
                : (this.relativeParent = this.relativeTarget = void 0)
            }
            se && Ct.resolvedTargetDeltas++
          }
        }
      }
      getClosestProjectingParent() {
        if (
          !(
            !this.parent ||
            Gn(this.parent.latestValues) ||
            Ys(this.parent.latestValues)
          )
        )
          return this.parent.isProjecting()
            ? this.parent
            : this.parent.getClosestProjectingParent()
      }
      isProjecting() {
        return !!(
          (this.relativeTarget ||
            this.targetDelta ||
            this.options.layoutRoot) &&
          this.layout
        )
      }
      calcProjection() {
        var s
        const a = this.getLead(),
          l = !!this.resumingFrom || this !== a
        let c = !0
        if (
          ((this.isProjectionDirty ||
            (!((s = this.parent) === null || s === void 0) &&
              s.isProjectionDirty)) &&
            (c = !1),
          l &&
            (this.isSharedProjectionDirty || this.isTransformDirty) &&
            (c = !1),
          this.resolvedRelativeTargetAt === U.timestamp && (c = !1),
          c)
        )
          return
        const { layout: u, layoutId: d } = this.options
        if (
          ((this.isTreeAnimating = !!(
            (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
          )),
          this.isTreeAnimating ||
            (this.targetDelta = this.relativeTarget = void 0),
          !this.layout || !(u || d))
        )
          return
        J(this.layoutCorrected, this.layout.layoutBox)
        const h = this.treeScale.x,
          p = this.treeScale.y
        Td(this.layoutCorrected, this.treeScale, this.path, l),
          a.layout &&
            !a.target &&
            (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
            ((a.target = a.layout.layoutBox), (a.targetWithTransforms = L()))
        const { target: m } = a
        if (!m) {
          this.prevProjectionDelta &&
            (this.createProjectionDeltas(), this.scheduleRender())
          return
        }
        !this.projectionDelta || !this.prevProjectionDelta
          ? this.createProjectionDeltas()
          : (ho(this.prevProjectionDelta.x, this.projectionDelta.x),
            ho(this.prevProjectionDelta.y, this.projectionDelta.y)),
          ne(this.projectionDelta, this.layoutCorrected, m, this.latestValues),
          (this.treeScale.x !== h ||
            this.treeScale.y !== p ||
            !So(this.projectionDelta.x, this.prevProjectionDelta.x) ||
            !So(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
            ((this.hasProjected = !0),
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", m)),
          se && Ct.recalculatedProjection++
      }
      hide() {
        this.isVisible = !1
      }
      show() {
        this.isVisible = !0
      }
      scheduleRender(s = !0) {
        var a
        if (
          ((a = this.options.visualElement) === null ||
            a === void 0 ||
            a.scheduleRender(),
          s)
        ) {
          const l = this.getStack()
          l && l.scheduleRender()
        }
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0)
      }
      createProjectionDeltas() {
        ;(this.prevProjectionDelta = Ot()),
          (this.projectionDelta = Ot()),
          (this.projectionDeltaWithTransform = Ot())
      }
      setAnimationOrigin(s, a = !1) {
        const l = this.snapshot,
          c = l ? l.latestValues : {},
          u = { ...this.latestValues },
          d = Ot()
        ;(!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
          (this.relativeTarget = this.relativeTargetOrigin = void 0),
          (this.attemptToResolveRelativeTarget = !a)
        const h = L(),
          p = l ? l.source : void 0,
          m = this.layout ? this.layout.source : void 0,
          v = p !== m,
          P = this.getStack(),
          T = !P || P.members.length <= 1,
          b = !!(
            v &&
            !T &&
            this.options.crossfade === !0 &&
            !this.path.some(lf)
          )
        this.animationProgress = 0
        let S
        ;(this.mixTargetDelta = (A) => {
          const V = A / 1e3
          Ro(d.x, s.x, V),
            Ro(d.y, s.y, V),
            this.setTargetDelta(d),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              this.relativeParent &&
              this.relativeParent.layout &&
              (re(
                h,
                this.layout.layoutBox,
                this.relativeParent.layout.layoutBox,
              ),
              af(this.relativeTarget, this.relativeTargetOrigin, h, V),
              S && Bd(this.relativeTarget, S) && (this.isProjectionDirty = !1),
              S || (S = L()),
              J(S, this.relativeTarget)),
            v &&
              ((this.animationValues = u),
              Md(u, c, this.latestValues, V, b, T)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = V)
        }),
          this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
      }
      startAnimation(s) {
        this.notifyListeners("animationStart"),
          this.currentAnimation && this.currentAnimation.stop(),
          this.resumingFrom &&
            this.resumingFrom.currentAnimation &&
            this.resumingFrom.currentAnimation.stop(),
          this.pendingAnimation &&
            (ot(this.pendingAnimation), (this.pendingAnimation = void 0)),
          (this.pendingAnimation = M.update(() => {
            ;(Me.hasAnimatedSinceResize = !0),
              (this.currentAnimation = Hd(0, wo, {
                ...s,
                onUpdate: (a) => {
                  this.mixTargetDelta(a), s.onUpdate && s.onUpdate(a)
                },
                onComplete: () => {
                  s.onComplete && s.onComplete(), this.completeAnimation()
                },
              })),
              this.resumingFrom &&
                (this.resumingFrom.currentAnimation = this.currentAnimation),
              (this.pendingAnimation = void 0)
          }))
      }
      completeAnimation() {
        this.resumingFrom &&
          ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0))
        const s = this.getStack()
        s && s.exitAnimationComplete(),
          (this.resumingFrom =
            this.currentAnimation =
            this.animationValues =
              void 0),
          this.notifyListeners("animationComplete")
      }
      finishAnimation() {
        this.currentAnimation &&
          (this.mixTargetDelta && this.mixTargetDelta(wo),
          this.currentAnimation.stop()),
          this.completeAnimation()
      }
      applyTransformsToTarget() {
        const s = this.getLead()
        let {
          targetWithTransforms: a,
          target: l,
          layout: c,
          latestValues: u,
        } = s
        if (!(!a || !l || !c)) {
          if (
            this !== s &&
            this.layout &&
            c &&
            Oo(this.options.animationType, this.layout.layoutBox, c.layoutBox)
          ) {
            l = this.target || L()
            const d = q(this.layout.layoutBox.x)
            ;(l.x.min = s.target.x.min), (l.x.max = l.x.min + d)
            const h = q(this.layout.layoutBox.y)
            ;(l.y.min = s.target.y.min), (l.y.max = l.y.min + h)
          }
          J(a, l),
            Lt(a, u),
            ne(this.projectionDeltaWithTransform, this.layoutCorrected, a, u)
        }
      }
      registerSharedNode(s, a) {
        this.sharedNodes.has(s) || this.sharedNodes.set(s, new Nd()),
          this.sharedNodes.get(s).add(a)
        const c = a.options.initialPromotionConfig
        a.promote({
          transition: c ? c.transition : void 0,
          preserveFollowOpacity:
            c && c.shouldPreserveFollowOpacity
              ? c.shouldPreserveFollowOpacity(a)
              : void 0,
        })
      }
      isLead() {
        const s = this.getStack()
        return s ? s.lead === this : !0
      }
      getLead() {
        var s
        const { layoutId: a } = this.options
        return a
          ? ((s = this.getStack()) === null || s === void 0
              ? void 0
              : s.lead) || this
          : this
      }
      getPrevLead() {
        var s
        const { layoutId: a } = this.options
        return a
          ? (s = this.getStack()) === null || s === void 0
            ? void 0
            : s.prevLead
          : void 0
      }
      getStack() {
        const { layoutId: s } = this.options
        if (s) return this.root.sharedNodes.get(s)
      }
      promote({ needsReset: s, transition: a, preserveFollowOpacity: l } = {}) {
        const c = this.getStack()
        c && c.promote(this, l),
          s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
          a && this.setOptions({ transition: a })
      }
      relegate() {
        const s = this.getStack()
        return s ? s.relegate(this) : !1
      }
      resetSkewAndRotation() {
        const { visualElement: s } = this.options
        if (!s) return
        let a = !1
        const { latestValues: l } = s
        if (
          ((l.z ||
            l.rotate ||
            l.rotateX ||
            l.rotateY ||
            l.rotateZ ||
            l.skewX ||
            l.skewY) &&
            (a = !0),
          !a)
        )
          return
        const c = {}
        l.z && qn("z", s, c, this.animationValues)
        for (let u = 0; u < Xn.length; u++)
          qn(`rotate${Xn[u]}`, s, c, this.animationValues),
            qn(`skew${Xn[u]}`, s, c, this.animationValues)
        s.render()
        for (const u in c)
          s.setStaticValue(u, c[u]),
            this.animationValues && (this.animationValues[u] = c[u])
        s.scheduleRender()
      }
      getProjectionStyles(s) {
        var a, l
        if (!this.instance || this.isSVG) return
        if (!this.isVisible) return Gd
        const c = { visibility: "" },
          u = this.getTransformTemplate()
        if (this.needsReset)
          return (
            (this.needsReset = !1),
            (c.opacity = ""),
            (c.pointerEvents = Te(s == null ? void 0 : s.pointerEvents) || ""),
            (c.transform = u ? u(this.latestValues, "") : "none"),
            c
          )
        const d = this.getLead()
        if (!this.projectionDelta || !this.layout || !d.target) {
          const v = {}
          return (
            this.options.layoutId &&
              ((v.opacity =
                this.latestValues.opacity !== void 0
                  ? this.latestValues.opacity
                  : 1),
              (v.pointerEvents =
                Te(s == null ? void 0 : s.pointerEvents) || "")),
            this.hasProjected &&
              !wt(this.latestValues) &&
              ((v.transform = u ? u({}, "") : "none"),
              (this.hasProjected = !1)),
            v
          )
        }
        const h = d.animationValues || d.latestValues
        this.applyTransformsToTarget(),
          (c.transform = Wd(
            this.projectionDeltaWithTransform,
            this.treeScale,
            h,
          )),
          u && (c.transform = u(h, c.transform))
        const { x: p, y: m } = this.projectionDelta
        ;(c.transformOrigin = `${p.origin * 100}% ${m.origin * 100}% 0`),
          d.animationValues
            ? (c.opacity =
                d === this
                  ? (l =
                      (a = h.opacity) !== null && a !== void 0
                        ? a
                        : this.latestValues.opacity) !== null && l !== void 0
                    ? l
                    : 1
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : h.opacityExit)
            : (c.opacity =
                d === this
                  ? h.opacity !== void 0
                    ? h.opacity
                    : ""
                  : h.opacityExit !== void 0
                    ? h.opacityExit
                    : 0)
        for (const v in ve) {
          if (h[v] === void 0) continue
          const { correct: P, applyTo: T } = ve[v],
            b = c.transform === "none" ? h[v] : P(h[v], d)
          if (T) {
            const S = T.length
            for (let A = 0; A < S; A++) c[T[A]] = b
          } else c[v] = b
        }
        return (
          this.options.layoutId &&
            (c.pointerEvents =
              d === this
                ? Te(s == null ? void 0 : s.pointerEvents) || ""
                : "none"),
          c
        )
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0
      }
      resetTree() {
        this.root.nodes.forEach((s) => {
          var a
          return (a = s.currentAnimation) === null || a === void 0
            ? void 0
            : a.stop()
        }),
          this.root.nodes.forEach(Eo),
          this.root.sharedNodes.clear()
      }
    }
  }
  function Xd(t) {
    t.updateLayout()
  }
  function qd(t) {
    var e
    const n =
      ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) ||
      t.snapshot
    if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
      const { layoutBox: r, measuredBox: i } = t.layout,
        { animationType: o } = t.options,
        s = n.source !== t.layout.source
      o === "size"
        ? Z((d) => {
            const h = s ? n.measuredBox[d] : n.layoutBox[d],
              p = q(h)
            ;(h.min = r[d].min), (h.max = h.min + p)
          })
        : Oo(o, n.layoutBox, r) &&
          Z((d) => {
            const h = s ? n.measuredBox[d] : n.layoutBox[d],
              p = q(r[d])
            ;(h.max = h.min + p),
              t.relativeTarget &&
                !t.currentAnimation &&
                ((t.isProjectionDirty = !0),
                (t.relativeTarget[d].max = t.relativeTarget[d].min + p))
          })
      const a = Ot()
      ne(a, r, n.layoutBox)
      const l = Ot()
      s ? ne(l, t.applyTransform(i, !0), n.measuredBox) : ne(l, r, n.layoutBox)
      const c = !vo(a)
      let u = !1
      if (!t.resumeFrom) {
        const d = t.getClosestProjectingParent()
        if (d && !d.resumeFrom) {
          const { snapshot: h, layout: p } = d
          if (h && p) {
            const m = L()
            re(m, n.layoutBox, h.layoutBox)
            const v = L()
            re(v, r, p.layoutBox),
              To(m, v) || (u = !0),
              d.options.layoutRoot &&
                ((t.relativeTarget = v),
                (t.relativeTargetOrigin = m),
                (t.relativeParent = d))
          }
        }
      }
      t.notifyListeners("didUpdate", {
        layout: r,
        snapshot: n,
        delta: l,
        layoutDelta: a,
        hasLayoutChanged: c,
        hasRelativeTargetChanged: u,
      })
    } else if (t.isLead()) {
      const { onExitComplete: r } = t.options
      r && r()
    }
    t.options.transition = void 0
  }
  function Zd(t) {
    se && Ct.totalNodes++,
      t.parent &&
        (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
        t.isSharedProjectionDirty ||
          (t.isSharedProjectionDirty = !!(
            t.isProjectionDirty ||
            t.parent.isProjectionDirty ||
            t.parent.isSharedProjectionDirty
          )),
        t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
  }
  function Jd(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
  }
  function Qd(t) {
    t.clearSnapshot()
  }
  function Eo(t) {
    t.clearMeasurements()
  }
  function tf(t) {
    t.isLayoutDirty = !1
  }
  function ef(t) {
    const { visualElement: e } = t.options
    e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
      t.resetTransform()
  }
  function Vo(t) {
    t.finishAnimation(),
      (t.targetDelta = t.relativeTarget = t.target = void 0),
      (t.isProjectionDirty = !0)
  }
  function nf(t) {
    t.resolveTargetDelta()
  }
  function rf(t) {
    t.calcProjection()
  }
  function sf(t) {
    t.resetSkewAndRotation()
  }
  function of(t) {
    t.removeLeadSnapshot()
  }
  function Ro(t, e, n) {
    ;(t.translate = j(e.translate, 0, n)),
      (t.scale = j(e.scale, 1, n)),
      (t.origin = e.origin),
      (t.originPoint = e.originPoint)
  }
  function _o(t, e, n, r) {
    ;(t.min = j(e.min, n.min, r)), (t.max = j(e.max, n.max, r))
  }
  function af(t, e, n, r) {
    _o(t.x, e.x, n.x, r), _o(t.y, e.y, n.y, r)
  }
  function lf(t) {
    return t.animationValues && t.animationValues.opacityExit !== void 0
  }
  const cf = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    Do = (t) =>
      typeof navigator < "u" &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes(t),
    ko = Do("applewebkit/") && !Do("chrome/") ? Math.round : K
  function Mo(t) {
    ;(t.min = ko(t.min)), (t.max = ko(t.max))
  }
  function uf(t) {
    Mo(t.x), Mo(t.y)
  }
  function Oo(t, e, n) {
    return (
      t === "position" || (t === "preserve-aspect" && !dd(Po(e), Po(n), 0.2))
    )
  }
  function df(t) {
    var e
    return (
      t !== t.root &&
      ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot)
    )
  }
  const ff = Ao({
      attachResizeListener: (t, e) => at(t, "resize", e),
      measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
      }),
      checkIsScrollRoot: () => !0,
    }),
    Zn = { current: void 0 },
    jo = Ao({
      measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
      defaultParent: () => {
        if (!Zn.current) {
          const t = new ff({})
          t.mount(window), t.setOptions({ layoutScroll: !0 }), (Zn.current = t)
        }
        return Zn.current
      },
      resetTransform: (t, e) => {
        t.style.transform = e !== void 0 ? e : "none"
      },
      checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
    }),
    hf = {
      pan: { Feature: Ed },
      drag: { Feature: Ad, ProjectionNode: jo, MeasureLayout: so },
    },
    Jn = { current: null },
    Lo = { current: !1 }
  function pf() {
    if (((Lo.current = !0), !!tn))
      if (window.matchMedia) {
        const t = window.matchMedia("(prefers-reduced-motion)"),
          e = () => (Jn.current = t.matches)
        t.addListener(e), e()
      } else Jn.current = !1
  }
  function mf(t, e, n) {
    for (const r in e) {
      const i = e[r],
        o = n[r]
      if ($(i))
        t.addValue(r, i),
          process.env.NODE_ENV === "development" &&
            Nn(
              i.version === "11.3.19",
              `Attempting to mix Framer Motion versions ${i.version} with 11.3.19 may not work as expected.`,
            )
      else if ($(o)) t.addValue(r, ee(i, { owner: t }))
      else if (o !== i)
        if (t.hasValue(r)) {
          const s = t.getValue(r)
          s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i)
        } else {
          const s = t.getStaticValue(r)
          t.addValue(r, ee(s !== void 0 ? s : i, { owner: t }))
        }
    }
    for (const r in n) e[r] === void 0 && t.removeValue(r)
    return e
  }
  const Fo = new WeakMap(),
    gf = [...Ki, z, vt],
    yf = (t) => gf.find(Wi(t)),
    Io = [
      "AnimationStart",
      "AnimationComplete",
      "Update",
      "BeforeLayoutMeasure",
      "LayoutMeasure",
      "LayoutAnimationStart",
      "LayoutAnimationComplete",
    ],
    vf = rn.length
  class bf {
    scrapeMotionValuesFromProps(e, n, r) {
      return {}
    }
    constructor(
      {
        parent: e,
        props: n,
        presenceContext: r,
        reducedMotionConfig: i,
        blockInitialAnimation: o,
        visualState: s,
      },
      a = {},
    ) {
      ;(this.applyWillChange = !1),
        (this.resolveKeyframes = (h, p, m, v) =>
          new this.KeyframeResolver(h, p, m, v, this)),
        (this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.KeyframeResolver = Pn),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
        (this.render = () => {
          ;(this.isRenderScheduled = !1),
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection,
              ))
        }),
        (this.isRenderScheduled = !1),
        (this.scheduleRender = () => {
          this.isRenderScheduled ||
            ((this.isRenderScheduled = !0), M.render(this.render, !1, !0))
        })
      const { latestValues: l, renderState: c } = s
      ;(this.latestValues = l),
        (this.baseTarget = { ...l }),
        (this.initialValues = n.initial ? { ...l } : {}),
        (this.renderState = c),
        (this.parent = e),
        (this.props = n),
        (this.presenceContext = r),
        (this.depth = e ? e.depth + 1 : 0),
        (this.reducedMotionConfig = i),
        (this.options = a),
        (this.blockInitialAnimation = !!o),
        (this.isControllingVariants = ye(n)),
        (this.isVariantNode = ri(n)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(e && e.current))
      const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(
        n,
        {},
        this,
      )
      for (const h in d) {
        const p = d[h]
        l[h] !== void 0 && $(p) && p.set(l[h], !1)
      }
    }
    mount(e) {
      ;(this.current = e),
        Fo.set(e, this),
        this.projection &&
          !this.projection.instance &&
          this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
        Lo.current || pf(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === "never"
            ? !1
            : this.reducedMotionConfig === "always"
              ? !0
              : Jn.current),
        process.env.NODE_ENV !== "production" &&
          Nn(
            this.shouldReduceMotion !== !0,
            "You have Reduced Motion enabled on your device. Animations may not appear as expected.",
          ),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext)
    }
    unmount() {
      Fo.delete(this.current),
        this.projection && this.projection.unmount(),
        ot(this.notifyUpdate),
        ot(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this)
      for (const e in this.events) this.events[e].clear()
      for (const e in this.features) {
        const n = this.features[e]
        n && (n.unmount(), (n.isMounted = !1))
      }
      this.current = null
    }
    bindToMotionValue(e, n) {
      const r = ht.has(e),
        i = n.on("change", (s) => {
          ;(this.latestValues[e] = s),
            this.props.onUpdate && M.preRender(this.notifyUpdate),
            r && this.projection && (this.projection.isTransformDirty = !0)
        }),
        o = n.on("renderRequest", this.scheduleRender)
      this.valueSubscriptions.set(e, () => {
        i(), o(), n.owner && n.stop()
      })
    }
    sortNodePosition(e) {
      return !this.current ||
        !this.sortInstanceNodePosition ||
        this.type !== e.type
        ? 0
        : this.sortInstanceNodePosition(this.current, e.current)
    }
    updateFeatures() {
      let e = "animation"
      for (e in Rt) {
        const n = Rt[e]
        if (!n) continue
        const { isEnabled: r, Feature: i } = n
        if (
          (!this.features[e] &&
            i &&
            r(this.props) &&
            (this.features[e] = new i(this)),
          this.features[e])
        ) {
          const o = this.features[e]
          o.isMounted ? o.update() : (o.mount(), (o.isMounted = !0))
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
      return this.current
        ? this.measureInstanceViewportBox(this.current, this.props)
        : L()
    }
    getStaticValue(e) {
      return this.latestValues[e]
    }
    setStaticValue(e, n) {
      this.latestValues[e] = n
    }
    update(e, n) {
      ;(e.transformTemplate || this.props.transformTemplate) &&
        this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = n)
      for (let r = 0; r < Io.length; r++) {
        const i = Io[r]
        this.propEventSubscriptions[i] &&
          (this.propEventSubscriptions[i](),
          delete this.propEventSubscriptions[i])
        const o = "on" + i,
          s = e[o]
        s && (this.propEventSubscriptions[i] = this.on(i, s))
      }
      ;(this.prevMotionValues = mf(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps, this),
        this.prevMotionValues,
      )),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
      return this.props
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0
    }
    getDefaultTransition() {
      return this.props.transition
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint
    }
    getClosestVariantNode() {
      return this.isVariantNode
        ? this
        : this.parent
          ? this.parent.getClosestVariantNode()
          : void 0
    }
    getVariantContext(e = !1) {
      if (e) return this.parent ? this.parent.getVariantContext() : void 0
      if (!this.isControllingVariants) {
        const r = this.parent ? this.parent.getVariantContext() || {} : {}
        return (
          this.props.initial !== void 0 && (r.initial = this.props.initial), r
        )
      }
      const n = {}
      for (let r = 0; r < vf; r++) {
        const i = rn[r],
          o = this.props[i]
        ;($t(o) || o === !1) && (n[i] = o)
      }
      return n
    }
    addVariantChild(e) {
      const n = this.getClosestVariantNode()
      if (n)
        return (
          n.variantChildren && n.variantChildren.add(e),
          () => n.variantChildren.delete(e)
        )
    }
    addValue(e, n) {
      const r = this.values.get(e)
      n !== r &&
        (r && this.removeValue(e),
        this.bindToMotionValue(e, n),
        this.values.set(e, n),
        (this.latestValues[e] = n.get()))
    }
    removeValue(e) {
      this.values.delete(e)
      const n = this.valueSubscriptions.get(e)
      n && (n(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState)
    }
    hasValue(e) {
      return this.values.has(e)
    }
    getValue(e, n) {
      if (this.props.values && this.props.values[e]) return this.props.values[e]
      let r = this.values.get(e)
      return (
        r === void 0 &&
          n !== void 0 &&
          ((r = ee(n === null ? void 0 : n, { owner: this })),
          this.addValue(e, r)),
        r
      )
    }
    readValue(e, n) {
      var r
      let i =
        this.latestValues[e] !== void 0 || !this.current
          ? this.latestValues[e]
          : (r = this.getBaseTargetFromProps(this.props, e)) !== null &&
              r !== void 0
            ? r
            : this.readValueFromInstance(this.current, e, this.options)
      return (
        i != null &&
          (typeof i == "string" && (Li(i) || ji(i))
            ? (i = parseFloat(i))
            : !yf(i) && vt.test(n) && (i = Ji(e, n)),
          this.setBaseTarget(e, $(i) ? i.get() : i)),
        $(i) ? i.get() : i
      )
    }
    setBaseTarget(e, n) {
      this.baseTarget[e] = n
    }
    getBaseTarget(e) {
      var n
      const { initial: r } = this.props
      let i
      if (typeof r == "string" || typeof r == "object") {
        const s = hn(
          this.props,
          r,
          (n = this.presenceContext) === null || n === void 0
            ? void 0
            : n.custom,
        )
        s && (i = s[e])
      }
      if (r && i !== void 0) return i
      const o = this.getBaseTargetFromProps(this.props, e)
      return o !== void 0 && !$(o)
        ? o
        : this.initialValues[e] !== void 0 && i === void 0
          ? void 0
          : this.baseTarget[e]
    }
    on(e, n) {
      return (
        this.events[e] || (this.events[e] = new Bn()), this.events[e].add(n)
      )
    }
    notify(e, ...n) {
      this.events[e] && this.events[e].notify(...n)
    }
  }
  class Bo extends bf {
    constructor() {
      super(...arguments), (this.KeyframeResolver = Qi)
    }
    sortInstanceNodePosition(e, n) {
      return e.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(e, n) {
      return e.style ? e.style[n] : void 0
    }
    removeValueFromRenderState(e, { vars: n, style: r }) {
      delete n[e], delete r[e]
    }
  }
  function xf(t) {
    return window.getComputedStyle(t)
  }
  class Tf extends Bo {
    constructor() {
      super(...arguments),
        (this.type = "html"),
        (this.applyWillChange = !0),
        (this.renderInstance = yi)
    }
    readValueFromInstance(e, n) {
      if (ht.has(n)) {
        const r = En(n)
        return (r && r.default) || 0
      } else {
        const r = xf(e),
          i = (ci(n) ? r.getPropertyValue(n) : r[n]) || 0
        return typeof i == "string" ? i.trim() : i
      }
    }
    measureInstanceViewportBox(e, { transformPagePoint: n }) {
      return eo(e, n)
    }
    build(e, n, r) {
      ln(e, n, r.transformTemplate)
    }
    scrapeMotionValuesFromProps(e, n, r) {
      return fn(e, n, r)
    }
    handleChildMotionValue() {
      this.childSubscription &&
        (this.childSubscription(), delete this.childSubscription)
      const { children: e } = this.props
      $(e) &&
        (this.childSubscription = e.on("change", (n) => {
          this.current && (this.current.textContent = `${n}`)
        }))
    }
  }
  class Pf extends Bo {
    constructor() {
      super(...arguments),
        (this.type = "svg"),
        (this.isSVGTag = !1),
        (this.measureInstanceViewportBox = L)
    }
    getBaseTargetFromProps(e, n) {
      return e[n]
    }
    readValueFromInstance(e, n) {
      if (ht.has(n)) {
        const r = En(n)
        return (r && r.default) || 0
      }
      return (n = vi.has(n) ? n : me(n)), e.getAttribute(n)
    }
    scrapeMotionValuesFromProps(e, n, r) {
      return xi(e, n, r)
    }
    build(e, n, r) {
      un(e, n, this.isSVGTag, r.transformTemplate)
    }
    renderInstance(e, n, r, i) {
      bi(e, n, r, i)
    }
    mount(e) {
      ;(this.isSVGTag = dn(e.tagName)), super.mount(e)
    }
  }
  const Sf = (t, e) =>
      sn(t) ? new Pf(e) : new Tf(e, { allowProjection: t !== y.Fragment }),
    wf = {
      ...rd,
      ...mc,
      ...hf,
      ...{ layout: { ProjectionNode: jo, MeasureLayout: so } },
    },
    Qn = Pl((t, e) => nc(t, e, wf, Sf)),
    Cf = {
      active: { display: "block", transition: { staggerChildren: 0.2 } },
      inactive: { display: "none" },
    },
    Af = {
      active: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      inactive: { opacity: 0, x: 10, transition: { duration: 0.3 } },
    },
    Ef = ({ children: t, value: e }) => {
      const { selected: n, tabId: r } = Xe("tab"),
        i = n === e
      return D.jsx(
        Qn.div,
        {
          role: "tabpanel",
          tabIndex: 0,
          "data-state": i ? "active" : "inactive",
          "aria-labelledby": r + "-tabpanel-" + e,
          variants: Cf,
          animate: i ? "active" : "inactive",
          initial: "inactive",
          children: D.jsx(Qn.div, { variants: Af, children: i && t }, e),
        },
        r + "-tabpanel-" + e,
      )
    },
    Vf = () =>
      D.jsx(Qn.div, {
        className: Ut({
          width: "var(--indicator-width)",
          height: "2px",
          transform: "translateZ(0px)",
          position: "absolute",
          bottom: 0,
          left: "var(--indicator-left)",
          background: "red_300",
          borderRadius: "rounded",
        }),
      })
  ;(W.Accordion = Kr),
    (W.AccordionContent = za),
    (W.AccordionItem = Ua),
    (W.AccordionTrigger = $a),
    (W.Button = La),
    (W.Tab = Ga),
    (W.TabContent = Ef),
    (W.TabIndicator = Vf),
    (W.TabItem = sl),
    (W.TabList = il),
    (W.TagButton = Ir),
    Object.defineProperty(W, Symbol.toStringTag, { value: "Module" })
})
//# sourceMappingURL=index.umd.js.map
