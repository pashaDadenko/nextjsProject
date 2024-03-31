import { Card } from 'components/Card/Card';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';
import { LocationType, ResponseType } from 'assets/api/rick-and-morty-api';

const getLocations = () => {
	return fetch('https://rickandmortyapi.com/api/location', {
		method: 'GET',
	}).then((res) => res.json());
};

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.fetchQuery(['locations'], getLocations);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

const Locations = () => {
	const { data: locations } = useQuery<ResponseType<LocationType>>(['locations'], getLocations);

	const locationsList = locations && locations.results.map((location) => <Card key={location.id} name={location.name} />);

	return <PageWrapper>{locationsList}</PageWrapper>;
};

Locations.getLayout = getLayout;
export default Locations;
