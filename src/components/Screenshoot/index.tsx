import React from "react"

import { View, TouchableOpacity, Image } from "react-native"

import { Camera, Trash } from "phosphor-react-native"

import { theme } from "../../theme"
import { styled } from "./styles"

interface ScreenshootProps {
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
}

export const Screenshoot = ({ screenshot, onTakeShot, onRemoveShot}: ScreenshootProps) => {
    return (
        <TouchableOpacity
            style={styled.container}
            onPress={screenshot ? onRemoveShot : onTakeShot}
        >
            {
                screenshot ? (
                    <View>
                        <Image 
                            source={{ uri: screenshot }}
                            style={styled.image}
                        />
                        <Trash 
                            size={22} 
                            color={theme.colors.text_secondary} 
                            weight="fill" 
                            style={styled.removeIcon} 
                        />
                    </View>
                    ) : (
                        <Camera 
                            size={24}
                            color={theme.colors.text_primary}
                            weight="bold"
                        />
                    )
            }
        </TouchableOpacity>
    )
}