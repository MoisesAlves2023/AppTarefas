import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TextTitle,
  TouchableOpacity,
  TouchableOpacityPrimary,
  TouchableOpacitySecondary,
  View,
  ViewCenter,
  ViewContainer
} from '../../Components'
import firebase from '../../Services/FirebaseConnection'
import { useNavigation } from '@react-navigation/native';
console.disableYellowBox = true;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null); // Adicione o estado para armazenar o ID do usuário
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Armazene o ID do usuário no estado
      }
    });

    return () => unsubscribe();
  }, []);

  async function cadastrar() {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Não precisa mais utilizar .then(), o ID do usuário já está disponível
      firebase.database().ref('users').child(userCredential.user.uid).set({
        name: name
      });

      alert('Usuário criado com sucesso');
      setEmail('');
      setName('');
      setPassword('');
      navigation.navigate('Home');

    
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert('Sua senha deve ter pelo menos 6 caracteres');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email inválido');
      } else {
        alert('Ops, algo deu errado');
      }
    }
  }
 

  return (
    <View >
      <ViewContainer>
        <TextTitle>Cadastre-se</TextTitle>

        <Text>Nome</Text>
        <TextInput
          placeholder='EX: João Pedro'
          value={name}
          onChangeText={(texto) => setName(texto)}
        />
        <Text>Email</Text>
        <TextInput
          placeholder='EX: joao@teste.com'
          value={email}
          onChangeText={(texto) => setEmail(texto)}
        />

        <Text> Senha </Text>

        <TextInput
          placeholder='insira sua senha'
          value={password}
          onChangeText={(texto) => setPassword(texto)}
          secureTextEntry={true} // Para esconder a senha
        />
        <ViewCenter style={[{flexDirection:'row',justifyContent: 'space-between'}]}>
          <TouchableOpacityPrimary onPress={cadastrar}>
            <Text >Cadastrar</Text>
          </TouchableOpacityPrimary>

          <TouchableOpacitySecondary onPress={() => navigation.navigate('Login')}>
            <Text >Cancelar</Text>
          </TouchableOpacitySecondary>
        </ViewCenter>
      </ViewContainer>
    </View>
  );
}
