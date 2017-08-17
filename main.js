import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Fold laundry', 'Take the dog for a walk', 'Eat ice cream'],
      newTodo: ''
    };

    this.handleNewTodo = this.handleNewTodo.bind(this);
  }

  handleNewTodo(text) {
    this.setState({
      newTodo: text
    });
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3000/api/todos')
  //     .then((allTodos) => {
  //       this.setState({
  //         todos: allTodos
  //       });
  //     });
  // }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            autofocus={true}
            multiline={true}
            onChangeText={this.handleNewTodo}
          >
            {this.props.newTodo}
          </TextInput>
          <Text style={styles.titleText}>My Todos</Text>
          {
            this.state.todos.map((todo, i) => {
              return (
                <Text key={i}>{todo}</Text>
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
