import { Flex, Heading } from '@chakra-ui/react'
import Banner from '../components/Banner'
import Dividers from '../components/Dividers'
import Header from '../components/Header'
import TravelTypes from '../components/TravelTypes'
import Slider from '../components/Slider'
import { getPrismicClient } from '../services/prismic'
import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'

export interface ContinentProps {
  continents: {
    slug: string;
    title: string;
    summary: string;
    image: string;
  }[]
}
export default function Home({ continents }: ContinentProps) {
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
      <Slider continents={continents}/>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'continent')]
  )

  //console.log(response.results)
  const continents = response.results.map(continent => {
    return {
      slug: continent.uid,
      title: continent.data.title,
      summary: continent.data.summary,
      image: continent.data.sliderimage.url
    }
  })

  return {
    props: {
      continents
    },
    revalidate: 60 * 60 * 24 //24 horas
  }
}