import { Text, Button, IButtonProps, useTheme } from 'native-base';

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'open' | 'closed';
    bgColorActive: string;
}

export function Filter({ title, isActive = false, bgColorActive = "primary.700", type, ...rest }: Props) {

    const { colors } = useTheme()

    const colorType = type === 'open' ? colors.secondary[700] : colors.gray[100];

    return (
        <Button
            variant={'outline'}
            h="10"
            shadow={'2'}
            mr={2}
            borderColor={bgColorActive}
            bgColor={isActive ? bgColorActive : 'gray.100' }
            size='sm'
            my={2}
            {...rest}
        >

            <Text color={isActive ? 'white': bgColorActive} fontSize='xs' textTransform={'uppercase'}  >
                {title}
            </Text>

        </Button>
    );
}