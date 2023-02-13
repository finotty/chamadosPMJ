import React,{useEffect, useState} from "react";
import {Box, HStack, Text , useTheme, VStack,Circle, Pressable, IPressableProps } from "native-base";
import { ClockAfternoon, Hourglass, CircleWavyCheck, User } from "phosphor-react-native";
//import auth from '@react-native-firebase/auth';

export type OrderProps ={
  id: any;
  setor : any;
  when: any;
  status: 'open' | 'closed';
  user:any;
  description:any;

}

type Props = IPressableProps & {
  data: OrderProps;
}
export function Order({data, ...rest}: Props) {

const {colors} = useTheme();
const statusColor = data.status === 'open' ? colors.blue[300] : colors.green[500]




return(
<Pressable {...rest}>
  <HStack
   bg={data.status === 'open'? "blue.500" : 'green.700'}
   mb={4}
   alignItems="center"
   justifyContent="space-between"
   rounded="sm"
   overflow="hidden"
  >
      <Box h="full" w={2} bg={statusColor}/>
      
 
   <VStack flex={1} my={5} ml={5}>
      <Text>Setor:  {data.setor}</Text>

      <HStack alignItems="center">
        <ClockAfternoon size={15} color={colors.gray[300]} />
        <Text color="gray.200" fontSize="xs" ml={1} >{data.when}</Text>
      </HStack>
    </VStack> 
    

   <Circle  h={12} w={12} mr={5} borderWidth={data.status === 'open'? 1 : null}>
         {
             data.status === 'closed' ?
              <CircleWavyCheck size={55} color={statusColor} /> :
              <Hourglass size={24} color={statusColor} />
         }
     </Circle> 
  </HStack>
</Pressable>

 );   
}