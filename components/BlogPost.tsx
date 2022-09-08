import {Post} from '../shared/types'
import Authors from './Authors'

import styled from 'styled-components'

interface Props {
	post: Post
}

const Footer = styled.div`
	margin-top: 40px;
	text-align: right;
`
const CommentText = styled.a`
	margin-left: 8px;
`

const BlogPost = ({post}: Props) => {
	const newDate = new Date(post.createdAt)
	const options: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}
	const displayDate = newDate.toLocaleString('en-CA', options)

	return (
			<div className="uk-card uk-card-default uk-card-body uk-margin-medium-bottom" data-testid="blog_post">
				<div>
					<h3 className="uk-card-title">{post.title}</h3>
					<p className="uk-text-small">{displayDate}</p>
					<p>{post.description}</p>

					<Authors authors={post.authors} />
				</div>
	
				<Footer>
					<span data-uk-icon="icon: comments"></span>
					<CommentText className="uk-link-muted uk-text-small">{post.comments.length} comments</CommentText>
				</Footer>
			</div>
			
	)
}

export default BlogPost