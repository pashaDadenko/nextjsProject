import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';

const NotFound = () => <PageWrapper>404</PageWrapper>;

NotFound.getLayout = getLayout;
export default NotFound;
