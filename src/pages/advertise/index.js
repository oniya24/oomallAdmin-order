import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  Drawer,
  DatePicker,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Advertise';
import pagination from '@/utils/pagination';
import moment from 'moment';
import { advertiseStateMap } from '@/const/oomall';
const advertise = ({
  adverList,
  adverTotal,
  adverPage,
  adverPageSize,
  adverDetail,
  postUploadImg,
  putModifyAdvertise,
  deleteAdvertise,
  getAllSegmentsAdvertise,
  postCreateSegmentsAdvertise,
  putDefaultAdvertise,
  putOnshelvesAdvertise,
  putOffshelvesAdvertise,
  putAuditAdvertise,
  savePagination,
  saveAdverDetail
}) => {
  console.log(advertiseStateMap)
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [tid, setTid] = useState(2);
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const handledeleteAdver = async ({ id }) => {
    await deleteAdvertise({
      did: depart_id,
      id,
    });
    await getAllSegmentsAdvertise({
      did: depart_id,
      tid,
      page: adverPage,
      pageSize: adverPageSize
    });
  };
  const handleCreateAdver = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyAdver = record => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    let { beginDate, endDate } = record;
    beginDate = moment(beginDate);
    endDate = moment(endDate);
    form.setFieldsValue({
      ...record,
      beginDate,
      endDate
    })
  };
  const handleAdverDetail = record => {
    saveAdverDetail(record);
    history.push('/advertise/detail')
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      let { beginDate, endDate } = value;
      beginDate = beginDate.format("YYYY-MM-DD");
      endDate = endDate.format("YYYY-MM-DD");
      await postCreateSegmentsAdvertise({
        did: depart_id,
        tid,
        ...value,
        beginDate,
        endDate
      })
      await getAllSegmentsAdvertise({
        did: depart_id,
        tid,
        page: adverPage,
        pageSize: adverPageSize
      });
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      let { beginDate, endDate } = value;
      beginDate = beginDate.format("YYYY-MM-DD");
      endDate = endDate.format("YYYY-MM-DD");
      await putModifyAdvertise({
        did: depart_id,
        ...value,
        beginDate,
        endDate
      })
      await getAllSegmentsAdvertise({
        did: depart_id,
        tid,
        page: adverPage,
        pageSize: adverPageSize
      });
      setModalVisible(false);
    });
  };
  const onFormFinish = value => {
    // getAllSegmentsAdvertise
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: '活动图片',
        dataIndex: 'imagePath',
        key: 'imagePath',
        render: (text, record) => {
          return (
            <div><img style={{width: 50, height: 50}} src={text}></img></div>
          )
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          return <div>{advertiseStateMap[text]}</div>;
        },
      },
      {
        title: '是否是默认',
        dataIndex: 'beDefault',
        key: 'beDefault',
        render: (text, record) => {
          return <div>{text ? '是' : '否'}</div>;
        },
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '开始时间',
        dataIndex: 'beginDate',
        key: 'beginDate',
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: '数量',
        dataIndex: 'weight',
        key: 'weight',
      },
      {
        title: '优惠时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '优惠时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state, id } = record;
          return (
            <Space>
              <Button type="primary" onClick={() => handleModifyAdver(record)}>
                修改活动信息
              </Button>
              <Button type="ghost" onClick={() => handleAdverDetail(record)}>
                查看详情
              </Button>
              <Button type="danger" onClick={() => handledeleteAdver(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllSegmentsAdvertise({
      did: depart_id,
      tid,
      page: adverPage,
      pageSize: adverPageSize
    });
  }, [adverPage, adverPageSize]);
  return (
    <Card>
      <Card style={{ margin: 10 }}>
        <Form
          ref={formRef}
          size="middle"
          layout="inline"
          onFinish={onFormFinish}
        >
          <Form.Item label="选择时段" name="timeline">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" onClick={handleCreateAdver}>
                当前时段创建广告
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        {/* <div style={{ margin: 10 }}>
          <Button type="primary" onClick={handleCreateAdver}>
            当前时段创建广告
          </Button>
        </div> */}
        <Table
          // onRow={(record) => {
          //   const { id } = record
          //   return {
          //     onClick: event => { history.push(`/advertise/${id}`) }, // 点击行
          //    }
          //   }
          // }
          scroll={{ x: true }}
          pagination={pagination(adverTotal, savePagination)}
          rowKey={record => record.dataIndex}
          columns={columns}
          dataSource={adverList}
        ></Table>
      </Card>
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
            name="content"
            required
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="链接"
            name="link"
            required
            rules={[{ required: true, message: '请输入链接' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="weight"
            name="weight"
            required
            rules={[{ required: true, message: '请输入weight' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="beginDate"
            required
            rules={[{ required: true, message: '请输入beginDate' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endDate"
            required
            rules={[{ required: true, message: '请输入endDate' }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(advertise);
