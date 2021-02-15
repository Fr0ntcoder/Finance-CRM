import localizeFilter from "@/filters/localize.filter"
export default {
    install(Vue) {
        Vue.prototype.$title = function(titleKey) {
            return `${localizeFilter(titleKey)} | Финансы CRM`;
        }
    }
}