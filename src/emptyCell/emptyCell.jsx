import React from 'react';

const EmptyCell = (props) => {
    return (
        <div className={'empty-cell'} cellindex={props.cellIndex}> </div>
    );
};

export default EmptyCell;
