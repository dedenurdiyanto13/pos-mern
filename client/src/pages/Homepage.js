import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("atasan");
  const categories = [
    {
      name: "atasan",
      // imageUrl: "http://cdn.onlinewebfonts.com/svg/img_483596.png",
    },
    {
      name: "bawahan",
      // imageUrl: "https://cdn-icons-png.flaticon.com/512/193/193883.png",
    },
    {
      name: "aksesoris",
      // imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046850.png",
    },
    {
      name: "sepatu",
      // imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046850.png",
    },
  ];
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <p className="btn btn-secondary badge rounded-pill badge-hover">
              {category.name}
            </p>
            {/* <img
              src={category.imageUrl}
              alt={category.name}
              height="40px"
              width="60px"
            /> */}
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
