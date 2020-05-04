<template>
  <div id="app">
    <div class="tops">
      <button @click="test">滚动到指定位置</button>
    </div>
    <div id="nav">
      <ktable
        ref="test"
        :data="data"
        :field="fields"
        :TdHeight="40"
        :row_key="['id']"
        :reserveSelection="true"
        :selectList.sync="select"
        @sort="sort"
        @scroll="scroll"
        @checkBoxAll="test"
      ></ktable>
      <ktable
        ref="asdv"
        :field="fields"
        :data="data"
        @sort="sort"
        @scroll="scroll"
        :selectList.sync="selects"
        :row_key="['id']"
        :reserveSelection="true"
        @checkBoxAll="clickDetail"
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
      data: Array.from(Array(99), (i, k) => {
        return { id: k, name: k + 1 };
      }),
      fields: fields.call(this),
      select: {},
      selects: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    test() {
      console.log(this.select);
      // this.$set(this.select, 2, {id: 2})
    },
    clickDetail(a) {
      console.log(a);
    },
    sort() {
      this.data = this.data.sort(function(a, b) {
        return b.id - a.id;
      });
    },
    onSearch() {},
    scroll() {
      // this.data.push({ id: this.data.length + 2 });
    },
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
