import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам"
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" margin="0 10px 0 0" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	margin: 40px auto 0;
	position: relative;
	width: 340px;
	height: 40px;

	& > input {
		padding: 10px 40px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
