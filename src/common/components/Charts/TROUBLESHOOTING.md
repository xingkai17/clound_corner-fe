# 图表组件故障排除指南

## 图表不显示的问题排查

### 1. 检查控制台错误
首先打开浏览器开发者工具或小程序开发者工具的控制台，查看是否有错误信息。

### 2. 常见问题及解决方案

#### 问题1: Canvas节点未找到
**错误信息**: `Canvas节点未找到: xxx`

**原因**:
- DOM还没有完全渲染
- Canvas的id不匹配
- 组件还没有完全初始化

**解决方案**:
```javascript
// 使用ready生命周期而不是attached
ready() {
  this.init();
}

// 或者使用nextTick确保DOM渲染完成
mpx.nextTick(() => {
  this.drawChart();
});
```

#### 问题2: Canvas尺寸为0
**错误信息**: `Canvas尺寸无效: 0x0`

**原因**:
- 容器没有设置高度
- CSS样式问题
- 父容器没有正确渲染

**解决方案**:
```css
.chart-container {
  width: 100%;
  height: 300px; /* 必须设置固定高度 */
}

.charts {
  width: 100%;
  height: 250px; /* 确保有足够的高度 */
  background: #fff; /* 添加背景色便于查看 */
  border: 1px solid #eee; /* 添加边框便于定位 */
}
```

#### 问题3: UCharts实例创建失败
**错误信息**: `无法获取Canvas上下文` 或 `UCharts is not defined`

**原因**:
- uCharts库没有正确导入
- Canvas 2D不支持
- 导入路径错误

**解决方案**:
```javascript
// 检查导入路径
import UCharts from '@/common/components/Charts/@qiun/ucharts/u-charts.min.js';

// 确保在支持Canvas 2D的环境中运行
// 微信小程序需要基础库2.9.0+
```

#### 问题4: 数据格式错误
**错误信息**: `图表数据不完整`

**原因**:
- 数据格式不正确
- 数据为空或undefined

**解决方案**:
```javascript
// 确保数据格式正确
const chartData = {
  categories: ['1月', '2月', '3月'], // 必须存在
  series: [                          // 必须存在
    {
      name: '系列1',
      data: [10, 20, 30]            // 数据数组
    }
  ]
};
```

### 3. 调试步骤

#### 步骤1: 添加调试信息
```javascript
init() {
  console.log('组件初始化开始');
  mpx.nextTick(() => {
    console.log('DOM渲染完成');
    this.drawChart();
  });
}

drawChart() {
  const query = mpx.createSelectorQuery().in(this);
  query.select('#chartId')
    .fields({ node: true, size: true })
    .exec((res) => {
      console.log('Canvas查询结果:', res);
      // 继续绘制...
    });
}
```

#### 步骤2: 检查环境支持
```javascript
// 检查Canvas 2D支持
if (typeof wx !== 'undefined') {
  console.log('微信小程序环境');
  console.log('基础库版本:', wx.getSystemInfoSync().SDKVersion);
}
```

#### 步骤3: 验证数据
```javascript
// 验证图表数据
console.log('图表数据:', {
  categories: data.categories,
  series: data.series,
  categoriesLength: data.categories?.length,
  seriesLength: data.series?.length
});
```

### 4. 最佳实践

#### 1. 使用正确的生命周期
```javascript
createComponent({
  ready() {
    // 在ready中初始化，确保DOM已渲染
    this.initChart();
  }
});
```

#### 2. 设置合适的容器尺寸
```css
.chart-wrapper {
  width: 100%;
  height: 300px; /* 固定高度 */
  position: relative;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
```

#### 3. 错误处理
```javascript
drawChart() {
  try {
    // 绘制逻辑
  } catch (error) {
    console.error('绘制图表失败:', error);
    // 显示错误提示
    this.setData({ error: error.message });
  }
}
```

#### 4. 数据验证
```javascript
validateChartData(data) {
  if (!data) return false;
  if (!Array.isArray(data.categories)) return false;
  if (!Array.isArray(data.series)) return false;
  if (data.series.length === 0) return false;

  return data.series.every(series =>
    Array.isArray(series.data) && series.data.length > 0
  );
}
```

### 5. 环境要求

- **微信小程序**: 基础库 2.9.0+
- **支付宝小程序**: 基础库 2.7.0+
- **百度小程序**: 基础库 3.0.0+
- **字节跳动小程序**: 基础库 1.60.0+

### 6. 联系支持

如果按照以上步骤仍然无法解决问题，请提供以下信息：

1. 控制台错误信息
2. 使用的平台和版本
3. 图表组件代码
4. 数据格式示例
5. 复现步骤

这样可以帮助更快地定位和解决问题。
