import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onRegister = (data: {
    username: string;
    password: string;
    email: string;
  }) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Registered with: ", data);
      setLoading(false);
      router.push("/login"); // Redirect to login after successful registration
    }, 1500);
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
        <Title level={2}>Rejestracja</Title>
        <form onSubmit={handleSubmit(onRegister)}>
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
            validateStatus={errors.email ? "error" : ""}
            help={errors.email && "Podaj poprawny email!"}
          >
            <Input
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              prefix={<MailOutlined />}
              placeholder="Email"
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
              Zarejestruj się
            </Button>
          </Form.Item>
        </form>
        <Button type="link" onClick={() => router.push("/login")}>
          Masz już konto? Zaloguj się
        </Button>
      </Card>
    </div>
  );
};

export default Page;
