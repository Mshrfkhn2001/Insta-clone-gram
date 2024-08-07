
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const BATCH_SIZE = 10; 

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const followingUids = [...authUser.following, authUser.uid];
                const suggestedUsersMap = new Map();

                for (let i = 0; i < followingUids.length; i += BATCH_SIZE) {
                    const batch = followingUids.slice(i, i + BATCH_SIZE);
                    const q = query(
                        usersRef,
                        where("uid", "not-in", batch),
                        orderBy("uid"),
                        limit(10) 
                    );

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        suggestedUsersMap.set(doc.id, { ...doc.data(), id: doc.id });
                    });
                }

                const filteredSuggestedUsers = Array.from(suggestedUsersMap.values()).filter(
                    (user) => !followingUids.includes(user.uid) && user.uid !== authUser.uid
                );

                setSuggestedUsers(filteredSuggestedUsers);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getSuggestedUsers();
    }, [authUser, showToast]);

    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;

