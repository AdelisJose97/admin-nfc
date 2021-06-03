import React, { useContext, useEffect, useState } from 'react'
import { Table, Form, Modal, Button, Space, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import './index.css'

import ServiceModalForm from 'components/ServiceModalForm/ServiceModalForm'

// Services 
import { onEditService, onDeleteService, onCreateService } from 'services/services'

// Icons
import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'

// Contexts
import { AuthContext } from 'contexts/AuthContext'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Hooks
import useIsLogin from 'hooks/useIsLogin'

const { confirm } = Modal;

const baseUrl = process.env.REACT_APP_FILES_URL


const Services = () => {
  const { services, dispatch } = useContext(AuthContext)
  useIsLogin()

  const edit = <Tooltip id="edit_tooltip">Editar Servicio</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Borrar Servicio</Tooltip>;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemSelected, setitemSelected] = useState({})

  const [formService] = Form.useForm();

  const editService = cell => {
    const { start, end } = cell
    let hourStart = Number(start && start.substring(0, 2))
    let minuteStart = Number(start && start.substring(3, 5))
    let hourEnd = Number(end && end.substring(0, 2))
    let minuteEnd = Number(end && end.substring(3, 5))

    let hourStartParsed = dayjs().set('hour', hourStart).set('minute', minuteStart)
    let hourEndParsed = dayjs().set('hour', hourEnd).set('minute', minuteEnd)
    formService.setFieldsValue({
      _id: cell._id,
      name: cell.name,
      start_end: [hourStartParsed, hourEndParsed]
    })
    setIsModalVisible(true);
    setitemSelected(cell)
  }
  function showConfirm(cell) {
    confirm({
      title: '¿Estas seguro de eliminar este servicio?',
      icon: <ExclamationCircleOutlined />,
      content: 'No se podran revirtir estos cambios',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          const response = await onDeleteService(cell)
          if (response.status === 200) {
            notification.success({
              duration: 2,
              message: 'Eliminado',
              description:
                'Este servicio ha sido eliminado con exito',
            });
            dispatch({
              type: "DELETE_SERVICE",
              payload: cell._id
            })
          }

        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const showModal = (cell) => {
    setIsModalVisible(true);
    setitemSelected(cell)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onSavedData = async (values) => {
    if (values._id) {
      const response = await onEditService(values)
    } else {
      const response = await onCreateService(values)
      console.log(response)
      const { data, status } = response
      if (status === 200) {
        notification.success({
          duration: 2,
          message: 'Agregado',
          description:
            'Este servicio ha sido agregado con exito',
        });
        dispatch({
          type: "ADD_SERVICE",
          payload: data
        })
      }
      if (status === 400) {
        notification.success({
          duration: 2,
          message: 'No se puede agregar',
          description: 'Ha alcanzado el limite de servicios',
        });

      }
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const titleService = () => {
    return <div className="title">
      <h4>Servicios</h4>
      <div><Button onClick={() => setIsModalVisible(true)}>Crear</Button></div>
    </div>
  }


  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Inicia', dataIndex: 'start', key: 'start' },
    { title: 'Finaliza', dataIndex: 'end', key: 'end' },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'x',
      render: (cell) =>
        <div>
          <OverlayTrigger placement="top" overlay={edit}>
            <button onClick={() => editService(cell)} style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={editIcon} alt="" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={remove}>
            <button onClick={() => showConfirm(cell)} style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={deleteIcon} alt="" />
            </button>
          </OverlayTrigger>
        </div>
    },
  ];
  const categoriesColums = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: (iconPath) => <img style={{ width: '50px' }} src={`${baseUrl}/${iconPath.substring(7)}`} alt="" />
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'x',
      render: () =>
        <div>
          <OverlayTrigger placement="top" overlay={edit}>
            <button style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={editIcon} alt="" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={remove}>
            <button style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={deleteIcon} alt="" />
            </button>
          </OverlayTrigger>
        </div>
    },
  ]

  const dishesColums = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripcion', dataIndex: 'description', key: 'description' },
    { title: 'Precio', dataIndex: 'price', key: 'price' },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'x',
      render: () =>
        <div>
          <OverlayTrigger placement="top" overlay={edit}>
            <button style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={editIcon} alt="" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={remove}>
            <button style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={deleteIcon} alt="" />
            </button>
          </OverlayTrigger>
        </div>
    },

  ]
  return (
    <div className="content">
      <Table
        title={titleService}
        rowKey="_id"
        columns={columns}
        expandable={{
          expandedRowRender: record =>
            <Table
              dataSource={record.categories}
              columns={categoriesColums}
              expandable={{
                expandedRowRender: record => <Table columns={dishesColums} dataSource={record.dishes} />
              }}
            />,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={services}
      />
      {isModalVisible &&
        <ServiceModalForm
          form={formService}
          itemSelected={itemSelected}
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleOk={onSavedData}
          handleCancel={handleCancel}
        />
      }
    </div>
  )
}

export default Services
