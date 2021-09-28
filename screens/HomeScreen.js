import React,{Component} from 'react';
import { StyleSheet, Text, View,StatusBar,SafeAreaView,TouchableOpacity,Platform,ImageBackground,Image } from 'react-native';

export default class HomeScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.DroidSafeArea}
              />
              <ImageBackground source={require('../assets/bg.png')} style={styles.BackgroundImage}>
              <View style={styles.titleBar}>
              <Text style={styles.titleText}>ISS tracker App</Text>
              </View>
              <TouchableOpacity style={styles.routeCard} onPress={()=> this.props.navigation.navigate('IssLocation')} >
                  <Text style={styles.routeText}>Iss Location</Text>
                  <Text style={styles.Knowmore}>{"Knowmore -----> "}</Text>
                  <Text style={styles.bg_digit}>1</Text>
                  <Image source={require('../assets/iss_icon.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.routeCard} onPress={()=> this.props.navigation.navigate('meteor')} >
                  <Text style={styles.routeText}>Meteors</Text>
                  <Text style={styles.Knowmore}>{"Knowmore -----> "}</Text>
                  <Text style={styles.bg_digit}>2</Text>
                  <Image source={require('../assets/meteor_icon.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.routeCard} onPress={()=> this.props.navigation.navigate('update')} >
                  <Text style={styles.routeText}>Updates</Text>
                  <Text style={styles.Knowmore}>{"Knowmore -----> "}</Text>
                  <Text style={styles.bg_digit}>3</Text>
                  <Image source={require('../assets/rocket_icon.png')} style={styles.iconImage} />
                  </TouchableOpacity>

              </ImageBackground>
            </View>
          );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  DroidSafeArea: {
    MarginTop:Platform.OS==='android' ? statusbar.currentHeight : 0
  },
  titleBar: {
    flex:0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontSize:40,
    fontWeight : 'bold',
    color : 'red',

  },
  routeCard:{
    flex:0.25,
    marginLeft:50,
    marginRight:50,
    marginTop:50,
    backgroundColor:'white',
    borderRadius:30,
  },
  routeText:{
     fontSize:35,
     fontWeight: 'bold',
     color:'black',
     marginTop:75,
     paddingLeft:30,
  },
  Knowmore:{
    paddingLeft:30,
    color:'red',
    fontSize:15,
  },
  bg_digit:{
    position:'absolute',
    fontSize:150,
    color:'blue',
    right:20,
    bottom:-15,
    zIndex:-1,
  },
  BackgroundImage:{
    flex:1,
    resizeMode:'cover',
    
  },
  iconImage:{
    position : 'absolute',
    height:200,
    width:200,
    resizeMode:'contain',
    right:20,
    top:-80

  }

});
