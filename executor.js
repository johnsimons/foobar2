Object.defineProperty(exports, '__esModule', { value: true });

var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var child_process = require('child_process');
var util = require('util');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var os__namespace = /*#__PURE__*/_interopNamespace(os);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var path__namespace = /*#__PURE__*/_interopNamespace(path);
var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);
var util__namespace = /*#__PURE__*/_interopNamespace(util);

/******************************************************************************
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
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var execAsync = util__namespace.promisify(child_process.exec);
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor(cwd, context, kubeConfigPath) {
        this.context = context;
        this.kubeConfigPath = kubeConfigPath;
        this.defaultChildProcessOptions = { windowsHide: true, cwd: cwd, encoding: "utf8" };
    }
    CommandExecutor.prototype.exec = function (command, env) {
        if (env === void 0) { env = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, stdout, stderr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, execAsync(command, __assign(__assign({}, this.defaultChildProcessOptions), { env: env }))];
                    case 1:
                        _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                        if (stderr) {
                            this.context.printWarning(stderr);
                        }
                        if (stdout) {
                            return [2 /*return*/, stdout.trim()];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    CommandExecutor.prototype.execKubectl = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var stdout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec(command, { KUBECONFIG: this.kubeConfigPath })];
                    case 1:
                        stdout = _a.sent();
                        if (stdout) {
                            this.context.printVerbose(stdout);
                            return [2 /*return*/, stdout.trim()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommandExecutor;
}());

var KUBECTL_MAJOR = 1;
var KUBECTL_MINOR = 24;
var KustomizeStepExecutor = function (_a) {
    var inputs = _a.inputs, context = _a.context;
    return __awaiter(void 0, void 0, void 0, function () {
        var kubeConfigPath, kubectl, executor, command, stdout, paths, versionJson, version, message, major, minor, manifestPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    kubeConfigPath = context.getOctopusVariable("Octopus.KubeConfig.Path");
                    if (kubeConfigPath === undefined) {
                        throw new Error("\"Octopus.KubeConfig.Path\" not found in variables.");
                    }
                    kubectl = context.getOctopusVariable("Octopus.Action.Kubernetes.CustomKubectlExecutable");
                    executor = new CommandExecutor(inputs.overlayPath, context, kubeConfigPath);
                    if (!(kubectl === undefined)) return [3 /*break*/, 2];
                    command = os__namespace.platform() === "win32" ? "where kubectl.exe" : "which kubectl";
                    return [4 /*yield*/, executor.exec(command)];
                case 1:
                    stdout = _b.sent();
                    if (!stdout) {
                        throw new Error("Could not find kubectl. Make sure kubectl is on the PATH. See https://oc.to/KubernetesTarget for more information.");
                    }
                    paths = stdout.split(/[\r\n]+/);
                    if (paths.length === 0) {
                        throw new Error("Could not find kubectl. Make sure kubectl is on the PATH. See https://oc.to/KubernetesTarget for more information.");
                    }
                    kubectl = paths[0];
                    return [3 /*break*/, 3];
                case 2:
                    if (!fs__namespace.existsSync(kubectl)) {
                        throw new Error("The custom kubectl location of " + kubectl + " does not exist. See https://oc.to/KubernetesTarget for more information.");
                    }
                    _b.label = 3;
                case 3: return [4 /*yield*/, executor.execKubectl("\"" + kubectl + "\" version --client -o json")];
                case 4:
                    versionJson = _b.sent();
                    if (versionJson) {
                        version = JSON.parse(versionJson);
                        message = "kubectl is out of date, you need v" + KUBECTL_MAJOR + "." + KUBECTL_MINOR + " or higher.";
                        major = parseInt(version.clientVersion.major);
                        if (major < KUBECTL_MAJOR) {
                            throw new Error(message);
                        }
                        minor = parseInt(version.clientVersion.minor);
                        if (major === KUBECTL_MAJOR && minor < KUBECTL_MINOR) {
                            throw new Error(message);
                        }
                    }
                    manifestPath = path__namespace.resolve(crypto__namespace.randomBytes(8).toString("hex") + ".yaml");
                    context.printVerbose("Executing kubectl kustomize");
                    return [4 /*yield*/, executor.execKubectl("\"" + kubectl + "\" kustomize -o \"" + manifestPath + "\"")];
                case 5:
                    _b.sent();
                    context.setOctopusVariable("Octopus.Kustomize.Manifest.Path", manifestPath, false);
                    context.printVerbose("Applying kustomize manifest");
                    return [4 /*yield*/, executor.execKubectl("\"" + kubectl + "\" apply -f \"" + manifestPath + "\"")];
                case 6:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};

exports.KUBECTL_MAJOR = KUBECTL_MAJOR;
exports.KUBECTL_MINOR = KUBECTL_MINOR;
exports["default"] = KustomizeStepExecutor;
//# sourceMappingURL=executor.js.map
