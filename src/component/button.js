import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function (props) {
    return (
        <button className={props.className} onClick={props?.onClick}>
            {props.loading
                ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                />
                : props.children
            }
        </button>
    )
};

