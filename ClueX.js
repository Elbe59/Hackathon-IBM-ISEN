import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

export const ClueX = props => {
    // Initializing variables
    let scrollViewRef = React.createRef();
    let [hide_ScrollView_X, setHide_ScrollView_X] = useState(false);
    let [hide_XRaw, setHide_XRaw] = useState(false);

    // Props inputs
    let Pi = props.Pi;
    let XRaw = props.XRaw;
    let X = props.X;
    let showDecimalPi = props.showDecimalPi;
    let decimalPi = props.decimalPi;
    
    // Component did mount
    useEffect(() => {
        setTimeout(() => {
            try {
                scrollViewRef.scrollToEnd({animated: true, duration:3000});
            } catch (error) {
                console.error("Error: Couldn't scroll to the end.")
            }   
        }, 2200);
    },[]);

    return(
        <View style={{flex:1}}>       
            { !hide_ScrollView_X &&
                <Animatable.View 
                    onAnimationEnd={() => setHide_ScrollView_X(true)}
                    animation="fadeOutLeft"
                    delay={7000}
                    duration={700}
                    direction="normal"
                >
                    <ScrollView
                        ref={(r) => scrollViewRef=r}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    >
                        <Text style={styles.PI_Wrapper}>
                            {Pi}
                            <Text style={styles.PI_Number_Found}>
                                {XRaw}
                            </Text>
                        </Text>
                        { showDecimalPi &&
                            <View style={styles.Animation_Wrapper_Bottom}>
                                <Text style={styles.PI_Decimal_Index}>
                                    {decimalPi}th decimal of π
                                </Text>
                                { !hide_XRaw &&
                                    <Animatable.Text 
                                        onAnimationEnd={() => setHide_XRaw(true)}
                                        animation="fadeOutLeft"
                                        delay={2000}
                                        duration={800}
                                        direction="normal"
                                        style={styles.Number_Raw_Animation}
                                    >
                                        {XRaw}
                                    </Animatable.Text>
                                }
                                <Animatable.Text  
                                    animation="fadeInRight"
                                    delay={2800}
                                    direction="normal"
                                    style={styles.Number_Converted_Animation}
                                >
                                    {X}
                                </Animatable.Text>
                            </View>
                        }
                    </ScrollView>
                </Animatable.View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    PI_Wrapper : {
        textAlign:"justify",
        fontSize:36,
        fontWeight:"600",
        paddingTop:100
    },
    PI_Number_Found : {
        fontSize:36,
        fontWeight:"bold",
        color:"red"
    },
    Animation_Wrapper_Bottom : {
        height:400,
        width:'100%',
        alignItems:"center",
        paddingBottom:Dimensions.get('window').height/2.5
    },
    PI_Decimal_Index : {
        textAlign:"center",
        fontSize:22,
        marginVertical: 50
    },
    Number_Raw_Animation : {
        color:"red",
        fontSize:70,
        fontWeight:"700"
    },
    Number_Converted_Animation : {
        color:"red",
        fontSize:70,
        fontWeight:"700"
    }
});