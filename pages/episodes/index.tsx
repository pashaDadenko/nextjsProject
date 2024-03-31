import { API } from 'assets/api/api';
import { GetServerSideProps } from 'next';
import { Card } from 'components/Card/Card';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';
import { EpisodeType, ResponseType } from 'assets/api/rick-and-morty-api';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	res.setHeader('cache-Control', 'public, s-maxage=10, stale-while-revalidate=100'); // кешируем данные

	const episodes = await API.rickAndMorty.getEpisodes();

	if (!episodes) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			episodes: episodes,
		},
	};
};

type PropsType = {
	episodes: ResponseType<EpisodeType>;
};

const Episodes = (props: PropsType) => {
	const { episodes } = props;

	const episodesList = episodes.results.map((episode) => <Card key={episode.id} name={episode.name} />);

	return <PageWrapper>{episodesList}</PageWrapper>;
};

Episodes.getLayout = getLayout;
export default Episodes;
