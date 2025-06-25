const path = require('path');
const fs = require('fs');

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const env = process.env.npm_config_env || 'ie';
console.log('env', env);
console.log('IS_PROD', IS_PROD);

// IM 接口
const apiUrlObj = {
  default: 'https://didi.paysys.cn', // 默认
  ip: 'https://didi.paysys.cn', // 本地
  ie: 'https://didi.paysys.cn', // 集成
  te: 'https://didi.paysys.cn', //  测试
  se: 'https://didi.joilpay.com', // 预演
  pe: 'https://didi.joilpay.com', // 生产
};

const apiUrl = apiUrlObj[env] || apiUrlObj.default;

// 加载环境变量文件
try {
  const dotenv = require('dotenv');
  const envPath = path.resolve(process.cwd(), `.env.${env || 'ie'}`);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ 已加载环境配置文件: ${envPath}`);
  } else {
    console.log(`⚠️  环境配置文件不存在: ${envPath}`);
  }
} catch (error) {
  console.log('⚠️  加载环境配置文件失败:', error.message);
}

module.exports = {
  IS_PROD,
  env,
  apiUrl,
  apiUrlObj
};
