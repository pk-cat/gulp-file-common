# Gulp-file-common

## Installation

```shell
npm i gulp-file-common
```

## Usage

it used for bundling resources(scripts, pages, styles and fonts)

if you want to use this package, you need add a config file for page(The sibling directory of package.json), which called `pages.config.js`,
in this file, it show the path of resources.

here is example of this file:

```js
module.exports = {
  build: {
    src: "src", //your resources directory(need to be compressed and compiled, like styles file, scripts file, fonts and images)
    dist: "release", //bundle file directory
    temp: ".tmp", //temporary directory
    public: "public", // your resources(no need to be compressed and compiled, like favicon.ico)
    paths: {
      styles: "assets/styles/*.scss",
      scripts: "assets/scripts/*.js",
      pages: "**/*.html",
      images: "assets/images/**",
      fonts: "assets/fonts/**",
    },
  },
};
```

## API

### clean

```shell
gulp-file-common clean
```

remove bundle folder(.tmp and release)

### build

```shell
gulp-file-common build
```

bundle all resource(scripts, styles, fonts, pages) into folder(.tmp and release)

### start

```shell
gulp-file-common start
```

1. bundle some resource(scripts, styles, pages) into folder(.tmp)

2. then add a web server to run your project in a browser(port: 3002)

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

- [zce-pages](https://github.com/pk-cat/zce-pages)

## License

[MIT](LICENSE) &copy; [jchen](https://github.com/pk-cat/zce-pages.git)
