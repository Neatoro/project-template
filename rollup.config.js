import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import * as path from 'path';
import postcss from 'rollup-plugin-postcss';
import { readdirSync, lstatSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';

function getFiles(dir, ext) {
    const fullPath = path.resolve(__dirname, dir);
    const files = readdirSync(fullPath);
    const fullFiles = files
        .map((file) => path.resolve(__dirname, dir, file));

    const extFiles = fullFiles.filter((file) => path.extname(file) === ext);
    const subFiles = fullFiles
        .filter((file) => lstatSync(file).isDirectory())
        .flatMap((file) => getFiles(file, ext));

    return [...extFiles, ...subFiles];
}

export default [
    {
        input: getFiles('src/backend', '.ts'),
        output: {
            dir: 'dist',
            format: 'cjs'
        },
        plugins: [
            typescript()
        ]
    },
    {
        input: 'src/frontend/index.js',
        output: {
            file: 'dist/public/app.js',
            format: 'es'
        },
        plugins: [
            resolve(),
            vue({
                css: false
            }),
            commonjs(),
            postcss({
                extract: 'app.css'
            }),
            alias({
                resolve: ['.js', '.ts'],
                entries: [
                    { find: 'vue', replacement: 'src/frontend/node_modules/vue/dist/vue.runtime.esm-bundler.js'}
                ]
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.VUE_ENV': JSON.stringify('browser'),
                '__VUE_OPTIONS_API__': true,
                '__VUE_PROD_DEVTOOLS__': false,
                preventAssignment: true
            }),
            copy({
                targets: [
                    { src: 'src/frontend/index.html', dest: 'dist/public' }
                ]
            })
        ]
    }
];
