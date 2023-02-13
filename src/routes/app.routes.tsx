import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Register } from '../pages/Register';
import { SignIn } from 'phosphor-react-native';
import {SolicitacaoCadastro} from '../pages/SolicitacaoCadastro';



const {Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
          <Screen name='home' component={Home}/>
          <Screen name='register' component={Register}/>
          <Screen name='details' component={Details}/>
          <Screen name='signin' component={SignIn}/>
          <Screen name='cadastro' component={SolicitacaoCadastro}/>
        
      </Navigator>
    );
}