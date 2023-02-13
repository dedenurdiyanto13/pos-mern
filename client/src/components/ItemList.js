import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  // update cart handler
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };
  const { Meta } = Card;
  return (
    <div>
      <Card
        style={{
          width: 229,
          marginBottom: 20,
          marginRight: 20,
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 229 }} />}
      >
        <Meta title={item.name} style={{ marginBottom: 5 }} />
        <p className="btn btn-warning badge rounded-pill mt-1">
          {item.category}
        </p>
        <Meta title={"Rp. " + item.price.toLocaleString()} />
        <div className="item-button">
          <Button type="primary" onClick={() => handleAddToCart()}>
            <ShoppingCartOutlined style={{ marginLeft: -16 }} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
