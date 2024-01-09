import { Box } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { ItemProps, LeistungAccordion } from '../components/leistung-accordion';
import { PageHeaderImg } from '../components/page-header-img';
import { PageHeading } from "../components/page-heading";
interface ServicePage {
    service: {
        services: ItemProps[],
        description: string;
    }
}
export const getServerSideProps: GetServerSideProps = async () => {
    const query = gql`
    query {
        service(where: { slug: "service"}) {
            services
            description
            backgroundURL {
                url
            }
          }
      }
  `;

    const data = await request<ServicePage>(process.env.graphql as string, query);

    if (!data.service) {
        return {
            notFound: true
        }
    }
    return {
        props: data
    };
};

const Leistungen: NextPage = ({ service: { services, description, backgroundURL: { url } } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box>
            <PageHeaderImg backgroundURL={url}/>
            <PageHeading title="Unsere" underlinedTitle='Leistungen' description={description} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <LeistungAccordion {...services} />
            </Box>
        </Box>
    )
};

export default Leistungen;