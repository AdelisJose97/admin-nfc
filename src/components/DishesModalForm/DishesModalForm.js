import React, { useState } from 'react'
import { Col, Form, Input, Modal, Row, Upload } from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const DishesModalForm = ({ visible, handleCancel, form, handleOk, confirmLoading }) => {
  const [imageUrl, setImageUrl] = useState([])
  const [fileList, setfileList] = useState([])
  const [loadingUpload, setloadingUpload] = useState(false)


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
      visible={visible}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOk}
        initialValues={{
          categoryId: "",
          _id: "",
          name: "",
          icon: ""
        }}
      >
        <Form.Item name="categoryId" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Row >
          <Col span={8}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: 'Campo requerido!' }]}
            >
              <Input placeholder="Ingrese nombre" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Precio"
              name="price"
              rules={[{ required: true, message: 'Campo requerido!' }]}
            >
              <Input type="number" placeholder="Ingrese precio" />

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Descripcion"
              name="description"
              rules={[{ required: true, message: 'Campo requerido!' }]}
            >
              <Input placeholder="Ingrese descripcion" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Imagen"
              name="image"
              valuePropName="image"
              /* getValueProps={getValueProps} */
              getValueFromEvent={normFile}
              normalize={normalize}
            >
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                /* showUploadList={false} */
                fileList={fileList}
                onChange={handleChange}
                onPreview={onPreview}
                onRemove={onRemove}
              /* beforeUpload={beforeUpload}
              onPreview={onPreview}
              onRemove={onRemove} */
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

export default DishesModalForm
