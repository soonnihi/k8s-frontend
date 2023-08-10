import React, { useState } from 'react';
import Modal from 'react-modal';
import '../pages_css/BoardModal.css';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // crypto-js 패키지 import

const BoardModal = (data) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter]  = useState('');
    const [password, setPassword] = useState('');

    const insertBoardValueCheck = () => {
        if (title === '') {
            alert('Please input title');
            return false;
        }
        if (content === '') {
            alert('Please input content');
            return false;
        }
        if (writer === '') {
            alert('Please input writer');
            return false;
        }
        if (password === '') {
            alert('Please input password');
            return false;
        }
        return true;
    };

    // 게시글 등록 //
    const insertBoard = async () => {
        console.log('insertBoard');
        if (!insertBoardValueCheck()) return;
        const headers = {
            'Content-type' : 'application/json; charset = utf-8;',
            Accept: 'application/json',
        };
        const datas = {
            board_seq: null,
            board_title: title,
            board_content: content,
            board_writer: writer,
            board_password: CryptoJS.HmacSHA256(password, 'hisoonni_blog_key').toString(), // crypto-js 사용
        };
        axios
          .post('http://127.0.0.1:8000/insertBoard/', datas, {headers,})
          .then((response) => {
            if (response.data.response_code) {
                data.setModallsOpen(false);
            } else {
                alert(response.data.message);
            }
          })
          .catch((response) => {
            alert(response.data.message);
          });
    };

    return (
        <Modal className="modal" isOpen={data.modal_is_open} ariaHideApp={false}>
            <div style={{ height: '100%'}}>
                <h1 className="sectionTitle">Write</h1>
                <div style={{paddingLeft: '4%', paddingRight: '4%'}}>
                    <h1 style={{ fontSize: 28, fontWeight: 'bold'}}>Title</h1>
                    <input
                      className="inputs"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <h1 style={{ fontSize: 28, fontWeight: 'bold', marginTop: 10}}>
                        Content
                    </h1>
                    <textarea 
                      rows={4}
                      className="inputs"
                      onChange={(e) => setContent(e.target.value)}
                      style={{ resize: 'none'}}
                    />
                    <div className="buttonDiv">
                        <input
                          placeholder="writer"
                          onChange={(e) => setWriter(e.target.value)}
                          style={{
                            padding: 6,
                            width: 200,
                            fontSize: 20,
                            resize: 'none',
                            marginRight: 20,
                            borderRadiurs: 4,
                          }}
                        />
                        <input
                          placeholder="password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          style={{
                            papadding: 6,
                            width: 200,
                            fontSize: 20,
                            resize: 'none',
                            borderRadiurs: 4,
                          }}
                        />
                        <button className="goodButton" onClick={() => insertBoard()}>
                            SAVE
                        </button>
                        <button className="badButton" onClick={() => data.setModallsOpen(false)}>
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default BoardModal;
