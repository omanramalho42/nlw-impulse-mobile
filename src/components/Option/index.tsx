import React from 'react'

import {
   TouchableOpacity,
   TouchableOpacityProps,
   Image,
   ImageProps,
   Text,
} from 'react-native'

import { styled } from './styles'

interface OptionsProps extends TouchableOpacityProps {
    title: string;
    image: ImageProps;
}

export const Option = ({ image, title, ...rest }: OptionsProps) => {
   return (
      <TouchableOpacity
        style={styled.container}
        {...rest}
      >
        <Image 
            source={image}
            style={styled.image}
        />

        <Text style={styled.title}>{title}</Text>
      </TouchableOpacity>
  )
}