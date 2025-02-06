"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface ILoginData {
  username: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin: SubmitHandler<ILoginData> = (data) => {
    console.log("Dane logowania:", data);
    setLoading(true);
    redirect("/dashboard");
  };

  const navigateToRegister = () => {
    router.push("/register");
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
        <form onSubmit={handleSubmit(onLogin)}>
          <Form.Item
            validateStatus={errors.username ? "error" : ""}
            help={errors.username && "Podaj nazwę użytkownika!"}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="Nazwa użytkownika"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password && "Podaj hasło!"}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Hasło"
                />
              )}
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

export default Login;
