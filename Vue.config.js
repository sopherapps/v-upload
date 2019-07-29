module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/v-upload/" : "/",
  configureWebpack: {
    externals: {
      vuetify: "vuetify"
    }
  }
};
