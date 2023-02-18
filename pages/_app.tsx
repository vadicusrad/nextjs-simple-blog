import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from './components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <main className='px-10'>
                <Component {...pageProps} />
            </main>
        </Layout>
    );
}

export default MyApp;
