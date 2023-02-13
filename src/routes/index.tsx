import {useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import app from '../ConexaoFirebase/FireBD';
import { getAuth , onAuthStateChanged, Auth} from "firebase/auth";

import { AppRoutes } from './app.routes';
import SignIn from '../pages/SignIn';
import { Loading } from '../components/Loading';
import { SolicitacaoCadastro } from '../pages/SolicitacaoCadastro';


export function Routes() {

 const [isloading, setIsloading] = useState(true);
 const [user, setUser ]= useState<any>();

 const auth = getAuth(app);

 useEffect(() => {
    
     onAuthStateChanged(auth,response => {
      // if(response){
            setUser(response);
            setIsloading(false);
       // }
        
        
        
     });
     
     
 },[])
   if(isloading){
    return <Loading/>
   }
    return(
        <NavigationContainer>
            
             {user ? <AppRoutes/> : <SignIn/>}
           
        </NavigationContainer>
    );
}