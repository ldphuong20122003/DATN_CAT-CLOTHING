import React from "react";
import { Modal, StyleSheet, View } from "react-native";
const ModalFilter = ({ visible, children }) => {
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
               position:'absolute',
               height:'70%',
              width: "100%",
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderTopLeftRadius:20,
              borderTopRightRadius:20,
            
              elevation: 20,
              bottom:0
            }}
          >
            {children}
          </View>
        </View>
      </Modal>
    );
  };
  export default ModalFilter;
  const styles = StyleSheet.create({
  
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      
    },
  
  });