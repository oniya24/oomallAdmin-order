import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import {
  Card,
  Upload,
  PageHeader,
  Button
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Advertise';
import pagination from '@/utils/pagination';
import { UploadOutlined } from '@ant-design/icons';
const advertise = ({
  adverDetail,
  putDefaultAdvertise,
  postUploadImg,
  putOnshelvesAdvertise,
  putOffshelvesAdvertise,
  putAuditAdvertise,
}) => {
  console.log(adverDetail)
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [ imageUrl, setImageUrl ] = useState(null)
  const { id, state, beDefault, weight,  } = adverDetail;
  const handleSetDefault = async() => {
    await putDefaultAdvertise({
      did: depart_id,
      id: id
    })
  };
  const handleAudit = async() => {
    await putAuditAdvertise({
      did: depart_id,
      id: id
    })
  };
  const handleOnShelves = async () => {
    await putOnshelvesAdvertise({
      did: depart_id,
      id: id,
    });
  };
  const handleOffShelves = async () => {
    await putOffshelvesAdvertise({
      did: depart_id,
      id: id,
    });
  }

  const beforeUpload = (file) => {
    console.log(file)
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 5;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 5MB!');
    // }
    setImageUrl(file);
    return false;
  }
  const handleUploadImg = async () => {
    const formData = new FormData();
    formData.append("file",imageUrl)
    await postUploadImg({
      did: depart_id || 0,
      id: id || 149,
      formData
    })
  }
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card style={{height: '100%', width: '100%'}}>
      <PageHeader  onBack={() => history.goBack()}
        subTitle="返回列表页"></PageHeader>
      <div>
        <Upload
          name="file"
          id="file"
          beforeUpload={beforeUpload}
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>选择图片</Button>
        </Upload>
        <Button type="primary" onClick={handleUploadImg}>上传文件</Button>
      </div>
      <div>
        {
          Number(state) === 1 ? (
            <Button type="primary" size="small" onClick={handleAudit}>
              审核通过
            </Button>
          ) : null
        }
        {
          Number(state) === 2 ? (
            <Button type="primary" size="small" onClick={handleOnShelves}>
              上架活动
            </Button>
          ) : null
        }
        {
          Number(state) === 3 ? (
            <Button type="primary" size="small" onClick={handleOffShelves}>
              下架活动
            </Button>
          ) : null
        }
        <div>
          <Button type="primary" size="small"  onClick={handleSetDefault}>
            设置为默认广告
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(advertise);
