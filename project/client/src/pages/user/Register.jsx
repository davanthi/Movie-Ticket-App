import React from "react";
import { Form, Input, Button, Radio, message } from "antd";
import "./Auth.css";
import { registerUser } from "../../Calls/authCalls.js";

function Register() {
  const onSubmit = async (values) => {
    try {
      const userData = await registerUser(values);
      if (userData.success) {
        message.success(userData.message);
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
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Name is required!" }]}
        >
          <Input
            size="large"
            placeholder="Enter your full name"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            size="large"
            type="email"
            placeholder="Enter your email"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Create a password"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item
          label="Register As"
          name="role"
          initialValue="user"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Radio.Group size="large" className="role-selector">
            <Radio.Button value="user">User</Radio.Button>
            <Radio.Button value="partner">Partner</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            className="auth-button"
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
