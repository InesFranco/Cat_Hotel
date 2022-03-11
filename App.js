import Cat from './components/cat.js'
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {Component} from 'react'
import * as Font from "expo-font";
import { AppLoading } from "expo";


class Cafe extends Component {

  constructor() {
    super()
    this.state={
      loaded:false
    } 
  }


  // create a helper function to load the font 
  _loadFontsAsync = async () => {
        // loadAsync returns true | error
        await Font.loadAsync({
          // add as many fonts as you want here .... 
          PermanentMarker_Regular: require("./assets/fonts/PermanentMarker-Regular.ttf")
        });
        this.setState({loaded:true});
      };
    
      
  // call _loadFontsAsync 
  componentDidMount() {
    this._loadFontsAsync();
  }  

  render() {
    if(!this.state.loaded){
      return <Text>Loading</Text>
    }
    return (
      <ScrollView style={styles.container}>
        <Text  style={styles.titleText}>Welcome to the Cat Hotel</Text>
        <Cat name='Chubs the Second'/>
        <Cat name='Professor Snubbs'/>
        <Cat name='Professor Spoosh'/>
        <Cat name='Banana Split'/>
        <Cat name='Poofies Split'/>
        <Cat name='Beep'/>
        <Cat name='Kek'/>
        <Cat name='Shoo'/>
        <Cat name='bakjbakd'/>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flexDirection:'column',
    backgroundColor: '#C5D8A4',
    padding: 10
  }, 
  baseText: {
    color: 'white'
  },
  titleText: {
    fontSize: 30,
    justifyContent:'center',
    fontFamily: 'PermanentMarker_Regular',
    fontWeight: "bold"
  }
});

export default Cafe;
