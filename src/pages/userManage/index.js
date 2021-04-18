import { useMemo, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/UserManage';
import pagination from '@/utils/pagination';

const userManage_user = ({
  userList,
  userTotal,
  userPage,
  userPageSize,
  getAllUsers,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const handleBanUser = ({ id }) => {
    putBanUserByShop({ did: depart_id, id });
  };
  const handleReleaseUser = ({ id }) => {
    putReleaseUserByShop({ did: depart_id, id });
  };
  useEffect(() => {
    getAllUsers({
      page: userPage,
      pagesize: userPageSize
    })
  }, [userPage, userPageSize]);
  const columns = useMemo(() => {
    return [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '真实姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          const { id } = record
          return (
            <Space>
              <Button type="primary" onClick={() => history.push(`userManage/${id}`)}>查看详情</Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card style={{ height: "100%", width: "100%"}}>
      <Table
        scroll={{ x: true }}
        pagination={pagination(userTotal, savePagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={userList}
      ></Table>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(userManage_user);
