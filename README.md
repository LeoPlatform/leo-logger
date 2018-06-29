# Leo-Logger
Such an awesome logger that we had to break it out from the LEO SDK and make it its own project!

## Available methods
 * sub
 * info
 * json
 * time
 * timeEnd
 * log
 * debug
 * error
 * configure

## Available configuration options
 * a = all
 * t = time
 * i = info
 * d = debug
 * e = error
 * T = printTimestamp

## Usage example:
```bash
export LEO_LOGGER='/.*/tide'
```

### Loggers
```javascript
logger.log('my logged message');
logger.info('my info');
logger.debug('just some debugging code');

```

### Timers
```javascript
// start a timer
logger.time('myTimer');
// stop a timer
logger.timeEnd('endTimer');
```

## To-Do
More documentation with examples with code and output.

# Support
Want to hire an expert, or need technical support? Reach out to the Leo team: https://leoinsights.com/contact
