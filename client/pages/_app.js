import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';

import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
    )
};

AppComponent.getInitialProps = async (appContext) => {
    const axiosClient = buildClient(appContext.ctx);
    const { data } = await axiosClient.get('/api/users/currentUser');
    
    let pageProps;
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps,
        currentUser: data.currentUser
    };
};

export default AppComponent;