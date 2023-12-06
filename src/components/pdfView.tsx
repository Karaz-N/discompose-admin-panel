import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// import { ComponentToPrint } from './ComponentToPrint';

class Comflex extends React.PureComponent {
  render() {
    return (
      <div>My cool content here!</div>
    );
  }
}



export const Example = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Comflex ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};