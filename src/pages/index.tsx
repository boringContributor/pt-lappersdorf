import type { NextPage } from 'next'
import { Welcome } from '../components/welcome';
import { CommonSEO } from '../components/seo';
import { siteMetadata } from '../data/site-metadata';
import { Box } from '@chakra-ui/react';
import { PageHeader } from '../components/page-header';

const backgroundURL = 'https://ucarecdn.com/121bb7ec-5e05-4e31-82f5-07293a92831a/-/progressive/yes/-/format/auto/-/resize/2000x/';

const Home: NextPage = () => {

  return (
    <Box>
      <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PageHeader backgroundURL={backgroundURL} />
      <Welcome />

    </Box>
  )
}

export default Home
