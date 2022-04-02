import { Box } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import { PageHeaderImg } from '../components/page-header-img';
import { PageHeading } from '../components/page-heading';
import { CommonSEO } from '../components/seo';
import { Welcome } from '../components/welcome';
import { siteMetadata } from '../data/site-metadata';
import { PageMeta } from '../types/page-meta';


type Pagedata = PageMeta & { backgroundURL: { url: string } }

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
  query {
    pagedata(where: { slug: "start"}) {
      title
      description
      backgroundURL {
        url
      }
    }
  }
`;

  const data = await request<{ pagedata: Pagedata }>(process.env.graphql as string, query);

  if (!data.pagedata) {
    return {
      notFound: true
    }
  }
  return {
    props: data,
    revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const Home: NextPage = ({ pagedata: { description, backgroundURL: { url } } }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Box>
      <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PageHeaderImg backgroundURL={url} />
      <Welcome >
        <PageHeading title='Herzlich Willkommen,' underlinedTitle='beim Physioteam in Lappersdorf' description={description} />
      </Welcome>

    </Box>
  )
}

export default Home
