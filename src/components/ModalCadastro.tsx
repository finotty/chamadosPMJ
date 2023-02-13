import React,{useState} from 'react';
import {  User, House, Lock, IdentificationCard} from 'phosphor-react-native';
import { VStack, HStack, Heading, Icon, useTheme,Checkbox,Text,Modal} from 'native-base';

import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {useNavigation} from '@react-navigation/native';

import { View } from 'react-native';


type props = {
    visible : boolean;
    setVisible:any;
}

const ModalCadastro = ({ visible, setVisible } :props) => {
  const {colors} = useTheme();
  const [local, setLocal] = useState('');
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  const [check, setCheck] = useState('');
  const [check1, setCheck1] = useState('');
  const [ischeck, setIsCheck] = useState(false);
  const [ischeck1, setIsCheck1] = useState(false);

  function OptionUser(value:string) {
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

  function CadastrarNovoUsuario(){
    alert('teste')
  }
  return (
    <Modal
      style={{}}
      animationPreset='slide'
      isOpen={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
          <VStack mt={24} height='88%' width='95%' mb={10}>

            <HStack bg="secondary.700" justifyContent='flex-end' roundedTop={12}>
             <Button title='X' width={10} h={10} roundedTopLeft={0} roundedBottomRight={0} onPress={() => setVisible(false)}/>
            </HStack>

            <VStack flex={1} alignItems='center' bg="secondary.700" px={8} pt={10} roundedBottom={12}>
                
                <Heading color="primary.700" fontSize={28} mb={14}>
                  Cadastro de Usuários
                </Heading>
      
                <HStack >
                 <Checkbox  value={check} onChange={() => OptionUser('adm')}isChecked={ischeck}ml={-14}  ><Text ml={-1} mr={5} fontSize={18} >Administrador</Text></Checkbox>
                 <Checkbox  value={check1} onChange={() => OptionUser('user')}isChecked={ischeck1}><Text ml={-1}fontSize={18}>Usuario</Text></Checkbox>
                </HStack>
          
                <Input 
                  placeholder="Nome"
                  mb={5}
                  mt={5}
                  value={local}
                  onChangeText={setLocal}
                  InputLeftElement={<Icon  as={<IdentificationCard color={colors.gray[300]} />} ml={3}/>}
                />
                <Input 
                  placeholder="Sobrenome"
                  //mb={5}
                 // mt={5}
                  value={local}
                  onChangeText={setLocal}
                  InputLeftElement={<Icon  as={<IdentificationCard color={colors.gray[300]} />} ml={3}/>}
                />
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

                <Button title='Cadastrar' w="full" onPress={() => alert("seja bem vindo "+nome)}/>
            
            
           </VStack>
         </VStack>

    </Modal>
  );
};

export default ModalCadastro;

