import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './table.css';

const propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const Table = ({className, children, ...props}) => {

    const cx = ClassNames.bind(style);
	const classNames = cx({
          table: true,
          className
        }
    );

    return (
        <table {...props} className={classNames}>
          {children}
        </table>
    );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
