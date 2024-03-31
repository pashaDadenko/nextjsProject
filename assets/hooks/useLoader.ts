import { useEffect } from 'react';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';

export const useLoader = () => {
	const router = useRouter();

	useEffect(() => {
		const startLoader = () => nProgress.start();
		const endLoader = () => nProgress.done();

		router.events.on('routeChangeStart', startLoader);
		router.events.on('routeChangeComplete', endLoader);
		router.events.on('routeChangeError', endLoader);

		return () => {
			router.events.off('routeChangeStart', startLoader);
			router.events.off('routeChangeComplete', endLoader);
			router.events.off('routeChangeError', endLoader);
		};
	}, [router]);
};
