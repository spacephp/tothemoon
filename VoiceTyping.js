import React, {useEffect, useState} from 'react';
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import {
    PermissionsAndroid,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

export default function VoiceTyping ({options, icon, listeningIcon, style, startListening, stopListening}) {
    const [listening, setListening] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [chunkStates, setChunkStates] = useState([]);
    const pcm8Threshold = 110;
    const pcm16Thresshold = -1800;

    useEffect(() => {
        console.log("Start");
        AudioRecord.init(options);
        AudioRecord.on('data', (data) => {
            processChunk(data);
        });
    }, []);

    useEffect(() => {
        if (detectSilent(chunkStates, 20)) {
            setListening(false);
        }
    }, [chunkStates, chunks]);

    useEffect(() => {
        if (listening) {

        } else {
            if (chunks.length > 0) {
                stopRecording();
            }
        }
    }, [listening]);

    const processChunk = async (data) => {
        const amplitudes = base64ToAmplitudes(data);
        const minAmplitude = getMin(amplitudes);
        
        if (minAmplitude < pcm16Thresshold) {
            console.log("Sound detect" + minAmplitude);
            setChunks((prev) => [...prev, data]);
            setChunkStates((prev) => [...prev, 1]);
        } else {
            setChunkStates((prev) => [...prev, 0]);            
        }
    }

    const detectSilent = (states, period = 20) => {
        chunkStatesLength = states.length;
        if (chunkStatesLength < 30) return false;
        for (var i = 0; i < period; ++i) {
            if (states[chunkStatesLength - 1 - i] == 1) {
                return false;
            }
        }
        return true;
    }

    const startRecording = async () => {
        // ask permission
        const recordingPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (! recordingPermission) {
            alert("Không truy cập quyền ghi âm. Vui lòng bật quyền ghi âm để sử dụng tính năng.");
            return false;
        }
        // start record
        setListening(true);
        setChunkStates([]);
        setChunks([]);
        AudioRecord.start();
        startListening();
    }
    
    const stopRecording = async () => {
        console.log('stop');
        
        await AudioRecord.stop();
        //console.log(chunks);
        stopListening(chunks);
    }

    const onPress = () => {
        if (! listening) {
            startRecording();
        } else {
            stopRecording();
        }
    }
    return (
        <View style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: [{ translateY: 0 }],
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image source={listening?listeningIcon:icon} style={[{width: 26,
                height: 26,
                 resizeMode: 'contain'
                 }, 
            style]}/>
          </TouchableOpacity>
        </View>
    );
}

const base64ToAmplitudes = (base64) => {
    // Step 1: Decode Base64 string to binary data
    const binaryData = Buffer.from(base64, 'base64');
  
    // Step 2: Convert binary data to Int16Array
    const intArray = new Int16Array(binaryData.buffer);
  
    // Step 3: Normalize amplitudes
    //const maxAmplitude = 32767;
    //const normalizedAmplitudes = intArray.map(sample => sample / maxAmplitude);
  
    return intArray;
}
const getMin = (chunk) => {
    let min = 1000;
    for (let i = 0; i < chunk.length; i++) {
      const byteValue = chunk[i];
      if (min > byteValue) {
        min = byteValue;
      }
    }
    return min;
}

const getMax = (chunk) => {
    let max = 0;
    for (let i = 0; i < chunk.length; i++) {
      const byteValue = chunk[i];
      if (max < byteValue) {
        max = byteValue;
      }
    }
    return max;
}