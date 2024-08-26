import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: 3px solid #ffbf47;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const LoadMoreButton = ({ onClick, isLoading }: LoadMoreButtonProps) => {
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load More'}
    </Button>
  );
};
