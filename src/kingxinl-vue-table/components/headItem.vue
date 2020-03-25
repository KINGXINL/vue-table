<template>
  <div class="k-table-header" :class="[field.sort?'item-sort':'']">
    <template v-if="field.key == 'selection'">
      <checkBox :checked.sync="isAllCheck" @checkChange="checkAll"></checkBox>
    </template>
    <template v-if="field.key != 'selection'">
      <div class="text" @click="itemSort()">
        <div class="title">{{field.title}}</div>
        <template v-if="field.sort">
          <div class="headersort">
            <div class="dump" :class="[isSort == 1?'sort-dump-active':'']"></div>
            <div class="up" :class="[isSort == 2?'sort-up-active':'']"></div>
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
  components: {
    checkBox
  },
  data() {
    return {
      renderView: child,
      // isAllCheck: false,
      isSort: 0
    };
  },
  created() {
    this.isAllCheck = this.AllSelect;
  },
  computed: {
    isAllCheck: {
      get() {
        return this.AllSelect;
      },
      set(v) {
        this.$emit("update:AllSelect", v);
      }
    }
  },
  props: {
    field: {
      value: Object,
      default: () => {}
    },
    // 排序 0正常 1正序 2逆序
    sort: {
      value: Number,
      default: 0
    },
    vue: {
      value: Object,
      default: () => {}
    },
    AllSelect: {
      value: Boolean,
      default: false
    }
  },
  methods: {
    itemSort() {
      if (this.field.sort) {
        switch (this.isSort) {
          case 0:
            this.isSort = 1;
            break;
          case 1:
            this.isSort = 2;
            break;
          case 2:
            this.isSort = 0;
            break;
        }
        this.vue.$emit("itemSort", { sort: this.isSort, key: this.field.key });
      }
    },
    checkAll(v) {
      this.$emit("update:AllSelect", v);
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