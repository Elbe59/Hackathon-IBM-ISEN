import { ActivityIndicator, View, StyleSheet, Animated, Text, Dimensions, Image, TextInput } from "react-native";
import React, {useState, useEffect, useRef} from 'react';
import { Ionicons } from '@expo/vector-icons';

export const Transition = (props) => {

    const transitionAnim_translationX = useRef(new Animated.Value(200)).current;
    const transitionAnim_opacity = useRef(new Animated.Value(0)).current;

    const duration = props.duration;
    const delay = props.delay;
    const title = props.title;
    const fontSize = props.fontSize;

    const show = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(transitionAnim_opacity, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true
                }),
                Animated.timing(transitionAnim_translationX, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true
            })]),
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(transitionAnim_opacity, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true
                }),
                Animated.timing(transitionAnim_translationX, {
                    toValue: -200,
                    duration: duration,
                    useNativeDriver: true
                })
            ])
        ]).start(() => props.onFinish())
    };

    useEffect(() => {
        show();
    }, []);

    return(
        <Animated.View style={{width:"90%", height:"100%", justifyContent:"center", alignItems:"center", transform: [{translateX:transitionAnim_translationX}], opacity:transitionAnim_opacity}}>
            <Text style={{fontSize, textAlign:"center", flexWrap:"wrap"}}>{title}</Text>
        </Animated.View>
    )

}