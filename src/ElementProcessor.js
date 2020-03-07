"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("./Utilities");
const VideoElement_1 = require("./VideoElement");
const path_1 = require("path");
class ElementProcessor {
    constructor(id, config) {
        this.mainPath = "processors";
        this.elements = [];
        this.preserveProccess = false;
        this.log = false;
        this.add = (videoElement) => {
            videoElement.id = this.elements.length;
            this.elements.push(videoElement);
        };
        this.processElements = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let processedElements = [];
            yield this.setupPlugins();
            yield this.setupAssets();
            yield Utilities_1.asyncForEach(this.elements, (videoElement) => __awaiter(this, void 0, void 0, function* () {
                var e = yield VideoElement_1.processElement(videoElement, {
                    customDir: this.path,
                    preserveProccess: this.preserveProccess,
                    log: this.log
                });
                processedElements.push(e);
            }));
            if (!this.preserveProccess)
                this.removePlugins();
            resolve(processedElements);
        }));
        this.getPlugins = () => {
            let plugins = [];
            this.elements.forEach((elem) => {
                const config = Utilities_1.getJSON(path_1.join('templates', elem.templateConfig.name, elem.templateConfig.name) + '.json');
                const elemPlugin = config.plugins || [];
                if (elemPlugin)
                    elemPlugin.forEach(plugin => plugins.push(plugin));
            });
            return [...new Set(plugins)]; // removes the same elements
        };
        this.setupPlugins = () => __awaiter(this, void 0, void 0, function* () {
            const pluginsPath = Utilities_1.getOrCreateDir(path_1.join(this.path, 'plugins'));
            ;
            let pluginsSrc = Utilities_1.pluginsUtilities.getSrc(this.getPlugins());
            yield pluginsSrc.forEach((plugin) => __awaiter(this, void 0, void 0, function* () {
                const origin = path_1.join('src', 'plugins', plugin);
                const destination = path_1.join(pluginsPath, plugin);
                yield Utilities_1.copyFile(origin, destination);
            }));
        });
        this.removePlugins = () => Utilities_1.removeDir(path_1.join(this.path, 'plugins'));
        this.setupAssets = () => {
            const resourcesPath = Utilities_1.getOrCreateDir(path_1.join(this.path, 'assets'));
            ;
        };
        this.id = id;
        this.customPath = `processor_${id}`;
        if (config) {
            this.customPath = config.customDir || this.customPath;
            this.preserveProccess = config.preserveProccess || false;
            this.log = config.log || false;
        }
        this.path = path_1.join(this.mainPath, this.customPath);
    }
}
exports.ElementProcessor = ElementProcessor;
