import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/InvoiceStyles.css";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";

const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect
  useEffect(() => {
    getAllBills();
  }, []);

  // print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // able data
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Nama Pelanggan",
      dataIndex: "customerName",
    },
    { title: "No Telp", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Pajak", dataIndex: "tax" },
    { title: "Total", dataIndex: "totalAmount" },

    {
      title: "Aksi",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer", justifyContent: "center" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Daftar Faktur</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Detail Faktur"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* Invoice start */}
          <div className="invoice-POS" ref={componentRef}>
            {/* start top */}
            <center id="top">
              <div className="logo" />
              {/* start info */}
              <div className="info">
                <h2>Dede Nurdiyanto Store</h2>
                <p>Telp : 081324524111 | Majalengka - Indonesia</p>
              </div>
              {/* end info */}
            </center>
            {/* end top */}
            {/* start mid */}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Nama Pelanggan : <b>{selectedBill.customerName}</b>
                  <br />
                  No Telp : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Tanggal :{" "}
                  <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/* end mid */}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Produk</h2>
                      </td>
                      <td className="Hours">
                        <h2>Jumlah</h2>
                      </td>
                      <td className="Rate">
                        <h2>Harga</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.price.toLocaleString()}
                            </p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Pajak</h2>
                      </td>
                      <td className="payment">
                        <h2>Rp.{selectedBill.tax.toLocaleString()}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Total Keseluruhan</h2>
                      </td>
                      <td className="payment">
                        <h2>Rp.{selectedBill.totalAmount.toLocaleString()}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* end table */}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Terima kasih telah memesan!</strong> Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged.
                  <b> dedenurdiyanto13@gmail.com</b>
                </p>
              </div>
            </div>
            {/* end bot */}
          </div>
          {/* Invoice end */}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Cetak
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
