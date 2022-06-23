import React, { useEffect, useState } from 'react'
import { Animated, ActivityIndicator, FlatList, ScrollView, Text, TextInputProps, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Container, MultiSelection, Selection, Wrapper } from './style'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import { Button, Checkbox, TouchableRipple } from 'react-native-paper'
import api from '../../services/api'
import { Obj } from '../Input'
import { InputLabel } from '../Input/style'

type SelectionBoxProps = ViewProps & {
    multiselect?: boolean;
    loading?: boolean;
    items?: {
        nome: string;
        value: string;
    }[];
    label: string;
    setItems?: React.Dispatch<React.SetStateAction<any[]>>;
    setText?: any;
    setInputEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeText?: any;
    setObjChanges?: React.Dispatch<React.SetStateAction<Obj>>;
    handlePress?: React.Dispatch<React.SetStateAction<Set<string>>>;

}

type AnimatedViewStyle = Animated.TimingAnimationConfig;

export const Multi = ({ item, handlePress, key }) => {
    const { nome, value } = item
    const [checked, setChecked] = useState(false)
    return (
        <View key={key} style={{ marginBottom: 3.5, marginTop: 7 }}>
            <Checkbox color='gray'
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    handlePress(item, checked);
                    setChecked(!checked)
                }}
            />
            <Text style={{ position: 'absolute', top: 8, left: 12, marginLeft: 25, paddingBottom: 30, fontSize: 14, backfaceVisibility: 'visible' }}>
                {nome}
            </Text>
        </View>
    )
}

const SelectionBox = ({ items, setItems, setInputEnabled, onChangeText, setObjChanges, handlePress,
    multiselect, label, loading, ...rest }: SelectionBoxProps) => {
    const disable = (item) => (setItems && (
        setItems([]),
        onChangeText(item),
        setInputEnabled && setInputEnabled(false)
    ))

    const request = async (id) => {
        if (!setObjChanges) return;
        const { data } = await api.get("consulta/equipamento/itemSelect?value=" + id);
        console.log(data)
        setObjChanges && setObjChanges(data)
    }

    const handlePressSelect = async (itemName, id) => {
        disable(itemName);
        await request(id);
    }

    return (
        <Container>
            {label ? <InputLabel>{label}</InputLabel> : null}
            <Wrapper>
                {loading ?
                    <ActivityIndicator size={30} color='gray' />
                    :
                    <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="interactive">
                        {
                            items?.map((item, key) => {
                                let { nome, value } = item
                                return multiselect ?
                                    <MultiSelection key={key} handlePress={handlePress} item={item} /> :
                                    <Selection key={key}
                                        onPress={() => handlePressSelect(nome, value)}>
                                        <Text style={{ paddingBottom: 5 }}>
                                            {nome}
                                        </Text>
                                    </Selection>
                            })
                        }
                    </ScrollView>
                }
            </Wrapper>
        </Container >
    )
}

export default SelectionBox