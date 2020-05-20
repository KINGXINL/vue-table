<template>
  <div class="k-table-header" :class="[field.sort?'item-sort':'']">
    <template v-if="field.key == 'selection'">
      <div class="text">
        <checkBox :checked.sync="vue.selectAll" @checkChange="checkAll"></checkBox>
      </div>
    </template>
    <template v-if="field.key != 'selection'">
      <div class="text" @click="itemSort()">
        <div class="title">{{field.title}}</div>
        <template v-if="field.sort">
          <div class="headersort">
            <div
              class="dump"
              :class="[vue.isSort == 1 && vue.sortKey == field.key ?'sort-dump-active':'']"
            ></div>
            <div
              class="up"
              :class="[vue.isSort == 2 && vue.sortKey == field.key ?'sort-up-active':'']"
            ></div>
          </div>
        </template>
      </div>
      <div v-if="field.renderHeader" class="render">
        <component
          :render="field.renderHeader"
          :params="{column: field,index: field.key}"
          :is="renderView"
        ></component>
      </div>
    </template>
  </div>
</template>

<script>
import child from "./child.js";
import checkBox from "./checkBox.vue";
export default {
  inject: ["vue"],
  components: {
    checkBox
  },
  data() {
    return {
      renderView: child
    };
  },
  props: {
    field: {
      value: Object,
      default: () => {}
    }
  },
  methods: {
    itemSort() {
      if (this.field.sort) {
        switch (this.vue.isSort) {
          case 0:
            this.vue.isSort = 1;
            break;
          case 1:
            if (this.field.key == this.vue.sortKey) {
              this.vue.isSort = 2;
            } else {
              this.vue.isSort = 1;
            }
            break;
          case 2:
            if (this.field.key == this.vue.sortKey) {
              this.vue.isSort = 0;
            } else {
              this.vue.isSort = 1;
            }
            break;
        }
        this.vue.$emit("itemSort", {
          sort: this.vue.isSort,
          key: this.field.key
        });
      }
    },
    checkAll(v) {
      // this.$emit("update:AllSelect", v);
      this.vue.selectAll = v;
      this.vue.$emit("checkAll", v);
    }
  }
};
</script>

<style lang="scss" scoped>
.item-sort {
  cursor: pointer;
}
.k-table-header {
  overflow: hidden;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 6px;
  input {
    width: 100%;
  }
  .text {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 5px;
    line-height: 19px;
    .title {
      padding-right: 2px;
    }
    .up {
      width: 0;
      height: 0;
      border-top: 4px solid #c3c3c3;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }
    .dump {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid #c3c3c3;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      margin-bottom: 2px;
    }
    .sort-up-active {
      border-top: 4px solid #2f54eb;
    }
    .sort-dump-active {
      border-bottom: 4px solid #2f54eb;
    }
  }
  .render {
    display: flex;
    padding: 0 0 5px 0;
  }
}
</style>