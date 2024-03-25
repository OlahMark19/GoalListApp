import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {   StyleSheet,   View,   FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

  import GoalItem from './components/GoalItem';
  import GoalInput from './components/GoalInput';

export default function App(){
  const [modalVisible, setModalVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([]);

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
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.map(goal => {
        if (goal.id === id) {
          return { ...goal, text: newTitle };
        }
        return goal;
      })
    });
  };

  function deleteGoalHandler(id){
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return(
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add New Goal'
       color='#5e0acc' 
       onPress={startAddGoalHandler}/>
      <GoalInput visible={modalVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler}
      />    
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
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
    </>
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