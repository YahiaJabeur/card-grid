import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import { GifType } from '../types/GifType';

interface ModalProps {
  gif: GifType;
  onClose: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  width: 90vw;
  height: 80vh;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    width: 100vw;
    height: 90vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 1;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const Modal = ({ gif, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer role="dialog" aria-labelledby="modal-title" data-testid="modal">
        <CloseButton aria-label="Close modal" data-testid="close-button" onClick={onClose}>
          &times;
        </CloseButton>
        <ModalImage src={gif.images.original.url} alt={gif.title} />
      </ModalContainer>
    </Overlay>,
    document.getElementById('root')!,
  );
};
