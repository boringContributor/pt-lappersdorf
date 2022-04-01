import { Box } from '@chakra-ui/react';
import { ItemProps, LeistungAccordion } from '../components/leistung-accordion';
import { PageHeader } from '../components/page-header';
import { PageHeading } from "../components/page-heading";
import { gql, request } from 'graphql-request';
import { InferGetStaticPropsType } from 'next';

const backgroundURL = 'https://ucarecdn.com/4f8b2abb-ec0f-4cbe-a93d-62f1ac1effcb/-/progressive/yes/-/format/auto/-/resize/2000x/';

interface ServicePage {
    service: {
        services: ItemProps[],
        description: string;
    }
}
export const getStaticProps = async () => {
    const query = gql`
    query {
        service(where: { slug: "service"}) {
            services
            description
          }
      }
  `;

    const data = await request<ServicePage>(process.env.graphql as string, query);
    return {
        props: data
    };
};

const Leistungen = ({ service: { services, description } }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeader backgroundURL={backgroundURL} />
            <PageHeading title="Unsere" underlinedTitle='Leistungen' description={description} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <LeistungAccordion {...services} />
            </Box>
        </Box>
    )
};

export default Leistungen;