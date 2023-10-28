// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"d8lhj":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"jeorp":[function(require,module,exports) {
var _options = require("./utils/Options");
var _entityManager = require("./utils/EntityManager");
var _app = require("./utils/App");
const COLORS = [
    "red",
    "green",
    "blue",
    "orange",
    "pink"
];
const options = new (0, _options.Options)({
    debug: false
});
const entityManager = new (0, _entityManager.EntityManager)();
for(let i = 0; i <= 9; i++){
    const x = 45 * (i + 1);
    // const y = 60 + 60 * Math.ceil(i / 8)
    const y = 60 * (i + 1);
    entityManager.addParticle(x, y, i, 0, COLORS[Math.floor(Math.random() * 5)]);
}
// entityManager.addParticle(60, 60, 90, 0)
// entityManager.addParticle(300, 60, -80, 0)
// entityManager.addParticle(150, 60, 90, 0)
// entityManager.addParticle(250, 60, -80, 0)
entityManager.addObstacle(0, 800, 510, 20);
entityManager.addObstacle(0, 0, 20, 800);
entityManager.addObstacle(490, 0, 20, 800);
entityManager.addObstacle(0, 0, 500, 20);
const app = new (0, _app.App)(options, entityManager);
app.init();

},{"./utils/Options":"g1OFg","./utils/EntityManager":"1ywgv","./utils/App":"ieuP2"}],"g1OFg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Options", ()=>Options);
class Options {
    //FIXME: добавить возможность настраивать вещи налету
    constructor({ debug }){
        if (Options._instance) return Options._instance;
        Options._instance = this;
        this.particleRadius = 20;
        this.gravity = 9.8;
        this.precalc = {
            radiusFactor: this.particleRadius / (this.particleRadius + this.particleRadius),
            circleAngle: 2 * Math.PI
        };
        this.timeSpeedCoefficient = 30;
        this.targetFrameTime = 1000 / 60;
        this.friction = 0.90;
        this.debug = !!debug;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1ywgv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EntityManager", ()=>EntityManager);
var _vector2 = require("./Vector2");
class EntityManager {
    constructor(){
        this.addParticle = (x, y, xv, yv, color)=>{
            this.particles.push({
                position: (0, _vector2.Vec2).new(x, y),
                velocity: (0, _vector2.Vec2).new(xv, yv),
                relativeVelocity: (0, _vector2.Vec2).new(0, 0),
                color
            });
        };
        //TODO: add possibility to create diagonal obstacles
        this.addObstacle = (x, y, w, h)=>{
            this.obstacles.push({
                data: [
                    x,
                    y,
                    w,
                    h
                ]
            });
        };
        if (EntityManager._instance) return EntityManager._instance;
        EntityManager._instance = this;
        this.particles = [];
        this.obstacles = [];
    }
}

},{"./Vector2":"6oO1r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6oO1r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vec2", ()=>Vec2);
class Vec2 {
    static new(x, y) {
        return {
            x: x ?? 0,
            y: y ?? 0
        };
    }
    static multiplyScalar({ x, y }, num) {
        return {
            x: x * num,
            y: y * num
        };
    }
    static add(v1, v2) {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        };
    }
    static subtract(v1, v2) {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        };
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static magnitude({ x, y }) {
        return Math.sqrt(x * x + y * y);
    }
    static normalize({ x, y }) {
        const magnitude = Vec2.magnitude({
            x,
            y
        });
        return {
            x: x / magnitude,
            y: y / magnitude
        };
    }
    static collisionNormal(collisionPoint, position) {
        return Vec2.normalize(Vec2.subtract(collisionPoint, position));
    }
    static reflectFromPoint(collisionPoint, position, velocity) {
        const normal = Vec2.collisionNormal(collisionPoint, position);
        return Vec2.subtract(velocity, Vec2.multiplyScalar(normal, 2 * Vec2.dot(velocity, normal)));
    }
    static reflectFromNormal(vector, normal) {
        // v' = v - 2 * (v ∙ n/n ∙ n) * n
        return Vec2.subtract(vector, Vec2.multiplyScalar(normal, 2 * Vec2.dot(vector, normal) / Vec2.dot(normal, normal)));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ieuP2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "App", ()=>App);
var _physics = require("./Physics");
var _renderer = require("./Renderer");
class App {
    constructor(options, entityManager){
        if (App._instance) return App._instance;
        App._instance = this;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;
        this.rawDeltaTime = performance.now();
        this.lastFrameTime = this.rawDeltaTime;
        this.isPaused = false;
        this.options = options;
        this.entityManager = entityManager;
        this.update = this.update.bind(this);
        this.onPause = this.onPause.bind(this);
    }
    init() {
        this.canvas.width = document.body.clientWidth * this.dpr;
        this.canvas.height = document.body.clientHeight * this.dpr;
        if (this.options.debug) window.addEventListener("click", ()=>{
            this.rawDeltaTime = 1;
            this.lastFrameTime = 1;
            (0, _physics.Physics).prepareFrame(this.entityManager, this.options, this);
            (0, _renderer.Renderer).drawFrame(this, this.options, this.entityManager);
        });
        else {
            window.addEventListener("click", this.onPause);
            window.requestAnimationFrame(this.update);
        }
    }
    update(frameTime) {
        this.rawDeltaTime = (frameTime - this.lastFrameTime) / this.options.targetFrameTime;
        this.lastFrameTime = frameTime;
        window.requestAnimationFrame(this.update);
        if (this.isPaused) return;
        (0, _physics.Physics).prepareFrame(this.entityManager, this.options, this);
        (0, _renderer.Renderer).drawFrame(this, this.options, this.entityManager);
    }
    onPause() {
        this.isPaused = !this.isPaused;
    }
    get deltaTime() {
        return this.rawDeltaTime * this.options.timeSpeedCoefficient;
    }
}

},{"./Physics":"LHvaj","./Renderer":"1xRJE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"LHvaj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Physics", ()=>Physics);
var _vector2 = require("./Vector2");
class Physics {
    static prepareFrame(entityManager, options, app) {
        for(let i = 0; i < entityManager.particles.length; i++){
            const { position, velocity, relativeVelocity } = this._resolveParticleCollisions(i, entityManager, options, app);
            const newPosition = {
                x: position.x + relativeVelocity.x,
                y: position.y + relativeVelocity.y
            };
            const newVelocity = {
                x: velocity.x,
                y: velocity.y + options.gravity
            };
            const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app);
            entityManager.particles[i] = {
                ...entityManager.particles[i],
                position: newPosition,
                velocity: newVelocity,
                relativeVelocity: newRelativeVelocity
            };
        }
    }
    static _resolveParticleCollisions(particleIndex, entityManager, options, app) {
        const { position, velocity, relativeVelocity, color } = entityManager.particles[particleIndex];
        let [newPosition, newVelocity, newRelativeVelocity] = [
            position,
            velocity,
            relativeVelocity
        ];
        for(let i = 0; i < entityManager.obstacles.length; i++){
            const { data: [rectX, rectY, rectWidth, rectHeight] } = entityManager.obstacles[i];
            const intersects = ()=>{
                const rectHalfWidth = rectWidth / 2;
                const rectHalfHeight = rectHeight / 2;
                const rectCenterX = Math.abs(rectX + rectHalfWidth);
                const rectCenterY = Math.abs(rectY + rectHalfHeight);
                const circleDistance = (0, _vector2.Vec2).new(Math.abs(newPosition.x - rectCenterX), Math.abs(newPosition.y - rectCenterY));
                if (circleDistance.x > rectHalfWidth + options.particleRadius) return false;
                if (circleDistance.y > rectHalfHeight + options.particleRadius) return false;
                if (circleDistance.x <= rectHalfWidth) return true;
                if (circleDistance.y <= rectHalfHeight) return true;
                const cornerDistanceSquared = (circleDistance.x - rectHalfWidth) * 2 + (circleDistance.y - rectHalfHeight) * 2;
                return cornerDistanceSquared <= options.particleRadius * 2;
            };
            if (intersects()) {
                const obstacleLeftX = rectX;
                const obstacleRightX = rectX + rectWidth;
                const obstacleTopY = rectY;
                const obstacleBottomY = rectY + rectHeight;
                const collisionPoint = (0, _vector2.Vec2).new(newPosition.x < obstacleLeftX ? obstacleLeftX : newPosition.x > obstacleRightX ? obstacleRightX : newPosition.x, newPosition.y < obstacleTopY ? obstacleTopY : newPosition.y > obstacleBottomY ? obstacleBottomY : newPosition.y);
                const distance = Math.sqrt(Math.pow(collisionPoint.x - newPosition.x, 2) + Math.pow(collisionPoint.y - newPosition.y, 2));
                const intersectionDepth = options.particleRadius - distance;
                if (intersectionDepth > 0) {
                    //if particle intersects obstacle, move particle away
                    const newDx = (newPosition.x - collisionPoint.x) / distance;
                    const newDy = (newPosition.y - collisionPoint.y) / distance;
                    newPosition = (0, _vector2.Vec2).new(newPosition.x + newDx * intersectionDepth, newPosition.y + newDy * intersectionDepth);
                }
                const reflectedVector = Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, newPosition, newVelocity), options);
                newVelocity = reflectedVector;
                newRelativeVelocity = Physics.getRelativeVelocity(reflectedVector, app);
            }
        }
        for(let i = 0; i < entityManager.particles.length; i++){
            if (i <= particleIndex) continue;
            const { position: cPosition, velocity: cVelocity } = entityManager.particles[i];
            //check collision
            const dx = cPosition.x - newPosition.x;
            const dy = cPosition.y - newPosition.y;
            //FIXME: они разъезжаются на маке, потому что коллижен считается два раза для первой сферы
            //UPD: добавил разлепление партиклов, мб это фиксит
            //TODO: проверить, сохранилось ли это с введением DELTA_TIME
            const centerDistance = Math.sqrt(dx * dx + dy * dy);
            if (centerDistance < options.particleRadius * 2) {
                //if collided, find collision point
                const collisionPoint = (0, _vector2.Vec2).add((0, _vector2.Vec2).multiplyScalar(newPosition, options.precalc.radiusFactor), (0, _vector2.Vec2).multiplyScalar(cPosition, options.precalc.radiusFactor));
                //reflected vector for current sphere
                const reflectedVector1 = Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, cPosition, velocity), options);
                //reflected vector for another sphere
                const reflectedVector2 = Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, newPosition, cVelocity), options);
                //check if particles intersect
                const intersectionDepth = options.particleRadius + options.particleRadius - centerDistance;
                if (intersectionDepth > 0) {
                    //if they intersect, move them apart evenly
                    const newDx = dx / centerDistance;
                    const newDy = dy / centerDistance;
                    newPosition = (0, _vector2.Vec2).new(newPosition.x - newDx * intersectionDepth / 2, newPosition.y - newDy * intersectionDepth / 2);
                    const newPosition2 = (0, _vector2.Vec2).new(cPosition.x + newDx * intersectionDepth / 2, cPosition.y + newDy * intersectionDepth / 2);
                    entityManager.particles[i] = {
                        ...entityManager.particles[i],
                        position: newPosition2
                    };
                }
                newVelocity = reflectedVector1;
                newRelativeVelocity = Physics.getRelativeVelocity(reflectedVector1, app);
                entityManager.particles[i] = {
                    ...entityManager.particles[i],
                    velocity: reflectedVector2,
                    relativeVelocity: Physics.getRelativeVelocity(reflectedVector2, app)
                };
            }
        }
        return {
            position: newPosition,
            velocity: newVelocity,
            relativeVelocity: newRelativeVelocity,
            color
        };
    }
    static applyFriction(v, options) {
        return (0, _vector2.Vec2).multiplyScalar(v, options.friction);
    }
    //FIXME: надо будет убрать в отдельный класс когда будут другие утилиты для физики
    static getRelativeVelocity(v, app) {
        //FIXME: изменение дельта тайма меняет результат симуляции, надо решать с интерполяцией что-то
        return {
            x: v.x / app.deltaTime,
            y: v.y / app.deltaTime
        };
    }
}

},{"./Vector2":"6oO1r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1xRJE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Renderer", ()=>Renderer);
class Renderer {
    static drawFrame(app, options, entityManager) {
        app.context.clearRect(0, 0, app.canvas.width, app.canvas.height);
        entityManager.particles.forEach(({ position, color })=>{
            app.context.beginPath();
            app.context.fillStyle = color;
            app.context.arc(position.x, position.y, options.particleRadius, 0, options.precalc.circleAngle);
            app.context.fill();
        });
        this._drawObstacles(app, entityManager.obstacles);
    }
    static _drawObstacles(app, obstacles) {
        obstacles.forEach(({ data })=>{
            app.context.fillRect(...data);
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["d8lhj","jeorp"], "jeorp", "parcelRequireac70")

//# sourceMappingURL=index.b7a05eb9.js.map
