import React, { forwardRef, useState, useImperativeHandle, useEffect, useContext } from 'react';
import Modal from "react-bootstrap/Modal";


export default forwardRef((props, ref) => {
    const [open, setOpen] = useState(null);
    useImperativeHandle(ref, (...rest) => ({
        show(rest) {
            setOpen(rest)
        }
    }));
    return (
        <Modal
        show={!!open}
        centered
        size="lg"
        onHide={() => setOpen(null)}
        keyboard={true}
        contentClassName="my-modal"
        >
            { open && React.cloneElement(open, { modal: true})}
      </Modal>
    )
});


