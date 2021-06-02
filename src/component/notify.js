import React, { forwardRef, useState, useImperativeHandle, useEffect, useContext } from 'react';
import storeContext from 'reducer/context';
import { t } from 'locales';

export default forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [msg, setMsg] = useState('');

    const { setApp } = useContext(storeContext);

    useImperativeHandle(ref, (type, msg) => ({
        alert(type, msg) {
            notify(type, msg);
        }
    }));

    const tnotify = (type, msg) => {
        notify(type, t(msg))
    }
    const notify = (type, msg) => {
        setType(type);
        setMsg(msg?.replace(/(<([^>]+)>)/gi, ""));
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 6000);
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    }

    useEffect(() => {
        setApp({ notify });
        window.addEventListener('message', (event) => {
            if ('notify' in event.data) {
                tnotify(...event.data.notify)
            }
        });
    }, [])

    useEffect(() => {
        if (!window.navigator.onLine)
            tnotify('error', 'offline')
    }, [window.navigator.onLine])

    return (
        <div className={"notify " + (open ? 'active ' : '') + type}>
            <div className="container">
                <div
                    className={'notify-inner ' + type}
                    onClick={handleClose}
                >
                    {msg.split('.').map((item, i) => {
                        return <div key={i}>{item}</div>;
                    })}
                </div>
            </div>
        </div>
    )
});

