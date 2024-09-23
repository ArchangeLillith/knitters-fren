import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children }) => {
	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal-content-custom">{children}</div>
		</div>,
		document.getElementById("portal-root") as HTMLElement
	);
};

export default Modal;
