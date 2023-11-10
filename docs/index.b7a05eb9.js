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
var _vector2 = require("./utils/Vector2");
const options = new (0, _options.Options)({
    debug: true
});
const entityManager = new (0, _entityManager.EntityManager)();
const app = new (0, _app.App)(options, entityManager);
entityManager.addObstacle(0, app.canvas.clientHeight - 20, app.canvas.clientWidth, 20);
entityManager.addObstacle(0, 0, 20, app.canvas.clientHeight);
entityManager.addObstacle(app.canvas.clientWidth - 20, 0, 20, app.canvas.clientHeight);
entityManager.addObstacle(0, 0, app.canvas.clientWidth, 20);
app.init();
let lastCallTime = 0;
app.onUpdate = (frameTime)=>{
    if (frameTime - lastCallTime < 80) return;
    if (entityManager.particles.length >= 2000) return;
    lastCallTime = frameTime;
    entityManager.addParticle({
        position: (0, _vector2.Vec2).new(30, 30),
        velocity: (0, _vector2.Vec2).new(5, 0),
        color: "green",
        mass: 1,
        radius: 5
    });
    entityManager.addParticle({
        position: (0, _vector2.Vec2).new(60, 30),
        velocity: (0, _vector2.Vec2).new(5, 0),
        color: "red",
        mass: 1,
        radius: 5
    });
    entityManager.addParticle({
        position: (0, _vector2.Vec2).new(90, 30),
        velocity: (0, _vector2.Vec2).new(5, 0),
        color: "blue",
        mass: 1,
        radius: 5
    });
    entityManager.addParticle({
        position: (0, _vector2.Vec2).new(120, 30),
        velocity: (0, _vector2.Vec2).new(5, 0),
        color: "pink",
        mass: 1,
        radius: 5
    });
    entityManager.addParticle({
        position: (0, _vector2.Vec2).new(150, 30),
        velocity: (0, _vector2.Vec2).new(5, 0),
        color: "brown",
        mass: 1,
        radius: 5
    });
};

},{"./utils/Options":"g1OFg","./utils/EntityManager":"1ywgv","./utils/App":"ieuP2","./utils/Vector2":"6oO1r"}],"g1OFg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Options", ()=>Options);
class Options {
    //FIXME: добавить возможность настраивать вещи налету
    constructor({ debug }){
        if (Options._instance) return Options._instance;
        Options._instance = this;
        this.gravity = 9.8;
        this.precalc = {
            circleAngle: 2 * Math.PI
        };
        this.timeSpeedCoefficient = 1;
        this.physicsIterations = 8;
        this.physicsGridResolution = 40;
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
        this.addParticle = (props)=>{
            this.particles.push({
                id: this.particles.length,
                mass: props.mass ?? 1,
                radius: props.radius ?? 5,
                color: props.color ?? "blue",
                position: props.position ?? (0, _vector2.Vec2).new(0, 0),
                velocity: props.velocity ?? (0, _vector2.Vec2).new(0, 0),
                relativeVelocity: (0, _vector2.Vec2).new(0, 0)
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
        this.gridCellWidth = this.canvas.clientWidth / this.options.physicsGridResolution;
        this.gridCellHeight = this.canvas.clientHeight / this.options.physicsGridResolution;
        //FIXME: шину событий надо сделать
        this.onUpdate = null;
        this.update = this.update.bind(this);
        this.onPause = this.onPause.bind(this);
    }
    init() {
        //TODO: сделать в расчётах поправки на дпр
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        window.addEventListener("click", this.onPause);
        window.requestAnimationFrame(this.update);
    }
    update(frameTime) {
        this.rawDeltaTime = 1 / 60 * this.options.timeSpeedCoefficient;
        this.lastFrameTime = frameTime;
        window.requestAnimationFrame(this.update);
        if (this.isPaused) return;
        this.onUpdate && this.onUpdate(frameTime);
        (0, _physics.Physics).prepareFrame(this.entityManager, this.options, this);
        (0, _renderer.Renderer).drawFrame(this, this.options, this.entityManager);
    }
    onPause() {
        this.isPaused = !this.isPaused;
    }
    get deltaTime() {
        return this.rawDeltaTime;
    }
}

},{"./Physics":"LHvaj","./Renderer":"1xRJE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"LHvaj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Physics", ()=>Physics);
var _vector2 = require("./Vector2");
var _utils = require("./Utils");
class Physics {
    static prepareFrame(entityManager, options, app) {
        const iterationsMax = options.physicsIterations;
        /**
         * FIXME: нужно переделать колижен респонсы чтобы они затрагивали только текущий интервал, иначе нельзя будет запараллелить вычисления
         * Сейчас симуляция стабильно работает при радиусе партиклов >5 на моей машине, хотелось бы поменьше.
         * Нужна оптимизация + увеличение итераций физики
         */ for(let x = 0; x < iterationsMax; x++){
            //UPD: .fill fills array with references to provided value :(
            const possibleCollisions = (0, _utils.Utils).createUniformGridOfSize(options.physicsGridResolution);
            //разбиение на клетки работает, насколько я могу судить.
            //вроде как единственная проблема с текущим алгоритмом - это размер партиклов, если он больше клетки, то смэрть
            for(let i = 0; i < entityManager.particles.length; i++){
                const { position, id, radius } = entityManager.particles[i];
                const xStart = (0, _utils.Utils).clamp(Math.floor((position.x - radius) / app.gridCellWidth), 0, options.physicsGridResolution - 1);
                const xEnd = (0, _utils.Utils).clamp(Math.floor((position.x + radius) / app.gridCellWidth), 0, options.physicsGridResolution - 1);
                const yStart = (0, _utils.Utils).clamp(Math.floor((position.y - radius) / app.gridCellHeight), 0, options.physicsGridResolution - 1);
                const yEnd = (0, _utils.Utils).clamp(Math.floor((position.y + radius) / app.gridCellHeight), 0, options.physicsGridResolution - 1);
                possibleCollisions[xStart][yStart].push(id);
                if (xStart !== xEnd) possibleCollisions[xEnd][yStart].push(id);
                if (yEnd !== yStart) {
                    possibleCollisions[xStart][yEnd].push(id);
                    if (xStart !== xEnd) possibleCollisions[xEnd][yEnd].push(id);
                }
            }
            for(let i = 0; i < entityManager.particles.length; i++)Physics._resolveObstacleCollisions(i, entityManager, options);
            Physics._resolveParticleCollisions(entityManager, options, possibleCollisions);
            for(let i = 0; i < entityManager.particles.length; i++){
                const { position, velocity } = entityManager.particles[i];
                const newVelocity = (0, _vector2.Vec2).new(velocity.x, velocity.y + options.gravity);
                const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app, iterationsMax);
                const newPosition = (0, _vector2.Vec2).new(position.x + newRelativeVelocity.x, position.y + newRelativeVelocity.y);
                entityManager.particles[i] = {
                    ...entityManager.particles[i],
                    velocity: newVelocity,
                    relativeVelocity: newRelativeVelocity,
                    position: newPosition
                };
            }
        }
    }
    static _particleIntersectsObstacle(obstacle, position, radius) {
        const { data: [rectX, rectY, rectWidth, rectHeight] } = obstacle;
        const rectHalfWidth = rectWidth / 2;
        const rectHalfHeight = rectHeight / 2;
        const rectCenterX = Math.abs(rectX + rectHalfWidth);
        const rectCenterY = Math.abs(rectY + rectHalfHeight);
        const circleDistance = (0, _vector2.Vec2).new(Math.abs(position.x - rectCenterX), Math.abs(position.y - rectCenterY));
        if (circleDistance.x > rectHalfWidth + radius) return false;
        if (circleDistance.y > rectHalfHeight + radius) return false;
        if (circleDistance.x <= rectHalfWidth) return true;
        if (circleDistance.y <= rectHalfHeight) return true;
        const cornerDistanceSquared = (circleDistance.x - rectHalfWidth) * 2 + (circleDistance.y - rectHalfHeight) * 2;
        return cornerDistanceSquared <= radius * 2;
    }
    //FIXME: Separate collision detection from collision response to allow for event listeners
    static _resolveObstacleCollisions(particleIndex, entityManager, options) {
        for(let i = 0; i < entityManager.obstacles.length; i++){
            // eslint-disable-next-line prefer-const
            let { position: newPosition, velocity: newVelocity, radius } = entityManager.particles[particleIndex];
            if (Physics._particleIntersectsObstacle(entityManager.obstacles[i], newPosition, radius)) {
                const { data: [rectX, rectY, rectWidth, rectHeight] } = entityManager.obstacles[i];
                const obstacleLeftX = rectX;
                const obstacleRightX = rectX + rectWidth;
                const obstacleTopY = rectY;
                const obstacleBottomY = rectY + rectHeight;
                const collisionPoint = (0, _vector2.Vec2).new(newPosition.x < obstacleLeftX ? obstacleLeftX : newPosition.x > obstacleRightX ? obstacleRightX : newPosition.x, newPosition.y < obstacleTopY ? obstacleTopY : newPosition.y > obstacleBottomY ? obstacleBottomY : newPosition.y);
                const distance = Math.sqrt(Math.pow(collisionPoint.x - newPosition.x, 2) + Math.pow(collisionPoint.y - newPosition.y, 2));
                const intersectionDepth = radius - distance;
                if (intersectionDepth > 0) {
                    //if particle intersects obstacle, move particle away
                    const newDx = (newPosition.x - collisionPoint.x) / distance;
                    const newDy = (newPosition.y - collisionPoint.y) / distance;
                    /**
                     * 0 / 0 could and should happen,
                     * when particle intersects obstacle exactly aligned with collision point,
                     * which gives NaN (for whatever reason),
                     * skip repositioning in this case
                     */ if (isNaN(newDx) || isNaN(newDy)) return;
                    newPosition = (0, _vector2.Vec2).new(newPosition.x + newDx * intersectionDepth, newPosition.y + newDy * intersectionDepth);
                }
                entityManager.particles[particleIndex] = {
                    ...entityManager.particles[particleIndex],
                    position: newPosition,
                    velocity: Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, newPosition, newVelocity), options)
                };
            }
        }
    }
    static _resolveParticleCollisions(entityManager, options, possibleCollisions) {
        possibleCollisions.forEach((column)=>{
            column.forEach((row)=>{
                row.forEach((particleIndex)=>{
                    // eslint-disable-next-line prefer-const
                    let { position: newPosition, velocity: newVelocity, radius } = entityManager.particles[particleIndex];
                    row.forEach((anotherParticleIndex)=>{
                        if (anotherParticleIndex === particleIndex) return;
                        // eslint-disable-next-line prefer-const
                        let { position: cPosition, velocity: cVelocity, radius: cRadius } = entityManager.particles[anotherParticleIndex];
                        const distanceX = cPosition.x - newPosition.x;
                        const distanceY = cPosition.y - newPosition.y;
                        const centerDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                        if (centerDistance < radius * 2) {
                            //check if particles intersect
                            const intersectionDepth = radius + cRadius - centerDistance;
                            //if they intersect, move them apart evenly
                            if (intersectionDepth > 0) {
                                const newDx = distanceX / centerDistance;
                                const newDy = distanceY / centerDistance;
                                newPosition = (0, _vector2.Vec2).new(newPosition.x - newDx * intersectionDepth / 2, newPosition.y - newDy * intersectionDepth / 2);
                                cPosition = (0, _vector2.Vec2).new(cPosition.x + newDx * intersectionDepth / 2, cPosition.y + newDy * intersectionDepth / 2);
                            }
                            const collisionPoint = (0, _vector2.Vec2).add((0, _vector2.Vec2).multiplyScalar(newPosition, radius / (radius + radius)), (0, _vector2.Vec2).multiplyScalar(cPosition, cRadius / (cRadius + cRadius)));
                            entityManager.particles[particleIndex] = {
                                ...entityManager.particles[particleIndex],
                                position: newPosition,
                                velocity: Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, cPosition, newVelocity), options)
                            };
                            entityManager.particles[anotherParticleIndex] = {
                                ...entityManager.particles[anotherParticleIndex],
                                position: cPosition,
                                velocity: Physics.applyFriction((0, _vector2.Vec2).reflectFromPoint(collisionPoint, newPosition, cVelocity), options)
                            };
                        }
                    });
                });
            });
        });
    }
    static applyFriction(v, options) {
        return (0, _vector2.Vec2).multiplyScalar(v, options.friction);
    }
    static getRelativeVelocity(v, app, iterationsMax) {
        return {
            x: v.x * app.deltaTime / iterationsMax,
            y: v.y * app.deltaTime / iterationsMax
        };
    }
}

},{"./Vector2":"6oO1r","./Utils":"5znrM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5znrM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Utils", ()=>Utils);
class Utils {
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    static createUniformGridOfSize(size) {
        const grid = [];
        for(let i = 0; i < size; i++){
            grid[i] = [];
            for(let y = 0; y < size; y++)grid[i][y] = [];
        }
        return grid;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1xRJE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Renderer", ()=>Renderer);
class Renderer {
    static drawFrame(app, options, entityManager) {
        app.context.clearRect(0, 0, app.canvas.width, app.canvas.height);
        entityManager.particles.forEach(({ position, color, radius })=>{
            app.context.beginPath();
            app.context.fillStyle = color;
            app.context.arc(position.x, position.y, radius, 0, options.precalc.circleAngle);
            app.context.fill();
        });
        this._drawObstacles(app, entityManager.obstacles);
        if (options.debug) this._drawDebugInfo(app, entityManager);
    }
    static _drawDebugInfo(app, entityManager) {
        app.context.fillStyle = "black";
        app.context.fillText(String(entityManager.particles.length), 10, 10);
        // TODO: для каждого партикла
        // app.context.fillStyle = 'black'
        // app.context.fillText(String(id), position.x, position.y)
        const { gridCellWidth, gridCellHeight } = app;
        //FIXME: make grid resolution choosable
        for(let i = 0; i <= app.options.physicsGridResolution; i++){
            app.context.strokeStyle = "lightgreen";
            app.context.beginPath();
            app.context.moveTo((i + 1) * gridCellWidth, 0);
            app.context.lineTo((i + 1) * gridCellWidth, app.canvas.clientHeight);
            app.context.stroke();
            app.context.beginPath();
            app.context.moveTo(0, (i + 1) * gridCellHeight);
            app.context.lineTo(app.canvas.clientWidth, (i + 1) * gridCellHeight);
            app.context.stroke();
            app.context.fillText(`${i}, ${i}`, i * gridCellWidth, i * gridCellHeight);
        }
    }
    static _drawObstacles(app, obstacles) {
        app.context.fillStyle = "grey";
        obstacles.forEach(({ data })=>{
            app.context.fillRect(...data);
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["d8lhj","jeorp"], "jeorp", "parcelRequireac70")

//# sourceMappingURL=index.b7a05eb9.js.map
