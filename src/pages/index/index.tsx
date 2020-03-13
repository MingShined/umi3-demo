/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect, useState } from 'react';
// import * as Demo from 'antd';
import loaderable from './utils/loaderable';
import Example from './components/Example';
import ReactDOMServer from 'react-dom/server';
import { useRequest, useModel } from 'umi';
import JsxParser from 'react-jsx-parser';
import { Checkbox, Button, Flex, Stepper } from 'antd-mobile';
const AntComponents = require('antd');
import axios from 'axios';
// const JsxParser = require('react-jsx-parser');
// import { Button, Steps, Checkbox, DatePicker } from 'antd';
interface Props {}

const EventWrap: React.FC<any> = props => {
  // console.log(props);
  const handleClick = () => {
    // props.click();
    // return;

    const func = new Function(`return ${props.click}`);
    // eval(`${props.myClick}`)();
    // console.log(func);
    func()(props.axios);
    // props.onClick();
  };
  return <span onClick={handleClick}>{props.children}</span>;
};

EventWrap.defaultProps = {
  axios: axios
};

// const Import = loaderable(() => import(``));
const Engine: React.FC<Props> = props => {
  // const res = useModel('@@initialState');
  const [jsx, setJSX] = useState<string>('');
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const { data } = await axios.get('http://192.168.100.226:3001');
    setJSX(data);
  };

  return (
    <Fragment>
      <JsxParser
        bindings={{
          shopName: '秋水伊人',
          imgUrl:
            'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
          itemName: '34297423、长袖小西装【92.6棉/粉红/市场价8423.99】',
          size: 'XL',
          price: '1',
          quantity: 1,
          axios: axios,
          // number: 1,
          // obj: {
          //   a: 1,
          //   b: 2
          // },
          myClick: `async function(axios) {
          const { data } = await axios.post('http://192.168.1.243:8009/manager/login/login', {
            system: 'DMS',
              name: 'admin_dms',
              password: 'shulie20180402'
          })
          // const { data } = await axios.get('http://192.168.1.243:8009/manager/orders')
          console.log(data),
          props.
          }`,
          onItemCheck: v => {
            console.log(v);
          }
        }}
        components={{ Checkbox, Button, Flex, Stepper }}
        // jsx={`<div>{[1, 2].map(item => <div>{item}</div>)}</div>`}
        jsx={`<div style={{padding:8,borderRadius:4}}><Checkbox><span style={{marginLeft:16}}>{shopName}<span style={{marginLeft:8}}>></span></span></Checkbox><Flex style={{padding:8,marginTop:24}}><div><Checkbox/></div><Flex style={{marginLeft:16,flex:1}}><img src={imgUrl}alt=""width="80"height="80"/><Flex style={{flex:1,marginLeft:16}}direction="column"align="start"><Flex.Item>{itemName}</Flex.Item><Flex.Item>尺寸:{item.size}</Flex.Item><div style={{width:'100%'}}><Flex justify="between"><span style={{color:'red'}}>$ {price}</span><span><Stepper showNumber defaultValue={quantity}min={1}/></span></Flex></div></Flex></Flex></Flex></div>`}
        // jsx={`<Fragment>{dataSource.map((item,index)=>(<div key={index}style={{padding:8,borderRadius:4}}><Checkbox><span style={{marginLeft:16}}>{item.shopName}<span style={{marginLeft:8}}>></span></span></Checkbox><Flex style={{padding:8,marginTop:24}}><div><Checkbox/></div><Flex style={{marginLeft:16,flex:1}}><img src={item.imgUrl}alt=""width="80"height="80"/><Flex style={{flex:1,marginLeft:16}}direction="column"align="start"><Flex.Item>{item.itemName}</Flex.Item><Flex.Item>尺寸:{item.size}</Flex.Item><div style={{width:'100%'}}><Flex justify="between"><span style={{color:'red'}}>$ {item.price}</span><span><Stepper showNumber defaultValue={item.quantity}min={1}/ > < /span></Flex></div></Flex></Flex></Flex></div>))}</Fragment>`}
      />
    </Fragment>
  );
};
export default Engine;
