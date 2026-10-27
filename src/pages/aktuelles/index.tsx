
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next/types';
import { BlogPost, BlogPostProps } from '../../components/blog-post';
import { PageHero } from '../../components/page-hero';

type Aktuelles = {
    blogPosts: BlogPostProps[],
    description: string,
    backgroundURL: {
        url: string
    }
}

export const getServerSideProps: GetServerSideProps = async () => {
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

// sort the blogs by date
data.currents[0].blogPosts.sort((a: any, z: any) => new Date(z.date).valueOf() - new Date(a.date).valueOf())

return {
    props: data.currents[0]
};
}

const Aktuelles: NextPage = ({ blogPosts, description, backgroundURL: { url } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box>
            <PageHero title="Aktuelles" description={description} backgroundURL={url} />
            <Container maxW="7xl" px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
                    {blogPosts.map((post: any) => <BlogPost key={post.slug} title={post.title} description={post.description} date={post.date} slug={post.slug} backgroundURL={post.backgroundURL} />)}
                </SimpleGrid>
            </Container>
        </Box>
    )
};

export default Aktuelles;