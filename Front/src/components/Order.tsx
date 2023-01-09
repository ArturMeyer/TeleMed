import {
    Box,
    HStack,
    Text,
    useTheme,
    VStack,
    Circle,
    Pressable,
    IPressableProps,
    Image,
    Center
}
    from 'native-base';

import { ClockAfternoon, Hourglass, CircleWavyCheck, FirstAid } from 'phosphor-react-native';

import Anestesiologia from '../assets/anestesiologia.png';
import Cardiologia from '../assets/cardiologia.png';
import ClinicaMedica from '../assets/clinicaMedica.png';
import Dermatologia from '../assets/dermatologia.png';
import Endocrinologia from '../assets/endocrinologia.png';
import Ginecologia from '../assets/ginecologia.png';
import Neurologia from '../assets/neurologia.png';
import Oftalmologia from '../assets/oftalmologia.png';
import Ortopedia from '../assets/ortopedia.png';
import Psiquiatria from '../assets/psiquiatria.png';
import Pediatria from '../assets/pediatria.png';

export type OrderProps = {
    _id: string;
    titulo: string;
    resumo: string;
    data: String;
    urgencia: 'emergencia' | 'muitoUrgente' | 'urgente' | 'poucoUrgente' | 'naoUrgente';
    especialidade: 'Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia';
}

type Props = IPressableProps & {
    data: OrderProps;
}

export function Order({ data, ...rest }: Props) {

    const { colors } = useTheme();

    const urgenciaColor = data.urgencia === 'emergencia' ? colors.red[700] :
        data.urgencia === 'muitoUrgente' ? colors.orange[600] :
            data.urgencia === 'urgente' ? colors.yellow[500] :
                data.urgencia === 'poucoUrgente' ? colors.green[600] :
                    data.urgencia === 'naoUrgente' ? colors.blue[600] : colors.green[600];

    const time = `${data.data.substring(5, 7)}/${data.data.substring(8, 10)}/${data.data.substring(0, 4)}  ${parseInt(data.data.substring(11, 13)) - 3}:${data.data.substring(14, 16)}`;

    const imagem = data.especialidade === 'Pediatria' ? Pediatria :
        data.especialidade === 'Ginecologia' ? Ginecologia :
            data.especialidade === 'Clínica Médica' ? ClinicaMedica :
                data.especialidade === 'Cardiologia' ? Cardiologia :
                    data.especialidade === 'Psiquiatria' ? Psiquiatria :
                        data.especialidade === 'Neurologia' ? Neurologia :
                            data.especialidade === 'Endocrinologia' ? Endocrinologia :
                                data.especialidade === 'Ortopedia' ? Ortopedia :
                                    data.especialidade === 'Dermatologia' ? Dermatologia :
                                        data.especialidade === 'Oftalmologia' ? Oftalmologia :
                                            data.especialidade === 'Anestesiologista' ? Anestesiologia : Pediatria;

    return (
        <Pressable {...rest}>
            <HStack
                bg='gray.100'
                shadow={"4"}
                h='100'
                mx={1}
                mb={2}
                mt={2}
                borderRadius={8}
                overflow={'hidden'}
                opacity={data.resposta ? 0.5 : 1}
            >
                <Box
                    w='3'
                    h='full'
                    position={"absolute"}
                    top={0}
                    bg={urgenciaColor}
                />

                {
                    data.resposta ?
                        <Center opacity={1} position={'absolute'}  right={'30px'} top={8}>
                            <CircleWavyCheck size={60} color={colors.green[300]} />
                        </Center>
                        :
                        null
                }

                <HStack mr={1} alignItems={"center"} position={'absolute'} right={1} top={0}>
                    <ClockAfternoon size={15} color={colors.gray[300]} />
                    <Text color='gray.600' fontSize={'xs'} ml={1}>
                        {time}
                    </Text>
                </HStack>

                <VStack >
                    <VStack ml={5} my={2}>
                        <Text color={'black'} fontSize='md'>
                            {data.titulo.length < 24 ? data.titulo.toUpperCase() : `${data.titulo.toUpperCase().substring(0, 20)}...`}
                        </Text>
                        <Box w='210' pb={5}>
                            <Text color={'black'} fontSize='xs'>
                                {data.resumo.length < 100 ? data.resumo : `${data.resumo.substring(0, 100)}...`}
                            </Text>
                        </Box>
                    </VStack>
                </VStack>

                <Circle h={12} w={12} mr={5} position={'absolute'} right={0} top={8}>
                    {
                        <Image alt="especialidade" size={50} borderRadius={100} source={imagem} />
                    }
                </Circle>


            </HStack>
        </Pressable>
    );
}