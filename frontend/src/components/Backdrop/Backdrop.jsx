import React from 'react';

import './Backdrop.css';

export default React.memo(
    (props) => <div onClick={props.onClick} className="backdrop" />
) 