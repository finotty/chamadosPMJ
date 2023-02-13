import { Heading, HStack, IconButton, useTheme, StyledProps } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps &{
    title : string;
}

export function Header({title, ...rest}: Props){

    const {colors} = useTheme();
    const navigation = useNavigation();

    return(
       <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="secondary.700"
        pb={6}
        pt={12}
        {...rest}
       >
 
        <IconButton
         icon={<CaretLeft color={colors.blue[300]} size={24} />}
         onPress={() => navigation.goBack('home')}
        />

        <Heading color="blue.300" textAlign="center" fontSize="lg" flex={1} ml={-6}>
           {title}
        </Heading>

       </HStack>
    );
}