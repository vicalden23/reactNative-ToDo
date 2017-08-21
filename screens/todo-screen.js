import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: ''
    };

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  //Once mounted, retrieve and display all data
  componentDidMount() {
    axios.get('http://localhost:2023/api/todos', {headers: { 'x-access-token': this.props.screenProps.idToken } })
      .then((allTodos) => {
        const todosArray = allTodos.data.split(', ');
        todosArray.map((todo) => {
          this.state.todos.push(todo);
        });
        this.setState({
          todos: this.state.todos
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Grab text from input field
  handleNewTodo(text) {
    this.setState({
      newTodo: text
    });
  }

  //Persist and display new todo from user
  handleSubmit() {
    const addNewTodo = this.state.todos.join(', ') + ', ' + this.state.newTodo;
    axios.put('http://localhost:2023/api/todos', {todo: addNewTodo}, {headers: { 'x-access-token': this.props.screenProps.idToken } })
      .then((allTodos) => {
        const todosArray = allTodos.data.split(', ');
        this.setState({
          todos: todosArray
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSignOut() {
    const action = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'AuthScreen' })
      ]
    });
    this.props.navigation.dispatch(action);
  }

  //Remove completed todo
  handleDelete(index) {
    const removeTodo = this.state.todos.splice(index, 1);
    const update = this.state.todos.join(', ');
    axios.put('http://localhost:2023/api/todos', {todo: update}, {headers: { 'x-access-token': this.props.screenProps.idToken } })
      .then((allTodos) => {
        const todosArray = allTodos.data.split(', ');
        this.setState({
          todos: todosArray
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.listEntry}>
              <TextInput
                autofocus={true}
                multiline={true}
                placeholder="Start typing here"
                value={this.props.newTodo}
                onChangeText={this.handleNewTodo}
              >
              </TextInput>
            </View>
            <Button
              fontWeight="bold"
              raised
              title="Add Todo"
              onPress={this.handleSubmit}
            />
          </View>
          <Text style={styles.titleText}>My Todos</Text>
          {
            this.state.todos.map((todo, i) => {
              return (
                <View key={i} style={styles.rowContainer}>
                  <View style={styles.listEntry}>
                    <Text>{todo}</Text>
                  </View>
                  <Button
                    color="white"
                    backgroundColor="#397af8"
                    fontWeight="bold"
                    raised
                    title="Completed"
                    onPress={() => this.handleDelete(i)}
                  />
                </View>
              )
            })
          }
          <Button
            color="white"
            backgroundColor="#397af8"
            fontWeight="bold"
            raised
            title="Sign Out"
            onPress={this.handleSignOut}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flexWrap: 'wrap'
  },
  listEntry: {
    flexDirection: 'column',
    maxWidth: 200,
    flexGrow: 1
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default TodoScreen;
