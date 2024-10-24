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
 * warn
 * trace
 * configure

## Available configuration options
 * a = all
 * t = time
 * i = info
 * d = debug
 * e = error
 * w = warn
 * x = trace
 * j = json
 * T = printTimestamp

## Usage example:
```bash
export LEO_LOGGER='/.*/d'
```

```bash
export LEO_LOGGER='/my-logger/wei;/.*/ei'
```


## Working with namespaces
You can log logs for specific namespaces by passing a string when requiring the leo-logger. Example:
```javascript
const logger = require('leo-logger')('my-special-namespace');
```
When you use a namespace, logging works the same, but the output will be prefixed with the namespace:
```javascript
logger.log('My namespaced log');
// outputs: my-special-namespace my namespaced log
```

If you want to display logs for certain namespaces only, you can adjust LEO_LOGGER to match the namespace.
```bash
# Example outputting all logs for my-special-namespace
export LEO_LOGGER='/my\-special\-namespace/a'
```

You may notice in the previous example how it appears we’re using regex. This allows you to employ more powerful namespace logging.
As an example, let’s say you have a shopping cart, and you want to have logs specific to the checkout process.
Each of the checkout pages would include the leo-logger. I'm going to use an example of 2 checkout pages, which would look like this:
```javascript
const logger = require('leo-logger')('checkout-payment');
```
```javascript
const logger = require('leo-logger')('checkout-process-order');
```

Then if you want to display logs for the process-order page, you would do this:
```bash
export LEO_LOGGER='/checkout\-process\-order/a'
```
But if you want to display logs for all checkout pages, you can use the power of regex to select everything starting with “checkout”:
```bash
export LEO_LOGGER='/checkout.*/a'
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
