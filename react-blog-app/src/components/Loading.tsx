// components/Loading.js
import styled, { css, keyframes } from "styled-components";


const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;


export const Loader = styled.div`
  border: 4px solid  #ccc;
  border-top: 4px solid #007BFF;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
  margin: 30px auto;
`;

interface LoadingProps {
  message?: string;
  minHeight?: string;
  width?: string;
}

const LoadingComponent: React.FC<LoadingProps> = ({
  message = 'Loading...',
  minHeight = '500px',
  width = '500px',
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center mx-auto"
      style={{ minHeight, width }}
    >
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-white font-semibold mt-6 animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingComponent;


