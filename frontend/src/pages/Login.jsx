import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/api/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AppAlert from "./reusable/AppAlert";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
 const [alert, setAlert] = useState({ visible: false, type: "", message: "" });// { type: "success" | "error", message: string }
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

     setAlert({
    visible: true,
    type: "success",
    message: `Welcome back, ${res.data.user.name || "User"} 👋`,
  });
      setTimeout(() => navigate("/"), 3000); // navigate after alert disappears
    } catch (err) {
      console.error(err);
     setAlert({
    visible: true,
    type: "error",
    message: "Invalid email or password. Please try again.",
  });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen mt-30 items-center  pt-6">
      {/* ✅ Alert at Top */}
      <AppAlert
        type={alert.type}
        message={alert.message}
        visible={alert.visible}
        onClose={() => setAlert({ ...alert, visible: false })}
      />

      {/* ✅ Login Card */}
      <Card className="w-full mt-40 max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>Login to <span className="text text-xl">Medivara</span></CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
          <Button variant="link" onClick={handleRegister}>
            Don't have an account? Sign Up
          </Button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" variant="custom" className="w-full bg-[#00B5C9] mb-10">
              Login
            </Button>
            {/* <Button type="button" variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
