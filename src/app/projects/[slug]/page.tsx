"use client";

import "@ant-design/v5-patch-for-react-19";
import { Layout, Menu, Typography, Button, Form, Input } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const ProjectSlug = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState("overview");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState<{ name: string; description: string }[]>(
    []
  );

  const handleAddTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      setTasks([...tasks, { name: taskName, description: taskDescription }]);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "overview":
        return <p>To jest przegląd projektu: {slug}.</p>;
      case "tasks":
        return (
          <div>
            <h3>Lista zadań dla projektu: {slug}</h3>
            <Form layout="vertical" style={{ marginBottom: "16px" }}>
              <Form.Item label="Nazwa zadania">
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Opis zadania">
                <Input.TextArea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={handleAddTask}
                icon={<PlusCircleOutlined />}
              >
                Dodaj zadanie
              </Button>
            </Form>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.name}:</strong> {task.description}
                </li>
              ))}
            </ul>
          </div>
        );
      case "team":
        return <p>Zespół pracujący nad projektem: {slug}.</p>;
      default:
        return <p>Wybierz opcję z menu.</p>;
    }
  };

  const menuItems = [
    {
      key: "overview",
      icon: <DashboardOutlined />,
      label: "Przegląd",
      onClick: () => setSelectedContent("overview"),
    },
    {
      key: "tasks",
      icon: <FileTextOutlined />,
      label: "Zadania",
      onClick: () => setSelectedContent("tasks"),
    },
    {
      key: "team",
      icon: <TeamOutlined />,
      label: "Zespół",
      onClick: () => setSelectedContent("team"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => setSelectedContent(key)}
          defaultSelectedKeys={["overview"]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#001529",
            color: "white",
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Szczegóły projektu: {slug}
          </Title>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <Button
            type="primary"
            onClick={() => router.push("/dashboard")}
            style={{ marginBottom: "16px" }}
          >
            Powrót do Dashboardu
          </Button>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProjectSlug;
