import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import { Buffer, loaded, Player } from 'tone';
import axios from 'axios'

const extractFromFile = (audioObject) => {
    // await axios.post('http://localhost:3001/upload', {
    //     data: {
    //         audioObject,
    //     }
    // })
    //     .then((response) => {
    //         console.log('response : ',response)
    //                 //window.location.reload(); // reload page on success to refresh data
    //     })
    //     .catch((error) => console.log(error))
    // const audioUrl = audioObject;
    const audioFile = new File([''], audioObject.name, { type: 'audio/mpeg' });
    // await loaded(audioUrl).then((res) => console.log(res));
    console.log('parsed audio file --> ',audioFile)
    const buffer = new Buffer(audioFile, function() {
        // The buffer has loaded, so we can now create a player and play the audio
        //const player = new Tone.Player(buffer).toDestination();
        //player.start();
        console.log('BUFFER --> ',buffer)
        const player = new Player(buffer).toDestination();
        player.start()
        // loaded().then(() => {
        //     player.start();
        // });
      });
    
    //console.log(audioBuffer)

    // Extract the key
    //const key = Tone.Tonal.key(audioBuffer.getChannelData(0));
    //console.log('KEY -> ', key)
    // Extract the BPM
    //const bpm = Tone.BPM.detect(audioBuffer.getChannelData(0));
    //console.log('BPM -> ',bpm)

}

const Uploader = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [blob, setBlob] = useState('')

  const handleUpload = () => {
    const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });
    //console.log('FORM --> ',formData)
    //setUploading(true);
    console.log('fileList --> ',fileList)
    const audioFileObj = fileList[0]
    console.log('AUDIO FILE --> ',audioFileObj)
    //const audioBlob = new Blob([audioFileObj], { type: audioFileObj.type });
    //console.log('BLOB --> ',audioBlob)
    //setBlob(audioBlob)

    extractFromFile(audioFileObj)
  };

  const playAudio = async () => {
    if(blob===''){
        return ''
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    // //extractFromFile(reader.readAsArrayBuffer(audioBlob))
    // //extractFromFile(audioFileObj)
    reader.onload = () => {
        const audioData = reader.result;
        const audioBuffer = new Buffer(audioData)
            
        console.log(audioBuffer)
        //const key = Tonal.key(audioBuffer.getChannelData(0));
        //console.log('KEY -> ', key)
        //const bpm = BPM.detect(audioBuffer.getChannelData(0));
        //console.log('BPM -> ',bpm)
        const player = new Player(audioBuffer).toDestination();
        loaded().then(() => {
            player.start();
        });
    };
  }


  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {/*
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Analyzing' : 'Start Analysis'}
      </Button>
      <Button onClick={playAudio}>{'Play Clip'}</Button>*/}
    </>
  );
};
export default Uploader;