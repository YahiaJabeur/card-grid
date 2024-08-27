import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #ffe6e6;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  margin: 16px 0;
  font-size: 1rem;
  color: #d8000c;
  svg {
    margin-right: 8px;
    fill: #d8000c;
  }
`;

const AlertText = styled.p`
  margin: 0;
  font-weight: 600;
`;

interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <ErrorContainer role="alert" aria-live="assertive" data-testid="error">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 18h-2v-2h2v2zm0-4h-2V6h2v8z" />
      </svg>
      <AlertText>{message}</AlertText>
    </ErrorContainer>
  );
};
