import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({...rest} : IInputProps) {
  return (
    <NativeBaseInput 
    bg={'gray.100'}
    h={14}
    size='md'
    borderRadius={8}
    borderWidth={0}
    fontSize='md'
    fontFamily={'body'}
    color='black'
    _focus={{
        borderWidth: 1,
        borderColor: 'primary.700',
        bg: 'gray.100'
    }}
    {...rest}
    />
  );
}