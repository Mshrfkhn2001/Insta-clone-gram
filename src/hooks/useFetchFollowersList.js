
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const useFetchFollowersList = () => {
    const { userProfile } = useUserProfileStore();
    const [isLoading, setIsLoading] = useState(true);
    const [followersList, setFollowersList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowersList = async () => {
            if (!userProfile || !Array.isArray(userProfile.followers) || userProfile.followers.length === 0) {
                setIsLoading(false);
                setFollowersList([]);
                return;
            }

            const followerIds = userProfile.followers.filter(follower => typeof follower === 'string');

            if (followerIds.length === 0) {
                setIsLoading(false);
                setFollowersList([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const q = query(collection(firestore, "users"), where("uid", "in", followerIds));
                const querySnapshot = await getDocs(q);
                const followers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFollowersList(followers);
            } catch (error) {
                console.error('Error fetching followers:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowersList();
    }, [userProfile]);

    return { isLoading, followersList, error };
};

export default useFetchFollowersList;
