import React, { useState } from 'react';
import firebase from '../../Services/FirebaseConnection';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TextInput,
  TextTitle,
  TouchableOpacity,
  TouchableOpacityPrimary,
  View,
  ViewCenter,
  ViewContainer
} from '../../Components'

console.disableYellowBox = true;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function logar() {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home')
    } catch (error) {
      alert('Por favor insira dados validos')
    }
  }


  return (
    <View >
      <ViewContainer>
        <TextTitle>Inicie sessão</TextTitle>

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
        <ViewCenter>
          <TouchableOpacityPrimary onPress={logar}>
            <Text >Acessar</Text>
          </TouchableOpacityPrimary>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text >Criar conta</Text>
          </TouchableOpacity>
        </ViewCenter>
      </ViewContainer>
    </View>
  );
}
