
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import NoOrderSvg from '../../../assets/Svg/NoOrderSvg';

const NoOrder= () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SvgXml xml={NoOrderSvg()} />
      <Text style={{fontSize:14,fontWeight:400, marginTop: 15}}>
       Không có đơn hàng nào
      </Text>
    </View>
  );
};

export default React.memo(NoOrder);
