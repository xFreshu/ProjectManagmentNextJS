"use client";

import { Layout, Menu, Typography, Button, Card, Row, Col } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const projectData = [
  {
    name: "Projekt 1",
    deadline: "2025-03-01",
    openTasks: 5,
    slug: "project-1",
  },
  {
    name: "Projekt 2",
    deadline: "2025-04-15",
    openTasks: 3,
    slug: "project-2",
  },
  {
    name: "Projekt 3",
    deadline: "2025-05-30",
    openTasks: 8,
    slug: "project-3",
  },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState("dashboard");
  const router = useRouter();

  const renderContent = () => {
    switch (selectedContent) {
      case "dashboard":
        return <p>To jest główny Dashboard z raportami.</p>;
      case "projects":
        return (
          <div>
            <h2>Lista projektów</h2>
            <Row gutter={[16, 16]}>
              {projectData.map((project, index) => (
                <Col span={8} key={index}>
                  <Card
                    title={project.name}
                    bordered={false}
                    hoverable
                    onClick={() => router.push(`/projects/${project.slug}`)}
                  >
                    <p>
                      <strong>Deadline:</strong> {project.deadline}
                    </p>
                    <p>
                      <strong>Ilość otwartych zadań:</strong>{" "}
                      {project.openTasks}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      case "employees":
        return <p>Lista pracowników wyświetlana tutaj.</p>;
      case "tasks":
        return <p>Lista zadań wyświetlana tutaj.</p>;
      case "new-task":
        return <p>Formularz do tworzenia nowego zadania wyświetlany tutaj.</p>;
      default:
        return <p>Wybierz opcję z menu.</p>;
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => setSelectedContent("dashboard"),
    },
    {
      key: "employees",
      icon: <TeamOutlined />,
      label: "Lista pracowników",
      onClick: () => setSelectedContent("employees"),
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projekty",
      onClick: () => setSelectedContent("projects"),
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
          defaultSelectedKeys={["dashboard"]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#001529",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Jira-Like Dashboard
          </Title>
          <Button type="primary" danger onClick={() => router.push("/")}>
            Wyloguj
          </Button>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
