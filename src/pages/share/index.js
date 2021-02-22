import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  DatePicker,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Share';
import pagination from '@/utils/pagination';
const share = ({
  shareList,
  shareTotal,
  sharePage,
  sharePageSize,
  getAllShare,
  postCreateShare,
  putModifyShare,
  deleteShare,
  putOnshelvesShare,
  putOffshelvesShare,
  saveAdverPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteShare = async ({ id }) => {
    await deleteShare({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateShare = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyShare = record => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    // form.setFieldsValue(record)
  };
  const handleOnShelves = async ({ id }) => {
    await putOnshelvesShare({
      shopId: depart_id,
      id,
    });
  };
  const handleOffShelves = async ({ id }) => {
    await putOffshelvesShare({
      shopId: depart_id,
      id,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(value => {
      // await postCreateShare(value)
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(value => {
      // await putModifyShare(value)
      setModalVisible(false);
    });
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'sharerId',
        dataIndex: 'sharerId',
        key: 'sharerId',
      },
      {
        title: 'Sku名',
        dataIndex: ['sku', 'name'],
        key: 'skuName',
      },
      {
        title: 'Sku图片',
        dataIndex: ['sku', 'imageUrl'],
        key: 'skuImageUrl',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record;
          return (
            <Space>
              {Number(state) === 0 ? (
                <Button type="primary" onClick={() => handleOnShelves(record)}>
                  上架活动
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleOffShelves(record)}>
                  下架活动
                </Button>
              )}
              <Button type="default" onClick={() => handleModifyShare(record)}>
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeleteShare(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getAllShare({
    //   shopId: depart_id,
    //   page: sharePage,
    //   pageSize: sharePageSize
    // });
    console.log('fetch new');
  }, [sharePage, sharePageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateShare}>
          创建分享活动
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(shareTotal, saveAdverPagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={shareList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        onOk={() =>
          Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify()
        }
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="活动名"
            name="name"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="advancePayPrice"
            name="advancePayPrice"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="restPayPrice"
            name="restPayPrice"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="beginTime"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="支付时间"
            name="payTime"
            required
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(share);
