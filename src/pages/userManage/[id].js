import { useMemo, useEffect } from 'react';
import { connect, useLocation, useParams } from 'umi';
import { Card, Table, Button, Tooltip, Space, Descriptions } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/UserManage';

const userDetail = ({
  putBanUserByShop,
  putReleaseUserByShop,
  getUserById,
  userDetail
}) => {
  const { id } = useParams();
  const { depart_id } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { state, email, mobile, birthday, gender, userName } = userDetail
  const handleProcessUser = async (val) => {
    if(val === true){
      await  putBanUserByShop({
        did: depart_id,
        id: id
      })
    }
    if(val === false){
      await  putReleaseUserByShop({
        did: depart_id,
        id: id
      })
    }
    await  getUserById(id)
  }
  useEffect(() => {
    getUserById(id)
  }, [ id ])
  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <Descriptions>
        <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
        <Descriptions.Item label="性别">{gender === 0 ? "女" : "男"}</Descriptions.Item>
        <Descriptions.Item label="手机号">{mobile}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
        <Descriptions.Item label="生日">{birthday}</Descriptions.Item>
        <Descriptions.Item label="状态">
          {
            Number(state) === 1 ? (
              <Button type="danger" onClick={() => handleProcessUser(true)}>
                封禁用户
              </Button>
            ) : null
          }
          {
            Number(state) === 2 ? (
              <Button type="danger" onClick={() => handleProcessUser(false)}>
                解禁用户
              </Button>
            ) : null
          }
          {
            Number(state) === 3 || Number(state) === 4 ? "已废弃" : null
          }
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(userDetail)