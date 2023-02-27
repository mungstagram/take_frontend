import React from 'react';
import Svg, {Path} from 'react-native-svg';

const TaskPinkImg = () => {
  return (
    <Svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.85 15.625L12.575 9.9L11.6 8.925L6.85 13.675L4.275 11.1L3.3 12.075L6.85 15.625ZM1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H10.525L16 5.475V18.5C16 18.9 15.85 19.25 15.55 19.55C15.25 19.85 14.9 20 14.5 20H1.5ZM9.775 6.15V1.5H1.5V18.5H14.5V6.15H9.775Z"
        fill="#F09090"
      />
    </Svg>
  );
};

export default TaskPinkImg;
