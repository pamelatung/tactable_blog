import {useQuery} from '@tanstack/react-query'

export const useFetchPosts = () => {
	const {isLoading, data, error} = useQuery(['posts'], () =>
	fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts')
		.then((res) => res.json())
	)

	return {
		isLoading,
		data,
		error,
	}
}