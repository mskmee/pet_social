import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../helpers/storage';
import {Buffer} from 'buffer';

const Network = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await storage.get('token');
        const parts = token.split('.').map(part => {
          return Buffer.from(
            part.replace(/-/g, '+').replace(/_/g, '/'),
            'base64',
          );
        });
        const {userId: tokenUserId} = JSON.parse(parts[1]);

        setUserId(tokenUserId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <View>
      <Text>Network</Text>
    </View>
  );
};

export default Network;
