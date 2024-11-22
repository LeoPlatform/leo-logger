declare module 'leo-logger' {
	interface OutType {

		(namespace: string): OutType;

		sub(namespace: string): OutType;

		info: typeof console.info;
		json(...arg: any[]);
		time: typeof console.time;
		timeEnd: typeof console.timeEnd;
		log: typeof console.log;
		debug: typeof console.debug;
		trace: typeof console.trace;
		error: typeof console.error;
		warn: typeof console.warn;

		infoLazy(fn: () => any | any[]);
		logLazy(fn: () => any | any[]);
		debugLazy(fn: () => any | any[]);
		traceLazy(fn: () => any | any[]);
		errorLazy(fn: () => any | any[]);
		warnLazy(fn: () => any | any[]);

		isEnabled(): boolean;
		isInfo(): boolean;
		isLog(): boolean;
		isDebug(): boolean;
		isError(): boolean;
		isWarn(): boolean;

		configure(s: boolean | string | RegExp, config?: boolean | {
			all?: boolean;
			time?: boolean;
			info?: boolean;
			debug?: boolean;
			error?: boolean;
			warn?: boolean;
			trace?: boolean;
			printTimestamp?: boolean;
			json?: boolean;
		});
	}

	const exp: OutType;
	export = exp

} 
