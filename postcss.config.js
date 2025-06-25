const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR || process.cwd(), id.substr(3));
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR || process.cwd(), id.substr(2));
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR || process.cwd(), id.substr(1));
        }
        return id;
      },
    }),
    require('autoprefixer')({ remove: false })
  ]
}
