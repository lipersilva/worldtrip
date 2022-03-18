import { Flex } from "@chakra-ui/react";
import ContinentBanner from "../../components/ContinentBanner";
import Header from "../../components/Header";
import Bio from "../../components/Bio";
import Cities from "../../components/Cities";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { useRouter } from "next/router";
import Loading from "../../components/loading";

export interface ContinentProps {
  continent: {
    slug: string;
    title: string;
    description: string;
    bannerimage: string;
    countries: number;
    languages: number;
    cities: number;
    citieslist: string;
    cities100: {
      city: string; 
      country: string;
      thumbnail: string
      flag: string
    } []
  }
}

export default function Continent({ continent }: ContinentProps) {
  const router = useRouter();
  if(router.isFallback) {
    return <Loading />
  }

  return (
    <Flex direction="column">
      <Header/>
      <ContinentBanner continent={continent}/>
      <Flex direction="column" maxW="1160px" mx="auto" mb="10" px="1rem">
        <Bio continent={continent}/>
        <Cities continent={continent}/>
      </Flex>
      
    </Flex>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const continents = await prismic.query(
    [Prismic.Predicates.at('document.type', 'continent')]
  )
  
  const paths = continents.results.map(continent => {
    return {
      params: {
        slug: continent.uid,
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('continent', String(slug), {})

  //console.log(response)
  const continent = {
    slug: response.uid,
    title: response.data.title,
    description: RichText.asText(response.data.description),
    bannerimage: response.data.bannerimage.url,
    countries: response.data.countries,
    languages: response.data.languages,
    cities: response.data.cities,
    citieslist: response.data.cities_list,
    cities100: response.data.cities100.map(city => {
      return {
        city: city.city,
        country: city.country,
        thumbnail: city.thumbnail.url,
        flag: city.flag.url
      }
    })

  }
  return {
    props: {
      continent
    },
    revalidate:  60 * 60 * 24, // 24 hours
  }

}