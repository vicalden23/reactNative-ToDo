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
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: ''
    };

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Once mounted, retrieve and display all data
  componentDidMount() {
    axios.get('http://localhost:2023/todos')
      .then((allTodos) => {
        allTodos.data.map((obj) => {
          this.state.todos.push(obj.todo);
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
    axios.post('http://localhost:2023/todos', {todo: this.state.newTodo})
      .then((newTodo) => {
        this.setState({
          todos: this.state.todos.concat(newTodo.data.todo)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Remove completed todo
  handleDelete(index) {
    axios.delete('http://localhost:2023/todos', {data: {todo: this.state.todos[index]}})
      .then((oldTodo) => {
        this.state.todos.splice(index, 1);
        this.setState({
          todos: this.state.todos
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

Expo.registerRootComponent(App);
