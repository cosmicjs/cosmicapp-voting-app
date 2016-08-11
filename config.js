module.exports = {
  env: process.env.NODE_ENV,
  cosmicjs: {
    bucket: {
      slug: process.env.COSMIC_BUCKET || 'voting-app',
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    }
  }
}
