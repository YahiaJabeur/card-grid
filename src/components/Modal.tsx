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
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.button`
  color: black;
  opacity: 0.5;
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ModalTitle = styled.h2`
  margin-top: 16px;
  text-align: center;
  color: black;
`;

export const Modal = ({ gif, onClose }: ModalProps) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalImage src={gif.images.original.url} alt={gif.title} />
      <ModalTitle>{gif.title}</ModalTitle>
    </ModalContainer>
  </Overlay>
);
