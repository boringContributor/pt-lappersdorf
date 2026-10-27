import { Box, Container } from "@chakra-ui/react";
import { gql, request } from "graphql-request";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { PageHero } from "../components/page-hero";
import { Prose } from "../components/prose";


export const getServerSideProps: GetServerSideProps = async () => {
    const query = gql`
        query {
            impressum(where: { slug: "impressum"}) {
            content
            }
      }`;

    const data = await request<{ impressum: { content: string } }>(process.env.graphql as string, query);

    if (!data.impressum) {
        return {
            notFound: true
        }
    }
    return {
        props: data
    };
};


const Impressum: NextPage = ({ impressum: { content } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box>
            <PageHero title='Impressum' highlight='& Datenschutz' />
            <Container maxW='3xl' px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
                {/* the content repeats the page title as h1 and uses single line breaks for addresses */}
                <Prose fontSize='md' sx={{ '& > h1:first-of-type': { display: 'none' }, 'p': { whiteSpace: 'pre-line' } }}>
                    <ReactMarkdown>
                        {content}
                    </ReactMarkdown>
                </Prose>
            </Container>
        </Box>
    )
};

export default Impressum;

