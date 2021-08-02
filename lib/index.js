// gulp 入口文件
const { src, dest, parallel, series, watch } = require("gulp");
// 开发服务器插件
const browserSync = require("browser-sync");
// 生成web服务器
const bs = browserSync.create();
// 删除文件
const del = require("del");
// gulp的插件包
const loadPlugins = require("gulp-load-plugins");
// 获取到所有插件
const plugins = loadPlugins();

// sass需要指定是基于node-sass还是sass来运行的
const sass = plugins.sass(require("sass"));

//引入node的path模块
const path = require("path");

/** 获取到当前文件的运行目录 */
const cwd = process.cwd();

let config = {
  // config of path
  build: {
    src: "src",
    dist: "dist",
    temp: "temp",
    public: "public",
    paths: {
      styles: "assets/styles/*.scss",
      scripts: "assets/scripts/*.js",
      pages: "**/*.html",
      images: "assets/images/**",
      fonts: "assets/fonts/**",
    },
  },
};

try {
  //尝试获取到文件夹中的配置文件
  const loadConfig = require(path.join(cwd, "pages.config.js"));
  config = Object.assign({}, config, loadConfig);
} catch (error) {
  throw error;
}

// 先删除dist. temp文件夹及其包含的内容
const clean = () => {
  return del([config.build.dist, config.build.temp]);
};

const style = () => {
  return (
    src(config.build.paths.styles, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // 使用sass和gulp-sass编译
      .pipe(sass())
      // 编译目录
      .pipe(dest(config.build.temp))
      // 当文件发生变化后重新加载web服务器
      .pipe(bs.reload({ stream: true }))
  );
};

const script = () => {
  return (
    src(config.build.paths.scripts, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // 使用babel插件转译(采用@babel/reset-env能识别最新es语法然后去编译)
      .pipe(plugins.babel({ presets: [require("@babel/preset-env")] }))
      // 编译目录
      .pipe(dest(config.build.temp))
      // 当文件发生变化后重新加载web服务器
      .pipe(bs.reload({ stream: true }))
  );
};

const page = () => {
  return (
    src(config.build.paths.pages, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // 模板引擎渲染(使用config配置中的data)
      .pipe(plugins.swig({ data: config.data }))
      // 编译目录
      .pipe(dest(config.build.temp))
      // 当文件发生变化后重新加载web服务器
      .pipe(bs.reload({ stream: true }))
  );
};

const images = () => {
  return (
    src(config.build.paths.images, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // 压缩图片
      .pipe(plugins.imagemin())
      // 编译目录
      .pipe(dest(config.build.dist))
  );
};

const fonts = () => {
  return (
    src(config.build.paths.fonts, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // 压缩字体文件
      .pipe(plugins.imagemin())
      // 编译目录
      .pipe(dest(config.build.dist))
  );
};

/** 编译public文件夹下的内容 */
const extra = () => {
  return src("**", {
    base: config.build.public,
    cwd: config.build.public,
  }).pipe(dest(config.build.dist));
};

/** 打开web服务器 */
const serve = () => {
  // 采用watch api 来监听文件变化，并且监听到变化后执行对应命令
  watch(config.build.paths.styles, { cwd: config.build.src }, style);
  watch(config.build.paths.scripts, { cwd: config.build.src }, script);
  watch(config.build.paths.pages, { cwd: config.build.src }, page);
  // 分别监听图片字体和其他文件
  // watch("src/assets/images/**", images);
  // watch("src/assets/fonts/**", fonts);
  // watch("public/**", extra);

  // 监听多个文件，当文件发生变化，web服务器重新加载
  watch(
    [config.build.paths.images, config.build.paths.fonts],
    { cwd: config.build.src },
    bs.reload
  );
  watch("**", { cwd: config.build.public }, bs.reload);

  bs.init({
    // 关闭浏览器提示
    notify: false,
    // web服务器打开的端口
    port: 3002,
    // 监听目录，当目录中的内容发生更改自动加载  (可以使用bs.reload手动加载)
    // files: "dist/**",
    // 服务器配置
    server: {
      // 服务器从dist中找到对应的资源来渲染，当在dist中找不到的时候去src和public中找
      baseDir: [config.build.temp, config.build.src, config.build.public],
      // 对引用的源文件进行映射，优先级高于dist
      routes: { "/node_modules": "node_modules" },
    },
  });
};

/** 对引用的源文件进行映射 */
const useref = () => {
  return (
    src("**", { base: config.build.temp, cwd: config.build.temp })
      .pipe(plugins.useref({ searchPath: [config.build.temp, "."] }))
      // 压缩html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            // 去掉空白字符
            collapseWhitespace: true,
            // 简化对应css
            minifyCSS: true,
            // 简化对应js
            minifyJS: true,
          })
        )
      )
      .pipe(dest(config.build.dist))
  );
};

// 编译任务（不包含图片字体）
const compile = parallel(style, script, page);

// 上线之前的编译（包括图片字体等）
const build = series(
  clean,
  parallel(series(compile, useref), images, fonts, extra)
);

// 开发任务
const develop = series(compile, serve);

const start = series(clean, develop);

const deploy = series(build, serve);

module.exports = {
  clean,
  build,
  start,
};
