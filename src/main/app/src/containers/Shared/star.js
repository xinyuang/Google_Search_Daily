import React from 'react';
import type {BookMarkAddRequest, News} from "../../data/modules/news";
import {getCurrentDate} from "./date";
import {Icon} from "antd";
import SerachBar from "./SearchBar";

class Star extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmark: this.props.marked
        }
    }

    toggle = (e) => {
        this.setState({
            bookmark: !this.state.bookmark,
        });
        let mark = !this.state.bookmark;
        const cur_news: News = this.props.data;
        if (mark) {
            let cur_Date = getCurrentDate();
            const bookMarkAddRequest: BookMarkAddRequest = {markDate:cur_Date,news:cur_news};
            this.props.requestBookMarkAdd(bookMarkAddRequest);
        }
        else {
            this.props.requestBookMarkDel(cur_news);
        }
    };

    render() {
        return (
            <div>
                <Icon
                    // key={ item.news_url }
                    className="trigger"
                    type="star"
                    theme={this.state.bookmark ?  'filled':''}
                    style={this.state.bookmark ?  {color: 'yellow'}:{color: ''}}
                    onClick={e => this.toggle(e)}
                >
                </Icon>
            </div>
        )
    }
}

export default Star;