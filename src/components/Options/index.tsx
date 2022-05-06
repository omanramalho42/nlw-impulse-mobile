import React from 'react'

import {
   View,
   Text
} from 'react-native'

import { Copyright } from '../Copyright'
import { Option } from '../Option'

import { FeedbackType } from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes'
import { styled } from './styles'

interface OptionsProps {
    onFeedbackTypechanged: (feedbackType: FeedbackType) => void;
}

export const Options = ({ onFeedbackTypechanged }: OptionsProps) => {
    return (
        <View style={styled.container}>
            <Text style={styled.title}>
              Deixei seu feedback
            </Text>
          
            <View style={styled.options}>
                    {
                        Object.
                        entries(feedbackTypes)
                        .map(([key, value]) => (
                            <Option
                                onPress={() => onFeedbackTypechanged(key as FeedbackType)}
                                key={key}
                                title={value.title}
                                image={value.image}
                            />
                        ))
                    }
            </View>
            <Copyright />
        </View>
    )
}