export default (total, onChange) => {
  return {
    total: total,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (page, pageSize) => {
      console.log(page, pageSize);
      onChange({ page, pageSize });
    },
  };
};
