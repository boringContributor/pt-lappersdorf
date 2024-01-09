
import { Box, SimpleGrid } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next/types';
import { BlogPost, BlogPostProps } from '../../components/blog-post';
import { PageHeaderImg } from '../../components/page-header-img';
import { PageHeading } from "../../components/page-heading";

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
            <PageHeaderImg backgroundURL={url} />
            <PageHeading title="Aktuelles" description={description} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <SimpleGrid minChildWidth='300px' spacing={4}>
                    {blogPosts.map((post) => <BlogPost key={post.title} title={post.title} description={post.description} date={post.date} slug={post.slug} backgroundURL={post.backgroundURL} />)}</SimpleGrid>
            </Box>
        </Box>
    )
};

export default Aktuelles;