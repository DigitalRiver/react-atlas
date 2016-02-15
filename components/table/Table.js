import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './table.css';

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

Table.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
Table.defaultProps = {
  className: ''
};

export default Table;
