import React, { useEffect, useState } from 'react'
import { Animated, ActivityIndicator, FlatList, Text, TextInputProps, TouchableHighlight, TouchableHighlightBase, TouchableNativeFeedback, TouchableOpacity, View, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Container, InputLabel, InputText, Icon, Wrapper } from './style'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import SelectionBox from '../SelectionBox'

import { TouchableRipple } from 'react-native-paper'
import api from '../../services/api'
import axios from 'axios'

export type Obj = {
    acOrgao: string,
    txtQtd: string,
    txtLocal: string,
    messages: {
        errors: string[],
        infos: string[]
    }
}

type InputProps = TextInputProps & {
    multiselect?: boolean;
    label: string;
    procurePor?: string;
    value?: string | number;
    items?: any[];
    setItems?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    setInputEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
    isEnabled?: boolean;
    setIsEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
    setObjChanges?: React.Dispatch<React.SetStateAction<Obj>>;
    handlePress?:  React.Dispatch<React.SetStateAction<Set<string>>>;
}


const Input = ({ items, setItems, setInputEnabled, isEnabled,
    setIsEnabled, setObjChanges, value, procurePor, label, ...rest }: InputProps) => {

    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Se as propriedades não forem passadas
    if (isEnabled === undefined && setIsEnabled === undefined) {
        [isEnabled, setIsEnabled] = useState(true)
    }

    const handleInputFocus = () => { setIsFocused(true) }
    const handleInputBlur = () => {
        if(rest.multiselect) return;
        if (items && isEnabled) {
            rest.onChangeText && rest.onChangeText("");
        }
        setIsFocused(false);
    }

    const toggleShowPassword = () => setShowPassword(!showPassword)
    const enable = () => (
        rest.onChangeText && rest.onChangeText(""),
        setIsEnabled && setIsEnabled(true)
    )

    useEffect(() => {
        if (isLoading && !isFocused) {
            setItems && setItems([])
        }
        return () => { }
    }, [isFocused, isLoading]);

    useEffect(() => {
        if (["solicitante", "orgao", "equipamento"].includes(procurePor ?? '')) {
            setItems && setItems([])
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            const time = setTimeout(async () => {
                if (isEnabled) {
                    if (isLoading) return setIsLoading(false);
                    if (value === "") return;
                    if (!isEnabled) return;

                    try {
                        setIsLoading(true)
                        let path;
                        if(label == "solicitante") path = `/consulta/solicitante`; 
                        else path = `/consulta/${procurePor}?nome=${value}` 
                        const { data } = await api.get(path,
                            {
                                cancelToken: source.token
                            })
                        setIsLoading(false)

                        const { query } = data 
                        if(label === "solicitante") {
                            // Filtrar os resultados da pesquisa
                             let filtered = query.filter(x => x.nome.startsWith(value))
                            setItems && setItems(filtered)
                        }
                        else {
                            setItems && setItems(query)
                        }
                    } catch (errors) {
                        // console.log(Object.keys(errors))
                    }
                }
            }, 1000);

            return () => {
                clearTimeout(time)
                source.cancel();
            };
        }
    }, [value]);

    return (
        <Container>
            {label ? <InputLabel>{label}</InputLabel> : null}
            <Wrapper>
                <InputText numberOfLines={rest.numberOfLines || 1}
                    editable={isEnabled}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={value}
                    isEnabled={isEnabled}
                    isFocused={isFocused}
                    secureTextEntry={label == "senha" ? !showPassword : false}
                    {...rest}
                />
                {
                    value && !isLoading && !(label === "senha") ?
                        <Icon isEnabled={isEnabled} rippleColor="rgba(0, 0, 0, .12)" onPress={enable}>
                            <MatIcon name="highlight-remove" size={20} onPress={enable} />
                        </Icon> : null
                }
                {
                    isLoading && isFocused ?

                        <ActivityIndicator style={{ position: 'absolute', padding: 14 }} size={20} color={"black"} />
                        :
                        null
                }
                {
                    label === "senha" ?
                        <Icon borderless onPress={toggleShowPassword} isFocused={isFocused}>
                            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} showPassword={showPassword} />
                        </Icon> : null
                }
            </Wrapper>

            {setItems && isFocused  ?
                <SelectionBox label={label} items={items} setItems={setItems}
                    setInputEnabled={setIsEnabled} setObjChanges={setObjChanges} {...rest} /> // setObjChanges está aqui
                : null
            }
        </Container>
    )
}

export default Input