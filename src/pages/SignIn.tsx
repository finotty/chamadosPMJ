
import {useState,useEffect} from 'react';
import {  TouchableOpacity, Text,Alert } from 'react-native';
import { VStack, HStack, Heading, Icon, useTheme} from 'native-base';

//Importações firebase
import app from '../ConexaoFirebase/FireBD'; // <<-- Conexao com banco 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { getAuth } from "firebase/auth";

import {Key, User} from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';  
import { Button } from '../components/Button';

import {useNavigation} from '@react-navigation/native';

export default function SignIn() {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth(app);

  //função para validar e fazer Login
  function handleSignIn() {
    const emailmerge = (email + '@pmj.com').toLowerCase();
    if(!email || !password){
      return Alert.alert('Entrar', 'Informe Usuario e Senha!');
    }

    signInWithEmailAndPassword(auth,emailmerge, password)
    .catch((error) => {
     console.log(error.code);
      if(error.code =='auth/user-not-found'){
        setIsloading(false);
      return Alert.alert('Entrar','Usuario ou senha incorretos.')
      }
      if(error.code =='auth/wrong-password'){
        setIsloading(false);
       return Alert.alert('Entrar','Usuario ou senha incorretos.')
      }

      if(error.code =='auth/invalid-email'){
        setIsloading(false);
        return Alert.alert('Entrar','Usuario ou senha incorretos.')
       }
     setIsloading(false);
    })
      
   setIsloading(true);
   
  }


  return (
    <VStack flex={1} alignItems='center' bg="secondary.700" px={8} pt={24}>
      <HStack  mt={-5}>
        <Logo width={90} height={90} />
        <Heading color="primary.700" fontSize={28} mt={7} mb={6}>
          ChamadosPMJ
        </Heading>
      </HStack>

      <Heading mt={16} color="gray.200">
        Acesse sua conta
      </Heading>

      <Input 
       placeholder="Usuario"
       mb={5}
       mt={5}
       value={email}
       onChangeText={setEmail}
       InputLeftElement={<Icon  as={<User color={colors.gray[300]} />} ml={3}/>}
      />
      <Input
       placeholder="Senha"
       mb={8}
       value={password}
       onChangeText={setPassword}
       InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={3} />}
       secureTextEntry
       />

       <Button 
       title='Entrar'
        w="full" 
        onPress={handleSignIn}
        isLoading={isLoading}
        />

       <HStack marginTop={24}>
         <Text style={{color:'#7C7C8A', fontSize:16}}>Não possui uma conta?</Text>
         <TouchableOpacity onPress={() => alert("Ainda em desenvolvimento!")}>
          <Text style={{color:'#7C7C8A', fontSize:16}}> Clique aqui!</Text>
         </TouchableOpacity>
       </HStack>
      
      
    </VStack>
  );
}