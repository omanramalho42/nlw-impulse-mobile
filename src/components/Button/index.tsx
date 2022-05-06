import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native'
import { theme } from '../../theme';

import { styled } from './styles'

interface ButtonProps extends TouchableOpacityProps {
    isLoading: boolean;
}

export const Button = ({ isLoading, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
        style={styled.container}
        {...rest}
    >   
        {isLoading ? (
            <ActivityIndicator 
                color={theme.colors.text_on_brand_color}
            />
            ) : (
                <Text style={styled.title}>Enviar Feedback</Text>
            )}    
    </TouchableOpacity>
  )
}