import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post, baseUrl } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "component/breadcrumb";
import { useHistory, useLocation } from "react-router-dom";
import Compressor from "compressorjs";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import isEmpty from "lodash/isEmpty";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function () {
  const history = useHistory();
  const { state } = useLocation();
  const goBack = () => {
    history.goBack();
  };
  if (state == undefined) goBack();
  const [submiting, setSubmiting] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(state?.text)?.contentBlocks)
    )
  );
  const [error, setError] = useState(false);
  const [data, setData] = useState({ title: state?.title, desc: state?.desc });
  const [image, setImage] = useState(null);

  const onChangeImage = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.8,
      success: (res) => {
        setImage(res);
      },
    });
  };
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();

  const validate = () => {
    const temp = {};
    for (let i in data) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setSubmiting(true);
      post("update-news", {
        ...data,
        id: state.id,
        image,
        text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        token,
      }).then((data) => {
        setSubmiting(null);
        if (data?.success) goBack();
      });
    }
  };
  return (
    <>
      <Breadcrumb title="addNews" icon="mdi-newspaper">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">{t("editNews")}</li>
          <li className="breadcrumb-item">
            <a
              href="#"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                goBack();
              }}
            >
              {t("news")}
            </a>
          </li>
        </ol>
      </Breadcrumb>
      <div className="card my-card">
        <form className="py-3 px-3" autoComplete="off" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Input
                name={"title"}
                value={data?.title}
                onChange={(v) => onChange("title", v)}
                error={error?.title}
              />
              <Input
                name={"desc"}
                multiLine
                value={data?.desc}
                onChange={(v) => onChange("desc", v)}
                error={error?.title}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <p>{t("image")}</p>
              <label className="news-img-bg">
                {image ? (
                  <>
                    <img
                      className="news-img-temp"
                      src={URL.createObjectURL(image)}
                    />
                  </>
                ) : state?.image == "" ? (
                  <WallpaperIcon className="news-img-icon" />
                ) : (
                  <img
                    src={baseUrl + "news/" + state.image}
                    className="news-img-temp"
                  />
                )}
                <input type="file" onChange={onChangeImage} />
              </label>
            </div>

            <div className="col-12 ltr">
              <p>{t("text")}</p>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: false },
                  },
                }}
              />
            </div>
          </div>
          <Alert variant="success" show={submiting === null}>
            {t("successInfo")}
          </Alert>
          <div className="mt-3">
            <Button loading={submiting} className="btn btn-primary">
              {t("update")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}
