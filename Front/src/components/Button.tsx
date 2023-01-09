import { Button as ButtonNativeBase, Heading, IButtonProps } from 'native-base';

type Props = IButtonProps & {
    title: string,
    variant?: string
}

export function Button({ title, variant, ...rest }: Props) {
    return (
        <ButtonNativeBase
            bg={'primary.700'}
            h={14}
            variant={variant ? variant : 'solid'}
            fontSize='sm'
            rounded={'sm'}
            borderRadius={8}
            _pressed={{ bg: 'secondary.700'}}
            {...rest}
        >
            <Heading color={'white'} fontSize='sm'> 
                {title}
            </Heading>
        </ButtonNativeBase>
    );
}