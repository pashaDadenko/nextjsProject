import { API } from 'assets/api/api';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';
import { CharacterCard } from 'components/Card/CharacterCard/CharacterCard';
import { CharacterType, ResponseType } from 'assets/api/rick-and-morty-api';

export const getServerSideProps = async () => {
	const characters = await API.rickAndMorty.getCharacters();

	return {
		props: {
			characters: characters,
		},
w	};
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
