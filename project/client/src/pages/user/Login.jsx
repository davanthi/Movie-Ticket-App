import React from "react";
import { Button, Form, Input, Card, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../Calls/authCalls.js";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const userData = await loginUser(values);
      if (userData.success) {
        message.success(userData.message);
        navigate("/home");
      } else {
        message.error(userData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onSubmit} className="auth-form">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            size="large"
            className="auth-button"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-footer">
        <Text>
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign up now
          </Link>
        </Text>
      </div>
    </div>
  );
}
export default Login;
