import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Movie = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.5 4L5.35 7.8H8.6L6.75 4H8.975L10.825 7.8H14.075L12.225 4H14.45L16.3 7.8H19.55L17.7 4H20.5C20.9 4 21.25 4.15 21.55 4.45C21.85 4.75 22 5.1 22 5.5V18.5C22 18.9 21.85 19.25 21.55 19.55C21.25 19.85 20.9 20 20.5 20H3.5C3.1 20 2.75 19.85 2.45 19.55C2.15 19.25 2 18.9 2 18.5V5.5C2 5.1 2.15 4.75 2.45 4.45C2.75 4.15 3.1 4 3.5 4ZM3.5 9.3V18.5H20.5V9.3H3.5Z"
        fill="#5C5C5C"
      />
    </Svg>
  );
};

export default Movie;
