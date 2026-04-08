import React from "react";
import { Button, Form, Input, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Auth.css";

const { Title, Text } = Typography;

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };
function Login() {
  return (
    <div>
      <Form>
        <Form layout="vertical" className="auth-form">
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
      </Form>
    </div>
  );
}
export default Login;
