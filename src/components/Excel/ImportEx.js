import XLSX from 'xlsx'
import React from 'react'
import { Button } from '@material-ui/core';


export default function ImportExcel() {
    const [data, setData] = React.useState({
        data: ''
    })

    let loadExcel = null

    const convert = () => {

        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 })
    }

    
    // input_dom_element.addEventListener('change', handleFile, false);

    const fileSelector = (event) => {
        console.log(event.target.files[0])
    }

    return (
        <div>
            <input style={{ display: 'none' }} type='file' onChange={convertFile} ref={(e) => loadExcel = e} />
            <Button onClick={() => loadExcel.click()}>Choose</Button>
            {/* <Button onClick={convertFile}>Convert</Button> */}
        </div>
    )
}



