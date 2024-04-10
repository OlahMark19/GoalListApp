import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Alert, TextInput, Button } from 'react-native';


function GoalItem(props){
  const[modalIsVisible, setModalToVisible] = useState(false);
  const[modal2Visible, setModal2Visible] = useState(false);
  const[newTitle, setNewTitle] = useState('');
  
  const handleLongPress = () => {
    setModalToVisible(true);
  };

  const openModal2 = () =>{
    setModal2Visible(true);
    setModalToVisible(false);
  };

  const closeModal = () => {
    setModalToVisible(false);
  };
  const closeModal2 = () => {
    setModal2Visible(false)
    setNewTitle('');
  };
  const handleRename = () => {
    if (newTitle.trim() === '') {    
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }
    else{
      props.onRenameItem(props.id, newTitle)
      setNewTitle('');    
      closeModal2();
    }  
  }
  const handleDelete = () => {
    props.onDeleteItem( props.id);
  }

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
          <Pressable style={styles.modalText} 
          onPress={openModal2} 
          android_ripple={{ color: '#210644' }}>
            <Text style={styles.textMod}>Rename</Text>
          </Pressable>
          <Pressable style={styles.modalText} 
          onPress={handleDelete} 
          android_ripple={{ color: '#210644' }}>
            <Text style={styles.textMod}>Delete</Text>
          </Pressable>
          <Pressable style={[styles.buttonClose]}
            onPress={closeModal}
            android_ripple={{ color: '#b50e61' }}>
            <Text style={styles.closeBtn}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Modal
      animationType='slide'
      transparent={true}
      visible={modal2Visible}
      onRequestClose={() => {closeModal2}}
    >
      <View style={styles.modal2Center} >
        <View style={styles.modal2View}>
        <TextInput 
           style={styles.textInput2}
           placeholder="Rename the goal"
           onChangeText={setNewTitle}
           value={newTitle}>
        </TextInput>
        <View style={styles.modal2btns}>
          <View style={styles.btn}>
            <Button title="Rename" onPress={handleRename} color="#5e0acc"/>
          </View>
          <View style={styles.btn}>
            <Button title="Cancel" onPress={() => {closeModal2(); setModalToVisible(true);}} color="#f31282"/>
          </View>
        </View>
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
      },
      modal2Center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',       
      },
      modal2View:{
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
      modal2btns:{
        marginTop:16,
        flexDirection: 'row'
      },
      btn:{
        width: 75,
        marginHorizontal: 8
      },
      textInput2:{
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        width: 170,
        padding: 4,
      },
      
});