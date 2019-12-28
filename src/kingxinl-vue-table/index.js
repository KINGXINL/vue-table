import KingxinlVueTable from "./index.vue";
KingxinlVueTable.install = Vue => {
  Vue.component(KingxinlVueTable.name, KingxinlVueTable);
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default KingxinlVueTable;
