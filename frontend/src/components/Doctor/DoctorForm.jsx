import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AppAlert from "../../pages/reusable/AppAlert.jsx";

const AddDoctor = () => {
  const initialForm = {
    name: "",
    specialization: "",
    email: "",
    phone: "",
    fee: 0,
    location: "",
    experience: 0,
    availableDays: [],
    availableTime: "",
    bio: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [profilePic, setProfilePic] = useState(null);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    visible: false,
  });

  const fileInputRef = useRef(null);
  const checkboxRefs = useRef({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDaysChange = (day, checked) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, day]
        : prev.availableDays.filter((d) => d !== day),
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setProfilePic(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Reset checkboxes
    Object.values(checkboxRefs.current).forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === "availableDays") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setAlert({
          type: "error",
          message: "Please login first",
          visible: true,
        });
        return;
      }

      // await axios.post("http://localhost:5000/api/doctors/add", data, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/add`, data, {
  headers: { Authorization: `Bearer ${token}` },
});

      setAlert({
        type: "success",
        message: "Doctor added successfully!",
        visible: true,
      });

      resetForm();
    } catch (err) {
      setAlert({
        type: "error",
        message: "Error adding doctor",
        visible: true,
      });
    }
  };

  return (
    <>
      {alert.visible && (
        <AppAlert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      )}

      <Card className="max-w-2xl mx-auto mt-10 p-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-[#00B5C9]">
              Add Doctor
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Specialization</Label>
                <Input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Appointment Fee (in Rs)</Label>
                <Input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Experience (in years)</Label>
                <Input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Available Time</Label>
              <Input
                type="text"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Available Days</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day) => (
                    <div key={day} className="flex items-center gap-2">
                      <Checkbox
                        id={day}
                        ref={(el) => (checkboxRefs.current[day] = el)}
                        onCheckedChange={(checked) =>
                          handleDaysChange(day, checked)
                        }
                      />
                      <Label htmlFor={day}>{day}</Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <Label>Profile Picture</Label>
              <Input
                type="file"
                name="profilePic"
                ref={fileInputRef}
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" variant="custom" className="w-full">
              Add Doctor
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default AddDoctor;
