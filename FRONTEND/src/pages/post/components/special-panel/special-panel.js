import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { Icon } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						id="fa-calendar-o"
						margin="0 10px 0 0"
						size="18px"
						inactive={true}
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							margin="0 0 0 7px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};
	font-size: 18px;

	& .published-at {
		display: flex;
	}
	& .buttons {
		display: flex;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
