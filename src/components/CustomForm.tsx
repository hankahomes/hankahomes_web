import React, { useState } from 'react';
import { Button, ConfigProvider, Form, type FormProps, Modal, Input } from 'antd';

type FieldType = {
  email?: string;
  name?: string;
  message?: string;
  honeypot?: string;
};

const CustomForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log('Success:', values);
    setLoading(true);
    const msg = {
      email: values.email,
      name: values.name,
      message: values.message,
      honeypot: values.honeypot,
      subject: 'Hankahomes - 新邮件',
      replyTo: '@',
      accessKey: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY
    }
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if ((json as any).success) {
        form.resetFields();
        Modal.success({
          content: 'メールの送信が完了しました。',
          okText: 'OK',
        });
      } else {
        form.resetFields();
        Modal.warning({
          content: `an error occured: ${(json as any).message}`,
          okText: 'OK',
        });
      }
      setLoading(false);
    } catch (e) {
      console.log('An error occurred', e);
      setLoading(false);
      Modal.warning({
        content: `An error occured while submitting the form`,
        okText: 'OK',
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    Modal.warning({
      content: `an error occured: ${errorInfo}}`,
      okText: 'OK',
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#ddd",
          },
        },
      }}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 800, minWidth: "50vw" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'email!', type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="氏名"
          name="name"
          rules={[{ required: true, message: 'name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="test"
          name="honeypot"
          style={{ display: 'none' }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="メッセージ"
          rules={[{ required: true, message: 'message!' }]}
        >
          <Input.TextArea showCount={false} maxLength={1000} autoSize={{ minRows: 6 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }} style={{display: "flex", justifyContent: "center"}}>
          <Button htmlType="submit" loading={loading}>
            送信する
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default CustomForm;