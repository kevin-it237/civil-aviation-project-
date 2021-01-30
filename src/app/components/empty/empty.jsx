import React from 'react'
import { Button } from "antd";
import { Empty } from 'antd';
import './empty.scss'

/**
 * @description empty data
 */

const EmptyBox = ({fetch, text}) => {
    
    return (
        <div className="empty-box">
            <Empty 
                description={text ?<span style={{marginBottom: '10px'}}>{text}</span>:<span>{"No Data"}</span>}
           />
            <Button onClick={fetch}>Refresh</Button>
        </div>
    )
}

export default EmptyBox

