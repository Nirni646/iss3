import axios from 'axios';
import React,{Component} from 'react';
import { StyleSheet, Text, View,FlatList,Platform,SafeAreaView,Image,Alert, ImageBackground } from 'react-native';


export default class MeteorScreen extends Component{
  constructor(){
    super();
    this.state = {
      meteors : {}
    }
  }
  componentDidMount(){
    this.getMeteors();
   
  }
  getMeteors=()=>{
    axios
    .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=git3FHqXdrX42ayBPZSOwkmiAc0bxRnKJKUAOuc9')
    .then(response=>{
      this.setState({
        meteors : response.data.near_earth_objects
      })

    })
    .catch(error=>{
      Alert.alert(error.message);
    })

  }
  
  renderItem=({item})=>{
    let meteors=item;
    let bg_img,speed,size;
    if(meteors.threat_score<=30){
        bg_img=require('../assets/meteor_bg1.png')
        speed=require('../assets/meteor_speed1.gif')
        size=100;
    }
    else if(meteors.threat_score<=75 && meteors.threat_score>30){
      bg_img=require('../assets/meteor_bg2.png')
      speed=require('../assets/meteor_speed2.gif')
      size=150;
  }
    else{
      bg_img=require('../assets/meteor_bg3.png')
      speed=require('../assets/meteor_speed3.gif')
      size=200;
  }
  return(
    <View>
      <ImageBackground source={bg_img} style={styles.backgroundImage}  >
          <View style={styles.gifContainer}>
             <Image source={speed} style={{width:size,height:size,alignSelf:'center'}} />
             <View>
               <Text style={[styles.cardTitle,{marginTop:400,marginLeft:20}]}>
                 {item.name}
               </Text>
               <Text style={[styles.cardText,{marginTop:20,marginLeft:50}]}>
                 closes to Earth - {item.close_approach_data[0].close_approach_data_full}
               </Text>
               <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                 Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}
               </Text>
               <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                 Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}
                 </Text>
               <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                 Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                 </Text>
               <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                 Missing Earth by (KM) - {item.close_approach_data[0].miss_distance.kilometers}
                 </Text>
             </View>
          </View>
      </ImageBackground>
    </View>
  )
  }
  keyExtractor=(item,index)=>index.toString()
  
    render(){
      if (Object.keys(this.state.meteors).length===0){
         return(
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Text>Loading...</Text>
           </View>
         )
      }else{
        let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
          return this.state.meteors[meteor_date]
        })
        let meteors=[].concat.apply([],meteor_arr)
        meteors.forEach(function(element){
          let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
          let threatScore=(diameter/element.close_approach_data[0].miss_distance.kilometers)*(10**10)
          element.threat_score=threatScore
        });
        meteors.sort(function(a,b){
          return b.threat_score-a.threat_score
        })
        meteors=meteors.slice(0,5)

        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.DroidSafeArea}/>
              <FlatList 
              keyExtractor={this.keyExtractor}
              data={meteors}
              renderItem={this.renderItem}
              horizontal={true}
              />
              <Text>MeteorScreen</Text>
            </View>
          );
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DroidSafeArea: {
    MarginTop:Platform.OS==='android' ? statusbar.currentHeight : 0
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'yellow',
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover',
  },
  gifContainer: 
  { justifyContent: "center", alignItems: "center", flex: 1 },
  cardText:
  { color: "white" },
  cardTitle: 
  { fontSize: 20, marginBottom: 10, fontWeight: "bold", color: "white" },
});
