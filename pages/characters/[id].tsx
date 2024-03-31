import styled from 'styled-components';
import { useRouter } from 'next/router';
import { API } from 'assets/api/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CharacterType } from 'assets/api/rick-and-morty-api';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';
import { CharacterCard } from 'components/Card/CharacterCard/CharacterCard';

export const getStaticPaths: GetStaticPaths = async () => {
	const { results } = await API.rickAndMorty.getCharacters();

	const paths = results.map((character) => {
		return {
			params: {
				id: String(character.id),
			},
		};
	});

	return {
		paths: paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params || {};

	const character = await API.rickAndMorty.getCharacter(id as string);

	if (!character) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			character: character,
		},
	};
};

type PropsType = {
	character: CharacterType;
};

const Character = (props: PropsType) => {
	const { character } = props;

	const router = useRouter();

	if (router.isFallback) return <h1>Loading...</h1>;

	const characterId = router.query.id;

	const goToCharacters = () => router.push('/characters');

	return (
		<PageWrapper>
			<Container>
				<IdText>ID: {characterId}</IdText>
				<CharacterCard key={character.id} character={character} />
				<Button onClick={goToCharacters}>GO TO CHARACTERS</Button>
			</Container>
		</PageWrapper>
	);
};

Character.getLayout = getLayout;
export default Character;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 20px;
`;

const IdText = styled.div`
	font-size: 38px;
`;

const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 330px;
	height: 60px;
	border-radius: 5px;
	border: none;
	background: #facaff;
	cursor: pointer;

	&:hover {
		background: #fa52d3;
		color: #fff;
	}
`;
