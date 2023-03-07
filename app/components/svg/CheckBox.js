import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CheckBox = () => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M7.475 12.975L14.7 5.725L13.625 4.65L7.475 10.825L4.5 7.85L3.425 8.925L7.475 12.975ZM1.5 18C1.1 18 0.75 17.85 0.45 17.55C0.15 17.25 0 16.9 0 16.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H16.5C16.9 0 17.25 0.15 17.55 0.45C17.85 0.75 18 1.1 18 1.5V16.5C18 16.9 17.85 17.25 17.55 17.55C17.25 17.85 16.9 18 16.5 18H1.5Z"
        fill="#F09090"
      />
    </Svg>
  );
};

export default CheckBox;
