import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalText,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalIsOpen,
} from '../../selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const isOpen = useSelector(selectModalIsOpen);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		z-index: 30;
		top: 50%;
		transform: translate(0, -50%);
		background-color: #fff;
		border: 3px solid #000;
	}

	& .box h3 {
		text-align: center;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 10px;
	}
`;
