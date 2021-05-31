import * as React from 'react';
import {TouchableOpacity,Entypo} from 'react-native';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

const NearByPeople = ({ navigation, route }) => {

  let latlon=getLatLon();

  const [ready, setReady] = React.useState(false);
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    (async () => {
     // const image = Asset.fromModule(require('../../assets/icon.png'));
     const image = Asset.fromURI('https://inst.eecs.berkeley.edu/~cs194-26/fa18/upload/files/proj4/cs194-26-aat/data/alvin.jpg');
      
     //const image = () => <Image source={data} />
     await image.downloadAsync();
     if(image!=null){console.log(navigation);}
     

      setImage(image);
      setReady(true);
    })();
  }, []);



	const _renderImage = () => {
    return (
      <View
        style={{
          marginVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{ uri: image.localUri || image.uri }}
          style={ styles.markerImage}
        />
      </View>
    );
  };
  const _returnProfile=()=>{

  navigation.navigate('Profile')
  }

	return (
		<>
		<View style={styles.container}>
      <MapView 
          
              initialRegion={{
              latitude: latlon.lattitude,
              longitude: latlon.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              
            }}
    style={styles.map} >
      
{      
              <Marker onPress={() => _returnProfile()}   coordinate={{ latitude : latlon.lattitude , longitude : latlon.longitude }}>
            
                <View style={styles.marker}>
                <View  style={{ flex: 1, justifyContent: 'center',borderRadius:Dimensions.get('window').width/100}}>
                  {ready && image && _renderImage()}
                
                </View>                
                </View>      
              </Marker> }

    </MapView>
    </View>
	
		</>
	);
};


export default NearByPeople;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    width: Dimensions.get('window').width/10,
    height: Dimensions.get('window').width/10,
    backgroundColor:"black",
    borderRadius:Dimensions.get('window').width/100,
    
  },
  markerImage: {
    width: Dimensions.get('window').width/11,
    height: Dimensions.get('window').width/11,
    backgroundColor:"black",
    borderRadius:Dimensions.get('window').width/100,
    
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  
});

function getLatLon() {
 // get names from the database or API
 let lattitude = 37.78825,
 longitude = -122.4324;
   // return as an object
   return {lattitude, longitude};
}
// function Avatar(props) {
//   return (
//     <img className="Avatar"
//       src={props.user.avatarUrl}
//       alt={props.user.name}
//     />
//   );
// }

var data = {
  profileImage: "http://www.gravatar.com/avatar/d735414fa8687e8874783702f6c96fa6?s=90&d=identicon&r=PG",
 
}
