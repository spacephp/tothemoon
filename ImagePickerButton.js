import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native';

export default function ImagePickerButton({options, onImagesSelected, title}) {
    const imagePicker = () => {
        ImagePicker.openPicker(options).then(images => {
            //console.log(images);
            images.map((image) => {
              image.filename = image.path.split('/').pop();
              return image;
            });
            onImagesSelected(images);
        });
    }
    return (
        <Button title={title} onPress={imagePicker}/>
    )
}