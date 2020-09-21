<template>
  <div id="app">
    <div id="nav">
      <ktable
        ref="test"
        :data="data"
        :field="fields"
        :TdHeight="40"
        :row_key="['id']"
        :reserveSelection="true"
        :selectList.sync="select"
        :clickShow="xxx"
        @sort="sort"
      ></ktable>
      <!-- <ktable
        ref="asdv"
        :field="fields"
        :data="data"
        @sort="sort"
        :selectList.sync="selects"
        :row_key="['id']"
        :reserveSelection="true"
        :TdHeight="40"
      ></ktable> -->
    </div>
    <div class="fool"></div>
  </div>
</template>

<script>
import ktable from "@/kingxinl-vue-table/index.vue";
import fields from "./fieldList.js";
export default {
  provide() {
    return {
      vue: this,
    };
  },
  components: {
    ktable,
  },
  data() {
    return {
      data: Array.from(Array(111), (i, k) => {
        return { id: k, name: k + 1, backgound: "red", color: "#fff" };
      }),
      fields: fields.call(this),
      select: {},
      selects: {},
      xxx: true,
    };
  },
  methods: {
    sort() {
      this.data = this.data.sort(function (a, b) {
        return b.id - a.id;
      });
    },
  },
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
  // display: flex;
  // flex-direction: column-reverse;
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
