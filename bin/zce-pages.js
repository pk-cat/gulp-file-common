#!/usr/bin/env node

// 添加参数配置路径
process.argv.push("--cwd");
process.argv.push(process.cwd());
// 添加参数配置gulpfile的位置
process.argv.push("--gulpfile");
process.argv.push(require.resolve("..."));

require("gulp/bin/gulp");
