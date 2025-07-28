import useSignout from '../helper/hooks/useSignout'
const LogoutButton = () => {
  return (
    <button className=' bg-red-500 hover:bg-red-600 px-2 py-2' onClick={useSignout()}>
      Logout
    </button>
  )
}

export default LogoutButton
