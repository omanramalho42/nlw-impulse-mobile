import React, { useRef, useState } from 'react'

import BottomSheet from '@gorhom/bottom-sheet'

import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'

import { styled } from './styles'
import { theme } from '../../theme'

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Success } from '../Success'
import { Options } from '../Options'
import { Form } from '../Form'

import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedbackType = keyof typeof feedbackTypes

const Widget: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  }

  const handleFeedbackRestart = () => {
    setFeedbackType(null)
    setFeedbackSend(false)
  }

  const handleFeedbackSend = (enable: boolean) => {
    setFeedbackSend(enable)
  }

  return (
    <>
        <TouchableOpacity 
          style={styled.button}
          onPress={handleOpen}
        >
            <ChatTeardropDots 
              size={24}
              weight="bold"
              color={theme.colors.text_on_brand_color}
            />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1, 280]}
          backgroundStyle={styled.modal}
          handleIndicatorStyle={styled.indicator}
        >
          { feedbackSend ? ( 
            <Success 
              onSendAnotherFeedback={handleFeedbackRestart}
            />
          ) : (
            <>
              { feedbackType ? (
                <Form 
                  feedbackType={feedbackType}
                  onFeedbackCanceled={handleFeedbackRestart}
                  onFeedbackSend={handleFeedbackSend}
                />
              ) : (
                ( <Options onFeedbackTypechanged={setFeedbackType} /> )
              ) }
            </>
          ) }
        </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)