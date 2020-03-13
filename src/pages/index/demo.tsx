/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useState, useEffect } from 'react';
interface Props {}
const HookPage: React.FC<Props> = props => {
  const [domList, setDomList] = useState<any>([]);
  useEffect(() => {
    render();
  }, []);
  const render = () => {
    let dom = null;
    return Object.keys(data).forEach(async item => {
      if (item === 'layout') {
        let component = null;
        await layoutMap[data.layout].then(com => {
          component = com.default;
        });
        setDomList([{ component, children: [{ component }] }]);
      }
    });
  };
  console.log(domList);
  return (
    <Fragment>
      {domList.map(item => (
        <item.component>
            {item.children ? <div>2</div> : 1}
        </item.component>
      ))}
    </Fragment>
  );
};
export default HookPage;

const layoutMap: any = {
  one: import('./Flex')
};

const data = {
  layout: 'one',
  blockId: '78',
  attr: {
    text: 1,
    value: 2
  },
  children: {
    区块1: {
      layout: '三栏',
      blockId: '区块1'
    },
    区块2: {
      layout: '底部固定栏',
      blockId: '区块2'
    },
    区块3: {
      layout: '一栏',
      blockId: '区块1'
    }
  }
};
