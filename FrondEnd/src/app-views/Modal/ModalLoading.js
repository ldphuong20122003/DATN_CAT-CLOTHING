import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
const ModalLoading = ({ visible }) => {

   
    return (
        <Modal transparent={true} visible={visible}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  };
  export default ModalLoading;
  const styles = StyleSheet.create({
  
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
  
  });