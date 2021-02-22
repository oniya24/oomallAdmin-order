import { useMemo, useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Modal,
  Input,
  Form,
  DatePicker,
  Checkbox,
  Select,
  Radio,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Aftersale';
import pagination from '@/utils/pagination';
const { RangePicker } = DatePicker;
const { Group } = Checkbox;
const { Option } = Select;
const commentFilters = [
  {
    text: '已通过',
    value: 0,
  },
  {
    text: '未通过',
    value: 1,
  },
  {
    text: '未处理',
    value: 2,
  },
];
const aftersale = ({
  aftersaleList,
  aftersaleInfo,
  aftersaleTotal,
  aftersalePage,
  aftersalePageSize,
  getAllAftersales,
  getAftersalesById,
  putConfirmAftersales,
  putReceiveAftersales,
  putDeliverAftersales,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { type, state } = aftersaleInfo;
  console.log(type, state);
  const formRef = useRef();
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [processModalVisible, setProcessModalVisible] = useState(false);
  const handleClickDetail = async ({ id }) => {
    // await getAftersalesById({
    //   did: depart_id,
    //   id
    // })
    setDetailModalVisible(true);
  };
  const handleConfirmProcess = async confirm => {
    const { id } = aftersaleInfo;
    // await putConfirmAftersales({
    //   shopId: depart_id,
    //   id: id,
    //   confirm,
    // })
    // await getAftersalesById({
    //   did: depart_id,
    //   id
    // })
  };
  const handleReceiveProcess = async () => {
    // await putReceiveAftersales({
    //   shopId: depart_id,
    //   id: id,
    //   confirm,
    // })
    // await getAftersalesById({
    //   did: depart_id,
    //   id
    // })
  };
  const handleDeveiverProcess = async () => {
    // await putDeliverAftersales({
    //   shopId: depart_id,
    //   id: id,
    //   confirm,
    // })
    // await getAftersalesById({
    //   did: depart_id,
    //   id
    // })
  };
  const onFormFinish = value => {
    const { dateRange, type, state } = value;
    console.log(dateRange);
    const [beginTime, endTime] = dateRange;
    // getAllAftersales({
    //   aftersalePage,
    // })
    console.log('fetch new');
  };
  const handleProcessSubmit = () => {};
  const onFormReset = value => {
    console.log(value);
    formRef.current.resetFields();
  };
  useEffect(() => {
    // getAllAftersales({
    //   page: commentPage,
    //   pagesize: commentPageSize
    // })
    console.log('fetch new ');
  }, [aftersalePage, aftersalePageSize]);
  const columns = useMemo(() => {
    return [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '订单id',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '顾客id',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      {
        title: '服务编号',
        dataIndex: 'serviceSn',
        key: 'serviceSn',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '售后理由',
        dataIndex: 'reason',
        key: 'reason',
        render: (text, record) => {
          const shortStr = text.substr(0, 15);
          return <Tooltip title={text}>{shortStr}</Tooltip>;
        },
      },
      {
        title: '退款金额',
        dataIndex: 'refund',
        key: 'refund',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          const result = text;
          return <>{result}</>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => handleClickDetail(record)}>
                查看详情
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <Card>
        <Form
          ref={formRef}
          size="small"
          layout="inline"
          onFinish={onFormFinish}
          onReset={onFormReset}
        >
          <Form.Item label="选择范围" name="dateRange">
            <RangePicker />
          </Form.Item>
          <Form.Item label="售后类型" name="type">
            <Select style={{ width: 150 }}>
              <Option value="0">退货</Option>
              <Option value="1">换货</Option>
              <Option value="2">维修</Option>
            </Select>
          </Form.Item>
          <Form.Item label="售后状态" name="state">
            <Select style={{ width: 150 }}>
              <Option value="0">已处理</Option>
              <Option value="1">未处理</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="ghost" htmlType="reset">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card title={null}>
        <Table
          scroll={{ x: true }}
          pagination={pagination(aftersaleTotal, savePagination)}
          rowKey={record => record.dataIndex}
          columns={columns}
          dataSource={aftersaleList}
        ></Table>
      </Card>
      <Modal
        visible={detailModalVisible}
        okButtonProps={[]}
        cancelText={'取消'}
        onOk={handleProcessSubmit}
        onCancel={() => setDetailModalVisible(false)}
      >
        <Card title="订单详情">{JSON.stringify(aftersaleInfo)}</Card>
        <Card title="处理进度">
          {state === 0 ? (
            <Space>
              <div>是否同意退换货</div>
              <Space>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => handleConfirmProcess(true)}
                >
                  同意
                </Button>
                <Button
                  size="small"
                  type="danger"
                  onClick={() => handleConfirmProcess(false)}
                >
                  不同意
                </Button>
              </Space>
            </Space>
          ) : null}
          {(type === 0 || type === 1) && state === 1 ? (
            <Space>
              <div>是否收到退货</div>
              <Space>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => handleReceiveProcess(true)}
                >
                  已收到买家退回的货
                </Button>
              </Space>
            </Space>
          ) : null}
          {state === 2 ? (
            <Form onFinish={handleDeveiverProcess} layout="inline" size="small">
              <Form.Item label="换货和维修提交订单号">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          ) : null}
        </Card>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(aftersale);
