import React from 'react';

const SectionBody = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col justify-start items-center px-5 md:px-[20vw] my-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionBody;
