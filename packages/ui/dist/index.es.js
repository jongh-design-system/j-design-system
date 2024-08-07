import * as Qe from "react"
import us, {
  forwardRef as Rt,
  Children as Wa,
  isValidElement as Qt,
  cloneElement as vn,
  useCallback as At,
  useRef as ct,
  useEffect as Wt,
  useMemo as ce,
  useState as bn,
  useId as ds,
  createContext as Vt,
  useContext as H,
  useLayoutEffect as Ka,
  useInsertionEffect as Ua,
  Fragment as fs,
  createElement as $a,
  Component as za,
} from "react"
var xn = { exports: {} },
  Yt = {}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lr
function Ha() {
  if (Lr) return Yt
  Lr = 1
  var t = us,
    e = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    r = Object.prototype.hasOwnProperty,
    i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
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
    return { $$typeof: e, type: a, key: h, ref: p, props: d, _owner: i.current }
  }
  return (Yt.Fragment = n), (Yt.jsx = s), (Yt.jsxs = s), Yt
}
var Xt = {}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fr
function Ga() {
  return (
    Fr ||
      ((Fr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          var t = us,
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
            y = "@@iterator"
          function T(f) {
            if (f === null || typeof f != "object") return null
            var g = (m && f[m]) || f[y]
            return typeof g == "function" ? g : null
          }
          var x = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
          function v(f) {
            {
              for (
                var g = arguments.length,
                  b = new Array(g > 1 ? g - 1 : 0),
                  w = 1;
                w < g;
                w++
              )
                b[w - 1] = arguments[w]
              P("error", f, b)
            }
          }
          function P(f, g, b) {
            {
              var w = x.ReactDebugCurrentFrame,
                D = w.getStackAddendum()
              D !== "" && ((g += "%s"), (b = b.concat([D])))
              var M = b.map(function (E) {
                return String(E)
              })
              M.unshift("Warning: " + g),
                Function.prototype.apply.call(console[f], console, M)
            }
          }
          var C = !1,
            R = !1,
            B = !1,
            et = !1,
            V = !1,
            $
          $ = Symbol.for("react.module.reference")
          function G(f) {
            return !!(
              typeof f == "string" ||
              typeof f == "function" ||
              f === r ||
              f === o ||
              V ||
              f === i ||
              f === c ||
              f === u ||
              et ||
              f === p ||
              C ||
              R ||
              B ||
              (typeof f == "object" &&
                f !== null &&
                (f.$$typeof === h ||
                  f.$$typeof === d ||
                  f.$$typeof === s ||
                  f.$$typeof === a ||
                  f.$$typeof === l || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  f.$$typeof === $ ||
                  f.getModuleId !== void 0))
            )
          }
          function ft(f, g, b) {
            var w = f.displayName
            if (w) return w
            var D = g.displayName || g.name || ""
            return D !== "" ? b + "(" + D + ")" : b
          }
          function zt(f) {
            return f.displayName || "Context"
          }
          function q(f) {
            if (f == null) return null
            if (
              (typeof f.tag == "number" &&
                v(
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
                  return zt(g) + ".Consumer"
                case s:
                  var b = f
                  return zt(b._context) + ".Provider"
                case l:
                  return ft(f, f.render, "ForwardRef")
                case d:
                  var w = f.displayName || null
                  return w !== null ? w : q(f.type) || "Memo"
                case h: {
                  var D = f,
                    M = D._payload,
                    E = D._init
                  try {
                    return q(E(M))
                  } catch {
                    return null
                  }
                }
              }
            return null
          }
          var nt = Object.assign,
            j = 0,
            Z,
            _t,
            Dt,
            yr,
            vr,
            br,
            xr
          function Tr() {}
          Tr.__reactDisabledLog = !0
          function pa() {
            {
              if (j === 0) {
                ;(Z = console.log),
                  (_t = console.info),
                  (Dt = console.warn),
                  (yr = console.error),
                  (vr = console.group),
                  (br = console.groupCollapsed),
                  (xr = console.groupEnd)
                var f = {
                  configurable: !0,
                  enumerable: !0,
                  value: Tr,
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
              j++
            }
          }
          function ma() {
            {
              if ((j--, j === 0)) {
                var f = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                }
                Object.defineProperties(console, {
                  log: nt({}, f, {
                    value: Z,
                  }),
                  info: nt({}, f, {
                    value: _t,
                  }),
                  warn: nt({}, f, {
                    value: Dt,
                  }),
                  error: nt({}, f, {
                    value: yr,
                  }),
                  group: nt({}, f, {
                    value: vr,
                  }),
                  groupCollapsed: nt({}, f, {
                    value: br,
                  }),
                  groupEnd: nt({}, f, {
                    value: xr,
                  }),
                })
              }
              j < 0 &&
                v(
                  "disabledDepth fell below zero. This is a bug in React. Please file an issue.",
                )
            }
          }
          var $e = x.ReactCurrentDispatcher,
            ze
          function me(f, g, b) {
            {
              if (ze === void 0)
                try {
                  throw Error()
                } catch (D) {
                  var w = D.stack.trim().match(/\n( *(at )?)/)
                  ze = (w && w[1]) || ""
                }
              return (
                `
` +
                ze +
                f
              )
            }
          }
          var He = !1,
            ge
          {
            var ga = typeof WeakMap == "function" ? WeakMap : Map
            ge = new ga()
          }
          function Pr(f, g) {
            if (!f || He) return ""
            {
              var b = ge.get(f)
              if (b !== void 0) return b
            }
            var w
            He = !0
            var D = Error.prepareStackTrace
            Error.prepareStackTrace = void 0
            var M
            ;(M = $e.current), ($e.current = null), pa()
            try {
              if (g) {
                var E = function () {
                  throw Error()
                }
                if (
                  (Object.defineProperty(E.prototype, "props", {
                    set: function () {
                      throw Error()
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(E, [])
                  } catch (Y) {
                    w = Y
                  }
                  Reflect.construct(f, [], E)
                } else {
                  try {
                    E.call()
                  } catch (Y) {
                    w = Y
                  }
                  f.call(E.prototype)
                }
              } else {
                try {
                  throw Error()
                } catch (Y) {
                  w = Y
                }
                f()
              }
            } catch (Y) {
              if (Y && w && typeof Y.stack == "string") {
                for (
                  var A = Y.stack.split(`
`),
                    z = w.stack.split(`
`),
                    L = A.length - 1,
                    I = z.length - 1;
                  L >= 1 && I >= 0 && A[L] !== z[I];

                )
                  I--
                for (; L >= 1 && I >= 0; L--, I--)
                  if (A[L] !== z[I]) {
                    if (L !== 1 || I !== 1)
                      do
                        if ((L--, I--, I < 0 || A[L] !== z[I])) {
                          var J =
                            `
` + A[L].replace(" at new ", " at ")
                          return (
                            f.displayName &&
                              J.includes("<anonymous>") &&
                              (J = J.replace("<anonymous>", f.displayName)),
                            typeof f == "function" && ge.set(f, J),
                            J
                          )
                        }
                      while (L >= 1 && I >= 0)
                    break
                  }
              }
            } finally {
              ;(He = !1), ($e.current = M), ma(), (Error.prepareStackTrace = D)
            }
            var Mt = f ? f.displayName || f.name : "",
              xt = Mt ? me(Mt) : ""
            return typeof f == "function" && ge.set(f, xt), xt
          }
          function ya(f, g, b) {
            return Pr(f, !1)
          }
          function va(f) {
            var g = f.prototype
            return !!(g && g.isReactComponent)
          }
          function ye(f, g, b) {
            if (f == null) return ""
            if (typeof f == "function") return Pr(f, va(f))
            if (typeof f == "string") return me(f)
            switch (f) {
              case c:
                return me("Suspense")
              case u:
                return me("SuspenseList")
            }
            if (typeof f == "object")
              switch (f.$$typeof) {
                case l:
                  return ya(f.render)
                case d:
                  return ye(f.type, g, b)
                case h: {
                  var w = f,
                    D = w._payload,
                    M = w._init
                  try {
                    return ye(M(D), g, b)
                  } catch {}
                }
              }
            return ""
          }
          var Ht = Object.prototype.hasOwnProperty,
            Sr = {},
            wr = x.ReactDebugCurrentFrame
          function ve(f) {
            if (f) {
              var g = f._owner,
                b = ye(f.type, f._source, g ? g.type : null)
              wr.setExtraStackFrame(b)
            } else wr.setExtraStackFrame(null)
          }
          function ba(f, g, b, w, D) {
            {
              var M = Function.call.bind(Ht)
              for (var E in f)
                if (M(f, E)) {
                  var A = void 0
                  try {
                    if (typeof f[E] != "function") {
                      var z = Error(
                        (w || "React class") +
                          ": " +
                          b +
                          " type `" +
                          E +
                          "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
                          typeof f[E] +
                          "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.",
                      )
                      throw ((z.name = "Invariant Violation"), z)
                    }
                    A = f[E](
                      g,
                      E,
                      w,
                      b,
                      null,
                      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
                    )
                  } catch (L) {
                    A = L
                  }
                  A &&
                    !(A instanceof Error) &&
                    (ve(D),
                    v(
                      "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
                      w || "React class",
                      b,
                      E,
                      typeof A,
                    ),
                    ve(null)),
                    A instanceof Error &&
                      !(A.message in Sr) &&
                      ((Sr[A.message] = !0),
                      ve(D),
                      v("Failed %s type: %s", b, A.message),
                      ve(null))
                }
            }
          }
          var xa = Array.isArray
          function Ge(f) {
            return xa(f)
          }
          function Ta(f) {
            {
              var g = typeof Symbol == "function" && Symbol.toStringTag,
                b =
                  (g && f[Symbol.toStringTag]) || f.constructor.name || "Object"
              return b
            }
          }
          function Pa(f) {
            try {
              return Cr(f), !1
            } catch {
              return !0
            }
          }
          function Cr(f) {
            return "" + f
          }
          function Ar(f) {
            if (Pa(f))
              return (
                v(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",
                  Ta(f),
                ),
                Cr(f)
              )
          }
          var Gt = x.ReactCurrentOwner,
            Sa = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Rr,
            Vr,
            Ye
          Ye = {}
          function wa(f) {
            if (Ht.call(f, "ref")) {
              var g = Object.getOwnPropertyDescriptor(f, "ref").get
              if (g && g.isReactWarning) return !1
            }
            return f.ref !== void 0
          }
          function Ca(f) {
            if (Ht.call(f, "key")) {
              var g = Object.getOwnPropertyDescriptor(f, "key").get
              if (g && g.isReactWarning) return !1
            }
            return f.key !== void 0
          }
          function Aa(f, g) {
            if (
              typeof f.ref == "string" &&
              Gt.current &&
              g &&
              Gt.current.stateNode !== g
            ) {
              var b = q(Gt.current.type)
              Ye[b] ||
                (v(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  q(Gt.current.type),
                  f.ref,
                ),
                (Ye[b] = !0))
            }
          }
          function Ra(f, g) {
            {
              var b = function () {
                Rr ||
                  ((Rr = !0),
                  v(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    g,
                  ))
              }
              ;(b.isReactWarning = !0),
                Object.defineProperty(f, "key", {
                  get: b,
                  configurable: !0,
                })
            }
          }
          function Va(f, g) {
            {
              var b = function () {
                Vr ||
                  ((Vr = !0),
                  v(
                    "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",
                    g,
                  ))
              }
              ;(b.isReactWarning = !0),
                Object.defineProperty(f, "ref", {
                  get: b,
                  configurable: !0,
                })
            }
          }
          var Ea = function (f, g, b, w, D, M, E) {
            var A = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: e,
              // Built-in properties that belong on the element
              type: f,
              key: g,
              ref: b,
              props: E,
              // Record the component responsible for creating this element.
              _owner: M,
            }
            return (
              (A._store = {}),
              Object.defineProperty(A._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(A, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: w,
              }),
              Object.defineProperty(A, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: D,
              }),
              Object.freeze && (Object.freeze(A.props), Object.freeze(A)),
              A
            )
          }
          function _a(f, g, b, w, D) {
            {
              var M,
                E = {},
                A = null,
                z = null
              b !== void 0 && (Ar(b), (A = "" + b)),
                Ca(g) && (Ar(g.key), (A = "" + g.key)),
                wa(g) && ((z = g.ref), Aa(g, D))
              for (M in g)
                Ht.call(g, M) && !Sa.hasOwnProperty(M) && (E[M] = g[M])
              if (f && f.defaultProps) {
                var L = f.defaultProps
                for (M in L) E[M] === void 0 && (E[M] = L[M])
              }
              if (A || z) {
                var I =
                  typeof f == "function"
                    ? f.displayName || f.name || "Unknown"
                    : f
                A && Ra(E, I), z && Va(E, I)
              }
              return Ea(f, A, z, D, w, Gt.current, E)
            }
          }
          var Xe = x.ReactCurrentOwner,
            Er = x.ReactDebugCurrentFrame
          function kt(f) {
            if (f) {
              var g = f._owner,
                b = ye(f.type, f._source, g ? g.type : null)
              Er.setExtraStackFrame(b)
            } else Er.setExtraStackFrame(null)
          }
          var qe
          qe = !1
          function Ze(f) {
            return typeof f == "object" && f !== null && f.$$typeof === e
          }
          function _r() {
            {
              if (Xe.current) {
                var f = q(Xe.current.type)
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
          function Da(f) {
            return ""
          }
          var Dr = {}
          function ka(f) {
            {
              var g = _r()
              if (!g) {
                var b = typeof f == "string" ? f : f.displayName || f.name
                b &&
                  (g =
                    `

Check the top-level render call using <` +
                    b +
                    ">.")
              }
              return g
            }
          }
          function kr(f, g) {
            {
              if (!f._store || f._store.validated || f.key != null) return
              f._store.validated = !0
              var b = ka(g)
              if (Dr[b]) return
              Dr[b] = !0
              var w = ""
              f &&
                f._owner &&
                f._owner !== Xe.current &&
                (w = " It was passed a child from " + q(f._owner.type) + "."),
                kt(f),
                v(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  b,
                  w,
                ),
                kt(null)
            }
          }
          function Mr(f, g) {
            {
              if (typeof f != "object") return
              if (Ge(f))
                for (var b = 0; b < f.length; b++) {
                  var w = f[b]
                  Ze(w) && kr(w, g)
                }
              else if (Ze(f)) f._store && (f._store.validated = !0)
              else if (f) {
                var D = T(f)
                if (typeof D == "function" && D !== f.entries)
                  for (var M = D.call(f), E; !(E = M.next()).done; )
                    Ze(E.value) && kr(E.value, g)
              }
            }
          }
          function Ma(f) {
            {
              var g = f.type
              if (g == null || typeof g == "string") return
              var b
              if (typeof g == "function") b = g.propTypes
              else if (
                typeof g == "object" &&
                (g.$$typeof === l || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  g.$$typeof === d)
              )
                b = g.propTypes
              else return
              if (b) {
                var w = q(g)
                ba(b, f.props, "prop", w, f)
              } else if (g.PropTypes !== void 0 && !qe) {
                qe = !0
                var D = q(g)
                v(
                  "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                  D || "Unknown",
                )
              }
              typeof g.getDefaultProps == "function" &&
                !g.getDefaultProps.isReactClassApproved &&
                v(
                  "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.",
                )
            }
          }
          function Oa(f) {
            {
              for (var g = Object.keys(f.props), b = 0; b < g.length; b++) {
                var w = g[b]
                if (w !== "children" && w !== "key") {
                  kt(f),
                    v(
                      "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                      w,
                    ),
                    kt(null)
                  break
                }
              }
              f.ref !== null &&
                (kt(f),
                v("Invalid attribute `ref` supplied to `React.Fragment`."),
                kt(null))
            }
          }
          var Or = {}
          function jr(f, g, b, w, D, M) {
            {
              var E = G(f)
              if (!E) {
                var A = ""
                ;(f === void 0 ||
                  (typeof f == "object" &&
                    f !== null &&
                    Object.keys(f).length === 0)) &&
                  (A +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.")
                var z = Da()
                z ? (A += z) : (A += _r())
                var L
                f === null
                  ? (L = "null")
                  : Ge(f)
                    ? (L = "array")
                    : f !== void 0 && f.$$typeof === e
                      ? ((L = "<" + (q(f.type) || "Unknown") + " />"),
                        (A =
                          " Did you accidentally export a JSX literal instead of a component?"))
                      : (L = typeof f),
                  v(
                    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
                    L,
                    A,
                  )
              }
              var I = _a(f, g, b, D, M)
              if (I == null) return I
              if (E) {
                var J = g.children
                if (J !== void 0)
                  if (w)
                    if (Ge(J)) {
                      for (var Mt = 0; Mt < J.length; Mt++) Mr(J[Mt], f)
                      Object.freeze && Object.freeze(J)
                    } else
                      v(
                        "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                      )
                  else Mr(J, f)
              }
              if (Ht.call(g, "key")) {
                var xt = q(f),
                  Y = Object.keys(g).filter(function (Na) {
                    return Na !== "key"
                  }),
                  Je =
                    Y.length > 0
                      ? "{key: someKey, " + Y.join(": ..., ") + ": ...}"
                      : "{key: someKey}"
                if (!Or[xt + Je]) {
                  var Ia =
                    Y.length > 0 ? "{" + Y.join(": ..., ") + ": ...}" : "{}"
                  v(
                    `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                    Je,
                    xt,
                    Ia,
                    xt,
                  ),
                    (Or[xt + Je] = !0)
                }
              }
              return f === r ? Oa(I) : Ma(I), I
            }
          }
          function ja(f, g, b) {
            return jr(f, g, b, !0)
          }
          function La(f, g, b) {
            return jr(f, g, b, !1)
          }
          var Fa = La,
            Ba = ja
          ;(Xt.Fragment = r), (Xt.jsx = Fa), (Xt.jsxs = Ba)
        })()),
    Xt
  )
}
process.env.NODE_ENV === "production"
  ? (xn.exports = Ha())
  : (xn.exports = Ga())
var _ = xn.exports
function Ae(t) {
  return typeof t == "object" && t != null && !Array.isArray(t)
}
function hs(t) {
  return Object.fromEntries(
    Object.entries(t ?? {}).filter(([e, n]) => n !== void 0),
  )
}
var Ya = (t) => t === "base"
function Xa(t) {
  return t.slice().filter((e) => !Ya(e))
}
function Br(t) {
  return String.fromCharCode(t + (t > 25 ? 39 : 97))
}
function qa(t) {
  let e = "",
    n
  for (n = Math.abs(t); n > 52; n = (n / 52) | 0) e = Br(n % 52) + e
  return Br(n % 52) + e
}
function Za(t, e) {
  let n = e.length
  for (; n; ) t = (t * 33) ^ e.charCodeAt(--n)
  return t
}
function Ja(t) {
  return qa(Za(5381, t) >>> 0)
}
var ps = /\s*!(important)?/i
function Qa(t) {
  return typeof t == "string" ? ps.test(t) : !1
}
function tl(t) {
  return typeof t == "string" ? t.replace(ps, "").trim() : t
}
function Ln(t) {
  return typeof t == "string" ? t.replaceAll(" ", "_") : t
}
var Kt = (t) => {
  const e = /* @__PURE__ */ new Map()
  return (...r) => {
    const i = JSON.stringify(r)
    if (e.has(i)) return e.get(i)
    const o = t(...r)
    return e.set(i, o), o
  }
}
function ms(...t) {
  return t.filter(Boolean).reduce(
    (n, r) => (
      Object.keys(r).forEach((i) => {
        const o = n[i],
          s = r[i]
        Ae(o) && Ae(s) ? (n[i] = ms(o, s)) : (n[i] = s)
      }),
      n
    ),
    {},
  )
}
var el = (t) => t != null
function gs(t, e, n = {}) {
  const { stop: r, getKey: i } = n
  function o(s, a = []) {
    if (Ae(s) || Array.isArray(s)) {
      const l = {}
      for (const [c, u] of Object.entries(s)) {
        const d = (i == null ? void 0 : i(c, u)) ?? c,
          h = [...a, d]
        if (r != null && r(s, h)) return e(s, a)
        const p = o(u, h)
        el(p) && (l[d] = p)
      }
      return l
    }
    return e(s, a)
  }
  return o(t)
}
function nl(t, e) {
  return t.reduce((n, r, i) => {
    const o = e[i]
    return r != null && (n[o] = r), n
  }, {})
}
function ys(t, e, n = !0) {
  const { utility: r, conditions: i } = e,
    { hasShorthand: o, resolveShorthand: s } = r
  return gs(t, (a) => (Array.isArray(a) ? nl(a, i.breakpoints.keys) : a), {
    stop: (a) => Array.isArray(a),
    getKey: n ? (a) => (o ? s(a) : a) : void 0,
  })
}
var rl = {
    shift: (t) => t,
    finalize: (t) => t,
    breakpoints: { keys: [] },
  },
  il = (t) => (typeof t == "string" ? t.replaceAll(/[\n\s]+/g, " ") : t)
function vs(t) {
  const { utility: e, hash: n, conditions: r = rl } = t,
    i = (s) => [e.prefix, s].filter(Boolean).join("-"),
    o = (s, a) => {
      let l
      if (n) {
        const c = [...r.finalize(s), a]
        l = i(e.toHash(c, Ja))
      } else l = [...r.finalize(s), i(a)].join(":")
      return l
    }
  return Kt(({ base: s, ...a } = {}) => {
    const l = Object.assign(a, s),
      c = ys(l, t),
      u = /* @__PURE__ */ new Set()
    return (
      gs(c, (d, h) => {
        const p = Qa(d)
        if (d == null) return
        const [m, ...y] = r.shift(h),
          T = Xa(y),
          x = e.transform(m, tl(il(d)))
        let v = o(T, x.className)
        p && (v = `${v}!`), u.add(v)
      }),
      Array.from(u).join(" ")
    )
  })
}
function sl(...t) {
  return t.flat().filter((e) => Ae(e) && Object.keys(hs(e)).length > 0)
}
function ol(t) {
  function e(i) {
    const o = sl(...i)
    return o.length === 1 ? o : o.map((s) => ys(s, t))
  }
  function n(...i) {
    return ms(...e(i))
  }
  function r(...i) {
    return Object.assign({}, ...e(i))
  }
  return { mergeCss: Kt(n), assignCss: r }
}
var al = /([A-Z])/g,
  ll = /^ms-/,
  cl = Kt((t) =>
    t.startsWith("--")
      ? t
      : t.replace(al, "-$1").replace(ll, "-ms-").toLowerCase(),
  ),
  ul =
    "cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%"
;`${ul.split(",").join("|")}`
function Me(t, ...e) {
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
var Ir = (...t) =>
  t
    .filter(Boolean)
    .reduce((e, n) => Array.from(/* @__PURE__ */ new Set([...e, ...n])), [])
const dl =
    "_light,_dark,_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_default,_optional,_open,_closed,_fullscreen,_loading,_currentPage,_currentStep,_motionReduce,_motionSafe,_print,_landscape,_portrait,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_starting,base",
  bs = new Set(dl.split(","))
function Nr(t) {
  return bs.has(t) || /^@|&|&$/.test(t)
}
const fl = /^_/,
  hl = /&|@/
function xs(t) {
  return t.map((e) =>
    bs.has(e) ? e.replace(fl, "") : hl.test(e) ? `[${Ln(e.trim())}]` : e,
  )
}
function Ts(t) {
  return t.sort((e, n) => {
    const r = Nr(e),
      i = Nr(n)
    return r && !i ? 1 : !r && i ? -1 : 0
  })
}
const pl =
    "aspectRatio:aspect,boxDecorationBreak:decoration,zIndex:z,boxSizing:box,objectPosition:obj-pos,objectFit:obj-fit,overscrollBehavior:overscroll,overscrollBehaviorX:overscroll-x,overscrollBehaviorY:overscroll-y,position:pos/1,top:top,left:left,insetInline:inset-x/insetX,insetBlock:inset-y/insetY,inset:inset,insetBlockEnd:inset-b,insetBlockStart:inset-t,insetInlineEnd:end/insetEnd/1,insetInlineStart:start/insetStart/1,right:right,bottom:bottom,float:float,visibility:vis,display:d,hideFrom:hide,hideBelow:show,flexBasis:basis,flex:flex,flexDirection:flex/flexDir,flexGrow:grow,flexShrink:shrink,gridTemplateColumns:grid-cols,gridTemplateRows:grid-rows,gridColumn:col-span,gridRow:row-span,gridColumnStart:col-start,gridColumnEnd:col-end,gridAutoFlow:grid-flow,gridAutoColumns:auto-cols,gridAutoRows:auto-rows,gap:gap,gridGap:gap,gridRowGap:gap-x,gridColumnGap:gap-y,rowGap:gap-x,columnGap:gap-y,justifyContent:justify,alignContent:content,alignItems:items,alignSelf:self,padding:p/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,paddingBottom:pb/1,paddingBlock:py/1/paddingY,paddingBlockEnd:pb,paddingBlockStart:pt,paddingInline:px/paddingX/1,paddingInlineEnd:pe/1/paddingEnd,paddingInlineStart:ps/1/paddingStart,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,marginBottom:mb/1,margin:m/1,marginBlock:my/1/marginY,marginBlockEnd:mb,marginBlockStart:mt,marginInline:mx/1/marginX,marginInlineEnd:me/1/marginEnd,marginInlineStart:ms/1/marginStart,spaceX:space-x,spaceY:space-y,outlineWidth:ring-width/ringWidth,outlineColor:ring-color/ringColor,outline:ring/1,outlineOffset:ring-offset/ringOffset,divideX:divide-x,divideY:divide-y,divideColor:divide-color,divideStyle:divide-style,inlineSize:w,minInlineSize:min-w,maxWidth:max-w/maxW,maxInlineSize:max-w,blockSize:h,minBlockSize:min-h,maxHeight:max-h/maxH,maxBlockSize:max-b,fontFamily:font,fontSize:fs,fontWeight:fw,fontSmoothing:smoothing,fontVariantNumeric:numeric,letterSpacing:tracking,lineHeight:leading,textAlign:text-align,textDecoration:text-decor,textDecorationColor:text-decor-color,textEmphasisColor:text-emphasis-color,textDecorationStyle:decoration-style,textDecorationThickness:decoration-thickness,textUnderlineOffset:underline-offset,textTransform:text-transform,textIndent:indent,textShadow:text-shadow,textShadowColor:text-shadow/textShadowColor,textOverflow:text-overflow,verticalAlign:v-align,wordBreak:break,textWrap:text-wrap,truncate:truncate,lineClamp:clamp,listStyleType:list-type,listStylePosition:list-pos,listStyleImage:list-img,backgroundPosition:bg-pos/bgPosition,backgroundPositionX:bg-pos-x/bgPositionX,backgroundPositionY:bg-pos-y/bgPositionY,backgroundAttachment:bg-attach/bgAttachment,backgroundClip:bg-clip/bgClip,background:bg/1,backgroundColor:bg/bgColor,backgroundOrigin:bg-origin/bgOrigin,backgroundImage:bg-img/bgImage,backgroundRepeat:bg-repeat/bgRepeat,backgroundBlendMode:bg-blend/bgBlendMode,backgroundSize:bg-size/bgSize,backgroundGradient:bg-gradient/bgGradient,textGradient:text-gradient,gradientFromPosition:gradient-from-pos,gradientToPosition:gradient-to-pos,gradientFrom:gradient-from,gradientTo:gradient-to,gradientVia:gradient-via,gradientViaPosition:gradient-via-pos,borderRadius:rounded/1,borderTopLeftRadius:rounded-tl/roundedTopLeft,borderTopRightRadius:rounded-tr/roundedTopRight,borderBottomRightRadius:rounded-br/roundedBottomRight,borderBottomLeftRadius:rounded-bl/roundedBottomLeft,borderTopRadius:rounded-t/roundedTop,borderRightRadius:rounded-r/roundedRight,borderBottomRadius:rounded-b/roundedBottom,borderLeftRadius:rounded-l/roundedLeft,borderStartStartRadius:rounded-ss/roundedStartStart,borderStartEndRadius:rounded-se/roundedStartEnd,borderStartRadius:rounded-s/roundedStart,borderEndStartRadius:rounded-es/roundedEndStart,borderEndEndRadius:rounded-ee/roundedEndEnd,borderEndRadius:rounded-e/roundedEnd,border:border,borderWidth:border-w,borderTopWidth:border-tw,borderLeftWidth:border-lw,borderRightWidth:border-rw,borderBottomWidth:border-bw,borderColor:border,borderInline:border-x/borderX,borderInlineWidth:border-x/borderXWidth,borderInlineColor:border-x/borderXColor,borderBlock:border-y/borderY,borderBlockWidth:border-y/borderYWidth,borderBlockColor:border-y/borderYColor,borderLeft:border-l,borderLeftColor:border-l,borderInlineStart:border-s/borderStart,borderInlineStartWidth:border-s/borderStartWidth,borderInlineStartColor:border-s/borderStartColor,borderRight:border-r,borderRightColor:border-r,borderInlineEnd:border-e/borderEnd,borderInlineEndWidth:border-e/borderEndWidth,borderInlineEndColor:border-e/borderEndColor,borderTop:border-t,borderTopColor:border-t,borderBottom:border-b,borderBottomColor:border-b,borderBlockEnd:border-be,borderBlockEndColor:border-be,borderBlockStart:border-bs,borderBlockStartColor:border-bs,boxShadow:shadow/1,boxShadowColor:shadow-color/shadowColor,mixBlendMode:mix-blend,filter:filter,brightness:brightness,contrast:contrast,grayscale:grayscale,hueRotate:hue-rotate,invert:invert,saturate:saturate,sepia:sepia,dropShadow:drop-shadow,blur:blur,backdropFilter:backdrop,backdropBlur:backdrop-blur,backdropBrightness:backdrop-brightness,backdropContrast:backdrop-contrast,backdropGrayscale:backdrop-grayscale,backdropHueRotate:backdrop-hue-rotate,backdropInvert:backdrop-invert,backdropOpacity:backdrop-opacity,backdropSaturate:backdrop-saturate,backdropSepia:backdrop-sepia,borderCollapse:border,borderSpacing:border-spacing,borderSpacingX:border-spacing-x,borderSpacingY:border-spacing-y,tableLayout:table,transitionTimingFunction:ease,transitionDelay:delay,transitionDuration:duration,transitionProperty:transition-prop,transition:transition,animation:animation,animationName:animation-name,animationTimingFunction:animation-ease,animationDuration:animation-duration,animationDelay:animation-delay,transformOrigin:origin,rotate:rotate,rotateX:rotate-x,rotateY:rotate-y,rotateZ:rotate-z,scale:scale,scaleX:scale-x,scaleY:scale-y,translate:translate,translateX:translate-x/x,translateY:translate-y/y,translateZ:translate-z/z,accentColor:accent,caretColor:caret,scrollBehavior:scroll,scrollbar:scrollbar,scrollMargin:scroll-m,scrollMarginLeft:scroll-ml,scrollMarginRight:scroll-mr,scrollMarginTop:scroll-mt,scrollMarginBottom:scroll-mb,scrollMarginBlock:scroll-my/scrollMarginY,scrollMarginBlockEnd:scroll-mb,scrollMarginBlockStart:scroll-mt,scrollMarginInline:scroll-mx/scrollMarginX,scrollMarginInlineEnd:scroll-me,scrollMarginInlineStart:scroll-ms,scrollPadding:scroll-p,scrollPaddingBlock:scroll-pb/scrollPaddingY,scrollPaddingBlockStart:scroll-pt,scrollPaddingBlockEnd:scroll-pb,scrollPaddingInline:scroll-px/scrollPaddingX,scrollPaddingInlineEnd:scroll-pe,scrollPaddingInlineStart:scroll-ps,scrollPaddingLeft:scroll-pl,scrollPaddingRight:scroll-pr,scrollPaddingTop:scroll-pt,scrollPaddingBottom:scroll-pb,scrollSnapAlign:snap-align,scrollSnapStop:snap-stop,scrollSnapType:snap-type,scrollSnapStrictness:snap-strictness,scrollSnapMargin:snap-m,scrollSnapMarginTop:snap-mt,scrollSnapMarginBottom:snap-mb,scrollSnapMarginLeft:snap-ml,scrollSnapMarginRight:snap-mr,touchAction:touch,userSelect:select,fill:fill,stroke:stroke,strokeWidth:stroke-w,srOnly:sr,debug:debug,appearance:appearance,backfaceVisibility:backface,clipPath:clip-path,hyphens:hyphens,mask:mask,maskImage:mask-image,maskSize:mask-size,textSizeAdjust:text-adjust,container:cq,containerName:cq-name,containerType:cq-type,textStyle:textStyle",
  Ps = /* @__PURE__ */ new Map(),
  Ss = /* @__PURE__ */ new Map()
pl.split(",").forEach((t) => {
  const [e, n] = t.split(":"),
    [r, ...i] = n.split("/")
  Ps.set(e, r),
    i.length &&
      i.forEach((o) => {
        Ss.set(o === "1" ? r : o, e)
      })
})
const Wr = (t) => Ss.get(t) || t,
  ws = {
    conditions: {
      shift: Ts,
      finalize: xs,
      breakpoints: { keys: ["base"] },
    },
    utility: {
      transform: (t, e) => {
        const n = Wr(t)
        return { className: `${Ps.get(n) || cl(n)}_${Ln(e)}` }
      },
      hasShorthand: !0,
      toHash: (t, e) => e(t.join(":")),
      resolveShorthand: Wr,
    },
  },
  ml = vs(ws),
  ue = (...t) => ml(Fn(...t))
ue.raw = (...t) => Fn(...t)
const { mergeCss: Fn, assignCss: hh } = ol(ws)
function Kr(t, e) {
  let n = {}
  return (
    t.forEach((r) => {
      Object.entries(r).every(([o, s]) =>
        o === "css" ? !0 : (Array.isArray(s) ? s : [s]).some((l) => e[o] === l),
      ) && (n = Fn(n, r.css))
    }),
    n
  )
}
function gl(t, e, n, r) {
  if (e.length > 0 && typeof (n == null ? void 0 : n[r]) == "object")
    throw new Error(
      `[recipe:${t}:${r}] Conditions are not supported when using compound variants.`,
    )
}
function Et() {
  let t = "",
    e = 0,
    n
  for (; e < arguments.length; )
    (n = arguments[e++]) && typeof n == "string" && (t && (t += " "), (t += n))
  return t
}
const Bn = (t, e, n) => {
    const r = (o) => ({
      [t]: "__ignore__",
      ...e,
      ...hs(o),
    })
    return {
      recipeFn: (o, s = !0) => {
        const l = vs({
            conditions: {
              shift: Ts,
              finalize: xs,
              breakpoints: { keys: ["base"] },
            },
            utility: {
              toHash: (u, d) => d(u.join(":")),
              transform: (u, d) => (
                gl(t, n, o, u),
                d === "__ignore__"
                  ? { className: t }
                  : ((d = Ln(d)), { className: `${t}--${u}_${d}` })
              ),
            },
          }),
          c = r(o)
        if (s) {
          const u = Kr(n, c)
          return Et(l(c), ue(u))
        }
        return l(c)
      },
      getVariantProps: r,
      __getCompoundVariantCss__: (o) => Kr(n, r(o)),
    }
  },
  In = (t, e) => {
    if (t && !e) return t
    if (!t && e) return e
    const n = (...o) => Et(t(...o), e(...o)),
      r = Ir(t.variantKeys, e.variantKeys),
      i = r.reduce(
        (o, s) => ((o[s] = Ir(t.variantMap[s], e.variantMap[s])), o),
        {},
      )
    return Object.assign(n, {
      __recipe__: !0,
      __name__: `${t.__name__} ${e.__name__}`,
      raw: (o) => o,
      variantKeys: r,
      variantMap: i,
      splitVariantProps(o) {
        return Me(o, r)
      },
    })
  },
  tn = /* @__PURE__ */ Bn(
    "button",
    {
      size: "medium",
      variant: "primary",
      br: "normal",
    },
    [],
  ),
  Cs = {
    size: ["small", "medium", "large"],
    br: ["normal", "rounded"],
    variant: ["primary", "text"],
  },
  Ur = Object.keys(Cs),
  yl = /* @__PURE__ */ Object.assign(Kt(tn.recipeFn), {
    __recipe__: !0,
    __name__: "button",
    __getCompoundVariantCss__: tn.__getCompoundVariantCss__,
    raw: (t) => t,
    variantKeys: Ur,
    variantMap: Cs,
    merge(t) {
      return In(this, t)
    },
    splitVariantProps(t) {
      return Me(t, Ur)
    },
    getVariantProps: tn.getVariantProps,
  }),
  en = /* @__PURE__ */ Bn(
    "tagButton",
    {
      size: "small",
    },
    [],
  ),
  As = {
    size: ["small", "large"],
  },
  $r = Object.keys(As),
  vl = /* @__PURE__ */ Object.assign(Kt(en.recipeFn), {
    __recipe__: !0,
    __name__: "tagButton",
    __getCompoundVariantCss__: en.__getCompoundVariantCss__,
    raw: (t) => t,
    variantKeys: $r,
    variantMap: As,
    merge(t) {
      return In(this, t)
    },
    splitVariantProps(t) {
      return Me(t, $r)
    },
    getVariantProps: en.getVariantProps,
  }),
  nn = /* @__PURE__ */ Bn("accordion", {}, []),
  Rs = {},
  zr = Object.keys(Rs),
  Vs = /* @__PURE__ */ Object.assign(Kt(nn.recipeFn), {
    __recipe__: !0,
    __name__: "accordion",
    __getCompoundVariantCss__: nn.__getCompoundVariantCss__,
    raw: (t) => t,
    variantKeys: zr,
    variantMap: Rs,
    merge(t) {
      return In(this, t)
    },
    splitVariantProps(t) {
      return Me(t, zr)
    },
    getVariantProps: nn.getVariantProps,
  }),
  bl = ({ children: t }) => /* @__PURE__ */ _.jsx(_.Fragment, { children: t })
function Hr(t, e) {
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
function xl(t) {
  return Qt(t) && t.type === bl
}
const Tl = (t, e) => {
    typeof t == "function" ? t(e) : t != null && (t.current = e)
  },
  Gr =
    (...t) =>
    (e) =>
      t.forEach((n) => Tl(n, e)),
  Nn = Rt((t, e) => {
    const { children: n, ...r } = t,
      i = Wa.toArray(n),
      o = i.find(xl)
    if (o) {
      const s = o.props.children,
        a = i.map((l) =>
          l !== o
            ? l
            : Qt(s)
              ? s.props.children
              : (console.warn(
                  "Slot component should have only one React element as a child",
                ),
                null),
        )
      return Qt(s)
        ? vn(
            s,
            {
              ...Hr(r, s.props),
              ref: e ? Gr(e, s.ref) : s.ref,
            },
            a,
          )
        : null
    }
    return Qt(n)
      ? vn(n, {
          ...Hr(r, n.props),
          ref: e ? Gr(e, n.ref) : n.ref,
        })
      : (console.warn(
          "Slot component should have only one React element as a child",
        ),
        null)
  })
Nn.displayName = "Slot"
const ph = Rt(
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
      const u = t ? Nn : "button",
        d = (h) => {
          if (Qt(h)) {
            const { onClick: p } = h.props
            return vn(h, {
              onClick: (m) => {
                m.stopPropagation(), p ? p(m) : a == null || a(m)
              },
            })
          }
        }
      return /* @__PURE__ */ _.jsxs(u, {
        role: "button",
        ref: c,
        className: Et(yl({ ...l })),
        disabled: i,
        id: e,
        "data-testid": e,
        onClick: a,
        ...l,
        children: [
          o && /* @__PURE__ */ _.jsx("span", { children: d(o) }),
          r,
          s && /* @__PURE__ */ _.jsx("span", { children: d(s) }),
        ],
      })
    },
  ),
  Es = (t) => {
    const e = ct(t)
    return (
      Wt(() => {
        e.current = t
      }),
      ce(
        () =>
          (...n) => {
            var r
            return (r = e.current) == null ? void 0 : r.call(e, ...n)
          },
        [],
      )
    )
  },
  Pl = ({ defaultValue: t, onChange: e }) => {
    const n = bn(t),
      [r] = n,
      i = Es(e),
      o = ct(r)
    return (
      Wt(() => {
        o.current !== r && (i(r), (o.current = r))
      }, [r, o, i]),
      n
    )
  },
  Oe = ({ prop: t, defaultProp: e, onChange: n }) => {
    const r = t !== void 0,
      [i, o] = Pl({
        defaultValue: e,
        onChange: n,
      }),
      s = r ? t : i,
      a = Es(n),
      l = At(
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
  Sl = Rt(
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
      const [c, u] = Oe({
        prop: o,
        defaultProp: s,
        onChange: i,
      })
      return /* @__PURE__ */ _.jsx("span", {
        role: "button",
        ref: l,
        id: r,
        className: Et(vl({ ...a }), n),
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
Sl.displayName = "TagButton"
function Wn(t, e) {
  const n = Qe.createContext(e),
    r = (o) => {
      const { children: s, ...a } = o,
        l = Qe.useMemo(() => a, Object.values(a))
      return /* @__PURE__ */ _.jsx(n.Provider, { value: l, children: s })
    }
  function i(o) {
    const s = Qe.useContext(n)
    if (s) return s
    throw new Error(`\`${o}\` must be used within \`${t}\``)
  }
  return (r.displayName = t + "Provider"), [r, i]
}
const wl = (t, e = 150) => {
    const n = ct(null)
    return (
      Wt(() => {
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
  _s = ({ keyList: t, changeIndex: e }) => {
    const n = ct([]),
      r = At((i, o) => {
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
  Ds = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [ks, Cl] = Wn("accordion"),
  Al = Rt((t, e) => {
    const { type: n = "single", ...r } = t
    if (n === "single") return /* @__PURE__ */ _.jsx(Rl, { ...r })
    if (n === "multi") return /* @__PURE__ */ _.jsx(Vl, { ...r })
  })
Al.displayName = "Accordion"
const Rl = ({
    value: t,
    defaultValue: e = [],
    onValueChange: n,
    children: r,
  }) => {
    const [i = [], o] = Oe({
        prop: t,
        defaultProp: e,
        onChange: n,
      }),
      { refs: s, handleKeyDown: a } = _s({
        keyList: Ds,
      })
    return /* @__PURE__ */ _.jsx(ks, {
      selected: i,
      onItemOpen: (l) => o((c) => [l]),
      onItemClose: () => o((l) => []),
      refs: s.current || [],
      children: /* @__PURE__ */ _.jsx("div", {
        ref: (l) => {
          s.current = Array.from((l == null ? void 0 : l.children) || [])
        },
        className: Et(Vs({})),
        onKeyDown: (l) => {
          a(l)
        },
        children: r,
      }),
    })
  },
  Vl = ({ value: t, defaultValue: e, onValueChange: n, children: r }) => {
    const [i, o] = Oe({
        prop: t,
        defaultProp: e,
        onChange: n,
      }),
      s = At(
        (u) => {
          o((d = []) => [...d, u])
        },
        [o],
      ),
      a = At((u) => o((d = []) => d.filter((h) => h !== u)), [o]),
      { refs: l, handleKeyDown: c } = _s({
        keyList: Ds,
      })
    return /* @__PURE__ */ _.jsx(ks, {
      selected: i,
      onItemOpen: s,
      onItemClose: a,
      children: /* @__PURE__ */ _.jsx("div", {
        ref: (u) => {
          l.current = Array.from((u == null ? void 0 : u.children) || [])
        },
        onKeyDown: c,
        className: Et(Vs({})),
        children: r,
      }),
    })
  },
  [El, Ms] = Wn("accordionItem"),
  mh = ({ value: t, disabled: e = !1, children: n }) => {
    const { selected: r, onItemOpen: i, onItemClose: o } = Cl("accordion"),
      s = (r == null ? void 0 : r.includes(t)) && !e,
      a = () => {
        e || (s ? o(t) : i(t))
      }
    return /* @__PURE__ */ _.jsx(El, {
      isOpen: !!s,
      onToggle: a,
      value: t,
      children: /* @__PURE__ */ _.jsx("div", {
        "data-state": s ? "open" : "close",
        tabIndex: 0,
        onKeyDown: (l) => {
          l.key === "Enter" && a()
        },
        children: n,
      }),
    })
  },
  gh = ({ children: t }) => {
    const { onToggle: e, isOpen: n, value: r } = Ms("accordionItem")
    return /* @__PURE__ */ _.jsx("h3", {
      "data-state": n ? "open" : "close",
      children: /* @__PURE__ */ _.jsx("button", {
        onClick: e,
        "aria-expanded": !!n,
        "aria-controls": r,
        tabIndex: -1,
        children: /* @__PURE__ */ _.jsx("span", { children: t }),
      }),
    })
  },
  yh = ({ children: t }) => {
    const { isOpen: e, value: n } = Ms("accordionItem"),
      r = wl(e, 150)
    return /* @__PURE__ */ _.jsx("div", {
      className: ue({
        display: "none",
        overflow: "hidden",
        border: "1px solid black",
        animation: e
          ? "accordionDown 0.2s cubic-bezier(.4,0,.2,1)"
          : "accordionUp 0.2s cubic-bezier(.4,0,.2,1)",
      }),
      "data-state": e ? "open" : "close",
      "aria-controls": n,
      children: /* @__PURE__ */ _.jsx("div", { ref: r, children: t }),
    })
  },
  [_l, Kn] = Wn("tab"),
  vh = Rt(
    (
      { children: t, selected: e, defaultValue: n, onSelect: r, asChild: i },
      o,
    ) => {
      const s = i ? Nn : "div",
        [a, l] = Oe({
          prop: e,
          onChange: r,
          defaultProp: n,
        }),
        c = (u) => {
          l(u)
        }
      return /* @__PURE__ */ _.jsx(_l, {
        selected: a,
        onSelect: c,
        tabId: ds(),
        children: /* @__PURE__ */ _.jsx(s, { ref: o, children: t }),
      })
    },
  )
var dt = {}
Object.defineProperty(dt, "__esModule", {
  value: !0,
})
var Dl =
    typeof window < "u" &&
    /Mac|iPod|iPhone|iPad/.test(window.navigator.platform),
  rn = {
    alt: "altKey",
    control: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey",
  },
  Os = {
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
    mod: Dl ? "meta" : "control",
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
  Un = {
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
  }
for (var be = 1; be < 20; be++) Un["f" + be] = 111 + be
function je(t, e, n) {
  e && !("byKey" in e) && ((n = e), (e = null)), Array.isArray(t) || (t = [t])
  var r = t.map(function (s) {
      return js(s, e)
    }),
    i = function (a) {
      return r.some(function (l) {
        return Ls(l, a)
      })
    },
    o = n == null ? i : i(n)
  return o
}
function kl(t, e) {
  return je(t, e)
}
function Ml(t, e) {
  return je(t, { byKey: !0 }, e)
}
function js(t, e) {
  var n = e && e.byKey,
    r = {}
  t = t.replace("++", "+add")
  var i = t.split("+"),
    o = i.length
  for (var s in rn) r[rn[s]] = !1
  var a = !0,
    l = !1,
    c = void 0
  try {
    for (var u = i[Symbol.iterator](), d; !(a = (d = u.next()).done); a = !0) {
      var h = d.value,
        p = h.endsWith("?") && h.length > 1
      p && (h = h.slice(0, -1))
      var m = $n(h),
        y = rn[m]
      if (h.length > 1 && !y && !Os[h] && !Un[m])
        throw new TypeError('Unknown modifier: "' + h + '"')
      ;(o === 1 || !y) && (n ? (r.key = m) : (r.which = Fs(h))),
        y && (r[y] = p ? null : !0)
    }
  } catch (T) {
    ;(l = !0), (c = T)
  } finally {
    try {
      !a && u.return && u.return()
    } finally {
      if (l) throw c
    }
  }
  return r
}
function Ls(t, e) {
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
function Fs(t) {
  t = $n(t)
  var e = Un[t] || t.toUpperCase().charCodeAt(0)
  return e
}
function $n(t) {
  return (t = t.toLowerCase()), (t = Os[t] || t), t
}
var Ol = (dt.default = je)
dt.isHotkey = je
dt.isCodeHotkey = kl
dt.isKeyHotkey = Ml
dt.parseHotkey = js
dt.compareHotkey = Ls
dt.toKeyCode = Fs
dt.toKeyName = $n
function jl(t) {
  var n
  const e = document.activeElement
  for (; document.activeElement === e && t.length > 0; )
    (n = t.shift()) == null || n.focus()
}
const Bs = Vt({
    currentRovingTabindexValue: null,
    setFocusableId: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
    elements: { current: /* @__PURE__ */ new Map() },
  }),
  Is = "data-roving-tabindex-node",
  Ll = "data-roving-tabindex-root",
  Fl = "data-roving-tabindex-not-focusable"
function Bl({ children: t, active: e, as: n, ...r }) {
  const i = n || "div",
    [o, s] = bn(!1),
    [a, l] = bn(null),
    c = ct(null),
    u = ct(/* @__PURE__ */ new Map()),
    d = At(() => {
      if (!c.current) return []
      const h = Array.from(
        c.current.querySelectorAll(
          `:where([${Is}=true]):not(:where([${Fl}=true] *))`,
        ),
      )
      return Array.from(u.current)
        .sort((p, m) => h.indexOf(p[1]) - h.indexOf(m[1]))
        .map(([p, m]) => ({ id: p, element: m }))
    }, [])
  return /* @__PURE__ */ _.jsx(Bs.Provider, {
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
    children: /* @__PURE__ */ _.jsx(i, {
      [Ll]: !0,
      tabIndex: o ? -1 : 0,
      onFocus: (h) => {
        if (h.target !== h.currentTarget || o) return
        const p = d()
        if (p.length === 0) return
        const m = [
          u.current.get(a ?? ""),
          u.current.get(e ?? ""),
          ...p.map((y) => y.element),
        ].filter((y) => y != null)
        jl(m)
      },
      onBlur: () => s(!1),
      ref: c,
      ...r,
      children: t,
    }),
  })
}
function Il(t) {
  const {
    currentRovingTabindexValue: e,
    setFocusableId: n,
    onShiftTab: r,
    getOrderedItems: i,
    elements: o,
  } = H(Bs)
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
          a.target === a.currentTarget && Ol("shift+tab", a))
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
      [Is]: !0,
      tabIndex: e === t ? 0 : -1,
    }),
  }
}
const Nl = (t) => {
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
  bh = ({ children: t, className: e }) => {
    const { selected: n, onSelect: r } = Kn("tab")
    return /* @__PURE__ */ _.jsx(Bl, {
      as: "div",
      role: "tablist",
      active: n === void 0 ? null : n,
      children: /* @__PURE__ */ _.jsx("div", {
        role: "tablist",
        className: Et(e, ue({ position: "relative", display: "flex" })),
        children: t,
      }),
    })
  },
  xh = Rt(({ children: t, className: e, value: n, asChild: r }, i) => {
    const { selected: o, onSelect: s, tabId: a } = Kn("tab"),
      l = o === n,
      { getOrderedItems: c, isFocusable: u, getRovingProps: d } = Il(n)
    return (
      console.log(u),
      /* @__PURE__ */ _.jsx("button", {
        ...d(),
        role: "tab",
        className: e,
        "aria-selected": l,
        tabIndex: l ? 0 : -1,
        onClick: (h) => {
          h.preventDefault(), s == null || s(n), Nl(h.currentTarget)
        },
        "aria-controls": a + "-tabpanel-" + n,
        "data-id": n,
        "data-tab-item": "",
        children: t,
      })
    )
  }),
  Ns = Vt({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  }),
  Le = Vt({}),
  zn = Vt(null),
  Hn = typeof window < "u",
  Wl = Hn ? Ka : Wt,
  Ws = Vt({ strict: !1 }),
  Fe = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Kl = "framerAppearId",
  Ks = "data-" + Fe(Kl),
  Ul = {
    skipAnimations: !1,
    useManualTiming: !1,
  }
function $l(t) {
  let e = /* @__PURE__ */ new Set(),
    n = /* @__PURE__ */ new Set(),
    r = !1,
    i = !1
  const o = /* @__PURE__ */ new WeakSet()
  let s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1,
  }
  function a(c) {
    o.has(c) && (l.schedule(c), t()), c(s)
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, d = !1) => {
      const p = d && r ? e : n
      return u && o.add(c), p.has(c) || p.add(c), c
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      n.delete(c), o.delete(c)
    },
    /**
     * Execute all schedule callbacks.
     */
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
const xe = [
    "read",
    // Read
    "resolveKeyframes",
    // Write/Read/Write/Read
    "update",
    // Compute
    "preRender",
    // Compute
    "render",
    // Write
    "postRender",
    // Compute
  ],
  zl = 40
function Us(t, e) {
  let n = !1,
    r = !0
  const i = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    o = () => (n = !0),
    s = xe.reduce((x, v) => ((x[v] = $l(o)), x), {}),
    {
      read: a,
      resolveKeyframes: l,
      update: c,
      preRender: u,
      render: d,
      postRender: h,
    } = s,
    p = () => {
      const x = performance.now()
      ;(n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(x - i.timestamp, zl), 1)),
        (i.timestamp = x),
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
    schedule: xe.reduce((x, v) => {
      const P = s[v]
      return (x[v] = (C, R = !1, B = !1) => (n || m(), P.schedule(C, R, B))), x
    }, {}),
    cancel: (x) => {
      for (let v = 0; v < xe.length; v++) s[xe[v]].cancel(x)
    },
    state: i,
    steps: s,
  }
}
const { schedule: Gn, cancel: Th } = Us(queueMicrotask, !1)
function Ot(t) {
  return (
    t &&
    typeof t == "object" &&
    Object.prototype.hasOwnProperty.call(t, "current")
  )
}
const $s = Vt({})
let Yr = !1
function Hl(t, e, n, r, i) {
  const { visualElement: o } = H(Le),
    s = H(Ws),
    a = H(zn),
    l = H(Ns).reducedMotion,
    c = ct()
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
    d = H($s)
  u &&
    !u.projection &&
    i &&
    (u.type === "html" || u.type === "svg") &&
    Yl(c.current, n, i, d),
    Ua(() => {
      u && u.update(n, a)
    })
  const h = ct(!!(n[Ks] && !window.HandoffComplete))
  return (
    Wl(() => {
      u &&
        (u.updateFeatures(),
        Gn.render(u.render),
        h.current && u.animationState && u.animationState.animateChanges())
    }),
    Wt(() => {
      u &&
        (!h.current && u.animationState && u.animationState.animateChanges(),
        h.current && ((h.current = !1), Yr || ((Yr = !0), queueMicrotask(Gl))))
    }),
    u
  )
}
function Gl() {
  window.HandoffComplete = !0
}
function Yl(t, e, n, r) {
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
    e["data-framer-portal-id"] ? void 0 : zs(t.parent),
  )),
    t.projection.setOptions({
      layoutId: i,
      layout: o,
      alwaysMeasureLayout: !!s || (a && Ot(a)),
      visualElement: t,
      /**
       * TODO: Update options in an effect. This could be tricky as it'll be too late
       * to update by the time layout animations run.
       * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
       * ensuring it gets called if there's no potential layout animations.
       *
       */
      animationType: typeof o == "string" ? o : "both",
      initialPromotionConfig: r,
      layoutScroll: l,
      layoutRoot: c,
    })
}
function zs(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : zs(t.parent)
}
function Xl(t, e, n) {
  return At(
    (r) => {
      r && t.mount && t.mount(r),
        e && (r ? e.mount(r) : e.unmount()),
        n && (typeof n == "function" ? n(r) : Ot(n) && (n.current = r))
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [e],
  )
}
function ie(t) {
  return typeof t == "string" || Array.isArray(t)
}
function se(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function"
}
const Yn = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Xn = ["initial", ...Yn]
function Be(t) {
  return se(t.animate) || Xn.some((e) => ie(t[e]))
}
function Hs(t) {
  return !!(Be(t) || t.variants)
}
function ql(t, e) {
  if (Be(t)) {
    const { initial: n, animate: r } = t
    return {
      initial: n === !1 || ie(n) ? n : void 0,
      animate: ie(r) ? r : void 0,
    }
  }
  return t.inherit !== !1 ? e : {}
}
function Zl(t) {
  const { initial: e, animate: n } = ql(t, H(Le))
  return ce(() => ({ initial: e, animate: n }), [Xr(e), Xr(n)])
}
function Xr(t) {
  return Array.isArray(t) ? t.join(" ") : t
}
const qr = {
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
  It = {}
for (const t in qr)
  It[t] = {
    isEnabled: (e) => qr[t].some((n) => !!e[n]),
  }
function Jl(t) {
  for (const e in t)
    It[e] = {
      ...It[e],
      ...t[e],
    }
}
const Gs = Vt({}),
  Ql = Symbol.for("motionComponentSymbol"),
  W = (t) => t
let Ut = W,
  mt = W
process.env.NODE_ENV !== "production" &&
  ((Ut = (t, e) => {
    !t && typeof console < "u" && console.warn(e)
  }),
  (mt = (t, e) => {
    if (!t) throw new Error(e)
  }))
function tc({
  preloadedFeatures: t,
  createVisualElement: e,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  t && Jl(t)
  function o(a, l) {
    let c
    const u = {
        ...H(Ns),
        ...a,
        layoutId: ec(a),
      },
      { isStatic: d } = u,
      h = Zl(a),
      p = r(a, d)
    if (!d && Hn) {
      nc(u, t)
      const m = rc(u)
      ;(c = m.MeasureLayout),
        (h.visualElement = Hl(i, p, u, e, m.ProjectionNode))
    }
    return _.jsxs(Le.Provider, {
      value: h,
      children: [
        c && h.visualElement
          ? _.jsx(c, { visualElement: h.visualElement, ...u })
          : null,
        n(i, a, Xl(p, h.visualElement, l), p, d, h.visualElement),
      ],
    })
  }
  const s = Rt(o)
  return (s[Ql] = i), s
}
function ec({ layoutId: t }) {
  const e = H(Gs).id
  return e && t !== void 0 ? e + "-" + t : t
}
function nc(t, e) {
  const n = H(Ws).strict
  if (process.env.NODE_ENV !== "production" && e && n) {
    const r =
      "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead."
    t.ignoreStrict ? Ut(!1, r) : mt(!1, r)
  }
}
function rc(t) {
  const { drag: e, layout: n } = It
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
function ic(t) {
  function e(r, i = {}) {
    return tc(t(r, i))
  }
  if (typeof Proxy > "u") return e
  const n = /* @__PURE__ */ new Map()
  return new Proxy(e, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, i) => (n.has(i) || n.set(i, e(i)), n.get(i)),
  })
}
const sc = [
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
function qn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */ || t.includes("-")
      ? !1
      : /**
         * If it's in our list of lowercase SVG tags, it's an SVG component
         */
        !!(
          sc.indexOf(t) > -1 /**
           * If it contains a capital letter, it's an SVG component
           */ || /[A-Z]/u.test(t)
        )
  )
}
const Re = {}
function oc(t) {
  Object.assign(Re, t)
}
const de = [
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
  vt = new Set(de)
function Ys(t, { layout: e, layoutId: n }) {
  return (
    vt.has(t) ||
    t.startsWith("origin") ||
    ((e || n !== void 0) && (!!Re[t] || t === "opacity"))
  )
}
const U = (t) => !!(t && t.getVelocity),
  ac = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  lc = de.length
function cc(t, e, n) {
  let r = ""
  for (let i = 0; i < lc; i++) {
    const o = de[i]
    if (t[o] !== void 0) {
      const s = ac[o] || o
      r += `${s}(${t[o]}) `
    }
  }
  return (r = r.trim()), n ? (r = n(t, e ? "" : r)) : e && (r = "none"), r
}
const Xs = (t) => (e) => typeof e == "string" && e.startsWith(t),
  qs = Xs("--"),
  uc = Xs("var(--"),
  Zn = (t) => (uc(t) ? dc.test(t.split("/*")[0].trim()) : !1),
  dc =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  fc = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
  gt = (t, e, n) => (n > e ? e : n < t ? t : n),
  $t = {
    test: (t) => typeof t == "number",
    parse: parseFloat,
    transform: (t) => t,
  },
  te = {
    ...$t,
    transform: (t) => gt(0, 1, t),
  },
  Te = {
    ...$t,
    default: 1,
  },
  ee = (t) => Math.round(t * 1e5) / 1e5,
  Jn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
  hc =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
  pc =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu
function fe(t) {
  return typeof t == "string"
}
function mc(t) {
  return t == null
}
const he = (t) => ({
    test: (e) => fe(e) && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  ht = he("deg"),
  rt = he("%"),
  S = he("px"),
  gc = he("vh"),
  yc = he("vw"),
  Zr = {
    ...rt,
    parse: (t) => rt.parse(t) / 100,
    transform: (t) => rt.transform(t * 100),
  },
  Jr = {
    ...$t,
    transform: Math.round,
  },
  Zs = {
    // Border props
    borderWidth: S,
    borderTopWidth: S,
    borderRightWidth: S,
    borderBottomWidth: S,
    borderLeftWidth: S,
    borderRadius: S,
    radius: S,
    borderTopLeftRadius: S,
    borderTopRightRadius: S,
    borderBottomRightRadius: S,
    borderBottomLeftRadius: S,
    // Positioning props
    width: S,
    maxWidth: S,
    height: S,
    maxHeight: S,
    size: S,
    top: S,
    right: S,
    bottom: S,
    left: S,
    // Spacing props
    padding: S,
    paddingTop: S,
    paddingRight: S,
    paddingBottom: S,
    paddingLeft: S,
    margin: S,
    marginTop: S,
    marginRight: S,
    marginBottom: S,
    marginLeft: S,
    // Transform props
    rotate: ht,
    rotateX: ht,
    rotateY: ht,
    rotateZ: ht,
    scale: Te,
    scaleX: Te,
    scaleY: Te,
    scaleZ: Te,
    skew: ht,
    skewX: ht,
    skewY: ht,
    distance: S,
    translateX: S,
    translateY: S,
    translateZ: S,
    x: S,
    y: S,
    z: S,
    perspective: S,
    transformPerspective: S,
    opacity: te,
    originX: Zr,
    originY: Zr,
    originZ: S,
    // Misc
    zIndex: Jr,
    backgroundPositionX: S,
    backgroundPositionY: S,
    // SVG
    fillOpacity: te,
    strokeOpacity: te,
    numOctaves: Jr,
  }
function Qn(t, e, n) {
  const { style: r, vars: i, transform: o, transformOrigin: s } = t
  let a = !1,
    l = !1,
    c = !0
  for (const u in e) {
    const d = e[u]
    if (qs(u)) {
      i[u] = d
      continue
    }
    const h = Zs[u],
      p = fc(d, h)
    if (vt.has(u)) {
      if (((a = !0), (o[u] = p), !c)) continue
      d !== (h.default || 0) && (c = !1)
    } else u.startsWith("origin") ? ((l = !0), (s[u] = p)) : (r[u] = p)
  }
  if (
    (e.transform ||
      (a || n
        ? (r.transform = cc(t.transform, c, n))
        : r.transform && (r.transform = "none")),
    l)
  ) {
    const { originX: u = "50%", originY: d = "50%", originZ: h = 0 } = s
    r.transformOrigin = `${u} ${d} ${h}`
  }
}
const tr = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {},
})
function Js(t, e, n) {
  for (const r in e) !U(e[r]) && !Ys(r, n) && (t[r] = e[r])
}
function vc({ transformTemplate: t }, e) {
  return ce(() => {
    const n = tr()
    return Qn(n, e, t), Object.assign({}, n.vars, n.style)
  }, [e])
}
function bc(t, e) {
  const n = t.style || {},
    r = {}
  return Js(r, n, t), Object.assign(r, vc(t, e)), r
}
function xc(t, e) {
  const n = {},
    r = bc(t, e)
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
const Tc = /* @__PURE__ */ new Set([
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
function Ve(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    Tc.has(t)
  )
}
let Qs = (t) => !Ve(t)
function Pc(t) {
  t && (Qs = (e) => (e.startsWith("on") ? !Ve(e) : t(e)))
}
try {
  Pc(require("@emotion/is-prop-valid").default)
} catch {}
function Sc(t, e, n) {
  const r = {}
  for (const i in t)
    (i === "values" && typeof t.values == "object") ||
      ((Qs(i) ||
        (n === !0 && Ve(i)) ||
        (!e && !Ve(i)) || // If trying to use native HTML drag events, forward drag listeners
        (t.draggable && i.startsWith("onDrag"))) &&
        (r[i] = t[i]))
  return r
}
function Qr(t, e, n) {
  return typeof t == "string" ? t : S.transform(e + n * t)
}
function wc(t, e, n) {
  const r = Qr(e, t.x, t.width),
    i = Qr(n, t.y, t.height)
  return `${r} ${i}`
}
const Cc = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
  },
  Ac = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
  }
function Rc(t, e, n = 1, r = 0, i = !0) {
  t.pathLength = 1
  const o = i ? Cc : Ac
  t[o.offset] = S.transform(-r)
  const s = S.transform(e),
    a = S.transform(n)
  t[o.array] = `${s} ${a}`
}
function er(
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
    // This is object creation, which we try to avoid per-frame.
    ...c
  },
  u,
  d,
) {
  if ((Qn(t, c, d), u)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox)
    return
  }
  ;(t.attrs = t.style), (t.style = {})
  const { attrs: h, style: p, dimensions: m } = t
  h.transform && (m && (p.transform = h.transform), delete h.transform),
    m &&
      (i !== void 0 || o !== void 0 || p.transform) &&
      (p.transformOrigin = wc(
        m,
        i !== void 0 ? i : 0.5,
        o !== void 0 ? o : 0.5,
      )),
    e !== void 0 && (h.x = e),
    n !== void 0 && (h.y = n),
    r !== void 0 && (h.scale = r),
    s !== void 0 && Rc(h, s, a, l, !1)
}
const to = () => ({
    ...tr(),
    attrs: {},
  }),
  nr = (t) => typeof t == "string" && t.toLowerCase() === "svg"
function Vc(t, e, n, r) {
  const i = ce(() => {
    const o = to()
    return (
      er(o, e, nr(r), t.transformTemplate),
      {
        ...o.attrs,
        style: { ...o.style },
      }
    )
  }, [e])
  if (t.style) {
    const o = {}
    Js(o, t.style, t), (i.style = { ...o, ...i.style })
  }
  return i
}
function Ec(t = !1) {
  return (n, r, i, { latestValues: o }, s) => {
    const l = (qn(n) ? Vc : xc)(r, o, s, n),
      c = Sc(r, typeof n == "string", t),
      u = n !== fs ? { ...c, ...l, ref: i } : {},
      { children: d } = r,
      h = ce(() => (U(d) ? d.get() : d), [d])
    return $a(n, {
      ...u,
      children: h,
    })
  }
}
function eo(t, { style: e, vars: n }, r, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(r))
  for (const o in n) t.style.setProperty(o, n[o])
}
const no = /* @__PURE__ */ new Set([
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
function ro(t, e, n, r) {
  eo(t, e, void 0, r)
  for (const i in e.attrs) t.setAttribute(no.has(i) ? i : Fe(i), e.attrs[i])
}
function rr(t, e, n) {
  var r
  const { style: i } = t,
    o = {}
  for (const s in i)
    (U(i[s]) ||
      (e.style && U(e.style[s])) ||
      Ys(s, t) ||
      ((r = n == null ? void 0 : n.getValue(s)) === null || r === void 0
        ? void 0
        : r.liveStyle) !== void 0) &&
      (o[s] = i[s])
  return (
    n && i && typeof i.willChange == "string" && (n.applyWillChange = !1), o
  )
}
function io(t, e, n) {
  const r = rr(t, e, n)
  for (const i in t)
    if (U(t[i]) || U(e[i])) {
      const o =
        de.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i
      r[o] = t[i]
    }
  return r
}
function ti(t) {
  const e = [{}, {}]
  return (
    t == null ||
      t.values.forEach((n, r) => {
        ;(e[0][r] = n.get()), (e[1][r] = n.getVelocity())
      }),
    e
  )
}
function ir(t, e, n, r) {
  if (typeof e == "function") {
    const [i, o] = ti(r)
    e = e(n !== void 0 ? n : t.custom, i, o)
  }
  if (
    (typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function")
  ) {
    const [i, o] = ti(r)
    e = e(n !== void 0 ? n : t.custom, i, o)
  }
  return e
}
function _c(t) {
  const e = ct(null)
  return e.current === null && (e.current = t()), e.current
}
const Tn = (t) => Array.isArray(t),
  Dc = (t) => !!(t && typeof t == "object" && t.mix && t.toValue),
  kc = (t) => (Tn(t) ? t[t.length - 1] || 0 : t)
function Se(t) {
  const e = U(t) ? t.get() : t
  return Dc(e) ? e.toValue() : e
}
const so = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
])
function oo(t) {
  if (vt.has(t)) return "transform"
  if (so.has(t)) return Fe(t)
}
function Ie(t, e) {
  t.indexOf(e) === -1 && t.push(e)
}
function Ne(t, e) {
  const n = t.indexOf(e)
  n > -1 && t.splice(n, 1)
}
function Mc(
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
  const l = {
    latestValues: jc(i, o, s, a ? !1 : t, e),
    renderState: n(),
  }
  return r && (l.mount = (c) => r(i, c, l)), l
}
const ao = (t) => (e, n) => {
  const r = H(Le),
    i = H(zn),
    o = () => Mc(t, e, r, i, n)
  return n ? o() : _c(o)
}
function Oc(t, e) {
  const n = oo(e)
  n && Ie(t, n)
}
function ei(t, e, n) {
  const r = Array.isArray(e) ? e : [e]
  for (let i = 0; i < r.length; i++) {
    const o = ir(t, r[i])
    if (o) {
      const { transitionEnd: s, transition: a, ...l } = o
      n(l, s)
    }
  }
}
function jc(t, e, n, r, i) {
  var o
  const s = {},
    a = [],
    l =
      r &&
      ((o = t.style) === null || o === void 0 ? void 0 : o.willChange) ===
        void 0,
    c = i(t, {})
  for (const T in c) s[T] = Se(c[T])
  let { initial: u, animate: d } = t
  const h = Be(t),
    p = Hs(t)
  e &&
    p &&
    !h &&
    t.inherit !== !1 &&
    (u === void 0 && (u = e.initial), d === void 0 && (d = e.animate))
  let m = n ? n.initial === !1 : !1
  m = m || u === !1
  const y = m ? d : u
  return (
    y &&
      typeof y != "boolean" &&
      !se(y) &&
      ei(t, y, (T, x) => {
        for (const v in T) {
          let P = T[v]
          if (Array.isArray(P)) {
            const C = m ? P.length - 1 : 0
            P = P[C]
          }
          P !== null && (s[v] = P)
        }
        for (const v in x) s[v] = x[v]
      }),
    l &&
      (d &&
        u !== !1 &&
        !se(d) &&
        ei(t, d, (T) => {
          for (const x in T) Oc(a, x)
        }),
      a.length && (s.willChange = a.join(","))),
    s
  )
}
const {
    schedule: k,
    cancel: ut,
    state: N,
    steps: sn,
  } = Us(typeof requestAnimationFrame < "u" ? requestAnimationFrame : W, !0),
  Lc = {
    useVisualState: ao({
      scrapeMotionValuesFromProps: io,
      createRenderState: to,
      onMount: (t, e, { renderState: n, latestValues: r }) => {
        k.read(() => {
          try {
            n.dimensions =
              typeof e.getBBox == "function"
                ? e.getBBox()
                : e.getBoundingClientRect()
          } catch {
            n.dimensions = {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            }
          }
        }),
          k.render(() => {
            er(n, r, nr(e.tagName), t.transformTemplate), ro(e, n)
          })
      },
    }),
  },
  Fc = {
    useVisualState: ao({
      applyWillChange: !0,
      scrapeMotionValuesFromProps: rr,
      createRenderState: tr,
    }),
  }
function Bc(t, { forwardMotionProps: e = !1 }, n, r) {
  return {
    ...(qn(t) ? Lc : Fc),
    preloadedFeatures: n,
    useRender: Ec(e),
    createVisualElement: r,
    Component: t,
  }
}
function it(t, e, n, r = { passive: !0 }) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n)
}
const lo = (t) =>
  t.pointerType === "mouse"
    ? typeof t.button != "number" || t.button <= 0
    : t.isPrimary !== !1
function We(t, e = "page") {
  return {
    point: {
      x: t[`${e}X`],
      y: t[`${e}Y`],
    },
  }
}
const Ic = (t) => (e) => lo(e) && t(e, We(e))
function st(t, e, n, r) {
  return it(t, e, Ic(n), r)
}
const Nc = (t, e) => (n) => e(t(n)),
  ot = (...t) => t.reduce(Nc)
function co(t) {
  let e = null
  return () => {
    const n = () => {
      e = null
    }
    return e === null ? ((e = t), n) : !1
  }
}
const ni = co("dragHorizontal"),
  ri = co("dragVertical")
function uo(t) {
  let e = !1
  if (t === "y") e = ri()
  else if (t === "x") e = ni()
  else {
    const n = ni(),
      r = ri()
    n && r
      ? (e = () => {
          n(), r()
        })
      : (n && n(), r && r())
  }
  return e
}
function fo() {
  const t = uo(!0)
  return t ? (t(), !1) : !0
}
class bt {
  constructor(e) {
    ;(this.isMounted = !1), (this.node = e)
  }
  update() {}
}
function ii(t, e) {
  const n = e ? "pointerenter" : "pointerleave",
    r = e ? "onHoverStart" : "onHoverEnd",
    i = (o, s) => {
      if (o.pointerType === "touch" || fo()) return
      const a = t.getProps()
      t.animationState &&
        a.whileHover &&
        t.animationState.setActive("whileHover", e)
      const l = a[r]
      l && k.postRender(() => l(o, s))
    }
  return st(t.current, n, i, {
    passive: !t.getProps()[r],
  })
}
class Wc extends bt {
  mount() {
    this.unmount = ot(ii(this.node, !0), ii(this.node, !1))
  }
  unmount() {}
}
class Kc extends bt {
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
    this.unmount = ot(
      it(this.node.current, "focus", () => this.onFocus()),
      it(this.node.current, "blur", () => this.onBlur()),
    )
  }
  unmount() {}
}
const ho = (t, e) => (e ? (t === e ? !0 : ho(t, e.parentElement)) : !1)
function on(t, e) {
  if (!e) return
  const n = new PointerEvent("pointer" + t)
  e(n, We(n))
}
class Uc extends bt {
  constructor() {
    super(...arguments),
      (this.removeStartListeners = W),
      (this.removeEndListeners = W),
      (this.removeAccessibleListeners = W),
      (this.startPointerPress = (e, n) => {
        if (this.isPressing) return
        this.removeEndListeners()
        const r = this.node.getProps(),
          o = st(
            window,
            "pointerup",
            (a, l) => {
              if (!this.checkPressEnd()) return
              const {
                  onTap: c,
                  onTapCancel: u,
                  globalTapTarget: d,
                } = this.node.getProps(),
                h = !d && !ho(this.node.current, a.target) ? u : c
              h && k.update(() => h(a, l))
            },
            {
              passive: !(r.onTap || r.onPointerUp),
            },
          ),
          s = st(window, "pointercancel", (a, l) => this.cancelPress(a, l), {
            passive: !(r.onTapCancel || r.onPointerCancel),
          })
        ;(this.removeEndListeners = ot(o, s)), this.startPress(e, n)
      }),
      (this.startAccessiblePress = () => {
        const e = (o) => {
            if (o.key !== "Enter" || this.isPressing) return
            const s = (a) => {
              a.key !== "Enter" ||
                !this.checkPressEnd() ||
                on("up", (l, c) => {
                  const { onTap: u } = this.node.getProps()
                  u && k.postRender(() => u(l, c))
                })
            }
            this.removeEndListeners(),
              (this.removeEndListeners = it(this.node.current, "keyup", s)),
              on("down", (a, l) => {
                this.startPress(a, l)
              })
          },
          n = it(this.node.current, "keydown", e),
          r = () => {
            this.isPressing && on("cancel", (o, s) => this.cancelPress(o, s))
          },
          i = it(this.node.current, "blur", r)
        this.removeAccessibleListeners = ot(n, i)
      })
  }
  startPress(e, n) {
    this.isPressing = !0
    const { onTapStart: r, whileTap: i } = this.node.getProps()
    i &&
      this.node.animationState &&
      this.node.animationState.setActive("whileTap", !0),
      r && k.postRender(() => r(e, n))
  }
  checkPressEnd() {
    return (
      this.removeEndListeners(),
      (this.isPressing = !1),
      this.node.getProps().whileTap &&
        this.node.animationState &&
        this.node.animationState.setActive("whileTap", !1),
      !fo()
    )
  }
  cancelPress(e, n) {
    if (!this.checkPressEnd()) return
    const { onTapCancel: r } = this.node.getProps()
    r && k.postRender(() => r(e, n))
  }
  mount() {
    const e = this.node.getProps(),
      n = st(
        e.globalTapTarget ? window : this.node.current,
        "pointerdown",
        this.startPointerPress,
        {
          passive: !(e.onTapStart || e.onPointerStart),
        },
      ),
      r = it(this.node.current, "focus", this.startAccessiblePress)
    this.removeStartListeners = ot(n, r)
  }
  unmount() {
    this.removeStartListeners(),
      this.removeEndListeners(),
      this.removeAccessibleListeners()
  }
}
const Pn = /* @__PURE__ */ new WeakMap(),
  an = /* @__PURE__ */ new WeakMap(),
  $c = (t) => {
    const e = Pn.get(t.target)
    e && e(t)
  },
  zc = (t) => {
    t.forEach($c)
  }
function Hc({ root: t, ...e }) {
  const n = t || document
  an.has(n) || an.set(n, {})
  const r = an.get(n),
    i = JSON.stringify(e)
  return r[i] || (r[i] = new IntersectionObserver(zc, { root: t, ...e })), r[i]
}
function Gc(t, e, n) {
  const r = Hc(e)
  return (
    Pn.set(t, n),
    r.observe(t),
    () => {
      Pn.delete(t), r.unobserve(t)
    }
  )
}
const Yc = {
  some: 0,
  all: 1,
}
class Xc extends bt {
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
        threshold: typeof i == "number" ? i : Yc[i],
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
        const { onViewportEnter: u, onViewportLeave: d } = this.node.getProps(),
          h = c ? u : d
        h && h(l)
      }
    return Gc(this.node.current, s, a)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > "u") return
    const { props: e, prevProps: n } = this.node
    ;["amount", "margin", "root"].some(qc(e, n)) && this.startObserver()
  }
  unmount() {}
}
function qc({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n]
}
const Zc = {
  inView: {
    Feature: Xc,
  },
  tap: {
    Feature: Uc,
  },
  focus: {
    Feature: Kc,
  },
  hover: {
    Feature: Wc,
  },
}
function po(t, e) {
  if (!Array.isArray(e)) return !1
  const n = e.length
  if (n !== t.length) return !1
  for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1
  return !0
}
function Ke(t, e, n) {
  const r = t.getProps()
  return ir(r, e, n !== void 0 ? n : r.custom, t)
}
const at = (t) => t * 1e3,
  lt = (t) => t / 1e3,
  Jc = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  },
  Qc = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  tu = {
    type: "keyframes",
    duration: 0.8,
  },
  eu = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
  },
  nu = (t, { keyframes: e }) =>
    e.length > 2 ? tu : vt.has(t) ? (t.startsWith("scale") ? Qc(e[1]) : Jc) : eu
function ru({
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
function sr(t, e) {
  return t[e] || t.default || t
}
const iu = (t) => t !== null
function Ue(t, { repeat: e, repeatType: n = "loop" }, r) {
  const i = t.filter(iu),
    o = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1
  return !o || r === void 0 ? i[o] : r
}
let we
function su() {
  we = void 0
}
const pt = {
    now: () => (
      we === void 0 &&
        pt.set(
          N.isProcessing || Ul.useManualTiming
            ? N.timestamp
            : performance.now(),
        ),
      we
    ),
    set: (t) => {
      ;(we = t), queueMicrotask(su)
    },
  },
  mo = (t) => /^0[^.\s]+$/u.test(t)
function ou(t) {
  return typeof t == "number"
    ? t === 0
    : t !== null
      ? t === "none" || t === "0" || mo(t)
      : !0
}
const go = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
  au =
    // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
    /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
function lu(t) {
  const e = au.exec(t)
  if (!e) return [,]
  const [, n, r, i] = e
  return [`--${n ?? r}`, i]
}
const cu = 4
function yo(t, e, n = 1) {
  mt(
    n <= cu,
    `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`,
  )
  const [r, i] = lu(t)
  if (!r) return
  const o = window.getComputedStyle(e).getPropertyValue(r)
  if (o) {
    const s = o.trim()
    return go(s) ? parseFloat(s) : s
  }
  return Zn(i) ? yo(i, e, n + 1) : i
}
const uu = /* @__PURE__ */ new Set([
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
  si = (t) => t === $t || t === S,
  oi = (t, e) => parseFloat(t.split(", ")[e]),
  ai =
    (t, e) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0
      const i = r.match(/^matrix3d\((.+)\)$/u)
      if (i) return oi(i[1], e)
      {
        const o = r.match(/^matrix\((.+)\)$/u)
        return o ? oi(o[1], t) : 0
      }
    },
  du = /* @__PURE__ */ new Set(["x", "y", "z"]),
  fu = de.filter((t) => !du.has(t))
function hu(t) {
  const e = []
  return (
    fu.forEach((n) => {
      const r = t.getValue(n)
      r !== void 0 &&
        (e.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0))
    }),
    e
  )
}
const Nt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: ai(4, 13),
  y: ai(5, 14),
}
Nt.translateX = Nt.x
Nt.translateY = Nt.y
const vo = (t) => (e) => e.test(t),
  pu = {
    test: (t) => t === "auto",
    parse: (t) => t,
  },
  bo = [$t, S, rt, ht, yc, gc, pu],
  li = (t) => bo.find(vo(t)),
  Ct = /* @__PURE__ */ new Set()
let Sn = !1,
  wn = !1
function xo() {
  if (wn) {
    const t = Array.from(Ct).filter((r) => r.needsMeasurement),
      e = new Set(t.map((r) => r.element)),
      n = /* @__PURE__ */ new Map()
    e.forEach((r) => {
      const i = hu(r)
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
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
      })
  }
  ;(wn = !1), (Sn = !1), Ct.forEach((t) => t.complete()), Ct.clear()
}
function To() {
  Ct.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (wn = !0)
  })
}
function mu() {
  To(), xo()
}
class or {
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
        ? (Ct.add(this), Sn || ((Sn = !0), k.read(To), k.resolveKeyframes(xo)))
        : (this.readKeyframes(), this.complete())
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: r, motionValue: i } = this
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
      Ct.delete(this)
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Ct.delete(this))
  }
  resume() {
    this.isComplete || this.scheduleResolve()
  }
}
const ar = (t, e) => (n) =>
    !!(
      (fe(n) && pc.test(n) && n.startsWith(t)) ||
      (e && !mc(n) && Object.prototype.hasOwnProperty.call(n, e))
    ),
  Po = (t, e, n) => (r) => {
    if (!fe(r)) return r
    const [i, o, s, a] = r.match(Jn)
    return {
      [t]: parseFloat(i),
      [e]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    }
  },
  gu = (t) => gt(0, 255, t),
  ln = {
    ...$t,
    transform: (t) => Math.round(gu(t)),
  },
  wt = {
    test: ar("rgb", "red"),
    parse: Po("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      ln.transform(t) +
      ", " +
      ln.transform(e) +
      ", " +
      ln.transform(n) +
      ", " +
      ee(te.transform(r)) +
      ")",
  }
function yu(t) {
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
const Cn = {
    test: ar("#"),
    parse: yu,
    transform: wt.transform,
  },
  jt = {
    test: ar("hsl", "hue"),
    parse: Po("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      rt.transform(ee(e)) +
      ", " +
      rt.transform(ee(n)) +
      ", " +
      ee(te.transform(r)) +
      ")",
  },
  K = {
    test: (t) => wt.test(t) || Cn.test(t) || jt.test(t),
    parse: (t) =>
      wt.test(t) ? wt.parse(t) : jt.test(t) ? jt.parse(t) : Cn.parse(t),
    transform: (t) =>
      fe(t) ? t : t.hasOwnProperty("red") ? wt.transform(t) : jt.transform(t),
  }
function vu(t) {
  var e, n
  return (
    isNaN(t) &&
    fe(t) &&
    (((e = t.match(Jn)) === null || e === void 0 ? void 0 : e.length) || 0) +
      (((n = t.match(hc)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  )
}
const So = "number",
  wo = "color",
  bu = "var",
  xu = "var(",
  ci = "${}",
  Tu =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function oe(t) {
  const e = t.toString(),
    n = [],
    r = {
      color: [],
      number: [],
      var: [],
    },
    i = []
  let o = 0
  const a = e
    .replace(
      Tu,
      (l) => (
        K.test(l)
          ? (r.color.push(o), i.push(wo), n.push(K.parse(l)))
          : l.startsWith(xu)
            ? (r.var.push(o), i.push(bu), n.push(l))
            : (r.number.push(o), i.push(So), n.push(parseFloat(l))),
        ++o,
        ci
      ),
    )
    .split(ci)
  return { values: n, split: a, indexes: r, types: i }
}
function Co(t) {
  return oe(t).values
}
function Ao(t) {
  const { split: e, types: n } = oe(t),
    r = e.length
  return (i) => {
    let o = ""
    for (let s = 0; s < r; s++)
      if (((o += e[s]), i[s] !== void 0)) {
        const a = n[s]
        a === So
          ? (o += ee(i[s]))
          : a === wo
            ? (o += K.transform(i[s]))
            : (o += i[s])
      }
    return o
  }
}
const Pu = (t) => (typeof t == "number" ? 0 : t)
function Su(t) {
  const e = Co(t)
  return Ao(t)(e.map(Pu))
}
const yt = {
    test: vu,
    parse: Co,
    createTransformer: Ao,
    getAnimatableNone: Su,
  },
  wu = /* @__PURE__ */ new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity",
  ])
function Cu(t) {
  const [e, n] = t.slice(0, -1).split("(")
  if (e === "drop-shadow") return t
  const [r] = n.match(Jn) || []
  if (!r) return t
  const i = n.replace(r, "")
  let o = wu.has(e) ? 1 : 0
  return r !== n && (o *= 100), e + "(" + o + i + ")"
}
const Au = /\b([a-z-]*)\(.*?\)/gu,
  An = {
    ...yt,
    getAnimatableNone: (t) => {
      const e = t.match(Au)
      return e ? e.map(Cu).join(" ") : t
    },
  },
  Ru = {
    ...Zs,
    // Color props
    color: K,
    backgroundColor: K,
    outlineColor: K,
    fill: K,
    stroke: K,
    // Border props
    borderColor: K,
    borderTopColor: K,
    borderRightColor: K,
    borderBottomColor: K,
    borderLeftColor: K,
    filter: An,
    WebkitFilter: An,
  },
  lr = (t) => Ru[t]
function Ro(t, e) {
  let n = lr(t)
  return (
    n !== An && (n = yt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
  )
}
const Vu = /* @__PURE__ */ new Set(["auto", "none", "0"])
function Eu(t, e, n) {
  let r = 0,
    i
  for (; r < t.length && !i; ) {
    const o = t[r]
    typeof o == "string" && !Vu.has(o) && oe(o).values.length && (i = t[r]), r++
  }
  if (i && n) for (const o of e) t[o] = Ro(n, i)
}
class Vo extends or {
  constructor(e, n, r, i) {
    super(e, n, r, i, i == null ? void 0 : i.owner, !0)
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: r } = this
    if (!n.current) return
    super.readKeyframes()
    for (let l = 0; l < e.length; l++) {
      let c = e[l]
      if (typeof c == "string" && ((c = c.trim()), Zn(c))) {
        const u = yo(c, n.current)
        u !== void 0 && (e[l] = u),
          l === e.length - 1 && (this.finalKeyframe = c)
      }
    }
    if ((this.resolveNoneKeyframes(), !uu.has(r) || e.length !== 2)) return
    const [i, o] = e,
      s = li(i),
      a = li(o)
    if (s !== a)
      if (si(s) && si(a))
        for (let l = 0; l < e.length; l++) {
          const c = e[l]
          typeof c == "string" && (e[l] = parseFloat(c))
        }
      else this.needsMeasurement = !0
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this,
      r = []
    for (let i = 0; i < e.length; i++) ou(e[i]) && r.push(i)
    r.length && Eu(e, r, n)
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: r } = this
    if (!e.current) return
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Nt[r](
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
    ;(i[s] = Nt[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
      !((e = this.removedTransforms) === null || e === void 0) &&
        e.length &&
        this.removedTransforms.forEach(([l, c]) => {
          n.getValue(l).set(c)
        }),
      this.resolveNoneKeyframes()
  }
}
function Eo(t) {
  let e
  return () => (e === void 0 && (e = t()), e)
}
const ui = (t, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" && // It's animatable if we have a string
          (yt.test(t) || t === "0") && // And it contains numbers and/or colors
          !t.startsWith("url("))
      )
function _u(t) {
  const e = t[0]
  if (t.length === 1) return !0
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0
}
function Du(t, e, n, r) {
  const i = t[0]
  if (i === null) return !1
  if (e === "display" || e === "visibility") return !0
  const o = t[t.length - 1],
    s = ui(i, e),
    a = ui(o, e)
  return (
    Ut(
      s === a,
      `You are trying to animate ${e} from "${i}" to "${o}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${o} via the \`style\` property.`,
    ),
    !s || !a ? !1 : _u(t) || (n === "spring" && r)
  )
}
class _o {
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
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && mu(), this._resolved
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
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
    if (!c && !Du(e, r, i, o))
      if (s) this.options.duration = 0
      else {
        l == null || l(Ue(e, this.options, n)),
          a == null || a(),
          this.resolveFinishedPromise()
        return
      }
    const u = this.initPlayback(e, n)
    u !== !1 &&
      ((this._resolved = {
        keyframes: e,
        finalKeyframe: n,
        ...u,
      }),
      this.onPostResolved())
  }
  onPostResolved() {}
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.currentFinishedPromise.then(e, n)
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e
    })
  }
}
function Do(t, e) {
  return e ? t * (1e3 / e) : 0
}
const ku = 5
function ko(t, e, n) {
  const r = Math.max(e - ku, 0)
  return Do(n - t(r), e - r)
}
const cn = 1e-3,
  Mu = 0.01,
  di = 10,
  Ou = 0.05,
  ju = 1
function Lu({
  duration: t = 800,
  bounce: e = 0.25,
  velocity: n = 0,
  mass: r = 1,
}) {
  let i, o
  Ut(t <= at(di), "Spring duration must be 10 seconds or less")
  let s = 1 - e
  ;(s = gt(Ou, ju, s)),
    (t = gt(Mu, di, lt(t))),
    s < 1
      ? ((i = (c) => {
          const u = c * s,
            d = u * t,
            h = u - n,
            p = Rn(c, s),
            m = Math.exp(-d)
          return cn - (h / p) * m
        }),
        (o = (c) => {
          const d = c * s * t,
            h = d * n + n,
            p = Math.pow(s, 2) * Math.pow(c, 2) * t,
            m = Math.exp(-d),
            y = Rn(Math.pow(c, 2), s)
          return ((-i(c) + cn > 0 ? -1 : 1) * ((h - p) * m)) / y
        }))
      : ((i = (c) => {
          const u = Math.exp(-c * t),
            d = (c - n) * t + 1
          return -cn + u * d
        }),
        (o = (c) => {
          const u = Math.exp(-c * t),
            d = (n - c) * (t * t)
          return u * d
        }))
  const a = 5 / t,
    l = Bu(i, o, a)
  if (((t = at(t)), isNaN(l)))
    return {
      stiffness: 100,
      damping: 10,
      duration: t,
    }
  {
    const c = Math.pow(l, 2) * r
    return {
      stiffness: c,
      damping: s * 2 * Math.sqrt(r * c),
      duration: t,
    }
  }
}
const Fu = 12
function Bu(t, e, n) {
  let r = n
  for (let i = 1; i < Fu; i++) r = r - t(r) / e(r)
  return r
}
function Rn(t, e) {
  return t * Math.sqrt(1 - e * e)
}
const Iu = ["duration", "bounce"],
  Nu = ["stiffness", "damping", "mass"]
function fi(t, e) {
  return e.some((n) => t[n] !== void 0)
}
function Wu(t) {
  let e = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...t,
  }
  if (!fi(t, Nu) && fi(t, Iu)) {
    const n = Lu(t)
    ;(e = {
      ...e,
      ...n,
      mass: 1,
    }),
      (e.isResolvedFromDuration = !0)
  }
  return e
}
function Mo({ keyframes: t, restDelta: e, restSpeed: n, ...r }) {
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
    } = Wu({
      ...r,
      velocity: -lt(r.velocity || 0),
    }),
    p = d || 0,
    m = l / (2 * Math.sqrt(a * c)),
    y = o - i,
    T = lt(Math.sqrt(a / c)),
    x = Math.abs(y) < 5
  n || (n = x ? 0.01 : 2), e || (e = x ? 5e-3 : 0.5)
  let v
  if (m < 1) {
    const P = Rn(T, m)
    v = (C) => {
      const R = Math.exp(-m * T * C)
      return (
        o - R * (((p + m * T * y) / P) * Math.sin(P * C) + y * Math.cos(P * C))
      )
    }
  } else if (m === 1) v = (P) => o - Math.exp(-T * P) * (y + (p + T * y) * P)
  else {
    const P = T * Math.sqrt(m * m - 1)
    v = (C) => {
      const R = Math.exp(-m * T * C),
        B = Math.min(P * C, 300)
      return (
        o - (R * ((p + m * T * y) * Math.sinh(B) + P * y * Math.cosh(B))) / P
      )
    }
  }
  return {
    calculatedDuration: (h && u) || null,
    next: (P) => {
      const C = v(P)
      if (h) s.done = P >= u
      else {
        let R = p
        P !== 0 && (m < 1 ? (R = ko(v, P, C)) : (R = 0))
        const B = Math.abs(R) <= n,
          et = Math.abs(o - C) <= e
        s.done = B && et
      }
      return (s.value = s.done ? o : C), s
    },
  }
}
function hi({
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
    h = {
      done: !1,
      value: d,
    },
    p = (V) => (a !== void 0 && V < a) || (l !== void 0 && V > l),
    m = (V) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - V) < Math.abs(l - V)
          ? a
          : l
  let y = n * e
  const T = d + y,
    x = s === void 0 ? T : s(T)
  x !== T && (y = x - d)
  const v = (V) => -y * Math.exp(-V / r),
    P = (V) => x + v(V),
    C = (V) => {
      const $ = v(V),
        G = P(V)
      ;(h.done = Math.abs($) <= c), (h.value = h.done ? x : G)
    }
  let R, B
  const et = (V) => {
    p(h.value) &&
      ((R = V),
      (B = Mo({
        keyframes: [h.value, m(h.value)],
        velocity: ko(P, V, h.value),
        // TODO: This should be passing * 1000
        damping: i,
        stiffness: o,
        restDelta: c,
        restSpeed: u,
      })))
  }
  return (
    et(0),
    {
      calculatedDuration: null,
      next: (V) => {
        let $ = !1
        return (
          !B && R === void 0 && (($ = !0), C(V), et(V)),
          R !== void 0 && V >= R ? B.next(V - R) : (!$ && C(V), h)
        )
      },
    }
  )
}
const Oo = (t, e, n) =>
    (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
  Ku = 1e-7,
  Uu = 12
function $u(t, e, n, r, i) {
  let o,
    s,
    a = 0
  do (s = e + (n - e) / 2), (o = Oo(s, r, i) - t), o > 0 ? (n = s) : (e = s)
  while (Math.abs(o) > Ku && ++a < Uu)
  return s
}
function pe(t, e, n, r) {
  if (t === e && n === r) return W
  const i = (o) => $u(o, 0, 1, t, n)
  return (o) => (o === 0 || o === 1 ? o : Oo(i(o), e, r))
}
const zu = pe(0.42, 0, 1, 1),
  Hu = pe(0, 0, 0.58, 1),
  jo = pe(0.42, 0, 0.58, 1),
  Gu = (t) => Array.isArray(t) && typeof t[0] != "number",
  Lo = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  Fo = (t) => (e) => 1 - t(1 - e),
  cr = (t) => 1 - Math.sin(Math.acos(t)),
  Bo = Fo(cr),
  Yu = Lo(cr),
  Io = pe(0.33, 1.53, 0.69, 0.99),
  ur = Fo(Io),
  Xu = Lo(ur),
  qu = (t) =>
    (t *= 2) < 1 ? 0.5 * ur(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
  pi = {
    linear: W,
    easeIn: zu,
    easeInOut: jo,
    easeOut: Hu,
    circIn: cr,
    circInOut: Yu,
    circOut: Bo,
    backIn: ur,
    backInOut: Xu,
    backOut: Io,
    anticipate: qu,
  },
  mi = (t) => {
    if (Array.isArray(t)) {
      mt(
        t.length === 4,
        "Cubic bezier arrays must contain four numerical values.",
      )
      const [e, n, r, i] = t
      return pe(e, n, r, i)
    } else if (typeof t == "string")
      return mt(pi[t] !== void 0, `Invalid easing type '${t}'`), pi[t]
    return t
  },
  ae = (t, e, n) => {
    const r = e - t
    return r === 0 ? 1 : (n - t) / r
  },
  O = (t, e, n) => t + (e - t) * n
function un(t, e, n) {
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
function Zu({ hue: t, saturation: e, lightness: n, alpha: r }) {
  ;(t /= 360), (e /= 100), (n /= 100)
  let i = 0,
    o = 0,
    s = 0
  if (!e) i = o = s = n
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e,
      l = 2 * n - a
    ;(i = un(l, a, t + 1 / 3)), (o = un(l, a, t)), (s = un(l, a, t - 1 / 3))
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  }
}
function Ee(t, e) {
  return (n) => (n > 0 ? e : t)
}
const dn = (t, e, n) => {
    const r = t * t,
      i = n * (e * e - r) + r
    return i < 0 ? 0 : Math.sqrt(i)
  },
  Ju = [Cn, wt, jt],
  Qu = (t) => Ju.find((e) => e.test(t))
function gi(t) {
  const e = Qu(t)
  if (
    (Ut(
      !!e,
      `'${t}' is not an animatable color. Use the equivalent color code instead.`,
    ),
    !e)
  )
    return !1
  let n = e.parse(t)
  return e === jt && (n = Zu(n)), n
}
const yi = (t, e) => {
    const n = gi(t),
      r = gi(e)
    if (!n || !r) return Ee(t, e)
    const i = { ...n }
    return (o) => (
      (i.red = dn(n.red, r.red, o)),
      (i.green = dn(n.green, r.green, o)),
      (i.blue = dn(n.blue, r.blue, o)),
      (i.alpha = O(n.alpha, r.alpha, o)),
      wt.transform(i)
    )
  },
  Vn = /* @__PURE__ */ new Set(["none", "hidden"])
function td(t, e) {
  return Vn.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t)
}
function ed(t, e) {
  return (n) => O(t, e, n)
}
function dr(t) {
  return typeof t == "number"
    ? ed
    : typeof t == "string"
      ? Zn(t)
        ? Ee
        : K.test(t)
          ? yi
          : id
      : Array.isArray(t)
        ? No
        : typeof t == "object"
          ? K.test(t)
            ? yi
            : nd
          : Ee
}
function No(t, e) {
  const n = [...t],
    r = n.length,
    i = t.map((o, s) => dr(o)(o, e[s]))
  return (o) => {
    for (let s = 0; s < r; s++) n[s] = i[s](o)
    return n
  }
}
function nd(t, e) {
  const n = { ...t, ...e },
    r = {}
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (r[i] = dr(t[i])(t[i], e[i]))
  return (i) => {
    for (const o in r) n[o] = r[o](i)
    return n
  }
}
function rd(t, e) {
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
const id = (t, e) => {
  const n = yt.createTransformer(e),
    r = oe(t),
    i = oe(e)
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (Vn.has(t) && !i.values.length) || (Vn.has(e) && !r.values.length)
      ? td(t, e)
      : ot(No(rd(r, i), i.values), n)
    : (Ut(
        !0,
        `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
      ),
      Ee(t, e))
}
function Wo(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number"
    ? O(t, e, n)
    : dr(t)(t, e)
}
function sd(t, e, n) {
  const r = [],
    i = n || Wo,
    o = t.length - 1
  for (let s = 0; s < o; s++) {
    let a = i(t[s], t[s + 1])
    if (e) {
      const l = Array.isArray(e) ? e[s] || W : e
      a = ot(l, a)
    }
    r.push(a)
  }
  return r
}
function od(t, e, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = t.length
  if (
    (mt(o === e.length, "Both input and output ranges must be the same length"),
    o === 1)
  )
    return () => e[0]
  if (o === 2 && t[0] === t[1]) return () => e[1]
  t[0] > t[o - 1] && ((t = [...t].reverse()), (e = [...e].reverse()))
  const s = sd(e, r, i),
    a = s.length,
    l = (c) => {
      let u = 0
      if (a > 1) for (; u < t.length - 2 && !(c < t[u + 1]); u++);
      const d = ae(t[u], t[u + 1], c)
      return s[u](d)
    }
  return n ? (c) => l(gt(t[0], t[o - 1], c)) : l
}
function ad(t, e) {
  const n = t[t.length - 1]
  for (let r = 1; r <= e; r++) {
    const i = ae(0, e, r)
    t.push(O(n, 1, i))
  }
}
function ld(t) {
  const e = [0]
  return ad(e, t.length - 1), e
}
function cd(t, e) {
  return t.map((n) => n * e)
}
function ud(t, e) {
  return t.map(() => e || jo).splice(0, t.length - 1)
}
function _e({
  duration: t = 300,
  keyframes: e,
  times: n,
  ease: r = "easeInOut",
}) {
  const i = Gu(r) ? r.map(mi) : mi(r),
    o = {
      done: !1,
      value: e[0],
    },
    s = cd(
      // Only use the provided offsets if they're the correct length
      // TODO Maybe we should warn here if there's a length mismatch
      n && n.length === e.length ? n : ld(e),
      t,
    ),
    a = od(s, e, {
      ease: Array.isArray(i) ? i : ud(e, i),
    })
  return {
    calculatedDuration: t,
    next: (l) => ((o.value = a(l)), (o.done = l >= t), o),
  }
}
const vi = 2e4
function dd(t) {
  let e = 0
  const n = 50
  let r = t.next(e)
  for (; !r.done && e < vi; ) (e += n), (r = t.next(e))
  return e >= vi ? 1 / 0 : e
}
const fd = (t) => {
    const e = ({ timestamp: n }) => t(n)
    return {
      start: () => k.update(e, !0),
      stop: () => ut(e),
      /**
       * If we're processing this frame we can use the
       * framelocked timestamp to keep things in sync.
       */
      now: () => (N.isProcessing ? N.timestamp : pt.now()),
    }
  },
  hd = {
    decay: hi,
    inertia: hi,
    tween: _e,
    keyframes: _e,
    spring: Mo,
  },
  pd = (t) => t / 100
class fr extends _o {
  constructor({ KeyframeResolver: e = or, ...n }) {
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
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
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
      a = hd[n] || _e
    let l, c
    a !== _e &&
      typeof e[0] != "number" &&
      (process.env.NODE_ENV !== "production" &&
        mt(
          e.length === 2,
          `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${e}`,
        ),
      (l = ot(pd, Wo(e[0], e[1]))),
      (e = [0, 100]))
    const u = a({ ...this.options, keyframes: e })
    o === "mirror" &&
      (c = a({
        ...this.options,
        keyframes: [...e].reverse(),
        velocity: -s,
      })),
      u.calculatedDuration === null && (u.calculatedDuration = dd(u))
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
      const { keyframes: V } = this.options
      return { done: !0, value: V[V.length - 1] }
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
      repeatDelay: y,
      onUpdate: T,
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
    const x = this.currentTime - h * (this.speed >= 0 ? 1 : -1),
      v = this.speed >= 0 ? x < 0 : x > u
    ;(this.currentTime = Math.max(x, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = u)
    let P = this.currentTime,
      C = o
    if (p) {
      const V = Math.min(this.currentTime, u) / d
      let $ = Math.floor(V),
        G = V % 1
      !G && V >= 1 && (G = 1),
        G === 1 && $--,
        ($ = Math.min($, p + 1)),
        !!($ % 2) &&
          (m === "reverse"
            ? ((G = 1 - G), y && (G -= y / d))
            : m === "mirror" && (C = s)),
        (P = gt(0, 1, G) * d)
    }
    const R = v ? { done: !1, value: l[0] } : C.next(P)
    a && (R.value = a(R.value))
    let { done: B } = R
    !v &&
      c !== null &&
      (B = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0)
    const et =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && B))
    return (
      et && i !== void 0 && (R.value = Ue(l, this.options, i)),
      T && T(R.value),
      et && this.finish(),
      R
    )
  }
  get duration() {
    const { resolved: e } = this
    return e ? lt(e.calculatedDuration) : 0
  }
  get time() {
    return lt(this.currentTime)
  }
  set time(e) {
    ;(e = at(e)),
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
    ;(this.playbackSpeed = e), n && (this.time = lt(this.currentTime))
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running"
      return
    }
    if (this.isStopped) return
    const { driver: e = fd, onPlay: n } = this.options
    this.driver || (this.driver = e((i) => this.tick(i))), n && n()
    const r = this.driver.now()
    this.holdTime !== null
      ? (this.startTime = r - this.holdTime)
      : (!this.startTime || this.state === "finished") && (this.startTime = r),
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
      (this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0)
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
const Ko = (t) => Array.isArray(t) && typeof t[0] == "number"
function Uo(t) {
  return !!(
    !t ||
    (typeof t == "string" && t in hr) ||
    Ko(t) ||
    (Array.isArray(t) && t.every(Uo))
  )
}
const Zt = ([t, e, n, r]) => `cubic-bezier(${t}, ${e}, ${n}, ${r})`,
  hr = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Zt([0, 0.65, 0.55, 1]),
    circOut: Zt([0.55, 0, 1, 0.45]),
    backIn: Zt([0.31, 0.01, 0.66, -0.59]),
    backOut: Zt([0.33, 1.53, 0.69, 0.99]),
  }
function md(t) {
  return $o(t) || hr.easeOut
}
function $o(t) {
  if (t) return Ko(t) ? Zt(t) : Array.isArray(t) ? t.map(md) : hr[t]
}
function gd(
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
  const u = $o(a)
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
const yd = Eo(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  De = 10,
  vd = 2e4
function bd(t) {
  return t.type === "spring" || !Uo(t.ease)
}
function xd(t, e) {
  const n = new fr({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  })
  let r = { done: !1, value: t[0] }
  const i = []
  let o = 0
  for (; !r.done && o < vd; ) (r = n.sample(o)), i.push(r.value), (o += De)
  return {
    times: void 0,
    keyframes: i,
    duration: o - De,
    ease: "linear",
  }
}
class bi extends _o {
  constructor(e) {
    super(e)
    const { name: n, motionValue: r, keyframes: i } = this.options
    ;(this.resolver = new Vo(
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
    if (bd(this.options)) {
      const { onComplete: d, onUpdate: h, motionValue: p, ...m } = this.options,
        y = xd(e, m)
      ;(e = y.keyframes),
        e.length === 1 && (e[1] = e[0]),
        (i = y.duration),
        (o = y.times),
        (s = y.ease),
        (a = "keyframes")
    }
    const u = gd(l.owner.current, c, e, {
      ...this.options,
      duration: i,
      times: o,
      ease: s,
    })
    return (
      (u.startTime = pt.now()),
      this.pendingTimeline
        ? ((u.timeline = this.pendingTimeline), (this.pendingTimeline = void 0))
        : (u.onfinish = () => {
            const { onComplete: d } = this.options
            l.set(Ue(e, this.options, n)),
              d && d(),
              this.cancel(),
              this.resolveFinishedPromise()
          }),
      {
        animation: u,
        duration: i,
        times: o,
        type: a,
        ease: s,
        keyframes: e,
      }
    )
  }
  get duration() {
    const { resolved: e } = this
    if (!e) return 0
    const { duration: n } = e
    return lt(n)
  }
  get time() {
    const { resolved: e } = this
    if (!e) return 0
    const { animation: n } = e
    return lt(n.currentTime || 0)
  }
  set time(e) {
    const { resolved: n } = this
    if (!n) return
    const { animation: r } = n
    r.currentTime = at(e)
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
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(e) {
    if (!this._resolved) this.pendingTimeline = e
    else {
      const { resolved: n } = this
      if (!n) return W
      const { animation: r } = n
      ;(r.timeline = e), (r.onfinish = null)
    }
    return W
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
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
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
      const { motionValue: c, onUpdate: u, onComplete: d, ...h } = this.options,
        p = new fr({
          ...h,
          keyframes: r,
          duration: i,
          type: o,
          ease: s,
          times: a,
          isGenerator: !0,
        }),
        m = at(this.time)
      c.setWithVelocity(p.sample(m - De).value, p.sample(m).value, De)
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
      yd() &&
      r &&
      so.has(r) &&
      n &&
      n.owner &&
      n.owner.current instanceof HTMLElement /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */ &&
      !n.owner.getProps().onUpdate &&
      !i &&
      o !== "mirror" &&
      s !== 0 &&
      a !== "inertia"
    )
  }
}
function Td(t, e) {
  let n
  const r = () => {
    const { currentTime: i } = e,
      s = (i === null ? 0 : i.value) / 100
    n !== s && t(s), (n = s)
  }
  return k.update(r, !0), () => ut(r)
}
const Pd = Eo(() => window.ScrollTimeline !== void 0)
class Sd {
  constructor(e) {
    ;(this.stop = () => this.runAll("stop")),
      (this.animations = e.filter(Boolean))
  }
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n)
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(e) {
    return this.animations[0][e]
  }
  setAll(e, n) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][e] = n
  }
  attachTimeline(e) {
    const n = this.animations.map((r) => {
      if (Pd() && r.attachTimeline) r.attachTimeline(e)
      else
        return (
          r.pause(),
          Td((i) => {
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
const pr =
  (t, e, n, r = {}, i, o, s) =>
  (a) => {
    const l = sr(r, t) || {},
      c = l.delay || r.delay || 0
    let { elapsed: u = 0 } = r
    u = u - at(c)
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
    ru(l) ||
      (d = {
        ...d,
        ...nu(t, d),
      }),
      d.duration && (d.duration = at(d.duration)),
      d.repeatDelay && (d.repeatDelay = at(d.repeatDelay)),
      d.from !== void 0 && (d.keyframes[0] = d.from)
    let h = !1
    if (
      ((d.type === !1 || (d.duration === 0 && !d.repeatDelay)) &&
        ((d.duration = 0), d.delay === 0 && (h = !0)),
      h && !o && e.get() !== void 0)
    ) {
      const p = Ue(d.keyframes, l)
      if (p !== void 0)
        return (
          k.update(() => {
            d.onUpdate(p), d.onComplete()
          }),
          new Sd([])
        )
    }
    return !o && bi.supports(d) ? new bi(d) : new fr(d)
  }
class mr {
  constructor() {
    this.subscriptions = []
  }
  add(e) {
    return Ie(this.subscriptions, e), () => Ne(this.subscriptions, e)
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
const xi = /* @__PURE__ */ new Set()
function gr(t, e, n) {
  t || xi.has(e) || (console.warn(e), xi.add(e))
}
const Ti = 30,
  wd = (t) => !isNaN(parseFloat(t))
class zo {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    ;(this.version = "11.3.19"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const o = pt.now()
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
      (this.updatedAt = pt.now()),
      this.canTrackVelocity === null &&
        e !== void 0 &&
        (this.canTrackVelocity = wd(this.current))
  }
  setPrevFrameValue(e = this.current) {
    ;(this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt)
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return (
      process.env.NODE_ENV !== "production" &&
        gr(
          !1,
          'value.onChange(callback) is deprecated. Switch to value.on("change", callback).',
        ),
      this.on("change", e)
    )
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new mr())
    const r = this.events[e].add(n)
    return e === "change"
      ? () => {
          r(),
            k.read(() => {
              this.events.change.getSize() || this.stop()
            })
        }
      : r
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear()
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(e, n) {
    ;(this.passiveEffect = e), (this.stopPassiveEffect = n)
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
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
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect()
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = pt.now()
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      e - this.updatedAt > Ti
    )
      return 0
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ti)
    return Do(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        ;(this.hasAnimated = !0),
          (this.animation = e(n)),
          this.events.animationStart && this.events.animationStart.notify()
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation()
      })
    )
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation()
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation
  }
  clearAnimation() {
    delete this.animation
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect()
  }
}
function le(t, e) {
  return new zo(t, e)
}
function Cd(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, le(n))
}
function Ad(t, e) {
  const n = Ke(t, e)
  let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {}
  o = { ...o, ...r }
  for (const s in o) {
    const a = kc(o[s])
    Cd(t, s, a)
  }
}
function Ho(t) {
  return t.getProps()[Ks]
}
class Rd extends zo {
  constructor() {
    super(...arguments),
      (this.output = []),
      (this.counts = /* @__PURE__ */ new Map())
  }
  add(e) {
    const n = oo(e)
    if (!n) return
    const r = this.counts.get(n) || 0
    this.counts.set(n, r + 1), r === 0 && (this.output.push(n), this.update())
    let i = !1
    return () => {
      if (i) return
      i = !0
      const o = this.counts.get(n) - 1
      this.counts.set(n, o), o === 0 && (Ne(this.output, n), this.update())
    }
  }
  update() {
    this.set(this.output.length ? this.output.join(", ") : "auto")
  }
}
function Vd(t) {
  return !!(U(t) && t.add)
}
function En(t, e) {
  var n
  if (!t.applyWillChange) return
  let r = t.getValue("willChange")
  if (
    (!r &&
      !(!((n = t.props.style) === null || n === void 0) && n.willChange) &&
      ((r = new Rd("auto")), t.addValue("willChange", r)),
    Vd(r))
  )
    return r.add(e)
}
function Ed({ protectedKeys: t, needsAnimating: e }, n) {
  const r = t.hasOwnProperty(n) && e[n] !== !0
  return (e[n] = !1), r
}
function Go(t, e, { delay: n = 0, transitionOverride: r, type: i } = {}) {
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
    if (p === void 0 || (u && Ed(u, d))) continue
    const m = {
      delay: n,
      elapsed: 0,
      ...sr(s || {}, d),
    }
    let y = !1
    if (window.HandoffAppearAnimations) {
      const x = Ho(t)
      if (x) {
        const v = window.HandoffAppearAnimations(x, d, h, k)
        v !== null && ((m.elapsed = v), (y = !0))
      }
    }
    h.start(
      pr(
        d,
        h,
        p,
        t.shouldReduceMotion && vt.has(d) ? { type: !1 } : m,
        t,
        y,
        En(t, d),
      ),
    )
    const T = h.animation
    T && c.push(T)
  }
  return (
    a &&
      Promise.all(c).then(() => {
        k.update(() => {
          a && Ad(t, a)
        })
      }),
    c
  )
}
function _n(t, e, n = {}) {
  var r
  const i = Ke(
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
  const s = i ? () => Promise.all(Go(t, i, n)) : () => Promise.resolve(),
    a =
      t.variantChildren && t.variantChildren.size
        ? (c = 0) => {
            const {
              delayChildren: u = 0,
              staggerChildren: d,
              staggerDirection: h,
            } = o
            return _d(t, e, u + c, d, h, n)
          }
        : () => Promise.resolve(),
    { when: l } = o
  if (l) {
    const [c, u] = l === "beforeChildren" ? [s, a] : [a, s]
    return c().then(() => u())
  } else return Promise.all([s(), a(n.delay)])
}
function _d(t, e, n = 0, r = 0, i = 1, o) {
  const s = [],
    a = (t.variantChildren.size - 1) * r,
    l = i === 1 ? (c = 0) => c * r : (c = 0) => a - c * r
  return (
    Array.from(t.variantChildren)
      .sort(Dd)
      .forEach((c, u) => {
        c.notify("AnimationStart", e),
          s.push(
            _n(c, e, {
              ...o,
              delay: n + l(u),
            }).then(() => c.notify("AnimationComplete", e)),
          )
      }),
    Promise.all(s)
  )
}
function Dd(t, e) {
  return t.sortNodePosition(e)
}
function kd(t, e, n = {}) {
  t.notify("AnimationStart", e)
  let r
  if (Array.isArray(e)) {
    const i = e.map((o) => _n(t, o, n))
    r = Promise.all(i)
  } else if (typeof e == "string") r = _n(t, e, n)
  else {
    const i = typeof e == "function" ? Ke(t, e, n.custom) : e
    r = Promise.all(Go(t, i, n))
  }
  return r.then(() => {
    t.notify("AnimationComplete", e)
  })
}
const Md = [...Yn].reverse(),
  Od = Yn.length
function jd(t) {
  return (e) =>
    Promise.all(e.map(({ animation: n, options: r }) => kd(t, n, r)))
}
function Ld(t) {
  let e = jd(t),
    n = Pi(),
    r = !0
  const i = (l) => (c, u) => {
    var d
    const h = Ke(
      t,
      u,
      l === "exit"
        ? (d = t.presenceContext) === null || d === void 0
          ? void 0
          : d.custom
        : void 0,
    )
    if (h) {
      const { transition: p, transitionEnd: m, ...y } = h
      c = { ...c, ...y, ...m }
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
      h = /* @__PURE__ */ new Set()
    let p = {},
      m = 1 / 0
    for (let T = 0; T < Od; T++) {
      const x = Md[T],
        v = n[x],
        P = c[x] !== void 0 ? c[x] : u[x],
        C = ie(P),
        R = x === l ? v.isActive : null
      R === !1 && (m = T)
      let B = P === u[x] && P !== c[x] && C
      if (
        (B && r && t.manuallyAnimateOnMount && (B = !1),
        (v.protectedKeys = { ...p }), // If it isn't active and hasn't *just* been set as inactive
        (!v.isActive && R === null) || // If we didn't and don't have any defined prop for this animation type
          (!P && !v.prevProp) || // Or if the prop doesn't define an animation
          se(P) ||
          typeof P == "boolean")
      )
        continue
      let V =
          Fd(v.prevProp, P) || // If we're making this variant active, we want to always make it active
          (x === l && v.isActive && !B && C) || // If we removed a higher-priority variant (i is in reverse order)
          (T > m && C),
        $ = !1
      const G = Array.isArray(P) ? P : [P]
      let ft = G.reduce(i(x), {})
      R === !1 && (ft = {})
      const { prevResolvedValues: zt = {} } = v,
        q = {
          ...zt,
          ...ft,
        },
        nt = (j) => {
          ;(V = !0),
            h.has(j) && (($ = !0), h.delete(j)),
            (v.needsAnimating[j] = !0)
          const Z = t.getValue(j)
          Z && (Z.liveStyle = !1)
        }
      for (const j in q) {
        const Z = ft[j],
          _t = zt[j]
        if (p.hasOwnProperty(j)) continue
        let Dt = !1
        Tn(Z) && Tn(_t) ? (Dt = !po(Z, _t)) : (Dt = Z !== _t),
          Dt
            ? Z != null
              ? nt(j)
              : h.add(j)
            : Z !== void 0 && h.has(j)
              ? nt(j)
              : (v.protectedKeys[j] = !0)
      }
      ;(v.prevProp = P),
        (v.prevResolvedValues = ft),
        v.isActive && (p = { ...p, ...ft }),
        r && t.blockInitialAnimation && (V = !1),
        V &&
          (!B || $) &&
          d.push(
            ...G.map((j) => ({
              animation: j,
              options: { type: x },
            })),
          )
    }
    if (h.size) {
      const T = {}
      h.forEach((x) => {
        const v = t.getBaseTarget(x),
          P = t.getValue(x)
        P && (P.liveStyle = !0), (T[x] = v ?? null)
      }),
        d.push({ animation: T })
    }
    let y = !!d.length
    return (
      r &&
        (c.initial === !1 || c.initial === c.animate) &&
        !t.manuallyAnimateOnMount &&
        (y = !1),
      (r = !1),
      y ? e(d) : Promise.resolve()
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
      ;(n = Pi()), (r = !0)
    },
  }
}
function Fd(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !po(e, t) : !1
}
function Tt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  }
}
function Pi() {
  return {
    animate: Tt(!0),
    whileInView: Tt(),
    whileHover: Tt(),
    whileTap: Tt(),
    whileDrag: Tt(),
    whileFocus: Tt(),
    exit: Tt(),
  }
}
class Bd extends bt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Ld(e))
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps()
    se(e) && (this.unmountControls = e.subscribe(this.node))
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
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
let Id = 0
class Nd extends bt {
  constructor() {
    super(...arguments), (this.id = Id++)
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
const Wd = {
    animation: {
      Feature: Bd,
    },
    exit: {
      Feature: Nd,
    },
  },
  Si = (t, e) => Math.abs(t - e)
function Kd(t, e) {
  const n = Si(t.x, e.x),
    r = Si(t.y, e.y)
  return Math.sqrt(n ** 2 + r ** 2)
}
class Yo {
  constructor(
    e,
    n,
    { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: o = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        const d = hn(this.lastMoveEventInfo, this.history),
          h = this.startEvent !== null,
          p = Kd(d.offset, { x: 0, y: 0 }) >= 3
        if (!h && !p) return
        const { point: m } = d,
          { timestamp: y } = N
        this.history.push({ ...m, timestamp: y })
        const { onStart: T, onMove: x } = this.handlers
        h ||
          (T && T(this.lastMoveEvent, d),
          (this.startEvent = this.lastMoveEvent)),
          x && x(this.lastMoveEvent, d)
      }),
      (this.handlePointerMove = (d, h) => {
        ;(this.lastMoveEvent = d),
          (this.lastMoveEventInfo = fn(h, this.transformPagePoint)),
          k.update(this.updatePoint, !0)
      }),
      (this.handlePointerUp = (d, h) => {
        this.end()
        const { onEnd: p, onSessionEnd: m, resumeAnimation: y } = this.handlers
        if (
          (this.dragSnapToOrigin && y && y(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return
        const T = hn(
          d.type === "pointercancel"
            ? this.lastMoveEventInfo
            : fn(h, this.transformPagePoint),
          this.history,
        )
        this.startEvent && p && p(d, T), m && m(d, T)
      }),
      !lo(e))
    )
      return
    ;(this.dragSnapToOrigin = o),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.contextWindow = i || window)
    const s = We(e),
      a = fn(s, this.transformPagePoint),
      { point: l } = a,
      { timestamp: c } = N
    this.history = [{ ...l, timestamp: c }]
    const { onSessionStart: u } = n
    u && u(e, hn(a, this.history)),
      (this.removeListeners = ot(
        st(this.contextWindow, "pointermove", this.handlePointerMove),
        st(this.contextWindow, "pointerup", this.handlePointerUp),
        st(this.contextWindow, "pointercancel", this.handlePointerUp),
      ))
  }
  updateHandlers(e) {
    this.handlers = e
  }
  end() {
    this.removeListeners && this.removeListeners(), ut(this.updatePoint)
  }
}
function fn(t, e) {
  return e ? { point: e(t.point) } : t
}
function wi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y }
}
function hn({ point: t }, e) {
  return {
    point: t,
    delta: wi(t, Xo(e)),
    offset: wi(t, Ud(e)),
    velocity: $d(e, 0.1),
  }
}
function Ud(t) {
  return t[0]
}
function Xo(t) {
  return t[t.length - 1]
}
function $d(t, e) {
  if (t.length < 2) return { x: 0, y: 0 }
  let n = t.length - 1,
    r = null
  const i = Xo(t)
  for (; n >= 0 && ((r = t[n]), !(i.timestamp - r.timestamp > at(e))); ) n--
  if (!r) return { x: 0, y: 0 }
  const o = lt(i.timestamp - r.timestamp)
  if (o === 0) return { x: 0, y: 0 }
  const s = {
    x: (i.x - r.x) / o,
    y: (i.y - r.y) / o,
  }
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s
}
const qo = 1e-4,
  zd = 1 - qo,
  Hd = 1 + qo,
  Zo = 0.01,
  Gd = 0 - Zo,
  Yd = 0 + Zo
function X(t) {
  return t.max - t.min
}
function Xd(t, e, n) {
  return Math.abs(t - e) <= n
}
function Ci(t, e, n, r = 0.5) {
  ;(t.origin = r),
    (t.originPoint = O(e.min, e.max, t.origin)),
    (t.scale = X(n) / X(e)),
    (t.translate = O(n.min, n.max, t.origin) - t.originPoint),
    ((t.scale >= zd && t.scale <= Hd) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= Gd && t.translate <= Yd) || isNaN(t.translate)) &&
      (t.translate = 0)
}
function ne(t, e, n, r) {
  Ci(t.x, e.x, n.x, r ? r.originX : void 0),
    Ci(t.y, e.y, n.y, r ? r.originY : void 0)
}
function Ai(t, e, n) {
  ;(t.min = n.min + e.min), (t.max = t.min + X(e))
}
function qd(t, e, n) {
  Ai(t.x, e.x, n.x), Ai(t.y, e.y, n.y)
}
function Ri(t, e, n) {
  ;(t.min = e.min - n.min), (t.max = t.min + X(e))
}
function re(t, e, n) {
  Ri(t.x, e.x, n.x), Ri(t.y, e.y, n.y)
}
function Zd(t, { min: e, max: n }, r) {
  return (
    e !== void 0 && t < e
      ? (t = r ? O(e, t, r.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = r ? O(n, t, r.max) : Math.min(t, n)),
    t
  )
}
function Vi(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  }
}
function Jd(t, { top: e, left: n, bottom: r, right: i }) {
  return {
    x: Vi(t.x, n, i),
    y: Vi(t.y, e, r),
  }
}
function Ei(t, e) {
  let n = e.min - t.min,
    r = e.max - t.max
  return e.max - e.min < t.max - t.min && ([n, r] = [r, n]), { min: n, max: r }
}
function Qd(t, e) {
  return {
    x: Ei(t.x, e.x),
    y: Ei(t.y, e.y),
  }
}
function tf(t, e) {
  let n = 0.5
  const r = X(t),
    i = X(e)
  return (
    i > r
      ? (n = ae(e.min, e.max - r, t.min))
      : r > i && (n = ae(t.min, t.max - i, e.min)),
    gt(0, 1, n)
  )
}
function ef(t, e) {
  const n = {}
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  )
}
const Dn = 0.35
function nf(t = Dn) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = Dn),
    {
      x: _i(t, "left", "right"),
      y: _i(t, "top", "bottom"),
    }
  )
}
function _i(t, e, n) {
  return {
    min: Di(t, e),
    max: Di(t, n),
  }
}
function Di(t, e) {
  return typeof t == "number" ? t : t[e] || 0
}
const ki = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
  }),
  Lt = () => ({
    x: ki(),
    y: ki(),
  }),
  Mi = () => ({ min: 0, max: 0 }),
  F = () => ({
    x: Mi(),
    y: Mi(),
  })
function tt(t) {
  return [t("x"), t("y")]
}
function Jo({ top: t, left: e, right: n, bottom: r }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: r },
  }
}
function rf({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min }
}
function sf(t, e) {
  if (!e) return t
  const n = e({ x: t.left, y: t.top }),
    r = e({ x: t.right, y: t.bottom })
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x,
  }
}
function pn(t) {
  return t === void 0 || t === 1
}
function kn({ scale: t, scaleX: e, scaleY: n }) {
  return !pn(t) || !pn(e) || !pn(n)
}
function Pt(t) {
  return (
    kn(t) ||
    Qo(t) ||
    t.z ||
    t.rotate ||
    t.rotateX ||
    t.rotateY ||
    t.skewX ||
    t.skewY
  )
}
function Qo(t) {
  return Oi(t.x) || Oi(t.y)
}
function Oi(t) {
  return t && t !== "0%"
}
function ke(t, e, n) {
  const r = t - n,
    i = e * r
  return n + i
}
function ji(t, e, n, r, i) {
  return i !== void 0 && (t = ke(t, i, r)), ke(t, n, r) + e
}
function Mn(t, e = 0, n = 1, r, i) {
  ;(t.min = ji(t.min, e, n, r, i)), (t.max = ji(t.max, e, n, r, i))
}
function ta(t, { x: e, y: n }) {
  Mn(t.x, e.translate, e.scale, e.originPoint),
    Mn(t.y, n.translate, n.scale, n.originPoint)
}
const Li = 0.999999999999,
  Fi = 1.0000000000001
function of(t, e, n, r = !1) {
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
        Bt(t, {
          x: -o.scroll.offset.x,
          y: -o.scroll.offset.y,
        }),
      s && ((e.x *= s.x.scale), (e.y *= s.y.scale), ta(t, s)),
      r && Pt(o.latestValues) && Bt(t, o.latestValues))
  }
  e.x < Fi && e.x > Li && (e.x = 1), e.y < Fi && e.y > Li && (e.y = 1)
}
function Ft(t, e) {
  ;(t.min = t.min + e), (t.max = t.max + e)
}
function Bi(t, e, n, r, i = 0.5) {
  const o = O(t.min, t.max, i)
  Mn(t, e, n, o, r)
}
function Bt(t, e) {
  Bi(t.x, e.x, e.scaleX, e.scale, e.originX),
    Bi(t.y, e.y, e.scaleY, e.scale, e.originY)
}
function ea(t, e) {
  return Jo(sf(t.getBoundingClientRect(), e))
}
function af(t, e, n) {
  const r = ea(t, n),
    { scroll: i } = e
  return i && (Ft(r.x, i.offset.x), Ft(r.y, i.offset.y)), r
}
const na = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  lf = /* @__PURE__ */ new WeakMap()
class cf {
  constructor(e) {
    ;(this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = F()),
      (this.visualElement = e)
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement
    if (r && r.isPresent === !1) return
    const i = (u) => {
        const { dragSnapToOrigin: d } = this.getProps()
        d ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(We(u, "page").point)
      },
      o = (u, d) => {
        var h
        const { drag: p, dragPropagation: m, onDragStart: y } = this.getProps()
        if (
          p &&
          !m &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = uo(p)),
          !this.openGlobalLock)
        )
          return
        ;(this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          tt((x) => {
            let v = this.getAxisMotionValue(x).get() || 0
            if (rt.test(v)) {
              const { projection: P } = this.visualElement
              if (P && P.layout) {
                const C = P.layout.layoutBox[x]
                C && (v = X(C) * (parseFloat(v) / 100))
              }
            }
            this.originPoint[x] = v
          }),
          y && k.postRender(() => y(u, d)),
          (h = this.removeWillChange) === null || h === void 0 || h.call(this),
          (this.removeWillChange = En(this.visualElement, "transform"))
        const { animationState: T } = this.visualElement
        T && T.setActive("whileDrag", !0)
      },
      s = (u, d) => {
        const {
          dragPropagation: h,
          dragDirectionLock: p,
          onDirectionLock: m,
          onDrag: y,
        } = this.getProps()
        if (!h && !this.openGlobalLock) return
        const { offset: T } = d
        if (p && this.currentDirection === null) {
          ;(this.currentDirection = uf(T)),
            this.currentDirection !== null && m && m(this.currentDirection)
          return
        }
        this.updateAxis("x", d.point, T),
          this.updateAxis("y", d.point, T),
          this.visualElement.render(),
          y && y(u, d)
      },
      a = (u, d) => this.stop(u, d),
      l = () =>
        tt((u) => {
          var d
          return (
            this.getAnimationState(u) === "paused" &&
            ((d = this.getAxisMotionValue(u).animation) === null || d === void 0
              ? void 0
              : d.play())
          )
        }),
      { dragSnapToOrigin: c } = this.getProps()
    this.panSession = new Yo(
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
        contextWindow: na(this.visualElement),
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
    s && k.postRender(() => s(e, n))
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
    if (!r || !Pe(e, i, this.currentDirection)) return
    const o = this.getAxisMotionValue(e)
    let s = this.originPoint[e] + r[e]
    this.constraints &&
      this.constraints[e] &&
      (s = Zd(s, this.constraints[e], this.elastic[e])),
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
    n && Ot(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = Jd(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = nf(r)),
      o !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        tt((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = ef(i.layoutBox[s], this.constraints[s]))
        })
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps()
    if (!e || !Ot(e)) return !1
    const r = e.current
    mt(
      r !== null,
      "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
    )
    const { projection: i } = this.visualElement
    if (!i || !i.layout) return !1
    const o = af(r, i.root, this.visualElement.getTransformPagePoint())
    let s = Qd(i.layout.layoutBox, o)
    if (n) {
      const a = n(rf(s))
      ;(this.hasMutatedConstraints = !!a), a && (s = Jo(a))
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
      c = tt((u) => {
        if (!Pe(u, n, this.currentDirection)) return
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
      pr(e, r, 0, n, this.visualElement, !1, En(this.visualElement, e)),
    )
  }
  stopAnimation() {
    tt((e) => this.getAxisMotionValue(e).stop())
  }
  pauseAnimation() {
    tt((e) => {
      var n
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
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
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
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
    tt((n) => {
      const { drag: r } = this.getProps()
      if (!Pe(n, r, this.currentDirection)) return
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n)
      if (i && i.layout) {
        const { min: s, max: a } = i.layout.layoutBox[n]
        o.set(e[n] - O(s, a, 0.5))
      }
    })
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    const { drag: e, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement
    if (!Ot(n) || !r || !this.constraints) return
    this.stopAnimation()
    const i = { x: 0, y: 0 }
    tt((s) => {
      const a = this.getAxisMotionValue(s)
      if (a && this.constraints !== !1) {
        const l = a.get()
        i[s] = tf({ min: l, max: l }, this.constraints[s])
      }
    })
    const { transformTemplate: o } = this.visualElement.getProps()
    ;(this.visualElement.current.style.transform = o ? o({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      tt((s) => {
        if (!Pe(s, e, null)) return
        const a = this.getAxisMotionValue(s),
          { min: l, max: c } = this.constraints[s]
        a.set(O(l, c, i[s]))
      })
  }
  addListeners() {
    if (!this.visualElement.current) return
    lf.set(this.visualElement, this)
    const e = this.visualElement.current,
      n = st(e, "pointerdown", (l) => {
        const { drag: c, dragListener: u = !0 } = this.getProps()
        c && u && this.start(l)
      }),
      r = () => {
        const { dragConstraints: l } = this.getProps()
        Ot(l) && l.current && (this.constraints = this.resolveRefConstraints())
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener("measure", r)
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      k.read(r)
    const s = it(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: c }) => {
          this.isDragging &&
            c &&
            (tt((u) => {
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
        dragElastic: s = Dn,
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
function Pe(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t)
}
function uf(t, e = 10) {
  let n = null
  return Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n
}
class df extends bt {
  constructor(e) {
    super(e),
      (this.removeGroupControls = W),
      (this.removeListeners = W),
      (this.controls = new cf(e))
  }
  mount() {
    const { dragControls: e } = this.node.getProps()
    e && (this.removeGroupControls = e.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || W)
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners()
  }
}
const Ii = (t) => (e, n) => {
  t && k.postRender(() => t(e, n))
}
class ff extends bt {
  constructor() {
    super(...arguments), (this.removePointerDownListener = W)
  }
  onPointerDown(e) {
    this.session = new Yo(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: na(this.node),
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
      onSessionStart: Ii(e),
      onStart: Ii(n),
      onMove: r,
      onEnd: (o, s) => {
        delete this.session, i && k.postRender(() => i(o, s))
      },
    }
  }
  mount() {
    this.removePointerDownListener = st(this.node.current, "pointerdown", (e) =>
      this.onPointerDown(e),
    )
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers())
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end()
  }
}
function hf() {
  const t = H(zn)
  if (t === null) return [!0, null]
  const { isPresent: e, onExitComplete: n, register: r } = t,
    i = ds()
  Wt(() => r(i), [])
  const o = At(() => n && n(i), [i, n])
  return !e && n ? [!1, o] : [!0]
}
const Ce = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1,
}
function Ni(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100
}
const qt = {
    correct: (t, e) => {
      if (!e.target) return t
      if (typeof t == "string")
        if (S.test(t)) t = parseFloat(t)
        else return t
      const n = Ni(t, e.target.x),
        r = Ni(t, e.target.y)
      return `${n}% ${r}%`
    },
  },
  pf = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const r = t,
        i = yt.parse(t)
      if (i.length > 5) return r
      const o = yt.createTransformer(t),
        s = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * e.x,
        l = n.y.scale * e.y
      ;(i[0 + s] /= a), (i[1 + s] /= l)
      const c = O(a, l, 0.5)
      return (
        typeof i[2 + s] == "number" && (i[2 + s] /= c),
        typeof i[3 + s] == "number" && (i[3 + s] /= c),
        o(i)
      )
    },
  }
class mf extends za {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: o } = e
    oc(gf),
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
      (Ce.hasEverUpdated = !0)
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
              k.postRender(() => {
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
      Gn.postRender(() => {
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
function ra(t) {
  const [e, n] = hf(),
    r = H(Gs)
  return _.jsx(mf, {
    ...t,
    layoutGroup: r,
    switchLayoutGroup: H($s),
    isPresent: e,
    safeToRemove: n,
  })
}
const gf = {
    borderRadius: {
      ...qt,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: qt,
    borderTopRightRadius: qt,
    borderBottomLeftRadius: qt,
    borderBottomRightRadius: qt,
    boxShadow: pf,
  },
  ia = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  yf = ia.length,
  Wi = (t) => (typeof t == "string" ? parseFloat(t) : t),
  Ki = (t) => typeof t == "number" || S.test(t)
function vf(t, e, n, r, i, o) {
  i
    ? ((t.opacity = O(
        0,
        // TODO Reinstate this if only child
        n.opacity !== void 0 ? n.opacity : 1,
        bf(r),
      )),
      (t.opacityExit = O(e.opacity !== void 0 ? e.opacity : 1, 0, xf(r))))
    : o &&
      (t.opacity = O(
        e.opacity !== void 0 ? e.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r,
      ))
  for (let s = 0; s < yf; s++) {
    const a = `border${ia[s]}Radius`
    let l = Ui(e, a),
      c = Ui(n, a)
    if (l === void 0 && c === void 0) continue
    l || (l = 0),
      c || (c = 0),
      l === 0 || c === 0 || Ki(l) === Ki(c)
        ? ((t[a] = Math.max(O(Wi(l), Wi(c), r), 0)),
          (rt.test(c) || rt.test(l)) && (t[a] += "%"))
        : (t[a] = c)
  }
  ;(e.rotate || n.rotate) && (t.rotate = O(e.rotate || 0, n.rotate || 0, r))
}
function Ui(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius
}
const bf = sa(0, 0.5, Bo),
  xf = sa(0.5, 0.95, W)
function sa(t, e, n) {
  return (r) => (r < t ? 0 : r > e ? 1 : n(ae(t, e, r)))
}
function $i(t, e) {
  ;(t.min = e.min), (t.max = e.max)
}
function Q(t, e) {
  $i(t.x, e.x), $i(t.y, e.y)
}
function zi(t, e) {
  ;(t.translate = e.translate),
    (t.scale = e.scale),
    (t.originPoint = e.originPoint),
    (t.origin = e.origin)
}
function Hi(t, e, n, r, i) {
  return (
    (t -= e), (t = ke(t, 1 / n, r)), i !== void 0 && (t = ke(t, 1 / i, r)), t
  )
}
function Tf(t, e = 0, n = 1, r = 0.5, i, o = t, s = t) {
  if (
    (rt.test(e) &&
      ((e = parseFloat(e)), (e = O(s.min, s.max, e / 100) - s.min)),
    typeof e != "number")
  )
    return
  let a = O(o.min, o.max, r)
  t === o && (a -= e),
    (t.min = Hi(t.min, e, n, a, i)),
    (t.max = Hi(t.max, e, n, a, i))
}
function Gi(t, e, [n, r, i], o, s) {
  Tf(t, e[n], e[r], e[i], e.scale, o, s)
}
const Pf = ["x", "scaleX", "originX"],
  Sf = ["y", "scaleY", "originY"]
function Yi(t, e, n, r) {
  Gi(t.x, e, Pf, n ? n.x : void 0, r ? r.x : void 0),
    Gi(t.y, e, Sf, n ? n.y : void 0, r ? r.y : void 0)
}
function Xi(t) {
  return t.translate === 0 && t.scale === 1
}
function oa(t) {
  return Xi(t.x) && Xi(t.y)
}
function qi(t, e) {
  return t.min === e.min && t.max === e.max
}
function wf(t, e) {
  return qi(t.x, e.x) && qi(t.y, e.y)
}
function Zi(t, e) {
  return (
    Math.round(t.min) === Math.round(e.min) &&
    Math.round(t.max) === Math.round(e.max)
  )
}
function aa(t, e) {
  return Zi(t.x, e.x) && Zi(t.y, e.y)
}
function Ji(t) {
  return X(t.x) / X(t.y)
}
function Qi(t, e) {
  return (
    t.translate === e.translate &&
    t.scale === e.scale &&
    t.originPoint === e.originPoint
  )
}
class Cf {
  constructor() {
    this.members = []
  }
  add(e) {
    Ie(this.members, e), e.scheduleRender()
  }
  remove(e) {
    if (
      (Ne(this.members, e),
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
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
  }
}
function Af(t, e, n) {
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
const Rf = (t, e) => t.depth - e.depth
class Vf {
  constructor() {
    ;(this.children = []), (this.isDirty = !1)
  }
  add(e) {
    Ie(this.children, e), (this.isDirty = !0)
  }
  remove(e) {
    Ne(this.children, e), (this.isDirty = !0)
  }
  forEach(e) {
    this.isDirty && this.children.sort(Rf),
      (this.isDirty = !1),
      this.children.forEach(e)
  }
}
function Ef(t, e) {
  const n = pt.now(),
    r = ({ timestamp: i }) => {
      const o = i - n
      o >= e && (ut(r), t(o - e))
    }
  return k.read(r, !0), () => ut(r)
}
function _f(t) {
  return t instanceof SVGElement && t.tagName !== "svg"
}
function Df(t, e, n) {
  const r = U(t) ? t : le(t)
  return r.start(pr("", r, e, n)), r.animation
}
const St = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Jt = typeof window < "u" && window.MotionDebug !== void 0,
  mn = ["", "X", "Y", "Z"],
  kf = { visibility: "hidden" },
  ts = 1e3
let Mf = 0
function gn(t, e, n, r) {
  const { latestValues: i } = e
  i[t] && ((n[t] = i[t]), e.setStaticValue(t, 0), r && (r[t] = 0))
}
function la(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return !1
  const { visualElement: e } = t.options
  return e
    ? Ho(e)
      ? !0
      : t.parent && !t.parent.hasCheckedOptimisedAppear
        ? la(t.parent)
        : !1
    : !1
}
function ca({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, a = e == null ? void 0 : e()) {
      ;(this.id = Mf++),
        (this.animationId = 0),
        (this.children = /* @__PURE__ */ new Set()),
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
        (this.eventHandlers = /* @__PURE__ */ new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots())
        }),
        (this.updateProjection = () => {
          ;(this.projectionUpdateScheduled = !1),
            Jt &&
              (St.totalNodes =
                St.resolvedTargetDeltas =
                St.recalculatedProjection =
                  0),
            this.nodes.forEach(Lf),
            this.nodes.forEach(Wf),
            this.nodes.forEach(Kf),
            this.nodes.forEach(Ff),
            Jt && window.MotionDebug.record(St)
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = /* @__PURE__ */ new Map()),
        (this.latestValues = s),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0)
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0
      this.root === this && (this.nodes = new Vf())
    }
    addEventListener(s, a) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new mr()),
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
    /**
     * Lifecycles
     */
    mount(s, a = this.root.hasTreeAnimated) {
      if (this.instance) return
      ;(this.isSVG = _f(s)), (this.instance = s)
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
            (d = Ef(h, 250)),
            Ce.hasAnimatedSinceResize &&
              ((Ce.hasAnimatedSinceResize = !1), this.nodes.forEach(ns))
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
              const y =
                  this.options.transition || u.getDefaultTransition() || Gf,
                { onLayoutAnimationStart: T, onLayoutAnimationComplete: x } =
                  u.getProps(),
                v = !this.targetLayout || !aa(this.targetLayout, m) || p,
                P = !h && p
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                P ||
                (h && (v || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, P)
                const C = {
                  ...sr(y, "layout"),
                  onPlay: T,
                  onComplete: x,
                }
                ;(u.shouldReduceMotion || this.options.layoutRoot) &&
                  ((C.delay = 0), (C.type = !1)),
                  this.startAnimation(C)
              } else
                h || ns(this),
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
        ut(this.updateProjection)
    }
    // only on the root
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
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Uf),
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
          la(this) &&
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
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(es)
        return
      }
      this.isUpdating || this.nodes.forEach(If),
        (this.isUpdating = !1),
        this.nodes.forEach(Nf),
        this.nodes.forEach(Of),
        this.nodes.forEach(jf),
        this.clearAllSnapshots()
      const a = pt.now()
      ;(N.delta = gt(0, 1e3 / 60, a - N.timestamp)),
        (N.timestamp = a),
        (N.isProcessing = !0),
        sn.update.process(N),
        sn.preRender.process(N),
        sn.render.process(N),
        (N.isProcessing = !1)
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Gn.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      this.nodes.forEach(Bf), this.sharedNodes.forEach($f)
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        k.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      k.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed()
      })
    }
    /**
     * Update measurements
     */
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
        (this.layoutCorrected = F()),
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
        a = this.projectionDelta && !oa(this.projectionDelta),
        l = this.getTransformTemplate(),
        c = l ? l(this.latestValues, "") : void 0,
        u = c !== this.prevTransformTemplateValue
      s &&
        (a || Pt(this.latestValues) || u) &&
        (i(this.instance, c),
        (this.shouldResetTransform = !1),
        this.scheduleRender())
    }
    measure(s = !0) {
      const a = this.measurePageBox()
      let l = this.removeElementScroll(a)
      return (
        s && (l = this.removeTransform(l)),
        Yf(l),
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
      if (!a) return F()
      const l = a.measureViewportBox()
      if (
        !(
          ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) ||
          this.path.some(Xf)
        )
      ) {
        const { scroll: u } = this.root
        u && (Ft(l.x, u.offset.x), Ft(l.y, u.offset.y))
      }
      return l
    }
    removeElementScroll(s) {
      var a
      const l = F()
      if ((Q(l, s), !((a = this.scroll) === null || a === void 0) && a.wasRoot))
        return l
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c],
          { scroll: d, options: h } = u
        u !== this.root &&
          d &&
          h.layoutScroll &&
          (d.wasRoot && Q(l, s), Ft(l.x, d.offset.x), Ft(l.y, d.offset.y))
      }
      return l
    }
    applyTransform(s, a = !1) {
      const l = F()
      Q(l, s)
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c]
        !a &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          Bt(l, {
            x: -u.scroll.offset.x,
            y: -u.scroll.offset.y,
          }),
          Pt(u.latestValues) && Bt(l, u.latestValues)
      }
      return Pt(this.latestValues) && Bt(l, this.latestValues), l
    }
    removeTransform(s) {
      const a = F()
      Q(a, s)
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l]
        if (!c.instance || !Pt(c.latestValues)) continue
        kn(c.latestValues) && c.updateSnapshot()
        const u = F(),
          d = c.measurePageBox()
        Q(u, d),
          Yi(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u)
      }
      return Pt(this.latestValues) && Yi(a, this.latestValues), a
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
        this.relativeParent.resolvedRelativeTargetAt !== N.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(s = !1) {
      var a
      const l = this.getLead()
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
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
          ((this.resolvedRelativeTargetAt = N.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const p = this.getClosestProjectingParent()
          p && p.layout && this.animationProgress !== 1
            ? ((this.relativeParent = p),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = F()),
              (this.relativeTargetOrigin = F()),
              re(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                p.layout.layoutBox,
              ),
              Q(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = F()), (this.targetWithTransforms = F())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                qd(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Q(this.target, this.layout.layoutBox),
                  ta(this.target, this.targetDelta))
                : Q(this.target, this.layout.layoutBox),
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
                (this.relativeTarget = F()),
                (this.relativeTargetOrigin = F()),
                re(this.relativeTargetOrigin, this.target, p.target),
                Q(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0)
          }
          Jt && St.resolvedTargetDeltas++
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          kn(this.parent.latestValues) ||
          Qo(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
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
        this.resolvedRelativeTargetAt === N.timestamp && (c = !1),
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
      Q(this.layoutCorrected, this.layout.layoutBox)
      const h = this.treeScale.x,
        p = this.treeScale.y
      of(this.layoutCorrected, this.treeScale, this.path, l),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((a.target = a.layout.layoutBox), (a.targetWithTransforms = F()))
      const { target: m } = a
      if (!m) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (zi(this.prevProjectionDelta.x, this.projectionDelta.x),
          zi(this.prevProjectionDelta.y, this.projectionDelta.y)),
        ne(this.projectionDelta, this.layoutCorrected, m, this.latestValues),
        (this.treeScale.x !== h ||
          this.treeScale.y !== p ||
          !Qi(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Qi(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", m)),
        Jt && St.recalculatedProjection++
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
      ;(this.prevProjectionDelta = Lt()),
        (this.projectionDelta = Lt()),
        (this.projectionDeltaWithTransform = Lt())
    }
    setAnimationOrigin(s, a = !1) {
      const l = this.snapshot,
        c = l ? l.latestValues : {},
        u = { ...this.latestValues },
        d = Lt()
      ;(!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a)
      const h = F(),
        p = l ? l.source : void 0,
        m = this.layout ? this.layout.source : void 0,
        y = p !== m,
        T = this.getStack(),
        x = !T || T.members.length <= 1,
        v = !!(y && !x && this.options.crossfade === !0 && !this.path.some(Hf))
      this.animationProgress = 0
      let P
      ;(this.mixTargetDelta = (C) => {
        const R = C / 1e3
        rs(d.x, s.x, R),
          rs(d.y, s.y, R),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (re(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            zf(this.relativeTarget, this.relativeTargetOrigin, h, R),
            P && wf(this.relativeTarget, P) && (this.isProjectionDirty = !1),
            P || (P = F()),
            Q(P, this.relativeTarget)),
          y &&
            ((this.animationValues = u), vf(u, c, this.latestValues, R, v, x)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = R)
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
          (ut(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = k.update(() => {
          ;(Ce.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Df(0, ts, {
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
        (this.mixTargetDelta && this.mixTargetDelta(ts),
        this.currentAnimation.stop()),
        this.completeAnimation()
    }
    applyTransformsToTarget() {
      const s = this.getLead()
      let { targetWithTransforms: a, target: l, layout: c, latestValues: u } = s
      if (!(!a || !l || !c)) {
        if (
          this !== s &&
          this.layout &&
          c &&
          ua(this.options.animationType, this.layout.layoutBox, c.layoutBox)
        ) {
          l = this.target || F()
          const d = X(this.layout.layoutBox.x)
          ;(l.x.min = s.target.x.min), (l.x.max = l.x.min + d)
          const h = X(this.layout.layoutBox.y)
          ;(l.y.min = s.target.y.min), (l.y.max = l.y.min + h)
        }
        Q(a, l),
          Bt(a, u),
          ne(this.projectionDeltaWithTransform, this.layoutCorrected, a, u)
      }
    }
    registerSharedNode(s, a) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new Cf()),
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
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
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
      l.z && gn("z", s, c, this.animationValues)
      for (let u = 0; u < mn.length; u++)
        gn(`rotate${mn[u]}`, s, c, this.animationValues),
          gn(`skew${mn[u]}`, s, c, this.animationValues)
      s.render()
      for (const u in c)
        s.setStaticValue(u, c[u]),
          this.animationValues && (this.animationValues[u] = c[u])
      s.scheduleRender()
    }
    getProjectionStyles(s) {
      var a, l
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) return kf
      const c = {
          visibility: "",
        },
        u = this.getTransformTemplate()
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (c.opacity = ""),
          (c.pointerEvents = Se(s == null ? void 0 : s.pointerEvents) || ""),
          (c.transform = u ? u(this.latestValues, "") : "none"),
          c
        )
      const d = this.getLead()
      if (!this.projectionDelta || !this.layout || !d.target) {
        const y = {}
        return (
          this.options.layoutId &&
            ((y.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (y.pointerEvents = Se(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !Pt(this.latestValues) &&
            ((y.transform = u ? u({}, "") : "none"), (this.hasProjected = !1)),
          y
        )
      }
      const h = d.animationValues || d.latestValues
      this.applyTransformsToTarget(),
        (c.transform = Af(
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
      for (const y in Re) {
        if (h[y] === void 0) continue
        const { correct: T, applyTo: x } = Re[y],
          v = c.transform === "none" ? h[y] : T(h[y], d)
        if (x) {
          const P = x.length
          for (let C = 0; C < P; C++) c[x[C]] = v
        } else c[y] = v
      }
      return (
        this.options.layoutId &&
          (c.pointerEvents =
            d === this
              ? Se(s == null ? void 0 : s.pointerEvents) || ""
              : "none"),
        c
      )
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((s) => {
        var a
        return (a = s.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop()
      }),
        this.root.nodes.forEach(es),
        this.root.sharedNodes.clear()
    }
  }
}
function Of(t) {
  t.updateLayout()
}
function jf(t) {
  var e
  const n =
    ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) ||
    t.snapshot
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = t.layout,
      { animationType: o } = t.options,
      s = n.source !== t.layout.source
    o === "size"
      ? tt((d) => {
          const h = s ? n.measuredBox[d] : n.layoutBox[d],
            p = X(h)
          ;(h.min = r[d].min), (h.max = h.min + p)
        })
      : ua(o, n.layoutBox, r) &&
        tt((d) => {
          const h = s ? n.measuredBox[d] : n.layoutBox[d],
            p = X(r[d])
          ;(h.max = h.min + p),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[d].max = t.relativeTarget[d].min + p))
        })
    const a = Lt()
    ne(a, r, n.layoutBox)
    const l = Lt()
    s ? ne(l, t.applyTransform(i, !0), n.measuredBox) : ne(l, r, n.layoutBox)
    const c = !oa(a)
    let u = !1
    if (!t.resumeFrom) {
      const d = t.getClosestProjectingParent()
      if (d && !d.resumeFrom) {
        const { snapshot: h, layout: p } = d
        if (h && p) {
          const m = F()
          re(m, n.layoutBox, h.layoutBox)
          const y = F()
          re(y, r, p.layoutBox),
            aa(m, y) || (u = !0),
            d.options.layoutRoot &&
              ((t.relativeTarget = y),
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
function Lf(t) {
  Jt && St.totalNodes++,
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
function Ff(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}
function Bf(t) {
  t.clearSnapshot()
}
function es(t) {
  t.clearMeasurements()
}
function If(t) {
  t.isLayoutDirty = !1
}
function Nf(t) {
  const { visualElement: e } = t.options
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform()
}
function ns(t) {
  t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0)
}
function Wf(t) {
  t.resolveTargetDelta()
}
function Kf(t) {
  t.calcProjection()
}
function Uf(t) {
  t.resetSkewAndRotation()
}
function $f(t) {
  t.removeLeadSnapshot()
}
function rs(t, e, n) {
  ;(t.translate = O(e.translate, 0, n)),
    (t.scale = O(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint)
}
function is(t, e, n, r) {
  ;(t.min = O(e.min, n.min, r)), (t.max = O(e.max, n.max, r))
}
function zf(t, e, n, r) {
  is(t.x, e.x, n.x, r), is(t.y, e.y, n.y, r)
}
function Hf(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0
}
const Gf = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
  },
  ss = (t) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(t),
  os = ss("applewebkit/") && !ss("chrome/") ? Math.round : W
function as(t) {
  ;(t.min = os(t.min)), (t.max = os(t.max))
}
function Yf(t) {
  as(t.x), as(t.y)
}
function ua(t, e, n) {
  return t === "position" || (t === "preserve-aspect" && !Xd(Ji(e), Ji(n), 0.2))
}
function Xf(t) {
  var e
  return (
    t !== t.root &&
    ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot)
  )
}
const qf = ca({
    attachResizeListener: (t, e) => it(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  yn = {
    current: void 0,
  },
  da = ca({
    measureScroll: (t) => ({
      x: t.scrollLeft,
      y: t.scrollTop,
    }),
    defaultParent: () => {
      if (!yn.current) {
        const t = new qf({})
        t.mount(window), t.setOptions({ layoutScroll: !0 }), (yn.current = t)
      }
      return yn.current
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none"
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
  }),
  Zf = {
    pan: {
      Feature: ff,
    },
    drag: {
      Feature: df,
      ProjectionNode: da,
      MeasureLayout: ra,
    },
  },
  On = { current: null },
  fa = { current: !1 }
function Jf() {
  if (((fa.current = !0), !!Hn))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (On.current = t.matches)
      t.addListener(e), e()
    } else On.current = !1
}
function Qf(t, e, n) {
  for (const r in e) {
    const i = e[r],
      o = n[r]
    if (U(i))
      t.addValue(r, i),
        process.env.NODE_ENV === "development" &&
          gr(
            i.version === "11.3.19",
            `Attempting to mix Framer Motion versions ${i.version} with 11.3.19 may not work as expected.`,
          )
    else if (U(o)) t.addValue(r, le(i, { owner: t }))
    else if (o !== i)
      if (t.hasValue(r)) {
        const s = t.getValue(r)
        s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i)
      } else {
        const s = t.getStaticValue(r)
        t.addValue(r, le(s !== void 0 ? s : i, { owner: t }))
      }
  }
  for (const r in n) e[r] === void 0 && t.removeValue(r)
  return e
}
const ls = /* @__PURE__ */ new WeakMap(),
  th = [...bo, K, yt],
  eh = (t) => th.find(vo(t)),
  cs = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ],
  nh = Xn.length
class rh {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
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
      (this.resolveKeyframes = (h, p, m, y) =>
        new this.KeyframeResolver(h, p, m, y, this)),
      (this.current = null),
      (this.children = /* @__PURE__ */ new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = /* @__PURE__ */ new Map()),
      (this.KeyframeResolver = or),
      (this.features = {}),
      (this.valueSubscriptions = /* @__PURE__ */ new Map()),
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
          ((this.isRenderScheduled = !0), k.render(this.render, !1, !0))
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
      (this.isControllingVariants = Be(n)),
      (this.isVariantNode = Hs(n)),
      this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()),
      (this.manuallyAnimateOnMount = !!(e && e.current))
    const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    )
    for (const h in d) {
      const p = d[h]
      l[h] !== void 0 && U(p) && p.set(l[h], !1)
    }
  }
  mount(e) {
    ;(this.current = e),
      ls.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      fa.current || Jf(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : On.current),
      process.env.NODE_ENV !== "production" &&
        gr(
          this.shouldReduceMotion !== !0,
          "You have Reduced Motion enabled on your device. Animations may not appear as expected.",
        ),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext)
  }
  unmount() {
    ls.delete(this.current),
      this.projection && this.projection.unmount(),
      ut(this.notifyUpdate),
      ut(this.render),
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
    const r = vt.has(e),
      i = n.on("change", (s) => {
        ;(this.latestValues[e] = s),
          this.props.onUpdate && k.preRender(this.notifyUpdate),
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
    for (e in It) {
      const n = It[e]
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
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : F()
  }
  getStaticValue(e) {
    return this.latestValues[e]
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    ;(e.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n)
    for (let r = 0; r < cs.length; r++) {
      const i = cs[r]
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i])
      const o = "on" + i,
        s = e[o]
      s && (this.propEventSubscriptions[i] = this.on(i, s))
    }
    ;(this.prevMotionValues = Qf(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue()
  }
  getProps() {
    return this.props
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0
  }
  /**
   * Returns the defined default transition on this component.
   */
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
    for (let r = 0; r < nh; r++) {
      const i = Xn[r],
        o = this.props[i]
      ;(ie(o) || o === !1) && (n[i] = o)
    }
    return n
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode()
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(e),
        () => n.variantChildren.delete(e)
      )
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const r = this.values.get(e)
    n !== r &&
      (r && this.removeValue(e),
      this.bindToMotionValue(e, n),
      this.values.set(e, n),
      (this.latestValues[e] = n.get()))
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e)
    const n = this.valueSubscriptions.get(e)
    n && (n(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState)
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e)
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e]
    let r = this.values.get(e)
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = le(n === null ? void 0 : n, { owner: this })),
        this.addValue(e, r)),
      r
    )
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
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
        (typeof i == "string" && (go(i) || mo(i))
          ? (i = parseFloat(i))
          : !eh(i) && yt.test(n) && (i = Ro(e, n)),
        this.setBaseTarget(e, U(i) ? i.get() : i)),
      U(i) ? i.get() : i
    )
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var n
    const { initial: r } = this.props
    let i
    if (typeof r == "string" || typeof r == "object") {
      const s = ir(
        this.props,
        r,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom,
      )
      s && (i = s[e])
    }
    if (r && i !== void 0) return i
    const o = this.getBaseTargetFromProps(this.props, e)
    return o !== void 0 && !U(o)
      ? o
      : this.initialValues[e] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[e]
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new mr()), this.events[e].add(n)
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n)
  }
}
class ha extends rh {
  constructor() {
    super(...arguments), (this.KeyframeResolver = Vo)
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
function ih(t) {
  return window.getComputedStyle(t)
}
class sh extends ha {
  constructor() {
    super(...arguments),
      (this.type = "html"),
      (this.applyWillChange = !0),
      (this.renderInstance = eo)
  }
  readValueFromInstance(e, n) {
    if (vt.has(n)) {
      const r = lr(n)
      return (r && r.default) || 0
    } else {
      const r = ih(e),
        i = (qs(n) ? r.getPropertyValue(n) : r[n]) || 0
      return typeof i == "string" ? i.trim() : i
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ea(e, n)
  }
  build(e, n, r) {
    Qn(e, n, r.transformTemplate)
  }
  scrapeMotionValuesFromProps(e, n, r) {
    return rr(e, n, r)
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription)
    const { children: e } = this.props
    U(e) &&
      (this.childSubscription = e.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`)
      }))
  }
}
class oh extends ha {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = F)
  }
  getBaseTargetFromProps(e, n) {
    return e[n]
  }
  readValueFromInstance(e, n) {
    if (vt.has(n)) {
      const r = lr(n)
      return (r && r.default) || 0
    }
    return (n = no.has(n) ? n : Fe(n)), e.getAttribute(n)
  }
  scrapeMotionValuesFromProps(e, n, r) {
    return io(e, n, r)
  }
  build(e, n, r) {
    er(e, n, this.isSVGTag, r.transformTemplate)
  }
  renderInstance(e, n, r, i) {
    ro(e, n, r, i)
  }
  mount(e) {
    ;(this.isSVGTag = nr(e.tagName)), super.mount(e)
  }
}
const ah = (t, e) =>
    qn(t)
      ? new oh(e)
      : new sh(e, {
          allowProjection: t !== fs,
        }),
  lh = {
    layout: {
      ProjectionNode: da,
      MeasureLayout: ra,
    },
  },
  ch = {
    ...Wd,
    ...Zc,
    ...Zf,
    ...lh,
  },
  jn = /* @__PURE__ */ ic((t, e) => Bc(t, e, ch, ah)),
  uh = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2,
      },
    },
    inactive: {
      display: "none",
    },
  },
  dh = {
    active: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.3,
      },
    },
  },
  Sh = ({ children: t, value: e }) => {
    const { selected: n, tabId: r } = Kn("tab"),
      i = n === e
    return /* @__PURE__ */ _.jsx(
      jn.div,
      {
        role: "tabpanel",
        tabIndex: 0,
        "data-state": i ? "active" : "inactive",
        "aria-labelledby": r + "-tabpanel-" + e,
        variants: uh,
        animate: i ? "active" : "inactive",
        initial: "inactive",
        children: /* @__PURE__ */ _.jsx(
          jn.div,
          { variants: dh, children: i && t },
          e,
        ),
      },
      r + "-tabpanel-" + e,
    )
  },
  wh = () =>
    /* @__PURE__ */ _.jsx(jn.div, {
      className: ue({
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
export {
  Al as Accordion,
  yh as AccordionContent,
  mh as AccordionItem,
  gh as AccordionTrigger,
  ph as Button,
  vh as Tab,
  Sh as TabContent,
  wh as TabIndicator,
  xh as TabItem,
  bh as TabList,
  Sl as TagButton,
}
//# sourceMappingURL=index.es.js.map
