import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { addCommentAsync } from '../../../../actions';
import PropTypes from 'prop-types';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuset = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuset && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						onClick={() => {
							onNewCommentAdd(postId, newComment);
						}}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		resize: none;
		width: 550px;
		min-height: 120px;
		padding: 10px;
		font-size: 18px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
	postId: PropTypes.string.isRequired,
};
