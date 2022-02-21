import React, { useState } from "react";
import { firebaseStorage, firestore } from "../firebase";
import Calendar from "react-calendar";
import { Row, SizedBox } from "../layout";
import { NotificationManager } from "react-notifications";

const MealPlanManagement = () => {
  const [display, setDisplay] = useState("none");
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));

  const [breakfast, setBreakfast] = useState("");
  const [breakfastImages, setBreakfastImages] = useState([]);
  const [breakfastMealPlanArr, setBreakfastMealPlanArr] = useState([]);
  const [breakfastPreviewURLs, setBreakfastPreviewURLs] = useState([]);

  const [lunch, setLunch] = useState("");
  const [lunchImages, setLunchImages] = useState([]);
  const [lunchMealPlanArr, setLunchMealPlanArr] = useState([]);
  const [lunchPreviewURLs, setLunchPreviewURLs] = useState([]);

  const [dinner, setDinner] = useState("");
  const [dinnerImages, setDinnerImages] = useState([]);
  const [dinnerMealPlanArr, setDinnerMealPlanArr] = useState([]);
  const [dinnerPreviewURLs, setDinnerPreviewURLs] = useState([]);

  const clear = () => {
    setBreakfast("");
    setBreakfastImages([]);
    setBreakfastMealPlanArr([]);
    setBreakfastPreviewURLs([]);
    setLunch("");
    setLunchImages([]);
    setLunchMealPlanArr([]);
    setLunchPreviewURLs([]);
    setDinner("");
    setDinnerImages([]);
    setDinnerMealPlanArr([]);
    setDinnerPreviewURLs([]);
  };

  const toDateString = (d) => {
    const _d = new Date(d);
    return `${_d.getFullYear()}-${_d.getMonth() + 1}-${_d.getDate()}`;
  };

  const upload = async () => {
    try {
      const docs = (await firestore.collection("mealplan").get()).docs;
<<<<<<< HEAD
      const users = (
        await firestore
          .collection("user")
          .where("userType", "==", "학부모")
          .get()
      ).docs;
      const userNames = users.map((user) => user.id);
      let notified = {};
      for (let i = 0; i < userNames.length; ++i) {
        notified[userNames[i]] = false;
      }

      let i = 0;
=======
      var i = 0;
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
      for (; i < docs.length; ++i) {
        const date =
          (await firestore.collection("mealplan").doc(docs[i].id).get()).data()[
            "date"
          ] ?? new Date(Date.now());
        const d = new Date(date.toDate());
        const d2 = selectedDay;
        d.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        if (d2.getTime() === d.getTime()) break;
      }
      if (i < docs.length) {
        NotificationManager.error("이미 일정이 업로드 된 날짜입니다.");
      } else {
        const filePath = `/mealplan/희망반/${toDateString(
          new Date(selectedDay)
        )}`;
        const bFFileNames = [];
        const lunchFileNames = [];
        const dinnerFileNames = [];
        breakfastImages.forEach(async (file, index) => {
          const fileName = `${filePath}/오전간식/${index
            .toString()
            .padStart(3, "0")}`;
          bFFileNames.push(fileName);
          await firebaseStorage.ref(fileName).put(file);
        });
        lunchImages.forEach(async (file, index) => {
          const fileName = `${filePath}/점심/${index
            .toString()
            .padStart(3, "0")}`;
          lunchFileNames.push(fileName);
          await firebaseStorage.ref(fileName).put(file);
        });
        dinnerImages.forEach(async (file, index) => {
          const fileName = `${filePath}/오후간식/${index
            .toString()
            .padStart(3, "0")}`;
          dinnerFileNames.push(fileName);
          await firebaseStorage.ref(fileName).put(file);
        });
        firestore.collection("mealplan").add({
          date: selectedDay,
<<<<<<< HEAD
          notified,
=======
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
          content: {
            오전간식: {
              식단: breakfastMealPlanArr,
              파일경로: bFFileNames,
            },
            점심: {
              식단: lunchMealPlanArr,
              파일경로: lunchFileNames,
            },
            오후간식: {
              식단: dinnerMealPlanArr,
              파일경로: dinnerFileNames,
            },
          },
        });
        clear();
        NotificationManager.info("식단이 성공적으로 업로드되었습니다.");
      }
<<<<<<< HEAD
=======
      // for (var i = 0; i < snapshots.length; ++i) {
      //   const albumList =
      //     (
      //       await firestore.collection("user").doc(snapshots[i].id).get()
      //     ).data()["활동사진"] ?? [];
      //   firestore
      //     .collection("user")
      //     .doc(snapshots[i].id)
      //     .update({
      //       활동사진: [
      //         ...albumList,
      //         {
      //           title,
      //           imageLocArray: fileNames,
      //           contents: editorToHtml,
      //           createdAt: new Date(Date.now()),
      //         },
      //       ],
      //     });
      // }
      // setEditorState(EditorState.createEmpty());
      // setTitle("");
      // NotificationManager.info("활동사진이 성공적으로 업로드되었습니다.");
>>>>>>> 33b3bb6acec34fbfe9f0af0896788aa92c130329
    } catch (e) {
      console.log(e);
    }
  };

  const readURLBF = (e) => {
    e.preventDefault();
    const inpt = e.target;
    let files = inpt.files;
    if (files && files[0]) {
      Array.from(files).forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setBreakfastImages((old) => [...old, file]);
          setBreakfastPreviewURLs((old) => [...old, reader.result]);
        };
        if (file !== null) {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  let breakfast_preview = null;
  if (breakfastImages.length !== 0) {
    breakfast_preview = breakfastPreviewURLs.map((previewURL, idx) => {
      return (
        <img
          alt="preview"
          className={`breakfast_preview-${idx + 1}`}
          style={{
            height: "200px",
          }}
          src={previewURL}
        ></img>
      );
    });
  }

  const readURLLunch = (e) => {
    e.preventDefault();
    const inpt = e.target;
    let files = inpt.files;
    if (files && files[0]) {
      Array.from(files).forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setLunchImages((old) => [...old, file]);
          setLunchPreviewURLs((old) => [...old, reader.result]);
        };
        if (file !== null) {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  let lunch_preview = null;
  if (lunchImages.length !== 0) {
    lunch_preview = lunchPreviewURLs.map((previewURL, idx) => {
      return (
        <img
          alt="preview"
          className={`lunch_preview-${idx + 1}`}
          style={{
            height: "200px",
          }}
          src={previewURL}
        ></img>
      );
    });
  }

  const readURLDinner = (e) => {
    e.preventDefault();
    const inpt = e.target;
    let files = inpt.files;
    if (files && files[0]) {
      Array.from(files).forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setDinnerImages((old) => [...old, file]);
          setDinnerPreviewURLs((old) => [...old, reader.result]);
        };
        if (file !== null) {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  let dinner_preview = null;
  if (dinnerImages.length !== 0) {
    dinner_preview = dinnerPreviewURLs.map((previewURL, idx) => {
      return (
        <img
          alt="preview"
          className={`dinner_preview-${idx + 1}`}
          style={{
            height: "200px",
          }}
          src={previewURL}
        ></img>
      );
    });
  }

  return (
    <div className="meal_plan_management">
      <div className="select_box">
        <li className="menu-items item-1 submenu-wpr">
          <span
            onClick={() => {
              setDisplay("block");
            }}
          >
            {toDateString(selectedDay)}
          </span>
          <div
            className="submenu__content"
            style={{
              display,
            }}
          >
            <Calendar
              defaultValue={new Date(Date.now())}
              className="meal_plan_management-calendar"
              onClickDay={(d) => {
                const _date = new Date(d);
                setSelectedDay(_date);
                setDisplay("none");
              }}
            />
          </div>
        </li>
      </div>
      <SizedBox height="50px" />
      <Row>
        <div
          style={{
            width: "500px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            오전 간식
          </div>
          {breakfastMealPlanArr.map((daily) => {
            return <div>{`\u2022${daily}`}</div>;
          })}
          <SizedBox height="20px" />
          <div>
            <span>
              <input
                value={breakfast}
                className="meal_plan_management__input-daily"
                placeholder="식단을 입력하세요"
                type="text"
                name="title"
                onChange={(e) => {
                  setBreakfast(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setBreakfastMealPlanArr((daily) => [...daily, breakfast]);
                    setBreakfast("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (breakfast !== "") {
                    setBreakfastMealPlanArr((daily) => [...daily, breakfast]);
                    setBreakfast("");
                  }
                }}
                className="plus-button plus-button--small"
              ></button>
            </span>
            <SizedBox height="10px" />
            <Row
              style={{
                width: "500px",
                overflowX: "auto",
              }}
            >
              <Row>
                {breakfast_preview}
                <span className="meal_plan_management__image-upload-wrap">
                  <input
                    className="meal_plan_management__file-upload-input"
                    type="file"
                    onChange={(e) => {
                      readURLBF(e);
                    }}
                    accept="image/*"
                  />
                  <div className="meal_plan_management__drag-text">
                    <span>
                      사진을 드롭하거나 클릭하여
                      <br /> 업로드하세요.
                    </span>
                  </div>
                </span>
              </Row>
            </Row>
          </div>
        </div>
        <div
          style={{
            width: "500px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            점심
          </div>
          {lunchMealPlanArr.map((daily) => {
            return <div>{`\u2022${daily}`}</div>;
          })}
          <SizedBox height="20px" />
          <div>
            <span>
              <input
                value={lunch}
                className="meal_plan_management__input-daily"
                placeholder="식단을 입력하세요"
                type="text"
                name="title"
                onChange={(e) => {
                  setLunch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLunchMealPlanArr((daily) => [...daily, lunch]);
                    setLunch("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (lunch !== "") {
                    setLunchMealPlanArr((daily) => [...daily, lunch]);
                    setLunch("");
                  }
                }}
                className="plus-button plus-button--small"
              ></button>
            </span>
            <SizedBox height="10px" />
            <Row
              style={{
                width: "500px",
                overflowX: "auto",
              }}
            >
              <Row>
                {lunch_preview}
                <span className="meal_plan_management__image-upload-wrap">
                  <input
                    className="meal_plan_management__file-upload-input"
                    type="file"
                    onChange={(e) => {
                      readURLLunch(e);
                    }}
                    accept="image/*"
                  />
                  <div className="meal_plan_management__drag-text">
                    <span>
                      사진을 드롭하거나 클릭하여
                      <br /> 업로드하세요.
                    </span>
                  </div>
                </span>
              </Row>
            </Row>
          </div>
        </div>
      </Row>
      <SizedBox height="20px" />
      <div
        style={{
          width: "500px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          오후 간식
        </div>
        {dinnerMealPlanArr.map((daily) => {
          return <div>{`\u2022${daily}`}</div>;
        })}
        <SizedBox height="20px" />
        <div>
          <span>
            <input
              value={dinner}
              className="meal_plan_management__input-daily"
              placeholder="식단을 입력하세요"
              type="text"
              name="title"
              onChange={(e) => {
                setDinner(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setDinnerMealPlanArr((daily) => [...daily, dinner]);
                  setDinner("");
                }
              }}
            />
            <button
              onClick={() => {
                if (dinner !== "") {
                  setDinnerMealPlanArr((daily) => [...daily, dinner]);
                  setDinner("");
                }
              }}
              className="plus-button plus-button--small"
            ></button>
          </span>
          <SizedBox height="10px" />
          <Row
            style={{
              width: "500px",
              overflowX: "auto",
            }}
          >
            <Row>
              {dinner_preview}
              <span className="meal_plan_management__image-upload-wrap">
                <input
                  className="meal_plan_management__file-upload-input"
                  type="file"
                  onChange={(e) => {
                    readURLDinner(e);
                  }}
                  accept="image/*"
                />
                <div className="meal_plan_management__drag-text">
                  <span>
                    사진을 드롭하거나 클릭하여
                    <br /> 업로드하세요.
                  </span>
                </div>
              </span>
            </Row>
          </Row>
        </div>
      </div>
      <SizedBox height="20px" />

      <input
        type="button"
        className="meal_plan_management__submit-btn"
        value="전송"
        onClick={upload}
      />
    </div>
  );
};

export default MealPlanManagement;
