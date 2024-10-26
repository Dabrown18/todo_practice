import React, {useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

const {width} = Dimensions.get('window')

interface TODO {
  id: number
  title: string
}

const TODOS: TODO[] = [
  {
    id: 0,
    title: 'Todo 1',
  },
  {
    id: 1,
    title: 'Todo 2',
  },
  {
    id: 2,
    title: 'Todo 3',
  },
];

export default function Index() {
  const [todos, setTodos] = useState<TODO[]>(TODOS)
  const [newTodo, setNewTodo] = useState<string>('')
  const [searchTodo, setSearchTodo] = useState<string>('')

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTodo = () => {
    if (!newTodo) return;

    setTodos([...todos, {
      id: todos.length,
      title: newTodo,
    }])
    setNewTodo('')
  }

  let todosByTitle = todos;

  if (searchTodo?.trim() !== '') {
    let dataAfterSearch = [];

    todosByTitle.forEach(todo => {
      let title = todo.title ? todo.title.toLowerCase() : '';

      let matchTitle = title.indexOf(searchTodo.trim().toLowerCase());

      if (matchTitle !== -1) {
        dataAfterSearch.push(todo);
      }
    });

    todosByTitle = dataAfterSearch;
  }




  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.filterTodoContainer}>
          <TextInput
            style={styles.filterTodoInput}
            onChangeText={setSearchTodo}
            value={searchTodo}
          />
        </View>

        <FlatList
          data={todosByTitle}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Text>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={item => item.id}
        />
        <View style={styles.addTodoContainer}>
          <TextInput
            style={styles.addTodoInput}
            onChangeText={setNewTodo}
            value={newTodo}
          />
          <TouchableOpacity onPress={addTodo}>
            <Text>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addTodoContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    marginLeft: -20,
    width,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  addTodoInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  addTodoButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTodoInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 10,
  },
  filterTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },

})
