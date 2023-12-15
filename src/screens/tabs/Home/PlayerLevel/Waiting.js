import { Image, ImageBackground, StyleSheet, Text, View, Animated, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import { images } from '../../../../constants/images'
import { selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
const Waiting = ({ navigation, route }) => {
  const { selectedItem, classic } = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [oppositePair, setOppositePair] = useState();


  useEffect(() => {
    const dummyUsersRef = database().ref('DummyUsers');
    dummyUsersRef.once('value')
      .then((snapshot) => {
        const dummyUsersData = snapshot.val();
        if (dummyUsersData) {
          // Compare current user's level and coins with dummy users
          const formattedCurrentUserCoins = currentUser?.coins.replace(',', ''); // Removes the comma

          const User = { level: currentUser?.level, coins: formattedCurrentUserCoins}; // Example current user data
          const selectedPair = findSelectedPair(User, dummyUsersData);
          if (selectedPair) {
            navigation.navigate('QuestionsScreen', { 
              pair: selectedPair,
              classic:classic
             });
          } else {
            console.log('No suitable pair found');
          }
        } else {
          console.log('No data found in DummyUsers');
        }
      })
      .catch((error) => {
        console.error('Error fetching DummyUsers data:', error);
      });
  }, [currentUser]);

  const findSelectedPair = (User, dummyUsersData) => {

    console.log("User",dummyUsersData)
    for (const userId in dummyUsersData) {
      const dummyUser = dummyUsersData[userId];
  
      // Ensure the properties exist before converting to strings
      const userLevel = User.level ? User.level.toString() : null;
      const userCoins = User.coins ? User.coins.toString() : null;
      const dummyUserLevel = dummyUser.level ? dummyUser.level.toString() : null;
      const dummyUserCoins = dummyUser.coins ? dummyUser.coins.toString() : null;
  
      // Compare levels and coins as strings
      if (userLevel && userCoins && dummyUserLevel && dummyUserCoins &&
          dummyUserLevel === userLevel && dummyUserCoins === userCoins) {
        return dummyUser;
      }
    }
    return null;
  };
  
  

  useEffect(() => {
    const currentUserId = auth().currentUser.uid;
    setCurrentUserId(currentUserId);
    const usersRef = database().ref(`/users/${currentUserId}`);
    const onDataChange = (snapshot) => {
      const userData = snapshot.val();
      setCurrentUser(userData);
    };
    usersRef.on('value', onDataChange);
    return () => {
      usersRef.off('value', onDataChange);
    };
  }, [currentUserId]);

  const fetchUserData = async (userId) => {
    try {
      const userSnapshot = await database().ref(`/users/${userId}`).once('value');
      if (userSnapshot.exists()) {
        return userSnapshot.val();
      } else {
        console.error('User data does not exist for ID:', userId);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  };


  useEffect(() => {
    const queueRef = database().ref('queue');
    const pairUsers = async () => {
      queueRef.once('value')
        .then(async (snapshot) => {
          const queue = snapshot.val();
          if (queue && Object.keys(queue).length >= 2) {
            const userKeys = Object.keys(queue);
            const user1Id = queue[userKeys[0]];
            const user2Id = queue[userKeys[1]];
            const user1 = await fetchUserData(user1Id);
            const user2 = await fetchUserData(user2Id);


            if (user1 && user2 && user1.level === user2.level && user1.coins === user2.coins) {
              queueRef.child(userKeys[0]).remove();
              queueRef.child(userKeys[1]).remove();
              fetchOtherUserDataAndNavigate(user1Id, user2Id);

            } else {
              ToastAndroid.show('Some data is mismatched !', ToastAndroid.SHORT)
            }



          }
        })
        .catch((error) => {
          console.error('Error fetching queue:', error.message);
        });
    };

    const handleChildAdded = (snapshot) => {
      if (classic != "Classic") {
        pairUsers();
      }

    };
    queueRef.on('child_added', handleChildAdded);

    const cUser = auth().currentUser;
    if (cUser) {
      const currentUserId = cUser.uid;
      queueRef.push(currentUserId); // Add the current user to the queue
    }

    return () => {
      queueRef.off('child_added', handleChildAdded);
    };
  }, []);
  const fetchOtherUserDataAndNavigate = (user1Id, user2Id) => {
    const targetUserId = auth().currentUser.uid === user1Id ? user2Id : user1Id;

    const usersRef = database().ref(`/users/${targetUserId}`);

    usersRef.once('value')
      .then((snapshot) => {
        const otherUserData = snapshot.val();
        navigation.navigate('QuestionsScreen', { pair: otherUserData });

      })
      .catch((error) => {
        console.error('Error fetching other user data:', error.message);
      });
  };


  useEffect(() => {
    handleUpdateData();
  }, [navigation])



  const handleUpdateData = () => {
    const userID = auth().currentUser.uid;
    const updatedData = {
      completedQuestion: false,
      noti: false,
      correctCount: 0

    };
    const userRef = database().ref(`/users/${userID}`);
    userRef.update(updatedData)
      .then(() => {
        console.log("data update successfuly!!")
      })
      .catch((error) => {
        console.error('Error updating item:', error.message);
      });
  };




  return (
    <ImageBackground source={images.waitngbg} style={selectcoinToplay.container}>
      <BackButton title={"Waiting"} onPress={() => navigation.goBack()} />
      <Animated.View style={selectcoinToplay.subContainer}>
        <View style={selectcoinToplay.subContainer2}>
          <View style={[selectcoinToplay.buttonsContainer, { justifyContent: 'center', paddingTop: 0 }]} >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={selectcoinToplay.playercotainer}>
                <View style={selectcoinToplay.userView}>
                  <Image source={currentUser?.picture ? { uri: currentUser?.picture } : images.player1} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                </View>
                <Text style={selectcoinToplay.userNameTxt}>{currentUser?.username}</Text>
              </View>
              <Text style={[selectcoinToplay.vsTxt, { color: colorsFonts.Primarycolor }]}>VS</Text>
              <View style={selectcoinToplay.playercotainer}>
                <View style={selectcoinToplay.userView}>
                  <Image source={oppositePair?.picture ? { uri: oppositePair?.picture } : images.oponent} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                </View>
                {/* <Text style={selectcoinToplay.userNameTxt}>{otherUsers[0]?.username}</Text> */}
                <Text style={selectcoinToplay.userNameTxt}>{oppositePair?.username}</Text>

              </View>
            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginTop: 20,
              justifyContent: 'center'
            }}>
              <Image source={images.coin} style={{ height: 40, width: 40, resizeMode: 'contain', top: heightPercentageToDP(2.5) }} />
              <Text style={[selectcoinToplay.userNameTxt, { color: colorsFonts.goldencolor, fontSize: 40, marginLeft: 6 }]}>{selectedItem}</Text>
            </View>



          </View>

        </View>
        {/* <View style={selectcoinToplay.logoView}>
          <Button title={"Continue"}
            linear={true}
            onPress={() => handleStartGame()}
          />
        </View> */}

      </Animated.View>

    </ImageBackground>
  )
}

export default Waiting

const styles = StyleSheet.create({})