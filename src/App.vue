<template>
  <div id="app">
    <div class="tops"></div>
    <div id="nav">
      <ktable
        :field="fields"
        :data="data"
        @sort="sort"
        @scroll="scroll"
        :row_key="['id']"
        :reserveSelection="true"
        :TdHeight="40"
      ></ktable>
    </div>
    <div class="fool"></div>
  </div>
</template>

<script>
import ktable from "@/kingxinl-vue-table/index.vue";
import fields from "./fieldList.js";
export default {
  components: {
    ktable
  },
  data() {
    return {
      data: Array.from(Array(70), (i, k) => {
        return { id: k };
      }),
      fields: fields.call(this),
      i: 1
    };
  },
  created() {},
  mounted() {},
  methods: {
    sort() {
      this.data = this.data.sort(function(a, b) {
        return b.id - a.id;
      });
    },
    onSearch() {},
    scroll() {},
    toModifyPage(v) {
      console.log(v);
    }
  }
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  height: 300px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#app {
  display: flex;
  flex-direction: column-reverse;
  .tops {
    flex-grow: 1;
  }
  #nav {
    flex-grow: 2;
  }
  .fool {
    flex-grow: 3;
  }
}
</style>
