import {useState,useEffect} from 'react';
import { VStack, HStack, Heading, useTheme, Box, IconButton, FlatList, Center, Text} from 'native-base';
import { Alert} from 'react-native';

import {SignOut, ChatTeardropText, UserPlus, UserList} from 'phosphor-react-native';

import {Filter} from '../components/Filter';
import {Order, OrderProps} from '../components/Order';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { useNavigation } from '@react-navigation/native';

import app from '../ConexaoFirebase/FireBD';
import { getAuth, signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, where, getDocs,onSnapshot} from "firebase/firestore";
import { dateFormat } from '../utils/firestoreDateFormat';

import ModalCadastro from '../components/ModalCadastro';

export function Home() {

  const [isLoading , setIsloading] = useState(true);
  const {colors} = useTheme();
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState <OrderProps[]>([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
 
  const [user, setUser] =useState<any>('');
  const [userADM, setUserADM] =useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  function newRequest() { 
    navigation.navigate('register');
  }

  function openRequestDetails(orderId: string){
   navigation.navigate('details', { orderId });
  }

  function Logout(){
    signOut(auth)
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possivel sair.');
    })
  }

 function compareUser(valor:any){//utilizado para filtrar a lista do firebase e exibir apenas os dados do usuario sem privilegio de ADM
   if(valor.user === user){
    return valor;
   }
 }

 function registerUser(){
   setModalVisible(true);
 }

  useEffect(() => { 
    (user == '')?
    onAuthStateChanged(auth,response => {
        setUser(response?.uid);
      
    }) : null
  
  },[])

  useEffect(() => {
  
   setIsloading(true);

   
   
    const accont = async () => {
    /*
      Esta função obtém a UID do administrador de uma coleção na base
      de dados e atualiza o estado da aplicação com esse valor.
    */
        const q = query(collection(db,'adm'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
          setUserADM(doc.data().conta);
          });
    }  
   
   const read =  async () => {  
    /*
      Esta  função  lê dados  de uma coleção no Firebase em tempo real. 
      Ela filtra os dados de acordo com o status selecionado e atualiza 
      o estado da aplicação com as informações relevantes. 
      Se necessário, a assinatura da consulta em tempo real pode ser cancelada.
    */ 
    const q = query(collection(db,'orders') , where('status','==',statusSelected ));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const order: OrderProps[] = [];
      
      querySnapshot.forEach((doc) => {
        const {setor,description,status,created_at,user} = doc.data();
          order.push({
            id: doc.id,
            setor,
            description,
            status,
            user,
            when:dateFormat(created_at)});
      });

      if((user)!= userADM){
        let dt = order.filter(compareUser);
        setOrders(dt);
        }else{
          setOrders(order);
        }
           
    });
      
      return unsubscribe;    
  }
    
    accont();
    read();
 
    setIsloading(false);
   
  },[statusSelected,user,userADM])

  return (
    <VStack flex={1} alignItems='center' bg="secondary.700"  pt={24}>
        <HStack  mt={-16} borderBottomWidth={1} borderColor="gray.200" width="100%" paddingLeft={5} height="10%" justifyContent="space-between">
            {/*<Logo width={60} height={60} />*/}
            <Heading   color="primary.700" fontSize={24} mt={2} mb={6} mr={14}  >
            ChamadosPMJ
            </Heading>
        
            <IconButton
            icon={<SignOut size={32} color={colors.gray[300]}/>}
            ml={20}
            onPress={Logout}
            />
            
        </HStack>

       <VStack flex={1} px={12} >
           <HStack  w="full" mt={6} mb={4} justifyContent="space-between" alignItems="center">
               <Heading   >
                   Solicitações
               </Heading>
               <Box mr={-10} ml={5} fontWeight="bold">{orders.length}</Box>
           </HStack>

           <HStack space={3} mb={4}>
                <Filter
                    type='open'
                    title='em andamento'
                    onPress={() => setStatusSelected('open')}
                    isActive={statusSelected === 'open'}
                />

                <Filter
                    type='closed'
                    title='finalizados'
                    onPress={() => setStatusSelected('closed')}
                    isActive={statusSelected === 'closed'}
                />
          </HStack>  

       { (isLoading )? <Loading/> :
         <FlatList
           data={orders}
           keyExtractor={item => item.id}
           renderItem={({item}) => ((item.user === user)||user === userADM)? (<Order data={item} onPress={() => openRequestDetails(item.id)} />):null}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{ paddingBottom:100 }}
           ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40}/>
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'} solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizados'}
              </Text>
            </Center>
           )}
          />} 

       {user !== userADM && userADM !== ''? 
       <Button title='Nova solicitação' onPress={newRequest}/> : userADM === user ? 
       <HStack justifyContent='space-between' rounded={10} alignItems="center">
          <IconButton
            icon={<UserPlus size={30} color={colors.gray[300]}/>}
            ml={1}
           onPress={registerUser}
            />
            <IconButton
            icon={<UserList size={33} color={colors.gray[300]}/>}
            mr={1}
            
           // onPress={fazerLogout}
            />
       </HStack> : null
      }
       
       </VStack>

      <ModalCadastro visible={modalVisible} setVisible={setModalVisible}/>
    </VStack>
  );
}