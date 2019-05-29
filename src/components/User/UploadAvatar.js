import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios'

function UploadImage() {
    const [state, setstate] = useState({
        selectedFile: null
    })
    const fileSelector = (event) => {
        setstate({selectedFile: event.target.files[0]})
    }

    var inputBut = null 

    const fileUploader = () => {
        const fd = new FormData()
        fd.append('image', state.selectedFile, state.selectedFile.name)
        axios.post('https://us-central1-ufaweb-229ce.cloudfunctions.net/uploadFile', fd)
            .then((res) => {
                console.log(res.data.url)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <input style={{display: 'none'}} type='file' onChange={fileSelector} ref={thisinput => inputBut = thisinput} />
            <Button color='primary' onClick={() => inputBut.click()}>Choose</Button>
            <Button color='secondary' onClick={fileUploader}>Upload</Button>
        </div>
    )
}

export default UploadImage