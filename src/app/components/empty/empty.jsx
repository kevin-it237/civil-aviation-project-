import React from 'react'
import { Button } from "antd";
import { Empty } from 'antd';
import './empty.scss'

/**
 * @description empty data
 */

const EmptyBox = ({fetch}) => {
    
    return (
        <div className="empty-box">
            <Empty />
            <Button onClick={fetch}>Refresh</Button>
        </div>
    )
}

export default EmptyBox

