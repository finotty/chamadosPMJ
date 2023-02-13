/*
  Ainda pensando se vou manter esta tela,
  ainda não esta sendo chamada.
*/
import {useState} from 'react';
import { VStack, HStack, Heading, Icon, useTheme,Checkbox,Text} from 'native-base';

import {  User, House, Lock} from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {useNavigation} from '@react-navigation/native';

export function SolicitacaoCadastro(){

  const {colors} = useTheme();
  const [local, setLocal] = useState('');
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  const [check, setCheck] = useState('');
  const [check1, setCheck1] = useState('');
  const [ischeck, setIsCheck] = useState(false);
  const [ischeck1, setIsCheck1] = useState(false);

  function OptionUser(value:string) {
    alert(value);

    if(value === 'adm'){
      setCheck('adm')
      setIsCheck(true);
      setIsCheck1(false);
    }else{
      setCheck1('user');
      setIsCheck(false);
      setIsCheck1(true);
    }
  }

  return (
    <VStack flex={1} alignItems='center' bg="secondary.700" px={8} pt={24}>
      <HStack  mt={-5}>
        <Logo width={90} height={90} />
        <Heading color="primary.700" fontSize={28} mt={7} mb={6}>
          ChamadosPMJ
        </Heading>
      </HStack>

      <Heading mt={16}  color="gray.200">
        Cadastro de Usuários
      </Heading>
      
      <HStack mt={10}>
      <Checkbox value={check} onChange={() => OptionUser('adm')}isChecked={ischeck}ml={-14}  ><Text ml={-1} mr={5} fontSize={18} >Administrador</Text></Checkbox>
      <Checkbox value={check1} onChange={() => OptionUser('user')}isChecked={ischeck1}><Text ml={-1}fontSize={18}>Usuario</Text></Checkbox>
      </HStack>
     
      <Input 
       placeholder="Login: Ex. nome.sobrenome"
       mb={5}
       mt={5}
       value={local}
       onChangeText={setLocal}
       InputLeftElement={<Icon  as={<User color={colors.gray[300]} />} ml={3}/>}
      />
      <Input
       placeholder="Senha"
       mb={8}
       InputLeftElement={<Icon as={<Lock color={colors.gray[300]} />} ml={3} />}
       secureTextEntry
       />

       <Button title='Enviar solicitação' w="full" onPress={() => alert("seja bem vindo "+nome)}/>
      
      
    </VStack>
  );
}