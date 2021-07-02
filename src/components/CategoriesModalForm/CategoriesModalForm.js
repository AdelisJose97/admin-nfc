import React, { useEffect, useState } from 'react'

import { Col, Form, Input, Button, Modal, Row, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import './index.css';

const baseUrl = process.env.REACT_APP_FILES_URL


const CategoriesModalForm = ({ visible, confirmLoading, handleCancel, form, handleOk }) => {

  const [imageUrl, setImageUrl] = useState([])
  const [loadingUpload, setloadingUpload] = useState(false)
  const [fileList, setfileList] = useState([])

  useEffect(() => {
    if (form && visible) {
      const image = form.getFieldValue('icon') ? [
        {
          uid: '-1',
          name: 'image.svg',
          status: 'done',
          url: `${baseUrl}/${form.getFieldValue('icon').substring(7)}`
        }
      ] : []
      setfileList(image)

    }

  }, [form, visible])

  const normalize = (e) => {
    console.log(e);
    return e[0] && e[0].originFileObj
  }
  const normFile = (e) => {
    console.log('aqui');
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onPreview = (file) => {
    console.log(file);
  }
  const onRemove = (file) => {
    setImageUrl([])
    console.log(file);
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  function beforeUpload(file) {
    /* console.log(file) */
  }
  const handleChange = ({ file, fileList }) => {
    setfileList(fileList)
    if (file.status === 'uploading') {
      setloadingUpload(true)
      return;
    }
    if (file.status === 'done') {
      // Get this url from response in real world.
      getBase64(file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setloadingUpload(false)
      }
      );
    }
  };

  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      onOk={() => form.submit()}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOk}
        initialValues={{
          serviceId: "",
          _id: "",
          name: "",
          icon: ""
        }}
      >
        <Form.Item name="serviceId" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Row >
          <Col span={10}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: 'Campo requerido!' }]}
            >
              <Input placeholder="Ingrese nombre" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Icono"
              name="icon"
              valuePropName="icon"
              /* getValueProps={getValueProps} */
              getValueFromEvent={normFile}
              normalize={normalize}
            >
              <Upload
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                /* showUploadList={false} */
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={onPreview}
                onRemove={onRemove}
              >
                {fileList.length === 0 && uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CategoriesModalForm