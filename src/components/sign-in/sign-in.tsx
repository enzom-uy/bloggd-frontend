import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("email: ", email)
    console.log("password: ", password)
    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
    })
    if (error) {
      console.log("error: ", error)
    }
    window.location.href = "/signed-in"
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
