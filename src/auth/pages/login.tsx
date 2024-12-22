import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import { loginSchema } from "@/api/auth/schema/login";

type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    loginUser(data.email, data.password);
  };

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export { LoginForm };
