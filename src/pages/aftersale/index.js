import { useMemo, useEffect, useState, useRef } from 'react';
import { connect, history } from 'umi';
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
  Result
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Aftersale';
import pagination from '@/utils/pagination';
import { aftersaleStateMap, aftersaleTypes } from '@/const/oomall';
const { RangePicker } = DatePicker;
const { Group } = Checkbox;
const { Option } = Select;
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
  const formRef = useRef();
  // const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [processModalVisible, setProcessModalVisible] = useState(false);
  const handleClickDetail = async ({ id }) => {
    // await getAftersalesById({
    //   shopId: depart_id,
    //   id
    // })
    history.push(`/aftersale/${id}`)
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
    formRef.current.resetFields();
  };
  useEffect(() => {
    getAllAftersales({
      page: aftersalePage,
      pagesize: aftersalePageSize
    })
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
        render: (text, record) => {
          return <>{aftersaleTypes[type].label}</>
        }
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
          return <>{aftersaleStateMap[text]}</>;
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
          {/* <Form.Item label="选择范围" name="dateRange">
            <RangePicker />
          </Form.Item> */}
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
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(aftersale);
