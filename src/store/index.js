// 导出所有 Pinia stores
export { useUserStore } from './user';
export { useSysInfoStore } from './sysInfo';

// 为了兼容性，创建一个默认导出
import { useUserStore } from './user';
export default useUserStore;
