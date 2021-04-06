import React from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import MainHeader from '../../../app/components/mainHeader/mainHeader'
import './report.scss'

const electron = window.require('electron');
const isDev = process.env.NODE_ENV === 'development'

// Importing BrowserWindow from Main
const {BrowserWindow, dialog} = electron.remote;
const path = require('path');
const fs = require('browserify-fs');

/**
 * @description YD monitoring screen
 */
const Report = () => {

    const generateReport = () => {
        
        const filepath = './print1.pdf'; 

        var options = {
            marginsType: 1,
            pageSize: 'A4',
            printBackground: true,
            printSelectionOnly: false,
            landscape: false
        }
        
        let win = new BrowserWindow({
            show: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        win.loadURL("http://www.google.com")
    
        win.webContents.on('did-finish-load', () => {
            win.webContents.printToPDF(options).then(data => {
                fs.writeFile(filepath, data, function (err) {
                    if (err) {
                        console.log(err);
                        dialog.showErrorBox('Error Box','Error while generating report.')
                    } else {
                        console.log('PDF Generated Successfully');
                    }
                });
            }).catch(error => {
                console.log(error)
            });
        });
    }

    return (
        <div id="report-container">
            <MainHeader />
            <div className="reports-content">
                <div className="button--wrapper">
                    <Button onClick={generateReport} id="convert" type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
                        GENERATE REPORT
                    </Button>
                </div>

                <div className="reports-listing">
                    
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ AuthReducer }) => ({
    
})

export default connect(mapStateToProps)(Report);

