import { useState } from "react";
import { Heading, Icon, VStack, useTheme, Text, FormControl, WarningOutlineIcon, useToast, Box } from "native-base"
import { Key, IdentificationCard } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from '@react-navigation/native';

import { Alert } from "react-native";
import api from "../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SingIn({ setUser, setCadastrar }) {

    const [isLoading, setIsLoading] = useState(false);
    const [CPF, setCPF] = useState('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const { colors } = useTheme();

    const toast = useToast();

    const navigation = useNavigation();

    async function handleSingIn() {
        setIsLoading(true)
        await api.post('api/User/login', { CPF, senha }).then(async (response: any) => {
            console.log(response.data)
            setUser(response.data)
            await AsyncStorage.setItem("User", JSON.stringify(response.data));
            setIsLoading(false)

            if (!response.data)
                setError(true)
            else {
                setError(false)
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="10" py="1" top={-40} rounded="8" mb={5}>
                            <Text color={'gray.100'}>Login realizado com sucesso</Text>
                        </Box>;
                    }
                });
            }
        })
            .catch(error => {
                Alert.alert(`${error}`);
                console.log(error)
                setIsLoading(false)
                setError(true)
            })
    }

    return (
        <VStack flex={1} alignItems='center' bg='gray.200' px={8} pt='24'>


            <Heading color={'secondary.700'} fontSize={50} mt={20} mb={16}>
                Tele<Text color={'primary.700'}>Med</Text>
            </Heading>
            <FormControl isInvalid={error} mb={4}>
                <Input
                    placeholder='CPF'
                    InputLeftElement={<Icon as={<IdentificationCard color={colors.primary[700]} />} ml={4} />}
                    shadow={"2"}
                    onChangeText={setCPF}

                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    CPF ou senha inválidos
                </FormControl.ErrorMessage>
            </FormControl>

            <Input
                placeholder='Senha'
                mb={8}
                InputLeftElement={<Icon as={<Key color={colors.primary[700]} />} ml={4} />}
                secureTextEntry
                shadow={"2"}
                onChangeText={setSenha}
            />

            <Button
                title="ENTRAR"
                variant={'outline'}
                w={"full"}
                onPress={handleSingIn}
                isLoading={isLoading}
            >
            </Button>
            <Button
                title="CADASTRAR"
                w={"full"}
                mt={4}
                onPress={() => setCadastrar(true)}
            >
            </Button>

        </VStack>
    )
}