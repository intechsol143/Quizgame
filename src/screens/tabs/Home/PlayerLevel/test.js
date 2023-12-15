useEffect(() => {
    const dummyUsersRef = database().ref('DummyUsers');
    dummyUsersRef.once('value').then(async (snapshot) => {
      const userData = snapshot.val();
      setDummyUsers(userData);

    }).catch((error) => {
      console.log("Error", error)
    })


  }, [dummyUsers]);


const dumypairUsers = async () => {
    const queueRef = database().ref('queue');
    const classicGameOptionSelected = true; // Placeholder for detecting classic game selection
    queueRef.once('value')
      .then(async (snapshot) => {
        const queue = snapshot.val();
        if (queue && Object.keys(queue).length >= 1) {
          const userKey = Object.keys(queue)[0];
          const user1Id = queue[userKey];

          // Fetch user data for user1 (current user)
          const user1 = await fetchUserData(user1Id);

          if (user1) {
            queueRef.child(userKey).remove();

            // Create a reference for the current user and a dummy user
            if (classicGameOptionSelected == true) {

              if (dummyUsers) {
                dummyUsers.forEach((item) => {
                  console.log("Dummy User Level:", item.level, "Dummy User Coins:", item.coins);
                });
                // const suitableDummyUsers = dummyUsers?.filter(
                //   (dummyUser) => dummyUser?.level === user1.level && dummyUser?.coins === user1.coins
                // );

                const result = dummyUsers.filter((item) => {
                  // Assuming level or coins might be numbers
                  const parsedItemLevel = item.level.toString(); // Convert to string if it's a number
                  const parsedUser1Level = user1.level.toString(); // Convert to string if it's a number
                  const parsedItemCoins = item.coins.toString(); // Convert to string if it's a number
                  const parsedUser1Coins = user1.coins.toString(); // Convert to string if it's a number
                
                  return parsedItemLevel === parsedUser1Level && parsedItemCoins === parsedUser1Coins;
                });
                console.log("check result",result)
                //   Alert.alert(result)

                // if (suitableDummyUsers.length > 0) {
                //   const randomIndex = Math.floor(Math.random() * suitableDummyUsers.length);

                //   const dummyUser = suitableDummyUsers[randomIndex];

                //   if (dummyUser && dummyUser.userId) {
                //     const user2Id = dummyUser.userId;

                //     // Logic to create references for the current user and dummy user
                //     const gameRef = database().ref('games');
                //     const newGameRef = gameRef.push();
                //     newGameRef.set({
                //       player1: user1Id,
                //       player2: user2Id,
                //       // Other game data initialization
                //     });

                //     // Navigate to the Question screen with paired users
                //     fetchDumyUserDataAndNavigate(user1Id, user2Id);
                //   } else {
                //     console.error('Dummy user data is incomplete:', dummyUser);
                //   }
                // } else {
                //   console.error('No suitable dummy users found for pairing');
                // }
              } else {
                console.error('No dummy users available');
              }
            } else {
              // Logic to handle non-classic game pairing
            }
          } else {
            ToastAndroid.show('User data not found!', ToastAndroid.SHORT);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching queue:', error.message);
      });
  };