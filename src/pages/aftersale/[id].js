import { useMemo, useEffect, useState, useRef } from 'react';
import { connect, history, useParams } from 'umi';
import {
  Card,
  Table,
  Button,
  Descriptions,
  PageHeader,
  Checkbox,
  Select,
  Form,
  Input,
  Radio,
  Result,
  Steps,
  Space
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Aftersale';
import pagination from '@/utils/pagination';
import { aftersaleStateMap, aftersaleTypes } from '@/const/oomall';
const aftersale_ID = ({
  aftersaleInfo,
  getAftersalesById,
  putConfirmAftersales,
  putReceiveAftersales,
  putDeliverAftersales,
}) => {
  const { id } = useParams();
  const { depart_id, userName } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { type, state, conclusion, detail, mobile, regionId, reason, quantity } = aftersaleInfo;
  const formRef = useRef();
  const confirmFormRef = useRef();
  const handleConfirmProcess = async value => {
    const { id } = aftersaleInfo;
    await putConfirmAftersales({
      shopId: depart_id,
      id: id,
      ...value
    })
    await getAftersalesById({
      shopId: depart_id,
      id
    })
  };
  const handleReceiveProcess = async (value) => {
    const { id } = aftersaleInfo;
    await putReceiveAftersales({
      shopId: depart_id,
      id: id,
      ...value
    })
    await getAftersalesById({
      shopId: depart_id,
      id
    })
  };
  const handleDeveiverProcess = async (value) => {
    const { id } = aftersaleInfo;
    await putDeliverAftersales({
      shopId: depart_id,
      id: id,
      ...value
    })
    await getAftersalesById({
      shopId: depart_id,
      id
    })
  };
  useEffect(() => {
    getAftersalesById({
      shopId: depart_id,
      id
    })
  }, []);
  return (
    <Card style={{height: '100%', width: '100%'}}>
      <PageHeader  onBack={() => history.push('/aftersale')}
        subTitle="返回列表页"></PageHeader>
      <Card title="订单详情">
        <Descriptions column={1}>
          <Descriptions.Item label="当前状态">{aftersaleStateMap[state]}</Descriptions.Item>
          <Descriptions.Item label="售后类型">{aftersaleTypes[type].label}</Descriptions.Item>
          <Descriptions.Item label="收件人">{conclusion}</Descriptions.Item>
          <Descriptions.Item label="售后原因">{reason}</Descriptions.Item>
          <Descriptions.Item label="货品数量">{quantity}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="处理进度">
        {
          state <= 5 || state === 7 ? 
          (
            <Steps current={state-1}>
            {
              Object.keys(aftersaleStateMap).slice(0,5).map((key) => {
                return <Steps.Step title={aftersaleStateMap[key]}></Steps.Step>
              })
            }
          </Steps>
          ) : null
        }
        {state === 1 ? (
          <div style={{marginTop: 10}}>
            <Form style={{width: 400}} formRef={confirmFormRef} onFinish={handleConfirmProcess} size="small">
              <Form.Item label="结果" name="conclusion">
                <Input />
              </Form.Item>
              <Form.Item label="售后类型" name="type">
                <Select>
                  {
                    aftersaleTypes.map((item) => {
                      return <Option value={item.value}>{item.label}</Option>
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item label="退款额" name="price">
                <Input type="number" placeholder="非退款处理不填" />
              </Form.Item>
              <Form.Item label="是否同意退换货" name="confirm">
                <Select>
                  <Option value={true}>同意</Option>
                  <Option value={false}>不同意</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : null}
        {state === 3 ? (
          <div style={{marginTop: 10}}>
            <Form style={{width: 400}} formRef={confirmFormRef} onFinish={handleReceiveProcess} size="small">
              <Form.Item label="结果" name="conclusion">
                <Input />
              </Form.Item>
              <Form.Item label="是否收到客户货物" name="confirm">
                <Select>
                  <Option value={true}>已收到</Option>
                  <Option value={false}>未收到</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="small" htmlType='submit'>提交</Button>
              </Form.Item>
            </Form>
          </div>
        ) : null}
        {state === 4 ? (
          <div style={{marginTop: 10}}>
            <Form onFinish={handleDeveiverProcess} layout="inline" size="small">
              <Form.Item label="换货和维修提交订单号" name="shopLogSn">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : null}
        {
          state === 2 || state === 5 || state === 7 ? (
            <Result status="success" title={aftersaleStateMap[state]}></Result>
          ) : null
        }
        {
          state === 6 || state === 8 ? (
            <Result status="info" title={aftersaleStateMap[state]}></Result>
          ) : null
        }
      </Card>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(aftersale_ID);
