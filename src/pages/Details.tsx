import {useState,useEffect} from 'react';
import { Alert} from 'react-native';
import { VStack, Text, HStack , useTheme, ScrollView} from "native-base";
import { Header } from "../components/Header";

import { useRoute, useNavigation } from "@react-navigation/native";
import { OrderProps } from '../components/Order';

import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';

import {CircleWavyCheck, Hourglass, MapPinLine, Notepad} from 'phosphor-react-native';
import {CardDetails} from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import app from '../ConexaoFirebase/FireBD';
import { getAuth , onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, getDocs, doc, Timestamp,updateDoc} from "firebase/firestore";

type RouteParams ={
    orderId: string;
}

type OrderDetails = OrderProps & {
    description : string;
    solution : string;
    closed: any;

}

export function Details() {
    const [isLoading, setIsloading] = useState(true);
    const [isLoadingButton, setIsloadingButton] = useState(false);
    const [solution, setSolution] = useState('');
    const [order, setOrders] = useState<OrderDetails>({} as OrderDetails);

    const [user, setUser] = useState('');
    const [userADM, setUserADM] =useState('');

    const route = useRoute();
    const {orderId} = route.params as RouteParams;

    const navigation = useNavigation();

    const {colors} = useTheme();

    const db = getFirestore(app);
    const auth = getAuth(app);

    let logi = 1;


   async function finalizeRequest(){
    /*
     Esta função finaliza uma  solicitação  registrada  previamente.
     Antes de encerrar, verifica se a solução  foi  informada.  Caso 
     tenha sido, atualiza o registro da solicitação como "closed", 
     incluindo a solução e a data de encerramento. Se  tudo  ocorreu 
     corretamente, exibe uma mensagem de sucesso, caso contrário, exibe
     uma mensagem de erro.
    */
        setIsloadingButton(true);
        if(!solution){
        return Alert.alert('Solicitação','Informe a solução para encerrar a Solicitação.')
        }

           await updateDoc(doc(db, "orders", orderId), {
            status:'closed',
            solution,
            closed_at:Timestamp.now()
           })
           .then(() => {
            Alert.alert('Solicitação','Solicitação encerrada.')
            navigation.goBack();
          })
          .catch((error) => {
              console.log(error);
              setIsloadingButton(false);
              Alert.alert('Solicitação','Não foi possível encerrar solicitção.')
          })

    }

    useEffect(() => {
      //resgata o UID do usuario corrente 
      (user == '')?
      
      onAuthStateChanged(auth,response => {
        if(response)
         setUser(response.uid);   
      })
      : null
     
      },[])

    useEffect(() => {
      //Funções identicas as da Tela Home, futuramente vou melhorar isso
      
        const accont = async () => {//pegar uid do administrador
        const q = query(collection(db,'adm'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
          setUserADM(doc.data().conta);
          });
      }

     const read = async () => {
 
        const q = query(collection(db,'orders')); 
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => {
        const {setor,description,status,created_at,user,closed_at,solution} = doc.data();
           
                 if(doc.id == orderId){
                    setOrders({
                        id: doc.id,
                        setor,
                        description,
                        status,
                        solution,
                        when:dateFormat(created_at),
                        closed:(status == 'closed')?dateFormat(closed_at):null,
                        user
                    })}
                   });
                                     
          setIsloading(false);
        }
        accont();
        read();
       },[])

       if(isLoading){
        return <Loading/>
       }

    return(
     <VStack flex={1} bg="secondary.700" >
      
      <Header title="Solicitação"/>

      <HStack bg={order.status === 'open'? "blue.500" : "green.700"} justifyContent="center" p={4}>
          {
            order.status === 'closed' ? 
             <CircleWavyCheck size={22} /> :
             <Hourglass size={22}/>
          }

          <Text
           fontSize="sm"
           color={order.status === 'closed' ? colors.green[500] : colors.blue[300]}
           ml={2}
           textTransform="uppercase"
          >
            {order.status === 'closed' ? 'finalizado' : 'em andamento'}
          </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails 
           orderStatus={order.status}
           title='Local'
           description={order.setor}
           icon={MapPinLine}
           
          />

          <CardDetails
          orderStatus={order.status}
           title='Descrição do problema'
           description={order.description}
           icon={Notepad}
           footer={order.when}
          />

{/*Editar solução para que apenas o pessoal autorizado tenha acesso*/}
        {order.status === 'closed' || true?   
        <CardDetails
           orderStatus={order.status}
           title='Solução'
           description={order.solution}
           icon={CircleWavyCheck}
           footer={order.status === 'closed'? order.closed && `Encerrado em ${order.closed}` : null}
           
          >
           {((order.status === 'open') && (user === userADM)) ?
            <Input
             bg={"gray.100"}
             mb={2}
             h={24}
             textAlignVertical="top"
             multiline
             placeholder={order.status === 'open'? 'Descrição da solução' : ''}
             onChangeText={setSolution}
             editable={order.status === 'open'}
            />
            :
            ((order.status === 'open')) &&
            <Input
             bg={"gray.100"}
             mb={2}
             h={24}
             textAlignVertical="top"      
             placeholder={order.status === 'open'? 'Aguardando a Solução' : ''}
             editable={false}
            />

          }

          {((order.status === 'open') && (user === userADM))&&  
          <Button
             title='Salvar'
             onPress={finalizeRequest}
             isLoading={isLoadingButton}
             />}
          </CardDetails>
           : null  
        }
      </ScrollView>
      
     </VStack>
    );
}


