/**
 * @Description 页面未找到时的对应处理方法，分包后需要
 */

// 路由query对象转字符串参数
export const queryConvertStringParams = (query) => {
  let search = '';
  Object.keys(query).forEach((key, index) => {
    if (index) {
      search += `&${key}=${query[key]}`;
    } else {
      search += `?${key}=${query[key]}`;
    }
  });
  return search;
};

export const pageNotFoundHandle = (path, query) => {
  console.log('pageNotFoundHandle', path, query);
  //   if (path === 'views/upload/detail/entry') {
  //     uni.redirectTo({ url: `/pages/subPagesStore/views/detail/entry${queryConvertStringParams(query)}` });
  //   }
  // 页面404处理（跳转首页）
  uni.redirectTo({ url: '/views/home/entry' });
};
