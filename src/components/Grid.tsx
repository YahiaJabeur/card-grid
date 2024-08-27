import styled from 'styled-components';
import { GifType } from '../types/GifType';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const Card = styled.article`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: #f0f0f0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40%;
`;

const Title = styled.p`
  color: #333;
  margin-top: 8px;
  font-size: 0.9rem;
  text-align: left;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface GridProps {
  gifs: GifType[];
  onCardClick: (gif: GifType) => void;
}

export const Grid = ({ gifs, onCardClick }: GridProps) => (
  <GridContainer>
    {gifs.map((gif) => (
      <Card key={gif.id} onClick={() => onCardClick(gif)} aria-label={`View details for ${gif.title}`}>
        <Image
          src={gif.images.original.url}
          alt={gif.title || 'GIF'}
          onError={(e) => (e.currentTarget.src = '../assets/placeholder.png')}
          loading="lazy"
        />
        <TitleContainer>
          <Title>{gif.title || 'Untitled'}</Title>
        </TitleContainer>
      </Card>
    ))}
  </GridContainer>
);
