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

		infoLazy(fn: (...args: any[]) => void);
		logLazy(fn: (...args: any[]) => void);
		debugLazy(fn: (...args: any[]) => void);
		traceLazy(fn: (...args: any[]) => void);
		errorLazy(fn: (...args: any[]) => void);
		warnLazy(fn: (...args: any[]) => void);

		isEnabled(): boolean;
		isInfo(): boolean;
		isLog(): boolean;
		isDebug(): boolean;
		isError(): boolean;
		isWarn(): boolean;
	}

	const exp: OutType;
	export = exp

} 
