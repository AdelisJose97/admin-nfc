import React, { useEffect, useState } from 'react'
import { Col, Modal, Form, Row, Input, TimePicker } from 'antd';
import InputFormatted from 'components/InputFormatted/ImputFormatted'



const ModalDetail = ({ itemSelected, form, isModalVisible, handleOk, handleCancel }) => {
  /* console.log(itemSelected)
  const { start, end, name } = itemSelected */
  /*   const { start, end, name } = itemSelected
    let hourStart = Number(start && start.substring(0, 2))
    let minuteStart = Number(start && start.substring(3, 5))
    let hourEnd = Number(end && end.substring(0, 2))
    let minuteEnd = Number(end && end.substring(3, 5))
  
    let hourStartParsed = moment().hour(hourStart).minute(minuteStart)
    let hourEndParsed = moment().hour(hourEnd).minute(minuteEnd)
   */
  const format = 'HH:mm';

  /* function onChange(time, timeString) {
    console.log(time, timeString);
  } */

  return (
    <Modal title="Servicio"
      visible={isModalVisible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={handleOk}
        initialValues={{
          _id: "",
          name: "",
          start_end: []
        }}
      >
        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Row >
          <Col span={10}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Campo requerido!' }]}
            >
              <Input placeholder="Ingrese nombre" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Inicio-Fin" name="start_end">
              <TimePicker.RangePicker
                placeholder={['Inicio', ['Fin']]}
                /*  onChange={onChange} */
                format={format}
              />
            </Form.Item>
          </Col>
        </Row>

      </Form>


    </Modal>
  )
}

export default ModalDetail
