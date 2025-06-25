/**
 * [统一处理某方法promise的catch]
 * @param  {any} obj
 */
export function catchNoErr(obj) {
  const newObj = obj
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  newObj.oldThen = newObj.then;
  newObj.then = (onFulfilled, onRejected) => {
    return newObj.oldThen(
      onFulfilled,
      onRejected ||
        function() {},
    );
  };
  return newObj;
}
