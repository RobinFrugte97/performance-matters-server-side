# performance-matters-server-side

## Bundled JS


![]()


## Minified HTML

I had a bunch of whitespace in my html on the client side, after ejs had rendered the html.
I used express-minify-html to minify html.

`npm install --save --production express-minify-html express`

```
var minifyHTML = require('express-minify-html');
 
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
```

You can use the code above to minify your html. You can also use that code to configure how you want to minify your html.
