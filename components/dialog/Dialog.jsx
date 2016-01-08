import React, { PropTypes } from 'react';
import classNames from "classnames/bind";
import Button from "../button";
import Overlay from "../overlay";
import style from "./dialog.css";

const propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onOverlayClick: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    body: PropTypes.string
};

const defaultProps = {
    actions: [],
    active: false,
    type: "normal"
};

const Dialog = (props) => {
    const {body, active, title, type, children} = props;
    const cx = classNames.bind(style);
    const actions = props.actions.map((action, idx) => {
        const buttonClassName = cx({
            button: true,
            [action.className]: action.className
        });
        return <Button key={idx} {...action} className={buttonClassName} />;
    });

    const className = cx({
        base: true,
        type,
        active,
        [props.className]: true
    });

    return (
        <Overlay active={active} onClick={props.onOverlayClick}>
            <div data-react-toolbox="dialog" className={className}>
                <section role="body" className={body}>
                    {title ? <h6 className={style.title}>{title}</h6> : null}
                    {children}
                </section>
                <nav role="navigation" className={style.navigation}>
                    {actions}
                </nav>
            </div>
        </Overlay>
    );
};

Dialog.propTypes = propTypes;

Dialog.defaultProps = defaultProps;

export default Dialog;

