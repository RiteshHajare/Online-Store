import Layout from "../components/Layout"


function myapp({Component,pageProps}) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default myapp