import React from 'react';
import './emptyCell.css';

const EmptyCell = (props) => {
    return (
        <div
             className={'empty-cell'}
             cellindex={props.cellIndex}
             turn-red = {'false'}
        />



    );
};

export default EmptyCell;
