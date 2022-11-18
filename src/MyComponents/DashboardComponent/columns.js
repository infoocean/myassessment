export const userColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Address",
    key: "address",
    render: (record) => {
      return Object.values(record.address)
        .filter((val) => typeof val !== "object")
        .join(" ");
    },
  },
  {
    title: "Chech In",
    dataIndex: "checkin",
    key: "checkin",
  },

  {
    title: "ChkIn D/T",
    dataIndex: "checkindt",
    key: "checkindt",
  },

  {
    title: "ChkOutD/T",
    dataIndex: "checkoutdt",
    key: "checkoutdt",
  },
];
