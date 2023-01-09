import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { OrderProps } from './Order';

type Props = StyledProps & {
    title: string;
    goBack?: Function;
}

export function Header({ title, goBack, ...rest }: Props) {

    const { colors } = useTheme();

    const navigation = useNavigation();

    function handleGoBack() {

        navigation.navigate('home');

    }

    return (
        <HStack
            w='full'
            justifyContent={'space-between'}
            alignItems='center'
            bg='gray.200'
            pb={6}
            pt={12}
            p={6}
        >

            <IconButton
                onPress={goBack ? goBack : handleGoBack}
                icon={<CaretLeft color={colors.primary[700]} size={40} />}
            />

            <Heading
                color='primary.700'
                textAlign='center'
                fontSize='lg'
                flex={1}
                ml={-6}
            >
                {title}
            </Heading>

        </HStack>
    );
}