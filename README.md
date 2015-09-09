CSS Modules experiment
====

Exploring the idea of what [CSS Modules](https://github.com/css-modules/css-modules) could look like if we didn't overload `require`. So instead, load styles with the `cmify` module. Eg.

```
import cmify from 'cmify'
const styles = cmify('./styles/foo.css')

module.exports = `<div class="${styles.root}">hello</div>`
```

## What does a CSS Module export?

The only thing a CSS Module needs to export is some form of CSS, and it doesn't matter where that comes from. So a CSS Module could be:

- a `.js` module that exports a css string
- a `.js` module that exports a `jss` object
- an actual `.css` file

CSS Modules done in this way can also use functions and import data or styles from other modules, just like a js module. The only thing that matters is the export.

## Is this a viable way to do CSS Modules?

Maybe :) I'm interested to know how it changes things when CSS modules is framed in terms of functions with inputs, rather than static files that are processed.

Even if you're using static `.css` files to define your CSS Modules we can consider this a module by wrapping it with:

```
export default `
  ... content of css file goes here ...
`
```

## Building assets

I'm using browserify for this experiment but actually most of the interesting stuff happens before it even gets to browserify.

As part of the build step we first run the app in node (using `process.browser` guards for any browser-specific things). This allows `cmify` to collect all style dependencies and produce:

- a css file containing all generated styles
- a json manifest containing all classname exports and their locally-scoped couterparts

## Next steps

- make a more complete example
- add `composes` support
- fix some issues with paths
