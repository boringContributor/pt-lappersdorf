import { Box, Container } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { CtaBanner } from '../components/cta-banner';
import { PageHero } from '../components/page-hero';
import { ItemProps, ServiceGrid } from '../components/service-grid';
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
            <PageHero title="Unsere" highlight='Leistungen' description={description} backgroundURL={url} />
            <Container maxW="7xl" px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
                <ServiceGrid services={services} />
            </Container>
            <CtaBanner />
        </Box>
    )
};

export default Leistungen;