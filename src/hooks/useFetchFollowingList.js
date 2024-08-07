import { useState, useEffect } from "react";

import useShowToast from "./useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from '../store/userProfileStore';

const useFetchFollowingList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [followingList, setFollowingList] = useState([]);
    const { userProfile } = useUserProfileStore();
    const showToast = useShowToast();

    useEffect(() => {
        const fetchFollowingList = async () => {
            setIsLoading(true);
            if (!userProfile || !Array.isArray(userProfile.following) || userProfile.following.length === 0) {
                setIsLoading(false);
                setFollowingList([]);
                return;
            }
            try {
                const followingUids = userProfile?.following || [];
                const usersRef = collection(firestore, "users");

                const q = query(usersRef, where("uid", "in", followingUids));
                const querySnapshot = await getDocs(q);

                const followingUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                setFollowingList(followingUsers);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (userProfile) fetchFollowingList();
    }, [userProfile, showToast]);

    return { isLoading, followingList };
};

export default useFetchFollowingList;


