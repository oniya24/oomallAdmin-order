import { useMemo, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space, Modal, Form, Input } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Address';
import pagination from '@/utils/pagination';
const address = ({
  addressList,
  addressTotal,
  addressPage,
  addressPageSize,
  getAllRegion,
  postAddSubRegionsReq,
  putModifySubRegions,
  deleteSubRegions,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState(0); // 0创建 1提交
  const handleOpenCreateModal = async () => {
    await postAddSubRegionsReq();
    setModalVisible(true);
    setModalStatus(0);
  };
  const handleOpenModifyModal = record => {
    form.setFieldsValue(record);
    setModalVisible(true);
    setModalStatus(1);
  };
  const handleDeleteAddress = async ({ id }) => {
    await deleteSubRegions({ did: depart_id, id });
  };
  const handleCreateAddress = ({ id }) => {
    form.validateFields(['name', 'postalCode']).then((error, value) => {
      console.log(error, value);
    });
    // postAddSubRegionsReq({
    //   did: depart_id,
    // })
  };
  const handleModifyAddress = ({ id }) => {
    form.validateFields(['id', 'name', 'postalCode']).then((error, value) => {
      console.log(error, value);
    });
    // putModifySubRegions({
    //   did: depart_id,
    //   id,

    // })
  };
  useEffect(() => {
    // getAllRegion() // 该区域id？？？
  }, []);
  const columns = useMemo(() => {
    return [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'pid',
        dataIndex: 'pid',
        key: 'pid',
      },
      {
        title: '真实姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'postalCode',
        dataIndex: 'postalCode',
        key: 'postalCode',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => handleOpenModifyModal(record)}
              >
                修改信息
              </Button>
              <Button type="danger" onClick={() => handleDeleteAddress(record)}>
                删除地址
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <div>
        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={handleOpenCreateModal}
        >
          创建地址
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(addressTotal, savePagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={addressList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        cancelText={'取消'}
        okText={'提交'}
        onOk={modalStatus === 0 ? handleCreateAddress : handleModifyAddress}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} preserve={false}>
          {modalStatus === 0 ? null : (
            <Form.Item label="id" name="id">
              <Input disabled></Input>
            </Form.Item>
          )}
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="编号"
            name="postalCode"
            rules={[{ required: true, message: '请输入编号' }]}
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(address);
