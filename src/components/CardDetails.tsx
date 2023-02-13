import {useState,useEffect} from 'react';
import {ReactNode} from 'react';
import {IconProps} from 'phosphor-react-native';
import { VStack,HStack, Text, Box, useTheme } from 'native-base';


type Props ={
    title:string;
    description?:string;
    footer?:string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
    orderStatus:string;
    
    
}



export function CardDetails({
    title,
    description,
    footer =null,
    icon: Icon,
    children,
    orderStatus
    
}:Props) {
    const {colors} = useTheme();

    const [order, setOrders] = useState({});
    
  return (
    <VStack bg={orderStatus == 'open'? 'blue.500' : 'green.700'} p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4} ml={-1}>
        <Icon  />
        <Text ml={1} color="gray.700" fontSize="sm" textTransform="uppercase">
            {title}
        </Text>

      
      </HStack>  
      {
            !!description &&
            <Text color="gray.700" fontSize="md" textTransform="uppercase">
                {description}
            </Text>
        }

        { children }

        {
            !!footer && 
            <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
                <Text mt={1} color="gray.300" fontSize="sm">
                   {footer}
                </Text>
            </Box>
        }

        
    </VStack>
  );
}