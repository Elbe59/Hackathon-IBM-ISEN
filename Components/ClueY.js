import { ActivityIndicator, View, StyleSheet, Animated, Text, LogBox, Image, TextInput, TouchableOpacity } from "react-native";
import React, {useState, useEffect, useRef, useMemo, createRef} from 'react';
import { Ionicons } from '@expo/vector-icons';
import CardFlip from 'react-native-card-flip';
import { WebView } from 'react-native-webview';

LogBox.ignoreAllLogs(true); // Due to an error with the card-flip library

export const ClueY = props => {

    /**
     * Variables de Ref pour nos animations. Ce sont ces valeurs
     * qui vont varier dans le temps et qui seront injectées dans nos
     * balises Animated.View pour changer leur style progressivement.
     */
    const fadeInJSON = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const errorFadeInAnimation = useRef(new Animated.Value(0)).current;
    const fadeInPhase2Animation = useRef(new Animated.Value(0)).current;
    const translateYPhase2Animation = useRef(new Animated.Value(300)).current;
    const translateYPhase2WholeAnimation = useRef(new Animated.Value(0)).current;
    const fadeInWebViewAnimation = useRef(new Animated.Value(0)).current;
    const fadeOutLoadWebViewAnimation = useRef(new Animated.Value(0)).current;
    const fadeInPhase4Animation = useRef(new Animated.Value(0)).current;

    /**
     * useMemo nous permet faire une array de Refs pour pouvoir manipuler les cartes (une ref est une
     * référence à un élément 'html' et nous permet de le manipuler depuis notre code). Les cartes en
     * question sont celles qui se retournent toute seules dans la traduction en ASCII
     */
    const refCards = useMemo(
        () => Array.from({ length: props.cardsValues.length }).map(() => createRef()),
        []
    );

    // Nos variables de state pour afficher et cacher les différents éléments.
    const [textSearch, setTextSearch] = useState("");
    const [showSpinner, setShowSpinner] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [showPhase2, setShowPhase2] = useState(false);
    const [showPhase3, setShowPhase3] = useState(false);
    const [showPhase4, setShowPhase4] = useState(false);

    // Variables properties (ils sont mis en entrée à notre élément ClueY)
    const url = props.url;
    const cardsValues = props.cardsValues;
    const cardsValuesASCII = props.cardsValuesASCII;
    const translatedURL = props.translatedURL;
    const QRCodeURL = props.QRCodeURL;
    const Y = props.Y;

    // S'execute une seule fois.
    // Permet de rentrer automatiquement (de manière naturelle) le lien dans 
    // la barre de recherche lors de l'animation.
    useEffect(() => {
        const len = url.length;
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

    // Animation pour le spinner
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
        ]).start(() => error()); // On execute error ensuite.
    };

    // Animation pour l'erreur 404
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
            setShowSearchBar(false); // On cache la barre de recherche car tout est terminé
            setShowPhase2(true); // On active les éléments de la phase 2 (la traduction en ASCII de notre lien)
            fadeInPhase2(); // On fait apparaitre en fondue notre texte en haut de la page
        });
    }

    // Animation pour le texte en haut de la page
    const fadeInPhase2 = () => {
        Animated.sequence([
            Animated.timing(fadeInPhase2Animation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {translateYPhase2();}); // 
    }
    
    // Animation de translation vers le haut de notre lien (lien de l'indice Y)
    const translateYPhase2 = () => {
        Animated.sequence([
            Animated.timing(translateYPhase2WholeAnimation, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => { 
            // Ici, on retourne les cartes les unes après les autres
            let n = 0;
            setTimeout(() => {
                let id = setInterval(() => {
                    refCards["card"+n].flip();
                    n++;
                    if(n >= refCards.length) {
                        clearInterval(id);
                        console.log("Ended ok")
                        // Une fois terminé, on peut translater vers le haut toute la page pour passer à la suite
                        translateYPhase2Whole(); 
                    }
                }, 300)
            }, 1000);
        });
    }

    // Animation de translation vers le haut de toute la page pour ensuite afficher la webview du QR Code
    const translateYPhase2Whole = () => {
        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(translateYPhase2WholeAnimation, {
                toValue: -900,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {
            setShowPhase2(false); // On cache la partie 2
            setShowPhase3(true);  // On passe à la partie 3
            fadeInWebView() // On commence la transition en fondue de la webview
        });
    }

    // Transition en fondue de la webview
    const fadeInWebView = () => {
        Animated.sequence([
            Animated.delay(600),
            Animated.timing(fadeInWebViewAnimation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
        ]).start(() => {
            /**
             * Ici, on n'execute rien car le temps de chargement de
             * la page peut énormément varier. On récupère diréctement
             * l'événement onLoadEnd de la webview du QRCode (L.275) pour executer
             * la suite.
             */
        });
    }
    
    // On affiche les indicateurs de lecture du QR Code.
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
            setShowPhase3(false); // On cache la phase 3 
            setShowPhase4(true); // On passe à la phase 4 -> Load d'une seconde webview pour afficher M2.
        });
    }

    // Apparition en fondue de la phase 4 (webview qui va sur la page avec M2)
    const fadeInPhase4 = () => {
        Animated.sequence([
            Animated.timing(fadeInPhase4Animation, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            })
        ]).start(() => {
            setTimeout(() => {
                // On signal à notre élément mère (Solution) que ClueY a terminé
                // et que nous pouvons passer à l'étape suivante dans l'animation.
                props.onFinish(); 
            }, 2000);
        });
    }

    return(
        <View style={{flex:1, width:"100%", height:"100%", alignItems:"center"}}> 
            {showSearchBar &&
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} autoFocus={true} value={textSearch}/>
                    <Ionicons name="search" size={32} />
                </View>
            }
            {showSpinner &&  
                <Animated.View style={{ opacity: fadeInJSON }}>
                    <ActivityIndicator size="large" color="#000" />
                </Animated.View>
            }
            {showSearchBar && 
                <Animated.View style={{ opacity: errorFadeInAnimation, transform: [{translateX: shakeAnimation}] }}>
                    <Image source={require("../assets/404.png")} style={{marginTop:"10%", maxWidth:270, maxHeight:350}}/>
                </Animated.View>
            }
            {/* Here, we show the cards */}
            {showPhase2 &&
                <Animated.View style={[styles.phase2Container, {opacity: fadeInPhase2Animation, transform:[{translateY:translateYPhase2WholeAnimation}]}]}>
                    <Text style={styles.phase2Text}>Il y a des <Text style={styles.phase2TextRed}>espaces</Text> dans le lien...</Text>
                    <Text style={styles.phase2Text}>Cela ressemble à des <Text style={styles.phase2TextRed}>codes ascii!</Text></Text>
                    <Text style={styles.phase2Text}>Essayons de les convertir!</Text>
                    <Animated.View style={{padding:25,flex:1, transform:[{translateY:translateYPhase2Animation}]}}>
                        <Text style={styles.phase2RootLink}>{url.split("/").slice(0,3).join("/")+"/"}</Text>
                        <View style={styles.phase2CardsContainer}>
                            {cardsValues.map((item, index) => {
                                return (
                                    <CardFlip key={index} style={ styles.cardContainer } ref={ (card) => refCards["card"+index] = card }>
                                        <TouchableOpacity style={ styles.card }>
                                            <Text style={styles.phase2CardsText}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={ styles.card }>
                                            <Text style={styles.phase2CardsText}>
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
                <Animated.View style={[styles.webViewHolder, {opacity:fadeInWebViewAnimation}]}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: translatedURL }}
                        style={{flex:1, zIndex:300}}
                        onLoadEnd={() => fadeOutLoadWebView()}
                    />
                    <Animated.View style={[styles.phase3LoadingIndicatorContainer, {opacity:fadeOutLoadWebViewAnimation}]}>
                        <Text style={styles.phase3LoadingText}>QR Code detected. Scanning...</Text>
                        <ActivityIndicator size={"large"} color={"#AAAAAA"}/>
                    </Animated.View>
                </Animated.View>
            }
            {showPhase4 &&
                <Animated.View style={[styles.webViewHolder, {opacity:fadeInPhase4Animation}]}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: QRCodeURL }}
                        style={styles.phase4WebView}
                        onLoadEnd={() => fadeInPhase4()}
                    />
                    <View style={{ flex:0.4}}>
                        <Text style={styles.phase2RootLink}>
                            Answer detected.
                        </Text>
                        <Text style={styles.phase2RootLink}>
                            Y = {Y}
                        </Text>
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
    },
    textInputContainer: {
        backgroundColor: "#AAAAAABB",
        flexDirection: "row",
        padding: 5,
        borderRadius: 13,
        margin: 5
    },
    textInput: {
        width: "80%",
        marginHorizontal: 20
    },
    phase2Container: {
        flex: 1,
        alignItems: "center",
        marginTop: 50
    },
    phase2Text: {
        fontSize: 18
    },
    phase2TextRed: {
        fontSize: 18,
        color: "red"
    },
    phase2RootLink: {
        color: "red",
        fontWeight: "700",
        fontSize: 28,
        textAlign: "center"
    },
    phase2CardsContainer: {
        flexWrap: "wrap",
        flexDirection: "row"
    },
    phase2CardsText: {
        color: "red",
        fontWeight: "700",
        fontSize: 15,
        textAlign: "center"
    },
    webViewHolder: {
        flex: 1,
        width: '100%'
    },
    phase3LoadingIndicatorContainer: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        zIndex: 10
    },
    phase3LoadingText: {
        color: "#AAAAAA",
        fontWeight: "700",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20
    },
    phase4WebView: {
        flex: 0.6,
        zIndex: 3
    }
});