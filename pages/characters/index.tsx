import dynamic from 'next/dynamic';
import { API } from 'assets/api/api';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';
import { CharacterType, ResponseType } from 'assets/api/rick-and-morty-api';

const CharacterCard = dynamic(() => import('components/Card/CharacterCard/CharacterCard').then((module) => module.CharacterCard), { ssr: false, loading: () => <h1>Loading...</h1> });

export const getStaticProps = async () => {
	const characters = await API.rickAndMorty.getCharacters();

	return {
		props: {
			characters: characters,
		},
		revalidate: 60,
	};
};

type PropsType = {
	characters: ResponseType<CharacterType>;
};

const Characters = (props: PropsType) => {
	const { characters } = props;

	const charactersList = characters.results.map((character) => <CharacterCard key={character.id} character={character} />);

	return <PageWrapper>{charactersList}</PageWrapper>;
};

Characters.getLayout = getLayout;
export default Characters;
