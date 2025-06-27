# 微信小程序 App.js 到 MPX 框架迁移说明

## 迁移概述

本次迁移将传统的微信小程序 `app.js` 文件迁移到 MPX 框架的 `app.mpx` 文件中，并重构了相关的工具类和配置。

## 迁移内容

### 1. 核心文件迁移

#### 原始文件 → 新文件
- `app.js` → `src/app.mpx`
- `utils/config.js` → `src/common/utils/config.js`
- `utils/rpc.js` → `src/common/utils/rpc.js`
- `utils/api.js` → `src/common/utils/api.js`
- `utils/aegis.js` → `src/common/utils/aegis.js`

### 2. 新增文件

#### 模型层 (Models)
- `src/common/models/RespStatus.js` - 响应状态模型
- `src/common/models/UserInfo.js` - 用户信息模型

#### 控制器层 (Controllers)
- `src/common/controllers/UserCTL.js` - 用户控制器

#### 工具层 (Utils)
- `src/common/utils/app.js` - 全局应用实例

### 3. 主要功能迁移

#### 应用生命周期
- `onLaunch` - 应用启动时的初始化逻辑
- `onShow` - 应用显示时的处理逻辑
- `onHide` - 应用隐藏时的清理逻辑

#### 配置管理
- 根据不同的 `appID` 设置不同的环境配置
- 支持生产环境和测试环境的切换

#### 网络请求
- RPC 工具类封装了网络请求逻辑
- API 工具类提供了具体的接口调用方法

#### 监控上报
- Aegis 监控配置，支持不同环境的监控 ID
- 事件上报和信息上报功能

#### 用户管理
- 用户信息模型和控制器
- 登录、登出、获取用户信息等功能

#### 其他功能
- 字体加载
- 应用更新检查
- 存储管理
- 场景值处理

### 4. 框架差异

#### 原始微信小程序
```javascript
App({
  onLaunch() {
    // 初始化逻辑
  },
  globalData: {
    // 全局数据
  }
});
```

#### MPX 框架
```javascript
createApp({
  onLaunch(option) {
    // 初始化逻辑
  },
  globalData: {
    // 全局数据
  }
});
```

### 5. 使用方式

#### 在页面中使用
```javascript
import app from '@/common/utils/app';

// 获取全局数据
const globalData = app.getGlobalData();

// 上报事件
app.reportEvent('event_name', 'event_desc', 'ext1');

// 设置全局数据
app.setGlobalData('key', 'value');
```

#### 在组件中使用
```javascript
import { useUserStore } from '@/store/user';
import UserCTL from '@/common/controllers/UserCTL';

// 使用 Pinia 状态管理
const userStore = useUserStore();

// 使用用户控制器
const userInfo = await UserCTL.getUserInfo();
```

### 6. 配置说明

#### 环境配置
- 生产环境 AppID: `wxfeb7f65afd711324`, `wx26cf2ad07297bb6a`, `wx768505309a8cf5b9`
- 测试环境: 其他 AppID

#### API 配置
- 生产环境: `https://didi.paysys.cn/`
- 测试环境: `https://test.didi.paysys.cn/`

#### 监控配置
- 生产环境 Aegis ID: `EPkvyhr2OqK5P7oJbY`
- 测试环境 Aegis ID: `QVl10TJm3RVjPp3nqa`

### 7. 注意事项

1. **存储方式**: 使用 MPX 的存储 API 替代原生微信小程序的存储 API
2. **网络请求**: 使用 MPX 的网络请求 API 替代原生微信小程序的网络请求 API
3. **状态管理**: 使用 Pinia 进行状态管理，替代全局数据的方式
4. **模块化**: 将功能拆分为不同的模块，提高代码的可维护性
5. **类型安全**: 建议后续添加 TypeScript 支持

### 8. 后续优化建议

1. 添加 TypeScript 支持
2. 完善错误处理机制
3. 添加单元测试
4. 优化网络请求的缓存策略
5. 完善日志系统
6. 添加性能监控

## 总结

本次迁移成功将传统的微信小程序代码迁移到 MPX 框架，保持了原有功能的完整性，同时提升了代码的可维护性和可扩展性。新的架构更加模块化，便于后续的开发和维护。
