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
      email,
      password,
      rememberMe: true,
    })
    console.log("data: ", data)
    console.log("error: ", error)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
