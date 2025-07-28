import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../../../firebase.config"
import { useMessageContext } from "../../Provider/MessageProviders"
import { LOGOUT_REDIRECT_URL } from "../../constraints"

const useSignout = (shouldFlashMessage = true) => {
    const navigate = useNavigate()
    const { addMessage } = useMessageContext()
    const handleLogout = async () => {
        await firebaseAuth.signOut()
        if (shouldFlashMessage)
            addMessage({ message: "Logout successfull", type: "info" })
        navigate(LOGOUT_REDIRECT_URL)
    }
    return handleLogout
}
export default useSignout