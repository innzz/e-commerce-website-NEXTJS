import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export default function Home() {
  return (<>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="e-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div>
        {/* <Image src='/home.jpg' alt='home'  width={'100%'} height={500} ></Image> */}
      </div>
      <Footer />
      </>
  )
}
