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
      { rel:"stylesheet" ,href:"/assets/css/style.css"},
      {rel:"stylesheet" , href:"/app-assets/css/plugins/forms/wizard.min.css"},
      { rel:"stylesheet" , href:"/app-assets/vendors/css/tables/datatable/datatables.min.css"},
        
      //for alert
      {rel:"stylesheet" , href:"/app-assets/vendors/css/animate/animate.css"},
      {rel:"stylesheet" , href:"/app-assets/vendors/css/extensions/sweetalert2.min.css"},

      //for invoice
      {rel:"stylesheet" , href:"/app-assets/css/pages/invoice.css"},
      //for login and forget password:- 
      
      //for select2 - auto suggest
      {rel:"stylesheet" , href:"/assets/css/select2.min.css"},
      

      {rel:"stylesheet" , href:"/app-assets/css/pages/authentication.css"}
    ],


  script:[

    {
      src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
      type: "text/javascript"
    },
    
    {src:"/app-assets/vendors/js/vendors.min.js"},
    {src:"/app-assets/vendors/js/charts/apexcharts.min.js"},
    {src:"/app-assets/js/core/app-menu.js"},
    {src:"/app-assets/js/core/app.js"},
    {src:"/app-assets/js/scripts/components.js"},
    {src:"/app-assets/js/scripts/pages/dashboard-ecommerce.js"},

    // for Form
    {src:"/app-assets/js/scripts/forms/wizard-steps.min.js"},
   {src:"/app-assets/vendors/js/extensions/jquery.steps.min.js"},
   {src:"/app-assets/vendors/js/forms/validation/jquery.validate.min.js"},
    //--------------


    //for datatables
    { src:"/app-assets/js/scripts/datatables/datatable.js"} ,    
    {src:"/app-assets/vendors/js/tables/datatable/pdfmake.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/vfs_fonts.js"},
    {src:"/app-assets/vendors/js/tables/datatable/datatables.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/datatables.buttons.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/buttons.html5.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/buttons.print.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/buttons.bootstrap.min.js"},
    {src:"/app-assets/vendors/js/tables/datatable/datatables.bootstrap4.min.js"},
    //---------------

    //for alert
    {src:"/app-assets/vendors/js/extensions/sweetalert2.all.min.js"},
    {src:"/app-assets/vendors/js/extensions/polyfill.min.js"},
    {src:"/app-assets/js/scripts/extensions/sweet-alerts.js"},
    {src:"/app-assets/vendors/js/extensions/polyfill.min.js"},

    
    //for invoice
    {src:"/app-assets/js/scripts/pages/invoice.js"},
    
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
    { src: '/assets/js/select2.min.js'},
    
    //for validation
  //  { src: '/node-modules/vuelidate/dist/vuelidate.min.js' }
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
    { src: '~/plugins/vue-datepicker', ssr: false },    // ssr=false will stop server-side-rendering of datepicker
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
