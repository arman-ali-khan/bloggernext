
import Popular from '../../components/RightSide/Popular'
import Layout from '../../Layout/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';
import Author from '../../components/Home/Author/Author';


const blog = ({data}) => {
 
  console.log(data)
  const post = data.body
    const router = useRouter()
    const id = router.query.blogId
    return (
        <Layout title={data.title} description={data.body} body={data.body} thumb={data.thumb}>
           <div className='md:flex w-full '>
            <div className='md:w-full m-4'>
            <div className="mx-auto md:p-2 dark:bg-gray-800 ">
	<div className="flex flex-col mx-auto overflow-hidden rounded">
		<img src={data.thumb} alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
		<div className="p-2 pb-12 mx-auto -mt-16 space-y-6 sm:px-3 sm:mx-3 lg:mx-12 rounded-xl border bg-white">
			<div className="space-y-2 ">
				<h4  className="inline-block text-2xl font-semibold sm:text-3xl">{data.title}</h4>
				<p className="text-sm ">By{" "}
					<Link rel="noopener noreferrer" href="#" className="text-xs hover:underline">{data.user.name}</Link>
				</p>
			</div>
			<div className="">
				<div className='postbody'>
               {parse(post)}
                </div>
			</div>
		</div>
	</div>
</div>
            </div>
            <div className='md:w-4/12 m-4 '>
              <Author />
            </div>
        </div>
        </Layout>
    );
};

export default blog;




export const getStaticPaths = async () => {

    //fetch data from api
    const res = await fetch(`https://blog-server-sparmankhan.vercel.app/blogs`);
    const data = await res.json();
  console.log(data)
    //create paths for each item in the data
    const paths = data.map(item => ({
      params: {
        blogId: item.id.toString(),
      },
    }));
  
    //return paths
    return {
      paths,
      fallback: false,
    };
  };
  
  
  // write a get staticprops function for nextjs dynamic api call
  export async function getStaticProps(context) {
    const id = context.params.blogId
    const res = await fetch(`https://blog-server-sparmankhan.vercel.app/post/${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    };
  }
