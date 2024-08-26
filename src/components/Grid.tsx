import styled from 'styled-components';

import { GifType } from '../types/GifType';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40%;
`;

const Title = styled.p`
  color: black;
  margin-top: 8px;
  font-size: 0.9rem;
  text-align: left;
  padding: 0 8px;
`;

interface GridProps {
  gifs: GifType[];
  onCardClick: (gif: GifType) => void;
}

export const Grid = ({ gifs, onCardClick }: GridProps) => (
  <GridContainer>
    {gifs.map((gif) => (
      <Card key={gif.id} onClick={() => onCardClick(gif)}>
        <Image src={gif.images.original.url} alt={gif.title} />
        <TitleContainer>
          <Title>{gif.title}</Title>
        </TitleContainer>
      </Card>
    ))}
  </GridContainer>
);
