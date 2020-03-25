<template>
  <div class="k-table-main">
    <div ref="KingXinL-TableBody" class="k-body">
      <div ref="drag" class="drag"></div>
      <div ref="KTop" class="k-top">
        <div ref="KTopTable" class="k-top-table" :class="[heightScroll?'top-vertical-scroll':'']">
          <div ref="kTopLeft" class="top-left-table" :class="[boxShadow == 1?'':'box-shadow']">
            <table ref="topLeft" :cellspacing="0" :cellpadding="0" :border="0">
              <colgroup>
                <template v-for="(item, index) in fields">
                  <col
                    v-if="item.fixed == 'left'"
                    :key="index"
                    :ref="'leftTop' + index"
                    :name="index"
                    :width="item.width"
                  />
                </template>
              </colgroup>
              <thead>
                <tr>
                  <template v-for="(item, index) in fields">
                    <th :height="thHeight" class="main-th" v-if="item.fixed == 'left'" :key="index">
                      <div class="head-th">
                        <head-item :vue="is" :AllSelect.sync="selectAll" :field="item"></head-item>
                        <div
                          class="th-drag"
                          v-if="isColDrag"
                          @mousedown="dragItem($event, index, 'left')"
                        ></div>
                      </div>
                    </th>
                  </template>
                </tr>
              </thead>
            </table>
          </div>
          <div ref="topTop" class="top-main-table">
            <table ref="topMain" :cellspacing="0" :cellpadding="0" :border="0">
              <colgroup>
                <template v-for="(item, index) in fields">
                  <col
                    v-if="item.fixed != 'left' && item.fixed != 'right'"
                    :key="index"
                    :ref="'top' + index"
                    :name="index"
                    :width="item.width"
                  />
                </template>
              </colgroup>
              <thead>
                <tr>
                  <template v-for="(item, index) in fields">
                    <th
                      :height="thHeight"
                      class="main-th"
                      v-if="item.fixed != 'left' && item.fixed != 'right'"
                      :key="index"
                    >
                      <div class="head-th">
                        <head-item :vue="is" :AllSelect.sync="selectAll" :field="item"></head-item>
                        <div
                          class="th-drag"
                          v-if="isColDrag"
                          clas
                          @mousedown="dragItem($event, index, 'main')"
                        ></div>
                      </div>
                    </th>
                  </template>
                </tr>
              </thead>
            </table>
          </div>
          <div
            ref="kTopRight"
            class="top-right-table"
            :class="[boxShadow == 2?'':'box-shadow-right']"
          >
            <table ref="topRight" :cellspacing="0" :cellpadding="0" :border="0">
              <colgroup>
                <template v-for="(item, index) in fields">
                  <col
                    v-if="item.fixed == 'right'"
                    :key="index"
                    :ref="'rightTop' + index"
                    :name="index"
                    :width="item.width"
                  />
                </template>
              </colgroup>
              <thead>
                <tr>
                  <template v-for="(item, index) in fields">
                    <th
                      :height="thHeight"
                      class="main-th"
                      v-if="item.fixed == 'right'"
                      :key="index"
                    >
                      <div class="head-th">
                        <head-item :vue="is" :AllSelect.sync="selectAll" :field="item"></head-item>
                        <div
                          class="th-drag"
                          v-if="isColDrag"
                          @mousedown="dragItem($event, index, 'right')"
                        ></div>
                      </div>
                    </th>
                  </template>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div class="k-main">
        <div
          ref="mainMain"
          class="k-main-main"
          :class="[heightScroll?'vertical-scroll':'']"
          @scroll="scrollMain"
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <table :cellspacing="0" :cellpadding="0" :border="0">
            <colgroup>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'left'"
                  :key="index"
                  :ref="'main' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed != 'left' && item.fixed != 'right'"
                  :key="index"
                  :ref="'main' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'right'"
                  :key="index"
                  :ref="'main' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
            </colgroup>
            <tbody>
              <tr v-for="(showItem, showIndex) in showData" :key="showIndex">
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed == 'left'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="main-td"
                    v-if="item.fixed != 'left' && item.fixed != 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed == 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          ref="mainLeft"
          class="k-main-left"
          :class="[boxShadow == 1?'':'box-shadow']"
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <table :cellspacing="0" :cellpadding="0" :border="0">
            <colgroup>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'left'"
                  :key="index"
                  :ref="'leftMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
              <!-- <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed != 'left' && item.fixed != 'right'"
                  :key="index"
                  :ref="'leftMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'right'"
                  :key="index"
                  :ref="'leftMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>-->
            </colgroup>
            <tbody>
              <tr v-for="(showItem, showIndex) in showData" :key="showIndex">
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="main-td"
                    v-if="item.fixed == 'left'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
                <!-- <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed != 'left' && item.fixed != 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed == 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>-->
              </tr>
            </tbody>
          </table>
        </div>
        <div
          ref="mainRight"
          class="k-main-right"
          :class="[heightScroll?'vertical-scroll':'', boxShadow == 2?'':'box-shadow-right']"
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <table :cellspacing="0" :cellpadding="0" :border="0">
            <colgroup>
              <!-- <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'left'"
                  :key="index"
                  :ref="'rightMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed != 'left' && item.fixed != 'right'"
                  :key="index"
                  :ref="'rightMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>-->
              <template v-for="(item, index) in fields">
                <col
                  v-if="item.fixed == 'right'"
                  :key="index"
                  :ref="'rightMain' + index"
                  :name="index"
                  :width="item.width"
                />
              </template>
            </colgroup>
            <tbody>
              <tr v-for="(showItem, showIndex) in showData" :key="showIndex">
                <!-- <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed == 'left'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="visibility"
                    v-if="item.fixed != 'left' && item.fixed != 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>-->
                <template v-for="(item, index) in fields">
                  <td
                    @mouseenter="tdMouseenter(showIndex)"
                    @click="clickDetail(showItem, showIndex + Math.ceil(count))"
                    @mouseleave="tdMouseleave"
                    :class="[CurrentRow == showIndex || ClickRow == showIndex + Math.ceil(count)?'CurrentRow ':'']"
                    :style="{height: TdHeight + 'px'}"
                    class="main-td"
                    v-if="item.fixed == 'right'"
                    :key="index"
                  >
                    <body-item
                      :value="showItem"
                      :vue="is"
                      :field="item"
                      :select="selectData"
                      :index="showIndex + Math.ceil(count)"
                    ></body-item>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <div ref="mainHidden" class="k-main-hidden" @scroll="scroll">
          <table
            ref="mainHiddenTable"
            style="visibility: hidden;"
            :cellspacing="0"
            :cellpadding="0"
            :border="0"
          ></table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headItem from "./components/headItem";
import bodyItem from "./components/bodyItem";
export default {
  name: "KingxinlVueTable",
  components: {
    headItem,
    bodyItem
  },
  data() {
    return {
      is: this,
      CurrentRow: -1,
      ClickRow: -1,
      mainLeftWidth: 0,
      mainRightWidth: 0,
      TableWidth: 0,
      thHeight: 0,
      heightScroll: false,
      showData: [],
      selectAll: false,
      selectData: {},
      data_: [],
      count: 0,
      boxShadow: 1
    };
  },
  props: {
    TdHeight: {
      // 行高
      value: String,
      default: 30
    },
    field: {
      // 表头字段
      value: Array,
      default: () => []
    },
    isColDrag: {
      // 是否可拖动
      value: Boolean,
      default: true
    },
    data: {
      // 原始数据
      value: Array,
      default: () => []
    },
    row_key: {
      // 选中时记录的数据 数组形式 可记录多个字段
      value: Array,
      default: () => []
    },
    reserveSelection: {
      // 数据变更时是否保留上次选中数据 row_key有设置时才生效
      value: Boolean,
      default: false
    }
  },
  watch: {
    data() {
      const dataInstanceChanged = this.data_ !== this.data;
      this.data_ = this.data;
      if (this.row_key.length > 0) {
        if (!dataInstanceChanged && this.reserveSelection) {
          let NewSelectData = {};
          for (let x of this.data_) {
            let Key = [];
            for (let rowKey of this.row_key) {
              Key.push(x[rowKey]);
            }
            if (this.selectAll == true) {
              this.$set(NewSelectData, Key.join("|:|"), x);
            } else {
              if (Key.join("|:|") in this.selectData) {
                this.$set(NewSelectData, Key.join("|:|"), x);
              }
            }
          }
          this.selectData = NewSelectData;
        } else {
          this.selectData = {};
        }
      } else {
        if (dataInstanceChanged) {
          this.selectData = {};
        }
      }
      let height = this.data.length;
      this.$refs.mainHiddenTable.style.height =
        height * (parseInt(this.TdHeight) + 1) + "px";
      this.verificationIsAllCheck();
      this.calculatedShowData();
      this.$nextTick(() => {
        if (
          this.$refs.mainHidden.scrollHeight >
          this.$refs.mainHidden.clientHeight
        ) {
          this.heightScroll = true;
        } else {
          this.heightScroll = false;
        }
        this.$refs.mainRight.scrollLeft = 10000000;
      });
    },
    field() {
      this.calculatedFieldWidth();
    }
  },
  computed: {
    fields: {
      get() {
        return this.field;
      },
      set() {
        return;
      }
    }
  },
  created() {},
  mounted() {
    this.data_ = this.data;
    this.calculatedFieldWidth();
    if (
      this.$refs.mainHidden.scrollHeight > this.$refs.mainHidden.clientHeight
    ) {
      this.heightScroll = true;
    }
    this.fields = [...this.fields];
    this.$on("checkAll", v => {
      if (v) {
        for (let x in this.data) {
          if (this.row_key.length > 0) {
            let Key = [];
            for (let rowKey of this.row_key) {
              Key.push(this.data[x][rowKey]);
            }
            this.$set(this.selectData, Key.join("|:|"), this.data[x]);
          } else {
            this.$set(this.selectData, x, this.data[x]);
          }
        }
      } else {
        this.selectData = {};
      }
      this.$emit("checkBoxAll", Object.values(this.selectData));
    });
    this.$on("checkOne", value => {
      if (this.row_key.length > 0) {
        let Key = [];
        for (let rowKey of this.row_key) {
          Key.push(value.value[rowKey]);
        }
        if (value.status == false) {
          delete this.selectData[Key.join("|:|")];
        } else {
          this.$set(this.selectData, Key.join("|:|"), value.value);
        }
      } else {
        if (value.status == false) {
          delete this.selectData[value.index];
        } else {
          this.$set(this.selectData, value.index, value.value);
        }
      }
      this.verificationIsAllCheck();
      this.$emit("checkBoxOne", Object.values(this.selectData), value.value);
    });
    this.$on("itemSort", e => {
      this.$emit("sort", e);
    });
    this.calculatedHiddenHeight();
    this.$nextTick(() => {
      this.$refs.mainRight.scrollLeft = 10000000;
    });
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.mainRight.scrollLeft = 10000000;
      this.$refs.mainHidden.scrollTop =
        this.count * (parseInt(this.TdHeight) + 1);
    });
  },
  methods: {
    verificationIsAllCheck() {
      // 判断是否全选
      let selectStatus = true;
      if (this.row_key.length > 0 && this.data.length > 0) {
        for (let x of this.data) {
          let Key = [];
          for (let rowKey of this.row_key) {
            Key.push(x[rowKey]);
          }
          if (Key.join("|:|") in this.selectData == false) {
            selectStatus = false;
            break;
          }
        }
      } else {
        if (this.data.length > 0) {
          for (let x in this.data) {
            if (x in this.selectData == false) {
              selectStatus = false;
              break;
            }
          }
        } else {
          selectStatus = false;
        }
      }
      if (selectStatus) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    toggleCheckAll(v) {
      if (v) {
        for (let x in this.data) {
          if (this.row_key.length > 0) {
            let Key = [];
            for (let rowKey of this.row_key) {
              Key.push(this.data[x][rowKey]);
            }
            this.$set(this.selectData, Key.join("|:|"), this.data[x]);
          } else {
            this.$set(this.selectData, x, this.data[x]);
          }
        }
      } else {
        this.selectData = {};
      }
      this.verificationIsAllCheck();
      return Object.values(this.selectData);
    },
    getSelection() {
      return Object.values(this.selectData);
    },
    invertSelection() {
      let NewSelectData = {};
      for (let x in this.data_) {
        if (this.row_key) {
          let Key = [];
          for (let rowKey of this.row_key) {
            Key.push(this.data[x][rowKey]);
          }
          if (!(Key.join("|:|") in this.selectData)) {
            this.$set(NewSelectData, Key.join("|:|"), x);
          }
        } else {
          if (!(x in this.selectData)) {
            this.$set(NewSelectData, x, this.data[x]);
          }
        }
      }
      this.selectData = NewSelectData;
      this.verificationIsAllCheck();
      return Object.values(this.selectData);
    },
    clickDetail(detail, index) {
      this.ClickRow = index;
      this.$emit("clickDetail", detail);
    },
    calculatedHiddenHeight() {
      // 计算表格数据的高度
      let length = this.data.length;
      this.$refs.mainHiddenTable.style.height =
        length * (parseInt(this.TdHeight) + 1) + "px";
      if (
        this.$refs.mainHidden.scrollHeight > this.$refs.mainHidden.clientHeight
      ) {
        this.heightScroll = true;
      }
      this.calculatedShowData();
    },
    calculatedShowData() {
      // 取出显示的数据
      let currentHeight = this.$refs.mainHidden.scrollTop;
      this.count = currentHeight / (parseInt(this.TdHeight) + 1);
      let Showlength =
        this.$refs.mainHidden.clientHeight / (parseInt(this.TdHeight) + 1);
      let Data = [...this.data_];
      this.showData = Data.splice(Math.ceil(this.count), Math.ceil(Showlength));
    },
    calculatedFieldWidth() {
      // 计算各列的宽度并设置div宽度
      for (let item in this.fields) {
        if (typeof this.fields[item].width != "undefined") {
          this.TableWidth += parseInt(this.fields[item].width);
        }
      }
      if (this.$refs["KingXinL-TableBody"].clientWidth < this.TableWidth) {
        for (let item in this.fields) {
          if (typeof this.fields[item].width == "undefined") {
            this.fields[item].width = 60;
          }
        }
        this.scrollTh = true;
      } else {
        let count = 0;
        for (let item in this.fields) {
          if (typeof this.fields[item].width == "undefined") {
            count++;
          }
        }
        if (count > 0) {
          let defaults = this.$refs.KTopTable.clientWidth - this.TableWidth;
          if (
            this.$refs.mainHidden.clientHeight <
            this.$refs.mainHidden.scrollHeight
          ) {
            defaults -= 17;
          }
          for (let item in this.fields) {
            if (typeof this.fields[item].width == "undefined") {
              this.fields[item].width =
                defaults / count > 60 ? defaults / count : 60;
            }
          }
        }
      }
      this.mainLeftWidth = 0;
      this.mainRightWidth = 0;
      for (let item in this.fields) {
        if (typeof this.fields[item].fixed != "undefined") {
          switch (this.fields[item].fixed) {
            case "left":
              this.mainLeftWidth += this.fields[item].width;
              break;
            case "right":
              this.mainRightWidth += this.fields[item].width;
              break;
          }
        }
      }
      if (this.mainLeftWidth != 0) {
        this.mainLeftWidth += 1;
      }
      if (this.mainRightWidth != 0) {
        this.mainRightWidth += 1;
      }
      this.$refs.mainLeft.style.width = this.mainLeftWidth + "px";
      this.$refs.mainRight.style.width = this.mainRightWidth + "px";
      this.$nextTick(() => {
        this.$refs.mainRight.scrollLeft = 10000000;
        this.thHeight = this.$refs.KTopTable.clientHeight - 2;
      });
    },
    scroll(e) {
      // 纵向滚动
      this.calculatedHiddenHeight();
      this.$emit("scroll", e);
    },
    handleScroll(e) {
      //表格滚轮滚动
      if (e.type == "DOMMouseScroll") {
        if (e.detail > 0) {
          this.$refs.mainHidden.scrollTop += parseInt(this.TdHeight) + 1;
        } else {
          this.$refs.mainHidden.scrollTop -= parseInt(this.TdHeight) + 1;
        }
      } else {
        if (e.deltaY > 0) {
          this.$refs.mainHidden.scrollTop += parseInt(this.TdHeight) + 1;
        } else {
          this.$refs.mainHidden.scrollTop -= parseInt(this.TdHeight) + 1;
        }
      }
    },
    scrollMain() {
      // 同步横向滚动
      this.$refs.topTop.scrollLeft = this.$refs.mainMain.scrollLeft;
      if (this.$refs.mainMain.scrollLeft == 0) {
        this.boxShadow = 1;
      } else if (
        this.$refs.mainMain.scrollWidth ==
        this.$refs.mainMain.clientWidth + this.$refs.mainMain.scrollLeft
      ) {
        this.boxShadow = 2;
      } else {
        this.boxShadow = 0;
      }
    },
    dragItem(e, key, type) {
      // 鼠标按下 拖拽设置字段宽度
      this.dragDump = e.clientX;
      this.dragKey = key;
      this.dragType = type;
      this.$refs.drag.style.left =
        this.dragDump -
        this.$refs["KingXinL-TableBody"].getBoundingClientRect().left +
        this.$refs["KingXinL-TableBody"].scrollLeft +
        "px";
      document.body.addEventListener("mouseup", this.dragWidthMouseUp);
      document.body.addEventListener("mousemove", this.dragWidthMouseMove);
    },
    dragWidthMouseUp(e) {
      // 鼠标放开 拖拽设置字段宽度
      this.$refs.drag.style.left = "-100px";
      let isWidth = e.clientX - this.dragDump;
      let drags = "top";
      if (this.dragType == "left") {
        drags = "leftTop";
      } else if (this.dragType == "right") {
        drags = "rightTop";
      }
      let dragWidth =
        parseInt(this.$refs[drags + this.dragKey][0].width) + isWidth;
      if (dragWidth < 60) {
        dragWidth = 60;
      }
      if (this.dragType == "left") {
        this.$refs["leftTop" + this.dragKey][0].width = dragWidth;
        this.$refs["leftMain" + this.dragKey][0].width = dragWidth;
      } else if (this.dragType == "right") {
        this.$refs["rightTop" + this.dragKey][0].width = dragWidth;
        this.$refs["rightMain" + this.dragKey][0].width = dragWidth;
      } else {
        this.$refs["top" + this.dragKey][0].width = dragWidth;
      }
      this.$refs["main" + this.dragKey][0].width = dragWidth;
      document.body.removeEventListener("mouseup", this.dragWidthMouseUp);
      document.body.removeEventListener("mousemove", this.dragWidthMouseMove);
      if (this.dragType == "left") {
        this.mainLeftWidth += isWidth;
        this.$refs.mainLeft.style.width =
          this.$refs.kTopLeft.clientWidth + "px";
      } else if (this.dragType == "right") {
        this.mainRightWidth += isWidth;
        this.$refs.mainRight.style.width =
          this.$refs.kTopRight.clientWidth + "px";
      }
      if (this.$refs.mainMain.scrollLeft == 0) {
        this.boxShadow = 1;
      } else if (
        this.$refs.mainMain.scrollWidth ==
        this.$refs.mainMain.clientWidth + this.$refs.mainMain.scrollLeft
      ) {
        this.boxShadow = 2;
      } else {
        this.boxShadow = 0;
      }
      this.thHeight = this.$refs.KTopTable.clientHeight - 2;
      this.$refs.mainRight.scrollLeft = 10000000;
    },
    dragWidthMouseMove(e) {
      // 鼠标移动 拖拽设置字段宽度
      this.$refs.drag.style.left =
        e.clientX -
        this.$refs["KingXinL-TableBody"].getBoundingClientRect().left +
        this.$refs["KingXinL-TableBody"].scrollLeft +
        "px";
    },
    tdMouseenter(index) {
      //鼠标移到数据行显示背景色
      this.CurrentRow = index;
    },
    tdMouseleave() {
      //鼠标移出数据行取消背景色
      this.CurrentRow = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.k-table-main {
  position: relative;
  height: 100%;
  .k-body {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    table {
      width: 0;
      table-layout: fixed;
      border-collapse: collapse;
      tr td {
        overflow: hidden;
      }
    }
    .drag {
      position: absolute;
      z-index: 998;
      top: 0;
      bottom: 0;
      width: 1px;
      left: -100px;
      background-color: #8097ad;
    }
    .visibility {
      visibility: hidden;
    }
    .k-top {
      width: 100%;
      flex: 0 auto;
      z-index: 12;
      tr th.main-th {
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
      }
      tr th {
        position: relative;
        color: #909399;
        .th-drag {
          flex: 0 auto;
          width: 20px;
          height: 100%;
          right: -10px;
          top: 0;
          z-index: 9;
          position: absolute;
          cursor: col-resize;
          -moz-user-select: none;
          -khtml-user-select: none;
          user-select: none;
        }
        .head-th {
          display: flex;
          overflow: hidden;
          .k-table-header {
            flex: 1;
          }
        }
      }
      .k-top-table {
        overflow-x: auto;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: #fff;
        table {
          width: 0;
          table-layout: fixed;
        }
        .top-left-table {
          flex: 0 auto;
          tr th:last-child {
            border-right: 0;
          }
        }
        .top-main-table {
          flex: 1;
          overflow: hidden;
        }
        .top-right-table {
          flex: 0 auto;
        }
      }
      .top-vertical-scroll {
        margin-right: 17px;
      }
    }
    .k-main {
      margin-top: -1px;
      flex: 1;
      width: 100%;
      overflow: hidden;
      position: relative;
      align-items: center;
      table {
        width: 0;
        table-layout: fixed;
        color: #606266;
        text-align: center;
      }
      .CurrentRow {
        background-color: #f5f7fa;
      }
      .k-main-main {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        overflow-y: hidden;
        overflow-x: scroll;
        position: absolute;
        background-color: #fff;
      }
      .k-main-left {
        width: 0;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 11;
        bottom: 17px;
        background-color: #fff;
        overflow: hidden;
        position: absolute;
      }
      .k-main-right {
        width: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 11;
        bottom: 17px;
        background-color: #fff;
        overflow: hidden;
        position: absolute;
      }
      .k-main-hidden {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        bottom: 17px;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        background-color: #fff;
      }
      tr td.main-td {
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        overflow: hidden;
      }
      .vertical-scroll {
        right: 17px;
      }
    }
    .box-shadow {
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.12);
    }
    .box-shadow-right {
      box-shadow: -4px 0 8px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>