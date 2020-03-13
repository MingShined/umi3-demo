/**
 * @name
 * @author MingShined
 */
import React, { Fragment } from 'react';
interface Props {}
const Flex: React.FC = props => {
  return <div {...props}>{props.children}</div>;
};
export default Flex;
