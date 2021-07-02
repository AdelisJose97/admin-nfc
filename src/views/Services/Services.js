import React, { useContext, useEffect, useState } from 'react'
import { Table, Form, Modal, Button, Space, notification, Spin } from 'antd';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import './index.css'

import CategoriesTable from 'components/CategoriesTable/CategoriesTable'

//Modals
import ServiceModalForm from 'components/ServiceModalForm/ServiceModalForm'
import CategoriesModalForm from 'components/CategoriesModalForm/CategoriesModalForm'

// Services 
import { onEditService, onDeleteService, onCreateService } from 'services/services'
import { onCreateCategory, onEditCategory } from 'services/categories'
import { onCreateDish } from 'services/dishes'

// Icons
import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'

// Contexts
import { AuthContext } from 'contexts/AuthContext'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Hooks
import useIsLogin from 'hooks/useIsLogin'
import DishesModalForm from 'components/DishesModalForm/DishesModalForm';

const { confirm } = Modal;

const Services = () => {
  const { services, showLoading, dispatch } = useContext(AuthContext)
  useIsLogin()

  const edit = <Tooltip id="edit_tooltip">Editar Servicio</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Borrar Servicio</Tooltip>;

  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [isCategoriesModalVisible, setisCategoriesModalVisible] = useState(false)
  const [isDishesModalVisible, setisDishesModalVisible] = useState(false)
  const [itemSelected, setitemSelected] = useState({})

  const [isSaving, setloading] = useState(false)
  const [isCategorySaving, setisCategorySaving] = useState(false)
  const [isDishSaving, setisDishSaving] = useState(false)

  const [formService] = Form.useForm()
  const [formCategory] = Form.useForm()
  const [formDish] = Form.useForm()

  const editService = cell => {
    console.log(cell)
    const { start_end } = cell
    console.log(start_end)
    /* let hourStartParsed = dayjs(start_end[0]).get('hour')
    console.log(hourStartParsed) */
    /* const { start, end } = cell
    let hourStart = Number(start && start.substring(0, 2))
    let minuteStart = Number(start && start.substring(3, 5))
    let hourEnd = Number(end && end.substring(0, 2))
    let minuteEnd = Number(end && end.substring(3, 5))

    let hourStartParsed = dayjs().set('hour', hourStart).set('minute', minuteStart)
    let hourEndParsed = dayjs().set('hour', hourEnd).set('minute', minuteEnd) */
    formService.setFieldsValue({
      _id: cell._id,
      name: cell.name,
      start_end: [dayjs(start_end[0]), dayjs(start_end[1])]
    })
    setIsServiceModalVisible(true);
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
  const onShowModal = () => {
    formService.resetFields()
    setIsServiceModalVisible(true);
  };

  const handleOk = () => {
    setIsServiceModalVisible(false);
  };

  const onSavedData = async (values) => {
    setloading(true)
    if (values._id) {
      const response = await onEditService(values)
      const { data, status } = response
      if (status === 200) {
        dispatch({
          type: "EDIT_SERVICE",
          payload: data
        })
        setloading(false)
        dispatch({
          type: "SET_SHOW_LOADING",
          payload: false
        })
        notification.success({
          duration: 3,
          message: 'Editado',
          description:
            'Este servicio ha sido editado con exito',
        });
        formService.resetFields()
      }

    } else {
      const response = await onCreateService(values)
      setloading(true)
      dispatch({
        type: "SET_SHOW_LOADING",
        payload: true
      })
      const { data, status } = response
      if (status === 200) {
        setloading(true)
        dispatch({
          type: "SET_SHOW_LOADING",
          payload: false
        })
        notification.success({
          duration: 3,
          message: 'Agregado',
          description:
            'Este servicio ha sido agregado con exito',
        });
        dispatch({
          type: "ADD_SERVICE",
          payload: data
        })
      }
      formService.resetFields()
      if (status === 400) {
        dispatch({
          type: "SET_SHOW_LOADING",
          payload: false
        })
        notification.warning({
          duration: 3,
          message: 'No se puede agregar',
          description: 'Ha alcanzado el limite de servicios',
        });

      }
    }
    setIsServiceModalVisible(false)
  }

  const handleCancel = () => {
    formService.resetFields()
    setIsServiceModalVisible(false);
  };

  const onShowCategoriesModal = serviceId => {
    formCategory.resetFields();
    formCategory.setFieldsValue({
      serviceId: serviceId
    })
    /* formStyle.setFieldsValue({
      shingle_id: shingle_id,
    }); */
    setisCategoriesModalVisible(true)
  };
  const editCategory = (cell) => {
    formCategory.setFieldsValue({
      serviceId: cell.serviceId,
      _id: cell._id,
      name: cell.name,
      icon: cell.icon
    })
    setisCategoriesModalVisible(true)
  }

  const onSaveCategoriesData = async values => {
    setisCategorySaving(true)
    if (values._id) {
      const response = await onEditCategory(values)
      const { data, status } = response
      console.log(data)
      if (status === 200) {
        dispatch({
          type: "EDIT_CATEGORY",
          payload: data
        })
        dispatch({
          type: "SET_SHOW_LOADING",
          payload: false
        })
        setisCategorySaving(false)
        notification.success({
          duration: 3,
          message: 'Editado',
          description:
            'Esta categoria ha sido editada con exito',
        });
        setisCategoriesModalVisible(false)
        formCategory.resetFields()
      }
      if (status !== 200) {
        notification.warning({
          duration: 3,
          message: 'Upps!',
          description:
            'Ha ocurrido un error',
        });
        setisCategorySaving(false)
      }

    }
    else {
      const response = await onCreateCategory(values)
      const { data, status } = response
      if (status === 200) {
        dispatch({
          type: "ADD_CATEGORY",
          payload: { category: data, serviceId: values.serviceId }
        })
        notification.success({
          duration: 3,
          message: 'Agregado',
          description:
            'Esta categoria ha sido agregada con exito',
        });
      }
      setisCategorySaving(false)
      formCategory.resetFields()
      setisCategoriesModalVisible(false)
    }
  };

  const onCloseCategoriesModal = () => {
    formCategory.resetFields()
    setisCategoriesModalVisible(false);
  };

  const onShowDishesModal = categoryId => {
    formDish.resetFields();
    formDish.setFieldsValue({
      categoryId: categoryId,
    });
    setisDishesModalVisible(true)
  };
  const onSaveDishesData = async values => {
    setisDishSaving(true)
    const response = await onCreateDish(values)
    const { data, status } = response
    console.log(data);
    if (status === 200) {
      setisDishSaving(false)
      notification.success({
        duration: 3,
        message: 'Agregado',
        description:
          'Esta categoria ha sido agregada con exito',
      });
      formDish.resetFields();
      setisDishesModalVisible(false)

    }

  };

  const onCloseDishesModal = () => {
    setisDishesModalVisible(false);
  };
  /*  const titleService = () => {
     return <div className="title">
       <h4>Servicios</h4>
       <div><Button onClick={() => setIsServiceModalVisible(true)}>Crear</Button></div>
     </div>
   } */


  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    {
      title: 'Inicia',
      dataIndex: 'start_end',
      key: 'start_end',
      render: (cell) => cell && dayjs(cell[0]).format('hh:mm a')
    },
    {
      title: 'Finaliza',
      dataIndex: 'start_end',
      key: 'start_end',
      render: (cell) => cell && dayjs(cell[1]).format('hh:mm a')
    },
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


  return (
    <div className="content">
      <Spin spinning={showLoading} >
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              <div className="title">
                <h4>Servicios</h4>
                <div><Button onClick={onShowModal}>Crear</Button></div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table
              className="table"
              /*  title={titleService} */
              rowKey="_id"
              onRow={(record, rowIndex) => {
                return ({
                  className: "on-hover"

                })
              }}
              columns={columns}
              expandable={{
                expandedRowRender: record =>
                  <CategoriesTable
                    record={record}
                    editCategory={editCategory}
                    onShowCategoriesModal={onShowCategoriesModal}
                    onShowDishesModal={onShowDishesModal}
                  />,
              }}
              dataSource={services}
            />
          </CardBody>
        </Card>

        {isServiceModalVisible &&
          <ServiceModalForm
            form={formService}
            visible={isServiceModalVisible}
            confirmLoading={isSaving}
            handleOk={onSavedData}
            handleCancel={handleCancel}
          />
        }
        {isCategoriesModalVisible &&
          <CategoriesModalForm
            form={formCategory}
            visible={isCategoriesModalVisible}
            confirmLoading={isCategorySaving}
            handleOk={onSaveCategoriesData}
            handleCancel={onCloseCategoriesModal}
          />
        }
        {isDishesModalVisible &&
          <DishesModalForm
            confirmLoading={isDishSaving}
            form={formDish}
            visible={isDishesModalVisible}
            handleOk={onSaveDishesData}
            handleCancel={onCloseDishesModal}
          />
        }
      </Spin>
    </div>
  )
}


export default Services