/* Main */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Loader from "@/components/Loader"
import messagePlugin from "@/utils/message.plugin"
import titlePlugin from "@/utils/title.plugin"
import tooltipDirective from "@/directives/tooltip"
import Paginate from 'vuejs-paginate'

/* Firebase */
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

/* Materialize */
import M from 'materialize-css' 
import "materialize-css";
import 'materialize-css/dist/css/materialize.min.css'

/* Filters */
import dateFilter from "@/filters/date.filter"
import localizeFilter from "@/filters/localize.filter"
import currencyFilter from "@/filters/currency.filter"
Vue.filter("date",dateFilter)
Vue.filter("currency",currencyFilter)
Vue.filter("localize",localizeFilter)
Vue.directive("tooltip",tooltipDirective)
Vue.component("Loader",Loader)
Vue.component('Paginate', Paginate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.use(M)
Vue.use(messagePlugin)
Vue.use(Vuelidate);

/* Font awesome icon*/
import { library } from "@fortawesome/fontawesome-svg-core"
import {faBars,faSortDown,faCalculator,faHistory,faCalendarAlt,faPen,faFolderOpen,faPaperPlane,faChevronRight,faExternalLinkAlt,faRedoAlt,faPlus,faUserCircle,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faBars,faSortDown,faCalculator,faHistory,faCalendarAlt,faPen,faFolderOpen,faPaperPlane,faChevronRight,faExternalLinkAlt,faRedoAlt,faPlus,faUserCircle,faSignOutAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon)

firebase.initializeApp({
  apiKey: "AIzaSyDs3vIYLkJSL3sZCjvVGV_JAv23wKtX7vg",
  authDomain: "vue-crm-df791.firebaseapp.com",
  projectId: "vue-crm-df791",
  storageBucket: "vue-crm-df791.appspot.com",
  messagingSenderId: "469869442541",
  appId: "1:469869442541:web:b532bf11c865b6215223e4"
});
let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
});

Vue.config.productionTip = false;
