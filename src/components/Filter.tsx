import { Text, Button, IButtonProps, useTheme } from "native-base";

type Props = IButtonProps &{
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
}

export function Filter({title, isActive = false, type, ...rest}: Props) {
 
 const {colors} = useTheme();

 const colorType = type === 'open' ? colors.blue[300] : colors.green[500]

return(
  <Button
   variant="outline"
   borderWidth={1}
   borderColor={isActive ? colorType : 'gray.300'}
   bgColor="secondary.700"
   flex={1}
   h={10}
   size="sm"
   {...rest}
  >
   <Text color={isActive ? colorType : 'gray.300'} textTransform="uppercase">
       {title}
   </Text>
  </Button>

 );   
}