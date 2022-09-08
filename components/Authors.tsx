import {useState} from 'react'
import {Author} from '../shared/types'
import Contributor from '../components/Contributor'
import Thumbnail from '../components/Thumbnail'

interface Props {
	authors: Author[]
}

const PLACEHOLDER = 'https://placekitten.com/50/50'

const Authors = ({authors}: Props) => {
	const [error, setError] = useState<boolean>(false)

	return (
		<div>
			{
				authors.map((user, index) => {
					return (
						<Contributor key={index}>
							<Thumbnail 
								src={error ? PLACEHOLDER : user.avatar}
								onError={() => setError(true)}
							/>
							<span className="uk-text-small">{user.name}</span>
						</Contributor>
					)
				})
			}
		</div>
	)
}

export default Authors