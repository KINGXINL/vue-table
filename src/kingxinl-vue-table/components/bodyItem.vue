<template>
  <div class="body" :style="{ height: vue.TdHeight + 'px' }">
    <div
      class="body-main"
      :style="{ lineHeight: vue.TdHeight + 'px' }"
      :class="
        field.align == 'left'
          ? 'body-main-left'
          : field.align == 'right'
          ? 'body-main-right'
          : ''
      "
    >
      <template>
        <template v-if="field.key == 'selection'">
          <checkBox :checked.sync="checkStatus" @checkChange="checkOne">
          </checkBox>
        </template>
        <template v-else-if="field.value">
          {{ field.value(value, index) }}
        </template>
        <template v-else-if="field.render">
          <component
            :render="field.render"
            :params="{
              column: field,
              key: field.key,
              value: value,
              index: index,
            }"
            :is="renderView"
          ></component>
        </template>
        <template v-else>
          {{ value[field.key] }}
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import checkBox from "./checkBox.vue";
import child from "./child.js";
export default {
  inject: ["vue"],
  components: {
    checkBox,
  },
  data() {
    return {
      renderView: child,
      status: false,
      checkStatus: false,
    };
  },
  created() {
    if (this.vue.row_key.length > 0) {
      let Key = [];
      for (let rowKey of this.vue.row_key) {
        Key.push(this.value[rowKey]);
      }
      this.checkStatus = Key.join(this.vue.row_join) in this.vue.selectData;
    } else {
      this.checkStatus = this.index in this.vue.selectData;
    }
  },
  mounted() {},
  props: {
    value: {
      value: Object,
      default: () => {},
    },
    field: {
      value: Object,
      default: () => {},
    },
    index: {
      value: Number,
    },
    select: {
      value: Array,
      default: () => [],
    },
  },
  watch: {
    select() {
      if (this.vue.row_key.length > 0) {
        let Key = [];
        for (let rowKey of this.vue.row_key) {
          Key.push(this.value[rowKey]);
        }
        this.checkStatus = Key.join(this.vue.row_join) in this.vue.selectData;
      } else {
        this.checkStatus = this.index in this.vue.selectData;
      }
    },
    value() {
      if (this.vue.row_key.length > 0) {
        let Key = [];
        for (let rowKey of this.vue.row_key) {
          Key.push(this.value[rowKey]);
        }
        this.checkStatus = Key.join(this.vue.row_join) in this.vue.selectData;
      } else {
        this.checkStatus = this.index in this.vue.selectData;
      }
    },
  },
  methods: {
    checkOne(v) {
      this.vue.$emit("checkOne", {
        status: v,
        index: this.index,
        value: this.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .body-main {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 5px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .body-main-left {
    text-align: left;
  }
  .body-main-right {
    text-align: right;
  }
}
</style>