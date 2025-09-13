import { authClient } from "@/lib/auth-client"

export const SignOut = () => {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/"
        },
      },
    })
  }
  return (
    <>
      <button className="sign-out-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  )
}
