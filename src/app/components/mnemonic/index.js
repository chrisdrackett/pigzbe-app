import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import TextInput from '../../components/text-input';
import styles from './styles';


const Word = ({word, selected}) => (
    <View style={[styles.word, selected ? styles.word__selected : null]}>
        <Text style={[styles.wordText, selected ? styles.wordText__selected : null]}>
            {word}
        </Text>
    </View>
);

const Input = ({value}) => (
    <TextInput
        numberOfLines={Dimensions.get('window').width < 321 ? 4 : 3}
        value={value}
        onChangeText={() => {}}
        editable={false}
        style={{textAlign: 'center'}}
    />
);

export default ({
    confirm,
    mnemonic,
    words,
    mnemonicConfirm,
    onSelect
}) => {
    if (confirm) {
        return (
            <View>
                <Input value={mnemonicConfirm.map(index => words[index]).join(' ')}/>
                <View style={styles.wordHolder}>
                    {words.map((word, index) => (
                        <TouchableOpacity key={index} onPress={() => onSelect(index)}>
                            <Word
                                word={word}
                                selected={mnemonicConfirm.includes(index)}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }

    return <Input value={mnemonic}/>;
};
