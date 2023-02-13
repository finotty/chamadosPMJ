import React from 'react';
import {  Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({title, ...rest}: Props) {
  return (
    <ButtonNativeBase
     bg="primary.700"
     h={14}
     fontSize='sm'
     rounded={12}
     _pressed={{ bg:"blue.700"}}
    {...rest}>
     <Heading color="#fff" fontSize={19}>
      {title}
     </Heading>
    </ButtonNativeBase>
  );
}