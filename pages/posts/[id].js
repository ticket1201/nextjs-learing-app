import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';


export default function Post({postData}) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={'text-3xl font-bold mb-4'}>{postData.title}</h1>
            <div className={'font-semibold mb-2 text-black/40'}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>;
}
export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}