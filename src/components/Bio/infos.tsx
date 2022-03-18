import { Flex, Heading, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text} from "@chakra-ui/react";
import { RiInformationLine } from "react-icons/ri";
import { ContinentProps } from "../../pages/continent/[slug]";

export default function Infos({ continent }: ContinentProps){
  return(
    <Flex 
      align="center"
      justify="space-between"
    >
      <Flex direction="column" justify="center" align={["flex-start","flex-start", "center"]}>
        <Heading fontSize={["2xl", "5xl"]} color="yellow.400" fontWeight="500" >
          {continent.countries}<br/>
        </Heading>
        <Text fontWeight={["400" , "500"]} fontSize={["md", "xl"]} color="gray.700">
          paises
        </Text>
      </Flex>
      <Flex direction="column" justify="center" align={["flex-start","flex-start", "center"]}>
        <Heading fontSize={["2xl", "5xl"]} color="yellow.400" fontWeight="500" >
          {continent.languages}<br/>
        </Heading>
        <Text fontWeight={["400" , "500"]} fontSize={["md", "xl"]} color="gray.700">
          línguas
        </Text>
      </Flex>
      <Flex direction="column" justify="center" align={["flex-start","flex-start", "center"]}>
        <Heading fontSize={["2xl", "5xl"]} color="yellow.400" fontWeight="500" >
          {continent.cities}<br/>
        </Heading>
        <Text fontWeight={["400" , "500"]} fontSize={["md", "xl"]} color="gray.700">
          cidades +100
        <Popover>
          <PopoverTrigger>
            <span>
              <Icon cursor="pointer" as={RiInformationLine} ml="1" color="gray.400" w={["10px", "16px"]} h={["10px", "16px"]} />
            </span>
          </PopoverTrigger>
          <PopoverContent bg="gray.700" color="yellow.400">
            <PopoverArrow  bg="gray.700"/>
            <PopoverCloseButton/>
            <PopoverBody fontWeight="400" fontSize="lg">
              {continent.citieslist}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        </Text>
      </Flex>
    </Flex>
  );
}