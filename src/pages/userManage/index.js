import { useMemo, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/UserManage';
import pagination from '@/utils/pagination';

const userManage_user = ({
  userList,
  userTotal,
  userPage,
  userPageSize,
  getAllUsers,
  putBanUserByShop,
  putReleaseUserByShop,
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
    // getAllUsers()
  }, []);
  useEffect(() => {
    // getAllUsers({
    //   page: userPage,
    //   pagesize: userPageSize
    // })
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
          return (
            <Space>
              <Button type="danger" onClick={() => handleBanUser(record)}>
                封禁用户
              </Button>
              <Button type="danger" onClick={() => handleReleaseUser(record)}>
                解禁用户
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
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
