import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit called")
    e.preventDefault()
    console.log("preventDefault called")

    if (username !== "" && password !== "") {
      console.log("Making API call...")
      try {
        const { data, error } = await authClient.signUp.email({
          email: `${username}@backloggd.com`,
          password: password,
          name: username,
          username: username,
        })
      } catch (err) {
        console.error("Signup error:", err)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp
