# k-table

## 安装教程
```
npm i k-vue-table
```

## 使用教程
```
import 自定义名称 from "k-vue-table";
```

### 表格属性
<table style="width:100%;">
    <thead>
        <tr>
            <th>属性</th>
            <th width="500">说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TdHeight</td>
            <td>数据行行高</td>
            <td>Number</td>
            <td>30</td>
        </tr>
        <tr>
            <td>selectList</td>
            <td>选中的数据（row_key有设置时键为数组用row_key的值使用|:|连接</td>
            <td>Object</td>
            <td>{}</td>
        </tr>
        <tr>
            <td>field</td>
            <td>表格列字段</td>
            <td>Object</td>
            <td>{}</td>
        </tr>
        <tr>
            <td>data</td>
            <td>表格数据</td>
            <td>Array</td>
            <td>[]</td>
        </tr>
        <tr>
            <td>isColDrag</td>
            <td>列是否可拖动</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>row_key</td>
            <td>选中时记录的数据,可多字段</td>
            <td>Array</td>
            <td>[]</td>
        </tr>
        <tr>
            <td>reserveSelection</td>
            <td>数据变更时是否保留上次选中数据 row_key有设置时才生效</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
    </tbody>
</table>

### 表格事件
<table style="width:100%;">
    <thead>
        <tr>
            <th>事件名</th>
            <th width="500">说明</th>
            <th> 返回值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>checkBoxAll</td>
            <td>多选模式下,点击全选时</td>
            <td>selection：已选项数据</td>
        </tr>
        <tr>
            <td>checkBoxOne</td>
            <td>多选模式下,点击某行多选框时触发</td>
            <td>selection：已选项数据, row:当前行数据</td>
        </tr>
        <tr>
            <td>clickDetail</td>
            <td>点击某一行触发</td>
            <td>detail：当前行的数据, index:当前行的位置</td>
        </tr>
         <tr>
            <td>scroll</td>
            <td>表格滚动时触发</td>
            <td>event</td>
        </tr>
         <tr>
            <td>sort</td>
            <td>字段排序点击返回</td>
            <td>返回对应排序</td>
        </tr>
    </tbody>
</table>

### 表格列字段参数

<table style="width:100%;">
    <thead>
        <tr>
            <th>属性</th>
            <th width="500">说明</th>
            <th> 类型</th>
            <th> 默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>key</td>
            <td>列字段名,当为selection时即多选模式</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>title</td>
            <td>列头显示文字</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>width</td>
            <td>列宽()</td>
            <td>Number</td>
            <td>-</td>
        </tr>
        <tr>
            <td>sort</td>
            <td>是否排序</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>fixed</td>
            <td>列是否固定在左侧或者右侧,可选值为 left 左侧和 right 右侧</td>
            <td>String</td>
            <td>-</td>
        </tr>
         <tr>
            <td>renderHeader</td>
            <td>自定义渲染标题,使用 Vue 的 Render 函数。传入两个参数,第一个是 h,第二个为对象,包含 column(当前列参数) 和 index(当前key)</td>
            <td>Function</td>
            <td>-</td>
        </tr>
         <tr>
            <td>render</td>
            <td>自定义渲染列,使用 Vue 的 Render 函数。传入两个参数,第一个是 h,第二个为对象,包含 column(当前列参数)、key(当前列key) 和 value(当前列参数)</td>
            <td>Function</td>
            <td>-</td>
        </tr>
    </tbody>
</table>

### 表格方法
<table style="width:100%;">
    <thead>
        <tr>
            <th>方法名</th>
            <th width="200">参数</th>
            <th width="200">默认值</th>
            <th width="200">说明</th>
            <th width="200"> 返回值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>toggleCheckAll</td>
            <td>Boolean</td>
            <td>-</td>
            <td>根据传入参数设置全选或清除所有选中</td>
            <td>已选中的数据</td>
        </tr>
        <tr>
            <td>invertSelection</td>
            <td>-</td>
            <td>-</td>
            <td>反选</td>
            <td>已选中的数据</td>
        </tr>
        <tr>
            <td>scrollTo</td>
            <td>Number</td>
            <td>-</td>
            <td>滚动到指定的行数</td>
            <td>-</td>
        </tr>
        <tr>
            <td>getScrollPosition</td>
            <td>-</td>
            <td>-</td>
            <td>获取当前第一行在数组中的位置</td>
            <td>当前第一行位置</td>
        </tr>
    </tbody>
</table>
