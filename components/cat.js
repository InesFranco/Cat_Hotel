import React, {useState, useEffect, useRef, Component} from 'react';
import {Text, StyleSheet, View, TextStyle, Pressable, Animated, Easing} from 'react-native';
import {Audio} from 'expo-av';


const MAX_HUNGER = 100;
class Cat extends Component {
  constructor(props){
      super(props);
      this.state = {
        hunger:MAX_HUNGER,
        intervalId : 0,
        isHungry:true,
        interval: 0,
        catAnim: new Animated.Value(0)
      }
  }

  async componentDidMount() {
    this.sound = new Audio.Sound();
    const status = {
      shouldPlay: false
    }
    this.sound.loadAsync(require('../assets/sounds/catyes.wav'), status, false);
    setInterval(()=>{
      this.decrementHunger()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  
  handleAnimation() {
    Animated.timing(this.state.catAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver:true,
        easing: Easing.circle
    }).start(()=>{
      Animated.timing(this.state.catAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver:true,
        easing: Easing.circle
      }).start();
    });
  }

  async playSound() {
    this.sound.replayAsync(0);
  }
  
  handlePress() {
      if(this.state.isHungry){
        this.handleAnimation();
        this.playSound();
        this.setState({isHungry:false});
        this.setState({hunger:MAX_HUNGER});
      }
  }
  

  decrementHunger(){
    this.setState({hunger : this.state.hunger - 1});  
    if(this.state.hunger <= MAX_HUNGER/3) {
      this.setState({isHungry: true});
    } 
  }

  render(){
      return(
          <View style={styles.container}>
              <Text style={styles.baseText}>Current Hunger:{this.state.hunger}</Text>
              <Text style= {styles.baseText}>{this.state.isHungry ? 'Give me a cookie' : 'Give me Space'}</Text>
              <Pressable style={styles.button}  
                onPress={() => {
                  this.handlePress();  
                }}>
              </Pressable>
              <Animated.View style={{flexDirection:'column'}}>
                <Animated.Image
                  style={{
                      flex:1,
                      transform: [
                        {
                          translateY: this.state.catAnim.interpolate(
                            {
                              inputRange: [0, 1],
                              outputRange: [0, 10]
                            })
                        }
                      ]
                    }
                  }
                  source={require('../assets/sprites/neko.png')}
                >
                </Animated.Image>
              
              <Text style={styles.baseText}>I am {this.props.name} !</Text>
              <Text style= {styles.baseText}>I am {this.state.isHungry ? ' Hungry' : 'Full'}</Text>
            </Animated.View>
            </View>
        );
  }
}

  const styles = StyleSheet.create({
    container:{
      alignItems:'stretch',
      marginTop:10,
      justifyContent:'center',
      flexDirection:'row'
    },
    baseText: {
      justifyContent:'center',
      margin:5,
      flexWrap: "wrap",
      fontFamily: 'PermanentMarker_Regular',
      color: '#534340'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    }
  });
  

  export default Cat;