
import Navbar from '../components/Header/Navbar';
import Head from 'next/head';
import DashNavbar from '../components/Header/DashNavbar';
import Link from 'next/link';


const DashboardLayout = ({children,title,description,body,thumb}) => {

    return (
        <div>

            <DashNavbar />
             <Head>
             <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:image"
          content={thumb}
        />
      </Head>
      <main>
      <div className="drawer drawer-mobile">
  <input id="dashBottom" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
  {/* dash card */}
  {children}
   
  
  </div> 
  <div className="drawer-side border-r border-base-300">
    <label htmlFor="dashBottom" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><Link href={'/@dashboard'}>Dashboard</Link></li>
      <li><Link href={'/@dashboard/posts'}>All Posts</Link></li>
      <li><Link href={'/@dashboard/users'}>All Users</Link></li>
      <li><Link href={'/@dashboard/categories'}>Categories</Link></li>
      <li><Link href={'/@dashboard/tags'}>Tags</Link></li>
      <li><Link href={'/@dashboard/notice'}>Notice</Link></li>
      <li><Link href={'/@dashboard/ads'}>Ads</Link></li>
      <li><Link href={'/@dashboard/theme'}>Theme</Link></li>
      <li><Link href={'/@dashboard/comments'}>Comments</Link></li>
      <li><Link href={'/@dashboard/settings'}>Settings</Link></li>
    </ul>
  
  </div>
</div>
        
      </main>
      <div className="container">
    </div>
        </div>
    );
};

export default DashboardLayout;