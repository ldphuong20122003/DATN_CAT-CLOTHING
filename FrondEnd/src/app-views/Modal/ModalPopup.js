import React from "react";
import { Modal, StyleSheet, View } from "react-native";
const ModalPopups = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    React.useEffect(()=>{
      toggleModal();
    },[visible]);
    const toggleModal=()=>{
      if(visible){
        setShowModal(true)
      }else{
        setShowModal(false)
      }
    }
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 30,
              borderRadius: 20,
              elevation: 20,
            }}
          >
            {children}
          </View>
        </View>
      </Modal>
    );
  };
  export default ModalPopups;
  const styles = StyleSheet.create({
  
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
  
  });