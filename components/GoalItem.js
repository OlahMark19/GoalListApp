import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Modal, Alert } from 'react-native';


function GoalItem(props){
  const[modalIsVisible, setModalToVisible] = useState(false);

  const handleLongPress = () => {
    setModalToVisible(true);
  };

  const closeModal = () => {
    setModalToVisible(false);
  };

  return(
    <View style={styles.goalItem}>
    <Pressable
      android_ripple={{ color: '#dddddd' }}
      onLongPress={handleLongPress}
      style={({ pressed }) => pressed && styles.pressedItem}>
      <Text style={styles.goalText}>{props.text}</Text>
    </Pressable>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalIsVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.modalText}>
            <Text style={styles.textMod}>Rename</Text>
          </Pressable>
          <Pressable style={styles.modalText}>
            <Text style={styles.textMod}>Delete</Text>
          </Pressable>
          <Pressable style={[styles.buttonClose]}
            onPress={closeModal}>
            <Text style={styles.closeBtn}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  </View>
);

}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
      },
      pressedItem:{
        opacity: 0.5,

      },
      goalText:{
        color: 'white',
        padding: 8,
      },
      centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView:{
        paddingHorizontal: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },      
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText:{
        backgroundColor: '#5e0acc',
        padding: 3,
        width: 100,
        borderRadius: 5
      },
      textMod:{
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
      },
      buttonClose:{
        backgroundColor: '#f31282',
        padding: 3,       
        width: 100,
        margin: 7,
        borderRadius: 5
      },
      closeBtn:{
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
      }

});