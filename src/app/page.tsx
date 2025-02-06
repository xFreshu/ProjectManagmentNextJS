"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface ILoginData {
  username: string;
  password: string;
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onLogin = (data: { username: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Logged in with: ", data);
      setLoading(false);
    }, 1500);
  };

  const navigateToRegister = () => {
    redirect("/register");
    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={2}>Logowanie</Title>
        <form onSubmit={handleSubmit(onLogin)} style={{ marginBottom: "1rem" }}>
          <Form.Item
            validateStatus={errors.username ? "error" : ""}
            help={errors.username && "Podaj nazwę użytkownika!"}
          >
            <Input
              {...register("username", { required: true })}
              prefix={<UserOutlined />}
              placeholder="Nazwa użytkownika"
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password && "Podaj hasło!"}
          >
            <Input.Password
              {...register("password", { required: true })}
              prefix={<LockOutlined />}
              placeholder="Hasło"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Zaloguj się
            </Button>
          </Form.Item>
        </form>
        <Button type="link" onClick={navigateToRegister}>
          Nie masz konta? Zarejestruj się
        </Button>
      </Card>
    </div>
  );
};

export default Page;
