import React, { useContext } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';

// Icons
import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'

import { Button, Table, Modal, notification } from 'antd'
import DishesTable from 'components/DishesTable/DishesTable'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Services 
import { onDeleteCategory } from 'services/categories'

// Contexts
import { AuthContext } from 'contexts/AuthContext'

const { confirm } = Modal;

const baseUrl = process.env.REACT_APP_FILES_URL

const CategoriesTable = ({ record, onShowCategoriesModal, onShowDishesModal, editCategory }) => {
  const { dispatch } = useContext(AuthContext)

  const edit = <Tooltip id="edit_tooltip">Editar categoria</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Borrar categoria</Tooltip>;

  function showConfirm(cell, id) {
    confirm({
      title: '¿Estas seguro de eliminar esta categoria?',
      icon: <ExclamationCircleOutlined />,
      content: 'No se podran revirtir estos cambios',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          const response = await onDeleteCategory({ serviceId: id, _id: cell._id })
          console.log(response);
          if (response.status === 200) {
            dispatch({
              type: "DELETE_CATEGORY",
              payload: { serviceId: id, _id: cell._id }
            })
            notification.success({
              duration: 2,
              message: 'Eliminado',
              description:
                'Esta categoria ha sido eliminado con exito',
            });
            /* dispatch({
              type: "DELETE_SERVICE",
              payload: cell._id
            }) */
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

  const categoriesColums = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: (iconPath) => <div style={{ background: '#27293d', borderRadius: '10px' }}><img style={{ width: '50px' }} src={`${baseUrl}/${iconPath.substring(7)}`} alt="" /></div>
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'x',
      render: (cell) =>
        <div>
          <OverlayTrigger placement="top" overlay={edit}>
            <button onClick={() => editCategory(cell)} style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={editIcon} alt="" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={remove}>
            <button onClick={() => showConfirm(cell, record._id)} style={{ background: 'none', border: 'none' }}>
              <img style={{ width: '15px' }} src={deleteIcon} alt="" />
            </button>
          </OverlayTrigger>
        </div>
    },
  ]
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <div className="title">
              <h4>Categorias</h4>
              <div><Button onClick={() => onShowCategoriesModal(record._id)}>Crear</Button></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table
            rowKey="_id"
            dataSource={record.categories}
            columns={categoriesColums}
            expandable={{
              expandedRowRender: record =>
                <DishesTable
                  record={record}
                  onShowDishesModal={onShowDishesModal}
                />
            }}
          />,
        </CardBody>
      </Card>
    </div>
  )
}

export default CategoriesTable
