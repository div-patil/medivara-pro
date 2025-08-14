import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/api/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser(form)
      alert("Registered successfully!")
      console.log(res.data)
      navigate("/login")
    } catch (err) {
      console.error(err)
      alert("Registration failed")
    }
  }

  return (
    <div className="flex justify-center mb-20 dark:custom-background-special mt-40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Register to <span className="text text-xl">Medivara</span></CardDescription>
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </CardHeader>

        {/* ✅ Fix: onSubmit and move the button inside the form */}
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">User Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Divya Patil"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" variant="custom" className="w-full">
              Register
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
