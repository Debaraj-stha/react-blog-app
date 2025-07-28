
import AuthorProvider from '../Provider/AuthorProvider'
import Author from '../pages/Author'

const AuthorWithProvider = () => {
    return (
        <AuthorProvider>
            <Author />
        </AuthorProvider>
    )
}

export default AuthorWithProvider
