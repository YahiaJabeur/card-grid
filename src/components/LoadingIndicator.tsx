import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  padding: 8px;
  font-size: 1.2rem;
  color: #007bff;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 123, 255, 0.2);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin-right: 8px;
`;

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator = ({ message = 'Loading...' }: LoadingIndicatorProps) => {
  return (
    <LoaderContainer role="status" aria-live="polite" data-testid="loading-indicator">
      <Spinner aria-hidden="true" />
      <span>{message}</span>
    </LoaderContainer>
  );
};
