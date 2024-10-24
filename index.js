"use strict";
const merge = require("lodash").merge;

let settings = [];
let namespaceSettings = {};

function generateSettings(namespace, force) {
	let isNew = false;
	if (!(namespace in namespaceSettings)) {
		namespaceSettings[namespace] = {
			namespace: namespace,
			config: {},
		};
		isNew = true;
	}
	let s = namespaceSettings[namespace];
	if (isNew || force) {
		s.config = {};
		settings.forEach(setting => {
			if (namespace.match(setting.regex)) {
				s.config = merge(s.config, setting.config);
			}
		})
	}
	return s;
}

module.exports = function(namespace) {
	let mySettings = generateSettings(namespace);
	let subLogger = {};

	function logLazy(type, method, fn) {
		let config = mySettings.config[type];

		if (config && config.trace) {
			let args = fn && fn() || [];
			args = Array.isArray(args) ? args : [args];
			mySettings.config.printTimestamp && type !== 'time' && args.unshift(`[${(new Date()).toUTCString()}]`); //add timestamp to logs
			console[method].apply(console, args);
			let stack = new Error().stack;
			console.log(stack.split(/\n\s+at\s(?=\w)/m)[2]);
		} else if (config === true || mySettings.config.all) {
			let args = fn && fn() || [];
			args = Array.isArray(args) ? args : [args];
			mySettings.config.printTimestamp && type !== 'time' && args.unshift(`[${(new Date()).toUTCString()}]`); //add timestamp to logs
			console[method].apply(console, args);
		}

	}
	function log(type, method, ...args) {
		if (type != "time") {
			args = [namespace].concat(args)
		}
		//only show it if there is actually an error
		if (type !== "error" || (args.length > 1 || args[0])) {
			let config = mySettings.config[type];

			mySettings.config.printTimestamp && type !== 'time' && args.unshift(`[${(new Date()).toUTCString()}]`); //add timestamp to logs
			if (config && config.trace) {
				console[method].apply(console, args);
				let stack = new Error().stack;
				console.log(stack.split(/\n\s+at\s(?=\w)/m)[2]);
			} else if (config === true || mySettings.config.all) {
				console[method].apply(console, args);
			}
		}
	}
	function isEnabled(type) {
		let config = mySettings.config[type];
		return config === true || mySettings.config.all;
	}

	return {
		sub: (n) => {
			if (!(n in subLogger)) {
				subLogger[n] = module.exports(namespace + "." + n);
			}
			return subLogger[n];
		},
		info: log.bind(log, 'info', 'log'),
		json: function() {
			for (let i = 0; i < arguments.length; i++) {
				log("info", "log", JSON.stringify(arguments[i], null, 2));
			}
		},
		time: log.bind(log, 'time', 'time'),
		timeEnd: log.bind(log, 'time', 'timeEnd'),
		log: log.bind(log, 'info', 'log'),
		debug: log.bind(log, 'debug', 'debug'),
		trace: log.bind(log, 'trace', 'trace'),
		error: log.bind(log, 'error', 'error'),
		warn: log.bind(log, 'warn', 'warn'),

		infoLazy: logLazy.bind(logLazy, 'info', 'log'),
		logLazy: logLazy.bind(logLazy, 'info', 'log'),
		debugLazy: logLazy.bind(logLazy, 'debug', 'debug'),
		traceLazy: logLazy.bind(logLazy, 'trace', 'trace'),
		errorLazy: logLazy.bind(logLazy, 'error', 'error'),
		warnLazy: logLazy.bind(logLazy, 'warn', 'warn'),

		isEnabled: isEnabled.bind(isEnabled),
		isInfo: isEnabled.bind(isEnabled, "info"),
		isLog: isEnabled.bind(isEnabled, "info"),
		isDebug: isEnabled.bind(isEnabled, "debug"),
		isError: isEnabled.bind(isEnabled, "error"),
		isWarn: isEnabled.bind(isEnabled, "warn"),

		configure: function(s, config) {
			if (s === true) {
				settings.push({
					regex: /.*/,
					config: {
						all: true
					}
				});
			} else {
				settings.push({
					regex: typeof s === "string" ? new RegExp(s) : s,
					config: config || {
						all: true
					}
				});
			}
			Object.keys(namespaceSettings).forEach(namespace => generateSettings(namespace, true));
		}
	};
};

Object.assign(module.exports, module.exports('global'));
module.exports.configure(/.*/, {
	error: true
});

if (process.env.LEO_LOGGER) {
	if (process.env.LEO_LOGGER == "true") {
		module.exports.configure(true);
	} else {
		let loggers = process.env.LEO_LOGGER.split(";");
		loggers.forEach(logger => {
			let parts = logger.split("/");
			let regex;
			let config;
			let lookup = {
				a: "all",
				t: "time",
				i: "info",
				d: "debug",
				e: "error",
				s: "info",
				v: "debug",
				w: "warn",
				x: "trace",
				T: "printTimestamp",
				j: "json"
			};

			if (parts.length == 1 && parts[0] == '') {
				return;
			}
			if (parts.length == 1) {
				regex = new RegExp(parts[0]);
			} else if (parts.length > 2) {
				regex = new RegExp(parts[1]);
				let flags = parts[2];
				config = {
					all: flags.length == 0
				};
				for (let i = 0; i < flags.length; i++) {
					if (flags[i] in lookup) {
						config[lookup[flags[i]]] = true;
					}
				}
			}
			module.exports.configure(regex, config);
		});
	}
}
