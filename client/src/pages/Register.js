import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/users/register", value);
      message.success("Daftar berhasil");
      navigate("/login");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      message.error("Ada kesalahan");
      console.log(error);
    }
  };

  // currently login user
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>Halaman Daftar</h1>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                Sudah mendaftar?
                <Link to="/login"> Masuk disini!</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Daftar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
