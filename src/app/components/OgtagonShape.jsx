import React from 'react';

export default function OgtagonShape({ children }) {
  return (
    <div className="OgtagonShape-container">
      <div className="OgtagonShape-container-inner">
        {children}
      </div>

      <style jsx>{`
        .OgtagonShape-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #595959;
          clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px),
            calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px
          );
          padding: 3px; /* adjust padding as needed */
          box-sizing: border-box;
        }

        .OgtagonShape-container-inner {
          background-color: #F0EEE4;
          width: 100%;
          height: 100%;
          clip-path: polygon(18.5px 0, calc(100% - 18.5px) 0, 100% 18.5px, 100% calc(100% - 18.5px),
            calc(100% - 18.5px) 100%, 18.5px 100%, 0 calc(100% - 18.5px), 0 18.5px
          );
          padding: 3px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
