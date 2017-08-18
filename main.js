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

  componentDidMount() {
    axios.get('http://localhost:2023/todos')
      .then((allTodos) => {
        console.log("RESPONSE FROM SERVER", allTodos);
        allTodos.data.map((obj) => {
          this.state.todos.push(obj.todo);
        })
        this.setState({
          todos: this.state.todos
        });
        console.log(this.state)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleNewTodo(text) {
    this.setState({
      newTodo: text
    });
  }

  handleSubmit() {
    this.setState({
      todos: this.state.todos.concat(this.state.newTodo)
    });
  }

  handleDelete(index) {
    this.state.todos.splice(index, 1);
    this.setState({
      todos: this.state.todos
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            autofocus={true}
            multiline={true}
            value={this.props.newTodo}
            onChangeText={this.handleNewTodo}
          >
          </TextInput>
          <Button
            title="Add Todo"
            onPress={this.handleSubmit}
          />
          <Text style={styles.titleText}>My Todos</Text>
          {
            this.state.todos.map((todo, i) => {
              return (
                <View key={i}>
                  <Text>
                    {todo}
                  </Text>
                  <Button
                    title="Remove"
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
    paddingTop: 25,
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

Expo.registerRootComponent(App);
