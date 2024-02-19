
import { TABS } from "../redux/actions/type";

import { useDispatch } from 'react-redux';

import { toggleTab } from "../redux/store";
import "./Style/Style.css"

const Tabs = ({ currentTab }) => {

    const dispatch = useDispatch();

    return (
        TABS.map(tab => (
            <button
                className={tab === currentTab ? 'select button ' : 'button'}
                onClick={() => dispatch(toggleTab(tab))}
                style={{color:tab===currentTab?"white":"black"}}
            >
                {tab}
            </button>
        ))
    )
}

export default Tabs;