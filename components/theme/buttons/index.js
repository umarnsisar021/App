import * as React from 'react';
import GradientButton from 'react-native-gradient-buttons';
export default function ThemeButton(props) {
    return (<GradientButton
            style={{ marginTop: 20 }}
            text=""
            textStyle={{ fontSize: 16, fontWeight: '500' }}
            gradientBegin="#F6756B"
            gradientEnd="#CB587F"
            gradientDirection="diagonal"
            height={50}
            width={'auto'}
            radius={5}
            impact
            impactStyle='Light'
            {...props}
    />)
}