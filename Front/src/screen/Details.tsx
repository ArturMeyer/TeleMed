import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { OrderProps } from '../components/Order';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Center, HStack, Image, ScrollView, Text, useTheme, VStack, Circle, useToast, Box } from 'native-base';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import { CardDetails } from '../components/CardDetails';

import { Calendar, CircleWavyCheck, CircleWavyWarning, Clipboard, DesktopTower, Hourglass, TextT } from 'phosphor-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import api from '../services/API';

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

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {

  const [isLoading, setIsLoading] = useState(true);
  const [resposta, setResposta] = useState('');
  const [user, setUser] = useState();
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const { colors } = useTheme();

  const navigation = useNavigation();

  const toast = useToast();

  function handleOrderClose() {

  }

  async function getOrder() {
    await api.get(`api/Pergunta/get/${orderId}`)
      .then(async (response) => {
        setOrder(response.data)
        getData()
        setTime(`${response.data.data.substring(5, 7)}/${response.data.data.substring(8, 10)}/${response.data.data.substring(0, 4)}  ${parseInt(response.data.data.substring(11, 13)) - 3}:${response.data.data.substring(14, 16)}`)
        setIsLoading(false)
      })
      .catch(error => {
        Alert.alert(`${error}`);
        console.log(error)
      })


  }

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("User");
      setUser(data != null ? JSON.parse(data) : null);
      setIsLoading(false)
    } catch (e) {
      // error reading value
    }
  }

  async function responder() {
    getData()
    setIsLoading(true)
    await api.post(`api/Pergunta/responder`, { resposta, userResposta: user._id, dataResposta: new Date(), id: order._id })
      .then(async (response) => {
        toast.show({
          render: () => {
            return <Box bg="emerald.500" px="10" py="1" top={-40} rounded="8" mb={5}>
              <Text color={'gray.100'}>Pergunta respondida</Text>
            </Box>;
          }
        });
        setIsLoading(false)
        navigation.navigate("home")
      })
      .catch(error => {
        Alert.alert(`${error}`);
        console.log(error)
      })
  }

  const imagem = order.especialidade === 'Pediatria' ? Pediatria :
    order.especialidade === 'Ginecologia' ? Ginecologia :
      order.especialidade === 'Clínica Médica' ? ClinicaMedica :
        order.especialidade === 'Cardiologia' ? Cardiologia :
          order.especialidade === 'Psiquiatria' ? Psiquiatria :
            order.especialidade === 'Neurologia' ? Neurologia :
              order.especialidade === 'Endocrinologia' ? Endocrinologia :
                order.especialidade === 'Ortopedia' ? Ortopedia :
                  order.especialidade === 'Dermatologia' ? Dermatologia :
                    order.especialidade === 'Oftalmologia' ? Oftalmologia :
                      order.especialidade === 'Anestesiologista' ? Anestesiologia : Pediatria;

  const urgenciaColor = order.urgencia === 'emergencia' ? colors.red[700] :
    order.urgencia === 'muitoUrgente' ? colors.orange[600] :
      order.urgencia === 'urgente' ? colors.yellow[500] :
        order.urgencia === 'poucoUrgente' ? colors.green[600] :
          order.urgencia === 'naoUrgente' ? colors.blue[600] : colors.green[600];

  const strUegencia = order.urgencia === 'emergencia' ? "Emergência" :
    order.urgencia === 'muitoUrgente' ? "Muito urgente" :
      order.urgencia === 'urgente' ? "Urgente" :
        order.urgencia === 'poucoUrgente' ? "Pouco urgente" :
          order.urgencia === 'naoUrgente' ? "Não urgente" : colors.green[600];

  useEffect(() => {
    getOrder()
    console.log(order.resposta)
  }, [])

  const [time, setTime] = useState();

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack
      flex={1}
      bg='gray.200'
      pb={5}
    >

      <Header title='Pergunta' />

      <HStack bg='gray.200' justifyContent='center' p={4}>
        {
          order.resposta
            ?
            <CircleWavyCheck size={22} color={colors.green[300]} />
            :
            <Hourglass size={22} color={colors.secondary[700]} />
        }


        <Text
          fontSize={'sm'}
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform='uppercase'
        >
          {order.resposta ? 'finalizado' : 'em andamento'}
        </Text>

      </HStack>

      <ScrollView
        mx={5}
        showsVerticalScrollIndicator={false}
      >

        <Center flexDirection={'row'}>
          <VStack alignItems={'center'} justifyContent={'center'} >
            <Image shadow={'2'} alt='imagem' source={imagem} size={'100'} />
            <Text fontSize={20}>{order.especialidade}</Text>
          </VStack>
        </Center>

        {
          <CardDetails
            title='Resposta'
            icon={CircleWavyCheck}
            footer={order.resposta ? `Encerrado em ${order.dataResposta.substring(5, 7)}/${order.dataResposta.substring(8, 10)}/${order.dataResposta.substring(0, 4)}  ${parseInt(order.dataResposta.substring(11, 13)) - 3}:${order.dataResposta.substring(14, 16)}` : null}
            description={order.resposta ? order.resposta : "Ainda não respondido"}
          >
            {
              user && (user.tipo === 'especialista' || user.tipo === 'estagiario') && order.especialidade === user.especialidade && !order.resposta
                ?
                <Input
                  onChangeText={setResposta}
                  placeholder='Descrição da solução'
                  h={24}
                  textAlignVertical='top'
                  multiline
                />
                : null
            }
          </CardDetails>

        }

        {

          (user && (user.tipo === 'especialista' || user.tipo === 'estagiario') && order.especialidade === user.especialidade) && !order.resposta ?
            <Button
              title='Responder'
              my={5}
              onPress={responder}
              isLoading={isLoading}
            />
            :
            null
        }

        <CardDetails
          title='Título'
          description={`${order.titulo}`}
          icon={TextT}
        />

        <CardDetails
          title='Urgência'
          description={`${strUegencia}`}
          icon={CircleWavyWarning}
        />

        <CardDetails
          title='Data de envio'
          description={`${time}`}
          icon={Calendar}
        />

        <CardDetails
          title='descrição dom problema'
          description={`${order.resumo}`}
          icon={Clipboard}
        />

      </ScrollView>

    </VStack>
  );
}