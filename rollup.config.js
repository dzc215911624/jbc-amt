import babel from 'rollup-plugin-babel'
// babel：将最终代码编译成 es5，我们的开发代码可以不用处理兼容性，主要用于把依赖也打包进来和转译
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
// resolve、commonjs：用于兼容可以依赖 commonjs 规范的包。
import serve from 'rollup-plugin-serve';
// 压缩
import { terser } from 'rollup-plugin-terser';
// 代码检查
import { eslint } from 'rollup-plugin-eslint'
// 清理注释
import cleanup from 'rollup-plugin-cleanup';

import copy from 'rollup-plugin-copy';

import path from "path";


// import glob from 'glob';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

export default {
  // input: Object.fromEntries(
  // 	glob.sync('src/**/*.js').map(file => [
  // 		path.relative(
  // 			'src',
  // 			file.slice(0, file.length - path.extname(file).length)
  // 		),
  // 		fileURLToPath(new URL(file, import.meta.url))
  // 	])
  // ),
  // output: {
  // 	format: 'es',
  // 	dir: 'dist'
  // },
  input: 'src/index.js',
  output: [
    {
      file: 'dist/amt.amd.js',
      format: 'amd',// 异步模块定义，用于像RequestJS这样的模块加载器。
      name: 'amt'
    },
    {
      file: 'dist/amt.iife.js',
      format: 'iife',// 一个自动执行的功能，适合作为 <script>标签这样的。
      name: 'amt'
    },
    {
      file: 'dist/amt.umd.js',
      format: 'umd',// 通用模块定义，以amd, cjs, 和 iife 为一体
      name: 'amt',
      // sourcemap: true,
    },
    {
      file: 'dist/amt.es.js',
      format: 'es',// 将软件包保存为ES模块文件。
      name: 'amt',
      // sourcemap: true,
    },
    {
      file: 'dist/amt.cjs.js',
      format: 'cjs',// CommonJS, 适用于Node或Browserify/webpack
      exports: 'auto', // 指定导出模式（自动、默认、命名、无）
    },
    {
      dir: path.dirname('dist/amt.cjs.js'),
      format: 'cjs',// CommonJS, 适用于Node或Browserify/webpack
      // exports: 'auto',
      exports: 'auto', // 指定导出模式（自动、默认、命名、无）
      preserveModules: true, // 保留模块结构
      // preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下}
      // sourcemap: true,
    }
  ],
  include: ['src'],
  external: [], // 排除模块 例如jquery
  exclude: ['test'], // 预留单元测试文件夹
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    process.env.BUILD === "development" && serve({
      open: true,
      contentBase: ['./'],
      port: 3000
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
      configFile: '.eslintrc.js', // ESLint 配置文件路径
      fix: true // 自动修复 ESLint 错误
    }),
    // 清理注释
    process.env.BUILD === "production" && cleanup(),
    // 压缩、混淆代码
    process.env.BUILD === "production" && terser(),
    process.env.BUILD === "production" && copy({
      targets: [
        { src: 'dist/array/*', dest: 'dist' },
        { src: 'dist/date/*', dest: 'dist' },
        { src: 'dist/canvas/*', dest: 'dist' },
        { src: 'dist/global/*', dest: 'dist' },
        { src: 'dist/optimize/*', dest: 'dist' },
        { src: 'dist/string/*', dest: 'dist' },
      ],
      flatten: true,
      verbose: true,
      hook: "writeBundle" //buildStart、buildEnd、generateBundle、writeBundle 
    }),
  ],
}