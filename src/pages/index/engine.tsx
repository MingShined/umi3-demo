/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect, useState } from 'react';
import Flex from './Flex';

const layoutMap: any = {
  1: import('./Flex'),
//   2: import('./Fixed'),
};

const tree = {
  layout: '1',
  blockId: '78',
  block_104: {
    layout: '1',
    blockId: 'block_104',
    attrs: {
      style: { display: 'flex' }
    },
    block_33: {
      layout: '1',
      blockId: 'block_33'
      //   attrs: {
      //     style: { display: 'flex', flex: 1 }
      //   },
    },
    block_34: {
      layout: '1',
      blockId: 'block_34',
    //   '22': {
    //     layout: '1',
    //     blockId: '22'
    //   }
    }
  },
  block_80: {
    layout: '1',
    blockId: 'block_80'
  },
  block_92: {
    layout: '1',
    blockId: 'block_92',
    attr: {
        style: { background: 'red'}
    },
    block_921: {
      layout: '1',
      blockId: 'block_921'
    },
    block_922: {
      layout: '1',
      blockId: 'block_922'
    }
  },
  block_94: {
    layout: '1',
    blockId: 'block_94'
  },

};

interface Props {}
const HookPage: React.FC<Props> = props => {
  const [domTree, setDomTree] = useState<any[]>([]);
  useEffect(() => {
    setDomTree(rebuildDomTree(tree));
  }, []);
  const rebuildDomTree = (structure: any) => {
    const curMap = {} as any;
    Object.keys(structure).forEach(async (item, i) => {
      if (item.indexOf('_') !== -1) {
        if (curMap.children) {
          curMap.children = [...curMap.children ,...rebuildDomTree(structure[item])];
          return;
        }
        curMap.children = rebuildDomTree(structure[item]);
        return;
      }
      if (item === 'layout') {
        let layout = null;
        await layoutMap[structure[item]].then(com => {
          layout = com.default;
        });
        curMap[item] = layout;
        return;
      }
      curMap[item] = structure[item];
    });
    return [curMap];
  };
  const createDomTree = (data: any[]) => {
    if (!data.length) {
      return null;
    }
    return data.map((item, index) => {
      if (!item.layout) {
        return null;
      }
      const attrs = item.attrs || {};
      return (
        <item.layout {...attrs} key={index}>
          {item.children ? createDomTree(item.children) : item.blockId}
        </item.layout>
      );
    });
  };
  return <Fragment>{createDomTree(domTree)}</Fragment>;
};
export default HookPage;
