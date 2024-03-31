import Image, { StaticImageData } from 'next/image';
import { CharacterStatusType } from 'assets/api/rick-and-morty-api';

type PropsType = {
	status: CharacterStatusType;
	src: StaticImageData;
};

export const Status = (props: PropsType) => {
	const { src } = props;

	return (
		<div>
			<Image src={src} alt={'img'} width={10} height={10} />
		</div>
	);
};
