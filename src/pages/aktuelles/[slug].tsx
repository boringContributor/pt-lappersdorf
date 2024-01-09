import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { BlogPostDetail } from '../../components/blog-post-detail';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params) {
        return {
            notFound: true
        }
    }
    const query = gql`
    query {
        blogPost(where: { slug: "${params.slug}" }) {
            title
            description{
                text
                markdown
            }
            date
            backgroundURL{
                url
            }
        }
    }`;

    const data = await request<any>(process.env.graphql as string, query);

    if (!data.blogPost) {
        return {
            notFound: true
        }
    }
    return {
        props: data
    };
};

export const Post: NextPage = ({ blogPost: { title, description: { markdown }, date, backgroundURL: { url } } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <BlogPostDetail title={title} html={markdown} date={date} url={url} />
    )
}

export default Post
