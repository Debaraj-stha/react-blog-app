import { useCallback, useEffect } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../../Provider/AuthorProvider";

const useLoginAndSubscribe = (author_id?:string|undefined,hasSubscribed=false,isSubscribedToAll=true) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        handleSubscribeUnsubscribe,
        setHasSubscribed,
        fetchSubscriptionStatus,
    } = useAuthor();
    console.log(author_id,hasSubscribed,isSubscribedToAll)

    const handleSubscribe = useCallback(async () => {
        if (!user) {
            const conf = confirm("You have not logged in yet. To subscribe you need to login first. Login now?");
            if (conf) {
                localStorage.setItem("subscribeAfterLogin", "true");
                navigate("/login");
            }
        } else if (user.user_id) {
            try {
                await handleSubscribeUnsubscribe(user.user_id, hasSubscribed, isSubscribedToAll, author_id);
                setHasSubscribed(prev => !prev);
            } catch (err) {
                console.error("Subscription toggle failed", err);
            }
        }
    }, [user, navigate, handleSubscribeUnsubscribe, setHasSubscribed]);

    // Auto-subscribe after login
    useEffect(() => {
        const shouldSubscribe = localStorage.getItem("subscribeAfterLogin");
        if (user && shouldSubscribe === "true") {
            handleSubscribe();
            localStorage.removeItem("subscribeAfterLogin");
            fetchSubscriptionStatus();
        }
    }, [user, handleSubscribe, fetchSubscriptionStatus]);

    return handleSubscribe; // return the callback for use in component
};

export default useLoginAndSubscribe;
