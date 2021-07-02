import { Button, Table } from 'antd'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Icons
import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

const baseUrl = process.env.REACT_APP_FILES_URL

const DishesTable = ({ record, onShowDishesModal }) => {
  console.log(record);
  const edit = <Tooltip id="edit_tooltip">Editar categoria</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Borrar categoria</Tooltip>;

  const titleService = () => {
    return <div className="title">
      <h4>Servicios</h4>
      <div><Button onClick={onShowDishesModal}>Crear</Button></div>
    </div>
  }



  const dishesColums = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripcion', dataIndex: 'description', key: 'description' },
    { title: 'Precio', dataIndex: 'price', key: 'price' },
    {
      title: 'Icono',
      dataIndex: 'image',
      key: 'image',
      render: (imagePath) => <div /* style={{ background: '#27293d', borderRadius: '10px' }} */><img style={{ width: '100px' }} src={`${baseUrl}/${imagePath.substring(7)}`} alt="" /></div>
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
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          <div className="title">
            <h4>Platos</h4>
            <div><Button onClick={() => onShowDishesModal(record._id)}>Crear</Button></div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table
          /*  title={titleService} */
          rowKey="_id"
          dataSource={record.dishes}
          columns={dishesColums}
        /*  expandable={{
           expandedRowRender: record => <Table
            columns={dishesColums} 
            dataSource={record.dishes} />
         }} */
        />
      </CardBody>
    </Card>

  )
}

export default DishesTable
