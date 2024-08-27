import styled from 'styled-components';

import { GifType } from '../types/GifType';

interface ModalProps {
  gif: GifType;
  onClose: () => void;
}

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
`;

const ModalContainer = styled.div`
  width: 80vw;
  height: 80vh;
  max-width: 600px; /* Optional: Restrict the maximum width */
  background: white;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
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
  object-fit: cover;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const ModalTitle = styled.h2`
  margin-top: 16px;
  text-align: center;
  color: black;
`;

export const Modal = ({ gif, onClose }: ModalProps) => (
  <Overlay>
    <ModalContainer data-testid="modal">
      <CloseButton data-testid="close-button" onClick={onClose}>
        &times;
      </CloseButton>
      <ModalImage src={gif.images.original.url} alt={gif.title} />
      <ModalTitle>{gif.title}</ModalTitle>
    </ModalContainer>
  </Overlay>
);
