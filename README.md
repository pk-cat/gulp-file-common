# zce-pages

[![Build Status][actions-img]][actions-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> Awesome node modules.

## Installation

```shell
$ npm install zce-pages

# or yarn
$ yarn add zce-pages
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const zcePages = require('zce-pages')
const result = zcePages('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### zcePages(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [jchen](https://github.com/pk-cat/zce-pages.git)



[actions-img]: https://img.shields.io/github/workflow/status/pk-cat/zce-pages/CI
[actions-url]: https://github.com/pk-cat/zce-pages/actions
[codecov-img]: https://img.shields.io/codecov/c/github/pk-cat/zce-pages
[codecov-url]: https://codecov.io/gh/pk-cat/zce-pages
[license-img]: https://img.shields.io/github/license/pk-cat/zce-pages
[license-url]: https://github.com/pk-cat/zce-pages/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/zce-pages
[downloads-url]: https://npm.im/zce-pages
[version-img]: https://img.shields.io/npm/v/zce-pages
[version-url]: https://npm.im/zce-pages
[dependency-img]: https://img.shields.io/david/pk-cat/zce-pages
[dependency-url]: https://david-dm.org/pk-cat/zce-pages
[devdependency-img]: https://img.shields.io/david/dev/pk-cat/zce-pages
[devdependency-url]: https://david-dm.org/pk-cat/zce-pages?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
