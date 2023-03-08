import esbuild from 'esbuild'

const ctx = await esbuild.context({
    entryPoints: ['src/main.jsx'],
    outfile: 'js/main.js',
    bundle: true,
})

let { host, port } = await ctx.serve({
    servedir: './',
})

console.log(`serving at http://localhost:${port}`)
