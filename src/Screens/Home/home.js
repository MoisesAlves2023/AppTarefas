import React, { useState, useEffect, useRef } from 'react';
import { Text } from '../../Components';
import firebase from '../../Services/FirebaseConnection';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard,
} from 'react-native';
import List from './list';
import Feather from 'react-native-vector-icons/Feather'

export default function Home() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [addItem, setAddItem] = useState('');
  const [key, setKey] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        getUser(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  async function getUser(uid) {
    try {
      const userSnapshot = await firebase
        .database()
        .ref(`users/${uid}`)
        .once('value');

      const userData = userSnapshot.val().name;
      setName(userData);

      const tasksSnapshot = await firebase
        .database()
        .ref(`tarefas/${uid}`)
        .once('value');

      const tasksData = tasksSnapshot.val() || {};
      const tasksArray = Object.keys(tasksData).map((key) => ({
        key,
        nome: tasksData[key].nome,
      }));

      setTasks(tasksArray);
    } catch (error) {
      console.error('Erro ao obter usuário:', error.message);
    }
  }

  async function addItemToFirebase() {
    if (addItem === '') {
      return;
    }

    try {
      if (key !== '') {
        await firebase
          .database()
          .ref(`tarefas/${userId}/${key}`)
          .update({ nome: addItem });

        setTasks((oldTasks) =>
          oldTasks.map((item) =>
            item.key === key ? { ...item, nome: addItem } : item
          )
        );

        setKey('');
      } else {
        const tarefasRef = firebase.database().ref(`tarefas/${userId}`);
        const newTaskRef = tarefasRef.push();

        await newTaskRef.set({
          nome: addItem,
        });

        const data = {
          key: newTaskRef.key,
          nome: addItem,
        };

        setTasks((oldTasks) => [...oldTasks, data]);
      }

      setAddItem('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Erro ao adicionar/editar item:', error.message);
    }
  }

  async function deleteTask(key) {
    try {
      const itemRef = firebase.database().ref(`tarefas/${userId}/${key}`);
      await itemRef.remove();

      setTasks((oldTasks) => oldTasks.filter((item) => item.key !== key));
    } catch (error) {
      console.error('Erro ao excluir item:', error.message);
    }
  }

  function editTask(data) {
    setKey(data.key);
    setAddItem(data.nome);
    inputRef.current.focus();
  }

  async function handleLogout() {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  }
  function cancelEdit() {
    setKey('')
    setAddItem('')
    Keyboard.dismiss
  }

  return (
    <SafeAreaView>
      {key.length > 0 && (
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name="x-circle" size={20} color='red' />
        </TouchableOpacity>
        <Text style={{ color: 'red', marginLeft: 5 }}>Editando tarefa</Text>
      </View>
      )} 
      
  
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="O que vai fazer hoje?"
          onChangeText={(texto) => setAddItem(texto)}
          value={addItem}
          ref={inputRef}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            backgroundColor: 'black',
            width: 40,
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={addItemToFirebase}>
          <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <List data={item} deleteItem={deleteTask} editItem={editTask} />
        )}
      />
    </SafeAreaView>
  );
}
