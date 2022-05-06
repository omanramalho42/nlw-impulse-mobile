import React from "react"

import successImg from '../../assets/success.png'

import { View, Image, Text, TouchableOpacity } from 'react-native'

import { Copyright } from "../Copyright"

import { styled } from './styles'
import { useEffect } from "react"

interface SuccessProps {
    onSendAnotherFeedback: () => void;
}

export const Success = ( { onSendAnotherFeedback }: SuccessProps) => {
    useEffect(() => {
        console.log("success")
    },[])
    return (
        <View style={styled.container}>
            <Image 
                source={successImg}
                style={styled.image}
            />

            <Text style={styled.title}>
                Agradecemos o seu feedback
            </Text>

            <TouchableOpacity
                style={styled.button}
                onPress={onSendAnotherFeedback}
            >
                <Text style={styled.buttonTitle}>
                    Quero enviar outros
                </Text>
            </TouchableOpacity>
        </View>
    )
}