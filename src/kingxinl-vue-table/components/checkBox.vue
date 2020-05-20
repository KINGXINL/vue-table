<template>
  <label class="checkbox-div">
    <span class="span">
      <span class="checkboxInner" :class="[checked?'checkboxChecked':'']"></span>
    </span>
    <input class="checkbox" type="checkbox" v-model="checkeds" @change="change" />
  </label>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  computed: {
    checkeds: {
      get() {
        return this.checked;
      },
      set() {
        return;
      }
    }
  },
  methods: {
    change(item) {
      this.$emit("checkChange", item.target.checked);
      this.$emit("update:checked", item.target.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox {
  width: 0;
  height: 0;
  margin: 0;
}
.span {
  width: 100%;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
  .checkboxInner {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
  }
  .checkboxChecked {
    background-color: #409eff;
    border-color: #409eff;
  }
  .checkboxChecked::after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fbfbfb;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform 0.15s ease-in 0.05s;
    transform-origin: center;
    transform: rotate(45deg) scaleY(1);
  }
}
</style>