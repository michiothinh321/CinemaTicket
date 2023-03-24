import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { notification } from "antd";
import { category as categoryAPI } from "../../API";
import { Link } from "react-router-dom";
export default function Category() {
  const [category, setCategory] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    (async () => {
      await getCategoryList();
    })();
  }, []);
  const getCategoryList = async () => {
    try {
      const result = await categoryAPI.getCategoryList();
      setCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDeleteCategory = async (namecategory) => {
  //   try {
  //     const result = await categoryAPI.deletecategory({
  //       namecategory,
  //     });
  //     if (result.status === 200) {
  //       await getCategoryList();
  //       api.open({
  //         type: "success",
  //         message: "Delete category successfully.",
  //       });
  //     }
  //   } catch (error) {
  //     api.open({
  //       type: "error",
  //       message: "Delete category failure.",
  //     });
  //     console.log(error);
  //   }
  // };
  console.log(category);
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý rạp</h1>
        <Link to="/addCategory">
          <button className={clsx(styles.btn_film)}>Thêm Thể Loại</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên thể loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          {/* <tbody>
            {category.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.nameCategory}</td>
                  <td>
                    <button className={clsx(styles.btn_film)}>Sửa rạp</button>
                    <button
                      className={clsx(styles.btn_film)}
                      onClick={handleDeleteCategory}
                    >
                      Xóa rạp
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </>
  );
}
