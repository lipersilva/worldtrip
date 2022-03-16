import { Divider, Flex, Heading } from '@chakra-ui/react'
import Banner from '../components/Banner'
import Dividers from '../components/Dividers'
import Header from '../components/Header'
import TravelTypes from '../components/TravelTypes'
import Slider from '../components/Slider'

export default function Home() {
  return (
    <Flex direction="column">
      <Header/>
      <Banner/>
      <TravelTypes/>
      {/* <Divider height='50px' borderWidth="5" borderColor="gray.700" w="8%" ml={['none', 'none', 'none',"47%"]}/> */}
      <Dividers/>
      <Heading 
        textAlign="center"
        fontWeight="500"
        mb={["5", "14"]}
        fontSize={["lg", "3xl", "4xl"]}
      >
        Vamos nessa? <br/> Então escolha seu continente
      </Heading>
      <Slider/>
    </Flex>
  )
}
