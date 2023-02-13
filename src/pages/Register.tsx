import React,{useState, useEffect,useRef} from 'react';
import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Alert } from 'react-native';
import { useNavigation} from '@react-navigation/native';

import app from '../ConexaoFirebase/FireBD';
import { getFirestore ,collection,Timestamp,addDoc,query,getDocs} from "firebase/firestore";
import { getAuth , onAuthStateChanged} from "firebase/auth";

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert:true,
    shouldPlaySound:true,
    shouldSetBadge:true,
  })

});

type RouteParams ={
  user: string;
}

export function Register() {

  const [isLoading, setIsloading] = useState(false);
  const [setor, setSetor] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  
  const db = getFirestore(app);
  const auth = getAuth(app);

  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener:any = useRef();
  const responseListener:any = useRef();

  async function newRequest(){

    /* 
     A função newRequest verifica se os campos setor e description estão preenchidos.
     Em  seguida,  ela  adiciona um novo documento a uma coleção "orders" no banco de 
     dados e,  se  tudo ocorrer  bem,  envia  uma notificação push ao administrador e 
     informa ao usuário que a solicitação foi registrada com  sucesso, redirecionando 
     o usuário de volta a tela Home. Caso contrário, informa ao usuário  que não  foi 
     possível registrar a solicitação.
    */
 
    if(!setor || !description){
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setIsloading(true);

    await addDoc(collection(db, "orders"), {
      setor,
      description,
      status: 'open',
      created_at: Timestamp.now(),
      user,
      closed_at:''
    })
    .then(() => {
      sendPushNotification(expoPushToken);
      Alert.alert('Solicitação','Solicitação registrada com sucesso.')  
      navigation.goBack();

    }).catch(error => {
      console.log(error);
      setIsloading(false);
      return Alert.alert('Solicitação', 'Não foi possivel registrar o pedido.');
    })
 
  }

  async function sendPushNotification(expoPushToken:any) {
    /*
     Esta função envia uma notificação push através do Expo para um token específico(adm). 
     A mensagem inclui um título com o setor em  que  o chamado foi registrado e o corpoda 
     mensagem inclui a descrição do problema.
    */
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Novo chamado na '+setor+'!',
      body: 'Descrição do problema: '+description+'.',
      trigger: { seconds: 5}
      
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
  }

  useEffect(() => {

    /*
     Esta função adiciona dois listeners de notificação: um para quando uma notificação é recebida
     e outro para quando uma resposta à notificação é recebida. 
     Quando uma notificação é recebida, ela define a notificação na variável "notification". 
     Ao desmontar o componente, os listeners são removidos.
    */
   
    notificationListener.current = Notifications.addNotificationReceivedListener((notification:any) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  useEffect(() => {
  
    (user == '')?
    
    onAuthStateChanged(auth,response => {
      if(response)
       setUser(response.uid);   
    })
    : null
   
    const getTokenInFirebase = async () => {//pegar token para notificação do administrador
      const q = query(collection(db,'adm'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => {
        setExpoPushToken(doc.data().token);
        });
    }

    getTokenInFirebase();
    
    },[])

    return(
      <VStack flex={1} p={6} bg="secondary.700">
        <Header title="Nova solicitação"/>

        <Input
         placeholder="Informe o setor"
         mt={4}
         onChangeText={setSetor}
        />

        <Input
         placeholder="Descrição do problema"
         flex={1}
         mt={5}
         multiline
         textAlignVertical="top"
         onChangeText={setDescription}
        />

        <Button title="Enviar solicitação" 
         mt={5}
         isLoading={isLoading}
         onPress={() => newRequest()}
        />
           
      </VStack>
    );

}






