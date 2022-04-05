
import { Box, SimpleGrid } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types';
import { BlogPost, BlogPostProps } from '../../components/blog-post';
import { PageHeaderImg } from '../../components/page-header-img';
import { PageHeading } from "../../components/page-heading";

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`query {
        currents{
        description
        backgroundURL {
          url
        }
        blogPosts {
          backgroundURL{
            url
          }
          slug
          title
          date
          description{
            text
          }
        }
      }
    }`;

    const data = await request<any>(process.env.graphql as string, query);

    if (!data.currents) {
        return {
            notFound: true
        }
    }

    return {
        props: data.currents[0],
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};

const Aktuelles: NextPage = ({ blogPosts, description, backgroundURL: { url } }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeaderImg backgroundURL={url} />
            <PageHeading title="Aktuelles" description={description} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <SimpleGrid minChildWidth='300px' spacing={4}>
                    {blogPosts.map((post: BlogPostProps) => <BlogPost key={post.title} title={post.title} description={post.description} date={post.date} slug={post.slug} backgroundURL={post.backgroundURL} />)}</SimpleGrid>
            </Box>
        </Box>
    )
};

export default Aktuelles;