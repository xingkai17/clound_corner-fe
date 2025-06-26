# Charts 图表组件

基于 uCharts 的 MPX 图表组件库，支持多种图表类型。

## 支持的图表类型

- **ColumnChart** - 柱状图
- **BarChart** - 条形图
- **LineChart** - 折线图
- **PieChart** - 饼图
- **RadarChart** - 雷达图
- **MixChart** - 混合图

## 使用方法

### 1. 引入组件

```javascript
import ColumnChart from '@/common/components/Charts/ColumnChart.mpx'
import BarChart from '@/common/components/Charts/BarChart.mpx'
import LineChart from '@/common/components/Charts/LineChart.mpx'
import PieChart from '@/common/components/Charts/PieChart.mpx'
import RadarChart from '@/common/components/Charts/RadarChart.mpx'
import MixChart from '@/common/components/Charts/MixChart.mpx'
```

### 2. 注册组件

```javascript
createComponent({
  components: {
    ColumnChart,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    MixChart
  }
})
```

### 3. 在模板中使用

```html
<template>
  <view>
    <!-- 柱状图 -->
    <ColumnChart
      title="销售数据"
      chartId="salesChart"
      theme="blue"
      :xAxisData="['1月', '2月', '3月', '4月', '5月', '6月']"
      :seriesData="[
        { name: '销售额', data: [35, 36, 31, 33, 13, 34] },
        { name: '利润', data: [18, 27, 21, 24, 6, 28] }
      ]"
      seriesUnit="万元"
      yAxisUnit="万元"
      height="300px"
    />

    <!-- 饼图 -->
    <PieChart
      title="市场份额"
      chartId="marketChart"
      theme="green"
      :seriesData="[
        {
          data: [
            { name: '产品A', value: 50 },
            { name: '产品B', value: 30 },
            { name: '产品C', value: 20 }
          ]
        }
      ]"
      height="250px"
    />
  </view>
</template>
```

## 组件属性

### 通用属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | String | '' | 图表标题 |
| chartId | String | - | 图表唯一ID |
| theme | String | 'blue' | 主题色彩：'blue' \| 'green' \| 'purple' |
| width | String | '100%' | 图表宽度 |
| height | String | '270px' | 图表高度 |
| config | Object | {} | 额外配置项 |

### 数据属性

#### ColumnChart/BarChart/LineChart/RadarChart/MixChart
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| xAxisData | Array | [] | X轴数据 |
| seriesData | Array | [] | 系列数据 |

#### PieChart
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| seriesData | Array | [] | 饼图数据 |

### 特殊属性

#### ColumnChart/BarChart
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| seriesUnit | String | '' | 数据单位 |
| yAxisUnit | String | '' | Y轴单位 |

#### MixChart
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| yAxisData | Array | [] | Y轴配置数据 |

## 数据格式

### 柱状图/条形图/折线图数据格式

```javascript
// xAxisData
['1月', '2月', '3月', '4月', '5月', '6月']

// seriesData
[
  {
    name: '系列1',
    data: [35, 36, 31, 33, 13, 34]
  },
  {
    name: '系列2',
    data: [18, 27, 21, 24, 6, 28]
  }
]
```

### 饼图数据格式

```javascript
// seriesData
[
  {
    data: [
      { name: '产品A', value: 50 },
      { name: '产品B', value: 30 },
      { name: '产品C', value: 20 }
    ]
  }
]
```

### 雷达图数据格式

```javascript
// xAxisData
['指标1', '指标2', '指标3', '指标4', '指标5']

// seriesData
[
  {
    name: '实际值',
    data: [70, 50, 85, 130, 64]
  },
  {
    name: '目标值',
    data: [100, 80, 125, 150, 112]
  }
]
```

## 注意事项

1. 确保每个图表的 `chartId` 是唯一的
2. 图表组件会自动监听数据变化并重新渲染
3. 支持点击图例和显示提示框
4. 所有组件都基于 uCharts 2.x 版本
5. 需要在 MPX 项目中正确配置 Canvas 2D 支持

## 主题色彩

- **blue**: 蓝色主题
- **green**: 绿色主题
- **purple**: 紫色主题

每个主题都包含 9 种不同的颜色，用于多系列数据的展示。
