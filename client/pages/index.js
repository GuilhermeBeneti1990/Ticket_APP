import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
};

LandingPage.getInitialProps = async (context) => {
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get('/api/users/currentUser');

  return data;
};

export default LandingPage;