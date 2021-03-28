import { ActivityIndicator, View, StyleSheet, Animated, Text, LogBox, Image, TextInput, TouchableOpacity } from "react-native";
import React, {useState, useEffect, useRef, useMemo, createRef} from 'react';
import { Ionicons } from '@expo/vector-icons';
import CardFlip from 'react-native-card-flip';
import { WebView } from 'react-native-webview';

LogBox.ignoreAllLogs(true); // Due to an error with the card-flip library

export const ClueY = props => {
    const fadeInJSON = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const errorFadeInAnimation = useRef(new Animated.Value(0)).current;
    const fadeInPhase2Animation = useRef(new Animated.Value(0)).current;
    const translateYPhase2Animation = useRef(new Animated.Value(300)).current;
    const translateYPhase2WholeAnimation = useRef(new Animated.Value(0)).current;
    const fadeInWebViewAnimation = useRef(new Animated.Value(0)).current;
    const fadeOutLoadWebViewAnimation = useRef(new Animated.Value(0)).current;
    const fadeInPhase4Animation = useRef(new Animated.Value(0)).current;

    const refCards = useMemo(
        () => Array.from({ length: props.cardsValues.length }).map(() => createRef()),
        []
    );

    const [textSearch, setTextSearch] = useState("");
    const [showSpinner, setShowSpinner] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [showPhase2, setShowPhase2] = useState(false);
    const [showPhase3, setShowPhase3] = useState(false);
    const [showPhase4, setShowPhase4] = useState(false);

    const url = props.url;
    const cardsValues = props.cardsValues;
    const cardsValuesASCII = props.cardsValuesASCII;
    const translatedURL = props.translatedURL;
    const QRCodeURL = props.QRCodeURL;
    const Y = props.Y;

    useEffect(() => {
        console.log(cardsValues);
        const len = url.length;
        console.log(url)
        let n = 0;
        let s = ""
        if(len > 0){
            let interval = setInterval(() => {
                s += url[n];
                setTextSearch(s);
                n++;
                if(n >= len) {
                    clearInterval(interval);
                    fadeIn();
                }
            }, 60);
        }
    },[]);

    const fadeIn = () => {
        Animated.sequence([
            Animated.delay(100),
            Animated.timing(fadeInJSON, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
            }),
            Animated.delay(1000),
            Animated.timing(fadeInJSON, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
        })
        ]).start(() => error());
    };

    const error = () => {
        setShowSpinner(false);
        Animated.sequence([
            Animated.timing(errorFadeInAnimation, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
            Animated.delay(2500),
            Animated.timing(errorFadeInAnimation, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            })
        ]).start(() => {
            console.log("Animation DONE");
            setShowSearchBar(false);
            setShowPhase2(true);
            fadeInPhase2();
        });
    }

    const fadeInPhase2 = () => {
        Animated.sequence([
            Animated.timing(fadeInPhase2Animation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {translateYPhase2();});
    }
    
    const translateYPhase2 = () => {
        Animated.sequence([
            Animated.timing(translateYPhase2WholeAnimation, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {
            let n = 0;
            setTimeout(() => {
                let id = setInterval(() => {
                    refCards["card"+n].flip();
                    n++;
                    if(n >= refCards.length) {
                        clearInterval(id);
                        console.log("Ended ok")
                        translateYPhase2Whole();
                    }
                }, 300)
            }, 1000);
        });
    }

    const translateYPhase2Whole = () => {
        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(translateYPhase2WholeAnimation, {
                toValue: -900,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {
            setShowPhase2(false);
            setShowPhase3(true);
            fadeInWebView()
        });
    }

    const fadeInWebView = () => {
        Animated.sequence([
            Animated.delay(600),
            Animated.timing(fadeInWebViewAnimation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {

        });
    }
    
    const fadeOutLoadWebView = () => {
        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(fadeOutLoadWebViewAnimation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(fadeOutLoadWebViewAnimation, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true
            })
        ]).start(() => {
            setShowPhase3(false);
            setShowPhase4(true);
        });
    }

    const fadeInPhase4 = () => {
        Animated.sequence([
            Animated.timing(fadeInPhase4Animation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            })
        ]).start(() => {
            setTimeout(() => {
                props.onFinish();
            }, 2000);
        });
    }

    return(
        <View style={{flex:1, width:"100%", height:"100%", alignItems:"center"}}> 
            {showSearchBar &&
                <View style={{backgroundColor:"#AAAAAABB", flexDirection:"row", padding:5, borderRadius:13, margin:5}}>
                    <TextInput style={{width:"80%", marginHorizontal:20}} autoFocus={true} value={textSearch}/>
                    <Ionicons name="search" size={32} />
                </View>
            }
            {showSpinner &&  
                <Animated.View style={{ opacity: fadeInJSON }}>
                    <ActivityIndicator size="large" color="#000" />
                </Animated.View>
            }
            {showSearchBar && 
                <Animated.View style={{ opacity: errorFadeInAnimation,transform: [{translateX: shakeAnimation}] }}>
                    <Image source={require("../assets/404.png")} style={{marginTop:"10%", maxWidth:270, maxHeight:350}}/>
                </Animated.View>
            }
            {/* Here, we show the cards */}
            {showPhase2 &&
                <Animated.View style={{flex:1, opacity: fadeInPhase2Animation, alignItems:"center", marginTop:50, transform:[{translateY:translateYPhase2WholeAnimation}]}}>
                    <Text style={{fontSize:18}}>Il y a des <Text style={{fontSize:18, color:"red"}}>espaces</Text> dans le lien...</Text>
                    <Text style={{fontSize:18}}>Cela ressemble à des <Text style={{fontSize:18, color:"red"}}>codes ascii!</Text></Text>
                    <Text style={{fontSize:18}}>Essayons de les convertir!</Text>
                    <Animated.View style={{padding:25,flex:1, transform:[{translateY:translateYPhase2Animation}]}}>
                        <Text style={{color:"red", fontWeight:"700",fontSize:28,textAlign:"center"}}>{url.split("/").slice(0,3).join("/")+"/"}</Text>
                        <View style={{flexWrap:"wrap", flexDirection:"row"}}>
                            {cardsValues.map((item, index) => {
                                return (
                                    <CardFlip key={index} style={ styles.cardContainer } ref={ (card) => refCards["card"+index] = card }>
                                        <TouchableOpacity style={ styles.card }>
                                            <Text style={{color:"red", fontWeight:"700",fontSize:15,textAlign:"center"}}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={ styles.card }>
                                            <Text style={{color:"red", fontWeight:"700",fontSize:28,textAlign:"center"}}>
                                                {cardsValuesASCII[index]}
                                            </Text>
                                        </TouchableOpacity>
                                    </CardFlip>
                                )
                            })}
                        </View>
                    </Animated.View>
                </Animated.View>
            } 
            {showPhase3 &&
                <Animated.View style={{flex:1, width:'100%', opacity:fadeInWebViewAnimation}}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: translatedURL }}
                        style={{flex:1, zIndex:300}}
                        onLoadEnd={() => fadeOutLoadWebView()}
                    />
                    <Animated.View style={{position:"absolute", left:0, top:0, right:0,opacity:fadeOutLoadWebViewAnimation, zIndex:10}}>
                        <Text style={{color:"#AAAAAA", fontWeight:"700",fontSize:22,textAlign:"center", marginBottom:20}}>QR Code detected. Scanning...</Text>
                        <ActivityIndicator size={"large"} color={"#AAAAAA"}/>
                    </Animated.View>
                </Animated.View>
            }
            {showPhase4 &&
                <Animated.View style={{flex:1, width:'100%', opacity:fadeInPhase4Animation}}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: QRCodeURL }}
                        style={{flex:0.6, zIndex:3}}
                        onLoadEnd={() => fadeInPhase4()}
                    />
                    <View style={{ flex:0.4}}>
                        <Text style={{color:"red", fontWeight:"700",fontSize:28,textAlign:"center"}}>
                            Answer detected.
                        </Text>
                        <Text style={{color:"red", fontWeight:"700",fontSize:28,textAlign:"center"}}>Y = {Y}</Text>
                    </View>
                </Animated.View>
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    cardContainer:{
        height:30,
        width:30,
        justifyContent:"center",
        alignContent:"center",
    },
    card:{
        height:30,
        width:30,
        backgroundColor:"white",
        alignSelf:"center",
        justifyContent:"center"
    }
});