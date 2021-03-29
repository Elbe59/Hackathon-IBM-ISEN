import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {ClueX} from "./ClueX";
import {ClueY} from "./ClueY";
import {ClueZ} from "./ClueZ";
import { Transition } from './Transition';

// Initialisation du DOMParser pour la partie 2 de l'indice Y.
var DomParser = require('react-native-html-parser').DOMParser

// Variables pour les énoncés des indices que l'on veut afficher lors de nos transitions
const ClueX_Text = "Trouver le nombre de 6 chiffres se positionnant après la première occurence de 036695 dans les décimales de PI. Convertir ce nombre de la base10 en base26.";
const ClueY_Text = "Y = https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/";
const ClueZ_Text = "Z = 'X'+'Y' Lille";

export function Solution({navigation}) {
  
  
  // Variables de state pour résoudre l'indice X
  let [Pi, setPi] = useState("");
  let [decimalPi, setDecimalPi] = useState(0);
  let [XRaw, setXRaw] = useState("");
  let [X, setX] = useState("");
  let [showDecimalPi, setShowDecimalPi] = useState(false);

  // Variables de state pour résoudre l'indice Y
  let [YUrl, setYUrl] = useState("");
  let [Y, setY] = useState("");
  let [YUrlRoot, setYUrlRoot] = useState("");
  let [QRCodeURL, setQRCodeURL] = useState("");

  // Variables de state pour résoudre l'indice Z
  let [cardsValues, setCardsValues] = useState([]);
  let [cardsValuesASCII, setCardsValuesASCII] = useState([]);
  
  // Variable de state pour signaler l'étape à laquelle on est dans l'animation (init. à 0)
  let [animationStep, setAnimationStep] = useState(0);

  /**
   * Résolution de l'indice X.
   * - On utilise l'api du site uploadbeta.com pour récupérer les 300000 premières
   *   décimales de PI.
   * - On recherche nos 6 chiffres dans la réponse
   * - On récupère les 6 chiffres après (notre réponse en base 10)
   * - On fait la conversion et on update nos states
   */
  const FetchPi = () => {
    fetch('https://uploadbeta.com/api/pi/?cached&n=300000')
    .then(x => x.text())
    .then((text) => {
        var i = text.search("036695")+6;
        setPi("3." + text.substring(3, 60) + "..." + text.substring(i-10000, i))
        var outputRaw = Number(text.substr(i, 6))
        var output = outputRaw.toString(26).toUpperCase(); // Convertion de la base 10 à 26

        // On update nos states pour les propager dans notre rendu (voir return)
        setDecimalPi(i);
        setXRaw(outputRaw);
        setX(output);
    }).catch((e) => console.error(e.message))
  }

  /**
   * Première partie de la solution pour l'indice Y.
   * - On sait que notre lien n'est pas légal car il contient des espaces
   * - On récupère la séquence de numéros que l'on veut convertir en caractère ASCII
   * - On traduit en ASCII les chars
   * - On set les variables de state pour propager nos résultats
   * */    
  const TranslateURL = () => {
    var url = "https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/"

    // Split
    var res = url.split("/")
    var final = res[3].split(" ")
    
    // Conversion
    var output = []
    final.forEach((e) => output.push(String.fromCharCode(e))); // conversion en ASCII
    
    // Set states
    setCardsValues(final);
    setYUrlRoot(url);
    setCardsValuesASCII(output)
    setYUrl(url.replace(res[3], output.join("")));

    // Pour l'étape suivante (on ne peut pas lire le QR Code car pasteboard ne nous permet 
    // pas de lire la raw data de l'image. Cependant, Imgur permet de faire cela)
    let QRCode = "https://eqrcode.co/a/RL7uJn";
    setQRCodeURL(QRCode)

    // On passe à la deuxième partie de la résolution : parser le HTML du lien 'QRCode'
    getClueY(QRCode);
  }

  // Deuxième partie de la résolution qui consiste à parser le HTML du lien 'QRCode'
  const getClueY = (url) => {
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      var root = new DomParser().parseFromString(html,'text/html');
      var elem = root.getElementsByClassName("item center")[0];
      
      // On retourne la réponse à l'indice Y
      setY(String(elem).split(/[><]/)[2]); // due to an error with the node module, we had to use Regex... 
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    });
  }

  /**
   * Fonction qui se lance à l'initialisation du composant(une seule fois).
   * - On récupère la solution de PI (X)
   * - On récupère la solution Y
   * - Affichage du nombre PI sur l'écran après 2s
   */
  useEffect(() => {
    FetchPi();
    TranslateURL();
    
    setTimeout(() => {
      setShowDecimalPi(true)
    }, 2000);
    
  }, []); // [] -> permet de ne lancer qu'au début useEffect. Sans cela, la fonction se lance à chaque frame.

  /**
   * Affichage du composant.
   * L'animation fonctionne étape par étape (animationStep).
   * - Transision est l'élément qui permet de faire des transition de texte au milieu de l'écran
   * - ClueX, ClueY, ClueZ permettent d'afficher les animations pour résoudre 
   */
  return (
    <View style={styles.container}>
      {animationStep == 0 && 
        <Transition 
          title={"Indice X"} 
          duration={1000} 
          fontSize={50} 
          delay={1000} 
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 1 &&
        <Transition
          title={ClueX_Text} 
          duration={1000}
          fontSize={20}
          delay={5000}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 2 && 
        <ClueX 
          X={X}
          XRaw={XRaw} 
          Pi={Pi}
          showDecimalPi={showDecimalPi}
          decimalPi={decimalPi}
          onFinish={() => {setAnimationStep(animationStep+1)}}
        />
      }
      {animationStep == 3 &&
        <Transition 
          title={"Indice Y"}
          duration={1000}
          fontSize={50}
          delay={1000}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 4 && 
        <Transition title={ClueY_Text}
          duration={1000} 
          fontSize={20} 
          delay={3000} 
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 5 && 
        <ClueY 
          Y={Y}
          QRCodeURL={QRCodeURL}
          translatedURL={YUrl}
          url={YUrlRoot}
          cardsValues={cardsValues}
          cardsValuesASCII={cardsValuesASCII}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 6 &&
        <Transition 
          title={"Indice Z"}
          duration={1000}
          fontSize={50}
          delay={1000}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 7 && 
        <Transition title={ClueZ_Text}
          duration={1000}
          fontSize={50}
          delay={3000}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 8 && 
        <Transition title={"=> Z = J3M2+M2 Lille.\nCeci correspond à un code Google Maps."}
          duration={1000}
          fontSize={20}
          delay={4000}
          onFinish={() => setAnimationStep(animationStep+1)}
        />
      }
      {animationStep == 9 && 
        <ClueZ onFinish={() => setTimeout(() => {
          navigation.goBack();
        }, 2000)}/>
      }
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height:50,
    width: 50,
    backgroundColor: "black",
    position: "absolute"
  },
  cardContainer: {
    flex: 1,
    height: 100,
    marginHorizontal: 2,
  },
  card: {
    flex: 1,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
});
