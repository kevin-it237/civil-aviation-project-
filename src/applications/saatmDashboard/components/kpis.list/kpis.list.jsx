import React, {useEffect, useState} from 'react'
import { Menu  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { BulbFilled } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getKPIs, selectKPI, getKPIsData} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './kpis.list.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const KPIsList = ({kpis, loading, selectedOrg}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('state')

    const handleClick = e => {
        setCurrent(e.key);
    };

    useEffect(() => {
        dispatch(getKPIs(selectedOrg))
    }, [selectedOrg])

    const handleSelectKPI = (kpi) => {
        dispatch(getKPIsData({kpiId: kpi.YDMS_KPIs_id, orgType: selectedOrg}))
        dispatch(selectKPI(kpi))
    }

    const fetchKPIs = () => {
        dispatch(getKPIs(selectedOrg))
    }

    if(loading) {
        return <Loader />
    }

    let KPIS = [kpis.map((kpi, i) => (
        <Menu.Item key={(i+1)} onClick={() => handleSelectKPI(kpi)}>{`${kpi.YDMS_KPIs_id}: ${kpi.KPIs_label}`}</Menu.Item>
    ))]
  
    if(KPIS.length === 0 && !loading) {
        KPIS = <Empty fetch={fetchKPIs} />
    }


    return (
        <div className="kpis">
             <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<BulbFilled />} title="All KPIs">
                    {KPIS}
                </SubMenu>
            </Menu>
        </div>
    )
}



const mapStateToProps = ({ SAATMDashboardReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    selectedOrg: SAATMDashboardReducer.selectedOrg,
})

export default connect(mapStateToProps)(KPIsList);

