import React, {useEffect, useState} from 'react'
import { Menu, Divider  } from "antd";
import {connect, useDispatch} from 'react-redux'
import { BulbFilled } from '@ant-design/icons';
import {checkIfLoader} from '../../redux/reducer/reducer.helper'
import Loader from '../../../../app/components/loader/loader'
import {getKPIs, selectKPI, getKPIsData, selectOrg} from '../../redux/reducer/actions'
import {types} from '../../redux/reducer/types'
import Empty from '../../../../app/components/empty/empty';
import './kpis.list.scss'

const { SubMenu } = Menu;


/**
 * @description YD monitoring screen
 */

const KPIsList = ({kpis, loading, selectedOrg, user}) => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('state')

    const handleClick = e => {
        setCurrent(e.key);
    };

    useEffect(() => {
        if(user) {
            let org = 'state'
            if(user.role === 'ea') org = 'afcac'
            if(user.role === 'airline') org = 'airline'
            dispatch(selectOrg(org))
            setCurrent(org)
        }
    }, [])

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

    const displayKPIsSummary = () => {
        const summaryKPI = {
            KPIs_label: "Summary",
            KPIs_org_type: selectedOrg,
            KPIs_text: "Summary",
            YDMS_KPIs_id: "all"
        }
        dispatch(selectKPI(summaryKPI))
    }

    if(loading) {
        return <div className="loader--wrapper"><Loader /></div>
    }

    let KPIS = null
    if((!kpis || kpis.length === 0) && !loading) {
        KPIS = <div className="empty--wrapper"><Empty fetch={fetchKPIs} /></div>
    }

    KPIS = [kpis.map((kpi, i) => {
        if(i === 0) {
            return (
                <>
                <Menu.Item key={(i+1)} onClick={() => displayKPIsSummary()}><b>KPIs Summary</b></Menu.Item>
                <Divider style={{fontSize: "12px"}}>Single KPIs</Divider>
                <Menu.Item key={(i+2)} onClick={() => handleSelectKPI(kpi)}>{`${kpi.YDMS_KPIs_id}: ${kpi.KPIs_label}`}</Menu.Item>
                </> 
            )
            
        } else {
            return (
                <Menu.Item key={(i+2)} onClick={() => handleSelectKPI(kpi)}>{`${kpi.YDMS_KPIs_id}: ${kpi.KPIs_label}`}</Menu.Item>
            )
        }
    })]

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



const mapStateToProps = ({ SAATMDashboardReducer, AuthReducer }) => ({
    kpis: SAATMDashboardReducer.kpis,
    loading: checkIfLoader(SAATMDashboardReducer, types.GET_KPIS_REQUEST),
    selectedOrg: SAATMDashboardReducer.selectedOrg,
    user: AuthReducer.user
})

export default connect(mapStateToProps)(KPIsList);

