
import React, { useState } from 'react';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (searchValue, searchBy = 'username') => {
    setIsLoading(true);
    setUser(null);

    try {
      const q = query(collection(firestore, "users"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return showToast("Error", "User not found", "error");
      }

      let foundUser = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (searchBy === 'fullname') {
          if (data.fullname.toLowerCase() === searchValue.toLowerCase()) {
            foundUser = data;
          }
        } else {
          if (data.username.toLowerCase() === searchValue.toLowerCase()) {
            foundUser = data;
          }
        }
      });

      if (foundUser) {
        setUser(foundUser);
      } else {
        showToast("Error", "User not found", "error");
      }

    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
}

export default useSearchUser;
