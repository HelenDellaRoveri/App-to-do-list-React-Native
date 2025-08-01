import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


const categorias = [
    {
        label: 'Trabalho',
        value: 'trabalho',
        color: '#000000',
    },
    {
        label: 'Estudo',
        value: 'estudo',
        color: '#000000',
    },
    {
        label: 'Pessoal',
        value: 'pessoal',
        color: '#000000',
    },
    {
        label: 'Rotina',
        value: 'rotina',
        color: '#000000',
    },
    {
        label: 'Obrigação',
        value: 'obrigação',
        color: '#000000',
    },
    {
        label: 'Outro...',
        value: 'outro...',
        color: '#000000',
    },
];

export default function CategoryPicker({value, onChange}){
    return(
        <RNPickerSelect
            onValueChange={onChange}
            items={categorias}
            value={value}
            placeholder={{ label: 'Selecione uma categoria...', value: null }}
            style={s}
            useNativeAndroidPickerStyle={false}
        />
    );
}

const s = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
    },
    RNPickerSelect: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
    }
});