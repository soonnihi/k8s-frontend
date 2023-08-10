import React , { useState }from "react";
import '../pages_css/Home.css'
import BoardModal from './BoardModal';

const Home = () => {
    const [modal_is_open, setModallsOpen] = useState(false);
    return (
        <div className="parentDiv">
            <h1 className="sectionTitle">Home</h1>
            <div className="buttonDiv">
                <button className="goodButton" onClick={() => setModallsOpen(true)}>
                    NEW
                </button> 
            </div>
            <BoardModal modal_is_open={modal_is_open} setModallsOpen={setModallsOpen}/>
        </div>
    );
};
export default Home;