import React, {useEffect,useState,useRef,} from 'react';
import { View, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const ClueZ = (props) => {
  let [showMarker, setShowMarker] = useState(false); // pour le marqueur sur le palais rameau
  let [showMarkerInfo, setShowMarkerInfo] = useState(false); // les infos du palais rameau ( plus code)

  const mapRef = useRef(null); 
  const markerRef = useRef(null);

    /* 
    * Fonction qui s'exécute une seule fois après le chargement de l'élément ClueZ 
    */
    useEffect(() => {
        setTimeout(() => { //délai de 9 secondes
            props.onFinish();
        }, 9000);     
    },[]);

    /*
    * Animation du zoom sur le palais rameau
    */
    const zoom = () => {
        var value = mapRef.current;
        setTimeout(() => {
            value.animateToRegion({ // coordonnées du palais rameau car pas accès via API google maps
                latitude: 50.634167,
                longitude: 3.050105,
                latitudeDelta: 0.002,
                longitudeDelta: 0.0000
            }, 3000)
            setTimeout(() => {
                setShowMarkerInfo(true); // on affiche automatiquent les infos du marqueur
            }, 4000);
        }, 2000);
    }

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{ flex: 1, width:"100%", height:"100%" }}
        mapType = "hybrid"
        initialRegion={{
        latitude: 50.634167,
        longitude: 3.050105,
        latitudeDelta: 0.0,
        longitudeDelta: 60.0}}
        onMapReady={() => {
            zoom();
            setShowMarker(true);
        }}
    >
        { showMarker &&
            <MapView.Marker
                ref={markerRef}
                coordinate={{latitude: 50.634167,
                longitude:  3.050105}}
                title={"Solution: Palais Rameau"}
                description={"Plus code : J3M2+M2"}
                pinColor ="purple"
            >
                {showMarkerInfo &&
                    <View style={{padding:10, borderRadius:10, backgroundColor:"#FFFA"}}>
                        <Text>Solution: Palais Rameau</Text>
                        <Text>Plus code : J3M2+M2</Text>
                    </View>
                }
            </MapView.Marker>
        }
    </MapView>
    );
  }