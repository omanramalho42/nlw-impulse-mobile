import React, { useState } from 'react'

import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    TextInput,
} from 'react-native'

import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

import { captureScreen } from 'react-native-view-shot'

import { ArrowLeft } from 'phosphor-react-native'

import { theme } from '../../theme'
import { styled } from './styles'

import { FeedbackType } from '../../components/Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { Screenshoot } from '../../components/Screenshoot'
import { Button } from '../Button'

import { api } from '../../libs/api'

import * as FileSystem from 'expo-file-system'

interface FormProps {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSend: (enable: boolean) => void;
}

export const Form = ({ feedbackType, onFeedbackCanceled, onFeedbackSend  }: FormProps) => {
    const [isSendFeedback, setIsSendFeedback] = useState(false);
    
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')

    const handleScreenshot = () => {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch((err) => console.log(err))
    }

    const handleScreenshotRemove = () => {
        setScreenshot(null)
    }

    const handleSendFeedback  = async () => {
        if(isSendFeedback) {
            return;
        }

        setIsSendFeedback(true)
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment,
            })
            console.log("dados enviado para api")
            onFeedbackSend(true)
        }catch(err) {
            console.log(err)
            setIsSendFeedback(false)
        }
    }

    return (
    <View style={styled.container}>
        <View style={styled.header}>
            <TouchableOpacity
                onPress={onFeedbackCanceled}
            >
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styled.titleContainer}>
                <Image 
                    source={feedbackTypeInfo.image}
                />
                <Text style={styled.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>

        </View>
    
        <BottomSheetTextInput
            autoCorrect={false}
            multiline
            style={styled.input}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo"
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}
        />

        <View style={styled.footer}>
            <Screenshoot 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}
            />

            <Button
                onPress={handleSendFeedback}
                isLoading={isSendFeedback} 
            />
        </View>
    </View>
  )
}