import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NoOrderSvg from '../../../assets/Svg/NoOrderSvg';

const NoOrder = () => {
  return (
    <View style={styles.container}>
      <SvgXml xml={NoOrderSvg()} />
      <Text style={styles.text}>
        Không có đơn hàng nào
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 15,
  },
});

export default React.memo(NoOrder);
