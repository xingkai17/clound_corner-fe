// 测试缩进规则
function testIndentation() {
  const obj = {
    name: 'test',
    value: 123,
  };

  if (true) {
    console.log('indented with 2 spaces');
  }

  switch (obj.name) {
    case 'test':
      console.log('case indented with 2 spaces');
      break;
    default:
      console.log('default case');
  }

  return obj;
}

export default testIndentation;
