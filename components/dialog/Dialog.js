import React, { PropTypes } from 'react';
import ClassNames from "classnames/bind";
import Overlay from "../overlay";
import style from "./dialog.css";

const Dialog = ({body, active, type, children, className, onOverlayClick, ...props}) => {

    const cx = ClassNames.bind(style);
    const classNames = cx({
        inactive: !active,
        type,
        active,
        className
    });

    return (
        <Overlay active={active} onClick={onOverlayClick}>
            <div className={classNames}>
                <section className={body}>
                    {children}
                </section>
            </div>
        </Overlay>
    );
};

Dialog.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onOverlayClick: PropTypes.func,
    type: PropTypes.string,
    body: PropTypes.string
};

Dialog.defaultProps = {
    active: false,
    type: "normal"
};

export default Dialog;

