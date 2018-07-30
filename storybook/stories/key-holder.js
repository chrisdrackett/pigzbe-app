import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import KeyHolder from '../../src/app/components/key-holder';
import StepModule from '../../src/app/components/step-module';
import Button from '../../src/app/components/button';
import {Keypair} from '@pigzbe/stellar-utils';

const keys = [
    'SB5FRAKLL5RINPDCPWLPVRKX7FBM2VTFJCEAUWBR4EGVS3YK7UKCXSPT',
    'SDEMAICEQJ5ZUFPRQ4U7N6MGGSMF7ADY5AIY7G2HRB3YVYA6TYRETBJL',
    'SD42KVR2OQN4C3INBHOOA7XO4KOVCXYNQUOMKF5KHAIE6OR2OAZX55H6',
    'SA4RBS3IW2STNYJBQXPJQGBN6BFZPOIL2WA5BUEI5L42K44TDGU6N7KR',
    'SBOSDO5Q3KVODIUEKXGIJVH4TQLN2KHXNXW4FNRMNKQ2CTO3WH5XUSL4',
    'SDWU5EGVTWHYCKLJOFWUECCEKFJTMKKMKQBGNT7NOJ24PP67EJJGFR6D',
    'SDQ433MQO566PRYSUDR43Q3CEITAOF2KR3HRWFQAZZRSI4KONWLTBPSW',
    'SA7AAJPUTBQIWUGI77T3YMI2FHB2DOD7MFQSX2AEFFU65MNQC5LRSWQG',
    'SDKJQIKJRTVZV2EFZ6M6YEFOXEBPDR75MEG6LIAQICWLQFXK6WYB7GV7',
    'SBRQH3JEKPD4O5AUS52CKW3QLHTI34QAKURBV2OXFBU7XKZYVXQXVIIA',
    'SDGORYJIB3UMCBHV3JE7HC4WHKXOVFGAOR7OILJO36C3UYL7YOLNA3EQ',
    'SCXKR5GSFWOUZAZD4AJNFIDUA6AX6IHOJ6ZUQ2IOWIH5UUT4NBZTLB5T',
    'SB3J4REMGLVCDUI5JJ3I3RJBG6MZ3ALL6T4L6PUXHPSB5JB4EIOW6HRR',
    'SCLFHTG6MPEVNCKG5QXK65OGDXUXDHFXHXYFXQ3YRUDNBPQVRTYYRT6W',
    'SCZYUAS3NLZG56ANY7SGJCNX6U7DY4I6TSK6MDTJNAUEJPNWZGRMCN5H',
    'SDTRHCKWVAMV6MNN5SMWXQDWHQQYECBP4D6FLFDIKZB4LOWNFVP6HSYC',
    'SCCFWFAM6GCKPG5QLMREXH2UAS7I5XBFG52ENQS6QYDAAUNYONJGARBW',
    'SDMJNT6FIR2CAU6JVAVUNZM7QACOBMLVDMHZPFPNZ7BYVBYMMNQHD4U5',
    'SDW2Q5AXPRQWLLBKPPP7E7CECZUJH2EFL5APMJVVSHS4QQQUUBN3UB4D',
    'SBZN5F27XNIJWN6DDZU5FAIFRFNRYGROFMNNNAFUXL5PDSBRU3PDVH4O'
];

const createKey = async () => {
    const keypair = await Keypair.randomAsync();
    return keypair.secret();
};

const stories = storiesOf('KeyHolder');

stories.add('keyholder', () => (
    <StepModule
        title={'Key holder'}
        icon="secure"
        pad
        paddingTop={18}
    >
        <View>
            {keys.map(key => (
                <KeyHolder
                    key={key}
                    title={'Secret Key'}
                    content={key}
                    onPress={() => {}}
                    style={{marginBottom: 18}}
                />
            ))}
        </View>
    </StepModule>
));

stories.add('transaction hash', () => (
    <StepModule
        title={'Key holder'}
        icon="secure"
        pad
        paddingTop={18}
    >
        <View>
            <KeyHolder
                title="Transaction hash"
                content="0x58e5a0fc7fbc849eddc100d44e86276168a8c7baaa5604e44ba6f5eb8ba1b7eb"
                onPress={() => {}}
            />
        </View>
    </StepModule>
));

stories.add('create test keys', () => (
    <View style={{backgroundColor: 'black', padding: 18}}>
        <Button
            label={'Create keys'}
            onPress={() => {
                Promise.all(new Array(20).fill(0).map(() => createKey())).then(res => console.log(JSON.stringify(res, null, 2)));
            }}
        />
    </View>
));
