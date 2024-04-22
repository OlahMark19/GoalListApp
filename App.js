import * as React from 'react'; 
import { useState } from 'react';
import {   StyleSheet,   View,   FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'


  import GoalItem from './components/GoalItem';
  import GoalInput from './components/GoalInput';

export default function App(){
  const [modalVisible, setModalVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarDelVisible, setSnackbarDelVisible] = useState(false);
  const [deletedGoal, setDeletedGoal] = useState(null);
  const [renamedGoals, setRenamedGoals] = useState([]);
  const [selected, setSelected] = useState("");

  const data = [
    {key:'1', value:'Older', },
    {key:'2', value:'Latest'},
    {key:'3', value:'A-Z'},
    {key:'4', value:'Z-A',},
  ]


  function startAddGoalHandler(){
    setModalVisible(true);
  }

  function endAddGoalHandler(){
    setModalVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
       ...currentCourseGoals,
       {text: enteredGoalText, id: Math.random().toString()},
      ]);
      endAddGoalHandler();
  }
  function renameGoalHandler (id, newTitle) {
    setSnackbarVisible(true);
    setCourseGoals(currentCourseGoals => {
      const updatedGoals = currentCourseGoals.map(goal => {
        if (goal.id === id) {
          setRenamedGoals(prevRenamedGoals => [...prevRenamedGoals, { id: goal.id, text: goal.text }]);
          return { ...goal, text: newTitle };
        }
        return goal;
      });
      return updatedGoals;
    });
  };

  function deleteGoalHandler(id){
    setSnackbarDelVisible(true);
    setCourseGoals(currentCourseGoals => {
      const goalToDelete = currentCourseGoals.find(goal => goal.id === id);
      setDeletedGoal(goalToDelete);
      const updatedGoals = currentCourseGoals.filter(goal => goal.id !== id);
      return updatedGoals;     
    });
  }

  function handleUndo(){
    if (snackbarDelVisible && deletedGoal) {
      setCourseGoals(currentCourseGoals => {
      const insertionIndex = findInsertionIndex(deletedGoal);
      
      // Create a new array with the deletedGoal inserted at the correct position
      return [
        ...currentCourseGoals.slice(0, insertionIndex), // Items before the insertion index
        deletedGoal, // Insert the deleted goal
        ...currentCourseGoals.slice(insertionIndex) // Items after the insertion index
      ];
    });
    } else if (snackbarVisible) {
      setCourseGoals(currentCourseGoals => {
        const updatedGoals = currentCourseGoals.map(goal => {
          const renamedGoal = renamedGoals.find(renamedGoal => renamedGoal.id === goal.id);
          if (renamedGoal) {
            return { ...goal, text: renamedGoal.text };
          }
          return goal;
        });
        return updatedGoals;
      });
      setRenamedGoals(prevRenamedGoals => prevRenamedGoals.filter(goal => goal.id !== deletedGoal.id));
    }
  }
  
  function findInsertionIndex (deletedGoal){
    const insertionIndex = courseGoals.findIndex(goal => goal.id > deletedGoal.id);
    return insertionIndex !== -1 ? insertionIndex : courseGoals.length;
  }

  return(
   
   <SafeAreaProvider>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add New Goal'
       color='#5e0acc' 
       onPress={startAddGoalHandler}/>
      <GoalInput visible={modalVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler}
      /> 
      <SelectList boxStyles={{borderRadius:5, marginTop: 20}} 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />   
      <View style={styles.goalsContainer}>
        <FlatList keyboardShouldPersistTaps='handled' data={courseGoals} renderItem={(itemData) => {
          return <GoalItem
            text={itemData.item.text} 
            id={itemData.item.id} 
            onDeleteItem={deleteGoalHandler}
            onRenameItem={renameGoalHandler}/>; 
        }}
         keyExtractor={(item, index) => {
          return item.id;
        }}
         alwaysBounceVertical={false} />       
      </View>    
    </View>
    <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Undo',
          onPress: handleUndo,
        }}>     
        Goal renamed
      </Snackbar>
      <Snackbar
        visible={snackbarDelVisible}
        onDismiss={() => setSnackbarDelVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Undo',
          onPress: handleUndo,
        }}>     
        Goal deleted
      </Snackbar>
    </SafeAreaProvider>
    
    );
}
  
const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer:{
    flex:5
  },
})