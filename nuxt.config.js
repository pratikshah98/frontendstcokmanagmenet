const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel:"apple-touch-icon" ,href:"/app-assets/images/ico/apple-icon-120.png"},
      { rel:"shortcut icon" ,type:"image/x-icon", href:"/app-assets/images/ico/favicon.ico"},
      {rel:"stylesheet" , href:"https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" },
      { rel:"stylesheet" ,href:"/app-assets/vendors/css/vendors.min.css"},
      { rel:"stylesheet" ,href:"/app-assets/vendors/css/charts/apexcharts.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/bootstrap.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/bootstrap-extended.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/colors.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/components.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/themes/dark-layout.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/themes/semi-dark-layout.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/core/menu/menu-types/vertical-menu.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/core/colors/palette-gradient.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/pages/dashboard-ecommerce.css"},
      { rel:"stylesheet" ,href:"/app-assets/css/pages/card-analytics.css"},
      { rel:"stylesheet" ,href:"/assets/css/style.css"}
    ],

  script:[
    {src:"/app-assets/vendors/js/vendors.min.js"},
    {src:"/app-assets/vendors/js/charts/apexcharts.min.js"},
    {src:"/app-assets/js/core/app-menu.js"},
    {src:"/app-assets/js/core/app.js"},
    {src:"/app-assets/js/scripts/components.js"},
    {src:"/app-assets/js/scripts/pages/dashboard-ecommerce.js"}
  ]
},

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
